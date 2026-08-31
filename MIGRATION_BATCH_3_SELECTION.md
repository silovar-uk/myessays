# MyEssays Batch 3 Editorial Selection

Selected: 2026-08-31
Precondition: Batch 2 Class-A compatibility pass completed with zero integrity errors, warnings, and known specification drift.

## 1. Batch 2 gate result

Strict migration audit on `main` reported:

- Canonical index entries: 178
- Markdown files under `essays/`: 178
- English Mix files: 107
- Español Mix files: 1
- Canonical articles with Argument Structure metadata: 1
- Legacy canonical `*-mixed-en.md` entries: 0
- Integrity errors: 0
- Warnings: 0
- Known spec-drift files: 0

Classification of Batch 2 findings:

- **P0-A / Integrity defect:** none
- **P0-B / Specification drift:** none
- **P1 / Editorial modernization:** proceed selectively in Batch 3
- **P2 / Freshness review:** handled per selected article before substantive editing; the audit heuristic is a review flag, not a defect
- **ACCEPT:** absence of English Mix, Español Mix, or Structure is not a defect

No article prose was changed to complete Batch 2.

## 2. Batch 3 principle

The first editorial batch should be coherent enough to establish a reusable Writing Architecture standard.

Therefore Batch 3 focuses on seven argument-led essays about capability, allocation, exploration, organizational learning, structured thinking, proxy metrics, and noticing.

Practical/reference articles such as the value-chain guide are intentionally deferred to a later B-oriented batch rather than mixing different editorial goals into the first Writing Architecture batch.

`outsourcing-ai-results-without-capability` remains the current Structure reference article and is not selected for broad rewriting in this batch.

## 3. Selected articles

| Order | Article ID | Target class | Research before edit | Selection reason |
| --- | --- | --- | --- | --- |
| 1 | `capability-output-asymmetry` | **D — Flagship** | **Yes** | Favorite 5 / Grow 5 Conceptual Paper with an explicit Capability–Output Inference Matrix. Strong claim–evidence–implication structure and a natural flagship for the site's current academic-writing direction. Recheck capability-elicitation and related AI evidence before updating claims. |
| 2 | `dynamic-multilayer-comparative-advantage` | **D — Flagship** | **Yes** | Favorite 5 / Grow 5 Conceptual Paper proposing a three-layer model of task, chain, and trajectory comparative advantage. Central to AI-era work allocation and highly suitable for Structure. Current AI/task-economics sources require verification. |
| 3 | `executive-hands-on-as-exploration` | **D — Flagship** | **Yes** | Favorite 5 / Grow 5 Conceptual Paper introducing exploratory insourcing. It explicitly cites 2026 AI research, so source/factual verification is mandatory before editorial modernization. |
| 4 | `learning-organization-senge-systems-thinking` | **D — Flagship** | **Yes** | Favorite 5 / Grow 5 essay using NASA, Beer Game, AAR, Pixar, and Toyota to explain organizational learning. Strong narrative-to-model movement, but case details and source attribution need a deliberate research pass. |
| 5 | `minto-pyramid-thinking-structure-ai` | **C — Writing Architecture** | **Yes, focused** | Grow 5 essay directly about hierarchy and structured thought. Ideal for testing whether Conceptual Level and Rhetorical Role reveal the article's own argument without turning Structure into a score. Existing English Mix should be reviewed after Japanese structure is stable. |
| 6 | `goodharts-law-proxy-target-design` | **C — Writing Architecture** | **Yes, focused** | Grow 5 management/systems essay with a clear path from proxy metric to incentives, failure modes, and design implications. Recheck primary Goodhart/Campbell context, Wells Fargo example, and AI specification-gaming claims. |
| 7 | `commentary-as-technology-of-noticing` | **C — Writing Architecture** | **Yes, source check** | Conceptual Paper crossing attention, event segmentation, Think Aloud, affect labeling, verbal overshadowing, and phenomenology. Strong fit for rhetorical-role annotation; source boundaries need checking more than temporal updating. |

## 4. Target-class meaning for this batch

### C — Writing Architecture

- preserve the article's thesis unless correction is required;
- review title/subtitle/abstract and section order;
- improve paragraph boundaries only where the argument benefits;
- add Conceptual Level / Rhetorical Role metadata to argument-bearing paragraphs;
- do not annotate every sentence merely for coverage;
- keep normal Reader flow primary.

### D — Flagship

Everything in C, plus:

- research current and primary sources before substantive changes;
- distinguish historical snapshot from claims that should be current;
- verify named studies/cases and causal wording;
- review references and limitations/counterarguments;
- review existing Reading Modes or deliberately decide not to add one.

## 5. Execution order

Do not edit all seven at once.

Use the following sequence:

1. `capability-output-asymmetry`
2. `dynamic-multilayer-comparative-advantage`
3. `executive-hands-on-as-exploration`
4. `learning-organization-senge-systems-thinking`
5. `minto-pyramid-thinking-structure-ai`
6. `goodharts-law-proxy-target-design`
7. `commentary-as-technology-of-noticing`

For each article:

**Research → editorial diagnosis → proposed changes → prose/structure edit → diff audit → Reader/Structure QA → merge**

Complete and review each article before using its decisions as precedent for the next.

## 6. Reject conditions

Stop and reconsider if the batch starts to do any of the following:

- force identical section templates across all seven articles;
- make every paragraph follow the same L4→L1→L3→L5 profile;
- treat Conceptual Level as article quality;
- rewrite historical prose merely because a newer phrasing sounds better;
- add English Mix or Español Mix solely to increase coverage;
- combine factual research, seven major rewrites, and runtime UI changes into one giant PR;
- alter `created` dates to make old essays appear newly published.

## 7. Definition of Done

Batch 3 is complete when all seven selected articles have been deliberately reviewed to their target class, not simply touched.

For each selected article record:

- research status;
- substantive change reasons (`FACT`, `STRUCTURE`, `READABILITY`, `LANGUAGE`, `SPEC`, `BUG`);
- Structure decision and rationale;
- Reading Mode decision and rationale;
- QA result;
- merge commit.

The next batch should be selected only after patterns learned from these seven are documented.
