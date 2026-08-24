const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.join(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');

test('Page Reader Loader is one small javascript URL', () => {
  const loader = read('tools/page-reader-loader.txt').trim();
  assert.ok(loader.startsWith('javascript:'));
  assert.equal(loader.split(/\r?\n/).length, 1);
  assert.ok(loader.length < 500, `loader is ${loader.length} characters`);
  assert.doesNotThrow(() => new vm.Script(loader.slice('javascript:'.length)));
});

test('Loader uses only the fixed HTTPS script URL and suppresses referrer data', () => {
  const loader = read('tools/page-reader-loader.txt');
  assert.match(loader, /https:\/\/silovar-uk\.github\.io\/myessays\/tools\/page-reader\.js/);
  assert.match(loader, /referrerPolicy='no-referrer'/);
  assert.doesNotMatch(loader, /fetch\(|XMLHttpRequest|eval\(|new Function|localStorage|document\.cookie/);
});

test('external Page Reader parses and keeps the required controls', () => {
  const source = read('tools/page-reader.js');
  assert.doesNotThrow(() => new vm.Script(source));
  for (const id of ['pr-mode', 'pr-copy', 'pr-select', 'pr-rerun', 'pr-stop', 'pr-close']) {
    assert.match(source, new RegExp(id));
  }
  assert.match(source, /本文優先/);
  assert.match(source, /ページ全文/);
  assert.match(source, /__PAGE_READER_INSTANCE__/);
});

test('external Page Reader does not transmit or persist page data', () => {
  const source = read('tools/page-reader.js');
  assert.doesNotMatch(source, /fetch\(|XMLHttpRequest|sendBeacon|WebSocket|localStorage|sessionStorage|document\.cookie/);
});
