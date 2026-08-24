# Page Reader Bookmarklet

長いBookmarklet本体を、短いLoaderと外部JavaScriptへ分離した構成です。

## 構成

```text
Bookmarklet
  ↓
tools/page-reader-loader.txt（起動処理のみ）
  ↓
tools/page-reader.js（Reader本体）
  ↓
現在のページ上にReader UIを表示
```

## 配信URL

`https://silovar-uk.github.io/myessays/tools/page-reader.js`

LoaderはこのURL以外を実行しません。10分単位のクエリを付け、同じ10分間はキャッシュを使いながら、本体更新後はBookmarkletを再登録せず最新版へ切り替わる設計です。

## 導入方法

### PC Chrome

1. `tools/page-reader-loader.txt`を開き、1行すべてをコピーする。
2. Chromeで任意のページをブックマークする。
3. ブックマークを編集し、名前を「Page Reader」にする。
4. URL欄をコピーした`javascript:`から始まる1行へ置き換える。
5. 読みたいページで「Page Reader」を押す。

### iPhone Safari

1. `tools/page-reader-loader.txt`を開き、1行すべてをコピーする。
2. Safariで任意のページをブックマークへ追加する。
3. ブックマーク一覧で「編集」を押し、名前を「Page Reader」にする。
4. アドレス欄をコピーした`javascript:`から始まる1行へ置き換える。
5. 読みたいページをSafariで開き、ブックマークから「Page Reader」を選ぶ。

## 更新方法

通常の機能追加・修正は`tools/page-reader.js`だけを更新します。Loaderの配信URLや起動方式を変えない限り、Bookmarkletの再登録は不要です。

GitHub Pagesへの反映には数分かかる場合があります。Loaderは10分単位でキャッシュを更新するため、公開直後に旧版が出る場合は10分後に再実行してください。

## 維持している機能

- 本文優先 / ページ全文
- 自動スクロールと遅延読み込みへの対応
- 停止 / 再抽出 / コピー / 全選択
- Clipboard API失敗時の互換コピーと手動コピー
- 元のスクロール位置への復帰
- 無限スクロールの上限
- Shadow DOMによるReader UIの隔離
- 同じページで再起動した際の旧インスタンス停止

## 制約

- 対象サイトのContent Security Policyが外部scriptを拒否する場合、本体を読み込めません。
- `chrome://`、Safariの内部ページなど、Bookmarklet自体を実行できないページでは使えません。
- GitHubやChatGPTなどCSPが強いサイトでは、Loaderが「読み込み失敗」と通知する場合があります。
- サイト独自の仮想スクロールや閉じたShadow DOM内の本文は、すべて取得できない場合があります。

## プライバシーとセキュリティ

- 読み込み先は上記の固定URLのみ。
- script取得時は`no-referrer`を指定。
- ページ本文、URL、Cookieを配信元へ送信しない。
- `localStorage`、Analytics、外部ライブラリを使用しない。
- Reader本体はページ内で抽出と表示を完結する。

## 技術資料

- [javascript: URLの仕様と注意点（MDN）](https://developer.mozilla.org/en-US/docs/Web/URI/Reference/Schemes/javascript)
- [CSPのscript-src制約（MDN）](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/script-src)
- [GitHub PagesはHTML・CSS・JavaScriptを配信する静的ホスティング（GitHub Docs）](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages)
