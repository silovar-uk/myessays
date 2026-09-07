(() => {
  'use strict';

  const MOBILE_BREAKPOINT = 820;
  const READING_PREFIX = 'myessays:reading-state:';
  const READING_LINE_RATIO = 0.28;
  let syncFrame = 0;
  let pendingModeLocation = null;
  let restoreFrame = 0;

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

  function clamp(value, min = 0, max = 1) {
    return Math.min(max, Math.max(min, value));
  }

  function readingLineY() {
    const header = document.querySelector('.reader-v2-header');
    const minimum = header?.getBoundingClientRect().height
      ? header.getBoundingClientRect().height + 24
      : 0;
    return Math.max(window.innerHeight * READING_LINE_RATIO, minimum);
  }

  function cssEscape(value = '') {
    if (window.CSS?.escape) return CSS.escape(String(value));
    return String(value).replace(/(["\\#.;?+*~':!^$\[\]()=>|/@])/g, '\\$1');
  }

  function captureModeLocation(event) {
    const option = event.target instanceof Element
      ? event.target.closest('[data-reader-mode-version],[data-reader-version]')
      : null;
    if (!option || !readerOpen()) return;

    const nextVersion = option.dataset.readerModeVersion || option.dataset.readerVersion || '';
    const currentVersion = window.MyEssaysReaderVersions?.currentVersion?.() || 'ja';
    if (!nextVersion || nextVersion === currentVersion) return;

    const locationValue = window.MyEssaysReadingLocation?.current?.();
    const block = locationValue?.block;
    const locator = locationValue?.locator || block?.dataset?.readingLocator || '';
    if (!locator) return;

    const rect = block?.getBoundingClientRect?.();
    const progress = rect && rect.height > 0
      ? clamp((readingLineY() - rect.top) / rect.height)
      : 0;

    pendingModeLocation = {
      essayId: currentEssayId(),
      locator,
      progress
    };
  }

  function exactLocatorTarget(locator) {
    const content = readerContent();
    if (!content || !locator) return null;
    const matches = [...content.querySelectorAll(
      `[data-reading-locator="${cssEscape(locator)}"]`
    )];
    return matches[0] || null;
  }

  function restoreExactModeLocation(event) {
    if (!readerOpen()) return;
    const eventEssayId = event?.detail?.essayId || currentEssayId();
    const eventPairId = event?.detail?.pairId || '';
    const captured = pendingModeLocation && pendingModeLocation.essayId === eventEssayId
      ? pendingModeLocation
      : null;
    pendingModeLocation = null;

    const locator = captured?.locator || eventPairId;
    if (!locator) return;

    window.cancelAnimationFrame(restoreFrame);
    restoreFrame = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          restoreFrame = 0;
          if (!readerOpen() || currentEssayId() !== eventEssayId) return;
          const target = exactLocatorTarget(locator);
          if (!target) return;

          const rect = target.getBoundingClientRect();
          const progress = captured?.progress ?? 0;
          const pagePoint = rect.top + window.scrollY + (rect.height * clamp(progress));
          window.scrollTo({
            top: Math.max(0, pagePoint - readingLineY()),
            behavior: 'auto'
          });
          window.MyEssaysReadingLocation?.refresh?.();
        });
      });
    });
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
    document.addEventListener('click', captureModeLocation, true);
    document.addEventListener('myessays:reader-rendered', schedule);
    document.addEventListener('myessays:reader-ready', schedule);
    document.addEventListener('myessays:reader-version-changed', event => {
      schedule();
      restoreExactModeLocation(event);
    });
    document.addEventListener('myessays:reader-language-changed', schedule);
    window.addEventListener('hashchange', () => {
      pendingModeLocation = null;
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
