(() => {
  'use strict';

  const INDEX_URL = 'data/versions-index.json';
  const LANGUAGE_STORAGE_KEY = 'myessays:reader-language';
  const VERSION_DEFINITIONS = {
    ja: { label: '日本語', badge: 'JA' },
    'en-mix': { label: 'English Mix', badge: 'EN MIX' },
    'es-mix': { label: 'Español Mix', badge: 'ES MIX' }
  };
  const DISPLAY_META_KEYS = ['title', 'subtitle', 'abstract'];
  const READING_BLOCK_SELECTOR = 'h2, h3, p, ul, ol, blockquote, figure, .essay-table-wrap, hr';
  const READING_LINE_RATIO = 0.28;
  const READING_EDGE_TOLERANCE = 32;
  const versionByEssay = new Map();
  const versionCache = new Map();
  let indexPromise = null;
  let switchInFlight = false;

  function currentEssayId() {
    const match = location.hash.match(/^#\/essay\/(.+)$/);
    if (!match) return '';
    try { return decodeURIComponent(match[1]); }
    catch { return match[1]; }
  }

  function originalEssay(id) {
    try {
      return typeof state !== 'undefined' && Array.isArray(state.essays)
        ? state.essays.find(essay => essay.id === id) || null
        : null;
    } catch {
      return null;
    }
  }

  async function versionsIndex() {
    if (!indexPromise) {
      indexPromise = fetch(INDEX_URL, { cache: 'no-store' })
        .then(response => {
          if (!response.ok) throw new Error(`versions-index.json: ${response.status}`);
          return response.json();
        })
        .then(data => ({ articles: data?.articles && typeof data.articles === 'object' ? data.articles : {} }))
        .catch(error => {
          console.warn('Reading versions index could not be loaded.', error);
          return { articles: {} };
        });
    }
    return indexPromise;
  }

  function parseVersionMarkdown(text) {
    try {
      if (typeof parseFrontMatter === 'function') return parseFrontMatter(String(text || ''));
    } catch {}

    const value = String(text || '');
    const match = value.match(/^---\n([\s\S]*?)\n---\n?/);
    if (!match) return { meta: {}, body: value };
    const meta = {};
    for (const line of match[1].split('\n')) {
      const idx = line.indexOf(':');
      if (idx === -1) continue;
      const key = line.slice(0, idx).trim();
      const raw = line.slice(idx + 1).trim();
      try { meta[key] = JSON.parse(raw); }
      catch { meta[key] = raw.replace(/^['"]|['"]$/g, ''); }
    }
    return { meta, body: value.slice(match[0].length) };
  }

  async function versionDocument(id, version) {
    const key = `${id}:${version}`;
    if (versionCache.has(key)) return versionCache.get(key);

    const index = await versionsIndex();
    const path = index?.articles?.[id]?.[version];
    if (!path) return null;

    const task = fetch(path, { cache: 'no-store' })
      .then(response => {
        if (!response.ok) throw new Error(`${path}: ${response.status}`);
        return response.text();
      })
      .then(parseVersionMarkdown)
      .catch(error => {
        console.warn(`Reading version could not be loaded: ${id}/${version}`, error);
        return null;
      });
    versionCache.set(key, task);
    return task;
  }

  function buildVersionEssay(original, document, version) {
    if (!original || !document?.body) return null;
    const next = {
      ...original,
      body: document.body,
      metrics: typeof readingMetrics === 'function' ? readingMetrics(document.body) : original.metrics,
      __readingVersion: version
    };
    DISPLAY_META_KEYS.forEach(key => {
      const value = document?.meta?.[key];
      if (typeof value === 'string' && value.trim()) next[key] = value.trim();
    });
    next.id = original.id;
    return next;
  }

  function currentRenderedVersion() {
    try { return state?.currentEssay?.__readingVersion || 'ja'; }
    catch { return 'ja'; }
  }

  function preferredVersion() {
    try {
      const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
      return VERSION_DEFINITIONS[stored] ? stored : 'ja';
    } catch {
      return 'ja';
    }
  }

  function rememberPreferredVersion(version) {
    if (!VERSION_DEFINITIONS[version]) return;
    try { localStorage.setItem(LANGUAGE_STORAGE_KEY, version); }
    catch {}
  }

  function clamp(value, min = 0, max = 1) {
    return Math.min(max, Math.max(min, value));
  }

  function readerContent() {
    return document.getElementById('readerContent');
  }

  function readingBlocks(content) {
    return content ? [...content.querySelectorAll(READING_BLOCK_SELECTOR)] : [];
  }

  function contentPointForViewport(content, viewportY) {
    const rect = content.getBoundingClientRect();
    return clamp((viewportY - rect.top) / Math.max(rect.height, 1));
  }

  function activeSectionIndex(headings, viewportY) {
    let index = -1;
    for (let i = 0; i < headings.length; i += 1) {
      if (headings[i].getBoundingClientRect().top <= viewportY) index = i;
      else break;
    }
    return index;
  }

  function blocksInSection(blocks, headings, sectionIndex) {
    if (!blocks.length) return [];
    if (sectionIndex < 0) {
      const firstHeadingIndex = headings[0] ? blocks.indexOf(headings[0]) : -1;
      return firstHeadingIndex >= 0 ? blocks.slice(0, firstHeadingIndex) : blocks;
    }
    const startHeading = headings[sectionIndex];
    if (!startHeading) return [];
    const start = blocks.indexOf(startHeading);
    if (start < 0) return [];
    const nextHeading = headings[sectionIndex + 1];
    const end = nextHeading ? blocks.indexOf(nextHeading) : blocks.length;
    return blocks.slice(start, end >= 0 ? end : blocks.length);
  }

  function nearestReadingBlock(blocks, viewportY) {
    if (!blocks.length) return { index: -1, progress: 0 };
    let bestIndex = 0;
    let bestDistance = Infinity;
    blocks.forEach((block, index) => {
      const rect = block.getBoundingClientRect();
      const point = clamp(viewportY, rect.top, rect.bottom);
      const distance = Math.abs(viewportY - point);
      if (distance < bestDistance) {
        bestDistance = distance;
        bestIndex = index;
      }
    });
    const rect = blocks[bestIndex].getBoundingClientRect();
    return {
      index: bestIndex,
      progress: clamp((viewportY - rect.top) / Math.max(rect.height, 1))
    };
  }

  function captureReadingPosition() {
    const content = readerContent();
    if (!content) return null;
    const viewportY = window.innerHeight * READING_LINE_RATIO;
    const headings = [...content.querySelectorAll('h2')];
    const blocks = readingBlocks(content);
    const sectionIndex = activeSectionIndex(headings, viewportY);
    const sectionBlocks = blocksInSection(blocks, headings, sectionIndex);
    const current = nearestReadingBlock(sectionBlocks, viewportY);
    const blockRatio = current.index >= 0 && sectionBlocks.length
      ? clamp((current.index + current.progress) / sectionBlocks.length)
      : 0;
    return {
      sectionIndex,
      blockRatio,
      articleProgress: contentPointForViewport(content, viewportY),
      atTop: window.scrollY <= READING_EDGE_TOLERANCE,
      atBottom: window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - READING_EDGE_TOLERANCE
    };
  }

  function targetPointFromSnapshot(snapshot) {
    const content = readerContent();
    if (!content || !snapshot) return null;
    const headings = [...content.querySelectorAll('h2')];
    const blocks = readingBlocks(content);
    if (snapshot.sectionIndex < headings.length) {
      const sectionBlocks = blocksInSection(blocks, headings, snapshot.sectionIndex);
      if (sectionBlocks.length) {
        const scaled = clamp(snapshot.blockRatio) * sectionBlocks.length;
        const index = Math.min(sectionBlocks.length - 1, Math.floor(scaled));
        const progress = clamp(scaled - index);
        const rect = sectionBlocks[index].getBoundingClientRect();
        return rect.top + window.scrollY + (rect.height * progress);
      }
    }
    const rect = content.getBoundingClientRect();
    return rect.top + window.scrollY + (rect.height * clamp(snapshot.articleProgress));
  }

  function restoreReadingPosition(snapshot) {
    return new Promise(resolve => {
      requestAnimationFrame(() => requestAnimationFrame(() => {
        if (!snapshot) return resolve();
        if (snapshot.atTop) {
          window.scrollTo({ top: 0, behavior: 'auto' });
          return resolve();
        }
        if (snapshot.atBottom) {
          window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'auto' });
          return resolve();
        }
        const targetPageY = targetPointFromSnapshot(snapshot);
        if (targetPageY == null) return resolve();
        const desiredViewportY = window.innerHeight * READING_LINE_RATIO;
        window.scrollTo({ top: Math.max(0, targetPageY - desiredViewportY), behavior: 'auto' });
        resolve();
      }));
    });
  }

  function setDisclosureOpen(switcher, open, { focusTrigger = false } = {}) {
    if (!switcher) return;
    const trigger = switcher.querySelector('.reader-language-trigger');
    const menu = switcher.querySelector('.reader-language-menu');
    const nextOpen = Boolean(open && !switcher.hidden);
    switcher.classList.toggle('is-open', nextOpen);
    if (trigger) trigger.setAttribute('aria-expanded', String(nextOpen));
    if (menu) menu.hidden = !nextOpen;
    if (!nextOpen && focusTrigger) trigger?.focus();
  }

  function ensureSwitchElement() {
    let switcher = document.getElementById('readerLanguageSwitch');
    if (switcher) return switcher;

    switcher = document.createElement('div');
    switcher.id = 'readerLanguageSwitch';
    switcher.className = 'reader-language-switch';
    switcher.hidden = true;
    switcher.setAttribute('aria-label', '表示言語');
    switcher.innerHTML = `
      <button class="reader-language-trigger" type="button" aria-expanded="false" aria-controls="readerLanguageMenu" aria-haspopup="menu">
        <span class="reader-language-current">JA</span>
        <span class="reader-language-chevron" aria-hidden="true">⌄</span>
      </button>
      <div id="readerLanguageMenu" class="reader-language-menu" role="menu" aria-label="表示言語を選択" hidden>
        <span class="reader-language-menu-label">LANGUAGE</span>
        <div class="reader-language-options"></div>
      </div>`;

    switcher.addEventListener('click', event => {
      const trigger = event.target.closest('.reader-language-trigger');
      if (trigger) {
        setDisclosureOpen(switcher, trigger.getAttribute('aria-expanded') !== 'true');
        return;
      }

      const button = event.target.closest('[data-reader-version]');
      if (!button || button.disabled) return;
      const next = button.dataset.readerVersion;
      if (!VERSION_DEFINITIONS[next]) return;
      setDisclosureOpen(switcher, false);
      if (next === currentRenderedVersion()) {
        rememberPreferredVersion(next);
        versionByEssay.set(currentEssayId(), next);
        return;
      }
      switchVersion(next);
    });

    document.body.append(switcher);
    return switcher;
  }

  function renderDisclosure(switcher, availableVersions, activeVersion) {
    const triggerCurrent = switcher.querySelector('.reader-language-current');
    const options = switcher.querySelector('.reader-language-options');
    if (!triggerCurrent || !options) return;

    const versions = ['ja', ...availableVersions.filter(key => key !== 'ja' && VERSION_DEFINITIONS[key])];
    const activeDefinition = VERSION_DEFINITIONS[activeVersion] || VERSION_DEFINITIONS.ja;
    triggerCurrent.textContent = activeDefinition.badge;
    switcher.querySelector('.reader-language-trigger')?.setAttribute('aria-label', `表示言語: ${activeDefinition.label}`);

    options.innerHTML = versions.map(version => {
      const definition = VERSION_DEFINITIONS[version];
      const active = version === activeVersion;
      return `<button type="button" role="menuitemradio" data-reader-version="${version}" class="reader-language-option${active ? ' is-active' : ''}" aria-checked="${active}"><span class="reader-language-check" aria-hidden="true">${active ? '✓' : ''}</span><span>${definition.label}</span><small>${definition.badge}</small></button>`;
    }).join('');
  }

  async function switchVersion(version) {
    if (switchInFlight) return;
    const id = currentEssayId();
    if (!id) return;
    const original = originalEssay(id);
    if (!original || typeof showReader !== 'function') return;

    switchInFlight = true;
    try {
      let nextEssay = original;
      if (version !== 'ja') {
        const versionDoc = await versionDocument(id, version);
        if (!versionDoc || id !== currentEssayId()) return;
        nextEssay = buildVersionEssay(original, versionDoc, version);
        if (!nextEssay) return;
      }

      const readingPosition = captureReadingPosition();
      const previousScrollY = window.scrollY;
      versionByEssay.set(id, version);
      showReader(nextEssay);
      window.scrollTo({ top: previousScrollY, behavior: 'auto' });
      await restoreReadingPosition(readingPosition);
      rememberPreferredVersion(version);

      document.dispatchEvent(new CustomEvent('myessays:reader-version-changed', {
        detail: { essayId: id, version }
      }));
      document.dispatchEvent(new CustomEvent('myessays:reader-language-changed', {
        detail: { essayId: id, mode: version }
      }));
    } finally {
      switchInFlight = false;
    }
  }

  async function ensureVersionSwitch() {
    const switcher = ensureSwitchElement();
    const id = currentEssayId();
    const reader = document.getElementById('readerView');
    const readerIsOpen = Boolean(id && reader && !reader.hidden);
    if (!readerIsOpen) {
      switcher.hidden = true;
      setDisclosureOpen(switcher, false);
      return;
    }

    const index = await versionsIndex();
    if (id !== currentEssayId()) return;
    const availableVersions = Object.keys(index?.articles?.[id] || {}).filter(key => VERSION_DEFINITIONS[key]);
    const hasAlternative = availableVersions.length > 0;
    switcher.hidden = !hasAlternative;
    if (!hasAlternative) {
      setDisclosureOpen(switcher, false);
      return;
    }

    const rendered = currentRenderedVersion();
    const preferred = preferredVersion();
    let desired = rendered;
    if (!switchInFlight) {
      desired = preferred === 'ja' || availableVersions.includes(preferred) ? preferred : 'ja';
    }
    versionByEssay.set(id, desired);
    renderDisclosure(switcher, availableVersions, desired);
    if (!switchInFlight && desired !== rendered) switchVersion(desired);
  }

  function syncAfterRender() {
    const id = currentEssayId();
    if (!id) return;
    if (!versionByEssay.has(id)) versionByEssay.set(id, currentRenderedVersion());
    requestAnimationFrame(ensureVersionSwitch);
  }

  document.addEventListener('click', event => {
    const switcher = document.getElementById('readerLanguageSwitch');
    if (!switcher || switcher.hidden || !switcher.classList.contains('is-open')) return;
    if (!switcher.contains(event.target)) setDisclosureOpen(switcher, false);
  });

  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    const switcher = document.getElementById('readerLanguageSwitch');
    if (!switcher?.classList.contains('is-open')) return;
    event.preventDefault();
    event.stopPropagation();
    setDisclosureOpen(switcher, false, { focusTrigger: true });
  });

  document.addEventListener('myessays:reader-rendered', syncAfterRender);
  document.addEventListener('myessays:reader-ready', ensureVersionSwitch);
  document.addEventListener('myessays:reader-version-changed', ensureVersionSwitch);
  window.addEventListener('hashchange', () => {
    const id = currentEssayId();
    const switcher = document.getElementById('readerLanguageSwitch');
    setDisclosureOpen(switcher, false);
    if (id && !versionByEssay.has(id)) versionByEssay.set(id, preferredVersion());
    requestAnimationFrame(ensureVersionSwitch);
  });
  window.addEventListener('pageshow', () => requestAnimationFrame(ensureVersionSwitch));

  document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', ensureVersionSwitch)
    : ensureVersionSwitch();
})();