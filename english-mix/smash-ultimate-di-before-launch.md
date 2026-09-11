---
id: smash-ultimate-di-before-launch
title: "By the Time You Start Flying, DI Is Already Over――スマブラSPのベク変を1週間で身体に入れる"
subtitle: "Survival DI, combo DI, SDIを分けて、ダックハントの防御判断を3つまで減らす"
abstract: "DI is not steering after launch. スマブラSPではヒットストップ最終フレームのstick inputがlaunch trajectoryを決め、SDIは別のmechanic、さらにLSIがlaunch speedへ作用する。『逆へ倒す』『上へ倒す』『コンボ中は外』というfolk rulesを一度分解し、Duck HuntのWeight 86とrecoveryまで含めて、low % = escape the next hit / high % = escape the blast zone / multihit = move your position、という3つの判断へ再構成する。最後に7-day practice planを付ける。"
---

# By the Time You Start Flying, DI Is Already Over
## Survival DI, combo DI, SDIを分けて、ダックハントの防御判断を3つまで減らす

You get hit hard.

画面の端へ飛ばされる。

Then you move the stick and think, “こっちへ飛びたい。”

There is one slightly unpleasant fact.

**By the time your character visibly starts flying, the important DI decision has already been read.**

In Super Smash Bros. Ultimate, Directional Influence uses the control-stick position on the final frame of hitlag before launch.

つまりDIは、飛んでからtrajectoryを操縦する技術ではない。

It is closer to filing a tiny flight plan **before launch**.

That changes the question.

「どっちへ倒せばいい？」ではなく、

**What problem am I trying to solve before I leave hitlag?**

今回はそこまで落とし込む。

Character: Duck Hunt.

Goal: not “understand DI.”

**Survive one more stock because you actually used it.**

---

## 1. Put DI, SDI and LSI into different boxes

The terminology gets messy because one stick can interact with several defensive mechanics.

まず3つに分ける。

### DI――change the launch trajectory

Directional Influence changes the angle of your knockback trajectory within a limited range.

Ultimate inherits the late-Smash 4 DI system, with a maximum trajectory change of roughly **9.74°**.

Nine-point-seven-four degrees sounds tiny.

撃墜ラインぎりぎりでは、そのtiny angleが1 stockになる。

DI is read on the last frame of hitlag, and Ultimate briefly shows a blue streak along the final launch angle when DI is applied.

That blue streak is useful feedback in Training Mode.

### SDI――change your position during hitlag

Smash Directional Influence is not “stronger DI.”

別物である。

DI changes where the launch arrow points.

**SDI moves the place where the arrow starts.**

During hitlag, SDI shifts the character's position slightly, which can help escape multihit hitboxes or certain sequences.

Ultimate also places a 4-frame interval between registered SDI inputs.

So:

```text
DI  = change launch trajectory
SDI = change position before launch
```

この区別だけでも、練習の質がかなり変わる。

### LSI――the same stick can also change launch speed

Now it gets annoying.

Launch Speed Influence uses the same final-hitlag stick input.

Holding upward can raise launch speed up to about **1.095×**.

Holding downward can reduce it to about **0.92×**.

However, LSI is disabled for near-vertical final launch angles between 65°–115° and 245°–295°.

つまり、you may think you are only changing the angle, while the game may also be changing your launch speed.

One stick. Two jobs.

That is why one universal survival direction becomes unreliable.

---

## 2. “Hold opposite the knockback” sounds right, but DI is not a brake

A very natural rule is:

> If I fly right, hold left.

Physics brain approves.

But DI does not apply reverse thrust.

It changes the **angle** of the trajectory.

The strongest angle change generally comes from an input roughly perpendicular to the original knockback direction, while an input parallel or anti-parallel to that vector contributes little to trajectory bending.

だから「逆へ倒す」だけでは、何を変えているのか説明できない。

A better mental model is not resistance.

It is **trajectory design**.

---

## 3. “Survival DI means hold up” is only half a rule

Another common idea:

> When launched horizontally, DI upward toward the corner of the screen.

This can absolutely make sense.

A diagonal path may increase the effective distance to a side blast zone.

But Ultimate has LSI.

If the launch is eligible for LSI, adding a strong upward component can increase launch speed.

So two goals can conflict:

- bend the trajectory into a safer angle
- avoid increasing launch speed

しかもstage positionでも正解が変わる。

Are you near the right ledge?

Near the top blast zone?

Can Duck Hunt still recover from the endpoint?

The useful thing to remember is therefore not “up.”

Remember the objective:

**Create a trajectory that gives you more room from the nearest relevant blast zone.**

方向は、その目的から逆算する。

---

## 4. For Duck Hunt, “I lived” needs a second condition

Ultimate Frame Data lists Duck Hunt at **Weight 86**.

SmashWiki also describes the duo as lightweight, with endurance limited by both low weight and an exploitable recovery.

Duck Jump covers respectable horizontal and vertical distance, but it is not especially fast and does not protect the ascent with a hitbox. In Ultimate, Duck Hunt can act after 50 frames, which helps, but the recovery can still be challenged.

So imagine this:

You DI a kill move beautifully.

画面内には残った。

Two seconds later, you get edgeguarded and die anyway.

Mathematically, the DI may have worked.

In the match, the stock is still gone.

だからDuck Huntのsurvival DIは、次の2条件で採点したい。

> **Did I avoid the blast zone?**
>
> **Did I keep a realistic recovery route?**

Survival is not just “stay on screen.”

It is **stay alive and keep a route home**.

---

## 5. Combo DI solves a different problem: the next hit

At low and mid percentages, this hit may not kill you.

The dangerous thing is the follow-up.

So combo DI asks a different question:

**Where can I go so the next attack does not connect?**

This is why “DI away” is often a useful default.

Creating separation can force the attacker to travel farther or make the planned follow-up miss.

でも万能ではない。

Some routes expect outward DI.

Sometimes DI in creates an awkward turnaround.

Sometimes no DI is the annoying answer.

So do not build an encyclopedia before playing.

Use one default first:

> **At low/mid %, try to create space from the next hit.**

Then add exceptions only for setups that repeatedly beat you.

Default first. Exceptions after losses.

82 fighters exist.

こちらは犬と鳥を同時操作している時点で十分忙しい。

---

## 6. If you are stuck in a multihit, you may be solving the wrong problem

You get caught in a multihit.

You hold “away.”

Nothing changes.

「ベク変が下手なのか」と思う。

Maybe not.

If the problem is getting your hurtbox out of the next multihit hitbox during hitlag, **SDI** is the relevant mechanic.

The distinction becomes simple:

- one hit launches you → think DI
- still inside a multihit → think SDI

Not every multihit is equally escapable, and move-specific details matter.

Still, knowing **which mechanic you are trying to use** prevents a lot of useless practice.

---

## 7. Reduce the whole thing to three questions

After reading the technical details, one conclusion became obvious.

You should not calculate 9.74° and 1.095× during a match.

That would be impressive and completely impractical.

Instead, classify the situation.

### Low %――the next hit is the problem

**Create space from the follow-up.**

Start with a direction that separates you from the attacker, then learn move-specific exceptions later.

### High %――this hit is the problem

**Escape the relevant blast zone.**

For Duck Hunt, include the recovery route in the calculation.

### Multihit――your current position is the problem

**Use SDI to shift your position during hitlag.**

Short version:

```text
Low %     = get away from the next hit
High %    = get away from the blast zone
Multihit  = move your position
```

％は便宜的なshortcutで、本当の分類はこう。

```text
Next hit matters  → combo DI
This hit may kill → survival DI
Still in multihit → SDI
```

That is a much smaller decision tree.

---

## 8. One step too far: test three pieces of DI folk wisdom

Let us audit the three rules from the beginning.

### “Hold opposite the launch”

DI is not reverse thrust; it changes trajectory angle.

**Not a universal rule.**

### “Survival DI means up”

Sometimes useful for changing the path toward a corner, but LSI can increase launch speed and the endpoint may ruin your recovery.

**Context-dependent strategy.**

### “Combo DI means away”

Often a strong default because spacing matters, but some setups punish it.

**Useful default, not law.**

The interesting part is that none of these sayings is pure nonsense.

全部、特定のsituationでは正しい。

The problem is what happens after the situation gets removed and only the short phrase survives.

DI becomes confusing when we memorize **directions without remembering the problem those directions were solving**.

---

## 9. Seven days, fifteen minutes a day

The target is not perfect optimal DI.

The target is simpler:

**Reduce the number of important hits where you make no deliberate defensive choice at all.**

### Day 1――see DI happen

Open Training Mode and raise `P1 Damage %`.

Set CPU Behavior to `Side Smash`; the CPU repeatedly performs charged forward smashes.

Take the same hit with:

- no input
- direction A
- direction B

Ten reps each.

Do not score survival yet.

Watch the blue launch streak and the resulting trajectory.

今日の目的は、「入力すると結果が変わる」を目で理解すること。

### Day 2――horizontal survival DI

Adjust your damage so the repeated hit is near a KO threshold.

Compare several inputs.

Score only two things:

```text
Stayed inside blast zone?  Yes / No
Recovered to stage?        Yes / No
```

For Duck Hunt, success means **both**.

### Day 3――vertical and diagonal launch

If you have a second controller, set CPU Behavior to `Control` and repeat the same up smash, throw or other chosen launcher.

If not, use normal matches and make vertical/diagonal launches your only observation target.

The lesson is not “hold up.”

It is **the same rule does not fit every launch angle**.

### Day 4――combo DI: out, in, neutral

Pick a common low/mid-% starter you often get hit by.

Compare:

- DI out
- DI in
- no DI

Do not ask “which sent me farthest?”

Ask:

**Did the next hit miss?**

That becomes your first move-specific exception note.

### Day 5――SDI day

Choose a multihit situation.

If you can control the opponent with a second controller, repeat the same multihit and practice shifting position during hitlag.

今日はlaunch angleを考えない。

Your target is simply to move your character away from the next hitbox.

### Day 6――name the problem during real matches

Play normally.

Whenever you are hit, mentally label the situation:

“combo”

“kill”

“multihit”

Direction can be wrong.

The first goal is **correct problem classification**.

### Day 7――audit only the stocks you lost

Watch your replay and classify each death:

```text
□ No deliberate input
□ Survival DI decision was poor
□ Stayed on combo DI when the hit became lethal
□ SDI situation
□ Survived the hit but recovery route was bad
□ DI was not the main solution
```

Whichever category appears most often becomes next week's drill.

「ベク変を上手くする」という曖昧な課題が、具体的なpractice targetへ変わる。

---

## 10. Four lines before a match

You do not need the formulas in your head during character select.

For Duck Hunt, start here:

```text
Next hit is scary  → create space
This hit is scary  → escape the blast zone
Inside a multihit  → SDI your position
After surviving    → keep a recovery route
```

And one more:

**Do not wait until you see yourself flying.**

---

## 11. DI turned out to be less about reflexes than policy

Before researching this, I pictured DI as a reaction test.

Get hit.

See the launch.

Choose a direction.

Fast hands win.

But the actual order is different.

The game reads DI before the visible launch begins.

No human is going to solve 9.74°, LSI, blast-zone geometry and Duck Hunt's recovery path from scratch inside that moment.

So the skill is not calculating faster.

It is **having a defensive policy ready before the calculation is needed**.

Low %: think about the next hit.

High %: think about this hit.

Multihit: think about your current position.

Duck Hunt: think one step farther, about the route home.

That made DI look different to me.

It is not mainly “steering while being launched.”

It is deciding what matters **just before the launch becomes visible**.

By the time you start flying, DI is already over.

But the decision that happens before that can be trained.

Maybe the thing to increase is not the number of directions you know.

**It is the number of defensive situations for which you already have a default answer.**

## References

- SmashWiki, “Directional influence”: https://www.ssbwiki.com/Directional_influence
- SmashWiki, “Smash directional influence”: https://www.ssbwiki.com/Smash_directional_influence
- Ruben, “Launch Speed Influence”: https://ssbworld.com/blog/27/launch-speed-influence
- SmashWiki, “Training Mode”: https://www.ssbwiki.com/Training
- SmashWiki, “Duck Hunt (SSBU)”: https://www.ssbwiki.com/Duck_Hunt_(SSBU)
- Ultimate Frame Data, “Duck Hunt”: https://ultimateframedata.com/duck_hunt

### About the direction rules in this article

This is not a move-by-move optimal-DI database. 最適なDIはmove angle, damage, stage position, opponent follow-ups, recovery resourcesなどで変わる。Treat “out,” “up,” or “down” as hypotheses to test, not universal answers. For setups you lose to repeatedly, compare in / out / neutral in practice and update your personal exception list.
