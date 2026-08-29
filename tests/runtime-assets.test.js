const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const exists = file => fs.existsSync(path.join(root, file));

function localAssetsFromIndex() {
  const html = read('index.html');
  const assets = [];
  const pattern = /(?:src|href)="([^"]+)"/g;
  let match;
  while ((match = pattern.exec(html))) {
    const raw = match[1];
    if (/^(?:https?:|#|\/)/.test(raw)) continue;
    const file = raw.split(/[?#]/, 1)[0];
    if (/\.(?:js|css|svg|png)$/.test(file)) assets.push(file);
  }
  return [...new Set(assets)];
}

test('every local runtime asset referenced by index.html exists', () => {
  const assets = localAssetsFromIndex();
  assert.ok(assets.length > 0, 'index.html should reference local runtime assets');
  assets.forEach(file => assert.ok(exists(file), `index.html points to missing local asset: ${file}`));
});

test('superseded reading implementations stay removed', () => {
  for (const file of ['reading-status.js', 'reading-memo-sync.js', 'library-memo-render.js']) {
    assert.equal(exists(file), false, `${file} is superseded by reading-state-ui.js and should stay removed`);
  }
  const html = read('index.html');
  assert.doesNotMatch(html, /reading-status\.js|reading-memo-sync\.js|library-memo-render\.js/);
  assert.match(html, /reading-state-ui\.js/);
});

test('recent reader fixes use refreshed cache keys', () => {
  const html = read('index.html');
  assert.match(html, /app\.js\?v=20260829-/);
  assert.match(html, /reader-navigation\.js\?v=20260829-/);
  assert.match(html, /reading-locators\.js\?v=20260829-/);
});
