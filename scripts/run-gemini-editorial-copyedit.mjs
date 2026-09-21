import fs from 'node:fs';

const triggerPath = process.argv[2] || 'data/gemini-editorial-trigger.json';
if (!fs.existsSync(triggerPath)) {
  console.error(`Trigger not found: ${triggerPath}`);
  process.exit(2);
}

const trigger = JSON.parse(fs.readFileSync(triggerPath, 'utf8'));
const filePath = trigger.file;
if (!filePath || !fs.existsSync(filePath)) {
  console.error(`Article not found: ${filePath || '(missing)'}`);
  process.exit(2);
}

const token = process.env.EDITORIAL_BRIDGE_TOKEN;
if (!token) {
  console.error('EDITORIAL_BRIDGE_TOKEN is not available to this workflow.');
  process.exit(2);
}

const endpoint = trigger.endpoint || 'https://gemini-editorial-bridge.silovar-uk.workers.dev/v1/copyedit';
const source = fs.readFileSync(filePath, 'utf8');

const FRONTMATTER = /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/;
const HEADING = /^#{1,6}\s+/;
const LIST = /^\s*(?:[-*+]|\d+[.)])\s+/;
const BLOCKQUOTE = /^>/;
const HR = /^\s*(?:-{3,}|\*{3,}|_{3,})\s*$/;
const HTML_COMMENT = /^\s*<!--[\s\S]*-->\s*$/;
const FIGURE_ONLY = /^!\[[^\]]*\]\([^)]*\)(?:\s*\n\s*\*[^*]+\*)?$/;

function parseFrontmatterId(text) {
  const m = text.match(FRONTMATTER);
  if (!m) return null;
  const id = m[1].match(/^id:\s*["']?([^"'\r\n]+)["']?\s*$/m);
  return id ? id[1].trim() : null;
}

function splitFrontmatter(text) {
  const m = text.match(FRONTMATTER);
  if (!m) return null;
  return { text: m[0], end: m[0].length };
}

function classify(lines) {
  const text = lines.join('\n');
  const first = lines[0] || '';
  if (HEADING.test(first)) return 'heading';
  if (lines.every(line => BLOCKQUOTE.test(line) || line.trim() === '')) return 'blockquote';
  if (lines.some(line => LIST.test(line))) return 'list';
  if (HR.test(text)) return 'horizontal-rule';
  if (HTML_COMMENT.test(text)) return 'html-comment';
  if (FIGURE_ONLY.test(text.trim())) return 'figure';
  return 'paragraph';
}

function parseBlocks(text) {
  const blocks = [];
  let cursor = 0;
  let index = 0;
  const fm = splitFrontmatter(text);
  if (fm) {
    blocks.push({ index: index++, type: 'frontmatter', editable: false, text: fm.text, start: 0, end: fm.end });
    cursor = fm.end;
  }

  let i = cursor;
  while (i < text.length) {
    while (i < text.length && /\s/.test(text[i]) && (text[i] === '\n' || text[i] === '\r' || text[i] === ' ' || text[i] === '\t')) {
      if (text[i] === '\n' || text[i] === '\r') { i += 1; continue; }
      break;
    }
    if (i >= text.length) break;

    const start = i;
    const lineEnd = text.indexOf('\n', i);
    const firstLineEnd = lineEnd === -1 ? text.length : lineEnd;
    const firstLine = text.slice(i, firstLineEnd).replace(/\r$/, '');

    if (firstLine.trim().startsWith('```')) {
      let end = lineEnd === -1 ? text.length : lineEnd + 1;
      while (end < text.length) {
        const nextEnd = text.indexOf('\n', end);
        const e = nextEnd === -1 ? text.length : nextEnd;
        const line = text.slice(end, e).replace(/\r$/, '');
        end = nextEnd === -1 ? text.length : nextEnd + 1;
        if (line.trim().startsWith('```')) break;
      }
      const raw = text.slice(start, end).replace(/\r?\n$/, '');
      blocks.push({ index: index++, type: 'code', editable: false, text: raw, start, end: start + raw.length });
      i = end;
      continue;
    }

    if (HEADING.test(firstLine) || HR.test(firstLine) || HTML_COMMENT.test(firstLine)) {
      const raw = text.slice(start, firstLineEnd).replace(/\r$/, '');
      const type = classify([raw]);
      blocks.push({ index: index++, type, editable: false, text: raw, start, end: firstLineEnd });
      i = lineEnd === -1 ? text.length : lineEnd + 1;
      continue;
    }

    let end = firstLineEnd;
    let scan = lineEnd === -1 ? text.length : lineEnd + 1;
    while (scan < text.length) {
      const nextEnd = text.indexOf('\n', scan);
      const e = nextEnd === -1 ? text.length : nextEnd;
      const line = text.slice(scan, e).replace(/\r$/, '');
      if (line.trim() === '' || HEADING.test(line)) break;
      end = e;
      scan = nextEnd === -1 ? text.length : nextEnd + 1;
    }
    const raw = text.slice(start, end).replace(/\r$/, '');
    const lines = raw.split(/\r?\n/);
    const type = classify(lines);
    const editable = type === 'paragraph' || type === 'list';
    blocks.push({ index: index++, type, editable, text: raw, start, end });
    i = scan;
  }
  return blocks;
}

function patchDocument(text, blocks, replacements) {
  let out = text;
  for (const block of [...blocks].sort((a,b) => b.start - a.start)) {
    if (!replacements.has(block.index)) continue;
    out = out.slice(0, block.start) + replacements.get(block.index) + out.slice(block.end);
  }
  return out;
}

const articleId = trigger.articleId || parseFrontmatterId(source);
if (!articleId) {
  console.error('Could not determine article id.');
  process.exit(2);
}

const blocks = parseBlocks(source).map((b, idx) => ({
  ...b,
  blockId: `req-b${String(idx + 1).padStart(4, '0')}`
}));

const payload = {
  schemaVersion: '1.0',
  article: {
    id: articleId,
    mode: trigger.mode || 'ja',
    articleType: trigger.articleType || 'essay'
  },
  policy: {
    editingMode: 'conservative',
    allowFlavor: trigger.allowFlavor !== false,
    maxFlavorChanges: Number.isInteger(trigger.maxFlavorChanges) ? trigger.maxFlavorChanges : 3
  },
  protectedTerms: Array.isArray(trigger.protectedTerms) ? trigger.protectedTerms : [],
  blocks: blocks.map(({blockId,index,type,editable,text}) => ({blockId,index,type,editable,text}))
};

const controller = new AbortController();
const timeoutMs = Number(trigger.clientTimeoutMs || 60000);
const timer = setTimeout(() => controller.abort(), timeoutMs);

let response;
let data;
try {
  response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload),
    signal: controller.signal
  });
  data = await response.json();
} catch (error) {
  clearTimeout(timer);
  if (error?.name === 'AbortError') {
    console.log(JSON.stringify({status:'timeout', fallback:'gpt_original', reason:'client_timeout'}));
    process.exit(0);
  }
  console.error('Bridge request failed before a structured response:', error?.message || String(error));
  process.exit(2);
}
clearTimeout(timer);

console.log(JSON.stringify({
  httpStatus: response.status,
  status: data?.status,
  summary: data?.summary || null,
  validation: data?.validation || null,
  fallbackRecommended: data?.fallbackRecommended || false
}));

if (data?.status === 'timeout' || data?.status === 'quota_exceeded') {
  console.log('Gemini unavailable by policy; keeping GPT original unchanged.');
  process.exit(0);
}

if (data?.status !== 'success') {
  console.log(`Bridge status ${data?.status || 'unknown'}; keeping GPT original unchanged.`);
  process.exit(0);
}

const byId = new Map(blocks.map(b => [b.blockId, b]));
const replacements = new Map();
let applied = 0;

for (const candidate of data.candidate || []) {
  if (candidate?.decision !== 'EDIT') continue;
  if (candidate?.validatorRejected) continue;
  const block = byId.get(candidate.blockId);
  if (!block || !block.editable) continue;
  if (typeof candidate.revised !== 'string' || candidate.revised === block.text) continue;
  replacements.set(block.index, candidate.revised);
  applied += 1;
}

if (applied === 0) {
  console.log('Bridge success, but there are no accepted EDIT blocks. Article remains unchanged.');
  process.exit(0);
}

const revisedSource = patchDocument(source, blocks, replacements);
if (revisedSource === source) {
  console.log('No effective diff after patching.');
  process.exit(0);
}

fs.writeFileSync(filePath, revisedSource, 'utf8');
fs.writeFileSync('gemini-editorial-result.json', JSON.stringify({
  status: 'success',
  articleId,
  file: filePath,
  appliedEdits: applied,
  bridgeSummary: data.summary || null,
  validation: data.validation || null
}, null, 2) + '\n');

console.log(`Applied ${applied} conservative edit block(s) to ${filePath}.`);
