const { chromium } = require('playwright');
const assert = require('node:assert/strict');

const BASE_URL = process.env.BASE_URL || 'http://127.0.0.1:4173';
const ESSAY_ID = 'confucius-knowing-liking-enjoying';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    reducedMotion: 'reduce'
  });
  const page = await context.newPage();

  await page.goto(`${BASE_URL}/#/`, { waitUntil: 'networkidle' });
  await page.waitForSelector('#libraryView:not([hidden])');
  await page.waitForSelector(`#essayGrid [data-id="${ESSAY_ID}"]`);

  const sourceCard = page.locator(`#essayGrid [data-id="${ESSAY_ID}"]`);
  await sourceCard.scrollIntoViewIfNeeded();
  await page.waitForTimeout(50);

  const libraryScrollY = await page.evaluate(() => window.scrollY);
  assert.ok(libraryScrollY > 100, `library should be meaningfully scrolled before opening the essay, got ${libraryScrollY}`);

  await sourceCard.click();
  await page.waitForSelector('#readerView:not([hidden])');
  await page.waitForSelector('.reader-v2-header');
  await page.waitForSelector('.reader-v2-page-top');
  await page.waitForSelector('.reader-end-navigation .reader-top-link');

  const backBox = await page.locator('#backButton').boundingBox();
  assert.ok(backBox, 'Library back control should be visible in the Reader header');
  assert.ok(backBox.height >= 43.5, `Library back control should be at least 44px high, got ${backBox.height}`);

  assert.equal(await page.locator('.reader-v2-page-top').isHidden(), true, 'article top control should stay hidden near the top');

  const endLabel = (await page.locator('.reader-end-navigation .reader-top-link').textContent() || '').trim();
  assert.equal(endLabel, '← Libraryへ戻る', 'end navigation should describe a Library return, not a page-top action');

  const maxScroll = await page.evaluate(() => Math.max(0, document.documentElement.scrollHeight - innerHeight));
  assert.ok(maxScroll > 650, `sample essay should be long enough to test page-top navigation, got maxScroll ${maxScroll}`);

  await page.evaluate(() => window.scrollTo({ top: 900, behavior: 'instant' }));
  await page.waitForFunction(() => window.scrollY > 650);
  await page.waitForFunction(() => {
    const button = document.querySelector('.reader-v2-page-top');
    return button && !button.hidden && getComputedStyle(button).display !== 'none';
  });

  const topBox = await page.locator('.reader-v2-page-top').boundingBox();
  assert.ok(topBox, 'article top control should be visible after scrolling');
  assert.ok(topBox.width >= 43.5 && topBox.height >= 43.5,
    `article top control should meet a 44px target, got ${JSON.stringify(topBox)}`);

  await page.locator('.reader-v2-page-top').click();
  await page.waitForFunction(() => window.scrollY <= 8);
  assert.equal(await page.locator('.reader-v2-page-top').isHidden(), true, 'article top control should hide again after returning to the top');

  await page.locator('#backButton').click();
  await page.waitForSelector('#libraryView:not([hidden])');
  await page.waitForFunction(expected => Math.abs(window.scrollY - expected) <= 24, libraryScrollY);

  const restoredY = await page.evaluate(() => window.scrollY);
  assert.ok(Math.abs(restoredY - libraryScrollY) <= 24,
    `Library scroll context should be restored: expected ${libraryScrollY}, got ${restoredY}`);

  const focusedEssayId = await page.evaluate(() => document.activeElement?.dataset?.id || '');
  assert.equal(focusedEssayId, ESSAY_ID, 'focus should return to the essay card that opened the Reader');

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${BASE_URL}/#/essay/${ESSAY_ID}`, { waitUntil: 'networkidle' });
  await page.waitForSelector('#readerView:not([hidden])');
  await page.waitForSelector('.reader-v2-page-top');
  await page.evaluate(() => window.scrollTo({ top: 900, behavior: 'instant' }));
  await page.waitForTimeout(100);
  assert.equal(await page.locator('.reader-v2-page-top').isHidden(), true, 'article top control should remain hidden on mobile');

  await context.close();
  await browser.close();
  console.log('Reader return navigation QA passed');
})().catch(error => {
  console.error(error);
  process.exit(1);
});
