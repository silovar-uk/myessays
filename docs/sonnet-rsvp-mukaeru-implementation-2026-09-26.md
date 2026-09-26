# 実装依頼: MyEssays「追わずに、迎える」(流して読む/RSVP)

作成日: 2026-09-26 / 依頼先: 実装担当(Sonnet) / 対象: `silovar-uk/myessays`(公開リポジトリ、mainがそのままGitHub Pagesへ公開)

## 1. 最初に読むもの

1. `docs/rsvp-mukaeru-plan-2026-09-26.md`: 計画の正。規則・数値・既定値はこちらです。
2. リポジトリ直下の`AGENTS.md`: 成果物に関西弁を入れない。和文と半角英数字の間にスペースを入れない。
3. 試作: https://claude.ai/artifact/HDLyhZNLX9YPSC1b9zaMTy(Artifactツールの`read`で読めます)。写しは`docs/rsvp-mukaeru-mock.html`で、ブラウザで直接開けます。**試作の`<script>`にある`const Rsvp = (() => { … })();`が実装の雛形です。** 5-2の置き換えをして`reader-rsvp.js`へ移します。CSSは`.rsvp-*`と`.reader-rsvp-*`と`html.rsvp-open`の規則を`reader-rsvp.css`へ移します。
4. 受け入れ確認: `docs/rsvp-mukaeru-qa.cjs`。2026-09-26に、公開版で`implemented: false`、試作で52項目すべて合格を確認済みです。

行番号は`origin/main`の`9810901`時点です。着手時に必ず最新のmainで照合してください。

## 2. 目的と完了条件

目的: 記事を文節ごとに同じ場所へ流して読む機能を足す。主な場面はスマホのすき間時間です。本文、言語切替、比較、Structure、メモ、読書記録、URLの動きは変えません。新しい保存キーは`myessays:rsvp`(設定)と`myessays:rsvp-resume`(続きの位置)だけです。

完了条件:

- PR「流して読む」がmainへ取り込まれ、GitHub Pagesで公開されている。
- 公開URLに対して`docs/rsvp-mukaeru-qa.cjs`を実行し、`failed`が空になっている(計画書9章)。
- 静的テストの失敗が、着手時のベースラインから増えていない。新しい`tests/reader-rsvp.test.js`は通る。
- 手元のブラウザQA(4章)が、変更前より悪くなっていない。
- 最後に、PRのURL、QAの結果、スクリーンショットの保存先、残った課題を報告している(10章)。

## 3. 作業場所の準備

`C:\Users\vediv\repos\myessays-src`は古いcloneです。mainが`origin/main`より大きく遅れ、未pushのローカルコミット`0fdb579`、変更中の`AGENTS.md`、未追跡の`docs/`があります。**この作業ツリーでpull・reset・rebase・stash・checkoutをしないでください。** worktreeを別に作ります。`../myessays-sukashi`や`../myessays-akari`が既にあれば触りません。

```bash
cd /c/Users/vediv/repos/myessays-src
git fetch origin
git worktree add ../myessays-rsvp -b feature/rsvp origin/main
grep -q '^node_modules/$' .git/info/exclude || printf 'node_modules/\npackage-lock.json\npackage.json\n' >> .git/info/exclude
cd ../myessays-rsvp
npm install --no-save playwright@1.63.0
```

- `playwright@1.63.0`は、手元のChromium(`%LOCALAPPDATA%\ms-playwright\chromium-1243`)と組み合わせる版です。
- 計画書一式(`docs/rsvp-mukaeru-plan-2026-09-26.md`、この依頼書、`docs/rsvp-mukaeru-qa.cjs`、`docs/rsvp-mukaeru-mock.html`)を`myessays-src/docs/`からworktreeの`docs/`へ写し、PRのコミットに含めます。ほかの`docs/`のファイル(9/14、9/25、9/26の別計画)は含めません。
- ローカルサーバーはworktree直下で`python -m http.server 4173 --bind 127.0.0.1`を背景で起動します。
- 検証はPlaywrightのヘッドレスで行います。Claude desktopのBrowserペインは、非表示の時に`requestAnimationFrame`とスクロールイベントが止まり、読んでいる段落が更新されません。

## 4. ベースライン(変更前に取る)

```bash
node --test tests/*.test.js 2>&1 | tail -40
BASE_URL=http://127.0.0.1:4173/ OUT_DIR=/c/Users/vediv/AppData/Local/Temp/rsvp-before node docs/rsvp-mukaeru-qa.cjs
for s in reading-versions-qa reading-pivot-qa page-reader-qa reading-focus-instant-qa reading-mode-url-qa japanese-reference-qa selection-paragraph-qa argument-structure-qa; do BASE_URL=http://127.0.0.1:4173 node scripts/$s.cjs > /c/Users/vediv/AppData/Local/Temp/rsvp-before-$s.txt 2>&1 || echo "FAILED(before): $s"; done
```

- 静的テストは、2026-09-26時点でWindowsでは103件中11件が既存の理由で失敗します(CIでは10件)。着手時の失敗名を記録し、増えていないことを毎回確かめます。修正は範囲外です。
- `rsvp-mukaeru-qa.cjs`は、変更前は`implemented: false`で、入口の3項目が失敗するのが正常です。
- 既存のブラウザQAで変更前から失敗するもの(例: `japanese-reference-qa.cjs`)は、名前を記録しておきます。

## 5. 実装

### 5-1 ファイルと読み込み

| ファイル | 変更 |
| --- | --- |
| `reader-rsvp.js` | 新規。試作の`Rsvp`モジュールを5-2〜5-7のとおり移す |
| `reader-rsvp.css` | 新規。5-9のとおり |
| `index.html` | `reader-return-navigation.css`の行の次に`<link rel="stylesheet" href="reader-rsvp.css?v=YYYYMMDD-1">`、`reader-return-navigation.js`の行の次(最後)に`<script src="reader-rsvp.js?v=YYYYMMDD-1" defer></script>`。`YYYYMMDD`は実装日 |
| `tests/reader-rsvp.test.js` | 新規。5-11のとおり |

既存のJS・CSSは書き換えません。

### 5-2 試作からの置き換え

| 試作 | サイト |
| --- | --- |
| `MockReader.root()` | ランタイムの`context.root`、無ければ`document.getElementById('readerContent')` |
| `MockReader.pivot()` | `window.MyEssaysReadingPivot?.current?.()` |
| `MockReader.railY()` | `window.MyEssaysReadingPivot?.readingRailY?.() ?? innerHeight * 0.36` |
| `MockReader.essayId()` | ランタイムの`context.essayId`、無ければ`window.MyEssaysRoute?.parse?.().articleId` |
| `MockReader.version()` | `window.MyEssaysReaderVersions?.currentVersion?.() \|\| 'ja'` |
| `document.addEventListener('myessays:reader-ready', attach)` | 5-8のとおり |
| `.proto-bar`、`MockReader`、Readerの写しのCSS、`.reader-v2-location-flash`のkeyframes | 移さない(点滅は`reader-v2.css:584`の既存の規則を使う) |
| BudouXの読み込み(`https://cdn.jsdelivr.net/npm/budoux@0.9.2/module/`の`parser.js`と`data/models/ja.js`を動的`import()`) | そのまま。版は固定する |

試作に無く、サイトでだけ足すもの:

- Readerが開いていない時(`#readerView`が`hidden`)と、比較中(`#readerView.language-compare-mode`、`reader-language-lab.js:368`)は、`R`で開かない。帯の入口は`disabled`にし、`title`を「比較を閉じると流せます」にする。
- 開く時に`window.MyEssaysReaderV2?.setMapOpen?.(false)`でReader Mapを閉じる。`reader-v2.js:769`のEscの処理が`stopImmediatePropagation`で舞台のEscを奪うため。
- `hashchange`と`myessays:reader-version-changed`では、本文へ戻る処理をせずに舞台を閉じ(`closeStage()`)、`items`を空にする。

### 5-3 そのまま移す純粋な処理

次の定数と関数は試作のまま移します。値を変える時は計画書を先に直します。

- 定数: `SIZE_LABELS` `SIZE_PX` `MIN_STEPS` `PAUSE_LABELS` `PAUSE_SCALE` `SPEED_MIN` `SPEED_MAX` `SPEED_STEP` `DEFAULTS` `BEATS` `CARD_MS` `MIN_SHOW_MS` `RAMP` `PHONE_MAX` `REFERENCES` `SKIP` `IGNORE` `SENTENCE_END` `CLOSE_PUNCT` `PERIOD_END` `COMMA_END` `SMALL_KANA`
- 関数: `widthOf` `moraeOf` `splitSentences` `splitBy` `hardSplit` `splitWide` `mergeChunks` `buildItems` `retime`
- `moraeOf`の概算には、ponytailのコメント(精度の上限と、上げる方法)を残します。

`reader-rsvp.js`の最上位では、DOMに触れず、イベントの登録と`window.MyEssaysRsvp`の公開だけを行います。5-11のテストがNodeの`vm`で読み込むためです。

### 5-4 本文から集める

試作の`collectUnits`のままです。確認済みの前提:

- 対象は`#readerContent`の直下の要素です。`.reader-locator-block[data-reading-locator]`の段落・リスト(`li`ごと)・引用(中の`p`ごと)を流します。
- `h1`、`.reader-v2-subtitle`、`.reader-v2-intro`は飛ばします。`h2`は章の札、`h3`は小見出しの札です。
- `.code-block, figure, table, .table-wrap, pre, .essay-figure`は図表の札です。ラベルは`skipLabel`のとおりです。
- `REFERENCES`に合う見出しと、`.reader-v2-after-reading`で止めます。
- 文字は`IGNORE`(`aria-hidden="true"`、ボタン、`rt` `rp` `script` `style`)を除いて集めます。Structureの印「L4」は`aria-hidden`なので入りません。
- 本文中のボタン(`.argument-mobile-profile`、`.reader-copy-button`)や実験の図(three.jsなど)は、直下にあっても座標が無いので流しません。

### 5-5 舞台のDOM(受け入れ確認が使う名前)

名前を変えると`docs/rsvp-mukaeru-qa.cjs`が通りません。

| 要素 | 名前 |
| --- | --- |
| 舞台 | `dialog#rsvpStage.rsvp-stage`。`data-orientation`(horizontal/vertical)、`data-state`(playing/paused/ended)、`data-kind`、開いた直後の5秒だけ`data-fresh`、PCで操作が止まると`data-idle` |
| 上段 | `.rsvp-head` > `.rsvp-section`、`.rsvp-stop`(「■ 本文へ」と`kbd` Esc) |
| 中段 | `.rsvp-field[tabindex="-1"]` > `.rsvp-toast`、`.rsvp-focus` > `.rsvp-word`、`.rsvp-card[data-kind]`、`.rsvp-context`。`.rsvp-hint` |
| 下段 | `.rsvp-foot` > `.rsvp-meter` > `.rsvp-track` > `.rsvp-fill`、`.rsvp-tick`、`.rsvp-remaining`。`.rsvp-controls` > `.rsvp-speed`(−、`output`、+)、`.rsvp-transport`(前の文、`.rsvp-toggle`、次の文)、`.rsvp-tools`(Aa、`.rsvp-help-button`) |
| 設定と一覧 | `.rsvp-sheet`、`.rsvp-help` |
| 帯の入口 | `#readerModeShell .reader-mode-shell__inner` > `button#readerRsvpLaunch.reader-rsvp-launch`(内側の要素に`has-rsvp`) |
| 冒頭の入口 | `.reader-v2-intro-meta`の直後の`button.reader-rsvp-intro` > `.reader-rsvp-intro__play`、`.reader-rsvp-intro__time`、`kbd` |
| 縦中横 | `.rsvp-word .rsvp-tcy` |
| 読後欄 | 既存の`.reader-resonance [data-resonance-seal]`へフォーカス |

### 5-6 再生・時間・位置

試作の`open` `play` `pause` `toggle` `tick` `restart` `seek` `step` `prevSentence` `nextSentence` `jumpSection` `finish` `startIndex` `saveResume` `syncPage` `closeStage` `land` `goToSkip` `landAfterReading`をそのまま移します。要点:

- 開いたらすぐ流します(最初の3文節は助走)。途中から始める時は、章の見出しを0.9秒出します。
- 止めた時の本文の移動は、`scrollToLocator`ではなく試作の`land`(文節の`Range`の最初の行を読書線へ)を使います。段落には`reader-v2-location-flash`を付けて1.35秒後に外します。
- `closeStage`の最後で`attach()`を呼び、冒頭の「約N分」を今の設定で書き直します。
- `saveResume`は一時停止・停止・タブを離れた時に呼びます。読み終えたら`myessays:rsvp-resume`を消します。

### 5-7 ショートカット

試作の`keydown`(`window`の捕捉段階)をそのまま移し、5-2の条件(Readerが開いていない・比較中)を足します。

- 舞台を開いている間は、処理したかどうかにかかわらず`stopPropagation`します。`app.js:715`のEscでLibraryへ戻る処理や、`/` `M` `S` `T`を動かさないためです。
- `Ctrl`・`⌘`・`Alt`付きと`isComposing`は何もしません。
- `Space`と`Enter`は、フォーカスがボタンにある時はボタンの既定の動作に任せます。開いた直後のフォーカスは`.rsvp-field`に置きます(`preventScroll`)。

### 5-8 入口

```js
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
```

- `attach`は何度呼んでも入口が1つだけになるようにします(試作と同じ)。
- 帯: `#readerRsvpLaunch`を`.reader-mode-shell__inner`の最後の子にします。S2の「字幕」(`.reader-subtitle-toggle`)が後から末尾に入っても、`attach`のたびに`inner.lastElementChild !== launch`なら`append`し直し、「▶ 流す」を右端に保ちます。
- 冒頭: `.reader-v2-intro-meta`の中ではなく直後に置きます。`reader-v2.js:355`がmetaの`innerHTML`を毎回書き直すためです。
- 冒頭の「約N分」は試作の`estimateMinutes`で出します。`reading-location-changed`はスクロールのたびに届くので、記事ID・版・速さ・句読点の間が同じなら計算し直しません。

### 5-9 CSS(`reader-rsvp.css`)

試作から移す規則: `.reader-rsvp-launch`、`.reader-rsvp-intro*`、`html.rsvp-open`、`.rsvp-*`、`@media (max-width: 820px)`・`(min-width: 821px)`・`(hover: none)`・`(hover: hover) and (min-width: 821px)`・`(prefers-reduced-motion: reduce)`・`(forced-colors: active)`の中の`.rsvp-*`の規則。

帯の並びは、S2の有無のどちらでも崩れないようにします。

```css
.reader-mode-shell__inner.has-rsvp { grid-template-columns: minmax(0, 1fr) auto; }
.reader-mode-shell__inner.has-rsvp:has(> .reader-subtitle-toggle:not([hidden])) { grid-template-columns: minmax(0, 1fr) auto auto; }
.reader-mode-shell__inner.has-rsvp > .reader-mode-shell__modes { grid-column: 1 / -1; }
```

サイトの`:root`に無いトークンは、既定値つきで使います(9/25計画のP1で入る値と同じです)。

| 試作 | サイト |
| --- | --- |
| `var(--ink-soft)` | `var(--ink-soft, #4f4b45)` |
| `var(--faint)` | `var(--faint, #9a948a)` |
| `var(--raise)` | `var(--raise, #fbf9f4)` |
| `var(--body-font)` | `Georgia, "Yu Mincho", "YuMincho", "Hiragino Mincho ProN", serif`(`styles.css:117`の本文と同じ並び) |
| `var(--ui-font)` | `Inter, "Hiragino Sans", "Yu Gothic UI", "Yu Gothic", system-ui, sans-serif` |

- 試作の`kbd`の規則(ページ全体に効く)は、`.reader-rsvp-intro kbd, .rsvp-stop kbd`に限って移します。
- 文字は11px以上です。`gradient(`は使いません(9/25計画の規則)。
- 夜の配色の指定は書きません。9/25計画のP4でトークンが替われば、舞台も替わります。
- 試作で直した落とし穴を残します(9章)。

### 5-10 公開API

試作と同じ`window.MyEssaysRsvp`を公開します。受け入れ確認が使います。

```js
window.MyEssaysRsvp = Object.freeze({
  installed: true,
  open,                                  // open('pivot' | 'top', launcher)
  stop: stopAndReturn,
  seek: i => { if (stage?.open) seek(i); },
  state: () => ({ open, playing, index, total, kind, text, locator, capacity, msPerMora, settings }),
  items: () => items.map(/* type kind text width ms rest pause sentence locator */),
  lib: { widthOf, moraeOf, splitSentences, splitWide, mergeChunks, buildItems, retime }
});
```

### 5-11 テスト(`tests/reader-rsvp.test.js`)

静的な検査と、純粋な処理の検査を1ファイルにまとめます。下の純粋な処理の検査は、試作の`Rsvp`モジュールで通ることを確認済みです(2026-09-26)。

```js
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
```

- 既存のテストで`index.html`の文字列を検査するもの(`tests/runtime-assets.test.js`など)は、新しい行を足しても影響しません。失敗名がベースラインと同じことを確かめます。

### 5-12 受け入れ

- `docs/rsvp-mukaeru-qa.cjs`の`failed`が空。手元(`BASE_URL=http://127.0.0.1:4173/`)と公開URLの両方で確かめます。
- スクリーンショット(`OUT_DIR`)を目視し、試作と見た目がそろっていることを確かめます(`pc-playing`、`pc-paused`、`pc-vertical`、`pc-end`、`phone-playing`、`phone-paused`、`phone-sheet`、`phone-vertical`、`fig-skip`)。
- 静的テストの失敗が増えていない。既存のブラウザQAが変更前より悪くなっていない。

## 6. PRの手順

1. 最新の`origin/main`から枝を作る(3章)。別の担当が記事を1日に何本もmainへpushするため、取り込み直前にもrebaseする。
2. コードコメントは既存に合わせて英語でよい。コミットの1行目は日本語の要約(標準語)。
3. 検証を通す。

```bash
node --test tests/*.test.js
for s in reading-versions-qa reading-pivot-qa page-reader-qa reading-focus-instant-qa reading-mode-url-qa japanese-reference-qa selection-paragraph-qa argument-structure-qa; do BASE_URL=http://127.0.0.1:4173 node scripts/$s.cjs || echo "FAILED: $s"; done
BASE_URL=http://127.0.0.1:4173/ OUT_DIR=/c/Users/vediv/AppData/Local/Temp/rsvp-after node docs/rsvp-mukaeru-qa.cjs
```

4. push、PR作成。本文は日本語で「何を・なぜ・どう確かめたか・QAの結果」。末尾は`🤖 Generated with [Claude Code](https://claude.com/claude-code)`。
5. CIを確認する。Visual QAは既存の失敗で赤になるため、失敗名がベースラインと同じであることを確かめる。
6. squash mergeする。GitHub Pagesの公開(1〜3分)を待ち、公開URLで`docs/rsvp-mukaeru-qa.cjs`を実行して、新しい`?v=`が配信されていることと`failed`が空であることを確かめる。

- `scripts/*.cjs`が既存の理由で失敗する場合は、変更前のmainでも同じく失敗するかを確かめ、PR本文に書きます。
- `qa-artifacts/`などの出力と`node_modules/`はコミットしません。`git status`で意図したファイルだけを確かめてからコミットします(`.gitignore`はありません)。

## 7. 権限

確認なしで行ってよいこと:

- worktree・枝の作成、コミット、枝へのpush、PRの作成、検証を通したPRのsquash merge、GitHub Pagesの公開確認。
- 問題が出た時の、`git revert`による取り消しのPR。
- `.git/info/exclude`への`node_modules/`などの追記。

確認が必要なこと:

- force push、履歴の書き換え。
- `C:\Users\vediv\repos\myessays-src`の作業ツリー(未pushのコミット、変更中の`AGENTS.md`)への操作。
- 記事本文、`data/*.json`、English Mixなどの内容の変更。
- 既存のJS・CSSの書き換え(5-1の表の外の変更)。
- リポジトリ設定(Pages、公開範囲、Actionsの設定)の変更。
- 費用が発生する操作。

## 8. 停止点

見た目と動きは試作と3問の回答で承認済みとして扱い、途中の報告で止めません。次の時だけ止めて報告します。

- 計画書「11. 止める条件」に当たり、PRの中で直せない。
- 公開後に公開URLで不具合が出た。先に`git revert`のPRで戻し、原因を報告する。
- 既存の判断(9/10計画、9/25計画、9/26の透かし計画)と矛盾する選択が必要になった。

## 9. 落とし穴(試作で踏んだもの)

- `dialog`に`display: grid`を指定すると、閉じても消えません。`.rsvp-stage:not([open]) { display: none; }`を必ず残します。
- スマホ幅で、下段の操作が1行に並びきらず、舞台が462pxに広がりました。舞台に`grid-template-columns: minmax(0, 1fr)`、820px以下で操作を2段(速さと設定/前の文・再生・次の文)にします。
- 縦表示で一時停止した時の文全体が、下の操作に重なりました。`.rsvp-field`に`grid-template: minmax(0, 1fr) / minmax(0, 1fr)`と`overflow: hidden`を付け、`max-height: 100%`が効くようにします。
- 一時停止中の文全体で、英単語の間の空白が消えました。文節の表示用の文字(前後の空白を削ったもの)ではなく本文の区間を使い、前後の空白はボタンの外に置きます(試作の`renderContext`)。
- フォーカスの輪を`[tabindex]`にも付けると、舞台全体が枠で囲まれます。輪はボタンだけに付けます。
- 手元のサーバーが文字コードを付けないと文字化けします。`index.html`には`<meta charset="utf-8">`があるので本番は問題ありません。
- BudouXの`parse()`は、入力をそのまま区切った配列を返します。位置(`start`・`end`)はこの前提で計算しています。
- `Ctrl`+`+`(ブラウザの拡大)を奪わないよう、修飾キー付きは処理しません。
- Windows PowerShell 5.1の`Get-Content`と`Set-Content`は、BOMなしUTF-8の日本語を壊します。ソースの読み書きはEditツールかNodeで行います。
- 記事は別の担当が頻繁にmainへ追加します。取り込み直前のrebaseを忘れないでください。

## 10. 他の計画を後で実装する時

- S2(字幕)を後で入れる場合: 字幕のスイッチは帯の末尾に入りますが、`attach`が「▶ 流す」を右端へ戻します。`.has-rsvp:has(> .reader-subtitle-toggle…)`で3列になります。
- S1(透かし)のEscと`T`は、舞台が閉じている時だけ働きます。舞台を開いている間は`stopPropagation`で止まります。
- 9/25計画のP1: `tests/gradient-policy.test.js`に`reader-rsvp.css`の許可は要りません(グラデーションなし)。11px以上の数え直しの対象に`reader-rsvp.css`を含めます(最初から満たしています)。
- P2: 帯を整える時は、2行目の右端の「▶ 流す」を残します。
- P4(夜の紙): `reader-rsvp.css`はトークンだけで色を決めているので、追加の変更は不要です。

## 11. 最後の報告

次を日本語(標準語)でまとめてください。

- 取り込んだPRのURLと要約。
- `docs/rsvp-mukaeru-qa.cjs`の結果(手元と公開URL)。`failed`と合格数。
- スクリーンショットの保存先。
- 静的テストの前後の失敗件数と名前。手元のブラウザQAの結果。
- 見送ったこと、やり方を変えたこと、残った課題。
