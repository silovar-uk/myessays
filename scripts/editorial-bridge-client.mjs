export const DEFAULT_ENDPOINT = 'https://gemini-editorial-bridge.silovar-uk.workers.dev/v1/copyedit';

export async function requestJson(url, options = {}, timeoutMs = 10000, fetchImpl = fetch) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  const start = Date.now();
  let phase = 'response_headers';
  let httpStatus = null;
  try {
    const response = await fetchImpl(url, { ...options, redirect: 'error', signal: controller.signal });
    httpStatus = response.status;
    phase = 'response_body';
    const text = await response.text();
    let data;
    try { data = JSON.parse(text); } catch { return { status: 'upstream_error', reason: 'non_json_response', httpStatus, durationMs: Date.now() - start }; }
    return { data, httpStatus, durationMs: Date.now() - start };
  } catch (error) {
    return { status: controller.signal.aborted ? 'timeout' : 'upstream_error',
      reason: controller.signal.aborted ? `client_timeout_${phase}` : 'bridge_network_error',
      networkCode: error?.cause?.code || null, httpStatus, durationMs: Date.now() - start };
  } finally { clearTimeout(timer); }
}

export function batchBlocks(blocks, maxChars = 1800, maxBlocks = 4) {
  const batches = [];
  let batch = [], chars = 0;
  for (const block of blocks.filter(b => b.editable)) {
    if (batch.length && (batch.length >= maxBlocks || chars + block.text.length > maxChars)) {
      batches.push(batch); batch = []; chars = 0;
    }
    batch.push(block); chars += block.text.length;
  }
  if (batch.length) batches.push(batch);
  return batches;
}

export function validateCandidates(data, blocks) {
  if (!Array.isArray(data?.candidate)) return false;
  const expected = new Map(blocks.map(b => [b.blockId, b.text]));
  const seen = new Set();
  for (const c of data.candidate) {
    if (!c || !expected.has(c.blockId) || seen.has(c.blockId) || c.original !== expected.get(c.blockId) ||
      !['KEEP', 'EDIT', 'UNSURE'].includes(c.decision) || typeof c.revised !== 'string' || typeof c.validatorRejected !== 'boolean') return false;
    seen.add(c.blockId);
  }
  return seen.size === expected.size;
}

// All batches must succeed before any caller may apply a candidate.
export async function copyeditBatches(payload, { endpoint = DEFAULT_ENDPOINT, token, timeoutMs = 120000, totalTimeoutMs = 1200000, minIntervalMs = 30000, fetchImpl = fetch, onProgress = () => {} } = {}) {
  const start = Date.now();
  const batches = batchBlocks(payload.blocks);
  const candidate = [];
  const summary = { kept: 0, edited: 0, unsure: 0, flavorChanges: 0 };
  const warnings = [];
  let passed = true;
  let lastStarted = null;
  let remainingFlavor = Math.min(4, Math.max(0, Number(payload.policy.maxFlavorChanges) || 0));
  for (let index = 0; index < batches.length; index++) {
    if (lastStarted !== null) {
      const delay = Math.max(0, minIntervalMs - (Date.now() - lastStarted));
      if (Date.now() - start + delay >= totalTimeoutMs) return { status: 'timeout', reason: 'article_deadline', fallbackRecommended: true };
      if (delay) await new Promise(resolve => setTimeout(resolve, delay));
    }
    const remaining = totalTimeoutMs - (Date.now() - start);
    if (remaining <= 0) return { status: 'timeout', reason: 'article_deadline', fallbackRecommended: true };
    const batch = batches[index];
    lastStarted = Date.now();
    const result = await requestJson(endpoint, {
      method: 'POST', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...payload, blocks: batch, policy: { ...payload.policy, maxFlavorChanges: remainingFlavor } })
    }, Math.min(timeoutMs, remaining), fetchImpl);
    const data = result.data;
    onProgress({ batch: index + 1, batches: batches.length, blockCount: batch.length,
      inputChars: batch.reduce((n,b) => n + b.text.length, 0), durationMs: result.durationMs,
      httpStatus: result.httpStatus, status: result.status || data?.status,
      reason: result.reason || data?.reason || null, networkCode: result.networkCode || null,
      upstreamHttpStatus: data?.upstreamHttpStatus || null });
    if (result.status) return { ...result, fallbackRecommended: true };
    if (result.httpStatus !== 200 || data?.status !== 'success') return {
      status: data?.status || 'upstream_error', reason: data?.reason || 'bridge_error',
      httpStatus: result.httpStatus, fallbackRecommended: true
    };
    if (!validateCandidates(data, batch)) return { status: 'schema_invalid', reason: 'candidate_block_mismatch', fallbackRecommended: true };
    candidate.push(...data.candidate);
    passed &&= data.validation?.passed === true;
    warnings.push(...(data.validation?.warnings || []));
    for (const key of Object.keys(summary)) summary[key] += Number(data.summary?.[key]) || 0;
    remainingFlavor = Math.max(0, remainingFlavor - (Number(data.summary?.flavorChanges) || 0));
  }
  return { status: 'success', candidate, summary, validation: { passed, warnings } };
}
