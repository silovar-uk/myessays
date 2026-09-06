(() => {
  'use strict';

  const CONFIG = Object.freeze({
    breakpoint: 980,
    anchor: 0.46,
    weak: 0.28,
    maxEqualGap: 8,
    maxNearGap: 5
  });
  const JA_RE = /[\u3040-\u30ff\u3400-\u9fff々〆ヵヶ]{2,}/g;
  const EN_RE = /[A-Za-z][A-Za-z0-9_-]{3,}/g;
  const NUM_RE = /\d+(?:[.,]\d+)*/g;

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
    if (mc === jc && mc <= CONFIG.maxEqualGap) {
      for (let k = 0; k < mc; k += 1) result[ms + k] = { ja: js + k, confidence: bounded ? 'sequence' : 'sequence-edge' };
      return;
    }
    if (Math.abs(mc - jc) <= 1 && Math.max(mc, jc) <= CONFIG.maxNearGap) {
      for (let k = 0; k < mc; k += 1) {
        const projected = Math.max(0, Math.min(jc - 1, Math.round((((k + .5) * jc) / mc) - .5)));
        result[ms + k] = { ja: js + projected, confidence: bounded ? 'interpolated' : 'interpolated-edge' };
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

  function align(mix = [], ja = []) {
    const result = Array(mix.length).fill(null);
    if (!mix.length || !ja.length) return result;
    const fixed = anchors(mix, ja);
    fixed.forEach(item => { result[item.mix] = { ja: item.ja, confidence: item.score >= .82 ? 'exact' : 'text-anchor' }; });
    const bounds = [{ mix: -1, ja: -1, edge: true }, ...fixed, { mix: mix.length, ja: ja.length, edge: true }];
    for (let i = 0; i < bounds.length - 1; i += 1) {
      const a = bounds[i], b = bounds[i + 1];
      fillGap(result, mix, ja, a.mix + 1, b.mix, a.ja + 1, b.ja, !a.edge && !b.edge);
    }
    return result;
  }

  if (typeof module !== 'undefined' && module.exports) module.exports = { similarity, align };
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

  function sections(root) {
    const list = [{ heading: null, blocks: [] }];
    root.querySelectorAll('h2,h3,p,li').forEach(el => {
      if (el.closest('.footnotes')) return;
      if (el.tagName === 'LI' && el.querySelector(':scope > p')) return;
      if (el.tagName === 'H2') list.push({ heading: el, blocks: [] });
      else list[list.length - 1].blocks.push(el);
    });
    return list;
  }

  function panel() {
    let el = document.getElementById('japaneseReferencePanel');
    if (el) return el;
    el = document.createElement('aside');
    el.id = 'japaneseReferencePanel';
    el.className = 'japanese-reference-panel';
    el.hidden = true;
    el.setAttribute('aria-label', '日本語版の対応箇所');
    el.innerHTML = '<div class="japanese-reference-handle" aria-hidden="true"></div><div class="japanese-reference-head"><div><p class="japanese-reference-kicker">JAPANESE ORIGINAL</p><h2>日本語版</h2></div><button class="japanese-reference-close" type="button" aria-label="日本語版を閉じる">×</button></div><p class="japanese-reference-status" aria-live="polite"></p><div class="japanese-reference-text"></div>';
    view.appendChild(el);
    el.querySelector('.japanese-reference-close').addEventListener('click', () => { el.hidden = true; });
    return el;
  }

  function closePanel() {
    const el = document.getElementById('japaneseReferencePanel');
    if (el) el.hidden = true;
  }

  function show(reference) {
    const el = panel();
    const status = el.querySelector('.japanese-reference-status');
    const body = el.querySelector('.japanese-reference-text');
    if (!reference?.text) {
      status.textContent = '対応する日本語を特定できませんでした';
      body.textContent = ''; body.hidden = true;
    } else {
      status.textContent = reference.confidence.includes('interpolated') ? '対応する日本語段落（位置から推定）' : '対応する日本語段落';
      body.textContent = reference.text; body.hidden = false;
    }
    el.hidden = false;
  }

  function mount(ctx) {
    essayId = ctx.essayId;
    try { version = state?.currentEssay?.__readingVersion || 'ja'; } catch { version = 'ja'; }
    closePanel();
    if (version !== 'en-mix') return;

    const canonical = document.createElement('div');
    const render = window.MyEssaysMarkdown?.render || window.renderMarkdown;
    if (typeof render !== 'function') return;
    canonical.innerHTML = render(ctx.essay?.body || '');
    const mixSections = sections(ctx.root), jaSections = sections(canonical);
    const count = Math.min(mixSections.length, jaSections.length);

    for (let s = 0; s < count; s += 1) {
      const mix = mixSections[s], ja = jaSections[s];
      if (mix.heading && ja.heading) refs.set(mix.heading, { text: textOf(ja.heading), confidence: 'heading' });
      const mapping = align(mix.blocks.map(textOf), ja.blocks.map(textOf));
      mapping.forEach((match, i) => {
        if (match && ja.blocks[match.ja]) refs.set(mix.blocks[i], { text: textOf(ja.blocks[match.ja]), confidence: match.confidence });
      });
    }
  }

  function selectedBlock() {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed || !selection.rangeCount || !selection.toString().trim()) return null;
    let node = selection.getRangeAt(0).startContainer;
    if (node.nodeType === Node.TEXT_NODE) node = node.parentElement;
    const block = node?.closest?.('p,li,h2,h3');
    return block && content.contains(block) ? block : null;
  }

  function resolve() {
    clearTimeout(timer);
    if (view.hidden || version !== 'en-mix' || essayId !== (content.dataset.readerEssayId || essayId)) return;
    const block = selectedBlock();
    if (block) show(refs.get(block) || null);
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
