---
id: design-literacy-preattentive-processing-visual-search
title: 赤い点を1個置くだけで、なぜ目が勝手にそこへ行くのか
subtitle: Design Literacy #37｜目立つのは「赤」ではなく、周囲との差である
created: 2026-09-12
updated: 2026-09-12
type: Essay
status: published
tags: ["Design Literacy", "Visual Search", "Attention", "Visual Hierarchy", "UI"]
keywords: ["Preattentive Processing", "Visual Search", "Feature Integration Theory", "Feature Search", "Conjunction Search", "Guided Search", "Salience", "Pop-out", "Attention"]
favorite: false
grow: true
series: Design Literacy｜細部から思想まで
seriesOrder: 37
abstract: 赤い点は本当に「赤いから」目立つのか。TreismanのFeature Integration TheoryとWolfeのGuided Searchを手がかりに、UIの強調を「派手さ」ではなく差分・探索・注意の設計として捉え直す。
---

# 赤い点を1個置くだけで、なぜ目が勝手にそこへ行くのか

画面の中に赤い点をひとつ置く。

すると、だいたい見る。

こちらが「赤い点を探そう」と決意するより前に、もう目がそっちへ寄っている感じがある。

かなり図々しい。

では、赤い点を100個置いたら100倍目立つのか。

もちろん、そんなことはない。

むしろ全部赤いと、赤は急に何も言わなくなる。

ここで妙なことが起きている。目立っていたのは「赤」そのものではなく、**赤と周囲の関係**だったのではないか。

今回は、この小さな違和感を本気で掘る。

## まず、3秒だけ探してみる

次の中から四角を探す。

```text
● ● ● ● ● ● ● ●
● ● ● ■ ● ● ● ●
● ● ● ● ● ● ● ●
```

たぶん、左上から一個ずつ検品してはいない。

「あ、いた」で終わる。

では次。

```text
赤●　青■　赤■
青●　赤●　青■
```

この中から「赤い■」だけを探す。

さっきより少し、見る感じが増える。

これは古典的なvisual search研究で長く扱われてきた違いに近い。

## FACT｜Treismanは、featureとobjectのあいだにattentionを置いた

Anne TreismanとGarry Geladeは1980年の論文 *A Feature-Integration Theory of Attention* で、色、方向、明るさ、動きなどの特徴が初期段階で広い視野にわたって並列的に登録され、その後、複数の特徴を正しく一つのobjectとして結びつけるためにfocused attentionが必要になる、というモデルを提案した。

彼らの論文ではvisual searchだけでなく、texture segregation、identification、localizationなど複数の課題を使ってこの仮説を検討している。

ここから有名な「feature search」と「conjunction search」という理解が広がった。

単一の違い――たとえば色だけ、形だけ――で探せる対象は比較的すばやく見つかることがある。一方、「赤くて四角」のように複数特徴の組み合わせを特定する課題では、attentionの使われ方が変わる。

ただし、ここを「featureは完全並列、conjunctionは必ず一個ずつ逐次探索」と暗記すると、研究史を止めてしまう。

## RE-RESEARCH｜その後、話はもっと面倒になった

Jeremy WolfeのGuided Searchは、初期のparallel processingと、その出力によってlimited-capacity attentionがどこへ向かうかを連続したモデルとして扱った。

1994年のGuided Search 2.0では、color、motion、depth cuesなどのbasic visual featuresを広い視野で処理する段階と、readingやobject identificationのようなより複雑な処理を限られた領域で行う段階を区別しつつ、後者の配置が前段階の出力によって**guided**される、と整理している。

つまり、「目が勝手に見つける」か「一個ずつ探す」かの二択というより、**どこを次に見るべきかの優先順位が前段階から作られている**と考えた方が、現代のUIには使いやすい。

## もう一歩やりすぎる｜赤を100個に増やしたらどうなる

CTAを目立たせたい。

そこで赤くする。

ここまではよくある。

では重要なものを全部赤くしてみる。

```text
[チケット購入]
重要なお知らせ
残席わずか
キャンペーン
ログイン
試合情報
```

全部、赤。全部、太字。全部、大きい。

設計者の気持ちは分かる。

全部大事なのだ。

しかし視覚的には、

```text
IMPORTANT
IMPORTANT
IMPORTANT
IMPORTANT
IMPORTANT
```

になる。

一個だけ赤かったときに存在した**difference**が消える。

赤を増やしたのに、「赤が持っていた情報」は減っている。

これはちょっと面白い。

## INTERPRETATION｜目立つ色があるのではなく、目立つ関係がある

UI制作へ戻す。

「CTAを目立たせるため、赤にしてください」という指示は半分しか設計していない。

確認すべきなのは、

- 周囲は何色か
- 同程度のcontrastを持つ要素はいくつあるか
- sizeやshapeでも競合していないか
- 最初に発見してほしい対象は一つなのか複数なのか
- 発見したあとに、意味を誤解しないか

である。

つまり、

```text
FEATURE
↓
DIFFERENCE
↓
ATTENTION GUIDANCE
↓
DISCOVERY
↓
INTERPRETATION
```

まで見る。

制作指示なら、こう変えられる。

### Before

> CTAをもっと目立たせてください。

### After

> 最初に発見してほしいCTAと周辺要素の差を明確にしてください。色・サイズ・形状・位置などの強調表現を全要素へ均等に割り当てず、主要CTAへ優先的に使ってください。あわせて、周辺要素の強度を下げることで差分を作れるか確認してください。

さらに短くするなら、これでいい。

> **これは目立っていますか。それとも周りも全部目立っていますか？**

## 「色を消してみる」という雑だけど効く実験

Webページのスクリーンショットをグレースケールにしてみる。

もちろん、これだけでaccessibilityやhierarchyを判定できるわけではない。

でも、色だけに依存した強調がどれくらいあるかを見る簡易テストにはなる。

色を消した瞬間に、

- CTAと補助リンクが同じに見える
- 見出しと本文の差がなくなる
- 選択状態が消える

なら、その画面ではcolorがかなり多くの仕事を背負っている。

逆に、size、position、spacing、weight、shapeでも階層が維持されるなら、visual hierarchyは複数のcueで支えられている。

ここでも「赤を使うな」ではない。

**一つのfeatureに全部を背負わせるな**という話になる。

## #36との接続｜昨日は「どう読むか」、今日は「どこから読むか」

#36 Graphical Perceptionでは、数字がposition、length、angle、areaなどにencodeされ、その違いで数量判断のしやすさが変わることを見た。

今日は、そのさらに前段階にいる。

```text
SCREEN
↓
どこにattentionが向く？
↓
何を発見する？
↓
何を読む？
↓
どう判断する？
```

#36は **How do I judge it?**

#37は **What do I notice first?**

この二つをつなぐと、visual hierarchyは単なる「文字サイズ表」ではなくなる。

**Discovery → Interpretation** の順序設計として見えてくる。

## 誤解しやすい点｜Preattentive Attributesは魔法のボタンではない

「color、size、orientationはpreattentiveだから使えば目立つ」という理解は危ない。

同じfeatureが画面全体に大量にあれば差分は弱くなる。targetとdistractorの類似性、要素数、文脈、探索目標などによってvisual searchの難易度は変わる。

さらに、Feature Integration Theoryは非常に影響力のあるモデルだが、その後の研究で修正・拡張されてきた。

**FACT:** 基本的visual featuresがattentionの配置を導くという研究蓄積がある。

**INTERPRETATION:** UI制作では「preattentive attributeを置く」より、**競合する差分を管理して、attentionの行き先を設計する**と考える方が実践的だ。

## 30秒でできる観察

適当なWebサイトかアプリを一つ開く。

1秒だけ見る。

閉じる。

そして思い出す。

- 最初に見えたのは何だったか
- それは本当に最重要情報だったか
- なぜそこを見たのか
- Color / Size / Position / Shape / Contrastのどれが効いたか

もし「一番重要なもの」と「最初に見えたもの」が違ったら、そこにレビューの入口がある。

## 次につながる概念｜Change Blindness

次は逆方向を見る。

人間は「画面に存在しているものなら、だいたい見えている」と思いがちだ。

でもattentionが向いていなければ、大きな変化でさえ見落とすことがある。

**Change Blindness**を知ると、

> ちゃんと画面に表示しています

と、

> ユーザーが気づけます

が別物だと分かる。

---

### 今日の中心命題

**Visual hierarchy is not about making important things loud. It is about making important differences detectable.**

Visual Hierarchyは、重要なものを全部デカくすることではない。

**重要な差を、目が発見できる状態にすること。**

赤い点を見る前は、「赤いから目立つ」と思っていた。

でも調べた後では、少し違って見える。

赤い点が偉かったわけではない。

周囲が静かだったから、赤に意味が生まれていた。

目立つ色があるんやない。

**目立つ関係がある。**

### 専門語 / Search terms

`Preattentive Processing` / `Visual Search` / `Feature Integration Theory` / `Feature Search` / `Conjunction Search` / `Guided Search` / `Salience` / `Pop-out` / `Attention` / `Visual Hierarchy`

### Sources

- Anne M. Treisman & Garry Gelade, “A Feature-Integration Theory of Attention,” *Cognitive Psychology*, 12(1), 1980, pp. 97–136. DOI: 10.1016/0010-0285(80)90005-5
- Jeremy M. Wolfe, “Guided Search 2.0: A Revised Model of Visual Search,” *Psychonomic Bulletin & Review*, 1(2), 1994, pp. 202–238. DOI: 10.3758/BF03200774