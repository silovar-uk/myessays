---
id: "clustering-impossibility-what-classification-sacrifices-2026"
title: "What Do We Give Up When We Classify?｜分類するとは、何を諦めることなのか"
subtitle: "The clustering impossibility theorem and meaningful categories"
created: "2026-11-26"
updated: "2026-11-26"
type: "Research Essay"
status: "公開"
tags: ["分類", "クラスタリング", "数学", "意思決定", "人工知能", "経営戦略", "守破離", "English Mix"]
keywords: ["clustering", "impossibility theorem", "decision-making", "information loss"]
grow: 5
abstract: "Can one clustering rule satisfy every desirable property? クラインバーグの定理と後続研究を手掛かりに、分類が保存する情報、失う情報、意思決定への有用性を考える。"
---

# What Do We Give Up When We Classify?｜分類するとは、何を諦めることなのか

鮭、ツナマヨ、梅、明太子、昆布、焼きおにぎり。How would you group these six rice balls? By ingredients, price, or cooking method? 焼きおにぎりだけ具材による分類では立場がやや不安定だが、それは焼きおにぎりの責任ではない。

A nutritionist, a product developer, and a store manager may choose different categories. None of them is necessarily wrong. 対象間の類似性を完全に数値化できれば、この問題は解決するのだろうか。In 2002, computer scientist Jon Kleinberg placed a mathematical limit on that expectation.

## 1｜守：Even with distances, grouping remains a problem

Clustering（クラスタリング）is a common form of unsupervised learning. It groups objects using information about their similarity. 例えば顧客を年間購入金額と購入頻度で表すと、正解ラベルがなくても集団を抽出できる。

But choosing these two features already excludes age, location and reasons for purchase. 何を観測し、何を似ているとみなし、どの程度近ければまとめるか。These are different decisions.

Kleinberg starts with the last question. There are at least two objects. Distances between distinct objects are positive and symmetric. The original setting does not require the triangle inequality. The function takes the distances as input and returns one partition（分割）, with every object in exactly one group. 比較基準が決まっていても、分類関数の設計は別の問題として残る。

## 2｜守：Three reasonable axioms cannot coexist

An axiom is a condition we accept as a starting point. 原著は三つの条件を設定した。

- Scale invariance（尺度不変性）：Multiplying every distance by the same positive number leaves the partition unchanged. Changing meters to centimeters should not change the groups.
- Richness（豊富性）：Every partition of the same set must be attainable for some choice of distances. A rule that always returns exactly three groups fails this condition.
- Consistency（整合性）：Make distances within the existing groups smaller and distances between groups larger, allowing unchanged distances too. The original partition must remain.

Theorem 2.1 says that no clustering function satisfies all three for a set of two or more objects. [Original paper, Section 2](https://proceedings.neurips.cc/paper_files/paper/2002/file/43e4e6a6f341e00671e123714de019a8-Paper.pdf).

二点だけなら、distance 1 and distance 100 differ only by a positive multiplier. Scale invariance requires the same output. Richness, however, demands that both one group and two groups be possible. この場合は二条件だけで矛盾する。

For any number of objects, richness guarantees an input that produces one group. Take any other distance input and shrink it until every pairwise distance is at most the corresponding distance in that first input. Consistency forces the shrunken input to produce one group. Scale invariance forces the original input to do so as well. つまり全ての入力で一集団となり、豊富性と矛盾する。

The problem is not computational difficulty. The requested properties contradict each other.

## 3｜守：Freedom to change granularity also has a limit

Theorem 3.1 goes further. If one clustering function satisfies scale invariance and consistency, its possible outputs form an antichain（反鎖）. No two distinct outputs can have a refinement relationship.

For example, compare {A, B} / {C, D} with {A} / {B} / {C, D}. 後者は前者を細分化しただけである。A single function satisfying both axioms cannot include both partitions in its range, even for different distance inputs. [Original paper, Section 3](https://proceedings.neurips.cc/paper_files/paper/2002/file/43e4e6a6f341e00671e123714de019a8-Paper.pdf).

Changing the level of detail looks like a convenient feature. しかし、粒度を自由に変えることも分類関数の性質と無関係ではない。This does not rule out a method that returns an entire hierarchy rather than one partition.

## 4｜破：Existing methods work by accepting trade-offs

Single-linkage（単連結法）merges the closest groups in sequence. The stopping rule determines which axioms it can satisfy.

| Stopping rule | Properties retained | Property sacrificed |
| --- | --- | --- |
| Fixed number of groups | Scale invariance, consistency | Richness |
| Absolute distance threshold | Richness, consistency | Scale invariance |
| Threshold relative to maximum distance | Scale invariance, richness | Consistency |

The last row concerns the original general distance setting with at least three objects and a threshold coefficient strictly between zero and one. The identical conditions need not carry over when the triangle inequality is required. [Theorem 2.2](https://proceedings.neurips.cc/paper_files/paper/2002/file/43e4e6a6f341e00671e123714de019a8-Paper.pdf).

「三つの類型にしてください」という依頼は資料作成でよくある。Three groups may fit a slide beautifully. But fixing the number sacrifices richness. 資料の目的が伝達なら、それは必ずしも悪くない。The danger is treating a useful compromise as a universal truth.

## 5｜破：Later research changed the problem, not the proof

At first, the theorem seemed to expose a universal limit of grouping. But what exactly does the function return? その問いを起点に後続研究を読むと、見方が変わる。

In 2008, Shai Ben-David and Margareta Ackerman studied axioms for clustering quality measures. They evaluated a given partition instead of directly choosing one. [Measures of Clustering Quality](https://papers.nips.cc/paper_files/paper/2008/hash/beed13602b9b0e6ecb5b568ff5058f07-Abstract.html).

In 2010, Gunnar Carlsson and Facundo Mémoli examined hierarchical clustering through axioms, including characterization and stability. 一つの分割ではなく階層構造が出力される。[Hierarchical clustering](https://www.jmlr.org/papers/v11/carlsson10a.html).

In 2012, Ulrike von Luxburg and colleagues argued that evaluation is difficult without asking why users cluster data and what they do with the result. [Clustering: Science or Art?](https://proceedings.mlr.press/v27/luxburg12a.html).

In 2018, Vincent Cohen-Addad and colleagues modified consistency so that it is required only when the appropriate number of clusters, determined using a cost function, stays unchanged. [Clustering Redemption](https://papers.nips.cc/paper_files/paper/2018/hash/6fbd841e2e4b2938351a4f9b68f12e6b-Abstract.html).

None of these studies disproves the original theorem. They reconsider what the problem should be. 分類の困難さは、計算手法だけで解決するとは限らない。

## 6｜離：Before choosing groups, we must decide what similarity means

Practical classification involves several stages: choosing features, defining distances, forming groups, interpreting them, and making decisions. Kleinberg's theorem directly concerns the third stage.

In the same year, Eric P. Xing and colleagues studied metric learning（距離計量学習）using examples of similar objects to learn a distance measure. [Distance Metric Learning](https://proceedings.neurips.cc/paper/2002/hash/c3e4035af2a1cde9f21e1ae1951ac80b-Abstract.html).

One study explores limits after distances are given; the other explores how to define distances. この対照は、分類結果の改善には比較基準そのものの検討も必要であることを示唆する。

## 7｜離：Different decisions may require different categories

Consider the market for automated sports recording. Football, basketball, baseball, tennis, table tennis and golf can be grouped into team sports and mainly individual sports.

For camera development, however, other features may matter: the size of the playing area, how far subjects move, the number of points of interest, and the need to change viewpoints. 試合・プレー撮影を想定した仮説なら、football and basketball involve group movement; baseball has multiple points of interest; tennis and table tennis involve rallies in limited spaces; golf involves tracking across a wide area. Training footage may require different groups.

The familiar team-versus-individual distinction is not wrong. It may simply lack explanatory power for this decision.

Here is the essay's own hypothesis: instead of asking only “Which objects are similar?”, ask “For which objects is the same action effective?” 救急外来で診療の優先度を決める際、年齢だけでなく緊急性を重視するのと同じ発想だ。The focus shifts from observed features to the consequences of action.

## 8｜離：Information loss can be evaluated through decisions

Imagine four markets and two products. The following expected profits, in units of 100 million yen, are fictional.

| Market | Product A | Product B |
| --- | ---: | ---: |
| 1 | 10 | 2 |
| 2 | 8 | 3 |
| 3 | 2 | 9 |
| 4 | 3 | 7 |

Choosing the best product separately for each market yields 34. Now impose a constraint: each category must receive one common product.

Grouping 1 and 2 together, and 3 and 4 together, allows Product A for the first group and Product B for the second. The total stays at 34.

Grouping 1 and 3 together, and 2 and 4 together, makes A optimal for the first group and B optimal for the second, yielding only 22. 個別最適と比べた差は12億円になる。

Both classifications produce two neat groups. The difference is which information survives and how it affects the decision. Classification is a form of information compression. Its value may depend not only on how much information is removed, but on how much decision quality is preserved. これは定理から直接導かれる結果ではなく、本稿の仮説である。

## 9｜提案：Ask AI to generate and test classification hypotheses separately

Generative AI can produce neat labels and two-axis diagrams. But it may not make clear which information the chosen axes preserve and which they discard. Generating categories and evaluating categories are different tasks.

A practical workflow is proposed here:

1. Define the decision and the conditions that change it.
2. Generate alternative classifications based on features, customer needs, technology, economics and strategy.
3. Look for counterexamples: objects in one group that need different actions, and objects in different groups that need the same action. Check borderline cases and the effects of merging or splitting groups.
4. Compare explanatory power, predictive power, decision usefulness, stability, information loss and operational burden.
5. Explain the chosen classification, the value of rejected alternatives, information sacrificed, and conditions for reconsidering the conclusion.

Treat classification as a testable hypothesis, not just a polished deliverable. ただし、人間とAIのどちらが分類に優れているかは、この定理では証明されない。That requires comparative tests with real data.

## 10｜結論：A good classification explains what it leaves out

Return to the rice balls. Grouping by ingredients hides differences in cooking methods. Grouping by price hides differences in ingredients. Every classification leaves something out. The omission may be acceptable if it does not undermine the purpose.

What did we make invisible in order to see something else? And if we look again at those excluded differences, does our original decision still hold?

Classification is not only the discovery of structure in the world. It is also a decision about which structure to preserve.

## Limits and next questions｜調査の限界と次の問い

The theorem does not show that meaningful categories are impossible, that AI is worse than humans, or that classification axes cannot have objective advantages. 原著の定義、定理、停止条件と後続研究の公開概要を確認したが、後続研究の全証明を独立に再検証したわけではない。

Future topics include metric learning, information bottleneck theory, rate-distortion theory, decision theory and natural kinds. Information bottleneck theory is especially relevant because it studies how to compress information while retaining information relevant to a target. [The Information Bottleneck Method](https://arxiv.org/abs/physics/0004057).

## References｜参考文献

- Jon Kleinberg (2002), [An Impossibility Theorem for Clustering](https://papers.neurips.cc/paper_files/paper/2002/hash/43e4e6a6f341e00671e123714de019a8-Abstract.html)
- Shai Ben-David and Margareta Ackerman (2008), [Measures of Clustering Quality](https://papers.nips.cc/paper_files/paper/2008/hash/beed13602b9b0e6ecb5b568ff5058f07-Abstract.html)
- Gunnar Carlsson and Facundo Mémoli (2010), [Characterization, Stability and Convergence of Hierarchical Clustering Methods](https://www.jmlr.org/papers/v11/carlsson10a.html)
- Ulrike von Luxburg et al. (2012), [Clustering: Science or Art?](https://proceedings.mlr.press/v27/luxburg12a.html)
- Vincent Cohen-Addad et al. (2018), [Clustering Redemption](https://papers.nips.cc/paper_files/paper/2018/hash/6fbd841e2e4b2938351a4f9b68f12e6b-Abstract.html)
- Eric P. Xing et al. (2002), [Distance Metric Learning with Application to Clustering with Side-Information](https://proceedings.neurips.cc/paper/2002/hash/c3e4035af2a1cde9f21e1ae1951ac80b-Abstract.html)
- Naftali Tishby et al. (1999), [The Information Bottleneck Method](https://arxiv.org/abs/physics/0004057)
- Eric Hayot (2014), [The Elements of Academic Style](https://cup.columbia.edu/book/the-elements-of-academic-style/9780231168007/) (writing structure)
