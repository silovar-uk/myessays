---
id: "dunning-kruger-curve-calibration-outside-the-mind-2026"
title: "自信の山は、論文の中になかった――ダニング＝クルーガー曲線から「確信の校正」へ"
subtitle: "自己評価の錯覚、統計的な罠、測定器の校正、そして組織が間違いを発見する仕組み"
created: "2026-10-28"
updated: "2026-10-28"
type: "Essay"
status: "完成"
tags: ["心理学", "認知科学", "統計", "意思決定", "計量学", "組織学習", "守破離"]
keywords: ["ダニング＝クルーガー効果", "メタ認知", "平均への回帰", "自信過剰", "説明の深さの錯覚", "校正", "予測", "Brier score"]
grow: 5
abstract: "「バカの山」「絶望の谷」はダニング＝クルーガー効果の原著に存在しない。1999年の実験から2023年の再分析と反論までを確認し、自己評価のずれと統計的な見かけを分けて読む。さらに自信過剰の三類型、説明の深さの錯覚をたどり、計量学の校正や天気予報の確率評価へ接続する。見えてきたのは、謙虚さを説く道徳ではなく、自分の判断を外部の基準で確かめ直せる組織の設計という問いだった。"
---

# 自信の山は、論文の中になかった――ダニング＝クルーガー曲線から「確信の校正」へ

*2026年10月28日執筆。原著、再検証、批判論文、計量学の標準資料を確認した。組織への応用は実験で検証した事実ではなく、本稿の解釈・仮説である。*

In a meeting about a new market, 最初の十分で「なるほど、全体像が見えた」と感じる。帰りの電車では、three neat categories に整理できそうだ。ところが翌日、who actually pays for what を調べ始めると、その分類は揺らぐ。説明できると思っていたことが、数字を一つ入れただけで説明できなくなる。

この場面にぴったりに見える絵が、Mount Stupid から Valley of Despair へ落ち、そこから上り直す「ダニング＝クルーガー曲線」だ。でも a diagram can become too convenient. 自信満々な他人を山の頂上に置けば、理解した気になれてしまう。

原著を開くと、there is no mountain. さらに研究を追うと、metacognition だけでなく、統計、天気予報、measurement calibration へ話が広がる。ここで問いたいのは「なぜ人は偉そうになるのか」ではない。**What happens when a judgment is checked only by the mind that produced it?**

## 守｜あの山型の曲線は、もともとの実験結果ではない

1999年、Justin Kruger と David Dunning は、ユーモア、論理的推論、英文法について四つの研究を発表した。They did not measure a rise and fall of confidence over a learning journey. 測ったのは、actual performance と self-assessment のずれだった。[原著論文](https://doi.org/10.1037/0022-3514.77.6.1121)。

原著の図では、participants were divided into four performance quartiles. 横軸は成績群、縦軸は実際の成績と自己評価。最下位の四分位群は平均で実際には12th percentile 程度なのに、自分を62nd percentile 程度と見積もった。これは a gap between performance and self-perception の話であり、初心者の confidence が一度山型に上がるという話ではない。[図を含む原著](https://gwern.net/doc/psychology/1999-kruger.pdf)。

Mount Stupid と Valley of Despair は、a metaphor for learning としては使える。しかし empirical curve と呼ぶと、軸も研究課題もすり替わる。図を覚えたことで、what the figure actually measures を忘れてしまう。その小さな皮肉から始めたい。

## 守｜問題は知識の量だけでなく、間違いを見つける知識にもある

原著の核は、task performance と error detection が部分的に同じ知識に依存することだ。英文法を十分に知らなければ、an incorrect sentence を書くだけでなく、その文の誤りも見つけにくい。研究が述べたのは、この double burden だった。

この自己監視を **metacognition（メタ認知）**という。「今の判断はどの程度正しいか」「where might I be wrong?」を見張る力だ。原著の一部の実験では、skill training によって自分の限界を見通しやすくなった。Sometimes learning is necessary before you can notice what you do not know. 

ただしこれは、low performers are always arrogant という人格診断ではない。原著が扱ったのは domain-specific, relative competence だ。料理に詳しい人が統計を間違え、統計に詳しい人が相手の意図を読み違えることもある。誰かを「山の上」と決めつけるより、which task and which missing skill? と問う方が正確だ。

## 守｜「自信過剰」という一語には三つの別の現象が隠れている

Moore と Healy は2008年、overconfidence を三種類に分けた。実際の成果を高く見積もる **overestimation（過大評価）**、他人より上だと思う **overplacement（相対的な過大配置）**、不確実性を小さく見る **overprecision（過剰な確実視）**。[2008年の研究](https://pubmed.ncbi.nlm.nih.gov/18426301/)。

ある提案書を「80点の出来だ」と思うのは overestimation、同僚より優れていると考えるのは overplacement、「この市場規模は almost certainly correct」と思うのは overprecision だ。三つは not interchangeable。自分を初心者だと認めながら、自分が出した一つの数字だけを確信することもできる。

## 破｜曲線の一部は、心ではなく統計から生まれる

ここで元の図を疑う。実際の成績が extremely low な人を選び、別の imperfect measure である自己評価と比べれば、後者は平均の方へ寄りやすい。これが **regression toward the mean（平均への回帰）**に関係する。二つの指標が完全一致しないことによる差を、すべて psychological bias と呼んでよいのだろうか。

Gignac と Zajenkowski は2020年、929人の intelligence data を、従来の quartile graph に頼らない手法で検証した。その結果、低い能力群だけに特別な self-assessment error が生じるという証拠は得られなかった。[2020年の論文](https://doi.org/10.1016/j.intell.2020.101449)。

さらに2022年の statistical model は、尺度の上限と下限、つまり boundary constraints を考慮すると、似た図を再現できると論じた。[2022年の論文](https://doi.org/10.3389/fpsyg.2022.840180)。これは「人間には bias がない」という証明ではない。**Reproducing a pattern is not the same as identifying its cause.**

実は1999年の原著も regression effect に言及している。著者たちはそれだけでは足りず、心理的な要因もあると考えた。だから original versus critique を単純な勝敗にしてはいけない。問うべきは which model explains which part of the data? である。[原著1124ページ](https://gwern.net/doc/psychology/1999-kruger.pdf)。

## 破｜再検証は、効果を完全に消したわけでもない

心理的な説明にも evidence は残る。Jansen らは2021年、each with roughly 4,000 participants の二つの研究と computational model から、英文法と論理推論では low performers が個々の答えの correctness を見分けにくいという結果を報告した。[2021年の研究](https://doi.org/10.1038/s41562-021-01057-0)。

2023年には、別データを用いた replication が a small but statistically significant effect を示した。一方で、先行批判の研究者たちは no convincing effect という再反論を公表した。[再分析](https://doi.org/10.1016/j.intell.2022.101717)／[再反論](https://doi.org/10.1016/j.intell.2023.101733)。

したがって neither ‘novices are always overconfident’ nor ‘the whole effect is fake’ が妥当ではない。ある課題では error detection skill に差があり得る。同時に、grouped self-rating gaps をそのまま pure psychological effect と読むことはできない。Observations and explanations need separate labels. 

## 破｜知っているつもりを崩すのは、知識量のテストとは限らない

別の研究で、Rozenblit と Keil は **illusion of explanatory depth（説明の深さの錯覚）**を示した。人は how things work を、実際に説明できる以上に理解していると感じる。Explain the mechanism step by step と求められると、その手応えが変わる。[2002年の研究](https://pmc.ncbi.nlm.nih.gov/articles/PMC3062901/)。

自転車、トイレの水、あるいは a tactical insight produced from a football video。名前と概要を知ることと、mechanism under changing conditions を説明できることは違う。十個の市場分類を暗記できても、who pays whom を確認できなければ、分類が有効かは分からない。

ここでの発見は、be less confident ではない。説明の穴が見えたとき、知識が減ったのではなく、unknowns become identifiable になった。**分からなさが増えたのではなく、分からなさに輪郭ができた。**

## 離｜測定器は、自分自身を基準にして校正しない

ここで心理学から metrology（計量学）へ飛ぶ。体重計が毎朝2キログラム多く表示しても、その scale だけを見ていては気づきにくい。**Calibration（校正）**では、reference standard と instrument reading の関係を、uncertainty も含めて確かめる。[国際計量用語集](https://jcgm.bipm.org/vim/en/2.39.html)。

This is an analogy, not a result directly tested by Dunning and Kruger. だが構造は似ている。自分で作った分類を「分かりやすいから」と評価する。自分の推計式を looks reasonable だから採用する。The evaluator may share the very same blind spot as the producer. 

計量学では **metrological traceability（計量トレーサビリティー）**が重視される。『誰が承認したか』以上に、which reference, which uncertainty, which comparison? を追えることだ。[NISTの説明](https://www.nist.gov/metrology/metrological-traceability)。仕事でも、confidence を「自分は詳しい」ではなく、which external evidence has checked this claim? に結びつけられる。

## 離｜天気予報は「自信がある」を点数に変える

もう一人の隣人は weather forecasting。1950年、Glenn Brier は probability forecast を結果と比較する方法を示した。「雨の確率70％」と予測した日を多数集め、その約70％で雨が降れば well calibrated といえる。[1950年の原論文](https://doi.org/10.1175/1520-0493%281950%29078%3C0001%3AVOFEIT%3E2.0.CO%3B2)。

その差を測る一つの道具が **Brier score（ブライアー得点）**。予測確率と二値の結果との差を二乗して平均し、lower is better と評価する。これは性格診断ではなく、recorded forecasts versus outcomes の比較だ。[気象庁の技術資料](https://www.jma.go.jp/jma/jma-eng/jma-center/nwp/outline2022-nwp/pdf/outline2022_all.pdf)。

企画会議でも『この施策はうまくいく』より、define success and assign a 70% probability の方が、後から確かめられる。目的は責任追及ではなく、is my 70% really 70%? と学ぶことだ。ただし one outcome cannot validate a probability. 十分な件数と比較可能な条件が必要になる。

## 離｜組織の危険は、自信のある人より「答え合わせが不要な仕事」に潜む

Imagine a beautifully formatted market-sizing slide. Numbers add up, labels align, and the chart looks professional. でも count of buyers なのか count of contracts なのか、double counting がないかは見た目から分からない。Author and reviewer may share the same assumptions. 何度見直しても、前提だけは見逃される。

ここで一つの hypothesis を置く。**Collective overconfidence may arise not only from ignorant people, but also from a system in which makers and reviewers use the same yardstick.** これは原著が直接証明した組織研究ではなく、metacognition と calibration をつないだ本稿の仮説だ。

『もっと謙虚な人を採る』だけでは person-focused solution に戻ってしまう。別の人が primary sources を探す、予測と結果を比較する、denominator を先に定義する、what evidence would change our conclusion? を事前に書く。個人の心構えより、independent checks を設計するという方向だ。

## 結び｜知識が増えると自信が下がるのではなく、自信の測り方が変わる

最初の会議へ戻る。Three neat categories が帰り道に思い浮かんだこと自体は悪くない。Without a hypothesis, we do not know what to investigate. 問題は、分類が浮かんだときの feeling of clarity を、分類が正しい証拠にしてしまうことだ。

『ignorant people are confident, smart people are humble』という物語は気持ちよい。でもその物語 itself can become a new Mount Stupid。残る問いはより地味で、使える。**What has this confidence been calibrated against?**

体重計も会議室のスライドも、ただ numbers を示す。こちらの confidence には無関心だ。だから別の yardstick が要る。ダニング＝クルーガー曲線から始まった問いは、a model of a humble person ではなく、**a path back to independent verification** へたどり着いた。

## 調査ノート｜確認できたこと、推論したこと、次に調べること

**Established findings.** 1999年の原著は Mount Stupid curve を示していない。Self-assessment gaps は報告され、その statistical interpretation は論争中。Correctness monitoring を支持する研究もある。Overconfidence itself has multiple meanings. この部分は文献から確認できることとして扱った。

**Our inference.** If makers and reviewers share blind spots, the organization may fail to check its own certainty. Calibration in metrology and probability forecasting are analogies, not direct causal proof about meetings. A next test could compare usual peer review with independent primary-source review, measuring corrected assumptions and forecast errors. This experiment has not been conducted here. 

**Primary sources and research.** [Kruger & Dunning (1999)](https://doi.org/10.1037/0022-3514.77.6.1121)、[Gignac & Zajenkowski (2020)](https://doi.org/10.1016/j.intell.2020.101449)、[Jansen et al. (2021)](https://doi.org/10.1038/s41562-021-01057-0)、[statistical model (2022)](https://doi.org/10.3389/fpsyg.2022.840180)、[replication (2023)](https://doi.org/10.1016/j.intell.2022.101717)、[reply (2023)](https://doi.org/10.1016/j.intell.2023.101733)、[Moore & Healy (2008)](https://pubmed.ncbi.nlm.nih.gov/18426301/)、[Rozenblit & Keil (2002)](https://pmc.ncbi.nlm.nih.gov/articles/PMC3062901/)、[International Vocabulary of Metrology](https://jcgm.bipm.org/vim/en/2.39.html)、[Brier (1950)](https://doi.org/10.1175/1520-0493%281950%29078%3C0001%3AVOFEIT%3E2.0.CO%3B2)。
