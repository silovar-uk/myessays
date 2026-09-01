# NPB学習シリーズ Review — Episodes 1–15

Updated: 2026-09-01
Series: `野球という産業を読む`
Scope: Episode 1–15

## 1. Overall assessment

**PASS — Episode 16（PLAYER SYSTEM × BUSINESS SYSTEM Interaction）へ進んでよい。**

PLAYER SYSTEM（Episode 1〜10）・BUSINESS SYSTEM（Episode 11〜15）が、それぞれsynthesis回（Episode 10・15）を持つ対称な2部構成として完成した。Episode 15で両システムが明示的に接続されたことで、シリーズは次の抽象度（システム間の相互作用）へ進む準備が整った。

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
13. SPONSORSHIP / ATTENTION-TO-CONTRACT — 注目が契約へ変わる構造
14. STADIUM OWNERSHIP — 球場の所有・運営構造
15. CLUB BUSINESS SYNTHESIS — 4つの土台の統合とPLAYER SYSTEMとの接続

日本語では、

**場所 → 人 → 測定 → 競争制度 → 戦力獲得 → 戦力化 → 契約価値 → 移動自由 → 移動mechanism比較 → 編成統合 → 収益構造 → ファン関与 → スポンサー契約 → 球場所有 → 経営統合**

まで進んだ。

## 2. Episode 15 role

### Episode 15 — CLUB BUSINESS SYNTHESIS

Question:

球団経営は、収益構造・ファン・スポンサーシップ・球場所有という4つの土台を、どう組み合わせて一つのビジネスとして成り立たせているのか？

Function:

**four foundations → one business system, connected back to roster CONSTRAINT**

Key:

- Club Business Construction Audit（FOUNDATION / WHO DECIDES / WHO PAYS-BENEFITS / LINK BACK TO ROSTER）
- Stakeholder Map（新規、WHO PAYS/WHO BENEFITS）
- Episode 10のCONSTRAINT（budget）とBUSINESS SYSTEMの明示的な接続
- rebaseによる並行更新の解決（Episode 9の原則の実践例）

Episode 1〜14の役割は[REVIEW_NPB_SERIES_01_14_2026-09-01.md](REVIEW_NPB_SERIES_01_14_2026-09-01.md)を参照。

## 3. Connection audit

### 14 → 15

球場所有という一つの土台 → 4つの土台全体の統合。

**Very strong, structurally symmetric with 9 → 10.**

Episode 14の`NEXT QUESTION`が、そのままEpisode 15のCore Questionになった。さらに、Episode 5〜9→10という既存パターンをEpisode 14の時点で意識的に予見し、Episode 11〜14→15として再現した点が、単なる接続の強さを超えた**設計上の一貫性**を示している。

### 10 ↔ 15（新規：システム間接続）

Episode 10のCONSTRAINT（budget）が、Episode 15で「4つの土台の組み合わせから生まれる」と明示的に接続された。これは、これまでの「前の回→次の回」という一方向のretrievalとは異なる、**2つの完成したsystem同士の接続**という新しい種類のretrievalである。

## 4. Retrieval audit（拡張）

### Episode 10 ↔ 15（System-level retrieval、新規）

PLAYER SYSTEMの統合物（Roster Construction Audit）とBUSINESS SYSTEMの統合物（Club Business Construction Audit）が、互いに参照し合う形で接続された。個別conceptの再利用ではなく、**system全体の再利用**という新しい階層のretrievalが生まれた。

**Retrieval design: STRONG PASS（system-level retrievalという新しい階層を確認）。**

## 5. Reusable conceptual toolkit after Episode 15

Episode 1〜14のtoolkitに加え、Episode 15で以下が追加された。

### Club Business Construction Audit

1. FOUNDATION
2. WHO DECIDES
3. WHO PAYS / WHO BENEFITS
4. LINK BACK TO ROSTER

### Stakeholder Map（新規）

複数の主体が関わる制度を統合する際、「誰が何を負担し、何を得るか」を一つの表に整理する。

## 6. Production-quality audit（拡張）

Episode 15では、Pre-Deploy Renderer Checkに加えて、内部リンク（`#/essay/...`形式でのEpisode 11〜14への参照）が正しくレンダリングされることも目視確認した。これはsynthesis回特有の追加チェック項目として記録する。

また、並行更新によるindex conflictをrebaseで解決した実務例は、Episode 9で確立した原則の具体的な実践例として記録する。

## 7. Phase audit

Episode 14で「Phase UIは実装しない」という最終判断を下している。この判断は変更しない。

PLAYER SYSTEM / BUSINESS SYSTEMという2分類は、Episode 15によって**内部制作ドキュメント上の分析ツールとしての価値**をさらに示した（system-level retrievalを可能にした）。ただし、これは引き続き読者向けサイトUIへは反映しない。

## 8. Why Episode 16 should connect the two systems

Episode 15の`NEXT QUESTION`は既に、

**Does a good roster really generate revenue, and does revenue really turn into a good roster? How does that two-way relationship actually work inside NPB?**

へ到達している。PLAYER SYSTEMとBUSINESS SYSTEMがそれぞれ統合された今、次の自然な一歩は、この2つのシステムを独立に扱うのではなく、**双方向の関係**として読むことである。

## 9. Episode 16 selection

### Title candidate

**「戦力と経営は、互いにどう影響し合うのか」**

Role:

`PLAYER SYSTEM × BUSINESS SYSTEM INTERACTION`

Core Question:

**良い戦力は本当に収益を生み、収益は本当に良い戦力に変わるのか。その双方向の関係は、NPBの中でどう働いているのか？**

詳細は[RETROSPECTIVE_NPB_SERIES_15_2026-09-01.md](RETROSPECTIVE_NPB_SERIES_15_2026-09-01.md)のEpisode 16 Briefを参照。

### 重要な注意（Fact Discipline）

Episode 16は、「強い球団は必ず儲かる」「儲かる球団は必ず強い」という決定論的な因果を主張しないことを、Briefの段階から明記している。これは実証が難しい古典的なスポーツ経済学の論点であり、本シリーズが検証できる範囲を超える。あくまで**制度的な経路**（どんな仕組みで影響し得るか）を読むことに徹する。

## 10. Series success after Episode 15

Before the series:

「野球で何が起きた？」

After Episodes 1–15:

読者は、PLAYER SYSTEMの10の問い、BUSINESS SYSTEMの4つの問いに加え、

- **これら2つのシステムは、独立しているのか、それとも互いに影響し合っているのか？**

という、シリーズ全体を貫く問いに到達する準備が整った。

## 11. Final decision

- Episodes 1–15 overall: **PASS**
- Episode 15 synthesis quality: **PASS**（Episode 10との対称性を意図的に設計・実現）
- Retrieval: **STRONG PASS**（system-level retrievalという新しい階層を確認）
- Source discipline: **PASS**
- Production quality: **PASS**（内部リンク確認を新規追加）
- Phase UI: **実装しない（Episode 14での最終判断を維持）**
- Episode 16: **PLAYER SYSTEM × BUSINESS SYSTEM INTERACTION — 決定論的因果を主張しない制度的経路の探究**

## 12. Better Question after Episode 15

Before:

「どの球団経営が一番優れている？」

After:

**「この球団経営は、収益構造・ファン・スポンサーシップ・球場所有のどれを中心的な変数とし、それが編成のCONSTRAINTとどうつながり、その循環はどんな条件で強まる、あるいは弱まるのか？」**
