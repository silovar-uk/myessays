const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');

test('reader runtime is loaded before reader plugins', () => {
  const html = read('index.html');
  const runtime = html.indexOf('reader-runtime.js');
  const plugins = [
    'source-links.js',
    'reader-navigation.js',
    'reader-reflections.js'
  ];

  assert.ok(runtime > -1, 'reader runtime should be loaded');
  plugins.forEach(file => assert.ok(runtime < html.indexOf(file), `runtime should load before ${file}`));
});

test('reader DOM plugins use the central runtime instead of DOM observers', () => {
  for (const file of ['source-links.js', 'reader-navigation.js', 'reader-reflections.js']) {
    const source = read(file);
    assert.match(source, /MyEssaysReaderRuntime\.register/);
    assert.doesNotMatch(source, /new MutationObserver/);
  }
});

test('reader plugin priorities keep end matter ordering stable', () => {
  assert.match(read('source-links.js'), /priority:\s*40/);
  assert.match(read('reader-reflections.js'), /priority:80/);
  assert.match(read('reader-navigation.js'), /priority:\s*90/);
});

test('glossary assets are no longer loaded by the page', () => {
  const html = read('index.html');
  assert.doesNotMatch(html, /glossary-tools\.(?:js|css)/);
  assert.doesNotMatch(html, /data\/glossar/);
  assert.doesNotMatch(html, /用語補足/);
});
