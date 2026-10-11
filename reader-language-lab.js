(() => {
  'use strict';

  const BREAKPOINT = 760;
  const MOMENTARY_HOLD_MS = 320;
  const PREVIEW_DELAY_MS = 160;
  const PREVIEW_CLOSE_DELAY_MS = 280;
  const view = document.getElementById('readerView');
  const content = document.getElementById('readerContent');
  if (!view || !content) return;

  let ctx = null;
  let activeBlock = null;
  let activePairId = '';
  let compareMode = false;
  let available = [];
  let previewTimer = 0;
  let closeTimer = 0;
  let lensPinned = false;
  let affordanceTimer = 0;
  let momentaryHoldTimer = 0;
  let momentaryLensActive = false;
  let suppressHoldClick = false;
  let lensRequestId = 0;
  let compareRequestId = 0;
  let compareReturnAnchor = null;
  const flipState = new WeakMap();
  const counterpartCache = new Map();

  const versions = () => window.MyEssaysReaderVersions;
  const pairs = () => window.MyEssaysPairIdentity;
  const currentVersion = () => versions()?.currentVersion?.() || 'ja';
  const definition = version => versions()?.definitions?.[version] || { label: version, badge: version.toUpperCase(), lang: 'ja' };
  const isMobile = () => matchMedia(`(max-width:${BREAKPOINT}px)`).matches;
  const noteIsOpen = () => view.classList.contains('note-is-open');

  function targetVersion() {
    const current = currentVersion();
    if (current !== 'ja') return 'ja';
    if (available.includes('en-mix')) return 'en-mix';
    return available[0] || '';
  }

  function findByPair(root, pairId) {
    return pairs()?.findByPairId?.(root, pairId)
      || [...(root?.querySelectorAll?.('[data-pair-id],[data-reading-locator]') || [])]
        .find(el => el.dataset.pairId === pairId || el.dataset.readingLocator === pairId)
      || null;
  }

  function placeModeBar(bar = document.querySelector('.reader-mode-bar')) {
    if (!bar) return;
    const headerActions = document.querySelector('.reader-v2-header-actions');
    if (headerActions) {
      if (bar.parentElement !== headerActions) headerActions.prepend(bar);
      bar.classList.add('is-reader-v2-header');
      return;
    }

    bar.classList.remove('is-reader-v2-header');
    if (bar.parentElement === content) return;
    const stats = content.querySelector('.reading-stats');
    const intro = content.querySelector('.reader-v2-intro');
    if (intro) intro.insertAdjacentElement('afterend', bar);
    else if (stats) stats.insertAdjacentElement('afterend', bar);
    else content.prepend(bar);
  }

  function handleModeBarClick(event) {
    const modeVersion = event.target.closest?.('[data-reader-mode-version]');
    if (modeVersion) {
      const version = modeVersion.dataset.readerModeVersion;
      if (compareMode) exitCompare();
      if (version !== currentVersion()) versions()?.switchVersion?.(version);
      else ensureModeBar();
      return;
    }

    if (event.target.closest?.('[data-reader-mode-reference]')) {
      const visible = readablePairBlocks().find(block => block.getBoundingClientRect().bottom > 120);
      const block = activeBlock?.isConnected && activeBlock.getBoundingClientRect().bottom > 0 ? activeBlock : visible;
      if (block) openLens(block);
      return;
    }
    if (event.target.closest?.('[data-reader-mode-compare]')) {
      if (compareMode) exitCompare();
      else enterCompare();
    }
  }

  function ensureModeBar() {
    let bar = document.querySelector('.reader-mode-bar');
    if (!bar) {
      bar = document.createElement('div');
      bar.className = 'reader-mode-bar';
      bar.setAttribute('role', 'group');
      bar.setAttribute('aria-label', '読み方');
      bar.addEventListener('click', handleModeBarClick);
    }

    const current = currentVersion();
    const buttons = ['ja', ...available].map(version => {
      const d = definition(version);
      const active = !compareMode && current === version;
      const short = version === 'ja' ? 'JA' : d.badge.replace(' MIX', '');
      return `<button type="button" class="reader-mode-button${active ? ' is-active' : ''}" data-reader-mode-version="${version}" data-reader-version="${version}" data-short-label="${short}" aria-label="${d.label}" aria-pressed="${active}">${d.label}</button>`;
    }).join('');
    const compare = available.length
      ? `<button type="button" class="reader-mode-button reader-mode-compare${compareMode ? ' is-active' : ''}" data-reader-mode-compare data-short-label="⇄" aria-label="日本語と外国語Mixを比較" aria-pressed="${compareMode}">比較</button>`
      : '';
    const reference = available.length
      ? '<button type="button" class="reader-mode-button reader-mode-reference" data-reader-mode-reference aria-label="現在の段落に対応する原文を開く">原文</button>'
      : '';
    bar.innerHTML = `${buttons}${reference}${compare}`;
    document.body.classList.add('language-lab-ready');
    placeModeBar(bar);
    return bar;
  }

  function ensurePeekButton() {
    let button = document.getElementById('paragraphLanguagePeek');
    if (button) return button;
    button = document.createElement('button');
    button.id = 'paragraphLanguagePeek';
    button.className = 'paragraph-language-peek';
    button.type = 'button';
    button.hidden = true;
    button.addEventListener('pointerenter', () => clearTimeout(affordanceTimer));
    button.addEventListener('pointerleave', () => {
      clearTimeout(affordanceTimer);
      affordanceTimer = window.setTimeout(hideAffordance, 240);
    });
    button.addEventListener('pointerdown', event => {
      if (event.pointerType !== 'mouse' && event.pointerType !== 'pen') return;
      clearTimeout(momentaryHoldTimer);
      suppressHoldClick = false;
      try { button.setPointerCapture(event.pointerId); } catch {}
      momentaryHoldTimer = window.setTimeout(() => {
        if (!activeBlock || button.hidden) return;
        momentaryLensActive = true;
        openLens(activeBlock);
      }, MOMENTARY_HOLD_MS);
    });
    button.addEventListener('pointerup', () => {
      clearTimeout(momentaryHoldTimer);
      if (!momentaryLensActive) return;
      momentaryLensActive = false;
      suppressHoldClick = true;
      closeLens();
    });
    button.addEventListener('pointercancel', () => {
      clearTimeout(momentaryHoldTimer);
      if (momentaryLensActive) closeLens();
      momentaryLensActive = false;
      suppressHoldClick = false;
    });
    button.addEventListener('click', event => {
      event.stopPropagation();
      if (suppressHoldClick) {
        suppressHoldClick = false;
        return;
      }
      if (activeBlock) openLens(activeBlock);
    });
    document.body.appendChild(button);
    return button;
  }

  function ensureMobileDock() {
    let dock = document.getElementById('paragraphLanguageDock');
    if (dock) return dock;
    dock = document.createElement('div');
    dock.id = 'paragraphLanguageDock';
    dock.className = 'paragraph-language-dock';
    dock.hidden = true;
    dock.innerHTML = '<button type="button" class="paragraph-language-dock-button"></button>';
    dock.querySelector('button').addEventListener('click', () => activeBlock && openLens(activeBlock));
    document.body.appendChild(dock);
    return dock;
  }

  function hideAffordance() {
    ensurePeekButton().hidden = true;
    ensureMobileDock().hidden = true;
  }

  function positionAffordance() {
    if (!activeBlock || compareMode || !targetVersion() || noteIsOpen() || !ensureLens().hidden) return hideAffordance();
    const rect = activeBlock.getBoundingClientRect();
    if (rect.bottom < 72 || rect.top > innerHeight - 52) return hideAffordance();
    const target = targetVersion();
    const d = definition(target);

    if (isMobile()) {
      const dock = ensureMobileDock();
      const button = dock.querySelector('button');
      button.textContent = `${d.label}を見る`;
      button.setAttribute('aria-label', `${d.label}でこの段落を見る`);
      dock.hidden = false;
      ensurePeekButton().hidden = true;
      return;
    }

    const button = ensurePeekButton();
    const label = currentVersion() === 'ja' ? `${d.badge} ↗` : '原文 ↗';
    button.textContent = label;
    button.setAttribute('aria-label', `${d.label}でこの段落を確認。長押し中だけ一時表示も可能`);
    button.style.left = `${Math.max(8, Math.min(innerWidth - 92, rect.left - 86))}px`;
    button.style.top = `${Math.max(76, Math.min(innerHeight - 48, rect.top + 8))}px`;
    button.hidden = false;
    ensureMobileDock().hidden = true;
  }

  function setActiveBlock(block) {
    const pairId = block?.dataset?.readingLocator || block?.dataset?.pairId || '';
    if (!pairId || block.closest('.reader-mode-bar,.reader-compare-view')) return;
    if (block === activeBlock) return;
    if (activeBlock && activeBlock !== block) activeBlock.classList.remove('is-language-active-paragraph');
    activeBlock = block;
    activePairId = pairId;
    activeBlock.classList.add('is-language-active-paragraph');
    positionAffordance();
  }

  function ensureLens() {
    let panel = document.getElementById('languageLensPanel');
    if (panel) return panel;
    panel = document.createElement('aside');
    panel.id = 'languageLensPanel';
    panel.className = 'language-lens-panel';
    panel.hidden = true;
    panel.setAttribute('aria-label', '段落の言語比較');
    panel.innerHTML = `
      <div class="language-lens-handle" aria-hidden="true"></div>
      <div class="language-lens-head"><div><p>LANGUAGE MIRROR</p><h2>対応する原文</h2></div><div class="language-lens-head-actions"><span class="language-lens-pin-state" hidden>PINNED</span><button type="button" class="language-lens-pin" aria-label="原文パネルを固定する" aria-pressed="false" title="固定する">固定</button><button type="button" class="language-lens-close" aria-label="閉じる">×</button></div></div>
      <div class="language-lens-status" aria-live="polite"></div>
      <section class="language-lens-current"><span class="language-lens-label"></span><div class="language-lens-current-copy"></div></section>
      <section class="language-lens-counterpart"><span class="language-lens-label"></span><div class="language-lens-counterpart-copy"></div></section>
      <div class="language-lens-nav"><button type="button" data-lens-prev>← 前</button><span class="language-lens-position"></span><button type="button" data-lens-next>次 →</button></div>
      <div class="language-lens-actions"><button type="button" class="language-lens-flip">この段落だけ切替</button><button type="button" class="language-lens-full">全文を切替</button></div>`;
    view.appendChild(panel);
    panel.querySelector('.language-lens-close').addEventListener('click', () => closeLens());
    panel.querySelector('.language-lens-pin').addEventListener('click', togglePinnedLens);
    panel.querySelector('[data-lens-prev]').addEventListener('click', () => moveLens(-1));
    panel.querySelector('[data-lens-next]').addEventListener('click', () => moveLens(1));
    panel.querySelector('.language-lens-flip').addEventListener('click', toggleFlip);
    panel.querySelector('.language-lens-full').addEventListener('click', async () => {
      const target = panel.dataset.targetVersion;
      if (!target) return;
      closeLens();
      await versions()?.switchVersion?.(target);
    });
    return panel;
  }

  function closeLens() {
    // A user-initiated close always wins, even when the panel was pinned.
    lensRequestId++;
    clearTimeout(previewTimer);
    clearTimeout(closeTimer);
    const panel = document.getElementById('languageLensPanel');
    if (panel) {
      panel.hidden = true;
      panel.classList.remove('is-preview', 'is-pinned');
      panel.querySelector('.language-lens-pin-state')?.toggleAttribute('hidden', true);
      const pin = panel.querySelector('.language-lens-pin');
      if (pin) {
        pin.textContent = '固定';
        pin.setAttribute('aria-label', '原文パネルを固定する');
        pin.setAttribute('aria-pressed', 'false');
      }
    }
    lensPinned = false;
  }

  function togglePinnedLens() {
    const panel = ensureLens();
    if (panel.hidden) return;
    lensPinned = !lensPinned;
    panel.classList.toggle('is-pinned', lensPinned);
    panel.querySelector('.language-lens-pin-state')?.toggleAttribute('hidden', !lensPinned);
    const pin = panel.querySelector('.language-lens-pin');
    pin.textContent = lensPinned ? '固定解除' : '固定';
    pin.setAttribute('aria-label', lensPinned ? '原文パネルの固定を解除する' : '原文パネルを固定する');
    pin.setAttribute('aria-pressed', String(lensPinned));
  }

  function scheduleCloseLens() {
    clearTimeout(closeTimer);
    if (lensPinned || isMobile()) return;
    closeTimer = window.setTimeout(() => closeLens(), PREVIEW_CLOSE_DELAY_MS);
  }

  function cancelCloseLens() {
    clearTimeout(closeTimer);
  }

  async function counterpartFor(pairId, target) {
    if (!ctx || !target) return null;
    const cacheKey = `${ctx.essayId}::${target}::${pairId}`;
    if (counterpartCache.has(cacheKey)) return counterpartCache.get(cacheKey);

    if (target === 'ja' && pairId) {
      const canonicalText = window.MyEssaysReadingLocators?.canonicalText?.(pairId, ctx.essayId);
      if (canonicalText) {
        const virtual = document.createElement('p');
        virtual.textContent = canonicalText;
        counterpartCache.set(cacheKey, virtual);
        return virtual;
      }
    }

    const root = await versions()?.rootForVersion?.(ctx.essayId, target);
    const counterpart = findByPair(root, pairId);
    counterpartCache.set(cacheKey, counterpart || null);
    return counterpart;
  }

  function readablePairBlocks() {
    return (pairs()?.eligibleBlocks?.(content) || [])
      .filter(el => el.dataset.readingLocator || el.dataset.pairId);
  }

  function positionPinnedLens(panel, block) {
    const rect = block.getBoundingClientRect();
    const article = content.getBoundingClientRect();
    const rightSpace = innerWidth - article.right - 24;
    const leftSpace = article.left - 20;

    // Prefer a margin sidecar over an overlay on top of the article.
    if (rightSpace >= 268) {
      const width = Math.min(340, rightSpace - 12);
      panel.style.width = `${Math.round(width)}px`;
      panel.style.left = `${Math.round(article.right + 12)}px`;
      panel.style.right = 'auto';
    } else if (leftSpace >= 268) {
      const width = Math.min(330, leftSpace - 16);
      panel.style.width = `${Math.round(width)}px`;
      panel.style.left = `${Math.max(10, Math.round(article.left - width - 12))}px`;
      panel.style.right = 'auto';
    } else {
      panel.style.width = 'min(350px, calc(100vw - 24px))';
      panel.style.left = 'auto';
      panel.style.right = '12px';
    }
    const panelHeight = Math.min(innerHeight - 110, Math.max(180, panel.offsetHeight || 260));
    const top = Math.max(88, Math.min(innerHeight - panelHeight - 18, rect.top - 10));
    panel.style.top = `${Math.round(top)}px`;
  }

  async function openLens(block, { preview = false } = {}) {
    const pairId = block?.dataset?.readingLocator || block?.dataset?.pairId || '';
    if (!pairId || compareMode) return;
    const requestId = ++lensRequestId;
    setActiveBlock(block);
    const panel = ensureLens();
    cancelCloseLens();

    const previewMode = preview && !lensPinned && !isMobile();
    if (!isMobile()) {
      if (previewMode) panel.style.removeProperty('top');
      else positionPinnedLens(panel, block);
    } else {
      panel.style.removeProperty('top');
    }

    panel.classList.toggle('is-preview', previewMode);
    const target = targetVersion();
    if (!target) return;
    panel.dataset.pairId = pairId;
    panel.dataset.targetVersion = target;
    panel.hidden = false;
    if (!momentaryLensActive) hideAffordance();
    window.MyEssaysJapaneseReference?.close?.();

    const current = currentVersion();
    const currentDef = definition(current);
    const targetDef = definition(target);
    panel.querySelector('.language-lens-current .language-lens-label').textContent = currentDef.label.toUpperCase();
    panel.querySelector('.language-lens-counterpart .language-lens-label').textContent = targetDef.label.toUpperCase();
    panel.querySelector('.language-lens-current-copy').textContent = block.textContent.trim();
    panel.querySelector('.language-lens-counterpart-copy').textContent = '…';
    panel.querySelector('.language-lens-status').textContent = previewMode ? '' : '対応段落を確認中';

    const counterpart = await counterpartFor(pairId, target);
    if (requestId !== lensRequestId || panel.hidden || panel.dataset.pairId !== pairId) return;
    panel.querySelector('.language-lens-counterpart-copy').textContent =
      counterpart?.textContent?.trim() || (previewMode ? '対応する段落なし' : '');
    panel.querySelector('.language-lens-status').textContent = counterpart ? '同じ読書位置' : 'この段落は対応版なし';
    panel.querySelector('.language-lens-counterpart').hidden = !counterpart && !previewMode;
    panel.querySelector('.language-lens-flip').disabled = !counterpart;
    panel.querySelector('.language-lens-full').textContent = `全文を${targetDef.label}で読む`;
    panel.querySelector('.language-lens-flip').textContent = flipState.has(block) ? '元に戻す' : 'この段落だけ切替';
    if (!isMobile()) positionPinnedLens(panel, block);

    const blocks = readablePairBlocks();
    const index = blocks.indexOf(block);
    panel.querySelector('.language-lens-position').textContent = index >= 0 ? `${index + 1} / ${blocks.length}` : '';
    panel.querySelector('[data-lens-prev]').disabled = index <= 0;
    panel.querySelector('[data-lens-next]').disabled = index < 0 || index >= blocks.length - 1;
  }

  function moveLens(delta) {
    const blocks = readablePairBlocks();
    const pairId = ensureLens().dataset.pairId;
    const index = blocks.findIndex(el => (el.dataset.readingLocator || el.dataset.pairId) === pairId);
    const next = blocks[index + delta];
    if (!next) return;
    next.scrollIntoView({ block: 'center', behavior: 'smooth' });
    openLens(next);
  }

  async function toggleFlip() {
    const panel = ensureLens();
    const pairId = panel.dataset.pairId;
    const block = findByPair(content, pairId);
    if (!block) return;

    const saved = flipState.get(block);
    if (saved) {
      block.innerHTML = saved.html;
      if (saved.lang) block.setAttribute('lang', saved.lang);
      else block.removeAttribute('lang');
      block.classList.remove('is-flipped-paragraph');
      flipState.delete(block);
      panel.querySelector('.language-lens-current-copy').textContent = block.textContent.trim();
      panel.querySelector('.language-lens-flip').textContent = 'この段落だけ切替';
      return;
    }

    const target = panel.dataset.targetVersion;
    const counterpart = await counterpartFor(pairId, target);
    if (!counterpart) return;
    flipState.set(block, { html: block.innerHTML, lang: block.getAttribute('lang') || '' });
    block.innerHTML = counterpart.innerHTML;
    block.setAttribute('lang', definition(target).lang || 'ja');
    block.classList.add('is-flipped-paragraph');
    panel.querySelector('.language-lens-current-copy').textContent = block.textContent.trim();
    panel.querySelector('.language-lens-flip').textContent = '元に戻す';
  }

  function readingAnchor() {
    const block = readablePairBlocks().find(el => el.getBoundingClientRect().bottom >= 110);
    return block ? { pairId: block.dataset.readingLocator || block.dataset.pairId, top: block.getBoundingClientRect().top } : null;
  }

  function restoreReadingAnchor(anchor, root, selector) {
    if (!anchor) return;
    const blocks = [...root.querySelectorAll(selector)];
    const block = blocks.find(el => (el.dataset.readingLocator || el.dataset.pairId) === anchor.pairId);
    if (block) window.scrollBy(0, block.getBoundingClientRect().top - anchor.top);
  }

  function exitCompare() {
    const anchor = compareReturnAnchor;
    compareReturnAnchor = null;
    compareRequestId++;
    compareMode = false;
    view.classList.remove('language-compare-mode');
    content.querySelector('.reader-compare-view')?.remove();
    [...content.children].forEach(child => child.classList.remove('language-source-hidden'));
    ensureModeBar();
    positionAffordance();
    window.MyEssaysReaderV2?.sync?.();
    requestAnimationFrame(() => restoreReadingAnchor(anchor, content, '[data-reading-locator],[data-pair-id]'));
  }

  async function enterCompare(target = '') {
    if (!ctx || !available.length) return;
    target = target || (currentVersion() !== 'ja' ? currentVersion() : (available.includes('en-mix') ? 'en-mix' : available[0]));
    if (target === 'ja') target = available.includes('en-mix') ? 'en-mix' : available[0];
    if (!target) return;

    if (!compareMode) compareReturnAnchor = readingAnchor();
    const compareRequest = ++compareRequestId;
    compareMode = true;
    closeLens();
    hideAffordance();
    ensureModeBar();
    view.classList.add('language-compare-mode');

    let compare = content.querySelector('.reader-compare-view');
    if (!compare) {
      compare = document.createElement('section');
      compare.className = 'reader-compare-view';
      compare.setAttribute('aria-label', '日本語と外国語Mixの段落比較');
      content.appendChild(compare);
    }
    compare.innerHTML = '<p class="reader-compare-loading">比較表示を準備中…</p>';

    [...content.children].forEach(child => {
      if (!child.matches('.reading-stats,.reader-v2-intro,.reader-mode-bar,.reader-compare-view')) child.classList.add('language-source-hidden');
    });

    const jaRoot = await versions()?.rootForVersion?.(ctx.essayId, 'ja');
    const altRoot = await versions()?.rootForVersion?.(ctx.essayId, target);
    if (!jaRoot || !altRoot || !compareMode || compareRequest !== compareRequestId) return;

    const jaBlocks = (pairs()?.eligibleBlocks?.(jaRoot) || []).filter(el => el.dataset.readingLocator || el.dataset.pairId);
    const targetDef = definition(target);
    const switcher = available.length > 1
      ? `<div class="reader-compare-language">${available.map(v => `<button type="button" data-compare-target="${v}" class="${v === target ? 'is-active' : ''}">${definition(v).badge}</button>`).join('')}</div>`
      : '';

    const rows = jaBlocks.map(ja => {
      const pairId = ja.dataset.readingLocator || ja.dataset.pairId;
      const alt = findByPair(altRoot, pairId);
      const heading = /^H[23]$/.test(ja.tagName);
      return `<div class="reader-compare-row${heading ? ' is-heading' : ''}" data-pair-id="${pairId}"><div class="reader-compare-cell" lang="ja"><span>JA</span><div>${ja.innerHTML}</div></div><div class="reader-compare-cell" lang="${targetDef.lang || 'en'}"><span>${targetDef.badge}</span><div>${alt ? alt.innerHTML : '<em>対応なし</em>'}</div></div></div>`;
    }).join('');

    compare.innerHTML = `<div class="reader-compare-head"><div><p>PARAGRAPH COMPARE</p><h2>同じ位置を、並べて読む</h2></div>${switcher}</div>${rows}`;
    compare.querySelectorAll('[data-compare-target]').forEach(button => button.addEventListener('click', () => enterCompare(button.dataset.compareTarget)));
    window.MyEssaysReaderV2?.sync?.();
    const anchor = compareReturnAnchor;
    requestAnimationFrame(() => {
      if (compareMode && compareRequest === compareRequestId) restoreReadingAnchor(anchor, compare, '[data-pair-id]');
    });
  }

  async function mount(context) {
    ctx = context;
    compareMode = false;
    compareRequestId++;
    compareReturnAnchor = null;
    activeBlock = null;
    activePairId = '';
    lensPinned = false;
    counterpartCache.clear();
    closeLens({ force: true });
    hideAffordance();
    view.classList.remove('language-compare-mode');
    available = await versions()?.availableVersions?.(context.essayId) || [];
    ensureModeBar();
    window.setTimeout(() => placeModeBar(), 160);
  }

  content.addEventListener('pointerover', event => {
    if (compareMode || isMobile() || noteIsOpen() || lensPinned) return;
    const block = event.target.closest?.('[data-reading-locator],[data-pair-id]');
    if (!block || !content.contains(block) || !ensureLens().hidden) return;
    clearTimeout(affordanceTimer);
    setActiveBlock(block);
    positionAffordance();
  });

  content.addEventListener('pointerout', event => {
    if (compareMode || isMobile() || lensPinned) return;
    const fromBlock = event.target.closest?.('[data-reading-locator],[data-pair-id]');
    if (!fromBlock) return;
    const next = event.relatedTarget;
    if (next && (fromBlock.contains(next) || ensurePeekButton().contains(next) || ensureLens().contains(next))) return;
    clearTimeout(affordanceTimer);
    affordanceTimer = window.setTimeout(hideAffordance, 240);
  });

  content.addEventListener('click', event => {
    if (compareMode || !isMobile()) return;
    if (event.target.closest?.('a,button,input,textarea,select,summary,code,pre')) return;
    const block = event.target.closest?.('[data-reading-locator],[data-pair-id]');
    if (block && content.contains(block)) setActiveBlock(block);
  });

  content.addEventListener('focusin', event => {
    const block = event.target.closest?.('[data-reading-locator],[data-pair-id]');
    if (block && !compareMode && !isMobile()) setActiveBlock(block);
  });

  document.addEventListener('pointerdown', event => {
    const panel = document.getElementById('languageLensPanel');
    if (!panel || panel.hidden || lensPinned) return;
    if (panel.contains(event.target) || ensurePeekButton().contains(event.target) ||
        ensureMobileDock().contains(event.target) ||
        event.target.closest?.('[data-reader-mode-reference]')) return;
    closeLens();
  }, true);

  ensureLens();

  window.addEventListener('scroll', positionAffordance, { passive: true });
  window.addEventListener('resize', () => {
    if (isMobile()) {
      closeLens();
      const panel = ensureLens();
      for (const prop of ['left', 'right', 'top', 'width']) panel.style.removeProperty(prop);
    }
    positionAffordance();
    placeModeBar();
  });
  document.addEventListener('myessays:reading-location-changed', () => placeModeBar());
  document.addEventListener('myessays:reader-version-changed', () => {
    closeLens({ force: true });
    requestAnimationFrame(() => placeModeBar());
  });
  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    const panel = document.getElementById('languageLensPanel');
    if (panel && !panel.hidden) {
      event.stopPropagation();
      closeLens({ force: true });
      return;
    }
    if (compareMode) {
      event.stopPropagation();
      exitCompare();
    }
  }, true);
  window.addEventListener('hashchange', () => {
    closeLens({ force: true });
    hideAffordance();
    compareMode = false;
    view.classList.remove('language-compare-mode');
  });

  window.MyEssaysLanguageLab = Object.freeze({ close: closeLens });

  if (window.MyEssaysReaderRuntime?.register) {
    window.MyEssaysReaderRuntime.register('language-lab', mount, { priority: 12 });
  } else {
    document.addEventListener('myessays:reader-ready', event => mount(event.detail));
  }
})();