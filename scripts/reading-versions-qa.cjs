const { chromium } = require('playwright');
const assert = require('node:assert/strict');

const BASE_URL = process.env.BASE_URL || 'http://127.0.0.1:4173';
const ESSAY_ID = 'confucius-knowing-liking-enjoying';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  const consoleErrors = [];
  const pageErrors = [];
  const failedRequests = [];
  const requestedUrls = [];

  page.on('console', message => {
    if (message.type() === 'error') consoleErrors.push(message.text());
  });
  page.on('pageerror', error => pageErrors.push(String(error)));
  page.on('request', request => requestedUrls.push(request.url()));
  page.on('requestfailed', request => failedRequests.push(`${request.url()} :: ${request.failure()?.errorText || 'failed'}`));

  await page.goto(`${BASE_URL}/#/essay/${ESSAY_ID}`, { waitUntil: 'networkidle' });
  await page.waitForSelector('#readerView:not([hidden])');
  await page.waitForSelector('#readerLanguageSwitch:not([hidden])');

  for (const version of ['ja', 'en-mix', 'es']) {
    await page.waitForSelector(`[data-reader-version="${version}"]`);
  }

  const canonicalKey = `myessays:reading-state:${ESSAY_ID}`;
  await page.evaluate(({ key }) => {
    localStorage.setItem(key, JSON.stringify({ openedAt: '2026-08-29T00:00:00.000Z' }));
  }, { key: canonicalKey });

  const switchTo = async (version) => {
    await page.click(`[data-reader-version="${version}"]`);
    await page.waitForFunction(expected => {
      const button = document.querySelector(`[data-reader-version="${expected}"]`);
      return button?.getAttribute('aria-pressed') === 'true';
    }, version);
  };

  await switchTo('en-mix');
  await switchTo('es');
  await page.waitForFunction(() => document.querySelector('#readerContent')?.textContent?.includes('Saber no basta'));
  assert.ok((await page.locator('#readerContent').innerText()).includes('La pregunta de hoy'));

  const spanishTitle = await page.locator('#readerContent').innerText();
  assert.match(spanishTitle, /Saber no basta/);

  await switchTo('ja');
  await page.waitForFunction(() => document.querySelector('#readerContent')?.textContent?.includes('知っているだけでは、まだ遠い'));

  for (let i = 0; i < 3; i += 1) {
    await switchTo('en-mix');
    await switchTo('es');
    await switchTo('ja');
  }

  const storageKeys = await page.evaluate(() => Object.keys(localStorage));
  assert.ok(storageKeys.includes(canonicalKey));
  assert.equal(storageKeys.some(key => key.includes(`${ESSAY_ID}:en-mix`) || key.includes(`${ESSAY_ID}:es`)), false);

  assert.equal(requestedUrls.some(url => /glossary|mix-index\.json/.test(url)), false, 'legacy glossary/mix index should not be requested');
  assert.deepEqual(pageErrors, []);
  assert.deepEqual(failedRequests, []);
  assert.deepEqual(consoleErrors, []);

  await page.setViewportSize({ width: 320, height: 700 });
  await page.reload({ waitUntil: 'networkidle' });
  await page.waitForSelector('#readerLanguageSwitch:not([hidden])');
  const box = await page.locator('#readerLanguageSwitch').boundingBox();
  assert.ok(box, 'version switch should be visible on mobile');
  assert.ok(box.x >= 0 && box.x + box.width <= 320.5, `version switch overflows mobile viewport: ${JSON.stringify(box)}`);

  await browser.close();
  console.log('Reading versions QA passed');
})().catch(error => {
  console.error(error);
  process.exit(1);
});
