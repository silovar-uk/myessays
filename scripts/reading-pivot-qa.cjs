// Production-wired Reading Pivot acceptance test.
const { chromium } = require('playwright');
const assert = require('node:assert/strict');

const BASE_URL = process.env.BASE_URL || 'http://127.0.0.1:4173';
const ESSAY_ID = 'confucius-knowing-liking-enjoying';
const CONTROL = '#readerModeShell .reader-mode-shell__modes';

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
      expectedRailLocator: (() => {
        const rail = window.MyEssaysReadingPivot?.readingRailY?.();
        const blocks = [...document.querySelectorAll('#readerContent > p.reader-locator-block[data-reading-locator]')]
          .filter(block => !block.classList.contains('language-source-hidden'));
        if (!Number.isFinite(rail) || !blocks.length) return '';
        const intersecting = blocks.find(block => {
          const candidate = block.getBoundingClientRect();
          return candidate.top <= rail && candidate.bottom >= rail;
        });
        if (intersecting) return intersecting.dataset.readingLocator || '';
        return blocks.reduce((best, block) => {
          const candidate = block.getBoundingClientRect();
          const point = Math.min(candidate.bottom, Math.max(candidate.top, rail));
          const distance = Math.abs(rail - point);
          return !best || distance < best.distance ? { block, distance } : best;
        }, null)?.block?.dataset?.readingLocator || '';
      })(),
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
  const insideRailBand = state.physicalTop <= state.railY + 24
    && state.physicalBottom >= state.railY - 24;
  if (!insideRailBand) {
    assert.equal(
      state.physicalLocator,
      state.expectedRailLocator,
      `${label}: when the Reading Rail crosses non-reading whitespace, Pivot should be the nearest readable paragraph`
    );
  }
  assert.equal(state.focusAnchor, state.physicalLocator, `${label}: focus anchor should be the physical Pivot`);
  assert.ok(state.focusCount >= 1 && state.focusCount <= 3, `${label}: focus zone should contain 1–3 paragraphs`);
  assert.ok(state.focusLocators.includes(state.physicalLocator), `${label}: Pivot should belong to the Reading Lens range`);
}

async function switchTo(page, expected) {
  const button = page.locator(`${CONTROL} [data-reading-mode-intent="${expected}"]`);
  await button.click();
  await page.waitForFunction(version => {
    const button = document.querySelector(`#readerModeShell [data-reading-mode-intent="${version}"]`);
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

async function waitForReader(page) {
  await page.waitForSelector('#readerView:not([hidden])');
  await page.waitForSelector(CONTROL);
  await page.waitForSelector('#readerContent > p.reader-locator-block[data-reading-locator]');
  await page.waitForSelector('#readerContent > p.reader-locator-block.is-reading-pivot');
  // Geometry assertions need a settled viewport. The production stylesheet uses
  // scroll-behavior:smooth, so behavior:'auto' would otherwise keep animating
  // between an assertion and the next language-switch action.
  await page.evaluate(() => { document.documentElement.style.scrollBehavior = 'auto'; });
  await page.waitForTimeout(120);
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  const pageErrors = [];
  const consoleErrors = [];
  page.on('pageerror', error => pageErrors.push(String(error)));
  page.on('console', message => { if (message.type() === 'error') consoleErrors.push(message.text()); });

  await page.goto(`${BASE_URL}/#/essay/${ESSAY_ID}`, { waitUntil: 'networkidle' });
  await waitForReader(page);

  const initial = await readingState(page);
  assertRailOwnsPivot(initial, 'initial');
  assert.equal(initial.backgroundColor, 'rgba(0, 0, 0, 0)', 'Pivot itself should stay transparent');
  assert.equal(initial.boxShadow, 'none', 'Pivot should not use a shadow line');
  assert.equal(initial.markerWidth, '3px', 'Pivot bookmark should be 3px wide');
  assert.equal(initial.markerHeight, '24px', 'Pivot bookmark should be 24px tall');
  assert.equal(initial.markerPointerEvents, 'none', 'Pivot bookmark must not intercept pointer input');
  assert.match(initial.zoneBackground, /linear-gradient/, 'Reading Lens should be a continuous gradient');

  const directButtons = page.locator(`${CONTROL} [data-reading-mode-intent]`);
  assert.equal(await directButtons.count(), 3, 'JA / EN / ES should all be visible as direct choices');
  assert.equal(await page.locator(CONTROL).getAttribute('role'), 'radiogroup');
  assert.equal(await page.locator(`${CONTROL} [data-reading-mode-intent="ja"]`).getAttribute('aria-checked'), 'true');
  assert.equal((await page.locator(`${CONTROL} [data-reading-mode-intent="ja"]`).textContent()).trim(), '日本語');
  assert.equal((await page.locator(`${CONTROL} [data-reading-mode-intent="en-mix"]`).textContent()).trim(), 'English Mix');
  assert.equal((await page.locator(`${CONTROL} [data-reading-mode-intent="es-mix"]`).textContent()).trim(), 'Español Mix');
  assert.equal(await page.locator('#readerLanguageInstantDirect').isHidden(), true, 'legacy instant control should remain hidden');
  assert.equal(await page.locator('#readerLanguageSwitch').isHidden(), true, 'legacy language disclosure should remain hidden');

  // Tiny movement inside the 24px hysteresis must keep the Pivot.
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

  // Put the next physical reading paragraph on the Rail. This is a semantic
  // boundary crossing; a fixed pixel delta is not, because paragraph geometry
  // and browser scroll behavior vary by viewport and typography.
  await page.evaluate(() => {
    const pivot = window.MyEssaysReadingPivot?.current?.();
    const rail = window.MyEssaysReadingPivot?.readingRailY?.();
    const blocks = [...document.querySelectorAll('#readerContent > p.reader-locator-block[data-reading-locator]')]
      .filter(block => !block.classList.contains('language-source-hidden'));
    const index = pivot ? blocks.indexOf(pivot) : -1;
    const nextBlock = index >= 0 ? blocks[index + 1] : null;
    if (!nextBlock || !Number.isFinite(rail)) return;
    const rect = nextBlock.getBoundingClientRect();
    const targetPoint = rect.top + (rect.height / 2);
    window.scrollBy({ top: targetPoint - rail, behavior: 'auto' });
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
      markerWidth: after.width,
      markerHeight: after.height,
      markerAnimationName: after.animationName,
      markerPointerEvents: after.pointerEvents
    } : null;
  });
  assert.ok(switchFeedback, 'language switch target should be visible during its 1800ms lifetime');
  assert.match(switchFeedback.animationName, /reader-language-target-surface/);
  assert.match(switchFeedback.animationDuration, /1\.8s/);
  assert.equal(switchFeedback.markerWidth, '3px');
  assert.notEqual(switchFeedback.markerHeight, '24px', 'switch marker should be paragraph-height, not the normal bookmark');
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

  // At the article end the Lens may backfill, but the bookmark stays on the Pivot.
  // After a language switch, Pivot intentionally ignores raw programmatic scrolls
  // until the reader expresses movement intent. Use a real keyboard navigation
  // gesture here so the QA follows the runtime contract instead of bypassing it.
  await page.evaluate(() => document.activeElement instanceof HTMLElement && document.activeElement.blur());
  await page.keyboard.press('End');
  await page.waitForFunction(() =>
    window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2
  );
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
    await waitForReader(page);
    const state = await readingState(page);
    assertRailOwnsPivot(state, `${width}px`);
    assert.ok(state.scrollWidth <= state.innerWidth + 1, `${width}px should not gain horizontal scrolling from the bookmark`);
    assert.equal(state.markerWidth, '3px', `${width}px bookmark should stay 3px wide`);
    assert.equal(state.markerPointerEvents, 'none', `${width}px bookmark must not block text selection`);
  }

  const modesBox = await page.locator(CONTROL).boundingBox();
  const noteBox = await page.locator('#noteTab').boundingBox();
  assert.ok(modesBox && noteBox, 'mobile reading modes and note control should remain visible');
  assert.ok(modesBox.x >= 0 && modesBox.x + modesBox.width <= 320.5, `reading mode shell overflows 320px viewport: ${JSON.stringify(modesBox)}`);
  assert.equal(overlaps(modesBox, noteBox), false, 'reading mode shell must not overlap the note action');

  const jaButton = page.locator(`${CONTROL} [data-reading-mode-intent="ja"]`);
  await jaButton.focus();
  await page.keyboard.press('ArrowRight');
  await page.waitForFunction(() => window.MyEssaysReaderVersions?.currentVersion?.() === 'en-mix');
  assert.equal(await page.locator(`${CONTROL} [data-reading-mode-intent="en-mix"]`).getAttribute('aria-checked'), 'true');

  // Accessibility media queries keep a static cue without relying on animation.
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
