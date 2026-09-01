---
id: design-literacy-figure-ground-focus
title: "目立たせる前に、背景から分離する――Figure–Groundで焦点をつくる"
subtitle: "Design Literacy #3｜『何を強くするか』ではなく『何を前景として知覚させるか』を設計する"
created: "2026-09-01"
updated: "2026-09-01"
type: "Essay"
status: "完成"
tags: ["Design Literacy", "デザイン", "Gestalt", "Figure-Ground", "UI", "UX", "視覚階層", "情報設計"]
keywords: ["figure-ground", "Gestalt", "foreground", "background", "visual hierarchy", "contrast", "visual weight", "UI design"]
favorite: 5
grow: 5
series: "Design Literacy｜細部から思想まで"
seriesOrder: 3
abstract: "Gestalt心理学のFigure–Ground（図と地）を、UIで『重要な要素をどう前景として知覚させるか』という実務の問題として読む。CTAを大きくする前に周囲のvisual weightを下げる、強調を足す前にnoiseを減らす、という設計判断へつなげる。Proximity、Visual Hierarchyとの接続も整理し、知覚から制作指示まで往復する。"
---

# 目立たせる前に、背景から分離する――Figure–Groundで焦点をつくる
## Design Literacy #3｜「何を強くするか」ではなく「何を前景として知覚させるか」を設計する

**Good design makes it obvious what to look at — and what to ignore.**

UIで「このボタン、弱いな」と感じたとき、すぐに大きくしたり、太くしたり、派手な色へ変えたりしたくなる。

でも、弱いのはボタンそのものではなく、**背景との差が弱いから**かもしれない。

今回のテーマは **Figure–Ground（図と地）**。

Gestalt心理学で扱われる代表的な知覚原則の一つで、人が視覚場面を「いま見る対象＝figure」と「その背景＝ground」に分けて知覚する関係を考える。UXでも、前景と背景を明確に分離することで、重要な要素へ注意を導く考え方として使われている。

[Interaction Design Foundation — Law of Figure-Ground](https://assets.interaction-design.org/literature/topics/law-of-figure)

[Nielsen Norman Group — 5 Principles of Visual Design in UX](https://www.nngroup.com/articles/principles-visual-design/)

## 1. まず一言：Visibility is relational

**目立つかどうかは、その要素単体では決まらない。**

周囲との関係で決まる。

たとえば、ボタンの文字サイズを16pxから18pxへ上げても、周囲の見出し、リンク、バッジ、装飾、色面が全部強ければ、期待ほど前へ出てこない。

逆に、ボタン自体をほとんど変えなくても、周囲の要素を一段静かにすれば、figureとして立ち上がることがある。

```text
BUTTON ≒ BACKGROUND
        ↓
   分離が弱い

BUTTON ≠ BACKGROUND
        ↓
   figureとして認識しやすい
```

**Don't always amplify the signal. Reduce the noise.**

この考え方は、UIレビューでかなり使える。

## 2. Visual Lesson：全部を前景にすると、前景が消える

### BEFORE

```text
┌──────────────────────┐
│  MATCH DAY           │
│                      │
│  浦和 vs ○○          │
│                      │
│  9.19 19:00          │
│                      │
│  詳細を見る          │
│  チケットを購入      │
│  注意事項はこちら    │
└──────────────────────┘
```

全部が同じくらいの太さ、色、枠、強さを持っているとする。

情報は存在している。でも、**どれがfigureなのかが曖昧**になる。

### AFTER

```text
┌──────────────────────┐
│  MATCH DAY           │
│                      │
│  浦和 vs ○○          │
│  9.19 19:00          │
│                      │
│  █ チケットを購入 █  │
│                      │
│  詳細を見る          │
│  注意事項            │
└──────────────────────┘
```

CTAだけを前へ出し、補助リンクをground側へ下げる。

ここで重要なのは、**CTAを何倍にも巨大化したことではない**。

周囲との差を設計したことや。

Figure–Groundは「何を派手にするか」という話ではなく、**何を知覚上の主役にするか**という話として考えると使いやすい。

## 3. Figure–Groundを作るレバー

figureとgroundの分離は、色だけで作るわけではない。

たとえば次のような要素が関係する。

- **Contrast** — 明暗、色、太さの差
- **Scale** — サイズ差
- **Position** — 配置と周囲との距離
- **Whitespace** — 周囲にどれだけ空間があるか
- **Shape** — 形状や境界の違い
- **Visual Weight** — 複数の要素を合わせた視覚的な強さ

NN/gもVisual Designの原則としてscale、visual hierarchy、contrast、Gestaltなどを整理している。

だから、「CTAを目立たせる」を一個のCSSプロパティへ変換しない方がいい。

```text
目立たせたい
    ↓
font-sizeを上げる
```

ではなく、

```text
何をfigureにしたい？
    ↓
何がgroundと競合している？
    ↓
どの差を使えば最小変更で分離できる？
```

と考える。

## 4. そのまま使える制作・修正指示

「ボタンをもっと目立たせてください」だけだと、制作側はサイズ、色、影、アニメーションなど、何を強くするかを推測するしかない。

もう一段具体化すると、こう言える。

> CTAそのものを大きくする前に、周囲とのFigure–Ground関係を整理してください。補助リンクや装飾のvisual weightを下げ、CTAだけが明確なfigureとして認識できる状態を作ってください。

さらに短くするなら、

> **強調を足す前に、背景側を一段静かにできないか確認してください。**

これはWebだけでなく、SNS画像、プレゼン資料、ポスターでも使える。

## 5. 「重要なものを全部目立たせる」が失敗する理由

実務では、ほぼ全部が「重要」と言われる。

日付も重要。

タイトルも重要。

スポンサーも重要。

CTAも重要。

注意事項も読んでほしい。

そこで全部を太字、色付き、枠付きにすると、**importance inflation**が起きる。

強調は絶対的な属性ではない。相対差で成立する。

赤が一つだけなら目立つ。

赤が十個あれば、赤はもう背景になりうる。

だから、強いUIを作るには「何を強くするか」だけでなく、**何を弱くするかを決める必要がある**。

## 6. Gestaltへ戻る：デザインは物体ではなく知覚関係を扱う

Figure–Groundは、UIのために発明されたテクニックではない。

20世紀初頭に展開したGestalt心理学では、人間が視覚要素をバラバラの断片としてだけではなく、まとまりや関係として知覚する仕組みが研究された。

Figure–Groundのほかにも、Proximity、Similarity、Closureなどが現在のデザイン教育やUXで頻繁に参照される。

ここから見えてくるのは、デザインが「ボタンという物体をきれいに描く」だけではないということや。

**Design is not only about objects. It is about perception.**

ボタンと背景。

見出しと本文。

カードとページ。

それらが**どういう関係として人間の目に現れるか**まで設計対象になる。

## 7. 誤解しやすい点：Figure = 派手、Ground = 地味ではない

Figure–Groundを「目立つ色 vs 地味な色」とだけ覚えると狭すぎる。

白い広い背景に小さな黒い文字が一つだけあれば、小さくても十分にfigureになりうる。

逆に、赤背景、黄色文字、巨大写真、太字、影、バッジ、アニメーションを全部入れれば、コントラストが大量に存在していても、どこへ注意を向けるべきか分からなくなる。

つまり、figureは派手さそのものではない。

**知覚上、対象として分離されること**が重要や。

## 8. これまでの学びとの接続

Design Literacyでは、ここまで次の順に進んできた。

```text
Proximity
何と何が仲間？
      ↓
Visual Hierarchy
何から見る？
      ↓
Figure–Ground
何を「見る対象」として認識する？
```

Proximityは**Grouping**を作る。

Visual Hierarchyは**Order**を作る。

Figure–Groundは**Focus**を作る。

つまり、

```text
Spacing
  ↓
Grouping
  ↓
Order
  ↓
Focus
```

と理解できる。

これで「なんかCTAが弱い」という感覚を、

> 周囲もvisual weightが高く、CTAとgroundの分離が弱い。

まで具体化できる。

## 9. 30秒デザイン観察

スマホで好きなアプリやWebサイトを一つ開く。

文字の意味を読まずに、次の二つだけを見る。

**背景へ溶けているものは何か。**

**前へ飛び出して見えるものは何か。**

そのあと一つだけ問う。

> **一番前に見えるものは、本当にこの画面で一番重要なものか？**

広告が最もfigureになっているかもしれない。

小さな通知バッジが本来のCTAより強いかもしれない。

そのズレを見つけられれば、今日の観察は成功や。

## 10. Next Concept：Swiss Styleへ

次は視点をMACROへ上げる。

ここまでは、人間が情報をどう知覚するかという側から「秩序」を考えてきた。

次は、20世紀のグラフィックデザイナーたちが、**情報を秩序立てるためにどんな視覚言語を発展させたのか**を見る。

キーワードは、

**Grid / asymmetric layout / sans-serif typography / objective communication**。

つまり次は、**Swiss Style / International Typographic Style**。

「きれいに並べるためのグリッド」から、「なぜ近代デザインは秩序を求めたのか」まで、一段大きな話へ進む。

## 参考資料

- [Interaction Design Foundation — Law of Figure-Ground](https://assets.interaction-design.org/literature/topics/law-of-figure)
- [Nielsen Norman Group — 5 Principles of Visual Design in UX](https://www.nngroup.com/articles/principles-visual-design/)
- [Nielsen Norman Group — Visual Design Glossary](https://www.nngroup.com/articles/visual-design-cheat-sheet/)
