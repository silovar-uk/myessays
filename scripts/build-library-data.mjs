// Build static Library metadata and opt-in full-text search shards from canonical Markdown.
// Node.js built-ins only; run after every content change (including manual additions).
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const catalogue = JSON.parse(read('data/index.json')).essays;
if (!Array.isArray(catalogue) || !catalogue.length) throw new Error('data/index.json has no essays');
const seenPaths = new Set();
const seenIds = new Set();
const records = [];
const shards = new Map();

function parseFrontMatter(text, file) {
  const normalized = text.replace(/\r\n?/g, '\n');
  const match = normalized.match(/^---\n([\s\S]*?)\n---(?:\n|$)/);
  if (!match) throw new Error('Missing front matter: ' + file);
  const meta = {};
  for (const line of match[1].split('\n')) {
    const separator = line.indexOf(':');
    if (separator < 0) continue;
    const key = line.slice(0, separator).trim();
    const raw = line.slice(separator + 1).trim();
    try { meta[key] = JSON.parse(raw); }
    catch { meta[key] = raw.replace(/^['"]|['"]$/g, ''); }
  }
  return { meta, body: normalized.slice(match[0].length) };
}

function list(value) {
  if (Array.isArray(value)) return value.map(item => String(item).trim()).filter(Boolean);
  if (!value) return [];
  return String(value).replace(/^\[|\]$/g, '').split(',').map(item => item.trim().replace(/^['"]|['"]$/g, '')).filter(Boolean);
}

function metrics(body) {
  const clean = body.replace(/https?:\/\/\S+/g, ' ').replace(/[#>*_\[\]()]/g, ' ').replace(/\s+/g, ' ').trim();
  const charCount = clean.replace(/\s/g, '').length;
  const japaneseChars = (clean.match(/[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}ー々〆ヶ]/gu) || []).length;
  const englishWords = (clean.match(/[A-Za-z0-9]+(?:['’-][A-Za-z0-9]+)*/g) || []).length;
  return { charCount, minutes: Math.max(1, Math.ceil(japaneseChars / 500 + englishWords / 200)) };
}

for (const file of catalogue) {
  if (!/^essays\/[^/]+\.md$/.test(file)) throw new Error('Invalid canonical essay path: ' + file);
  if (seenPaths.has(file)) throw new Error('Duplicate essay path: ' + file);
  seenPaths.add(file);
  if (!fs.existsSync(path.join(root, file))) throw new Error('Missing article: ' + file);
  const { meta, body } = parseFrontMatter(read(file), file);
  const id = String(meta.id || '').trim();
  if (!id || !meta.title || !meta.created) throw new Error('Missing required front matter: ' + file);
  if (seenIds.has(id)) throw new Error('Duplicate essay ID: ' + id);
  seenIds.add(id);
  const tags = list(meta.tags);
  const keywords = list(meta.keywords);
  const record = { ...meta, tags, keywords, path: file, metrics: metrics(body) };
  records.push(record);
  // Exactly match the old in-browser text normalization, but only load it on search.
  const plain = body.replace(/[#>*_\x60\[\]()]/g, ' ').replace(/https?:\/\/\S+/g, ' ');
  const searchText = [meta.title, meta.subtitle, meta.abstract, ...tags, ...keywords, plain].join(' ').toLowerCase();
  const month = /^\d{4}-\d{2}$/.test(String(meta.created).slice(0, 7)) ? String(meta.created).slice(0, 7) : 'undated';
  if (!shards.has(month)) shards.set(month, []);
  shards.get(month).push({ id, text: searchText });
}

// Article files outside the index must be explicitly held, not silently skipped.
const holds = JSON.parse(read('data/publication-holds.json'));
const heldCanonical = new Set(holds.canonical.map(item => item.path));
const heldDerived = new Set(holds.derived.map(item => item.path));
for (const item of [...holds.canonical, ...holds.derived]) {
  if (!item.reason || !fs.existsSync(path.join(root, item.path))) {
    throw new Error('Invalid publication hold: ' + JSON.stringify(item));
  }
}
const unregistered = fs.readdirSync(path.join(root, 'essays'))
  .filter(f => f.endsWith('.md') && !seenPaths.has('essays/' + f))
  .map(f => 'essays/' + f);
const unexpected = unregistered.filter(file => !heldCanonical.has(file));
const missingHolds = [...heldCanonical].filter(file => !unregistered.includes(file));
if (unexpected.length || missingHolds.length) {
  throw new Error('Unregistered Markdown files: ' + JSON.stringify({ unexpected, missingHolds }));
}
for (const file of heldDerived) {
  if (!file.startsWith('english-mix/') && !file.startsWith('spanish-mix/')) {
    throw new Error('Invalid held derived Markdown path: ' + file);
  }
}
if (unregistered.length) console.warn('Publication held: ' + unregistered.join(', '));

const searchDir = path.join(root, 'data', 'search');
fs.mkdirSync(searchDir, { recursive: true });
for (const entry of fs.readdirSync(searchDir)) {
  if (/^\d{4}-\d{2}\.json$/.test(entry) || entry === 'undated.json') fs.unlinkSync(path.join(searchDir, entry));
}
const shardPaths = [...shards.keys()].sort().map(month => {
  const filename = month + '.json';
  fs.writeFileSync(path.join(searchDir, filename), JSON.stringify({ version: 1, records: shards.get(month) }) + '\n');
  return 'data/search/' + filename;
});
fs.writeFileSync(path.join(searchDir, 'manifest.json'), JSON.stringify({ version: 1, count: records.length, shards: shardPaths }, null, 2) + '\n');
fs.writeFileSync(path.join(root, 'data', 'catalog.json'), JSON.stringify({ version: 1, essays: records }) + '\n');
console.log('Generated catalog for ' + records.length + ' essays across ' + shardPaths.length + ' opt-in search shards.');
