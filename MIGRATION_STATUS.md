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
| 3 — P1 editorial / Writing Architecture batch | **In progress — 1 / 7 completed** | `capability-output-asymmetry` completed as the first D Flagship; reusable method recorded in `MIGRATION_BATCH_3_CONVENTIONS.md`. |
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

## Batch 3 target set

Selected targets and classifications are recorded in:

`MIGRATION_BATCH_3_SELECTION.md`

Selected order:

1. `capability-output-asymmetry` — D — **Completed**
2. `dynamic-multilayer-comparative-advantage` — D — Next
3. `executive-hands-on-as-exploration` — D
4. `learning-organization-senge-systems-thinking` — D
5. `minto-pyramid-thinking-structure-ai` — C
6. `goodharts-law-proxy-target-design` — C
7. `commentary-as-technology-of-noticing` — C

Do **not** edit the remaining six at once.

## Batch 3 article 1 — completion record

Article:

`capability-output-asymmetry`

Target class:

**D — Flagship**

Execution:

**Research → evidence-boundary review → editorial diagnosis → argument redesign → article/Structure edit → critical review → browser QA → merge**

### Article changes

- preserved the article's core claim that observed performance and capability should not be collapsed;
- separated direct empirical findings from editorial/theoretical extensions;
- redesigned COIM so it no longer assumes an omniscient `true ability yes/no` axis;
- reframed COIM around initial observed output and richer subsequent evidence;
- strengthened limitations and counterarguments;
- limited the human/AI analogy to the structure of evaluation rather than internal mechanisms;
- retained distinctive useful metaphors where they could be clearly labeled as the article's interpretation;
- preserved `created: 2026-08-08` and updated only `updated: 2026-08-31`.

Article PR:

#26 — `Modernize capability-output flagship article with Writing Architecture`

Article merge commit:

`c25b4e908064d6b197cea99c7ac4a12dd8477b40`

### Writing Architecture

- structured paragraphs: **8**
- structured sentences: **32**
- canonical articles with Structure metadata after this article: **2**
- Structure metadata remains selective rather than full-article coverage
- exact profiles are a regression fixture for this article, not a template for the remaining Batch 3 articles

### Reading Mode

Decision: **DEFER**

No existing English Mix or Español Mix was registered for the article. A derived mode was not added merely to increase coverage; the Japanese canonical argument was stabilized first.

### QA and UX findings

The article migration exposed a gap: existing CI did not directly exercise Argument Structure UI.

Follow-up work:

- PR #27 — added `scripts/argument-structure-qa.cjs` and wired it into Visual QA;
- PR #28 — corrected the QA's mobile Inspector selector after classifying the first failure as a test-contract issue;
- PR #29 — fixed a real UX bug revealed by the corrected QA: Escape closed the mobile Structure sheet and also triggered the global reader-back shortcut.

Final runtime/QA commit:

`a1dc0d38396d09f4cea40364ea90505307f75bce`

Final Visual QA run:

`33350901710` — **success**

Passed:

- strict migration audit;
- static tests: **40 / 40**;
- Reading Mode browser QA;
- dedicated Argument Structure browser QA;
- Page Reader browser QA;
- ordinary desktop/mobile Visual QA;
- QA artifact upload.

Latest audit in that validation sequence remained clean and recognized `capability-output-asymmetry` as **32 structured sentences**. Parallel article additions were preserved rather than overwritten.

Final Pages deployment run:

`33350901263` — **success**

### Reusable method

The conventions extracted from this article are recorded in:

`MIGRATION_BATCH_3_CONVENTIONS.md`

Future Batch 3 articles should reuse the method, not copy this article's section layout, wording, or L1–L5 profile.

## Next execution gate — Batch 3 article 2

Next target:

`dynamic-multilayer-comparative-advantage`

Use:

**Research → evidence boundary → editorial diagnosis → argument skeleton → prose edit → selective Structure annotation → critical review → dedicated Structure QA → merge**

Before editing, recheck current AI/task-economics sources and the article's proposed task / chain / trajectory model. Do not treat the baseline article's eight profiles as a target shape.
