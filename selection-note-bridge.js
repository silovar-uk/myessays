(() => {
  const readerContent = document.getElementById('readerContent');
  const noteTab = document.getElementById('noteTab');
  const notePanel = document.getElementById('notePanel');
  const noteTextarea = document.getElementById('noteTextarea');

  if (!readerContent || !noteTab || !notePanel || !noteTextarea) return;

  function appendQuote(text) {
    const clean = String(text || '').trim();
    if (!clean) return;

    const quoted = clean
      .split(/\n+/)
      .map(line => `> ${line.trim()}`)
      .join('\n');

    const current = noteTextarea.value.trimEnd();
    noteTextarea.value = `${current}${current ? '\n\n' : ''}${quoted}\n`;
    noteTextarea.dispatchEvent(new Event('input', { bubbles: true }));

    if (!notePanel.classList.contains('is-open')) {
      noteTab.click();
      return;
    }

    requestAnimationFrame(() => {
      noteTextarea.focus();
      noteTextarea.setSelectionRange(noteTextarea.value.length, noteTextarea.value.length);
    });
  }

  readerContent.addEventListener('myessays:add-note-quote', event => {
    appendQuote(event.detail?.text);
  });
})();
