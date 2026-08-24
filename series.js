(() => {
  'use strict';

  const SERIES_ROUTE = /^#\/series(?:\/(.+))?$/;
  const READING_PREFIX = 'myessays:reading-state:';
  const LEGACY_METADATA_URL = 'data/series-legacy.json';
  const ROOT_ID = 'seriesView';
  const TOOLBAR_BUTTON_ID = 'seriesLibraryButton';
  let legacyArticles = Object.create(null);
  let refreshQueued = false;

  function escapeHtml(value = '') {
    return String(value).replace(/[&<>'"]/g, char => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
    }[char]));
  }

  async function loadLegacyMetadata() {
    try {
      const response = await fetch(LEGACY_METADATA_URL, { cache: 'no-store' });
      if (!response.ok) return;
      const data = await response.json();
      if (data?.articles && typeof data.articles === 'object') legacyArticles = data.articles;
    } catch (error) {
      console.warn('[MyEssaysSeries] legacy metadata unavailable', error);
    }
  }

  function rawEssays() {
    try {
      return typeof state !== 'undefined' && Array.isArray(state.essays) ? state.essays : [];
    } catch {
      return [];
    }
  }

  function effectiveEssay(essay) {
    if (!essay?.id) return essay;
    const legacy = legacyArticles[essay.id];
    if (!legacy) return essay;
    // Explicit front matter always wins. The migration layer only fills old gaps.
    const merged = { ...legacy, ...essay };
    if (!String(essay.series || '').trim() && legacy.series) merged.series = legacy.series;
    if ((essay.seriesOrder === undefined || essay.seriesOrder === null || essay.seriesOrder === '') && legacy.seriesOrder !== undefined) {
      merged.seriesOrder = legacy.seriesOrder;
    }
    if (!String(essay.seriesId || '').trim() && legacy.seriesId) merged.seriesId = legacy.seriesId;
    return merged;
  }

  function allEssays() {
    return rawEssays().map(effectiveEssay);
  }

  function safeLocalGet(key) {
    try { return localStorage.getItem(key); }
    catch { return null; }
  }

  function readingState(id) {
    if (!id) return {};
    try {
      const parsed = JSON.parse(safeLocalGet(`${READING_PREFIX}${id}`) || '{}');
      return parsed && typeof parsed === 'object' ? parsed : {};
    } catch {
      return {};
    }
  }

  function readingStatus(id) {
    const reading = readingState(id);
    if (reading.completedAt) return 'completed';
    if (reading.openedAt) return 'opened';
    return 'unread';
  }

  function hashString(value = '') {
    let hash = 2166136261;
    for (const char of String(value)) {
      hash ^= char.codePointAt(0);
      hash = Math.imul(hash, 16777619);
    }
    return (hash >>> 0).toString(36).slice(0, 6);
  }

  function baseSeriesSlug(value = '') {
    return String(value)
      .normalize('NFKC')
      .toLocaleLowerCase()
      .trim()
      .replace(/[\s　]+/g, '-')
      .replace(/[^\p{L}\p{N}\-]/gu, '')
      .replace(/-{2,}/g, '-')
      .replace(/^-|-$/g, '') || 'series';
  }

  function compareSeriesItems(a, b) {
    const ao = Number(a.seriesOrder);
    const bo = Number(b.seriesOrder);
    const aValid = Number.isFinite(ao);
    const bValid = Number.isFinite(bo);
    if (aValid && bValid && ao !== bo) return ao - bo;
    if (aValid !== bValid) return aValid ? -1 : 1;
    const created = String(a.created || '').localeCompare(String(b.created || ''));
    if (created) return created;
    return String(a.title || '').localeCompare(String(b.title || ''), 'ja');
  }

  function buildSeries() {
    const groups = new Map();
    allEssays().forEach(essay => {
      const name = String(essay.series || '').trim();
      if (!name) return;
      if (!groups.has(name)) groups.set(name, []);
      groups.get(name).push(essay);
    });

    const candidates = [...groups.entries()]
      .map(([name, items]) => ({ name, items: [...items].sort(compareSeriesItems) }))
      .filter(series => series.items.length >= 2)
      .sort((a, b) => {
        const latestA = Math.max(...a.items.map(item => Date.parse(item.updated || item.created || 0) || 0));
        const latestB = Math.max(...b.items.map(item => Date.parse(item.updated || item.created || 0) || 0));
        return latestB - latestA || a.name.localeCompare(b.name, 'ja');
      });

    const used = new Map();
    return candidates.map(series => {
      const explicit = String(series.items.find(item => item.seriesId)?.seriesId || '').trim();
      let slug = explicit || baseSeriesSlug(series.name);
      if (used.has(slug) && used.get(slug) !== series.name) slug = `${slug}-${hashString(series.name)}`;
      used.set(slug, series.name);
      return { ...series, slug };
    });
  }

  function seriesForEssayId(id) {
    if (!id) return null;
    return buildSeries().find(series => series.items.some(item => item.id === id)) || null;
  }

  function statsFor(series) {
    const statuses = series.items.map(item => readingStatus(item.id));
    const completed = statuses.filter(status => status === 'completed').length;
    const opened = statuses.filter(status => status === 'opened').length;
    return {
      completed,
      opened,
      total: series.items.length,
      percent: series.items.length ? Math.round((completed / series.items.length) * 100) : 0
    };
  }

  function continueItem(series) {
    const active = series.items
      .map(item => ({ item, reading: readingState(item.id) }))
      .filter(entry => entry.reading.openedAt && !entry.reading.completedAt)
      .sort((a, b) => String(b.reading.openedAt).localeCompare(String(a.reading.openedAt)))[0];
    if (active) return { item: active.item, label: '続きから読む' };

    const unread = series.items.find(item => readingStatus(item.id) === 'unread');
    if (unread) return { item: unread, label: '次に読む' };

    const incomplete = series.items.find(item => readingStatus(item.id) !== 'completed');
    if (incomplete) return { item: incomplete, label: '続きを読む' };

    return series.items[0] ? { item: series.items[0], label: '最初から読み返す' } : null;
  }

  function shortText(value = '', length = 112) {
    const text = String(value).replace(/\s+/g, ' ').trim();
    return text.length > length ? `${text.slice(0, length)}…` : text;
  }

  function seriesUrl(series) {
    return `#/series/${encodeURIComponent(series.slug)}`;
  }

  function essayUrl(essay) {
    return `#/essay/${encodeURIComponent(essay.id)}`;
  }

  function ensureRoot() {
    let root = document.getElementById(ROOT_ID);
    if (root) return root;
    const main = document.querySelector('main');
    if (!main) return null;
    root = document.createElement('section');
    root.id = ROOT_ID;
    root.className = 'series-shell';
    root.hidden = true;
    const reader = document.getElementById('readerView');
    reader ? main.insertBefore(root, reader) : main.appendChild(root);
    return root;
  }

  function hideOtherViews() {
    const library = document.getElementById('libraryView');
    const reader = document.getElementById('readerView');
    if (library) library.hidden = true;
    if (reader) reader.hidden = true;
  }

  function hideSeriesView() {
    const root = document.getElementById(ROOT_ID);
    if (root) root.hidden = true;
  }

  function progressBar(stats) {
    return `
      <div class="series-progress" aria-label="${stats.completed}/${stats.total} 読了">
        <div class="series-progress-track"><span style="width:${stats.percent}%"></span></div>
        <span class="series-progress-label">${stats.completed} / ${stats.total} READ</span>
      </div>`;
  }

  function statusLabel(status) {
    if (status === 'completed') return '<span class="series-item-state is-completed" aria-label="読了">✓</span>';
    if (status === 'opened') return '<span class="series-item-state is-opened" aria-label="開いた">●</span>';
    return '<span class="series-item-state" aria-label="未読">○</span>';
  }

  function renderSeriesIndex(seriesList) {
    const root = ensureRoot();
    if (!root) return;
    hideOtherViews();
    root.hidden = false;
    document.title = 'Series — My Essays';

    const cards = seriesList.map(series => {
      const stats = statsFor(series);
      const next = continueItem(series);
      const latest = [...series.items].sort((a, b) => String(b.updated || b.created || '').localeCompare(String(a.updated || a.created || '')))[0];
      return `
        <article class="series-card">
          <a class="series-card-main" href="${seriesUrl(series)}">
            <div class="series-card-head">
              <span class="series-kicker">SERIES</span>
              <span class="series-count">${series.items.length} essays</span>
            </div>
            <h2>${escapeHtml(series.name)}</h2>
            <p>${escapeHtml(shortText(latest?.abstract || latest?.subtitle || ''))}</p>
            ${progressBar(stats)}
          </a>
          ${next ? `<a class="series-continue-link" href="${essayUrl(next.item)}"><span>${escapeHtml(next.label)}</span><strong>${escapeHtml(next.item.title || '')}</strong><span aria-hidden="true">→</span></a>` : ''}
        </article>`;
    }).join('');

    root.innerHTML = `
      <div class="series-page-head">
        <a class="series-back" href="#/">← Library</a>
        <p class="series-kicker">SERIES LIBRARY</p>
        <h1>まとまりから読む。</h1>
        <p class="series-lead">順番のある論考を、全体像と進み具合を見ながら追う。</p>
      </div>
      <div class="series-index-grid">${cards || '<p class="series-empty">2本以上の記事を持つシリーズはまだありません。</p>'}</div>`;
    window.scrollTo({ top: 0, behavior: 'auto' });
  }

  function displayOrder(item, index) {
    if (!Number.isFinite(Number(item.seriesOrder))) return String(index + 1).padStart(2, '0');
    return String(Number(item.seriesOrder)).padStart(2, '0');
  }

  function renderSeriesHub(series) {
    const root = ensureRoot();
    if (!root) return;
    hideOtherViews();
    root.hidden = false;
    document.title = `${series.name} — My Essays`;

    const stats = statsFor(series);
    const next = continueItem(series);
    const rows = series.items.map((item, index) => {
      const status = readingStatus(item.id);
      return `
        <a class="series-essay-row is-${status}" href="${essayUrl(item)}">
          <span class="series-essay-number">${displayOrder(item, index)}</span>
          <div class="series-essay-copy">
            <h2>${escapeHtml(item.title || '')}</h2>
            <p>${escapeHtml(shortText(item.abstract || item.subtitle || '', 132))}</p>
          </div>
          ${statusLabel(status)}
        </a>`;
    }).join('');

    root.innerHTML = `
      <div class="series-page-head series-hub-head">
        <div class="series-breadcrumbs"><a href="#/">Library</a><span>›</span><a href="#/series">Series</a></div>
        <p class="series-kicker">SERIES</p>
        <h1>${escapeHtml(series.name)}</h1>
        ${progressBar(stats)}
        ${next ? `
          <a class="series-primary-action" href="${essayUrl(next.item)}">
            <span>${escapeHtml(next.label)}</span>
            <strong>${escapeHtml(next.item.title || '')}</strong>
            <span aria-hidden="true">→</span>
          </a>` : ''}
      </div>
      <div class="series-list" aria-label="${escapeHtml(series.name)}の記事一覧">${rows}</div>`;
    window.scrollTo({ top: 0, behavior: 'auto' });
  }

  function currentRoute() {
    const match = location.hash.match(SERIES_ROUTE);
    if (!match) return null;
    let slug = '';
    if (match[1]) {
      try { slug = decodeURIComponent(match[1]); }
      catch { slug = match[1]; }
    }
    return { slug };
  }

  function renderRoute() {
    const route = currentRoute();
    if (!route) {
      hideSeriesView();
      return false;
    }

    const seriesList = buildSeries();
    updateLibraryEntry(seriesList);
    if (!route.slug) {
      renderSeriesIndex(seriesList);
      return true;
    }

    const series = seriesList.find(item => item.slug === route.slug);
    if (!series) {
      renderSeriesIndex(seriesList);
      return true;
    }
    renderSeriesHub(series);
    return true;
  }

  function ensureLibraryEntry() {
    const actions = document.querySelector('.library-toolbar .toolbar-actions');
    if (!actions) return null;
    let link = document.getElementById(TOOLBAR_BUTTON_ID);
    if (link) return link;
    link = document.createElement('a');
    link.id = TOOLBAR_BUTTON_ID;
    link.className = 'compact-button series-library-button';
    link.href = '#/series';
    link.innerHTML = '<span aria-hidden="true">≡</span><span>シリーズ</span><span class="series-library-count" aria-label="シリーズ数"></span>';
    actions.insertAdjacentElement('afterbegin', link);
    return link;
  }

  function updateLibraryEntry(seriesList = buildSeries()) {
    const link = ensureLibraryEntry();
    if (!link) return;
    const count = link.querySelector('.series-library-count');
    if (count) count.textContent = seriesList.length ? String(seriesList.length) : '';
    link.hidden = seriesList.length === 0;
  }

  function seriesNavLink(item, direction) {
    if (!item) return '<div class="reader-end-link reader-end-link--empty" aria-hidden="true"></div>';
    const previous = direction === 'previous';
    return `
      <a class="reader-end-link ${previous ? 'reader-end-link--previous' : 'reader-end-link--next'}" href="${essayUrl(item)}">
        <span class="reader-nav-label">${previous ? '← シリーズ前へ' : 'シリーズ次へ →'}</span>
        <strong>${escapeHtml(item.title || '')}</strong>
      </a>`;
  }

  function ensureLegacySequence(root, rawEssay, series, index) {
    if (String(rawEssay.series || '').trim()) return;
    const sequence = root.querySelector('.reader-sequence-navigation');
    if (!sequence) return;
    const links = sequence.querySelector('.reader-end-links');
    if (!links) return;

    sequence.setAttribute('aria-label', 'シリーズ前後の記事');
    links.innerHTML = `
      ${seriesNavLink(index > 0 ? series.items[index - 1] : null, 'previous')}
      ${seriesNavLink(index < series.items.length - 1 ? series.items[index + 1] : null, 'next')}`;

    if (!sequence.querySelector('.reader-series-sequence-meta')) {
      const meta = document.createElement('div');
      meta.className = 'reader-series-sequence-meta';
      meta.innerHTML = `<p class="reader-related-kicker">SERIES</p><p class="reader-related-note">${escapeHtml(series.name)} · ${index + 1}/${series.items.length}</p>`;
      links.insertAdjacentElement('beforebegin', meta);
    }
  }

  function renderReaderContext(context) {
    const { root, essay: rawEssay } = context || {};
    if (!root || !rawEssay) return;
    root.querySelector('.reader-series-context')?.remove();
    root.querySelector('.reader-series-hub-link')?.remove();

    const essay = effectiveEssay(rawEssay);
    const series = seriesForEssayId(essay.id);
    if (!series) return;
    const index = series.items.findIndex(item => item.id === essay.id);
    if (index < 0) return;

    const contextBar = document.createElement('aside');
    contextBar.className = 'reader-series-context';
    contextBar.setAttribute('aria-label', 'シリーズ情報');
    contextBar.innerHTML = `
      <div>
        <span class="reader-series-kicker">SERIES</span>
        <a href="${seriesUrl(series)}">${escapeHtml(series.name)}</a>
      </div>
      <span class="reader-series-position">${String(index + 1).padStart(2, '0')} / ${String(series.items.length).padStart(2, '0')}</span>`;

    const firstHeading = root.querySelector('h1');
    if (firstHeading) firstHeading.insertAdjacentElement('beforebegin', contextBar);
    else root.insertAdjacentElement('afterbegin', contextBar);

    ensureLegacySequence(root, rawEssay, series, index);

    const sequence = root.querySelector('.reader-sequence-navigation');
    if (sequence) {
      const hub = document.createElement('a');
      hub.className = 'reader-series-hub-link';
      hub.href = seriesUrl(series);
      hub.textContent = 'シリーズ全体を見る →';
      const top = sequence.querySelector('.reader-top-link');
      top ? top.insertAdjacentElement('beforebegin', hub) : sequence.appendChild(hub);
    }
  }

  function registerReaderPlugin() {
    const mount = context => renderReaderContext(context);
    if (window.MyEssaysReaderRuntime?.register) {
      window.MyEssaysReaderRuntime.register('series-context', mount, { priority: 96 });
      return;
    }
    document.addEventListener('myessays:reader-rendered', () => {
      const context = window.MyEssaysReaderRuntime?.getContext?.();
      if (context) mount(context);
    });
  }

  function scheduleRefresh() {
    if (refreshQueued) return;
    refreshQueued = true;
    requestAnimationFrame(() => {
      refreshQueued = false;
      const seriesList = buildSeries();
      updateLibraryEntry(seriesList);
      renderRoute();
    });
  }

  function observeLibrary() {
    const grid = document.getElementById('essayGrid');
    if (!grid || !('MutationObserver' in window)) return;
    const observer = new MutationObserver(() => scheduleRefresh());
    observer.observe(grid, { childList: true, subtree: true });
  }

  async function init() {
    ensureRoot();
    ensureLibraryEntry();
    registerReaderPlugin();
    observeLibrary();
    await loadLegacyMetadata();
    scheduleRefresh();
    window.addEventListener('hashchange', () => requestAnimationFrame(renderRoute));
    window.addEventListener('pageshow', () => scheduleRefresh());
    window.addEventListener('storage', event => {
      if (String(event.key || '').startsWith(READING_PREFIX)) scheduleRefresh();
    });
  }

  window.MyEssaysSeries = Object.freeze({
    getAll: buildSeries,
    getForEssay: seriesForEssayId,
    renderRoute,
    slugFor: name => buildSeries().find(series => series.name === name)?.slug || baseSeriesSlug(name)
  });

  document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', init, { once: true })
    : init();
})();