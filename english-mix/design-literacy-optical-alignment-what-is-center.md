---
id: design-literacy-optical-alignment-what-is-center
title: "CSS says it is centered. So who is wrong?"
subtitle: "Design Literacy #21｜Optical Alignmentを『what is center?』から考える"
abstract: "CSSやFigmaでは中央なのに、Play iconが少しズレて見える。This essay separates bounding-box center, geometric centroid, center of mass, and perceived center, then connects typography, visual perception, and UI icon design. Overshootとicon position correctionを同一視せず、geometry first, perception secondという実務判断まで落とし込む。"
---

# CSS says it is centered. So who is wrong?
## Design Literacy #21｜Optical Alignmentを「what is center?」から考える

**The computer says it is centered.**

Figma says center. CSS says center.

```css
display: flex;
align-items: center;
justify-content: center;
```

Everything is mathematically fine.

でも、Play buttonの「▶」を見ると、少し左にいる気がする。

So who is wrong?

CSS? Figma? Or your eyes?

今回は1pxを直す話から始めて、**what “center” actually means**まで掘る。

## 1. First idea：「center」は一種類ではない

**A center can be calculated. A visual center must be perceived.**

前回は、

```text
geometric alignment
≠
optical alignment
```

まで扱った。

Now we split “center” itself.

- **Bounding-box center**：図形を囲むrectの中央
- **Geometric centroid**：uniform areaとして計算した面積重心
- **Center of mass**：mass distributionを仮定した物理的重心
- **Perceived center / visual center**：人が「ここが中心」と感じる位置

The first three can be calculated once the assumptions are fixed.

最後だけhuman perceptionが入る。

That is where things get messy.

## 2. A triangle already breaks the simple idea of center

右向きの三角形を、

```text
(0, 0)
(0, h)
(w, h/2)
```

で作る。

Its bounding-box center is at `w / 2`.

But the triangle’s area centroid sits at `w / 3`.

```text
┌────────────────────┐
│                    │
│       ▶            │
│                    │
└────────────────────┘

box center      = w/2
shape centroid  = w/3
```

つまり、**the box center and the shape center are already different before perception enters the story.**

Play iconをBounding boxだけで中央にすると、visible areaは左側へ多く分布する。

But this does not mean:

> Put the centroid at the center and everything is solved.

人間はpixelを全部足してcentroidを計算しているわけではない。

## 3. Your eye does not simply count pixels

ここからVisual Perception。

Proffitt, Thomas, and O’Brienの1983年研究では、perceived centerは内部のluminance distributionだけで決まらず、**boundary contour—輪郭形状—が強く影響する**ことが示された。

[Proffitt, Thomas & O'Brien, 1983](https://pubmed.ncbi.nlm.nih.gov/6844093/)

Another study by Davi, Doyle, and Proffitt found that symmetry affects how accurately people locate a center, with rotational symmetry playing an important role.

[Davi, Doyle & Proffitt, 1992](https://pubmed.ncbi.nlm.nih.gov/1508622/)

Baud-Bovy and Soechting later studied asymmetric two-dimensional shapes. Participants estimated center of mass surprisingly consistently, but the errors were systematic: estimates tended to shift toward the center of an inscribed circle rather than the true center of mass.

[Baud-Bovy & Soechting, 2001](https://pubmed.ncbi.nlm.nih.gov/11424655/)

So the simple model—

```text
count dark area
↓
calculate center
↓
perceive center
```

—is not enough.

輪郭、対称性、orientation、shapeそのものが絡む。

We started with one pixel. We are now in psychophysics.

## 4. Put ■ ● ▲ ▶ × in the same box

**Same box does not mean same balance.**

```text
┌─────┐  ┌─────┐  ┌─────┐  ┌─────┐  ┌─────┐
│  ■  │  │  ●  │  │  ▲  │  │  ▶  │  │  ×  │
└─────┘  └─────┘  └─────┘  └─────┘  └─────┘
```

For a symmetric square or circle, centroid and box center can coincide.

▲や▶ではshapeによって一致しない。

× can change its visible distribution depending on stroke width and angle.

デザインではここで**Visual Weight**という言葉をよく使う。

But keep the concepts separate.

**FACT**

- centroid is a geometric concept
- center of mass is a physical concept
- perceived center is a perception-research concept
- visual weight is a design term used to discuss how strong or heavy an element appears

They are related in practice, but they are not the same thing.

**INTERPRETATION**

UI reviewでは、size、fill、stroke、contour、contrast、surrounding spaceを含めて「どちら側がstrongerに見えるか」を考える言葉としてVisual Weightが便利。

Visual Weight is not a new formula for center of mass.

## 5. Negative Space is not visually empty

▶をcontainerの中央に置いたとき、left sideとright sideに残るspaceの形は同じではない。

```text
container
↓
icon bounding box
↓
visible shape
↓
surrounding negative space
```

レビューを、

> The icon itself is centered.

で止めない。

Apple’s SF Symbols guidance explicitly asks custom symbols to remain consistent in **optical weight, alignment, and position**. It also supports negative side margins when added width—such as a badge—needs optical horizontal correction.

[Apple Human Interface Guidelines — SF Symbols](https://developer.apple.com/design/human-interface-guidelines/sf-symbols)

Even a mature symbol system does not assume that matching rectangles automatically creates matching perception.

## 6. Is typography overshoot the same thing as icon correction?

**No. Related idea, different problem.**

Typographyでは、Oのようなround glyphをHのようなflat glyphと完全に同じheightへ収めると、smallerに見えることがある。

Microsoft’s typography guidance describes overshoot for round glyphs such as C, G, O, and Q, and also notes that pointed forms such as A, V, or W may extend beyond flat heights so they do not appear short.

It also says glyph spacing should be **visually centered rather than mathematically centered**.

[Microsoft Typography — Character design standards: Uppercase](https://learn.microsoft.com/en-gb/typography/develop/character-design-standards/uppercase)

[Microsoft Typography — From typeface to font file](https://learn.microsoft.com/en-us/typography/truetype/from-typeface-to-font-file)

でもOvershootは主に、**height and apparent size**を揃える補正。

Play iconを横に動かすのは、**position and balance**を揃える補正。

They are not the same mechanism.

What connects them is this:

```text
mathematical equality
≠
perceptual equality
```

同じ「optical compensation」という大きなfamilyにいるが、同一現象ではない。

That distinction makes the idea much cleaner.

## 7. So how many pixels should we shift it?

**There is no magic pixel value.**

同じ▶でも、

- aspect ratio
- fill or stroke
- icon size
- container size
- nearby text
- surrounding UI
- consistency with other icons

でbalanceは変わる。

Google’s Material Symbols has an **optical size (`opsz`) axis from 20dp to 48dp**. As the icon scales, stroke thickness is adjusted so the symbol keeps a similar visual character rather than being a purely mathematical enlargement.

[Google Fonts — Material Symbols guide](https://developers.google.com/fonts/docs/material_symbols)

This is not horizontal centering itself.

But it shows the same larger principle: **simple mathematical scaling is not always enough for perceptual consistency.**

だから、

> move Play icon 1px right

というruleより、

> define the checking process before correction

の方が強い。

## 8. A production-ready review instruction

**Geometry first. Perception second.**

そのまま制作指示にするなら、こうなる。

> **まずAuto Layout、Grid、Flex等で幾何学的な中央を作ってください。Then inspect the visible shape, visual weight, negative space, and relationship to nearby elements. 複数サイズでも同じ方向の視覚的ズレが再現する場合のみoptical correctionを追加し、その補正はcomponent-level exceptionとして記録してください。**

Review flow:

```text
1. Is the bounding box centered?
      ↓
2. Where is the visible shape distributed?
      ↓
3. Is negative space imbalanced?
      ↓
4. Does it still look shifted next to real UI elements?
      ↓
5. Does the same issue appear at multiple sizes?
      ↓
6. Only then add optical correction
```

This is much stronger than “move it until it feels right.”

## 9. Optical Alignment is not permission to ignore the grid

**Optical alignment is a controlled exception layer.**

順序は、

```text
Rule
↓
Deviation detected
↓
Reason identified
↓
Controlled exception
```

Gridを捨ててeye-ballingする話ではない。

Without a baseline rule, you cannot tell the difference between a correction and a mistake.

そして、asymmetry does not automatically mean “shift it.”

Research shows people can estimate centers of asymmetric shapes reasonably well, and the pattern of error changes with shape and symmetry.

```text
asymmetry
↓
not “must shift”
↓
“inspect more carefully”
```

これくらいが安全。

## 10. The connection becomes sharper

前回：

```text
Geometric Alignment
≠
Optical Alignment
```

今回：

```text
Bounding-box center
≠
Geometric centroid
≠
Perceived center
```

And also:

```text
Overshoot
≠
Icon position correction
```

でも大きな思想では、

```text
Mathematical equality
↓
Perceptual inequality
↓
Controlled compensation
```

でつながる。

Optical Alignment is not “the skill of moving things by one pixel.”

**It is the design of what should count as equal for human perception.**

だからGridの敵ではない。

It is what comes after the grid has done its job.

## 11. 30-second observation

Find one Play button.

1. container centerを見る
2. ▶のbounding boxを見る
3. visible areaがどちらへ寄っているか見る
4. left/right negative spaceを見る
5. explain in one sentence why you want to shift it

If the answer is only:

> somehow it feels off

まだ触らない。

If you can say:

> the visible mass sits toward the left, and the surrounding negative space makes the symbol feel left-heavy

you now have a reviewable reason.

## 12. Next concept：Visual Weight

**What makes something look heavy?**

次は、

- size
- fill
- stroke
- contrast
- color
- density
- position

がattentionをどう変えるかを見る。

```text
Optical Alignment
↓
Visual Weight
↓
Visual Hierarchy
```

A one-pixel MICRO problem can lead directly into MESO-level information hierarchy.

## Today’s claim

**“Center” is not one thing.**

「中央揃えしてください」は、実は少し曖昧な指示だった。

What exactly are we centering?

The box?
The area?
The contour?
The perception?

CSS was not lying.

**CSS centered the box perfectly.**

We were the ones assuming that box center and visual center were automatically the same.

## Sources

- [Microsoft Typography — Character design standards: Uppercase](https://learn.microsoft.com/en-gb/typography/develop/character-design-standards/uppercase)
- [Microsoft Typography — From typeface to font file](https://learn.microsoft.com/en-us/typography/truetype/from-typeface-to-font-file)
- [Apple Human Interface Guidelines — SF Symbols](https://developer.apple.com/design/human-interface-guidelines/sf-symbols)
- [Google Fonts — Material Symbols guide](https://developers.google.com/fonts/docs/material_symbols)
- [Proffitt, Thomas & O'Brien, 1983](https://pubmed.ncbi.nlm.nih.gov/6844093/)
- [Davi, Doyle & Proffitt, 1992](https://pubmed.ncbi.nlm.nih.gov/1508622/)
- [Baud-Bovy & Soechting, 2001](https://pubmed.ncbi.nlm.nih.gov/11424655/)
