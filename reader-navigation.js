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

  function renderReaderEndNavigation() {
    const readerView = document.getElementById('readerView');
    const readerContent = document.getElementById('readerContent');
    if (!readerView || !readerContent || readerView.hidden) return;

    const currentId = getCurrentEssayId();
    const essays = getVisibleEssayOrder();
    const currentIndex = essays.findIndex(essay => essay.id === currentId);
    const existing = readerContent.querySelector(navSelector);

    if (!currentId || currentIndex === -1) {
      existing?.remove();
      return;
    }

    if (existing?.dataset.essayId === currentId) return;
    existing?.remove();

    const previous = currentIndex > 0 ? essays[currentIndex - 1] : null;
    const next = currentIndex < essays.length - 1 ? essays[currentIndex + 1] : null;
    const nav = document.createElement('nav');
    nav.className = 'reader-end-navigation';
    nav.dataset.essayId = currentId;
    nav.setAttribute('aria-label', '前後の記事');
    nav.innerHTML = `
      <div class="reader-end-links">
        ${essayLink(previous, 'previous')}
        ${essayLink(next, 'next')}
      </div>
      <a class="reader-top-link" href="#/">↑ TOPへ戻る</a>`;

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
