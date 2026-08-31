# MyEssays Batch 3 Editorial / Writing Architecture Conventions

Established: 2026-08-31
Baseline article: `capability-output-asymmetry`

This document records the **reusable editorial method** learned from the first Batch 3 flagship migration. It is not a prose template and does not prescribe one fixed Argument Structure profile.

## 1. Research before prose

For D — Flagship articles, do not start by rewriting sentences.

Use this order:

**Research → evidence boundary → editorial diagnosis → argument skeleton → prose edit → Structure annotation → critical review → browser QA → merge**

Primary papers, official publications, and recent high-quality research should be preferred for claims that carry the article's argument.

## 2. Separate evidence from editorial extension

Every important external claim should be understood as one of:

- **VERIFIED** — the cited source directly supports the current formulation;
- **NEEDS QUALIFICATION** — the direction is supported but the article overstates scope or causality;
- **NEEDS CORRECTION** — the factual or conceptual relationship is wrong;
- **ORIGINAL MODEL / EXTENSION** — the article connects existing findings into a new interpretation or model.

When an article applies a finding outside the source's original domain, say so in the prose when that boundary matters.

The baseline article used this rule for:

- false consensus / egocentric anchoring → workplace ability judgment;
- expertise research → the article's `10年間＋3秒` metaphor;
- Dynamic Assessment → management practice;
- human evaluation ↔ AI evaluation analogy.

## 3. Do not put unknowable truth on a model axis without operationalizing it

The original Capability–Output Inference Matrix used a latent `ability yes / no` axis while the article simultaneously argued that ability is not directly observable.

The revised model therefore uses:

- **initial observed output**, and
- **provisional inference from richer subsequent evidence**.

General rule:

> If a conceptual model claims that a variable is latent or unobservable, do not casually use an omniscient version of that same variable as if it were directly known.

Prefer observable evidence, explicitly estimated states, or clearly defined operational criteria.

## 4. Cross-domain analogies need an explicit boundary

A useful analogy should state both:

1. **what structure is shared**, and
2. **what mechanism is not being claimed as shared**.

For the baseline article, humans and AI share only an evaluation problem: an observer infers something not directly visible from condition-dependent output.

The article does **not** claim that human cognition, motivation, learning, embodiment, model weights, prompting, or fine-tuning are the same mechanism.

This rule should be reused for other interdisciplinary essays.

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

## 6. Structure is selective, not coverage-driven

Annotate **argument-bearing paragraphs**, not every sentence in the article.

Good candidates include:

- local claims;
- evidence used to change the reader's inference;
- analysis connecting evidence to a claim;
- qualifications / counterarguments;
- larger implications.

Background explanation, navigation, examples that do not carry the argument, and transitional prose may remain unannotated.

The baseline article contains:

- 8 structured paragraphs;
- 32 structured sentences;
- multiple Conceptual Movement profiles rather than one repeated pattern.

These exact numbers and profiles are a regression fixture for this article, **not a template for later articles**.

## 7. Conceptual Level is not a quality score

Never edit prose merely to make the profile look more like an Uneven U.

`L5` is not better than `L1`.

A paragraph may legitimately stay concrete, move only locally, repeat a level, or omit evidence when evidence was established elsewhere.

Structure should expose movement, not manufacture it.

## 8. Flagship articles need real limitations

D articles should not only strengthen the thesis.

Check at least:

- where the construct becomes ambiguous;
- alternative explanations;
- measurement / observation limits;
- costs of applying the recommendation;
- boundaries of generalization;
- whether an original model has actually been validated.

The baseline article explicitly records that COIM is a conceptual question-generating model, not an empirically validated classifier.

## 9. Preserve historical identity

- Never change `created` merely because the article was modernized.
- Update `updated` only when the canonical article materially changes.
- Preserve the article's distinctive thesis, useful metaphors, and intellectual history unless FACT or conceptual accuracy requires correction.

Modernization should not turn old essays into generic new summaries.

## 10. Reading Mode is a deliberate decision, not a completion metric

A D article does not automatically require English Mix or Español Mix.

Use one of:

- **KEEP** — existing derived mode remains aligned;
- **UPDATE** — canonical changes require derived-mode repair;
- **DEFER** — no derived mode is needed in this pass.

`capability-output-asymmetry` used **DEFER** because no current derived mode existed and the canonical argument needed to stabilize first.

## 11. One editorial article, one principal PR

Do not combine multiple flagship rewrites into a giant PR.

The preferred unit is:

**one article → research → edit → diff audit → QA → merge**.

If the work discovers reusable runtime or QA defects, fix those in separate focused PRs so article history remains reviewable.

The baseline work followed this separation:

- PR #26 — article research/edit/Structure;
- PR #27 — dedicated Argument Structure browser QA;
- PR #28 — QA selector correction;
- PR #29 — real mobile Escape UX fix exposed by the QA.

## 12. Structure articles require direct browser regression coverage

Static metadata validation is not enough.

At minimum, a Structure regression path should verify:

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

The baseline regression test is `scripts/argument-structure-qa.cjs`.

## 13. Treat QA failures as evidence

When a new QA check fails, classify the failure before changing anything:

- **runtime / UX bug**;
- **test-contract error**;
- **fixture error**;
- **content integrity error**.

Do not weaken an assertion simply to make CI green.

In the baseline work:

1. the first failure was a **test-contract error**: the mobile sheet did not contain `#argumentInspector`;
2. after correcting the selector, the same QA exposed a **real UX bug**: Escape also triggered the global reader-back shortcut;
3. the runtime was fixed and the original route-preservation assertion was retained.

## 14. Change reasons must stay explicit

Substantive article changes should be explainable as one or more of:

- `FACT`
- `STRUCTURE`
- `READABILITY`
- `LANGUAGE`
- `SPEC`
- `BUG`

Avoid edits justified only by tone polishing or stylistic novelty.

## 15. Definition of Done for the next D article

Before moving to the next target, confirm:

- important sources rechecked;
- direct evidence and article extension separated;
- central thesis preserved or intentionally corrected;
- limitations / counterarguments reviewed;
- Japanese argument stabilized before annotation;
- Structure decision documented;
- Reading Mode decision documented;
- `created` preserved;
- strict migration audit passes;
- static tests pass;
- Structure-specific browser QA remains green;
- Page Reader and ordinary desktop/mobile visual QA remain green;
- Pages deployment succeeds;
- editorial decisions that generalize are added here only if genuinely new.

## Baseline completion record

Article: `capability-output-asymmetry`
Target: **D — Flagship**

Article PR: #26 — `Modernize capability-output flagship article with Writing Architecture`

Article merge commit:

`c25b4e908064d6b197cea99c7ac4a12dd8477b40`

Structure fixture:

- structured paragraphs: 8
- structured sentences: 32
- Reading Mode: DEFER

Regression QA PR: #27
QA contract correction: #28
Escape UX fix: #29

Final runtime/QA commit:

`a1dc0d38396d09f4cea40364ea90505307f75bce`

Final Visual QA run:

`33350901710` — success

Final Pages deployment run:

`33350901263` — success

## Next article

Proceed one article at a time to:

`dynamic-multilayer-comparative-advantage`

Reuse the **method** in this document, not the baseline article's exact section layout or Structure profiles.
