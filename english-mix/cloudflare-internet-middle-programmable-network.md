---
id: cloudflare-internet-middle-programmable-network
title: "Cloudflareは、Internetの「途中」を会社にした"
subtitle: "16th birthdayに、lava lampsからWorkersまで一本につなげてみる"
created: "2026-09-27"
updated: "2026-09-27"
type: "リサーチエッセイ"
status: "完成"
tags: ["Cloudflare", "Internet", "CDN", "DNS", "Security", "Workers", "Cloud"]
keywords: ["Cloudflare", "CDN", "DNS", "reverse proxy", "Anycast", "Workers", "Pages", "R2", "Zero Trust", "1.1.1.1", "LavaRand"]
grow: 5
abstract: "CloudflareはCDN company、DNS company、security company、serverless platformのどれなのか。The answer is: none of them alone. 利用者とorigin serverの「途中」にglobal networkを置き、そのsame placeでdelivery, defense, name resolution, compute, storage, and access controlまで扱う。本稿はlava lamps、1.1.1.1、Workers、R2、Zero Trust、free tier economics、2025 outagesを一つの構造としてつなぐ。"
---

# Cloudflareは、Internetの「途中」を会社にした
## 16th birthdayに、lava lampsからWorkersまで一本につなげてみる

Cloudflare（クラウドフレア）について調べようと思った日が、たまたまCloudflareのbirthdayだった。

The company went public to users on September 27, 2010. Today is September 27, 2026. Exactly sixteen years.

That coincidence is already a decent opening.

But there is a stranger fact.

この会社はInternetを守るために、**lava lampsを撮影している**。

San Francisco officeにはwall of lava lampsがあり、そのunpredictable motionをcameraで取り込み、cryptographic randomnessの追加材料として使う。2025年にはLisbon officeへ50台のwave machinesまで追加した。Austinではoptical installation、Londonではdouble pendulums。Cloud companyの話をしていたはずなのに、急に物理実験室になる。

Yet that is the clue.

Cloudflareは目に見えない“cloud”を売っているように見えて、実際にはdata centers, fiber links, routing, caches, cryptography, and computeを世界中へ物理的に配置し、**Internetのmiddleに巨大なmachineを作った会社**である。

Lava lamps are not merely office decoration. They are a miniature of the whole company.

本稿ではCloudflareをproduct catalogとして覚えない。Content Delivery Network（コンテンツ配信網、CDN）、Domain Name System（ドメイン名システム、DNS）、Web Application Firewall（ウェブアプリケーション防火壁、WAF）、Cloudflare Workers（クラウドフレア・ワーカーズ）、R2、Zero Trust（ゼロトラスト）。Why does one company do all of these? その問いから逆算する。

> **Information date: September 27, 2026**
>
> Product specs, pricing, and network scale change quickly. 本稿はCloudflare official docs、2025 Form 10-K filed with the U.S. SEC、and September 2026 external usage dataを基準にする。

## 1. Cloudflareを理解する最短ルートは“What does it sell?”ではなく“Where does it sit?”である

Cloudflareをproductsから見ると散らかる。

CDN, DNS, DDoS protection, WAF, Bot Management, Turnstile, Workers, Pages, R2, D1, Access, Gateway, WARP, Tunnel.

It looks like a company that keeps adding nouns.

場所から見ると、一気にまとまる。

Normally, a browser talks to the website’s origin server. Cloudflareを典型的な設定で使うと、そのbetweenにCloudflareが入る。DNS returns a Cloudflare Anycast IP instead of exposing the origin directly, and HTTP traffic reaches Cloudflare first.

これはreverse proxyという仕組みである。

**Without Cloudflare**

User → Origin server

**With Cloudflare**

User → Cloudflare → Origin server

One extra box. That box changes everything.

If the box stores frequently requested files, it becomes caching and CDN. If it drops malicious floods, it becomes DDoS protection. If it inspects requests, it becomes a WAF. If it evaluates suspicious automation, it becomes bot protection. If it executes customer code, it becomes Workers.

The product list looks diverse only when viewed from the product side. **From the network path, Cloudflare keeps reusing the same strategic position: the middle.**

[Cloudflare「How Cloudflare DNS works」](https://developers.cloudflare.com/fundamentals/concepts/how-cloudflare-works/) ／ [Cloudflare「Content Delivery Network Reference Architecture」](https://developers.cloudflare.com/reference-architecture/architectures/cdn/)

## 2. One IP address can exist in many cities at once

How does traffic find a nearby Cloudflare location?

Anycast（エニーキャスト）。

With Anycast, many locations announce the same IP address. Internet routing then sends a user toward a reachable, usually nearby location.

One address, many doors.

Cloudflare’s 2026 documentation says its DNS service operates across 335+ cities. The company’s 2025 Form 10-K reported a network spanning more than 330 cities in over 125 countries and interconnecting with more than 13,000 networks. Different dates produce slightly different counts, but the idea is stable: Cloudflare is not one giant server in one place.

This architecture explains two benefits at once.

A nearby entrance can reduce latency. Many entrances can also absorb load and route around failures. Speed and DDoS resilience are not unrelated products; they are two consequences of the same distributed topology.

So “CDN company” and “security company” are already overlapping descriptions.

配送網を世界中へ張ったら、そのdelivery network自体がbreakwaterにもなった。

[Cloudflare「What is Anycast DNS?」](https://www.cloudflare.com/learning/dns/what-is-anycast-dns/) ／ [Cloudflare 2025 Form 10-K](https://www.sec.gov/Archives/edgar/data/1477333/000147733326000016/cloud-20251231.htm)

## 3. Cloudflare began by watching bad traffic, then users asked it to stop the traffic

In 2004, Matthew Prince and Lee Holloway started Project Honey Pot to study where email spam came from. Website operators could contribute observations about malicious behavior.

Users repeatedly asked for the obvious next step:

Don’t only identify bad actors. Stop them.

In 2009, Prince met Michelle Zatlyn at Harvard Business School. Together with Holloway, they developed what became Cloudflare, which launched publicly on September 27, 2010.

The interesting part is that acceleration was not the entire original story.

Cloudflare’s own history says the team initially focused on protection. Yet by filtering unwanted traffic and caching static assets, early customers also saw faster sites.

Protection created performance as a side effect.

That pattern scales surprisingly well. If you sit in the middle, you can observe. If you can observe, you can classify. If you can classify, you can block. If you can store, you can respond nearby. If you can execute code there, the middle becomes a computing platform.

Cloudflare did not merely add products. **It kept adding verbs to the same position in the network.**

[Cloudflare「Cloudflareの歴史」](https://www.cloudflare.com/ja-jp/our-story/) ／ [Cloudflare「A Letter from Matthew Prince and Michelle Zatlyn」](https://blog.cloudflare.com/founders-letter/)

## 4. 1.1.1.1 was not merely a cute address; it was an address drowning in garbage traffic

Cloudflare launched the public DNS resolver 1.1.1.1 on April 1, 2018.

Yes, April Fools’ Day.

Cloudflare’s launch post explicitly had to explain that it was not a joke. Four “1”s made 4/1 memorable, so the team chose the date anyway.

But the address has a better story.

APNIC, the Asia Pacific Network Information Centre, wanted to study large amounts of misdirected traffic that hit 1.1.1.1. Announcing the address publicly could overwhelm an ordinary network.

Cloudflare could absorb it.

So the two organizations collaborated: Cloudflare’s network would receive and study the garbage traffic, while 1.1.1.1 could be used for the public resolver.

What looks like a branding trick is actually a network-capacity story.

大量のtrafficは普通ならproblemである。Cloudflareにとっては、network scaleがあるためresearch material and product opportunityにもなる。

**Being able to absorb traffic becomes a capability from which new services can be created.**

[Cloudflare「Announcing 1.1.1.1」](https://blog.cloudflare.com/announcing-1111/) ／ [Cloudflare「DNSリゾルバー、1.1.1.1のご紹介（冗談ではなく）」](https://blog.cloudflare.com/ja-jp/dns-resolver-1-1-1-1/)

## 5. Workers turned the middle from a checkpoint into a computer

Up to this point, Cloudflare could still be described as a gigantic gatekeeper.

Workers changes the category.

Cloudflare Workers lets customer code run across Cloudflare’s global network. Under the hood, the runtime uses Google’s V8 engine. Instead of giving every application a heavy virtual machine, Workers uses lightweight isolates to separate many applications efficiently.

That means the network path can do more than inspect or cache traffic.

It can compute.

Authenticate a request. Rewrite HTML. Build an API. Transform an image. Query data. Call an AI model. Sometimes there is no separate traditional origin server at all.

The “middle” stops being transit infrastructure and becomes execution infrastructure.

This shift is visible in Cloudflare’s own product guidance. As of August 2026, Cloudflare Pages still exists, but the Pages documentation tells new projects to start with Workers because Workers is now Cloudflare’s primary application-building platform.

A company that once sat in front of websites increasingly offers the place where the application itself runs.

[Cloudflare「How Workers works」](https://developers.cloudflare.com/workers/reference/how-workers-works/) ／ [Cloudflare「Cloudflare Pages」](https://developers.cloudflare.com/pages/)

## 6. R2 and Zero Trust make more sense when products are organized by the journey of traffic

Instead of memorizing product names, organize them by what the traffic is trying to do.

- **Find a name**: Cloudflare DNS, 1.1.1.1
- **Enter safely**: CDN, DDoS protection, WAF, Bot Management, Turnstile
- **Compute in the path**: Workers
- **Store nearby**: R2, Workers KV, D1
- **Connect people and private systems**: Cloudflare One, Access, Gateway, Tunnel, WARP

This is not Cloudflare’s official taxonomy. It is a mental model.

R2, for example, is object storage with an S3-compatible API. As of September 2026, Cloudflare’s pricing says Internet egress bandwidth is free. R2 makes more sense when paired with Workers and the same global network than when viewed as “another storage product.”

Cloudflare One extends the path in the other direction.

Access controls who can reach private applications. Gateway inspects outbound traffic. Tunnel connects an origin to Cloudflare using outbound-only connections, so the server does not need a public IP address exposed to the Internet.

Cloudflare began by putting itself between public users and websites. Now it can also sit between employees and private applications, or between company devices and the public Internet.

The company’s market expanded because **its definition of “the middle” expanded**.

[Cloudflare「R2 Pricing」](https://developers.cloudflare.com/r2/pricing/) ／ [Cloudflare「Cloudflare One」](https://developers.cloudflare.com/cloudflare-one/) ／ [Cloudflare「Cloudflare Tunnel」](https://developers.cloudflare.com/tunnel/)

## 7. Free is not simply generosity; it is part of the network economics

Cloudflare offers unusually useful free tiers.

Why?

The answer is not only “freemium conversion.”

Cloudflare’s 2025 Form 10-K says the company uses idle network capacity to provide a free tier. That free tier creates global scale. Scale makes Cloudflare a more attractive interconnection partner for ISPs, and those relationships can reduce colocation and bandwidth costs.

So free users do not only consume resources. At sufficient scale, they help create the environment in which the network becomes more efficient and more valuable.

They are also a huge product funnel.

As of December 31, 2025, Cloudflare reported about 332,000 paying customers across more than 190 countries. Revenue for 2025 was about $2.168 billion, up 30% year over year. The company counted 4,298 large customers under its reporting definition.

External measurement also shows how widespread the infrastructure has become. W3Techs estimated on September 26, 2026 that Cloudflare was used as a reverse proxy by 26.1% of websites in its survey. The methodology matters, so this should not be translated into a simplistic claim that Cloudflare “controls a quarter of the web.” But the scale is still remarkable.

The free tier is acquisition, utilization, distribution, and network strategy at the same time.

**Cloudflare’s free product is part of the machinery that makes the paid network stronger.**

[Cloudflare 2025 Form 10-K](https://www.sec.gov/Archives/edgar/data/1477333/000147733326000016/cloud-20251231.htm) ／ [W3Techs「Usage statistics of Cloudflare」](https://w3techs.com/technologies/comparison/cn-cloudflare)

## 8. The same integration that creates leverage can also create blast radius

Now reverse the argument.

If many products share one network and common internal building blocks, what happens when one shared dependency fails?

In 2025, Cloudflare produced several uncomfortable answers.

On June 12, a failure in storage infrastructure underlying Workers KV affected WARP, Access, Gateway, Images, Stream, Workers AI, Turnstile and other services for two hours and 28 minutes. Cloudflare said the immediate trigger involved a third-party cloud provider, while explicitly accepting responsibility for its architectural dependency choices. Core DNS, caching, proxying and WAF services were not directly affected.

On November 18, a database permissions change caused a Bot Management feature file to grow unexpectedly, contributing to widespread failures in core network traffic.

On December 5, a change to body-parsing logic during mitigation work for a React Server Components vulnerability caused about 25 minutes of impact and affected roughly 28% of HTTP traffic served by Cloudflare.

Later that month, the company announced “Code Orange: Fail Small,” a resilience program focused not on the impossible promise that systems never fail, but on reducing the blast radius when they do.

That phrase reveals the reverse side of Cloudflare’s model.

“One network can do many things” is a competitive advantage.

It is also a systems-risk statement.

**The more society relies on one programmable middle layer, the more important it becomes that failures remain local rather than global.**

[Cloudflare「Cloudflare service outage June 12, 2025」](https://blog.cloudflare.com/cloudflare-service-outage-june-12-2025/) ／ [Cloudflare「Cloudflare outage on November 18, 2025」](https://blog.cloudflare.com/18-november-2025-outage/) ／ [Cloudflare「Cloudflare outage on December 5, 2025」](https://blog.cloudflare.com/5-december-2025-outage/) ／ [Cloudflare「Code Orange: Fail Small」](https://blog.cloudflare.com/fail-small-resilience-plan/)

## 9. The lava lamps were the architecture in miniature

Return to the lava lamps.

Cryptography needs unpredictability. Computers are excellent at deterministic computation, so secure systems gather entropy from unpredictable physical or system events.

Cloudflare’s LavaRand films the chaotic movement of lava lamps and mixes that input with operating-system randomness as an additional source for cryptographic pseudorandom number generation.

The lamps are not the sole thing protecting Cloudflare. They are a hedge, an extra source.

At first this sounds like quirky office lore.

After walking through Cloudflare’s history, the story changes.

Cloudflare takes massive noisy traffic and turns it into routing, filtering, caching, computation, and data. 1.1.1.1 turned unwanted traffic into research. Free usage contributes to network scale. Workers turns transit infrastructure into programmable infrastructure.

Again and again, the company does the same conceptual move:

**receive something messy in the middle, then turn it into structure.**

LavaRand does this literally. Physical chaos becomes entropy. Entropy becomes secure randomness.

Before researching, Cloudflare looked like “the company behind CDN, DNS and Workers.”

Afterward, it looks more coherent.

Cloudflare is less a server company than a **path company**.

For sixteen years, it has been turning that path from a road into a cache, firewall, checkpoint, computer, storage layer, and corporate access boundary.

“Cloud” sounds weightless.

Cloudflare ends up being almost aggressively physical: data centers, BGP routes, cables, servers, cameras, and slow blobs of colored wax.

The cloud is always somewhere.

Cloudflare’s business is to make the somewhere in between matter.

[Cloudflare「Randomness 101: LavaRand in Production」](https://blog.cloudflare.com/randomness-101-lavarand-in-production/) ／ [Cloudflare「Chaos in Cloudflare’s Lisbon office」](https://blog.cloudflare.com/chaos-in-cloudflare-lisbon-office-securing-the-internet-with-wave-motion/) ／ [Cloudflare「ラバランプはどのようにインターネット暗号化に役立つか？」](https://www.cloudflare.com/ja-jp/learning/ssl/lava-lamp-encryption/)

## 10. If you actually use Cloudflare, start with the path, not the catalog

For practical use, ignore most of the catalog at first.

Ask one question: **What do I want Cloudflare to do in the middle of this traffic?**

- Make a site faster and hide/protect the origin → **Cloudflare DNS + proxy/CDN**
- Publish a small API or web application → **Workers**
- Start a new static application → Pages still exists, but official 2026 guidance makes **Workers the primary starting point**
- Store files or objects → **R2**
- Reach a private application without exposing a public IP → **Tunnel + Access**
- Control employee Internet traffic → **Gateway / Cloudflare One**
- Change the DNS resolver on a personal device → **1.1.1.1**

This makes the product family much less intimidating.

Draw one request path first. Then place only the necessary Cloudflare capability on that path.

If Cloudflare’s identity lives in the middle, its best learning model does too.

## Sources

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
