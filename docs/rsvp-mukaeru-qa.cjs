// 「追わずに、迎える」(流して読む/RSVP)の受け入れ確認用スクリプト。
// 実装前後で同じ項目を測り、スクリーンショットを残す。未実装の機能はnullで返す。
// 使い方: BASE_URL=http://127.0.0.1:4173/ node docs/rsvp-mukaeru-qa.cjs
//   任意: OUT_DIR=<出力先> ESSAY=<記事ID> ESSAY_FIG=<図と参考文献のある記事ID>
// 判定は計画書「9. 検証と目標」。pass: false の項目があれば終了コード1で終わる。
const { chromium } = require('playwright');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const RAW_BASE = process.env.BASE_URL || 'http://127.0.0.1:4173/';
const BASE = /\.html$/.test(RAW_BASE) ? RAW_BASE : RAW_BASE.replace(/\/?$/, '/'); // 試作(docs/rsvp-mukaeru-mock.html)も直接測れる
const OUT = process.env.OUT_DIR || path.join(os.tmpdir(), 'myessays-rsvp-mukaeru');
const ESSAY = process.env.ESSAY || 'silent-reading-imagined-voice-mode'; // English Mixあり・引用と参考資料あり
const ESSAY_FIG = process.env.ESSAY_FIG || 'waiting-time-service-design'; // コード枠の図・h3・参考文献あり
fs.mkdirSync(OUT, { recursive: true });

const PUNCT_END = /[、。，．,！？!?;；:：」』）)\]】”"’…―]$/;
const checks = [];
const check = (name, pass, detail) => { checks.push({ name, pass: !!pass, detail }); return !!pass; };

async function openReader(browser, { width, height, lang = 'ja', essay = ESSAY, mobile = false }) {
  const context = await browser.newContext({
    viewport: { width, height },
    deviceScaleFactor: mobile ? 2 : 1,
    isMobile: mobile,
    hasTouch: mobile
  });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(String(error)));
  await page.goto(`${BASE}#/essay/${essay}?lang=${lang}`);
  await page.waitForSelector('#readerContent [data-reading-locator]', { timeout: 40000 });
  await page.waitForTimeout(1800);
  return { context, page, errors };
}

const rsvpReady = page => page.evaluate(() => !!window.MyEssaysRsvp?.installed);
const state = page => page.evaluate(() => window.MyEssaysRsvp.state());
const items = page => page.evaluate(() => window.MyEssaysRsvp.items());
const press = async (page, key, wait = 120) => { await page.keyboard.press(key); await page.waitForTimeout(wait); };

// 本文の途中の段落を読書線へ動かし、読んでいる段落の座標を返す
async function readTo(page, nth) {
  return page.evaluate(async n => {
    const blocks = [...document.querySelectorAll('#readerContent > p.reader-locator-block[data-reading-locator]')]
      .filter(el => el.textContent.trim().length > 40 && !el.querySelector('a'));
    const block = blocks[Math.min(n, blocks.length - 1)];
    const rail = window.MyEssaysReadingPivot?.readingRailY?.() ?? innerHeight * 0.4;
    window.scrollTo(0, scrollY + block.getBoundingClientRect().top - rail + 4);
    await new Promise(resolve => setTimeout(resolve, 900));
    return document.querySelector('#readerContent .is-reading-pivot')?.dataset.readingLocator || null;
  }, nth);
}

const launchers = page => page.evaluate(() => {
  const band = document.querySelector('#readerModeShell #readerRsvpLaunch');
  const intro = document.querySelector('#readerContent .reader-rsvp-intro');
  const shell = document.getElementById('readerModeShell')?.getBoundingClientRect();
  const box = el => { const r = el.getBoundingClientRect(); return { x: Math.round(r.left), y: Math.round(r.top), w: Math.round(r.width), h: Math.round(r.height) }; };
  return {
    band: band ? { ...box(band), text: band.textContent.trim(), fontSize: parseFloat(getComputedStyle(band).fontSize), insideBand: !!shell && band.getBoundingClientRect().bottom <= shell.bottom + 1 && band.getBoundingClientRect().right <= innerWidth } : null,
    intro: intro ? { ...box(intro), text: intro.textContent.replace(/\s+/g, ' ').trim(), afterMeta: intro.previousElementSibling?.classList.contains('reader-v2-intro-meta') || false } : null,
    horizontalOverflow: document.documentElement.scrollWidth > innerWidth + 2
  };
});

// 分割の契約: 容量、最少文字数、数字の途中で割らない
function chunkContract(list, st) {
  const chunks = list.filter(item => item.type === 'chunk');
  const minW = Math.min(st.settings.minChars, st.capacity);
  const over = chunks.filter(c => c.width > st.capacity + 0.01).map(c => c.text);
  const shortAvoidable = chunks.filter((c, i) => {
    const next = chunks[i + 1];
    if (c.width >= minW || PUNCT_END.test(c.text) || !next || next.sentence !== c.sentence) return false;
    return c.width + next.width <= st.capacity; // つなげたのに、つないでいない
  }).map(c => c.text);
  const numberSplit = chunks.filter((c, i) => /[0-9]$/.test(c.text) && /^[0-9.,]/.test(chunks[i + 1]?.text || '') && chunks[i + 1]?.sentence === c.sentence).map(c => c.text);
  return { count: chunks.length, capacity: st.capacity, minW, over: over.slice(0, 5), shortAvoidable: shortAvoidable.slice(0, 5), numberSplit: numberSplit.slice(0, 5) };
}

function timing(list, st) {
  const chunks = list.filter(item => item.type === 'chunk');
  const width = chunks.reduce((sum, c) => sum + c.width, 0);
  const show = chunks.reduce((sum, c) => sum + c.ms, 0);
  const avg = kind => { const r = chunks.filter(c => c.pause === kind).map(c => c.rest); return r.length ? Math.round(r.reduce((a, b) => a + b, 0) / r.length) : null; };
  return { ratio: +(show / (width / st.settings.speed * 60000)).toFixed(3), rest: { comma: avg('comma'), period: avg('period'), paragraph: avg('paragraph') } };
}

async function measurePc(browser) {
  const { context, page, errors } = await openReader(browser, { width: 1366, height: 633 });
  const result = { launchers: await launchers(page) };
  check('pc: 帯の「▶ 流す」', result.launchers.band?.insideBand && result.launchers.band.fontSize >= 11, result.launchers.band);
  check('pc: 冒頭の「▶ 流して読む 約N分」', /流して読む.*約\d+分/.test(result.launchers.intro?.text || '') && result.launchers.intro.afterMeta, result.launchers.intro);
  if (!(await rsvpReady(page))) { result.implemented = false; await context.close(); return result; }
  result.implemented = true;

  // Rキーで、読んでいる段落から開く
  const pivot = await readTo(page, 12);
  await page.evaluate(() => document.activeElement?.blur());
  await press(page, 'r', 700);
  let st = await state(page);
  result.openFromPivot = { pivot, open: st.open, startLocator: st.locator, text: st.text };
  check('pc: Rで読んでいる段落から開く', st.open && st.locator === pivot, result.openFromPivot);
  await page.waitForTimeout(1500);
  await page.screenshot({ path: path.join(OUT, 'pc-playing.png') });

  // 分割と時間
  const list = await items(page);
  result.chunks = chunkContract(list, st);
  check('pc: 文節が容量以下', result.chunks.over.length === 0, result.chunks.over);
  check('pc: 最少文字数(つなげる所はつなぐ)', result.chunks.shortAvoidable.length === 0, result.chunks.shortAvoidable);
  check('pc: 数字の途中で割らない', result.chunks.numberSplit.length === 0, result.chunks.numberSplit);
  result.timing = timing(list, st);
  check('pc: 表示の合計が字数÷速さの±3〜8%', result.timing.ratio >= 0.97 && result.timing.ratio <= 1.08, result.timing.ratio);
  check('pc: 間は、<。<段落', result.timing.rest.comma < result.timing.rest.period && result.timing.rest.period < result.timing.rest.paragraph, result.timing.rest);

  // ショートカット
  const keys = {};
  await press(page, 'Space'); st = await state(page); keys.space = !st.playing;
  const before = st.index;
  await press(page, 'ArrowRight'); st = await state(page); keys.right = st.index > before && st.kind === 'chunk';
  await press(page, 'ArrowRight'); await press(page, 'Shift+ArrowLeft'); st = await state(page);
  keys.shiftLeft = (await page.evaluate(i => { const all = window.MyEssaysRsvp.items(); return i === 0 || all[i - 1].type !== 'chunk' || all[i - 1].sentence !== all[i].sentence; }, st.index));
  const speed = st.settings.speed;
  await press(page, 'ArrowUp'); st = await state(page); keys.up = st.settings.speed === speed + 50;
  const size = st.settings.size;
  await press(page, '+'); st = await state(page); keys.plus = st.settings.size === size + 1;
  await press(page, '-'); st = await state(page); keys.minus = st.settings.size === size;
  const min = st.settings.minChars;
  await press(page, ']'); st = await state(page); keys.bracket = st.settings.minChars > min;
  await press(page, '['); st = await state(page); keys.bracketBack = st.settings.minChars === min;
  const pause = st.settings.pause;
  await press(page, 'p'); st = await state(page); keys.p = st.settings.pause !== pause;
  const restNone = await page.evaluate(async startPause => {
    // 句読点の間「なし」で間が0になるか
    let guard = 0;
    while (window.MyEssaysRsvp.state().settings.pause !== 0 && guard++ < 4) document.getElementById('rsvpStage').dispatchEvent(new KeyboardEvent('keydown', { key: 'p', bubbles: true }));
    const zero = window.MyEssaysRsvp.items().every(item => item.type !== 'chunk' || item.rest === 0);
    while (window.MyEssaysRsvp.state().settings.pause !== startPause && guard++ < 12) document.getElementById('rsvpStage').dispatchEvent(new KeyboardEvent('keydown', { key: 'p', bubbles: true }));
    return zero;
  }, pause);
  keys.pauseNone = restNone;
  await press(page, 'PageDown'); st = await state(page); keys.pageDown = st.kind === 'h2';
  await press(page, 'Shift+Slash'); keys.help = await page.evaluate(() => !document.querySelector('#rsvpStage .rsvp-help').hidden);
  await press(page, 'Escape'); keys.helpClosed = await page.evaluate(() => document.querySelector('#rsvpStage .rsvp-help').hidden && document.getElementById('rsvpStage').open);
  const hash = await page.evaluate(() => location.hash);
  await press(page, 'Slash'); await press(page, 'm');
  keys.pageKeysBlocked = await page.evaluate(h => location.hash === h && document.getElementById('rsvpStage').open && !document.getElementById('notePanel')?.classList.contains('is-open'), hash);
  result.keys = keys;
  Object.entries(keys).forEach(([name, ok]) => check(`pc: キー ${name}`, ok));
  await press(page, 'Shift+ArrowLeft');
  await page.screenshot({ path: path.join(OUT, 'pc-paused.png') });

  // Escで本文へ戻る
  st = await state(page);
  const stopped = await page.evaluate(() => { const s = window.MyEssaysRsvp.state(); return { locator: s.locator, text: s.text }; });
  await press(page, 'Escape', 1200);
  result.stop = await page.evaluate(({ h }) => {
    const pivotEl = document.querySelector('#readerContent .is-reading-pivot');
    const rail = window.MyEssaysReadingPivot?.readingRailY?.() ?? null;
    return {
      closed: !document.getElementById('rsvpStage')?.open,
      hashSame: location.hash === h,
      pivot: pivotEl?.dataset.readingLocator || null,
      pivotTop: pivotEl ? Math.round(pivotEl.getBoundingClientRect().top) : null,
      pivotBottom: pivotEl ? Math.round(pivotEl.getBoundingClientRect().bottom) : null,
      rail: rail === null ? null : Math.round(rail),
      resume: JSON.parse(localStorage.getItem('myessays:rsvp-resume') || 'null'),
      focus: document.activeElement?.id || document.activeElement?.className || ''
    };
  }, { h: hash });
  result.stop.stopped = stopped;
  check('pc: Escで閉じ、Libraryへ戻らない', result.stop.closed && result.stop.hashSame, result.stop);
  check('pc: 止めた文節の段落が読んでいる段落になる', result.stop.pivot === stopped.locator, { pivot: result.stop.pivot, stopped: stopped.locator });
  check('pc: 止めた段落が読書線にかかる(±24px)', result.stop.rail === null || (result.stop.pivotTop <= result.stop.rail + 24 && result.stop.pivotBottom >= result.stop.rail - 24), result.stop);
  await page.screenshot({ path: path.join(OUT, 'pc-returned.png') });

  // 続きから: 同じ段落から開くと、止めた文の頭から
  await press(page, 'r', 700);
  const resumed = await page.evaluate(stop => {
    const all = window.MyEssaysRsvp.items();
    const s = window.MyEssaysRsvp.state();
    const hit = all.findIndex(item => item.type === 'chunk' && item.locator === stop.locator && item.text === stop.text);
    let head = hit;
    while (head > 0 && all[head - 1].type === 'chunk' && all[head - 1].sentence === all[hit].sentence) head -= 1;
    return { index: s.index, expected: head, text: s.text };
  }, stopped);
  result.resume = resumed;
  check('pc: 続きは止めた文の頭から', resumed.index === resumed.expected, resumed);

  // 縦(巻物の向き)
  await press(page, 'Space');
  if ((await state(page)).playing) await press(page, 'Space');
  await press(page, 'v', 400);
  const vertical = { before: (await state(page)).index };
  await press(page, 'ArrowLeft');
  Object.assign(vertical, await page.evaluate(() => {
    const stage = document.getElementById('rsvpStage');
    const fill = stage.querySelector('.rsvp-fill');
    return {
      orientation: stage.dataset.orientation,
      writingMode: getComputedStyle(stage.querySelector('.rsvp-word')).writingMode,
      fillFromRight: parseFloat(getComputedStyle(fill).transformOrigin) > fill.getBoundingClientRect().width / 2,
      index: window.MyEssaysRsvp.state().index
    };
  }));
  vertical.leftAdvances = vertical.index > vertical.before;
  const tcy = await page.evaluate(() => {
    const all = window.MyEssaysRsvp.items();
    const i = all.findIndex(item => item.type === 'chunk' && /(^|[^0-9.,])[0-9]{2}([^0-9.,]|$)/.test(item.text));
    if (i < 0) return null;
    window.MyEssaysRsvp.seek(i);
    return !!document.querySelector('#rsvpStage .rsvp-word .rsvp-tcy');
  });
  vertical.tcy = tcy;
  result.vertical = vertical;
  check('pc: 縦は vertical-rl', vertical.writingMode === 'vertical-rl', vertical);
  check('pc: 縦は←で進む', vertical.leftAdvances, vertical);
  check('pc: 縦は進捗が右から', vertical.fillFromRight, vertical);
  check('pc: 縦で2桁の数字は縦中横', tcy !== false, tcy);
  await page.screenshot({ path: path.join(OUT, 'pc-vertical.png') });

  // 設定の記憶
  await press(page, 'Escape', 600);
  await page.reload();
  await page.waitForSelector('#readerContent [data-reading-locator]', { timeout: 40000 });
  await page.waitForTimeout(1500);
  result.persisted = await page.evaluate(() => JSON.parse(localStorage.getItem('myessays:rsvp') || 'null'));
  check('pc: 設定を覚える', result.persisted?.vertical === true && result.persisted?.speed === speed + 50, result.persisted);
  await page.evaluate(() => localStorage.removeItem('myessays:rsvp'));

  // 終幕: 最後の文節から最速で流す
  await page.reload();
  await page.waitForSelector('#readerContent [data-reading-locator]', { timeout: 40000 });
  await page.waitForTimeout(1500);
  await page.evaluate(() => window.MyEssaysRsvp.open('top'));
  await page.waitForTimeout(900);
  await press(page, 'Space');
  for (let i = 0; i < 24; i += 1) await press(page, 'ArrowUp', 20);
  const last = await page.evaluate(() => { const all = window.MyEssaysRsvp.items(); window.MyEssaysRsvp.seek(all.length - 2); return all[all.length - 2]; });
  await press(page, 'Space', Math.round((last.ms + last.rest) * 1.6) + 600);
  const endCard = await page.evaluate(() => ({ kind: window.MyEssaysRsvp.state().kind, text: document.querySelector('#rsvpStage .rsvp-card')?.innerText || '' }));
  await page.screenshot({ path: path.join(OUT, 'pc-end.png') });
  await page.waitForTimeout(3600);
  const landed = await page.evaluate(() => {
    const seal = document.querySelector('[data-resonance-seal]');
    const r = seal?.getBoundingClientRect();
    return { closed: !document.getElementById('rsvpStage')?.open, focusOnSeal: !!seal && document.activeElement === seal, sealInView: !!r && r.top >= 0 && r.bottom <= innerHeight, resume: localStorage.getItem('myessays:rsvp-resume') };
  });
  result.end = { endCard, landed };
  check('pc: 終幕の「了」', endCard.kind === 'end' && endCard.text.includes('了'), endCard);
  check('pc: 終幕の後、読了の印へ', landed.closed && landed.focusOnSeal && landed.sealInView && landed.resume === null, landed);

  result.horizontalOverflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 2);
  check('pc: 横のはみ出しなし', !result.horizontalOverflow);
  result.pageErrors = errors;
  check('pc: ページのエラーなし', errors.length === 0, errors);
  await context.close();
  return result;
}

async function measurePhone(browser) {
  const { context, page, errors } = await openReader(browser, { width: 390, height: 844, mobile: true });
  const result = { launchers: await launchers(page) };
  check('phone: 帯の「▶ 流す」', result.launchers.band?.insideBand && !result.launchers.horizontalOverflow, result.launchers);
  if (!(await rsvpReady(page))) { result.implemented = false; await context.close(); return result; }
  result.implemented = true;

  const pivot = await readTo(page, 8);
  await page.locator('#readerRsvpLaunch').tap();
  await page.waitForTimeout(2600);
  const st = await state(page);
  result.open = { pivot, locator: st.locator, playing: st.playing, capacity: st.capacity, settings: st.settings };
  check('phone: 帯から、読んでいる段落の近くで開く', st.open && st.playing, result.open);
  await page.screenshot({ path: path.join(OUT, 'phone-playing.png') });

  result.layout = await page.evaluate(() => {
    const stage = document.getElementById('rsvpStage');
    const visible = el => el.getClientRects().length && getComputedStyle(el).visibility !== 'hidden';
    const buttons = [...stage.querySelectorAll('button')].filter(visible).filter(b => !b.closest('.rsvp-context, .rsvp-sheet, .rsvp-help'));
    const outside = buttons.filter(b => { const r = b.getBoundingClientRect(); return r.left < 0 || r.right > innerWidth || r.top < 0 || r.bottom > innerHeight; }).map(b => b.textContent.trim());
    const small = buttons.filter(b => { const r = b.getBoundingClientRect(); return Math.min(r.width, r.height) < 44; }).map(b => b.textContent.trim());
    const toggle = stage.querySelector('.rsvp-toggle').getBoundingClientRect();
    const texts = [...stage.querySelectorAll('*')].filter(el => visible(el) && [...el.childNodes].some(n => n.nodeType === 3 && n.data.trim()));
    const minFont = Math.min(...texts.map(el => parseFloat(getComputedStyle(el).fontSize)));
    const word = stage.querySelector('.rsvp-word').getBoundingClientRect();
    const field = stage.querySelector('.rsvp-field').getBoundingClientRect();
    return { outside, small, toggle: Math.round(Math.min(toggle.width, toggle.height)), minFont, wordInside: word.left >= field.left - 1 && word.right <= field.right + 1, overflow: document.documentElement.scrollWidth > innerWidth + 2 };
  });
  check('phone: 操作が画面内', result.layout.outside.length === 0, result.layout.outside);
  check('phone: 再生ボタン56px以上、ほかは44px以上', result.layout.toggle >= 56 && result.layout.small.length === 0, result.layout);
  check('phone: 文字は11px以上', result.layout.minFont >= 11, result.layout.minFont);
  check('phone: 文節が舞台の幅に収まる', result.layout.wordInside, result.layout);

  await page.locator('#rsvpStage .rsvp-field').tap({ position: { x: 195, y: 120 } });
  await page.waitForTimeout(400);
  result.paused = await page.evaluate(() => ({ playing: window.MyEssaysRsvp.state().playing, context: !document.querySelector('#rsvpStage .rsvp-context').hidden }));
  check('phone: タップで一時停止し、文全体が出る', !result.paused.playing && result.paused.context, result.paused);
  await page.screenshot({ path: path.join(OUT, 'phone-paused.png') });

  await page.locator('#rsvpStage .rsvp-tools button').first().tap();
  await page.waitForTimeout(400);
  result.sheet = await page.evaluate(() => { const s = document.querySelector('#rsvpStage .rsvp-sheet'); const r = s.getBoundingClientRect(); return { open: !s.hidden, inside: r.bottom <= innerHeight + 1 && r.top >= 0 }; });
  check('phone: 設定のシート', result.sheet.open && result.sheet.inside, result.sheet);
  await page.screenshot({ path: path.join(OUT, 'phone-sheet.png') });
  await page.locator('#rsvpStage .rsvp-sheet button', { hasText: '縦' }).tap();
  await page.waitForTimeout(300);
  await page.locator('#rsvpStage .rsvp-sheet button', { hasText: '閉じる' }).tap();
  await page.waitForTimeout(500);
  result.vertical = await page.evaluate(() => {
    const stage = document.getElementById('rsvpStage');
    const word = stage.querySelector('.rsvp-word').getBoundingClientRect();
    const field = stage.querySelector('.rsvp-field').getBoundingClientRect();
    const context = stage.querySelector('.rsvp-context');
    const c = context.hidden ? null : context.getBoundingClientRect();
    return { orientation: stage.dataset.orientation, capacity: window.MyEssaysRsvp.state().capacity, wordInside: word.top >= field.top - 1 && word.bottom <= field.bottom + 1, contextInside: !c || (c.top >= field.top - 1 && c.bottom <= field.bottom + 1) };
  });
  check('phone: 縦で文節と文全体が舞台に収まる', result.vertical.orientation === 'vertical' && result.vertical.wordInside && result.vertical.contextInside, result.vertical);
  await page.screenshot({ path: path.join(OUT, 'phone-vertical.png') });

  await page.locator('#rsvpStage .rsvp-stop').tap();
  await page.waitForTimeout(800);
  result.closed = await page.evaluate(() => !document.getElementById('rsvpStage')?.open);
  check('phone: ■で本文へ', result.closed);
  result.pageErrors = errors;
  check('phone: ページのエラーなし', errors.length === 0, errors);
  await context.close();
  return result;
}

async function measureFigures(browser) {
  const { context, page, errors } = await openReader(browser, { width: 1366, height: 633, essay: ESSAY_FIG });
  if (!(await rsvpReady(page))) { await context.close(); return null; }
  await page.evaluate(() => window.MyEssaysRsvp.open('top'));
  await page.waitForTimeout(900);
  await press(page, 'Space');
  const result = await page.evaluate(() => {
    const all = window.MyEssaysRsvp.items();
    const chunks = all.filter(item => item.type === 'chunk');
    const heads = [...document.querySelectorAll('#readerContent > h2, #readerContent > h3')];
    const refs = heads.find(h => /参考文献|参考資料|引用文献|出典|References|Sources|Bibliography/i.test(h.textContent));
    const lastLocator = chunks.at(-1)?.locator;
    const lastBlock = lastLocator && document.querySelector(`#readerContent [data-reading-locator="${lastLocator}"]`);
    const skip = all.findIndex(item => item.kind === 'skip');
    return {
      title: all[0]?.kind,
      skipCards: all.filter(item => item.kind === 'skip').length,
      headingCards: all.filter(item => item.kind === 'h2' || item.kind === 'h3').length,
      endsBeforeReferences: !refs || !lastBlock || !!(lastBlock.compareDocumentPosition(refs) & Node.DOCUMENT_POSITION_FOLLOWING),
      skip
    };
  });
  check('fig: 題の札から始まる', result.title === 'title', result.title);
  check('fig: 図表の札が出る', result.skipCards > 0, result.skipCards);
  check('fig: 参考文献の手前で終わる', result.endsBeforeReferences, result);
  if (result.skip >= 0) {
    await page.evaluate(i => window.MyEssaysRsvp.seek(i), result.skip);
    await page.waitForTimeout(300);
    await page.screenshot({ path: path.join(OUT, 'fig-skip.png') });
    await press(page, 'Enter', 900);
    result.enterGoesToFigure = await page.evaluate(() => !document.getElementById('rsvpStage')?.open);
    check('fig: 札でEnterを押すと本文の図へ', result.enterGoesToFigure);
  }
  result.pageErrors = errors;
  await context.close();
  return result;
}

async function measureEnglishMix(browser) {
  const { context, page, errors } = await openReader(browser, { width: 1366, height: 633, lang: 'en' });
  if (!(await rsvpReady(page))) { await context.close(); return null; }
  await page.evaluate(() => window.MyEssaysRsvp.open('top'));
  await page.waitForTimeout(900);
  await press(page, 'Space');
  const st = await state(page);
  const list = await items(page);
  const chunks = list.filter(item => item.type === 'chunk');
  const words = chunks.map(c => (c.text.match(/[A-Za-z][A-Za-z'’-]*/g) || []).length);
  const result = { contract: chunkContract(list, st), maxEnglishWords: Math.max(...words), sample: chunks.filter(c => /[A-Za-z]{3}/.test(c.text)).slice(0, 8).map(c => c.text) };
  check('en: 英文は単語で割れる(1つに6語以下)', result.maxEnglishWords <= 6, result.sample);
  check('en: 文節が容量以下', result.contract.over.length === 0, result.contract.over);
  result.pageErrors = errors;
  await context.close();
  return result;
}

(async () => {
  const browser = await chromium.launch();
  const result = {
    base: BASE,
    essay: ESSAY,
    measuredAt: new Date().toISOString(),
    pc: await measurePc(browser),
    phone: await measurePhone(browser),
    figures: await measureFigures(browser),
    englishMix: await measureEnglishMix(browser)
  };
  await browser.close();
  result.checks = checks;
  result.failed = checks.filter(c => !c.pass).map(c => c.name);
  fs.writeFileSync(path.join(OUT, 'result.json'), JSON.stringify(result, null, 2));
  console.log(JSON.stringify({ base: result.base, implemented: result.pc.implemented, failed: result.failed, passed: checks.length - result.failed.length }, null, 2));
  console.log(`details: ${path.join(OUT, 'result.json')}`);
  console.log(`screenshots: ${OUT}`);
  if (result.failed.length) process.exitCode = 1;
})().catch(error => {
  console.error(error);
  process.exit(1);
});
