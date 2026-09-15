---
id: transactive-memory-hidden-profile-common-information
title: "会議は「全員が知っていること」ほど長く話す――重要情報が一人の頭にあると、なぜ消えるのか"
subtitle: "Why meetings over-sample common knowledge and miss the one clue only one person has."
mode: "english-mix"
english_ratio: 0.45
mix_unit: "sentence"
---

# 会議は「全員が知っていること」ほど長く話す

## 全員が知っている話を、全員で確認して、会議が終わる

Meetings sometimes contain a very strange kind of time. 出席者全員がすでに知っている数字を誰かが説明し、別の人が「そうですね」と確認し、三人目が同じ数字を別の言い方で言い直す。Forty-five minutes later, someone whispers in the hallway, “Actually, there is one exception in this case.” そこを先に聞きたかった。

Is this merely bad facilitation? 調べると、もっと嫌な答えが出てくる。Research on group decision making has repeatedly found that **groups discuss information everybody already knows more readily than information held by only one member**. これがHidden Profile研究の中心的な問題である。

A 2012 meta-analysis combined 65 hidden-profile studies, 101 independent effects, and 3,189 groups. グループは固有情報より共有情報を約2標準偏差多く言及し、情報が均等に与えられたfull-information groupsに比べ、hidden-profile groupsは最適解を見つける可能性が8分の1程度だった。Decision quality was also related to how much unique information entered discussion. Source: <a href="https://pubmed.ncbi.nlm.nih.gov/21896790/">Lu, Yuan & McLeod (2012)</a>.

So having all the ingredients somewhere in four heads does not automatically create “the group's knowledge.” 前作まで、transactive memoryを「誰が何を知っているか」というmapとして考えてきた。But even a correct map is useless if the information never travels from its address into the meeting. **After memory comes the problem of speaking.**

## 1. 1985年、四人集めれば賢くなるはずだった

The classic demonstration came from Garold Stasser and William Titus in 1985. 参加者はcandidateを選ぶ模擬的な政治的意思決定に取り組み、individual members received partial information that biased them against the objectively best candidate. Yet the group collectively possessed enough information to identify that candidate. In principle, discussion should fill the gaps. Source: <a href="https://doi.org/10.1037/0022-3514.48.6.1467">Stasser & Titus (1985)</a>.

Discussion did not neatly fill them. 会話では、複数メンバーが最初から持っていたcommon informationと、already formed preferencesを支持する情報が優先的に取り上げられた。Instead of correcting distorted candidate pictures, discussion often helped preserve them.

Four people were assembled to add four partial minds together. 実際には、**四人が知っている部分を太字にした。**

That changes what a meeting looks like. 会議は各人の情報を自動的に平均するmachineではない。It can be a sampling device that confuses the **social copy count of a fact** with its importance. Common facts enter conversation partly because more people are available to mention them, not because they deserve more weight.

## 2. 共有情報には、最初から「発言券」が多い

So I built an intentionally over-simple model. これは実験結果の再現ではなく、the structural advantage of shared informationだけを見るthought experimentである。Four people each hold four facts known by everyone plus one unique fact known only to themselves, and each person randomly mentions one of their five facts.

For one particular shared fact, the probability that at least one person mentions it is `1-(4/5)^4`, or about 59.0%. 一方、one particular unique fact can only be selected by its single owner, so its probability is 20.0%. Even if both facts are equally important, the shared fact is about 2.95 times more likely to enter discussion.

<figure>
  <img src="https://silovar-uk.github.io/myessays/assets/transactive-memory-hidden-profile/common-vs-unique-tickets.svg" alt="4人が共有情報4件と固有情報1件を持つ単純モデルで、特定の共有情報は59.0%、固有情報は20.0%の確率で話されることを示した図" loading="lazy">
  <figcaption>A toy model visualizing only the difference in the number of possible speakers. These are not empirical effect sizes; the model is a way to build intuition for the common-information advantage documented in hidden-profile research.</figcaption>
</figure>

Real conversations are obviously not random. 発言力、役職、preferences、confidence、social pressure、先に出た意見への同調がある。So this model cannot explain the whole phenomenon. But it shows that unique information begins with a disadvantage even before those psychological forces arrive: **only one person can put it on the table.**

This creates an awkward paradox. 情報が複数人に共有されていることは、forgettingやabsenceに強く、organizational memoryとしては頑丈である。Inside discussion, however, that robustness becomes extra speaking opportunities, so **information that is already shared gets shared again**. Redundancy protects memory while sometimes drowning out scarce signals.

## 3. 会議を長くしても、Zoomにしても、それだけでは救えない

Maybe the solution is simply more time, or a different medium. Luらのmeta-analysisでは、face-to-faceかcomputer-mediatedかというcommunication mediumの違いは、unique information poolingやdecision qualityに有意な影響を示さなかった。At least, moving the same meeting online does not make the hidden-profile problem disappear by itself.

A broader meta-analysis also resists the “just communicate more” answer. Mesmer-MagnusとDeChurchは72研究、4,795 groups、計17,279人を統合し、information sharingがperformance、cohesion、decision satisfaction、knowledge integrationと正に関係すると報告した。同時に、task demonstrability、discussion structure、cooperationがsharingを促す要因だった。Source: <a href="https://pubmed.ncbi.nlm.nih.gov/19271807/">Mesmer-Magnus & DeChurch (2009)</a>.

So “increase communication” is a very coarse prescription. 共有情報を十回繰り返すmeetingも、raw talk volumeだけなら活発である。What matters is not just volume but a structure that gives **information held by only a few people a chance to enter before the group converges**.

The bottleneck is not merely the numerator of how much people talk. それは、whose information gets sampled at allというdenominatorの問題でもある。Doubling meeting length may matter less than spending the first ten minutes recovering what the group does not yet collectively know.

## 4. 「この人はこの容疑者担当」と知らせると、隠れた手がかりが出てきた

This is where transactive memory becomes useful again. In 1995, Stasser, Dennis Stewart, and Gwen Wittenbaum gave three-person groups a homicide mystery. グループ全体では犯人を特定するのに必要なcluesを持っていたが、each member saw only a subset of the critical clues. It is an almost comically accurate model of many real meetings: everybody has a different fragment of the file.

The key condition told members **who in the group had additional information about each suspect**. その条件では、more unshared clues were mentioned and groups were more likely to identify the correct suspect. Merely warning an individual that they personally had extra information about one suspect did not produce the same benefit. Source: <a href="https://doi.org/10.1006/jesp.1995.1012">Stasser, Stewart & Wittenbaum (1995)</a>.

In a related study, Stewart and Stasser found that assigned expertise increased the proportion of unshared information mentioned in both collective recall and decision tasks. 話された固有情報はcollectively endorsed recordにも残りやすく、later recognitionでも正しく認識されやすかった。Source: <a href="https://pubmed.ncbi.nlm.nih.gov/7473023/">Stewart & Stasser (1995)</a>.

This adds a second function to “who knows what.” それはquestionが出たあとにexpertを探すdirectoryだけではない。It can also become a **speaking-routing table that tells the group whose unique information must be harvested before deciding**. Transactive memory can shape not only retrieval, but the order in which knowledge becomes public.

## 5. ただし「専門家です」と名札を付ければ解決、ではなかった

At this point, expert labels sound like an easy fix. しかし研究は、その気持ちのよい解決も壊してくる。Whether expertise helps depends partly on **what people gain or lose by revealing what they know**.

Claudia Toma and Fabrizio Butera compared cooperative and competitive conditions in hidden-profile tasks. 競争条件では、participants withheld unshared information more than in cooperation and were more reluctant to use information that disconfirmed their initial preferences. A later study found that assigning expertise improved unshared-information pooling under cooperation but reduced it under competition. Sources: <a href="https://doi.org/10.1177/0146167209333176">Toma & Butera (2009)</a> and <a href="https://doi.org/10.1111/j.2044-8309.2012.02105.x">Toma et al. (2013)</a>.

This is where the joke has to stop. 情報の所在が分かっていても、その人が出す理由を持たなければknowledge never becomes a collective resource. Under competition, the “expert” label can even turn unique information into something worth strategically holding back.

A team can therefore possess a perfect knowledge map and still have terrible traffic rules. **TMS accuracy and a cooperative environment in which people can release knowledge without harming themselves are different design problems.** After mapping who knows, we still have to design when and why they can speak.

## 6. そこで、会議を「意見交換」ではなく「希少情報の回収」にしてみる

Now I want to push the research one step too far into a practical prototype. 次の手順全体が一つのexperimentで検証済みという意味ではない。It is an evidence-informed design assembled from hidden-profile findings, expert-role studies, discussion structure, and cooperation research.

At the beginning of the meeting, nobody states a preferred option yet. 先に「自分しか知らない可能性がある事実」「自分の担当領域だけで見えている例外」「判断を変えうるuncertainty」を一人ずつ出す。Then mark who is closest to primary information for each domain. Only after that do participants evaluate options. In other words, **separate information collection from information judgment in time**.

This direction is consistent with work showing that awareness of how information is distributed, combined with reflection on the task, can improve shared task representations, information elaboration, and decision quality. 大事なのは全員へ同じ情報を配ることではない。It is to treat the fact that information is distributed as an explicit design condition of the meeting.

Before researching this, I tended to read silence as “that person probably has nothing to add.” 今は少し逆に見える。**The most important fact may have exactly one social copy, and if its owner stays silent, the fact disappears completely from collective reasoning.** Silence is not evidence of no information; it may be the result of having only one ticket to speak.

Return to the opening scene: everyone spends the meeting confirming what everyone already knows. それが妙なのはtime wasteだけではない。そのあいだ、the one piece the group does not know is still trapped inside one person's head. **A meeting should not merely be a place where knowledge is shared; it should be a device that upgrades low-copy knowledge into group knowledge.** A better metric may therefore be not “How much did we talk?” but “What did only one person know at the start that became usable by the group by the end?”

## 参考資料

- <a href="https://doi.org/10.1037/0022-3514.48.6.1467">Stasser, G. & Titus, W. (1985). Pooling of Unshared Information in Group Decision Making.</a>
- <a href="https://pubmed.ncbi.nlm.nih.gov/21896790/">Lu, L., Yuan, Y. C. & McLeod, P. L. (2012). Twenty-Five Years of Hidden Profiles in Group Decision Making: A Meta-Analysis.</a>
- <a href="https://pubmed.ncbi.nlm.nih.gov/19271807/">Mesmer-Magnus, J. R. & DeChurch, L. A. (2009). Information Sharing and Team Performance: A Meta-Analysis.</a>
- <a href="https://doi.org/10.1006/jesp.1995.1012">Stasser, G., Stewart, D. D. & Wittenbaum, G. M. (1995). Expert Roles and Information Exchange during Discussion.</a>
- <a href="https://pubmed.ncbi.nlm.nih.gov/7473023/">Stewart, D. D. & Stasser, G. (1995). Expert Role Assignment and Information Sampling during Collective Recall and Decision Making.</a>
- <a href="https://doi.org/10.1177/0146167209333176">Toma, C. & Butera, F. (2009). Hidden Profiles and Concealed Information.</a>
- <a href="https://doi.org/10.1111/j.2044-8309.2012.02105.x">Toma, C. et al. (2013). Assigned Experts with Competitive Goals Withhold Information in Group Decision Making.</a>
