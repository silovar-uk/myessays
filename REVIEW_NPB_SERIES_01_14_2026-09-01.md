# NPB学習シリーズ Review — Episodes 1–14

Updated: 2026-09-01
Series: `野球という産業を読む`
Scope: Episode 1–14

## 1. Overall assessment

**PASS — Episode 15（BUSINESS SYSTEM Synthesis）へ進んでよい。**

PLAYER SYSTEM（Episode 1〜10）に続き、BUSINESS SYSTEM（Episode 11〜14）が4本の土台（収益構造・ファン・スポンサーシップ・球場所有）を揃えた。Episode 9〜13で先送りにしてきたPhase UI導入の判断は、Episode 14の完了をもって**実装しないという最終決定**を下した。

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

日本語では、

**場所 → 人 → 測定 → 競争制度 → 戦力獲得 → 戦力化 → 契約価値 → 移動自由 → 移動mechanism比較 → 編成統合 → 収益構造 → ファン関与 → スポンサー契約 → 球場所有**

まで進んだ。

## 2. Episode 14 role

### Episode 14 — STADIUM OWNERSHIP

Question:

球団の本拠地球場は、誰が所有し、その所有構造の違いは球団経営やファンとの関係にどんな具体的な違いをもたらすのか？

Function:

**contract-layer observation → its institutional root cause**

Key:

- 指定管理者制度（2003年地方自治法改正）による所有と運営の法的分離
- 公設民営型・自前型・転換型の3分類（編集上の整理）
- MAZDA Zoom-Zoomスタジアム広島・エスコンフィールドHOKKAIDO・横浜スタジアムの3事例
- Episode 13の観察（命名権の三者契約）への遡及的な説明

Episode 1〜13の役割は[REVIEW_NPB_SERIES_01_13_2026-09-01.md](REVIEW_NPB_SERIES_01_13_2026-09-01.md)を参照。

## 3. Connection audit

### 13 → 14

命名権交渉の観察 → その観察を生む所有構造そのもの。

**Very strong, and structurally new.**

これまでの多くの回は「前回のNEXT QUESTIONを引き継ぎ、次のレイヤーへ進む」という前進型の接続だったが、Episode 13→14は**前回の観察の「なぜ」を遡って説明する**という、後ろ向きの補完型接続だった。これは新しい接続パターンとして記録する。

## 4. Retrieval audit（拡張）

### Episode 13 → 14（Backward-explanatory retrieval、新規）

Episode 13の「命名権は球団単独の契約ではない場合がある」という観察が、Episode 14の指定管理者制度によって、単なる事実の記録から「なぜそうなるか」まで説明できる知識へ格上げされた。

### Episode 11 → 14

Episode 11の収益構造（球団単位の権利）が、Episode 14の所有構造分析でも土台として参照された。

**Retrieval design: STRONG PASS（新しい接続パターンを追加）。**

## 5. Reusable conceptual toolkit after Episode 14

Episode 1〜13のtoolkitに加え、Episode 14で以下が追加された。

### Ownership/Operation Split（新規）

「誰が所有しているか」と「誰が運営しているか」を分けて確認する視点。公設民営型・自前型・転換型という3分類とセットで使う。

### Backward-Explanatory Retrieval（制作プロセス上の新しい観察）

後の回が前の回の観察の背景・理由を補完するという接続パターン。これまでの「前回の問いを引き継ぐ」前進型retrievalとは異なる方向性であり、今後の回でも意識的に狙える。

## 6. Production-quality audit（拡張）

Episode 11〜14の4回連続で、Pre-Deploy Renderer Check + Post-Deploy Visual Checkの2段階体制が機能した。この体制はシリーズの標準QA手順として完全に定着している。

## 7. Phase UI — 最終判断の記録

Episode 9のReviewで初めて候補taxonomyを示してから、Episode 10・11・12・13のReviewで判断を段階的に先送りにしてきたPhase UI導入について、Episode 14の完了をもって**実装しない**という最終判断を下した。

判断の骨子：

1. `series.js`の実装確認により、Phase UI実装はサイト共有基盤への変更であり、記事追加とは異なるコスト・リスクを伴うことを確認した。
2. ナビゲーション上の必要性を裏付ける具体的な兆候がない。
3. PLAYER SYSTEM / BUSINESS SYSTEMという2分類自体、将来のLEAGUE・MEDIA・CITY・GLOBAL等のmacro-phaseまで説明し続けられる保証がない。
4. Episode 10・15のようなsynthesis回が、明示的なUIなしに事実上のPhase境界として機能する。

詳細は[RETROSPECTIVE_NPB_SERIES_14_2026-09-01.md](RETROSPECTIVE_NPB_SERIES_14_2026-09-01.md)を参照。この判断は、読者からの具体的な要望や、記事本数・macro-phaseの大幅な増加がない限り再検討しない。

**Phase UI: 実装しない（最終）。PLAYER SYSTEM / BUSINESS SYSTEMは内部制作ドキュメント上の編集ツールとしてのみ継続使用する。**

## 8. Why Episode 15 should synthesize BUSINESS SYSTEM

Episode 14の`NEXT QUESTION`は既に、

**So how do these four foundations actually combine into one whole — a club's business as a going concern?**

へ到達している。これは、Episode 5〜9をEpisode 10で統合したのと構造的に対称なsynthesisであり、BUSINESS SYSTEM（Episode 11〜14）を一区切りする自然な回になる。

## 9. Episode 15 selection

### Title candidate

**「球団経営という一つの全体をどう組み立てるのか」**

Role:

`CLUB BUSINESS SYNTHESIS`

Core Question:

**球団経営は、収益構造・ファン・スポンサーシップ・球場所有という4つの土台を、どう組み合わせて一つのビジネスとして成り立たせているのか？**

詳細は[RETROSPECTIVE_NPB_SERIES_14_2026-09-01.md](RETROSPECTIVE_NPB_SERIES_14_2026-09-01.md)のEpisode 15 Briefを参照。

## 10. Series success after Episode 14

Before the series:

「野球で何が起きた？」

After Episodes 1–14:

読者は、PLAYER SYSTEMの10の問いに加え、

- その戦力構築の原資となる収益はどこから来るのか？
- その収益は結局誰の行動から生まれているのか？
- その注目はどんな契約を通じて収益に変わるのか？
- **その舞台となる球場は誰が所有し、それが経営の何を規定しているのか？**

と、BUSINESS SYSTEM側の4つの問いも分解できるようになった。Episode 15で、これらが一つの全体としてどう組み合わさるかを見る準備が整った。

## 11. Final decision

- Episodes 1–14 overall: **PASS**
- Episode 14 retrieval quality: **PASS**（Backward-explanatory retrievalという新しい接続パターンを追加）
- Retrieval: **STRONG PASS**
- Source discipline: **PASS**
- Production quality: **PASS**（Pre-Deploy Renderer Checkが4回連続で機能）
- Phase UI: **実装しない（最終判断、確定）**
- Episode 15: **CLUB BUSINESS SYNTHESIS — BUSINESS SYSTEMの統合回、PLAYER SYSTEM（Episode 10）と対称な構造**

## 12. Better Question after Episode 14

Before:

「どの球場が一番すごい？」

After:

**「この球場は誰が所有し、誰が運営し、その所有構造が生む意思決定の範囲は、収益・ファン・スポンサーという他の土台とどう組み合わさって、一つの球団経営を作っているのか？」**
