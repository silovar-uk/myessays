const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const read = file => fs.readFileSync(path.join(__dirname, '..', file), 'utf8');

test('selection uses start paragraph and exact range offsets', () => {
  const source = read('reader-japanese-reference.js');
  assert.match(source, /closestBlock\(range\.startContainer\)/);
  assert.match(source, /offsetWithinBlock/);
  assert.match(source, /probe\.setEnd\(node, offset\)/);
  assert.match(source, /startBlock === endBlock/);
  assert.doesNotMatch(source, /return \{ invalid: true \}/);
});

test('panel renders paragraph context and marks only selection', () => {
  const source = read('reader-japanese-reference.js');
  assert.match(source, /renderSelectedParagraph\(selected, selection\)/);
  assert.match(source, /japanese-reference-selection-mark/);
  assert.match(source, /references\.get\(selection\.block\)/);
});
