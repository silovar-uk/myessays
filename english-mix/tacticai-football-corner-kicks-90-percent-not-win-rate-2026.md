---
id: tacticai-football-corner-kicks-90-percent-not-win-rate-2026
title: "AIにコーナーキックを見せると、What Changes for a Coach?"
subtitle: "TacticAIを読む：90% is expert preference, not a win rate"
created: "2026-10-21"
updated: "2026-10-21"
type: "論文解説・English Mix"
status: "完成"
tags: ["TacticAI", "Football", "AI", "English Mix"]
keywords: ["TacticAI", "graph neural network", "geometric deep learning", "corner kick", "counterfactual"]
grow: 5
abstract: "TacticAI is an AI assistant for corner-kick tactics, developed with Liverpool FC. 日本語を土台に、graph, prediction, refinement, validationといった語を研究の文脈で学ぶ。90%という専門家評価の意味と限界を正確に読み解く。"
---

# AIにコーナーキックを見せると、What Changes for a Coach?
## TacticAIを読む：90% is expert preference, not a win rate

A football AI that does not track the ball's flight sounds like a strange invention. それでもGoogle DeepMindとリバプールFCの共同研究TacticAIは、キック直前の22人の位置・速度・身長・体重などから、who gets the first touch, whether a shot follows, and how to adjust the setupを分析した。

The headline number is 90%. だが意味は「得点率90%」ではない。**In 45 out of 50 evaluated situations, a majority of five experts rated the proposed tactical refinement favourably.** ここから始めると、この研究の輪郭がずっと正確に見える。

Original paper: [Wang et al., Nature Communications (2024)](https://doi.org/10.1038/s41467-024-45965-x). [Full text](https://pmc.ncbi.nlm.nih.gov/articles/PMC10951310/). This article separates the paper's findings from editorial interpretations and proposed business applications.

## 1. 90%は勝率ではなく、expert preferenceだった

Five Liverpool FC specialists took part: three data scientists, a video analyst, and a coaching assistant. They evaluated 50 suggested adjustments against actual corner-kick setups using +1 for meaningful improvement, −1 for worsening, and 0 for no meaningful difference.

**The result: 45/50 cases received favourable majority ratings.** The average expert rating was 0.7 ± 0.1. これは*match outcomes*の検証ではなく、*expert judgement*の結果だ。

| What it does NOT mean | What the paper actually reports |
| --- | --- |
| 勝率が90%になる | 50場面のうち45場面で専門家の評価が好意的 |
| AI beats a head coach | AI-generated refinements were compared with original setups |
| On-field goals were increased | Predictive benchmarks and expert evaluations were conducted |

The critical distinction is between **plausible advice** and **demonstrated on-field impact**. 両者は似ているが、検証に必要なデータは違う。

## 2. Corner kicks are a useful laboratory for tactical decisions

Open play is chaotic. Every player, the ball, and the opponent's reactions change constantly. コーナーキックなら、固定位置から再開され、選手は準備した配置を作れる。

The paper notes roughly ten corners per match. Repetition, a fixed starting point, and direct relevance to scoring make the problem tractable. 研究上の工夫は、AIを万能にするのではなく、**choosing a decision that coaches can actually change**という問いの絞り込みにある。

That is a general product lesson: start with an actionable problem, not with an impressive model.

## 3. A graph represents relationships, not a line chart

A *graph* means a set of **nodes and edges**. Here each player is a node. Connections encode whether two players are teammates or opponents, while each node carries position, movement speed, height and weight.

A run to the near post matters because of the defenders around it. 誰かの座標を単独で読むだけでは、マークを引きつける意味やスペースの変化は分からない。

A *Graph Neural Network (GNN)* repeatedly exchanges and aggregates information between connected nodes. This process is known as *message passing*. 位置の集合を、関係を含んだ表現へ変えていく。

![Original Figure 1: players as nodes and a graph-based architecture for TacticAI](https://media.springernature.com/full/springer-static/image/art%3A10.1038%2Fs41467-024-45965-x/MediaObjects/41467_2024_45965_Fig1_HTML.png "Original Fig. 1. Graph representation, reflection symmetry and the three model outputs.")

Source: Wang et al. (2024), [Fig. 1](https://www.nature.com/articles/s41467-024-45965-x/figures/1), unmodified; [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).

## 4. Geometric deep learning uses symmetry to learn more efficiently

Imagine reflecting a corner-kick setup across the field. 幾何学的な反転をしても、選手間の配置関係を対応づけられることがある。

The model explicitly combines four reflected views. This is *geometric deep learning*: using known spatial structure rather than forcing the network to learn every symmetry from scratch. 高品質なデータが限られる競技では、とくに合理的な設計だ。

This does not prove left and right corners are identical in real matches. 利き足や特有の動きなど、現実の左右差まで消えるわけではない。It means the architecture respects specified geometric transformations.

## 5. 7,176 examples required substantial data cleaning

The raw dataset contained **9,693 corners** across the 2020–21, 2021–22 and part of the 2022–23 Premier League seasons. The researchers aligned tracking, event, line-up and match data; **2,517** examples were removed because of missing or mismatched information.

| Data stage | Corners |
| --- | ---: |
| Raw events | 9,693 |
| Excluded | 2,517 |
| Usable for training and evaluation | 7,176 |
| Labelled as threatening shots | 1,736 |
| Labelled as no shot | 5,440 |

The usable data were split 80% for training and 20% for testing. The original tracking stream ran at 25 frames per second, but the input for each corner used the frame at the moment of the kick. The model did not encode the ball trajectory or the players' vertical movement.

AI research starts with data operations. **Matching timestamps and event identities is not glamorous, but it determines whether a model can learn at all.** [Methods](https://pmc.ncbi.nlm.nih.gov/articles/PMC10951310/).

## 6. Predicting the receiver first improves shot prediction

The first model estimates the *first receiver* of a corner—the first player touching the ball, from either team. Its *top-3 accuracy* was **0.782 ± 0.039**. これは正解者が「予測上位3人に含まれる割合」であって、top-1の正解率ではない。

Direct shot prediction reached an **F1 score of 0.52 ± 0.03**. F1 balances precision and recall, so it is not the same as accuracy or shot probability.

Then the researchers factored the problem into **who receives the ball** and **how likely a shot is given that receiver**. The conditional method reached 0.68 ± 0.04; with geometric processing, **0.71 ± 0.01**.

| Benchmark | Reported result |
| --- | ---: |
| Receiver prediction, top-3 accuracy | 0.782 ± 0.039 |
| Shot prediction, direct F1 | 0.52 ± 0.03 |
| Shot prediction, conditional F1 | 0.68 ± 0.04 |
| Shot prediction, geometric conditional F1 | 0.71 ± 0.01 |

The conceptual move is decomposition: **the intermediate question helps answer the bigger question**. ただし、この研究の比較結果であり、すべてのタスクで同じ改善が起きるという一般法則ではない。

## 7. The most interesting output is an alternative setup

Prediction is only one part. TacticAI also generates *tactical refinements*—alternative player positions and velocities. ここが「何が起きそうか」から「位置を変えたら何が違うか」への転換になる。

![Original Figure 3: defensive refinements suggested by TacticAI and changes in receiver probabilities](https://media.springernature.com/lw1200/springer-static/image/art%3A10.1038%2Fs41467-024-45965-x/MediaObjects/41467_2024_45965_Fig3_HTML.png "Original Fig. 3. Comparison of an original corner setup and AI-generated defensive adjustments.")

Source: Wang et al. (2024), [Fig. 3](https://www.nature.com/articles/s41467-024-45965-x/figures/3), unmodified; [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).

In an internal evaluation, the model's predicted shot probability went from **0.75 to 0.69** for defensive refinements, and from **0.18 to 0.31** for attacking refinements.

These are model-estimated probabilities, **not observed changes in match scoring**. 攻守の双方が同時に適応する現実と違い、生成時には片方のチームを固定している点にも注意がいる。

You can describe this as *counterfactual exploration*—exploring a hypothetical alternative—but not as proof of a causal effect on real match results.

## 8. Realistic does not mean proven effective on the pitch

A classifier struggled to distinguish real corners from generated setups, reporting **F1 = 0.53 ± 0.05**. Human experts achieved **F1 = 0.60 ± 0.04** on a related realism task.

These findings support *plausibility*. They do not establish that players can execute every suggestion under pressure, that the opponent cannot adapt, or that real goals will increase. さらに専門家は一クラブの5人。他リーグ、育成年代、女子サッカーへの適用可能性を評価するには別の検証が必要になる。

The serious next question is not merely *Does it look right?* It is *Can a coach implement it, and will it improve decisions over time?*

## 9. In practice, build a tactical workbench rather than an AI head coach

ここからは**筆者による提案**であり、論文が商用効果を実証したものではない。

A useful workflow could be: **licensed video and tracking → synchronized events → retrieval of similar corners → suggested refinements → coach review → practice clips → outcome evaluation**.

A staff member searches for an opponent's familiar corner routine. The model proposes several defensive shapes. The coach compares the clips and decides whether each adjustment fits available players and training time. AI becomes a *decision-support tool*, not the final decision-maker.

For the media and analytics business, the potential value may sit in the entire data-to-coaching workflow, rather than in selling the model alone. ただし追跡データの取得権、放送映像の視野外選手、データ品質、共有権限は個別に検証しないといけない。

## 10. Commercial insight: what can be sold, and what must be validated?

技術、利用、収益を混同しないことが肝心だ。

- **Technology:** graph representations and symmetry-aware models may improve specific prediction tasks.
- **User value:** comparing alternatives may help coaches prepare, but needs a workflow study.
- **Business value:** data acquisition, integration, search, visualization and delivery could form a product; pricing and willingness to pay are still hypotheses.
- **Validation:** compare analysis time, accepted recommendations, training feasibility and observed outcomes against the current method.

The first sales question should be **Who has access to reliable tracking data, and who actually uses tactical reports?** 顧客の業務を見ずに「90%」だけを売り文句にしても、サービスの価値は説明できない。

## 11. Research openness has a practical boundary

The paper and figures are publicly available. Human-expert study data and statistical analysis scripts are available on [Zenodo](https://zenodo.org/records/10557063). However, the proprietary raw inputs/outputs and the TacticAI-specific implementation were not released. Components related to the underlying GNN processors are available through [Google DeepMind CLRS](https://github.com/google-deepmind/clrs), but they are not the complete TacticAI system.

A peer-reviewed paper can make an idea understandable without making its complete production pipeline reproducible. ここは新規事業の構想でも見逃してはいけない境界だ。

## 12. The final insight: tactics are relationships between players

At first, the lack of ball-trajectory input looked like a flaw. 読後には違う景色に見える。TacticAIが示したのは「ボールがなくてもすべて分かる」ではなく、**the geometry of people already contains useful information about what may happen next**ということだ。

The shift from prediction to comparing alternatives is more important than the headline number. AI does not have to become the coach. It may become a better surface on which coaches can test and debate hypotheses.

The ball attracts our eyes. But the spaces that make a touch possible are shaped by the players around it.

---

**Sources and limits:** [Original research](https://doi.org/10.1038/s41467-024-45965-x) / [PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC10951310/) / [Zenodo](https://zenodo.org/records/10557063). Original Figs. 1 and 3 reused without modification under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). This article does not claim demonstrated improvements to actual match win rates, real goals scored, or current deployment status at Liverpool FC.
