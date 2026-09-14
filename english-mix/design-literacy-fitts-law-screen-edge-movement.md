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
abstract: 小さなbuttonは押しにくい。でも、同じsmall targetでもscreen edgeに置くと急に押しやすくなることがある。Fitts’s Lawを手がかりに、UIを「button size」ではなく「人間が移動する地形」として見る。
---

# 画面の端っこは、なぜ「巨大なボタン」になれるのか

PCで、画面右上の何かを押す。

Cursorを勢いよく飛ばす。

A little sloppyでも、意外と止まる。

理由はかなりphysicalだ。

**The cursor cannot escape beyond the screen.**

```text
                    → → → → →
┌──────────────────────────●
│                         TARGET
│
│
└───────────────────────────
```

これ、よく考えると妙である。

見た目は16pxくらいのtiny buttonでも、ある方向については「外しようがない」状態を作れる。

Small, but somehow big.

何を言っているのか分からなくなってきた。

そこで今回は1954年のPaul Fittsまで戻って、本気で「押しやすさ」を調べる。

## まず、ボタン単体を見るのをやめる

朝の#42では、こう考えた。

```text
VISUAL SIZE
見えている大きさ

≠

HIT AREA
実際に押せる大きさ
```

Today, add one more thing.

```text
START ●────────────────────[ TARGET ]
              Distance D       Width W
```

同じtargetでも、farther means harder。

近ければeasier。

つまり操作のdifficultyはtargetの中だけに存在していない。

**It also lives on the way to the target.**

## FACT｜Fittsは「距離」と「幅」を一緒に測った

Paul M. Fittsは1954年の論文 *The information capacity of the human motor system in controlling the amplitude of movement* で、stylusを使って二つのtargetの間を素早く正確に往復するtaskを行い、movement distanceとtarget widthを変えながらmovement timeとの関係を調べた。

現代HCIではFitts’s Lawは、ざっくり言えば **farther + smaller = slower / harder** と理解される。

よく使われるShannon formulationでは、difficultyを次のように表す。

```text
ID = log₂(D / W + 1)

Movement Time ≈ a + b × ID
```

ただし、Fittsのoriginal 1954 equationと、後にHCIで広く使われるformulationには違いがある。

So don’t memorize one equation as the whole law.

中心はもっとsimpleだ。

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

図を見ると、equationより先に分かる。

問題は「button is small」だけではない。

**How precisely must you travel from START to TARGET?**

それが問題だ。

## もう一歩やりすぎる｜同じ16pxを3か所に置く

16pxのtargetを三つ置いてみる。

### A｜近い16px

```text
● START   [×]
```

近い。

Small, but short travel.

### B｜遠い16px

```text
● START ───────────────────────── [×]
```

Same 16px.

急に嫌になる。

### C｜画面端の16px

```text
● START ───────────────────────── [×]│
                                  ↑  │
                                  edge
```

ここで変なことが起きる。

Desktop pointerを右へ飛ばしすぎても、通常はscreen boundaryで止まる。

Targetが境界まで接していれば、右方向へovershootして外す失敗が起こりにくい。

つまり、visual 16pxとmotor toleranceが一致しなくなる。

```text
VISUAL WIDTH
16px

MOTOR TOLERANCE
not necessarily 16px
```

Stanford HCIの教材でも、Fitts’s LawのUI応用として **“edges & corners are big targets”** と説明される。

But that sentence is shorthand.

**The edge is not literally an infinite-size button.**

より正確には、pointerがboundaryを越えられないことで、movement方向に対するeffective width / motor toleranceが大きくなる、と考えた方がいい。

## Before → After｜「小さいから大きくする」だけじゃない

ある操作の直後に使うbuttonが、遠くへ飛んでいる。

### Before

```text
[ 数量を選ぶ ]




                         [ 次へ ]
```

レビューで、

> 「次へ」をもっと大きく

と言う。

That may help.

でもFitts’s Lawを知ったあとなら、別案も見える。

### After

```text
[ 数量を選ぶ ]   [ 次へ ]
```

Button sizeを変えなくても、**reduce the distance**できる。

つまり、

```text
TARGET DESIGN
How should the button be built?
```

だけではなく、

```text
MOVEMENT DESIGN
How do I get there from the previous action?
```

を見る。

## INTERPRETATION｜UIは「静止画」ではなく地形である

ここからはinterpretation。

Fitts’s Lawを制作へ持ち込むと、layoutの見え方が変わる。

```text
BEFORE
配置されたcomponents

AFTER
a terrain humans move through
```

button、menu、fieldを置かれたpartsとして見るだけでなく、

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

するとspacingにも第三の意味が生まれる。

```text
VISUAL SPACE
情報の関係を示す

MOTOR SPACE
誤操作を防ぐ

MOVEMENT SPACE
次のtargetまでの距離を作る
```

Whitespace is not only about visual calm.

人間が移動するdistanceでもある。

## そのまま使える制作・修正指示

> 頻繁に連続して使う操作では、target sizeだけでなく、前の操作位置から次のtargetまでのmovement distanceも確認してください。関連操作を不必要に離れた位置へ分散させず、flowに沿ったnearby placementを検討してください。ただし、削除・取消・決済などerror costの高い操作は、Fitts’s Lawだけを理由に近づけず、意図的な分離も検討してください。

Short version:

> **「そのbutton何px？」の次に、「前の操作から何px遠い？」も見る。**

## 誤解しやすい点｜右上に置けば全部正解、ではない

Fitts’s Lawが主に説明するのはtarget acquisitionのmovement difficulty / time。

UIには他にも仕事がある。

```text
DISCOVERABILITY
見つかる？

SEMANTICS
意味が分かる？

ERROR COST
間違えたら？

SEQUENCE
操作順として自然？

ACCESSIBILITY
別のinputでも使える？
```

さらにscreen-edge advantageは、mouse / trackpad pointerのようにboundaryでpointerが止まる環境で特に分かりやすい。

Touchscreenでは同じ性質がそのまま成立しない。指はpointer clippingされるわけではないし、edge controlsはgripやdevice shapeによって逆にreachしにくい場合もある。

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

Today, add movement before aim.

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

Visual hierarchyが良くても、targetまでfar + smallなら操作はしんどい。

Huge targetでも、意味が分からなければ使えない。

**“Easy to find” and “easy to hit” are different design problems, and movement sits between them.**

## 30秒でできる観察｜カーソルの旅を一本だけ見る

PCで今開いているsiteを一つ見る。

連続して使うoperationsを二つ選ぶ。

```text
入力欄 → 送信
検索欄 → 検索
商品選択 → カート
```

実際にpointerを移動する。

Then ask:

```text
Where is START?
↓
How far did I travel?
↓
How wide is the TARGET?
↓
Does it really need to be this far away?
```

button reviewのつもりが、いつの間にか**the road**をレビューしているはずだ。

## 次につながる概念｜Steering Law

Fitts’s Lawは主に、reach a targetする問題を見る。

次は、

```text
stay inside a narrow path
```

を見ると面白い。

例えばhierarchical menu。

submenuへ移動しようとして、少し斜めに外れた瞬間、parent menuが閉じる。

あれはtarget acquisitionだけでなく、**maintaining the path**の問題。

そこでつながるのが **Steering Law**。

button designからcursor trajectory designへ進める。

---

## 今日の中心命題

**Do not design targets in isolation. Design the movement between them.**

ボタン単体だけを設計しない。

**Design the journey to the button.**

最初は、screen-edge buttonが押しやすいのは「端だから」くらいに思っていた。

After researching it, the same edge looks different.

画面端が巨大なのではない。

**One direction of failure has been removed.**

そしてUI全体も、partsの集合ではなくなる。

STARTがあり、distanceがあり、aiming widthがあり、人間がそこをmoveする。

UIは静止画やない。

**It is terrain for human movement.**

### 専門語 / Search terms

`Fitts's Law` / `Target Acquisition` / `Movement Time` / `Index of Difficulty` / `Target Width` / `Distance` / `Effective Width` / `Motor Control` / `Pointing` / `Screen Edge` / `Steering Law`

### Sources

- Paul M. Fitts, “The information capacity of the human motor system in controlling the amplitude of movement,” *Journal of Experimental Psychology*, 47(6), 1954, pp. 381–391. DOI: https://doi.org/10.1037/h0055392
- Stanford HCI — Interaction Design lecture, Fitts’s Law / edges & corners: https://hci.stanford.edu/courses/cs377e/2016/sp/lectures/10-interaction-design.pdf
- Stanford HCI — Understanding & Modeling Input: https://hci.stanford.edu/courses/cs147/2009/lectures/05-Input/CS147-2009-10-06-input.pdf
- Interaction Design Foundation — Fitts’ Law: https://assets.interaction-design.org/literature/topics/fitts-law
- Wikimedia Commons — Fitts Law.svg (Foobar628, CC BY-SA 4.0): https://commons.wikimedia.org/wiki/File:Fitts_Law.svg
