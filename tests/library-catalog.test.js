// Regression tests for the generated catalog/search contract and on-demand article reads.
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.join(__dirname, '..');
const read = name => fs.readFileSync(path.join(root, name), 'utf8');

test('catalog contains every canonical article exactly once and without article bodies', () => {
  const expected = JSON.parse(read('data/index.json')).essays;
  const catalog = JSON.parse(read('data/catalog.json'));
  assert.equal(catalog.version, 1);
  assert.equal(catalog.essays.length, expected.length);
  assert.equal(new Set(catalog.essays.map(e => e.id)).size, expected.length);
  assert.deepEqual(catalog.essays.map(e => e.path), expected);
  for (const e of catalog.essays) {
    assert.ok(e.id && e.title && e.path);
    assert.ok(e.metrics && Number.isFinite(e.metrics.minutes));
    assert.equal('body' in e, false, e.id + ' must not ship body in catalog');
    assert.ok(Array.isArray(e.tags));
    assert.ok(typeof e.searchText === 'string');
  }
});

test('on-demand search shards cover each catalog article exactly once', () => {
  const catalog = JSON.parse(read('data/catalog.json'));
  const manifest = JSON.parse(read('data/search/manifest.json'));
  assert.equal(manifest.count, catalog.essays.length);
  assert.ok(manifest.shards.length > 0);
  const ids = [];
  for (const shard of manifest.shards) {
    assert.match(shard, /^data\/search\/[\w-]+\.json$/);
    const entries = JSON.parse(read(shard)).records;
    for (const item of entries) {
      assert.ok(typeof item.text === 'string' && item.text.length > 0);
      ids.push(item.id);
    }
  }
  assert.equal(new Set(ids).size, ids.length);
  assert.deepEqual(new Set(ids), new Set(catalog.essays.map(e => e.id)));
});

test('the library never downloads article Markdown for its initial catalog', () => {
  const src = read('app.js');
  const match = src.match(/async function loadEssays\(\) \{[\s\S]*?\n\}\n\nasync function loadEssaysLegacy/);
  assert.ok(match, 'catalog loader must exist');
  assert.match(match[0], /fetch\('data\/catalog\.json'/);
  assert.doesNotMatch(match[0], /fetch\(record\.path\)|fetch\(path,/);
  assert.match(src, /async function getFullEssay\(/);
  assert.match(src, /if \(record\.body != null\)/);
  assert.match(src, /if \(els\.searchInput\.value\.trim\(\)\) ensureFullTextSearch\(\)/);
  assert.match(src, /archive\.slice\(0, visibleArchiveCount\)/);
});

test('all explicit index files exist; missing registration is detectable', () => {
  const canonicalPaths = JSON.parse(read('data/index.json')).essays;
  const listed = new Set(canonicalPaths);
  const files = fs.readdirSync(path.join(root, 'essays'))
    .filter(f => f.endsWith('.md')).map(f => 'essays/' + f);
  assert.deepEqual(files.filter(f => !listed.has(f)), [], 'unregistered article discovered');
  for (const name of canonicalPaths) assert.ok(fs.existsSync(path.join(root, name)), name);
});
