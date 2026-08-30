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
- Structure情報付き記事では、段落のConceptual ProfileとSentence Levelを確認
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

## Argument Structure / Writing Architecture

Structure情報は任意。未設定の記事は従来どおりのReaderとして表示される。

各Sentenceには必要に応じて、Conceptual LevelとRhetorical Roleを付与できる。

### Conceptual Level

- `L1` Evidence / Concrete — 数値、引用、一次情報、具体例、観察された事実
- `L2` Description — 状況説明、背景、要約、パラフレーズ
- `L3` Analysis / Synthesis — 比較、解釈、意味づけ、統合
- `L4` Local Claim — 段落単位の主張、問題設定、小テーゼ
- `L5` Larger Claim — 節・論考・より大きな議論へ接続する主張

数字は文章の優劣ではなく概念レベルを示す。L5が優れていてL1が劣る、という意味ではない。

### Rhetorical Role

現在利用できるRole：

- `claim`
- `evidence`
- `description`
- `analysis`
- `counterargument`
- `qualification`
- `bridge`
- `implication`

### Markdown記法

Structureを付ける段落は、1文1行でSentenceの直前にHTMLコメント形式のメタ情報を書く。同一段落では空行を挟まない。

```markdown
<!-- level:4 role:claim -->
外注による効率化には、組織学習という別のコストが存在する。
<!-- level:2 role:description -->
外部事業者へ業務を委託すると、内部担当者が工程へ触れる時間は減る。
<!-- level:1 role:evidence -->
例えば分析業務を継続的に外注した場合、分析手法は外部側へ蓄積される。
<!-- level:3 role:analysis -->
成果物は残っても、それを生み出す能力まで残るとは限らない。
<!-- level:5 role:implication -->
したがって効率化は、作業時間だけではなく学習の蓄積先まで含めて評価する必要がある。
```

この例のParagraph Profileは `4 → 2 → 1 → 3 → 5` になる。

### Reader UI

- Desktop: 左サイドバーに `Contents / Structure` 切替を表示
- Structure選択時: 本文余白へL1〜L5の小さなレベル表示
- Paragraph選択時: Profile、Sentence Role、Observationを表示
- Mobile: 各段落末に縮約Profileを表示し、タップするとBottom Sheetで詳細を確認
- `S`: Desktop ReaderでStructure表示をON/OFF

Observationは文章の採点ではなく、構造上の特徴を確認するための補助情報。Score、合格/不合格、Good/Bad判定は行わない。

Structure metadataは読了時間・文字数・全文検索の対象から除外される。

## 新しい論考を追加する

1. `essay-template.md` を複製する。
2. 日本語正本を `essays/YYYY-MM-DD-slug.md` として保存する。
3. `data/index.json` の `essays` 配列へ日本語版のパスを追加する。
4. English Mixも作る場合は、同じ記事IDで `english-mix/記事ID.md` を作る。
5. Españolも作る場合は、同じ記事IDで `spanish/記事ID.md` を作る。
6. 派生版を作った記事は `data/versions-index.json` の同じ記事IDへ `en-mix` / `es` のパスを登録する。
7. 必要な段落だけStructure metadataを追加する。
8. GitHubへ反映する。

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
- Argument metadata互換層: `argument-metadata-compat.js`
- Argument Structure Reader: `argument-structure.js` / `argument-structure.css`
- localStorageの読書状態キーは記事ID基準のまま変更しない

詳細な設計・移行方針は [IMPLEMENTATION_PLAN_SPANISH_VARIANTS.md](IMPLEMENTATION_PLAN_SPANISH_VARIANTS.md) および [DEVELOPMENT_PLAN_ARGUMENT_STRUCTURE.md](DEVELOPMENT_PLAN_ARGUMENT_STRUCTURE.md) を参照。

## GitHub Pages

ルートの `index.html` をそのまま配信できる静的サイト。GitHub Pagesが未設定の場合は、Repository Settings → Pages から `main` / root を公開元に指定する。

## Page Reader Bookmarklet

長いページを抽出するPage Readerは、短いBookmarklet Loaderと外部本体に分離している。導入・更新・制約は [tools/page-reader.md](tools/page-reader.md) を参照。

## 最初の収録論文

- 「できる」は外から見えない――他者能力推定における出力・文脈・自己基準の非対称性――AI評価を補助線とした概念モデル
- 種別: Conceptual Paper
- 作成日: 2026-08-08
