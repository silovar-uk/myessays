# myessays プロジェクト個別指示・作法

本ファイルは `myessays`（https://silovar-uk.github.io/myessays）リポジトリ専用のエージェント向けルール・運用作法です。

## 1. 記事執筆・公開ワークフロー

ユーザーから「記事／コラムを書いてアップしてほしい」と依頼された場合、以下の手順でプッシュまで一貫して行います。

1. **最新リポジトリの同期**:
   必ず執筆前にリモートから最新コミットを取得（`git pull --rebase origin main`）する。
2. **日本語通常版の執筆**:
   `essays/YYYY-MM-DD-{slug}.md` に配置。Frontmatterの必須項目（id, title, subtitle, created, updated, type, status, tags, keywords, favorite, grow, abstract）を満たす。
3. **英語交じり版（EN MIX）の執筆**:
   `english-mix/{slug}.md` に配置。見出しへの英語併記、重要キーワードや要約フレーズへの自然な英語表現を織り交ぜる。
4. **インデックス更新**:
   - `data/index.json`: `essays` 配列の先頭に新記事パスを追加。
   - `data/versions-index.json`: `articles` オブジェクトの先頭に `{slug}: {"en-mix": "english-mix/{slug}.md"}` を追加。
5. **JSON構文チェック**:
   PowerShellの `ConvertFrom-Json` で両ファイルの整合性を検証。
6. **コミット＆プッシュ**:
   1行目に日本語要約を書いたコミットメッセージでコミットし、`origin main` へプッシュする。

## 2. 表記およびスタイルルール
- 文体: 誠実、明快、平易な思考プロセスを重視する。
- **アウトプット（記事本文、概要、コミットメッセージ、生成ドキュメント等）には絶対に関西弁を含めない**（関西弁はチャットの会話文のみ）。
- 和文と半角英数字の間にスペースは空けない。
- カタカナ語の長音表記に従う。
- 漢字は開く（できる、こと、ように、ください）。
