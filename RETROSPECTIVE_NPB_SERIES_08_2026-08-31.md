# NPB学習シリーズ 第8回 Retrospective / 第9回 Brief

Updated: 2026-08-31
Series: `野球という産業を読む`
Episode 8: `npb-free-agency-negotiation-freedom`

## 1. Publish result

第8回「FAとは何を自由にする制度なのか」を、日本語canonical + English Mixとして公開。

- Japanese: `essays/2026-08-31-npb-free-agency-negotiation-freedom.md`
- English Mix: `english-mix/npb-free-agency-negotiation-freedom.md`
- Research Note: `RESEARCH_NPB_SERIES_08_2026-08-31.md`
- `seriesOrder: 8`
- `data/index.json` 登録済み
- `data/versions-index.json` 登録済み
- PR: `#57`
- Episode 8 merge commit: `3ad0bc6b9015b6bd4ea450b47ccca42188a4fa4f`

### Deployment / QA chronology

Episode 8直後のPages runは、直後にmainへ別commitが入ったためsupersededされてcancelledした。これはEpisode 8のdeploy failureではない。

その後のmainはEpisode 8 merge commitをancestorとして含んだ状態でPages deploymentに成功した。

Episode 8後の最初のlatest-main Visual QAでは、以下が成功：

- Content migration audit
- Static tests
- Reading Versions browser QA

その後、Argument Structure QAで既存のPhysical AI fixtureにmobile horizontal overflowが検出された。

Failure source:

`physical-ai-embodied-intelligence-deployment`

Episode 8の記事・index・English Mixとは無関係。

### Separate follow-up

PR #58でPhysical AI記事内のlong loop labelをwrap可能なMarkdownへ変更したが、まだhorizontal overflowが残った。

PR #59:

`Prevent long Reader tokens from overflowing mobile`

では、Reader全体に

`.reader-content { overflow-wrap: anywhere; }`

を追加し、長い英数字tokenがmobile viewportを押し広げないよう再発防止を行った。

- PR #59 merge: `6f1d248d22af6ca50e31ad3da3775a48f1bec3d7`
- Visual QA run: `33391989848`
- Result: **success**
- Pages run: `33391989374`
- Result: **success**

Final successful QA steps:

- Content migration audit: success
- Static tests: success
- Reading Versions browser QA: success
- Argument Structure browser QA: success
- Page Reader browser QA: success
- Browser visual QA: success
- QA artifacts upload: success

Conclusion:

**Episode 8 is published and passes the complete current QA chain on a latest-main descendant after an unrelated Reader overflow regression was fixed separately.**

## 2. 第8回で成立したこと

### 1. FAを「移籍イベント」からnegotiation freedomへ変換した

今回の最重要learning designは、

`FA = TRANSFER`

という暗黙の式を壊したこと。

記事ではFAを、

**一定条件を満たした選手について、契約交渉できる相手の範囲を広げる制度**

として読んだ。

中心Questionは、

**「その選手はfreeか？」ではなく、「何が、いつ、どこまでfreeになった？」**

である。

### 2. ステータスを段階へ分離した

`ELIGIBILITY`
→ `DECLARATION`
→ `NEGOTIATION`
→ `AGREEMENT`

を分けた。

これにより、

- FA資格取得 = FA宣言
- FA宣言 = 移籍

という初心者向けの典型的な混同を避けた。

2025年度の公式公示では104名のFA有資格選手に対し宣言は8名だったため、資格と行使が別であることを具体的に示せた。

### 3. FA宣言後の残留を制度として説明できた

2025年度のNPB公示を使い、FA宣言後に元球団と契約した選手を確認した。

つまり、

`DECLARATION ≠ TRANSFER`

だけでなく、

**re-signing with the former club is one possible outcome**

と説明できた。

「宣言残留」を例外的なニュース用語ではなく、広がった交渉選択肢の中の一つとして理解できる。

### 4. Domestic / Overseasを市場範囲として分けた

国内FAと海外FAを単なる名称違いにせず、

**どの範囲の契約市場へアクセスできる権利か**

として整理した。

この視点により、FAをplayer mobilityだけでなく、market accessとして読む入口ができた。

### 5. Service-time clockを導入できた

FA資格を、単に「プロ何年目」で説明しなかった。

145日の出場選手登録を一つのseason unitとして考える公式説明を使い、

**calendar timeではなくregistration-based service clock**

という理解へ変えた。

細かい特例を暗記させず、「資格には時計がある」までにInformation Budgetを制御できた。

### 6. A / B / Cランクを能力順位から切り離した

FAランクは初心者が非常に誤解しやすい。

記事では、

**A/B/C = talent rankingではない**

と明示。

旧球団内の日本人選手の参稼報酬順位を使うcompensation classificationとして整理した。

### 7. Current ruleとFuture proposalを同じ文法で書かなかった

2026年には人的補償の撤廃・代替案が協議されている。

しかし2026-08-31時点では、新制度が確定・施行されたとは確認できなかった。

そのため、

`CURRENT RULE ≠ PROPOSED FUTURE CHANGE`

を明示した。

これはEpisode 7で導入したsource-vintage disciplineを一段進めたもの。

## 3. KEEP

- 「FAとは何か？」ではなく「何がfreeになるか？」から設計する。
- 資格、宣言、交渉、契約結果を分離する。
- `ELIGIBILITY ≠ DECLARATION`。
- `DECLARATION ≠ TRANSFER`。
- 国内FA / 海外FAをmarket scopeとして説明する。
- service-time clockを概念として教え、細則暗記にしない。
- 元球団との再契約を正規のchoiceとして扱う。
- A/B/Cをsalary-based compensation classificationとして説明する。
- FAと自由契約を「結果が似ていても制度経路が違う」と分ける。
- Episode 5 / 7を長い要約ではなく、新しい問いの道具として使う。
- current rule / proposed future changeを分離する。

## 4. CHANGE

### 1. 制度変更記事ではRule Lifecycleを明示する

今後の更新可能制度では、情報を次の状態へ分類する。

1. CURRENT — 現在適用される制度
2. PROPOSED — 提案・協議中
3. AGREED — 合意済みだが未施行
4. EFFECTIVE — 施行済み

「見直しへ」「撤廃案」「合意」などの見出しだけでCURRENTを書き換えない。

### 2. 古い公式解説はstable conceptとcurrent detailを分ける

NPBのFA公式解説は制度の基本構造を説明するのに有用だが、publication dateは古い。

今後も、

- stable structural fact
- current numerical/procedural detail

を同じsource authorityだからと一括しない。

### 3. QAは記事変更とmain全体のhealthを分けて記録する

Episode 8自体のmigration/index/Reading Modeは問題なかったが、並行作業で既存Physical AI fixtureのoverflowが露出した。

「Episode QA failed」とだけ書くと原因を誤認する。

今後は、

- article-local failure
- repository-wide regression

を明記する。

## 5. REMOVE

- `FA = 移籍`という説明。
- `FA権を取得した = FAした`という説明。
- `宣言した = 他球団へ行く`という説明。
- 国内FA / 海外FAを一つの資格として扱うこと。
- A/B/Cを選手の格や能力順位として説明すること。
- 「FAになれば完全に自由」と書くこと。
- 2026年の人的補償撤廃案を施行済み制度として書くこと。
- FA成功・失敗ランキングへ逸れること。
- 歴代FA移籍一覧で本文を埋めること。
- 詳細補償率を初心者の主学習項目にすること。

## 6. ADD

### Rule Lifecycle Audit

制度改正を扱う記事では、必ず以下を確認する。

1. CURRENT — 今適用されている？
2. PROPOSED — 誰が提案した？
3. AGREED — 正式合意した？
4. EFFECTIVE — いつ施行される？
5. SOURCE — どのstageを裏付けるsource？

### Mobility Mechanism Audit

今後PLAYER MOBILITYを扱うときは、

1. INITIATOR — 誰が移動を始める？
2. RIGHT — どの権利・契約関係が動く？
3. CONSENT — 誰の同意が必要？
4. MARKET — 交渉できる範囲は？
5. COST — 誰にどんなcostがある？
6. OUTCOME — どんな結果があり得る？

で比較する。

Episode 9のtradeでも再利用する。

## 7. Beginner Check

### PASS

読者が最低限、以下を説明できる構造になった。

- FAは移籍そのものではない。
- FA資格とFA宣言は別。
- FA宣言と移籍決定は別。
- 元球団との再契約も可能。
- 国内FAと海外FAでは開く契約市場が違う。
- FA資格には登録日数を基礎とするclockがある。
- A/B/Cは能力ランクではない。
- FAと自由契約は別制度。
- 人的補償改革は2026-08-31時点ではproposal / negotiation段階として読む必要がある。

## 8. Retrieval Bridge評価

### Episode 5 → 8

`PICK → NEGOTIATION RIGHT → CONTRACT`

新人時点では交渉相手が制度によって限定される。

### Episode 7 → 8

`PERFORMANCE → EVALUATION → CONTRACT CONDITIONS → NEGOTIATION → AGREEMENT`

Episode 8ではNEGOTIATIONへ参加できるclub setそのものが広がる。

### Combined

`RESTRICTED ENTRY`
→ `CONTRACT RELATIONSHIP`
→ `EARNED MOBILITY`

このretrievalは単なる前回要約ではなく、過去のconceptを使って「なぜFAが必要な問いになるのか」を作れている。

Retrieval design: **PASS**。

## 9. Rule Change Watchpoints

Future updateで再確認：

- latest public Baseball Agreement edition
- standalone FA regulationsの最新版
- 国内FA取得条件
- 海外FA取得条件
- service-time計算
- 故障者特例
- 投手の登録日数加算
- FA宣言期間
- FA有資格者公示
- A/B/C区分
- 人的補償
- 金銭補償
- draft selection compensation等の代替案
- protected-player mechanics

特に人的補償改革は2026年のhigh-priority watchpoint。

## 10. Phase UI decision after Episode 8

### Decision: **まだ実装しない**

内部編集上のtaxonomyはかなり明確になってきた。

### FOUNDATION

1. WHERE
2. WHO
3. HOW TO MEASURE

### LEAGUE DESIGN

4. LEAGUE SYSTEM

### TEAM BUILDING

5. PLAYER ALLOCATION
6. PLAYER DEVELOPMENT

### PLAYER ECONOMICS / MOBILITY

7. PLAYER VALUE / CONTRACT
8. PLAYER MOBILITY

Episode 8によって、最後のphaseも1本から2本になった。

ただしfront-end Phase UIはまだDEFERする。

理由：

1. `LEAGUE DESIGN`がEpisode 4の1本だけで、visual groupingが不均衡。
2. Episode 9でtradeが加わると、TEAM BUILDINGとPLAYER MOBILITYの境界を再評価できる。
3. 全8本ならseriesOrderだけでもまだ追跡可能。
4. UI taxonomyを先に固定すると、後続記事を分類に合わせる逆転が起こり得る。

Recommendation:

**Episode 9または10終了後に再評価する。**

Conceptual taxonomy is mature enough for editorial planning, but not yet necessary as frontend chrome.

## 11. 第9回 Brief

### Provisional Title

**トレードとは何を交換する制度なのか**

### Role

`CLUB-CONTROLLED MOBILITY / CONTRACT TRANSFER`

### Core Question

**球団同士が選手を動かすとき、実際には何を移転し、誰の権利・同意が関わっているのか？**

Alternative beginner question:

**FA資格を持っていない選手も球団を移れるのは、なぜ？**

### Why this is the natural next question

Episode 8:

FA = 選手が獲得した権利を行使して交渉市場を広げるmobility mechanism。

↓

Episode 9:

trade = 球団間で契約関係・選手登録を動かす別のmobility mechanism。

これにより、

**player-initiated mobility**

と

**club-controlled mobility**

を比較できる。

### Learning Goal

トレードを、

「選手同士を交換するイベント」

だけではなく、

**球団間で選手契約・登録上の関係を移す制度**

として読めるようにする。

ただし、何が法的・協約上「移転」しているかはResearchで一次情報を確認してから表現を確定する。

### Research Questions

1. NPBのトレードを野球協約はどう定義しているか。
2. 選手契約の譲渡とは何か。
3. 球団間で必要な手続は何か。
4. 選手本人の同意はどの場面で必要か。
5. 交換トレードだけでなく金銭トレードはどう扱われるか。
6. 複数選手のトレードはどう成立するか。
7. 2026年のトレード期限はいつか。
8. 育成選手は同じ仕組みで移れるか。
9. 外国人選手の扱いに違いはあるか。
10. FA / 自由契約 / 現役ドラフトとの違いは何か。
11. `trade = players swapped`という説明で何が抜けるか。

### Suggested Framework

1. INITIATOR — 誰が動かす？
2. ASSET / RIGHT — 何が動く？
3. CONSENT — 誰の同意が必要？
4. COUNTERVALUE — 何と交換する？
5. DEADLINE — いつまで可能？
6. RESULT — 選手の契約関係はどう変わる？

### Guardrails

- 交換トレードだけをtradeとしない。
- 金銭トレードを無視しない。
- 選手本人に一切意思がないと断定しない。
- MLB no-trade clause等をNPBへそのまま持ち込まない。
- 現役ドラフトと通常トレードを混同しない。
- FAとtradeを「本人希望か球団都合か」の一言だけで分けない。
- 2026年current deadlineを一次情報で確認する。

### Information Budget

今回は深追いしない：

- 歴代大型トレード
- 勝ち組 / 負け組ランキング
- 噂・予想
- MLB trade deadline詳細
- 現役ドラフト詳細
- waiver制度詳細
- 契約条項の推測

### Natural Next after Episode 9

Retrospectiveで決定。

候補：

- 外国人選手はどうNPBへ入るのか
- 戦力外通告とは何を決める制度なのか
- ポスティングとは何を許可する制度なのか
- 現役ドラフトとは何を再配分する制度なのか

## 12. Series status after Episode 8

1. WHERE — NPBの地図
2. WHO — 選手と役割
3. HOW TO MEASURE — 選手を見る数字
4. LEAGUE SYSTEM — 競争フォーマット
5. PLAYER ALLOCATION — 新人選手の入口
6. PLAYER DEVELOPMENT — 獲得した選手を戦力へ変える
7. PLAYER VALUE / CONTRACT — 評価を契約条件へ変換する
8. PLAYER MOBILITY — FAによって交渉市場を広げる

今回読者ができるようになった、より良い質問：

**「誰がFA移籍する？」ではなく、「この選手はどの資格を持ち、何を宣言し、どの契約市場への交渉自由を得て、その選択にはどんな制度上のcostと選択肢が残っている？」と問える。**