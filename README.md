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
- `/` で検索、`Esc` でLibraryへ戻る

## 論考データの考え方

本文は `essays/*.md` に保存し、YAML風front matterにメタデータを持たせる。アプリは `data/index.json` に列挙されたMarkdownを読み込む。

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

## 新しい論考を追加する

1. `essay-template.md` を複製する。
2. `essays/YYYY-MM-DD-slug.md` として保存する。
3. `data/index.json` の `essays` 配列へパスを追加する。
4. GitHubへ反映する。

## GitHub Pages

ルートの `index.html` をそのまま配信できる静的サイト。GitHub Pagesが未設定の場合は、Repository Settings → Pages から `main` / root を公開元に指定する。

## 最初の収録論文

- 「できる」は外から見えない――他者能力推定における出力・文脈・自己基準の非対称性――AI評価を補助線とした概念モデル
- 種別: Conceptual Paper
- 作成日: 2026-08-08
