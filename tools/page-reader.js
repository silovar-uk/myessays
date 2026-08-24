(async () => {
  'use strict';

  const APP_ID = '__page_reader_bookmarklet__';
  const GLOBAL_KEY = '__PAGE_READER_INSTANCE__';
  const VERSION = '2.0.0';
  const previous = window[GLOBAL_KEY];
  if (previous && typeof previous.destroy === 'function') previous.destroy();
  else document.getElementById(APP_ID)?.remove();

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const originalScroll = { x: window.scrollX, y: window.scrollY };
  let stopped = false;
  let running = false;
  let mode = 'main';
  let virtualBlocks = [];
  const virtualSeen = new Set();

  const host = document.createElement('div');
  host.id = APP_ID;
  host.dataset.version = VERSION;
  host.style.cssText = 'position:fixed;inset:0;z-index:2147483647;pointer-events:auto;';
  document.documentElement.appendChild(host);
  const shadow = host.attachShadow ? host.attachShadow({ mode: 'open' }) : host;

  const instance = {
    destroy() {
      stopped = true;
      host.remove();
      try { window.scrollTo(originalScroll.x, originalScroll.y); } catch (_) {}
      if (window[GLOBAL_KEY] === instance) delete window[GLOBAL_KEY];
    }
  };
  window[GLOBAL_KEY] = instance;

  shadow.innerHTML = `
    <style>
      :host{all:initial}
      *{box-sizing:border-box}
      .wrap{position:fixed;inset:0;background:rgba(20,20,20,.18);font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;color:#111;display:flex;align-items:stretch;justify-content:center;padding:10px}
      .panel{width:min(980px,100%);height:100%;background:#fff;border:1px solid #d8d8d8;border-radius:16px;box-shadow:0 18px 60px rgba(0,0,0,.25);display:flex;flex-direction:column;overflow:hidden}
      .top{padding:14px 14px 10px;border-bottom:1px solid #e6e6e6;background:#fff}
      .row{display:flex;gap:8px;align-items:center;flex-wrap:wrap}
      .title{font-size:17px;font-weight:800;flex:1;min-width:180px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
      .badge{font-size:12px;background:#f1f1f1;border-radius:999px;padding:4px 8px}
      .meta{margin-top:8px;font-size:12px;line-height:1.5;color:#555;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
      .controls{padding:10px 14px;border-bottom:1px solid #e8e8e8;display:flex;gap:8px;flex-wrap:wrap;background:#fafafa}
      button,select{font:inherit;font-size:14px;border-radius:10px;border:1px solid #cfcfcf;background:#fff;color:#111;padding:9px 11px}
      button{cursor:pointer;font-weight:650}
      button.primary{background:#111;color:#fff;border-color:#111}
      button:disabled{opacity:.45;cursor:default}
      .status{padding:9px 14px 7px;font-size:12px;line-height:1.5;color:#444}
      .bar{height:5px;background:#ececec;overflow:hidden}
      .bar>div{height:100%;width:0;background:#111;transition:width .12s linear}
      textarea{flex:1;width:100%;resize:none;border:0;outline:0;padding:18px max(18px,calc((100% - 760px)/2));font:15px/1.75 ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;color:#171717;background:#fff;min-height:0}
      @media(max-width:640px){.wrap{padding:0}.panel{border-radius:0;border:0}.top{padding:12px}.controls{padding:8px 10px}button,select{padding:10px 10px}.meta{white-space:normal}.title{font-size:16px}textarea{font-size:14px;line-height:1.65;padding:14px}}
    </style>
    <div class="wrap">
      <div class="panel" role="dialog" aria-modal="true" aria-label="Page Reader">
        <div class="top">
          <div class="row"><div class="title" id="pr-title">Page Reader</div><div class="badge" id="pr-badge">準備中</div></div>
          <div class="meta" id="pr-meta"></div>
        </div>
        <div class="controls">
          <select id="pr-mode" aria-label="抽出モード">
            <option value="main">本文優先</option>
            <option value="full">ページ全文</option>
          </select>
          <button class="primary" id="pr-copy">コピー</button>
          <button id="pr-select">全選択</button>
          <button id="pr-rerun">再抽出</button>
          <button id="pr-stop">停止</button>
          <button id="pr-close">閉じる</button>
        </div>
        <div class="status" id="pr-status">準備中...</div>
        <div class="bar"><div id="pr-bar"></div></div>
        <textarea id="pr-text" spellcheck="false" placeholder="ページ内容を抽出しています…"></textarea>
      </div>
    </div>`;

  const $ = (id) => shadow.getElementById(id);
  const ta = $('pr-text');
  const badge = $('pr-badge');
  const meta = $('pr-meta');
  const status = $('pr-status');
  const bar = $('pr-bar');
  const copyBtn = $('pr-copy');
  const rerunBtn = $('pr-rerun');
  const stopBtn = $('pr-stop');
  const modeSelect = $('pr-mode');

  $('pr-title').textContent = document.title || 'Page Reader';
  meta.textContent = location.href;

  function setStatus(message, percent = 0) {
    status.textContent = `${message} / ${ta.value.length.toLocaleString('ja-JP')}文字`;
    bar.style.width = `${Math.max(0, Math.min(100, percent))}%`;
  }

  function cleanText(text) {
    return String(text || '')
      .replace(/\u00a0/g, ' ')
      .replace(/[ \t]+\n/g, '\n')
      .replace(/[ \t]{2,}/g, ' ')
      .replace(/\n[ \t]+/g, '\n')
      .replace(/\n{3,}/g, '\n\n')
      .trim();
  }

  function isVisible(el) {
    if (!(el instanceof Element)) return true;
    const rect = el.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return false;
    const cs = getComputedStyle(el);
    return cs.display !== 'none' && cs.visibility !== 'hidden' && cs.visibility !== 'collapse' && Number(cs.opacity) !== 0;
  }

  function addVirtualBlock(text) {
    const t = cleanText(text);
    if (t.length < 20 || virtualSeen.has(t)) return;
    virtualSeen.add(t);
    virtualBlocks.push(t);
  }

  function collectVisibleBlocks() {
    const selectors = 'h1,h2,h3,h4,h5,h6,p,li,blockquote,pre,td,th,[role="article"]';
    const vh = window.innerHeight || document.documentElement.clientHeight || 800;
    for (const el of document.querySelectorAll(selectors)) {
      if (host.contains(el) || !isVisible(el)) continue;
      const r = el.getBoundingClientRect();
      if (r.bottom < -20 || r.top > vh + 20) continue;
      const text = el.innerText || el.textContent || '';
      addVirtualBlock(text);
    }
  }

  function findScroller() {
    const candidates = [document.scrollingElement, document.documentElement, document.body, ...document.querySelectorAll('main,[role="main"],div,section')].filter(Boolean);
    let best = document.scrollingElement || document.documentElement;
    let bestScore = -1;
    for (const el of candidates) {
      if (el === host || host.contains(el)) continue;
      const delta = Math.max(0, (el.scrollHeight || 0) - (el.clientHeight || 0));
      if (delta < 80 && el !== document.scrollingElement) continue;
      const cs = el instanceof Element ? getComputedStyle(el) : null;
      const overflow = cs ? `${cs.overflowY} ${cs.overflow}` : '';
      const scrollable = el === document.scrollingElement || /auto|scroll|overlay/.test(overflow) || delta > 300;
      if (!scrollable) continue;
      const score = delta + Math.min(el.scrollHeight || 0, 200000) * 0.02;
      if (score > bestScore) { best = el; bestScore = score; }
    }
    return best;
  }

  function getScrollTop(root) {
    if (root === document.scrollingElement || root === document.documentElement || root === document.body) return window.scrollY || root.scrollTop || 0;
    return root.scrollTop || 0;
  }

  function getScrollHeight(root) {
    if (root === document.scrollingElement || root === document.documentElement || root === document.body) return Math.max(document.documentElement.scrollHeight, document.body?.scrollHeight || 0);
    return root.scrollHeight || 0;
  }

  function getClientHeight(root) {
    if (root === document.scrollingElement || root === document.documentElement || root === document.body) return window.innerHeight || document.documentElement.clientHeight || 800;
    return root.clientHeight || 800;
  }

  function scrollToRoot(root, top) {
    if (root === document.scrollingElement || root === document.documentElement || root === document.body) window.scrollTo({ top, left: 0, behavior: 'auto' });
    else root.scrollTo({ top, left: 0, behavior: 'auto' });
  }

  async function autoScrollAndLoad() {
    const root = findScroller();
    const originalTop = getScrollTop(root);
    let lastTop = -1;
    let lastHeight = -1;
    let stable = 0;
    const max = 180;
    scrollToRoot(root, 0);
    await sleep(350);

    for (let i = 0; i < max && !stopped; i++) {
      collectVisibleBlocks();
      const top = getScrollTop(root);
      const height = getScrollHeight(root);
      const client = getClientHeight(root);
      const maxTop = Math.max(0, height - client);
      const pct = maxTop ? Math.min(95, 5 + (top / maxTop) * 88) : 30;
      setStatus(`読み込み中 ${i + 1}/${max}`, pct);

      if (Math.abs(top - lastTop) < 3 && Math.abs(height - lastHeight) < 3) stable += 1;
      else stable = 0;
      if (stable >= 6) break;

      lastTop = top;
      lastHeight = height;
      if (top >= maxTop - 4) {
        await sleep(250);
        const grown = getScrollHeight(root) > height + 4;
        if (!grown) stable += 2;
      }
      scrollToRoot(root, Math.min(maxTop, top + Math.max(420, client * 0.78)));
      await sleep(160);
    }
    collectVisibleBlocks();
    return { root, originalTop };
  }

  const hardRemove = 'script,style,noscript,svg,canvas,template,iframe,object,embed,input,textarea,select,button';
  const mainNoise = [
    'header','footer','nav','aside','dialog','form',
    '[role="navigation"]','[role="banner"]','[role="contentinfo"]','[role="complementary"]','[role="dialog"]',
    '[aria-hidden="true"]'
  ].join(',');
  const noisyName = /(cookie|consent|advert|ads?\b|banner|breadcrumb|breadcrumbs|share|sharing|social|subscribe|newsletter|recommend|related|promo|modal|popup|toolbar|pagination|comment-form|login|signup|sign-up)/i;

  function removeNoise(root, mainOnly) {
    root.querySelectorAll(hardRemove).forEach((el) => el.remove());
    if (mainOnly) {
      root.querySelectorAll(mainNoise).forEach((el) => el.remove());
      root.querySelectorAll('[class],[id]').forEach((el) => {
        const sig = `${el.id || ''} ${el.className || ''}`;
        if (noisyName.test(sig)) el.remove();
      });
    }
  }

  function linkDensity(el) {
    const total = cleanText(el.textContent).length || 1;
    let link = 0;
    el.querySelectorAll('a').forEach((a) => { link += cleanText(a.textContent).length; });
    return link / total;
  }

  function scoreLiveCandidate(el) {
    let text = '';
    try { text = cleanText(el.innerText || ''); } catch (_) { text = cleanText(el.textContent || ''); }
    if (text.length < 200) return -Infinity;
    const tag = el.tagName.toLowerCase();
    const sig = `${el.id || ''} ${typeof el.className === 'string' ? el.className : ''}`;
    let score = Math.min(text.length, 25000);
    score += el.querySelectorAll('p').length * 120;
    score += el.querySelectorAll('h1,h2,h3').length * 80;
    score -= linkDensity(el) * Math.min(text.length, 12000) * 1.7;
    if (tag === 'article') score += 5000;
    if (tag === 'main' || el.getAttribute('role') === 'main') score += 3500;
    if (/(article|content|main|post|entry|story)/i.test(sig)) score += 1600;
    if (/(nav|menu|footer|header|sidebar|rail|comment|related|recommend|share|social|advert|promo)/i.test(sig)) score -= 6000;
    return score;
  }

  function pickMainLiveCandidate() {
    const selector = [
      'article','main','[role="main"]',
      '[id*="article" i]','[class*="article" i]',
      '[id*="content" i]','[class*="content" i]',
      '[id*="post" i]','[class*="post" i]',
      '[id*="entry" i]','[class*="entry" i]',
      '[id*="story" i]','[class*="story" i]'
    ].join(',');
    const raw = [document.body, ...document.querySelectorAll(selector)].filter(Boolean);
    const candidates = [...new Set(raw)].slice(0, 500);
    let best = document.body || document.documentElement;
    let bestScore = scoreLiveCandidate(best);
    for (const el of candidates) {
      if (host.contains(el)) continue;
      const score = scoreLiveCandidate(el);
      if (score > bestScore) { best = el; bestScore = score; }
    }
    return best;
  }

  function structuralText(root) {
    const out = [];
    const blockTags = new Set(['P','DIV','SECTION','ARTICLE','MAIN','HEADER','FOOTER','NAV','ASIDE','BLOCKQUOTE','PRE','UL','OL','TABLE','TR']);
    const headingTags = new Set(['H1','H2','H3','H4','H5','H6']);

    function push(s = '') {
      const t = cleanText(s);
      if (!t) return;
      if (out[out.length - 1] !== t) out.push(t);
    }

    function walk(node) {
      if (node.nodeType === Node.TEXT_NODE) {
        const t = node.nodeValue.replace(/\s+/g, ' ').trim();
        if (t) out.push(t);
        return;
      }
      if (node.nodeType !== Node.ELEMENT_NODE) return;
      const el = node;
      if (headingTags.has(el.tagName)) {
        const n = Number(el.tagName.slice(1));
        push(`${'#'.repeat(Math.max(1, Math.min(6, n)))} ${cleanText(el.textContent)}`);
        return;
      }
      if (el.tagName === 'LI') { push(`- ${cleanText(el.textContent)}`); return; }
      if (el.tagName === 'PRE') { push(cleanText(el.textContent)); return; }
      if (el.tagName === 'TR') {
        const cells = [...el.children].filter((c) => /^(TD|TH)$/.test(c.tagName)).map((c) => cleanText(c.textContent)).filter(Boolean);
        if (cells.length) push(cells.join(' | '));
        return;
      }
      if (el.tagName === 'BR') { out.push('\n'); return; }
      if (blockTags.has(el.tagName)) {
        const directText = [...el.childNodes].every((n) => n.nodeType === Node.TEXT_NODE || (n.nodeType === Node.ELEMENT_NODE && ['A','SPAN','STRONG','EM','B','I','SMALL','CODE','TIME'].includes(n.tagName)));
        if (directText) { push(cleanText(el.textContent)); return; }
      }
      for (const child of el.childNodes) walk(child);
    }

    walk(root);
    return cleanText(out.join('\n\n').replace(/\n\n\n+/g, '\n\n'));
  }

  function extractMainContent() {
    const live = pickMainLiveCandidate();
    const root = live.cloneNode(true);
    removeNoise(root, true);
    return structuralText(root);
  }

  function extractFullPage() {
    let text = '';
    try {
      if (document.body) text = cleanText(document.body.innerText || '');
      else {
        const display = host.style.display;
        host.style.display = 'none';
        text = cleanText(document.documentElement.innerText || '');
        host.style.display = display;
      }
    } catch (_) { text = cleanText(document.body?.textContent || document.documentElement.textContent || ''); }
    if (virtualBlocks.length) {
      const supplement = virtualBlocks.filter((b) => !text.includes(b)).join('\n\n');
      if (supplement) text = cleanText(`${text}\n\n${supplement}`);
    }
    return text;
  }

  function buildOutput(text, usedMode) {
    const now = new Date();
    const copied = now.toLocaleString('ja-JP', { hour12: false });
    const label = usedMode === 'main' ? '本文優先' : 'ページ全文';
    return `# ${document.title || 'Untitled'}\n\nURL: ${location.href}\nCopied: ${copied}\nMode: ${label}\n\n---\n\n${cleanText(text)}`;
  }

  async function runExtraction() {
    if (running) return;
    running = true;
    stopped = false;
    virtualBlocks = [];
    virtualSeen.clear();
    badge.textContent = '抽出中';
    copyBtn.disabled = true;
    rerunBtn.disabled = true;
    stopBtn.disabled = false;
    ta.value = '';
    let scrollState = null;

    try {
      scrollState = await autoScrollAndLoad();
      setStatus(stopped ? '停止後の内容を整理中' : '内容を整理中', 96);
      let usedMode = mode;
      let text = mode === 'main' ? extractMainContent() : extractFullPage();
      if (mode === 'main' && cleanText(text).length < 350) {
        usedMode = 'full';
        text = extractFullPage();
      }
      ta.value = buildOutput(text, usedMode);
      badge.textContent = stopped ? '停止' : '完了';
      setStatus(usedMode !== mode ? '本文抽出が短いため全文へ切替' : (stopped ? '停止しました' : '抽出完了'), 100);
    } catch (err) {
      console.error('[Page Reader]', err);
      try {
        const fallback = cleanText(document.body?.innerText || document.documentElement.innerText || '');
        ta.value = buildOutput(fallback, 'full');
        badge.textContent = 'Fallback';
        setStatus(`通常抽出に失敗。表示テキストで復旧: ${err?.message || err}`, 100);
      } catch (fallbackErr) {
        badge.textContent = 'エラー';
        setStatus(`抽出失敗: ${fallbackErr?.message || fallbackErr}`, 100);
      }
    } finally {
      running = false;
      copyBtn.disabled = false;
      rerunBtn.disabled = false;
      stopBtn.disabled = true;
      try {
        if (scrollState?.root) scrollToRoot(scrollState.root, scrollState.originalTop);
        window.scrollTo({ top: originalScroll.y, left: originalScroll.x, behavior: 'auto' });
      } catch (_) {}
    }
  }

  async function copyText() {
    const text = ta.value;
    if (!text) return;
    try {
      if (!navigator.clipboard || !window.isSecureContext) throw new Error('Clipboard API unavailable');
      await navigator.clipboard.writeText(text);
      badge.textContent = 'コピー済み';
      setStatus('コピーしました', 100);
    } catch (err) {
      ta.focus();
      ta.select();
      ta.setSelectionRange(0, ta.value.length);
      let copied = false;
      try { copied = document.execCommand('copy'); } catch (_) {}
      badge.textContent = copied ? 'コピー済み' : '手動コピー';
      setStatus(copied ? '互換モードでコピーしました' : '自動コピー不可。選択済みなのでコピーしてください', 100);
    }
  }

  copyBtn.addEventListener('click', copyText);
  $('pr-select').addEventListener('click', () => { ta.focus(); ta.select(); ta.setSelectionRange(0, ta.value.length); });
  rerunBtn.addEventListener('click', () => runExtraction());
  stopBtn.addEventListener('click', () => { stopped = true; badge.textContent = '停止中'; setStatus('停止要求を受け付けました', Number.parseFloat(bar.style.width) || 0); });
  $('pr-close').addEventListener('click', () => instance.destroy());
  modeSelect.addEventListener('change', () => { mode = modeSelect.value; if (!running) runExtraction(); });

  await runExtraction();
})();
