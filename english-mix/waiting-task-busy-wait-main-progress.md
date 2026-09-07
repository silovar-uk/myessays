---
id: waiting-task-busy-wait-main-progress
title: "返事待ちは0秒の仕事なのに、Why does it steal 30 minutes?"
subtitle: "Don’t busy-wait on side tasks. Keep the main thing moving."
created: "2026-09-07"
updated: "2026-09-07"
type: "Essay"
status: "完成"
tags: ["仕事", "生産性", "集中", "タスク管理", "注意", "意思決定"]
keywords: ["busy waiting", "attention residue", "prospective memory", "cognitive offloading", "reminder", "task switching", "main task"]
favorite: 5
grow: 5
abstract: "返事待ち、確認待ち、承認待ち。You cannot act on them now, yet they keep coming back to mind. コンピューターのbusy waiting、心理学のattention residue、prospective memoryとcognitive offloadingを辿ると、問題はwaiting tasksの存在より『自分のattentionで待ちをmonitorし続ける設計』にあるように見えてきた。Externalize the trigger, then return to the main task."
---

# 返事待ちは0秒の仕事なのに、Why does it steal 30 minutes?
## Don’t busy-wait on side tasks. Keep the main thing moving.

コンピューターには、**何も前へ進めていないのにCPUを使い続ける待ち方**がある。

It is called **busy waiting**.

条件が成立したかを、何度もcheckする。

```text
Any reply?
No.
Any reply?
No.
Any reply?
Still no.
```

This is painfully human.

Microsoftの`.NET`には`SpinWait`という仕組みがある。Very short waitsでは少しspinして再確認する意味がある。でも長い待ちなら、ずっと回り続けるよりprocessorを譲ってwaitへ移る。

仕事中の「返事待ち」も、かなり似ている。

メール待ち。

承認待ち。

数字待ち。

今の自分には、nothing to do.

作業時間としては0秒。

それなのに5分後、

“Did it arrive?”

10分後、chatを開く。

15分後、また見る。

No work is happening.

But attention is still working.

もしかすると、waiting taskで失っているのは待ち時間そのものではない。

**The real loss is failing to fully return to the main task.**

---

## 1. WAITING is a state, not an action

タスクを4種類に分けてみる。

```text
A. Actionable now      今、自分で進められる
B. Waiting for someone 誰かを待っている
C. Waiting for time    時刻・日付を待っている
D. Blocked             条件不足で止まっている
```

今この瞬間にattentionを注いで前進できるのはAだけ。

B〜Dはimportantでも、not actionable now.

ここを混ぜると、

「重要だから気にしておく」

が、

“Important, so I should keep checking.”

へ変わる。

でもimportanceとmonitoring frequencyは別物だ。

重要な荷物を30秒おきにtrackingしても、deliveryは速くならない。

**A waiting task does not need attention. It needs a wake-up condition.**

---

## 2. Unfinished work leaves attention behind

Sophie Leroyが2009年に示したのが**attention residue**。

Task AからTask Bへ移ったあとも、とくにAがunfinishedだと、attentionの一部がAに残りやすい。二つの実験では、それが次のtask performanceの低下と結びついた。

Waiting taskは、かなり嫌なunfinished stateだ。

You cannot move it.

You cannot close it.

だからbackground processみたいに残る。

```text
MAIN TASK
↓
「あの返事まだかな」
↓
MAIN TASK
↓
「確認依頼も待ちだった」
↓
MAIN TASK
↓
check chat
```

サブ案件は主を正面から止めない。

It whispers from the background.

前の記事ではWIPやtask switchingを広く見た。

今回はもう一段絞る。

Problem is not only having unfinished work.

**Problem is using your own attention as the monitoring system.**

[Related: 稼働率100％なのに、何も進んだ気がしない](https://silovar-uk.github.io/myessays/#/essay/busy-without-progress-wip-attention-residue)

---

## 3. “Remember to do it later” also costs something

心理学には**prospective memory**がある。

Remembering to do something in the future.

「17時に連絡する」

「返事が来たら再開する」

こういうfuture intentionを頭で維持すること自体が、ongoing taskへcostを出す場合がある。

2014年のTracy Huang、Shayne Loft、Michael S. Humphreysの研究では、time-based prospective memory taskを持つことで進行中の課題が遅くなる場合があり、clock checkingやremindersのようなexternal controlを使うことで、内部で意図を維持する必要を減らせることが示された。

Gilbertらの4実験、計1,196人の研究でも、external remindersはdelayed intentionsの実行成績を改善した。

2024年の研究では、offloadingが、まだ実行できない段階でfuture intentionについて考え続けることを減らせるかも検討された。

So the goal is not “remember harder.”

**Move the responsibility from memory to the system.**

---

## 4. Make your work event-driven

仕事をコンピューターっぽく書いてみる。

### Busy-wait model

```text
MAIN
↓
check waiting task
↓
MAIN
↓
check waiting task
↓
MAIN
↓
check waiting task
```

### Event-driven model

```text
MAIN
↓
MAIN
↓
MAIN
↓
[reply arrives / reminder fires]
↓
SIDE TASK resumes
```

The key question is simple.

**Who is monitoring the condition?**

Busy-wait modelでは、自分のattentionが監視役。

Event-driven modelでは、email notification、calendar reminder、task manager、相手からのreplyが監視役。

ここで極端なsimulationをする。

10個のwaiting tasksを10分ごとにcheckすると、1時間で、

```text
10 tasks × 6 checks = 60 status checks
```

もちろん現実にexactly 60回やるわけではない。

でもarchitectureとしてはもう壊れている。

More waiting tasks means more monitoring overhead.

だから、確認を速くするより、

**design away the need to check.**

---

## 5. “Don’t pay attention” does not mean “forget responsibility”

ここを間違えると普通に事故る。

Waiting tasksにはdeadlineがある。

誰かが止まっていることもある。

So don’t abandon them.

**Externalize the monitoring.**

僕なら4項目だけ残す。

```text
WHAT      何を待っている？
WHO       次のボールは誰が持っている？
WAKE      何が起きたら再開？
DEADLINE  いつまでに起きなければ自分から動く？
```

Example:

```text
WHAT      design draft
WHO       agency
WAKE      email arrives
DEADLINE  tomorrow 15:00; follow up if missing
```

ここまで書いたらclose it.

Don’t think about it before 15:00.

Don’t open chat “just in case.”

**Manage it well enough that you are allowed to forget it.**

これが意外と大事だった。

---

## 6. Keep the main thing moving

Side tasksは軽い。

One email.

One check.

One quick reply.

Main work is heavy.

企画を書く。

構造を決める。

考える。

だから集中が少し切れると、side taskは逃げ道として魅力的に見える。

“Let me just check one thing.”

この`just`が危ない。

待ち案件は、見ても進まないことがある。

そのときやっているのはworkではなくstatus checkingだ。

Status checkingを仕事として数え始めると、main taskはずっと“later”になる。

最初のテーマを、少し言い換える。

「サブの仕事に、待ちの注意を払わない」ではなく、

**Don’t run waiting tasks on your own attention.**

待ちはsystemへ預ける。

When the event happens, come back.

Until then, move the main thing forward.

---

## Forget it — after you make it safe to forget

最初は、集中力の話だと思っていた。

Don’t get distracted.

Focus on the main task.

でも調べると、根性よりarchitectureの話だった。

Computers do not spin forever for long waits.

People can offload future intentions to reminders.

Unfinished tasks can leave attention residue.

So the answer is not “try harder to focus.”

**Design waiting out of attention.**

返事待ちの仕事は0秒なのに、30分を奪うことがある。

You do not get that time back by making the reply arrive sooner.

You get it back by stopping unnecessary checks.

サブが動いたら戻る。

それまでは、主を進める。

---

## Sources

- Sophie Leroy, “Why is it so hard to do my work? The challenge of attention residue when switching between work tasks” (2009)  
  https://www.sciencedirect.com/science/article/pii/S0749597809000399
- Sam J. Gilbert et al., “Strategic offloading of delayed intentions into the external environment” (2015)  
  https://pmc.ncbi.nlm.nih.gov/articles/PMC4448673/
- Tracy Huang, Shayne Loft, Michael S. Humphreys, “Internalizing versus externalizing control: different ways to perform a time-based prospective memory task” (2014)  
  https://pubmed.ncbi.nlm.nih.gov/24548325/
- B. Hunter Ball et al., “The role of offloading intentions on future-oriented thinking” (2024)  
  https://pmc.ncbi.nlm.nih.gov/articles/PMC11246708/
- Microsoft Learn, “SpinWait”  
  https://learn.microsoft.com/en-us/dotnet/standard/threading/spinwait
