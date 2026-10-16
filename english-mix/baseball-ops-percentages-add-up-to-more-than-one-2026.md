---
id: baseball-ops-percentages-add-up-to-more-than-one-2026
title: "OPSはなぜ1を超える？――The Beauty and Limits of a Simple Baseball Stat"
subtitle: "OBP + SLGの計算、history、NPB実データ、wOBAとの比較を読み解くEnglish Mix"
created: "2026-10-16"
updated: "2026-10-16"
type: "リサーチエッセイ"
status: "完成"
tags: ["野球", "OPS", "English Mix", "スポーツデータ"]
keywords: ["OPS", "on-base percentage", "slugging percentage", "wOBA", "wRC+", "Pete Palmer"]
grow: 5
abstract: "Why can OPS exceed 1.000? 日本語を足場に、出塁率と長打率の違い、NPB公式記録による計算、指標の歴史と批判を理解する。日本語正本と同じ出典・事例を使ったEnglish Mix。"
---

# OPSはなぜ1を超える？――The Beauty and Limits of a Simple Baseball Stat
## OBP + SLGの計算、history、NPB実データ、wOBAとの比較を読み解くEnglish Mix

How can a baseball percentage go above 100%? 打率や出塁率は0〜1の数字なのに、OPSは1.000を超える。Imagine one at-bat and one home run. The batter has a 1.000 on-base percentage, a 4.000 slugging percentage, and an astonishing **5.000 OPS**. これは統計の故障ではない。The two things being added are not the same kind of probability.

OPS stands for **On-base Plus Slugging**. 出塁率（OBP）と長打率（SLG）を足し、getting on base と hitting for power を一つの数字で扱う。It's quick, intuitive, and surprisingly useful. But simple does not always mean accurate. [MLB: OPS](https://www.mlb.com/glossary/standard-stats/on-base-plus-slugging)

以下は2026年10月16日までに確認したMLB、NPB、SABR、FanGraphsの公開資料に基づく。Real player records, hypothetical examples, and the author's interpretation are kept separate.

## 1. OPS adds what batting average leaves out

Batting average is hits divided by at-bats. 100打数30安打なら.300。ただし30本すべてが単打でも、30本すべてが本塁打でも同じ打率になる。A walk also gets the hitter to first base, yet it does not improve batting average.

**OBP** counts hits, walks, and hit-by-pitches. **SLG** gives singles one total base, doubles two, triples three, and home runs four. OPS combines these two perspectives. 一つはavoid making an out、もう一つはgain more bases with a hit。打点のように前の走者の数へ直接依存する数字とも違う。[MLB: OBP](https://www.mlb.com/glossary/standard-stats/on-base-percentage) / [SLG](https://www.mlb.com/glossary/standard-stats/slugging-percentage)

Still, OPS is not the number of runs a hitter creates. それは打撃結果を手軽に要約するproxy、つまり代理指標だ。Knowing the difference is the beginning of using it well.

## 2. Slugging percentage is not a probability

The formulas matter. **OBP = (H + BB + HBP) / (AB + BB + HBP + SF)**. **SLG = total bases / AB**. **OPS = OBP + SLG**. Here H means hits, BB walks, HBP hit-by-pitches, AB at-bats, and SF sacrifice flies. 塁打は単打×1、二塁打×2、三塁打×3、本塁打×4。[MLB: OBP formula](https://www.mlb.com/stats/new-york-mets/on-base-percentage) / [Total bases](https://www.mlb.com/glossary/standard-stats/total-bases)

A plate appearance is not always an at-bat. 四球は打席（PA）に含まれても打数（AB）には入らない。犠飛は打数に入らない一方、出塁率の分母には入る。Sacrifice bunts are generally excluded from the OBP calculation. Reaching first on an error or a fielder's choice does not increase the OBP numerator. つまり日常語の「出塁」と公式統計のon-base percentageは、厳密には一致しない。[MLB: At-bat](https://www.mlb.com/glossary/standard-stats/at-bat) / [Sacrifice fly](https://www.mlb.com/glossary/standard-stats/sacrifice-fly)

SLG measures total bases **per at-bat**, not the probability of an event. 最大値は4で、OPSの理論上限は5。An OPS of 1.000 does not mean a hitter succeeds 100% of the time. It is a combined index, not a probability.

## 3. NPB's 2025 statistics reveal a rounding trap

Let's calculate from actual official data. 2025年セ・リーグ、阪神の佐藤輝明は537打数、149安打、57四球、0死球、3犠飛、311塁打。His OBP is (149 + 57) / (537 + 57 + 3) = **.345059…**. His SLG is 311 / 537 = **.579143…**. Combined, his OPS is **.924202…**, or .924 to three decimal places.[NPB official statistics, 2025](https://npb.jp/bis/2025/stats/bat_c.html)

大山悠輔の場合は、503打数、133安打、74四球、6死球、4犠飛、199塁打。His exact OBP is 213/587 = **.362862…**, and his SLG is 199/503 = **.395626…**. The unrounded OPS is **.758488…**, which rounds to **.758**. Yet the published three-decimal components are .363 and .396. Add those displayed figures and you get **.759** instead. Same underlying performance, different order of rounding. [NPB official statistics](https://npb.jp/bis/2025/stats/bat_c.html)

This is our recalculation, not a claim that NPB publishes an OPS of .758 on that page. The lesson is bigger than one decimal place: displayed numbers are sometimes rounded representations of underlying data. A tiny discrepancy can teach you where a metric comes from.

## 4. OPS won because it was easy to explain, not because it was perfect

Baseball statistics have a much longer history than modern sabermetrics. 19世紀の記録者ヘンリー・チャドウィックは、総塁打を試合数で割る長打率の原型を使っていた。ただしtoday's SLG formulaとは違う。Historian John Thorn traced this debate back to an 1867 article. [SABR: Origin of batting average](https://sabr.org/latest/thorn-the-origin-of-the-batting-average/)

The concept of OBP developed much later. MLB credits Branch Rickey and Allan Roth with its creation in the 1940s and 1950s, while noting its official adoption in 1984. 「安打を打ったか」だけでなく、「アウトを増やさなかったか」を評価する発想が積み重なった。[MLB: History of OBP](https://www.mlb.com/glossary/standard-stats/on-base-percentage)

Pete Palmer is widely credited with creating OPS. His first-person retrospective says he was using the sum by **1978**, after testing on-base times slugging. In 1984, his book *The Hidden Game of Baseball*, coauthored with John Thorn, helped spread the idea. 「1984年に突然発明」とするより、研究の蓄積と普及を分けて読むのが正確だ。[SABR: Why OPS Works](https://sabr.org/journal/article/why-ops-works/)

Palmer knew that weighting OBP more heavily could improve the estimate of runs slightly. But greater complexity could make the metric much less accessible. OPS survived because its simplicity made it shareable. It was not perfect science; it was useful communication backed by reasonable predictive power.

## 5. Equal OPS does not mean equal offensive value

Here is a thought experiment with two imaginary hitters, each with 100 at-bats and no walks, hit-by-pitches, or sacrifice flies. **Player A** hits 45 singles: OBP .450, SLG .450, OPS **.900**. **Player B** hits 20 singles and 10 home runs: OBP .300, SLG .600, OPS **.900**. 同じ.900なのに、出塁回数も本塁打数も大きく異なる。

OPS treats one point of OBP as interchangeable with one point of SLG. But their relationship to scoring runs is not identical. FanGraphs gives roughly **1.8 to 1** as a useful approximation for the relative value of OBP and SLG changes. ただしこの重みはどのリーグ・時代でも固定ではないし、単に出塁率×1.8とすれば問題が解決するわけでもない。Each event has its own run value.[FanGraphs: wOBA](https://library.fangraphs.com/offense/woba/) / [Hardball Times: OPS biases](https://tht.fangraphs.com/comparing-marginal-effects-of-offensive-events-upon-woba-and-ops/)

Let's go one step further. A 2011 analysis uses example wOBA weights of **0.89 for a single** and **2.08 for a home run**. この二つの係数で単純化して計算すると、Aは(45×0.89)/100 = **.4005**、Bは(20×0.89 + 10×2.08)/100 = **.3860**となる。This is an illustrative calculation using one year's weights, not a real-player ranking or a universal formula. But it demonstrates why two equal OPS values can conceal different expected contributions to scoring.[Hardball Times: 2011 coefficients](https://tht.fangraphs.com/comparing-marginal-effects-of-offensive-events-upon-woba-and-ops/)

The point is not that singles always beat home runs. It is that a simple sum can hide differences that matter to the question we actually want to answer.

## 6. OPS+, wOBA and wRC+ solve different problems

There are two main problems: **context** and **weights**. 同じ打撃でも本拠地やリーグによって数字が変わるし、打撃結果ごとの得点価値も同じではない。

**OPS+** adjusts for league and ballpark context, setting the average at 100. A score of 150 means the adjusted index is 50% above its league-average baseline. ただし「すべての場面で得点を50％多く生む」と断定する値ではない。The basic league-relative expression published by MLB is 100 × (OBP/lgOBP + SLG/lgSLG − 1), with park adjustments added in practice. OPS+ improves comparability without fully fixing the weighting problem. [MLB: OPS+](https://www.mlb.com/glossary/advanced-stats/on-base-plus-slugging-plus) / [Baseball-Reference: Park adjustment](https://www.baseball-reference.com/about/bat_glossary.shtml)

**wOBA, weighted on-base average**, gives different run-value weights to walks and different kinds of hits. 日本語では加重出塁率。Its scale resembles OBP for convenience, but it is not just another probability of reaching base. [FanGraphs: wOBA](https://library.fangraphs.com/offense/woba/)

**wRC+, weighted runs created plus**, converts estimated offensive production into a league- and park-adjusted index with 100 as average. A 125 wRC+ represents approximately 25% more batting runs created per plate appearance than league average under that model. 守備、走塁全体、守備位置の希少価値まで自動的に含む数字ではない。More sophisticated does not mean all-inclusive. [FanGraphs: wRC+](https://library.fangraphs.com/offense/wrc/)

## 7. What OPS leaves out beyond the batter's box

Sample size is the first caution. OPS .950 over ten plate appearances and OPS .950 over six hundred are not equally strong evidence of ability. 途中経過や一時的な好調を実力と混同しないこと。

Environment is the second. Ballpark dimensions, weather, baseballs, league pitching quality, and historical scoring conditions vary. 「OPS .800なら必ず優秀」という絶対基準は、リーグや年度をまたぐと危うい。Compare against the relevant league and season. [Baseball-Reference: OPS guide](https://www.baseball-reference.com/glossary/on-base-plus-slugging/)

Scope is the third. OPS excludes stolen-base value, other baserunning outcomes, defense, positional demands, and much of the tactical context. 総合選手評価が必要なら、打撃以外も見なければならない。One rate statistic cannot tell the whole baseball story.

## 8. Use OPS as a starting point, not a verdict

For a quick scouting discussion, begin with OPS and then split it into OBP and SLG. OPS .850 can mean .420 + .430, or .320 + .530. Those hitters reach the same sum through different skills. 前者は出塁機会、後者は長打の構成に関心が向く。

Then investigate plate appearances, walk rate, strikeout rate, splits against left- and right-handed pitching, ballparks, and multi-year trends. When comparing across different settings, use OPS+ or wRC+. 補強や契約なら守備、走塁、健康、年齢、ポジションも加える。OPS works best as a guide for what to ask next.

Useful vocabulary: **AVG** = batting average（打率）; **OBP** = on-base percentage（出塁率）; **SLG** = slugging percentage（長打率）; **ISO** = isolated power, SLG minus AVG（純長打率）; **PA** = plate appearances（打席）; **AB** = at-bats（打数）; **run expectancy** = expected runs from a base-out state（得点期待値）; **linear weights** = assigning typical run values to outcomes（線形加重）。[MLB: At-bats](https://www.mlb.com/glossary/standard-stats/at-bat) / [SABR: Why OPS Works](https://sabr.org/journal/article/why-ops-works/)

## 9. The most useful metric is one whose compromises you understand

Back to the original puzzle: can OPS exceed 100%? Yes, because it is not a probability in the first place. Palmer chose a sum that was simple enough to spread, while retaining much of the information needed to discuss offensive production. その妥協が、数字を実用的なものにした。

Yet the same OPS can describe different hitters, and rounding alone can change the last displayed decimal. Numbers are both messier and more helpful than they first appear. A mature way to read a metric is not to memorize whether it is "good." It is to explain **what question it answers, and what question it leaves open**.

## Sources and methodological notes

- [MLB: OPS](https://www.mlb.com/glossary/standard-stats/on-base-plus-slugging), [OBP](https://www.mlb.com/glossary/standard-stats/on-base-percentage), [SLG](https://www.mlb.com/glossary/standard-stats/slugging-percentage), [OPS+](https://www.mlb.com/glossary/advanced-stats/on-base-plus-slugging-plus)
- [NPB: 2025 Central League official statistics](https://npb.jp/bis/2025/stats/bat_c.html) — real source counts; OPS values are independently recalculated here
- [SABR: Pete Palmer, Why OPS Works](https://sabr.org/journal/article/why-ops-works/) — first-person history
- [SABR: Origin of batting average](https://sabr.org/latest/thorn-the-origin-of-the-batting-average/) — 19th-century history
- [FanGraphs: OPS](https://library.fangraphs.com/offense/ops/), [wOBA](https://library.fangraphs.com/offense/woba/), [wRC+](https://library.fangraphs.com/offense/wrc/)
- [The Hardball Times: OPS and event weights](https://tht.fangraphs.com/comparing-marginal-effects-of-offensive-events-upon-woba-and-ops/)

**Evidence boundary:** NPB data and published definitions are sourced facts. Players A and B are hypothetical, and the 2011-weight calculation is an explanatory model. Metric selection for scouting or contracts is a recommendation, not an independently demonstrated outcome.