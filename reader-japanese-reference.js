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

  function anchors(mix, ja) {
    const dp = Array.from({ length: mix.length + 1 }, () => Array(ja.length + 1).fill(0));
    const step = Array.from({ length: mix.length + 1 }, () => Array(ja.length + 1).fill(''));
    for (let i = 1; i <= mix.length; i += 1) {
      for (let j = 1; j <= ja.length; j += 1) {
        const score = similarity(mix[i - 1], ja[j - 1]);
        const diag = score >= CONFIG.anchor ? dp[i - 1][j - 1] + score : -Infinity;
        if (diag >= dp[i - 1][j] && diag >= dp[i][j - 1]) {
          dp[i][j] = diag; step[i][j] = 'd';
        } else if (dp[i - 1][j] >= dp[i][j - 1]) {
          dp[i][j] = dp[i - 1][j]; step[i][j] = 'u';
        } else {
          dp[i][j] = dp[i][j - 1]; step[i][j] = 'l';
        }
      }
    }
    const found = [];
    let i = mix.length, j = ja.length;
    while (i && j) {
      if (step[i][j] === 'd') {
        found.push({ mix: i - 1, ja: j - 1, score: similarity(mix[i - 1], ja[j - 1]) });
        i -= 1; j -= 1;
      } else if (step[i][j] === 'u') i -= 1;
      else j -= 1;
    }
    return found.reverse();
  }

  function fillGap(result, mix, ja, ms, me, js, je, bounded) {
    const mc = me - ms, jc = je - js;
    if (mc <= 0 || jc <= 0) return;

    // Paragraph identity is structural first: if both versions kept the same
    // number and order of blocks in this gap, pair them directly regardless
    // of how much the wording/language changed.
    if (mc === jc) {
      for (let k = 0; k < mc; k += 1) result[ms + k] = { ja: js + k, confidence: bounded ? 'pair-sequence' : 'pair-sequence-edge' };
      return;
    }

    if (Math.abs(mc - jc) <= 1 && Math.max(mc, jc) <= CONFIG.maxNearGap) {
      for (let k = 0; k < mc; k += 1) {
        const projected = Math.max(0, Math.min(jc - 1, Math.round((((k + .5) * jc) / mc) - .5)));
        result[ms + k] = { ja: js + projected, confidence: bounded ? 'pair-near' : 'pair-near-edge' };
      }
      return;
    }

    for (let mi = ms; mi < me; mi += 1) {
      let best = null;
      for (let ji = js; ji < je; ji += 1) {
        const score = similarity(mix[mi], ja[ji]);
        if (!best || score > best.score) best = { ja: ji, score };
      }
      if (best?.score >= CONFIG.weak) result[mi] = { ja: best.ja, confidence: 'text-signal' };
    }
  }

  function completeByPosition(result, mix, ja) {
    if (!ja.length) return result;
    for (let i = 0; i < result.length; i += 1) {
      if (result[i]) continue;
      result[i] = {
        ja: projectedIndex(i, mix.length, ja.length),
        confidence: 'pair-position'
      };
    }
    return result;
  }

  function align(mix = [], ja = []) {
    const result = Array(mix.length).fill(null);
    if (!mix.length || !ja.length) return result;

    // The normal English Mix authoring contract preserves paragraph order.
    // Equal block counts therefore mean identity by position, not similarity.
    if (mix.length === ja.length) {
      return mix.map((_, index) => ({ ja: index, confidence: 'pair-order' }));
    }

    // Mismatched structures use text only as an anchor, then preserve sequence
    // around those anchors. Any remaining block receives a monotonic positional
    // fallback so a wording change never becomes a user-facing lookup failure.
    const fixed = anchors(mix, ja);
    fixed.forEach(item => { result[item.mix] = { ja: item.ja, confidence: item.score >= .82 ? 'exact' : 'text-anchor' }; });
    const bounds = [{ mix: -1, ja: -1, edge: true }, ...fixed, { mix: mix.length, ja: ja.length, edge: true }];
    for (let i = 0; i < bounds.length - 1; i += 1) {
      const a = bounds[i], b = bounds[i + 1];
      fillGap(result, mix, ja, a.mix + 1, b.mix, a.ja + 1, b.ja, !a.edge && !b.edge);
    }
    return completeByPosition(result, mix, ja);
  }

  function pairKey(sectionIndex, blockIndex, type = 'block') {
    const section = String(sectionIndex).padStart(2, '0');
    if (type === 'heading') return `s${section}-heading`;
    return `s${section}-b${String(blockIndex).padStart(3, '0')}`;
  }

  const pairApi = { similarity, align, pairKey, projectedIndex };
  if (typeof module !== 'undefined' && module.exports) module.exports = pairApi;
  if (typeof window !== 'undefined') window.MyEssaysPairIdentity = pairApi;
  if (typeof document === 'undefined') return;

  const view = document.getElementById('readerView');
  const content = document.getElementById('readerContent');
  if (!view || !content) return;

  const refs = new WeakMap();
  let version = 'ja', essayId = '', timer = 0;

  function textOf(element) {
    const clone = element.cloneNode(true);
    clone.querySelectorAll('br').forEach(br => br.replaceWith('\n'));
    return String(clone.textContent || '').replace(/\n{3,}/g, '\n\n').trim();
  }

  function eligibleBlocks(root) {
    return [...root.querySelectorAll(BLOCK_SELECTOR)].filter(el => {
      if (el.closest('.footnotes')) return false;
      if (el.tagName === 'LI' && el.querySelector(':scope > p')) return false;
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

  function setPairIdentity(mixBlock, jaBlock, id, confidence) {
    if (!mixBlock || !jaBlock) return;
    const canonicalId = jaBlock.dataset.pairId || id;
    jaBlock.dataset.pairId = canonicalId;
    mixBlock.dataset.pairId = canonicalId;
    mixBlock.dataset.pairConfidence = confidence || 'pair';
    refs.set(mixBlock, {
      text: textOf(jaBlock),
      confidence: confidence || 'pair',
      pairId: canonicalId
    });
  }

  function panel() {
    let el = document.getElementById('japaneseReferencePanel');
    if (el) return el;
    el = document.createElement('aside');
    el.id = 'japaneseReferencePanel';
    el.className = 'japanese-reference-panel';
    el.hidden = true;
    el.setAttribute('aria-label', '選択したEnglish Mixと日本語版の比較');
    el.innerHTML = '<div class="japanese-reference-handle" aria-hidden="true"></div><div class="japanese-reference-head"><div><p class="japanese-reference-kicker">BILINGUAL COMPARE</p><h2>選択箇所</h2></div><button class="japanese-reference-close" type="button" aria-label="比較を閉じる">×</button></div><p class="japanese-reference-status" aria-live="polite"></p><section class="japanese-reference-block japanese-reference-selected"><p class="japanese-reference-label">SELECTED · ENGLISH MIX</p><div class="japanese-reference-selected-text"></div></section><section class="japanese-reference-block japanese-reference-original"><p class="japanese-reference-label">JAPANESE ORIGINAL</p><div class="japanese-reference-text"></div></section>';
    view.appendChild(el);
    el.querySelector('.japanese-reference-close').addEventListener('click', () => { el.hidden = true; });
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
    try { version = state?.currentEssay?.__readingVersion || 'ja'; } catch { version = 'ja'; }
    closePanel();
    content.dataset.pairIdentity = '';
    if (version !== 'en-mix') return;

    const canonical = document.createElement('div');
    const render = window.MyEssaysMarkdown?.render || window.renderMarkdown;
    if (typeof render !== 'function') return;
    canonical.innerHTML = render(ctx.essay?.body || '');
    const mixSections = sections(ctx.root), jaSections = sections(canonical);
    const count = Math.min(mixSections.length, jaSections.length);

    for (let s = 0; s < count; s += 1) {
      const mix = mixSections[s], ja = jaSections[s];
      if (mix.heading && ja.heading) {
        setPairIdentity(mix.heading, ja.heading, pairKey(s, 0, 'heading'), 'heading');
      }
      const mapping = align(mix.blocks.map(textOf), ja.blocks.map(textOf));
      mapping.forEach((match, i) => {
        if (!match || !ja.blocks[match.ja]) return;
        setPairIdentity(mix.blocks[i], ja.blocks[match.ja], pairKey(s, match.ja), match.confidence);
      });
    }

    // If heading structures differ, recover any still-unpaired block from the
    // document-wide reading order. This is intentionally the last resort.
    const mixAll = eligibleBlocks(ctx.root);
    const jaAll = eligibleBlocks(canonical);
    mixAll.forEach((block, index) => {
      if (refs.has(block) || !jaAll.length) return;
      const jaIndex = projectedIndex(index, mixAll.length, jaAll.length);
      setPairIdentity(block, jaAll[jaIndex], `doc-b${String(jaIndex).padStart(4, '0')}`, 'pair-position');
    });

    content.dataset.pairIdentity = 'ready';
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
    if (!startBlock || !endBlock || startBlock !== endBlock || !content.contains(startBlock)) {
      return { invalid: true };
    }
    return { block: startBlock, text };
  }

  function resolve() {
    clearTimeout(timer);
    if (view.hidden || version !== 'en-mix' || essayId !== (content.dataset.readerEssayId || essayId)) return;
    const selection = selectionContext();
    if (selection?.invalid) {
      closePanel();
      return;
    }
    if (selection?.block) show(refs.get(selection.block) || null, selection.text);
  }

  const schedule = delay => { clearTimeout(timer); timer = setTimeout(resolve, delay); };
  content.addEventListener('pointerup', event => { if (event.pointerType !== 'touch') schedule(50); });
  content.addEventListener('touchend', () => schedule(240), { passive: true });
  document.addEventListener('selectionchange', () => {
    if (!view.hidden && version === 'en-mix') schedule(matchMedia(`(max-width:${CONFIG.breakpoint}px)`).matches ? 240 : 180);
  });
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closePanel(); });
  window.addEventListener('hashchange', closePanel);
  document.addEventListener('myessays:reader-version-changed', event => { if (event.detail?.version !== 'en-mix') closePanel(); });

  if (window.MyEssaysReaderRuntime?.register) window.MyEssaysReaderRuntime.register('japanese-reference', mount, { priority: 8 });
  else document.addEventListener('myessays:reader-ready', event => mount(event.detail));
})();
