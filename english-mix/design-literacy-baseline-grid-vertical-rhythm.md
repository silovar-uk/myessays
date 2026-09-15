---
id: design-literacy-baseline-grid-vertical-rhythm
title: 文字は揃っているのに、なぜページ全体が微妙にガタついて見えるのか
subtitle: Design Literacy #46｜Baseline Grid / Leading / Vertical Rhythm
created: 2026-09-15
updated: 2026-09-15
type: Essay
status: published
tags: ["Design Literacy", "Typography", "Baseline Grid", "Vertical Rhythm", "UI"]
keywords: ["Baseline Grid", "Baseline", "Leading", "Line Height", "Vertical Rhythm", "Font Metrics", "Swiss Style", "CSS Inline Layout"]
favorite: false
grow: true
series: Design Literacy｜細部から思想まで
seriesOrder: 46
abstract: Paddingもgridもaligned。それでもtypeだけ妙にガタつく。原因をboxではなく、lettersがsitするbaselineから調べると、print gridとmodern CSSの間に、似ているようで同じではないdesign problemが見えてくる。
---

# 文字は揃っているのに、なぜページ全体が微妙にガタついて見えるのか

Two cardsを作った。

Both sidesのpaddingは16px。Widthもsame。Headingのfont-sizeもsame。CSS Gridもcleanに効いている。

なのに、**typeだけが微妙にガタついて見える。**

```text
┌──────────────┐  ┌──────────────┐
│ TITLE        │  │ TITLE        │
│ 本文です     │  │ 本文です     │
│ 本文です     │  │              │
│              │  │ 本文です     │
└──────────────┘  └──────────────┘
```

Boxes are aligned.

文字もsame size。

Then what is not aligned?

答えを先に言うと、**letters do not sit on the bottom edge of the box.**

急にfurnitureの話みたいになった。

今回は、この「文字がwhere to sit」を追いかける。Baseline Gridの話である。

## FACT｜文字には「床」がある。ただしuniversal floorではない

W3CのCSS Inline Layout specificationでは、baselineを、line boxのinline axisに沿ってglyphをalignするためのlineとして定義している。Latin、Cyrillic、Greekなどではalphabetic baselineが一般的で、多くのlettersがその上にrestし、`g`や`p`のようなdescenderが下へ伸びる。

But immediately, there is a catch.

**Different writing systems prefer different baselines.**

Latin系ではalphabetic baseline、Indic scriptsではhanging baselineが使われる場合があり、Han-based systemsではglyphがsquareを満たすようdesignedされるため、同じ「letters sit on this line」という説明をそのままuniversal ruleにはできない。

Source: https://www.w3.org/TR/css-inline-3/

つまりbaselineというwordを覚えた瞬間に、baselineはoneではないと教えられる。

Design、たまにtutorialの入口でいきなり階段を増築してくる。

## まず、font-sizeを見るのをやめてみる

For example:

```css
font-size: 16px;
line-height: 24px;
```

16pxのtypeが24pxのtransparent boxいっぱいに膨らんでいるわけではない。

Conceptually:

```text
────────────  line box top

      Hello
──────H──ll──  ← baseline
          ↓
       descender

────────────  line box bottom
```

さらにCSSではfontごとにascent、descentなどのmetricsがあり、`line-height`はline boxのheight calculationに関わる。W3C specificationでも、ascent/descentはfont全体のmetricsであり、individual glyphのactual outlineそのものとは限らないとされている。

**16px alone does not tell you where the letters visually sit.**

Source: https://www.w3.org/TR/css-inline-3/

## One step too far｜font-sizeを隠して、line-heightだけ並べる

Usually we review this:

```text
TITLE   24px
BODY    16px
CAPTION 12px
```

今日はfont-sizeをhideする。

```text
TITLE   line-height 32px
BODY    line-height 24px
CAPTION line-height 20px
```

するとdifferent landscapeになる。

BODY:

```text
24 → 48 → 72 → 96
```

CAPTION:

```text
20 → 40 → 60 → 80
```

Even if they start aligned, different cycles drift apart.

そこでBaseline Gridが登場する。

## Baseline Gridは、type用の横断歩道みたいなもの

Baseline Gridは、evenly spaced horizontal linesに文字のbaselineを合わせ、multiple columnsやdifferent text stylesの間にvertical rhythmを作る方法。

```text
LEFT                  RIGHT

Hello                  News
──────────── 24 ────────────
World                  9/15
──────────── 48 ────────────
Design                 Read
──────────── 72 ────────────
```

Column gridがhorizontal positionをorganizeするなら、baseline gridはvertical beatをorganizeする。

ここでgridが、graph paperではなく**metronome**に見えてくる。

## Before → After｜全部4の倍数でもsame rhythmとは限らない

### Before

```text
BODY     16 / 24
CAPTION  12 / 20
```

24も20もmultiples of 4。

「4px gridに乗っています」と言いたくなる。

But as line cycles, 24 and 20 move differently.

### One possible After

```text
BODY     16 / 24
CAPTION  12 / 24
```

Now they can share baseline intervals more easily.

ただしcaptionまで24pxだとtoo looseな場面もある。その場合はsmaller unitでrelationshipを作るか、deliberately rhythmをbreakする。

The answer is not “make everything 24px.”

**Make the relationship between line-heights explainable.**

## Visual｜baselineは本当に文字のbottom edgeではない

![W3C CSS Inline Layout specification: alphabetic text, em-boxes and baseline](https://www.w3.org/TR/css-inline-3/images/baselines-simple.svg)

*Figure: W3C CSS Inline Layout Module Level 3. Source: https://www.w3.org/TR/css-inline-3/*

このfigureを見ると、visible glyph outline、em-box、baselineがdifferent thingsなのが分かる。

「font-size 16px = 16px-tall object」という理解がかなり怪しくなる。

## History｜Swiss Style invented baseline? No.

ここはoversimplifyすると危ない。

Grids existed long before Swiss Style. Manuscripts and printed books already used ruling and proportional structures to organize text. In the mid-20th century International Typographic Style, designers including Max Bill, Emil Ruder and Josef Müller-Brockmann developed and spread the typographic grid as a systematic modernist design method.

Müller-Brockmannが重要なのはgridをinventしたからではなく、type、image、white spaceをrelationshipのsystemとして扱い、educationとpracticeへ広く定着させた点にある。

Reference: https://www.thegraphicdesignschool.com/design-history/joseph-mueller-brockmann/

ここで朝のDesign Literacy #45 Spacing Scaleにつながる。

```text
SPACING SCALE
Stop inventing every distance.

BASELINE GRID
Stop inventing every vertical type position.
```

Common pointは8pxでも24pxでもない。

**Turn local decisions into a system of relationships.**

## But print grid ≠ web grid

Printではfixed pageとcontrolled typesettingを前提に、baseline rhythmをかなりstrictに設計できる。

The web refuses to stay still.

Viewport changes. Content changes. Fonts fall back. Users zoom text. Japanese and Latin mix. Variable fonts appear.

CSS Inline Layout itself handles font metrics and multiple baseline types.

だから、

> Make every element perfectly match a 4px baseline.

をgoalにすると、いつの間にか「人間が読むpage」ではなく「make the overlay green game」を始める危険がある。

Baseline Grid is a tool, not a religion.

## INTERPRETATION｜Gridはpositionだけでなく「time」をdesignしている？

ここからはinterpretation。

Before researching baseline grids, grid looked like a tool for position.

```text
X = here
Y = here
```

Vertical rhythm changes that view.

```text
LINE
↓ 24
LINE
↓ 24
LINE
↓ 24
```

This is position, but also repetition.

音楽でいえばbeatに近い。

Readers do not see grid lines. Yet if headings, body text, captions and spacing repeat on related cycles, the page develops a tempo.

**Grid is not only geometry. It can also be rhythm.**

これはhistorical factではなく、baseline gridをmodern UIへconnectするためのinterpretation。

## そのまま使える制作・修正指示

> 複数のtext stylesが混在する画面では、font-sizeだけでなくline-heightを一覧化してください。Body・caption・headingのline-heightがcommon baseline unitとどのようなrelationshipにあるか確認し、multiple columnsやcards間でvertical rhythmが不必要に崩れないよう調整してください。Perfect pixel alignmentを目的化せず、readability・multilingual typography・responsive behaviorを優先したうえでexceptionsをdesignしてください。

Short version:

> **“Show me the line-heights, not only the font-sizes.”**

## 30-second experiment｜自分のsiteからbeatを3つ拾う

Open a page you are making.

Ignore font-size.

Pick only three line-heights.

```text
20
24
32
```

A common 4px unit appears.

```text
21
25
31
```

Then ask:

**Why these numbers?**

説明できればkeep。

説明できなければsystemization candidate。

And finally, look with your eyes. Font metrics and optical perception are not the spreadsheet itself.

## Next concept｜Typographic Scale

We now have a spacing system and a line-height rhythm.

次はfont-sizeそのもの。

```text
12 / 14 / 16 / 18 / 20 / 22
```

Do we choose sizes by adding two every time? Or create hierarchy through ratios?

Next: **Typographic Scale / Modular Scale**.

```text
FONT SIZE
+
LINE HEIGHT
+
SPACING
```

They start becoming one system.

---

## 今日の中心命題

**Boxes align by edges. Type aligns by baselines.**

Boxesはedgesで揃う。

Typeはbaselinesを持つ。

最初は、paddingもgridも揃っているのに文字がガタつくのを「probably the font」くらいに見ていた。

After researching it, invisible horizontal lines suddenly appear everywhere on the screen.

しかも、そのlinesはuniversal one-size-fits-allですらない。

Latin、日本語、font metrics、line-height、responsive layout。それぞれを抱えながら、画面にrhythmを作ろうとしている。

Baseline Gridとは、文字をarmyみたいに整列させるruleではない。

**It is closer to sheet music that lets different type play the same song.**

### Search terms

`Baseline Grid` / `Baseline` / `Alphabetic Baseline` / `Hanging Baseline` / `Leading` / `Line Height` / `Vertical Rhythm` / `Font Metrics` / `Ascent` / `Descent` / `Swiss Style` / `CSS Inline Layout`

### Sources

- W3C, CSS Inline Layout Module Level 3 — https://www.w3.org/TR/css-inline-3/
- The Graphic Design School, Josef Müller-Brockmann — https://www.thegraphicdesignschool.com/design-history/joseph-mueller-brockmann/
- Baseline HQ, Grid Systems — https://baselinehq.com/4-grid-systems.html
- Grid Maker Pro, Baseline grid and vertical rhythm — https://www.gridmakerpro.com/grids/typography-grids/baseline-grid/
