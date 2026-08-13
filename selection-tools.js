(() => {
  const CONFIG = Object.freeze({
    mobileBreakpoint: 620,
    pointerSelectionDelay: 40,
    defaultSelectionDelay: 90,
    touchSelectionDelay: 180,
    mobileSelectionDelay: 260,
    viewportMargin: 12,
    toolbarGap: 10,
    fallbackToolbarWidth: 360,
    fallbackToolbarHeight: 42
  });

  const ENGLISH_RE = /[A-Za-z]/;
  const JAPANESE_RE = /[\u3040-\u30ff\u3400-\u9fff]/;

  function analyzeSelection(text = '') {
    const value = String(text);
    const hasEnglish = ENGLISH_RE.test(value);
    const hasJapanese = JAPANESE_RE.test(value);
    const primaryLanguage = hasJapanese ? 'ja' : 'en';

    return {
      hasEnglish,
      hasJapanese,
      primaryLanguage,
      translationSource: primaryLanguage,
      translationTarget: hasJapanese ? 'en' : 'ja',
      translationLabel: hasJapanese ? '英訳' : '和訳',
      wikipediaLanguage: primaryLanguage
    };
  }

  const providerBuilders = Object.freeze({
    google(text) {
      return `https://www.google.com/search?q=${encodeURIComponent(text)}`;
    },
    dictionary(text) {
      return `https://eow.alc.co.jp/search?q=${encodeURIComponent(text)}`;
    },
    translate(text, analysis) {
      return `https://translate.google.com/?sl=${analysis.translationSource}&tl=${analysis.translationTarget}&text=${encodeURIComponent(text)}&op=translate`;
    },
    wikipedia(text, analysis) {
      return `https://${analysis.wikipediaLanguage}.wikipedia.org/w/index.php?search=${encodeURIComponent(text)}`;
    }
  });

  function buildProviderUrl(action, text) {
    const buildUrl = providerBuilders[action];
    if (!buildUrl || !text) return '';
    return buildUrl(text, analyzeSelection(text));
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { analyzeSelection, buildProviderUrl };
  }

  if (typeof document === 'undefined') return;

  const readerView = document.getElementById('readerView');
  const readerContent = document.getElementById('readerContent');
  const quoteMenu = document.getElementById('quoteMenu');
  const quoteToNote = document.getElementById('quoteToNote');

  if (!readerView || !readerContent || !quoteMenu || !quoteToNote) return;

  const mobileQuery = window.matchMedia(`(max-width: ${CONFIG.mobileBreakpoint}px)`);
  let selectedText = '';
  let selectionTimer = 0;

  const actions = Object.freeze([
    {
      id: 'google',
      icon: '⌕',
      toolbarLabel: 'Google',
      contextLabel: 'Googleで検索'
    },
    {
      id: 'wikipedia',
      icon: 'W',
      toolbarLabel: 'Wiki',
      contextLabel: 'Wikipediaで調べる'
    },
    {
      id: 'dictionary',
      icon: 'Aa',
      toolbarLabel: '辞書',
      contextLabel: '英辞郎で調べる',
      visible: analysis => analysis.hasEnglish
    },
    {
      id: 'translate',
      icon: '文',
      toolbarLabel: analysis => analysis.translationLabel,
      contextLabel: analysis => `${analysis.translationLabel}する`
    },
    {
      id: 'memo',
      icon: '✎',
      toolbarLabel: 'メモ',
      contextLabel: null
    }
  ]);

  const toolBar = document.createElement('div');
  toolBar.id = 'selectionTools';
  toolBar.className = 'selection-tools';
  toolBar.hidden = true;
  toolBar.setAttribute('role', 'toolbar');
  toolBar.setAttribute('aria-label', '選択した文章の操作');
  document.body.appendChild(toolBar);

  const actionElements = new Map();

  function resolveLabel(label, analysis) {
    return typeof label === 'function' ? label(analysis) : label;
  }

  function createToolbarButton(action) {
    const button = document.createElement('button');
    button.type = 'button';
    button.dataset.selectionAction = action.id;

    const icon = document.createElement('span');
    icon.setAttribute('aria-hidden', 'true');
    icon.textContent = action.icon;

    const label = document.createElement('span');
    label.className = 'selection-action-label';
    label.textContent = resolveLabel(action.toolbarLabel, analyzeSelection(''));

    button.append(icon, label);
    toolBar.appendChild(button);
    return { button, label };
  }

  function createContextButton(action) {
    if (!action.contextLabel) return null;

    const button = document.createElement('button');
    button.type = 'button';
    button.dataset.selectionAction = action.id;
    button.className = 'selection-context-action';
    button.setAttribute('role', 'menuitem');

    const icon = document.createElement('span');
    icon.setAttribute('aria-hidden', 'true');
    icon.textContent = action.icon;

    const label = document.createElement('span');
    label.className = 'selection-context-label';
    label.textContent = resolveLabel(action.contextLabel, analyzeSelection(''));

    button.append(icon, document.createTextNode(' '), label);
    quoteMenu.insertBefore(button, quoteToNote);
    return { button, label };
  }

  actions.forEach(action => {
    actionElements.set(action.id, {
      definition: action,
      toolbar: createToolbarButton(action),
      context: createContextButton(action)
    });
  });

  function getReaderSelection() {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed || !selection.rangeCount) return null;

    const text = selection.toString().trim();
    if (!text) return null;

    const range = selection.getRangeAt(0);
    let node = range.commonAncestorContainer;
    if (node.nodeType === Node.TEXT_NODE) node = node.parentNode;
    if (!node || !readerContent.contains(node)) return null;

    return { text, range };
  }

  function getSelectionRect(range) {
    return range?.getBoundingClientRect?.() || null;
  }

  function syncActionState(text) {
    const analysis = analyzeSelection(text);

    actionElements.forEach(({ definition, toolbar, context }) => {
      const visible = definition.visible ? definition.visible(analysis) : true;

      toolbar.button.hidden = !visible;
      toolbar.label.textContent = resolveLabel(definition.toolbarLabel, analysis);

      if (context) {
        context.button.hidden = !visible;
        context.label.textContent = resolveLabel(definition.contextLabel, analysis);
      }
    });
  }

  function openExternal(action, text) {
    const url = buildProviderUrl(action, text);
    if (!url) return;
    window.open(url, '_blank', 'noopener');
  }

  function requestMemoAppend(text) {
    if (!text) return;
    readerContent.dispatchEvent(new CustomEvent('myessays:add-note-quote', {
      bubbles: true,
      detail: { text }
    }));
  }

  function runAction(action) {
    const text = selectedText || getReaderSelection()?.text || '';
    if (!text) return;

    if (action === 'memo') requestMemoAppend(text);
    else openExternal(action, text);

    hideSelectionTools();
    quoteMenu.hidden = true;
  }

  function positionTools(rect) {
    if (!rect || mobileQuery.matches) {
      toolBar.style.left = '';
      toolBar.style.top = '';
      return;
    }

    toolBar.hidden = false;
    const width = Math.min(
      toolBar.offsetWidth || CONFIG.fallbackToolbarWidth,
      window.innerWidth - (CONFIG.viewportMargin * 2)
    );
    const height = toolBar.offsetHeight || CONFIG.fallbackToolbarHeight;
    let left = rect.left + (rect.width / 2) - (width / 2);
    let top = rect.top - height - CONFIG.toolbarGap;

    if (top < CONFIG.viewportMargin) {
      top = Math.min(
        window.innerHeight - height - CONFIG.viewportMargin,
        rect.bottom + CONFIG.toolbarGap
      );
    }

    left = Math.max(
      CONFIG.viewportMargin,
      Math.min(left, window.innerWidth - width - CONFIG.viewportMargin)
    );

    toolBar.style.left = `${Math.round(left)}px`;
    toolBar.style.top = `${Math.round(top)}px`;
  }

  function showSelectionTools() {
    if (readerView.hidden || quoteMenu.hidden === false) return;

    const data = getReaderSelection();
    if (!data) {
      hideSelectionTools();
      return;
    }

    selectedText = data.text;
    syncActionState(data.text);
    toolBar.hidden = false;
    positionTools(getSelectionRect(data.range));
  }

  function hideSelectionTools({ clear = false } = {}) {
    toolBar.hidden = true;
    toolBar.style.left = '';
    toolBar.style.top = '';
    if (clear) selectedText = '';
  }

  function scheduleSelectionTools(delay = CONFIG.defaultSelectionDelay) {
    clearTimeout(selectionTimer);
    selectionTimer = setTimeout(showSelectionTools, delay);
  }

  function syncContextButtons() {
    const data = getReaderSelection();
    selectedText = data?.text || '';

    if (selectedText) {
      syncActionState(selectedText);
    } else {
      actionElements.forEach(({ context }) => {
        if (context) context.button.hidden = true;
      });
    }

    hideSelectionTools();

    requestAnimationFrame(() => {
      if (quoteMenu.hidden) return;

      const rect = quoteMenu.getBoundingClientRect();
      const left = Math.max(
        CONFIG.viewportMargin,
        Math.min(rect.left, window.innerWidth - rect.width - CONFIG.viewportMargin)
      );
      const top = Math.max(
        CONFIG.viewportMargin,
        Math.min(rect.top, window.innerHeight - rect.height - CONFIG.viewportMargin)
      );

      quoteMenu.style.left = `${left}px`;
      quoteMenu.style.top = `${top}px`;
    });
  }

  toolBar.addEventListener('pointerdown', event => {
    const button = event.target.closest('[data-selection-action]');
    if (!button) return;
    event.preventDefault();
    runAction(button.dataset.selectionAction);
  });

  quoteMenu.addEventListener('click', event => {
    const button = event.target.closest('.selection-context-action');
    if (!button) return;
    runAction(button.dataset.selectionAction);
  });

  readerContent.addEventListener('contextmenu', () => {
    clearTimeout(selectionTimer);
    syncContextButtons();
  });

  readerContent.addEventListener('pointerup', event => {
    if (event.pointerType !== 'touch') {
      scheduleSelectionTools(CONFIG.pointerSelectionDelay);
    }
  });

  readerContent.addEventListener(
    'touchend',
    () => scheduleSelectionTools(CONFIG.touchSelectionDelay),
    { passive: true }
  );

  document.addEventListener('selectionchange', () => {
    if (readerView.hidden) return;

    const data = getReaderSelection();
    if (!data) {
      hideSelectionTools({ clear: quoteMenu.hidden });
      return;
    }

    selectedText = data.text;
    if (mobileQuery.matches) {
      scheduleSelectionTools(CONFIG.mobileSelectionDelay);
    }
  });

  document.addEventListener('pointerdown', event => {
    if (
      !toolBar.hidden
      && !toolBar.contains(event.target)
      && !readerContent.contains(event.target)
    ) {
      hideSelectionTools({ clear: true });
    }
  });

  window.addEventListener('scroll', () => hideSelectionTools(), { passive: true });
  window.addEventListener('resize', () => hideSelectionTools());
  window.addEventListener('hashchange', () => hideSelectionTools({ clear: true }));
  window.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !toolBar.hidden) {
      hideSelectionTools({ clear: true });
    }
  });
})();
