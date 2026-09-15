---
id: design-literacy-typographic-scale-hierarchy
title: 見出しを「ちょっと大きく」を5回やると、なぜ全部同じ顔になるのか
subtitle: Design Literacy #47｜Typographic Scale / Modular Scale / Visual Hierarchy
created: 2026-09-15
updated: 2026-09-15
type: Essay
status: published
tags: ["Design Literacy", "Typography", "Typographic Scale", "Visual Hierarchy", "Design System"]
keywords: ["Typographic Scale", "Type Scale", "Modular Scale", "Visual Hierarchy", "Scale Ratio", "Design Tokens", "Vertical Rhythm", "IBM Carbon", "Fluent 2", "Le Modulor"]
favorite: false
grow: true
series: Design Literacy｜細部から思想まで
seriesOrder: 47
abstract: 16、18、20、22、24。All steps are +2px, yet the relative promotion gets smaller as you go up. 文字サイズをadditionではなくrelationshipとして見ると、Modular Scale、Le CorbusierのModulor、modern Design Systemsまで一本につながる。
---

# 見出しを「ちょっと大きく」を5回やると、なぜ全部同じ顔になるのか

Body 16px. Small heading 18px. Heading 20px. Large heading 22px. Title 24px.

全部、ちゃんとdifferentだ。

しかもevery step is exactly +2px。

なのに画面を見ると、**全員ちょっと偉そうなbody text**に見える。

```text
BODY        16
LEAD        18
SUBHEAD     20
HEADING     22
TITLE       24
```

5 levels of hierarchyを作ったのに、visuallyは2 levelsくらいしかない。

Why?

ここで数字をdifferenceではなくratioで見ると、妙なことが起きている。

## FACT｜+2pxは、上へ行くほど小さな昇進になる

16px to 18px is a 12.5% increase.

18px→20pxは約11.1%。20px→22pxは10%。22px→24pxは約9.1%。

```text
16 → 18   +12.5%
18 → 20   +11.1%
20 → 22   +10.0%
22 → 24   + 9.1%
```

同じ“+2px”でも、higher levelsほどrelative differenceは小さくなる。

つまりこのcompany、役職が上がるほどraise percentageが下がっている。

Typographyの話である。

## もう一歩やりすぎる｜「+2px」と「×1.25」を実際に並べる

まず、additionで5 levelsを作る。

```text
16 / 18 / 20 / 22 / 24
```

次に、16pxをbaseにevery step ×1.25する。

```text
16 / 20 / 25 / 31.25 / 39.06
```

後者はneighbor間のdifferenceが常に25%なので、上のlevelへ行っても“how much larger than before”というrelationshipが保たれる。

ここで大事なのは、1.25 is not the correct answerということ。

**Font sizesをisolated numbersではなく、neighboring rolesとのrelationshipとしてdesignできる**ということだ。

## Modular Scaleという考え方

Web typographyでこの考え方を広く知らしめた代表的な文章の一つが、Tim Brownによる2011年のA List Apart記事“More Meaningful Typography”である。

BrownはModular Scaleを、numbers related to one another in a meaningful wayとして説明し、base valueとratioから得た値をfont-sizeだけでなく、line-height、line length、margin、column widthなどへapplyできるとした。

Source: https://alistapart.com/article/more-meaningful-typography/

例えば16pxと1.25なら、

```text
16 × 1.25 = 20
20 × 1.25 = 25
25 × 1.25 = 31.25
```

“Headingだからbodyよりとりあえず2px大きく”から一歩進んで、**hierarchyそのものにreproducible ruleを持たせる**。

## ただし、黄金比を入力したら急に美しくなるわけではない

Modular Scaleを調べると、かなりの確率で1.618が出てくる。

Golden ratioである。

急にarchitectureとsunflowersとancient Greeceの気配がしてくる。

しかしBrown自身、Modular Scaleを“tools—not dogma”と書いている。実例でもscale外のvalueを、appearanceやcontextに応じて使っている。

Source: https://alistapart.com/article/more-meaningful-typography/

Mathematics can reduce candidates and create relationships, but that is where its authority ends.

**Math suggests. Eyes decide.**

## 歴史を少し遠くまで追う｜比率を「ものさし」にした人たち

Proportional systemsをdesignへ持ち込む発想は、Webよりはるか以前からある。

Robert Bringhurstは『The Elements of Typographic Style』で、modular scaleを、multiple dimensionsをconsistent proportional relationshipsで扱うための方法として紹介している。Tim Brownの記事もBringhurstの定義を参照している。

さらにarchitectureでは、Le Corbusierが1943〜1950年にかけてModulorをdevelopした。Fondation Le Corbusierによれば、Modulorはhuman dimensions、Fibonacci sequence、golden ratioを組み合わせたproportional systemであり、designとbuilding standardizationをつなぐtoolとして構想された。

Source: https://www.fondationlecorbusier.fr/dossier-thematique/vocabulaire-corbuseen/

Source: https://www.fondationlecorbusier.fr/oeuvre-livre/le-modulor-i-le-corbusier-1950/

ここで重要なのは“昔の偉い人もgolden ratioを使ったから1.618にしよう”ではない。

共通しているのは、**毎回zeroからdimensionを決めず、dimensions同士のrelationshipを先に作ろうとしたこと**である。

## でも現代Design Systemは、きれいな等比数列だけではできていない

ここでmodern practiceへ戻る。

IBM Carbon Design Systemのtype scaleを見ると、12、14、16、18、20、24、28、32、36、42……と進む。constant-ratio geometric progressionではなく、stepに応じてincrementが変わる独自formulaを使っている。

Source: https://v10.carbondesignsystem.com/guidelines/typography/overview/

さらにcurrent Carbonは、単なるsize scaleだけでなく、font-size、weight、line-heightなどをまとめた**type token**とsemantic roleを重視している。

Source: https://preview.carbondesignsystem.com/building-blocks/foundations/typography/type-sets

Microsoft Fluent 2も同様で、Caption、Body、Subtitle、Title、Displayのようなrolesごとにsize、weight、line-heightを組み合わせたtype rampを持つ。

Source: https://fluent2.microsoft.design/typography

つまり実務では、

```text
mathematically beautiful scale
        ↓
apply unchanged to everything
```

ではなく、

```text
create candidate relationships
        ↓
assign semantic roles
        ↓
adjust for font / weight / line-height / device
```

という方が近い。

## INTERPRETATION｜Hierarchyは「種類の多さ」ではなく「区別の強さ」でできる

ここからはinterpretation。

16、18、20、22、24と5 sizesを作ると、design file上では5 stylesが存在する。

でもreaderが5 levelsをrecognizeできるとは限らない。

```text
DIFFERENCE IN DESIGN SYSTEM
≠
DIFFERENCE PEOPLE PERCEIVE
```

Hierarchyの目的は、number of valuesを増やすことではない。

**どちらがhigher levelで、どこからcontent groupingが変わるのかを、読む前から伝えること**である。

だから“18pxと20px、both necessary?”という問いは、単なるcleanupではない。

Information structureを見直している。

## Before → After｜5階級を4階級に減らしてみる

Before。

```text
ARTICLE TITLE   24
SECTION         22
SUBSECTION      20
LEAD            18
BODY            16
```

全部differentだが、contrast is weak。

Afterの一例。

```text
ARTICLE TITLE   40
SECTION         28
LEAD            20
BODY            16
```

Roleは一つ減った。

でも、pageを一瞬見たときに“title”“section”“body”のdifferenceはむしろstrongerになる。

もちろん40 / 28 / 20 / 16 is not the answerという意味ではない。

ここでやったことは、numbersを整えたのではなく、**meaningが重複したhierarchyを疑った**ことである。

## #45と#46につなぐと、Systemの意味が少し変わる

Design Literacy #45ではSpacing Scaleを扱った。

```text
SPACE
余白の数字を毎回発明しない
```

#46ではBaseline Gridを扱った。

```text
RHYTHM
行の周期を毎回発明しない
```

今回のTypographic Scaleを足す。

```text
SIZE
文字サイズの関係を毎回発明しない
```

ここまで来るとDesign Systemは、“valuesを統一するもの”より少し広く見える。

**A design system also creates explainable relationships between values.**

## そのまま使える制作・修正指示

> 画面内で使われているfont-sizeを一覧化し、各sizeがどのsemantic roleに対応しているか整理してください。隣接するhierarchyのvisual differenceが弱い場合は、中間sizeを追加する前に、roleの統合またはsize差の拡大を検討してください。Type scaleはratioを起点にして構いませんが、最終的にはfont、weight、line-height、device width、text volumeを含めて調整し、scale外の値も理由が説明できれば許容してください。

短く言うなら、

> **「18pxと20px、両方いる？」**

## 30秒実験｜font-sizeを全部並べる

自分が作っているsiteやFigmaを開く。

使われているfont-sizeを全部並べる。

```text
12
14
15
16
17
18
20
22
24
28
32
```

そしてone questionだけ聞く。

**Can the user tell what all eleven sizes mean?**

見分けられないdifferenceがあれば、それはhierarchyではなくmicro-adjustmentかもしれない。

逆に、一見近いsizeでもuse case・readability・component constraintsで必要なら残せばいい。

Scaleはreduction gameではない。**理由のないdifferenceを見つけるdetector**である。

## 次につながる概念｜Fluid Typography

ここまでで、fixed type scaleは作れる。

しかし次にviewport widthが変わる。

Desktopで40pxのtitleを、そのままnarrow mobileへ持っていくと大きすぎる場合がある。

だから次は、breakpointごとにfont-sizeをswitchするだけでなく、CSSの`clamp()`などを使って、viewportに応じてcontinuously変化させる**Fluid Typography**へつながる。

Carbonにも、breakpoints間でheadlineやdisplay typeをfluidに変化させるtype setがある。

Source: https://v10.carbondesignsystem.com/guidelines/typography/expressive/

固定された“family of numbers”を、changing screenでどう生かすか。

次の問題はそこにある。

---

## 今日の中心命題

**A type scale does not choose font sizes for you. It gives hierarchy a measurable relationship.**

Typographic Scaleは、correct font-sizeをautomatically決めるmachineではない。

階層同士へ、measurable and explainable relationshipを与えるtoolである。

最初は“16、18、20、22、24。きれいに2ずつ増えている”と思っていた。

調べたあとでは、same sequenceが少し違って見える。

```text
+2
+2
+2
+2
```

は、見た目ほどfairではない。

上へ行くほど、relative differenceは小さくなる。

だからTypographyで本当に揃えたいのは、numbers themselvesではない。

**数字と数字のrelationship、そしてroleとroleのdistanceである。**

### 専門語 / Search terms

`Typographic Scale` / `Type Scale` / `Modular Scale` / `Visual Hierarchy` / `Scale Ratio` / `Type Ramp` / `Type Token` / `Design Tokens` / `Vertical Rhythm` / `Le Modulor` / `Fluid Typography` / `CSS clamp()`
