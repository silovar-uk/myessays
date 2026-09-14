// Production-wired Reading Pivot acceptance test.
const { chromium } = require('playwright');
const assert = require('node:assert/strict');

const BASE_URL = process.env.BASE_URL || 'http://127.0.0.1:4173';
const ESSAY_ID = 'confucius-knowing-liking-enjoying';
const CONTROL = '#readerLanguageInstantDirect';

function overlaps(a, b) {
  if (!a || !b) return false;
  return !(a.x + a.width <= b.x || b.x + b.width <= a.x || a.y + a.height <= b.y || b.y + b.height <= a.y);
}

async function readingState(page) {
  return page.evaluate(() => {
    const pivot = window.MyEssaysReadingPivot?.current?.()
      || document.querySelector('#readerContent > p.reader-locator-block.is-reading-pivot[data-reading-locator]');
    if (!pivot) return null;
    const rect = pivot.getBoundingClientRect();
    const locator = window.MyEssaysReadingPivot?.locator?.() || pivot.dataset.readingLocator || '';
    const after = getComputedStyle(pivot, '::after');
    const content = document.getElementById('readerContent');
    const focus = window.MyEssaysReadingPivot?.focusBlocks?.() || [];
    return {
      locator,
      physicalLocator: pivot.dataset.readingLocator || '',
      top: window.MyEssaysReadingLocators?.semanticTop?.(locator, pivot) ?? rect.top,
      physicalTop: rect.top,
      physicalBottom: rect.bottom,
      railY: window.MyEssaysReadingPivot?.readingRailY?.() ?? null,
      text: (pivot.textContent || '').trim().slice(0, 80),
      backgroundColor: getComputedStyle(pivot).backgroundColor,
      boxShadow: getComputedStyle(pivot).boxShadow,
      markerWidth: after.width,
      markerHeight: after.height,
      markerPointerEvents: after.pointerEvents,
      focusCount: focus.length,
      focusLocators: focus.map(block => block.dataset.readingLocator || ''),
      focusStart: content?.dataset.readingFocusStart || '',
      focusEnd: content?.dataset.readingFocusEnd || '',
      focusAnchor: content?.dataset.readingFocusAnchor || '',
      zoneBackground: content ? getComputedStyle(content).backgroundImage : '',
      scrollWidth: document.documentElement.scrollWidth,
      innerWidth: window.innerWidth
    };
  });
}

function assertRailOwnsPivot(state, label) {
  assert.ok(state, `${label}: Pivot should exist`);
  assert.ok(Number.isFinite(state.railY), `${label}: Reading Rail should be exposed`);
  assert.ok(
    state.physicalTop <= state.railY + 24 && state.physicalBottom >= state.railY - 24,
    `${label}: Pivot should intersect the Reading Rail or remain inside its 24px hysteresis band`
  );
  assert.equal(state.focusAnchor, state.physicalLocator, `${label}: focus anchor should be the physical Pivot`);
  assert.ok(state.focusCount >= 1 && state.focusCount <= 3, `${label}: focus zone should contain 1–3 paragraphs`);
  assert.ok(state.focusLocators.includes(state.physicalLocator), `${label}: Pivot should belong to the Reading Lens range`);
}

async function switchTo(page, expected) {
  const button = page.locator(`${CONTROL} [data-reading-mode-intent="${expected}"]`);
  await button.click();
  await page.waitForFunction(version => {
    const button = document.querySelector(`#readerLanguageInstantDirect [data-reading-mode-intent="${version}"]`);
    return window.MyEssaysReaderVersions?.currentVersion?.() === version
      && window.MyEssaysInstantReadingModes?.desiredVersion?.() === version
      && !window.MyEssaysInstantReadingModes?.isTransitioning?.()
      && button?.getAttribute('aria-checked') === 'true';
  }, expected, { timeout: 8000 });
}

async function waitForPivotChange(page, previousLocator) {
  await page.waitForFunction(locator => {
    const current = window.MyEssaysReadingPivot?.physicalLocator?.()
      || document.querySelector('#readerContent > p.reader-locator-block.is-reading-pivot')?.dataset.readingLocator
      || '';
    return current && current !== locator;
  }, previousLocator, { timeout: 3000 });
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  const pageErrors = [];
  const consoleErrors = [];
  page.on('pageerror', error => pageErrors.push(String(error)));
  page.on('console', message => { if (message.type() === 'error') consoleErrors.push(message.text()); });

  await page.goto(`${BASE_URL}/#/essay/${ESSAY_ID}`, { waitUntil: 'networkidle' });
  await page.waitForSelector('#readerView:not([hidden])');
  await page.waitForSelector(CONTROL);
  await page.waitForSelector('#readerContent > p.reader-locator-block[data-reading-locator]');
  await page.waitForSelector('#readerContent > p.reader-locator-block.is-reading-pivot');
  await page.waitForTimeout(120);

  const initial = await readingState(page);
  assertRailOwnsPivot(initial, 'initial');
  assert.equal(initial.backgroundColor, 'rgba(0, 0, 0, 0)', 'Pivot itself should stay transparent');
  assert.equal(initial.boxShadow, 'none', 'Pivot should not use a shadow line');
  assert.equal(initial.markerWidth, '3px', 'Pivot bookmark should be 3px wide');
  assert.equal(initial.markerHeight, '24px', 'Pivot bookmark should be 24px tall');
  assert.equal(initial.markerPointerEvents, 'none', 'Pivot bookmark must not intercept pointer input');
  assert.match(initial.zoneBackground, /linear-gradient/, 'Reading Lens should be a continuous gradient');

  const directButtons = page.locator(`${CONTROL} [data-reading-mode-intent]`);
  assert.equal(await directButtons.count(), 3, 'JA / EN / ES should all be visible as direct choices for the sample article');
  assert.equal(await page.locator(CONTROL).getAttribute('role'), 'radiogroup');
  assert.equal(await page.locator(`${CONTROL} [data-reading-mode-intent="ja"]`).getAttribute('aria-checked'), 'true');
  assert.equal((await page.locator(`${CONTROL} [data-reading-mode-intent="en-mix"]`).textContent()).trim(), 'EN');
  assert.equal((await page.locator(`${CONTROL} [data-reading-mode-intent="es-mix"]`).textContent()).trim(), 'ES');
  assert.equal(await page.locator('.reader-mode-bar .reader-language-direct').count(), 0, 'Pivot must not create a duplicate language selector in the mode bar');
  assert.equal(await page.locator('.reader-mode-bar [data-reader-mode-version]').count(), 0, 'the visible mode bar must not contain legacy language choices');
  assert.ok(await page.locator('[data-reader-mode-compare]').isVisible(), 'Compare should remain a separate secondary action on desktop');
  assert.equal(await page.locator('#readerLanguageSwitch').isHidden(), true, 'legacy language disclosure should remain hidden');

  // Put the current paragraph comfortably on the Rail, then verify a tiny scroll
  // remains inside the existing 24px hysteresis instead of selecting a new Pivot.
  await page.evaluate(() => {
    const pivot = window.MyEssaysReadingPivot?.current?.();
    const rail = window.MyEssaysReadingPivot?.readingRailY?.();
    if (!pivot || !Number.isFinite(rail)) return;
    const rect = pivot.getBoundingClientRect();
    const targetPoint = rect.top + Math.min(Math.max(12, rect.height * .35), Math.max(12, rect.height - 12));
    window.scrollBy({ top: targetPoint - rail, behavior: 'auto' });
  });
  await page.waitForTimeout(100);
  const beforeTinyScroll = await readingState(page);
  await page.evaluate(() => window.scrollBy({ top: 8, behavior: 'auto' }));
  await page.waitForTimeout(80);
  const afterTinyScroll = await readingState(page);
  assert.equal(afterTinyScroll.physicalLocator, beforeTinyScroll.physicalLocator, '8px scroll should remain inside Pivot hysteresis');

  // Cross a paragraph boundary and confirm the Rail selects a new physical Pivot.
  await page.evaluate(() => {
    const pivot = window.MyEssaysReadingPivot?.current?.();
    const distance = Math.max(96, (pivot?.getBoundingClientRect().height || 0) + 40);
    window.scrollBy({ top: distance, behavior: 'auto' });
  });
  await waitForPivotChange(page, afterTinyScroll.physicalLocator);
  const readingPivot = await readingState(page);
  assertRailOwnsPivot(readingPivot, 'after boundary scroll');

  const beforeSwitch = await readingState(page);
  assert.ok(beforeSwitch?.locator, 'a logical Reading Pivot locator should exist before language switching');

  await switchTo(page, 'en-mix');
  const english = await readingState(page);
  assert.equal(english?.locator, beforeSwitch.locator, 'JA → EN must preserve the exact logical Pivot locator');
  assert.ok(Math.abs(english.top - beforeSwitch.top) <= 3, `JA → EN semantic Pivot top drifted by ${english.top - beforeSwitch.top}px`);

  await page.waitForSelector('#readerContent .reader-locator-block.is-language-switch-target', { timeout: 2000 });
  const switchFeedback = await page.evaluate(() => {
    const target = document.querySelector('#readerContent .reader-locator-block.is-language-switch-target');
    const style = target ? getComputedStyle(target) : null;
    const after = target ? getComputedStyle(target, '::after') : null;
    return target && style && after ? {
      animationName: style.animationName,
      animationDuration: style.animationDuration,
      markerHeight: after.height,
      markerWidth: after.width,
      markerAnimationName: after.animationName,
      markerPointerEvents: after.pointerEvents
    } : null;
  });
  assert.ok(switchFeedback, 'language switch target should be visible during its 1800ms lifetime');
  assert.match(switchFeedback.animationName, /reader-language-target-surface/);
  assert.match(switchFeedback.animationDuration, /1\.8s/);
  assert.equal(switchFeedback.markerWidth, '3px');
  assert.match(switchFeedback.markerAnimationName, /reader-language-target-marker/);
  assert.equal(switchFeedback.markerPointerEvents, 'none');

  await page.waitForTimeout(1900);
  assert.equal(await page.locator('#readerContent .is-language-switch-target').count(), 0, 'language switch target should clear after 1800ms');
  const afterFlash = await readingState(page);
  assert.equal(afterFlash.markerHeight, '24px', 'normal short bookmark should return after switch feedback');

  await switchTo(page, 'es-mix');
  const spanish = await readingState(page);
  assert.equal(spanish?.locator, beforeSwitch.locator, 'EN → ES must preserve the exact logical Pivot locator');
  assert.ok(Math.abs(spanish.top - beforeSwitch.top) <= 3, `EN → ES semantic Pivot top drifted by ${spanish.top - beforeSwitch.top}px`);

  await switchTo(page, 'ja');
  const returned = await readingState(page);
  assert.equal(returned?.locator, beforeSwitch.locator, 'ES → JA must preserve the exact logical Pivot locator');
  assert.ok(Math.abs(returned.top - beforeSwitch.top) <= 3, `round-trip semantic Pivot top drifted by ${returned.top - beforeSwitch.top}px`);

  // Rapid supersession must settle on the latest intent only.
  await page.locator(`${CONTROL} [data-reading-mode-intent="en-mix"]`).click();
  await page.waitForTimeout(25);
  await page.locator(`${CONTROL} [data-reading-mode-intent="ja"]`).click();
  await page.waitForFunction(() => window.MyEssaysReaderVersions?.currentVersion?.() === 'ja'
    && window.MyEssaysInstantReadingModes?.desiredVersion?.() === 'ja'
    && !window.MyEssaysInstantReadingModes?.isTransitioning?.(), null, { timeout: 8000 });
  const rapid = await readingState(page);
  assert.equal(rapid.locator, beforeSwitch.locator, 'rapid JA → EN → JA must keep the final logical Pivot');

  // At the article end the focus range may be backfilled, but the bookmark still
  // belongs to the actual Rail Pivot rather than the first paragraph in the range.
  await page.evaluate(() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'auto' }));
  await page.waitForTimeout(140);
  const ending = await readingState(page);
  assertRailOwnsPivot(ending, 'article end');
  assert.ok(ending.focusCount <= 3, 'article-end focus range should remain capped at three paragraphs');
  if (ending.focusCount === 3) {
    assert.equal(ending.focusLocators.at(-1), ending.focusEnd, 'focus end dataset should match the visible range');
  }

  for (const width of [820, 390, 320]) {
    await page.setViewportSize({ width, height: width <= 390 ? 844 : 800 });
    await page.reload({ waitUntil: 'networkidle' });
    await page.waitForSelector(CONTROL);
    await page.waitForSelector('#readerContent > p.reader-locator-block.is-reading-pivot');
    await page.waitForTimeout(120);
    const state = await readingState(page);
    assertRailOwnsPivot(state, `${width}px`);
    assert.ok(state.scrollWidth <= state.innerWidth + 1, `${width}px should not gain horizontal scrolling from the bookmark`);
    assert.equal(state.markerWidth, '3px', `${width}px bookmark should stay 3px wide`);
    assert.equal(state.markerPointerEvents, 'none', `${width}px bookmark must not block text selection`);
  }

  const directBox = await page.locator(CONTROL).boundingBox();
  const noteBox = await page.locator('#noteTab').boundingBox();
  assert.ok(directBox && noteBox, 'mobile direct language choices and note control should remain visible');
  assert.ok(directBox.x >= 0 && directBox.x + directBox.width <= 320.5, `direct language control overflows 320px viewport: ${JSON.stringify(directBox)}`);
  assert.equal(overlaps(directBox, noteBox), false, 'direct language control must not overlap the note action');
  assert.equal(await page.locator('[data-reader-mode-compare]').isHidden(), true, 'desktop Compare action should leave the mobile Reader Header');

  const jaButton = page.locator(`${CONTROL} [data-reading-mode-intent="ja"]`);
  await jaButton.focus();
  await page.keyboard.press('ArrowRight');
  await page.waitForFunction(() => window.MyEssaysReaderVersions?.currentVersion?.() === 'en-mix');
  assert.equal(await page.locator(`${CONTROL} [data-reading-mode-intent="en-mix"]`).getAttribute('aria-checked'), 'true');

  await page.locator('.reader-v2-map-toggle').click();
  await page.waitForSelector('#readerAside.is-open');
  await page.waitForSelector('.reader-mobile-compare:not([hidden])');
  const mobileCompareBox = await page.locator('.reader-mobile-compare').boundingBox();
  assert.ok(mobileCompareBox, 'Compare should remain available from the mobile Reader Map');
  assert.ok(mobileCompareBox.x >= 0 && mobileCompareBox.x + mobileCompareBox.width <= 320.5, `mobile Reader Map Compare overflows viewport: ${JSON.stringify(mobileCompareBox)}`);
  await page.locator('.reader-mobile-compare').click();
  await page.waitForSelector('.reader-compare-view');
  await page.waitForFunction(() => !document.querySelector('#readerAside')?.classList.contains('is-open'));
  await page.keyboard.press('Escape');
  await page.waitForFunction(() => !document.querySelector('.reader-compare-view'));

  // Accessibility media queries keep a static position cue without introducing
  // animation or depending on gradients/shadows.
  await page.emulateMedia({ reducedMotion: 'reduce', forcedColors: 'active' });
  await page.evaluate(() => {
    const pivot = window.MyEssaysReadingPivot?.current?.();
    pivot?.classList.add('is-language-switch-target');
  });
  const forced = await page.evaluate(() => {
    const content = document.getElementById('readerContent');
    const target = document.querySelector('#readerContent .is-language-switch-target');
    const style = target ? getComputedStyle(target) : null;
    const after = target ? getComputedStyle(target, '::after') : null;
    return target && style && after ? {
      backgroundImage: content ? getComputedStyle(content).backgroundImage : '',
      animationName: style.animationName,
      outlineStyle: style.outlineStyle,
      outlineWidth: style.outlineWidth,
      markerAnimationName: after.animationName,
      markerPointerEvents: after.pointerEvents
    } : null;
  });
  assert.ok(forced, 'forced-colors target should remain inspectable');
  assert.equal(forced.backgroundImage, 'none', 'forced colors should not rely on Reading Lens gradient');
  assert.equal(forced.animationName, 'none', 'reduced motion should disable switch-surface fade');
  assert.equal(forced.markerAnimationName, 'none', 'reduced motion should disable switch-marker fade');
  assert.equal(forced.outlineStyle, 'solid', 'forced colors should expose a system-color outline');
  assert.notEqual(forced.outlineWidth, '0px', 'forced colors outline should remain visible');
  assert.equal(forced.markerPointerEvents, 'none', 'forced-colors marker must not block interaction');

  assert.deepEqual(pageErrors, [], `browser page errors: ${pageErrors.join(' | ')}`);
  assert.deepEqual(consoleErrors, [], `browser console errors: ${consoleErrors.join(' | ')}`);

  await browser.close();
  console.log('Reading Pivot QA passed');
})().catch(error => {
  console.error(error);
  process.exit(1);
});
