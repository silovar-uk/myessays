---
id: design-literacy-figure-ground-focus
title: "目立たせる前に、背景から分離する――Figure–Groundで焦点をつくる"
subtitle: "English Mix｜Design Literacy #3｜Design what becomes the figure before making it louder"
created: "2026-09-01"
updated: "2026-09-01"
type: "English Mix"
status: "完成"
mode: "english-mix"
english_ratio: 0.45
mix_unit: "sentence"
series: "Design Literacy｜細部から思想まで"
seriesOrder: 3
---

# 目立たせる前に、背景から分離する――Figure–Groundで焦点をつくる
## Design Literacy #3｜Design what becomes the figure before making it louder

**Good design makes it obvious what to look at — and what to ignore.**

UIで「このボタン、弱いな」と感じたとき、we often try to make the button itself stronger.

もっと大きくする。Make it bolder. 色を派手にする。

でも、the problem may not be the button itself.

**It may be too similar to its background.**

今回のテーマは **Figure–Ground（図と地）**。

Gestalt psychology uses this idea to describe how we separate a visual scene into the **figure — the thing we focus on — and the ground — the surrounding background**.

UXでも、foregroundとbackgroundを明確に分けることで、重要な要素へ注意を導く考え方として使われる。

[Interaction Design Foundation — Law of Figure-Ground](https://assets.interaction-design.org/literature/topics/law-of-figure)

[Nielsen Norman Group — 5 Principles of Visual Design in UX](https://www.nngroup.com/articles/principles-visual-design/)

## 1. Visibility is relational

**目立つかどうかは、その要素単体では決まらない。**

Visibility is relational.

周囲との関係で決まる。

For example, increasing a button from 16px to 18px may not help much if headings, links, badges, decorations and background colors are all visually loud.

逆に、ボタン自体をほとんど変えなくても、周囲のvisual weightを一段下げれば、figureとして立ち上がることがある。

```text
BUTTON ≒ BACKGROUND
        ↓
   weak separation

BUTTON ≠ BACKGROUND
        ↓
   easier to perceive as figure
```

**Don't always amplify the signal. Reduce the noise.**

## 2. Visual Lesson：全部を前景にすると、前景が消える

### BEFORE

```text
┌──────────────────────┐
│  MATCH DAY           │
│                      │
│  浦和 vs ○○          │
│                      │
│  9.19 19:00          │
│                      │
│  詳細を見る          │
│  チケットを購入      │
│  注意事項はこちら    │
└──────────────────────┘
```

If everything has similar weight, color and emphasis, **the interface has information but no clear figure**.

### AFTER

```text
┌──────────────────────┐
│  MATCH DAY           │
│                      │
│  浦和 vs ○○          │
│  9.19 19:00          │
│                      │
│  █ チケットを購入 █  │
│                      │
│  詳細を見る          │
│  注意事項            │
└──────────────────────┘
```

CTAだけを前へ出し、supporting links move toward the ground.

ここで大事なのは、the CTA did not need to become enormous.

**We changed the relationship.**

Figure–Groundは「何を派手にするか」より、**何を知覚上の主役にするか**と考えると使いやすい。

## 3. What creates Figure–Ground?

Figure–Ground is not only about color.

分離を作るレバーはいくつもある。

- **Contrast** — 明暗、色、太さの差
- **Scale** — size difference
- **Position** — 配置と周囲との距離
- **Whitespace** — space around the element
- **Shape** — 形状や境界の違い
- **Visual Weight** — the combined perceptual strength of an element

NN/gもvisual designの原則としてscale、visual hierarchy、contrast、Gestaltなどを整理している。

だから、「CTAを目立たせる」を一つのCSS propertyに変換しない方がいい。

Instead of:

```text
Make it stand out
      ↓
Increase font-size
```

think:

```text
What should become the figure?
      ↓
What is competing with it?
      ↓
What is the smallest change that creates separation?
```

## 4. そのまま使える制作・修正指示

「ボタンをもっと目立たせてください」だけでは、the designer has to guess whether you mean size, color, shadow or motion.

一段具体化するとこうなる。

> CTAそのものを大きくする前に、周囲とのFigure–Ground関係を整理してください。補助リンクや装飾のvisual weightを下げ、CTAだけが明確なfigureとして認識できる状態を作ってください。

A shorter version:

> **強調を足す前に、背景側を一段静かにできないか確認してください。**

This works for websites, slides, posters and social graphics as well.

## 5. Why “make everything important” fails

実務では、ほぼ全部が「重要」と言われる。

The date matters. The title matters. Sponsors matter. The CTA matters. The legal note matters too.

そこで全部を太字、色付き、枠付きにすると、**importance inflation**が起きる。

Emphasis is relative, not absolute.

赤が一つなら目立つ。

If ten things are red, red can become the ground.

だから、strong visual hierarchy requires a decision about **what should become quieter**.

## 6. Back to Gestalt：デザインは物体ではなく知覚関係を扱う

Figure–Ground was not invented as a UI trick.

Gestalt psychology, developed in the early 20th century, examined how people perceive visual elements as relationships and organized wholes rather than only as isolated fragments.

Figure–Groundのほかにも、Proximity、Similarity、Closureなどが現在のデザイン教育やUXで頻繁に参照される。

**Design is not only about objects. It is about perception.**

ボタンと背景。

A heading and body text.

カードとページ。

デザインするのは物体だけではなく、**how those things appear in relation to one another**でもある。

## 7. Common Misreading：Figure = 派手、Ground = 地味ではない

Figure does not simply mean “bright and loud.”

広い白背景に小さな黒文字が一つだけあれば、小さくても十分にfigureになりうる。

On the other hand, a red background, yellow text, huge photo, bold type, shadows, badges and animation can produce lots of contrast while still giving the viewer no clear focus.

Figure–Groundで重要なのは派手さではなく、**perceptual separation**。

## 8. Connect the previous lessons

Design Literacyでは、ここまでこう進んできた。

```text
Proximity
What belongs together?
      ↓
Visual Hierarchy
What should I see first?
      ↓
Figure–Ground
What becomes the thing I focus on?
```

Proximity creates **Grouping**.

Visual Hierarchy creates **Order**.

Figure–Ground creates **Focus**.

つまり、

```text
Spacing
  ↓
Grouping
  ↓
Order
  ↓
Focus
```

ここまでつながると、「なんかCTAが弱い」を、

> The surrounding elements carry too much visual weight, so the CTA is not clearly separated from the ground.

まで言語化できる。

## 9. 30-second design observation

スマホで好きなアプリかWebサイトを一つ開く。

Don't read the words first.

次の二つだけを見る。

**What dissolves into the background?**

**What jumps forward as the figure?**

Then ask one question:

> **Is the most visible thing actually the most important thing on this screen?**

広告が一番figureになっているかもしれない。

A notification badge may dominate the real CTA.

そのズレを見つけられれば、今日の観察は成功。

## 10. Next Concept：Swiss Style

Next, we move from perception to history.

ここまでは、人間が情報をどう知覚するかという側から「秩序」を考えてきた。

次は、20世紀のグラフィックデザイナーたちが、**how they built visual systems for organizing information**を見ていく。

Keywords:

**Grid / asymmetric layout / sans-serif typography / objective communication**

次は **Swiss Style / International Typographic Style**。

「グリッドはきれいに並べるための線」から、「なぜ近代デザインは秩序を求めたのか」まで進む。

## Sources

- [Interaction Design Foundation — Law of Figure-Ground](https://assets.interaction-design.org/literature/topics/law-of-figure)
- [Nielsen Norman Group — 5 Principles of Visual Design in UX](https://www.nngroup.com/articles/principles-visual-design/)
- [Nielsen Norman Group — Visual Design Glossary](https://www.nngroup.com/articles/visual-design-cheat-sheet/)
