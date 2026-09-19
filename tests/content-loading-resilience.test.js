const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const app = fs.readFileSync(path.join(__dirname, '..', 'app.js'), 'utf8');

test('canonical loader isolates per-article failures instead of failing the whole library', () => {
  assert.match(app, /Promise\.allSettled\(paths\.map\(loadEssayDocument\)\)/);
  assert.match(app, /state\.contentLoadErrors\s*=\s*failures/);
  assert.match(app, /if \(!state\.essays\.length\)/);
});

test('partial content failures remain observable for diagnostics and users', () => {
  assert.match(app, /window\.MyEssaysDiagnostics/);
  assert.match(app, /getContentErrors\(\)/);
  assert.match(app, /一部の記事を読み込めませんでした/);
});

test('a directly requested failed article gets an article-level error surface', () => {
  assert.match(app, /function showEssayLoadError/);
  assert.match(app, /この記事を読み込めませんでした。/);
});
