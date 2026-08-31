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
| 2 — Full-library class-A compatibility pass | **Completed** | Compatibility layer reached 0 integrity errors / 0 warnings / 0 known spec drift. |
| 3 — P1 editorial / Writing Architecture batch | **In progress — 2 / 7 completed** | Two D Flagships completed; editorial method now validated across two different subject domains and Structure QA is fixture-driven. |
| 4+ — Later editorial migration batches | Not started | Select only after Batch 3 completes and conventions have been tested across C and D articles. |

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

Validation:

- Visual QA run `33318400060` — success
- Pages deployment run `33318399393` — success

## Batch 2 completion record

Batch 2 audited the full archive after Batch 1 and established the class-A compatibility baseline.

Strict audit result from GitHub Actions run `33347057375`:

- Canonical index entries: 178
- English Mix files: 107
- Español Mix files: 1
- Canonical articles with Structure metadata: 1
- Legacy canonical `*-mixed-en.md` entries: 0
- Integrity errors: 0
- Warnings: 0
- Known specification-drift files: 0

PR #24 — `Preserve full migration audit in Visual QA artifacts` — changed CI so the complete strict-audit report is retained as `qa-artifacts/migration-audit.md`.

Merge commit: `6314c59892b77899b58a8de01de29f17104d0d4e`

## Batch 3 target set

Selected targets and classifications are recorded in `MIGRATION_BATCH_3_SELECTION.md`.

Selected order:

1. `capability-output-asymmetry` — D — **Completed**
2. `dynamic-multilayer-comparative-advantage` — D — **Completed**
3. `executive-hands-on-as-exploration` — D — **Next**
4. `learning-organization-senge-systems-thinking` — D
5. `minto-pyramid-thinking-structure-ai` — C
6. `goodharts-law-proxy-target-design` — C
7. `commentary-as-technology-of-noticing` — C

Do **not** edit the remaining five at once.

## Batch 3 article 1 — completion record

Article: `capability-output-asymmetry`
Target class: **D — Flagship**

Execution:

**Research → evidence-boundary review → editorial diagnosis → argument redesign → article/Structure edit → critical review → browser QA → merge**

Article PR: #26
Article merge commit: `c25b4e908064d6b197cea99c7ac4a12dd8477b40`

Writing Architecture:

- structured paragraphs: 8
- structured sentences: 32
- Reading Mode: DEFER

Follow-up QA/runtime work:

- PR #27 — dedicated Argument Structure browser QA
- PR #28 — mobile Inspector QA selector correction
- PR #29 — real mobile Escape UX fix exposed by the QA

Final runtime/QA commit: `a1dc0d38396d09f4cea40364ea90505307f75bce`
Final Visual QA run: `33350901710` — success
Final Pages deployment run: `33350901263` — success

Reusable method was recorded in `MIGRATION_BATCH_3_CONVENTIONS.md`.

## Batch 3 article 2 — completion record

Article: `dynamic-multilayer-comparative-advantage`
Target class: **D — Flagship**

Execution reused the article-1 method but not its prose layout or Structure profile.

### Research / evidence-boundary result

The second flagship rechecked comparative advantage, task allocation, AI adoption, AI chaining, learning-by-doing, dynamic task models, switching costs, and established dynamic-capabilities terminology.

The key correction was that the original `Chain Comparative Advantage` label overstated the theory. AI chaining research shows that simple task-level comparative-advantage logic can fail when adjacent steps are bundled. The article therefore reframed the second layer as `Workflow Boundary` rather than inventing another kind of comparative advantage.

### Article changes

- retitled to `比較優位は、点ではなく軌道で読む`;
- preserved `created: 2026-08-08` and updated only `updated: 2026-08-31`;
- reframed DMCA as a **three-layer diagnostic framework**, not a validated new economic theory;
- Layer 1: `Task Relative Surplus`;
- Layer 2: `Workflow Boundary`;
- Layer 3: `Capability Trajectory`;
- operationally defined what `dynamic` and `multilayer` add;
- distinguished DMCA's use of `dynamic` from established `dynamic capabilities` theory;
- removed arbitrary numeric reallocation thresholds;
- labeled reallocation thresholds and Harvest / Bridge / Option as article-level heuristics;
- separated direct research support from original hypotheses;
- added the limitation that comparative advantage is not a theorem guaranteeing permanent human employment.

Article PR: #31 — `Reframe dynamic comparative-advantage flagship article`

Article merge commit:

`40836c71a7f5c66a3d2f5aca96366997af847b8e`

### Writing Architecture

- structured paragraphs: **9**
- structured sentences: **36**
- exact profile differs from article 1 and is treated as an article-specific regression fixture
- Reading Mode: **DEFER**

### QA generalization

PR #32 — `Make Argument Structure QA fixture-driven`

Merge commit:

`bcbe2fe48c4d2a65fb8939a78d852f0e45a4f17f`

`scripts/argument-structure-qa.cjs` now runs the common desktop/mobile behavior contract against both flagship fixtures rather than hard-coding only the first article.

Final Visual QA run:

`33353633982` — **success**

Strict audit in that run:

- Canonical index entries: **181**
- Markdown files under `essays/`: **181**
- English Mix files: **110**
- Español Mix files: **1**
- Canonical articles with Structure metadata: **3**
- Legacy canonical `*-mixed-en.md` entries: **0**
- Integrity errors: **0**
- Warnings: **0**
- Known specification drift: **0**

Passed:

- strict migration audit;
- static tests: **40 / 40**;
- Reading Mode browser QA;
- Argument Structure browser QA: **2 fixtures passed**;
- Page Reader browser QA;
- ordinary desktop/mobile Visual QA;
- horizontal overflow checks;
- console/page error checks;
- QA artifact upload.

## Conventions after two D Flagships

`MIGRATION_BATCH_3_CONVENTIONS.md` now distinguishes:

- **KEEP** — research-before-prose, evidence boundary, selective Structure, limitations, historical identity, Reading Mode decision, focused PRs, QA-failure classification;
- **REFINE** — cross-domain analogy became a broader borrowed-theory / terminology-boundary rule; Structure QA became fixture-driven;
- **ADD** — if aggregation breaks a lower-level optimization rule, model a correction layer instead of renaming the same rule; original modifiers such as `dynamic` / `multilayer` must earn explanatory value; comparative advantage must not be presented as an employment guarantee;
- **DROP** — none after article 2.

## Next execution gate — Batch 3 article 3

Next target:

`executive-hands-on-as-exploration`

Use:

**Research → evidence boundary → editorial diagnosis → borrowed-theory/term check → argument skeleton → prose edit → selective Structure annotation → critical review → add article-specific Structure fixture → full QA → merge**

Reuse the validated method and QA behavior contract. Do not copy either previous article's section layout, sentence count, or L1–L5 profile.
