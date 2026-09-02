---
id: design-literacy-touch-target-interaction-geometry
title: "Touch Target――『見えている大きさ』と『押せる大きさ』は別物"
subtitle: "English Mix｜Design Literacy #6｜From Visual Geometry to Interaction Geometry"
created: "2026-09-02"
updated: "2026-09-02"
type: "English Mix"
status: "完成"
mode: "english-mix"
english_ratio: 0.45
mix_unit: "sentence"
series: "Design Literacy｜細部から思想まで"
seriesOrder: 6
---

# Touch Target――「見えている大きさ」と「押せる大きさ」は別物
## Design Literacy #6｜From Visual Geometry to Interaction Geometry

**Design the area people interact with, not only the object they see.**

前回のAlignmentでは、画面上の要素がどんなaxisを共有し、how they appear related to one anotherを見た。

今回はそこから一歩進めて、**Touch Target / Tap Target**を見る。

UI is not only something people look at. It is also something they aim at with a finger or pointer. だから、見た目の大きさと、実際に操作できる大きさは同じでなくていい。

## 1. まず一言：Visual Size ≠ Interactive Size

たとえば、右上に小さな「×」がある。

```text
Visual

      ×
```

The icon can stay small while the interactive area becomes much larger.

```text
┌─────────┐
│         │
│    ×    │
│         │
└─────────┘
```

この外側の領域が、**Touch Target / Hit Area / Hit Region**として機能する。

You don't have to make the icon visually huge. Padding or a larger button box can preserve visual density while making the control easier to use.

## 2. Visual Lesson：small icon ≠ small target

<div class="dl-visual" role="group" aria-label="Touch TargetのBeforeとAfter比較">
<p class="dl-visual-kicker">VISUAL LESSON</p>
<p class="dl-visual-title"><strong>The icon can stay small while the target grows.</strong></p>
<div class="dl-compare">
<div class="dl-panel">
<p class="dl-panel-label">BEFORE — ICON SIZE ≒ TARGET SIZE</p>
<div class="dl-demo-card">
<p class="dl-event">メモタイトル</p>
<p class="dl-meta">編集と削除がsmall and crowded</p>
<div class="dl-actions"><span>✎ ×</span></div>
</div>
</div>
<div class="dl-panel dl-panel-after">
<p class="dl-panel-label">AFTER — VISUAL SIZE &lt; TARGET SIZE</p>
<div class="dl-demo-card">
<p class="dl-event">メモタイトル</p>
<p class="dl-meta">visualは小さいまま、interactive areaを確保</p>
<div class="dl-actions"><span class="dl-action dl-action-primary">✎</span><span class="dl-action">×</span></div>
</div>
</div>
</div>
<p class="dl-visual-note">The goal is not a bigger-looking icon. The goal is a larger, safer region to aim at. Spacing between adjacent targets matters too.</p>
</div>

ここで変えているのは、**visual appearanceよりinteraction geometry**や。

## 3. Don't mix standards：WCAG 2.2とApple HIG

Numbers are easy to remember and easy to misuse.

W3C's WCAG 2.2 added Success Criterion 2.5.8 **Target Size (Minimum)** at Level AA. In principle, a pointer target should be at least **24 × 24 CSS px**, or undersized targets need enough spacing around them. The criterion also defines exceptions such as inline targets and user-agent-controlled targets.

[W3C — WCAG 2.2 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html)

一方、AppleのHuman Interface Guidelinesでは、iOS / iPadOSについて**44 × 44 ptをdefault control size、28 × 28 ptをminimum control size**として示し、spacing between controls is also important.

[Apple — Accessibility](https://developer.apple.com/design/human-interface-guidelines/accessibility)

Apple's Buttons guidance also recommends a hit region of at least 44 × 44 pt as a general rule for buttons.

[Apple — Buttons](https://developer.apple.com/design/human-interface-guidelines/buttons)

大事なのは、**24 or 44 — which one is the one true answer?**と考えないこと。

WCAG is a web accessibility conformance standard. Apple HIG is platform-specific design guidance. They solve related problems in different contexts.

## 4. Target Sizeだけでは足りない

If you memorize only the number, the design thinking becomes shallow again.

見るべきは、

```text
Target Size
    +
Target Spacing
    +
Context
```

たとえば十分な大きさのbuttonでも、

```text
[ 保存 ][ 削除 ][ キャンセル ]
```

のようにdangerous actionsが密集していれば、mis-taps can still happen.

WCAG 2.2 itself allows some targets below 24 × 24 CSS px when enough spacing exists, among other exceptions.

だから数字そのものより、**how much physical precision are we demanding from the user?**を見る。

## 5. そのまま使える制作・修正指示

「ボタンを大きくしてください」だけだと、the visual size may grow unnecessarily and break the density of the interface.

制作指示なら、こう言える。

> **アイコン自体のvisual sizeは維持したまま、paddingやbutton boxを使ってinteractive targetを拡張してください。隣接するcontrolとのspacingも確認し、誤タップしにくいhit areaを確保してください。**

レビュー時なら、

> **見た目のサイズではなく、what is the actual hit area in pixels?**

これだけで、discussion moves from “make it bigger” to “design the interactive region.”

## 6. Accessibilityへ接続する：reduce unnecessary precision

Touch Target is not just a mobile UI trick.

W3C explicitly explains that small, closely packed targets can be difficult for some people with physical impairments to activate accurately.

Apple's mobility guidance also stresses sufficiently sized controls for people with limited dexterity or mobility.

ここから先は解釈になるが、Accessibilityを、

> **不要に高い操作精度を要求しない設計**

として見ることもできる。

A hand tremor is one case, but context matters too: one-handed use, walking, a moving train, cold weather. Precision changes with situation.

**Accessibility can improve ordinary use because ordinary use is not always ideal use.**

## 7. Common Misreading：「全部44pxにすれば終わり」ではない

44 is not a magic number that finishes the design.

確認することはまだある。

- 危険な操作と通常操作が隣り合っていないか
- Is there enough spacing between targets?
- visual boundaryとinteractive boundaryがずれていて混乱しないか
- Does responsive layout shrink the target?
- iconだけで操作意味が伝わるか

Touch Target connects not only to **Accessibility**, but also to **Affordance, Signifier, Responsive Design, and Error Prevention**.

## 8. これまでの学びとの接続

<div class="dl-chain" aria-label="Design Literacyの概念接続"><span>Grid / System</span><span>Alignment / Visual Geometry</span><span>Touch Target / Interaction Geometry</span><span>Accessibility / Precision</span></div>

前回は、

**Alignment = where the eye finds a shared axis**

を扱った。

今回は、

**Touch Target = how much area the finger or pointer can actually activate**

を見る。

ここで一段解像度を上げる。

**A UI contains both Visual Geometry and Interaction Geometry at the same time.**

見えているfigureと、actual clickable areaは一致しなくていい。

だからUI reviewでは、**how it looks**と**where it responds**を分けて確認する必要がある。

## 9. 30-second observation

普段使っているスマホアプリを一つ開く。

右上の、

`×` / `…` / `♡` / `share` / `back`

のようなsmall controlを見る。

Then imagine one thing:

> **What if only the visible symbol itself were clickable?**

急に使いづらそうに見えるはず。

次に自分のWeb UIでDevToolsを開き、buttonやlinkのboxを確認する。

Is the hit area larger than the visible icon? Is it too close to the next target?

それだけでいい。

## 10. Next Concept：Affordance / Signifier

The next question appears naturally.

**Does a large clickable region automatically look clickable?**

No.

```text
Can be pressed
≠
Looks pressable
```

ここから、**Affordance / Signifier**へ進める。

さらに、

```text
Touch Target
↓
Affordance / Signifier
↓
Skeuomorphism
↓
Flat Design
```

とつなぐと、「why did buttons used to look three-dimensional?」「why can overly flat UI make actions hard to discover?」というUI史にも入っていける。

今日の中心命題はこれ。

**Design the area people interact with, not only the object they see.**

次からは「アイコン小さいな」で終わらず、**visual sizeはこれでいい。でもhit areaは？**まで見る。

## Sources

- [W3C — WCAG 2.2 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html)
- [W3C — What's New in WCAG 2.2](https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/)
- [Apple — Accessibility](https://developer.apple.com/design/human-interface-guidelines/accessibility)
- [Apple — Buttons](https://developer.apple.com/design/human-interface-guidelines/buttons)
