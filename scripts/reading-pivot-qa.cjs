// Production-wired Reading Pivot acceptance test.
const { chromium } = require('playwright');
const assert = require('node:assert/strict');

const BASE_URL = process.env.BASE_URL || 'http://127.0.0.1:4173';
const ESSAY_ID = 'confucius-knowing-liking-enjoying';

function overlaps(a, b) {
  if (!a || !b) return false;
  return !(a.x + a.width <= b.x || b.x + b.width <= a.x || a.y + a.height <= b.y || b.y + b.height <= a.y);
}

async function pivotState(page) {
  return page.evaluate(() => {
    const pivot = document.querySelector('#readerContent > .reader-locator-block.is-reading-pivot[data-reading-locator]');
    return pivot ? {
      locator: pivot.dataset.readingLocator || '',
      top: pivot.getBoundingClientRect().top,
      text: (pivot.textContent || '').trim().slice(0, 80)
    } : null;
  });
}

async function cycleTo(page, expected) {
  const button = page.locator('.reader-language-cycle');
  await button.click();
  await page.waitForFunction(version => {
    const button = document.querySelector('.reader-language-cycle');
    return window.MyEssaysReaderVersions?.currentVersion?.() === version
      && button?.dataset.currentVersion === version;
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
  await page.waitForSelector('.reader-language-cycle');
  await page.waitForSelector('#readerContent > .reader-locator-block[data-reading-locator]');
  await page.waitForSelector('#readerContent > .reader-locator-block.is-reading-pivot');

  const initial = await page.evaluate(() => {
    const blocks = [...document.querySelectorAll('#readerContent > .reader-locator-block[data-reading-locator]')];
    const pivot = document.querySelector('#readerContent > .reader-locator-block.is-reading-pivot');
    return {
      count: blocks.length,
      firstLocator: blocks[0]?.dataset.readingLocator || '',
      pivotLocator: pivot?.dataset.readingLocator || ''
    };
  });
  assert.ok(initial.count >= 6, `expected enough reading blocks for pivot QA, got ${initial.count}`);
  assert.equal(initial.pivotLocator, initial.firstLocator, 'the first readable block should be the initial Reading Pivot');

  assert.equal(await page.locator('.reader-language-cycle').getAttribute('data-current-version'), 'ja');
  assert.equal(await page.locator('.reader-language-cycle').getAttribute('data-next-version'), 'en-mix');
  assert.ok(await page.locator('[data-reader-mode-compare]').isVisible(), 'Compare should remain a separate secondary action');
  assert.equal(await page.locator('#readerLanguageSwitch').isHidden(), true, 'legacy language disclosure should remain hidden');

  await page.evaluate(() => {
    const blocks = [...document.querySelectorAll('#readerContent > .reader-locator-block[data-reading-locator]')];
    const target = blocks[Math.min(4, blocks.length - 1)];
    const pageTop = target.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: Math.max(0, pageTop - 300), behavior: 'auto' });
  });
  await page.waitForTimeout(320);

  const readingOrder = await page.evaluate(() => {
    const header = document.querySelector('.reader-v2-header');
    const headerBottom = header?.getBoundingClientRect().height ? Math.max(0, header.getBoundingClientRect().bottom) : 0;
    const blocks = [...document.querySelectorAll('#readerContent > .reader-locator-block[data-reading-locator]')];
    const visible = blocks.map(block => {
      const rect = block.getBoundingClientRect();
      const visibleTop = Math.max(rect.top, headerBottom + 8);
      const visibleBottom = Math.min(rect.bottom, window.innerHeight - 18);
      const visiblePx = Math.max(0, visibleBottom - visibleTop);
      return { block, top: rect.top, ratio: visiblePx / Math.max(1, rect.height), visiblePx };
    }).filter(item => item.visiblePx > 0 && item.ratio >= .28).sort((a, b) => a.top - b.top);
    const pivot = document.querySelector('#readerContent > .reader-locator-block.is-reading-pivot');
    return {
      visibleCount: visible.length,
      expected: (visible[1] || visible[0])?.block?.dataset.readingLocator || '',
      pivot: pivot?.dataset.readingLocator || ''
    };
  });
  assert.ok(readingOrder.visibleCount >= 2, `expected at least two sufficiently visible blocks, got ${readingOrder.visibleCount}`);
  assert.equal(readingOrder.pivot, readingOrder.expected, 'Reading Pivot should settle on the second sufficiently visible block');

  const beforeSwitch = await pivotState(page);
  assert.ok(beforeSwitch?.locator, 'a Reading Pivot locator should exist before language switching');

  await cycleTo(page, 'en-mix');
  const english = await pivotState(page);
  assert.equal(english?.locator, beforeSwitch.locator, 'JA → EN must preserve the exact Pivot locator');
  assert.ok(Math.abs(english.top - beforeSwitch.top) <= 3, `JA → EN Pivot top drifted by ${english.top - beforeSwitch.top}px`);
  assert.equal(await page.locator('.reader-language-cycle').getAttribute('data-next-version'), 'es-mix');

  await cycleTo(page, 'es-mix');
  const spanish = await pivotState(page);
  assert.equal(spanish?.locator, beforeSwitch.locator, 'EN → ES must preserve the exact Pivot locator');
  assert.ok(Math.abs(spanish.top - beforeSwitch.top) <= 3, `EN → ES Pivot top drifted by ${spanish.top - beforeSwitch.top}px`);
  assert.equal(await page.locator('.reader-language-cycle').getAttribute('data-next-version'), 'ja');

  await cycleTo(page, 'ja');
  const returned = await pivotState(page);
  assert.equal(returned?.locator, beforeSwitch.locator, 'ES → JA must preserve the exact Pivot locator');
  assert.ok(Math.abs(returned.top - beforeSwitch.top) <= 3, `round-trip Pivot top drifted by ${returned.top - beforeSwitch.top}px`);

  for (let i = 0; i < 2; i += 1) {
    await cycleTo(page, 'en-mix');
    await cycleTo(page, 'es-mix');
    await cycleTo(page, 'ja');
  }
  const afterCycles = await pivotState(page);
  assert.equal(afterCycles?.locator, beforeSwitch.locator, 'repeated language cycles must not drift to another semantic block');
  assert.ok(Math.abs(afterCycles.top - beforeSwitch.top) <= 3, `repeated cycles drifted Pivot top by ${afterCycles.top - beforeSwitch.top}px`);

  await page.setViewportSize({ width: 390, height: 844 });
  await page.reload({ waitUntil: 'networkidle' });
  await page.waitForSelector('.reader-language-cycle');
  await page.waitForSelector('#readerContent > .reader-locator-block.is-reading-pivot');

  const cycleBox = await page.locator('.reader-language-cycle').boundingBox();
  const compareBox = await page.locator('[data-reader-mode-compare]').boundingBox();
  const noteBox = await page.locator('#noteTab').boundingBox();
  assert.ok(cycleBox && compareBox && noteBox, 'mobile language, compare, and note controls should all remain visible');
  assert.ok(cycleBox.x >= 0 && cycleBox.x + cycleBox.width <= 390.5, `language cycle overflows mobile viewport: ${JSON.stringify(cycleBox)}`);
  assert.equal(overlaps(cycleBox, noteBox), false, 'language cycle must not overlap the note action');
  assert.equal(overlaps(compareBox, noteBox), false, 'Compare must not overlap the note action');

  const mobileInitial = await page.evaluate(() => {
    const first = document.querySelector('#readerContent > .reader-locator-block[data-reading-locator]');
    const pivot = document.querySelector('#readerContent > .reader-locator-block.is-reading-pivot');
    return [first?.dataset.readingLocator || '', pivot?.dataset.readingLocator || ''];
  });
  assert.equal(mobileInitial[1], mobileInitial[0], 'mobile should also begin with the first readable block as Pivot');

  assert.deepEqual(pageErrors, [], `browser page errors: ${pageErrors.join(' | ')}`);
  assert.deepEqual(consoleErrors, [], `browser console errors: ${consoleErrors.join(' | ')}`);

  await browser.close();
  console.log('Reading Pivot QA passed');
})().catch(error => {
  console.error(error);
  process.exit(1);
});