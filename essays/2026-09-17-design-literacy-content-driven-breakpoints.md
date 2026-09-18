---
id: design-literacy-content-driven-breakpoints
title: 「768pxだから崩す」って、768pxは何をしたんだ？
subtitle: Design Literacy #51｜Content-driven Breakpoints / Reflow / Responsive Design
created: 2026-09-17
updated: 2026-09-17
type: Essay
status: published
tags: ["Design Literacy", "Responsive Web Design", "Content-driven Breakpoints", "Accessibility", "Design Systems"]
keywords: ["Content-driven Breakpoints", "Responsive Web Design", "Media Queries", "Reflow", "Breakpoint Testing", "Device-agnostic Design", "Responsive Stress Testing", "WCAG 1.4.10", "Brad Frost", "Ethan Marcotte"]
grow: true
series: Design Literacy｜細部から思想まで
seriesOrder: 51
abstract: Web制作で頻出する「768px」というbreakpointを疑う。なぜ769pxでは保たれていたレイアウトが、768pxで突然別物になるのか。Brad Frostのcontent-driven breakpoint、WCAG 2.2のReflow、Ethan MarcotteのResponsive Web Designをたどり、breakpointを「端末の境界」ではなく「コンテンツの品質を維持するための介入点」として捉え直す。
---

# 「768pxだから崩す」って、768pxは何をしたんだ？

Web制作をしていると、やたら顔を見る数字がある。

```css
@media (max-width: 768px) {
  ...
}
```

**768px。**

769pxでは横並びだったナビゲーションが、1px縮んだだけで突然消える。カードが縦積みになり、余白も変わる。

しかし、画面は1pxしか縮んでいない。文章の意味も変わっていない。人間の指も急に太くなっていない。

それなのに、768pxになった瞬間だけ世界が変わる。

一度、ちゃんと聞いてみたい。

> **768pxは、何をしたのか。**

この妙な疑問を本気で追うと、breakpointの見え方が少し変わる。breakpointは「Tabletが始まる幅」ではなく、**コンテンツが今のレイアウトに耐えられなくなる幅**として考えられる。

## 1. 今日のテーマ｜Content-driven Breakpoints

前回のIntrinsic Web Designでは、「PCなら3列」のように完成形を先に決めるのではなく、カードの最小幅やgapといった**制約からレイアウトを生む**考え方を扱った。

今回は、その考えをbreakpointまで広げる。

よくある仕様はこうだ。

```text
Desktop   1024px〜
Tablet     768〜1023px
Mobile     〜767px
```

分かりやすい。しかし、この表には暗黙の前提がある。

> **768px付近で、デザイン上の重要な変化が必要になる。**

本当にそうなのか。まず端末名を消して考える。

## 2. FACT｜Breakpointは「端末名」から決めなくていい

Brad Frostは2013年の記事「7 Habits of Highly Effective Media Queries」で、popular device dimensionsではなく**contentにbreakpointを決めさせる**ことを第一の習慣として挙げている。彼は、特定端末の幅だけを見るのではなく、画面幅の連続した範囲全体をstress testする考え方を示した。

Source: https://bradfrost.com/blog/post/7-habits-of-highly-effective-media-queries/

重要なのは「768pxは間違い」という話ではない。

問うべきなのは、

> **その数字に、コンテンツ側の理由があるか。**

ということだ。

![Device-drivenとContent-drivenのbreakpoint比較](https://raw.githubusercontent.com/silovar-uk/myessays/main/assets/design-literacy-content-driven-breakpoints/device-vs-content.svg)

*Figure: Device labelから決める場合と、content failureを観察して決める場合の違い。Original diagram for this article.*

## 3. EXPERIMENT｜1pxずつ縮めて、最初に何が壊れるかを見る

架空のヘッダーを考える。

```text
┌─────────────────────────────────────────┐
│ LOGO   NEWS  MATCH  TEAM  SHOP   LOGIN │
└─────────────────────────────────────────┘
```

ブラウザーを少しずつ縮める。

```text
1000px  ○
900px   ○
820px   ○
781px   ○
754px   △
731px   ×
```

754pxあたりから項目同士が窮屈になり、731pxでは文字が折れたり衝突したりする。ここで初めて、レイアウト変更の理由が生まれる。

```text
DEVICE
↓
768px
↓
CHANGE
```

ではなく、

```text
CONTENT
↓
FAILURE
↓
BREAKPOINT
```

と考える。

さらに少しやりすぎて、failureを分類する。

```text
A. TEXT FAILURE
文字が不自然に折れる

B. COLLISION FAILURE
要素同士がぶつかる

C. DENSITY FAILURE
情報密度が高すぎて読みづらい

D. ACTION FAILURE
CTAが押しにくい、意味が取りづらい

E. INFORMATION FAILURE
重要情報を隠さないと成立しない
```

こうして観察すると、同じサイトでも自然に異なるbreakpoint候補が出る。

```text
NAV      760px
CARD     684px
HERO     912px
FILTER   838px
```

数字はきれいではない。むしろ、その不格好さが重要だ。**コンテンツから出てきた数字は、端末カタログの数字より不格好になりやすい。**

## 4. Before → After｜同じ768pxでも「理由」を変える

### Before

```css
@media (max-width: 768px) {
  .nav {
    display: none;
  }
}
```

このコードだけを見ると、768pxそのものが理由に見える。

### After

まずNavigationを連続的に縮める。

```text
796 ○
782 ○
771 ○
763 △
751 ×
```

仮に760px付近で破綻するなら、760pxをbreakpoint candidateとして扱う。

ただしDesign System全体で768pxを共通tokenとして使っているなら、760pxと768pxの差を安全に吸収できることを確認したうえで、768pxを採用してもよい。

```text
760px付近でcontentが壊れる
↓
system breakpointの768pxで安全に吸収できる
↓
768pxを採用
```

結果の数字は同じでも、設計理由はまったく違う。

## 5. VISUAL｜Breakpointは「端末の境界」ではなく「品質の崖」

Breakpointを線ではなく、品質の変化として描くと分かりやすい。

![Breakpointを品質の崖として捉える図](https://raw.githubusercontent.com/silovar-uk/myessays/main/assets/design-literacy-content-driven-breakpoints/quality-cliff.svg)

*Figure: Layout qualityが維持できなくなる直前をbreakpoint candidateとして見る。Original diagram for this article.*

この図では、760pxに特別な意味があるわけではない。重要なのは、**その付近から現在のレイアウトがコンテンツを支えきれなくなる**ことだ。

Breakpointは「Tabletはこちら」という国境線より、品質が崖から落ちる前に置く安全柵に近い。

## 6. ACCESSIBILITY｜「壊れる」は見た目だけではない

ここでは笑いを止めて、failureの定義を広げる必要がある。

WCAG 2.2のSuccess Criterion 1.4.10 Reflowでは、vertical scrolling contentについて、幅320 CSS pixels相当でも、原則として情報や機能を失わず、二次元スクロールを要求しないことが求められている。

Source: https://www.w3.org/WAI/WCAG22/Understanding/reflow.html

つまりfailureには、見た目の崩れだけでなく、次も含まれる。

```text
VISUAL FAILURE
文字が重なる

FUNCTIONAL FAILURE
操作できない

READING FAILURE
横スクロールしないと文章を追えない

INFORMATION FAILURE
重要情報が消える
```

Breakpointは単なる見た目調整の境界ではなく、**情報アクセスを維持するための介入点**でもある。

## 7. HISTORY｜Responsive Web Designは固定キャンバスへの反論だった

ここは事実と解釈を分ける。

**事実。** Ethan Marcotteは2010年5月25日のA List Apartの記事「Responsive Web Design」で、fluid grids、flexible images、media queriesを組み合わせ、さまざまな閲覧環境に応答する設計を提示した。

Source: https://alistapart.com/article/responsive-web-design/

**解釈。** この提案の重要性は、「スマートフォン向けCSSの技が増えた」ことだけではない。Webを固定されたキャンバスの集合として扱うのではなく、**幅も閲覧状況も変化し続けるメディアとして受け入れる**方向へ設計思想を押し戻した点にある。

```text
FIXED CANVAS
決めた幅に合わせる

↓

RESPONSIVE
環境に応答する

↓

CONTENT-DRIVEN
コンテンツが耐えられなくなる地点で介入する
```

Content-driven BreakpointsはResponsive Web Designから外れた特殊テクニックというより、その思想を一段細かくしたものとして読める。

## 8. MISUNDERSTANDING｜共通Breakpointは悪ではない

ここまで読むと、640 / 768 / 1024 / 1280のような共通breakpointを全部捨てたくなるかもしれない。

しかし、共通tokenには明確な利点がある。Design System全体の一貫性を保ちやすく、実装やQAの組み合わせも管理しやすい。

だから結論は、

> device由来の数字を使うな。

ではない。

考える順番を変える。

```text
× 768pxだから変える

○ 760px付近でcontentが壊れる
  ↓
  system breakpointの768pxで吸収できる
  ↓
  768pxを採用する
```

**同じ768pxでも、観察から来た768pxと慣習から来た768pxは別物である。**

## 9. CONNECTION｜#48〜#51は「指定」から「観察」への移動だった

ここ4回を並べると、一本の流れが見える。

```text
#48 Fluid Typography
固定値 → 関係

#49 Container Queries
画面 → 局所環境

#50 Intrinsic Design
結果 → 制約

#51 Content-driven Breakpoints
端末分類 → 破綻の観察
```

最初はdesignerが「40px」「768px」「3列」と答えを直接指定していた。

徐々に、値の関係、componentの居場所、成立条件、壊れる瞬間へと見る対象が移っている。

**Responsive Design is partly observational design.**

レスポンシブ設計には、作る能力だけでなく、**システムが持ちこたえられなくなる瞬間を観察する能力**が必要になる。

これが今回の「前より解像度が上がる接続」だ。

## 10. PRODUCTION｜そのまま使える制作・修正指示

> PC／タブレット／スマートフォンの代表幅だけでブレークポイントを決めず、ブラウザー幅を連続的に変更して、文字の折返し、要素同士の干渉、CTAの圧迫、情報階層の崩れが最初に発生する幅を確認してください。その幅をbreakpoint candidateとし、既存のDesign System breakpointへ吸収する場合は、品質を維持できる範囲かを検証してください。

レビューなら、さらに短くできる。

> **「この768pxは、何が壊れるから768pxなのですか？」**

答えが「iPadだから」だけなら、一度検証する価値がある。

## 11. PRACTICE｜30秒でできるDisco Test

好きなWebサイトをPCで開き、ウィンドウ幅を適当に広げたり縮めたりする。

見るのは一つだけ。

> **最初に「少し嫌だ」と感じた瞬間はどこか。**

文字が孤立したか。Navigationが窮屈になったか。カード内CTAが2行になったか。画像のcropで意味が落ちたか。

その瞬間の幅を見る。

それがbreakpoint candidateである。

Figmaの375 / 768 / 1440pxの完成画面だけを見ていたときには存在しなかった情報が、連続的に動かすと現れる。

## 12. NEXT｜次はResponsive Designの「歴史」を見る

ここまで#48〜#51では、Responsive Designを主に実装と設計原理の側から見てきた。

次は一度MACROへ上がる。

そもそも、なぜWebデザインは「固定された紙のようなページ」を作ろうとしていたのか。そしてEthan Marcotteが2010年にResponsive Web Designを提示したとき、何に対して考え方を変えようとしていたのか。

次の問いは、

> **Responsive Web DesignはCSSテクニックではなく、何に対する思想転換だったのか。**

になる。

## 13. 今日の中心命題

> **A good breakpoint marks a change in what the content can sustain, not merely a change in device category.**

良いbreakpointは「ここからTablet」という境界線ではない。

**このままの表現では、contentの品質を維持できなくなる境界線である。**

調べる前、768pxは答えに見えた。

調べた後、768pxは質問に変わる。

> **767pxになった瞬間、具体的に何が困るのか。**

何も困らないなら、そのbreakpointはまだ来ていない。

Breakpointを探すというより、コンテンツが「このままではもう持たない」と言い始める瞬間を観察する。

そう考えると、768pxそのものは悪くない。

むしろ長いあいだ、何もしていないのにレイアウト崩壊の責任だけ負わされていた数字に見えてくる。

## 14. Sources

- Brad Frost, “7 Habits of Highly Effective Media Queries”  
  https://bradfrost.com/blog/post/7-habits-of-highly-effective-media-queries/
- Ethan Marcotte, “Responsive Web Design”, A List Apart, May 25, 2010  
  https://alistapart.com/article/responsive-web-design/
- W3C WAI, “Understanding Success Criterion 1.4.10: Reflow”  
  https://www.w3.org/WAI/WCAG22/Understanding/reflow.html
