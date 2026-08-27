---
id: e2ee-trust-boundary-end-to-end-encryption
title: "「暗号化されている」と「E2EE」は何が違うのか"
subtitle: "Why end-to-end encryption is really about who must be trusted"
mode: "english-mix"
english_ratio: 0.45
mix_unit: "sentence"
---

# 「暗号化されている」と「E2EE」は何が違うのか
## Why end-to-end encryption is really about who must be trusted

**“Encrypted” and “end-to-end encrypted” are not the same thing.**

「暗号化されています」と聞くと、それだけで誰にも読まれないような感じがする。

But encryption can protect different parts of a system.

通信経路だけを守る暗号化もあれば、サービス運営会社にも本文を読めないようにする暗号化もある。

The difference is not only about how strong the cipher is.

**The important question is: who has the power to decrypt the message?**

この問いから見ると、E2EE――End-to-End Encryption――の仕組みがかなり分かりやすくなる。

## 1. Start with ordinary encrypted communication

Imagine only three actors.

```text
Alice → Server → Bob
```

Alice sends Bob a message: “See you at 10 tomorrow.”

平文のままインターネットを流せば、途中で通信を盗み見られたときに本文を読まれる危険がある。

So modern services normally protect network connections with technologies such as **TLS — Transport Layer Security**.

概念的にはこうなる。

```text
Alice
  ↓ encrypted connection
Server
  ↓ encrypted connection
Bob
```

This is extremely important protection.

カフェのWi-Fiなどで途中の通信を盗み見られても、内容を簡単には読めなくなる。

But there is a catch.

**The server may still be able to read the message.**

AliceとServerの間、ServerとBobの間がそれぞれ暗号化されていても、Server内部で一度復号する設計なら、サービス側は本文を扱える。

So “encrypted while travelling” does not automatically mean “unreadable by the service provider.”

道路上では箱が閉じていても、配送センターでは開けられるかもしれない。

## 2. E2EE moves the endpoint of encryption

With end-to-end encryption, the encryption does not terminate at the server.

```text
Alice's device
  ↓ encrypt
  ↓
Server
  ↓ carry ciphertext
  ↓
Bob's device
  ↓ decrypt
```

The server still has a job.

メッセージを受け取り、どこへ届けるか判断し、Bobへ配送する必要がある。

But the server should not have the secret needed to read the message content.

これがE2EEの中心的な発想だ。

The IETF’s architecture for Messaging Layer Security describes “end-to-end” security as protection that users can retain even when the messaging system operator acts maliciously.

[IETF RFC 9750: The Messaging Layer Security (MLS) Architecture](https://datatracker.ietf.org/doc/html/rfc9750)

That is a stronger idea than “the company promises not to read your messages.”

**E2EE tries to remove the company’s technical ability to read them in the first place.**

善意だけに頼るのではなく、設計そのものに制約を入れる。

## 3. The key question is literally about keys

Encrypted data needs a **key** to be decrypted.

暗号技術の細部はかなり複雑だが、入門としては「本文を読める秘密を誰が持っているか」を見ればよい。

Public-key cryptography uses a pair of concepts: a **public key** and a **private key**.

公開鍵は外へ渡せる情報で、秘密鍵は本人側で守る情報だ。

In real E2EE protocols, public-key techniques are often combined with efficient symmetric encryption and changing session keys.

つまり「公開鍵で毎回本文をそのまま暗号化する」と覚える必要はない。

The more useful mental model is this:

> **Keep the secrets needed to read the content at the endpoints, not at the delivery server.**

ここでいうendpointは、AliceやBobが使うスマートフォンやPCなどの端末だ。

The server can deliver the package without owning the key to open it.

## 4. Why make even the service provider unable to read it?

You might ask: “If the company is trustworthy, why does this matter?”

かなり自然な疑問だと思う。

Security design does not consider only bad intentions; it also considers compromise, mistakes, and future pressure.

Server側に平文があれば、運営者が普段読んでいなくても、

- the server can be hacked
- internal privileges can be abused
- data can be exposed by configuration mistakes
- the provider may receive legal demands for content

といった別の経路が生まれる。

E2EE reduces that attack surface by giving the server less power over message content.

IETF MLS is explicitly designed so that even a compromised delivery service should not be able to read protected messages.

ただし、悪意あるServerが配送を止めることまでは防げない。

**E2EE does not make the server powerless. It gives the server only the power it needs.**

これは暗号の話であると同時に、権限設計の話でもある。

## 5. What do real messaging services do?

### Signal

Signal is one of the clearest examples.

Signalは、メッセージと通話が常にE2EEであり、プライバシーはoptional modeではなく通常動作そのものだと説明している。

[Signal Support: Is it private? Can I trust it?](https://support.signal.org/hc/en-us/articles/360007320391-Is-it-private-Can-I-trust-it)

**The service delivers conversations without needing access to their content.**

### WhatsApp

WhatsApp also protects personal messages and calls with end-to-end encryption by default.

Metaは2026年のセキュリティ更新でも、この点を改めて確認している。

[Meta: Fighting Spyware — An Update From WhatsApp](https://about.fb.com/news/2026/06/fighting-spyware-an-update-from-whatsapp/)

But backups show why “E2EE” needs careful boundaries.

チャット配送がE2EEでも、クラウドに作るバックアップは別の保存経路だ。

WhatsApp therefore provides a separate option for end-to-end encrypted backups on Google Account or iCloud.

[WhatsApp Help Center: About end-to-end encrypted backup](https://faq.whatsapp.com/490592613091019/)

**Protecting the live conversation and protecting the backup are two different security problems.**

### iMessage

iMessage protects messages between Apple devices with E2EE.

Appleは、iMessageの内容や添付ファイルをApple自身が復号できないと説明している。

[Apple Platform Security: iMessage security overview](https://support.apple.com/guide/security/imessage-security-overview-secd9764312f/web)

But using Apple’s Messages app does not always mean you are using iMessage.

同じ画面からSMS、MMS、RCSなど別方式を使う場合もある。

**The app icon alone does not tell you the security model.**

### Google Messages and RCS

Google Messages automatically applies E2EE to supported RCS conversations between Google Messages users.

SMSやMMSはE2EEではない。

[Google Messages Help: Use end-to-end encryption in Google Messages](https://support.google.com/messages/answer/10252671)

There is also an important 2026 update.

2026年5月、AppleとGoogleはAndroidとiPhoneをまたぐRCSのE2EEをベータで順次展開し始めた。

The rollout requires supported software and carriers, and the lock icon in a conversation is a practical signal that E2EE is active.

[Apple: End-to-end encrypted RCS messaging begins rolling out today in beta](https://www.apple.com/newsroom/2026/05/end-to-end-encrypted-rcs-messaging-begins-rolling-out-today-in-beta/)

[Google: End-to-end encrypted RCS messaging begins rolling out today](https://blog.google/products-and-platforms/platforms/android/android-ios-end-to-end-encrypted-rcs-messaging/)

So the useful question is not simply “Does this app support E2EE?”

**Ask whether this particular conversation is end-to-end encrypted under the current conditions.**

## 6. E2EE does not hide everything

This is the most important limitation.

**E2EE is powerful, but it is not magic.**

### The endpoint can still be attacked

Before Alice sends a message, Alice can read it on her screen.

Bobも復号後の本文を画面で読める。

If malware completely controls one of those devices, the attacker may steal plaintext without breaking the encryption at all.

IETF MLS explicitly discusses endpoint compromise as a separate security problem.

**Attack the end, and you may bypass the encryption rather than crack it.**

E2EEの“End”自体が安全であることは、自動では保証されない。

### The recipient can leak it

Bob can take a screenshot.

Bobは文章をコピーして別の人へ送ることもできる。

Encryption cannot force the intended recipient to keep a secret.

E2EEは「正しい受信者以外に配送途中で読まれない」ための仕組みであって、「受信者を信用できるか」まで解決しない。

### Phishing is still phishing

If Alice willingly types a secret into a fake site, encryption can securely deliver that secret to the attacker.

皮肉やけど、暗号化は「間違った相手へ安全に届ける」ことすらできる。

That is why identity verification matters too.

SignalのSafety NumberやGoogle MessagesのKey Verifierのような仕組みは、「相手が本当に意図した相手か」を確認する問題に関係する。

### Metadata may remain visible

Message content is only one kind of information.

本文が読めなくても、サービス運用上、周辺情報が処理される場合がある。

Depending on the system, metadata can include things such as device information, timing, account identifiers, or routing information.

これらまで自動的にE2EEで消えるわけではない。

**Content confidentiality and metadata privacy are different goals.**

「何を話したか」を隠すことと、「誰かが通信したという事実」まで隠すことは同じではない。

## 7. Backups create another exit

Imagine a perfectly protected E2EE conversation.

```text
Alice → E2EE → Bob
                  ↓
               Backup
```

Bob’s device must eventually hold readable data.

その履歴を別のクラウドへコピーすれば、そこに新しいtrust boundaryが生まれる。

If the backup uses weaker protection, the main E2EE channel does not automatically save it.

**A system can be only as private as its unexpected exits.**

だからバックアップ、通知、連携端末、エクスポートなども別々に見る必要がある。

## 8. Forward Secrecy: protect yesterday from today’s stolen key

Now one step deeper.

Suppose a system reused the same secret key forever.

攻撃者が過去の暗号文を全部保存しておき、数年後にその鍵を盗んだらどうなるか。

A single compromise might expose a huge history.

そこで重要なのが **Forward Secrecy** だ。

The idea is to keep changing key material and delete old secrets when they are no longer needed.

過去に使った秘密を適切に捨てていけば、「今の秘密を盗まれたから昔の通信まで全部読める」という被害を減らせる。

Signal’s Double Ratchet specification describes forward security as one of its important properties.

[Signal: The Double Ratchet Algorithm](https://signal.org/docs/specifications/doubleratchet/)

**Modern secure messaging assumes that secrets may eventually leak.**

だから「絶対に漏れない鍵」を目指すだけでなく、「漏れたときの被害範囲を小さくする」方向にも進化している。

## 9. Post-Compromise Security: recover after compromise

There is another useful concept: **Post-Compromise Security — PCS**.

ある時点で端末の秘密が盗まれても、その後に新しい安全な秘密を取り込み、攻撃者が端末への継続アクセスを失えば、将来の通信の安全性を回復しようとする考え方だ。

MLS is designed to provide both forward secrecy and post-compromise security for group messaging.

[IETF RFC 9750](https://datatracker.ietf.org/doc/html/rfc9750)

This is a different philosophy from building an “unbreakable castle.”

**Assume compromise can happen, then design the damage not to spread forever.**

侵害をゼロにするだけでなく、侵害後の回復まで設計する。

## 10. E2EE is really a Trust Boundary design

At first, E2EE looks like a story about stronger cryptography.

でも、ここまで見ると本質はもう少し広い。

A messaging system contains many actors: Alice, Bob, servers, networks, operating systems, cloud backups, and account systems.

そのうち、本文を秘密に保つために**誰を信用しなければならないか**。

That is a **Trust Boundary** question.

```text
Ordinary server-readable encryption
[ Alice ] → [ Server ] → [ Bob ]
               ↑
        may read content

E2EE
[ Alice ] → Server → [ Bob ]
    ↑                   ↑
 decrypt              decrypt
```

The server still exists.

配送、同期、接続管理などの仕事は残る。

But E2EE tries to remove the server from the set of actors that must be trusted with message content.

**Good security is often not about finding more trustworthy actors. It is about needing to trust fewer actors.**

これがE2EEを理解するうえで、一番おもしろいところだと思う。

## 11. Ask “what does it protect?” instead of “is it safe?”

Security discussions easily become binary.

安全か、危険か。

Encrypted or not encrypted.

E2EE or not E2EE.

But a better question is more specific.

**Who is the attacker? What information are we protecting? Where does protection begin and end?**

E2EE is excellent at protecting message content from intermediaries and service providers when properly implemented.

一方で、端末侵害、相手本人、phishing、metadata、backup、アカウント乗っ取りを全部自動的に解決するわけではない。

So “Is this secure?” is only the beginning.

「誰から、何を、どこまで守る？」まで聞くと、仕組みが見える。

Encryption transforms data into a form that should be unreadable without the right secret.

**End-to-end encryption goes further: it designs who is allowed to have that secret.**

サーバーは運べる。

But it does not need to read.

その設計思想こそ、E2EEの核心である。

---

## Related

A previous MyEssays article looked at E2EE from the implementation side through a private memo built with Cloudflare and Web Crypto.

[自分しか読めないメモを、どう作るか](https://silovar-uk.github.io/myessays/#/essay/private-memo-cloudflare-zero-trust-e2ee)

今回の記事は、そのテーマを一般的なsecure messagingへ広げたものになる。

## Sources

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
