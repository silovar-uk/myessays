(() => {
  'use strict';

  if (window.MyEssaysStructurePulse?.installed) return;

  const LEVEL_LABELS = {
    5: 'Horizon',
    4: 'Claim',
    3: 'Bridge',
    2: 'Scene',
    1: 'Ground'
  };

  const ROLE_LABELS = {
    claim: 'Claim',
    evidence: 'Evidence',
    description: 'Description',
    analysis: 'Analysis',
    counterargument: 'Counter',
    qualification: 'Qualify',
    bridge: 'Bridge',
    implication: 'Implication'
  };

  let activeSentence = null;
  let activeParagraph = null;
  let sentenceObserver = null;
  let mapOpen = false;
  let rafPending = false;

  const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function reader() {
    return {
      view: document.getElementById('readerView'),
      content: document.getElementById('readerContent'),
      structurePanel: document.getElementById('argumentStructurePanel')
    };
  }

  function paragraphs() {
    const { content } = reader();
    return content ? [...content.querySelectorAll('.argument-structure-paragraph')] : [];
  }

  function sentences() {
    return paragraphs().flatMap(paragraph => [...paragraph.querySelectorAll('.argument-sentence')]);
  }

  function levelOf(sentence) {
    const level = Number(sentence?.dataset.level);
    return level >= 1 && level <= 5 ? level : null;
  }

  function roleOf(sentence) {
    const raw = String(sentence?.dataset.role || '').toLowerCase();
    return ROLE_LABELS[raw] || raw || 'Sentence';
  }

  function sectionOf(paragraph) {
    let node = paragraph?.previousElementSibling;
    while (node) {
      if (node.tagName === 'H2') return node.textContent.trim() || 'Introduction';
      node = node.previousElementSibling;
    }
    return 'Introduction';
  }

  function cleanSentenceText(sentence) {
    if (!sentence) return '';
    const clone = sentence.cloneNode(true);
    clone.querySelectorAll('.argument-level-marker').forEach(node => node.remove());
    return (clone.textContent || '').replace(/\s+/g, ' ').trim();
  }

  function buildPulse() {
    const panel = reader().structurePanel;
    if (!panel || panel.querySelector('.structure-pulse')) return;

    const pulse = document.createElement('section');
    pulse.className = 'structure-pulse';
    pulse.setAttribute('aria-label', '現在読んでいる文の概念レベル');
    pulse.innerHTML = `
      <div class="structure-pulse-head">
        <span class="structure-pulse-kicker">YOU ARE HERE</span>
        <button type="button" class="structure-map-open" aria-haspopup="dialog">Mapを開く <span aria-hidden="true">↗</span></button>
      </div>
      <div class="structure-pulse-current" aria-live="polite">
        <strong class="structure-pulse-level">—</strong>
        <span class="structure-pulse-role">本文を読むと現在地を表示</span>
      </div>
      <div class="structure-pulse-lanes" aria-hidden="true">
        ${[5,4,3,2,1].map(level => `
          <span class="structure-pulse-lane" data-pulse-level="${level}">
            <b>L${level}</b><i></i><em>${LEVEL_LABELS[level]}</em>
          </span>`).join('')}
      </div>
      <p class="structure-pulse-preview"></p>`;

    panel.prepend(pulse);
  }

  function groupBySection(rows) {
    const groups = [];
    rows.forEach((paragraph, paragraphIndex) => {
      const label = sectionOf(paragraph);
      let group = groups.at(-1);
      if (!group || group.label !== label) {
        group = { label, items: [] };
        groups.push(group);
      }
      group.items.push({ paragraph, paragraphIndex });
    });
    return groups;
  }

  function sentenceIndex(sentence) {
    return sentences().indexOf(sentence);
  }

  function mapCell(sentence, paragraphIndex, sentenceInParagraph) {
    const level = levelOf(sentence);
    const role = roleOf(sentence);
    const preview = cleanSentenceText(sentence);
    const globalIndex = sentenceIndex(sentence);
    return `
      <button type="button" class="structure-map-token" data-structure-sentence="${globalIndex}"
        title="${escapeHtml(preview)}"
        aria-label="Paragraph ${paragraphIndex + 1}, sentence ${sentenceInParagraph + 1}, L${level} ${escapeHtml(role)}: ${escapeHtml(preview)}">
        <span>${escapeHtml(shortRole(role))}</span>
      </button>`;
  }

  function shortRole(role) {
    const aliases = {
      Description: 'Desc',
      Analysis: 'Analysis',
      Evidence: 'Evidence',
      Implication: 'Implication',
      Sentence: 'Sentence'
    };
    return aliases[role] || role;
  }

  function escapeHtml(value = '') {
    return String(value).replace(/[&<>"']/g, char => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[char]));
  }

  function buildMapBody(rows) {
    const groups = groupBySection(rows);
    return `
      <div class="structure-map-orientation" aria-hidden="true">
        <span>抽象</span><span>具体</span>
      </div>
      <div class="structure-map-scroll" tabindex="0">
        <div class="structure-map-grid" role="grid" aria-label="L5からL1の文章構造マップ">
          <div class="structure-map-header structure-map-sticky" role="columnheader">Paragraph</div>
          ${[5,4,3,2,1].map(level => `<div class="structure-map-header" role="columnheader"><strong>L${level}</strong><span>${LEVEL_LABELS[level]}</span></div>`).join('')}
          ${groups.map(group => `
            <div class="structure-map-section" role="rowheader">${escapeHtml(group.label)}</div>
            <div class="structure-map-section-rule" aria-hidden="true"></div>
            ${group.items.map(({ paragraph, paragraphIndex }) => {
              const paraSentences = [...paragraph.querySelectorAll('.argument-sentence')];
              return `
                <button type="button" class="structure-map-paragraph structure-map-sticky" data-structure-paragraph="${paragraphIndex}" aria-label="Paragraph ${paragraphIndex + 1}へ移動">P${paragraphIndex + 1}</button>
                ${[5,4,3,2,1].map(level => `
                  <div class="structure-map-cell" data-map-level="${level}" role="gridcell">
                    ${paraSentences.map((sentence, index) => levelOf(sentence) === level ? mapCell(sentence, paragraphIndex, index) : '').join('')}
                  </div>`).join('')}`;
            }).join('')}
          `).join('')}
        </div>
      </div>
      <div class="structure-map-guide">
        <span>L5 HORIZON</span><span>→</span><span>L4 CLAIM</span><span>→</span><span>L3 BRIDGE</span><span>→</span><span>L2 SCENE</span><span>→</span><span>L1 GROUND</span>
      </div>`;
  }

  function ensureMap() {
    let dialog = document.getElementById('structureMapDialog');
    if (!dialog) {
      dialog = document.createElement('div');
      dialog.id = 'structureMapDialog';
      dialog.className = 'structure-map-dialog';
      dialog.setAttribute('role', 'dialog');
      dialog.setAttribute('aria-modal', 'true');
      dialog.setAttribute('aria-hidden', 'true');
      dialog.setAttribute('aria-labelledby', 'structureMapTitle');
      dialog.innerHTML = `
        <div class="structure-map-backdrop" data-structure-map-close></div>
        <section class="structure-map-card">
          <header class="structure-map-titlebar">
            <div>
              <span>ARGUMENT ALTITUDE</span>
              <h2 id="structureMapTitle">文章の組み立て</h2>
              <p>SectionとSentenceをL5→L1で俯瞰。Roleを押すと本文の該当文へ移動。</p>
            </div>
            <button type="button" class="structure-map-close" data-structure-map-close aria-label="Structure Mapを閉じる">×</button>
          </header>
          <div id="structureMapBody" class="structure-map-body"></div>
        </section>`;
      document.body.append(dialog);
    }
    return dialog;
  }

  function renderMap() {
    const dialog = ensureMap();
    const body = dialog.querySelector('#structureMapBody');
    const rows = paragraphs();
    body.innerHTML = buildMapBody(rows);
    syncMapActive();
  }

  function setMapOpen(open) {
    const dialog = ensureMap();
    mapOpen = Boolean(open);
    dialog.classList.toggle('is-open', mapOpen);
    dialog.setAttribute('aria-hidden', String(!mapOpen));
    document.documentElement.classList.toggle('structure-map-open', mapOpen);
    if (mapOpen) {
      renderMap();
      requestAnimationFrame(() => dialog.querySelector('.structure-map-close')?.focus({ preventScroll: true }));
    }
  }

  function scrollToSentence(sentence) {
    if (!sentence) return;
    setMapOpen(false);
    window.MyEssaysArgumentStructure?.setMode?.(true);
    requestAnimationFrame(() => {
      sentence.scrollIntoView({ behavior: reduceMotion() ? 'auto' : 'smooth', block: 'center' });
      setActiveSentence(sentence);
    });
  }

  function setActiveSentence(sentence) {
    if (!sentence || sentence === activeSentence) return;
    activeSentence?.classList.remove('is-structure-sentence-active');
    activeParagraph?.classList.remove('is-structure-pulse-paragraph');

    activeSentence = sentence;
    activeParagraph = sentence.closest('.argument-structure-paragraph');
    activeSentence.classList.add('is-structure-sentence-active');
    activeParagraph?.classList.add('is-structure-pulse-paragraph');

    updatePulse(sentence);
    syncMapActive();
  }

  function updatePulse(sentence) {
    const panel = reader().structurePanel;
    if (!panel) return;
    const level = levelOf(sentence);
    if (!level) return;
    const role = roleOf(sentence);
    const preview = cleanSentenceText(sentence);

    const levelNode = panel.querySelector('.structure-pulse-level');
    const roleNode = panel.querySelector('.structure-pulse-role');
    const previewNode = panel.querySelector('.structure-pulse-preview');
    if (levelNode) levelNode.textContent = `L${level}`;
    if (roleNode) roleNode.textContent = `${LEVEL_LABELS[level]} / ${role}`;
    if (previewNode) previewNode.textContent = preview;

    panel.querySelectorAll('.structure-pulse-lane').forEach(lane => {
      lane.classList.toggle('is-active', Number(lane.dataset.pulseLevel) === level);
    });
  }

  function syncMapActive() {
    const dialog = document.getElementById('structureMapDialog');
    if (!dialog || !activeSentence) return;
    const globalIndex = sentenceIndex(activeSentence);
    const paragraphIndex = paragraphs().indexOf(activeSentence.closest('.argument-structure-paragraph'));
    dialog.querySelectorAll('[data-structure-sentence]').forEach(button => {
      button.classList.toggle('is-active', Number(button.dataset.structureSentence) === globalIndex);
    });
    dialog.querySelectorAll('[data-structure-paragraph]').forEach(button => {
      button.classList.toggle('is-active', Number(button.dataset.structureParagraph) === paragraphIndex);
    });
  }

  function nearestSentence() {
    const items = sentences();
    if (!items.length) return null;
    const targetY = window.innerHeight * 0.42;
    let best = items[0];
    let bestDistance = Infinity;
    items.forEach(sentence => {
      const rect = sentence.getBoundingClientRect();
      const point = Math.min(Math.max(targetY, rect.top), rect.bottom);
      const distance = Math.abs(targetY - point);
      if (distance < bestDistance) {
        bestDistance = distance;
        best = sentence;
      }
    });
    return best;
  }

  function syncFromScroll() {
    if (rafPending || !location.hash.startsWith('#/essay/')) return;
    if (!reader().view?.classList.contains('argument-structure-mode')) return;
    rafPending = true;
    requestAnimationFrame(() => {
      rafPending = false;
      const sentence = nearestSentence();
      if (sentence) setActiveSentence(sentence);
    });
  }

  function installObserver() {
    sentenceObserver?.disconnect();
    if (!('IntersectionObserver' in window)) return;
    sentenceObserver = new IntersectionObserver(entries => {
      if (!reader().view?.classList.contains('argument-structure-mode')) return;
      const visible = entries
        .filter(entry => entry.isIntersecting)
        .sort((a, b) => Math.abs(a.boundingClientRect.top - window.innerHeight * 0.42) - Math.abs(b.boundingClientRect.top - window.innerHeight * 0.42));
      if (visible[0]?.target) setActiveSentence(visible[0].target);
    }, { rootMargin: '-28% 0px -42% 0px', threshold: [0, .2, .6] });
    sentences().forEach(sentence => sentenceObserver.observe(sentence));
  }

  function enhanceMobileLauncher() {
    const launcher = document.getElementById('argumentStructureLauncher');
    if (!launcher) return;
    launcher.innerHTML = '<span>Structure Map</span><span aria-hidden="true">↗</span>';
    launcher.setAttribute('aria-label', '文章のL1からL5のStructure Mapを開く');
    launcher.onclick = event => {
      event.preventDefault();
      event.stopPropagation();
      setMapOpen(true);
    };
  }

  function enhance() {
    const rows = paragraphs();
    if (!rows.length) {
      activeSentence = null;
      activeParagraph = null;
      sentenceObserver?.disconnect();
      document.getElementById('structureMapDialog')?.remove();
      return;
    }
    buildPulse();
    enhanceMobileLauncher();
    installObserver();
    const first = nearestSentence() || sentences()[0];
    if (first) updatePulse(first);
  }

  document.addEventListener('click', event => {
    if (event.target.closest('.structure-map-open')) {
      setMapOpen(true);
      return;
    }
    if (event.target.closest('[data-structure-map-close]')) {
      setMapOpen(false);
      return;
    }
    const sentenceButton = event.target.closest('[data-structure-sentence]');
    if (sentenceButton) {
      scrollToSentence(sentences()[Number(sentenceButton.dataset.structureSentence)]);
      return;
    }
    const paragraphButton = event.target.closest('[data-structure-paragraph]');
    if (paragraphButton) {
      const paragraph = paragraphs()[Number(paragraphButton.dataset.structureParagraph)];
      const sentence = paragraph?.querySelector('.argument-sentence');
      if (sentence) scrollToSentence(sentence);
    }
  });

  document.addEventListener('myessays:reader-rendered', () => requestAnimationFrame(enhance));
  document.addEventListener('myessays:reader-version-changed', () => requestAnimationFrame(enhance));
  window.addEventListener('scroll', syncFromScroll, { passive: true });
  window.addEventListener('resize', syncFromScroll, { passive: true });
  window.addEventListener('hashchange', () => {
    if (!location.hash.startsWith('#/essay/')) setMapOpen(false);
  });
  window.addEventListener('keydown', event => {
    if (event.key === 'Escape' && mapOpen) {
      event.preventDefault();
      setMapOpen(false);
    }
  });

  window.MyEssaysStructurePulse = {
    installed: true,
    refresh: enhance,
    openMap: () => setMapOpen(true),
    closeMap: () => setMapOpen(false)
  };
})();