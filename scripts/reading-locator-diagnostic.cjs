const { chromium } = require('playwright');
const assert = require('node:assert/strict');

const BASE_URL = process.env.BASE_URL || 'http://127.0.0.1:4173';
const ESSAY_ID = 'confucius-knowing-liking-enjoying';
const CONTROL = '#readerLanguageInstantDirect';
const TOLERANCE_PX = 3;

async function readState(page, label) {
  return page.evaluate(currentLabel => {
    const pivot = window.MyEssaysReadingPivot?.current?.();
    const logicalLocator = window.MyEssaysReadingPivot?.locator?.() || '';
    const semanticTop = pivot
      ? (window.MyEssaysReadingLocators?.semanticTop?.(logicalLocator, pivot) ?? pivot.getBoundingClientRect().top)
      : null;
    return {
      label: currentLabel,
      version: window.MyEssaysReaderVersions?.currentVersion?.() || '',
      desiredVersion: window.MyEssaysInstantReadingModes?.desiredVersion?.() || '',
      transitioning: Boolean(window.MyEssaysInstantReadingModes?.isTransitioning?.()),
      scrollY: Number(window.scrollY.toFixed(3)),
      logicalLocator,
      physicalLocator: pivot?.dataset?.readingLocator || '',
      semanticTop: semanticTop == null ? null : Number(semanticTop.toFixed(3)),
      physicalTop: pivot ? Number(pivot.getBoundingClientRect().top.toFixed(3)) : null
    };
  }, label);
}

async function switchTo(page, version) {
  const current = await page.evaluate(() => window.MyEssaysReaderVersions?.currentVersion?.() || 'ja');
  if (current !== version) {
    const button = page.locator(`${CONTROL} [data-reading-mode-intent="${version}"]`);
    assert.equal(await button.count(), 1, `persistent Reading Mode choice should exist for ${version}`);
    await button.click();
  }
  await page.waitForFunction(expected => {
    const controller = window.MyEssaysInstantReadingModes;
    const option = document.querySelector(`#readerLanguageInstantDirect [data-reading-mode-intent="${expected}"]`);
    return window.MyEssaysReaderVersions?.currentVersion?.() === expected
      && controller?.desiredVersion?.() === expected
      && !controller?.isTransitioning?.()
      && !window.MyEssaysReaderVersions?.isSwitching?.()
      && option?.getAttribute('aria-checked') === 'true';
  }, version);
}

function assertContinuity(actual, baseline, expectedVersion) {
  assert.equal(actual.version, expectedVersion, `${actual.label}: actual version should be ${expectedVersion}`);
  assert.equal(actual.desiredVersion, expectedVersion, `${actual.label}: desired version should converge`);
  assert.equal(actual.transitioning, false, `${actual.label}: Reading Mode should be settled`);
  assert.equal(actual.logicalLocator, baseline.logicalLocator, `${actual.label}: logical locator must stay identical`);
  assert.ok(Number.isFinite(actual.semanticTop), `${actual.label}: semantic top should resolve`);
  const drift = actual.semanticTop - baseline.semanticTop;
  assert.ok(Math.abs(drift) <= TOLERANCE_PX, `${actual.label}: semantic eye-line drifted by ${drift}px`);
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

  try {
    await page.goto(`${BASE_URL}/#/essay/${ESSAY_ID}`, { waitUntil: 'networkidle' });
    await page.waitForSelector(CONTROL, { state: 'visible' });
    await page.waitForSelector('#readerContent > p.reader-locator-block.is-reading-pivot');
    await switchTo(page, 'ja');

    const target = await page.evaluate(() => {
      const maxScroll = Math.max(0, document.documentElement.scrollHeight - innerHeight);
      const next = Math.min(maxScroll, Math.max(500, maxScroll * 0.55));
      scrollTo({ top: next, behavior: 'instant' });
      return next;
    });
    await page.waitForFunction(expected => Math.abs(window.scrollY - expected) <= 2, target);
    await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
    await page.waitForFunction(() => (
      window.scrollY > 300
      && Boolean(window.MyEssaysReadingPivot?.locator?.())
      && !window.MyEssaysReaderVersions?.isSwitching?.()
    ));

    const baseline = await readState(page, 'JA');
    assert.ok(baseline.scrollY > 300, `JA: expected a deep reading position, got ${baseline.scrollY}`);
    assert.ok(baseline.logicalLocator, 'JA: a logical Reading Pivot locator should exist');
    assert.ok(Number.isFinite(baseline.semanticTop), 'JA: semantic top should resolve');
    console.log('SEMANTIC_LOCATOR_DIAGNOSTIC', JSON.stringify(baseline));

    await switchTo(page, 'en-mix');
    const english = await readState(page, 'EN');
    assertContinuity(english, baseline, 'en-mix');
    assert.ok(english.scrollY > 200, 'EN: switch must not reset to the top');
    console.log('SEMANTIC_LOCATOR_DIAGNOSTIC', JSON.stringify(english));

    await switchTo(page, 'es-mix');
    await page.waitForFunction(() => document.querySelector('#readerContent')?.textContent?.includes('Sabemos que es importante'));
    const spanish = await readState(page, 'ES');
    assertContinuity(spanish, baseline, 'es-mix');
    assert.ok(spanish.scrollY > 200, 'ES: switch must not reset to the top');
    console.log('SEMANTIC_LOCATOR_DIAGNOSTIC', JSON.stringify(spanish));

    console.log(`Reading locator diagnostic passed: ${baseline.logicalLocator}, EN drift ${(english.semanticTop - baseline.semanticTop).toFixed(3)}px, ES drift ${(spanish.semanticTop - baseline.semanticTop).toFixed(3)}px`);
  } finally {
    await browser.close();
  }
})().catch(error => {
  console.error(error);
  process.exit(1);
});