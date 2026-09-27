---
id: sf6-modern-marisa-air-attacks-six-toolbox
title: "モダンマリーザの空中攻撃は、「強を押す」だけの話ではなかった"
subtitle: "Six air normals as a toolbox――speed, active frames, air-to-air, cross-up"
created: "2026-09-27"
updated: "2026-09-27"
type: "実践リサーチ"
status: "完成"
tags: ["Street Fighter 6", "SF6", "Modern Marisa", "Marisa", "air attacks", "decision making"]
keywords: ["Modern Marisa", "jump attack", "air-to-air", "cross-up", "Volare Combo", "Caelum Arc", "frame data"]
grow: 5
abstract: "When Modern Marisa jumps, “press Heavy” is not the whole answer. 通常のLight / Medium / HeavyにAssistを組み合わせると、ClassicのLP / LK / MP / MK / HP / HKに相当するsix air normalsへアクセスできる。This essay reorganizes them not by button strength, but by the problem each move solves: speed, air-to-air, cross-up, active window, damage, and neutral-jump options."
---

# モダンマリーザの空中攻撃は、「強を押す」だけの話ではなかった
## Six air normals as a toolbox――speed, active frames, air-to-air, cross-up

### 要旨

Marisa gets a clean forward jump. What do you press?

The lazy answer is Heavy. 単発damageは高いし、見た目もMarisaらしい。A huge character falling from the sky with a huge punch feels correct.

But Modern Marisa has a strange detail. 弱・中・強のthree attack buttonsだけを見ているとair attacksも3つに見えるが、Assistを組み合わせるとJumping LK / MK / HKまで出せる。In effect, Modern can access the six Classic-style air normals: LP, LK, MP, MK, HP, HK.

> Modern controls simplify inputs. But in the air, the decision tree quietly grows back.

I started with a simple question: “Which jump-in button is strongest?” 現行frame dataを並べると、そのquestion itself was too rough. Air normals do not form one ladder from weak to strong. They solve different problems: act faster, win air-to-air, cross behind, stay active longer, hit harder, or use a neutral-jump-only branch.

This article uses data current as of 2026-09-27. 数値はCAPCOM official-reference frame dataを優先し、Modern button mappingは複数のmove listsでcross-checkした。Practical uses from strategy guides are treated as interpretations, not as universal facts.

<figure>
  <img src="https://raw.githubusercontent.com/silovar-uk/myessays/main/assets/sf6/marisa-air-attack-map.svg" alt="Map of Modern Marisa's six air normals and aerial unique attacks">
  <figcaption>Figure 1: Modern Marisa's air-attack map. Assist opens a second row of normals.</figcaption>
</figure>

## 1. Modern still gives Marisa six different air normals

Official SF6 material describes Modern as a control type that reduces command complexity, while Classic uses the traditional six-button layout. でも“inputがsimpler”と“available normalsがthree only”は同じ意味ではない。

In the air, Light gives Jumping LP / Knock Fist, Medium gives Jumping MP / Volare Fist, and Heavy gives Jumping HP / Aether Fist. Assist + Light gives Jumping LK / Cygnus Fall, Assist + Medium gives Jumping MK / Labrys Fall, and Assist + Heavy gives Jumping HK / Uranus Fall.

So the first recognition changes. モダンマリーザのair gameは、three-button gameではない。The inputs are compressed, but the decisions are not.

## 2. Weak, Medium, Heavy is a damage order――not a role order

Current values make the split clear.

Jumping LP starts in 4F, stays active from 4–10F, and deals 300. Jumping LK is 5F, active 5–14F, 300, with a cross-up property. Jumping MP is 7F, active 7–10F, 700, and causes a launch knockdown on an airborne hit. Jumping MK is 8F, active 8–15F, 500. Jumping HP and HK are both 10F, active 10–16F, 800, and both can be charged.

数だけ見るとHeavyがlargest. But the fastest move is LP, the longest active window among the six is LK, MP changes the airborne hit state, and LK changes the left-right problem with cross-up.

Air normals are not “small, medium, large.” They are different answers to different questions.

## 3. Jumping LP does not buy damage; it buys time

Jumping LP is only 300 damage. でも4F startupはMarisaのsix air normalsでfastest.

Current Modern strategy material uses it as a fast air-to-air option, including against opponents trying to jump across. Compared with 7F Jumping MP or 10F Heavy air normals, LP puts a hitbox out earlier after Marisa is already airborne.

That does not make it automatically best. 実際のair-to-airはdistance, jump arc, timing, hitbox geometryで変わる。Still, it gives one clean rule: when the problem is “Will my button come out in time?”, damage is the wrong first metric.

Jumping LP is a time tool.

## 4. Jumping LK changes position, not just damage

Assist + Light gives Jumping LK. It is 5F, active for 10 frames, and deals 300.

More importantly, current frame data explicitly marks it as having a cross-up property. 空中通常技six movesの中では、10Fのactive windowもlongest. Those are two separate facts; long active frames do not automatically cause a cross-up. Geometry and relative position still decide whether the hit lands behind.

But together they explain why this 300-damage button matters. LP asks “Can I hit first?” LK can ask “Which side will I land on?”

Same damage, different problem.

## 5. Jumping MP turns air-to-air into the next game state

Jumping MP / Volare Fist starts in 7F and deals 700. On airborne hit, it causes a launch knockdown. 空中でMediumをもう一度押すとVolare Comboへ派生し、second hit itself is 10F startup and 800 damage.

This is why many strategy sources treat Jumping MP as a main air-to-air candidate. It is not only about touching the other character in the air. It can turn the collision into a knockdown and a new ground situation.

Jumping LP and MP therefore answer different versions of the same problem. LP prioritizes speed. MP gives up some speed for more state change after the hit.

Air-to-air is not one category. There is “stop them” and there is “win, then continue.”

## 6. Jumping MK is useful precisely because the data does not finish the argument

Assist + Medium gives Jumping MK. The hard facts are simple: 8F startup, active 8–15F, 500 damage, 3F landing recovery.

Its active window is eight frames――longer than Jumping MP's four and one frame longer than the Heavy normals. だから“longer contact window candidate”というhypothesisは立てられる。Older but still maintained strategy writing also discusses it as a forward-facing air-to-ground option.

But frame data cannot tell us the whole answer. “Long active frames” does not automatically mean “best air-to-ground.” Hitbox shape, attack angle, jump height, and opponent posture matter.

This move is a useful lesson in research itself: when the table stops answering, do not invent a conclusion. Turn the missing variable into the next test.

## 7. Jumping HP and HK share 10F / 800, so geometry becomes the question

Normal Jumping HP and HK both start in 10F, stay active 10–16F, deal 800, and have 3F landing recovery. ぱっと見るとsame move with a different limb.

They are not identical. Jumping HP has an explicit airborne-hit slam-knockdown note; Jumping HK does not. Their charged versions also differ by one startup frame: HP is 28F, HK is 29F, both for 1500 damage.

What frame tables do not fully show is spatial geometry: how far forward the attack reaches, how far downward it reaches, and which height is easiest to contact. だから“standard jump-in is always HP” or “always HK” is too strong without a fixed-distance hitbox test.

Same numbers do not mean same move. Sometimes identical frame data is the sign that you need a different kind of evidence.

## 8. Charged air Heavy is 1500 damage, but that is not a free upgrade

800 becomes 1500. That sounds easy.

But Jumping HP moves from 10F startup to 28F when charged. Jumping HK goes from 10F to 29F. つまりdamage rises while the attack comes out 18F or 19F later.

That changes the timing of the whole jump. Against a prepared anti-air, waiting longer can be dangerous. On the other hand, it does create a genuinely different attack timing.

So charged Heavy should not be filed as “better Heavy.” It is a different timing tool with a larger reward, and it needs situation-specific testing before becoming a default.

In air attacks, “when” is part of damage.

## 9. Caelum Arc shows that the decision begins before the button press

Marisa also has Caelum Arc, a unique attack available from neutral jump. In Modern, it is down + Heavy during a neutral jump.

The normal version starts in 9F, stays active 9–17F, deals 800, causes slam knockdown on airborne hit, and has a cross-up property. The charged version starts in 28F and deals 1500.

This matters because forward jump and neutral jump do not even lead to the same menu of actions. 「飛んでからbuttonを選ぶ」だけではなく、jump direction already shapes the decision tree.

Good air-attack selection starts before Marisa leaves the ground.

## 10. Re-research compresses six buttons into six questions

Memorizing every number is not the goal. 試合中にretrieveできる形へcompressする。

- Need the fastest air button? → Jumping LP, 4F.
- Want air-to-air that can become knockdown? → Jumping MP into Volare Combo.
- Want a cross-up option at close range? → Assist + Light, Jumping LK.
- Want to test a longer active window? → Assist + Medium, Jumping MK.
- Want high raw jump-in damage? → HP or Assist + Heavy HK; compare geometry before choosing a default.
- Want to delay the attack timing? → Charged Heavy, as a niche option rather than a universal upgrade.
- Using neutral jump and need its unique branch? → Caelum Arc.

Now the move list becomes a decision system instead of a memory test.

> Match prompt: **“What problem is this jump solving――speed, air-to-air, cross-up, active window, damage, or neutral-jump control?”**

## 11. The lab test only needs four comparisons

Data narrows the candidates, but hitbox geometry still needs the game itself.

Test 1: air-to-air. Record one opponent forward jump at fixed distance and compare Jumping LP vs MP, ten times each. 見るのはhit rateだけでなく、hit後のlanding position.

Test 2: close forward jump. Compare LK and MK from the same start point. Record front hit, cross-up hit, whiff.

Test 3: frontal jump-in. Compare HP and HK from three fixed distances, ten attempts each. Record hit, block, whiff, or anti-aired.

Test 4: neutral jump. Compare waiting with a normal Heavy versus Caelum Arc when the dummy walks forward.

Fix start distance, jump direction, and button height. Change only the move. そうすればdifference has a cause.

The desktop research can verify inputs, startup, active frames, damage, and listed properties. The remaining geometry belongs to controlled in-game testing. That boundary is not a weakness; it tells us what to do next.

## 12. Understanding more air attacks can make you jump less

At first this looked like an article about adding options.

After sorting the moves, the opposite becomes visible. LP is for speed. LK changes side. MP converts air-to-air into knockdown. MK gives a longer active-window hypothesis. Heavy normals ask for geometry and damage. Caelum Arc belongs to a neutral-jump branch.

The more specific each use becomes, the harder it is to justify “random forward jump, then Heavy.”

Before the research, the question was: “Which jump attack is strongest for Modern Marisa?” 調べた後のquestionは違う。

**Why did I jump, and which air button solves that reason?**

The point was never to press more buttons in the air. It was to give every jump a job.

## References

- [STREET FIGHTER 6 Official Web Manual: Basic Fighting Ground Controls](https://game.capcom.com/manual/SF6/en/ps5/page/2/3)
- [CAPCOM: Marisa Frame Data](https://www.streetfighter.com/6/ja-jp/character/marisa/frame)
- [SF6 Lab: Marisa Frame Data](https://sf6-lab.net/fighters/marisa/frame)
- [Kamigame: Modern Marisa Normal Attacks](https://kamigame.jp/streetfighter6/page/339853809486417490.html)
- [StrategyWiki: Street Fighter 6 / Marisa](https://strategywiki.org/wiki/Street_Fighter_6/Marisa)
- [Street Fighter Wiki: Volare Combo](https://streetfighter.fandom.com/wiki/Volare_Combo)
- [Modern Marisa practical guide](https://sorehododemonai-gamer-a.hatenablog.com/entry/2024/09/04/054638)
- Related: [“Master fundamentals are not more moves, but more answers that work without a read”](https://silovar-uk.github.io/myessays/#/essay/sf6-modern-marisa-master-foundations-training?lang=ja)
