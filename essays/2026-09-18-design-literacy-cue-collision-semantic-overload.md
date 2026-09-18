---
id: design-literacy-cue-collision-semantic-overload
title: "全部同じ青なのに、なぜ分かりにくいのか？"
subtitle: "Design Literacy #56｜Similarityの次に考える「cue collision」と意味の過積載"
created: "2026-09-18"
updated: "2026-09-18"
type: "Essay"
status: "完成"
tags: ["Design Literacy", "UI", "Gestalt", "Similarity", "Signifier", "Accessibility", "Visual Language"]
keywords: ["cue collision", "semantic overload", "Similarity", "Gestalt", "visual cue", "signifier", "WCAG 1.4.1", "redundant cues", "visual vocabulary"]
favorite: 5
grow: 5
series: "Design Literacy｜細部から思想まで"
seriesOrder: 56
abstract: "同じ青をリンク、見出し、選択状態、CTA、装飾に使うと、統一感はあるのに意味が読みにくくなる。Similarityの復習で終わらず、複数の意味が一つのvisual cueへ衝突する「cue collision」という実務上の診断へ進み、Wertheimer、WCAG、Don Normanのsignifierを往復しながら、色を装飾ではなく語彙として設計する。"
---

# 全部同じ青なのに、なぜ分かりにくいのか？
## Design Literacy #56｜Similarityの次に考える「cue collision」と意味の過積載

画面を「統一」した。

リンクも青。見出しも青。選択中も青。CTAも青。ブランドの飾りも青。

かなり統一されている。

なのに、なぜか分かりにくい。

ここが今日の入口だ。

> **同じ見た目を増やせば、一貫性も増える。――本当にそうか？**

前回までに、Proximityは距離で関係をつくり、Similarityは似た視覚特徴によってまとまりを生みやすい、と見てきた。今回はSimilarityそのものをもう一度説明するのではなく、**Similarityを使いすぎたとき、何が壊れるか**を考える。

## 1. FACT｜Similarityは「同じ動作」を保証する法則ではない

Max Wertheimerは1923年の論文で、近接だけでなく、似た部分がまとまりとして知覚されやすい傾向をFactor of Similarityとして論じた。

Source: https://psychclassics.yorku.ca/Wertheimer/Forms/forms.htm

ここで線を引いておく。

Wertheimerが「同じ色のUIは同じ動作にせよ」と書いたわけではない。それは現代UIへの応用上の解釈だ。

ただ、似たものがまとまりとして知覚されやすいなら、画面で同じ色・形・文字スタイルを反復することは、**「これは同種らしい」という分類の手掛かり**になりうる。

つまり、色は飾りであると同時に、使い方次第で語彙になる。

![一つの青に五つの意味が集中する模式図](https://raw.githubusercontent.com/silovar-uk/myessays/main/assets/design-literacy-cue-collision/one-blue-five-meanings.svg)

*Figure 1: 同じBlueがlink / heading / selected / CTA / decorationを兼務すると、見た目の統一と意味の統一が一致しなくなる。Original diagram for this article.*

## 2. INTERPRETATION｜問題は「青が多い」ではなく、一つのcueに意味を積みすぎること

たとえば画面内の青を分類する。

~~~text
BLUE
├─ link
├─ selected
├─ CTA
├─ heading
└─ decoration
~~~

色数は少ない。パレットはきれいだ。

しかしユーザー側から見ると、青を見ただけでは役割が決まらない。

~~~text
青
↓
押せる？
選択中？
重要？
ただのブランド色？
~~~

毎回contextを読んで解決する必要がある。

この記事では、この状態を実務上の診断語として**cue collision**と呼ぶことにする。これはGestalt心理学の正式な法則名ではなく、**複数の意味が同じ視覚的手掛かりを奪い合っている状態を説明するための本稿の整理**だ。

問題は「青を使うな」ではない。

**一つのvisual cueに、互いに区別したい意味を背負わせすぎない。**

## 3. EXPERIMENT｜色を消すと、そのUIの文法が露出する

ここで少しやりすぎる実験をする。

画面をグレースケールにする。あるいはCSSでcolorを一時的に無効化する。

もし、

~~~text
リンク
見出し
選択中
CTA
~~~

がほとんど同じに見えるなら、その画面は「青」にかなり多くの説明責任を任せていたことになる。

逆に、

~~~text
link      = underline + text
selected  = filled state + marker
CTA       = button shape + label
heading   = type scale + weight
~~~

のように色以外のcueも働いていれば、色を失っても役割の差が残る。

![Color onlyと複数cueの比較](https://raw.githubusercontent.com/silovar-uk/myessays/main/assets/design-literacy-cue-collision/redundant-cues.svg)

*Figure 2: 色を消したときにも役割が残るかを見る。複数cueは「無駄な重複」ではなく、意味の伝達経路を一つに依存させない方法になる。Original diagram for this article.*

## 4. FACT｜WCAGは「色だけ」を唯一の手掛かりにしないよう求める

W3CのWCAG 2.2 Success Criterion 1.4.1 Use of Colorは、情報の伝達、actionの表示、responseの要求、visual elementの区別において、**colorを唯一の視覚的手段として使わない**ことを求める。

Source: https://www.w3.org/WAI/WCAG22/Understanding/use-of-color

Technique G182では、色に加えてunderline、font styleなど別のvisual cueを用意する方法が示されている。

Source: https://www.w3.org/WAI/WCAG22/Techniques/general/G182

ここでも言い過ぎない。

WCAGが「Similarityをこう設計せよ」と規定しているわけではない。

事実は「色だけに依存しない」。

そこからUI設計へ引ける解釈は、**意味を一つのchannelへ集中させない方が、色が使えない・見分けにくい状況でも役割を保ちやすい**ということだ。

## 5. BEFORE → AFTER｜色を増やすのではなく、役割の文法を分ける

### BEFORE

~~~text
試合情報           ← 青・太字
チケットはこちら   ← 青・太字
販売中             ← 青・太字
URAWA REDS         ← 青・太字
~~~

全部が「重要そう」には見える。

しかし役割は、

~~~text
heading
link
status
brand
~~~

で別々だ。

### AFTER

~~~text
試合情報
────────────
type scale / weightでheadingを示す

チケットはこちら
________________
underlineでlinkを示す

[● 販売中]
shape + textでstatusを示す

URAWA REDS
brand treatment
~~~

ポイントは**色数を増やすことではない**。

Color以外にも、shape、underline、weight、border、icon、position、spacingがある。

デザインの仕事は「差を増やす」より、**どの差に何の意味を担当させるかを決めること**に近い。

## 6. MESO → MICRO｜Visual vocabularyを「役割→cue」で監査する

制作時には、色から考えるより役割から逆算すると見やすい。

~~~text
ROLE        PRIMARY CUE        SECONDARY CUE
link        underline          color
selected    marker / fill      color
CTA         shape              label + color
heading     type scale         weight
status      label / icon       shape + color
decoration  no semantic duty   brand color
~~~

これは絶対ルールではない。

大事なのは、**同じcueが何役を兼務しているかを見える化すること**。

「青を何色に変えるか」より先に、

> **この青は、何を意味する青ですか？**

と聞く。

## 7. MACRO CONNECTION｜Signifierは「押せる」を見えるようにする

ここでGestaltからInteraction Designへ移る。

Don Normanは、affordanceとsignifierを区別している。Normanの整理では、affordanceは人と環境の関係として可能なaction、signifierはどこでどう行動すべきかを伝える知覚可能な手掛かりだ。

Norman自身は2008年の文章で、designでは人が行動を理解するためのclueが必要であり、それをsignifierとして整理した。

Source: https://jnd.org/signifiers-not-affordances/

『The Design of Everyday Things』改訂版でも、タッチスクリーン全体にはtouchのaffordanceがある一方、designerが示したいのは**どこをtouchすべきか**であり、その役割をsignifierが担うと説明している。

Source: https://media.aanda.psu.edu/sites/media/aa/files/documents/norman_design-of-everyday-things.pdf

これを今日の青問題へ戻す。

~~~text
青 = link
~~~

が一貫していれば、青は「ここは操作候補」というsignifierの一部になれる。

しかし、

~~~text
青 = link / heading / decoration / selected / CTA
~~~

まで広げると、「青だから押せそう」という手掛かりは弱くなる。

ここでSimilarityとSignifierが接続する。

**Similarityは何を同類に見せるか。Signifierは何をすべきかをどう知らせるか。**

同じvisual propertyを乱用すると、その両方が曖昧になりうる。

## 8. MISUNDERSTANDING｜「リンクは全部underline」が結論ではない

この話を雑に圧縮すると、

> リンクは絶対underline

になりがちだが、そこまで単純ではない。

W3Cには、本文中のlinkを周囲のtextから色で区別する場合のcontrastと、hover/focus時などの追加visual cueを扱うTechnique G183もある。

Source: https://www.w3.org/WAI/WCAG22/Techniques/general/G183

重要なのは特定のstyleを宗教化することではない。

**役割が、必要な条件下で知覚可能か。**

underlineはそのための強い選択肢の一つ、という位置づけになる。

## 9. CONNECTION｜Proximity + Similarity + Signifierで、画面は文字より先に喋る

#55では、Proximityをこう捉えた。

~~~text
Proximity
= 距離で関係を書く
~~~

#56では一段進める。

~~~text
Similarity
= 見た目で「同種」を示す

Signifier
= 見た目などで「どう行動するか」を知らせる
~~~

三つを重ねると、

~~~text
DISTANCE
  + APPEARANCE
  + ACTION CUES
        ↓
VISUAL GRAMMAR
~~~

になる。

文字を読ませる前から、画面はすでに、

> これは一組。
>
> これは同じ種類。
>
> これは押せる。

と喋っている。

だからUIレビューは、色や余白を「きれいか」で見るだけでは足りない。

**その視覚的特徴が、何を発話しているか**を見る。

![Proximity・Similarity・Signifierの接続図](https://raw.githubusercontent.com/silovar-uk/myessays/main/assets/design-literacy-cue-collision/visual-grammar.svg)

*Figure 3: Distance / Appearance / Action cueを別々の装飾ではなく、Visual Grammarを構成するchannelとして見る。Original diagram for this article.*

## 10. PRODUCTION｜そのまま使える制作・修正指示

> **同じ色・形・文字スタイルを使っている要素について、意味や機能も共通しているか確認してください。意味が異なる場合は、色を増やすだけで解決せず、下線・形・太さ・アイコン・配置など別のvisual cueへ役割を分散し、操作・状態・見出し・装飾が見分けられるvisual vocabularyを作ってください。**

Design Systemなら、

> **各visual propertyを「何色か」だけで管理せず、「何の意味を伝えるtoken / componentか」まで定義してください。同じcueが複数の異なる意味を兼務していないか監査してください。**

レビュー時は一言でいい。

> **「この青、全部同じ意味ですか？」**

## 11. PRACTICE｜30秒のSame-Look Test

いま見ているWebサイトで、一つの色を選ぶ。

青でも赤でもいい。

同じ色の要素を拾う。

~~~text
見出し
リンク
button
icon
status
decoration
~~~

そして一つだけ聞く。

> **「これらは全部、同じ意味として理解していい？」**

NOが多いなら、その色は意味のcueというより、複数の役割へ広がりすぎている可能性がある。

次に逆を見る。

> **同じ機能なのに、見た目が毎回違うものはないか？**

Similarityは「揃えすぎ」と「揃えなさすぎ」の両方向から監査できる。

## 12. NEXT｜次は「押せそう」を分解する

次に覚えるとつながる概念は、**Affordance / Signifier / Mapping**。

特に次の問いを分解したい。

> **なぜ角丸、影、ラベル、位置、cursorを見ると「押せそう」と感じるのか。**

ただし「影があればbutton」という話にはしない。

物理世界のaffordance、digital interfaceのsignifier、文化的に学習されたconventionを分けて見る。

## 13. 今日の中心命題

> **Consistency is not making everything look the same. It is making the same meaning predictably recognizable.**

「統一感」という言葉だけで画面を見ると、同じ青を増やすことは正解に見える。

でも調べた後は、少し違って見える。

色は面積を塗る材料ではない。

繰り返せば、意味を学習させる語彙になる。

だから「ブランドカラーを使えているか」だけでは足りない。

> **その青は、何を意味する青なのか。**

画面に青を一つ足すたびに、辞書へ意味を一つ登録している。

同じ単語へ五つの意味を雑に詰め込めば、文章が読みにくくなる。

UIでも、たぶん同じことが起きる。

## 14. Sources

- Max Wertheimer, “Laws of Organization in Perceptual Forms” (1923; English translation)  
  https://psychclassics.yorku.ca/Wertheimer/Forms/forms.htm
- W3C WAI, “Understanding SC 1.4.1: Use of Color”  
  https://www.w3.org/WAI/WCAG22/Understanding/use-of-color
- W3C WAI, “Technique G182”  
  https://www.w3.org/WAI/WCAG22/Techniques/general/G182
- W3C WAI, “Technique G183”  
  https://www.w3.org/WAI/WCAG22/Techniques/general/G183
- Don Norman, “Signifiers, not affordances”  
  https://jnd.org/signifiers-not-affordances/
- Don Norman, *The Design of Everyday Things*, Revised and Expanded Edition  
  https://media.aanda.psu.edu/sites/media/aa/files/documents/norman_design-of-everyday-things.pdf
