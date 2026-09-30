(() => {
  'use strict';

  const navSelector = '.reader-end-navigation';
  const nextSelector = '.reader-next-step';

  function escapeNavigationHtml(value = '') {
    return String(value).replace(/[&<>'"]/g, char => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
    }[char]));
  }

  function getAllEssays() {
    try {
      return typeof state !== 'undefined' && Array.isArray(state.essays) ? state.essays : [];
    } catch {
      return [];
    }
  }

  function getCurrentEssay() {
    try {
      if (typeof state !== 'undefined' && state.currentEssay?.id) return state.currentEssay;
    } catch {}
    const id = window.MyEssaysRoute?.parse?.().articleId || '';
    if (!id) return null;
    return getAllEssays().find(essay => essay.id === id) || null;
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

  function readingStatus(id) {
    try {
      return window.MyEssaysReadingState?.status?.(id) || 'unread';
    } catch {
      return 'unread';
    }
  }

  function relatedCandidates(currentEssay) {
    const currentTags = new Set((currentEssay?.tags || []).filter(Boolean));
    if (!currentTags.size) return [];

    return getAllEssays()
      .filter(essay => essay.id !== currentEssay.id)
      .map(essay => ({
        essay,
        status: readingStatus(essay.id),
        sharedTags: [...new Set((essay.tags || []).filter(tag => currentTags.has(tag)))]
      }))
      .filter(item => item.sharedTags.length > 0)
      .sort((a, b) => {
        const shared = b.sharedTags.length - a.sharedTags.length;
        if (shared) return shared;
        const created = String(b.essay.created || '').localeCompare(String(a.essay.created || ''));
        if (created) return created;
        return String(a.essay.title || '').localeCompare(String(b.essay.title || ''), 'ja');
      });
  }

  function primaryNext(currentEssay, seriesSequence, related) {
    if (seriesSequence?.next) {
      return {
        essay: seriesSequence.next,
        kind: 'series',
        reason: 'シリーズ次回',
        sharedTags: []
      };
    }

    const unread = related.find(item => item.status === 'unread');
    if (unread) return { ...unread, kind: 'related', reason: relatedReason(unread.sharedTags) };

    const opened = related.find(item => item.status === 'opened');
    if (opened) return { ...opened, kind: 'related', reason: relatedReason(opened.sharedTags) };

    const fallback = related[0];
    return fallback ? { ...fallback, kind: 'related', reason: relatedReason(fallback.sharedTags) } : null;
  }

  function relatedReason(tags) {
    const visible = (tags || []).slice(0, 2);
    return visible.length ? `${visible.map(tag => `#${tag}`).join(' ')} が共通` : '関連する記事';
  }

  function primaryNextSection(item) {
    if (!item?.essay) return null;
    const essay = item.essay;
    const section = document.createElement('section');
    section.className = 'reader-next-step';
    section.setAttribute('aria-labelledby', 'readerNextStepTitle');
    section.innerHTML = `
      <p class="reader-next-step-kicker">NEXT</p>
      <a class="reader-next-step-link" href="#/essay/${encodeURIComponent(essay.id)}">
        <span class="reader-next-step-copy">
          <span class="reader-next-step-label" id="readerNextStepTitle">次に読む</span>
          <strong>${escapeNavigationHtml(essay.title || '')}</strong>
          <small>${escapeNavigationHtml(item.reason || '')}</small>
        </span>
        <span class="reader-next-step-arrow" aria-hidden="true">→</span>
      </a>`;
    return section;
  }

  function seriesLink(essay, direction) {
    if (!essay) return '<div class="reader-end-link reader-end-link--empty" aria-hidden="true"></div>';
    const previous = direction === 'previous';
    return `
      <a class="reader-end-link ${previous ? 'reader-end-link--previous' : 'reader-end-link--next'}" href="#/essay/${encodeURIComponent(essay.id)}">
        <span class="reader-nav-label">${previous ? '← シリーズ前へ' : 'シリーズ次へ →'}</span>
        <strong>${escapeNavigationHtml(essay.title)}</strong>
      </a>`;
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

  function relatedSection(items) {
    if (!items.length) return '';
    return `
      <section class="reader-related" aria-labelledby="readerRelatedTitle">
        <div class="reader-related-heading">
          <div>
            <p class="reader-related-kicker">RELATED</p>
            <h2 id="readerRelatedTitle">ほかの関連記事</h2>
          </div>
          <p class="reader-related-note">同じ関心から、もう少し読む。</p>
        </div>
        <div class="reader-related-grid">${items.map(relatedCard).join('')}</div>
      </section>`;
  }

  function renderReaderEndNavigation(context) {
    const root = context?.root || document.getElementById('readerContent');
    const currentEssay = context?.essay || getCurrentEssay();
    if (!root || !currentEssay) return;

    root.querySelector(nextSelector)?.remove();
    root.querySelector(navSelector)?.remove();

    const routeType = window.MyEssaysRoute?.parse?.().type || 'essay';
    if (routeType === 'book' || currentEssay.__aozoraBook) return;

    const seriesSequence = getSeriesSequence(currentEssay);
    const related = relatedCandidates(currentEssay);
    const primary = primaryNext(currentEssay, seriesSequence, related);
    const relatedSecondary = related
      .filter(item => item.essay.id !== primary?.essay?.id)
      .slice(0, 3);

    const host = root.querySelector(':scope > .reader-v2-after-reading') || root;
    if (primary) {
      const nextStep = primaryNextSection(primary);
      if (nextStep) host.appendChild(nextStep);
    }

    let seriesNavigation = '';
    if (seriesSequence) {
      seriesNavigation = `
        <div class="reader-series-navigation">
          <p class="reader-related-kicker">SERIES</p>
          <p class="reader-related-note reader-series-note">
            ${escapeNavigationHtml(currentEssay.series)} · ${seriesSequence.index + 1}/${seriesSequence.items.length}
          </p>
          <div class="reader-end-links">
            ${seriesLink(seriesSequence.previous, 'previous')}
            ${seriesLink(seriesSequence.next, 'next')}
          </div>
        </div>`;
    }

    const nav = document.createElement('div');
    nav.className = 'reader-end-navigation';
    nav.dataset.essayId = currentEssay.id;
    nav.innerHTML = `
      ${relatedSection(relatedSecondary)}
      <nav class="reader-sequence-navigation" aria-label="${seriesSequence ? 'シリーズとLibraryへの移動' : 'Libraryへの移動'}">
        ${seriesNavigation}
        <a class="reader-top-link" href="#/" aria-label="Libraryへ戻る">← Libraryへ戻る</a>
      </nav>`;
    host.appendChild(nav);
  }

  window.MyEssaysReaderNavigation = Object.freeze({
    render: renderReaderEndNavigation,
    lib: { getSeriesSequence, relatedCandidates, primaryNext, relatedReason }
  });

  function init() {
    if (window.MyEssaysReaderRuntime?.register) {
      window.MyEssaysReaderRuntime.register('navigation', renderReaderEndNavigation, { priority: 90 });
      return;
    }

    document.addEventListener('myessays:reader-rendered', () => {
      const id = window.MyEssaysRoute?.parse?.().articleId || '';
      const root = document.getElementById('readerContent');
      if (!id || !root) return;
      const essay = getAllEssays().find(item => item.id === id);
      if (essay) renderReaderEndNavigation({ root, essay });
    });
  }

  document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', init) : init();
})();
