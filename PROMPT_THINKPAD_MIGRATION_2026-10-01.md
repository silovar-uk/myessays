# Prompt: research-driven PC migration essay with Uneven U

Use this prompt when producing a future hardware-migration essay in the same editorial system.

---

You are writing a serious research essay about moving from one personal computer or device ecosystem to another.

The task is not to produce a generic “20 settings to change” list. Use device-specific quirks as evidence for a larger question: what hidden conditions made the reader’s work possible, and which of those conditions must be synchronized, reinstalled, reissued, rebuilt, consciously relearned, or intentionally discarded?

## Research process

1. Start with first-party sources from the hardware vendor and operating-system/platform vendor.
2. Identify at least one conspicuous but apparently trivial physical or interface detail that can serve as the opening oddity.
3. Separate:
   - device-specific hardware facts
   - OS migration behavior
   - authentication and recovery behavior
   - application restoration
   - advanced local environments
   - editorial interpretation
4. Re-research every claim that uses words like “all,” “always,” “automatically,” “migrates,” “restores,” or “recommended.”
5. Explicitly label any workflow, time window, checklist, or framework that you invented as a proposal or heuristic rather than vendor guidance.
6. Prefer current first-party documentation. If the feature is model-dependent, say so and direct the reader to the model user guide.

## Structural model

Use Eric Hayot’s Uneven U as an editorial movement, not as a visible formula.

Each important paragraph should usually:
- begin with a problem or claim at conceptual level 4,
- descend through explanation and concrete evidence toward levels 2 and 1,
- extract an interpretation at level 3,
- end at a level 4 or 5 insight that could not have been responsibly stated before the evidence.

Do not merely restate the opening sentence at the end of a paragraph. Every paragraph must change what the reader can now say.

Apply the same movement globally. The conclusion must be epistemically ahead of the introduction.

## Required migration model

Test whether the article becomes clearer when migration is decomposed into:
1. data
2. authentication
3. applications
4. local environment
5. body/hardware interaction

Do not force the model if the evidence suggests another decomposition.

For the operational section, test a verb-based ledger:
- synchronize
- reinstall
- reissue
- rebuild
- discard

Add a verification condition to each important item. Migration is complete when work can be performed and recovery routes are verified, not merely when icons are present.

## Editorial tone

Open with a small, slightly strange observation. Investigate it far more seriously than its apparent importance warrants. Let the investigation change the framing of the problem.

Humor should come from factual disproportion, contrast, and the writer’s mild surprise—not from a stream of jokes.

Write for an intelligent beginner. Explain prerequisites and terms, but do not flatten the thinking or use infantilizing analogies.

Distinguish facts, interpretations, and proposals. Do not strengthen uncertain claims.

## Japanese canonical version

- Write natural contemporary Japanese.
- Do not leave half-translated English nouns in prose.
- At first introduction, render important names/terms in Japanese and include the original English form in parentheses when useful for identification.
- Thereafter prefer the Japanese form.
- Keep command names, code, URLs, and exact official titles in their necessary original form.
- After drafting, search for stray ASCII words and manually judge each occurrence.

## English Mix version

Treat the Japanese article as the canonical source.

- Keep exactly the same H2 order.
- Preserve one-to-one Reading Locator blocks: `p`, `ul`, `ol`, `blockquote`, `figure`.
- Do not merge, split, reorder, or move canonical blocks.
- Transform content block by block.
- Mix English naturally at phrase and sentence level while keeping Japanese as a comprehension base.
- Preserve claims, numbers, caveats, examples, links, and source scope.
- Validate structural equality before publishing.

## Final QA

Before publishing, verify:
- every factual claim that could vary by model or current software has a source or a qualification;
- the Japanese version has no accidental untranslated English residue;
- invented recommendations are marked as proposals;
- headings alone reveal the argument;
- each paragraph advances the reader’s understanding;
- the English Mix has the same H2 order and Reading Locator block sequence;
- data/index.json contains only the canonical article;
- data/versions-index.json maps the English Mix under the same article ID.

Publish research notes, structure notes, the re-research audit, and this reusable prompt alongside the article so the reasoning process remains inspectable.
