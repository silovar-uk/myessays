---
id: openai-dots-five-stops-always-on-agent
title: "「止める」が5種類あるAI――OpenAI dots is not a chat, but an ongoing responsibility holder"
subtitle: "always-on work, proactive research, cloud computer, permissions――dotsを“smart chat”ではなくoperating system for delegated workとして読む"
created: "2026-10-05"
updated: "2026-10-05"
type: "リサーチエッセイ"
status: "完成"
tags: ["AI", "OpenAI", "dots", "AI agents", "work design", "automation", "prompt design"]
keywords: ["OpenAI dots", "always-on agent", "GPT-6 Astra", "proactive research", "Auto-review", "Custom Rules", "ChatGPT Work", "Codex"]
grow: 5
abstract: "OpenAI’s dots, announced on September 29, 2026, are always-on agents with their own cloud computers and browsers. They can keep multiple responsibilities alive, notice changes, run proactive research, and coordinate Work or Codex tasks. This essay starts from a strange operational detail—Pause does not stop everything—and uses it to explain why dots are better understood as a persistent work system than as a smarter chatbot. It then develops practical use cases, prompt patterns, and permission design for long-running work."
---

# 「止める」が5種類あるAI
## OpenAI dotsは、チャットではなく仕事を持ち続ける存在だった

OpenAI describes its new AI agent “dots” with a surprisingly human metaphor. 各dotは「新入社員に用意するものとほぼ同じ環境」を持ち、its own cloud computer and browserを与えられて仕事を始める、という。

A new employee can usually hear “that’s enough for today” and go home. ところがdotsでは、Pauseを押しても、それだけでeverything does not stop. OpenAIの操作ガイドでは、current main taskを一時停止する操作、delegated workを止める操作、recurring scheduleを解除する操作が別々に存在する。Disconnecting an app stops new access, but it does not automatically erase information already incorporated into the dot’s context. dotそのものを削除しても、files, ChatGPT conversations, and Codex threads created elsewhere remain separately stored.

AI has no single “clock out” button. 正確には、there is no single thing called “the work” to stop.

That tiny awkwardness reveals the product. これは単にChatGPTを24/7 awakeにしておく機能ではない。Conversation, memory, research, delegated tasks, schedules, and external permissions live as different kinds of state, and the dot keeps work moving across a longer time horizon. だから理解の入口は“what can it do?”より、“what does it continue to hold?”に置いたほうがよい。

![OpenAI dots公式ビジュアル](https://images.ctfassets.net/kftzwdyauwt9/KKSjto3MtJguvsLQsM1Bp/1704a6937d22b1bb3cac38dc5f43f9df/dots-o.svg)

*OpenAI公式のdotsビジュアル。The name looks light; the operating model is much closer to a work system. 出典：[OpenAI「Introducing dots」](https://openai.com/index/introducing-dots/)*

> **Information date: 2026-10-05**
>
> This essay checks OpenAI’s launch post, ChatGPT Learn guides, Help Center, safety post, and GPT-6 Astra System Card as primary sources. 製品はlaunch直後で仕様変更の可能性が高い。Safety evaluation numbers are test results under specific conditions, not production incident rates. 実務活用の分類とprompt examplesは、公開仕様から導いた本稿のproposalである。

## 1. 「一時停止（Pause）しても全部は止まらない」ところから、dotsの構造が見える

A normal chat AI feels like one bounded interaction. 質問し、返事を受け取り、画面を閉じる。The underlying system is complex, but from the user side it behaves like “the thing I’m talking to right now.”

Dots break that simplicity. OpenAIのguideによると、dotはconversationの外でも仕事を続け、必要に応じてpause and wake up laterし、複数の作業をbackground agentsへ並行してdelegateできる。Recurring work is stored separately as a schedule. つまり一つのdotの下に、different clocks and different task lifetimesがぶら下がる。

Memory is also not one thing. dotはrelevant ChatGPT memoryを受け取りつつ、自分自身でもpreferences, decisions, ongoing responsibilitiesについてnotesを持つ。OpenAI says those individual dot memories cannot currently be viewed, edited, or deleted one by one. Disconnecting a plugin stops new access, but it does not automatically remove context already learned by the dot.

Once you line these pieces up, calling dots “a better chatbot” becomes too vague. むしろ、long-lived work coordinatorに近い。Conversation is only one interface into that coordinator.

That changes the skill required from the user. 普通のchatでは“good question”を考えることが重要だった。With dots, you also need to define what ongoing responsibility it owns, what it must never do alone, and which changes deserve escalation. Prompt design expands from wording a request to designing a role.

参照：[ChatGPT Learn「Meet dots」](https://learn.chatgpt.com/docs/dots) ／ [ChatGPT Learn「Tasks and memory」](https://learn.chatgpt.com/docs/dots/tasks-and-memory) ／ [OpenAI Help Center「Dots privacy, security, and safety FAQs」](https://help.openai.com/en/articles/20001529-dots-privacy-security-and-safety-faqs)

## 2. dotsは「回答するAI」より、「変化が起きても仕事を持ち続けるAI」に近い

OpenAI announced dots on September 29, 2026 as “always-on agents.” GPT-6 Astraを搭載し、each dot has its own cloud computer and browser. Through the plugin ecosystem it can connect to more than 4,000 apps, and the same dot can be reached from ChatGPT, Slack, Teams, and voice.

The important part is not raw compute. dotは、assigned workをconversation終了後も追い、状況が変われば続きを考え、judgmentが必要なところでuserへ戻す。OpenAI’s examples include watching customer feedback and preparing tested pull requests, revising launch materials when product scope changes, and rerunning scientific analysis when new data arrives.

![dotsを仕事の調整役として捉えた図](https://silovar-uk.github.io/myessays/assets/openai-dots-responsibility-loop.svg)

*図1：本稿による整理。A dot keeps the responsibility alive, notices changes in sources, delegates background work when useful, passes consequential actions through review, and returns outcomes to the user.*

If we overemphasize the word autonomous, it sounds like an AI that does anything it wants. しかし公開仕様を見る限り、dotsはautonomy and boundariesをセットで設計している。Proactive research is read-only, while actions such as sending messages or changing app content go through separate permissions and checks.

So the novelty is not simply “more automation.” **It is the ability to preserve work context across time, react to change, and manage action boundaries as a separate layer.** AI stops being only a one-shot tool and starts attaching itself to an ongoing unit of work.

参照：[OpenAI「Introducing dots」](https://openai.com/index/introducing-dots/) ／ [OpenAI「How we build safety, security, and privacy into dots」](https://openai.com/index/how-we-build-safety-security-and-privacy-into-dots/)

## 3. 通常のChatGPT、定期タスク、Work、Codexとは「時間の持ち方」が違う

To understand dots, it helps to compare existing product modes mechanically. これはOpenAIのofficial taxonomyではなく、公開仕様から作ったpractical mental modelである。

- **通常のChatGPT**：いま考えたいことをconversationで処理する。The center is the current request and response.
- **定期タスク**：毎朝9時、every Monday、supported event発生時など、predefined time or triggerで同じ種類の仕事を動かす。
- **ChatGPT Work／Codex**：research, file operations, web actions, code changesなど、bounded chunks of executionを行う。A dot can create these tasks, watch the results, and send follow-up instructions.
- **dots**：仕事そのものをongoing responsibilityとして持ち、状況を見ながら“what should happen next?”を追う。A fixed schedule is not required for every follow-up; the dot can pause and wake later.

For example, “summarize three competitors every morning” fits scheduled tasks. しかし「競合の動きを追い、our business hypothesisを変えるほど重要なchangeだけ深掘りし、past materialsとの矛盾を確認し、必要ならadditional researchを起こして、decisionが必要なときだけ呼んで」はdotsに近い。

The difference is temporal structure, not task size. Scheduled tasks are strong at clocks; Work and Codex are strong at execution. dots are strong at preserving the state that “this responsibility is still open.”

In that sense, dots do not simply replace the others. 必要なときにそれらを使うcoordinatorとして見ると分かりやすい。AI products look more complicated, but splitting them into conversation, scheduled execution, task execution, and ongoing responsibility makes the landscape cleaner.

参照：[ChatGPT Learn「Scheduled tasks」](https://learn.chatgpt.com/docs/automations) ／ [ChatGPT Learn「Tasks and memory」](https://learn.chatgpt.com/docs/dots/tasks-and-memory)

## 4. いちばん変なのは、頼んでいない時間にも「役立つこと」を探す点である

Dots include a mechanism called proactive research. 利用者がその瞬間に依頼していなくても、the dot can read permitted connected sources, look for changes relevant to earlier work, and save private notes for itself.

This shifts the psychological boundary from traditional chat. Chat AI was “call it and it comes.” dotsは、allowed scopeの中で“it keeps looking even when you are not calling.” OpenAI gives examples such as noticing travel-plan changes or spotting a conflict between a new decision and an earlier draft.

However, proactive research itself is read-only. OpenAI says those background research tasks cannot directly send messages, change connected app content, or control a browser or your computer. 見つけたことを使ってsuggestionはできるが、follow-up actionには通常のpermissions and approvalsが必要になる。

That makes “what did I connect?” unusually important. Gmail, Drive, Slack, Calendar, GitHubをつなぐほど、a dot can connect events across tools. At the same time, connection scope becomes the information boundary. A capability question immediately becomes a permission-design question.

The key to useful proactivity is not “watch everything and tell me if anything happens.” 何をmeaningful changeとみなすかを定義することである。Deadline at risk, premise invalidated, KPI moved beyond threshold, the same customer complaint appeared three times――the clearer these criteria are, the more proactivity becomes work rather than noise.

A smarter AI does not necessarily need a shorter instruction. 長期で動くAIほど、goalよりboundary and notification criteriaの文章が重要になる。

参照：[ChatGPT Learn「Tasks and memory」](https://learn.chatgpt.com/docs/dots/tasks-and-memory) ／ [OpenAI「How we build safety, security, and privacy into dots」](https://openai.com/index/how-we-build-safety-security-and-privacy-into-dots/)

## 5. dotsに向く仕事は、「長い・変わる・つながる・判断が残る」の4条件で見分けられる

From here, this is the essay’s proposal based on the public specification. dotsへ渡す候補は、task sophisticationよりtime and dependency structureで選ぶとよい。

- **長い**：one-shotではなく、days to weeks以上追う必要がある。例：案件進行、採用、調査、開発、イベント準備。
- **変わる**：new email, document, number, requirement, external newsが入り、past judgmentをupdateする必要がある。
- **つながる**：email only, file onlyでは完結せず、multiple sources or workstreamsを横断する。
- **判断が残る**：not everything should be automated; promises, sends, spending, and policy changes still require human approval.

Using these four conditions makes practical candidates clearer. Consultingなら、案件のissue treeとunresolved itemsを持ち続けるresearch desk、meetings・mail・docsからdeadline and decisionsを更新するPMO support、public informationやinternal filesのchangeでanalysis assumptionsを更新するdeliverable maintenanceが合う。Developmentならcustomer requestsからsmall fixesを切り出し、Codexへimplementationを回し、review-ready itemsだけ戻す流れがある。Sports and entertainmentなら、match or eventに向けてticketing, promotion, sponsorship, operationsのchangesを横断し、“a gap that needs someone’s judgment”だけを上げる使い方が考えられる。

By contrast, “summarize this PDF” or “clean this spreadsheet once” often belongs in ordinary ChatGPT or Work. dotsへ渡すと、ongoing responsibilityというextra stateを作るだけになる。

The more useful AI becomes, the more tempting it is to delegate everything. But good delegation should reduce mental load, not create another manager to manage. **The value of dots is better measured by how much “unfinished work I have to keep in my head” can be externalized, not by the raw amount of automation.**

## 6. dots向けプロンプトは「依頼文」ではなく、職務記述書と運用規程を混ぜて書く

For one-shot generative AI, purpose, context, and output format can take you far. しかしdotsは、そのinstructionをtimeの中で使い続ける。So you need not only “what to produce,” but also “what to keep current, when to act, and where to stop.”

> **dots用・責任設計テンプレート**
>
> あなたは「［役割名］」として、［最終目的］を継続的に支援してください。参照してよい情報源は［情報源］です。常に最新に保つ対象は［台帳・資料・一覧］です。自律的に行ってよいのは［読み取り・分析・下書き・更新候補の作成］までです。［送信・公開・削除・支出・対外約束］は実行前に私の承認を求めてください。［前提の変更、期限遅延、数値の閾値超過、情報の矛盾］が起きたときだけ通知してください。通常の進捗は［保存先］へ記録し、通知を増やさないでください。判断材料が不足した場合は、推測で埋めず、足りない情報と意思決定事項を分けて提示してください。毎週［曜日・時刻・タイムゾーン］に、継続中の責任、止まっている理由、私の判断が必要な項目を短く棚卸ししてください。［終了日・終了条件］になったら、この責任を継続せず確認してください。

The important part of this template is the second half, not the role name. Notification thresholds, approval boundaries, no-guess rules, review cadence, and end conditions determine whether a long-running agent is safe to leave alone. 成果物formatより“放っておける条件”のほうがoperating qualityを左右する。

> **コンサル調査デスクの例**
>
> 「調査デスク担当」として、担当案件の主要仮説と根拠を継続管理してください。接続したDrive、Gmail、公開Webを参照し、新しい情報が既存仮説を支持・反証・修正するかを確認してください。根拠は出典URL、日付、事実、解釈を分けた根拠台帳に追記してください。新しい情報を見つけただけでは通知せず、①重要な前提が崩れた、②締切までに未解決論点が残る、③クライアントへ確認しないと進めない、のいずれかで通知してください。外部へのメール送信、共有資料の上書き、対外的な確約は私の承認なしに行わないでください。必要な追加調査は背景作業へ分けてよいですが、結論では事実・解釈・提案を分離してください。

In this form, it feels less like “asking AI nicely.” 代わりに、a manager delegating work must define responsibility, sources, authority, escalation, and completion. dots are interesting because prompt engineering begins to resemble organizational design.

The full reusable version is saved alongside this article as a [prompt file](https://github.com/silovar-uk/myessays/blob/main/prompts/2026-10-05-openai-dots-operating-prompt.md).

## 7. 自律性が増えたぶん、安全性の論点は「正答率」から「権限を越えないか」へ移る

A long-running agent can do more than return one wrong sentence. It can send the wrong email, edit the wrong file, or carry yesterday’s permission into today’s task. OpenAI explicitly treats these action-level mistakes as a core safety problem.

Dots combine connected-app permissions with Custom Rules, which can allow, require approval for, or block supported actions, plus Auto-review, a separate check before consequential actions. パスワード変更やfinancial transfersのようなstepsはuserへhand backされ、purchasesや一部のexternal actionsにはapprovalが必要になる。

![dotsの停止と権限を分けて考える図](https://silovar-uk.github.io/myessays/assets/openai-dots-five-stops.svg)

*図2：本稿による「止める」の分解。Main task, delegated work, schedules, information access, and dot-specific context have different lifetimes and different controls.*

The safety evaluations are revealing because they test problems created by persistence itself. In the GPT-6 Astra System Card, a dots evaluation delivered 500 simulated emails per rollout across 100 valid rollouts, including 16,600 attack emails in total, and observed no scored attack success. 一方、mid-taskでpermission or scopeが変わるevaluationでは45/49、91.8%がpassした。In another chained-task evaluation, no severe breach or exfiltration was observed, but moderate scope-violation flags rose from 8.6% with five intervening tasks to 19.7% with ten.

That does not mean “dots are dangerous,” and it does not mean “safety is proven.” These are controlled evaluations, and OpenAI itself notes their limits. むしろ新しく分かるのは、**the longer the work, the more context and scope changes accumulate, creating a failure mode where old permission is mistakenly treated as still valid.**

So in practice, I would write not only what the dot may do, but when that permission expires. 案件終了、担当変更、公開前、見積確定前など、review pointsを最初から入れる。AI internal control is not a distant enterprise problem; it starts the moment one person hands ongoing work to a dot.

参照：[OpenAI「How we build safety, security, and privacy into dots」](https://openai.com/index/how-we-build-safety-security-and-privacy-into-dots/) ／ [GPT-6 Astra System Card](https://deploymentsafety.openai.com/gpt-6-astra/change-log) ／ [OpenAI Help Center「Dots privacy, security, and safety FAQs」](https://help.openai.com/en/articles/20001529-dots-privacy-security-and-safety-faqs)

## 8. 「止める」を5種類に分解すると、AIへの委任がほとんど業務設計になる

Return to the original question. OpenAI’s public controls imply at least five different meanings of “stop.”

1. **Pause**：dotのcurrent main taskを止める。Delegated background tasks and future schedules do not necessarily stop.
2. **委任作業を停止**：Activityからindividual background taskを開いて止める。
3. **定期実行を解除**：Scheduledからfuture recurring workをdisable or deleteする。
4. **連携を切断**：plugin経由のnew accessを止める。ただし、information already incorporated into dot context is not automatically erased.
5. **dotを削除**：dot-specific contextは削除されるが、created files, Codex threads, ChatGPT conversations, and completed external changes are not rolled back.

This looks like UI trivia. でも五つに分かれる理由は、dotがone conversationではなくmultiple kinds of stateを持つからである。Tasks, schedules, access, memory, artifacts――their lifetimes differ.

Human work is the same. 担当から外してもmeeting remains on the calendar. Folder accessを外しても、the person does not forget what they already learned. Stopping a project does not unsend an email. dots feel futuristic, but their awkward controls may simply be what happens when ordinary organizational mess enters AI systems.

After this research, the original feeling—“isn’t it weird that Pause doesn’t stop everything?”—changes. It is not weird in the sense of a bad button. A single stop button would be too simple for a product that now holds multiple kinds of ongoing work.

参照：[ChatGPT Learn「Control your dot」](https://learn.chatgpt.com/docs/dots/controls) ／ [OpenAI Help Center「Dots privacy, security, and safety FAQs」](https://help.openai.com/en/articles/20001529-dots-privacy-security-and-safety-faqs)

## 9. 2026年10月5日時点では、まだ「全員の新しい標準」ではない

Dots are less than a week old. OpenAI says Pro 100, Pro 200, and Pro 500 are rolling out to users over 18 outside the EEA, UK, and Switzerland; Business Premium is rolling out worldwide; Enterprise requires an admin to enable the beta. Even on eligible plans, the feature may not appear immediately.

The first dot is included in eligible Pro or Business Premium plans, and ordinary conversations with the dot do not count toward standard ChatGPT usage limits. ただし、when a dot starts or manages ChatGPT Work or Codex tasks, those tasks count against the relevant product limits. OpenAI also describes a separate allowance for deeper work.

Creation starts on the desktop app or desktop browser. After setup, the same dot can be used in the mobile app when the supporting update is available; mobile web is not supported. Slack and Teams are supported contact methods, while texting is listed as coming later.

At this stage, I would not start with fully autonomous consequential work. Instead, test “long-running but non-destructive” responsibilities: research ledgers, deadline monitoring, change detection, pre-meeting issue updates. まずread and draftで癖を見て、その後approval-based updatesへ広げる。この段階設計はOpenAIのofficial procedureではなく、本稿のproposalである。

参照：[ChatGPT Learn「Meet dots」](https://learn.chatgpt.com/docs/dots) ／ [OpenAI「Introducing dots」](https://openai.com/index/introducing-dots/)

## 10. dotsで変わるのは、AIへの質問より「仕事の切り方」である

Before researching this, dots looked like “ChatGPT that keeps running.” Always-on, memory, app connections, background agents――a bundle of familiar AI ideas.

But once you decompose stopping behavior and read the safety evaluations, a different picture appears. dotsの中心はraw intelligenceの追加より、**state management for ongoing responsibility**にある。What to remember, what to watch, what to delegate, what to hold for approval, and when the role ends are all separate design choices.

That shifts the user skill away from writing one magical prompt. 仕事をpurpose, sources, decision thresholds, permissions, reporting, and end conditionsへ分解する力が効いてくる。This is closer to job design, PMO, internal control, and management than classic prompt engineering.

The biggest shift may be that AI moves from “something that answers my question” to “something that still has unfinished work.” そうなると、人間もanswer producerから、how much to delegate and where judgment stays humanをdesignする側へ少しずつ移る。

And the clearest symbol of that change is the silly little fact that “stop” is no longer one thing. Once AI starts holding work over time, we have to design not only how AI starts working, but **how its work ends.**

## 参考資料

- [OpenAI「Introducing dots」](https://openai.com/index/introducing-dots/)
- [ChatGPT Learn「Meet dots」](https://learn.chatgpt.com/docs/dots)
- [ChatGPT Learn「Get started with your dot」](https://learn.chatgpt.com/docs/dots/getting-started)
- [ChatGPT Learn「Tasks and memory」](https://learn.chatgpt.com/docs/dots/tasks-and-memory)
- [ChatGPT Learn「Control your dot」](https://learn.chatgpt.com/docs/dots/controls)
- [ChatGPT Learn「Scheduled tasks」](https://learn.chatgpt.com/docs/automations)
- [OpenAI「How we build safety, security, and privacy into dots」](https://openai.com/index/how-we-build-safety-security-and-privacy-into-dots/)
- [OpenAI Help Center「Dots privacy, security, and safety FAQs」](https://help.openai.com/en/articles/20001529-dots-privacy-security-and-safety-faqs)
- [OpenAI「GPT-6 Astra System Card」](https://deploymentsafety.openai.com/gpt-6-astra/change-log)
- [Reuters「OpenAI takes on Meta with dots agent in autonomous AI push」](https://www.reuters.com/business/openai-takes-meta-with-always-on-dots-agent-enterprise-ai-push-2026-09-29/)
