# MyEssays Migration Status

Updated: 2026-08-30

This file records the **current execution status** of the migration program.
`MIGRATION_INVENTORY.md` and `MIGRATION_ROADMAP.md` remain the baseline inventory and plan captured at the start of the program; when their embedded status labels differ from this file, this file is the current status.

## Current position

| Batch | Status | Result |
| --- | --- | --- |
| 0A — Baseline and repeatable audit | Completed | Current specification, inventory, roadmap and repeatable content audit added. |
| 0B — Specification and QA contract cleanup | Completed | Documentation, static tests, browser QA and workflow contract aligned to `ja / en-mix / es-mix`. |
| 1 — Legacy canonical `*-mixed-en.md` cleanup | Completed | Five legacy mixed-English canonical companions migrated to `english-mix/` Reading Mode. |
| 2 — Full-library class-A compatibility pass | Next | Run the strict audit across the full archive and classify any remaining warnings before editorial modernization. |
| 3+ — Editorial migration batches | Not started | Start only after Batch 2 establishes the compatibility baseline. |

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

## Next execution gate — Batch 2

Run:

```bash
node tools/audit-content.mjs --strict
```

Then review the full report, not only the exit code.

Batch 2 is complete only when:

- integrity errors are zero;
- every warning is classified as a later editorial task, an intentional legacy condition, or a defect to fix now;
- no canonical/derived identity collision remains;
- no unindexed canonical or derived Markdown remains;
- no stale Reading Mode contract remains in active documentation, tests, browser QA or workflows.

Do **not** begin broad prose modernization before this compatibility pass is reviewed.