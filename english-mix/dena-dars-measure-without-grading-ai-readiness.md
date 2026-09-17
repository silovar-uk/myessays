---
id: dena-dars-measure-without-grading-ai-readiness-en-mix
title: "An AI Score That Does Not Directly Grade You――DeNA「DARS」は何を測っているのか"
subtitle: "Not usage count, but a map for redesigning work and organization"
created: "2026-09-17"
updated: "2026-09-17"
type: "Essay"
status: "完成"
tags: ["AI", "DeNA", "DARS", "organization transformation", "human development", "English Mix"]
keywords: ["DeNA AI Readiness Score", "DARS", "AI native company", "AI maturity model", "AIオールイン", "AI adoption", "organizational maturity", "workflow redesign"]
favorite: 5
grow: 5
abstract: "DeNA’s DARS scores both individuals and organizations across five levels, yet it is not directly tied to personnel evaluation. The criteria are intentionally abstract and are localized by each department. Official materials, 2026 operating results, marketing and QA examples, and AWS/Microsoft maturity models suggest that DARS is less about being “good at AI” and more about how far a person or team can redesign work around AI."
---

# An AI Score That Does Not Directly Grade You

## DeNA「DARS」は何を測っているのか

“We score AI skills on five levels.” The obvious next word sounds like evaluation. 高得点なら昇給、低得点ならtraining。普通はそう想像する。

But DeNA’s DARS（DeNA AI Readiness Score）does **not directly connect to individual personnel evaluation**. しかも制度設計者のinterviewによれば、公開されたLevel 1–5の外側に、non-public “EXTRA Level”まで構想されている。

It is a score, but not quite a grade. 5段階なのに、there is apparently more beyond it.

Following this odd design reveals something larger. DARS seems less interested in “how skillfully can you operate AI?” and more in **how far you can redesign your work, your team, and eventually the business around AI**. そのtransformationまでの距離を測る仕組みに見えてくる。

[DeNA “DARS”](https://dena.ai/vision/dars/) / [DeNA press release, Aug. 6, 2025](https://dena.com/jp/news/5279/) / [Fullswing by DeNA interview](https://fullswing.dena.com/archives/100171/)

---

## DARS is not an AI talent ranking

DARS entered full operation at the end of August 2025. 背景には、同年2月のDeNA “AI All-In” declarationがある。Its three pillars were company-wide productivity, stronger existing businesses, and creation/growth of new AI businesses.

The problem is simple: deploying AI does not tell you whether the company has become AI-native. アカウント数、usage count、training completionは数えられる。But those numbers do not reveal whether the way work is done has actually changed.

So DARS separates two coordinates: an **individual level** for each employee and an **organizational level** for teams and departments. 半期ごとにcurrent positionを可視化し、次のgoalを置く。

<figure>
  <img src="https://silovar-uk.github.io/myessays/assets/dars/dars-two-axis.svg" alt="DARSを個人レベルと組織レベルの二軸で捉え、AI活用の現在地から業務・組織・戦略の再設計へ進む概念図" loading="lazy">
  <figcaption>Conceptual view of DARS. 個人がAIを使えるだけではなく、その活用がteam standard、workflow design、business strategyへ広がるかを別軸で見る。</figcaption>
</figure>

If you read this as a program to “increase AI experts,” you miss part of the point. 個人levelだけが高くても、teamがその人に依存していればorganizational maturityは上がりにくい。DARS intentionally uses the share of members above certain levels so one “AI hero” does not carry the whole organization.

---

## The higher the level, the less it is about AI itself

At a high level, the individual ladder reads like this: **know → use → choose/orchestrate → redesign work → transform business**.

Level 1 is basic knowledge and habit. Level 5 is the ability to design systems and business transformation around AI. A June 2026 Web担当者Forum interview shows how DeNA marketing localized the ladder: Level 2 = run an ad workflow with a single AI; Level 3 = choose multiple AI tools and internal knowledge by purpose; Level 4 = create repeatable workflow redesign and spread it across the team; Level 5 = invent new AI-first processes and resource allocation.

In other words, the higher you go, the less this is about being “good at prompting.” 評価対象がtool operationから**design capability**へ移っていく。

<figure>
  <img src="https://silovar-uk.github.io/myessays/assets/dars/dars-ladder.svg" alt="DARSの考え方を、基礎利用、使い分け、再現化、業務再設計、事業変革へ進む5段階の階段として示した概念図" loading="lazy">
  <figcaption>Conceptual summary based on public information. 上位ほど “use AI” から “redesign work around AI” へ重心が移る。</figcaption>
</figure>

[Web担当者Forum: “あなたのAIスキル、何レベル？”](https://webtan.impress.co.jp/e/2026/06/11/52686)

---

## Designing intentional ambiguity

At this point a fair question appears: **aren’t the criteria too abstract?**

DeNA essentially says yes—and that this is intentional. In a 2026 interview, Masaki Sawamura explained that specific tool names and rigid quantitative metrics were deliberately omitted. AI tools change fast, and each department works differently. 細かく固定すると、the framework itself becomes obsolete before the work does.

Instead, each department translates DARS into local practice. DeNA’s QA organization created a **QA-specific DARS** around its DAAQ tool rather than using the corporate definition literally. Marketing likewise translated Levels 2–5 into concrete ad-delivery work.

This looks less like “vague, so leave it to the field” and more like an OS/app relationship. 全社はcommon directionを定義し、各部門はそのdirectionを自分たちのworkflowへ実装する。

[DeNA Engineering: QA AI strategy](https://engineering.dena.com/blog/2025/12/dena-qa-ai-strategy/) / [Web担当者Forum](https://webtan.impress.co.jp/e/2026/06/11/52686)

---

## Comparing other maturity models reveals DARS’s twist

I wondered whether DARS was unusually strange, so I checked other AI maturity models.

AWS moves through **Envision → Experiment → Launch → Scale**, shifting from isolated trials to production, reusable capabilities, and enterprise-wide adoption. Microsoft’s Agentic AI maturity model similarly moves from **Initial → Repeatable → Defined → Capable → Efficient**, from individual experiments toward governed, standardized, agent-first operations.

The common pattern is striking: higher maturity does not mean “more AI usage.” It means **more repeatable systems**. 個人技がprocessになり、processがorganizational capabilityになり、最後にstrategyになる。

What is distinctive about DARS is that it connects an enterprise maturity idea to each employee’s semiannual cycle. 組織論だけではなく、“Where am I?”というindividual mapと、“Where are we?”というteam mapを重ねている。

[AWS Prescriptive Guidance: Generative AI maturity model](https://docs.aws.amazon.com/prescriptive-guidance/latest/strategy-gen-ai-maturity-model/overview-levels.html) / [Microsoft: Agentic AI adoption maturity model](https://learn.microsoft.com/en-us/agents/adoption-maturity-model/)

---

## Not grading the score is the point

So why not connect the score directly to personnel evaluation?

DeNA’s stated reason is straightforward: the core of evaluation remains **results**. AI usage itself is not the accomplishment. AI is expected to help people attempt higher goals and produce better outcomes. DARS therefore informs goal-setting rather than becoming the grade itself.

There is another practical consequence. If “DARS Level 4 = high performance rating,” then raising the level itself quickly becomes the target. 新しいtoolを触った回数やprompt countのようなproxy metricsを増やせば、the system becomes easy to game.

DARS cannot eliminate gaming by itself. Still, by keeping **business outcomes** as the core evaluation and placing DARS as a growth map, it avoids making the measuring stick identical to the destination.

This answers the initial paradox. It is not that DeNA refuses to evaluate people. **It evaluates something else: results.** DARS remains the map.

---

## Experiment: a PR-team version of DARS

At this point DARS can look like a framework for engineers or very large companies. So I pushed it one step too far: what would a **PR/communications version** look like? This is my own thought experiment, not an official DeNA model.

Level 1: summarize, proofread, brainstorm with AI. Level 2: reliably run routine flows such as announcements, FAQs, social drafts, and meeting summaries with AI. Level 3: choose tools and internal knowledge by purpose, grounding outputs in past posts, guidelines, FAQs, and project documents to improve quality.

At Level 4, the target is no longer personal time-saving. You redesign the whole PR flow: request intake → information structuring → draft → review → publish → retrospective. テンプレート、checks、searchable knowledge、AI handoffまで標準化し、誰が担当しても一定品質で回るようにする。

Level 5 goes further into **a communications strategy that is possible because AI exists**. AI can connect the publishing calendar, response data, fan interests, and media opportunities, while humans focus on consensus-building, interviews, judgment, relationships, and accountability for the message.

Something funny happens when you build the ladder. The higher the level, the less central “getting AI to write copy” becomes. 代わりにinformation architecture、standardization、data hygiene、role design、decision designが前へ出てくる。

---

## DARS in 2026: after Level 3 comes… data hygiene

A framework only matters if something happens after launch. DARS now has some follow-up evidence.

A March 2026 DeNA Engineering report says **most organizations had reached Level 3**. A June 2026 Web担当者Forum interview likewise reported Level 3 as the center of gravity for both employees and organizations, while only a few employees were at Level 5. The original August 2025 goal had been all organizations at Level 2 or above by fiscal year-end, so public information suggests progress beyond that milestone.

The same interview describes efficiency gains of at least 2× and, for some people, up to 10× through AI initiatives including DARS. ただしこれはexternally audited productivity metricではなく、interview claimとして読むのが適切だ。

More interestingly, the next bottlenecks are described as **organizational transformation** and **data management**. As models improve, stale, incomplete, noisy, or inaccessible internal data becomes the constraint. DeNA interviewees also argue that consensus-building, vision-making, and moving people remain human work.

We started with AI maturity and somehow ended at data hygiene and human relationships. かなり地味だ。And that is probably what makes it believable.

[DeNA Engineering: AI Day 2026 report](https://engineering.dena.com/blog/2026/03/ai-day2026-intern-event-report/) / [Web担当者Forum](https://webtan.impress.co.jp/e/2026/06/11/52686)

---

## A score about AI ends up measuring the ability to change work

At first, I assumed DARS was basically an “AI aptitude score” for employees.

After researching it, it looks quite different.

Scoring still has risks. Abstract criteria can vary by manager; visible levels can become goals in themselves; and DARS alone cannot prove that AI adoption caused productivity gains.

Still, DARS offers a useful idea about capability in the AI era. Capability is not knowing the newest tool. It is the ability to articulate work, separate what AI can take from what humans should retain, make the process repeatable, turn it into a system others can use, and eventually change how the business operates.

So the most interesting part of DARS may not be Level 5. It may be that DeNA created a score and then **refused to make the score itself the destination**.

It looks like a measurement of AI. 実際には、it is trying to ask a bigger question: **can this organization change the way it works?**
