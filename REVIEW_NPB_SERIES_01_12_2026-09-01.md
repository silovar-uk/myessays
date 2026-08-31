# NPB学習シリーズ Review — Episodes 1–12

Updated: 2026-09-01
Series: `野球という産業を読む`
Scope: Episode 1–12

## 1. Overall assessment

**PASS — Episode 13（スポンサーシップ）へ進んでよい。**

BUSINESS SYSTEM（Episode 11〜）が2本揃い、PLAYER SYSTEM（Episode 1〜10）で確立したretrieval規律・source discipline・production qualityの手順が、異なるテーマ領域でも一貫して機能することが確認できた。

Current path:

1. WHERE — NPBの地図
2. WHO — 選手と役割
3. HOW TO MEASURE — 選手価値を見る数字
4. LEAGUE SYSTEM — 競争フォーマット
5. PLAYER ALLOCATION — 新人選手の入口
6. PLAYER DEVELOPMENT — 獲得した選手を戦力へ変える
7. PLAYER VALUE / CONTRACT — 評価を契約条件へ変換する
8. PLAYER MOBILITY — FAで交渉市場を広げる
9. PLAYER MOBILITY MECHANISM — トレードで既存契約を移す
10. ROSTER CONSTRUCTION SYNTHESIS — 5つのmechanismを編成問題へ統合する
11. CLUB BUSINESS / REVENUE STRUCTURE — 球団経営・収益構造への移行
12. FAN / AUDIENCE — ファン・観客動員と収益の接続

日本語では、

**場所 → 人 → 測定 → 競争制度 → 戦力獲得 → 戦力化 → 契約価値 → 移動自由 → 移動mechanism比較 → 編成統合 → 収益構造 → ファン関与**

まで進んだ。

## 2. Episode 12 role

### Episode 12 — FAN / AUDIENCE

Question:

球団経営にとって、ファンや視聴者はどんな存在として位置づけられ、観客動員や視聴という行動はどう球団のビジネスへつながっているのか？

Function:

**business foundation → who actually generates it**

Key:

- 保護地域（野球協約第38条）とEpisode 1のWHEREの再接続
- ファンクラブ・年間指定席の共通構造
- REVENUE LINK（ファンの行動→収益カテゴリー対応表）
- Layer Auditのファン関与構造への再利用（日本シリーズ・オールスターゲーム）

Episode 1〜11の役割は[REVIEW_NPB_SERIES_01_11_2026-09-01.md](REVIEW_NPB_SERIES_01_11_2026-09-01.md)を参照。

## 3. Connection audit

### 11 → 12

球団経営・収益構造の土台 → その収益を実際に生み出す側（ファン・視聴者）。

**Very strong.**

Episode 11の`NEXT QUESTION`が、そのままEpisode 12のCore Questionになっている。Episode 9→10、10→11に続き、3回連続で記事内の問いが次回のCore Questionへ直結するパターンが定着した。

## 4. Long-distance retrieval audit（新設）

Episode 12では、Episode 1（WHERE：NPBの地図）のconceptが、11回分の間隔を空けて再利用された。保護地域（野球協約第38条）という制度を通すことで、「球団の所在地」という静的な情報が、「なぜその地域のファンにとって地元球団が一つに定まるのか」という別の問いへの答えに変わった。

これは、Episode 8→9→10のような直近回の連続的なretrievalとは異なる、**シリーズ全体を通じた長距離のretrieval**の最初の明確な例である。

**Long-distance retrieval: PASS（新しい評価軸として今後も追跡する）。**

## 5. Retrieval audit（拡張）

### Episode 11 → 12

Layer Audit（DEFAULT LEVEL / EXCEPTION / WHY THE EXCEPTION）が、収益構造からファン関与構造へ、暗記の繰り返しではなく新しい対象への適用として再利用された。

### Episode 1 → 12

保護地域を通じた長距離retrieval（上記参照）。

**Retrieval design: STRONG PASS（継続）。**

## 6. Reusable conceptual toolkit after Episode 12

Episode 1〜11のtoolkitに加え、Episode 12で以下が確認された。

### Layer Auditの汎用性

収益構造だけでなく、ファンの関与構造にも適用できることが実証された。今後、放映権・スポンサー・スタジアムなど別テーマでも、「DEFAULT LEVELは何か、EXCEPTIONは何か」を確認するtoolとして使える。

### REVENUE LINK（新規）

ある行動・現象を、Episode 11で確立した収益カテゴリー（放送権・入場料・スポンサー）のどれに接続するかを整理する表形式のtool。Episode 13でも再利用予定。

## 7. Production-quality audit（拡張）

Episode 11で標準化したPre-Deploy Renderer Checkが、Episode 12で実際に2箇所（日本語）・1箇所（English Mix）のBold Boundary Rule違反を検出し、公開前に修正できた。

**Pre-Deploy Renderer Check + Post-Deploy Visual Checkの2段階体制は、2回連続で不具合の流出を防いだ（Episode 11：0件検出、Episode 12：3件検出・修正）。**

これにより、この2段階体制はシリーズの標準QA手順として定着したと判断する。

## 8. Source-discipline audit（拡張）

Episode 12では、観客動員数について「中間集計であり最終値ではない」ことを明記し、個別球団のランキングとして使わない判断を徹底した。これはEpisode 10〜11で確立したFact Discipline（情報源が食い違う・未確定な数字は断定しない、個別球団の数値を推測しない）の3例目の適用であり、シリーズの標準的な姿勢として安定している。

## 9. Phase audit（更新）

Episode 11のReviewで示した判断点（BUSINESS SYSTEM側が2〜3本揃った時点）に、Episode 12の完了で到達した。

判断：**Phase UIの実装は、依然として見送る。**

理由：

1. Episode 11・12は共に「制度→収益・関与構造」という似た型の記事であり、BUSINESS SYSTEM内部の多様性がまだ確認できていない。
2. 2本ではPLAYER SYSTEM（10本）との比率が大きく偏っている。
3. 既存のSeriesナビゲーションで読者が迷っている兆候は確認できていない。

Next formal checkpoint: **BUSINESS SYSTEM側が3〜4本揃った時点（目安：Episode 14前後）、またはPLAYER SYSTEMへの追加回が発生した時点。**

## 10. Why Episode 13 should continue into sponsorship

Episode 12で「ファンの注目がスポンサー収入の土台になっている」という構造に触れたが、その注目が実際にどんな契約形態を通じて収益になるのかはまだ扱っていない。

Episode 12の`NEXT QUESTION`は既に、

**What institutional and contractual structure does the relationship between a club and its sponsors actually rest on?**

へ到達している。したがってEpisode 13は、BUSINESS SYSTEM内でスポンサーシップという次のレイヤーへ進む。

## 11. Episode 13 selection

### Title candidate

**「注目はどうやって契約に変わるのか」**

Role:

`SPONSORSHIP / ATTENTION-TO-CONTRACT`

Core Question:

**球団とスポンサー企業の関係は、どんな制度・契約構造の上に成り立っているのか？ファンの注目は、どうやって具体的な契約・収益へ変換されるのか？**

詳細は[RETROSPECTIVE_NPB_SERIES_12_2026-09-01.md](RETROSPECTIVE_NPB_SERIES_12_2026-09-01.md)のEpisode 13 Briefを参照。

## 12. Series success after Episode 12

Before the series:

「野球で何が起きた？」

After Episodes 1–12:

読者は、

- どこで？
- 誰が？
- どのrole？
- 何のmetric？
- どんなcompetition rule？
- talentはどう入る？
- どう育つ？
- どう評価・契約される？
- いつ交渉自由が増える？
- どのmobility mechanismで動いた？
- それらをどう組み合わせて戦力を作るのか？
- その戦力構築の原資となる収益はどこから来るのか？
- **その収益は結局誰の行動から生まれているのか？**

と問いを分解できる。シリーズは、PLAYER / TEAM層の完成に続き、BUSINESS層でも土台（収益構造）とその発生源（ファン）という二段階を確立した。

## 13. Final decision

- Episodes 1–12 overall: **PASS**
- Episode 12 retrieval quality: **PASS**（Long-distance retrievalの新しい評価軸を追加）
- Retrieval: **STRONG PASS**
- Source discipline: **PASS**
- Production quality: **PASS**（Pre-Deploy Renderer Checkが2回連続で機能）
- Phase UI: **DEFER, next checkpoint = BUSINESS SYSTEM 3〜4本完了後（目安 Episode 14前後）**
- Episode 13: **SPONSORSHIP / ATTENTION-TO-CONTRACT — BUSINESS SYSTEM内での継続**

## 14. Better Question after Episode 12

Before:

「どの球団が一番人気？」

After:

**「この球団とファンの結びつきは、どの制度によって支えられていて、その関与はどの収益カテゴリーにつながり、その注目は最終的にどんな契約へ変換されるのか？」**
