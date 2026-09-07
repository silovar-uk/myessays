(() => {
  'use strict';

  const ARTICLE_ID = 'consulting-nine-masu-storyboard';
  const OVERVIEW_CLASS = 'nine-masu-overview';
  const LABELS = [
    ['01', '先に見る'],
    ['02', '空パック'],
    ['03', '実験'],
    ['04', '粒度'],
    ['05', '順序'],
    ['06', '罠'],
    ['07', '半信'],
    ['08', '制約'],
    ['09', '使う']
  ];

  function directH2(root) {
    return root ? [...root.children].filter(element => element.tagName === 'H2') : [];
  }

  function contentSections(context) {
    const headings = directH2(context.root);

    // This article intentionally has a subtitle as the first direct H2 in both
    // Japanese and English Mix. Do not depend on the translated subtitle text
    // or on Reader V2 having decorated it yet; drop that structural H2 first.
    const sections = headings.slice(1);
    const outside = sections.findIndex(heading => /OUTSIDE THE GRID/i.test(heading.textContent || ''));

    return {
      main: sections.slice(0, 9),
      outside: outside >= 0 ? { heading: sections[outside], index: outside } : null
    };
  }

  function removeOverview(root) {
    root?.querySelectorAll(`:scope > .${OVERVIEW_CLASS}`).forEach(element => element.remove());
  }

  function shortAccessibleTitle(heading, fallback) {
    return heading?.textContent?.trim() || fallback;
  }

  function makeCell(number, label, heading, sectionIndex) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'nine-masu-cell';
    button.dataset.sectionIndex = String(sectionIndex);
    button.setAttribute('aria-label', `${number} ${shortAccessibleTitle(heading, label)}へ移動`);
    button.innerHTML = `
      <span class="nine-masu-number" aria-hidden="true">${number}</span>
      <span class="nine-masu-label">${label}</span>`;
    return button;
  }

  function scrollToSection(index, heading) {
    const api = window.MyEssaysReadingLocation;
    if (api && typeof api.scrollToSection === 'function' && api.scrollToSection(index)) return;
    heading?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function setActive(overview, sectionIndex) {
    if (!overview) return;
    const current = Number(sectionIndex);
    overview.querySelectorAll('[data-section-index]').forEach(button => {
      const index = Number(button.dataset.sectionIndex);
      const active = Number.isFinite(current) && index === current;
      button.classList.toggle('is-active', active);
      button.classList.toggle('is-before-current', Number.isFinite(current) && index < current);
      if (active) button.setAttribute('aria-current', 'step');
      else button.removeAttribute('aria-current');
    });
    overview.dataset.currentSection = Number.isFinite(current) ? String(current) : '-1';
  }

  function buildOverview(context) {
    removeOverview(context.root);
    if (context.essayId !== ARTICLE_ID) return null;

    const sections = contentSections(context);
    if (sections.main.length < 9 || !sections.outside) return null;

    const overview = document.createElement('nav');
    overview.className = OVERVIEW_CLASS;
    overview.setAttribute('aria-label', '9マス記事ナビゲーション');

    const heading = document.createElement('div');
    heading.className = 'nine-masu-head';
    heading.innerHTML = `
      <div>
        <span class="nine-masu-kicker">9-MASU OVERVIEW</span>
        <strong>全体を見てから、1マスずつ読む。</strong>
      </div>
      <span class="nine-masu-hint">現在地と本文が連動</span>`;

    const stage = document.createElement('div');
    stage.className = 'nine-masu-stage';

    const grid = document.createElement('div');
    grid.className = 'nine-masu-grid';
    grid.setAttribute('role', 'group');
    grid.setAttribute('aria-label', '本文1から9');

    sections.main.forEach((sectionHeading, index) => {
      const [number, label] = LABELS[index];
      const cell = makeCell(number, label, sectionHeading, index);
      cell.addEventListener('click', () => scrollToSection(index, sectionHeading));
      grid.append(cell);
    });

    const outside = document.createElement('button');
    outside.type = 'button';
    outside.className = 'nine-masu-outside';
    outside.dataset.sectionIndex = String(sections.outside.index);
    outside.setAttribute('aria-label', `${shortAccessibleTitle(sections.outside.heading, 'OUTSIDE THE GRID')}へ移動`);
    outside.innerHTML = `
      <span class="nine-masu-outside-number" aria-hidden="true">10</span>
      <span class="nine-masu-outside-copy">
        <strong>OUTSIDE</strong>
        <small>THE GRID</small>
      </span>`;
    outside.addEventListener('click', () => scrollToSection(sections.outside.index, sections.outside.heading));

    stage.append(grid, outside);
    overview.append(heading, stage);

    context.root.insertBefore(overview, sections.main[0]);

    const current = window.MyEssaysReadingLocation?.currentSection?.();
    setActive(overview, current?.index ?? -1);
    return overview;
  }

  function mount(context) {
    buildOverview(context);
  }

  function syncFromLocation(event) {
    const detail = event.detail || {};
    if (detail.essayId !== ARTICLE_ID) return;
    const root = document.getElementById('readerContent');
    if (!root || root.dataset.readerEssayId !== ARTICLE_ID) return;
    setActive(root.querySelector(`:scope > .${OVERVIEW_CLASS}`), detail.sectionIndex);
  }

  document.addEventListener('myessays:reading-location-changed', syncFromLocation);

  if (window.MyEssaysReaderRuntime?.register) {
    window.MyEssaysReaderRuntime.register('nine-masu-overview', mount, { priority: 190 });
  }
})();
