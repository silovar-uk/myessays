---
id: cloudflare-internet-middle-programmable-network
title: "Cloudflare（クラウドフレア）は、インターネットの「途中」を会社にした"
subtitle: "16歳の誕生日に、ラバランプからCloudflare Workers（クラウドフレア・ワーカーズ）まで一本につなげてみる"
created: "2026-09-27"
updated: "2026-09-27"
type: "リサーチエッセイ"
status: "完成"
tags: ["Cloudflare（クラウドフレア）", "インターネット", "CDN", "DNS", "セキュリティ", "Workers（ワーカーズ）", "クラウド"]
keywords: ["Cloudflare", "CDN", "DNS", "reverse proxy", "Anycast", "Workers", "Pages", "R2", "Zero Trust", "1.1.1.1", "LavaRand"]
grow: 5
abstract: "Cloudflare（クラウドフレア）はCDN会社、DNS会社、セキュリティ会社、サーバーレス実行基盤の会社のどれなのか。答えは、そのどれか一つではない。利用者と元サーバーの「途中」に世界規模のネットワークを置き、その同じ場所で配信、攻撃防御、名前解決、プログラム実行、保存、社内アクセス制御まで扱う会社だ。2026年9月27日、公開開始からちょうど16年の日に、ラバランプ、1.1.1.1、Cloudflare Workers（クラウドフレア・ワーカーズ）、R2（アールツー）、ゼロトラスト（Zero Trust）、無料枠の経済性、2025年の大規模障害までたどり、同社の正体を一つの構造として捉え直す。"
---

# Cloudflare（クラウドフレア）は、インターネットの「途中」を会社にした
## 16歳の誕生日に、ラバランプからCloudflare Workers（クラウドフレア・ワーカーズ）まで一本につなげてみる

Cloudflare（クラウドフレア）について調べようと思った日が、たまたまCloudflareの誕生日だった。

同社が一般公開されたのは2010年9月27日。今日は2026年9月27日なので、ちょうど16年である。こういう偶然は、記事の冒頭としては出来すぎている。

しかし、もっと妙なことがある。

この会社は、インターネットを守るために**ラバランプを撮影している**。

サンフランシスコのオフィスには大量のラバランプが並び、その予測しにくい動きをカメラで取り込み、暗号に必要な乱数の材料へ混ぜている。2025年にはリスボンのオフィスへ50台の波動装置まで設置した。ほかにも、オースティンの光学装置やロンドンの二重振り子など、物理世界の「予測しにくさ」を使っている。

急にインターネット企業の説明ではなくなる。

だが、ここから入るとCloudflareが妙に分かりやすい。Cloudflareは、目に見えない「クラウド」を売っているように見えて、実際には世界各地の機械、通信回線、経路制御、暗号、キャッシュ、プログラム実行環境を組み合わせ、**インターネットの途中に巨大な実体を置いている会社**だからである。

ラバランプは余興ではない。Cloudflareという会社の縮図に近い。

本稿では、Cloudflareを製品名の一覧として覚えない。コンテンツ配信網（Content Delivery Network、CDN）、ドメイン名システム（Domain Name System、DNS）、ウェブアプリケーション防火壁（Web Application Firewall、WAF）、Cloudflare Workers（クラウドフレア・ワーカーズ）、R2（アールツー）、ゼロトラスト（Zero Trust）といった、一見ばらばらなものを「なぜ同じ会社がやっているのか」から逆算していく。

> **情報基準日：2026年9月27日**
>
> 製品仕様、価格、ネットワーク規模は更新が速い。本稿ではCloudflare公式文書、2025年12月期の米国証券取引委員会（SEC）提出資料、2026年9月時点の外部統計を基準とし、数字には基準日を付ける。

## 1. Cloudflareを理解する最短ルートは、「何を売る会社か」ではなく「どこにいる会社か」である

Cloudflareを説明しようとすると、すぐ製品名が増える。CDN、DNS、DDoS対策、WAF、Bot Management（ボット管理）、Turnstile（ターンスタイル）、Workers（ワーカーズ）、Pages（ページズ）、R2（アールツー）、D1（ディーワン）、Access（アクセス）、Gateway（ゲートウェイ）、WARP（ワープ）、Tunnel（トンネル）。初見では、少し節操がない。

だが、場所から考えると急にまとまる。

普通にウェブサイトを見るとき、利用者のブラウザは、サイトを置いている元サーバー（オリジンサーバー）へ向かう。Cloudflareを典型的な設定で使うと、この間にCloudflareが入る。DNSで返されるのも元サーバーのIPアドレスではなくCloudflare側のエニーキャスト（Anycast）IPアドレスになり、通信はいったんCloudflareへ届く。

この方式は、利用者から来た要求を元サーバーの手前で受ける中継方式、すなわちリバースプロキシ（reverse proxy）である。

流れを極端に単純化すると、こうなる。

**Cloudflareなし**

利用者 → 元サーバー

**Cloudflareあり**

利用者 → Cloudflare → 元サーバー

たった一個、箱が増えただけに見える。

ところが、この箱が利用者と元サーバーの間へ入ると、できることが一気に増える。よく使う画像やファイルを途中で保存して返せば高速化になる。大量の不正通信を途中で捨てれば分散型サービス妨害攻撃（Distributed Denial of Service、DDoS）対策になる。HTTP（ハイパーテキスト転送プロトコル）要求の内容を検査すればWAFになる。人間らしいアクセスかを判定すればボット対策になる。要求が来た場所でプログラムを動かせばWorkersになる。

Cloudflareの製品が散らかって見えるのは、製品から見ているからだ。**「通信の途中にいる」という一点から見ると、むしろ同じ場所を何度も使っている。**

[Cloudflare「How Cloudflare DNS works」](https://developers.cloudflare.com/fundamentals/concepts/how-cloudflare-works/) ／ [Cloudflare「Content Delivery Network Reference Architecture」](https://developers.cloudflare.com/reference-architecture/architectures/cdn/)

## 2. 一つのIPアドレスを世界中で名乗ると、「近い入口」が勝手に選ばれる

では、世界中の利用者をどうやって「近いCloudflare」へ連れていくのか。

ここで使われるのがエニーキャスト（Anycast）である。

通常、一つのIPアドレスは一つの場所へ結びつくと考えたくなる。エニーキャストでは、複数の拠点が同じIPアドレスを名乗る。インターネットの経路制御によって、その利用者から到達しやすい拠点へ通信が流れる。

住所が一つなのに、入口が世界中にある。

Cloudflareの公式文書は2026年時点で、DNSサービスを335都市以上のデータセンターから提供すると説明している。2025年末の年次報告書では、ネットワークは125か国超・330都市超に広がり、1万3,000を超える外部ネットワークと相互接続しているとされる。数字の差は資料の基準時点が違うためで、いずれにせよ「巨大な一台のサーバー」があるわけではない。

この構造は速さだけの話でもない。東京近辺の拠点が不調なら別の拠点へ回せる。大量通信が一地点へ集中しても、入口を広く持てる。CloudflareのCDNとDDoS対策が同じネットワークから出てくるのは偶然ではなく、**近くで受けることと、広く受け止めることが同じ構造の表裏**だからである。

すると「CDN会社」と「セキュリティ会社」を分ける線が、少し怪しくなる。配送網を世界中へ張ったら、その配送網そのものが防波堤になった、と考えたほうが近い。

[Cloudflare「What is Anycast DNS?」](https://www.cloudflare.com/learning/dns/what-is-anycast-dns/) ／ [Cloudflare 2025 Form 10-K](https://www.sec.gov/Archives/edgar/data/1477333/000147733326000016/cloud-20251231.htm)

## 3. Cloudflareは「攻撃を見つける趣味」から、「攻撃を止める会社」になった

会社の始まりも、いまの構造を先取りしている。

2004年、マシュー・プリンス（Matthew Prince）とリー・ホロウェイ（Lee Holloway）は、スパム業者がどこからメールアドレスを集めているのかを追跡するProject Honey Pot（プロジェクト・ハニーポット）を始めた。ウェブサイト運営者が情報を持ち寄り、不審な行動を観測する仕組みだった。

利用者から繰り返し出た要望は単純だった。

「悪い人を見つけるだけでなく、止めてほしい」。

2009年、プリンスはハーバード・ビジネス・スクールでミシェル・ザトリン（Michelle Zatlyn）と出会う。そこからホロウェイを含む三人でCloudflareを形にし、2010年9月27日に一般公開した。

面白いのは、最初から「高速化」が主役だったわけではないことだ。公式の創業史によれば、初期の狙いはウェブサイトを守ることだったが、中継地点で不要な通信を落とし、静的ファイルをキャッシュした結果、サイトが速くなる副作用が現れた。

つまり、Cloudflareの初期史では**防御するために途中へ入ったら、速度まで改善した**。

ここに、その後16年の原型がある。通信の途中に立てば、そこで観測できる。観測できれば、選別できる。選別できれば、守れる。そこにデータを置けば、速く返せる。さらにコードを置けば、元サーバーへ行かずに処理まで終えられる。

製品を増やしたというより、「途中でできる仕事」を増やしてきたのである。

[Cloudflare「Cloudflareの歴史」](https://www.cloudflare.com/ja-jp/our-story/) ／ [Cloudflare「A Letter from Matthew Prince and Michelle Zatlyn」](https://blog.cloudflare.com/founders-letter/)

## 4. 1.1.1.1は、覚えやすい数字を取ったのではなく、「ゴミ通信が大量に来る数字」を引き受けた

Cloudflareには、もう一つ妙な話がある。

パブリックDNSリゾルバー「1.1.1.1」は、2018年4月1日に始まった。エイプリルフールである。Cloudflare自身、公開時の記事に「冗談ではない」と書いている。

日付の理由は、1.1.1.1には「1」が四つあるから、米国式の日付で4/1がちょうどよかった、というものだった。

かなり技術会社の駄洒落である。

しかし、数字の背景はもっと面白い。1.1.1.1を管理するアジア太平洋ネットワーク情報センター（Asia Pacific Network Information Centre、APNIC）は、このアドレスへ誤って流れ込む大量の不正・誤設定通信を研究したかった。ところが通常のネットワークでこのIPアドレスを公に経路広告すると、大量の通信を受け止めきれない。

Cloudflareは、自社の大規模ネットワークでその「ゴミ通信」を受ける代わりに、APNICと共同研究を行い、この覚えやすいアドレスをDNSリゾルバーとして使うことになった。

ここでも構造は同じだ。

普通なら厄介な「大量の通信」が、Cloudflareにとっては研究対象であり、ネットワーク能力を生かせる資源になる。1.1.1.1の話は、単に「無料DNSもやっています」という製品追加ではない。**大規模な通信を受け止められること自体が、新しいサービスを可能にする**という実例である。

[Cloudflare「Announcing 1.1.1.1」](https://blog.cloudflare.com/announcing-1111/) ／ [Cloudflare「DNSリゾルバー、1.1.1.1のご紹介（冗談ではなく）」](https://blog.cloudflare.com/ja-jp/dns-resolver-1-1-1-1/)

## 5. Workersで「途中」は中継地点から、プログラムを動かす場所へ変わった

ここまでのCloudflareなら、まだ「非常に大きな門番」と説明できる。

Cloudflare Workers（クラウドフレア・ワーカーズ）で話が変わる。

Workersでは、Cloudflareの世界各地のネットワーク上で利用者のプログラムを実行できる。一般的なサーバーレス（serverless）実行基盤に近いが、Cloudflareの特徴は、もともと通信が通っていた同じネットワークへ実行環境を載せた点にある。

実装にも特徴がある。WorkersはGoogle Chrome（グーグル・クローム）やNode.js（ノード・ジェイエス）でも使われるV8（ブイエイト）エンジンを利用するが、利用者ごとに重い仮想マシンを立ち上げるのではなく、アイソレート（isolate）と呼ばれる軽量な隔離環境を多数動かす。Cloudflareの説明では、この方式によって短時間で起動し、多数の利用者コードを同じ実行基盤へ載せられる。

すると、通信の途中で「見る」「止める」「キャッシュする」だけでなく、「計算する」が加わる。

認証する。HTML（ウェブページ記述言語）を書き換える。API（プログラム間連携の仕組み）を作る。画像を変換する。データベースへ問い合わせる。AI（人工知能）モデルを呼ぶ。元サーバーへ行く前に、あるいは元サーバーそのものを用意せず、処理を終える。

ここでCloudflareはCDNの延長から、アプリケーション実行基盤へ踏み込む。

2026年8月更新のCloudflare Pages（クラウドフレア・ページズ）の公式文書には、かなり象徴的な一文がある。Pagesは引き続き使えるが、**Workersが現在の主要なアプリケーション構築基盤であり、新規プロジェクトはWorkersから始める**よう案内している。

「ウェブサイトを速くする会社」が、「ウェブアプリを置く場所」にまで来た。

[Cloudflare「How Workers works」](https://developers.cloudflare.com/workers/reference/how-workers-works/) ／ [Cloudflare「Cloudflare Pages」](https://developers.cloudflare.com/pages/)

## 6. R2やZero Trustまで並べると、製品群は「通信の旅程表」に見えてくる

製品名を一つずつ覚えると大変なので、通信の旅程で分類してみる。

- **名前を見つける**：Cloudflare DNS、1.1.1.1
- **入口で受ける**：CDN、DDoS対策、WAF、ボット対策、Turnstile（ターンスタイル）
- **途中で処理する**：Workers（ワーカーズ）
- **近くに保存する**：R2（アールツー）、Workers KV（ワーカーズ・ケーブイ）、D1（ディーワン）など
- **組織の内側へ安全につなぐ**：Cloudflare One（クラウドフレア・ワン）、Access（アクセス）、Gateway（ゲートウェイ）、Tunnel（トンネル）、WARP（ワープ）

この分類はCloudflare公式の製品分類そのものではない。しかし、利用者の通信が何をしているかという観点では理解しやすい。

たとえばR2（アールツー）は、Amazon S3（アマゾン・エススリー）と互換性のあるAPI（アプリケーション・プログラミング・インターフェース）も備えるオブジェクトストレージで、2026年9月時点の料金表ではインターネットへのデータ転送料を無料としている。ストレージを単体で売るというより、Workersなど同じネットワーク上の処理と組み合わせやすい。

Cloudflare One（クラウドフレア・ワン）は、企業の社員側の通信までCloudflareへ寄せる。従来の「社内ネットワークに入ったら信用する」という境界型の考え方ではなく、利用者、端末、状況ごとに毎回確認するゼロトラストを基礎に、Access（アクセス）で社内アプリへの接続を制御し、Gateway（ゲートウェイ）で外向き通信を検査し、Tunnel（トンネル）でサーバーを公開IPアドレスなしにCloudflareへ接続する。

外からウェブサイトへ来る通信だけでなく、会社の中から外へ出る通信まで途中に入る。

ここまで来ると、Cloudflareの事業領域が広がったというより、**「通信の途中」を定義する範囲そのものが広がった**と考えたほうが腑に落ちる。

[Cloudflare「R2 Pricing」](https://developers.cloudflare.com/r2/pricing/) ／ [Cloudflare「Cloudflare One」](https://developers.cloudflare.com/cloudflare-one/) ／ [Cloudflare「Cloudflare Tunnel」](https://developers.cloudflare.com/tunnel/)

## 7. 無料枠は大盤振る舞いではなく、ネットワークを強くする仕組みの一部である

Cloudflareは無料で始められる製品が多い。

なぜそんなことができるのか。単に後から有料化する「試供品」だけでは説明しにくい。

2025年の年次報告書には、その経済性がかなり露骨に書かれている。Cloudflareは、ネットワークの遊休能力を無料枠に使うことで世界規模の利用を増やし、その規模がインターネット接続事業者（ISP）との相互接続を魅力的にし、結果としてコロケーションや帯域費用の低減にもつながる、と説明している。

無料利用者がいるほど、ただコストが増えるわけではない。ネットワークが広く使われること自体が、ネットワークの交渉力や効率へ返ってくる面がある。

さらに無料利用者は、製品改善の裾野でもあり、将来の有料顧客候補でもある。

2025年末時点でCloudflareは約33万2,000の有料顧客を190か国超に持ち、年間売上高は約21億6,800万ドル。年間10万ドル超を支払う「大口顧客」は4,298社だった。同年の売上高は前年から30％増えている。

外部のウェブ技術調査サービスW3Techs（ダブリュースリーテックス）は、2026年9月26日時点で、調査対象ウェブサイトの26.1％がCloudflareをリバースプロキシとして利用していると推計する。調査方法に依存する数字なので「ウェブの4分の1を支配している」と単純化するべきではないが、Cloudflareが一部の大企業だけの裏方ではないことは見える。

無料枠は入口であり、広告でもあり、ネットワーク規模を作る装置でもある。

Cloudflareの「無料」が面白いのは、安売り戦略というより、**規模そのものを製品性能と事業効率へ戻す循環**に組み込まれている点である。

[Cloudflare 2025 Form 10-K](https://www.sec.gov/Archives/edgar/data/1477333/000147733326000016/cloud-20251231.htm) ／ [W3Techs「Usage statistics of Cloudflare」](https://w3techs.com/technologies/comparison/cn-cloudflare)

## 8. 同じネットワークに集める強さは、そのまま「同じところで壊れる怖さ」にもなる

ここまでは、統合の強みを見てきた。

なら、逆向きの実験をする。

**同じネットワーク、同じ基盤、同じ部品を多くの製品で共有したとき、その共通部品が壊れたらどうなるか。**

2025年は、この問いにかなり具体的な答えが出た年だった。

6月12日、CloudflareではWorkers KV（ワーカーズ・ケーブイ）というキー・バリュー型ストレージの基盤障害をきっかけに、WARP（ワープ）、Access（アクセス）、Gateway（ゲートウェイ）、Images（イメージズ）、Stream（ストリーム）、Workers AI（ワーカーズAI）、Turnstile（ターンスタイル）など広範なサービスが影響を受け、障害は2時間28分続いた。Cloudflareは、直接の引き金は第三者クラウド事業者側の障害だった一方、重要な依存関係として採用した責任は自社にあると説明している。なお、この障害ではDNS、キャッシュ、通常のプロキシ、WAFなどは直接影響を受けなかった。

11月18日には、データベース権限変更をきっかけにBot Management（ボット管理）用の機能ファイルが異常に大きくなり、ネットワークの中核通信に広い障害が起きた。12月5日には、React Server Components（リアクト・サーバー・コンポーネント）の脆弱性への緊急対応中に本文解析処理の変更が問題を起こし、約25分間、Cloudflareが処理するHTTP通信の約28％に影響が出た。

Cloudflareは12月19日、これらを受けて「Code Orange: Fail Small（コード・オレンジ：小さく壊す）」と名付けた耐障害性改善計画を公表した。意図は名前どおり、障害をゼロにすると言うより、**壊れても小さく壊す**ことである。

これはCloudflareだけの特殊事情ではない。統合基盤には共通して、再利用による効率と、共有依存による障害波及が同居する。

Cloudflareの強さは「一つのネットワークで何でもできる」ことにある。その一文を裏返せば、リスクも同じ場所にある。**一つのネットワークで何でもできるほど、そのネットワークの設計品質が社会的に重要になる。**

[Cloudflare「Cloudflare service outage June 12, 2025」](https://blog.cloudflare.com/cloudflare-service-outage-june-12-2025/) ／ [Cloudflare「Cloudflare outage on November 18, 2025」](https://blog.cloudflare.com/18-november-2025-outage/) ／ [Cloudflare「Cloudflare outage on December 5, 2025」](https://blog.cloudflare.com/5-december-2025-outage/) ／ [Cloudflare「Code Orange: Fail Small」](https://blog.cloudflare.com/fail-small-resilience-plan/)

## 9. ラバランプを笑っていたら、Cloudflareの設計思想そのものだった

最初のラバランプへ戻る。

暗号では、予測できない乱数が重要になる。ところがコンピューターは、同じ入力から同じ結果を出すことを得意とする機械である。そこでCloudflareのLavaRand（ラバランド）は、ラバランプの予測しにくい動きをカメラで撮り、その画像情報をLinux（リナックス）側の乱数源などと混ぜ、暗号学的擬似乱数生成器（Cryptographically Secure Pseudorandom Number Generator、CSPRNG）の材料へ加える。

重要なのは、ラバランプだけで暗号を守っているわけではないことだ。Cloudflare自身も、LavaRandを追加の乱数源、いわば保険として説明している。誰かがカメラの前を横切れば、その人まで予測しにくさの一部になる。

最初に聞くと、これは「変なIT企業のオフィス紹介」で終わりそうな話だった。

しかし、Cloudflareを一周してから見ると意味が変わる。

Cloudflareは、インターネット上を流れる大量の通信を受け、そこから悪意を落とし、よく使うものを近くへ置き、必要ならコードを実行し、保存し、経路を選ぶ。1.1.1.1では、本来なら迷惑な誤設定通信まで研究資源にした。無料利用者が作る規模も、ネットワークの経済性へ戻している。

この会社は一貫して、**ばらばらで扱いにくいものを、途中で受け止め、構造へ変える**。

ラバランプの無秩序な動きから乱数を取るのも、その極端に小さな模型に見える。

調べる前、Cloudflareは「CDNとかWorkersをやっている会社」だった。

調べたあとでは、もう少し違って見える。

Cloudflareは、サーバーの会社というより**経路の会社**である。そして16年間、その経路を単なる道路から、防波堤、倉庫、検問所、計算機、企業ネットワークの門へと変えてきた。

クラウドは空にあるような名前をしている。

だがCloudflareを理解しようとすると、最後に残るのはむしろ、世界中のデータセンター、光回線、BGP（境界ゲートウェイプロトコル）の経路、サーバー、カメラ、そしてゆっくり形を変えるラバランプという、妙に物理的な風景である。

「クラウド」と呼ばれるものほど、実は地上のどこかに置かれている。

Cloudflareは、その当たり前を、インターネットの途中という場所で巨大化した会社なのだ。

[Cloudflare「Randomness 101: LavaRand in Production」](https://blog.cloudflare.com/randomness-101-lavarand-in-production/) ／ [Cloudflare「Chaos in Cloudflare’s Lisbon office」](https://blog.cloudflare.com/chaos-in-cloudflare-lisbon-office-securing-the-internet-with-wave-motion/) ／ [Cloudflare「ラバランプはどのようにインターネット暗号化に役立つか？」](https://www.cloudflare.com/ja-jp/learning/ssl/lava-lamp-encryption/)

## 10. 実際にCloudflareを触るなら、製品名ではなく「何を途中でやらせたいか」を決める

最後に、実務へ落とす。

Cloudflareを使い始めるとき、最初から全製品を理解する必要はない。自分の通信について、「途中で何をしてほしいか」を一つ決めればよい。

- ウェブサイトを速くし、元サーバーを攻撃から隠したい → **DNSをCloudflareへ移し、プロキシとCDNを使う**
- 小さなAPIやウェブアプリを公開したい → **Cloudflare Workers（クラウドフレア・ワーカーズ）**
- 静的サイトを新しく作りたい → Cloudflare Pages（クラウドフレア・ページズ）も使えるが、2026年時点の公式案内では**新規はWorkers（ワーカーズ）が主軸**
- 画像、バックアップ、配布ファイルなどを保存したい → **R2（アールツー）**
- 社内アプリを公開IPアドレスなしで安全につなぎたい → **Tunnel（トンネル）＋Access（アクセス）**
- 社員の外向き通信を制御したい → **Gateway（ゲートウェイ）／Cloudflare One（クラウドフレア・ワン）**
- 個人端末のDNSリゾルバーを変えたい → **1.1.1.1**

この順番なら、「Cloudflareを勉強する」必要がなくなる。

先に自分の通信を一本描き、その途中へ必要な機能だけ置く。Cloudflareという巨大な製品群は、そのとき初めて道具箱になる。

逆に、製品一覧から入ると、たぶん迷う。

Cloudflareの正体が「途中」にあるなら、使い方もまた、**自分の通信の途中を描くところから始める**のが一番自然である。

## 参考資料

- [Cloudflare「Introduction to Cloudflare」](https://developers.cloudflare.com/learning-paths/workers/concepts/cloudflare-intro/)
- [Cloudflare「How Cloudflare DNS works」](https://developers.cloudflare.com/fundamentals/concepts/how-cloudflare-works/)
- [Cloudflare「Content Delivery Network Reference Architecture」](https://developers.cloudflare.com/reference-architecture/architectures/cdn/)
- [Cloudflare「How Workers works」](https://developers.cloudflare.com/workers/reference/how-workers-works/)
- [Cloudflare「Cloudflare Pages」](https://developers.cloudflare.com/pages/)
- [Cloudflare「R2 Pricing」](https://developers.cloudflare.com/r2/pricing/)
- [Cloudflare「Cloudflare One」](https://developers.cloudflare.com/cloudflare-one/)
- [Cloudflare「Cloudflare Tunnel」](https://developers.cloudflare.com/tunnel/)
- [Cloudflare「Cloudflareの歴史」](https://www.cloudflare.com/ja-jp/our-story/)
- [Cloudflare「Announcing 1.1.1.1」](https://blog.cloudflare.com/announcing-1111/)
- [Cloudflare「Randomness 101: LavaRand in Production」](https://blog.cloudflare.com/randomness-101-lavarand-in-production/)
- [Cloudflare「Chaos in Cloudflare’s Lisbon office」](https://blog.cloudflare.com/chaos-in-cloudflare-lisbon-office-securing-the-internet-with-wave-motion/)
- [Cloudflare 2025 Form 10-K（SEC）](https://www.sec.gov/Archives/edgar/data/1477333/000147733326000016/cloud-20251231.htm)
- [W3Techs「Usage statistics of Cloudflare」](https://w3techs.com/technologies/comparison/cn-cloudflare)
