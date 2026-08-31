# Batch 4 Article 1 Research Audit — Claude Delegation Horizon

Updated: 2026-08-31
Article ID: `claude-delegation-horizon-opus-fable`
Batch: 4 — Freshness & External Claims

## 1. Research question

Can the article still support its central claim that Claude model choice is better understood by the size and duration of work delegated than by a simple intelligence ranking?

Answer: **YES, with qualification.**

The original `delegation horizon / 委譲距離` concept remains useful as an editorial heuristic, but it must not be presented as an Anthropic taxonomy, validated scale, or stable mapping of Sonnet / Opus / Fable to fixed organizational roles.

## 2. Evidence classes

### VERIFIED PRODUCT FACT

#### Claude Fable 5

Primary:
https://www.anthropic.com/claude/fable
https://www.anthropic.com/news/claude-fable-5-mythos-5

Verified:

- initial announcement: 2026-06-09;
- access suspended 2026-06-12 and restored 2026-07-01;
- current API price: $10 / million input, $50 / million output;
- Anthropic calls Fable 5 a Mythos-class / Mythos-level model made available for general use with safeguards;
- Anthropic explicitly positions it for ambitious, long-running, asynchronous work and says it can operate for days in suitable agent harnesses.

Boundary:

`Claude Mythos 5` is a distinct restricted-access deployment of the same underlying model with different safeguards. Do not collapse `Fable 5` and `Mythos 5` into one product name.

#### Claude Opus 5

Primary:
https://www.anthropic.com/news/claude-opus-5
https://www.anthropic.com/claude/opus

Verified:

- released 2026-07-24;
- current API price: $5 / million input, $25 / million output;
- Anthropic positions Opus 5 as an everyday premium model for difficult coding / knowledge work and long-running agents;
- Anthropic reports CursorBench 3.2 max-effort performance within 0.5% of Fable 5 peak at roughly half the task cost;
- Anthropic reports Opus 5 exceeding Fable 5's best OSWorld 2.0 result at a little over one-third the cost.

Boundary:

The benchmark numbers above are vendor-reported. They should support a cost/performance point, not a universal ranking.

#### Claude Sonnet 5

Primary:
https://www.anthropic.com/news/claude-sonnet-5
https://www.anthropic.com/claude/sonnet

Verified current state:

- released 2026-06-30;
- current API price: $2 / million input, $10 / million output;
- the launch post originally said the introductory $2/$10 price would end after 2026-08-31 and move to $3/$15;
- Anthropic later changed that plan and made $2/$10 permanent (Aug. 10 changelog/current product page).

**CORRECTION REQUIRED:** the canonical and English Mix currently repeat the superseded Sep. 1 price increase.

## 3. Vendor-reported case study

### Stripe / 50-million-line Ruby codebase

Primary available through Anthropic release page:
https://www.anthropic.com/news/claude-fable-5-mythos-5

Anthropic reports that Stripe used Fable 5 for a codebase-wide migration in a roughly 50-million-line Ruby codebase, completing in one day work estimated to take a team more than two months manually.

Classification: **VENDOR-REPORTED CUSTOMER RESULT**.

Do not write this as an independently reproduced benchmark. Preserve the important clarification that the model did not rewrite all 50 million lines; it executed one migration across that environment.

## 4. Independent / third-party evidence

### Simon Willison — sqlite-utils 4.0

Primary:
https://simonwillison.net/2026/Jul/5/sqlite-utils-fable/
https://simonwillison.net/2026/Jul/7/sqlite-utils-4/

Verified:

- Fable identified five release blockers in a final pre-release review;
- Willison described `sqlite-utils 4.0rc2` as mostly written by Claude Fable;
- estimated Fable-related cost was about $149.25;
- he continued through additional release candidates before releasing 4.0;
- he judged the release materially better because of frontier-model assistance.

Classification: **INDEPENDENT PRACTITIONER REPORT**, but still one project / one practitioner, not a controlled benchmark.

### Every — Senior Engineer Benchmark

Primary:
https://every.to/benchmarks/senior-engineer-benchmark

Verified benchmark v1.0:

- human reference scores: 89 and 96;
- Claude Fable 5 max: 91;
- task: first-principles rewrite of a frozen real production collaboration system;
- Every explicitly notes the same initial prompt but model-specific follow-up instructions;
- official totals are rubric adjudications, not a direct human-equivalence test.

Classification: **THIRD-PARTY BENCHMARK WITH METHODOLOGICAL LIMITATIONS**.

Do not state “Fable is equivalent to a human senior engineer.”

### CodeRabbit — Fable 5

Primary:
https://www.coderabbit.ai/blog/fable-5-model-review

Verified:

- 105 error-pattern code-review benchmark;
- actionable issue coverage: 65/105 vs 66/105 baseline / Opus 4.8;
- actionable precision: 32.8% vs Opus 4.8 at 35.5%;
- Fable produced 253 comments;
- coding-task benchmark was stopped early after many long-running tasks hit agent timeouts;
- CodeRabbit recommends selective use for autonomous coding rather than default production review.

Classification: **THIRD-PARTY PRODUCT BENCHMARK**.

Supports the article's claim that autonomy and review quality are separate dimensions.

### CodeRabbit — Opus 5

Primary:
https://www.coderabbit.ai/blog/opus-5-model-review

Verified:

- about 100 real error patterns, three runs per configuration;
- x-high actionable precision: 39.3% vs production baseline 35.2%;
- known-issue pass rate: 55.2% vs baseline 61.1%;
- roughly four times as many nitpicks;
- CodeRabbit explicitly does not recommend Opus 5 as the only reviewer / primary high-risk safety net.

Classification: **THIRD-PARTY PRODUCT BENCHMARK**.

Supports role-routing, not a universal “Opus = judgment layer” law.

### Every — Taming Opus 5

Primary:
https://every.to/context-window/taming-opus-5

Published 2026-07-28, updated 2026-08-26.

Classification: **PRACTITIONER / EDITORIAL EXPERIENCE REPORT**.

Use only as qualitative evidence that old, over-prescriptive agent instructions can interact poorly with newer model behavior. Do not generalize into a causal law about prompting.

## 5. Central thesis audit

### KEEP

- Model choice should not be reduced to “which is smartest?”
- Work length, ambiguity, self-verification needs, human intervention interval, and external verifiability all matter.
- Long-horizon autonomy can change the economically sensible unit of delegation.

### QUALIFY

- Sonnet / Opus / Fable are not fixed organizational ranks.
- Fable's stronger long-horizon positioning does not make it best at code review.
- Opus's good ambiguous-problem examples do not prove it should always own judgment.
- Sonnet's lower price does not make it only an execution model; Anthropic itself positions Sonnet 5 as agentic and autonomous.

### CORRECT

- Sonnet 5 pricing: remove the obsolete planned Sep. 1 increase; current price remains $2/$10.

### ORIGINAL MODEL / EXTENSION

`委譲距離 / delegation horizon` is this article's heuristic, not a published Anthropic metric.

Operational definition:

> the size and duration of a coherent unit of work that can be handed to an AI before human intervention is required.

Useful dimensions:

1. work length / number of phases;
2. ambiguity / need to discover method;
3. self-verification burden;
4. acceptable human check interval;
5. external verifiability / cost of drift.

The fifth dimension should be treated as a guardrail rather than simply another way to make the horizon “longer.”

## 6. Revised architecture

1. Thesis + evidence boundary
2. Current lineup and pricing — date-stamped snapshot
3. Fable: vendor-reported long-horizon evidence
4. Independent evidence: Willison + Every
5. Counterevidence: Fable review precision / timeout behavior
6. Opus: ambiguous work, with review counterevidence
7. Sonnet: do not reduce to “cheap execution”; it is increasingly agentic
8. Delegation horizon — original heuristic
9. Verifiability and stop rules
10. Routing / escalation instead of fixed hierarchy
11. Conclusion: model progress changes work-unit size, but verification remains human-system design

## 7. Reading Mode decision

Existing English Mix: **UPDATE**.

Reason:

- it contains the same obsolete Sonnet pricing;
- it inherits the same risk of turning a heuristic into a fixed model taxonomy;
- canonical evidence boundaries are materially changing.

## 8. Structure plan

Use 10 selective argument-bearing paragraphs, four marked sentences each = 40 structured sentences.

Profiles:

1. `4-2-3-5`
2. `2-1-3-5`
3. `2-1-3-5`
4. `4-1-3-5`
5. `4-1-3-5`
6. `4-1-3-5`
7. `4-2-3-5`
8. `4-2-3-5`
9. `4-1-3-5`
10. `4-3-2-5`

These are regression fixtures, not a target shape for later articles.
