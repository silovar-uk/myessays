const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const exists = file => fs.existsSync(path.join(root, file));

const index = JSON.parse(read('data/versions-index.json'));
const articles = index.articles || {};

test('reading versions index only points to existing derived files', () => {
  assert.equal(index.version, 1);
  assert.ok(Object.keys(articles).length > 0);
  for (const [essayId, versions] of Object.entries(articles)) {
    for (const [version, file] of Object.entries(versions)) {
      assert.ok(['en-mix', 'es'].includes(version), `${essayId} has unsupported version ${version}`);
      assert.ok(exists(file), `${essayId}/${version} points to missing file: ${file}`);
    }
  }
});

test('every English Mix markdown is migrated exactly once into the shared index', () => {
  const englishMixFiles = fs.readdirSync(path.join(root, 'english-mix'))
    .filter(file => file.endsWith('.md'))
    .map(file => `english-mix/${file}`)
    .sort();
  const indexedPaths = Object.values(articles)
    .map(versions => versions['en-mix'])
    .filter(Boolean)
    .sort();
  assert.deepEqual(indexedPaths, englishMixFiles);
});

test('English Mix paths stay keyed by the canonical article id', () => {
  Object.entries(articles).forEach(([essayId, versions]) => {
    if (!versions['en-mix']) return;
    assert.equal(versions['en-mix'], `english-mix/${essayId}.md`);
  });
});

test('Spanish sample shares the canonical article id and keeps English Mix', () => {
  const id = 'confucius-knowing-liking-enjoying';
  assert.equal(articles[id]['en-mix'], `english-mix/${id}.md`);
  assert.equal(articles[id].es, `spanish/${id}.md`);
  const spanish = read(articles[id].es);
  assert.match(spanish, new RegExp(`^---\\nid: ${id}\\n`));
  assert.match(spanish, /title:\s*"Saber no basta/);
  assert.match(spanish, /## 8\. La pregunta de hoy/);
});

test('reader and library use the shared versions index', () => {
  const reader = read('reader-versions.js');
  const library = read('library-versions.js');
  assert.match(reader, /data\/versions-index\.json/);
  assert.match(library, /data\/versions-index\.json/);
  assert.match(reader, /DISPLAY_META_KEYS = \['title', 'subtitle', 'abstract'\]/);
  assert.match(reader, /next\.id = original\.id/);
});

test('active page no longer references legacy Mix or glossary assets', () => {
  const html = read('index.html');
  assert.match(html, /reader-versions\.js/);
  assert.match(html, /library-versions\.js/);
  assert.doesNotMatch(html, /english-mix\.(?:js|css)/);
  assert.doesNotMatch(html, /library-mix\.(?:js|css)/);
  assert.doesNotMatch(html, /glossary-tools\.(?:js|css)/);
});

test('legacy indexes and glossary implementation files are removed', () => {
  assert.equal(exists('data/mix-index.json'), false);
  assert.equal(exists('glossary-tools.js'), false);
  assert.equal(exists('glossary-tools.css'), false);
  assert.equal(exists('data/glossary.json'), false);
  assert.equal(exists('data/glossaries/ime-between-keystrokes-and-text.json'), false);
  assert.equal(exists('data/glossaries/nodejs-from-zero.json'), false);
});
