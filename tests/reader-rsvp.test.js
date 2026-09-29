const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.join(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');

function loadLib() {
  const noop = () => {};
  const context = vm.createContext({
    document: { addEventListener: noop, getElementById: () => null, querySelector: () => null },
    localStorage: { getItem: () => null, setItem: noop, removeItem: noop },
    navigator: {}, Intl, console, setTimeout, clearTimeout, performance,
    matchMedia: () => ({ matches: false }), addEventListener: noop, requestAnimationFrame: noop, innerWidth: 1366
  });
  context.window = context;
  vm.runInContext(read('reader-rsvp.js'), context);
  return context.window.MyEssaysRsvp.lib;
}
// vmの中の配列は別の領域の配列なので、Array.fromで写してから比べる
const pieces = texts => { let at = 0; return texts.map(text => ({ text, start: at, end: (at += text.length) })); };

test('index.html loads the RSVP reader after the reader layers', () => {
  const html = read('index.html');
  assert.match(html, /reader-rsvp\.css\?v=\d{8}-\d+/);
  assert.match(html, /reader-rsvp\.js\?v=\d{8}-\d+/);
  assert.ok(html.indexOf('reader-runtime.js') < html.indexOf('reader-rsvp.js'));
});

test('RSVP reader keeps its contracts', () => {
  const js = read('reader-rsvp.js');
  assert.match(js, /MyEssaysReaderRuntime\.register\('rsvp'/);
  assert.match(js, /budoux@0\.9\.2\/module\//);
  assert.match(js, /showModal\(\)/);
  assert.match(js, /myessays:rsvp'/);
  assert.match(js, /myessays:rsvp-resume/);
  assert.match(js, /wakeLock/);
  assert.match(js, /visibilitychange/);
  assert.match(js, /language-compare-mode/);
  assert.match(js, /stopPropagation\(\)/);
  assert.doesNotMatch(js, /new MutationObserver/);
});

test('RSVP elapsed timer tracks active playback and stays visually quiet', () => {
  const js = read('reader-rsvp.js');
  const css = read('reader-rsvp.css');
  const lib = loadLib();

  assert.equal(lib.formatElapsed(0), '00:00');
  assert.equal(lib.formatElapsed(221999), '03:41');
  assert.equal(lib.formatElapsed(3724000), '1:02:04');
  assert.match(js, /activePlayedMs\(\)/);
  assert.match(js, /playedMs \+ \(playing && playStartedAt \? performance\.now\(\) - playStartedAt : 0\)/);
  assert.match(js, /setAttribute\('role', 'timer'\)/);
  assert.match(js, /pauseAtFigure[\s\S]*stopElapsedClock\(\)/);
  assert.match(css, /\.rsvp-elapsed[^}]*font:[^;}]*11px/s);
  assert.match(css, /\.rsvp-stage\[data-state="playing"\] \.rsvp-elapsed\s*\{[^}]*opacity:\s*\.38/s);
});

test('RSVP speed picker reaches 4000 and keeps direct alternatives', () => {
  const js = read('reader-rsvp.js');
  const css = read('reader-rsvp.css');
  assert.match(js, /const SPEED_MAX = 4000;/);
  assert.match(js, /SPEED_PRESETS = \[[^\]]*3000[^\]]*3500[^\]]*4000[^\]]*\]/);
  assert.match(js, /speedRange\.type = 'range'/);
  assert.match(js, /rsvp-speed-picker/);
  assert.match(css, /\.rsvp-speed-value/);
  assert.match(css, /\.rsvp-speed-presets/);
  assert.match(css, /\.rsvp-speed-range[^}]*min-height:\s*44px/s);
});

test('RSVP shows static figures in place and pauses before continuing', () => {
  const js = read('reader-rsvp.js');
  const css = read('reader-rsvp.css');
  assert.match(js, /kind: 'figure'/);
  assert.match(js, /function staticFigure/);
  assert.match(js, /function pauseAtFigure/);
  assert.match(js, /visualGate/);
  assert.match(js, /FIGURE · PAUSED/);
  assert.match(js, /rsvp-figure-resume/);
  assert.match(js, /nextChunkAfter/);
  assert.match(css, /\.rsvp-card\[data-kind="figure"\]/);
  assert.match(css, /\.rsvp-figure-image/);
  assert.match(css, /\.rsvp-figure-resume[^}]*min-height:\s*52px/s);
});

test('RSVP styles stay readable and quiet', () => {
  const css = read('reader-rsvp.css');
  assert.doesNotMatch(css, /gradient\(/);
  assert.match(css, /prefers-reduced-motion/);
  assert.match(css, /writing-mode:\s*vertical-rl/);
  assert.match(css, /text-combine-upright:\s*all/);
  assert.match(css, /\.rsvp-stage:not\(\[open\]\)\s*\{\s*display:\s*none/);
  for (const [, size] of css.matchAll(/(?:font-size:|font:[^;]*?)\s(\d+(?:\.\d+)?)px/g)) {
    assert.ok(Number(size) >= 11, `font size ${size}px is below 11px`);
  }
});

test('phrases merge up to the minimum and close at punctuation', () => {
  const lib = loadLib();
  assert.deepEqual(Array.from(lib.mergeChunks(pieces(['この', '四文字を、', '声に', '出さずに', '読んで', 'みる。']), 6, 10), c => c.text), ['この四文字を、', '声に出さずに', '読んでみる。']);
  assert.deepEqual(Array.from(lib.mergeChunks(pieces(['本当に', '納得していたか。']), 6, 10), c => c.text), ['本当に', '納得していたか。']);
});

test('RSVP never strands closing punctuation as its own frame', () => {
  const lib = loadLib();

  const normalized = Array.from(lib.attachOrphanClosing(pieces(['あいうえおか', '。']), 6));
  assert.deepEqual(normalized.map(p => p.text), ['あいうえお', 'か。']);
  assert.ok(normalized.every(p => lib.widthOf(p.text) <= 6));
  assert.deepEqual(normalized.map(p => [p.start, p.end]), [[0, 5], [5, 7]]);

  const cases = [
    ['これは文章です。', text => text.split(/(?=。)/)],
    ['え、本当に？', text => text.split(/(?=[、？])/)],
    ['違う！', text => text.split(/(?=!)/)]
  ];
  for (const [text, split] of cases) {
    const items = lib.buildItems([{ kind: 'text', text }], split, { minW: 1, maxW: 6 });
    const chunks = Array.from(items).filter(item => item.type === 'chunk');
    assert.ok(chunks.every(chunk => !/^[、。，．,！？!?;；:：」』）)\]】》〉〕〗〙〛”"’…―]/.test(chunk.text)), chunks.map(c => c.text).join('|'));
    assert.equal(chunks.map(c => c.text).join(''), text);
    assert.ok(chunks.every(chunk => chunk.width <= 6), chunks.map(c => c.text).join('|'));
  }

  const periodItems = lib.buildItems([{ kind: 'text', text: 'そう思った。' }], text => text.split(/(?=。)/), { minW: 1, maxW: 6 });
  const periodChunks = Array.from(periodItems).filter(item => item.type === 'chunk');
  assert.equal(periodChunks.at(-1).text.endsWith('。'), true);
  assert.equal(periodChunks.at(-1).pause, 'paragraph');
});

test('sentences, English words, katakana compounds and numbers split safely', () => {
  const lib = loadLib();
  const text = '約60.72kmある。37.73 miles. 公式ガイドがはっきり書いている。';
  assert.deepEqual(Array.from(lib.splitSentences(text), ([a, b]) => text.slice(a, b).trim()), ['約60.72kmある。', '37.73 miles.', '公式ガイドがはっきり書いている。']);
  assert.deepEqual(Array.from(lib.splitWide({ text: 'It runs through towns, countryside', start: 0, end: 34 }, 17), p => p.text.trim()), ['It', 'runs', 'through', 'towns,', 'countryside']);
  assert.deepEqual(Array.from(lib.splitWide({ text: 'スネーフェル・マウンテン・コース', start: 0, end: 16 }, 8), p => p.text), ['スネーフェル・', 'マウンテン・', 'コース']);
  const parts = Array.from(lib.splitWide({ text: '平均速度が約219.4km/hである', start: 0, end: 18 }, 6), p => p.text);
  parts.forEach((part, i) => assert.ok(!(/[0-9]$/.test(part) && /^[0-9.]/.test(parts[i + 1] || '')), parts.join('|')));
});

test('timing follows the speed and pauses grow with punctuation', () => {
  const lib = loadLib();
  assert.equal(lib.moraeOf('きょう'), 2);
  assert.equal(lib.moraeOf('声'), 1.8);
  const items = lib.buildItems([{ kind: 'title', text: '題' }, { kind: 'text', text: 'この四文字を、声に出さずに読んでみる。怒っていたか。' }], t => t.split(/(?<=[、。])/), { minW: 6, maxW: 10 });
  const chunks = Array.from(items).filter(item => item.type === 'chunk');
  lib.retime(items, { speed: 600, pause: 2 });
  const width = chunks.reduce((sum, c) => sum + c.width, 0);
  const shown = chunks.reduce((sum, c) => sum + c.ms, 0);
  assert.ok(Math.abs(shown / (width / 600 * 60000) - 1) < 0.05);
  const rest = kind => chunks.find(c => c.pause === kind).rest;
  assert.ok(rest('comma') < rest('period') && rest('period') < rest('paragraph'));
  lib.retime(items, { speed: 600, pause: 0 });
  assert.ok(chunks.every(c => c.rest === 0));
  assert.equal(items.at(-1).kind, 'end');
});
