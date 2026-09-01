---
id: design-literacy-alignment-invisible-relationships
title: "Alignmentは『揃える』ではなく、見えない関係線をつくる"
subtitle: "English Mix｜Design Literacy #5｜Alignment creates invisible relationships"
created: "2026-09-02"
updated: "2026-09-02"
type: "English Mix"
status: "完成"
mode: "english-mix"
english_ratio: 0.45
mix_unit: "sentence"
series: "Design Literacy｜細部から思想まで"
seriesOrder: 5
---

# Alignmentは「揃える」ではなく、見えない関係線をつくる
## Design Literacy #5｜Alignment creates invisible relationships

**Alignment creates invisible relationships.**

Gridを「きれいに並べる線」ではなく、a system for deciding position と見ると、次に気になるのが **Alignment（整列）**。

Alignment is not merely making x-coordinates identical. 離れている要素にも共通するedge・center・baselineを与え、**同じ構造に所属しているように見せる**操作として考えると使いやすい。

Apple's Human Interface Guidelines also recommend keeping content and controls in consistent, predictable positions so people can preserve context.[Apple — Design principles](https://developer.apple.com/design/human-interface-guidelines/design-principles)

## 1. First idea：線を描かなくても、線は見える

```text
MATCH DAY
浦和 vs ○○
9.19 SAT

チケットを購入
```

When the left edges are shared, the eye can perceive an invisible axis.

```text
│ MATCH DAY
│ 浦和 vs ○○
│ 9.19 SAT
│
│ チケットを購入
```

**If two things align, the eye assumes a relationship.**

つまりAlignmentは、neatnessよりrelationshipの話や。

## 2. Visual Lesson：共有するaxisが構造をつくる

<div class="dl-visual" role="group" aria-label="AlignmentのBeforeとAfter比較">
<p class="dl-visual-kicker">VISUAL LESSON</p>
<p class="dl-visual-title"><strong>Same information, different structural clarity.</strong></p>
<div class="dl-compare">
<div class="dl-panel">
<p class="dl-panel-label">BEFORE — MANY STARTING POINTS</p>
<div class="dl-demo-card"><p>MATCH DAY</p><p>　浦和 vs ○○</p><p>　　　9.19 SAT</p><p>　埼玉スタジアム</p><div class="dl-actions"><span class="dl-action">TICKET</span></div></div>
</div>
<div class="dl-panel dl-panel-after">
<p class="dl-panel-label">AFTER — ONE SHARED AXIS</p>
<div class="dl-demo-card"><p class="dl-event">MATCH DAY</p><p>浦和 vs ○○</p><p class="dl-meta">9.19 SAT</p><p class="dl-meta">埼玉スタジアム</p><div class="dl-actions"><span class="dl-action dl-action-primary">TICKET</span></div></div>
</div>
</div>
<p class="dl-visual-note">Font sizeや情報量ではなく、starting pointを共有することでrelationshipが見えやすくなる。</p>
</div>

## 3. Grid and Alignment are not the same

**Grid = a system for deciding position.**  
**Alignment = a relationship shared by elements.**

Gridなしでも二つの要素は揃えられる。And a grid can exist while actual elements ignore it.

だからレビューでは、

> **この2要素は、何を基準に揃えていますか？**

と聞く方が、the rule behind the positionに近づける。

## 4. Before → After：全部を中央揃えにしない

Center alignment is not inherently bad. Hero copyや独立した短いmessageでは有効なこともある。

But for date, venue, notes and other multi-line information, changing the starting point on every line can make the eye search again.

```text
      EVENT
   SPECIAL MATCH
 9.19 SAT 19:00
 埼玉スタジアム
```

より、

```text
EVENT
SPECIAL MATCH
9.19 SAT 19:00
埼玉スタジアム
```

の方が、a shared edge can make the group quieter and easier to scan.

**Good alignment reduces visual searching.**

## 5. そのまま使える制作・修正指示

> **タイトル・本文・日時・CTAの端点を確認し、意味上同じグループに属する要素には共通するalignment axisを設定してください。装飾目的の例外を除き、根拠のない数px単位のズレをなくしてください。**

Short review question:

> **「この2要素は、何を基準に揃えていますか？」**

It asks for the rule, not just the coordinate.

## 6. Swiss Styleからmodern UIへ

ここを **Swiss Style = left alignment** と覚えるのは単純化しすぎる。

The more useful connection is the idea of giving multiple elements a shared structure instead of positioning each one independently by feel.

Apple's current design principles similarly emphasize consistent, predictable positions for content and controls.

ここからはinterpretationやけど、**Alignment can be seen as the point where an abstract grid becomes a perceptible relationship.**

## 7. Common Misreading：座標が同じなら終わり？

Not always.

Different shapes have different visual edges. 丸と四角、AとOでは、bounding boxが同じでも少しずれて見えることがある。

This leads to the practical idea of **Optical Alignment**.

**mathematical alignment ≠ perceptual alignment**

の場合がある。

Figmaの数値だけで終わらず、最後はhuman perceptionで関係を確認する。

## 8. Connect the previous lessons

<div class="dl-chain" aria-label="Design Literacyの概念接続"><span>Proximity / Grouping</span><span>Visual Hierarchy / Order</span><span>Figure–Ground / Focus</span><span>Grid / System</span><span>Alignment / Relationship</span></div>

Before, we could say: **Grid makes things align.**

今日はもう一段進めて、

**Repeated alignment lets people feel the grid even when they never see the grid itself.**

**The structure is invisible. The effect is visible.**

## 9. 30-second observation

Web、PowerPoint、SNS graphicを一枚開く。

Don't read the text. Instead, extend imaginary vertical lines from the left edges of elements.

How many axes do you need?

微妙に違う線が大量に出るなら、

> **alignment axisが増えすぎている**

と診断してみる。

## 10. Next Concept：Touch Target

Next we move from visual geometry to **interaction geometry**.

A visible icon can be small while its actual hit region is larger. AppleのAccessibility guidanceでは、iOS / iPadOSのdefault control sizeを44×44ptとし、spacing between controlsも誤操作を減らすうえで重要としている。[Apple — Accessibility](https://developer.apple.com/design/human-interface-guidelines/accessibility)

つまり次は、

**Visual Geometry → Interaction Geometry**

へ。

今日の中心命題：

**Alignment is not about making things neat. It creates invisible relationships.**

## Sources

- [Apple Human Interface Guidelines — Design principles](https://developer.apple.com/design/human-interface-guidelines/design-principles)
- [Apple Human Interface Guidelines — Accessibility](https://developer.apple.com/design/human-interface-guidelines/accessibility)
- [Apple Human Interface Guidelines — Buttons](https://developer.apple.com/design/human-interface-guidelines/buttons)
