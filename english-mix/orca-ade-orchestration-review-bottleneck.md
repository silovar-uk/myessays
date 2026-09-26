---
id: orca-ade-orchestration-review-bottleneck
title: "Orca reveals that the AI development bottleneck is moving from generation to coordination"
subtitle: "Running 30 agents is easier than moving 30 tasks without breaking the system"
created: "2026-09-26"
updated: "2026-09-26"
type: "Research Essay / English Mix"
status: "完成"
tags: ["AI development", "Orca", "ADE", "AI agents", "code review", "Git worktree", "development process"]
keywords: ["Orca", "Agent Development Environment", "ADE", "AI coding agent", "parallel agents", "git worktree", "code review", "orchestration", "Design Mode"]
grow: 5
abstract: "Orcaは複数のcoding agentsをisolated Git worktreesで並列に動かすAgent Development Environment（ADE）を掲げる。But the interesting part is not the number of agents. Generationが速くなるほど、workをindependentにし、outputをobservableにし、人間がreviewできる大きさへ切ることが難しくなる。公式資料と利用者インタビューから、AI developmentでscarceになる資源がどこへ移るのかを考える。"
---

# Orca reveals that the AI development bottleneck is moving from generation to coordination
## Running 30 agents is easier than moving 30 tasks without breaking the system

<!-- level:4 role:claim -->
提供されたinterview transcriptには、a strange sceneがある。話している横で、Orca上にはdozens of tasksが立ち上がり、終わったものから消えていく。人間が一つの画面に向かってcodeを書く、という見慣れたdevelopment sceneからかなり遠い。画面だけ見れば、“one human suddenly has dozens of developers”のように見える。

<!-- level:2 role:description -->
実際、Orcaは自らをAgent Development Environment（ADE）と位置づけ、Claude CodeやCodexなどmultiple coding agentsを、それぞれisolated Git worktreeでparallelに動かす設計を採る。Terminal, diff, browser, task management, mobileまでを一つの環境へ寄せ、「use an agent」より「operate a fleet of agents」へ重心を移している。

<!-- level:1 role:evidence -->
Transcriptでは、利用者が十数本から数十本のworkを並行させ、perceived development speedとPR countが以前の4〜5倍になったと話している。ただし、これはcontrolled benchmarkではなく、一人の利用者によるself-reportである。一方、official sourcesで確認できるのは、parallel worktrees, multiple agents, Design Mode, mobile, remote work over SSHといったfeaturesの存在までである。

<!-- level:3 role:analysis -->
What matters is not the “4–5x” number alone, but what must change to make that number possible. Code generationをparallelizeすると、次に詰まるのはdependencies, review, integration, decisions, attentionになる。生成能力だけを増やしても、人間が確認できないoutputが積み上がれば、development speedは“code produced”と“changes safely integrated”の二つに割れる。

<!-- level:5 role:implication -->
Orcaを調べる前、これは“a convenient IDE with many AIs”に見えていた。After research, it looks different. これは、**when code-writing capacity becomes abundant, it exposes where human work has to move next**という装置に見える。本稿ではOrcaのfeaturesを入口に、parallel AI developmentで本当にscarceになるものを追う。

<!-- level:1 role:source -->
Starting point: 提供されたインタビュー文字起こし（2026年9月26日確認） ／ [Orca official site](https://www.onorca.dev/) ／ [Orca official GitHub](https://github.com/stablyai/orca)

> **Information cutoff: September 26, 2026**
>
> 本稿は、official sourcesで確認できるproduct features、interviewで語られたuser experience、そこから導くauthor interpretationを分けて記述する。Orca公式の“100x”などの表現はmarketing languageであり、verified performance resultとして扱わない。

## 1. If an IDE centers files, an ADE shifts the center toward work

<!-- level:4 role:claim -->
Orcaを理解する最初の分岐は、a richer IDEとして見るか、the unit of work itselfを変える環境として見るかにある。見た目にはeditor, terminal, file treeがあり、従来のdevelopment environmentと似ている。しかし、中心に置かれているものが少し違う。

<!-- level:2 role:description -->
従来のIntegrated Development Environment（IDE）では、人間がprojectを開き、filesを編集し、runし、debugする。Orcaでは、issueやrequestからworktreeを作り、その中でagentを走らせ、結果をcompareし、diffをreviewして取り込む。人間はfilesを直接触れるが、main object of controlを“code”から“work in progress”へ一段上げられる。

<!-- level:1 role:evidence -->
Orca公式は、each taskをisolated Git worktreeで扱い、terminal, browser, editing stateまでをworktree単位で束ねる。GitHubやLinear taskからworktreeを開くflowも備える。公式サイト自身も、traditional editorsは“one person typing”を前提にしていたのに対し、Orcaはworktrees, review, browser, remoteを一つにまとめたenvironmentだと説明している。

<!-- level:3 role:analysis -->
ここで起きているのはmore buttonsではない。操作の主語が“edit line 12 in this file”から“complete this bug fix as one piece of work”へ上がる。Filesは仕事を実現するinternal detailになり、人間が監視する対象はtask state, diff, tests, dependenciesへ移る。

<!-- level:5 role:implication -->
この意味でADEというlabelには実体がある。It is not only an IDE with AI added. **The environment shifts from a place where humans directly edit toward a control plane where humans orchestrate multiple pieces of work.** エージェントの性能差より先に、“what counts as one manageable unit”が変わっている。

<!-- level:1 role:source -->
[Orca official site](https://www.onorca.dev/) ／ [Orca Worktrees](https://www.onorca.dev/docs/model/worktrees) ／ [Orca official GitHub](https://github.com/stablyai/orca)

![Orca公式READMEに掲載されたdesktop上のmultiple agentsとmobile companionの画面。](https://raw.githubusercontent.com/stablyai/orca/main/docs/assets/readme-hero.jpg)

*Figure 1: Orca公式READMEのscreen example。重要なのはwindow countより、multiple pieces of workがone control surfaceへ集約されていることにある。Source: [stablyai/orca](https://github.com/stablyai/orca)。*

## 2. Parallelism depends less on intelligence than on having non-colliding workspaces

<!-- level:4 role:claim -->
“Run 30 AIs”と聞くと、まずmodel intelligenceやcomputeを想像する。しかしsoftware developmentでは、thinking in parallelだけでは足りない。同じdeskに30人を座らせれば、全員が速くてもthe desk becomes the conflict.

<!-- level:2 role:description -->
Orcaがworktreeを中核に置く理由はここにある。Git worktreeは、一つのrepositoryからmultiple working directoriesを持てる仕組みである。Orcaでは原則としてtaskごとにseparate worktree, branch, file state, agent terminalを持たせる。Work-in-progress stateを分離することで、parallel tasksが同じfilesを直接奪い合う場面を減らす。

<!-- level:1 role:evidence -->
Official docsはOrcaを“worktree-native”と説明し、Create, Work, Review, Ship, Archiveというlifecycleをworktree単位で扱う。一方で、worktreeはfree duplicationではない。Dependencies, caches, secretsなどを別途扱う必要があり、shared directoriesやcleanup controlsも用意されている。

<!-- level:3 role:analysis -->
つまりparallelismの前提は“number of agents”ではなく“can state be isolated?”である。AIが何本あっても、same uncertain spec, same file, same migration, same design decisionへ一斉に触れれば、最後にconflictsを解く仕事が増える。逆に、stateとresponsibilityを切れる仕事なら、same modelでもparallelismは高くなる。

<!-- level:5 role:implication -->
AI development speedを見るとき、model performanceだけではhalf the systemしか見えない。**Speed depends not only on how much can be generated, but on how much work can be split into independent spaces.** Orcaのworktree-first designは、その地味な条件をproduct surfaceへ出している。

<!-- level:1 role:source -->
[Orca Worktrees](https://www.onorca.dev/docs/model/worktrees) ／ [Git official “git-worktree”](https://git-scm.com/docs/git-worktree)

![Orca公式資料にある、worktreeをparallelに扱うscreen example。](https://raw.githubusercontent.com/stablyai/orca/main/docs/site/public/docs/posters/tab-split.jpg)

*Figure 2: Orca公式のParallel Worktrees。Parallelismは“edit the same place at once”ではなく、separate state first, then compare and integrateという設計で成立する。Source: [Orca official GitHub](https://github.com/stablyai/orca)。*

## 3. Thirty agents do not create 30x throughput unless the work is actually independent

<!-- level:4 role:claim -->
ここで、an intentionally extreme experimentを考える。30個のAI agentsへ30 tasksを与える。Condition Aでは30個すべてがsame authentication fileを変更する。Condition Bでは30個が互いに依存しない30 bugsを直す。Agent countは同じでも、Bのほうがfar easier to parallelize.

<!-- level:2 role:description -->
この差はAI intelligenceではなくwork dependenciesから生まれる。前のchange resultを見ないと次へ進めない仕事、same shared stateを書き換える仕事、one design decisionへ収束しないと動けない仕事はserialになる。逆にinputとdone conditionが分離され、change scopeが重なりにくい仕事はhorizontalに広げられる。

<!-- level:1 role:evidence -->
Interviewでも、利用者は“一つのtaskを無理にparallelizeするとfilesが競合しやすい一方、separate issuesならparallel implementationしやすい”という趣旨を説明している。さらにtask designで最も意識するのはagent convenienceではなく、human reviewabilityだと話している。これはfeature listには載らないが、運用として重要なevidenceである。

<!-- level:3 role:analysis -->
一般化すると、parallel AI developmentの上限は“how many agents can launch”ではなくdependency graphの形で決まる。Independent branchesが多ければ横へ広がる。One trunkにdecisionsが集中すれば、agentsを追加してもqueueになる。人数を増やす前に、安全にworkをdivideできるboundaryを探す必要がある。

<!-- level:5 role:implication -->
だからgood task decompositionはAIへの親切ではない。**It designs parallelism while preserving changes that humans can still understand and review.** AI時代にtask breakdownが重要になるのは、promptを細かく書くためではなく、independenceとreviewabilityを同時に確保するためだ。

<!-- level:1 role:source -->
Starting point: 提供されたインタビュー文字起こし ／ [Orca Worktrees](https://www.onorca.dev/docs/model/worktrees)

## 4. As generation gets faster, reviewability becomes a design requirement

<!-- level:4 role:claim -->
Faster code generation does not automatically mean faster review. むしろgenerationだけ高速化すると、changes waiting for verificationが増える。Manufacturing linesだけ増設し、inspection tableを一台のままにするようなもので、downstream capacityが新しい上限になる。

<!-- level:2 role:description -->
Simple thought experimentを置く。6 agentsが1時間にone change eachを完成させ、each human reviewに15 minutesかかるとする。1時間で生まれるreview demandは90 minutesである。Reviewerが一人なら、generationをさらに速くしてもunreviewed queueが伸びる。この数字はOrca benchmarkではない。Bottleneck shiftをvisibleにするための例である。

<!-- level:1 role:evidence -->
2026年のresearch proposal “Rethinking Code Review in the Age of AI”は、AI coding toolsがcode production velocityを上げる一方、review volumeも増え、code reviewがgrowing bottleneckになり得ると整理している。同論文はhuman judgment, accountability, team understandingを残すため、AI assistanceを使ってもhumans at key quality gatesを維持する構成を提案する。

<!-- level:3 role:analysis -->
Interviewの利用者も、reviewではimplementation volumeより、approachが適切か、duplicateしていないか、overengineeringでないか、design and implementationがscopeに合うかを確認すると話す。ここでは“read code”が“judge the meaning of a change”へ広がっている。AIがlocal implementationを速くするほど、人間はlocal textよりsystem consistencyへ時間を使う。

<!-- level:5 role:implication -->
するとreviewabilityは、completion後のquality controlではなく、before executionのdesign conditionになる。**How large can one change be while a human can still review its meaning?** その単位でtaskを切れなければ、parallel agentsを増やすほどoutputではなくreview debtを量産する。

<!-- level:1 role:source -->
[Rethinking Code Review in the Age of AI（arXiv, 2026）](https://arxiv.org/abs/2605.17548) ／ Starting point: 提供されたインタビュー文字起こし

> **Generation speed is not integration speed.**
>
> Parallelism removes some waiting time. It does not remove judgment, review, dependencies, or accountability. 本稿では、この残ったcapacityを“review bandwidth”と呼ぶ。

## 5. Design Mode and mobile reduce instruction friction more than they increase intelligence

<!-- level:4 role:claim -->
Orcaの中で、flashy but fundamentalなのがDesign Modeである。Browser上のcomponentをclickして“fix this”と送れる。これはAIをsuddenly smarterにする機能ではない。しかし、人間がvisual problemをwordsへtranslateするcostをかなり減らせる。

<!-- level:2 role:description -->
通常、UI bugをAIへ渡すには、“the button at the upper right”, “around this width”, “text is clipped”と説明し、必要ならDOMやCSSを探して添える。Design Modeでは、selected elementのHTML, computed CSS, cropped screenshot、取得できる場合はsource locationまでをagent inputへ載せられる。

<!-- level:1 role:evidence -->
Official docsでは、elementをselectし、commentを付け、そのままagentへ送るflowが示されている。Mobile companionではworktree statusを見たり、finish notificationを受けたり、follow-up instructionを送ったりできる。SSH worktreesやremote executionもあり、agentsを別machineで動かし、手元側からoperateする構成を取れる。

<!-- level:3 role:analysis -->
これらの共通点はmodel reasoningではなく、“how many times context must be reconstructed”を減らすことにある。Screen → explanation, task tracker → workspace, away from desk → desktopというtranslationを短くする。AI developmentでは、what the model thinksと同じくらい、人間がcorrect contextを渡すまでのfrictionが作業時間を占める。

<!-- level:5 role:implication -->
そのためOrcaの価値を“which models are supported?”だけで比較すると見誤る。**Orchestration products compete not only by adding intelligence, but by preserving work state as humans move to the next decision.** Model competitionとは別に、context movementのdesign competitionが始まっている。

<!-- level:1 role:source -->
[Orca Design Mode](https://www.onorca.dev/docs/browser/design-mode) ／ [Orca Mobile](https://www.onorca.dev/docs/mobile) ／ [Orca Remote Worktrees](https://www.onorca.dev/docs/recipes/remote-worktrees)

![OrcaのDesign Mode。Browser上のelementをselectし、implementation contextと一緒にagentへ渡す。](https://raw.githubusercontent.com/stablyai/orca/main/resources/onboarding/feature-wall/tile-05.poster.jpg)

*Figure 3: Orca公式のDesign Mode。Visual feedbackを“which element, which state”というimplementation contextへ接続する。Source: [Orca official GitHub](https://github.com/stablyai/orca)。*

## 6. Parallelism sends a quiet bill to your SSD and your attention

<!-- level:4 role:claim -->
Parallelismは画面上でworkをmultiplyする。しかし増えるのはoutcomesだけではない。Working directories, dependencies, logs, context, notifications, review targetsも増える。“AI can run forever at the same cost”という感覚は、physical resourcesとhuman resourcesの両方で崩れる。

<!-- level:2 role:description -->
Interviewの利用者は、64GB memory, 1TB SSDのlocal machineでも自分のuse patternでは容量が足りず、unused worktreesを定期的にcleanすると話している。これはextreme parallel useをする一利用者の例であり、general Orca requirementではない。ただ、more worktrees mean more on-disk stateという方向性自体はofficial docsとも整合する。

<!-- level:1 role:evidence -->
Orcaのworktree docsには、each workspaceでdependenciesやcacheが必要になること、shared directoriesを設定できること、Resource Managerでsizeを確認しunused workspacesをremoveできることが記載されている。つまりproduct側も、parallel environmentsのresource managementを独立したoperational problemとして扱っている。

<!-- level:3 role:analysis -->
もう一つのbillはattentionである。Mobileからstatus checkやfollow-upができることはlocation freedomを増やす一方、“work is always reachable”という状態も作る。Interviewでは、以前は処理が止まっていないか夜中に起きて確認していたというextreme experienceまで語られる。Orcaはそのmanual workを減らしたというが、一般化すべきなのはlong hoursではなく、stop, notify, resumeをautomateして人が張り付かないdesignの重要性である。

<!-- level:5 role:implication -->
Good automation should not turn the human into a 24-hour supervisor. **Parallelism is mature when humans can safely disengage and return only when judgment is needed, not merely when more agents can run.** Disk capacityとattentionは別物に見えるが、どちらも“cost of maintaining added concurrency”である。

<!-- level:1 role:source -->
[Orca Worktrees](https://www.onorca.dev/docs/model/worktrees) ／ [Orca Mobile](https://www.onorca.dev/docs/mobile) ／ Starting point: 提供されたインタビュー文字起こし

## 7. “Four to five times faster” is evidence of a changed workflow, not a product performance number

<!-- level:4 role:claim -->
Interviewで最も目を引く数字は“4–5x”である。Development speedもPR countも、その程度増えた体感があるという。ここをそのまま“Orca makes you 4–5x faster”と書けば簡単だが、too simpleである。

<!-- level:2 role:description -->
Comparisonにはtime differenceがある。以前は一人でClaude Codeを使っていたperiodが含まれ、その後models, development process, personal skill, company workflowも変わっている可能性がある。PR countはproductionの一指標にはなるが、change size, quality, rework, incident rateまでsameとは限らない。

<!-- level:1 role:evidence -->
現時点で本稿が確認したofficial materialsに、general usersへ4〜5倍のspeed improvementを保証するcontrolled comparisonは見当たらない。Official siteには“100x”という表現があるが、これはproduct marketing languageである。したがってinterviewの4〜5倍もofficial 100xも、independent performance benchmarkとしては扱わない。

<!-- level:3 role:analysis -->
それでもtestimonyが無意味になるわけではない。重要なのは、利用者がspeed gainの理由として“the model became smarter”だけを挙げていない点である。Worktrees, agent switching, task management, notifications, mobile, review flowなど、stop and switching frictionが減った結果としてworkflow-wide speedを語っている。

<!-- level:5 role:implication -->
ここから言えるのはmultiplierではなくmeasurement targetの変更である。AI development toolを評価するとき、**instead of asking how many seconds one generation saves, ask how often one task stops between start, implementation, review, and integration.** Speedはmodel propertyではなくflow propertyになっている。

<!-- level:1 role:source -->
[Orca official site](https://www.onorca.dev/) ／ [Orca official GitHub](https://github.com/stablyai/orca) ／ Starting point: 提供されたインタビュー文字起こし

## 8. The best fit is not “people who write lots of code” but people with many independent jobs

<!-- level:4 role:claim -->
Orcaに向く人を“people who want to build insanely fast with AI”と言うと広すぎる。Instead, look at the shape of concurrent work. 並列化の利益はcode volumeより“how many tasks have independent done conditions?”に左右される。

<!-- level:2 role:description -->
Bugs, UI fixes, test additions, investigations, separate featuresなど、互いのstateを強く共有しないworkを多数持つ場合は、separate worktreesの意味が大きい。逆に、一つのnew algorithmを深く理解しながらdesignする、一つのlarge migrationをsequentialに進める、all codeを自分で把握し続けたい仕事では、more concurrencyがvalueにならない場合がある。

<!-- level:1 role:evidence -->
Interviewの利用者自身も、多種類のtasksを同時に扱う人には向く一方、一つの対象をdeeply研究する人や、all codeを理解したいtypeには必ずしも向かないのではないかと述べている。これはproduct specificationではなくuser judgmentだが、worktree-based parallelismの性質とは整合する。

<!-- level:3 role:analysis -->
導入を考えるなら、“Do we want AI?”よりfour questionsが役に立つ。Can work be split into independent units? Can completion be observed? Can each change stay small enough for human review? Can a failed task be isolated from the rest? 多くがNoなら、agent countを増やす前にprocess designを直すほうが先である。

<!-- level:5 role:implication -->
つまりOrcaが得意なのはmass generationではない。**It is strongest when many independent jobs can flow at once, stay observable, and return to humans only when judgment is needed.** AI developmentのfitはprogrammer speedより、work structureがparallelismに耐えるかで決まる。

<!-- level:1 role:source -->
[Orca Worktrees](https://www.onorca.dev/docs/model/worktrees) ／ Starting point: 提供されたインタビュー文字起こし

## 9. Conclusion: the scarce resource in AI development becomes the ability to move work without breaking it

<!-- level:4 role:claim -->
最初のscreenへ戻る。Dozens of tasksが立ち上がり、終わったものから消えていく。最初はAIがhuman headcountを増やした光景に見えた。しかし、ここまで調べると、“what remains after humans stop typing every line”が並んでいるように見える。

<!-- level:2 role:description -->
必要なのは、workをindependentにすること、right contextを渡すこと、stateをobserveすること、reviewable sizeに保つこと、resultsをintegrateすること、止まったときだけhumanへ戻すことだ。None of these is code generation itself. しかしgenerationが高速化するほど、このsurrounding designがoverall speedを決める。

<!-- level:1 role:evidence -->
Orcaのofficial featuresを並べても、worktrees, Design Mode, task management, diff review, mobile, remote executionと、中心にあるのは“make the model smarter”より“handle many pieces of work at once”のためのfeaturesである。Interviewでも最後に重視されていたのはarchitecture, scope, duplication, overengineering, reviewabilityだった。

<!-- level:3 role:analysis -->
この構図はOrcaだけの話ではない。When generation becomes cheaper, scarcity moves downstream. 文章ならediting、分析ならverification、企画ならprioritization、開発ならreview and integrationである。AIが仕事を消すか残すかというbinaryより、“where does the bottleneck move?”を追うほうが現場の変化を正確に見やすい。

<!-- level:5 role:implication -->
だからrunning 30 agents is not the finish line. **The real challenge is moving 30 streams of work without collision, while keeping them understandable to humans and integrating only what should ship.** Orcaを調べて見え方が変わったのはここだった。AI-era development environmentは、code-writing deskからwork-flow control towerへ変わり始めている。

<!-- level:1 role:source -->
[Orca official site](https://www.onorca.dev/) ／ [Orca official GitHub](https://github.com/stablyai/orca) ／ [Rethinking Code Review in the Age of AI](https://arxiv.org/abs/2605.17548)

## References

- [Orca official site](https://www.onorca.dev/)
- [Orca official GitHub repository](https://github.com/stablyai/orca)
- [Orca Worktrees](https://www.onorca.dev/docs/model/worktrees)
- [Orca Design Mode](https://www.onorca.dev/docs/browser/design-mode)
- [Orca Mobile](https://www.onorca.dev/docs/mobile)
- [Orca Remote Worktrees](https://www.onorca.dev/docs/recipes/remote-worktrees)
- [Git official “git-worktree”](https://git-scm.com/docs/git-worktree)
- [Kamalı et al., “Rethinking Code Review in the Age of AI: A Vision for Agentic Code Review” (2026)](https://arxiv.org/abs/2605.17548)
- 提供されたインタビュー文字起こし（2026年9月26日確認）
