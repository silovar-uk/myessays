# NPB学習シリーズ Review — Episodes 1–11

Updated: 2026-09-01
Series: `野球という産業を読む`
Scope: Episode 1–11

## 1. Overall assessment

**PASS — Episode 12（ファン・観客動員）へ進んでよい。**

第1〜10回でPLAYER / TEAM層の学習pathが一区切りついたのに続き、第11回でシリーズは初めてBUSINESS層へ移行した。

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

日本語では、

**場所 → 人 → 測定 → 競争制度 → 戦力獲得 → 戦力化 → 契約価値 → 移動自由 → 移動mechanism比較 → 編成統合 → 収益構造**

まで進んだ。シリーズ発足時のconceptual progression（GAME → TEAM → PLAYER → **BUSINESS** → LEAGUE → FAN → …）に沿って、Episode 11でBUSINESS層の最初の一歩を踏み出した。

## 2. Episode 11 role

### Episode 11 — CLUB BUSINESS / REVENUE STRUCTURE

Question:

球団は何によって収益を得て、その収益構造は編成判断にどう関係しているのか？

Function:

**roster-level constraint → business-level foundation**

Key:

- 非上場の親会社モデル（野球協約第27・28条）
- 欠損金補填の広告宣伝費処理（昭和29年国税庁通達）
- 放送権は球団単位（第44条）
- 日本シリーズだけ例外的にリーグレベル集約という二層構造
- Layer Audit（新規導入）

Episode 1〜10の役割は[REVIEW_NPB_SERIES_01_10_2026-08-31.md](REVIEW_NPB_SERIES_01_10_2026-08-31.md)を参照。

## 3. Connection audit

### 10 → 11

編成問題の統合フレーム（Roster Construction Audit）→ その中のCONSTRAINT（budget・契約）の背後にある球団経営そのもの。

**Very strong.**

Episode 10の`NEXT QUESTION`（「その球団は、何によって収益を得て、何が球団経営そのものを成り立たせているのか？」）が、そのままEpisode 11のCore Questionになっている。Episode 9→10と同じパターンで、記事内に埋め込まれた問いがそのまま次回のCore Questionへ連続している。

## 4. Series-level process chain（拡張）

Episode 1〜10で確立した、

**ENTRY → DEVELOPMENT → VALUE → MOBILITY → REALLOCATION → INTEGRATION**

というplayer-system viewに、Episode 11がPLAYER SYSTEM全体を土台として支えるBUSINESS SYSTEMの入口を追加した。

### PLAYER SYSTEM（Episode 1–10）
ENTRY → DEVELOPMENT → VALUE → MOBILITY → REALLOCATION → INTEGRATION

### BUSINESS SYSTEM（Episode 11–）
FOUNDATION — 球団経営・収益構造（Episode 11）

PLAYER SYSTEMのINTEGRATION（Episode 10）で見たCONSTRAINTが、BUSINESS SYSTEMのFOUNDATION（Episode 11）の上に成立している、という上下関係が明示された。

## 5. Retrieval audit（拡張）

### Episode 7 → 10 → 11

Episode 7の`PERFORMANCE ≠ SALARY`が、Episode 10のCONTRACT/CONSTRAINT節を経て、Episode 11で「その契約条件を提示できる原資はどこから来るか」という一段上の問いへ接続された。一つのconceptが3回連続で異なる高さの議論に使われた。

### Episode 10 → 11

Episode 10のCONSTRAINT（budget）が、Episode 11で「球団単位の収益構造の上に成立する」という形で明示的に再利用された。

**Retrieval design: STRONG PASS（継続）。**

## 6. Reusable conceptual toolkit after Episode 11

Episode 1〜10のtoolkitに加え、Episode 11で以下が追加された。

### Layer Audit（新規）

1. DEFAULT LEVEL — 通常はどのレベルで発生・管理される？
2. EXCEPTION — 例外的に別レベルへ集約される場面はあるか？
3. WHY THE EXCEPTION — その例外はなぜ限定されているのか？

### Pre-Deploy Renderer Check（制作プロセス上のtoolkit）

公開前に、本番相当のレンダラーへ本文を直接通し、太字などのMarkdown記法が意図通り変換されるか検証する。Episode 10のPost-Deploy Visual Checkと組み合わせて標準化した。

## 7. Difficulty audit（拡張）

- Episode 1–10: [REVIEW_NPB_SERIES_01_10_2026-08-31.md](REVIEW_NPB_SERIES_01_10_2026-08-31.md)参照。
- Episode 11: Medium。税務・会社法的な新しい語彙（広告宣伝費の損金算入、非上場子会社など）が増えたが、具体的な金額を扱わず構造のみに絞ったため、難易度は急上昇していない。

## 8. Source-discipline audit（拡張）

Episode 11では、国税庁通達の原文ページへの直接アクセスが技術的に失敗した際、複数の独立した二次情報源（税務専門データベース、専門家解説）で通達の日付・番号・内容を相互確認する手順を取った。これはEpisode 10で確立した「一次資料アクセス失敗時の代替検証」パターンの2例目であり、シリーズの標準手順として定着しつつある。

また、個別球団の売上高・利益といった具体的な決算数値について、公開情報の乏しさを理由に明示的に扱わない判断をした。これはEpisode 10のInformation Budgetの延長線上にある。

## 9. Production-quality audit（新設）

Episode 10で発生した太字レンダリング不具合（CommonMark flanking delimiter rule）を受けて、Episode 11では公開前に本番の実レンダラー（`window.MyEssaysMarkdown.render`）へ日本語版・English Mix版の全文を通し、`**`の生残りが0件であることを確認してからPRを作成した。

結果、Episode 11では同種の不具合は発生しなかった。**Pre-Deploy Renderer Check + Post-Deploy Visual Checkの2段階体制が有効に機能した最初の回。**

## 10. Phase audit（更新）

Episode 10のReviewで示した候補taxonomy（FOUNDATION / LEAGUE DESIGN / TEAM BUILDING / PLAYER ECONOMICS-MOBILITY / ROSTER CONSTRUCTION SYNTHESIS）に加え、Episode 11によって新しい大分類の輪郭が見えた。

### PLAYER SYSTEM
Episode 1–10

### BUSINESS SYSTEM
Episode 11–

この大分類はtaxonomyとして成立しつつあるが、Phase UIの実装は**引き続き見送る**。

Reasons:

1. BUSINESS SYSTEM側がEpisode 11の1本のみで、下位分類を判断するには時期尚早。
2. Episode 12以降がBUSINESS層の中でどう広がるか（ファン・放映権・スポンサー・スタジアムなど）によって、下位分類の形が変わる。
3. 既存のSeriesナビゲーションで読者が迷っている兆候は確認できていない。

Next formal checkpoint: **BUSINESS SYSTEM側が2〜3本揃った時点（目安：Episode 13前後）。**

## 11. Why Episode 12 should continue into BUSINESS SYSTEM, not back to PLAYER

Episode 11で「収益は基本的に球団単位で発生する」と学んだ以上、次はその収益の実際の発生源（チケットを買う人、放送・配信を見る人）側から見る回が自然に続く。

Episode 11の`NEXT QUESTION`は既に、

**That "someone" — fans and viewers — how are they actually positioned within a club's business?**

へ到達している。したがってEpisode 12はPLAYER系mechanism（現役ドラフト・ポスティング等）へ戻るのではなく、BUSINESS SYSTEM内でFAN層へ進む。

## 12. Episode 12 selection

### Title candidate

**「球団は誰に向けて何を提供しているのか」**

Role:

`FAN / AUDIENCE`

Core Question:

**球団経営にとって、ファンや視聴者はどんな存在として位置づけられ、観客動員や視聴という行動はどう球団のビジネスへつながっているのか？**

詳細は[RETROSPECTIVE_NPB_SERIES_11_2026-09-01.md](RETROSPECTIVE_NPB_SERIES_11_2026-09-01.md)のEpisode 12 Briefを参照。

## 13. Series success after Episode 11

Before the series:

「野球で何が起きた？」

After Episodes 1–11:

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
- **その戦力構築の原資となる収益はどこから来るのか？**

と問いを分解できる。シリーズは、PLAYER / TEAM層の完成に続き、BUSINESS層への入口を開いた。

## 14. Final decision

- Episodes 1–11 overall: **PASS**
- Episode 11 PLAYER→BUSINESS transition: **PASS**
- Retrieval: **STRONG PASS**
- Source discipline: **PASS**（一次資料アクセス失敗時の代替検証パターンが定着）
- Production quality: **PASS**（Pre-Deploy Renderer Checkにより不具合0件）
- Phase UI: **DEFER, next checkpoint = BUSINESS SYSTEM 2〜3本完了後（目安 Episode 13前後）**
- Episode 12: **FAN / AUDIENCE — BUSINESS SYSTEM内での継続**

## 15. Better Question after Episode 11

Before:

「どの球団が一番儲かっている？」

After:

**「この球団の収益はどこから来ていて、その得方が編成判断にどんな制約として跳ね返り、その収益は結局誰の行動から生まれているのか？」**
