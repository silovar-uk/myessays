(() => {
  const state = { data: {}, currentEssayId: '', currentTerms: {}, selected: '' };

  const esc = (value='') => String(value).replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));

  function ensureUi() {
    if (document.getElementById('glossaryTab')) return;

    const tab = document.createElement('button');
    tab.id = 'glossaryTab';
    tab.className = 'glossary-tab';
    tab.type = 'button';
    tab.hidden = true;
    tab.setAttribute('aria-expanded', 'false');
    tab.setAttribute('aria-controls', 'glossaryPanel');
    tab.innerHTML = '<span>用語</span><span id="glossaryCount" class="glossary-count"></span>';

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
      <p class="glossary-intro">本文の流れを止めず、必要な言葉だけ横で確認する。</p>
      <div id="glossaryTermList" class="glossary-term-list"></div>
      <div id="glossaryDetail" class="glossary-detail" hidden></div>`;

    document.body.append(tab, panel);
    tab.addEventListener('click', () => setOpen(!panel.classList.contains('is-open')));
    panel.querySelector('#glossaryClose').addEventListener('click', () => setOpen(false));
    panel.addEventListener('click', e => {
      const btn = e.target.closest('[data-glossary-term]');
      if (!btn) return;
      showTerm(btn.dataset.glossaryTerm);
    });

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && panel.classList.contains('is-open')) setOpen(false);
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

  function renderList() {
    const list = document.getElementById('glossaryTermList');
    const count = document.getElementById('glossaryCount');
    const terms = Object.keys(state.currentTerms);
    count.textContent = terms.length;
    list.innerHTML = terms.map(term => `<button type="button" class="glossary-list-item" data-glossary-term="${esc(term)}">${esc(term)}</button>`).join('');
  }

  function showTerm(term) {
    const item = state.currentTerms[term];
    if (!item) return;
    state.selected = term;
    const detail = document.getElementById('glossaryDetail');
    detail.hidden = false;
    detail.innerHTML = `
      <div class="glossary-detail-head">
        <p class="glossary-label">TERM</p>
        <h3>${esc(term)}</h3>
      </div>
      <section>
        <h4>まず一言で</h4>
        <p>${esc(item.summary || '')}</p>
      </section>
      <section>
        <h4>この論考では</h4>
        <p>${esc(item.context || '')}</p>
      </section>
      <section>
        <h4>分析するときの見るポイント</h4>
        <p>${esc(item.watch || '')}</p>
      </section>
      ${item.source ? `<a class="glossary-source" href="${esc(item.source)}" target="_blank" rel="noopener">出典を見る ↗<span>${esc(item.sourceLabel || '')}</span></a>` : ''}`;
    setOpen(true);
    requestAnimationFrame(() => detail.scrollIntoView({ block: 'nearest', behavior: 'smooth' }));
  }

  function eligibleTextNode(node, reader) {
    if (!node?.nodeValue?.trim()) return false;
    const parent = node.parentElement;
    if (!parent || !reader.contains(parent)) return false;
    if (!parent.closest('p, li, blockquote')) return false;
    if (parent.closest('a, button, code, pre, .reading-stats, .reference-block, .notes-block')) return false;
    return true;
  }

  function markFirstOccurrence(reader, term) {
    const walker = document.createTreeWalker(reader, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      if (!eligibleTextNode(node, reader)) continue;
      const index = node.nodeValue.indexOf(term);
      if (index === -1) continue;
      const before = node.nodeValue.slice(0, index);
      const after = node.nodeValue.slice(index + term.length);
      const frag = document.createDocumentFragment();
      if (before) frag.append(document.createTextNode(before));
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'glossary-mark';
      button.dataset.glossaryTerm = term;
      button.setAttribute('aria-label', `${term}の補足を開く`);
      button.textContent = term;
      frag.append(button);
      if (after) frag.append(document.createTextNode(after));
      node.parentNode.replaceChild(frag, node);
      return true;
    }
    return false;
  }

  function annotateReader() {
    ensureUi();
    const match = location.hash.match(/^#\/essay\/(.+)$/);
    const essayId = match ? decodeURIComponent(match[1]) : '';
    const reader = document.getElementById('readerContent');
    const tab = document.getElementById('glossaryTab');
    const panel = document.getElementById('glossaryPanel');
    if (!essayId || !reader) {
      if (tab) tab.hidden = true;
      if (panel) setOpen(false);
      return;
    }

    const terms = state.data[essayId] || {};
    state.currentEssayId = essayId;
    state.currentTerms = terms;
    state.selected = '';

    const keys = Object.keys(terms);
    tab.hidden = keys.length === 0;
    if (!keys.length) {
      setOpen(false);
      return;
    }

    reader.querySelectorAll('.glossary-mark').forEach(el => el.replaceWith(document.createTextNode(el.textContent)));
    keys.sort((a,b) => b.length - a.length).forEach(term => markFirstOccurrence(reader, term));
    reader.querySelectorAll('.glossary-mark').forEach(btn => {
      btn.addEventListener('click', () => showTerm(btn.dataset.glossaryTerm));
    });
    renderList();
    const detail = document.getElementById('glossaryDetail');
    detail.hidden = true;
    detail.innerHTML = '';
  }

  let scheduled = false;
  function scheduleAnnotate() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      annotateReader();
    });
  }

  async function init() {
    ensureUi();
    try {
      const res = await fetch('data/glossary.json', { cache: 'no-store' });
      if (!res.ok) throw new Error('glossary.json load failed');
      state.data = await res.json();
    } catch (err) {
      console.warn('[glossary]', err);
      state.data = {};
    }

    window.addEventListener('hashchange', scheduleAnnotate);
    const reader = document.getElementById('readerContent');
    if (reader) {
      new MutationObserver(mutations => {
        if (mutations.some(m => [...m.addedNodes].some(n => n.nodeType === 1 && !n.classList?.contains('glossary-mark')))) scheduleAnnotate();
      }).observe(reader, { childList: true, subtree: false });
    }
    setTimeout(scheduleAnnotate, 0);
  }

  document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', init) : init();
})();
