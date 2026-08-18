(() => {
  'use strict';

  const NOTE_PREFIX = 'myessays:reading-note:';
  const READING_PREFIX = 'myessays:reading-state:';
  const FILTERS = ['all', 'unread', 'opened', 'completed', 'memo'];
  let activeFilter = 'all';
  let librarySyncQueued = false;
  let readerSyncQueued = false;

  function safeGet(key) {
    try { return localStorage.getItem(key); }
    catch { return null; }
  }

  function safeSet(key, value) {
    try {
      localStorage.setItem(key, value);
      return true;
    } catch {
      return false;
    }
  }

  function memoFor(id) {
    if (!id) return '';
    return String(safeGet(`${NOTE_PREFIX}${id}`) || '').trim();
  }

  function memoPreview(id) {
    const memo = memoFor(id).replace(/\s+/g, ' ').trim();
    if (!memo) return '';
    return memo.length > 78 ? `${memo.slice(0, 78)}…` : memo;
  }

  function readState(id) {
    if (!id) return {};
    const raw = safeGet(`${READING_PREFIX}${id}`);
    if (!raw) return {};
    try {
      const value = JSON.parse(raw);
      return value && typeof value === 'object' ? value : {};
    } catch {
      return {};
    }
  }

  function writeState(id, value) {
    if (!id) return false;
    return safeSet(`${READING_PREFIX}${id}`, JSON.stringify(value));
  }

  function progressFor(id) {
    const reading = readState(id);
    if (reading.completedAt) return 'completed';
    if (reading.openedAt || memoFor(id)) return 'opened';
    return 'unread';
  }

  function currentEssayId() {
    const match = location.hash.match(/^#\/essay\/(.+)$/);
    if (!match) return '';
    try { return decodeURIComponent(match[1]); }
    catch { return match[1]; }
  }

  function currentEssay() {
    try {
      if (typeof state === 'undefined' || !state) return null;
      return state.currentEssay || state.essays?.find(item => item.id === currentEssayId()) || null;
    } catch {
      return null;
    }
  }

  function markOpened(id) {
    if (!id) return;
    const reading = readState(id);
    if (reading.openedAt) return;
    writeState(id, { ...reading, openedAt: new Date().toISOString() });
  }

  function toggleCompleted(id) {
    if (!id) return;
    const reading = readState(id);
    const openedAt = reading.openedAt || new Date().toISOString();
    if (reading.completedAt) {
      const { completedAt, ...rest } = reading;
      writeState(id, { ...rest, openedAt });
    } else {
      writeState(id, { ...reading, openedAt, completedAt: new Date().toISOString() });
    }
  }

  async function copyText(text) {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return;
    }
    const helper = document.createElement('textarea');
    helper.value = text;
    helper.setAttribute('readonly', '');
    helper.style.position = 'fixed';
    helper.style.opacity = '0';
    helper.style.pointerEvents = 'none';
    document.body.appendChild(helper);
    helper.select();
    const ok = document.execCommand('copy');
    helper.remove();
    if (!ok) throw new Error('copy failed');
  }

  function articleCopyText() {
    const essay = currentEssay();
    if (essay) {
      return [essay.title || '', essay.body || ''].filter(Boolean).join('\n\n').trim();
    }

    const content = document.getElementById('readerContent');
    if (!content) return '';
    const clone = content.cloneNode(true);
    clone.querySelectorAll('.reading-stats, .reader-copy-button, .reading-complete-button, .reader-end-navigation').forEach(node => node.remove());
    return String(clone.textContent || '').replace(/\n{3,}/g, '\n\n').trim();
  }

  function ensureTabs() {
    const toolbar = document.querySelector('.library-toolbar');
    if (!toolbar) return null;

    let tabs = document.querySelector('.reading-status-tabs');
    if (tabs) return tabs;

    tabs = document.createElement('nav');
    tabs.className = 'reading-status-tabs';
    tabs.setAttribute('aria-label', '読書状態');
    tabs.innerHTML = `
      <button type="button" class="reading-status-tab is-active" data-reading-filter="all" aria-pressed="true">すべて</button>
      <button type="button" class="reading-status-tab" data-reading-filter="unread" aria-pressed="false"><span class="reading-status-dot" aria-hidden="true"></span>未読</button>
      <button type="button" class="reading-status-tab" data-reading-filter="opened" aria-pressed="false"><span class="reading-status-dot" aria-hidden="true"></span>開いた</button>
      <button type="button" class="reading-status-tab" data-reading-filter="completed" aria-pressed="false"><span class="reading-status-dot" aria-hidden="true"></span>読了</button>
      <button type="button" class="reading-status-tab" data-reading-filter="memo" aria-pressed="false"><span class="reading-status-dot" aria-hidden="true"></span>メモあり</button>`;
    toolbar.insertAdjacentElement('afterend', tabs);

    tabs.addEventListener('click', event => {
      const button = event.target.closest('[data-reading-filter]');
      if (!button) return;
      const next = button.dataset.readingFilter;
      if (!FILTERS.includes(next)) return;
      activeFilter = next;
      tabs.querySelectorAll('[data-reading-filter]').forEach(tab => {
        const selected = tab === button;
        tab.classList.toggle('is-active', selected);
        tab.setAttribute('aria-pressed', String(selected));
      });
      scheduleLibrarySync();
    });

    return tabs;
  }

  function syncMemoPreview(card, id) {
    const memo = memoPreview(id);
    let preview = card.querySelector('.reading-memo-preview');

    if (!memo) {
      if (preview) preview.remove();
      return;
    }

    if (!preview) {
      preview = document.createElement('p');
      preview.className = 'reading-memo-preview';
      preview.setAttribute('aria-label', '読書メモ');
      if (card.classList.contains('featured-card')) {
        const footer = card.querySelector('.featured-footer');
        footer ? footer.insertAdjacentElement('beforebegin', preview) : card.appendChild(preview);
      } else {
        const main = card.querySelector('.archive-main');
        main ? main.appendChild(preview) : card.appendChild(preview);
      }
    }

    const text = `✎ ${memo}`;
    if (preview.textContent !== text) preview.textContent = text;
    const fullMemo = memoFor(id);
    if (preview.title !== fullMemo) preview.title = fullMemo;
  }

  function matchesFilter(id) {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'memo') return Boolean(memoFor(id));
    return progressFor(id) === activeFilter;
  }

  function decorateCard(card) {
    const id = card.dataset.id;
    if (!id) return false;

    const progress = progressFor(id);
    const hasMemo = Boolean(memoFor(id));

    card.classList.remove('reading-unread', 'reading-opened', 'reading-completed', 'has-reading-note');
    card.classList.add(`reading-${progress}`);
    card.classList.toggle('has-reading-note', hasMemo);
    card.dataset.readingStatus = progress;
    card.dataset.hasReadingNote = String(hasMemo);
    syncMemoPreview(card, id);

    const visible = matchesFilter(id);
    card.hidden = !visible;
    return visible;
  }

  function syncLibrary() {
    librarySyncQueued = false;
    ensureTabs();

    const library = document.getElementById('libraryView');
    const grid = document.getElementById('essayGrid');
    if (!library || !grid || library.hidden) return;

    const cards = [...grid.querySelectorAll('[data-id]')];
    if (!cards.length) return;

    let visibleCount = 0;
    cards.forEach(card => {
      if (decorateCard(card)) visibleCount += 1;
    });

    grid.querySelectorAll('.library-section').forEach(section => {
      const visibleCards = [...section.querySelectorAll('[data-id]')].filter(card => !card.hidden);
      section.hidden = visibleCards.length === 0;
      if (section.classList.contains('archive-section') && activeFilter !== 'all') {
        const count = section.querySelector('.section-heading span');
        if (count) count.textContent = `${visibleCards.length} essays`;
      }
    });

    if (activeFilter !== 'all') {
      const resultCount = document.getElementById('resultCount');
      if (resultCount) resultCount.textContent = `${visibleCount} essays · 読書状態で絞り込み`;
      const empty = document.getElementById('emptyState');
      if (empty) {
        empty.hidden = visibleCount > 0;
        empty.textContent = activeFilter === 'memo'
          ? 'メモのある論考はまだない。'
          : 'この読書状態に合う論考はまだない。';
      }
    }
  }

  function scheduleLibrarySync() {
    if (librarySyncQueued) return;
    librarySyncQueued = true;
    requestAnimationFrame(syncLibrary);
  }

  function ensureCopyButton() {
    const id = currentEssayId();
    const content = document.getElementById('readerContent');
    if (!id || !content || !content.children.length) return null;

    let button = content.querySelector('.reader-copy-button');
    if (!button) {
      button = document.createElement('button');
      button.type = 'button';
      button.className = 'reader-copy-button';
      button.innerHTML = '<span aria-hidden="true">⧉</span><span>全文コピー</span>';
      button.addEventListener('click', async () => {
        const text = articleCopyText();
        if (!text) return;
        const original = button.innerHTML;
        try {
          await copyText(text);
          button.classList.add('is-copied');
          button.innerHTML = '<span aria-hidden="true">✓</span><span>コピーしました</span>';
          window.setTimeout(() => {
            if (!button.isConnected) return;
            button.classList.remove('is-copied');
            button.innerHTML = original;
          }, 1400);
        } catch {
          button.innerHTML = '<span aria-hidden="true">×</span><span>コピーできませんでした</span>';
          window.setTimeout(() => {
            if (!button.isConnected) return;
            button.innerHTML = original;
          }, 1600);
        }
      });
    }

    const stats = content.querySelector('.reading-stats');
    if (stats) {
      if (stats.nextElementSibling !== button) stats.insertAdjacentElement('afterend', button);
    } else if (content.firstElementChild !== button) {
      content.insertAdjacentElement('afterbegin', button);
    }

    return button;
  }

  function ensureCompleteButton() {
    const id = currentEssayId();
    const content = document.getElementById('readerContent');
    if (!id || !content || !content.children.length) return null;

    let button = content.querySelector('.reading-complete-button');
    if (!button) {
      button = document.createElement('button');
      button.type = 'button';
      button.className = 'reading-complete-button';
      button.addEventListener('click', () => {
        const target = currentEssayId();
        if (!target) return;
        toggleCompleted(target);
        syncReader();
        scheduleLibrarySync();
      });
    }

    const endNavigation = content.querySelector('.reader-end-navigation');
    if (endNavigation) {
      if (button.nextElementSibling !== endNavigation) endNavigation.insertAdjacentElement('beforebegin', button);
    } else if (button !== content.lastElementChild) {
      content.appendChild(button);
    }

    return button;
  }

  function syncReader() {
    readerSyncQueued = false;
    const id = currentEssayId();
    if (!id) return;

    markOpened(id);
    ensureCopyButton();
    const button = ensureCompleteButton();
    if (!button) return;

    const completed = progressFor(id) === 'completed';
    const stateName = completed ? 'completed' : 'open';
    button.classList.toggle('is-completed', completed);
    button.setAttribute('aria-pressed', String(completed));

    if (button.dataset.completionState !== stateName) {
      button.dataset.completionState = stateName;
      button.innerHTML = completed
        ? '<span class="reading-complete-icon" aria-hidden="true">✓</span><span class="reading-complete-label">読了済み</span><small>もう一度押すと解除</small>'
        : '<span class="reading-complete-icon" aria-hidden="true">○</span><span class="reading-complete-label">読了にする</span><small>この記事を読み終えたら</small>';
    }
  }

  function scheduleReaderSync() {
    if (readerSyncQueued) return;
    readerSyncQueued = true;
    requestAnimationFrame(syncReader);
  }

  function syncForCurrentRoute() {
    if (currentEssayId()) scheduleReaderSync();
    else scheduleLibrarySync();
  }

  function init() {
    ensureTabs();

    const grid = document.getElementById('essayGrid');
    if (grid) {
      new MutationObserver(scheduleLibrarySync).observe(grid, { childList: true });
    }

    const readerContent = document.getElementById('readerContent');
    if (readerContent) {
      new MutationObserver(scheduleReaderSync).observe(readerContent, { childList: true });
    }

    const note = document.getElementById('noteTextarea');
    if (note) {
      ['input', 'change', 'blur', 'compositionend'].forEach(name => note.addEventListener(name, scheduleLibrarySync));
    }

    document.addEventListener('myessays:reader-rendered', scheduleReaderSync);
    document.addEventListener('myessays:reader-ready', scheduleReaderSync);
    window.addEventListener('hashchange', syncForCurrentRoute);
    window.addEventListener('pageshow', syncForCurrentRoute);
    window.addEventListener('focus', syncForCurrentRoute);
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) syncForCurrentRoute();
    });
    window.addEventListener('storage', event => {
      if (event.key?.startsWith(NOTE_PREFIX) || event.key?.startsWith(READING_PREFIX)) syncForCurrentRoute();
    });

    const randomEssay = document.getElementById('randomEssay');
    randomEssay?.addEventListener('click', event => {
      if (activeFilter === 'all') return;
      const ids = [...document.querySelectorAll('#essayGrid [data-id]:not([hidden])')]
        .map(card => card.dataset.id)
        .filter(Boolean);
      if (!ids.length) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      const id = ids[Math.floor(Math.random() * ids.length)];
      location.hash = `#/essay/${encodeURIComponent(id)}`;
    }, { capture: true });

    // Mobile Safari can restore a hash route from its page cache without
    // replaying every expected lifecycle event. A very light reconciliation
    // while the Library is visible makes the UI converge to localStorage even
    // in that case. DOM is only changed when values actually differ.
    window.setInterval(() => {
      if (document.hidden) return;
      const library = document.getElementById('libraryView');
      if (library && !library.hidden) scheduleLibrarySync();
    }, 1500);

    syncForCurrentRoute();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();