---
id: "marimekko-chart-market-structure-2026"
title: "What Does a Marimekko Chart Reveal?｜マリメッコ図は、何を市場の構造として見せるのか"
subtitle: "Market size, composition and area"
created: "2026-11-26"
updated: "2026-11-26"
type: "Research Essay"
status: "公開"
tags: ["データ可視化", "経営戦略", "統計学", "資料作成", "守破離", "English Mix"]
keywords: ["マリメッコ図", "モザイク図", "市場規模", "構成比", "バーメッコ図", "利益分布", "類型化"]
grow: 5
abstract: "A Marimekko chart encodes market size and composition together. 統計学と視覚認知の研究から、図の可能性と限界を検証し、経営判断への応用を考える。"
---

# What Does a Marimekko Chart Reveal?｜マリメッコ図は、何を市場の構造として見せるのか

## Market size, composition and area｜可視化と意思決定

Should a company pursue a large market or a market where it already has a strong position? 市場規模と市場占有率は、それぞれ異なる判断材料になる。A 30% share of a ¥50 billion market and a 60% share of a ¥30 billion market—which produces more revenue? マリメッコ図は、二つの数字の関係を一枚の図で考える手法である。

## 1｜守：A percentage alone cannot tell us the actual size

A bar chart compares quantities. If markets A, B and C are worth ¥50 billion, ¥30 billion and ¥20 billion, their bars have a ratio of 5:3:2. しかし、その棒だけでは各市場における企業別売上は分からない。Comparing size and comparing internal composition are different questions.

A 100% stacked bar chart shows the composition within each market. Company A has 30%, 60% and 10% shares in markets A, B and C. 市場Bでの強さは分かるが、棒を同じ幅にすると市場規模の違いが見えなくなる。Clarity about percentages comes at the cost of information about their denominators.

![Market size, composition and Marimekko chart](https://silovar-uk.github.io/myessays/assets/marimekko-2026/comparison.svg)

Figure 1: Original illustration using hypothetical data. 通常の棒グラフは市場規模、100%積み上げ棒グラフは市場占有率、マリメッコ図は両方を示す。

## 2｜守：Width multiplied by height gives area a meaning

In a Marimekko chart, column width represents market size and segment height represents share. 市場Aでは500億円×30%=150億円、市場Bでは300億円×60%=180億円、市場Cでは200億円×10%=20億円。Market B is smaller than market A, yet it generates more revenue for company A. Area makes this reversal visible. See the [official think-cell manual](https://www.think-cell.com/ja/resources/manual/mekko).

In probability terms, width is the marginal probability, height is the conditional probability, and area is the joint probability. 市場Bが全体の30%、その中のA社の占有率が60%なら、全体に占める当該売上は30%×60%=18%。The chart is a visual form of multiplication.

## 3｜守：Statistical mosaics reveal relationships between categories

The name Marimekko is sometimes linked to the patterns of the Finnish fashion and textile brand. ただし、ビジネス用の名称がいつ誰によって使われ始めたかは今回確認できなかった。The related statistical mosaic plot has a clearer history: John Hartigan and Beat Kleiner proposed it in 1981, and Michael Friendly extended it in 1994 to visualize deviations from statistical models through shading and color. [Original paper](https://doi.org/10.1080/01621459.1994.10476460).

Friendly uses data on hair and eye color from 592 people. There were 68 people with black hair and brown eyes. If the two attributes were independent, the expected count would be 108×220÷592, or about 40. 観測値と期待値の差が残差（Residual）である。Color can highlight departures from the baseline model instead of simply identifying categories. See [Friendly's explanation, Figure 5](https://friendly.github.io/papers/drew/).

![Mosaic reconstructed from the published data](https://silovar-uk.github.io/myessays/assets/marimekko-2026/mosaic.svg)

Figure 2: Original reconstruction from Table 1 of Friendly's public paper. 色は期待人数との差の方向のみを表し、原著の濃淡・検定基準を再現していない。[Original Figure 5 (image address)](https://friendly.github.io/papers/drew/fig/mosaic34.gif).

## 4｜Research plan: Does more information improve judgment?

Encoding two quantities in one figure is an advantage, but it does not prove better decisions. Four questions guide the second round: How accurately can people compare areas? Does non-use imply opportunity? Can categories be tested? What other quantities can be multiplied? 視覚認知研究・統計学の原著・公式マニュアルを照合し、実務上の応用は仮説として扱う。

## 5｜破：Discovering structure and reading precise values are different tasks

In 1984, William Cleveland and Robert McGill studied graphical perception. Judgments based on position or length are generally more accurate than judgments of area. [Original study](https://doi.org/10.1080/01621459.1984.10478080). マリメッコ図で二つの長方形を比較するには、高さと幅の両方を考える必要がある。A chart that reveals structure may not be the best chart for precise ranking.

## 6｜破：A large non-user population does not prove large demand

Consider automatic sports filming. Suppose paid adoption is 45% in team sports and 5% in sports involving free movement across large spaces. 後者は未開拓市場に見える。しかし、tracking technology may be inadequate, prices may be too high, existing cameras may be sufficient, or people may simply not want recordings. The same observation can support competing explanations with very different strategic implications.

![Adoption by sport category](https://silovar-uk.github.io/myessays/assets/marimekko-2026/adoption.svg)

Figure 3: Original illustration. All population and adoption numbers are hypothetical, not measured market data.

Abduction is inference that proposes explanations for observed facts. 次に必要なのは、未利用者への聞き取り、価格別の購入意向、既存機器との品質比較である。Unmet needs and willingness to pay would support an entry hypothesis; satisfaction with alternatives would weaken it. Visual white space is not automatically a profitable market.

## 7｜破：A useful classification captures differences that matter

Suppose three sport categories each contain 100 survey respondents. If 50 in every category want recordings, this sample shows no difference in rates. If the counts are 80, 50 and 20, the expected count under independence is 50 each, producing residuals of +30, 0 and -30. 類型が説明したい差異を捉えているかを調べられる。ただし、sampling bias, sample size and statistical tests matter. Association is not causation.

Classification is not just neat organization. 撮影場所や追尾対象による分類が、競技名による分類より購入意向を説明できるかもしれない。That is an untested hypothesis; competing classifications need comparison on the same data. The chart can help question the classification itself, not merely present its result.

## 8｜離：Growth and profit rates reveal different business questions

A variable-width chart with non-uniform column heights is sometimes called a Bar Mekko chart. Width can represent opening market size and height the growth rate over the same period. 市場Aは500億円×3%=15億円、市場Bは300億円×10%=30億円、市場Cは200億円×20%=40億円。Current market size and new market growth are not the same. A different question calls for a different encoding.

![Bar Mekko chart showing absolute market growth](https://silovar-uk.github.io/myessays/assets/marimekko-2026/growth.svg)

Figure 4: Original illustration using hypothetical data. Area represents opening market size multiplied by growth rate over the same period.

The same idea connects to profit pools. In 1998, Orit Gadiesh and James L. Gilbert discussed mapping where profits arise along an industry's value chain. [Bibliographic record and abstract](https://pubmed.ncbi.nlm.nih.gov/10179650/). 撮影機器の売上が大きくても、配信や映像分析に利益が集中する可能性がある。Revenue times a consistently defined profit margin gives profit, but cost allocation and double counting must be addressed.

## 9｜離：An overall average can reverse the pattern within groups

Compare two advertising campaigns. Existing fans purchase at 80% under A and 90% under B; new fans purchase at 10% and 20%. B performs better in each group. しかしAの対象が既存900人・新規100人、Bが既存100人・新規900人なら、全体購入率はAが73%、Bが27%。This reversal is Simpson's paradox. A chart showing both denominators and rates helps reveal how the overall average was formed.

![Simpson's paradox illustrated](https://silovar-uk.github.io/myessays/assets/marimekko-2026/simpson.svg)

Figure 5: Original illustration of hypothetical campaigns. A has 730 purchasers and B has 270; these figures do not estimate causal effects.

## 10｜Choose the chart according to the question

Use a bar chart for size, a 100% stacked bar chart for composition, and a Marimekko chart for their relationship. A Bar Mekko chart suits a meaningful product of two quantities; a treemap suits hierarchy, and a bubble chart can show three variables. 市場規模×5段階の技術難易度には通常、明確な経済的意味がない。A scatterplot or assessment matrix may be more appropriate. The choice should follow the decision question.

## 11｜Practical output: Connect market estimates and competitive analysis

Distinguish total addressable market (TAM), serviceable available market (SAM), and serviceable obtainable market (SOM). If three markets worth 500, 300 and 200億円 have serviceable shares of 10%, 20% and 40%, SAM is 50+60+80=190億円. 推計結果は対応可能率の仮定に依存する。Visualizing each market can make sensitivity easier to understand. SAM is not forecast revenue; competition and sales capacity still matter.

As a practical proposal, start with sport participation and age composition, then add paid, free and non-user segments. Estimate serviceable markets only when the assumptions can be justified; analyze competitors when revenue data is available; finally compare revenue and profit margins across the value chain. 母集団、年度、重複、推計条件を明記する。Start with four to six columns and three to four colors, using labels or bar charts for exact comparisons. This is an editorial guideline, not a universal rule.

Tools include think-cell for PowerPoint, Tableau for analysis, and R for statistical work. The [think-cell manual](https://www.think-cell.com/ja/resources/manual/mekko) explains variable-width columns; the [R mosaicplot documentation](https://stat.ethz.ch/R-manual/R-devel/library/graphics/html/mosaicplot.html) covers residual shading. 分析と資料作成の目的は異なるため、まず計算表を検証してから図を整える。

## 12｜Conclusion: Design a question that gives area meaning

Fact: A Marimekko chart can represent size and composition together, giving quantitative meaning to area. ただし面積の比較には認知上の限界があり、分類と母数によって見える構造は変わる。

Interpretation: Seeing size and proportion together can help generate hypotheses. But a large non-user segment does not establish demand or profit. 図が示す関係と、その関係を生んだ原因は別の問題である。

Proposal: Before drawing, explain what width, height and area each mean. Then decide what evidence could disprove the hypothesis suggested by the figure. 可視化は結論の装飾ではない。It is a way to make the structure of a question explicit and reconsider whether that question is worth answering.

## References

- [think-cell: Mekko charts](https://www.think-cell.com/ja/resources/manual/mekko)
- [Friendly (1994): Mosaic Displays for Multi-Way Contingency Tables](https://doi.org/10.1080/01621459.1994.10476460)
- [Friendly: Extending Mosaic Displays, Table 1 and Figures 3–5](https://friendly.github.io/papers/drew/)
- [Cleveland and McGill (1984): Graphical Perception](https://doi.org/10.1080/01621459.1984.10478080)
- [Gadiesh and Gilbert (1998): How to Map Your Industry's Profit Pool](https://pubmed.ncbi.nlm.nih.gov/10179650/)
- [Hayot (2014): The Elements of Academic Style](https://cup.columbia.edu/book/the-elements-of-academic-style/9780231168007/)
- [R documentation: mosaicplot](https://stat.ethz.ch/R-manual/R-devel/library/graphics/html/mosaicplot.html)
