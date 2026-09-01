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

UIで「このボタン、弱いな」と感じたとき、we often try to make the button itself stronger. もっと大きくする。Make it bolder. 色を派手にする。

でも、**the problem may be the relationship, not the button itself.**

今回のテーマは **Figure–Ground（図と地）**。Gestalt psychology describes how we separate a visual scene into the **figure — what we focus on — and the ground — what recedes around it**.

[Interaction Design Foundation — Law of Figure-Ground](https://assets.interaction-design.org/literature/topics/law-of-figure)

[Nielsen Norman Group — 5 Principles of Visual Design in UX](https://www.nngroup.com/articles/principles-visual-design/)

## 1. First, look：何が前に出ている？

<div class="dl-visual" role="group" aria-label="FigureとGroundの知覚を試す抽象図">
<p class="dl-visual-kicker">VISUAL EXPERIMENT 01</p>
<p class="dl-visual-title"><strong>Do you see two light shapes, or one dark shape in the middle?</strong></p>
<div class="dl-figure-ground" role="img" aria-label="左右の明るい輪郭と中央の暗い空間のどちらも形として知覚できる抽象図"></div>
<p class="dl-visual-note">The pixels do not change. What changes is which region your perception treats as the figure.</p>
</div>

### What just happened?

**目立つかどうかは、その要素単体では決まらない。Visibility is relational.**

People do not process every region of a screen with equal emphasis. あるものを対象として取り出し、残りをbackgroundとして扱う。

**Don't always amplify the signal. Reduce the noise.**

## 2. Visual Lesson：CTAを大きくせずに前景へ出す

<div class="dl-visual" role="group" aria-label="CTAのFigure-Ground関係をBeforeとAfterで比較">
<p class="dl-visual-kicker">VISUAL LESSON 02</p>
<p class="dl-visual-title"><strong>Same information. Different perceptual priority.</strong></p>
<div class="dl-compare">
<div class="dl-panel">
<p class="dl-panel-label">BEFORE — EVERYTHING COMPETES</p>
<div class="dl-demo-card"><p class="dl-event">浦和 vs ○○</p><p class="dl-meta">9.19 · 19:00</p><div class="dl-actions"><span class="dl-action">チケットを購入</span><span class="dl-action">詳細を見る</span><span class="dl-action">注意事項</span></div></div>
</div>
<div class="dl-panel dl-panel-after">
<p class="dl-panel-label">AFTER — ONE CLEAR FIGURE</p>
<div class="dl-demo-card"><p class="dl-event">浦和 vs ○○</p><p class="dl-meta">9.19 · 19:00</p><div class="dl-actions"><span class="dl-action dl-action-primary">チケットを購入</span><span class="dl-action dl-action-secondary">詳細を見る · 注意事項</span></div></div>
</div>
</div>
<p class="dl-visual-note">The CTA did not become enormous. Supporting elements became quieter, so the relationship changed.</p>
</div>

Figure–Groundは「何を派手にするか」より、**what becomes the perceptual subject**と考えると使いやすい。

## 3. What creates Figure–Ground?

Figure–Ground is not only about color.

- **Contrast** — 明暗、色、太さの差
- **Scale** — size difference
- **Position** — 配置と周囲との距離
- **Whitespace** — space around an element
- **Shape** — 形状や境界の違い
- **Visual Weight** — combined perceptual strength

Instead of translating “make it stand out” directly into `font-size`, ask:

```text
What should become the figure?
      ↓
What is competing with it?
      ↓
What is the smallest change that creates separation?
```

## 4. そのまま使える制作・修正指示

> CTAそのものを大きくする前に、周囲とのFigure–Ground関係を整理してください。補助リンクや装飾のvisual weightを下げ、CTAだけが明確なfigureとして認識できる状態を作ってください。

Short version:

> **強調を足す前に、背景側を一段静かにできないか確認してください。**

This works for websites, slides, posters and social graphics too.

## 5. Why “make everything important” fails

The date matters. The title matters. Sponsors matter. The CTA matters. 注意事項も重要。

そこで全部を太字、色付き、枠付きにすると、**importance inflation**が起きる。

Emphasis is relative, not absolute. 赤が一つなら目立つ。If ten things are red, red can become the ground.

Strong hierarchy therefore requires a decision about **what should become quieter**.

## 6. Back to Gestalt：デザインは知覚関係を扱う

Figure–Ground was not invented as a UI trick. 20世紀初頭に展開したGestalt psychologyでは、人間が視覚要素を孤立した断片だけでなく、relationships and organized wholesとして知覚する仕組みが研究された。

Figure–GroundのほかにもProximity、Similarity、Closureなどが現在のdesign educationやUXで参照される。

**Design is not only about objects. It is about perception.**

ボタンと背景、a heading and body text、カードとページ。デザインするのは物体だけではなく、**how those things appear in relation to one another**でもある。

## 7. Common Misreading：Figure = 派手、Ground = 地味ではない

Figure does not simply mean “bright and loud.”

広い白背景に小さな黒文字が一つだけあれば、小さくてもfigureになりうる。逆に、red background, yellow text, huge photo, bold type, shadows and badgesを全部入れてもclear focusが生まれるとは限らない。

What matters is **perceptual separation**.

## 8. Connect the previous lessons

<div class="dl-chain" aria-label="Design Literacyの概念接続"><span>Spacing</span><span>Proximity / Grouping</span><span>Visual Hierarchy / Order</span><span>Figure–Ground / Focus</span></div>

Proximity asks **what belongs together**. Visual Hierarchy asks **what should I see first**. Figure–Ground asks **what becomes the thing I focus on**.

これで「なんかCTAが弱い」を、

> The surrounding elements carry too much visual weight, so the CTA is not clearly separated from the ground.

まで言語化できる。

## 9. 30-second design observation

スマホで好きなアプリかWebサイトを一つ開く。Don't read the words first.

**What dissolves into the background?**

**What jumps forward as the figure?**

Then ask:

> **Is the most visible thing actually the most important thing on this screen?**

そのズレを見つけられれば、今日の観察は成功。

## 10. Next Concept：Swiss Style

Next, we move from perception to history.

ここまでは、人間が情報をどう知覚するかという側から「秩序」を考えてきた。次は20世紀のgraphic designersが、**how they built visual systems for organizing information**を見ていく。

Keywords: **Grid / asymmetric layout / sans-serif typography / objective communication**.

次は **Swiss Style / International Typographic Style**。「グリッドはきれいに並べるための線」から、「なぜ近代デザインは秩序を求めたのか」まで進む。

## Sources

- [Interaction Design Foundation — Law of Figure-Ground](https://assets.interaction-design.org/literature/topics/law-of-figure)
- [Nielsen Norman Group — 5 Principles of Visual Design in UX](https://www.nngroup.com/articles/principles-visual-design/)
- [Nielsen Norman Group — Visual Design Glossary](https://www.nngroup.com/articles/visual-design-cheat-sheet/)
