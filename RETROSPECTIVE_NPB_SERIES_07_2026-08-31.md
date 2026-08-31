# NPB学習シリーズ 第7回 Retrospective / 第8回 Brief

Updated: 2026-08-31
Series: `野球という産業を読む`
Episode 7: `npb-player-salary-contract-renewal-value`

## 1. Publish result

第7回「なぜ選手の年俸は毎年変わるのか」を、日本語canonical + English Mixとして公開。

- Japanese: `essays/2026-08-31-npb-player-salary-contract-renewal-value.md`
- English Mix: `english-mix/npb-player-salary-contract-renewal-value.md`
- Research Note: `RESEARCH_NPB_SERIES_07_2026-08-31.md`
- `seriesOrder: 7`
- `data/index.json` 登録済み
- `data/versions-index.json` 登録済み
- PR: `#54`
- Episode 7 merge commit: `54890c558267afc2ad287975552284d45afe4b05`

### GitHub Pages

Episode 7 merge commit:

- Run: `33390076591`
- Result: **success**

### Visual QA

- Run: `33390077704`
- Result: **success on first attempt**

Successful steps:

- Content migration audit: success
- Static tests: success
- Reading Versions browser QA: success
- Argument Structure browser QA: success
- Page Reader browser QA: success
- Browser visual QA: success
- QA artifacts upload: success

Episode 6で再発したArgument Structureのsmooth-scroll timing issueはPR #49で修正済み。その後のBatch 4 fixture correction #52も含む最新main上で、Episode 7は初回から全QAを通過した。

Conclusion:

**Episode 7 is published and passes the complete current QA chain.**

## 2. 第7回で成立したこと

### 1. 年俸を「能力値」からcontract outcomeへ変換した

今回の最重要learning designは、

`PERFORMANCE = SALARY`

という暗黙の式を壊したこと。

記事では、

`PERFORMANCE → EVALUATION → CONTRACT CONDITIONS → NEGOTIATION → AGREEMENT`

と分解した。

これにより、年俸を選手の能力を直接測るscoreではなく、評価・制度・交渉を通じた契約結果として読めるようになった。

### 2. `SALARY ≠ PLAYER'S TRUE VALUE`を明示できた

高年俸、昇給、減俸から選手の能力や現在価値を直接逆算しない。

Episode 3の`Metric = lens`と同じく、contract numberにも「見えるもの / 見えないもの」がある。

この情報境界はPLAYER ECONOMICSの基礎になる。

### 3. 公式ルールとpublication vintageを分けられた

2026-08-31時点で、日本プロ野球選手会の公開ページに掲載されている野球協約の最新版は2025年度版だった。

そのため、

- `2026年野球協約では…`

とは書かず、

- `2026-08-31時点の最新公開協約（2025年度版）では…`

とした。

一方、年俸水準のsnapshotには2026年の選手会調査を使用。

**current dateとsource editionを同一視しない**という重要なResearch ruleを得た。

### 4. 制度の具体性を保ちながら、ルール大全にしなかった

記事に入れたcurrent / latest-published ruleは必要最小限：

- 支配下選手の最低参稼報酬 420万円
- 1600万円未満の選手に関する出場選手追加参稼報酬
- 次年度契約の原則的な減額制限 40% / 25%
- 選手同意による減額制限の例外
- 参稼報酬調停
- 契約保留構造

FA、ポスティング、代理人、税、出来高などへ広げなかった。

Information Budget: PASS。

### 5. 「推定」を情報ラベルとして扱えた

契約更改ニュースの金額について、

`公式 / 本人発言 / 球団発表 / 推定 / 関係者情報`

のどれなのかを見る視点を導入した。

これはスポーツニュース全般にも再利用できる。

### 6. 平均と中央値を「分布」の入口として使えた

2026年の選手会調査：

- 平均年俸 5,216万円
- 中央値 2,000万円

を使用。

目的は「NPBの平均年俸を覚える」ことではなく、

**average salary ≠ typical player's salary**

と理解すること。

Business / economicsへ進む導入として機能した。

## 3. KEEP

- `PERFORMANCE ≠ SALARY`を最初に明示する。
- `SALARY ≠ PLAYER'S TRUE VALUE`を明示する。
- 結果数字を、その生成processへ分解する。
- `PERFORMANCE / ROLE / CONTEXT / RULES / NEGOTIATION / INFORMATION`の6問。
- Episode 2のroleを契約評価へ再利用する。
- Episode 3の`Metric = lens`をsalary interpretationへ再利用する。
- Episode 6の`EVALUATE`からcontract valueへ接続する。
- 最新公開資料とcurrent-year dataを分ける。
- `推定`を重要なinformation labelとして読む。
- 非公開査定式を推測で埋めない。
- 平均値だけでなく中央値を見る。
- 情報がないことをresearch failureではなくinformation boundaryとして扱う。

## 4. CHANGE

### 1. 制度記事ではSource Editionを明示的に監査する

今後のcurrent制度記事では、Research開始時に必ず以下を記録する。

1. 現在日
2. source publication date
3. source edition / rule year
4. effective dateが確認できるか
5. current-year版が未公開ではないか

今回のように「2026年に調べているがlatest published agreementは2025」というケースを想定する。

### 2. `official / reported / estimated / unknown`を記事設計前に分類する

価格、契約、移籍、観客数などは、数字があるだけで同じ証拠強度ではない。

先にEvidence Classを決めてから本文へ入れる。

### 3. Contract記事では「査定」と「合意」を分離する

査定基準があることと、最終契約条件がそのまま査定表から機械的に出ることは別。

今後も、

`EVALUATION ≠ AGREEMENT`

をKEEPする。

## 5. REMOVE

- 年俸をplayer rankingとして読むこと。
- 推定年俸ランキングを記事の中心にすること。
- WARなど単一metricからsalaryを逆算すること。
- 非公開球団査定式を推測すること。
- 2026年だからといって未確認の`2026協約`を想定すること。
- 25% / 40%減額制限を絶対的な下限として書くこと。
- 平均年俸だけで一般的な選手像を作ること。
- FA / posting / trade / taxを一記事へ詰め込むこと。

## 6. ADD

### Publication Vintage Audit

更新可能な制度・製品・統計を扱うとき：

1. TODAY — いつ調べている？
2. EDITION — 何年度・何版の資料？
3. PUBLISHED — いつ公開された？
4. EFFECTIVE — いつから有効？
5. SUPERSEDED — より新しい版はない？
6. GAP — current-year版が未公開ならどう書く？

### Contract Outcome Audit

1. PERFORMANCE — 何をした？
2. ROLE — 何を期待された？
3. CONTEXT — どんな条件だった？
4. RULES — 制度上の境界は？
5. NEGOTIATION — 誰が何に合意する？
6. INFORMATION — その金額はどこまで確か？

### Information Label Audit

数字を使う前に：

- official
- self-disclosed
- institutional aggregate
- reported
- estimated
- unknown

のどれかを確認する。

## 7. Beginner Check after publication

### PASS

読者が最低限、以下を説明できる構造になった。

- 年俸は成績表そのものではない。
- 年俸は選手の真の価値そのものでもない。
- 同じ数字でもroleが違えば意味が違う。
- Metricはcontract valueを全部説明しない。
- 契約には最低報酬、減額制限、調停等のruleがある。
- 査定と合意は別stage。
- 25% / 40%の減額制限には選手同意による例外がある。
- 推定年俸はofficial confirmed figureと同義ではない。
- 平均と中央値は違う。
- 球団内部査定について分からない部分がある。

## 8. Retrieval Bridge評価

### Episode 2 → 7

`PLAYER ROLE`

同じ表面成績でも期待される仕事が違う。

### Episode 3 → 7

`Metric = lens`

数字が見ているもの / 見ていないものを分ける。

### Episode 6 → 7

`EVALUATE`

育成・実戦・評価の先に、契約条件への変換がある。

### Result

`ROLE + METRICS + EVALUATION → CONTRACT VALUE`

過去知識が今回の問いを解く道具として使われた。

Retrieval design: **PASS**。

## 9. Rule Change Watchpoints

Future updateで再確認：

- 新しい野球協約の公開
- 支配下選手最低参稼報酬
- 出場選手追加参稼報酬の基準
- 減額制限の閾値・例外
- 参稼報酬調停制度
- 契約保留手続
- JPBPA年俸調査methodology
- JPBPA契約更改アンケート

## 10. Phase UI decision after Episode 7

### Decision: **まだ実装しない**

内部編集上は、現在こう整理できる。

### FOUNDATION

1. WHERE
2. WHO
3. HOW TO MEASURE

### LEAGUE DESIGN

4. LEAGUE SYSTEM

### TEAM BUILDING

5. PLAYER ALLOCATION
6. PLAYER DEVELOPMENT

### PLAYER ECONOMICS

7. PLAYER VALUE / CONTRACT

ただしPLAYER ECONOMICSはまだ1本。

ここでUIへPhaseを固定すると、読者navigationを助けるよりtaxonomy説明が増える可能性が高い。

Therefore:

**Conceptual taxonomy continues to grow; Phase UI remains deferred.**

Episode 8完了後、PLAYER MOBILITYが加わった時点で再評価する。

## 11. 第8回 Brief

### Provisional Title

**FAとは何を自由にする制度なのか**

### Role

PLAYER MOBILITY / NEGOTIATION FREEDOM

### Core Question

**選手は、いつ・どの条件で、他球団と自由に契約交渉できるようになるのか？**

### Why this is the natural next question

Episode 5:

`新人選手の入口では、交渉先が自由ではない`

Episode 7:

`契約保留中の選手は、原則として保留球団との契約構造にいる`

↓

Episode 8:

**では、いつ交渉相手を自分で選べるようになる？**

これはdraft / contractを横断して初めて自然に出る問い。

### Learning Goal

FAを、

「スター選手が移籍するイベント」

ではなく、

**一定条件を満たした選手について、契約交渉相手の範囲を広げるplayer-mobility制度**

として理解する。

### Research Questions

1. FA資格とは何か。
2. 国内FA / 海外FAは現在どう区別されるか。
3. 資格取得に必要な登録日数・年数はどう計算するか。
4. FA宣言とは何を変える手続か。
5. FA宣言したら必ず移籍するのか。
6. 元球団との再契約は可能か。
7. 人的・金銭補償はどんな場合に発生するか。
8. ランク制度は何を基準にしているか。
9. 2026年時点のcurrent rule変更はあるか。
10. `free agent = completely unrestricted`と書いてよいか。

### Suggested Framework

1. ELIGIBILITY — 誰が資格を持つ？
2. CLOCK — 何を積み上げる？
3. DECLARATION — 何を宣言する？
4. FREEDOM — 何が自由になる？
5. COST — 獲得側 / 元球団に何が起こる？
6. CHOICE — 選手にはどんな選択肢が残る？

### Guardrails

- FA = 自由契約と混同しない。
- FA資格取得 = 自動的な移籍としない。
- FA宣言 = 他球団移籍確定としない。
- 国内FA / 海外FAを混同しない。
- service-time計算を古いruleで書かない。
- 補償制度を全選手共通だと書かない。
- `完全に自由`という曖昧な表現を避け、何が自由になるかを具体化する。
- MLB free agencyをそのまま当てはめない。

### Information Budget

今回は深追いしない：

- 歴代FA移籍一覧
- FA成功 / 失敗ランキング
- 個別選手の移籍予想
- MLB比較詳細
- ポスティング制度
- トレード詳細
- 自由契約制度詳細

### Natural Next after Episode 8

Episode 8 Retrospectiveで決める。

候補：

- トレードとは何を交換する制度なのか
- 外国人選手はどうNPBへ入るのか
- 戦力外通告とは何を決める制度なのか

## 12. Series status after Episode 7

1. WHERE — NPBの地図
2. WHO — 選手と役割
3. HOW TO MEASURE — 選手を見る数字
4. LEAGUE SYSTEM — 競争フォーマット
5. PLAYER ALLOCATION — 新人選手の入口
6. PLAYER DEVELOPMENT — 獲得した選手を戦力へ変える
7. PLAYER VALUE / CONTRACT — 評価を契約条件へ変換する

今回読者ができるようになった、より良い質問：

**「この選手はいくら上がった？」だけでなく、「このcontract outcomeは、どんなperformance・role・context・rules・negotiationを経て成立し、その金額について私は何を本当に確認できている？」と問える。**