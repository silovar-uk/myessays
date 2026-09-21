# Smash Ultimate Move-Pair Audit — Research & Writing Prompt

## Goal
Create a rigorous but readable essay about improving at Super Smash Bros. Ultimate by analyzing not only which opponent move hit the player, but which player action was happening when the hit occurred.

## Core thesis
Do not log:
- "I got hit by Bair."

Log:
- "My high Fair whiff was punished by Bair on landing."

The useful unit is:
your action × opponent action × collision state.

## Research order
1. Verify the current Smash Ultimate software version from Nintendo.
2. Verify whether recent patches changed gameplay balance.
3. Research hitbox, hurtbox, disjoint, priority/clanking, startup, active frames, endlag, landing lag and punish definitions from SmashWiki.
4. Verify shield / out-of-shield timing from Ultimate Frame Data.
5. Use replay-analysis guides only as supplemental practice evidence, not as the authority for game mechanics.
6. Re-check surprising claims against a second source when possible.

## Structure
1. Hook: "I got hit by F-smash three times" sounds like analysis but is not yet actionable.
2. Explain why opponent-move-only review fails.
3. Separate colloquial "strong priority" from technical hitbox / hurtbox / clank mechanics.
4. Reframe move matchup from A > B into a conditional relation involving timing, distance and state.
5. Introduce six replay loss categories:
   - startup interruption
   - range/disjoint loss
   - lingering active-frame loss
   - whiff punish
   - shield punish
   - landing/action-end punish
6. Propose a 10-hit pair audit.
7. Count repeated pairs, not only damage.
8. Reverse matchup study: start from which of the player's own actions most often opens disadvantage.
9. Use frame data as forensic evidence after the replay reveals a recurring collision.
10. Propose a six-step A/B interaction test in Training Mode.
11. Include a Duck Hunt example to show how projectile workflow can create vulnerable timing windows.
12. Propose temporarily reducing the most-punished move for three games.
13. End by returning to the opening F-smash example with a changed model: the question is not only what hit me, but what I kept offering to it.

## Editorial rules
- Japanese version must explain fully in Japanese. Use English technical terms only when they add precision.
- Separate verified mechanics from interpretation and proposed drills.
- Do not call every interaction "priority." Explain the narrower technical meaning.
- Do not claim a move universally beats another move without specifying conditions.
- Use jokes from the mismatch between serious analysis and trivial-looking game events.
- Avoid reducing the essay to beginner language; assume an intelligent player who wants a sharper model.
- Headings should state a conclusion.
- Avoid generic "be careful" advice. Every diagnosis should point toward something trainable.
- Preserve the writer's uncertainty where appropriate; do not convert hypotheses into facts.

## Deliverables
- Japanese canonical essay
- English Mix derived reading mode
- Research Note distinguishing facts / analysis / proposed practice
- Source list with direct URLs
