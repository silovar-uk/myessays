# MyEssays Batch 3 Editorial / Writing Architecture Conventions

Established: 2026-08-31
Validated on:

1. `capability-output-asymmetry`
2. `dynamic-multilayer-comparative-advantage`

This document records the **reusable editorial method** learned across Batch 3 flagship migrations. It is not a prose template and does not prescribe one fixed Argument Structure profile.

## 1. Research before prose

For D — Flagship articles, do not start by rewriting sentences.

Use this order:

**Research → evidence boundary → editorial diagnosis → argument skeleton → prose edit → Structure annotation → critical review → browser QA → merge**

Primary papers, official publications, and recent high-quality research should be preferred for claims that carry the article's argument.

**Status after article 2: KEEP.** The same order worked across psychology/evaluation and economics/AI-allocation topics without forcing the same prose shape.

## 2. Separate evidence from editorial extension

Every important external claim should be understood as one of:

- **VERIFIED** — the cited source directly supports the current formulation;
- **NEEDS QUALIFICATION** — the direction is supported but the article overstates scope or causality;
- **NEEDS CORRECTION** — the factual or conceptual relationship is wrong;
- **ORIGINAL MODEL / EXTENSION** — the article connects existing findings into a new interpretation or model.

When an article applies a finding outside the source's original domain, say so in the prose when that boundary matters.

Examples across the first two flagships:

- false consensus / egocentric anchoring → workplace ability judgment;
- Dynamic Assessment → management practice;
- human evaluation ↔ AI evaluation analogy;
- learning-by-doing evidence → long-run automation implications;
- comparative-advantage/task research → DMCA diagnostic layers;
- switching-cost research → reallocation-threshold heuristic.

**Status after article 2: KEEP.** This remains the highest-value editorial rule.

## 3. Do not put unknowable truth on a model axis without operationalizing it

The original Capability–Output Inference Matrix used a latent `ability yes / no` axis while the article simultaneously argued that ability is not directly observable.

The revised model instead used initial observed output and provisional inference from richer subsequent evidence.

General rule:

> If a conceptual model claims that a variable is latent or unobservable, do not casually use an omniscient version of that same variable as if it were directly known.

Prefer observable evidence, explicitly estimated states, or clearly defined operational criteria.

**Status after article 2: KEEP.** Article 2 added a related lesson: a diagnostic expression whose components have different units must not be presented as a directly estimated additive formula.

## 4. Borrowed theories and cross-domain analogies need explicit boundaries

This rule is broader than analogy alone.

When borrowing a theory, term, or mechanism, state:

1. **what structure or claim is actually being reused**;
2. **what mechanism or scope is not being claimed**;
3. **whether a nearby established term already has a different technical meaning**.

Article 1 used this rule to limit the human/AI analogy to the structure of evaluation.

Article 2 required a naming boundary: DMCA's `dynamic` refers to changing task requirements, relative productivity, experience accumulation, and switching costs. It is **not** a restatement of Teece, Pisano, and Shuen's `dynamic capabilities` framework.

**Status after article 2: REFINE.** The previous “cross-domain analogy” rule is now explicitly a **borrowed-theory / terminology boundary** rule.

## 5. Stabilize the Japanese argument before adding Structure metadata

Do not annotate an argument that is still being rewritten.

First settle:

- central thesis;
- section order;
- evidence boundaries;
- limitations / counterarguments;
- paragraph boundaries.

Only then add Conceptual Level and Rhetorical Role metadata.

Otherwise the annotation starts driving the prose rather than observing it.

**Status after article 2: KEEP.**

## 6. Structure is selective, not coverage-driven

Annotate **argument-bearing paragraphs**, not every sentence in the article.

Good candidates include:

- local claims;
- evidence used to change the reader's inference;
- analysis connecting evidence to a claim;
- qualifications / counterarguments;
- larger implications.

Background explanation, navigation, examples that do not carry the argument, and transitional prose may remain unannotated.

Current flagship fixtures deliberately differ:

| Article | Structured paragraphs | Structured sentences |
| --- | ---: | ---: |
| `capability-output-asymmetry` | 8 | 32 |
| `dynamic-multilayer-comparative-advantage` | 9 | 36 |

These exact numbers and profiles are regression fixtures for their articles, **not targets for later articles**.

**Status after article 2: KEEP.** Different subject matter produced a different Structure naturally.

## 7. Conceptual Level is not a quality score

Never edit prose merely to make the profile look more like an Uneven U.

`L5` is not better than `L1`.

A paragraph may legitimately stay concrete, move only locally, repeat a level, or omit evidence when evidence was established elsewhere.

Structure should expose movement, not manufacture it.

**Status after article 2: KEEP.**

## 8. Flagship articles need real limitations

D articles should not only strengthen the thesis.

Check at least:

- where the construct becomes ambiguous;
- alternative explanations;
- measurement / observation limits;
- costs of applying the recommendation;
- boundaries of generalization;
- whether an original model has actually been validated.

Article 1 records that COIM is a conceptual question-generating model, not an empirically validated classifier.

Article 2 records that DMCA is a diagnostic framework rather than a validated structural model, that learning-by-doing differs across tasks, and that comparative advantage does not by itself guarantee continued human employment.

**Status after article 2: KEEP.**

## 9. Preserve historical identity

- Never change `created` merely because the article was modernized.
- Update `updated` only when the canonical article materially changes.
- Preserve the article's distinctive thesis, useful metaphors, and intellectual history unless FACT or conceptual accuracy requires correction.

Modernization should not turn old essays into generic new summaries.

**Status after article 2: KEEP.** Both flagships preserved `created: 2026-08-08` and changed only `updated`.

## 10. Reading Mode is a deliberate decision, not a completion metric

A D article does not automatically require English Mix or Español Mix.

Use one of:

- **KEEP** — existing derived mode remains aligned;
- **UPDATE** — canonical changes require derived-mode repair;
- **DEFER** — no derived mode is needed in this pass.

Both first two flagships used **DEFER** because no current derived mode existed and the Japanese canonical argument needed to stabilize first.

**Status after article 2: KEEP.**

## 11. One editorial article, one principal PR

Do not combine multiple flagship rewrites into a giant PR.

The preferred unit is:

**one article → research → edit → diff audit → QA → merge**.

If the work discovers reusable runtime or QA defects, fix those in separate focused PRs so article history remains reviewable.

Article 1 required separate QA/runtime follow-ups (#27–#29).
Article 2 used a separate QA-generalization PR (#32) rather than mixing test infrastructure into the article PR (#31).

**Status after article 2: KEEP.**

## 12. Structure browser QA should be fixture-driven

Static metadata validation is not enough.

At minimum, every flagship Structure fixture should verify:

### Normal Reader

- Structure is OFF by default;
- metadata comments never leak into prose;
- metadata-only sentence breaks do not alter ordinary reading flow;
- L1–L5 markers are hidden;
- no horizontal overflow.

### Desktop Structure

- Structure tab opens;
- profile list renders;
- Inspector follows paragraph selection;
- keyboard toggle works where supported;
- markers are visible only in Structure mode.

### Mobile Structure

- compact profiles are available;
- launcher opens the sheet;
- Inspector renders;
- Escape closes only the sheet;
- Escape must not also navigate back to the Library;
- focus returns to the launcher when the overlay closes.

`scripts/argument-structure-qa.cjs` now stores **article-specific fixtures in a shared test harness**. The first article's exact profile remains protected while later articles add their own expected profile and sentence count.

**Status after article 2: REFINE.** Do not hard-code “the baseline article” as the only Structure QA target. Reuse the behavior contract, not one article's profile.

## 13. Treat QA failures as evidence

When a new QA check fails, classify the failure before changing anything:

- **runtime / UX bug**;
- **test-contract error**;
- **fixture error**;
- **content integrity error**.

Do not weaken an assertion simply to make CI green.

Article 1 demonstrated both a test-contract error and a real Escape UX bug. Article 2 added a second fixture without weakening the existing assertions and passed the same desktop/mobile contract.

**Status after article 2: KEEP.**

## 14. Change reasons must stay explicit

Substantive article changes should be explainable as one or more of:

- `FACT`
- `STRUCTURE`
- `READABILITY`
- `LANGUAGE`
- `SPEC`
- `BUG`

Avoid edits justified only by tone polishing or stylistic novelty.

**Status after article 2: KEEP.**

## 15. If aggregation breaks the base logic, model a correction layer instead of renaming the same logic

Article 2 produced a new general rule.

The original draft called the workflow layer `Chain Comparative Advantage`. Research on AI task chaining instead showed that chaining can make simple task-by-task comparative-advantage logic fail.

General rule:

> When aggregation, sequencing, interaction, or coordination changes the optimization problem so that the lower-level rule no longer composes cleanly, do not label the higher layer as merely another version of the same rule.

Use a correction layer, interaction term, boundary condition, or differently named construct.

In article 2 this became **Workflow Boundary**, not another “comparative advantage.”

**Status: ADD.**

## 16. Original modifiers must earn explanatory value

Words such as `dynamic`, `multilayer`, `systemic`, `adaptive`, or `strategic` should not survive merely because they sound useful.

For each modifier, answer:

- exactly what changes;
- what the layer or time scale contains;
- what relationship between layers matters;
- what the base theory cannot explain without the modifier;
- whether the modifier collides with an established technical term.

Article 2 retained `dynamic` because task requirements, relative productivity, experience accumulation, and switching costs change with technology and allocation. It retained `multilayer` because task-level surplus, workflow boundaries, and future capability operate at different decision scales.

**Status: ADD.**

## 17. Comparative advantage is not an employment guarantee

For AI/economics articles, do not convert the statement “comparative advantage can support gains from specialization under specified conditions” into “humans will always retain economically valuable work.”

Employment, wages, and income distribution can depend on prices, demand, ownership, scarce inputs, new tasks, institutions, and general-equilibrium effects.

Use comparative advantage as an allocation concept, not a reassurance theorem.

**Status: ADD.**

## 18. Definition of Done for the next D article

Before moving to the next target, confirm:

- important sources rechecked;
- direct evidence and article extension separated;
- borrowed theories / terminology boundaries reviewed;
- central thesis preserved or intentionally corrected;
- original modifiers earn explanatory value;
- limitations / counterarguments reviewed;
- Japanese argument stabilized before annotation;
- Structure decision documented;
- article-specific Structure fixture added when appropriate;
- Reading Mode decision documented;
- `created` preserved;
- strict migration audit passes;
- static tests pass;
- all Structure fixtures remain green;
- Page Reader and ordinary desktop/mobile visual QA remain green;
- Pages deployment succeeds;
- editorial decisions that generalize are added here only if genuinely new.

## Completion record — article 1

Article: `capability-output-asymmetry`
Target: **D — Flagship**

Article PR: #26
Article merge commit: `c25b4e908064d6b197cea99c7ac4a12dd8477b40`

Structure fixture:

- structured paragraphs: 8
- structured sentences: 32
- Reading Mode: DEFER

Regression QA PR: #27
QA contract correction: #28
Escape UX fix: #29

Final runtime/QA commit: `a1dc0d38396d09f4cea40364ea90505307f75bce`
Final Visual QA run: `33350901710` — success
Final Pages deployment run: `33350901263` — success

## Completion record — article 2

Article: `dynamic-multilayer-comparative-advantage`
Target: **D — Flagship**

Article PR: #31 — `Reframe dynamic comparative-advantage flagship article`
Article merge commit: `40836c71a7f5c66a3d2f5aca96366997af847b8e`

Principal editorial corrections:

- `Chain Comparative Advantage` was removed and replaced with `Workflow Boundary`;
- DMCA was reframed from “three comparative advantages” to a three-layer diagnostic framework;
- `dynamic` and `multilayer` were operationally defined;
- the distinction from established `dynamic capabilities` terminology was made explicit;
- arbitrary numeric reallocation thresholds were removed;
- Harvest / Bridge / Option and reallocation-threshold ideas were labeled as heuristics / extensions;
- comparative advantage was explicitly bounded as an allocation concept rather than an employment guarantee.

Structure fixture:

- structured paragraphs: 9
- structured sentences: 36
- Reading Mode: DEFER

Fixture-driven QA PR: #32 — `Make Argument Structure QA fixture-driven`
QA merge commit: `bcbe2fe48c4d2a65fb8939a78d852f0e45a4f17f`

Final Visual QA run: `33353633982` — success

Validation on that run:

- canonical entries: 181
- English Mix files: 110
- Español Mix files: 1
- canonical articles with Structure metadata: 3
- integrity errors: 0
- warnings: 0
- known spec drift: 0
- static tests: 40 / 40
- Reading Mode QA: success
- Argument Structure QA: success for 2 fixtures
- Page Reader QA: success
- desktop/mobile Visual QA: success

## Next article

Proceed one article at a time to:

`executive-hands-on-as-exploration`

Reuse the **validated method and behavior contract** in this document, not either previous article's exact section layout or Structure profiles.
