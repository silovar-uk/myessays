(() => {
  'use strict';

  const INDEX_URL = 'data/versions-index.json';
  const LOCATOR_BLOCK_SELECTOR = 'p, ul, ol, blockquote, figure';
  const READING_LINE_RATIO = 0.28;
  const FLASH_DURATION_MS = 1800;

  const canonicalCountsCache = new Map();
  let indexPromise = null;
  let flashTimer = 0;

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

  function readerContent() {
    return document.getElementById('readerContent');
  }

  function directChildrenMatching(root, selector) {
    return root ? [...root.children].filter(element => element.matches(selector)) : [];
  }

  function versionsIndex() {
    if (!indexPromise) {
      indexPromise = fetch(INDEX_URL, { cache: 'no-store' })
        .then(response => response.ok ? response.json() : { articles: {} })
        .then(data => ({ articles: data?.articles && typeof data.articles === 'object' ? data.articles : {} }))
        .catch(() => ({ articles: {} }));
    }
    return indexPromise;
  }

  function collectSectionBlocks(root) {
    const sections = new Map();
    let sectionIndex = -1;

    [...root.children].forEach(element => {
      if (element.matches('h2')) {
        sectionIndex += 1;
        return;
      }
      if (!element.matches(LOCATOR_BLOCK_SELECTOR)) return;
      if (!sections.has(sectionIndex)) sections.set(sectionIndex, []);
      sections.get(sectionIndex).push(element);
    });

    return sections;
  }

  function canonicalSectionCounts(id) {
    if (canonicalCountsCache.has(id)) return canonicalCountsCache.get(id);

    const essay = originalEssay(id);
    if (!essay || typeof renderMarkdown !== 'function') return new Map();

    const scratch = document.createElement('div');
    scratch.innerHTML = renderMarkdown(essay.body || '');

    const counts = new Map(
      [...collectSectionBlocks(scratch)].map(([sectionIndex, blocks]) => [
        sectionIndex,
        blocks.length
      ])
    );

    canonicalCountsCache.set(id, counts);
    return counts;
  }

  function locatorLabel(sectionIndex, canonicalIndex) {
    const section = sectionIndex < 0 ? '0' : String(sectionIndex + 1);
    return `${section}-${canonicalIndex + 1}`;
  }

  function mappedCanonicalIndex(currentIndex, currentCount, canonicalCount) {
    if (canonicalCount <= 1 || currentCount <= 1) return 0;

    // Japanese is the canonical structure. Derived reading versions can split
    // or merge paragraphs, so raw DOM ordinals are not stable across versions.
    // Map each rendered block back onto the canonical paragraph sequence by
    // relative position within the section.
    const midpoint = (currentIndex + 0.5) / currentCount;
    return Math.min(
      canonicalCount - 1,
      Math.max(0, Math.floor(midpoint * canonicalCount))
    );
  }

  function clearLocators(content) {
    directChildrenMatching(content, LOCATOR_BLOCK_SELECTOR).forEach(block => {
      block.classList.remove(
        'reader-locator-block',
        'reader-locator-repeat',
        'is-language-switch-target'
      );
      delete block.dataset.readingLocator;
    });
  }

  function assignLocators() {
    const content = readerContent();
    const id = currentEssayId();
    if (!content || !id) return;

    clearLocators(content);

    const canonicalCounts = canonicalSectionCounts(id);
    const renderedSections = collectSectionBlocks(content);

    renderedSections.forEach((blocks, sectionIndex) => {
      const canonicalCount = canonicalCounts.get(sectionIndex) || blocks.length;
      let previousLabel = '';

      blocks.forEach((block, index) => {
        const canonicalIndex = mappedCanonicalIndex(
          index,
          blocks.length,
          canonicalCount
        );
        const label = locatorLabel(sectionIndex, canonicalIndex);

        block.dataset.readingLocator = label;
        block.classList.add('reader-locator-block');

        // A derived version can expand one canonical Japanese paragraph into
        // several rendered blocks. Keep duplicate landmarks visually quiet,
        // while retaining a locator on every block for switch feedback.
        if (label === previousLabel) block.classList.add('reader-locator-repeat');
        previousLabel = label;
      });
    });
  }

  async function syncAlternateState() {
    const content = readerContent();
    const id = currentEssayId();
    if (!content || !id) return;

    const index = await versionsIndex();
    if (id !== currentEssayId()) return;

    const versions = index?.articles?.[id] || {};
    content.classList.toggle(
      'has-language-alternate',
      Object.keys(versions).length > 0
    );
  }

  function nearestLocatorBlock() {
    const content = readerContent();
    if (!content) return null;

    const blocks = directChildrenMatching(
      content,
      '.reader-locator-block[data-reading-locator]'
    );
    if (!blocks.length) return null;

    const readingY = window.innerHeight * READING_LINE_RATIO;
    let nearest = blocks[0];
    let bestDistance = Infinity;

    blocks.forEach(block => {
      const rect = block.getBoundingClientRect();
      const closestY = Math.min(rect.bottom, Math.max(rect.top, readingY));
      const distance = Math.abs(readingY - closestY);
      if (distance < bestDistance) {
        bestDistance = distance;
        nearest = block;
      }
    });

    return nearest;
  }

  function flashCurrentLocator() {
    const content = readerContent();
    if (!content || !content.classList.contains('has-language-alternate')) return;

    const target = nearestLocatorBlock();
    if (!target) return;

    content.querySelectorAll('.is-language-switch-target')
      .forEach(element => element.classList.remove('is-language-switch-target'));

    window.clearTimeout(flashTimer);

    target.classList.remove('is-language-switch-target');
    void target.offsetWidth;
    target.classList.add('is-language-switch-target');

    flashTimer = window.setTimeout(() => {
      target.classList.remove('is-language-switch-target');
    }, FLASH_DURATION_MS);
  }

  function syncReaderLocators() {
    assignLocators();
    syncAlternateState();
  }

  document.addEventListener('myessays:reader-rendered', syncReaderLocators);
  document.addEventListener('myessays:reader-ready', syncReaderLocators);
  document.addEventListener('myessays:reader-version-changed', () => {
    requestAnimationFrame(() => {
      assignLocators();
      syncAlternateState();
      flashCurrentLocator();
    });
  });

  window.addEventListener('hashchange', () => {
    requestAnimationFrame(syncReaderLocators);
  });

  window.addEventListener('pageshow', () => {
    requestAnimationFrame(syncReaderLocators);
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', syncReaderLocators);
  } else {
    syncReaderLocators();
  }
})();
