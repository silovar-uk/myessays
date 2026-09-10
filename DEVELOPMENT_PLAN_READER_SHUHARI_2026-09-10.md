# MyEssays Reader — 守破離 UX Plan

Updated: 2026-09-10
Status: design / implementation plan
Priority: UX > novelty / convenience > fun

## 0. 結論

MyEssaysの次の改善は、機能追加ではなく「読書中に判断させないこと」を中心にする。

現在すでに存在する強い土台は残す。

- JA / EN MIX / ES MIX のReading Mode
- 同じ記事IDで状態共有
- Reading Mode切替時のsemantic eye-line維持
- 派生版の先読み
- 段落単位のLanguage Lens
- 日本語正本との対応付け
- Reader V2の「Enter → Read → Close」思想

次にやるべきことは、これらを別々の機能として見せず、1本のReading Flowへ統合すること。

Product sentence:

> 「言語を切り替えられるReader」から「読んでいる位置と理解の流れを壊さず、必要な時だけ別の言語を出してくれるReader」へ。

---

# 1. 守 — いま機能している型を守る

## 守るもの

### 1.1 日本語正本 + Reading Mode

日本語をcanonical articleとし、EN MIX / ES MIXはReading Modeとして扱う現在の契約を維持する。

### 1.2 semantic eye-line

言語切替時に同じ意味位置へ戻す仕組みは、Readerの最大の差別化要素として維持する。

位置管理を新しく増やさない。

- `reading-locators.js`
- `reader-reading-pivot.js`
- `reader-japanese-reference.js`

を基盤とし、競合するスクロール管理を追加しない。

### 1.3 直接言語切替

JA / EN / ESを1タップで切り替えられる現在のdirect controlを維持する。

ドロップダウンを主導線へ戻さない。

### 1.4 段落対応

Language Lensの「この段落だけ見る」「全文を切り替える」の考え方は残す。

全文切替と局所確認を分ける設計は正しい。

---

# 2. 破 — UIの見え方を壊して整理する

現在の問題は機能不足ではなく、同じ目的のUIが複数の場所に現れること。

Reader内でユーザーが意識する概念を、以下の4つだけにする。

1. 戻る
2. 読む
3. 言語を変える
4. 考えを残す

## 2.1 Reader Headerを唯一の常設操作面にする

### Desktop

```text
← Library    現在のセクション                  JA  EN  ES   Contents   Memo
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 62%
```

### Mobile

```text
←   現在のセクション                         JA EN   ≡
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 62%
```

常設するもの:

- Back
- current section
- JA / EN / ES direct switch
- Contents
- Memo
- thin progress

常設しないもの:

- 比較
- 全文コピー
- Article metadata
- Argument Lens
- 各種Lab
- 完了ボタン

これらはArticle Info / More / After Readingへ移動する。

## 2.2 言語UIを1系統に統合する

現在の以下の表示をユーザー視点では1系統に見せる。

- direct Reading Mode control
- legacy disclosure
- reader-mode-bar
- Language Lens
- Japanese Reference

実装モジュールは分けたままでよい。

ただし表面上の入口は次の2つだけにする。

### A. 全文の言語を変える

Headerの `JA / EN / ES`

### B. この段落だけ確認する

読んでいる段落に対する `Language Lens`

「比較」という独立モードはMoreへ下げる。

## 2.3 Language Lensを“選択機能”から“読書補助”へ寄せる

Desktop:

- 現在段落へカーソルが入った時だけ、小さな `JA` / `EN` affordanceを右余白に表示
- クリックでcounterpartを小さなside sheetに表示
- 本文幅やスクロール位置は動かさない

Mobile:

- 常設Dockは出さない
- 段落をタップ → 小さなcontext action `ENで見る` / `JAで見る`
- 2回目のタップでLensを開く

誤タップを増やすため、本文タップ即切替にはしない。

## 2.4 比較表示は学習ツールとして隔離する

左右比較は便利だが、通常読書では画面を大きく消費する。

`比較`はReader Headerから外し、More内の `Study tools` に移す。

通常読書と学習読書を同じ常設UIにしない。

---

# 3. 離 — MyEssays独自のReading UXへ進む

驚きはアニメーションではなく「位置と文脈が消えないこと」で作る。

## 3.1 Focus Pair

Reading Modeを切り替えた直後、対応する段落だけ0.8秒程度ごく薄く強調する。

目的:

- どこが対応したか一瞬で分かる
- スクロールが動いていないように感じられる
- 切替後に目が迷わない

演出は最小限。

## 3.2 Hold to Peekは採用しない

長押しはスマホOSのテキスト選択と競合するため、主操作にしない。

驚きより予測可能性を優先する。

## 3.3 「いま読んでいる段落」をReaderの共有座標にする

Reader Header / Reader Map / Language Lens / Memo / Reading Mode切替が、すべて同じlocatorを参照する。

これにより将来的に、

- 前回停止位置
- メモ位置
- EN MIXで見た位置
- JAへ戻した位置

を一本のReading Timelineとして扱える。

## 3.4 After Readingを独立した終端にする

記事末尾は機能の寄せ集めではなく、1つの終了面にする。

```text
AFTER READING

□ 読了
「一言だけ残す」

次に読む 1本
関連 3本
Libraryへ戻る
```

言語切替・比較・全文コピーなどはここに置かない。

読了後は「考える / 次へ進む」に絞る。

---

# 4. ページ構造

## Current

```text
Global Header
Back
Metadata / TOC + Article
Language controls
Tools
Notes
Completion
Reflection
Related
Prev / Next
```

## Proposed

```text
Reader Header
  ├ Back
  ├ Current section
  ├ Reading Mode
  ├ Contents
  └ Memo

Reader Body
  ├ Entry
  │   ├ Title
  │   ├ Subtitle
  │   ├ Date / Time / Type
  │   └ Article Info
  │
  ├ Article
  │   └ contextual Language Lens
  │
  └ After Reading
      ├ Complete
      ├ Reflection
      ├ Next
      ├ Related
      └ Library
```

Desktopは左Reader Map + 本文。
MobileはReader Mapをbottom sheet化する。

---

# 5. 実装順

## Phase 1 — Surface consolidation

目的: 機能を減らさず、入口だけ減らす。

- Headerのdirect JA / EN / ESを唯一の全文言語切替にする
- legacy disclosureを非表示化
- reader-mode-barの重複Reading Modeボタンを整理
- 比較をMoreへ移動
- Language Lensは段落補助として残す

完了条件:

- 全文言語切替の常設入口が1つだけ
- Mobileで2タップ以内にJA ↔ EN MIX切替
- Desktopで1タップ

## Phase 2 — Reader Map integration

- Reader MapとHeaderのcurrent sectionを同一serviceへ接続
- locatorを唯一の座標にする
- previous stop / memo markerをReader Mapへ表示

完了条件:

- section jump後にHeader / Mapが即同期
- mode switch後も同じsection / locatorを維持

## Phase 3 — Focus Pair

- mode switch後の対応段落を短時間だけ視覚強調
- `prefers-reduced-motion`ではanimationなし

完了条件:

- 強調なしでも読書位置が維持される
- 強調はorientation補助であり、位置補正の代替にならない

## Phase 4 — After Reading consolidation

- completion / reflection / next / relatedを1セクションへ統合
- Primary next articleを1本に絞る

---

# 6. UX Reject Conditions

以下になったら実装を止めて見直す。

- Reader Headerに常時6個以上の主要ボタンが並ぶ
- 同じReading Mode切替が2か所以上で常設される
- 言語切替で本文位置が目視1画面以上ずれる
- Mobileで言語切替に3タップ以上必要
- Lensを閉じないと本文を読み続けられない
- 比較機能が通常読書の本文幅を恒常的に狭める
- noveltyのためだけにgestureを追加する
- locatorとは別の段落ID体系を新設する

---

# 7. QA

必須シナリオ:

1. JA → EN MIX → JAを同じ段落で往復
2. 高速で JA → EN → ES → JA を押す
3. URL直アクセスでEN MIXを開く
4. 50%位置でreload →復帰
5. Lensで1段落だけ確認 → 本文読書を継続
6. Mobile Safariで文字選択とLens操作が競合しない
7. Back / forwardで言語状態と読書位置が壊れない
8. `prefers-reduced-motion`でFocus Pairが静的表示になる

主要評価指標:

- language switch taps
- switch後のlocator drift
- accidental control activation
- Reader Header占有高
- mobile first-content viewport
- article completion flow clicks

---

# 8. 優先順位

P0:

- 重複Reading Mode UIの統合
- semantic eye-line維持
- Mobile 2タップ以内

P1:

- Reader Map統合
- Focus Pair
- Article Infoへの低頻度操作移動

P2:

- Study tools整理
- Compare polish
- Reading Timeline

---

# 9. 最終判断

「守」は機能を守る。

「破」は操作面を減らす。

「離」は、MyEssaysを“言語を切り替えるサイト”ではなく、“意味位置を失わずに複数言語を読むReader”にする。

便利さを増やすために、見える機能数は減らす。
