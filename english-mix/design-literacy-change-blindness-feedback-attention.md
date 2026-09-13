---
id: design-literacy-change-blindness-feedback-attention
title: ちゃんと画面が変わったのに、なんで誰も気づかんの？
subtitle: Design Literacy #39｜Change Blindnessから考える「表示した」と「気づいた」の距離
created: 2026-09-13
updated: 2026-09-13
type: Essay
status: published
tags: ["Design Literacy", "Change Blindness", "Attention", "Feedback", "UX"]
keywords: ["Change Blindness", "Change Detection", "Attention", "Visual Memory", "Feedback", "State Change", "Visibility of System Status", "Inattentional Blindness"]
favorite: false
grow: true
series: Design Literacy｜細部から思想まで
seriesOrder: 39
abstract: 「保存しました」は画面に出ている。それでもユーザーは「保存された？」と聞く。Change Blindness researchを手がかりに、UI feedbackを“change happened”ではなく“change entered attention”として捉え直す。
---

# ちゃんと画面が変わったのに、なんで誰も気づかんの？

フォーム下の **Save** buttonを押す。

画面上部にgreen messageが出る。

**Saved.**

From the system side, everything is correct.

表示した。色も変えた。check markまで付けた。

なのにユーザーは数秒後、こう言う。

> 「これ、保存されたんですか？」

……It was right there.

でも、人間の視覚は「screenにあるものを全部確認してから次へ進む」ようには動かない。

今回は、**the screen changed** と **the user noticed the change** のあいだにある距離を掘る。

## まず、一番くだらない実験をする

Imagine this UI.

あなたはいま画面下部で住所を入力している。

```text
郵便番号 [________]
住所     [____________________]

                [ 保存する ]
```

保存するを押した瞬間、top of the screenだけ変わる。

```text
✓ Saved

（ここから下は同じ）
```

System state changed correctly.

でもyour eyes are still near the button.

これは、**a correct answer happening far away** である。

正解なのに、遠い。

## FACT｜かなり大きな変化でも、人は見逃す

Change Blindnessとは、sceneに実際のchangeが存在していても、それをdetectできない現象を指す。

Research by Daniel Simons and others shows that attention and visual representation are limited. We do not keep a complete, high-detail copy of everything we just saw.

特に面白いのは、blankやcutのようなvisual disruptionがある場合だけではないこと。

Simons, Franconeri, and Reimer reported that even when change happens gradually, observers can still miss surprisingly large changes.

つまり、

```text
BIG CHANGE
≠
GUARANTEED NOTICE
```

UIを作る側には、ちょっと都合が悪い。

## UIでは「答えを知っている人」がレビューしている

Designerやdeveloperはレビュー時点で、

- what will change
- where it will change
- when it will change
- what it means

を知っている。

ユーザーは知らない。

NN/g points out this asymmetry in UI change blindness. A designer knows exactly where to look, while a user may be focused somewhere else. If multiple regions change at once, the changes can compete for attention.

つまり制作側は、最初から**answer key**を持っている。

それで「ほら、見える」はちょっとずるい。

## もう一歩やりすぎる｜Feedbackを四隅へ飛ばしてみる

Put the Save button in the bottom-right.

Then move the feedback around.

```text
ROUND 1 → top-left “Saved”
ROUND 2 → top-right “Saved”
ROUND 3 → bottom-left “Saved”
ROUND 4 → the button itself becomes “Saved ✓”
```

Which one is easiest to notice?

実際のanswerはtaskやcontextで変わる。

ただ、Round 4はユーザーが操作した対象そのものがresponseになる。

ここから見たいのは、単純な「near = always better」ではない。

> **Does the system response enter the current flow of attention?**

Feedback design is not only a placement problem. It is an **attention routing** problem.

## INTERPRETATION｜Feedbackには4段階ある

```text
ACTION
↓
SYSTEM RESPONSE
↓
NOTICE
↓
UNDERSTAND
```

### ACTION
Saveを押す。

### SYSTEM RESPONSE
Data is saved and the UI changes.

### NOTICE
ユーザーがそのchangeに気づく。

### UNDERSTAND
「保存された」と意味を理解する。

Implementation reviewは2で止まりやすい。

UX reviewでは4まで見る。

**State changed. So what?**

If the meaning did not change in the user’s mind, the change only happened inside the interface.

## Before → After｜「上にToast」で終わらせない

### Before

> 保存後、画面上部にsuccess toastを表示してください。

Component specificationとしては成立している。

でも、why there? は分からない。

### After

> 保存操作の直後に、ユーザーが結果を見失わないようfeedbackを操作対象の近くでも確認できる状態にしてください。必要に応じてbutton自体を「保存済み」に変化させ、遠方のToastだけに成功状態を依存しないでください。複数領域を同時に変化させる場合は、attentionが競合しないか確認してください。

Short version:

> **その変化、ユーザーが今見ている場所で気づけますか？**

## Animationは救世主ではない

Change Blindnessを知ると、次にこう言いたくなる。

> “Then animate it.”

Half right.

Motion can be a useful change cue. NN/g also recommends animation in some cases, but warns against competing animations that dilute attention.

```text
MORE MOTION
≠
MORE NOTICE
```

保存完了を知らせたいのに、同時にbannerがslideし、carouselが動き、notification badgeがbounceしたら、画面全体が **look at me competition** になる。

Who wins? Nobody knows.

## #37との接続｜「差を作る」と「差に気づく」は別

#37ではPreattentive Processing / Visual Searchを扱った。

```text
FEATURE
↓
DIFFERENCE
↓
ATTENTION
```

今日はその続きをtime axisに置く。

```text
ATTENTION
↓
BEFORE
↓
STATE CHANGE
↓
AFTER
↓
CHANGE DETECTION
```

つまり、**designing a difference does not guarantee detecting a difference.**

#37 is “Where do I look?”

#39 is “Did I notice that it changed?”

ここまでつなぐと、Visual Hierarchyはstatic compositionだけの話ではなくなる。

It becomes the design of attention over time.

## FACT / INTERPRETATION

**FACT:** Change Blindness research shows that people can miss visible scene changes and that attention is closely related to change detection.

**FACT:** NN/g explains that UI changes far from the focus of attention, or multiple simultaneous changes, can easily be missed.

**INTERPRETATION:** For UI work, a more useful quality criterion is not merely “Did feedback render?” but **“Did the state change enter the user’s attention flow?”**

これは心理学研究から直接「buttonの横に出せ」というruleが導かれる、という意味ではない。

Task, screen size, assistive technology, notification importanceなどでappropriate feedback channelは変わる。

## 30秒観察｜変わった場所を追う

今日使うappで一回だけやってみる。

1. 保存・お気に入り・filterなど何か操作する
2. 直後に “What changed?” と考える
3. その場所と、直前に見ていた場所の距離を見る
4. 見逃したら次の行動にどんな誤解が出るか考える

特に、

> “A notification appears at the top.”

というUIは面白い。

目がbottomにいるなら、それはscreen coordinatesではなく **attention distance** で考えられる。

## 次につながる概念｜Inattentional Blindness

Change Blindnessは「変わったのに気づかない」。

Inattentional Blindnessは、**最初からそこにあるものに気づかない**。

```text
VISIBLE
≠
SEEN

CHANGED
≠
NOTICED
```

似ているけど違う。

---

### 今日の中心命題

**A change must not only happen. It must enter attention.**

変化は起こるだけでは足りない。

**It has to enter attention before it works as feedback.**

調べる前は、「Saved」が表示されていればUIの責任は果たしているように見えた。

でも今は少し違う。

緑のToastが出ているのにユーザーが「保存された？」と聞いたとき、そこには見落としだけではなく、**where the interface placed the change** というdesign questionもある。

The screen changed.

But inside the user, nothing had changed yet.

そのdistanceを埋めるのがFeedbackなんやと思う。

### 専門語 / Search terms

`Change Blindness` / `Change Detection` / `Attention` / `Visual Memory` / `Feedback` / `State Change` / `Visibility of System Status` / `Inattentional Blindness` / `Attention Routing`

### Sources

- Daniel J. Simons & Michael S. Ambinder, “Change Blindness: Theory and Consequences,” *Current Directions in Psychological Science*, 2005.
- Daniel J. Simons, Steven L. Franconeri & Rebecca L. Reimer, “Change Blindness in the Absence of a Visual Disruption,” *Perception*, 2000.
- Nielsen Norman Group, “Change Blindness in UX: Definition,” 2018. https://www.nngroup.com/articles/change-blindness-definition/
