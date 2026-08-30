# MyEssays Content Migration Roadmap

Baseline: 2026-08-30
Purpose: move historical content to the current MyEssays contract without flattening the archive into one template

## 1. Program principle

This is a content migration program, not a rewrite-all project.

Order of work:

**Research → Inventory → Classification → Mechanical Migration → Editorial Migration → Audit**

Compatibility comes first. Optional sophistication comes later.

Program targets:

- current-contract compatibility: 100%;
- P1 content: 100% manually reviewed to an intentional target class;
- Structure: only where argument visualization adds value;
- Reading Modes: only where useful and maintainable.

## 2. Two change streams

### Mechanical

- paths and IDs;
- canonical/derived indexes;
- Reading Mode keys/directories;
- legacy files;
- front-matter syntax;
- publishing contracts;
- static tests;
- browser QA;
- CI triggers.

### Editorial

- prose;
- paragraph boundaries;
- headings;
- factual updates;
- sources;
- Structure annotation;
- English Mix / Español Mix quality.

Keep mechanical and editorial changes in separate PRs whenever possible.

## 3. Batch 0A — Baseline and repeatable audit

**Status: completed in the baseline infrastructure branch.**

Deliverables:

- `CURRENT_SPEC.md`
- `MIGRATION_INVENTORY.md`
- `MIGRATION_ROADMAP.md`
- `tools/audit-content.mjs`

No article body was rewritten.

## 4. Batch 0B — Specification and QA contract cleanup

**Status: completed in the same baseline infrastructure branch because the newly added audit tool triggers existing QA on `main`.**

The initial inventory found runtime/data already using `ja / en-mix / es-mix`, while documentation and QA still validated `es / spanish/` and full-Spanish content.

Resolved in Batch 0B:

- root `README.md` aligned to current Reading Modes;
- `english-mix/README.md` aligned to `es-mix`;
- obsolete `spanish/README.md` removed;
- new `spanish-mix/README.md` added;
- `tests/data-integrity.test.js` aligned to `en-mix / es-mix` and current directories;
- `tests/reader-versions.test.js` aligned to Español Mix and disclosure UI;
- `scripts/reading-versions-qa.cjs` changed to exercise the collapsed language disclosure, reading-position preservation and mixed Japanese/Spanish content;
- `.github/workflows/visual-qa.yml` now watches `spanish-mix/**` and runs the migration audit.

No historical essay body was changed as part of Batch 0B.

## 5. Batch 1 — Legacy canonical `*-mixed-en.md` cleanup

**Status: next.**
**Priority: P0**
**Migration class: A / Mechanical**

Confirmed candidates:

1. `confucius-learning-through-practice`
2. `hanfeizi-small-problems-early-prevention`
3. `mencius-source-is-not-conclusion`
4. `rice-theory-culture-interdependence`
5. `zhuangzi-accepting-unavoidable-conditions`

### Per-article procedure

1. Read the Japanese canonical file and its legacy `*-mixed-en.md` companion.
2. Verify IDs and logical pairing.
3. Check whether `english-mix/<canonical-id>.md` already exists.
4. Keep the best current mixed content; do not overwrite a newer derived mode blindly.
5. Ensure the derived file uses the canonical Japanese `id`.
6. Register it as `en-mix` in `data/versions-index.json`.
7. Remove the legacy companion path from `data/index.json`.
8. Delete the obsolete `essays/*-mixed-en.md` only after replacement validation.
9. Confirm one Library card per logical article.
10. Confirm reading state remains article-ID based.

### Done when

- no canonical index entry ends in `-mixed-en.md`;
- all five logical articles have one canonical Japanese entry;
- any retained English Mix is indexed exactly once as a derived mode;
- Language switching and reading state work normally.

## 6. Batch 2 — Full-library class-A compatibility pass

**Priority: P0/P2**
**Migration class: A**

Use:

```bash
node tools/audit-content.mjs --strict
```

Audit:

- duplicate canonical IDs/paths;
- missing canonical files;
- unindexed canonical Markdown;
- required front matter;
- invalid `created` dates;
- unsupported version keys;
- missing derived files;
- derived ID mismatches;
- unindexed derived Markdown;
- derived files accidentally registered as canonical;
- legacy Spanish dependencies;
- documentation/test/browser-QA/workflow drift.

Do not improve prose in this batch unless syntax makes an article unreadable.

### Done when

The strict audit has zero integrity errors and every remaining warning is consciously assigned to a later editorial batch or accepted as non-defect.

## 7. Batch 3 — P1 flagship conceptual essays

**Priority: P1**
**Migration class: B/C/D**
**Editorial batch size: 5–8 articles**

Candidate pool:

- `capability-output-asymmetry`
- `dynamic-multilayer-comparative-advantage`
- `executive-hands-on-as-exploration`
- `value-chain-competitive-advantage`
- `minto-pyramid-thinking-structure-ai`
- `goodharts-law-proxy-target-design`
- `learning-organization-senge-systems-thinking`
- `commentary-as-technology-of-noticing`
- `outsourcing-ai-results-without-capability` as the current Structure reference

Final selection must follow full-article reading, metadata/value, linkage and freshness risk rather than this candidate list alone.

### Per-article workflow

1. Read the full Japanese canonical article.
2. Assign B, C or D before editing.
3. Identify the central question/thesis.
4. Review title/subtitle/abstract.
5. Review sections and paragraph boundaries.
6. Add Structure only to argument-bearing paragraphs if C/D.
7. Preserve historical claims unless a correction is required.
8. Research current facts before changing time-sensitive content.
9. Review existing English Mix if present.
10. Add Español Mix only when intentionally selected.
11. Test normal Reader before Structure mode.

## 8. Batch 4 — Chinese classics / thought series

**Priority: P1/P2**
**Migration class: B; selective C/D**

Why grouped:

Many pieces share a reusable arc:

**source text → interpretation → modern application → implication/question**

Focus:

- Series metadata consistency;
- source/reference presentation;
- Japanese/English Mix H2 alignment;
- selective Writing Architecture;
- a small set of flagship Español Mix entries.

Do not make every entry a Conceptual Paper or annotate every sentence.

## 9. Batch 5 — Hello! Project history / person-history archive

**Priority: P1/P2**
**Migration class: A/B; selective C**

Focus:

- Series consistency;
- metadata consistency;
- canonical/English Mix alignment;
- source consistency;
- recent-history freshness;
- series-map/navigation coherence.

Structure is useful only where an interpretive argument exists; chronology alone does not require L1–L5 metadata.

Prefer series-level batches over arbitrary date order.

## 10. Batch 6 — Freshness-risk content

**Priority: P1/P2 depending on visibility**
**Migration class: B/D after research**

Examples:

- current sports teams/players;
- companies;
- market/financial topics;
- AI products/platforms;
- software behavior;
- health/medical content.

Before editorial modernization, research current facts and choose one of:

- update facts and `updated`;
- preserve a dated historical snapshot;
- add an update note;
- publish a newer related essay rather than silently replacing the old thesis.

Never rewrite `created` to make an old article look new.

## 11. Batch 7 — Reference / technical / game-guide content

**Priority: P2/P3**
**Migration class: A/B**

Focus on:

- retrievability;
- headings;
- examples/code blocks;
- links;
- concise abstracts;
- current technical correctness where relevant.

Argument Structure is normally unnecessary.

## 12. Batch 8 — Remaining P2/P3 archive

Only after P0 and P1 work has established stable conventions.

Group remaining articles by type or series, not arbitrary chronological order.

## 13. PR sizing

### Mechanical PRs

Can be larger when transformations are homogeneous, scriptable and easy to review.

### Editorial PRs

Default maximum: 5–10 articles.

Use smaller batches for long pieces, current-fact research, Structure work or Reading Mode rewriting.

## 14. Change reasons

Editorial PRs should classify substantive edits as:

- `SPEC`
- `BUG`
- `FACT`
- `STRUCTURE`
- `READABILITY`
- `LANGUAGE`

If a prose edit cannot be explained by one of these, reconsider whether a historical article should change.

## 15. Regression checklist

Per batch:

- Japanese canonical loads;
- one Library card per logical article;
- search finds the canonical article;
- Reading Mode badges are correct;
- Language disclosure shows only available modes;
- disclosure closes by selection, outside click and Escape;
- mode switching preserves logical article identity and a reasonable reading position;
- Note/reading state stays shared;
- normal Reader stays clean;
- Structure OFF/ON works for structured articles;
- mobile remains usable;
- no new console errors;
- migration audit reruns after changes.

## 16. Program metrics

Do not use “articles touched” as the primary metric.

### Compatibility Coverage

Canonical articles passing the current mechanical contract.

**Target: 100%.**

### P1 Modernization Coverage

Selected P1 articles reviewed to their intentional target class.

**Target: 100% of the selected P1 set.**

### Writing Architecture Coverage

Articles intentionally classified C/D that have meaningful Structure review.

**Target: 100% of C/D targets, not 100% of the Library.**

### Reading Mode Quality

Existing derived modes reviewed against current Mix contracts.

Absence of a derived mode is not failure.

## 17. Rollback rule

Never delete a legacy companion until:

- canonical identity is known;
- replacement derived content exists in the same PR or already on `main`;
- `data/versions-index.json` points to it;
- the Library no longer depends on the legacy path.

## 18. Immediate next action

Proceed to **Batch 1 — the five legacy canonical `*-mixed-en.md` companions**.

After Batch 1, run the full class-A compatibility pass before any broad editorial modernization.
