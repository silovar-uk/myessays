(() => {
  const filters = document.querySelector('#filterPanel .filters');
  if (!filters || document.getElementById('englishMixFilter')) return;

  filters.insertAdjacentHTML('beforeend', `
    <label class="english-mix-filter-label">English Mix
      <select id="englishMixFilter" aria-label="English Mix版で絞り込む" disabled>
        <option value="">すべて</option>
        <option value="yes">あり</option>
        <option value="no">なし</option>
      </select>
    </label>`);

  const mixFilter = document.getElementById('englishMixFilter');
  const originalFilteredEssays = filteredEssays;
  const originalActiveFilterCount = activeFilterCount;
  const originalRenderFeaturedCard = renderFeaturedCard;
  const originalRenderArchiveRow = renderArchiveRow;

  state.mixIds = new Set();
  state.mixMap = {};

  const hasEnglishMix = (essay) => state.mixIds.has(String(essay?.id || ''));
  const mixBadge = () => '<span class="english-mix-badge" aria-label="English Mix版あり" title="English Mix版あり">EN MIX</span>';

  filteredEssays = function filteredEssaysWithEnglishMix() {
    const rows = originalFilteredEssays();
    const mode = mixFilter.value;
    if (!mode) return rows;
    return rows.filter(essay => mode === 'yes' ? hasEnglishMix(essay) : !hasEnglishMix(essay));
  };

  activeFilterCount = function activeFilterCountWithEnglishMix() {
    return originalActiveFilterCount() + Number(Boolean(mixFilter.value));
  };

  renderFeaturedCard = function renderFeaturedCardWithEnglishMix(essay) {
    const html = originalRenderFeaturedCard(essay);
    if (!hasEnglishMix(essay)) return html;

    const type = escapeHtml(essay.type || 'Essay');
    const date = formatDate(essay.created);
    const target = `<div class="featured-meta"><span>${type}</span><span>${date}</span></div>`;
    const replacement = `<div class="featured-meta"><div class="featured-meta-left"><span>${type}</span>${mixBadge()}</div><span>${date}</span></div>`;
    return html.replace(target, replacement);
  };

  renderArchiveRow = function renderArchiveRowWithEnglishMix(essay) {
    const html = originalRenderArchiveRow(essay);
    if (!hasEnglishMix(essay)) return html;

    const type = escapeHtml(essay.type || 'Essay');
    const target = `<span class="archive-type">${type}</span>`;
    const replacement = `<div class="archive-meta-line"><span class="archive-type">${type}</span>${mixBadge()}</div>`;
    return html.replace(target, replacement);
  };

  mixFilter.addEventListener('change', renderLibrary);
  els.clearFilters.addEventListener('click', () => {
    if (!mixFilter.value) return;
    mixFilter.value = '';
    renderLibrary();
  });

  fetch('data/mix-index.json', { cache: 'no-store' })
    .then(response => {
      if (!response.ok) throw new Error(`mix-index.json: ${response.status}`);
      return response.json();
    })
    .then(data => {
      const mixes = data?.mixes && typeof data.mixes === 'object' ? data.mixes : {};
      state.mixMap = mixes;
      state.mixIds = new Set(Object.keys(mixes));
      mixFilter.disabled = false;
      mixFilter.removeAttribute('title');
      renderLibrary();
    })
    .catch(error => {
      console.warn('English Mix index could not be loaded. Library remains available without Mix badges.', error);
      state.mixMap = {};
      state.mixIds = new Set();
      mixFilter.value = '';
      mixFilter.disabled = true;
      mixFilter.title = 'English Mix情報を読み込めませんでした';
      renderLibrary();
    });
})();
