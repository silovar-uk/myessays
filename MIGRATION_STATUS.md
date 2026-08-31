# MyEssays Migration Status

Updated: 2026-08-31

This file records the **current execution status** of the migration program.
`MIGRATION_INVENTORY.md` and `MIGRATION_ROADMAP.md` remain the baseline inventory and plan captured at the start of the program; when their embedded status labels differ from this file, this file is the current status.

## Current position

| Batch | Status | Result |
| --- | --- | --- |
| 0A — Baseline and repeatable audit | Completed | Current specification, inventory, roadmap and repeatable content audit added. |
| 0B — Specification and QA contract cleanup | Completed | Documentation, static tests, browser QA and workflow contract aligned to `ja / en-mix / es-mix`. |
| 1 — Legacy canonical `*-mixed-en.md` cleanup | Completed | Five legacy mixed-English canonical companions migrated to `english-mix/` Reading Mode. |
| 2 — Full-library class-A compatibility pass | **Completed** | Strict full-library audit: 178 canonical / 107 English Mix / 1 Español Mix; 0 integrity errors, 0 warnings, 0 known spec drift. |
| 3 — P1 editorial / Writing Architecture batch | **Next — targets selected** | Seven coherent conceptual/management essays selected in `MIGRATION_BATCH_3_SELECTION.md`; research precedes substantive editing. |
| 4+ — Later editorial migration batches | Not started | Select only after Batch 3 documents reusable editorial/Structure conventions. |

## Batch 1 completion record

Merged PR: #22 — `Migrate five legacy mixed-English companions to Reading Mode`

Merge commit:

`1397f146ce8a3b1c08c020b9f1fb5c03e4952614`

Migrated logical articles:

1. `confucius-learning-through-practice`
2. `hanfeizi-small-problems-early-prevention`
3. `mencius-source-is-not-conclusion`
4. `rice-theory-culture-interdependence`
5. `zhuangzi-accepting-unavoidable-conditions`

For each article:

- Japanese canonical content remains under `essays/`;
- the legacy `essays/*-mixed-en.md` companion was removed from the canonical Library index;
- the mixed-language body moved to `english-mix/<canonical-id>.md`;
- the derived file now declares the Japanese canonical `id`;
- `data/versions-index.json` now registers the file as `en-mix`;
- no editorial rewriting was performed as part of this mechanical migration.

## Batch 1 validation

GitHub Actions run `33318400060` completed successfully after the merge.

Passed steps:

- content migration audit;
- static tests;
- Reading Mode browser QA;
- Page Reader browser QA;
- desktop/mobile visual QA;
- QA artifact upload.

GitHub Pages deployment run `33318399393` also completed successfully for the same merge commit.

## Batch 2 completion record

Batch 2 audited the latest full archive after Batch 1 and subsequent content additions.

Strict audit result from GitHub Actions run `33347057375`:

- Canonical index entries: **178**
- Markdown files under `essays/`: **178**
- English Mix files: **107**
- Español Mix files: **1**
- Canonical articles with Structure metadata: **1**
- Legacy canonical `*-mixed-en.md` entries: **0**
- Integrity errors: **0**
- Warnings: **0**
- Known specification-drift files: **0**

Classification:

- P0-A integrity defects: none
- P0-B active specification drift: none
- P1 editorial modernization: intentionally deferred to Batch 3+
- P2 freshness review: handled only when an article is selected for editorial work
- ACCEPT: absence of English Mix, Español Mix, or Structure remains a valid state

No historical article prose needed a compatibility correction in Batch 2.

PR #24 — `Preserve full migration audit in Visual QA artifacts` — changed CI so the full strict-audit report is printed and retained as `qa-artifacts/migration-audit.md` rather than discarded in `/tmp`.

Merge commit:

`6314c59892b77899b58a8de01de29f17104d0d4e`

Validation on that commit:

- strict migration audit: success;
- static tests: **40 / 40 passed**;
- Reading Mode browser QA: success;
- Page Reader browser QA: success;
- desktop/mobile visual QA: success;
- console/page errors in visual QA: none;
- QA artifact upload: success.

## Next execution gate — Batch 3

Selected targets and classifications are recorded in:

`MIGRATION_BATCH_3_SELECTION.md`

Selected order:

1. `capability-output-asymmetry` — D
2. `dynamic-multilayer-comparative-advantage` — D
3. `executive-hands-on-as-exploration` — D
4. `learning-organization-senge-systems-thinking` — D
5. `minto-pyramid-thinking-structure-ai` — C
6. `goodharts-law-proxy-target-design` — C
7. `commentary-as-technology-of-noticing` — C

Do **not** edit all seven at once.

Start with `capability-output-asymmetry` and use:

**Research → editorial diagnosis → proposed changes → article/Structure edit → diff audit → Reader/Structure QA → merge**

before proceeding to the next target.
