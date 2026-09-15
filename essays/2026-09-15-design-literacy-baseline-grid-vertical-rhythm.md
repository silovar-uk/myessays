---
id: design-literacy-baseline-grid-vertical-rhythm
title: 文字は揃っているのに、なぜページ全体が微妙にガタついて見えるのか
subtitle: Design Literacy #46｜Baseline Grid / Leading / Vertical Rhythm
created: 2026-09-15
updated: 2026-09-15
type: Essay
status: published
tags: ["Design Literacy", "Typography", "Baseline Grid", "Vertical Rhythm", "UI"]
keywords: ["Baseline Grid", "Baseline", "Leading", "Line Height", "Vertical Rhythm", "Font Metrics", "Swiss Style", "CSS Inline Layout"]
favorite: false
grow: true
series: Design Literacy｜細部から思想まで
seriesOrder: 46
abstract: paddingもgridも揃っている。それでも文字だけが妙にガタつく。原因を「箱」ではなく文字が座るbaselineから調べると、印刷のgridと現代CSSの間に、似ているようで同じではない設計問題が見えてくる。
---

# 文字は揃っているのに、なぜページ全体が微妙にガタついて見えるのか

カードを二枚作った。

左右ともpaddingは16px。幅も同じ。見出しのfont-sizeも同じ。CSS Gridもきれいに効いている。

なのに、**文字だけが微妙にガタついて見える。**

```text
┌──────────────┐  ┌──────────────┐
│ TITLE        │  │ TITLE        │
│ 本文です     │  │ 本文です     │
│ 本文です     │  │              │
│              │  │ 本文です     │
└──────────────┘  └──────────────┘
```

箱は揃っている。

文字も同じサイズである。

じゃあ何が揃っていないのか。

答えを先に言うと、**文字は箱の下端に座っていない。**

急に家具の話みたいになった。

今回は、この「文字がどこに座っているのか」を追いかける。Baseline Gridの話である。

## FACT｜文字には「床」がある。ただし世界共通の床ではない

W3CのCSS Inline Layout仕様では、baselineを、line boxのinline axisに沿ってglyphを揃えるための線として定義している。Latin、Cyrillic、Greekなどではalphabetic baselineが一般的で、多くの文字がその上に乗り、`g`や`p`のようなdescenderが下へ伸びる。

しかし、ここでいきなり注意書きが入る。

**Different writing systems prefer different baselines.**

Latin系ではalphabetic baseline、Indic scriptsではhanging baselineが使われる場合があり、Han-based systemsではglyphがsquareを満たすよう設計されるため、同じ「文字はこの線に座る」という説明をそのまま世界共通ルールにはできない。

Source: https://www.w3.org/TR/css-inline-3/

つまり「baseline」という言葉を覚えた瞬間に、baselineは一種類ではないと教えられる。

デザイン、たまにチュートリアルの入口でいきなり階段を増築してくる。

## まず、font-sizeを見るのをやめてみる

例えば本文をこうする。

```css
font-size: 16px;
line-height: 24px;
```

16pxの文字が24pxの透明な箱いっぱいに膨らんでいるわけではない。

概念的にはこうだ。

```text
────────────  line box top

      Hello
──────H──ll──  ← baseline
          ↓
       descender

────────────  line box bottom
```

さらにCSSではfontごとにascent、descentなどのmetricsがあり、`line-height`はline boxの高さの計算に関わる。W3C仕様でも、ascent/descentはfont全体のmetricsであり、個々のglyphの実際の輪郭そのものとは限らないとされている。

ここが重要である。

**16pxという数字だけ見ても、文字が画面上のどこに見えるかは全部分からない。**

Source: https://www.w3.org/TR/css-inline-3/

## もう一歩やりすぎる｜font-sizeを隠して、line-heightだけ並べる

普段のレビューでは、ついこう見る。

```text
TITLE   24px
BODY    16px
CAPTION 12px
```

今日はfont-sizeを隠す。

```text
TITLE   line-height 32px
BODY    line-height 24px
CAPTION line-height 20px
```

すると別の景色になる。

BODYは、

```text
24 → 48 → 72 → 96
```

と進む。

CAPTIONは、

```text
20 → 40 → 60 → 80
```

と進む。

最初に位置を合わせても、周期が違えば途中からズレる。

そこでBaseline Gridが登場する。

## Baseline Gridとは、文字用の横断歩道みたいなもの

Baseline Gridは、一定間隔で並んだhorizontal linesに文字のbaselineを合わせ、複数columnや異なるtext styleの間にvertical rhythmを作る方法である。

```text
LEFT                  RIGHT

Hello                  News
──────────── 24 ────────────
World                  9/15
──────────── 48 ────────────
Design                 Read
──────────── 72 ────────────
```

Column gridが「横方向の位置」を整理するなら、baseline gridは「縦方向の拍」を整理する。

ここで面白いのは、gridが突然、方眼紙ではなく**メトロノーム**に見えてくることだ。

## Before → After｜全部4の倍数でも、同じrhythmとは限らない

### Before

```text
BODY     16 / 24
CAPTION  12 / 20
```

24も20も4の倍数。

「4px gridに乗っています」と言いたくなる。

しかし、lineの周期として見ると24と20は別々に進む。

### Afterの一例

```text
BODY     16 / 24
CAPTION  12 / 24
```

これならbaseline間隔を共有しやすい。

ただし、captionまで24pxにすると広すぎる場面も当然ある。

その場合は、より細かなunitで関係を設計したり、意図的にrhythmを外したりする。

つまり正解は「全部24px」ではない。

**line-height同士に説明可能な関係を作ること。**

## 画像で見る｜baselineは本当に文字の下端ではない

![W3C CSS Inline Layout specification: alphabetic text, em-boxes and baseline](https://www.w3.org/TR/css-inline-3/images/baselines-simple.svg)

*Figure: W3C CSS Inline Layout Module Level 3. Source: https://www.w3.org/TR/css-inline-3/*

この図を見ると、文字のvisible outline、em-box、baselineが別物なのが分かる。

「font-size 16pxだから高さ16pxの物体」という理解が、かなり怪しくなる。

## 歴史へ行く｜Swiss Styleがbaselineを発明した、ではない

ここは雑にすると危ない。

GridそのものはSwiss Styleよりはるか以前から存在し、写本や印刷物でも文字を組織するための罫線や比例構成は使われてきた。20世紀中盤のInternational Typographic Styleでは、Max Bill、Emil Ruder、Josef Müller-Brockmannらが、modernistな問題意識の中でtypographic gridを体系的な設計手段として発展・普及させた。

Müller-Brockmannの仕事が重要なのは「gridを発明した」からではなく、文字、画像、余白を関係づけるsystemとしてgridを明示的に扱い、教育・実務へ広く定着させた点にある。

参考: https://www.thegraphicdesignschool.com/design-history/joseph-mueller-brockmann/

ここで朝のDesign Literacy #45「Spacing Scale」とつながる。

```text
SPACING SCALE
距離を毎回発明しない

BASELINE GRID
文字の縦位置を毎回発明しない
```

共通しているのは8pxでも24pxでもない。

**局所的な判断を、関係のsystemへ変えること。**

## でも、印刷のgridをそのままWebへ持ってくると事故る

ここで話が少し変わる。

Printでは固定されたpageとtype settingを前提に、baseline rhythmをかなり厳密に設計できる。

Webはそうではない。

viewportが変わる。文章量が変わる。fontがfallbackする。userが文字を拡大する。Latinと日本語が混ざる。variable fontもある。

さらにCSS Inline Layoutそのものが、font metricsや複数のbaseline typeを扱う複雑な仕組みになっている。

だから、

> 全要素を4px baselineに完全一致させる

を目的にすると、いつの間にか「人間が読むページ」ではなく「overlayを緑色にするゲーム」を始める危険がある。

Baseline Gridは道具であって、宗教ではない。

Müller-Brockmannのgrid思想も、単純な機械的服従として理解するより、複雑な情報へcoherenceを与えるための設計手段として見る方がいい。

## INTERPRETATION｜Gridは位置ではなく「時間」を設計しているのではないか

ここからは解釈。

Baseline Gridを調べる前、gridは「どこに置くか」の道具に見えていた。

```text
X = ここ
Y = ここ
```

でもvertical rhythmを考えると、少し違って見える。

```text
LINE
↓ 24
LINE
↓ 24
LINE
↓ 24
```

これは位置であると同時に、反復である。

音楽でいえば拍に近い。

読者はgrid線を見ない。それでも見出し、本文、caption、余白がある周期で繰り返されれば、ページにはtempoが生まれる。

**Grid is not only geometry. It can also be rhythm.**

もちろん、これは歴史的事実ではなく、baseline gridを現代UIへ持ち込むための解釈である。

## そのまま使える制作・修正指示

> 複数のテキストスタイルが混在する画面では、font-sizeだけでなくline-heightを一覧化してください。本文・補足・見出しのline-heightが共通のbaseline unitとどのような関係にあるか確認し、複数columnやcard間でvertical rhythmが不必要に崩れないよう調整してください。完全なpixel alignmentを目的化せず、可読性・多言語・responsive behaviorを優先したうえで例外を設計してください。

もっと短くするなら、

> **「font-sizeじゃなく、line-heightを並べて見せてください」**

## 30秒実験｜自分のサイトから「拍」を3つ拾う

いま作っているページを開く。

font-sizeは見ない。

line-heightを3つだけ拾う。

```text
20
24
32
```

なら、4pxという共通unitが見える。

```text
21
25
31
```

なら聞く。

**この3つ、なぜこの数字なのか。**

説明できれば残す。

説明できなければsystem化候補。

そして最後にもう一つ。

数字が揃っていても、実際の文字を目で見る。

Font metricsとoptical perceptionは、計算表そのものではないからだ。

## 次につながる概念｜Typographic Scale

Spacingのsystemを作った。

Line-heightのrhythmも見た。

次に残っているのはfont-sizeそのものだ。

```text
12 / 14 / 16 / 18 / 20 / 22
```

を毎回足し算で決めるのか。

それとも比率で階層を作るのか。

次は **Typographic Scale / Modular Scale** へ行くと、

```text
FONT SIZE
+
LINE HEIGHT
+
SPACING
```

が一つのsystemとしてつながり始める。

---

## 今日の中心命題

**Boxes align by edges. Type aligns by baselines.**

箱は端で揃う。

文字はbaselineを持つ。

最初は、paddingもgridも揃っているのに文字がガタつくのを「なんとなくフォントのせい」くらいに見ていた。

調べたあとでは、画面の中に今まで見えていなかった水平線が大量に見える。

しかも、その線は世界共通で一種類ですらない。

Latin、日本語、font metrics、line-height、responsive layout。それぞれを抱えながら、画面に一定のrhythmを作ろうとしている。

Baseline Gridとは、文字を軍隊みたいに整列させる規則ではない。

**違う文字たちに、同じ曲で演奏してもらうための譜面に近い。**

### 専門語 / Search terms

`Baseline Grid` / `Baseline` / `Alphabetic Baseline` / `Hanging Baseline` / `Leading` / `Line Height` / `Vertical Rhythm` / `Font Metrics` / `Ascent` / `Descent` / `Swiss Style` / `CSS Inline Layout`

### Sources

- W3C, CSS Inline Layout Module Level 3 — https://www.w3.org/TR/css-inline-3/
- The Graphic Design School, Josef Müller-Brockmann — https://www.thegraphicdesignschool.com/design-history/joseph-mueller-brockmann/
- Baseline HQ, Grid Systems — https://baselinehq.com/4-grid-systems.html
- Grid Maker Pro, Baseline grid and vertical rhythm — https://www.gridmakerpro.com/grids/typography-grids/baseline-grid/
