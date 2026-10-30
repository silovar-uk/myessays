const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');

test('Library first view stays compact on desktop', () => {
  const css = read('ui-enhancements.css');

  assert.match(css, /Library first-view density/);
  assert.match(css, /\.library-shell\s*\{[\s\S]*?padding-top:\s*30px/);
  assert.match(css, /\.hero\s*\{[\s\S]*?margin-bottom:\s*14px/);
  assert.match(css, /\.reading-launcher\s*\{[\s\S]*?padding:\s*8px/);
  assert.match(css, /\.reading-launcher-label\s*\{[\s\S]*?display:\s*none/);
  assert.match(css, /\.discovery-button\s*\{[\s\S]*?min-height:\s*42px/);
});

test('Mobile discovery actions remain one compact row', () => {
  const css = read('ui-enhancements.css');
  const compactBlock = css.slice(css.lastIndexOf('/* Library first-view density'));

  assert.match(compactBlock, /@media \(max-width:\s*760px\)[\s\S]*?grid-template-columns:\s*repeat\(3,\s*minmax\(0,\s*1fr\)\)/);
  assert.match(compactBlock, /@media \(max-width:\s*460px\)[\s\S]*?grid-template-columns:\s*repeat\(3,\s*minmax\(0,\s*1fr\)\)/);
  assert.match(compactBlock, /@media \(max-width:\s*460px\)[\s\S]*?\.eyebrow\s*\{[\s\S]*?display:\s*none/);
});

test('Density stylesheet cache token is current', () => {
  const html = read('index.html');
  assert.match(html, /ui-enhancements\.css\?v=20261030-lazy-catalog-1/);
});

test('Latest front-page cards reserve room for a recently revised article', () => {
  const app = read('app.js');
  const html = read('index.html');
  assert.match(app, /\.filter\(e => e\.updated && e\.created && String\(e\.updated\) > String\(e\.created\)\)/);
  assert.match(app, /if \(revised\[0\] && String\(revised\[0\]\.updated\) >= newestThreshold\) addUnique\(revised\[0\]\)/);
  assert.match(app, /新着・最近改訂した論考/);
  assert.match(html, /app\.js\?v=20261030-lazy-catalog-1/);
});

test('Revised essays return to Archive after newer articles arrive', () => {
  const vm = require('node:vm');
  const script = read('app.js');
  const fn = script.match(/function latestEssayIds\(\) \{[\s\S]*?\n\}/);
  assert.ok(fn);
  const essay = (id, created, updated = created) => ({ id, created, updated });
  const items = [
    essay('revised', '2026-09-30', '2026-10-14'),
    essay('a', '2026-10-14'), essay('b', '2026-10-14'),
    essay('c', '2026-10-14'), essay('d', '2026-10-14')
  ];
  const get = data => [...vm.runInNewContext(fn[0] + '\nlatestEssayIds()', { state: { essays: data } })];
  assert.equal(get(items).length, 4);
  assert.ok(get(items).includes('revised'));
  const later = [...items, ...['w', 'x', 'y', 'z'].map(id => essay(id, '2026-10-15'))];
  assert.ok(!get(later).includes('revised'));
});
