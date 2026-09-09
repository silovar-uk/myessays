(() => {
  'use strict';

  if (window.MyEssaysInstantReadingModes?.installed) return;

  const CONTROL_ID = 'readerLanguageInstantDirect';
  let desiredVersion = '';
  let transitionActive = false;
  let activeTransitionVersion = '';
  let preloadToken = 0;
  let controlToken = 0;
  let preloadEssayId = '';
  let controlEssayId = '';
  let controlSignature = '';
  const preloadedVersions = new Set();

  const versions = () => window.MyEssaysReaderVersions;

  function currentEssayId() {
    return versions()?.currentEssayId?.() || (() => {
      const match = location.hash.match(/^#\/essay\/(.+)$/);
      if (!match) return '';
      try { return decodeURIComponent(match[1]); }
      catch { return match[1]; }
    })();
  }

  function requestedVersion(target) {
    if (!target) return '';
    if (target.classList.contains('language-lens-full')) {
      return document.getElementById('languageLensPanel')?.dataset.targetVersion || '';
    }
    return target.dataset.readingModeIntent
      || target.dataset.readerModeVersion
      || target.dataset.readerVersion
      || '';
  }

  function shortBadge(definition, version) {
    if (version === 'ja') return 'JA';
    if (version === 'en-mix') return 'EN';
    if (version === 'es-mix') return 'ES';
    return String(definition?.badge || version).replace(/\s*MIX$/i, '').slice(0, 3).toUpperCase();
  }

  function renderIntent(version) {
    if (!version) return;

    document.querySelectorAll('[data-reading-mode-intent],[data-reader-mode-version]').forEach(button => {
      const candidate = button.dataset.readingModeIntent || button.dataset.readerModeVersion || '';
      if (!candidate) return;
      const active = candidate === version;
      button.classList.toggle('is-active', active);
      if (button.getAttribute('role') === 'radio') button.setAttribute('aria-checked', String(active));
      if (button.hasAttribute('aria-pressed')) button.setAttribute('aria-pressed', String(active));
    });

    document.querySelectorAll('.reader-language-option[data-reader-version]').forEach(button => {
      const active = button.dataset.readerVersion === version;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-checked', String(active));
    });

    const control = document.getElementById(CONTROL_ID);
    if (control) control.dataset.desiredVersion = version;
    const bar = document.querySelector('.reader-mode-bar');
    if (bar) bar.dataset.desiredVersion = version;
  }

  function dispatchIntent(version, source = 'control') {
    document.dispatchEvent(new CustomEvent('myessays:reader-version-intent', {
      detail: {
        essayId: currentEssayId(),
        version,
        source
      }
    }));
  }

  function resetPreloadState(id = '') {
    preloadEssayId = id;
    preloadedVersions.clear();
  }

  async function preloadCurrentArticle() {
    const api = versions();
    const id = currentEssayId();
    if (!api || !id || !api.availableVersions || !api.getVersionDocument) return [];

    if (preloadEssayId !== id) resetPreloadState(id);
    const token = ++preloadToken;
    const available = await api.availableVersions(id);
    if (token !== preloadToken || id !== currentEssayId()) return [];

    const derived = available.filter(version => version !== 'ja');
    const results = await Promise.allSettled(derived.map(async version => {
      const document = await api.getVersionDocument(id, version);
      if (document && token === preloadToken && id === currentEssayId()) {
        preloadedVersions.add(version);
        return version;
      }
      return '';
    }));

    if (token === preloadToken && id === currentEssayId()) {
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
    const id = currentEssayId();
    if (!id || !version || version === 'ja' || preloadedVersions.has(version)) return;
    Promise.resolve(api?.getVersionDocument?.(id, version)).then(document => {
      if (document && id === currentEssayId()) preloadedVersions.add(version);
    });
  }

  function ensureControlHost(control) {
    if (!control) return;
    const actions = document.querySelector('.reader-v2-header-actions');
    if (actions) {
      if (control.parentElement !== actions) actions.prepend(control);
      return;
    }
    const view = document.getElementById('readerView');
    if (view && control.parentElement !== view) view.prepend(control);
  }

  async function syncPersistentControl() {
    const api = versions();
    const id = currentEssayId();
    const view = document.getElementById('readerView');
    if (!api || !id || !view || view.hidden || !api.availableVersions) {
      document.getElementById(CONTROL_ID)?.remove();
      controlEssayId = '';
      controlSignature = '';
      return;
    }

    const token = ++controlToken;
    const available = await api.availableVersions(id);
    if (token !== controlToken || id !== currentEssayId()) return;

    const order = ['ja', ...available.filter(version => version !== 'ja')];
    if (order.length <= 1) {
      document.getElementById(CONTROL_ID)?.remove();
      controlEssayId = id;
      controlSignature = `${id}|ja`;
      return;
    }

    let control = document.getElementById(CONTROL_ID);
    if (!control) {
      control = document.createElement('div');
      control.id = CONTROL_ID;
      control.className = 'reader-language-direct reader-language-instant-direct';
      control.setAttribute('role', 'radiogroup');
      control.setAttribute('aria-label', '表示言語');
    }
    ensureControlHost(control);

    const signature = `${id}|${order.join(',')}`;
    if (controlEssayId !== id || controlSignature !== signature || !control.children.length) {
      const defs = api.definitions || {};
      control.innerHTML = order.map(version => {
        const definition = defs[version] || { label: version, badge: version.toUpperCase() };
        return `<button type="button" role="radio" class="reader-mode-button reader-language-direct-option" data-reading-mode-intent="${version}" aria-checked="false" aria-label="${definition.label}">${shortBadge(definition, version)}</button>`;
      }).join('');
      controlEssayId = id;
      controlSignature = signature;
    }

    const actual = api.currentVersion?.() || 'ja';
    if (!desiredVersion || controlEssayId !== id) desiredVersion = actual;
    renderIntent(desiredVersion || actual);
  }

  function schedulePersistentControl() {
    requestAnimationFrame(() => syncPersistentControl());
  }

  function captureSemanticHandoff() {
    window.MyEssaysReadingPivot?.captureForSwitch?.();
    window.MyEssaysReadingLocators?.captureForSwitch?.();
  }

  function settleToActual() {
    const actual = versions()?.currentVersion?.() || 'ja';
    desiredVersion = actual;
    transitionActive = false;
    activeTransitionVersion = '';
    renderIntent(actual);
  }

  function startTransition(version) {
    const api = versions();
    if (!api || !version || transitionActive || api.isSwitching?.()) return false;
    if (version === api.currentVersion?.()) {
      settleToActual();
      return true;
    }

    captureSemanticHandoff();
    transitionActive = true;
    activeTransitionVersion = version;

    Promise.resolve(api.switchVersion?.(version)).then(result => {
      // A successful switch remains active until the semantic stable event.
      // If the shared runtime explicitly rejects the switch, recover without a
      // timer and then honour any newer desired version.
      if (result === false && transitionActive && activeTransitionVersion === version && !api.isSwitching?.()) {
        transitionActive = false;
        activeTransitionVersion = '';
        const actual = api.currentVersion?.() || 'ja';
        if (desiredVersion && desiredVersion !== actual) startTransition(desiredVersion);
        else settleToActual();
      }
    }).catch(() => {
      if (activeTransitionVersion !== version) return;
      transitionActive = false;
      activeTransitionVersion = '';
      const actual = api.currentVersion?.() || 'ja';
      if (desiredVersion && desiredVersion !== actual) startTransition(desiredVersion);
      else settleToActual();
    });
    return true;
  }

  function requestVersion(version, source = 'control') {
    const api = versions();
    if (!api || !version || !api.definitions?.[version]) return false;

    desiredVersion = version;
    renderIntent(version);
    dispatchIntent(version, source);
    warmVersion(version);

    const lens = document.getElementById('languageLensPanel');
    if (source === 'language-lens' && lens) lens.hidden = true;

    if (transitionActive || api.isSwitching?.()) return true;
    if (version === api.currentVersion?.()) {
      settleToActual();
      return true;
    }
    return startTransition(version);
  }

  function handleIntentClick(event) {
    const target = event.target instanceof Element
      ? event.target.closest('[data-reading-mode-intent],[data-reader-mode-version],[data-reader-version],.language-lens-full')
      : null;
    if (!target) return;

    const next = requestedVersion(target);
    const api = versions();
    if (!api || !next || !api.definitions?.[next]) return;

    event.preventDefault();
    event.stopImmediatePropagation();
    const source = target.classList.contains('language-lens-full') ? 'language-lens' : 'control';
    requestVersion(next, source);
  }

  function handleStable(event) {
    if (!transitionActive) return;
    const id = currentEssayId();
    if (event.detail?.essayId && event.detail.essayId !== id) return;

    const actual = versions()?.currentVersion?.() || 'ja';
    transitionActive = false;
    activeTransitionVersion = '';

    if (desiredVersion && desiredVersion !== actual) {
      // The previous semantic handoff is fully stable. Start only the latest
      // user intent; intermediate choices are intentionally discarded.
      startTransition(desiredVersion);
      return;
    }

    desiredVersion = actual;
    renderIntent(actual);
    document.dispatchEvent(new CustomEvent('myessays:reading-mode-settled', {
      detail: {
        essayId: id,
        version: actual,
        locator: event.detail?.locator || ''
      }
    }));
  }

  function syncAfterActualVersion(event) {
    const actual = event.detail?.version || event.detail?.mode || versions()?.currentVersion?.() || 'ja';
    renderIntent(desiredVersion || actual);
    schedulePreload();
    schedulePersistentControl();
  }

  function resetForRoute() {
    transitionActive = false;
    activeTransitionVersion = '';
    desiredVersion = '';
    preloadToken += 1;
    controlToken += 1;
    resetPreloadState('');
    controlEssayId = '';
    controlSignature = '';
    document.getElementById(CONTROL_ID)?.remove();
    schedulePreload();
    schedulePersistentControl();
  }

  document.addEventListener('click', handleIntentClick, true);
  document.addEventListener('pointerover', event => {
    const target = event.target instanceof Element
      ? event.target.closest('[data-reading-mode-intent],[data-reader-mode-version],[data-reader-version]')
      : null;
    warmVersion(requestedVersion(target));
  }, true);
  document.addEventListener('focusin', event => {
    const target = event.target instanceof Element
      ? event.target.closest('[data-reading-mode-intent],[data-reader-mode-version],[data-reader-version]')
      : null;
    warmVersion(requestedVersion(target));
  });

  document.addEventListener('myessays:reader-ready', () => {
    schedulePreload();
    schedulePersistentControl();
  });
  document.addEventListener('myessays:reader-rendered', schedulePersistentControl);
  document.addEventListener('myessays:reader-version-changed', syncAfterActualVersion);
  document.addEventListener('myessays:reader-language-changed', syncAfterActualVersion);
  document.addEventListener('myessays:reading-mode-stable', handleStable);
  document.addEventListener('myessays:reading-location-changed', () => {
    const control = document.getElementById(CONTROL_ID);
    if (control) ensureControlHost(control);
  });

  window.addEventListener('hashchange', resetForRoute);
  window.addEventListener('pageshow', () => {
    schedulePreload();
    schedulePersistentControl();
  });
  window.addEventListener('resize', () => ensureControlHost(document.getElementById(CONTROL_ID)));

  window.MyEssaysInstantReadingModes = Object.freeze({
    installed: true,
    requestVersion,
    desiredVersion: () => desiredVersion || versions()?.currentVersion?.() || 'ja',
    pendingVersion: () => transitionActive && desiredVersion !== versions()?.currentVersion?.() ? desiredVersion : '',
    isTransitioning: () => transitionActive,
    activeTransitionVersion: () => activeTransitionVersion,
    preload: preloadCurrentArticle,
    preloadedVersions: () => [...preloadedVersions],
    isPreloaded: version => version === 'ja' || preloadedVersions.has(version),
    renderIntent,
    syncControl: syncPersistentControl
  });

  document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', () => {
        schedulePreload();
        schedulePersistentControl();
      }, { once: true })
    : (() => {
        schedulePreload();
        schedulePersistentControl();
      })();
})();