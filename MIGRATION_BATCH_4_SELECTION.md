# MyEssays Migration Batch 4 Selection

Selected: 2026-08-31

Theme: **Freshness & External Claims**

Batch 3 established a reusable Writing Architecture for conceptual essays. Batch 4 deliberately tests that method against a different failure mode: articles whose truth can drift because they depend on changing products, services, organizations, statistics, geopolitics, or medical guidance.

## Selection rule

Candidates were re-selected from the latest strict audit after Batch 3 rather than inherited from the original inventory.

Priority combines:

1. **claim risk** — strong factual, causal, comparative, or evaluative claims;
2. **freshness risk** — facts can change after publication;
3. **reader value** — article remains worth maintaining;
4. **architecture gap** — no current selective Structure layer / older editorial standard;
5. **derived-mode debt** — an existing English Mix can preserve superseded claims after the canonical changes.

Newly authored NPB series articles are intentionally excluded because they are already being developed under the current architecture in parallel work.

## Selected order

| # | Article | Domain | EN Mix | Why now |
| --- | --- | --- | --- | --- |
| 1 | `claude-delegation-horizon-opus-fable` | AI products / workflow | yes | Model names, pricing, benchmarks, product positioning, and case studies can date quickly. The article also builds an original `delegation horizon` model on top of vendor claims. |
| 2 | `physical-ai-embodied-intelligence-deployment` | AI / robotics | yes | Fast-moving terminology and 2026 product/research claims; needs a clean boundary between industry label, research concepts, and editorial working definitions. |
| 3 | `rakuten-securities-information-infrastructure` | finance / product ecosystem | no | Product availability, rates, account counts, ownership, NISA features, and content entitlements are operational facts that can change. |
| 4 | `bcg-consulting-reality-voices` | company / career | yes | Anonymous reviews, employee testimony, staffing practices, and working-hours claims need source weighting and protection against overgeneralizing from anecdotes. |
| 5 | `sato-teru-eight-category-dominance` | sports statistics | yes | The thesis is anchored to a specific in-season statistical snapshot and requires separation of date-stamped fact from durable interpretation. |
| 6 | `mali-sahel-history-state-france-russia` | geopolitics / history | yes | Historical material is relatively stable, but military rule, regional blocs, foreign-security actors, and current security conditions move quickly. |
| 7 | `pneumonia-how-serious-hospital-oxygen` | medicine / health literacy | yes | High-stakes domain. Guidance, severity tools, and practical interpretation must be held to a higher evidence and wording threshold than ordinary essays. |

## Execution policy

Do **not** edit all seven at once.

Use one principal article PR at a time:

**fresh research → date boundary → evidence map → counterevidence → canonical edit → Structure → Reading Mode decision → QA → merge**

After each article, decide whether the Batch 4 conventions need refinement before moving on.

## Article 1 — Next

`claude-delegation-horizon-opus-fable`

### Why first

It is the cleanest stress test for the new batch because nearly every layer can drift:

- model lineup;
- release dates;
- API pricing;
- benchmark claims;
- vendor case studies;
- third-party evaluations;
- product naming;
- the boundary between demonstrated capability and marketing framing.

The canonical article currently makes concrete 2026 claims about Sonnet 5, Opus 5, and Fable 5 and introduces `委譲距離 / delegation horizon` as an article-level model.

### Required research classes

Prefer this source order:

1. Anthropic official model/release/pricing documentation;
2. primary case-study sources named in the article;
3. independent technical evaluations and practitioner reports;
4. only then secondary summaries.

### Required editorial distinctions

Keep separate:

- **verified product fact**;
- **vendor-reported benchmark or customer result**;
- **independent observation**;
- **editorial synthesis**;
- **original model (`delegation horizon`)**.

Do not allow a vendor case study to silently become a general capability claim.

### Reading Mode

Existing English Mix: **UPDATE if canonical thesis or evidence boundary changes**.

`DEFER` is not allowed because a derived version already exists.

## Batch 4 completion gate

For every article:

- important current claims re-researched;
- information basis date explicit when needed;
- primary vs vendor-reported vs independent evidence distinguished;
- current snapshot separated from durable thesis;
- original model clearly labeled;
- selective Structure added only after canonical stabilizes;
- existing derived mode classified KEEP / UPDATE / RETIRE;
- strict audit 0 errors / 0 warnings / 0 known drift;
- static tests green;
- Reading Mode QA green;
- all registered Argument Structure fixtures green;
- Page Reader QA green;
- desktop/mobile Visual QA green;
- Pages deployment green after merge.

Batch 4 is complete only when all seven articles pass this gate and their derived-mode decisions are recorded.
