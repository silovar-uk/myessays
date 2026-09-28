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
  assert.match(html, /ui-enhancements\.css\?v=20260928-2/);
});
