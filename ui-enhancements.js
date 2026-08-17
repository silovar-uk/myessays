(() => {
  const readerView = document.getElementById('readerView');
  const readerContent = document.getElementById('readerContent');
  const essayGrid = document.getElementById('essayGrid');
  const randomEssay = document.getElementById('randomEssay');
  const noteTab = document.getElementById('noteTab');
  const noteTextarea = document.getElementById('noteTextarea');
  const clearNote = document.getElementById('clearNote');
  const quoteToNote = document.getElementById('quoteToNote');

  if (!readerView || !readerContent || !noteTab || !noteTextarea) return;

  const NOTE_PREFIX = 'myessays:reading-note:';
  const POSITION_PREFIX = 'myessays:reading-position:';
  let lastRestoredId = '';
  let savePositionRaf = 0;

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

  function isReaderVisible() {
    return !readerView.hidden;
  }

  function currentEssayId() {
    const match = location.hash.match(/^#\/essay\/(.+)$/);
    return match ? decodeURIComponent(match[1]) : '';
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
    try {
      return Boolean((localStorage.getItem(`${NOTE_PREFIX}${id}`) || '').trim());
    } catch {
      return false;
    }
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
    try {
      localStorage.setItem(`${POSITION_PREFIX}${id}`, String(Math.max(0, Math.round(window.scrollY))));
    } catch {}
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

    let stored = 0;
    try { stored = Number(localStorage.getItem(`${POSITION_PREFIX}${id}`) || 0); }
    catch { stored = 0; }

    lastRestoredId = id;
    const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    const target = Math.min(Math.max(0, stored), maxScroll);
    window.scrollTo({ top: target, behavior: 'auto' });
    updateProgress();
  }

  function visibleEssayIds() {
    if (!essayGrid) return [];
    const ids = [...essayGrid.querySelectorAll('[data-id]')]
      .map(card => card.dataset.id)
      .filter(Boolean);
    return [...new Set(ids)];
  }

  function openRandomEssay() {
    const ids = visibleEssayIds();
    if (!ids.length) return;
    const id = ids[Math.floor(Math.random() * ids.length)];
    location.hash = `#/essay/${encodeURIComponent(id)}`;
  }

  function syncSoon() {
    requestAnimationFrame(() => {
      updateProgress();
      updateMemoDot();
      updateLibraryNoteMarks();
      restoreReadingPosition();
    });
  }

  randomEssay?.addEventListener('click', openRandomEssay);
  noteTextarea.addEventListener('input', () => {
    updateMemoDot();
    updateLibraryNoteMarks();
  });
  clearNote?.addEventListener('click', () => setTimeout(syncSoon, 0));
  quoteToNote?.addEventListener('click', () => setTimeout(syncSoon, 0));
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
      return;
    }
    syncSoon();
  });
  window.addEventListener('storage', event => {
    if (event.key?.startsWith(NOTE_PREFIX)) updateLibraryNoteMarks();
  });

  // Clicking the brand while already on #/ does not fire hashchange, so make
  // the same "TOP means top" rule apply there as well.
  document.addEventListener('click', event => {
    const topLink = event.target.closest?.('a[href="#/"]');
    if (!topLink || currentEssayId()) return;
    requestAnimationFrame(resetLibraryPosition);
  });

  const readerObserver = new MutationObserver(syncSoon);
  readerObserver.observe(readerView, { attributes: true, attributeFilter: ['hidden'] });

  if (essayGrid) {
    const libraryObserver = new MutationObserver(() => requestAnimationFrame(updateLibraryNoteMarks));
    libraryObserver.observe(essayGrid, { childList: true });
  }

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) saveReadingPosition();
    else if (currentEssayId()) syncSoon();
    else resetLibraryPosition();
  });

  if (!currentEssayId()) resetLibraryPosition();
  setTimeout(syncSoon, 0);
})();
