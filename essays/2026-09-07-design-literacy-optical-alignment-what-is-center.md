---
id: design-literacy-optical-alignment-what-is-center
title: "CSSは中央と言っている。じゃあ誰がズレている？"
subtitle: "Design Literacy #21｜Optical Alignmentを『中心とは何か』から考える"
created: "2026-09-07"
updated: "2026-09-07"
type: "Essay"
status: "完成"
tags: ["Design Literacy", "デザイン", "Optical Alignment", "Visual Center", "Typography", "Visual Perception", "UI", "Icons", "Overshoot", "Negative Space"]
keywords: ["optical alignment", "visual center", "perceived center", "geometric centroid", "bounding box", "center of mass", "visual weight", "negative space", "overshoot", "icon alignment", "SF Symbols", "Material Symbols"]
favorite: 5
grow: 5
series: "Design Literacy｜細部から思想まで"
seriesOrder: 21
abstract: "CSSやFigmaでは中央に置かれているのに、Playアイコンが少しズレて見える。その違和感を入口に、Bounding-box center、geometric centroid、perceived centerを分け、輪郭・対称性・余白・視覚的重量が中心知覚にどう関わるかを研究と実務資料から整理する。TypographyのovershootとUIアイコンのoptical correctionを同一視せず、数値基準から管理された例外へ進む判断手順まで落とし込む。"
---

# CSSは中央と言っている。じゃあ誰がズレている？
## Design Literacy #21｜Optical Alignmentを「中心とは何か」から考える

**The computer says it is centered.**

コンピューターは「中央です」と言っている。

Figmaでも中央。CSSでも中央。

```css
display: flex;
align-items: center;
justify-content: center;
```

完璧。

なのに、Playボタンの「▶」を見ると、なんとなく左にいる。

CSSか。Figmaか。それとも自分の目か。

今回は1pxを直すために、**そもそも「中心」とは何なのか**まで行く。

## 1. まず一言：「中心」は一種類ではない

**A center can be calculated. A visual center must be perceived.**

前回扱ったのは、

```text
geometric alignment
≠
optical alignment
```

という話だった。

今回はもう一段分解する。

少なくとも、次の四つは分けて考えたい。

- **Bounding-box center**：図形を囲む矩形の中央
- **Geometric centroid**：面積を一様とみなしたときの幾何学的重心
- **Center of mass**：質量分布を仮定した物理的な重心
- **Perceived center / Visual center**：人が「ここが中心」と判断する位置

最初の三つは条件を決めれば計算できる。

最後だけ、人間が入る。

ここから急に面倒になる。

## 2. ▶を箱に入れるだけで、「中央」が割れる

右向き三角形を単純化して、頂点を

```text
(0, 0)
(0, h)
(w, h/2)
```

とする。

Bounding boxの中央は、横方向なら`w / 2`。

一方、この三角形の面積centroidは`w / 3`にある。

```text
┌────────────────────┐
│                    │
│       ▶            │
│                    │
└────────────────────┘

box center      = w/2
shape centroid  = w/3
```

つまり、**同じ図形の中だけでも「箱の中心」と「面積の中心」は最初から一致しない。**

PlayアイコンをBounding boxだけで中央配置したとき、黒い面積が左側へ多く分布すること自体は、錯覚を持ち出さなくても説明できる。

ただし、ここで、

> ではcentroidを箱の中央に置けば正解

とはならない。

人間は図形の面積を積分して中心を計算しているわけではないからだ。

<div class="dl-visual" role="group" aria-label="Bounding box centerとshape centroidが一致しないことを示す図">
<p class="dl-visual-kicker">VISUAL LESSON 01</p>
<p class="dl-visual-title"><strong>「中央」は、何を基準にするかで位置が変わる。</strong></p>
<div class="dl-compare">
<div class="dl-panel">
<p class="dl-panel-label">BOUNDING BOX</p>
<div class="dl-demo-card">
<p class="dl-event">▶</p>
<p class="dl-meta">箱の中央 = w/2</p>
</div>
</div>
<div class="dl-panel dl-panel-after">
<p class="dl-panel-label">SHAPE CENTROID</p>
<div class="dl-demo-card">
<p class="dl-event">▶</p>
<p class="dl-meta">三角形の面積重心 = w/3</p>
</div>
</div>
</div>
<p class="dl-visual-note">まず「何を中央と呼んでいるか」を分ける。Optical Alignmentは、そのあとに始まる。</p>
</div>

## 3. 人間は「黒い面積」だけを見ていない

**Your eye does not simply count pixels.**

ここからVisual Perceptionの話になる。

Proffitt、Thomas、O'Brienによる1983年の研究では、図形内部の知覚される中心を調べた結果、内部の輝度分布だけでなく、**輪郭形状（boundary contour）が中心判断へ強く影響する**ことが示された。

[Proffitt, Thomas & O'Brien, 1983 — The roles of contour and luminance distribution in determining perceived centers within shapes](https://pubmed.ncbi.nlm.nih.gov/6844093/)

さらにDavi、Doyle、Proffittによる研究では、図形の中心判断に対称性が関係し、とくにrotational symmetryの存在が中心定位に有効であることが報告されている。

[Davi, Doyle & Proffitt, 1992 — The role of symmetry in determining perceived centers within shapes](https://pubmed.ncbi.nlm.nih.gov/1508622/)

一方、Baud-BovyとSoechtingは、非対称な二次元図形について、人はcenter of massをかなり正確かつ一貫して推定できるものの、誤差は形状によって系統的に変わり、真の重心より**内接円の中心に近い位置を選ぶ傾向**があったと報告している。

[Baud-Bovy & Soechting, 2001 — Visual localization of the center of mass of compact, asymmetric, two-dimensional shapes](https://pubmed.ncbi.nlm.nih.gov/11424655/)

つまり、

```text
黒い面積を数える
↓
重心を計算する
↓
そこを中心と感じる
```

という単純なモデルでは足りない。

輪郭、対称性、向き、形状などが絡む。

1pxの話をしていたはずなのに、気づいたら知覚心理学にいる。

## 4. ■ ● ▲ ▶ ×を同じ箱に入れてみる

**Same box does not mean same balance.**

```text
┌─────┐  ┌─────┐  ┌─────┐  ┌─────┐  ┌─────┐
│  ■  │  │  ●  │  │  ▲  │  │  ▶  │  │  ×  │
└─────┘  └─────┘  └─────┘  └─────┘  └─────┘
```

■や●は、対称に描けばcentroidとBounding-box centerが一致する。

▲や▶は、形状によって一致しない。

×はstrokeの太さや角度でvisible shapeの分布が変わる。

ここでデザイン実務では**Visual Weight（視覚的重量）**という言葉を使うことがある。

ただし、ここは混同しない方がいい。

**FACT**

- centroidは幾何学的概念
- center of massは物理的概念
- perceived centerは知覚研究の対象
- visual weightはデザイン実務で、要素がどれだけ強く・重く見えるかを考えるために使われる言葉

これらは同じものではない。

**INTERPRETATION**

UIレビューでは、面積だけでなく、塗り、stroke、輪郭、コントラスト、周囲の余白などを含めて「どちら側が強く見えるか」を考えるためにVisual Weightという言葉を使うと便利だ。

Visual Weightは、新しい重心計算式ではない。

## 5. Negative Spaceも「形」の一部として見る

**Empty space is not visually empty.**

▶を中央に置いたとき、左と右にできる空白の形は同じではない。

```text
container
↓
icon bounding box
↓
visible shape
↓
surrounding negative space
```

この関係まで見ないと、

> アイコン自体は中央です

でレビューが止まる。

AppleはSF Symbolsのカスタムsymbolについて、既存symbolとdetail、**optical weight、alignment、position**などを整合させるよう求めている。さらにbadgeなどでsymbol幅が増えた場合、optical horizontal alignmentを助けるためnegative side marginを設定できるとしている。

[Apple Human Interface Guidelines — SF Symbols](https://developer.apple.com/design/human-interface-guidelines/sf-symbols)

大規模なsymbol systemでも、「矩形を揃えれば終わり」ではない。

<div class="dl-visual" role="group" aria-label="アイコンの中央配置を四段階で確認する図">
<p class="dl-visual-kicker">VISUAL LESSON 02</p>
<p class="dl-visual-title"><strong>箱ではなく、箱→図形→余白の関係まで見る。</strong></p>
<div class="dl-propagation">
<div class="dl-propagation-source">CONTAINER<br>幾何学的基準</div>
<div class="dl-propagation-arrow" aria-hidden="true">↓</div>
<div class="dl-propagation-targets">
<div class="dl-propagation-target">BOUNDING BOX<br>外接矩形</div>
<div class="dl-propagation-target">VISIBLE SHAPE<br>実際の形</div>
<div class="dl-propagation-target">NEGATIVE SPACE<br>周囲の空白</div>
<div class="dl-propagation-target">PERCEPTION<br>どう見えるか</div>
</div>
</div>
<p class="dl-visual-note">Optical correctionは最初の基準ではない。幾何学的配置を作ったあと、知覚上の差が再現する場合だけ追加する。</p>
</div>

## 6. 前回のOvershootと、Playアイコンの補正は同じなのか

ここが今回いちばん重要な更新点になる。

**Overshoot and icon centering are related, but they are not the same problem.**

Typographyでは、Oのようなround glyphをHのようなflat glyphと数学的に同じ高さへ収めると、小さく見えることがある。

MicrosoftのTypographyガイドでは、C、G、O、Qなどround glyphはflat glyphのbaselineやcap heightを越えるovershootを持つ場合があり、A、V、Wのようなpointed shapeも、短く見えないようflat heightを越える場合があると説明している。

またspacingについても、glyphはmathematical centerではなく**visually centered**に配置することが重要だとしている。

[Microsoft Typography — Character design standards: Uppercase](https://learn.microsoft.com/en-gb/typography/develop/character-design-standards/uppercase)

[Microsoft Typography — From typeface to font file](https://learn.microsoft.com/en-us/typography/truetype/from-typeface-to-font-file)

ただし、overshootは主に、

**高さや大きさが同等に見えるようにする補正**。

Playアイコンを横へ動かすのは、

**位置が釣り合って見えるようにする補正**。

同じ現象ではない。

共通するのは、

```text
mathematical equality
≠
perceptual equality
```

という設計上の問題だ。

ここを同一視せず、「同じ補正思想の別ケース」と捉えると整理しやすい。

## 7. 「では何pxずらせばいい？」には、答えがない

**There is no magic pixel value.**

同じ▶でも、

- 三角形の縦横比
- fillかstrokeか
- icon size
- container size
- 隣に文字があるか
- surrounding UI
- 他のiconとの整合

で見え方は変わる。

GoogleのMaterial Symbolsにも、20dpから48dpまでの**optical size（opsz）**軸がある。サイズを変えたとき同じように見えるよう、stroke thicknessを単純比例ではなく調整する仕組みだ。

これは「中央位置」の補正そのものではないが、**知覚上一貫させるためには単純な数学的scaleだけでは足りない**という同じ設計思想を示している。

[Google Fonts — Material Symbols guide](https://developers.google.com/fonts/docs/material_symbols)

だから、

> Play iconは右へ1px

をルールにするより、

> 何を確認して補正を判断するか

をルールにした方が強い。

## 8. そのまま使える制作・修正指示

制作指示なら、次の順序にする。

> **まずAuto Layout、Grid、Flex等で要素を幾何学的に中央配置してください。その後、visible shape、visual weight、negative space、周囲の要素との関係を確認します。複数サイズでも同方向の視覚的なズレが確認できる場合のみoptical correctionを追加し、その補正はコンポーネント側の例外ルールとして記録してください。**

レビューでは、この順序で確認する。

```text
1. Bounding boxは中央か
      ↓
2. Visible shapeはどこに分布しているか
      ↓
3. Negative spaceは偏っていないか
      ↓
4. 周囲と並べても同じ方向にズレて見えるか
      ↓
5. サイズを変えても違和感が再現するか
      ↓
6. 必要な場合のみoptical correction
```

「なんとなく右へ」から、かなり前へ進める。

## 9. 誤解しやすい点：Optical Alignmentは感覚優先ではない

**Optical alignment is not permission to ignore the grid.**

むしろ順序は逆だ。

```text
Rule
↓
Deviation detected
↓
Reason identified
↓
Controlled exception
```

基準がなければ、

「補正した」のか、
「ただズレた」のか、

区別できない。

また、非対称だからといって必ず補正するわけでもない。

Baud-Bovyらの研究では、人は非対称図形のcenter of massも比較的正確に推定できている。Daviらの研究でも、対称性の種類などによって中心判断の精度は変わる。

```text
asymmetry
↓
must shift
```

ではなく、

```text
asymmetry
↓
reason to inspect more carefully
```

くらいに考えるのが安全だ。

## 10. 前より解像度が上がる接続

前回は、

```text
Geometric Alignment
≠
Optical Alignment
```

と学んだ。

今回は、さらに、

```text
Bounding-box center
≠
Geometric centroid
≠
Perceived center
```

まで分かれた。

そして、

```text
Overshoot
≠
Icon position correction
```

でもある。

ただし両方とも、

```text
Mathematical equality
↓
Perceptual inequality
↓
Controlled compensation
```

という大きな設計思想ではつながっている。

Optical Alignmentは、単なる「1pxずらす技術」ではない。

**何を同じとみなすかを、人間の知覚に合わせて設計すること。**

そう考えると、Gridと矛盾するどころか、Gridの次にある判断になる。

## 11. 30秒でできる観察

スマホやWebサイトでPlayボタンを一つ見つける。

1. 外側のcontainerの中心を見る
2. ▶のBounding boxを見る
3. 黒い形がどちらへ分布しているか見る
4. 左右のnegative spaceを見る
5. 「ずらしたい」と感じた理由を一文で言う

最後が、

> なんとなく

なら、まだ補正しない。

> visible shapeが左側へ集中し、右側のnegative spaceとの釣り合いが弱く見える

まで言えたら、判断の解像度は上がっている。

## 12. 次に覚える概念：Visual Weight

**What makes something look heavy?**

次はVisual Weightを掘る。

同じ大きさでも、

- size
- fill
- stroke
- contrast
- color
- density
- position

によってattentionの強さは変わる。

```text
Optical Alignment
↓
Visual Weight
↓
Visual Hierarchy
```

と進めると、MICROな「1pxの違和感」から、MESOな「何を先に見せるか」までつながる。

## 今日の中心命題

**“Center” is not one thing.**

「中央」は一種類ではない。

だから、

> 中央揃えしてください

という指示も、本当は少し曖昧だった。

何を中央にするのか。

箱か。面積か。輪郭か。知覚か。

CSSは最初から嘘をついていなかった。

**CSSは、箱をちゃんと中央にしていた。**

こちらが勝手に、

「箱の中央＝見た目の中央」

だと思っていただけだった。

## 参考資料

- [Microsoft Typography — Character design standards: Uppercase](https://learn.microsoft.com/en-gb/typography/develop/character-design-standards/uppercase)
- [Microsoft Typography — From typeface to font file](https://learn.microsoft.com/en-us/typography/truetype/from-typeface-to-font-file)
- [Apple Human Interface Guidelines — SF Symbols](https://developer.apple.com/design/human-interface-guidelines/sf-symbols)
- [Google Fonts — Material Symbols guide](https://developers.google.com/fonts/docs/material_symbols)
- [Proffitt, Thomas & O'Brien, 1983 — The roles of contour and luminance distribution in determining perceived centers within shapes](https://pubmed.ncbi.nlm.nih.gov/6844093/)
- [Davi, Doyle & Proffitt, 1992 — The role of symmetry in determining perceived centers within shapes](https://pubmed.ncbi.nlm.nih.gov/1508622/)
- [Baud-Bovy & Soechting, 2001 — Visual localization of the center of mass of compact, asymmetric, two-dimensional shapes](https://pubmed.ncbi.nlm.nih.gov/11424655/)
