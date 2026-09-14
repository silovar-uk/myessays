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
   - `node scripts/validate-version-structure.mjs --id {slug}` を実行し、日本語版と派生版のセクション数・ブロック数・ブロック種別が一致することを確認する。
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
- 既存記事を調査する場合は `node scripts/validate-version-structure.mjs --all --report-only`、新規・更新記事は `--id {slug}` を使う。
