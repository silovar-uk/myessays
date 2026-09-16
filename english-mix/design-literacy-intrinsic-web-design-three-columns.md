---
id: design-literacy-intrinsic-web-design-three-columns
title: 「3列にしてください」をやめたら、ブラウザーが勝手に4列にした
subtitle: Design Literacy #50｜Intrinsic Web Design / CSS Grid / Constraint-based Layout
created: 2026-09-16
updated: 2026-09-16
type: Essay
status: published
tags: ["Design Literacy", "Intrinsic Web Design", "CSS Grid", "Responsive Design", "Constraint Design"]
keywords: ["Intrinsic Web Design", "Intrinsic Layout", "CSS Grid", "minmax()", "auto-fit", "auto-fill", "min-content", "max-content", "Constraint-based Design", "Content-driven Breakpoints", "Jen Simmons"]
favorite: false
grow: true
series: Design Literacy｜細部から思想まで
seriesOrder: 50
abstract: 「PCは3列」というordinary briefを疑う。280px以上のcardを24px gapで並べると、584px、888px、1192pxというstrange widthsでcolumn countが自然に増える。CSS Gridのminmax()とauto-fit、Jen Simmonsが提案したIntrinsic Web Designをたどり、designerの仕事を「finished outcomeの指定」から「meaningful constraintsの設計」へ捉え直す。
---

# 「3列にしてください」をやめたら、ブラウザーが勝手に4列にした

Web productionで「PCは3列、タブレットは2列、スマホは1列」と指示することがある。

It feels so normal that、ほとんど疑わない。

しかし、カードが4枚あり、それぞれ**minimum 280px is needed**で、cardsのgapを**24px**にしたとする。

すると、4列が成立するminimum widthはこうなる。

```text
280 × 4 + 24 × 3
= 1192px
```

つまり、container widthが1191pxでは3列、1192pxでは4列になれる。

**1192px。**

iPadでもMacBookでもない。design worldでespecially beloved numberでもない。

なのに、そこがbreakpointになる。

Nobody specified 1192px、なのに。

今回はthis strange numberから、Intrinsic Web Designを調べる。

## FACT｜「3列」は条件ではなく、条件から生まれた結果かもしれない

A common CSSはこうなる。

```css
.cards {
  display: grid;
  grid-template-columns: 1fr;
}

@media (min-width: 768px) {
  .cards {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1200px) {
  .cards {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

ここでは、designerがcolumn countをdirectly指定している。

```text
幅 < 768       → 1列
768〜1199      → 2列
1200以上       → 3列
```

一方で、card側のreal requirementが「280pxより狭くなると情報が苦しい」だけなら、別のwayで書ける。

```css
.cards {
  display: grid;
  grid-template-columns:
    repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}
```

W3CのCSS Grid仕様では、`auto-fill`はgapを含めてoverflowしない最大個数のtrackをrepeatする。`auto-fit`はbasically同じlogicでtrack数を決めたあと、空のtrackをcollapseする。`minmax()`はtrackのminimumとmaximumのrangeを定義する。

Source: https://www.w3.org/TR/css-grid/#auto-repeat  
Source: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/minmax

ここでは、「3列にする」というcommandが消えている。

What remains is、

> **カードを280px未満にしない。余った空間は分け合う。**

というconstraintだけである。

## もう一歩やりすぎる｜幅を1pxずつ増やして、列が増える瞬間を全部出す

Assume there are enough cards、minimum 280px、gap 24pxのGridを考える。

n列が成立する最低幅は、

```text
必要幅 = 280 × n + 24 × (n - 1)
```

なので、

```text
1列   280px
2列   584px
3列   888px
4列  1192px
5列  1496px
```

になる。

見事に、common device breakpointsから外れている。

```text
583 → 584px
1列     2列

887 → 888px
2列     3列

1191 → 1192px
3列      4列
```

1192pxにthere is no special philosophy。

**280pxのカードが4枚、24pxの隙間を3本つけても入る。**

That is literally all.

But that “just that” is the important part.

breakpointをdeviceの名前から決めるのではなく、**conditions where content worksからbreakpointが発生している**からだ。

## `minmax()`は、a function that chooses sizeではなく「allowed range」を決める関数

MDNは`minmax()`を、min以上max以下のsize rangeを定義するCSS Grid用の関数として説明している。

Source: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/minmax

```css
minmax(280px, 1fr)
```

は「280pxにする」という意味ではない。

```text
最低 280px
    ↓
ここから伸びてもよい
    ↓
残りの空間を1frとして分配
```

である。

ここでdesign targetが微妙に変わる。

```text
OUTCOME
3列にする
```

ではなく、

```text
CONSTRAINT
カードは280px未満にしない
```

になる。

そしてfinal column countは、available spaceとnumber of cardsからbrowser computes。

**Instead of specifying the answer、designer specifies the conditions that make an answer possible.**

## 画像で見る｜2018年、Jen Simmonsは「Intrinsic Web Design」というnameをproposeした

![Jen Simmons「Designing Intrinsic Layouts」のWebレイアウト史スライド](https://on.notist.cloud/slides/deck2796/large-2.jpg)

*Figure: Jen Simmons, “Designing Intrinsic Layouts”. Source: https://talks.jensimmons.com/15TjNW/designing-intrinsic-layouts*

Jen Simmonsは2018年の講演「Everything You Know About Web Design Just Changed」で、CSS Gridだけではないnew web design realityに対して、**Intrinsic Web Design**というnameをproposeした。

Source: https://talks.jensimmons.com/jugbbe/everything-you-know-about-web-design-just-changed

講演では、textのreflow、要素のgrow / shrink、contentのwrap、必要に応じたwhitespaceの増減などを組み合わせ、fixed finished screensだけでは捉えにくいWeb layoutを説明している。

翌2019年の「Designing Intrinsic Layouts」では、CSS Grid、Flexbox、Multicolumn、Flow、Writing Modesなどを組み合わせ、accessibleでreusableなpage / component layoutをhow to build themへ踏み込んだ。

Source: https://talks.jensimmons.com/dPCXFv/designing-intrinsic-layouts

One caution here.

Intrinsic Web Designは、

> `repeat(auto-fit, minmax())`を書く流派

という話ではない。

それはone implementation patternにすぎない。

The core idea is、**content、available space、intrinsic size、authorが与えたconstraintのinteractionからlayoutを作る**という考え方である。

## 再リサーチ｜Webはもともと、designerの言うことを完全には聞かない

これはThis is slightly funny.

On paper、A4は急に横幅が20%増えない。

ポスターに読者が「文字を200%にしてください」と命令することもない。

The web is different.

- window幅が変わる
- browser zoomが変わる
- font size設定が変わる
- 翻訳で文字列が伸びる
- contentの件数が増える
- sidebarへ移される
- componentが別のcontainerへ入る

つまり、Web layoutは最初からかなりrestless。

この不安定さに対して、長いあいだdesigner側は「固定幅」「12-column framework」「device breakpoint」のようなexternal skeletonを強く与えてきた。

SimmonsのIntrinsic Web Designは、それらをreject all of themというより、modern CSSが増やした`min-content`、`max-content`、`fr`、`minmax()`、Grid、Flexboxなどを使い、**Webが本来持っているcapacity to changeをlayoutのeasier to treat as design material**という提案だった、と読む方が正確である。

実際、彼女の2019年のスライドにはfixed lengthだけでなく、`min-content`、`max-content`、percentage、`fr`、`minmax()`、`auto`が並んでいる。

Source: https://talks.jensimmons.com/OlkvV7/designing-intrinsic-layouts

## INTERPRETATION｜designerの仕事が「結果」から「制約」へ少し移る

From here、interpretation.

「PCでは3列」という指示は、describes the outcome。

「カードは280px未満にしない」は、describes the quality constraint。

They look similar、but they are structurally different.

```text
RESULT-FIRST

PC
↓
3 columns
↓
CARD
```

から、

```text
CONSTRAINT-FIRST

CARD needs ≥ 280px
        +
available space
        ↓
layout emerges
```

へ移る。

前者ではdesignerがthe layout answerを持つ。

後者ではdesignerは、**what conditions make the layout good**を決める。

この変化は、designerの権限を減らすというより、where judgment happensを変える。

「4列か3列か」より先に、

- このカードはどこまで狭くても読めるか
- imageとtextの比率はどこで破綻するか
- CTAが2行になっても良いか
- localizationで長い文字列が来ても持つか
- userがtextを大きくしたとき何が起きるか

を考える。

This is harder than picking a column count.

## Common misunderstanding｜「browserに丸投げ」ではない

Intrinsicという言葉だけ見ると、

> contentを入れたらbrowserが勝手に最高のlayoutを作ってくれる

ように聞こえる。

そんなconvenient magicではない。

先ほどのCSSにも、しっかりhuman judgmentが入っている。

```css
minmax(280px, 1fr)
```

**280pxをwho decided it?**

The designer did.

`gap: 24px`も、画像比率も、最大行数も、優先順位も、人間が決める。

さらに、`auto-fit`でcolumns automatically increaseことがalways desirableわけでもない。

例えば4列になるとcardの視線移動が忙しくなる、editorial hierarchyが崩れる、比較したい項目が離れすぎる、といった理由で、cap it at 3 columns場合もある。

**Automatic layout is not automatic design.**

browserはconstraintをfaithfully computes。

そのconstraintがwhether they are goodまでは決めてくれない。

## Before → After｜the subject of the production briefを変える

### Before

```text
PC：3列
Tablet：2列
Mobile：1列
breakpoint：768px / 1200px
```

implementation is clearである。

一方で、「なぜその幅で列数が変わるか」はdevice categoryに寄りやすい。

### After

```text
CARD
minimum readable width：280px
preferred gap：24px
maximum columns：必要なら3列で制限
image：16:9
text：title 2 linesまで
```

そしてlayout側で、

```css
grid-template-columns:
  repeat(auto-fit, minmax(280px, 1fr));
```

を候補にする。

こちらでは、制作指示が「画面ごとの答え」から**componentが成立する条件**へ近づく。

もちろん、案件によってBeforeの方が適切なこともある。

重要なのは、3列を見た瞬間に「3列」と写経するのではなく、

> **3列はa requirement、それともan outcome produced by other requirements。**

と一度聞けることだ。

## Connection to earlier lessons｜値 → 関係 → 環境 → 制約

ここ数回のDesign Literacyは、are actually moving in the same direction。

```text
#47 Type Scale
値同士の関係を作る

#48 Fluid Typography
関係そのものを変化させる

#49 Container Queries
component自身の環境を見る

#50 Intrinsic Web Design
結果ではなく成立条件を指定する
```

Abstracted one step、

```text
VALUE
  ↓
RELATIONSHIP
  ↓
CONTEXT
  ↓
CONSTRAINT
```

になる。

最初は「40px」「3列」のような答えを指定していた。

そこから、「28〜40pxの間」「このcontainerで使える幅」「280px未満にはしない」と、design focusが一段ずつrule側へ移っている。

ここまで来ると、design systemも「正しい値の辞書」だけではなくなる。

**どの条件なら、どの振る舞いを許すかというa set of behavioral rules**として見えてくる。

## 30-second observation｜「その数字、結果ですか？ 条件ですか？」

今作っている画面を一つ開く。

pick three numbers。

例えば、

```text
3 columns
1200px breakpoint
320px card width
```

一個ずつ、こう聞く。

> **これはa constraint to preserveか、それとも条件からan incidental outcomeか？**

「3列」は結果かもしれない。

「320px」は「本文が読みやすいminimum width」という条件かもしれない。

「1200px」は、その二つをつないだ結果かもしれない。

全部を消す必要はない。

**Just classifying each number’s role、raises the precision of the brief。**

## Next concept｜Content-driven Breakpoints

では、280pxはhow do we decide it。

ここでnext problemが出る。

280pxがBootstrapっぽいから、では意味がない。

カードを少しずつ狭くして、

- titleが不自然に3行になる
- button labelが折れる
- imageが情報として小さすぎる
- metadataが衝突する

という**the moment content breaks**を探す方がis a better logic。

つまり、次はnot device breakpoints but、

**Content-driven Breakpoint**

を見る。

「iPad幅だから変える」ではなく、

> **このcontentが、このlayoutでは成立しなくなったから変える。**

というbreakpointである。

すると今回の1192pxも、stops looking arbitrary。

## Copy-ready production / revision instruction

> カード一覧や反復componentのresponsive設計では、PC / Tablet / Mobileごとの列数を固定する前に、componentが情報密度・可読性・操作性を保てるminimum widthを定義してください。そのminimumとgapから列数を自動決定できる場合は、CSS Gridの`repeat()`、`auto-fit` / `auto-fill`、`minmax()`などのintrinsicな仕組みを検討してください。列数そのものにeditorialな意味がある場合はmaximum columnsを別途制約として与えます。breakpointはdevice名ではなく、contentまたはlayoutが成立しなくなる地点から説明できる状態を目指してください。

In one line、

> **「3列にしてください」ではなく、「3列になる理由をください」。**

At first、1192px looked like a bizarre breakpoint.

After researching it、むしろ768pxや1200pxの方が少しmysteriousに見える。

1192pxには、at least has a reason。

カード4枚と、必要な幅と、隙間を足したら、そこだった。

**Good responsive designは、数字をきれいにすることではなく、where the numbers come fromを説明できることなのかもしれない。**

## References

- Jen Simmons, “Everything You Know About Web Design Just Changed”  
  https://talks.jensimmons.com/jugbbe/everything-you-know-about-web-design-just-changed
- Jen Simmons, “Designing Intrinsic Layouts”  
  https://talks.jensimmons.com/dPCXFv/designing-intrinsic-layouts
- Jen Simmons, Web Design Experiments  
  https://labs.jensimmons.com/
- W3C, CSS Grid Layout Module Level 2  
  https://www.w3.org/TR/css-grid/
- MDN, `minmax()`  
  https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/minmax
- MDN, Auto-placement in grid layout  
  https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Grid_layout/Auto-placement
