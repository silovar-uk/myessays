# MyEssays Migration Batch 4 Selection

Selected: 2026-08-31
Updated: 2026-08-31

Theme: **Freshness & External Claims**

Batch 3 established a reusable Writing Architecture for conceptual essays. Batch 4 deliberately tests that method against a different failure mode: articles whose truth can drift because they depend on changing products, services, organizations, statistics, geopolitics, or medical guidance.

Current progress: **1 / 7 completed**.

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

| # | Article | Domain | EN Mix | Status | Why now |
| --- | --- | --- | --- | --- | --- |
| 1 | `claude-delegation-horizon-opus-fable` | AI products / workflow | yes | **Completed** | Model names, pricing, benchmarks, product positioning, and case studies can date quickly. The article also builds an original `delegation horizon` model on top of vendor claims. |
| 2 | `physical-ai-embodied-intelligence-deployment` | AI / robotics | yes | **Next** | Fast-moving terminology and 2026 product/research claims; needs a clean boundary between industry label, research concepts, and editorial working definitions. |
| 3 | `rakuten-securities-information-infrastructure` | finance / product ecosystem | no | Pending | Product availability, rates, account counts, ownership, NISA features, and content entitlements are operational facts that can change. |
| 4 | `bcg-consulting-reality-voices` | company / career | yes | Pending | Anonymous reviews, employee testimony, staffing practices, and working-hours claims need source weighting and protection against overgeneralizing from anecdotes. |
| 5 | `sato-teru-eight-category-dominance` | sports statistics | yes | Pending | The thesis is anchored to a specific in-season statistical snapshot and requires separation of date-stamped fact from durable interpretation. |
| 6 | `mali-sahel-history-state-france-russia` | geopolitics / history | yes | Pending | Historical material is relatively stable, but military rule, regional blocs, foreign-security actors, and current security conditions move quickly. |
| 7 | `pneumonia-how-serious-hospital-oxygen` | medicine / health literacy | yes | Pending | High-stakes domain. Guidance, severity tools, and practical interpretation must be held to a higher evidence and wording threshold than ordinary essays. |

## Execution policy

Do **not** edit all seven at once.

Use one principal article PR at a time:

**fresh research → date boundary → evidence map → counterevidence → canonical edit → Structure → Reading Mode decision → QA → merge**

After each article, decide whether the Batch 4 conventions need refinement before moving on.

## Article 1 — Completed

`claude-delegation-horizon-opus-fable`

Research audit:

- `RESEARCH_BATCH_4_01_CLAUDE_DELEGATION_HORIZON_2026-08-31.md`

### Editorial outcome

The central `delegation horizon / 委譲距離` idea was retained, but its evidence boundary was rebuilt:

- corrected the superseded Sonnet 5 Sep. 1 pricing assumption; `$2 / $10` had been made permanent;
- separated verified product facts from vendor-reported customer results, third-party benchmarks, practitioner reports, and editorial synthesis;
- kept the Stripe 50-million-line migration case but identified the `>2 months → 1 day` figure as a vendor-published customer report;
- explicitly labeled `delegation horizon` as the article's operational heuristic rather than an Anthropic taxonomy or validated metric;
- replaced fixed Sonnet / Opus / Fable role ranks with a routing hypothesis based on work length, ambiguity, self-verification burden, human intervention interval, external verifiability, and cost;
- synchronized the existing English Mix — **Reading Mode: UPDATE**.

### Writing Architecture

Final browser-compiled Structure:

- **10 structured paragraphs**;
- **40 structured sentences**.

This raises the shared regression suite from seven to **eight article fixtures**.

### Implementation

Principal article PR:

- PR #51 — `Modernize Claude delegation horizon with freshness-safe evidence`
- merge: `075945913a9b7eabbedd715ec365b72f23d8b034`

Fixture correction:

- PR #52 — `Align Claude Structure fixture with compiled profile`
- merge: `6ca1cf199cc96974114f93853570fcefd515c735`

The initial main run exposed one manual fixture-profile mismatch. The canonical content and audit already agreed on 10 / 40, so PR #52 changed one fixture value only; no article prose, runtime behavior, sentence count, or assertion strictness was weakened.

### Final QA gate

Visual QA `33389369825` — **success**:

- strict audit: 0 errors / 0 warnings / 0 known drift;
- static tests: 40 / 40;
- Reading Mode QA: success;
- Argument Structure QA: **8 fixtures passed**;
- Page Reader QA: success;
- desktop/mobile Visual QA: success;
- horizontal overflow: none;
- console/page errors: none;
- QA artifacts: uploaded.

Pages `33389368946` — **success**.

Article 1 is closed.

## Article 2 — Next

`physical-ai-embodied-intelligence-deployment`

Primary review question:

> Which parts of the current article are stable research concepts, which are industry/product language, and which are time-stamped 2026 deployment claims?

Do not start the canonical edit until current terminology, Gemini Robotics / VLA / world-model evidence, safety claims, deployment evidence, and product-state claims have been re-researched.

Existing English Mix: present. Therefore the final Reading Mode decision must be **KEEP / UPDATE / RETIRE**; `DEFER` is not allowed.

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
