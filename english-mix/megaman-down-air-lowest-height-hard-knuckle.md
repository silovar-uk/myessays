---
id: megaman-down-air-lowest-height-hard-knuckle
title: "ロックマンの空下は、強い3コマではメテオにならない――Timing the Hard Knuckle"
subtitle: "Startup, meteor window, reflection, and the lowest reliable down air"
created: "2026-10-11"
updated: "2026-10-11"
type: "リサーチエッセイ"
status: "完成"
tags: ["スマブラSP", "ロックマン", "空中下攻撃", "ハードナックル", "メテオ", "操作練習", "ゲーム研究"]
keywords: ["lowest down air", "startup", "meteor window", "reflectable", "short hop", "edgeguard"]
grow: 5
abstract: "Mega Man's down air is a timing puzzle. The stronger early hit does not meteor, the weaker late hit does, grounded targets launch differently, and reflection flips the result. 日本語で基礎を確かめながら、startup, landing lag, lowest reliable release, edgeguarding, training drillsをつなげて理解する。"
---

# ロックマンの空下は、強い3コマではメテオにならない――Timing the Hard Knuckle

**How to use this article:** Chapter 3 has an interactive timeline; chapter 6 explores the lowest timing boundary; chapter 7 diagnoses failures; chapter 8 tests decisions. 「空下研究所」はa hands-on companion to the article, not a full game emulator. Verify the final result on console.

## 1. 「速く当てる」が正解ではない / The three-frame paradox

Mega Man points down and launches a fist. それがハードナックル（Hard Knuckle）、つまり空中下攻撃だ。A fist falls. The opponent gets hit. So far, nothing mysterious.

But the first **three active frames, 23–25, deal 14% and do not meteor-smash**. The next ten, frames 26–35, deal 12% and send airborne opponents straight down. More damage is not the same as more danger. 何を最大化するかで、the correct timing changes.

The key variable is not only *when you press attack*, but **when the travelling fist meets the opponent**. 「最低空」もspeedrun of the buttonsではない。We will separate verified frame data, paper-based comparisons, and practical drills that still need testing in-game.

> **Evidence boundary:** Move properties are checked against published frame data. The drills and priorities below are practice proposals, not measured results from a live console experiment. 調査基準日：2026年10月11日。

## 2. 空下の基礎 / Down air is not automatically a spike

「空下」means **down aerial**, an attack input while airborne with the downward direction. The name does not guarantee downward knockback. Mega Man detaches his fist and sends it below him: an aerial attack whose striking object is treated as a **projectile（飛び道具）**.

A **meteor smash（メテオ）** launches an airborne opponent downward. But Mega Man's early and late hits behave differently, and the late hit also distinguishes grounded from airborne targets. “My down air connected” is not yet enough information to understand the result.

A useful mental model has five parts: **input, startup, active frames, target state, and landing recovery**. これらを混同すると、同じ技を覚えたつもりでも実戦判断を誤る。

## 3. 技を数字で分解する / Five numbers to remember

- **Frames 23–25:** early hit, 14% base damage, **not a meteor**; hits grounded and airborne targets.
- **Frames 26–35:** late hit, 12% base. Airborne target: **270° downward**; grounded target: **45° upward** using a separate hitbox.
- **14 frames:** ordinary landing lag if you land during the relevant part of the attack.
- **Autocancel windows（着地時の動作短縮）:** move frames 1–4 and 55 onward.
- **64 total frames:** the move can normally be interrupted starting on frame 65.
- **13-frame projectile lifetime; downward speed 4.2:** game-engine units, not screen pixels.

At the nominal 60 frames per second, 23 frames is about **0.38 seconds**. That is slow in a close-range exchange. Compare Mega Man's forward aerial at frame 9 and the first hit of back aerial at frame 4. The down aerial belongs less to reaction punishes and more to **preemptive space coverage（先置き）**.

Another detail: published hitbox radii shrink from **4.2 early to 3.0 late**. The meteor window is narrower in space even though it is longer in time. 一度出始めが当たった拳が、そのまま後半でもう一発当たる前提にはできない。The first contact matters.

Verified references: [Ultimate Frame Data](https://ultimateframedata.com/mega_man) and [SmashWiki's hitbox, angle, timing and projectile notes](https://www.ssbwiki.com/Mega_Man_(SSBU)/Down_aerial). **14% and 12% are base damage**, not a promise about every training-mode readout.

## 4. 同じ後半でも地上と空中で変わる / One fist, two launch directions

The late hit is a **state-dependent attack**. An airborne opponent gets a 270° meteor; a grounded opponent gets a separate **45° launch**, with different knockback parameters. 「後半だから絶対メテオ」は誤りだ。

Imagine covering an opponent's landing. Touch them **before** they become grounded and the fist may meteor. Touch them **after** landing and the late grounded hit launches diagonally up. The control input is identical. The opponent's state at contact is not.

The grounded late hit still has tactical value as a **tech-chase and positioning tool（受け身追跡・位置取り）**. But follow-ups are conditional. Damage, posture, stage position and your own landing recovery decide what is actually available.

## 5. 飛び道具という二重性 / A projectile with a strange mirror

Hard Knuckle lets Mega Man threaten below the ledge without moving his whole body there. But **projectile does not mean absorbable**. The hitbox data calls it **reflectable but not absorbable**. 反射と吸収は別の分類だ。

The strangest bit: the clean meteor hitbox has a special rule that **inverts its vertical launch component when reflected**, making it launch upward rather than downward. A descending fist becomes an upward threat. The mirror changes the *meaning* of the move, not just its ownership.

Against opponents with reflection options, the **safe projectile meteor** is not automatically safe. The opponent still needs the right timing and position, but you must treat the reflector as a real decision point before firing.

Japanese player references also describe a slight floating effect while the move begins. That does not turn a 64-frame animation into a reliable **stall tool（滞空手段）**. The small effect and the long commitment should be evaluated together.

Source check: [Detailed hitbox properties](https://www.ssbwiki.com/Mega_Man_(SSBU)/Down_aerial) / [Japanese character guide](https://wikiwiki.jp/ssbswitch/%E3%83%95%E3%82%A1%E3%82%A4%E3%82%BF%E3%83%BC/%E3%83%AD%E3%83%83%E3%82%AF%E3%83%9E%E3%83%B3).

## 6. 最低空の意味を定義する / Lowest practical release

「最低空空下」can mean two different goals: **minimize jump height**, or **fire a useful down aerial from the lowest workable height**. For a 23-frame startup, these goals may conflict. Lower is not always better.

The fist does not spawn immediately. **Startup is 23 frames**. Land before the move's projectile appears and there is no shot to hit with. Fire too close to the stage and the fist may reach the floor before reaching the intended opponent. A meaningful minimum height is a constraint, not a single magic input.

The target changes the geometry. Are you aiming at a grounded opponent? At someone below a platform? Or at a recovering opponent beneath the ledge? Stage collision and meteor timing matter differently. 「最低空」を測る前に、何を当てたいかを決める。

Mega Man's documented short-hop height is **11.49**, full-hop height **32.8**, with **3 frames of jumpsquat（跳び上がる前の準備）**. A fixed “press on frame X” recipe would pretend that drift, stage geometry and fast-fall timing never change. Instead we need a reproducible way to find the boundary.

## 7. 最低空を練習する / Find the lowest reliable shot

Start with a **full hop（通常ジャンプ）**, not the hardest possible shortcut. On a flat stage with a stationary opponent, use down + attack in the air. If the right stick is assigned to **tilt attacks（強攻撃）**, a downward flick gives cleaner separation between aiming and horizontal drift.

- **Drill 1 — Release, 10 reps:** Full hop → down air on the way up. Success = the fist actually appears.
- **Drill 2 — Lower it, 10 reps:** Short hop → down air early enough. If you land before firing, press earlier or delay fast-fall.
- **Drill 3 — Align, 10 reps:** Fix the horizontal starting point. Track where the fist travels and where Mega Man lands.
- **Drill 4 — Search the boundary, 20 reps:** Change **one variable at a time**—attack timing, jump type or starting position. Seek the lowest **repeatable**, not merely possible, release.
- **Drill 5 — Add a moving target, 20 reps:** Walking, jumping, landing, then recovering opponent. Score hits on the **intended state**, not just successful button inputs.

Separate failure into **three diagnoses**: (1) **no shot**—landed before frame 23; (2) **wrong space**—shot appeared but missed the intended column; (3) **wrong hitbox**—connected without a meteor. The third can mean the early hit touched first or the opponent was grounded. Different errors require different fixes.

**Fast-fall（急降下）is the trap.** A downward stick flick during descent increases fall speed. If you rush it while learning a frame-23 move, you may land before the shot exists. Establish reliable release **without** fast-fall first, then add it gradually.

Nintendo documents the **short-hop attack（小ジャンプ攻撃）** shortcut: jump + attack together. But a shortcut is not proof that Mega Man's long-startup fist will hit a useful target. For diagnosis, try separating short-hop input and down-air input. Two jump buttons together can also produce a short hop without immediately attacking.

Log three counts only: **successful releases / intended hits / safe recoveries**, each out of 20. If release is 20/20 but intended hits are 5/20, the problem is aiming, not startup. Reliable slightly-higher release usually beats a one-in-twenty “record low” in real matches.

References: [Nintendo's technique guide](https://www.smashbros.com/en_US/howtoplay/technique.html), [short-hop mechanics](https://www.ssbwiki.com/Short_hop) and [Mega Man movement stats](https://www.ssbwiki.com/Mega_Man_(SSBU)). Training mode's speed and frame-advance settings can help inspect the release; no unofficial mod is required for the basic drill.

## 8. 実戦で使う五場面 / When the fist actually earns its place

- **Vertical recoveries below ledge — high value:** Place the fist into the recovery column **before** the opponent arrives.
- **Committed recovery timing — high value:** Aim at the known ascent or vulnerable segment. Check individual invincibility windows and stage collision.
- **Opponent attacking from beneath your landing — situational:** A predictive challenge, not a frame-fast escape.
- **Tech-chase or get-up coverage — situational:** Late grounded hit launches **upward**, not into a meteor. Never assume the follow-up is guaranteed.
- **Platform-height setups — situational:** Added height buys startup time, but the fist's collision with geometry must be tested.

Lowest height matters when you need a short vertical gap. But against a recovering opponent below, **more height can buy the fist time to mature into its meteor hitbox**. Height is not wasted motion; it can be the budget that allows the move to become dangerous.

Player notes independently mention recovery interception, landing coverage and predictive challenges from above. These are **expert usage observations**, not matchup-by-matchup success-rate statistics.

Player perspective: [Mega Man usage notes](https://note.com/marei3/n/nb3369f85d604).

## 9. 振らない判断 / Why “safe meteor” is only half true

- **Point-blank danger:** frame-23 startup is too slow for many scrambles; consider faster aerials or movement.
- **Wide horizontal recovery drift:** the fist mostly travels down; lateral evasion defeats the column.
- **Active reflector threat:** projectile safety disappears.
- **Stage too close:** the fist may meet terrain before the target.
- **Insufficient recovery time:** 64 frames of animation can make *you* the one who fails to return.
- **Reactive air dodge or drift available:** visible preparation and a predictable trajectory are exploitable.

Some frame tables report roughly **+1 / 0 on shield**. That does **not** make every down air universally unpunishable. It is a particular projectile-contact situation. Shield-contact timing, landing timing, spacing and the opponent's options still vary.

A powerful hitbox is not the same as a good decision. Down air performs best after you have narrowed **where the opponent can go**.

## 10. 表示ダメージの落とし穴 / Multipliers change the label

If your damage counter disagrees with 14% or 12%, first check the rules. Short-hop aerials generally receive a **0.85× damage modifier**; standard one-on-one play has a **1.2× damage modifier**. These are separate from the move's base damage.

- Early **14% → 11.9%** with the short-hop modifier alone.
- Late **12% → 10.2%** with the short-hop modifier alone.
- Early **14% → 16.8%** with the 1v1 modifier alone.
- Late **12% → 14.4%** with the 1v1 modifier alone.
- Applying both multiplicatively: **14.28% / 12.24%** before display rounding and other effects.

So a low down air appearing weaker is not evidence of a height-based damage penalty. It may be the **short-hop modifier**. If the drill is about height, measure height and hit timing—not just percent.

Sources: [Nintendo technique guide](https://www.smashbros.com/en_US/howtoplay/technique.html) / [short-hop damage](https://www.ssbwiki.com/Short_hop) / [game context and character stats](https://www.ssbwiki.com/Mega_Man_(SSBU)).

## 11. 歴史的な背景 / The fist came from Mega Man 3

Hard Knuckle traces back to **Hard Man in Mega Man 3（ロックマン3）**, a 1990 Famicom title. The detached fist is not a random Smash animation; it is a reference to Mega Man's history of acquiring distinctive robot weapons.

From **Smash 4 to Ultimate**, records show **landing lag improving from 24 to 14 frames**, projectile duration increasing **11 to 13 frames**, and late grounded knockback parameters changing. The name survived, but the tactical economics changed.

Ten fewer landing-lag frames can soften the aftermath of a mistake. It does not erase the **frame-23 startup**. A buff to recovery after commitment is not a buff to winning every close-range race.

Background: [Capcom's Mega Man 3](https://captown.capcom.com/en/classic_games/11) / [Smash 4→Ultimate change record](https://www.ssbwiki.com/Mega_Man_(SSBU)).

## 12. 机上実験 / Three hypothetical fists

Now for a **thought experiment**, not a gameplay claim. We hold the frame data fixed and change only the target state and contact time. What conditions make each outcome possible?

- **Case A: airborne contact on frame 23.** 14% early hit; not a meteor. Accurate release is not enough.
- **Case B: airborne contact on frame 29.** In the 26–35 window, the meteor condition is satisfied. The travelling fist needs time.
- **Case C: grounded contact on frame 29.** Same move age, but the grounded 45° hitbox applies. Target state changes the result.

What this does **not** establish is the exact jump height that produces a frame-29 contact. Position, hitbox geometry, terrain and drift change it. Frame data tells us what to measure in training, not everything that will happen.

## 13. 30分メニュー / Practice for decisions, not clips

- **0–5 min:** 10 full-hop, 10 short-hop down airs; count successful releases.
- **5–10 min:** Search the lowest reliable shot; change input timing alone.
- **10–15 min:** Hit a stationary grounded target; compare early and late contacts without expecting a meteor.
- **15–20 min:** Add jumping or platform targets to study airborne contact.
- **20–25 min:** Practice pre-placing the fist into a vertical recovery lane; add specific recovery invincibility and reflector checks later.
- **25–30 min:** Practice **not** choosing down air: use faster aerials or movement when the situation demands.

You do not need to memorize every parameter at once. Week one: release and accuracy. Week two: meteor consistency. Week three: **when to decline the down air**. A repeatable explanation is more valuable than a one-off highlight.

## 14. 最低空より先に考えること / The lowest fist is not always the best

Before examining the data, it was simply a fist that goes down. Now it is a travelling object whose **job changes with time, target state and reflection**. The trajectory is simple; the outcome is not.

That reframes **lowest down air**. It is not a record for the smallest jump. You must survive startup, deliver the fist into the chosen space, allow it to become a meteor when needed, and still recover for the next play. The “minimum” is a **design boundary**, not a trophy.

The final oddity is almost poetic: to send the opponent downward, the punch often needs **a little time to age**. Mastery means creating that time before the opponent gets there.

## Sources and verification boundaries

- [Ultimate Frame Data — startup, active frames, landing, shield data](https://ultimateframedata.com/mega_man)
- [SmashWiki — precise down-air hitboxes, angles, projectile properties](https://www.ssbwiki.com/Mega_Man_(SSBU)/Down_aerial)
- [SmashWiki — Mega Man's stats, history and changes](https://www.ssbwiki.com/Mega_Man_(SSBU))
- [Japanese move guide — practical descriptions](https://wikiwiki.jp/ssbswitch/%E3%83%95%E3%82%A1%E3%82%A4%E3%82%BF%E3%83%BC/%E3%83%AD%E3%83%83%E3%82%AF%E3%83%9E%E3%83%B3)
- [Nintendo — short-hop attack input](https://www.smashbros.com/en_US/howtoplay/technique.html)
- [SmashWiki — short-hop modifiers](https://www.ssbwiki.com/Short_hop)
- [Competitive Mega Man notes](https://note.com/marei3/n/nb3369f85d604)
- [Capcom — Mega Man 3](https://captown.capcom.com/en/classic_games/11)
- [SmashWiki — training mode](https://www.ssbwiki.com/Training_Mode)

**Verified:** attack tables, angles, damage modifiers and reflector properties. **Inferred:** tactical priority and drill design. **Not measured here:** stage-specific minimum release height, 20-rep success rates and matchup hit rates. No invented test outcomes.
