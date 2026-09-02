---
id: design-literacy-line-height-reading-rhythm
title: "Line Height――行間は『空白』ではなく、行を分けながら文章をつなぐ距離"
subtitle: "English Mix｜Design Literacy #9｜Typography as Information Architecture"
created: "2026-09-03"
updated: "2026-09-03"
type: "English Mix"
status: "完成"
mode: "english-mix"
english_ratio: 0.45
mix_unit: "sentence"
series: "Design Literacy｜細部から思想まで"
seriesOrder: 9
---

# Line Height――行間は「空白」ではなく、行を分けながら文章をつなぐ距離
## Design Literacy #9｜Typography as Information Architecture

**Line height is not decoration. It controls how lines remain distinct without leaving the paragraph.**

Webの本文を見て「ちょっと詰まっているな」と感じると、we tend to jump straight to a number like `line-height: 1.6`.

でも、本当に見るべきなのは数字そのものではない。

**Can each line be distinguished clearly, while the paragraph still feels like one coherent block?**

今回のテーマは、**Line Height / Leading（行間）**。

## 1. まず一言：Line height separates lines without breaking the paragraph

同じ16pxの本文でも、line-heightが違えばreading experienceはかなり変わる。

```text
TIGHT

これは本文ですこれは本文です
これは本文ですこれは本文です
これは本文ですこれは本文です
```

When the lines are too close, they compete visually and become harder to track one by one.

逆に広げすぎると、

```text
LOOSE

これは本文ですこれは本文です

これは本文ですこれは本文です

これは本文ですこれは本文です
```

each line starts to feel like a separate block rather than part of one paragraph.

だからline heightは、

**Separation**
と
**Grouping**

のbalanceとして考えると分かりやすい。

## 2. 仕組み：Font Size alone does not determine Line Height

たとえば16pxの文字に24pxのline-heightを与えると、ratioは1.5になる。

```css
body {
  font-size: 16px;
  line-height: 1.5;
}
```

But **1.5 is not a universal answer**.

The U.S. Web Design System describes line height as a control for the vertical rhythm and density of a text block. For headings of roughly one or two lines, it points to values around 1–1.35, while longer running text generally needs at least 1.5.

USWDS also notes an important nuance: longer lines often need more line height to help the eye move from one line to the next, but too much line height can make individual lines feel overly separated.

[U.S. Web Design System — Typography](https://designsystem.digital.gov/components/typography/)

つまり、実務では少なくとも、

```text
Typeface
   ×
Font Size
   ×
Line Length / Measure
   ×
Text Purpose
   ×
Reading Context
   ↓
Line Height
```

を見る。

“Body text = 1.6”ではなく、**line height is a tuning value across several conditions**と考える。

## 3. Before → After：「詰まっている」をdiagnosisへ変える

ニュース記事を想像する。

### BEFORE

```text
16px / line-height 1.15

試合は序盤から激しい展開となり、
両チームが中盤でボールを奪い合う
時間が続いた。浦和は徐々にボールを
保持する時間を増やしていった。
```

The issue is not merely “it feels cramped.”

**The boundaries between lines are weak, so each line is harder to track as an individual reading unit.**

### AFTER

```text
16px / line-height 1.6

試合は序盤から激しい展開となり、
両チームが中盤でボールを奪い合う
時間が続いた。浦和は徐々にボールを
保持する時間を増やしていった。
```

Font sizeもinformation amountも変えていない。

それでもline trackingはしやすくなる。

ただし、the goal is not to memorize “1.6 = correct.”

**The real question is where the paragraph starts to lose cohesion as spacing increases.**

## 4. そのまま使える制作・修正指示

「行間を少し広げてください」だと、design intentが残らない。

Instead, write the instruction like this:

> **本文のline heightを、font sizeだけでなくline lengthと文章量を基準に再調整してください。各行を追いやすくしつつ、同じparagraphとしてのまとまりが失われない密度を探してください。**

For implementation, you can be more concrete:

> **長文本文はまず1.5〜1.7程度を検証起点にし、実際のfont family・本文幅・日本語表示で読み比べて決定してください。headingとbodyに同じline-height ratioを機械的に適用しないでください。**

The `1.5–1.7` range here is a **starting hypothesis for testing**, not a standard.

レビュー用に短くするなら、

> **「この行間は、行を分けるため？ それとも文章を一つに見せるため？」**

でいい。

## 5. “Leading” comes from physical lead

Typographyではline spacingを**leading（レディング）**とも呼ぶ。

The term comes from metal typesetting, where printers literally inserted strips of lead between lines of type to increase vertical spacing. Monotype describes this as the original meaning of leading.

[Monotype — Typography Terms and Definitions](https://www.monotype.com/resources/expertise/typography-terms-and-definitions)

Digital typographyではphysical leadは消えた。

But the design problem remains:

**At what distance should one line continue into the next?**

活版印刷でもCSSでも、媒体が変わってもこの判断はなくならない。

ここから先はinterpretationになるが、line heightは「空白を足す装飾」ではなく、**a technique for managing relationships between consecutive information units**と見る方が、本質に近づきやすい。

## 6. Accessibility：Do not misread WCAG’s “1.5”

WCAG 2.2 Success Criterion 1.4.12 **Text Spacing（Level AA）** requires that content and functionality are not lost when users override text spacing, including setting line height to at least **1.5 times the font size**.

[W3C — Understanding SC 1.4.12 Text Spacing](https://www.w3.org/WAI/WCAG22/Understanding/text-spacing)

ここは明確に分ける。

**WCAG does not require every authored paragraph to use `line-height: 1.5`.**

W3C explicitly states that content is not required to use those spacing values. The requirement is that content continues to work when a user overrides the authored spacing.

つまり、

```text
USWDS
→ practical guidance for authored typography

WCAG 1.4.12
→ adaptability to user-defined text spacing
```

They solve different problems.

数字だけ抜き出して、同じruleとして扱わない。

## 7. 誤解しやすい点：More whitespace is not automatically more readable

Increasing line height often makes a page feel quieter and more refined.

だから、見た目を洗練させるためにover-spacingしやすい。

But when the gap becomes too large, Proximity weakens and the paragraph starts to fragment.

```text
Too tight
→ lines are difficult to distinguish

Too loose
→ lines stop feeling like one paragraph

Balanced
→ lines are distinct, paragraph remains grouped
```

Line Heightは「white spaceを増やす技法」ではなく、**a technique for tuning distance between information units**や。

## 8. 以前の学びとの接続：Typography is information architecture at a smaller scale

以前扱ったProximityは、**nearby elements tend to be perceived as belonging together**という話だった。

Zoom that principle into typography:

```text
Character
↓
Word
↓
Line
↓
Paragraph
↓
Section
```

Each level has a spacing relationship that contributes to grouping.

ここで前より一段解像度を上げる。

**Typography is information architecture at a smaller scale.**

Information Architectureはpageやcardの階層だけではない。

Every line of text also contains a decision about what belongs together.

だからLine HeightはMICROなTypographyでありながら、MESOなInformation Architectureにもつながる。

## 9. 30秒でできる観察

Open any article you are reading now.

意味をいったん無視して、本文を**horizontal gray bands**として見る。

Check only three things:

```text
1. Can you distinguish each line?
2. Does the paragraph still feel like one block?
3. Is the line long while the line height is also tight?
```

If you can use DevTools, try:

```text
1.2
↓
1.5
↓
1.8
```

Do not search for the “correct” number.

Instead, watch **where “too dense” flips into “too fragmented.”**

That boundary is more useful than memorizing a ratio.

## 10. Next Concept：Measure / Line Length

Line Height alone does not complete body typography.

The next concept is **Measure / Line Length**.

USWDS gives 45–90 characters as a practical range for many lines of text, with roughly 66 characters as a useful target for long-form reading.

ただし、そのcharacter countを日本語へそのままコピーできるわけではない。W3CもText Spacingで、languageやscriptによってapplicable spacing propertiesが異なることを明示している。

So the next relationship becomes:

```text
Line Height
      ×
Line Length
      ↓
Reading Rhythm
```

**「行間を何倍にするか？」から、「1行をどこまで読ませるか？」へ。**

Today’s claim is:

**Line height is not empty space. It is the distance that keeps lines distinct while keeping the paragraph together.**

日本語なら、

**行間は、行を分けながら文章をつなぐ距離。**

## 参考資料

- [W3C — Understanding SC 1.4.12 Text Spacing](https://www.w3.org/WAI/WCAG22/Understanding/text-spacing)
- [W3C — Technique C21: Specifying line spacing in CSS](https://www.w3.org/WAI/WCAG22/Techniques/css/C21)
- [U.S. Web Design System — Typography](https://designsystem.digital.gov/components/typography/)
- [U.S. Web Design System — Line height](https://designsystem.digital.gov/design-tokens/typesetting/line-height/)
- [Monotype — Typography Terms and Definitions](https://www.monotype.com/resources/expertise/typography-terms-and-definitions)
