const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');
const source = fs.readFileSync(path.join(root, 'reading-locators.js'), 'utf8');

test('derived reading blocks retain canonical locator coverage', () => {
  assert.match(source, /dataset\.readingLocatorCoverage/);
  assert.match(source, /semanticCoverage\(/);
  assert.match(source, /proportionalCanonicalCoverage\(/);
  assert.match(source, /renderedIndex === currentIndex/);
  assert.match(source, /canonicalTextForLocator\(/);
  assert.match(source, /findContainingBlock\(/);
});

test('semantic eye-line can target text inside a merged physical paragraph', () => {
  assert.match(source, /document\.createRange\(\)/);
  assert.match(source, /rangeForExactText\(/);
  assert.match(source, /semanticRect\(/);
  assert.match(source, /textBounds\(target\) \|\| target\.getBoundingClientRect\(\)/);
  assert.match(source, /semanticTop\(/);
});

test('language-only switching freezes canonical progress until real reader intent', () => {
  assert.match(source, /frozenSemanticProgress = computeSemanticProgress\(\)/);
  assert.match(source, /frozenSemanticProgress && semanticEyeLineReference\?\.essayId === currentEssayId\(\)/);
  assert.match(source, /function clearSemanticEyeLineReference\(\)[\s\S]*?frozenSemanticProgress = null/);
  assert.match(source, /addEventListener\('wheel', readerGesture/);
  assert.match(source, /addEventListener\('touchmove', readerGesture/);
});

test('language switching corrects the semantic eye-line before declaring Reading Mode stable', () => {
  assert.match(source, /captureForSwitch: captureSemanticAnchorNow/);
  assert.match(source, /myessays:reading-pivot-changed/);
  assert.match(source, /event\.detail\?\.reason !== 'language-switch'/);
  assert.match(source, /targetTop - anchor\.viewportTop/);
  assert.match(source, /myessays:reading-mode-stable/);
  const correction = source.indexOf('window.scrollBy({ top: delta');
  const stable = source.indexOf("myessays:reading-mode-stable");
  assert.ok(correction >= 0 && stable > correction, 'stable must be emitted after semantic eye-line correction');
  assert.doesNotMatch(source, /setTimeout\([^)]*restoreSemanticEyeLine/);
});
