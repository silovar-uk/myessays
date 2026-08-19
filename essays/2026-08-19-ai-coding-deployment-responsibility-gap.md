---
id: ai-coding-deployment-responsibility-gap
title: "その社内ツール、もう「Webサービス」です――AIが開発を民主化した後に残る運用責任"
subtitle: "Claude CodeとVercelが消した「作る壁」と、まだ消えていないセキュリティ・ガバナンス"
created: "2026-08-19"
updated: "2026-08-19"
type: "Research Essay"
status: "完成"
tags: ["AI", "Claude Code", "Vercel", "セキュリティ", "ITガバナンス", "Citizen Developer", "Shadow IT", "Web開発"]
keywords: ["AI coding", "Claude Code", "Vercel", "citizen developer", "shadow IT", "shared responsibility", "web security", "IT governance"]
favorite: 5
grow: 5
abstract: "Claude CodeとVercelを組み合わせれば、非エンジニアでも数時間で社内向けWebアプリを公開できる。問題はVercelが危険なことでも、非エンジニアがコードを書くことでもない。AIが『作って公開する能力』を急速に民主化した一方、認証・秘密情報・脆弱性管理・監視・費用管理といった『安全に運用し続ける責任』は残っている。本稿ではこの能力と責任のギャップを、Shadow ITとの違い、反論、具体的な事故シナリオ、そして禁止ではなく安全に解放するためのガードレールから考える。"
---

# その社内ツール、もう「Webサービス」です――AIが開発を民主化した後に残る運用責任
## Claude CodeとVercelが消した「作る壁」と、まだ消えていないセキュリティ・ガバナンス

### 要旨

「社内で数人が使うだけだから」。

この一言で、Webアプリをずいぶん小さなものとして捉えてしまうことがある。

Claude Codeに要件を伝える。コードができる。GitHubへ置く。Vercelにつなぐ。数分後にはURLが発行され、Slackで同僚へ共有できる。

体験としては、Excelの便利なシートを一つ作ったくらいの軽さである。

しかし、インターネット側から見える姿は違う。

そこにAPIがあり、データベースがあり、外部サービスのAPIキーがあり、世界中から到達できるURLがあるなら、それは規模が小さくても**Webサービス**である。

本稿で問題にしたいのは、Vercelが危険だということではない。Claude Codeが危険だということでも、非エンジニアが開発すべきではないということでもない。

むしろ逆である。

AIは、ソフトウェアを作る能力を大きく民主化した。

ただし、**ソフトウェアをインターネット上で安全に運用し続ける責任まで、自動的に民主化されたわけではない。**

この「能力と責任のギャップ」こそ、AIコーディング時代の企業が考えるべき問題なのではないか。

---

## 1. Vercelが危険なのではない

最初に、話を逆向きにしないための前提を置いておきたい。

Vercelそのものは、Webアプリを安全に運用するための多くの機能を提供している。HTTPS、DDoS対策、Firewall、WAF、Deployment Protection、環境変数管理など、個人がゼロからサーバーを構築するより安全性を高めやすい部分も多い。

Vercel自身も、クラウドセキュリティを**Shared Responsibility Model（共有責任モデル）**として整理している。

インフラ、ネットワーク、基盤の保護はVercelが担う。一方で、アプリケーションのコード、データ、ユーザーのアクセス管理、Environment Variablesの扱い、必要な認証、長期ログ、費用管理などは顧客側にも責任がある。

ここが重要である。

**「安全なクラウドを使うこと」と「そこに載せた自分のアプリが安全であること」は同義ではない。**

高性能な金庫を買っても、扉を開けたままなら中身は守れない。

Vercelの問題というより、クラウドを利用する以上は当然存在する責任分界の話である。

---

## 2. 「社内向け」は、技術的にはアクセス制御ではない

社内ツールを作るとき、しばしば次のような感覚が生まれる。

「検索にも出していない」

「URLは社内Slackにしか貼っていない」

「このURLを知っている人なんて社員だけだろう」

しかし、**URLを知られていないことは、認証されていることではない。**

アクセス制御とは、本来「この人は誰か」を確認し、その人に「このデータを見せてよいか」「この操作をさせてよいか」を判定することである。

OWASP Top 10:2025では、Broken Access Controlが第1位に挙げられている。画面上でボタンを隠す、分かりにくいURLを使う、といった方法ではなく、サーバー側で権限を検証することが求められる。

そしてインターネットには、公開されているサーバーやサービスを継続的に探索する仕組みが存在する。防御・研究目的のCensysのようなサービスでさえ、公開インターネットを観測し続けている。

つまり、本人の認識が

> 数人にだけ教えた小さな社内ツール

であっても、技術的な実態が

> 認証なしでインターネットから到達可能なアプリケーション

なら、その二つはまったく同じではない。

AI時代の最初のリテラシーは、ここかもしれない。

**「社内で使う」と「社内からしか使えない」を区別すること。**

---

## 3. AIが消したのは「コードを書く壁」だけではない

Claude Codeの価値は、プログラミングを速くしたことだけではない。

以前なら、非エンジニアが一人でWebサービスを公開しようとすると、かなり多くの壁にぶつかった。

- フレームワークを選ぶ
- サーバーを書く
- APIを設計する
- データベースへ接続する
- Gitを使う
- 本番環境を用意する
- HTTPSを設定する
- デプロイする
- エラーを直す

これらを理解しなければ前へ進めないこと自体が、結果として「公開するまでの参入障壁」になっていた。

Claude CodeとVercelの組み合わせは、その壁を驚くほど低くする。

これは素晴らしい変化である。

現場で「こういうツールがあればいいのに」と思った本人が、その日のうちに試作品を作れる。IT部門の開発待ちをせず、小さな改善を大量に試せる。業務を最も理解している人自身がソフトウェアを作れる。

問題は、そこである。

**作る難しさが減っても、運用上の論点は同じ割合では減っていない。**

認証は必要である。

APIキーは守る必要がある。

アクセス権を設計する必要がある。

依存ライブラリに重大な脆弱性が見つかれば対処する必要がある。

ログを見なければ攻撃に気付けない。

APIを無制限に呼ばせれば費用が膨らむこともある。

退職した社員がOwnerのままなら、半年後に誰も直せなくなるかもしれない。

ここで起きているのは、単なる「技術力不足」ではない。

**Capability Gap――作れる能力と、安全性を評価できる能力が分離したこと**である。

---

## 4. Claude Code自身のセキュリティ機能でも、この問題は消えない

ここでも誤解を避けたい。

Claude Codeには、権限制御、Sandbox、ネットワーク制御、Prompt Injection対策など複数のセキュリティ機能がある。

Anthropicの公式ドキュメントでは、Claude Codeは原則として追加操作に権限を要求し、組織側でManaged Settingsを配布することもできる。Sandboxではファイルシステムやネットワークへのアクセス範囲を制限できる。

これは重要な安全策である。

しかし、これらが主として守っているのは、**Claude Codeが開発中のPCや環境で何を実行できるか**である。

一方、本稿が問題にしているのは、**Claude Codeが作ったアプリを公開した後、そのアプリを誰がどう守るか**である。

Anthropic自身も、Claude Codeが提案するコードやコマンドを安全性の観点からレビューする責任はユーザーにあると説明している。

つまり、AIの安全機能と、完成したWebアプリのセキュリティは別レイヤーの問題である。

---

## 5. APIキーを隠せば終わり、でもない

AIコーディングで最初に学ぶセキュリティ知識の一つが、「APIキーをコードへ直書きしない」だろう。

これは正しい。

Environment Variableなどを使い、秘密情報をブラウザへ渡さずサーバー側に置くべきである。

ただし、ここにも次の落とし穴がある。

例えば社内用の文章生成アプリを作ったとする。

ブラウザから自分の `/api/generate` を呼び、そのAPIの裏側でClaudeやOpenAIのAPIを呼ぶ。

APIキー自体はVercel側に安全に保存した。

それでも、`/api/generate` に認証も利用制限もなければどうなるか。

第三者はAPIキーそのものを盗まなくても、**あなたのAPIを代理人として使える。**

外から大量に `/api/generate` を呼べば、裏側ではあなたの契約したLLM APIが動く。

OWASP API Security Top 10は、API側でリソース消費を制限しない問題を「Unrestricted Resource Consumption」として挙げている。影響はサービス停止だけではない。CPU、ストレージ、外部APIなど、リクエストに比例して費用が発生する仕組みでは、経済的な被害にもつながる。

したがって「APIキーを隠す」は入口にすぎない。

必要なのは、

- 認証
- 認可
- Rate Limit
- 利用量の上限
- Cost Alert
- ログと異常検知

まで含めた設計である。

秘密を守ることと、秘密を使う機能を守ることは違う。

---

## 6. 本当に怖いのは「デプロイした翌日」ではなく「半年後」かもしれない

AI開発では、完成の瞬間がとても分かりやすい。

画面が動く。

スマホでも開ける。

同僚も使える。

「できた」と感じる。

ところがWebサービスには、完成後にも仕事がある。

NISTのSecure Software Development Frameworkは、セキュリティを開発工程へ組み込むことを求めている。OWASP Top 10:2025でもSoftware Supply Chain Failuresが主要リスクに含まれる。

npmなどのライブラリには、新しい脆弱性が後から見つかる。

今日安全だったバージョンが、半年後にも同じ評価とは限らない。

ここで必要なのは「何でも常に最新版へ更新すること」ではない。

- 何のライブラリを使っているか把握する
- 新しい脆弱性情報を継続的に監視する
- 自分のアプリへの影響を評価する
- 必要なSecurity Updateを適時適用する

という運用である。

GitHubにはDependabot Alerts、Security Updates、Secret Scanning、Push Protectionなど、この仕事を支える仕組みがある。

しかし、機能が存在することと、誰かがアラートを見て対応することは別問題である。

そこで最も厄介な状態が生まれる。

> 作った人はいる。
>
> 使っている人もいる。
>
> でも、運用している人はいない。

AI時代の社内システムで、本当に増える可能性があるのはこれではないか。

**便利だから消せない。しかし、誰もOwnerではない。**

---

## 7. これは昔からあるShadow ITと何が違うのか

ここで当然、反論が出る。

「そんなの昔からShadow ITとして存在したのではないか」

その通りである。

Excelマクロ、Access、Google Sheets、個人契約のSaaS、Zapierなど、IT部門が把握していない仕組みはAI以前から存在した。

だから、AIがまったく新しい種類の問題を発明した、と主張するのは正確ではない。

変わったのは**量と速度と到達範囲**ではないか。

Excelマクロを作ることと、API・DB・外部AIを組み合わせたアプリをインターネットへ公開することの間には、攻撃面の違いがある。

さらにAIでは、設計から実装までの時間が短くなる。

これは業務改善には大きなメリットだが、組織側から見ると別の問題を生む。

従来なら、

企画 → 開発依頼 → 設計 → 実装 → レビュー → インフラ → 公開

という長い流れのどこかで、情報システム、セキュリティ担当、エンジニアなどが関与した。

AIコーディングでは、

企画者 → Claude Code → Vercel → 公開

まで一人で到達できる。

AIが飛び越えたのは「コーディング作業」だけではない。

**これまで開発プロセスの途中に暗黙的に存在していた組織的な摩擦まで飛び越えられるようになった。**

これをSpeed Gapと呼べる。

さらに、社員個人のGitHub、Vercel、Supabase、Firebase、Anthropicなどを組み合わせれば、組織のIT部門から見えない場所でかなり本格的なシステムが成立する。

これはVisibility Gapである。

AI時代のShadow ITは、単に数が増えるだけでなく、以前より短時間で高度な構成へ到達しやすい。

---

## 8. それでも「非エンジニアに作らせるな」は間違っている

ここまで読むと、「では禁止すればいい」という結論へ行きたくなる。

しかし、それはおそらく悪いガバナンスである。

まず、非エンジニアだけが脆弱なアプリを作るわけではない。

OWASP Top 10が毎年必要とされること自体、プロの開発現場でもアクセス制御、設定、依存関係、認証などの問題が繰り返されていることを示している。

AIコード生成についても、研究結果は一方向ではない。

USENIX Security 2023のユーザー研究では、低レベルCプログラミングという特定条件において、LLM支援を受けた参加者が対照群より重大なセキュリティバグを大幅に増やしたとは確認されなかった。一方、ACL 2025の比較研究では、多くのLLMが脆弱性検知には一定の能力を持ちながら、安全でないコードを生成する傾向や修正の難しさも報告されている。

つまり、「AIを使うと必ず危険になる」という単純な証拠もない。

むしろAIは、Security Review、依存関係の説明、設定チェック、テスト生成など、防御側にも使える。

そして何より、現場の人が自分の業務を自分で改善できる価値は大きい。

MicrosoftもPower PlatformのCitizen Developmentを、禁止ではなく「Digital Guardrails」のもとで拡大する考え方を採っている。Center of Excellenceを設け、ガバナンス、教育、Managed Environmentなどを組み合わせて、Citizen DeveloperとProfessional Developerの双方が安全に作れる環境を整える。

ここから得られる示唆は明快である。

**管理すべきなのは「誰がコードを書いてよいか」ではなく、「どのリスクのシステムを、どの条件で公開してよいか」ではないか。**

---

## 9. ガバナンスを「人」ではなく「リスク」で分ける

例えば、AI開発を次のように段階化できる。

### Level 0：ローカル完結

自分のPCの中だけで動く。外部公開なし。機密データなし。

原則として自由度を高くする。

### Level 1：公開するが、データを持たない

静的な案内ページ、簡単な計算ツールなど。

自動Security Scan、依存関係チェック、公開先の会社管理だけを必須にする。

### Level 2：社員だけが使うWebアプリ

社内データを扱うため、SSOやDeployment Protectionなどを必須にする。

「URLを知っている人だけ」方式は禁止する。

### Level 3：個人情報・機密情報・外部API課金を伴う

情報システムまたはSecurity Reviewを必須にする。

データ保存先、外部送信先、認証・認可、Rate Limit、ログ、バックアップ、費用上限を確認する。

### Level 4：顧客向け・基幹業務

通常の本番システムと同等の開発・運用プロセスへ載せる。

こうすれば、「ちょっとした自動化まで全部申請」という硬直した状態にも、「各自好きにVercelへ出してよい」という無管理状態にもならない。

大事なのは、開発者の肩書ではなく**Blast Radius――事故が起きたときの影響範囲**でレビュー強度を変えることである。

---

## 10. 技術より先に「会社公認の道」を作る

Citizen Developerを安全に増やしたいなら、細かな禁止事項を100個作るより、**安全なGolden Pathを一本用意する**ほうが強い。

例えば会社として、次のような開発経路を標準化する。

### 技術のガードレール

- 会社管理のGitHub Organizationを使う
- Secret Scanning / Push Protectionを有効化する
- Dependabot Alertsを有効化する
- 会社管理のVercel TeamへDeployする
- 社内ツールには原則Authenticationを付ける
- APIには認証・認可・Rate Limitを付ける
- SecretsはEnvironment Variables等で管理する
- 個人情報を扱うDBでは行単位を含む適切なアクセス制御を設計する
- Security HeaderやWAFを標準テンプレート化する

### 組織のガードレール

- すべてのアプリにOwnerを設定する
- システム台帳へURL、Repository、データ種別、外部サービスを登録する
- 個人アカウントではなく会社管理アカウントを使う
- リスク分類によってレビュー要否を自動的に決める
- 退職・異動時にOwnerを移管する
- 使われなくなったアプリの廃止ルールを決める

### 運用のガードレール

- Security Alertの通知先を決める
- Cost Alert / Spend Limitを設定する
- エラーと異常アクセスを監視する
- 重大な依存関係の脆弱性に対応する人を決める
- 定期的に「まだ使われているか」を棚卸しする
- インシデント時の停止手順を用意する

ここまでをテンプレート化できれば、非エンジニアに毎回OWASPを一から勉強してもらう必要はない。

CISAがSecure by Designで強調する考え方も近い。安全性を利用者の努力だけに依存させるのではなく、**最初から安全な既定値を仕組みに埋め込む。**

社員へ「気を付けて使ってください」と100回伝えるより、危険な状態では公開しにくい仕組みを一度作るほうが強い。

---

## 11. AIが民主化するなら、セキュリティも民主化する

AIコーディングは、おそらく止まらない。

そして止めるべきでもない。

これまで開発部門へ依頼しなければ作れなかった小さなソフトウェアを、現場が自分で作れるようになる。その生産性は大きい。

だから企業側にも、発想の転換が必要になる。

これまでは、

> 誰にシステムを作らせるか

を管理していれば、ある程度はシステムの数も管理できた。

しかしAIによって制作能力が広く配られれば、このモデルは維持できない。

これから必要なのは、

> 何を、どこへ、どのデータで、どの安全条件なら公開してよいか

を管理する仕組みである。

コードを書く資格を管理するのではない。

**公開するリスクを管理する。**

ここに、AI時代のITガバナンスの転換点がある。

Claude Codeでアプリを作ることと、そのアプリをインターネット上で運営することは、別の行為である。

前者はAIが劇的に簡単にした。

後者は、今も組織的な仕事として残っている。

だから必要なのは、AI開発を止めることではない。

**AIが「ソフトウェアを作る力」を民主化したのなら、次は組織が「安全に作り、安全に運用する仕組み」を民主化する番なのである。**

---

## 参考文献

- Vercel, [Shared Responsibility Model](https://vercel.com/docs/security/shared-responsibility)
- Vercel, [Security Overview](https://vercel.com/docs/security)
- Vercel, [Methods to Protect Deployments](https://vercel.com/docs/deployment-protection/methods-to-protect-deployments)
- Vercel, [Environment Variables](https://vercel.com/docs/environment-variables)
- Anthropic, [Claude Code Security](https://code.claude.com/docs/en/security)
- Anthropic, [Claude Code Sandboxing](https://code.claude.com/docs/en/sandboxing)
- Anthropic, [Claude Code Permissions](https://code.claude.com/docs/en/permissions)
- OWASP, [OWASP Top 10:2025](https://owasp.org/Top10/)
- OWASP, [API4:2023 Unrestricted Resource Consumption](https://owasp.org/API-Security/editions/2023/en/0xa4-unrestricted-resource-consumption/)
- NIST, [Secure Software Development Framework (SSDF) Version 1.1, SP 800-218](https://csrc.nist.gov/pubs/sp/800/218/final)
- GitHub, [About Secret Scanning Alerts](https://docs.github.com/en/code-security/concepts/secret-security/about-alerts)
- GitHub, [Dependabot Alerts](https://docs.github.com/en/code-security/concepts/supply-chain-security/dependabot-alerts)
- CISA, [Secure by Design関連資料](https://www.cisa.gov/securebydesign)
- Microsoft, [Power Platform Adoption Guidance](https://learn.microsoft.com/en-us/power-platform/guidance/adoption/methodology)
- Microsoft, [Establish a Center of Excellence with governance patterns and practices](https://learn.microsoft.com/ja-jp/power-platform/guidance/adoption/common-vision/establish-coe)
- Sandoval et al., [Lost at C: A User Study on the Security Implications of Large Language Model Code Assistants, USENIX Security 2023](https://www.usenix.org/conference/usenixsecurity23/presentation/sandoval)
- Mou et al., [Can You Really Trust Code Copilot? Evaluating Large Language Models from a Code Security Perspective, ACL 2025](https://aclanthology.org/2025.acl-long.849/)
