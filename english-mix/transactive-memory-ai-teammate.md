---
id: transactive-memory-ai-teammate
title: "AIを入れると、知識は増える。でも協調は自動では増えない――人間＋AIのトランザクティブメモリー"
subtitle: "When AI joins the team, knowledge expands faster than coordination does."
mode: "english-mix"
english_ratio: 0.45
mix_unit: "sentence"
---

# AIを入れると、知識は増える。でも協調は自動では増えない

## The moment we call AI a teammate, who knows what?

前作では、team memoryを「誰が何を知っているか」というmapとして考え、そのmapが人の入れ替わりで古くなることまで見た。Then a much stranger node enters the map: **a generative AI that answers almost anything in seconds and sometimes makes confident mistakes**.

If AI is only a search box, the story is simple. しかし仕事の途中で「まずAIに聞く」「この案はAIに反論させる」「資料の第一稿はAIへ振る」が定着すると、AIはもう道具箱の一つではない。It becomes a **retrieval destination**: a place the team goes for certain kinds of knowledge. トランザクティブメモリーの言葉でいえば、a nonhuman node is entering the knowledge directory.

Then something odd happens. 2026年にAcademy of Management Proceedingsで発表された研究は、GitHubのopen-source development dataとlarge-scale surveyを組み合わせ、人間とGenAIの協働がknowledge breadth and depthを増やしspecializationを強める一方、**knowledge coordinationには有意な変化を確認できなかった**と報告した。Adding a knowledge source and learning how to combine it are different capabilities. Source: <a href="https://journals.aom.org/doi/abs/10.5465/AMPROC.2026.19027abstract">Vroegindeweij et al. (2026)</a>.

<figure>
  <img src="https://silovar-uk.github.io/myessays/assets/transactive-memory-ai/ai-knowledge-coordination-gap.svg" alt="人間と生成AIの協働で知識の幅と深さは増える一方、知識の協調は自動的に改善するとは限らないことを示した図" loading="lazy">
  <figcaption>Conceptualizing the asymmetry between specialization and coordination reported in a 2026 Human–GenAI study. Source: <a href="https://journals.aom.org/doi/abs/10.5465/AMPROC.2026.19027abstract">Vroegindeweij et al. (2026)</a>. The source is an Academy of Management Proceedings abstract, so broad generalization requires caution.</figcaption>
</figure>

This shifts the AI-adoption question. 「AIで何ができるか」を増やすだけでは、the team does not automatically become smarter. **Who invokes the new knowledge, who doubts it, and who integrates it with existing expertise** must also be designed before added knowledge becomes team memory.

## 1. In an ICU simulation, accessing AI was linked to generating new hypotheses.

Human-AI teaming through a TMS lens is not merely a post-ChatGPT metaphor. 2023年、Nadine Bienefeldらは、180人のICU physicians and nursesがAI agentと働くsimulationを観察し、transactive memoryの観点からinteractionを分析した。In higher-performing teams, accessing knowledge from the AI agent was positively associated with generating new hypotheses and with speaking up about doubts or concerns. Source: <a href="https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2023.1208019/full">Bienefeld et al. (2023)</a>.

The important reading is not “AI beat the clinicians.” この研究はobservational studyであり、AIへ聞けば必ず成果が上がるというcausal claimでもない。What is interesting is that in teams functioning well, AI had become **an additional knowledge source inside the conversation flow**. AI's value appeared not only in answers, but in widening the space of possibilities the team considered.

In a human-only TMS, the map may say “cardiology → Dr. A” or “device issue → B.” AIが入ると、「鑑別候補の発散はAI」「最終判断は医師」「患者の微妙な変化は看護師」というheterogeneous division of cognitionが加わる。AI may not replace one human seat; it can **redraw the boundaries between human specialties themselves**.

## 2. At P&G, “one person + AI” caught up with a two-human team.

P&G provided a much larger field test of that boundary shift. 2026年にOrganization Scienceで公開された研究では、791人のR&Dとcommercial professionalsがreal product innovation challengesに取り組んだ。Participants were randomly assigned to four conditions: individual/no AI, two-human team/no AI, individual + AI, and two-human team + AI. Source: <a href="https://pubsonline.informs.org/doi/10.1287/orsc.2025.20702">The Cybernetic Teammate (2026)</a>.

One finding is especially striking. **Individuals with AI matched the performance of human teams without AI.** さらにAIなしでは、R&D職はtechnical solutions、commercial職はmarket-oriented solutionsへ寄りやすかったが、AI利用者は職種にかかわらずmore balanced solutionsを出した。The authors interpret this as AI helping bridge functional silos.

This does not mean “teams are obsolete.” むしろ重要なのは、一人の中へtemporarily multiple functional perspectivesを持ち込めることだ。Traditional TMS distributes expertise across people and connects them through communication; GenAI can **compress part of that distributed expertise onto one worker's screen**. It begins to challenge the assumption that specialization must map neatly onto people.

But compression has a side effect. マーケティングらしい視点も技術者らしい視点も同じchat windowから返ると、「この主張はどの専門性に基づき、誰が責任を持って検証したのか」が見えにくい。The easier AI makes it to cross knowledge boundaries, the more deliberately we must rebuild **provenance and accountability boundaries**.

## 3. AI expertise cannot be fixed like “this person is legal.”

Human experts also have uneven strengths, but their expertise usually has some continuity. 法務担当は今日も明日も法務に詳しく、data analystは昨日の分析文脈をある程度引き継ぐ。Generative AI expertise is stranger. The same model may become stronger or weaker depending on the task, context, prompt, connected tools, and access to current information.

The idea of a **jagged technological frontier** captures this well. BCGが関わった758人のknowledge workersの実験では、AI capabilityの内側に置かれた18のrealistic tasksで、AI利用者はfaster, more complete, and higher qualityだった。一方、能力境界の外に置かれたcomplex taskでは、AI conditions were on average 19 percentage points less likely to be correct than the control. Source: <a href="https://pubsonline.informs.org/doi/10.1287/orsc.2025.21838">Dell'Acqua et al., Organization Science</a>.

<figure>
  <img src="https://silovar-uk.github.io/myessays/assets/transactive-memory-ai/ai-jagged-frontier.svg" alt="AIが得意な領域では速度と品質が上がる一方、能力境界の外では正答率が下がるジャギッド・フロンティアの概念図" loading="lazy">
  <figcaption>AI capability is not separated by one smooth boundary. In the BCG experiment, correctness fell by an average of 19 percentage points in the outside-the-frontier task. Source: <a href="https://pubsonline.informs.org/doi/10.1287/orsc.2025.21838">Dell'Acqua et al.</a></figcaption>
</figure>

More awkwardly, even when answers were wrong outside the frontier, AI-assisted responses received **higher ratings for coherence and persuasiveness**. つまり「きれいに説明できる」と「正しい」が逆方向へ動く場面がある。In human TMSs, credibility is learned from experience, reputation, and role; with AI, fluency can imitate those cues without guaranteeing correctness.

So “who knows what” is not enough for AI. **Under what conditions can this AI be trusted, and under what conditions must another route verify it?** までmapへ書く必要がある。AI expertise behaves less like a fixed address and more like a road whose traffic conditions change with the weather.

## 4. We need “how much to trust it about what,” not “trust AI or not.”

AI trust is often framed as a yes/no question. しかし人間の専門家でも、そんな全人格的な信用はしない。We may trust a legal expert on contract interpretation without asking them to forecast attendance. TMS credibility is useful when it is **calibrated by domain**, not when it becomes blanket faith.

Behavioral research has found that simply knowing advice came from AI can increase reliance, even when that advice conflicts with contextual information or a person's own assessment. AIは誤るから危険なのではなく、誤りがadvice-like formで届き、人間側のreliance behaviorを変えるため危険になる。Source: <a href="https://www.sciencedirect.com/science/article/pii/S0747563224002206">Trust and reliance on AI — An experimental study on the extent and costs of overreliance on AI</a>.

So “be careful with AI answers” is too weak. 事実確認が必要な領域、発散だけに使う領域、一次情報へ戻る領域、最終判断へ使わない領域を先に決める必要がある。Just as teams say “check this number with finance” or “legal must review this wording,” AI needs a **terms-of-trust policy**.

At that point, AI literacy is no longer mainly about writing clever prompts. より重要なのは、AIが答えたあと、そのanswerをknowledge systemのどこへ置くかを判断する能力である。If prompting is an input skill, **trust calibration becomes the skill of deciding where an output is allowed to live**.

## 5. If external memory gets stronger, how little internal memory can humans keep?

Transactive memory always meant that individuals do not need to remember everything themselves. ならAIが強いexternal memoryになるほど、人間は覚えなくてよいはずである。この推論は自然だが、individual learning researchを見ると少し不安になる。

A 2025 randomized controlled trial assigned 120 undergraduates learning AI topics to ChatGPT-assisted or traditional study conditions. 45日後のsurprise retention testでは、ChatGPT groupが57.5％、traditional groupが68.5％だった。The authors discuss cognitive offloading as one possible explanation for weaker long-term retention. Source: <a href="https://www.sciencedirect.com/science/article/pii/S2590291125010186">ChatGPT as a cognitive crutch (2025)</a>.

This was a student learning study and should not be mechanically generalized to workplace teams. それでも問いは残る。If AI is always available, humans may retain less while output performance still rises. では障害、model update、access loss、hallucinationのとき、who notices that “the usual answer is wrong”? External memory still needs an internal reference point against which it can be checked.

前作では、覚えないことをdefectではなくdivision of cognitionとして捉え直した。AI introduces a lower bound to that division. **Humans do not need to remember everything, but they must remember enough to notice when the external answer is broken.** The more memory we move outward, the more deliberately we must define the minimum knowledge that stays inside people.

## 6. Instead of creating an “AI person,” separate knowing, doubting, and deciding.

Returning to Lewis's TMS dimensions makes AI adoption clearer. specializationは「AIは何が得意か」、credibilityは「どこまで信用するか」、coordinationは「誰がAIを使い、誰がhuman knowledgeと統合するか」である。Saying “everyone has access to AI” decides access, but almost none of these three design questions.

<figure>
  <img src="https://silovar-uk.github.io/myessays/assets/transactive-memory-ai/ai-tms-protocol.svg" alt="AI導入時に必要な設計として、得意領域の地図、検証ルール、責任と統合の流れを示した図" loading="lazy">
  <figcaption>Designing Human–AI TMS through specialization, credibility, and coordination. The three dimensions build on Lewis (2003).</figcaption>
</figure>

For example: “AI for market-example divergence,” “internal data for numbers,” “rights and contracts back to the responsible human,” and “another person checks the final logic.” このときAIは万能な一人の同僚ではなく、multiple constrained rolesを持つknowledge nodeになる。When its capability frontier changes, the roles change; when errors rise in a domain, credibility is downgraded. AI requires the kind of map update triggered by human turnover, only more frequently.

This also shows why appointing one “AI person” is not enough. その人だけがAIの使い方を知ると、新しいpersonal dependencyが生まれる。The important thing is visibility into who retrieves AI output, who verifies it, and who owns the final decision. **AI maturity may be better measured by whether knowledge flow and accountability flow align than by prompt skill.**

## 7. AI is not an external brain; it is a device that rearranges where team memory lives.

At first, I thought adding GenAI to TMS was like adding one extremely knowledgeable teammate. しかし調べるほど、その比喩は壊れた。P&G showed AI thinning functional boundaries, BCG showed correctness flipping across capability frontiers, and the GitHub study found more specialization without automatic coordination gains. AI does not fill one seat; it changes how the seats are divided.

In human-only TMS, the core task was learning “who knows what.” 人間＋AIでは、そこへ「どの条件でAIが知っていることになるのか」「誰がそのknowledgeをverifyするのか」「AIを使った人にknowledgeが残らなくてもよいのか」が加わる。The memory directory becomes a **routing table carrying not only addresses but confidence and verification paths**.

So the next AI race may not be won by the organization that uses the most models. AIへknowledgeを取りに行くroute、人間へ戻すroute、疑うroute、責任を引き受けるrouteをうまく設計した組織のほうが強いはずだ。This is less “AI adoption” than a redesign of organizational cognition.

前作で「誰に聞けばいいかを知ることもmemoryだ」と分かった。Then turnover research showed that an old answer to “who should I ask?” can become false memory. AI pushes the idea one step further. **The next team skill is not only knowing where an answer comes from, but sharing the conditions under which that answer is allowed to count as knowledge.** Transactive memory begins to look less like a human directory and more like a protocol for adopting knowledge.

## 参考資料

- <a href="https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2023.1208019/full">Bienefeld et al. (2023), Human-AI teaming: leveraging transactive memory and speaking up for enhanced team effectiveness</a>
- <a href="https://journals.aom.org/doi/abs/10.5465/AMPROC.2026.19027abstract">Vroegindeweij et al. (2026), Transforming Transactive Memory Systems in Human-GenAI Collaboration</a>
- <a href="https://pubsonline.informs.org/doi/10.1287/orsc.2025.20702">The Cybernetic Teammate: A Field Experiment on Generative AI and Teamwork (2026)</a>
- <a href="https://pubsonline.informs.org/doi/10.1287/orsc.2025.21838">Navigating the Jagged Technological Frontier, Organization Science</a>
- <a href="https://www.sciencedirect.com/science/article/pii/S0747563224002206">Trust and reliance on AI — An experimental study on the extent and costs of overreliance on AI</a>
- <a href="https://www.sciencedirect.com/science/article/pii/S2590291125010186">ChatGPT as a cognitive crutch: Evidence from a randomized controlled trial on knowledge retention (2025)</a>
- <a href="https://pubmed.ncbi.nlm.nih.gov/12940401/">Lewis (2003), Measuring transactive memory systems in the field</a>
