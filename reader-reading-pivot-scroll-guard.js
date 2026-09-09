(() => {
  'use strict';

  if (window.MyEssaysReadingPivotScrollGuard?.installed) return;

  const root = document.documentElement;
  let releaseTimer = 0;
  let safetyTimer = 0;

  function clearTimers() {
    window.clearTimeout(releaseTimer);
    window.clearTimeout(safetyTimer);
    releaseTimer = 0;
    safetyTimer = 0;
  }

  function release() {
    clearTimers();
    root.classList.remove('is-reading-mode-switching');
  }

  function engage() {
    clearTimers();
    root.classList.add('is-reading-mode-switching');
    // Defensive escape hatch for failed or interrupted switches.
    safetyTimer = window.setTimeout(release, 3200);
  }

  function scheduleRelease() {
    window.clearTimeout(releaseTimer);
    // reader-reading-pivot performs its final semantic eye-line correction
    // two animation frames after reader-language-changed. Keep scrolling
    // immediate through that handoff, then restore the site's normal smooth
    // navigation behavior.
    releaseTimer = window.setTimeout(release, 180);
  }

  function intendedVersionFromClick(event) {
    const target = event.target instanceof Element
      ? event.target.closest('[data-reader-mode-version],[data-reader-version],.language-lens-full')
      : null;
    if (!target) return '';
    if (target.classList.contains('language-lens-full')) {
      return document.getElementById('languageLensPanel')?.dataset.targetVersion || '';
    }
    return target.dataset.readerModeVersion || target.dataset.readerVersion || '';
  }

  document.addEventListener('click', event => {
    const next = intendedVersionFromClick(event);
    const current = window.MyEssaysReaderVersions?.currentVersion?.() || '';
    if (next && next !== current) engage();
  }, true);

  // This event fires immediately before reader-versions restores the canonical
  // reading position, so programmatic switches get the same instant handoff.
  document.addEventListener('myessays:reader-version-changed', engage);
  document.addEventListener('myessays:reader-language-changed', scheduleRelease);
  document.addEventListener('myessays:reader-version-missing', release);
  window.addEventListener('hashchange', release);
  window.addEventListener('pagehide', release);

  window.MyEssaysReadingPivotScrollGuard = Object.freeze({
    installed: true,
    engage,
    release,
    active: () => root.classList.contains('is-reading-mode-switching')
  });
})();