---
id: e2ee-trust-boundary-end-to-end-encryption
title: "「暗号化されている」と「E2EE」は何が違うのか"
subtitle: "サーバーは運べる。でも読めない――End-to-End Encryptionを「誰を信用するか」から理解する"
created: "2026-08-28"
updated: "2026-08-28"
type: "Learning Paper"
status: "完成"
tags: ["E2EE", "暗号化", "セキュリティ", "プライバシー", "Signal", "WhatsApp", "iMessage", "RCS"]
keywords: ["End-to-End Encryption", "E2EE", "TLS", "encryption", "decryption", "public key", "private key", "metadata", "forward secrecy", "post-compromise security", "Messaging Layer Security", "MLS"]
favorite: 5
grow: 5
abstract: "『暗号化されている』通信とE2EEは、同じではない。違いは暗号の強さより、途中のサーバーが復号できるかどうかにある。本稿ではAlice→Server→Bobという最小モデルから、TLSとの違い、鍵の役割、Signal・WhatsApp・iMessage・RCSの実例、メタデータや端末侵害などE2EEでも守れない範囲までを整理する。E2EEを『強い暗号』ではなく、『信用しなければならない相手を減らす設計』として捉え直す。"
---

# 「暗号化されている」と「E2EE」は何が違うのか
## サーバーは運べる。でも読めない――End-to-End Encryptionを「誰を信用するか」から理解する

「このメッセージアプリ、暗号化されているから安全らしい」

そう聞くと、なんとなく安心する。

でも、ここには一つ大きな落とし穴がある。

**「通信が暗号化されている」ことと、「サービス運営会社にも読めない」ことは同じではない。**

この違いを作るのが、E2EE――**End-to-End Encryption（エンドツーエンド暗号化）**だ。

名前だけ見ると、暗号をさらに強くした技術のように感じる。

実際には、E2EEを理解するうえで大事なのは「暗号がどれだけ複雑か」よりも、**誰が復号できる設計になっているか**である。

つまりこれは、暗号技術の話であると同時に、**誰を信用しなくてもよいようにするかというシステム設計の話**でもある。

## 1. まず、普通の「暗号化」を考える

登場人物を三つだけにする。

```text
Alice → Server → Bob
```

AliceがBobへ「明日10時に会おう」と送る。

インターネット上で平文のまま送れば、途中で通信を盗み見た人に内容を読まれる可能性がある。

そこで現在のWebサービスでは、通常 **TLS（Transport Layer Security）** などを使って通信経路を暗号化する。

ざっくり書けばこうなる。

```text
Alice
  ↓ 暗号化された通信
Server
  ↓ 暗号化された通信
Bob
```

これだけでも非常に重要だ。

たとえばカフェのWi-Fiを通る途中で誰かが通信を盗み見ても、中身をそのまま読むことは難しくなる。

ただし、ここで見落としやすい点がある。

**Server自身は内容を読める設計かもしれない。**

AliceとServerの間が暗号化され、ServerとBobの間も暗号化されていても、Serverの中で一度平文に戻して処理するなら、運営会社は技術的には本文へアクセスできる。

つまり、

**「途中の道路では見えない」ことと、「配送センターにも見えない」ことは別問題**なのである。

## 2. E2EEでは、暗号化の終点が変わる

E2EEでは、暗号化の範囲をServerで終わらせない。

概念的にはこうなる。

```text
Aliceの端末
  ↓ 本文を暗号化
  ↓
Server
  ↓ 暗号文のまま配送
  ↓
Bobの端末
  ↓ 本文を復号
```

Serverはメッセージを受け取り、宛先へ運ぶことはできる。

しかし、**本文を読むための秘密を持たないように設計する。**

IETFのMessaging Layer Security（MLS）Architectureは、end-to-endという考え方について、メッセージングシステムの運営者が悪意を持った場合であっても、利用者が一定のセキュリティを得られることを中心的な発想として説明している。

[IETF RFC 9750: The Messaging Layer Security (MLS) Architecture](https://datatracker.ietf.org/doc/html/rfc9750)

ここがE2EEの核心だ。

**「運営会社が読まないと約束している」のではなく、「運営会社が本文を読む能力そのものを持ちにくくする」。**

信頼を、規約や善意だけに置かない。

設計でも制約する。

## 3. 「暗号化」と「E2EE」の違いは、鍵を誰が持つか

暗号化されたデータは、そのままでは読めない。

読むためには、復号に必要な**鍵（key）**が必要になる。

ここでは仕組みを単純化して考える。

Bobには、外に配ってよい情報と、自分だけが保持する秘密がある。

公開鍵暗号の考え方では、前者を **public key（公開鍵）**、後者を **private key（秘密鍵）** と呼ぶ。

AliceはBob側の公開情報を使って、安全な通信に必要な鍵を確立する。

そして実際のメッセージ本文は、多くの場合、効率のよい共通鍵暗号を組み合わせて暗号化される。

重要なのはアルゴリズムの細部ではない。

**本文を読める秘密が、Serverだけを見ても揃わないようにする。**

これがE2EEの設計思想だ。

だから「公開鍵で全部のメッセージを暗号化している」と覚えるより、

> **鍵の管理をendpoint側へ寄せ、配送するServerと本文を読む権限を分離する**

と理解した方が正確である。

endpointとは、この場合AliceやBobが実際に使っているスマートフォンやPCなどの端末を指す。

## 4. なぜ、そこまでして運営会社にも読めなくするのか

「ちゃんとした会社なら、勝手にメッセージを読まないのでは？」

これは自然な疑問だ。

しかしセキュリティでは、**善意だけではなく、事故や侵害まで含めて考える。**

サーバーに平文が存在すれば、運営会社の社員が読むつもりがなくても、

- サーバーが侵害される
- 内部権限が悪用される
- 設定ミスでデータが露出する
- 法的な要求によって本文の提出を求められる

といった可能性が生まれる。

E2EEは、Server側に本文を復号する能力を持たせないことで、この攻撃面を減らそうとする。

IETFのMLSも、配送サービス自体が完全に侵害された場合でも、配送サービスが本文を読めないことを重要な保証としている。

ただし、侵害されたServerはメッセージを配送しないなどの妨害はできる。

つまり、E2EEは「Serverを無力化する」ものではない。

**Serverに必要な仕事はさせるが、必要以上の権限を渡さない。**

この考え方は、セキュリティ設計全般に通じる。

## 5. Signal、WhatsApp、iMessage、Google Messagesではどうなっているか

E2EEは抽象論ではなく、日常的なメッセージングですでに広く使われている。

### Signal

Signalは最も分かりやすい例の一つだ。

Signalは、メッセージと通話が**常にE2EE**であり、プライバシーはオプションモードではなくサービスの基本動作だと説明している。

[Signal Support: Is it private? Can I trust it?](https://support.signal.org/hc/en-us/articles/360007320391-Is-it-private-Can-I-trust-it)

Signal自身がメッセージ本文を読めないことを前提に設計している。

### WhatsApp

WhatsAppも、個人のメッセージと通話を**デフォルトでE2EE**としている。

Metaは2026年にも、WhatsAppの個人メッセージと通話はdefault end-to-end encryptionで保護されていると改めて説明している。

[Meta: Fighting Spyware — An Update From WhatsApp](https://about.fb.com/news/2026/06/fighting-spyware-an-update-from-whatsapp/)

ただし、ここで面白いのが**backup**だ。

チャットそのものがE2EEでも、クラウドへ保存したバックアップが同じ仕組みで保護されているとは限らない。

WhatsAppでは、Google AccountやiCloud上のバックアップについてもE2EEを追加できる仕組みが用意されているが、これはチャット配送とは別の保護レイヤーとして考える必要がある。

[WhatsApp Help Center: About end-to-end encrypted backup](https://faq.whatsapp.com/490592613091019/)

### iMessage

iMessageはApple製デバイス間のメッセージをE2EEで保護している。

Appleは、メッセージ内容や添付ファイルについてApple自身も復号できないと説明している。

[Apple Platform Security: iMessage security overview](https://support.apple.com/guide/security/imessage-security-overview-secd9764312f/web)

ここで注意したいのは、**iPhoneの「メッセージ」アプリを使っていることと、iMessageを使っていることは同じではない**点だ。

同じ画面でも、通信方式によってセキュリティの性質は変わる。

### Google Messages / RCS

Google Messagesでは、対応するRCSチャットがE2EEになる。

Google Messages利用者同士の対応RCS会話ではE2EEが自動適用され、SMS/MMSにはE2EEを利用できない。

[Google Messages Help: Use end-to-end encryption in Google Messages](https://support.google.com/messages/answer/10252671)

さらに2026年5月、AppleとGoogleは**AndroidとiPhoneをまたぐRCSのE2EE**をベータで順次展開し始めた。

iOS 26.5、対応キャリア、最新のGoogle Messagesなど条件があり、会話画面の鍵アイコンがE2EE適用を確認する実用的な手掛かりになる。

[Apple: End-to-end encrypted RCS messaging begins rolling out today in beta](https://www.apple.com/newsroom/2026/05/end-to-end-encrypted-rcs-messaging-begins-rolling-out-today-in-beta/)

[Google: End-to-end encrypted RCS messaging begins rolling out today](https://blog.google/products-and-platforms/platforms/android/android-ios-end-to-end-encrypted-rcs-messaging/)

この例から分かるのは、**「どのアプリを使っているか」だけではE2EEかどうかを判断できない**ということだ。

相手、通信方式、OS、アプリのバージョン、提供状況によって変わる場合がある。

## 6. E2EEでも、見えなくならないものがある

ここが一番重要かもしれない。

E2EEは強力だが、**「何もかも秘密になる魔法」ではない。**

### endpointそのもの

Aliceのスマートフォンが乗っ取られていたらどうなるか。

メッセージは送信前にはAliceの画面で読める。

Bobの端末でも、復号した後は読める。

つまり、端末を完全に支配した攻撃者は、暗号を破らなくても平文を盗める可能性がある。

IETFのMLS Architectureも、完全に端末が侵害された場合、アプリが保持する平文を攻撃者が直接取得できることを明示している。

E2EEの“End”は、守られた要塞ではない。

**むしろEndが攻撃されたら、暗号の外側から読まれる。**

### 相手本人

Bobがスクリーンショットを撮る。

別の人に転送する。

画面を撮影する。

E2EEには止められない。

E2EEが保証するのは、配送途中の第三者から内容を守ることだ。

受信者本人を信用するかどうかは別問題である。

### phishingやなりすまし

偽サイトに自分から情報を入力したら、暗号化通信でも情報は相手へ届く。

E2EEは「正しい相手と話しているか」という認証を補助する仕組みと組み合わせる必要がある。

SignalのSafety Numberや、Google MessagesのKey Verifierのような機能は、この問題に関係している。

### metadata

本文が読めなくても、通信に関する周辺情報まで全部消えるわけではない。

たとえばシステムによっては、

- 誰がサービスを使っているか
- いつ接続したか
- どの端末を使っているか
- メッセージの配送に必要な宛先情報

などが処理される。

これらをまとめて**metadata（メタデータ）**と呼ぶことがある。

E2EEは主に**content（本文）**の秘密を守る仕組みであり、metadata protectionは別に設計しなければならない。

「本文が暗号化されている」からといって、「通信した事実まで誰にも分からない」とは限らない。

## 7. バックアップは、もう一つの出口になる

E2EEされたメッセージでも、Bobの端末では最終的に平文として表示される。

そこで履歴をクラウドへバックアップすれば、新しい経路が生まれる。

```text
Alice → E2EE → Bob
                  ↓
               Backup
```

このBackupが別の鍵管理で保護されているなら、チャット本体のE2EEだけを見て安全性を判断することはできない。

これはセキュリティでよくある話だ。

**本線を強くしても、別の出口が弱ければ、そこが新しい攻撃面になる。**

WhatsAppがバックアップ用E2EEをチャット配送とは別に提供しているのは、この違いを理解するよい例である。

## 8. Forward Secrecy――今日の鍵が漏れても、昨日まで全部読まれないために

ここから少しだけ発展する。

仮に、暗号化に使う秘密の鍵をずっと同じものにしていたとする。

攻撃者が過去の暗号文を大量に保存していて、ある日その鍵を盗んだらどうなるか。

過去の通信までまとめて復号できてしまうかもしれない。

そこで重要になるのが **Forward Secrecy（前方秘匿性）** だ。

考え方は、鍵を固定物として扱わず、時間とともに更新し、使い終わった過去の秘密を捨てていくことにある。

SignalのDouble Ratchet Algorithmは、過去の鍵が後から推測されにくくなるforward securityと、侵害後に新しい秘密を取り込んで将来の安全性を回復するbreak-in recoveryを重要な性質としている。

[Signal: The Double Ratchet Algorithm](https://signal.org/docs/specifications/doubleratchet/)

つまり現代的なE2EEは、単に

「今のメッセージを暗号化する」

だけではない。

**鍵がいつか漏れる可能性まで考え、その被害を時間方向に閉じ込めようとしている。**

## 9. Post-Compromise Security――一度破られたら永久に終わり、にしない

さらに一歩進むと、**Post-Compromise Security（PCS）**という考え方がある。

ある時点で端末内の秘密が盗まれたとしても、その後に安全な更新が行われ、攻撃者が端末へのアクセスを失えば、将来の通信について安全性を回復できるようにする。

IETFのMLSは、グループメッセージングでもforward secrecyとpost-compromise securityを重要な目標としている。

ここがおもしろい。

セキュリティは「絶対に侵入されない城」を作る方向だけではない。

**侵入される可能性を認めたうえで、過去と未来への被害拡大を抑える。**

そういう設計もある。

## 10. E2EEは「暗号の強さ」ではなく「Trust Boundary」の設計

ここまで来ると、E2EEの見え方が少し変わる。

最初は「すごく強い暗号方式」に見えた。

でも核心はそこではない。

Alice、Bob、Server、Cloud Backup、端末OS、ネットワーク事業者。

システムには、たくさんの登場人物がいる。

その中で、**本文を守るために誰を信用しなければならないのか。**

普通のサーバー型暗号化では、Serverが復号できるなら、Serverも信用範囲に含まれる。

E2EEでは、その範囲をできるだけendpointへ縮める。

これを **Trust Boundary（信頼境界）** の問題として見ることができる。

```text
通常の暗号化
[ Alice ] → [ Server ] → [ Bob ]
               ↑
        本文を読める可能性

E2EE
[ Alice ] → Server → [ Bob ]
    ↑                   ↑
   復号                 復号
```

Serverをなくしたわけではない。

Serverを全面的に信用する必要を減らした。

**E2EEの価値は、「信用できる会社を探す」ことだけに頼らず、「そもそも信用しなければならない相手を減らす」ことにある。**

## 11. 「安全ですか？」ではなく「何から守りますか？」と聞く

セキュリティの話では、つい二択で考えたくなる。

安全か、危険か。

E2EEか、そうではないか。

しかし、本当はもう少し細かい。

E2EEは、通信内容を配送途中の第三者やサービス運営者から守るうえで非常に強力な仕組みだ。

一方で、

- 端末のマルウェア
- 相手本人による漏洩
- phishing
- metadata
- backup
- アカウント乗っ取り

まで自動的に解決してくれるわけではない。

だから、セキュリティを見るときの問いは、

**「これは安全か？」**

だけでは足りない。

**「誰から、何を、どこまで守る設計なのか？」**

と聞く。

E2EEは、その問いを理解するための格好の教材でもある。

暗号化とは、データを読めない形にする技術である。

E2EEとは、その技術を使って、**誰に読ませないかまでシステムとして決める設計**である。

サーバーは運べる。

でも、読めない。

その小さな違いの中に、現代のプライバシー設計のかなり大きな思想が入っている。

---

## 関連

以前のMyEssaysでは、Cloudflare Access・Workers・D1・Web Cryptoを組み合わせて「自分しか読めないメモ」をどう作るかを整理した。

[E2EEを実装側から見る：自分しか読めないメモを、どう作るか](https://silovar-uk.github.io/myessays/#/essay/private-memo-cloudflare-zero-trust-e2ee)

今回の記事は、その中に出てきたE2EEという考え方だけを切り出し、より一般的なメッセージングの仕組みとして掘り下げたものになる。

## 参考資料

- [IETF RFC 9750 — The Messaging Layer Security (MLS) Architecture](https://datatracker.ietf.org/doc/html/rfc9750)
- [IETF RFC 9420 — The Messaging Layer Security (MLS) Protocol](https://datatracker.ietf.org/doc/html/rfc9420)
- [Signal Support — Is it private? Can I trust it?](https://support.signal.org/hc/en-us/articles/360007320391-Is-it-private-Can-I-trust-it)
- [Signal — The Double Ratchet Algorithm](https://signal.org/docs/specifications/doubleratchet/)
- [Apple Platform Security — iMessage security overview](https://support.apple.com/guide/security/imessage-security-overview-secd9764312f/web)
- [Apple — End-to-end encrypted RCS messaging begins rolling out today in beta](https://www.apple.com/newsroom/2026/05/end-to-end-encrypted-rcs-messaging-begins-rolling-out-today-in-beta/)
- [Google Messages — Use end-to-end encryption in Google Messages](https://support.google.com/messages/answer/10252671)
- [Google — End-to-end encrypted RCS messaging begins rolling out today](https://blog.google/products-and-platforms/platforms/android/android-ios-end-to-end-encrypted-rcs-messaging/)
- [WhatsApp Help Center — About end-to-end encrypted backup](https://faq.whatsapp.com/490592613091019/)
- [Meta — Fighting Spyware: An Update From WhatsApp](https://about.fb.com/news/2026/06/fighting-spyware-an-update-from-whatsapp/)
