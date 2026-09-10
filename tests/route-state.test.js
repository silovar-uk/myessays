const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.join(__dirname, '..');
const source = fs.readFileSync(path.join(root, 'route-state.js'), 'utf8');

function runtime(hash = '#/') {
  const events = [];
  const historyCalls = [];
  const location = {
    href: `https://example.test/myessays/${hash}`,
    pathname: '/myessays/',
    search: '',
    hash
  };
  const history = {
    state: { keep: true },
    replaceState(state, title, url) {
      historyCalls.push({ state, title, url });
      const next = new URL(url, 'https://example.test');
      location.pathname = next.pathname;
      location.search = next.search;
      location.hash = next.hash;
      location.href = next.href;
    }
  };
  const document = {
    dispatchEvent(event) { events.push(event); }
  };
  class CustomEvent {
    constructor(type, options = {}) { this.type = type; this.detail = options.detail; }
  }
  const context = { window: {}, location, history, document, CustomEvent, URL, URLSearchParams };
  context.window.window = context.window;
  vm.runInNewContext(source, context);
  return { api: context.window.MyEssaysRoute, location, historyCalls, events };
}

test('hash route parser separates article identity from language query', () => {
  const { api } = runtime();
  assert.deepEqual(
    JSON.parse(JSON.stringify(api.parse('#/essay/example-id?lang=en'))),
    { type: 'essay', articleId: 'example-id', lang: 'en', hasLang: true, langValid: true }
  );
  assert.equal(api.parse('#/essay/a%20b?lang=es').articleId, 'a b');
});

test('public language tokens map to internal Reading Mode versions in one place', () => {
  const { api } = runtime();
  assert.equal(api.versionForLang('ja'), 'ja');
  assert.equal(api.versionForLang('en'), 'en-mix');
  assert.equal(api.versionForLang('es'), 'es-mix');
  assert.equal(api.langForVersion('en-mix'), 'en');
  assert.equal(api.langForVersion('es-mix'), 'es');
  assert.equal(api.versionForLang('unknown'), 'ja');
});

test('essay URL serializer supports canonical language and legacy no-lang entry', () => {
  const { api } = runtime();
  assert.equal(api.essayHash({ articleId: 'example', lang: 'en' }), '#/essay/example?lang=en');
  assert.equal(api.essayHash({ articleId: 'example', lang: 'ja' }), '#/essay/example?lang=ja');
  assert.equal(api.essayHash({ articleId: 'example' }), '#/essay/example');
});

test('language replacement updates the URL without adding navigation history', () => {
  const { api, location, historyCalls } = runtime('#/essay/example?lang=ja');
  assert.equal(api.replaceEssayLanguage('es'), true);
  assert.equal(location.hash, '#/essay/example?lang=es');
  assert.equal(historyCalls.length, 1);
  assert.equal(historyCalls[0].url, '/myessays/#/essay/example?lang=es');
});

test('invalid language tokens are detectable before JA normalization', () => {
  const { api } = runtime();
  const invalid = api.parse('#/essay/example?lang=english');
  assert.equal(invalid.hasLang, true);
  assert.equal(invalid.lang, '');
  assert.equal(invalid.langValid, false);
  assert.equal(api.normalizeLang('EN'), 'en');
});
