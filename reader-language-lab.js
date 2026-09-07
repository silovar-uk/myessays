(() => {
  'use strict';

  const BREAKPOINT = 760;
  const view = document.getElementById('readerView');
  const content = document.getElementById('readerContent');
  if (!view || !content) return;

  let ctx = null;
  let activeBlock = null;
  let activePairId = '';
  let compareMode = false;
  let available = [];
  const flipState = new WeakMap();

  const versions = () => window.MyEssaysReaderVersions;
  const pairs = () => window.MyEssaysPairIdentity;
  const currentVersion = () => versions()?.currentVersion?.() || 'ja';
  const definition = version => versions()?.definitions?.[version] || { label: version, badge: version.toUpperCase(), lang: 'ja' };
  const isMobile = () => matchMedia(`(max-width:${BREAKPOINT}px)`).matches;

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

    if (event.target.closest?.('[data-reader-mode-compare]')) enterCompare();
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
    bar.innerHTML = `${buttons}${compare}`;
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
    button.addEventListener('click', () => activeBlock && openLens(activeBlock));
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
    if (!activeBlock || compareMode || !targetVersion()) return hideAffordance();
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
    button.textContent = target === 'ja' ? 'JA' : d.badge.replace(' MIX', '');
    button.setAttribute('aria-label', `${d.label}でこの段落を見る`);
    button.style.top = `${Math.max(88, Math.min(innerHeight - 56, rect.top + 4))}px`;
    button.style.left = `${Math.min(innerWidth - 58, rect.right + 12)}px`;
    button.hidden = false;
    ensureMobileDock().hidden = true;
  }

  function setActiveBlock(block) {
    const pairId = block?.dataset?.readingLocator || block?.dataset?.pairId || '';
    if (!pairId || block.closest('.reader-mode-bar,.reader-compare-view')) return;
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
      <div class="language-lens-head"><div><p>LANGUAGE LENS</p><h2>この段落</h2></div><button type="button" class="language-lens-close" aria-label="閉じる">×</button></div>
      <div class="language-lens-status" aria-live="polite"></div>
      <section class="language-lens-current"><span class="language-lens-label"></span><div class="language-lens-current-copy"></div></section>
      <section class="language-lens-counterpart"><span class="language-lens-label"></span><div class="language-lens-counterpart-copy"></div></section>
      <div class="language-lens-nav"><button type="button" data-lens-prev>← 前</button><span class="language-lens-position"></span><button type="button" data-lens-next>次 →</button></div>
      <div class="language-lens-actions"><button type="button" class="language-lens-flip">この段落だけ切替</button><button type="button" class="language-lens-full">全文を切替</button></div>`;
    view.appendChild(panel);
    panel.querySelector('.language-lens-close').addEventListener('click', closeLens);
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
    const panel = document.getElementById('languageLensPanel');
    if (panel) panel.hidden = true;
  }

  async function counterpartFor(pairId, target) {
    if (!ctx || !target) return null;
    const root = await versions()?.rootForVersion?.(ctx.essayId, target);
    return findByPair(root, pairId);
  }

  function readablePairBlocks() {
    return (pairs()?.eligibleBlocks?.(content) || [])
      .filter(el => el.dataset.readingLocator || el.dataset.pairId);
  }

  async function openLens(block) {
    const pairId = block?.dataset?.readingLocator || block?.dataset?.pairId || '';
    if (!pairId || compareMode) return;
    setActiveBlock(block);
    const panel = ensureLens();
    const target = targetVersion();
    if (!target) return;
    panel.dataset.pairId = pairId;
    panel.dataset.targetVersion = target;
    panel.hidden = false;

    const current = currentVersion();
    const currentDef = definition(current);
    const targetDef = definition(target);
    panel.querySelector('.language-lens-current .language-lens-label').textContent = currentDef.label.toUpperCase();
    panel.querySelector('.language-lens-counterpart .language-lens-label').textContent = targetDef.label.toUpperCase();
    panel.querySelector('.language-lens-current-copy').textContent = block.textContent.trim();
    panel.querySelector('.language-lens-counterpart-copy').textContent = '…';
    panel.querySelector('.language-lens-status').textContent = '対応段落を確認中';

    const counterpart = await counterpartFor(pairId, target);
    if (panel.dataset.pairId !== pairId) return;
    panel.querySelector('.language-lens-counterpart-copy').textContent = counterpart?.textContent?.trim() || '';
    panel.querySelector('.language-lens-status').textContent = counterpart ? '同じ読書位置' : 'この段落は対応版なし';
    panel.querySelector('.language-lens-counterpart').hidden = !counterpart;
    panel.querySelector('.language-lens-flip').disabled = !counterpart;
    panel.querySelector('.language-lens-full').textContent = `全文を${targetDef.label}で読む`;
    panel.querySelector('.language-lens-flip').textContent = flipState.has(block) ? '元に戻す' : 'この段落だけ切替';

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

  function exitCompare() {
    compareMode = false;
    view.classList.remove('language-compare-mode');
    content.querySelector('.reader-compare-view')?.remove();
    [...content.children].forEach(child => child.classList.remove('language-source-hidden'));
    ensureModeBar();
    positionAffordance();
    window.MyEssaysReaderV2?.sync?.();
  }

  async function enterCompare(target = '') {
    if (!ctx || !available.length) return;
    target = target || (currentVersion() !== 'ja' ? currentVersion() : (available.includes('en-mix') ? 'en-mix' : available[0]));
    if (target === 'ja') target = available.includes('en-mix') ? 'en-mix' : available[0];
    if (!target) return;

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
    if (!jaRoot || !altRoot || !compareMode) return;

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
  }

  async function mount(context) {
    ctx = context;
    compareMode = false;
    activeBlock = null;
    activePairId = '';
    closeLens();
    hideAffordance();
    view.classList.remove('language-compare-mode');
    available = await versions()?.availableVersions?.(context.essayId) || [];
    ensureModeBar();
    window.setTimeout(() => placeModeBar(), 160);
  }

  content.addEventListener('pointerover', event => {
    if (compareMode || isMobile()) return;
    const block = event.target.closest?.('[data-reading-locator],[data-pair-id]');
    if (block && content.contains(block)) setActiveBlock(block);
  });

  content.addEventListener('click', event => {
    if (!isMobile() || compareMode) return;
    if (event.target.closest?.('a,button,input,textarea,select,summary,code,pre')) return;
    const block = event.target.closest?.('[data-reading-locator],[data-pair-id]');
    if (block && content.contains(block)) setActiveBlock(block);
  });

  window.addEventListener('scroll', positionAffordance, { passive: true });
  window.addEventListener('resize', () => {
    positionAffordance();
    placeModeBar();
  });
  document.addEventListener('myessays:reading-location-changed', () => placeModeBar());
  document.addEventListener('myessays:reader-version-changed', () => requestAnimationFrame(() => placeModeBar()));
  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    const panel = document.getElementById('languageLensPanel');
    if (panel && !panel.hidden) {
      event.stopPropagation();
      closeLens();
      return;
    }
    if (compareMode) {
      event.stopPropagation();
      exitCompare();
    }
  }, true);
  window.addEventListener('hashchange', () => {
    closeLens();
    hideAffordance();
    compareMode = false;
    view.classList.remove('language-compare-mode');
  });

  if (window.MyEssaysReaderRuntime?.register) {
    window.MyEssaysReaderRuntime.register('language-lab', mount, { priority: 12 });
  } else {
    document.addEventListener('myessays:reader-ready', event => mount(event.detail));
  }
})();