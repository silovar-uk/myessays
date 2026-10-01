const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

function createNavigationHarness({ essays, statuses = {}, routeType = 'essay', currentId = 'current' } = {}) {
  const source = fs.readFileSync(path.join(__dirname, '..', 'reader-navigation.js'), 'utf8');
  const appended = [];

  const readerContent = {
    querySelector() { return null; },
    appendChild(node) { appended.push(node); return node; }
  };

  function node(tag = 'div') {
    return {
      tagName: tag.toUpperCase(),
      className: '',
      dataset: {},
      innerHTML: '',
      attributes: {},
      setAttribute(name, value) { this.attributes[name] = String(value); },
      appendChild(child) { appended.push(child); return child; },
      remove() {}
    };
  }

  const document = {
    readyState: 'complete',
    getElementById(id) {
      if (id === 'readerView') return { hidden: false };
      if (id === 'readerContent') return readerContent;
      return null;
    },
    querySelectorAll() { return []; },
    createElement(tag) { return node(tag); },
    addEventListener() {}
  };

  const allEssays = essays || [
    { id: 'current', title: 'Current essay', tags: ['UX'], created: '2026-08-16' },
    { id: 'related', title: 'Related essay', tags: ['UX'], created: '2026-08-15' }
  ];

  const window = {
    addEventListener() {},
    MyEssaysReadingState: {
      status(id) { return statuses[id] || 'unread'; }
    },
    MyEssaysRoute: {
      parse() {
        return { type: routeType, articleId: currentId, lang: 'ja', hasLang: true, langValid: true };
      }
    }
  };

  const sandbox = {
    document,
    window,
    location: { hash: `#/essay/${currentId}?lang=ja` },
    state: { essays: allEssays, currentEssay: allEssays.find(item => item.id === currentId) || null },
    MutationObserver: class { observe() {} },
    requestAnimationFrame(callback) { callback(); },
    Set,
    Object,
    Number,
    String,
    Array,
    encodeURIComponent,
    decodeURIComponent
  };

  vm.runInNewContext(source, sandbox);
  return {
    window,
    appended,
    getNextStep: () => appended.find(item => item.className === 'reader-next-step') || null,
    getNavigation: () => appended.find(item => item.className === 'reader-end-navigation') || null
  };
}

test('reader offers one explicit next step before secondary navigation', () => {
  const harness = createNavigationHarness();

  harness.window.MyEssaysReaderNavigation.render();

  const next = harness.getNextStep();
  const navigation = harness.getNavigation();
  assert.ok(next, 'primary next step should be appended');
  assert.ok(navigation, 'secondary navigation should be appended');
  assert.match(next.innerHTML, /次に読む/);
  assert.match(next.innerHTML, /Related essay/);
  assert.match(next.innerHTML, /#UX が共通/);
  assert.doesNotMatch(navigation.innerHTML, /Related essay/);
  assert.match(navigation.innerHTML, /Libraryへ戻る/);
  assert.doesNotMatch(navigation.innerHTML, /前の記事|次の記事/);
});

test('series next wins even when a related unread article exists', () => {
  const essays = [
    { id: 'series-1', title: 'Series 1', series: 'Flow', seriesOrder: 1, tags: ['UX'], created: '2026-08-10' },
    { id: 'series-2', title: 'Series 2', series: 'Flow', seriesOrder: 2, tags: ['Other'], created: '2026-08-11' },
    { id: 'related', title: 'Unread related', tags: ['UX'], created: '2026-09-01' }
  ];
  const harness = createNavigationHarness({ essays, currentId: 'series-1', statuses: { related: 'unread' } });

  harness.window.MyEssaysReaderNavigation.render();

  const next = harness.getNextStep();
  const navigation = harness.getNavigation();
  assert.match(next.innerHTML, /Series 2/);
  assert.match(next.innerHTML, /シリーズ次回/);
  assert.match(navigation.innerHTML, /シリーズ次へ/);
  assert.match(navigation.innerHTML, /Series 2/);
});

test('explicit sequel lineage outranks inferred tag similarity when no series next exists', () => {
  const essays = [
    { id: 'current', title: 'Current', tags: ['UX'], created: '2026-08-01' },
    { id: 'tag-related', title: 'Tag related', tags: ['UX'], created: '2026-10-01' },
    { id: 'sequel', title: 'Explicit sequel', tags: ['Other'], originId: 'current', relation: 'sequel', created: '2026-09-01' }
  ];
  const harness = createNavigationHarness({ essays });
  const lib = harness.window.MyEssaysReaderNavigation.lib;
  const current = essays[0];
  const lineage = lib.lineageChildren(current);
  const related = lib.relatedCandidates(current);
  const selected = lib.primaryNext(current, null, lineage, related);

  assert.deepEqual(Array.from(lineage, item => item.essay.id), ['sequel']);
  assert.equal(selected.essay.id, 'sequel');
  assert.equal(selected.reason, 'この論考から続く');

  harness.window.MyEssaysReaderNavigation.render();
  assert.match(harness.getNextStep().innerHTML, /Explicit sequel/);
  assert.match(harness.getNextStep().innerHTML, /この論考から続く/);
});

test('related primary prefers unread, then opened, then completed', () => {
  const essays = [
    { id: 'current', title: 'Current', tags: ['UX', 'Reading'], created: '2026-08-01' },
    { id: 'completed', title: 'Completed', tags: ['UX', 'Reading'], created: '2026-09-03' },
    { id: 'opened', title: 'Opened', tags: ['UX', 'Reading'], created: '2026-09-02' },
    { id: 'unread', title: 'Unread', tags: ['UX'], created: '2026-09-01' }
  ];
  const harness = createNavigationHarness({
    essays,
    statuses: { completed: 'completed', opened: 'opened', unread: 'unread' }
  });
  const lib = harness.window.MyEssaysReaderNavigation.lib;
  const current = essays[0];
  const related = lib.relatedCandidates(current);

  assert.equal(lib.primaryNext(current, null, [], related).essay.id, 'unread');

  harness.window.MyEssaysReadingState.status = id => id === 'completed' ? 'completed' : 'opened';
  const reopened = lib.relatedCandidates(current);
  assert.equal(lib.primaryNext(current, null, [], reopened).essay.id, 'opened');

  harness.window.MyEssaysReadingState.status = () => 'completed';
  const completedOnly = lib.relatedCandidates(current);
  assert.equal(lib.primaryNext(current, null, [], completedOnly).essay.id, 'completed');
});

test('related ranking uses shared-tag count then recency inside the same reading status', () => {
  const essays = [
    { id: 'current', title: 'Current', tags: ['UX', 'Reading'], created: '2026-08-01' },
    { id: 'one-new', title: 'One new', tags: ['UX'], created: '2026-09-30' },
    { id: 'two-old', title: 'Two old', tags: ['UX', 'Reading'], created: '2026-09-01' },
    { id: 'two-new', title: 'Two new', tags: ['UX', 'Reading'], created: '2026-09-20' }
  ];
  const harness = createNavigationHarness({ essays });
  const related = harness.window.MyEssaysReaderNavigation.lib.relatedCandidates(essays[0]);

  assert.deepEqual(Array.from(related, item => item.essay.id), ['two-new', 'two-old', 'one-new']);
});

test('primary related article is removed from the secondary related list', () => {
  const essays = [
    { id: 'current', title: 'Current', tags: ['UX'], created: '2026-08-01' },
    { id: 'primary', title: 'Primary related', tags: ['UX'], created: '2026-09-03' },
    { id: 'second', title: 'Second related', tags: ['UX'], created: '2026-09-02' },
    { id: 'third', title: 'Third related', tags: ['UX'], created: '2026-09-01' }
  ];
  const harness = createNavigationHarness({ essays });

  harness.window.MyEssaysReaderNavigation.render();

  assert.match(harness.getNextStep().innerHTML, /Primary related/);
  assert.doesNotMatch(harness.getNavigation().innerHTML, /Primary related/);
  assert.match(harness.getNavigation().innerHTML, /Second related/);
  assert.match(harness.getNavigation().innerHTML, /Third related/);
  assert.match(harness.getNavigation().innerHTML, /ほかの関連記事/);
});

test('Aozora/book routes do not invent article recommendations', () => {
  const essays = [{ id: 'current', title: 'Book', tags: ['Book'], __aozoraBook: true }];
  const harness = createNavigationHarness({ essays, routeType: 'book' });

  harness.window.MyEssaysReaderNavigation.render();

  assert.equal(harness.getNextStep(), null);
  assert.equal(harness.getNavigation(), null);
});

test('main reader explicitly calls the navigation render hook', () => {
  const source = fs.readFileSync(path.join(__dirname, '..', 'app.js'), 'utf8');
  assert.match(source, /MyEssaysReaderNavigation\?\.render\(\)/);
  assert.match(source, /myessays:reader-rendered/);
});

test('after-reading owner keeps the intended semantic order', () => {
  const source = fs.readFileSync(path.join(__dirname, '..', 'reader-v2.js'), 'utf8');
  const order = [
    "'.reader-resonance'",
    "'.reader-next-step'",
    "'.reader-reflections'",
    "'.reader-gpt-expansion'",
    "'.reader-end-navigation'"
  ].map(token => source.indexOf(token));

  assert.ok(order.every(index => index >= 0), 'all after-reading surfaces should be registered');
  assert.deepEqual([...order].sort((a, b) => a - b), order);
});


test('next-step styling is mobile-safe, quiet, and readable', () => {
  const css = fs.readFileSync(path.join(__dirname, '..', 'reader-navigation.css'), 'utf8');
  const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');

  assert.match(css, /\.reader-next-step-link[\s\S]*?min-height:\s*104px/);
  assert.match(css, /\.reader-next-step-link:focus-visible/);
  assert.match(css, /\.reader-next-step-copy strong[\s\S]*?-webkit-line-clamp:\s*3/);
  assert.match(css, /\.reader-next-step-label[\s\S]*?font-size:\s*11px/);
  assert.match(css, /\.reader-next-step-copy small[\s\S]*?font-size:\s*11px/);
  assert.match(css, /@media \(prefers-reduced-motion:\s*reduce\)/);
  assert.match(html, /reader-navigation\.css\?v=20260930-2/);
  assert.match(html, /reader-navigation\.js\?v=20261002-1/);
  assert.match(html, /reader-v2\.js\?v=20260930-1/);
});
