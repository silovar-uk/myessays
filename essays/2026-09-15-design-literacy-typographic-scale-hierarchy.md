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
abstract: 16、18、20、22、24。全部2pxずつ増えているのに、上へ行くほど「昇進幅」は小さくなる。文字サイズを足し算ではなく関係として見ると、Modular Scale、Le CorbusierのModulor、現代Design Systemまで一本につながる。
---

# 見出しを「ちょっと大きく」を5回やると、なぜ全部同じ顔になるのか

本文16px。小見出し18px。見出し20px。大見出し22px。タイトル24px。

全部、ちゃんと違う。

しかも全部、きれいに2pxずつ大きい。

なのに画面を見ると、**全員ちょっと偉そうな本文**に見える。

```text
BODY        16
LEAD        18
SUBHEAD     20
HEADING     22
TITLE       24
```

階層を5段階も作ったのに、視覚的には2段階くらいしかない。

なぜなのか。

ここで数字を「差」ではなく「比率」で見てみると、妙なことが起きている。

## FACT｜+2pxは、上へ行くほど小さな昇進になる

16pxから18pxは、12.5%増えている。

18pxから20pxは、約11.1%。20pxから22pxは10%。22pxから24pxは約9.1%。

```text
16 → 18   +12.5%
18 → 20   +11.1%
20 → 22   +10.0%
22 → 24   + 9.1%
```

同じ「+2px」なのに、上へ行くほど相対的な差は小さくなる。

つまりこの会社、役職が上がるほど昇給率が下がっている。

Typographyの話である。

## もう一歩やりすぎる｜「+2px」と「×1.25」を実際に並べる

まず、足し算で5段階作る。

```text
16 / 18 / 20 / 22 / 24
```

次に、16pxを起点に毎回1.25倍する。

```text
16 / 20 / 25 / 31.25 / 39.06
```

後者は隣同士の差が常に25%なので、上の階層へ行っても「前よりどれだけ大きいか」という関係が保たれる。

ここで大事なのは、1.25が正解ということではない。

**文字サイズを単独の数字ではなく、隣との関係として設計できる**ということだ。

## Modular Scaleという考え方

Web typographyでこの考え方を広く知らしめた代表的な文章の一つが、Tim Brownによる2011年のA List Apart記事「More Meaningful Typography」である。

BrownはModular Scaleを、互いに意味のある関係を持つ数列として説明し、基準値と比率から得た値をfont-sizeだけでなく、line-height、line length、margin、column widthなどへ応用できるとした。

Source: https://alistapart.com/article/more-meaningful-typography/

例えば16pxと1.25なら、

```text
16 × 1.25 = 20
20 × 1.25 = 25
25 × 1.25 = 31.25
```

となる。

「見出しだから、とりあえず本文より2px大きくする」から一歩進んで、**階層そのものに再現可能なルールを持たせる**。

## ただし、黄金比を入力したら急に美しくなるわけではない

Modular Scaleを調べると、かなりの確率で1.618が出てくる。

黄金比である。

急に建築とひまわりと古代ギリシャの気配がしてくる。

しかしBrown自身、Modular Scaleを「tools—not dogma」と書いている。実例でもscaleにない値を、見た目や文脈に応じて使っている。

Source: https://alistapart.com/article/more-meaningful-typography/

数学ができるのは、候補を減らし、関係を作るところまでだ。

**Math suggests. Eyes decide.**

## 歴史を少し遠くまで追う｜比率を「ものさし」にした人たち

比例体系を設計へ持ち込む発想は、Webよりはるか以前からある。

Robert Bringhurstは『The Elements of Typographic Style』で、modular scaleを、複数の寸法を一貫した比例関係で扱うための方法として紹介している。Tim Brownの記事もBringhurstの定義を参照している。

さらに建築では、Le Corbusierが1943〜1950年にかけてModulorを発展させた。Fondation Le Corbusierによれば、Modulorは人体寸法、Fibonacci数列、黄金比を組み合わせた比例体系であり、設計と建築部材の標準化をつなぐ道具として構想された。

Source: https://www.fondationlecorbusier.fr/dossier-thematique/vocabulaire-corbuseen/

Source: https://www.fondationlecorbusier.fr/oeuvre-livre/le-modulor-i-le-corbusier-1950/

ここで重要なのは「昔の偉い人も黄金比を使ったから1.618にしよう」ではない。

共通しているのは、**毎回ゼロから寸法を決めず、寸法同士の関係を先に作ろうとしたこと**である。

## でも現代Design Systemは、きれいな等比数列だけではできていない

ここで現代へ戻る。

IBM Carbon Design Systemのtype scaleを見ると、12、14、16、18、20、24、28、32、36、42……と進む。一定比率の等比数列ではなく、段階に応じてincrementが変わる独自の式を使っている。

Source: https://v10.carbondesignsystem.com/guidelines/typography/overview/

さらに現在のCarbonは、単なるsizeのscaleだけでなく、font-size、weight、line-heightなどをまとめた**type token**とsemantic roleを重視している。

Source: https://preview.carbondesignsystem.com/building-blocks/foundations/typography/type-sets

Microsoft Fluent 2も同様で、Caption、Body、Subtitle、Title、Displayのようなroleごとにsize、weight、line-heightを組み合わせたtype rampを持つ。

Source: https://fluent2.microsoft.design/typography

つまり実務では、

```text
数学的に美しいscale
        ↓
そのまま全画面へ適用
```

ではなく、

```text
関係の候補を作る
        ↓
役割を割り当てる
        ↓
font / weight / line-height / deviceで調整する
```

という方が近い。

## INTERPRETATION｜Hierarchyは「種類の多さ」ではなく「区別の強さ」でできる

ここからは解釈。

16、18、20、22、24と5種類作ると、design file上では5つのstyleが存在する。

でも読者が5段階を認識できるとは限らない。

```text
DESIGN SYSTEM上の差
≠
人間が感じる差
```

Hierarchyの目的は、値の種類を増やすことではない。

**どちらが上位で、どこから内容のまとまりが変わるのかを、読む前から伝えること**である。

だから「18pxと20px、両方必要か」という問いは、単なる整理整頓ではない。

情報構造を見直している。

## Before → After｜5階級を4階級に減らしてみる

Before。

```text
ARTICLE TITLE   24
SECTION         22
SUBSECTION      20
LEAD            18
BODY            16
```

全部違うが、差が細かい。

Afterの一例。

```text
ARTICLE TITLE   40
SECTION         28
LEAD            20
BODY            16
```

役割は一つ減った。

でも、ページを一瞬見たときに「タイトル」「節」「本文」の差はむしろ強くなる。

もちろん40 / 28 / 20 / 16が正解という意味ではない。

ここでやったことは、数字を整えたのではなく、**意味の重複した階層を疑った**ことである。

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

ここまで来るとDesign Systemは、「値を統一するもの」より少し広く見える。

**Design Systemは、値同士に説明可能な関係を作るものでもある。**

## そのまま使える制作・修正指示

> 画面内で使われているfont-sizeを一覧化し、各sizeがどのsemantic roleに対応しているか整理してください。隣接する階層の視覚差が弱い場合は、中間sizeを追加する前に、roleの統合またはsize差の拡大を検討してください。Type scaleは比率を起点にして構いませんが、最終的にはfont、weight、line-height、device幅、文章量を含めて調整し、scale外の値も理由が説明できれば許容してください。

短く言うなら、

> **「18pxと20px、両方いる？」**

## 30秒実験｜font-sizeを全部並べる

自分が作っているサイトやFigmaを開く。

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

そして一つだけ聞く。

**ユーザーは、この11種類の意味を見分けられるか。**

見分けられない差があれば、それはhierarchyではなく微調整かもしれない。

逆に、一見近いsizeでも用途・可読性・component制約で必要なら残せばいい。

Scaleは削減ゲームではない。**理由のない差を見つける検査器**である。

## 次につながる概念｜Fluid Typography

ここまでで、固定されたtype scaleは作れる。

しかし次に画面幅が変わる。

Desktopで40pxのtitleを、そのまま狭いmobileへ持っていくと大きすぎる場合がある。

だから次は、breakpointごとにfont-sizeを切り替えるだけでなく、CSSの`clamp()`などを使って、viewportに応じて連続的に変化させる**Fluid Typography**へつながる。

Carbonにも、breakpoint間でheadlineやdisplay typeをfluidに変化させるtype setがある。

Source: https://v10.carbondesignsystem.com/guidelines/typography/expressive/

固定された「数字の家族」を、変化する画面でどう生かすか。

次の問題はそこにある。

---

## 今日の中心命題

**A type scale does not choose font sizes for you. It gives hierarchy a measurable relationship.**

Typographic Scaleは、正しいfont-sizeを自動で決める機械ではない。

階層同士へ、測れて説明できる関係を与える道具である。

最初は「16、18、20、22、24。きれいに2ずつ増えている」と思っていた。

調べたあとでは、同じ列が少し違って見える。

```text
+2
+2
+2
+2
```

は、見た目ほど公平ではない。

上へ行くほど、相対的な差は小さくなる。

だからTypographyで本当に揃えたいのは、数字そのものではない。

**数字と数字の関係、そして役割と役割の距離である。**

### 専門語 / Search terms

`Typographic Scale` / `Type Scale` / `Modular Scale` / `Visual Hierarchy` / `Scale Ratio` / `Type Ramp` / `Type Token` / `Design Tokens` / `Vertical Rhythm` / `Le Modulor` / `Fluid Typography` / `CSS clamp()`
