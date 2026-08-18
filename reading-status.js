(() => {
  'use strict';

  const READING_PREFIX = 'myessays:reading-state:';
  const NOTE_PREFIX = 'myessays:reading-note:';
  const FILTERS = ['all', 'unread', 'opened', 'completed', 'memo'];
  let activeFilter = 'all';
  let decorateQueued = false;

  const safeStorageGet = (key) => {
    try { return localStorage.getItem(key); }
    catch { return null; }
  };

  const safeStorageSet = (key, value) => {
    try { localStorage.setItem(key, value); return true; }
    catch { return false; }
  };

  const readState = (id) => {
    if (!id) return {};
    const raw = safeStorageGet(`${READING_PREFIX}${id}`);
    if (!raw) return {};
    try {
      const parsed = JSON.parse(raw);
      return parsed && typeof parsed === 'object' ? parsed : {};
    } catch {
      return {};
    }
  };

  const writeState = (id, next) => {
    if (!id) return false;
    return safeStorageSet(`${READING_PREFIX}${id}`, JSON.stringify(next));
  };

  const hasMemo = (id) => Boolean((safeStorageGet(`${NOTE_PREFIX}${id}`) || '').trim());

  const progressFor = (id) => {
    const reading = readState(id);
    if (reading.completedAt) return 'completed';
    if (reading.openedAt || hasMemo(id)) return 'opened';
    return 'unread';
  };

  const currentEssayId = () => {
    const match = location.hash.match(/^#\/essay\/(.+)$/);
    if (!match) return '';
    try { return decodeURIComponent(match[1]); }
    catch { return match[1]; }
  };

  const markOpened = (id) => {
    if (!id) return;
    const reading = readState(id);
    if (reading.openedAt) return;
    writeState(id, { ...reading, openedAt: new Date().toISOString() });
  };

  const toggleCompleted = (id) => {
    if (!id) return;
    const reading = readState(id);
    const openedAt = reading.openedAt || new Date().toISOString();
    if (reading.completedAt) {
      const { completedAt, ...rest } = reading;
      writeState(id, { ...rest, openedAt });
    } else {
      writeState(id, { ...reading, openedAt, completedAt: new Date().toISOString() });
    }
  };

  const matchesFilter = (id) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'memo') return hasMemo(id);
    return progressFor(id) === activeFilter;
  };

  function ensureTabs() {
    const toolbar = document.querySelector('.library-toolbar');
    if (!toolbar || document.querySelector('.reading-status-tabs')) return;

    const tabs = document.createElement('nav');
    tabs.className = 'reading-status-tabs';
    tabs.setAttribute('aria-label', '読書状態');
    tabs.innerHTML = `
      <button type="button" class="reading-status-tab is-active" data-reading-filter="all" aria-pressed="true">すべて</button>
      <button type="button" class="reading-status-tab" data-reading-filter="unread" aria-pressed="false"><span class="reading-status-dot" aria-hidden="true"></span>未読</button>
      <button type="button" class="reading-status-tab" data-reading-filter="opened" aria-pressed="false"><span class="reading-status-dot" aria-hidden="true"></span>開いた</button>
      <button type="button" class="reading-status-tab" data-reading-filter="completed" aria-pressed="false"><span class="reading-status-dot" aria-hidden="true"></span>読了</button>
      <button type="button" class="reading-status-tab" data-reading-filter="memo" aria-pressed="false"><span class="reading-status-dot" aria-hidden="true"></span>メモあり</button>`;
    toolbar.insertAdjacentElement('afterend', tabs);

    tabs.addEventListener('click', (event) => {
      const button = event.target.closest('[data-reading-filter]');
      if (!button) return;
      const next = button.dataset.readingFilter;
      if (!FILTERS.includes(next)) return;
      activeFilter = next;
      tabs.querySelectorAll('[data-reading-filter]').forEach((tab) => {
        const active = tab === button;
        tab.classList.toggle('is-active', active);
        tab.setAttribute('aria-pressed', String(active));
      });
      const sortSelect = document.getElementById('sortSelect');
      if (sortSelect) sortSelect.dispatchEvent(new Event('change'));
      else decorateLibrary();
    });
  }

  function decorateCard(card) {
    const id = card.dataset.id;
    if (!id) return false;

    const progress = progressFor(id);
    const memo = hasMemo(id);
    card.classList.remove('reading-unread', 'reading-opened', 'reading-completed', 'has-reading-note');
    card.classList.add(`reading-${progress}`);
    card.classList.toggle('has-reading-note', memo);
    card.dataset.readingStatus = progress;
    card.dataset.hasReadingNote = String(memo);

    const visible = matchesFilter(id);
    card.hidden = !visible;
    return visible;
  }

  function decorateLibrary() {
    ensureTabs();
    const grid = document.getElementById('essayGrid');
    if (!grid) return;

    const cards = [...grid.querySelectorAll('[data-id]')];
    if (!cards.length) return;

    let visibleCount = 0;
    cards.forEach((card) => { if (decorateCard(card)) visibleCount += 1; });

    grid.querySelectorAll('.library-section').forEach((section) => {
      const visibleCards = [...section.querySelectorAll('[data-id]')].filter((card) => !card.hidden);
      section.hidden = visibleCards.length === 0;
      if (section.classList.contains('archive-section')) {
        const count = section.querySelector('.section-heading span');
        if (count && activeFilter !== 'all') count.textContent = `${visibleCards.length} essays`;
      }
    });

    const empty = document.getElementById('emptyState');
    if (empty && activeFilter !== 'all') {
      empty.hidden = visibleCount > 0;
      empty.textContent = 'この読書状態に合う論考はまだない。';
    }

    const resultCount = document.getElementById('resultCount');
    if (resultCount && activeFilter !== 'all') {
      resultCount.textContent = `${visibleCount} essays · 読書状態で絞り込み`;
    }
  }

  function scheduleDecorate() {
    if (decorateQueued) return;
    decorateQueued = true;
    requestAnimationFrame(() => {
      decorateQueued = false;
      decorateLibrary();
    });
  }

  function syncCompleteButton() {
    const id = currentEssayId();
    const aside = document.getElementById('readerAside');
    if (!id || !aside) return;

    let button = aside.querySelector('.reading-complete-button');
    if (!button) {
      button = document.createElement('button');
      button.type = 'button';
      button.className = 'reading-complete-button';
      aside.querySelector('.meta-block')?.insertAdjacentElement('afterend', button);
      button.addEventListener('click', () => {
        const targetId = currentEssayId();
        if (!targetId) return;
        toggleCompleted(targetId);
        syncCompleteButton();
        scheduleDecorate();
      });
    }

    const completed = progressFor(id) === 'completed';
    button.classList.toggle('is-completed', completed);
    button.setAttribute('aria-pressed', String(completed));
    button.innerHTML = completed
      ? '<span aria-hidden="true">✓</span><span>読了済み</span>'
      : '<span aria-hidden="true">○</span><span>読了にする</span>';
    button.title = completed ? 'もう一度押すと読了を解除' : 'この記事を読み終わったとして記録';
  }

  function syncReaderState() {
    const id = currentEssayId();
    if (!id) return;
    markOpened(id);
    syncCompleteButton();
  }

  function init() {
    ensureTabs();

    const grid = document.getElementById('essayGrid');
    if (grid) {
      new MutationObserver(scheduleDecorate).observe(grid, { childList: true, subtree: true });
    }

    document.addEventListener('myessays:reader-rendered', syncReaderState);
    window.addEventListener('hashchange', () => {
      if (currentEssayId()) syncReaderState();
      else scheduleDecorate();
    });

    const note = document.getElementById('noteTextarea');
    note?.addEventListener('input', scheduleDecorate);

    const randomEssay = document.getElementById('randomEssay');
    randomEssay?.addEventListener('click', (event) => {
      if (activeFilter === 'all') return;
      const visibleIds = [...document.querySelectorAll('#essayGrid [data-id]:not([hidden])')]
        .map((card) => card.dataset.id)
        .filter(Boolean);
      if (!visibleIds.length) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      const id = visibleIds[Math.floor(Math.random() * visibleIds.length)];
      location.hash = `#/essay/${encodeURIComponent(id)}`;
    }, { capture: true });

    syncReaderState();
    scheduleDecorate();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
