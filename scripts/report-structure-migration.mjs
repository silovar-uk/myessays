#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

export function classifyResult(row = {}) {
  const issues = Array.isArray(row.issues) ? row.issues : [];
  if (row.ok || issues.length === 0) {
    return {
      taxonomy: 'ALIGNED',
      severity: 'NONE',
      repairability: 'NONE',
      issueCount: 0,
      totalDelta: 0
    };
  }

  const kinds = new Set(issues.map(issue => issue.kind));
  const countIssues = issues.filter(issue => issue.kind === 'COUNT_MISMATCH');
  const totalDelta = countIssues.reduce((sum, issue) => {
    const ja = Number(issue.canonicalCount) || 0;
    const alt = Number(issue.alternateCount) || 0;
    return sum + Math.abs(alt - ja);
  }, 0);
  const deltas = countIssues.map(issue => (Number(issue.alternateCount) || 0) - (Number(issue.canonicalCount) || 0));

  let taxonomy = 'MIXED_STRUCTURAL';
  if ([...kinds].some(kind => kind.startsWith('MISSING_'))) taxonomy = 'MISSING_FILE_OR_CANONICAL';
  else if (kinds.has('SECTION_MISMATCH')) taxonomy = 'SECTION_BOUNDARY';
  else if (kinds.has('TYPE_MISMATCH') && kinds.size === 1) taxonomy = 'BLOCK_TYPE';
  else if (kinds.size === 1 && kinds.has('COUNT_MISMATCH')) {
    if (deltas.every(delta => delta < 0)) taxonomy = 'MERGE_OR_OMISSION';
    else if (deltas.every(delta => delta > 0)) taxonomy = 'SPLIT_OR_INSERTION';
    else taxonomy = 'MIXED_BOUNDARY';
  }

  let severity = 'LOW';
  if ([...kinds].some(kind => kind.startsWith('MISSING_')) || kinds.has('SECTION_MISMATCH')) severity = 'CRITICAL';
  else if (issues.length >= 5 || totalDelta >= 8 || (kinds.has('TYPE_MISMATCH') && kinds.has('COUNT_MISMATCH'))) severity = 'HIGH';
  else if (issues.length >= 2 || totalDelta >= 3 || kinds.has('TYPE_MISMATCH')) severity = 'MEDIUM';

  let repairability = 'HUMAN_REVIEW';
  if ([...kinds].some(kind => kind.startsWith('MISSING_')) || kinds.has('SECTION_MISMATCH')) repairability = 'UNSAFE';
  else if (kinds.size === 1 && kinds.has('COUNT_MISMATCH') && issues.length <= 2 && totalDelta <= 3) repairability = 'LIKELY_SAFE';

  return { taxonomy, severity, repairability, issueCount: issues.length, totalDelta };
}

function score(row) {
  const severity = { CRITICAL: 4, HIGH: 3, MEDIUM: 2, LOW: 1, NONE: 0 }[row.migration.severity] || 0;
  const repair = { LIKELY_SAFE: 3, HUMAN_REVIEW: 2, UNSAFE: 1, NONE: 0 }[row.migration.repairability] || 0;
  return repair * 1000 + severity * 100 - row.migration.issueCount * 10 - row.migration.totalDelta;
}

export function enrichAudit(payload = {}) {
  const results = (payload.results || []).map(row => ({ ...row, migration: classifyResult(row) }));
  const summary = { taxonomy: {}, severity: {}, repairability: {} };
  for (const row of results) {
    for (const key of Object.keys(summary)) {
      const value = row.migration[key];
      summary[key][value] = (summary[key][value] || 0) + 1;
    }
  }
  return { ...payload, migrationSummary: summary, results };
}

function formatCounts(object = {}) {
  return Object.entries(object)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([key, value]) => `- ${key}: ${value}`)
    .join('\n');
}

export function renderReport(payload = {}) {
  const enriched = payload.migrationSummary ? payload : enrichAudit(payload);
  const mismatches = enriched.results.filter(row => !row.ok);
  const likelySafe = mismatches
    .filter(row => row.migration.repairability === 'LIKELY_SAFE')
    .sort((a, b) => score(b) - score(a) || a.id.localeCompare(b.id));
  const review = mismatches
    .filter(row => row.migration.repairability === 'HUMAN_REVIEW')
    .sort((a, b) => score(b) - score(a) || a.id.localeCompare(b.id));

  const lines = [
    '# Structure migration report',
    '',
    `Generated: ${enriched.generatedAt || new Date().toISOString()}`,
    '',
    '## Current state',
    '',
    `- Total variants: ${enriched.counts?.total ?? enriched.results.length}`,
    `- Structurally aligned: ${enriched.counts?.perfect ?? enriched.results.filter(row => row.ok).length}`,
    `- Legacy mismatch: ${enriched.counts?.mismatched ?? mismatches.length}`,
    '',
    '## Taxonomy',
    '',
    formatCounts(enriched.migrationSummary.taxonomy),
    '',
    '## Severity',
    '',
    formatCounts(enriched.migrationSummary.severity),
    '',
    '## Repairability',
    '',
    formatCounts(enriched.migrationSummary.repairability),
    '',
    '## Likely-safe candidates',
    '',
    'Audit-only classification never grants SAFE automatically. LIKELY_SAFE means the structural shape is small enough for exact-text review; a human-verified migration plan is still required.',
    ''
  ];

  for (const row of likelySafe.slice(0, 30)) {
    const issues = row.issues.map(issue => {
      const section = issue.section == null ? '-' : issue.section;
      const delta = Number.isInteger(issue.canonicalCount)
        ? `JA ${issue.canonicalCount} / ALT ${issue.alternateCount}`
        : issue.message;
      return `S${section} ${issue.kind} (${delta})`;
    }).join('; ');
    lines.push(`- **${row.id}** [${row.version}] — ${row.migration.taxonomy}; severity=${row.migration.severity}; delta=${row.migration.totalDelta}; ${issues}`);
  }

  lines.push('', '## Human-review queue', '');
  for (const row of review.slice(0, 20)) {
    lines.push(`- **${row.id}** [${row.version}] — ${row.migration.taxonomy}; severity=${row.migration.severity}; issues=${row.migration.issueCount}; delta=${row.migration.totalDelta}`);
  }
  lines.push('', '## Principle', '', 'Use similarity or inference only to assist migration review. Comparison UI must continue to display only structurally guaranteed pairs.');
  return `${lines.join('\n')}\n`;
}

function argValue(name) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : '';
}

function main() {
  const input = argValue('--input');
  const output = argValue('--output');
  const jsonOutput = argValue('--json');
  if (!input || !output) {
    console.error('Usage: node scripts/report-structure-migration.mjs --input <audit.json> --output <report.md> [--json <enriched.json>]');
    process.exit(2);
  }
  const payload = JSON.parse(fs.readFileSync(path.resolve(input), 'utf8'));
  const enriched = enrichAudit(payload);
  fs.writeFileSync(path.resolve(output), renderReport(enriched), 'utf8');
  if (jsonOutput) fs.writeFileSync(path.resolve(jsonOutput), `${JSON.stringify(enriched, null, 2)}\n`, 'utf8');
  console.log(`MIGRATION REPORT: ${enriched.migrationSummary.repairability.LIKELY_SAFE || 0} likely-safe candidates; ${enriched.migrationSummary.repairability.HUMAN_REVIEW || 0} human-review; ${enriched.migrationSummary.repairability.UNSAFE || 0} unsafe.`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) main();
