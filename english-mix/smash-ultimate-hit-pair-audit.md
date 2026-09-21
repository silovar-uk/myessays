---
id: smash-ultimate-hit-pair-audit
title: "スマブラの被弾は「相手の技」ではなく「自分の技とのペア」で見る"
subtitle: "Track what you were doing when the hit happened"
created: "2026-09-21"
updated: "2026-09-21"
type: "Essay"
status: "完成"
tags: ["スマブラSP", "対戦ゲーム", "リプレイ分析", "技相性", "フレーム", "ニュートラル", "被弾"]
keywords: ["Super Smash Bros. Ultimate", "replay analysis", "move interaction", "hitbox", "hurtbox", "priority", "whiff punish", "frame data"]
grow: 5
abstract: "“I got hit by F-smash three times” sounds like useful replay analysis, but it still does not tell you what to change. The missing half is your own action. Did the F-smash catch your Fair startup, your Dash Attack endlag, your landing, or your grab attempt? This essay treats every meaningful hit as a pair: your action × their move. By classifying startup losses, range/disjoint losses, lingering hitboxes, whiff punishes, shield punishes and landing catches, matchup knowledge becomes a small set of repeatable collisions instead of an impossible encyclopedia."
---

# スマブラの被弾は「相手の技」ではなく「自分の技とのペア」で見る
## Track what you were doing when the hit happened

<!-- level:4 role:claim -->
You rewatch a loss and notice: “I got hit by their F-smash three times.”
<!-- level:2 role:description -->
That is technically analysis. Better than “I somehow lost.”
<!-- level:1 role:evidence -->
But tomorrow, the note only tells you: be careful of F-smash.
<!-- level:3 role:analysis -->
The missing half is on screen at the exact same moment: **your own action.**
<!-- level:2 role:description -->
Were you landing from Fair? Whiffing Dash Attack? Starting a grab? Walking forward with no hitbox at all?
<!-- level:4 role:analysis -->
Same F-smash. Different cause. Different fix.
<!-- level:5 role:implication -->
In Smash, a meaningful hit is better recorded as a **pair: what you did × what they did.**

「車にぶつかった。」

True.

Not enough for an accident report.

スマブラも同じである。

---

## 1. “That move beats me” is an observation, not yet a diagnosis

<!-- level:4 role:claim -->
相手の強技に名前を付けると、対策が始まった気になる。
<!-- level:2 role:description -->
“Cloud Bair is hard.” “Game & Watch Up B is stupid.” “Sword hitboxes are huge.”
<!-- level:1 role:evidence -->
SmashWiki defines a punish as attacking vulnerability created by startup, endlag, a whiff, or a move being blocked on shield.
<!-- level:3 role:analysis -->
So the same opposing move can hit for completely different reasons depending on whether you were in startup, recovery, landing lag or shield pressure.
<!-- level:4 role:analysis -->
“Their move is strong” names the symptom.
<!-- level:5 role:implication -->
A useful countermeasure must eventually come back to **what your action exposed.**

[SmashWiki — Punish](https://www.ssbwiki.com/Punishment)

負けたあと、相手技の強さを説明する能力だけ妙に伸びる日がある。

We are becoming commentators.

Unfortunately, we wanted to become better players.

---

## 2. “Strong priority” is often five different ideas wearing one coat

<!-- level:4 role:claim -->
Smash vocabulary makes this worse because “判定が強い” often mixes several mechanics.
<!-- level:1 role:evidence -->
SmashWiki separates the attack's hitbox from the defender's hurtbox. A disjointed hitbox extends away from the attacker's vulnerable body, which can make a sword or weapon attack safer in direct contests.
<!-- level:2 role:description -->
Sword reaches you. Your fist reaches sword. Your fist does not necessarily reach the person.
<!-- level:1 role:evidence -->
Meanwhile, SmashWiki's Priority page is specifically about how attack hitboxes interact and clank. Normal aerials usually do not clank with ground normals or other aerials, so what players call “priority” in a match may actually be reach, startup, hurtbox shifting, active duration or disjoint.
<!-- level:3 role:analysis -->
A move can “win” without literally winning a priority calculation.
<!-- level:5 role:implication -->
Break “strong hitbox” into **why the collision favored it**, and matchup knowledge becomes actionable.

[SmashWiki — Hitbox](https://www.ssbwiki.com/Hitbox)  
[SmashWiki — Priority](https://www.ssbwiki.com/Priority)

「判定」は便利。

Too convenient.

It becomes the kitchen drawer where batteries, scissors and one mysterious key all live together.

---

## 3. Move matchups are conditional sentences, not A > B

<!-- level:4 role:claim -->
「この技にはこの技」で覚えるのは速い。でも正確ではない。
<!-- level:1 role:evidence -->
SmashWiki's Lag page separates startup, active frames and ending lag, with landing lag added for many aerial situations.
<!-- level:2 role:description -->
Move A can lose before its hitbox appears, win while active, then lose badly after it whiffs.
<!-- level:3 role:analysis -->
Distance also changes the answer. Tip range may be safe. Point blank may be punishable. A later active frame can alter shield advantage.
<!-- level:4 role:analysis -->
So “A beats B” is usually missing the useful part of the sentence.
<!-- level:5 role:implication -->
A better form is: **at this distance, during this phase, in this state, A beats B.**

[SmashWiki — Lag](https://www.ssbwiki.com/Lag)  
[Ultimate Frame Data — Frame Data Notes](https://ultimateframedata.com/smash)

That sounds like more homework.

It is.

But you do not need the whole textbook.

Study only the conditions that keep happening in your own matches.

---

## 4. Ask which phase of your move got hit

<!-- level:4 role:claim -->
「自分が何をしていたか」を見るなら、さらに一段だけ細かくする。
<!-- level:1 role:evidence -->
Smash runs at 60 frames per second. Before a move becomes active there is startup; after the hitbox ends there is ending lag; landing during many aerial actions creates landing lag.
<!-- level:2 role:description -->
“I got hit by Bair while using Fair” can mean at least three different things: Bair interrupted Fair startup, outranged Fair, or punished Fair landing.
<!-- level:3 role:analysis -->
Those are not the same problem.
<!-- level:4 role:analysis -->
Startup loss asks for timing or a faster option. Range loss asks for spacing. Landing punish asks for height, drift or a different landing route.
<!-- level:5 role:implication -->
The hit screen is not only showing the opponent's strength. It is showing **which part of your move is vulnerable.**

[SmashWiki — Lag](https://www.ssbwiki.com/Lag)  
[SmashWiki — Frame](https://www.ssbwiki.com/Frame)

“Reaction time” is a wonderful suspect.

Hard to arrest.

“Fair landing lag got punished three times” is much easier to put in handcuffs.

---

## 5. Six useful loss types

These are not official categories. They are a proposed replay-analysis vocabulary.

### 1. Startup loss

Your move has begun. Its hitbox has not.

Opponent hits first.

Fix may be timing, distance, or choosing a faster check.

### 2. Range / disjoint loss

Your attack does not reach.

Your hurtbox does.

This is often a **position problem**, not a speed problem.

### 3. Active-duration loss

You enter after thinking the opponent's move is over.

The late active frames are still there.

Wait slightly longer, enter from another angle, or make it whiff somewhere else.

### 4. Whiff punish

You throw a move.

Nothing connects.

The opponent attacks your ending lag.

[SmashWiki — Punish](https://www.ssbwiki.com/Punishment)

### 5. Shield punish

You hit shield.

The opponent uses Up B, Up Smash, aerial or grab.

Ultimate Frame Data notes that Up B and Up Smash bypass normal shield-drop frames, while aerials add the three-frame jump startup.

[Ultimate Frame Data — Frame Data Notes](https://ultimateframedata.com/smash)

### 6. Landing / action-end catch

You aerial, air dodge or recover.

The opponent attacks the place or time where your action must end.

Now “their Bair is killing me” can become:

**“My high Fair whiff keeps landing into their Bair.”**

That sentence can create a drill.

---

## 6. Count repeated pairs, not only big damage

<!-- level:4 role:claim -->
Big attacks are memorable. Repeated small structural losses are easier to ignore.
<!-- level:2 role:description -->
One 22% punish looks dramatic. Four smaller hits into your same Dash Attack recovery look ordinary.
<!-- level:3 role:analysis -->
But if the same your-move × their-move pair appears four times, your own decisions are repeatedly creating the same vulnerability.
<!-- level:5 role:implication -->
For improvement, **frequency of the same collision can matter more than the damage of one collision.**

実況は「今ので22%！」と言う。

Nobody shouts, “That is the fourth recurrence of the same interaction pair!”

Your notebook should.

---

## 7. The 10-hit pair audit

Pick one losing replay.

Take the first ten meaningful entries into disadvantage — not every hit inside a guaranteed combo, but the hit where your decision opened the door.

Record:

- **Your action** — Fair, Dash Attack, grab, jump, shield release
- **Their move**
- **Your phase** — startup / active / whiff recovery / landing / after shield / movement
- **Distance** — point blank / close / tip / far
- **Loss type** — startup / range / active duration / whiff / shield / landing
- **Next hypothesis** — change move / change distance / wait / do nothing

Do not force the answer yet.

Just collect the collisions.

After ten, your own move names may repeat more than the opponent's.

You thought you were studying their F-smash.

Instead you discover:

**“Why am I pressing Dash Attack every time I get hit?”**

Congratulations.

The enemy's matchup guide has become your internal audit.

---

## 8. Reverse the matchup question

<!-- level:4 role:claim -->
Normal matchup study starts from the opponent.
<!-- level:2 role:description -->
“What beats their Fair?” “How do I get through this projectile?”
<!-- level:3 role:analysis -->
Necessary questions. But your own replay gives you a cheaper path.
<!-- level:1 role:evidence -->
If your ten-hit audit shows four Fair entries, three Dash Attack entries, two grab entries and one miscellaneous hit, improving Fair and Dash Attack usage potentially addresses most of the sample.
<!-- level:4 role:analysis -->
You do not need every interaction in the matchup.
<!-- level:5 role:implication -->
Start from **which of your own actions most often becomes the doorway to damage.**

全キャラの全技相性を覚えるのは無理。

People have jobs.

But learning what beats your ten most-used actions?

That is a project.

---

## 9. Frame data is forensic evidence, not the final answer

<!-- level:4 role:claim -->
フレーム表は、問題が見えたあとに開く。
<!-- level:1 role:evidence -->
Ultimate Frame Data provides startup, active frames, total frames, landing lag and shield data, while warning that shield advantage can vary with later active hits and stale moves.
<!-- level:2 role:description -->
If your replay says “my landing aerial keeps eating Up B out of shield,” now you check your shield disadvantage and their OOS startup.
<!-- level:3 role:analysis -->
That can separate “I reacted slowly” from “this was actually guaranteed,” “tip range would have escaped,” or “late hit changes the timing.”
<!-- level:4 role:analysis -->
Numbers do not choose the move for you.
<!-- level:5 role:implication -->
They are excellent at eliminating **wrong explanations**.

[Ultimate Frame Data](https://ultimateframedata.com/smash)

Do not study the entire crime lab before a crime happens.

Have the match.

Find the incident.

Request the evidence.

---

## 10. Break one move matchup with a six-step A/B test

When someone says “use X against Y,” test the conditions.

1. Clash / interact at point blank.
2. Move half a step away.
3. Delay only your timing.
4. Make their move whiff, then use yours.
5. Put your move on shield and test the punish.
6. For aerials, change only landing position.

Now “my move loses to Bair” may become:

- loses during startup
- does not lose at tip range
- can whiff-punish after Bair is committed
- is unsafe if landed too close on shield
- becomes safer with different landing geometry

That is much more useful than a matchup arrow.

It is also slightly obsessive.

Good.

One obsessive ten-minute experiment is cheaper than losing the same interaction for three months.

---

## 11. Duck Hunt makes the pair idea obvious

<!-- level:4 role:claim -->
Characters with multiple moving parts expose this method especially well.
<!-- level:2 role:description -->
Suppose Duck Hunt keeps getting hit by the same opposing Fair.
<!-- level:3 role:analysis -->
“Fair is strong” is not enough. The pair audit may show three hits during Clay Pigeon startup, two while the player freezes watching Can, and two after landing Fair.
<!-- level:4 role:analysis -->
Now the question is not “how do I beat Fair?” It is **where does my projectile workflow create a free approach window?**
<!-- level:5 role:implication -->
For a setup character, move matchup study becomes workflow design: **which tool creates which vulnerable time window?**

Previously, Can looked like a second cursor.

This makes the next step clearer.

If the body gets hit whenever your attention moves to the Can, the problem is not Can.

The problem is the empty time you leave beside it.

スマブラなのに業務フロー改善になってきた。

Fine.

Workflows matter.

---

## 12. Ban your most-hit move for three games

This is deliberately crude.

Find the move that appears most often on **your side** of the loss pairs.

For three games, cut its use dramatically or ban it.

The goal is not to prove the move is bad.

The goal is to discover:

- what job the move was actually doing
- where you genuinely need it
- where you were pressing it by habit
- which alternatives cover the same job with less risk

If banning Dash Attack makes approach impossible, that tells you something.

If walk, dash shield, grab and aerials replace it surprisingly well, that tells you something else.

**You are writing a job description for the move.**

---

## 13. Turn replays into a personal interaction database

<!-- level:4 role:claim -->
リプレイを見る目的も変わる。
<!-- level:1 role:evidence -->
Nintendo currently lists Ver.13.0.5, released September 1, 2026, as the latest version. Its change is an online-data behavior fix; Nintendo's update history last explicitly lists game-balance adjustments at Ver.13.0.1. Nintendo also warns that older replay data may become incompatible and recommends converting replays you want to preserve into video before updating.
<!-- level:3 role:analysis -->
That means your old match footage is not merely memory. It can be a stable archive of recurring interactions — but only if you preserve it.
<!-- level:5 role:implication -->
Treat replay video as the raw material for a **personal move-interaction database.**

[Nintendo Support — How to Update Super Smash Bros. Ultimate](https://en-americas-support.nintendo.com/app/answers/detail/a_id/42809/)

The cool KO clip is worth saving.

The match where you landed the same unsafe Fair four times is also worth saving.

The second one will get fewer likes.

It may win you more games.

---

## 14. I thought this was about learning the opponent's moves

<!-- level:4 role:claim -->
At first this looked like a move-counter chart article.
<!-- level:3 role:analysis -->
Learn what beats Fair. What beats F-tilt. What beats projectiles. Build the rock-paper-scissors tree.
<!-- level:2 role:description -->
Then hitboxes, hurtboxes, clanks, startup, active frames, endlag, landing lag and shield punish all made the simple arrows look suspicious.
<!-- level:1 role:evidence -->
The same opposing move can hit you during completely different phases of your own actions. A startup interrupt and a whiff punish can demand opposite fixes.
<!-- level:3 role:analysis -->
So the smallest useful unit is not their move.
<!-- level:4 role:analysis -->
It is not even your move.
<!-- level:5 role:implication -->
It is **your action × their action × the state of the collision.**

Next time you eat F-smash, resist the first sentence:

“Again?”

Ask one more.

**What was I offering to that F-smash?**

Startup?

Whiff recovery?

Landing?

A repeated answer is a pattern.

And a pattern is much easier to practice than “be careful.”

---

## Practical: 10-hit pair audit

Use one loss.

- collect ten meaningful hits that start disadvantage
- record both their move and your action
- classify your phase: startup / active / whiff / landing / after shield
- circle any repeated pair
- identify the most common action on your side
- reduce that action for the next three games
- test one replacement
- save the result as a condition, not a vague warning

Bad note:

**“Watch out for Bair.”**

Useful note:

**“When I whiff high Fair, their Bair catches my landing. Either hit tip range, delay landing, or do not swing there.”**

Now the note can enter the next match.

---

## Research Note

### Verified

- Hitboxes deal attacks; hurtboxes receive them.
- Disjointed hitboxes can threaten space away from the attacker's vulnerable body.
- SmashWiki's technical “priority” describes hitbox interaction / clank rules and is narrower than colloquial “strong priority.”
- Normal aerials generally do not clank with ground normals or other normal aerials.
- Moves contain startup, active and ending-lag phases; aerial situations can add landing lag.
- Ultimate Frame Data documents shield-drop and out-of-shield timing while noting important conditions around shield advantage.
- Nintendo lists Ver.13.0.5 as current on September 21, 2026; the latest update notes do not add balance changes, while Ver.13.0.1 is the last update explicitly marked with game-balance adjustments.

### Proposed in this essay

- record hits as your action × their move
- six-category loss taxonomy
- repeated-pair frequency as a review metric
- 10-hit pair audit
- six-step move-interaction A/B test
- three-game temporary ban of the most frequently punished move

These are analysis frameworks, not official Nintendo or community-standard training systems.

---

## Sources

- [Nintendo Support — How to Update Super Smash Bros. Ultimate](https://en-americas-support.nintendo.com/app/answers/detail/a_id/42809/)
- [SmashWiki — Hitbox](https://www.ssbwiki.com/Hitbox)
- [SmashWiki — Priority](https://www.ssbwiki.com/Priority)
- [SmashWiki — Punish](https://www.ssbwiki.com/Punishment)
- [SmashWiki — Lag](https://www.ssbwiki.com/Lag)
- [SmashWiki — Frame](https://www.ssbwiki.com/Frame)
- [Ultimate Frame Data — Frame Data Notes](https://ultimateframedata.com/smash)
- [Game8 — Guide for Beginners: Analyze Replays / Punish Game](https://game8.co/games/Super-Smash-Bros-Ultimate/archives/280899)
