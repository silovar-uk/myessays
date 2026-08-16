const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const source = fs.readFileSync(path.join(__dirname, '..', 'reader-reflections.js'), 'utf8');
const index = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');

test('reader reflections use per-essay localStorage with multiple timestamped entries', () => {
  assert.match(source, /myessays:reader-reflections:v1:/);
  assert.match(source, /JSON\.stringify\(entries\)/);
  assert.match(source, /createdAt/);
  assert.match(source, /updatedAt/);
  assert.match(source, /entries\.unshift/);
});

test('reader reflections support editing, per-note copy, deletion, and two full-copy modes', () => {
  assert.match(source, /data-action.*edit|createAction\('編集', 'edit'\)/s);
  assert.match(source, /createAction\('コピー', 'copy'\)/);
  assert.match(source, /createAction\('削除', 'delete'/);
  assert.match(source, /data-copy="plain"/);
  assert.match(source, /data-copy="detail"/);
  assert.match(source, /記事: \$\{title\}/);
  assert.match(source, /URL: \$\{url\}/);
});

test('reflection section is inserted before existing end navigation', () => {
  assert.match(source, /insertBefore\(root, navigation\)/);
});

test('index loads reflection styles and script', () => {
  assert.match(index, /reader-reflections\.css/);
  assert.match(index, /reader-reflections\.js/);
});
