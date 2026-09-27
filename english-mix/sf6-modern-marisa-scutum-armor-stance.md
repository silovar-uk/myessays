---
id: sf6-modern-marisa-scutum-armor-stance
title: "モダンマリーザのスクトゥムは「当身」ではない――一発受けてから攻めを始める装甲付き構え"
subtitle: "Normal / OD armor, +1 to +3 after auto-counter, and the Tonitrus / Procella / Enfold decision tree"
created: "2026-09-27"
updated: "2026-09-27"
type: "実践リサーチ"
status: "完成"
tags: ["Street Fighter 6", "SF6", "Modern Marisa", "Marisa", "Scutum", "frame data", "defense"]
keywords: ["Modern Marisa", "Scutum", "OD Scutum", "Tonitrus", "Procella", "Enfold", "armor", "Street Fighter 6"]
grow: 5
abstract: "Modern Marisa's Scutum looks like a parry, but its current mechanical identity is armor: absorb a strike, trigger an automatic counter, then turn defense into offense. This article checks the normal version's 3F upper-body one-hit armor, OD's 1F full-body two-hit armor, why the auto-counter often becomes +1 to +3 in real play, Modern's 80% damage scaling, the unequal risks of three follow-ups, and practical use on wake-up, in neutral, in Burnout, and on offense."
---

# モダンマリーザのスクトゥムは「当身」ではない――一発受けてから攻めを始める装甲付き構え
## Normal / OD armor, +1 to +3 after auto-counter, and the Tonitrus / Procella / Enfold decision tree

Scutum is also the name of the long shield used by Roman soldiers. マリーザはactual shieldを持たない。She crosses her arms in front of her head and takes the attack with her own body. 盾という名前なのに、盾そのものは出てこない。That is extremely Marisa.

Visually, it looks like a classic counter stance: “take the hit, then hit back.” でもmechanically it is different from invincibility or Drive Parry. Scutum gives Marisa armor, lets that armor absorb the strike, and uses the armor trigger to launch an automatic counterattack.

That distinction is not vocabulary trivia. Normal Scutum does not cover her lower body, and even OD Scutum loses to throws. Armor-break attacks can also destroy the premise. その一方、打撃を受け止めた後はauto-counterが相手の動作へ刺さり、Marisa can become roughly +1 to +3 and start offense immediately.

At first, the easy memory was “OD Scutum is a strong 1F reversal.” 調べるほど、本当に重要なのはafter that pointだった。What can it absorb? Why does a move listed at -1 on raw hit become +3 in practice? Are overhead, low, and command throw really equal parts of one mix-up? What does Modern pay for its fast input?

> Scutum is less “a move that stops the opponent's attack” and more “a move that buys the next decision by using the opponent's strike as the entrance.”

This article uses the game state as of 2026-09-27 and cross-checks current official-reference frame data, Modern move data, and Season 4 matchup material. 数値とinputはfact、use casesはinterpretation、最後のtraining methodはproposalとして分ける。

## 1. Scutum makes more sense as an armored stance than as a “parry,” because that wording explains how it loses

In Modern controls, forward + Special enters Scutum. Holding the button extends the stance, and Tonitrus, Procella, or Enfold can branch from it. 相手のstrikeをarmorで受け止めると、7F startupのdedicated auto-counterが出る。

Beginner references also explain that Scutum looks like an “atemi” counter but is mechanically treated as armor. この整理の利点は、weaknessが一気に見えることにある。Throws cannot be absorbed. Normal Scutum is weak to lows. Armor-break properties destroy the assumption that Marisa can simply take one hit.

So “press it when an attack comes” is too broad. A better rule is: “press it when you read a type of strike that Scutum can absorb.” そう言い換えると、whiff、throw loss、low lossが全部同じ読み負けではなくなる。

## 2. Normal is 3F / upper body / one hit; OD is 1F / full body / two hits――the stance looks similar, but the jobs differ

Current frame data gives normal Scutum one upper-body armor count on frames 3-28. OD Scutum has two armor counts from frames 1-28, and current guides treat it as a full-body strike reversal that can also take lows. Both trigger the automatic counter when armor succeeds, and dedicated follow-ups can be entered during the stance's 9-14F window.

- Normal Scutum: Forward + Special. Armor starts on 3F, frames 3-28, upper body, one armor count.
- OD Scutum: Forward + Assist + Special. Armor starts on 1F, frames 1-28, full body, two armor counts.
- Auto-counter: 7F startup, active 7-10F, 20F recovery. Raw data is -1F on hit and -3F on block.
- Shared risk: Scutum and its follow-ups remain vulnerable to Punish Counter when Marisa is actually hit during their vulnerable animation.
- Shared option: holding the button extends the stance.
- Shared weakness: throws cannot be absorbed by the armor.
- Normal only: lower-body coverage is missing, so it is not a universal wake-up answer.
- OD role: 1F full-body coverage makes it the major option when Marisa specifically reads a meaty strike.

The important wording is not to call OD Scutum “invincible.” It can act like a reversal against strikes because armor begins on frame 1. でもactual mechanicはarmorである。It loses to throws, loses to armor break, and exposes recovery or follow-up risk if nothing is absorbed. Counterplay makes the difference obvious.

## 3. The auto-counter is -1F on a raw hit, yet often +1 to +3 in practice――Counter and Punish Counter solve the mystery

The auto-counter itself is listed as 7F startup and -1F on a normal hit. Taken literally, that sounds absurd: “I successfully countered, but the opponent moves one frame first.” ところがmatchup guides describe successful Scutum situations as roughly +1 to +3 for Marisa.

The reason is timing. In SF6, Counter Hit adds two frames of advantage, and Punish Counter adds four. 相手がちょうどattack animation中なので、the Scutum auto-counter often lands under one of those states. Starting from raw -1, Counter Hit becomes +1 and Punish Counter becomes +3.

So “Scutum success equals +3” is too simple. A more accurate memory is: “the advantage depends on which part of the opponent's attack the auto-counter catches.” 深いmeatyを取って相手がrecoveryへ入っていれば+3側、delayed strikeを早めに取れば+1側へ寄りやすい。

The difference between +1 and +3 matters. At +3, Marisa's 7F action can effectively collide with an opponent's 4F normal on the same timing. At +1, the same heavy-minded follow-up can be interrupted. スクトゥムは成立したかだけでなく、how it成立したかを見る技である。

## 4. Modern buys easier execution by starting the auto-counter and all three branches at 80% damage

Modern Marisa has a special cost here. Scutum is a simple-input-only move on Modern, so there is no manual-command version that restores 100% damage. 簡易入力の20% damage reduction therefore reaches the auto-counter and the branches that come from the stance.

- Auto-counter: 700 equivalent → 560.
- Tonitrus hit 1: 900 → 720.
- Tonitrus hit 2: 1000 → 800.
- Procella: 1200 → 960.
- Enfold: 2500 → 2000.

This matters more than the generic statement “Modern does less damage.” Scutum trades execution speed and stability for a smaller reward after a correct read. 特にEnfoldは500 damage下がるので、the round pressure of repeatedly landing it is not identical to Classic.

At the same time, the value of getting 1F OD armor from forward + Assist + Special is not visible in a damage table. 入力ミスを減らし、“strike is coming now”というdecisionをすぐdefenseへ変換できる。Modern Scutum does not simply lose damage; it exchanges some damage for speed and repeatability.

## 5. The three branches are not symmetrical――overhead is relatively safe, low is a huge gamble, throw is the main guard break but hates whiffing

Tonitrus is an overhead, Procella is a low, and Enfold is a command throw. On paper, it looks like a beautiful triangle: stand block, crouch block, or break guarding entirely. でもriskはまるでequalではない。

Tonitrus starts in 15F and deals 720 in Modern. The first hit is +1 on hit and -3 on block, so stopping there avoids a guaranteed punish. The second hit deals 800 and gets knockdown, but is -21 if blocked. Procella is a 16F low for 960 and knockdown, but -24 on block. 通れば大きいが、読まれれば相手へlarge punishを渡す。

Enfold is a 5F command throw during the stance and deals 2000 in Modern. ただし“Scutum中の5F”であり、forward + Specialからinstant 5F throwになるわけではない。Current Modern guides place the fastest total sequence at roughly 13F. Jump, back walk, or being out of range makes it whiff.

So do not memorize the stance as “randomly choose high / low / throw.” A better role split is: Tonitrus first hit as a lower-loss pressure check, Procella as a high-risk callout against standing guard, Enfold as the primary answer to someone who stays blocking. 三択というより、three bets with different insurance premiums.

## 6. On defense, normal is “read the strike”; OD is “reject the meaty strike with 1F armor”

OD Scutum is easiest to understand on wake-up. Because full-body armor begins on frame 1, it can absorb high, mid, or low meaty strikes and transition to the auto-counter. If the result is around +3, Marisa can flip directly from defense into an Enfold-or-strike decision.

But thinking “I now have an invincible reversal” creates bad habits. A meaty throw beats it. Armor-break attacks beat the mechanic. Waiting can make the stance end or force Marisa to reveal a follow-up. スクトゥムを警戒されるほど、opponent's non-strike options increase.

Normal Scutum starts armor on frame 3 and only protects the upper body. だからwake-upのfast strikeを何でも返す用途ではない。Its job is more deliberate: a large strike in neutral, a jump-in you read early, or Drive Impact during Burnout when you can place the stance before impact. The auto-counter has armor-break property, so if the interaction lines up it can break Drive Impact armor.

The principle is simple. Scutum is not insurance for a late reaction; it is a tool for a narrowed prediction. 受け身に見える技ほど、成功率を上げるにはactive readingが必要になる。

## 7. Offensive Scutum is not a normal-cancel sequence; it is a deliberate pause that asks the opponent to keep guarding

Scutum itself cannot be special-cancelled directly from a normal attack. つまりnormalをguardさせ、そのままtrue cancelでEnfoldが飛んでくる技ではない。On offense, it is shown as an independent stance after Drive Rush, after a favorable situation, or at a range where the opponent is likely to freeze.

The stance itself becomes information. If the opponent expects Tonitrus or Procella and keeps blocking, Enfold can grab that decision. If they fear Enfold and start jumping or backing away, strike branches gain value. スクトゥムを押した瞬間のdamageは0なのに、it can change the opponent's defense before damage happens.

There is still no automatic mix-up. The opponent can mash, throw, jump, or wait depending on spacing and advantage. 特に+1成立を+3のつもりで扱い、heavy buttonやthrowを固定すると、fast responseに負け得る。Scutum does not complete the decision when the pose appears; it creates the next decision.

## 8. Learning the opponent's counters first reveals exactly when Marisa should stop pressing Scutum

From the defender's side, throw is the first clear answer. Neither normal nor OD Scutum can absorb a throw, and Marisa can take a Punish Counter during the move's vulnerable state. Normal Scutum can also be attacked low. Armor-break moves challenge the armor directly.

Second, “do nothing” is surprisingly strong. Empty jump into throw, waiting after seeing the stance, neutral jump or back walk against Enfold――Scutum works best when the opponent supplies a strike. 打撃を出さないだけで、the automatic counter never becomes available.

The branch numbers are also extreme. Tonitrus first hit is only -3, but the second is -21 and Procella is -24. Enfold leaves a large whiff if it misses. だから“stanceを見せたから何か出さなければ”と焦るほど、the opponent gets easier punish opportunities.

Read those counters backward and they become Marisa's rules. If throws increase, reduce OD Scutum. If lows keep tagging normal Scutum, stop placing it at the same timing. If Enfold keeps getting jumped, restore strike options. スクトゥムはone strong actionではなく、opponent adaptationで配分を変えるsmall gameである。

## 9. Four Training Mode recordings are enough to separate “+1 vs +3,” “throw loss,” and “low loss”

The desk research explains the listed numbers, but the exact +1 or +3 depends on which move and which active frame gets absorbed. 実機ではsame opponentにfour recordingsだけ作り、Scutum後のframe meterを見るのがよい。

- Record 1: a 4F normal timed as a true meaty. Absorb with OD Scutum and check the post-counter advantage.
- Record 2: the same normal, slightly delayed. Compare whether the result shifts between +1 and +3.
- Record 3: a wake-up throw. Confirm that OD Scutum cannot absorb it and observe the Punish Counter result.
- Record 4: a low strike. Alternate normal and OD Scutum and visually confirm the coverage difference.

Then practice only after a successful auto-counter. On +3 repetitions, test Tonitrus first hit, Enfold, and doing nothing. On +1 repetitions, set the opponent to mash a 4F normal and compare which choices survive. “成功したらautomatic turn”という粗いmemoryを、actual frame stateへ置き換えられる。

Do not measure only hit rate. Classify the miss: “correct strike read,” “lost to throw,” “tried normal Scutum against low,” “used a +3 follow-up after only +1,” or “committed to an unsafe branch and got punished.” スクトゥムはbutton accuracyより、decision classificationを鍛える方が伸びやすい。

## 10. Before research it looked like a shield; after research it looks like an exchange that converts an incoming strike into offense

The name Scutum naturally suggests defense. Roman legionaries used a long shield to protect the body, and Marisa also builds a shield-like shape with her arms. ここまではstraightforwardである。

But SF6 Scutum does not end at protection. Armor takes a strike. The auto-counter turns that moment into Counter or Punish Counter. The resulting +1 to +3 then branches into overhead, low, or command throw. 防御成功がnext attack rightへconvertされるdesignになっている。

That is why “OD Scutum is strong because it starts on frame 1” only describes the entrance. The real move is reading which strike to absorb, reading the advantage after the counter, and changing the second choice when the opponent starts throwing, waiting, or jumping. Modern also loses 20% damage for its simple input, so the quality of the decision after success matters even more.

A shield is not only a plate that stops a hit. It can preserve formation and create the next step. スクトゥムを細かく調べた後では、Marisa not carrying a physical shield feels strangely correct. For her, the shield is not equipment; it is the act of turning the opponent's attack into her next attack.

## 参考資料

- [CAPCOM: Battle Change List, Marisa, 2026-08-03](https://www.streetfighter.com/6/buckler/ja-jp/battle_change/20260803/marisa)
- [SF6 Lab: MARISA Frame Data](https://sf6-lab.net/en/fighters/marisa/frame)
- [神ゲー攻略: Modern Marisa Special Move Guide](https://kamigame.jp/streetfighter6/page/340261064258125468.html)
- [ストリートファイター6初心者Wiki: Marisa](https://w.atwiki.jp/sf6begin/pages/47.html)
- [dood: Marisa Scutum](https://dood.gg/en/street-fighter-6/marisa/Scutum/)
- [さーな: vs Marisa Matchup Notes S4, 2026/8/3](https://note.com/emesirna/n/nb24053cdc1b1)
- [もちもち: Street Fighter 6 Specification Summary](https://note.com/mochimochi_sf/n/n08a56f1b4f06)
- [Gamerch: Marisa Commands and Combos](https://gamerch.com/streetfighter6/767777)
- [British Museum: Legion: life in the Roman army](https://www.britishmuseum.org/exhibitions/legion-life-roman-army/large-print-guide)
- Related: [「モダンマリーザの対空は、最強の一手を決めるほど崩れる」](https://silovar-uk.github.io/myessays/#/essay/sf6-modern-marisa-anti-air-routing?lang=ja)
- Related: [「モダンマリーザのワンボタン必殺技とOD必殺技は、同じ『簡単入力』ではない」](https://silovar-uk.github.io/myessays/#/essay/sf6-modern-marisa-one-button-vs-od-specials?lang=ja)
