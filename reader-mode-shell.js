(() => {
  'use strict';

  if (window.MyEssaysReaderModeShell?.installed) return;

  const SHELL_ID = 'readerModeShell';
  const READING_PREFIX = 'myessays:reading-state:';
  const MODES = [
    ['ja', '日本語'],
    ['en-mix', 'English Mix'],
    ['es-mix', 'Español Mix']
  ];
  const BODY_END_INSET_PX = 16;

  let availabilityToken = 0;
  let lastEssayId = '';
  let contextFrame = 0;
  let contentResizeObserver = null;

  const versions = () => window.MyEssaysReaderVersions;
  const route = () => window.MyEssaysRoute;

  function essayId() {
    return versions()?.currentEssayId?.() || route()?.parse?.().articleId || '';
  }

  function readerOpen() {
    const view = document.getElementById('readerView');
    return Boolean(essayId() && view && !view.hidden);
  }

  function selectedVersion() {
    return window.MyEssaysInstantReadingModes?.desiredVersion?.()
      || versions()?.currentVersion?.()
      || 'ja';
  }

  function readingState(id = essayId()) {
    if (!id) return {};
    try {
      const value = JSON.parse(localStorage.getItem(`${READING_PREFIX}${id}`) || '{}');
      return value && typeof value === 'object' ? value : {};
    } catch {
      return {};
    }
  }

  function recordedCompleted(id = essayId()) {
    return Boolean(readingState(id).completedAt);
  }

  function createShell() {
    const shell = document.createElement('section');
    shell.id = SHELL_ID;
    shell.className = 'reader-mode-shell';
    shell.setAttribute('aria-label', '読書モード');

    const inner = document.createElement('div');
    inner.className = 'reader-mode-shell__inner';

    const modes = document.createElement('div');
    modes.className = 'reader-mode-shell__modes';
    modes.setAttribute('role', 'radiogroup');
    modes.setAttribute('aria-label', '表示言語');

    MODES.forEach(([key, label]) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'reader-mode-shell__mode';
      button.dataset.readingModeIntent = key;
      button.setAttribute('role', 'radio');
      button.setAttribute('aria-checked', 'false');
      button.setAttribute('aria-label', label);
      button.tabIndex = -1;
      button.textContent = label;
      modes.append(button);
    });

    const context = document.createElement('button');
    context.type = 'button';
    context.className = 'reader-mode-shell__context';
    context.setAttribute('aria-label', '目次を開く');

    const section = document.createElement('span');
    section.className = 'reader-mode-shell__section';
    section.textContent = 'Introduction';

    const percent = document.createElement('span');
    percent.className = 'reader-mode-shell__percent';
    percent.textContent = '0%';

    context.append(section, percent);
    context.addEventListener('click', () => window.MyEssaysReaderV2?.setMapOpen?.(true));
    modes.addEventListener('keydown', handleModeKeydown);
    inner.append(modes, context);

    const progress = document.createElement('div');
    progress.className = 'reader-mode-shell__progress';
    progress.setAttribute('aria-hidden', 'true');
    progress.append(document.createElement('span'));

    shell.append(inner, progress);
    return shell;
  }

  function ensureShell() {
    const view = document.getElementById('readerView');
    if (!view) return null;

    let shell = document.getElementById(SHELL_ID);
    if (!shell) shell = createShell();

    const header = view.querySelector('.reader-v2-header');
    if (header) {
      if (shell.previousElementSibling !== header) header.after(shell);
    } else if (shell.parentElement !== view) {
      view.prepend(shell);
    }
    return shell;
  }

  function buttons(root = document.getElementById(SHELL_ID)) {
    return root ? [...root.querySelectorAll('.reader-mode-shell__mode')] : [];
  }

  function renderActive(version = selectedVersion()) {
    const shell = ensureShell();
    if (!shell) return;

    buttons(shell).forEach(button => {
      const active = button.dataset.readingModeIntent === version;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-checked', String(active));
      button.tabIndex = active && !button.disabled ? 0 : -1;
    });
    shell.dataset.desiredVersion = version;
  }

  async function syncAvailability() {
    const shell = ensureShell();
    const api = versions();
    const id = essayId();
    if (!shell || !api?.availableVersions || !id || !readerOpen()) return;

    const token = ++availabilityToken;
    let available = [];
    try {
      available = await api.availableVersions(id);
    } catch {
      available = [];
    }
    if (token !== availabilityToken || id !== essayId()) return;

    const allowed = new Set(['ja', ...available]);
    buttons(shell).forEach(button => {
      const enabled = allowed.has(button.dataset.readingModeIntent || '');
      button.disabled = !enabled;
      button.setAttribute('aria-disabled', String(!enabled));
    });

    lastEssayId = id;
    renderActive();
  }

  function readingBlocks() {
    const content = document.getElementById('readerContent');
    if (!content) return [];
    return [...content.querySelectorAll(':scope > .reader-locator-block[data-reading-locator]')]
      .filter(block => !block.classList.contains('language-source-hidden'));
  }

  function bodyEndReached() {
    const blocks = readingBlocks();
    if (!blocks.length) return false;
    const last = blocks.at(-1);
    const rect = last.getBoundingClientRect();
    return rect.bottom <= Math.max(0, window.innerHeight - BODY_END_INSET_PX);
  }

  function displayProgressRatio(detail = null) {
    const semanticRatio = window.MyEssaysReadingLocators?.progress?.().ratio;
    const baseRatio = Number.isFinite(detail?.progressRatio)
      ? Math.min(1, Math.max(0, detail.progressRatio))
      : (Number.isFinite(semanticRatio) ? Math.min(1, Math.max(0, semanticRatio)) : 0);
    return bodyEndReached() ? 1 : baseRatio;
  }

  function phase() {
    if (!bodyEndReached()) return 'reading';
    return recordedCompleted() ? 'completed' : 'body-end';
  }

  function updateContext(detail = null) {
    const shell = ensureShell();
    if (!shell) return;

    const title = detail?.sectionTitle
      || document.querySelector('.reader-v2-current-title')?.textContent?.trim()
      || 'Introduction';
    const ratio = displayProgressRatio(detail);
    const bodyReached = bodyEndReached();
    const isRecordedCompleted = recordedCompleted();
    const currentPhase = bodyReached
      ? (isRecordedCompleted ? 'completed' : 'body-end')
      : 'reading';
    const progressText = bodyReached
      ? (isRecordedCompleted ? '✓ 読了済み' : '✓ 本文ここまで')
      : `${Math.round(ratio * 100)}%`;

    const section = shell.querySelector('.reader-mode-shell__section');
    const percent = shell.querySelector('.reader-mode-shell__percent');
    const progress = shell.querySelector('.reader-mode-shell__progress span');
    const context = shell.querySelector('.reader-mode-shell__context');
    if (section) section.textContent = title;
    if (percent) percent.textContent = progressText;
    if (progress) progress.style.transform = `scaleX(${ratio})`;

    shell.dataset.readerPhase = currentPhase;
    shell.classList.toggle('is-body-end-reached', bodyReached);
    shell.classList.toggle('is-reading-complete', bodyReached && isRecordedCompleted);

    if (context) {
      const label = bodyReached
        ? (isRecordedCompleted
          ? '本文末まで到達しています。読了記録済みです。目次を開く'
          : '本文末まで到達しました。目次を開く')
        : `${title}、${Math.round(ratio * 100)}%。目次を開く`;
      context.setAttribute('aria-label', label);
    }

    // Reader Mapは位置を確認する場所なので、状態ラベルではなく数値進捗を保つ。
    const mapPercent = document.querySelector('.reader-v2-map-percent');
    if (mapPercent) mapPercent.textContent = `${Math.round(ratio * 100)}%`;
  }

  function scheduleContextSync() {
    if (contextFrame || !readerOpen()) return;
    contextFrame = requestAnimationFrame(() => {
      contextFrame = 0;
      updateContext();
    });
  }

  function observeReaderContent() {
    if (!('ResizeObserver' in window)) return;
    const content = document.getElementById('readerContent');
    if (!content) return;
    contentResizeObserver?.disconnect();
    contentResizeObserver = new ResizeObserver(scheduleContextSync);
    contentResizeObserver.observe(content);
  }

  function handleModeKeydown(event) {
    const current = event.target instanceof Element
      ? event.target.closest('.reader-mode-shell__mode')
      : null;
    if (!current) return;

    const available = buttons(current.closest(`#${SHELL_ID}`)).filter(button => !button.disabled);
    const index = available.indexOf(current);
    if (index < 0 || !available.length) return;

    let next = -1;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % available.length;
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index - 1 + available.length) % available.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = available.length - 1;
    else return;

    event.preventDefault();
    available[next].focus();
    available[next].click();
  }

  function sync({ availability = false } = {}) {
    if (!readerOpen()) return;
    ensureShell();
    renderActive();
    updateContext();
    observeReaderContent();
    const id = essayId();
    if (availability || id !== lastEssayId) syncAvailability();
  }

  function scheduleSync(options = {}) {
    requestAnimationFrame(() => sync(options));
  }

  document.addEventListener('myessays:reader-ready', () => scheduleSync({ availability: true }));
  document.addEventListener('myessays:reader-rendered', () => scheduleSync({ availability: true }));
  document.addEventListener('myessays:reader-version-intent', event => renderActive(event.detail?.version || selectedVersion()));
  document.addEventListener('myessays:reader-version-changed', () => scheduleSync({ availability: true }));
  document.addEventListener('myessays:reader-language-changed', () => scheduleSync({ availability: true }));
  document.addEventListener('myessays:reading-mode-settled', () => scheduleSync({ availability: true }));
  document.addEventListener('myessays:reading-mode-stable', () => scheduleSync());
  document.addEventListener('myessays:reading-progress-changed', () => scheduleSync());
  document.addEventListener('myessays:reading-location-changed', event => {
    if (!readerOpen()) return;
    ensureShell();
    updateContext(event.detail || null);
  });

  document.addEventListener('click', event => {
    const target = event.target;
    if (!(target instanceof Element) || !target.closest('.reading-complete-button')) return;
    window.setTimeout(scheduleContextSync, 0);
  });

  window.addEventListener('scroll', scheduleContextSync, { passive: true });
  window.addEventListener('resize', scheduleContextSync);
  window.addEventListener('hashchange', () => {
    availabilityToken += 1;
    lastEssayId = '';
    scheduleSync({ availability: true });
  });
  window.addEventListener('pageshow', () => scheduleSync({ availability: true }));
  window.addEventListener('storage', event => {
    if (event.key?.startsWith(READING_PREFIX)) scheduleContextSync();
  });

  window.MyEssaysReaderModeShell = Object.freeze({
    installed: true,
    sync,
    syncAvailability,
    renderActive,
    updateContext,
    bodyEndReached,
    phase
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => scheduleSync({ availability: true }), { once: true });
  } else {
    scheduleSync({ availability: true });
  }
})();