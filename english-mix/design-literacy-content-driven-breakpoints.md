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
abstract: Web制作で頻出する「768px」というbreakpointを疑う。Why should a layout that survives at 769px suddenly become something else at 768px? Brad Frostのcontent-driven breakpoint、WCAG 2.2のReflow、Ethan MarcotteのResponsive Web Designをたどり、breakpointをdevice borderではなく「content qualityを維持するintervention point」として捉え直す。
---

# 「768pxだから崩す」って、768pxは何をしたんだ？

Web productionをしていると、one number keeps showing up everywhere.

```css
@media (max-width: 768px) {
  ...
}
```

**768px.**

At 769px, the navigation sits horizontally. One pixel later, it disappears, cards stack vertically, and spacing changes.

しかし、the screen only became one pixel narrower. Copy did not change its meaning. Human fingers did not suddenly become thicker.

And yet、768pxになった瞬間だけthe entire interface changes state.

一度、ちゃんと聞いてみたい。

> **What exactly did 768px do?**

このsmall strange questionを本気で追うと、breakpointの見え方が少し変わる。A breakpoint can be understood not as “where Tablet begins,” but as **the width where content can no longer sustain the current layout**.

## 1. 今日のテーマ｜Content-driven Breakpoints

前回のIntrinsic Web Designでは、「PCなら3列」のようなfinished outcomeを先に決めるのではなく、minimum card widthやgapという**constraintsからlayoutを生む**考え方を扱った。

今回は、そのlogicをbreakpointまで広げる。

A common spec looks like this.

```text
Desktop   1024px〜
Tablet     768〜1023px
Mobile     〜767px
```

分かりやすい。But this table hides an assumption.

> **Something design-significant must happen around 768px.**

本当にそうなのか。First, remove the device names.

## 2. FACT｜Breakpointは「端末名」から決めなくていい

Brad Frostは2013年の記事「7 Habits of Highly Effective Media Queries」で、popular device dimensionsではなく**contentにbreakpointを決めさせる**ことを第一のhabitとして挙げている。He also argued for stress-testing the continuous range of screen widths instead of only checking named devices.

Source: https://bradfrost.com/blog/post/7-habits-of-highly-effective-media-queries/

重要なのは「768px is wrong」という話ではない。

The better question is、

> **Does this number have a content-side reason?**

ということだ。

![Device-drivenとContent-drivenのbreakpoint比較](https://raw.githubusercontent.com/silovar-uk/myessays/main/assets/design-literacy-content-driven-breakpoints/device-vs-content.svg)

*Figure: Device labelから決める場合と、content failureを観察して決める場合の違い。Original diagram for this article.*

## 3. EXPERIMENT｜1pxずつ縮めて、最初に何が壊れるかを見る

Imagine a fictional header.

```text
┌─────────────────────────────────────────┐
│ LOGO   NEWS  MATCH  TEAM  SHOP   LOGIN │
└─────────────────────────────────────────┘
```

Now shrink the browser gradually.

```text
1000px  ○
900px   ○
820px   ○
781px   ○
754px   △
731px   ×
```

Around 754px、items begin to feel cramped. At 731px、labels wrap or collide. Only now do we have an actual reason to change the layout.

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

さらに少しoverdoして、failureを分類する。

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

こうしてobserveすると、one site can naturally produce several different breakpoint candidates.

```text
NAV      760px
CARD     684px
HERO     912px
FILTER   838px
```

These numbers are not tidy. むしろ、その不格好さが重要だ。**Numbers produced by content are often uglier than numbers borrowed from a device catalog.**

## 4. Before → After｜同じ768pxでも「理由」を変える

### Before

```css
@media (max-width: 768px) {
  .nav {
    display: none;
  }
}
```

このcodeだけを見ると、768px itself appears to be the reason.

### After

まずNavigationをcontinuously shrinkして観察する。

```text
796 ○
782 ○
771 ○
763 △
751 ×
```

If the composition fails around 760px、treat 760px as the breakpoint candidate.

ただしDesign System全体で768pxをshared tokenとして使っているなら、the 760-to-768 gap can be safely absorbedと確認したうえで、768pxを採用してもよい。

```text
760px付近でcontentが壊れる
↓
system breakpointの768pxで安全に吸収できる
↓
768pxを採用
```

Same resulting number、but a completely different design reason.

## 5. VISUAL｜Breakpointは「端末の境界」ではなく「品質の崖」

Breakpoint is easier to understand when drawn as a change in quality rather than a named border.

![Breakpointを品質の崖として捉える図](https://raw.githubusercontent.com/silovar-uk/myessays/main/assets/design-literacy-content-driven-breakpoints/quality-cliff.svg)

*Figure: Layout qualityが維持できなくなる直前をbreakpoint candidateとして見る。Original diagram for this article.*

In this diagram、760px itself has no magical meaning. What matters is that **around this point the current layout stops supporting the content well**.

A breakpoint is less like a border saying “Tablet starts here” and more like a guardrail placed before quality falls off a cliff.

## 6. ACCESSIBILITY｜「壊れる」は見た目だけではない

ここではjokesを止めて、failureのdefinitionを広げる必要がある。

WCAG 2.2 Success Criterion 1.4.10 Reflowでは、vertical scrolling contentについて、幅320 CSS pixels相当でも、原則としてinformation or functionalityを失わず、two-dimensional scrollingを要求しないことが求められている。

Source: https://www.w3.org/WAI/WCAG22/Understanding/reflow.html

つまりfailureには、visual collapseだけでなく、次も含まれる。

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

A breakpoint can therefore be not merely a styling threshold but an **intervention point for preserving access to information**.

## 7. HISTORY｜Responsive Web Designは固定キャンバスへの反論だった

ここはfactとinterpretationを分ける。

**Fact.** Ethan Marcotteは2010年5月25日のA List Apartの記事「Responsive Web Design」で、fluid grids、flexible images、media queriesを組み合わせ、different viewing contextsに応答するdesignを提示した。

Source: https://alistapart.com/article/responsive-web-design/

**Interpretation.** この提案の重要性は、「better CSS for smartphones」が増えたことだけではない。It pushed design thinking back toward accepting the Web as **a medium whose width and viewing conditions keep changing**, rather than a collection of fixed canvases.

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

Content-driven BreakpointsはResponsive Web Designから外れたspecial techniqueというより、その思想をone level finerにしたものとして読める。

## 8. MISUNDERSTANDING｜共通Breakpointは悪ではない

ここまで読むと、640 / 768 / 1024 / 1280のようなshared breakpointsを全部捨てたくなるかもしれない。

But shared tokens have real benefits. Design System全体のconsistencyを保ちやすく、implementationやQAのmatrixも管理しやすい。

だからconclusionは、

> device由来の数字を使うな。

ではない。

Change the order of reasoning.

```text
× 768pxだから変える

○ 760px付近でcontentが壊れる
  ↓
  system breakpointの768pxで吸収できる
  ↓
  768pxを採用する
```

**The same 768px can mean something different when it comes from observation rather than habit.**

## 9. CONNECTION｜#48〜#51は「指定」から「観察」への移動だった

The last four lessons form one continuous movement.

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

At first、designerは「40px」「768px」「3列」とanswersをdirectly specifyしていた。

Gradually、見る対象がvalue relationships、component context、conditions for success、そしてfailure momentへ移っている。

**Responsive Design is partly observational design.**

レスポンシブ設計には、making thingsだけでなく、**noticing the moment a system stops holding together**が必要になる。

これが今回の「前より解像度が上がる接続」だ。

## 10. PRODUCTION｜そのまま使える制作・修正指示

> PC／タブレット／スマートフォンの代表幅だけでブレークポイントを決めず、ブラウザー幅を連続的に変更して、文字の折返し、要素同士の干渉、CTAの圧迫、情報階層の崩れが最初に発生する幅を確認してください。その幅をbreakpoint candidateとし、既存のDesign System breakpointへ吸収する場合は、品質を維持できる範囲かを検証してください。

For review、さらに短くできる。

> **“What exactly breaks at 768px?”**

If the only answer is “iPad”、一度検証する価値がある。

## 11. PRACTICE｜30秒でできるDisco Test

Open any website on desktop and move the browser window wider and narrower.

見るのはone thingだけ。

> **What is the first moment that feels slightly wrong?**

An orphaned word? A cramped navigation? A CTA wrapping to two lines? An image crop that loses meaning?

Check the width at that moment.

That is a breakpoint candidate.

It is information that does not exist when you only inspect finished 375 / 768 / 1440px frames in Figma.

## 12. NEXT｜次はResponsive Designの「歴史」を見る

ここまで#48〜#51では、Responsive Designを主にimplementation and design principlesの側から見てきた。

次は一度MACROへ上がる。

Why did Web designers try to make pages behave like fixed paper in the first place? そしてEthan Marcotteが2010年にResponsive Web Designを提示したとき、what kind of assumption was he pushing against?

次の問いは、

> **Responsive Web Design was not merely a CSS technique. What kind of design worldview did it change?**

になる。

## 13. 今日の中心命題

> **A good breakpoint marks a change in what the content can sustain, not merely a change in device category.**

良いbreakpointは「Tablet starts here」というborderではない。

**It is the boundary beyond which the current representation can no longer preserve content quality.**

調べる前、768px looked like an answer.

調べた後、768px becomes a question.

> **What exactly becomes worse at 767px?**

If nothing becomes worse、そのbreakpoint has not arrived yet.

Breakpointを探すというより、observe the moment when content starts saying “this form no longer holds.”

そう考えると、768px itself is not the villain.

It starts to look like a number that spent years being blamed for layout collapse despite having done absolutely nothing.

## 14. Sources

- Brad Frost, “7 Habits of Highly Effective Media Queries”  
  https://bradfrost.com/blog/post/7-habits-of-highly-effective-media-queries/
- Ethan Marcotte, “Responsive Web Design”, A List Apart, May 25, 2010  
  https://alistapart.com/article/responsive-web-design/
- W3C WAI, “Understanding Success Criterion 1.4.10: Reflow”  
  https://www.w3.org/WAI/WCAG22/Understanding/reflow.html
