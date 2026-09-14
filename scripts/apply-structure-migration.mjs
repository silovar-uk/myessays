#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { compareStructures } from './validate-version-structure.mjs';

const ROOT = process.cwd();

function occurrences(text, needle) {
  if (!needle) return 0;
  let count = 0;
  let index = 0;
  while ((index = text.indexOf(needle, index)) >= 0) {
    count += 1;
    index += needle.length;
  }
  return count;
}

function whitespaceNormalized(text) {
  return String(text).replace(/\s+/g, ' ').trim();
}

export function applyExactOperation(text, operation, canonicalText = '') {
  const fromCount = occurrences(text, operation.from);
  const toCount = occurrences(text, operation.to);

  if (fromCount === 0 && toCount >= 1) {
    return { text, status: 'already-applied' };
  }
  if (fromCount !== 1) {
    throw new Error(`Expected exactly one pending match, found ${fromCount}: ${operation.label || operation.from.slice(0, 60)}`);
  }

  const next = text.replace(operation.from, operation.to);
  if (operation.policy === 'structure-only' && whitespaceNormalized(text) !== whitespaceNormalized(next)) {
    throw new Error(`structure-only operation changes non-whitespace text: ${operation.label || 'unnamed operation'}`);
  }
  if (operation.policy === 'canonical-restore') {
    if (!operation.restoredText) throw new Error('canonical-restore requires restoredText');
    if (!canonicalText.includes(operation.restoredText)) throw new Error(`restoredText is not present in canonical source: ${operation.label || 'unnamed operation'}`);
    if (!next.includes(operation.restoredText)) throw new Error(`restoredText was not inserted: ${operation.label || 'unnamed operation'}`);
  }
  return { text: next, status: 'pending' };
}

export function applyTarget(target, { apply = false, root = ROOT } = {}) {
  const variantPath = path.join(root, target.variant);
  const canonicalPath = path.join(root, target.canonical);
  const before = fs.readFileSync(variantPath, 'utf8');
  const canonical = fs.readFileSync(canonicalPath, 'utf8');
  let current = before;
  const statuses = [];

  for (const operation of target.operations || []) {
    const result = applyExactOperation(current, operation, canonical);
    current = result.text;
    statuses.push({ label: operation.label || 'operation', status: result.status });
  }

  const comparison = compareStructures(canonical, current);
  if (!comparison.ok) {
    throw new Error(`${target.id} would still mismatch after plan: ${JSON.stringify(comparison.issues)}`);
  }

  if (apply && current !== before) fs.writeFileSync(variantPath, current, 'utf8');
  return { id: target.id, changed: current !== before, statuses };
}

export function runPlan(plan, options = {}) {
  if (!plan?.id || !Array.isArray(plan.targets) || !plan.targets.length) throw new Error('Invalid migration plan');
  const results = plan.targets.map(target => applyTarget(target, options));
  return { id: plan.id, results };
}

function argValue(name) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : '';
}

function main() {
  const planPath = argValue('--plan');
  const apply = process.argv.includes('--apply');
  if (!planPath) {
    console.error('Usage: node scripts/apply-structure-migration.mjs --plan <plan.json> [--apply]');
    process.exit(2);
  }
  const plan = JSON.parse(fs.readFileSync(path.resolve(planPath), 'utf8'));
  const result = runPlan(plan, { apply });
  for (const row of result.results) {
    const statuses = row.statuses.map(item => `${item.label}:${item.status}`).join(', ');
    console.log(`${row.id}: ${row.changed ? (apply ? 'APPLIED' : 'WOULD_APPLY') : 'ALREADY_APPLIED'} — ${statuses}`);
  }
  console.log(`MIGRATION ${plan.id}: ${apply ? 'apply' : 'check'} complete; ${result.results.length} targets structurally aligned after plan.`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) main();
