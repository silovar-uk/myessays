const { chromium } = require('playwright');
const assert = require('node:assert/strict');

const BASE_URL = process.env.BASE_URL || 'http://127.0.0.1:4173';
const THREE_MODE_ID = 'confucius-knowing-liking-enjoying';
const TWO_MODE_ID = 'watanabe-hisanobu-same-baseball-different-chair';
const JA_ONLY_ID = 'urawa-kashima-control-the-controllable';
const CONTROL = '#readerModeShell';

async function nextFrames(page, count = 2) {
  await page.evaluate(frameCount => new Promise(resolve => {
    let remaining = frameCount;
    const step = () => {
      remaining -= 1;
      if (remaining <= 0) resolve();
      else requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }), count);
}

async function openEssay(page, id) {
  await page.goto(`${BASE_URL}/#/essay/${id}`, { waitUntil: 'networkidle' });
  await page.waitForFunction(expectedId => {
    const routeId = window.MyEssaysRoute?.parse?.().articleId || '';
    const stateId = typeof state !== 'undefined' ? state.currentEssay?.id || '' : '';
    const content = document.getElementById('readerContent');
    const pivot = window.MyEssaysReadingPivot?.current?.();
    return routeId === expectedId
      && stateId === expectedId
      && content?.dataset.readerEssayId === expectedId
      && !document.getElementById('readerView')?.hidden
      && Boolean(content.querySelector(':scope > p.reader-locator-block'))
      && Boolean(pivot && pivot.isConnected && content.contains(pivot));
  }, id, { timeout: 10000 });
}

async function scrollIntoBody(page, ratio = 0.34, label = 'body-scroll') {
  await page.evaluate(value => {
    const max = Math.max(0, document.documentElement.scrollHeight - innerHeight);
    scrollTo({ top: max * value, behavior: 'instant' });
  }, ratio);

  try {
    await page.waitForFunction(() => window.scrollY > 300, null, { timeout: 3000 });
    await nextFrames(page, 2);
    assert.ok(await page.evaluate(() => window.scrollY > 300), `${label}: expected a meaningful reading scroll`);
  } catch (error) {
    const debug = await page.evaluate(labelText => ({
      label: labelText,
      actual: window.scrollY,
      max: Math.max(0, document.documentElement.scrollHeight - innerHeight),
      route: window.MyEssaysRoute?.parse?.() || null,
      stateId: typeof state !== 'undefined' ? state.currentEssay?.id || '' : '',
      current: window.MyEssaysReaderVersions?.currentVersion?.() || '',
      desired: window.MyEssaysInstantReadingModes?.desiredVersion?.() || '',
      switching: Boolean(window.MyEssaysReaderVersions?.isSwitching?.()),
      transitioning: Boolean(window.MyEssaysInstantReadingModes?.isTransitioning?.()),
      pivot: window.MyEssaysReadingPivot?.locator?.() || '',
      guard: Boolean(window.MyEssaysReadingPivotScrollGuard?.active?.())
    }), label);
    console.error('SCROLL_DEBUG', JSON.stringify(debug));
    throw error;
  }
}

async function readingFocusState(page) {
  return page.evaluate(() => {
    const content = document.getElementById('readerContent');
    const header = document.querySelector('.reader-v2-header')?.getBoundingClientRect();
    const bandTop = (header?.height ? Math.max(0, header.bottom) : 0) + 8;
    const bandBottom = Math.max(bandTop + 1, innerHeight - 18);
    const rail = bandTop + ((bandBottom - bandTop) * .36);
    const paragraphs = [...content.querySelectorAll(':scope > p.reader-locator-block[data-reading-locator]')]
      .filter(block => !block.classList.contains('language-source-hidden'));
    const visible = paragraphs.map(block => {
      const rect = block.getBoundingClientRect();
      const visiblePx = Math.max(0, Math.min(rect.bottom, bandBottom) - Math.max(rect.top, bandTop));
      return { block, rect, visiblePx };
    }).filter(item => item.visiblePx >= Math.min(20, Math.max(1, item.rect.height)))
      .sort((a, b) => a.rect.top - b.rect.top);

    const actual = content.querySelector(':scope > p.is-reading-pivot');
    const actualIndex = actual ? paragraphs.indexOf(actual) : -1;
    let expectedStart = actualIndex;
    let expectedEnd = actualIndex >= 0 ? Math.min(paragraphs.length, actualIndex + 3) : -1;
    if (actualIndex >= 0 && expectedEnd - expectedStart < 3) {
      expectedStart = Math.max(0, expectedEnd - 3);
    }
    const expectedZoneBlocks = actualIndex >= 0 ? paragraphs.slice(expectedStart, expectedEnd) : [];
    const expectedZone = expectedZoneBlocks.map(block => ({ block, rect: block.getBoundingClientRect() }));
    const logicalLocator = window.MyEssaysReadingPivot?.locator?.() || actual?.dataset.readingLocator || '';
    const semanticTop = actual
      ? (window.MyEssaysReadingLocators?.semanticTop?.(logicalLocator, actual) ?? actual.getBoundingClientRect().top)
      : null;
    const actualRect = actual?.getBoundingClientRect?.() || null;
    const contentRect = content.getBoundingClientRect();
    const expectedZoneTop = expectedZone[0] ? expectedZone[0].rect.top - contentRect.top : null;
    const expectedZoneBottom = expectedZone.length ? expectedZone[expectedZone.length - 1].rect.bottom - contentRect.top : null;
    const contentStyle = getComputedStyle(content);
    const pivotStyle = actual ? getComputedStyle(actual) : null;
    const zoneTop = parseFloat(contentStyle.getPropertyValue('--reading-zone-top'));
    const zoneBottom = parseFloat(contentStyle.getPropertyValue('--reading-zone-bottom'));
    const gradient = contentStyle.backgroundImage || '';
    const alphaValues = [...gradient.matchAll(/rgba\([^,]+,[^,]+,[^,]+,\s*([\d.]+)\)/g)]
      .map(match => Number(match[1]))
      .filter(Number.isFinite);
    const pivotColor = pivotStyle?.backgroundColor || '';
    const pivotAlphaMatch = pivotColor.match(/rgba\([^,]+,[^,]+,[^,]+,\s*([\d.]+)\)/);
    const pivotAlpha = pivotColor === 'transparent'
      ? 0
      : (pivotAlphaMatch ? Number(pivotAlphaMatch[1]) : (pivotColor.startsWith('rgb(') ? 1 : 0));

    return {
      rail,
      railHeldByPivot: Boolean(actualRect && actualRect.top <= rail + 24 && actualRect.bottom >= rail - 24),
      actualLocator: logicalLocator,
      physicalLocator: actual?.dataset.readingLocator || '',
      visibleCount: visible.length,
      expectedFocusCount: expectedZone.length,
      focusCount: Number(content.dataset.readingFocusCount || 0),
      focusAnchor: content.dataset.readingFocusAnchor || '',
      expectedFocusStart: expectedZone[0]?.block.dataset.readingLocator || '',
      expectedFocusEnd: expectedZone[expectedZone.length - 1]?.block.dataset.readingLocator || '',
      focusStart: content.dataset.readingFocusStart || '',
      focusEnd: content.dataset.readingFocusEnd || '',
      zoneTop,
      zoneBottom,
      expectedZoneTop,
      expectedZoneBottom,
      gradient,
      maxZoneAlpha: alphaValues.length ? Math.max(...alphaValues) : 0,
      pivotAlpha,
      pivotBoxShadow: pivotStyle?.boxShadow || '',
      actualTop: semanticTop,
      physicalTop: actualRect?.top ?? null
    };
  });
}

async function assertReadingLens(page, label, { minZoneAlpha = 0.02, maxZoneAlpha = 0.05, requireUnpaintedPivot = false } = {}) {
  const state = await readingFocusState(page);
  assert.ok(state.visibleCount >= 1, `${label}: expected visible reading paragraphs`);
  assert.ok(state.physicalLocator, `${label}: expected a Primary Pivot`);
  assert.equal(state.railHeldByPivot, true, `${label}: Primary Pivot must intersect the Reading Rail hysteresis band`);
  assert.ok(state.expectedFocusCount >= 1, `${label}: expected an available three-paragraph reading window`);
  assert.equal(state.focusAnchor, state.physicalLocator, `${label}: Reading Lens anchor must be the physical Primary Pivot`);
  assert.equal(state.focusCount, state.expectedFocusCount, `${label}: Reading Lens must cover the current rail paragraph plus the next two, backfilled only at article end`);
  assert.equal(state.focusStart, state.expectedFocusStart, `${label}: Reading Lens start drifted from the expected window`);
  assert.equal(state.focusEnd, state.expectedFocusEnd, `${label}: Reading Lens end drifted from the expected window`);
  assert.ok(Number.isFinite(state.zoneTop) && Math.abs(state.zoneTop - state.expectedZoneTop) <= 1, `${label}: Reading Lens top drifted (${state.zoneTop} vs ${state.expectedZoneTop})`);
  assert.ok(Number.isFinite(state.zoneBottom) && Math.abs(state.zoneBottom - state.expectedZoneBottom) <= 1, `${label}: Reading Lens bottom drifted (${state.zoneBottom} vs ${state.expectedZoneBottom})`);
  assert.notEqual(state.gradient, 'none', `${label}: Reading Lens should exist as one continuous background layer`);
  assert.ok(state.maxZoneAlpha >= minZoneAlpha && state.maxZoneAlpha <= maxZoneAlpha, `${label}: Reading Lens should remain visible but quiet (max alpha ${state.maxZoneAlpha}, expected ${minZoneAlpha}-${maxZoneAlpha})`);
  if (requireUnpaintedPivot) {
    assert.equal(state.pivotAlpha, 0, `${label}: Primary Pivot must not receive its own background highlight`);
  }
  assert.ok(state.pivotBoxShadow === 'none' || state.pivotBoxShadow === '', `${label}: Primary Pivot must remain free of focus shadows`);
  return state;
}

async function waitForPreload(page, expectedVersions) {
  await page.waitForFunction(expected => {
    const api = window.MyEssaysInstantReadingModes;
    return expected.every(version => api?.isPreloaded?.(version));
  }, expectedVersions, { timeout: 10000 });
}

async function waitForDirectControl(page, count) {
  await page.waitForSelector(CONTROL, { state: 'visible' });
  await page.waitForFunction(expected => (
    [...document.querySelectorAll('#readerModeShell [data-reading-mode-intent]')]
      .filter(button => !button.disabled).length === expected
  ), count, { timeout: 10000 });
}

async function modeDebugState(page) {
  return page.evaluate(() => ({
    current: window.MyEssaysReaderVersions?.currentVersion?.() || '',
    switching: Boolean(window.MyEssaysReaderVersions?.isSwitching?.()),
    transitioning: Boolean(window.MyEssaysInstantReadingModes?.isTransitioning?.()),
    desired: window.MyEssaysInstantReadingModes?.desiredVersion?.() || '',
    activeTransition: window.MyEssaysInstantReadingModes?.activeTransitionVersion?.() || '',
    pivot: window.MyEssaysReadingPivot?.locator?.() || '',
    guard: Boolean(window.MyEssaysReadingPivotScrollGuard?.active?.()),
    checked: [...document.querySelectorAll('#readerModeShell [data-reading-mode-intent]')]
      .filter(button => button.getAttribute('aria-checked') === 'true')
      .map(button => button.dataset.readingModeIntent),
    missingClicks: window.__readingModeMissing || []
  }));
}

async function waitForMode(page, version) {
  try {
    await page.waitForFunction(expected => {
      const button = document.querySelector(`#readerModeShell [data-reading-mode-intent="${expected}"]`);
      return window.MyEssaysReaderVersions?.currentVersion?.() === expected
        && window.MyEssaysInstantReadingModes?.desiredVersion?.() === expected
        && !window.MyEssaysInstantReadingModes?.isTransitioning?.()
        && button?.getAttribute('aria-checked') === 'true';
    }, version, { timeout: 8000 });
  } catch (error) {
    console.error('RAPID_MODE_DEBUG', JSON.stringify(await modeDebugState(page)));
    throw error;
  }
}

async function burst(page, sequence, gap = 18) {
  await page.evaluate(({ sequence: versions, gap: delay }) => {
    const control = document.getElementById('readerModeShell');
    window.__readingModeMissing = [];
    versions.forEach((version, index) => {
      setTimeout(() => {
        const button = control?.querySelector(`[data-reading-mode-intent="${version}"]`);
        if (!control?.isConnected || !button) {
          window.__readingModeMissing.push({ version, connected: Boolean(control?.isConnected) });
          return;
        }
        button.click();
      }, index * delay);
    });
  }, { sequence, gap });
}

async function semanticPivot(page) {
  return page.evaluate(() => {
    const pivot = window.MyEssaysReadingPivot?.current?.();
    const locator = window.MyEssaysReadingPivot?.locator?.() || '';
    return {
      locator,
      top: pivot ? (window.MyEssaysReadingLocators?.semanticTop?.(locator, pivot) ?? pivot.getBoundingClientRect().top) : null,
      physicalTop: pivot?.getBoundingClientRect?.().top ?? null,
      active: document.querySelector('#readerModeShell [aria-checked="true"]')?.dataset.readingModeIntent || '',
      missing: window.__readingModeMissing || []
    };
  });
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  const consoleErrors = [];
  const pageErrors = [];
  page.on('console', message => { if (message.type() === 'error') consoleErrors.push(message.text()); });
  page.on('pageerror', error => pageErrors.push(String(error)));

  await openEssay(page, THREE_MODE_ID);
  await waitForDirectControl(page, 3);
  await waitForPreload(page, ['en-mix', 'es-mix']);
  await scrollIntoBody(page, 0.36, 'three-mode-initial');
  const before = await assertReadingLens(page, 'three-mode desktop', { requireUnpaintedPivot: true });

  await burst(page, ['en-mix', 'es-mix'], 18);
  await waitForMode(page, 'es-mix');
  await nextFrames(page, 3);
  const afterBurst = await semanticPivot(page);
  assert.deepEqual(afterBurst.missing, [], 'Reading Mode Shell must remain connected throughout rapid switching');
  assert.equal(afterBurst.active, 'es-mix', 'latest rapid intent must own the active control');
  assert.equal(afterBurst.locator, before.actualLocator, 'rapid switch must preserve the canonical semantic locator');
  assert.ok(Math.abs(afterBurst.top - before.actualTop) <= 3, `rapid switch moved the semantic eye-line by ${afterBurst.top - before.actualTop}px`);

  await burst(page, ['en-mix', 'ja'], 18);
  await waitForMode(page, 'ja');
  await nextFrames(page, 3);
  const returned = await semanticPivot(page);
  assert.deepEqual(returned.missing, [], 'rapid round trip must keep Reading Mode Shell mounted');
  assert.equal(returned.locator, before.actualLocator, 'rapid round trip must preserve semantic locator');
  assert.ok(Math.abs(returned.top - before.actualTop) <= 3, `rapid round trip moved eye-line by ${returned.top - before.actualTop}px`);

  await page.mouse.move(640, 400);
  await page.mouse.wheel(0, 180);
  await page.waitForFunction(previous => window.MyEssaysReadingPivot?.locator?.() !== previous, before.actualLocator, { timeout: 3000 }).catch(() => {});
  await nextFrames(page, 2);
  await assertReadingLens(page, 'three-mode after user scroll');

  await openEssay(page, TWO_MODE_ID);
  await waitForDirectControl(page, 2);
  await waitForPreload(page, ['en-mix']);
  await scrollIntoBody(page, 0.32, 'watanabe-initial');
  const watanabeBefore = await assertReadingLens(page, 'JA+EN desktop', { requireUnpaintedPivot: true });
  await burst(page, ['en-mix', 'ja'], 18);
  await waitForMode(page, 'ja');
  await nextFrames(page, 3);
  assert.equal(await page.evaluate(() => window.MyEssaysReadingPivot?.locator?.() || ''), watanabeBefore.actualLocator, 'JA+EN rapid round trip must preserve locator');

  await openEssay(page, JA_ONLY_ID);
  await scrollIntoBody(page, 0.30, 'ja-only-initial');
  await assertReadingLens(page, 'JA-only desktop', { requireUnpaintedPivot: true });
  assert.equal(await page.locator(`${CONTROL} [data-reading-mode-intent]:not(:disabled)`).count(), 1, 'JA-only article should expose only Japanese as an enabled Reading Mode');

  await page.setViewportSize({ width: 320, height: 700 });
  await openEssay(page, TWO_MODE_ID);
  await waitForDirectControl(page, 2);
  await scrollIntoBody(page, 0.34, 'watanabe-mobile');
  await assertReadingLens(page, 'JA+EN mobile', { minZoneAlpha: 0.025, maxZoneAlpha: 0.06, requireUnpaintedPivot: true });

  assert.deepEqual(pageErrors, [], `page errors: ${pageErrors.join(' | ')}`);
  assert.deepEqual(consoleErrors, [], `console errors: ${consoleErrors.join(' | ')}`);

  await browser.close();
  console.log('Reading Lens + instant language QA passed');
})().catch(error => {
  console.error(error);
  process.exit(1);
});