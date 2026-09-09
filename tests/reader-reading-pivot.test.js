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
  const instant = read('reader-language-instant.js');
  assert.match(instant, /readerLanguageInstantDirect/);
  assert.match(instant, /role=\"radiogroup\"/);
  assert.match(instant, /role=\"radio\"/);
  assert.match(instant, /data-reading-mode-intent=\"\$\{version\}\"/);
  assert.match(instant, /aria-checked=\"false\"/);
  assert.doesNotMatch(instant, /reader-language-cycle/);
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
  assert.match(css, /\.reader-language-switch,/);
  assert.match(css, /\.reader-mode-bar \.reader-language-direct/);
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

test('instant Reading Mode controller is the only latest-intent owner', () => {
  const instant = read('reader-language-instant.js');
  const locators = read('reading-locators.js');
  assert.match(instant, /let desiredVersion = ''/);
  assert.match(instant, /let transitionActive = false/);
  assert.match(instant, /function requestVersion\(/);
  assert.match(instant, /myessays:reader-version-intent/);
  assert.match(instant, /myessays:reading-mode-stable/);
  assert.match(instant, /event\.stopImmediatePropagation\(\)/);
  assert.match(instant, /getVersionDocument/);
  assert.doesNotMatch(locators, /queuedSwitchVersion|pendingVersion/);
});

test('semantic locator layer emits stable only after semantic eye-line correction', () => {
  const locators = read('reading-locators.js');
  const correction = locators.indexOf('window.scrollBy({ top: delta');
  const stable = locators.indexOf("myessays:reading-mode-stable");
  assert.ok(correction >= 0 && stable > correction, 'stable boundary must follow semantic correction');
  assert.match(locators, /captureForSwitch: captureSemanticAnchorNow/);
});