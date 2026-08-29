# My Essays

論文・エッセイ・レビューを、Markdown + GitHubで蓄積する個人アーカイブ。

## できること

- タイトル・本文・タグ・キーワードの全文検索
- 論文種別で絞り込み
- 作成年で絞り込み
- タグの複数選択
- お気に入り度で絞り込み・並び替え
- 作成日 / 更新日 / お気に入り度 / 育てたい度を表示
- 論考ごとの読書ビューと目次
- 同一記事を日本語 / English Mix / Españolで切り替えて読む
- `/` で検索、`Esc` でLibraryへ戻る

## 論考データの考え方

日本語版を記事の正本とする。本文は `essays/*.md` に保存し、YAML風front matterにメタデータを持たせる。アプリは `data/index.json` に列挙された日本語Markdownを読み込む。

```yaml
---
id: example
title: "タイトル"
subtitle: "サブタイトル"
created: "2026-08-08"
updated: "2026-08-08"
type: "Conceptual Paper"
status: "完成"
tags: ["能力評価", "AI"]
keywords: ["latent capability"]
favorite: 5
grow: 4
abstract: "概要"
---
```

English MixとEspañolは別記事ではなく、同じ記事IDを使う派生版として扱う。

- 日本語正本: `essays/YYYY-MM-DD-slug.md`
- English Mix: `english-mix/記事ID.md`
- Español: `spanish/記事ID.md`
- 派生版index: `data/versions-index.json`

派生版では `title` / `subtitle` / `abstract` / 本文を差し替えられる。`id`、作成日、Series、お気に入り、読了状態、After Reading、ブラウザ内メモなどの記事管理情報は日本語正本と共有する。

## 新しい論考を追加する

1. `essay-template.md` を複製する。
2. 日本語正本を `essays/YYYY-MM-DD-slug.md` として保存する。
3. `data/index.json` の `essays` 配列へ日本語版のパスを追加する。
4. English Mixも作る場合は、同じ記事IDで `english-mix/記事ID.md` を作る。
5. Españolも作る場合は、同じ記事IDで `spanish/記事ID.md` を作る。
6. 派生版を作った記事は `data/versions-index.json` の同じ記事IDへ `en-mix` / `es` のパスを登録する。
7. GitHubへ反映する。

例:

```json
{
  "article-id": {
    "en-mix": "english-mix/article-id.md",
    "es": "spanish/article-id.md"
  }
}
```

Español版は全文スペイン語を基本とし、原文の意味・Markdown構造・リンク・画像・引用・出典を維持する。派生版は `data/index.json` へ追加しない。

## 実装メモ

- Readerの派生版切替: `reader-versions.js`
- Reader切替UI: `reader-versions.css`
- Libraryの版バッジ・絞り込み: `library-versions.js` / `library-versions.css`
- 派生版一覧: `data/versions-index.json`
- localStorageの読書状態キーは記事ID基準のまま変更しない

詳細な設計・移行方針は [IMPLEMENTATION_PLAN_SPANISH_VARIANTS.md](IMPLEMENTATION_PLAN_SPANISH_VARIANTS.md) を参照。

## GitHub Pages

ルートの `index.html` をそのまま配信できる静的サイト。GitHub Pagesが未設定の場合は、Repository Settings → Pages から `main` / root を公開元に指定する。

## Page Reader Bookmarklet

長いページを抽出するPage Readerは、短いBookmarklet Loaderと外部本体に分離している。導入・更新・制約は [tools/page-reader.md](tools/page-reader.md) を参照。

## 最初の収録論文

- 「できる」は外から見えない――他者能力推定における出力・文脈・自己基準の非対称性――AI評価を補助線とした概念モデル
- 種別: Conceptual Paper
- 作成日: 2026-08-08
