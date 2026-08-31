const { chromium } = require('playwright');
const assert = require('node:assert/strict');

const BASE_URL = process.env.BASE_URL || 'http://127.0.0.1:4173';
const ESSAY_ID = 'capability-output-asymmetry';
const EXPECTED_PROFILES = [
  '4-2-3-5',
  '4-1-3-5',
  '2-3-4-5',
  '1-3-4-5',
  '4-1-3-5',
  '4-2-3-5',
  '4-2-3-5',
  '2-3-4-5'
];

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 820 } });
  const consoleErrors = [];
  const pageErrors = [];
  const failedRequests = [];

  page.on('console', message => {
    if (message.type() === 'error') consoleErrors.push(message.text());
  });
  page.on('pageerror', error => pageErrors.push(String(error)));
  page.on('requestfailed', request => failedRequests.push(`${request.url()} :: ${request.failure()?.errorText || 'failed'}`));

  await page.goto(`${BASE_URL}/#/essay/${ESSAY_ID}`, { waitUntil: 'networkidle' });
  await page.waitForSelector('#readerView:not([hidden])');
  await page.waitForSelector('.argument-structure-paragraph');

  const profiles = await page.locator('.argument-structure-paragraph').evaluateAll(nodes => nodes.map(node => node.dataset.argumentProfile));
  assert.deepEqual(profiles, EXPECTED_PROFILES, 'baseline Structure profiles should compile from the authored metadata');
  assert.equal(await page.locator('.argument-sentence').count(), 32, 'baseline article should expose 32 structured sentences');
  assert.equal(await page.locator('br.argument-sentence-break').count(), 0, 'normal Reader flow should remove metadata-only sentence breaks');

  const readerText = await page.locator('#readerContent').innerText();
  assert.equal(readerText.includes('<!-- level:'), false, 'Structure metadata comments must never leak into Reader prose');
  assert.equal(await page.locator('#readerView').evaluate(node => node.classList.contains('argument-structure-mode')), false, 'Structure must be off by default');
  assert.equal(await page.locator('#argumentStructurePanel').isHidden(), true, 'desktop Structure panel must start hidden');
  assert.equal(await page.locator('[data-argument-tab="contents"]').getAttribute('aria-selected'), 'true');
  assert.equal(await page.locator('[data-argument-tab="structure"]').getAttribute('aria-selected'), 'false');

  const hiddenMarkerCount = await page.locator('.argument-level-marker').evaluateAll(nodes => nodes.filter(node => getComputedStyle(node).display === 'none').length);
  assert.equal(hiddenMarkerCount, 32, 'L1-L5 markers must stay invisible in normal Reader mode');
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth), false, 'desktop Reader should not overflow horizontally');

  await page.locator('[data-argument-tab="structure"]').click();
  await page.waitForFunction(() => document.querySelector('#readerView')?.classList.contains('argument-structure-mode'));
  assert.equal(await page.locator('#argumentStructurePanel').isVisible(), true, 'Structure panel should open on desktop');
  assert.equal(await page.locator('#argumentStructurePanel .argument-profile-row').count(), EXPECTED_PROFILES.length);
  assert.match(await page.locator('#argumentInspector').innerText(), /Paragraph 1/);
  assert.match(await page.locator('#argumentInspector').innerText(), /4 → 2 → 3 → 5/);

  const visibleMarkerCount = await page.locator('.argument-level-marker').evaluateAll(nodes => nodes.filter(node => getComputedStyle(node).display !== 'none').length);
  assert.equal(visibleMarkerCount, 32, 'L1-L5 markers should appear only while Structure mode is active on desktop');

  await page.locator('#argumentStructurePanel .argument-profile-row[data-argument-paragraph="1"]').click();
  await page.waitForFunction(() => document.querySelector('#argumentInspector')?.textContent?.includes('Paragraph 2'));
  const paragraphTwoInspector = await page.locator('#argumentInspector').innerText();
  assert.match(paragraphTwoInspector, /Paragraph 2/);
  assert.match(paragraphTwoInspector, /4 → 1 → 3 → 5/);
  assert.equal(await page.locator('#argument-paragraph-2').evaluate(node => node.classList.contains('is-argument-active')), true);

  await page.keyboard.press('s');
  await page.waitForFunction(() => !document.querySelector('#readerView')?.classList.contains('argument-structure-mode'));
  await page.keyboard.press('s');
  await page.waitForFunction(() => document.querySelector('#readerView')?.classList.contains('argument-structure-mode'));

  await page.setViewportSize({ width: 390, height: 844 });
  await page.reload({ waitUntil: 'networkidle' });
  await page.waitForSelector('#readerView:not([hidden])');
  await page.waitForSelector('.argument-structure-paragraph');
  await page.waitForSelector('#argumentStructureLauncher:not([hidden])');

  assert.equal(await page.locator('#readerView').evaluate(node => node.classList.contains('argument-structure-mode')), false, 'mobile Reader should also start in normal mode');
  assert.equal(await page.locator('.argument-mobile-profile').count(), EXPECTED_PROFILES.length, 'mobile should expose one compact profile control per structured paragraph');
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth), false, 'mobile Reader should not overflow horizontally');

  await page.locator('#argumentStructureLauncher').click();
  await page.waitForFunction(() => document.querySelector('#argumentStructureSheet')?.classList.contains('is-open'));
  assert.equal(await page.locator('#argumentStructureSheet').getAttribute('aria-hidden'), 'false');
  assert.equal(await page.locator('#argumentStructureSheet .argument-profile-row').count(), EXPECTED_PROFILES.length);

  await page.locator('#argumentStructureSheet .argument-profile-row[data-argument-paragraph="0"]').click();
  await page.waitForFunction(() => document.querySelector('#argumentStructureSheet #argumentInspector')?.textContent?.includes('Paragraph 1'));
  assert.match(await page.locator('#argumentStructureSheet #argumentInspector').innerText(), /4 → 2 → 3 → 5/);

  await page.keyboard.press('Escape');
  await page.waitForFunction(() => document.querySelector('#argumentStructureSheet')?.getAttribute('aria-hidden') === 'true');
  assert.match(page.url(), new RegExp(`#\/essay\/${ESSAY_ID}$`), 'closing the mobile Structure sheet with Escape must not navigate away from the article');

  assert.deepEqual(pageErrors, []);
  assert.deepEqual(failedRequests, []);
  assert.deepEqual(consoleErrors, []);

  await browser.close();
  console.log('Argument Structure QA passed');
})().catch(error => {
  console.error(error);
  process.exit(1);
});
