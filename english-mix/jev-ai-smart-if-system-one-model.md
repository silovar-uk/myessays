---
id: jev-ai-smart-if-system-one-model
title: "最新AIが文章を書けない。Jevは「曖昧な判断」をコードに戻すAIだった"
subtitle: "A semantic if statement｜生成ではなく、型付き判断を返すAI"
created: "2026-09-18"
updated: "2026-09-18"
type: "Essay"
status: "published"
tags: ["AI", "Jev", "TypeSafe AI", "System One", "Automation", "AI Agents", "Decision Making"]
keywords: ["Jev", "TypeSafe AI", "System One Models", "typed decisions", "probabilistic decisions", "routing", "guardrails"]
grow: true
abstract: "Jev is not another writing model. 2026年9月にTypeSafe AIが公開したJevは、stateに対してChoice・Score・Noulという型付きの判断を返す。This essay treats it as a semantic if statement and asks where it fits among code, generative LLMs, and human responsibility."
---

# 最新AIが文章を書けない。Jevは「曖昧な判断」をコードに戻すAIだった
## A semantic if statement｜生成ではなく、型付き判断を返すAI

A new AI arrived in September 2026.

名前は **Jev**。

Most new AI models compete on writing, coding, multimodality, or deeper reasoning.

でもJevは、かなり変。

**It does not write prose. It does not write code. It does not explain its reasoning.**

では何をするのか。

「この問い合わせはどの部署へ送る？」
「この出力は人間確認が必要？」
「このagentはcontinue / retry / ask / stopのどれを選ぶ？」

Jev is built for those tiny decisions inside software.

調べる前は「LLMから機能を削ったもの」に見えた。

After reading the docs, the better mental model became:

**Jev is not a smaller chatbot. It is closer to a semantic if statement.**

---

## 1. FACT｜State in, typed decisions out

TypeSafe AI released Jev on September 14, 2026 as its first “System One Model.”

普通のLLMはtext in → text outが中心。

Jev takes **state + typed questions** and returns answers that code can consume directly.

[TypeSafe AI, “Introducing System One Models and Jev”](https://typesafe.ai/blog/introducing-system-one-models-and-jev)

[TypeSafe AI Docs, “Introduction”](https://docs.typesafe.ai/introduction)

基本primitiveは3つ。

~~~text
Choice
候補から選ぶ
Which team? → billing / technical / account

Score
rubricに沿って段階評価
How frustrated? → 0 ... 2

Noul
命題がtrueである確率
“Does this request ask for a refund?” → 0.95
~~~

Multiple questions can be evaluated in parallel against the same state.

つまり、長い文章を生成してからJSONへ変換するのではない。

**The decision itself is the output.**

---

## 2. INTERPRETATION｜「意味を理解するif文」と考える

通常コードなら、明確な条件は強い。

~~~javascript
if (amount > 100000) {
  requireHumanReview();
}
~~~

But many real business rules are semantic.

「怒っているか」「緊急か」「ブランド方針から外れているか」は、単純な数値条件にしづらい。

Until now, we often asked an LLM to generate a JSON judgment.

Jev turns that judgment into the main product.

だから一番近い比喩は、

**ordinary code handles exact conditions; Jev handles bounded semantic conditions.**

自由な生成ではなく、曖昧なif文。

---

## 3. FACT｜One judgment per question

TypeSafeのdocsは、everything in one promptを勧めていない。

Instead, it recommends atomic questions.

たとえば「この企画は良いか」を一発で聞かない。

Ask separately:

- 市場性はあるか
- 実現可能か
- 差別化があるか

Then combine those decisions in code.

[TypeSafe AI Docs, “Introduction”](https://docs.typesafe.ai/introduction)

This is almost the opposite of “let the AI think about everything.”

**曖昧な判断だけmodelへ渡し、weights・thresholds・hard rulesはcodeへ戻す。**

---

## 4. FACT｜Fast and cheap, but company benchmarks need a label

TypeSafe reports up to **193.6× faster** and **444.6× cheaper** performance than LLMs in its workflow evaluations.

公式発表の価格はinput 1M tokensあたり$0.042。

Vercel AI Gatewayでは2026年9月16日時点で `typesafe-ai/jev` が利用でき、inputは$0.04 / 1M tokensと表示されている。

[Vercel, “TypeSafe AI's Jev now available on AI Gateway”](https://vercel.com/changelog/typesafe-ai-jev-now-available-on-ai-gateway)

[Vercel AI Gateway, “Jev”](https://vercel.com/ai-gateway/models/jev)

But the 193.6× / 444.6× numbers are vendor-reported workflow results.

つまり、**「どんな業務でも400倍安い」ではない。**

What is structurally clear is simpler: Jev does not generate free-form output tokens, evaluates typed questions in parallel, and is priced very low.

---

## 5. USE CASE｜Routing incoming requests

問い合わせ一次振り分けは、かなり素直なuse case。

Choice:

~~~text
ticket / membership / merchandise / media / partner / other
~~~

同時にNoulで、

~~~text
urgent?
contains sensitive information?
needs legal review?
requires a human reply?
~~~

を判定する。

Then code owns the policy.

~~~text
if urgent > 0.8:
    notify_now

if legal_review > 0.6:
    do_not_auto_reply

if confidence is low:
    send_to_human
~~~

Jev does not need to write the reply.

返信文は、必要になった時だけLLMへ。

**Jev decides who or what should act next.**

---

## 6. USE CASE｜Agent traffic control

Vercel highlights agent-loop decisions such as:

- next tool or subagent
- continue
- retry
- ask the user
- stop

[Vercel, “TypeSafe AI's Jev now available on AI Gateway”](https://vercel.com/changelog/typesafe-ai-jev-now-available-on-ai-gateway)

長く動くagentでは、generationだけでなくbranchingが何度も起きる。

Calling a large reasoning model for every tiny branch can become expensive and slow.

そこでJevをtraffic controllerにする。

選手ではなく信号機。

**Not glamorous, but called constantly.**

---

## 7. USE CASE｜A separate preflight checker

生成した文章を、同じLLMへ「問題ない？」と聞くことはできる。

But generation and evaluation are different responsibilities.

Jev can inspect the draft and answer bounded questions:

- 強い断定があるか
- human reviewが必要か
- tone ruleから外れているか
- sensitive contentを含むか

ただし、Jevが「事実そのものの真偽」を保証するわけではない。

So the safer pattern is not “Jev approves publication.”

**It flags uncertain or risky cases for review.**

---

## 8. PROPOSAL｜広報・プロモーションなら、こう使える

ここからはvendorが実証した事例ではなく、Jevの特性からのproposal。

### SNS preflight

投稿文はhuman / LLMが作る。

Jev evaluates: 誤解リスク、断定の強さ、権利確認の必要性、human reviewの必要性。

### Inquiry triage

カテゴリだけでなく、urgency / risk / escalationを別々に見る。

### Monitoring filter

大量のニュースやSNS投稿に対して、

“club-related?”, “action required?”, “watch further?”

を先に判定する。

Only important items go to the expensive LLM.

### Proposal QA

企画を考えさせるのではなく、

「targetは明示されているか」「CTAはあるか」「目的と施策は整合しているか」

を独立評価する。

**Jev is more useful as many tiny reviewers than as one big idea generator.**

---

## 9. FACT｜Jev 1.13 has sharp limits

TypeSafe openly documents the jagged edges of `jev-1.13`.

[TypeSafe AI Docs, “Jev 1.13 jaggedness”](https://docs.typesafe.ai/model-jaggedness/jev-1.13)

主な弱点：

- literal reading
- math / exact numbers
- counting
- date comparison
- multi-hop indirection
- irrelevant long context
- adversarial content
- generation

The official advice is unusually clear.

**Do arithmetic in code. Compare dates in code. Use a generative model for generation.**

AIなのに「それはAIにやらせるな」と言っている。

That boundary is part of the product design.

---

## 10. PRINCIPLE｜E / J / G / H で仕事を切る

Jevを試す前に、workflowを4種類へ分けると分かりやすい。

~~~text
E = Exact
機械的に正解を計算できる
→ code

J = Judgment
意味理解が必要だが、答えの型は有限
→ Jev

G = Generation
文章・コード・案を新しく作る
→ generative LLM

H = Human responsibility
最終責任・例外・重大判断
→ human
~~~

For an event announcement:

~~~text
開催日が今日より後か
→ E

「誰向けの企画か」が本文から読み取れるか
→ J

告知文を3案書く
→ G

権利・炎上・重大なreputation判断
→ H
~~~

The key question is not “Which AI is smartest?”

**First ask: what kind of work is this?**

---

## 11. EXPERIMENT｜Five questions to find Jev-shaped work

業務を見ながら、5問。

~~~text
1. 同種の判断を何度も繰り返している？
2. Inputは文章だがoutput候補は有限？
3. 人間なら数秒で判断できる？
4. 判断後の処理はcodeで決められる？
5. 不確実ならhumanへ上げられる？
~~~

If four or five are yes, it is a strong Jev candidate.

逆に、長い調査、新規企画、精密計算、法的最終判断、説明責任まで必要ならJev単体ではない。

**Its narrowness is not merely a limitation. It is what makes the interface interesting.**

---

## 12. INTERPRETATION｜Confidence is not correctness

Jev returns probabilities and confidence.

でも `0.93` は「絶対正しい」の意味ではない。

TypeSafe says calibration is a property measured across groups of predictions; it does not guarantee each answer.

[TypeSafe AI Docs, “System One”](https://docs.typesafe.ai/concepts/system-one)

So probabilities should become workflow rules:

~~~text
high confidence → automate
middle → human review
low / unclear → hold or escalate
~~~

確率は結論ではない。

**It is an input to your policy.**

---

## 13. DISCOVERY｜The novelty is where intelligence lives

最初は、Jevも「新しくて賢いAI」の一つだと思った。

After research, that is not the most interesting part.

The interesting part is **where the intelligence is placed**.

これまで生成AIは、人間とのinterfaceにいた。

人が聞く。AIが答える。

Jev moves deeper into software:

問い合わせが届いた直後。
生成文が出た直後。
agentが次のtoolを選ぶ直前。
大量データを次工程へ送る直前。

It may be called thousands of times where no human ever sees it.

だから「文章を書けない」は欠点とは限らない。

**Because it does not write, it can specialize in decisions.**

これから重要になるのは「全部を一つのAIへ任せる」ことではなく、

> code here  
> Jev here  
> LLM here  
> human here

と、知能を分業させる設計なのかもしれない。

Jevを調べて変わったのは、AIの見方より、仕事の切り方だった。

---

## APPENDIX｜Prompt: find Jev-shaped decisions in my workflow

~~~text
You are an AI workflow architect.

Goal:
Break my workflow into four kinds of work.

E = Exact → normal code
J = Judgment → Jev candidate
G = Generation → generative LLM
H = Human responsibility → human

Process:
1. Break the workflow into chronological steps.
2. Label every step E / J / G / H.
3. For every J step, design:
   - input state
   - Choice / Score / Noul
   - one atomic judgment per question
   - automation threshold
   - escalation rule
4. Keep math, date comparison, and exact counting in code.
5. Keep free-form generation in a generative model.
6. Do not automate high-impact final responsibility.
7. Explicitly list steps where Jev should NOT be used.

Output:
- current workflow
- E/J/G/H map
- Jev candidates
- minimum experiment
- success metrics
- failure conditions
- production guardrails

Workflow:
{{paste workflow here}}
~~~

## Sources

- TypeSafe AI, “Introducing System One Models and Jev”  
  https://typesafe.ai/blog/introducing-system-one-models-and-jev
- TypeSafe AI Docs, “Introduction”  
  https://docs.typesafe.ai/introduction
- TypeSafe AI Docs, “System One”  
  https://docs.typesafe.ai/concepts/system-one
- TypeSafe AI Docs, “Jev 1.13 jaggedness”  
  https://docs.typesafe.ai/model-jaggedness/jev-1.13
- Vercel, “TypeSafe AI's Jev now available on AI Gateway”  
  https://vercel.com/changelog/typesafe-ai-jev-now-available-on-ai-gateway
- Vercel AI Gateway, “Jev”  
  https://vercel.com/ai-gateway/models/jev
