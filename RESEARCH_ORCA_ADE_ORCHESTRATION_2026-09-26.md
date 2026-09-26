# RESEARCH｜Orcaと並列AI開発のボトルネック

Date: 2026-09-26
Target article: orca-ade-orchestration-review-bottleneck

## 0. Research Question

Orcaの面白さは「多数のAIエージェントを動かせること」なのか。それとも、生成能力が余った後に必要になる調整・レビュー・統合の設計を前面へ出したことなのか。

中心仮説：

> AIコード生成を並列化すると、ボトルネックは生成から、依存関係、レビュー、統合、注意力へ移る。Orcaの価値はモデル性能そのものより、その移動後の仕事を管理する環境にある。

## 1. Official Facts

- Orcaは自らをAgent Development Environment（ADE）と位置づける。
- 複数のcoding agentsを並列に動かし、各taskをisolated Git worktreeで扱える。
- Worktreeはbranch/files/terminals/browser stateなどの管理単位になる。
- Design Modeは選択したUI要素のHTML、computed CSS、screenshot等をagent contextへ渡せる。
- Mobile companionでworktree監視、通知、follow-upができる。
- Remote worktrees over SSHを提供する。
- GitHub repoはMIT License。

Sources:
https://www.onorca.dev/
https://github.com/stablyai/orca
https://www.onorca.dev/docs/model/worktrees
https://www.onorca.dev/docs/browser/design-mode
https://www.onorca.dev/docs/mobile
https://www.onorca.dev/docs/recipes/remote-worktrees

## 2. Interview-derived Claims

提供された文字起こしから、以下は「利用者の経験」として扱う。

- 十数本〜数十本のtaskを並列に動かす。
- 独立issueは並列化しやすいが、同じfileを触る仕事は競合しやすい。
- Task decompositionではagent convenienceよりhuman reviewabilityを重視する。
- Reviewではapproach、duplicate、overengineering、scopeなどを見る。
- 体感速度とPR数が4〜5倍になったという自己申告。
- Extreme useではdisk cleanupが必要だった。
- 多種類のtaskを持つ人に向き、deep single-context workには必ずしも向かないという本人評価。

これらはOrca一般の性能値・必要スペックとして断定しない。

## 3. External Research

Kamalı et al. (2026) は、AI coding assistantsがcode production velocityを高める一方、review volumeも増やし、code reviewをgrowing bottleneckにし得ると整理。Human-controlled quality gatesを残すagentic review workflowを提案。

Source:
https://arxiv.org/abs/2605.17548

## 4. Stress Tests

### 30 agents / one shared file
並列数30でもshared stateが一つならconflict resolutionが増える。

### 30 agents / 30 independent issues
Completion conditionsとchange scopeが独立すればparallelismを取り出しやすい。

### Review bandwidth
6 agents × 1 change/hour × 15 min review = 90 min of review demand per hour.
一人のreviewerではqueueが増える。
これはbenchmarkではなくbottleneck移動のthought experiment。

## 5. Evidence Ladder

1. Verified product fact: official docs / GitHub
2. User testimony: supplied interview transcript
3. Research context: arXiv research proposal
4. Author interpretation: bottleneck shift / review bandwidth / orchestration as control plane

レベルを混ぜない。

## 6. Final Thesis

> Orcaの核心は「AIを何本起動できるか」ではなく、生成が余った後の仕事を、独立・観測・レビュー・統合できる単位へ変えることにある。
