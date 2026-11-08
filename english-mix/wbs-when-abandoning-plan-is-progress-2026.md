---
id: wbs-when-abandoning-plan-is-progress-2026
title: "タスクを全部消した日に、仕事がいちばん進むことがある"
subtitle: "When abandoning the plan is progress｜WBS、仮説検証、判断の引き継ぎ"
created: "2026-11-08"
updated: "2026-11-08"
type: "Essay"
status: "完成"
tags: ["コンサルティング", "プロジェクト管理", "WBS", "論点設計", "意思決定", "English Mix"]
keywords: ["work breakdown structure", "issue tree", "value of information", "handoff", "I-PASS", "decision log"]
grow: 5
abstract: "An unexpected kind of progress: deleting tasks because they no longer matter. WBSは本来、日程表ではなく成果物を分解する構造。仮説検証が進むほど作業計画が変わる仕事では、完了率ではなく意思決定への接近を考える必要がある。医療の引き継ぎとスクラムの一次資料から、「何をするか」と「いつ予定を変えるか」を一緒に伝える方法を探る。"
---

# タスクを全部消した日に、仕事がいちばん進むことがある

*When abandoning the plan is progress. An essay on WBS, uncertainty, and decision handoffs.*

> **The central question｜中心となる問い**　Can deleting your to-do list count as progress? 探索型の仕事では、予定した作業の完了よりも、不要な作業を見極めて判断に近づくことが重要になる場合がある。This article compares the official definition of WBS, a hypothetical business case, and a hospital handoff method. 架空の事例は思考実験として扱い、出典で確認した事実とは区別する。

## 1｜進捗ゼロの午後三時：Is doing less sometimes doing better?

Imagine it's 3 p.m. 今日やるはずだった三つのタスクを削除した。競合十社の価格調査、アンケート設計、二十ページの資料作成。None of them is completed. しかし新しい証拠を見つけたため、もう必要ではなくなった。

On a task dashboard, the completion rate is zero. だが、本当に知るべき問題に近づいたのなら、仕事は進んでいる。The dashboard measures **execution of planned actions**, not necessarily **progress toward a decision**. ここで「戦略コンサルタントはWBSを引かないのか」という議論を読み直すと、論争の奥に、何を進捗として数えるかという問題が見えてくる。

A plan may describe several different things: the deliverables, the tasks, the questions, and the decision deadline. これらを一つの「計画」にまとめてしまうと、仕事を変える必要が生じた瞬間に会話が混線する。

## 2｜守：WBS is not the schedule

**作業分解構成図（WBS：Work Breakdown Structure）**は、プロジェクトの成果物や仕事の範囲を階層的に分解する仕組み。The **プロジェクトマネジメント協会（PMI：Project Management Institute）** explicitly distinguishes a WBS from the sequence and schedule of activities. 「何を実現するか」を整理する構造と、「いつどの順に動くか」を示す予定は、関連するが同じではない。[PMI's explanation of WBS](https://www.pmi.org/learning/library/developing-elaborating-work-breakdown-structures-7241).

Consider a public event. 会場、広報、安全管理、当日運営といった成果物・業務領域を分解し、それから担当者と日程を設定する。A WBS can support a schedule, but it is not itself a calendar. したがって「すべての作業が決まらないとWBSを作れない」という主張は、正式な定義とは異なる。

For uncertain work, details can emerge over time. 近い期間の計画だけ詳細化し、遠い期間は粗く見通す考え方を**段階的詳細化（ローリングウェーブ計画法）**という。The real danger is not making a plan early; it is presenting **assumptions as commitments**. 不確定なことを確定事項に見せると、計画が仕事を助けるどころか、仕事を縛り始める。

Now consider strategy. 売上が落ちたとき、「客数か、購入頻度か、客単価か」という**論点（issue）**を設定し、問いの構造を示す**論点分解図（issue tree）**をつくる。A **hypothesis** is a provisional answer that should change when evidence changes. 仮説が動くたびに、必要な作業も動く。

![Two ways to manage the same new evidence: complete the planned task or update the question and the task.](https://silovar-uk.github.io/myessays/assets/wbs-hypothesis-two-paths-20261108.svg)

*Diagram 1｜予定を固定する管理と、証拠に応じて更新する管理。Original conceptual illustration.*

## 3｜破：A cancelled task can carry information value

Let's make the question unnecessarily concrete. 架空のプロジェクトで、売上減少の原因を「競合の値下げ」と仮定したとする。The team schedules a review of ten competitors' prices. ところが、最初に確認した自社データでは、顧客数はほぼ維持されている一方、購入頻度が低下していた。

This does not prove that prices are irrelevant. ただし、次に確認すべき優先論点は変わりうる。We can compare three approaches in a thought experiment—**not in a measured field study**.

- **Task-first｜作業完了を優先**：調査を予定どおり実行。High completion rate, but uncertain contribution to the decision.
- **Issue-only｜論点だけを管理**：仮説を変えて別の分析へ進む。The manager may understand why, while the rest of the team does not.
- **Connected｜論点と作業を接続**：変更の根拠を共有し、競合調査を保留。Set a new task to examine repeat-purchase patterns and define what evidence would change the decision again.

A decision-theory concept helps explain the difference: **情報の価値（Value of Information）**. It asks how much better a decision is expected to become when we collect additional evidence. 情報の量ではなく、情報によって選択が改善するかを評価する。[Jackson and colleagues, *Value of Information Analysis in Models to Inform Health Policy*](https://doi.org/10.1146/annurev-statistics-040120-010730).

But don't replace “tasks completed” with “hypotheses rejected.” 反証が不十分でも仮説を捨てられるからだ。The team needs a **decision rule**: what evidence would justify changing course, and by when must the decision be made? 進捗は、単なる動作量ではなく、判断に必要な根拠が整う過程も含む。

## 4｜離：What a hospital handoff can teach a project team

Why look at a hospital? 患者の状態も、診断も、必要な処置も変わりうる。それでも担当者は交代しなければならない。A handoff must communicate more than a fixed to-do list.

The **米国医療研究品質庁（AHRQ：Agency for Healthcare Research and Quality）** introduces **アイパス（I-PASS）**, a structured handoff method. Its five elements are: illness severity（重症度）, patient summary（経過の要約）, action list（行動項目）, situation awareness and contingency planning（状況認識と事態変化への備え）, and synthesis by receiver（受け手による理解の確認）. [AHRQ's I-PASS guide](https://www.ahrq.gov/teamstepps-program/curriculum/communication/tools/ipass.html).

Notice what the list does **not** do: stop at “these are your next tasks.” 事態が変わったときの対応条件と、受け手が本当に理解したかまで含む。This is the missing piece in many project handoffs. 「次に何をするか」は分かっても、「どんな情報が出たら、次にそれをしなくてよくなるか」が分からない。

Evidence matters here. Nine pediatric residency sites adopted an I-PASS handoff **bundle**, including training and process changes, and studies reported fewer errors and preventable harms. ただし、これは医療での複合的な介入結果であり、コンサルティング業務へ効果量をそのまま転用できない。[AHRQ's discussion of the study](https://psnet.ahrq.gov/web-mm/signout-fallout).

The analogy is structural, not clinical. 引き継ぐ対象は「タスク」だけではない。It is also the team's current understanding, its uncertainty, and the conditions for changing action. ここから、仕事を引き継ぐとは、判断を続けられる状態を渡すことだと考えられる。

## 5｜Two status reports reveal a hidden gap

Compare two reports from the same analyst.

> **Report A**：競合十社の価格調査が完了しました。The spreadsheet is ready.

> **Report B**：価格競争が主因という仮説を検討しました。The data currently point more strongly to declining purchase frequency than to a loss of customers. 追加の競合調査は保留し、次は顧客群ごとの購入頻度を確認します。If the decline is concentrated in a specific group, we will prioritize its causes.

A tells us what was done. B tells us **what was learned, what changed, and what could change next**. Bのような報告を毎回長々と行う必要はないが、探索型の仕事でAだけが積み重なると、チームの認識は更新されない。

This resembles an idea in **スクラム（Scrum）**, a framework for complex work. The official guide allows developers to adjust their plan each day toward an agreed Sprint Goal. **The goal and the plan are not identical.** 目標に向かうために手段を更新するのであって、変更したから必ず失敗というわけではない。[The Scrum Guide, 2020](https://scrumguides.org/scrum-guide.html).

A manager may be able to keep the whole logic in their head. しかし、それが共有されなければ、メンバーは「昨日の指示はまだ有効か」を毎回推測する。The question then shifts from personal problem-solving skill to **transferable judgment**—他人が次の判断を続けられるようにする能力である。

## 6｜提案：Make the change conditions visible

Here is a practical proposal, not an established PMI standard. 論点と作業をつなぐため、一枚の記録に八項目を置く。

![Eight-part decision-management structure connecting questions, tasks, changes and ownership.](https://silovar-uk.github.io/myessays/assets/wbs-eight-layer-decision-log-20261108.svg)

*Diagram 2｜作業だけでなく変更の根拠を残す、八項目の提案。Original illustration.*

1. **Purpose｜目的**：最後に何を決めるか。
2. **Question｜論点**：判断に必要な問いは何か。
3. **Hypothesis｜仮説**：いま有力とみる答えは何か。
4. **Evidence｜検証**：どの証拠で仮説を更新するか。
5. **Action｜作業**：誰が何をいつするか。
6. **Decision rule｜判断基準**：どこで進む・止めるを決めるか。
7. **Change log｜更新履歴**：何が分かり、なぜ変更したか。
8. **Owner and deadline｜責任と期限**：誰がいつ最終判断するか。

Don't rewrite all eight items every day. 変更があったところと、その理由だけ残せばよい。But there are limits. 法令、安全、契約上の必須工程まで、仮説を理由に自由に消してよいわけではない。Adaptability requires boundaries. **何を変えてよく、何を守る必要があるか**の区別が、計画の成熟度を決める。

## 7｜The deleted tasks look different now

Return to 3 p.m. 三つのタスクは終わらずに消えた。If the team shares why they became unnecessary, what will be checked next, and who owns the decision, zero completed tasks need not mean zero progress. 反対に、理由のない削除なら、それは単なる空白である。

At first, the choice seemed to be **follow the plan or change the plan**. 調べたあとでは、その対立は浅く感じる。The deeper skill is to **make the reasoning behind a change visible to other people**. 計画とは、未来を正確に予言する文書ではなく、今の理解を共同で更新するための記録でもある。

A line through a task can mean failure. でも、それが新しい事実を受け入れた跡である可能性もある。The difference is a small sentence beside the crossed-out task: **“We changed this because…”**。その一文があれば、計画を捨てたことさえ、チームに残る知識になる。

## Sources and verification｜出典・検証

**Verified facts｜確認した事実**：PMI distinguishes the WBS from a schedule; AHRQ explains the five I-PASS elements; the Scrum Guide describes daily adaptation; value-of-information analysis evaluates the expected benefit of evidence.

**Interpretation｜解釈**：Sharing the conditions for revising a plan may help teams coordinate uncertain work. ただし、医療研究の効果をビジネスへ直接外挿することはできない。

**Proposal｜提案**：八項目による判断記録。Next step: compare decision time, avoidable rework, handoff misunderstandings, and decision quality in real projects. 数値は捏造せず、現場で検証する。

- [PMI: Developing and elaborating effective work breakdown structures](https://www.pmi.org/learning/library/developing-elaborating-work-breakdown-structures-7241)
- [Jackson et al.: Value of Information Analysis in Models to Inform Health Policy](https://doi.org/10.1146/annurev-statistics-040120-010730)
- [AHRQ: I-PASS handoff tool](https://www.ahrq.gov/teamstepps-program/curriculum/communication/tools/ipass.html)
- [AHRQ: Signout Fallout and the multicenter handoff study](https://psnet.ahrq.gov/web-mm/signout-fallout)
- [The Scrum Guide (2020)](https://scrumguides.org/scrum-guide.html)
- [University of Wisconsin–Madison: Revision Strategies for Longer Projects](https://writing.wisc.edu/handbook/processandstructure/revisinglongprojects/) — エリック・ハイヨ（Eric Hayot）の「不均等なU字（Uneven U）」の構成法を参照。
