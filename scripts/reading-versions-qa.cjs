const { chromium } = require('playwright');
const assert = require('node:assert/strict');

const BASE_URL = process.env.BASE_URL || 'http://127.0.0.1:4173';
const ESSAY_ID = 'confucius-knowing-liking-enjoying';
const VERSION_BADGES = {
  ja: 'JA',
  'en-mix': 'EN MIX',
  'es-mix': 'ES MIX'
};

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

  const trigger = page.locator('.reader-language-trigger');
  const menu = page.locator('#readerLanguageMenu');
  const current = page.locator('.reader-language-current');

  assert.equal(await trigger.getAttribute('aria-expanded'), 'false');
  assert.equal(await menu.isHidden(), true, 'language menu should start collapsed');
  assert.equal((await current.innerText()).trim(), 'JA');

  await trigger.click();
  assert.equal(await trigger.getAttribute('aria-expanded'), 'true');
  await page.waitForSelector('#readerLanguageMenu:not([hidden])');
  for (const version of ['ja', 'en-mix', 'es-mix']) {
    await page.waitForSelector(`[data-reader-version="${version}"]`);
  }

  await page.keyboard.press('Escape');
  await page.waitForFunction(() => document.querySelector('.reader-language-trigger')?.getAttribute('aria-expanded') === 'false');
  assert.equal(await menu.isHidden(), true, 'Escape should close language menu');

  await trigger.click();
  await page.waitForSelector('#readerLanguageMenu:not([hidden])');
  await page.locator('#readerContent h1').click();
  await page.waitForFunction(() => document.querySelector('.reader-language-trigger')?.getAttribute('aria-expanded') === 'false');
  assert.equal(await menu.isHidden(), true, 'outside click should close language menu');

  const canonicalKey = `myessays:reading-state:${ESSAY_ID}`;
  await page.evaluate(({ key }) => {
    localStorage.setItem(key, JSON.stringify({ openedAt: '2026-08-30T00:00:00.000Z' }));
  }, { key: canonicalKey });

  const switchTo = async version => {
    const expectedBadge = VERSION_BADGES[version];
    assert.ok(expectedBadge, `unknown version ${version}`);

    if (await menu.isHidden()) await trigger.click();
    await page.waitForSelector('#readerLanguageMenu:not([hidden])');
    await page.click(`[data-reader-version="${version}"]`);
    await page.waitForFunction(({ expectedVersion, badge }) => {
      const option = document.querySelector(`[data-reader-version="${expectedVersion}"]`);
      const currentBadge = document.querySelector('.reader-language-current')?.textContent?.trim();
      const expanded = document.querySelector('.reader-language-trigger')?.getAttribute('aria-expanded');
      return option?.getAttribute('aria-checked') === 'true' && currentBadge === badge && expanded === 'false';
    }, { expectedVersion: version, badge: expectedBadge });
  };

  await page.evaluate(() => window.scrollTo({ top: Math.max(500, document.documentElement.scrollHeight * 0.42), behavior: 'auto' }));
  const scrollBeforeSwitch = await page.evaluate(() => window.scrollY);
  assert.ok(scrollBeforeSwitch > 300, `expected a meaningful reading position before switch, got ${scrollBeforeSwitch}`);

  await switchTo('en-mix');
  const scrollAfterEnglishMix = await page.evaluate(() => window.scrollY);
  assert.ok(scrollAfterEnglishMix > 200, `English Mix switch reset reading position: ${scrollAfterEnglishMix}`);

  await switchTo('es-mix');
  await page.waitForFunction(() => document.querySelector('#readerContent')?.textContent?.includes('Sabemos que es importante'));
  const scrollAfterSpanishMix = await page.evaluate(() => window.scrollY);
  assert.ok(scrollAfterSpanishMix > 200, `Español Mix switch reset reading position: ${scrollAfterSpanishMix}`);
  const spanishMixText = await page.locator('#readerContent').innerText();
  assert.match(spanishMixText, /日本語＋Español Mix/);
  assert.match(spanishMixText, /Sabemos que es importante/);
  assert.match(spanishMixText, /必要性も方法も知っている/);

  await switchTo('ja');
  await page.waitForFunction(() => document.querySelector('#readerContent')?.textContent?.includes('知っているだけでは、まだ遠い'));
  assert.ok((await page.evaluate(() => window.scrollY)) > 200, 'returning to Japanese should preserve a meaningful reading position');

  for (let i = 0; i < 2; i += 1) {
    await switchTo('en-mix');
    await switchTo('es-mix');
    await switchTo('ja');
  }

  const storageKeys = await page.evaluate(() => Object.keys(localStorage));
  assert.ok(storageKeys.includes(canonicalKey));
  assert.equal(storageKeys.some(key => key.includes(`${ESSAY_ID}:en-mix`) || key.includes(`${ESSAY_ID}:es-mix`)), false);

  const legacyRequests = requestedUrls.filter(url => /\/data\/mix-index\.json(?:[?#]|$)|\/spanish\/(?!-mix)|\/data\/glossar(?:y|ies)(?:[/?#]|$)|\/glossary-tools\.(?:js|css)(?:[?#]|$)/.test(url));
  assert.deepEqual(legacyRequests, [], `legacy resources should not be requested: ${legacyRequests.join(', ')}`);
  assert.deepEqual(pageErrors, []);
  assert.deepEqual(failedRequests, []);
  assert.deepEqual(consoleErrors, []);

  await page.setViewportSize({ width: 320, height: 700 });
  await page.reload({ waitUntil: 'networkidle' });
  await page.waitForSelector('#readerLanguageSwitch:not([hidden])');
  assert.equal(await page.locator('#readerLanguageMenu').isHidden(), true, 'mobile language menu should remain collapsed by default');
  const switchBox = await page.locator('#readerLanguageSwitch').boundingBox();
  assert.ok(switchBox, 'language switch should be visible on mobile');
  assert.ok(switchBox.x >= 0 && switchBox.x + switchBox.width <= 320.5, `language switch overflows mobile viewport: ${JSON.stringify(switchBox)}`);

  const noteBox = await page.locator('#noteTab').boundingBox();
  assert.ok(noteBox, 'note tab should remain visible on mobile');
  assert.equal(overlaps(switchBox, noteBox), false, `language switch overlaps note tab: switch=${JSON.stringify(switchBox)} note=${JSON.stringify(noteBox)}`);

  await page.locator('.reader-language-trigger').click();
  await page.waitForSelector('#readerLanguageMenu:not([hidden])');
  const menuBox = await page.locator('#readerLanguageMenu').boundingBox();
  assert.ok(menuBox, 'language menu should open on mobile');
  assert.ok(menuBox.x >= 0 && menuBox.x + menuBox.width <= 320.5, `language menu overflows mobile viewport: ${JSON.stringify(menuBox)}`);
  await page.keyboard.press('Escape');

  const tocSafety = await page.evaluate(async () => {
    window.__myessaysTocProbe = 0;
    showReader({
      id: 'toc-security-probe',
      title: 'TOC safety probe',
      type: 'Essay',
      created: '2026-08-30',
      updated: '2026-08-30',
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
