---
id: npm-audit-csp-security-layers-before-refactor
title: "「high severity 3件」なのに、CSPは強い。結局どっちなん？"
subtitle: "npm audit、CSP、no-store、Phase 0を「家の安全」でほどく"
created: "2026-09-17"
updated: "2026-09-17"
type: "Essay"
status: "完成"
tags: ["セキュリティ", "npm", "CSP", "CI", "リファクタリング", "Web開発"]
keywords: ["npm audit", "npm ci", "high severity", "Content Security Policy", "default-src none", "script-src self", "Cache-Control no-store", "dependency vulnerability", "Phase 0"]
grow: 5
abstract: "CIログに「3 high severity vulnerabilities」と出ているのに、同じアプリのCSPは強いと言われる。これは矛盾ではない。npm auditは依存関係の既知脆弱性、CSPはブラウザが読み込み・実行できる資源、no-storeはキャッシュ保存を扱う、別々の防御線だからだ。npm公式、MDN、web.dev、GitHub Docsをたどりながら、非エンジニアでも「何が危険で、何を先に確認すべきか」を判断できるところまで分解する。"
---

# 「high severity 3件」なのに、CSPは強い。結局どっちなん？

## 赤信号が3つ出ているのに、「基礎防御は良い」と言われた

あるCIログに、`3 high severity vulnerabilities` と出ている。

その直後に、「ただしCSPはかなり強い。基礎防御は良い」と言われる。

いや、どっちやねん。

セキュリティに詳しくない側からすると、「high severity」が3個ある時点で建物から退避したくなる。一方で「CSPが強い」と言われると、急に要塞っぽくも見える。

調べて分かったのは、この二つは同じテストの点数ではないということだった。**npm auditは“使っている部品”を見る。CSPは“ブラウザの中で何を許すか”を見る。** さらに `no-store` はまた別で、“ブラウザや中継キャッシュに何を残すか”を見る。

つまり、これは「安全か危険か」の二択ではない。玄関の鍵は強い。でも、建物に使っている部材のうち3件は詳細確認が必要。そういう話だった。

[GitHub Docs: 継続的インテグレーション](https://docs.github.com/ja/actions/get-started/continuous-integration) / [npm Docs: npm audit](https://docs.npmjs.com/cli/v11/commands/npm-audit/) / [MDN: Content Security Policy](https://developer.mozilla.org/ja/docs/Web/HTTP/Guides/CSP)

---

## まず、CIと `npm ci` は何をしているのか

CIは Continuous Integration、継続的インテグレーションの略。コードが更新されたとき、ビルドやテストを自動で走らせて、壊れていないかを早めに検出する仕組みだ。GitHub Actionsなら、pushやpull requestをきっかけにNode.jsの依存関係を入れ、テストを実行する、といった流れを組める。

Node.jsのプロジェクトでよく出てくる `npm ci` は、`package-lock.json` に固定された依存関係をもとに、CI向けにクリーンなインストールを行うコマンドだ。そしてnpmの現在の設定では `audit` がデフォルトで `true`。つまり `npm ci` の最中にも、依存関係について既知の脆弱性情報をレジストリへ問い合わせる。

だから「`npm ci` が high severity 3件を報告した」という表現は、`npm ci` 自体が攻撃を発見したというより、**部品を並べ直したついでに、npmの脆弱性データベース照合も走り、3件の高重要度情報が見つかった**と読むと分かりやすい。

ここでのCIは警備員というより、毎回同じ手順で車検をする機械に近い。エンジンを組み直し、動作確認し、既知のリコール対象部品が混ざっていないかも見る。

[npm Docs: npm ci](https://docs.npmjs.com/cli/v11/commands/npm-ci/) / [GitHub Docs: GitHub Actionsについて](https://docs.github.com/ja/actions/get-started/understand-github-actions)

---

## 「high severity 3件」は、「今すぐ侵入される穴が3個」とは限らない

npmの公式説明では、監査レポートのSeverityは、その脆弱性について「一般的な利用ケースでの影響と悪用可能性」をもとに決められる。Highの推奨アクションは **“Address as quickly as possible”**、できるだけ早く対処する、である。

なので、無視していい表示ではない。

ただし、ここから「このアプリは今すぐ外部から突破できる」とまでは飛べない。npm自身も、脆弱性によっては特定OSだけ、特定関数を呼んだ場合だけ、といった緩和要因を確認するよう案内している。さらに、そのパッケージが本番で使われる依存関係なのか、開発時だけの `devDependency` なのか、直接入れたものなのか、依存先のさらに依存先なのかでも、実際のリスクは変わる。

しかもnpmには「meta-vulnerability」という考え方がある。自分が直接使っているパッケージが、そのさらに下で脆弱なバージョンへ依存しているため、上位パッケージ側も脆弱性ありとして扱われるケースだ。数字の「3」が、独立した3個の侵入口を意味するとは限らない。

だから最初に見るべきは件数より中身になる。`npm audit --json` などで、**どのpackageか、dependency pathはどこか、何をすると成立する脆弱性か、修正版はあるか**を見る。「3」という赤い数字は調査開始ボタンであって、調査結果そのものではない。

[npm Docs: About audit reports](https://docs.npmjs.com/about-audit-reports/) / [npm Docs: Auditing package dependencies](https://docs.npmjs.com/auditing-package-dependencies-for-security-vulnerabilities/) / [npm Docs: npm audit - meta-vulnerabilities](https://docs.npmjs.com/cli/v11/commands/npm-audit/)

---

## 依存関係は、「自分が書いていないコード」が大量に家へ入ってくる仕組み

ここが非エンジニアには一番変なところだった。

アプリのコードを自分で1万行書いていても、その外側ではnpmから何十、何百というパッケージを入れることがある。さらに、そのパッケージが別のパッケージを使い、その先がまた別のパッケージを使う。

自分では椅子を1脚買ったつもりなのに、配送業者、ネジメーカー、接着剤メーカー、木材会社までサプライチェーンに入ってくる感じである。

`npm audit` が見ているのは、この広い依存関係の木だ。だから「自分のJavaScriptに怪しいコードを書いていない」だけではゼロにならない。逆に言えば、auditで警告が出たからといって、自分のコードに直接バグが3個あるという意味でもない。

ここまで来て、`high severity 3件` という文字列の怖さが少し変わった。火災報知器が3回鳴っているというより、**使用部材リストに“高優先で確認すべき型番”が3件ヒットした**に近い。

[npm Docs: npm audit](https://docs.npmjs.com/cli/v11/commands/npm-audit/)

---

## CSPは、依存関係ではなく「ブラウザの行動範囲」を縛る

ではCSPは何をしているのか。

CSP、Content Security Policyは、Webページがどこからスクリプト、CSS、画像、iframeなどを読み込めるかをブラウザへ指示する仕組みだ。XSSのように、ページへ悪意あるスクリプトを注入されても、それを実行しにくくする追加防御として使われる。

`default-src 'none'` はかなり強い出発点で、明示的に許可していない種類のリソースを原則読み込ませない。その上で `script-src 'self'` と書けばJavaScriptは同一オリジンから、`style-src 'self'` ならCSSも同一オリジンから、という形で必要な穴だけ開ける。

これを家で言えば、npm auditが「建材の型番チェック」なのに対し、CSPは「窓はここだけ開く」「外部業者はこの入口からしか入れない」という館内ルールに近い。だから依存関係に要確認項目が残っていても、CSPがしっかりしている、という状態は普通に両立する。

ただし、ここにも重要な但し書きがある。Googleのweb.devやOWASPが現在「Strict CSP」と呼ぶのは、主にnonceやhashを使って信頼するスクリプトを指定する方式だ。`script-src 'self'` は十分に制限的なallowlistではあるが、専門用語としての“Strict CSP”と同一ではない。元の「かなり強い」は日常語としては理解できるが、「最高水準だから安心」と読み替えるのは違う。

[MDN: CSP default-src](https://developer.mozilla.org/ja/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/default-src) / [MDN: CSP script-src](https://developer.mozilla.org/ja/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/script-src) / [web.dev: Mitigate XSS with a strict CSP](https://web.dev/articles/strict-csp) / [OWASP: Content Security Policy Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html)

---

## 「frame禁止」には、実は向きが2つある

ここは調べていて一番「そんな細かい罠ある？」となったところ。

CSPには `frame-src` と `frame-ancestors` があり、名前は似ているのに向きが逆だ。`frame-src` は**このページが、どこのiframeを読み込めるか**を制御する。`frame-ancestors` は**どこのページが、このページをiframeなどに埋め込めるか**を制御する。

さらに厄介なのが、`default-src 'none'` は `frame-src` の代替にはなるが、`frame-ancestors` の代替にはならないことだ。MDNは明示的に、`default-src 'none'` を設定していても、それだけでは他サイトからこのページを埋め込むことを禁止しないと説明している。

だから「frame禁止」という一言だけでは、本当は少し情報が足りない。もし `frame-ancestors 'none'` まで入っているなら、他サイトからの埋め込みを拒否し、クリックジャッキング対策としても強い。逆に `default-src 'none'` だけを見て「外からframeされるのも禁止」と判断すると、意味を取り違える。

細かい。でも、セキュリティの文章はこういう「同じframeという単語なのに矢印が逆」が平然と出てくる。

[MDN: frame-src](https://developer.mozilla.org/ja/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/frame-src) / [MDN: frame-ancestors](https://developer.mozilla.org/ja/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/frame-ancestors)

---

## `no-store` はCSPですらなかった

そして、元の文章には `no-store` も並んでいる。

最初はこれもCSPの必殺技かと思ったが、違った。通常ここでいう `no-store` は `Cache-Control: no-store`。HTTPキャッシュに、そのレスポンスを保存しないよう指示するものだ。

CSPが「何を読み込んで実行していいか」を扱うのに対し、`no-store` は「受け取った内容を後で使うために保存していいか」を扱う。ログイン後の機密性が高いレスポンスなどで、キャッシュへ残したくないときに意味がある。

つまり元の一文には、依存関係監査、ブラウザ実行制御、iframe制御、キャッシュ制御が一列に並んでいた。全部セキュリティではある。でも、部署が違う。

ここまで分解すると、急に文章が読めるようになる。「CSPとno-storeがあるからnpmの脆弱性は無視できる」ではないし、「npm auditが赤いからCSPは無意味」でもない。別々の事故を減らす仕組みが、別々に存在している。

[MDN: Cache-Control no-store](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Cache-Control)

---

## 実験：4軒の家を並べると、役割の違いが見える

極端な4パターンを考えると分かりやすい。

- **家A：npm auditは0件、CSPなし。** 部材の既知問題は見つかっていないが、もしHTML注入やXSSの入口が別にあれば、ブラウザ側の追加防御は弱い。
- **家B：npm auditにHighあり、CSPは強い。** ブラウザの行動範囲は絞れているが、依存パッケージ側の既知リスクは別途調査が必要。
- **家C：`no-store`だけ強い。** キャッシュに残りにくいが、悪意あるスクリプトの実行可否や依存関係の脆弱性とは別問題。
- **家D：依存関係を監査し、CSPも整え、必要なレスポンスにno-store。** ようやく複数の層で事故を減らす「defense in depth」に近づく。

もちろん家Dでも無敵ではない。web.devも、CSPはXSS対策の追加レイヤーであって、入力値のサニタイズやXSSそのものの修正の代わりではないと明記している。

セキュリティは「最強の壁を1個置く」より、違う事故原因に違う壁を置く話らしい。

[web.dev: Security headers quick reference](https://web.dev/articles/security-headers) / [web.dev: Strict CSP](https://web.dev/articles/strict-csp)

---

## では、なぜ依存関係監査を「Phase 0」に置くのか

Phase 0という名前自体はnpmの正式用語ではない。プロジェクト側が「本格作業の前にやる準備フェーズ」という意味で付けたラベルだと考えればいい。

リファクタリングは、本来、外から見える振る舞いを変えずに内部構造を改善していく作業である。Martin Fowlerの定義でも、observable behaviorを保ちながら、理解・変更しやすい内部構造へ変えることが中心に置かれている。

その前にhigh severityの依存関係が3件見えているなら、まず「何者か」を確認したほうがいい。修正版へ上げるだけで済むのか。メジャーバージョン更新が必要なのか。本番経路で使われるのか。特定条件でしか成立しないのか。ここを曖昧なまま大きくコードを動かすと、「元からあったリスク」と「リファクタで生まれた不具合」が混ざる。

Phase 0でやることは、いきなり全部直すことではない。**3件を特定し、影響範囲を読み、直し方と副作用を決める。** `npm audit fix` で安全に上げられるものもあれば、SemVerのmajor変更を伴うものもある。`--force` は大きな更新まで許すため、機械的に押すボタンではない。

だから「Phase 0に置くべき」は、非常ベルを鳴らして開発停止というより、リフォーム前に電気・ガス・耐震の既知問題を棚卸しする、くらいの意味だった。

[Martin Fowler: Definition of Refactoring](https://martinfowler.com/bliki/DefinitionOfRefactoring.html) / [npm Docs: Auditing package dependencies](https://docs.npmjs.com/auditing-package-dependencies-for-security-vulnerabilities/) / [npm Docs: npm audit](https://docs.npmjs.com/cli/v11/commands/npm-audit/)

---

## 最初の一文を、普通の日本語へ翻訳する

ここまで理解したうえで、最初の文章を専門用語なしで言い換えるとこうなる。

**「このアプリは、ブラウザ側の基本的な守りはかなり絞ってある。一方で、使っている外部部品の中に“高優先で確認すべき既知の弱点”が3件出ている。今すぐ侵入可能と断定はできないが、大きく作り替える前に、その3件の正体と直し方を確認しよう。」**

これなら分かる。

最初は `high severity 3件` と `CSPが強い` が、赤信号と青信号を同時に出しているように見えた。でも実際には、信号機が2台あった。片方は依存関係、片方はブラウザの実行制御を見ていた。さらに横にはキャッシュ担当までいた。

セキュリティの文章が難しいのは、危険度が難しいというより、**違う種類の防御を全部「セキュリティ」という一語で束ねるから**なのかもしれない。調べる前は「結局、安全なのか？」と聞きたかった。調べた後は、先に聞くべき質問が変わった。

**「どの層の、何のリスクについて話してる？」**

この一問が分かれば、`high severity` の赤文字を見ても、前より少しだけ落ち着いて読める。

---

## Sources / 参考資料

- [npm Docs — npm ci](https://docs.npmjs.com/cli/v11/commands/npm-ci/)
- [npm Docs — npm audit](https://docs.npmjs.com/cli/v11/commands/npm-audit/)
- [npm Docs — About audit reports](https://docs.npmjs.com/about-audit-reports/)
- [npm Docs — Auditing package dependencies for security vulnerabilities](https://docs.npmjs.com/auditing-package-dependencies-for-security-vulnerabilities/)
- [MDN — Content Security Policy](https://developer.mozilla.org/ja/docs/Web/HTTP/Guides/CSP)
- [MDN — default-src](https://developer.mozilla.org/ja/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/default-src)
- [MDN — frame-src](https://developer.mozilla.org/ja/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/frame-src)
- [MDN — frame-ancestors](https://developer.mozilla.org/ja/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/frame-ancestors)
- [MDN — Cache-Control](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Cache-Control)
- [web.dev — Mitigate XSS with a strict CSP](https://web.dev/articles/strict-csp)
- [OWASP — Content Security Policy Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html)
- [GitHub Docs — 継続的インテグレーション](https://docs.github.com/ja/actions/get-started/continuous-integration)
- [Martin Fowler — Definition of Refactoring](https://martinfowler.com/bliki/DefinitionOfRefactoring.html)
