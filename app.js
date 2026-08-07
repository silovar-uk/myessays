const state = { essays: [], tags: new Set(), activeTags: new Set() };

const $ = (id) => document.getElementById(id);
const els = {
  libraryView: $('libraryView'), readerView: $('readerView'), essayGrid: $('essayGrid'),
  searchInput: $('searchInput'), searchControl: $('searchControl'), searchToggle: $('searchToggle'),
  typeFilter: $('typeFilter'), yearFilter: $('yearFilter'), favoriteFilter: $('favoriteFilter'),
  sortSelect: $('sortSelect'), tagFilters: $('tagFilters'), resultCount: $('resultCount'),
  emptyState: $('emptyState'), clearFilters: $('clearFilters'), filterToggle: $('filterToggle'),
  filterCount: $('filterCount'), filterPanel: $('filterPanel'), readerContent: $('readerContent'),
  readerAside: $('readerAside'), backButton: $('backButton'), guideDialog: $('guideDialog'),
  openGuide: $('openGuide')
};

function parseFrontMatter(text) {
  const match = text.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!match) return { meta: {}, body: text };
  const meta = {};
  for (const line of match[1].split('\n')) {
    const idx = line.indexOf(':');
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    const raw = line.slice(idx + 1).trim();
    try { meta[key] = JSON.parse(raw); }
    catch { meta[key] = raw.replace(/^['"]|['"]$/g, ''); }
  }
  return { meta, body: text.slice(match[0].length) };
}

function escapeHtml(value='') {
  return String(value).replace(/[&<>'"]/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
}

function inlineMarkdown(text='') {
  let out = escapeHtml(text);
  const links = [];
  out = out.replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, (_, label, url) => {
    const token = `@@LINK${links.length}@@`;
    links.push(`<a href="${url}" target="_blank" rel="noopener">${label}</a>`);
    return token;
  });
  out = out.replace(/(https?:\/\/[^\s<]+)/g, '<a href="$1" target="_blank" rel="noopener">$1</a>');
  out = out.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  out = out.replace(/\*(.+?)\*/g, '<em>$1</em>');
  out = out.replace(/`([^`]+)`/g, '<code>$1</code>');
  links.forEach((link, i) => { out = out.replace(`@@LINK${i}@@`, link); });
  return out;
}

function slugifyHeading(text) {
  return text.toLowerCase().replace(/[\s　]+/g,'-').replace(/[^\p{L}\p{N}\-]/gu,'').slice(0,80) || 'section';
}

function renderMarkdown(md) {
  const lines = md.replace(/\r/g,'').split('\n');
  const html = [];
  let paragraph = [], list = null, blockquote = [];
  const flushParagraph = () => { if (paragraph.length) { html.push(`<p>${inlineMarkdown(paragraph.join(' '))}</p>`); paragraph = []; } };
  const flushList = () => { if (list) { html.push(`<${list.type}>${list.items.map(x=>`<li>${inlineMarkdown(x)}</li>`).join('')}</${list.type}>`); list = null; } };
  const flushQuote = () => { if (blockquote.length) { html.push(`<blockquote><p>${inlineMarkdown(blockquote.join(' '))}</p></blockquote>`); blockquote = []; } };
  const flush = () => { flushParagraph(); flushList(); flushQuote(); };

  for (const raw of lines) {
    const line = raw.trimEnd();
    if (!line.trim()) { flush(); continue; }
    if (/^---+$/.test(line.trim())) { flush(); html.push('<hr>'); continue; }
    const h = line.match(/^(#{1,4})\s+(.+)$/);
    if (h) {
      flush();
      const level = h[1].length;
      const text = h[2].trim();
      html.push(`<h${level} id="${slugifyHeading(text)}">${inlineMarkdown(text)}</h${level}>`);
      continue;
    }
    if (line.startsWith('> ')) { flushParagraph(); flushList(); blockquote.push(line.slice(2)); continue; }
    const ul = line.match(/^[-*]\s+(.+)$/);
    const ol = line.match(/^\d+\.\s+(.+)$/);
    if (ul || ol) {
      flushParagraph(); flushQuote();
      const type = ul ? 'ul' : 'ol';
      if (!list || list.type !== type) { flushList(); list = { type, items: [] }; }
      list.items.push((ul || ol)[1]);
      continue;
    }
    paragraph.push(line.trim());
  }
  flush();
  return html.join('\n');
}

function normalizeEssay(path, text) {
  const { meta, body } = parseFrontMatter(text);
  const plain = body.replace(/[#>*_`\[\]()]/g,' ').replace(/https?:\/\/\S+/g,' ');
  return { ...meta, path, body, searchText: [meta.title, meta.subtitle, meta.abstract, ...(meta.tags||[]), ...(meta.keywords||[]), plain].join(' ').toLowerCase() };
}

async function loadEssays() {
  const index = await fetch('data/index.json', { cache: 'no-store' }).then(r => {
    if (!r.ok) throw new Error('index.jsonを読み込めませんでした');
    return r.json();
  });
  state.essays = await Promise.all(index.essays.map(async path => {
    const text = await fetch(path, { cache:'no-store' }).then(r => {
      if (!r.ok) throw new Error(`${path}を読み込めませんでした`);
      return r.text();
    });
    return normalizeEssay(path, text);
  }));
  state.tags = new Set(state.essays.flatMap(e => e.tags || []));
  populateFilters();
  renderLibrary();
  route();
}

function populateFilters() {
  const types = [...new Set(state.essays.map(e=>e.type).filter(Boolean))].sort();
  const years = [...new Set(state.essays.map(e=>String(e.created||'').slice(0,4)).filter(Boolean))].sort().reverse();
  types.forEach(v => els.typeFilter.insertAdjacentHTML('beforeend', `<option value="${escapeHtml(v)}">${escapeHtml(v)}</option>`));
  years.forEach(v => els.yearFilter.insertAdjacentHTML('beforeend', `<option value="${escapeHtml(v)}">${escapeHtml(v)}</option>`));
  els.tagFilters.innerHTML = [...state.tags].sort((a,b)=>a.localeCompare(b,'ja')).map(tag => `<button class="tag-chip" data-tag="${escapeHtml(tag)}" type="button">#${escapeHtml(tag)}</button>`).join('');
  els.tagFilters.addEventListener('click', e => {
    const btn = e.target.closest('[data-tag]'); if (!btn) return;
    const tag = btn.dataset.tag;
    state.activeTags.has(tag) ? state.activeTags.delete(tag) : state.activeTags.add(tag);
    btn.classList.toggle('is-active');
    renderLibrary();
  });
}

function stars(n=0) { return '★'.repeat(Number(n)||0) + '☆'.repeat(Math.max(0,5-(Number(n)||0))); }
function formatDate(d='') { if (!d) return ''; const [y,m,day] = d.split('-'); return `${y}.${m}.${day}`; }

function filteredEssays() {
  const q = els.searchInput.value.trim().toLowerCase();
  const type = els.typeFilter.value, year = els.yearFilter.value, minFav = Number(els.favoriteFilter.value || 0);
  let rows = state.essays.filter(e => {
    if (q && !e.searchText.includes(q)) return false;
    if (type && e.type !== type) return false;
    if (year && !String(e.created||'').startsWith(year)) return false;
    if ((Number(e.favorite)||0) < minFav) return false;
    if ([...state.activeTags].some(tag => !(e.tags||[]).includes(tag))) return false;
    return true;
  });
  const sort = els.sortSelect.value;
  rows.sort((a,b) => {
    if (sort === 'title-asc') return String(a.title).localeCompare(String(b.title),'ja');
    if (sort === 'favorite-desc') return (Number(b.favorite)||0)-(Number(a.favorite)||0) || String(b.created).localeCompare(String(a.created));
    if (sort === 'updated-desc') return String(b.updated||'').localeCompare(String(a.updated||''));
    return String(b.created||'').localeCompare(String(a.created||''));
  });
  return rows;
}

function activeFilterCount() {
  return Number(Boolean(els.typeFilter.value)) + Number(Boolean(els.yearFilter.value)) + Number(Number(els.favoriteFilter.value) > 0) + state.activeTags.size;
}

function syncToolbarState() {
  const hasSearch = Boolean(els.searchInput.value.trim());
  const count = activeFilterCount();
  els.searchToggle.classList.toggle('is-active', hasSearch && !els.searchControl.classList.contains('is-open'));
  els.filterToggle.classList.toggle('is-active', count > 0);
  els.filterCount.hidden = count === 0;
  els.filterCount.textContent = count || '';
  els.clearFilters.hidden = !hasSearch && count === 0;
}

function renderLibrary() {
  const rows = filteredEssays();
  els.resultCount.textContent = `${rows.length} / ${state.essays.length} essays`;
  els.emptyState.hidden = rows.length > 0;
  els.essayGrid.innerHTML = rows.map(e => `
    <article class="essay-card" data-id="${escapeHtml(e.id)}" tabindex="0" role="link" aria-label="${escapeHtml(e.title)}を読む">
      <div class="card-top"><span class="type-badge">${escapeHtml(e.type || 'Essay')}</span><span>${formatDate(e.created)}</span></div>
      <div>
        <h2>${escapeHtml(e.title)}</h2>
        <p class="card-abstract">${escapeHtml(e.abstract || '')}</p>
      </div>
      <div class="card-footer"><span class="stars" title="お気に入り ${e.favorite || 0}/5">${stars(e.favorite)}</span></div>
    </article>`).join('');
  syncToolbarState();
}

function setSearchOpen(open) {
  els.searchControl.classList.toggle('is-open', open);
  els.searchToggle.setAttribute('aria-expanded', String(open));
  els.searchInput.tabIndex = open ? 0 : -1;
  if (open) {
    els.filterPanel.hidden = true;
    els.filterToggle.setAttribute('aria-expanded', 'false');
    requestAnimationFrame(() => els.searchInput.focus());
  }
  syncToolbarState();
}

function setFilterOpen(open) {
  els.filterPanel.hidden = !open;
  els.filterToggle.setAttribute('aria-expanded', String(open));
  if (open) setSearchOpen(false);
}

function closeToolPanels() {
  setSearchOpen(false);
  els.filterPanel.hidden = true;
  els.filterToggle.setAttribute('aria-expanded', 'false');
}

function openSearch() {
  showLibrary();
  setSearchOpen(true);
}

function openEssay(id) { location.hash = `#/essay/${encodeURIComponent(id)}`; }

function showReader(essay) {
  closeToolPanels();
  els.libraryView.hidden = true;
  els.readerView.hidden = false;
  els.readerContent.innerHTML = renderMarkdown(essay.body);
  const headings = [...els.readerContent.querySelectorAll('h2')];
  els.readerAside.innerHTML = `
    <dl class="meta-block">
      <dt>Type</dt><dd>${escapeHtml(essay.type || '')}</dd>
      <dt>Created</dt><dd>${formatDate(essay.created)}</dd>
      <dt>Updated</dt><dd>${formatDate(essay.updated)}</dd>
      <dt>Favorite</dt><dd class="stars">${stars(essay.favorite)}</dd>
      <dt>Grow</dt><dd>${essay.grow || 0}/5</dd>
      <dt>Tags</dt><dd>${(essay.tags||[]).map(t=>`#${escapeHtml(t)}`).join(' ')}</dd>
    </dl>
    <nav aria-label="目次">${headings.map(h=>`<a href="#${h.id}" data-anchor="${h.id}">${h.textContent}</a>`).join('')}</nav>`;
  els.readerAside.querySelectorAll('[data-anchor]').forEach(a => a.addEventListener('click', ev => {
    ev.preventDefault(); document.getElementById(a.dataset.anchor)?.scrollIntoView({behavior:'smooth', block:'start'});
  }));
  document.title = `${essay.title} | My Essays`;
  window.scrollTo(0,0);
}

function showLibrary() {
  els.readerView.hidden = true;
  els.libraryView.hidden = false;
  document.title = 'My Essays';
}

function route() {
  const match = location.hash.match(/^#\/essay\/(.+)$/);
  if (!match) { showLibrary(); return; }
  const essay = state.essays.find(e => e.id === decodeURIComponent(match[1]));
  essay ? showReader(essay) : showLibrary();
}

['input','change'].forEach(eventName => {
  els.searchInput.addEventListener(eventName, renderLibrary);
  els.typeFilter.addEventListener(eventName, renderLibrary);
  els.yearFilter.addEventListener(eventName, renderLibrary);
  els.favoriteFilter.addEventListener(eventName, renderLibrary);
  els.sortSelect.addEventListener(eventName, renderLibrary);
});

els.searchToggle.addEventListener('click', () => setSearchOpen(!els.searchControl.classList.contains('is-open')));
els.filterToggle.addEventListener('click', () => setFilterOpen(els.filterPanel.hidden));
els.essayGrid.addEventListener('click', e => { const card=e.target.closest('[data-id]'); if(card) openEssay(card.dataset.id); });
els.essayGrid.addEventListener('keydown', e => { const card=e.target.closest('[data-id]'); if(card && (e.key==='Enter'||e.key===' ')){ e.preventDefault(); openEssay(card.dataset.id); }});
els.backButton.addEventListener('click', () => { location.hash = '#/'; });
els.clearFilters.addEventListener('click', () => {
  els.searchInput.value=''; els.typeFilter.value=''; els.yearFilter.value=''; els.favoriteFilter.value='0'; els.sortSelect.value='created-desc';
  state.activeTags.clear(); document.querySelectorAll('.tag-chip').forEach(b=>b.classList.remove('is-active'));
  closeToolPanels(); renderLibrary();
});
els.openGuide.addEventListener('click', () => els.guideDialog.showModal());
window.addEventListener('hashchange', route);
window.addEventListener('keydown', e => {
  const editing = ['INPUT','TEXTAREA','SELECT'].includes(document.activeElement?.tagName);
  if (e.key==='/' && !editing && !e.metaKey && !e.ctrlKey && !e.altKey) {
    e.preventDefault();
    if (!els.readerView.hidden) location.hash = '#/';
    openSearch();
    return;
  }
  if (e.key==='Escape') {
    if (els.searchControl.classList.contains('is-open') || !els.filterPanel.hidden) {
      closeToolPanels();
      els.searchToggle.focus();
    } else if (!els.readerView.hidden) {
      location.hash='#/';
    }
  }
});

loadEssays().catch(err => {
  console.error(err);
  els.essayGrid.innerHTML = `<p class="empty-state">読み込みに失敗した。${escapeHtml(err.message)}</p>`;
});
