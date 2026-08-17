(() => {
  'use strict';

  const essayGrid = document.getElementById('essayGrid');
  if (!essayGrid) return;

  function essayHref(id = '') {
    return `#/essay/${encodeURIComponent(id)}`;
  }

  function upgradeCard(card) {
    if (!card?.dataset?.id || card.matches('a[href]')) return card;

    const link = document.createElement('a');
    [...card.attributes].forEach(attribute => {
      if (attribute.name === 'role' || attribute.name === 'tabindex') return;
      link.setAttribute(attribute.name, attribute.value);
    });
    link.href = essayHref(card.dataset.id);
    link.innerHTML = card.innerHTML;

    // app.js also listens for card clicks/keyboard events and rewrites location.hash.
    // Stop only propagation so the anchor's native browser behavior remains intact:
    // Ctrl/Cmd click, middle click, context menu, copy link address, etc.
    link.addEventListener('click', event => event.stopPropagation());
    link.addEventListener('keydown', event => event.stopPropagation());

    card.replaceWith(link);
    return link;
  }

  function upgradeEssayLinks() {
    essayGrid.querySelectorAll('[data-id]').forEach(upgradeCard);
  }

  const observer = new MutationObserver(() => upgradeEssayLinks());
  observer.observe(essayGrid, { childList: true, subtree: true });

  upgradeEssayLinks();
})();
