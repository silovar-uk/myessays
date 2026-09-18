#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = new Set(process.argv.slice(2));
const write = args.has('--write');
const check = args.has('--check') || !write;

const read = file => fs.readFileSync(path.join(root, file), 'utf8').replace(/\r\n?/g, '\n');
const writeText = (file, value) => fs.writeFileSync(path.join(root, file), value, 'utf8');
const exists = file => fs.existsSync(path.join(root, file));

function markdownFiles(directory) {
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
  if (!match) return { source, meta: {}, body: source, match: null };

  const meta = {};
  for (const line of match[1].split('\n')) {
    const separator = line.indexOf(':');
    if (separator < 0) continue;
    const key = line.slice(0, separator).trim();
    const raw = line.slice(separator + 1).trim();
    if (!key) continue;
    try { meta[key] = JSON.parse(raw); }
    catch { meta[key] = raw.replace(/^['"]|['"]$/g, ''); }
  }
  return { source, meta, body: source.slice(match[0].length), match };
}

function text(value) {
  return value == null ? '' : String(value).trim();
}

function canonicalId(file) {
  return text(parseFrontMatter(file).meta.id);
}

function created(file) {
  return text(parseFrontMatter(file).meta.created);
}

function derivedBase(file) {
  return path.basename(file, '.md');
}

function sameJson(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}

const canonicalFiles = markdownFiles('essays');
const englishFiles = markdownFiles('english-mix');
const spanishFiles = markdownFiles('spanish-mix');
const currentIndex = JSON.parse(read('data/index.json'));
const currentVersions = JSON.parse(read('data/versions-index.json'));

const problems = [];
const canonicalById = new Map();
for (const file of canonicalFiles) {
  const parsed = parseFrontMatter(file);
  const id = text(parsed.meta.id);
  const title = text(parsed.meta.title);
  const date = text(parsed.meta.created);
  if (!id) problems.push(`${file}: missing canonical id`);
  if (!title) problems.push(`${file}: missing canonical title`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) problems.push(`${file}: invalid canonical created date ${date || '(missing)'}`);
  if (id && canonicalById.has(id)) problems.push(`duplicate canonical id ${id}: ${canonicalById.get(id)} / ${file}`);
  if (id) canonicalById.set(id, file);
}

const actualCanonical = new Set(canonicalFiles);
const existingOrder = Array.isArray(currentIndex.essays)
  ? currentIndex.essays.filter(file => actualCanonical.has(file))
  : [];
const existingSet = new Set(existingOrder);
const missingCanonical = canonicalFiles
  .filter(file => !existingSet.has(file))
  .sort((a, b) => created(b).localeCompare(created(a)) || a.localeCompare(b));

const expectedCanonical = [...existingOrder];
for (const file of missingCanonical) {
  const date = created(file);
  const insertAt = expectedCanonical.findIndex(existing => created(existing).localeCompare(date) < 0);
  if (insertAt < 0) expectedCanonical.push(file);
  else expectedCanonical.splice(insertAt, 0, file);
}

const idRepairs = [];
const derivedById = new Map();

function registerDerived(file, version, suffix) {
  const base = derivedBase(file);
  const canonical = canonicalById.get(base);
  if (!canonical) {
    problems.push(`${file}: derived basename ${base} has no canonical article`);
    return;
  }

  const parsed = parseFrontMatter(file);
  const actualId = text(parsed.meta.id);
  if (actualId !== base) {
    if (actualId === `${base}${suffix}`) {
      idRepairs.push({ file, from: actualId, to: base });
    } else {
      problems.push(`${file}: derived id ${actualId || '(missing)'} does not safely normalize to ${base}`);
      return;
    }
  }

  if (!derivedById.has(base)) derivedById.set(base, {});
  const entry = derivedById.get(base);
  if (entry[version]) problems.push(`${base}: duplicate ${version} derived file`);
  entry[version] = file;
}

englishFiles.forEach(file => registerDerived(file, 'en-mix', '-en-mix'));
spanishFiles.forEach(file => registerDerived(file, 'es-mix', '-es-mix'));

const expectedArticles = {};
for (const file of expectedCanonical) {
  const id = canonicalId(file);
  const entry = derivedById.get(id);
  if (entry && Object.keys(entry).length) expectedArticles[id] = entry;
}
const expectedIndex = { essays: expectedCanonical };
const expectedVersions = { version: 1, articles: expectedArticles };

const indexChanged = !sameJson(currentIndex, expectedIndex);
const versionsChanged = !sameJson(currentVersions, expectedVersions);
const drift = {
  missingCanonical,
  idRepairs,
  indexChanged,
  versionsChanged,
  canonicalCount: canonicalFiles.length,
  englishMixCount: englishFiles.length,
  spanishMixCount: spanishFiles.length,
  versionedArticleCount: Object.keys(expectedArticles).length
};

if (problems.length) {
  console.error('Unsafe content-index conditions detected:');
  problems.forEach(item => console.error(`- ${item}`));
  process.exit(1);
}

console.log(JSON.stringify(drift, null, 2));

if (write) {
  for (const repair of idRepairs) {
    const parsed = parseFrontMatter(repair.file);
    const nextFrontMatter = parsed.match[1]
      .split('\n')
      .map(line => /^id\s*:/.test(line.trim()) ? `id: ${repair.to}` : line)
      .join('\n');
    const next = `---\n${nextFrontMatter}\n---\n${parsed.body}`;
    writeText(repair.file, next);
  }
  writeText('data/index.json', `${JSON.stringify(expectedIndex)}\n`);
  writeText('data/versions-index.json', `${JSON.stringify(expectedVersions)}\n`);
  console.log('Content indexes synchronized.');
}

if (check && (idRepairs.length || indexChanged || versionsChanged)) {
  console.error('Content index drift detected. Run: node tools/sync-content-indexes.mjs --write');
  process.exitCode = 1;
}
