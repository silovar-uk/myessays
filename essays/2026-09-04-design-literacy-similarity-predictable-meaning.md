---
id: design-literacy-similarity-predictable-meaning
title: "Similarity――『見た目を揃える』目的は、意味を予測可能にすること"
subtitle: "Design Literacy #13｜類同からVisual Languageへ"
created: "2026-09-04"
updated: "2026-09-06"
type: "Essay"
status: "完成"
tags: ["Design Literacy", "デザイン", "Gestalt", "Similarity", "Visual Language", "Consistency", "Accessibility", "UI", "Design System"]
keywords: ["similarity", "Gestalt psychology", "factor of similarity", "visual grouping", "visual language", "consistency", "design system", "WCAG 1.4.1", "use of color", "Max Wertheimer", "predictability"]
favorite: 5
grow: 5
series: "Design Literacy｜細部から思想まで"
seriesOrder: 13
abstract: "Gestalt心理学のSimilarity（類同）を、単なる『見た目の統一』ではなく、離れた要素にも共通の意味や役割を予測させるVisual Languageの基礎として捉える。Wertheimerの1923年の議論と現代UIへの応用を事実と解釈に分け、WCAGのUse of Color、Proximity、Consistency、Design Systemへ接続する。"
---

# Similarity――「見た目を揃える」目的は、意味を予測可能にすること
## Design Literacy #13｜類同からVisual Languageへ

**Similarity is not about making everything look consistent. It is about making meaning easier to predict.**

UIで同じ色、同じ形、同じタイポグラフィを繰り返すと、画面には「統一感」が生まれる。

ただ、Similarity（類同）を単なる見た目の統一として理解すると、本質を少し取り逃がす。

今回見るのは、**似た見た目が、ユーザーにどんな関係や期待を生むのか**という話だ。

## 1. まず一言：似ているものは、同じ仲間として読まれやすい

たとえば、サイト内に次の3つがあるとする。

```text
[ チケット購入 ]
[ 詳しく見る ]
[ 試合情報 ]
```

3つとも、

```text
赤背景
白文字
同じ角丸
同じ高さ
```

なら、多くの人は自然に「どれも同じ種類のUIだ」と見る。

ここで重要なのは、まだ「同じ挙動を期待する」とまでが心理学上の直接的な事実ではないことだ。

1923年、Max Wertheimerは *Laws of Organization in Perceptual Forms* で、近接だけでなく、**似た部分にはまとまる傾向がある**ことをFactor of Similarityとして論じた。

[Max Wertheimer — Laws of Organization in Perceptual Forms (1923), York University archive](https://psychclassics.yorku.ca/Wertheimer/Forms/forms.htm)

ここまでが歴史的な事実。

そこから現代UIへ引ける解釈はこうなる。

**同じ視覚的特徴を繰り返すと、それらを同じカテゴリー・役割・ルールに属するものとして学習しやすくなる。**

Similarityは「見た目を揃える技術」ではなく、**意味の分類を視覚化する技術**として使える。

<div class="dl-visual" role="group" aria-label="等間隔に並ぶ丸と四角が形のSimilarityによって別のまとまりとして見えやすい例">
<p class="dl-visual-kicker">VISUAL LESSON 01</p>
<p class="dl-visual-title"><strong>距離が同じでも、似た形は別のfamilyとして見えやすい。</strong></p>
<div class="dl-demo-card" role="img" aria-label="丸と四角が等間隔で交互に並ぶ二行の図">
<p class="dl-event">●　■　●　■　●　■</p>
<p class="dl-event">●　■　●　■　●　■</p>
</div>
<p class="dl-visual-note">ここでは各markの距離はほぼ同じ。それでも丸同士、四角同士という共通性を拾いやすい。これは「同じUIなら同じ動作を期待する」という直接的な歴史事実を示す図ではなく、Similarityによるperceptual groupingを体験するための単純化した例。</p>
</div>

## 2. 仕組み：Similarityは色だけではない

Similarityというと、同じ色の要素をまとめる話に見えやすい。

しかし、類似性をつくる視覚的手掛かりは一つではない。

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

UIなら、たとえばニュース一覧を数件見るだけで、こんなルールを学習できる。

```text
NEWS          赤・小さなラベル
9.4           グレー・小
新加入選手    黒・太字

NEWS          赤・小さなラベル
9.3           グレー・小
試合情報      黒・太字
```

ユーザーへ「赤い小ラベルがカテゴリーです」と説明していなくても、反復によって、

```text
赤・小さなラベル = category
グレー・小       = date
黒・太字         = headline
```

というVisual Languageが成立していく。

**Repetition teaches the interface.**

デザインは説明書を表示しなくても、繰り返しによって「この見た目はこう読む」という語彙を教えられる。

## 3. Before → After：何を同じにし、何を違わせるか

### BEFORE

```text
EVENT      赤・角丸
NEWS       青文字のみ
TICKET     赤文字
ACADEMY    グレー背景
```

全部が同じ「カテゴリーラベル」なのに、見た目の構造がばらばら。

これでは各要素を見るたびに、「これはカテゴリーなのか、リンクなのか、状態なのか」を再解釈しやすい。

### AFTER

```text
[ EVENT ]
[ NEWS ]
[ TICKET ]
[ ACADEMY ]
```

共通するのは、

```text
同じshape
同じpadding
同じfont size
同じplacement rule
```

一方で、categoryごとにcolorだけを変える。

すると、

```text
shape / size / placement
= category labelという上位ルール

color
= どのcategoryかという下位ルール
```

を同時に作れる。

つまりSimilarityは、全部を同じにする技術ではない。

**どの属性を共通化し、どの属性に意味の差を担わせるかを設計する技術**だ。

<div class="dl-visual" role="group" aria-label="同じカテゴリーラベルをばらばらに表現する場合と共通のvisual ruleを持たせる場合の比較">
<p class="dl-visual-kicker">VISUAL LESSON 02</p>
<p class="dl-visual-title"><strong>揃える対象と、差を担わせる属性を分ける。</strong></p>
<div class="dl-compare">
<div class="dl-panel">
<p class="dl-panel-label">BEFORE — EVERY LABEL SPEAKS DIFFERENTLY</p>
<div class="dl-demo-card">
<p class="dl-event">EVENT</p>
<p class="dl-meta">[ NEWS ]</p>
<p class="dl-meta">TICKET →</p>
<p class="dl-meta">【 ACADEMY 】</p>
</div>
</div>
<div class="dl-panel dl-panel-after">
<p class="dl-panel-label">AFTER — SHARED CATEGORY LANGUAGE</p>
<div class="dl-demo-card">
<div class="dl-actions">
<span class="dl-action dl-action-primary">EVENT</span>
<span class="dl-action dl-action-primary">NEWS</span>
<span class="dl-action dl-action-primary">TICKET</span>
<span class="dl-action dl-action-primary">ACADEMY</span>
</div>
</div>
</div>
</div>
<p class="dl-visual-note">AFTERの目的は四つを完全に同一化することではない。shape・padding・typography・placementなどに「category label」という共通語彙を持たせ、そのうえで必要な差分だけ別の属性へ担当させる。</p>
</div>

## 4. そのまま使える制作・修正指示

「デザインを統一してください」では、なぜ揃えるのかが残らない。

制作指示なら、こう言える。

> **同じ役割を持つ要素は、形状・サイズ・タイポグラフィ・配置など複数のvisual propertiesを可能な範囲で共通化してください。逆に、意味や挙動が異なる要素には明確な視覚差を設け、同じカテゴリーや操作だと誤認されにくい状態にしてください。**

レビューでは、次の問いが使いやすい。

> **「この画面で同じ見た目をしているものは、本当に同じ意味・同じ役割ですか？」**

逆方向からも見られる。

> **「同じ役割なのに、毎回違う見た目になっているものはありませんか？」**

この2問だけで、Visual Languageの崩れをかなり拾える。

## 5. 歴史・研究との接続：Wertheimerが示したものと、UI側の解釈を分ける

Wertheimerの1923年の論文では、まずFactor of Proximityを扱い、その後、距離を一定にしながら点の色などを変える例から、**like partsがまとまりやすい傾向**をFactor of Similarityとして論じている。

[Max Wertheimer — Laws of Organization in Perceptual Forms](https://psychclassics.yorku.ca/Wertheimer/Forms/forms.htm)

ここで歴史を現在のUIへ直結しすぎないことが重要だ。

Wertheimerが「同じ見た目のボタンは同じ動作を期待される」と書いたわけではない。

それは後世のデザインへ応用した解釈になる。

ただし、知覚上「似たものをまとまりとして捉えやすい」という原理を使えば、UIでは同じ役割を持つ部品へ共通のvisual propertiesを与え、**意味のカテゴリーを画面上に反復して示す**ことができる。

つまり、

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

という接続になる。

## 6. Accessibility：Colorだけに意味を背負わせない

SimilarityをColorだけで作ると、意味の伝達経路が一つに偏る。

たとえば、

```text
発売中   緑
残り僅か 黄
完売     赤
```

のように状態を色だけで区別すると、色の違いを認識しづらいユーザーには情報が伝わりにくい。

WCAG 2.2 Success Criterion 1.4.1 **Use of Color（Level A）**は、情報、操作、応答要求、視覚要素の区別において、colorを唯一の視覚的手段として使わないことを求めている。

[W3C — Understanding SC 1.4.1 Use of Color](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color)

ここも整理しておく。

**WCAGが「Similarityを複数属性で作れ」と規定しているわけではない。**

WCAGの事実は「色だけに情報を依存させない」というアクセシビリティ要件。

Similarity側へ引ける解釈は、意味を伝える際、

```text
Color
+
Shape
+
Text
+
Icon
```

など複数のcueを重ねることで、分類をよりrobustにできるということだ。

W3CのTechnique G182も、色に加えてunderline、font styleなど別のvisual cueを提供する方法を紹介している。

[W3C — G182: Additional visual cues beyond color](https://www.w3.org/WAI/WCAG22/Techniques/general/G182)

<div class="dl-visual" role="group" aria-label="色だけで状態を伝える例と、文字や記号など複数のcueを重ねる例の比較">
<p class="dl-visual-kicker">VISUAL LESSON 03</p>
<p class="dl-visual-title"><strong>意味を一つのcueだけに背負わせない。</strong></p>
<div class="dl-compare">
<div class="dl-panel">
<p class="dl-panel-label">COLOR ONLY</p>
<div class="dl-demo-card" role="img" aria-label="緑、黄、赤の丸だけで三つの状態を区別する例">
<p class="dl-event">🟢　🟡　🔴</p>
<p class="dl-meta">色が見分けにくいと、どのmarkerが何を意味するか分かりにくい。</p>
</div>
</div>
<div class="dl-panel dl-panel-after">
<p class="dl-panel-label">MULTIPLE CUES</p>
<div class="dl-demo-card">
<div class="dl-actions">
<span class="dl-action dl-action-primary">✓ 発売中</span>
<span class="dl-action">! 残り僅か</span>
<span class="dl-action">× 完売</span>
</div>
</div>
</div>
</div>
<p class="dl-visual-note">WCAG 1.4.1の要件は「Similarityをこう作れ」ではなく、colorを唯一の視覚的手段にしないこと。文字・記号・形など別のcueを重ねると、意味の伝達経路を一つに依存しにくくできる。</p>
</div>

## 7. 誤解しやすい点：「同じ意味ならpixel-perfectで同じ見た目」にしない

同じactionでもcontextによってpresentationは変わる。

たとえば「チケットを購入する」というactionが、

```text
Hero
[        チケット購入        ]

Card
[ 購入 ]

Mobile Sticky
----------------------
[ チケットを購入する ]
```

と変化することは普通にある。

完全に同じappearanceではない。

それでも、

```text
color role
shape family
label convention
icon convention
interaction feedback
```

などを共有すれば、「同じ系統のaction」というfamily resemblanceは保てる。

**Consistency is not pixel sameness.**

同じ意味に必要なのは、完全一致ではなく、共通性を読み取れるだけの十分なSimilarityだ。

<div class="dl-visual" role="group" aria-label="同じ購入actionがHero、Card、Mobile Stickyという異なるcontextへ展開される例">
<p class="dl-visual-kicker">VISUAL LESSON 04</p>
<p class="dl-visual-title"><strong>同じruleは、同じpixelを意味しない。</strong></p>
<div class="dl-propagation">
<div class="dl-propagation-source">PURCHASE ACTION<br>shared family cues</div>
<div class="dl-propagation-arrow" aria-hidden="true">↓</div>
<div class="dl-propagation-targets">
<div class="dl-propagation-target">HERO<br>チケット購入</div>
<div class="dl-propagation-target">CARD<br>購入</div>
<div class="dl-propagation-target">MOBILE STICKY<br>チケットを購入する</div>
</div>
</div>
<p class="dl-visual-note">contextが変われば幅やlabelの長さは変わる。それでもcolor role、shape family、label convention、interaction feedbackなどを共有すれば、完全一致なしでも同じaction familyとして読ませられる。</p>
</div>

## 8. 以前の学びとの接続：Proximityは近距離、Similarityは遠距離もつなげる

直前に扱ったProximityでは、距離によって「これは同じまとまり」と示せることを見た。

```text
Proximity
= 近いもの同士のlocal relationship
```

Similarityは少し違う。

```text
[ NEWS ]

        離れた場所

                    [ NEWS ]
```

要素同士が離れていても、同じshape、color、typographyを持っていれば、同種のものとして関係づけられる。

ここで前より解像度が上がる。

**Proximity groups nearby things. Similarity can connect distributed things.**

さらにGridまで戻すと、

```text
Grid
= どこに置くかの共通座標

Proximity
= 何と何を近く置くか

Similarity
= 何と何を同種として見せるか

↓
Information Structure
```

となる。

位置、距離、見た目は別々の装飾ではなく、情報構造を伝える複数のchannelとして働いている。

<div class="dl-chain" aria-label="Grid、Proximity、SimilarityがInformation Structureへ接続する概念の流れ"><span>Grid / Where</span><span>Proximity / What belongs nearby</span><span>Similarity / What belongs to the same kind</span><span>Information Structure</span></div>

## 9. 30秒でできる観察

普段使うアプリを一つ開く。

今日は色をいったん無視して、次だけ探す。

```text
同じshape
同じfont size
同じicon size
同じcorner radius
同じplacement pattern
```

一つfamilyを見つけたら、問いは一つ。

**「この似ている要素は、本当に同じ役割？」**

次に逆を見る。

**「同じ役割なのに、なぜか別物のように見える要素はない？」**

この往復がVisual Languageを見る練習になる。

## 10. 次につながる概念：Consistency / Design System

Similarityは主にperception側の原理として理解できる。

これを制作側の仕組みにすると、ConsistencyやDesign Systemへつながる。

```text
同じmeaning / role
        ↓
同じdesign rule
        ↓
同じcomponent / token
        ↓
似たappearance
        ↓
ユーザーの再学習を減らす
```

つまり次の問いは、

**「似せるべきものを、チーム全体でどう再現可能にするか？」**

になる。

GestaltのSimilarityが知覚の話なら、Design Systemはその知覚上の規則性を制作工程で繰り返し生成するための仕組みとして捉えられる。

今日の中心命題はこれ。

**Similarity is not about visual uniformity. It is about making meaning predictable.**

日本語なら、

**「見た目を揃える」の目的は、統一感そのものではなく、意味を予測できる状態をつくること。**

## 参考資料

- [Max Wertheimer — Laws of Organization in Perceptual Forms (1923), York University archive](https://psychclassics.yorku.ca/Wertheimer/Forms/forms.htm)
- [W3C — WCAG 2.2 Success Criterion 1.4.1 Use of Color](https://www.w3.org/TR/WCAG22/#use-of-color)
- [W3C — Understanding SC 1.4.1 Use of Color](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color)
- [W3C — G182: Ensuring that additional visual cues are available when text color differences are used to convey information](https://www.w3.org/WAI/WCAG22/Techniques/general/G182)
