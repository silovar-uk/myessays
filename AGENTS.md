# myessays プロジェクト個別指示・作法

本ファイルは `myessays`（https://silovar-uk.github.io/myessays）リポジトリ専用のエージェント向けルール・運用作法です。

## 1. 記事執筆・公開ワークフロー

ユーザーから「記事／コラムを書いてアップしてほしい」と依頼された場合、以下の手順でプッシュまで一貫して行います。

1. **最新リポジトリの同期**:
   必ず執筆前にリモートから最新コミットを取得（`git pull --rebase origin main`）する。
2. **日本語通常版の執筆**:
   `essays/YYYY-MM-DD-{slug}.md` に配置。Frontmatterの必須項目（id, title, subtitle, created, updated, type, status, tags, keywords, favorite, grow, abstract）を満たす。
3. **英語交じり版（EN MIX）の執筆**:
   `english-mix/{slug}.md` に配置。日本語版をCanonical Sourceとして、H2の順序とReading Locator対象ブロック（`p` / `ul` / `ol` / `blockquote` / `figure`）を1対1で保持する。英語と日本語の混在・言い換えは各ブロック内部だけで行い、段落の結合・分割・並べ替え・別セクションへの移動をしない。
4. **インデックス更新**:
   - `data/index.json`: `essays` 配列の先頭に新記事パスを追加。
   - `data/versions-index.json`: `articles` オブジェクトの先頭に `{slug}: {"en-mix": "english-mix/{slug}.md"}` を追加。
5. **構造LintとJSON構文チェック**:
   - 新規記事は `node scripts/validate-version-structure.mjs --id {slug}` を実行し、日本語版と派生版のセクション数・ブロック数・ブロック種別が一致することを確認する。
   - 既存記事に過去由来の構造差がある場合は、それを一度に直すことを必須にしない。ただし現在より差を増やさない。CIの `validate-structure-regressions.mjs` がbaseとの差分を比較し、新規・悪化した構造差だけを失敗させる。
   - PowerShellの `ConvertFrom-Json` 等で `data/index.json` と `data/versions-index.json` の整合性を検証する。
6. **コミット＆プッシュ**:
   1行目に日本語要約を書いたコミットメッセージでコミットし、`origin main` へプッシュする。

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
- 比較UIに対応関係を推測させることを前提にしない。構造が壊れた場合は生成・公開フローで検知する。
- `reading-locators.js` の位置推測は読書位置を保つための救済策であり、厳密な段落対応の根拠として扱わない。
- 全体監査は `node scripts/validate-version-structure.mjs --all --report-only` を使う。新規記事は `--id {slug}` で完全一致を確認する。
- 既存の構造差はlegacy debtとして可視化し、段階的に減らす。通常の更新では「既存差を悪化させない」を最低条件とする。

## 4. Legacy構造差のmigration

- 全件監査は `node scripts/validate-version-structure.mjs --all --report-only --json structure-audit.json` を使い、その結果を `node scripts/report-structure-migration.mjs --input structure-audit.json --output structure-migration-report.md --json structure-migration-audit.json` でTaxonomy / Severity / Repairabilityへ整理する。
- 修復判断の前に `node scripts/build-structure-review-packets.mjs --audit structure-migration-audit.json --json structure-review-packets.json --markdown structure-review-packets.md` を実行し、Canonical / Variantの該当section、block本文、suspected range、confidenceを一つのreview packetへまとめる。
- review packetの `confidence` は「怪しい境界をどの程度狭く推定できたか」だけを表す。`HIGH` でも自動修復の許可ではない。`decision` は初期値 `REVIEW_REQUIRED` のままとし、本文を確認してから判断する。
- `LIKELY_SAFE` は自動修復の許可ではない。構造差の小ささを示す候補ラベルにすぎず、Canonical本文と派生版の対応を確認してから、migration plan上で初めて `SAFE` と判断する。
- 候補確認では `SAFE_STRUCTURE_ONLY` / `SAFE_CANONICAL_RESTORE` / `SAFE_CANONICAL_RESTORE_AND_STRUCTURE_ONLY` / `NEEDS_EDITORIAL_JUDGMENT` / `UNSAFE` / `ALREADY_FIXED` を使い分ける。意味の統合・並べ替え・翻訳文の再作文が必要ならSAFEへ上げない。
- 修復は `data/structure-migrations/batch-XXX.json` にCanonical path、variant path、exact replacement、policyを記録する。曖昧な類似度や推測だけで本文を書き換えない。
- migration targetには `verifiedRepairability: "SAFE"` を明示する。`scripts/apply-structure-migration.mjs` はSAFEと確認されていないtargetを拒否する。
- 適用前に `node scripts/apply-structure-migration.mjs --plan data/structure-migrations/batch-XXX.json` を必ずdry-runする。runnerは全targetをpreflightし、すべての修復後構造が一致してから初めて `--apply` で書き込む。後続targetの失敗で先行targetだけが部分適用される状態を作らない。
- `structure-only` policyでは空白・改行以外の文字変更を禁止する。Canonicalから欠落した本文を戻す場合は `canonical-restore` を使い、復元文字列が日本語Canonical Sourceに実在することを検証する。
- 適用後は対象記事ごとに `node scripts/validate-version-structure.mjs --id {slug}` を実行し、完全一致を確認する。その後、全件auditでperfect件数が増え、新規・悪化した問題がないことを確認する。
- 類似度・AI推測はmigration候補の発見補助には使ってよいが、Comparison UIのstrict pairや自動修復の根拠にはしない。目的は自動修復を強くすることではなく、判断に必要な情報収集・位置特定・検証・適用・再監査を機械化すること。
- Structure lintのartifactには `structure-audit.json` / `structure-migration-audit.json` / `structure-migration-report.md` / `structure-review-packets.json` / `structure-review-packets.md` / `structure-tests.txt` を残す。次batchは原則としてreview packetからレビューを開始する。
- 一時的なmigration workflowを使った場合は、適用・検証後に削除し、恒久的なrunner / plan / test / CIだけを残す。
