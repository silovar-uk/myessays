const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const exists = file => fs.existsSync(path.join(root, file));

const index = JSON.parse(read('data/versions-index.json'));
const articles = index.articles || {};

test('reading versions index only points to existing current derived files', () => {
  assert.equal(index.version, 1);
  assert.ok(Object.keys(articles).length > 0);
  for (const [essayId, versions] of Object.entries(articles)) {
    for (const [version, file] of Object.entries(versions)) {
      assert.ok(['en-mix', 'es-mix'].includes(version), `${essayId} has unsupported version ${version}`);
      assert.ok(exists(file), `${essayId}/${version} points to missing file: ${file}`);
    }
  }
});

test('every English Mix article markdown is migrated exactly once into the shared index', () => {
  const englishMixFiles = fs.readdirSync(path.join(root, 'english-mix'))
    .filter(file => file.endsWith('.md') && file !== 'README.md')
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

test('Español Mix sample shares canonical id, keeps English Mix, and stays mixed-language', () => {
  const id = 'confucius-knowing-liking-enjoying';
  assert.equal(articles[id]['en-mix'], `english-mix/${id}.md`);
  assert.equal(articles[id]['es-mix'], `spanish-mix/${id}.md`);
  const spanishMix = read(articles[id]['es-mix']);
  assert.match(spanishMix, new RegExp(`^---\\nid: ${id}\\n`));
  assert.match(spanishMix, /title:\s*"知っているだけでは、まだ遠い — Confucio/);
  assert.match(spanishMix, /日本語＋Español Mix/);
  assert.match(spanishMix, /Sabemos que es importante/);
  assert.match(spanishMix, /必要性も方法も知っている/);
});

test('reader and library use shared current version definitions', () => {
  const reader = read('reader-versions.js');
  const library = read('library-versions.js');
  assert.match(reader, /data\/versions-index\.json/);
  assert.match(library, /data\/versions-index\.json/);
  assert.match(reader, /'es-mix':\s*\{\s*label:\s*'Español Mix',\s*badge:\s*'ES MIX'/);
  assert.match(library, /'es-mix':\s*\{\s*label:\s*'Español Mix',\s*badge:\s*'ES MIX'/);
  assert.match(reader, /DISPLAY_META_KEYS = \['title', 'subtitle', 'abstract'\]/);
  assert.match(reader, /next\.id = original\.id/);
});

test('reader language switch is a collapsed disclosure rather than always-expanded buttons', () => {
  const reader = read('reader-versions.js');
  assert.match(reader, /reader-language-trigger/);
  assert.match(reader, /aria-expanded="false"/);
  assert.match(reader, /aria-controls="readerLanguageMenu"/);
  assert.match(reader, /aria-haspopup="menu"/);
  assert.match(reader, /role="menuitemradio"/);
  assert.match(reader, /setDisclosureOpen/);
  assert.match(reader, /event\.key !== 'Escape'/);
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
