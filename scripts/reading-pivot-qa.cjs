// Production-wired Reading Pivot acceptance test.
const { chromium } = require('playwright');
const assert = require('node:assert/strict');

const BASE_URL = process.env.BASE_URL || 'http://127.0.0.1:4173';
const ESSAY_ID = 'confucius-knowing-liking-enjoying';
const CONTROL = '#readerLanguageInstantDirect';
const MIN_VISIBLE_PX = 20;

function overlaps(a, b) {
  if (!a || !b) return false;
  return !(a.x + a.width <= b.x || b.x + b.width <= a.x || a.y + a.height <= b.y || b.y + b.height <= a.y);
}

async function pivotState(page) {
  return page.evaluate(() => {
    const pivot = window.MyEssaysReadingPivot?.current?.()
      || document.querySelector('#readerContent > p.reader-locator-block.is-reading-pivot[data-reading-locator]');
    if (!pivot) return null;
    const locator = window.MyEssaysReadingPivot?.locator?.() || pivot.dataset.readingLocator || '';
    return {
      locator,
      physicalLocator: pivot.dataset.readingLocator || '',
      top: window.MyEssaysReadingLocators?.semanticTop?.(locator, pivot) ?? pivot.getBoundingClientRect().top,
      physicalTop: pivot.getBoundingClientRect().top,
      text: (pivot.textContent || '').trim().slice(0, 80),
      backgroundColor: getComputedStyle(pivot).backgroundColor,
      boxShadow: getComputedStyle(pivot).boxShadow
    };
  });
}

async function expectedPivotLocator(page) {
  return page.evaluate(minVisiblePx => {
    const header = document.querySelector('.reader-v2-header');
    const headerBottom = header?.getBoundingClientRect().height ? Math.max(0, header.getBoundingClientRect().bottom) : 0;
    const topEdge = headerBottom + 8;
    const bottomEdge = Math.max(topEdge + 1, window.innerHeight - 18);
    const paragraphs = [...document.querySelectorAll('#readerContent > p.reader-locator-block[data-reading-locator]')]
      .filter(block => !block.classList.contains('language-source-hidden'));

    const visible = paragraphs.map(block => {
      const rect = block.getBoundingClientRect();
      const visibleTop = Math.max(rect.top, topEdge);
      const visibleBottom = Math.min(rect.bottom, bottomEdge);
      const visiblePx = Math.max(0, visibleBottom - visibleTop);
      return { block, top: rect.top, visiblePx, height: rect.height };
    }).filter(item => item.visiblePx >= Math.min(minVisiblePx, Math.max(1, item.height)))
      .sort((a, b) => a.top - b.top);

    if (visible.length >= 2) return visible[1].block.dataset.readingLocator || '';
    if (visible.length === 1) return visible[0].block.dataset.readingLocator || '';

    const bandHeight = Math.max(1, bottomEdge - topEdge);
    const rail = Math.min(bottomEdge, topEdge + Math.min(142, Math.max(76, bandHeight * .16)));
    const nearest = paragraphs.reduce((best, block) => {
      const rect = block.getBoundingClientRect();
      const point = Math.min(rect.bottom, Math.max(rect.top, rail));
      const distance = Math.abs(rail - point);
      return !best || distance < best.distance ? { block, distance } : best;
    }, null)?.block;
    return nearest?.dataset.readingLocator || '';
  }, MIN_VISIBLE_PX);
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

  const initialExpected = await expectedPivotLocator(page);
  const initial = await pivotState(page);
  assert.ok(initialExpected, 'an expected paragraph Pivot should be derivable on initial render');
  assert.equal(initial?.physicalLocator, initialExpected, 'initial Pivot should be the actual second sufficiently visible paragraph when available');
  assert.notEqual(initial?.backgroundColor, 'rgba(0, 0, 0, 0)', 'Pivot should have a faint background highlight');
  assert.equal(initial?.boxShadow, 'none', 'Pivot highlight should not use a line/glow/shadow');

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

  await page.evaluate(() => {
    const max = Math.max(0, document.documentElement.scrollHeight - innerHeight);
    scrollTo({ top: max * 0.34, behavior: 'instant' });
  });
  await page.waitForFunction(() => scrollY > 500);
  await page.waitForTimeout(80);

  const readingExpected = await expectedPivotLocator(page);
  const readingPivot = await pivotState(page);
  assert.ok(readingExpected, 'a visible paragraph should be selected after scrolling');
  assert.equal(readingPivot?.physicalLocator, readingExpected, 'Reading Pivot should settle on the second sufficiently visible paragraph');

  const beforeSwitch = await pivotState(page);
  assert.ok(beforeSwitch?.locator, 'a logical Reading Pivot locator should exist before language switching');

  await switchTo(page, 'en-mix');
  const english = await pivotState(page);
  assert.equal(english?.locator, beforeSwitch.locator, 'JA → EN must preserve the exact logical Pivot locator');
  assert.ok(Math.abs(english.top - beforeSwitch.top) <= 3, `JA → EN semantic Pivot top drifted by ${english.top - beforeSwitch.top}px`);

  await switchTo(page, 'es-mix');
  const spanish = await pivotState(page);
  assert.equal(spanish?.locator, beforeSwitch.locator, 'EN → ES must preserve the exact logical Pivot locator');
  assert.ok(Math.abs(spanish.top - beforeSwitch.top) <= 3, `EN → ES semantic Pivot top drifted by ${spanish.top - beforeSwitch.top}px`);

  await switchTo(page, 'ja');
  const returned = await pivotState(page);
  assert.equal(returned?.locator, beforeSwitch.locator, 'ES → JA must preserve the exact logical Pivot locator');
  assert.ok(Math.abs(returned.top - beforeSwitch.top) <= 3, `round-trip semantic Pivot top drifted by ${returned.top - beforeSwitch.top}px`);

  for (let i = 0; i < 2; i += 1) {
    await switchTo(page, 'en-mix');
    await switchTo(page, 'es-mix');
    await switchTo(page, 'ja');
  }
  const afterCycles = await pivotState(page);
  assert.equal(afterCycles?.locator, beforeSwitch.locator, 'repeated direct language switches must not drift to another semantic paragraph');
  assert.ok(Math.abs(afterCycles.top - beforeSwitch.top) <= 3, `repeated switches drifted semantic Pivot top by ${afterCycles.top - beforeSwitch.top}px`);

  await page.setViewportSize({ width: 390, height: 844 });
  await page.reload({ waitUntil: 'networkidle' });
  await page.waitForSelector(CONTROL);
  await page.waitForSelector('#readerContent > p.reader-locator-block.is-reading-pivot');
  await page.waitForTimeout(120);

  const mobileExpected = await expectedPivotLocator(page);
  const mobilePivot = await pivotState(page);
  assert.equal(mobilePivot?.physicalLocator, mobileExpected, 'mobile should use the same second-visible-paragraph Pivot rule');

  const directBox = await page.locator(CONTROL).boundingBox();
  const noteBox = await page.locator('#noteTab').boundingBox();
  assert.ok(directBox && noteBox, 'mobile direct language choices and note control should remain visible');
  assert.ok(directBox.x >= 0 && directBox.x + directBox.width <= 390.5, `direct language control overflows mobile viewport: ${JSON.stringify(directBox)}`);
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
  assert.ok(mobileCompareBox.x >= 0 && mobileCompareBox.x + mobileCompareBox.width <= 390.5, `mobile Reader Map Compare overflows viewport: ${JSON.stringify(mobileCompareBox)}`);
  await page.locator('.reader-mobile-compare').click();
  await page.waitForSelector('.reader-compare-view');
  await page.waitForFunction(() => !document.querySelector('#readerAside')?.classList.contains('is-open'));
  await page.keyboard.press('Escape');
  await page.waitForFunction(() => !document.querySelector('.reader-compare-view'));

  assert.deepEqual(pageErrors, [], `browser page errors: ${pageErrors.join(' | ')}`);
  assert.deepEqual(consoleErrors, [], `browser console errors: ${consoleErrors.join(' | ')}`);

  await browser.close();
  console.log('Reading Pivot QA passed');
})().catch(error => {
  console.error(error);
  process.exit(1);
});