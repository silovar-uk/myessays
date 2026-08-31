# MyEssays Migration Status

Updated: 2026-08-31

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
| 4 — Freshness & External Claims | **Selected — 0 / 7** | Seven externally volatile articles selected from the latest audit. `claude-delegation-horizon-opus-fable` is next. |

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

The synchronized versions preserve the revised evidence boundaries:

- Minto: structure is a working tool for externalizing/testing thought, not thinking itself or a fully validated cognitive theory;
- Goodhart: proxies do not necessarily fail the instant they become targets; failure risk depends on proxy–goal gaps, optimization pressure, and mechanism;
- Commentary: no direct general law that commentary itself increases noticing; the article uses an attentional-scaffolding model grounded in adjacent evidence.

### Publishing integrity contract

A logical article is one publishing transaction:

**canonical file + `data/index.json` + derived file(s) + `data/versions-index.json`**.

`tools/audit-content.mjs --strict` now treats unindexed canonical or derived Markdown as an **integrity error**, not a warning.

### Final QA

The first closeout run, Visual QA `33385489095`, established that:

- strict migration audit: 0 errors / 0 warnings / 0 known drift;
- static tests: 40 / 40;
- Reading Mode browser QA: success.

It then exposed a timing race in the Argument Structure QA: the test sampled the active paragraph while the runtime's intentional smooth scroll was still updating scroll-based selection.

PR #49 — `Stabilize Argument Structure selection QA after smooth scroll`

Merge commit: `47daad99a82954c693a69bd872e90540b015f867`

The fix preserved the same assertion and waits for programmatic scrolling to settle before validating the final selected paragraph. No runtime behavior, article content, Structure fixtures, or expected outcome was weakened.

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

1. `claude-delegation-horizon-opus-fable` — AI products / workflow — **Next**
2. `physical-ai-embodied-intelligence-deployment` — AI / robotics
3. `rakuten-securities-information-infrastructure` — finance / product ecosystem
4. `bcg-consulting-reality-voices` — company / career
5. `sato-teru-eight-category-dominance` — sports statistics
6. `mali-sahel-history-state-france-russia` — geopolitics / history
7. `pneumonia-how-serious-hospital-oxygen` — medicine / health literacy

Batch 4 tests a different editorial risk from Batch 3: the argument may remain structurally coherent while the external facts underneath it become stale.

For each article use:

**fresh research → information-basis date → evidence map → counterevidence → canonical edit → Structure → Reading Mode decision → QA → merge**

Do not edit all seven at once.

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
