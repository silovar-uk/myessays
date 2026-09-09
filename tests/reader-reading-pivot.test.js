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

test('instant controller exclusively renders direct one-tap Reading Mode choices', () => {
  const instant = read('reader-language-instant.js');
  const pivot = read('reader-reading-pivot.js');
  assert.match(instant, /readerLanguageInstantDirect/);
  assert.match(instant, /setAttribute\('role', 'radiogroup'\)/);
  assert.match(instant, /role=\"radio\"/);
  assert.match(instant, /data-reading-mode-intent=\"\$\{version\}\"/);
  assert.match(instant, /aria-checked=\"false\"/);
  assert.doesNotMatch(instant, /reader-language-cycle/);
  assert.doesNotMatch(pivot, /class=\"reader-language-direct\"|data-reader-mode-version|shortBadge|versionOrder|handleLanguageRadioKeydown/);
  assert.match(pivot, /data-reader-mode-compare/);
});

test('reading pivot preserves semantic identity across Reading Mode switches', () => {
  const pivot = read('reader-reading-pivot.js');
  assert.match(pivot, /findContainingBlock\?\.\(/);
  assert.match(pivot, /paragraphOnly:\s*true/);
  assert.match(pivot, /locator,/);
  assert.match(pivot, /pairId: current\.dataset\.pairId \|\| ''/);
  assert.match(pivot, /nearestCanonicalBlock\(anchor\.locator\)/);
});

test('reading focus highlight is immediate, perceptible and background-only', () => {
  const css = read('reader-reading-pivot.css');
  assert.match(css, /is-reading-pivot\s*\{[\s\S]*?transition:\s*none;[\s\S]*?background-color:\s*rgba\(180, 62, 49, \.085\)/);
  assert.match(css, /@media \(max-width: 820px\)[\s\S]*?is-reading-pivot[\s\S]*?rgba\(180, 62, 49, \.072\)/);
  assert.match(css, /is-language-switch-target[\s\S]*?box-shadow:\s*none/);
});

test('persistent direct Reading Mode control supports keyboard radio navigation', () => {
  const instant = read('reader-language-instant.js');
  assert.match(instant, /ArrowRight/);
  assert.match(instant, /ArrowLeft/);
  assert.match(instant, /ArrowDown/);
  assert.match(instant, /ArrowUp/);
  assert.match(instant, /event\.key === 'Home'/);
  assert.match(instant, /event\.key === 'End'/);
  assert.match(instant, /target\.click\(\)/);
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

test('scroll guard owns lifecycle only, never a competing eye-line coordinate', () => {
  const guard = read('reader-reading-pivot-scroll-guard.js');
  assert.match(guard, /myessays:reader-version-intent/);
  assert.match(guard, /myessays:reading-mode-stable/);
  assert.doesNotMatch(guard, /anchorTop|correctEyeLine|window\.scrollBy|setTimeout/);
});