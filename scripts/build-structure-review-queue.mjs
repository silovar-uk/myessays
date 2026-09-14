#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const READY_STATUSES = new Set(['SAFE_STRUCTURE_ONLY', 'SAFE_CANONICAL_RESTORE']);
const PENDING_STATUSES = new Set([
  'EDITORIAL_RESEGMENT',
  'EDITORIAL_REWRITE_REQUIRED',
  'STRUCTURAL_REORDER_REQUIRED',
  'DEFERRED',
  'INVALID_OR_OBSOLETE'
]);

function decisionKey(id, variant) {
  return `${id}:${variant}`;
}

function confidenceWeight(confidence) {
  if (confidence === 'HIGH') return 1;
  if (confidence === 'MEDIUM') return 0.6;
  return 0.15;
}

function sectionRatio(packet) {
  const ratio = Number(packet?.suspectedRange?.ratio);
  return Number.isFinite(ratio) ? Math.max(0, Math.min(1, ratio)) : 1;
}

function extractDate(canonicalPath = '') {
  const match = String(canonicalPath).match(/(?:^|\/)(\d{4})-(\d{2})-(\d{2})-/);
  return match ? `${match[1]}-${match[2]}-${match[3]}` : '';
}

function daysBetween(left, right) {
  const a = Date.parse(`${left}T00:00:00Z`);
  const b = Date.parse(`${right}T00:00:00Z`);
  if (!Number.isFinite(a) || !Number.isFinite(b)) return null;
  return Math.max(0, Math.round((b - a) / 86400000));
}

function segmentabilityFor(packets = []) {
  if (!packets.length) return 'UNKNOWN';
  if (packets.some(packet => packet.issueKind === 'SECTION_MISMATCH' || packet.issueKind === 'TYPE_MISMATCH')) return 'LOW';
  const ratios = packets.map(sectionRatio);
  const delta = packets.reduce((sum, packet) => sum + Math.abs((packet.variantCount || 0) - (packet.canonicalCount || 0)), 0);
  const maxRatio = Math.max(...ratios);
  if (maxRatio <= 0.35 && delta <= 2) return 'HIGH';
  if (maxRatio <= 0.65 && delta <= 4) return 'MEDIUM';
  return 'LOW';
}

function reviewPriorityFor(group, generatedDate) {
  const packets = group.packets;
  const issueCount = packets.length;
  const totalDelta = packets.reduce((sum, packet) => sum + Math.abs((packet.variantCount || 0) - (packet.canonicalCount || 0)), 0);
  const confidence = packets.reduce((best, packet) => Math.max(best, confidenceWeight(packet.confidence)), 0);
  const locality = 1 - (packets.reduce((sum, packet) => sum + sectionRatio(packet), 0) / Math.max(1, packets.length));
  const smallDelta = 1 / (1 + totalDelta);
  const smallIssue = 1 / (1 + Math.max(0, issueCount - 1));
  const articleDate = extractDate(group.canonicalPath);
  const ageDays = articleDate ? daysBetween(articleDate, generatedDate) : null;
  const recency = ageDays == null ? 0.3 : Math.max(0, 1 - (ageDays / 90));
  const likelySafe = group.repairability === 'LIKELY_SAFE' ? 1 : 0;
  const score = (25 * confidence)
    + (25 * locality)
    + (15 * smallDelta)
    + (10 * smallIssue)
    + (15 * recency)
    + (10 * likelySafe);
  return Math.round(Math.max(0, Math.min(100, score)));
}

function lifecycleFor(decision) {
  if (!decision) return 'UNREVIEWED';
  // Queue rows only exist for current mismatches. A historical ALIGNED decision therefore means
  // the article regressed and must be reviewed again, never hidden as DONE.
  if (decision.status === 'ALIGNED') return 'UNREVIEWED';
  if (READY_STATUSES.has(decision.status)) return 'MIGRATION_READY';
  if (PENDING_STATUSES.has(decision.status)) return 'REVIEWED_BUT_PENDING';
  return 'REVIEWED_BUT_PENDING';
}

export function buildReviewQueue(packetPayload = {}, decisionPayload = {}) {
  const groups = new Map();
  for (const packet of packetPayload.packets || []) {
    const key = decisionKey(packet.id, packet.variant);
    if (!groups.has(key)) {
      groups.set(key, {
        key,
        id: packet.id,
        variant: packet.variant,
        canonicalPath: packet.canonicalPath,
        variantPath: packet.variantPath,
        taxonomy: packet.classification,
        repairability: packet.repairability,
        packets: []
      });
    }
    groups.get(key).packets.push(packet);
  }

  const generatedAt = packetPayload.generatedAt || new Date().toISOString();
  const generatedDate = generatedAt.slice(0, 10);
  const decisions = decisionPayload.decisions || {};
  const queue = [];

  for (const group of groups.values()) {
    const decision = decisions[group.key] || null;
    const confidences = { HIGH: 0, MEDIUM: 0, LOW: 0 };
    for (const packet of group.packets) confidences[packet.confidence] = (confidences[packet.confidence] || 0) + 1;
    const totalDelta = group.packets.reduce((sum, packet) => sum + Math.abs((packet.variantCount || 0) - (packet.canonicalCount || 0)), 0);
    const reviewPriority = reviewPriorityFor(group, generatedDate);
    const segmentability = segmentabilityFor(group.packets);
    const lifecycle = lifecycleFor(decision);
    queue.push({
      id: group.id,
      variant: group.variant,
      canonicalPath: group.canonicalPath,
      variantPath: group.variantPath,
      taxonomy: group.taxonomy,
      repairability: group.repairability,
      issueCount: group.packets.length,
      totalDelta,
      confidences,
      segmentability,
      reviewPriority,
      lifecycle,
      decision: decision?.status || null,
      strategy: decision?.strategy || null,
      reason: decision?.reason || '',
      reviewedAt: decision?.reviewedAt || null,
      nextAction: lifecycle === 'UNREVIEWED'
        ? (decision?.status === 'ALIGNED' ? 'REVIEW_REGRESSION' : 'REVIEW')
        : lifecycle === 'MIGRATION_READY'
          ? 'BUILD_MIGRATION_PLAN'
          : decision?.strategy || 'EDITORIAL_REVIEW'
    });
  }

  queue.sort((a, b) => {
    const lifecycleOrder = { MIGRATION_READY: 0, UNREVIEWED: 1, REVIEWED_BUT_PENDING: 2 };
    return (lifecycleOrder[a.lifecycle] ?? 9) - (lifecycleOrder[b.lifecycle] ?? 9)
      || b.reviewPriority - a.reviewPriority
      || a.id.localeCompare(b.id);
  });

  const summary = { unreviewed: 0, reviewedButPending: 0, migrationReady: 0, done: 0 };
  for (const row of queue) {
    if (row.lifecycle === 'UNREVIEWED') summary.unreviewed += 1;
    else if (row.lifecycle === 'REVIEWED_BUT_PENDING') summary.reviewedButPending += 1;
    else if (row.lifecycle === 'MIGRATION_READY') summary.migrationReady += 1;
  }

  return { schemaVersion: 1, generatedAt, summary, queue };
}

function rowLine(row) {
  const decision = row.decision ? `; decision=${row.decision}` : '';
  const strategy = row.strategy ? `; strategy=${row.strategy}` : '';
  return `- **${row.id}** [${row.variant}] — priority=${row.reviewPriority}; ${row.taxonomy}; ${row.repairability}; issues=${row.issueCount}; delta=${row.totalDelta}; segmentability=${row.segmentability}${decision}${strategy}`;
}

export function renderReviewQueue(payload = {}) {
  const queue = payload.queue || [];
  const summary = payload.summary || {};
  const unreviewed = queue.filter(row => row.lifecycle === 'UNREVIEWED');
  const ready = queue.filter(row => row.lifecycle === 'MIGRATION_READY');
  const pending = queue.filter(row => row.lifecycle === 'REVIEWED_BUT_PENDING');
  const lines = [
    '# Structure review queue', '', `Generated: ${payload.generatedAt || ''}`, '',
    '## Current state', '',
    `- Unreviewed: ${summary.unreviewed || 0}`,
    `- Reviewed but pending: ${summary.reviewedButPending || 0}`,
    `- Migration ready: ${summary.migrationReady || 0}`,
    `- Done: ${summary.done || 0}`, '',
    '## Next 15 reviews', '',
    'Priority means review efficiency, not permission to auto-repair.', ''
  ];
  for (const row of unreviewed.slice(0, 15)) lines.push(rowLine(row));
  lines.push('', '## Migration ready', '');
  if (!ready.length) lines.push('- None. A review decision must explicitly grant SAFE status before migration.');
  else for (const row of ready) lines.push(rowLine(row));
  lines.push('', '## Reviewed but pending', '');
  for (const row of pending.slice(0, 30)) {
    lines.push(rowLine(row));
    if (row.reason) lines.push(`  - Reason: ${row.reason}`);
  }
  lines.push('', '## Principle', '', 'Automate everything around the semantic decision. A high priority or segmentability score never authorizes automatic text changes.');
  return `${lines.join('\n')}\n`;
}

function argValue(name) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : '';
}

function main() {
  const packetsPath = argValue('--packets');
  const decisionsPath = argValue('--decisions');
  const jsonOutput = argValue('--json');
  const markdownOutput = argValue('--markdown');
  if (!packetsPath || !jsonOutput || !markdownOutput) {
    console.error('Usage: node scripts/build-structure-review-queue.mjs --packets <review-packets.json> [--decisions <decisions.json>] --json <queue.json> --markdown <queue.md>');
    process.exit(2);
  }
  const packets = JSON.parse(fs.readFileSync(path.resolve(packetsPath), 'utf8'));
  const decisions = decisionsPath && fs.existsSync(path.resolve(decisionsPath))
    ? JSON.parse(fs.readFileSync(path.resolve(decisionsPath), 'utf8'))
    : { decisions: {} };
  const queue = buildReviewQueue(packets, decisions);
  fs.writeFileSync(path.resolve(jsonOutput), `${JSON.stringify(queue, null, 2)}\n`, 'utf8');
  fs.writeFileSync(path.resolve(markdownOutput), renderReviewQueue(queue), 'utf8');
  console.log(`REVIEW QUEUE: ${queue.summary.unreviewed} unreviewed; ${queue.summary.reviewedButPending} pending; ${queue.summary.migrationReady} migration-ready.`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) main();
