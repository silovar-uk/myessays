(() => {
  'use strict';

  const NOTE_PREFIX = 'myessays:reading-note:';
  let lastEssayId = '';
  const drafts = new Map();
  let syncQueued = false;

  const currentEssayId = () => {
    const match = location.hash.match(/^#\/essay\/(.+)$/);
    if (!match) return '';
    try { return decodeURIComponent(match[1]); }
    catch { return match[1]; }
  };

  const noteElement = () => document.getElementById('noteTextarea');

  const readMemo = (id) => {
    if (!id) return '';
    if (drafts.has(id)) return String(drafts.get(id) || '').trim();
    try { return (localStorage.getItem(`${NOTE_PREFIX}${id}`) || '').trim(); }
    catch { return ''; }
  };

  const saveMemoValue = (id, value) => {
    if (!id) return;
    drafts.set(id, value || '');
    try {
      if (String(value || '').trim()) localStorage.setItem(`${NOTE_PREFIX}${id}`, value);
      else localStorage.removeItem(`${NOTE_PREFIX}${id}`);
    } catch {}
  };

  const rememberCurrentDraft = () => {
    const id = currentEssayId() || lastEssayId;
    const note = noteElement();
    if (!id || !note) return;
    drafts.set(id, note.value || '');
  };

  const persistCurrentDraft = () => {
    const id = currentEssayId() || lastEssayId;
    const note = noteElement();
    if (!id || !note) return;
    saveMemoValue(id, note.value || '');
  };

  const previewText = (value) => {
    const clean = String(value || '').replace(/\s+/g, ' ').trim();
    if (!clean) return '';
    return clean.length > 78 ? `${clean.slice(0, 78)}…` : clean;
  };

  function syncCard(card) {
    const id = card.dataset.id;
    if (!id) return false;
    const memo = readMemo(id);
    const hasMemo = Boolean(memo);

    card.classList.toggle('has-reading-note', hasMemo);
    card.dataset.hasReadingNote = String(hasMemo);

    let preview = card.querySelector('.reading-memo-preview');
    if (!hasMemo) {
      preview?.remove();
      return false;
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

    const text = `✎ ${previewText(memo)}`;
    if (preview.textContent !== text) preview.textContent = text;
    if (preview.title !== memo) preview.title = memo;
    return true;
  }

  function memoFilterActive() {
    const button = document.querySelector('[data-reading-filter="memo"]');
    return Boolean(button && (button.classList.contains('is-active') || button.getAttribute('aria-pressed') === 'true'));
  }

  function syncLibrary() {
    const grid = document.getElementById('essayGrid');
    if (!grid) return;

    const cards = [...grid.querySelectorAll('[data-id]')];
    if (!cards.length) return;

    const isMemoFilter = memoFilterActive();
    let memoCount = 0;
    cards.forEach(card => {
      const hasMemo = syncCard(card);
      if (hasMemo) memoCount += 1;
      if (isMemoFilter) card.hidden = !hasMemo;
    });

    if (isMemoFilter) {
      grid.querySelectorAll('.library-section').forEach(section => {
        section.hidden = ![...section.querySelectorAll('[data-id]')].some(card => !card.hidden);
      });
      const resultCount = document.getElementById('resultCount');
      if (resultCount) resultCount.textContent = `${memoCount} essays · メモあり`;
      const empty = document.getElementById('emptyState');
      if (empty) {
        empty.hidden = memoCount > 0;
        empty.textContent = 'メモのある論考はまだない。';
      }
    }
  }

  function scheduleSync() {
    if (syncQueued) return;
    syncQueued = true;
    requestAnimationFrame(() => {
      syncQueued = false;
      syncLibrary();
    });
  }

  function captureReaderMemo() {
    const id = currentEssayId();
    if (!id) return;
    lastEssayId = id;
    const note = noteElement();
    if (!note) return;
    drafts.set(id, note.value || '');
    saveMemoValue(id, note.value || '');
    scheduleSync();
  }

  function bindNoteEvents() {
    const note = noteElement();
    if (!note || note.dataset.memoSyncBound === 'true') return;
    note.dataset.memoSyncBound = 'true';

    const commit = () => {
      const id = currentEssayId() || lastEssayId;
      if (!id) return;
      saveMemoValue(id, note.value || '');
      scheduleSync();
    };

    note.addEventListener('input', commit);
    note.addEventListener('change', commit);
    note.addEventListener('blur', commit);
    note.addEventListener('compositionend', commit);
    note.addEventListener('beforeinput', () => requestAnimationFrame(commit));
    note.addEventListener('keyup', commit);
  }

  function init() {
    bindNoteEvents();

    const grid = document.getElementById('essayGrid');
    if (grid) new MutationObserver(scheduleSync).observe(grid, { childList: true, subtree: true });

    document.addEventListener('myessays:reader-rendered', () => {
      bindNoteEvents();
      requestAnimationFrame(captureReaderMemo);
    });
    document.addEventListener('myessays:reader-ready', () => requestAnimationFrame(captureReaderMemo));

    document.addEventListener('pointerdown', event => {
      if (!currentEssayId()) return;
      const leaving = event.target.closest?.('#backButton, a[href="#/"], a[href^="#/essay/"]');
      if (!leaving) return;
      rememberCurrentDraft();
      persistCurrentDraft();
    }, true);

    document.addEventListener('click', event => {
      if (event.target.closest?.('[data-reading-filter="memo"]')) requestAnimationFrame(scheduleSync);
    });

    window.addEventListener('hashchange', () => {
      const nextId = currentEssayId();
      if (!nextId) {
        scheduleSync();
        return;
      }
      lastEssayId = nextId;
      requestAnimationFrame(() => {
        bindNoteEvents();
        captureReaderMemo();
      });
    });

    window.addEventListener('pageshow', () => {
      bindNoteEvents();
      if (currentEssayId()) requestAnimationFrame(captureReaderMemo);
      scheduleSync();
    });

    window.addEventListener('pagehide', persistCurrentDraft);
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) persistCurrentDraft();
      else scheduleSync();
    });

    window.addEventListener('storage', event => {
      if (event.key?.startsWith(NOTE_PREFIX)) scheduleSync();
    });

    if (currentEssayId()) requestAnimationFrame(captureReaderMemo);
    scheduleSync();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
