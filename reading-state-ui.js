(() => {
  'use strict';

  const LEGACY_NOTE_PREFIX = 'myessays:reading-note:';
  const REFLECTION_ENTRY_PREFIX = 'myessays:reader-reflections:v1:';
  const REFLECTION_DRAFT_PREFIX = 'myessays:reader-reflections:draft:v1:';
  const READING_PREFIX = 'myessays:reading-state:';
  const FILTERS = ['all', 'unread', 'opened', 'completed', 'memo'];
  let activeFilter = 'all';
  let librarySyncQueued = false;
  let readerSyncQueued = false;
  let reflectionSyncTimer = 0;

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

  function legacyNoteFor(id) {
    if (!id) return '';
    return String(safeGet(`${LEGACY_NOTE_PREFIX}${id}`) || '').trim();
  }

  function reflectionEntries(id) {
    if (!id) return [];
    try {
      const value = JSON.parse(safeGet(`${REFLECTION_ENTRY_PREFIX}${id}`) || '[]');
      if (!Array.isArray(value)) return [];
      return value
        .map(entry => {
          if (!entry || typeof entry !== 'object') return null;
          const text = String(entry.text || '').trim();
          if (!text) return null;
          return {
            text,
            createdAt: String(entry.createdAt || ''),
            updatedAt: String(entry.updatedAt || entry.createdAt || '')
          };
        })
        .filter(Boolean)
        .sort((a, b) => String(b.updatedAt || b.createdAt).localeCompare(String(a.updatedAt || a.createdAt)));
    } catch {
      return [];
    }
  }

  function reflectionDraftFor(id) {
    if (!id) return '';
    try {
      const value = JSON.parse(safeGet(`${REFLECTION_DRAFT_PREFIX}${id}`) || '{}');
      return String(value?.text || '').trim();
    } catch {
      return '';
    }
  }

  function memoInfo(id) {
    const draft = reflectionDraftFor(id);
    if (draft) return { text: draft, source: 'after-reading-draft' };

    const entries = reflectionEntries(id);
    if (entries.length) return { text: entries[0].text, source: 'after-reading' };

    const legacy = legacyNoteFor(id);
    if (legacy) return { text: legacy, source: 'legacy-note' };

    return { text: '', source: '' };
  }

  function memoPreview(id) {
    const memo = memoInfo(id).text.replace(/\s+/g, ' ').trim();
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
    if (reading.openedAt || memoInfo(id).text) return 'opened';
    return 'unread';
  }

  function currentEssayId() {
    const match = location.hash.match(/^#\/essay\/(.+)$/);
    if (!match) return '';
    try { return decodeURIComponent(match[1]); }
    catch { return match[1]; }
  }

  function currentEssay() {
    const id = currentEssayId();
    if (!id) return null;
    try {
      if (typeof state !== 'undefined' && state.currentEssay?.id === id) return state.currentEssay;
      return typeof state !== 'undefined' && Array.isArray(state.essays)
        ? state.essays.find(essay => essay.id === id) || null
        : null;
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
    if (!id) return false;
    const reading = readState(id);
    const openedAt = reading.openedAt || new Date().toISOString();
    if (reading.completedAt) {
      const { completedAt, ...rest } = reading;
      writeState(id, { ...rest, openedAt });
      return false;
    }
    writeState(id, { ...reading, openedAt, completedAt: new Date().toISOString() });
    return true;
  }

  async function copyText(text) {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return;
    }
    const helper = document.createElement('textarea');
    helper.value = text;
    helper.setAttribute('readonly', '');
    helper.style.cssText = 'position:fixed;opacity:0;pointer-events:none';
    document.body.appendChild(helper);
    helper.select();
    const ok = document.execCommand('copy');
    helper.remove();
    if (!ok) throw new Error('copy failed');
  }

  function articleCopyText() {
    const essay = currentEssay();
    if (!essay) return '';
    const body = String(essay.body || '').trim();
    if (!body) return String(essay.title || '').trim();
    try {
      if (typeof renderMarkdown === 'function') {
        const holder = document.createElement('div');
        holder.innerHTML = renderMarkdown(body);
        return String(holder.innerText || holder.textContent || '').trim();
      }
    } catch {}
    return body;
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
    const info = memoInfo(id);
    const memo = memoPreview(id);
    let preview = card.querySelector('.reading-memo-preview');

    if (!memo) {
      preview?.remove();
      return;
    }

    if (!preview) {
      preview = document.createElement('p');
      preview.className = 'reading-memo-preview';
      preview.setAttribute('aria-label', '読後メモ');
      if (card.classList.contains('featured-card')) {
        const footer = card.querySelector('.featured-footer');
        footer ? footer.insertAdjacentElement('beforebegin', preview) : card.appendChild(preview);
      } else {
        const main = card.querySelector('.archive-main');
        main ? main.appendChild(preview) : card.appendChild(preview);
      }
    }

    preview.dataset.memoSource = info.source;
    const text = `✎ ${memo}`;
    if (preview.textContent !== text) preview.textContent = text;
    if (preview.title !== info.text) preview.title = info.text;
  }

  function matchesFilter(id) {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'memo') return Boolean(memoInfo(id).text);
    return progressFor(id) === activeFilter;
  }

  function decorateCard(card) {
    const id = card.dataset.id;
    if (!id) return false;

    const progress = progressFor(id);
    const hasMemo = Boolean(memoInfo(id).text);

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
    const content = document.getElementById('readerContent');
    if (!content || !currentEssayId()) return null;

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

  function revealCompletionZone(zone) {
    if (!zone || zone.dataset.revealReady === 'true') return;
    zone.dataset.revealReady = 'true';

    if (!('IntersectionObserver' in window)) {
      zone.classList.add('is-visible');
      return;
    }

    const observer = new IntersectionObserver(entries => {
      const entry = entries[0];
      if (!entry?.isIntersecting) return;
      zone.classList.add('is-visible');
      observer.disconnect();
    }, { threshold: 0.18, rootMargin: '0px 0px -6% 0px' });

    observer.observe(zone);
  }

  function ensureCompletionZone() {
    const id = currentEssayId();
    const content = document.getElementById('readerContent');
    if (!id || !content || !content.children.length) return null;

    let zone = content.querySelector('.reading-completion-zone');
    if (!zone) {
      zone = document.createElement('section');
      zone.className = 'reading-completion-zone';
      zone.setAttribute('aria-label', '読了を記録');
      zone.innerHTML = `
        <div class="reading-completion-divider" aria-hidden="true"><span></span><i>◦</i><span></span></div>
        <p class="reading-completion-kicker">END OF ESSAY</p>
        <h2 class="reading-completion-title">ここで、ひと区切り。</h2>
        <p class="reading-completion-message">読み終えた記録を残して、次の一本へ。</p>
        <button type="button" class="reading-complete-button" aria-pressed="false"></button>
        <p class="reading-completion-status" aria-live="polite" aria-atomic="true"></p>`;

      const button = zone.querySelector('.reading-complete-button');
      button?.addEventListener('click', () => {
        const target = currentEssayId();
        if (!target) return;
        const completed = toggleCompleted(target);
        syncReader({ announce: true });
        scheduleLibrarySync();

        if (completed) {
          zone.classList.remove('just-completed');
          requestAnimationFrame(() => zone.classList.add('just-completed'));
          window.setTimeout(() => zone.classList.remove('just-completed'), 680);
        }
      });
    }

    const reflections = content.querySelector('.reader-reflections');
    const endNavigation = content.querySelector('.reader-end-navigation');
    const anchor = reflections || endNavigation;
    if (anchor) {
      if (zone.nextElementSibling !== anchor) anchor.insertAdjacentElement('beforebegin', zone);
    } else if (zone !== content.lastElementChild) {
      content.appendChild(zone);
    }

    revealCompletionZone(zone);
    return zone;
  }

  function syncCompletionZone(options = {}) {
    const id = currentEssayId();
    if (!id) return;

    const zone = ensureCompletionZone();
    const button = zone?.querySelector('.reading-complete-button');
    const status = zone?.querySelector('.reading-completion-status');
    if (!zone || !button) return;

    const completed = progressFor(id) === 'completed';
    const stateName = completed ? 'completed' : 'open';
    zone.classList.toggle('is-completed', completed);
    button.classList.toggle('is-completed', completed);
    button.setAttribute('aria-pressed', String(completed));

    if (button.dataset.completionState !== stateName) {
      button.dataset.completionState = stateName;
      button.innerHTML = completed
        ? '<span class="reading-complete-icon" aria-hidden="true">✓</span><span class="reading-complete-copy"><strong class="reading-complete-label">読了しました</strong><small>記録済み · もう一度押すと解除</small></span>'
        : '<span class="reading-complete-icon" aria-hidden="true">○</span><span class="reading-complete-copy"><strong class="reading-complete-label">読了を記録する</strong><small>読み終えた記事として保存</small></span>';
    }

    button.title = completed ? 'もう一度押すと読了を解除' : 'この記事を読み終えた記録を残す';
    if (status) {
      status.textContent = options.announce
        ? (completed ? '読了を記録しました。' : '読了記録を解除しました。')
        : '';
    }
  }

  function syncReader(options = {}) {
    readerSyncQueued = false;
    const id = currentEssayId();
    if (!id) return;

    markOpened(id);
    ensureCopyButton();
    syncCompletionZone(options);
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

  function scheduleReflectionReconcile() {
    clearTimeout(reflectionSyncTimer);
    reflectionSyncTimer = window.setTimeout(() => {
      scheduleLibrarySync();
      scheduleReaderSync();
    }, 650);
  }

  function init() {
    ensureTabs();

    const grid = document.getElementById('essayGrid');
    if (grid) new MutationObserver(scheduleLibrarySync).observe(grid, { childList: true });

    const readerContent = document.getElementById('readerContent');
    if (readerContent) new MutationObserver(scheduleReaderSync).observe(readerContent, { childList: true });

    document.addEventListener('input', event => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      if (target.matches('#noteTextarea, .reflection-composer-input, .reflection-edit-textarea')) {
        scheduleReflectionReconcile();
      }
    }, true);

    document.addEventListener('click', event => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      if (target.closest('.reflection-add-button, [data-action="delete"], [data-undo]')) {
        window.setTimeout(scheduleLibrarySync, 40);
        window.setTimeout(scheduleLibrarySync, 520);
      }
    }, true);

    document.addEventListener('myessays:reader-rendered', scheduleReaderSync);
    document.addEventListener('myessays:reader-ready', scheduleReaderSync);
    document.addEventListener('myessays:reader-language-changed', scheduleReaderSync);
    window.addEventListener('hashchange', syncForCurrentRoute);
    window.addEventListener('pageshow', syncForCurrentRoute);
    window.addEventListener('focus', syncForCurrentRoute);
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) syncForCurrentRoute();
    });
    window.addEventListener('storage', event => {
      const key = event.key || '';
      if (
        key.startsWith(LEGACY_NOTE_PREFIX) ||
        key.startsWith(REFLECTION_ENTRY_PREFIX) ||
        key.startsWith(REFLECTION_DRAFT_PREFIX) ||
        key.startsWith(READING_PREFIX)
      ) syncForCurrentRoute();
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

    window.setInterval(() => {
      if (document.hidden) return;
      const library = document.getElementById('libraryView');
      if (library && !library.hidden) scheduleLibrarySync();
    }, 1500);

    syncForCurrentRoute();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
