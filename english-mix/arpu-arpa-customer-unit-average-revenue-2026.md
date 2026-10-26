---
id: "arpu-arpa-customer-unit-average-revenue-2026"
title: "ARPUとARPA――One Payment, Six Users, Two Averages"
subtitle: "Average Revenue per Userとper Accountで読む顧客構造・収益モデル・集計の落とし穴"
created: "2026-10-26"
updated: "2026-10-26"
type: "Essay"
status: "完成"
tags: ["経営指標", "ARPU", "ARPA", "SaaS", "財務分析", "English Mix"]
keywords: ["average revenue per user", "average revenue per account", "MRR", "ARPPU", "Spotify", "Verizon", "cohort", "unit economics"]
grow: 5
abstract: "同じ家族契約がrevenue per accountとrevenue per userで6倍変わる。Spotify・Verizon・Netflixのfilingsを比較し、計算実験とbusiness modelへ進む。"
---

# ARPUとARPA――One Payment, Six Users, Two Averages

*English Mix／2026年10月26日。各社開示・公式計算仕様を確認。計算実験は架空の数値であり、事実・解釈・提案を分ける。*

## 売上は1,800円なのに、「平均売上」は300円にも1,800円にもなる

家族6人が月額1,800円のサービスを使う。One bill, six people, one subscription. 月間売上は1,800円だが、revenue per accountなら1,800円、revenue per userなら300円。Same business, sixfold difference. 計算式はどちらも正しい。分母の意味が違うだけだ。

Spotifyの2026年9月期開示では、Family Planの最大6つの登録アカウントがPremium Subscribersに含まれる。A paying household is not necessarily a single counted user. 実際の料金ではなく、分母の定義に注目したい。[Spotify filing](https://www.sec.gov/Archives/edgar/data/1639920/000162828026066889/spot-20260930x6xk.htm)

これがARPU（利用者あたり平均売上）とARPA（契約口座あたり平均売上）の入口。The key question is not the letter U or A. 「誰を1単位と数えたのか」が、数字の読み方を決める。

## 守｜売上高だけでは、同じ10億円でも商売の形が見えない

売上高（revenue）は、一定期間に得た収益の合計。A社は100万人から年1,000円、B社は100社から年1,000万円を受け取る。Both earn 10億円, but the customer structures are radically different. 大量の小口取引と少数の高額契約は、売上高だけでは区別できない。

だからrevenueをcustomer unitで割る。We move from total revenue to revenue per unit. ただしaverageは、どの単位を分母に選んだかを教えてくれない。単純化は理解を助けるが、lost informationもある。

## 守｜ARPUとARPAは似た計算式を使うが、分母の名前だけで定義は確定しない

ARPU means Average Revenue Per User、利用者あたり平均売上。ARPA means Average Revenue Per Account、契約口座あたり平均売上。Typical formulas are revenue / users and revenue / accounts. Accountは契約管理上の単位を指す。

However, they are not universal accounting standards. ChartMogulはARPAとARPUをinterchangeably使う企業もあると明示する。B2Bではaccounts、B2Cではusersという傾向はあっても、用語だけから実人数は確定しない。[ChartMogul definition](https://chartmogul.com/saas-metrics/arpa/)

Always check four things: revenue scope, period, unit, and denominator timing. たとえば月末に契約が急増したら、period-average usersとend-of-month usersは異なる。ChartMogulは複数subscriptionを持つ顧客を1 subscriberとして扱う。[Calculation rules](https://help.chartmogul.com/article/209-chart-average-revenue-per-account)

## 守｜ARPAの計算には、通常の売上高ではなく月間継続売上を使う場合がある

Subscription businesses often use MRR（Monthly Recurring Revenue：月間継続売上）. 年額12万円の契約ならnormalized MRRは月1万円。But MRR is not monthly cash collected. 現金の入金、会計上の売上、継続売上の月額換算は分ける。

ChartMogul calculates ARPA as MRR / paying subscribers. Free accounts and one-off transactions are excluded from its recurring-revenue metric. したがって普通の売上高を全利用者で割った値とは一致しない場合がある。[ChartMogul methodology](https://help.chartmogul.com/article/209-chart-average-revenue-per-account)

If MRR is 200万円 and there are 100 paying accounts, ARPA is 2万円/month. MRR = accounts × ARPA. この恒等式からcustomer growthとrevenue per account growthの二つのレバーが見えるが、profitまで説明するわけではない。

## 守｜この数字は通信の時代を生き、動画・音楽・ソフトウェアへ広がった

One major setting for ARPU was telecommunications. The US Government Accountability Office（米国政府説明責任局、GAO）tracked voice and data ARPU separately. 2000年にはvoiceが月46.01ドル、dataが0.28ドル。2009年にはvoiceが約26ドル台、dataが約19ドル台だった。[GAO historical series](https://www.gao.gov/assets/a308172.html)

That history does not establish who invented the acronym. 今回、発明者と初出年の一次資料は確認できなかった。ただ、voice-to-data transitionを追うためのper-user revenueが重要だったのは確かだ。The metric followed the business model.

Today, streaming and SaaS add family plans, enterprise contracts, free tiers, advertising, and usage billing. The old intuition—one paying person, one unit—is no longer enough. 指標は同じように見えても、対象は変わる。

## 守｜現実の企業を読むと、三社の「一単位」がすでに違う

Verizonの2022年決算ではpostpaid ARPAが月125.97ドル、end-period connections per accountが2.77。This is revenue per billing account, not per human. しかも2.77は期末の接続数で、ARPAと期間基準が同じとは限らない。[Verizon disclosure](https://www.sec.gov/Archives/edgar/data/732712/000073271223000007/a2022q4exhibit991.htm)

Spotifyの2026年9月期はPremium Subscribersが306 million、quarterly Premium ARPUが月4.95ユーロ。Family/Duo sub-accounts count as Premium Subscribers. したがって4.95ユーロをindividual list priceと解釈しない。[Spotify filing](https://www.sec.gov/Archives/edgar/data/1639920/000162828026066889/spot-20260930x6xk.htm)

Netflix reported average monthly revenue per paying membership of $11.70 globally in fiscal 2024, based on average memberships over the period.[Netflix annual report](https://www.sec.gov/Archives/edgar/data/1065280/000106528025000044/nflx-20241231.htm) 通信のaccount、音楽のsubscriber、動画のmembership。The denominator is part of the business model. 

## 破｜顧客の売上が全員下がっても、平均売上は4倍になる

Let us stress-test the average. Month 1: 10 high-tier accounts × 1,000円 plus 90 low-tier accounts × 100円 = 19,000円. Divide by 100 accounts: ARPA is 190円. Month 2: 90 high-tier × 900円 plus 10 low-tier × 90円 = 81,900円. ARPA becomes 819円.

Every segment's unit price falls by 10%. Yet aggregate ARPA jumps from 190円 to 819円, about 4.31×. Why? The customer mix shifted dramatically. これは架空データによる検算で、企業の実績ではない。

This resembles Simpson's paradox（シンプソンのパラドックス）: group-level patterns can reverse in the aggregate. 因果効果を証明する話ではない。Before claiming pricing success, ask whether customer composition changed. まずsegment mixを見る。

## 破｜平均売上が伸びても、会社の売上は1円も伸びない場合がある

Another test: Month 1 has 100 accounts × 1,000円 = MRR 10万円. Month 2 has 80 accounts × 1,250円 = the same MRR 10万円. ARPA grows 25%, but total revenue does not grow at all.

Lost customers can mean lost future sales and referrals. Yet eliminating unprofitable contracts might reduce costs. ARPA alone does not tell us which happened. 単価の上昇をbusiness successと読み替えるには、追加のデータが必要だ。

## 破｜売上の平均は、利益の平均でも、顧客の満足度でもない

Revenue is not profit. A contract paying 2万円/month may require 3万円/month in direct support. High ARPA does not automatically mean an attractive customer.

ARPA also says nothing about how long customers stay. We need churn rate（解約率）, LTV（顧客生涯価値）, and CAC（顧客獲得費用）. Even LTV can be revenue-based or gross-profit-based. 現在の売上平均と、long-term unit economicsは別々に検証する。

## 破｜企業間比較では、同じ名前の数字よりも注記を比べる

To compare two firms, normalize the period, currency, revenue scope, and counted units. Do not mix annual and monthly figures. Also check ads, devices, one-off fees, and whether free users enter the denominator.

Spotify's 2025 Premium ARPU fell from €4.69 in 2024 to €4.63. Its filing separates currency and market/product mix headwinds from pricing benefits. ARPU change is not the same as price change. 『値上げしたのにARPUが下がった』も十分ありうる。[Spotify annual filing](https://www.sec.gov/Archives/edgar/data/1639920/000162828026006874/ck0001639920-20251231.htm)

## 離｜無料利用者がいるなら、ARPUだけでなく課金者単価も分けて見る

Suppose 10,000 users include 500 paying users at 1,000円/month. Subscription revenue is 50万円. ARPU across all users is 50円; ARPPU（Average Revenue Per Paying User：課金利用者あたり平均売上）is 1,000円.

But some companies call the paid-user figure ARPU. Terminology is inconsistent. Always ask whether free users are included. [ChartMogul terminology](https://chartmogul.com/saas-metrics/arpa/)

Paid conversion is 500/10,000 = 5%. Conversion rate × ARPPU = 50円 across all users, if paid subscriptions are the only revenue source. 広告売上があれば計算式に別の項が要る。Break down the average before explaining its change.

## 離｜チームスポーツのサービスでは、支払者と利用者がさらに分かれる

Sports-tech example（仮説）：120 teams pay 2万円/month each, with 15 players per team. MRR is 240万円. ARPA per team is 2万円; ARPU per 1,800 players is about 1,333円.

But suppose schools buy in bulk, coaches operate the software, and parents watch highlights. Who is the account? Who is the user? 課金主体・契約主体・利用主体を混ぜると、指標の分母が揺れる。

Proposal: define contracting entity, billing unit, actual user, period, and revenue scope before forecasting. The metric design forces us to explain the customer architecture. これは現場で検証すべき設計提案であり、業界標準だと断定しない。

## 離｜事業計画では「単価×顧客数」を入口にし、解約と費用までつなぐ

Imagine a target of 10億円/year at 500円/month. Each continuously paying user contributes 6,000円/year, so the plan requires about 166,667 average full-year-equivalent paying users. Not sign-ups, not free users. 途中加入や解約を省いた単純計算だ。

In a real budget, model opening accounts + acquisitions − churn, then upgrades and downgrades. Build monthly revenue, and subtract payment fees, production, and support costs. ARPA × accounts = MRR, but that is not a profit forecast.

One enterprise contract and 200,000 consumer subscriptions imply different risks, CAC, and operations. Revenue per unit is not only a pricing metric; it sketches how many customer relationships the business must sustain.

## 離｜平均売上の設計書は、最低でも六つの欄で足りる

A metric definition sheet should state six fields: period, numerator, unit, paid/free scope, denominator timing, and segmentation. 書面には月・四半期・年、対象売上、実人数か契約か、無料の扱い、期中平均か期末か、地域・プランなどの分割軸を明記する。

Also document tax, foreign exchange, refunds, trials, dormant accounts, family accounts, multiple contracts, and resellers. Consistency matters more than an impressive-looking decimal. 担当交代で定義が変わる指標は、時系列比較に使えない。

Put segment-level ARPU/ARPA beside account counts, churn, and gross margin. Then ask: price increase, mix shift, or loss of low-tier customers? Only the decomposition makes management interpretation credible.

## 離｜最初の家族6人に戻ると、指標は価格ではなく「商売の切り取り方」を示していた

Back to the family: one payment of 1,800円, one account, six users. ARPA is 1,800円; user-level ARPU is 300円. Neither number is false. Each hides something the other makes visible.

Some businesses scale through new accounts, some through user adoption, and others through usage. The right denominator depends on the business model. 平均の内側を調べると、customer, usage, billing, retention, and profitという経営の構造が見える。

The question worth remembering is simple: Who exactly is the one user? 最初に顧客を定義し、それから割る。A tiny metric can expose the whole logic of a business.

## 調査記録｜確認した事実、推論、追加検証の境界

FACTS: ChartMogul uses paid subscribers and recurring MRR; Verizon distinguishes billing accounts and connections; Spotify counts Family/Duo sub-accounts; Netflix used revenue per paying membership. すべて公表されたmethodologyから確認した。

ILLUSTRATIONS: family of six, the 100-account mix shift, the 80-account scenario, 120 sports teams, and the 10億円 plan are hypothetical. They are reproducible arithmetic, not market observations.

INTERPRETATION / PROPOSAL: definition sheets and segment-level diagnostics are editorial recommendations. ARPU's first inventor and a universal single definition were not established. 参入・投資判断にはCAC、retention、gross margin、需要の裏付けが別途要る。

## 主要資料｜企業の開示と指標の計算仕様に直接当たる

Primary source: [Spotify September 2026 SEC filing](https://www.sec.gov/Archives/edgar/data/1639920/000162828026066889/spot-20260930x6xk.htm) — subscriber definition, Family Plan, Premium ARPU, and paid users.

Primary source: [Verizon 2022 results](https://www.sec.gov/Archives/edgar/data/732712/000073271223000007/a2022q4exhibit991.htm) — ARPA, connections per billing account, and reporting scope.

Primary source: [Netflix 2024 annual filing](https://www.sec.gov/Archives/edgar/data/1065280/000106528025000044/nflx-20241231.htm) — revenue per paying membership and averaging period.

Public research source: [US GAO telecom report (2010)](https://www.gao.gov/assets/a308172.html) — voice/data ARPU development.

Provider methodology: [ChartMogul ARPA report](https://help.chartmogul.com/article/209-chart-average-revenue-per-account) and [glossary](https://chartmogul.com/saas-metrics/arpa/) — MRR basis, exclusions, and terminology.

Primary source: [Spotify 2025 annual filing](https://www.sec.gov/Archives/edgar/data/1639920/000162828026006874/ck0001639920-20251231.htm) — foreign exchange, pricing and product mix as different drivers.
