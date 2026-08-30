# MyEssays Content Migration Roadmap

Baseline: 2026-08-30
Purpose: move historical content to the current MyEssays contract without flattening the archive into one template

## 1. Program principle

This is a content migration program, not a rewrite-all project.

Order of work:

**Research → Inventory → Classification → Mechanical Migration → Editorial Migration → Audit**

Compatibility comes first. Optional sophistication comes later.

The target is not “100% of articles have Structure and two foreign-language modes.” The target is:

- 100% current-contract compatibility;
- 100% review of P1 content;
- Structure only where it adds explanatory value;
- Reading Modes only where they are useful and maintainable.

## 2. Change streams

Keep these streams separate whenever possible.

### Mechanical stream

- paths;
- IDs;
- indexes;
- Reading Mode keys;
- legacy files/directories;
- front-matter syntax;
- tests, browser QA, CI triggers and publishing contracts.

### Editorial stream

- prose;
- paragraph boundaries;
- headings;
- factual updates;
- sources;
- Structure annotation;
- English Mix / Español Mix quality.

Mechanical and Editorial work should normally use separate PRs so review remains understandable.

## 3. Batch 0A — Baseline and repeatable audit

**Status:** this planning batch

### Deliverables

- `CURRENT_SPEC.md`
- `MIGRATION_INVENTORY.md`
- `MIGRATION_ROADMAP.md`
- `tools/audit-content.mjs`

### Purpose

- establish one current content contract;
- stop reasoning from stale README text;
- make repository-wide auditing repeatable;
- identify P0 compatibility problems before article edits.

### Article body changes

None.

### Done when

- documents are committed;
- audit logic is reviewable;
- roadmap names concrete P0 work;
- no content article is rewritten in the baseline PR.

## 4. Batch 0B — Specification and QA contract cleanup

**Priority:** P0
**Migration class:** infrastructure/contract, not article class

### Files expected

- `README.md`
- `english-mix/README.md`
- legacy `spanish/README.md`
- `tests/data-integrity.test.js`
- `tests/reader-versions.test.js`
- `scripts/reading-versions-qa.cjs`
- `.github/workflows/visual-qa.yml`
- potentially old Spanish implementation-plan documentation if it can be mistaken for the active contract

### Work

1. Replace old `Español / spanish/ / es` instructions with `Español Mix / spanish-mix/ / es-mix`.
2. Clearly mark old full-Spanish design documents as historical if retained.
3. Remove the obsolete active publishing contract under `spanish/` or replace it with a short migration pointer.
4. Update data-integrity tests to support only `en-mix` and `es-mix`.
5. Enumerate `english-mix/` and `spanish-mix/` as derived directories.
6. Update Reader Version tests to assert `es-mix`, `spanish-mix/<id>.md` and Japanese+Spanish mixed content.
7. Update browser Reading Mode QA to open the disclosure UI before selecting modes, check `aria-expanded`/close behavior, switch to `es-mix`, and validate current Español Mix content instead of the deleted full-Spanish text.
8. Update localStorage assertions so derived Reading Modes do not create mode-specific state keys.
9. Update workflow path triggers so `spanish-mix/**` changes run QA; retain `spanish/**` only if intentionally watching legacy cleanup.
10. Add assertions preventing derived modes from appearing in `data/index.json`.
11. Run static tests, browser Reading Mode QA, visual QA and the migration audit.

### Reject if

- the old `es` key is still described as a valid new-content option;
- tests and runtime disagree;
- browser QA bypasses the new disclosure interaction;
- a current `spanish-mix/**` change can skip the relevant CI trigger;
- a full-Spanish translation workflow remains presented as current.

### Done when

- runtime, documentation, static tests, browser QA and workflow path triggers all agree on `ja / en-mix / es-mix`;
- current Español Mix paths trigger QA;
- there is no active publishing instruction for full-Spanish articles;
- no article bodies have been modernized as part of this infrastructure cleanup.

## 5. Batch 1 — Legacy `*-mixed-en.md` canonical cleanup

**Priority:** P0
**Migration class:** A / Mechanical

Confirmed candidates:

1. `confucius-learning-through-practice`
2. `hanfeizi-small-problems-early-prevention`
3. `mencius-source-is-not-conclusion`
4. `rice-theory-culture-interdependence`
5. `zhuangzi-accepting-unavoidable-conditions`

### Per-article procedure

1. Read canonical Japanese and legacy mixed-English files.
2. Verify IDs and logical pairing.
3. Check for an existing `english-mix/<id>.md` file.
4. Choose the best existing mixed content; do not overwrite a newer derived version blindly.
5. Place/retain the valid derived version under `english-mix/<canonical-id>.md`.
6. Register `en-mix` under the canonical ID in `data/versions-index.json`.
7. Remove the legacy mixed companion path from `data/index.json`.
8. Delete the obsolete `essays/*-mixed-en.md` only after the derived mode resolves correctly.
9. Confirm one Library card per logical article.
10. Confirm language switching preserves the article ID and reading state.

### PR sizing

All five may be one PR only if the transformation is homogeneous and each pair is explicitly documented in the PR body. Otherwise split into two PRs.

### Done when

- no canonical index entry ends `-mixed-en.md`;
- no logical article is duplicated in Library because of a Reading Mode;
- all migrated English Mix paths are valid and indexed exactly once.

## 6. Batch 2 — Full-library compatibility pass

**Priority:** P0/P2
**Migration class:** A

Use `tools/audit-content.mjs` as the inventory baseline.

### Audit dimensions

- duplicate canonical IDs;
- duplicate canonical paths;
- missing canonical files;
- unindexed canonical Markdown;
- missing required front matter;
- invalid `created` dates;
- unsupported version keys;
- missing derived files;
- derived ID mismatches;
- unindexed derived files;
- derived files accidentally registered as canonical;
- legacy Spanish dependencies;
- documentation/test/browser-QA/workflow drift;
- obvious local-path/reference breakage where mechanically detectable.

### Editorial rule

Do not improve prose in this batch unless a syntax issue makes the article unreadable.

### Done when

`node tools/audit-content.mjs --strict` reports no integrity errors and all remaining warnings are consciously classified for later batches.

## 7. Batch 3 — P1 flagship conceptual essays

**Priority:** P1
**Migration class:** B/C/D
**Suggested batch size:** 5–8 articles

Candidate pool:

- `capability-output-asymmetry`
- `dynamic-multilayer-comparative-advantage`
- `executive-hands-on-as-exploration`
- `value-chain-competitive-advantage`
- `minto-pyramid-thinking-structure-ai`
- `goodharts-law-proxy-target-design`
- `learning-organization-senge-systems-thinking`
- `commentary-as-technology-of-noticing`
- `outsourcing-ai-results-without-capability` as the existing Structure reference

Final selection should use article metadata, linkage, current relevance and manual reading rather than this list alone.

### Workflow per article

1. Read the full Japanese canonical article.
2. Decide B, C or D before editing.
3. Identify the article's central question/thesis.
4. Review title/subtitle/abstract.
5. Review section structure and paragraph boundaries.
6. If C/D, annotate only argument-bearing paragraphs.
7. Preserve old claims unless a factual correction is needed.
8. If factual/current material exists, research it before editing.
9. Review existing English Mix if present.
10. Add Español Mix only if the article is intentionally selected for it.
11. Test normal Reader first, Structure mode second.

### Quality gate

No article should be upgraded to C merely because Structure UI exists.

## 8. Batch 4 — Chinese classics series

**Priority:** P1/P2
**Migration class:** B, selective C/D

### Why this is its own batch

These pieces share a recognizable editorial pattern:

source phrase → historical/commentarial context → interpretation → modern application → question/implication.

That makes cross-series consistency more valuable than arbitrary chronological migration.

### Work

- normalize Series metadata where needed;
- check source/reference presentation;
- align Japanese and English Mix H2 structures where practical;
- selectively add Structure to argument-rich entries;
- select a small number of flagship entries for Español Mix;
- do not convert every source explanation into a Conceptual Paper template.

### Candidate flagship pattern

Prefer entries that:

- introduce a recurring learning/decision concept;
- connect clearly to other essays;
- are likely to be reread;
- have strong sources and a durable thesis.

## 9. Batch 5 — Hello! Project history and person-history archive

**Priority:** P1/P2
**Migration class:** A/B, selective C

### Primary goals

- Series consistency;
- metadata consistency;
- canonical/English Mix alignment;
- source consistency;
- handling of recent-history freshness;
- navigation and series-map coherence.

### Non-goal

Do not add L1–L5 metadata to every historical paragraph. Structure is useful only where the author is making an interpretive argument rather than merely recording chronology.

### Batch shape

Prefer series-level batches, e.g. overview + series map, then chronological subsets, then person-focused essays.

## 10. Batch 6 — Freshness-risk content

**Priority:** P1/P2 depending on visibility
**Migration class:** B/D after research

Potential categories:

- current sports teams/players;
- companies and management;
- market/financial topics;
- AI products/platform behavior;
- software/current technical behavior;
- health/medical/current guidance.

### Required rule

Research current facts before editorial modernization.

Then decide whether to:

- update the article and `updated` date;
- preserve it explicitly as a time-stamped historical snapshot;
- add a short update note;
- create a newer related essay instead of rewriting the original thesis.

Do not convert a 2026 historical snapshot into an apparently timeless statement without explaining the time frame.

## 11. Batch 7 — Reference, technical and game-guide content

**Priority:** P2/P3
**Migration class:** A/B

### Focus

- retrievability;
- clear headings;
- stable examples;
- valid links/code blocks;
- concise abstracts;
- current technical correctness where relevant.

Argument Structure is normally not necessary.

## 12. Batch 8 — Remaining P2/P3 archive

Only after P0 and P1 work has established stable conventions.

Use the generated inventory to group remaining articles by type/series rather than editing them in arbitrary date order.

## 13. PR sizing rules

### Mechanical PRs

May contain more files when transformations are homogeneous, scriptable and easily verified.

### Editorial PRs

Default to 5–10 articles maximum.

Use fewer when:

- articles are long;
- factual research is required;
- Structure metadata is being added;
- Reading Modes are being rewritten.

Never optimize for article count at the expense of reviewability.

## 14. Review labels for changes

Every editorial PR should explain changes using these reasons:

- `SPEC`
- `BUG`
- `FACT`
- `STRUCTURE`
- `READABILITY`
- `LANGUAGE`

If a prose change cannot be explained by one of these, reconsider whether the historical article should be changed.

## 15. Regression checklist per batch

At minimum:

- Japanese canonical loads;
- Library shows one card per logical article;
- search finds canonical article correctly;
- available Reading Mode badges are correct;
- Language disclosure only shows available modes;
- disclosure opens/closes by click, selection, outside click and Escape;
- switching modes keeps the same logical article ID;
- reading position remains reasonable across modes;
- Note/reading state remains shared;
- normal Reader remains clean;
- Structure articles work with Structure OFF and ON;
- mobile reader remains usable;
- console errors are not introduced;
- migration audit is rerun after changes.

## 16. Program metrics

Do not use “number of articles touched” as the primary success measure.

Track:

### Compatibility Coverage

Percentage of canonical articles passing current data/runtime contract checks.

**Target:** 100%.

### P1 Modernization Coverage

Percentage of P1 articles manually reviewed to their chosen target class.

**Target:** 100% of the selected P1 set.

### Writing Architecture Coverage

Percentage of articles intentionally classified C/D that have meaningful Structure review.

**Target:** 100% of C/D targets, not 100% of the Library.

### Reading Mode Quality

Percentage of existing derived modes reviewed against current Mix contracts.

**Target:** all existing derived modes eventually reviewed; absence of a derived mode is not failure.

## 17. Rollback principle

Each migration batch must remain reversible through Git history.

Do not delete a legacy companion until:

- its canonical identity is known;
- replacement derived content is committed in the same PR or already exists;
- `data/versions-index.json` points to the replacement;
- the Library no longer needs the legacy path.

## 18. Immediate next action after this baseline

Proceed to **Batch 0B — Specification and QA contract cleanup**.

Do not begin broad article modernization before:

1. current documentation is aligned;
2. static data and Reader Version tests match `es-mix` / `spanish-mix/`;
3. browser Reading Mode QA drives the current disclosure UI and Español Mix content;
4. workflow path triggers cover `spanish-mix/**`;
5. the audit can be rerun against the same contract;
6. the five `*-mixed-en.md` canonical companions have an explicit Batch 1 migration route.

That sequence prevents the migration project itself from creating or approving new legacy content while it is trying to remove old legacy content.
