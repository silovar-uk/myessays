const { chromium } = require('playwright');
const assert = require('node:assert/strict');

const BASE_URL = process.env.BASE_URL || 'http://127.0.0.1:4173';
const ESSAY_ID = 'confucius-knowing-liking-enjoying';
const CONTROL = '#readerLanguageInstantDirect';
const optionSelector = version => `${CONTROL} .reader-language-direct-option[data-reading-mode-intent="${version}"]`;

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
  await page.waitForSelector('.reader-mode-bar');
  await page.waitForSelector(CONTROL, { state: 'visible' });
  await page.waitForSelector('[data-reader-mode-compare]');
  await page.waitForSelector('#readerContent > p.reader-locator-block.is-reading-pivot');

  assert.equal(await page.locator(CONTROL).count(), 1, 'there should be one persistent language control');
  assert.equal(await page.locator(CONTROL).getAttribute('role'), 'radiogroup');
  assert.equal(await page.locator(optionSelector('ja')).getAttribute('aria-checked'), 'true');
  assert.equal(await page.locator(optionSelector('en-mix')).textContent(), 'EN');
  assert.equal(await page.locator(optionSelector('es-mix')).textContent(), 'ES');
  assert.equal(await page.locator('#readerLanguageSwitch').isHidden(), true, 'legacy language disclosure should yield to the one-tap direct language choices');

  const canonicalKey = `myessays:reading-state:${ESSAY_ID}`;
  await page.evaluate(({ key }) => {
    localStorage.setItem(key, JSON.stringify({ openedAt: '2026-08-30T00:00:00.000Z' }));
  }, { key: canonicalKey });

  const waitSettled = async version => {
    await page.waitForFunction(expected => {
      const actual = window.MyEssaysReaderVersions?.currentVersion?.();
      const controller = window.MyEssaysInstantReadingModes;
      const button = document.querySelector(`#readerLanguageInstantDirect [data-reading-mode-intent="${expected}"]`);
      return actual === expected
        && !controller?.isTransitioning?.()
        && button?.getAttribute('aria-checked') === 'true';
    }, version);
  };

  const switchTo = async version => {
    const current = await page.evaluate(() => window.MyEssaysReaderVersions?.currentVersion?.() || 'ja');
    if (current === version) {
      await waitSettled(version);
      return;
    }
    const button = page.locator(optionSelector(version));
    assert.equal(await button.count(), 1, `persistent language choice should exist for ${version}`);
    await button.click();
    await waitSettled(version);
  };

  const scrollDelta = await page.evaluate(() => Math.max(700, document.documentElement.scrollHeight * 0.35));
  await page.mouse.move(640, 400);
  await page.mouse.wheel(0, scrollDelta);
  await page.waitForFunction(() => Boolean(window.MyEssaysReadingPivot?.locator?.()));

  const before = await page.evaluate(() => {
    const pivot = window.MyEssaysReadingPivot?.current?.();
    return {
      locator: window.MyEssaysReadingPivot?.locator?.() || '',
      top: pivot?.getBoundingClientRect?.().top ?? null,
      scrollY: window.scrollY
    };
  });
  assert.ok(before.scrollY > 300, `expected a meaningful reading position before switch, got ${before.scrollY}`);
  assert.ok(before.locator, 'a canonical Reading Pivot locator should exist before switching');

  await switchTo('en-mix');
  const english = await page.evaluate(() => {
    const pivot = window.MyEssaysReadingPivot?.current?.();
    return { locator: window.MyEssaysReadingPivot?.locator?.() || '', top: pivot?.getBoundingClientRect?.().top ?? null };
  });
  assert.equal(english.locator, before.locator, 'English Mix should preserve the exact Reading Pivot locator');
  assert.ok(Math.abs(english.top - before.top) <= 3, `English Mix Pivot top drifted by ${english.top - before.top}px`);
  assert.ok((await page.evaluate(() => window.scrollY)) > 200, 'English Mix switch must not reset reading position');

  await switchTo('es-mix');
  await page.waitForFunction(() => document.querySelector('#readerContent')?.textContent?.includes('Sabemos que es importante'));
  const spanish = await page.evaluate(() => {
    const pivot = window.MyEssaysReadingPivot?.current?.();
    return { locator: window.MyEssaysReadingPivot?.locator?.() || '', top: pivot?.getBoundingClientRect?.().top ?? null };
  });
  assert.equal(spanish.locator, before.locator, 'Español Mix should preserve the exact Reading Pivot locator');
  assert.ok(Math.abs(spanish.top - before.top) <= 3, `Español Mix Pivot top drifted by ${spanish.top - before.top}px`);
  const spanishMixText = await page.locator('#readerContent').innerText();
  assert.match(spanishMixText, /日本語＋Español Mix/);
  assert.match(spanishMixText, /Sabemos que es importante/);
  assert.match(spanishMixText, /必要性も方法も知っている/);

  await switchTo('ja');
  await page.waitForFunction(() => document.querySelector('#readerContent')?.textContent?.includes('知っているだけでは、まだ遠い'));
  const returned = await page.evaluate(() => {
    const pivot = window.MyEssaysReadingPivot?.current?.();
    return { locator: window.MyEssaysReadingPivot?.locator?.() || '', top: pivot?.getBoundingClientRect?.().top ?? null };
  });
  assert.equal(returned.locator, before.locator, 'returning to Japanese should preserve the same Pivot locator');
  assert.ok(Math.abs(returned.top - before.top) <= 3, `round-trip Pivot top drifted by ${returned.top - before.top}px`);

  await page.locator('[data-reader-mode-compare]').click();
  await page.waitForSelector('.reader-compare-view');
  await page.waitForSelector('.reader-compare-row');
  const compareCells = await page.locator('.reader-compare-row .reader-compare-cell').count();
  assert.ok(compareCells >= 2, 'Compare view should render paired JA / alternate cells');
  assert.equal(await page.locator('[data-reader-mode-compare]').getAttribute('aria-pressed'), 'true');
  await page.keyboard.press('Escape');
  await page.waitForFunction(() => !document.querySelector('.reader-compare-view'));

  // Sequential round-trips must preserve the same semantic eye-line.
  for (let i = 0; i < 2; i += 1) {
    await switchTo('en-mix');
    await switchTo('es-mix');
    await switchTo('ja');
  }

  let finalPivot = await page.evaluate(() => ({
    locator: window.MyEssaysReadingPivot?.locator?.() || '',
    top: window.MyEssaysReadingPivot?.current?.()?.getBoundingClientRect?.().top ?? null
  }));
  assert.equal(finalPivot.locator, before.locator, 'repeated direct language switches should not change the Pivot locator');
  assert.ok(Math.abs(finalPivot.top - before.top) <= 3, `repeated direct language switches drifted Pivot top by ${finalPivot.top - before.top}px`);

  // Rapid intent handoff: the second click happens while the first transition is
  // still active. The latest desired language must win after the stable boundary.
  const intentLog = await page.evaluate(() => {
    window.__readingModeIntentLog = [];
    document.addEventListener('myessays:reader-version-intent', event => {
      window.__readingModeIntentLog.push(event.detail?.version || '');
    });
    return true;
  });
  assert.equal(intentLog, true);
  await page.locator(optionSelector('en-mix')).click();
  await page.waitForTimeout(18);
  await page.locator(optionSelector('es-mix')).click();
  await waitSettled('es-mix');

  const rapid = await page.evaluate(() => ({
    version: window.MyEssaysReaderVersions?.currentVersion?.() || '',
    desired: window.MyEssaysInstantReadingModes?.desiredVersion?.() || '',
    transitioning: window.MyEssaysInstantReadingModes?.isTransitioning?.() || false,
    intents: window.__readingModeIntentLog || [],
    locator: window.MyEssaysReadingPivot?.locator?.() || '',
    top: window.MyEssaysReadingPivot?.current?.()?.getBoundingClientRect?.().top ?? null
  }));
  assert.equal(rapid.version, 'es-mix', 'rapid switch should settle on the latest requested language');
  assert.equal(rapid.desired, 'es-mix', 'desired language should converge to the latest request');
  assert.equal(rapid.transitioning, false, 'rapid switch should reach a stable state');
  assert.deepEqual(rapid.intents.slice(-2), ['en-mix', 'es-mix'], 'each rapid user click should produce exactly one intent in order');
  assert.equal(rapid.locator, before.locator, 'rapid switch should preserve the exact Reading Pivot locator');
  assert.ok(Math.abs(rapid.top - before.top) <= 3, `rapid switch drifted Pivot top by ${rapid.top - before.top}px`);
  await switchTo('ja');

  finalPivot = await page.evaluate(() => ({
    locator: window.MyEssaysReadingPivot?.locator?.() || '',
    top: window.MyEssaysReadingPivot?.current?.()?.getBoundingClientRect?.().top ?? null
  }));
  assert.equal(finalPivot.locator, before.locator, 'post-rapid return should keep the Pivot locator');
  assert.ok(Math.abs(finalPivot.top - before.top) <= 3, `post-rapid return drifted Pivot top by ${finalPivot.top - before.top}px`);

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
  await page.waitForSelector('.reader-mode-bar');
  await page.waitForSelector(CONTROL, { state: 'visible' });
  const modeBox = await page.locator('.reader-mode-bar').boundingBox();
  assert.ok(modeBox, 'reading mode bar should be visible on mobile');
  assert.ok(modeBox.x >= 0 && modeBox.x + modeBox.width <= 320.5, `mode bar overflows mobile viewport: ${JSON.stringify(modeBox)}`);

  const noteBox = await page.locator('#noteTab').boundingBox();
  assert.ok(noteBox, 'note action should remain visible on mobile');
  assert.equal(overlaps(modeBox, noteBox), false, `mode bar overlaps note action: mode=${JSON.stringify(modeBox)} note=${JSON.stringify(noteBox)}`);

  const legacyBox = await page.locator('#readerLanguageSwitch').boundingBox();
  assert.equal(legacyBox, null, 'legacy switch must stay visually hidden when unified modes are active');

  await switchTo('en-mix');
  const paragraph = page.locator('#readerContent [data-reading-locator]').filter({ hasText: /./ }).first();
  await paragraph.click();
  await page.waitForSelector('#paragraphLanguageDock:not([hidden])');
  const dockBox = await page.locator('#paragraphLanguageDock button').boundingBox();
  assert.ok(dockBox, 'mobile paragraph language action should appear after selecting a paragraph');
  assert.ok(dockBox.x >= 0 && dockBox.x + dockBox.width <= 320.5, `paragraph action overflows mobile viewport: ${JSON.stringify(dockBox)}`);

  const tocSafety = await page.evaluate(async () => {
    window.__myessaysTocProbe = 0;
    const probe = {
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
    };
    history.replaceState(null, '', '#/essay/toc-security-probe');
    showReader(probe);
    await new Promise(resolve => setTimeout(resolve, 120));
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