const { chromium } = require('playwright');
const assert = require('node:assert/strict');

const BASE_URL = process.env.BASE_URL || 'http://127.0.0.1:4173';
const ESSAY_ID = 'confucius-knowing-liking-enjoying';

function overlaps(a, b) {
  if (!a || !b) return false;
  return !(a.x + a.width <= b.x || b.x + b.width <= a.x || a.y + a.height <= b.y || b.y + b.height <= a.y);
}

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

  await page.evaluate(() => window.scrollTo({ top: Math.max(500, document.documentElement.scrollHeight * 0.42), behavior: 'auto' }));
  const scrollBeforeSwitch = await page.evaluate(() => window.scrollY);
  assert.ok(scrollBeforeSwitch > 300, `expected a meaningful reading position before switch, got ${scrollBeforeSwitch}`);

  await switchTo('en-mix');
  const scrollAfterEnglishMix = await page.evaluate(() => window.scrollY);
  assert.ok(scrollAfterEnglishMix > 200, `English Mix switch reset reading position: ${scrollAfterEnglishMix}`);

  await switchTo('es');
  await page.waitForFunction(() => document.querySelector('#readerContent')?.textContent?.includes('Saber no basta'));
  const scrollAfterSpanish = await page.evaluate(() => window.scrollY);
  assert.ok(scrollAfterSpanish > 200, `Spanish switch reset reading position: ${scrollAfterSpanish}`);
  assert.ok((await page.locator('#readerContent').innerText()).includes('La pregunta de hoy'));

  const spanishTitle = await page.locator('#readerContent').innerText();
  assert.match(spanishTitle, /Saber no basta/);

  await switchTo('ja');
  await page.waitForFunction(() => document.querySelector('#readerContent')?.textContent?.includes('知っているだけでは、まだ遠い'));
  assert.ok((await page.evaluate(() => window.scrollY)) > 200, 'returning to Japanese should preserve a meaningful reading position');

  for (let i = 0; i < 3; i += 1) {
    await switchTo('en-mix');
    await switchTo('es');
    await switchTo('ja');
  }

  const storageKeys = await page.evaluate(() => Object.keys(localStorage));
  assert.ok(storageKeys.includes(canonicalKey));
  assert.equal(storageKeys.some(key => key.includes(`${ESSAY_ID}:en-mix`) || key.includes(`${ESSAY_ID}:es`)), false);

  const legacyRequests = requestedUrls.filter(url => /\/data\/mix-index\.json(?:[?#]|$)|\/data\/glossar(?:y|ies)(?:[/?#]|$)|\/glossary-tools\.(?:js|css)(?:[?#]|$)/.test(url));
  assert.deepEqual(legacyRequests, [], `legacy resources should not be requested: ${legacyRequests.join(', ')}`);
  assert.deepEqual(pageErrors, []);
  assert.deepEqual(failedRequests, []);
  assert.deepEqual(consoleErrors, []);

  await page.setViewportSize({ width: 320, height: 700 });
  await page.reload({ waitUntil: 'networkidle' });
  await page.waitForSelector('#readerLanguageSwitch:not([hidden])');
  const switchBox = await page.locator('#readerLanguageSwitch').boundingBox();
  assert.ok(switchBox, 'version switch should be visible on mobile');
  assert.ok(switchBox.x >= 0 && switchBox.x + switchBox.width <= 320.5, `version switch overflows mobile viewport: ${JSON.stringify(switchBox)}`);

  const noteBox = await page.locator('#noteTab').boundingBox();
  assert.ok(noteBox, 'note tab should remain visible on mobile');
  assert.equal(overlaps(switchBox, noteBox), false, `version switch overlaps note tab: switch=${JSON.stringify(switchBox)} note=${JSON.stringify(noteBox)}`);

  const tocSafety = await page.evaluate(async () => {
    window.__myessaysTocProbe = 0;
    showReader({
      id: 'toc-security-probe',
      title: 'TOC safety probe',
      type: 'Essay',
      created: '2026-08-29',
      updated: '2026-08-29',
      favorite: 0,
      grow: 0,
      tags: [],
      metrics: { charCount: 1, minutes: 1 },
      body: '## &lt;img src=x onerror="window.__myessaysTocProbe=1"&gt;'
    });
    await new Promise(resolve => setTimeout(resolve, 80));
    const nav = document.querySelector('#readerAside nav');
    return {
      executed: window.__myessaysTocProbe,
      imageCount: nav?.querySelectorAll('img').length || 0,
      text: nav?.textContent || ''
    };
  });
  assert.equal(tocSafety.executed, 0, 'reader TOC must not execute markup reconstructed from heading text');
  assert.equal(tocSafety.imageCount, 0, 'reader TOC must keep heading markup as text');
  assert.match(tocSafety.text, /<img src=x onerror=/, 'reader TOC should preserve the literal heading text');

  await browser.close();
  console.log('Reading versions QA passed');
})().catch(error => {
  console.error(error);
  process.exit(1);
});
