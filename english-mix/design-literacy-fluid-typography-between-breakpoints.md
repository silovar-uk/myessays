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
abstract: Mobileでは28px、desktopでは40px。では、その途中の37pxは誰が決めるのか。1pxのviewport差でtypeが12px jumpする奇妙さから、clamp()、Responsive Web Design史、zoom accessibility、container queryまで追い、responsive designを「device別の完成形」から「valueの変化を設計すること」へ捉え直す。
---

# スマホでは28px、PCでは40px。その途中の37pxは誰が決めた？

Mobileのheadingは28px。Desktopでは40px。

A very normal specである。

では、767px幅のbrowserでは28px、768px幅になった瞬間に40pxへ切り替わるimplementationを考える。

Viewportは**1pxしか広がっていない。**

Typeは**12px大きくなる。**

```text
VIEWPORT     TITLE
767px        28px
768px        40px

画面 +1px
文字 +12px
```

Growth spurtにも限度がある。

もちろんactual designではbreakpointの前後でlayoutも変わるので、こうしたjumpがnecessaryな場合もある。ただ「mobileでは28、desktopでは40」とだけ決めたresultとして起きているなら、一度だけ妙だと思っていい。

今回は、その1px gapからFluid Typographyを調べる。

## FACT｜Breakpointは「状態を切り替える」のであって、「途中」を説明しない

Media queryでfont-sizeを変えるminimal exampleは、こう書ける。

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

This is not wrong.

375pxでも700pxでも28px。768pxになったら40px。After thatは40px。

```text
28 ───────────────┐
                   │
                   └────────────── 40
                  768
```

Breakpointは、**where to change state**を設計するのが得意だ。

逆に、「two statesの間をどうmoveするか」は何も決めない。

## もう一歩やりすぎる｜画面幅を1pxずつ増やしてみる

375pxから1200pxまで、titleを28pxから40pxへgrowさせたいとする。

Breakpoint approachなら、例えばこうなる。

```text
375 → 767   28px
768 → 1199  34px
1200 →      40px
```

ここにはtwo jumpsがある。

では、375pxで28px、1200pxで40pxという**two endpointsだけを固定し、その間をstraight lineでつなぐ**とどうなるか。

```text
375px   28.00px
500px   29.82px
700px   32.73px
900px   35.64px
1200px  40.00px
```

767から768へ進んでも、almost nothing changes.

人間が29.82pxをone by oneで決めたわけではない。

**Humans decide endpoints and rule; calculation fills the middle.**

ここがFluid Typographyの入口になる。

## `clamp()`は、最小・途中・最大を一行に入れる

CSS Values and Units Module Level 4では、`clamp(MIN, VAL, MAX)`は、central calculationをminimumとmaximumの間に制限するcomparison functionとして定義されている。

Source: https://www.w3.org/TR/css-values-4/#comp-func

MDNも、`clamp()`をminimum、preferred、maximumの3値でrangeをcontrolするfunctionとして説明し、font-sizeをviewportに応じて変化させながらlimitsを設けるexampleを掲載している。

Source: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/clamp

さきほどの「375pxで28px、1200pxで40px」をone exampleとして書くと、conceptuallyこうなる。

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

大事なのは、このformulaをmemorizeすることではない。

**28と40の間に、explainable relationshipを作れること**である。

## 画像で見る｜Utopiaは「途中の値」ではなく「両端のsystem」を入力させる

![Utopia Clamp Calculatorの画面](https://utopia.fyi/images/clamp-calculator.jpg)

*Figure: Utopia, Clamp Calculator. Source: https://utopia.fyi/blog/clamp-calculator/*

UtopiaのFluid Type Scale Calculatorでは、minimum viewport側とmaximum viewport側に、それぞれbase font sizeとtype scaleを設定し、そのbetween valuesを`clamp()`としてgenerateできる。

Source: https://utopia.fyi/type/calculator/

さらにcurrent Utopiaは、calculation basisをViewportだけでなくContainerへswitchするsettingも持つ。

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

固定値のfamilyだったType Scaleが、今日はmoving systemになる。

## 再リサーチ｜Fluid Typographyは`clamp()`が発明したわけではない

ここはhistoryを雑にしない。

Ethan Marcotteが2010年のA List Apart「Responsive Web Design」で示したcore ingredientsは、fluid grids、flexible images、media queriesだった。重要だったのはspecific deviceごとのfixed pageを増やすことではなく、different viewing contextsのcontinuumを前提にWebを考えることだった。

Source: https://alistapart.com/article/responsive-web-design/

Marcotteの記事が引用したJohn Allsoppの言葉に、short but symbolicな表現がある。

> “accept the ebb and flow of things.”

固定されたpaper pageのようにWebを扱うのではなく、changing mediumとして受け入れる。

Fluid Typographyは、そのideaをtype sizeへ持ち込んだものと見ると分かりやすい。

2010年代半ばには、Mike Riethmullerらが`calc()`とviewport unitsを組み合わせ、minimumとmaximumを持つfluid typeをpracticeしていた。CSS-Tricksは2016年、そのmethodやfluid modular scaleを紹介している。

Source: https://css-tricks.com/snippets/css/fluid-typography/

`clamp()`は思想のinventionというより、**以前はlong formulaで書いていた「bounded continuous change」を、CSSのstandard featureとしてかなり書きやすくしたtool**と考える方が正確である。MDNによれば、`clamp()`はmajor browsersで2020年7月以降widely availableになっている。

## ここで笑いを止める｜`5vw`だけで済ませると、ユーザーの拡大操作と衝突する

一番simpleなFluid Typographyは、こう見える。

```css
.title {
  font-size: 5vw;
}
```

Viewportが広がればtypeもgrowする。確かにfluidだ。

しかし、viewport-relative unitだけでfont-sizeを決めるapproachにはaccessibility issueがある。

W3CのWCAG 2.2 Success Criterion 1.4.4では、captionとimages of textを除き、textをassistive technologyなしで200%までresizeしてもcontentやfunctionalityを失わないことを求めている。

Source: https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html

web.devの2025年のFluid Typography解説も、viewport-relative valueだけでfont-sizeを決めるとuser zoomやdefault font-sizeへのresponseが弱くなり得ると注意し、`em`や`rem`をbaseにしつつviewport/container unitをadjustmentとして組み合わせる考え方を示している。

Source: https://web.dev/articles/baseline-in-action-fluid-type

つまり、

```text
FLUID
≠
VIEWPORTに完全服従
```

Smooth changeより、**userが自分のreadabilityを変更できることの方がpriorityは高い。**

`clamp()`を使ったらaccessibilityがautomatically solvedするわけでもない。minimum・maximum・central expressionを決めたあと、actual browser zoomやtext resizeで確認する必要がある。

## Before → After｜端末を設計するのをやめて、変化を設計する

### Before

```text
iPhone     28px
Tablet     32px
Laptop     36px
Desktop    40px
```

このdesignでは、新しいdevice widthが出るたびに「which box?」を考えたくなる。

### After

```text
MIN
28px @ 375px

↓ relationship

MAX
40px @ 1200px
```

こちらでは、375〜1200pxの間に存在するcountless viewportsをone by oneでnameしない。

Design targetが、**device listからchange functionへ移る。**

もちろん、layoutがfundamentally変わるpointにはbreakpointが必要である。FluidとBreakpointはenemiesではない。

```text
BREAKPOINT
構造が変わる地点を決める

FLUID VALUE
構造が同じ間の変化を決める
```

They have different jobs.

## INTERPRETATION｜Responsive Designは「完成画面を何枚作るか」ではなくなる

ここからはinterpretation。

Responsive Designをmobile / tablet / desktopのthree snapshotsとして考えると、designのcenterはfinished statesになる。

```text
375px DESIGN
768px DESIGN
1440px DESIGN
```

Fluid Typographyを入れると、そのbetween spaceにもdesign targetがあることが見える。

```text
375 ───────────────── 1440
      ↑ここ全部がUI
```

つまりresponsive designは、finished screensを増やすworkだけではない。

**It is also about designing how values behave between constraints.**

これは#45のSpacing Scale、#46のBaseline Grid、#47のTypographic Scaleから一段進んでいる。

```text
#45  値を家族にする
#46  周期を共有する
#47  階層に関係を作る
#48  関係そのものを動かす
```

Design Tokenも「TITLE = 40px」というstatic valueだけではなく、「このrangeでは28pxから40pxへ変化する」というbehaviorを表現できる。

## 誤解しやすい点｜滑らかな方が、いつでも優れているわけではない

Fluid Typography is satisfying.

だからeverythingをfluidにしたくなる。

しかし、always necessaryとは限らない。

Body sizeをほぼconstantに保ちたい場合もある。特定widthを超えたらlayout自体をchangeした方が自然な場合もある。Huge display typeではfont-sizeよりline breakをeditorially固定する方が重要なこともある。

さらに、every intermediate widthでoptimal appearanceになるguaranteeもない。

**Continuous is not Automatic Optimal.**

Continuous systemを作ったあとも、narrow、middle、wide、zoom時のactual screenを見る。

Math does not remove review.

## 次へ行くと、viewportすら怪しくなる｜Container Queries

ここまで「viewport widthに応じてtypeを変える」と話してきた。

しかし、1440pxのdesktop viewportに300px幅のcardが置かれていたらどうなるか。

```text
VIEWPORT 1440px
┌──────────────────────────────────┐
│ ┌──────────┐                     │
│ │ CARD     │ 300px               │
│ └──────────┘                     │
└──────────────────────────────────┘
```

Viewport says “wide.”

Card says “not at all.”

CSSのcontainer query length unitsには、query containerのinline sizeの1%を表す`cqi`などがある。MDNは、container-relative unitを使うことで、componentを置かれたcontainer sizeに応じてflexibly調整できると説明している。

Source: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Containment/Container_queries

次のquestionは、

> How wide is the screen?

ではなく、

> **How much room does this component actually have?**

になる。

## そのまま使える制作・修正指示

> Responsiveなfont-sizeをdevice categoryごとのfixed valuesだけで定義せず、まずminimum / maximumのusage widthと、そのendpointsで必要なfont-sizeを決めてください。Structureが同じrangeでは`clamp()`などによるcontinuous interpolationを検討し、structureが変わるpointにはbreakpointを使用してください。Viewport unitだけでfont-sizeを決めず、`rem` / `em`とのcombinationを検討し、200% zoomを含むreal-device checkを行ってください。Component単位で再利用する場合は、viewportではなくcontainer基準がappropriateかも確認してください。

Short versionなら、

> **「mobileとdesktopの間、どうなっていますか？」**

## 30秒実験｜Browserを、ものすごくゆっくり縮める

PCでfavorite websiteを一つ開く。

Headingを一つだけ見る。

Browser widthをslowly縮める。

```text
A
40 → 40 → 40 → 28

B
40 → 39 → 38 → 37 → … → 28
```

どちらがcorrectかは決めなくていい。

Instead、

**「このchangeはcontentの都合で起きているのか、breakpointの都合だけで起きているのか」**

を見る。

その瞬間、responsive designが「mobile版とdesktop版のbinary choice」ではなくなる。

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

Responsive Typographyは、途中の29px、31px、37pxを全部chooseすることではない。

**It is about deciding the relationship that produces them.**

最初は、mobile 28px、desktop 40pxというtwo numbersしか見えていなかった。

調べたあとでは、そのbetween spaceに825px分のcontinuumが見える。

767pxから768pxへ1px moveしただけでtypeが12px jumpするscreenも、以前より少し妙に見える。

では、その途中の37pxはwho decides it?

Answerは少しだけ変わった。

**Nobody needs to decide 37px itself.**

人間がdecideするのは、37pxが必要なmomentではなく、28pxと40pxの間をどうmoveするかである。

そして、そのruleよりpriorityの高いものが一つある。

**Readers must retain control over readability.**

Fluid Typographyは「browserに任せる」technologyではない。

どこをhumanがdecideし、どこをcalculationへ渡し、どこだけはuserへ返しておくかを決めるdesignである。

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
