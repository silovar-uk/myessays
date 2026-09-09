const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');

test('reading pivot uses the second sufficiently visible paragraph only', () => {
  const pivot = read('reader-reading-pivot.js');
  assert.match(pivot, /const VISIBLE_RATIO = 0\.35/);
  assert.match(pivot, /:scope > p\.reader-locator-block\[data-reading-locator\]/);
  assert.match(pivot, /if \(visible\.length >= 2\) return visible\[1\]\.block/);
  assert.doesNotMatch(pivot, /:scope > \.reader-locator-block\[data-reading-locator\]/);
});

test('reading pivot exposes direct one-tap Reading Mode choices', () => {
  const pivot = read('reader-reading-pivot.js');
  assert.match(pivot, /reader-language-direct/);
  assert.match(pivot, /role=\"radiogroup\"/);
  assert.match(pivot, /role=\"radio\"/);
  assert.match(pivot, /data-reader-mode-version=\"\$\{version\}\"/);
  assert.match(pivot, /aria-checked=\"\$\{active\}\"/);
  assert.doesNotMatch(pivot, /reader-language-cycle/);
});

test('reading pivot preserves semantic identity across Reading Mode switches', () => {
  const pivot = read('reader-reading-pivot.js');
  assert.match(pivot, /locator,/);
  assert.match(pivot, /pairId: current\.dataset\.pairId \|\| ''/);
  assert.match(pivot, /matchingLocatorBlocks\(anchor\.locator\)/);
  assert.match(pivot, /block\.dataset\.pairId === anchor\.pairId/);
  assert.match(pivot, /nearestCanonicalBlock\(anchor\.locator\)/);
});

test('reading pivot highlight is background-only and legacy disclosure is hidden', () => {
  const css = read('reader-reading-pivot.css');
  assert.match(css, /\.reader-language-switch\s*\{[\s\S]*?display:\s*none !important/);
  assert.match(css, /is-reading-pivot\s*\{[\s\S]*?background-color:\s*rgba\(180, 62, 49, \.045\)/);
  assert.match(css, /is-language-switch-target[\s\S]*?box-shadow:\s*none/);
  assert.doesNotMatch(css, /reader-pivot-language-settle/);
});

test('direct Reading Mode control supports keyboard radio navigation', () => {
  const pivot = read('reader-reading-pivot.js');
  assert.match(pivot, /ArrowRight/);
  assert.match(pivot, /ArrowLeft/);
  assert.match(pivot, /ArrowDown/);
  assert.match(pivot, /ArrowUp/);
  assert.match(pivot, /event\.key === 'Home'/);
  assert.match(pivot, /event\.key === 'End'/);
  assert.match(pivot, /target\.click\(\)/);
});