---
id: design-literacy-fluid-typography-between-breakpoints
title: スマホでは28px、PCでは40px。その途中の37pxは誰が決めた？
subtitle: Design Literacy #48｜Fluid Typography / CSS clamp() / Responsive Type
created: 2026-09-16
updated: 2026-09-16
type: Essay
status: published
tags: ["Design Literacy", "Typography", "Fluid Typography", "Responsive Design", "CSS"]
keywords: ["Fluid Typography", "CSS clamp()", "Responsive Typography", "Viewport Units", "rem", "Interpolation", "CSS Locks", "Utopia", "WCAG Resize Text", "Container Queries", "cqi"]
grow: true
series: Design Literacy｜細部から思想まで
seriesOrder: 48
abstract: スマホでは28px、PCでは40px。では、その途中の37pxは誰が決めるのか。1pxの画面差で文字が12px跳ねる奇妙さから、clamp()、Responsive Web Design史、zoomアクセシビリティ、container queryまで追い、レスポンシブ設計を「端末別の完成形」から「値の変化を設計すること」へ捉え直す。
---

# スマホでは28px、PCでは40px。その途中の37pxは誰が決めた？

スマホの見出しは28px。PCでは40px。

よくある指定である。

では、767px幅のブラウザーでは28px、768px幅になった瞬間に40pxへ切り替わる実装を考える。

画面は**1pxしか広がっていない。**

文字は**12px大きくなる。**

```text
VIEWPORT     TITLE
767px        28px
768px        40px

画面 +1px
文字 +12px
```

成長期にも限度がある。

もちろん実際のデザインではbreakpointの前後でlayoutも変わるので、こうしたjumpが必要な場合もある。ただ「mobileでは28、desktopでは40」とだけ決めた結果として起きているなら、一度だけ妙だと思っていい。

今回は、その1pxの隙間からFluid Typographyを調べる。

## FACT｜Breakpointは「状態を切り替える」のであって、「途中」を説明しない

Media queryでfont-sizeを変える最小例は、こう書ける。

```css
.title {
  font-size: 28px;
}

@media (min-width: 768px) {
  .title {
    font-size: 40px;
  }
}
```

これは間違いではない。

375pxでも700pxでも28px。768pxになったら40px。以降は40px。

```text
28 ───────────────┐
                   │
                   └────────────── 40
                  768
```

Breakpointは、**どこで状態を変えるか**を設計するのが得意だ。

逆に、「二つの状態の間をどう移動するか」は何も決めない。

## もう一歩やりすぎる｜画面幅を1pxずつ増やしてみる

375pxから1200pxまで、タイトルを28pxから40pxへ大きくしたいとする。

Breakpoint方式なら、例えばこうなる。

```text
375 → 767   28px
768 → 1199  34px
1200 →      40px
```

ここには二つのjumpがある。

では、375pxで28px、1200pxで40pxという**両端だけを固定し、その間を直線でつなぐ**とどうなるか。

```text
375px   28.00px
500px   29.82px
700px   32.73px
900px   35.64px
1200px  40.00px
```

767から768へ進んでも、ほとんど変わらない。

人間が29.82pxを一個ずつ決めたわけではない。

**人間は両端と変化のルールを決め、途中は計算に任せた。**

ここがFluid Typographyの入口になる。

## `clamp()`は、最小・途中・最大を一行に入れる

CSS Values and Units Module Level 4では、`clamp(MIN, VAL, MAX)`は、中央の計算値を最小値と最大値の間に制限するcomparison functionとして定義されている。

Source: https://www.w3.org/TR/css-values-4/#comp-func

MDNも、`clamp()`をminimum、preferred、maximumの3値で範囲を制御する関数として説明し、font-sizeをviewportに応じて変化させながら上下限を設ける例を掲載している。

Source: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/clamp

さきほどの「375pxで28px、1200pxで40px」を一例として書くと、概念的にはこうなる。

```css
.title {
  font-size: clamp(
    1.75rem,
    1.4091rem + 1.4545vw,
    2.5rem
  );
}
```

```text
MIN              FLUID               MAX
28px  ──────────／───────────────  40px
      375px                     1200px
```

大事なのは、この数式を暗記することではない。

**28と40の間に、説明可能な関係を作れること**である。

## 画像で見る｜Utopiaは「途中の値」ではなく「両端のsystem」を入力させる

![Utopia Clamp Calculatorの画面](https://utopia.fyi/images/clamp-calculator.jpg)

*Figure: Utopia, Clamp Calculator. Source: https://utopia.fyi/blog/clamp-calculator/*

UtopiaのFluid Type Scale Calculatorでは、minimum viewport側とmaximum viewport側に、それぞれbase font sizeとtype scaleを設定し、その間の値を`clamp()`として生成できる。

Source: https://utopia.fyi/type/calculator/

さらに現在のUtopiaは、計算基準をViewportだけでなくContainerへ切り替える設定も持つ。

Source: https://utopia.fyi/clamp/calculator/

ここで、昨日のDesign Literacy #47「Typographic Scale」とつながる。

```text
#47
16 / 20 / 25 / 31 ...
固定されたscaleを作る

#48
small scale ───────── large scale
scaleそのものの変化を作る
```

固定値の家族だったType Scaleが、今日は動き始める。

## 再リサーチ｜Fluid Typographyは`clamp()`が発明したわけではない

ここは歴史を雑にしない。

Ethan Marcotteが2010年のA List Apart「Responsive Web Design」で示した中心的な構成要素は、fluid grids、flexible images、media queriesだった。重要だったのは特定端末ごとの固定ページを増やすことではなく、異なる閲覧環境の連続性を前提にWebを考えることだった。

Source: https://alistapart.com/article/responsive-web-design/

Marcotteの記事が引用したJohn Allsoppの言葉に、短いが象徴的な表現がある。

> “accept the ebb and flow of things.”

固定された紙面のようにWebを扱うのではなく、変化する媒体として受け入れる。

Fluid Typographyは、その考え方を文字サイズへ持ち込んだものと見ると分かりやすい。

2010年代半ばには、Mike Riethmullerらが`calc()`とviewport unitsを組み合わせ、minimumとmaximumを持つfluid typeを実践していた。CSS-Tricksは2016年、その方法やfluid modular scaleを紹介している。

Source: https://css-tricks.com/snippets/css/fluid-typography/

`clamp()`は思想の発明というより、**以前は長い式で書いていた「範囲つきの連続変化」を、CSSの標準機能としてかなり書きやすくした道具**と考える方が正確である。MDNによれば、`clamp()`は主要ブラウザーで2020年7月以降広く利用可能になっている。

## ここで笑いを止める｜`5vw`だけで済ませると、ユーザーの拡大操作と衝突する

一番簡単なFluid Typographyは、こう見える。

```css
.title {
  font-size: 5vw;
}
```

画面が広がれば文字も広がる。確かにfluidだ。

しかし、viewport-relative unitだけでfont-sizeを決める方法にはアクセシビリティ上の問題がある。

W3CのWCAG 2.2 Success Criterion 1.4.4では、captionと画像化された文字を除き、textをassistive technologyなしで200%まで拡大してもcontentやfunctionalityを失わないことを求めている。

Source: https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html

web.devの2025年のFluid Typography解説も、viewport-relative valueだけでfont-sizeを決めるとuser zoomやdefault font-sizeへの反応が弱くなり得ると注意し、`em`や`rem`を基準にしつつviewport/container unitを調整値として組み合わせる考え方を示している。

Source: https://web.dev/articles/baseline-in-action-fluid-type

つまり、

```text
FLUID
≠
VIEWPORTに完全服従
```

滑らかに変わることより、**ユーザーが自分の読みやすさを変更できることの方が優先順位は高い。**

`clamp()`を使ったらaccessibilityが自動的に解決するわけでもない。最小・最大・中央式を決めたあと、実際にbrowser zoomやtext resizeで確認する必要がある。

## Before → After｜端末を設計するのをやめて、変化を設計する

### Before

```text
iPhone     28px
Tablet     32px
Laptop     36px
Desktop    40px
```

この設計では、新しい端末幅が出るたびに「どの箱へ入れるか」を考えたくなる。

### After

```text
MIN
28px @ 375px

↓ relationship

MAX
40px @ 1200px
```

こちらでは、375〜1200pxの間に存在する無数のviewportを一つずつ命名しない。

設計対象が、**端末の一覧から変化の関数へ移る。**

もちろん、layoutが根本的に変わる地点にはbreakpointが必要である。FluidとBreakpointは敵ではない。

```text
BREAKPOINT
構造が変わる地点を決める

FLUID VALUE
構造が同じ間の変化を決める
```

仕事が違う。

## INTERPRETATION｜Responsive Designは「完成画面を何枚作るか」ではなくなる

ここからは解釈。

Responsive Designをmobile / tablet / desktopの三枚絵として考えると、デザインの中心は完成状態になる。

```text
375px DESIGN
768px DESIGN
1440px DESIGN
```

Fluid Typographyを入れると、その間にも設計対象があることが見える。

```text
375 ───────────────── 1440
      ↑ここ全部がUI
```

つまりレスポンシブ設計は、完成画面を増やす作業だけではない。

**制約の間で、値がどう振る舞うかを決める作業でもある。**

これは#45のSpacing Scale、#46のBaseline Grid、#47のTypographic Scaleから一段進んでいる。

```text
#45  値を家族にする
#46  周期を共有する
#47  階層に関係を作る
#48  関係そのものを動かす
```

Design Tokenも「TITLE = 40px」という静的な値だけではなく、「この範囲では28pxから40pxへ変化する」というbehaviorを表現できる。

## 誤解しやすい点｜滑らかな方が、いつでも優れているわけではない

Fluid Typographyは気持ちがいい。

だから全部fluidにしたくなる。

しかし、常に必要とは限らない。

本文サイズをほぼ一定に保ちたい場合もある。特定幅を超えたらlayout自体を変えた方が自然な場合もある。巨大なdisplay typeでは文字サイズよりline breakをeditorialに固定する方が重要なこともある。

さらに、途中のすべての幅で最適な見た目になる保証もない。

**ContinuousはAutomatic Optimalではない。**

連続的に変化する仕組みを作ったあとも、狭い幅、中間、広い幅、zoom時の実物を見る。

数式はレビューを消さない。

## 次へ行くと、viewportすら怪しくなる｜Container Queries

ここまで「画面幅に応じて文字を変える」と話してきた。

しかし、1440pxのdesktop画面に300px幅のcardが置かれていたらどうなるか。

```text
VIEWPORT 1440px
┌──────────────────────────────────┐
│ ┌──────────┐                     │
│ │ CARD     │ 300px               │
│ └──────────┘                     │
└──────────────────────────────────┘
```

Viewportは「広い」と言っている。

Cardは「全然広くない」と言っている。

CSSのcontainer query length unitsには、query containerのinline sizeの1%を表す`cqi`などがある。MDNは、container-relative unitを使うことで、componentを置かれたcontainerの大きさに応じて柔軟に調整できると説明している。

Source: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Containment/Container_queries

次の問いは、

> 画面はどれくらい広い？

ではなく、

> **このcomponentには、実際どれくらいの部屋がある？**

になる。

## そのまま使える制作・修正指示

> レスポンシブな文字サイズを端末カテゴリごとの固定値だけで定義せず、まず最小・最大の利用幅と、その両端で必要なfont-sizeを決めてください。構造が同じ範囲では`clamp()`などによる連続補間を検討し、構造が変わる地点にはbreakpointを使用してください。viewport unitだけでfont-sizeを決めず、`rem` / `em`との組み合わせを検討し、200% zoomを含む実機確認を行ってください。Component単位で再利用する場合は、viewportではなくcontainer基準が適切かも確認してください。

短くするなら、

> **「mobileとdesktopの間、どうなっていますか？」**

## 30秒実験｜Browserを、ものすごくゆっくり縮める

PCで好きなWebサイトを一つ開く。

見出しを一つだけ見る。

Browser幅をゆっくり縮める。

```text
A
40 → 40 → 40 → 28

B
40 → 39 → 38 → 37 → … → 28
```

どちらが正しいかは決めなくていい。

代わりに、

**「この変化はcontentの都合で起きているのか、breakpointの都合だけで起きているのか」**

を見る。

その瞬間、responsive designが「スマホ版とPC版の二択」ではなくなる。

## 再現用プロンプト｜自分のサイトのFluid Typographyを監査する

```text
あなたはWeb TypographyとAccessibilityに詳しいUIデザイナーです。
対象ページのresponsive typographyを監査してください。

1. 使用されている主要なfont-size / line-heightをrole別に整理する
2. viewport幅の変化に対して、値がfixed / breakpoint jump / fluidのどれかを分類する
3. breakpoint前後1pxで不自然なsize jumpがないか確認する
4. fluid valueはmin / preferred / maxを分解し、なぜその値なのか説明する
5. viewport unit単独依存がないか確認する
6. 200% zoom時に文字拡大、reflow、content/functionalityの欠損がないか確認する
7. semantic hierarchyがsmall / middle / large幅で維持されているか確認する
8. component単位ではviewport基準よりcontainer基準が適切な箇所を抽出する
9. 修正案は「現状 → 問題 → 原理 → CSS例 → 確認方法」の順で出す
10. 数式の整然さより可読性・user control・content hierarchyを優先する

最後に、固定値の追加ではなく「どの関係を設計し直すべきか」を3点に絞ってください。
```

---

## 今日の中心命題

**Responsive typography is not about choosing every intermediate size. It is about designing the rule that produces them.**

Responsive Typographyは、途中の29px、31px、37pxを全部決めることではない。

**それらが生まれる関係を決めること**である。

最初は、スマホ28px、PC40pxという二つの数字しか見えていなかった。

調べたあとでは、その間に825px分の空間が見える。

767pxから768pxへ1px動いただけで文字が12px跳ねる画面も、以前より少し妙に見える。

では、その途中の37pxは誰が決めるのか。

答えは少しだけ変わった。

**37pxそのものは、誰も決めなくていい。**

人間が決めるのは、37pxが必要な瞬間ではなく、28pxと40pxの間をどう移動するかである。

そして、そのルールより優先されるものが一つある。

**読む人が、自分で読みやすさを変えられること。**

Fluid Typographyは「ブラウザーに任せる」技術ではない。

どこを人間が決め、どこを計算へ渡し、どこだけはユーザーへ返しておくかを決める設計である。

### Sources / Further Reading

- CSS Values and Units Module Level 4 — `min()`, `max()`, `clamp()`: https://www.w3.org/TR/css-values-4/#comp-func
- MDN — `clamp()`: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/clamp
- W3C WAI — Understanding SC 1.4.4 Resize Text: https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html
- web.dev — Responsive and fluid typography with Baseline CSS features: https://web.dev/articles/baseline-in-action-fluid-type
- Utopia — Fluid Type Scale Calculator: https://utopia.fyi/type/calculator/
- Utopia — Clamp Calculator: https://utopia.fyi/clamp/calculator/
- Ethan Marcotte — Responsive Web Design, A List Apart: https://alistapart.com/article/responsive-web-design/
- CSS-Tricks — Fluid Typography: https://css-tricks.com/snippets/css/fluid-typography/
- MDN — CSS Container Queries: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Containment/Container_queries
