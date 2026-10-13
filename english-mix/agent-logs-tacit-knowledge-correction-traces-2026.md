---
id: agent-logs-tacit-knowledge-correction-traces-2026
title: "When AI gets corrected――エージェントログに眠る暗黙知をどう使うか"
subtitle: "From agent traces to decision rules: why saving a chat is only the beginning"
created: "2026-10-13"
updated: "2026-10-13"
type: "AI・知識経営研究エッセイ"
status: "完成"
tags: ["AIエージェント", "暗黙知", "ナレッジマネジメント", "業務改善", "知識創造", "調査", "開発"]
keywords: ["agent traces", "tacit knowledge", "domain knowledge", "correction logs", "process mining", "Reflexion", "SECI", "agent evals", "CoT"]
grow: 5
abstract: "A correction exposes expert judgment, but a transcript alone is not knowledge. This essay connects tacit knowledge, agent tracing, and evaluation, then proposes evidence, decision cards, and tests as a practical system."
---

# When AI gets corrected――エージェントログに眠る暗黙知をどう使うか

*From agent traces to decision rules: why saving a chat is only the beginning*

An AI agent produces an answer, and a user replies: “No, that's not the point.” Sources are outdated; market boundaries are wrong; the interface fails on mobile. このcorrection loopは非効率に見える。でも、a failed attempt often reveals the standards the expert never thought to explain. A task log is also a record of judgment.

The original post urges daily agent users—especially people running strange experiments, angrily correcting mistakes, and searching the web repeatedly—to save their input/output histories. たしかにcorrection contains pieces of domain expertise. But an archive is not yet knowledge. The question is not merely what to save, but **what deserves to become a reusable rule**.

We connect tacit knowledge, process logs, and agent evaluation through research, operations, and coding examples. 目的はchat volumeを増やすことではない。It is to make **the reasons behind human rejection** inspectable and transferable.

## 1. Expertise appears in corrections

Ask an expert for every rule they use, and you get general advice. Show a weak deliverable, and the response becomes specific: 「year-on-yearではなくsame month last year」「audienceが違う」「secondary articleではなくprimary source」。A correction reveals criteria that routine self-explanation leaves hidden.

Consider a hypothetical football-club campaign. An agent suggests more advertising; an operator says: 「near sell-outなのでtotal attendanceは主目標ではない。Focus on one seat category and repeat visits」。The valuable output is not a new campaign. It is a decision rule: **check inventory constraints and the true KPI before choosing tactics**.

“I hate this design” is too vague to reuse. 「Mobile portraitでone-handed操作をするとmain actionに届かない」 is testable. The signal is not anger itself; it is **the condition that makes the criticism valid**. Translate feelings into observable criteria.

## 2. Tacit knowledge is not fully expressible

Michael Polanyi's *The Tacit Dimension* explains that humans know more than they can articulate. 顔の識別やexpert intuitionをすべてproceduresへ置き換えることはできない。This is the point of **tacit knowledge**, not a temporary documentation problem. [Polanyi Society](https://polanyisociety.org/glossary-of-polanyis-terminology/)

Nonaka and Takeuchi study interaction between tacit and explicit knowledge. Their concept of *externalization* is relevant, but one chat does not externalize someone's whole expertise. 記録できるのはa judgment expressed under particular conditions. [Oxford University Press](https://academic.oup.com/book/52097)

A trace is not a portable copy of an expert. It is evidence of one situated judgment becoming visible. 別のcontextに移すならexpert review and validationが必要。Logs help us **ask better questions of expertise**, rather than bypass expertise.

## 3. Five elements hidden in a correction

A correction is not merely a better prompt. Extract five objects: **goal, constraint, acceptance criterion, exception, and evidence**. 「次はcarefulに」は使えないsummary。We need to know exactly which constraint prevented which failure.

Suppose an agent mixes Japan and global market figures, then adds overlapping categories. The analyst corrects it: 「geographic scopeを分離」「primary evidenceとestimatesを区別」「avoid double counting」。These are separate evaluation rules. Keeping the final table while discarding the revision history loses the reason for its structure.

A reusable knowledge unit is **context → first attempt → correction → rationale → revision → outcome → reuse conditions**. The outcome is essential: confident human feedback can be wrong. An unverified correction must remain a hypothesis, not an institutional rule.

In *Reflexion*, Noah Shinn and colleagues preserve verbal feedback from attempts as episodic memory for future decisions. これはlearning from feedbackの実例だが、saving arbitrary workplace logsだけで同じ効果が出るという証明ではない。[NeurIPS 2023](https://papers.nips.cc/paper_files/paper/2023/hash/1b44b878bb782e6954cd888628510e90-Abstract-Conference.html)

## 4. A trace is not an AI's complete thought process

What an agent log contains depends on the platform. OpenAI's Agents SDK can capture generations, tool calls, and handoffs as traces. But **observing actions is not observing all internal computation**. [OpenAI tracing](https://openai.github.io/openai-agents-python/tracing/)

Separate visible explanations from hidden **Chain of Thought (CoT)**. OpenAI explains that raw reasoning tokens are not exposed, although supported models may return a summary. 「ログからintentを推測できる」と「the exact internal reasoning was captured」は別問題。[OpenAI reasoning guide](https://developers.openai.com/api/docs/guides/reasoning)

A final code diff shows what changed, but may not explain why alternatives were rejected. A post-hoc explanation can sound plausible without being faithful. Separate **observed actions**, **agent-stated rationale**, and **human-confirmed intent**. Provenance beats a smooth retrospective story.

## 5. Search history reveals evidence boundaries

Search-heavy traces show how someone changes queries, checks official releases, and revises the scope of evidence. These steps reveal **what counts as the market and what counts as a source**. ただしsearch volume aloneはexpertiseの証明にならない。A refined hypothesis and endless wandering can produce equally long histories.

In sports video, production, transmission, streaming, and asset management may overlap. A correction such as 「check category inclusion before summing」 can transfer to another study. Company revenue and contracts change over time. **Keep the acceptance criterion, not a stale number masquerading as permanent truth.**

Useful research provenance includes query, access date, publisher, inclusion/exclusion reason, definitions, and open questions. A successor can see what was verified and what has expired. 検索ログは単なるbrowsing historyから、**an index of evidence and revalidation points**になる。

## 6. Coding logs preserve reasons for a design

Anthropic's Claude Code documentation supports session resumption and machine-readable output. Yet what is stored, where, and for how long depends on configuration. **Do not assume every tool call or local action has been archived.** [Anthropic CLI reference](https://docs.anthropic.com/en/docs/claude-code/cli-usage)

Imagine a coding agent building a beautiful three-column UI. The user responds: 「mobile portraitではsmall textになる。Need collapsible columns」。The diff records the feature, but often not the user condition that justified it. Capturing the correction protects design intent from future refactoring.

Link major decisions to the screen or file, rejected alternatives, and acceptance tests. Commits show changes; agent traces show attempts; user validation shows outcomes. Their combination explains **why the specification matters**, not merely how it was implemented.

## 7. More logging can mean more exposure

A trace may contain client data, credentials, personal information, internal plans, and accidental tool-output disclosures. More raw history means more possible insight—but also more attack surface. **Maximum retention is not maximum knowledge value.**

OpenAI provides controls for excluding sensitive data from traces or disabling tracing. That is a capability, not a blanket security guarantee. 保存先、external transfer、access control、deletion policiesを業務上の許諾と照合する。[OpenAI docs](https://openai.github.io/openai-agents-python/tracing/)

Classify before capture: public, restricted, and prohibited. Apply separate permissions and retention periods to raw traces and curated cards. Do not convert an employee's personal history or a client's files into shared organizational assets without authorization. **Knowledge engineering needs legitimate governance, not just good storage.**

## 8. Build three layers: evidence, decisions, tests

Layer one is **raw evidence**: permitted prompts, outputs, tool calls, sources, changed files, timestamps, and a case identifier. Process mining also treats case/activity/time as core event-log fields. ここに残るものはobservationsであり、validated rulesではない。[Event-data reference](https://processmining.org/event-data.html)

Layer two is a **decision card**: goal, error, correction, rationale, evidence, scope, exclusions, confidence, owner, and original trace. 「Check overlap before adding markets」はportable。「This campaign works for this match」はcontext-specific. A shared schema must not erase the difference.

Layer three is a **test**: no double counting, reachable mobile controls, verified primary sources. OpenAI's agent-evaluation guidance connects trace inspection with repeatable datasets and evaluations. ただしa high score means little if the criterion is wrong.[OpenAI agent evals](https://developers.openai.com/api/docs/guides/agent-evals)

The layers serve distinct purposes: **observation, interpretation, evaluation**. Mark lessons as observed, hypothesized, or validated, and keep links to the original record. The core task is **compression without losing provenance**.

## 9. Test the idea with a seven-day pilot

Select about ten permitted sessions from one week. Extract one high-signal correction from each. Include failed searches, false corrections, and unresolved outcomes. A success-only sample cannot reliably show where failure boundaries lie.

Give comparable tasks to another worker or agent who has not seen the original logs. Compare **with-card versus without-card** outcomes: first-pass acceptance, revisions, verification time, severe omissions, and harmful overconstraints. 十件はcausal proofではない。でもa useful pilot for improving the cardsにはなる。

Counting cards creates a warehouse. Measure reuse, avoided repeated mistakes, and how quickly mistaken rules are retired. Knowledge becomes an asset when it reduces future decision burden—not when the archive simply grows.

## 10. The bigger question: who is learning?

Decision cards can support onboarding, process redesign, KPI alignment, and software maintenance—not only agent performance. If the same correction repeats across projects, the root cause may be a broken organizational workflow rather than a weak model.

Expert opinions, client data, agent attempts, and team agreements appear together but have different ownership and permissions. Using a learning archive to surveil individual workers may suppress candid corrections. **Inspecting work processes and rating workers are different design problems.**

Saving logs is a useful start. The next question is: **what standard did the person invoke when saying “No”?** Test it, attach its scope, and revise it as conditions change. そうして初めてagent frustration becomes transferable expertise. The real asset is not conversation volume, but the **boundaries of judgment** made visible through conversation.

## Sources and scope

Sources include [Polanyi Society](https://polanyisociety.org/glossary-of-polanyis-terminology/), [Nonaka and Takeuchi](https://academic.oup.com/book/52097), [event data](https://processmining.org/event-data.html), [Reflexion](https://papers.nips.cc/paper_files/paper/2023/hash/1b44b878bb782e6954cd888628510e90-Abstract-Conference.html), [OpenAI tracing](https://openai.github.io/openai-agents-python/tracing/), [agent evals](https://developers.openai.com/api/docs/guides/agent-evals), [reasoning](https://developers.openai.com/api/docs/guides/reasoning), and [Anthropic CLI](https://docs.anthropic.com/en/docs/claude-code/cli-usage).

The starting post was supplied as text; the author, publication date, and original URL were not verified. The sports, research, and UI examples are **illustrative**, not reported cases. The three-layer architecture and seven-day pilot are proposals developed for this essay, not established empirical findings.

