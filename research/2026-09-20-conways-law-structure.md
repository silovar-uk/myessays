# STRUCTURE｜Conway's Law article / Uneven U plan

Date: 2026-09-20
Article: conways-law-org-chart-becomes-architecture

## Purpose

コンウェイの法則を用語解説で終わらせず、
「organization designがdesign search spaceを変える」という認識へ読者を運ぶ。

## Reader

- software architectureの専門家に限らない
- product / project / organization designに関わる実務者
- “Conway's Law = org chart mirrors code”程度は聞いたことがある層を含む

## Most important conclusion

組織のcommunication structureは、
完成したsystemへ後から写るだけではない。
設計中に何がcheap / expensive / naturalに見えるかを変え、
探索できるsolution spaceそのものへ影響する。

## Uneven U at article level

4: 「Slackがarchitecture diagramに見える」という違和感
→ 3: communication structureの説明
→ 2: team / interface / handoff
→ 1: 原論文、empirical numbers、Vista case
→ 2/3: three-org thought experiment
→ 4: Inverse Conway / exceptions
→ 5: organization itself as a slowly executing design program

## Section-by-section movement

### Hook
4 → 2 → 1-like observation → 5
人間のtalking structureがmachine structureになる違和感から、
「design search space」へ到達。

### ORIGINAL
4 → 1 primary source → 3 interpretation → 5
org chartではなくcommunication structure、
さらにdesign alternatives制約へ上げる。

### MECHANISM
4 question → 2 concrete dependencies → 1 handoff example → 4/5
coordination costがdesign behaviorを変えると解釈。

### EVIDENCE
4 falsifiability issue → 1 empirical studies → 3 exception review → 5
Lawをdeterminismからprevalent tendencyへ修正。

### QUALITY
4 “mirroring good/bad?” → 1 Vista case → 3 limitation → 5
social history as quality signal。

### THOUGHT EXPERIMENT
4 question → 2 three organizations → 1 concrete frictions → 3 comparison → 5
organization design = coordination price setting。

### INVERSE
4 reverse question → 1 Thoughtworks / Team Topologies → 2 anti-example → 5
static matchingではなくco-evolution。

### EXCEPTION
4 dangerous misreading → 1 review exception → 3 causal directions → 2 all-to-all meetings → 5
goal = dependency / communication alignment。

### OUTSIDE SOFTWARE
4 applicability question → 1 scope limitation → 2 campaign example → 3 caveat → 5
marketing use = hypothesis, not proven universal law。

### AUDIT
4 practical translation → 1 five questions → 3 overlay → 5
meetings / help channels as sensors.

### DISCOVERY
opening return → evidence recap → conceptual reversal → 5
organization = slowly executing design program。

## Humor rule

ジョークはfactを壊さない。
使う場所：
- 人事異動 = API設計会議
- Lawという名前が先にマイクを握る
- 30 teamsでmicroservicesを作ろうとして急にコメディ
- reorg翌朝にmonolithが細胞分裂しない
- platform teamが中央省庁化
- Gitに残らないcommit

避ける：
- 研究者・企業・職種を笑いものにする
- Windows Vistaの品質問題を単純に揶揄する
- “bad org = bad people”への人格化

## Editorial gate

- FACT / INTERPRETATION / PROPOSALの境界が読める
- 142-study reviewの数字を母集団付きで書く
- Vistaはcase studyと明記
- open collaborationのcounterevidenceを含む
- non-software applicationは解釈と明記
- headingだけで論旨が進む
- paragraph endで次の認識へ上がる
- 同じ結論の言い換えで水増ししない
