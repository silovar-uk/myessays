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
abstract: "Gestalt心理学のFigure–Ground（図と地）を、UIで『重要な要素をどう前景として知覚させるか』という実務の問題として読む。CSSだけの軽量Visual Lessonで、CTAを強くする以外にgroundを静かにすることで焦点を作れることを体験し、Proximity、Visual Hierarchyとの接続まで整理する。"
---

# 目立たせる前に、背景から分離する――Figure–Groundで焦点をつくる
## Design Literacy #3｜「何を強くするか」ではなく「何を前景として知覚させるか」を設計する

**Good design makes it obvious what to look at — and what to ignore.**

UIで「このボタン、弱いな」と感じたとき、すぐに大きくしたり、太くしたり、派手な色へ変えたりしたくなる。

でも、弱いのはボタンそのものではなく、**背景との差が弱いから**かもしれない。

今回のテーマは **Figure–Ground（図と地）**。Gestalt心理学で扱われる代表的な知覚原則の一つで、人が視覚場面を「いま見る対象＝figure」と「その背景＝ground」に分けて知覚する関係を考える。

[Interaction Design Foundation — Law of Figure-Ground](https://assets.interaction-design.org/literature/topics/law-of-figure)

[Nielsen Norman Group — 5 Principles of Visual Design in UX](https://www.nngroup.com/articles/principles-visual-design/)

## 1. まず、見てみる：何が前に出ている？

<div class="dl-visual" role="group" aria-label="FigureとGroundの知覚を試す抽象図">
<p class="dl-visual-kicker">VISUAL EXPERIMENT 01</p>
<p class="dl-visual-title"><strong>明るい二つの形を見るか、中央の暗い形を見るか。</strong></p>
<div class="dl-figure-ground" role="img" aria-label="左右の明るい輪郭と中央の暗い空間のどちらも形として知覚できる抽象図"></div>
<p class="dl-visual-note">同じ画面でも、どこをfigureとして取るかで「形」が変わる。FigureとGroundは、単純に前景色・背景色という固定属性ではない。</p>
</div>

### What just happened?

**目立つかどうかは、その要素単体では決まらない。Visibility is relational.**

人は視覚場面のすべてを同じ強さで扱うのではなく、あるものを対象として取り出し、残りを背景として扱う。UIでも、この関係が曖昧だと「どこを見ればいいのか」が弱くなる。

**Don't always amplify the signal. Reduce the noise.**

## 2. Visual Lesson：CTAを大きくせずに、前景へ出す

<div class="dl-visual" role="group" aria-label="CTAのFigure-Ground関係をBeforeとAfterで比較">
<p class="dl-visual-kicker">VISUAL LESSON 02</p>
<p class="dl-visual-title"><strong>同じ情報でも、周囲を静かにすると主役が変わる。</strong></p>
<div class="dl-compare">
<div class="dl-panel">
<p class="dl-panel-label">BEFORE — EVERYTHING COMPETES</p>
<div class="dl-demo-card">
<p class="dl-event">浦和 vs ○○</p><p class="dl-meta">9.19 · 19:00</p>
<div class="dl-actions"><span class="dl-action">チケットを購入</span><span class="dl-action">詳細を見る</span><span class="dl-action">注意事項</span></div>
</div>
</div>
<div class="dl-panel dl-panel-after">
<p class="dl-panel-label">AFTER — ONE CLEAR FIGURE</p>
<div class="dl-demo-card">
<p class="dl-event">浦和 vs ○○</p><p class="dl-meta">9.19 · 19:00</p>
<div class="dl-actions"><span class="dl-action dl-action-primary">チケットを購入</span><span class="dl-action dl-action-secondary">詳細を見る · 注意事項</span></div>
</div>
</div>
</div>
<p class="dl-visual-note">AfterでCTAを巨大化していないことがポイント。補助情報のvisual weightを下げ、関係の差でfigureを作っている。</p>
</div>

ここで重要なのは、**CTAを何倍にも巨大化したことではない**。周囲との差を設計したことや。

Figure–Groundは「何を派手にするか」ではなく、**何を知覚上の主役にするか**として考えると使いやすい。

## 3. Figure–Groundを作るレバー

figureとgroundの分離は、色だけで作るわけではない。

- **Contrast** — 明暗、色、太さの差
- **Scale** — サイズ差
- **Position** — 配置と周囲との距離
- **Whitespace** — 周囲にどれだけ空間があるか
- **Shape** — 形状や境界の違い
- **Visual Weight** — 複数の要素を合わせた視覚的な強さ

だから「CTAを目立たせる」を一個のCSSプロパティへ変換しない方がいい。

```text
何をfigureにしたい？
    ↓
何がgroundと競合している？
    ↓
どの差を使えば最小変更で分離できる？
```

## 4. そのまま使える制作・修正指示

> CTAそのものを大きくする前に、周囲とのFigure–Ground関係を整理してください。補助リンクや装飾のvisual weightを下げ、CTAだけが明確なfigureとして認識できる状態を作ってください。

さらに短くするなら、

> **強調を足す前に、背景側を一段静かにできないか確認してください。**

これはWebだけでなく、SNS画像、プレゼン資料、ポスターでも使える。

## 5. 「重要なものを全部目立たせる」が失敗する理由

実務では、日付もタイトルもスポンサーもCTAも注意事項も、ほぼ全部が「重要」と言われる。

そこで全部を太字、色付き、枠付きにすると、**importance inflation**が起きる。

強調は絶対的な属性ではない。相対差で成立する。赤が一つなら目立つ。赤が十個あれば、赤はもう背景になりうる。

だから、強いUIを作るには「何を強くするか」だけでなく、**何を弱くするかを決める必要がある**。

## 6. Gestaltへ戻る：デザインは物体ではなく知覚関係を扱う

Figure–GroundはUIのために発明されたテクニックではない。20世紀初頭に展開したGestalt心理学では、人間が視覚要素をバラバラの断片としてだけではなく、まとまりや関係として知覚する仕組みが研究された。

Figure–Groundのほかにも、Proximity、Similarity、Closureなどが現在のデザイン教育やUXで頻繁に参照される。

**Design is not only about objects. It is about perception.**

ボタンと背景、見出しと本文、カードとページ。それらが**どういう関係として人間の目に現れるか**まで設計対象になる。

## 7. 誤解しやすい点：Figure = 派手、Ground = 地味ではない

白い広い背景に小さな黒い文字が一つだけあれば、小さくても十分にfigureになりうる。

逆に、赤背景、黄色文字、巨大写真、太字、影、バッジ、アニメーションを全部入れれば、コントラストが大量にあっても、どこへ注意を向けるべきか分からなくなる。

figureで重要なのは派手さではなく、**知覚上、対象として分離されること**や。

## 8. これまでの学びとの接続

<div class="dl-chain" aria-label="Design Literacyの概念接続"><span>Spacing</span><span>Proximity / Grouping</span><span>Visual Hierarchy / Order</span><span>Figure–Ground / Focus</span></div>

Proximityは「何と何が仲間か」を作る。Visual Hierarchyは「何から見るか」を作る。Figure–Groundは「何を対象として見るか」を作る。

これで「なんかCTAが弱い」を、

> 周囲もvisual weightが高く、CTAとgroundの分離が弱い。

まで具体化できる。

## 9. 30秒デザイン観察

スマホで好きなアプリやWebサイトを一つ開く。文字の意味を読まずに、**背景へ溶けているもの**と**前へ飛び出して見えるもの**だけを見る。

そのあと一つだけ問う。

> **一番前に見えるものは、本当にこの画面で一番重要なものか？**

そのズレを見つけられれば、今日の観察は成功や。

## 10. Next Concept：Swiss Styleへ

次は視点をMACROへ上げる。

ここまでは、人間が情報をどう知覚するかという側から「秩序」を考えてきた。次は、20世紀のグラフィックデザイナーたちが、**情報を秩序立てるためにどんな視覚言語を発展させたのか**を見る。

キーワードは **Grid / asymmetric layout / sans-serif typography / objective communication**。

次は **Swiss Style / International Typographic Style**。「きれいに並べるためのグリッド」から、「なぜ近代デザインは秩序を求めたのか」まで進む。

## 参考資料

- [Interaction Design Foundation — Law of Figure-Ground](https://assets.interaction-design.org/literature/topics/law-of-figure)
- [Nielsen Norman Group — 5 Principles of Visual Design in UX](https://www.nngroup.com/articles/principles-visual-design/)
- [Nielsen Norman Group — Visual Design Glossary](https://www.nngroup.com/articles/visual-design-cheat-sheet/)
