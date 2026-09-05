---
id: design-literacy-ulm-method-system-critique
title: "Ulm School――デザインを『完成品』ではなく『判断の仕組み』として見る"
subtitle: "Design Literacy #16｜方法化と、その限界をめぐる学校"
created: "2026-09-05"
updated: "2026-09-05"
type: "Essay"
status: "完成"
tags: ["Design Literacy", "デザイン", "Ulm School", "HfG Ulm", "Design Methodology", "Systems Thinking", "Visual Identity", "Design System", "Otl Aicher", "Tomás Maldonado"]
keywords: ["Ulm School", "HfG Ulm", "Ulm model", "design methodology", "systems thinking", "scientification of design", "Otl Aicher", "Tomas Maldonado", "Lufthansa identity", "visual identity", "design system", "reusable rules"]
favorite: 5
grow: 5
series: "Design Literacy｜細部から思想まで"
seriesOrder: 16
abstract: "HfG Ulm（ウルム造形大学）を、単純な『合理主義の学校』としてではなく、デザインを個別造形から再現可能な方法・関係・判断へ広げつつ、その方法化そのものも内部で批判的に問い直した教育実験として捉える。五つの専門領域、理論と実技の統合、1960年代の科学化をめぐる論争、Otl Aicher率いるE5によるLufthansaの体系的ビジュアル・アイデンティティを手掛かりに、現代のDesign Systemへ接続する。"
---

# Ulm School――デザインを「完成品」ではなく「判断の仕組み」として見る
## Design Literacy #16｜方法化と、その限界をめぐる学校

**Design can be more than the shape of an answer. It can be a method for making decisions.**

これまでGridでは空間のルール、Similarityでは視覚的な分類、Fitts’s Lawでは操作までの移動を見てきた。

今回はさらに引いて、**そもそもデザインを「個別の形をつくる行為」から「判断の方法を組み立てる行為」へ広げると何が起きるのか**を見る。

中心に置くのは、1953年から1968年までドイツで活動したHochschule für Gestaltung Ulm、通称**HfG Ulm / Ulm School of Design**だ。

## 1. まず一言：デザインは「答え」だけでなく「決め方」も設計できる

ボタンを一つ作るとする。

```text
Button
↓
color
radius
font
padding
```

これは個別の造形判断だ。

でも画面が増えると、問いが変わる。

```text
Primary
Secondary
Danger
Disabled
Loading
↓
何を共通にする？
何を変える？
どの状態を持つ？
誰が同じルールを使う？
```

ここではもう「このボタンをどう見せるか」だけでは足りない。

**How should future decisions be made?**

次の画面、次の担当者、次の媒体でも判断を再現できるよう、ルールそのものを設計する必要が出てくる。

Ulmを学ぶ価値は、この視点を歴史の中で見られることにある。

## 2. 仕組み：実技だけでなく、理論をデザイン教育へ組み込む

HfG Archivによれば、Ulmでは次の五つの専門領域でデザイナーを育成していた。

- Product Design / 製品造形
- Visual Communication / 視覚コミュニケーション
- Building / 建築
- Information / 情報
- Film / 映画

四年間の教育では、実際の設計を行う各部門の授業と、設計に必要な理論科目が組み合わされていた。

[HfG-Archiv Ulm — Die HfG](https://hfg-archiv.museumulm.de/geschichte-hfg/)

ここで重要なのは、デザインを「手を動かして形をつくる訓練」だけに閉じなかったことだ。

```text
making
+
analysis
+
theory
+
technology
+
social context
```

を横断しながら、**designerという職能そのものをどう教育するか**が実験された。

つまりUlmは、一つの見た目を作った学校というより、**デザイン判断をどう学び、どう説明し、どう再現するかを問い続けた学校**として見る方が理解しやすい。

## 3. Before → After：画面ごとの判断から、再利用できる判断へ

### BEFORE

画面ごとに、その場で決める。

```text
Screen A
[購入する] 赤 / 48px / radius 8

Screen B
[送信する] 青 / 44px / radius 4

Screen C
[予約する] 黒 / 52px / radius 12
```

全部Primary Actionなのに、判断が独立している。

### AFTER

先に「Primary Actionとは何か」を定義する。

```text
Primary Action
↓
color role
height range
typography
spacing
states
interaction feedback
accessibility condition
```

そのうえで、各画面へ展開する。

```text
Rule
↓
[購入する]
[送信する]
[予約する]
```

ここで変わったのは、単に見た目が統一されたことではない。

**one-off decisions became reusable decisions.**

個別判断が、再利用可能な判断になった。

## 4. そのまま使える制作・修正指示

「この画面だけ整えてください」から一段上げるなら、こう言える。

> **個別画面の見た目を直接そろえる前に、同じ役割を持つ要素に共通する判断ルールを定義してください。色・余白・タイポグラフィ・状態・操作・アクセシビリティ条件を分け、別画面や別担当者でも再利用できる形にしてください。**

レビューではこの問いが使える。

> **「これは今回だけの判断ですか。それとも、次の画面でも再利用できるルールですか？」**

ただし、何でもルール化すればいいわけではない。

その話がUlmの歴史そのものにつながる。

## 5. 歴史との接続：Ulmは「科学化」を進め、同時にそれを批判した

Ulmはしばしば、合理的・科学的なdesign methodologyを代表する学校として語られる。

それは間違いではないが、**それだけで覚えると学校内部の重要な論争が消える。**

HfG Archivは、1960年代に教育の「scientification（科学化）」が進み、Horst Rittel、Hanno Kesting、Bruce Archerらのもとで、数学的操作を意識した厳密な方法論や、ergonomics、企業分析などの分析的研究が強まったと説明している。

一方で、この方向は校内に大きな対立も生んだ。Otl Aicher、Hans Gugelot、Walter Zeischegg、Tomás Maldonadoらは、**designは単なるanalytical method以上のものでなければならない**として、この過度な科学化へ異議を唱えたと記録されている。

[HfG-Archiv Ulm — Geschichte](https://hfg-archiv.museumulm.de/geschichte-hfg/geschichte/)

ここがかなり重要だ。

```text
Ulm
≠ 科学で感性を置き換えた学校

Ulm
= デザインを方法化しながら
  「方法だけで十分か？」も内部で争った学校
```

つまり歴史から受け取れるのは、単なる「システム化せよ」という命令ではない。

**Methods themselves must remain open to criticism.**

方法そのものも、目的に合っているか問い直されなければならない。

## 6. Visual Identityとの接続：デザインが「未来の判断」を支える

Ulmに関係する代表例の一つがLufthansaのVisual Identityだ。

HfG Archivによれば、1961〜62年、Otl Aicherが率いるHfGの開発グループE5はLufthansaの体系的なvisual identityを設計した。またAicherのアーカイブ資料には、Lufthansaを含むE5のプロジェクトが記録されている。

[HfG-Archiv Ulm — From Logo to Identity](https://hfg-archiv.museumulm.de/en/exhibition/from-logo-to-identity-visual-appearances-of-the-federal-republic-of-germany/)

[HfG-Archiv Ulm — The bequest of Otl Aicher](https://hfg-archiv.museumulm.de/en/bequests/the-bequest-of-otl-aicher/)

Visual Identityでは、一つのロゴを完成させれば終わりではない。

```text
mark
＋
type
＋
color
＋
layout
＋
signage
＋
application rules
```

複数の媒体で同じ組織として認識できるよう、**まだ作られていない未来の制作物にも判断を渡す**必要がある。

ここから現代のDesign Systemとの構造的な類似が見える。

ただし、**UlmやLufthansa identityを現在のDesign Systemの直接的な起源と断定することはしない。** 技術、組織、媒体、開発工程が違うからだ。

接続できるのは、single artifactではなく**reusable rules**を設計対象にするという問題構造である。

## 7. 誤解しやすい点：「システム化すればデザインは良くなる」

これも危ない。

ルールが増えれば、一貫性は上げやすい。

でも悪いルールも、システム化すれば高速で再生産される。

```text
bad rule
×
100 screens
=
100 consistent problems
```

だからDesign Systemの評価で、

```text
統一されているか？
```

だけを見るのは足りない。

```text
なぜそのルールなのか？
誰にとって有効なのか？
例外を許すべき場所はどこか？
ルールを更新できるか？
```

まで見る必要がある。

**Consistency is not evidence of correctness.**

一貫していることは、正しいことの証明ではない。

Ulm内部で方法論そのものが論争になった歴史は、この点をかなり強く思い出させてくれる。

## 8. 以前の学びとの接続：ルールを見るだけでなく、ルールを疑う

これまでの学びを並べると、

```text
Grid
= spatial rule

Similarity
= perceptual rule

Tap Target / Fitts’s Law
= interaction rule
```

まで来た。

今日、もう一段上がる。

```text
Ulm
= それらの判断を
  方法として組み合わせる
  ＋
  方法そのものを問い直す
```

ここで前より解像度が上がる。

**A design system is not just a collection of reusable decisions. It also needs a way to challenge and update those decisions.**

Design Systemは「再利用可能な判断の集まり」だけでは不十分で、**判断を疑い、更新する仕組みまで含めて初めて生きたsystemになる**。

## 9. 30秒でできる観察

普段使うサービスを一つ開き、同じ種類の画面を三つ見る。

探すのは、

```text
same spacing
same button
same heading
same icon
same error state
```

そして二問だけ考える。

**「ここには共通ルールがありそう？」**

次に、

**「そのルール、本当にこの場面でも正しい？」**

前者がsystemを見る目。
後者がsystemを批判する目。

両方そろって今日の練習は終了。

## 10. 次につながる概念：Design Tokens / Governance

次はDesign Tokensへ進める。

```text
spacing-sm = 8
spacing-md = 16
radius-md = 8
color-action-primary = ...
```

のように、判断をdataとして表現すれば、design ruleをcodeや複数platformへ渡しやすくなる。

でも今日のUlmを経由したあとなら、もう一つ問いが増える。

```text
Who defines the token?
Who can change it?
Why does it exist?
```

つまりDesign Tokensの先には**Governance**がある。

ルールを作ることと、ルールを運用・改訂することは別の問題だ。

---

**Today’s claim:**

**Design can systematize decisions, but good design also questions the system.**

日本語なら、

**デザインは「判断を仕組みにする」だけではない。その仕組み自体を疑い、更新することまで含む。**

Ulmを「合理的デザインの学校」と覚えるだけやと半分。

方法をつくった。そして、方法だけでデザインを説明できるのかを内部で争った。

そこまで見ると、60年以上前の学校の話が、いまのDesign Systemレビューへ急につながってくる。

## 参考資料

- [HfG-Archiv Ulm — Die HfG](https://hfg-archiv.museumulm.de/geschichte-hfg/)
- [HfG-Archiv Ulm — Geschichte](https://hfg-archiv.museumulm.de/geschichte-hfg/geschichte/)
- [HfG-Archiv Ulm — History](https://hfg-archiv.museumulm.de/en/the-hfg-archive/history/)
- [HfG-Archiv Ulm — From Logo to Identity](https://hfg-archiv.museumulm.de/en/exhibition/from-logo-to-identity-visual-appearances-of-the-federal-republic-of-germany/)
- [HfG-Archiv Ulm — The bequest of Otl Aicher](https://hfg-archiv.museumulm.de/en/bequests/the-bequest-of-otl-aicher/)
