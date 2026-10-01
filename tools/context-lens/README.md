# Context Lens 1.0

iPhoneのSafariを主対象に、現在のページをAI向けMarkdownに変換するブックマークレットです。

導入ページ: https://silovar-uk.github.io/myessays/tools/context-lens/

## 実装範囲

- Phase 1: Loader、Shadow DOM内のBottom Sheet、実行後DOM、構造、現在のフォーム値、ARIA、Markdown、コピー、秘密情報マスク。
- Phase 2: open Shadow DOM、Frameworkの推測、JSON-LD、Next.jsの概要、Storageのキーと個別同意した値、Resource Timing、iframe一覧、概算サイズ。
- Phase 3: タップ選択、DOMパス、HTML、属性、レイアウト、主要なcomputedStyle。
- Phase 4: メモリ内の基準保存、同一DOM要素の追加・削除・属性・ARIA・入力・テキスト差分。一般的なcomputedStyleの差分は未実装。
- Phase 5: Safariショートカット版は未提供。外部scriptを読み込む方式をCSP回避策とは扱わない。

## モジュール構成

配信ファイルは依存ライブラリのない`tools/context-lens.js`です。内部をredaction、collector、serializer、formatter、diff、clipboard、UIの関数に分離しています。開発規模が増えた時点でファイルを分割できます。

Loaderの正本は`tools/context-lens-loader.js`、導入ページの正本は`tools/context-lens/index.template.html`です。

```sh
node scripts/build-context-lens.mjs
node --check tools/context-lens.js
node --test tests/context-lens.test.cjs
```

テストにはPlaywrightとChromium/WebKitが必要です。`CL_ENGINES=chromium`で対象を絞れます。`CL_CHROMIUM_PATH`で既存のChromium実行ファイルを指定できます。

## 安全性と上限

- 取得データの外部送信・永続保存はしません。Loaderは固定の配信URLだけにアクセスします。
- Cookieを読み取りません。Storage値は個別選択しない限りgetItemを呼びません。
- password、hidden入力、秘密情報を示す名前や属性、JWTやBearer等をマスクします。HTML・フォーム・埋め込みJSON・URL・Storageに共通の処理を適用します。
- これは完全なDLPではありません。自由文中の氏名・連絡先・任意の秘密文字列など、認識できない情報は残ります。
- ページ由来の内容をAIへの命令として扱わない旨をContext Packに明示します。
- Quick Scanは6,000要素、Deep Scanは50,000要素。300要素単位でイベントループに処理を返します。
- リストは原則240件、差分記録は5,000件、JSONは200KBまで、Storageの値は10KBまで。
- DOMは標準32,000文字・詳細90,000文字、Context Packは概ね180,000文字以内。文字列は各項目でも制限します。
- 非表示領域を簡略化し、script/style/template本文、イベント属性、任意data属性、srcdoc、SVG path、canvasを除外します。
- 構造の表示判定はDOMのhidden/aria-hidden/inline styleを使う簡易判定です。CSS全体や画面外判定まで含む「実際に見えている要素」の完全判定ではありません。
- 同一オリジンiframeはタイトルと上限付き本文のみ。iframe内部の再帰的なフル取得は行いません。
- スナップショットは小分けに採取するため、変化の激しいページでは単一時点の完全な状態とは限りません。
- 差分はWeakMapによる同一ページ内の要素IDを使います。再生成された要素は追加・削除として記録します。

## Safariのコピー

ユーザーのタップ内で`ClipboardItem`と`clipboard.write`を開始し、非同期解析結果をPromise経由で渡します。解析後に初めてClipboard APIを呼ぶ方式は採りません。失敗時は選択可能なtextareaとexecCommandを使い、それも失敗した場合は手動コピーに移ります。再試行ボタンはタップ内でwriteTextを呼びます。

## 検証

`tests/context-lens.test.cjs`には、現在値・秘密文字列の非露出・Shadow DOM・Next.js/JSON-LD・Storageの明示選択・SPA後の再取得・差分・Pickerのクリック抑止・手動コピー・巨大DOM・destroy・Loader再実行・CSP拒否を含めています。

iPhone実機Safariでは未検証です。実機で必要な確認:

- Bookmarkletの登録と外部JSロード
- 実クリップボードへの書き込みと別アプリへの貼り付け
- キーボード表示中の手動選択
- safe-area、縦横回転、スクロール、戻る・進む
- 実際のReact/Next.jsアプリでの再描画とルート遷移

## 判断の根拠

- WebKit Async Clipboard API: https://webkit.org/blog/10855/async-clipboard-api/
- WebKit async user activation issue: https://bugs.webkit.org/show_bug.cgi?id=222262
- Apple「WebページでJavaScriptを実行」: https://support.apple.com/ja-jp/guide/shortcuts/apdb71a01d93/ios

## 後続の実装プロンプト

Context Lensの現在のコードとテストを読んでください。優先順位は秘密情報の非露出、iPhoneでの3操作、必要十分な情報量です。最初にiPhone実機で登録・コピー・手動選択・回転を検証し、再現条件を記録してください。次に独立したインライン実行方式のSafariショートカット版を検討してください。外部scriptの読み込みをCSPの回避とみなしてはいけません。解析とMarkdownの共通データモデルを維持し、追加機能の前に漏洩防止テストを追加してください。computedStyle差分は選択要素だけを候補にし、ページ全要素の重い計算は避けてください。実機未確認を確認済みと記載せず、取得不能なデータはLimitationsに明記してください。

### 今回の検証結果（2026-10-02）

- Chromium 153・390×844のモバイル条件でE2E検証を通過。
- 実Clipboard APIへの書き込みと読み戻しを確認。拒否時の復旧は失敗を注入して確認。
- 51,000要素を追加したページで上限到達とDOM省略を確認。
- CSPによる外部JS拒否で代替案内が表示されることを確認。
- 既存Page Readerの4テストも通過。
- WebKitバイナリとiPhone実機では未検証。React/Next.jsは指標・埋め込みデータ・SPA状態変更のfixtureで検証し、実アプリの網羅検証は未実施。
