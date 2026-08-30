(() => {
  'use strict';

  if (window.MyEssaysArgumentStructure?.installed) return;

  const ROLE_LABELS = {
    claim: 'Claim',
    evidence: 'Evidence',
    description: 'Description',
    analysis: 'Analysis',
    counterargument: 'Counterargument',
    qualification: 'Qualification',
    bridge: 'Bridge',
    implication: 'Implication'
  };

  const LEVEL_LABELS = {
    1: 'Evidence / Concrete',
    2: 'Description',
    3: 'Analysis / Synthesis',
    4: 'Local Claim',
    5: 'Larger Claim'
  };

  const ALLOWED_ROLES = new Set(Object.keys(ROLE_LABELS));
  const metadata = window.MyEssaysArgumentMetadata;
  const MARKER_LINE = metadata?.markerPattern || /^\s*<!--\s*(?:level\s*:\s*L?([1-5])(?:\s+role\s*:\s*([a-z-]+))?|structure\s*:\s*L?([1-5])(?:\s+([a-z-]+))?)\s*-->\s*$/i;
  let activeParagraph = null;
  let structureMode = false;
  let scrollTicking = false;

  function escapeAttribute(value = '') {
    return String(value).replace(/[&<>'"]/g, char => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
    }[char]));
  }

  function parseMarker(line = '') {
    const match = String(line).match(MARKER_LINE);
    if (!match) return null;
    const level = Number(match[1] || match[3]);
    const rawRole = String(match[2] || match[4] || '').toLowerCase();
    return {
      level,
      role: ALLOWED_ROLES.has(rawRole) ? rawRole : ''
    };
  }

  function isUnsupportedSentenceLine(line = '') {
    const trimmed = String(line).trim();
    return !trimmed || /^(?:#{1,6}\s|[-*+]\s|\d+\.\s|>\s|```|~~~|\|)/.test(trimmed);
  }

  function parseInline(markdown = '') {
    try {
      if (window.marked?.parseInline) return window.marked.parseInline(String(markdown));
    } catch {}
    return String(markdown);
  }

  function renderStructuredParagraph(entries) {
    const profile = entries.map(entry => entry.level).join('-');
    const sentences = entries.map((entry, index) => {
      const role = entry.role ? ` data-role="${escapeAttribute(entry.role)}"` : '';
      const separator = index < entries.length - 1 ? '<br class="argument-sentence-break">' : '';
      return `<span class="argument-sentence" data-level="${entry.level}"${role}>${parseInline(entry.text)}</span>${separator}`;
    }).join('');
    return `<p class="argument-structure-paragraph" data-argument-profile="${profile}">${sentences}</p>`;
  }

  function compileStructure(markdown = '') {
    const lines = String(markdown).replace(/\r\n?/g, '\n').split('\n');
    const output = [];
    let index = 0;
    let inFence = false;
    let fenceChar = '';
    let fenceLength = 0;

    while (index < lines.length) {
      const line = lines[index];
      const fence = line.match(/^ {0,3}(`{3,}|~{3,})/);
      if (fence) {
        const marker = fence[1];
        const char = marker[0];
        if (!inFence) {
          inFence = true;
          fenceChar = char;
          fenceLength = marker.length;
        } else if (char === fenceChar && marker.length >= fenceLength) {
          inFence = false;
          fenceChar = '';
          fenceLength = 0;
        }
        output.push(line);
        index += 1;
        continue;
      }

      if (!inFence && parseMarker(line)) {
        const entries = [];
        let cursor = index;
        while (cursor < lines.length) {
          const parsed = parseMarker(lines[cursor]);
          if (!parsed) break;
          const sentence = lines[cursor + 1];
          if (sentence == null || isUnsupportedSentenceLine(sentence)) break;
          entries.push({ ...parsed, text: sentence.trim() });
          cursor += 2;
        }
        if (entries.length) {
          output.push(renderStructuredParagraph(entries));
          index = cursor;
          continue;
        }
      }

      output.push(line);
      index += 1;
    }

    return output.join('\n');
  }

  function installRenderer() {
    if (window.MyEssaysArgumentStructure?.rendererInstalled) return true;
    let baseRender = null;
    try {
      if (typeof renderMarkdown === 'function') baseRender = renderMarkdown;
    } catch {}
    if (!baseRender && typeof window.renderMarkdown === 'function') baseRender = window.renderMarkdown;
    if (!baseRender) return false;

    const wrapped = function argumentAwareRender(markdown = '') {
      return baseRender(compileStructure(markdown));
    };
    window.renderMarkdown = wrapped;
    try { renderMarkdown = wrapped; } catch {}
    window.MyEssaysArgumentStructure.rendererInstalled = true;
    return true;
  }

  function readerElements() {
    return {
      view: document.getElementById('readerView'),
      content: document.getElementById('readerContent'),
      aside: document.getElementById('readerAside')
    };
  }

  function paragraphs() {
    const { content } = readerElements();
    return content ? [...content.querySelectorAll('.argument-structure-paragraph')] : [];
  }

  function sentenceLevels(paragraph) {
    return [...paragraph.querySelectorAll('.argument-sentence')]
      .map(sentence => Number(sentence.dataset.level))
      .filter(level => level >= 1 && level <= 5);
  }

  function roleFor(sentence) {
    const role = sentence?.dataset.role || '';
    return ROLE_LABELS[role] || (role ? role : '—');
  }

  function profileText(paragraph) {
    return sentenceLevels(paragraph).join(' → ');
  }

  function observationFor(levels) {
    if (!levels.length) return '構造情報がありません。';
    const hasConcrete = levels.some(level => level <= 2);
    const hasEvidence = levels.includes(1);
    const allAbstract = levels.every(level => level >= 4);
    const allConcrete = levels.every(level => level <= 2);
    const jump = levels.some((level, index) => index > 0 && Math.abs(level - levels[index - 1]) >= 3);
    const returnsUp = levels[0] >= 4 && hasEvidence && levels.at(-1) >= 4;

    if (returnsUp) return '具体的な証拠まで降りたあと、再び抽象度を上げて段落の含意へ接続しています。';
    if (allAbstract || (!hasConcrete && levels.every(level => level >= 3))) return '抽象的な主張・分析が続いています。具体的な説明や根拠を置く余地があるか確認できます。';
    if (allConcrete) return '具体情報が続いています。段落として何を意味するのか、分析や含意へ戻る箇所があるか確認できます。';
    if (jump) return '概念レベルの移動幅が大きい箇所があります。中間の説明や分析が必要か確認できます。';
    return 'このプロファイルを正解として扱わず、主張・具体化・分析の移動を確認するための手掛かりとして使えます。';
  }

  function sectionLabelFor(paragraph) {
    let node = paragraph.previousElementSibling;
    while (node) {
      if (node.tagName === 'H2') return node.textContent.trim() || 'Introduction';
      node = node.previousElementSibling;
    }
    return 'Introduction';
  }

  function installSentenceMarkers(paragraph) {
    [...paragraph.querySelectorAll('.argument-sentence')].forEach(sentence => {
      if (sentence.querySelector(':scope > .argument-level-marker')) return;
      const level = Number(sentence.dataset.level);
      const marker = document.createElement('span');
      marker.className = 'argument-level-marker';
      marker.setAttribute('aria-hidden', 'true');
      marker.textContent = `L${level}`;
      sentence.prepend(marker);
    });
  }

  function installMobileProfile(paragraph, index) {
    if (paragraph.nextElementSibling?.classList.contains('argument-mobile-profile')) return;
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'argument-mobile-profile';
    button.dataset.argumentParagraph = String(index);
    button.setAttribute('aria-label', `段落${index + 1}の論証構造 ${profileText(paragraph)}`);
    button.textContent = sentenceLevels(paragraph).join(' · ');
    paragraph.insertAdjacentElement('afterend', button);
  }

  function assignParagraphMetadata(rows) {
    rows.forEach((paragraph, index) => {
      paragraph.dataset.argumentParagraph = String(index);
      paragraph.id = paragraph.id || `argument-paragraph-${index + 1}`;
      installSentenceMarkers(paragraph);
      installMobileProfile(paragraph, index);
    });
  }

  function groupParagraphs(rows) {
    const groups = [];
    rows.forEach((paragraph, index) => {
      const label = sectionLabelFor(paragraph);
      let group = groups.at(-1);
      if (!group || group.label !== label) {
        group = { label, items: [] };
        groups.push(group);
      }
      group.items.push({ paragraph, index });
    });
    return groups;
  }

  function renderStructureList(rows) {
    return groupParagraphs(rows).map(group => `
      <section class="argument-section-group">
        <h3>${escapeAttribute(group.label)}</h3>
        <div class="argument-profile-list">
          ${group.items.map(({ paragraph, index }) => `
            <button type="button" class="argument-profile-row" data-argument-paragraph="${index}">
              <span class="argument-profile-number">P${index + 1}</span>
              <span class="argument-profile-sequence">${sentenceLevels(paragraph).join(' — ')}</span>
            </button>`).join('')}
        </div>
      </section>`).join('');
  }

  function renderLegend() {
    return `
      <details class="argument-legend">
        <summary>L1〜L5とは？</summary>
        <div class="argument-legend-body">
          ${[5,4,3,2,1].map(level => `<p><strong>L${level}</strong><span>${LEVEL_LABELS[level]}</span></p>`).join('')}
          <p class="argument-legend-note">Higher does not mean better. 数字は文章の優劣ではなく、概念レベルを示します。</p>
        </div>
      </details>`;
  }

  function renderInspector(paragraph, index) {
    if (!paragraph) return '<p class="argument-empty">段落を選ぶと、ここに構造が表示されます。</p>';
    const sentences = [...paragraph.querySelectorAll('.argument-sentence')];
    const levels = sentenceLevels(paragraph);
    return `
      <div class="argument-inspector-head">
        <span>Paragraph ${index + 1}</span>
        <strong>${levels.join(' → ')}</strong>
      </div>
      <dl class="argument-inspector-summary">
        <div><dt>Start</dt><dd>L${levels[0]} / ${roleFor(sentences[0])}</dd></div>
        <div><dt>Deepest</dt><dd>L${Math.min(...levels)} / ${LEVEL_LABELS[Math.min(...levels)]}</dd></div>
        <div><dt>End</dt><dd>L${levels.at(-1)} / ${roleFor(sentences.at(-1))}</dd></div>
      </dl>
      <ol class="argument-sentence-list">
        ${sentences.map(sentence => `
          <li>
            <span class="argument-sentence-level">L${sentence.dataset.level}</span>
            <span class="argument-sentence-role">${roleFor(sentence)}</span>
            <span class="argument-sentence-preview">${escapeAttribute((sentence.textContent || '').replace(/^L[1-5]/, '').trim()).slice(0, 88)}</span>
          </li>`).join('')}
      </ol>
      <div class="argument-observation">
        <span>Observation</span>
        <p>${observationFor(levels)}</p>
      </div>`;
  }

  function setStructureMode(enabled) {
    const { view } = readerElements();
    structureMode = Boolean(enabled);
    view?.classList.toggle('argument-structure-mode', structureMode);
    document.querySelectorAll('[data-argument-tab]').forEach(button => {
      const active = button.dataset.argumentTab === (structureMode ? 'structure' : 'contents');
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-selected', String(active));
    });
    document.getElementById('argumentContentsPanel')?.toggleAttribute('hidden', structureMode);
    document.getElementById('argumentStructurePanel')?.toggleAttribute('hidden', !structureMode);
  }

  function focusParagraph(index, { scroll = true } = {}) {
    const rows = paragraphs();
    const paragraph = rows[index];
    if (!paragraph) return;
    activeParagraph?.classList.remove('is-argument-active');
    activeParagraph = paragraph;
    paragraph.classList.add('is-argument-active');
    document.querySelectorAll('.argument-profile-row').forEach(button => {
      button.classList.toggle('is-active', Number(button.dataset.argumentParagraph) === index);
    });
    const inspector = document.getElementById('argumentInspector');
    if (inspector) inspector.innerHTML = renderInspector(paragraph, index);
    if (scroll) paragraph.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  function buildDesktopAside(rows) {
    const { aside } = readerElements();
    if (!aside) return;
    const nav = aside.querySelector('nav');
    if (!nav || aside.querySelector('.argument-aside-tabs')) return;

    const contentsPanel = document.createElement('div');
    contentsPanel.id = 'argumentContentsPanel';
    contentsPanel.className = 'argument-aside-panel argument-contents-panel';
    nav.replaceWith(contentsPanel);
    contentsPanel.append(nav);

    const tabs = document.createElement('div');
    tabs.className = 'argument-aside-tabs';
    tabs.setAttribute('role', 'tablist');
    tabs.setAttribute('aria-label', 'Reader sidebar');
    tabs.innerHTML = `
      <button type="button" role="tab" data-argument-tab="contents" class="is-active" aria-selected="true">Contents</button>
      <button type="button" role="tab" data-argument-tab="structure" aria-selected="false">Structure</button>`;

    const structurePanel = document.createElement('div');
    structurePanel.id = 'argumentStructurePanel';
    structurePanel.className = 'argument-aside-panel argument-structure-panel';
    structurePanel.hidden = true;
    structurePanel.innerHTML = `
      <div class="argument-panel-intro">
        <span>CONCEPTUAL MOVEMENT</span>
        <p>段落内の「抽象 → 具体 → 抽象」を観察する補助レイヤー。</p>
      </div>
      ${renderStructureList(rows)}
      <div id="argumentInspector" class="argument-inspector">${renderInspector(null, 0)}</div>
      ${renderLegend()}`;

    const meta = aside.querySelector('.meta-block');
    if (meta) meta.insertAdjacentElement('afterend', tabs);
    else aside.prepend(tabs);
    tabs.insertAdjacentElement('afterend', contentsPanel);
    contentsPanel.insertAdjacentElement('afterend', structurePanel);
  }

  function ensureMobileSheet() {
    let sheet = document.getElementById('argumentStructureSheet');
    if (sheet) return sheet;
    sheet = document.createElement('aside');
    sheet.id = 'argumentStructureSheet';
    sheet.className = 'argument-structure-sheet';
    sheet.setAttribute('aria-hidden', 'true');
    sheet.innerHTML = `
      <div class="argument-sheet-head">
        <div><span>STRUCTURE</span><h2>論証構造</h2></div>
        <button type="button" class="argument-sheet-close" aria-label="構造パネルを閉じる">×</button>
      </div>
      <div id="argumentSheetBody" class="argument-sheet-body"></div>`;
    document.body.append(sheet);
    return sheet;
  }

  function setMobileSheetOpen(open) {
    const sheet = ensureMobileSheet();
    sheet.classList.toggle('is-open', open);
    sheet.setAttribute('aria-hidden', String(!open));
  }

  function openMobileOverview(rows) {
    const sheet = ensureMobileSheet();
    const body = sheet.querySelector('#argumentSheetBody');
    body.innerHTML = `
      <p class="argument-sheet-copy">段落を選ぶとSentence LevelとObservationを確認できます。</p>
      ${renderStructureList(rows)}
      ${renderLegend()}`;
    setMobileSheetOpen(true);
  }

  function openMobileInspector(index) {
    const rows = paragraphs();
    const paragraph = rows[index];
    if (!paragraph) return;
    const sheet = ensureMobileSheet();
    const body = sheet.querySelector('#argumentSheetBody');
    body.innerHTML = `<button type="button" class="argument-sheet-back">← Overview</button>${renderInspector(paragraph, index)}${renderLegend()}`;
    body.querySelector('.argument-sheet-back')?.addEventListener('click', () => openMobileOverview(rows));
    focusParagraph(index, { scroll: false });
    setMobileSheetOpen(true);
  }

  function ensureMobileLauncher(rows) {
    let button = document.getElementById('argumentStructureLauncher');
    if (!button) {
      button = document.createElement('button');
      button.id = 'argumentStructureLauncher';
      button.className = 'argument-structure-launcher';
      button.type = 'button';
      button.innerHTML = '<span>Structure</span><span aria-hidden="true">↗</span>';
      document.body.append(button);
    }
    button.hidden = !rows.length;
    button.onclick = () => openMobileOverview(paragraphs());
  }

  function syncActiveFromScroll() {
    if (!structureMode || scrollTicking || window.innerWidth <= 820) return;
    scrollTicking = true;
    requestAnimationFrame(() => {
      scrollTicking = false;
      const rows = paragraphs();
      if (!rows.length) return;
      const targetY = window.innerHeight * 0.34;
      let bestIndex = 0;
      let bestDistance = Infinity;
      rows.forEach((paragraph, index) => {
        const rect = paragraph.getBoundingClientRect();
        const point = Math.min(Math.max(targetY, rect.top), rect.bottom);
        const distance = Math.abs(targetY - point);
        if (distance < bestDistance) {
          bestDistance = distance;
          bestIndex = index;
        }
      });
      if (rows[bestIndex] !== activeParagraph) focusParagraph(bestIndex, { scroll: false });
    });
  }

  function resetUi() {
    setStructureMode(false);
    activeParagraph?.classList.remove('is-argument-active');
    activeParagraph = null;
    document.getElementById('argumentStructureLauncher')?.remove();
    setMobileSheetOpen(false);
  }

  function initializeReaderStructure() {
    installRenderer();
    const rows = paragraphs();
    if (!rows.length) {
      resetUi();
      return;
    }
    assignParagraphMetadata(rows);
    buildDesktopAside(rows);
    ensureMobileLauncher(rows);
    setStructureMode(false);
  }

  document.addEventListener('click', event => {
    const tab = event.target.closest('[data-argument-tab]');
    if (tab) {
      setStructureMode(tab.dataset.argumentTab === 'structure');
      if (structureMode && !activeParagraph) focusParagraph(0, { scroll: false });
      return;
    }

    const profile = event.target.closest('[data-argument-paragraph]');
    if (profile) {
      const index = Number(profile.dataset.argumentParagraph);
      if (window.innerWidth <= 820) openMobileInspector(index);
      else {
        setStructureMode(true);
        focusParagraph(index);
      }
      return;
    }

    if (event.target.closest('.argument-sheet-close')) {
      setMobileSheetOpen(false);
      return;
    }
  });

  document.addEventListener('myessays:reader-rendered', () => requestAnimationFrame(initializeReaderStructure));
  document.addEventListener('myessays:reader-version-changed', () => requestAnimationFrame(initializeReaderStructure));
  window.addEventListener('scroll', syncActiveFromScroll, { passive: true });
  window.addEventListener('hashchange', () => {
    if (!location.hash.startsWith('#/essay/')) resetUi();
  });
  window.addEventListener('keydown', event => {
    const editing = ['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName) || document.activeElement?.isContentEditable;
    if (editing || event.metaKey || event.ctrlKey || event.altKey) return;
    if (event.key.toLowerCase() === 's' && location.hash.startsWith('#/essay/') && paragraphs().length && window.innerWidth > 820) {
      event.preventDefault();
      setStructureMode(!structureMode);
      if (structureMode && !activeParagraph) focusParagraph(0, { scroll: false });
    }
    if (event.key === 'Escape' && document.getElementById('argumentStructureSheet')?.classList.contains('is-open')) {
      setMobileSheetOpen(false);
    }
  });

  window.MyEssaysArgumentStructure = {
    installed: true,
    rendererInstalled: false,
    compile: compileStructure,
    initialize: initializeReaderStructure,
    setMode: setStructureMode
  };

  if (!installRenderer()) {
    window.addEventListener('DOMContentLoaded', () => {
      installRenderer();
      if (location.hash.startsWith('#/essay/')) {
        try {
          if (typeof state !== 'undefined' && state.currentEssay && typeof showReader === 'function') showReader(state.currentEssay);
        } catch {}
      }
    }, { once: true });
  }
})();