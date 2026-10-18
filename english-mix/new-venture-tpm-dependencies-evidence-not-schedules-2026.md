---
id: new-venture-tpm-dependencies-evidence-not-schedules-2026
title: "新規事業のTPMは、誰の仕事を管理するのか――工程表より先に、仮説と依存関係を疑う"
subtitle: "Technical Program Managementを、顧客検証と部門横断の意思決定から考える"
created: "2026-10-18"
updated: "2026-10-18"
type: "リサーチエッセイ"
status: "完成"
tags: ["新規事業", "事業開発", "技術プログラム管理", "仮説検証"]
keywords: ["TPM", "Technical Program Management", "Customer Development", "Program Management"]
grow: 5
abstract: "TPM means different things. 技術プログラム管理者の役割を一次資料から確かめ、予定表よりも事業仮説と部門間の依存関係を重視する考え方を検討する。"
---

# 新規事業のTPMは、誰の仕事を管理するのか――工程表より先に、仮説と依存関係を疑う
## Scheduleより先に、hypothesesとdependenciesを疑う

「TPMを置こう」と聞くと、そもそもwhich TPM? となる。Total Productive Maintenance（総合的生産保全）は設備の話。TOKYO PRO Market（東京プロマーケット）は株式市場。ここで考えるのはTechnical Program Manager（技術プログラム管理者）だ。[生産保全の定義](https://www.jipm.or.jp/business/tpm/)／[市場に関する資料](https://www.cas.go.jp/jp/seisaku/nipponseichosenryaku/startup/dai4/shiryou3.pdf)。

But does a new venture need another job title? まず職務を一次資料で確認し、その価値を調べるためのoperational evidence（業務の証拠）と、採用しない反例を考える。

## 1. 予定どおり完成した製品が、事業として失敗することがある

Imagine a new sports-video analytics service. The prototype ships on time, and the interface works. Yet the buyer says there is no budget. The product was delivered; the business was not validated. これは仮想事例であり、実測の成功率を示すものではない。

Two uncertainties are different: **when can we build it?** and **should we build it, for whom, and at what price?** スティーブ・ブランク（Steve Blank）のCustomer Development（顧客開発）は、探索中の仮説をcustomer contactで確かめることと、成立済みモデルのexecutionを分ける。[本人の解説](https://steveblank.com/2009/09/17/the-path-of-warriors-and-winners/)。

A green schedule does not prove customer demand. 新規事業の管理者が見つけるべきなのは、タスクの遅れだけではなく、まだ検証していないassumption（仮定）である。

## 2. 実際のTPMは、会議の司会よりも部門の境界を扱う

What does a Technical Program Manager actually do? オープンエーアイ（OpenAI）はtechnical execution、architecture decisions、cross-functional coordination（部門横断の調整）を挙げている。[OpenAI](https://openai.com/careers/technical-program-manager-applied-api-and-product-san-francisco/)。

アンソロピック（Anthropic）はresearch-to-launch dependencies（研究から製品公開までの依存関係）を、エヌビディア（NVIDIA）はnew-product readiness（新製品の提供準備）、training、外部企業との接続まで扱う。[Anthropic](https://job-boards.greenhouse.io/anthropic/jobs/5208193008)／[NVIDIA](https://nvidia.wd5.myworkdayjobs.com/en-US/NVIDIAExternalCareerSite/job/Technical-Program-Manager--New-Product-Deployment-Readiness_JR2023168)。

The common theme is integration, not meeting facilitation. ただしthese job postings state expected duties; they do not demonstrate measured business impact. 求人票を成功事例にすり替えてはいけない。

## 3. プロジェクトの成果物がそろっても、事業の便益は生まれない

A **project** delivers a defined output. A **program** coordinates related initiatives to realize benefits that cannot be gained by managing each separately. これが米国プロジェクトマネジメント協会（PMI）の概念的な区別だ。[PMI](https://www.pmi.org/learning/library/new-pmi-standard-pm-8179)。

Imagine engineering, video rights, sales contracts, and billing all marked complete. それでも許諾条件と顧客の購買手続きが噛み合わなければ提供できない。All outputs are ready; the outcome is missing.

A TPM function becomes valuable when these cross-team dependencies overwhelm existing owners. チームを大きくするより、接続部の複雑さを可視化するのが先だ。

## 4. 最も危ない依存関係は、作業の順番でなく仮説と投資の順番に潜む

A classic dependency says: finish task A before task B. 新規事業には、もっと高くつく依存関係がある。You invest heavily in building a product before validating why anyone would pay.

ストラテジャイザー（Strategyzer）のTest Card（実験カード）は、hypothesis（仮説）、experiment、metric、success threshold（成功基準）を明確にする。[原典](https://www.strategyzer.com/library/validate-your-ideas-with-the-test-card)。Learning Card（学習カード）はobservation（観測）、insight（解釈）、next actionを区別する。[原典](https://www.strategyzer.com/library/capture-customer-insights-and-actions-with-the-learning-card)。

If willingness to pay is uncertain, try a manual service. If usage rights are critical, investigate the contract first. If accuracy is critical, run a technical test. **The riskiest assumption sets the sequence.** TPMは予定を守るためだけでなく、誤った投資順序を避けるために必要になる。

## 5. 専任TPMが不要な小規模事業も、当然存在する

A small venture with one product, three people, and almost no cross-team blockers may not need a dedicated TPM. Hiring an extra coordinator could add more meetings than value.

Now add rights holders, outside developers, legal review, sales, and customer IT approval. One contract change cascades into pricing, product design, and launch timing. The need is not merely more people; it is dependency complexity.

Both cases are thought experiments, not empirical staffing thresholds. 採用基準はheadcountだけではない。Measure decision latency（判断の滞留）、critical dependencies（重要な依存関係）、and the blast radius of changes（変更の波及範囲）。

## 6. 誰が決めるかを曖昧にしたままTPMを置くと、かえって止まる

Do not turn the TPM into the owner of every unresolved decision. A business owner decides the business model; a Product Manager（製品責任者）prioritizes what and why to build; a tech lead（技術責任者）judges architecture and quality. The TPM connects decisions, risks, deadlines, and dependencies. これは本稿のorganizational design proposalであり、企業ごとに役割の調整が必要だ。[Atlassianの解説](https://www.atlassian.com/agile/project-management/product-vs-project-management)。

If video rights are unclear, TPM should not make the legal decision unilaterally. しかしwho decides, by when, and based on what evidence は明らかにできる。A missing decision owner is itself a business risk.

## 7. TPMの成果を、締切遵守だけで採点してはいけない

How do we measure TPM impact? On-time delivery alone is not enough. 本稿の提案ではprocess metricsとoutcome metricsを分ける。

Process: decision latency（決定待ち時間）、unowned dependencies（担当者未設定の依存事項）、experiment-to-decision time（実験から判断までの時間）、avoidable rework（回避可能な手戻り）。Outcome: paid adoption（有償導入と継続）、and unit economics（顧客当たりの採算）。

Beware of gaming the metric. If managers reward a low issue count, people may stop reporting issues. 未解決件数だけでなく、early detection（早期発見）も追う。A healthy organization surfaces problems, rather than hiding them.

## 8. 採用する前に、三十日だけTPM機能を試してみる

Before hiring a full-time TPM, test the **function** for thirty days. 初週に顧客・技術・権利・販売の課題を整理し、各項目にhypothesis、evidence、decision owner、next decision dateを付ける。Then replace status-reading meetings with discussions of unresolved decisions.

Record the prior four weeks for comparison. Similar projects may act as controls, but simple before-after numbers cannot prove causality. If using Difference-in-Differences（差の差分析）, check whether pre-intervention trends were comparable. 小標本なら時系列の事情を詳しく確認する方がよい。

An independent reviewer should ask: **Would this issue have been resolved without the TPM function?** 採用の理由を業務量の印象ではなく、検証可能な改善へ変えるためだ。

## 9. 次に調べるべき一次情報は、求人票ではなく仕事の痕跡だ

The first research pass used company job descriptions, management standards, and customer-discovery sources. 求人票はexpected responsibilitiesの一次情報だが、causal outcomesの証拠ではない。So the next step is operational data.

Collect decision timestamps, ownership, reasons for reversals, customer experiment results, trial-to-payment transitions, rights-review time, rework causes, and labor cost. Link them with a common project ID. Identify which dependencies delay important learning.

A second reading of [PMI's program/project distinction](https://www.pmi.org/learning/library/understanding-difference-programs-versus-projects-6896) reinforces the difference between outputs and benefits. ただしmarket outcomes are not fully controlled by any individual TPM. 役割に責任を集中させすぎても、スケジュール係へ矮小化してもいけない。

## 10. TPMという肩書より先に、「何が事業を止めているか」を問う

We began with three ambiguous letters. Now the question is clearer: is the venture blocked by unfinished work, an untested hypothesis, or a missing decision-maker?

A venture may need a dedicated TPM, or simply a better decision process. どちらが必要かは役職名からは分からない。**Organization design is about how decisions and resources respond to new evidence, not just where names sit on an org chart.** 略語より先に、事業が止まる理由を見つける。

---

### Sources and evidence limits

- [TPM: production maintenance](https://www.jipm.or.jp/business/tpm/)／[TOKYO PRO Market](https://www.cas.go.jp/jp/seisaku/nipponseichosenryaku/startup/dai4/shiryou3.pdf)
- [OpenAI](https://openai.com/careers/technical-program-manager-applied-api-and-product-san-francisco/)／[Anthropic](https://job-boards.greenhouse.io/anthropic/jobs/5208193008)／[NVIDIA](https://nvidia.wd5.myworkdayjobs.com/en-US/NVIDIAExternalCareerSite/job/Technical-Program-Manager--New-Product-Deployment-Readiness_JR2023168)
- [PMI](https://www.pmi.org/learning/library/new-pmi-standard-pm-8179)／[Steve Blank](https://steveblank.com/2009/09/17/the-path-of-warriors-and-winners/)
- [Strategyzer: Test Card](https://www.strategyzer.com/library/validate-your-ideas-with-the-test-card)／[Learning Card](https://www.strategyzer.com/library/capture-customer-insights-and-actions-with-the-learning-card)
- [エリック・ハイヨ（Eric Hayot）：The Elements of Academic Style](https://cup.columbia.edu/book/the-elements-of-academic-style/9780231168007/)

Job postings are evidence of expectations, not of effectiveness. 仮想例と三十日の試行は本稿の提案であり、実測された改善ではない。
