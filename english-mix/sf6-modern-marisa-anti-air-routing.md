---
id: sf6-modern-marisa-anti-air-routing
title: "モダンマリーザの対空は、最強の一手を決めるほど崩れる"
subtitle: "Anti-air is routing――しゃがみ強P・Gladius・air-to-air・Dimachaerus・SA2をdistanceとtimingで分業する"
created: "2026-09-27"
updated: "2026-09-27"
type: "実践リサーチ"
status: "完成"
tags: ["Street Fighter 6", "SF6", "Modern Marisa", "Marisa", "anti-air", "practice design"]
keywords: ["Modern Marisa", "anti-air", "Half Heart", "Gladius", "Dimachaerus", "air-to-air", "SA2", "Street Fighter 6"]
grow: 5
abstract: "Modern Marisa anti-air is not a one-button problem. 2026年8月3日のYear4 adjustmentでDimachaerusがsimple-special slotから外れた今、front jump、cross-up、neutral jump、early readではbest answerが違う。Current frame dataとYear4 guidesを照合し、Half Heart、one-button Gladius、air-to-air、light/OD Dimachaerus、SA2を『where and when you noticed the jump』でrouteする。"
---

# モダンマリーザの対空は、最強の一手を決めるほど崩れる
## Anti-air is routing――しゃがみ強P・Gladius・air-to-air・Dimachaerus・SA2をdistanceとtimingで分業する

The character who looks most likely to solve everything with raw strength has a strangely divided anti-air system. 一番、腕力で解決しそうなマリーザが、空だけは妙に分業制である。

When you research Marisa anti-air, the list keeps growing. しゃがみ強PのHalf Heart、Gladius、jump medium punch into Volare Combo、Dimachaerus、そしてSA2 Meteoritisまで出てくる。They can all touch an airborne opponent, but they are not doing the same job.

At first, I wanted one answer: “Which move should be my anti-air?” でもcurrent dataを並べるほど、そのquestion itself looked wrong. A front jump and a cross-up occupy different coordinates. 飛びを見た瞬間と、もう相手が頭上へ入った瞬間ではremaining timeも違う。An early read and a pure reaction are different problems.

> Marisa anti-air is not about choosing one best move. 「飛びを見た場所と時刻」から、correct deskへrouteする問題だった。

This article uses the game state as of 2026-09-27, after the 2026-08-03 Year4 adjustment. 現行frame data、Modern-specific guides、official Training Mode toolsを照合する。Move properties are facts; role assignment is interpretation; drills are proposals.

<figure>
  <img src="https://raw.githubusercontent.com/silovar-uk/myessays/main/assets/sf6/marisa-anti-air-routing.svg" alt="Five anti-air routes for Modern Marisa: front, read, cross-up, dedicated anti-air, and super-art finisher">
  <figcaption>Figure 1: Route anti-air by where and when you recognize the jump, not by a simple move ranking.</figcaption>
</figure>

## 1. The August 2026 change made “one-button Dimachaerus anti-air” old information

First, remove one piece of old knowledge. 2026年8月3日のadjustmentでModern simple-special mappingが変わった。Back+Special moved from Dimachaerus to medium Phalanx, Down+Special moved from Phalanx to Quadriga, and Dimachaerus became command-input only.

Neutral Special still gives light Gladius. Current Modern guides continue to describe Gladius as a pseudo one-button anti-air using armor. つまりcurrent Modern Marisa should not be built around “wait with one-button Dimachaerus.” It makes more sense to split the job among normals, Gladius, air-to-air, and command-input Dimachaerus.

This is more than a control-map detail. 対空のlearning orderそのものが変わる。If reaction anti-air can no longer be collapsed into one simple-input Dimachaerus, deciding “which jump belongs to which move” becomes more useful than adding moves without roles.

> Old-knowledge correction: current Modern Marisa does not have Dimachaerus as a simple-input panic anti-air. 使うならcommand input前提で考える。

## 2. For a normal front jump, use 9F crouching heavy punch as the baseline

Crouching heavy punch, Half Heart, is currently 9F startup, active on frames 9-13, 900 damage, and -6 on block. Year4 Modern guides also list it as a basic ground-to-air option with a strong upward hitbox. ヒット時はknockdownを取り、その後のoffenseへ移れる。

But “9F” does not mean “easy on reaction.” 技表の9Fはbutton pressからhitboxまでのstartupで、人間がjumpをrecognizeしてdecideする時間ではない。The usable reaction window changes with spacing, attack height, and what Marisa was already doing.

So treat Half Heart as a baseline, not a universal answer. 正面のforward jumpで、相手が自分の前上方へ入り、まだinputできる余裕がある。Make that the Half Heart job first, then route everything outside that condition elsewhere.

This also improves diagnosis. 対空失敗を“reaction was slow”で終わらせず、“front jump but late input”と“cross-up trajectory, wrong tool”を分けられる。

## 3. Charged Half Heart is not “better reaction anti-air”; it belongs to an earlier read

Holding Half Heart changes the move. Normal is 9F startup; charged becomes 21F startup, active 21-26, 1000 damage, and -3 on block. 単発damageは100上がり、active timeも少し伸びるが、attack starts 12F later.

Those numbers do not support a simple “charged is the stronger anti-air” rule. 少なくともsame reaction timingでは使えない。To make 21F startup work, you need to notice the jump much earlier or already suspect the jump and begin holding.

So even when charged Half Heart works, its nature is closer to predictive anti-air than reaction anti-air. Hitbox shape and matchup-specific trajectory cannot be proven from frame data alone, so this article does not generalize it as “better anti-air performance.”

That is the funny part. 同じcrouching heavy punchなのに、holdした瞬間、move changes time zones. Normal belongs closer to “see and answer”; charged belongs closer to “wait before it comes.” Timing classifies the move better than its name.

## 4. Gladius is closer to an armor anti-air after an early suspicion than a pure reaction anti-air

Modern neutral Special gives light Gladius, currently 17F startup. It has upper-body armor from frames 5-10; the held version starts at 30F but keeps armor much longer. 現行Modern guideがpseudo one-button anti-airと呼ぶ理由は、invincibilityで抜けるのではなく、jump attackをarmorで受けて返すrouteがあるからだ。

That is very different from Half Heart. Half Heart tries to meet the opponent with a hitbox. Gladius can work when you read not only “they jumped,” but also “they will attack on the way down.” Simple input makes execution easy, but easy input does not mean universal coverage.

Empty jump, cross-up, or trajectories that do not cooperate with the armor can beat the idea. 実際、current anti-Marisa guides mention empty jump and cross-up as ways to challenge Modern Gladius anti-air.

If Gladius becomes the only anti-air, the opponent gets an escape route called “jump and do nothing.” Its value is not that it replaces Half Heart. **飛び込み攻撃まで読めたとき、相手のattack itself can become the thing you armor through.**

## 5. Against cross-ups and neutral jumps, stop insisting on the ground and meet them in the air

Two classic problems for Marisa ground anti-air are the cross-up over her head and the neutral jump at a little distance. Current anti-Marisa guides still describe crouching heavy punch plus air-to-air as core answers, while cross-ups can disperse the anti-air focus. Gladius also keeps the same cross-up weakness.

So do not force every jump into a ground answer. Jump medium punch, Volare Fist, is 7F startup and 700 damage, and causes knockdown on air hit. Pressing medium again leads into Volare Combo. 現行Modern guideではair-to-airから1500 damageを取るhigh-return optionとして紹介されている。

If the air scramble starts even later, 4F jump light punch also has a role. 中Pよりreturnは低いが、“both characters are already airborne and I need a hitbox now”ではspeed itself matters.

The mental shift is useful: do not label a cross-up only as “a jump my ground anti-air failed to stop.” 「地上で取らず、air-to-airへrouteするjump」と分類する。Then Half Heart does not need to solve a job it was never good at.

## 6. Dimachaerus is a dedicated anti-air, but current Modern requires an early command input

Dimachaerus still exists in Modern, but since August 2026 it requires command input. Light starts in 12F and is invincible to airborne strikes and air projectiles on frames 5-15. ガードされると-16Fなので、wrong read on the ground is expensive.

Overdrive Dimachaerus starts in 16F and has the same type of invincibility on frames 5-19. It is four frames slower than light, but the invincibility window is longer; it also has armor-break properties and can lead to follow-up damage. つまり2 Drive barsで“faster anti-air”を買う技ではない。

That reversal matters. Light is for getting the attack out sooner; OD is a candidate when you value a longer protected window and stronger conversion. Both begin that anti-air invincibility on frame 5, so they make more sense when the jump is recognized early rather than as a very late panic button.

Dimachaerus does not have to be the first fundamental anti-air. ただ、clear trajectoryやearly readで、“meet the hitbox”より“pass through airborne strike with invincibility”を選べる。That is a job Half Heart and Gladius do not perform in the same way.

## 7. SA2 is not “the final best anti-air”; it is a high-price trump card on both success and failure

SA2 Meteoritis starts in 9F, has full invincibility on frames 1-16, and has 3000 base damage in the move data. As an anti-air tool, its invincibility can bypass an incoming attack more directly than a normal hitbox. モダン操作ではSuper Art input itself can also be simplified, but simple-input damage scaling means 3000 is not the literal damage of the one-button version.

But it costs two Super Art bars. If blocked, it is -44. だから“困ったら毎回これ”ではなく、opponent health, your meter, and confidence in the jump have to justify it.

If anti-air will kill, or if buying reliability is worth more than keeping the meter, 9F plus full invincibility becomes meaningful. 逆にearly roundで毎回2 barsを使えば、later round design becomes narrower.

A trump card belongs last not because it is automatically strongest, but because **both the success price and the failure price are large**. Once meter state enters the anti-air decision, the choice finally connects to the whole round.

## 8. Route anti-air first by “when I noticed,” then by “where they are”

Compressing everything into one decision, timing is easier than memorizing a move list. If you suspected the jump very early, you can prepare Gladius or Dimachaerus. 普通のfront jumpを見て入力できるならHalf Heart. If the opponent is already above or behind your head, stop forcing a ground answer and switch to air-to-air.

Then check position. 正面ならcrouching heavy punch、midrangeでjump attackまで早読みしたならGladius、cross-up or neutral jumpならjump medium punch、early certainty plus dedicated anti-airならlight/OD Dimachaerus、meterを払って取り切るならSA2、というdivisionになる。

- **Front / normal reaction**: crouching heavy punch, Half Heart.
- **Midrange / early read of jump-in attack**: simple-input light Gladius.
- **Above the head / cross-up / neutral jump**: jump medium punch → Volare Combo; jump light punch for a late air scramble.
- **Early-read dedicated anti-air**: light Dimachaerus; OD when the longer protected window and conversion are worth the Drive.
- **Kill / high confidence / meter available**: SA2 Meteoritis.

This is not a chart for every special trajectory in the game. キャミィのCannon Strikeやジェイミーの無影蹴のようにnormal jumpとtrajectory/timingが違えば、separate testing is needed. Build the ordinary routes first, then add exceptions.

> One-line match prompt: **Before asking “where did they jump from?”, ask “when did I notice the jump?”**

## 9. The Year4 standing-MP change adds a little insurance after you already touch them airborne

The 2026-08-03 adjustment also changed standing medium punch on air hit so the following target combo connects more reliably. これはdedicated anti-airの追加ではないが、standing MPがairborne opponentへ触れた後を拾いやすくしたchangeである。

The safe reading is not “standing MP is now the new main anti-air.” It is closer to “an awkward air-hit contact is less likely to be wasted.” 通常のforward jumpへ毎回standing MPを振る根拠までは、patch noteだけから導けない。

Anti-air research tempts us to put every move that can hit an airborne opponent into the anti-air list. でも“can hit airborne”と“reliably beats jump-in”は別である。Keeping that distinction prevents the move list from becoming uselessly large.

The current anti-air map is easier when we add support lines instead of adding more protagonists. 立ち中Pのchangeは、そのsupport lineとして覚えるくらいがちょうどよい。

## 10. In training, count wrong routing, not only how many jumps you knocked down

If you anti-air the same forward jump 100 times, the input improves. But real matches ask a different question: the opponent may jump, walk, Drive Impact, or do nothing. SF6 official Training Mode can record up to eight opponent actions and replay selected slots repeatedly.

Start with only four recordings: front jump attack, close cross-up jump, neutral jump, and a grounded walk-in or poke. 最初はone by oneでexecutionを作り、then mix all four. Fix the first routing rule: front → Half Heart, cross-up/neutral → air-to-air, ground action → do nothing.

Then add Gladius and Dimachaerus. But do not randomly choose a favorite anti-air whenever a jump appears. Gladius is only for repetitions where you recognized the jump-in attack early; Dimachaerus only for repetitions recognized early enough to prepare the command. SA2 comes last, after setting a health-and-meter condition where the kill matters.

Do not record only hit rate. 分けるのは“right move but too late,” “Half Heart chosen against cross-up,” “anti-air whiffed into a ground action,” and “saw jump but selected nothing.” Once every miss stops being called “reaction,” the next drill becomes much more specific.

## 11. Marisa's weakness is not simply “anti-air”; the weakness grows when one move is asked to cover the whole sky

Before this research, the simple story was: Marisa has weak anti-air, so learn one reliable move. 確かにcross-upは難しく、Half Heartはuniversalではなく、昇龍拳のようなfast invincible anti-airをsimple inputで常備するcharacterでもない。

But current tools are not scarce. There is 9F Half Heart, armor-based Gladius, 7F jump medium punch, Dimachaerus with airborne-strike invincibility, and fully invincible SA2. それぞれがdifferent time windowとcoordinateを担当している。

The real problem is that “anti-air” as one word creates too many candidates. だから先にdivision of laborを作る。Front is Half Heart. Above the head is air-to-air. If the jump-in attack itself was read, Gladius. If there is time for the command and you want dedicated anti-air, Dimachaerus. If spending meter is worth it, SA2. Exceptions come later.

Maybe there is no need to crown one best anti-air. 必要なのは、**相手が空へ出た瞬間に“whose job is this?”が決まっていること**。Marisa's fists are huge, but her sky defense is not monolithic. After researching it, that awkwardness looks less like a defect and more like a lesson in thinking with distance and time.

## 参考資料

- [CAPCOM: Battle Change List, Marisa, 2026-08-03](https://www.streetfighter.com/6/buckler/ja-jp/battle_change/20260803/marisa)
- [SF6 Official Web Manual: Training Mode Record Settings Tips](https://game.capcom.com/manual/SF6/ja/switch2/page/8/6)
- [SF6 Lab: Marisa frame data](https://sf6-lab.net/fighters/marisa/frame)
- [それスコれる？: Modern Marisa Year4 guide](https://www.sukoreru.com/sf6-modern-marisa)
- [さーな: vs Marisa matchup notes, Season 4](https://note.com/emesirna/n/nb24053cdc1b1)
- [ヒヨワカ: SF6 2026-08-03 update summary](https://hiyoko-lab.com/streetfighter6_hiyoko/sf6_2026-08-03-update_01/)
- Related: [「モダンマリーザの空中攻撃は、『強を押す』だけの話ではなかった」](https://silovar-uk.github.io/myessays/#/essay/sf6-modern-marisa-air-attacks-six-toolbox?lang=ja)
- Related: [「マスターへの基礎力は、技を増やすより『読めなくても返せる』を増やす」](https://silovar-uk.github.io/myessays/#/essay/sf6-modern-marisa-master-foundations-training?lang=ja)
