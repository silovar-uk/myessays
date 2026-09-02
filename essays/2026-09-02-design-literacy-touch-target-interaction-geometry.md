---
id: design-literacy-touch-target-interaction-geometry
title: "Touch Target――『見えている大きさ』と『押せる大きさ』は別物"
subtitle: "Design Literacy #6｜Visual GeometryからInteraction Geometryへ"
created: "2026-09-02"
updated: "2026-09-02"
type: "Essay"
status: "完成"
tags: ["Design Literacy", "デザイン", "Touch Target", "Accessibility", "Interaction", "UI", "UX"]
keywords: ["touch target", "tap target", "hit area", "hit region", "target size", "WCAG 2.2", "accessibility", "interaction geometry"]
favorite: 5
grow: 5
series: "Design Literacy｜細部から思想まで"
seriesOrder: 6
abstract: "Touch Targetを、単なる『ボタンを大きくする』テクニックではなく、見えているVisual Geometryと実際に操作できるInteraction Geometryを分けて設計する考え方として整理する。WCAG 2.2とApple HIGの基準を目的の違いごとに分け、target size・spacing・contextを制作指示へ落とし込む。"
---

# Touch Target――「見えている大きさ」と「押せる大きさ」は別物
## Design Literacy #6｜Visual GeometryからInteraction Geometryへ

**Design the area people interact with, not only the object they see.**

前回のAlignmentでは、画面上の要素がどんなaxisを共有し、どう関係して見えるかを扱った。

今回はそこから一歩進めて、**Touch Target / Tap Target**を見る。

UIは「見るもの」であると同時に、「指やポインタで狙うもの」でもある。だから、見た目の大きさと、実際に操作できる大きさは同じでなくていい。

## 1. まず一言：Visual Size ≠ Interactive Size

たとえば、右上に小さな「×」がある。

```text
見た目

      ×
```

アイコン自体は小さくても、実際に押せる領域はもっと広くできる。

```text
┌─────────┐
│         │
│    ×    │
│         │
└─────────┘
```

この外側の領域が、**Touch Target / Hit Area / Hit Region**として機能する。

小さいアイコンを無理に巨大化しなくても、paddingやbutton boxを使えば、見た目の密度を保ちながら操作性を上げられる。

## 2. Visual Lesson：小さいアイコンと、小さいtargetは別問題

<div class="dl-visual" role="group" aria-label="Touch TargetのBeforeとAfter比較">
<p class="dl-visual-kicker">VISUAL LESSON</p>
<p class="dl-visual-title"><strong>アイコンのvisual sizeを変えなくても、interactive areaは広げられる。</strong></p>
<div class="dl-compare">
<div class="dl-panel">
<p class="dl-panel-label">BEFORE — ICON SIZE ≒ TARGET SIZE</p>
<div class="dl-demo-card">
<p class="dl-event">メモタイトル</p>
<p class="dl-meta">編集と削除が小さく隣接</p>
<div class="dl-actions"><span>✎ ×</span></div>
</div>
</div>
<div class="dl-panel dl-panel-after">
<p class="dl-panel-label">AFTER — VISUAL SIZE &lt; TARGET SIZE</p>
<div class="dl-demo-card">
<p class="dl-event">メモタイトル</p>
<p class="dl-meta">見た目は小さいまま、操作領域を確保</p>
<div class="dl-actions"><span class="dl-action dl-action-primary">✎</span><span class="dl-action">×</span></div>
</div>
</div>
</div>
<p class="dl-visual-note">重要なのはアイコンを大きく見せることではなく、指やポインタが狙える領域を確保すること。隣接targetとのspacingも同時に見る。</p>
</div>

ここで変えているのは、**見た目よりも操作のgeometry**や。

## 3. 基準を混ぜない：WCAG 2.2とApple HIG

数字は覚えやすいぶん、文脈を落としやすい。

W3CのWCAG 2.2では、Success Criterion 2.5.8 **Target Size (Minimum)** がLevel AAとして追加されている。原則としてpointer inputのtargetを**24 × 24 CSS px以上**にするか、24px未満のtargetなら周囲に十分なspacingを確保する。inline linkやuser agentが決めるcontrolなど、複数の例外も定義されている。

[W3C — WCAG 2.2 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html)

一方、AppleのHuman Interface Guidelinesでは、iOS / iPadOSについて**44 × 44 ptをdefault control size、28 × 28 ptをminimum control size**として示し、control同士のspacingもsizeと同じくらい重要だとしている。

[Apple — Accessibility](https://developer.apple.com/design/human-interface-guidelines/accessibility)

またAppleのButtons guidanceでは、一般則としてbuttonのhit regionを少なくとも44 × 44 pt確保することを勧めている。

[Apple — Buttons](https://developer.apple.com/design/human-interface-guidelines/buttons)

ここで大事なのは、**24か44か、どちらが唯一の正解か**ではない。

WCAGはWebアクセシビリティの適合基準。Apple HIGはApple platformの設計指針。目的と適用文脈が違う。

## 4. Target Sizeだけでは足りない

Touch Targetを数字だけで覚えると、また一段浅くなる。

重要なのは、

```text
Target Size
    +
Target Spacing
    +
Context
```

や。

たとえば十分な大きさのbuttonでも、

```text
[ 保存 ][ 削除 ][ キャンセル ]
```

のように危険な操作が密集していれば、誤操作リスクは残る。

逆にWCAG 2.2では、24 × 24 CSS px未満でも、undersized target同士に必要なspacingがある場合などを例外として扱っている。

だから見るべきなのは、数字そのものより、**ユーザーへどれだけ精密な身体操作を要求しているか**や。

## 5. そのまま使える制作・修正指示

「ボタンを大きくしてください」だけだと、visual sizeまで大きくなって、画面密度が崩れることがある。

制作指示なら、こう言える。

> **アイコン自体のvisual sizeは維持したまま、paddingやbutton boxを使ってinteractive targetを拡張してください。隣接するcontrolとのspacingも確認し、誤タップしにくいhit areaを確保してください。**

レビュー時には、もっと短くてもいい。

> **見た目のサイズではなく、実際のhit areaは何pxありますか？**

これだけで「大きくする」から「操作領域を設計する」へ議論を変えられる。

## 6. Accessibilityへ接続する：精密さを要求しすぎない

Touch Targetは、スマホUIの細かなTipsではない。

W3Cは、小さく近接したtargetが一部の身体障害のある利用者にとってクリックしづらいことを、この基準の理由として明示している。

Appleもmobilityのguidanceで、limited dexterityやmobilityのある人にとって十分なcontrol sizeが重要だとしている。

ここから先は解釈になるが、Accessibilityを、

> **できるだけ特殊な操作精度を要求しない設計**

として見ることもできる。

手の震えだけではない。片手操作、歩行中、揺れる電車、寒い屋外など、操作精度は状況によっても変化する。

**Accessibility can improve ordinary use because ordinary use is not always ideal use.**

## 7. 誤解しやすい点：「全部44pxにすれば終わり」ではない

44という数字を適用しただけでは、設計判断は終わらない。

- 危険な操作と通常操作が隣り合っていないか
- target間のspacingは十分か
- visual boundaryとinteractive boundaryがずれていて混乱しないか
- responsive layoutでtargetが縮んでいないか
- iconだけで操作意味が伝わるか

まで見る必要がある。

Touch Targetは**Accessibility**だけでなく、**Affordance / Signifier / Responsive Design / Error Prevention**にもつながる。

## 8. これまでの学びとの接続

<div class="dl-chain" aria-label="Design Literacyの概念接続"><span>Grid / System</span><span>Alignment / Visual Geometry</span><span>Touch Target / Interaction Geometry</span><span>Accessibility / Precision</span></div>

前回は、

**Alignment = 目がどこを基準に見るか**

を扱った。

今回は、

**Touch Target = 指やポインタがどこまでを操作対象にできるか**

を見る。

ここで解像度を一段上げる。

**UIにはVisual GeometryとInteraction Geometryが重なって存在している。**

画面上で見えているfigureと、実際のclickable areaは一致しなくていい。

だからUIレビューでは、「どう見えるか」と「どこまで反応するか」を別々に確認する必要がある。

## 9. 30秒でできる観察

スマホで普段使っているアプリを一つ開く。

右上の、

`×` / `…` / `♡` / `共有` / `戻る`

のような小さなcontrolを見る。

そして一つ想像する。

> **この記号そのものしか押せなかったら、使いやすいか？**

次に自分のWeb UIでDevToolsを開き、buttonやlinkのboxを確認する。

見えているiconよりhit areaが広いか。隣のtargetと近すぎないか。

それだけでいい。

## 10. Next Concept：Affordance / Signifier

次の問いは自然に出てくる。

**「押せる領域が広い」ことと、「押せると分かる」ことは同じなのか？**

答えは同じではない。

```text
押せる
≠
押せるように見える
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

とつなげると、「なぜ昔のbuttonは立体的だったのか」「なぜflatになりすぎると押せる場所が分からなくなるのか」というUI史にも入っていける。

今日の中心命題はこれ。

**Design the area people interact with, not only the object they see.**

「アイコン小さいな」で終わらず、次からは、**visual sizeはこれでいい。でもhit areaは？**まで見る。

## 参考資料

- [W3C — WCAG 2.2 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html)
- [W3C — What's New in WCAG 2.2](https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/)
- [Apple — Accessibility](https://developer.apple.com/design/human-interface-guidelines/accessibility)
- [Apple — Buttons](https://developer.apple.com/design/human-interface-guidelines/buttons)
