---
id: "ai-absent-research-delegation-cognitive-offloading-2026"
title: "Before Asking AI, Imagine a World Without It――調べ方は誰のものか"
subtitle: "Cognitive offloading, source checking, the irony of automation, and learning by doing"
created: "2026-10-28"
updated: "2026-10-28"
type: "Essay"
status: "完成"
tags: ["人工知能", "リサーチ", "学習", "情報評価", "認知科学", "思考法", "守破離"]
keywords: ["cognitive offloading", "lateral reading", "cognitive apprenticeship", "ironies of automation", "research design"]
grow: 5
mode: "english-mix"
abstract: "Before asking AI to research something, imagine how you would do it without AI. その逆説的な習慣を、情報評価・学習実験・自動化研究から検証する。The goal is not to reject AI, but to know which parts of your thinking you are delegating—and which new questions AI makes possible."
---

# Before Asking AI, Imagine a World Without It

*Research and editorial review: October 28, 2026. The Japanese edition is the canonical source. The examples and diagrams are conceptual; no live A/B experiment was performed.*

地図アプリを開く前に「地図がなかったら駅までどう行く？」と考える人は少ない。You want to arrive, not win an orienteering contest. ところがAIで調べ物をするときは、「AIがなかったらどう調べるか」を先に考えたくなる。Strange, isn't it? We briefly remove the tool in our imagination, just before using the tool.

The real question is not speed alone. 調査が終わり、立派なレポートが残ったとき、**what skill remains with the researcher?** 成果物と、次の問題を自力で解く能力は別のものだ。

## 守｜検索結果を得るのと、何を検索すべきか決めるのは違う

Finding a company's founding year is mostly a search task. 公式の会社概要を読めば済む。But defining a market for sports video-analysis software is a research task. 何を同じ市場として数えるか、誰が払うか、何を一契約とするか。A list of features cannot settle those decisions by itself.

A working research process includes question framing, provisional hypotheses, source selection, collection, source evaluation, analysis, falsification, and explanation. AI can now assist with almost every stage. だからこそ「どの判断まで委任したのか」が曖昧になる。**More information does not automatically produce a better market definition.**

![A loop between human research design, AI-enabled exploration, and human verification](https://silovar-uk.github.io/myessays/assets/ai-absent-research-loop-2026.svg)

*Figure 1: Original conceptual diagram. It describes accountability and learning goals, not a universal ranking of human and AI accuracy.*

## 守｜人間は昔から頭の仕事を道具に預けてきた

Psychologists Evan Risko and Sam Gilbert reviewed **cognitive offloading**, using external actions or tools to reduce cognitive demands. メモや計算機に頼ることは、そもそも人間の普通の行動だ。[2016 paper](https://doi.org/10.1016/j.tics.2016.07.002)。

But storing a phone number is different from delegating a decision rule. 企業三十社の設立年を集める仕事と、「どの会社が同じ購買市場に属するか」を決める仕事は違う。With generative AI, we can offload not just memory, but parts of sense-making. **The new question is what kind of thinking we have stopped practising.**

## 守｜信頼できる人ほど、怪しいWebサイトから早く出ていく

A Stanford study compared professional fact-checkers, historians and university students evaluating online information. The professional fact-checkers left the page and checked what other sources said about it. これが**横読み（lateral reading）**。They did not confuse an impressive website with a credible source.[Stanford study](https://news.stanford.edu/stories/2017/10/fact-checkers-outperform-historians-evaluating-online-information)。

Mike Caulfield's **SIFT** offers four moves: Stop, Investigate the source, Find better coverage, Trace claims to the original. 日本語なら、立ち止まる、発信者を調べる、別の確かな資料を探す、原典まで戻る。[原文](https://hapgood.us/2019/06/19/sift-the-four-moves/)。

![The original SIFT infographic by Mike Caulfield](https://mikecaulfield.files.wordpress.com/2021/02/sift-infographic.png)

*Figure 2: [Mike Caulfield's infographic](https://mikecaulfield.files.wordpress.com/2021/02/sift-infographic.png); [University of Chicago Library guide and attribution](https://guides.lib.uchicago.edu/c.php?g=1241077&p=9082322). 画像の四つの英語は、資料評価の動作を表している。*

An AI-generated comparison table may look neat. But where did each statement come from? 記載された資料に本当に書いてあるのか。**Good research preserves a path back to the evidence.** That path matters more as summaries become easier to produce.

## 守｜AIを使うと頭が弱くなる、という気持ちよすぎる話には注意がいる

In 2025, Microsoft researchers surveyed 319 knowledge workers about 936 GenAI-assisted work tasks. Higher trust in AI was associated with less reported critical thinking. ただし自己申告の関連であり、AI利用が思考力低下を引き起こしたという証明ではない。[Study](https://www.microsoft.com/en-us/research/publication/the-impact-of-generative-ai-on-critical-thinking-self-reported-reductions-in-cognitive-effort-and-confidence-effects-from-a-survey-of-knowledge-workers/)。

A high-school math field experiment gives a sharper contrast. Students using a general AI helper did better during practice, yet scored **17% lower on a later unaided exam** than students without AI access. Hint-based tutoring largely mitigated the effect. ここでの17％は特定条件の相対的な試験成績の差で、知能が17％減ったという意味ではない。[PNAS original paper](https://doi.org/10.1073/pnas.2422633122)。

But a July 2026 randomized experiment with undergraduates found **a 0.27 standard-deviation improvement** on unaided knowledge tests with AI access, persisting one week later. Using AI for concept explanations was associated with stronger learning benefits than asking it to write for you. これは査読前報告であり、利用法ごとの観察を直ちに因果とは扱わない。[IZA working paper](https://www.iza.org/publications/dp/18792/experimental-evidence-on-the-learning-impact-of-generative-ai)。

These findings are not directly comparable: different students, tasks and scales. それでも「AIを使う」と一括りにする説明の弱さは分かる。**The way you use the tool matters more than the yes-or-no question of using it.**

## 破｜「AIに任せればよい」のいちばん怖い部分は、AIが壊れた後に現れる

In 1983, Lisanne Bainbridge described the **ironies of automation**. When machines handle routine operation, human operators are left with monitoring and unusual failures. Yet automation may reduce the practice needed to intervene when things go wrong. これは工場の制御についての研究であり、生成AIに直接実験したものではない。[Original paper](https://doi.org/10.1016/0005-1098(83)90046-8)。

Imagine AI producing your weekly competitor briefing. 便利だ。But suppose it reports the wrong acquisition price. Can you locate the disclosure, distinguish the price definitions and trace the error? **Reliable automation can make rare human intervention harder.** 「AIがなかったらどう調べるか」は懐古趣味ではなく、例外時の対応力を考える問いにもなる。

## 破｜人間とAIが二人三脚なら必ず優秀、でもなかった

A 2024 meta-analysis pooled 106 experiments and 370 effect sizes. Human–AI teams beat humans alone on average, but fell short of the better performer among human-only and AI-only conditions. Decision tasks tended to fare worse than content creation tasks. **Collaboration is not automatically synergy.**[Nature Human Behaviour](https://doi.org/10.1038/s41562-024-02024-1)。

A study involving 758 BCG consultants also described the **jagged technological frontier**: AI performs extremely well on some tasks but not on other, seemingly similar ones. だから「昨日の仕事でAIが成功した」は、今日も全面委任してよい根拠にはならない。[Harvard Business School](https://aiinstitute.hbs.edu/navigating-the-jagged-technological-frontier/)。

The better question is: who should do which step, and who should verify it? **Task design comes before teamwork slogans.**

## 破｜やりすぎ実験：スポーツ市場調査から、AIを三通りに使う

Take a concrete problem: How should we classify tactical-analysis software to estimate market size without double counting? ここでは机上で三つの調査方法を比べる。These are hypothetical workflows, not experimental results.

**A — Full delegation.** AI lists companies, groups features, calculates TAM. 速いが、同一顧客の重複計上、映像撮影費と分析費の境界、契約の単位が不明なまま数値だけ完成するおそれがある。

**B — Human-first research design.** First write down the buyer, purchasing unit, budget and exclusions. Then ask AI to find public price lists and contract evidence. 自分の問いは明確になるが、最初の仮説が狭いと探索範囲まで狭まる。

**C — AI as critic.** Present your initial design and ask for counterexamples before gathering data. The model may reveal overlooked buyers or bundled products. ただしAIの架空例を実在する契約と混同しない。**A plan is useful when it can be challenged, not merely executed.**

## 破｜さらに意地悪に、研究でいう「17％悪化」を元資料までたどる

The headline “AI lowers intelligence by 17%” is tempting—and unsupported. 元論文の17％は、高校数学で通常型AIを使った群が、後のAIなし試験で示した対照群との相対的成績差だ。It's not a biological measurement, not a universal effect, and not a 17-percentage-point change.[Paper text](https://pmc.ncbi.nlm.nih.gov/articles/PMC12232635/)。

Likewise, the 2026 finding of 0.27 standard deviations does not mean everyone's grades increased by 27%. 両者の数値を比較する前に、対象・条件・指標・単位をそろえる必要がある。**Source checking is not only checking whether a quote exists. It is recovering the unit of comparison.**

## 破｜委任基準は、作業の難しさではなく「失敗の損失」と「学習の価値」で決める

The shortcut “AI for easy tasks, humans for hard tasks” is too crude. 難しい計算はAIの方が正確かもしれないし、簡単な数値の誤記が重大事故につながるかもしれない。

Consider two axes: the **cost of error** and the **value of learning the task yourself**. For low-risk formatting, delegate. For high-risk calculations, use independent verification. When hypothesis-building is a skill you want, try first and invite criticism. 最終的な市場定義など、高い学習価値と判断責任を伴う仕事では、自分で根拠を引き受ける。This is an editorial proposal, not a validated universal rule.

![An original delegation matrix for AI research work](https://silovar-uk.github.io/myessays/assets/ai-research-delegation-matrix-2026.svg)

*Figure 3: Proposed framework, not empirical performance data. 人間・AIの実際の正確性、機密保持、法令遵守も考慮する。*

## 離｜調査が上手い先輩から学ぶのは、答えよりも迷い方だった

**Cognitive apprenticeship（認知的徒弟制）** is an educational idea associated with Allan Collins, John Seely Brown and colleagues: make expert thinking visible so learners can observe, practise and eventually work with less support.[1991 article](https://www.aft.org/ae/winter1991/collins_brown_holum)。

A senior analyst does not merely hand you a polished spreadsheet. 「この統計は何を母数にしている？」「その価格は契約額？月額？」と問いかける。Their hesitation, source choices and discarded hypotheses are part of the lesson. **Expertise is not just knowing the answer; it is knowing where to doubt.**

An AI can hide that process behind polished output, or it can be prompted to expose assumptions, uncertainty and possible counterexamples. だから教育効果は道具の存在だけでは決まらない。The design of the learning experience matters.

## 離｜AIのない調べ方を想像しすぎると、AIだからできる調査を失う

Here is the counterargument to the original idea. If you always demand a complete human-only plan before using AI, your existing knowledge becomes the ceiling of exploration. 未知の分野で何を読むべきか分からないとき、AIから入口を教わる価値は大きい。

AI can cross languages, compare competing definitions and generate counterhypotheses at a scale that would once have been impractical. Mike Caulfield has also proposed a 2026 update to source-evaluation habits for AI-assisted inquiry—seeking better sources and actually following citations out of the model. これは検証済みの万能手順ではなく、提唱者による発展途上の提案だ。[Caulfield's 2026 proposal](https://mikecaulfield.substack.com/p/a-sift-rebuild-in-progress)。

Two questions are therefore better than one. **Without AI, how would I research this? And because AI exists, what can I now investigate that I couldn't before?** 前者は能力の所在を点検するため。後者は問いの地平を広げるため。

## 離｜本当に残したいのは、回答ではなく、次の問いへ行ける能力だ

Return to the map app. If your only goal is to reach the station, follow the route. But when the road is blocked or someone asks you to guide them somewhere else, understanding the map becomes valuable. 調査でも、今回の納品と次回の判断力は別の成果だ。

**Owning a report is not the same as possessing the ability to produce one.** 成果物は完成したその日に確認できる。しかし能力は、支援が外れたとき、未知の問題へ向き合うことで初めて確認できる。

Imagining research without AI is not a ritual of refusing progress. それは、自分の側にいったん調査の設計図を置く行為だ。AIがその設計図を書き換えてもよい。ただ、どこを変えたのかは知っていたい。**The point is not to keep AI out of your thinking; it is to remain aware of what your thinking has delegated.**

## 実践｜「AIなしで三分」と「AIだからこそ三つ」を両方試す

**Proposed routine, not a proven intervention:** Spend three minutes on your goal, likely primary sources, cost of being wrong, and the skill you want to learn. Then ask AI to identify missing assumptions, opposing hypotheses and investigations only AI makes practical. 主要な主張ごとにURL、日付、資料の該当箇所、未確認点を残す。

At the end, close the AI and explain why your conclusion holds and what would disprove it. 自分の言葉で説明できなければ、どこが抜けているかが見える。

To evaluate the routine, alternate human-first and AI-first approaches across similar tasks. Compare time, factual accuracy, counterexamples and next-day unaided explanations. Use blind external assessment if practical. この比較はまだ実施していない。The outcome remains an open question.

## 調査の足跡｜最初の仮説、再調査、今後の確認事項

**Initial hypothesis:** AI makes us think less, so we should always plan without it first. 最初は認知的オフローディング、横読み、知識労働者の研究を調べた。

**Re-research:** We deliberately sought disconfirming evidence: the 2025 high-school experiment and the positive 2026 undergraduate experiment, then older automation research, cognitive apprenticeship and a meta-analysis of human–AI collaboration. 結果、問題はAI利用の有無よりも、目的・利用方法・検証方法にあるという立場へ修正した。

**Next research plan:** Controlled comparisons of human-first versus AI-first planning; verification effort; next-day unaided learning; novice versus expert differences; and AI-only performance. 現時点では「三分間のAIなし設計」に固有の因果効果を確認したわけではない。

## 参考文献・一次資料

- Risko & Gilbert (2016), [Cognitive Offloading](https://doi.org/10.1016/j.tics.2016.07.002)
- Stanford (2017), [Fact-checkers and lateral reading](https://news.stanford.edu/stories/2017/10/fact-checkers-outperform-historians-evaluating-online-information)
- Caulfield (2019), [SIFT: The Four Moves](https://hapgood.us/2019/06/19/sift-the-four-moves/)
- Microsoft Research (2025), [AI and critical thinking](https://www.microsoft.com/en-us/research/publication/the-impact-of-generative-ai-on-critical-thinking-self-reported-reductions-in-cognitive-effort-and-confidence-effects-from-a-survey-of-knowledge-workers/)
- Bastani et al. (2025), [Generative AI can harm learning](https://doi.org/10.1073/pnas.2422633122)
- Contractor & Reyes (2026), [Experimental Evidence on the Learning Impact of Generative AI](https://www.iza.org/publications/dp/18792/experimental-evidence-on-the-learning-impact-of-generative-ai) — working paper
- Bainbridge (1983), [Ironies of Automation](https://doi.org/10.1016/0005-1098(83)90046-8)
- Vaccaro et al. (2024), [Human–AI combinations meta-analysis](https://doi.org/10.1038/s41562-024-02024-1)
- Collins et al. (1991), [Cognitive Apprenticeship](https://www.aft.org/ae/winter1991/collins_brown_holum)
- Harvard Business School (2023), [Jagged Technological Frontier](https://aiinstitute.hbs.edu/navigating-the-jagged-technological-frontier/)
- Caulfield (2026), [A SIFT Rebuild](https://mikecaulfield.substack.com/p/a-sift-rebuild-in-progress)

*Research note: figures from different experiments use different definitions and should not be numerically combined. The two locally authored illustrations are conceptual, not empirical charts.*
