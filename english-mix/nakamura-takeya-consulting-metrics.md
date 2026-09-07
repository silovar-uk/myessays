---
id: nakamura-takeya-consulting-metrics
title: "三振だけをKPIにすると、482本塁打が見えなくなる"
subtitle: "English Mix｜What O-kawari-kun teaches us about metrics, benchmarks, outliers and capability"
created: "2026-09-07"
updated: "2026-09-07"
type: "English Mix"
status: "完成"
mode: "english-mix"
english_ratio: 0.44
mix_unit: "sentence"
abstract: "中村剛也の2166 strikeoutsと482 home runsは、見るmetricによって同じ人の評価が反転する好例だ。2008年の.244 averageと46 HR、2011年のleague-wide 10.6% share、2012年の27 HRでもleague leaderという事実から、KPI hierarchy, benchmarking, outlier analysis, resource allocation, repeatabilityを実務の問いとして学ぶ。"
---

# 三振だけをKPIにすると、482本塁打が見えなくなる
## What O-kawari-kun teaches us about consulting metrics

前の記事で、中村剛也の数字をずっと見ていた。

As of 6 September 2026, he had **2,166 career strikeouts**, the most in NPB history.

そして同じ時点で、**482 home runs**。NPB歴代10位、現役最多である。

One person. Two enormous numbers. One looks terrible; the other looks historic.

そこで思った。

**This is basically a consulting problem.**

Revenue is up, but margin is down.

顧客数は増えた。でもretentionは落ちた。

Complaints are down, but perhaps customers simply cannot find the contact form anymore.

数字そのものより怖いのは、**which number gets promoted to the top of the dashboard**である。

今回はbaseballをbusinessへ雑に例える記事ではない。

中村剛也という極端なdatasetを使って、五つのconsulting movesを練習する。

```text
1. KPI Design        What are we actually optimising?
2. Benchmarking      Compared with what?
3. Outlier Analysis  Noise, error, or a clue?
4. Allocation        Where should the next unit go?
5. Capability        Result or repeatable strength?
```

Start with strange facts, not frameworks.

必要になったところで、道具を持ってくる。

---

## 1. .244 average, 162 strikeouts, 46 home runs. Was 2008 a bad year?

2008年の中村は143試合に出場した。

Batting average: **.244**.

Strikeouts: **162**, the most in the Pacific League.

ここだけ見ると、かなりroughな打者に見える。

Then add one more metric.

Home runs: **46**, the most in the league.

Slugging percentage: **.569**, third in the league.

```text
2008 Takeya Nakamura

AVG       .244   looks weak
SO         162   league-high
HR          46   league-high
SLG       .569   league 3rd
```

Same season. Completely different story depending on the metric.

### Consulting Lens: a KPI list is not a KPI system

ダッシュボードを作るとき、「取れる数字を全部置く」は一番簡単である。

It is also often the wrong starting point.

まず、metricを役割で分ける。

```text
Outcome
   ↓
Drivers
   ↓
Guardrails
```

A hypothetical B2B sales model might look like this:

```text
Outcome
Gross profit

Drivers
Opportunities × Win rate × Gross profit per deal

Guardrails
Churn / Discount rate / Complaints / Sales hours
```

もし電話件数が少ないから、とにかくcallsを増やしたらどうなるか。

If call volume is not the binding driver of gross profit, you may simply create more activity.

中村の三振も同じで、**a negative-looking metric is not automatically the highest-priority improvement target**である。

This is not “strikeouts are fine.”

もっと分析的な話である。

> If we move this metric, how much does the outcome move?

### Questions for a real project

- What is the actual outcome metric?
- Which metrics are causal drivers rather than symptoms?
- Which metrics are guardrails against side effects?
- Where are the trade-offs?
- Are we improving the metric while damaging the objective?

The common mistake is simple:

**bad-looking number = thing we must fix.**

Consulting requires one extra step: locate the number inside the value logic first.

---

## 2. From 48 HR to 27 HR. Did capability fall by 44%?

2011: **48 home runs**, Pacific League leader.

2012: **27 home runs**.

Absolute decline: 21 home runs, roughly 44%.

Looks dramatic.

But he still led the Pacific League in 2012.

```text
2011   48 HR   No.1
2012   27 HR   No.1
```

同じ「league leader」なのに、必要なabsolute outputがまるで違う。

2011 was even stranger.

Second place, Nobuhiro Matsuda, had 25.

中村は48。

The gap was 23 home runs.

Across all six Pacific League clubs there were 454 home runs. Nakamura alone accounted for about **10.6%**.

千葉ロッテはチーム全体で46本。中村一人は48本だった。

### Consulting Lens: performance always contains a benchmark

“前年比+5%” sounds like information.

It is not yet a diagnosis.

If the market grew 30%, +5% may mean share loss.

市場が-15%なら、+5%はかなり強いかもしれない。

A useful benchmark stack is:

```text
Self     vs your own history
Peer     vs competitors
Market   vs the environment
Target   vs plan
```

中村の27本は、自分の前年48本との比較なら大幅減。

Against the league, it was still No.1.

**Change the denominator or benchmark, and the diagnosis can change.**

Benchmarking is therefore not “find another company's number and copy it.”

It is a way to reveal differences that an internal time series cannot show.

### Questions for a real project

- What happened to the overall market?
- How did direct peers perform?
- Did inflation or price changes distort nominal growth?
- Did store count, headcount or customer mix change?
- Did regulations, product rules or channel conditions change?

A useful meeting question is:

> 「前年比で悪化した」のは分かりました。同じ期間、市場はどう動きましたか。

One question can change the whole page.

---

## 3. One player produced 10.6% of league home runs. Do not delete the weird point too quickly

2011 Nakamura looks like an outlier almost whichever way you cut it.

48 versus 25 for second place.

About 10.6% of all Pacific League home runs.

More than the 46 home runs hit by the entire Lotte team.

When analysts see a point that strange, two reactions are sensible.

**Is the data wrong?**

**Is this too special to be useful?**

Both questions are good.

But neither should end the analysis.

NIST notes that an outlier may indicate bad data, random variation, or something scientifically interesting; it should not simply be removed without investigation.

### Consulting Lens: an outlier can be a hypothesis generator

Imagine 100 retail stores.

One store is dramatically above the rest.

A modelling exercise might need robust treatment so that one point does not distort the average.

でも経営改善なら、別の問いが立つ。

```text
Data error?
  ↓ No
Location effect?
  ↓
Traffic × Conversion × Average basket?
  ↓
Product mix?
  ↓
Local event?
  ↓
Operator behaviour?
  ↓
Can it travel to other stores?
```

There are at least two kinds of abnormalities:

**abnormality to remove** and **abnormality to learn from**.

コンサルタントが価値を出せるのは、その切り分けをするときである。

### Five-minute outlier check

1. Verify the source data.
2. Check definitions and denominators.
3. Check segment differences.
4. Check one-off events.
5. Search for transferable behaviour or capability.

Not “outlier, therefore delete.”

**Outlier, therefore investigate once.**

---

## 4. 2,166 strikeouts do not mean “2,166 units of failure rate”

The career strikeout total is enormous.

But Nakamura also accumulated **8,326 plate appearances**.

2,166 strikeouts divided by 8,326 plate appearances is roughly **26.0%**.

482 home runs are roughly **5.8%** of plate appearances.

The key lesson is not whether those percentages are good or bad.

It is this:

**A lifetime count mixes frequency with exposure.**

```text
Career count
≈
Event rate × Exposure × Time
```

厳密な数式ではないが、分析の分解としては便利だ。

You cannot become the all-time strikeout leader merely by striking out often.

You also need a huge number of opportunities over a long period.

### Consulting Lens: separate Count, Rate, Exposure and Mix

Business dashboards constantly mix these.

Business A has 1,000 complaints. Business B has 300.

A looks worse.

But what if A serves one million customers and B serves ten thousand?

Now the denominator changes the story.

Whenever you see a large count, decompose it:

```text
Count       件数
Rate        発生率
Exposure    機会量
Mix         構成
```

事故件数、問い合わせ、解約、不良品、採用数。

The same habit applies everywhere.

### Then move from diagnosis to allocation

Consulting is not only about explaining the past.

Management eventually asks:

**Where should the next unit of resource go?**

One more employee.

Another ¥1 million of media spend.

One more store.

One more R&D project cycle.

The decision should depend on future incremental value and risk, not merely the historical count of failures.

これは「失敗を恐れるな」という話ではない。

It is colder than that.

> Do not let the emotional weight of past failures replace a forward-looking allocation decision.

中村の通算三振数だけを見て次の打席の価値を決めることはできない。

Actual baseball selection depends on age, defence, opponent, health and many other variables, so this is not a claim about how the Lions should select him.

But as an allocation question, it is clean:

**The value of the next opportunity is not determined by the total number of past failures.**

---

## 5. One 48-HR season is an event. Six home-run titles start to look like capability

If 2011 were the only peak, we might call it an extraordinary year.

But the title history is longer.

```text
2008   46 HR   title #1
2009   48 HR   title #2
2011   48 HR   title #3
2012   27 HR   title #4
2014   34 HR   title #5, tied
2015   37 HR   title #6
```

Six home-run titles across eight seasons.

2013年は26試合、4本塁打にとどまった。

Then in 2014 he returned with 34 home runs in 111 games and again led the league.

In 2019, he still produced 30 home runs and 123 RBI in 135 games.

Stats alone cannot prove the exact causal mechanism behind his hitting ability.

But repeated results change the question.

Not only:

**Why did 2011 happen?**

But:

**What survived across different seasons and conditions?**

### Consulting Lens: Result ≠ Capability

A company launches one successful product.

Do we immediately conclude that it has a world-class product-development capability?

Not necessarily.

Market timing, competitive absence, distribution, price, media spend, or sheer luck may have helped.

Capability becomes more plausible when success is repeatable.

```text
Can we repeat it under similar conditions?
Does it survive when conditions change?
Does it survive a change of people?
Can it transfer to another product or market?
Can we explain the mechanism?
```

A simple matrix helps:

```text
                     Low Repeatability     High Repeatability
High Outcome         One-off success       Capability candidate
Low Outcome          Problem               Latent capability / bad fit
```

The bottom-right cell matters too.

Sometimes capability exists but the current conditions suppress the outcome.

### A useful project question

> What exactly would we need to reproduce in order to make this result happen again?

If nobody can answer, “strength” may still be just a label.

---

## Put the five moves on one page

| Nakamura fact | Consulting lens | First question |
| --- | --- | --- |
| .244 AVG and 162 SO, yet 46 HR | KPI design | Is this metric an outcome, driver or guardrail? |
| 48 HR → 27 HR, still league No.1 | Benchmarking | Compared with what? |
| 48 HR = 10.6% of league total | Outlier analysis | Error, different structure, or learnable exception? |
| 2,166 SO occurred across 8,326 PA | Denominator & allocation | Is the count high because of rate or exposure? |
| Six HR titles in eight seasons | Capability | What repeated across conditions? |

こうして並べると、consultant = person who is good at numbers、だけでは足りない。

A consultant also decides:

**what to count, what to divide by, what to compare with, which exception to investigate, and which number belongs in the decision.**

---

## Consultant Toolkit｜Five questions to steal

### 1. KPI Tree

> Is this an outcome, a driver, or a guardrail?

数字を置く前に役割を決める。

### 2. Benchmark

> Compared with what are we calling this good or bad?

Self, peer, market, targetを切り替える。

### 3. Outlier

> Is this an abnormality to remove or an abnormality to learn from?

Validate first. Investigate second.

### 4. Denominator & Allocation

> Is the count high because the rate is high, or because exposure is high? And where should the next unit go?

過去の総量と未来の資源配分を分ける。

### 5. Capability

> What would have to be reproduced for this success to happen again?

A result becomes strategically useful when its mechanism becomes describable.

---

## Maybe consultants do not merely “read numbers.” They decide where numbers belong

At first, 2,166 strikeouts and 482 home runs were simply funny together.

でも横へ飛ばしていくと、ダッシュボードの問題に見えてきた。

Put strikeouts at the top, and Nakamura looks one way.

Put home runs at the top, and he looks another way.

Use batting average, league-relative performance, career totals, or repeatability, and the story changes again.

Companies are no different.

So before collecting more data, define the question.

平均を見たらoutlierを掘る。

When you see a count, find the denominator.

前年比を見たらmarketを置く。

When you see success, test repeatability.

And when you explain the past, convert the explanation into a decision about the future.

中村剛也の愛称は「おかわりくん」。

Perhaps there is a useful consulting habit hidden in that word.

Do not stop at the first number.

**One more denominator. One more benchmark. One more hypothesis.**

数字の外側を一回だけ、おかわりする。

That small move can completely change the diagnosis.

---

## Sources

### Nakamura / NPB

- [NPB｜Takeya Nakamura career statistics](https://npb.jp/bis/players/81085115.html)
- [NPB｜Career strikeout leaders](https://npb.jp/bis/history/ltb_so.html)
- [NPB｜Active career home-run leaders](https://npb.jp/bis/history/acb_hr.html)
- [NPB｜2008 Pacific League batting](https://npb.jp/bis/2008/stats/bat_p.html)
- [NPB｜2008 Pacific League leaders](https://npb.jp/bis/2008/stats/llb_p.html)
- [NPB｜2011 Pacific League home-run leaders](https://npb.jp/bis/2011/stats/lb_hr_p.html)
- [NPB｜2011 Pacific League team batting](https://npb.jp/bis/2011/stats/tmb_p.html)
- [NPB｜2012 Pacific League yearly results](https://npb.jp/bis/yearly/pacificleague_2012.html)
- [NPB｜2014 Pacific League yearly results](https://npb.jp/bis/yearly/pacificleague_2014.html)
- [NPB｜2015 Pacific League yearly results](https://npb.jp/bis/yearly/pacificleague_2015.html)
- [Samurai Japan｜Takeya Nakamura profile](https://www.japan-baseball.jp/jp/news/press/20151028_1.html)

### Analytical lenses

- [NIST｜Detection of Outliers](https://itl.nist.gov/div898/handbook/eda/section3/eda35h.htm)
- [Harvard Business Review｜How to Measure Yourself Against the Best](https://hbr.org/1987/01/how-to-measure-yourself-against-the-best)
- [PubMed / Harvard Business Review｜The Performance Measurement Manifesto](https://pubmed.ncbi.nlm.nih.gov/10109469/)
- [PubMed / Harvard Business Review｜The Five Traps of Performance Measurement](https://pubmed.ncbi.nlm.nih.gov/19839446/)
