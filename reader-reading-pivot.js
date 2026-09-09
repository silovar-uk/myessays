(() => {
  'use strict';

  if (window.MyEssaysReadingPivot?.installed) return;

  const content = document.getElementById('readerContent');
  const view = document.getElementById('readerView');
  if (!content || !view) return;

  const MIN_VISIBLE_PX = 20;
  const SWITCH_LOCK_MS = 120;
  const SWITCH_CORRECTION_TOLERANCE = 0.75;

  let pivot = null;
  let logicalPivotLocator = '';
  let readingBlocksCache = [];
  let evaluationFrame = 0;
  let lockUntil = 0;
  let lastEssayId = '';
  let pendingSwitchAnchor = null;
  let modeBarObserver = null;
  let modeBarSyncToken = 0;

  const versions = () => window.MyEssaysReaderVersions;

  function essayId() {
    const match = location.hash.match(/^#\/essay\/(.+)$/);
    if (!match) return '';
    try { return decodeURIComponent(match[1]); }
    catch { return match[1]; }
  }

  function readerOpen() {
    return Boolean(essayId() && !view.hidden);
  }

  // Reading Focus is intentionally paragraph-only. Headings, lists, quotes,
  // figures and Reader UI never count as the “second visible paragraph”.
  function refreshReadingBlocks() {
    readingBlocksCache = [...content.querySelectorAll(':scope > p.reader-locator-block[data-reading-locator]')]
      .filter(block => !block.classList.contains('language-source-hidden'));
    return readingBlocksCache;
  }

  function readingBlocks() {
    return readingBlocksCache.length ? readingBlocksCache : refreshReadingBlocks();
  }

  function headerBottom() {
    const header = document.querySelector('.reader-v2-header');
    const rect = header?.getBoundingClientRect();
    return rect?.height ? Math.max(0, rect.bottom) : 0;
  }

  function viewportBand() {
    const top = headerBottom() + 8;
    const bottom = Math.max(top + 1, window.innerHeight - 18);
    return { top, bottom };
  }

  function readingRailY() {
    const band = viewportBand();
    const height = Math.max(1, band.bottom - band.top);
    return Math.min(band.bottom, band.top + Math.min(142, Math.max(76, height * .16)));
  }

  function visibility(block) {
    const rect = block.getBoundingClientRect();
    const band = viewportBand();
    const visibleTop = Math.max(rect.top, band.top);
    const visibleBottom = Math.min(rect.bottom, band.bottom);
    const visiblePx = Math.max(0, visibleBottom - visibleTop);
    return { block, rect, visiblePx };
  }

  function nearestToRail(blocks) {
    const rail = readingRailY();
    return blocks.reduce((best, block) => {
      const rect = block.getBoundingClientRect();
      const point = Math.min(rect.bottom, Math.max(rect.top, rail));
      const distance = Math.abs(rail - point);
      return !best || distance < best.distance ? { block, distance } : best;
    }, null)?.block || null;
  }

  function candidatePivot() {
    const blocks = readingBlocks();
    if (!blocks.length) return null;

    // “Visible” is perceptual, not proportional. Requiring a percentage of a
    // paragraph penalises long paragraphs. One visible line (about 20px) is
    // enough to count; genuinely short paragraphs only need their own height.
    const visible = blocks
      .map(visibility)
      .filter(item => item.visiblePx >= Math.min(MIN_VISIBLE_PX, Math.max(1, item.rect.height)))
      .sort((a, b) => a.rect.top - b.rect.top);

    if (visible.length >= 2) return visible[1].block;
    if (visible.length === 1) return visible[0].block;
    return nearestToRail(blocks);
  }

  function physicalLocator(block) {
    return block?.dataset?.readingLocator || '';
  }

  function parseLocator(locator) {
    const match = String(locator || '').match(/^(\d+)-(\d+)$/);
    return match ? { section: Number(match[1]), block: Number(match[2]) } : null;
  }

  function nearestCanonicalBlock(locator) {
    const wanted = parseLocator(locator);
    if (!wanted) return null;
    const sameSection = readingBlocks()
      .map(block => ({ block, locator: parseLocator(physicalLocator(block)) }))
      .filter(item => item.locator?.section === wanted.section);
    if (!sameSection.length) return null;
    return sameSection.reduce((best, item) => {
      const distance = Math.abs(item.locator.block - wanted.block);
      return !best || distance < best.distance ? { block: item.block, distance } : best;
    }, null)?.block || null;
  }

  function currentLogicalLocator() {
    return logicalPivotLocator || physicalLocator(pivot);
  }

  function setPivot(block, { reason = 'scroll', logicalLocator = '' } = {}) {
    if (!block || !content.contains(block)) return false;
    const sameBlock = pivot === block;
    if (pivot && !sameBlock) pivot.classList.remove('is-reading-pivot');
    pivot = block;
    if (logicalLocator) logicalPivotLocator = logicalLocator;
    else if (!sameBlock || !logicalPivotLocator) logicalPivotLocator = physicalLocator(block);
    pivot.classList.add('is-reading-pivot');

    document.dispatchEvent(new CustomEvent('myessays:reading-pivot-changed', {
      detail: {
        essayId: essayId(),
        locator: currentLogicalLocator(),
        physicalLocator: physicalLocator(pivot),
        reason
      }
    }));
    return true;
  }

  function evaluatePivot({ immediate = false } = {}) {
    evaluationFrame = 0;
    if (!readerOpen() || Date.now() < lockUntil || versions()?.isSwitching?.()) return;
    const candidate = candidatePivot();
    if (!candidate) return;
    if (!pivot || immediate || candidate !== pivot) {
      setPivot(candidate, { reason: pivot ? (immediate ? 'sync' : 'scroll') : 'initial' });
    }
  }

  function scheduleEvaluate(options = {}) {
    if (evaluationFrame) return;
    evaluationFrame = requestAnimationFrame(() => evaluatePivot(options));
  }

  function matchingLocatorBlocks(locator) {
    if (!locator) return [];
    return readingBlocks().filter(block => physicalLocator(block) === locator);
  }

  function captureSwitchAnchor() {
    if (!readerOpen()) return null;
    const blocks = refreshReadingBlocks();
    if (!blocks.length) return null;
    const current = pivot && content.contains(pivot) ? pivot : candidatePivot() || blocks[0];
    if (!current) return null;
    if (current !== pivot) setPivot(current, { reason: 'switch-capture' });

    const locator = current === pivot ? currentLogicalLocator() : physicalLocator(current);
    const cluster = matchingLocatorBlocks(locator);
    pendingSwitchAnchor = {
      essayId: essayId(),
      locator,
      pairId: current.dataset.pairId || '',
      clusterIndex: Math.max(0, cluster.indexOf(current)),
      viewportTop: current.getBoundingClientRect().top
    };
    lockUntil = Date.now() + 2400;
    return { ...pendingSwitchAnchor };
  }

  function findSwitchTarget(anchor) {
    if (!anchor) return null;

    // Semantic coverage wins over physical locator equality. This is what lets
    // canonical 4-8 stay meaningful when a translated paragraph merges 4-7–4-9.
    const semantic = window.MyEssaysReadingLocators?.findContainingBlock?.(
      anchor.locator,
      { paragraphOnly: true }
    );
    if (semantic) return semantic;

    if (anchor.locator) {
      const cluster = matchingLocatorBlocks(anchor.locator);
      if (cluster.length) return cluster[Math.min(anchor.clusterIndex || 0, cluster.length - 1)];
    }
    if (anchor.pairId) {
      const paired = [...content.querySelectorAll(':scope > p[data-pair-id]')]
        .find(block => block.dataset.pairId === anchor.pairId);
      if (paired) return paired;
    }
    return nearestCanonicalBlock(anchor.locator);
  }

  function restoreSwitchAnchor(event) {
    const anchor = pendingSwitchAnchor;
    if (!anchor || anchor.essayId !== event.detail?.essayId) {
      lockUntil = 0;
      refreshReadingBlocks();
      return scheduleEvaluate({ immediate: true });
    }

    requestAnimationFrame(() => requestAnimationFrame(() => {
      refreshReadingBlocks();
      const target = findSwitchTarget(anchor);
      pendingSwitchAnchor = null;
      if (!target) {
        lockUntil = 0;
        return scheduleEvaluate({ immediate: true });
      }

      const delta = target.getBoundingClientRect().top - anchor.viewportTop;
      if (Math.abs(delta) > SWITCH_CORRECTION_TOLERANCE) {
        window.scrollBy({ top: delta, behavior: 'auto' });
      }
      setPivot(target, {
        reason: 'language-switch',
        logicalLocator: anchor.locator || physicalLocator(target)
      });

      // Keep the corresponding semantic paragraph through the handoff. The
      // next genuine scroll/resize returns control to the second-visible rule.
      lockUntil = Date.now() + SWITCH_LOCK_MS;
    }));
  }

  function versionOrder(available) {
    return ['ja', ...available.filter(version => version !== 'ja')];
  }

  function shortBadge(definition, version) {
    if (version === 'ja') return 'JA';
    if (version === 'en-mix') return 'EN';
    if (version === 'es-mix') return 'ES';
    return String(definition?.badge || version).replace(/\s*MIX$/i, '').slice(0, 3).toUpperCase();
  }

  function syncMobileCompareShortcut(bar) {
    const head = document.querySelector('.reader-v2-map-head');
    if (!head) return;
    let button = head.querySelector('.reader-mobile-compare');
    if (!button) {
      button = document.createElement('button');
      button.type = 'button';
      button.className = 'reader-mobile-compare';
      button.innerHTML = '<span aria-hidden="true">⇄</span><span>比較</span>';
      button.addEventListener('click', () => {
        const source = document.querySelector('.reader-mode-bar [data-reader-mode-compare]');
        source?.click();
        window.MyEssaysReaderV2?.setMapOpen?.(false);
      });
      const close = head.querySelector('.reader-v2-map-close');
      if (close) close.before(button);
      else head.append(button);
    }
    button.classList.toggle('is-active', view.classList.contains('language-compare-mode'));
    button.hidden = !bar.querySelector('[data-reader-mode-compare]');
  }

  async function syncModeBar() {
    const token = ++modeBarSyncToken;
    const bar = document.querySelector('.reader-mode-bar');
    const id = essayId();
    if (!bar || !id || !versions()?.availableVersions) return;

    const available = await versions().availableVersions(id);
    if (token !== modeBarSyncToken || id !== essayId() || !document.contains(bar)) return;
    if (!available.length) return;

    const order = versionOrder(available);
    const current = versions().currentVersion();
    const defs = versions().definitions || {};
    const compareActive = view.classList.contains('language-compare-mode');
    const signature = [id, current, order.join(','), compareActive ? 'compare' : 'read'].join('|');

    if (bar.dataset.pivotDirectSignature === signature && bar.querySelector('.reader-language-direct')) {
      syncMobileCompareShortcut(bar);
      return;
    }

    bar.dataset.pivotDirectSignature = signature;
    bar.classList.remove('is-language-cycle-bar');
    bar.classList.add('is-language-direct-bar');
    bar.innerHTML = `
      <div class="reader-language-direct" role="radiogroup" aria-label="表示言語">
        ${order.map(version => {
          const definition = defs[version] || { label: version, badge: version.toUpperCase() };
          const active = version === current;
          return `<button type="button" role="radio" class="reader-mode-button reader-language-direct-option${active ? ' is-active' : ''}" data-reader-mode-version="${version}" data-reader-version="${version}" aria-checked="${active}" aria-label="${definition.label}">${shortBadge(definition, version)}</button>`;
        }).join('')}
      </div>
      <button type="button" class="reader-mode-button reader-mode-compare${compareActive ? ' is-active' : ''}" data-reader-mode-compare data-short-label="⇄" aria-label="日本語と外国語Mixを比較" aria-pressed="${compareActive}">比較</button>`;

    observeModeBar(bar);
    requestAnimationFrame(() => syncMobileCompareShortcut(bar));
  }

  function observeModeBar(bar) {
    if (modeBarObserver?.__bar === bar) return;
    modeBarObserver?.disconnect();
    modeBarObserver = new MutationObserver(() => requestAnimationFrame(syncModeBar));
    modeBarObserver.__bar = bar;
    modeBarObserver.observe(bar, { childList: true });
  }

  function initialize() {
    if (!readerOpen()) {
      if (pivot) pivot.classList.remove('is-reading-pivot');
      pivot = null;
      logicalPivotLocator = '';
      readingBlocksCache = [];
      return;
    }

    const id = essayId();
    const routeChanged = id !== lastEssayId;
    if (routeChanged) {
      lastEssayId = id;
      pendingSwitchAnchor = null;
      logicalPivotLocator = '';
      lockUntil = 0;
    }

    refreshReadingBlocks();
    if (!versions()?.isSwitching?.()) {
      const candidate = candidatePivot();
      if (candidate) setPivot(candidate, { reason: pivot ? 'sync' : 'initial' });
    }
    requestAnimationFrame(syncModeBar);
  }

  function handlePotentialLanguageSwitch(event) {
    const target = event.target instanceof Element
      ? event.target.closest('[data-reader-mode-version],[data-reader-version],.language-lens-full')
      : null;
    if (!target || !readerOpen()) return;

    let next = target.dataset.readerModeVersion || target.dataset.readerVersion || '';
    if (target.classList.contains('language-lens-full')) {
      next = document.getElementById('languageLensPanel')?.dataset.targetVersion || '';
    }
    if (!next || next === versions()?.currentVersion?.()) return;
    captureSwitchAnchor();
  }

  function handleLanguageRadioKeydown(event) {
    const current = event.target instanceof Element
      ? event.target.closest('.reader-language-direct-option[role="radio"]')
      : null;
    if (!current) return;
    const group = current.closest('.reader-language-direct');
    const buttons = group ? [...group.querySelectorAll('.reader-language-direct-option[role="radio"]')] : [];
    if (!buttons.length) return;
    const index = buttons.indexOf(current);
    if (index < 0) return;

    let targetIndex = -1;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') targetIndex = (index + 1) % buttons.length;
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') targetIndex = (index - 1 + buttons.length) % buttons.length;
    else if (event.key === 'Home') targetIndex = 0;
    else if (event.key === 'End') targetIndex = buttons.length - 1;
    else return;

    event.preventDefault();
    const target = buttons[targetIndex];
    target.focus();
    target.click();
  }

  window.MyEssaysReadingPivot = Object.freeze({
    installed: true,
    current: () => pivot,
    locator: () => currentLogicalLocator(),
    physicalLocator: () => physicalLocator(pivot),
    captureForSwitch: captureSwitchAnchor,
    hasPendingSwitchAnchor: () => Boolean(pendingSwitchAnchor),
    candidate: candidatePivot,
    refresh: initialize
  });

  document.addEventListener('click', handlePotentialLanguageSwitch, true);
  document.addEventListener('keydown', handleLanguageRadioKeydown, true);
  document.addEventListener('myessays:reader-ready', () => requestAnimationFrame(initialize));
  document.addEventListener('myessays:reader-rendered', () => requestAnimationFrame(initialize));
  document.addEventListener('myessays:semantic-locators-ready', () => requestAnimationFrame(initialize));
  document.addEventListener('myessays:reader-version-changed', () => {
    refreshReadingBlocks();
    requestAnimationFrame(syncModeBar);
  });
  document.addEventListener('myessays:reader-language-changed', restoreSwitchAnchor);
  document.addEventListener('myessays:reading-location-changed', () => requestAnimationFrame(syncModeBar));

  window.addEventListener('scroll', () => scheduleEvaluate(), { passive: true });
  window.addEventListener('resize', () => {
    refreshReadingBlocks();
    scheduleEvaluate({ immediate: true });
    requestAnimationFrame(syncModeBar);
  });

  window.addEventListener('hashchange', () => {
    logicalPivotLocator = '';
    readingBlocksCache = [];
    requestAnimationFrame(initialize);
  });

  document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', () => requestAnimationFrame(initialize))
    : requestAnimationFrame(initialize);
})();