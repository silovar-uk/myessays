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
| 3 — P1 editorial / Writing Architecture batch | **In progress — 3 / 7 completed** | Three D Flagships completed; the editorial method now survives psychology/evaluation, economics/AI allocation, and management/organizational-learning topics with article-specific Structure fixtures. |
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
3. `executive-hands-on-as-exploration` — D — **Completed**
4. `learning-organization-senge-systems-thinking` — D — **Next**
5. `minto-pyramid-thinking-structure-ai` — C
6. `goodharts-law-proxy-target-design` — C
7. `commentary-as-technology-of-noticing` — C

Do **not** edit the remaining four at once.

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
Article merge commit: `40836c71a7f5c66a3d2f5aca96366997af847b8e`

### Writing Architecture

- structured paragraphs: **9**
- structured sentences: **36**
- exact profile differs from article 1 and is treated as an article-specific regression fixture
- Reading Mode: **DEFER**

### QA generalization

PR #32 — `Make Argument Structure QA fixture-driven`
Merge commit: `bcbe2fe48c4d2a65fb8939a78d852f0e45a4f17f`

`scripts/argument-structure-qa.cjs` now runs the common desktop/mobile behavior contract against both flagship fixtures rather than hard-coding only the first article.

Final Visual QA run: `33353633982` — **success**

## Batch 3 article 3 — completion record

Article: `executive-hands-on-as-exploration`
Target class: **D — Flagship**

Execution again reused the method, but research materially changed the draft's central relationship rather than merely tightening wording.

### Research / evidence-boundary result

The article rechecked exploration/exploitation, inventor-CEO research, experimentation, sticky information, situated learning, absorptive capacity, knowledge partitioning, AI task mapping, and prototype-related decision making.

The decisive correction was to separate two claims that the old article blurred together:

1. **past hands-on experience can improve technical judgment**;
2. **continued hands-on executive execution is not automatically exploratory and can narrow search toward existing knowledge**.

This meant the old implicit equation `hands-on = exploration` could not survive as the central thesis.

### Article changes

- retitled to `作ることは、知るためのプローブになる`;
- preserved `created: 2026-08-08` and updated only `updated: 2026-08-31`;
- removed the automatic classification of executive hands-on work as exploration;
- removed `exploratory insourcing` because it collided with established organizational sourcing terminology;
- introduced **hands-on probe** as an article-level diagnostic heuristic rather than a validated theory;
- defined five conditions: `Decision-linked / Question-led / Bounded / Comparatively direct / Exit-ready`;
- treated prototype value as decision / belief update rather than code volume or completion;
- made the relevant actor neutral — CEO, domain owner, operator, engineer, designer, customer, or a combination — depending on where sticky information and decision relevance sit;
- built the strongest counterevidence into the article's central architecture rather than relegating it to limitations;
- added the risk that executive-generated prototypes can narrow organizational search or create premature certainty;
- made delegation part of the probe's definition of done rather than a cleanup step after exploration.

Article PR: #34 — `Reframe executive hands-on work as bounded decision probes`
Article merge commit: `80eac4c66484f027994ed0985fee5efae8d05243`

### Reading Mode

Decision: **DEFER**

No existing English Mix or Español Mix was registered for this canonical ID, so no derived mode was added merely to increase coverage.

### Writing Architecture

The actual authored Structure, verified from the compiled browser/audit result, is:

- structured paragraphs: **11**
- structured sentences: **46**
- exact profile differs from articles 1 and 2

### QA fixture failure and correction

PR #35 — `Add third flagship Argument Structure fixture` — added article 3 to the shared harness, but the initial fixture was manually miscounted as 9 paragraphs / 38 sentences.

Visual QA run `33356408842` failed at Argument Structure QA. The failure was classified as a **fixture error**, not a runtime, article, or integrity defect.

Evidence:

- strict audit independently counted 46 Structure markers;
- browser compilation exposed 11 actual paragraph profiles;
- audit, static tests, and Reading Mode QA were otherwise green before the Structure assertion.

PR #36 — `Correct third flagship Structure fixture` — corrected only the fixture to 11 / 46. It did **not** change:

- article prose;
- Structure metadata;
- runtime behavior;
- assertion strength.

Final QA merge commit:

`c8e47cd4d9072097043fc48fddcda880da0917ea`

### Final validation

Visual QA run `33356549051` — **success**

Strict audit on that run, including parallel content additions already on `main`:

- Canonical index entries: **182**
- Markdown files under `essays/`: **182**
- English Mix files: **111**
- Español Mix files: **1**
- Canonical articles with Structure metadata: **4**
- Legacy canonical `*-mixed-en.md` entries: **0**
- Integrity errors: **0**
- Warnings: **0**
- Known specification drift: **0**
- `executive-hands-on-as-exploration` Structure markers: **46**

Passed:

- strict migration audit;
- static tests: **40 / 40**;
- Reading Mode browser QA;
- Argument Structure browser QA: **3 fixtures passed**;
- Page Reader browser QA;
- ordinary desktop/mobile Visual QA;
- desktop/mobile horizontal-overflow checks;
- console/page-error checks;
- QA artifact upload.

Pages deployment run `33356548218` — **success**

## Conventions after three D Flagships

`MIGRATION_BATCH_3_CONVENTIONS.md` now distinguishes:

### KEEP

- research before prose;
- evidence boundary;
- operationalization of conceptual variables;
- borrowed-theory / terminology boundaries;
- Japanese stabilization before Structure;
- selective Structure rather than coverage targets;
- Conceptual Level is not a quality score;
- historical identity;
- deliberate Reading Mode decisions;
- one article / one principal editorial PR;
- fixture-driven Structure QA;
- QA failure classification;
- explicit change reasons.

### REFINE

- limitations rule: strong counterevidence that changes the central relationship belongs in the **thesis architecture**, not only the limitations section;
- QA rule: authored Structure fixture counts should be verified from audit/browser compilation rather than manual counting alone.

### ADD

- separate **accumulated capability** from **current task ownership**;
- behavior labels such as `hands-on` are not theoretical classifications by themselves;
- preserve actor neutrality until evidence supports role specificity;
- strong counterevidence should rebuild the argument rather than decorate the old thesis;
- aggregation/chaining can require a correction layer rather than another copy of the lower-level theory;
- original modifiers must earn explanatory value;
- comparative advantage must not be presented as an employment guarantee.

### DROP

- none after article 3.

## Next execution gate — Batch 3 article 4

Next target:

`learning-organization-senge-systems-thinking`

Use:

**Research → evidence boundary → search for counterevidence → editorial diagnosis → borrowed-theory/term check → argument skeleton → prose edit → selective Structure annotation → critical review → compile Structure fixture from browser/audit output → full QA → merge**

For this article in particular, distinguish Senge's influential management framework from the empirical evidence for specific learning-organization practices. Do not assume that the popularity of `The Fifth Discipline` establishes causal effectiveness.
