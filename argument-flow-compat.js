(() => {
  'use strict';

  function separatorText(br) {
    const previous = br.previousElementSibling;
    const next = br.nextElementSibling;
    const previousText = previous?.textContent?.trim() || '';
    const nextText = next?.textContent?.trim() || '';
    const previousLast = previousText.slice(-1);
    const nextFirst = nextText.slice(0, 1);
    const latinBoundary = /[A-Za-z0-9.!?;:)]/.test(previousLast) || /[A-Za-z0-9(]/.test(nextFirst);
    return latinBoundary ? ' ' : '';
  }

  function normalizeStructuredParagraphFlow() {
    const content = document.getElementById('readerContent');
    if (!content) return;
    content.querySelectorAll('br.argument-sentence-break').forEach(br => {
      br.replaceWith(document.createTextNode(separatorText(br)));
    });
  }

  document.addEventListener('myessays:reader-rendered', normalizeStructuredParagraphFlow);
  document.addEventListener('myessays:reader-version-changed', () => requestAnimationFrame(normalizeStructuredParagraphFlow));

  window.MyEssaysArgumentFlowCompat = {
    normalize: normalizeStructuredParagraphFlow
  };
})();
