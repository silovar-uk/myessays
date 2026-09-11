const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');

test('page loads the reading mode shell after the existing reader layers', () => {
  const html = read('index.html');
  assert.match(html, /reader-mode-shell\.css\?v=20260911-1/);
  assert.match(html, /reader-mode-shell\.js\?v=20260911-1/);
  assert.ok(html.indexOf('reader-v2.js') < html.indexOf('reader-mode-shell.js'));
  assert.ok(html.indexOf('reader-reading-pivot.js') < html.indexOf('reader-mode-shell.js'));
});

test('shell keeps the three supported reading modes as direct controls', () => {
  const source = read('reader-mode-shell.js');
  assert.match(source, /\['ja', '日本語'\]/);
  assert.match(source, /\['en-mix', 'English Mix'\]/);
  assert.match(source, /\['es-mix', 'Español Mix'\]/);
  assert.match(source, /dataset\.readingModeIntent = key/);
  assert.match(source, /role', 'radiogroup'/);
});

test('shell reuses reader location and version events instead of adding scroll state', () => {
  const source = read('reader-mode-shell.js');
  assert.match(source, /myessays:reading-location-changed/);
  assert.match(source, /myessays:reader-version-intent/);
  assert.match(source, /MyEssaysInstantReadingModes/);
  assert.doesNotMatch(source, /addEventListener\(['"]scroll/);
  assert.doesNotMatch(source, /new IntersectionObserver/);
});

test('mobile mode bar remains a three-column direct control with robust targets', () => {
  const css = read('reader-mode-shell.css');
  assert.match(css, /grid-template-columns:\s*repeat\(3, minmax\(0, 1fr\)\)/);
  assert.match(css, /min-height:\s*48px/);
  assert.match(css, /white-space:\s*nowrap/);
  assert.match(css, /position:\s*sticky/);
  assert.match(css, /#readerLanguageInstantDirect/);
  assert.match(css, /#readerLanguageSwitch/);
});

test('shell is the only visible reading progress surface', () => {
  const shell = read('reader-mode-shell.js');
  const v2 = read('reader-v2.js');
  const ui = read('ui-enhancements.js');
  assert.match(shell, /reader-mode-shell__progress/);
  assert.match(shell, /MyEssaysReadingLocators\?\.progress\?\.\(\)/);
  assert.doesNotMatch(shell, /function headerProgress|reader-v2-header-progress/);
  assert.doesNotMatch(v2, /reader-v2-header-progress/);
  assert.doesNotMatch(ui, /reading-progress-track|reading-progress-bar/);
});

test('semantic focus feedback respects reduced motion', () => {
  const css = read('reader-mode-shell.css');
  assert.match(css, /is-language-switch-target/);
  assert.match(css, /animation-duration:\s*\.8s/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
});

test('Reading Surface hands semantic restoration the final live geometry', () => {
  const versions = read('reader-versions.js');
  const updateDone = versions.indexOf('await transition.updateCallbackDone');
  const finished = versions.indexOf('await transition.finished', updateDone);
  const languageHandoff = versions.indexOf('dispatchLanguageChanged({ id, version, locator, pairId })', finished);
  assert.ok(updateDone >= 0 && finished > updateDone, 'Ink Dissolve should reach its final geometry boundary');
  assert.ok(languageHandoff > finished, 'semantic restoration should start only after final transition geometry');
});
