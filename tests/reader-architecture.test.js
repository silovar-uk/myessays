const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');

test('reader runtime is loaded before reader plugins', () => {
  const html = read('index.html');
  const runtime = html.indexOf('reader-runtime.js');
  const glossary = html.indexOf('glossary-tools.js');
  const sources = html.indexOf('source-links.js');
  const navigation = html.indexOf('reader-navigation.js');

  assert.ok(runtime > -1, 'reader runtime should be loaded');
  assert.ok(runtime < glossary, 'runtime should load before glossary');
  assert.ok(runtime < sources, 'runtime should load before source links');
  assert.ok(runtime < navigation, 'runtime should load before navigation');
});

test('reader plugins use the central runtime instead of DOM observers', () => {
  for (const file of ['glossary-tools.js', 'source-links.js', 'reader-navigation.js']) {
    const source = read(file);
    assert.match(source, /MyEssaysReaderRuntime\.register/);
    assert.doesNotMatch(source, /new MutationObserver/);
  }
});

test('glossary is loaded per article with legacy fallback', () => {
  const source = read('glossary-tools.js');
  assert.match(source, /data\/glossaries\/\$\{encodeURIComponent\(essayId\)\}\.json/);
  assert.match(source, /data\/glossary\.json/);
});

test('Node.js glossary prefers the formal libuv introduction', () => {
  const glossary = JSON.parse(read('data/glossaries/nodejs-from-zero.json'));
  const libuv = glossary.terms.libuv;
  assert.equal(libuv.label, 'libuv（リブユー・ブイ）');
  assert.equal(libuv.match[0], 'libuv（リブユー・ブイ）');
  assert.equal(libuv.match[1], 'libuv');
});
