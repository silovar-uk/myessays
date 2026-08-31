# NPB学習シリーズ 第9回 Retrospective / 第10回 Brief

Updated: 2026-08-31
Series: `野球という産業を読む`
Episode 9: `npb-trade-player-mobility-contract-transfer`

## 1. Publish result

第9回「トレードとは何を交換する制度なのか」を、日本語canonical + English Mixとして公開。

- Japanese: `essays/2026-08-31-npb-trade-player-mobility-contract-transfer.md`
- English Mix: `english-mix/npb-trade-player-mobility-contract-transfer.md`
- Research Note: `RESEARCH_NPB_SERIES_09_2026-08-31.md`
- `seriesOrder: 9`
- `data/index.json` 登録済み
- `data/versions-index.json` 登録済み
- PR: `#62`
- Episode 9 merge commit: `ae1ae0dbbe0b54fca8913df89fb1890105f5e36d`

### Deployment / QA

- Pages run: `33394090642`
- Pages result: **success**
- Visual QA run: `33394091803`
- Visual QA result: **success**

Full successful QA chain:

- Content migration audit: success
- Static tests: success
- Reading Versions browser QA: success
- Argument Structure browser QA: success
- Page Reader browser QA: success
- Browser visual QA: success
- QA artifact upload: success

Episode 9は、今回のQA chainを初回で完走した。

## 2. Implementation note — concurrent index updates

Episode 9制作中、mainでは別記事・English Mix・QA fixtureの更新が並行して入った。

特に、

- `data/index.json`
- `data/versions-index.json`

が並行変更されたため、古いbranch snapshotをそのまま書き戻すと既存entryを巻き戻す危険があった。

対応：

1. mainの最新状態を再取得。
2. Episode 9 article / English Mix / Research Noteのblobのみ新branchへ移植。
3. indexを最新main基準で再構成。
4. PR #62でmerge conflictを検出。
5. main側の追加entryもbranchへ同期。
6. `mergeable: true` を確認してからmerge。

結果、Episode 9以外の並行更新を失わず、記事側の意図差分だけをmainへ入れられた。

### KEEP

**Index is shared infrastructure. Treat it as shared state, not article-local text.**

今後も、記事PRではPR直前に最新mainとの差分を必ず再確認する。

## 3. 第9回で成立したこと

### 1. トレードを「人の交換」からcontract assignmentへ変換できた

今回の最重要conceptは、

`TRADE = PLAYER EXCHANGE`

という雑な理解を壊し、

**既存の選手契約を他球団へ譲渡し、契約に関する球団の権利義務が新球団へ移るmechanism**

として読んだこと。

これにより、選手を所有物として説明する不適切な比喩を避けながら、制度上何が移っているかを具体化できた。

### 2. `SAME DESTINATION ≠ SAME PATH` が成立した

FAもトレードも、結果だけ見れば、

`Club X → Club Y`

というplayer movementを生む。

しかし、

- INITIATOR
- RIGHT
- CONSENT
- DESTINATION
- TIMING
- AFTER

は違う。

したがって、

**同じ結果に見えてもinstitutional mechanismは違う**

という読み方が成立した。

これは今後、

- 自由契約
- 現役ドラフト
- ポスティング
- 外国人選手獲得

を比較する際にも再利用できる。

### 3. `CONSENT TIMING` が新しい強いconceptになった

初心者向け説明では、

「トレードに選手の同意が必要か？」

をYes / Noだけで答えたくなる。

しかし最新公開協約では、選手は統一契約書の中で契約譲渡へあらかじめ同意する構造になっている。

つまり重要なのは、

**CONSENT EXISTS?**

だけでなく、

**WHEN IS CONSENT GIVEN?**

である。

この`CONSENT TIMING`は、制度理解一般にも使える。

### 4. Episode 8のMobility Mechanism Auditは再利用に成功した

Episode 8で作ったframeを、Episode 9でも大きな修正なく使えた。

Current standard candidate:

1. INITIATOR — 誰が動かす？
2. RIGHT / RELATIONSHIP — 何の権利・契約関係が動く？
3. CONSENT — 誰が、いつ、何へ同意する？
4. DESTINATION / MARKET — 移動先はどう決まる？
5. COST / CONSIDERATION — 何が交換・負担される？
6. TIMING — いつ可能？
7. AFTER — 移動後に何が残り、何が変わる？

Episode 8→9の再利用実績ができたため、**Mobility Mechanism Auditをシリーズ標準frameとして採用してよい**。

### 5. Episode 6も自然にretrievalできた

トレード成立後にはコミッショナーの承認、公示、旧球団での支配下登録抹消、新球団での支配下登録という手続がある。

Episode 6で学んだ「支配下登録」が、Episode 9で別の制度を理解する道具として再登場した。

これはシリーズのretrieval designとして良い状態。

## 4. KEEP

- 「誰が移った？」ではなく「何のmechanismで移った？」と問う。
- `SAME DESTINATION ≠ SAME PATH`。
- player movementを同一変数で比較する。
- contract / registration / player statusを分ける。
- `CONSENT TIMING`を確認する。
- `PUBLIC NOTICE ≠ COMPLETE ECONOMIC TERMS`。
- 公示だけから金銭・無償等を推測しない。
- current rule textとcurrent-year operationを組み合わせるsource-vintage discipline。
- FACTとeditorial interpretationを分ける。
- 選手agencyをYes / Noで単純化しない。
- indexをshared infrastructureとして扱う。

## 5. CHANGE

### 1. Mobility Mechanism AuditのRIGHTをRELATIONSHIPまで広げる

Episode 8ではRIGHT中心だったが、tradeではexisting contract relationshipが重要だった。

今後は、

**RIGHT / RELATIONSHIP**

とする方が汎用性が高い。

### 2. ConsentはActorだけでなくTiming / Scopeまで見る

今後の制度記事では、

- WHO consented?
- WHEN?
- TO WHAT?
- IS IT GENERAL OR TRANSACTION-SPECIFIC?

まで確認する。

### 3. Public noticeとeconomic termsを標準的に分離する

「公示された事実」と「取引の完全な経済条件」は同じではない。

今後、金銭・補償・契約額を扱う場合も、非公開部分を想像で埋めない。

## 6. REMOVE

- 「選手を交換・売買する制度」で説明を終えること。
- 「トレードには選手の同意がない」という断定。
- 「毎回、選手本人が移籍先を承認する」という断定。
- player agencyをclub vs playerの二択にすること。
- 一方向の公示を見て「無償」と推定すること。
- MLBのno-trade clause等をNPBへ無検証で持ち込むこと。
- 有名トレード列伝で制度構造を埋めること。
- tradeをFA / loan / 自由契約 / 現役ドラフトと混ぜること。

## 7. ADD

### Mechanism Comparison Rule

似た結果を生む制度が複数ある場合、必ず同じvariablesで比較する。

**SAME OUTCOME ≠ SAME MECHANISM**

をシリーズ標準へ追加する。

### Consent Audit

1. ACTOR — 誰が同意する？
2. TIMING — いつ？
3. SCOPE — 何に対する同意？
4. FORM — どの契約・手続で与える？
5. REVERSIBILITY — 後から変更・拒否できる？ 公開情報で確認できる？

最後の項目が不明なら不明と書く。

## 8. Beginner Check

Episode 9読了後、初心者は少なくとも次を区別できる。

- tradeは人間そのものの所有権移転ではない。
- existing player contractの譲渡が中心。
- FAとtradeは、移籍という結果は似てもmechanismが違う。
- player consentは「存在するか」だけでなく「いつ与えられているか」が重要。
- tradeには通常のtransfer windowがある。
- 球団同士の合意だけでなく、コミッショナー手続・登録・公示がある。
- trade ≠ loan / FA / free contract / active-player draft.

Result: **PASS**。

## 9. Phase UI Decision

Episode 9時点で内部taxonomyはかなり明瞭になった。

Candidate:

### FOUNDATION
1 WHERE
2 WHO
3 HOW TO MEASURE

### LEAGUE DESIGN
4 LEAGUE SYSTEM

### TEAM BUILDING
5 PLAYER ALLOCATION
6 PLAYER DEVELOPMENT

### PLAYER ECONOMICS / MOBILITY
7 PLAYER VALUE / CONTRACT
8 PLAYER MOBILITY — FA
9 PLAYER MOBILITY — TRADE

しかし、Phase UIは**まだDEFER**する。

理由：

- LEAGUE DESIGNがEpisode 4の1本だけで非対称。
- Episode 9で、個別制度を超えた`roster construction`という自然なsynthesis questionが出た。
- Episode 10をsynthesis回にすると、Phase境界を「記事数」ではなく学習conceptのまとまりとして再評価できる。

Episode 10終了後をPhase UIの次の正式判断点とする。

## 10. Episode 10 Brief

### Selected theme

**「球団はどうやって戦力を組み立てるのか」**

Provisional Role:

`ROSTER CONSTRUCTION / TEAM BUILDING SYNTHESIS`

### Core Question

**球団は、ドラフト・育成・契約更新・FA・トレードなどを、どう組み合わせて一軍戦力を作るのか？**

### Why next

Episode 5〜9で個別mechanismが揃ってきた。

- DRAFT — entry / allocation
- FARM — development
- CONTRACT — value / retention
- FA — player-side negotiation market expansion
- TRADE — club-to-club contract transfer

ここでさらに現役ドラフトやポスティングへ進むと、制度カードを横に増やすだけになる危険がある。

Episode 10では一度zoom outして、

**MECHANISMS → PORTFOLIO OF OPTIONS → ROSTER CONSTRUCTION**

へ進む。

### Candidate framework

1. NEED — 何が足りない？
2. SOURCE — internal development or external acquisition?
3. MECHANISM — draft / development / FA / trade / other?
4. CONSTRAINT — roster spots / timing / contract / budget / opportunity?
5. FIT — role and team context?
6. TIME HORIZON — now or future?
7. PORTFOLIO — 一つの獲得手段へ依存していない？

### Guardrails

- 「強い球団の編成ランキング」にしない。
- 球団内部の非公開予算を推定で埋めない。
- salary capがあるように書かない。
- 70人枠等のcurrent roster ruleは必ずfresh verification。
- 一軍 / 支配下 / 育成を再び混ぜない。
- 個別制度をもう一度長く説明しない。
- 具体例はmechanism combinationを理解する最小限にする。

### Retrieval requirement

Episode 5〜9のうち最低3つ以上を、単なる要約ではなく編成判断のvariablesとして再利用する。

## 11. Better Question achieved

Before:

「誰と誰がトレードされた？」

After:

**「この移動は誰が始め、どの契約関係が移り、選手の同意はいつ・何に対して与えられ、FAなら何が違った？」**

Episode 9 success criterion: **PASS**。
