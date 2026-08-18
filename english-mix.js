(() => {
  'use strict';

  const INDEX_URL = 'data/mix-index.json';
  const modeByEssay = new Map();
  const mixCache = new Map();
  let indexPromise = null;

  function currentEssayId() {
    const match = location.hash.match(/^#\/essay\/(.+)$/);
    if (!match) return '';
    try { return decodeURIComponent(match[1]); }
    catch { return match[1]; }
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

  async function mixIndex() {
    if (!indexPromise) {
      indexPromise = fetch(INDEX_URL, { cache: 'no-store' })
        .then(response => response.ok ? response.json() : { mixes: {} })
        .catch(() => ({ mixes: {} }));
    }
    return indexPromise;
  }

  function parseMixMarkdown(text) {
    try {
      if (typeof parseFrontMatter === 'function') return parseFrontMatter(text).body;
    } catch {}
    const match = String(text || '').match(/^---\n[\s\S]*?\n---\n?/);
    return match ? String(text).slice(match[0].length) : String(text || '');
  }

  async function mixBody(id) {
    if (mixCache.has(id)) return mixCache.get(id);
    const index = await mixIndex();
    const path = index?.mixes?.[id];
    if (!path) return '';
    const body = await fetch(path, { cache: 'no-store' })
      .then(response => response.ok ? response.text() : '')
      .then(parseMixMarkdown)
      .catch(() => '');
    if (body) mixCache.set(id, body);
    return body;
  }

  function currentRenderedMode() {
    try {
      return state?.currentEssay?.__languageMode === 'mix' ? 'mix' : 'ja';
    } catch {
      return 'ja';
    }
  }

  function updateSwitch(switcher, mode) {
    switcher.querySelectorAll('[data-reader-language]').forEach(button => {
      const active = button.dataset.readerLanguage === mode;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });
  }

  async function switchLanguage(mode) {
    const id = currentEssayId();
    if (!id) return;
    const original = originalEssay(id);
    if (!original || typeof showReader !== 'function') return;

    if (mode === 'mix') {
      const body = await mixBody(id);
      if (!body) return;
      modeByEssay.set(id, 'mix');
      const mixed = {
        ...original,
        body,
        metrics: typeof readingMetrics === 'function' ? readingMetrics(body) : original.metrics,
        __languageMode: 'mix'
      };
      showReader(mixed);
    } else {
      modeByEssay.set(id, 'ja');
      showReader(original);
    }

    document.dispatchEvent(new CustomEvent('myessays:reader-language-changed', {
      detail: { essayId: id, mode }
    }));
  }

  async function ensureLanguageSwitch() {
    const id = currentEssayId();
    const content = document.getElementById('readerContent');
    if (!id || !content || !content.children.length) return;

    const index = await mixIndex();
    if (!index?.mixes?.[id]) {
      content.querySelector('.reader-language-switch')?.remove();
      return;
    }

    let switcher = content.querySelector('.reader-language-switch');
    if (!switcher) {
      switcher = document.createElement('div');
      switcher.className = 'reader-language-switch';
      switcher.setAttribute('role', 'group');
      switcher.setAttribute('aria-label', '表示言語');
      switcher.innerHTML = `
        <span class="reader-language-switch-label">READING MODE</span>
        <div class="reader-language-switch-buttons">
          <button type="button" data-reader-language="ja" aria-pressed="true">日本語</button>
          <button type="button" data-reader-language="mix" aria-pressed="false">English Mix</button>
        </div>`;
      switcher.addEventListener('click', event => {
        const button = event.target.closest('[data-reader-language]');
        if (!button) return;
        const next = button.dataset.readerLanguage;
        if (!['ja', 'mix'].includes(next) || next === currentRenderedMode()) return;
        switchLanguage(next);
      });
    }

    const copyButton = content.querySelector('.reader-copy-button');
    const stats = content.querySelector('.reading-stats');
    const anchor = copyButton || stats;
    if (anchor) {
      if (anchor.nextElementSibling !== switcher) anchor.insertAdjacentElement('afterend', switcher);
    } else if (content.firstElementChild !== switcher) {
      content.prepend(switcher);
    }

    const desired = modeByEssay.get(id) || currentRenderedMode();
    updateSwitch(switcher, desired);
  }

  function syncModeAfterRender() {
    const id = currentEssayId();
    if (!id) return;
    const rendered = currentRenderedMode();
    if (!modeByEssay.has(id)) modeByEssay.set(id, rendered);
    requestAnimationFrame(ensureLanguageSwitch);
  }

  document.addEventListener('myessays:reader-rendered', syncModeAfterRender);
  document.addEventListener('myessays:reader-ready', ensureLanguageSwitch);
  document.addEventListener('myessays:reader-language-changed', ensureLanguageSwitch);
  window.addEventListener('hashchange', () => {
    const id = currentEssayId();
    if (id && !modeByEssay.has(id)) modeByEssay.set(id, 'ja');
    requestAnimationFrame(ensureLanguageSwitch);
  });
  window.addEventListener('pageshow', () => requestAnimationFrame(ensureLanguageSwitch));
})();
