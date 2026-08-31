# NPB学習シリーズ Review — Episodes 1–5

Updated: 2026-08-31
Series: `野球という産業を読む`
Scope: Episode 1–5

## 1. Overall assessment

**PASS — Episode 6へ進んでよい。**

第1〜5回は、個別知識の並列ではなく、以下の学習経路としてつながっている。

1. WHERE — NPBの地図
2. WHO — 選手と役割
3. HOW TO MEASURE — 選手価値を見る数字
4. LEAGUE SYSTEM — 競争フォーマット
5. PLAYER ALLOCATION — 新人選手の入口

流れは、

**場所 → 人 → 測定 → 競争制度 → 戦力の入口**

となった。

初心者向けのFoundationから、スポーツ産業・制度設計を読む段階へ自然に移行できている。

大規模な構造修正は不要。

## 2. Learning path audit

### Episode 1 — WHERE

問い：

NPBにはどんな球団があり、どこにあり、どの程度の規模なのか。

獲得したもの：

- 12球団
- 2リーグ
- geography
- attendance / standingsの入口
- 143試合
- 交流戦 / CS

Role:

**map before detail**

### Episode 2 — WHO

問い：

選手は何をする人なのか。

獲得したもの：

- 投手 / 野手
- 守備位置
- starter / reliever
- hitter archetype
- player role

Role:

**names → roles**

### Episode 3 — HOW TO MEASURE

問い：

良い選手を何の数字で見るのか。

獲得したもの：

- AVG / OBP / SLG / OPS
- ERA / WHIP / K9
- WAR
- metric = lens
- what it sees / what it misses

Role:

**role → measurement**

### Episode 4 — LEAGUE SYSTEM

問い：

なぜ12球団・2リーグ・143試合なのか。

獲得したもの：

- 2リーグと12球団は別の歴史
- 143試合はcurrent architecture
- interleague / postseason
- league format = architecture of competition
- WHO / WHO PLAYS WHOM / WHAT COUNTS / WHAT HAPPENS NEXT

Role:

**facts → system design**

### Episode 5 — PLAYER ALLOCATION

問い：

ドラフトは何を配分する制度なのか。

獲得したもの：

- negotiation rights
- draft pick ≠ signing
- eligibility
- first-round conflict / lottery
- later-round order
- development draft entry
- RESOURCE / ELIGIBILITY / ORDER / CONFLICT / EXIT

Role:

**competition system → talent allocation**

## 3. Connection audit

### Episode 1 → 2

球団名・選手名を知るだけでなく、選手の役割へ進む。

PASS。

### Episode 2 → 3

役割を知ったうえで、その価値を何の数字で見るかへ進む。

同じ選手を再利用し、retrieval cueとして機能。

PASS。

### Episode 3 → 4

個人評価からleague-wide systemへzoom out。

難易度は上がるが、Episode 1で覚えた12 / 2 / 143を再利用したことで接続できた。

PASS。

### Episode 4 → 5

「リーグは競争条件を設計する」から、

「リーグはtalentの入口にもルールを置く」

へ進んだ。

制度論として最も強いconnection。

PASS。

## 4. Difficulty audit

Approximate difficulty:

- Episode 1: Low
- Episode 2: Low–Medium
- Episode 3: Medium
- Episode 4: Medium
- Episode 5: Medium

Episode 4以降は抽象度が上がっているが、専門用語量を増やす方向ではなく、

**問いの抽象度が上がる方向**

なので学習シリーズとして健全。

Episode 6ではさらに制度用語を大量追加しない。

`支配下 / 育成 / ファーム / 出場選手登録`

など似た言葉が増えるため、用語辞典型の記事にしないことが重要。

## 5. Retrieval audit

シリーズのRetrieval Bridgeは機能している。

### Productive retrieval

Episode 1 → 4:

`12 / 2 / 143`

fact → why / system

Episode 2 → 3:

player names / roles

role → metric

Episode 4 → 5:

league designs competition

competition design → allocation design

同じ情報を再掲するだけでなく、

**前の記事で覚えたfactを、次の記事で新しいquestionの材料にしている。**

KEEP。

## 6. Beginner gap audit

まだ初心者に説明していない、または断片的なconcept：

- 3アウト
- 9イニング
- 打席 / 打数
- earned run
- starter / reliever
- 支配下選手
- 育成選手
- 一軍 / 二軍
- 出場選手登録
- roster

現時点で、最初の5つを補うための独立Baseball Basics記事は不要。

理由：

Episodes 1–5の中心理解を阻害するほどのgapにはなっていない。

一方、

- 支配下
- 育成
- 一軍 / 二軍
- 出場選手登録

はEpisode 5の次に直接必要になった。

したがってBasicsへ戻るのではなく、Episode 6で文脈の中から導入する。

## 7. Information architecture / UI audit

Current metadata:

- `series`
- `seriesOrder`

で5本の順序は成立している。

まだPhase UIは追加しない。

ただしEpisode 6または7完了後に再評価する。

理由：

5本時点では一本道として追える。

8本前後になると、

- Foundation
- Team Building
- Business

などのPhase groupingがnavigationとして意味を持ち始める可能性がある。

Current decision:

**No Phase UI yet. Reassess at Episode 7–8.**

## 8. Update burden audit

### Episode 1

Class: Pulse

High update burden:
- standings
- players
- attendance
- 2026 season snapshot

### Episode 2

Class: Pulse

High:
- selected player stats / team context

### Episode 3

Class: Hybrid

Medium:
- examples / season stats
- metric definitions mostly stable

### Episode 4

Class: Hybrid

Medium:
- historical core stable
- current games / schedule / CS rules update-sensitive

### Episode 5

Class: Hybrid

Medium–High around draft season:
- current-year procedure
- selection order
- declaration deadlines
- negotiation-right rules

### Update grouping

Episodes 1–3 remain a `Foundation Snapshot Batch` around 2026-08-30.

Episodes 4–5 should be treated as a `Current Rules Batch` when major NPB rule changes occur.

Draft-specific update:

2026 detailed procedure公開後はEpisode 5を優先更新する。

## 9. Better Question progression

Series success should be measured by question quality.

### Before Episode 1

**NPBってどのチームがある？**

### After Episode 1

**どの球団がどこにあり、どのくらい強く、どのくらい人を集めている？**

### After Episode 2

**この選手は、試合のどんな価値を作る人？**

### After Episode 3

**その価値をどの数字で見る？ その数字は何を見落とす？**

### After Episode 4

**このリーグは誰と誰を何回戦わせ、何を勝者としている？ なぜこの形？**

### After Episode 5

**新人選手との交渉機会を、誰に、どんな順番で、競合時にどう配り、その後どんな選択余地が残る？**

Question quality is clearly improving.

PASS。

## 10. What the series is becoming

最初は「野球を知らない人向けNPBガイド」だった。

5本終了時点では、より明確に、

**NPBをケーススタディとして、スポーツという産業システムを読むシリーズ**

になっている。

これは良い変化。

ただし、抽象化だけ進みすぎると野球そのものから離れる。

Episode 6では再び現場へzoom inし、

**選手が実際にどこで育ち、どの試合へ出て、一軍へ近づくのか**

を扱う。

## 11. Candidate comparison for Episode 6

### A. FAとは何を自由にする制度なのか

Pros:
- draftとの対比が明快
- allocation → mobilityへつながる

Cons:
- 初心者には、支配下 / roster / team developmentを飛ばして移籍制度へ進むことになる

Decision:
Not yet.

### B. 外国人選手はどうNPBへ来るのか

Pros:
- global talent marketへ広がる

Cons:
- domestic entry pipelineが未完成

Decision:
Later.

### C. 球団は選手にいくら払えるのか

Pros:
- businessへの接続が強い

Cons:
- player lifecycleを飛ばす

Decision:
Later.

### D. 二軍・育成選手・ファームは何のためにある？

Pros:
- Episode 5で育成選手をすでに見た
- `entry → development`が自然
- 一軍 / 二軍 / 支配下 / 育成の初心者gapを同時に解消できる
- team buildingの実務へ戻れる

Cons:
- 用語が似ていて辞典化しやすい

Decision:
**NEXT.**

## 12. Episode 6 Brief

### Title

**二軍・育成選手・ファームは何のためにある？**

### Role

PLAYER DEVELOPMENT / OPPORTUNITY SYSTEM

### Core Question

**球団に入った選手は、どうやって一軍戦力へ変わるのか？**

### Learning goal

読了後に、初心者が最低限：

- 一軍とファームの関係
- 二軍と育成選手は同義ではない
- 支配下登録と出場選手登録は別
- ファームには育成・調整・評価・実戦機会という複数機能がある
- talent acquisitionだけではteam buildingは終わらない

を説明できるようにする。

### Central metaphor

**Farm system = development pipeline**

### Learning ladder

ENTRY
→ DEVELOPMENT
→ GAME OPPORTUNITY
→ EVALUATION
→ PROMOTION

### Research priorities

- NPB 2026 farm structure
- Eastern / Western league clubs
- オイシックス / ハヤテ等の現在位置
- 支配下選手 / 育成選手 definitions
- roster limits
- 育成→支配下のcurrent rules and deadlines
- 出場選手登録
- farm participation rules
- first-team promotion mechanics at beginner level

### Information Budget

Do not turn into:

- full minor-league history
- all farm standings
- prospect ranking
- every roster regulation
- every development-player rule

### Next possible question after Episode 6

Do not fix yet.

Possible branches:

- PLAYER MOBILITY — FA
- GLOBAL TALENT — foreign players
- PLAYER COST — salary / contracts
- TEAM ECONOMICS — how clubs spend to build a roster

Choose after Episode 6 Retrospective.

## 13. Final decision

Episodes 1–5 require no structural rewrite before continuing.

Next action:

**Episode 6をRESEARCH → DESIGN → WRITE → QA → RETROSPECTIVEまで実行する。**
