# MyEssays Current Content Specification

Updated: 2026-08-30
Status: migration baseline

This document defines the current content contract for MyEssays. It exists so older articles can be migrated against one explicit target instead of against whichever historical README or directory convention they were created under.

## 1. Source of truth

For content migration, use the following precedence when documents disagree:

1. Current runtime behavior and current data contracts (`reader-versions.js`, `library-versions.js`, `data/versions-index.json`, `index.html`).
2. `essay-template.md` for the preferred shape of new canonical essays.
3. This `CURRENT_SPEC.md` for migration rules and terminology.
4. Older README / implementation-plan text only as historical context.

Known specification drift is listed below. Do not copy an old convention merely because it still exists in the repository.

## 2. Canonical article model

The Japanese article is the canonical article.

- Canonical Markdown lives under `essays/`.
- Canonical article paths are registered in `data/index.json`.
- One logical article has one canonical `id`.
- Derived Reading Modes reuse the same canonical `id`.
- Reading state, favorites, Series state, After Reading data and browser-local notes remain article-ID based.

A Reading Mode must not be registered as a second canonical article in `data/index.json`.

## 3. Reading Modes

Supported modes are exactly:

- `ja` — 日本語
- `en-mix` — English Mix
- `es-mix` — Español Mix

Current directories:

- Japanese canonical: `essays/`
- English Mix: `english-mix/`
- Español Mix: `spanish-mix/`

Legacy conventions:

- `es`
- `spanish/`
- `*-mixed-en.md` stored as a canonical essay under `essays/`

These are migration targets, not valid conventions for new content.

## 4. Mix means Reading Mode, not full translation

English Mix and Español Mix are derived reading experiences for a Japanese-based reader. They are not independent translated editions.

### English Mix

- Keep Japanese as the comprehension base.
- Mix natural English at sentence or phrase level.
- Avoid long uninterrupted English blocks when they make the Japanese source difficult to follow.
- Do not duplicate every Japanese sentence with a full English translation.

### Español Mix

- Keep Japanese as the comprehension base.
- Mix natural Spanish in context.
- A rough editorial guide is Japanese 50–70% and Spanish 30–50%, but natural semantic units matter more than a mechanical ratio.
- Do not publish a full-Spanish article as `es-mix`.
- Do not duplicate every Japanese sentence with a full Spanish translation.

For both modes, preserve claims, numbers, examples, source links, quotations and the broad section order of the Japanese canonical article unless there is a specific editorial reason not to.

## 5. Section alignment

Reading Mode switching attempts to preserve the reader's location. Therefore Japanese, English Mix and Español Mix should keep broadly corresponding H2-level sections where practical.

This is not a requirement to make the texts line-for-line identical. Semantic structure matters more than exact sentence count.

## 6. Front matter

Minimum runtime-critical fields for canonical articles:

- `id`
- `title`
- `created` in `YYYY-MM-DD`

Preferred current article metadata follows `essay-template.md` and normally includes:

- `id`
- `title`
- `subtitle`
- `created`
- `updated`
- `type`
- `status`
- `tags`
- `keywords`
- `favorite`
- `grow`
- `abstract`
- optional `series`
- optional `seriesOrder`

Migration rules:

- Never rewrite `created` merely because an old article is modernized.
- Change `updated` when the article content or article-level editorial structure is materially changed.
- Mechanical path/index fixes alone do not require rewriting the historical meaning of the article.
- Do not invent missing metadata when it cannot be inferred safely. Flag it for review.

## 7. Article types are not one template

`Conceptual Paper`, `Essay`, `Review`, technical/reference pieces, game guides and archive pieces do not need identical heading structures.

The current academic-style template is a useful default for argument-heavy writing, not a mandatory mold for every article.

Do not force every article into:

1. 問題設定
2. 研究上の位置づけと方法
3. 本論
4. 反論・限界
5. 結論

Use the article's purpose and type.

## 8. Writing Architecture / Argument Structure

Structure metadata is optional.

Conceptual Level:

- `L1` Evidence / Concrete
- `L2` Description
- `L3` Analysis / Synthesis
- `L4` Local Claim
- `L5` Larger Claim / Implication

The number is conceptual altitude, not quality. L5 is not “better” than L1.

Supported Rhetorical Roles:

- `claim`
- `evidence`
- `description`
- `analysis`
- `counterargument`
- `qualification`
- `bridge`
- `implication`

Metadata syntax:

```markdown
<!-- level:4 role:claim -->
この段落で扱う局所的な主張。
<!-- level:1 role:evidence -->
その主張を支える具体例やデータ。
<!-- level:3 role:analysis -->
具体例が何を意味するかを解釈する文。
<!-- level:5 role:implication -->
より大きな議論へ接続する含意。
```

Within one structured paragraph, annotated sentences are kept together without blank lines. Structure annotations must not be visible in normal reading, must not affect search/reading-time metrics, and must not become a scoring system.

Do not add Structure simply to produce a pretty `4 → 3 → 1 → 3 → 5` shape. Use it only where argument movement is meaningful.

## 9. Paragraph migration rule

Many older Web-essay articles use one sentence per paragraph. When adding Structure, do not merely attach one level to each one-sentence paragraph.

First decide whether several adjacent sentences actually form one argumentative paragraph. If so, paragraph boundaries may be regrouped while preserving the original wording. Distinguish boundary-only changes from prose edits in the PR description.

## 10. Mechanical vs Editorial migration

Mechanical migration includes:

- path moves
- index fixes
- version-key fixes
- duplicate-ID fixes
- front-matter syntax fixes
- legacy Reading Mode cleanup
- broken local-path fixes

Editorial migration includes:

- paragraph regrouping
- title/subtitle/abstract improvement
- heading restructuring
- argument clarification
- factual updating
- Structure annotation
- Reading Mode rewriting

Do not hide editorial changes inside a large mechanical PR.

## 11. Historical integrity

Past essays are also a record of past thinking.

Do not replace an older claim merely because a newer position is preferred now. Large changes in thesis should normally become an update note, a new version, or a related essay rather than silent historical rewriting.

For time-sensitive facts, preserve the original `created` date and either:

- update the relevant facts and `updated` date, or
- make the historical time frame explicit when that better preserves the article's meaning.

## 12. Migration classes

- **A — Compatibility:** renders, indexes and behaves correctly under current contracts.
- **B — Modernize:** A + metadata, headings and paragraph/readability cleanup.
- **C — Writing Architecture:** B + meaningful Structure metadata on suitable argument paragraphs.
- **D — Flagship:** C + source/fact review and Reading Mode quality where useful.

Not every article should reach D.

## 13. Priorities

- **P0:** broken/current-spec conflict, duplicate/invalid index behavior, legacy contract that can cause new bad content.
- **P1:** flagship/series-entry/high-value content.
- **P2:** ordinary modernization candidates.
- **P3:** archive/reference content that is already compatible and needs little editorial work.

## 14. Known specification drift at baseline

Confirmed on 2026-08-30:

- Root `README.md` still documents old `Español`, `spanish/` and `es` conventions.
- `spanish/README.md` still describes a full-Spanish translation contract.
- `english-mix/README.md` still refers to adding `es` when a Spanish version exists.
- `tests/data-integrity.test.js` still accepts `es` and enumerates `spanish/` rather than `es-mix` / `spanish-mix/`.
- Five legacy `*-mixed-en.md` files are still registered in `data/index.json` as canonical essays.

These are Batch 0 / Batch 1 migration work. Their presence does not redefine the current contract.

## 15. Reject conditions

Stop and re-review if a migration:

- makes every article use the same essay template;
- forces Structure on every article;
- creates Español Mix for every article by default;
- turns Mix modes into full translations;
- rewrites `created` dates;
- silently changes historical theses;
- mixes large mechanical and editorial changes in one unreviewable diff;
- reintroduces `es`, `spanish/` or canonical `*-mixed-en.md` as current conventions;
- changes normal Reader output for articles without Structure metadata.

## 16. Definition of compatibility

At minimum, a compatible article set has:

- unique canonical article IDs;
- existing canonical paths in `data/index.json`;
- no derived Reading Mode registered as canonical;
- only supported version keys in `data/versions-index.json`;
- every version path exists and declares the canonical ID;
- no missing derived file outside `data/versions-index.json`;
- no legacy `spanish/` dependency;
- normal Japanese Reader behavior remains intact.

This is the baseline that all articles should eventually satisfy before optional modernization layers are expanded.