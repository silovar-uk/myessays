---
id: design-literacy-preattentive-processing-visual-search
title: 赤い点を1個置くだけで、なぜ目が勝手にそこへ行くのか
subtitle: Design Literacy #37｜What stands out is not red itself, but the difference around it
created: 2026-09-12
updated: 2026-09-12
type: Essay
status: published
tags: [Design Literacy, Visual Search, Attention, Visual Hierarchy, UI]
keywords: [Preattentive Processing, Visual Search, Feature Integration Theory, Feature Search, Conjunction Search, Guided Search, Salience, Pop-out, Attention]
favorite: false
grow: true
series: Design Literacy｜細部から思想まで
seriesOrder: 37
abstract: 赤い点は本当に「赤いから」目立つのか。TreismanのFeature Integration TheoryとWolfeのGuided Searchを手がかりに、UIの強調を派手さではなくdifference, search, attentionの設計として捉え直す。
---

# 赤い点を1個置くだけで、なぜ目が勝手にそこへ行くのか

画面の中に赤い点をひとつ置く。

すると、だいたい見る。

Before you consciously decide to look for it, your eyes already seem to move toward it.

かなり図々しい。

では、赤い点を100個置いたら100倍目立つのか。

Of course not.

全部赤いと、赤は急に何も言わなくなる。

ここで妙なことが起きている。What stood out was not “red” itself. It was **the relationship between red and everything around it**.

今回は、この小さな違和感を本気で掘る。

## まず、3秒だけ探してみる

Find the square.

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

Now find the red square.

さっきより少し、見る感じが増える。

これはvisual search研究で長く扱われてきた違いに近い。

## FACT｜Treisman placed attention between features and objects

Anne TreismanとGarry Geladeは1980年の *A Feature-Integration Theory of Attention* で、color, orientation, brightness, motionなどのfeaturesが初期段階で広い視野にわたってparallelに登録され、その後、複数特徴を正しく一つのobjectとして結びつけるためにfocused attentionが必要になる、というモデルを提案した。

Their experiments covered visual search, texture segregation, identification, and localization.

ここから有名なfeature search / conjunction searchという理解が広がった。

単一の違い、たとえば色だけ・形だけで探せるtargetは比較的すばやく見つかることがある。一方、「red AND square」のようなfeature combinationを特定する課題ではattentionの使われ方が変わる。

ただし、ここを “feature = perfectly parallel, conjunction = always serial” と暗記すると、研究史を止めてしまう。

## RE-RESEARCH｜The story became more complicated

Jeremy WolfeのGuided Searchは、early parallel processingと、そのoutputによってlimited-capacity attentionがどこへ向かうかを連続したモデルとして扱った。

Guided Search 2.0 (1994) distinguishes a broad early stage that processes basic visual features from a later limited-capacity stage for more complex operations such as reading and object identification.

大事なのは、後段のattentionがランダムに動くのではなく、前段階のoutputによって**guided**されること。

つまり、「勝手に見つける」か「一個ずつ探す」かの二択より、**the system is already building priorities for where to look next** と考えた方がUIには使いやすい。

## もう一歩やりすぎる｜What if we make everything red?

CTAを目立たせたい。

So we make it red.

ここまではよくある。

では、重要なものを全部赤くする。

```text
[チケット購入]
重要なお知らせ
残席わずか
キャンペーン
ログイン
試合情報
```

All red. All bold. All large.

設計者の気持ちは分かる。全部大事なのだ。

しかし視覚的には、

```text
IMPORTANT
IMPORTANT
IMPORTANT
IMPORTANT
IMPORTANT
```

になる。

The difference that made the first red CTA noticeable has disappeared.

赤を増やしたのに、「赤が持っていた情報」は減っている。

This is the strange part.

## INTERPRETATION｜There is no universally “attention-grabbing red”

UI制作へ戻す。

「CTAを赤にしてください」は半分しか設計していない。

You also need to ask:

- 周囲は何色か
- 似たcontrastを持つ要素はいくつあるか
- size / shape / positionでも競合していないか
- first discovery targetは一つなのか複数なのか
- 発見したあと、意味を誤解しないか

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

### Before

> CTAをもっと目立たせてください。

### After

> 最初に発見してほしいCTAと周辺要素の差を明確にしてください。Do not distribute color, size, shape, and other emphasis equally across every element. Give the strongest cues to the primary CTA, and also check whether lowering the visual intensity of surrounding elements creates a clearer difference.

短くするなら、これでいい。

> **Is this element prominent, or is everything around it prominent too?**

## 色を消してみる｜A crude but useful test

Webページのスクリーンショットをgrayscaleにしてみる。

もちろん、this is not a full accessibility or hierarchy test.

でも、色だけに依存した強調をざっくり見るには使える。

色を消した瞬間に、

- CTAと補助リンクが同じに見える
- 見出しと本文の差がなくなる
- 選択状態が消える

なら、color is doing a lot of work.

逆にsize, position, spacing, weight, shapeでもhierarchyが維持されるなら、複数のcueで支えられている。

The lesson is not “don’t use red.”

**Do not make one feature carry the entire hierarchy.**

## #36との接続｜Yesterday: how do I judge it? Today: what do I notice first?

#36 Graphical Perceptionでは、数字がposition, length, angle, areaなどへencodeされ、その違いで数量判断のしやすさが変わることを見た。

今日は、そのさらに前段階にいる。

```text
SCREEN
↓
Where does attention go?
↓
What gets discovered?
↓
What gets read?
↓
How is it judged?
```

#36 = **How do I judge it?**

#37 = **What do I notice first?**

この二つをつなぐと、visual hierarchyは単なる「文字サイズ表」ではなくなる。

It becomes an order of **Discovery → Interpretation**.

## 誤解しやすい点｜Preattentive attributes are not magic buttons

“Color, size, orientation are preattentive, so use them and people will notice” は危ない。

If the same feature is everywhere, its difference gets weaker. Search difficulty also changes with target–distractor similarity, set size, context, and the observer’s goal.

Feature Integration Theoryは非常に影響力のあるモデルだが、その後の研究で修正・拡張されてきた。

**FACT:** basic visual features can help guide the deployment of attention.

**INTERPRETATION:** UI制作では「preattentive attributeを足す」より、**manage competing differences and design where attention should go** と考える方が実践的だ。

## 30秒でできる観察

適当なWebサイトかアプリを一つ開く。

Look for one second. Then close it.

そして思い出す。

- 最初に見えたのは何だったか
- Was it actually the most important thing?
- なぜそこを見たのか
- Color / Size / Position / Shape / Contrastのどれが効いたか

「一番重要なもの」と「最初に見えたもの」が違ったら、そこがレビューの入口になる。

## 次につながる概念｜Change Blindness

次は逆方向を見る。

Humans often assume that if something is visibly present on screen, they will notice it.

でもattentionが向いていなければ、大きな変化でも見落とすことがある。

Change Blindnessを知ると、

> ちゃんと画面に表示しています

と、

> The user will actually notice it

が別物だと分かる。

---

### 今日の中心命題

**Visual hierarchy is not about making important things loud. It is about making important differences detectable.**

Visual Hierarchyは、重要なものを全部デカくすることではない。

**重要な差を、目が発見できる状態にすること。**

赤い点を見る前は、「red is attention-grabbing」と思っていた。

でも調べた後では、少し違って見える。

The red dot was not powerful by itself.

周囲が静かだったから、赤に意味が生まれていた。

There is no attention-grabbing color in isolation.

**There are attention-grabbing relationships.**

### 専門語 / Search terms

`Preattentive Processing` / `Visual Search` / `Feature Integration Theory` / `Feature Search` / `Conjunction Search` / `Guided Search` / `Salience` / `Pop-out` / `Attention` / `Visual Hierarchy`

### Sources

- Anne M. Treisman & Garry Gelade, “A Feature-Integration Theory of Attention,” *Cognitive Psychology*, 12(1), 1980, pp. 97–136. DOI: 10.1016/0010-0285(80)90005-5
- Jeremy M. Wolfe, “Guided Search 2.0: A Revised Model of Visual Search,” *Psychonomic Bulletin & Review*, 1(2), 1994, pp. 202–238. DOI: 10.3758/BF03200774
