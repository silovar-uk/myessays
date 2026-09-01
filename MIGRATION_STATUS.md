# MyEssays Migration Status

Updated: 2026-09-01

This file records the **current execution status** of the migration program.
`MIGRATION_INVENTORY.md` and `MIGRATION_ROADMAP.md` remain baseline snapshots; when their embedded status differs from this file, this file is authoritative.

## Current position

| Batch | Status | Result |
| --- | --- | --- |
| 0A — Baseline and repeatable audit | Completed | Current specification, inventory, roadmap, and repeatable audit established. |
| 0B — Specification and QA contract cleanup | Completed | Docs, static tests, browser QA, and workflow aligned to `ja / en-mix / es-mix`. |
| 1 — Legacy canonical `*-mixed-en.md` cleanup | Completed | Five legacy mixed-English canonical companions migrated to Reading Mode. |
| 2 — Full-library class-A compatibility pass | Completed | Compatibility baseline reached 0 integrity errors / 0 warnings / 0 known spec drift. |
| 3 — P1 editorial / Writing Architecture batch | **Completed — 7 / 7, final QA green** | Four D Flagships and three C Writing Architecture articles modernized; Reading Mode debt closed and seven Structure fixtures protected. |
| 4 — Freshness & External Claims | **In Progress — 3 / 7** | Articles 1–3 completed and green. `bcg-consulting-reality-voices` is next. |

## Batch 1

PR #22 — `Migrate five legacy mixed-English companions to Reading Mode`

Merge commit: `1397f146ce8a3b1c08c020b9f1fb5c03e4952614`

Migrated logical articles:

1. `confucius-learning-through-practice`
2. `hanfeizi-small-problems-early-prevention`
3. `mencius-source-is-not-conclusion`
4. `rice-theory-culture-interdependence`
5. `zhuangzi-accepting-unavoidable-conditions`

Validation:

- Visual QA `33318400060` — success
- Pages `33318399393` — success

## Batch 2

PR #24 — `Preserve full migration audit in Visual QA artifacts`

Merge commit: `6314c59892b77899b58a8de01de29f17104d0d4e`

Baseline strict audit:

- canonical: 178
- English Mix: 107
- Español Mix: 1
- integrity errors: 0
- warnings: 0
- known specification drift: 0

## Batch 3 — completed

Selection source: `MIGRATION_BATCH_3_SELECTION.md`
Reusable method: `MIGRATION_BATCH_3_CONVENTIONS.md`

| # | Article | Class | Principal PR | Structure |
| --- | --- | --- | --- | ---: |
| 1 | `capability-output-asymmetry` | D — Flagship | #26 | 8 paragraphs / 32 sentences |
| 2 | `dynamic-multilayer-comparative-advantage` | D — Flagship | #31 | 9 / 36 |
| 3 | `executive-hands-on-as-exploration` | D — Flagship | #34 | 11 / 46 |
| 4 | `learning-organization-senge-systems-thinking` | D — Flagship | #38 | 12 / 48 |
| 5 | `minto-pyramid-thinking-structure-ai` | C — Writing Architecture | #40 | 9 / 35 |
| 6 | `goodharts-law-proxy-target-design` | C — Writing Architecture | #41 | 10 / 40 |
| 7 | `commentary-as-technology-of-noticing` | C — Writing Architecture | #42 | 10 / 40 |

Final shared Structure fixture PR: #43 — `Protect all Batch 3 Structure fixtures`.

### Reading Mode closeout

Articles 5–7 already had English Mix files. Their canonical rewrites materially changed the thesis, so the earlier `DEFER` interpretation was corrected to **UPDATE**.

PR #47 — `Close Batch 3 and synchronize derived Reading Modes`

Merge commit: `67c06217978f7072e3c1126cfb9d982a441885bd`

Synchronized:

- `english-mix/minto-pyramid-thinking-structure-ai.md`;
- `english-mix/goodharts-law-proxy-target-design.md`;
- `english-mix/commentary-as-technology-of-noticing.md`.

### Publishing integrity contract

A logical article is one publishing transaction:

**canonical file + `data/index.json` + derived file(s) + `data/versions-index.json`**.

`tools/audit-content.mjs --strict` treats unindexed canonical or derived Markdown as an **integrity error**, not a warning.

### Final QA

PR #49 — `Stabilize Argument Structure selection QA after smooth scroll`

Merge commit: `47daad99a82954c693a69bd872e90540b015f867`

Final main validation:

- Visual QA `33385910625` — **success**
  - strict migration audit — success
  - static tests — success
  - Reading Mode browser QA — success
  - Argument Structure browser QA — success for all seven fixtures
  - Page Reader browser QA — success
  - desktop/mobile browser Visual QA — success
  - QA artifact upload — success
- Pages deployment `33385909982` — **success**

**Batch 3 is closed.**

## Batch 4 — Freshness & External Claims

Selection source: `MIGRATION_BATCH_4_SELECTION.md`

Selected order:

1. `claude-delegation-horizon-opus-fable` — AI products / workflow — **Completed**
2. `physical-ai-embodied-intelligence-deployment` — AI / robotics — **Completed**
3. `rakuten-securities-information-infrastructure` — finance / product ecosystem — **Completed**
4. `bcg-consulting-reality-voices` — company / career — **Next**
5. `sato-teru-eight-category-dominance` — sports statistics
6. `mali-sahel-history-state-france-russia` — geopolitics / history
7. `pneumonia-how-serious-hospital-oxygen` — medicine / health literacy

Batch 4 tests a different editorial risk from Batch 3: the argument may remain structurally coherent while the external facts underneath it become stale.

For each article use:

**fresh research → information-basis date → evidence map → counterevidence → canonical edit → Structure → Reading Mode decision → QA → merge**

Do not edit all seven at once.

### Article 1 — completed

Article: `claude-delegation-horizon-opus-fable`

Research audit:

- `RESEARCH_BATCH_4_01_CLAUDE_DELEGATION_HORIZON_2026-08-31.md`

Principal PR:

- PR #51 — `Modernize Claude delegation horizon with freshness-safe evidence`
- merge commit: `075945913a9b7eabbedd715ec365b72f23d8b034`

Fixture correction:

- PR #52 — `Align Claude Structure fixture with compiled profile`
- merge commit: `6ca1cf199cc96974114f93853570fcefd515c735`

Editorial result:

- corrected the obsolete Sonnet 5 planned Sep. 1 price increase; the current `$2 / $10` price had been made permanent;
- separated verified product facts, vendor-reported customer results, third-party benchmarks, practitioner reports, and the article's original heuristic;
- retained the Stripe migration example but explicitly classified the `>2 months → 1 day` claim as an Anthropic-published customer report rather than an independently reproduced benchmark;
- reframed `delegation horizon / 委譲距離` as an article-level operational heuristic, not an Anthropic taxonomy or validated scale;
- replaced fixed `Sonnet = execution / Opus = judgment / Fable = project` ranking with a routing hypothesis based on work length, ambiguity, self-verification burden, human intervention interval, verifiability, and cost;
- synchronized the existing English Mix — Reading Mode decision: **UPDATE**.

Writing Architecture:

- Structure: **10 paragraphs / 40 sentences**;
- shared Argument Structure regression suite: **8 fixtures** after Article 1.

Final Article 1 validation:

- Visual QA `33389369825` — **success**
- Pages deployment `33389368946` — **success**

### Article 2 — completed

Article: `physical-ai-embodied-intelligence-deployment`

Research and editorial result:

- treated `Physical AI` as an umbrella framing rather than a single settled academic taxonomy;
- separated Physical AI, Embodied AI, VLA and World Model instead of collapsing them into one technology stack;
- avoided assuming that a VLA is necessarily a single monolithic end-to-end architecture;
- treated humanoid morphology as one task/environment design choice rather than a synonym for Physical AI;
- separated dated Gemini Robotics / GR00T product snapshots from the durable robotics problem;
- introduced **Capability → Reliability → Deployability** as an article-level diagnostic model;
- used `Deployment Gap` as an editorial working concept for the distance between a demonstrated capability and reliable, economically operable deployment;
- synchronized the existing English Mix — Reading Mode decision: **UPDATE**.

Writing Architecture:

- Structure: **12 paragraphs / 48 sentences**;
- shared regression suite: **9 fixtures** after Article 2.

Implementation:

- PR #55 — principal article/research/English Mix/Structure — merge `9d541160338a383bc11532644e4fdf605b05aa00`
- PR #56 — align Structure fixture with compiled 12 / 48 — merge `cef2b4a80c35a821684e9f4a2e6318882883108d`
- PR #58 — allow the closed-loop label to wrap on mobile — merge `712a0b7ab04f565f66e482cb96703ae454217cc8`
- PR #59 — general Reader long-token wrapping safeguard — merge `6f1d248d22af6ca50e31ad3da3775a48f1bec3d7`

Final Article 2 validation:

- Visual QA `33391989848` — **success**
  - strict audit: 0 errors / 0 warnings / 0 known drift;
  - static tests: 40 / 40;
  - Reading Mode QA: success;
  - Argument Structure QA: **9 fixtures passed**;
  - Page Reader QA: success;
  - desktop/mobile Visual QA: success;
  - horizontal overflow: none;
  - console/page errors: none.
- Pages `33391989374` — **success**.

### Article 3 — completed

Article: `rakuten-securities-information-infrastructure`

Research audit:

- `RESEARCH_BATCH_4_03_RAKUTEN_SECURITIES_INFORMATION_INFRASTRUCTURE_2026-08-31.md`

Principal PR:

- PR #60 — `Modernize Rakuten Securities as an information-friction system`
- merge commit: `f9e255f88e26da0e02b5eb4656b90b95376fba4a`

Shared-fixture repair:

- PR #61 — `Restore DMCA Structure regression profile`
- merge commit: `c5e42f6339579d12959c5e739bdbf271ea7ee938`

Editorial result:

- corrected the stale Money Bridge snapshot from 0.38% / 0.32% to the 2026-08-03 snapshot of **0.48% / 0.42% before tax**, while explicitly treating rates as variable;
- qualified 14 million as cumulative general accounts and NISA 7 million as a dated account-count claim rather than an active-user or quality metric;
- preserved current Nikkei Telecom, Company Shikiho and Barron's Digest access while defining the boundary of each service;
- replaced the old perk catalog with the article-level working model **Discover → Understand → Fund → Execute → Review**;
- separated `commission zero` from `total economic cost zero`, including spread and other possible costs;
- added counterweight around commercial provider incentives, reward-driven behavior and the gap between information abundance and decision quality;
- existing English Mix: none — Reading Mode decision: **DEFER**.

Writing Architecture:

- Structure: **11 paragraphs / 44 sentences**;
- shared Argument Structure regression suite: **10 fixtures** after Article 3.

QA notes:

- the first post-merge Structure failure was caused by PR #60 accidentally rolling one pre-existing DMCA fixture value backward; PR #61 restored only that shared fixture expectation;
- the next intermediate main run was blocked by an unrelated parallel English Mix registration gap in `software-architecture-oop-boundaries-change`; that parallel publishing-integrity issue was subsequently resolved on main and was not repaired through the Rakuten article transaction.

Definitive latest-main validation on `b46189afb9805fc9618ae03ad5454f79bfe1901f`:

- Visual QA `33467384785` — **success**
  - strict audit: 0 errors / 0 warnings / 0 known drift;
  - canonical: 208;
  - English Mix: 137;
  - Español Mix: 1;
  - Structure canonicals: 25;
  - Rakuten Structure: **44 sentences**;
  - static tests: **40 / 40**;
  - Reading Mode browser QA: success;
  - Argument Structure browser QA: **10 fixtures passed**;
  - Page Reader QA: success;
  - desktop/mobile Visual QA: success;
  - horizontal overflow: none on tested viewports;
  - console/page errors: none;
  - QA artifact: `9785349946`.
- Pages `33467383835` — **success**.

**Batch 4 progress: 3 / 7.**

### Article 4 — next

Article: `bcg-consulting-reality-voices`

Primary risk: anonymous reviews, employee testimony, staffing practices and working-hours claims can be real but are easy to overgeneralize. The next pass must weight sources, separate dated company facts from testimony, and avoid turning anecdotes into organization-wide causal claims.

Existing English Mix: present. Final Reading Mode decision must therefore be **KEEP / UPDATE / RETIRE**; `DEFER` is not allowed.

### Reading Mode rule

Existing derived modes must be classified **KEEP / UPDATE / RETIRE** after canonical changes.
`DEFER` is allowed only when no derived mode exists.

### Batch 4 completion gate

For each article:

- important current claims re-researched;
- snapshot facts separated from durable thesis;
- vendor-reported / independent / primary evidence distinguished where relevant;
- original article-level models labeled as such;
- selective Structure added only after canonical stabilizes;
- existing Reading Modes synchronized where needed;
- strict audit green;
- static tests green;
- Reading Mode QA green;
- all registered Structure fixtures green;
- Page Reader QA green;
- desktop/mobile Visual QA green;
- Pages deployment green after merge.
