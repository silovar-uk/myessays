(() => {
  'use strict';

  if (window.MyEssaysReaderV2?.installed) return;

  const READING_PREFIX = 'myessays:reading-state:';
  const ANCHOR_PREFIX = 'myessays:reader-note-anchors:v1:';
  const READING_LINE_RATIO = 0.28;
  const PERSIST_DELAY_MS = 900;
  const INITIAL_PERSIST_GRACE_MS = 1800;
  const MOBILE_BREAKPOINT = 820;

  let persistTimer = 0;
  let scrollFrame = 0;
  let initialPersistUntil = 0;
  let pendingVersionLocator = '';
  let lastLocationSignature = '';
  let currentRouteEssayId = '';

  const $ = id => document.getElementById(id);

  function currentEssayId() {
    const match = location.hash.match(/^#\/essay\/(.+)$/);
    if (!match) return '';
    try { return decodeURIComponent(match[1]); }
    catch { return match[1]; }
  }

  function currentEssay() {
    const id = currentEssayId();
    if (!id) return null;
    try {
      if (typeof state !== 'undefined' && state.currentEssay?.id === id) return state.currentEssay;
      return typeof state !== 'undefined' && Array.isArray(state.essays)
        ? state.essays.find(essay => essay.id === id) || null
        : null;
    } catch {
      return null;
    }
  }

  function readerOpen() {
    const view = $('readerView');
    return Boolean(currentEssayId() && view && !view.hidden);
  }

  function safeRead(key, fallback = null) {
    try {
      const raw = localStorage.getItem(key);
      return raw == null ? fallback : JSON.parse(raw);
    } catch {
      return fallback;
    }
  }

  function safeWrite(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch {
      return false;
    }
  }

  function readingState(id = currentEssayId()) {
    if (!id) return {};
    const value = safeRead(`${READING_PREFIX}${id}`, {});
    return value && typeof value === 'object' ? value : {};
  }

  function mergeReadingState(id, patch) {
    if (!id) return false;
    return safeWrite(`${READING_PREFIX}${id}`, { ...readingState(id), ...patch });
  }

  function noteAnchors(id = currentEssayId()) {
    if (!id) return [];
    const value = safeRead(`${ANCHOR_PREFIX}${id}`, []);
    return Array.isArray(value) ? value.filter(item => item && typeof item === 'object') : [];
  }

  function writeNoteAnchors(id, entries) {
    if (!id) return false;
    return safeWrite(`${ANCHOR_PREFIX}${id}`, entries);
  }

  function formatDate(value = '') {
    if (!value) return '';
    const [year, month, day] = String(value).split('-');
    return [year, month, day].filter(Boolean).join('.');
  }

  function escapeHtml(value = '') {
    return String(value).replace(/[&<>'"]/g, char => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
    }[char]));
  }

  function cssEscape(value = '') {
    if (window.CSS?.escape) return CSS.escape(String(value));
    return String(value).replace(/(["\\#.;?+*~':!^$\[\]()=>|/@])/g, '\\$1');
  }

  function readerContent() {
    return $('readerContent');
  }

  function sectionHeadings() {
    const content = readerContent();
    if (!content) return [];
    return [...content.querySelectorAll('h2')].filter(heading => !heading.classList.contains('reader-v2-subtitle'));
  }

  function readingBlocks() {
    const content = readerContent();
    if (!content) return [];
    return [...content.querySelectorAll('.reader-locator-block[data-reading-locator]')];
  }

  function readingY() {
    const header = document.querySelector('.reader-v2-header');
    const minimum = header?.getBoundingClientRect().height ? header.getBoundingClientRect().height + 24 : 0;
    return Math.max(window.innerHeight * READING_LINE_RATIO, minimum);
  }

  function nearestBlock() {
    const blocks = readingBlocks();
    if (!blocks.length) return null;
    const targetY = readingY();
    let best = blocks[0];
    let bestDistance = Infinity;
    blocks.forEach(block => {
      const rect = block.getBoundingClientRect();
      const point = Math.min(rect.bottom, Math.max(rect.top, targetY));
      const distance = Math.abs(targetY - point);
      if (distance < bestDistance) {
        best = block;
        bestDistance = distance;
      }
    });
    return best;
  }

  function sectionForBlock(block) {
    const headings = sectionHeadings();
    if (!headings.length) return { index: -1, id: '', title: '' };
    const targetY = block?.getBoundingClientRect().top ?? readingY();
    let active = -1;
    headings.forEach((heading, index) => {
      if (heading.getBoundingClientRect().top <= targetY + 4) active = index;
    });
    if (active < 0) return { index: -1, id: '', title: 'Introduction' };
    const heading = headings[active];
    return {
      index: active,
      id: heading.id || '',
      title: heading.textContent?.trim() || `Section ${active + 1}`
    };
  }

  function progressRatio() {
    const content = readerContent();
    if (!content) return 0;
    const rect = content.getBoundingClientRect();
    const pageTop = rect.top + window.scrollY;
    const pageBottom = pageTop + rect.height;
    const point = window.scrollY + readingY();
    return Math.min(1, Math.max(0, (point - pageTop) / Math.max(1, pageBottom - pageTop)));
  }

  function currentLocation() {
    const block = nearestBlock();
    const section = sectionForBlock(block);
    return {
      essayId: currentEssayId(),
      locator: block?.dataset.readingLocator || '',
      block,
      sectionIndex: section.index,
      sectionId: section.id,
      sectionTitle: section.title,
      progressRatio: progressRatio()
    };
  }

  function scrollOffset() {
    const header = document.querySelector('.reader-v2-header');
    return (header?.getBoundingClientRect().height || 0) + 22;
  }

  function scrollElementIntoReadingPosition(element, behavior = 'smooth') {
    if (!element) return false;
    const top = element.getBoundingClientRect().top + window.scrollY - scrollOffset();
    window.scrollTo({ top: Math.max(0, top), behavior });
    return true;
  }

  function scrollToLocator(locator, options = {}) {
    if (!locator) return false;
    const content = readerContent();
    if (!content) return false;
    let target = content.querySelector(`[data-reading-locator="${cssEscape(locator)}"]`);
    if (!target) {
      const sectionPrefix = String(locator).split('-')[0];
      const candidates = [...content.querySelectorAll('[data-reading-locator]')]
        .filter(element => String(element.dataset.readingLocator || '').startsWith(`${sectionPrefix}-`));
      if (candidates.length) {
        const wanted = Number(String(locator).split('-')[1]) || 1;
        target = candidates.reduce((best, candidate) => {
          const number = Number(String(candidate.dataset.readingLocator || '').split('-')[1]) || 1;
          const bestNumber = Number(String(best.dataset.readingLocator || '').split('-')[1]) || 1;
          return Math.abs(number - wanted) < Math.abs(bestNumber - wanted) ? candidate : best;
        }, candidates[0]);
      }
    }
    if (!target) return false;
    const ok = scrollElementIntoReadingPosition(target, options.behavior || 'smooth');
    if (ok) {
      target.classList.remove('reader-v2-location-flash');
      void target.offsetWidth;
      target.classList.add('reader-v2-location-flash');
      window.setTimeout(() => target.classList.remove('reader-v2-location-flash'), 1350);
    }
    return ok;
  }

  function scrollToSection(index, options = {}) {
    const target = sectionHeadings()[Number(index)];
    return scrollElementIntoReadingPosition(target, options.behavior || 'smooth');
  }

  function locationApi() {
    return {
      current: currentLocation,
      currentSection: () => {
        const location = currentLocation();
        return {
          index: location.sectionIndex,
          id: location.sectionId,
          title: location.sectionTitle
        };
      },
      scrollToLocator,
      scrollToSection,
      refresh: scheduleLocationSync
    };
  }

  function ensureBackdrop() {
    let backdrop = document.querySelector('.reader-v2-map-backdrop');
    if (backdrop) return backdrop;
    backdrop = document.createElement('button');
    backdrop.type = 'button';
    backdrop.className = 'reader-v2-map-backdrop';
    backdrop.setAttribute('aria-label', '目次を閉じる');
    backdrop.hidden = true;
    backdrop.addEventListener('click', () => setMapOpen(false));
    document.body.append(backdrop);
    return backdrop;
  }

  function ensureHeader() {
    const view = $('readerView');
    if (!view) return null;
    let header = view.querySelector('.reader-v2-header');
    if (!header) {
      header = document.createElement('header');
      header.className = 'reader-v2-header';
      header.innerHTML = `
        <div class="reader-v2-header-inner">
          <div class="reader-v2-header-left"></div>
          <div class="reader-v2-current" aria-live="polite">
            <span class="reader-v2-current-kicker">NOW READING</span>
            <strong class="reader-v2-current-title">Introduction</strong>
          </div>
          <div class="reader-v2-header-actions">
            <button class="reader-v2-map-toggle" type="button" aria-expanded="false" aria-controls="readerAside">
              <span aria-hidden="true">☷</span><span class="reader-v2-action-label">目次</span>
            </button>
          </div>
        </div>
        <div class="reader-v2-header-progress" aria-hidden="true"><span></span></div>`;
      view.prepend(header);
      header.querySelector('.reader-v2-map-toggle')?.addEventListener('click', () => {
        const aside = $('readerAside');
        setMapOpen(!aside?.classList.contains('is-open'));
      });
    }

    const left = header.querySelector('.reader-v2-header-left');
    const actions = header.querySelector('.reader-v2-header-actions');
    const back = $('backButton');
    if (back && left && back.parentElement !== left) left.append(back);
    const note = $('noteTab');
    if (note && actions && note.parentElement !== actions) actions.prepend(note);
    moveLanguageSwitchIntoHeader(header);
    return header;
  }

  function moveLanguageSwitchIntoHeader(header = document.querySelector('.reader-v2-header')) {
    const switcher = $('readerLanguageSwitch');
    const actions = header?.querySelector('.reader-v2-header-actions');
    if (!switcher || !actions) return;
    if (switcher.parentElement !== actions) actions.prepend(switcher);
    switcher.classList.add('reader-v2-language-switch');
  }

  function setMapOpen(open) {
    const aside = $('readerAside');
    const toggle = document.querySelector('.reader-v2-map-toggle');
    const backdrop = ensureBackdrop();
    const mobile = window.innerWidth <= MOBILE_BREAKPOINT;
    const next = Boolean(open && readerOpen());
    aside?.classList.toggle('is-open', next);
    toggle?.setAttribute('aria-expanded', String(next));
    aside?.setAttribute('aria-hidden', String(mobile && !next));
    backdrop.hidden = !(mobile && next);
    document.body.classList.toggle('reader-v2-map-open', mobile && next);
  }

  function markSubtitle() {
    const content = readerContent();
    const essay = currentEssay();
    if (!content || !essay) return;
    content.querySelectorAll('.reader-v2-subtitle').forEach(element => element.classList.remove('reader-v2-subtitle'));
    const h1 = content.querySelector('h1');
    const candidate = h1?.nextElementSibling;
    if (candidate?.tagName === 'H2') {
      const candidateText = candidate.textContent?.trim() || '';
      const expected = String(essay.subtitle || '').trim();
      if (!expected || candidateText === expected) candidate.classList.add('reader-v2-subtitle');
    }
  }

  function ensureArticleIntro() {
    const content = readerContent();
    const essay = currentEssay();
    if (!content || !essay) return null;
    markSubtitle();

    let intro = content.querySelector('.reader-v2-intro');
    if (!intro) {
      intro = document.createElement('section');
      intro.className = 'reader-v2-intro';
      intro.setAttribute('aria-label', '記事情報');
      const h1 = content.querySelector('h1');
      const subtitle = content.querySelector('h2.reader-v2-subtitle');
      const stats = content.querySelector('.reading-stats');
      const anchor = h1 || stats || content.firstElementChild;
      if (anchor) anchor.insertAdjacentElement('beforebegin', intro);
      if (h1) intro.append(h1);
      if (subtitle) intro.append(subtitle);
      stats?.remove();
    }

    let meta = intro.querySelector('.reader-v2-intro-meta');
    if (!meta) {
      meta = document.createElement('div');
      meta.className = 'reader-v2-intro-meta';
      intro.append(meta);
    }
    meta.innerHTML = [
      formatDate(essay.created),
      essay.metrics?.minutes ? `約${essay.metrics.minutes}分` : '',
      essay.type || ''
    ].filter(Boolean).map(value => `<span>${escapeHtml(value)}</span>`).join('<i aria-hidden="true">·</i>');

    let details = intro.querySelector('.reader-v2-article-info');
    if (!details) {
      details = document.createElement('details');
      details.className = 'reader-v2-article-info';
      details.innerHTML = '<summary>この記事について</summary><div class="reader-v2-article-info-body"></div>';
      intro.append(details);
    }
    const body = details.querySelector('.reader-v2-article-info-body');
    if (body) {
      const tags = (essay.tags || []).map(tag => `<span>#${escapeHtml(tag)}</span>`).join('');
      body.innerHTML = `
        <dl>
          <div><dt>Created</dt><dd>${escapeHtml(formatDate(essay.created))}</dd></div>
          <div><dt>Updated</dt><dd>${escapeHtml(formatDate(essay.updated))}</dd></div>
          <div><dt>Length</dt><dd>${Number(essay.metrics?.charCount || 0).toLocaleString('ja-JP')}文字</dd></div>
          <div><dt>Favorite</dt><dd>${escapeHtml(String(essay.favorite || 0))}/5</dd></div>
          <div><dt>Grow</dt><dd>${escapeHtml(String(essay.grow || 0))}/5</dd></div>
        </dl>
        <div class="reader-v2-info-tags">${tags}</div>
        <div class="reader-v2-info-actions"></div>`;
    }
    relocateCopyButton();
    return intro;
  }

  function relocateCopyButton() {
    const content = readerContent();
    if (!content) return;
    const copy = content.querySelector('.reader-copy-button');
    const target = content.querySelector('.reader-v2-info-actions');
    if (copy && target && copy.parentElement !== target) target.append(copy);
  }

  function ensureResumePrompt(previousState) {
    const content = readerContent();
    const essay = currentEssay();
    const intro = content?.querySelector('.reader-v2-intro');
    if (!content || !essay || !intro) return;
    content.querySelector('.reader-v2-resume')?.remove();

    const stateValue = previousState || readingState(essay.id);
    const nearTop = Number(stateValue.lastProgressRatio || 0) < 0.08;
    if (!stateValue.lastLocator || stateValue.completedAt || nearTop) return;

    const prompt = document.createElement('aside');
    prompt.className = 'reader-v2-resume';
    prompt.innerHTML = `
      <div>
        <span>CONTINUE</span>
        <p>前回は「${escapeHtml(stateValue.lastSectionTitle || '本文')}」の途中まで読みました。</p>
      </div>
      <button type="button">続きから読む <span aria-hidden="true">→</span></button>`;
    prompt.querySelector('button')?.addEventListener('click', () => {
      if (scrollToLocator(stateValue.lastLocator, { behavior: 'smooth' })) prompt.remove();
    });
    intro.insertAdjacentElement('afterend', prompt);
  }

  function mapHost() {
    const aside = $('readerAside');
    if (!aside) return null;
    const existingContents = aside.querySelector('#argumentContentsPanel');
    if (existingContents) return existingContents;
    return aside;
  }

  function buildReaderMap() {
    const aside = $('readerAside');
    if (!aside) return;
    aside.classList.add('reader-v2-map');
    aside.setAttribute('aria-label', 'Reader Map');

    const hasArgumentUi = Boolean(aside.querySelector('.argument-aside-tabs') && aside.querySelector('#argumentContentsPanel'));
    if (!hasArgumentUi) aside.innerHTML = '';
    else aside.querySelector('.meta-block')?.remove();

    const host = mapHost();
    if (!host) return;
    host.querySelector('.reader-v2-map-body')?.remove();
    host.querySelector('nav')?.remove();

    const wrapper = document.createElement('div');
    wrapper.className = 'reader-v2-map-body';
    wrapper.innerHTML = `
      <div class="reader-v2-map-head">
        <div><span>READER MAP</span><strong>Contents</strong></div>
        <button class="reader-v2-map-close" type="button" aria-label="目次を閉じる">×</button>
      </div>
      <nav class="reader-v2-map-nav" aria-label="目次"></nav>
      <div class="reader-v2-map-summary">
        <div><span class="reader-v2-map-percent">0%</span><small>READ</small></div>
        <div><span class="reader-v2-map-last">—</span><small>前回</small></div>
        <div><span class="reader-v2-map-notes">0</span><small>メモ</small></div>
      </div>`;
    host.prepend(wrapper);

    wrapper.querySelector('.reader-v2-map-close')?.addEventListener('click', () => setMapOpen(false));
    renderReaderMapItems();
  }

  function renderReaderMapItems() {
    const nav = document.querySelector('.reader-v2-map-nav');
    if (!nav) return;
    const stored = readingState();
    const anchors = noteAnchors();
    const headings = sectionHeadings();
    nav.innerHTML = headings.map((heading, index) => {
      const sectionHasNote = anchors.some(anchor => Number(anchor.sectionIndex) === index || (anchor.sectionId && anchor.sectionId === heading.id));
      const wasLast = stored.lastSectionId
        ? stored.lastSectionId === heading.id
        : Number(stored.lastSection) === index;
      return `
        <button type="button" class="reader-v2-map-item" data-reader-map-section="${index}">
          <span class="reader-v2-map-number">${String(index + 1).padStart(2, '0')}</span>
          <span class="reader-v2-map-label">${escapeHtml(heading.textContent?.trim() || '')}</span>
          <span class="reader-v2-map-markers" aria-hidden="true">${sectionHasNote ? '<i class="reader-v2-note-marker">✎</i>' : ''}${wasLast ? '<i class="reader-v2-last-marker">│</i>' : ''}<i class="reader-v2-current-marker">●</i><i class="reader-v2-passed-marker">✓</i></span>
        </button>`;
    }).join('');
    nav.querySelectorAll('[data-reader-map-section]').forEach(button => {
      button.addEventListener('click', () => {
        scrollToSection(Number(button.dataset.readerMapSection), { behavior: 'smooth' });
        if (window.innerWidth <= MOBILE_BREAKPOINT) setMapOpen(false);
      });
    });
    updateMapSummary(stored, anchors);
  }

  function updateMapSummary(stored = readingState(), anchors = noteAnchors()) {
    const percent = document.querySelector('.reader-v2-map-percent');
    const last = document.querySelector('.reader-v2-map-last');
    const notes = document.querySelector('.reader-v2-map-notes');
    if (percent) percent.textContent = `${Math.round(progressRatio() * 100)}%`;
    if (last) last.textContent = stored.lastSectionTitle || (stored.lastLocator ? stored.lastLocator : '—');
    if (notes) notes.textContent = String(anchors.length);
  }

  function updateReaderMap(location) {
    const items = [...document.querySelectorAll('.reader-v2-map-item')];
    items.forEach((item, index) => {
      const current = index === location.sectionIndex;
      const passed = location.sectionIndex >= 0 && index < location.sectionIndex;
      item.classList.toggle('is-current', current);
      item.classList.toggle('is-passed', passed);
      item.setAttribute('aria-current', current ? 'location' : 'false');
    });
    const percent = document.querySelector('.reader-v2-map-percent');
    if (percent) percent.textContent = `${Math.round(location.progressRatio * 100)}%`;
  }

  function updateHeader(location) {
    const header = ensureHeader();
    if (!header) return;
    const title = header.querySelector('.reader-v2-current-title');
    const progress = header.querySelector('.reader-v2-header-progress span');
    if (title) title.textContent = location.sectionTitle || 'Introduction';
    if (progress) progress.style.transform = `scaleX(${Math.min(1, Math.max(0, location.progressRatio))})`;
  }

  function persistLocation(location) {
    if (!location.essayId || !location.locator || Date.now() < initialPersistUntil) return;
    mergeReadingState(location.essayId, {
      lastLocator: location.locator,
      lastSection: location.sectionIndex,
      lastSectionId: location.sectionId,
      lastSectionTitle: location.sectionTitle,
      lastProgressRatio: location.progressRatio,
      lastSeenAt: new Date().toISOString()
    });
  }

  function queuePersist(location) {
    window.clearTimeout(persistTimer);
    persistTimer = window.setTimeout(() => persistLocation(location), PERSIST_DELAY_MS);
  }

  function dispatchLocation(location) {
    const signature = [location.essayId, location.locator, location.sectionIndex, Math.round(location.progressRatio * 100)].join(':');
    if (signature === lastLocationSignature) return;
    lastLocationSignature = signature;
    document.dispatchEvent(new CustomEvent('myessays:reading-location-changed', {
      detail: {
        essayId: location.essayId,
        locator: location.locator,
        sectionIndex: location.sectionIndex,
        sectionId: location.sectionId,
        sectionTitle: location.sectionTitle,
        progressRatio: location.progressRatio
      }
    }));
  }

  function syncLocation() {
    scrollFrame = 0;
    if (!readerOpen()) return;
    const location = currentLocation();
    updateHeader(location);
    updateReaderMap(location);
    dispatchLocation(location);
    queuePersist(location);
  }

  function scheduleLocationSync() {
    if (scrollFrame) return;
    scrollFrame = requestAnimationFrame(syncLocation);
  }

  function storeNoteAnchor(text) {
    const clean = String(text || '').trim();
    const id = currentEssayId();
    if (!clean || !id) return;
    const location = currentLocation();
    if (!location.locator) return;
    const entries = noteAnchors(id);
    const duplicate = entries.some(entry => entry.locator === location.locator && entry.selectedText === clean);
    if (!duplicate) {
      entries.push({
        id: globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        locator: location.locator,
        sectionIndex: location.sectionIndex,
        sectionId: location.sectionId,
        sectionTitle: location.sectionTitle,
        selectedText: clean,
        createdAt: new Date().toISOString()
      });
      writeNoteAnchors(id, entries);
      renderReaderMapItems();
    }
  }

  function ensureAfterReading() {
    const content = readerContent();
    if (!content) return;
    let zone = content.querySelector('.reader-v2-after-reading');
    if (!zone) {
      zone = document.createElement('section');
      zone.className = 'reader-v2-after-reading';
      zone.setAttribute('aria-label', 'After Reading');
      zone.innerHTML = '<div class="reader-v2-after-heading"><span>AFTER READING</span><strong>読み終えたあと</strong></div>';
      content.append(zone);
    }
    ['.reading-completion-zone', '.reader-reflections', '.reader-end-navigation'].forEach(selector => {
      const element = content.querySelector(`:scope > ${selector}`);
      if (element && element.parentElement !== zone) zone.append(element);
    });
  }

  function syncBodyState() {
    const open = readerOpen();
    document.body.classList.toggle('reader-v2-open', open);
    if (!open) setMapOpen(false);
  }

  function syncReaderV2({ allowResume = false } = {}) {
    syncBodyState();
    if (!readerOpen()) return;

    const id = currentEssayId();
    const previousState = readingState(id);
    if (id !== currentRouteEssayId) {
      currentRouteEssayId = id;
      initialPersistUntil = Date.now() + INITIAL_PERSIST_GRACE_MS;
      lastLocationSignature = '';
    }

    ensureHeader();
    ensureArticleIntro();
    buildReaderMap();
    if (allowResume && !pendingVersionLocator) ensureResumePrompt(previousState);
    ensureAfterReading();
    moveLanguageSwitchIntoHeader();
    relocateCopyButton();
    scheduleLocationSync();

    window.setTimeout(() => {
      if (!readerOpen() || currentEssayId() !== id) return;
      moveLanguageSwitchIntoHeader();
      relocateCopyButton();
      ensureAfterReading();
      renderReaderMapItems();
      scheduleLocationSync();
    }, 120);
  }

  function flushLocation() {
    window.clearTimeout(persistTimer);
    if (!readerOpen()) return;
    persistLocation(currentLocation());
  }

  function captureVersionLocator(event) {
    const option = event.target instanceof Element ? event.target.closest('[data-reader-version]') : null;
    if (!option || !readerOpen()) return;
    pendingVersionLocator = currentLocation().locator || '';
  }

  function restoreVersionLocator() {
    const locator = pendingVersionLocator;
    pendingVersionLocator = '';
    if (!locator) return;
    requestAnimationFrame(() => requestAnimationFrame(() => {
      scrollToLocator(locator, { behavior: 'auto' });
      scheduleLocationSync();
    }));
  }

  function onReaderRendered() {
    requestAnimationFrame(() => {
      const allowResume = !pendingVersionLocator;
      syncReaderV2({ allowResume });
    });
  }

  function onHashChange() {
    flushLocation();
    window.setTimeout(() => {
      syncBodyState();
      if (readerOpen()) syncReaderV2({ allowResume: true });
      else currentRouteEssayId = '';
    }, 0);
  }

  function init() {
    window.MyEssaysReadingLocation = Object.freeze(locationApi());
    window.MyEssaysReaderV2 = Object.freeze({
      installed: true,
      sync: syncReaderV2,
      setMapOpen,
      noteAnchors
    });

    ensureBackdrop();
    syncBodyState();

    document.addEventListener('myessays:reader-rendered', onReaderRendered);
    document.addEventListener('myessays:reader-ready', onReaderRendered);
    document.addEventListener('myessays:reader-version-changed', () => {
      requestAnimationFrame(() => syncReaderV2({ allowResume: false }));
      restoreVersionLocator();
    });
    document.addEventListener('myessays:reader-language-changed', scheduleLocationSync);
    document.addEventListener('click', captureVersionLocator, true);

    const content = readerContent();
    content?.addEventListener('myessays:add-note-quote', event => {
      storeNoteAnchor(event.detail?.text);
    }, true);

    window.addEventListener('scroll', scheduleLocationSync, { passive: true });
    window.addEventListener('resize', () => {
      if (window.innerWidth > MOBILE_BREAKPOINT) setMapOpen(false);
      scheduleLocationSync();
    });
    window.addEventListener('hashchange', onHashChange);
    window.addEventListener('pagehide', flushLocation);
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) flushLocation();
      else scheduleLocationSync();
    });
    window.addEventListener('keydown', event => {
      const editing = ['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName) || document.activeElement?.isContentEditable;
      if (event.key === 'Escape' && !editing && $('readerAside')?.classList.contains('is-open')) {
        event.preventDefault();
        event.stopImmediatePropagation();
        setMapOpen(false);
      }
    }, true);

    if (readerOpen()) syncReaderV2({ allowResume: true });
  }

  document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', init, { once: true })
    : init();
})();
