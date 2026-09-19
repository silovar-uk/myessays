const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.join(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');

function loadStore() {
  const values = new Map();
  const localStorage = {
    getItem(key) { return values.has(key) ? values.get(key) : null; },
    setItem(key, value) { values.set(key, String(value)); },
    removeItem(key) { values.delete(key); }
  };
  const window = { localStorage };
  const context = { window, localStorage, JSON, Date, Number, Object, String, Array };
  vm.runInNewContext(read('reading-state-store.js'), context);
  return { api: window.MyEssaysReadingState, values };
}

test('resonance uses shared reading state and preserves reading position', () => {
  const { api } = loadStore();
  api.merge('essay-1', { lastLocator: 'section-2:p-3', lastProgressRatio: 0.62 });
  const result = api.setResonance('essay-1', 4);

  assert.equal(result.ok, true);
  const state = api.read('essay-1');
  assert.equal(state.lastLocator, 'section-2:p-3');
  assert.equal(state.lastProgressRatio, 0.62);
  assert.equal(state.resonance.value, 4);
  assert.ok(state.openedAt);
  assert.ok(state.completedAt);
  assert.equal(state.resonance.ratedAt, state.resonance.updatedAt);
});

test('resonance accepts only integer values 1 through 5', () => {
  const { api } = loadStore();
  for (const value of [0, 6, 1.5, 'nope', null, undefined]) {
    assert.equal(api.setResonance('essay-1', value).ok, false, String(value));
  }
  for (const value of [1, 2, 3, 4, 5, '4']) {
    assert.equal(api.setResonance('essay-1', value).ok, true, String(value));
  }
});

test('changing resonance keeps ratedAt and completion time', () => {
  const { api } = loadStore();
  api.setResonance('essay-1', 2);
  const before = api.read('essay-1');
  api.setResonance('essay-1', 5);
  const after = api.read('essay-1');

  assert.equal(after.resonance.value, 5);
  assert.equal(after.resonance.ratedAt, before.resonance.ratedAt);
  assert.equal(after.completedAt, before.completedAt);
});

test('clearing completion also clears resonance but preserves other reading state', () => {
  const { api } = loadStore();
  api.merge('essay-1', { lastLocator: 'abc' });
  api.setResonance('essay-1', 4);
  const result = api.clearCompletion('essay-1');

  assert.equal(result.ok, true);
  const state = api.read('essay-1');
  assert.equal(state.lastLocator, 'abc');
  assert.equal(state.completedAt, undefined);
  assert.equal(state.resonance, undefined);
  assert.ok(state.openedAt);
});

test('Reader Seal keeps completion primary and reveals rating progressively', () => {
  const resonance = read('reader-resonance.js');
  const reflections = read('reader-reflections.js');
  const navigation = read('reader-navigation.js');

  assert.match(resonance, /data-resonance-seal/);
  assert.match(resonance, /setCompleted\(id, true\)/);
  assert.match(resonance, /data-resonance-rating/);
  assert.match(resonance, /type="radio"/);
  assert.match(resonance, /data-resonance-summary/);
  assert.match(resonance, /priority:\s*70/);
  assert.match(reflections, /priority:80/);
  assert.match(navigation, /priority:\s*90/);
  assert.doesNotMatch(resonance, /評価せず読了にする/);
  assert.doesNotMatch(resonance, /★|☆|⭐/);
});

test('resonance assets are loaded and reduced motion is supported', () => {
  const index = read('index.html');
  const css = read('reader-resonance.css');

  assert.match(index, /reading-state-store\.js\?v=/);
  assert.match(index, /reader-resonance\.js\?v=/);
  assert.match(index, /reader-resonance\.css\?v=/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(css, /width:\s*164px/);
  assert.match(css, /min-height:\s*52px/);
  assert.match(css, /grid-template-columns:\s*repeat\(5, 44px\)/);
  assert.match(css, /focus-visible/);
});


test('Reader Seal does not recreate the old wide card or duplicate After Reading heading', () => {
  const css = read('reader-resonance.css');
  const reader = read('reader-v2.js');

  assert.doesNotMatch(css, /620px/);
  assert.doesNotMatch(reader, /AFTER READING|読み終えたあと/);
  assert.match(reader, /zone\.dataset\.closing = 'seal'/);
});
