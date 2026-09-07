(() => {
  'use strict';

  if (window.MyEssaysReadingPivot?.installed) return;

  const content = document.getElementById('readerContent');
  const view = document.getElementById('readerView');
  if (!content || !view) return;

  const VISIBLE_RATIO = 0.28;
  const PIVOT_SETTLE_MS = 110;
  const SWITCH_LOCK_MS = 180;
  const USER_SCROLL_INTENT_MS = 900;
  const SWITCH_CORRECTION_TOLERANCE = 0.75;
  const OBSERVER_THRESHOLDS = [0, .1, .28, .5, .75, 1];
  const SCROLL_KEYS = new Set(['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Home', 'End', ' ']);

  let pivot = null;
  let logicalPivotLocator = '';
  let observer = null;
  let pendingPivot = null;
  let pendingTimer = 0;
  let evaluationFrame = 0;
  let lockUntil = 0;
  let hasScrolled = false;
  let lastScrollY = window.scrollY;
  let lastEssayId = '';
  let pendingSwitchAnchor = null;
  let holdPivotUntilUserScroll = false;
  let userScrollIntentUntil = 0;
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

  function readingBlocks() {
    return [...content.querySelectorAll(':scope > .reader-locator-block[data-reading-locator]')]
      .filter(block => !block.classList.contains('language-source-hidden'));
  }

  function headerBottom() {
    const header = document.querySelector('.reader-v2-header');
    const rect = header?.getBoundingClientRect();
    return rect?.height ? Math.max(0, rect.bottom) : 0;
  }

  function readingRailY() {
    const top = headerBottom() + 18;
    const offset = Math.min(142, Math.max(76, window.innerHeight * .12));
    return Math.min(window.innerHeight - 72, top + offset);
  }

  function visibility(block) {
    const rect = block.getBoundingClientRect();
    const topEdge = headerBottom() + 8;
    const bottomEdge = window.innerHeight - 18;
    const visibleTop = Math.max(rect.top, topEdge);
    const visibleBottom = Math.min(rect.bottom, bottomEdge);
    const visiblePx = Math.max(0, visibleBottom - visibleTop);
    const height = Math.max(1, rect.height);
    return {
      block,
      rect,
      visiblePx,
      ratio: Math.min(1, visiblePx / height)
    };
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
    if (!hasScrolled) return blocks[0];

    const visible = blocks
      .map(visibility)
      .filter(item => item.visiblePx > 0 && item.ratio >= VISIBLE_RATIO)
      .sort((a, b) => a.rect.top - b.rect.top);

    if (visible.length >= 2) return visible[1].block;
    if (visible.length === 1) return visible[0].block;
    return nearestToRail(blocks);
  }

  function clearPending() {
    pendingPivot = null;
    window.clearTimeout(pendingTimer);
    pendingTimer = 0;
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

  function setPivot(block, { reason = 'scroll', settle = false, logicalLocator = '' } = {}) {
    if (!block || !content.contains(block)) return false;
    const sameBlock = pivot === block;
    if (pivot && !sameBlock) pivot.classList.remove('is-reading-pivot', 'is-pivot-language-settling');
    pivot = block;
    if (logicalLocator) logicalPivotLocator = logicalLocator;
    else if (!sameBlock || !logicalPivotLocator) logicalPivotLocator = physicalLocator(block);
    pivot.classList.add('is-reading-pivot');
    if (settle) {
      const settlingPivot = pivot;
      settlingPivot.classList.remove('is-pivot-language-settling');
      void settlingPivot.offsetWidth;
      settlingPivot.classList.add('is-pivot-language-settling');
      window.setTimeout(() => settlingPivot.classList.remove('is-pivot-language-settling'), 190);
    }
    clearPending();
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

  function commitCandidate(candidate) {
    if (!candidate || candidate === pivot) return clearPending();
    if (holdPivotUntilUserScroll || Date.now() < lockUntil || versions()?.isSwitching?.()) return;
    setPivot(candidate, { reason: 'scroll' });
  }

  function evaluatePivot({ immediate = false } = {}) {
    evaluationFrame = 0;
    if (!readerOpen() || holdPivotUntilUserScroll || Date.now() < lockUntil || versions()?.isSwitching?.()) return;
    const candidate = candidatePivot();
    if (!candidate) return;
    if (!pivot || immediate) return void setPivot(candidate, { reason: pivot ? 'sync' : 'initial' });
    if (candidate === pivot) return clearPending();

    if (pendingPivot !== candidate) {
      clearPending();
      pendingPivot = candidate;
      pendingTimer = window.setTimeout(() => {
        const latest = candidatePivot();
        if (latest === pendingPivot) commitCandidate(latest);
        else clearPending();
      }, PIVOT_SETTLE_MS);
    }
  }

  function scheduleEvaluate(options = {}) {
    if (evaluationFrame) return;
    evaluationFrame = requestAnimationFrame(() => evaluatePivot(options));
  }

  function connectObserver() {
    observer?.disconnect();
    observer = new IntersectionObserver(() => scheduleEvaluate(), {
      root: null,
      threshold: OBSERVER_THRESHOLDS
    });
    readingBlocks().forEach(block => observer.observe(block));
  }

  function matchingLocatorBlocks(locator) {
    if (!locator) return [];
    return readingBlocks().filter(block => physicalLocator(block) === locator);
  }

  function markUserScrollIntent() {
    if (!readerOpen()) return;
    userScrollIntentUntil = Date.now() + USER_SCROLL_INTENT_MS;
    hasScrolled = true;
    if (holdPivotUntilUserScroll && !versions()?.isSwitching?.()) {
      holdPivotUntilUserScroll = false;
      clearPending();
    }
  }

  function captureSwitchAnchor() {
    if (!readerOpen()) return null;
    const blocks = readingBlocks();
    if (!blocks.length) return null;
    const current = pivot && content.contains(pivot) ? pivot : candidatePivot() || blocks[0];
    if (!current) return null;
    if (current !== pivot) setPivot(current, { reason: 'switch-capture' });

    const locator = current === pivot ? currentLogicalLocator() : physicalLocator(current);
    const cluster = matchingLocatorBlocks(locator);
    pendingSwitchAnchor = {
      essayId: essayId(),
      locator,
      clusterIndex: Math.max(0, cluster.indexOf(current)),
      viewportTop: current.getBoundingClientRect().top,
      capturedAt: performance.now()
    };
    holdPivotUntilUserScroll = true;
    userScrollIntentUntil = 0;
    lockUntil = Date.now() + 2400;
    return { ...pendingSwitchAnchor };
  }

  function findSwitchTarget(anchor) {
    if (!anchor?.locator) return null;
    const cluster = matchingLocatorBlocks(anchor.locator);
    if (cluster.length) return cluster[Math.min(anchor.clusterIndex || 0, cluster.length - 1)];
    const paired = [...content.querySelectorAll(':scope > [data-pair-id]')]
      .find(block => block.dataset.pairId === anchor.locator);
    return paired || nearestCanonicalBlock(anchor.locator);
  }

  function restoreSwitchAnchor(event) {
    const anchor = pendingSwitchAnchor;
    if (!anchor || anchor.essayId !== event.detail?.essayId) {
      holdPivotUntilUserScroll = false;
      lockUntil = 0;
      return scheduleEvaluate({ immediate: true });
    }

    requestAnimationFrame(() => requestAnimationFrame(() => {
      window.setTimeout(() => {
        const target = findSwitchTarget(anchor);
        if (!target) {
          pendingSwitchAnchor = null;
          holdPivotUntilUserScroll = false;
          lockUntil = 0;
          connectObserver();
          return scheduleEvaluate({ immediate: true });
        }

        const delta = target.getBoundingClientRect().top - anchor.viewportTop;
        if (Math.abs(delta) > SWITCH_CORRECTION_TOLERANCE) {
          window.scrollBy({ top: delta, behavior: 'auto' });
        }
        setPivot(target, {
          reason: 'language-switch',
          settle: true,
          logicalLocator: anchor.locator
        });
        pendingSwitchAnchor = null;
        userScrollIntentUntil = 0;
        holdPivotUntilUserScroll = true;
        lockUntil = Date.now() + SWITCH_LOCK_MS;
        connectObserver();
      }, 0);
    }));
  }

  function versionOrder(available) {
    return ['ja', ...available.filter(version => version !== 'ja')];
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
    const currentIndex = Math.max(0, order.indexOf(current));
    const next = order[(currentIndex + 1) % order.length];
    const defs = versions().definitions || {};
    const currentDef = defs[current] || { label: current, badge: current.toUpperCase() };
    const nextDef = defs[next] || { label: next, badge: next.toUpperCase() };
    const compareActive = view.classList.contains('language-compare-mode');
    const signature = [id, current, next, available.join(','), compareActive ? 'compare' : 'read'].join('|');

    if (bar.dataset.pivotCycleSignature === signature && bar.querySelector('.reader-language-cycle')) {
      syncMobileCompareShortcut(bar);
      return;
    }
    bar.dataset.pivotCycleSignature = signature;
    bar.classList.add('is-language-cycle-bar');
    bar.innerHTML = `
      <button type="button" class="reader-mode-button reader-language-cycle" data-reader-mode-version="${next}" data-reader-version="${next}" data-current-version="${current}" data-next-version="${next}" aria-label="現在は${currentDef.label}。タップで${nextDef.label}へ切り替え">
        <span class="reader-language-cycle-current">${currentDef.badge.replace(' MIX', '')}</span>
        <span class="reader-language-cycle-mark" aria-hidden="true">↻</span>
      </button>
      <button type="button" class="reader-mode-button reader-mode-compare${compareActive ? ' is-active' : ''}" data-reader-mode-compare data-short-label="⇄" aria-label="日本語と外国語Mixを比較" aria-pressed="${compareActive}">比較</button>`;

    observeModeBar(bar);
    requestAnimationFrame(() => syncMobileCompareShortcut(bar));
    window.setTimeout(() => syncMobileCompareShortcut(bar), 180);
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
      observer?.disconnect();
      if (pivot) pivot.classList.remove('is-reading-pivot', 'is-pivot-language-settling');
      pivot = null;
      logicalPivotLocator = '';
      holdPivotUntilUserScroll = false;
      userScrollIntentUntil = 0;
      clearPending();
      return;
    }

    const id = essayId();
    const routeChanged = id !== lastEssayId;
    if (routeChanged) {
      lastEssayId = id;
      hasScrolled = false;
      pendingSwitchAnchor = null;
      logicalPivotLocator = '';
      holdPivotUntilUserScroll = false;
      userScrollIntentUntil = 0;
      lockUntil = 0;
    }

    connectObserver();
    if (!versions()?.isSwitching?.()) {
      const blocks = readingBlocks();
      const existing = pivot && content.contains(pivot) ? pivot : null;
      if (existing) setPivot(existing, { reason: 'sync' });
      else if (!pendingSwitchAnchor && blocks[0]) setPivot(blocks[0], { reason: 'initial' });
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

  window.MyEssaysReadingPivot = Object.freeze({
    installed: true,
    current: () => pivot,
    locator: () => currentLogicalLocator(),
    physicalLocator: () => physicalLocator(pivot),
    captureForSwitch: captureSwitchAnchor,
    hasPendingSwitchAnchor: () => Boolean(pendingSwitchAnchor),
    refresh: initialize
  });

  document.addEventListener('click', handlePotentialLanguageSwitch, true);
  document.addEventListener('myessays:reader-ready', () => requestAnimationFrame(initialize));
  document.addEventListener('myessays:reader-version-changed', event => {
    restoreSwitchAnchor(event);
    requestAnimationFrame(syncModeBar);
  });
  document.addEventListener('myessays:reading-location-changed', () => requestAnimationFrame(syncModeBar));

  window.addEventListener('wheel', markUserScrollIntent, { passive: true });
  window.addEventListener('touchmove', markUserScrollIntent, { passive: true });
  document.addEventListener('keydown', event => {
    if (SCROLL_KEYS.has(event.key) && !event.metaKey && !event.ctrlKey && !event.altKey) markUserScrollIntent();
  }, true);

  window.addEventListener('scroll', () => {
    const nextY = window.scrollY;
    const frameDelta = Math.abs(nextY - lastScrollY);
    const userDriven = Date.now() <= userScrollIntentUntil;
    if (frameDelta > 2 && userDriven) hasScrolled = true;
    lastScrollY = nextY;
    if (userDriven) scheduleEvaluate();
  }, { passive: true });

  window.addEventListener('resize', () => {
    connectObserver();
    scheduleEvaluate();
    requestAnimationFrame(syncModeBar);
  });

  window.addEventListener('hashchange', () => {
    holdPivotUntilUserScroll = false;
    userScrollIntentUntil = 0;
    logicalPivotLocator = '';
    clearPending();
    requestAnimationFrame(initialize);
  });

  document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', () => requestAnimationFrame(initialize))
    : requestAnimationFrame(initialize);
})();
