---
id: design-literacy-fitts-law-screen-edge-movement
title: 画面の端っこは、なぜ「巨大なボタン」になれるのか
subtitle: Design Literacy #43｜Fitts’s Law / Target Acquisition / Movement Design
created: 2026-09-14
updated: 2026-09-14
type: Essay
status: published
tags: ["Design Literacy", "HCI", "Fitts's Law", "Interaction Design", "UI"]
keywords: ["Fitts's Law", "Target Acquisition", "Index of Difficulty", "Target Width", "Distance", "Effective Width", "Motor Control", "Pointing", "Screen Edge", "Steering Law"]
favorite: false
grow: true
series: Design Literacy｜細部から思想まで
seriesOrder: 43
abstract: 小さなボタンは押しにくい。でも、同じ小ささでも画面端に置くと急に押しやすくなることがある。Fitts’s Lawを手がかりに、UIを「ボタンの大きさ」ではなく「人間が移動する地形」として見る。
---

# 画面の端っこは、なぜ「巨大なボタン」になれるのか

パソコンで、画面右上の何かを押す。

カーソルを勢いよく飛ばす。

ちょっと雑にやっても、意外と止まる。

理由はかなり物理的だ。

**画面の外へ、カーソルが逃げない。**

```text
                    → → → → →
┌──────────────────────────●
│                         TARGET
│
│
└───────────────────────────
```

これ、よく考えると妙である。

見た目は16pxくらいの小さなボタンでも、ある方向については「外しようがない」状態を作れる。

小さいのに、大きい。

何を言っているのか分からなくなってきた。

そこで今回は、1954年のPaul Fittsまで戻って、本気で「押しやすさ」を調べる。

## まず、ボタン単体を見るのをやめる

朝の#42では、こう考えた。

```text
VISUAL SIZE
見えている大きさ

≠

HIT AREA
実際に押せる大きさ
```

今日はもう一つ足す。

```text
START ●────────────────────[ TARGET ]
              Distance D       Width W
```

同じtargetでも、遠ければ狙いにくい。

近ければ狙いやすい。

つまり操作の難しさは、targetの中だけに存在していない。

**targetまでの道のりにも存在している。**

## FACT｜Fittsは「距離」と「幅」を一緒に測った

Paul M. Fittsは1954年の論文 *The information capacity of the human motor system in controlling the amplitude of movement* で、stylusを使って二つのtargetの間を素早く正確に往復する課題を行い、移動距離とtarget幅を変えながらmovement timeとの関係を調べた。

現代HCIでは、Fitts’s Lawは一般に「遠く、小さいtargetほど到達に時間がかかる」という形で理解されている。

よく使われるShannon formulationでは、難しさの指標を次のように表す。

```text
ID = log₂(D / W + 1)

Movement Time ≈ a + b × ID
```

ただし、Fittsの1954年原論文で使われた式と、後にHCIで広く使われる式には違いがある。

なので覚えるべきなのは「この式だけが唯一のFitts’s Law」ではない。

中心はもっと単純だ。

```text
DISTANCE ↑   → HARDER
WIDTH    ↓   → HARDER

DISTANCE ↓   → EASIER
WIDTH    ↑   → EASIER
```

**Big is good. Close is also good.**

## 画像で見ると、急に普通の話に見える

![Fitts's Lawでのtarget width Wとdistance Dの概念図](https://upload.wikimedia.org/wikipedia/commons/9/97/Fitts_Law.svg)

*Figure: Foobar628, “Fitts Law.svg”, Wikimedia Commons, CC BY-SA 4.0. Source: https://commons.wikimedia.org/wiki/File:Fitts_Law.svg*

画像を見ると、式より先に分かる。

問題は「ボタンが小さい」だけではない。

**STARTからTARGETまで、どれくらいの精度で移動しなければならないか**である。

## もう一歩やりすぎる｜同じ16pxを3か所に置く

16pxのtargetを三つ置いてみる。

### A｜近い16px

```text
● START   [×]
```

近い。

小さいけど移動は短い。

### B｜遠い16px

```text
● START ───────────────────────── [×]
```

同じ16px。

急に嫌になる。

### C｜画面端の16px

```text
● START ───────────────────────── [×]│
                                  ↑  │
                                  端 │
```

ここで変なことが起きる。

pointerを右へ飛ばしすぎても、通常のdesktop pointer環境では画面境界で止まる。

targetがその境界まで接していれば、右方向へ「通り越して外す」という失敗が起こりにくい。

つまり見た目の16pxと、運動として許される幅が一致しなくなる。

```text
VISUAL WIDTH
16px

MOTOR TOLERANCE
16pxとは限らない
```

Stanford HCIの教材でも、Fitts’s LawのUI応用として **“edges & corners are big targets”** と説明されている。

ただし、これは便利な短縮表現だ。

**画面端のボタンが文字どおり無限サイズになるわけではない。**

より正確には、pointerが境界を越えられないことで、移動方向に対するeffective width / motor toleranceが大きくなる、と考えた方がいい。

## Before → After｜「小さいから大きくする」だけじゃない

例えば、ある操作の直後に使うボタンが遠くへ飛んでいる。

### Before

```text
[ 数量を選ぶ ]




                         [ 次へ ]
```

レビューで、

> 「次へ」を大きくしてください

と言う。

もちろん改善するかもしれない。

でもFitts’s Lawを知ったあとなら、別案も見える。

### After

```text
[ 数量を選ぶ ]   [ 次へ ]
```

targetの大きさを変えなくても、**distanceを縮める**ことでmovement difficultyを下げられる。

つまり、

```text
TARGET DESIGN
ボタンをどう作る？
```

だけではなく、

```text
MOVEMENT DESIGN
前の操作から、どう辿り着く？
```

を見る。

## INTERPRETATION｜UIは「静止画」ではなく地形である

ここからは解釈。

Fitts’s Lawを制作へ持ち込むと、layoutの見え方が少し変わる。

```text
BEFORE
要素と要素の配置

AFTER
人間が移動する地形
```

button、menu、fieldを「置かれた部品」として見るだけではなく、

```text
START
 ↓
MOVE
 ↓
AIM
 ↓
ACTIVATE
```

というtrajectoryとして見る。

すると余白にも第三の意味が生まれる。

```text
VISUAL SPACE
情報の関係を示す

MOTOR SPACE
誤操作を防ぐ

MOVEMENT SPACE
次のtargetまでの距離を作る
```

余白は静止画の美しさだけの話ではない。

人間が移動する距離そのものでもある。

## そのまま使える制作・修正指示

> 頻繁に連続して使用する操作について、target sizeだけでなく、前の操作位置から次のtargetまでの移動距離も確認してください。関連操作を不必要に離れた位置へ分散させず、操作の流れに沿った近接配置を検討してください。ただし、削除・取消・決済など誤操作コストの高い操作は、Fitts’s Lawだけを理由に近づけず、意図的な分離も検討してください。

短く言うなら、

> **「そのボタン、何px？」の次に「前の操作から何px遠い？」も見てください。**

## 誤解しやすい点｜右上に置けば全部正解、ではない

Fitts’s Lawが主に説明するのはtarget acquisitionのmovement difficulty / movement timeだ。

UIには他にも仕事がある。

```text
DISCOVERABILITY
見つかる？

SEMANTICS
意味が分かる？

ERROR COST
間違えたらどうなる？

SEQUENCE
操作順として自然？

ACCESSIBILITY
別の入力方法でも使える？
```

さらに、画面端の利点は**mouse / trackpad pointerのようにscreen boundaryでpointerが止まる環境**で特に分かりやすい。

指で直接触るtouchscreenでは、「端を越えてpointerが逃げない」という性質を同じ形では使えない。端に近いcontrolは、握り方やdevice形状によって逆に届きにくい場合もある。

**Fitts’s Law is a model, not a layout generator.**

数式に全部のUIを決めてもらったらあかん。

## #42との接続｜「どこまで押せる？」から「そこまでどう行く？」へ

#42 Target Sizeでは、

```text
SEE
↓
AIM
↓
HIT
```

の最後を見た。

今日は、その前にあるmovementを入れる。

```text
DISCOVER
見つける
↓
IDENTIFY
意味を知る
↓
MOVE
そこへ移動する
↓
AIM
狙う
↓
ACTIVATE
操作する
```

Visual hierarchyが良くても、targetまで遠くて小さければ操作はしんどい。

targetが巨大でも、何のボタンか分からなければ使えない。

**「見つけやすい」と「押しやすい」は別の設計問題で、その間にmovementがある。**

## 30秒でできる観察｜カーソルの旅を一本だけ見る

PCで今開いているサイトを一つ見る。

よく連続して使う操作を二つ選ぶ。

例えば、

```text
入力欄 → 送信
検索欄 → 検索
商品選択 → カート
```

実際にpointerを移動する。

そして、

```text
STARTはどこ？
↓
どれくらい移動した？
↓
TARGETはどれくらい広い？
↓
こんなに離す必要ある？
```

を見る。

ボタンをレビューしているつもりが、いつの間にか**道**をレビューしているはずだ。

## 次につながる概念｜Steering Law

Fitts’s Lawは主に、targetへ到達する問題を見る。

次は、

```text
細い道から外れずに進む
```

問題を見ると面白い。

例えば階層menu。

submenuへ移動しようとして、ほんの少し斜めに外れた瞬間、親menuが閉じる。

あれは「targetへ届く」だけでなく、**途中のpathを維持する**問題になる。

そこでつながるのが **Steering Law**。

button designから、cursor trajectory designへ進める。

---

## 今日の中心命題

**Do not design targets in isolation. Design the movement between them.**

ボタン単体だけを設計しない。

**ボタンまでの移動も設計する。**

最初は、画面端のボタンが押しやすいのは「端だから」くらいに思っていた。

調べたあとでは、同じ景色がちょっと変わる。

画面端が巨大なのではない。

**人間が失敗できる方向が、一つ減っている。**

そしてUI全体も、部品の集合ではなくなる。

STARTがあり、距離があり、狙う幅があり、人間がそこを移動する。

UIは静止画やない。

**人間が移動する地形や。**

### 専門語 / Search terms

`Fitts's Law` / `Target Acquisition` / `Movement Time` / `Index of Difficulty` / `Target Width` / `Distance` / `Effective Width` / `Motor Control` / `Pointing` / `Screen Edge` / `Steering Law`

### Sources

- Paul M. Fitts, “The information capacity of the human motor system in controlling the amplitude of movement,” *Journal of Experimental Psychology*, 47(6), 1954, pp. 381–391. DOI: https://doi.org/10.1037/h0055392
- Stanford HCI — Interaction Design lecture, Fitts’s Law / edges & corners: https://hci.stanford.edu/courses/cs377e/2016/sp/lectures/10-interaction-design.pdf
- Stanford HCI — Understanding & Modeling Input: https://hci.stanford.edu/courses/cs147/2009/lectures/05-Input/CS147-2009-10-06-input.pdf
- Interaction Design Foundation — Fitts’ Law: https://assets.interaction-design.org/literature/topics/fitts-law
- Wikimedia Commons — Fitts Law.svg (Foobar628, CC BY-SA 4.0): https://commons.wikimedia.org/wiki/File:Fitts_Law.svg
