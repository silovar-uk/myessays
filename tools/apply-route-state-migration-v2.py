from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def read(path):
    return (ROOT / path).read_text(encoding='utf-8')


def write(path, text):
    (ROOT / path).write_text(text, encoding='utf-8')


def replace_once(text, old, new, label):
    count = text.count(old)
    if count != 1:
        raise SystemExit(f'{label}: expected 1 match, found {count}')
    return text.replace(old, new, 1)


# app.js owns navigation, but not hash parsing details.
app = read('app.js')
app = replace_once(
    app,
    "function openEssay(id) { location.hash = `#/essay/${encodeURIComponent(id)}`; }",
    "function openEssay(id) { window.MyEssaysRoute.navigateEssay(id); }",
    'app openEssay'
)
app = replace_once(
    app,
    "function route() {\n  const match = location.hash.match(/^#\\/essay\\/(.+)$/);\n  if (!match) { showLibrary(); return; }\n  const essay = state.essays.find(e => e.id === decodeURIComponent(match[1]));\n  essay ? showReader(essay) : showLibrary();\n}",
    "function route() {\n  const currentRoute = window.MyEssaysRoute.parse();\n  if (currentRoute.type !== 'essay' || !currentRoute.articleId) { showLibrary(); return; }\n  const essay = state.essays.find(e => e.id === currentRoute.articleId);\n  essay ? showReader(essay) : showLibrary();\n}",
    'app route'
)
write('app.js', app)

# Reader runtimes share one article identity parser.
simple_parser = """    const match = location.hash.match(/^#\\/essay\\/(.+)$/);\n    if (!match) return '';\n    try { return decodeURIComponent(match[1]); }\n    catch { return match[1]; }"""
for filename in ['reader-versions.js', 'reading-locators.js', 'reader-reading-pivot.js', 'reader-v2.js']:
    text = read(filename)
    text = replace_once(text, simple_parser, "    return window.MyEssaysRoute?.parse?.().articleId || '';", f'{filename} route parser')
    write(filename, text)

instant = read('reader-language-instant.js')
instant_old_parser = """  function currentEssayId() {\n    return versions()?.currentEssayId?.() || (() => {\n      const match = location.hash.match(/^#\\/essay\\/(.+)$/);\n      if (!match) return '';\n      try { return decodeURIComponent(match[1]); }\n      catch { return match[1]; }\n    })();\n  }"""
instant = replace_once(
    instant,
    instant_old_parser,
    """  function currentEssayId() {\n    return versions()?.currentEssayId?.() || routeApi()?.parse?.().articleId || '';\n  }""",
    'instant route parser'
)

# Explicit URL language wins inside reader-versions itself, removing startup race.
versions = read('reader-versions.js')
versions = replace_once(
    versions,
    """    const rendered = currentRenderedVersion();\n    const preferred = preferredVersion();\n    let desired = rendered;\n    if (!switchInFlight) {\n      desired = preferred === 'ja' || available.includes(preferred) ? preferred : 'ja';\n    }""",
    """    const rendered = currentRenderedVersion();\n    const routeState = window.MyEssaysRoute?.parse?.();\n    const routeVersion = routeState?.type === 'essay' && routeState.articleId === id && routeState.hasLang\n      ? (routeState.langValid ? window.MyEssaysRoute.versionForLang(routeState.lang) : 'ja')\n      : '';\n    const preferred = routeVersion || preferredVersion();\n    let desired = rendered;\n    if (!switchInFlight) {\n      desired = preferred === 'ja' || available.includes(preferred) ? preferred : 'ja';\n    }""",
    'reader-versions URL priority'
)
write('reader-versions.js', versions)

# Instant Controller owns public URL language <-> desired version synchronization.
instant = replace_once(instant, "  let controlSignature = '';\n  const preloadedVersions = new Set();", "  let controlSignature = '';\n  let routeSyncToken = 0;\n  const preloadedVersions = new Set();", 'instant route token')
instant = replace_once(
    instant,
    "  const versions = () => window.MyEssaysReaderVersions;",
    """  const versions = () => window.MyEssaysReaderVersions;\n  const routeApi = () => window.MyEssaysRoute;\n\n  function syncUrlToVersion(version) {\n    const router = routeApi();\n    const id = currentEssayId();\n    if (!router || !id) return false;\n    return router.replaceEssayLanguage(router.langForVersion(version), id);\n  }""",
    'instant route helpers'
)
instant = replace_once(
    instant,
    """  function settleToActual() {\n    const actual = versions()?.currentVersion?.() || 'ja';\n    desiredVersion = actual;\n    transitionActive = false;\n    activeTransitionVersion = '';\n    renderIntent(actual);\n  }""",
    """  function settleToActual() {\n    const actual = versions()?.currentVersion?.() || 'ja';\n    desiredVersion = actual;\n    transitionActive = false;\n    activeTransitionVersion = '';\n    renderIntent(actual);\n    syncUrlToVersion(actual);\n  }""",
    'instant settle URL'
)
instant = replace_once(
    instant,
    """        if (desiredVersion && desiredVersion !== actual) startTransition(desiredVersion);\n        else settleToActual();""",
    """        if (desiredVersion && desiredVersion !== version && desiredVersion !== actual) startTransition(desiredVersion);\n        else settleToActual();""",
    'instant rejected switch'
)
instant = replace_once(
    instant,
    """      if (desiredVersion && desiredVersion !== actual) startTransition(desiredVersion);\n      else settleToActual();""",
    """      if (desiredVersion && desiredVersion !== version && desiredVersion !== actual) startTransition(desiredVersion);\n      else settleToActual();""",
    'instant failed switch'
)
instant = replace_once(
    instant,
    """    desiredVersion = version;\n    renderIntent(version);\n    dispatchIntent(version, source);\n    warmVersion(version);""",
    """    desiredVersion = version;\n    renderIntent(version);\n    syncUrlToVersion(version);\n    dispatchIntent(version, source);\n    warmVersion(version);""",
    'instant intent URL'
)
instant = replace_once(
    instant,
    """    desiredVersion = actual;\n    renderIntent(actual);\n    document.dispatchEvent(new CustomEvent('myessays:reading-mode-settled', {""",
    """    desiredVersion = actual;\n    renderIntent(actual);\n    syncUrlToVersion(actual);\n    document.dispatchEvent(new CustomEvent('myessays:reading-mode-settled', {""",
    'instant stable URL'
)
instant = replace_once(
    instant,
    """  function resetForRoute() {\n    transitionActive = false;""",
    """  async function syncFromRoute() {\n    const api = versions();\n    const router = routeApi();\n    const routeState = router?.parse?.();\n    const id = routeState?.articleId || '';\n    const view = document.getElementById('readerView');\n    if (!api || !router || routeState?.type !== 'essay' || !id || !view || view.hidden || !api.availableVersions) return false;\n\n    const token = ++routeSyncToken;\n    const available = await api.availableVersions(id);\n    if (token !== routeSyncToken || id !== currentEssayId()) return false;\n    const allowed = new Set(['ja', ...available]);\n\n    let target = 'ja';\n    if (routeState.hasLang) {\n      target = routeState.langValid ? router.versionForLang(routeState.lang) : 'ja';\n    } else {\n      const preferred = api.preferredVersion?.() || 'ja';\n      target = allowed.has(preferred) ? preferred : 'ja';\n    }\n    if (!allowed.has(target)) target = 'ja';\n\n    desiredVersion = target;\n    renderIntent(target);\n    router.replaceEssayLanguage(router.langForVersion(target), id);\n    warmVersion(target);\n\n    if (transitionActive || api.isSwitching?.()) return true;\n    if (target === api.currentVersion?.()) {\n      settleToActual();\n      return true;\n    }\n    return startTransition(target);\n  }\n\n  function scheduleRouteSync() {\n    requestAnimationFrame(() => syncFromRoute());\n  }\n\n  function resetForRoute() {\n    transitionActive = false;""",
    'instant route sync'
)
instant = replace_once(instant, """    desiredVersion = '';\n    preloadToken += 1;\n    controlToken += 1;""", """    desiredVersion = '';\n    routeSyncToken += 1;\n    preloadToken += 1;\n    controlToken += 1;""", 'instant reset token')
instant = replace_once(instant, """    schedulePreload();\n    schedulePersistentControl();\n  }\n\n  document.addEventListener('click', handleIntentClick, true);""", """    schedulePreload();\n    schedulePersistentControl();\n    scheduleRouteSync();\n  }\n\n  document.addEventListener('click', handleIntentClick, true);""", 'instant reset route sync')
instant = replace_once(
    instant,
    """  document.addEventListener('myessays:reader-ready', () => {\n    schedulePreload();\n    schedulePersistentControl();\n  });\n  document.addEventListener('myessays:reader-rendered', schedulePersistentControl);""",
    """  document.addEventListener('myessays:reader-ready', () => {\n    schedulePreload();\n    schedulePersistentControl();\n    scheduleRouteSync();\n  });\n  document.addEventListener('myessays:reader-rendered', () => {\n    schedulePersistentControl();\n    scheduleRouteSync();\n  });""",
    'instant reader events'
)
instant = replace_once(instant, """    renderIntent,\n    syncControl: syncPersistentControl\n  });""", """    renderIntent,\n    syncControl: syncPersistentControl,\n    syncFromRoute\n  });""", 'instant public api')
instant = replace_once(
    instant,
    """        schedulePreload();\n        schedulePersistentControl();\n      }, { once: true })\n    : (() => {\n        schedulePreload();\n        schedulePersistentControl();\n      })();""",
    """        schedulePreload();\n        schedulePersistentControl();\n        scheduleRouteSync();\n      }, { once: true })\n    : (() => {\n        schedulePreload();\n        schedulePersistentControl();\n        scheduleRouteSync();\n      })();""",
    'instant startup route sync'
)
write('reader-language-instant.js', instant)

# Route ownership and cache tests.
route_test = read('tests/route-state.test.js')
if 'runtime modules use the shared essay route parser' not in route_test:
    route_test += r'''

test('runtime modules use the shared essay route parser instead of parsing essay hashes independently', () => {
  const runtimeFiles = fs.readdirSync(root).filter(file => file.endsWith('.js') && file !== 'route-state.js');
  for (const file of runtimeFiles) {
    const text = fs.readFileSync(path.join(root, file), 'utf8');
    assert.equal(text.includes("location.hash.match(/^#\\/essay\\/"), false, `${file} still owns essay route parsing`);
  }
  const app = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
  assert.match(app, /MyEssaysRoute\.parse\(\)/);
  assert.match(app, /MyEssaysRoute\.navigateEssay\(id\)/);
});
'''
write('tests/route-state.test.js', route_test)

runtime_test = read('tests/runtime-assets.test.js')
old_cache = """test('current Reading Focus runtime assets use September cache keys', () => {\n  const html = read('index.html');\n  assert.match(html, /reading-locators\\.js\\?v=20260909-/);\n  assert.match(html, /reader-language-instant\\.js\\?v=20260909-/);\n  assert.match(html, /reader-reading-pivot\\.js\\?v=20260909-/);\n  assert.match(html, /reader-reading-pivot\\.css\\?v=20260909-/);\n  assert.match(html, /reader-reading-pivot-scroll-guard\\.js\\?v=20260909-/);\n  assert.doesNotMatch(html, /reading-locators\\.js\\?v=20260829-/);\n});"""
new_cache = """test('shareable Reading Mode runtime assets use current cache keys and route state loads first', () => {\n  const html = read('index.html');\n  assert.match(html, /route-state\\.js\\?v=20260910-/);\n  assert.match(html, /app\\.js\\?v=20260910-/);\n  assert.match(html, /reading-locators\\.js\\?v=20260910-/);\n  assert.match(html, /reader-language-instant\\.js\\?v=20260910-/);\n  assert.match(html, /reader-versions\\.js\\?v=20260910-/);\n  assert.match(html, /reader-v2\\.js\\?v=20260910-/);\n  assert.match(html, /reader-reading-pivot\\.js\\?v=20260910-/);\n  assert.match(html, /reader-reading-pivot\\.css\\?v=20260909-/);\n  assert.match(html, /reader-reading-pivot-scroll-guard\\.js\\?v=20260909-/);\n  assert.ok(html.indexOf('route-state.js') < html.indexOf('app.js'), 'route-state.js must load before app.js');\n});"""
runtime_test = replace_once(runtime_test, old_cache, new_cache, 'runtime cache test')
write('tests/runtime-assets.test.js', runtime_test)

# Cache-busted route state is loaded before app; every changed runtime gets a new key.
html = read('index.html')
html = replace_once(html, '  <script src="app.js?v=20260829-2045" defer></script>', '  <script src="route-state.js?v=20260910-1" defer></script>\n  <script src="app.js?v=20260910-1" defer></script>', 'index route script')
for old, new in {
    'reader-language-instant.js?v=20260909-2': 'reader-language-instant.js?v=20260910-1',
    'reading-locators.js?v=20260909-4': 'reading-locators.js?v=20260910-1',
    'reader-versions.js?v=20260907-2': 'reader-versions.js?v=20260910-1',
    'reader-v2.js?v=20260907-1': 'reader-v2.js?v=20260910-1',
    'reader-reading-pivot.js?v=20260909-5': 'reader-reading-pivot.js?v=20260910-1',
}.items():
    html = replace_once(html, old, new, f'cache {old}')
write('index.html', html)

# Dedicated browser QA for shareable language URLs.
write('scripts/reading-mode-url-qa.cjs', r'''const { chromium } = require('playwright');

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
  await page.goto(`${BASE_URL}/#/essay/${encodeURIComponent(id)}${suffix}`, { waitUntil: 'domcontentloaded' });
  await page.waitForFunction(({ expectedVersion, expectedLang, id }) => {
    const route = window.MyEssaysRoute?.parse?.();
    return route?.articleId === id
      && route?.lang === expectedLang
      && window.MyEssaysReaderVersions?.currentVersion?.() === expectedVersion
      && !window.MyEssaysInstantReadingModes?.isTransitioning?.()
      && !document.getElementById('readerView')?.hidden;
  }, { expectedVersion, expectedLang, id }, { timeout: 10000 });
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
''')

workflow = read('.github/workflows/visual-qa.yml')
if 'Run Reading Mode URL QA' not in workflow:
    workflow = replace_once(
        workflow,
        """      - name: Run reading locator diagnostic\n        env:\n          BASE_URL: http://127.0.0.1:4173\n        run: node scripts/reading-locator-diagnostic.cjs\n\n      - name: Run Reading Focus and instant language QA""",
        """      - name: Run reading locator diagnostic\n        env:\n          BASE_URL: http://127.0.0.1:4173\n        run: node scripts/reading-locator-diagnostic.cjs\n\n      - name: Run Reading Mode URL QA\n        env:\n          BASE_URL: http://127.0.0.1:4173\n        run: node scripts/reading-mode-url-qa.cjs\n\n      - name: Run Reading Focus and instant language QA""",
        'visual QA URL step'
    )
write('.github/workflows/visual-qa.yml', workflow)

print('Route state migration v2 applied.')
