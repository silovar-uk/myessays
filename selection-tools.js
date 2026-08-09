(() => {
  const readerView = document.getElementById('readerView');
  const readerContent = document.getElementById('readerContent');
  const quoteMenu = document.getElementById('quoteMenu');
  const quoteToNote = document.getElementById('quoteToNote');
  const noteTab = document.getElementById('noteTab');
  const notePanel = document.getElementById('notePanel');
  const noteTextarea = document.getElementById('noteTextarea');

  if (!readerView || !readerContent || !quoteMenu || !quoteToNote) return;

  let selectedText = '';
  let selectionTimer = 0;

  const providers = {
    google(text) {
      return `https://www.google.com/search?q=${encodeURIComponent(text)}`;
    },
    dictionary(text) {
      return `https://eow.alc.co.jp/search?q=${encodeURIComponent(text)}`;
    },
    translate(text) {
      return `https://translate.google.com/?sl=en&tl=ja&text=${encodeURIComponent(text)}&op=translate`;
    }
  };

  const toolBar = document.createElement('div');
  toolBar.id = 'selectionTools';
  toolBar.className = 'selection-tools';
  toolBar.hidden = true;
  toolBar.setAttribute('role', 'toolbar');
  toolBar.setAttribute('aria-label', '選択した英文の操作');
  toolBar.innerHTML = `
    <button type="button" data-selection-action="google"><span aria-hidden="true">⌕</span><span>Google</span></button>
    <button type="button" data-selection-action="dictionary"><span aria-hidden="true">Aa</span><span>辞書</span></button>
    <button type="button" data-selection-action="translate"><span aria-hidden="true">文</span><span>翻訳</span></button>
    <button type="button" data-selection-action="memo"><span aria-hidden="true">✎</span><span>メモ</span></button>`;
  document.body.appendChild(toolBar);

  function addContextAction(action, icon, label) {
    const button = document.createElement('button');
    button.type = 'button';
    button.dataset.selectionAction = action;
    button.className = 'selection-context-action';
    button.setAttribute('role', 'menuitem');
    button.innerHTML = `<span aria-hidden="true">${icon}</span> ${label}`;
    quoteMenu.insertBefore(button, quoteToNote);
    return button;
  }

  const contextButtons = [
    addContextAction('google', '⌕', 'Googleで検索'),
    addContextAction('dictionary', 'Aa', '英辞郎で調べる'),
    addContextAction('translate', '文', '日本語に翻訳')
  ];

  function selectionData() {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed || !selection.rangeCount) return null;

    const text = selection.toString().trim();
    if (!text || !/[A-Za-z]/.test(text)) return null;

    const range = selection.getRangeAt(0);
    let node = range.commonAncestorContainer;
    if (node.nodeType === Node.TEXT_NODE) node = node.parentNode;
    if (!node || !readerContent.contains(node)) return null;

    const rect = range.getBoundingClientRect();
    return { text, rect };
  }

  function openExternal(action, text) {
    const buildUrl = providers[action];
    if (!buildUrl || !text) return;
    window.open(buildUrl(text), '_blank', 'noopener');
  }

  function addToMemo(text) {
    if (!text || !noteTextarea || !noteTab || !notePanel) return;
    const quoted = text.trim().split(/\n+/).map(line => `> ${line.trim()}`).join('\n');
    const current = noteTextarea.value.trimEnd();
    noteTextarea.value = `${current}${current ? '\n\n' : ''}${quoted}\n`;
    noteTextarea.dispatchEvent(new Event('input', { bubbles: true }));
    if (!notePanel.classList.contains('is-open')) noteTab.click();
    requestAnimationFrame(() => {
      noteTextarea.focus();
      noteTextarea.setSelectionRange(noteTextarea.value.length, noteTextarea.value.length);
    });
  }

  function runAction(action) {
    const text = selectedText || selectionData()?.text || '';
    if (!text) return;
    if (action === 'memo') addToMemo(text);
    else openExternal(action, text);
    hideSelectionTools();
  }

  function positionTools(rect) {
    if (matchMedia('(max-width: 620px)').matches) {
      toolBar.style.left = '';
      toolBar.style.top = '';
      return;
    }

    toolBar.hidden = false;
    const width = Math.min(toolBar.offsetWidth || 290, window.innerWidth - 24);
    const height = toolBar.offsetHeight || 42;
    let left = rect.left + (rect.width / 2) - (width / 2);
    let top = rect.top - height - 10;

    if (top < 12) top = Math.min(window.innerHeight - height - 12, rect.bottom + 10);
    left = Math.max(12, Math.min(left, window.innerWidth - width - 12));

    toolBar.style.left = `${Math.round(left)}px`;
    toolBar.style.top = `${Math.round(top)}px`;
  }

  function showSelectionTools() {
    if (readerView.hidden || quoteMenu.hidden === false) return;
    const data = selectionData();
    if (!data) {
      hideSelectionTools();
      return;
    }
    selectedText = data.text;
    toolBar.hidden = false;
    positionTools(data.rect);
  }

  function hideSelectionTools({ clear=false } = {}) {
    toolBar.hidden = true;
    toolBar.style.left = '';
    toolBar.style.top = '';
    if (clear) selectedText = '';
  }

  function scheduleSelectionTools(delay=90) {
    clearTimeout(selectionTimer);
    selectionTimer = setTimeout(showSelectionTools, delay);
  }

  function syncContextButtons() {
    const data = selectionData();
    selectedText = data?.text || '';
    const isEnglishSelection = Boolean(selectedText);
    contextButtons.forEach(button => { button.hidden = !isEnglishSelection; });
    hideSelectionTools();

    requestAnimationFrame(() => {
      if (quoteMenu.hidden) return;
      const rect = quoteMenu.getBoundingClientRect();
      const left = Math.max(12, Math.min(rect.left, window.innerWidth - rect.width - 12));
      const top = Math.max(12, Math.min(rect.top, window.innerHeight - rect.height - 12));
      quoteMenu.style.left = `${left}px`;
      quoteMenu.style.top = `${top}px`;
    });
  }

  toolBar.addEventListener('pointerdown', e => e.preventDefault());
  toolBar.addEventListener('click', e => {
    const button = e.target.closest('[data-selection-action]');
    if (!button) return;
    runAction(button.dataset.selectionAction);
  });

  quoteMenu.addEventListener('click', e => {
    const button = e.target.closest('.selection-context-action');
    if (!button) return;
    runAction(button.dataset.selectionAction);
  });

  readerContent.addEventListener('contextmenu', () => {
    clearTimeout(selectionTimer);
    syncContextButtons();
  });
  readerContent.addEventListener('pointerup', e => {
    if (e.pointerType !== 'touch') scheduleSelectionTools(40);
  });
  readerContent.addEventListener('touchend', () => scheduleSelectionTools(180), { passive: true });

  document.addEventListener('selectionchange', () => {
    if (readerView.hidden) return;
    const data = selectionData();
    if (!data) hideSelectionTools({ clear:true });
  });

  document.addEventListener('pointerdown', e => {
    if (!toolBar.hidden && !toolBar.contains(e.target) && !readerContent.contains(e.target)) {
      hideSelectionTools({ clear:true });
    }
  });

  window.addEventListener('scroll', () => hideSelectionTools(), { passive:true });
  window.addEventListener('resize', () => hideSelectionTools());
  window.addEventListener('hashchange', () => hideSelectionTools({ clear:true }));
  window.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !toolBar.hidden) hideSelectionTools({ clear:true });
  });
})();
