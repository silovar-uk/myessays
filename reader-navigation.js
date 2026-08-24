(() => {
  'use strict';

  const navSelector = '.reader-end-navigation';

  function escapeNavigationHtml(value = '') {
    return String(value).replace(/[&<>'"]/g, char => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
    }[char]));
  }

  function getVisibleEssayOrder() {
    return [...document.querySelectorAll('#essayGrid [data-id]')]
      .map(card => ({
        id: card.dataset.id || '',
        title: card.querySelector('h2')?.textContent?.trim() || ''
      }))
      .filter(essay => essay.id);
  }

  function getAllEssays() {
    try {
      return typeof state !== 'undefined' && Array.isArray(state.essays) ? state.essays : [];
    } catch {
      return [];
    }
  }

  function getSeriesSequence(currentEssay) {
    if (!currentEssay?.series || currentEssay.seriesOrder === undefined || currentEssay.seriesOrder === null) return null;

    const items = getAllEssays()
      .filter(essay => essay.series === currentEssay.series && Number.isFinite(Number(essay.seriesOrder)))
      .sort((a, b) => Number(a.seriesOrder) - Number(b.seriesOrder));

    if (items.length < 2) return null;
    const index = items.findIndex(essay => essay.id === currentEssay.id);
    if (index === -1) return null;

    return {
      items,
      index,
      previous: index > 0 ? items[index - 1] : null,
      next: index < items.length - 1 ? items[index + 1] : null
    };
  }

  function formatNavigationDate(value = '') {
    if (!value) return '';
    const [year, month, day] = String(value).split('-');
    return [year, month, day].filter(Boolean).join('.');
  }

  function essayLink(essay, direction, { series = false } = {}) {
    if (!essay) return '<div class="reader-end-link reader-end-link--empty" aria-hidden="true"></div>';
    const previous = direction === 'previous';
    const label = series
      ? (previous ? '← シリーズ前へ' : 'シリーズ次へ →')
      : (previous ? '← 前の記事' : '次の記事 →');
    const directionClass = previous ? 'reader-end-link--previous' : 'reader-end-link--next';
    return `
      <a class="reader-end-link ${directionClass}" href="#/essay/${encodeURIComponent(essay.id)}">
        <span class="reader-nav-label">${label}</span>
        <strong>${escapeNavigationHtml(essay.title)}</strong>
      </a>`;
  }

  function relatedEssays(currentEssay) {
    const currentTags = new Set((currentEssay?.tags || []).filter(Boolean));
    if (!currentTags.size) return [];

    return getAllEssays()
      .filter(essay => essay.id !== currentEssay.id)
      .map(essay => ({
        essay,
        sharedTags: [...new Set((essay.tags || []).filter(tag => currentTags.has(tag)))]
      }))
      .filter(item => item.sharedTags.length > 0)
      .sort((a, b) => {
        const shared = b.sharedTags.length - a.sharedTags.length;
        if (shared) return shared;
        const created = String(b.essay.created || '').localeCompare(String(a.essay.created || ''));
        if (created) return created;
        return String(a.essay.title || '').localeCompare(String(b.essay.title || ''), 'ja');
      })
      .slice(0, 4);
  }

  function relatedCard(item, index) {
    const { essay, sharedTags } = item;
    const meta = [essay.type || 'Essay', formatNavigationDate(essay.created)].filter(Boolean).join(' · ');
    const tags = sharedTags.map(tag => `<span class="reader-related-tag">#${escapeNavigationHtml(tag)}</span>`).join('');
    return `
      <a class="reader-related-item" href="#/essay/${encodeURIComponent(essay.id)}">
        <div class="reader-related-item-top">
          <span class="reader-related-number">${String(index + 1).padStart(2, '0')}</span>
          <span class="reader-related-meta">${escapeNavigationHtml(meta)}</span>
        </div>
        <h3>${escapeNavigationHtml(essay.title || '')}</h3>
        <div class="reader-related-tags" aria-label="共通タグ">${tags}</div>
      </a>`;
  }

  function relatedSection(currentEssay) {
    const items = relatedEssays(currentEssay);
    if (!items.length) return '';
    return `
      <section class="reader-related" aria-labelledby="readerRelatedTitle">
        <div class="reader-related-heading">
          <div>
            <p class="reader-related-kicker">RELATED</p>
            <h2 id="readerRelatedTitle">同じ関心から、もう一本。</h2>
          </div>
          <p class="reader-related-note">共通タグが多い順。並んだ場合は新しい記事を優先。</p>
        </div>
        <div class="reader-related-grid">${items.map(relatedCard).join('')}</div>
      </section>`;
  }

  function renderReaderEndNavigation(context) {
    const root = context?.root || document.getElementById('readerContent');
    const currentEssay = context?.essay || null;
    if (!root || !currentEssay) return;

    root.querySelector(navSelector)?.remove();

    const seriesSequence = getSeriesSequence(currentEssay);
    let previous = null;
    let next = null;
    let sequenceHeader = '';
    let isSeries = false;

    if (seriesSequence) {
      previous = seriesSequence.previous;
      next = seriesSequence.next;
      isSeries = true;
      sequenceHeader = `
        <p class="reader-related-kicker">SERIES</p>
        <p class="reader-related-note" style="max-width:none;margin:0 0 12px !important;text-align:left;">
          ${escapeNavigationHtml(currentEssay.series)} · ${seriesSequence.index + 1}/${seriesSequence.items.length}
        </p>`;
    } else {
      const visible = getVisibleEssayOrder();
      let currentIndex = visible.findIndex(essay => essay.id === currentEssay.id);
      let order = visible;

      // When a filter removes the current card from the hidden Library DOM,
      // fall back to the complete archive so navigation never disappears.
      if (currentIndex === -1) {
        order = getAllEssays().map(essay => ({ id: essay.id, title: essay.title || '' }));
        currentIndex = order.findIndex(essay => essay.id === currentEssay.id);
      }
      if (currentIndex === -1) return;

      previous = currentIndex > 0 ? order[currentIndex - 1] : null;
      next = currentIndex < order.length - 1 ? order[currentIndex + 1] : null;
    }

    const nav = document.createElement('div');
    nav.className = 'reader-end-navigation';
    nav.dataset.essayId = currentEssay.id;
    nav.innerHTML = `
      ${relatedSection(currentEssay)}
      <nav class="reader-sequence-navigation" aria-label="${isSeries ? 'シリーズ前後の記事' : '前後の記事'}">
        ${sequenceHeader}
        <div class="reader-end-links">
          ${essayLink(previous, 'previous', { series: isSeries })}
          ${essayLink(next, 'next', { series: isSeries })}
        </div>
        <a class="reader-top-link" href="#/">↑ TOPへ戻る</a>
      </nav>`;
    root.appendChild(nav);
  }

  window.MyEssaysReaderNavigation = Object.freeze({ render: renderReaderEndNavigation });

  function init() {
    if (window.MyEssaysReaderRuntime?.register) {
      window.MyEssaysReaderRuntime.register('navigation', renderReaderEndNavigation, { priority: 90 });
      return;
    }

    document.addEventListener('myessays:reader-rendered', () => {
      const id = location.hash.match(/^#\/essay\/(.+)$/)?.[1];
      const root = document.getElementById('readerContent');
      if (!id || !root) return;
      const decoded = decodeURIComponent(id);
      const essay = getAllEssays().find(item => item.id === decoded);
      if (essay) renderReaderEndNavigation({ root, essay });
    });
  }

  document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', init) : init();
})();
