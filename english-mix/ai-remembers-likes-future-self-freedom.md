---
id: ai-remembers-likes-future-self-freedom
title: "「好き」を覚えるAIは、あなたを変われなくするのか――Personalizationと「未来の自分」の自由"
subtitle: "Can accurate personalization leave enough room for the future self to change?"
mode: "english-mix"
english_ratio: 0.40
mix_unit: "sentence"
---

# 「好き」を覚えるAIは、あなたを変われなくするのか
## Personalizationと「未来の自分」の自由

動画アプリを開く。好きな音楽が出る。The next one is good too. 三本目も、まあ好き。買い物を頼めば、いつものブランドが選ばれる。旅行先を相談すれば、静かなホテル、朝食あり、駅近。It knows you unusually well.

Probably convenient.

でも十年後も同じことが起きたら、少し妙だ。The better AI understands me, the more it keeps returning things adjacent to the person I have already been. では、まだ好きになっていないものは、どこから来るのだろう。

前稿では、AIへ選択を委任しても、自分が目的・制約・例外・取消を統治できるなら、自律性は失われるとは限らないと考えた。But where do those “my conditions” come from? もし好みそのものが経験の中で変わるなら、AIは意思を実行するだけでなく、次の意思が生まれる環境にもなる。

本稿で考えたいのは、AIが私たちを操るか否か、ではない。The harder question is more ordinary. **How can an AI understand the present me accurately without closing off the future me who might change?**

---

## 1. 「いつもの」は、いつまで私なのか

朝のコーヒーを考える。深煎り、豆、2,000円前後。毎回ほとんど同じものを買う。If AI remembers the history and says, “same again?”, personalization plainly reduces friction and mistakes.

推薦システムの基本的な価値もそこにある。In an environment overloaded with options, systems narrow the field using past behavior, explicit preferences, and related signals. 2025年のadaptive personalized recommender systemsのsystematic reviewも、利用者の好みが時間とともに変化することを重要な課題として扱い、近年の研究がその変化へ適応しようとしていることを整理している。

しかし「好みが変わる」と言うとき、話は二種類ある。One question is whether the system can catch up after your preferences change. もう一つは、システムとの相互作用そのものが、好みの変化へ参加するかである。

前者だけなら技術問題に近い。「最近はデカフェを選ぶようになった」というデータを早く反映すればよい。The second problem is harder. If dark roasts keep being shown because you once preferred them, the system may also reduce the occasions on which you discover light roast.

つまり「いつものを出す」は、過去を再現するだけではない。**By allocating what you experience next, it also helps create the next version of “usual.”** personalizationは記憶装置であると同時に、経験配分装置でもある。

[Adaptive Personalized Recommendation Systems: A systematic Review, Information Systems, 2025](https://doi.org/10.1016/j.is.2025.102594)

---

## 2. 好みは、選ぶ前から完成しているとは限らない

この問題を考えるとき、消費者研究の「構成的選好」が効いてくる。James Bettman, Mary Frances Luce, and John Payne argued in 1998 that consumers often do not possess clear, fully formed preferences in advance, but construct preferences using strategies shaped by tasks and context.

ホテルを探す前は「駅近が一番」と思っていたのに、写真を見て広い部屋が欲しくなる。You thought the sneakers had to be black, then tried them on and discovered weight mattered more. レストランを探していて初めて、「今日は珍しいものを食べたい」と自分の状態に気づく。

このとき比較は、頭の中にある好みを測定しているだけではない。**Comparison can help construct the weights inside the preference itself.**

経済学でも、好みを完全な固定物として扱わない研究がある。Bernheim and colleagues proposed a dynamic model of endogenous preference formation in which people can adopt worldviews that alter how later experiences are judged. これは推薦AIの実証研究ではないが、「好みを外から与えられない固定パラメータ」とみなす必要はないことを理論的に示す。

ここから見ると、AIに「私が好きそうなものを出して」と頼むことは少し不思議になる。The “preference” the agent is trying to estimate may itself change partly because of what the agent chooses to show.

したがってpersonalizationの対象は、静止した人物像ではない。**It is a person who changes through repeated interaction with systems and experiences.** 正確な推薦とは、現在の点を当てることだけでは定義できない。

[Bettman, Luce & Payne, “Constructive Consumer Choice Processes,” Journal of Consumer Research, 1998](https://doi.org/10.1086/209535) / [Bernheim et al., “A Theory of Chosen Preferences,” American Economic Review, 2021](https://doi.org/10.1257/aer.20190390)

---

## 3. 推薦は「鏡」であると同時に「部屋の壁」である

推薦AIはよく「あなたを映す鏡」のように語られる。It reads behavior and returns a pattern you might not have noticed yourself. その比喩は半分正しい。

もう半分は、鏡より部屋に近い。A recommender does not merely describe who you are; it arranges what you encounter next.

Chaney、Stewart、Engelhardtは推薦システムのfeedback loopをシミュレーションし、推薦に影響された行動データを再び学習へ使うことで、ユーザー行動が均質化し、utilityが上がらない場合があることを示した。The caveat matters: this was a simulation study, not proof that real human personalities inevitably become homogeneous.

それでも構造は分かりやすい。Past clicks suggest you like A. The system shows more A-like items. You click among those. The clicks then become fresh evidence that you prefer A. **The prediction changes the behavioral environment, and the resulting behavior appears to validate the prediction.**

ここでは「AIは私を理解している」という感覚と、「AIが理解しやすい私へ私を寄せている」という現象を分離しにくい。Did recommendation accuracy improve, or was the environment arranged so that the recommendation became easier to make accurately?

だからpersonalizationを見るとき、問うべきはaccuracyだけではない。**We need to ask not only which option was predicted, but which options disappeared from the world the person could realistically encounter.**

[Chaney, Stewart & Engelhardt, “How Algorithmic Confounding in Recommendation Systems Increases Homogeneity and Decreases Utility,” 2018](https://arxiv.org/abs/1710.11214)

---

## 4. 正確なpersonalizationほど、未来の私には外れるかもしれない

ここで一番妙な逆説が出てくる。Perfecting recommendations for the present self does not automatically optimize for the future self.

たとえば二十歳のころに好きだった音楽、三十歳でよく買った服、ここ一年で読んだ本。The history is genuinely yours, but it is also a record of who you have already been. 履歴に忠実なAIは、変化したいという欲求より、すでに観測できた自己を強く扱いやすい。

future selfの研究も、現在と未来の自己の関係を単純な連続性だけでは扱っていない。Oyserman and Horowitz’s 2023 review organizes work on possible selves, self-gap, and self-continuity, and treats future-oriented identity as dynamically constructed rather than merely copied forward from the present.

2026年の哲学論文“Recommended Selves”も、推薦システムがauthenticityを損なう面と支える面の両方を論じている。Behavioral signals may fail to capture second-order desires—what one wants to want, or what kind of person one wants to become—while friction with recommendations can sometimes prompt self-understanding. これは哲学的議論であり、実証的決着ではない。

ここで「本当の自分」を一個想定する必要はない。The issue is almost the opposite. **If personalization freezes the current self-model too strongly, the value of becoming different can disappear from the objective.**

AIが「あなたらしい」を正確にするほど、「あなたらしくないが、これから好きになるかもしれない」がノイズとして除かれる。Accuracy may rise while the capacity to revise identity falls.

[Oyserman & Horowitz, “From possible selves and future selves to current action,” Advances in Motivation Science, 2023](https://doi.org/10.1016/bs.adms.2022.11.003) / [Brown, “Recommended Selves: Authenticity and Algorithmic Filtering,” 2026](https://arxiv.org/abs/2608.14602)

---

## 5. でも、外せば自由になるわけでもない

ここまで進むと、「ならAIはもっと意外なものを出せばいい」という解決策が浮かぶ。But that answer is too easy.

知らない映画を百本混ぜれば自由になるわけではない。On an exhausted evening when you want the usual set meal, an assistant constantly proposing “how about Peruvian cuisine today?” is not liberation. 自由とはランダム性の量ではない。

2026年のLLM-based multi-agent movie recommenderのユーザー研究では、N=100という限定された規模ながら、multi-agent条件でperceived noveltyとShannon diversityが高まった一方、利用者の性格や生成AI経験などによって体験が異なった。So even the value of diversity itself is heterogeneous across users.

2025年の“Exploration on Demand”も、利用者がexplorationの度合いを調整する発想を提示している。Part of its evaluation uses MovieLens and simulated users, so it should not be treated as settled evidence about general human behavior.

ここでexploration–exploitationの問題が、人間の自由の問題へつながる。Pure exploitation can overfit the known self, but pure exploration can become noise. 必要なのは、両者の正しい固定比率でもない。

**The important capability may be letting the person switch between “do not surprise me,” “surprise me a little,” and “ignore my history for a moment.”** 未来の自分への自由は、予測精度を捨てることではなく、予測との距離を調整できることに近い。

[Zhou et al., “How Personal Characteristics Shape User Exploration of Diverse Movie Recommendations with a LLM-Based Multi-Agent System,” 2026](https://arxiv.org/abs/2604.24405) / [Bianchi, “Exploration on Demand,” 2025](https://arxiv.org/abs/2507.21884)

---

## 6. 「外から影響された好み」は、偽物とは限らない

もう一つ、ここで簡単な物語を壊しておきたい。The story says: “if AI influenced the preference, it is not really yours.”

そんなことを言えば、人間の好みの大半が怪しくなる。Music from parents, restaurants introduced by friends, clothes seen in magazines, football taught by a coach, a book sitting on the neighboring shelf. 私たちは外部からの影響なしに好みを作っているわけではない。

Self-Determination TheoryのOrganismic Integration Theoryでは、外から与えられた価値や規範も、internalizationを通じて自己へ取り込まれうる。For more autonomous integration, people need room to freely process, endorse, and when necessary modify the values they encounter.

つまり問題は、影響されたかどうかではない。**The question is whether, after being influenced, a person can examine, reject, transform, and integrate that influence as their own.**

ここから推薦AIへの要求も変わる。「私の好みに忠実であれ」だけでは弱い。A stronger request is: “you may expose me to new influences, but help me retain the ability to reconsider them.”

すると良いpersonalizationとは、本人のコピーを精密化することではなく、**a relationship that supports self-understanding and self-revision**なのかもしれない。

[Ryan & Deci, Self-Determination Theory / Organismic Integration Theory](https://selfdeterminationtheory.org/the-theory/) / [Deci & Ryan, “The ‘What’ and ‘Why’ of Goal Pursuits,” 2000](https://selfdeterminationtheory.org/SDT/documents/2000_DeciRyan_PIWhatWhy.pdf)

---

## 7. AI時代の自由は、「まだ知られていない自分」を残せるかで決まる

ここで前稿の「委任の憲法」へ戻る。The previous essay reframed autonomy from “clicking every decision yourself” toward governing what gets delegated, where the system stops, and how actions can be checked or revoked.

しかし今回、その憲法にもう一つ条文が必要だと分かった。**The ability to revise the model of yourself.**

たとえば「過去半年の履歴を弱くする」「このジャンルでは未知の候補を20%入れる」「これは仕事用の私で、休日の好みには使わない」「この推薦理由を消す」「この推定は違う」「今日は私らしくないものを見たい」。These look like settings, but they share one function: preventing the agent’s model of “me” from becoming authoritative simply because it is statistically confident.

2026年のrecommender systems研究では、system-centricなaccuracyだけでなく、user agency、transparency、fairness、privacy、long-term welfareを重視する方向が改めて強調されている。This is an editorial research agenda, not a finished universal design standard, but it makes clear that “being accurate” is not the only value in the system.

さらにAgentic Commerceでは、推薦がそのまま購入や予約へつながる。Google’s AP2 v0.2 explicitly includes Human Not Present autonomous payments based on pre-authorized instructions. 推薦が見るだけで終わらず、行動まで閉じるなら、過去の好みを再生産するfeedback loopの速度と強さも変わりうる。これは現時点で普及を意味する話ではないが、設計論として無視しにくい。

だからAI時代の自律性は、「私を正しく知ってもらう権利」だけでは足りない。**It also requires room to deviate from predictions about yourself, revise the model, and move toward a self that has not yet become data.**

自由とは、完全に影響されないことではない。完全に予測されないことでもない。**Freedom is not only being known accurately. It is retaining the capacity to become someone your model does not yet know.**

[“Re-centering the user in recommender system research,” International Journal of Human-Computer Studies, 2026](https://doi.org/10.1016/j.ijhcs.2026.103904) / [Google, Agent Payments Protocol v0.2, 2026](https://blog.google/products-and-platforms/platforms/google-pay/agent-payments-protocol-fido-alliance/)
