---
id: sf6-modern-marisa-hitback-block-value
title: "Modern Marisa's Hitback Is Chosen by What Survives a Block, Not Only by What Hits"
subtitle: "Translating Ryusei's hitback idea into 5M, 2M, 4H, Cancel Drive Rush, Phalanx, and Quadriga"
created: "2026-10-02"
updated: "2026-10-02"
type: "実践リサーチ"
status: "完成"
tags: ["Street Fighter 6", "SF6", "Modern Marisa", "Marisa", "hitback", "frame data", "Drive Gauge", "practice design"]
keywords: ["Modern Marisa", "hitback", "turn switch", "block advantage", "crouching medium punch", "Magna Bunker", "Cancel Drive Rush", "Phalanx", "Quadriga"]
grow: 5
abstract: "Ryusei's idea is simple but deep: at the moment the turn changes, choose a move by asking what remains even if it is blocked. This article translates that idea into current Year 4 Modern Marisa, separating guaranteed punishes from turn-reclaim decisions and evaluating 5M, 2M, 4H, charged 4H, 5H, Phalanx, and H Quadriga through startup, block state, cancel routes, spacing, and Drive Gauge."
---

# Modern Marisa's Hitback Is Chosen by What Survives a Block, Not Only by What Hits
## Translating Ryusei's hitback idea into 5M, 2M, 4H, Cancel Drive Rush, Phalanx, and Quadriga

“You blocked the opponent's move. It feels like your turn. You press something.”

この三行は、fighting gamesをかなり長く遊んでも残る。You know the moves, you can do the combos, and you vaguely know the opponent is minus. それでもturnが切り替わった瞬間だけ、「とりあえず中」「届きそうだから強」とdecisionが曖昧になる。

What makes Ryusei's video on “打ち返し” useful is that it treats this not as an execution problem but as a design problem. 相手の連係が終わり、自分が動ける。そのときask not only “what hits?” but also **“what is most valuable if they block?”** If the move you choose gives the turn straight back when blocked, maybe another button is a better return.

<figure>
  <img src="https://raw.githubusercontent.com/silovar-uk/myessays/main/assets/sf6/marisa-hitback-quote.svg" alt="ガードさせた時に何が一番おいしいか、という打ち返しの原則を示す引用カード">
  <figcaption>Figure 1: Move from “what hits?” to “what still has value on block?” 元動画の問いをModern Marisaの技選択へ置き換える。</figcaption>
</figure>

> Think first: 「ガードさせた時に何が一番おいしいか」。

Applied to Modern Marisa, this does not become a simple “best hitback button ranking.” マリーザには4Fの2弱、7Fの5中、8Fでcancel可能な2中と4強、そしてslower but plus-on-block options such as Phalanx and H Quadrigaがある。Speed and block value do not point in the same direction.

This article uses the current Year 4 environment as of October 2, 2026. 数値と技性能はfacts、そこから作るrole splitはinterpretation、最後のpracticeはproposalとして分ける。The conclusion is simple: **hitback is not a search for the strongest move. It is a choice of the move that creates the best next state when the turn comes back.**

## 1. Hitback is not a move name; it is a decision at the boundary where the turn changes

“Hitback” here is not an official Street Fighter 6 term. 本稿では、相手の攻撃をguardした後、their sequence ends and you can choose an action again—either because you are actually plus or because the pressure has reached a reset point—その瞬間のnext actionを指す。The key is not “block, then press,” but **confirm that the sequence has actually ended before pressing.**

If the opponent is still canceling a normal into Cancel Drive Rush or a special, pressing from the standalone frame number can get you counter-hit. 逆に、連係が終わって相手がminusなのに何も押さなければ、you hand back time that was available to you. So the first task is not move selection; it is reading “boundary or still connected?”

Ryusei's point that vague actions reduce match reproducibility fits exactly here. 全技を暗記しなくても、「this move stops here, so I act」「this cancel appears, so I still wait」というboundaryを少しずつ増やせば、the same situation starts producing the same decision.

## 2. Separate guaranteed punishment from hitback, and the value of “what happens on block” becomes clear

If the opponent is -4 at point-blank range and your 4F move reaches, that is a guaranteed punish. 相手はguardできない。In that case, thinking deeply about the blocked outcome is less important; take the strongest punish that reliably reaches.

But when the opponent ends at -1 or -2, or spacing prevents a guaranteed punish, you may move first while the opponent can still block. ここで初めてRyuseiのquestionが効く。**Do not evaluate only the reward on hit; evaluate what you lose when the move is blocked.**

For Modern Marisa, standing medium punch is 7F and -1 on block, crouching medium punch is 8F and -2, and back heavy punch—Magna Bunker—is 8F and -1. どれも大きなpunishを背負う数字ではないが、2中と4強はcancelableで、5中は通常のspecial cancelには対応しない。Similar frame values leave different futures.

<figure>
  <img src="https://raw.githubusercontent.com/silovar-uk/myessays/main/assets/sf6/marisa-hitback-flow.svg" alt="連係終了、確定反撃、ターン回収、ゲージ有無の順にモダンマリーザの打ち返しを選ぶ判断フロー">
  <figcaption>Figure 2: First separate guaranteed punish from turn reclaim, then evaluate speed, spacing, gauge, and post-block value.</figcaption>
</figure>

## 3. Evaluate Modern Marisa's hitback through five conditions: startup, block state, cancel route, spacing, and gauge

If we translate the video into “press a plus-on-block move,” Marisa immediately gets into trouble. 弱ファランクスはblockで+3、H Quadrigaは+1。But their startups are 25F and 29F. They are not universal answers for the instant a turn switches.

On the other side, crouching light punch is only 4F but is -1 on block. 5中 is 7F/-1. 2中 and 4強 are both 8F, at -2 and -1 respectively, and both are cancelable. Faster does not automatically mean more plus; more plus does not automatically mean usable at the boundary.

So evaluate each hitback candidate through five conditions.

- **Startup**: does it arrive before the opponent's next action in this specific timing?
- **On block**: if they guard, how much initiative do you keep or give up?
- **Cancelability**: can hit or block be converted into a special move or Cancel Drive Rush route?
- **Spacing**: does the move actually reach after pushback, not only on the frame-data sheet?
- **Gauge**: are you paying 3 bars to keep pressure, or preserving Drive and accepting a reset?

With these five conditions, the question changes from “which move is strong?” to “which move fits this job?” 打ち返しはmove rankingではなく、situationとmove roleのmatchingである。

## 4. Use 2L when you must reclaim immediately; move to 5M when you have a little more time

Even after pressure ends, Marisa cannot press anything she wants. 相手のminusが小さければ、a slower button simply loses to the next 4F challenge. The first question is not “which reward is bigger?” but “how much startup can this gap afford?”

Modern Marisa's crouching light punch is 4F, +4 on hit, -1 on block, and cancelable. 小さな隙を確実に取りたいとき、or when you want your fastest contest against their fastest option, it becomes the baseline. The damage is small, but the job here is not maximum damage; it is stopping the opponent from moving again for free.

Standing medium punch is 7F, +2 on hit, -1 on block. It is not normally special-cancelable, but it is heavier than 2L and one step faster than the 8F options. 相手の不利や距離に少し余裕があり、you want a relatively safe way to reclaim initiative, it is an easy candidate to understand.

Do not classify 2L or 5M as “low-reward hitbacks.” If the purpose is to certify that the opponent's turn ended and move into your next decision, **speed itself is reward**. Higher damage can come after the turn is yours.

## 5. With Drive available, 2M can buy pressure again even when the opponent blocks

Crouching medium punch is 8F, +3 on hit, -2 on block, and cancelable. 生でguardされれば、the opponent is numerically ahead, so 2M alone does not preserve pressure. Cancel Drive Rush changes the job.

Current Modern Marisa guides use 2M into Cancel Drive Rush and then standing medium punch as a basic route to create close pressure. キャンセルドライブラッシュはDrive Gaugeを3本使う。So 2M is both “a normal that ends at -2 when blocked” and **an entry point that can convert a block into another offensive state for 3 bars**.

This is the closest Marisa analogue to the JP example in the original video. The important point is not that 2M is always correct. 「今はゲージがあるからguardされても3本で続ける」「残りが少ないから生2中で止めてBurnoutを近づけない」と、resource state changes the value of the same button.

If Cancel Drive Rush becomes automatic, a new vagueness appears: “my hitback is organized, but my Drive disappears every time.” だから2中だけをmemorizeせず、**memorize the condition under which 2M is allowed to spend 3 bars**.

## 6. 4H is an interesting meterless baseline because 8F, -1, and cancelability live in one move

Back heavy punch, Magna Bunker, starts in 8F, is +3 on hit, -1 on block, and is cancelable. 2中と同じ8Fだが、block disadvantage is one frame smaller and base damage is 900. As a hitback candidate, it packages “reasonable speed,” “limited loss on block,” and “conversion on hit” into one action.

That does not mean “use 4H for every hitback.” 空振りにはadditional recoveryがあり、spacingが合わなければthe attacker becomes vulnerable. It is still 8F, so a small turn window can lose to a 4F challenge. Good move properties do not erase timing requirements.

Charged 4H changes the job entirely: startup becomes 20F, while hit advantage becomes +13 and block advantage +4. これはturnが返った瞬間に差し込む技より、the next layer of pressure after you expect the opponent to freeze. Treat normal 4H as reclaiming time and charged 4H as investing time to purchase advantage.

## 7. 5H is not “the Marisa button you hit back with” just because it is big

Marisa's heavy punch is visually persuasive. Regular 5H starts in 12F, is +3 on hit, -3 on block, and deals 1000. Fully charged it becomes 23F and +5 on block. If you evaluate only reward, it naturally tempts you as a hitback.

But 12F is three times the startup of 2L. 相手がslightly minusなだけの場面で「Marisaだから5H」と押せば、the opponent's fast button can occupy those twelve frames. And at -3 on block, uncharged 5H does not automatically continue offense. Current guides often treat it as a whiff-punish tool precisely because its role is high return on spacing and recovery, not fastest turn reclaim.

Charged 5H at +5 is powerful, but you still need room for 23F of startup. So treat the 5H family as a conditional high-value answer: a large recovery is visible, the opponent is likely to freeze, or spacing supports it. 拳が大きいほど、press conditionは細かくする。

## 8. Phalanx and H Quadriga are profitable on block, but they design the layer after the turn switch

Current frame data lists all normal Phalanx strengths at +3 on block and H Quadriga at +1. ガード後の数字だけなら、they are exactly the kind of moves that look “profitable to make them block.”

But their startups—25F for light Phalanx and 29F for H Quadriga—tell us they are not direct responses to the instant a turn switches. Phalanx brings armor and airborne properties; Quadriga brings forward reach and space control. They purchase “I remain ahead after you block” on top of a read that the opponent will freeze, misjudge range, or wait for something else.

So the video's principle is not “find a plus move.” It is **choose a move while including its post-block value**. 7F/-1の5中には5中のjob、8Fでcancel可能な4強には4強のjob、25F/+3のPhalanxにはPhalanxのjobがある。Do not put all of them on the same shelf marked “hitback.”

<figure>
  <img src="https://raw.githubusercontent.com/silovar-uk/myessays/main/assets/sf6/marisa-hitback-value-map.svg" alt="モダンマリーザの打ち返し候補を発生、ガード硬直差、キャンセル可否、用途で比較した図">
  <figcaption>Figure 3: Fast moves and plus-on-block moves are different tools. Use one set to reclaim the turn and another to design the next layer.</figcaption>
</figure>

## 9. Keep two answers for the same situation—one with gauge and one without—to make matches reproducible

The video explicitly separates “when gauge is available” from “when gauge is not,” because repeated Cancel Drive Rush use pushes the player toward Burnout. モダンマリーザでも、このtwo-card model works almost directly.

Imagine a midrange situation where the opponent's sequence ends and an 8F-class button is realistic. If Drive is healthy and you want to buy offense, 2M into Cancel Drive Rush is a candidate. 残りが少ないなら、4強や5中のように、blockされてもlarge lossを背負いにくいnormalで一度initiativeを回収し、accept the next reset.

Do not treat the meterless answer as an inferior substitute. Not spending 3 bars preserves future Drive Reversal, OD specials, raw Drive Rush, or a later Cancel Drive Rush. 目先のpressureを買わないことが、round全体ではhigher-value choiceになる場合がある.

Before the match, define only two lines.

- **When 3 Drive bars are worth spending**: use 2M → Cancel Drive Rush and continue into a new decision whether hit or blocked.
- **When Drive should be preserved**: reclaim with 5M, 4H, or another appropriate normal, and do not force continuation after block.

Once you decide not only “what do I press?” but “what am I willing to pay?”, hitback becomes part of resource management.

## 10. In replay review, look less at what hit and more at what happened after the opponent blocked

When rank stalls, replay review naturally gravitates toward big errors: missed anti-air, dropped combo, missed Super Art. もちろん重要だが、hitbackを改善するなら、you need to inspect quieter frames.

Pause immediately after the opponent's pressure ends. What did you press? Did it fit the available time? Was it blocked? ガード後、自分はplusかminusか。Could you cancel? How much Drive remained? What distance did the exchange create? Treat all of that as one event.

Especially preserve cases where “the move did not hit, but the decision was correct.” 5中がguardされて-1でも、相手のsmall disadvantageに12Fの5強を振るより7Fで安全寄りに触ったdecisionは合理的かもしれない。Conversely, a random 5H Counter Hit for huge damage should not automatically be labeled success if the same choice repeatedly loses to 4F challenges.

Improve hitback at a unit smaller than wins and losses. **Evaluate whether the state transition matched your intention, not merely whether the move happened to hit.**

## 11. A five-minute drill should record “sequence end → hitback → post-block state,” not only the combo

The proposed practice is a boundary drill, not a combo drill. 直近で困ったopponentを一人だけ選び、その相手の「よくガードする技」をthree situationsに録画する。You do not need the whole matchup at once.

1. Record a move that is clearly punishable. Use a real guaranteed punish that reaches, such as 2L when appropriate. 「打ち返し」と混ぜない。
2. Record a move where the opponent is slightly minus but can still block. Test 5M, 2M, and 4H, checking which startup actually survives their 4F challenge and which options reach at that spacing.
3. Record a situation where the opponent tends to freeze. Test charged 4H, Phalanx, or H Quadriga and verify that the slower startup actually fits the read.
4. Randomize guard. If 2M is blocked, continue with Cancel Drive Rush only on repetitions where the gauge condition allows it. If 4H is blocked, accept -1 and do not force another button.
5. Mix the three recordings. Score “recognized sequence end,” “separated punish from reclaim,” “spacing matched,” and “respected gauge rule,” rather than raw hit count.

The goal is not only faster reactions. It is to build an internal mapping: “this visual cue → this speed → this range → this budget.” 一つずつ決めるほど、the number of live search candidates shrinks, and the “なんとなく” described in the video starts disappearing.

## 12. Turn the method into a reusable prompt and you can build a matchup-specific hitback textbook

This method is not limited to Marisa. If you research where each opponent's common sequence ends and which of your buttons fits afterward, you can build a matchup-specific hitback sheet. AIへ渡すなら、「おすすめ技は？」よりも、separate facts from conditions and ask for the decision architecture.

<div class="prompt-block">
<pre><code>【Goal】
For the current Street Fighter 6 version, design Modern Marisa's “hitback” choices against one specified opponent.

【Definition】
Hitback = the next action used when the opponent's sequence has ended and Marisa can choose again.
Keep guaranteed punishment separate.

【Research】
1. Check official or current-version frame data.
2. For the opponent's common moves, verify block advantage, cancel routes, and pushback.
3. For Marisa's candidate moves, verify startup, block advantage, cancelability, range, and Drive cost.
4. Recheck that no old-patch values were mixed in.

【Structure】
Classify each situation as:
A. Opponent sequence still connected
B. Guaranteed punish
C. Opponent is minus but can still guard = hitback
D. Opponent is likely to freeze, allowing a slower pressure tool

【Output】
・Facts: current frames and mechanics
・Interpretation: why each move is a candidate
・Proposal: two answers, with gauge / without gauge
・Failure conditions: what beats each choice
・Training Mode reproduction steps

Do not rank moves only by maximum reward on hit.
Evaluate the state after block, spacing, next branches, and remaining Drive Gauge.</code></pre>
</div>

The purpose of the prompt is not to freeze one answer forever. アップデートやopponentが変わっても、the same research sequence can rebuild the answer. If no textbook exists, owning the method for making one is more durable than memorizing a longer move list.

## 13. Reframe moves from “things that hit” into “tools that choose the next state”

The deepest change from applying the video to Modern Marisa is how moves are represented in memory. これまでは「2中＝牽制」「4強＝combo starter」「Phalanx＝接近」と、movesをnoun labelsで覚えがちだった。Hitback turns each one into a verb: “what state does this move create from here?”

2L certifies the end of the opponent's turn with minimum time. 5M reclaims initiative at 7F with limited block risk. 2M can buy another offensive state for 3 bars. 4H packages 8F, -1, and cancelability into a meterless candidate. Charged 4H and charged 5H spend time to create plus frames. Phalanx and H Quadriga are slower, but buy initiative after block.

This model refuses to declare one universal best button. 相手のminus、距離、remaining Drive、自分が欲しいnext stateでanswerが変わるからである。But the questions stay stable: **Did the sequence end? Is it guaranteed punishment? How much startup fits? What remains on block? What does it cost?**

Beyond Master, improvement is not only about learning unknown combos. The number of “vague” decisions made in familiar situations accumulates as a difference in reproducibility. 打ち返しは派手なtechniqueではないが、opponent's turn ends dozens of times in a set. Put the same questions on each small branch, and move selection gradually changes from atmosphere into design.

## 参考資料

- [りゅうせい「MR上げる為の超重要テク打ち返しを解説するりゅうせい【空跳つもり・スト6】」](https://www.youtube.com/watch?v=aZ5Hu8l2b_w)
- [SF6 Lab: MARISA Frame Data](https://sf6-lab.net/en/fighters/marisa/frame)
- [SF6 Lab: MARISA Combos, Okizeme & Setplay | SF6 Year 4](https://sf6-lab.net/en/fighters/marisa/combo)
- [すこれるブログ「モダンマリーザ 立ち回り・コンボ・起き攻め（Year4対応）」](https://www.sukoreru.com/sf6-modern-marisa)
- [CAPCOM: Street Fighter 6 Official Web Manual — Basic Fighting Ground Controls](https://game.capcom.com/manual/SF6/ja/ps5/page/2/3)
- [CAPCOM「2026年8月3日 バトル変更リスト（マリーザ）」](https://www.streetfighter.com/6/buckler/ja-jp/battle_change/20260803/marisa)
- [GAME Watch「『スト6』8月3日バトルバランス調整」](https://game.watch.impress.co.jp/docs/news/2129913.html)
- Related: [「有利を取ったあと、何を押すのか」](https://silovar-uk.github.io/myessays/#/essay/sf6-marisa-plus-frames-pressure?lang=ja)
- Related: [「走るためのラッシュで、なぜ止まるのか」](https://silovar-uk.github.io/myessays/#/essay/sf6-modern-marisa-drive-rush-as-probe?lang=ja)
- Related: [「マスターへの基礎力は、技を増やすより『読めなくても返せる』を増やす」](https://silovar-uk.github.io/myessays/#/essay/sf6-modern-marisa-master-foundations-training?lang=ja)

※Frame data and control assignments can change with future updates. This article uses data current as of October 2, 2026. ガード硬直差だけではpractical punishを断定できず、spacing, pushback, and cancel routes can change whether a response truly works.