(() => {
  'use strict';

  if (window.MyEssaysReadingPivot?.installed) return;

  const content = document.getElementById('readerContent');
  const view = document.getElementById('readerView');
  if (!content || !view) return;

  const MIN_VISIBLE_PX = 20;
  const SWITCH_LOCK_MS = 120;
  const SWITCH_CORRECTION_TOLERANCE = 0.75;
  const FOCUS_START_INDEX = 2;
  const FOCUS_RANGE_LENGTH = 3;
  const FOCUS_FADE_PX = 30;

  let pivot = null;
  let logicalPivotLocator = '';
  let readingBlocksCache = [];
  let focusZoneBlocks = [];
  let evaluationFrame = 0;
  let lockUntil = 0;
  let lastEssayId = '';
  let pendingSwitchAnchor = null;

  const versions = () => window.MyEssaysReaderVersions;

  function essayId() {
    return window.MyEssaysRoute?.parse?.().articleId || '';
  }

  function readerOpen() {
    return Boolean(essayId() && !view.hidden);
  }

  // Reading Focus is intentionally paragraph-only. Headings, lists, quotes,
  // figures and Reader UI never count toward the visible paragraph order.
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

  function visibleReadingItems() {
    return readingBlocks()
      .map(visibility)
      .filter(item => item.visiblePx >= Math.min(MIN_VISIBLE_PX, Math.max(1, item.rect.height)))
      .sort((a, b) => a.rect.top - b.rect.top);
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

  function candidatePivot(visible = visibleReadingItems()) {
    const blocks = readingBlocks();
    if (!blocks.length) return null;
    if (visible.length > FOCUS_START_INDEX) return visible[FOCUS_START_INDEX].block;
    if (visible.length) return nearestToRail(visible.map(item => item.block));
    return nearestToRail(blocks);
  }

  function clearReadingZone() {
    focusZoneBlocks = [];
    content.classList.remove('has-reading-focus-zone');
    delete content.dataset.readingFocusCount;
    delete content.dataset.readingFocusStart;
    delete content.dataset.readingFocusEnd;
    [
      '--reading-zone-fade-start',
      '--reading-zone-top',
      '--reading-zone-mid',
      '--reading-zone-bottom',
      '--reading-zone-fade-end'
    ].forEach(name => content.style.removeProperty(name));
  }

  function syncReadingZone(visible = visibleReadingItems()) {
    const focusItems = visible.slice(FOCUS_START_INDEX, FOCUS_START_INDEX + FOCUS_RANGE_LENGTH);
    if (!focusItems.length) {
      clearReadingZone();
      return [];
    }

    const contentRect = content.getBoundingClientRect();
    const first = focusItems[0];
    const last = focusItems[focusItems.length - 1];
    const zoneTop = Math.max(0, first.rect.top - contentRect.top);
    const zoneBottom = Math.max(zoneTop + 1, last.rect.bottom - contentRect.top);
    const zoneMid = zoneTop + ((zoneBottom - zoneTop) * .52);
    const fadeStart = Math.max(0, zoneTop - FOCUS_FADE_PX);
    const fadeEnd = zoneBottom + FOCUS_FADE_PX;

    content.style.setProperty('--reading-zone-fade-start', `${fadeStart.toFixed(2)}px`);
    content.style.setProperty('--reading-zone-top', `${zoneTop.toFixed(2)}px`);
    content.style.setProperty('--reading-zone-mid', `${zoneMid.toFixed(2)}px`);
    content.style.setProperty('--reading-zone-bottom', `${zoneBottom.toFixed(2)}px`);
    content.style.setProperty('--reading-zone-fade-end', `${fadeEnd.toFixed(2)}px`);
    content.classList.add('has-reading-focus-zone');
    content.dataset.readingFocusCount = String(focusItems.length);
    content.dataset.readingFocusStart = focusItems[0].block.dataset.readingLocator || '';
    content.dataset.readingFocusEnd = focusItems[focusItems.length - 1].block.dataset.readingLocator || '';
    focusZoneBlocks = focusItems.map(item => item.block);
    return [...focusZoneBlocks];
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

  function handoffScrollActive() {
    return document.documentElement.classList.contains('is-reading-mode-switching');
  }

  function evaluatePivot({ immediate = false } = {}) {
    evaluationFrame = 0;
    if (
      !readerOpen() ||
      Date.now() < lockUntil ||
      versions()?.isSwitching?.() ||
      handoffScrollActive()
    ) return;
    const visible = visibleReadingItems();
    syncReadingZone(visible);
    const candidate = candidatePivot(visible);
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

      // Semantic eye-line continuity is owned by ReadingLocators. Pivot only
      // resolves which physical paragraph represents the logical locator. Keep
      // this physical fallback solely for switch paths where no semantic anchor
      // could be captured.
      const semanticRestoreOwned = Boolean(window.MyEssaysReadingLocators?.hasSwitchAnchor?.());
      if (!semanticRestoreOwned) {
        const delta = target.getBoundingClientRect().top - anchor.viewportTop;
        if (Math.abs(delta) > SWITCH_CORRECTION_TOLERANCE) {
          window.scrollBy({ top: delta, behavior: 'auto' });
        }
      }
      setPivot(target, {
        reason: 'language-switch',
        logicalLocator: anchor.locator || physicalLocator(target)
      });
      syncReadingZone(visibleReadingItems());
      lockUntil = Date.now() + SWITCH_LOCK_MS;
    }));
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
    const compare = bar?.querySelector('[data-reader-mode-compare]');
    button.classList.toggle('is-active', view.classList.contains('language-compare-mode'));
    button.hidden = !compare;
  }

  function syncCompareUI() {
    const bar = document.querySelector('.reader-mode-bar');
    if (!bar) return;

    // Reading Mode choices belong exclusively to the persistent Instant
    // Controller. Pivot never creates a second language control in the mode bar.
    bar.querySelectorAll('.reader-language-direct,[data-reader-mode-version],[data-reader-version]')
      .forEach(node => node.remove());
    bar.classList.remove('is-language-cycle-bar', 'is-language-direct-bar');

    const compare = bar.querySelector('[data-reader-mode-compare]');
    const compareActive = view.classList.contains('language-compare-mode');
    if (compare) {
      compare.classList.toggle('is-active', compareActive);
      compare.setAttribute('aria-pressed', String(compareActive));
    }
    syncMobileCompareShortcut(bar);
  }

  function initialize() {
    if (!readerOpen()) {
      if (pivot) pivot.classList.remove('is-reading-pivot');
      pivot = null;
      logicalPivotLocator = '';
      readingBlocksCache = [];
      clearReadingZone();
      return;
    }

    const id = essayId();
    const routeChanged = id !== lastEssayId;
    if (routeChanged) {
      const sameEssayHandoff = pendingSwitchAnchor?.essayId === id;
      lastEssayId = id;
      if (!sameEssayHandoff) {
        pendingSwitchAnchor = null;
        logicalPivotLocator = '';
        lockUntil = 0;
      }
    }

    refreshReadingBlocks();
    if (!versions()?.isSwitching?.() && !handoffScrollActive()) {
      const visible = visibleReadingItems();
      syncReadingZone(visible);
      const candidate = candidatePivot(visible);
      if (candidate) setPivot(candidate, { reason: pivot ? 'sync' : 'initial' });
    }
    requestAnimationFrame(syncCompareUI);
  }

  window.MyEssaysReadingPivot = Object.freeze({
    installed: true,
    current: () => pivot,
    locator: () => currentLogicalLocator(),
    physicalLocator: () => physicalLocator(pivot),
    focusBlocks: () => [...focusZoneBlocks],
    captureForSwitch: captureSwitchAnchor,
    hasPendingSwitchAnchor: () => Boolean(pendingSwitchAnchor),
    candidate: candidatePivot,
    refresh: initialize
  });

  document.addEventListener('myessays:reader-ready', () => requestAnimationFrame(initialize));
  document.addEventListener('myessays:reader-rendered', () => requestAnimationFrame(initialize));
  document.addEventListener('myessays:semantic-locators-ready', () => requestAnimationFrame(initialize));
  document.addEventListener('myessays:reader-version-changed', () => {
    clearReadingZone();
    refreshReadingBlocks();
    requestAnimationFrame(syncCompareUI);
  });
  document.addEventListener('myessays:reader-language-changed', restoreSwitchAnchor);
  document.addEventListener('myessays:reading-mode-stable', () => {
    refreshReadingBlocks();
    scheduleEvaluate({ immediate: true });
  });
  document.addEventListener('myessays:reading-location-changed', () => requestAnimationFrame(syncCompareUI));

  window.addEventListener('scroll', () => scheduleEvaluate(), { passive: true });
  window.addEventListener('resize', () => {
    refreshReadingBlocks();
    scheduleEvaluate({ immediate: true });
    requestAnimationFrame(syncCompareUI);
  });

  window.addEventListener('hashchange', () => {
    logicalPivotLocator = '';
    readingBlocksCache = [];
    clearReadingZone();
    requestAnimationFrame(initialize);
  });

  document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', () => requestAnimationFrame(initialize))
    : requestAnimationFrame(initialize);
})();