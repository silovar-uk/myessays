---
id: claude-delegation-horizon-opus-fable
title: "Claudeは「賢さ」で選ばない――仕事の長さから考える「委譲距離」"
subtitle: "Sonnet / Opus / Fableを、固定序列ではなく仕事の長さ・曖昧さ・検証可能性でルーティングする"
mode: "english-mix"
english_ratio: 0.45
mix_unit: "sentence"
---

# Claudeは「賢さ」で選ばない――仕事の長さから考える「委譲距離」
## Sonnet / Opus / Fableを、固定序列ではなく仕事の長さ・曖昧さ・検証可能性でルーティングする

### 要旨

ClaudeにはSonnet、Opus、Fableという複数のモデルがある。

It is tempting to reduce model choice to one question: **which model is smartest?**

でも実務では、もう一つの問いの方が効く。

**How much of this job can I hand over as one coherent unit, and how long can the model keep going before I need to step back in?**

本稿では、この範囲を考えるための独自の運用概念を**委譲距離 / delegation horizon**と呼ぶ。

This is not an Anthropic taxonomy and not a scientifically validated scale. It is an operational heuristic for thinking about work design.

---

## 1. Current product factsは、日付入りのsnapshotとして扱う

2026年8月31日時点のAnthropic公式API価格は次の通り。

- **Claude Sonnet 5**：$2 / million input tokens, $10 / million output tokens
- **Claude Opus 5**：$5 input, $25 output
- **Claude Fable 5**：$10 input, $50 output

The Sonnet price is an important correction to the previous version of this article.

Sonnet 5は当初、8月31日まで$2/$10、その後$3/$15へ上がる予定だった。However, Anthropic changed that plan on August 10 and made the $2/$10 price permanent.

だから、価格を記事の理論そのものにしてはいけない。

**Product facts decay quickly. The work-design model should survive longer.**

---

## 2. Fable 5が変えたのは「一問の難しさ」よりlong-horizon work

Anthropic describes Fable 5 as a Mythos-class model whose lead grows as tasks become longer and more complex.

同社は、Fableがprevious Claude modelsより長くautonomous workを続けられることも強調している。

The Stripe case is the most dramatic example.

Anthropic reports that Stripe used Fable 5 for a codebase-wide migration inside a roughly 50-million-line Ruby codebase, completing in one day work estimated to take a team more than two months by hand.

ただし、ここにはevidence boundaryがある。

First, Fable did not rewrite 50 million lines. It executed one migration across an enormous codebase.

Second, the “two months to one day” figure is a **vendor-reported customer result published by Anthropic**, not an independently reproduced benchmark.

事例の派手さを消す必要はない。But the evidence class should be visible.

---

## 3. Independent evidenceでもmulti-phase workの強さは見える

Simon Willison’s `sqlite-utils 4.0` work gives us a different kind of evidence.

2026年7月、Willisonはstable release前の最終reviewをFableへ依頼した。Fable identified five release blockers and became deeply involved in the fixes that followed.

Willison estimated the main session and related agents at about **$149.25** in API-equivalent cost and described `4.0rc2` as mostly written by Claude Fable.

This is an independent practitioner report, not a controlled benchmark, but the shape of the job matters: review → investigation → fixes → further review → release.

Every’s Senior Engineer Benchmark adds a third-party benchmark.

Fable 5 scored 91, while human senior-engineer reference implementations scored 89 and 96.

But that does **not** mean “Fable equals a human senior engineer.” Every notes that the frozen codebase and opening prompt were shared, while follow-up instructions varied by model.

What survives these caveats is a narrower point: Fable can cross multiple phases of a substantial engineering job without handing control back every few minutes.

---

## 4. Long autonomy is not the same as being best at everything

CodeRabbit’s Fable 5 review is useful because it pushes in the opposite direction.

On its 105-error-pattern code-review benchmark, Fable passed 65 of 105 actionable patterns, close to the 66/105 baseline and Opus 4.8 result.

But actionable precision was 32.8%, below Opus 4.8 at 35.5%, and Fable generated 253 comments.

The coding-task benchmark showed another issue: many runs kept going until the agent harness timed out.

つまり、**autonomy, precision, and stopping behavior are different dimensions.**

A model that can keep working for longer also needs a system that knows when to stop it.

最大時間、最大step、token budget、checkpoint、done conditionは、promptの外側のsystem designになる。

---

## 5. Opus 5は「判断層」と決めつけない

Anthropic positions Opus 5 as an everyday premium model, priced at half of Fable.

同社のvendor-reported evaluationsでは、CursorBench 3.2のmax effortでFable 5のpeak scoreから0.5%以内、OSWorld 2.0ではFableのbest resultをjust over one-third of the costで上回ったとしている。

Opusのearly examplesには、root-cause analysisやself-verificationの強さが見える。

In one package-manager bug, Anthropic says Opus found the root cause and fixed an edge case missed by the community patch. In another case, when a trading engineer lacked a live feed for validation, Opus built its own test harness.

That makes “use Opus when the method itself is unclear” a useful routing hypothesis.

でも固定法則ではない。

CodeRabbit found that Opus 5 x-high improved actionable review precision to 39.3% versus a 35.2% production baseline, while catching fewer known issues: 55.2% versus 61.1%. It also produced roughly four times as many nitpicks.

The lesson is not “Opus is the judgment model.” It is: **test whether its strengths match this particular job.**

---

## 6. Sonnet 5をcheap execution layerに閉じ込めない

The old version of this article treated Sonnet mainly as the execution layer.

その表現はroutingのstarting pointとしては便利だが、能力境界としてはもう強すぎる。

Anthropic calls Sonnet 5 its most agentic Sonnet yet. It can plan, use browsers and terminals, and run autonomously at a level that recently required larger models.

つまり、Sonnetが安いからshort task、Fableが高いからlong task、ではない。

If Sonnet can complete the required delegation horizon reliably and verifiably, the cheaper model is often the better choice.

モデルの格より、**cost per verified completed job**を見る。

---

## 7. Delegation horizonとは何か

本稿でいう委譲距離は、

> **人間が再び介入するまでに、AIへ一まとまりの仕事として渡せる範囲と時間**

である。

It depends on more than the model.

少なくとも四つを見る。

1. **Work length** — one answer or research → design → implementation → verification?
2. **Ambiguity** — 手順は既知か、それとも方法そのものを探すか
3. **Self-verification burden** — can it test, notice failure, and repair its work?
4. **Human intervention interval** — 5 minutes, one hour, half a day, a day?

そして別軸に**verifiability**を置く。

The same model can have a long delegation horizon on a migration with a strong test suite and a short one on a vague strategy problem with no external success criterion.

委譲距離はモデルの性格ではなく、**model × task × tools × verification environment**の関係で決まる。

---

## 8. Long-horizon workにはverificationとstop rulesが要る

Stripeのmigrationにはtestable codeがある。`sqlite-utils`にはtests、compatibility rules、release conditionsがある。Everyにもrubricがある。

Those environments make it possible to tell whether the long job actually ended well.

一方、「魅力的なstrategyを全部考えて」のような仕事は、長く生成してもcorrectnessを外部から判定しにくい。

So before extending the delegation horizon, define:

- done condition
- automated checks
- maximum time / steps / token budget
- invariants that must not break
- conditions for returning control to a human
- final sign-off owner

長期自律は「監督をなくすこと」ではない。

**It moves supervision from constant micro-management to upfront guardrails and final verification.**

---

## 9. Sonnet → Opus → Fableはpromotion ladderではなくrouting hypothesis

A simple working map can still be useful.

### Start with Sonnet when

- cost matters at scale
- the task and finish line are relatively clear
- tests are strong
- failure is cheap to rerun

### Try Opus when

- root cause or method is unclear
- trade-offs are substantial
- deep self-verification matters
- Sonnet results are unstable

### Try Fable when

- you want to hand over several phases as one job
- the environment is large and cross-cutting
- reducing human check frequency has real value
- the cost of human intervention is larger than the model cost
- the finish line is externally verifiable

But this is not an upgrade ladder.

Sometimes Opus should define the plan and Sonnet should execute it. Sometimes Sonnet can finish the entire long job. Sometimes Fable is the wrong reviewer even if it is the most capable model overall.

**Route to the cheapest verifiable path that reaches the delegation horizon you actually need.**

---

## 10. High-end models can be judgment checkpoints, not only workers

One useful inversion is to spend expensive-model tokens only where failure would be costly.

たとえば、Sonnetで広く実装し、Opusでarchitectureをcritiqueし、必要なreleaseだけFableや別modelで大きく監査し、最後はtestsとhuman sign-offで閉じる。

This is not wasting the expensive model.

It is placing expensive computation at **high-loss judgment points** instead of paying premium rates for every routine token.

---

## 11. 結論――AIの進化は「答え」より「仕事の単位」を変える

The durable question is not “Which Claude is smartest this month?”

モデル名、価格、benchmark順位は更新される。

The more durable question is:

> **How much of this job can I delegate before I need to intervene again?**

そして、もう一つ。

> **When the agent says it is done, how will I know it is actually done?**

Delegation horizon is only a heuristic, not a predictive formula.

でもこのheuristicを使うと、モデル比較を「強い／弱い」の話から、task design、verification、cost、stop conditionの話へ移せる。

**As AI gets stronger, human work shifts from specifying every move toward designing what to delegate, what to protect, when to stop, and how to verify.**

そこが、agentic AIを実務で使うときの本丸になる。

---

## 参考資料

- Anthropic「Claude Fable 5 and Claude Mythos 5」2026-06-09（2026-07-01 availability update）  
  https://www.anthropic.com/news/claude-fable-5-mythos-5
- Anthropic「Introducing Claude Sonnet 5」2026-06-30（2026-08-10 pricing update）  
  https://www.anthropic.com/news/claude-sonnet-5
- Anthropic「Introducing Claude Opus 5」2026-07-24  
  https://www.anthropic.com/news/claude-opus-5
- Simon Willison「sqlite-utils 4.0rc2, mostly written by Claude Fable (for about $149.25)」2026-07-05  
  https://simonwillison.net/2026/Jul/5/sqlite-utils-fable/
- Simon Willison「sqlite-utils 4.0, now with database schema migrations」2026-07-07  
  https://simonwillison.net/2026/Jul/7/sqlite-utils-4/
- Every「Senior Engineer Benchmark」2026-06-09  
  https://every.to/benchmarks/senior-engineer-benchmark
- CodeRabbit「Fable 5 model review: early signals from code review and coding tasks」2026-06-09  
  https://www.coderabbit.ai/blog/fable-5-model-review
- CodeRabbit「Opus 5 for code review: Cleaner actionable comments, noisier overall」2026-07-24  
  https://www.coderabbit.ai/blog/opus-5-model-review

### Evidence boundary

Anthropicの価格・公開日・製品説明はverified product factsとして扱う。StripeなどAnthropic経由の顧客事例はvendor-reported customer resultsであり、independent benchmarkではない。

Every / CodeRabbitはthird-party benchmarksだが、それぞれ独自のtask、harness、rubricを持つ。Simon Willisonはindependent practitioner reportであり、一つのprojectのexperienceである。

This article uses those different evidence classes to build an operational heuristic. It does not claim to prove a permanent ranking of Sonnet, Opus, and Fable.