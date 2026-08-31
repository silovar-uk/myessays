(() => {
  'use strict';

  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    const sheet = document.getElementById('argumentStructureSheet');
    if (!sheet?.classList.contains('is-open')) return;

    event.preventDefault();
    event.stopImmediatePropagation();

    const closeButton = sheet.querySelector('.argument-sheet-close');
    if (closeButton) closeButton.click();
    else {
      sheet.classList.remove('is-open');
      sheet.setAttribute('aria-hidden', 'true');
    }

    document.getElementById('argumentStructureLauncher')?.focus();
  });
})();
