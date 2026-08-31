# MyEssays Batch 3 Editorial / Writing Architecture Conventions

Established: 2026-08-31
Finalized after all seven Batch 3 articles.

Validated on:

1. `capability-output-asymmetry`
2. `dynamic-multilayer-comparative-advantage`
3. `executive-hands-on-as-exploration`
4. `learning-organization-senge-systems-thinking`
5. `minto-pyramid-thinking-structure-ai`
6. `goodharts-law-proxy-target-design`
7. `commentary-as-technology-of-noticing`

This document records the reusable editorial and publishing method learned across Batch 3. It is **not** a prose template and does not prescribe one fixed Argument Structure profile.

## 1. Research before prose

For D — Flagship and evidence-heavy C articles, use this order:

**Research → evidence boundary → search for counterevidence → editorial diagnosis → terminology/theory check → argument skeleton → prose edit → Structure annotation → critical review → browser QA → merge**

Do not begin with sentence polishing when the central claim may be wrong.

## 2. Separate evidence from editorial extension

Classify important claims as:

- **VERIFIED** — source directly supports the formulation;
- **NEEDS QUALIFICATION** — direction is supported but scope or causality is too strong;
- **NEEDS CORRECTION** — factual or conceptual relationship is wrong;
- **ORIGINAL MODEL / EXTENSION** — article-level synthesis, heuristic, or interpretation.

A useful article can contain original models, but it must not disguise them as established theory.

## 3. Strong counterevidence belongs in the architecture

If evidence only bounds a claim, a limitations section may be enough.

If evidence changes the central causal or classificatory relationship, rebuild the thesis itself.

Batch 3 examples:

- `hands-on = exploration` did not survive; it became a bounded `hands-on probe` heuristic.
- Goodhart was narrowed from “a metric breaks the instant it becomes a target” to proxy integrity under optimization pressure.
- commentary was narrowed from “commentary increases noticing” to an attentional-scaffolding hypothesis grounded in adjacent mechanisms.
- Minto was narrowed from “structured thinking is thinking itself” to a working structure for externalizing and testing thought.

## 4. Operationalize latent variables

If the article says a variable is unobservable, do not place an omniscient version of that variable on a model axis as if it were known.

Prefer:

- observable evidence;
- explicit estimates;
- operational criteria;
- provisional inference states.

Likewise, do not present an additive-looking formula when its components have incompatible units or have not been empirically estimated together.

## 5. Borrowed theories and terminology need boundaries

Whenever a theory, label, or analogy is borrowed, state:

1. what structure or mechanism is actually reused;
2. what scope is **not** being claimed;
3. whether a nearby established term already means something else.

A compelling new label should be dropped if it collides with established technical terminology.

## 6. Original modifiers must earn explanatory value

Words such as `dynamic`, `multilayer`, `systemic`, `adaptive`, or `strategic` must answer:

- what changes;
- at what layer or time scale;
- what relationship between layers matters;
- what the base model cannot explain without the modifier;
- whether the modifier collides with a technical term.

## 7. Separate exploration, organization, and explanation

Do not force every reasoning task into the same communication shape.

- **Exploration** finds variables and questions.
- **Organization** proposes relationships and higher-level meanings.
- **Explanation** chooses an order a reader can follow.

A clean pyramid or taxonomy can improve organization without proving that the problem definition is correct.

## 8. Practice evidence is not causal evidence

Long professional adoption can be strong evidence of practical usefulness without establishing a causal effect in controlled studies.

Do not turn popularity, prestige, or historical influence into empirical proof.

This rule mattered especially for Senge and Minto.

## 9. Behavior labels are not theoretical mechanisms

Labels such as `hands-on`, `prototype`, `AI use`, `experimentation`, or `commentary` are coarse descriptions of behavior.

Classify the mechanism by function, search pattern, evidence, and decision consequence rather than by the surface label.

## 10. Preserve actor neutrality until evidence supports specificity

If direct participation matters, do not automatically conclude that the CEO or highest-status manager should do the task.

Ask where decision relevance and hard-to-transfer information actually sit, then choose the least-cost participation form that resolves the uncertainty.

## 11. Separate accumulated capability from current task ownership

Past direct experience may improve judgment while continued direct execution may create new costs or narrow search.

Do not infer:

`experience built capability` → `the same person should permanently own execution`.

## 12. Stabilize Japanese canonical before Structure metadata

Settle these first:

- thesis;
- section order;
- evidence boundaries;
- counterarguments;
- paragraph boundaries.

Then annotate. Structure should observe the argument, not drive unfinished prose.

## 13. Structure is selective, not coverage-driven

Annotate argument-bearing paragraphs, not every sentence.

Current regression fixtures:

| Article | Structured paragraphs | Structured sentences |
| --- | ---: | ---: |
| `capability-output-asymmetry` | 8 | 32 |
| `dynamic-multilayer-comparative-advantage` | 9 | 36 |
| `executive-hands-on-as-exploration` | 11 | 46 |
| `learning-organization-senge-systems-thinking` | 12 | 48 |
| `minto-pyramid-thinking-structure-ai` | 9 | 35 |
| `goodharts-law-proxy-target-design` | 10 | 40 |
| `commentary-as-technology-of-noticing` | 10 | 40 |

These are regression fixtures, **not editorial targets**.

## 14. Conceptual Level is not a quality score

`L5` is not better than `L1`.

Do not rewrite prose merely to produce an aesthetically pleasing Uneven U. The Structure layer should expose conceptual movement, not manufacture it.

## 15. Verify Structure fixtures from compiled output

Manual counts are not authoritative.

When creating or changing a fixture, verify paragraph profiles and sentence counts from audit/browser compilation before freezing the regression contract.

QA failures must be classified before any fix:

- runtime / UX bug;
- test-contract error;
- fixture error;
- content-integrity error.

Never weaken an assertion merely to make CI green.

## 16. Reading Mode is a synchronization contract

Every materially edited canonical article must explicitly decide the state of its derived modes.

Use:

- **KEEP** — an existing derived mode remains semantically aligned;
- **UPDATE** — an existing derived mode would preserve superseded claims and must be repaired in the same editorial closeout;
- **RETIRE** — an existing derived mode should no longer be published;
- **DEFER** — only when no derived mode currently exists and no new one is needed in this pass.

**DEFER must not be used when a derived mode already exists.**

Batch 3 closeout required `UPDATE` for:

- `minto-pyramid-thinking-structure-ai`;
- `goodharts-law-proxy-target-design`;
- `commentary-as-technology-of-noticing`.

The English Mix versions were synchronized to the revised canonical thesis and evidence boundaries.

## 17. Preserve historical identity

- Never rewrite `created` because an article was modernized.
- Change `updated` only when the canonical materially changes.
- Preserve distinctive metaphors and intellectual history unless fact or conceptual accuracy requires correction.

Modernization must not turn the archive into generic new summaries.

## 18. One editorial article, one principal PR

Prefer:

**one article → research → edit → diff audit → QA → merge**.

Reusable runtime/test fixes should use focused PRs so article history remains reviewable.

## 19. Publishing is a transaction, not a sequence of independent commits

For a new logical article, the publish unit is:

1. canonical Markdown under `essays/`;
2. canonical registration in `data/index.json`;
3. any derived Markdown under `english-mix/` or `spanish-mix/`;
4. derived registration in `data/versions-index.json`.

A new file must not be considered “published” while its registration is still missing.

This prevents a recurring failure mode where GitHub Pages can deploy a file while integrity tests fail because indexes lag behind.

## 20. Unindexed Markdown is an integrity error

`tools/audit-content.mjs --strict` must fail when:

- a canonical Markdown file under `essays/` is not in `data/index.json`;
- an English Mix / Español Mix file is not in `data/versions-index.json`.

These conditions are not editorial warnings. Runtime navigation and data contracts depend on the indexes, so they belong to the integrity layer.

## 21. Change reasons stay explicit

Substantive changes should be explainable as one or more of:

- `FACT`
- `STRUCTURE`
- `READABILITY`
- `LANGUAGE`
- `SPEC`
- `BUG`

Avoid edits justified only by novelty or tone polishing.

## 22. Definition of Done for an editorial article

Before marking an article complete, confirm:

- important sources rechecked;
- counterevidence actively searched for;
- direct evidence and article extension separated;
- terminology/theory boundaries reviewed;
- central thesis preserved or intentionally corrected;
- limitations integrated at the right architectural level;
- `created` preserved and `updated` intentional;
- Japanese canonical stabilized before Structure annotation;
- selective Structure compiled and fixture verified where applicable;
- existing derived modes classified as KEEP / UPDATE / RETIRE, or DEFER only when none exist;
- canonical and derived indexes remain exact;
- strict migration audit passes;
- static tests pass;
- Reading Mode QA passes;
- Argument Structure QA passes for all registered fixtures;
- Page Reader QA passes;
- desktop/mobile Visual QA passes;
- no horizontal overflow, console errors, or page errors;
- Pages deployment succeeds after merge.

Batch 3 is the point at which these rules stop being experiments and become the default migration contract for later batches.
