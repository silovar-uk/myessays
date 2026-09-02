---
id: design-literacy-affordance-signifier-discoverability
title: "押せるだけでは足りない――AffordanceとSignifierで『操作できる』を伝える"
subtitle: "Design Literacy #7｜CapabilityからDiscoverabilityへ"
created: "2026-09-02"
updated: "2026-09-02"
type: "Essay"
status: "完成"
tags: ["Design Literacy", "デザイン", "Affordance", "Signifier", "Interaction", "UI", "UX", "Flat Design"]
keywords: ["affordance", "signifier", "discoverability", "clickability", "interaction design", "flat design", "skeuomorphism", "Don Norman", "James Gibson"]
favorite: 5
grow: 5
series: "Design Literacy｜細部から思想まで"
seriesOrder: 7
abstract: "AffordanceとSignifierを『押せそうに見えること』として一括りにせず、行為の可能性と、その可能性を知覚させる手がかりに分けて理解する。Touch Targetで扱ったInteraction GeometryからDiscoverabilityへ進み、Flat Designでsignifierを削りすぎる問題まで、制作指示に戻せる形で整理する。"
---

# 押せるだけでは足りない――AffordanceとSignifierで「操作できる」を伝える
## Design Literacy #7｜CapabilityからDiscoverabilityへ

**An action can be possible and still be invisible.**

前回のTouch Targetでは、見えているiconの大きさと、実際に押せるhit areaは別物だと考えた。

でも、ここで次の問題が出る。

**十分に押せる領域があっても、ユーザーが「ここは押せる」と気づかなければどうなる？**

今回は、**Affordance**と**Signifier**を分けて考える。

## 1. まず一言：押せることと、押せると分かることは違う

たとえば、画面上にただ文字がある。

```text
チケットを購入
```

内部的にはlinkが設定されていて、押せる。

でも、本文と同じ色・太さ・見た目なら、ユーザーには単なる文章に見えるかもしれない。

そこで、

```text
[ チケットを購入 ]
```

のような境界、色、配置、ラベルなどを加える。

このとき重要なのは、

**できること**と、**できることを伝えるもの**を分けることや。

## 2. AffordanceとSignifierは同じではない

Affordanceという概念は、心理学者James J. Gibsonのecological psychologyに由来する。Gibsonの議論では、affordanceは環境と行為者の関係にある**action possibility**として扱われ、必ずしも知覚されている必要はない。

その後Don Normanがデザインへこの言葉を持ち込み、製品の使い方を理解しやすくする議論に広く使われるようになった。

ただしNorman自身は、デザイン領域でaffordanceという語が「操作の手がかり」の意味まで背負いすぎたことを後に問題視し、**Signifier**という語を強調した。

[Don Norman — Signifiers, not affordances](https://jnd.org/signifiers-not-affordances/)

[Interaction Design Foundation — Affordances](https://assets.interaction-design.org/literature/book/the-encyclopedia-of-human-computer-interaction-2nd-ed/affordances)

ざっくり分けるなら、

```text
Affordance
何ができる？

Signifier
何ができると、どう分かる？
```

や。

## 3. Visual Lesson：機能を変えずに、Discoverabilityを変える

<div class="dl-visual" role="group" aria-label="Signifierの弱いUIと強いUIの比較">
<p class="dl-visual-kicker">VISUAL LESSON</p>
<p class="dl-visual-title"><strong>同じclickable areaでも、手がかりが弱いと操作は見つけにくい。</strong></p>
<div class="dl-compare">
<div class="dl-panel">
<p class="dl-panel-label">BEFORE — ACTION EXISTS, CUE IS WEAK</p>
<div class="dl-demo-card">
<p class="dl-event">MATCH INFORMATION</p>
<p class="dl-meta">詳細情報とチケット案内</p>
<div class="dl-actions"><span>チケットを購入</span><span>詳細を見る</span></div>
</div>
</div>
<div class="dl-panel dl-panel-after">
<p class="dl-panel-label">AFTER — ACTION IS SIGNIFIED</p>
<div class="dl-demo-card">
<p class="dl-event">MATCH INFORMATION</p>
<p class="dl-meta">詳細情報とチケット案内</p>
<div class="dl-actions"><span class="dl-action dl-action-primary">チケットを購入</span><span class="dl-action dl-action-secondary">詳細を見る</span></div>
</div>
</div>
</div>
<p class="dl-visual-note">両方とも技術的にはclickableにできる。違うのは「押せる可能性」そのものではなく、その可能性を利用者へ伝えるsignifierの強さ。</p>
</div>

ここで改善しているのは、hit areaではない。

**Discoverability**や。

## 4. Signifierは影だけではない

「ボタンらしく見せる」と聞くと、立体的なshadowを想像しやすい。

でもsignifierはもっと広い。

- **Shape** — buttonらしい境界や形
- **Color / Contrast** — static textとの違い
- **Label** — 「購入」「保存」などactionを示す言葉
- **Placement** — navigationやtoolbarなど慣れた場所
- **Consistency** — 同じ見た目なら同じ挙動をする
- **Icon** — 検索、共有、戻るなど学習済みの記号
- **Motion / Feedback** — hover、pressed state、focusなど

つまり、

```text
Signifier ≠ 3D shadow
```

や。

Nielsen Norman Groupも、clickabilityはborder、color、size、consistency、placement、既存のWeb conventionなど複数の手がかりから判断されると整理している。

[Nielsen Norman Group — Beyond Blue Links](https://www.nngroup.com/articles/clickable-elements/)

## 5. そのまま使える制作・修正指示

「もっとボタンっぽくしてください」では、装飾を増やすだけになりやすい。

制作指示なら、こう言える。

> **この要素はclickableですが、周囲のstatic textと視覚的な扱いが近く、操作可能性を示すsignifierが弱いです。border・contrast・label・placement・状態変化のうち必要最小限の手がかりを追加し、操作前に『押せる』と判断できる状態にしてください。**

短くするなら、

> **押せるかどうかではなく、押せると分かる根拠は何ですか？**

これで「機能しているからOK」から一段上がれる。

## 6. Flat Designへ接続する：削ったものは装飾だけだったか

ここでMACRO / UI史へ上がる。

2010年代に広がったFlat Designでは、gradient、bevel、shadowなど、それ以前のGUIやskeuomorphic interfaceで使われていた奥行き表現が大きく削られた。

その方向自体を「悪い」とするのは単純すぎる。視覚的ノイズを減らし、contentを前面に出しやすくした面もある。

ただし、装飾を減らす過程で**interactionの手がかりまで一緒に削る**と問題が起きる。

NN/gの研究では、弱いsignifierやsignifierのないflat UIは、interactive elementを見つけるための努力を増やし、不確実性を生みうることが報告されている。

[Nielsen Norman Group — Flat UI Elements Attract Less Attention and Cause Uncertainty](https://www.nngroup.com/articles/flat-ui-less-attention-cause-uncertainty/)

ここから先は解釈になるが、Flat Designの重要な問いは、

> **何を削るかではなく、削ったあとにも意味が残っているか**

と考えられる。

## 7. 誤解しやすい点：Affordance = 見た目ではない

UIレビューで、

> 「このボタン、affordanceが弱い」

という言い方をよく見る。

実務会話として意味が通じる場合はある。ただ、概念を厳密に分けるなら、「押せることを示す視覚的手がかりが弱い」という問題は**signifierが弱い**と表現した方が精密や。

Norman自身も、affordanceを「知覚可能な手がかり」の意味で広く使う混乱を指摘し、デザイナーはsignifierへ注意を向けるべきだと述べている。

だから今日から、

```text
押せる可能性がある
= Affordance側

押せると分かる
= Signifier側
```

と一度分けてみる。

完全に学術用語を統一するためではなく、**問題を切り分けるための語彙**として使う。

## 8. これまでの学びとの接続

<div class="dl-chain" aria-label="Design Literacyの概念接続"><span>Figure–Ground / Focus</span><span>Alignment / Visual Geometry</span><span>Touch Target / Interaction Geometry</span><span>Affordance / Capability</span><span>Signifier / Discoverability</span></div>

前回は、

**そこを押せるか？**

を見た。

今回は、

**そこを押せると気づけるか？**

を見る。

さらにFigure–Groundへ戻ると、signifierがあっても周囲のvisual noiseに埋もれていれば、見つからないことがある。

つまり、

```text
Capability
できる

↓

Discoverability
できると分かる

↓

Salience
必要なときに見つかる
```

は別々に設計する必要がある。

これが今回の「前より解像度が上がる接続」や。

## 9. 30秒でできる観察

スマホアプリかWebサイトを一つ開く。

まだ押さずに、画面上の要素を二つに分ける。

**押せそうなもの。**

**押せなさそうなもの。**

そのあと実際に触ってみる。

予想が外れた場所を探す。

- 押せそうなのに押せない
- 押せなさそうなのに押せる

どちらもsignifierとbehaviorの不一致や。

次に一つだけ問う。

> **自分は何を手がかりに「押せる」と判断した？**

borderか。色か。場所か。iconか。過去の経験か。

そこまで言えれば成功。

## 10. Next Concept：Feedback

「押せると分かる」まで来ると、次の問いが出る。

**押したあと、操作が成功したと分かるか？**

```text
Affordance
何ができる？

↓

Signifier
どこでできると分かる？

↓

Feedback
やった結果、何が起きたと分かる？
```

次は **Feedback / System Status** を扱うと、interactionの時間軸が入ってくる。

静止画として美しいだけではなく、操作の前・最中・後まで設計する。

今日の中心命題はこれ。

**An action can be possible and still be invisible.**

「機能があるか」だけではなく、次からは**その機能の存在を、ユーザーは何から知るのか？**まで見る。

## 参考資料

- [Don Norman — Signifiers, not affordances](https://jnd.org/signifiers-not-affordances/)
- [Interaction Design Foundation — Affordances](https://assets.interaction-design.org/literature/book/the-encyclopedia-of-human-computer-interaction-2nd-ed/affordances)
- [Nielsen Norman Group — Beyond Blue Links: Making Clickable Elements Recognizable](https://www.nngroup.com/articles/clickable-elements/)
- [Nielsen Norman Group — Flat UI Elements Attract Less Attention and Cause Uncertainty](https://www.nngroup.com/articles/flat-ui-less-attention-cause-uncertainty/)
- [Nielsen Norman Group — Flat-Design Best Practices](https://www.nngroup.com/articles/flat-design-best-practices/)
