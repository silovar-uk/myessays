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
abstract: 「PCは3列」という、ごく普通の制作指示を疑う。280px以上のカードを24pxのgapで並べると、584px、888px、1192pxという妙な幅で列数が自然に増える。CSS Gridのminmax()とauto-fit、Jen Simmonsが提案したIntrinsic Web Designをたどり、デザイナーの仕事を「完成形を指定すること」から「意味のある制約を設計すること」へ捉え直す。
---

# 「3列にしてください」をやめたら、ブラウザーが勝手に4列にした

Web制作で「PCは3列、タブレットは2列、スマホは1列」と指示することがある。

自然すぎて、ほとんど疑わない。

しかし、カードが4枚あり、それぞれ**最低280pxは必要**で、カード間のgapを**24px**にしたとする。

すると、4列が成立する最小幅はこうなる。

```text
280 × 4 + 24 × 3
= 1192px
```

つまり、コンテナー幅が1191pxでは3列、1192pxでは4列になれる。

**1192px。**

iPadでもMacBookでもない。デザイン業界で特に愛されている数字でもない。

なのに、そこがbreakpointになる。

誰も1192pxを指定していないのに。

今回はこの妙な数字から、Intrinsic Web Designを調べる。

## FACT｜「3列」は条件ではなく、条件から生まれた結果かもしれない

よくあるCSSはこうなる。

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

ここでは、designerが列数を直接指定している。

```text
幅 < 768       → 1列
768〜1199      → 2列
1200以上       → 3列
```

一方で、カード側の本当の要件が「280pxより狭くなると情報が苦しい」だけなら、別の書き方ができる。

```css
.cards {
  display: grid;
  grid-template-columns:
    repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}
```

W3CのCSS Grid仕様では、`auto-fill`はgapを含めてoverflowしない最大個数のtrackを繰り返す。`auto-fit`は基本的に同じようにtrack数を決めたあと、空のtrackをcollapseする。`minmax()`はtrackの最小値と最大値の範囲を定義する。

Source: https://www.w3.org/TR/css-grid/#auto-repeat  
Source: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/minmax

ここでは、「3列にする」という命令が消えている。

残ったのは、

> **カードを280px未満にしない。余った空間は分け合う。**

という条件だけである。

## もう一歩やりすぎる｜幅を1pxずつ増やして、列が増える瞬間を全部出す

カードが十分な枚数あるとして、minimum 280px、gap 24pxのGridを考える。

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

見事に、よく見るdevice breakpointから外れている。

```text
583 → 584px
1列     2列

887 → 888px
2列     3列

1191 → 1192px
3列      4列
```

1192pxに何か思想があるわけではない。

**280pxのカードが4枚、24pxの隙間を3本つけても入る。**

ただそれだけである。

ところが、この「ただそれだけ」が重要だった。

breakpointをdeviceの名前から決めるのではなく、**contentが成立する条件からbreakpointが発生している**からだ。

## `minmax()`は、サイズを決める関数ではなく「許容範囲」を決める関数

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

ここで設計対象が微妙に変わる。

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

そして最終的な列数は、available spaceとカード数からbrowserが計算する。

**designerが答えを指定する代わりに、答えが成立する条件を指定する。**

## 画像で見る｜2018年、Jen Simmonsは「Intrinsic Web Design」という名前を提案した

![Jen Simmons「Designing Intrinsic Layouts」のWebレイアウト史スライド](https://on.notist.cloud/slides/deck2796/large-2.jpg)

*Figure: Jen Simmons, “Designing Intrinsic Layouts”. Source: https://talks.jensimmons.com/15TjNW/designing-intrinsic-layouts*

Jen Simmonsは2018年の講演「Everything You Know About Web Design Just Changed」で、CSS Gridだけではない新しいWeb designの状況に対して、**Intrinsic Web Design**という呼び名を提案した。

Source: https://talks.jensimmons.com/jugbbe/everything-you-know-about-web-design-just-changed

講演では、textのreflow、要素のgrow / shrink、contentのwrap、必要に応じたwhitespaceの増減などを組み合わせ、固定的な画面の完成形だけでは捉えにくいWeb layoutを説明している。

翌2019年の「Designing Intrinsic Layouts」では、CSS Grid、Flexbox、Multicolumn、Flow、Writing Modesなどを組み合わせ、accessibleでreusableなpage / component layoutをどう作るかへ踏み込んだ。

Source: https://talks.jensimmons.com/dPCXFv/designing-intrinsic-layouts

ここで注意したい。

Intrinsic Web Designは、

> `repeat(auto-fit, minmax())`を書く流派

という話ではない。

それは一つの実装パターンにすぎない。

中心にあるのは、**content、available space、intrinsic size、authorが与えたconstraintの相互作用からlayoutを作る**という考え方である。

## 再リサーチ｜Webはもともと、designerの言うことを完全には聞かない

これは少し面白い。

紙なら、A4は急に横幅が20%増えない。

ポスターに読者が「文字を200%にしてください」と命令することもない。

Webは違う。

- window幅が変わる
- browser zoomが変わる
- font size設定が変わる
- 翻訳で文字列が伸びる
- contentの件数が増える
- sidebarへ移される
- componentが別のcontainerへ入る

つまり、Web layoutは最初からかなり落ち着きがない。

この不安定さに対して、長いあいだdesigner側は「固定幅」「12-column framework」「device breakpoint」のような外側の骨格を強く与えてきた。

SimmonsのIntrinsic Web Designは、それらを全部否定するというより、modern CSSが増やした`min-content`、`max-content`、`fr`、`minmax()`、Grid、Flexboxなどを使い、**Webが本来持っている変化可能性をlayoutの材料として扱いやすくなった**という提案だった、と読む方が正確である。

実際、彼女の2019年のスライドにはfixed lengthだけでなく、`min-content`、`max-content`、percentage、`fr`、`minmax()`、`auto`が並んでいる。

Source: https://talks.jensimmons.com/OlkvV7/designing-intrinsic-layouts

## INTERPRETATION｜designerの仕事が「結果」から「制約」へ少し移る

ここからは解釈である。

「PCでは3列」という指示は、完成形を説明している。

「カードは280px未満にしない」は、品質条件を説明している。

似ているようで、かなり違う。

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

前者ではdesignerがlayoutの答えを持つ。

後者ではdesignerは、**何を守れば良いlayoutなのか**を決める。

この変化は、designerの権限を減らすというより、判断する場所を変える。

「4列か3列か」より先に、

- このカードはどこまで狭くても読めるか
- imageとtextの比率はどこで破綻するか
- CTAが2行になっても良いか
- localizationで長い文字列が来ても持つか
- userがtextを大きくしたとき何が起きるか

を考える。

列数より、設計として難しい。

## 誤解しやすい点｜「browserに丸投げ」ではない

Intrinsicという言葉だけ見ると、

> contentを入れたらbrowserが勝手に最高のlayoutを作ってくれる

ように聞こえる。

そんな便利な話ではない。

先ほどのCSSにも、しっかり人間の判断が入っている。

```css
minmax(280px, 1fr)
```

**280pxを誰が決めたのか。**

designerである。

`gap: 24px`も、画像比率も、最大行数も、優先順位も、人間が決める。

さらに、`auto-fit`で自動的に列が増えることが常に望ましいわけでもない。

例えば4列になるとcardの視線移動が忙しくなる、editorial hierarchyが崩れる、比較したい項目が離れすぎる、といった理由で、最大3列に止めたい場合もある。

**Automatic layout is not automatic design.**

browserはconstraintを忠実に計算する。

そのconstraintが良いかどうかまでは決めてくれない。

## Before → After｜制作指示の主語を変える

### Before

```text
PC：3列
Tablet：2列
Mobile：1列
breakpoint：768px / 1200px
```

実装は明快である。

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

> **3列は要件なのか、それとも別の要件から生まれた結果なのか。**

と一度聞けることだ。

## 前回までとの接続｜値 → 関係 → 環境 → 制約

ここ数回のDesign Literacyは、実は同じ方向へ進んでいる。

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

少し抽象化すると、

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

そこから、「28〜40pxの間」「このcontainerで使える幅」「280px未満にはしない」と、設計の焦点が一段ずつrule側へ移っている。

ここまで来ると、design systemも「正しい値の辞書」だけではなくなる。

**どの条件なら、どの振る舞いを許すかというルールの集合**として見えてくる。

## 30秒でできる観察｜「その数字、結果ですか？ 条件ですか？」

今作っている画面を一つ開く。

数字を三つ探す。

例えば、

```text
3 columns
1200px breakpoint
320px card width
```

一個ずつ、こう聞く。

> **これは守るべき条件か、それとも条件からたまたま出た結果か？**

「3列」は結果かもしれない。

「320px」は「本文が読みやすい最小幅」という条件かもしれない。

「1200px」は、その二つをつないだ結果かもしれない。

全部を消す必要はない。

**数字の役割を分類するだけで、制作指示の精度が上がる。**

## 次につながる概念｜Content-driven Breakpoints

では、280pxはどう決めるのか。

ここで次の問題が出る。

280pxがBootstrapっぽいから、では意味がない。

カードを少しずつ狭くして、

- titleが不自然に3行になる
- button labelが折れる
- imageが情報として小さすぎる
- metadataが衝突する

という**contentが壊れる瞬間**を探す方が筋が良い。

つまり、次はdevice breakpointではなく、

**Content-driven Breakpoint**

を見る。

「iPad幅だから変える」ではなく、

> **このcontentが、このlayoutでは成立しなくなったから変える。**

というbreakpointである。

すると今回の1192pxも、急に変な数字ではなくなる。

## そのまま使える制作・修正指示

> カード一覧や反復componentのresponsive設計では、PC / Tablet / Mobileごとの列数を固定する前に、componentが情報密度・可読性・操作性を保てるminimum widthを定義してください。そのminimumとgapから列数を自動決定できる場合は、CSS Gridの`repeat()`、`auto-fit` / `auto-fill`、`minmax()`などのintrinsicな仕組みを検討してください。列数そのものにeditorialな意味がある場合はmaximum columnsを別途制約として与えます。breakpointはdevice名ではなく、contentまたはlayoutが成立しなくなる地点から説明できる状態を目指してください。

短く言えば、

> **「3列にしてください」ではなく、「3列になる理由をください」。**

最初は、1192pxというbreakpointが妙に見えた。

調べたあとでは、むしろ768pxや1200pxの方が少し不思議に見える。

1192pxには、少なくとも理由がある。

カード4枚と、必要な幅と、隙間を足したら、そこだった。

**良いresponsive designは、数字をきれいにすることではなく、数字の出どころを説明できることなのかもしれない。**

## 参考資料

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
