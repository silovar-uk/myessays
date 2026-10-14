---
id: ad-reach-max-shared-clock-broadcast-ad-auctions-2026
title: "テレビCMは放送の数秒前に売れる――民放3局が共通の「時計」を持つ理由"
subtitle: "Why shared infrastructure changes the game: time slots, auctions, measurement and governance"
created: "2026-10-14"
updated: "2026-10-14"
type: "リサーチエッセイ"
status: "完成"
tags: ["テレビ広告", "広告テクノロジー", "プラットフォーム", "English Mix", "メディアビジネス"]
keywords: ["Ad Reach MAX", "programmatic", "RTB", "impression", "reach", "frequency", "shared infrastructure", "perishable inventory", "auction", "market design"]
grow: 5
abstract: "日本語本文に自然な英語を交えて読む派生版。Ad Reach MAXの3社共同基盤を起点に、broadcast inventory、programmatic buying、reachとfrequency、common infrastructure、market designなどの表現を文脈の中で身につける。事実・数字・留保は日本語正本と対応する。"
---

# テレビCMは放送の数秒前に売れる
## Why three rival broadcasters want to share the same clock

1953年、日本の民放テレビ初期のCMは時計会社による時報だった。Fast-forward to 2026: 日本テレビを中心とする取り組みでは、**an ad can be selected just seconds before it goes on air**. 昔の広告は正しい時刻を知らせ、今度の仕組みはその数秒を誰が買うかを決める。It sounds like a joke about clocks, but the underlying business question is serious. [国立国会図書館のレファレンス事例](https://crd.ndl.go.jp/reference/entry/reference/show?asc=desc&fi=3_%E4%BA%8B%E5%AE%9F%E8%AA%BF%E6%9F%BB+6_0+8_42&id=1000021915&lsmp=1&mcmd=25&page=ref_view&pg=3&rnk=1&st=ref_cnt_all)／[日本テレビ・技術構想](https://info.ntv.co.jp/pressrelease/20231127.html)

On October 13, 2026, 日本テレビ、TBSテレビ、フジテレビはAd Reach MAXの事業運営を担う共同出資会社の設立・出資を公表した。株式会社アドリーチマックスのcapitalは**1億円**、planned business launchは**2027年2月**。The transfer remains subject to 日本テレビの2026年11月取締役会承認。TBS is scheduled to join around spring 2027, Fuji TV around spring 2028. **The partnership was announced; nationwide joint operation is not yet a completed fact.** [共同発表](https://prtimes.jp/main/html/rd/p/000000007.000191835.html)

The deeper question: **When competitors share the infrastructure of a market, where does competition go?** 事実を確認しながら、その問いを読み進める。

## 1. テレビ広告の「何を買うか」は、かつて番組と放送時間に強く結びついていた

Traditional television advertising starts with two categories. **タイム広告 (program sponsorship)** is tied to supporting a program. **スポット広告 (spot advertising)** buys commercial airtime across schedules, regions and periods. 日本民間放送連盟の放送基準もタイムCMとスポットCMを基本とする。Both involve a peculiar product: **a few seconds that cannot be stored for later use**. [日本民間放送連盟](https://www.j-ba.or.jp/stance/jba101032.html)

A traditional planning metric is **GRP — Gross Rating Points（延べ視聴率）**. If a commercial with 1% audience rating airs 100 times, that is 100 GRP. But reach is another question. The same viewers might see it again and again, or different people might see it once. **GRP does not tell you how many distinct people were reached.** [ビデオリサーチの解説](https://www.videor.co.jp/digestplus/article/ad-marketing241206.html)

When the scheduled minute passes, the available ad slot expires. だからテレビ広告には**perishable inventory（時間とともに失われる在庫）**という特徴がある。The deadline for deciding what to air is an economic variable, not merely an administrative detail.

## 2. 改革の本体は、画面ではなく「発注から放送までの時間」の短縮にある

In 2023, 日本テレビは、放送数秒前に広告素材を決定し、枠と素材の組み合わせを自動で処理する構想を発表した。The first terrestrial commercial purchased through スグリー aired on **April 1, 2025**. The 2026 announcement is therefore about **scaling an existing system into a shared, cross-broadcaster platform**, not inventing the system from scratch. [2023年技術発表](https://info.ntv.co.jp/pressrelease/20231127.html)／[2025年の初放送](https://arm.ntv.co.jp/news/4hRhJSMX)

The system has layers. **スグリー** is the online interface for buying terrestrial TV and TVer advertising and reviewing reports. **AdRM-Exchange** connects external ad-buying and ad-selling systems for auction-based transactions. **Ad Reach MAX platform** refers to the broader trading and broadcast infrastructure. As of September 2026, the company reported **about 200 advertisers and agencies combined** with transaction experience. Not 200 proven campaigns with causal lift: **200 companies**. [共同発表](https://prtimes.jp/main/html/rd/p/000000007.000191835.html)

Useful terms: **DSP (demand-side platform)** handles buying and bids for advertisers. **SSP (supply-side platform)** helps media sell inventory. **RTB (real-time bidding)** is an auction mechanism. **Programmatic buying** is the broader use of systems and data to automate trading; it is not synonymous with RTB. スグリーにはインプレッション予約と自動入札オークションの双方がある。An automated decision does not mean automated creative production or the elimination of broadcast review. [IAB Tech Lab](https://iabtechlab.com/programmatic-auction-definitions/)／[サイバーエージェントの説明](https://www.cyberagent.co.jp/news/detail/id%3D31421)

## 3. 視聴者全員に違うCMを見せる、という技術ではない

The crucial distinction is **linear broadcast versus individualized digital delivery**. 通常の地上波放送では同じ地域・時刻の視聴者が原則として同じCMを見る。This project is about **which ad wins a television slot**, not about giving a different creative to every household. TVer and other internet-delivered ads operate under different delivery conditions. [共同発表](https://prtimes.jp/main/html/rd/p/000000007.000191835.html)／[IAB Tech Lab](https://iabtechlab.com/connected-television/)

Three words matter. **Impressions（延べ接触・表示）** count exposure opportunities; **reach（到達）** is how many different people were reached; **frequency（接触頻度）** is the average number of exposures among reached users. A website may use delivery logs, while broadcast reach can be estimated from audience measurement. The two metrics may share a name but differ in their measurement method and uncertainty. ビデオリサーチの横断測定サービスも母数と指標の定義を明示する。[TARの仕様](https://www.videor.co.jp/service/media-data/totaladratings.html)

Imagine 100,000 impressions. It might mean 100,000 people once or 10,000 people ten times. Neither figure proves purchases increased. **Exposure is not causation.** Effective measurement still needs a credible comparison between exposed and unexposed people, or another suitable evaluation design.

## 4. 背景には「テレビ広告の消滅」ではなく「広告予算の選び方の変化」がある

The 2025 Japanese advertising market was worth **8兆623億円**, according to 電通. Internet advertising reached **4兆459億円, or 50.2%** of the total, while terrestrial TV advertising was **1兆6,333億円, 99.9% year-on-year**. TV-related digital video advertising was **805億円, up 23.3%**. These figures have different definitions and should not be added or compared carelessly. [電通「2025年 日本の広告費」](https://www.dentsu.co.jp/news/release/2026/0305-011003.html)

The advertiser's job is increasingly **cross-media allocation（媒体横断の予算配分）**. 地上波、配信、検索、SNSから選ぶ時代に、テレビの買い方が遅くて比較しにくければ、広告枠そのものの魅力を生かしきれない可能性がある。TBS noted features such as same-day ordering, last-minute creative changes, and fast reporting. **A shorter buying cycle may matter even when the TV program itself stays unchanged.** But potential is not verified incremental revenue. [TBSテレビの基本合意](https://innovation.tbs.co.jp/neo_report/1014/)

## 5. 思考実験：美容院のキャンセル枠とCM枠は、どこまで同じか

Let's leave media for a moment. Imagine a hair salon with a spare 6 p.m. appointment. The slot is valuable until 6 p.m.; afterward, it cannot be resold. This is **perishable capacity**. 予約を早く締め切る安心と、最後まで買い手を探す柔軟性の間には選択がある。

Now run a toy model, not a real forecast. 10 TV ad slots are available. Under the old process, 8 slots sell at **10万円**, yielding **80万円**. With an automated marketplace, the price drops to **9万円**, but all 10 sell: **90万円**. Revenue rises despite a lower unit price. Yet if all 10 already sold at 10万円, the same price decline would reduce revenue from **100万円 to 90万円**. The point is not that Ad Reach MAX will make these numbers happen. **A better fill rate is not automatically a better business.**

Program, geography, audience and contract conditions make real inventory heterogeneous. We should therefore ask: **Was previously unsold inventory monetized, or was premium inventory merely repriced downward?** An increase in transactions alone cannot answer that.

## 6. ライバル3社が同じ売り場に立つと、勝負は商品から「比較可能性」にも及ぶ

The striking move is organizational. 日本テレビが築いた仕組みを、競合するTBSテレビとフジテレビが資本参加する会社へ移す計画だ。A shared platform may reduce duplicated integrations and allow buying across broadcasters. But these are intended advantages, not established outcomes. [共同発表](https://prtimes.jp/main/html/rd/p/000000007.000191835.html)

Think of railway timetables. A common notion of “10:15” makes transfers comparable, while rail companies still compete on routes, price and service. 同じ時計を使っても、同じ列車を走らせることにはならない。Likewise, **standardizing the transaction layer can move competition toward audience value, content, pricing and service**. This is an analogy about coordination, not a claim of identical historical origins.

But a common marketplace creates **governance power（市場を運営する権限）**. Who sets access requirements, fees, auction priorities, data rules and recovery procedures? A platform is not neutral merely because several rivals invest in it. **The company that sets the shared yardstick also has to justify the marks on that yardstick.**

## 7. 収益と透明性には、まだ検証されていない問いが残る

Potential benefits include lower transaction friction for advertisers, demand aggregation for broadcasters, and less duplicated software integration. Risks must be tested separately: **fee transparency, independent measurement, fair access, ad review, privacy safeguards and system resilience**. None of these questions asserts that misconduct has occurred. They are criteria for evaluating shared market infrastructure. [IAB Tech Lab・auction transparency](https://iabtechlab.com/programmatic-auction-definitions/)／[日本民間放送連盟・放送基準](https://www.j-ba.or.jp/stance/jba101032.html)

The ecosystem is widening. 博報堂DY ONE announced a connection for its ad platform in 2025; 楽天 announced a TV advertising solution using consumer purchase data in 2026. More datasets may improve planning and measurement. Yet **a measured correlation between exposure and sales is not automatically incremental sales caused by an ad**. That requires proper evaluation. [博報堂DY ONE](https://www.hakuhodody-one.co.jp/news/2025/07/news-release_202507222457/)／[楽天](https://corp.rakuten.co.jp/news/press/2026/0713_01.html)

## 8. 実務では「新しい取引方法」の効果を、四つの数字に分けて測る

For a business review, separate four categories. **Volume（取引量）**: new advertisers, spend and share of cross-station transactions. **Economics（収益性）**: realized price, net revenue after fees, substitution of existing sales. **Operations（運用）**: time-to-air, creative changes, rejected submissions. **Outcomes（広告成果）**: unique reach, overlap, and credible behavioral change. Without comparable baselines, “faster” or “more automated” remains a feature description rather than evidence of value.

A good evaluation asks: **What changed, from what baseline, and for whom?** 発注時間が減っても確認コストが増えれば改善とは限らない。枠が埋まっても価格が下がれば利益は増えないかもしれない。Reach can improve without causing additional purchases.

## 9. 進化したのはCMの秒数ではなく、「いつまで決めなくてよいか」である

Back to the clock. In 1953 the ad told viewers the time. In 2026 the technology asks how long the buyer and seller can **keep their options open** before airtime. Not more seconds of television—**more freedom over the timing of a decision**.

Last-minute flexibility is not always superior to early certainty. Long-term sponsorships, review standards and stable prices still have value. ただ、締切を変えられるようになると、どの約束を早く固め、どの判断を最後まで保留するかを設計できる。When rivals share this capacity, they also need shared rules. テレビ局が共同で持とうとしているのはCM枠だけではない。**They are building a common clock for market decisions.**

## 調査方法・確認の境界

Sources were checked as of **October 14, 2026**. This version keeps the Japanese article's facts, qualifications and section order. **Announced plans are not completed operations. Impressions are not unique reach. Exposure is not causal impact.** The hair-salon analogy and 10-slot calculation are hypothetical. Auction logic, fees, future broadcaster participation and incremental profits remain unverified in the cited public record.

## 用語の短い手引き

- **Time sponsorship / タイム広告**：番組提供型の広告取引。
- **Spot advertising / スポット広告**：地域・時期・時間帯で買う放送枠。
- **GRP / 延べ視聴率**：CM視聴率の合計。
- **Impressions / 延べ接触**：広告が接触・表示された機会の総数。
- **Reach / リーチ**：異なる人への到達人数・割合。
- **Frequency / 接触頻度**：到達者あたりの平均接触回数。
- **DSP / SSP**：広告主側の買付システム／メディア側の販売システム。
- **RTB / リアルタイム入札**：広告機会を短時間で競る取引方式。
- **Perishable inventory / 消滅する在庫**：期限を過ぎると売れない広告枠などの容量。

## 主要参照資料

- [日本テレビ・TBSテレビ・フジテレビ：共同発表（2026年10月13日）](https://prtimes.jp/main/html/rd/p/000000007.000191835.html)
- [日本テレビ：2023年の技術構想](https://info.ntv.co.jp/pressrelease/20231127.html)
- [Ad Reach MAX：2025年4月の初放送](https://arm.ntv.co.jp/news/4hRhJSMX)
- [TBSテレビ：Ad Reach MAX基本合意](https://innovation.tbs.co.jp/neo_report/1014/)
- [電通：2025年 日本の広告費](https://www.dentsu.co.jp/news/release/2026/0305-011003.html)
- [日本民間放送連盟：放送基準](https://www.j-ba.or.jp/stance/jba101032.html)
- [ビデオリサーチ：リーチとGRP](https://www.videor.co.jp/digestplus/article/ad-marketing241206.html)
- [IAB Tech Lab：Programmatic Auction Definitions](https://iabtechlab.com/programmatic-auction-definitions/)
