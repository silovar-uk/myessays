(() => {
  const readerView = document.getElementById('readerView');
  const readerContent = document.getElementById('readerContent');
  const essayGrid = document.getElementById('essayGrid');
  const randomEssay = document.getElementById('randomEssay');
  const unreadRandomEssay = document.getElementById('unreadRandomEssay');
  const unreadRandomCount = document.getElementById('unreadRandomCount');
  const noteTab = document.getElementById('noteTab');
  const noteTextarea = document.getElementById('noteTextarea');
  const clearNote = document.getElementById('clearNote');
  const quoteToNote = document.getElementById('quoteToNote');
  const siteHeader = document.querySelector('.site-header');

  if (!readerView || !readerContent || !noteTab || !noteTextarea) return;

  const NOTE_PREFIX = 'myessays:reading-note:';
  const POSITION_PREFIX = 'myessays:reading-position:';
  const READING_PREFIX = 'myessays:reading-state:';
  const RANDOM_HISTORY_KEY = 'myessays:random-history:v1';
  const RANDOM_HISTORY_LIMIT = 5;
  let lastRestoredId = '';
  let savePositionRaf = 0;
  let discoverySyncRaf = 0;

  // Route-specific scroll behavior is handled by MyEssays itself:
  // the library always starts at the top, while article positions are restored
  // from localStorage below. Disable the browser's competing history restoration.
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

  const track = document.createElement('div');
  track.className = 'reading-progress-track';
  track.setAttribute('aria-hidden', 'true');
  const bar = document.createElement('div');
  bar.className = 'reading-progress-bar';
  track.appendChild(bar);
  document.body.appendChild(track);

  function safeGet(key, storage = localStorage) {
    try { return storage.getItem(key); }
    catch { return null; }
  }

  function safeSet(key, value, storage = localStorage) {
    try {
      storage.setItem(key, value);
      return true;
    } catch {
      return false;
    }
  }

  function isReaderVisible() {
    return !readerView.hidden;
  }

  function currentEssayId() {
    const match = location.hash.match(/^#\/essay\/(.+)$/);
    return match ? decodeURIComponent(match[1]) : '';
  }

  function updateHeaderMode() {
    siteHeader?.classList.toggle('is-library-view', !isReaderVisible());
  }

  function resetLibraryPosition() {
    if (currentEssayId()) return;
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }

  function updateProgress() {
    if (!isReaderVisible()) {
      track.classList.remove('is-visible');
      bar.style.width = '0%';
      return;
    }

    track.classList.add('is-visible');
    const rect = readerContent.getBoundingClientRect();
    const contentTop = window.scrollY + rect.top;
    const contentHeight = readerContent.scrollHeight;
    const start = contentTop;
    const end = Math.max(start + 1, contentTop + contentHeight - window.innerHeight);
    const progress = Math.min(1, Math.max(0, (window.scrollY - start) / (end - start)));
    bar.style.width = `${(progress * 100).toFixed(2)}%`;
  }

  function updateMemoDot() {
    noteTab.classList.toggle('has-note', Boolean(noteTextarea.value.trim()));
  }

  function hasStoredNote(id) {
    if (!id) return false;
    return Boolean(String(safeGet(`${NOTE_PREFIX}${id}`) || '').trim());
  }

  function readState(id) {
    if (!id) return {};
    try {
      const value = JSON.parse(safeGet(`${READING_PREFIX}${id}`) || '{}');
      return value && typeof value === 'object' ? value : {};
    } catch {
      return {};
    }
  }

  function isCompleted(id) {
    return Boolean(readState(id).completedAt);
  }

  function updateLibraryNoteMarks() {
    if (!essayGrid) return;
    essayGrid.querySelectorAll('[data-id]').forEach(card => {
      const tags = card.querySelector('.mini-tags');
      if (!tags) return;

      const hasNote = hasStoredNote(card.dataset.id);
      let mark = tags.querySelector('.library-note-mark');

      if (hasNote && !mark) {
        mark = document.createElement('span');
        mark.className = 'library-note-mark';
        mark.textContent = '✎';
        mark.title = '読書メモあり';
        mark.setAttribute('aria-label', '読書メモあり');
        tags.prepend(mark);
      } else if (!hasNote && mark) {
        mark.remove();
      }
    });
  }

  function saveReadingPosition() {
    if (!isReaderVisible()) return;
    const id = currentEssayId();
    if (!id) return;
    safeSet(`${POSITION_PREFIX}${id}`, String(Math.max(0, Math.round(window.scrollY))));
  }

  function queueSaveReadingPosition() {
    if (savePositionRaf) return;
    savePositionRaf = requestAnimationFrame(() => {
      savePositionRaf = 0;
      saveReadingPosition();
    });
  }

  function restoreReadingPosition() {
    if (!isReaderVisible()) return;
    const id = currentEssayId();
    if (!id || lastRestoredId === id) return;

    const stored = Number(safeGet(`${POSITION_PREFIX}${id}`) || 0);
    lastRestoredId = id;
    const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    const target = Math.min(Math.max(0, Number.isFinite(stored) ? stored : 0), maxScroll);
    window.scrollTo({ top: target, behavior: 'auto' });
    updateProgress();
  }

  function visibleEssayIds({ uncompletedOnly = false } = {}) {
    if (!essayGrid) return [];
    const ids = [...essayGrid.querySelectorAll('[data-id]')]
      .filter(card => !card.hidden && !card.closest('.library-section[hidden]'))
      .map(card => card.dataset.id)
      .filter(Boolean);
    const uniqueIds = [...new Set(ids)];
    return uncompletedOnly ? uniqueIds.filter(id => !isCompleted(id)) : uniqueIds;
  }

  function allUncompletedEssayIds({ exclude = '' } = {}) {
    try {
      if (typeof state === 'undefined' || !Array.isArray(state.essays)) return [];
      return [...new Set(state.essays.map(essay => essay?.id).filter(Boolean))]
        .filter(id => id !== exclude && !isCompleted(id));
    } catch {
      return [];
    }
  }

  function randomHistory() {
    try {
      const value = JSON.parse(safeGet(RANDOM_HISTORY_KEY, sessionStorage) || '[]');
      return Array.isArray(value) ? value.filter(Boolean).slice(-RANDOM_HISTORY_LIMIT) : [];
    } catch {
      return [];
    }
  }

  function rememberRandom(id) {
    if (!id) return;
    const history = randomHistory().filter(value => value !== id);
    history.push(id);
    safeSet(RANDOM_HISTORY_KEY, JSON.stringify(history.slice(-RANDOM_HISTORY_LIMIT)), sessionStorage);
  }

  function pickRandomId(ids) {
    const candidates = [...new Set(ids)].filter(Boolean);
    if (!candidates.length) return '';
    const recent = new Set(randomHistory());
    const fresh = candidates.filter(id => !recent.has(id));
    const pool = fresh.length ? fresh : candidates;
    return pool[Math.floor(Math.random() * pool.length)] || '';
  }

  function openRandomFrom(ids) {
    const id = pickRandomId(ids);
    if (!id) return;
    rememberRandom(id);
    location.hash = `#/essay/${encodeURIComponent(id)}`;
  }

  function openRandomEssay() {
    openRandomFrom(visibleEssayIds());
  }

  function openUnreadRandomEssay() {
    openRandomFrom(visibleEssayIds({ uncompletedOnly: true }));
  }

  function updateRandomActions() {
    const visibleIds = visibleEssayIds();
    const unreadIds = visibleEssayIds({ uncompletedOnly: true });

    if (randomEssay) {
      randomEssay.disabled = visibleIds.length === 0;
      randomEssay.setAttribute('aria-disabled', String(visibleIds.length === 0));
      randomEssay.title = visibleIds.length
        ? `現在の候補 ${visibleIds.length}本からランダムに1本読む`
        : '現在の条件では候補がありません';
    }

    if (unreadRandomEssay) {
      unreadRandomEssay.disabled = unreadIds.length === 0;
      unreadRandomEssay.setAttribute('aria-disabled', String(unreadIds.length === 0));
      unreadRandomEssay.title = unreadIds.length
        ? `現在の候補のうち未読了 ${unreadIds.length}本からランダムに1本読む`
        : (visibleIds.length ? '現在の候補はすべて読了済みです' : '現在の条件では候補がありません');
      unreadRandomEssay.classList.toggle('is-empty', unreadIds.length === 0);
    }

    if (unreadRandomCount) {
      unreadRandomCount.hidden = unreadIds.length === 0;
      unreadRandomCount.textContent = String(unreadIds.length);
      unreadRandomCount.setAttribute('aria-label', `未読了 ${unreadIds.length}本`);
    }
  }

  function ensureNextUnreadButton() {
    const zone = readerContent.querySelector('.reading-completion-zone');
    if (!zone) return null;

    let button = zone.querySelector('.reading-next-unread-button');
    if (!button) {
      button = document.createElement('button');
      button.type = 'button';
      button.className = 'reading-next-unread-button';
      button.addEventListener('click', () => {
        const candidates = allUncompletedEssayIds({ exclude: currentEssayId() });
        openRandomFrom(candidates);
      });
      zone.appendChild(button);
    }

    const candidates = allUncompletedEssayIds({ exclude: currentEssayId() });
    button.disabled = candidates.length === 0;
    button.setAttribute('aria-disabled', String(candidates.length === 0));
    button.textContent = candidates.length
      ? `未読了から次の1本  ↝  ${candidates.length}`
      : '未読了の記事はありません';
    button.title = candidates.length
      ? `未読了 ${candidates.length}本から次の記事を選ぶ`
      : '未読了の記事はありません';
    return button;
  }

  function syncDiscoverySoon() {
    if (discoverySyncRaf) return;
    discoverySyncRaf = requestAnimationFrame(() => {
      discoverySyncRaf = 0;
      updateRandomActions();
      ensureNextUnreadButton();
    });
  }

  function syncSoon() {
    requestAnimationFrame(() => {
      updateHeaderMode();
      updateProgress();
      updateMemoDot();
      updateLibraryNoteMarks();
      restoreReadingPosition();
      updateRandomActions();
      ensureNextUnreadButton();
    });
  }

  randomEssay?.addEventListener('click', openRandomEssay);
  unreadRandomEssay?.addEventListener('click', openUnreadRandomEssay);
  noteTextarea.addEventListener('input', () => {
    updateMemoDot();
    updateLibraryNoteMarks();
  });
  clearNote?.addEventListener('click', () => setTimeout(syncSoon, 0));
  quoteToNote?.addEventListener('click', () => setTimeout(syncSoon, 0));
  readerContent.addEventListener('click', event => {
    if (event.target.closest('.reading-complete-button')) setTimeout(syncDiscoverySoon, 0);
  });
  window.addEventListener('scroll', () => {
    updateProgress();
    queueSaveReadingPosition();
  }, { passive: true });
  window.addEventListener('resize', updateProgress);
  window.addEventListener('pagehide', saveReadingPosition);
  window.addEventListener('pageshow', () => {
    if (currentEssayId()) syncSoon();
    else resetLibraryPosition();
  });
  window.addEventListener('hashchange', () => {
    const id = currentEssayId();
    if (!id) {
      lastRestoredId = '';
      resetLibraryPosition();
      syncSoon();
      return;
    }
    syncSoon();
  });
  window.addEventListener('storage', event => {
    if (event.key?.startsWith(NOTE_PREFIX)) updateLibraryNoteMarks();
    if (event.key?.startsWith(READING_PREFIX)) syncDiscoverySoon();
  });

  // Clicking the brand while already on #/ does not fire hashchange, so make
  // the same "TOP means top" rule apply there as well.
  document.addEventListener('click', event => {
    const topLink = event.target.closest?.('a[href="#/"]');
    if (!topLink || currentEssayId()) return;
    requestAnimationFrame(resetLibraryPosition);
  });

  const readerObserver = new MutationObserver(syncDiscoverySoon);
  readerObserver.observe(readerView, { attributes: true, attributeFilter: ['hidden'] });

  const readerContentObserver = new MutationObserver(syncDiscoverySoon);
  readerContentObserver.observe(readerContent, { childList: true, subtree: true });

  if (essayGrid) {
    const libraryObserver = new MutationObserver(() => {
      requestAnimationFrame(updateLibraryNoteMarks);
      syncDiscoverySoon();
    });
    libraryObserver.observe(essayGrid, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['hidden', 'data-reading-status']
    });
  }

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) saveReadingPosition();
    else if (currentEssayId()) syncSoon();
    else {
      resetLibraryPosition();
      syncSoon();
    }
  });

  updateHeaderMode();
  if (!currentEssayId()) resetLibraryPosition();
  setTimeout(syncSoon, 0);
})();