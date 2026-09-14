#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const ROOT = process.cwd();
const LOCATOR_TYPES = new Set(['p', 'ul', 'ol', 'blockquote', 'figure']);

function stripFrontmatter(markdown = '') {
  return String(markdown).replace(/^---\s*\r?\n[\s\S]*?\r?\n---\s*(?:\r?\n|$)/, '');
}

function frontmatterId(markdown = '') {
  const match = String(markdown).match(/^---\s*\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return '';
  const id = match[1].match(/^id:\s*["']?([^"'\r\n]+)["']?\s*$/m);
  return id ? id[1].trim() : '';
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
  return /^\s{0,3}((\*\s*){3,}|(-\s*){3,}|(_\s*){3,})$/.test(line.trim());
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
  const line = String(lines[index] || '');
  const next = String(lines[index + 1] || '');
  return line.includes('|') && isTableSeparator(next);
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

export function parseMarkdownStructure(markdown = '') {
  const lines = stripFrontmatter(markdown).replace(/\r\n?/g, '\n').split('\n');
  const sections = [{ index: 0, heading: null, blocks: [] }];
  let sectionIndex = 0;
  let i = 0;

  const push = type => {
    if (LOCATOR_TYPES.has(type)) sections[sectionIndex].blocks.push(type);
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
      push('figure');
      i += 1;
      while (i < lines.length && !/<\/figure>\s*$/i.test(lines[i - 1])) i += 1;
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
      push(kind);
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
      continue;
    }

    if (isQuote(line)) {
      push('blockquote');
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
      continue;
    }

    push('p');
    i += 1;
    while (i < lines.length && !startsStructuralBlock(lines, i)) i += 1;
  }

  return sections;
}

export function compareStructures(canonical, alternate) {
  const left = Array.isArray(canonical) ? canonical : parseMarkdownStructure(canonical);
  const right = Array.isArray(alternate) ? alternate : parseMarkdownStructure(alternate);
  const issues = [];
  const sectionCount = Math.max(left.length, right.length);

  if (left.length !== right.length) {
    issues.push({
      kind: 'SECTION_MISMATCH',
      section: null,
      canonicalSections: left.length,
      alternateSections: right.length,
      message: `section count differs: JA=${left.length}, ALT=${right.length}`
    });
  }

  for (let index = 0; index < sectionCount; index += 1) {
    const ja = left[index];
    const alt = right[index];
    if (!ja || !alt) {
      issues.push({
        kind: 'SECTION_MISMATCH',
        section: index,
        canonicalCount: ja?.blocks.length ?? 0,
        alternateCount: alt?.blocks.length ?? 0,
        message: `section ${index}: missing on ${ja ? 'ALT' : 'JA'}`
      });
      continue;
    }

    if (ja.blocks.length !== alt.blocks.length) {
      const delta = alt.blocks.length - ja.blocks.length;
      issues.push({
        kind: 'COUNT_MISMATCH',
        section: index,
        canonicalCount: ja.blocks.length,
        alternateCount: alt.blocks.length,
        hint: delta < 0 ? 'POSSIBLE_MERGE' : 'POSSIBLE_SPLIT',
        message: `section ${index}: JA=${ja.blocks.length}, ALT=${alt.blocks.length}`
      });
      continue;
    }

    const typeDiffs = [];
    for (let block = 0; block < ja.blocks.length; block += 1) {
      if (ja.blocks[block] !== alt.blocks[block]) {
        typeDiffs.push({ block: block + 1, canonical: ja.blocks[block], alternate: alt.blocks[block] });
      }
    }
    if (typeDiffs.length) {
      issues.push({
        kind: 'TYPE_MISMATCH',
        section: index,
        canonicalCount: ja.blocks.length,
        alternateCount: alt.blocks.length,
        diffs: typeDiffs,
        message: `section ${index}: locator block types differ`
      });
    }
  }

  return { ok: issues.length === 0, issues, canonical: left, alternate: right };
}

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(ROOT, relativePath), 'utf8'));
}

function canonicalMap() {
  const index = readJson('data/index.json');
  const map = new Map();
  for (const relativePath of index.essays || []) {
    const fullPath = path.join(ROOT, relativePath);
    if (!fs.existsSync(fullPath)) continue;
    const markdown = fs.readFileSync(fullPath, 'utf8');
    const id = frontmatterId(markdown) || path.basename(relativePath, '.md').replace(/^\d{4}-\d{2}-\d{2}-/, '');
    if (id) map.set(id, relativePath);
  }
  return map;
}

function variantEntries() {
  const versions = readJson('data/versions-index.json');
  const rows = [];
  for (const [id, variants] of Object.entries(versions.articles || {})) {
    for (const [version, relativePath] of Object.entries(variants || {})) {
      if (typeof relativePath === 'string' && relativePath.trim()) rows.push({ id, version, path: relativePath });
    }
  }
  return rows;
}

function idsChangedSince(base) {
  const ids = new Set();
  const diff = spawnSync('git', ['diff', '--name-only', base, 'HEAD'], { cwd: ROOT, encoding: 'utf8' });
  if (diff.status !== 0) throw new Error(`git diff failed for base ${base}: ${diff.stderr || diff.stdout}`);
  const files = diff.stdout.split(/\r?\n/).filter(Boolean);

  for (const file of files) {
    if (/^(english-mix|spanish-mix)\/.+\.md$/.test(file)) {
      ids.add(path.basename(file, '.md'));
    } else if (/^essays\/.+\.md$/.test(file) && fs.existsSync(path.join(ROOT, file))) {
      const markdown = fs.readFileSync(path.join(ROOT, file), 'utf8');
      const id = frontmatterId(markdown) || path.basename(file, '.md').replace(/^\d{4}-\d{2}-\d{2}-/, '');
      if (id) ids.add(id);
    }
  }

  if (files.includes('data/versions-index.json')) {
    const before = spawnSync('git', ['show', `${base}:data/versions-index.json`], { cwd: ROOT, encoding: 'utf8' });
    if (before.status === 0) {
      try {
        const previous = JSON.parse(before.stdout).articles || {};
        const current = readJson('data/versions-index.json').articles || {};
        for (const id of new Set([...Object.keys(previous), ...Object.keys(current)])) {
          if (JSON.stringify(previous[id] || null) !== JSON.stringify(current[id] || null)) ids.add(id);
        }
      } catch {
        // Content paths still drive the strict gate if historical JSON cannot be parsed.
      }
    }
  }
  return ids;
}

export function auditRepository({ ids = null } = {}) {
  const canonicals = canonicalMap();
  const selected = ids ? new Set(ids) : null;
  const results = [];

  for (const entry of variantEntries()) {
    if (selected && !selected.has(entry.id)) continue;
    const canonicalPath = canonicals.get(entry.id);
    if (!canonicalPath) {
      results.push({
        ...entry,
        canonicalPath: null,
        ok: false,
        issues: [{ kind: 'MISSING_CANONICAL', section: null, message: 'canonical Japanese article not found' }]
      });
      continue;
    }
    const variantPath = path.join(ROOT, entry.path);
    if (!fs.existsSync(variantPath)) {
      results.push({
        ...entry,
        canonicalPath,
        ok: false,
        issues: [{ kind: 'MISSING_VARIANT', section: null, message: `variant file not found: ${entry.path}` }]
      });
      continue;
    }

    const ja = fs.readFileSync(path.join(ROOT, canonicalPath), 'utf8');
    const alt = fs.readFileSync(variantPath, 'utf8');
    const comparison = compareStructures(ja, alt);
    results.push({ ...entry, canonicalPath, ok: comparison.ok, issues: comparison.issues });
  }
  return results;
}

function summarize(results) {
  const counts = {
    total: results.length,
    perfect: results.filter(row => row.ok).length,
    mismatched: results.filter(row => !row.ok).length,
    sectionMismatch: 0,
    countMismatch: 0,
    typeMismatch: 0,
    missing: 0
  };
  for (const row of results) {
    for (const issue of row.issues || []) {
      if (issue.kind === 'SECTION_MISMATCH') counts.sectionMismatch += 1;
      else if (issue.kind === 'COUNT_MISMATCH') counts.countMismatch += 1;
      else if (issue.kind === 'TYPE_MISMATCH') counts.typeMismatch += 1;
      else if (issue.kind.startsWith('MISSING_')) counts.missing += 1;
    }
  }
  return counts;
}

function printReport(results) {
  const counts = summarize(results);
  console.log(`STRUCTURE AUDIT: ${counts.perfect}/${counts.total} variants match; ${counts.mismatched} mismatch.`);
  for (const row of results.filter(item => !item.ok)) {
    console.log(`\nSTRUCTURE ERROR ${row.id} [${row.version}]`);
    console.log(`  JA: ${row.canonicalPath || '(missing)'}`);
    console.log(`  ALT: ${row.path}`);
    for (const issue of row.issues || []) {
      if (issue.section == null) {
        console.log(`  - ${issue.kind}: ${issue.message}`);
      } else {
        const label = issue.section === 0 ? '0 (preface)' : String(issue.section);
        const countsText = Number.isInteger(issue.canonicalCount)
          ? ` JA=${issue.canonicalCount} ALT=${issue.alternateCount}`
          : '';
        const hint = issue.hint ? ` ${issue.hint}` : '';
        console.log(`  - Section ${label}: ${issue.kind}${countsText}${hint}`);
      }
    }
  }
  return counts;
}

function argValue(name) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : '';
}

function main() {
  const reportOnly = process.argv.includes('--report-only');
  const all = process.argv.includes('--all');
  const id = argValue('--id');
  const changedFrom = argValue('--changed-from');
  const jsonPath = argValue('--json');

  let ids = null;
  let mode = 'all';
  if (id) {
    ids = new Set([id]);
    mode = `id:${id}`;
  } else if (changedFrom) {
    ids = idsChangedSince(changedFrom);
    mode = `changed:${changedFrom}`;
  } else if (!all) {
    console.error('Usage: node scripts/validate-version-structure.mjs --all | --id <id> | --changed-from <git-ref> [--report-only] [--json <file>]');
    process.exit(2);
  }

  const results = auditRepository({ ids });
  const counts = printReport(results);
  const payload = {
    generatedAt: new Date().toISOString(),
    mode,
    counts,
    results
  };

  if (jsonPath) {
    fs.writeFileSync(path.join(ROOT, jsonPath), `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
  }

  if (!reportOnly && results.some(row => !row.ok)) process.exit(1);
}

const invokedPath = process.argv[1] ? path.resolve(process.argv[1]) : '';
if (invokedPath && import.meta.url === new URL(`file://${invokedPath}`).href) main();
