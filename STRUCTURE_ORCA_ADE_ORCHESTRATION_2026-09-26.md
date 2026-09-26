# STRUCTURE｜Orcaと並列AI開発

Date: 2026-09-26
Target article: orca-ade-orchestration-review-bottleneck

## 1. Article Promise

読了後、Orcaを単なるAI IDEではなく、parallel workを管理するADEとして説明できる状態を作る。

最重要の認識変化：
「エージェントを増やせば速くなる」から「独立性とレビュー帯域が次の上限になる」へ。

## 2. Weird Hook

インタビュー画面で数十本のtaskが立ち上がり、終わったものから消える。
見た目は人員増加。
しかし調べると、増えているのは生成能力であり、人間のreview capacityは自動では増えない。

## 3. Section Flow

1. IDE→ADE：管理単位がfileからworkへ。
2. Worktree：parallelismの物理的な分離面。
3. Dependency：agent countよりindependent task count。
4. Review：generationが速いほどreviewabilityが設計条件。
5. Design Mode / Mobile：intelligenceよりcontext-transfer friction。
6. Resource cost：SSDとattention。
7. 4〜5x：benchmarkでなくworkflow testimony。
8. Fit：many independent jobsに強い。
9. Conclusion：code-writing deskからcontrol towerへ。

## 4. Uneven U

主要段落：
4 問題設定
→ 2 状況説明
→ 1 具体的根拠
→ 3 分析
→ 5 一段上の含意

各節の最後は冒頭の言い換えではなく、次の節で使える認識へ進める。

## 5. Visual Plan

- Official README hero image：desktop + mobile + multiple work states
- Official Parallel Worktrees poster：isolated workspaces
- Official Design Mode poster：visual feedback → implementation context
- Review bandwidthはblockquoteで視覚的に止める

## 6. Canonical / EN MIX Contract

- H2数・順序を一致
- 各H2内のp / ul / ol / blockquote / figure相当の順序を一致
- 段落のsplit/mergeをしない
- Images/captions/source paragraphsを同位置に置く
