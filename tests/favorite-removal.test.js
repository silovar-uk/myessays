const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');

test('legacy Favorite UI is removed from runtime surfaces', () => {
  const app = read('app.js');
  const index = read('index.html');
  const reader = read('reader-v2.js');
  const styles = read('styles.css');

  assert.doesNotMatch(app, /favoriteFilter|favorite-desc|essay\.favorite|e\.favorite|function stars/);
  assert.doesNotMatch(index, /favoriteFilter|favorite-desc|お気に入り/);
  assert.doesNotMatch(reader, /Favorite|essay\.favorite/);
  assert.doesNotMatch(styles, /\.stars\s*\{/);
});

test('current content contracts no longer define favorite metadata', () => {
  for (const file of ['essay-template.md', 'README.md', 'CURRENT_SPEC.md']) {
    assert.doesNotMatch(read(file), /^favorite\s*:/im, `${file} still defines favorite`);
  }
});

test('canonical and derived markdown have no favorite front matter', () => {
  const dirs = ['essays', 'english-mix', 'spanish-mix'];
  const offenders = [];

  function walk(dir) {
    if (!fs.existsSync(dir)) return;
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.isFile() && entry.name.endsWith('.md')) {
        const source = fs.readFileSync(full, 'utf8');
        const frontMatter = source.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] || '';
        if (/^favorite\s*:/im.test(frontMatter)) offenders.push(path.relative(root, full));
      }
    }
  }

  dirs.forEach(dir => walk(path.join(root, dir)));
  assert.deepEqual(offenders, []);
});
