---
id: design-literacy-line-height-reading-rhythm
title: "Line Height――行間は『空白』ではなく、行を分けながら文章をつなぐ距離"
subtitle: "Design Literacy #9｜Typographyを情報設計として見る"
created: "2026-09-03"
updated: "2026-09-03"
type: "Essay"
status: "完成"
tags: ["Design Literacy", "デザイン", "Typography", "Line Height", "Leading", "Readability", "Accessibility", "UI"]
keywords: ["line-height", "leading", "line spacing", "typography", "readability", "measure", "line length", "WCAG 1.4.12", "text spacing", "vertical rhythm"]
favorite: 5
grow: 5
series: "Design Literacy｜細部から思想まで"
seriesOrder: 9
abstract: "Line Heightを、単なる『空白の量』ではなく、各行を区別しながらparagraphとしてのまとまりを保つ距離として捉える。USWDSの実践的なline-height guidanceとWCAG 1.4.12の適応可能性を混同せず、活版印刷のleadingからWeb typography、Proximity、Measureまでを一本につなぐ。"
---

# Line Height――行間は「空白」ではなく、行を分けながら文章をつなぐ距離
## Design Literacy #9｜Typographyを情報設計として見る

**Line height is not decoration. It controls how lines remain distinct without leaving the paragraph.**

Webの本文を見て「ちょっと詰まっているな」と感じると、つい`line-height: 1.6`のような数字へ飛びつきたくなる。

でも、本当に見るべきなのは数字そのものではない。

**1行ずつは区別できるか。けれどparagraph全体は一つのまとまりとして見えるか。**

今回のテーマは、**Line Height / Leading（行間）**。

## 1. まず一言：行間は、行を分けながら文章をつなぐ

たとえば、同じ16pxの本文でもline-heightが違うと、文字の見え方は大きく変わる。

```text
TIGHT

これは本文ですこれは本文です
これは本文ですこれは本文です
これは本文ですこれは本文です
```

行同士が近すぎると、一つ一つの行を追いにくくなる。

逆に、広げすぎると、

```text
LOOSE

これは本文ですこれは本文です

これは本文ですこれは本文です

これは本文ですこれは本文です
```

各行が別々のブロックのように見え始める。

だからline heightは、

**Separation**
と
**Grouping**

の間を調整する操作として考えると分かりやすい。

## 2. 仕組み：Font Sizeだけでは決まらない

CSSでは、たとえば16pxの文字に24pxのline-heightを与えると、比率は1.5になる。

```css
body {
  font-size: 16px;
  line-height: 1.5;
}
```

ただし、**1.5が普遍的な正解という意味ではない。**

U.S. Web Design System（USWDS）は、line heightを「text blockのvertical rhythmとdensityを制御するもの」と説明し、1〜2行程度のheadingではおおむね1〜1.35、長いrunning textでは1.5以上を一つのガイドとしている。

さらにUSWDSには、長い行ではline-to-lineの移動を助けるためline heightを増やす考え方がある一方、長すぎる行に対してline heightを増やしすぎると、各行が強く分離しすぎる場合もあるという注意もある。

[U.S. Web Design System — Typography](https://designsystem.digital.gov/components/typography/)

つまり、実務では少なくとも次を同時に見る。

```text
Typeface
   ×
Font Size
   ×
Line Length / Measure
   ×
Text Purpose
   ×
Reading Context
   ↓
Line Height
```

「本文だから1.6」ではなく、**複数の条件に対する調整値**として扱う。

## 3. Before → After：「詰まっている」を診断可能な言葉へ変える

たとえばニュース記事。

### BEFORE

```text
16px / line-height 1.15

試合は序盤から激しい展開となり、
両チームが中盤でボールを奪い合う
時間が続いた。浦和は徐々にボールを
保持する時間を増やしていった。
```

ここで問題なのは「なんとなく窮屈」だけではない。

**各行の境界が弱く、次の行を独立したreading unitとして追いにくい。**

### AFTER

```text
16px / line-height 1.6

試合は序盤から激しい展開となり、
両チームが中盤でボールを奪い合う
時間が続いた。浦和は徐々にボールを
保持する時間を増やしていった。
```

文字サイズも情報量も変えていない。

それでも、行の識別はしやすくなる。

ただし、ここで「1.6だから正しい」と覚えない。

**どこまで広げると、同じparagraphとしてのまとまりが壊れ始めるか。**

そこまで見て初めて調整になる。

## 4. そのまま使える制作・修正指示

「行間を少し広げてください」では、判断基準が残らない。

制作指示なら、こう言える。

> **本文のline heightを、font sizeだけでなくline lengthと文章量を基準に再調整してください。各行を追いやすくしつつ、同じparagraphとしてのまとまりが失われない密度を探してください。**

Web制作では、もう少し具体化できる。

> **長文本文はまず1.5〜1.7程度を検証起点にし、実際のfont family・本文幅・日本語表示で読み比べて決定してください。headingとbodyに同じline-height ratioを機械的に適用しないでください。**

ここでの`1.5〜1.7`は**実装開始時の仮説**であって、規格ではない。

レビュー時の短縮版は、

> **「この行間は、行を分けるため？ それとも文章を一つに見せるため？」**

でもいい。

## 5. Leadingという言葉は、物理的な「鉛」から来ている

ここで少し歴史へ戻る。

Typographyではline spacingを**leading（レディング）**とも呼ぶ。

この言葉は、metal typeの組版で行と行の間へ**lead（鉛）のstripを挟み、垂直方向の間隔を増やしたこと**に由来する。Monotypeも、leadingの本来の意味を「metal typeの行間へlead stripsを挿入すること」と説明している。

[Monotype — Typography Terms and Definitions](https://www.monotype.com/resources/expertise/typography-terms-and-definitions)

デジタルでは物理的な鉛は消えた。

でも問題は残っている。

**文字の行を、どの距離で連続させるか。**

活版印刷でもCSSでも、媒体が変わってもこの設計判断はなくならない。

ここから先は解釈だが、line heightは「余白を足す装飾」ではなく、**連続する情報単位の関係を調整する技術**として見る方が、本質に近づきやすい。

## 6. Accessibility：WCAGの「1.5」を誤読しない

WCAG 2.2のSuccess Criterion 1.4.12 **Text Spacing（Level AA）**では、ユーザーがline heightをfont sizeの**1.5倍以上**へ変更するなどのtext spacing overrideを行っても、contentやfunctionalityが失われないことを求めている。

[W3C — Understanding SC 1.4.12 Text Spacing](https://www.w3.org/WAI/WCAG22/Understanding/text-spacing)

ここは重要なので、はっきり分ける。

**WCAGは、すべての本文を最初から`line-height: 1.5`に設定しろとは要求していない。**

W3C自身が、contentはこれらの値を使う必要はなく、**userがspacingをoverrideしたときにcontentやfunctionalityが失われないこと**が要件だと明記している。

つまり、

```text
USWDS
→ authored typographyの実践的guidance

WCAG 1.4.12
→ user-defined spacingに耐えられるadaptability
```

であり、目的が違う。

数字だけ抜き出して同じルールとして扱わない。

## 7. 誤解しやすい点：「余白が多いほど読みやすい」は違う

line heightを増やすと、画面は少し上品で静かに見えやすい。

だから、見た目を洗練させようとして過剰に広げることがある。

でも、各行の間が広がりすぎるとProximityが弱くなり、paragraphとしてのまとまりが失われる。

```text
近すぎる
→ 行同士を区別しにくい

遠すぎる
→ 同じparagraphとしてまとまりにくい

適切
→ 行は分かれるが、paragraphはつながる
```

Line Heightは「white spaceを増やす技法」ではなく、**情報単位の距離を調整する技法**や。

## 8. 以前の学びとの接続：Typographyは小さなInformation Architecture

以前扱ったProximityは、

**近いものはまとまりとして知覚されやすい**

という原理だった。

これを文字レベルまで縮小すると、

```text
Character
↓
Word
↓
Line
↓
Paragraph
↓
Section
```

すべてに距離によるGroupingが存在する。

ここで前より一段解像度を上げる。

**Typography is information architecture at a smaller scale.**

情報設計は、ページやカードの階層だけではない。

文字の一行一行にも、「どこまでが同じ塊か」という設計がある。

だからLine HeightはMICROなタイポグラフィであると同時に、MESOなInformation Architectureにも接続する。

## 9. 30秒でできる観察

今読んでいるWeb記事を一つ開く。

文字の意味をいったん無視して、本文を**横長の灰色い帯**として見る。

次の3点だけ確認する。

```text
1. 各行を別々の帯として識別できる？
2. paragraph全体は一つの塊に見える？
3. 1行が長いのに、line heightまで詰まっていない？
```

可能ならDevToolsで、

```text
1.2
↓
1.5
↓
1.8
```

と動かしてみる。

正解値を探すのではなく、**どのあたりで「密すぎる」が「ばらけすぎる」へ反転するか**を見る。

その境界を見る練習が、数字暗記よりずっと役に立つ。

## 10. Next Concept：Measure / Line Length

Line Heightだけ見ても、本文設計は完成しない。

次に見るべきは、**Measure / Line Length（1行の長さ）**。

USWDSは、一般的な本文について45〜90 characters程度を読みやすい範囲として挙げ、長文では66 characters前後を一つのtargetとしている。

ただし、これはLatin alphabet中心のcharacter countをそのまま日本語へ移植できるという意味ではない。W3CもText Spacingで、languageやscriptによって適用できるspacing propertyが異なることを明示している。

つまり次は、

```text
Line Height
      ×
Line Length
      ↓
Reading Rhythm
```

として見る。

**「行間を何倍にするか？」から、「1行をどこまで読ませるか？」へ。**

今日の中心命題はこれ。

**Line height is not empty space. It is the distance that keeps lines distinct while keeping the paragraph together.**

日本語なら、

**行間は、行を分けながら文章をつなぐ距離。**

これだけ覚えておけばいい。

## 参考資料

- [W3C — Understanding SC 1.4.12 Text Spacing](https://www.w3.org/WAI/WCAG22/Understanding/text-spacing)
- [W3C — Technique C21: Specifying line spacing in CSS](https://www.w3.org/WAI/WCAG22/Techniques/css/C21)
- [U.S. Web Design System — Typography](https://designsystem.digital.gov/components/typography/)
- [U.S. Web Design System — Line height](https://designsystem.digital.gov/design-tokens/typesetting/line-height/)
- [Monotype — Typography Terms and Definitions](https://www.monotype.com/resources/expertise/typography-terms-and-definitions)
