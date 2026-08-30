#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = new Set(process.argv.slice(2));
const format = args.has('--json') ? 'json' : 'markdown';
const strict = args.has('--strict');
const write = args.has('--write');

const read = file => fs.readFileSync(path.join(root, file), 'utf8').replace(/\r\n?/g, '\n');
const exists = file => fs.existsSync(path.join(root, file));

function listMarkdown(directory) {
  const dir = path.join(root, directory);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true })
    .filter(entry => entry.isFile() && entry.name.endsWith('.md') && entry.name !== 'README.md')
    .map(entry => `${directory}/${entry.name}`)
    .sort();
}

function parseFrontMatter(file) {
  const source = read(file);
  const match = source.match(/^---\n([\s\S]*?)\n---(?:\n|$)/);
  if (!match) return { meta: {}, body: source, issues: ['missing-front-matter'] };

  const meta = {};
  const issues = [];
  for (const line of match[1].split('\n')) {
    const separator = line.indexOf(':');
    if (separator < 0) continue;
    const key = line.slice(0, separator).trim();
    const raw = line.slice(separator + 1).trim();
    if (!key) continue;
    try { meta[key] = JSON.parse(raw); }
    catch { meta[key] = raw.replace(/^['"]|['"]$/g, ''); }
  }

  return { meta, body: source.slice(match[0].length), issues };
}

function textValue(value) {
  if (value == null) return '';
  return String(value).trim();
}

function articleId(file) {
  return textValue(parseFrontMatter(file).meta.id);
}

function hasReferenceSection(body) {
  return /^#{1,3}\s+(参考文献|出典|出典・参考|出典・参考文献|参考文献・関連資料|Sources?|References?)/im.test(body);
}

function countHeadings(body) {
  return (body.match(/^#{2,4}\s+.+$/gm) || []).length;
}

function countStructure(body) {
  return (body.match(/<!--\s*level:[1-5]\s+role:[a-z-]+\s*-->/gi) || []).length;
}

function bodyChars(body) {
  return body
    .replace(/<!--[^]*?-->/g, '')
    .replace(/```[^]*?```/g, '')
    .replace(/[#>*_`\[\]()\-]/g, '')
    .replace(/\s/g, '')
    .length;
}

function freshnessRisk(meta, body) {
  const sample = `${textValue(meta.title)} ${textValue(meta.tags)} ${textValue(meta.keywords)} ${body.slice(0, 2500)}`.toLowerCase();
  const reviewTokens = [
    'current', 'latest', '最新', '現在', '現役', '選手', 'チーム', 'urawa', '浦和',
    'marinos', 'マリノス', 'company', '企業', 'market', '市場', '株', 'fx', '生成ai',
    'claude', 'software', 'node.js', '価格', '法律', 'hospital', '肺炎', 'health', '医療'
  ];
  return reviewTokens.some(token => sample.includes(token)) ? 'review' : 'low';
}

const requiredCanonicalFields = ['id', 'title', 'created'];
const preferredFields = ['subtitle', 'updated', 'type', 'status', 'tags', 'keywords', 'favorite', 'grow', 'abstract'];
const canonicalIndex = JSON.parse(read('data/index.json'));
const canonicalPaths = Array.isArray(canonicalIndex.essays) ? canonicalIndex.essays : [];
const versionsIndex = JSON.parse(read('data/versions-index.json'));
const versions = versionsIndex.articles && typeof versionsIndex.articles === 'object' ? versionsIndex.articles : {};
const actualCanonicalFiles = listMarkdown('essays');
const actualEnglishMix = listMarkdown('english-mix');
const actualSpanishMix = listMarkdown('spanish-mix');
const legacySpanishFiles = listMarkdown('spanish');
const supportedVersionKeys = new Set(['en-mix', 'es-mix']);

const errors = [];
const warnings = [];
const idToCanonical = new Map();
const indexedSet = new Set(canonicalPaths);

if (new Set(canonicalPaths).size !== canonicalPaths.length) errors.push('data/index.json contains duplicate paths');

const rows = canonicalPaths.map(file => {
  const issues = [];
  if (!exists(file)) {
    errors.push(`missing canonical file: ${file}`);
    return { path: file, id: '', title: '', issues: ['missing-file'], priority: 'P0', migrationClass: 'A' };
  }

  const { meta, body, issues: fmIssues } = parseFrontMatter(file);
  issues.push(...fmIssues);
  const id = textValue(meta.id);
  const title = textValue(meta.title);
  const created = textValue(meta.created);

  for (const key of requiredCanonicalFields) {
    if (!textValue(meta[key])) issues.push(`missing:${key}`);
  }
  if (created && !/^\d{4}-\d{2}-\d{2}$/.test(created)) issues.push('invalid:created');
  const preferredMissing = preferredFields.filter(key => meta[key] == null || textValue(meta[key]) === '');

  if (id) {
    if (idToCanonical.has(id)) {
      const message = `duplicate canonical id ${id}: ${idToCanonical.get(id)} / ${file}`;
      errors.push(message);
      issues.push('duplicate-id');
    } else idToCanonical.set(id, file);
  }

  const legacyMixedEn = /-mixed-en\.md$/i.test(file);
  if (legacyMixedEn) issues.push('legacy-canonical-mixed-en');

  const versionEntry = id ? (versions[id] || {}) : {};
  const structureSentences = countStructure(body);
  const priority = issues.some(issue => issue.startsWith('missing') || issue.startsWith('invalid') || issue === 'duplicate-id' || issue === 'legacy-canonical-mixed-en') ? 'P0' : 'P2';
  const migrationClass = legacyMixedEn ? 'A' : structureSentences > 0 ? 'C' : 'A';

  return {
    id,
    path: file,
    title,
    created,
    updated: textValue(meta.updated),
    type: textValue(meta.type),
    status: textValue(meta.status),
    series: textValue(meta.series),
    seriesOrder: meta.seriesOrder ?? '',
    favorite: meta.favorite ?? '',
    grow: meta.grow ?? '',
    bodyChars: bodyChars(body),
    headingCount: countHeadings(body),
    references: hasReferenceSection(body),
    structureSentences,
    enMix: Boolean(versionEntry['en-mix']),
    esMix: Boolean(versionEntry['es-mix']),
    legacyMixedEn,
    preferredMissing,
    freshnessRisk: freshnessRisk(meta, body),
    migrationClass,
    priority,
    issues
  };
});

for (const file of actualCanonicalFiles) {
  if (!indexedSet.has(file)) warnings.push(`unindexed markdown under essays/: ${file}`);
}

const canonicalIds = new Set(rows.map(row => row.id).filter(Boolean));
const indexedDerived = new Set();

for (const [id, entry] of Object.entries(versions)) {
  if (!canonicalIds.has(id)) errors.push(`versions-index references non-canonical id: ${id}`);
  for (const [version, file] of Object.entries(entry || {})) {
    indexedDerived.add(file);
    if (!supportedVersionKeys.has(version)) errors.push(`unsupported version key ${id}/${version}`);
    if (!exists(file)) {
      errors.push(`missing derived file ${id}/${version}: ${file}`);
      continue;
    }
    if (version === 'en-mix' && !file.startsWith('english-mix/')) warnings.push(`en-mix outside english-mix/: ${file}`);
    if (version === 'es-mix' && !file.startsWith('spanish-mix/')) warnings.push(`es-mix outside spanish-mix/: ${file}`);
    const derivedId = articleId(file);
    if (derivedId !== id) errors.push(`derived id mismatch ${file}: expected ${id}, got ${derivedId || '(missing)'}`);
    if (indexedSet.has(file)) errors.push(`derived file is also canonical: ${file}`);
  }
}

for (const file of [...actualEnglishMix, ...actualSpanishMix]) {
  if (!indexedDerived.has(file)) warnings.push(`derived markdown is not in versions-index: ${file}`);
}

if (legacySpanishFiles.length) {
  for (const file of legacySpanishFiles) warnings.push(`legacy full-Spanish markdown remains: ${file}`);
}
if (exists('spanish/README.md')) warnings.push('legacy contract remains: spanish/README.md');

const driftChecks = [
  ['README.md', source => /spanish\/|`es`|Español版|全文スペイン語/.test(source)],
  ['english-mix/README.md', source => /add `es`|Español version/.test(source)],
  ['spanish/README.md', source => /full Spanish|spanish\/|"es"|`es`/.test(source)],
  ['tests/data-integrity.test.js', source => /\['en-mix',\s*'es'\]|markdownFiles\('spanish'\)/.test(source)],
  ['tests/reader-versions.test.js', source => /\['en-mix',\s*'es'\]|spanish\/|\.es\b/.test(source)],
  ['scripts/reading-versions-qa.cjs', source => /['"]es['"]|Saber no basta|La pregunta de hoy/.test(source)],
  ['.github/workflows/visual-qa.yml', source => source.includes("- 'spanish/**'") && !source.includes("- 'spanish-mix/**'")]
];
const specDrift = driftChecks
  .filter(([file, detector]) => exists(file) && detector(read(file)))
  .map(([file]) => file);

const legacyCanonicalMixedEn = rows.filter(row => row.legacyMixedEn).map(row => row.path);
const summary = {
  generatedAt: new Date().toISOString(),
  canonicalIndexCount: canonicalPaths.length,
  canonicalFilesCount: actualCanonicalFiles.length,
  englishMixFilesCount: actualEnglishMix.length,
  spanishMixFilesCount: actualSpanishMix.length,
  legacySpanishFilesCount: legacySpanishFiles.length,
  structuredCanonicalCount: rows.filter(row => row.structureSentences > 0).length,
  legacyCanonicalMixedEnCount: legacyCanonicalMixedEn.length,
  errors: errors.length,
  warnings: warnings.length,
  specDriftFiles: specDrift.length
};

const audit = {
  summary,
  knownSpecDrift: specDrift,
  legacyCanonicalMixedEn,
  errors,
  warnings,
  articles: rows
};

function markdownReport(data) {
  const s = data.summary;
  const lines = [
    '# MyEssays Migration Audit',
    '',
    `Generated: ${s.generatedAt}`,
    '',
    '## Summary',
    '',
    `- Canonical index entries: ${s.canonicalIndexCount}`,
    `- Markdown files under essays/: ${s.canonicalFilesCount}`,
    `- English Mix files: ${s.englishMixFilesCount}`,
    `- Español Mix files: ${s.spanishMixFilesCount}`,
    `- Canonical articles with Structure metadata: ${s.structuredCanonicalCount}`,
    `- Legacy canonical *-mixed-en.md entries: ${s.legacyCanonicalMixedEnCount}`,
    `- Integrity errors: ${s.errors}`,
    `- Warnings: ${s.warnings}`,
    `- Known spec-drift files: ${s.specDriftFiles}`,
    '',
    '## P0 / compatibility findings',
    ''
  ];

  if (!data.errors.length && !data.legacyCanonicalMixedEn.length) lines.push('- No P0 integrity findings detected by this script.');
  data.errors.forEach(item => lines.push(`- ERROR: ${item}`));
  data.legacyCanonicalMixedEn.forEach(item => lines.push(`- LEGACY CANONICAL MIX: ${item}`));

  lines.push('', '## Specification drift', '');
  if (!data.knownSpecDrift.length) lines.push('- No known drift patterns detected.');
  data.knownSpecDrift.forEach(item => lines.push(`- ${item}`));

  lines.push('', '## Warnings', '');
  if (!data.warnings.length) lines.push('- None.');
  data.warnings.forEach(item => lines.push(`- ${item}`));

  lines.push('', '## Article inventory', '', '| Priority | Class | ID | Path | EN | ES | Structure | Freshness | Issues |', '| --- | --- | --- | --- | --- | --- | ---: | --- | --- |');
  data.articles.forEach(row => {
    const safe = value => String(value ?? '').replace(/\|/g, '\\|').replace(/\n/g, ' ');
    lines.push(`| ${row.priority} | ${row.migrationClass} | ${safe(row.id)} | ${safe(row.path)} | ${row.enMix ? 'yes' : '—'} | ${row.esMix ? 'yes' : '—'} | ${row.structureSentences || 0} | ${row.freshnessRisk || '—'} | ${safe((row.issues || []).join(', ')) || '—'} |`);
  });

  return `${lines.join('\n')}\n`;
}

const output = format === 'json' ? `${JSON.stringify(audit, null, 2)}\n` : markdownReport(audit);
process.stdout.write(output);

if (write) {
  fs.writeFileSync(path.join(root, 'data/migration-audit.json'), `${JSON.stringify(audit, null, 2)}\n`);
  fs.writeFileSync(path.join(root, 'MIGRATION_INVENTORY.generated.md'), markdownReport(audit));
  process.stderr.write('Wrote data/migration-audit.json and MIGRATION_INVENTORY.generated.md\n');
}

if (strict && errors.length) process.exitCode = 1;
