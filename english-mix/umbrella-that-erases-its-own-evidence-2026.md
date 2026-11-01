---
id: "umbrella-that-erases-its-own-evidence-2026"
title: "雨が降らなかった日の傘は、仕事をしていたのか｜English Mix"
subtitle: "From sky, rain, umbrella to the future we cannot observe"
created: "2026-11-02"
updated: "2026-11-02"
type: "Essay"
status: "完成"
tags: ["空雨傘", "Decision-Making", "Causal Inference", "English Mix", "反事実"]
keywords: ["sky-rain-umbrella", "counterfactual", "calibration", "expected loss", "Uneven U", "abduction"]
grow: 5
abstract: "A dry umbrella is not necessarily a wasted umbrella. 降水確率、架空の100日実験、スタジアムの混雑対策を通して、a good decisionとa good outcomeの違いを考える。予防が成功するほど証拠が見えなくなるという逆説を、反事実と因果推論で読み解く。"
---

# 雨が降らなかった日の傘は、仕事をしていたのか

*From sky, rain, umbrella to the future we cannot observe*

**If you never open your umbrella, has it done nothing?** 朝、傘をバッグに入れて出かける。It takes up space on the train. 昼も夜も晴れたままで、帰宅時には少し損した気分になる。A dry umbrella feels like a bad decision. でも、それは朝には知らなかった結果で、朝の判断を採点しているからではないか。The deeper question is this: **Can we judge a decision made under uncertainty only by what happened afterward?** 起きなかった未来を、どう扱うべきなのだろう。

## 1｜30％は「三割くらい濡れる」という意味ではない

A 30% chance of rain does not mean you will be wet for 30% of the day. 気象庁の定義では、同じ30％の予報が100回出されたとき、そのうち約30回で対象の時間帯・地域に1ミリメートル以上の降水があるということだ。It says nothing directly about intensity or how wet your clothes will get. [気象庁・予報用語](https://www.jma.go.jp/jma/kishou/know/yougo_hp/yoho.html)。Probability is not a promise about one afternoon. 一回の予言ではなく、数多くの予測に対して成立する頻度の約束なのである。

This leads to a small but important surprise. 降水確率30％の日に雨が降らなくても、予報は外れたとは言えない。In a well-calibrated set of 30% forecasts, most days should actually stay dry. ここで較正（calibration）とは、予測確率と長期的な発生割合の整合性を調べること。The European Centre for Medium-Range Weather Forecasts explains reliability in precisely this way. [欧州中期予報センター](https://confluence.ecmwf.int/spaces/FUG/pages/673551875/Section%2B12.B%2BStatistical%2BConcepts%2B-%2BProbabilistic%2BData)。**A single outcome cannot put a probabilistic forecast on trial.** 問題は予測が間違ったかではなく、私たちの採点方法が間違っていないかということだ。

## 2｜同じ空を見た二人が、別の傘を選ぶ理由

Even an accurate forecast does not tell you what to do. 近所のコンビニまで歩く人と、着替えなしで式典に出る人。They see the same sky but face different consequences. ここに隠れているのはloss（損失）の大小と、carrying cost（持ち運びの負担）である。**What might happen?** という予測から、**What would it cost me?** という価値判断へ移る必要がある。

Let's make the umbrella question unnecessarily mathematical. これは実測ではなく、意思決定の考え方を確かめるための架空の実験。傘を持つ負担を一日100円相当、濡れる損失を2,000円相当、傘なら被害を完全に避けられるとする。At a 30% rain probability, the expected loss without an umbrella is 0.3 × ¥2,000 = ¥600; carrying it costs ¥100. 損益が同じになるthreshold（境界）は100 ÷ 2,000 = 5％だ。英国財務省の[政策評価指針](https://www.gov.uk/government/publications/the-green-book--2/the-green-book-2026)も、risk and uncertaintyを考慮して費用と便益を評価する。**The best action is not determined by probability alone.** 人が何を守りたいかによって、同じ予報から異なる合理的な行動が生まれる。

## 3｜100日間、毎日傘を持って出かけてみる

One dry day still feels like a waste. では模型を100日へ広げよう。仮に同じ30％の予報が続き、100日中30日だけ雨が降ったとする。Carrying the umbrella every day costs ¥100 × 100 = ¥10,000. 一方、持たない場合の濡れる損失は¥2,000 × 30 = ¥60,000。In this simplified scenario, carrying the umbrella saves ¥50,000 in total. 70日間、一度も傘を開かなかったとしても、だ。

These numbers are not a real-world estimate. 雨の確率も損失も日ごとに違い、傘ですべてを防げるわけではない。Still, the thought experiment reveals something that daily regret hides. **A series of apparently wasted actions can form a sensible policy.** 一回の結果と、繰り返し用いる判断ルールの良し悪しは別である。But what happens when the action changes not merely our losses, but the event we were predicting?

## 4｜混雑を防いだら、混雑対策が不要に見えた

An umbrella cannot stop the rain. しかし、入場ゲートの増員は行列そのものをなくすことがある。Imagine a stadium entrance: 100 people arrive every 10 minutes, but the staff can process only 80. 単純化すれば、10分間に20人分の滞留が増える。Now add staff so that capacity reaches 110 people per 10 minutes. 流入が同じなら、追加の滞留は生まれない。These are hypothetical numbers, not data from an actual stadium.

Now comes the strange part. 翌年、記録に「混雑なし」とだけ残っている。A manager concludes that the extra staff were unnecessary and removes them. すると行列が戻る。The success of the prevention becomes the argument for removing it. これは天気の予測が外れたという話とは異なる。**An intervention can change the outcome that would otherwise have confirmed the original warning.** 行動後の「空」は、行動前の「空」と同じ世界ではないのである。

## 5｜記録にないもう一つの未来をどう調べるか

To evaluate the extra staff, we would like to watch the same match twice. 一方は増員あり、もう一方は増員なし。But we cannot run the identical match under both conditions at once. こうした観測不可能な比較対象を、因果推論では反事実（counterfactual）と呼ぶ。The World Bank's *Impact Evaluation in Practice* explains why a credible comparison is central to estimating causal effects. [世界銀行・実践書](https://documents1.worldbank.org/curated/en/823791468325239704/pdf/Impact-evaluation-in-practice.pdf)。**The missing result is not a minor detail; it is the very thing we need to estimate the intervention's contribution.**

What can an event operator actually do? 似たゲートを比較し、導線改善を段階的に導入する。Or compare matches while recording attendance, weather, opening times, and ticket-checking procedures. ただし、人の流れが隣接ゲートへ移れば比較対象も影響を受けるし、安全対策をわざと外す実験は許されない。Simple before-and-after comparisons can also confuse the impact of a measure with changing circumstances. [世界銀行・評価実務解説](https://blogs.worldbank.org/en/impactevaluations/my-ngo-having-positive-impact)。**Measurement becomes persuasive only when the comparison makes sense.** 数を増やすより先に、何と何を比べるかを設計する必要がある。

## 6｜「何も起きなかった」を手柄にする危うさ

There is a danger on the other side, too. 事故が起きなかったことを、すべて自分たちの対策のおかげだと主張してよいわけではない。Perhaps the risk was low to begin with; perhaps another factor changed. 離職率が下がった場合も、上司の面談が効いたのか、転職市場が変わったのかは一つの数字から分からない。We can tell two convenient stories from the same observation: “Our action saved the day,” or “Our action was pointless.” **Both jump from outcome to cause without a valid comparison.**

What should we record before taking action? 予測、別の説明、比較条件、仮説を修正する基準。The search for plausible explanations is called abduction（アブダクション）, historically associated with Charles Sanders Peirce（チャールズ・サンダース・パース）. しかし、a plausible explanation is not yet a verified explanation. [スタンフォード哲学百科事典](https://plato.stanford.edu/entries/abduction/)。空・雨・傘の危険は、雨の予測を一つの物語に固定し、傘の効果まで自動的に証明したつもりになることだ。**Good reasoning must preserve alternatives long enough to test them.**

## 7｜存在しないものを評価する仕事

Preventive work is often invisible by design. 学校で早く補習を行った結果、生徒が問題なく試験を通過する。An engineer prevents a system failure, and no outage is recorded. 自治体が防災設備を整え、被害が小さくなる。From the outside, these look like ordinary days. 実務者にとっては、まさにその普通の日を作るための仕事だったかもしれない。**An event that never occurred leaves no photograph.** 成功すると証拠が見えにくくなる、不思議な種類の労働だ。

But invisibility is not proof of effectiveness either. リスクの事前推定、実施した対策、妥当な比較の三つを組み合わせなければ、検証はできない。Otherwise, the most confident storyteller wins. そこには組織運営上の問題がある。**If managers evaluate prevention only by the bad outcomes they can see, effective preventive work may be the first thing cut from the budget.** 因果推論は単なる分析手法ではない。It also shapes which work an organization notices and chooses to keep.

## 8｜空・雨・傘に、もう一度「空」を足す

The classic framework is still useful. 空は事実、雨は解釈、傘は行動。フューチャー株式会社の[技術文書指針](https://future-architect.github.io/arch-guidelines/documents/forTechnicalWriting/technical_writing_guidelines.html)も、観測と分析で終わらず、行動につながる結論を示す重要性を述べている。The limitation appears only when the framework stops at the decision. 実行したあとに、どう学ぶかがまだ残っている。

So I would turn the sequence into a loop. **Sky**：何が観測されたか。**Rain**：What are the competing explanations, and how likely are they? **Umbrella**：費用と損失を考え、何を試すか。**The next sky**：What changed, and what might have happened without our action? そこで仮説を更新し、次の判断に進む。The framework changes from a way to present a proposal into a way to learn from interventions. 重要なのは四つ目のしゃれた名前ではない。**Accountability must extend beyond the decision and into the world the decision creates.**

## 9｜玄関に戻る

Back at home, the umbrella is still dry. 鞄の中で少し邪魔だったことは変わらない。But that fact alone does not tell us whether the morning decision was wrong. 予報の確からしさ、雨に遭う損失、傘を運ぶ負担まで考えなければならない。A dry umbrella is only one observation, not a verdict.

And now the words “no congestion” on a stadium report look different. それは対策が不要だった証明ではないし、対策の成功が証明されたわけでもない。**Good judgment is not the art of telling a convincing story about what happened. It is knowing how far we can responsibly speak about what did not happen.** 開かなかった傘にも、記録されなかった行列にも、簡単には採点できない仕事がある。

## 調査・検証ノート

**Foundation（守）**：気象庁の降水確率の定義を確認。**Experiment（破）**：100日分の費用とスタジアムの入場処理能力を、実測ではなく明示的なthought experiments（思考実験）として計算。**Connection（離）**：世界銀行のcounterfactual（反事実）と因果推論、Stanford Encyclopedia of Philosophyのabduction（アブダクション）へ接続。**Limitation**：Examples from stadiums, education, and prevention illustrate mechanisms; they are not field evaluations. **Next test**：施策前に比較条件を定め、安全を損なわずに導入差と外部要因を記録する。

**Writing architecture**：エリック・ハイヨ（Eric Hayot）の『学術文体の要素（The Elements of Academic Style）』と「不均等なＵ字（Uneven U）」を参照した。The paragraphs move through concrete evidence toward implications that create the next question. [著者](https://erichayot.org/writing/the-elements-of-academic-style/)／[出版元](https://cup.columbia.edu/book/the-elements-of-academic-style/9780231537414/)。
