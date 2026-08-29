# MyEssays Español対応・用語機能撤去 実装計画

更新日: 2026-08-29
対象: `silovar-uk/myessays`

## 0. この計画の結論

今回の変更は、MyEssaysを大規模な多言語CMSへ作り替えるものではない。

目的は次の2点に限定する。

1. 既存の「日本語 + English Mix」という閲覧構造へ、Español版を安全に追加する
2. 現在不要になった「用語」機能を、UIだけでなくコード・データ・テストまで含めて完全撤去する

設計上の最重要原則は以下。

- 日本語版を正本とする
- English Mix / Español は同じ記事IDを持つ派生版とする
- 派生版ごとの専用JavaScriptを増やさない
- ただし、将来性を理由に巨大な抽象化はしない
- 現在のEnglish Mix資産と読書状態を壊さない
- Libraryは引き続き「日本語正本の記事一覧」を中心とする
- 今回のSpanish化は動作確認用1記事のみ。全記事翻訳はしない

---

# 1. 現状調査で確認できたこと

## 1-1. 日本語版が正本

日本語本文は `essays/*.md` に保存され、`data/index.json` に列挙されたファイルを `app.js` が読み込む構造。

記事の基本metadataは日本語版front matterに存在する。

主な項目:

- `id`
- `title`
- `subtitle`
- `created`
- `updated`
- `type`
- `status`
- `tags`
- `keywords`
- `favorite`
- `grow`
- `abstract`
- `series`
- `seriesOrder`

この構造は今回も維持する。

## 1-2. English Mixは記事IDをキーにした派生版

現在は `data/mix-index.json` に、

```json
{
  "version": 1,
  "mixes": {
    "article-id": "english-mix/article-id.md"
  }
}
```

という形でEnglish Mix版を管理している。

既存Mix資産は多数存在しており、今回の変更でこれらを破壊しないことが重要。

English MixのMarkdownには例として以下のfront matterが存在する。

```yaml
---
id: decaf-coffee-how-caffeine-is-removed
title: "デカフェはどうやってカフェインだけ抜くのか"
subtitle: "How decaf removes caffeine before the beans are roasted"
mode: "english-mix"
english_ratio: 0.45
mix_unit: "sentence"
---
```

現行の `english-mix.js` は主に派生版本文を読み込み、日本語記事オブジェクトへ本文を差し替える形で表示している。

## 1-3. 言語切替時の読書位置復元は既に存在する

`english-mix.js` では、単純な `scrollY` コピーではなく、

- 見出し
- 本文ブロック
- セクション内のおおよその位置
- 記事全体の進捗

を使って、日本語とEnglish Mixの文章量が違っても近い読書位置へ戻す処理がある。

これは今回のEspañol対応でも再利用する。

## 1-4. 読了状態・メモ等は記事ID単位

`reading-state-ui.js` ではLocalStorageキーに記事IDを使用している。

例:

```text
myessays:reading-state:{articleId}
myessays:reading-note:{articleId}
myessays:reader-reflections:v1:{articleId}
myessays:reader-reflections:draft:v1:{articleId}
```

そのため、派生版でも同一記事IDを維持すれば、

- 読了状態
- 開封状態
- メモ
- After Reading

を原則そのまま共有できる。

この既存設計は変更しない。

## 1-5. LibraryにはEnglish Mix専用拡張がある

`library-mix.js` が以下を追加している。

- English Mix有無の判定
- `EN MIX` バッジ
- English Mix版あり / なしフィルター

Español対応では、このコードをコピーしてSpanish専用処理を作るのではなく、必要最小限だけ複数派生版対応へ一般化する。

## 1-6. 用語機能はReader Pluginとして独立している

現在の用語機能は主に以下で構成される。

- `glossary-tools.js`
- `glossary-tools.css`
- `data/glossary.json`
- `data/glossaries/*.json`
- `index.html` のCSS / JS読み込み
- Reader Runtimeへのplugin登録
- 記事追加ガイド内の用語説明
- glossaryを前提にした自動テスト

用語機能はDOM上の表示だけでなく、本文中の対象語をボタン化し、サイドパネルを生成する処理まで持っている。

したがって、単なる非表示ではなく完全削除が必要。

## 1-7. テストがglossaryの存在を前提にしている

`tests/reader-architecture.test.js` では、

- `glossary-tools.js` がReader Runtimeより後に読み込まれること
- glossary pluginが `MyEssaysReaderRuntime.register` を利用していること
- 記事別glossary JSONを読むこと
- glossary priority
- 特定glossary JSONの内容

などを直接テストしている。

そのため、用語削除時にはテスト修正が必須。

---

# 2. 今回のスコープ

## 必ず実施する

- Español版の派生記事を読めるようにする
- 日本語 / English Mix / Español を同一記事画面で切り替えられるようにする
- 派生版切替ロジックを1つへまとめる
- English Mix既存資産を新しい派生版インデックスへ移行する
- 読書位置復元をEnglish Mix / Español双方で利用する
- 記事状態を日本語と共有する
- Libraryで `EN MIX` / `ES` の存在を確認できるようにする
- Libraryの派生版フィルターを必要最小限一般化する
- 用語機能を完全削除する
- 用語削除に伴うtestsを修正する
- READMEと「論考を追加するには」を新仕様へ更新する
- Español版サンプル記事を1本だけ作る
- 既存testsを実行する
- PC / スマホで主要動作を確認する

## 今回やらない

以下はスコープ外。

- 全既存記事のSpanish翻訳
- Library全体のスペイン語UI化
- Spanish本文をLibrary全文検索対象へ入れること
- 英語全文版の新設
- Portuguese版の新設
- Easy Japanese版
- 要約版
- 派生版ごとのSEOページ生成
- URLを言語ごとに分割する仕組み
- ブラウザ言語による自動切替
- 翻訳APIの自動実行
- 翻訳管理CMS
- `learning` / `translation` など今回使わない抽象typeの導入
- 今回の変更と無関係なReader全体のリファクタ

---

# 3. 目標UX

## 3-1. 記事画面

記事を開いたとき、現在の表示切替を次のようにする。

```text
日本語 | English Mix | Español
```

ただし、記事ごとに存在する版だけを利用可能にする。

例1: 日本語のみ

```text
日本語
```

例2: 日本語 + English Mix

```text
日本語 | English Mix
```

例3: 日本語 + Español

```text
日本語 | Español
```

例4: 3版すべて

```text
日本語 | English Mix | Español
```

未作成版をdisabledで常時並べるか、存在する版だけ表示するかは、実装時のUI確認で決める。

第一候補は「存在する版だけ表示」。理由は、未作成表示が大量に並ぶと記事閲覧時のノイズになるため。

## 3-2. 初期表示

初期表示は常に日本語。

ブラウザ言語から自動的にEspañolへ切り替えない。

理由:

- 日本語が正本という思想を維持する
- 既存利用者の挙動を変えない
- 言語判定ロジックを今回増やさない

## 3-3. 切替時

`JA → EN MIX → ES → JA` と連続切替しても、読んでいた意味上の位置から大きく飛ばないこと。

現在のEnglish Mix用読書位置復元を共通処理として利用する。

## 3-4. Library

日本語記事カードを正本とする。

派生版がある場合のみ小さなAvailability Badgeを出す。

例:

```text
Conceptual Paper   EN MIX  ES
```

バッジ自体をクリックして直接派生版を開く機能は今回不要。

記事ページへ入ってから表示を切り替える。

---

# 4. 推奨データ構造

## 4-1. 新規ファイル

`data/versions-index.json`

第一候補:

```json
{
  "version": 1,
  "articles": {
    "decaf-coffee-how-caffeine-is-removed": {
      "en-mix": "english-mix/decaf-coffee-how-caffeine-is-removed.md",
      "es": "spanish/decaf-coffee-how-caffeine-is-removed.md"
    },
    "json-history-small-spec-common-language": {
      "en-mix": "english-mix/json-history-small-spec-common-language.md"
    }
  }
}
```

### この形を推奨する理由

- 現在の `mix-index.json` から機械的に移行しやすい
- 言語 / 派生版ごとの専用JSが不要になる
- `en-mix` と `es` 以外の概念を今は持たなくてよい
- 新しい版を増やす場合もデータ追加中心で対応できる
- 過剰なschemaを導入しない

## 4-2. 日本語版はversions-indexへ入れない

日本語版は引き続き `data/index.json` + `essays/` を正本とする。

`versions-index.json` には派生版だけを持たせる。

理由:

- 既存アプリ構造を大きく変えない
- 日本語正本というルールが明確
- `data/index.json` を再設計する必要がない

## 4-3. 旧 `mix-index.json`

移行完了後は削除を第一候補とする。

ただし、一時的互換処理を入れる場合も恒久的に残さない。

理想的な移行順:

1. 現在の `mix-index.json` を読み取る
2. 全エントリを `versions-index.json` の `en-mix` へ移行
3. 新コードを `versions-index.json` 対応に変更
4. tests確認
5. `mix-index.json` への参照が0件になったことを検索
6. `mix-index.json` 削除

---

# 5. 派生Markdownの扱い

## 5-1. 保存場所

```text
essays/        日本語正本
english-mix/   English Mix
spanish/       Español
```

Españolファイル名:

```text
spanish/{article-id}.md
```

## 5-2. 同一記事ID

すべて同じ `id` を持つ。

```text
Japanese      id: example
English Mix   id: example
Español       id: example
```

派生版に新しい記事IDを発行しない。

## 5-3. metadataのマージルール

派生版のfront matterすべてを日本語metadataへ上書きしない。

### 派生版から上書きしてよいもの

- `title`
- `subtitle`
- `abstract`
- `body`

### 日本語正本を維持するもの

- `id`
- `created`
- `updated`
- `type`
- `status`
- `tags`
- `keywords`
- `favorite`
- `grow`
- `series`
- `seriesOrder`

### English Mix固有metadata

既存ファイルに存在する以下は、そのままファイル内に残してよい。

- `mode`
- `english_ratio`
- `mix_unit`

ただし、Reader表示の共通metadataとして無理に扱う必要はない。

## 5-4. fallback

派生版に `title` / `subtitle` / `abstract` が存在しない場合は、日本語正本を表示する。

これにより既存English Mixファイルを一括修正せずに移行できる。

---

# 6. Reader実装方針

## 6-1. `english-mix.js` の役割を一般化する

現行 `english-mix.js` には以下が含まれている。

- 現在記事ID取得
- mix index読み込み
- 派生本文fetch
- キャッシュ
- Reader切替UI生成
- 読書位置capture
- 読書位置restore
- 切替後render

このうち、English Mix固有なのは主に以下。

- `INDEX_URL = data/mix-index.json`
- `mixes`
- `mixCache`
- `mode === 'mix'`
- `English Mix` 固定ラベル

これらだけを派生版共通へ変更する。

## 6-2. ファイル名候補

第一候補:

```text
reader-versions.js
reader-versions.css
```

既存 `english-mix.js / css` を名前変更するか、新ファイルへ整理したうえで旧ファイルを削除する。

### 禁止

```text
english-mix.js
spanish.js
```

のように言語ごとの切替実装を並行して持つこと。

## 6-3. stateイメージ

必要最小限でよい。

```js
const versionByEssay = new Map();
const versionCache = new Map();
```

現在版:

```text
ja
en-mix
es
```

日本語は `state.essays` の正本。

派生版のみ `versions-index.json` からfetchする。

## 6-4. 切替処理の流れ

```text
1. 現在記事ID取得
2. 正本記事を取得
3. 現在読書位置をcapture
4. 選択versionを確認
5. jaなら正本記事を利用
6. 派生版ならversions-indexからpath取得
7. Markdownをfetch + parseFrontMatter
8. metadata merge
9. showReader()
10. 読書位置restore
11. version changedイベント発火
```

## 6-5. 派生記事オブジェクト

イメージ:

```js
const derivedEssay = {
  ...originalEssay,
  title: variantMeta.title || originalEssay.title,
  subtitle: variantMeta.subtitle || originalEssay.subtitle,
  abstract: variantMeta.abstract || originalEssay.abstract,
  body: variantBody,
  metrics: readingMetrics(variantBody),
  __readerVersion: versionKey
};
```

管理metadataは原則正本を優先する。

## 6-6. Reader Runtimeとの関係

派生版切替後も `showReader()` を通してReader plugin群を正常に再実行できることを確認する。

特に以下を回帰確認する。

- source links
- reader navigation
- reflections / After Reading
- GPT bridge
- selection tools
- reading state
- reading locators
- series

用語pluginは今回削除する。

---

# 7. Library実装方針

## 7-1. `library-mix.js` を必要最小限一般化

現在のEnglish Mix専用処理:

- `state.mixIds`
- `state.mixMap`
- `hasEnglishMix()`
- `EN MIX` badge
- English Mix filter

これを複数派生版対応へ変更する。

ファイル名第一候補:

```text
library-versions.js
library-versions.css
```

## 7-2. Library state

例:

```js
state.versionMap = {};
```

判定:

```js
hasVersion(essay, 'en-mix')
hasVersion(essay, 'es')
```

## 7-3. Badge

表示例:

```text
EN MIX
ES
```

記事に存在するものだけ表示。

## 7-4. Filter

既存の「English Mix あり / なし」から、以下程度へ変更する。

第一候補:

```text
読める版
- すべて
- English Mixあり
- Españolあり
```

「なし」フィルターは必要性が低いため、削除候補。

理由:

- 主目的は読みたい版が存在する記事を探すこと
- UIを簡潔に保つ

実装前後で現在の利用性を見て最終判断する。

## 7-5. 検索

Spanish本文を検索対象にしない。

既存の `searchText` は日本語正本を基準としたまま。

---

# 8. 用語機能の完全撤去

## 8-1. 削除対象

最低限:

```text
glossary-tools.js
glossary-tools.css
data/glossary.json
data/glossaries/*
```

## 8-2. `index.html`

削除:

```html
<link rel="stylesheet" href="glossary-tools.css?...">
<script src="glossary-tools.js?..." defer></script>
```

記事追加ガイドから以下内容も削除する。

```text
用語補足を付ける場合は data/glossaries/記事ID.json を追加する...
```

## 8-3. tests

`tests/reader-architecture.test.js` のglossary前提部分を削除 / 書き換える。

削除対象例:

- plugin配列の `glossary-tools.js`
- glossary runtime register確認
- per-article glossary loading test
- libuv glossary test
- glossary priority test

ただし「Reader Runtimeが各Reader pluginより先に読み込まれる」というアーキテクチャテスト自体は維持する。

例:

```text
source-links.js
reader-navigation.js
reader-reflections.js
```

などを対象に継続する。

## 8-4. repository-wide search

実装完了後、最低限以下を検索する。

```text
glossary
用語
glossary-tools
data/glossaries
data/glossary.json
```

旧機能由来の参照が0であることを確認する。

記事本文中で一般名詞として「用語」が使われている場合は削除対象ではない。

---

# 9. Spanishサンプル記事

## 9-1. 今回は1記事のみ

全記事翻訳は行わない。

既存記事1本を選び、Español版の動作確認用にする。

候補:

```text
decaf-coffee-how-caffeine-is-removed
```

理由:

- 比較的構造が分かりやすい
- English Mix版も存在する
- JA / EN MIX / ES の3版切替を1記事でテストできる
- 技術用語や固有名詞が過度に多くない

実装時によりテストしやすい記事があれば変更してよい。

## 9-2. Spanish翻訳ルール

- 全文スペイン語
- 日本語語順を残した逐語訳を避ける
- 原文の主張、論理、事実関係を変えない
- 地域固有表現へ寄せすぎない
- 読みやすい標準スペイン語を優先
- 固有名詞を必要以上に翻訳しない
- Markdown構造を維持
- 見出し階層を維持
- URLを維持
- 画像を維持
- 引用を維持
- 出典を維持

front matterの読者向け項目:

```yaml
title:
subtitle:
abstract:
```

はSpanish化してよい。

---

# 10. ファイル単位の変更計画

## 新規予定

```text
data/versions-index.json
reader-versions.js
reader-versions.css
library-versions.js
library-versions.css
spanish/{sample-article-id}.md
```

※ 既存ファイルをrename / 改修した方が差分が小さい場合は調整可。

## 更新予定

```text
index.html
README.md
tests/reader-architecture.test.js
```

加えて、依存関係調査の結果必要なら:

```text
app.js
reader-runtime.js
reading-state-ui.js
series.js
```

ただし、明確な必要がなければ変更しない。

## 削除予定

```text
data/mix-index.json
english-mix.js
english-mix.css
library-mix.js
library-mix.css
glossary-tools.js
glossary-tools.css
data/glossary.json
data/glossaries/*
```

`mix-index` / `english-mix.js` 等は新共通処理への移行完了後に削除。

---

# 11. 実装フェーズ

## Phase 1: Before snapshot

実装前に以下を確認。

- Library正常表示
- 日本語記事正常表示
- English Mix切替正常
- EN MIX badge
- English Mix filter
- 読了状態
- メモ
- After Reading
- Series
- スマホ表示

可能なら対象記事を1本決めて、JA / EN MIX切替時の挙動を基準として記録する。

## Phase 2: 用語機能撤去

先にglossaryを削除する。

理由:

- 多言語対応と独立した変更
- Reader plugin数を減らした状態で派生版対応へ進められる
- 問題発生時の切り分けがしやすい

作業:

1. glossary CSS読み込み削除
2. glossary JS読み込み削除
3. glossary files削除
4. data削除
5. 投稿ガイド削除
6. tests修正
7. tests実行
8. Reader回帰確認

## Phase 3: versions index作成

`mix-index.json` の全English Mix mappingを `versions-index.json` へ移行。

この段階ではSpanishなしでもよい。

移行内容の件数が旧indexと一致することを確認する。

## Phase 4: Reader共通化

`english-mix.js` の既存読書位置処理を保持しながら、

```text
ja
en-mix
es
```

を共通関数で扱えるよう変更。

まずJA / EN MIXのみで既存挙動が維持されることを確認。

Spanish追加はその後。

## Phase 5: Library共通化

`library-mix.js` を派生版map対応へ変更。

まず `EN MIX` badgeが全既存対象記事で維持されることを確認。

その後 `ES` badge対応を追加。

## Phase 6: Españolサンプル追加

Spanish Markdownを1本作成。

`versions-index.json` に `es` を追加。

以下を確認。

```text
JA → ES
ES → JA
JA → EN MIX → ES → JA
```

## Phase 7: ガイド・README更新

記事追加フローを現行より複雑にしすぎない。

推奨説明:

```text
1. 日本語版を essays/ に追加
2. data/index.jsonへ登録
3. 必要ならEnglish Mixを english-mix/ に追加
4. 必要ならEspañolを spanish/ に追加
5. 派生版を data/versions-index.json に登録
6. GitHubへ反映
```

用語JSONの説明は削除。

## Phase 8: cleanup

検索:

```text
mix-index
english-mix.js
library-mix.js
glossary
用語
```

旧コード参照を確認。

移行済みで不要なら旧ファイル削除。

---

# 12. テスト計画

## 12-1. 自動テスト

repoに `package.json` は現在確認できないため、既存testsが `node:test` ベースであることを踏まえ、実装環境で実行方法を確認する。

想定コマンド:

```bash
node --test tests/*.test.js
```

実装前に現在のtestsが通る状態を確認し、変更後も実行する。

## 12-2. Case A: 日本語のみ

期待:

- 記事表示正常
- version switchが不要なら非表示または日本語のみ
- 404なし
- console errorなし

## 12-3. Case B: JA + EN MIX

期待:

- 既存English Mix正常表示
- JA → EN MIX
- EN MIX → JA
- 読書位置維持
- EN MIX badge正常

## 12-4. Case C: JA + ES

期待:

- JA → ES
- ES → JA
- title / subtitle / abstractのfallback正常
- Markdown表示正常
- 読書位置維持

## 12-5. Case D: JA + EN MIX + ES

期待:

```text
JA → EN MIX → ES → JA
```

を複数回繰り返しても表示が壊れない。

## 12-6. 状態共有

同一記事で以下を確認。

- 日本語で読了 → ESでも読了状態
- EN MIXでメモ → JAでも同じメモ
- ESでAfter Reading入力 → JAでも同じ記事データとして扱われる
- Series位置が派生版によって増殖しない

## 12-7. Library

確認:

- 日本語検索
- 種類filter
- 年filter
- お気に入りfilter
- tag filter
- sort
- 未読了から1本
- ランダムで1本
- EN MIX badge
- ES badge
- 派生版filter

## 12-8. Reader plugins

確認:

- source links
- navigation
- reflections
- GPT bridge
- selection tools
- reading state
- locators
- series

## 12-9. glossary撤去

確認:

- 用語タブなし
- 用語パネルなし
- glossary CSSリクエストなし
- glossary JSリクエストなし
- glossary JSONリクエストなし
- 404なし
- console errorなし

## 12-10. responsive

最低限:

```text
Desktop: 1280px以上
Mobile: 390px前後
```

確認:

- version switchが本文へ重ならない
- メモタブと衝突しない
- filter UIが横にはみ出さない
- Reader左右レイアウトを壊さない

---

# 13. 受け入れ条件 / Definition of Done

以下をすべて満たしたら完了。

## Functional

- [ ] 日本語版を正本として表示できる
- [ ] 既存English Mixがすべて引き続き読める
- [ ] Español版サンプル1本を読める
- [ ] JA / EN MIX / ESを同一記事URLで切替可能
- [ ] 読書位置が大きく飛ばない
- [ ] 記事IDが派生版で変わらない
- [ ] 読了状態が共有される
- [ ] メモが共有される
- [ ] After Readingが共有される
- [ ] Seriesが共有される

## Library

- [ ] EN MIX badgeを維持
- [ ] ES badgeを表示
- [ ] 派生版filterが動作
- [ ] 日本語全文検索が正常
- [ ] ランダム機能正常
- [ ] 未読了機能正常

## Removal

- [ ] glossary UIが存在しない
- [ ] glossary JS/CSSが存在しない
- [ ] glossary JSONが存在しない
- [ ] `index.html` にglossary参照なし
- [ ] testsに旧glossary前提なし
- [ ] 投稿ガイドに用語JSON説明なし

## Quality

- [ ] Spanish専用切替JSを作っていない
- [ ] 今回使わない抽象概念を増やしていない
- [ ] 無関係な大規模リファクタをしていない
- [ ] 既存testsが通る
- [ ] 新仕様に必要なtestsが追加 / 修正されている
- [ ] 404なし
- [ ] console errorなし
- [ ] PC表示正常
- [ ] スマホ表示正常

---

# 14. 却下条件

以下の状態になった場合、その実装方針は見直す。

## 過剰設計

- `VersionManagerFactory` 等の大きな抽象層を新設する
- 現在使わないtype / locale schemaを大量に導入する
- 日本語記事管理まで全面再設計する
- Routerを言語対応のためだけに全面変更する

## コピー実装

- `spanish.js` が `english-mix.js` のほぼコピー
- `library-spanish.js` を別途作る
- 言語が増えるたびJSファイルが1本増える

## 状態破壊

- Españolだけ別記事ID
- 言語切替で読了状態がリセット
- メモがversionごとに分離
- Seriesに同じ記事が複数回出る

## UI過剰化

- Library全体をSpanish化
- 未作成言語を大量にdisabled表示
- version switchがスマホ本文へ重なる

## scope creep

- 全記事Spanish翻訳
- Portuguese等の追加
- 翻訳API連携
- SEO国際化

---

# 15. リスクと対策

## Risk 1: 既存English Mix大量資産のindex移行漏れ

対策:

- `mix-index.json` の旧エントリ数を取得
- `versions-index.json` の `en-mix` 数と比較
- key一覧の差分を確認

移行漏れが1件でもあれば旧indexを削除しない。

## Risk 2: 派生metadataで記事管理情報を上書き

対策:

- whitelist方式で `title / subtitle / abstract / body` のみ派生版から採用
- `id` 等をspread順だけに任せない

## Risk 3: showReader再実行でpluginが二重mount

対策:

- 既存Reader Runtimeのlifecycleを維持
- version切替を複数回行ってDOM重複を確認

## Risk 4: 読書位置復元がSpanishで精度低下

対策:

- 現在のsemantic position方式を維持
- h2構造をSpanish版でも日本語版と対応させる
- 見出し数が異なる翻訳を避ける

## Risk 5: glossary削除でReader architecture testが壊れる

対策:

- glossaryテストを単純削除するだけでなく、残存pluginのruntime順序テストを維持

## Risk 6: filter UI複雑化

対策:

- filterは「EN Mixあり / Españolあり」程度まで
- 組み合わせmatrix等は作らない

---

# 16. ロールバック判断

以下が発生した場合、公開反映前に一度戻して原因を切り分ける。

- 既存English Mixの一部が開けなくなった
- 既存記事の読了状態が見えなくなった
- Library読み込み自体が失敗した
- version切替後にReader pluginが重複する
- スマホでReader操作UIが重なる
- 既存testsの複数カテゴリが同時に壊れる

大規模リファクタで一気に解決せず、Phase単位で戻せる差分を維持する。

---

# 17. 実装後の記事追加手順

## 日本語記事のみ

```text
1. essays/ にMarkdown追加
2. data/index.jsonへ追加
```

## English Mixも追加

```text
1. english-mix/{article-id}.md を追加
2. data/versions-index.json の記事IDへ en-mix を追加
```

## Españolも追加

```text
1. spanish/{article-id}.md を追加
2. data/versions-index.json の記事IDへ es を追加
```

例:

```json
{
  "example": {
    "en-mix": "english-mix/example.md",
    "es": "spanish/example.md"
  }
}
```

原則としてアプリ本体JavaScriptを編集しない。

---

# 18. 実装担当への最終指示

この計画より美しい設計を思いついても、まず以下を優先すること。

1. 既存English Mixを壊さない
2. Españolを追加できる
3. glossaryを完全撤去する
4. 状態共有を維持する
5. 投稿運用を複雑にしない
6. 変更量を最小化する

「将来もっと拡張しやすいから」という理由だけで、今回不要な抽象化を増やさない。

実装終了時には、必ず次の順で報告する。

```text
【変更概要】
【変更したファイル】
【削除したファイル】
【派生版の管理方法】
【今回Spanish化した記事】
【今後Spanish版を追加する手順】
【テスト変更内容】
【テスト結果】
【残課題】
```

以上。
