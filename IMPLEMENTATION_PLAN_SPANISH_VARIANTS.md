# MyEssays Español対応・用語機能撤去 実装計画

更新日: 2026-08-29
対象: `silovar-uk/myessays`

---

# 0. この計画の結論

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
- 既存のlocalStorageキーを変更しない
- 今回と無関係なUI・Markdown・Series・After Reading・検索仕様は変更しない

この変更の成功条件は「多機能になること」ではなく、以下である。

- Español版を1記事で正常に読める
- English Mixが従来どおり使える
- 日本語 / English Mix / Español 間で同一記事として状態が共有される
- 用語機能が完全に消える
- 投稿フローが過度に複雑化しない
- 今後Español記事を追加するときにアプリ本体コードを触らなくて済む

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

今回もこの日本語版metadataを記事の正本として扱う。

## 1-2. English Mixは記事ID単位の派生表示

現在の `data/mix-index.json` は、記事IDからEnglish Mix Markdownへのパスを引く単純なmapになっている。

概念上は以下。

```json
{
  "version": 1,
  "mixes": {
    "article-id": "english-mix/article-id.md"
  }
}
```

English Mixファイルは `english-mix/*.md` に保存される。

実ファイルには、例として以下のようなfront matterが存在する。

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

ただし現行 `english-mix.js` は派生Markdownの本文を主に使用し、日本語正本の記事オブジェクトへ `body` を差し替える方式を採っている。

この設計により記事IDが維持され、他機能から同じ記事として見える。

## 1-3. English Mix切替には読書位置復元ロジックがある

`english-mix.js` では単純な `scrollY` のコピーではなく、以下を組み合わせて切替前の読書位置を保存・復元している。

- H2見出しのセクション位置
- セクション内のreading block位置
- block内の進捗
- 記事全体の進捗
- top / bottom付近の特別扱い

Spanish追加でもこの仕組みを捨てない。

むしろ、English Mix専用名称を外して共通処理にすることが変更の中心になる。

## 1-4. LibraryにもEnglish Mix専用ロジックがある

`library-mix.js` は `data/mix-index.json` を読み込み、以下を追加している。

- English Mixあり / なしフィルター
- `EN MIX` badge
- featured cardへのbadge表示
- archive rowへのbadge表示

Spanish対応時にこのファイルをそのままコピーして `library-spanish.js` を作ってはいけない。

## 1-5. 読了状態・メモは記事ID基準

読書状態関連ではlocalStorageキーが記事IDを基準にしている。

主な例:

```text
myessays:reading-state:<article-id>
myessays:reading-note:<article-id>
myessays:reader-reflections:v1:<article-id>
myessays:reader-reflections:draft:v1:<article-id>
```

したがって、派生版が同じ記事IDを維持すれば、基本的に状態共有は自然に成立する。

今回、これらのlocalStorageキーは変更しない。

## 1-6. 用語機能は独立Reader pluginとして存在

現在、用語機能は主に以下で構成される。

- `glossary-tools.js`
- `glossary-tools.css`
- `data/glossary.json`
- `data/glossaries/*.json`
- `index.html` のCSS / JS読み込み
- Reader Runtimeへの `glossary` plugin登録
- 本文中の用語mark生成
- 用語tab / panel DOM生成
- 記事追加ガイド内の用語説明
- glossaryを前提とするtests

つまり、CSSを非表示にするだけでは撤去にならない。

## 1-7. testsがglossaryの存在を仕様として固定している

`tests/reader-architecture.test.js` には、以下を確認するテストがある。

- glossary pluginがreader runtime後に読み込まれる
- glossaryがcentral runtimeを使う
- article別glossary JSONを読み込む
- legacy glossary fallbackがある
- Node.js記事の `libuv` 用語データがある
- glossary priorityが20である

したがって、glossary削除時はこれらのテストも削除または置換が必要。

テストが赤いままでも機能上は見える、という状態は完了とみなさない。

---

# 2. 今回のスコープ

## 2-1. 必ずやる

- Español版を1記事追加する
- 日本語 / English Mix / Español を同一Reader内で切り替えられるようにする
- English Mix専用indexを、複数派生版を扱える最小構造へ移行する
- 派生版切替JSを共通化する
- LibraryのEN MIX表示を複数版対応へ最小限一般化する
- Spanishのtitle / subtitle / abstract / bodyを表示可能にする
- 記事ID単位の読書状態共有を維持する
- glossary機能を完全削除する
- READMEを更新する
- 画面内「論考を追加するには」を更新する
- glossary前提testsを修正する
- 派生版機能の最低限テストを追加する
- PC / スマホ双方で確認する
- 404 / console errorを確認する

## 2-2. 今回やらない

- 全既存記事のSpanish化
- Library全体のスペイン語UI化
- Spanish本文をLibrary全文検索対象に追加
- English全文版の追加
- Português追加
- Easy Japanese追加
- 自動翻訳API連携
- 翻訳生成ボタン
- 管理画面
- CMS化
- `type: learning / translation` 等の抽象metadata追加
- 言語検出
- ブラウザ言語による自動切替
- URLを `/es/` のように言語別ルート化
- SEO用hreflang対応
- 状態を言語別に持つ仕様
- 今回と無関係なreader pluginの整理
- Markdown engineのリファクタ
- Series機能の再設計

これらは将来必要になった段階で別タスクとする。

---

# 3. 目標アーキテクチャ

## 3-1. 基本モデル

記事には1つの正本と0個以上の派生版がある。

```text
article-id
├─ 日本語正本
│  └─ essays/YYYY-MM-DD-slug.md
├─ English Mix（optional）
│  └─ english-mix/article-id.md
└─ Español（optional）
   └─ spanish/article-id.md
```

日本語正本だけが `data/index.json` に登録される。

English Mix / Españolは独立記事として `data/index.json` へ登録しない。

## 3-2. 派生版index

推奨ファイル名:

```text
data/versions-index.json
```

推奨構造:

```json
{
  "version": 1,
  "articles": {
    "article-id": {
      "en-mix": "english-mix/article-id.md",
      "es": "spanish/article-id.md"
    }
  }
}
```

理由:

- 現在のmix-indexとほぼ同じ思想
- migrationが単純
- JSON構造が読みやすい
- 将来別版が増えてもkeyを1個追加すればよい
- typeやlabelなど余計な情報を持たない

### UI labelの管理

UI labelはversion keyからアプリ側の小さな定数mapで解決する。

例:

```js
const VERSION_DEFINITIONS = {
  ja: { label: '日本語', badge: 'JA' },
  'en-mix': { label: 'English Mix', badge: 'EN MIX' },
  es: { label: 'Español', badge: 'ES' }
};
```

ここで重要なのは、「記事ごとにlabelを書く必要をなくす」こと。

一方、version追加時に定数mapを1行追加する程度は許容する。

今回の目的は完全データ駆動フレームワークではなく、言語ごとの巨大コードコピーをなくすこと。

## 3-3. mix-index移行

現在 `data/mix-index.json` にある全entryを `versions-index.json` の `en-mix` へ移す。

例:

Before:

```json
{
  "version": 1,
  "mixes": {
    "a": "english-mix/a.md",
    "b": "english-mix/b.md"
  }
}
```

After:

```json
{
  "version": 1,
  "articles": {
    "a": {
      "en-mix": "english-mix/a.md"
    },
    "b": {
      "en-mix": "english-mix/b.md"
    }
  }
}
```

移行完了後、アプリ本体が `mix-index.json` を参照していないことを確認してから旧ファイルを削除する。

中途半端に両方を永続運用しない。

---

# 4. 派生版Markdown仕様

## 4-1. 共通原則

派生版Markdownは日本語正本と同じ記事IDを持つ。

例:

```yaml
---
id: decaf-coffee-how-caffeine-is-removed
title: "Cómo se elimina la cafeína del café descafeinado"
subtitle: "Cómo se retira la cafeína antes del tostado"
abstract: "..."
---
```

本文はfront matter後に通常のMarkdownとして記述する。

## 4-2. 派生版から上書きできるもの

Reader表示に限り、以下を派生版front matterから上書き可能とする。

- `title`
- `subtitle`
- `abstract`
- `body`

## 4-3. 日本語正本から必ず引き継ぐもの

以下は派生版から上書きしない。

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
- Library上の基礎情報

理由:

派生版は別記事ではなく、「同じ記事を別の読み方で表示するデータ」だから。

## 4-4. fallback

派生版Markdownに `title` / `subtitle` / `abstract` がない場合、日本語正本値へfallbackする。

疑似コード:

```js
function composeVersionEssay(original, variant) {
  return {
    ...original,
    title: variant.meta.title || original.title,
    subtitle: variant.meta.subtitle || original.subtitle,
    abstract: variant.meta.abstract || original.abstract,
    body: variant.body,
    __version: variant.key
  };
}
```

注意:

`...variant.meta` のような全面mergeは禁止。

これをすると `id` や `series` など管理metadataまで派生版に侵食されるため。

---

# 5. Reader切替実装詳細

## 5-1. ファイル方針

現状:

```text
english-mix.js
english-mix.css
```

変更後の推奨:

```text
reader-versions.js
reader-versions.css
```

ただし、リネームによる差分が大きくなりすぎる場合は、第一段階として `english-mix.js` 内部を共通化し、後からファイル名のみ変更してもよい。

最終状態ではファイル名と実態が一致していることが望ましい。

## 5-2. 共通状態

推奨state:

```js
const modeByEssay = new Map();
const versionCache = new Map();
let indexPromise = null;
let switchInFlight = false;
```

ただし `modeByEssay` は `versionByEssay` など実態に合う命名へ変更推奨。

例:

```js
const versionByEssay = new Map();
```

## 5-3. index loader

旧:

```js
mixIndex()
```

新:

```js
versionsIndex()
```

役割:

- `data/versions-index.json` を1回だけload
- 読み込み失敗時は空の `articles` として扱う
- 日本語Reader自体は壊さない

例:

```js
function versionsIndex() {
  if (!indexPromise) {
    indexPromise = fetch('data/versions-index.json', { cache: 'no-store' })
      .then(response => response.ok ? response.json() : { articles: {} })
      .catch(() => ({ articles: {} }));
  }
  return indexPromise;
}
```

## 5-4. 派生版loader

旧:

```js
mixBody(id)
```

新:

```js
versionData(id, versionKey)
```

返すもの:

```js
{
  key: 'es',
  meta: {...},
  body: '...'
}
```

cache keyは記事IDだけでは不足する。

必ず:

```text
<article-id>::<version-key>
```

のようにversionを含める。

例:

```js
const cacheKey = `${id}::${versionKey}`;
```

## 5-5. 派生Markdown parse

現行 `parseFrontMatter()` が利用できる場合は再利用する。

返却値:

```js
{
  meta,
  body
}
```

独自parserを重複実装しない。

ただし読み込みタイミング上 `parseFrontMatter` が使えない可能性があるなら、現行fallback実装を共通処理として残す。

## 5-6. 現在version判定

現状 `__languageMode` を利用している。

変更案:

```js
__readerVersion
```

値:

```text
ja
en-mix
es
```

日本語正本はpropertyなしでも `ja` と解釈可能。

既存の他ファイルが `__languageMode` を参照していないか、リポジトリ全検索してからrenameする。

参照がある場合は互換propertyを一時維持するか、同一commitで全参照を修正する。

## 5-7. switchVersion

旧:

```js
switchLanguage(mode)
```

新:

```js
switchVersion(versionKey)
```

処理順:

1. `switchInFlight` guard
2. 現在のarticle ID取得
3. 日本語正本取得
4. 現在位置capture
5. `ja` なら正本をそのまま使用
6. 派生版ならversionData取得
7. whitelist mergeで表示用essay生成
8. `showReader(nextEssay)`
9. 直前scroll位置を一時復元
10. semantic position restore
11. version state更新
12. custom event発火
13. switch UI同期

注意:

派生版取得に失敗した場合、現在表示中の記事を空にしない。

UI上でそのversionをdisableするか、日本語へ戻す。

## 5-8. 読書位置capture / restore

現行ロジックを極力そのまま利用する。

変更対象は名称と呼び出し元だけに留める。

特に以下を変更しない。

- `READING_LINE_RATIO`
- `READING_EDGE_TOLERANCE`
- section indexの考え方
- block ratioの考え方
- article progress fallback
- top / bottom handling

Spanishと日本語では段落長が大きく異なる可能性があるため、単純pixel比率への簡略化は禁止。

## 5-9. Reader switch UI

表示候補:

```text
表示
[日本語] [English Mix] [Español]
```

原則:

- 日本語は常に有効
- 派生版が存在するものだけ有効
- 未作成版をdisabledで見せるか非表示にするかは現UI密度を確認して決定
- 現在versionは `aria-pressed=true`
- groupには `aria-label="表示版"` などを設定

### 推奨

現状English Mixが未作成でも「未作成」を見せるUIがあるため、3版程度ならdisabled表示でもよい。

ただしスマホで横幅が厳しい場合、存在する版のみ表示する方を優先する。

実装後に320〜375px幅で確認して決定する。

## 5-10. custom event

現在の:

```text
myessays:reader-language-changed
```

は意味が狭くなる。

変更候補:

```text
myessays:reader-version-changed
```

ただし既存listenerがないか全検索してから変更する。

既存互換が必要なら同時に旧eventも短期発火してよいが、不要なら二重化しない。

---

# 6. Library実装詳細

## 6-1. ファイル方針

現状:

```text
library-mix.js
library-mix.css
```

推奨:

```text
library-versions.js
library-versions.css
```

Reader側と同様、リネーム差分が過剰になる場合は中身を先に一般化してもよい。

## 6-2. state

現状:

```js
state.mixIds
state.mixMap
```

変更案:

```js
state.versionMap
```

形:

```js
{
  'article-id': {
    'en-mix': 'english-mix/article-id.md',
    'es': 'spanish/article-id.md'
  }
}
```

helper:

```js
function hasVersion(essay, versionKey) {
  return Boolean(state.versionMap?.[essay.id]?.[versionKey]);
}
```

## 6-3. badges

記事ごとに存在する版だけ表示。

例:

```text
EN MIX  ES
```

日本語badgeは不要。

理由:

Library自体が日本語正本一覧なので、全記事にJAを出しても情報価値がない。

badge順は固定:

1. EN MIX
2. ES

## 6-4. filter

現在のEnglish Mix専用filterを最小限一般化する。

候補UI:

```text
読める版
- すべて
- English Mix
- Español
```

複数選択は不要。

「English Mixあり / なし」の `なし` 条件も削除候補。

理由:

Spanish追加後に「English Mixなし」「Spanishなし」など否定条件を増やすとUIが肥大化するため。

ただし既存利用上 `なし` が重要なら、変更前の挙動を確認して維持判断する。

## 6-5. Library検索

変更しない。

検索対象は引き続き日本語正本のtitle / subtitle / abstract / tags / keywords / bodyを中心とする。

Spanish本文をloadして検索indexに含めない。

理由:

- 初期load増加
- 派生版全fetchが必要になる
- Libraryの日本語中心思想がぼやける
- 今回の目的に不要

---

# 7. Españolサンプル記事

## 7-1. 1記事だけ作成

今回Spanish化する記事は1本。

選定基準:

- English Mix版も存在する
- Markdown構造が標準的
- 表・画像・複雑な特殊記法が過剰でない
- 適度な長さがあり読書位置切替テストに使える

候補として `decaf-coffee-how-caffeine-is-removed` は適している。

理由:

- 日本語版とEnglish Mix版が存在
- 技術的内容だが文脈が明確
- English Mix実ファイルを既に確認済み
- Spanish翻訳品質を判断しやすい

最終的な採用記事は実装時に日本語正本も確認して決定する。

## 7-2. ファイル名

```text
spanish/decaf-coffee-how-caffeine-is-removed.md
```

## 7-3. front matter

最低限:

```yaml
---
id: decaf-coffee-how-caffeine-is-removed
title: "..."
subtitle: "..."
abstract: "..."
---
```

不要なmetadataを日本語正本からコピーしない。

## 7-4. 翻訳ルール

- 原文の構成を維持
- H1 / H2 / H3階層を維持
- URL維持
- 画像path維持
- code block維持
- table構造維持
- 引用元維持
- 日本語固有の説明がSpanish読者に成立しない場合のみ最小限補足
- 勝手な事実追加をしない
- 単位や固有名詞を改変しない
- 地域差の強い俗語を避ける

---

# 8. 用語機能撤去 詳細

## 8-1. 削除候補ファイル

最低限:

```text
glossary-tools.js
glossary-tools.css
data/glossary.json
data/glossaries/
```

`data/glossaries/` は中身を確認して全削除。

## 8-2. index.html

削除:

```html
<link rel="stylesheet" href="glossary-tools.css?...">
<script src="glossary-tools.js?..." defer></script>
```

記事追加ガイドから以下を削除:

- `data/glossaries/記事ID.json`
- `label`
- `match`
- 用語補足作成手順

## 8-3. Reader Runtime

`reader-runtime.js` 本体にglossary専用処理があるか確認。

基本的にはplugin register先なので、glossary固有コードがなければ変更不要。

「glossaryを消すためにruntime自体を触る」ことは避ける。

## 8-4. CSS残存

リポジトリ全体で以下を検索。

```text
glossary-
glossary-is-open
#glossary
.glossary
```

`glossary-tools.css` 外に残っていれば削除可否を確認。

## 8-5. JS残存

全検索語:

```text
glossary
用語
READING GLOSSARY
用語メモ
```

ただし、過去記事本文の一般語として「用語」と書いてあるものは削除対象ではない。

UI機能・実装説明としての参照のみ対象。

## 8-6. tests

`tests/reader-architecture.test.js` を更新。

削除対象test:

- glossary load per article
- legacy fallback
- Node.js glossary data
- glossary priority

修正対象:

reader plugin一覧から `glossary-tools.js` を除外。

追加候補test:

```js
test('glossary plugin is no longer loaded', () => {
  const html = read('index.html');
  assert.doesNotMatch(html, /glossary-tools/);
});
```

さらに可能なら:

```js
test('repository guide no longer references glossary data', ...)
```

## 8-7. network確認

公開サイトで記事を開き、Network上に以下が出ないことを確認。

```text
glossary-tools.js
glossary-tools.css
data/glossary.json
data/glossaries/*.json
```

404になっていなくても、不要fetchが残っていたら撤去未完了。

---

# 9. index.html更新詳細

想定変更:

- glossary CSS削除
- glossary JS削除
- English Mix CSS/JSをversions名称へ変更した場合は参照変更
- Library Mix CSS/JSをversions名称へ変更した場合は参照変更
- 記事追加ガイド更新
- dialog note更新

記事追加ガイド案:

```text
1. essay-template.md を複製し、日本語版を作る
2. essays/ に保存
3. data/index.json に登録
4. English Mixを作る場合は english-mix/記事ID.md を作成
5. Españolを作る場合は spanish/記事ID.md を作成
6. 派生版は data/versions-index.json に登録
7. Seriesの場合は日本語正本front matterへ series / seriesOrderを設定
8. GitHubへ反映
```

用語説明は完全削除。

---

# 10. README更新詳細

READMEには実装内部の細部を書きすぎない。

追加すべきもの:

## できること

- 日本語 / English Mix / Españolの派生表示
- ただし記事ごとに存在する版のみ

## 論考データ

- 日本語正本は `essays/`
- 派生版は同じ記事ID
- English Mixは `english-mix/`
- Españolは `spanish/`

## 新しい論考を追加する

- 日本語版作成
- index登録
- optionalな派生版作成
- versions-index登録

READMEに書かないもの:

- 読書位置アルゴリズム詳細
- internal cache
- custom event一覧
- 実装関数名

これらは本実装計画に残す。

---

# 11. 既存ファイル別 変更予定一覧

## `data/mix-index.json`

- 全entryをmigration
- migration確認後に削除

## `data/versions-index.json`

- 新規作成
- 既存English Mix全entryを `en-mix` として登録
- Spanishサンプル1記事に `es` を追加

## `english-mix.js`

- English Mix専用loaderを複数version対応へ一般化
- 必要なら `reader-versions.js` へrename
- semantic scroll restoreは維持
- bodyのみでなく表示metadata whitelist上書き対応

## `english-mix.css`

- class名に `english-mix` が大量に含まれる場合、必要範囲のみ一般名称化
- UI見た目が変わらないことを優先
- 必要なら `reader-versions.css` へrename

## `library-mix.js`

- `mix-index` loaderをversions loaderへ変更
- EN MIX / ES badge対応
- filterを最小限一般化
- 必要なら `library-versions.js` へrename

## `library-mix.css`

- badgeが2つ並んでも崩れないよう調整
- 320〜375px幅確認
- 必要なら `library-versions.css` へrename

## `app.js`

原則変更最小。

確認ポイント:

- `showReader()` が派生metadataを正常表示できるか
- `state.currentEssay` が派生版表示時も同一IDを持つか
- route処理がversionに依存していないか
- Library検索を不用意に派生版対応へ変更しない

必要な変更がなければ触らない。

## `reader-runtime.js`

原則変更不要。

version切替後の再renderでpluginが期待通り再実行されるか確認のみ。

## `reading-state-ui.js`

原則変更不要。

article ID基準であることを維持。

確認:

- currentEssayが派生版でもid不変
- completed / opened / memo表示が共通
- localStorage key不変

## `reader-navigation.js`

原則変更不要。

派生版表示中でも前後記事リンクが日本語記事IDを基準に動くか確認。

## `series.js`

原則変更不要。

派生版metadataにseriesを持たせず、日本語正本から継承するため既存挙動維持を確認。

## `reader-reflections.js`

原則変更不要。

After Readingが記事ID基準で共有されることを確認。

## `index.html`

- glossary参照削除
- versions関連CSS/JS参照更新
- 投稿ガイド更新

## `README.md`

- 派生版投稿方法追加
- 用語説明があれば削除

## `tests/reader-architecture.test.js`

- glossary前提削除
- versions runtimeのロード順テスト追加候補

## 新規test候補

```text
tests/reader-versions.test.js
```

最低限、静的構造テストでも以下を確認する。

- versions-indexを参照している
- mix-indexを参照していない
- version cacheがarticle + versionで分かれる
- Spanish keyが認識される
- glossary参照がindex.htmlから消えている

---

# 12. migration手順

## Step 1. 現在のmainを基準として記録

- 現在commit SHAを控える
- `data/mix-index.json` 件数を記録
- English Mixファイル件数と照合

目的:

migration漏れを防ぐ。

## Step 2. versions-index生成

`mix-index.json` の全entryを機械的に変換。

検証:

```text
旧mix件数 === 新versions内 en-mix件数
```

一致しなければ次へ進まない。

## Step 3. Readerを新index対応

この時点ではSpanishをまだ追加しなくてもよい。

まず全既存English Mixが新indexで読める状態にする。

## Step 4. Libraryを新index対応

既存EN MIX badge / filterが維持されることを確認。

## Step 5. 旧mix-index参照ゼロ確認

repo全検索:

```text
mix-index.json
```

READMEなど歴史説明以外で0件にする。

## Step 6. mix-index削除

ここで初めて削除。

## Step 7. Spanishサンプル追加

- `spanish/` 作成
- 1記事追加
- versions-indexへ `es` 登録

## Step 8. glossary撤去

versions migrationとglossary削除を同時にやると切り分けが難しいため、可能なら段階的commitに分ける。

---

# 13. 推奨commit分割

可能なら以下のように分ける。

## Commit 1

```text
refactor: generalize English Mix index for reader versions
```

内容:

- versions-index作成
- Reader共通化
- Library共通化
- 既存EN Mix移行
- tests更新

この段階では見た目上ほぼ何も変わらないことが理想。

## Commit 2

```text
feat: add Spanish essay variant support
```

内容:

- Españolボタン
- Spanish sample
- ES badge
- metadata上書き

## Commit 3

```text
refactor: remove glossary feature
```

内容:

- glossary JS/CSS/data削除
- index修正
- guide修正
- tests修正

## Commit 4

```text
docs: update essay publishing guide for variants
```

内容:

- README
- 細かな説明整理

一括commitでも実装可能だが、問題切り分けのため分割推奨。

---

# 14. テスト計画

## 14-1. 自動テスト

既存Node testsをすべて実行。

期待:

```text
0 failed
```

新規versions testsも追加する。

## 14-2. migration integrity

確認項目:

- 旧mix-index件数
- 新versions-indexのen-mix件数
- English Mixファイル件数

少なくとも旧indexのentryが全て新indexに存在すること。

### 追加の機械検証

件数一致だけでは、同じ件数で別keyが欠ける可能性がある。

そのため以下も確認する。

```text
oldMixIds - newEnMixIds = 0件
newEnMixIds - oldMixIds = 0件
```

さらに各IDについてpath一致を確認する。

疑似チェック:

```js
for (const [id, oldPath] of Object.entries(oldIndex.mixes)) {
  assert.equal(newIndex.articles[id]?.['en-mix'], oldPath);
}
```

## 14-3. JAのみ記事

手順:

1. SpanishもEnglish Mixもない記事を開く
2. Reader switch確認
3. 本文確認
4. メモ入力
5. 読了toggle

期待:

- 日本語本文正常
- 不要versionを押せない
- console errorなし
- 404なし
- 読了 / メモ正常

## 14-4. JA + EN MIX

手順:

1. English Mixあり / Spanishなし記事を開く
2. 中盤までscroll
3. EN MIXへ切替
4. JAへ戻す

期待:

- EN MIX正常表示
- Spanish未作成扱い
- 切替前後で大きく位置が飛ばない
- title挙動が従来から意図せず変わらない
- 読了状態不変

## 14-5. JA + ES

Spanish sampleでEnglish Mixを一時的に無効化して作る必要はない。

もし両方ある記事しかsampleにしない場合は、fixtureまたはindex編集で検証してもよい。

期待:

- Spanish本文正常
- Spanish title / subtitle正常
- 日本語へ戻せる

## 14-6. JA + EN MIX + ES

サンプル記事で検証。

手順:

```text
JA → EN MIX → ES → JA
```

各切替前に異なる位置へscrollして確認。

期待:

- 本文が正しい版へ変わる
- ボタンactive状態正しい
- scroll位置が大きく破綻しない
- reader pluginが重複mountしない
- DOMが増殖しない

## 14-7. 読了状態共有

1. JAで読了
2. EN MIXへ切替
3. ESへ切替

期待:

全て読了扱い。

localStorageにversion別keyが生成されていないことも確認。

## 14-8. メモ共有

1. JAでメモ作成
2. ESへ切替
3. メモtabを開く

期待:

同じメモが表示。

## 14-9. After Reading共有

1. JAでAfter Reading記入
2. EN MIX / ESへ切替

期待:

同一記事の記録として表示。

## 14-10. Series

Series所属記事でEN Mixへ切替。

期待:

- Series名不変
- 前後移動正常
- Series Library正常

Spanish sampleがSeries記事でなくても、EN Mixで回帰確認する。

## 14-11. Library badges

記事パターンごとに確認:

```text
JAのみ                → badgeなし
JA + EN MIX           → EN MIX
JA + ES               → ES
JA + EN MIX + ES      → EN MIX / ES
```

## 14-12. Filter

- すべて
- English Mix
- Español

それぞれ正しい記事数になること。

filter解除で元件数に戻る。

## 14-13. Random / 未読了

version変更によって候補母集団が変わらないこと。

Libraryは日本語記事単位なので、派生版が増えても記事数自体は増えない。

## 14-14. 404確認

Networkで最低限確認:

- `versions-index.json` 200
- 選択した派生版Markdown 200
- 存在しないSpanishを毎回fetchしていない
- `mix-index.json` をfetchしていない
- glossary関連fetchなし

## 14-15. console確認

確認対象:

- 初回Library表示
- 日本語記事open
- EN Mix切替
- ES切替
- Library戻る
- Series移動
- filter操作

期待:

新規error 0。

warnも今回変更由来なら解消する。

## 14-16. PC viewport

最低:

```text
1440x900
1280x720
```

確認:

- switch位置
- note tabとの干渉
- reader asideとの干渉

## 14-17. Mobile viewport

最低:

```text
390x844
375x812
360x800
320x568
```

確認:

- 3version buttonが折り返しても崩れない
- note tabと重ならない
- horizontal overflowなし
- switchが本文を覆わない
- filter selectが見切れない

## 14-18. 高速連続操作

以下を10回程度繰り返す。

```text
JA → EN MIX → ES → JA
```

途中でLibraryへ戻り、別記事を開いて再度切替。

期待:

- switchが反応しなくならない
- `switchInFlight` が残留しない
- 同じversionのfetchが不必要に増えない
- Reader末尾UIが多重生成されない
- event listenerの多重反応が見られない

## 14-19. 直接URL / reload

各記事URLを直接開く、またはReader表示中にreloadする。

期待:

- 日本語正本で正常に復元される
- hash routingが壊れない
- version systemのindex load失敗があってもLibrary / JA本文は利用できる

なお、今回version自体をURLへ永続化する仕様は追加しない。

---

# 15. 受け入れ条件（Definition of Done）

以下すべて満たして完了。

## Data

- [ ] `versions-index.json` が存在
- [ ] 旧English Mix全entryが移行済み
- [ ] 旧indexとの件数一致確認済み
- [ ] ID集合差分0件確認済み
- [ ] 旧/newでEN Mix path一致確認済み
- [ ] Spanish sample 1記事登録済み
- [ ] `mix-index.json` 不要なら削除済み

## Reader

- [ ] JA表示正常
- [ ] EN MIX表示正常
- [ ] ES表示正常
- [ ] version切替共通処理化
- [ ] Spanish専用JSなし
- [ ] semantic scroll restore維持
- [ ] title / subtitle / abstract fallback正常
- [ ] 派生metadata全面mergeなし

## State

- [ ] 読了共有
- [ ] メモ共有
- [ ] After Reading共有
- [ ] Series共有
- [ ] localStorage key変更なし
- [ ] version別state keyなし

## Library

- [ ] EN MIX badge正常
- [ ] ES badge正常
- [ ] filter正常
- [ ] 検索回帰なし
- [ ] Random回帰なし
- [ ] 未読了機能回帰なし

## Glossary removal

- [ ] glossary JS削除
- [ ] glossary CSS削除
- [ ] glossary JSON削除
- [ ] index参照削除
- [ ] 投稿ガイド参照削除
- [ ] tests参照削除
- [ ] network request 0
- [ ] glossary DOM 0

## Tests

- [ ] Node tests 0 failure
- [ ] versions用test追加
- [ ] migration integrity test実施
- [ ] 高速連続切替確認
- [ ] direct URL / reload確認
- [ ] PC確認
- [ ] mobile確認
- [ ] console error 0
- [ ] 404 0

## Docs

- [ ] README更新
- [ ] 投稿ガイド更新
- [ ] Spanish追加手順が明記

---

# 16. 却下条件

以下のどれかに該当する場合、実装を見直す。

- `spanish.js` を作りEnglish Mixロジックをコピーしている
- `library-spanish.js` を作っている
- Spanish版を `data/index.json` に別記事登録している
- Spanish版に別article IDを振っている
- `myessays:reading-state:<id>:es` のようなversion別状態を作っている
- 派生版front matterを全面mergeしている
- Spanish本文をLibrary初期load時に全件fetchしている
- Library検索を今回の必要性なく多言語化している
- 全既存記事をSpanish化している
- `type: translation` 等、未使用抽象概念を増やしている
- glossary UIだけ隠してJS/Dataを残している
- glossaryを前提にしたtestsが残っている
- `mix-index.json` と `versions-index.json` を理由なく恒久併存させている
- 今回と無関係なreader pluginをリファクタしている
- localStorage keyを変更して過去状態を失わせている
- スマホでswitchとnote UIが重なる
- 既存EN Mix数がmigration後に減っている

---

# 17. リスクと対策

## Risk A: English Mix大量migration漏れ

対策:

- entry件数比較
- ID集合差分比較
- path一致比較
- scriptで機械変換推奨
- 手作業コピーを避ける

## Risk B: 派生metadataで記事管理情報が壊れる

対策:

- whitelist merge
- id / series / favorite等は正本固定

## Risk C: version切替でreader pluginが二重mount

対策:

- 現在のshowReader lifecycleを維持
- DOM増殖確認
- switch連打テスト

## Risk D: Spanishで文章量が変わりscroll復元が悪化

対策:

- 現semantic restore維持
- H2構造をSpanishでも原文と揃える
- paragraph構造を過剰に組み替えない

## Risk E: glossary削除でruntime testが壊れる

対策:

- 実装削除とtest修正を同じcommitで行う
- runtime本体は不用意に触らない

## Risk F: UIがスマホで窮屈

対策:

- 320px幅まで確認
- 必要なら未作成版非表示
- badge文字列を短く維持

## Risk G: GitHub Pages cacheで旧JSが混在

対策:

- index.htmlのcache bust query更新
- deploy後hard reload確認
- network上の実ファイル名確認

## Risk H: version cacheの取り違え

対策:

- cache keyにarticle IDとversion keyの両方を含める
- EN Mix読み込み後にESへ切替し、本文混同がないことを確認

## Risk I: index読込失敗でReader全体が壊れる

対策:

- versions-index取得失敗は「派生版なし」として扱う
- 日本語正本の表示は常に独立して成立させる

---

# 18. ロールバック条件

以下が解消できない場合、Spanish追加を一旦rollbackし、まずEN Mix共通化だけを安定させる。

- 既存EN Mixの一部が開けない
- 読書位置復元が大幅に悪化
- 読了 / メモが失われる
- Seriesが壊れる
- mobileでReader操作不能
- Node testsが継続して失敗

rollback優先順位:

1. Spanish sample / ES UIを外す
2. versions構造でEN Mixのみ維持できるか確認
3. 必要なら `mix-index.json` を復元
4. 最後にReader共通化自体を戻す

既存ユーザーデータを壊す変更を無理に前進させない。

---

# 19. 実装後の新規記事追加手順

## 日本語だけ

1. `essay-template.md` から日本語記事作成
2. `essays/...md` に保存
3. `data/index.json` に登録

## English Mixも作る

1. 日本語記事追加
2. `english-mix/<article-id>.md` 作成
3. `data/versions-index.json` の該当articleへ追加

```json
"article-id": {
  "en-mix": "english-mix/article-id.md"
}
```

## Españolも作る

```text
spanish/<article-id>.md
```

を作り、同じ記事IDへ追加。

```json
"article-id": {
  "en-mix": "english-mix/article-id.md",
  "es": "spanish/article-id.md"
}
```

日本語記事を `data/index.json` に再登録したり、Spanishを別記事として追加したりしない。

---

# 20. 将来4つ目を追加するときの基準

将来別版を追加したくなった場合、今回の仕組みで以下程度なら許容。

例:

```json
"article-id": {
  "en-mix": "english-mix/article-id.md",
  "es": "spanish/article-id.md",
  "pt": "portuguese/article-id.md"
}
```

加えてversion definitionへlabel / badgeを1件追加。

この程度で済むなら今回の設計は成功。

逆に新言語ごとに、

- 専用loader
- 専用Reader
- 専用Library JS
- 専用状態管理

が必要なら今回の一般化は失敗とみなす。

---

# 21. 実装担当者向け 最終チェック順

実装前:

- [ ] main最新確認
- [ ] 現行tests実行
- [ ] mix-index件数記録
- [ ] mix-index ID一覧記録
- [ ] glossary参照全検索
- [ ] `__languageMode` 参照全検索
- [ ] `reader-language-changed` 参照全検索

実装中:

- [ ] versions-index生成
- [ ] EN Mixのみで新構造確認
- [ ] Library EN Mix回帰確認
- [ ] Spanish追加
- [ ] metadata切替確認
- [ ] glossary削除
- [ ] docs更新

実装後:

- [ ] tests 0 failure
- [ ] EN Mix件数一致
- [ ] EN Mix ID差分0
- [ ] EN Mix path差分0
- [ ] JA → EN → ES → JA
- [ ] 連続切替10回
- [ ] 読了共有
- [ ] メモ共有
- [ ] Series確認
- [ ] reload確認
- [ ] PC確認
- [ ] 320px確認
- [ ] Network 404確認
- [ ] console確認
- [ ] glossary network request 0
- [ ] repo内 `mix-index.json` 旧参照確認
- [ ] repo内 `glossary-tools` 参照0確認

---

# 22. 最終報告フォーマット

実装完了時は以下だけを簡潔に報告する。

```text
【変更概要】

【変更したファイル】

【削除したファイル】

【派生版の管理方法】

【今回Spanish化した記事】

【今後Spanish版を追加する手順】

【migration確認】
旧EN Mix件数:
新EN Mix件数:
ID差分:
Path差分:

【テスト変更内容】

【テスト結果】
自動テスト:
連続切替:
PC:
Mobile:
Console:
404:

【残課題】
```

---

# 23. 実装判断の優先順位

迷った場合は以下の順で判断する。

1. 既存データを壊さない
2. 既存English Mixを壊さない
3. 記事ID単位の状態共有を維持する
4. Españolを正常に読める
5. 用語機能を完全に消す
6. 投稿手順を簡単に保つ
7. コード重複を減らす
8. 将来拡張を少しだけ容易にする
9. コードの美しさ

「きれいな全面再設計」と「現在の動作を壊さない小さな変更」が競合する場合、後者を選ぶ。
