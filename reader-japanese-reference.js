(() => {
  'use strict';

  const CONFIG = Object.freeze({
    breakpoint: 980,
    anchor: 0.46,
    weak: 0.28,
    maxNearGap: 5
  });
  const JA_RE = /[\u3040-\u30ff\u3400-\u9fff々〆ヵヶ]{2,}/g;
  const EN_RE = /[A-Za-z][A-Za-z0-9_-]{3,}/g;
  const NUM_RE = /\d+(?:[.,]\d+)*/g;
  const BLOCK_SELECTOR = 'h2,h3,p,li';

  const norm = value => String(value || '').normalize('NFKC').replace(/\s+/g, ' ').trim().toLowerCase();

  function tokens(value = '') {
    const text = norm(value);
    const out = [];
    (text.match(JA_RE) || []).forEach(run => {
      if (run.length <= 3) out.push(run);
      else for (let i = 0; i <= run.length - 3; i += 1) out.push(run.slice(i, i + 3));
    });
    out.push(...(text.match(EN_RE) || []), ...(text.match(NUM_RE) || []));
    return new Set(out);
  }

  function similarity(left = '', right = '') {
    const a = norm(left), b = norm(right);
    if (!a || !b) return 0;
    if (a === b) return 1;
    const aa = tokens(a), bb = tokens(b);
    if (!aa.size || !bb.size) return 0;
    let common = 0;
    aa.forEach(token => { if (bb.has(token)) common += 1; });
    if (!common) return 0;
    const containment = common / Math.min(aa.size, bb.size);
    const dice = (2 * common) / (aa.size + bb.size);
    const evidence = common >= 3 ? 1 : common === 2 ? .88 : .56;
    return Math.min(1, ((containment * .72) + (dice * .28)) * evidence);
  }

  function projectedIndex(index, sourceCount, targetCount) {
    if (targetCount <= 1 || sourceCount <= 1) return 0;
    return Math.max(0, Math.min(targetCount - 1, Math.round((index * (targetCount - 1)) / (sourceCount - 1))));
  }

  function anchors(source, target) {
    const dp = Array.from({ length: source.length + 1 }, () => Array(target.length + 1).fill(0));
    const step = Array.from({ length: source.length + 1 }, () => Array(target.length + 1).fill(''));
    for (let i = 1; i <= source.length; i += 1) {
      for (let j = 1; j <= target.length; j += 1) {
        const score = similarity(source[i - 1], target[j - 1]);
        const diag = score >= CONFIG.anchor ? dp[i - 1][j - 1] + score : -Infinity;
        if (diag >= dp[i - 1][j] && diag >= dp[i][j - 1]) {
          dp[i][j] = diag;
          step[i][j] = 'd';
        } else if (dp[i - 1][j] >= dp[i][j - 1]) {
          dp[i][j] = dp[i - 1][j];
          step[i][j] = 'u';
        } else {
          dp[i][j] = dp[i][j - 1];
          step[i][j] = 'l';
        }
      }
    }

    const found = [];
    let i = source.length;
    let j = target.length;
    while (i && j) {
      if (step[i][j] === 'd') {
        found.push({ source: i - 1, target: j - 1, score: similarity(source[i - 1], target[j - 1]) });
        i -= 1;
        j -= 1;
      } else if (step[i][j] === 'u') i -= 1;
      else j -= 1;
    }
    return found.reverse();
  }

  function fillGap(result, source, target, ss, se, ts, te, bounded) {
    const sc = se - ss;
    const tc = te - ts;
    if (sc <= 0 || tc <= 0) return;

    // Paragraph identity is structural first. If a translated section keeps
    // the same number and order of blocks, wording similarity is irrelevant.
    if (sc === tc) {
      for (let k = 0; k < sc; k += 1) {
        result[ss + k] = { target: ts + k, confidence: bounded ? 'pair-sequence' : 'pair-sequence-edge' };
      }
      return;
    }

    if (Math.abs(sc - tc) <= 1 && Math.max(sc, tc) <= CONFIG.maxNearGap) {
      for (let k = 0; k < sc; k += 1) {
        const projected = Math.max(0, Math.min(tc - 1, Math.round((((k + .5) * tc) / sc) - .5)));
        result[ss + k] = { target: ts + projected, confidence: bounded ? 'pair-near' : 'pair-near-edge' };
      }
      return;
    }

    for (let si = ss; si < se; si += 1) {
      let best = null;
      for (let ti = ts; ti < te; ti += 1) {
        const score = similarity(source[si], target[ti]);
        if (!best || score > best.score) best = { target: ti, score };
      }
      if (best?.score >= CONFIG.weak) result[si] = { target: best.target, confidence: 'text-anchor' };
    }
  }

  function completeByPosition(result, source, target) {
    if (!target.length) return result;
    for (let i = 0; i < result.length; i += 1) {
      if (result[i]) continue;
      result[i] = {
        target: projectedIndex(i, source.length, target.length),
        confidence: 'pair-position'
      };
    }
    return result;
  }

  function align(source = [], target = []) {
    const result = Array(source.length).fill(null);
    if (!source.length || !target.length) return result;

    if (source.length === target.length) {
      return source.map((_, index) => ({ target: index, confidence: 'pair-order' }));
    }

    const fixed = anchors(source, target);
    fixed.forEach(item => {
      result[item.source] = {
        target: item.target,
        confidence: item.score >= .82 ? 'exact' : 'text-anchor'
      };
    });

    const bounds = [
      { source: -1, target: -1, edge: true },
      ...fixed,
      { source: source.length, target: target.length, edge: true }
    ];
    for (let i = 0; i < bounds.length - 1; i += 1) {
      const a = bounds[i];
      const b = bounds[i + 1];
      fillGap(result, source, target, a.source + 1, b.source, a.target + 1, b.target, !a.edge && !b.edge);
    }
    return completeByPosition(result, source, target);
  }

  function textOf(element) {
    const clone = element.cloneNode(true);
    clone.querySelectorAll('br').forEach(br => br.replaceWith('\n'));
    return String(clone.textContent || '').replace(/\n{3,}/g, '\n\n').trim();
  }

  function eligibleBlocks(root) {
    if (!root) return [];
    return [...root.querySelectorAll(BLOCK_SELECTOR)].filter(el => {
      if (el.closest('.footnotes')) return false;
      if (el.tagName === 'LI' && el.querySelector(':scope > p')) return false;
      if (el.closest('.reader-mode-bar,.reader-compare-view,.language-lens-panel')) return false;
      return true;
    });
  }

  function sections(root) {
    const list = [{ heading: null, blocks: [] }];
    eligibleBlocks(root).forEach(el => {
      if (el.tagName === 'H2') list.push({ heading: el, blocks: [] });
      else list[list.length - 1].blocks.push(el);
    });
    return list;
  }

  function pairKey(sectionIndex, blockIndex, type = 'block') {
    const section = String(sectionIndex).padStart(2, '0');
    if (type === 'heading') return `s${section}-heading`;
    return `s${section}-b${String(blockIndex).padStart(3, '0')}`;
  }

  function annotateCanonical(root) {
    const canonicalSections = sections(root);
    canonicalSections.forEach((section, sectionIndex) => {
      if (section.heading) {
        section.heading.dataset.pairId = section.heading.dataset.pairId || pairKey(sectionIndex, 0, 'heading');
        section.heading.dataset.pairConfidence = 'canonical';
      }
      section.blocks.forEach((block, blockIndex) => {
        block.dataset.pairId = block.dataset.pairId || pairKey(sectionIndex, blockIndex);
        block.dataset.pairConfidence = 'canonical';
      });
    });
    return root;
  }

  function annotateAgainstCanonical(root, canonicalRoot) {
    if (!root || !canonicalRoot) return root;
    annotateCanonical(canonicalRoot);
    const sourceSections = sections(root);
    const canonicalSections = sections(canonicalRoot);
    const count = Math.min(sourceSections.length, canonicalSections.length);

    for (let s = 0; s < count; s += 1) {
      const source = sourceSections[s];
      const canonical = canonicalSections[s];
      if (source.heading && canonical.heading) {
        source.heading.dataset.pairId = canonical.heading.dataset.pairId;
        source.heading.dataset.pairConfidence = 'heading';
      }
      const mapping = align(source.blocks.map(textOf), canonical.blocks.map(textOf));
      mapping.forEach((match, index) => {
        const sourceBlock = source.blocks[index];
        const canonicalBlock = match ? canonical.blocks[match.target] : null;
        if (!sourceBlock || !canonicalBlock) return;
        sourceBlock.dataset.pairId = canonicalBlock.dataset.pairId;
        sourceBlock.dataset.pairConfidence = match.confidence || 'pair';
      });
    }

    // If heading structures differ, recover any still-unpaired block from the
    // document-wide reading order. This is the final compatibility fallback.
    const sourceAll = eligibleBlocks(root);
    const canonicalAll = eligibleBlocks(canonicalRoot);
    sourceAll.forEach((block, index) => {
      if (block.dataset.pairId || !canonicalAll.length) return;
      const targetIndex = projectedIndex(index, sourceAll.length, canonicalAll.length);
      const canonicalBlock = canonicalAll[targetIndex];
      block.dataset.pairId = canonicalBlock?.dataset.pairId || `doc-b${String(targetIndex).padStart(4, '0')}`;
      block.dataset.pairConfidence = 'pair-position';
    });
    return root;
  }

  function findByPairId(root, pairId) {
    if (!root || !pairId) return null;
    return eligibleBlocks(root).find(block => block.dataset.pairId === pairId) || null;
  }

  const pairApi = Object.freeze({
    similarity,
    align,
    projectedIndex,
    pairKey,
    textOf,
    eligibleBlocks,
    sections,
    annotateCanonical,
    annotateAgainstCanonical,
    findByPairId
  });

  if (typeof module !== 'undefined' && module.exports) module.exports = pairApi;
  if (typeof window !== 'undefined') window.MyEssaysPairIdentity = pairApi;
  if (typeof document === 'undefined') return;

  const view = document.getElementById('readerView');
  const content = document.getElementById('readerContent');
  if (!view || !content) return;

  const references = new WeakMap();
  let version = 'ja';
  let essayId = '';
  let timer = 0;

  function renderRoot(markdown) {
    const root = document.createElement('div');
    const render = window.MyEssaysMarkdown?.render || window.renderMarkdown;
    if (typeof render !== 'function') return root;
    root.innerHTML = render(markdown || '');
    return root;
  }

  function panel() {
    let el = document.getElementById('japaneseReferencePanel');
    if (el) return el;
    el = document.createElement('aside');
    el.id = 'japaneseReferencePanel';
    el.className = 'japanese-reference-panel';
    el.hidden = true;
    el.setAttribute('aria-label', '選択した外国語Mixと日本語版の比較');
    el.innerHTML = '<div class="japanese-reference-handle" aria-hidden="true"></div><div class="japanese-reference-head"><div><p class="japanese-reference-kicker">BILINGUAL COMPARE</p><h2>選択箇所</h2></div><button class="japanese-reference-close" type="button" aria-label="比較を閉じる">×</button></div><p class="japanese-reference-status" aria-live="polite"></p><section class="japanese-reference-block japanese-reference-selected"><p class="japanese-reference-label">SELECTED</p><div class="japanese-reference-selected-text"></div></section><section class="japanese-reference-block japanese-reference-original"><p class="japanese-reference-label">JAPANESE ORIGINAL</p><div class="japanese-reference-text"></div></section>';
    view.appendChild(el);
    el.querySelector('.japanese-reference-close')?.addEventListener('click', () => { el.hidden = true; });
    return el;
  }

  function closePanel() {
    const el = document.getElementById('japaneseReferencePanel');
    if (el) el.hidden = true;
  }

  function show(reference, selectedText) {
    const el = panel();
    const status = el.querySelector('.japanese-reference-status');
    const selected = el.querySelector('.japanese-reference-selected-text');
    const body = el.querySelector('.japanese-reference-text');
    const originalBlock = el.querySelector('.japanese-reference-original');
    selected.textContent = selectedText || '';
    el.dataset.pairId = reference?.pairId || '';

    if (!reference?.text) {
      status.textContent = 'この位置に対応する日本語段落がありません';
      body.textContent = '';
      originalBlock.hidden = true;
    } else {
      const positional = reference.confidence === 'pair-position';
      status.textContent = positional ? '対応する日本語段落（段落位置で対応）' : '対応する日本語段落';
      body.textContent = reference.text;
      originalBlock.hidden = false;
    }
    el.hidden = false;
  }

  function mount(ctx) {
    essayId = ctx.essayId;
    try { version = state?.currentEssay?.__readingVersion || 'ja'; }
    catch { version = 'ja'; }
    closePanel();
    references.clear?.();
    content.dataset.pairIdentity = '';

    const canonicalRoot = renderRoot(ctx.essay?.body || '');
    annotateCanonical(canonicalRoot);

    if (version === 'ja') {
      annotateCanonical(ctx.root);
    } else {
      annotateAgainstCanonical(ctx.root, canonicalRoot);
      eligibleBlocks(ctx.root).forEach(block => {
        const pairId = block.dataset.pairId;
        const canonicalBlock = findByPairId(canonicalRoot, pairId);
        if (!canonicalBlock) return;
        references.set(block, {
          text: textOf(canonicalBlock),
          confidence: block.dataset.pairConfidence || 'pair',
          pairId
        });
      });
    }

    content.dataset.pairIdentity = 'ready';
    document.dispatchEvent(new CustomEvent('myessays:pair-identity-ready', {
      detail: { essayId, version }
    }));
  }

  function closestBlock(node) {
    let element = node;
    if (element?.nodeType === Node.TEXT_NODE) element = element.parentElement;
    return element?.closest?.(BLOCK_SELECTOR) || null;
  }

  function selectionContext() {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed || !selection.rangeCount) return null;
    const text = selection.toString().trim();
    if (!text) return null;
    const range = selection.getRangeAt(0);
    const startBlock = closestBlock(range.startContainer);
    const endBlock = closestBlock(range.endContainer);
    const touchesContent = Boolean(
      (startBlock && content.contains(startBlock)) ||
      (endBlock && content.contains(endBlock))
    );
    if (!touchesContent) return null;
    if (!startBlock || !endBlock || startBlock !== endBlock || !content.contains(startBlock)) return { invalid: true };
    return { block: startBlock, text };
  }

  function resolve() {
    clearTimeout(timer);
    if (view.hidden || version === 'ja' || essayId !== (content.dataset.readerEssayId || essayId)) return;
    const selection = selectionContext();
    if (selection?.invalid) {
      closePanel();
      return;
    }
    if (selection?.block) show(references.get(selection.block) || null, selection.text);
  }

  const schedule = delay => {
    clearTimeout(timer);
    timer = setTimeout(resolve, delay);
  };

  content.addEventListener('pointerup', event => {
    if (event.pointerType !== 'touch') schedule(50);
  });
  content.addEventListener('touchend', () => schedule(240), { passive: true });
  document.addEventListener('selectionchange', () => {
    if (!view.hidden && version !== 'ja') {
      schedule(matchMedia(`(max-width:${CONFIG.breakpoint}px)`).matches ? 240 : 180);
    }
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closePanel();
  });
  window.addEventListener('hashchange', closePanel);
  document.addEventListener('myessays:reader-version-changed', event => {
    if (event.detail?.version === 'ja') closePanel();
  });

  if (window.MyEssaysReaderRuntime?.register) {
    window.MyEssaysReaderRuntime.register('pair-identity', mount, { priority: 8 });
  } else {
    document.addEventListener('myessays:reader-ready', event => mount(event.detail));
  }
})();