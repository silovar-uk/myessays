(() => {
  'use strict';

  if (window.MyEssaysConceptMap?.installed) return;

  // Deliberately editorial: keywords alone do not prove a relationship.
  const MAPS = Object.freeze({
    'chinese-theme-park-npc-from-background-to-fandom': 7,
    'new-venture-four-logics-theory-vs-test-2026': 7,
    'the-live-kannai-reviews-second-stadium-economics-2026': 7,
    'inac-kobe-rokkou-island-stadium-economics-2026': 7,
    'sports-video-2766-matches-one-to-five-billion-revenue-2026': 7
  });
  const cache = new Map();
  let lastId = '';
  let activeView = 'contents';
  let displayMode = 'graph';
  let selectedId = '';
  let sectionNow = -1;
  const $ = (selector, root = document) => root.querySelector(selector);
  const el = (tag, cls, text) => {
    const node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text !== undefined) node.textContent = String(text);
    return node;
  };
  const currentId = () => window.MyEssaysRoute?.parse?.().articleId || '';
  const mapAvailable = id => Object.prototype.hasOwnProperty.call(MAPS, id);
  const sectionValid = index => Number.isInteger(index) && index >= 0;
  const resolveSection = index => {
    if (!sectionValid(index)) return false;
    return Boolean(window.MyEssaysReadingLocation?.scrollToSection?.(index, { behavior: 'smooth' }));
  };

  function fetchMap(id) {
    if (!cache.has(id)) {
      const task = fetch('data/concept-maps/' + encodeURIComponent(id) + '.json')
        .then(response => {
          if (!response.ok) throw new Error('HTTP ' + response.status);
          return response.json();
        })
        .then(data => {
          if (data?.schemaVersion !== 1 || data.articleId !== id ||
              !Array.isArray(data.nodes) || !Array.isArray(data.edges) ||
              data.nodes.length < 2 || data.nodes.length > 9 || data.edges.length > 14) {
            throw new Error('不正な関係図データ');
          }
          const ids = new Set(data.nodes.map(node => node.id));
          if (ids.size !== data.nodes.length || data.edges.some(edge => !ids.has(edge.from) || !ids.has(edge.to))) {
            throw new Error('関係図の参照が不正');
          }
          return data;
        })
        .catch(error => {
          cache.delete(id);
          throw error;
        });
      cache.set(id, task);
    }
    return cache.get(id);
  }

  function addIntroShortcut(id, activate) {
    const intro = $('.reader-v2-intro-meta');
    if (!intro || !mapAvailable(id)) return;
    intro.querySelector('.reader-concept-shortcut')?.remove();
    const button = el('button', 'reader-concept-shortcut', '思考の地図 · ' + MAPS[id] + '語');
    button.type = 'button';
    button.title = 'キーワードの関係を開く';
    button.addEventListener('click', () => {
      activate('relations');
      window.MyEssaysReaderV2?.setMapOpen?.(true);
    });
    intro.append(button);
  }

  function makeSwitch(label, selected, action) {
    const button = el('button', 'reader-concept-switch', label);
    button.type = 'button';
    button.setAttribute('aria-pressed', String(selected));
    button.addEventListener('click', action);
    return button;
  }

  function renderDiagram(data, panel, id) {
    if (id !== currentId() || !panel.isConnected) return;
    panel.replaceChildren();

    const question = el('p', 'reader-concept-question', data.question || 'この記事の重要なつながり');
    const thesis = el('p', 'reader-concept-thesis', data.shortThesis || '');
    panel.append(question, thesis);

    const modes = el('div', 'reader-concept-modes');
    const graphTab = makeSwitch('関係図', displayMode === 'graph', () => {
      displayMode = 'graph';
      renderDiagram(data, panel, id);
    });
    const flowTab = makeSwitch('流れで見る', displayMode === 'flow', () => {
      displayMode = 'flow';
      renderDiagram(data, panel, id);
    });
    modes.append(graphTab, flowTab);
    panel.append(modes);

    const byId = new Map(data.nodes.map(node => [node.id, node]));
    if (!byId.has(selectedId)) selectedId = data.nodes.find(node => node.kind === 'core')?.id || data.nodes[0].id;
    const stage = el('div', 'reader-concept-stage');
    const lines = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    lines.classList.add('reader-concept-lines');
    lines.setAttribute('viewBox', '0 0 100 100');
    lines.setAttribute('preserveAspectRatio', 'none');
    lines.setAttribute('aria-hidden', 'true');

    const nodeButtons = new Map();
    const edgeLines = [];
    for (const edge of data.edges) {
      const from = byId.get(edge.from);
      const to = byId.get(edge.to);
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', from.x);
      line.setAttribute('y1', from.y);
      line.setAttribute('x2', to.x);
      line.setAttribute('y2', to.y);
      line.classList.add('reader-concept-line');
      lines.append(line);
      edgeLines.push({ edge, line });
    }
    stage.append(lines);

    if (displayMode === 'graph') {
      const nodesLayer = el('div', 'reader-concept-nodes');
      for (const node of data.nodes) {
        const button = el('button', 'reader-concept-node', node.label);
        button.type = 'button';
        button.style.left = Number(node.x) + '%';
        button.style.top = Number(node.y) + '%';
        button.title = node.fullLabel || node.label;
        button.dataset.sectionIndex = String(node.sectionIndex);
        button.setAttribute('aria-label', (node.fullLabel || node.label) + 'の関係を表示');
        button.setAttribute('aria-pressed', String(node.id === selectedId));
        if (node.kind === 'core') button.classList.add('is-core');
        button.addEventListener('click', () => selectNode(node.id));
        nodesLayer.append(button);
        nodeButtons.set(node.id, button);
      }
      stage.append(nodesLayer);
    } else {
      stage.classList.add('is-flow');
      const list = el('div', 'reader-concept-flow');
      const sorted = [...data.nodes].sort((a, b) => (a.sectionIndex ?? 999) - (b.sectionIndex ?? 999));
      sorted.forEach((node, index) => {
        const button = el('button', 'reader-concept-flow-item');
        button.type = 'button';
        const number = el('span', 'reader-concept-flow-num', String(index + 1).padStart(2, '0'));
        const label = el('span', '', node.fullLabel || node.label);
        button.append(number, label);
        button.setAttribute('aria-pressed', String(node.id === selectedId));
        button.dataset.sectionIndex = String(node.sectionIndex);
        button.addEventListener('click', () => selectNode(node.id));
        list.append(button);
        nodeButtons.set(node.id, button);
      });
      stage.append(list);
    }

    const detail = el('section', 'reader-concept-detail');
    detail.setAttribute('aria-label', '選んだ概念の説明');
    const detailHeader = el('div', 'reader-concept-detail-head');
    const title = el('strong', '', '');
    const count = el('span', '', '');
    detailHeader.append(title, count);
    const description = el('p', 'reader-concept-description');
    const relationList = el('div', 'reader-concept-relations');
    const go = el('button', 'reader-concept-go', '本文の該当箇所へ →');
    go.type = 'button';
    detail.append(detailHeader, description, relationList, go);
    panel.append(stage, detail);
    const footer = el('p', 'reader-concept-note', '線は記事内で編集・確認した関係です。未検証の推測は明示しています。');
    panel.append(footer);

    function selectNode(idToSelect) {
      selectedId = idToSelect;
      const node = byId.get(idToSelect);
      if (!node) return;
      const related = data.edges.filter(edge => edge.from === idToSelect || edge.to === idToSelect);
      const neighbors = new Set(related.map(edge => edge.from === idToSelect ? edge.to : edge.from));
      for (const [nodeId, button] of nodeButtons) {
        const current = nodeId === idToSelect;
        button.classList.toggle('is-selected', current);
        button.classList.toggle('is-dim', !current && !neighbors.has(nodeId) && displayMode === 'graph');
        button.classList.toggle('is-reading', sectionNow >= 0 && byId.get(nodeId).sectionIndex === sectionNow);
        button.setAttribute('aria-pressed', String(current));
      }
      for (const item of edgeLines) {
        const isRelated = item.edge.from === idToSelect || item.edge.to === idToSelect;
        item.line.classList.toggle('is-highlighted', isRelated);
        item.line.classList.toggle('is-dim', !isRelated);
      }
      title.textContent = node.fullLabel || node.label;
      count.textContent = related.length + 'つの関係';
      description.textContent = node.description || '';
      relationList.replaceChildren();
      for (const edge of related) {
        const otherId = edge.from === idToSelect ? edge.to : edge.from;
        const other = byId.get(otherId);
        const item = el('div', 'reader-concept-relation');
        const summary = el('span', '', (other?.label || '') + '：' + (edge.label || edge.type || '関連'));
        item.append(summary);
        if (edge.certainty === 'interpretation' || edge.certainty === 'hypothesis') {
          item.append(el('small', '', edge.certainty === 'hypothesis' ? '仮説' : '著者の解釈'));
        }
        relationList.append(item);
      }
      go.disabled = !sectionValid(node.sectionIndex);
      go.onclick = () => {
        if (!resolveSection(node.sectionIndex)) return;
        window.MyEssaysReaderV2?.setMapOpen?.(false);
      };
    }

    selectNode(selectedId);
  }

  function attach() {
    const id = currentId();
    const body = $('.reader-v2-map-body');
    if (!body) return;
    if (id !== lastId) {
      window.MyEssaysReaderV2?.setMapOpen?.(false);
      lastId = id;
      activeView = 'contents';
      displayMode = 'graph';
      selectedId = '';
      sectionNow = -1;
    }
    if (!mapAvailable(id)) return;

    const nav = $('.reader-v2-map-nav', body);
    const summary = $('.reader-v2-map-summary', body);
    if (!nav || !summary) return;

    const tabs = el('div', 'reader-concept-tabs');
    tabs.setAttribute('role', 'group');
    tabs.setAttribute('aria-label', '記事の案内形式');
    const panel = el('section', 'reader-concept-panel');
    panel.setAttribute('aria-label', 'キーワードの関係図');

    function activate(view) {
      activeView = view;
      const enabled = view === 'relations';
      if (enabled && document.getElementById('argumentContentsPanel')?.hidden) {
        document.querySelector('[data-argument-tab="contents"]')?.click();
      }
      body.classList.toggle('reader-concept-active', enabled);
      panel.hidden = !enabled;
      tabs.querySelectorAll('button').forEach(button =>
        button.setAttribute('aria-pressed', String(button.dataset.view === view)));
      if (!enabled) return;
      panel.replaceChildren(el('p', 'reader-concept-loading', '関係図を読み込んでいます…'));
      fetchMap(id).then(data => {
        if (id === currentId() && activeView === 'relations') renderDiagram(data, panel, id);
      }).catch(() => {
        if (id !== currentId() || !panel.isConnected) return;
        panel.replaceChildren(el('p', 'reader-concept-loading', '関係図を読み込めませんでした。'));
        const retry = el('button', 'reader-concept-retry', '再試行');
        retry.type = 'button';
        retry.addEventListener('click', () => activate('relations'));
        panel.append(retry);
      });
    }

    for (const [view, label] of [['contents', '目次'], ['relations', '関係']]) {
      const button = makeSwitch(label, activeView === view, () => activate(view));
      button.dataset.view = view;
      tabs.append(button);
    }
    nav.before(tabs);
    summary.after(panel);
    panel.hidden = true;
    addIntroShortcut(id, activate);
    if (activeView === 'relations') activate('relations');
  }

  document.addEventListener('myessays:reading-location-changed', event => {
    if (event.detail?.essayId !== lastId) return;
    sectionNow = Number.isInteger(event.detail.sectionIndex) ? event.detail.sectionIndex : -1;
    const panel = $('.reader-concept-panel');
    if (!panel) return;
    panel.querySelectorAll('.reader-concept-node, .reader-concept-flow-item').forEach(button => {
      button.classList.toggle('is-reading', sectionNow >= 0 && Number(button.dataset.sectionIndex) === sectionNow);
    });
  });

  window.MyEssaysConceptMap = Object.freeze({ installed: true, attach, mapAvailable });
})();