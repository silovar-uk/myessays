(() => {
  'use strict';

  const MOBILE_BREAKPOINT = 820;
  const READING_PREFIX = 'myessays:reading-state:';
  const VERSION_POSITION_OWNER = 'reader-versions';
  const VERSION_SCROLL_SUPPRESS_MS = 260;
  let syncFrame = 0;
  let suppressScrollByUntil = 0;
  let pendingPivotViewportAnchor = null;
  let canonicalScrollAdjustmentReady = false;

  function currentEssayId() {
    const match = location.hash.match(/^#\/essay\/(.+)$/);
    if (!match) return '';
    try { return decodeURIComponent(match[1]); }
    catch { return match[1]; }
  }

  function canonicalEssay() {
    const id = currentEssayId();
    if (!id) return null;
    try {
      return typeof state !== 'undefined' && Array.isArray(state.essays)
        ? state.essays.find(essay => essay.id === id) || null
        : null;
    } catch {
      return null;
    }
  }

  function readerContent() {
    return document.getElementById('readerContent');
  }

  function readerOpen() {
    const reader = document.getElementById('readerView');
    return Boolean(currentEssayId() && reader && !reader.hidden);
  }

  function readState() {
    const id = currentEssayId();
    if (!id) return {};
    try {
      const value = JSON.parse(localStorage.getItem(`${READING_PREFIX}${id}`) || '{}');
      return value && typeof value === 'object' ? value : {};
    } catch {
      return {};
    }
  }

  function element(tag, className = '', text = '') {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  }

  function rebuildMapForSubtitlelessEssay(content) {
    const essay = canonicalEssay();
    if (!essay || String(essay.subtitle || '').trim()) return false;

    const mistaken = content.querySelector(':scope > h2.reader-v2-subtitle');
    if (!mistaken) return false;
    mistaken.classList.remove('reader-v2-subtitle');

    const nav = document.querySelector('.reader-v2-map-nav');
    if (!nav) return true;

    const headings = [...content.querySelectorAll(':scope > h2')];
    const stored = readState();
    const anchors = window.MyEssaysReaderV2?.noteAnchors?.() || [];
    const fragment = document.createDocumentFragment();

    headings.forEach((heading, index) => {
      const button = element('button', 'reader-v2-map-item');
      button.type = 'button';
      button.dataset.readerMapSection = String(index);

      button.append(element('span', 'reader-v2-map-number', String(index + 1).padStart(2, '0')));
      button.append(element('span', 'reader-v2-map-label', heading.textContent?.trim() || ''));

      const markers = element('span', 'reader-v2-map-markers');
      markers.setAttribute('aria-hidden', 'true');
      const hasNote = anchors.some(anchor =>
        Number(anchor.sectionIndex) === index || (anchor.sectionId && anchor.sectionId === heading.id)
      );
      const wasLast = stored.lastSectionId
        ? stored.lastSectionId === heading.id
        : Number(stored.lastSection) === index;

      if (hasNote) markers.append(element('i', 'reader-v2-note-marker', '✎'));
      if (wasLast) markers.append(element('i', 'reader-v2-last-marker', '│'));
      markers.append(element('i', 'reader-v2-current-marker', '●'));
      markers.append(element('i', 'reader-v2-passed-marker', '✓'));
      button.append(markers);

      button.addEventListener('click', () => {
        window.MyEssaysReadingLocation?.scrollToSection?.(index, { behavior: 'smooth' });
        if (window.innerWidth <= MOBILE_BREAKPOINT) {
          window.MyEssaysReaderV2?.setMapOpen?.(false);
        }
      });
      fragment.append(button);
    });

    nav.replaceChildren(fragment);
    return true;
  }

  function stabilizeCopyAction(content) {
    const source = [...content.querySelectorAll('.reader-copy-button')]
      .find(button => !button.classList.contains('reader-v2-copy-proxy'));
    if (!source) return;

    const unsafeTarget = content.querySelector('.reader-v2-info-actions');
    if (unsafeTarget) {
      unsafeTarget.classList.remove('reader-v2-info-actions');
      unsafeTarget.classList.add('reader-v2-info-actions-safe');
    }

    if (content.firstElementChild !== source) content.prepend(source);
    source.hidden = true;
    source.classList.add('reader-v2-copy-origin');

    const target = content.querySelector('.reader-v2-info-actions-safe');
    if (!target || target.querySelector('.reader-v2-copy-proxy')) return;

    const proxy = document.createElement('button');
    proxy.type = 'button';
    proxy.className = 'reader-copy-button reader-v2-copy-proxy';
    proxy.style.margin = '0';
    proxy.innerHTML = '<span aria-hidden="true">⧉</span><span>全文コピー</span>';
    proxy.addEventListener('click', () => {
      source.click();
      const original = proxy.innerHTML;
      proxy.innerHTML = '<span aria-hidden="true">✓</span><span>コピーしました</span>';
      proxy.classList.add('is-copied');
      window.setTimeout(() => {
        if (!proxy.isConnected) return;
        proxy.innerHTML = original;
        proxy.classList.remove('is-copied');
      }, 1450);
    });
    target.append(proxy);
  }

  function capturePivotViewportAnchor() {
    const content = readerContent();
    const pivot = window.MyEssaysReadingPivot?.current?.();
    const locator = window.MyEssaysReadingPivot?.locator?.() || pivot?.dataset?.readingLocator || '';
    if (!content || !pivot || !locator || !content.contains(pivot)) return null;
    if (window.scrollY <= 32) return null;

    const blocks = [...content.querySelectorAll(':scope > .reader-locator-block[data-reading-locator]')]
      .filter(block => block.dataset.readingLocator === locator);
    return {
      essayId: currentEssayId(),
      locator,
      clusterIndex: Math.max(0, blocks.indexOf(pivot)),
      viewportTop: pivot.getBoundingClientRect().top
    };
  }

  // The one-tap mode bar is owned by reader-language-lab.js via
  // data-reader-mode-version. Remove the legacy alias before Reader V2's
  // document-capture listener sees the click, so Reader V2 does not schedule a
  // second locator restoration for the same transition. Capture Pivot geometry
  // here too, while the old mode is still rendered.
  function yieldLegacyVersionLocatorCapture(event) {
    if (!readerOpen()) return;
    const target = event.target instanceof Element
      ? event.target.closest('[data-reader-mode-version][data-reader-version]')
      : null;
    if (!target) return;
    pendingPivotViewportAnchor = capturePivotViewportAnchor();
    target.removeAttribute('data-reader-version');
  }

  // Reading Pivot preserves semantic identity, but Reading Versions owns the
  // physical scroll position. Its old viewport-top correction uses scrollBy;
  // suppress only that correction during the canonical restoration window.
  function markCanonicalPositionOwnership(event) {
    if (event.detail?.positionOwner !== VERSION_POSITION_OWNER) return;
    suppressScrollByUntil = performance.now() + VERSION_SCROLL_SUPPRESS_MS;
    canonicalScrollAdjustmentReady = Boolean(
      pendingPivotViewportAnchor &&
      pendingPivotViewportAnchor.essayId === event.detail?.essayId
    );
  }

  function pivotAdjustedScrollTop(anchor) {
    const content = readerContent();
    if (!content || !anchor?.locator) return null;
    const blocks = [...content.querySelectorAll(':scope > .reader-locator-block[data-reading-locator]')]
      .filter(block => block.dataset.readingLocator === anchor.locator);
    if (!blocks.length) return null;
    const target = blocks[Math.min(anchor.clusterIndex || 0, blocks.length - 1)];
    const targetPageY = target.getBoundingClientRect().top + window.scrollY;
    return Math.max(0, targetPageY - anchor.viewportTop);
  }

  function installScrollOwnershipGuard() {
    const nativeScrollBy = window.scrollBy.bind(window);
    const nativeScrollTo = window.scrollTo.bind(window);

    window.scrollBy = (...args) => {
      if (performance.now() < suppressScrollByUntil) return;
      return nativeScrollBy(...args);
    };

    window.scrollTo = (...args) => {
      if (canonicalScrollAdjustmentReady) {
        canonicalScrollAdjustmentReady = false;
        const anchor = pendingPivotViewportAnchor;
        pendingPivotViewportAnchor = null;

        // Reader Versions remains the sole physical scroll owner. Defer that
        // one native scroll by a single frame, then remeasure the derived-mode
        // Pivot after Reader V2 / mode-bar layout work has settled.
        requestAnimationFrame(() => {
          const top = pivotAdjustedScrollTop(anchor);
          if (top != null) {
            if (typeof args[0] === 'object' && args[0] !== null) {
              nativeScrollTo({ ...args[0], top, behavior: 'auto' });
            } else {
              nativeScrollTo(Number(args[0]) || 0, top);
            }
            return;
          }
          nativeScrollTo(...args);
        });
        return;
      }
      return nativeScrollTo(...args);
    };
  }

  function stabilize() {
    syncFrame = 0;
    if (!readerOpen()) return;
    const content = readerContent();
    if (!content) return;

    const rebuilt = rebuildMapForSubtitlelessEssay(content);
    stabilizeCopyAction(content);
    if (rebuilt) window.MyEssaysReadingLocation?.refresh?.();
  }

  function schedule() {
    if (syncFrame) return;
    syncFrame = requestAnimationFrame(() => {
      requestAnimationFrame(stabilize);
    });
  }

  function init() {
    installScrollOwnershipGuard();
    window.addEventListener('click', yieldLegacyVersionLocatorCapture, true);
    document.addEventListener('myessays:reader-version-changed', markCanonicalPositionOwnership, true);

    document.addEventListener('myessays:reader-rendered', schedule);
    document.addEventListener('myessays:reader-ready', schedule);
    document.addEventListener('myessays:reader-version-changed', schedule);
    document.addEventListener('myessays:reader-language-changed', schedule);
    window.addEventListener('hashchange', () => {
      pendingPivotViewportAnchor = null;
      canonicalScrollAdjustmentReady = false;
      window.setTimeout(schedule, 0);
    });

    const content = readerContent();
    if (content) {
      new MutationObserver(mutations => {
        const relevant = mutations.some(mutation => [...mutation.addedNodes].some(node =>
          node instanceof Element && (
            node.classList.contains('reader-v2-intro') ||
            node.classList.contains('reader-copy-button') ||
            node.querySelector?.('.reader-copy-button')
          )
        ));
        if (relevant) schedule();
      }).observe(content, { childList: true, subtree: true });
    }

    schedule();
  }

  document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', init, { once: true })
    : init();
})();