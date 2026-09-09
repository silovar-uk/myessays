const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');

test('reading pivot uses the actual second visible paragraph', () => {
  const pivot = read('reader-reading-pivot.js');
  assert.match(pivot, /const MIN_VISIBLE_PX = 20/);
  assert.match(pivot, /:scope > p\.reader-locator-block\[data-reading-locator\]/);
  assert.match(pivot, /item\.visiblePx >= Math\.min\(MIN_VISIBLE_PX/);
  assert.match(pivot, /if \(visible\.length >= 2\) return visible\[1\]\.block/);
  assert.doesNotMatch(pivot, /VISIBLE_RATIO|PIVOT_SETTLE_MS/);
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
  assert.match(pivot, /findContainingBlock\?\.\(/);
  assert.match(pivot, /paragraphOnly:\s*true/);
  assert.match(pivot, /locator,/);
  assert.match(pivot, /pairId: current\.dataset\.pairId \|\| ''/);
  assert.match(pivot, /nearestCanonicalBlock\(anchor\.locator\)/);
});

test('reading focus highlight is perceptible, background-only, and legacy disclosure is hidden', () => {
  const css = read('reader-reading-pivot.css');
  assert.match(css, /\.reader-language-switch\s*\{[\s\S]*?display:\s*none !important/);
  assert.match(css, /is-reading-pivot\s*\{[\s\S]*?background-color:\s*rgba\(180, 62, 49, \.085\)/);
  assert.match(css, /@media \(max-width: 820px\)[\s\S]*?is-reading-pivot[\s\S]*?rgba\(180, 62, 49, \.072\)/);
  assert.match(css, /is-language-switch-target[\s\S]*?box-shadow:\s*none/);
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

test('instant Reading Mode controller preloads versions and keeps only latest rapid intent', () => {
  const instant = read('reader-language-instant.js');
  assert.match(instant, /getVersionDocument/);
  assert.match(instant, /pendingVersion = next/);
  assert.match(instant, /event\.stopImmediatePropagation\(\)/);
  assert.match(instant, /myessays:reader-version-intent/);
  assert.match(instant, /replayLatestIntent/);
  assert.match(instant, /requestAnimationFrame/);
});