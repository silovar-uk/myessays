(() => {
  'use strict';

  const SELECTOR = '.reader-content .essay-figure img';
  let focus = null;
  let lastTrigger = null;

  function classify(image) {
    const figure = image.closest('.essay-figure');
    if (!figure || !image.naturalWidth || !image.naturalHeight) return;
    figure.classList.remove('media-portrait', 'media-square', 'media-landscape', 'media-wide');
    const ratio = image.naturalWidth / image.naturalHeight;
    const kind = ratio < .8 ? 'portrait' : ratio <= 1.2 ? 'square' : ratio > 1.8 ? 'wide' : 'landscape';
    figure.classList.add(`media-${kind}`);
    figure.dataset.mediaRatio = ratio.toFixed(3);
    image.setAttribute('tabindex', '0');
    image.setAttribute('role', 'button');
    image.setAttribute('aria-label', `${image.alt || '画像'}を拡大表示`);
  }

  function scan(root = document) {
    root.querySelectorAll(SELECTOR).forEach(image => {
      if (image.complete) classify(image);
      else image.addEventListener('load', () => classify(image), { once: true });
    });
  }

  function ensureFocus() {
    if (focus) return focus;
    focus = document.createElement('div');
    focus.className = 'media-focus';
    focus.setAttribute('role', 'dialog');
    focus.setAttribute('aria-modal', 'true');
    focus.setAttribute('aria-label', '画像の拡大表示');
    focus.innerHTML = `
      <div class="media-focus-head">
        <div class="media-focus-label"></div>
        <button class="media-focus-close" type="button" aria-label="拡大表示を閉じる">×</button>
      </div>
      <div class="media-focus-stage"></div>
      <div class="media-focus-caption"></div>`;
    document.body.appendChild(focus);
    focus.querySelector('.media-focus-close').addEventListener('click', closeFocus);
    focus.querySelector('.media-focus-stage').addEventListener('click', event => {
      if (event.target === event.currentTarget || event.target.tagName === 'IMG') closeFocus();
    });
    focus.addEventListener('click', event => {
      if (event.target === focus) closeFocus();
    });
    return focus;
  }

  function openFocus(image) {
    const overlay = ensureFocus();
    const stage = overlay.querySelector('.media-focus-stage');
    const label = overlay.querySelector('.media-focus-label');
    const caption = overlay.querySelector('.media-focus-caption');
    const clone = image.cloneNode(false);
    clone.removeAttribute('loading');
    clone.removeAttribute('tabindex');
    clone.removeAttribute('role');
    clone.removeAttribute('aria-label');
    stage.replaceChildren(clone);
    const figure = image.closest('.essay-figure');
    const captionText = figure?.querySelector('figcaption')?.textContent?.trim() || '';
    label.textContent = image.alt || 'Image';
    caption.textContent = captionText;
    caption.hidden = !captionText;
    lastTrigger = image;
    document.body.classList.add('media-focus-open');
    overlay.classList.add('is-open');
    overlay.querySelector('.media-focus-close').focus({ preventScroll: true });
  }

  function closeFocus() {
    if (!focus?.classList.contains('is-open')) return;
    focus.classList.remove('is-open');
    document.body.classList.remove('media-focus-open');
    lastTrigger?.focus?.({ preventScroll: true });
    lastTrigger = null;
  }

  document.addEventListener('click', event => {
    const image = event.target.closest?.(SELECTOR);
    if (!image) return;
    event.preventDefault();
    openFocus(image);
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && focus?.classList.contains('is-open')) {
      event.preventDefault();
      closeFocus();
      return;
    }
    if ((event.key === 'Enter' || event.key === ' ') && event.target.matches?.(SELECTOR)) {
      event.preventDefault();
      openFocus(event.target);
    }
  });

  const reader = document.getElementById('readerContent');
  if (reader) {
    const observer = new MutationObserver(() => scan(reader));
    observer.observe(reader, { childList: true, subtree: true });
    scan(reader);
  } else {
    document.addEventListener('DOMContentLoaded', () => scan(document));
  }

  window.MyEssaysMedia = { scan, classify, openFocus, closeFocus };
})();
