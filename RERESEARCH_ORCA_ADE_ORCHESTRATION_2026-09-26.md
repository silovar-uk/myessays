# RERESEARCH｜Orca記事の再検証

Date: 2026-09-26
Target article: orca-ade-orchestration-review-bottleneck

## 1. Name / Canonical Source Check

現在の公式GitHubは stablyai/orca。
公式サイトは https://www.onorca.dev/ 。
記事では旧リポジトリ名や第三者forkを採用しない。

## 2. Feature Recheck

公式READMEとdocsで再確認：
- Parallel worktrees
- Any CLI agent / multiple coding agents
- Design Mode
- GitHub & Linear integration
- Mobile companion
- SSH / remote worktrees
- Review/diff workflow

## 3. Overclaim Check

書かない：
- Orca導入で一般に4〜5倍速くなる。
- 公式100xが実証された性能値である。
- 64GB RAM / 1TB SSDがOrcaの必要条件である。
- Agent数とthroughputが比例する。
- Mobile accessが必ずproductivityを上げる。

## 4. Source Separation Check

- Official fact → onorca.dev / stablyai/orca
- User experience → supplied transcript
- Review bottleneck → arXiv 2605.17548
- Bottleneck shift / control plane → author analysis

## 5. Japanese Terminology Audit

- Agent Development Environment → エージェント開発環境（初出で原語併記）
- worktree → Git固有語として英字を維持
- Design Mode → 製品機能名として英字を維持
- code review → コードレビュー
- orchestration → 文脈に応じて「編成」「調整」「オーケストレーション」
- context → 原則「文脈」、製品挙動の説明では必要に応じ英字併記

日本語版に説明なしの英語を残さない。固有名詞・正式機能名・Git用語は例外。
