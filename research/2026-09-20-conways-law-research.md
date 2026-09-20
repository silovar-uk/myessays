# RESEARCH｜Conway's Law / Mirroring Hypothesis

Date: 2026-09-20
Target article: conways-law-org-chart-becomes-architecture

## Phase 1｜First research

### Primary source
Melvin E. Conway, “How Do Committees Invent?” (1968)
https://melconway.com/Home/pdf/committees.pdf

確認した事実：
- 後にConway's Lawと呼ばれる命題は、設計されたsystemの構造とorganizationのcommunication structureの対応を述べる。
- 原論文は、design organizationを選ぶこと自体が、一部のdesign decisionsを暗黙に済ませると論じる。
- 必要なcommunication pathがない組織では、効果的に追求できないdesign alternativeがある。
- 委譲によって各subgroupの探索範囲を狭めるほど、組織全体が実際に追求できる設計案も狭まる。

記事上の意味：
単なる「org chart mirrors architecture」ではなく、
「communication structure constrains design search space」を中心命題にする。

### Early empirical work / natural experiment
MacCormack, Rusnak, Baldwin
“Exploring the Duality between Product and Organizational Architectures”
https://www.hbs.edu/faculty/Pages/item.aspx?num=32217

確認した事実：
- 同じ機能を担うsoftwareを、異なるorganizational formで作ったmatched pairsとして比較。
- loosely coupled organizationsが作ったsystemの方が、tightly coupled organizationsのsystemよりmodularだった。
- change propagation potentialの差はpairによって最大factor 8と報告。

注意：
- これだけで一般的因果を確定しない。
- open source vs commercialというorganizational formの差には複数要因があり得る。

## Phase 2｜Structure before re-research

Core question:
「なぜSlack・会議・承認の構造が、system boundaryに見える形で残るのか？」

Working thesis:
Conway's Lawの本質は、成果物がorg chartをコピーすることより、
communication costが設計者の探索可能性とdependency placementを変えることにある。

Planned blocks:
1. Weird hook: Slack channels look like architecture
2. Original paper: communication structure / design alternatives
3. Mechanism: coordination cost
4. Evidence: mirroring studies
5. Quality: Windows Vista
6. Thought experiment: three orgs, same service
7. Inverse Conway
8. Exception and limits
9. Outside software
10. Audit
11. Discovery
12. Reusable prompt

## Phase 3｜Re-research

### Systematic review / exceptions
Lyra J. Colfer, Carliss Y. Baldwin
“The mirroring hypothesis: theory, evidence, and exceptions”
https://academic.oup.com/icc/article/25/5/709/2198460

確認した事実：
- 142 empirical studiesをレビュー。
- industry / firm descriptive studiesでは70% strong support, 22% partial support, 8% no support。
- open collaborative projectsのdescriptive studiesでは56%がmirroringをsupportしない。
- mirroringはprevalentだがuniversalではない。
- causal directionはorganization→technologyだけに固定されない。
- digital coordination toolsなどによりmirrorを部分的にbreakできる可能性を論じる。

記事上の補正：
「Law = deterministic rule」という読みを明確に退ける。

### Organizational structure and quality
Nagappan et al.
“The Influence of Organizational Structure On Software Quality: An Empirical Case Study”
https://www.microsoft.com/en-us/research/publication/the-influence-of-organizational-structure-on-software-quality-an-empirical-case-study/

確認した事実：
- Windows Vista case study。
- organizational complexity metricsはfailure-pronenessのstatistically significant predictors。
- study内では、traditional code / process metricsより高いprecision / recallを報告。
- single caseであり、組織構造→不具合の一般因果を直接証明するものではない。

### Inverse / Reverse Conway
Thoughtworks Technology Radar
https://www.thoughtworks.com/en-us/radar/techniques/inverse-conway-maneuver

確認した事実：
- desired architectureを促進するようteam / organizational structureをevolveさせる考え方。
- 2014/2015 Technology Radarで扱われた。

Team Topologies case study: Wealth Wizards
https://teamtopologies.com/industry-examples/evolving-teams-and-software-at-wealth-wizards-using-team-topologies

確認した事実：
- logical components / dependenciesを可視化。
- business domain boundariesへteam boundariesを再調整。
- Reverse Conwayを実践例として説明。

## FACT / INTERPRETATION / PROPOSAL boundary

FACT:
- 原論文の命題とdesign alternativesの議論
- 142-study reviewの比率
- HBS matched-pair result
- Windows Vista case result
- Thoughtworks / Team TopologiesのReverse Conway説明

INTERPRETATION:
- Slack / meeting structure can be read as an unofficial dependency graph
- organization design acts like a price system for coordination
- system artifacts carry traces of collaboration history
- non-software workflowへの応用

PROPOSAL:
- five-question dependency audit
- org communication graphとtechnical dependency graphを重ねる
- “communicationを増やす”ではなくdependencyとcommunicationをalignする
- code refactor前にresponsibility / approval / team boundaryを見直す

## Claims deliberately rejected

- 「Conway's Lawは必ず成立する」
- 「組織図を変えれば自動的にarchitectureが変わる」
- 「microservicesには多数のteamsが必要」
- 「communicationは多いほどよい」
- 「Windows Vistaの研究が一般因果を証明した」
- 「software以外にも同じ実証強度で成立する」

## Overdone method executed

同一サービスを、
A: functional silos
B: stream/domain teams
C: stream + platform
の3 organizational topologyで作るthought experimentを構成。

目的：
architectureを当てることではなく、
各organizationが「どのcoordinationをcheap / expensiveにするか」を比較し、
team structureをcommunication-cost pricingとして読む。
