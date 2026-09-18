# myessays プロジェクト個別指示・作法

本ファイルは `myessays`（https://silovar-uk.github.io/myessays）リポジトリ専用のエージェント向けルール・運用作法です。

## 1. 記事執筆・公開ワークフロー

ユーザーから「記事／コラムを書いてアップしてほしい」と依頼された場合、以下の手順でプッシュまで一貫して行います。

1. **最新リポジトリの同期**: 必ず執筆前にリモートから最新コミットを取得（`git pull --rebase origin main`）する。
2. **日本語通常版の執筆**: `essays/YYYY-MM-DD-{slug}.md` に配置。Frontmatterの必須項目を満たす。
3. **英語交じり版（EN MIX）の執筆**: `english-mix/{slug}.md` に配置。日本語版をCanonical Sourceとして、H2の順序とReading Locator対象ブロック（`p` / `ul` / `ol` / `blockquote` / `figure`）を1対1で保持する。英語と日本語の混在・言い換えは各ブロック内部だけで行い、段落の結合・分割・並べ替え・別セクションへの移動をしない。
4. **インデックス同期**: 記事ファイルを作成したら、手作業や記事別workflowで索引を書き換えず、`node tools/sync-content-indexes.mjs --write` を実行して `data/index.json` と `data/versions-index.json` を同期する。EN MIX / ES MIXのfront matter `id` はCanonical IDと同一にする。
5. **整合性確認**: `node tools/sync-content-indexes.mjs --check` と `node tools/audit-content.mjs --strict` を通す。記事ごとの `register-*.yml` を新設しない。
6. **構造Lint**: 新規記事は `node scripts/validate-version-structure.mjs --id {slug}` で完全一致を確認する。既存legacy差は悪化させない。
7. **コミット＆プッシュ**: 1行目に日本語要約を書いたコミットメッセージで `origin main` へプッシュする。

## 2. 表記およびスタイルルール
- 文体: 誠実、明快、平易な思考プロセスを重視する。
- **アウトプット（記事本文、概要、コミットメッセージ、生成ドキュメント等）には絶対に関西弁を含めない**（関西弁はチャットの会話文のみ）。
- 和文と半角英数字の間にスペースは空けない。
- カタカナ語の長音表記に従う。
- 漢字は開く（できる、こと、ように、ください）。

## 3. 派生Reading Modeの構造契約
- 日本語通常版を唯一のCanonical Sourceとする。
- 派生版は「文章全体の再作文」ではなく、Canonical Block Transformationとして作る。
- 原則は `JA 1 semantic block = 派生版 1 semantic block`。内容の翻訳・要約・英語混在はブロック内部で完結させる。
- H2の追加・削除・並べ替え、段落の結合・分割、リストと段落の相互変換、引用やfigureの移動をしない。
- 比較UIに対応関係を推測させることを前提にしない。`reading-locators.js` の位置推測は読書位置を保つ救済策であり、厳密な段落対応の根拠ではない。
- 新規派生版は、全文を一度に再作文するより `Canonical Markdown → section/block parse → block-by-block transform → reassembly → strict validation → publish` を優先する。
- Stable Block IDは現時点では導入しない。runtimeのsection/block/typeとstrict validationで足りなくなる具体的な要件（編集をまたぐ永続参照、reorder追跡等）が出た時点で再評価する。

## 4. Legacy構造差のmigration
- 全件監査は `node scripts/validate-version-structure.mjs --all --report-only --json structure-audit.json`、分類は `scripts/report-structure-migration.mjs`、詳細レビューは `scripts/build-structure-review-packets.mjs` を使う。
- review packetの `confidence` とtaxonomyの `LIKELY_SAFE` は診断ラベルであり、自動修復の許可ではない。
- 一度確認した判断は `data/structure-review-decisions.json` に記録する。`scripts/build-structure-review-queue.mjs` で未確認、確認済み保留、migration-readyを分け、同じ候補を毎回ゼロから読み直さない。
- `reviewPriority` / `segmentability` は「次に何をレビューすると効率がよいか」を表すだけで、修復許可や意味対応の真実度ではない。
- Decision Ledger上で `ALIGNED` だった記事が再びmismatch packetに現れた場合はregressionとして再レビューする。過去のALIGNED判断で現在の不一致を隠さない。
- 判断statusは `SAFE_STRUCTURE_ONLY` / `SAFE_CANONICAL_RESTORE` / `EDITORIAL_RESEGMENT` / `EDITORIAL_REWRITE_REQUIRED` / `STRUCTURAL_REORDER_REQUIRED` / `DEFERRED` / `INVALID_OR_OBSOLETE` / `ALIGNED` を基本とする。
- 問題の分類と修復戦略は分離する。長期的には `FIX` / `RESEGMENT` / `REGENERATE` / `RETIRE` の4戦略で扱う。
- 実際の修復は `data/structure-migrations/batch-XXX.json` にexact replacementを記録し、targetには `verifiedRepairability: "SAFE"` を明示する。曖昧な類似度やAI推測だけで本文を書き換えない。
- `structure-only` は空白・改行以外を変更しない。`canonical-restore` は復元文字列がCanonical Sourceに実在することを必須とする。
- 適用前に `node scripts/apply-structure-migration.mjs --plan ...` でdry-runする。runnerは全targetをpreflightし、全件成功するまで書き込まない。
- 適用後は対象slugをstrict validationし、全件auditとregression gateで悪化がないことを確認する。
- Structure lint artifactにはaudit、migration report、review packets、review queue、testsを残す。次batchはreview queue / packetから開始する。
- 一時workflowを使った場合は適用・検証後に削除する。
- 原則は **Automate everything around the semantic decision.** 候補抽出、context取得、過去判断取得、優先順位、plan検証、適用、再監査は機械化し、意味判断だけを人間またはAIに残す。

## 5. Migration戦略の切替
- **FIX**: 空白・段落境界・明確なCanonical欠落など、exact migrationで安全に直せる。
- **RESEGMENT**: Variantの文字列と順序は保持したまま、Canonical blockへ再分割できる。新policyを増やす前に既存 `structure-only` で表現できるか確認する。
- **REGENERATE**: 意味統合、セクション欠落、Visual Lesson省略、再作文・再構成が強い場合。局所修理よりCanonical blocksから再生成する。
- **RETIRE**: 派生版自体が不要・古い・重複していることを確認できた場合だけ選ぶ。根拠なくretire候補を作らない。
- `repair cost > regeneration cost` になったシリーズや記事群は、一件ずつの修理を続けず再生成へ切り替える。
