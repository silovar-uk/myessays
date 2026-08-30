(() => {
  'use strict';

  const INDEX_URL = 'data/versions-index.json';
  const VERSION_DEFINITIONS = {
    'en-mix': { label: 'English Mix', badge: 'EN MIX' },
    'es-mix': { label: 'Español Mix', badge: 'ES MIX' }
  };

  const filters = document.querySelector('#filterPanel .filters');
  if (!filters || document.getElementById('readingVersionFilter')) return;

  filters.insertAdjacentHTML('beforeend', `
    <label class="reading-version-filter-label">読める版
      <select id="readingVersionFilter" aria-label="派生版で絞り込む" disabled>
        <option value="">すべて</option>
      </select>
    </label>`);

  const versionFilter = document.getElementById('readingVersionFilter');
  const originalFilteredEssays = filteredEssays;
  const originalActiveFilterCount = activeFilterCount;
  const originalRenderFeaturedCard = renderFeaturedCard;
  const originalRenderArchiveRow = renderArchiveRow;

  state.readingVersions = {};

  const articleVersions = essay => state.readingVersions[String(essay?.id || '')] || {};
  const hasVersion = (essay, version) => Boolean(articleVersions(essay)[version]);
  const availableVersionKeys = essay => Object.keys(articleVersions(essay)).filter(key => VERSION_DEFINITIONS[key]);
  const versionBadges = essay => availableVersionKeys(essay).map(key => {
    const definition = VERSION_DEFINITIONS[key];
    return `<span class="reading-version-badge" aria-label="${definition.label}版あり" title="${definition.label}版あり">${definition.badge}</span>`;
  }).join('');

  filteredEssays = function filteredEssaysWithReadingVersions() {
    const rows = originalFilteredEssays();
    const version = versionFilter.value;
    return version ? rows.filter(essay => hasVersion(essay, version)) : rows;
  };

  activeFilterCount = function activeFilterCountWithReadingVersions() {
    return originalActiveFilterCount() + Number(Boolean(versionFilter.value));
  };

  renderFeaturedCard = function renderFeaturedCardWithReadingVersions(essay) {
    const badges = versionBadges(essay);
    const html = originalRenderFeaturedCard(essay);
    if (!badges) return html;
    const type = escapeHtml(essay.type || 'Essay');
    const date = formatDate(essay.created);
    const target = `<div class="featured-meta"><span>${type}</span><span>${date}</span></div>`;
    const replacement = `<div class="featured-meta"><div class="featured-meta-left"><span>${type}</span><span class="reading-version-badges">${badges}</span></div><span>${date}</span></div>`;
    return html.replace(target, replacement);
  };

  renderArchiveRow = function renderArchiveRowWithReadingVersions(essay) {
    const badges = versionBadges(essay);
    const html = originalRenderArchiveRow(essay);
    if (!badges) return html;
    const type = escapeHtml(essay.type || 'Essay');
    const target = `<span class="archive-type">${type}</span>`;
    const replacement = `<div class="archive-meta-line"><span class="archive-type">${type}</span><span class="reading-version-badges">${badges}</span></div>`;
    return html.replace(target, replacement);
  };

  versionFilter.addEventListener('change', renderLibrary);
  els.clearFilters.addEventListener('click', () => {
    if (!versionFilter.value) return;
    versionFilter.value = '';
    renderLibrary();
  });

  fetch(INDEX_URL, { cache: 'no-store' })
    .then(response => {
      if (!response.ok) throw new Error(`versions-index.json: ${response.status}`);
      return response.json();
    })
    .then(data => {
      state.readingVersions = data?.articles && typeof data.articles === 'object' ? data.articles : {};
      versionFilter.insertAdjacentHTML('beforeend', Object.entries(VERSION_DEFINITIONS)
        .map(([key, definition]) => `<option value="${key}">${definition.label}</option>`)
        .join(''));
      versionFilter.disabled = false;
      versionFilter.removeAttribute('title');
      renderLibrary();
    })
    .catch(error => {
      console.warn('Reading versions index could not be loaded. Library remains available without version badges.', error);
      state.readingVersions = {};
      versionFilter.value = '';
      versionFilter.disabled = true;
      versionFilter.title = '派生版情報を読み込めませんでした';
      renderLibrary();
    });
})();
