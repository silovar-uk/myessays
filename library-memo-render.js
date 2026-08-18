(() => {
  'use strict';

  const NOTE_PREFIX = 'myessays:reading-note:';

  const memoFor = (id) => {
    if (!id) return '';
    try { return (localStorage.getItem(`${NOTE_PREFIX}${id}`) || '').trim(); }
    catch { return ''; }
  };

  const previewFor = (id) => {
    const memo = memoFor(id).replace(/\s+/g, ' ').trim();
    if (!memo) return '';
    return memo.length > 78 ? `${memo.slice(0, 78)}…` : memo;
  };

  const escapeText = (value = '') => String(value).replace(/[&<>'"]/g, char => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
  }[char]));

  if (typeof renderFeaturedCard === 'function') {
    const originalFeaturedCard = renderFeaturedCard;
    renderFeaturedCard = function renderFeaturedCardWithMemo(essay) {
      let html = originalFeaturedCard(essay);
      const memo = previewFor(essay?.id);
      if (!memo) return html;

      html = html.replace('class="featured-card"', 'class="featured-card has-reading-note" data-has-reading-note="true"');
      html = html.replace(
        '<div class="featured-footer">',
        `<p class="reading-memo-preview" aria-label="読書メモ">✎ ${escapeText(memo)}</p>\n      <div class="featured-footer">`
      );
      return html;
    };
  }

  if (typeof renderArchiveRow === 'function') {
    const originalArchiveRow = renderArchiveRow;
    renderArchiveRow = function renderArchiveRowWithMemo(essay) {
      let html = originalArchiveRow(essay);
      const memo = previewFor(essay?.id);
      if (!memo) return html;

      html = html.replace('class="archive-row"', 'class="archive-row has-reading-note" data-has-reading-note="true"');
      html = html.replace(
        /(<div class="mini-tags">[\s\S]*?<\/div>)(\s*<\/div>\s*<div class="archive-side">)/,
        `$1\n        <p class="reading-memo-preview" aria-label="読書メモ">✎ ${escapeText(memo)}</p>$2`
      );
      return html;
    };
  }

  function isLibraryRoute() {
    return !/^#\/essay\//.test(location.hash || '');
  }

  function refreshLibraryFromStorage() {
    if (!isLibraryRoute()) return;
    if (typeof renderLibrary !== 'function') return;
    try {
      if (typeof state !== 'undefined' && Array.isArray(state.essays) && state.essays.length) {
        renderLibrary();
      }
    } catch {}
  }

  // The Library DOM stays mounted while reading an essay. Re-render it after
  // returning so memo previews are rebuilt from the latest localStorage values.
  window.addEventListener('hashchange', () => requestAnimationFrame(refreshLibraryFromStorage));
  window.addEventListener('pageshow', () => requestAnimationFrame(refreshLibraryFromStorage));
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) requestAnimationFrame(refreshLibraryFromStorage);
  });
})();
