#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

import { parseMarkdownStructure } from './validate-version-structure.mjs';
import { enrichAudit } from './report-structure-migration.mjs';

const ROOT = process.cwd();
const LOCATOR_TYPES = new Set(['p', 'ul', 'ol', 'blockquote', 'figure']);

function stripFrontmatter(markdown = '') {
  return String(markdown).replace(/^---\s*\r?\n[\s\S]*?\r?\n---\s*(?:\r?\n|$)/, '');
}

function isBlank(line) {
  return !String(line || '').trim();
}

function isFence(line) {
  return /^\s{0,3}(```+|~~~+)/.test(line);
}

function isH2(line) {
  return /^\s{0,3}##(?!#)\s+/.test(line);
}

function isAnyHeading(line) {
  return /^\s{0,3}#{1,6}\s+/.test(line);
}

function isHr(line) {
  return /^\s{0,3}((\*\s*){3,}|(-\s*){3,}|(_\s*){3,})$/.test(String(line || '').trim());
}

function listKind(line) {
  if (/^\s{0,3}[-+*]\s+/.test(line)) return 'ul';
  if (/^\s{0,3}\d+[.)]\s+/.test(line)) return 'ol';
  return '';
}

function isQuote(line) {
  return /^\s{0,3}>\s?/.test(line);
}

function isFigureStart(line) {
  return /^\s*<figure(?:\s|>)/i.test(line);
}

function isTableSeparator(line) {
  const text = String(line || '').trim();
  if (!text.includes('|')) return false;
  const cells = text.replace(/^\||\|$/g, '').split('|').map(cell => cell.trim());
  return cells.length > 0 && cells.every(cell => /^:?-{3,}:?$/.test(cell));
}

function isTableStart(lines, index) {
  return String(lines[index] || '').includes('|') && isTableSeparator(lines[index + 1]);
}

function isHtmlBlockStart(line) {
  return /^\s*<(?:table|div|section|aside|details|summary|pre|script|style|iframe|video|audio|canvas|svg)\b/i.test(line);
}

function startsStructuralBlock(lines, index) {
  const line = String(lines[index] || '');
  return isBlank(line)
    || isFence(line)
    || isAnyHeading(line)
    || isHr(line)
    || Boolean(listKind(line))
    || isQuote(line)
    || isFigureStart(line)
    || isTableStart(lines, index)
    || isHtmlBlockStart(line);
}

export function normalizeBlockText(text = '') {
  return String(text)
    .normalize('NFKC')
    .replace(/[*_~`]+/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

function blockFingerprint(type, normalizedText) {
  let hash = 2166136261;
  const input = `${type}:${normalizedText}`;
  for (let index = 0; index < input.length; index += 1) {
    hash ^= input.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(16).padStart(8, '0');
}

function makeBlock(type, text, index) {
  const normalizedText = normalizeBlockText(text);
  return {
    index,
    type,
    text: String(text).trim(),
    normalizedText,
    fingerprint: blockFingerprint(type, normalizedText)
  };
}

export function parseMarkdownBlocks(markdown = '') {
  const lines = stripFrontmatter(markdown).replace(/\r\n?/g, '\n').split('\n');
  const sections = [{ index: 0, heading: null, blocks: [] }];
  let sectionIndex = 0;
  let i = 0;

  const push = (type, text) => {
    if (!LOCATOR_TYPES.has(type)) return;
    const blocks = sections[sectionIndex].blocks;
    blocks.push(makeBlock(type, text, blocks.length));
  };

  while (i < lines.length) {
    const line = lines[i];

    if (isBlank(line)) {
      i += 1;
      continue;
    }

    if (isH2(line)) {
      sectionIndex += 1;
      sections.push({
        index: sectionIndex,
        heading: line.replace(/^\s{0,3}##(?!#)\s+/, '').trim(),
        blocks: []
      });
      i += 1;
      continue;
    }

    if (isAnyHeading(line) || isHr(line)) {
      i += 1;
      continue;
    }

    if (isFence(line)) {
      const opener = line.match(/^\s{0,3}(```+|~~~+)/)?.[1] || '```';
      const marker = opener[0];
      const minLength = opener.length;
      i += 1;
      while (i < lines.length) {
        const close = lines[i].match(/^\s{0,3}(```+|~~~+)/)?.[1] || '';
        i += 1;
        if (close && close[0] === marker && close.length >= minLength) break;
      }
      continue;
    }

    if (isFigureStart(line)) {
      const start = i;
      i += 1;
      while (i < lines.length && !/<\/figure>\s*$/i.test(lines[i - 1])) i += 1;
      push('figure', lines.slice(start, i).join('\n'));
      continue;
    }

    if (isTableStart(lines, i)) {
      i += 2;
      while (i < lines.length && !isBlank(lines[i]) && lines[i].includes('|')) i += 1;
      continue;
    }

    if (isHtmlBlockStart(line)) {
      const tag = line.match(/^\s*<([a-z0-9-]+)/i)?.[1]?.toLowerCase();
      i += 1;
      if (tag && !new RegExp(`</${tag}>`, 'i').test(line)) {
        while (i < lines.length && !new RegExp(`</${tag}>`, 'i').test(lines[i])) i += 1;
        if (i < lines.length) i += 1;
      }
      continue;
    }

    const kind = listKind(line);
    if (kind) {
      const start = i;
      i += 1;
      while (i < lines.length) {
        if (listKind(lines[i]) === kind || /^\s{2,}\S/.test(lines[i]) || isBlank(lines[i])) {
          let probe = i;
          while (probe < lines.length && isBlank(lines[probe])) probe += 1;
          if (probe < lines.length && listKind(lines[probe]) === kind) {
            i = probe + 1;
            continue;
          }
          if (isBlank(lines[i])) break;
          i += 1;
          continue;
        }
        break;
      }
      push(kind, lines.slice(start, i).join('\n'));
      continue;
    }

    if (isQuote(line)) {
      const start = i;
      i += 1;
      while (i < lines.length && (isQuote(lines[i]) || isBlank(lines[i]))) {
        let probe = i;
        while (probe < lines.length && isBlank(lines[probe])) probe += 1;
        if (probe < lines.length && isQuote(lines[probe])) {
          i = probe + 1;
          continue;
        }
        if (isBlank(lines[i])) break;
        i += 1;
      }
      push('blockquote', lines.slice(start, i).join('\n'));
      continue;
    }

    const start = i;
    i += 1;
    while (i < lines.length && !startsStructuralBlock(lines, i)) i += 1;
    push('p', lines.slice(start, i).join('\n'));
  }

  const reference = parseMarkdownStructure(markdown);
  const projected = sections.map(section => section.blocks.map(block => block.type));
  const expected = reference.map(section => section.blocks);
  if (JSON.stringify(projected) !== JSON.stringify(expected)) {
    throw new Error('Review packet parser diverged from Reading Locator structure semantics');
  }
  return sections;
}

function tokenSet(text) {
  const normalized = normalizeBlockText(text);
  const tokens = normalized.match(/[a-z0-9]+|[\u3040-\u30ff\u3400-\u9fff]/g) || [];
  return new Set(tokens);
}

function diceCoefficient(left, right) {
  const a = tokenSet(left);
  const b = tokenSet(right);
  if (!a.size && !b.size) return 1;
  if (!a.size || !b.size) return 0;
  let overlap = 0;
  for (const token of a) if (b.has(token)) overlap += 1;
  return (2 * overlap) / (a.size + b.size);
}

function edgeSimilarity(left, right, side) {
  const a = normalizeBlockText(left);
  const b = normalizeBlockText(right);
  if (!a || !b) return 0;
  const length = Math.min(32, a.length, b.length);
  let matched = 0;
  for (let index = 0; index < length; index += 1) {
    const ai = side === 'prefix' ? index : a.length - 1 - index;
    const bi = side === 'prefix' ? index : b.length - 1 - index;
    if (a[ai] !== b[bi]) break;
    matched += 1;
  }
  return length ? matched / length : 0;
}

export function blockSimilarity(left, right) {
  if (!left || !right) return 0;
  const typeScore = left.type === right.type ? 1 : 0;
  return (0.45 * diceCoefficient(left.text, right.text))
    + (0.25 * edgeSimilarity(left.text, right.text, 'prefix'))
    + (0.20 * edgeSimilarity(left.text, right.text, 'suffix'))
    + (0.10 * typeScore);
}

export function detectSuspectedRange(canonicalBlocks = [], variantBlocks = [], threshold = 0.35) {
  const min = Math.min(canonicalBlocks.length, variantBlocks.length);
  let prefix = 0;
  while (prefix < min && canonicalBlocks[prefix].type === variantBlocks[prefix].type
    && blockSimilarity(canonicalBlocks[prefix], variantBlocks[prefix]) >= threshold) {
    prefix += 1;
  }

  let suffix = 0;
  while (suffix < min - prefix) {
    const canonicalIndex = canonicalBlocks.length - 1 - suffix;
    const variantIndex = variantBlocks.length - 1 - suffix;
    const left = canonicalBlocks[canonicalIndex];
    const right = variantBlocks[variantIndex];
    if (left.type !== right.type || blockSimilarity(left, right) < threshold) break;
    suffix += 1;
  }

  const canonicalStart = prefix;
  const canonicalEnd = Math.max(canonicalStart, canonicalBlocks.length - suffix - 1);
  const variantStart = prefix;
  const variantEnd = Math.max(variantStart, variantBlocks.length - suffix - 1);
  const canonicalSpan = canonicalBlocks.length ? canonicalEnd - canonicalStart + 1 : 0;
  const variantSpan = variantBlocks.length ? variantEnd - variantStart + 1 : 0;
  const ratio = Math.max(
    canonicalBlocks.length ? canonicalSpan / canonicalBlocks.length : 1,
    variantBlocks.length ? variantSpan / variantBlocks.length : 1
  );

  return { canonicalStart, canonicalEnd, variantStart, variantEnd, prefixAligned: prefix, suffixAligned: suffix, ratio };
}

function confidenceFor(issue, range, canonicalBlocks, variantBlocks) {
  if (issue.kind === 'SECTION_MISMATCH') return 'LOW';
  const delta = Math.abs((issue.alternateCount ?? variantBlocks.length) - (issue.canonicalCount ?? canonicalBlocks.length));
  if (range.ratio <= 0.35 && delta <= 1 && range.prefixAligned + range.suffixAligned >= 1) return 'HIGH';
  if (range.ratio <= 0.65 && delta <= 2 && range.prefixAligned + range.suffixAligned >= 1) return 'MEDIUM';
  return 'LOW';
}

function suggestionFor(issue) {
  if (issue.kind === 'COUNT_MISMATCH') {
    if ((issue.alternateCount ?? 0) < (issue.canonicalCount ?? 0)) return 'Possible paragraph merge or canonical omission. Review exact text before choosing a migration policy.';
    return 'Possible paragraph split or variant insertion. Review exact text before choosing a migration policy.';
  }
  if (issue.kind === 'TYPE_MISMATCH') return 'Locator block types differ. Review whether Markdown structure changed without changing meaning.';
  if (issue.kind === 'SECTION_MISMATCH') return 'Section boundaries differ. Do not auto-repair; inspect headings and moved content manually.';
  return 'Structural mismatch requires review.';
}

function displayText(text, maxText = 800) {
  const value = String(text || '').trim();
  return value.length > maxText ? `${value.slice(0, maxText)}…` : value;
}

function issuePacket(row, issue, canonicalSections, variantSections, maxText) {
  const sectionIndex = Number.isInteger(issue.section) ? issue.section : 0;
  const canonicalSection = canonicalSections[sectionIndex] || { heading: null, blocks: [] };
  const variantSection = variantSections[sectionIndex] || { heading: null, blocks: [] };
  const range = detectSuspectedRange(canonicalSection.blocks, variantSection.blocks);
  const confidence = confidenceFor(issue, range, canonicalSection.blocks, variantSection.blocks);
  return {
    id: row.id,
    variant: row.version,
    canonicalPath: row.canonicalPath,
    variantPath: row.path,
    sectionIndex,
    canonicalHeading: canonicalSection.heading,
    variantHeading: variantSection.heading,
    issueKind: issue.kind,
    classification: row.migration.taxonomy,
    repairability: row.migration.repairability,
    canonicalCount: canonicalSection.blocks.length,
    variantCount: variantSection.blocks.length,
    canonicalBlocks: canonicalSection.blocks,
    variantBlocks: variantSection.blocks,
    suspectedRange: range,
    suggestion: suggestionFor(issue),
    confidence,
    decision: 'REVIEW_REQUIRED',
    display: {
      canonicalBlocks: canonicalSection.blocks.map(block => ({ ...block, text: displayText(block.text, maxText) })),
      variantBlocks: variantSection.blocks.map(block => ({ ...block, text: displayText(block.text, maxText) }))
    }
  };
}

export function buildReviewPackets(auditPayload = {}, { root = ROOT, id = '', variant = '', maxText = 800 } = {}) {
  const enriched = auditPayload.migrationSummary ? auditPayload : enrichAudit(auditPayload);
  const packets = [];

  for (const row of enriched.results || []) {
    if (row.ok) continue;
    if (id && row.id !== id) continue;
    if (variant && row.version !== variant) continue;
    if (!row.canonicalPath || !row.path) continue;

    const canonicalFullPath = path.join(root, row.canonicalPath);
    const variantFullPath = path.join(root, row.path);
    if (!fs.existsSync(canonicalFullPath) || !fs.existsSync(variantFullPath)) continue;

    const canonicalSections = parseMarkdownBlocks(fs.readFileSync(canonicalFullPath, 'utf8'));
    const variantSections = parseMarkdownBlocks(fs.readFileSync(variantFullPath, 'utf8'));
    for (const issue of row.issues || []) packets.push(issuePacket(row, issue, canonicalSections, variantSections, maxText));
  }

  const summary = {
    articles: new Set(packets.map(packet => `${packet.id}:${packet.variant}`)).size,
    packets: packets.length,
    highConfidence: packets.filter(packet => packet.confidence === 'HIGH').length,
    mediumConfidence: packets.filter(packet => packet.confidence === 'MEDIUM').length,
    lowConfidence: packets.filter(packet => packet.confidence === 'LOW').length
  };
  return { schemaVersion: 1, generatedAt: new Date().toISOString(), summary, packets };
}

function rangeLabel(range, side) {
  const start = range[`${side}Start`] + 1;
  const end = range[`${side}End`] + 1;
  return start === end ? String(start) : `${start}-${end}`;
}

export function renderReviewPackets(payload = {}, { maxText = 800 } = {}) {
  const lines = [
    '# Structure Review Packets',
    '',
    `Generated: ${payload.generatedAt || new Date().toISOString()}`,
    '',
    '## Summary',
    '',
    `- Articles: ${payload.summary?.articles ?? 0}`,
    `- Packets: ${payload.summary?.packets ?? 0}`,
    `- HIGH confidence: ${payload.summary?.highConfidence ?? 0}`,
    `- MEDIUM confidence: ${payload.summary?.mediumConfidence ?? 0}`,
    `- LOW confidence: ${payload.summary?.lowConfidence ?? 0}`,
    '',
    '> Confidence describes boundary-detection confidence only. It never authorizes automatic repair.',
    ''
  ];

  for (const packet of payload.packets || []) {
    lines.push('---', '', `## ${packet.id} / ${packet.variant}`, '');
    lines.push(`- Section: ${packet.sectionIndex}${packet.canonicalHeading ? ` — ${packet.canonicalHeading}` : ''}`);
    lines.push(`- Issue: ${packet.issueKind}`);
    lines.push(`- Classification: ${packet.classification}`);
    lines.push(`- Repairability: ${packet.repairability}`);
    lines.push(`- Counts: JA ${packet.canonicalCount} / VERSION ${packet.variantCount}`);
    lines.push(`- Suspected range: JA ${rangeLabel(packet.suspectedRange, 'canonical')} ↔ VERSION ${rangeLabel(packet.suspectedRange, 'variant')}`);
    lines.push(`- Confidence: ${packet.confidence}`);
    lines.push(`- Decision: ${packet.decision}`, '', '### Canonical blocks', '');
    for (const block of packet.canonicalBlocks || []) {
      lines.push(`#### JA ${block.index + 1} · ${block.type}`, '', displayText(block.text, maxText), '');
    }
    lines.push('### Variant blocks', '');
    for (const block of packet.variantBlocks || []) {
      lines.push(`#### VERSION ${block.index + 1} · ${block.type}`, '', displayText(block.text, maxText), '');
    }
    lines.push('### Diagnostic', '', packet.suggestion, '');
  }
  return `${lines.join('\n')}\n`;
}

function argValue(name) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : '';
}

function main() {
  const audit = argValue('--audit');
  const jsonOutput = argValue('--json');
  const markdownOutput = argValue('--markdown');
  const id = argValue('--id');
  const variant = argValue('--variant');
  const maxText = Number(argValue('--max-text')) || 800;
  if (!audit || !jsonOutput || !markdownOutput) {
    console.error('Usage: node scripts/build-structure-review-packets.mjs --audit <audit.json> --json <packets.json> --markdown <packets.md> [--id <slug>] [--variant <name>] [--max-text <n>]');
    process.exit(2);
  }

  const payload = JSON.parse(fs.readFileSync(path.resolve(audit), 'utf8'));
  const packets = buildReviewPackets(payload, { id, variant, maxText });
  fs.writeFileSync(path.resolve(jsonOutput), `${JSON.stringify(packets, null, 2)}\n`, 'utf8');
  fs.writeFileSync(path.resolve(markdownOutput), renderReviewPackets(packets, { maxText }), 'utf8');
  console.log(`REVIEW PACKETS: ${packets.summary.packets} packets across ${packets.summary.articles} article variants; HIGH=${packets.summary.highConfidence}, MEDIUM=${packets.summary.mediumConfidence}, LOW=${packets.summary.lowConfidence}.`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) main();
