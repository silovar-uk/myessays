# My Essays 保全型内部監査

> Status: completed
> Audit date: 2026-08-29
> Pre-audit code baseline: `b2381a5598b658415c65ce188688c13fc7018f2a`
> Final audited runtime commit: `f6dc8de5f42c8d46b5ead4bf9e22ca72ed052076`

機能・UI・URL・保存データ仕様・記事の思想を変えず、My Essaysの内部実装、データ整合性、キャッシュ、セキュリティ境界、CI、旧実装残骸を点検した記録です。

監査中に別作業で追加された論考・English Mix等のコンテンツ変更は監査対象外とし、その内容には手を加えていません。

## 1. 固定した契約

今回、以下は変更しないものとして固定した。

- HTML + CSS + Vanilla JavaScript + Markdown + GitHub Pages を維持する。
- 日本語Markdownを記事の正本とする。
- English Mix / Español は同一記事IDの派生版とする。
- URL / hash route / article id を変更しない。
- localStorage / sessionStorage の既存キーを変更しない。
- Library / Reader / 検索 / フィルター / ランダム / 未読了ランダム / Series / 読了 / 読書位置 / After Reading / メモ / 選択引用 / 言語切替 / Page Reader の挙動を変更しない。
- UIデザイン・文言・操作手順を意図的に変更しない。
- フレームワーク・ビルドシステムを追加しない。

## 2. 監査結果サマリー

### P0

該当なし。

データ破損、サイト停止につながる重大障害は確認されなかった。

### P1 — 修正済み

#### P1-1 Reader目次の二次HTML解釈

Reader本文はMarkdown描画後にsanitizeされている一方、目次生成時に`h.textContent`を再度`innerHTML`へ埋め込んでいた。

通常記事では問題化していなかったが、HTMLとしてエスケープされた文字列を見出しに含む場合、目次生成時に再解釈される余地があった。

対応:

- 目次リンクのheading textを既存`escapeHtml()`でescapeしてから挿入。
- heading idも同様にescape。
- 通常記事の表示・目次文言・操作は変更なし。
- 実ブラウザQAへ攻撃文字列を使う回帰テストを追加。

回帰テストでは、`<img onerror=...>`相当の文字列が目次内でHTML elementにならず、JavaScriptも実行されないことを確認している。

#### P1-2 更新済みReader scriptのcache key不整合

過去に更新された以下のscriptに対し、`index.html`側のquery-string cache keyが古いまま残っていた。

- `reader-navigation.js`
- `reading-locators.js`

特に旧`reading-locators.js`をブラウザcacheから読み続けた場合、削除済みの`data/mix-index.json`へアクセスする旧挙動が残る可能性があった。

対応:

- 上記2scriptのcache keyを2026-08-29の値へ更新。
- 今回変更した`app.js`もcache keyを更新。
- 対象cache keyが古い値へ戻らない静的テストを追加。

### P2 — 修正済み

#### P2-1 日本語正本側のデータ整合性検査が弱い

派生版には整合性テストが存在したが、日本語正本については以下を一括検査する契約が不足していた。

対応として`tests/data-integrity.test.js`を追加した。

現在CIで以下を検査する。

- `data/index.json`にduplicate pathがない。
- indexに登録された日本語Markdownが存在する。
- canonical pathが`essays/`配下である。
- canonical article idがunique。
- canonical articleに最低限`id` / `title` / `created`がある。
- `created`が`YYYY-MM-DD`形式。
- `versions-index`のarticle idが必ずcanonical articleに存在する。
- 派生版front matterのidがcanonical idと一致する。
- `english-mix/` / `spanish/`内の派生Markdownと`versions-index`が完全一致する。
- 派生版が`data/index.json`へ混入していない。

#### P2-2 旧読書状態実装がルートに残存

以下の3ファイルは現行`index.html`から読み込まれておらず、現在の`reading-state-ui.js`と責務が重複していた。

- `reading-status.js`
- `reading-memo-sync.js`
- `library-memo-render.js`

静的参照、現行HTML、責務を確認したうえで削除した。

なお`reading-status.css`は現行UIから使用されているため削除していない。

再混入を検出するテストも追加した。

#### P2-3 CIのPlaywrightが`latest`依存

CI実行のたびにPlaywrightの解決versionが変わるため、アプリ変更なしにbrowser QA環境だけ変化する可能性があった。

監査時にCIで使用されていたversionを確認し、`playwright@1.62.1`へ固定した。

Browser versionは従来と同じChromium 151系でテスト成功を確認した。

#### P2-4 CI pathsのQA script列挙

Workflow triggerが個別QA script名を列挙していたため、新しいscriptを追加した際にWorkflow triggerへの追記を忘れる余地があった。

`'scripts/**'`へ変更し、QA script変更全体を監視対象にした。

#### P2-5 GitHub Actions runtimeの非推奨警告

監査途中のCIで、以下のv4 ActionsがNode 20を対象としており、runner側でNode 24へ強制移行されている警告を確認した。

- `actions/checkout@v4`
- `actions/setup-node@v4`
- `actions/upload-artifact@v4`

GitHub公式の現行releaseを確認し、入力仕様を変えずに以下へ更新した。

- `actions/checkout@v7`
- `actions/setup-node@v7`
- `actions/upload-artifact@v7`

更新後のCIは全成功し、Node 20 deprecation warningも解消した。

#### P2-6 local runtime assetの参照整合性

`index.html`がローカルJS/CSS/imageを参照していても、対象ファイル削除時に静的テストで即検出する仕組みが弱かった。

`tests/runtime-assets.test.js`を追加し、`index.html`が参照するローカルruntime assetの存在をCIで確認するようにした。

## 3. 意図的に変更しなかったもの

### app.jsの責務分割

`app.js`はLibrary、route、Reader、memo等の複数責務を持つ。

分割余地はあるが、現在正常に動いており、今回の目的に対して大規模分割の回帰リスクが高い。

**判定: P2残存 / 今回は変更しない。**

### library-versions.jsのglobal function wrapper

`filteredEssays`やcard renderer等をwrapperする方式は結合度が高いが、現行機能は安定している。

共通stateやplugin APIへ再設計するには変更範囲が大きいため今回は触らない。

**判定: P2残存 / 将来Library architectureを触るときだけ再検討。**

### VERSION_DEFINITIONSの重複

ReaderとLibraryに版定義が存在する。

共有config化は可能だが、そのためだけにscript load dependencyを増やすメリットは小さい。

**判定: P3寄り / 変更しない。**

### series-legacy.json

migration layerとして現在のSeries処理に残っている。

完全移行を証明せずに削除する方が危険なため維持する。

### Markdown fallback renderer

`app.js`側の簡易rendererと`markdown-engine.js`が共存しているが、前者は外部Markdown engineが利用できない場合のfallbackとして意味がある。

見た目上の重複だけを理由に削除しない。

### MutationObserver / CustomEventの全面整理

一部にObserver・event連携が残るが、今回のBrowser QAで明確なperformance問題は確認されなかった。

中央runtimeへ寄せること自体を目的にしたrewriteは行わない。

### cache-busterの全面自動化

現在はquery-stringを手動更新している。

完全自動化にはbuild step等の導入が必要になり、現在の「そのままGitHub Pagesへ配信できる」思想を崩す。

今回は実際に不整合があったscriptだけ修正し、静的guardを追加した。

### CDN Subresource Integrity

Marked / DOMPurifyはversion固定されているがSRIは未使用。

SRI導入は別途hash管理・CDN運用まで含めて検討すべきため、今回の保全型監査では変更しない。

### main branch protection

mainは現在unprotectedだが、branch protectionは開発・投稿フローそのものを変える。

サイト内部品質監査の範囲外として変更しない。

## 4. 削除した不要物

- `reading-status.js`
- `reading-memo-sync.js`
- `library-memo-render.js`

削除理由:

- 現行HTMLから未ロード。
- 現行runtimeから参照なし。
- `reading-state-ui.js`と責務が重複。
- 将来「どちらが現行実装か」を誤認するリスクがある。

## 5. 追加・強化したテスト

### `tests/data-integrity.test.js`

canonical / derived article dataの整合性を継続監視する。

### `tests/runtime-assets.test.js`

- local runtime assetの404予防
- 旧読書状態scriptの再混入防止
- 修正済みscriptのcache key退行防止

### `scripts/reading-versions-qa.cjs`

既存の言語切替QAに加え、Reader目次へescaped markupを流し、HTMLとして再解釈・実行されないことを実ブラウザで確認する。

## 6. 最終テスト結果

最終runtime commit:

`f6dc8de5f42c8d46b5ead4bf9e22ca72ed052076`

GitHub Actions Visual QA:

- Static tests: **38 / 38 passed**
- Fail: **0**
- Reading Versions browser QA: **passed**
- JA → EN Mix → ES → JA: **passed**
- Reading position / shared article state: **passed**
- Reader TOC injection regression: **passed**
- Page Reader browser QA: **passed**
- Desktop Visual QA: **passed**
- Mobile Visual QA: **passed**
- Horizontal overflow: **none detected**
- Console errors: **0**
- Page errors: **0**
- GitHub Actions v7 runtime: **passed**
- Previous Node 20 deprecation warning: **resolved**

## 7. 最終チェックリスト

- [x] 最新main / audit baselineを記録
- [x] CI baselineを確認
- [x] `data/index.json` と日本語記事の整合性をCI化
- [x] `data/versions-index.json` と派生版の整合性をCI化
- [x] duplicate article id検査
- [x] orphan derived file検査
- [x] Reader lifecycle / CustomEvent依存を確認
- [x] MutationObserver / scroll / resizeを確認し、無根拠なrewriteを回避
- [x] fetch / cache方針を確認
- [x] localStorage / sessionStorage keyを変更していない
- [x] Markdown parser / sanitizer境界を確認
- [x] Reader TOCの二次HTML解釈を修正
- [x] 未使用・旧仕様scriptを参照確認後に削除
- [x] CSS / JS load順を確認
- [x] stale cache keyを修正
- [x] CI dependency reproducibilityを改善
- [x] GitHub Actions runtime警告を解消
- [x] README / guideの現行仕様との大きな不整合なし
- [x] 全回帰テスト成功

## 8. 残存リスク

今後触る際に特に注意する箇所:

1. `app.js`と各pluginのglobal state / global function依存。
2. `library-versions.js`のwrapper方式。
3. manual cache-buster更新。
4. `series-legacy.json` migration layer。
5. CDN dependencyのSRI未導入。
6. malformedなhash routeなど、通常操作外入力のrobustness。

これらは「存在するから直す」のではなく、次回その周辺を変更する際に改めて必要性を評価する。

## 9. 結論

今回の監査では、ユーザー向け機能を追加・削除せず、UI・URL・Storage・記事仕様を維持した。

改善したのは主に以下。

- 潜在的なReader目次のHTML再解釈を防止。
- 古いcacheを掴み続ける可能性を低減。
- canonical / derived記事データを継続検査。
- 旧実装残骸を削除。
- runtime asset参照を継続検査。
- Browser QAのdependencyを固定。
- GitHub Actions runtimeを現行世代へ更新。

理想状態である、

> 利用者から見るとほぼ何も変わっていないが、次に触るときは以前より事故りにくい。

という状態を優先して完了とする。
