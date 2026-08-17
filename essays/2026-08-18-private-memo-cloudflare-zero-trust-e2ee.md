---
id: private-memo-cloudflare-zero-trust-e2ee
title: "自分しか読めないメモを、どう作るか"
subtitle: "Cloudflare Access・Workers・D1・Web Cryptoを「玄関、受付、金庫、封筒」から理解する"
created: "2026-08-18"
updated: "2026-08-18"
type: "Learning Paper"
status: "完成"
tags: ["Cloudflare", "セキュリティ", "暗号化", "Web Crypto", "Cloudflare Access", "Workers", "D1", "Zero Trust", "個人開発", "プライバシー"]
keywords: ["Cloudflare Access", "Cloudflare Workers", "Cloudflare D1", "Web Crypto API", "AES-GCM", "PBKDF2", "JWT", "E2EE", "Zero Trust", "workers.dev", "Wrangler"]
favorite: 5
grow: 5
abstract: "自分だけが使う秘密のメモをWeb上に置くとき、ログイン画面を付けるだけでは十分ではない。本稿では、Cloudflare Accessを玄関、Workerを受付、D1を金庫、ブラウザ暗号化を封筒にたとえながら、第三者アクセス・認証迂回・DB流出という異なる事故を別々の防御で止める設計を、非エンジニア向けに一段ずつ整理する。D1作成、Wrangler、workers.dev、OTP、JWT検証、AES-GCM、PBKDF2まで、実際にPrivate Memoを構築した順番と、その順番である理由を追う。"
---

# 自分しか読めないメモを、どう作るか
## Cloudflare Access・Workers・D1・Web Cryptoを「玄関、受付、金庫、封筒」から理解する

### 要旨

「外に出したくないことを書く、自分専用のメモ帳がほしい。」

この要求は、一見すると簡単に見える。Webページを作り、ログイン画面を付け、データベースへ保存する。それで終わりそうだ。

しかし、少し考えると不安が出てくる。

- URLを知った人が直接開いたらどうなるのか。
- ログイン画面とは別のURLから入れたらどうなるのか。
- データベースそのものが流出したらどうなるのか。
- サービス運営側から本文を読める状態では、「外に出ない」と言えるのか。
- PCで書いたものをスマートフォンでも読みたい。しかし、便利にすると安全性が下がらないか。

つまり、これは単に「メモ帳を作る」話ではない。**情報をどこまで信用し、どこから信用しないかを決める話**である。

今回作ったPrivate Memoでは、この問題を四つの道具に分解した。

> **Cloudflare Access = 玄関**  
> **Cloudflare Worker = 受付**  
> **Cloudflare D1 = 金庫**  
> **Web Crypto = 金庫に入れる前の封筒**

この四つの役割が見えると、Cloudflareの設定画面や暗号用語も、かなり読みやすくなる。

## 1. 「ログインできる」と「読めない」は違う

秘密のWebアプリを考えるとき、最初に混同しやすい二つがある。**認証**と**暗号化**である。

認証は「あなたは誰ですか」を確認する仕組みだ。一方、暗号化は「そのデータを読める形に戻せる鍵を持っていますか」を確認する仕組みである。

銀行の貸金庫を想像すると分かりやすい。建物の入口で身分証を見せる。これが認証である。しかし、建物に入れたからといって、すべての貸金庫を開けられるわけではない。個別の鍵が必要だ。

Private Memoも同じ構造にした。Cloudflare Accessを通過しただけでは、まだ本文は読めない。ブラウザ上で、もう一度自分のパスフレーズから暗号鍵を復元して、初めて本文を読める。

この二段構えが設計の出発点だった。

## 2. 全体像――四つの場所に役割を分ける

完成形を一枚で見る。

```text
自分のPC / スマートフォン
        │
        │ ① メール認証
        ▼
Cloudflare Access
「この人を中へ入れてよいか」
        │
        │ ② JWTという通行証
        ▼
Cloudflare Worker
「本当に正しい通行証か」
「この人のデータだけか」
        │
        │ ③ 暗号文だけ
        ▼
Cloudflare D1
「保存する場所」

ただし本文は、
ブラウザを出る前にWeb Cryptoで暗号化済み
```

一番重要なのは、**一つの仕組みに全部を任せないこと**だ。

AccessにはAccessの仕事しかさせない。WorkerにはWorkerの仕事しかさせない。D1は保存だけする。暗号鍵はブラウザの外へ出さない。

この「役割の分離」が、安全性を理解するうえで一番大きなポイントになる。

## 3. 壁その1――Cloudflare Accessは「玄関」

最初の壁はCloudflare Accessである。これは、Webアプリへ到達する前にCloudflare側で利用者を確認する仕組みだ。

今回のPrivate Memoでは、メールアドレスへ一度限りのコードを送るOne-time PINを使った。

```text
Private Memoを開く
↓
メールアドレスを入力
↓
メールへログインコードが届く
↓
コードを入力
↓
許可された人だけ通過
```

パスワードを新しく管理する必要がないのが便利だ。

ただし、ここには非常に危険な落とし穴がある。

### 「OTPを使う人を許可」ではダメ

Cloudflare AccessのPolicyには、誰をAllowするかを指定する。

ここで、

```text
Include: Login Methods
One-time PIN
```

だけにしてはいけない。

これは「One-time PINでログインできる人」を許可する意味になり、実質的に有効なメールアドレスを持つ人を広く通してしまう設定になり得る。Cloudflare自身もAccessの典型的な誤設定としてこのケースを警告している。

今回必要なのは、

```text
Action: Allow
Include: Emails
Value: 自分のメールアドレス
```

である。

つまり、「OTPを使った人」ではなく、**「このメールアドレスの人」**を許可する。

玄関に「鍵を持っている人は全員どうぞ」と書くのではなく、「この一人だけ」と名簿に書く感じである。

なお2026年時点では、新しく作ったZero Trust組織ではCloudflare自身のIdentity Providerが初期設定になり、One-time PINは自動追加されない。OTPを使う場合はIdentity providersから明示的に追加する必要がある。

## 4. 壁その2――Workerは「受付」

ここで一つ疑問が出る。

> Accessが玄関で止めてくれるなら、Workerで認証する必要はないのでは？

必要である。

理由は、**玄関以外の入口が絶対に存在しないとは限らないから**だ。

たとえば設定ミスで、別のWorker URL、preview URL、静的アセットへの経路などが残っていたとする。Accessを設定したURLだけ守っても、別ルートから同じWorkerへ到達できれば意味がない。

そこでWorker自身も、すべてのリクエストを確認する。

Cloudflare Accessを通過した通信には、`Cf-Access-Jwt-Assertion`というヘッダーが付く。中身はJWTと呼ばれる署名付きの通行証である。

Workerは、

- このJWTはCloudflareが署名したものか。
- このPrivate Memo用に発行されたものか。
- 有効期限は切れていないか。
- メールアドレスは許可リストに入っているか。

を確認する。正しくなければ403を返す。

つまり、玄関を抜けた後にも受付がいる。「さっき入口で確認されたんです」と言われても、受付は通行証を見せてもらう。セキュリティでは、この少し疑い深い態度が大切になる。

### なぜ `run_worker_first: true` が重要なのか

Private MemoはHTML、CSS、JavaScriptという静的ファイルも配信する。

Cloudflare Workers Static Assetsでは、設定によっては静的ファイルをWorkerコードより先に返せる。しかし今回、それでは困る。HTMLだけでも認証を通る前に返したくないからだ。

そこで、

```json
"assets": {
  "directory": "./public",
  "binding": "ASSETS",
  "run_worker_first": true
}
```

とする。

`run_worker_first: true` は、静的ファイルに一致するリクエストでもまずWorkerを呼ぶ設定である。Cloudflareの公式ドキュメントでも、認証チェックはこの使い方の代表例として挙げられている。

**APIだけ守るのではなく、画面を返す前から受付を通す。**

これで二つ目の壁ができる。

## 5. 壁その3――D1は「金庫」だが、金庫を信用しすぎない

次はデータベースである。Cloudflare D1はSQLite系のデータベースで、Workerから使える。

しかし今回は、D1へ本文をそのまま入れない。

ここで考え方を一段変える。

> **データベースは保存場所として使うが、秘密を守る最後の砦としては信用しない。**

もしD1の中身が何らかの形で流出しても、タイトルや本文を読めない状態にしておく。

そのため、D1に入るのは主に次のような情報だけになる。

```text
memo id
暗号文
IV
revision
作成日時
更新日時
```

タイトルも本文も、読める文字列では保存しない。

「金庫だから大丈夫」ではなく、**金庫へ入れる時点ですでに封筒を暗号化しておく**。これが今回の設計で最も重要な部分である。

## 6. 壁その4――Web Cryptoは「中身の見えない封筒」

暗号化はサーバーではなく、ブラウザで行う。使うのがWeb Crypto APIである。

Webブラウザには、標準で暗号処理のためのAPIが備わっている。今回使った中心的な仕組みはAES-GCMとPBKDF2だ。

### AES-GCM――メモ本文を暗号化する

AES-GCMは、メモを読めないデータへ変える役割を担う。

```text
会議メモ
明日の10時に確認
```

という文字列が、そのままネットワークへ出ていくことはない。ブラウザ内で暗号化されてからWorkerへ送られる。

W3CのWeb Cryptography仕様でも、AES-GCMはブラウザで利用できる標準アルゴリズムとして定義されている。

### PBKDF2――覚えられるパスフレーズから鍵を作る

人間は256ビットの暗号鍵を覚えられない。そこで自分が入力したパスフレーズから、暗号用の鍵を導出する。それがPBKDF2の役割である。

今回の構造は、少し工夫している。

```text
自分が覚えるパスフレーズ
↓
PBKDF2
↓
KEKという鍵
↓
マスターキーを開く
↓
マスターキーで全メモを復号
```

パスフレーズで毎回直接メモを暗号化するのではない。ランダムに生成した「マスターキー」が本当のメモ用鍵で、パスフレーズから作った鍵は、そのマスターキーを包むためだけに使う。

この方式には大きな利点がある。

**パスフレーズを変更しても、全メモを暗号化し直さなくてよい。**

マスターキーの包みだけを新しいパスフレーズ由来の鍵で作り直せば済む。

## 7. なぜ「IVを毎回変える」がそんなに重要なのか

暗号の実装で、一見地味だが非常に重要なのがIVである。

AES-GCMでは、同じ鍵で同じIVを再利用してはいけない。

Private Memoは自動保存する。つまり同じメモを何度も暗号化する。

そこで今回のコードでは、IVを外から指定できないようにした。

```text
encryptMemo()
の中で
毎回新しい12バイトIVを生成
```

という構造にしている。

「開発者が気をつける」ではなく、**間違えにくい構造そのものを作る**。セキュリティ設計では、この発想がかなり重要だと思う。

## 8. 実際の構築は、なぜこの順番なのか

ここまで理解したところで、実際の作業順を見る。

```text
1. プロジェクトをPCへ置く
2. WranglerでCloudflareへログイン
3. D1を作る
4. D1へテーブルを作る
5. Workerをデプロイ
6. workers.devへAccessを設定
7. 自分のメールだけAllow
8. AccessのAUDとTeam Domainを取得
9. Workerへ設定値を戻す
10. 再デプロイ
11. ブラウザで初期暗号鍵を生成
12. スマホでも同じパスフレーズで復号確認
```

一見、Accessを先に作った方が自然に見える。しかし実作業では、まずWorkerと公開URLが存在した方が設定しやすい。

だから、**器を作る → URLを得る → そのURLに玄関を付ける → 通行証情報をWorkerへ戻す**という順番になる。

この往復が分かっていれば、設定作業がかなり理解しやすい。

## 9. Wranglerは「Cloudflareを操作するリモコン」

PC側のPrivate Memoフォルダで、まず`npm install`を実行する。

今回の依存パッケージは最小限にしている。

- `wrangler`
- `jose`

だけだ。

WranglerはCloudflareをコマンドラインから操作する道具である。

```bash
npx wrangler login
```

を実行するとブラウザが開き、自分のCloudflareアカウントとPC上のWranglerがつながる。

感覚としては、**Cloudflare管理画面をターミナルから操作するためのリモコンを登録する**に近い。

## 10. D1という空の金庫を作る

次に、

```bash
npx wrangler d1 create private-memo-db
```

を実行する。

これでCloudflare上に空のD1データベースができる。

Cloudflare公式ドキュメントでも、`wrangler d1 create`はD1を作り、設定ファイルへ記載するbindingとUUIDを返すコマンドとして定義されている。

出てきた`database_id`を`wrangler.jsonc`へ貼る。このIDは「どの金庫を使いますか」をWorkerへ教える住所のようなものだ。

次に、

```bash
npx wrangler d1 execute private-memo-db --remote --file=./migrations/0001_init.sql
```

を実行する。

これで空の金庫の中に`users`と`memos`という収納棚を作る。D1では`--remote`を付けるとCloudflare上の本番DBへSQLを実行する。

## 11. まずWorkerを世の中に置く

次に、

```bash
npx wrangler deploy
```

でWorkerをデプロイする。

Cloudflare Workersには`workers.dev`というサブドメインがあり、独自ドメインを用意しなくてもWorkerを公開できる。

Cloudflareは`workers.dev`を個人・趣味用途などの開始地点として提供しており、2026年現在はこのURLへCloudflare Accessを直接有効化できる。

ここでのポイントは、公開URLを得ることだ。まだ「使える状態」でなくてもいい。むしろWorker自身がJWTを要求しているので、Access設定前は403になってよい。

**開いて見えないことが、失敗ではなく安全側の成功**なのである。

## 12. 公開URLの前に玄関を置く

Cloudflare Dashboardで、Workerの

```text
Settings
→ Domains & Routes
→ workers.dev
```

へ進み、`Enable Cloudflare Access`を有効にする。

Cloudflare公式でも、Workers & Pagesから対象Workerを開き、Settings > Domains & Routesの`workers.dev`行からAccessを有効化する流れが案内されている。

Policyは、

```text
Action: Allow
Include: Emails
Value: 自分のメールアドレス
```

とする。

これで玄関ができる。

## 13. 受付が通行証を検証できるようにする

Accessを作ると、Application Audience、略してAUDという値が得られる。これは、JWTが「どのアプリ向けに発行されたものか」を示す識別子だ。

もう一つ必要なのがTeam Domainである。

```text
xxxxx.cloudflareaccess.com
```

という形になる。

Workerへ、

```text
ACCESS_TEAM_DOMAIN
ACCESS_AUD
ALLOWED_EMAILS
```

を設定する。

ここまで来るとWorkerは、Cloudflareの署名があるか、Private Memo向けのJWTか、自分のメールアドレスかを自力で確認できる。

そして再び`npx wrangler deploy`する。これで玄関と受付がつながる。

## 14. 初回アクセスで、本当の暗号鍵を作る

AccessのOTPを通過すると、Private Memoの初期設定画面が出る。そこでパスフレーズを設定する。

ブラウザは内部で、

1. ランダムなマスターキーを作る。
2. パスフレーズからPBKDF2でKEKを作る。
3. KEKでマスターキーを暗号化する。
4. 暗号化されたマスターキーだけD1へ保存する。

という処理を行う。

生のマスターキーやパスフレーズはサーバーへ送らない。つまりCloudflare側にあるのは、**鍵を開けるための、さらに暗号化された鍵**だけである。

このときリカバリーキーも生成する。これはパスフレーズを忘れたときの最後の救済手段になる。

設計上、誰にも復旧できないことと、自分自身にも復旧できないことは表裏一体である。「運営に問い合わせれば戻せる」という逃げ道をなくしたからこそ、運営側にも読めない。

## 15. スマートフォンで開くと、設計の意味が見える

最後にPC以外の端末で試す。

スマートフォンでPrivate Memoを開く。まずCloudflare Accessのメール認証がある。通過すると、今度はPrivate Memo自身のパスフレーズを求められる。

同じパスフレーズを入力すると、D1から暗号化済みマスターキーを取得し、ブラウザ上で同じ鍵を復元できる。その鍵で、暗号文になっているメモを読める。

ここで初めて、二段構えの意味が体感できる。

```text
Access
= この端末を使っている人は誰か

Passphrase
= この人はメモを復号できる鍵を持つか
```

別々の問いなのである。

## 16. 「ネットワークを見る」という、最後の確認

セキュリティ機能は、「コードに書いたから大丈夫」で終わらせない方がいい。

ブラウザのDeveloper Toolsを開き、Networkタブを見る。

メモに、たとえば、

```text
絶対に外へ出したくないテスト文章12345
```

と書く。保存する。そしてNetworkでリクエスト本文を見る。

そこにこの文章が存在せず、暗号文しかないことを確認する。さらにD1のデータを見ても、タイトルや本文が読めないことを確認する。

この確認は非常に分かりやすい。「暗号化とは何か」を数式で理解していなくても、**自分が書いた文字列が、ブラウザの外側では見つからない**ことは確認できる。

## 17. この設計でも守れないもの

ここまでやっても万能ではない。

PC自体がマルウェアに感染していれば、入力中の本文を盗まれる可能性がある。悪意のあるブラウザ拡張がページ内容を読める環境なら、それも別問題だ。

また、WebアプリはサーバーからJavaScriptそのものを受け取って動く。配信元が完全に侵害され、悪意のあるJavaScriptへ差し替えられれば、入力時のパスフレーズを盗むことも理論上は可能である。

つまり今回守っているのは主に、

- URLを知った第三者の直接アクセス
- Access設定を迂回する経路
- 他ユーザーIDの直接指定
- D1データの流出
- 通信や保存時の平文露出
- 外部スクリプトによる不用意な送信

である。

**脅威を全部消すのではなく、何から守るかを明確にした。**

## 18. 安全性は「強い技術」より「重ね方」に宿る

AES-GCMは強い暗号である。Cloudflare Accessも強力な認証機構である。

しかし、今回作っていて一番印象に残ったのは、個別技術の強さではなかった。

**一つの仕組みに、すべてを任せないこと。**

Accessが壊れても、Workerが見る。Workerまで突破されても、D1には暗号文しかない。D1のデータを持ち出されても、パスフレーズ由来の鍵がなければ本文へ戻せない。

逆に、ブラウザでメモを読んでいる瞬間だけは平文が存在する。そこは隠さない。

安全性とは「絶対安全」という言葉を貼ることではなく、**どの壁が破られたとき、次の何が残るか**を考えることなのだと思う。

## 19. 最後にもう一度、図でまとめる

用語を全部忘れても、この図だけ覚えておけばよい。

```text
【玄関】Cloudflare Access
この人を入れてよいか？
        ↓
【受付】Cloudflare Worker
通行証は本物か？
この人のデータだけか？
        ↓
【封筒】Web Crypto
本文をブラウザ内で暗号化
        ↓
【金庫】Cloudflare D1
読めない暗号文を保存
```

構築手順も同じ発想で理解できる。

```text
金庫を作る
↓
建物を公開する
↓
玄関を付ける
↓
受付に正しい通行証の見分け方を教える
↓
封筒の鍵を自分の端末で作る
↓
別端末でも同じ鍵を復元できるか試す
```

一見すると、Cloudflare、JWT、D1、AES-GCM、PBKDF2と難しい単語が並ぶ。しかし、それぞれが答えている問いはシンプルだ。

**誰を入れるのか。**

**本当にその人なのか。**

**保存場所が漏れても読めないか。**

**鍵は誰が持つのか。**

この四つを分けて考えるだけで、「秘密のWebメモを作る」という仕事はかなり見通しがよくなる。

そして、おそらくこれはメモ帳だけの話ではない。個人用の日記、仕事の下書き、アイデア帳、研究ノート。Webに置きたいが、Webだからこそ外へ出したくない情報はたくさんある。

そんなとき、「ログインを付ける」だけではなく、**漏れた後まで想像して設計する**。

Private Memoを作る作業は、その感覚を学ぶ小さな教材にもなった。

## 参考資料

- Cloudflare Developers, [workers.dev](https://developers.cloudflare.com/workers/configuration/routing/workers-dev/) — workers.devの公開形式とCloudflare Accessによる保護
- Cloudflare Developers, [Static Assets](https://developers.cloudflare.com/workers/static-assets/) — Workers Static Assetsと`run_worker_first`
- Cloudflare Developers, [Configuration and Bindings / run_worker_first](https://developers.cloudflare.com/workers/static-assets/binding/) — Workerを静的アセットより先に実行する設定
- Cloudflare Developers, [Validate JWTs](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/authorization-cookie/validating-json/) — `Cf-Access-Jwt-Assertion`とJWT検証
- Cloudflare Developers, [Access policies](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/) — Allow / Include / Emailの設定と典型的な誤設定
- Cloudflare Developers, [One-time PIN login](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/one-time-pin/) — OTPの設定と2026年時点の挙動
- Cloudflare Developers, [D1 Wrangler commands](https://developers.cloudflare.com/d1/wrangler-commands/) — D1作成とWrangler操作
- Cloudflare Developers, [D1 Getting started](https://developers.cloudflare.com/d1/get-started/) — ローカル・remote DBへのSQL適用
- W3C, [Web Cryptography Level 2](https://www.w3.org/TR/WebCryptoAPI/) — AES-GCM、PBKDF2を含むWeb Crypto API仕様
