(() => {
  const navSelector = '.reader-end-navigation';

  function escapeNavigationHtml(value = '') {
    return String(value).replace(/[&<>'"]/g, char => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[char]));
  }

  function getCurrentEssayId() {
    const match = location.hash.match(/^#\/essay\/(.+)$/);
    if (!match) return '';
    try { return decodeURIComponent(match[1]); }
    catch { return match[1]; }
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
    if (typeof state !== 'undefined' && Array.isArray(state.essays)) return state.essays;
    return [];
  }

  function formatNavigationDate(value = '') {
    if (!value) return '';
    const [year, month, day] = String(value).split('-');
    return [year, month, day].filter(Boolean).join('.');
  }

  function essayLink(essay, direction) {
    if (!essay) {
      return `<div class="reader-end-link reader-end-link--empty" aria-hidden="true"></div>`;
    }

    const isPrevious = direction === 'previous';
    const label = isPrevious ? '← 前の記事' : '次の記事 →';
    const directionClass = isPrevious ? 'reader-end-link--previous' : 'reader-end-link--next';

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
      .map(essay => {
        const sharedTags = [...new Set((essay.tags || []).filter(tag => currentTags.has(tag)))];
        return { essay, sharedTags };
      })
      .filter(item => item.sharedTags.length > 0)
      .sort((a, b) => {
        const sharedTagDiff = b.sharedTags.length - a.sharedTags.length;
        if (sharedTagDiff) return sharedTagDiff;
        const createdDiff = String(b.essay.created || '').localeCompare(String(a.essay.created || ''));
        if (createdDiff) return createdDiff;
        return String(a.essay.title || '').localeCompare(String(b.essay.title || ''), 'ja');
      })
      .slice(0, 4);
  }

  function relatedCard(item, index) {
    const { essay, sharedTags } = item;
    const type = essay.type || 'Essay';
    const date = formatNavigationDate(essay.created);
    const meta = [type, date].filter(Boolean).join(' · ');
    const tags = sharedTags
      .map(tag => `<span class="reader-related-tag">#${escapeNavigationHtml(tag)}</span>`)
      .join('');

    return `
      <a class="reader-related-item" href="#/essay/${encodeURIComponent(essay.id)}">
        <div class="reader-related-item-top">
          <span class="reader-related-number">0${index + 1}</span>
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
        <div class="reader-related-grid">
          ${items.map(relatedCard).join('')}
        </div>
      </section>`;
  }

  function renderReaderEndNavigation() {
    const readerView = document.getElementById('readerView');
    const readerContent = document.getElementById('readerContent');
    if (!readerView || !readerContent || readerView.hidden) return;

    const currentId = getCurrentEssayId();
    const essays = getVisibleEssayOrder();
    const allEssays = getAllEssays();
    const currentEssay = allEssays.find(essay => essay.id === currentId);
    const currentIndex = essays.findIndex(essay => essay.id === currentId);
    const existing = readerContent.querySelector(navSelector);

    if (!currentId || currentIndex === -1 || !currentEssay) {
      existing?.remove();
      return;
    }

    if (existing?.dataset.essayId === currentId) return;
    existing?.remove();

    const previous = currentIndex > 0 ? essays[currentIndex - 1] : null;
    const next = currentIndex < essays.length - 1 ? essays[currentIndex + 1] : null;
    const nav = document.createElement('div');
    nav.className = 'reader-end-navigation';
    nav.dataset.essayId = currentId;
    nav.innerHTML = `
      ${relatedSection(currentEssay)}
      <nav class="reader-sequence-navigation" aria-label="前後の記事">
        <div class="reader-end-links">
          ${essayLink(previous, 'previous')}
          ${essayLink(next, 'next')}
        </div>
        <a class="reader-top-link" href="#/">↑ TOPへ戻る</a>
      </nav>`;

    readerContent.appendChild(nav);
  }

  const readerContent = document.getElementById('readerContent');
  if (readerContent) {
    const observer = new MutationObserver(() => {
      if (!readerContent.querySelector(navSelector)) {
        requestAnimationFrame(renderReaderEndNavigation);
      }
    });
    observer.observe(readerContent, { childList: true });
  }

  window.addEventListener('hashchange', () => requestAnimationFrame(renderReaderEndNavigation));
  window.addEventListener('load', () => requestAnimationFrame(renderReaderEndNavigation));
})();
