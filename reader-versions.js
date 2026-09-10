(() => {
  'use strict';

  const INDEX_URL = 'data/versions-index.json';
  const LANGUAGE_STORAGE_KEY = 'myessays:reader-language';
  const VERSION_DEFINITIONS = Object.freeze({
    ja: { label: '日本語', badge: 'JA', lang: 'ja' },
    'en-mix': { label: 'English Mix', badge: 'EN MIX', lang: 'en' },
    'es-mix': { label: 'Español Mix', badge: 'ES MIX', lang: 'es' }
  });
  const DISPLAY_META_KEYS = ['title', 'subtitle', 'abstract'];
  const versionCache = new Map();
  let indexPromise = null;
  let switchInFlight = false;

  function currentEssayId() {
    return window.MyEssaysRoute?.parse?.().articleId || '';
  }

  function originalEssay(id) {
    try {
      return typeof state !== 'undefined' && Array.isArray(state.essays)
        ? state.essays.find(essay => essay.id === id) || null
        : null;
    } catch {
      return null;
    }
  }

  async function versionsIndex() {
    if (!indexPromise) {
      indexPromise = fetch(INDEX_URL, { cache: 'no-store' })
        .then(response => {
          if (!response.ok) throw new Error(`versions-index.json: ${response.status}`);
          return response.json();
        })
        .then(data => ({ articles: data?.articles && typeof data.articles === 'object' ? data.articles : {} }))
        .catch(error => {
          console.warn('Reading versions index could not be loaded.', error);
          return { articles: {} };
        });
    }
    return indexPromise;
  }

  function parseVersionMarkdown(text) {
    try {
      if (typeof parseFrontMatter === 'function') return parseFrontMatter(String(text || ''));
    } catch {}

    const value = String(text || '');
    const match = value.match(/^---\n([\s\S]*?)\n---\n?/);
    if (!match) return { meta: {}, body: value };
    const meta = {};
    for (const line of match[1].split('\n')) {
      const idx = line.indexOf(':');
      if (idx === -1) continue;
      const key = line.slice(0, idx).trim();
      const raw = line.slice(idx + 1).trim();
      try { meta[key] = JSON.parse(raw); }
      catch { meta[key] = raw.replace(/^['"]|['"]$/g, ''); }
    }
    return { meta, body: value.slice(match[0].length) };
  }

  async function versionDocument(id, version) {
    if (version === 'ja') {
      const original = originalEssay(id);
      return original ? { meta: original, body: original.body } : null;
    }

    const key = `${id}:${version}`;
    if (versionCache.has(key)) return versionCache.get(key);

    const index = await versionsIndex();
    const path = index?.articles?.[id]?.[version];
    if (!path) return null;

    const task = fetch(path, { cache: 'no-store' })
      .then(response => {
        if (!response.ok) throw new Error(`${path}: ${response.status}`);
        return response.text();
      })
      .then(parseVersionMarkdown)
      .catch(error => {
        console.warn(`Reading version could not be loaded: ${id}/${version}`, error);
        return null;
      });
    versionCache.set(key, task);
    return task;
  }

  function buildVersionEssay(original, document, version) {
    if (!original || !document?.body) return null;
    const next = {
      ...original,
      body: document.body,
      metrics: typeof readingMetrics === 'function' ? readingMetrics(document.body) : original.metrics,
      __readingVersion: version
    };
    DISPLAY_META_KEYS.forEach(key => {
      const value = document?.meta?.[key];
      if (typeof value === 'string' && value.trim()) next[key] = value.trim();
    });
    next.id = original.id;
    return next;
  }

  function currentRenderedVersion() {
    try { return state?.currentEssay?.__readingVersion || 'ja'; }
    catch { return 'ja'; }
  }

  function preferredVersion() {
    try {
      const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
      return VERSION_DEFINITIONS[stored] ? stored : 'ja';
    } catch {
      return 'ja';
    }
  }

  function rememberPreferredVersion(version) {
    if (!VERSION_DEFINITIONS[version]) return;
    try { localStorage.setItem(LANGUAGE_STORAGE_KEY, version); }
    catch {}
  }

  async function availableVersions(id = currentEssayId()) {
    if (!id) return [];
    const index = await versionsIndex();
    return Object.keys(index?.articles?.[id] || {}).filter(key => VERSION_DEFINITIONS[key]);
  }

  function readerContent() {
    return document.getElementById('readerContent');
  }

  function waitForReadySignal({ id, datasetKey, datasetValue, eventName }) {
    const content = readerContent();
    if (!content) return Promise.resolve();
    if (content.dataset[datasetKey] === datasetValue && content.dataset.readerEssayId === id) {
      return Promise.resolve();
    }

    return new Promise(resolve => {
      let finished = false;
      const finish = () => {
        if (finished) return;
        finished = true;
        document.removeEventListener(eventName, onReady);
        window.clearTimeout(timeout);
        resolve();
      };
      const onReady = event => {
        if (event.detail?.essayId === id) finish();
      };
      const timeout = window.setTimeout(finish, 500);
      document.addEventListener(eventName, onReady);
    });
  }

  function waitForPairIdentity(id) {
    return waitForReadySignal({
      id,
      datasetKey: 'pairIdentity',
      datasetValue: 'ready',
      eventName: 'myessays:pair-identity-ready'
    });
  }

  function waitForSemanticLocators(id) {
    return waitForReadySignal({
      id,
      datasetKey: 'semanticLocators',
      datasetValue: 'ready',
      eventName: 'myessays:semantic-locators-ready'
    });
  }

  function setDisclosureOpen(switcher, open, { focusTrigger = false } = {}) {
    if (!switcher) return;
    const trigger = switcher.querySelector('.reader-language-trigger');
    const menu = switcher.querySelector('.reader-language-menu');
    const nextOpen = Boolean(open && !switcher.hidden);
    switcher.classList.toggle('is-open', nextOpen);
    if (trigger) trigger.setAttribute('aria-expanded', String(nextOpen));
    if (menu) menu.hidden = !nextOpen;
    if (!nextOpen && focusTrigger) trigger?.focus();
  }

  function requestLegacyVersion(version) {
    if (!VERSION_DEFINITIONS[version]) return false;
    const coordinator = window.MyEssaysInstantReadingModes;
    if (coordinator?.requestVersion) return coordinator.requestVersion(version, 'legacy-switch');

    // Compatibility fallback for pages that load Reader Versions without the
    // Instant coordinator. Capture semantic ownership before the DOM swap, but
    // leave all actual eye-line correction to Pivot / Reading Locators.
    window.MyEssaysReadingPivot?.captureForSwitch?.();
    window.MyEssaysReadingLocators?.captureForSwitch?.();
    return switchVersion(version);
  }

  function ensureSwitchElement() {
    let switcher = document.getElementById('readerLanguageSwitch');
    if (switcher) return switcher;

    switcher = document.createElement('div');
    switcher.id = 'readerLanguageSwitch';
    switcher.className = 'reader-language-switch';
    switcher.hidden = true;
    switcher.setAttribute('aria-label', '表示言語');
    switcher.innerHTML = `
      <button class="reader-language-trigger" type="button" aria-expanded="false" aria-controls="readerLanguageMenu" aria-haspopup="menu">
        <span class="reader-language-current">JA</span>
        <span class="reader-language-chevron" aria-hidden="true">⌄</span>
      </button>
      <div id="readerLanguageMenu" class="reader-language-menu" role="menu" aria-label="表示言語を選択" hidden>
        <span class="reader-language-menu-label">LANGUAGE</span>
        <div class="reader-language-options"></div>
      </div>`;

    switcher.addEventListener('click', event => {
      const trigger = event.target.closest('.reader-language-trigger');
      if (trigger) {
        setDisclosureOpen(switcher, trigger.getAttribute('aria-expanded') !== 'true');
        return;
      }

      const button = event.target.closest('[data-reader-version]');
      if (!button || button.disabled) return;
      const next = button.dataset.readerVersion;
      if (!VERSION_DEFINITIONS[next]) return;
      setDisclosureOpen(switcher, false);
      if (next === currentRenderedVersion()) {
        rememberPreferredVersion(next);
        return;
      }
      requestLegacyVersion(next);
    });

    document.body.append(switcher);
    return switcher;
  }

  function renderDisclosure(switcher, available, activeVersion) {
    const triggerCurrent = switcher.querySelector('.reader-language-current');
    const options = switcher.querySelector('.reader-language-options');
    if (!triggerCurrent || !options) return;

    const versions = ['ja', ...available.filter(key => key !== 'ja' && VERSION_DEFINITIONS[key])];
    const activeDefinition = VERSION_DEFINITIONS[activeVersion] || VERSION_DEFINITIONS.ja;
    triggerCurrent.textContent = activeDefinition.badge;
    switcher.querySelector('.reader-language-trigger')?.setAttribute('aria-label', `表示言語: ${activeDefinition.label}`);

    options.innerHTML = versions.map(version => {
      const definition = VERSION_DEFINITIONS[version];
      const active = version === activeVersion;
      return `<button type="button" role="menuitemradio" data-reader-version="${version}" class="reader-language-option${active ? ' is-active' : ''}" aria-checked="${active}"><span class="reader-language-check" aria-hidden="true">${active ? '✓' : ''}</span><span>${definition.label}</span><small>${definition.badge}</small></button>`;
    }).join('');
  }

  async function switchVersion(version) {
    if (switchInFlight || !VERSION_DEFINITIONS[version]) return false;
    const id = currentEssayId();
    if (!id) return false;
    const original = originalEssay(id);
    if (!original || typeof showReader !== 'function') return false;

    if (version === currentRenderedVersion()) {
      rememberPreferredVersion(version);
      return true;
    }

    switchInFlight = true;
    try {
      let nextEssay = original;
      if (version !== 'ja') {
        const document = await versionDocument(id, version);
        if (!document || id !== currentEssayId()) return false;
        nextEssay = buildVersionEssay(original, document, version);
        if (!nextEssay) return false;
      }

      const locator = window.MyEssaysReadingPivot?.locator?.() || '';
      const pairId = window.MyEssaysReadingPivot?.current?.()?.dataset?.pairId || '';
      const content = readerContent();
      if (content) {
        content.dataset.pairIdentity = '';
        content.dataset.semanticLocators = '';
      }

      // Reader Versions owns only the content swap. showReader may reset the
      // page while rebuilding the DOM; semantic eye-line restoration belongs
      // exclusively to Reading Pivot + Reading Locators after readiness.
      showReader(nextEssay);

      await Promise.all([
        waitForPairIdentity(id),
        waitForSemanticLocators(id)
      ]);
      if (id !== currentEssayId()) return false;

      rememberPreferredVersion(version);
      document.dispatchEvent(new CustomEvent('myessays:reader-version-changed', {
        detail: { essayId: id, version, locator, pairId }
      }));

      document.dispatchEvent(new CustomEvent('myessays:reader-language-changed', {
        detail: { essayId: id, mode: version, locator, pairId }
      }));
      return true;
    } finally {
      switchInFlight = false;
    }
  }

  async function ensureVersionSwitch() {
    const switcher = ensureSwitchElement();
    const id = currentEssayId();
    const reader = document.getElementById('readerView');
    const readerIsOpen = Boolean(id && reader && !reader.hidden);
    if (!readerIsOpen) {
      switcher.hidden = true;
      setDisclosureOpen(switcher, false);
      return;
    }

    const available = await availableVersions(id);
    if (id !== currentEssayId()) return;
    const hasAlternative = available.length > 0;
    switcher.hidden = !hasAlternative;
    if (!hasAlternative) {
      setDisclosureOpen(switcher, false);
      return;
    }

    // This legacy disclosure mirrors the actual rendered version only. Route
    // intent, saved preference, rapid clicks and all transition starts belong
    // to the Instant coordinator.
    renderDisclosure(switcher, available, currentRenderedVersion());
  }

  function renderRoot(markdown) {
    const root = document.createElement('div');
    const render = window.MyEssaysMarkdown?.render || window.renderMarkdown;
    if (typeof render === 'function') root.innerHTML = render(markdown || '');
    return root;
  }

  async function rootForVersion(id, version) {
    const original = originalEssay(id);
    if (!original) return null;
    const canonicalRoot = renderRoot(original.body || '');
    window.MyEssaysPairIdentity?.annotateCanonical?.(canonicalRoot);
    if (version === 'ja') return canonicalRoot;

    const document = await versionDocument(id, version);
    if (!document?.body) return null;
    const root = renderRoot(document.body);
    window.MyEssaysPairIdentity?.annotateAgainstCanonical?.(root, canonicalRoot);
    return root;
  }

  const publicApi = Object.freeze({
    definitions: VERSION_DEFINITIONS,
    currentEssayId,
    currentVersion: currentRenderedVersion,
    preferredVersion,
    availableVersions,
    getVersionDocument: versionDocument,
    rootForVersion,
    switchVersion,
    isSwitching: () => switchInFlight
  });
  window.MyEssaysReaderVersions = publicApi;

  function syncAfterRender() {
    if (!currentEssayId()) return;
    requestAnimationFrame(ensureVersionSwitch);
  }

  document.addEventListener('click', event => {
    const switcher = document.getElementById('readerLanguageSwitch');
    if (!switcher || switcher.hidden || !switcher.classList.contains('is-open')) return;
    if (!switcher.contains(event.target)) setDisclosureOpen(switcher, false);
  });

  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    const switcher = document.getElementById('readerLanguageSwitch');
    if (!switcher?.classList.contains('is-open')) return;
    event.preventDefault();
    event.stopPropagation();
    setDisclosureOpen(switcher, false, { focusTrigger: true });
  });

  document.addEventListener('myessays:reader-rendered', syncAfterRender);
  document.addEventListener('myessays:reader-ready', ensureVersionSwitch);
  document.addEventListener('myessays:reader-version-changed', ensureVersionSwitch);
  window.addEventListener('hashchange', () => {
    const switcher = document.getElementById('readerLanguageSwitch');
    setDisclosureOpen(switcher, false);
    requestAnimationFrame(ensureVersionSwitch);
  });
  window.addEventListener('pageshow', () => requestAnimationFrame(ensureVersionSwitch));

  document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', ensureVersionSwitch)
    : ensureVersionSwitch();
})();