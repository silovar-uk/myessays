# Research Notes｜SF6のバーンアウトを「防御ルールの切替」として読む

Date: 2026-09-27
Scope: Street Fighter 6 / Burnout / Drive Gauge / current rules through 2026-09-27

## 1. Research question

バーンアウトを「ドライブゲージ0の弱体化」とだけ説明せず、何が使えなくなり、ガード・硬直差・削り・画面端・復帰がどう変わるかを分解する。

## 2. Source hierarchy

1. CAPCOM official Drive System announcement
2. Street Fighter 6 official web manual
3. Current 2026 specification summaries with update date
4. Current frame-data / system notes for +4F and Drive Reversal example
5. Patch-note mirrors for historical common-system corrections

## 3. Confirmed facts

- Drive Gauge has six stocks at round start in current spec.
- Depleting Drive causes Burnout; Drive techniques cannot be used until recovery completes.
- Drive techniques include Drive Impact, Drive Parry, Drive Rush, OD special moves, and Drive Reversal.
- Normal movement, normals, ordinary special moves, throws, and eligible Super Arts remain available during Burnout.
- Blocking during Burnout adds 4F of blockstun to the defender; hitstun is not generally shifted by this rule.
- Therefore an on-block -4 move becomes 0 against a Burnout defender in the frame-advantage arithmetic; -3 becomes +1, etc. Spacing and move-specific behavior still matter.
- Drive Reversal is normally -6 on block; against a Burnout defender it becomes -2 because of the additional blockstun, removing a normally guaranteed punish.
- During Burnout, blocking special moves / Super Arts can deal chip damage to vitality and chip K.O. is possible. Normal attacks do not universally chip merely because the defender is burned out.
- A Burnout defender wall-splatted by Drive Impact in the corner is Stunned. After Stun recovery, Drive is restored.
- Burnout recovery progresses over time and can also be advanced by in-match actions such as landing attacks and blocking.
- The 2026-05-28 balance update explicitly adjusted Drive-gain interactions around low Drive / Burnout defense, showing that recovery levers remain balance-sensitive.

## 4. Core interpretation

Burnout is more accurately modeled as a temporary ruleset switch than as a simple meter-empty debuff. It removes the shared Drive layer while leaving much of the character's ordinary fighting kit intact, and simultaneously worsens the defensive rules through +4F blockstun, chip, and corner Stun threat.

## 5. Re-research corrections

- Reject: “Burnout means no special moves.” Ordinary special moves and Super Arts can remain available; Drive-dependent options are what disappear.
- Reject: “Everything becomes +4.” The defender's blockstun increases by 4F; practical advantage also depends on the move's normal frame data, spacing, pushback, and cancels.
- Reject: “Burnout changes combo hitstun by +4F.” The broad +4F rule applies to blockstun, not general hitstun.
- Reject: “All blocked attacks chip health.” Normal attacks are not universally converted into chip; special moves / Super Arts and system-specific cases matter.
- Reject: “Burnout is checkmate.” The defender loses Drive options but retains non-Drive actions; available defensive routes vary by character and resources.
- Avoid fixed recovery-duration claims. Recovery rate changes with actions and has been subject to balance adjustments.

## 6. Overdone experiments

### Experiment A: -4 becomes 0

Use Training Mode with a move that is -4 on block and remains in 4F-punish range. Compare normal defender vs Burnout defender. The same 4F punish should disappear in the Burnout case because +4F blockstun shifts -4 to 0.

### Experiment B: Drive Reversal asymmetry

Block Drive Reversal in normal state and confirm the -6 punish window. Repeat while the defender is in Burnout and observe the effective -2 state.

### Experiment C: same guard, different resource meaning

Compare blocking before Burnout and during Burnout: normal guard spends Drive; Burnout guard no longer spends an available Drive bar and can contribute to recovery, while the defender accepts +4F blockstun and possible chip depending on the move.

### Experiment D: two kinds of danger

Contrast full health / zero Drive / corner with low health / six Drive / mid-screen. Do not rank which is “worse”; identify which forms of agency and defeat risk differ.

## 7. Article thesis

The six Drive stocks are not only a count of how many universal techniques remain. They are also a buffer that keeps the player inside SF6's normal defensive rules. Burnout makes that hidden function visible.

## 8. Sources

- https://news.capcomusa.com/2022/06/02/street-fighter-6-redefines-the-genre-in-2023/
- https://game.capcom.com/manual/SF6/fr/ps5/page/3/1
- https://note.com/mochimochi_sf/n/n08a56f1b4f06
- https://note.com/shibabaibaru/n/n6b31cd610ba7
- https://sf6combo.kagewebsite.com/page/drive-system
- https://finalweapon.net/2026/05/28/street-fighter-6-ingrid-update-is-now-live-with-major-adjustments/
- https://mp1st.com/news/sf6-update-1-000-005-for-sept-26-strikes-out-to-add-aki
