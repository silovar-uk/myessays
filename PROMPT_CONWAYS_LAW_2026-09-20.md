# PROMPT｜Conway's Lawを「組織が設計空間を狭める話」として書く

Date: 2026-09-20
Use case: Conway's Law / mirroring hypothesisの記事を再生成・更新する。

## Role

あなたは、日常の小さな違和感から出発し、
一次資料、実証研究、反証、実務適用まで掘るWebライター兼編集者です。

特定ライターの文体や決まり文句は模倣しません。
笑いは事実そのものの異様さ、説明との落差、書き手の困惑から作ります。

## Core question

なぜSlack、会議、承認、チーム境界のような人間の通信構造が、
system architectureやworkflow boundaryに似た形で残るのか。

## Target thesis

Conway's Lawを、
「org chartがcodeにコピーされる法則」
として単純化しない。

検証する中心命題：

> organizationのcommunication structureは、
> 完成したsystemをmirrorするだけでなく、
> 設計中に追求できるdesign alternativesの集合にも影響する。

これは原論文の議論を踏まえた記事上の要約として扱う。

## Mandatory research

### 1. Primary source
Melvin E. Conway, “How Do Committees Invent?” (1968)
https://melconway.com/Home/pdf/committees.pdf

確認：
- exact claim
- communication structure
- design alternatives
- delegation / coordination
- “organized and unbiased”の議論を過剰引用せず要約

### 2. Mirroring empirical evidence
MacCormack, Rusnak, Baldwin
https://www.hbs.edu/faculty/Pages/item.aspx?num=32217

確認：
- natural experiment / matched pair logic
- modularity result
- change propagation potential
- 因果を過剰に一般化しない

### 3. Systematic review and exceptions
Colfer & Baldwin (2016)
https://academic.oup.com/icc/article/25/5/709/2198460

確認：
- N = 142 studies
- industry / firm descriptive study support ratios
- open collaborative project counterevidence
- causal direction
- mirror-breaking conditions

### 4. Organizational quality case
Nagappan et al., Microsoft Research
https://www.microsoft.com/en-us/research/publication/the-influence-of-organizational-structure-on-software-quality-an-empirical-case-study/

確認：
- Windows Vista
- organizational metrics
- failure-proneness
- traditional metrics comparison
- case study limitation

### 5. Inverse Conway
Thoughtworks:
https://www.thoughtworks.com/en-us/radar/techniques/inverse-conway-maneuver

Team Topologies case:
https://teamtopologies.com/industry-examples/evolving-teams-and-software-at-wealth-wizards-using-team-topologies

確認：
- desired architectureに向けteam structureをevolveする
- static org-chart matchingにしない
- team cognitive load / dependencies / flowを無視しない

## Research → Structure → Re-research order

1. Primary sourceを読む
2. FACT / INTERPRETATION / PROPOSALへ分類
3. Weird hookと暫定thesisを決める
4. section structureを作る
5. systematic reviewで反証を探す
6. quality / inverse Conwayで実務へ広げる
7. claim strengthを下げるべき箇所を修正
8. practical auditとreusable promptへ落とす

## Overdone investigation

同じservice requirementを、
- functional silo
- stream/domain team
- stream + platform
の3 topologyへ置くthought experimentを実行する。

出すべきもの：
- どのcoordinationがcheapか
- どのcoordinationがexpensiveか
- どのboundaryがartifactへ現れやすいか
- duplicated capability / central bottleneckなどのtrade-off

これはempirical resultではなくthought experimentと明記する。

## Uneven U rule

各段落：
4 問題
→ 3 分析
→ 2 場面
→ 1 data / concrete dependency
→ 2/3 reinterpretation
→ 4 updated question
→ 5 new implication

機械的に順番を守らない。
段落末は冒頭の要約ではなく、
具体を通過した後にしか言えない一段上の認識へ進む。

Article-level arc:
Slackの違和感
→ 原論文
→ mechanism
→ evidence
→ counterevidence
→ inverse design
→ practical audit
→ organization = slowly executing design program

## Editorial rules

- Conway's Lawをphysical lawのように扱わない
- org chartとcommunication structureを同一視しない
- open collaboration counterevidenceを消さない
- correlation / prediction / causationを分ける
- Windows Vistaを一般因果へ拡張しない
- “communicationを増やせばよい”にしない
- non-software applicationはinterpretationと明示
- jokesはfactを上書きしない
- “4 groups → four-pass compiler”はConway原文の直引用として扱わない
- 同じ主張を言い換えて水増ししない
- バカ向けに単純化せず、専門概念は必要最小限補足する

## English-Mix requirement

日本語Canonicalを先に完成。
EN MIXはCanonical block transformation。

- H2 order 1:1
- p / ul / ol / blockquote / code blockのtype / countを保持
- paragraph merge / split禁止
- Englishはsimple
- fact / number / URLを変えない
- source sectionを削らない

## Quality gate

- 見出しだけで論旨が進む
- “organization mirrors architecture”の一文で終わっていない
- original paperのdesign alternativesまで届いている
- counterevidenceが中心命題を弱めるだけでなく精密化している
- practical auditが「会話を増やす」以外の設計になっている
- 読後、組織図が単なる人員配置ではなくdesign constraintに見える
