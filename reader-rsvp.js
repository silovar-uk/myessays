(() => {
  'use strict';

  const SIZE_LABELS = ['小', '中', '大', '特大', '最大'];
  const SIZE_PX = { phone: [26, 32, 38, 46, 56], wide: [32, 40, 48, 60, 72] };
  const MIN_STEPS = [1, 4, 6, 8, 10, 12];
  const PAUSE_LABELS = ['なし', '弱', '標準', '強'];
  const PAUSE_SCALE = [0, 0.5, 1, 1.6];
  const SPEED_MIN = 300;
  const SPEED_MAX = 3000;
  const SPEED_STEP = 50;
  const SPEED_PRESETS = [400, 600, 800, 1000, 1200, 1500, 2000, 2500, 3000];
  const DEFAULTS = { speed: 600, minChars: 6, size: 2, pause: 2, vertical: false };
  const BEATS = { comma: 4, period: 8, paragraph: 12 };
  const CARD_MS = { title: 1800, lead: 900, h2: 1300, h3: 800, figure: 0, skip: 900, end: 2600 };
  const MIN_SHOW_MS = 100;
  const RAMP = [1.5, 1.25, 1.1];
  const PHONE_MAX = 820;
  const BUDOUX = 'https://cdn.jsdelivr.net/npm/budoux@0.9.2/module/';
  const KEY_SETTINGS = 'myessays:rsvp';
  const KEY_RESUME = 'myessays:rsvp-resume';
  const REFERENCES = /^(?:[0-9０-９]+[.．、]\s*)?(?:主要)?(?:参考文献|参考資料|引用文献|出典|References|Sources|Bibliography)/i;
  const SKIP = '.code-block, figure, table, .table-wrap, pre, .essay-figure';
  const IGNORE = '[aria-hidden="true"], button, rt, rp, script, style';
  const SENTENCE_END = /[。！？!?]+[」』）)\]】”"’]*|\.(?=\s|$)/g;
  const CLOSE_PUNCT = /[、。，．,！？!?;；:：」』）)\]】”"’…―]\s*$/;
  const PERIOD_END = /(?:[。！？!?]+[」』）)\]】”"’]*|\.)$/;
  const COMMA_END = /[、，,;；:：…―]$/;
  const SMALL_KANA = /[ぁぃぅぇぉゃゅょゎァィゥェォャュョヮ]/;

  // ---------- 純粋な処理(テスト対象) ----------
  function widthOf(text) {
    let width = 0;
    for (const ch of text) width += ch.charCodeAt(0) < 0x2000 ? 0.5 : 1;
    return width;
  }

  // ponytail: 読みの長さ(拍)の概算。漢字1.8・かな1・数字1.5・英字0.6。読み仮名が要るほどの精度は求めない。上げる方法: 形態素解析辞書を足す
  function moraeOf(text) {
    let morae = 0;
    for (const ch of text) {
      if (SMALL_KANA.test(ch)) continue;
      if (/[ぁ-ゖァ-ヺー]/.test(ch)) morae += 1;
      else if (/[㐀-鿿豈-﫿々〆ヶ]/.test(ch)) morae += 1.8;
      else if (/[0-9０-９]/.test(ch)) morae += 1.5;
      else if (/[A-Za-zＡ-Ｚａ-ｚ]/.test(ch)) morae += 0.6;
    }
    return Math.max(1, morae);
  }

  function splitSentences(text) {
    const out = [];
    let start = 0;
    for (const match of text.matchAll(SENTENCE_END)) {
      const end = match.index + match[0].length;
      if (text.slice(start, end).trim()) out.push([start, end]);
      start = end;
    }
    if (text.slice(start).trim()) out.push([start, text.length]);
    return out;
  }

  function splitBy(piece, pattern) {
    let at = piece.start;
    return piece.text.split(pattern).filter(Boolean).map(text => {
      const part = { text, start: at, end: at + text.length };
      at = part.end;
      return part;
    });
  }

  function hardSplit(piece, maxW) {
    const out = [];
    let text = '';
    let start = piece.start;
    let at = piece.start;
    for (const ch of piece.text) {
      const keepNumber = /[0-9.,]/.test(ch) && /[0-9]$/.test(text);
      if (text && !keepNumber && widthOf(text + ch) > maxW) {
        out.push({ text, start, end: at });
        text = '';
        start = at;
      }
      text += ch;
      at += ch.length;
    }
    if (text) out.push({ text, start, end: at });
    return out;
  }

  // BudouXは英文を1塊で返すので単語で割る。幅を超える塊は「・」、最後は文字数で割る
  function splitWide(piece, maxW) {
    const spaces = (piece.text.match(/ /g) || []).length;
    let parts = [piece];
    if ((spaces >= 2 && /[A-Za-z]/.test(piece.text)) || (spaces >= 1 && widthOf(piece.text.trim()) > maxW)) parts = splitBy(piece, /(?<= )/);
    parts = parts.flatMap(part => widthOf(part.text.trim()) > maxW && part.text.includes('・') ? splitBy(part, /(?<=・)/) : [part]);
    return parts.flatMap(part => widthOf(part.text.trim()) > maxW ? hardSplit(part, maxW) : [part]);
  }

  // 最少文字数に満たない塊を次とつなぐ。句読点で終わる塊と、幅を超える結合はつながない
  function mergeChunks(pieces, minW, maxW) {
    const out = [];
    for (const piece of pieces) {
      const last = out[out.length - 1];
      const join = last && (!piece.text.trim()
        || (widthOf(last.text.trim()) < minW && !CLOSE_PUNCT.test(last.text) && widthOf((last.text + piece.text).trim()) <= maxW));
      if (join) { last.text += piece.text; last.end = piece.end; }
      else out.push({ ...piece });
    }
    return out;
  }

  function buildItems(units, split, { minW, maxW }) {
    const list = [];
    let sentence = 0;
    units.forEach((unit, unitIndex) => {
      if (unit.kind !== 'text') {
        list.push({ type: 'card', kind: unit.kind, unit, unitIndex, text: unit.text, sub: unit.sub });
        return;
      }
      const sentences = splitSentences(unit.text);
      sentences.forEach(([from, to], si) => {
        const pieces = [];
        let at = from;
        for (const segment of split(unit.text.slice(from, to))) {
          pieces.push(...splitWide({ text: segment, start: at, end: at + segment.length }, maxW));
          at += segment.length;
        }
        const chunks = mergeChunks(pieces, minW, maxW).filter(chunk => chunk.text.trim());
        chunks.forEach((chunk, ci) => {
          const text = chunk.text.trim();
          const lastInSentence = ci === chunks.length - 1;
          const lastInUnit = lastInSentence && si === sentences.length - 1;
          list.push({
            type: 'chunk', unit, unitIndex, sentence, text,
            start: chunk.start, end: chunk.end,
            width: widthOf(text), morae: moraeOf(text),
            bullet: unit.bullet && si === 0 && ci === 0,
            pause: lastInUnit ? 'paragraph' : PERIOD_END.test(text) || lastInSentence ? 'period' : COMMA_END.test(text) ? 'comma' : null
          });
        });
        sentence += 1;
      });
    });
    list.push({ type: 'card', kind: 'end', text: '了' });
    return list;
  }

  // 速さ(字/分)で記事全体の時間を決め、文節ごとの配分は拍で決める
  function retime(list, { speed, pause }) {
    const chunks = list.filter(item => item.type === 'chunk');
    const width = chunks.reduce((sum, item) => sum + item.width, 0);
    const morae = chunks.reduce((sum, item) => sum + item.morae, 0);
    const msPerMora = width && morae ? (width / speed * 60000) / morae : 100;
    const scale = PAUSE_SCALE[pause] ?? 1;
    for (const item of list) {
      if (item.type === 'chunk') {
        item.ms = Math.max(MIN_SHOW_MS, item.morae * msPerMora);
        item.rest = item.pause ? BEATS[item.pause] * msPerMora * scale : 0;
      } else {
        item.ms = CARD_MS[item.kind] ?? 900;
        item.rest = 0;
      }
    }
    let remain = 0;
    let before = 0;
    for (let i = list.length - 1; i >= 0; i -= 1) { remain += list[i].ms + list[i].rest; list[i].remain = remain; }
    for (const item of list) { item.before = before; before += item.type === 'chunk' ? item.width : 0; }
    return { msPerMora, width };
  }

  // ---------- 本文から流す単位を集める ----------
  function textWithMap(root) {
    let text = '';
    const map = [];
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT, {
      acceptNode(node) {
        if (node.nodeType === Node.ELEMENT_NODE) {
          if (node.matches(IGNORE)) return NodeFilter.FILTER_REJECT;
          return node.tagName === 'BR' ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
        }
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    while (walker.nextNode()) {
      const node = walker.currentNode;
      if (node.nodeType === Node.ELEMENT_NODE) { text += ' '; continue; }
      map.push({ node, at: text.length });
      text += node.data.replace(/[\t\n\r]/g, ' ');
    }
    return { text, map };
  }

  function linkOnly(part, text) {
    const linked = [...part.querySelectorAll('a')].reduce((sum, a) => sum + a.textContent.trim().length, 0);
    return linked > 0 && linked / text.trim().length >= 0.8;
  }

  function skipLabel(el) {
    if (el.matches('table, .table-wrap') || el.querySelector('table')) return '表';
    if (el.matches('.code-block') && el.dataset.language && el.dataset.language !== 'text') return 'コード';
    return '図';
  }

  function staticFigure(el) {
    if (!el || el.querySelector('canvas, video, iframe, object, embed')) return null;
    const image = el.querySelector('picture img, img');
    if (!image) return null;
    const caption = el.querySelector('figcaption, .essay-figure-caption, .figure-caption, [data-caption]')?.textContent
      ?.replace(/\s+/g, ' ').trim() || '';
    return {
      image,
      alt: image.getAttribute('alt') || '',
      caption
    };
  }

  function collectUnits(root) {
    const h1 = root.querySelector(':scope > h1');
    const units = [{ kind: 'title', text: h1?.textContent.trim() || '', sub: root.querySelector(':scope > .reader-v2-subtitle')?.textContent.trim() || '' }];
    for (const el of root.children) {
      if (el.matches('.reader-v2-after-reading')) break;
      if (el.matches('h1, .reader-v2-subtitle, .reader-v2-intro')) continue;
      if (el.matches('h2, h3')) {
        const text = el.textContent.replace(/\s+/g, ' ').trim();
        if (REFERENCES.test(text)) break;
        units.push({ kind: el.tagName.toLowerCase(), el, text });
        continue;
      }
      if (el.matches(SKIP)) {
        const visual = staticFigure(el);
        units.push(visual
          ? { kind: 'figure', el, text: '図', visual }
          : { kind: 'skip', el, text: skipLabel(el) });
        continue;
      }
      if (!el.matches('.reader-locator-block[data-reading-locator]')) continue;
      const list = el.matches('ul, ol');
      const parts = list || el.matches('blockquote') ? [...el.children].filter(child => child.matches('li, p')) : [el];
      for (const part of parts.length ? parts : [el]) {
        const { text, map } = textWithMap(part);
        if (!text.trim() || linkOnly(part, text)) continue;
        units.push({ kind: 'text', el, part, text, map, locator: el.dataset.readingLocator, bullet: list });
      }
    }
    return units;
  }

  function pointAt(map, offset) {
    for (let i = map.length - 1; i >= 0; i -= 1) {
      if (map[i].at <= offset) return { node: map[i].node, offset: Math.min(offset - map[i].at, map[i].node.length) };
    }
    return null;
  }

  function rangeFor(unit, start, end) {
    const a = pointAt(unit.map, start);
    const b = pointAt(unit.map, Math.max(start, end - 1));
    if (!a || !b) return null;
    const range = document.createRange();
    range.setStart(a.node, a.offset);
    range.setEnd(b.node, Math.min(b.offset + 1, b.node.length));
    return range;
  }

  // ---------- ランタイムとの接点 ----------
  let runtimeContext = null;
  function root() { return runtimeContext?.root || document.getElementById('readerContent'); }
  function essayId() { return runtimeContext?.essayId || window.MyEssaysRoute?.parse?.().articleId; }
  function pivot() { return window.MyEssaysReadingPivot?.current?.() || null; }
  function railY() { return window.MyEssaysReadingPivot?.readingRailY?.() ?? innerHeight * 0.36; }
  function currentVersion() { return window.MyEssaysReaderVersions?.currentVersion?.() || 'ja'; }
  function readerOpen() { const view = document.getElementById('readerView'); return !!view && !view.hidden; }
  function comparing() { return !!document.getElementById('readerView')?.classList.contains('language-compare-mode'); }

  // ---------- 状態 ----------
  const settings = readSettings();
  let stage = null;
  const els = {};
  let items = [];
  let index = 0;
  let playing = false;
  let timer = 0;
  let rampStep = 0;
  let lead = '';
  let parse = null;
  let msPerMora = 100;
  let totalWidth = 0;
  let capacity = 9;
  let opener = null;
  let wake = null;
  let idleTimer = 0;
  let toastTimer = 0;
  let playStartedAt = 0;
  let playedMs = 0;
  let widthRead = 0;
  let syncedBlock = null;
  let visualGate = -1;

  function readJSON(key) {
    try { return JSON.parse(localStorage.getItem(key) || 'null'); } catch { return null; }
  }
  function writeJSON(key, value) {
    try { value == null ? localStorage.removeItem(key) : localStorage.setItem(key, JSON.stringify(value)); } catch {}
  }
  function readSettings() {
    const saved = readJSON(KEY_SETTINGS) || {};
    return {
      speed: clamp(Math.round((Number(saved.speed) || DEFAULTS.speed) / SPEED_STEP) * SPEED_STEP, SPEED_MIN, SPEED_MAX),
      minChars: MIN_STEPS.includes(saved.minChars) ? saved.minChars : DEFAULTS.minChars,
      size: Number.isInteger(saved.size) ? clamp(saved.size, 0, SIZE_LABELS.length - 1) : DEFAULTS.size,
      pause: Number.isInteger(saved.pause) ? clamp(saved.pause, 0, PAUSE_LABELS.length - 1) : DEFAULTS.pause,
      vertical: typeof saved.vertical === 'boolean' ? saved.vertical : DEFAULTS.vertical
    };
  }
  function clamp(value, min, max) { return Math.min(max, Math.max(min, value)); }
  const phone = () => innerWidth <= PHONE_MAX;
  const fontPx = () => SIZE_PX[phone() ? 'phone' : 'wide'][settings.size];

  // ---------- 舞台 ----------
  function button(className, text, label, onClick) {
    const el = document.createElement('button');
    el.type = 'button';
    el.className = className;
    el.textContent = text;
    if (label) { el.setAttribute('aria-label', label); el.title = label; }
    el.addEventListener('click', event => { event.stopPropagation(); onClick(event); });
    return el;
  }

  function ensureStage() {
    if (stage) return stage;
    stage = document.createElement('dialog');
    stage.id = 'rsvpStage';
    stage.className = 'rsvp-stage';
    stage.setAttribute('aria-label', '流して読む');
    stage.innerHTML = `
      <header class="rsvp-head">
        <p class="rsvp-section" data-rsvp="section"></p>
      </header>
      <div class="rsvp-field" data-rsvp="field" tabindex="-1">
        <p class="rsvp-toast" data-rsvp="toast" role="status" hidden></p>
        <div class="rsvp-focus">
          <p class="rsvp-word" data-rsvp="word" aria-hidden="true"></p>
          <div class="rsvp-card" data-rsvp="card" hidden></div>
          <p class="rsvp-context" data-rsvp="context" hidden></p>
        </div>
        <p class="rsvp-hint" data-rsvp="hint"></p>
      </div>
      <footer class="rsvp-foot">
        <div class="rsvp-meter">
          <div class="rsvp-track" data-rsvp="track" aria-hidden="true"><span class="rsvp-fill" data-rsvp="fill"></span></div>
          <p class="rsvp-remaining" data-rsvp="remaining"></p>
        </div>
        <div class="rsvp-controls">
          <div class="rsvp-speed" role="group" aria-label="速さ" data-rsvp="speedGroup"></div>
          <div class="rsvp-transport" data-rsvp="transport"></div>
          <div class="rsvp-tools" data-rsvp="tools"></div>
        </div>
      </footer>
      <section class="rsvp-speed-picker" data-rsvp="speedPicker" aria-label="読む速さ" hidden></section>
      <section class="rsvp-sheet" data-rsvp="sheet" aria-label="表示の設定" hidden></section>
      <section class="rsvp-help" data-rsvp="help" aria-label="ショートカット" hidden></section>`;
    stage.querySelectorAll('[data-rsvp]').forEach(el => { els[el.dataset.rsvp] = el; });

    const stop = button('rsvp-stop', '■ 本文へ', '停止して本文へ戻る(Esc)', stopAndReturn);
    const kbd = document.createElement('kbd');
    kbd.textContent = 'Esc';
    stop.append(kbd);
    stage.querySelector('.rsvp-head').append(stop);

    els.slower = button('rsvp-btn', '−', '遅くする(↓)', () => setSpeed(settings.speed - SPEED_STEP));
    els.speed = button('rsvp-speed-value', '', '速さを選ぶ', () => toggleSpeedPicker());
    els.speed.setAttribute('aria-expanded', 'false');
    els.faster = button('rsvp-btn', '+', '速くする(↑)', () => setSpeed(settings.speed + SPEED_STEP));
    els.speedGroup.append(els.slower, els.speed, els.faster);

    els.prev = button('rsvp-btn', '', '', () => prevSentence());
    els.toggle = button('rsvp-toggle', '▶', '', () => toggle());
    els.next = button('rsvp-btn', '', '', () => nextSentence());
    els.transport.append(els.prev, els.toggle, els.next);

    els.tune = button('rsvp-btn', 'Aa', '表示の設定', () => toggleSheet());
    els.tune.setAttribute('aria-expanded', 'false');
    els.helpButton = button('rsvp-btn rsvp-help-button', '?', 'ショートカット(?)', () => toggleHelp());
    els.tools.append(els.tune, els.helpButton);

    buildSpeedPicker();
    buildSheet();
    buildHelp();

    els.field.addEventListener('click', event => {
      if (event.target.closest('button')) return;
      toggle();
    });
    stage.addEventListener('cancel', event => { event.preventDefault(); stopAndReturn(); });
    stage.addEventListener('wheel', event => { if (!event.target.closest('.rsvp-speed-picker, .rsvp-sheet, .rsvp-help')) event.preventDefault(); }, { passive: false });
    stage.addEventListener('touchmove', event => { if (!event.target.closest('.rsvp-speed-picker, .rsvp-sheet, .rsvp-help')) event.preventDefault(); }, { passive: false });
    stage.addEventListener('pointermove', wakeControls);
    document.body.append(stage);
    return stage;
  }

  function segButtons(group, labels, isOn, onPick) {
    const wrap = document.createElement('div');
    wrap.className = 'rsvp-group';
    const title = document.createElement('p');
    title.textContent = group;
    const row = document.createElement('div');
    row.className = 'rsvp-seg';
    row.setAttribute('role', 'group');
    row.setAttribute('aria-label', group);
    labels.forEach((label, i) => {
      const el = button('', label, '', () => { onPick(i); syncSheet(); });
      el.dataset.on = String(i);
      row.append(el);
    });
    wrap.append(title, row);
    wrap.sync = () => row.querySelectorAll('button').forEach((el, i) => el.setAttribute('aria-pressed', String(isOn(i))));
    return wrap;
  }

  function buildSpeedPicker() {
    const head = document.createElement('div');
    head.className = 'rsvp-speed-picker__head';
    const heading = document.createElement('h2');
    heading.textContent = '読む速さ';
    const summary = document.createElement('div');
    els.speedPickerValue = document.createElement('strong');
    els.speedPickerMeta = document.createElement('span');
    summary.append(els.speedPickerValue, els.speedPickerMeta);
    head.append(heading, summary);

    const rail = document.createElement('div');
    rail.className = 'rsvp-speed-picker__rail';
    els.speedRange = document.createElement('input');
    els.speedRange.type = 'range';
    els.speedRange.min = String(SPEED_MIN);
    els.speedRange.max = String(SPEED_MAX);
    els.speedRange.step = String(SPEED_STEP);
    els.speedRange.className = 'rsvp-speed-range';
    els.speedRange.setAttribute('aria-label', '読む速さ');
    els.speedRange.addEventListener('input', () => {
      setSpeed(Number(els.speedRange.value), { announce: false, restartPlayback: false });
    });
    els.speedRange.addEventListener('change', () => setSpeed(Number(els.speedRange.value)));
    const scale = document.createElement('div');
    scale.className = 'rsvp-speed-picker__scale';
    scale.innerHTML = `<span>${SPEED_MIN}</span><span>${SPEED_MAX} 字/分</span>`;
    rail.append(els.speedRange, scale);

    els.speedPresets = document.createElement('div');
    els.speedPresets.className = 'rsvp-speed-presets';
    els.speedPresets.setAttribute('role', 'group');
    els.speedPresets.setAttribute('aria-label', '速度のプリセット');
    SPEED_PRESETS.forEach(value => {
      const preset = button('', String(value), `${value}字/分`, () => {
        setSpeed(value);
        toggleSpeedPicker(false);
      });
      preset.dataset.speed = String(value);
      els.speedPresets.append(preset);
    });

    const hint = document.createElement('p');
    hint.className = 'rsvp-speed-picker__hint';
    hint.textContent = '− / ＋ と ↑ / ↓ は50字ずつ微調整';
    const close = button('rsvp-btn rsvp-speed-picker__close', '閉じる', '', () => toggleSpeedPicker(false));
    els.speedPicker.append(head, rail, els.speedPresets, hint, close);
  }

  function syncSpeedPicker() {
    if (!els.speedRange) return;
    els.speedRange.value = String(settings.speed);
    if (els.speedPickerValue) els.speedPickerValue.textContent = `${settings.speed}字/分`;
    if (els.speedPickerMeta) els.speedPickerMeta.textContent = remainingText();
    els.speedPresets?.querySelectorAll('button').forEach(preset => {
      preset.setAttribute('aria-pressed', String(Number(preset.dataset.speed) === settings.speed));
    });
  }

  function toggleSpeedPicker(force) {
    const show = force ?? els.speedPicker.hidden;
    if (show) {
      els.sheet.hidden = true;
      els.tune.setAttribute('aria-expanded', 'false');
      els.help.hidden = true;
      syncSpeedPicker();
    }
    els.speedPicker.hidden = !show;
    els.speed.setAttribute('aria-expanded', String(show));
    if (show) els.speedRange?.focus({ preventScroll: true });
    else if (stage.contains(document.activeElement) || document.activeElement === document.body) els.field.focus({ preventScroll: true });
  }

  let sheetGroups = [];
  function buildSheet() {
    const heading = document.createElement('h2');
    heading.textContent = '表示の設定';
    sheetGroups = [
      segButtons('文字の大きさ(+ −)', SIZE_LABELS, i => settings.size === i, i => setSize(i)),
      segButtons('最少文字数([ ])', MIN_STEPS.map(n => n === 1 ? '文節ごと' : `${n}字`), i => settings.minChars === MIN_STEPS[i], i => setMin(MIN_STEPS[i])),
      segButtons('句読点の間(P)', PAUSE_LABELS, i => settings.pause === i, i => setPause(i)),
      segButtons('向き(V)', ['横', '縦'], i => settings.vertical === (i === 1), i => setVertical(i === 1))
    ];
    const close = button('rsvp-btn rsvp-sheet-close', '閉じる', '', () => toggleSheet(false));
    els.sheet.append(heading, ...sheetGroups, close);
  }
  function syncSheet() { sheetGroups.forEach(group => group.sync()); }

  function buildHelp() {
    const rows = [
      ['R', '開く・閉じる(閉じると本文のその位置へ)'],
      ['Space / K', '再生・一時停止'],
      ['→ ←', '1つ進む・戻る(縦では ← で進む)'],
      ['Shift + → ←', '1文進む・戻る'],
      ['↑ ↓', '速さ ±50字/分'],
      ['速度の数字', '300〜3000字/分から直接選択'],
      ['+ −', '文字の大きさ'],
      ['[ ]', '最少文字数'],
      ['V', '縦・横'],
      ['P', '句読点の間'],
      ['PageDown / PageUp', '次の章・前の章'],
      ['Home', '記事の最初へ'],
      ['Enter', '図・表の札で、本文のその場所へ'],
      ['Esc', '停止して本文へ戻る'],
      ['?', 'この一覧']
    ];
    const heading = document.createElement('h2');
    heading.textContent = 'ショートカット';
    const table = document.createElement('table');
    rows.forEach(([keys, text]) => {
      const tr = table.insertRow();
      tr.insertCell().textContent = keys;
      tr.insertCell().textContent = text;
    });
    els.help.append(heading, table, button('rsvp-btn rsvp-sheet-close', '閉じる', '', () => toggleHelp(false)));
  }

  function toggleSheet(force) {
    const show = force ?? els.sheet.hidden;
    if (show) { pause(); toggleHelp(false); toggleSpeedPicker(false); syncSheet(); }
    els.sheet.hidden = !show;
    els.tune.setAttribute('aria-expanded', String(show));
    if (show) els.sheet.querySelector('button')?.focus({ preventScroll: true });
    else if (stage.contains(document.activeElement) || document.activeElement === document.body) els.field.focus({ preventScroll: true });
  }
  function toggleHelp(force) {
    const show = force ?? els.help.hidden;
    if (show) { pause(); els.sheet.hidden = true; els.tune.setAttribute('aria-expanded', 'false'); toggleSpeedPicker(false); }
    els.help.hidden = !show;
    if (!show && !els.sheet.hidden) return;
    if (!show) els.field.focus({ preventScroll: true });
  }

  function applyLook() {
    stage.dataset.orientation = settings.vertical ? 'vertical' : 'horizontal';
    stage.style.setProperty('--rsvp-size', `${fontPx()}px`);
    const forward = settings.vertical ? '‹' : '›';
    const backward = settings.vertical ? '›' : '‹';
    els.prev.textContent = settings.vertical ? `前の文 ${backward}` : `${backward} 前の文`;
    els.next.textContent = settings.vertical ? `${forward} 次の文` : `次の文 ${forward}`;
    els.prev.setAttribute('aria-label', `1文戻る(Shift+${settings.vertical ? '→' : '←'})`);
    els.next.setAttribute('aria-label', `1文進む(Shift+${settings.vertical ? '←' : '→'})`);
    els.speed.textContent = `${settings.speed}字/分`;
    syncSpeedPicker();
    els.hint.textContent = phone() ? 'タップで一時停止' : 'Space で一時停止 · ? でショートカット';
  }

  function measureCapacity() {
    const rect = els.field.getBoundingClientRect();
    const room = settings.vertical ? rect.height - 72 : Math.min(rect.width, 900) - 40;
    return Math.max(4, Math.floor(room / (fontPx() * (settings.vertical ? 1.1 : 1.04))));
  }

  // ---------- 組み立て ----------
  async function loadParser() {
    if (parse) return parse;
    try {
      const [{ Parser }, { model }] = await Promise.all([import(`${BUDOUX}parser.js`), import(`${BUDOUX}data/models/ja.js`)]);
      const parser = new Parser(model);
      parse = text => parser.parse(text);
    } catch (error) {
      console.warn('[rsvp] BudouXを読み込めないため、Intl.Segmenterで分割します', error);
      const segmenter = new Intl.Segmenter('ja', { granularity: 'word' });
      parse = text => Array.from(segmenter.segment(text), part => part.segment);
    }
    return parse;
  }

  function anchor() {
    const item = items[index];
    return item?.unit ? { unit: item.unit.el ? item.unit : null, unitIndex: item.unitIndex, start: item.start ?? -1, kind: item.kind } : null;
  }

  function rebuild(keep) {
    capacity = measureCapacity();
    const minW = Math.min(settings.minChars, capacity);
    items = buildItems(collectUnits(root()), parse, { minW, maxW: capacity });
    ({ msPerMora, width: totalWidth } = retime(items, settings));
    renderTicks();
    if (!keep) return;
    const hit = items.findIndex(item => item.unitIndex === keep.unitIndex && (item.type === 'card' || (item.start <= keep.start && keep.start < item.end)));
    index = hit >= 0 ? hit : clamp(index, 0, items.length - 1);
  }

  function retimeOnly() {
    ({ msPerMora, width: totalWidth } = retime(items, settings));
  }

  // ---------- 位置 ----------
  const isChunk = i => items[i]?.type === 'chunk';
  function sentenceStart(i) {
    let j = i;
    while (j > 0 && isChunk(j - 1) && items[j - 1].sentence === items[i].sentence) j -= 1;
    return j;
  }
  function sectionTitleAt(i) {
    for (let j = Math.min(i, items.length - 1); j >= 0; j -= 1) if (items[j].kind === 'h2') return items[j].text;
    return 'Introduction';
  }
  function nextChunkAfter(at = index) {
    for (let j = at + 1; j < items.length; j += 1) if (isChunk(j)) return items[j];
    return null;
  }

  function currentChunk() {
    if (isChunk(index)) return items[index];
    return nextChunkAfter(index) || items.findLast((item, i) => i < index && item.type === 'chunk') || null;
  }

  function startIndex(from) {
    if (from === 'top') return 0;
    const pv = pivot();
    if (!pv) return 0;
    const first = items.findIndex(item => item.unit?.el === pv);
    if (first < 0) {
      const before = items.findLastIndex(item => item.unit?.el && (item.unit.el.compareDocumentPosition(pv) & Node.DOCUMENT_POSITION_FOLLOWING));
      return Math.max(0, before);
    }
    const resume = readJSON(KEY_RESUME);
    if (resume && resume.essayId === essayId() && resume.version === currentVersion() && resume.locator === pv.dataset.readingLocator) {
      const hit = items.findIndex(item => item.type === 'chunk' && item.unit.el === pv && item.start <= resume.offset && resume.offset < item.end);
      if (hit >= 0) return sentenceStart(hit);
    }
    return first;
  }

  function saveResume(item = currentChunk()) {
    if (!item) return;
    writeJSON(KEY_RESUME, { essayId: essayId(), version: currentVersion(), locator: item.unit.locator, offset: item.start, at: new Date().toISOString() });
  }

  // ---------- 再生 ----------
  function open(from = 'pivot', launcher = document.activeElement) {
    if (stage?.open) return;
    if (!readerOpen() || comparing()) return;
    ensureStage();
    opener = launcher instanceof HTMLElement ? launcher : null;
    window.MyEssaysReaderV2?.setMapOpen?.(false);
    applyLook();
    stage.showModal();
    document.documentElement.classList.add('rsvp-open');
    stage.dataset.fresh = '';
    setTimeout(() => stage.removeAttribute('data-fresh'), 5000); // 操作のヒントは開いた直後だけ
    els.field.focus({ preventScroll: true });
    els.word.hidden = true;
    els.card.hidden = false;
    els.card.replaceChildren(Object.assign(document.createElement('p'), { className: 'rsvp-card-stats', textContent: '準備しています…' }));
    loadParser().then(() => {
      if (!stage.open) return;
      rebuild();
      index = startIndex(from);
      lead = from !== 'top' && items[index]?.kind !== 'h2' && index > 1 ? sectionTitleAt(index) : '';
      playedMs = 0;
      widthRead = 0;
      syncedBlock = null;
      visualGate = -1;
      play();
    });
  }

  function play() {
    if (playing || !items.length) return;
    if (index >= items.length - 1) { index = 0; lead = ''; }
    if (items[index]?.kind === 'figure' && visualGate === index) {
      visualGate = -1;
      index = Math.min(index + 1, items.length - 1);
    }
    els.sheet.hidden = true;
    els.help.hidden = true;
    playing = true;
    rampStep = 0;
    playStartedAt = performance.now();
    requestWake();
    render();
    wakeControls();
    if (lead) {
      showCard({ kind: 'lead', text: lead });
      timer = setTimeout(() => { lead = ''; tick(); }, CARD_MS.lead);
      return;
    }
    tick();
  }

  function pause() {
    if (!playing) return;
    playing = false;
    clearTimeout(timer);
    playedMs += performance.now() - playStartedAt;
    lead = '';
    releaseWake();
    saveResume();
    render();
    show(items[index]);
  }

  function toggle() { playing ? pause() : play(); }

  function pauseAtFigure() {
    if (!playing) return;
    playing = false;
    clearTimeout(timer);
    playedMs += performance.now() - playStartedAt;
    visualGate = index;
    lead = '';
    releaseWake();
    const next = nextChunkAfter(index);
    if (next) saveResume(next);
    else writeJSON(KEY_RESUME, null);
    render();
  }

  function tick() {
    clearTimeout(timer);
    if (!playing) return;
    const item = items[index];
    if (!item) return;
    show(item);
    syncPage(item);
    if (item.kind === 'end') { finish(); return; }
    if (item.kind === 'figure') { pauseAtFigure(); return; }
    const ramp = item.type === 'chunk' && rampStep < RAMP.length ? RAMP[rampStep++] : 1;
    timer = setTimeout(() => {
      if (item.type === 'chunk') widthRead += item.width;
      index += 1;
      tick();
    }, (item.ms + item.rest) * ramp);
  }

  function restart() {
    if (!playing) { show(items[index]); return; }
    lead = '';
    rampStep = RAMP.length;
    tick();
  }

  function seek(i) {
    index = clamp(i, 0, items.length - 2);
    restart();
  }

  function step(delta) {
    let j = index + delta;
    while (items[j] && !isChunk(j)) j += delta;
    if (items[j]) seek(j);
  }

  function prevSentence() {
    const start = sentenceStart(index);
    if (start < index && isChunk(index)) { seek(start); return; }
    let j = start - 1;
    while (j > 0 && !isChunk(j)) j -= 1;
    if (j >= 0 && isChunk(j)) seek(sentenceStart(j));
  }

  function nextSentence() {
    const current = items[index]?.sentence;
    const j = items.findIndex((item, i) => i > index && item.type === 'chunk' && item.sentence !== current);
    if (j >= 0) seek(j);
  }

  function jumpSection(delta) {
    if (delta > 0) {
      const j = items.findIndex((item, i) => i > index && item.kind === 'h2');
      if (j >= 0) seek(j);
      return;
    }
    const heads = items.map((item, i) => item.kind === 'h2' ? i : -1).filter(i => i >= 0 && i < index);
    const target = heads.length && index - heads.at(-1) <= 1 ? heads.at(-2) : heads.at(-1);
    seek(target ?? 1);
  }

  function finish() {
    playing = false;
    playedMs += performance.now() - playStartedAt;
    releaseWake();
    writeJSON(KEY_RESUME, null);
    render();
    const minutes = Math.floor(playedMs / 60000);
    const seconds = Math.round((playedMs % 60000) / 1000);
    const stats = [`${minutes}分${String(seconds).padStart(2, '0')}秒`, `${Math.round(widthRead).toLocaleString('ja-JP')}字`];
    // 1分未満は平均がぶれるので出さない。間(句読点・章の札)を含めた実際の速さを出す
    if (playedMs >= 60000) stats.push(`間を含め平均${Math.round(widthRead / (playedMs / 60000) / 10) * 10}字/分`);
    showCard({ kind: 'end', text: '了', stats: stats.join(' · ') });
    timer = setTimeout(landAfterReading, CARD_MS.end);
  }

  // ---------- 表示 ----------
  function render() {
    stage.dataset.state = playing ? 'playing' : (items[index]?.kind === 'end' ? 'ended' : 'paused');
    els.toggle.textContent = playing ? '❚❚' : '▶';
    els.toggle.setAttribute('aria-label', playing ? '一時停止(Space)' : '再生(Space)');
    els.toggle.title = els.toggle.getAttribute('aria-label');
    els.speed.textContent = `${settings.speed}字/分`;
    syncSpeedPicker();
  }

  function previousSentenceText(at = index) {
    let j = at - 1;
    while (j >= 0 && !isChunk(j)) j -= 1;
    if (j < 0) return '';
    const from = sentenceStart(j);
    const first = items[from];
    let last = j;
    while (isChunk(last + 1) && items[last + 1].sentence === first.sentence) last += 1;
    if (!first?.unit?.text || first.unit !== items[last]?.unit) {
      return items.slice(from, last + 1).map(item => item.text).join('').replace(/\s+/g, ' ').trim();
    }
    return first.unit.text.slice(first.start, items[last].end).replace(/\s+/g, ' ').trim();
  }

  function cloneFigureImage(card) {
    const source = card.unit?.visual?.image;
    if (!source?.cloneNode) return null;
    const image = source.cloneNode(false);
    image.removeAttribute('id');
    image.removeAttribute('tabindex');
    image.removeAttribute('role');
    image.removeAttribute('aria-label');
    image.className = 'rsvp-figure-image';
    image.loading = 'eager';
    image.decoding = 'async';
    return image;
  }

  function renderWord(item) {
    els.word.replaceChildren();
    if (item.bullet) els.word.append(Object.assign(document.createElement('span'), { className: 'rsvp-bullet', textContent: '・' }));
    if (!settings.vertical) { els.word.append(item.text); return; }
    // 縦中横: 1〜2桁の半角数字と「!?」だけを横に組む
    for (const part of item.text.split(/((?<![0-9.,])[0-9]{1,2}(?![0-9.,])|[!?！？]{2})/)) {
      if (!part) continue;
      if (/^(?:[0-9]{1,2}|[!?！？]{2})$/.test(part)) els.word.append(Object.assign(document.createElement('span'), { className: 'rsvp-tcy', textContent: part }));
      else els.word.append(part);
    }
  }

  function showCard(card) {
    els.word.hidden = true;
    els.context.hidden = true;
    els.card.hidden = false;
    els.card.dataset.kind = card.kind;
    stage.dataset.kind = card.kind;
    const nodes = [];
    if (card.kind === 'title') {
      nodes.push(Object.assign(document.createElement('p'), { className: 'rsvp-card-title', textContent: card.text }));
      if (card.sub) nodes.push(Object.assign(document.createElement('p'), { className: 'rsvp-card-sub', textContent: card.sub }));
    } else if (card.kind === 'figure') {
      const context = previousSentenceText(index);
      if (context) nodes.push(Object.assign(document.createElement('p'), { className: 'rsvp-figure-context', textContent: context }));
      const frame = document.createElement('div');
      frame.className = 'rsvp-figure-frame';
      const image = cloneFigureImage(card);
      if (image) {
        const fallback = Object.assign(document.createElement('p'), { className: 'rsvp-figure-error', textContent: '画像を読み込めませんでした' });
        image.addEventListener('error', () => image.replaceWith(fallback), { once: true });
        frame.append(image);
      } else {
        frame.append(Object.assign(document.createElement('p'), { className: 'rsvp-figure-error', textContent: '画像を表示できませんでした' }));
      }
      nodes.push(frame);
      const caption = card.unit?.visual?.caption || '';
      if (caption) nodes.push(Object.assign(document.createElement('p'), { className: 'rsvp-figure-caption', textContent: caption }));
      nodes.push(Object.assign(document.createElement('p'), { className: 'rsvp-figure-paused', textContent: 'FIGURE · PAUSED' }));
      nodes.push(button('rsvp-figure-resume', '▶ 続きを流す', '図の続きから再生する(Space)', play));
    } else if (card.kind === 'skip') {
      nodes.push(button('rsvp-card-skip', `▦ ${card.text}があります · 本文で見る`, `${card.text}を本文で見る(Enter)`, () => goToSkip(card)));
    } else if (card.kind === 'end') {
      nodes.push(Object.assign(document.createElement('p'), { className: 'rsvp-card-end', textContent: '了' }));
      if (card.stats) nodes.push(Object.assign(document.createElement('p'), { className: 'rsvp-card-stats', textContent: card.stats }));
      nodes.push(button('rsvp-card-after', '読後へ ↓', '読後欄へ移る', landAfterReading));
    } else {
      nodes.push(Object.assign(document.createElement('p'), { className: 'rsvp-card-heading', textContent: card.text }));
    }
    els.card.replaceChildren(...nodes);
  }

  function show(item) {
    if (!item) return;
    if (item.type === 'chunk') {
      stage.dataset.kind = 'chunk';
      els.card.hidden = true;
      els.word.hidden = false;
      renderWord(item);
    } else if (item.kind !== 'end' || !playing) {
      showCard(item);
    }
    els.section.textContent = sectionTitleAt(index);
    renderMeter();
    renderContext();
  }

  function renderContext() {
    const item = items[index];
    if (playing || !item || item.type !== 'chunk') { els.context.hidden = true; return; }
    const from = sentenceStart(index);
    const parts = [];
    for (let j = from; isChunk(j) && items[j].sentence === item.sentence; j += 1) {
      // 英単語の間の空白を残すため、本文の区間を使い、前後の空白はボタンの外に置く
      const [, lead, body, tail] = items[j].unit.text.slice(items[j].start, items[j].end).match(/^(\s*)([\s\S]*?)(\s*)$/);
      const part = button('', body, '', () => seek(j));
      if (j === index) part.setAttribute('aria-current', 'true');
      parts.push(lead, part, tail);
    }
    els.context.replaceChildren(...parts);
    els.context.hidden = false;
  }

  function renderTicks() {
    els.track.querySelectorAll('.rsvp-tick').forEach(tick => tick.remove());
    if (!totalWidth) return;
    for (const item of items) {
      if (item.kind !== 'h2') continue;
      const tick = document.createElement('span');
      tick.className = 'rsvp-tick';
      tick.style[settings.vertical ? 'right' : 'left'] = `${(item.before / totalWidth) * 100}%`;
      els.track.append(tick);
    }
  }

  function renderMeter() {
    const item = items[index];
    if (!item) return;
    const ratio = totalWidth ? item.before / totalWidth : 0;
    els.fill.style.transform = `scaleX(${ratio})`;
    const ms = item.remain;
    const time = ms >= 60000 ? `本文 残り${Math.ceil(ms / 60000)}分` : `本文 残り${Math.max(1, Math.round(ms / 1000))}秒`;
    const figures = items.slice(index + (item.kind === 'figure' ? 1 : 0)).filter(entry => entry.kind === 'figure').length;
    els.remaining.textContent = figures ? `${time} · 図${figures}枚` : time;
  }

  function toast(text) {
    els.toast.textContent = text;
    els.toast.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { els.toast.hidden = true; }, 1400);
  }
  function remainingText() { return els.remaining.textContent; }

  function wakeControls() {
    stage?.removeAttribute('data-idle');
    clearTimeout(idleTimer);
    if (playing && !phone()) idleTimer = setTimeout(() => { if (playing) stage.setAttribute('data-idle', ''); }, 1800);
  }

  // ---------- 設定 ----------
  function persist() { writeJSON(KEY_SETTINGS, settings); }
  function setSpeed(value, { announce = true, restartPlayback = true } = {}) {
    settings.speed = clamp(Math.round(value / SPEED_STEP) * SPEED_STEP, SPEED_MIN, SPEED_MAX);
    persist();
    retimeOnly();
    render();
    renderMeter();
    syncSpeedPicker();
    if (announce) toast(`${settings.speed}字/分 · ${remainingText()}`);
    if (playing && restartPlayback) restart();
  }
  function rechunk(message) {
    applyLook();
    if (!parse) return;
    const keep = anchor();
    rebuild(keep);
    restart();
    if (message) toast(message);
  }
  function setSize(i) { settings.size = clamp(i, 0, SIZE_LABELS.length - 1); persist(); rechunk(`文字 ${SIZE_LABELS[settings.size]}`); }
  function setMin(n) { settings.minChars = n; persist(); rechunk(n === 1 ? '文節ごと' : `最少${n}字`); }
  function stepMin(delta) { setMin(MIN_STEPS[clamp(MIN_STEPS.indexOf(settings.minChars) + delta, 0, MIN_STEPS.length - 1)]); }
  function setPause(i) { settings.pause = i; persist(); retimeOnly(); renderMeter(); toast(`句読点の間 ${PAUSE_LABELS[i]}`); if (playing) restart(); }
  function setVertical(on) { settings.vertical = on; persist(); rechunk(on ? '縦' : '横'); }

  // ---------- 本文との行き来 ----------
  function syncPage(item) {
    const block = item.unit?.el;
    if (!block || block === syncedBlock || !block.isConnected) return;
    syncedBlock = block;
    scrollTo({ top: Math.max(0, scrollY + block.getBoundingClientRect().top - railY()), behavior: 'instant' });
  }

  function closeStage() {
    pause();
    clearTimeout(timer);
    clearTimeout(idleTimer);
    releaseWake();
    if (stage?.open) stage.close();
    document.documentElement.classList.remove('rsvp-open');
    attach(); // 速さを変えた後の「約N分」を入口に反映する
  }

  function flash(el) {
    el.classList.remove('reader-v2-location-flash');
    void el.offsetWidth;
    el.classList.add('reader-v2-location-flash');
    setTimeout(() => el.classList.remove('reader-v2-location-flash'), 1350);
  }

  function land(item) {
    const block = item.unit?.el;
    if (!block?.isConnected) return;
    const range = item.type === 'chunk' ? rangeFor(item.unit, item.start, item.end) : null;
    const rect = range?.getClientRects()[0] || block.getBoundingClientRect();
    scrollTo({ top: Math.max(0, scrollY + rect.top - railY()), behavior: 'instant' });
    flash(block);
  }

  function returnFocus() {
    if (opener?.isConnected) opener.focus({ preventScroll: true });
  }

  function stopAndReturn() {
    if (!stage?.open) return;
    if (items[index]?.kind === 'end') { landAfterReading(); return; }
    const visual = items[index]?.kind === 'figure' ? items[index] : null;
    const item = visual ? nextChunkAfter(index) : currentChunk();
    if (item) saveResume(item);
    else if (visual) writeJSON(KEY_RESUME, null);
    closeStage();
    if (visual?.unit?.el?.isConnected) {
      const block = visual.unit.el;
      scrollTo({ top: Math.max(0, scrollY + block.getBoundingClientRect().top - railY()), behavior: 'instant' });
      flash(block);
    } else if (item) {
      land(item);
    }
    returnFocus();
  }

  function goToSkip(card) {
    const block = card.unit?.el;
    closeStage();
    if (block?.isConnected) {
      scrollTo({ top: Math.max(0, scrollY + block.getBoundingClientRect().top - railY()), behavior: 'instant' });
      if (block.matches('.reader-locator-block')) flash(block);
    }
    returnFocus();
  }

  function landAfterReading() {
    clearTimeout(timer);
    closeStage();
    const readerRoot = root();
    const target = readerRoot.querySelector('.reader-resonance') || readerRoot.querySelector(':scope > .reader-v2-after-reading');
    if (!target) return;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    target.scrollIntoView({ block: 'center', behavior: reduce ? 'instant' : 'smooth' });
    target.querySelector('[data-resonance-seal]')?.focus({ preventScroll: true });
  }

  // ---------- 端末 ----------
  async function requestWake() {
    try { wake = await navigator.wakeLock?.request('screen'); } catch { wake = null; }
    if (wake && !playing) releaseWake();
  }
  function releaseWake() { wake?.release?.().catch(() => {}); wake = null; }
  document.addEventListener('visibilitychange', () => { if (document.hidden) pause(); });
  addEventListener('resize', () => { if (stage?.open && parse) requestAnimationFrame(() => rechunk()); });

  // ---------- ショートカット ----------
  const typing = target => target instanceof Element && !!target.closest('input, textarea, select, [contenteditable=""], [contenteditable="true"]');

  addEventListener('keydown', event => {
    if (event.ctrlKey || event.metaKey || event.altKey || event.isComposing) return;
    if (!stage?.open) {
      if ((event.key === 'r' || event.key === 'R') && !typing(event.target) && readerOpen() && !comparing()) {
        event.preventDefault();
        open('pivot', document.querySelector('#readerRsvpLaunch'));
      }
      return;
    }
    event.stopPropagation(); // 舞台の裏で / M S T やLibraryへ戻るEscを動かさない
    if (typing(event.target)) {
      if (event.key === 'Escape' && !els.speedPicker.hidden) {
        event.preventDefault();
        toggleSpeedPicker(false);
      }
      return;
    }
    const onButton = event.target instanceof Element && event.target.closest('button');
    const forward = settings.vertical ? 'ArrowLeft' : 'ArrowRight';
    const backward = settings.vertical ? 'ArrowRight' : 'ArrowLeft';
    let handled = true;
    switch (event.key) {
      case ' ':
        if (onButton) { handled = false; break; }
        toggle();
        break;
      case 'k': case 'K': toggle(); break;
      case forward: event.shiftKey ? nextSentence() : step(1); break;
      case backward: event.shiftKey ? prevSentence() : step(-1); break;
      case 'ArrowUp': setSpeed(settings.speed + SPEED_STEP); break;
      case 'ArrowDown': setSpeed(settings.speed - SPEED_STEP); break;
      case '+': case '=': setSize(settings.size + 1); break;
      case '-': case '_': setSize(settings.size - 1); break;
      case '[': stepMin(-1); break;
      case ']': stepMin(1); break;
      case 'v': case 'V': setVertical(!settings.vertical); break;
      case 'p': case 'P': setPause((settings.pause + 1) % PAUSE_LABELS.length); break;
      case 'PageDown': jumpSection(1); break;
      case 'PageUp': jumpSection(-1); break;
      case 'Home': seek(0); break;
      case 'Enter':
        if (onButton) { handled = false; break; }
        if (items[index]?.kind === 'skip') goToSkip(items[index]);
        else if (items[index]?.kind === 'end') landAfterReading();
        else toggle();
        break;
      case '?': toggleHelp(); break;
      case 'Escape':
        if (!els.speedPicker.hidden) toggleSpeedPicker(false);
        else if (!els.help.hidden) toggleHelp(false);
        else if (!els.sheet.hidden) toggleSheet(false);
        else stopAndReturn();
        break;
      case 'r': case 'R': stopAndReturn(); break;
      default: handled = false;
    }
    if (handled) event.preventDefault();
    wakeControls();
  }, true);

  // ---------- 入口 ----------
  function estimateMinutes() {
    const units = collectUnits(root());
    const list = buildItems(units, text => text.split(/(?<=[、。，．！？!?\s])/), { minW: 1, maxW: 99 });
    retime(list, settings);
    return Math.max(1, Math.round((list[0]?.remain || 0) / 60000));
  }

  function attach() {
    if (!readerOpen()) return;
    const inner = document.querySelector('#readerModeShell .reader-mode-shell__inner');
    if (inner) {
      let launch = document.getElementById('readerRsvpLaunch');
      if (!launch) {
        launch = document.createElement('button');
        launch.type = 'button';
        launch.id = 'readerRsvpLaunch';
        launch.className = 'reader-rsvp-launch';
        launch.textContent = '▶ 流す';
        launch.setAttribute('aria-label', '今読んでいる所から流して読む(R)');
        launch.title = '今読んでいる所から流して読む(R)';
        launch.addEventListener('click', () => open('pivot', launch));
        inner.classList.add('has-rsvp');
      }
      launch.disabled = comparing();
      launch.title = comparing() ? '比較を閉じると流せます' : '今読んでいる所から流して読む(R)';
      // S2の字幕スイッチが後から末尾に足されても、「▶ 流す」を右端に保つ
      if (inner.lastElementChild !== launch) inner.append(launch);
    }
    const root0 = root();
    const meta = root0?.querySelector(':scope > .reader-v2-intro-meta') || document.querySelector('#readerContent .reader-v2-intro-meta');
    if (meta && !meta.parentElement.querySelector('.reader-rsvp-intro')) {
      const intro = document.createElement('button');
      intro.type = 'button';
      intro.className = 'reader-rsvp-intro';
      intro.innerHTML = '<span class="reader-rsvp-intro__play">▶ 流して読む</span><span class="reader-rsvp-intro__time"></span><kbd>R</kbd>';
      intro.addEventListener('click', () => open('top', intro));
      meta.after(intro);
    }
    const time = document.querySelector('#readerContent .reader-rsvp-intro__time');
    if (time) {
      const minutes = estimateMinutes();
      time.textContent = `約${minutes}分`;
      time.parentElement.setAttribute('aria-label', `最初から流して読む(約${minutes}分、R)`);
    }
  }

  function mount(context) {
    runtimeContext = context;
    requestAnimationFrame(attach);
  }
  if (window.MyEssaysReaderRuntime?.register) {
    window.MyEssaysReaderRuntime.register('rsvp', mount, { priority: 95 });
  }
  document.addEventListener('myessays:reader-ready', () => requestAnimationFrame(attach));
  document.addEventListener('myessays:reader-rendered', () => requestAnimationFrame(attach));
  document.addEventListener('myessays:reading-location-changed', attach); // 帯は後から作られる

  function closeWithoutLanding() {
    if (!stage?.open) return;
    closeStage();
    items = [];
  }
  window.addEventListener('hashchange', closeWithoutLanding);
  document.addEventListener('myessays:reader-version-changed', closeWithoutLanding);

  window.MyEssaysRsvp = Object.freeze({
    installed: true,
    open,
    stop: stopAndReturn,
    seek: i => { if (stage?.open) seek(i); },
    state: () => ({
      open: !!stage?.open, playing, index, total: items.length,
      kind: items[index]?.type === 'chunk' ? 'chunk' : items[index]?.kind,
      text: items[index]?.text, locator: items[index]?.unit?.locator,
      capacity, msPerMora: Math.round(msPerMora), settings: { ...settings }
    }),
    items: () => items.map(item => ({ type: item.type, kind: item.kind, text: item.text, width: item.width, ms: Math.round(item.ms), rest: Math.round(item.rest), pause: item.pause, sentence: item.sentence, locator: item.unit?.locator })),
    lib: { widthOf, moraeOf, splitSentences, splitWide, mergeChunks, buildItems, retime }
  });
})();
