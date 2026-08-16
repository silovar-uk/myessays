const state = {
  essays: [],
  tags: new Set(),
  activeTags: new Set(),
  currentEssay: null,
  pendingQuote: ''
};

const $ = (id) => document.getElementById(id);
const els = {
  libraryView: $('libraryView'), readerView: $('readerView'), essayGrid: $('essayGrid'),
  searchInput: $('searchInput'), searchControl: $('searchControl'), searchToggle: $('searchToggle'),
  typeFilter: $('typeFilter'), yearFilter: $('yearFilter'), favoriteFilter: $('favoriteFilter'),
  sortSelect: $('sortSelect'), tagFilters: $('tagFilters'), resultCount: $('resultCount'),
  emptyState: $('emptyState'), clearFilters: $('clearFilters'), filterToggle: $('filterToggle'),
  filterCount: $('filterCount'), filterPanel: $('filterPanel'), readerContent: $('readerContent'),
  readerAside: $('readerAside'), backButton: $('backButton'), guideDialog: $('guideDialog'),
  openGuide: $('openGuide'), noteTab: $('noteTab'), notePanel: $('notePanel'), closeNote: $('closeNote'),
  noteTextarea: $('noteTextarea'), noteStatus: $('noteStatus'), copyNote: $('copyNote'),
  clearNote: $('clearNote'), quoteMenu: $('quoteMenu'), quoteToNote: $('quoteToNote')
};

const NOTE_PREFIX = 'myessays:reading-note:';

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

function safeImageSource(value='') {
  const source = String(value).trim();
  if (/^https:\/\//i.test(source)) return source;
  if (/^(?:\.\.?\/)?assets\/[A-Za-z0-9_./-]+$/i.test(source)) return source;
  return '';
}

function splitTableRow(line='') {
  let value = String(line).trim();
  if (value.startsWith('|')) value = value.slice(1);
  if (value.endsWith('|')) value = value.slice(0, -1);
  return value.split('|').map(cell => cell.trim());
}

function isTableSeparator(line='') {
  const cells = splitTableRow(line);
  return cells.length > 0 && cells.every(cell => /^:?-{3,}:?$/.test(cell));
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

  for (let i = 0; i < lines.length; i += 1) {
    const raw = lines[i];
    const line = raw.trimEnd();
    if (!line.trim()) { flush(); continue; }

    const image = line.trim().match(/^!\[([^\]]*)\]\((\S+?)(?:\s+"([^"]+)")?\)$/);
    if (image) {
      flush();
      const source = safeImageSource(image[2]);
      if (source) {
        const caption = image[3] ? `<figcaption>${inlineMarkdown(image[3])}</figcaption>` : '';
        html.push(`<figure class="essay-figure"><img src="${escapeHtml(source)}" alt="${escapeHtml(image[1])}" loading="lazy" decoding="async">${caption}</figure>`);
      } else {
        paragraph.push(line.trim());
      }
      continue;
    }

    if (line.includes('|') && isTableSeparator(lines[i + 1] || '')) {
      flush();
      const headers = splitTableRow(line);
      const rows = [];
      i += 2;
      while (i < lines.length && lines[i].trim() && lines[i].includes('|')) {
        const cells = splitTableRow(lines[i]);
        rows.push(headers.map((_, index) => cells[index] || ''));
        i += 1;
      }
      i -= 1;
      html.push(`
        <div class="essay-table-wrap">
          <table class="essay-table">
            <thead><tr>${headers.map(cell => `<th scope="col">${inlineMarkdown(cell)}</th>`).join('')}</tr></thead>
            <tbody>${rows.map(row => `<tr>${row.map(cell => `<td>${inlineMarkdown(cell)}</td>`).join('')}</tr>`).join('')}</tbody>
          </table>
        </div>`);
      continue;
    }

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

function readingMetrics(md='') {
  const clean = md
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]+`/g, ' ')
    .replace(/https?:\/\/\S+/g, ' ')
    .replace(/[#>*_\[\]()]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  const charCount = clean.replace(/\s/g, '').length;
  const japaneseChars = (clean.match(/[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}ー々〆ヶ]/gu) || []).length;
  const englishWords = (clean.match(/[A-Za-z0-9]+(?:['’-][A-Za-z0-9]+)*/g) || []).length;
  const minutes = Math.max(1, Math.ceil((japaneseChars / 500) + (englishWords / 200)));
  return { charCount, minutes };
}

function normalizeEssay(path, text) {
  const { meta, body } = parseFrontMatter(text);
  const plain = body.replace(/[#>*_`\[\]()]/g,' ').replace(/https?:\/\/\S+/g,' ');
  return {
    ...meta,
    path,
    body,
    metrics: readingMetrics(body),
    searchText: [meta.title, meta.subtitle, meta.abstract, ...(meta.tags||[]), ...(meta.keywords||[]), plain].join(' ').toLowerCase()
  };
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
function tagsHtml(tags=[], limit=5) { return tags.slice(0,limit).map(t=>`<span>#${escapeHtml(t)}</span>`).join(''); }

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

function featuredEssayIds() {
  const newest = [...state.essays].sort((a,b)=>String(b.created||'').localeCompare(String(a.created||''))).slice(0,2);
  const favorites = [...state.essays]
    .filter(e => Number(e.favorite || 0) >= 4)
    .sort((a,b)=>(Number(b.favorite)||0)-(Number(a.favorite)||0) || String(b.created||'').localeCompare(String(a.created||'')));
  return new Set([...newest, ...favorites].filter((e,i,arr)=>arr.findIndex(x=>x.id===e.id)===i).slice(0,4).map(e=>e.id));
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

function renderFeaturedCard(e) {
  return `
    <article class="featured-card" data-id="${escapeHtml(e.id)}" tabindex="0" role="link" aria-label="${escapeHtml(e.title)}を読む">
      <div class="featured-meta"><span>${escapeHtml(e.type || 'Essay')}</span><span>${formatDate(e.created)}</span></div>
      <h2>${escapeHtml(e.title)}</h2>
      <p class="featured-abstract">${escapeHtml(e.abstract || '')}</p>
      <div class="featured-footer">
        <div class="mini-tags">${tagsHtml(e.tags, 5)}</div>
        <span class="stars" title="お気に入り ${e.favorite || 0}/5">${stars(e.favorite)}</span>
      </div>
    </article>`;
}

function renderArchiveRow(e) {
  return `
    <article class="archive-row" data-id="${escapeHtml(e.id)}" tabindex="0" role="link" aria-label="${escapeHtml(e.title)}を読む">
      <div class="archive-date">${formatDate(e.created)}</div>
      <div class="archive-main">
        <h2>${escapeHtml(e.title)}</h2>
        <div class="mini-tags">${tagsHtml(e.tags, 6)}</div>
      </div>
      <div class="archive-side">
        <span class="archive-type">${escapeHtml(e.type || 'Essay')}</span>
        <span class="stars" title="お気に入り ${e.favorite || 0}/5">${stars(e.favorite)}</span>
      </div>
    </article>`;
}

function renderLibrary() {
  const rows = filteredEssays();
  const featuredIds = featuredEssayIds();
  const featured = rows.filter(e => featuredIds.has(e.id));
  const archive = rows.filter(e => !featuredIds.has(e.id));
  els.resultCount.textContent = `${rows.length} / ${state.essays.length} essays`;
  els.emptyState.hidden = rows.length > 0;

  const featuredHtml = featured.length ? `
    <section class="library-section">
      <div class="section-heading"><strong>Featured</strong><span>最新・お気に入り</span></div>
      <div class="featured-grid">${featured.map(renderFeaturedCard).join('')}</div>
    </section>` : '';
  const archiveHtml = archive.length ? `
    <section class="library-section archive-section">
      <div class="section-heading"><strong>Archive</strong><span>${archive.length} essays</span></div>
      <div class="archive-list">${archive.map(renderArchiveRow).join('')}</div>
    </section>` : '';

  els.essayGrid.innerHTML = featuredHtml + archiveHtml;
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

function markAcademicSections() {
  const headings = [...els.readerContent.querySelectorAll('h2, h3')];
  headings.forEach(h => {
    const label = h.textContent.trim();
    const isReferences = /^(参考文献|references|bibliography)$/i.test(label);
    const isNotes = /^(注|脚注|notes|footnotes)$/i.test(label);
    if (!isReferences && !isNotes) return;
    h.classList.add(isReferences ? 'references-heading' : 'notes-heading');
    let node = h.nextElementSibling;
    while (node && !/^H[1-3]$/.test(node.tagName)) {
      node.classList.add(isReferences ? 'reference-block' : 'notes-block');
      node = node.nextElementSibling;
    }
  });
}

function noteKey(essay=state.currentEssay) {
  return essay?.id ? `${NOTE_PREFIX}${essay.id}` : '';
}

function loadCurrentNote() {
  const key = noteKey();
  let value = '';
  if (key) {
    try { value = localStorage.getItem(key) || ''; }
    catch { value = ''; }
  }
  els.noteTextarea.value = value;
  els.noteStatus.textContent = value ? '保存済み' : 'メモなし';
}

function saveCurrentNote() {
  const key = noteKey();
  if (!key) return;
  try {
    if (els.noteTextarea.value) localStorage.setItem(key, els.noteTextarea.value);
    else localStorage.removeItem(key);
    els.noteStatus.textContent = els.noteTextarea.value ? '保存済み' : 'メモなし';
  } catch {
    els.noteStatus.textContent = '保存できませんでした';
  }
}

function setNoteOpen(open, { focus=false } = {}) {
  if (!state.currentEssay) return;
  els.readerView.classList.toggle('note-is-open', open);
  els.notePanel.classList.toggle('is-open', open);
  els.notePanel.setAttribute('aria-hidden', String(!open));
  els.noteTab.setAttribute('aria-expanded', String(open));
  hideQuoteMenu();
  if (open && focus) {
    requestAnimationFrame(() => {
      els.noteTextarea.focus();
      els.noteTextarea.setSelectionRange(els.noteTextarea.value.length, els.noteTextarea.value.length);
    });
  }
}

function toggleNote() {
  const opening = !els.notePanel.classList.contains('is-open');
  setNoteOpen(opening, { focus: opening });
}

function appendQuoteToNote(text) {
  const clean = String(text || '').trim();
  if (!clean) return;
  const quoted = clean.split(/\n+/).map(line => `> ${line.trim()}`).join('\n');
  const current = els.noteTextarea.value.trimEnd();
  els.noteTextarea.value = `${current}${current ? '\n\n' : ''}${quoted}\n`;
  saveCurrentNote();
  setNoteOpen(true, { focus:true });
  els.noteStatus.textContent = '引用を追加・保存済み';
}

async function copyText(text) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }
  const helper = document.createElement('textarea');
  helper.value = text;
  helper.style.position = 'fixed';
  helper.style.opacity = '0';
  document.body.appendChild(helper);
  helper.select();
  document.execCommand('copy');
  helper.remove();
}

function hideQuoteMenu() {
  els.quoteMenu.hidden = true;
  state.pendingQuote = '';
}

function selectionInsideReader() {
  const selection = window.getSelection();
  if (!selection || selection.isCollapsed || !selection.rangeCount) return '';
  const range = selection.getRangeAt(0);
  let node = range.commonAncestorContainer;
  if (node.nodeType === Node.TEXT_NODE) node = node.parentNode;
  if (!node || !els.readerContent.contains(node)) return '';
  return selection.toString().trim();
}

function showReader(essay) {
  closeToolPanels();
  state.currentEssay = essay;
  setNoteOpen(false);
  els.libraryView.hidden = true;
  els.readerView.hidden = false;
  els.readerContent.innerHTML = renderMarkdown(essay.body);
  els.readerContent.insertAdjacentHTML('afterbegin', `<div class="reading-stats"><span>${essay.metrics.charCount.toLocaleString('ja-JP')}文字</span><span>·</span><span>読了 約${essay.metrics.minutes}分</span></div>`);
  markAcademicSections();

  const headings = [...els.readerContent.querySelectorAll('h2')];
  els.readerAside.innerHTML = `
    <dl class="meta-block">
      <dt>Type</dt><dd>${escapeHtml(essay.type || '')}</dd>
      <dt>Created</dt><dd>${formatDate(essay.created)}</dd>
      <dt>Updated</dt><dd>${formatDate(essay.updated)}</dd>
      <dt>Length</dt><dd>${essay.metrics.charCount.toLocaleString('ja-JP')}文字 · 約${essay.metrics.minutes}分</dd>
      <dt>Favorite</dt><dd class="stars">${stars(essay.favorite)}</dd>
      <dt>Grow</dt><dd>${essay.grow || 0}/5</dd>
      <dt>Tags</dt><dd>${(essay.tags||[]).map(t=>`#${escapeHtml(t)}`).join(' ')}</dd>
    </dl>
    <nav aria-label="目次">${headings.map(h=>`<a href="#${h.id}" data-anchor="${h.id}">${h.textContent}</a>`).join('')}</nav>`;
  els.readerAside.querySelectorAll('[data-anchor]').forEach(a => a.addEventListener('click', ev => {
    ev.preventDefault(); document.getElementById(a.dataset.anchor)?.scrollIntoView({behavior:'smooth', block:'start'});
  }));
  loadCurrentNote();
  document.title = `${essay.title} | My Essays`;
  window.scrollTo(0,0);

  // Reader navigation used to rely only on a MutationObserver. Mobile Safari
  // may postpone that callback while the page is loading or restored from the
  // back-forward cache, leaving the related section absent until another DOM
  // change happens. Render it explicitly once the article DOM is complete.
  window.MyEssaysReaderNavigation?.render();
  document.dispatchEvent(new CustomEvent('myessays:reader-rendered'));
}

function showLibrary() {
  if (state.currentEssay) setNoteOpen(false);
  hideQuoteMenu();
  state.currentEssay = null;
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

els.noteTab.addEventListener('click', toggleNote);
els.closeNote.addEventListener('click', () => setNoteOpen(false));
els.noteTextarea.addEventListener('input', saveCurrentNote);
els.copyNote.addEventListener('click', async () => {
  const text = els.noteTextarea.value;
  if (!text.trim()) { els.noteStatus.textContent = 'メモは空です'; return; }
  try {
    await copyText(text);
    els.noteStatus.textContent = 'コピーしました';
  } catch {
    els.noteStatus.textContent = 'コピーできませんでした';
  }
});
els.clearNote.addEventListener('click', () => {
  if (!els.noteTextarea.value) return;
  if (!window.confirm('この論文の読書メモをすべて削除しますか？')) return;
  els.noteTextarea.value = '';
  saveCurrentNote();
  els.noteStatus.textContent = '削除しました';
});

els.readerContent.addEventListener('contextmenu', e => {
  const selected = selectionInsideReader();
  if (!selected) { hideQuoteMenu(); return; }
  e.preventDefault();
  state.pendingQuote = selected;
  els.quoteMenu.hidden = false;
  const menuWidth = 150;
  const menuHeight = 44;
  const left = Math.min(e.clientX, window.innerWidth - menuWidth - 12);
  const top = Math.min(e.clientY, window.innerHeight - menuHeight - 12);
  els.quoteMenu.style.left = `${Math.max(12,left)}px`;
  els.quoteMenu.style.top = `${Math.max(12,top)}px`;
});
els.quoteToNote.addEventListener('click', () => appendQuoteToNote(state.pendingQuote));
document.addEventListener('pointerdown', e => {
  if (!els.quoteMenu.hidden && !els.quoteMenu.contains(e.target)) hideQuoteMenu();
});
window.addEventListener('scroll', hideQuoteMenu, { passive:true });
window.addEventListener('resize', hideQuoteMenu);
window.addEventListener('hashchange', route);
window.addEventListener('keydown', e => {
  const editing = ['INPUT','TEXTAREA','SELECT'].includes(document.activeElement?.tagName) || document.activeElement?.isContentEditable;

  if (e.key==='/' && !editing && !e.metaKey && !e.ctrlKey && !e.altKey) {
    e.preventDefault();
    if (!els.readerView.hidden) location.hash = '#/';
    openSearch();
    return;
  }

  if (e.key.toLowerCase()==='m' && !editing && !els.readerView.hidden && !e.metaKey && !e.ctrlKey && !e.altKey) {
    e.preventDefault();
    toggleNote();
    return;
  }

  if (e.key==='Escape') {
    if (!els.quoteMenu.hidden) { hideQuoteMenu(); return; }
    if (els.notePanel.classList.contains('is-open')) { setNoteOpen(false); els.noteTab.focus(); return; }
    if (els.searchControl.classList.contains('is-open') || !els.filterPanel.hidden) {
      closeToolPanels(); els.searchToggle.focus(); return;
    }
    if (!els.readerView.hidden) location.hash='#/';
  }
});

loadEssays().catch(err => {
  console.error(err);
  els.essayGrid.innerHTML = `<p class="empty-state">読み込みに失敗した。${escapeHtml(err.message)}</p>`;
});
