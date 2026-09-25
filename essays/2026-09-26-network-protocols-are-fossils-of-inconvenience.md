---
id: network-protocols-are-fossils-of-inconvenience
title: "ブラウザの1クリックは、半世紀分の「困った」の上を走っている"
subtitle: "ネットワークを用語集ではなく、修理の地層として読む"
created: "2026-09-26"
updated: "2026-09-26"
type: "Research Essay"
status: "完成"
tags: ["ネットワーク", "インターネット", "TCP/IP", "TLS", "DNS", "QUIC", "設計思想"]
keywords: ["Ethernet", "MACアドレス", "IPアドレス", "TCP", "UDP", "TLS 1.3", "DNS", "HTTP/3", "QUIC", "RFC"]
grow: 5
abstract: "ネットワークは、Ethernet、IP、TCP、TLS、DNSと用語を横に並べると急に難しく見える。だが「何が困って、その機能が足されたのか」で追うと、半世紀分の問題解決が積み重なった設計として見えてくる。直也テックの解説動画を入口に、RFCなどの一次資料へ戻り、MACアドレスのランダム化、TCPとUDPの単純な二分法、現行TLS 1.3、QUICとHTTP/3まで確認する。"
---

# ブラウザの1クリックは、半世紀分の「困った」の上を走っている
## ネットワークを用語集ではなく、修理の地層として読む

<!-- level:4 role:claim -->
ブラウザでページを一つ開く。その一瞬に、妙に古いものと妙に新しいものが同居している。画面には何も出ないが、裏側では「名前から行き先を探す」「別のネットワークへ運ぶ」「どのアプリへ渡す」「途中で読まれないようにする」といった別々の仕事が、必要に応じて順番に引き受けられている。

<!-- level:2 role:description -->
例えばWebアクセスでは、ドメイン名をDNS（ドメイン・ネーム・システム）で解決し、IP（インターネット・プロトコル）で相手へ届け、TCP（伝送制御プロトコル）やQUIC（クイック）のようなトランスポート機構で通信を組み立て、TLS（トランスポート層セキュリティ）で通信を保護し、その上でHTTP（ハイパーテキスト転送プロトコル）の要求と応答をやり取りする。実際にどの組み合わせになるかは環境やHTTPの版によって変わるが、一つの「ページを開く」の中に複数の責任が重なっている。

<!-- level:1 role:evidence -->
その時間幅が面白い。ロバート・メトカーフがEthernet（イーサネット）を提案したメモは1973年。DNSの基本仕様であるRFC 1034とRFC 1035は1987年。QUICのRFC 9000は2021年。現在のTCP仕様をまとめ直したRFC 9293は2022年。そしてTLS 1.3の現行仕様RFC 9846は2026年7月に公開され、2018年のRFC 8446を置き換えた。五十年以上離れた設計が、同じ通信の中で現役として隣り合う。

<!-- level:3 role:analysis -->
これは単に「古い技術がまだ残っている」という話ではない。それぞれが違う範囲の困りごとを引き受け、その境界が長く使える形だったから残っている。ネットワークを理解しにくいのは部品が多いからだが、その多さは無秩序な増築の結果だけではない。問題を分割し、別々の責任として持たせてきた結果でもある。

<!-- level:5 role:implication -->
だからネットワークは、用語集として覚えるより「過去の不便の地層」として読むと急に立体的になる。プロトコル名は暗記項目ではなく、かつて誰かが踏んだ問題に付けられた修理札なのだ。

<!-- level:1 role:source -->
[直也テック「【入門】ネットワークの仕組み。Ethernet、TCP/IP、TLS、DNS。」](https://www.youtube.com/watch?v=t0tVQkIAfos) ／ [Computer History Museum「Xerox Researcher Proposes “Ethernet”」](https://www.computerhistory.org/tdih/may/22/) ／ [RFC 1035](https://www.rfc-editor.org/info/rfc1035/) ／ [RFC 9000](https://www.rfc-editor.org/info/rfc9000/) ／ [RFC 9293](https://www.rfc-editor.org/info/rfc9293/) ／ [RFC 9846](https://www.rfc-editor.org/info/rfc9846/)

## 1. 「何の略か」より「何に困ったか」を先に聞く

<!-- level:4 role:claim -->
直也テックの動画でいちばん強いのは、Ethernet、IP、TCP、TLS、DNSを順番に説明していることより、「先に困りごとがあり、その解決として機能が足された」と見せていることである。

<!-- level:2 role:description -->
線でつながっても相手を区別できない。近くの相手を区別できても、別のネットワークへは届かない。行き先へ届いても、途中で欠けたり順番が変わったりする。届くようになっても、中身を盗み見されたくない。数字の住所で通信できても、人間は数字を覚えたくない。こう並べると、MACアドレス、IPアドレス、TCP、TLS、DNSは突然現れた略語ではなく、それぞれ別の不便を引き受けた設計になる。

<!-- level:1 role:evidence -->
RFC 1122は、インターネットのホストがアプリケーション層、トランスポート層、インターネット層、リンク層という層状のプロトコル群を実装する構成を示している。一方、1984年のソルツァー、リード、クラークによる「エンド・ツー・エンド論」は、信頼性や暗号化のような機能をどの層へ置くべきかは自明ではなく、機能の置き場所そのものが設計問題だと論じた。

<!-- level:3 role:analysis -->
ただし、「困ったから次の技術が発明された」という一本の年表として受け取ると少し危ない。実際の歴史では複数の方式が競合し、改良され、置き換わり、同時並行で育ってきた。動画の順番は歴史の完全な再現ではなく、複雑な仕組みを理解するための優れた再構成だと考えたほうが正確である。

<!-- level:5 role:implication -->
ここで学び方が変わる。新しい略語に出会ったら「これは何の略か」より先に、「これが無いと、誰が、どの範囲で、何に困るのか」を聞く。すると知識が単語から設計判断へ変わる。

<!-- level:1 role:source -->
[RFC 1122「Requirements for Internet Hosts」](https://www.rfc-editor.org/rfc/rfc1122.html) ／ [Saltzer, Reed, Clark「End-to-End Arguments in System Design」](https://web.mit.edu/saltzer/www/publications/endtoend/endtoend.pdf)

![二つのホストとルーターをまたぐIPプロトコル群。上位層は端点同士、下位層は各ホップで働くことが見える。](https://upload.wikimedia.org/wikipedia/commons/c/c4/IP_stack_connections.svg)

*図1：IPプロトコル群を「どの範囲の通信を担当するか」で描いた図。出典：[Wikimedia Commons「IP stack connections.svg」](https://commons.wikimedia.org/wiki/File:IP_stack_connections.svg)。図を見ると、層は単なる暗記順ではなく、責任範囲の違いだと分かる。*

## 2. 住所が三つあるのは、同じ「どこ？」を聞いていないから

<!-- level:4 role:claim -->
MACアドレス、IPアドレス、ポート番号が並ぶと、「住所が何個あるのか」と思う。だが三つあるのは重複ではなく、同じ「どこ？」を別の縮尺で聞いているからである。

<!-- level:2 role:description -->
リンク上では、Ethernetのような仕組みが近くの相手を識別する。IPアドレスは、複数のネットワークをまたいで到達先を表す。さらにTCPやUDPのポート番号は、到着した通信を端末内のどのサービスへ渡すかを区別する。建物、街、部屋という比喩は完全ではないが、「識別する範囲が違う」と考えるには役立つ。

<!-- level:1 role:evidence -->
IPv4で同じリンク上のIPアドレスをEthernetの48ビットアドレスへ対応付けるARP（アドレス解決プロトコル）はRFC 826で定義された。TCPの現行仕様RFC 9293も、ポート番号を使ってアプリケーションサービスを識別し、複数の通信を多重化する。さらに、MACアドレスを「機械に焼き付いた永久不変の番号」と考えるのも現在では正確ではない。RFC 9797は、プライバシー保護のためにランダム化・変更されるMACアドレスが広く使われる状況を整理している。

<!-- level:3 role:analysis -->
ここで見えてくるのは、ネットワークが「唯一の世界住所」を作ろうとしていないことだ。近距離の配送、ネットワーク間の配送、端末内の振り分けを一つの番号へ押し込まず、それぞれの範囲に合った識別子を使う。役割を分けることで、一つの層の事情が変わっても、他の層を全部作り直さずに済む。

<!-- level:5 role:implication -->
住所が多いのではない。世界を一つの縮尺で表さないことが、ネットワークの強さなのである。複雑さの一部は、むしろ複雑さを局所化するために存在する。

<!-- level:1 role:source -->
[RFC 826「An Ethernet Address Resolution Protocol」](https://www.rfc-editor.org/info/rfc826/) ／ [RFC 9293「Transmission Control Protocol」](https://www.rfc-editor.org/info/rfc9293/) ／ [RFC 9797「Randomized and Changing MAC Addresses」](https://www.rfc-editor.org/info/rfc9797/)

## 3. TCP対UDPではなく、「保証をどこへ置くか」と考える

<!-- level:4 role:claim -->
「TCPは確実だが遅い。UDPは雑だが速い」は入口として便利である。ただ、その二択を完成形として覚えると、QUICが出てきた瞬間に説明が壊れる。

<!-- level:2 role:description -->
TCPはアプリケーションに対して、信頼性があり、順序が保たれたバイト列を提供する。欠損を検出し、必要に応じて再送する。一方のUDPは、最小限のデータグラム配送機構であり、再送や順序保証を自分では提供しない。ここまでは動画の対比とほぼ同じである。

<!-- level:1 role:evidence -->
しかしRFC 8085は、UDPを使うアプリケーションが必要に応じて信頼性や輻輳制御などを実装する必要があると説明している。そしてQUICはUDP上に構築されながら、複数のストリーム、損失回復、輻輳制御、低遅延の接続確立を持つ。HTTP/3は、このQUICをトランスポートとしてHTTPの意味論を運ぶ。

<!-- level:3 role:analysis -->
つまりUDPを選ぶことは「信頼性を捨てる」と同義ではない。より正確には、どの保証をトランスポート側へ任せ、どの保証をその上の仕組みで実装するかという責任配置の選択である。QUICは、TCPで長くOS側へ置かれてきた多くの機能を、UDPの上で新しい形に組み直した。

<!-- level:5 role:implication -->
ここまで来ると、TCPとUDPの違いは性格診断ではなくなる。「安全派」と「速度派」ではなく、**必要な保証をどの層へ置けば変更しやすく、速く、壊れにくいか**という設計問題になる。

<!-- level:1 role:source -->
[RFC 8085「UDP Usage Guidelines」](https://www.rfc-editor.org/info/rfc8085/) ／ [RFC 9000「QUIC」](https://www.rfc-editor.org/info/rfc9000/) ／ [RFC 9114「HTTP/3」](https://www.rfc-editor.org/rfc/rfc9114.html)

![TCPとTLSを順に確立する構成と、QUICで接続確立を短縮する構成の比較図。](https://upload.wikimedia.org/wikipedia/commons/4/41/Tcp-vs-quic-handshake.svg)

*図2：TCP＋TLSとQUICの接続確立を比較した図。出典：[Wikimedia Commons「Tcp-vs-quic-handshake.svg」](https://commons.wikimedia.org/wiki/File:Tcp-vs-quic-handshake.svg)（CC BY-SA 4.0）。図は概念比較として有用だが、実際の往復回数は再接続、0-RTT、ネットワーク条件などで変わる。*

## 4. TLS 1.3を見ると、「層」は固定された箱ではないと分かる

<!-- level:4 role:claim -->
動画のTLS説明には、理解しやすくするための大きな単純化がある。特に「ブラウザが共通鍵を作り、サーバーの公開鍵で暗号化して送る」という流れは、現代のTLS 1.3をそのまま説明したものではない。

<!-- level:2 role:description -->
TLS 1.3では、通常は（楕円曲線）ディフィー・ヘルマン系の一時鍵共有や事前共有鍵を使って共有秘密を導出し、そこからハンドシェイクやアプリケーション通信に使う鍵を生成する。サーバー証明書は主に相手の認証に使われる。TLS 1.2以前に存在したRSA鍵輸送のように、クライアントが作った秘密をサーバーのRSA公開鍵でそのまま包んで渡す方式はTLS 1.3にはない。

<!-- level:1 role:evidence -->
2026年7月公開のRFC 9846はTLS 1.3の現行仕様で、RFC 8446を置き換えた。仕様は、鍵共有から得られる秘密とHKDF（HMACベース鍵導出関数）を使って複数段階のトラフィック秘密を導出する。またHTTP/3では、HTTPはQUIC上で動き、QUIC自身がTLS 1.3のハンドシェイクを利用する。したがって現代のWebを常に「TCP→TLS→HTTP」という独立した三段として描くこともできない。

<!-- level:3 role:analysis -->
ここが面白い。層は物理的に積まれた箱ではなく、「この責任はここが引き受ける」という契約に近い。新しいプロトコルは、その契約を壊さずに実装の境界を組み替えることがある。QUICはその典型で、従来TCPとTLSに分かれて見えた接続確立の一部を密接に統合した。

<!-- level:5 role:implication -->
ネットワーク図を階段として覚えるだけでは、新しい技術ほど例外に見える。責任分担として理解すると、新技術は例外ではなく「同じ目的を別の境界で実装したもの」として読める。

<!-- level:1 role:source -->
[RFC 9846「The Transport Layer Security (TLS) Protocol Version 1.3」](https://www.rfc-editor.org/info/rfc9846/) ／ [RFC 9001「Using TLS to Secure QUIC」](https://www.rfc-editor.org/info/rfc9001/) ／ [RFC 9114「HTTP/3」](https://www.rfc-editor.org/rfc/rfc9114.html)

## 5. DNSは電話帳というより、世界規模の「分担された命名台帳」である

<!-- level:4 role:claim -->
DNSを「インターネットの電話帳」と呼ぶ比喩は、名前をIPアドレスへ変換する入口としては強い。ただし電話帳だと思い続けると、DNSのいちばん重要な工夫である「管理を分ける」が見えにくい。

<!-- level:2 role:description -->
DNSの名前空間は階層構造になっており、ルート、トップレベルドメイン、その下のドメインへと管理権限を委譲できる。問い合わせる側も毎回ルートから全部たどるわけではなく、リゾルバーとキャッシュを使って以前得た情報を再利用する。TTL（生存時間）は、そのキャッシュをいつまで使うかを決める。

<!-- level:1 role:evidence -->
RFC 1034は、DNSの目的として巨大で頻繁に変わる名前空間を分散して管理する必要性を説明し、ゾーンによる管理責任の分割を設計に含めている。RFC 1035は、権威データとキャッシュされたデータを区別し、キャッシュが繰り返しの問い合わせを効率化する仕組みを定義する。DNSは「一冊の巨大な電話帳」を高速検索しているのではない。

<!-- level:3 role:analysis -->
この見方に変えると、「DNSを変えたのにすぐ反映されない」ことも単なる不具合ではなくなる。分散した世界で、毎回全員が最新情報を取りに行けば負荷が高すぎる。そこで一定時間は古い回答を使ってよい、という取引をしている。速度と更新即時性の交換条件がTTLとして表に出ている。

<!-- level:5 role:implication -->
DNSが解いているのは「人間が数字を覚えられない」だけではない。**世界中の名前を、中央の一人が管理しなくても壊れにくく運用するにはどうするか**という組織設計の問題まで解いている。

<!-- level:1 role:source -->
[RFC 1034「Domain Names - Concepts and Facilities」](https://www.rfc-editor.org/info/rfc1034/) ／ [RFC 1035「Domain Names - Implementation and Specification」](https://www.rfc-editor.org/info/rfc1035/)

![DNSのルート、トップレベルドメイン、下位ドメインへ続く階層構造を示した図。](https://upload.wikimedia.org/wikipedia/commons/f/f2/Structure_DNS.jpg)

*図3：DNSの階層を視覚化した図。出典：[Wikimedia Commons「Structure DNS.jpg」](https://commons.wikimedia.org/wiki/File:Structure_DNS.jpg)。個々の名前を一か所で管理するのではなく、木構造に沿って責任を委譲するという発想が見える。*

## 6. 1クリックを本気で分解すると、ネットワークは「一本道」ではなくなる

<!-- level:4 role:claim -->
ここで少しやりすぎてみる。ブラウザで一つのHTTPSページを開く行為を、動画の用語を覚えるためではなく、「誰がどの責任を引き受けたか」という観点で分解する。

<!-- level:2 role:description -->
実際の通信はOS、ブラウザ、キャッシュ、IPv4/IPv6、HTTPの版、VPN、CDNなどで変わる。したがって以下はパケットキャプチャの実測ではなく、典型的なWebアクセスを責任の受け渡しとして追う思考実験である。

<!-- level:1 role:evidence -->
1. ブラウザやOSは、まず名前解決の結果が手元にあるかを見る。無ければDNSリゾルバーへ問い合わせる。
2. 宛先IPが分かると、端末は同じリンク内か外かを判断し、必要ならデフォルトゲートウェイへ渡す。ローカルリンクではARPやIPv6の近隣探索が次の相手を特定する。
3. ルーター群は宛先IPを基準に、パケットを次の経路へ渡す。インターネット全体では複数の管理主体の経路制御がつながる。
4. HTTP/1.1やHTTP/2なら通常TCP接続とTLSを組み合わせる。HTTP/3ならQUIC上でTLS 1.3を使う。
5. 暗号化された接続の上でHTTPの要求が届く。相手側ではCDN、リバースプロキシ、ロードバランサーなどが、実際に処理するサーバーを選ぶことがある。
6. 応答は逆方向へ戻るが、必ずしも往路と完全に同じ経路を通るとは限らない。ブラウザは受け取ったHTMLだけでなく、追加の画像、CSS、JavaScriptなどについてさらに通信を行う。

<!-- level:3 role:analysis -->
こうして並べると、動画の最後にロードバランサーが登場する理由も少し違って見える。そこでは話が「通信規約」から「多数の利用者をどう受け止めるか」というシステム構成へ広がっている。ネットワークを学ぶことは、線の中を流れるパケットだけでなく、責任をどこで受け渡すかを見ることでもある。

<!-- level:5 role:implication -->
そして障害調査も同じ形になる。「ネットが壊れた」では大きすぎる。名前は引けたか。隣へ渡せたか。経路はあるか。接続は確立したか。暗号化は成立したか。HTTPは返ったか。**理解とは、巨大な一つの失敗を、担当者の違う小さな失敗へ分けられるようになること**なのだと思う。

<!-- level:1 role:source -->
[RFC 1122「Requirements for Internet Hosts」](https://www.rfc-editor.org/rfc/rfc1122.html) ／ [RFC 4861「Neighbor Discovery for IP version 6」](https://www.rfc-editor.org/info/rfc4861/) ／ [RFC 9114「HTTP/3」](https://www.rfc-editor.org/rfc/rfc9114.html)

## 7. 新しいプロトコルを見たら、「それ以前は何が面倒だったか」を探す

<!-- level:4 role:claim -->
最初は、ネットワークは略語が異常に多い分野に見える。実際、多い。しかも三文字や四文字ばかりで、初見への優しさはあまりない。

<!-- level:2 role:description -->
それでも、Ethernet、IP、TCP、TLS、DNS、QUICを「順番に暗記する対象」から「別々の困りごとを引き受ける契約」へ置き換えると、見え方はかなり変わった。MACアドレスは必ずしも永久不変ではない。UDPの上にも信頼性は作れる。TLS 1.3では昔の鍵交換の説明がそのまま通用しない。DNSは単なる名前変換以上に、管理を分散する仕組みである。

<!-- level:1 role:evidence -->
RFCの冒頭には、その仕様が何を定義し、何を置き換え、どの問題範囲を扱うかが書かれていることが多い。RFC 9293は四十年以上にわたるTCPの更新を集約した文書であり、RFC 9846は2026年にTLS 1.3の仕様を改めて統合した。プロトコルは完成品として凍るのではなく、使われながら修理され続ける。

<!-- level:3 role:analysis -->
だから「昔の不便を調べる」という動画の最後の助言は、そのまま使える。ただし、そこに一つだけ足したい。「それは本当に一本道の歴史だったのか」「今の仕様では責任の置き場所が変わっていないか」まで見る。すると入門の物語を壊さず、入門の先へ進める。

<!-- level:5 role:implication -->
次にブラウザでページを開いても、見た目は何も変わらない。ただ、その一クリックの下には、誰かが昔「これは困る」と言った跡が何層も残っている。ネットワークは見えない配線ではなく、**困りごとを分解し、責任を置き直し続けてきた設計の化石層**に見えるようになった。

<!-- level:1 role:source -->
[RFC Editor](https://www.rfc-editor.org/) ／ [IETF Datatracker](https://datatracker.ietf.org/)

---

### 主要参考資料

- [直也テック「【入門】ネットワークの仕組み。Ethernet、TCP/IP、TLS、DNS。」](https://www.youtube.com/watch?v=t0tVQkIAfos)
- [RFC 1122「Requirements for Internet Hosts」](https://www.rfc-editor.org/rfc/rfc1122.html)
- [RFC 826「An Ethernet Address Resolution Protocol」](https://www.rfc-editor.org/info/rfc826/)
- [RFC 1034「Domain Names - Concepts and Facilities」](https://www.rfc-editor.org/info/rfc1034/)
- [RFC 1035「Domain Names - Implementation and Specification」](https://www.rfc-editor.org/info/rfc1035/)
- [RFC 8085「UDP Usage Guidelines」](https://www.rfc-editor.org/info/rfc8085/)
- [RFC 9000「QUIC」](https://www.rfc-editor.org/info/rfc9000/)
- [RFC 9001「Using TLS to Secure QUIC」](https://www.rfc-editor.org/info/rfc9001/)
- [RFC 9114「HTTP/3」](https://www.rfc-editor.org/rfc/rfc9114.html)
- [RFC 9293「Transmission Control Protocol」](https://www.rfc-editor.org/info/rfc9293/)
- [RFC 9797「Randomized and Changing MAC Addresses」](https://www.rfc-editor.org/info/rfc9797/)
- [RFC 9846「The Transport Layer Security (TLS) Protocol Version 1.3」](https://www.rfc-editor.org/info/rfc9846/)
- [Saltzer, Reed, Clark「End-to-End Arguments in System Design」](https://web.mit.edu/saltzer/www/publications/endtoend/endtoend.pdf)
