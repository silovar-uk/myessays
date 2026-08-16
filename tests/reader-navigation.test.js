const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

function createNavigationHarness() {
  const source = fs.readFileSync(path.join(__dirname, '..', 'reader-navigation.js'), 'utf8');
  let appendedNavigation = null;

  const cards = [
    { dataset: { id: 'current' }, querySelector: () => ({ textContent: 'Current essay' }) },
    { dataset: { id: 'related' }, querySelector: () => ({ textContent: 'Related essay' }) }
  ];
  const readerContent = {
    querySelector(selector) {
      return selector === '.reader-end-navigation' ? appendedNavigation : null;
    },
    appendChild(node) {
      appendedNavigation = node;
    }
  };
  const document = {
    hidden: false,
    getElementById(id) {
      if (id === 'readerView') return { hidden: false };
      if (id === 'readerContent') return readerContent;
      return null;
    },
    querySelectorAll(selector) {
      return selector === '#essayGrid [data-id]' ? cards : [];
    },
    createElement() {
      return { className: '', dataset: {}, innerHTML: '', remove() {} };
    },
    addEventListener() {}
  };
  const window = { addEventListener() {} };
  const sandbox = {
    document,
    window,
    location: { hash: '#/essay/current' },
    state: {
      essays: [
        { id: 'current', title: 'Current essay', tags: ['UX'], created: '2026-08-16' },
        { id: 'related', title: 'Related essay', tags: ['UX'], created: '2026-08-15' }
      ]
    },
    MutationObserver: class { observe() {} },
    requestAnimationFrame(callback) { callback(); },
    Set,
    Object,
    encodeURIComponent,
    decodeURIComponent
  };

  vm.runInNewContext(source, sandbox);
  return { window, getNavigation: () => appendedNavigation };
}

test('explicit reader render appends related essays without waiting for an observer', () => {
  const harness = createNavigationHarness();

  harness.window.MyEssaysReaderNavigation.render();

  const navigation = harness.getNavigation();
  assert.ok(navigation, 'reader navigation should be appended');
  assert.match(navigation.innerHTML, /class="reader-related"/);
  assert.match(navigation.innerHTML, /Related essay/);
});

test('main reader explicitly calls the navigation render hook', () => {
  const source = fs.readFileSync(path.join(__dirname, '..', 'app.js'), 'utf8');
  assert.match(source, /MyEssaysReaderNavigation\?\.render\(\)/);
  assert.match(source, /myessays:reader-rendered/);
});
