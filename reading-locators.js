(() => {
  'use strict';

  const INDEX_URL = 'data/versions-index.json';
  const LOCATOR_BLOCK_SELECTOR = 'p, ul, ol, blockquote, figure';
  const READING_LINE_RATIO = 0.28;
  const FLASH_DURATION_MS = 1800;
  const MIN_SEMANTIC_FRAGMENT_LENGTH = 3;

  const canonicalSectionsCache = new Map();
  let indexPromise = null;
  let flashTimer = 0;
  let semanticSwitchAnchor = null;

  function currentEssayId() {
    return window.MyEssaysRoute?.parse?.().articleId || '';
  }

  function originalEssay(id) {
    try {
      return typeof state !== 'undefined' && Array.isArray(state.essays)
        ? state.essays.find(essay => essay.id === id) || null
        : null;
    } catch { return null; }
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

  function normalizeText(value) {
    return String(value || '').replace(/\s+/g, ' ').trim();
  }

  function canonicalSections(id) {
    if (canonicalSectionsCache.has(id)) return canonicalSectionsCache.get(id);
    const essay = originalEssay(id);
    if (!essay || typeof renderMarkdown !== 'function') return new Map();
    const scratch = document.createElement('div');
    scratch.innerHTML = renderMarkdown(essay.body || '');
    const sections = new Map(
      [...collectSectionBlocks(scratch)].map(([sectionIndex, blocks]) => [
        sectionIndex,
        blocks.map((block, canonicalIndex) => ({
          canonicalIndex,
          text: String(block.textContent || '').trim(),
          normalized: normalizeText(block.textContent)
        }))
      ])
    );
    canonicalSectionsCache.set(id, sections);
    return sections;
  }

  function canonicalSectionCounts(id) {
    return new Map([...canonicalSections(id)].map(([sectionIndex, blocks]) => [sectionIndex, blocks.length]));
  }

  function locatorLabel(sectionIndex, canonicalIndex) {
    const section = sectionIndex < 0 ? '0' : String(sectionIndex + 1);
    return `${section}-${canonicalIndex + 1}`;
  }

  function parseLocator(locator) {
    const match = String(locator || '').match(/^(\d+)-(\d+)$/);
    if (!match) return null;
    const sectionNumber = Number(match[1]);
    return {
      sectionIndex: sectionNumber === 0 ? -1 : sectionNumber - 1,
      canonicalIndex: Number(match[2]) - 1
    };
  }

  function mappedCanonicalIndex(currentIndex, currentCount, canonicalCount) {
    if (canonicalCount <= 1 || currentCount <= 1) return 0;
    const midpoint = (currentIndex + 0.5) / currentCount;
    return Math.min(canonicalCount - 1, Math.max(0, Math.floor(midpoint * canonicalCount)));
  }

  function canonicalTextForLocator(locator, id = currentEssayId()) {
    const parsed = parseLocator(locator);
    if (!parsed || !id) return '';
    return canonicalSections(id).get(parsed.sectionIndex)?.[parsed.canonicalIndex]?.text || '';
  }

  function uniqueCanonicalFragments(sectionBlocks) {
    const counts = new Map();
    sectionBlocks.forEach(item => {
      if (item.normalized) counts.set(item.normalized, (counts.get(item.normalized) || 0) + 1);
    });
    return sectionBlocks.filter(item =>
      item.normalized.length >= MIN_SEMANTIC_FRAGMENT_LENGTH && counts.get(item.normalized) === 1
    );
  }

  function semanticCoverage(block, sectionIndex, mappedIndex, canonicalBlocks) {
    const rendered = normalizeText(block.textContent);
    const covered = new Set([mappedIndex]);
    uniqueCanonicalFragments(canonicalBlocks).forEach(item => {
      if (rendered.includes(item.normalized)) covered.add(item.canonicalIndex);
    });
    return [...covered].sort((a, b) => a - b).map(index => locatorLabel(sectionIndex, index));
  }

  function clearLocators(content) {
    directChildrenMatching(content, LOCATOR_BLOCK_SELECTOR).forEach(block => {
      block.classList.remove('reader-locator-block', 'reader-locator-repeat', 'is-language-switch-target');
      delete block.dataset.readingLocator;
      delete block.dataset.readingLocatorCoverage;
    });
  }

  function assignLocators() {
    const content = readerContent();
    const id = currentEssayId();
    if (!content || !id) return;
    clearLocators(content);

    const canonical = canonicalSections(id);
    const canonicalCounts = canonicalSectionCounts(id);
    const renderedSections = collectSectionBlocks(content);

    renderedSections.forEach((blocks, sectionIndex) => {
      const canonicalBlocks = canonical.get(sectionIndex) || [];
      const canonicalCount = canonicalCounts.get(sectionIndex) || blocks.length;
      let previousLabel = '';
      blocks.forEach((block, index) => {
        const canonicalIndex = mappedCanonicalIndex(index, blocks.length, canonicalCount);
        const label = locatorLabel(sectionIndex, canonicalIndex);
        block.dataset.readingLocator = label;
        block.dataset.readingLocatorCoverage = semanticCoverage(
          block,
          sectionIndex,
          canonicalIndex,
          canonicalBlocks
        ).join(' ');
        block.classList.add('reader-locator-block');
        if (label === previousLabel) block.classList.add('reader-locator-repeat');
        previousLabel = label;
      });
    });

    content.dataset.semanticLocators = 'ready';
    document.dispatchEvent(new CustomEvent('myessays:semantic-locators-ready', {
      detail: { essayId: id }
    }));
  }

  function coverageList(block) {
    return String(block?.dataset?.readingLocatorCoverage || '').split(/\s+/).filter(Boolean);
  }

  function blockCoversLocator(block, locator) {
    return Boolean(locator && block && (
      block.dataset.readingLocator === locator || coverageList(block).includes(locator)
    ));
  }

  function findContainingBlock(locator, { paragraphOnly = false } = {}) {
    const content = readerContent();
    if (!content || !locator) return null;
    const selector = paragraphOnly
      ? ':scope > p.reader-locator-block[data-reading-locator]'
      : ':scope > .reader-locator-block[data-reading-locator]';
    return [...content.querySelectorAll(selector)].find(block => blockCoversLocator(block, locator)) || null;
  }

  function rangeForExactText(block, text) {
    const needle = String(text || '').trim();
    if (!block || !needle) return null;
    const fullText = String(block.textContent || '');
    const startOffset = fullText.indexOf(needle);
    if (startOffset < 0) return null;
    const endOffset = startOffset + needle.length;
    const walker = document.createTreeWalker(block, NodeFilter.SHOW_TEXT);
    let node = walker.nextNode();
    let cursor = 0;
    let startNode = null;
    let startInNode = 0;
    let endNode = null;
    let endInNode = 0;

    while (node) {
      const length = node.nodeValue?.length || 0;
      const next = cursor + length;
      if (!startNode && startOffset >= cursor && startOffset <= next) {
        startNode = node;
        startInNode = Math.min(length, Math.max(0, startOffset - cursor));
      }
      if (endOffset >= cursor && endOffset <= next) {
        endNode = node;
        endInNode = Math.min(length, Math.max(0, endOffset - cursor));
        break;
      }
      cursor = next;
      node = walker.nextNode();
    }

    if (!startNode || !endNode) return null;
    try {
      const range = document.createRange();
      range.setStart(startNode, startInNode);
      range.setEnd(endNode, endInNode);
      return range;
    } catch { return null; }
  }

  function semanticRect(locator, block = null) {
    const target = block || findContainingBlock(locator);
    if (!target) return null;
    const canonicalText = canonicalTextForLocator(locator);
    if (canonicalText && blockCoversLocator(target, locator)) {
      const range = rangeForExactText(target, canonicalText);
      const rect = range?.getBoundingClientRect?.();
      if (rect && (rect.height > 0 || rect.width > 0)) {
        return {
          top: rect.top,
          bottom: rect.bottom,
          left: rect.left,
          right: rect.right,
          width: rect.width,
          height: rect.height,
          exactText: true,
          physicalLocator: target.dataset.readingLocator || ''
        };
      }
    }
    const rect = target.getBoundingClientRect();
    return {
      top: rect.top,
      bottom: rect.bottom,
      left: rect.left,
      right: rect.right,
      width: rect.width,
      height: rect.height,
      exactText: false,
      physicalLocator: target.dataset.readingLocator || ''
    };
  }

  function semanticTop(locator, block = null) {
    return semanticRect(locator, block)?.top ?? null;
  }

  function captureSemanticAnchorNow() {
    const pivotApi = window.MyEssaysReadingPivot;
    const locator = pivotApi?.locator?.() || '';
    const block = pivotApi?.current?.() || findContainingBlock(locator, { paragraphOnly: true });
    const top = locator && block ? semanticTop(locator, block) : null;
    semanticSwitchAnchor = locator && block && top != null
      ? { essayId: currentEssayId(), locator, viewportTop: top }
      : null;
    return semanticSwitchAnchor ? { ...semanticSwitchAnchor } : null;
  }

  function restoreSemanticEyeLine(event) {
    if (event.detail?.reason !== 'language-switch') return;
    const anchor = semanticSwitchAnchor;
    semanticSwitchAnchor = null;

    if (anchor && anchor.essayId === currentEssayId() && event.detail?.locator === anchor.locator) {
      const target = findContainingBlock(anchor.locator, { paragraphOnly: true });
      if (target) {
        const targetTop = semanticTop(anchor.locator, target);
        if (targetTop != null) {
          const delta = targetTop - anchor.viewportTop;
          if (Math.abs(delta) > 0.75) window.scrollBy({ top: delta, behavior: 'auto' });
        }
      }
    }

    document.dispatchEvent(new CustomEvent('myessays:reading-mode-stable', {
      detail: {
        essayId: currentEssayId(),
        version: window.MyEssaysReaderVersions?.currentVersion?.() || 'ja',
        locator: event.detail?.locator || '',
        physicalLocator: event.detail?.physicalLocator || ''
      }
    }));
  }

  async function syncAlternateState() {
    const content = readerContent();
    const id = currentEssayId();
    if (!content || !id) return;
    const index = await versionsIndex();
    if (id !== currentEssayId()) return;
    const versions = index?.articles?.[id] || {};
    content.classList.toggle('has-language-alternate', Object.keys(versions).length > 0);
  }

  function nearestLocatorBlock() {
    const content = readerContent();
    if (!content) return null;
    const blocks = directChildrenMatching(content, '.reader-locator-block[data-reading-locator]');
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
    flashTimer = window.setTimeout(() => target.classList.remove('is-language-switch-target'), FLASH_DURATION_MS);
  }

  function syncReaderLocators() {
    assignLocators();
    syncAlternateState();
  }

  window.MyEssaysReadingLocators = Object.freeze({
    assign: assignLocators,
    canonicalText: canonicalTextForLocator,
    coverage: coverageList,
    covers: blockCoversLocator,
    findContainingBlock,
    semanticRect,
    semanticTop,
    captureForSwitch: captureSemanticAnchorNow,
    hasSwitchAnchor: () => Boolean(semanticSwitchAnchor)
  });

  document.addEventListener('myessays:reading-pivot-changed', restoreSemanticEyeLine);
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
    semanticSwitchAnchor = null;
    requestAnimationFrame(syncReaderLocators);
  });
  window.addEventListener('pageshow', () => requestAnimationFrame(syncReaderLocators));

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', syncReaderLocators);
  } else {
    syncReaderLocators();
  }
})();