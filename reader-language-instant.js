(() => {
  'use strict';

  if (window.MyEssaysInstantReadingModes?.installed) return;

  let pendingVersion = '';
  let preloadToken = 0;
  let handoffFrame = 0;
  let preloadEssayId = '';
  const preloadedVersions = new Set();

  const versions = () => window.MyEssaysReaderVersions;

  function requestedVersion(target) {
    if (!target) return '';
    if (target.classList.contains('language-lens-full')) {
      return document.getElementById('languageLensPanel')?.dataset.targetVersion || '';
    }
    return target.dataset.readerModeVersion || target.dataset.readerVersion || '';
  }

  function escapeSelector(value = '') {
    if (window.CSS?.escape) return CSS.escape(String(value));
    return String(value).replace(/(["\\#.;?+*~':!^$\[\]()=>|/@])/g, '\\$1');
  }

  function applyIntent(version) {
    if (!version) return;

    document.querySelectorAll('[data-reader-mode-version]').forEach(button => {
      const active = button.dataset.readerModeVersion === version;
      button.classList.toggle('is-active', active);
      if (button.getAttribute('role') === 'radio') button.setAttribute('aria-checked', String(active));
      if (button.hasAttribute('aria-pressed')) button.setAttribute('aria-pressed', String(active));
    });

    document.querySelectorAll('.reader-language-option[data-reader-version]').forEach(button => {
      const active = button.dataset.readerVersion === version;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-checked', String(active));
    });

    const bar = document.querySelector('.reader-mode-bar');
    if (bar) bar.dataset.desiredVersion = version;

    document.dispatchEvent(new CustomEvent('myessays:reader-version-intent', {
      detail: {
        essayId: versions()?.currentEssayId?.() || '',
        version
      }
    }));
  }

  function resetPreloadState(id = '') {
    preloadEssayId = id;
    preloadedVersions.clear();
  }

  async function preloadCurrentArticle() {
    const api = versions();
    const id = api?.currentEssayId?.() || '';
    if (!api || !id || !api.availableVersions || !api.getVersionDocument) return [];

    if (preloadEssayId !== id) resetPreloadState(id);
    const token = ++preloadToken;
    const available = await api.availableVersions(id);
    if (token !== preloadToken || id !== api.currentEssayId?.()) return [];

    const derived = available.filter(version => version !== 'ja');
    const results = await Promise.allSettled(derived.map(async version => {
      const document = await api.getVersionDocument(id, version);
      if (document && token === preloadToken && id === api.currentEssayId?.()) {
        preloadedVersions.add(version);
        return version;
      }
      return '';
    }));

    if (token === preloadToken && id === api.currentEssayId?.()) {
      document.dispatchEvent(new CustomEvent('myessays:reader-versions-preloaded', {
        detail: { essayId: id, versions: [...preloadedVersions] }
      }));
    }

    return results
      .filter(result => result.status === 'fulfilled' && result.value)
      .map(result => result.value);
  }

  function schedulePreload() {
    requestAnimationFrame(() => preloadCurrentArticle());
  }

  function warmVersion(version) {
    const api = versions();
    const id = api?.currentEssayId?.() || '';
    if (!id || !version || version === 'ja' || preloadedVersions.has(version)) return;
    Promise.resolve(api?.getVersionDocument?.(id, version)).then(document => {
      if (document && id === api?.currentEssayId?.()) preloadedVersions.add(version);
    });
  }

  function handleIntentClick(event) {
    const target = event.target instanceof Element
      ? event.target.closest('[data-reader-mode-version],[data-reader-version],.language-lens-full')
      : null;
    if (!target) return;

    const api = versions();
    const next = requestedVersion(target);
    if (!api || !next || !api.definitions?.[next]) return;

    const current = api.currentVersion?.() || 'ja';
    if (next === current && !api.isSwitching?.()) {
      pendingVersion = '';
      applyIntent(current);
      return;
    }

    // Visual intent is immediate, even while the previous semantic handoff is
    // still completing. This makes the control feel responsive without letting
    // two DOM replacements race each other.
    applyIntent(next);

    if (!api.isSwitching?.()) {
      pendingVersion = '';
      return; // normal click continues through the existing semantic pipeline
    }

    // Latest intent wins. Do not let the older locator queue or mode-bar click
    // handler capture an unstable intermediate DOM. Only the newest request is
    // replayed after the current semantic handoff is complete.
    pendingVersion = next;
    event.preventDefault();
    event.stopImmediatePropagation();
  }

  function replayLatestIntent() {
    window.cancelAnimationFrame(handoffFrame);
    handoffFrame = requestAnimationFrame(() => {
      handoffFrame = 0;
      const api = versions();
      const next = pendingVersion;
      if (!api || !next) return;

      if (api.isSwitching?.()) {
        // The language-changed event is synchronous inside switchVersion; one
        // frame later the finally block should have released the transition.
        replayLatestIntent();
        return;
      }

      pendingVersion = '';
      if (next === api.currentVersion?.()) {
        applyIntent(next);
        return;
      }

      applyIntent(next);
      const selector = `[data-reader-mode-version="${escapeSelector(next)}"]`;
      const button = document.querySelector(selector);
      if (button) {
        button.click();
        return;
      }

      // Defensive fallback for a temporarily rebuilt mode bar. Preserve the
      // current Ghost Anchor before invoking the same shared version runtime.
      window.MyEssaysReadingPivot?.captureForSwitch?.();
      api.switchVersion?.(next);
    });
  }

  function syncAfterActualVersion(event) {
    const actual = event.detail?.version || event.detail?.mode || versions()?.currentVersion?.() || 'ja';
    if (pendingVersion && pendingVersion !== actual) {
      requestAnimationFrame(() => applyIntent(pendingVersion));
    } else {
      applyIntent(actual);
    }
    schedulePreload();
  }

  document.addEventListener('click', handleIntentClick, true);
  document.addEventListener('pointerover', event => {
    const target = event.target instanceof Element
      ? event.target.closest('[data-reader-mode-version],[data-reader-version]')
      : null;
    warmVersion(requestedVersion(target));
  }, true);
  document.addEventListener('focusin', event => {
    const target = event.target instanceof Element
      ? event.target.closest('[data-reader-mode-version],[data-reader-version]')
      : null;
    warmVersion(requestedVersion(target));
  });

  document.addEventListener('myessays:reader-ready', schedulePreload);
  document.addEventListener('myessays:reader-rendered', schedulePreload);
  document.addEventListener('myessays:reader-version-changed', syncAfterActualVersion);
  document.addEventListener('myessays:reader-language-changed', event => {
    syncAfterActualVersion(event);
    if (pendingVersion) replayLatestIntent();
  });

  window.addEventListener('hashchange', () => {
    pendingVersion = '';
    preloadToken += 1;
    resetPreloadState('');
    window.cancelAnimationFrame(handoffFrame);
    handoffFrame = 0;
    schedulePreload();
  });
  window.addEventListener('pageshow', schedulePreload);

  window.MyEssaysInstantReadingModes = Object.freeze({
    installed: true,
    pendingVersion: () => pendingVersion,
    preload: preloadCurrentArticle,
    preloadedVersions: () => [...preloadedVersions],
    isPreloaded: version => version === 'ja' || preloadedVersions.has(version),
    applyIntent
  });

  // Do not rely solely on lifecycle events: a fast hash-route render can occur
  // before this plugin is installed. DOMContentLoaded/current-ready startup
  // scheduling closes that gap without blocking initial article rendering.
  document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', schedulePreload, { once: true })
    : schedulePreload();
})();