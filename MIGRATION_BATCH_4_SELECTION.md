# MyEssays Migration Batch 4 Selection

Selected: 2026-08-31
Updated: 2026-09-01

Theme: **Freshness & External Claims**

Batch 3 established a reusable Writing Architecture for conceptual essays. Batch 4 deliberately tests that method against a different failure mode: articles whose truth can drift because they depend on changing products, services, organizations, statistics, geopolitics, or medical guidance.

Current progress: **3 / 7 completed**.

## Selection rule

Candidates were re-selected from the latest strict audit after Batch 3 rather than inherited from the original inventory.

Priority combines:

1. **claim risk** — strong factual, causal, comparative, or evaluative claims;
2. **freshness risk** — facts can change after publication;
3. **reader value** — article remains worth maintaining;
4. **architecture gap** — no current selective Structure layer / older editorial standard;
5. **derived-mode debt** — an existing English Mix can preserve superseded claims after the canonical changes.

Newly authored NPB series articles are intentionally excluded because they are already being developed under the current architecture in parallel work.

## Selected order

| # | Article | Domain | EN Mix | Status | Why now |
| --- | --- | --- | --- | --- | --- |
| 1 | `claude-delegation-horizon-opus-fable` | AI products / workflow | yes | **Completed** | Model names, pricing, benchmarks, product positioning, and case studies can date quickly. The article also builds an original `delegation horizon` model on top of vendor claims. |
| 2 | `physical-ai-embodied-intelligence-deployment` | AI / robotics | yes | **Completed** | Fast-moving terminology and 2026 product/research claims required a clean boundary between industry label, research concepts, current product snapshots, and editorial working definitions. |
| 3 | `rakuten-securities-information-infrastructure` | finance / product ecosystem | no | **Completed** | Product availability, rates, account counts, ownership, NISA features, and content entitlements were re-researched and separated from the durable service-design thesis. |
| 4 | `bcg-consulting-reality-voices` | company / career | yes | **Next** | Anonymous reviews, employee testimony, staffing practices, and working-hours claims need source weighting and protection against overgeneralizing from anecdotes. |
| 5 | `sato-teru-eight-category-dominance` | sports statistics | yes | Pending | The thesis is anchored to a specific in-season statistical snapshot and requires separation of date-stamped fact from durable interpretation. |
| 6 | `mali-sahel-history-state-france-russia` | geopolitics / history | yes | Pending | Historical material is relatively stable, but military rule, regional blocs, foreign-security actors, and current security conditions move quickly. |
| 7 | `pneumonia-how-serious-hospital-oxygen` | medicine / health literacy | yes | Pending | High-stakes domain. Guidance, severity tools, and practical interpretation must be held to a higher evidence and wording threshold than ordinary essays. |

## Execution policy

Do **not** edit all seven at once.

Use one principal article PR at a time:

**fresh research → date boundary → evidence map → counterevidence → canonical edit → Structure → Reading Mode decision → QA → merge**

After each article, decide whether the Batch 4 conventions need refinement before moving on.

## Article 1 — Completed

`claude-delegation-horizon-opus-fable`

Research audit:

- `RESEARCH_BATCH_4_01_CLAUDE_DELEGATION_HORIZON_2026-08-31.md`

### Editorial outcome

The central `delegation horizon / 委譲距離` idea was retained, but its evidence boundary was rebuilt:

- corrected the superseded Sonnet 5 Sep. 1 pricing assumption; `$2 / $10` had been made permanent;
- separated verified product facts from vendor-reported customer results, third-party benchmarks, practitioner reports, and editorial synthesis;
- kept the Stripe 50-million-line migration case but identified the `>2 months → 1 day` figure as a vendor-published customer report;
- explicitly labeled `delegation horizon` as the article's operational heuristic rather than an Anthropic taxonomy or validated metric;
- replaced fixed Sonnet / Opus / Fable role ranks with a routing hypothesis based on work length, ambiguity, self-verification burden, human intervention interval, external verifiability, and cost;
- synchronized the existing English Mix — **Reading Mode: UPDATE**.

### Writing Architecture

Final browser-compiled Structure:

- **10 structured paragraphs**;
- **40 structured sentences**.

This raised the shared regression suite from seven to **eight article fixtures**.

### Implementation

Principal article PR:

- PR #51 — `Modernize Claude delegation horizon with freshness-safe evidence`
- merge: `075945913a9b7eabbedd715ec365b72f23d8b034`

Fixture correction:

- PR #52 — `Align Claude Structure fixture with compiled profile`
- merge: `6ca1cf199cc96974114f93853570fcefd515c735`

### Final QA gate

Visual QA `33389369825` — **success**:

- strict audit: 0 errors / 0 warnings / 0 known drift;
- static tests: 40 / 40;
- Reading Mode QA: success;
- Argument Structure QA: **8 fixtures passed**;
- Page Reader QA: success;
- desktop/mobile Visual QA: success;
- horizontal overflow: none;
- console/page errors: none;
- QA artifacts: uploaded.

Pages `33389368946` — **success**.

Article 1 is closed.

## Article 2 — Completed

`physical-ai-embodied-intelligence-deployment`

### Editorial outcome

- treated Physical AI as an umbrella framing, not a single settled academic taxonomy;
- separated Physical AI, Embodied AI, VLA and World Model;
- qualified VLA architecture instead of assuming a universal monolithic end-to-end stack;
- treated humanoid morphology as one task/environment design choice rather than the definition of Physical AI;
- separated 2026 Gemini Robotics / GR00T snapshots from durable robotics concepts;
- introduced **Capability → Reliability → Deployability** as an article-level diagnostic model;
- used `Deployment Gap` as an editorial working concept, not a validated robotics metric;
- synchronized the existing English Mix — **Reading Mode: UPDATE**.

### Writing Architecture

Final browser-compiled Structure:

- **12 structured paragraphs**;
- **48 structured sentences**.

This raised the shared regression suite to **nine article fixtures**.

### Implementation and QA

- PR #55 — principal article/research/English Mix/Structure — merge `9d541160338a383bc11532644e4fdf605b05aa00`
- PR #56 — fixture alignment — merge `cef2b4a80c35a821684e9f4a2e6318882883108d`
- PR #58 — article mobile wrap correction — merge `712a0b7ab04f565f66e482cb96703ae454217cc8`
- PR #59 — general Reader long-token wrap safeguard — merge `6f1d248d22af6ca50e31ad3da3775a48f1bec3d7`
- Visual QA `33391989848` — **success**
  - strict audit green;
  - static tests 40 / 40;
  - Reading Mode QA green;
  - Argument Structure QA: **9 fixtures passed**;
  - Page Reader QA green;
  - desktop/mobile Visual QA green;
  - no horizontal overflow or console/page errors.
- Pages `33391989374` — **success**.

Article 2 is closed.

## Article 3 — Completed

`rakuten-securities-information-infrastructure`

Research audit:

- `RESEARCH_BATCH_4_03_RAKUTEN_SECURITIES_INFORMATION_INFRASTRUCTURE_2026-08-31.md`

### Editorial outcome

The older article was a useful but fast-aging feature catalog. The revised version keeps the original discovery — a brokerage account can be useful as a research surface — while separating current product facts from durable service architecture.

- corrected Money Bridge from the stale 0.38% / 0.32% snapshot to the 2026-08-03 snapshot of **0.48% / 0.42% before tax**, with explicit variable-rate wording;
- qualified 14 million as cumulative general accounts and NISA 7 million as a dated account-count claim rather than active engagement or quality;
- preserved Nikkei Telecom, Company Shikiho and Barron's Digest access while defining what each entitlement does and does not include;
- introduced **Discover → Understand → Fund → Execute → Review** as an article-level working model, not an official Rakuten framework;
- separated `commission zero` from `total economic cost zero`;
- added limits around commercial provider incentives, reward-driven behavior and information abundance vs investment-decision quality;
- no English Mix exists — **Reading Mode: DEFER**.

### Writing Architecture

Final browser-compiled Structure:

- **11 structured paragraphs**;
- **44 structured sentences**.

This raised the shared regression suite to **ten article fixtures**.

### Implementation

Principal article PR:

- PR #60 — `Modernize Rakuten Securities as an information-friction system`
- merge: `f9e255f88e26da0e02b5eb4656b90b95376fba4a`

Shared-fixture repair:

- PR #61 — `Restore DMCA Structure regression profile`
- merge: `c5e42f6339579d12959c5e739bdbf271ea7ee938`

PR #60 accidentally rolled one existing DMCA fixture expectation backward while adding the Rakuten fixture. PR #61 restored only that shared expectation; no Rakuten prose or assertion strictness was weakened.

A subsequent intermediate main run was blocked by an unrelated parallel English Mix registration gap. That separate publishing-integrity issue was later resolved on main.

### Final QA gate

Definitive latest-main validation on `b46189afb9805fc9618ae03ad5454f79bfe1901f`:

Visual QA `33467384785` — **success**:

- strict audit: 0 errors / 0 warnings / 0 known drift;
- canonical: 208;
- English Mix: 137;
- Español Mix: 1;
- Structure canonicals: 25;
- Rakuten Structure: 44 sentences;
- static tests: 40 / 40;
- Reading Mode QA: success;
- Argument Structure QA: **10 fixtures passed**;
- Page Reader QA: success;
- desktop/mobile Visual QA: success;
- horizontal overflow: none on tested viewports;
- console/page errors: none;
- QA artifact: `9785349946`.

Pages `33467383835` — **success**.

Article 3 is closed.

## Article 4 — Next

`bcg-consulting-reality-voices`

Primary review question:

> How much can anonymous employee reviews and practitioner testimony actually support claims about BCG as an organization, and where must the article stop short of generalizing individual experiences into company-wide facts?

Required research boundaries before canonical editing:

- current BCG company / office / career facts from primary sources;
- employee-review evidence separated by platform, date, geography and role where possible;
- staffing, travel, working-hours and evaluation claims weighted by source type rather than repeated as universal practice;
- current company policy separated from historical or anecdotal experience;
- favorable and unfavorable testimony both represented when material;
- causal language kept below the strength of the evidence.

Existing English Mix: present. Therefore the final Reading Mode decision must be **KEEP / UPDATE / RETIRE**; `DEFER` is not allowed.

## Batch 4 completion gate

For every article:

- important current claims re-researched;
- information basis date explicit when needed;
- primary vs vendor-reported vs independent evidence distinguished;
- current snapshot separated from durable thesis;
- original model clearly labeled;
- selective Structure added only after canonical stabilizes;
- existing derived mode classified KEEP / UPDATE / RETIRE;
- strict audit 0 errors / 0 warnings / 0 known drift;
- static tests green;
- Reading Mode QA green;
- all registered Argument Structure fixtures green;
- Page Reader QA green;
- desktop/mobile Visual QA green;
- Pages deployment green after merge.

Batch 4 is complete only when all seven articles pass this gate and their derived-mode decisions are recorded.
