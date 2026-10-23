---
id: sf6-arjun-leverless-classic-input-atlas-2026
title: "アルジュンのレバーレス入力大全｜A Practical Input Atlas"
subtitle: "Classic 1P / true-neutral SOCD――learn the motion, then choose the situation"
created: "2026-10-24"
updated: "2026-10-24"
type: "攻略・技術リサーチ"
status: "完成"
tags: ["ストリートファイター6", "アルジュン", "レバーレス", "English Mix", "守破離"]
keywords: ["Street Fighter 6", "Arjun", "leverless", "SOCD", "323", "636", "command inputs"]
grow: 5
abstract: "クラシックアルジュンの入力を7種類の動作に再整理したEnglish Mix版。Start with reliable commands, distinguish confirmed alternatives from untested ideas, and turn input accuracy into match decisions. 日本語正本と同じ図解・技情報・出典を収録する。"
---

# アルジュンのレバーレス入力大全
### A practical input atlas for Classic Arjun――323, 236, 214, command grab, counter, and Super Arts

*Research date: October 24, 2026. Assumptions: Classic controls, player-one side, Left + Right = neutral and Up + Down = neutral. Some alternate inputs are documented by the controller manufacturer, but not every interaction has been retested on the current Arjun build.「確定」と「実戦仮説」を区別する。*

![アルジュン・カプコン公式発表画像](https://prcdn.freetls.fastly.net/release_image/13450/6108/13450-6108-6848b12f28723ab664fe46bcd7bf5c37-1920x1080.png?auto=webp&bg-color=fff&fit=bounds&format=jpeg&height=1350&quality=85%2C65&width=1950)

*Image: [Capcom press release, October 13, 2026](https://prtimes.jp/main/html/rd/p/000006108.000013450.html). Rights belong to their respective holders. The diagrams below were created for this guide.*

アルジュンを練習するとき、技名から覚えると information overload が起きる。Yet most inputs belong to a small set of motion families. 岩を置く、ガードさせて回復可能な体力を蓄積する、肩で突進する、コマンド投げを通す。The character's strategic choices are diverse, but the physical motions can be grouped into seven patterns. [Official character introduction](https://prtimes.jp/main/html/rd/p/000006019.000013450.html)

![Seven input families for Classic Arjun](https://silovar-uk.github.io/myessays/assets/arjun-leverless-command-atlas.svg)

*Figure 1. Input-family overview. Numbers are numpad direction notation, not move startup frames.*

## 最初の30秒｜技から入力を探す

- **Anti-air / shoulder**：厳酷な岩肩＝623＋P. Crouching alternative: **323＋P**; walking alternative: **636＋P**.
- **Pressure**：大義の巨腕＝236＋P, followed by 6＋P for 追撃.
- **Projectile starter**：息吹の円筒＝236＋K; its follow-up 息吹の震撼 uses 6＋P.
- **Rock setup**：神気の巨巌＝214＋K. Button strength chooses distance; hold K to delay timing.
- **Command grab**：鬼気迫る尋問＝63214＋P.
- **Counter / extension**：不撓の警衛＝22＋強K. While holding 強K, press P for 倫理の崩壊.
- **Super Arts**：SA1 破壊の蛮声＝236236＋K; SA2 忘却の一槌＝214214＋P; SA3 秩序の鬼神＝236236＋P.
- **Movement and systems**：66 / 44 for forward/back dash, 中P＋中K for parry, 強P＋強K for Drive Impact, dash or designated button input for cancel Drive Rush.

Moves cross-checked against the [Arjun move list](https://sf6-genten.com/character/arjun), [GAME Watch preview](https://game.watch.impress.co.jp/docs/preview/2144359.html), and [Dengeki's command reference](https://dengekionline.com/article/202610/89267). Note: “move exists” and “this leverless shortcut is confirmed” are not the same statement.

## 守｜指を速く動かす前に、ゲームが何を読んでいるか

The first principle is **physical keys ≠ in-game direction**. レバーレスは押しているボタンと画面に出る方向を分けて考えられる。SOCD means Simultaneous Opposing Cardinal Directions――反対方向の同時入力をどう処理するか、という仕組みだ。

For this guide we use **true neutral**: Left + Right = neutral; Up + Down = neutral. The traditional Hit Box default of Up winning over Down is different. A shortcut built for up-priority can fail under true neutral. [Hit Box Arcade, SOCD modes](https://www.hitboxarcade.com/blogs/hit-box/socd-modes-on-hit-box)

In numpad notation, 1=↙, 2=↓, 3=↘, 4=←, 5=neutral, 6=→, 7=↖, 8=↑, 9=↗ when facing right. P means punch; K means kick. The **direction of facing**, not your controller's permanent layout, defines “forward.”

### 236｜大義の巨腕・息吹の円筒

**Standard motion: 2→3→6＋P/K.** Hold Down, add Right, release Down, and press the attack button. One left-hand motion, two different right-hand endings. P gives 大義の巨腕; K gives 息吹の円筒. Practice their follow-up 6＋P as part of the complete action, not as an isolated extra button. [GAME Watch](https://game.watch.impress.co.jp/docs/preview/2144359.html)

The practical danger is accidental 623. If you walk forward immediately before a quarter-circle, the earlier forward input can still be part of what the game recognizes. 236を出したいのに肩が出たら、まず入力履歴を確認する。Don't assume you simply pressed P too late.

### 623・323・636｜厳酷な岩肩

**623 is the standard motion**: forward, down, down-forward + P. But an alternate route can preserve a more useful posture.

**323 crouching motion**: hold Right + Down (3), add Left (opposites neutralize, so the game sees 2), release Left (back to 3), then P. In other words, **hold two keys, tap the opposing key once, release it**. This is a state change, not an attempt to press everything faster.

![323 leverless step-by-step](https://silovar-uk.github.io/myessays/assets/arjun-leverless-323-steps.svg)

*Figure 2. Blue buttons are held down. Works as shown under the Left + Right = neutral assumption.*

**636 walking motion**: hold Right (6), add Down (3), release Down (6), then P. The controller maker documents both 323 and 636 as valid alternate dragon-punch motions in SF6 testing. ただし、記事の一部はベータ時点の検証。Current-Arjun success, consistency, and distance should still be checked in Training Mode. [Hit Box Arcade: DP shortcuts](https://www.hitboxarcade.com/blogs/hit-box/sf6-dp-shortcuts)

You can also try **313**, moving from down-forward to down-back and back while holding Down. It appears in the manufacturer's catalog, but may insert a neutralized 2 in the actual input log. Prioritize 323; treat 313 as advanced research, not a required skill. And remember: アルジュンの「厳酷な岩肩」はリュウの昇龍拳と同じ技性能ではない。

### 214｜神気の巨巌

**Standard 214＋K**: Down → Down-Back → Back. Press Down, add Left, release Down. The critical variable is not maximum input speed. It's **where and when the rock appears**. Weak, medium and heavy K select placement; holding the button changes the timing. OD combinations provide additional choices. [Dengeki's Arjun guide](https://dengekionline.com/article/202610/89267)

設置技の速度だけを磨くと、距離判断や発生タイミングの理解が置き去りになる。Make one motion reliable, then vary K strength and hold duration deliberately.

### 63214｜鬼気迫る尋問

**Standard command grab: 6→3→2→1→4＋P**. Here's a leverless-friendly sequence: press Right; add Down; add Left (opposites neutralize, giving 2); release Right (now 1); release Down (now 4); press P. No magical finger slide required.

This is an operational hypothesis for **how to produce the full standard command**, not a claim that the game accepts a newly discovered shortcut. Verify all five directions in the input history. If 3 or 1 is missing, simplify your finger movement before trying to speed up.

The real payoff comes from the situation: make the opponent block, then threaten a command grab. アルジュンは回復可能な体力の有無で投げの効果が変わるため、入力の前に「投げられる状況を作れているか」が重要になる。[GAME Watch](https://game.watch.impress.co.jp/docs/preview/2144359.html)

### 22｜不撓の警衛、強K保持からの倫理の崩壊

**Standard input: 22＋強K.** Tap Down twice with a release between them. Hold Heavy Kick and press P for 倫理の崩壊. The two-step technique is important: first obtain the counter stance, then choose whether to extend it. [Move list](https://sf6-genten.com/character/arjun)

**Research-only variation**: keep Down held, tap Up to force neutral, release Up to return to Down. The theoretical sequence is **2→5→2** with this SOCD setting. Whether SF6 accepts that exact input as 22 has *not* been tested here. Do not label it an established shortcut. 下2回の標準入力を先に安定させる。

### 二回入力｜SA1・SA2・SA3

**SA1 = 236236＋K; SA2 = 214214＋P; SA3 = 236236＋P.** Three separate endings, two motion patterns. The most dangerous mix-up is to do the right motions with the wrong attack button――SA1 ends with K, not P.

Record both sequences in your input history. For an SA cancel, also check whether the move could be canceled at that moment. A correct command entered outside the cancel window doesn't demonstrate a command failure. SA3 becomes Critical Art (CA) when health is at or below 25%. [Arjun move reference](https://sf6-genten.com/character/arjun)

### 66・44・同時押し｜移動、ラッシュ、特殊技

Forward dash is 66; backdash is 44. **Parry Drive Rush** begins from a parry stance, then forward-forward. **Cancel Drive Rush** is performed from a cancelable normal using 66 or the designated directional + Medium Punch + Medium Kick input. These are separate workflows, even if both create a green rush. [Drive system overview](https://kakuge-checker.com/topic/view/07717/) / [Advanced input mechanics](https://sf6-genten.com/advanced)

アルジュンの特殊技もまとめておく：6＋強P「仁義の一刀」、6＋強K「頑強な跳舞」、中K→強K「規律の躍動」、強P→強P「不敵の調べ」、強P→強P→強P「鎮圧」、強P→強P→強K「追跡」、強K→強P「無情の拳」。These don't need exotic SOCD tricks. Assign consistent fingers and distinguish the HP-heavy versus HK-to-HP chains. [Full command list](https://sf6-genten.com/character/arjun)

## 破｜「最速」を捨て、失敗する原因を切り分ける

A failed move is not one diagnosis. For 323, you could have the wrong SOCD mode, a missing Down interval, P pressed before releasing Left, an excessive gap before P, or a move that could not start during recovery. Treat these as different experiments.

![Training-mode diagnostic guide](https://silovar-uk.github.io/myessays/assets/arjun-leverless-training-diagnostics.svg)

*Figure 3. This is a troubleshooting guide, not a fabricated screenshot of the game's input history.*

### 「8F」をどう扱うか――公式確認と攻略報告を分ける

The frequently quoted **8F from final direction to P** for dragon-punch motions appears in community guides, including the [SF6 beginner wiki](https://w.atwiki.jp/sf6begin/pages/128.html). But we did not verify an official Capcom statement confirming this limit for every current Arjun variant. Therefore, this guide labels **8F as a community-reported value**, not a definitive official rule.

By contrast, Capcom's May 2024 patch changed the input recognition time for grounded 236/214 motions from 11F to 9F, and for half-circle motions from 12F to 9F. SA motion retention and general action buffers are different mechanisms. **Never mix up 8F, 9F, startup frames, and input-buffer windows.** [Change history](https://sf6-genten.com/advanced) / [2024 patch report](https://www.shacknews.com/article/139959/street-fighter-6-version-202405-patch-notes)

Use the input history to identify how long the *final diagonal alone* was held before P. Try 5F, 7F, 8F, and 9F under the same conditions, ten trials each. The boundary may be affected by how displayed hold duration and internal recognition are counted, so single-trial success is insufficient evidence.

### 技ごとの「やらない方がよい最適化」

Don't optimize what you haven't diagnosed. Keep standard 236 until accidental DP is understood. Don't force 323 on every anti-air. For 214, improve rock placement, not only command speed. For 63214, confirm all five directions before experimenting with omissions. For 22, don't promote untested SOCD behavior to a proven technique. For SA, separate motion execution from cancel timing.

## 再検証｜15分で改善を測るトレモ手順

1. **Minutes 0–3**: 10 repetitions of 323. Classify failures: missing 2, premature P, or too-long final 3.
2. **Minutes 3–6**: five each of 236P, 236K, and 214K. Observe technique identity, button strength, rock placement.
3. **Minutes 6–9**: five each of 63214P and 22＋強K. Add the held-K to P extension.
4. **Minutes 9–12**: three each of SA1, SA2, SA3. Confirm the final button and cancel conditions.
5. **Minutes 12–15**: ten randomized scenarios: jump-ins, guard pressure, setup opportunities. Choose the motion based on the situation.

Record success rate, unintended move, and final-direction-to-button frame count. The suggested **90% success** is a training target, not a game-engine specification. 再現性は、一度だけ出た最速入力より価値がある。

## 離｜本当に身につけたいのは技のコマンドではなく、場面の切替能力

Arjun's core loop is not “perform every move quickly.” You use a rock setup to shape movement, pressure blocking opponents with recoverable damage, and threaten a hit or grab to cash it out. If practice never changes *which move you choose and when*, the character won't become much stronger.

Think in states: **crouching defense → 323**, **forward movement → 636**, **space control → 214**, **blocking opponent → 63214**, **callout against an attack → 22**, **confirmed damage opportunity → SA**. These are practical hypotheses, not universal prescriptions. Distance, move property, resource level, and opponent adaptation still matter.

The deeper insight: **leverless isn't only about shortening motions; it's about preserving a useful state while changing one input at a time**. That is why 323, 636, and 63214 each offer a different kind of control. The point of studying the inputs is to make decision-making easier under pressure.

## 2P側・短い反転早見表

When facing left, the physical forward button is Left and back is Right. **The notation remains relative to the character.**

- 323 from 2P: hold Left + Down, add Right, release Right, then P.
- 636 from 2P: hold Left, add Down, release Down, then P.
- 236, 214, and 63214: swap physical Left/Right.
- SA, 22, and attack-button combinations do not change their button types.

## 出典と検証状態

**Primary / near-primary**: [Capcom launch release](https://prtimes.jp/main/html/rd/p/000006108.000013450.html), [Capcom gameplay introduction](https://prtimes.jp/main/html/rd/p/000006019.000013450.html), [Hit Box Arcade: DP alternate inputs](https://www.hitboxarcade.com/blogs/hit-box/sf6-dp-shortcuts), [Hit Box Arcade: SOCD modes](https://www.hitboxarcade.com/blogs/hit-box/socd-modes-on-hit-box).

**Cross-checks**: [Arjun move list](https://sf6-genten.com/character/arjun), [GAME Watch preview](https://game.watch.impress.co.jp/docs/preview/2144359.html), [Dengeki Online command reference](https://dengekionline.com/article/202610/89267), [SF6 beginner wiki](https://w.atwiki.jp/sf6begin/pages/128.html), [patch / input system review](https://sf6-genten.com/advanced).

**Evidence labels**: basic move names and motions = cross-checked. 323/636/313 = documented by manufacturer, but some documentation dates to beta tests. True-neutral SOCD = defined mode behavior. 8F = community-reported, not independently reproduced here. Up/Down neutral trick for 22 = **untested theory**. Drills and tactical choices = editorial recommendations. Game patches may alter timings.

*English Mix preserves the Japanese canonical article's claims, source links, images, and basic structure. This is not a full translation; English appears where it sharpens a practical idea.*
