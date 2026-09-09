(() => {
  'use strict';

  if (window.MyEssaysReadingPivotScrollGuard?.installed) return;

  const root = document.documentElement;
  let releaseTimer = 0;
  let earlyCorrectionTimer = 0;
  let lateCorrectionTimer = 0;
  let safetyTimer = 0;
  let anchorTop = null;
  let correctionCancelled = false;

  function clearTimers() {
    window.clearTimeout(releaseTimer);
    window.clearTimeout(earlyCorrectionTimer);
    window.clearTimeout(lateCorrectionTimer);
    window.clearTimeout(safetyTimer);
    releaseTimer = 0;
    earlyCorrectionTimer = 0;
    lateCorrectionTimer = 0;
    safetyTimer = 0;
  }

  function release() {
    clearTimers();
    root.classList.remove('is-reading-mode-switching');
    anchorTop = null;
    correctionCancelled = false;
  }

  function captureAnchorTop() {
    const pivot = window.MyEssaysReadingPivot?.current?.();
    const rect = pivot?.getBoundingClientRect?.();
    anchorTop = Number.isFinite(rect?.top) ? rect.top : null;
    correctionCancelled = false;
  }

  function engage({ preserveAnchor = true } = {}) {
    clearTimers();
    if (!preserveAnchor || anchorTop == null) captureAnchorTop();
    root.classList.add('is-reading-mode-switching');
    // Defensive escape hatch for failed or interrupted switches.
    safetyTimer = window.setTimeout(release, 3200);
  }

  function correctEyeLine() {
    if (correctionCancelled || anchorTop == null) return;
    const pivot = window.MyEssaysReadingPivot?.current?.();
    const rect = pivot?.getBoundingClientRect?.();
    if (!Number.isFinite(rect?.top)) return;
    const delta = rect.top - anchorTop;
    if (Math.abs(delta) > 0.75) {
      window.scrollBy({ top: delta, behavior: 'auto' });
    }
  }

  function scheduleRelease() {
    window.clearTimeout(earlyCorrectionTimer);
    window.clearTimeout(lateCorrectionTimer);
    window.clearTimeout(releaseTimer);

    // Reading Mode text can settle twice: first when the semantic target is
    // restored, then again after translated line wrapping/layout stabilises.
    // Correct both phases while keeping the same semantic Ghost Anchor.
    earlyCorrectionTimer = window.setTimeout(() => {
      earlyCorrectionTimer = 0;
      correctEyeLine();
    }, 90);
    lateCorrectionTimer = window.setTimeout(() => {
      lateCorrectionTimer = 0;
      correctEyeLine();
    }, 250);
    releaseTimer = window.setTimeout(release, 360);
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
    if (next && next !== current) {
      captureAnchorTop();
      engage({ preserveAnchor: true });
    }
  }, true);

  // This event fires immediately before reader-versions restores the canonical
  // reading position. For direct UI switches the pre-click eye-line is already
  // captured; programmatic switches fall back to the current Pivot position.
  document.addEventListener('myessays:reader-version-changed', () => {
    engage({ preserveAnchor: anchorTop != null });
  });
  document.addEventListener('myessays:reader-language-changed', scheduleRelease);
  document.addEventListener('myessays:reader-version-missing', release);

  // Never fight an explicit reading gesture during the short handoff window.
  const cancelCorrection = () => { correctionCancelled = true; };
  window.addEventListener('wheel', cancelCorrection, { passive: true });
  window.addEventListener('touchmove', cancelCorrection, { passive: true });
  window.addEventListener('hashchange', release);
  window.addEventListener('pagehide', release);

  window.MyEssaysReadingPivotScrollGuard = Object.freeze({
    installed: true,
    engage,
    release,
    active: () => root.classList.contains('is-reading-mode-switching')
  });
})();