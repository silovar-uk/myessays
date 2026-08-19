(() => {
  'use strict';

  const INDEX_URL = 'data/mix-index.json';
  const READING_BLOCK_SELECTOR = 'h2, h3, p, ul, ol, blockquote, figure, .essay-table-wrap, hr';
  const READING_LINE_RATIO = 0.28;
  const READING_EDGE_TOLERANCE = 32;
  const modeByEssay = new Map();
  const mixCache = new Map();
  let indexPromise = null;
  let switchInFlight = false;

  function currentEssayId() {
    const match = location.hash.match(/^#\/essay\/(.+)$/);
    if (!match) return '';
    try { return decodeURIComponent(match[1]); }
    catch { return match[1]; }
  }

  function originalEssay(id) {
    try {
      return typeof state !== 'undefined' && Array.isArray(state.essays)
        ? state.essays.find(essay => essay.id === id) || null
        : null;
    } catch {
      return null;
    }
  }

  async function mixIndex() {
    if (!indexPromise) {
      indexPromise = fetch(INDEX_URL, { cache: 'no-store' })
        .then(response => response.ok ? response.json() : { mixes: {} })
        .catch(() => ({ mixes: {} }));
    }
    return indexPromise;
  }

  function parseMixMarkdown(text) {
    try {
      if (typeof parseFrontMatter === 'function') return parseFrontMatter(text).body;
    } catch {}
    const match = String(text || '').match(/^---\n[\s\S]*?\n---\n?/);
    return match ? String(text).slice(match[0].length) : String(text || '');
  }

  async function mixBody(id) {
    if (mixCache.has(id)) return mixCache.get(id);
    const index = await mixIndex();
    const path = index?.mixes?.[id];
    if (!path) return '';
    const body = await fetch(path, { cache: 'no-store' })
      .then(response => response.ok ? response.text() : '')
      .then(parseMixMarkdown)
      .catch(() => '');
    if (body) mixCache.set(id, body);
    return body;
  }

  function currentRenderedMode() {
    try {
      return state?.currentEssay?.__languageMode === 'mix' ? 'mix' : 'ja';
    } catch {
      return 'ja';
    }
  }

  function clamp(value, min = 0, max = 1) {
    return Math.min(max, Math.max(min, value));
  }

  function readerContent() {
    return document.getElementById('readerContent');
  }

  function readingBlocks(content) {
    return content ? [...content.querySelectorAll(READING_BLOCK_SELECTOR)] : [];
  }

  function contentPointForViewport(content, viewportY) {
    const rect = content.getBoundingClientRect();
    return clamp(
      (viewportY - rect.top) / Math.max(rect.height, 1)
    );
  }

  function activeSectionIndex(headings, viewportY) {
    let index = -1;
    for (let i = 0; i < headings.length; i += 1) {
      if (headings[i].getBoundingClientRect().top <= viewportY) index = i;
      else break;
    }
    return index;
  }

  function blocksInSection(blocks, headings, sectionIndex) {
    if (!blocks.length) return [];

    if (sectionIndex < 0) {
      const firstHeadingIndex = headings[0] ? blocks.indexOf(headings[0]) : -1;
      return firstHeadingIndex >= 0 ? blocks.slice(0, firstHeadingIndex) : blocks;
    }

    const startHeading = headings[sectionIndex];
    if (!startHeading) return [];

    const start = blocks.indexOf(startHeading);
    if (start < 0) return [];

    const nextHeading = headings[sectionIndex + 1];
    const end = nextHeading ? blocks.indexOf(nextHeading) : blocks.length;
    return blocks.slice(start, end >= 0 ? end : blocks.length);
  }

  function nearestReadingBlock(blocks, viewportY) {
    if (!blocks.length) return { index: -1, progress: 0 };

    let bestIndex = 0;
    let bestDistance = Infinity;

    blocks.forEach((block, index) => {
      const rect = block.getBoundingClientRect();
      const point = clamp(viewportY, rect.top, rect.bottom);
      const distance = Math.abs(viewportY - point);
      if (distance < bestDistance) {
        bestDistance = distance;
        bestIndex = index;
      }
    });

    const rect = blocks[bestIndex].getBoundingClientRect();
    const progress = clamp(
      (viewportY - rect.top) / Math.max(rect.height, 1)
    );

    return { index: bestIndex, progress };
  }

  function captureReadingPosition() {
    const content = readerContent();
    if (!content) return null;

    const viewportY = window.innerHeight * READING_LINE_RATIO;
    const headings = [...content.querySelectorAll('h2')];
    const blocks = readingBlocks(content);
    const sectionIndex = activeSectionIndex(headings, viewportY);
    const sectionBlocks = blocksInSection(blocks, headings, sectionIndex);
    const current = nearestReadingBlock(sectionBlocks, viewportY);

    const blockRatio = current.index >= 0 && sectionBlocks.length
      ? clamp((current.index + current.progress) / sectionBlocks.length)
      : 0;

    return {
      sectionIndex,
      blockRatio,
      articleProgress: contentPointForViewport(content, viewportY),
      atTop: window.scrollY <= READING_EDGE_TOLERANCE,
      atBottom: window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - READING_EDGE_TOLERANCE
    };
  }

  function targetPointFromSnapshot(snapshot) {
    const content = readerContent();
    if (!content || !snapshot) return null;

    const headings = [...content.querySelectorAll('h2')];
    const blocks = readingBlocks(content);

    if (snapshot.sectionIndex < headings.length) {
      const sectionBlocks = blocksInSection(blocks, headings, snapshot.sectionIndex);
      if (sectionBlocks.length) {
        const scaled = clamp(snapshot.blockRatio) * sectionBlocks.length;
        const index = Math.min(sectionBlocks.length - 1, Math.floor(scaled));
        const progress = clamp(scaled - index);
        const rect = sectionBlocks[index].getBoundingClientRect();
        return rect.top + window.scrollY + (rect.height * progress);
      }
    }

    const rect = content.getBoundingClientRect();
    return rect.top + window.scrollY + (rect.height * clamp(snapshot.articleProgress));
  }

  function restoreReadingPosition(snapshot) {
    return new Promise(resolve => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (!snapshot) {
            resolve();
            return;
          }

          if (snapshot.atTop) {
            window.scrollTo({ top: 0, behavior: 'auto' });
            resolve();
            return;
          }

          if (snapshot.atBottom) {
            window.scrollTo({
              top: document.documentElement.scrollHeight,
              behavior: 'auto'
            });
            resolve();
            return;
          }

          const targetPageY = targetPointFromSnapshot(snapshot);
          if (targetPageY == null) {
            resolve();
            return;
          }

          const desiredViewportY = window.innerHeight * READING_LINE_RATIO;
          window.scrollTo({
            top: Math.max(0, targetPageY - desiredViewportY),
            behavior: 'auto'
          });
          resolve();
        });
      });
    });
  }

  function ensureSwitchElement() {
    let switcher = document.getElementById('readerLanguageSwitch');
    if (switcher) return switcher;

    switcher = document.createElement('div');
    switcher.id = 'readerLanguageSwitch';
    switcher.className = 'reader-language-switch';
    switcher.hidden = true;
    switcher.setAttribute('role', 'group');
    switcher.setAttribute('aria-label', '表示言語');
    switcher.innerHTML = `
      <span class="reader-language-switch-label">表示</span>
      <div class="reader-language-switch-buttons">
        <button type="button" data-reader-language="ja" aria-pressed="true">日本語</button>
        <button type="button" data-reader-language="mix" aria-pressed="false">
          <span>English Mix</span><small class="reader-language-unavailable" hidden>未作成</small>
        </button>
      </div>`;

    switcher.addEventListener('click', event => {
      const button = event.target.closest('[data-reader-language]');
      if (!button || button.disabled) return;
      const next = button.dataset.readerLanguage;
      if (!['ja', 'mix'].includes(next) || next === currentRenderedMode()) return;
      switchLanguage(next);
    });

    document.body.append(switcher);
    return switcher;
  }

  function updateSwitch(switcher, mode) {
    switcher.querySelectorAll('[data-reader-language]').forEach(button => {
      const active = button.dataset.readerLanguage === mode;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });
  }

  async function switchLanguage(mode) {
    if (switchInFlight) return;

    const id = currentEssayId();
    if (!id) return;
    const original = originalEssay(id);
    if (!original || typeof showReader !== 'function') return;

    switchInFlight = true;
    try {
      let nextEssay = original;

      if (mode === 'mix') {
        const body = await mixBody(id);
        if (!body || id !== currentEssayId()) return;
        nextEssay = {
          ...original,
          body,
          metrics: typeof readingMetrics === 'function' ? readingMetrics(body) : original.metrics,
          __languageMode: 'mix'
        };
      }

      // Capture the reader's semantic position immediately before re-rendering.
      // Pixel scrollY is intentionally avoided because JA and English Mix can
      // have very different text lengths.
      const readingPosition = captureReadingPosition();
      const previousScrollY = window.scrollY;

      modeByEssay.set(id, mode);
      showReader(nextEssay);

      // showReader() intentionally scrolls normal article navigation to the top.
      // During a language switch, immediately put the old pixel position back
      // before the next paint, then refine it to the semantic position.
      window.scrollTo({ top: previousScrollY, behavior: 'auto' });
      await restoreReadingPosition(readingPosition);

      document.dispatchEvent(new CustomEvent('myessays:reader-language-changed', {
        detail: { essayId: id, mode }
      }));
    } finally {
      switchInFlight = false;
    }
  }

  async function ensureLanguageSwitch() {
    const switcher = ensureSwitchElement();
    const id = currentEssayId();
    const reader = document.getElementById('readerView');
    const readerIsOpen = Boolean(id && reader && !reader.hidden);

    // Remove the old in-content placement from cached/partial deployments.
    reader?.querySelectorAll(':scope > .reader-language-switch, #readerContent .reader-language-switch')
      ?.forEach(element => {
        if (element !== switcher) element.remove();
      });

    switcher.hidden = !readerIsOpen;
    if (!readerIsOpen) return;

    const index = await mixIndex();
    if (id !== currentEssayId()) return;
    const hasMix = Boolean(index?.mixes?.[id]);

    const mixButton = switcher.querySelector('[data-reader-language="mix"]');
    const unavailable = switcher.querySelector('.reader-language-unavailable');
    if (mixButton) {
      mixButton.disabled = !hasMix;
      mixButton.setAttribute('aria-disabled', String(!hasMix));
      mixButton.title = hasMix
        ? '日本語と英語を混ぜた読み方に切り替える'
        : 'この記事のEnglish Mix版はまだありません';
    }
    if (unavailable) unavailable.hidden = hasMix;
    switcher.classList.toggle('is-mix-unavailable', !hasMix);

    if (!hasMix) modeByEssay.set(id, 'ja');
    const desired = hasMix ? (modeByEssay.get(id) || currentRenderedMode()) : 'ja';
    updateSwitch(switcher, desired);
  }

  function syncModeAfterRender() {
    const id = currentEssayId();
    if (!id) return;
    const rendered = currentRenderedMode();
    if (!modeByEssay.has(id)) modeByEssay.set(id, rendered);
    requestAnimationFrame(ensureLanguageSwitch);
  }

  document.addEventListener('myessays:reader-rendered', syncModeAfterRender);
  document.addEventListener('myessays:reader-ready', ensureLanguageSwitch);
  document.addEventListener('myessays:reader-language-changed', ensureLanguageSwitch);
  window.addEventListener('hashchange', () => {
    const id = currentEssayId();
    if (id && !modeByEssay.has(id)) modeByEssay.set(id, 'ja');
    requestAnimationFrame(ensureLanguageSwitch);
  });
  window.addEventListener('pageshow', () => requestAnimationFrame(ensureLanguageSwitch));

  document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', ensureLanguageSwitch)
    : ensureLanguageSwitch();
})();