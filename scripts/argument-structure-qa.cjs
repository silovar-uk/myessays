const { chromium } = require('playwright');
const assert = require('node:assert/strict');

const BASE_URL = process.env.BASE_URL || 'http://127.0.0.1:4173';

const FIXTURES = [
  {
    essayId: 'capability-output-asymmetry',
    sentenceCount: 32,
    profiles: [
      '4-2-3-5',
      '4-1-3-5',
      '2-3-4-5',
      '1-3-4-5',
      '4-1-3-5',
      '4-2-3-5',
      '4-2-3-5',
      '2-3-4-5'
    ]
  },
  {
    essayId: 'dynamic-multilayer-comparative-advantage',
    sentenceCount: 36,
    profiles: [
      '4-2-3-5',
      '2-1-3-5',
      '4-1-3-5',
      '2-1-3-5',
      '4-1-3-5',
      '4-2-2-2-5',
      '3-2-4-5',
      '4-2-3-5',
      '4-3-5'
    ]
  },
  {
    essayId: 'executive-hands-on-as-exploration',
    sentenceCount: 46,
    profiles: [
      '4-2-3-5',
      '2-1-3-5',
      '4-1-3-2-5',
      '2-1-3-5',
      '4-1-3-5',
      '3-2-4-5',
      '4-2-3-3-5',
      '4-2-3-5',
      '4-2-3-5',
      '4-3-2-5',
      '4-3-2-5'
    ]
  },
  {
    essayId: 'learning-organization-senge-systems-thinking',
    sentenceCount: 48,
    profiles: [
      '4-1-3-5',
      '4-2-3-5',
      '2-1-3-5',
      '4-1-3-5',
      '2-1-3-5',
      '4-2-3-5',
      '4-1-3-5',
      '4-2-3-3-5',
      '4-1-3-5',
      '4-2-3-5',
      '4-2-3-5',
      '4-3-5'
    ]
  },
  {
    essayId: 'minto-pyramid-thinking-structure-ai',
    sentenceCount: 35,
    profiles: [
      '4-2-3-5',
      '2-1-3-5',
      '4-2-3-5',
      '4-1-3-5',
      '4-2-3-5',
      '4-2-3-5',
      '4-1-3-5',
      '4-2-3-5',
      '4-3-5'
    ]
  },
  {
    essayId: 'goodharts-law-proxy-target-design',
    sentenceCount: 40,
    profiles: [
      '4-2-3-5',
      '2-1-3-5',
      '4-2-3-5',
      '4-2-3-2-5',
      '4-1-3-5',
      '4-1-3-5',
      '4-1-3-5',
      '4-2-3-5',
      '4-2-3-5',
      '4-3-5'
    ]
  },
  {
    essayId: 'commentary-as-technology-of-noticing',
    sentenceCount: 40,
    profiles: [
      '4-2-3-5',
      '4-1-3-3-5',
      '4-1-3-5',
      '2-1-3-5',
      '4-1-3-5',
      '4-1-3-5',
      '4-1-3-5',
      '4-2-3-5',
      '4-2-3-5',
      '4-3-5'
    ]
  },
  {
    essayId: 'claude-delegation-horizon-opus-fable',
    sentenceCount: 40,
    profiles: [
      '4-2-3-5',
      '2-1-3-5',
      '2-1-3-5',
      '4-1-3-5',
      '4-1-3-5',
      '4-1-3-5',
      '4-2-3-5',
      '4-2-3-5',
      '4-1-3-5',
      '4-3-2-5'
    ]
  },
  {
    essayId: 'physical-ai-embodied-intelligence-deployment',
    sentenceCount: 44,
    profiles: [
      '4-2-3-5',
      '4-2-3-5',
      '4-2-3-5',
      '4-2-3-5',
      '4-2-3-5',
      '4-1-3-5',
      '4-2-3-5',
      '4-1-3-5',
      '4-1-3-5',
      '4-1-3-5',
      '4-3-2-5'
    ]
  }
];

const profileLabel = profile => profile.split('-').join(' → ');

async function waitForScrollSettled(page) {
  await page.waitForFunction(() => {
    const now = performance.now();
    const y = window.scrollY;
    const key = '__argumentQaScrollState';
    const previous = window[key];

    if (!previous || Math.abs(previous.y - y) > 0.5) {
      window[key] = { y, stableSince: now };
      return false;
    }

    return now - previous.stableSince >= 180;
  }, null, { polling: 50, timeout: 3000 });
  await page.evaluate(() => { delete window.__argumentQaScrollState; });
}

async function runFixture(browser, fixture) {
  const page = await browser.newPage({ viewport: { width: 1280, height: 820 } });
  const consoleErrors = [];
  const pageErrors = [];
  const failedRequests = [];

  page.on('console', message => {
    if (message.type() === 'error') consoleErrors.push(message.text());
  });
  page.on('pageerror', error => pageErrors.push(String(error)));
  page.on('requestfailed', request => failedRequests.push(`${request.url()} :: ${request.failure()?.errorText || 'failed'}`));

  await page.goto(`${BASE_URL}/#/essay/${fixture.essayId}`, { waitUntil: 'networkidle' });
  await page.waitForSelector('#readerView:not([hidden])');
  await page.waitForSelector('.argument-structure-paragraph');

  const profiles = await page.locator('.argument-structure-paragraph').evaluateAll(nodes => nodes.map(node => node.dataset.argumentProfile));
  assert.deepEqual(profiles, fixture.profiles, `${fixture.essayId}: authored Structure profiles should compile exactly`);
  assert.equal(await page.locator('.argument-sentence').count(), fixture.sentenceCount, `${fixture.essayId}: structured sentence count should remain stable`);
  assert.equal(await page.locator('br.argument-sentence-break').count(), 0, `${fixture.essayId}: normal Reader flow should remove metadata-only sentence breaks`);

  const readerText = await page.locator('#readerContent').innerText();
  assert.equal(readerText.includes('<!-- level:'), false, `${fixture.essayId}: Structure metadata comments must never leak into Reader prose`);
  assert.equal(await page.locator('#readerView').evaluate(node => node.classList.contains('argument-structure-mode')), false, `${fixture.essayId}: Structure must be off by default`);
  assert.equal(await page.locator('#argumentStructurePanel').isHidden(), true, `${fixture.essayId}: desktop Structure panel must start hidden`);
  assert.equal(await page.locator('[data-argument-tab="contents"]').getAttribute('aria-selected'), 'true');
  assert.equal(await page.locator('[data-argument-tab="structure"]').getAttribute('aria-selected'), 'false');

  const hiddenMarkerCount = await page.locator('.argument-level-marker').evaluateAll(nodes => nodes.filter(node => getComputedStyle(node).display === 'none').length);
  assert.equal(hiddenMarkerCount, fixture.sentenceCount, `${fixture.essayId}: L1-L5 markers must stay invisible in normal Reader mode`);
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth), false, `${fixture.essayId}: desktop Reader should not overflow horizontally`);

  await page.locator('[data-argument-tab="structure"]').click();
  await page.waitForFunction(() => document.querySelector('#readerView')?.classList.contains('argument-structure-mode'));
  assert.equal(await page.locator('#argumentStructurePanel').isVisible(), true, `${fixture.essayId}: Structure panel should open on desktop`);
  assert.equal(await page.locator('#argumentStructurePanel .argument-profile-row').count(), fixture.profiles.length);
  assert.match(await page.locator('#argumentInspector').innerText(), /Paragraph 1/);
  assert.match(await page.locator('#argumentInspector').innerText(), new RegExp(profileLabel(fixture.profiles[0]).replaceAll('→', '\\→')));

  const visibleMarkerCount = await page.locator('.argument-level-marker').evaluateAll(nodes => nodes.filter(node => getComputedStyle(node).display !== 'none').length);
  assert.equal(visibleMarkerCount, fixture.sentenceCount, `${fixture.essayId}: L1-L5 markers should appear only in Structure mode`);

  if (fixture.profiles.length > 1) {
    await page.locator('#argumentStructurePanel .argument-profile-row[data-argument-paragraph="1"]').click();
    await page.waitForFunction(() => document.querySelector('#argumentInspector')?.textContent?.includes('Paragraph 2'));
    await waitForScrollSettled(page);

    const paragraphTwoInspector = await page.locator('#argumentInspector').innerText();
    assert.match(paragraphTwoInspector, /Paragraph 2/, `${fixture.essayId}: Inspector should remain on Paragraph 2 after programmatic scroll settles`);
    assert.match(paragraphTwoInspector, new RegExp(profileLabel(fixture.profiles[1]).replaceAll('→', '\\→')), `${fixture.essayId}: Paragraph 2 profile should remain selected after programmatic scroll settles`);
    assert.equal(
      await page.locator('#argument-paragraph-2').evaluate(node => node.classList.contains('is-argument-active')),
      true,
      `${fixture.essayId}: Paragraph 2 should remain active after programmatic scroll settles`
    );
  }

  await page.keyboard.press('s');
  await page.waitForFunction(() => !document.querySelector('#readerView')?.classList.contains('argument-structure-mode'));
  await page.keyboard.press('s');
  await page.waitForFunction(() => document.querySelector('#readerView')?.classList.contains('argument-structure-mode'));

  await page.setViewportSize({ width: 390, height: 844 });
  await page.reload({ waitUntil: 'networkidle' });
  await page.waitForSelector('#readerView:not([hidden])');
  await page.waitForSelector('.argument-structure-paragraph');
  await page.waitForSelector('#argumentStructureLauncher:not([hidden])');

  assert.equal(await page.locator('#readerView').evaluate(node => node.classList.contains('argument-structure-mode')), false, `${fixture.essayId}: mobile Reader should start in normal mode`);
  assert.equal(await page.locator('.argument-mobile-profile').count(), fixture.profiles.length, `${fixture.essayId}: mobile should expose one profile control per structured paragraph`);
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth), false, `${fixture.essayId}: mobile Reader should not overflow horizontally`);

  await page.locator('#argumentStructureLauncher').click();
  await page.waitForFunction(() => document.querySelector('#argumentStructureSheet')?.classList.contains('is-open'));
  assert.equal(await page.locator('#argumentStructureSheet').getAttribute('aria-hidden'), 'false');
  assert.equal(await page.locator('#argumentStructureSheet .argument-profile-row').count(), fixture.profiles.length);

  await page.locator('#argumentStructureSheet .argument-profile-row[data-argument-paragraph="0"]').click();
  await page.waitForFunction(() => document.querySelector('#argumentStructureSheet')?.textContent?.includes('Paragraph 1'));
  const mobileInspector = await page.locator('#argumentStructureSheet').innerText();
  assert.match(mobileInspector, /Paragraph 1/);
  assert.match(mobileInspector, new RegExp(profileLabel(fixture.profiles[0]).replaceAll('→', '\\→')));

  await page.keyboard.press('Escape');
  await page.waitForFunction(() => document.querySelector('#argumentStructureSheet')?.getAttribute('aria-hidden') === 'true');
  assert.match(page.url(), new RegExp(`#\\/essay\\/${fixture.essayId}$`), `${fixture.essayId}: Escape should close the Structure sheet without navigating away`);
  assert.equal(await page.locator('#argumentStructureLauncher').evaluate(node => document.activeElement === node), true, `${fixture.essayId}: focus should return to the Structure launcher after Escape`);

  assert.deepEqual(pageErrors, [], `${fixture.essayId}: no page errors expected`);
  assert.deepEqual(failedRequests, [], `${fixture.essayId}: no failed requests expected`);
  assert.deepEqual(consoleErrors, [], `${fixture.essayId}: no console errors expected`);

  await page.close();
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  try {
    for (const fixture of FIXTURES) await runFixture(browser, fixture);
  } finally {
    await browser.close();
  }
  console.log(`Argument Structure QA passed for ${FIXTURES.length} fixtures`);
})().catch(error => {
  console.error(error);
  process.exit(1);
});