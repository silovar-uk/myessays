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
abstract: 「保存しました」は画面に出ている。それでもユーザーは「保存された？」と聞く。Change Blindness研究を手がかりに、UIのfeedbackを“変化を起こすこと”ではなく“変化がattentionに入ること”として捉え直す。
---

# ちゃんと画面が変わったのに、なんで誰も気づかんの？

フォームの下にある「保存する」を押した。

画面上部に緑色のメッセージが出た。

**保存しました。**

実装担当からすれば、仕事は終わっている。

表示した。色も変えた。チェックマークまで付けた。

なのにユーザーは数秒後、こう言う。

> 「これ、保存されたんですか？」

……出したやん。

ここで「ユーザーがちゃんと見ていない」で終わらせると、UXの仕事がかなり減る。都合がいい。ただし、人間の視覚はそもそも「画面にあるものを全部確認してから次へ進む」ようにはできていない。

今回は、**画面が変わったこと**と**人間が変化に気づくこと**のあいだにある、妙に大きな穴を調べる。

## まず、一番くだらない実験をする

想像してみる。

あなたはいま、画面下部のフォームに住所を入力している。

```text
郵便番号 [________]
住所     [____________________]

                [ 保存する ]
```

「保存する」を押した瞬間、画面の一番上だけが変わる。

```text
✓ 保存しました

（ここから下は同じ画面）
```

システムから見ると、明白なstate changeだ。

でもユーザーの目は、ついさっき押したボタンのあたりにいる。

つまりこれは、**遠くで起きた正解**である。

正解なのに、遠い。

## FACT｜かなり大きな変化でも、人は見逃す

Change Blindnessは、sceneの変化が視覚的に存在していても、その変化を検出できない現象を指す。

Daniel Simonsらによる研究・レビューでは、変化の前後を比較するために必要なattentionやvisual representationには限界があり、人は自分が想像するほどsceneの詳細を完全に保持してはいないことが示されてきた。

とくに興味深いのは、変化の途中にblankやcutのような視覚的disruptionがある場合だけではないことだ。

Simons, Franconeri, Reimerは、対象が徐々に変化する条件でも、観察者がかなり大きな変化を見逃すことがあると報告している。

つまり、

```text
変化が大きい
=
必ず気づく
```

ではない。

ここ、UIを作る側には少し都合が悪い。

## UIでは「変更箇所を知っている人」がレビューしている

Change BlindnessをUXへ持ち込むと、もう一つ厄介なことがある。

デザイナーや開発者は、レビュー時点で、

- 何が変わるか
- どこが変わるか
- いつ変わるか
- その意味は何か

を全部知っている。

ユーザーは知らない。

NN/gはこの非対称性を、UI上のchange blindnessを考える際の重要な問題として説明している。制作者には「明らか」に見える変化でも、ユーザーは別の場所へattentionを向けているため見逃しうる。ユーザー操作によって複数領域が同時に変化する場合、とくに競合が起きやすい。

要するに、レビューする側には**答え合わせ用のカンニングペーパーが最初から渡されている**。

それで「ほら、見えるでしょ」はちょっとずるい。

## もう一歩やりすぎる｜Feedbackを画面の四隅に飛ばしてみる

では極端にする。

「保存する」ボタンを右下に置く。

Feedbackだけ、毎回ランダムな場所へ出す。

```text
ROUND 1 → 左上「保存しました」
ROUND 2 → 右上「保存しました」
ROUND 3 → 左下「保存しました」
ROUND 4 → ボタン自身が「保存済み」に変わる
```

どれが一番気づきやすいか。

もちろん実際の結果はcontextやtaskで変わる。ただ、4だけは**ユーザーが操作した対象そのものがresponseになる**。

ここで重要なのは「近くなら絶対正解」ということではない。

むしろ、

> **ユーザーがいまattentionを向けている流れの中に、system responseが入っているか**

を見る。

Feedback設計は位置の問題というより、**attention routing**の問題になる。

## INTERPRETATION｜Feedbackは4段階ある

操作するとsystem stateが変わる。

でも、それだけではユーザー体験上のfeedbackは完成しない。

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
保存ボタンを押す。

### SYSTEM RESPONSE
データが保存され、UIも変わる。

### NOTICE
ユーザーがその変化に気づく。

### UNDERSTAND
「保存された」と意味を理解する。

実装レビューでは2で止まりやすい。

UXレビューでは4まで見る。

**State changed. So what?**

ユーザーの中で意味が更新されていなければ、interface上だけで起きた変化になる。

## Before → After｜「上にToastを出しました」で終わらせない

### Before

> 保存後、画面上部に成功Toastを表示してください。

これはUI componentの指定にはなっている。でも、なぜそこに出すのかは分からない。

### After

> 保存操作の直後に、ユーザーが結果を見失わないようfeedbackを操作対象の近くでも確認できる状態にしてください。必要に応じてボタン自体を「保存済み」に変化させ、遠方のToastだけに成功状態を依存しないでください。複数領域を同時に変化させる場合は、attentionが競合しないか確認してください。

さらに短くするなら、

> **「その変化、ユーザーが今見ている場所で気づけますか？」**

でいい。

## Animationは救世主ではない

Change Blindnessを知ると、次に出てくるのがこれ。

> 「じゃあ動かせばええやん」

半分正しい。

Motionはchange cueになりうる。NN/gも、変化を知らせる手段としてanimationを挙げる一方、複数のanimationが競合すればattentionが分散すると注意している。

つまり、

```text
MORE MOTION
≠
MORE NOTICE
```

である。

保存完了を知らせたいのに、同時にバナーがスライドし、カルーセルが切り替わり、通知バッジが跳ねたら、画面全体が「俺を見ろ選手権」になる。

勝者は設計者にも分からない。

## #37からの接続｜「差を作る」と「差に気づく」は別

#37ではPreattentive Processing / Visual Searchを扱った。

そこで見たのは、

```text
FEATURE
↓
DIFFERENCE
↓
ATTENTION
```

だった。

今日はその続きを時間軸に置く。

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

つまり、**差を設計したからといって、その差が必ず知覚されるわけではない。**

#37は「どこを見る？」。

#39は「変わったことに気づく？」。

ここまでつなぐと、Visual Hierarchyは静止画の話ではなくなる。

**時間の中でattentionをどう移動させるか**までがHierarchyになる。

## FACT / INTERPRETATIONを分けておく

**FACT:** Change Blindness研究は、人がsceneの変化をしばしば見逃すこと、attentionとchange detectionが密接に関係することを示している。

**FACT:** UIでも、focus of attentionから離れた場所の変更や、同時に複数箇所が変わる状況ではchangeが見逃されうるとNN/gは整理している。

**INTERPRETATION:** UIでは「feedbackを表示したか」ではなく、**system state changeがユーザーのattentionの流れに入ったか**を品質基準にすると実務で扱いやすい。

これは心理学研究から直接「ボタンの横に出せ」という規則が導かれる、という意味ではない。

UIのtask、screen size、assistive technology、通知の重要度などで適切なfeedback channelは変わる。

## 30秒観察｜「変わった場所」を追う

今日使うアプリで、一回だけ次をやってみる。

1. 保存・お気に入り・フィルターなど何か操作する
2. 直後に「どこが変わった？」と考える
3. その場所が、操作直前に見ていた場所とどれくらい離れているか見る
4. 変化を見逃した場合、次の行動にどんな誤解が起きるか考える

特に面白いのは、

> 「画面上部に通知が出ています」

タイプのUI。

自分の目が画面下部にいたなら、それは**表示位置**ではなく**注意距離**として見るといい。

## 次につながる概念｜Inattentional Blindness

Change Blindnessは「変わったのに気づかない」。

次にあるInattentional Blindnessは、**そもそも最初から存在しているものに気づかない**。

この二つは似ているが同じではない。

UIに戻すと、

```text
表示されている
≠
見られている

変化した
≠
変化に気づいた
```

という二種類のズレになる。

---

### 今日の中心命題

**A change must not only happen. It must enter attention.**

変化は、起こるだけでは足りない。

**ユーザーのattentionに入って、初めてfeedbackとして働く。**

調べる前は、「保存しました」がちゃんと出ているならUIの責任は果たしているように見えた。

でも今は少し違う。

画面上に緑のToastが出ているのに、ユーザーが「保存された？」と聞いたとき、そこにはユーザーの見落としだけでなく、**interfaceが変化をどこへ置いたか**という設計上の問いもある。

画面は変わっていた。

でも人間の中では、まだ何も変わっていなかった。

その距離を埋めるのがFeedbackなんやと思う。

### 専門語 / Search terms

`Change Blindness` / `Change Detection` / `Attention` / `Visual Memory` / `Feedback` / `State Change` / `Visibility of System Status` / `Inattentional Blindness` / `Attention Routing`

### Sources

- Daniel J. Simons & Michael S. Ambinder, “Change Blindness: Theory and Consequences,” *Current Directions in Psychological Science*, 2005.
- Daniel J. Simons, Steven L. Franconeri & Rebecca L. Reimer, “Change Blindness in the Absence of a Visual Disruption,” *Perception*, 2000.
- Nielsen Norman Group, “Change Blindness in UX: Definition,” 2018. https://www.nngroup.com/articles/change-blindness-definition/
