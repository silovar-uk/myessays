// Production-wired Reading Pivot acceptance test.
const { chromium } = require('playwright');
const assert = require('node:assert/strict');

const BASE_URL = process.env.BASE_URL || 'http://127.0.0.1:4173';
const ESSAY_ID = 'confucius-knowing-liking-enjoying';
const VISIBLE_RATIO = 0.35;

function overlaps(a, b) {
  if (!a || !b) return false;
  return !(a.x + a.width <= b.x || b.x + b.width <= a.x || a.y + a.height <= b.y || b.y + b.height <= a.y);
}

async function pivotState(page) {
  return page.evaluate(() => {
    const pivot = document.querySelector('#readerContent > p.reader-locator-block.is-reading-pivot[data-reading-locator]');
    return pivot ? {
      locator: pivot.dataset.readingLocator || '',
      top: pivot.getBoundingClientRect().top,
      text: (pivot.textContent || '').trim().slice(0, 80),
      backgroundColor: getComputedStyle(pivot).backgroundColor,
      boxShadow: getComputedStyle(pivot).boxShadow
    } : null;
  });
}

async function expectedPivotLocator(page) {
  return page.evaluate(visibleRatio => {
    const header = document.querySelector('.reader-v2-header');
    const headerBottom = header?.getBoundingClientRect().height ? Math.max(0, header.getBoundingClientRect().bottom) : 0;
    const topEdge = headerBottom + 8;
    const bottomEdge = Math.max(topEdge + 1, window.innerHeight - 18);
    const bandHeight = Math.max(1, bottomEdge - topEdge);
    const paragraphs = [...document.querySelectorAll('#readerContent > p.reader-locator-block[data-reading-locator]')]
      .filter(block => !block.classList.contains('language-source-hidden'));

    const visible = paragraphs.map(block => {
      const rect = block.getBoundingClientRect();
      const visibleTop = Math.max(rect.top, topEdge);
      const visibleBottom = Math.min(rect.bottom, bottomEdge);
      const visiblePx = Math.max(0, visibleBottom - visibleTop);
      const comparableHeight = Math.max(1, Math.min(Math.max(1, rect.height), bandHeight));
      return { block, top: rect.top, ratio: Math.min(1, visiblePx / comparableHeight), visiblePx };
    }).filter(item => item.visiblePx > 0 && item.ratio >= visibleRatio).sort((a, b) => a.top - b.top);

    if (visible.length >= 2) return visible[1].block.dataset.readingLocator || '';
    if (visible.length === 1) return visible[0].block.dataset.readingLocator || '';

    const rail = Math.min(bottomEdge, topEdge + Math.min(142, Math.max(76, bandHeight * .16)));
    const nearest = paragraphs.reduce((best, block) => {
      const rect = block.getBoundingClientRect();
      const point = Math.min(rect.bottom, Math.max(rect.top, rail));
      const distance = Math.abs(rail - point);
      return !best || distance < best.distance ? { block, distance } : best;
    }, null)?.block;
    return nearest?.dataset.readingLocator || '';
  }, VISIBLE_RATIO);
}

async function switchTo(page, expected) {
  const button = page.locator(`.reader-language-direct-option[data-reader-version="${expected}"]`);
  await button.click();
  await page.waitForFunction(version => {
    const button = document.querySelector(`.reader-language-direct-option[data-reader-version="${version}"]`);
    return window.MyEssaysReaderVersions?.currentVersion?.() === version
      && button?.getAttribute('aria-checked') === 'true';
  }, expected);
  await page.waitForTimeout(700);
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
  await page.waitForSelector('.reader-language-direct');
  await page.waitForSelector('#readerContent > p.reader-locator-block[data-reading-locator]');
  await page.waitForSelector('#readerContent > p.reader-locator-block.is-reading-pivot');
  await page.waitForTimeout(180);

  const initialExpected = await expectedPivotLocator(page);
  const initial = await pivotState(page);
  assert.ok(initialExpected, 'an expected paragraph Pivot should be derivable on initial render');
  assert.equal(initial?.locator, initialExpected, 'initial Pivot should be the second sufficiently visible paragraph when available');
  assert.notEqual(initial?.backgroundColor, 'rgba(0, 0, 0, 0)', 'Pivot should have a faint background highlight');
  assert.equal(initial?.boxShadow, 'none', 'Pivot highlight should not use a line/glow/shadow');

  const directButtons = page.locator('.reader-language-direct-option');
  assert.equal(await directButtons.count(), 3, 'JA / EN / ES should all be visible as direct choices for the sample article');
  assert.equal(await page.locator('.reader-language-direct').getAttribute('role'), 'radiogroup');
  assert.equal(await page.locator('.reader-language-direct-option[data-reader-version="ja"]').getAttribute('aria-checked'), 'true');
  assert.equal(await page.locator('.reader-language-direct-option[data-reader-version="en-mix"]').textContent(), 'EN');
  assert.equal(await page.locator('.reader-language-direct-option[data-reader-version="es-mix"]').textContent(), 'ES');
  assert.ok(await page.locator('[data-reader-mode-compare]').isVisible(), 'Compare should remain a separate secondary action on desktop');
  assert.equal(await page.locator('#readerLanguageSwitch').isHidden(), true, 'legacy language disclosure should remain hidden');

  const scrollDelta = await page.evaluate(() => {
    const blocks = [...document.querySelectorAll('#readerContent > p.reader-locator-block[data-reading-locator]')];
    const target = blocks[Math.min(4, blocks.length - 1)];
    const targetY = Math.max(0, target.getBoundingClientRect().top + window.scrollY - 300);
    return Math.max(450, targetY - window.scrollY);
  });
  await page.mouse.move(640, 400);
  await page.mouse.wheel(0, scrollDelta);
  await page.waitForTimeout(420);

  const readingExpected = await expectedPivotLocator(page);
  const readingPivot = await pivotState(page);
  assert.ok(readingExpected, 'a visible paragraph should be selected after scrolling');
  assert.equal(readingPivot?.locator, readingExpected, 'Reading Pivot should settle on the second sufficiently visible paragraph');

  const beforeSwitch = await pivotState(page);
  assert.ok(beforeSwitch?.locator, 'a Reading Pivot locator should exist before language switching');

  await switchTo(page, 'en-mix');
  const english = await pivotState(page);
  assert.equal(english?.locator, beforeSwitch.locator, 'JA → EN must preserve the exact Pivot locator');
  assert.ok(Math.abs(english.top - beforeSwitch.top) <= 3, `JA → EN Pivot top drifted by ${english.top - beforeSwitch.top}px`);

  await switchTo(page, 'es-mix');
  const spanish = await pivotState(page);
  assert.equal(spanish?.locator, beforeSwitch.locator, 'EN → ES must preserve the exact Pivot locator');
  assert.ok(Math.abs(spanish.top - beforeSwitch.top) <= 3, `EN → ES Pivot top drifted by ${spanish.top - beforeSwitch.top}px`);

  await switchTo(page, 'ja');
  const returned = await pivotState(page);
  assert.equal(returned?.locator, beforeSwitch.locator, 'ES → JA must preserve the exact Pivot locator');
  assert.ok(Math.abs(returned.top - beforeSwitch.top) <= 3, `round-trip Pivot top drifted by ${returned.top - beforeSwitch.top}px`);

  for (let i = 0; i < 2; i += 1) {
    await switchTo(page, 'en-mix');
    await switchTo(page, 'es-mix');
    await switchTo(page, 'ja');
  }
  const afterCycles = await pivotState(page);
  assert.equal(afterCycles?.locator, beforeSwitch.locator, 'repeated direct language switches must not drift to another semantic paragraph');
  assert.ok(Math.abs(afterCycles.top - beforeSwitch.top) <= 3, `repeated switches drifted Pivot top by ${afterCycles.top - beforeSwitch.top}px`);

  await page.setViewportSize({ width: 390, height: 844 });
  await page.reload({ waitUntil: 'networkidle' });
  await page.waitForSelector('.reader-language-direct');
  await page.waitForSelector('#readerContent > p.reader-locator-block.is-reading-pivot');
  await page.waitForTimeout(180);

  const mobileExpected = await expectedPivotLocator(page);
  const mobilePivot = await pivotState(page);
  assert.equal(mobilePivot?.locator, mobileExpected, 'mobile should use the same second-visible-paragraph Pivot rule');

  const directBox = await page.locator('.reader-language-direct').boundingBox();
  const noteBox = await page.locator('#noteTab').boundingBox();
  assert.ok(directBox && noteBox, 'mobile direct language choices and note control should remain visible');
  assert.ok(directBox.x >= 0 && directBox.x + directBox.width <= 390.5, `direct language control overflows mobile viewport: ${JSON.stringify(directBox)}`);
  assert.equal(overlaps(directBox, noteBox), false, 'direct language control must not overlap the note action');
  assert.equal(await page.locator('[data-reader-mode-compare]').isHidden(), true, 'desktop Compare action should leave the mobile Reader Header');

  // Keyboard radio semantics: ArrowRight moves focus and performs the switch.
  const jaButton = page.locator('.reader-language-direct-option[data-reader-version="ja"]');
  await jaButton.focus();
  await page.keyboard.press('ArrowRight');
  await page.waitForFunction(() => window.MyEssaysReaderVersions?.currentVersion?.() === 'en-mix');
  assert.equal(await page.locator('.reader-language-direct-option[data-reader-version="en-mix"]').getAttribute('aria-checked'), 'true');

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