(() => {
  'use strict';

  const state = {
    cache: new Map(),
    legacy: null,
    currentEssayId: '',
    currentTerms: {},
    selected: ''
  };

  const esc = (value = '') => String(value).replace(/[&<>'"]/g, char => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
  }[char]));

  function ensureUi() {
    if (document.getElementById('glossaryTab')) return;

    const tab = document.createElement('button');
    tab.id = 'glossaryTab';
    tab.className = 'glossary-tab';
    tab.type = 'button';
    tab.hidden = true;
    tab.setAttribute('aria-expanded', 'false');
    tab.setAttribute('aria-controls', 'glossaryPanel');
    tab.innerHTML = '<span class="glossary-tab-label">用語</span><span id="glossaryCount" class="glossary-count"></span>';

    const panel = document.createElement('aside');
    panel.id = 'glossaryPanel';
    panel.className = 'glossary-panel';
    panel.setAttribute('aria-hidden', 'true');
    panel.setAttribute('aria-label', '用語メモ');
    panel.innerHTML = `
      <div class="glossary-panel-head">
        <div>
          <p class="glossary-kicker">READING GLOSSARY</p>
          <h2>用語メモ</h2>
        </div>
        <button id="glossaryClose" class="glossary-close" type="button" aria-label="用語メモを閉じる">×</button>
      </div>
      <div id="glossaryDetail" class="glossary-detail"></div>
      <div class="glossary-index-wrap">
        <button id="glossaryIndexToggle" class="glossary-index-toggle" type="button" aria-expanded="false">
          <span>この記事の用語</span><span aria-hidden="true">⌄</span>
        </button>
        <div id="glossaryTermList" class="glossary-term-list" hidden></div>
      </div>`;

    document.body.append(tab, panel);

    tab.addEventListener('click', () => {
      const opening = !panel.classList.contains('is-open');
      setOpen(opening);
      if (opening && !state.selected) renderEmptyDetail();
    });
    panel.querySelector('#glossaryClose').addEventListener('click', () => setOpen(false));
    panel.querySelector('#glossaryIndexToggle').addEventListener('click', event => {
      const list = panel.querySelector('#glossaryTermList');
      const open = list.hidden;
      list.hidden = !open;
      event.currentTarget.setAttribute('aria-expanded', String(open));
    });
    panel.addEventListener('click', event => {
      const button = event.target.closest('[data-glossary-term]');
      if (button) showTerm(button.dataset.glossaryTerm);
    });
  }

  function setOpen(open) {
    const panel = document.getElementById('glossaryPanel');
    const tab = document.getElementById('glossaryTab');
    if (!panel || !tab || tab.hidden) return;
    panel.classList.toggle('is-open', open);
    panel.setAttribute('aria-hidden', String(!open));
    tab.setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('glossary-is-open', open);
  }

  function itemLabel(term, item = {}) {
    return String(item.label || term);
  }

  function itemMatches(term, item = {}) {
    const configured = Array.isArray(item.match) ? item.match.filter(Boolean).map(String) : [];
    const values = [...configured, itemLabel(term, item), term].filter(Boolean);
    return [...new Set(values)];
  }

  function normalizeTerms(payload, essayId) {
    if (!payload || typeof payload !== 'object' || Array.isArray(payload)) return {};
    if (payload.terms && typeof payload.terms === 'object') return payload.terms;
    if (payload[essayId] && typeof payload[essayId] === 'object') return payload[essayId];
    return payload;
  }

  async function loadLegacy() {
    if (state.legacy) return state.legacy;
    state.legacy = fetch('data/glossary.json', { cache: 'no-store' })
      .then(response => response.ok ? response.json() : {})
      .catch(() => ({}));
    return state.legacy;
  }

  async function loadTerms(essayId) {
    if (state.cache.has(essayId)) return state.cache.get(essayId);

    const task = (async () => {
      try {
        const response = await fetch(`data/glossaries/${encodeURIComponent(essayId)}.json`, { cache: 'no-store' });
        if (response.ok) return normalizeTerms(await response.json(), essayId);
      } catch {
        // Per-article glossary is optional; legacy data remains a compatibility fallback.
      }

      const legacy = await loadLegacy();
      return normalizeTerms(legacy, essayId);
    })();

    state.cache.set(essayId, task);
    return task;
  }

  function renderList() {
    const list = document.getElementById('glossaryTermList');
    const count = document.getElementById('glossaryCount');
    if (!list || !count) return;

    const terms = Object.entries(state.currentTerms);
    count.textContent = String(terms.length);
    list.innerHTML = terms.map(([term, item]) => (
      `<button type="button" class="glossary-list-item" data-glossary-term="${esc(term)}">${esc(itemLabel(term, item))}</button>`
    )).join('');
  }

  function renderEmptyDetail() {
    const detail = document.getElementById('glossaryDetail');
    if (!detail) return;
    detail.innerHTML = `
      <div class="glossary-empty">
        <span class="glossary-empty-mark">Aa</span>
        <p>本文の点線がついた用語を押すと、意味と「この論考での読み方」をここで確認できる。</p>
      </div>`;
  }

  function relatedHtml(item, currentTerm) {
    const related = Array.isArray(item.related) ? item.related : [];
    const available = related.filter(term => term !== currentTerm && state.currentTerms[term]);
    if (!available.length) return '';
    return `
      <section class="glossary-related">
        <h4>関連して読む</h4>
        <div class="glossary-related-list">
          ${available.map(term => `<button type="button" data-glossary-term="${esc(term)}">${esc(itemLabel(term, state.currentTerms[term]))}<span aria-hidden="true">→</span></button>`).join('')}
        </div>
      </section>`;
  }

  function showTerm(term) {
    const item = state.currentTerms[term];
    if (!item) return;
    state.selected = term;

    document.querySelectorAll('.glossary-mark.is-active').forEach(element => element.classList.remove('is-active'));
    document.querySelectorAll('.glossary-mark').forEach(element => {
      if (element.dataset.glossaryTerm === term) element.classList.add('is-active');
    });
    document.querySelectorAll('.glossary-list-item.is-active').forEach(element => element.classList.remove('is-active'));
    document.querySelectorAll('.glossary-list-item').forEach(element => {
      if (element.dataset.glossaryTerm === term) element.classList.add('is-active');
    });

    const detail = document.getElementById('glossaryDetail');
    if (!detail) return;
    detail.innerHTML = `
      <div class="glossary-detail-head">
        <p class="glossary-label">TERM</p>
        <h3>${esc(itemLabel(term, item))}</h3>
      </div>
      <section class="glossary-quick">
        <p class="glossary-section-label">まず一言で</p>
        <p class="glossary-summary">${esc(item.summary || '')}</p>
      </section>
      <section class="glossary-context">
        <p class="glossary-section-label">この論考では</p>
        <p>${esc(item.context || '')}</p>
      </section>
      ${relatedHtml(item, term)}
      ${item.watch ? `<details class="glossary-more"><summary>読むときの見るポイント</summary><p>${esc(item.watch)}</p></details>` : ''}
      ${item.source ? `<a class="glossary-source" href="${esc(item.source)}" target="_blank" rel="noopener noreferrer"><span>出典</span><strong>${esc(item.sourceLabel || '参照先を見る')}</strong><i aria-hidden="true">↗</i></a>` : ''}`;

    setOpen(true);
    document.getElementById('glossaryTermList').hidden = true;
    document.getElementById('glossaryIndexToggle').setAttribute('aria-expanded', 'false');
    requestAnimationFrame(() => detail.scrollTo?.({ top: 0, behavior: 'smooth' }));
  }

  function eligibleTextNode(node, reader) {
    if (!node?.nodeValue?.trim()) return false;
    const parent = node.parentElement;
    if (!parent || !reader.contains(parent)) return false;
    if (!parent.closest('p, li, blockquote')) return false;
    if (parent.closest('a, button, code, pre, .reading-stats, .reference-block, .notes-block, .reader-end-navigation, .reader-reflections')) return false;
    return true;
  }

  function findOccurrence(reader, text) {
    const walker = document.createTreeWalker(reader, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      if (!eligibleTextNode(node, reader)) continue;
      const index = node.nodeValue.indexOf(text);
      if (index !== -1) return { node, index };
    }
    return null;
  }

  function markOccurrence(reader, term, item) {
    for (const matchText of itemMatches(term, item)) {
      const found = findOccurrence(reader, matchText);
      if (!found) continue;

      const { node, index } = found;
      const before = node.nodeValue.slice(0, index);
      const after = node.nodeValue.slice(index + matchText.length);
      const fragment = document.createDocumentFragment();
      if (before) fragment.append(document.createTextNode(before));

      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'glossary-mark';
      button.dataset.glossaryTerm = term;
      button.setAttribute('aria-label', `${itemLabel(term, item)}の用語メモを開く`);
      button.setAttribute('title', '用語メモを見る');
      button.textContent = matchText;
      fragment.append(button);

      if (after) fragment.append(document.createTextNode(after));
      node.parentNode.replaceChild(fragment, node);
      return true;
    }
    return false;
  }

  async function mountGlossary(context) {
    ensureUi();
    const tab = document.getElementById('glossaryTab');
    if (!tab) return;

    const terms = await loadTerms(context.essayId);
    if (context !== window.MyEssaysReaderRuntime?.getContext?.()) return;

    state.currentEssayId = context.essayId;
    state.currentTerms = terms || {};
    state.selected = '';
    setOpen(false);

    const entries = Object.entries(state.currentTerms);
    tab.hidden = entries.length === 0;
    if (!entries.length) return;

    // Long/preferred display forms win before shorter aliases.
    entries.sort((a, b) => {
      const aLength = Math.max(...itemMatches(a[0], a[1]).map(value => value.length));
      const bLength = Math.max(...itemMatches(b[0], b[1]).map(value => value.length));
      return bLength - aLength;
    }).forEach(([term, item]) => markOccurrence(context.root, term, item));

    context.root.querySelectorAll('.glossary-mark').forEach(button => {
      button.addEventListener('click', () => showTerm(button.dataset.glossaryTerm));
    });
    renderList();
    renderEmptyDetail();
  }

  async function init() {
    ensureUi();
    if (window.MyEssaysReaderRuntime?.register) {
      window.MyEssaysReaderRuntime.register('glossary', mountGlossary, { priority: 20 });
      return;
    }

    // Compatibility path for a partially cached deployment.
    document.addEventListener('myessays:reader-rendered', () => {
      const essayId = location.hash.match(/^#\/essay\/(.+)$/)?.[1];
      const root = document.getElementById('readerContent');
      const view = document.getElementById('readerView');
      if (!essayId || !root || !view || view.hidden) return;
      const decoded = decodeURIComponent(essayId);
      mountGlossary({ essayId: decoded, essay: null, root, view });
    });
  }

  document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', init) : init();
})();
