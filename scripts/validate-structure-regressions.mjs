#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { compareStructures } from './validate-version-structure.mjs';

const ROOT = process.cwd();

function frontmatterId(markdown = '') {
  const match = String(markdown).match(/^---\s*\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return '';
  const id = match[1].match(/^id:\s*["']?([^"'\r\n]+)["']?\s*$/m);
  return id ? id[1].trim() : '';
}

function idFromEssayPath(relativePath = '') {
  return path.basename(relativePath, '.md').replace(/^\d{4}-\d{2}-\d{2}-/, '');
}

function readCurrent(relativePath) {
  const full = path.join(ROOT, relativePath);
  return fs.existsSync(full) ? fs.readFileSync(full, 'utf8') : null;
}

function gitShow(ref, relativePath) {
  const result = spawnSync('git', ['show', `${ref}:${relativePath}`], { cwd: ROOT, encoding: 'utf8' });
  return result.status === 0 ? result.stdout : null;
}

function readJsonAt(ref, relativePath) {
  const raw = ref === 'HEAD' ? readCurrent(relativePath) : gitShow(ref, relativePath);
  if (raw == null) return null;
  return JSON.parse(raw);
}

function canonicalPathForId(indexJson, id) {
  const paths = indexJson?.essays || [];
  return paths.find(relativePath => idFromEssayPath(relativePath) === id) || null;
}

function auditIdAt(ref, id) {
  const indexJson = readJsonAt(ref, 'data/index.json');
  const versionsJson = readJsonAt(ref, 'data/versions-index.json');
  const canonicalPath = canonicalPathForId(indexJson, id);
  const variants = versionsJson?.articles?.[id] || {};
  const rows = [];

  for (const [version, variantPath] of Object.entries(variants)) {
    if (typeof variantPath !== 'string' || !variantPath.trim()) continue;
    if (!canonicalPath) {
      rows.push({
        id,
        version,
        path: variantPath,
        canonicalPath: null,
        ok: false,
        issues: [{ kind: 'MISSING_CANONICAL', section: null, message: 'canonical Japanese article not found' }]
      });
      continue;
    }

    const ja = ref === 'HEAD' ? readCurrent(canonicalPath) : gitShow(ref, canonicalPath);
    const alt = ref === 'HEAD' ? readCurrent(variantPath) : gitShow(ref, variantPath);
    if (ja == null) {
      rows.push({
        id,
        version,
        path: variantPath,
        canonicalPath,
        ok: false,
        issues: [{ kind: 'MISSING_CANONICAL', section: null, message: `canonical file not found: ${canonicalPath}` }]
      });
      continue;
    }
    if (alt == null) {
      rows.push({
        id,
        version,
        path: variantPath,
        canonicalPath,
        ok: false,
        issues: [{ kind: 'MISSING_VARIANT', section: null, message: `variant file not found: ${variantPath}` }]
      });
      continue;
    }

    const comparison = compareStructures(ja, alt);
    rows.push({ id, version, path: variantPath, canonicalPath, ok: comparison.ok, issues: comparison.issues });
  }
  return rows;
}

function changedIds(base) {
  const result = spawnSync('git', ['diff', '--name-status', base, 'HEAD'], { cwd: ROOT, encoding: 'utf8' });
  if (result.status !== 0) throw new Error(`git diff failed for ${base}: ${result.stderr || result.stdout}`);
  const ids = new Set();
  const rows = result.stdout.split(/\r?\n/).filter(Boolean);

  for (const row of rows) {
    const parts = row.split('\t');
    const status = parts[0] || '';
    const candidates = status.startsWith('R') || status.startsWith('C') ? parts.slice(1) : parts.slice(1, 2);
    for (const relativePath of candidates) {
      if (!relativePath) continue;
      if (/^(english-mix|spanish-mix)\/.+\.md$/.test(relativePath)) {
        ids.add(path.basename(relativePath, '.md'));
      } else if (/^essays\/.+\.md$/.test(relativePath)) {
        const current = readCurrent(relativePath);
        const before = gitShow(base, relativePath);
        const id = frontmatterId(current || before || '') || idFromEssayPath(relativePath);
        if (id) ids.add(id);
      }
    }
  }

  const versionsChanged = rows.some(row => row.split('\t').slice(1).includes('data/versions-index.json'));
  if (versionsChanged) {
    const before = readJsonAt(base, 'data/versions-index.json')?.articles || {};
    const current = readJsonAt('HEAD', 'data/versions-index.json')?.articles || {};
    for (const id of new Set([...Object.keys(before), ...Object.keys(current)])) {
      if (JSON.stringify(before[id] || null) !== JSON.stringify(current[id] || null)) ids.add(id);
    }
  }

  return ids;
}

function issueSeverity(issue) {
  if (!issue) return 0;
  if (issue.kind === 'MISSING_CANONICAL' || issue.kind === 'MISSING_VARIANT') return 1000000;
  if (issue.kind === 'SECTION_MISMATCH') {
    if (Number.isInteger(issue.canonicalSections) && Number.isInteger(issue.alternateSections)) {
      return 100000 + (Math.abs(issue.canonicalSections - issue.alternateSections) * 1000);
    }
    const delta = Math.abs((issue.canonicalCount || 0) - (issue.alternateCount || 0));
    return 100000 + (delta * 1000) + 1;
  }
  if (issue.kind === 'COUNT_MISMATCH') {
    return Math.abs((issue.canonicalCount || 0) - (issue.alternateCount || 0)) * 100;
  }
  if (issue.kind === 'TYPE_MISMATCH') return Math.max(1, issue.diffs?.length || 1);
  return 1;
}

export function severityBySection(row) {
  const map = new Map();
  for (const issue of row?.issues || []) {
    const key = issue.section == null ? 'document' : `section:${issue.section}`;
    map.set(key, Math.max(map.get(key) || 0, issueSeverity(issue)));
  }
  return map;
}

export function findRegressions(beforeRows = [], currentRows = []) {
  const beforeByVersion = new Map(beforeRows.map(row => [row.version, row]));
  const regressions = [];

  for (const current of currentRows) {
    const before = beforeByVersion.get(current.version) || null;
    const beforeSeverity = severityBySection(before);
    const currentSeverity = severityBySection(current);

    for (const [section, severity] of currentSeverity.entries()) {
      const baseline = beforeSeverity.get(section) || 0;
      if (severity <= baseline) continue;
      regressions.push({
        id: current.id,
        version: current.version,
        section,
        beforeSeverity: baseline,
        currentSeverity: severity,
        issues: (current.issues || []).filter(issue => (issue.section == null ? 'document' : `section:${issue.section}`) === section)
      });
    }
  }
  return regressions;
}

function printCurrentState(rows) {
  for (const row of rows) {
    if (row.ok) {
      console.log(`STRUCTURE OK ${row.id} [${row.version}]`);
      continue;
    }
    console.log(`STRUCTURE LEGACY/ERROR ${row.id} [${row.version}]`);
    for (const issue of row.issues || []) {
      const section = issue.section == null ? 'document' : `section ${issue.section}`;
      const counts = Number.isInteger(issue.canonicalCount)
        ? ` JA=${issue.canonicalCount} ALT=${issue.alternateCount}`
        : '';
      console.log(`  - ${section}: ${issue.kind}${counts}`);
    }
  }
}

function main() {
  const baseIndex = process.argv.indexOf('--base');
  const base = baseIndex >= 0 ? process.argv[baseIndex + 1] : '';
  if (!base) {
    console.error('Usage: node scripts/validate-structure-regressions.mjs --base <git-ref>');
    process.exit(2);
  }

  const ids = changedIds(base);
  if (!ids.size) {
    console.log('STRUCTURE REGRESSION GATE: no article pairs changed.');
    return;
  }

  const allRegressions = [];
  for (const id of [...ids].sort()) {
    const beforeRows = auditIdAt(base, id);
    const currentRows = auditIdAt('HEAD', id);
    printCurrentState(currentRows);
    allRegressions.push(...findRegressions(beforeRows, currentRows));
  }

  if (!allRegressions.length) {
    console.log(`\nSTRUCTURE REGRESSION GATE: PASS — ${ids.size} changed article(s), no new or worsened mismatch.`);
    return;
  }

  console.error(`\nSTRUCTURE REGRESSION GATE: FAIL — ${allRegressions.length} new/worsened mismatch(es).`);
  for (const regression of allRegressions) {
    console.error(`  - ${regression.id} [${regression.version}] ${regression.section}: ${regression.beforeSeverity} -> ${regression.currentSeverity}`);
  }
  process.exit(1);
}

const invokedPath = process.argv[1] ? path.resolve(process.argv[1]) : '';
if (invokedPath && import.meta.url === new URL(`file://${invokedPath}`).href) main();
