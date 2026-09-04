---
id: design-literacy-similarity-predictable-meaning
title: "Similarity――『見た目を揃える』目的は、意味を予測可能にすること"
subtitle: "English Mix｜Design Literacy #13｜From Similarity to Visual Language"
created: "2026-09-04"
updated: "2026-09-04"
type: "English Mix"
status: "完成"
mode: "english-mix"
english_ratio: 0.45
mix_unit: "sentence"
series: "Design Literacy｜細部から思想まで"
seriesOrder: 13
abstract: "Gestalt psychologyのSimilarity（類同）を、単なるvisual consistencyではなく、離れた要素にもshared meaningやroleを予測させるVisual Languageの基礎として捉える。Wertheimerの1923年の議論とmodern UIへのapplicationをfactとinterpretationに分け、WCAGのUse of Color、Proximity、Consistency、Design Systemへ接続する。"
---

# Similarity――「見た目を揃える」目的は、意味を予測可能にすること
## Design Literacy #13｜From Similarity to Visual Language

**Similarity is not about making everything look consistent. It is about making meaning easier to predict.**

UIでsame color, same shape, same typographyを繰り返すと、画面には「統一感」が生まれる。

But if we understand Similarity only as visual consistency, we miss the more useful idea. 今回見るのは、**似た見た目が、ユーザーにどんなrelationshipやexpectationを生むのか**という話だ。

## 1. まず一言：Similar things tend to be perceived as belonging together

たとえば、サイト内に次の3つがあるとする。

```text
[ チケット購入 ]
[ 詳しく見る ]
[ 試合情報 ]
```

3つとも、red background、white text、same corner radius、same heightなら、多くの人は自然に「同じ種類のUI」に見える。

ここでprecisionを保ちたい。

In 1923, Max Wertheimer described a tendency for **like parts to band together**, calling it the Factor of Similarity in *Laws of Organization in Perceptual Forms*.

[Max Wertheimer — Laws of Organization in Perceptual Forms (1923), York University archive](https://psychclassics.yorku.ca/Wertheimer/Forms/forms.htm)

ここまでがhistorical fact。

Wertheimer himself did not write, “buttons that look the same will be expected to behave the same.” それはmodern UIへのapplication / interpretationになる。

でも知覚上、似たものがgroupとして捉えられやすいなら、同じvisual propertiesを繰り返すことで、**same category / role / ruleに属するものとして学習しやすくする**ことはできる。

Similarityは「見た目を揃える技術」というより、**a way to visualize semantic categories**として考えると強い。

## 2. 仕組み：Similarity is not only about color

Similarityというと、同じcolorのものをまとめる話に見えやすい。

But similarity can be created through many visual properties:

```text
Color
Shape
Size
Typography
Orientation
Texture
Motion
Placement pattern
```

UIなら、ニュース一覧を数件見ただけで、ユーザーはこんなruleを学習できる。

```text
NEWS          赤・小さなラベル
9.4           グレー・小
新加入選手    黒・太字

NEWS          赤・小さなラベル
9.3           グレー・小
試合情報      黒・太字
```

After a few repetitions, the interface begins to teach its own vocabulary:

```text
赤・小さなラベル = category
グレー・小       = date
黒・太字         = headline
```

Nobody had to explain it explicitly.

**Repetition teaches the interface.**

反復によって「この見た目はこう読む」というVisual Languageが作られる。

## 3. Before → After：Decide what stays similar and what carries the difference

### BEFORE

```text
EVENT      赤・角丸
NEWS       青文字のみ
TICKET     赤文字
ACADEMY    グレー背景
```

全部が同じcategory labelなのに、visual structureがばらばら。

The user has to reinterpret each item: Is this a category, a link, a status, or something else?

### AFTER

```text
[ EVENT ]
[ NEWS ]
[ TICKET ]
[ ACADEMY ]
```

共通するのは、same shape、same padding、same font size、same placement rule。

Colorだけcategoryごとに変える。

すると、

```text
shape / size / placement
= upper-level rule: category label

color
= lower-level rule: which category
```

という二層のvisual grammarが作れる。

Similarity is not a technique for making everything identical. **It is the decision about which properties communicate sameness and which properties communicate difference.**

## 4. そのまま使える制作・修正指示

「デザインを統一してください」だけだと、whyを失う。

Instead, use an instruction like this:

> **同じ役割を持つ要素は、形状・サイズ・タイポグラフィ・配置など複数のvisual propertiesを可能な範囲で共通化してください。逆に、意味や挙動が異なる要素には明確な視覚差を設け、同じカテゴリーや操作だと誤認されにくい状態にしてください。**

For review, two questions work well:

> **「この画面で同じ見た目をしているものは、本当に同じ意味・同じ役割ですか？」**

and the reverse:

> **「同じ役割なのに、毎回違う見た目になっているものはありませんか？」**

この往復でVisual Languageのbreakをかなり拾える。

## 5. 歴史・研究との接続：Separate the original finding from the UI interpretation

Wertheimerの1923年論文では、まずFactor of Proximityを扱い、その後、distanceを一定にしながらdotのcolorなどを変える例から、**like parts tend to band together**というFactor of Similarityを論じている。

[Max Wertheimer — Laws of Organization in Perceptual Forms](https://psychclassics.yorku.ca/Wertheimer/Forms/forms.htm)

ここでhistorical factとmodern interpretationを混ぜない。

Wertheimer did not formulate a design-system rule for modern interfaces. でも、そのperceptual grouping principleをUIへ応用すると、同じroleを持つpartsへshared visual propertiesを与え、**semantic categoryをscreen上で反復して示す**ことができる。

```text
Gestalt psychology
Similarity as perceptual grouping
        ↓
Visual Language
repeated visual rules
        ↓
UI prediction
「前に見たものと同じ種類かも」
```

This connection is useful, but it is an application, not a quotation from Gestalt psychology.

## 6. Accessibility：Do not make color carry the whole meaning

SimilarityをColorだけで作ると、meaning channelが一つに偏る。

たとえば、

```text
発売中   green
残り僅か yellow
完売     red
```

のように状態をcolorだけで区別すると、色差を認識しづらい人には情報が伝わりにくい。

WCAG 2.2 Success Criterion 1.4.1 **Use of Color（Level A）** requires that color not be used as the only visual means of conveying information, indicating an action, prompting a response, or distinguishing a visual element.

[W3C — Understanding SC 1.4.1 Use of Color](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color)

ここも線を引く。

**WCAG does not say “build Similarity with multiple properties.”**

The normative accessibility point is: do not rely on color alone. Similarity側へ引けるinterpretationは、meaningを伝えるときに、

```text
Color
+
Shape
+
Text
+
Icon
```

のようなredundant cuesを重ねると、classificationをよりrobustにできるということ。

W3C Technique G182 also describes adding visual cues such as underline or font-style changes when text color conveys information.

[W3C — G182: Additional visual cues beyond color](https://www.w3.org/WAI/WCAG22/Techniques/general/G182)

## 7. 誤解しやすい点：Consistency is not pixel sameness

同じactionでもcontextによってpresentationは変わる。

```text
Hero
[        チケット購入        ]

Card
[ 購入 ]

Mobile Sticky
----------------------
[ チケットを購入する ]
```

These are not pixel-identical.

それでも、color role、shape family、label convention、icon convention、interaction feedbackなどをshareすれば、same familyとして読める。

**Enough similarity can communicate shared meaning without requiring identical appearance.**

だから「同じ意味なら全部同じ見た目」はやりすぎ。

必要なのは、shared meaningを認識できるだけのSimilarityや。

## 8. 以前の学びとの接続：Proximity is local; Similarity can work across distance

直前に扱ったProximityでは、distanceによって「これは同じまとまり」と示せることを見た。

```text
Proximity
= nearby elementsのlocal relationship
```

Similarityは別の力を持つ。

```text
[ NEWS ]

        distant area

                    [ NEWS ]
```

Even when elements are far apart, shared shape, color, or typography can connect them as the same type.

ここで前より解像度が上がる。

**Proximity groups nearby things. Similarity can connect distributed things.**

さらにGridまで戻すと、

```text
Grid
= shared coordinates for placement

Proximity
= what sits close together

Similarity
= what looks like the same kind

↓
Information Structure
```

Position, distance, and appearance are not separate decoration layers. They are different channels for communicating structure.

## 9. 30秒でできる観察

Open one app you use often.

今日はcolorを一度無視して、次を探す。

```text
same shape
same font size
same icon size
same corner radius
same placement pattern
```

一つfamilyを見つけたら、ask one question:

**「この似ている要素は、本当に同じ役割？」**

Then reverse it:

**「同じ役割なのに、なぜか別物のように見える要素はない？」**

That back-and-forth is a simple Visual Language audit.

## 10. 次につながる概念：Consistency / Design System

Similarityは主にperception側の原理として理解できる。

On the production side, it connects naturally to Consistency and Design Systems.

```text
same meaning / role
        ↓
shared design rule
        ↓
shared component / token
        ↓
similar appearance
        ↓
less relearning for users
```

次の問いは、**How do we make the right similarities reproducible across a team?**

つまり、

```text
Gestalt
Similarity
↓
Visual Language
↓
Consistency
↓
Design System
```

へ進める。

Today’s claim is:

**Similarity is not about visual uniformity. It is about making meaning predictable.**

日本語なら、

**「見た目を揃える」の目的は、統一感そのものではなく、意味を予測できる状態をつくること。**

## 参考資料

- [Max Wertheimer — Laws of Organization in Perceptual Forms (1923), York University archive](https://psychclassics.yorku.ca/Wertheimer/Forms/forms.htm)
- [W3C — WCAG 2.2 Success Criterion 1.4.1 Use of Color](https://www.w3.org/TR/WCAG22/#use-of-color)
- [W3C — Understanding SC 1.4.1 Use of Color](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color)
- [W3C — G182: Ensuring that additional visual cues are available when text color differences are used to convey information](https://www.w3.org/WAI/WCAG22/Techniques/general/G182)
