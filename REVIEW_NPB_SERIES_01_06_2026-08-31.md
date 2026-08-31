# NPB学習シリーズ Review — Episodes 1–6

Updated: 2026-08-31
Series: `野球という産業を読む`
Scope: Episode 1–6

## 1. Overall assessment

**PASS — Episode 7へ進んでよい。**

第1〜6回は、野球知識を横に並べるシリーズではなく、以下のlearning pathとして成立している。

1. WHERE — NPBの地図
2. WHO — 選手と役割
3. HOW TO MEASURE — 選手価値を見る数字
4. LEAGUE SYSTEM — 競争フォーマット
5. PLAYER ALLOCATION — 新人選手の入口
6. PLAYER DEVELOPMENT — 獲得した選手を戦力へ変える

流れは、

**場所 → 人 → 測定 → 競争制度 → 戦力獲得 → 戦力化**

となった。

Episode 5–6によって、TEAM BUILDINGという新しいまとまりが概念上成立した。

ただしUI上のPhase分割はまだ不要。

## 2. Episode-by-Episode role

### Episode 1 — WHERE

Core:

NPBにはどんな球団があり、どこにあり、どの程度の規模なのか。

Role:

**map before detail**

Acquired concepts:

- 12球団
- 2リーグ
- geography
- standings
- attendance
- 143試合

### Episode 2 — WHO

Core:

選手はどんな役割を担うのか。

Role:

**names → roles**

Acquired concepts:

- pitcher / position player
- defensive position
- starter / reliever
- hitter archetype
- player role

### Episode 3 — HOW TO MEASURE

Core:

選手価値を何の数字で見るのか。

Role:

**role → measurement**

Acquired concepts:

- AVG / OBP / SLG / OPS
- ERA / WHIP / K9
- WAR
- metric = lens
- what it sees / what it misses

### Episode 4 — LEAGUE SYSTEM

Core:

なぜNPBは12球団・2リーグ・143試合なのか。

Role:

**facts → system design**

Acquired concepts:

- institutional genealogy
- two leagues and 12 teams as separate histories
- current 143-game architecture
- interleague / postseason
- schedule = architecture of competition

### Episode 5 — PLAYER ALLOCATION

Core:

ドラフトは何を配分する制度なのか。

Role:

**competition system → talent allocation**

Acquired concepts:

- negotiation rights
- pick ≠ contract
- eligibility
- allocation order
- conflict / lottery
- transition / expiry
- RESOURCE / ELIGIBILITY / ORDER / CONFLICT / EXIT

### Episode 6 — PLAYER DEVELOPMENT

Core:

球団は獲得した選手をどう一軍戦力へ変えるのか。

Role:

**talent acquisition → organizational capability**

Acquired concepts:

- 支配下 / 育成 as one axis
- 一軍 / farm as another axis
- 出場選手登録 as another layer
- 2026 farm: 1 league / 3 regions / 14 participants
- development / adjustment environment
- ACQUIRE → DEVELOP → PLAY → EVALUATE → REGISTER → PROMOTE / USE
- INPUT / OPPORTUNITY / DEVELOPMENT / EVALUATION / TRANSITION / BOTTLENECK

## 3. Connection audit

### Episode 1 → 2

Mapからpeopleへ。

PASS。

### Episode 2 → 3

Roleからmeasurementへ。

過去のplayer examplesを再利用し、retrievalが具体的。

PASS。

### Episode 3 → 4

個人評価からleague architectureへzoom out。

Episode 1の`12 / 2 / 143`を再利用できた。

PASS。

### Episode 4 → 5

リーグが競争条件を設計する

↓

リーグがtalent entryにもallocation ruleを置く。

Strong connection。

### Episode 5 → 6

契約交渉権を得る

↓

契約後のtalentを戦力化する。

Episode 5–6はシリーズ内で初めて明確な連続processを形成した。

**acquisition → development**

PASS。

## 4. Multi-episode retrieval audit

Episode 6は一つ前だけでなく複数の過去Episodeを再利用した。

### Episode 3 → 6

`Metric = lens`

↓

支配下昇格人数だけで育成力を決めない。

### Episode 4 → 6

`schedule = architecture of competition`

↓

farm schedule = distribution of game reps / development environment

### Episode 5 → 6

`PICK → NEGOTIATION RIGHT → CONTRACT`

↓

`ACQUIRE → DEVELOP → PLAY → EVALUATE → REGISTER → PROMOTE / USE`

この形は、単なる前回要約ではない。

**以前のconceptを、新しい問いを解く道具として再利用している。**

Retrieval design: PASS。

## 5. Difficulty audit

Approximate difficulty:

- Episode 1: Low
- Episode 2: Low–Medium
- Episode 3: Medium
- Episode 4: Medium
- Episode 5: Medium
- Episode 6: Medium

Episode 6は用語数が増えやすいテーマだったが、

`支配下 / 育成 / 一軍 / farm / 出場選手登録`

を一本道のhierarchyへ詰め込まず、3軸に分けたことで難易度上昇を抑えられた。

今後も、

**専門用語を減らせない場合は、関係を単純化するのではなく分類軸を分離する。**

この方法をKEEP。

## 6. Beginner gap audit

まだ十分に扱っていないconcept：

- 3アウト
- 9イニング
- 打席 / 打数
- earned run
- roster制度の細則
- 契約更改
- 年俸
- FA
- trade
- foreign-player acquisition
- release / 戦力外

### Baseball Basics interlude decision

**まだ不要。**

3アウト・9イニング等の未説明部分は、Episodes 1–6の中心理解を壊していない。

一方、roster / contract関連はTEAM BUILDING / PLAYER ECONOMICSの文脈で自然に学べる。

独立Basics記事を増やすより、必要になったタイミングで文脈内に導入する方がよい。

## 7. Team Building Phase audit

Episode 5:

PLAYER ALLOCATION

Episode 6:

PLAYER DEVELOPMENT

ここで概念上は、

**TEAM BUILDING**

というPhaseが成立した。

ただし現在は2記事のみ。

### Phase UI decision

**DEFER**

理由：

1. シリーズ全体がまだ6本で、seriesOrderだけで追える。
2. TEAM BUILDINGが2本だけなので、UI分類を増やすbenefitが小さい。
3. Phase labelを説明するUI costが発生する。
4. Episode 7でPLAYER VALUE / CONTRACTが加わると、分類の境界を再評価しやすくなる。

Recommended revisit:

**Episode 7または8完了後。**

Conceptual taxonomy should precede UI taxonomy.

## 8. Current conceptual map

現時点では次のように見える。

### FOUNDATION

1. WHERE
2. WHO
3. HOW TO MEASURE

### LEAGUE DESIGN

4. LEAGUE SYSTEM

### TEAM BUILDING

5. PLAYER ALLOCATION
6. PLAYER DEVELOPMENT

ただしこのPhase名は内部編集用。

まだfront-end UIへ固定しない。

## 9. What the series is becoming

Episode 1–3だけなら、

「NPB初心者講座」

としても読めた。

Episode 4–6によって、シリーズの役割がより明確になった。

NPBを題材に、

- measurement
- institutional design
- allocation
- organizational capability
- bottleneck

を読む。

つまり、

**野球を知るためのシリーズ**

から、

**野球を使ってスポーツ産業・組織・制度を読むシリーズ**

へ進んでいる。

Original series objectiveと整合。

## 10. Information Budget audit

PASS。

Episode 6で意図的に入れなかったもの：

- 三軍 / 四軍の全球団比較
- MLB Minor League
- 独立リーグ詳細
- FA
- trade
- active draft
- release
- salary details
- exhaustive roster agreement clauses

これらを入れなかったことで、

**「獲得した選手をどう戦力化するか」**

というQuestionを維持できた。

## 11. QA process audit

Episode 6ではpublishing process自体にもlearningがあった。

### First publication QA

- migration: PASS
- static: PASS
- Reading Versions: PASS
- Argument Structure: FAIL

Episode 4で一度発生したのと同じselection assertion familyだったため、単純rerunで閉じなかった。

### Separate infrastructure fix

PR #49でsmooth scroll settle後にselection stateを検証するよう変更。

### Post-fix QA

Full PASS。

Lesson:

**Repeated flake is a system signal.**

記事制作とbrowser timing fixを分離したこともKEEP。

## 12. What to KEEP across Episodes 7+

- Question-first title.
- 一次情報でCurrent / Historicalを分ける。
- Information BudgetをResearch段階で決める。
- FACT / INTERPRETATIONを分離する。
- 過去Episodeのfactを新しいquestionの材料にする。
- 概念が複数軸を持つ場合は、初心者向けに雑な階層化をしない。
- 説明対象がsystemならtransitionとbottleneckを見る。
- 制度が解決しないことも書く。
- Business Bridgeでは未検証のROIを断定しない。
- QA recurrenceは記事と別issueとして扱う。

## 13. What to watch next

次に年俸・契約へ進むと、factsの情報品質が難しくなる。

特に、

**official salary vs reported estimated salary**

を分ける必要がある。

スポーツ報道では「推定○億円」が広く流通するが、公式公開情報と同じ扱いにしない。

Episode 7はこれまで以上に、

**Information Boundary**

が重要になる。

## 14. Episode 7 recommendation

### Title

**なぜ選手の年俸は毎年変わるのか**

### Role

PLAYER VALUE / CONTRACT

### Core Question

**球団は、選手の価値をどう翌年の契約条件へ変換しているのか？**

### Why now

Episode 2:

role

Episode 3:

measurement

Episode 5:

acquisition

Episode 6:

development / evaluation

ここまで揃ったので、次は

**evaluation → price / contract**

へ進める。

This is the first explicit PLAYER ECONOMICS article.

## 15. Better question after six episodes

Episode 1では、読者は

「どの球団が強い？」

と聞くところから始まった。

Episode 6終了時点では、

**「球団は誰を獲得し、そのtalentへどんな実戦機会を配り、何を評価し、どのtransitionを通して一軍戦力へ変え、どこがbottleneckになっているか？」**

と問える。

シリーズの成功基準である

**question qualityの向上**

は成立している。
