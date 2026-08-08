(() => {
  const readerView = document.getElementById('readerView');
  const readerContent = document.getElementById('readerContent');
  const noteTab = document.getElementById('noteTab');
  const noteTextarea = document.getElementById('noteTextarea');

  if (!readerView || !readerContent || !noteTab || !noteTextarea) return;

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

  noteTextarea.addEventListener('input', updateMemoDot);
  window.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', updateProgress);
  window.addEventListener('hashchange', () => {
    requestAnimationFrame(() => {
      updateProgress();
      updateMemoDot();
    });
  });

  const readerObserver = new MutationObserver(() => {
    requestAnimationFrame(() => {
      updateProgress();
      updateMemoDot();
    });
  });
  readerObserver.observe(readerView, { attributes: true, attributeFilter: ['hidden'] });

  const textareaObserver = new MutationObserver(updateMemoDot);
  textareaObserver.observe(noteTextarea, { attributes: true });

  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
      updateProgress();
      updateMemoDot();
    }
  });

  setTimeout(() => {
    updateProgress();
    updateMemoDot();
  }, 0);
})();
