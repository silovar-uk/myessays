# MyEssays Migration Inventory

Baseline: 2026-08-30
Scope: repository-wide content migration planning
Status: Batch 0A + 0B baseline; article bodies are not modified in this phase

Exact repository counts should be regenerated with:

```bash
node tools/audit-content.mjs
```

This checked-in file records the migration model, confirmed exceptions and editorial grouping. It does not attempt to hand-maintain a row for every article.

## 1. Current logical article model

One logical article has:

- one Japanese canonical Markdown file under `essays/`;
- zero or one English Mix file under `english-mix/`;
- zero or one Español Mix file under `spanish-mix/`;
- optional Argument Structure metadata;
- shared article-ID-based reading state and Series relationships.

Supported Reading Mode keys:

- `ja`
- `en-mix`
- `es-mix`

A derived Reading Mode is not a separate canonical article and must not be registered independently in `data/index.json`.

## 2. Batch 0 contract drift found during inventory

The initial audit found seven P0 contract mismatches between the already-deployed Reading Mode implementation and repository documentation/QA.

### P0-01 — Root README used the old Spanish model

It described `Español`, `spanish/`, `es` and full-Spanish translation.

**Resolution:** updated to `Español Mix`, `spanish-mix/`, `es-mix` and current Reading Mode rules.

### P0-02 — `spanish/README.md` was an obsolete active publishing contract

It explicitly instructed full-Spanish translation.

**Resolution:** removed. Current contract now lives in `spanish-mix/README.md`.

### P0-03 — `english-mix/README.md` still referred to `es`

**Resolution:** updated to `es-mix` / `spanish-mix/`.

### P0-04 — `tests/data-integrity.test.js` validated the old derived directories/keys

It accepted `es` and enumerated `spanish/`.

**Resolution:** updated to `en-mix` / `es-mix`, `english-mix/` / `spanish-mix/`, with path and canonical-ID checks.

### P0-05 — `tests/reader-versions.test.js` validated the deleted full-Spanish sample

**Resolution:** updated to Español Mix and the collapsed disclosure contract.

### P0-06 — `scripts/reading-versions-qa.cjs` drove the old direct-button/full-Spanish behavior

**Resolution:** updated to open/close the disclosure UI, switch `ja → en-mix → es-mix`, verify mixed Japanese/Spanish content, preserve reading position and keep article-ID-based state.

### P0-07 — `.github/workflows/visual-qa.yml` did not watch `spanish-mix/**`

**Resolution:** current Español Mix paths are now included and the migration audit is part of the QA workflow.

These seven items are retained here as migration history because they explain why “runtime works” is not enough; docs, tests and workflow triggers must share the same contract.

## 3. Remaining confirmed P0 content-model exceptions

Five English-mixed companion files are still registered as canonical essays under `essays/`:

1. `essays/2026-08-26-confucius-learning-through-practice-mixed-en.md`
2. `essays/2026-08-26-hanfeizi-small-problems-early-prevention-mixed-en.md`
3. `essays/2026-08-27-mencius-source-is-not-conclusion-mixed-en.md`
4. `essays/2026-08-27-rice-theory-culture-interdependence-mixed-en.md`
5. `essays/2026-08-27-zhuangzi-accepting-unavoidable-conditions-mixed-en.md`

This is the next mechanical migration batch.

### Per-pair migration rule

For each Japanese / `*-mixed-en.md` pair:

1. Read both files.
2. Verify IDs and logical identity.
3. Check whether `english-mix/<canonical-id>.md` already exists.
4. Keep the best current mixed content; do not overwrite a newer derived version blindly.
5. Ensure the English Mix file uses the Japanese canonical `id`.
6. Register `en-mix` in `data/versions-index.json`.
7. Remove the mixed companion from `data/index.json`.
8. Delete the obsolete `essays/*-mixed-en.md` only after replacement validation.
9. Preserve the Japanese canonical article and its historical `created` date.
10. Confirm the Library shows one logical article, not two.

## 4. Writing Architecture baseline

Argument Structure is optional.

At least one real article is intentionally structured as the current pilot/reference:

- `outsourcing-ai-results-without-capability`

The audit script counts all current Structure metadata when run. Structure absence is not a compatibility defect.

## 5. Migration classes

### A — Compatibility

Use when the main need is current-contract compliance.

Typical changes:

- index/path correction;
- front-matter syntax;
- legacy Reading Mode cleanup;
- broken local Markdown/path fixes.

### B — Modernize

A + editorial cleanup:

- title/subtitle/abstract;
- heading hierarchy;
- paragraph boundaries;
- clearer introduction/conclusion;
- source/reference presentation.

### C — Writing Architecture

B + meaningful Conceptual Level / Rhetorical Role annotation for argument-bearing paragraphs.

Do not add Structure merely to create a visually neat profile.

### D — Flagship

C + deeper source/fact review and Reading Mode quality where useful.

Not every article should reach D.

## 6. Priority classes

### P0

Current-spec/integrity conflict:

- derived article registered as canonical;
- unsupported version key/path;
- duplicate or missing ID/path;
- stale publishing/test/QA contract;
- current derived directory missing from CI triggers.

### P1

High-value / representative content:

- major Series entrances;
- high favorite/grow candidates;
- frequently linked pieces;
- articles selected to demonstrate current MyEssays quality.

### P2

Normal modernization candidates.

### P3

Archive/reference content that is already compatible and does not justify deep editorial work.

## 7. Editorial migration groups

### Group A — Legacy-mode cleanup

The five remaining canonical `*-mixed-en.md` companions.

**Class:** A
**Priority:** P0

### Group B — Conceptual / strategy / work-thinking essays

Strong B/C/D candidates because their value depends on claim–evidence–analysis movement.

Examples:

- `capability-output-asymmetry`
- `dynamic-multilayer-comparative-advantage`
- `executive-hands-on-as-exploration`
- `value-chain-competitive-advantage`
- `minto-pyramid-thinking-structure-ai`
- `goodharts-law-proxy-target-design`
- `learning-organization-senge-systems-thinking`
- `commentary-as-technology-of-noticing`
- `outsourcing-ai-results-without-capability`

### Group C — Chinese classics / thought series

Good candidates for series-level B migration and selective C/D because many follow:

source text → interpretation → modern application → implication/question.

Español Mix should remain selective rather than mandatory.

### Group D — Hello! Project history / person history

Primary needs:

- Series and metadata consistency;
- canonical/English Mix alignment;
- source consistency;
- recent-history freshness review;
- navigation coherence.

Do not add sentence-level Structure to every chronological paragraph.

### Group E — Freshness-risk content

Current sports, companies, markets, AI products, software behavior and health/medical pieces require research before B/C/D modernization.

Decide whether to update facts, preserve a dated snapshot, add an update note or create a newer related article.

### Group F — Reference / how-to / game guides

Usually A/B. Their value is often practical clarity and retrievability rather than an academic argument arc.

## 8. Audit tool coverage

`tools/audit-content.mjs` checks:

- canonical path and ID;
- title / dates / type / status / Series;
- preferred metadata gaps;
- body size and heading count;
- reference-section presence;
- Structure metadata count;
- English Mix / Español Mix registration;
- legacy `*-mixed-en.md` status;
- duplicate IDs;
- missing paths;
- unsupported version keys;
- derived ID mismatches;
- unindexed derived Markdown;
- known documentation/test/browser-QA/workflow drift;
- conservative freshness-review candidates.

Commands:

```bash
node tools/audit-content.mjs
node tools/audit-content.mjs --json
node tools/audit-content.mjs --write
node tools/audit-content.mjs --strict
```

`--strict` fails only on integrity errors. Editorial warnings do not become automated pass/fail judgments.

## 9. What is not a defect by itself

Do not mark an article broken merely because it has:

- no English Mix;
- no Español Mix;
- no Structure metadata.

These are optional layers.

## 10. Next migration work

With the specification/QA contract aligned, the next batch is:

**Batch 1 — migrate the five canonical `*-mixed-en.md` companions into the current `en-mix` derived model.**

After Batch 1:

1. rerun the strict audit;
2. perform a full-library class-A compatibility pass;
3. only then start P1 editorial modernization in small 5–10 article batches.

The migration program should not begin broad rewrites until the canonical/derived model is mechanically clean.
