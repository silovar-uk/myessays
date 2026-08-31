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
| 3 — P1 editorial / Writing Architecture batch | **Completed — 7 / 7** | Four D Flagships and three C Writing Architecture articles modernized; all seven have article-specific Structure regression fixtures. |
| 4 — Next editorial batch | **Selection pending after Batch 3 closeout QA** | Re-select from the latest audit rather than continuing from stale inventory order. |

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

## Batch 3 target set — completed

Selection source: `MIGRATION_BATCH_3_SELECTION.md`

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

### What Batch 3 established

The method now survives multiple domains without forcing the same prose or Structure shape:

- psychology / evaluation;
- economics / AI task allocation;
- management / executive experimentation;
- organizational learning;
- structured communication / Minto;
- metrics / incentives / Goodhart;
- attention / expertise / commentary.

Reusable rules are finalized in `MIGRATION_BATCH_3_CONVENTIONS.md`.

### Reading Mode closeout

The first four articles had no registered derived Reading Mode and were valid `DEFER` cases.

Articles 5–7 already had English Mix files. Their canonical rewrites materially changed the thesis, so treating them as `DEFER` was incorrect. Batch 3 closeout therefore changes their decision to **UPDATE** and synchronizes:

- `english-mix/minto-pyramid-thinking-structure-ai.md`;
- `english-mix/goodharts-law-proxy-target-design.md`;
- `english-mix/commentary-as-technology-of-noticing.md`.

The synchronized versions preserve the revised evidence boundaries rather than the superseded claims:

- Minto: structure is a working tool for externalizing/testing thought, not thinking itself or a fully validated cognitive theory;
- Goodhart: proxies do not necessarily fail the instant they become targets; failure risk depends on proxy–goal gaps, optimization pressure, and mechanism;
- Commentary: no direct general law that commentary itself increases noticing; the article uses an attentional-scaffolding model grounded in adjacent evidence.

### Publishing integrity rule added at closeout

A logical article is now treated as one publishing transaction:

**canonical file + `data/index.json` + derived file(s) + `data/versions-index.json`**.

`tools/audit-content.mjs --strict` now treats unindexed canonical or derived Markdown as an **integrity error**, not a warning. This aligns the strict audit with the static data-integrity tests and prevents a file from looking published while the data contract is incomplete.

## Batch 3 final validation gate

Closeout branch: `migration/batch-3-closeout`

Required before merge:

- strict migration audit: 0 errors;
- static tests: 40 / 40;
- Reading Mode browser QA;
- Argument Structure browser QA: all 7 fixtures;
- Page Reader browser QA;
- desktop/mobile Visual QA;
- horizontal-overflow checks;
- console/page-error checks;
- QA artifact upload.

After merge, confirm GitHub Pages deployment and record the final run IDs here.

## Batch 4 selection rule

Do not continue mechanically from the original inventory order. The archive has changed materially during Batch 3.

Re-select the next 5–10 candidates from the latest audit using:

1. **claim risk** — strength of factual/causal claims that may be wrong or overgeneralized;
2. **freshness risk** — dependence on current teams, companies, software, policy, health, or markets;
3. **reader value** — articles worth preserving and improving rather than merely normalizing;
4. **architecture gap** — distance from the current editorial / Structure standard;
5. **derived-mode debt** — existing Reading Modes likely to preserve outdated theses.

Batch 4 begins only after the Batch 3 closeout gate is green.
