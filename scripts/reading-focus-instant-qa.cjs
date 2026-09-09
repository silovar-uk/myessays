const { chromium } = require('playwright');
const assert = require('node:assert/strict');

const BASE_URL = process.env.BASE_URL || 'http://127.0.0.1:4173';
const THREE_MODE_ID = 'confucius-knowing-liking-enjoying';
const TWO_MODE_ID = 'watanabe-hisanobu-same-baseball-different-chair';
const JA_ONLY_ID = 'urawa-kashima-control-the-controllable';

async function openEssay(page, id) {
  await page.goto(`${BASE_URL}/#/essay/${id}`, { waitUntil: 'networkidle' });
  await page.waitForSelector('#readerView:not([hidden])');
  await page.waitForSelector('#readerContent > p.reader-locator-block');
  await page.waitForFunction(() => Boolean(window.MyEssaysReadingPivot?.current?.()));
}

async function scrollIntoBody(page, ratio = 0.34) {
  await page.evaluate(value => {
    const max = Math.max(0, document.documentElement.scrollHeight - innerHeight);
    scrollTo({ top: max * value, behavior: 'auto' });
  }, ratio);
  await page.waitForTimeout(120);
}

async function readingFocusState(page) {
  return page.evaluate(() => {
    const content = document.getElementById('readerContent');
    const header = document.querySelector('.reader-v2-header')?.getBoundingClientRect();
    const bandTop = (header?.height ? Math.max(0, header.bottom) : 0) + 8;
    const bandBottom = Math.max(bandTop + 1, innerHeight - 18);
    const paragraphs = [...content.querySelectorAll(':scope > p.reader-locator-block[data-reading-locator]')]
      .filter(block => !block.classList.contains('language-source-hidden'));
    const visible = paragraphs.map((block, index) => {
      const rect = block.getBoundingClientRect();
      const visiblePx = Math.max(0, Math.min(rect.bottom, bandBottom) - Math.max(rect.top, bandTop));
      return { block, index, rect, visiblePx };
    }).filter(item => item.visiblePx >= Math.min(20, Math.max(1, item.rect.height)))
      .sort((a, b) => a.rect.top - b.rect.top);
    const expected = visible[1]?.block || visible[0]?.block || null;
    const actual = content.querySelector(':scope > p.is-reading-pivot');
    const style = actual ? getComputedStyle(actual) : null;
    const color = style?.backgroundColor || '';
    const alphaMatch = color.match(/rgba?\([^)]*[,\s]([\d.]+)\)$/);
    const alpha = color.startsWith('rgba') && alphaMatch ? Number(alphaMatch[1]) : (color.startsWith('rgb') ? 1 : 0);
    return {
      sameNode: Boolean(expected && actual && expected === actual),
      expectedLocator: expected?.dataset.readingLocator || '',
      actualLocator: window.MyEssaysReadingPivot?.locator?.() || actual?.dataset.readingLocator || '',
      physicalLocator: actual?.dataset.readingLocator || '',
      visibleCount: visible.length,
      alpha,
      backgroundColor: color,
      boxShadow: style?.boxShadow || '',
      actualTop: actual?.getBoundingClientRect().top ?? null
    };
  });
}

async function assertSecondVisibleFocus(page, label) {
  const state = await readingFocusState(page);
  assert.ok(state.visibleCount >= 2, `${label}: expected at least two visible body paragraphs`);
  assert.equal(state.sameNode, true, `${label}: Reading Focus must be the actual second visible paragraph; expected ${state.expectedLocator}, got physical ${state.physicalLocator}`);
  assert.ok(state.alpha >= 0.06, `${label}: Reading Focus is too faint (${state.backgroundColor})`);
  assert.ok(state.boxShadow === 'none' || state.boxShadow === '', `${label}: Reading Focus must remain background-only`);
  return state;
}

async function waitForPreload(page, versions) {
  await page.waitForFunction(expected => {
    const api = window.MyEssaysInstantReadingModes;
    return expected.every(version => api?.isPreloaded?.(version));
  }, versions);
}

async function modeDebugState(page) {
  return page.evaluate(() => ({
    current: window.MyEssaysReaderVersions?.currentVersion?.() || '',
    switching: Boolean(window.MyEssaysReaderVersions?.isSwitching?.()),
    pending: window.MyEssaysInstantReadingModes?.pendingVersion?.() || '',
    pivot: window.MyEssaysReadingPivot?.locator?.() || '',
    guard: Boolean(window.MyEssaysReadingPivotScrollGuard?.active?.()),
    desired: document.querySelector('.reader-mode-bar')?.dataset.desiredVersion || '',
    checked: [...document.querySelectorAll('.reader-language-direct-option')]
      .filter(button => button.getAttribute('aria-checked') === 'true')
      .map(button => button.dataset.readerVersion),
    trace: window.__readingModeTrace || []
  }));
}

async function waitForMode(page, version) {
  try {
    await page.waitForFunction(expected => window.MyEssaysReaderVersions?.currentVersion?.() === expected, version, { timeout: 6000 });
    await page.waitForFunction(expected => {
      const button = document.querySelector(`.reader-language-direct-option[data-reader-version="${expected}"]`);
      return button?.getAttribute('aria-checked') === 'true';
    }, version, { timeout: 6000 });
    await page.waitForFunction(() => !window.MyEssaysInstantReadingModes?.pendingVersion?.(), null, { timeout: 6000 });
  } catch (error) {
    console.error('RAPID_MODE_DEBUG', JSON.stringify(await modeDebugState(page)));
    throw error;
  }
}

async function burst(page, sequence, gap = 18) {
  await page.evaluate(({ sequence, gap }) => {
    sequence.forEach((version, index) => {
      setTimeout(() => {
        document.querySelector(`.reader-language-direct-option[data-reader-version="${version}"]`)?.click();
      }, index * gap);
    });
  }, { sequence, gap });
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  const consoleErrors = [];
  const pageErrors = [];
  page.on('console', message => { if (message.type() === 'error') consoleErrors.push(message.text()); });
  page.on('pageerror', error => pageErrors.push(String(error)));

  await openEssay(page, THREE_MODE_ID);
  await page.waitForSelector('.reader-language-direct');
  assert.equal(await page.locator('.reader-language-direct-option').count(), 3, 'three-mode article should expose JA / EN / ES');
  await waitForPreload(page, ['en-mix', 'es-mix']);

  await page.evaluate(() => {
    window.__readingModeTrace = [];
    const record = (name, event) => {
      window.__readingModeTrace.push({
        name,
        version: event.detail?.version || event.detail?.mode || '',
        reason: event.detail?.reason || '',
        locator: event.detail?.locator || '',
        current: window.MyEssaysReaderVersions?.currentVersion?.() || '',
        switching: Boolean(window.MyEssaysReaderVersions?.isSwitching?.()),
        pending: window.MyEssaysInstantReadingModes?.pendingVersion?.() || '',
        checked: [...document.querySelectorAll('.reader-language-direct-option')]
          .filter(button => button.getAttribute('aria-checked') === 'true')
          .map(button => button.dataset.readerVersion),
        t: Math.round(performance.now())
      });
    };
    ['myessays:reader-version-intent', 'myessays:reader-version-changed', 'myessays:reader-language-changed', 'myessays:reading-pivot-changed']
      .forEach(name => document.addEventListener(name, event => record(name, event)));
  });

  await scrollIntoBody(page, 0.36);
  const before = await assertSecondVisibleFocus(page, 'three-mode desktop');
  const beforeLocator = before.actualLocator;
  const beforeTop = before.actualTop;

  await burst(page, ['en-mix', 'es-mix'], 18);
  await waitForMode(page, 'es-mix');
  await page.waitForTimeout(420);
  const afterBurst = await page.evaluate(() => ({
    locator: window.MyEssaysReadingPivot?.locator?.() || '',
    top: window.MyEssaysReadingPivot?.current?.()?.getBoundingClientRect().top ?? null,
    active: document.querySelector('.reader-language-direct-option[aria-checked="true"]')?.dataset.readerVersion || ''
  }));
  assert.equal(afterBurst.active, 'es-mix', 'latest rapid intent must own the active control');
  assert.equal(afterBurst.locator, beforeLocator, 'rapid switch must preserve the canonical semantic locator');
  assert.ok(Math.abs(afterBurst.top - beforeTop) <= 3, `rapid switch moved the semantic eye-line by ${afterBurst.top - beforeTop}px`);

  await burst(page, ['en-mix', 'ja'], 18);
  await waitForMode(page, 'ja');
  await page.waitForTimeout(420);
  const returned = await page.evaluate(() => ({
    locator: window.MyEssaysReadingPivot?.locator?.() || '',
    top: window.MyEssaysReadingPivot?.current?.()?.getBoundingClientRect().top ?? null
  }));
  assert.equal(returned.locator, beforeLocator, 'rapid round trip must preserve semantic locator');
  assert.ok(Math.abs(returned.top - beforeTop) <= 3, `rapid round trip moved eye-line by ${returned.top - beforeTop}px`);

  await page.mouse.move(640, 400);
  await page.mouse.wheel(0, 180);
  await page.waitForTimeout(120);
  await assertSecondVisibleFocus(page, 'three-mode after user scroll');

  await openEssay(page, TWO_MODE_ID);
  await page.waitForSelector('.reader-language-direct');
  assert.equal(await page.locator('.reader-language-direct-option').count(), 2, 'JA+EN article should expose exactly two direct modes');
  await waitForPreload(page, ['en-mix']);
  await scrollIntoBody(page, 0.32);
  const watanabeBefore = await assertSecondVisibleFocus(page, 'JA+EN desktop');
  await burst(page, ['en-mix', 'ja'], 18);
  await waitForMode(page, 'ja');
  await page.waitForTimeout(420);
  assert.equal(await page.evaluate(() => window.MyEssaysReadingPivot?.locator?.() || ''), watanabeBefore.actualLocator, 'JA+EN rapid round trip must preserve locator');

  await openEssay(page, JA_ONLY_ID);
  await scrollIntoBody(page, 0.30);
  await assertSecondVisibleFocus(page, 'JA-only desktop');
  assert.equal(await page.locator('.reader-language-direct').count(), 0, 'JA-only article should not invent language controls');

  await page.setViewportSize({ width: 320, height: 700 });
  await openEssay(page, TWO_MODE_ID);
  await scrollIntoBody(page, 0.34);
  const mobile = await assertSecondVisibleFocus(page, 'JA+EN mobile');
  assert.ok(mobile.alpha >= 0.06, `mobile Reading Focus should remain perceptible (${mobile.backgroundColor})`);

  assert.deepEqual(pageErrors, [], `page errors: ${pageErrors.join(' | ')}`);
  assert.deepEqual(consoleErrors, [], `console errors: ${consoleErrors.join(' | ')}`);

  await browser.close();
  console.log('Reading Focus + instant language QA passed');
})().catch(error => {
  console.error(error);
  process.exit(1);
});