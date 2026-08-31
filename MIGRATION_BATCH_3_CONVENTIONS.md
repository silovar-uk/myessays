# MyEssays Batch 3 Editorial / Writing Architecture Conventions

Established: 2026-08-31
Validated on:

1. `capability-output-asymmetry`
2. `dynamic-multilayer-comparative-advantage`
3. `executive-hands-on-as-exploration`

This document records the **reusable editorial method** learned across Batch 3 flagship migrations. It is not a prose template and does not prescribe one fixed Argument Structure profile.

## 1. Research before prose

For D — Flagship articles, do not start by rewriting sentences.

Use this order:

**Research → evidence boundary → editorial diagnosis → argument skeleton → prose edit → Structure annotation → critical review → browser QA → merge**

Primary papers, official publications, and recent high-quality research should be preferred for claims that carry the article's argument.

**Status after article 3: KEEP.** The same order worked across psychology/evaluation, economics/AI allocation, and management/organizational-learning topics without forcing the same prose shape.

## 2. Separate evidence from editorial extension

Every important external claim should be understood as one of:

- **VERIFIED** — the cited source directly supports the current formulation;
- **NEEDS QUALIFICATION** — the direction is supported but the article overstates scope or causality;
- **NEEDS CORRECTION** — the factual or conceptual relationship is wrong;
- **ORIGINAL MODEL / EXTENSION** — the article connects existing findings into a new interpretation or model.

When an article applies a finding outside the source's original domain, say so in the prose when that boundary matters.

Examples across the first three flagships:

- false consensus / egocentric anchoring → workplace ability judgment;
- Dynamic Assessment → management practice;
- human evaluation ↔ AI evaluation analogy;
- learning-by-doing evidence → long-run automation implications;
- comparative-advantage/task research → DMCA diagnostic layers;
- switching-cost research → reallocation-threshold heuristic;
- inventor-CEO research → the distinction between prior hands-on experience and ongoing executive execution;
- sticky-information / experimentation research → the article-level `hands-on probe` heuristic.

**Status after article 3: KEEP.** This remains the highest-value editorial rule.

## 3. Do not put unknowable truth on a model axis without operationalizing it

The original Capability–Output Inference Matrix used a latent `ability yes / no` axis while the article simultaneously argued that ability is not directly observable.

The revised model instead used initial observed output and provisional inference from richer subsequent evidence.

General rule:

> If a conceptual model claims that a variable is latent or unobservable, do not casually use an omniscient version of that same variable as if it were directly known.

Prefer observable evidence, explicitly estimated states, or clearly defined operational criteria.

Article 2 added a related lesson: a diagnostic expression whose components have different units must not be presented as a directly estimated additive formula.

Article 3 reinforced the operationalization rule by evaluating hands-on activity through explicit decision conditions rather than the vague label `hands-on = good`.

**Status after article 3: KEEP.**

## 4. Borrowed theories and cross-domain analogies need explicit boundaries

When borrowing a theory, term, or mechanism, state:

1. **what structure or claim is actually being reused**;
2. **what mechanism or scope is not being claimed**;
3. **whether a nearby established term already has a different technical meaning**.

Article 1 used this rule to limit the human/AI analogy to the structure of evaluation.

Article 2 required a naming boundary: DMCA's `dynamic` refers to changing task requirements, relative productivity, experience accumulation, and switching costs. It is **not** a restatement of Teece, Pisano, and Shuen's `dynamic capabilities` framework.

Article 3 validated the terminology-collision check again. The original `exploratory insourcing` label was dropped because `insourcing` is already used for organizational sourcing boundaries, while the article was discussing temporary direct participation by an individual executive.

**Status after article 3: KEEP / VALIDATED AGAIN.** A compelling new label is not worth preserving when it collides with an established technical meaning.

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

**Status after article 3: KEEP.**

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
| `executive-hands-on-as-exploration` | 11 | 46 |

These exact numbers and profiles are regression fixtures for their articles, **not targets for later articles**.

**Status after article 3: KEEP.** A third subject produced a third shape, which is evidence that the method can be reused without normalizing the argument into one profile.

## 7. Conceptual Level is not a quality score

Never edit prose merely to make the profile look more like an Uneven U.

`L5` is not better than `L1`.

A paragraph may legitimately stay concrete, move only locally, repeat a level, or omit evidence when evidence was established elsewhere.

Structure should expose movement, not manufacture it.

**Status after article 3: KEEP.**

## 8. Flagship articles need real limitations — and some counterevidence belongs in the thesis

D articles should not only strengthen the thesis.

Check at least:

- where the construct becomes ambiguous;
- alternative explanations;
- measurement / observation limits;
- costs of applying the recommendation;
- boundaries of generalization;
- whether an original model has actually been validated;
- whether strong counterevidence changes the central relationship rather than merely limiting it.

Article 1 records that COIM is a conceptual question-generating model, not an empirically validated classifier.

Article 2 records that DMCA is a diagnostic framework rather than a validated structural model, that learning-by-doing differs across tasks, and that comparative advantage does not by itself guarantee continued human employment.

Article 3 found direct counterevidence to the draft's implicit `hands-on = exploration` relationship. Because that evidence changed the meaning of the article, it was not pushed into a final limitations section. The central thesis itself was rewritten so that hands-on activity can produce exploration **or** exploitation depending on how it shapes search and decision making.

**Status after article 3: REFINE.** A counterargument that merely bounds a claim belongs in limitations. Counterevidence that reverses or changes the central relationship belongs in the article's core architecture.

## 9. Preserve historical identity

- Never change `created` merely because the article was modernized.
- Update `updated` only when the canonical article materially changes.
- Preserve the article's distinctive thesis, useful metaphors, and intellectual history unless FACT or conceptual accuracy requires correction.

Modernization should not turn old essays into generic new summaries.

Article 3 preserved the old intuition `作ることは、知ることである`, but made it conditional: building becomes a way of knowing only when the trial is designed to answer a decision-relevant question.

**Status after article 3: KEEP.** All three D Flagships preserved `created: 2026-08-08` and changed only `updated`.

## 10. Reading Mode is a deliberate decision, not a completion metric

A D article does not automatically require English Mix or Español Mix.

Use one of:

- **KEEP** — existing derived mode remains aligned;
- **UPDATE** — canonical changes require derived-mode repair;
- **DEFER** — no derived mode is needed in this pass.

All first three flagships used **DEFER** because no current derived mode existed and the Japanese canonical argument needed to stabilize first.

**Status after article 3: KEEP.**

## 11. One editorial article, one principal PR

Do not combine multiple flagship rewrites into a giant PR.

The preferred unit is:

**one article → research → edit → diff audit → QA → merge**.

If the work discovers reusable runtime or QA defects, fix those in separate focused PRs so article history remains reviewable.

- Article 1 required separate QA/runtime follow-ups (#27–#29).
- Article 2 used a separate QA-generalization PR (#32) rather than mixing test infrastructure into the article PR (#31).
- Article 3 kept the article rewrite in #34 and the fixture work in #35 / #36.

**Status after article 3: KEEP.**

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

`scripts/argument-structure-qa.cjs` stores **article-specific fixtures in a shared test harness**. Each article protects its own profile and sentence count while sharing the same behavioral contract.

**Status after article 3: KEEP.** The common harness now passes three distinct fixtures.

## 13. Treat QA failures as evidence

When a new QA check fails, classify the failure before changing anything:

- **runtime / UX bug**;
- **test-contract error**;
- **fixture error**;
- **content integrity error**.

Do not weaken an assertion simply to make CI green.

Article 1 demonstrated both a test-contract error and a real Escape UX bug.

Article 3 added a clean example of a **fixture error**. The first third-article fixture was manually recorded as 9 paragraphs / 38 sentences. The strict audit and browser compilation showed the authored article actually contained 11 structured paragraphs / 46 structured sentences. The article, runtime, and assertions were left unchanged; only the fixture was corrected in PR #36.

General rule:

> For authored Structure counts, use the compiled browser/audit result as the verification source. Do not rely on manual counting when establishing a regression fixture.

**Status after article 3: KEEP + ADD VERIFICATION DETAIL.**

## 14. Change reasons must stay explicit

Substantive article changes should be explainable as one or more of:

- `FACT`
- `STRUCTURE`
- `READABILITY`
- `LANGUAGE`
- `SPEC`
- `BUG`

Avoid edits justified only by tone polishing or stylistic novelty.

**Status after article 3: KEEP.**

## 15. If aggregation breaks the base logic, model a correction layer instead of renaming the same logic

Article 2 produced this rule.

The original draft called the workflow layer `Chain Comparative Advantage`. Research on AI task chaining instead showed that chaining can make simple task-by-task comparative-advantage logic fail.

General rule:

> When aggregation, sequencing, interaction, or coordination changes the optimization problem so that the lower-level rule no longer composes cleanly, do not label the higher layer as merely another version of the same rule.

Use a correction layer, interaction term, boundary condition, or differently named construct.

In article 2 this became **Workflow Boundary**, not another “comparative advantage.”

**Status after article 3: KEEP.** No contradictory evidence from article 3.

## 16. Original modifiers must earn explanatory value

Words such as `dynamic`, `multilayer`, `systemic`, `adaptive`, or `strategic` should not survive merely because they sound useful.

For each modifier, answer:

- exactly what changes;
- what the layer or time scale contains;
- what relationship between layers matters;
- what the base theory cannot explain without the modifier;
- whether the modifier collides with an established technical term.

Article 2 retained `dynamic` because task requirements, relative productivity, experience accumulation, and switching costs change with technology and allocation. It retained `multilayer` because task-level surplus, workflow boundaries, and future capability operate at different decision scales.

**Status after article 3: KEEP.**

## 17. Comparative advantage is not an employment guarantee

For AI/economics articles, do not convert the statement “comparative advantage can support gains from specialization under specified conditions” into “humans will always retain economically valuable work.”

Employment, wages, and income distribution can depend on prices, demand, ownership, scarce inputs, new tasks, institutions, and general-equilibrium effects.

Use comparative advantage as an allocation concept, not a reassurance theorem.

**Status after article 3: KEEP.**

## 18. Separate accumulated capability from current task ownership

Article 3 produced a new general rule.

Research can support both of the following without contradiction:

- prior direct experience may improve a leader's ability to evaluate or select technical work;
- continued direct execution may narrow search, centralize attention, or create new organizational costs.

Do not infer:

> `experience helped build judgment` → `the same person should keep owning the task`.

The relevant questions are different:

1. What knowledge or capability should the decision maker retain?
2. Who has comparative advantage in ongoing execution?
3. Does direct participation still produce new information, or has it become ordinary production / maintenance?
4. What knowledge must remain after the task is delegated?

Article 3 used this distinction to separate **past inventor experience** from **ongoing inventor-CEO involvement** and to preserve knowledge overlap without recommending permanent executive implementation ownership.

**Status: ADD.**

## 19. Behavior labels are not theoretical classifications

Terms such as `hands-on`, `prototype`, `direct involvement`, `AI use`, or `experimentation` describe observable behavior at a coarse level. They do not by themselves tell us which theoretical mechanism is active.

For example, direct executive involvement may be:

- exploration;
- exploitation;
- skill maintenance;
- information acquisition;
- signaling;
- substitution for missing staff;
- micromanagement;
- ordinary production.

Classify the activity by its **function, search pattern, evidence, and decision consequence**, not by the surface behavior label.

Article 3 therefore removed the implicit `hands-on = exploration` equation.

**Status: ADD.**

## 20. Preserve actor neutrality until evidence supports role specificity

A finding that direct participation or local knowledge matters does not automatically imply that the CEO, manager, or other highest-status actor should perform the task.

Ask where the relevant information and decision rights actually sit.

Sticky information may be held by:

- a domain owner;
- a frontline operator;
- an engineer;
- a designer;
- a customer;
- an executive;
- or several of them jointly.

Article 3's conclusion is therefore not `CEO should code`. The stronger rule is: **put the probe at the intersection of decision relevance and hard-to-transfer information, then choose the least-cost participation form that resolves the uncertainty.**

**Status: ADD.**

## 21. Strong counterevidence should be architecture, not decoration

When a source directly contradicts a draft's central causal or classificatory relationship, do not preserve the old thesis and add the source as a polite “however” paragraph at the end.

Use this sequence:

1. state what the draft assumed;
2. state what the counterevidence changes;
3. identify the narrower relationship that survives;
4. rebuild the article around that surviving relationship;
5. keep the original intuition only where it remains defensible.

Article 3 used this process after evidence showed that continued inventor-CEO involvement can be associated with **exploitative**, not exploratory, innovation. The article was rebuilt around bounded decision probes rather than keeping `hands-on = exploration` and burying the contradiction in limitations.

**Status: ADD.**

## 22. Definition of Done for the next D article

Before moving to the next target, confirm:

- important sources rechecked;
- direct evidence and article extension separated;
- central counterevidence searched for, not merely supportive evidence;
- borrowed theories / terminology boundaries reviewed;
- behavior labels are not being mistaken for mechanisms;
- actor specificity is actually supported;
- accumulated capability is separated from current task ownership where relevant;
- central thesis preserved or intentionally corrected;
- original modifiers earn explanatory value;
- limitations / counterarguments reviewed;
- Japanese argument stabilized before annotation;
- Structure decision documented;
- article-specific Structure fixture added when appropriate;
- fixture counts verified from audit/browser compilation rather than hand-count alone;
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

## Completion record — article 3

Article: `executive-hands-on-as-exploration`
Target: **D — Flagship**

Article PR: #34 — `Reframe executive hands-on work as bounded decision probes`
Article merge commit: `80eac4c66484f027994ed0985fee5efae8d05243`

Principal editorial corrections:

- retitled to `作ることは、知るためのプローブになる`;
- removed the equation `hands-on = exploration`;
- separated prior hands-on / inventor experience from ongoing direct executive execution;
- removed `exploratory insourcing` because the term collided with established sourcing-boundary language;
- introduced `hands-on probe` as a bounded article-level diagnostic heuristic, not a validated management theory;
- required five conditions: Decision-linked, Question-led, Bounded, Comparatively direct, Exit-ready;
- moved strong counterevidence into the central thesis rather than hiding it in limitations;
- treated sticky information as actor-neutral rather than assuming the CEO possesses it;
- evaluated prototypes by decision / belief update rather than completion or code volume;
- added the risk that executive prototypes can narrow search or create premature certainty;
- preserved `created: 2026-08-08` and updated only `updated: 2026-08-31`.

Reading Mode: **DEFER**

Actual authored Structure after browser/audit compilation:

- structured paragraphs: **11**
- structured sentences: **46**

QA history:

- PR #35 — added the third article fixture, but the initial manual fixture count was incorrect;
- Visual QA run `33356408842` — failed at Structure QA and was classified as a **fixture error**;
- PR #36 — corrected only the fixture to 11 / 46, without changing article prose, Structure metadata, runtime, or assertion strength;
- final QA merge commit: `c8e47cd4d9072097043fc48fddcda880da0917ea`.

Final Visual QA run: `33356549051` — **success**

Validation on that run:

- canonical entries: 182
- English Mix files: 111
- Español Mix files: 1
- canonical articles with Structure metadata: 4
- integrity errors: 0
- warnings: 0
- known spec drift: 0
- static tests: 40 / 40
- Reading Mode QA: success
- Argument Structure QA: **3 fixtures passed**
- Page Reader QA: success
- desktop/mobile Visual QA: success
- desktop/mobile horizontal overflow: none
- console/page errors: none

Final Pages deployment run: `33356548218` — **success**

## Next article

Proceed one article at a time to:

`learning-organization-senge-systems-thinking`

Reuse the **validated method and behavior contract** in this document. Do not copy any previous article's section layout, sentence count, terminology, or L1–L5 profile.
