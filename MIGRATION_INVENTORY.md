# MyEssays Migration Inventory

Baseline: 2026-08-30
Scope: repository-wide content migration planning
Status: curated baseline; article bodies are not modified in this phase

This file records confirmed migration findings and the classification framework. Exact repository counts should be regenerated with `node tools/audit-content.mjs` instead of being maintained manually here.

## 1. What is being migrated

The unit of migration is a logical article, not an individual Markdown file.

A logical article may have:

- one Japanese canonical Markdown file;
- zero or one English Mix file;
- zero or one Español Mix file;
- optional Argument Structure metadata;
- Series relationships and reader state keyed by the canonical article ID.

The goal is not to make every logical article have every optional layer. The first goal is compatibility with the current content contract in `CURRENT_SPEC.md`.

## 2. Confirmed current model

Current supported Reading Modes:

- `ja`
- `en-mix`
- `es-mix`

Current derived directories:

- `english-mix/`
- `spanish-mix/`

Current canonical directory:

- `essays/`

Current Español Mix content exists under `spanish-mix/` and is registered with `es-mix` in `data/versions-index.json`.

## 3. Confirmed P0 specification drift

These are not article-writing problems. They are contract/infrastructure drift that can cause future content to be created incorrectly or allow current regressions to pass unnoticed.

### P0-01 — Root README documents the old Spanish model

`README.md` still describes:

- `Español` as an independent version;
- `spanish/` as the companion directory;
- `es` as the version key;
- a full-Spanish translation workflow.

Current runtime/data behavior is `Español Mix` / `spanish-mix/` / `es-mix`.

**Migration type:** Mechanical / Documentation

### P0-02 — Legacy Spanish publishing contract remains

`spanish/README.md` explicitly defines a full-Spanish publishing contract and instructs contributors to create `spanish/<essay-id>.md` and register `es`.

No current full-Spanish article remains there, but the contract itself is a high-risk source of regression.

**Migration type:** Mechanical / Documentation

### P0-03 — English Mix publishing contract contains an old Spanish reference

`english-mix/README.md` is broadly compatible with the current English Mix model but still says to add `es` when a Spanish version exists.

**Migration type:** Mechanical / Documentation

### P0-04 — Data-integrity test still enforces the old Spanish model

`tests/data-integrity.test.js` currently:

- accepts `en-mix` and `es` rather than `en-mix` and `es-mix`;
- enumerates `spanish/` rather than `spanish-mix/` when checking derived Markdown.

This means the test contract and production contract disagree.

**Migration type:** Mechanical / Test contract

### P0-05 — Reader Version test still validates full Spanish

`tests/reader-versions.test.js` still:

- accepts `es`;
- expects `spanish/<id>.md`;
- checks old full-Spanish title/section strings.

**Migration type:** Mechanical / Test contract

### P0-06 — Browser Reading Mode QA still drives the legacy UI/content model

`scripts/reading-versions-qa.cjs` still:

- expects `ja`, `en-mix`, `es`;
- clicks version buttons directly without opening the new disclosure UI;
- checks full-Spanish strings such as the old Spanish title/section;
- checks localStorage using the legacy `:es` suffix pattern.

The browser QA therefore does not currently verify the production Español Mix disclosure behavior.

**Migration type:** Mechanical / Browser QA

### P0-07 — Visual QA workflow does not watch current Español Mix paths

`.github/workflows/visual-qa.yml` watches `spanish/**` but not `spanish-mix/**`.

A change limited to current Español Mix content can therefore miss the automatic QA trigger.

**Migration type:** Mechanical / CI trigger

## 4. Confirmed P0 legacy canonical Reading Modes

Five English-mixed companion files are still registered as canonical essays in `data/index.json` under `essays/`:

1. `essays/2026-08-26-confucius-learning-through-practice-mixed-en.md`
2. `essays/2026-08-26-hanfeizi-small-problems-early-prevention-mixed-en.md`
3. `essays/2026-08-27-mencius-source-is-not-conclusion-mixed-en.md`
4. `essays/2026-08-27-rice-theory-culture-interdependence-mixed-en.md`
5. `essays/2026-08-27-zhuangzi-accepting-unavoidable-conditions-mixed-en.md`

This pattern predates the current derived-version model.

### Required migration decision for each pair

For every `*-mixed-en.md` pair:

1. Read the Japanese canonical file and the mixed-English companion.
2. Confirm whether both currently declare separate IDs or share a logical identity.
3. Check whether an `english-mix/<canonical-id>.md` file already exists.
4. If no current derived file exists, move/recreate the mixed content under `english-mix/<canonical-id>.md` using the canonical ID.
5. Register it as `en-mix` in `data/versions-index.json`.
6. Remove the mixed companion path from `data/index.json`.
7. Remove the obsolete `essays/*-mixed-en.md` only after the derived version is verified.
8. Preserve the Japanese canonical article and its historical `created` date.

Do not perform this as blind filename replacement; the IDs and content must be checked article by article.

## 5. Current Writing Architecture baseline

Argument Structure is now part of the reader but remains optional.

At least one real article has been intentionally structured as a pilot:

- `outsourcing-ai-results-without-capability`

The migration audit script counts any canonical article containing current Structure metadata. That generated count should be treated as authoritative when the script is run.

Structure absence is not a P0 problem.

## 6. Article groups for migration

The groups below are editorial planning groups, not hard taxonomies.

### Group A — Legacy-mode cleanup

Includes the five confirmed `*-mixed-en.md` canonical companions.

**Default class:** A
**Priority:** P0
**Why:** they violate the current canonical/derived model.

### Group B — Conceptual / strategy / work-thinking essays

Strong candidates for later Writing Architecture because their value depends on explicit claim–evidence–analysis movement.

Candidate examples:

- `capability-output-asymmetry`
- `dynamic-multilayer-comparative-advantage`
- `executive-hands-on-as-exploration`
- `value-chain-competitive-advantage`
- `minto-pyramid-thinking-structure-ai`
- `goodharts-law-proxy-target-design`
- `outsourcing-ai-results-without-capability`
- `learning-organization-senge-systems-thinking`
- `commentary-as-technology-of-noticing`

**Default class:** B or C
**Priority:** P1/P2 based on value, grow/favorite, linkage and freshness risk

### Group C — Chinese classics / thought series

Many of these already work well as short essays and several have English Mix companions. They are suitable for selective Structure migration because they often move from source text → interpretation → modern application.

Candidate examples include Confucius, Mencius, Laozi, Zhuangzi, Xunzi, Hanfeizi, Mozi and Sunzi articles.

**Default class:** B
**Potential class:** C for argument-rich entries, D for selected series entrances
**Español Mix:** optional, prioritizing flagship/repeated-reading pieces rather than all entries

### Group D — Hello! Project history / person history

This is a large coherent archive with significant English Mix coverage.

Primary migration needs are likely:

- Series consistency;
- canonical/derived alignment;
- metadata consistency;
- source/freshness review for recent-history claims;
- section alignment across Reading Modes.

Do not automatically add sentence-level Structure to every history article.

**Default class:** A/B
**Potential class:** C only where interpretation/argument is a major part of the article

### Group E — Current sports / companies / markets / AI / software / health

These articles can become stale faster than conceptual or historical pieces.

Examples include current-team/players, AI products, software/platform behavior, corporate/current-market analysis and medical/current-health topics.

**Default class:** A first
**Freshness:** review before B/C/D editorial modernization

Do not silently update historical context. Decide whether to update facts or explicitly preserve the article's time frame.

### Group F — Reference / how-to / game guides

Examples include technical explainers, transport guides, language mechanics and game-strategy pieces.

Their value may come from retrievability and practical clarity rather than an academic argument arc.

**Default class:** A/B
**Structure:** normally unnecessary unless a particular section contains a meaningful argument

## 7. Migration class rules

### A — Compatibility

Use when the article mainly needs to obey current data/runtime contracts.

Typical changes:

- index/path correction;
- front-matter syntax correction;
- legacy version cleanup;
- broken Markdown/local path correction.

### B — Modernize

Use when a valuable article benefits from current editorial conventions.

Typical changes:

- title/subtitle/abstract cleanup;
- heading hierarchy;
- paragraph boundaries;
- clearer introduction/conclusion;
- source/reference presentation.

### C — Writing Architecture

Use when the article contains meaningful argument movement that readers/writers benefit from seeing.

Typical changes:

- paragraph regrouping where needed;
- Conceptual Level;
- Rhetorical Role;
- Paragraph Profiles;
- Structure QA in normal and Structure modes.

### D — Flagship

Reserved for representative articles that justify deeper maintenance.

Typical changes:

- B + C;
- fresh source/fact review where relevant;
- English Mix review;
- Español Mix creation/review where useful;
- section alignment across Reading Modes.

## 8. Priority rules

### P0

Current-spec or integrity conflicts:

- derived article registered as canonical;
- unsupported version key/path;
- duplicate ID/path;
- missing file;
- stale publishing contract that can recreate invalid content;
- test/QA contract that validates obsolete Reading Mode behavior.

### P1

High-value or representative content:

- major Series entrances;
- strong favorite/grow candidates;
- frequently linked articles;
- articles chosen as current MyEssays examples.

### P2

Normal modernization candidates.

### P3

Archive/reference articles that already behave correctly and do not justify major editorial work.

## 9. Inventory fields generated by the audit tool

`tools/audit-content.mjs` inspects:

- canonical path and ID;
- title / dates / type / status / Series;
- preferred metadata gaps;
- body character count;
- heading count;
- reference-section presence;
- Structure metadata count;
- English Mix / Español Mix registration;
- legacy `*-mixed-en.md` status;
- duplicate IDs;
- missing paths;
- unsupported version keys;
- derived ID mismatches;
- unindexed derived Markdown;
- known documentation/test/browser-QA/workflow specification drift;
- a conservative freshness-review flag.

Run:

```bash
node tools/audit-content.mjs
```

JSON output:

```bash
node tools/audit-content.mjs --json
```

Write generated artifacts:

```bash
node tools/audit-content.mjs --write
```

Strict compatibility mode:

```bash
node tools/audit-content.mjs --strict
```

`--strict` exits non-zero only for integrity errors. Editorial warnings do not become automatic failures.

## 10. What this baseline does not claim

This checked-in inventory intentionally does not claim that every article has already been manually read or classified.

It also does not treat:

- no English Mix;
- no Español Mix;
- no Structure metadata

as defects by themselves.

The audit tool provides reproducible mechanical inventory. Human editorial classification comes after that inventory, in batches.

## 11. Immediate next migration work

The next work should be Batch 0B, not article modernization:

1. align README and publishing contracts with `CURRENT_SPEC.md`;
2. remove or replace the legacy full-Spanish contract;
3. update `tests/data-integrity.test.js` and `tests/reader-versions.test.js` for `es-mix` / `spanish-mix/`;
4. update `scripts/reading-versions-qa.cjs` for the disclosure UI and Español Mix content;
5. update `.github/workflows/visual-qa.yml` to watch `spanish-mix/**` rather than the obsolete active path;
6. run the audit and existing QA again;
7. then migrate the five P0 canonical `*-mixed-en.md` companions in a separate mechanical PR.

Only after those P0 contracts are clean should broad article-by-article modernization begin.
