(() => {
  'use strict';

  if (window.MyEssaysReaderReturnNavigation?.installed) return;

  const MOBILE_BREAKPOINT = 820;
  const PAGE_TOP_MIN_SCROLL = 480;
  const PAGE_TOP_VIEWPORT_RATIO = 0.75;

  let lastLibraryScrollY = 0;
  let sourceEssayId = '';
  let hasLibraryContext = false;
  let restoringLibrary = false;
  let restoreFrame = 0;
  let libraryScrollFrame = 0;
  let previousRouteType = window.MyEssaysRoute?.parse?.().type || 'library';

  const $ = id => document.getElementById(id);

  function routeState() {
    return window.MyEssaysRoute?.parse?.() || { type: 'library', articleId: '' };
  }

  function libraryVisible() {
    const view = $('libraryView');
    return routeState().type === 'library' && Boolean(view && !view.hidden);
  }

  function readerVisible() {
    const view = $('readerView');
    return routeState().type === 'essay' && Boolean(view && !view.hidden);
  }

  function captureLibraryContext() {
    if (!libraryVisible() || restoringLibrary) return;
    lastLibraryScrollY = window.scrollY;
    hasLibraryContext = true;
  }

  function scheduleLibraryScrollCapture() {
    if (!libraryVisible() || restoringLibrary || libraryScrollFrame) return;
    libraryScrollFrame = requestAnimationFrame(() => {
      libraryScrollFrame = 0;
      captureLibraryContext();
    });
  }

  function focusSourceEssay() {
    if (!sourceEssayId) return;
    const grid = $('essayGrid');
    if (!grid) return;
    const escaped = window.CSS?.escape ? CSS.escape(sourceEssayId) : sourceEssayId.replace(/["\\]/g, '\\$&');
    const card = grid.querySelector(`[data-id="${escaped}"]`);
    card?.focus?.({ preventScroll: true });
  }

  function restoreLibraryContext() {
    if (!hasLibraryContext) return;
    restoringLibrary = true;
    cancelAnimationFrame(restoreFrame);
    restoreFrame = requestAnimationFrame(() => {
      restoreFrame = requestAnimationFrame(() => {
        window.scrollTo({ top: Math.max(0, lastLibraryScrollY), behavior: 'auto' });
        focusSourceEssay();
        requestAnimationFrame(() => {
          restoringLibrary = false;
        });
      });
    });
  }

  function prefersReducedMotion() {
    return window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches || false;
  }

  function scrollReaderToTop() {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion() ? 'auto' : 'smooth'
    });
  }

  function ensurePageTopControl() {
    const header = document.querySelector('.reader-v2-header');
    const left = header?.querySelector('.reader-v2-header-left');
    if (!left) return null;

    let button = left.querySelector('.reader-v2-page-top');
    if (!button) {
      button = document.createElement('button');
      button.type = 'button';
      button.className = 'reader-v2-page-top';
      button.hidden = true;
      button.setAttribute('aria-label', '記事の先頭へ戻る');
      button.innerHTML = '<span aria-hidden="true">↑</span><span>記事TOP</span>';
      button.addEventListener('click', scrollReaderToTop);

      const back = $('backButton');
      if (back?.parentElement === left) back.insertAdjacentElement('afterend', button);
      else left.prepend(button);
    }

    return button;
  }

  function updatePageTopControl() {
    const button = ensurePageTopControl();
    if (!button) return;

    const threshold = Math.max(
      PAGE_TOP_MIN_SCROLL,
      window.innerHeight * PAGE_TOP_VIEWPORT_RATIO
    );

    button.hidden = !readerVisible()
      || window.innerWidth <= MOBILE_BREAKPOINT
      || window.scrollY <= threshold;
  }

  function rewriteEndNavigation() {
    const link = document.querySelector('.reader-end-navigation .reader-top-link');
    if (!link) return;
    link.textContent = '← Libraryへ戻る';
    link.setAttribute('aria-label', 'Libraryへ戻る');
    link.classList.add('reader-library-return');
  }

  function syncReaderUi() {
    rewriteEndNavigation();
    updatePageTopControl();
  }

  function onHashChange() {
    const route = routeState();
    const nextType = route.type;

    if (previousRouteType === 'library' && nextType === 'essay') {
      sourceEssayId = route.articleId || '';
    }

    if (previousRouteType === 'essay' && nextType === 'library') {
      restoreLibraryContext();
    }

    previousRouteType = nextType;

    if (nextType === 'essay') {
      requestAnimationFrame(syncReaderUi);
    }
  }

  function init() {
    previousRouteType = routeState().type;

    document.addEventListener('click', captureLibraryContext, true);
    document.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') captureLibraryContext();
    }, true);

    window.addEventListener('scroll', scheduleLibraryScrollCapture, { passive: true });
    window.addEventListener('resize', updatePageTopControl, { passive: true });
    window.addEventListener('hashchange', onHashChange);

    document.addEventListener('myessays:reader-rendered', () => {
      requestAnimationFrame(syncReaderUi);
    });

    document.addEventListener('myessays:reading-location-changed', updatePageTopControl);

    if (libraryVisible()) captureLibraryContext();
    if (readerVisible()) requestAnimationFrame(syncReaderUi);
  }

  window.MyEssaysReaderReturnNavigation = Object.freeze({
    installed: true,
    captureLibraryContext,
    restoreLibraryContext,
    updatePageTopControl
  });

  document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', init)
    : init();
})();
