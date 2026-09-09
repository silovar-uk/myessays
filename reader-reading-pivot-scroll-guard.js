(() => {
  'use strict';

  if (window.MyEssaysReadingPivotScrollGuard?.installed) return;

  const root = document.documentElement;

  function engage() {
    root.classList.add('is-reading-mode-switching');
  }

  function release() {
    root.classList.remove('is-reading-mode-switching');
  }

  // The guard owns no reading coordinate. Its only job is to keep CSS smooth
  // scrolling out of semantic handoffs while Pivot / Locators restore the eye-line.
  document.addEventListener('myessays:reader-version-intent', event => {
    const next = event.detail?.version || '';
    const current = window.MyEssaysReaderVersions?.currentVersion?.() || '';
    if (next && next !== current) engage();
  });

  // Programmatic switches may not originate from the persistent control.
  document.addEventListener('myessays:reader-version-changed', engage);

  // reading-mode-stable is emitted only after semantic eye-line correction.
  document.addEventListener('myessays:reading-mode-stable', release);
  document.addEventListener('myessays:reading-mode-settled', release);
  document.addEventListener('myessays:reader-version-missing', release);

  // A genuine reader gesture ends any stale handoff state immediately.
  window.addEventListener('wheel', release, { passive: true });
  window.addEventListener('touchmove', release, { passive: true });
  window.addEventListener('hashchange', release);
  window.addEventListener('pagehide', release);

  window.MyEssaysReadingPivotScrollGuard = Object.freeze({
    installed: true,
    engage,
    release,
    active: () => root.classList.contains('is-reading-mode-switching')
  });
})();