---
id: ssbu-megaman-leaf-shield-four-leaves-commitment
title: "葉っぱ4枚の「盾」は、なぜガードを封じるのか――The Leaf Shield Paradox"
subtitle: "Frame data, movement, commitment, and practical decision-making in Smash Ultimate"
created: "2026-10-11"
updated: "2026-10-11"
type: "リサーチエッセイ"
status: "完成"
tags: ["スマブラSP", "ロックマン", "リーフシールド", "対戦ゲーム", "フレーム", "実戦研究"]
keywords: ["Leaf Shield", "down special", "rehit rate", "landing", "B-reverse", "stage control", "commitment"]
grow: 5
abstract: "A shield that stops you from shielding. That is the strange design of Mega Man's Leaf Shield in Super Smash Bros. Ultimate. 展開9F、再ヒット11F、発射後の硬直、そして旧作から削除された行動を調べ、landing, stage control and opponent adaptationを検討する。It is not an invincible barrier. It is a short-term commitment that trades your options for the chance to restrict theirs."
---

# 葉っぱ4枚の「盾」は、なぜガードを封じるのか――The Leaf Shield Paradox

You activate a shield. Then you discover you cannot shield.

That sounds like a joke, but it is a rule. In **Super Smash Bros. Ultimate**（『大乱闘スマッシュブラザーズ SPECIAL』）、ロックマンの下必殺ワザ「リーフシールド（Leaf Shield）」を展開すると、通常シールドとつかみが使えない。Four leaves orbit your body, dealing damage to nearby opponents. Yet they do not make you invincible.

So what exactly is this thing? A shield? A weapon? Or a temporary contract that restricts both players?

資料を読み進めると、別の問題も見つかる。Some online guides still mix mechanics from **Smash 4**（『スマブラfor』）with those of Ultimate. We must date the evidence before learning the strategy.

> **Research scope — October 11, 2026.** Mechanics refer to Smash Ultimate after the published balance patches through version 13.0.1. Frame data comes from public references; tactical recommendations are reasoned hypotheses. 本稿で新たな実機測定を行ったわけではない。

Before reading further, try a small experiment. What if the opponent rushes in? What if they patiently hold shield? 同じLeaf Shieldでも、the decision should change with the situation. Choose your prediction in the interactive lab, then compare it with the underlying mechanic and tactical reasoning.

<div data-leaf-lab="en-mix"></div>

The five views are Opponent / Frame Lab / Version / Decision Drill / Match Log. これは教育用の図と判断練習であり、actual hitbox geometry or win rates are not simulated. **The aim is to discover which conditions change the correct decision.**


## 1. そもそもリーフシールドは、木の葉でできた攻撃兼障壁である

There are two meanings of “shield” in a fighting game: the normal defensive action, and a move that happens to look like protection. Leaf Shield belongs to the second category.

入力は**下方向＋B**。Hold B to keep four leaves revolving around Mega Man while moving. Release the button—or reach the time limit—and the leaves are thrown forward. The orbiting leaves have damaging hitboxes; the thrown leaves can hit multiple times.

But **an active hitbox is not invulnerability**. 葉の間や判定の外から本体へ攻撃が届く場合がある。The shield might collide with a weak projectile, yet the character himself is not guaranteed safety.

The history is stranger. Leaf Shield originally belonged to **Wood Man**（ウッドマン）in *Mega Man 2*（『ロックマン2』、1988年）. In the original, Mega Man generally had to stay still to hold the leaves; movement launched them. Capcom identifies it as Air Man's weakness. A leaf weapon counters a giant fan. Sure.

Ultimate lets Mega Man move while holding it. However, movement freedom comes with **action restrictions**. 昔の制限が取り除かれたのではなく、別の形へ設計し直された。

## 2. 数字で見ると、葉っぱは「持続」と「拘束」の装置だった

A **frame**（フレーム）is one of the game's small time units; at 60 frames per second, 9 frames are roughly 0.15 seconds. **Startup**（発生）は最初の攻撃判定が出るまで。**Rehit rate**（再ヒット間隔）は同じ相手へ次に当たり得るまでの間隔だ。

Core numbers in the published Ultimate data:

- **Orbit startup: frame 9**（展開判定の発生9F）. Older launch-version reports of 7F are outdated after patch 3.0.0.
- **Orbit damage: 1.5% base per hit**（葉の接触1回の基礎ダメージ）.
- **Rehit interval: 11 frames**（再ヒット間隔11F）. It does not guarantee a hit every 11 frames.
- **Throw damage: 3.8% base per hit**（射出した葉の基礎ダメージ）.
- **Initial move duration: 35 frames, actionable from frame 36**（展開開始動作の全体35F）. This is not the total shield lifetime.
- **Throw total duration: 55 frames**（発射動作の全体55F）. Projectile lifetime and Mega Man's recovery are different quantities.
- **Hold extension: about 40 frames before automatic release**（保持の追加猶予約40F）. A Japanese reference describes the maximum duration as approximately 76F; the counted phases matter.

One-on-one damage modifiers, hit position, knockback and defensive movement can change what the game displays. Multiplying 1.5% by an imagined fixed number of hits gives false precision.

The lesson is not that one leaf deals enormous damage. It is that **repeated contact can interrupt an opponent's planned route**. 葉っぱは火力だけでなく、時間を奪う攻撃判定なのだ。

## 3. 操作を覚えるなら、「できること」より先に「できなくなること」を覚える

You can walk, run, jump and crouch with the leaves active. 空中での横移動も利用でき、着地地点を変えられる。This makes the move much more than a stationary trap.

But Ultimate disables **normal shielding, grabbing, item throwing and ledge grabbing** during the active shield. ほかの攻撃を自由に重ねることもできず、発射して硬直を引き受ける必要がある。

Here is the version trap. In **Smash 4**, players could shield and grab with Leaf Shield active. Some guides describe bonus damage while pummeling an opponent. That interaction does **not** carry over to Ultimate. Patch 3.0.0 also removed an item-throw interaction in Ultimate and changed startup from 7F to 9F.

Another advanced detail is **B-reversing / wavebouncing**（必殺ワザの入力を使って空中の向きや移動を変える操作、通称「空中ダッシュ」）。Japanese competitive references list Leaf Shield as compatible. It is an input-timing technique, not permission to change direction freely during the entire hold.

The shield generally flies **forward, relative to Mega Man's facing direction**. 原作のように上下左右へ自由に撃ち分けられるわけではない。Changing your facing and choosing a projectile direction are separate questions.

## 4. 防御力を誤解する原因は「葉の判定」と「本体の安全」の混同にある

A shield-shaped animation can create false confidence. The move is **not blanket invincibility or super armor**. 無敵（invulnerability）は攻撃が当たらないこと。スーパーアーマー（super armor）は当たっても一定条件でひるまないこと。Leaf Shield guarantees neither simply because leaves are visible.

Separate incoming threats into three cases.

1. **Small frontal projectiles**（前から来る小さな飛び道具）can collide with leaves, depending on timing and position.
2. **Long-range disjointed attacks, overhead attacks and grabs**（長い武器、上からの攻撃、つかみ）can exploit the distance or lack of normal defenses.
3. **Patient shielding**（落ち着いたガード）can absorb the multi-hits and threaten a punish after the release.

A collision between projectiles is a local event. **Being safe is a whole-position judgment**. 葉っぱが一発止めたかより、相手の接近を中止させられたかを見る方が実践的だ。

## 5. 実戦で強いのは、殴りに行くときより「相手の選択肢が減った」ときだ

### Landing: defend the destination, not the animation

Mega Man can have trouble returning to the ground after being launched upward. 空中で葉を出し、真下の相手へ突っ込めば必ず助かるわけではない。

When an opponent chases your airborne route, you can put the orbiting hitbox in that path. When the opponent stays on the ground and shields, change your landing location instead. **Use B-reverse movement to shift the target**, not merely to show off technical input.

The objective is a safe landing, not maximum leaf damage.

### Close range: preempt the approach

Frame-9 startup is not a universal panic button. 相手が密着で先に攻撃を出しているなら、葉の発生前に被弾する。

A better situation is an opponent taking **one more step inward**. Activate before they reach the dangerous range. If they stop and hold shield, do not blindly push all four leaves into their guard.

### Stage control: reclaim territory

When cornered, you can sometimes move forward behind orbiting leaves and make a cautious opponent retreat. **Stage control**（ステージ上の有利な位置取り）が目的なら、命中しなくても中央へ戻れば成果になる。

But a defending opponent can wait for the throw. 出した後にどこへ着地・移動するかを先に決める。If the opponent refuses to move, you must respect the risk of your recovery frames.

### Ledge pressure and edgeguarding

Leaf Shield may threaten a predictable ledge-jump route or a recovering opponent's limited path. 相手の移動経路が狭いほど、葉の置き場所を決めやすい。

Deep offstage use is much riskier. **You cannot grab the ledge while the shield is active**, and the release has commitment. If you run out of height or remaining jumps, a defensive-looking move can cause your own defeat.

### Projectile matchups: one block is not a winning strategy

Stopping a weak projectile can help your approach. Yet the opponent can throw another, jump over you, or punish the release. **The right question is whether the shield buys better position**. 反射ワザを持つ相手なら射出の危険も加える。Defeating one projectile is not the same as winning neutral.

## 6. 結局、いちばん危ない相手は「落ち着いてガードする人」なのではないか

Leaf Shield creates an impressive amount of visual noise on a blocking opponent. Lots of hits, lots of sound. It feels aggressive.

But **pressure is not automatically safety**. The defender might hold shield through the sequence and punish the ending. 多段技のため、ガード漏れや相手の操作ミスに当たることはある。ただし、それを確定のガード崩しとして設計するのは危険だ。

Watch the response instead. Does the opponent jump, retreat, shield, or challenge? If they retreat, you can gain ground. If they shield and wait, your own action lock becomes the problem.

This is a two-sided commitment. **You take options away from the opponent by temporarily giving up some of your own.** 互いの選択肢が減るからこそ、先に「終了後の場所」を決めておく必要がある。

## 7. 玄人向けの論点は、数字の暗記より「いつ自由を取り戻すか」だ

- **Rehit rate and escape**（再ヒット間隔と抜け）: 11F does not imply a guaranteed combo. Spacing, knockback and defensive movement all matter.
- **Projectile duration vs. endlag**（飛び道具の持続と動作後の隙）: the leaves may still be active after Mega Man's action state has changed, and vice versa.
- **Unexpected facing changes**（相手の向きの変化）: general series references mention cases where orbiting leaves reverse an opponent. Ultimate-specific reproduction conditions need independent verification; do not build a guaranteed setup around it.
- **Item interactions**（アイテムとの特殊操作）: default Ultimate play forbids item throws during the hold. Some advanced community documentation describes niche movement/item-cancel behavior, but its practical conditions were not verified here.
- **The ledge restriction**（崖つかまり不能）: a move performed from a safe ledge position and the same move performed from too low offstage have radically different risk profiles.
- **Patch history**（更新履歴）: early Ultimate at 7F, later Ultimate at 9F; shielding and grabs belong to Smash 4, not the current game.

Technical mastery starts by knowing **when you get your ordinary actions back**, not simply how long the pretty animation lasts.

## 8. あえて面倒な実験をする――トレーニングモードの検証帳

This is a proposed **training-mode protocol**, not a report of experiments already completed. Keep damage, location and opponent behavior consistent. Do ten trials per condition and write down the results.

1. **Startup**（発生）: activate at point-blank, outside enemy range and along an incoming jump path. Count successful interceptions.
2. **Release timing**（発射時機）: compare tap, short hold and maximum hold. Record projectile launch and the first possible subsequent action separately.
3. **Hitbox vs. hurtbox**（攻撃判定と被攻撃判定）: compare a weak projectile, overhead attack, long weapon and grab. Did a leaf collide, or was Mega Man hit?
4. **Shield pressure**（ガードへの攻め）: test at point-blank, maximum contact range and from the air. Record the defender's successful punishes.
5. **Landing**（着地）: compare straight descent, sideways drift and B-reversed Leaf Shield against a chasing opponent versus a waiting opponent.
6. **Offstage risk**（崖外の危険）: repeat with and without a remaining jump. Test recovery only in training, before gambling with a real stock.
7. **Adaptation**（相手の適応）: repeat the situation ten times against a human and classify responses as shielding, jumping, retreating or challenging.

Suggested columns: **situation / input / opponent response / hit / punish received / final position / next adjustment**（状況／入力／反応／命中／被反撃／終了位置／修正）.

Ten trials are not a scientific proof. They are a practical remedy for calling a move “broken” after one lucky interaction.

## 9. 迷ったときの判断表――使う場面と、やめる場面

**Good candidates（使いやすい状況）**

- 相手が直線的に踏み込んでくる。**Intercept before contact**, rather than react after getting hit.
- 相手の着地狩りの追走経路を読める。**Protect a landing route**.
- 自分が端にいて、相手が下がりやすい。**Reclaim stage space**.
- 相手の崖上がりやジャンプ経路が絞られている。**Cover a predictable path**.

**Bad candidates（避けたい状況）**

- The opponent calmly holds shield and waits for the throw.
- 葉の外から長い武器やつかみが届く。
- You are low offstage and the release lock may prevent ledge recovery.
- 反射を構えられており、発射方向が読まれている。
- You have not decided where you will go **after** the projectile release.

One compact rule: **Don't ask only “Will the leaves hit?” Ask “Where will I be after the throw?”** 命中率だけではなく、終了後の位置までがワザの性能だ。

## 10. わずか4枚の葉が教えるのは、「強いワザ」と「自由なワザ」は違うということ

In the original *Mega Man 2*, moving launched the shield. In Smash Ultimate, you can move with it—but you lose shielding and grabbing, and eventually the leaves throw themselves.

Was the move made freer? Only in one sense. **Mega Man exchanges freedom of action for freedom of movement**. その取引が有利になるのは、相手の接近や追撃を妨げられるとき。不利になるのは、相手だけが待つことを許されているときだ。

Four leaves. About a second of tactical consequences. A strangely strict contract for something that looks like an autumn decoration.

The paradox now makes sense. Leaf Shield is not mainly a wall. **It is a way to renegotiate where the next interaction will happen.** 葉っぱが守っているのは、体力よりも「次の一手を選べる場所」なのかもしれない。

## 参考資料・検証上の注意

- [Ultimate Frame Data — Mega Man](https://ultimateframedata.com/mega_man) — startup, damage, rehit and duration.
- [SmashWiki — Mega Man (SSBU)](https://www.ssbwiki.com/Mega_Man_(SSBU)) — patch changes and action restrictions.
- [SmashWiki — Leaf Shield](https://www.ssbwiki.com/Leaf_Shield) — historical context; its general overview includes legacy mechanics not valid in Ultimate.
- [スマブラSP 攻略 Wiki* — ロックマン](https://wikiwiki.jp/ssbswitch/ファイター/ロックマン) — movement, aerial reversing, maximum holding and offstage cautions.
- [スマブラSPECIAL 検証wiki — 攻撃判定](https://w.atwiki.jp/smashsp_kensyou/pages/146.html) — definition of rehit and collision terminology.
- [Capcom — Air Man](https://news.capcomusa.com/lets/browse/mmlc-robot-master-list-air-man) — original-weapon history.
- [Nintendo — Mega Man II manual (Japanese)](https://www.nintendo.co.jp/data/software/manual/manual_RCDJ.pdf) — historical weapons, not Ultimate frame data.
- [JustNAir — Mega Man matchup compendium](https://www.justnair.com/mu-compendium/46-mega-man) — supplementary shield-punish considerations.

**Evidence policy:** Current Ultimate frame and patch sources supersede cross-game descriptions. Practical scenarios are derived advice, not new measurements or guaranteed combos.
