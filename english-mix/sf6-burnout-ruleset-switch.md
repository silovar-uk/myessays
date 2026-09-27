---
id: sf6-burnout-ruleset-switch
title: "バーンアウトすると、「同じ技表」が4フレームずれる"
subtitle: "Burnout is a ruleset switch――ゲージ切れでmovesを封じるのではなく、防御のrulesを書き換える"
created: "2026-09-27"
updated: "2026-09-27"
type: "実践リサーチ"
status: "完成"
tags: ["Street Fighter 6", "SF6", "Burnout", "Drive Gauge", "game design", "frame data"]
keywords: ["Burnout", "Drive Gauge", "Drive Impact", "Drive Reversal", "blockstun", "chip damage", "Street Fighter 6"]
grow: 5
abstract: "Burnout in Street Fighter 6 is more than an empty gauge. ドライブ行動を失うだけでなく、blockstunが4 frames増え、specialsなどのchip damageがhealthへ通り、cornerではDrive ImpactがStunへつながる。2026年9月27日時点のcurrent rulesを確認し、normally -4 on blockのmoveがBurnout defenderには0になるというodd arithmeticから、Burnoutを単なるdebuffではなくtemporary defensive ruleset switchとして読み直す。"
---

# バーンアウトすると、「同じ技表」が4フレームずれる
## Burnout is a ruleset switch――ゲージ切れでmovesを封じるのではなく、防御のrulesを書き換える

Suppose a move is -4 frames on block under normal conditions. 相手がBurnoutしている。同じmoveを出し、同じようにguardされる。Then, in principle, that move becomes 0 frames――even.

The move itself was not buffed. 攻撃側は何も変わっていない。Only the exhausted defender now has to wait longer before acting after block. なのに、こちらのframe dataが勝手に書き換わったように見える。

It feels less like fatigue and more like a temporary change of law. 疲労というより、法改正に近い。

『ストリートファイター6』（Street Fighter 6、以下SF6）のBurnoutを「Drive Gaugeがなくなって弱くなるstate」と説明するのは間違いではない。But that description misses the important part. バーンアウトでは、使える技が減るだけでなく、**guard、frame advantage、chip damage、cornerの意味まで一時的に変わる**。

This article uses the game state as of 2026-09-27. カプコン公式のDrive System説明、official web manual、2026 current-spec summaries、recent common-system adjustmentsを照合した。Numbers and availability are treated as facts; practical meaning and game-design reading are separated as interpretation.

> Burnout is not merely “the punishment for reaching zero.” より正確には、**Drive Gaugeが支えていたnormal rulesetから、一時的に追い出される状態**である。

<figure>
  <img src="https://raw.githubusercontent.com/silovar-uk/myessays/main/assets/sf6/burnout-ruleset-switch.svg" alt="Diagram showing that entering Burnout simultaneously disables Drive actions, adds four frames of blockstun, enables chip damage, and creates corner stun danger">
  <figcaption>Figure 1: Burnout is not one debuff; several rules switch at the same time.</figcaption>
</figure>

## 1. What disappears in Burnout is not “fighting,” but the shared Drive infrastructure

SF6 starts each round with six Drive stocks, used for Drive Impact, Drive Parry, Drive Rush, Overdrive specials, and Drive Reversal. ガードでもDriveは減り、使い切るとBurnoutへ入る。

This creates the first common misunderstanding. Burnout does not remove walking. 通常技も、通常版必殺技も、条件を満たしたSuper Artsも残る。What disappears is the group of actions that specifically requires Drive Gauge.

In other words, character-specific fighting remains while SF6's universal extra layer temporarily shuts down. Drive at zero is neither a control lock nor a ban on special moves.

- **Unavailable**：Drive Impact、Drive Parry、Drive Rush、Overdrive special moves、Drive Reversal。
- **Still available**：movement、normal attacks、regular special moves、throws、eligible Super Artsなど。

This distinction matters in a match. 「Burnoutだから何もできない」と考えると、残っているcounterplayまで捨ててしまう。But if you think “I can fight normally,” you may miss the four-frame rule change that comes next.

## 2. The strangest rule is simple: the blocker alone waits four extra frames

During Burnout, every blocked attack gives the defender four extra frames of blockstun. これはhitstunまで一律4F増える話ではない。**Guardしたときだけ**、defender can act later.

A frame is simply a unit of game time. 攻撃側が先に動ければ「有利」、防御側が先なら「不利」と考えればよい。Because only the defender's restart is delayed by four frames, the attacker's frame advantage shifts four frames toward plus.

So a move that is normally -4 on block becomes 0 against a Burnout defender. -3 becomes +1, -2 becomes +2, and an existing +1 becomes +5. 実戦ではspacing、pushback、cancel optionsがあるため、数字だけでthrowや次のattackがguaranteedになるわけではない。それでも「who moves first」の基礎は変わる。

The attack was not strengthened. 相手のdefensive clockを4 ticks遅らせただけである。

<figure>
  <img src="https://raw.githubusercontent.com/silovar-uk/myessays/main/assets/sf6/burnout-four-frame-shift.svg" alt="Diagram showing normal on-block frame values from minus four through plus one shifting four frames toward plus against a Burnout defender">
  <figcaption>Figure 2: Extra blockstun shifts the same move four frames toward attacker advantage.</figcaption>
</figure>

This is the core arithmetic of Burnout. 「Driveがないから弱い」だけではなく、“pressure that should end does not end” and “a punish that should exist disappears.” 選択肢のboundaryそのものが動く。

## 3. Turning -4 into 0 can erase the right to punish

Four frames sounds small. しかしfighting gamesでは、その4 framesが「こちらがinterruptできる」と「相手のpressureが続く」の境界になり得る。

Drive Reversal gives a clean example. In the current rules, a blocked Drive Reversal is normally -6 for the user. ところがguardした相手がBurnout中なら、extra four frames of blockstunで-2まで縮む。The guaranteed punish that normally exists is gone.

And the asymmetry is stranger still. Burnout player cannot use their own Drive Reversal in the first place, while the opponent's blocked Drive Reversal becomes relatively safer against them. 防御のuniversal toolを失っている側に対して、攻撃側の同じsystem optionが罰されにくくなる。

This is why “everything is +4 in Burnout” is a weaker memory rule than understanding the cause. 「防御側のblockstunが4増える」と分かれば、normal frame dataへ4を足して、その場でmeaningを考えられる。

> Remember one number: **Burnout adds 4 frames of blockstun.** ただし、その4 framesが何を可能にするかはdistanceとmoveによって変わる。

## 4. Calling Drive Gauge a “second health bar” is only half right

In SF6, blocking protects health but often costs Drive Gauge. だからDrive Gaugeを“second health bar”と説明すると、入口としては分かりやすい。

But a real health bar ends the round at zero. Drive is different. 0になった瞬間から、the round continues under a different ruleset. しかも最初から6 stocksあるresourceをoffenseにもdefenseにも使う。

A more precise metaphor is a permission budget for keeping the universal system under normal conditions. 使えばoffenseが伸びる。守れば減る。At zero you do not die; your available actions and defensive conditions become worse together.

This is an interpretation, not an official in-game term. ただ、healthとの違いを掴むには便利である。**Health at zero ends the round. Drive at zero changes the rules of the round.**

So the last Drive stock is not only “one more stock I can spend.” 「通常のdefensive rulesでいられる最後の1本」でもある。

## 5. In Burnout, the cost of blocking moves from Drive back toward health

Under normal conditions, blocking often protects your health by spending Drive instead. Burnout removes that buffer. そのためspecial movesやSuper Artsなどをguardするとchip damageがhealthへ通り、chip K.O.も起こり得る。

Normal attacks do not universally start chipping health just because you are in Burnout. ここは重要である。“Blocking still hurts” depends on what was blocked.

Recovery also changes the resource meaning of defense. Burnout recovery advances not only with time but through actions such as landing attacks and blocking. 通常時はguardでDriveを失うのに、Burnout中はguardがrecovery progressにも関わる。同じinputがthresholdをまたぐとresource meaningを変える。

That does not mean “keep blocking and you are safe.” Blockstun is four frames longer, specials can chip health, and being pushed toward the corner creates the next danger. 回復を待つ行為そのものが、相手のpressureを長く受けることと表裏一体になる。

Burnout is not “a state where defense is impossible.” **It is a state where the bill for defending is posted to a different account.**

## 6. In the corner, Drive Impact changes from a space-control move into a stun trigger

SF6 does not foreground a permanent stun gauge in the old style. Instead, if a Burnout defender is driven into the wall by Drive Impact in the corner, Stun occurs.

So “Burnout means +4 on block” is not enough. 中央とcornerでは、same Burnoutのriskが大きく変わる。A situation that could retreat in mid-screen can become a wall-based loss condition in the corner.

The Burnout player cannot answer with their own Drive Impact or Drive Parry, because those Drive options are gone. Super Arts, throws, jumps, normals, and regular specials remain possible depending on character and timing. したがって「corner DIにはone answerだけ」と一般化はできない。

There is another odd detail: after recovering from Stun, Drive Gauge is replenished. つまりStun is mechanically also an endpoint of Burnout. But the opponent receives a major attack opportunity first, so treating it as “good because Drive comes back” would miss the point.

The corner is dangerous for more than lack of space. **It is the place where the opponent can convert Burnout into Stun.**

## 7. Burnout is not checkmate; it is time to fight with the older tools that remain

Drive System is unavailable during Burnout, but normals, regular special moves, throws, jumps, walking, and eligible Super Arts remain. 自キャラがcharacter-specific invincible moveやSuper Artを持つかでもdefensive shapeは変わる。

This is one of the most interesting design effects in SF6. Strip away the game's most modern universal layer, and the older skeleton becomes visible again: walk, block, place a normal, throw, or answer with a special. 最先端のcommon systemが消えると、急に古典的な格闘ゲームが顔を出す。

Of course, the conditions are not equal. There is +4 blockstun, chip damage, and corner stun danger. それでもinputを受け付けないpunishment periodではない。It is time to search for gaps using the moves that survived.

That difference matters psychologically as well. 「終わった」と思えば、unnecessary mashやreckless jumpを選びやすい。If you first know what remains, Burnout becomes a special game state rather than a blank screen of options.

So Burnout practice cannot stop at “do not empty the gauge.” 自分のcharacterがDriveなしで何を返せるかを、separate situationとして確認しておく必要がある。

## 8. To recover from Burnout, learn what advances recovery instead of only watching the clock

Burnout is temporary. When the white recovering Drive Gauge fills, the normal state returns. 現行仕様では、timeだけでなく、landing attacksやblockingなど複数のactionsがrecoveryへ関わる。

That means “back away and wait” is not always the best answer. Sometimes moving forward and landing offense helps recovery and position at once; sometimes pressure forces you to defend. ここはcharacter、health、position、Super Art Gaugeまで含むdecisionになる。

The May 28, 2026 update also adjusted Drive gain around throw escapes and Recovery Drive Reversal with low-Drive and Burnout defense explicitly in mind. つまり「how easily can a defender climb out of this state」は、neutral balanceに関わるため継続的にtunedされている領域である。

The practical principle is simple: do not memorize one fixed “Burnout lasts X seconds” answer. **Instead, learn which actions advance recovery and which risks grow while you do them.** その方がfuture patchesにも強い。

## 9. The fastest way to feel four frames is to block the same -4 move twice

Reading the rules does not make four frames feel large. そこでTraining Modeで、少しだけoverdoしたcomparisonをする。

First choose a move that is normally -4 on block. 距離が離れすぎず、4F normalでpunishを試しやすいものがよい。Record the same attack, then block it once in normal state and once in Burnout.

- **Normal state**：If it is -4 and spacing allows it, confirm a punish with a 4F normal.
- **Burnout state**：Guard the same attack. Extra 4F blockstun makes it theoretically 0, so the same guaranteed punish disappears.
- **Next test**：Try moves at -3, -2, and -1, and watch the boundary move from “safe” into attacker advantage.
- **Final test**：Block Drive Reversal and compare normal -6 with Burnout -2.

The point is not combo practice. **Same animation, same block, same button――but the legal timing to press changes with the state.** それを身体で覚えるためのexperimentである。

If frame data starts looking less like a spreadsheet and more like traffic law, the test worked. 数字がrulesに見え始めれば成功である。

## 10. Full health with zero Drive and low health with six Drive are different kinds of danger

Push the thought experiment to an extreme. One player has plenty of health but zero Drive in the corner. The other has low health but six Drive stocks in mid-screen. どちらが危険かは、one-dimensional meter readingでは決められない。

The first player may not die to one normal hit, but +4 blockstun, chip, and corner Drive Impact into Stun create a structure where pressure keeps compounding. 後者はbig damageに弱い一方、Drive Parry、Drive Reversal、Overdrive specialsなど、状況を変えるuniversal resourceをまだ持っている。

It would be careless to conclude “Drive matters more than health.” Health at zero is defeat; Drive at zero is not. 比べるべきなのはimportanceではなく、**what kind of thing is lost**である。

Lose health and you reduce how many hits you can survive. Lose all Drive and the menu of options plus defensive conditions change. SF6 makes you manage “how many hits can I take?” and “under which rules can I defend?” at the same time.

Avoiding Burnout therefore does not mean hoarding gauge. 今2本、3本をspendしてoffenseを取った結果、その後どのrulesetでdefendすることになるかまで含めてbudgetすることである。

## 11. Burnout starts to look less like punishment and more like the due date for six prepaid stocks

Before researching this, I thought Burnout was simply a punishment for overspending Drive. もちろん、その理解にも一面のtruthはある。Resource management mistakes make the round clearly harder.

But SF6 gives you all six Drive stocks at the start of the round. You can spend the universal system immediately on both offense and defense. まずfreedomを前払いし、使い切った後にrestrictionを置く。That design order is the reverse of a gauge that asks you to earn first and spend later.

So Burnout begins to resemble a due date more than a red prohibition sign. 先に借りたfreedomを使い切ると、Drive actionsを失い、guard clockを4F遅らされ、chipとcorner riskを引き受ける。This is my interpretation, not Capcom's official terminology.

Return to the strange opening arithmetic. A move that is normally -4 becomes 0 against a Burnout defender. The move did not change. **What changed was the ruleset the defender belongs to.**

After tracing the system, the six green stocks no longer look like only “how many techniques are left.” むしろ、**how long you can remain under normal defensive rules**を示す猶予にも見える。Understanding Burnout is not merely learning why zero is scary; it is seeing how much offense, defense, time, and position SF6 packed into one green gauge.

## 参考資料

- [Capcom「Street Fighter 6 Redefines the Genre in 2023」――official Drive System、six stocks、Burnout、corner Stun](https://news.capcomusa.com/2022/06/02/street-fighter-6-redefines-the-genre-in-2023/)
- [Street Fighter 6 Official Web Manual――Drive Gauge zeroでBurnoutとなりDrive techniquesが使えない説明](https://game.capcom.com/manual/SF6/fr/ps5/page/3/1)
- [Street Fighter 6 Specification Summary――2026-05-28基準のcurrent Drive/Burnout specifications](https://note.com/mochimochi_sf/n/n08a56f1b4f06)
- [芝羽ばいばる「ガード時有利技まとめ」――2026-03-17時点のBurnout +4F、Drive Reversal -6F→-2F](https://note.com/shibabaibaru/n/n6b31cd610ba7)
- [Street Fighter 6 Combo「Drive System」――+4F、chip damage、corner Stun、recovery actions](https://sf6combo.kagewebsite.com/page/drive-system)
- [Final Weapon「Street Fighter 6 Ingrid Update」――2026-05-28 low-Drive/Burnout周辺のbalance intent](https://finalweapon.net/2026/05/28/street-fighter-6-ingrid-update-is-now-live-with-major-adjustments/)
- [MP1st「SF6 Update 1.000.005」――Burnout中のchip damage／Drive recoveryに関するcommon adjustments](https://mp1st.com/news/sf6-update-1-000-005-for-sept-26-strikes-out-to-add-aki)
