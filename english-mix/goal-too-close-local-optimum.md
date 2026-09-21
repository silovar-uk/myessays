---
id: goal-too-close-local-optimum
title: "ゴールは、近いほどいいわけではない"
subtitle: "Why finishing too quickly can trap us on a smaller hill"
created: "2026-09-21"
updated: "2026-09-21"
type: "Conceptual Paper"
status: "完成"
tags: ["目標設定", "学習", "探索", "キャリア", "組織学習", "思考法"]
keywords: ["goal setting", "proximal goals", "distal goals", "learning goals", "exploration", "exploitation", "local optimum", "myopia"]
grow: 5
abstract: "Goals matter. But when a nearby checkpoint becomes the final definition of success, our search space can shrink. Research on proximal goals, learning goals, exploration and exploitation suggests a better pattern: look far, walk near. 近い目標は足場として使い、遠い方向は探索の幅を守るために使う。"
---

# ゴールは、近いほどいいわけではない
## Why finishing too quickly can trap us on a smaller hill

<!-- level:4 role:claim -->
Goals matter. でも最近、同じくらい大事なのは **not placing the finish line too close** なんじゃないかと思う。

<!-- level:2 role:description -->
「今月中に終える」「今年中に形にする」「まず一個完成させる」。These are powerful because they create movement. 締切ができ、progress が見え、達成感も得られる。

<!-- level:3 role:analysis -->
But when we try to finish too quickly, the question quietly changes. 「どうすればもっと遠くへ行けるか」ではなく、we start asking “How can I close this goal faster?” 目標が direction から termination condition に変わる。

<!-- level:5 role:implication -->
The scary outcome is not failure. **It is succeeding inside a search space that became too small.**

---

## 1. “Always move uphill” sounds smart until you climb the wrong hill

<!-- level:4 role:claim -->
この問題を考えていて、AI の古典的な local search、hill climbing を思い出した。The rule is simple: move to a neighboring state with a higher value.

<!-- level:1 role:evidence -->
UC Berkeley の教材では、hill-climbing は greedy な探索として説明されている。It keeps moving uphill, but it can stop at a local maximum — a peak higher than all nearby points, yet lower than the global maximum.

<!-- level:2 role:description -->
If the landscape has many hills, the algorithm can beautifully finish the nearest small one. 遠くにもっと高い山があっても、そこへ行くには一度 downhill に動く必要がある。Local improvement alone cannot justify that move.

<!-- level:3 role:analysis -->
Humans are not algorithms, of course. これは心理学的な証明ではなく metaphor だ。でも比喩としてはかなり刺さる。**Choosing the step with the fastest visible improvement is not the same as choosing the path with the largest future.**

<!-- level:5 role:implication -->
近いゴールの本当のリスクは、小さい数字を置くことではない。It is that **only locally improvable options remain visible**.

[UC Berkeley CS188 — Local Search](https://inst.eecs.berkeley.edu/~cs188/textbook/csp/local-search.html)

---

## 2. But proximal goals are not the enemy

<!-- level:4 role:claim -->
ここで “short-term goals are bad” と言うと、話を雑にしすぎる。Goal-setting research says something more interesting.

<!-- level:1 role:evidence -->
Locke and Latham summarized decades of research showing that specific, challenging goals can strongly direct behavior and performance. In a 1999 experiment by Latham and Seijts, 39 young adults worked on a toy-making task. The group given **proximal goals plus a distal goal** earned more than the group given only a distal goal, and proximal goals were linked to greater self-efficacy and strategy-focused attention.

<!-- level:3 role:analysis -->
つまり、near goals are excellent scaffolding. 遠い目標だけでは今日の一歩が曖昧になる。A proximal target connects current action to a distant direction.

<!-- level:5 role:implication -->
The problem is not distance. It is **role confusion**. Is the nearby goal a checkpoint that helps us move, or the final place where thinking is allowed to stop?

[Locke & Latham (2002)](https://pubmed.ncbi.nlm.nih.gov/12237980/)  
[Latham & Seijts (1999)](https://onlinelibrary.wiley.com/doi/10.1002/%28SICI%291099-1379%28199907%2920%3A4%3C421%3A%3AAID-JOB896%3E3.0.CO%3B2-%23)

---

## 3. A close goal can quietly redefine what is worth thinking about

<!-- level:4 role:claim -->
Goals focus attention. それは強みだが、focus always has an outside.

<!-- level:1 role:evidence -->
Ordóñez and colleagues, in Goals Gone Wild, reviewed possible side effects of overprescribed goal setting: narrow focus on goal-relevant areas, distorted risk preferences, inhibited learning, reduced intrinsic motivation, and more. Their argument is not “never set goals.” It is closer to “strong medicine needs dosage.”

<!-- level:2 role:description -->
例えば「今月10本の記事を出す」が final success condition なら、the fastest route becomes rational. 難しいテーマを避ける。三日調査が必要な題材を後ろへ送る。問いが変わる寄り道を切る。One more finished item beats one more unanswered question.

<!-- level:3 role:analysis -->
The person is not lazy. むしろ目標に忠実だ。Optimization for the metric itself is shrinking the search.

<!-- level:5 role:implication -->
だから「近いゴールは小さくまとまりやすい」は、willpower の話ではない。**When success is defined nearby, everything outside that definition becomes easier to ignore.**

[Ordóñez et al. (2009) — Goals Gone Wild](https://business.columbia.edu/faculty/research/goals-gone-wild-systematic-side-effects-overprescribing-goal-setting)

---

## 4. For complex work, “learn the game” can beat “hit the number”

<!-- level:4 role:claim -->
未知の多い仕事では、finishing fast can push us back toward known strategies.

<!-- level:1 role:evidence -->
Seijts and Latham argue that when a task mainly requires acquiring knowledge and skills, a specific challenging **learning goal** can be more useful than an outcome or performance goal. A learning goal shifts attention from the result to discovering effective strategies and processes.

<!-- level:2 role:description -->
「3か月で売上20%増」は outcome-first. 「3か月で売上が動く要因を三つ検証し、再現可能な戦略を一つ発見する」は learning-first. Same calendar, different cognition.

<!-- level:3 role:analysis -->
Performance goals work well when the route is largely known. Learning goals matter more when the route itself is the problem. ここを混ぜると、unknown territory で known methods を高速回転させることになる。

<!-- level:5 role:implication -->
近いゴールを置くなら、bring the next learning cycle closer — not necessarily the final finish line.

[Seijts & Latham (2005)](https://journals.aom.org/doi/10.5465/AME.2005.15841964)

---

## 5. “Small and tidy” can mean exploitation keeps beating exploration

<!-- level:4 role:claim -->
この問題は、individual goal setting を越えて、organizational learning の古典につながる。The key pair is exploration and exploitation.

<!-- level:1 role:evidence -->
James G. March distinguished **exploration** of new possibilities from **exploitation** of existing knowledge and capabilities. His 1991 model argued that adaptive processes can refine exploitation faster than exploration, making organizations effective in the short run but potentially self-destructive in the long run. Levinthal and March later described learning myopia: overlooking distant times, distant places, and failures.

<!-- level:2 role:description -->
既存施策を少し改善すれば、numbers often return quickly. 新しい方法を試すと、最初は数字が落ちるかもしれない。If every evaluation window is short, exploration starts every race several meters behind.

<!-- level:3 role:analysis -->
So “near” is not only calendar distance. It is a time logic that treats **fast feedback as proof of value**.

<!-- level:5 role:implication -->
Maybe becoming small is not a lack of ambition. It can be the result of improving every week, hitting every monthly target, and **never once leaving the hill you already knew how to climb**.

[March (1991)](https://pubsonline.informs.org/doi/abs/10.1287/orsc.2.1.71)  
[Levinthal & March (1993)](https://sms.onlinelibrary.wiley.com/doi/10.1002/smj.4250141009)

---

## 6. Thought experiment: what if every goal had to be achievable within seven days?

<!-- level:4 role:claim -->
ここからは empirical finding ではなく、a deliberately extreme thought experiment.

<!-- level:2 role:description -->
If every goal had to be completed in seven days, measurable actions would dominate: send X emails, write Y pages, meet Z people, run N kilometers. どれも悪くない。They are excellent for action control.

<!-- level:2 role:description -->
But slower outcomes become awkward: develop a unique point of view, build a long relationship, change your judgment standard, explore a field where you do not yet know what “success” means.

<!-- level:3 role:analysis -->
Soon we stop choosing what matters and start choosing what can be judged quickly. **Measurability becomes a hidden value system.**

<!-- level:5 role:implication -->
The deepest danger of an overly close goal may be this: it does not merely make goals smaller. **It makes our imagination prefer futures that can be scored soon.**

---

## 7. Far does not mean absurdly huge

<!-- level:4 role:claim -->
ここまで読むと “Then set giant goals” になりそうだが、それも違う。Distant is not the same as reckless.

<!-- level:1 role:evidence -->
Sitkin and colleagues examined stretch goals — seemingly impossible targets — and argued that their usefulness depends heavily on context. Their framework suggests that organizations with recent success and slack resources may be better positioned to benefit, while organizations least able to absorb the risk may be especially attracted to them.

<!-- level:3 role:analysis -->
So the point is not “make the number enormous.” 遠いゴールは、quota より direction に近い。It should widen the search space beyond today’s known method without pretending uncertainty does not exist.

<!-- level:5 role:implication -->
A useful distant goal is not simply harder. It is **far enough that the current method cannot define the whole future in advance**.

[Sitkin et al. (2011) — The Paradox of Stretch Goals](https://scholars.duke.edu/publication/798525)

---

## 8. Look far, walk near

<!-- level:4 role:claim -->
研究をつなぐと、one goal should not carry every job. 遠い方向と近い行動を分けた方がいい。

<!-- level:3 role:analysis -->
I would use four layers.

1. **Direction / 方向**  
   すぐ達成判定しない。What do I want to change in the long run? This protects the size of the search space.

2. **Milestone / 足場**  
   数週間〜数か月で確認できる checkpoint. Arrival creates information for the next decision; it is not the final ending.

3. **Learning goal / 学習目標**  
   What do I want to discover, test, or understand? 未知が多いほど厚くする。

4. **Anti-goal check / 反対側の点検**  
   What am I no longer seeing because I am chasing this goal? 指標の外を定期的に見る。

<!-- level:2 role:description -->
例えば「一年で文章力を上げる」を Direction にする。今月「4本書く」を Milestone にする。But add learning goals such as “test three openings” or “compare two ways of using primary sources.” 月末には「本数を優先して避けた題材はなかったか」を点検する。

<!-- level:5 role:implication -->
This keeps the motivational power of near goals without letting them own the entire future. **The distant goal protects vision; the proximal goal moves the feet.**

---

## 9. Prompt: design goals that do not shrink the search

<!-- level:4 role:claim -->
AI は goal setting を頼むと、specific, measurable, time-bound に寄せやすい。それは実行には便利だが、what is easy to measure can slowly replace what is important.

<!-- level:3 role:analysis -->
So the prompt should protect exploration before optimizing execution.

    あなたは目標を「早く達成するための管理表」ではなく、
    「方向を失わずに探索を続けるための設計」として扱ってください。

    1. すぐには達成判定できない Direction を1つ置く。
    2. 2〜8週間程度の Milestone を2〜4個置く。
    3. 各 Milestone で performance goal と learning goal を分ける。
    4. performance goal だけを追った場合の narrow focus を3つ挙げる。
    5. 達成は遅くなるが exploration を広げる行動を最低1つ入れる。
    6. 目標のために見えなくなりそうな選択肢を Anti-goal check として列挙する。
    7. Milestone が final destination ではなく next decision material になっているか確認する。
    8. 未知が多い課題では learning goal を厚くする。

    禁止:
    - measurable だからという理由だけで指標を採用する
    - proximal metric を最終目的へ昇格させる
    - distant direction を根拠なく巨大な stretch goal にする
    - failed exploration を自動的に無価値と扱う

<!-- level:5 role:implication -->
The aim is not more goals. It is to catch the moment when **a goal begins stealing the horizon it was supposed to guide us toward**.

---

## 10. A goal should be a line of sight, not the nearest finish tape

<!-- level:4 role:claim -->
最初は、「すぐゴールすると小さくまとまる」という感覚的な話だった。I half expected the research to turn it into a simple “dream bigger” message.

<!-- level:2 role:description -->
It did not. Proximal goals can be useful. They support action, feedback, self-efficacy, and strategy. But strong outcome goals can also narrow attention, and complex work may benefit from learning goals. In organizations, exploitation can return benefits faster than exploration and therefore keep winning.

<!-- level:3 role:analysis -->
So the thing to change is not “having near goals.” It is **asking near goals to decide what the whole journey is worth**.

<!-- level:5 role:implication -->
今はこう思う。Put footholds nearby and direction far away. ときどき目の前の坂を登るのをやめて、別の山が見えていないか確認する。  
**A goal is not only there to help us finish sooner. It is there to keep the search alive long enough to reach somewhere we could not see from the start.**

---

## Research Note

### Confirmed from published sources

- Goal-setting theory has a long empirical tradition showing benefits of specific, challenging goals in many contexts.
- Latham & Seijts (1999) found stronger performance with proximal + distal goals than with a distal goal alone in their toy-making experiment.
- Seijts & Latham (2005) argue for learning goals when complex tasks require knowledge and strategy acquisition.
- Ordóñez et al. (2009) summarize side effects of overprescribed goal setting, including narrow focus and inhibited learning.
- March (1991) analyzed the exploration / exploitation trade-off and the short-run pull toward exploitation.
- Levinthal & March (1993) described learning myopia involving distant times, distant places, and failures.
- The hill-climbing / local maximum section is an analogy from search algorithms, not direct psychological evidence.
- Sitkin et al. (2011) offer a contingency framework for stretch goals rather than a claim that bigger goals are universally better.

### Interpretation and proposals in this essay

- The central idea that “turning proximal goals into final goals can shrink exploration” is a synthesis across these literatures, not a single experimentally established causal law.
- Direction / Milestone / Learning goal / Anti-goal is a proposed practical framework.
- The seven-day-goal section is a thought experiment.

---

## Sources

- [Locke & Latham (2002)](https://pubmed.ncbi.nlm.nih.gov/12237980/)
- [Latham & Seijts (1999)](https://onlinelibrary.wiley.com/doi/10.1002/%28SICI%291099-1379%28199907%2920%3A4%3C421%3A%3AAID-JOB896%3E3.0.CO%3B2-%23)
- [Seijts & Latham (2005)](https://journals.aom.org/doi/10.5465/AME.2005.15841964)
- [Ordóñez et al. (2009)](https://business.columbia.edu/faculty/research/goals-gone-wild-systematic-side-effects-overprescribing-goal-setting)
- [March (1991)](https://pubsonline.informs.org/doi/abs/10.1287/orsc.2.1.71)
- [Levinthal & March (1993)](https://sms.onlinelibrary.wiley.com/doi/10.1002/smj.4250141009)
- [Sitkin et al. (2011)](https://scholars.duke.edu/publication/798525)
- [UC Berkeley CS188 — Local Search](https://inst.eecs.berkeley.edu/~cs188/textbook/csp/local-search.html)
