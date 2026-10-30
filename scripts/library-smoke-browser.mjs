import assert from 'node:assert/strict';
import { chromium } from 'playwright';

const base = process.env.BASE_URL || 'http://127.0.0.1:4173';
const browser = await chromium.launch({ headless: true });
const errors = [];

async function testViewport(contextOptions, label) {
  const context = await browser.newContext(contextOptions);
  const page = await context.newPage();
  let markdownRequests = 0;
  const scriptErrors = [];
  page.on('request', request => {
    if (/\/essays\/[^/]+\.md(?:\?|$)/.test(request.url())) markdownRequests++;
  });
  page.on('pageerror', error => scriptErrors.push(error.message));

  await page.goto(base + '/#/', { waitUntil: 'domcontentloaded' });
  await page.waitForFunction(() => document.querySelectorAll('.featured-card').length > 0 && !document.querySelector('#libraryLoadState')?.offsetParent, { timeout: 30000 });
  assert.equal(markdownRequests, 0, label + ': list must not request Markdown');
  const archiveCount = await page.locator('.archive-row').count();
  assert.ok(archiveCount > 0 && archiveCount <= 12, label + ': only first 12 archive articles');
  assert.ok(await page.locator('.featured-read-cue').count() > 0, label + ': read action visible');
  const more = page.locator('[data-load-more]');
  if (await more.count()) {
    await more.click();
    assert.ok(await page.locator('.archive-row').count() > archiveCount, label + ': expand archive');
  }

  // Opening a featured article should fetch just one canonical Markdown.
  await page.locator('.featured-card').first().click();
  await page.waitForFunction(() => Boolean(document.querySelector('#readerView:not([hidden]) .reader-content h1')), { timeout: 30000 });
  assert.equal(markdownRequests, 1, label + ': only one article requested');
  assert.equal(scriptErrors.length, 0, label + ': unexpected JS errors ' + scriptErrors.join(' | '));

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  assert.ok(overflow <= 4, label + ': unexpected horizontal overflow ' + overflow);
  await context.close();
}

try {
  await testViewport({ viewport: { width: 1366, height: 900 } }, 'desktop');
  await testViewport({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 }, 'mobile');
  console.log('Lazy Library browser QA passed: desktop and mobile initial fetch, pagination, article reading.');
} catch (error) {
  errors.push(error);
} finally {
  await browser.close();
}
if (errors.length) throw errors[0];
