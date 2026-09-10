const { chromium } = require('playwright');

const BASE_URL = process.env.BASE_URL || 'http://127.0.0.1:4173';
const THREE = 'confucius-knowing-liking-enjoying';
const TWO = 'watanabe-hisanobu-same-baseball-different-chair';

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function openCase(browser, { id, lang, preferred, expectedVersion, expectedLang }) {
  const context = await browser.newContext();
  if (preferred) await context.addInitScript(value => localStorage.setItem('myessays:reader-language', value), preferred);
  const page = await context.newPage();
  const suffix = lang === undefined ? '' : `?lang=${encodeURIComponent(lang)}`;
  const label = `${id} lang=${lang === undefined ? '(none)' : lang} preferred=${preferred || '(none)'} -> ${expectedVersion}/${expectedLang}`;
  console.log('URL_CASE', label);
  await page.goto(`${BASE_URL}/#/essay/${encodeURIComponent(id)}${suffix}`, { waitUntil: 'domcontentloaded' });
  try {
    await page.waitForFunction(({ expectedVersion, expectedLang, id }) => {
      const route = window.MyEssaysRoute?.parse?.();
      return route?.articleId === id
        && route?.lang === expectedLang
        && window.MyEssaysReaderVersions?.currentVersion?.() === expectedVersion
        && !window.MyEssaysInstantReadingModes?.isTransitioning?.()
        && !document.getElementById('readerView')?.hidden;
    }, { expectedVersion, expectedLang, id }, { timeout: 10000 });
  } catch (error) {
    const debug = await page.evaluate(requested => ({
      requested,
      hash: location.hash,
      route: window.MyEssaysRoute?.parse?.() || null,
      readerHidden: document.getElementById('readerView')?.hidden ?? null,
      stateId: typeof state !== 'undefined' ? state.currentEssay?.id || '' : '',
      readerEssayId: document.getElementById('readerContent')?.dataset.readerEssayId || '',
      pairIdentity: document.getElementById('readerContent')?.dataset.pairIdentity || '',
      semanticLocators: document.getElementById('readerContent')?.dataset.semanticLocators || '',
      current: window.MyEssaysReaderVersions?.currentVersion?.() || '',
      switching: Boolean(window.MyEssaysReaderVersions?.isSwitching?.()),
      desired: window.MyEssaysInstantReadingModes?.desiredVersion?.() || '',
      transitioning: Boolean(window.MyEssaysInstantReadingModes?.isTransitioning?.()),
      activeTransition: window.MyEssaysInstantReadingModes?.activeTransitionVersion?.() || '',
      checked: document.querySelector('#readerLanguageInstantDirect [aria-checked="true"]')?.dataset.readingModeIntent || '',
      pivot: window.MyEssaysReadingPivot?.locator?.() || '',
      locatorAnchor: Boolean(window.MyEssaysReadingLocators?.hasSwitchAnchor?.()),
      pivotAnchor: Boolean(window.MyEssaysReadingPivot?.hasPendingSwitchAnchor?.()),
      guard: Boolean(window.MyEssaysReadingPivotScrollGuard?.active?.())
    }), { id, lang, preferred, expectedVersion, expectedLang });
    console.error('URL_MODE_DEBUG', JSON.stringify(debug));
    await context.close();
    throw error;
  }
  const state = await page.evaluate(() => ({
    route: window.MyEssaysRoute.parse(),
    current: window.MyEssaysReaderVersions.currentVersion(),
    desired: window.MyEssaysInstantReadingModes.desiredVersion(),
    checked: document.querySelector('#readerLanguageInstantDirect [aria-checked="true"]')?.dataset.readingModeIntent || ''
  }));
  assert(state.route.articleId === id, `article identity mismatch: ${JSON.stringify(state)}`);
  assert(state.route.lang === expectedLang, `URL language mismatch: ${JSON.stringify(state)}`);
  assert(state.current === expectedVersion, `actual version mismatch: ${JSON.stringify(state)}`);
  assert(state.desired === expectedVersion, `desired version mismatch: ${JSON.stringify(state)}`);
  if (id === THREE || id === TWO) assert(state.checked === expectedVersion, `active radio mismatch: ${JSON.stringify(state)}`);
  return { context, page };
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  try {
    for (const [lang, expectedVersion] of [['ja', 'ja'], ['en', 'en-mix'], ['es', 'es-mix']]) {
      const { context } = await openCase(browser, { id: THREE, lang, expectedVersion, expectedLang: lang });
      await context.close();
    }

    { const { context } = await openCase(browser, { id: THREE, lang: 'ja', preferred: 'en-mix', expectedVersion: 'ja', expectedLang: 'ja' }); await context.close(); }
    { const { context } = await openCase(browser, { id: THREE, preferred: 'en-mix', expectedVersion: 'en-mix', expectedLang: 'en' }); await context.close(); }
    { const { context } = await openCase(browser, { id: THREE, lang: 'foo', expectedVersion: 'ja', expectedLang: 'ja' }); await context.close(); }
    { const { context } = await openCase(browser, { id: TWO, lang: 'es', expectedVersion: 'ja', expectedLang: 'ja' }); await context.close(); }

    const { context, page } = await openCase(browser, { id: THREE, lang: 'ja', expectedVersion: 'ja', expectedLang: 'ja' });
    await page.evaluate(() => {
      const control = document.getElementById('readerLanguageInstantDirect');
      control.querySelector('[data-reading-mode-intent="en-mix"]').click();
      setTimeout(() => control.querySelector('[data-reading-mode-intent="es-mix"]').click(), 18);
    });
    await page.waitForFunction(() => window.MyEssaysRoute?.parse?.().lang === 'es', null, { timeout: 1000 });
    await page.waitForFunction(() => window.MyEssaysReaderVersions?.currentVersion?.() === 'es-mix'
      && window.MyEssaysInstantReadingModes?.desiredVersion?.() === 'es-mix'
      && !window.MyEssaysInstantReadingModes?.isTransitioning?.(), null, { timeout: 10000 });
    const final = await page.evaluate(() => ({ hash: location.hash, route: window.MyEssaysRoute.parse(), current: window.MyEssaysReaderVersions.currentVersion(), desired: window.MyEssaysInstantReadingModes.desiredVersion() }));
    assert(final.hash.endsWith('?lang=es'), `rapid URL did not keep latest intent: ${JSON.stringify(final)}`);
    assert(final.current === 'es-mix' && final.desired === 'es-mix', `rapid runtime mismatch: ${JSON.stringify(final)}`);

    await page.reload({ waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() => window.MyEssaysReaderVersions?.currentVersion?.() === 'es-mix' && window.MyEssaysRoute?.parse?.().lang === 'es', null, { timeout: 10000 });
    await context.close();
    console.log('Reading Mode URL QA passed');
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exit(1); });
