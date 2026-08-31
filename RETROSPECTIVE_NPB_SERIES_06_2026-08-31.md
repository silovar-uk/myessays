# NPB学習シリーズ 第6回 Retrospective / 第7回 Brief

Updated: 2026-08-31
Series: `野球という産業を読む`
Episode 6: `npb-player-development-farm-roster-pipeline`

## 1. Publish result

第6回「二軍・育成選手・ファームは何のためにある？」を、日本語canonical + English Mixとして公開。

- Japanese: `essays/2026-08-31-npb-player-development-farm-roster-pipeline.md`
- English Mix: `english-mix/npb-player-development-farm-roster-pipeline.md`
- Research Note: `RESEARCH_NPB_SERIES_06_2026-08-31.md`
- `seriesOrder: 6`
- `data/index.json` 登録済み
- `data/versions-index.json` 登録済み
- PR: `#48`
- Episode 6 merge commit: `15a1b552a6d998166c8e6a5670f4d595d95a5d4a`

### GitHub Pages

Episode 6 merge commit:

- Run: `33385750434`
- Result: success

### Episode 6 initial Visual QA

- Run: `33385751471`
- Result: failure

Successful before failure:

- Content migration audit: success
- Static tests: success
- Reading Versions browser QA: success

Failure:

- Argument Structure browser QA
- `scripts/argument-structure-qa.cjs:170`
- `false !== true`
- Paragraph 2 selectionの`is-argument-active` assertion

Because this is the same assertion family that failed once during Episode 4, it is no longer treated as a one-off flake.

### QA infrastructure follow-up

Separate PR `#49` changed only Argument Structure QA timing/settling logic.

- Commit: `47daad99a82954c693a69bd872e90540b015f867`
- Change: programmatic smooth scrollがsettleしたことを待ってから、Paragraph 2のInspector / profile / active stateを検証する
- Runtime / article content変更なし

Post-fix Visual QA:

- Run: `33385910625`
- Result: success

Successful steps:

- Content migration audit: success
- Static tests: success
- Reading Versions browser QA: success
- Argument Structure browser QA: success
- Page Reader browser QA: success
- Browser visual QA: success
- QA artifacts upload: success

Conclusion:

**Episode 6 content is published and passes the complete current QA chain after the separate QA-infrastructure fix.**

## 2. 第6回で成立したこと

### 1. 初心者が混同しやすい分類を「3軸」に分けた

今回の最大のlearning designは、以下を一本の上下関係にしなかったこと。

### Axis A — 契約・登録区分

`支配下 / 育成`

### Axis B — 競技環境

`一軍 / ファーム`

### Axis C — 一軍出場状態

`出場選手登録 / 非登録`

これにより、

- 支配下 = 一軍
- 育成 = 二軍

という初心者向け説明で起こりやすい誤解を避けられた。

分類項目を増やすのではなく、**分類軸そのものを分ける**ことが有効だった。

### 2. Episode 5の「入口」から戦力化へ自然につながった

Episode 5:

`PICK → NEGOTIATION RIGHT → CONTRACT`

Episode 6:

`ACQUIRE → DEVELOP → PLAY → EVALUATE → REGISTER → PROMOTE / USE`

Episode 5で契約まで見たあと、Episode 6で

**契約した選手をどう戦力へ変えるか**

へ進めた。

これにより、ドラフト結果とチームの将来戦力を直結させない見方を導入できた。

### 3. 2026年のファーム再編をCurrent factとして組み込めた

2026年からファームは旧イースタン／ウエスタンの2リーグ制ではなく、

**1リーグ・3地区・14球団**

となった。

さらに予定試合数は全球団共通ではなく135〜146試合。

一軍の`12球団 / 143試合`をそのままファームへ投影しない構造になった。

### 4. Episode 4のschedule lensを再利用できた

Episode 4:

`schedule = architecture of competition`

Episode 6:

`schedule = part of the development environment`

ファームの日程を「二軍の日程表」ではなく、

**誰に、どれくらいのgame repsを与えられる環境か**

として読み替えた。

Retrieval Bridgeとして良い。

### 5. Episode 3のMetric lensも戻せた

「育成から支配下へ上がった人数」だけで育成力をランキングしない。

Episode 3の

`Metric = lens`

を再利用し、育成人数や昇格人数は一つの観測指標にすぎないと整理した。

過去記事の知識が新しい制度理解に使われている。

## 3. KEEP

- 分類項目を並べる前に、分類軸を分ける。
- `支配下 / 育成`と`一軍 / farm`を同一階層にしない。
- player acquisitionとplayer developmentを別能力として扱う。
- `ACQUIRE → DEVELOP → PLAY → EVALUATE → REGISTER → PROMOTE / USE`を分析フレームとして使う。
- `INPUT / OPPORTUNITY / DEVELOPMENT / EVALUATION / TRANSITION / BOTTLENECK`の6問。
- Current farm structureを一次情報で更新する。
- Episode 3 / 4 / 5から複数のRetrieval Bridgeを作る。
- ファームをyoung-player-onlyの場所として説明しない。
- Business Bridgeはorganizational capabilityまでに留め、ROIを推測しない。
- QA failureは記事内容とQA infrastructureへ切り分ける。

## 4. CHANGE

### 1. 制度記事では「同じ単語が何軸あるか」をResearch段階で確認する

今回の`昇格`は曖昧になりやすい。

- 育成 → 支配下
- ファーム → 一軍
- 非登録 → 出場選手登録

は同じtransitionではない。

今後も、制度用語が複数軸を一語で表していないか確認する。

### 2. Current ruleの完全な条文が取れない数字は記事の主役にしない

支配下登録選手数について、現在の公示から70名に達している球団が多いことは確認できる。

一方、今回のResearchでは野球協約の該当条文全文を一次情報として直接取得していない。

そのため、`70`を制度説明の主役や固定ルール断定には使わなかった。

KEEP this evidence discipline.

### 3. Browser QAは「DOM state」と「scroll-derived state」を分ける

Episode 4と6で同じArgument Structure assertionが揺れた。

原因は記事contentではなく、programmatic smooth scrollとselection stateの検証タイミング。

PR #49でscroll settled待ちを追加。

今後、scrollやanimationに依存するbrowser QAでは、DOM text更新だけをready条件にしない。

## 5. REMOVE

- `二軍 = 若手の場所`という説明。
- `育成 = 二軍選手`という説明。
- `支配下 = 一軍選手`という説明。
- 一軍12球団の構造をそのままファームへコピーすること。
- ファーム勝率だけで育成力を評価すること。
- 支配下昇格人数だけで育成ランキングを作ること。
- 三軍・四軍、独立リーグ、MLB Minor Leagueを今回の脇道で全解説すること。
- 初回QA failureをrerunだけでflakyとして閉じること。

## 6. ADD

### Multi-Axis Classification Audit

制度用語を扱う記事では、Research段階で以下を確認する。

1. 何を分類しているか
2. 分類軸はいくつあるか
3. 同じ対象が複数軸へ同時に属するか
4. 日常語が複数transitionをまとめていないか
5. 初心者が上下関係として誤読しないか

### Development System Audit

1. INPUT — 誰が入る
2. OPPORTUNITY — どこで実戦を積む
3. DEVELOPMENT — 何を伸ばす
4. EVALUATION — 何で評価する
5. TRANSITION — 次へどう移る
6. BOTTLENECK — どこで詰まる

TEAM BUILDING関連記事で再利用する。

### QA recurrence rule

同一assertionが別記事公開時に再発したら、

- content failure
- runtime failure
- fixture failure
- timing / interaction failure

へ分類し、記事PRとは別のQA PRで修正する。

Episode 6でこの運用を実際に行えた。

## 7. Beginner Check after publication

### PASS

読者が最低限、以下を説明できる構造になった。

- 支配下と一軍は同義ではない。
- 育成と二軍は同義ではない。
- 一軍 / farmは支配下 / 育成とは別の軸。
- 出場選手登録はさらに別レイヤー。
- 2026年ファームは1リーグ3地区・14球団。
- ファームは若手育成だけでなく、実戦機会や調整にも使われる。
- 良い選手を獲得することと、その選手を一軍戦力へ変えることは別能力。
- 球団を見るときはinputだけでなくbottleneckも見る。

## 8. Rule Change Watchpoints

Future updateで再確認する：

- farm league structure
- participating clubs
- district assignments
- farm game-count design
- first-team active registration counts / rules
- deregistration and re-registration interval
- 支配下登録関連ルール
- 育成→支配下の期限・条件
- farm championship eligibility

## 9. Phase UI decision after Episode 6

### Decision: **まだ実装しない**

Episode 5–6で、

- PLAYER ALLOCATION
- PLAYER DEVELOPMENT

というTEAM BUILDINGの塊は成立し始めた。

ただし現時点では2本だけ。

6本のシリーズ全体も`seriesOrder`で十分追える。

ここでPhase UIを追加すると、navigation benefitよりtaxonomy説明の方が増える可能性がある。

Therefore:

**Conceptual phase is now valid, UI phase is deferred.**

Episode 7または8完了後、TEAM BUILDING / PLAYER ECONOMICSが3〜4本になった段階で再評価する。

## 10. 第7回 Brief

### Provisional Title

**なぜ選手の年俸は毎年変わるのか**

### Role

PLAYER VALUE / CONTRACT

### Core Question

**球団は、選手の価値をどう翌年の契約条件へ変換しているのか？**

### Learning goal

年俸を、

「活躍すれば上がる数字」

から、

**過去の実績・期待される役割・契約制度・交渉を通じて決まるplayer price / contract outcome**

として読む。

### Retrieval Bridge

Episode 2:

player role

Episode 3:

metric = lens

Episode 6:

player development / evaluation

↓

Episode 7:

**evaluation → contract value**

### Research questions

1. NPBの契約更改とは何か。
2. 統一契約書・年俸に関する現行制度を一次情報でどこまで確認できるか。
3. 最低年俸 / 減額制限などcurrent rulesはどうなっているか。
4. 成績と年俸はどの程度直結するのか。
5. 出場機会・役割・年齢・FA資格などはどう関係するか。
6. 推定年俸報道と公式年俸の情報境界をどう扱うか。
7. 球団の査定基準で公開されている情報はどこまであるか。
8. `performance = salary`という単純式をどう崩すか。

### Guardrails

- 推定年俸を公式値として書かない。
- 活躍すれば機械的に何％上がる、と書かない。
- 年俸 = 選手の真の価値、としない。
- MLB salary arbitrationと混同しない。
- 公開されていない球団査定式を推測しない。
- 契約更改 / FA / arbitration / free agencyを一記事に詰め込まない。

### Suggested article structure

1. QUESTION — なぜ同じ選手の価格が毎年変わる？
2. SHORT ANSWER — 年俸は成績表そのものではない
3. CONTRACT — 何を更新しているのか
4. PERFORMANCE — どの数字が材料になるのか
5. ROLE — 同じ数字でも役割が違う
6. RULES — 最低額・減額・制度上の境界
7. NEGOTIATION — 査定と合意は別
8. INFORMATION GAP — 公開年俸はどこまで確かなのか
9. SYSTEM VIEW — 球団は何へ価格を付けている？
10. WHAT IT DOES NOT MEAN
11. 30秒でplayer contractを読む
12. Takeaways
13. Next Question

### Next after Episode 7

候補：

- FAとは何を自由にする制度なのか
- トレードとは何を交換する制度なのか
- 外国人選手はどうNPBへ入るのか

Episode 7 Retrospectiveで決める。

## 11. Series status after Episode 6

1. WHERE — NPBの地図
2. WHO — 選手と役割
3. HOW TO MEASURE — 選手を見る数字
4. LEAGUE SYSTEM — 競争フォーマット
5. PLAYER ALLOCATION — 新人選手の入口
6. PLAYER DEVELOPMENT — 獲得した選手を戦力へ変える

Episode 6で、TEAM BUILDINGという学習Phaseの骨格が初めて成立した。

今回読者ができるようになった、より良い質問：

**「この球団は良い選手を取ったか？」だけでなく、「獲得したtalentを、どの工程で、どんな実戦機会と評価を通して一軍戦力へ変え、どこがbottleneckになっているか？」と問える。**
