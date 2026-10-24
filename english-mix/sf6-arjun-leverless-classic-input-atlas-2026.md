---
id: sf6-arjun-leverless-classic-input-atlas-2026
title: "アルジュンのレバーレス入力大全｜Press, Release, Hold"
subtitle: "A practical finger-by-finger guide to 323, 636, quarter-circles, command grabs, counters and Super Arts"
created: "2026-10-24"
updated: "2026-10-24"
type: "攻略・技術リサーチ"
status: "完成"
tags: ["ストリートファイター6", "アルジュン", "レバーレス", "English Mix", "薬指", "守破離"]
keywords: ["Street Fighter 6", "Arjun", "leverless", "SOCD", "ring finger", "323", "636", "236", "214", "63214"]
grow: 5
abstract: "クラシックアルジュンの運指をPress, Release, Holdという動作で理解するEnglish Mix。薬指不要の323、左右相殺323、636、214、半回転投げ、当身、スーパーアーツの押下状態を日本語正本と同じ図で比較し、finger independence、トレモ診断、左右差、身体への負担、15分練習法まで整理する。"
---

# アルジュンのレバーレス入力大全
### Press, release, hold――コマンドを「記号」から「指の動き」に変える

*Updated October 24, 2026. Classic Arjun in Street Fighter 6. Our default viewpoint is player one, facing right. SOCD mode: Left+Right=neutral and Up+Down=neutral. Confirmed standard commands, manufacturer-documented alternatives, and original training hypotheses are clearly separated.*

![Official Arjun promotional image](https://prcdn.freetls.fastly.net/release_image/13450/6108/13450-6108-6848b12f28723ab664fe46bcd7bf5c37-1920x1080.png?auto=webp&bg-color=fff&fit=bounds&format=jpeg&height=1350&quality=85%2C65&width=1950)

*Image: [Capcom's October 13, 2026 launch announcement](https://prtimes.jp/main/html/rd/p/000006108.000013450.html). Game image copyright remains with the rights holder. All input-state diagrams below are newly authored for this guide.*

レバーレスで難しいのは、memorizing 236 or 63214 ではなく、**which finger to keep down, which finger to add, and which finger to release**. For example, a 323 dragon-punch motion can be done by tapping the opposing Left key, but **you don't actually need your ring finger on 1P**. Instead, hold Down and briefly release/repress Right. Same command, different movement—and potentially a much better fit for your hand.

This guide starts from input states and ends with decisions in a real match. The aim is consistency, not a record-setting fastest input. 技の正式名称・コマンドは[アルジュン技表](https://dengekionline.com/article/202610/89267)、キャラクター特性は[カプコン公式](https://prtimes.jp/main/html/rd/p/000006108.000013450.html)で確認する。

## まず結論｜実戦で最初に使う入力はこれ

- **Crouching anti-air / shoulder**：厳酷な岩肩＝323＋P。1Pでは **hold Down, release Right, press Right again** がring-finger-free。
- **Walking shoulder**：636＋P。Hold Right, tap and release Down. Good when already moving forward.
- **Pressure and projectile**：大義の巨腕＝236＋P、息吹の円筒＝236＋K。Same direction motion; different attack button.
- **Rock placement**：神気の巨巌＝214＋K。Down, Down-Back, Back. Ring-finger coordination matters on 1P.
- **Command grab**：鬼気迫る尋問＝63214＋P。Focus on the **release order**, not just pressing faster.
- **Counter**：不撓の警衛＝22＋強K。Down, release, Down+Heavy Kick; keep Heavy Kick held and use P for 倫理の崩壊.
- **Super Arts**：SA1=236236＋K; SA2=214214＋P; SA3=236236＋P.
- **Shared systems**：66/44 dash, 中P＋中K parry, 強P＋強K impact, 弱P＋弱K throw.

For a real practice session, skip straight to the command you miss most and check its input history. Don't drill every shortcut at once.

## 守｜「ゲームが読む方向」と「指が押すボタン」は違う

Numpad notation is relative to where your character faces: 6=Forward, 4=Back, 2=Down, 3=Down-Forward, 1=Down-Back, 5=Neutral. On 1P, forward is the physical Right button. Standard finger assignments are usually **ring=Left, middle=Down, index=Right, thumb=Up**, but layouts and hand sizes vary.

SOCD is the system that resolves **Simultaneous Opposing Cardinal Directions**（同時逆方向入力）. In the true-neutral mode used here, pressing Left and Right cancels the horizontal direction. Therefore **Left+Down+Right is read as Down**. Up+Down also becomes neutral, which is *not* the same as the traditional Up-priority Hit Box mode. [Hit Box Arcade's official SOCD guide](https://www.hitboxarcade.com/blogs/hit-box/socd-modes-on-hit-box)

The visual charts show four physical buttons in the order ← ↓ → ↑. **Blue buttons = physically held. The number on the right = what the game reads.** これは実機の外観図ではなく、入力状態の模式図。実機のボタン配置は[製品解説・写真](https://www.hitboxarcade.com/blogs/hit-box/hit-box-info-page)にある。

### 236 and 214｜同じ「押す→足す→離す」なのに、指は違う

![Leverless input states for 236 and 214](https://silovar-uk.github.io/myessays/assets/arjun-leverless-visual-236-214.svg)

*Figure 1. The two quarter-circle families shown as key-state changes, not joystick rotations.*

**236+P/K**: press Down with the middle finger; add Right with the index finger; release Down while keeping Right; press P or K. P creates 大義の巨腕, K creates 息吹の円筒. The follow-up for both families uses 6+P, with different follow-up names. The first motion is identical, so learn **one left-hand sequence plus the right attack button choice**. [Move list](https://sf6-genten.com/character/arjun)

**214+K**: press Down; add Left with the ring finger; release Down; press K. This gives 神気の巨巌. The ring finger is involved because Back is a physical Left input on 1P. Don't start by forcing fast, independent ring-finger movement. First make a reliable Down+Left state; then introduce the final K. Button strength chooses rock distance, and holding the kick changes timing. [GAME Watch](https://game.watch.impress.co.jp/docs/preview/2144359.html)

Troubleshooting: if 236 produces another move, inspect the *preceding* input history. A leftover forward walk may cause the game to interpret the motion as a dragon-punch family rather than a quarter-circle. [Practical input-history diagnosis](https://hiyoko-lab.com/streetfighter6_hiyoko/traning_enter-history/)

### 623 and 323｜薬指を使わないしゃがみ昇竜

**623+P** is the standard motion. But in SF6, the manufacturer documents alternate paths such as 323, 636, and 313. They are better understood as *alternate motion routes* rather than necessarily fewer direction inputs. [Hit Box Arcade's SF6 DP alternatives](https://www.hitboxarcade.com/blogs/hit-box/sf6-dp-shortcuts)

![Two ways to make 323: no ring finger versus SOCD ring-finger tap](https://silovar-uk.github.io/myessays/assets/arjun-leverless-visual-323.svg)

*Figure 2. Same recognized motion, different fingers. Choose based on what your hand can repeat comfortably.*

**Method A: ring-finger-free 323 (best starting point for many 1P players).**

1. Hold Down + Right: game reads **3**.
2. Keep Down held and **release Right**: game reads **2**.
3. Repress Right and press P: game reads **3+P**.

That is all. Middle finger stays on Down, while the index finger does the release-repress. The ring finger never moves. **This is a major correction to the earlier draft**, which overemphasized tapping the opposing Left key.

**Method B: SOCD-based 323 (uses the ring finger).**

1. Hold Down + Right (**3**).
2. Tap Left while continuing to hold the other two keys. Left and Right cancel, leaving **2**.
3. Release Left, returning to **3**, and press P.

This has an advantage: Down and Right never have to be released. But it may be harder if the ring finger is slow or tends to move together with the middle finger. Both versions appear in practical leverless explanations; neither must be universally faster. [Player explanation comparing 323 and 636](https://note.com/0s4ke_games/n/n871e812d5b51)

### 636｜前歩きからの肩はmiddle fingerだけ動かす

![636 and standard 623 as button-state sequences](https://silovar-uk.github.io/myessays/assets/arjun-leverless-visual-636.svg)

*Figure 3. For 636, hold Right with the index finger, tap Down with the middle finger, then release Down.*

**636+P** means Forward → Down-Forward → Forward, then punch. If you're already walking forward, simply keep Right held and add/release Down. It does not require a Left tap. [Manufacturer's walking-DP example](https://www.hitboxarcade.com/blogs/hit-box/sf6-dp-shortcuts)

**Choose by starting posture**: use 323 when crouch is important; consider 636 when your character is already walking forward. No input can compensate for the wrong move properties or spacing. アルジュンの「厳酷な岩肩」は、一般的な昇龍拳と技性能が同一ではない。[技性能の照合](https://sf6-genten.com/character/arjun)

### 63214 and 22｜追加の順序より「離す順」を覚える

![Physical key states for the half-circle grab and down-down counter](https://silovar-uk.github.io/myessays/assets/arjun-leverless-visual-grab-counter.svg)

*Figure 4. The half-circle becomes a five-step state machine. 22 uses a deliberate release in the middle.*

For **鬼気迫る尋問＝63214+P**, think:
1. Index presses Right (**6**).
2. Middle adds Down (**3**).
3. Ring adds Left: opposite horizontal keys cancel, so the game sees **2**.
4. Release **Right first**, leaving Left+Down (**1**).
5. Release **Down next**, leaving Left; then press P (**4+P**).

The important part is not merely adding three buttons. **Release Right before Down**. Don't rush directly into the full command. Work on the final **2→1→4** first. This key sequence is a suggested way of producing the *standard* command, not an untested abbreviated command.

For **不撓の警衛＝22+強K**, press Down, fully release it to neutral, and press Down+Heavy Kick. Holding Heavy Kick keeps the counter stance; P produces 倫理の崩壊. A proposed SOCD variation could theoretically make **2→5→2** by briefly adding Up to Down and then releasing Up under true-neutral mode. **This is not independently tested here as a reliable shortcut**, so learn the normal Down-release-Down input first. [Arjun's counter explanation](https://game.watch.impress.co.jp/docs/preview/2144359.html)

### Super Arts｜二回入力と最後のP/Kを分ける

![Double quarter-circle inputs for SA1, SA2 and SA3](https://silovar-uk.github.io/myessays/assets/arjun-leverless-visual-super.svg)

*Figure 5. SA1 and SA3 both use 236236, but SA1 ends with K and SA3 ends with P. SA2 is 214214+P.*

Practice in layers: **single quarter-circle → double direction-only motion → double motion plus attack → cancel from a normal**. This separates four common failures: direction omission, wrong final button, insufficient meter, or a missed cancel window. If a single special move comes out instead of SA, check whether the second motion appeared in the input log.

OD (Overdrive) usually means pressing two matching attack buttons together. But **not every move has an OD version**, and 不撓の警衛 is specifically discussed without one in [Dengeki's Arjun guide](https://dengekionline.com/article/202610/89267).

### Dash / Drive / Target Combos｜共有操作もレバーレスで分解

![Dash, parry, impact and drive rush input states](https://silovar-uk.github.io/myessays/assets/arjun-leverless-visual-common.svg)

*Figure 6. 66 is Right → release → Right. Parry rush and normal-cancel rush have different setup conditions.*

66/44 = forward/back dash. Medium Punch+Medium Kick = parry; Heavy Punch+Heavy Kick = Drive Impact. Parry Drive Rush is performed from a parry state, while Cancel Drive Rush comes from a cancelable normal with its required input. Don't treat them as one move. The first step in a consistent double-tap is a **visible release between presses**.

Arjun's command normals and target combos include 6+強P「仁義の一刀」、6+強K「頑強な跳舞」、中K→強K「規律の躍動」、強P→強P「不敵の調べ」、強P→強P→強P「鎮圧」、強P→強P→強K「追跡」、強K→強P「無情の拳」。Most of these are an exercise in **consistent right-hand button sequence**, not advanced SOCD. [Arjun move list](https://sf6-genten.com/character/arjun)

## 人によって難しい理由｜薬指・左右差・疲労

Finger independence is not evenly distributed. Studies of hand movement show that neighboring fingers can unintentionally move together, and the ring finger tends to be less independent than the index finger. The effect involves both anatomy and neural control. **These are population-level observations, not a judgment of your personal skill.** [Human finger-motion study](https://pubmed.ncbi.nlm.nih.gov/14973334/) / [Anatomical tendon connections](https://www.ncbi.nlm.nih.gov/books/NBK624301/)

![Finger-friendly leverless command options](https://silovar-uk.github.io/myessays/assets/arjun-leverless-visual-fingers.svg)

*Figure 7. Original visual summary of how to use easier key-state transitions when the ring finger is a bottleneck.*

**Problem: my ring finger can't tap Left quickly on 1P.** Stop using that version of 323 for a moment. Try Method A: hold Down, release Right, repress Right. It replaces a ring-finger tap with one index-finger release/repress. Compare ten clean attempts of each approach and choose the one that needs less tension.

**Problem: 2P feels completely different.** That's expected: physical Left becomes Forward, often controlled by the ring finger. This leads to a surprising result: the best 323 technique can **switch between sides**. On 1P, release/repress Right with the index finger. On 2P, keep physical Left+Down held and briefly tap Right with the index finger to cancel Left, returning to Left+Down when Right is released. In both cases you can use your index finger for the quick change. This is a practical finger-allocation hypothesis to test in your own setup.

**Problem: half-circle freezes my hand.** Split it into **6→3→2** and **2→1→4**. The second part is mostly about releasing keys in the right order. Start with the button-free version before adding P.

**Problem: 236 unexpectedly produces 623.** Don't blame your speed. Check prior forward movement. An extra 6 may be part of the input history when the game decides which move to recognize.

**Problem: jumps happen by accident, or won't happen.** With true-neutral Up+Down, both together produce neutral—not Up. If you release Down while keeping Up held, a jump can begin. Practice Up alone and separate it from Down-release timing. Avoid advanced Up/Down-cancellation shortcuts until basic movement is reliable.

**Problem: my hand gets stiff or tired.** Reduce excessive pressing force. Keep wrists in a comfortable, neutral position; add short breaks. If there is pain, numbness, or persistent symptoms, stop rather than forcing repetition, and seek professional advice if symptoms persist. General workstation guidance also supports microbreaks and neutral wrist posture. [US OSHA](https://www.osha.gov/etools/computer-workstations/work-process)

**Two-minute finger exercise**: gently tap Left alone; form Down+Left slowly; practice releasing Down while Left remains held; then compare the two 323 options. These are short coordination drills, not strength tests. The goal is a low-tension motion that still works at match speed.

## 破｜入力の失敗は、原因が六つに分かれる

The productive question is not "Why am I bad at inputs?" It is "Which state in the input log differs from the intended state?"

- **Missing direction**: 236 lacks 3, or 63214 lacks 1. Slow down and isolate that transition.
- **Correct motion, no special**: check the attack timing, meter, recovery and cancellation rules.
- **Wrong move appears**: inspect preceding directional history, not only the last three rows.
- **Unexpected SOCD output**: test physical Left+Right and Up+Down by themselves.
- **Only one side feels natural**: redesign your finger assignment instead of demanding perfect mirror movements.
- **Fatigue-related misses**: use shorter practice sets and avoid forcing painful motion.

### About the 8F DP input window

The commonly cited **8F after the final DP direction** comes from community technical guides such as the [SF6 beginner wiki](https://w.atwiki.jp/sf6begin/pages/128.html). We did **not** reproduce the precise boundary on current Arjun or find a Capcom primary source confirming this exact limit. Therefore this article treats 8F as a *community-reported reference*, not a guaranteed official constant.

In Training Mode, enable Input History through Display Settings. The number next to a row indicates how many frames a particular input state persisted. For example, a clean 323 can show **3→2→3→3+P**; the duration of the last diagonal-only segment is the delay before P. Compare controlled attempts at 5F, 7F, 8F and 9F. The display's frame-count boundary and internal recognition rules may differ by one frame; don't treat one failed attempt as definitive. [Training Mode input-history description](https://w.atwiki.jp/sf6begin/pages/53.html)

**Eight frames is not a time limit for the entire 323 motion.** Input retention, move startup, and buffers during recovery are different questions.

## 再検証｜15分トレモメニュー

Set up **Input History** first. Command confirmation and frame meter can be used as supporting displays. When overwhelmed, use the game's 50% speed setting to read the input order clearly before returning to full speed. [Practice settings](https://www.sf6-genten.com/beginner)

1. **0–3 min / compare two 323 inputs**: ten reps with index-only release/repress; ten reps with ring-finger SOCD tap. Record success and tension.
2. **3–6 min / compare 236 and 214**: five reps each, observing whether the ring finger creates the 1 direction and whether different K strengths place rocks correctly.
3. **6–9 min / command grab and counter**: five reps of 63214P, five reps of 22+Heavy Kick. Check missing steps rather than total speed.
4. **9–12 min / Super Arts**: three attempts each for SA1, SA2, SA3. Check the double motion and final P/K, then test cancel windows separately.
5. **12–15 min / random situations**: record jumps, blocks, and setup opportunities for the dummy. Choose shoulder, rock or throw appropriately. Classify failure as *decision, timing, or execution*.

A useful three-line note: **wanted move vs actual move; wrong/missing state in Input History; one thing to change next time**. A 90% success target over ten attempts is an editorial training goal, not an official game benchmark.

## 離｜コマンドを「最短化」するより、局面を「省力化」する

Arjun's core strategy revolves around recoverable damage, rock placement, pressure, and a command grab. Learning shortcuts without learning *when to use the moves* produces a collection of inputs, not good decisions. [Character analysis](https://dengekionline.com/article/202610/89267)

The useful connection is between a **starting state and a tactical choice**. While crouching, consider 323. While walking forward, consider 636. When you have space, 214 places a rock. Against a blocking opponent, 63214 threatens a grab. When reading an attack, 22 offers the counter stance. These are practice hypotheses, not universal answers.

**Leverless mastery is not only about pressing faster. It is about planning what stays pressed and what gets released.** When you choose a stable starting state, fewer fingers have to move. If the ring finger is a bottleneck, change the motion rather than treating every miss as a discipline problem. That's the practical point of studying alternative inputs.

## 2P側｜左右は対称でも、指の負担は対称ではない

When your character faces left, Forward is physically Left. The notation stays the same, but the physical assignment changes.

- 236 on 2P: Down→Down-Left→Left, usually involving the ring finger.
- 214 on 2P: Down→Down-Right→Right, often easier with middle+index.
- 323 on 2P: hold Left+Down, **tap Right using the index finger** to cancel horizontal input, release Right, then P. This gives 3→2→3 without rapidly releasing/repressing your ring finger.
- 636 on 2P: hold Left, add Down, release Down and press P. Compare comfort with the 2P 323 alternative.
- 63214 on 2P: physical Left→Down-Left→Down→Down-Right→Right.
- Super Arts and 22: reverse physical forward/back directions as needed, but do not change which attack button finishes the move.

A perfect mirror is not the goal. **A repeatable input is.**

## 資料と検証の線引き

**Standard commands and character details**: [Capcom Arjun launch](https://prtimes.jp/main/html/rd/p/000006108.000013450.html), [Dengeki move list](https://dengekionline.com/article/202610/89267), [GAME Watch gameplay preview](https://game.watch.impress.co.jp/docs/preview/2144359.html), [SF6 Arjun reference](https://sf6-genten.com/character/arjun).

**Controller behavior and alternate inputs**: [Hit Box SOCD modes](https://www.hitboxarcade.com/blogs/hit-box/socd-modes-on-hit-box), [Hit Box SF6 DP shortcuts](https://www.hitboxarcade.com/blogs/hit-box/sf6-dp-shortcuts), [Japanese player guide with release/repress input](https://note.com/0s4ke_games/n/n871e812d5b51). Part of the manufacturer's testing dates to SF6 beta versions.

**Human ergonomics**: [Finger independence study](https://pubmed.ncbi.nlm.nih.gov/14973334/), [Finger-tendon anatomy](https://www.ncbi.nlm.nih.gov/books/NBK624301/), [OSHA microbreak and neutral wrist guidance](https://www.osha.gov/etools/computer-workstations/work-process).

**Not yet proven on the current Arjun build**: precise final-DP-input 8F boundary, Up/Down SOCD as a reliable 22 shortcut, universal fastest finger assignment. 1P/2P asymmetric finger choices, troubleshooting suggestions, and the 15-minute routine are practical proposals to test—not statements of official engine behavior.
