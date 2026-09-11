const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');

test('reading pivot uses the third paragraph in flow from the top visible reading paragraph', () => {
  const pivot = read('reader-reading-pivot.js');
  assert.match(pivot, /const MIN_VISIBLE_PX = 20/);
  assert.match(pivot, /const FOCUS_START_INDEX = 2/);
  assert.match(pivot, /:scope > p\.reader-locator-block\[data-reading-locator\]/);
  assert.match(pivot, /item\.visiblePx >= Math\.min\(MIN_VISIBLE_PX/);
  assert.match(pivot, /const topBlock = visible\[0\]\?\.block \|\| null/);
  assert.match(pivot, /blocks\.slice\(topIndex \+ FOCUS_START_INDEX, topIndex \+ FOCUS_START_INDEX \+ FOCUS_RANGE_LENGTH\)/);
  assert.match(pivot, /if \(flow\.focusBlocks\.length\) return flow\.focusBlocks\[0\]/);
  assert.doesNotMatch(pivot, /return visible\[FOCUS_START_INDEX\]\.block/);
  assert.doesNotMatch(pivot, /VISIBLE_RATIO|PIVOT_SETTLE_MS/);
});

test('Reading Focus is one visual zone spanning third through fifth paragraphs in reading flow', () => {
  const pivot = read('reader-reading-pivot.js');
  const css = read('reader-reading-pivot.css');
  assert.match(pivot, /const FOCUS_RANGE_LENGTH = 3/);
  assert.match(pivot, /function readingFlowFromTop/);
  assert.match(pivot, /flow\.focusBlocks\.map\(block => \(\{ block, rect: block\.getBoundingClientRect\(\) \}\)\)/);
  assert.match(pivot, /has-reading-focus-zone/);
  assert.match(pivot, /--reading-zone-top/);
  assert.match(pivot, /--reading-zone-bottom/);
  assert.match(css, /\.reader-content\.has-reading-focus-zone\s*\{[\s\S]*?linear-gradient/);
  assert.doesNotMatch(pivot, /is-reading-focus(?:-range)?/);
  assert.doesNotMatch(css, /\.is-reading-focus(?:-range)?/);
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
  assert.doesNotMatch(pivot, /class=\"reader-language-direct\"|shortBadge|versionOrder|handleLanguageRadioKeydown/);
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

test('same-essay rerenders preserve an active Pivot handoff anchor', () => {
  const pivot = read('reader-reading-pivot.js');
  assert.match(pivot, /const sameEssayHandoff = pendingSwitchAnchor\?\.essayId === id/);
  assert.match(pivot, /if \(!sameEssayHandoff\) \{[\s\S]*?pendingSwitchAnchor = null/);
});

test('reading focus zone is perceptible, continuous, non-animated and leaves Pivot visually unpainted', () => {
  const css = read('reader-reading-pivot.css');
  assert.match(css, /is-reading-pivot\s*\{[\s\S]*?transition:\s*none;[\s\S]*?background-color:\s*transparent;[\s\S]*?box-shadow:\s*none/);
  assert.match(css, /has-reading-focus-zone[\s\S]*?rgba\(255, 255, 255, \.28\)/);
  assert.match(css, /has-reading-focus-zone[\s\S]*?rgba\(255, 255, 255, \.07\)/);
  assert.match(css, /@media \(max-width: 820px\)[\s\S]*?has-reading-focus-zone[\s\S]*?rgba\(255, 255, 255, \.24\)/);
  const zoneRules = [...css.matchAll(/\.reader-content\.has-reading-focus-zone\s*\{([\s\S]*?)\}/g)]
    .map(match => match[1]);
  assert.equal(zoneRules.length, 2, 'desktop and mobile Reading Zone rules should both exist');
  zoneRules.forEach(rule => assert.doesNotMatch(rule, /transition:/));
  assert.match(css, /is-language-switch-target[\s\S]*?box-shadow:\s*none/);
});

test('Reading Surface has one semantic progress owner and an opacity-only Ink Dissolve', () => {
  const ui = read('ui-enhancements.js');
  const v2 = read('reader-v2.js');
  const locators = read('reading-locators.js');
  const versions = read('reader-versions.js');
  const instant = read('reader-language-instant.js');
  const css = read('reader-reading-pivot.css');
  assert.doesNotMatch(ui, /reading-progress-track|reading-progress-bar|function updateProgress/);
  const shell = read('reader-mode-shell.js');
  assert.doesNotMatch(v2, /reader-v2-header-progress/);
  assert.match(v2, /MyEssaysReadingLocators\?\.progress\?\.\(\)/);
  assert.match(shell, /reader-mode-shell__progress/);
  assert.match(shell, /MyEssaysReadingLocators\?\.progress\?\.\(\)/);
  assert.match(locators, /progress: semanticProgress/);
  assert.match(locators, /alignCapturedForSnapshot/);
  assert.match(versions, /document\.startViewTransition\(update\)/);
  assert.match(versions, /showReader\(nextEssay, \{ preserveScroll: true \}\)/);
  assert.match(instant, /document\.activeViewTransition\?\.skipTransition\?\.\(\)/);
  assert.match(css, /view-transition-name:\s*reader-ink/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
  assert.doesNotMatch(css, /translate\(|scale\(|blur\(/);
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

test('Reader Versions owns content swaps, never semantic eye-line restoration', () => {
  const versions = read('reader-versions.js');
  assert.doesNotMatch(versions, /captureReadingPosition|restoreReadingPosition/);
  assert.doesNotMatch(versions, /positionOwner:\s*['\"]reader-versions/);
  assert.doesNotMatch(versions, /window\.scroll(?:To|By)\s*\(/);
  assert.match(versions, /waitForSemanticLocators/);
  assert.match(versions, /myessays:reader-language-changed/);
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

test('stable language handoff keeps the restored Pivot until user scroll', () => {
  const pivot = read('reader-reading-pivot.js');
  const stableStart = pivot.indexOf("document.addEventListener('myessays:reading-mode-stable'");
  const stableEnd = pivot.indexOf("document.addEventListener('myessays:reading-location-changed'", stableStart);
  assert.ok(stableStart >= 0 && stableEnd > stableStart, 'stable handler should be inspectable');
  const stableHandler = pivot.slice(stableStart, stableEnd);
  assert.match(stableHandler, /refreshReadingBlocks\(\)/);
  assert.match(stableHandler, /syncReadingZone\(visibleReadingItems\(\)\)/);
  assert.match(stableHandler, /requestAnimationFrame\(syncCompareUI\)/);
  assert.doesNotMatch(stableHandler, /scheduleEvaluate|candidatePivot|setPivot/);
  assert.match(pivot, /window\.addEventListener\('scroll', \(\) => scheduleEvaluate\(\)/);
});


test('semantic handoff ignores layout scroll until a real reader gesture', () => {
  const pivot = read('reader-reading-pivot.js');
  const locators = read('reading-locators.js');
  assert.match(pivot, /let semanticHandoffHold = false/);
  assert.match(pivot, /semanticHandoffHold = true;[\s\S]*?syncReadingZone/);
  assert.match(pivot, /Date\.now\(\) < lockUntil \|\|[\s\S]*?semanticHandoffHold \|\|/);
  assert.match(pivot, /window\.addEventListener\('wheel', releaseSemanticHandoffHold/);
  assert.match(pivot, /window\.addEventListener\('touchmove', releaseSemanticHandoffHold/);
  assert.match(pivot, /keyboardMayMoveReader/);
  assert.doesNotMatch(locators, /function readerMoved/);
  assert.doesNotMatch(locators, /addEventListener\('scroll', readerMoved/);
  assert.match(locators, /addEventListener\('wheel', readerGesture/);
  assert.match(locators, /addEventListener\('touchmove', readerGesture/);
});


test('semantic restore begins only after View Transition final geometry', () => {
  const versions = read('reader-versions.js');
  const updateDone = versions.indexOf('await transition.updateCallbackDone');
  const finished = versions.indexOf('await transition.finished', updateDone);
  const languageDispatch = versions.indexOf('return dispatchLanguageChanged({ id, version, locator, pairId })', finished);
  assert.ok(updateDone >= 0, 'View Transition DOM update boundary should exist');
  assert.ok(finished > updateDone, 'final geometry must wait for transition.finished');
  assert.ok(languageDispatch > finished, 'semantic language handoff must start after transition.finished');
  const commitStart = versions.indexOf('async function commitVersionSwap');
  const helperStart = versions.indexOf('function dispatchLanguageChanged', commitStart);
  const commitBody = versions.slice(commitStart, helperStart);
  assert.doesNotMatch(commitBody, /reader-language-changed/);
});
