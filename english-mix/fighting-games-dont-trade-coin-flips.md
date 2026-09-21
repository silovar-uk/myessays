---
id: fighting-games-dont-trade-coin-flips
title: "五分五分のつもりで殴り合うと、勝率は安定しない"
subtitle: "Smash and SF6: win fewer coin flips by creating fewer coin flips"
created: "2026-09-22"
updated: "2026-09-22"
type: "リサーチエッセイ"
status: "完成"
tags: ["対戦ゲーム", "スマブラSP", "ストリートファイター6", "読み合い", "risk management", "variance"]
keywords: ["Super Smash Bros. Ultimate", "Street Fighter 6", "50/50", "risk reward", "variance", "whiff punish", "safe jump", "shimmy"]
grow: 5
abstract: "対戦ゲームで安定するには、50:50をたくさん当てるより、50:50になる場面を減らす方がいい。Smashのspacing・whiff punish・projectilesと、SF6のmeaty・safe jump・shimmyを比べながら、probabilityだけでなくreward、loss、recoveryまで含めて「読み合い」を設計し直す。"
---

# 五分五分のつもりで殴り合うと、勝率は安定しない
## Smash and SF6: win fewer coin flips by creating fewer coin flips

<!-- level:4 role:claim -->
「This is basically 50/50. I just need to win the read.」

対戦ゲームでは、かなりstrongに聞こえる。

<!-- level:2 role:description -->
相手も攻撃する。自分も攻撃する。Who wins the exchange? そこを読めばいい。

<!-- level:1 role:evidence -->
But if you literally need to win three independent 50/50s in a row, the chance is (0.5^3=12.5%). Five in a row is 3.125%. Real matches are not coin flips—players adapt, resources change, and outcomes are not independent—but this toy model shows one simple thing: repeated even bets create variance.

<!-- level:3 role:analysis -->
So there is a small paradox. 安定して勝ちたいのに、毎回 “I can win this read” と言ってcoin-flip territoryへ戻る。

<!-- level:5 role:implication -->
Maybe consistency is not about **winning more 50/50s**. Maybe it is about **creating fewer 50/50s**.

[OpenStax — Binomial Distribution](https://openstax.org/books/statistics/pages/4-3-binomial-distribution-optional)

> **As of: September 22, 2026**
>
> ここでいう50:50は、literal 50 percent probabilityだけではない。「互角に見えるuncertain exchangeへ、自分から入ること」を広く指す。Two options do not automatically mean equal probability or equal payoff.

---

## 1. Two choices are not the same as a fair coin

<!-- level:4 role:claim -->
まず、“two options = 50/50” を外したい。

<!-- level:2 role:description -->
In SF6, strike or throw. In Smash, cover landing or cover dodge. Looks binary.

<!-- level:1 role:evidence -->
But the payoff is different. A throw and a punish-counter combo do not deal the same damage. In Smash, taking one jab at center stage and eating a kill move near the ledge are not equal “losses.” And after a failed attempt, one move may be safe while another gives a full punish.

<!-- level:3 role:analysis -->
So a useful decision has at least three parts:

- **Probability** — how often does it work?
- **Payoff** — what do I gain or lose?
- **Recoverability** — what happens after I am wrong?

<!-- level:4 role:analysis -->
If I ignore payoff and recovery, the phrase “50/50” hides a tiny poke and a round-losing gamble inside the same label.

<!-- level:5 role:implication -->
Stable play is not only about being right more often. It is about making **wrong answers cheaper**.

---

## 2. In Smash, head-on trades make you obsess over move strength

<!-- level:4 role:claim -->
Smash feels most coin-flippy when both players decide “now” at the same time.

<!-- level:2 role:description -->
My forward air. Your back air. My dash attack. Your burst option. If I lose, it is easy to say, “their hitbox is stronger.”

<!-- level:1 role:evidence -->
But Smash gives you shields, dodges, grabs, air dodges, spacing, and whiff punishes. Nintendo's own guides emphasize defensive options such as shield, dodge and perfect shield. Ultimate Frame Data separates startup, active frames, end lag and on-shield advantage.

<!-- level:3 role:analysis -->
That means I do not need to test “my move vs your move” every time. I can stand just outside the range, let you swing first, then punish the recovery. I can shield. I can make you jump over a projectile. I can change the question before answering it.

<!-- level:5 role:implication -->
In Smash, consistency often comes from putting yourself on the **whiff-punish side** of the interaction, not from winning the collision.

[Nintendo — はじめての『スマブラSP』Q&A](https://www.nintendo.com/jp/topics/article/bb0c43bf-03f3-11e9-b104-0a6d14145cb1)  
[Nintendo — Advanced Strategies](https://play.nintendo.com/news-tips/tips-tricks/super-smash-bros-ultimate-advanced-strategies/)  
[Ultimate Frame Data](https://ultimateframedata.com/smash)

---

## 3. Duck Hunt can literally add a third participant to the “duel”

<!-- level:4 role:claim -->
Duck Hunt makes this idea almost physical.

<!-- level:1 role:evidence -->
Ultimate Frame Data lists Trick Shot, Clay Shooting and Wild Gunman as separate attack sources that can occupy space while Duck Hunt moves.

<!-- level:2 role:description -->
Normally the screen is “me versus you.” Put a can in the middle and suddenly the opponent must also respect the can. They jump, shield, move, or hit it. Then Duck Hunt responds to that response.

<!-- level:3 role:analysis -->
The key is not simply “projectiles are good.” The **order of decision-making changes**. Instead of swinging first and hoping, you place a condition, make the opponent spend an action, then choose.

<!-- level:4 role:analysis -->
In other words, the supposedly two-player 50/50 has acquired a third participant.

The can.

犬、カモ、缶。

Fair duel is already having a bad day.

<!-- level:5 role:implication -->
The goal is not to prove that the situation is mathematically 70:30. The useful idea is simpler: **make the opponent reveal something before you commit.**

[Ultimate Frame Data — Duck Hunt](https://ultimateframedata.com/duck_hunt)

---

## 4. Strong SF6 offense removes answers before it asks the question

<!-- level:4 role:claim -->
SF6 offense works the same way.

<!-- level:2 role:description -->
After knockdown, you can strike, throw, walk back, block, or delay. It looks like a giant guessing game.

<!-- level:1 role:evidence -->
But strong setups reduce options. A **meaty** can beat normal mash. A **safe jump** can attack while still allowing the attacker to block many invincible reversals when timed correctly. A **shimmy** can make a throw-tech attempt whiff and turn defense into a punish opportunity.

<!-- level:3 role:analysis -->
This is not prediction. It is option removal. “If you mash here, you lose.” “If you tech here, I may step out of range.” The attacker edits the tree first.

<!-- level:4 role:analysis -->
There is still no universal answer. Reversals, parry, back movement, jump and character-specific options can leave different branches alive, so the read never disappears completely.

<!-- level:5 role:implication -->
Good offense is less “guess my two options” and more **“I deleted some of your answers; now choose from what remains.”**

[CAPCOM — Training Mode Record Settings Tips](https://game.capcom.com/manual/SF6/ja/switch2/page/8/6)  
[INN. — Okizeme and Setplay](https://note.com/inn_the_haze/n/n3aa65e37fe6d?hl=en)  
[CAPCOM — Battle Change List](https://www.streetfighter.com/6/buckler/ja-jp/battle_change)

---

## 5. Marisa's big damage is a reason to gamble less, not more

<!-- level:4 role:claim -->
Marisa looks like a character built to make big bets.

<!-- level:2 role:description -->
Huge hit, huge reward. So the tempting story is: make a big read, land a big move.

<!-- level:1 role:evidence -->
But stable damage usually starts earlier: spacing that avoids punishment, plus situations, strike/throw pressure, or simply blocking an invincible reversal and taking the guaranteed punish. Current balance updates continue to tune things like block advantage, recovery, and hit behavior because “what happens after the move” is part of move strength.

<!-- level:3 role:analysis -->
A high-damage character can actually afford to gamble **less**. If one clean punish gives enough return, you do not need three messy 50/50 exchanges.

<!-- level:5 role:implication -->
High reward can reduce the number of risks you need to take.

[CAPCOM — August 3, 2026 Update](https://www.streetfighter.com/6/buckler/ja-jp/information/detail/update20260803)

---

## 6. Reduce reads first; use reads last

<!-- level:4 role:claim -->
None of this means “stop reading the opponent.”

<!-- level:2 role:description -->
Humans have habits. They tech throws. They mash. They jump. In Smash they roll inward, attack out of landing, or delay ledge options.

<!-- level:3 role:analysis -->
The order matters:

1. Use spacing, frames, projectiles and positioning to reduce options.
2. Choose actions that are cheap when wrong.
3. Read the opponent only inside the remaining branches.

<!-- level:5 role:implication -->
Reads are stronger as the **last layer**, not the first layer.

If “I lost the read” is always the explanation, practice has nowhere to go. If the question becomes “why did I enter that even exchange at all?”, the replay suddenly gives you something concrete to fix.

---

## 7. Overkill experiment: audit 20 exchanges

<!-- level:4 role:claim -->
Take one replay and become unnecessarily serious for ten minutes.

<!-- level:2 role:description -->
Stop the first 20 moments where both players could touch each other. Label each one:

- **A: Clash** — both players commit; result feels close to a raw contest
- **B: Whiff punish** — one player makes the other miss first
- **C: Condition first** — projectile, oki, positioning, or setup forces a response
- **D: Safety first** — block, retreat, wait, or otherwise cap the downside

<!-- level:3 role:analysis -->
Then mark every time you took meaningful damage. Is most of it coming from A? Could C have been created instead? Did you rush from a controllable situation into a clash?

<!-- level:2 role:description -->
For Smash, add: **who swung first?** If you play Duck Hunt, also ask whether the can, clay pigeon or gunman made the opponent act before you committed.

For SF6, isolate knockdowns and plus situations. Write down **which defensive option your offense actually beat**: mash, block, throw tech, reversal, or something else.

<!-- level:4 role:analysis -->
The audit is less interested in who won each exchange than in **how often you personally opened the coin-flip casino**.

<!-- level:5 role:implication -->
The point is not to calculate a perfect percentage. It is to count how often you personally opened the coin-flip casino.

---

## 8. Stability means keeping only the favorable fights

<!-- level:4 role:claim -->
Back to the opening line: “It is 50/50, so I just need to win the read.”

<!-- level:2 role:description -->
Sometimes that is true. Eventually uncertainty remains, and someone has to choose.

<!-- level:3 role:analysis -->
But after looking at both games, skill starts to look different. Strong players are not only better at reads. They are better at **editing how many reads happen, what the payoffs are, and what happens when they are wrong.**

In Smash, make them swing first, move them with a projectile, or refuse a dangerous exchange with spacing and shield.

In SF6, use oki to beat mash, safe-jump timing to reduce reversal value, or shimmy to turn throw tech into a punishable whiff.

<!-- level:4 role:analysis -->
Both games do important work one step before “I will read this option.”

<!-- level:5 role:implication -->
Consistency is not becoming a coin-flip genius. It is building a position where you only have to flip the coin when the game has finally left you no cleaner option.

Coin management.

対戦ゲーム、急にportfolio theoryっぽくなった。

But the controller still has buttons, so we are safe.

---

### Quick reminders

- **Smash:** make them swing first.
- **SF6:** remove an answer before presenting the mix.
- **Both:** judge the miss, not only the hit.
- **Replay question:** not “why did I lose the read?” but “why did I make this a read?”

---

### Sources

- [Nintendo — はじめての『スマブラSP』Q&A](https://www.nintendo.com/jp/topics/article/bb0c43bf-03f3-11e9-b104-0a6d14145cb1)
- [Nintendo — Advanced Strategies for Super Smash Bros. Ultimate](https://play.nintendo.com/news-tips/tips-tricks/super-smash-bros-ultimate-advanced-strategies/)
- [Ultimate Frame Data — Frame Data Notes](https://ultimateframedata.com/smash)
- [Ultimate Frame Data — Duck Hunt](https://ultimateframedata.com/duck_hunt)
- [CAPCOM — Training Mode Record Settings Tips](https://game.capcom.com/manual/SF6/ja/switch2/page/8/6)
- [CAPCOM — 2026-08-03 Battle Change List](https://www.streetfighter.com/6/buckler/ja-jp/battle_change)
- [CAPCOM — 2026-08-03 Update Information](https://www.streetfighter.com/6/buckler/ja-jp/information/detail/update20260803)
- [INN. — Street Fighter 6 Lesson 3: Okizeme and Setplay](https://note.com/inn_the_haze/n/n3aa65e37fe6d?hl=en)
- [OpenStax — Binomial Distribution](https://openstax.org/books/statistics/pages/4-3-binomial-distribution-optional)
