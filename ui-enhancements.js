(() => {
  const readerView = document.getElementById('readerView');
  const readerContent = document.getElementById('readerContent');
  const essayGrid = document.getElementById('essayGrid');
  const noteTab = document.getElementById('noteTab');
  const noteTextarea = document.getElementById('noteTextarea');
  const clearNote = document.getElementById('clearNote');
  const quoteToNote = document.getElementById('quoteToNote');

  if (!readerView || !readerContent || !noteTab || !noteTextarea) return;

  const NOTE_PREFIX = 'myessays:reading-note:';

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

  function syncSoon() {
    requestAnimationFrame(() => {
      updateProgress();
      updateMemoDot();
      updateLibraryNoteMarks();
    });
  }

  noteTextarea.addEventListener('input', () => {
    updateMemoDot();
    updateLibraryNoteMarks();
  });
  clearNote?.addEventListener('click', () => setTimeout(syncSoon, 0));
  quoteToNote?.addEventListener('click', () => setTimeout(syncSoon, 0));
  window.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', updateProgress);
  window.addEventListener('hashchange', syncSoon);
  window.addEventListener('storage', event => {
    if (event.key?.startsWith(NOTE_PREFIX)) updateLibraryNoteMarks();
  });

  const readerObserver = new MutationObserver(syncSoon);
  readerObserver.observe(readerView, { attributes: true, attributeFilter: ['hidden'] });

  if (essayGrid) {
    const libraryObserver = new MutationObserver(() => requestAnimationFrame(updateLibraryNoteMarks));
    libraryObserver.observe(essayGrid, { childList: true });
  }

  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) syncSoon();
  });

  setTimeout(syncSoon, 0);
})();
