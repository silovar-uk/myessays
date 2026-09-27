const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.join(__dirname, '..');
const source = fs.readFileSync(path.join(root, 'aozora-source.js'), 'utf8');

function runtime() {
  const document = { querySelector: () => null };
  const window = {};
  const context = {
    window,
    document,
    URL,
    location: { href: 'https://silovar-uk.github.io/myessays/' },
    fetch: async () => { throw new Error('not used'); },
    DOMParser: class {}
  };
  window.window = window;
  vm.runInNewContext(source, context);
  return window.MyEssaysAozoraSource;
}

test('normalizes Aozora card URLs to https and strips query/hash', () => {
  const api = runtime();
  assert.equal(
    api.normalizeAozoraUrl('http://www.aozora.gr.jp/cards/001383/card57349.html?x=1#top'),
    'https://www.aozora.gr.jp/cards/001383/card57349.html'
  );
  assert.equal(api.classifyAozoraUrl('https://www.aozora.gr.jp/cards/001383/card57349.html'), 'card');
});

test('accepts direct XHTML URLs', () => {
  const api = runtime();
  const url = 'https://www.aozora.gr.jp/cards/001383/files/57349_60032.html';
  assert.equal(api.normalizeAozoraUrl(url), url);
  assert.equal(api.classifyAozoraUrl(url), 'xhtml');
});

test('rejects host suffix attacks, credentials, ports and unsupported paths', () => {
  const api = runtime();
  for (const url of [
    'https://www.aozora.gr.jp.evil.example/cards/001383/card57349.html',
    'https://user:pass@www.aozora.gr.jp/cards/001383/card57349.html',
    'https://www.aozora.gr.jp:8443/cards/001383/card57349.html',
    'https://www.aozora.gr.jp/index.html',
    'https://www.aozora.gr.jp/cards/001383/%2e%2e/files/57349_60032.html'
  ]) {
    assert.throws(() => api.normalizeAozoraUrl(url));
  }
});
