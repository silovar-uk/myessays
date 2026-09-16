# Research Note: SF6 Marisa Plus Frames → Next Action

Date: 2026-09-16
Article ID: `sf6-marisa-plus-frames-pressure`

## 1. Research question

「マリーザがガードさせて有利を取ったあと、具体的に何を押すべきか」を、単なる有利技一覧ではなく、以下へ翻訳する。

- +1〜+5ごとに、4F暴れへクリーンに勝てる最も遅い通常技
- 相打ちになる境界
- 投げが成立するタイミング
- 距離・押し戻しによる例外
- パリィ、ジャンプ、バックダッシュ、無敵技への分岐
- Drive Rushで人工的に作る有利状況

## 2. First research: Doodを入口にする

User-provided starting page:
- https://dood.gg/ja/%E3%82%B9%E3%83%88%E3%83%AA%E3%83%BC%E3%83%88%E3%83%95%E3%82%A1%E3%82%A4%E3%82%BF%E3%83%BC6/%E3%82%AD%E3%83%A3%E3%83%A9%E5%AF%BE%E7%AD%96/

Dood Marisa pages:
- Frame data: https://dood.gg/ja/%E3%82%B9%E3%83%88%E3%83%AA%E3%83%BC%E3%83%88%E3%83%95%E3%82%A1%E3%82%A4%E3%82%BF%E3%83%BC6/%E3%83%9E%E3%83%AA%E3%83%BC%E3%82%B6/%E3%83%95%E3%83%AC%E3%83%BC%E3%83%A0%E3%83%87%E3%83%BC%E3%82%BF/
- Counter guide: https://dood.gg/ja/%E3%82%B9%E3%83%88%E3%83%AA%E3%83%BC%E3%83%88%E3%83%95%E3%82%A1%E3%82%A4%E3%82%BF%E3%83%BC6/%E3%83%9E%E3%83%AA%E3%83%BC%E3%82%B6/%E5%AF%BE%E7%AD%96/
- System guide: https://www.dood.gg/en/street-fighter-6/system-guide/

Doodは有利技の入口として有用だが、2026-09-16時点で一部データが現行版と不一致。

Observed mismatch:
- Dood: charged st.HP = +4 on block
- Current Frame Data Search: charged st.HP = +5
- Dood: H Quadriga = -3 on block
- Current Frame Data Search: H Quadriga = +1

Therefore Dood is not used as the final numerical authority for changed moves.

## 3. Re-research: current version verification

Primary numerical reference for this article:
- Frame Data Search — Marisa: https://frame-search.com/?character_name=Marisa&lang=en-us
- Version Diff: https://frame-search.com/changelog?lang=en-us

Displayed current version at research time:
- `Ver.2.0401.010`

Key current values used:

### Plus-on-block sources
- charged st.HP: +5
- charged st.HK: +1
- charged Magna Bunker: +4
- charged Malleus Breaker (1): +2
- charged Falx Crusher (1): +3
- charged L/M/H Gladius: +4
- charged OD Gladius: +4
- L/M/H Phalanx: +3
- OD Phalanx: +4
- H Quadriga: +1

### Marisa normal startup values used for follow-up calculation
- cr.LP: 4F
- cr.LK: 5F
- st.LP: 6F
- st.LK: 6F
- st.MP: 7F
- cr.MP: 8F
- cr.MK: 9F

## 4. Derived frame-trap math

Assume defender uses a 4F strike immediately after blockstun.

If attacker is `+N` and chooses a follow-up with startup `S`:

- Defender's 4F strike becomes active on approximately global frame `N + 4` from attacker's first actionable frame.
- Attacker cleanly hits first when `S < N + 4`.
- Therefore clean-trap condition is:

`S <= N + 3`

- If `S = N + 4`, attacks become active on the same global frame: baseline is a trade, subject to hitbox/hurtbox/spacing.

Practical translation:
- +1 → clean through 4F; 5F = trade line
- +2 → clean through 5F; 6F = trade line
- +3 → clean through 6F; 7F = trade line
- +4 → clean through 7F; 8F = trade line
- +5 → clean through 8F; 9F = trade line

Marisa mapping:
- +1 → cr.LP clean / cr.LK trade line
- +2 → cr.LK clean / st.LK or st.LP trade line
- +3 → st.LK or st.LP clean / st.MP trade line
- +4 → st.MP clean / cr.MP trade line
- +5 → cr.MP clean / cr.MK trade line

Important correction during research:
An early working note incorrectly treated `N+4` as the clean-win threshold. Rechecking the global-frame timing showed that `N+4` is the simultaneous-active/trade boundary; final article uses `N+3` as the clean-win threshold.

## 5. Throw interaction: the weird hook

References:
- https://www.fightinggameguide.com/sf6.html
- https://note.com/inn_the_haze/n/n3aa65e37fe6d

System facts used:
- Normal throws are 5F startup.
- Defender has 2F throw invulnerability immediately after hitstun/blockstun.
- Normal throw has 3 active frames (as discussed in the linked SF6 setup article).

Why +5 immediate throw can whiff:
- At +5, immediate 5F throw becomes active before/at the defender's blockstun ending window.
- Its three active frames can be consumed by: opponent still in blockstun → throw invul frame 1 → throw invul frame 2.
- A slight delay can shift later active frames beyond throw invulnerability.

This becomes the article's opening paradox: “有利すぎて投げが早すぎる”.

## 6. Spacing layer

Do not convert frame advantage directly into a button without range verification.

Key principle:
- Frame advantage = time
- Reach / pushback = space
- A frame trap exists only if the follow-up actually reaches.

This matters especially after:
- H Quadriga +1
- charged Gladius +4
- OD Phalanx +4

Practical three-distance model:
- close: strike / throw
- mid: reaching/cancelable normal, re-touch
- tip: preserve positional advantage instead of whiffing a short normal

## 7. Defender-response tree

- 4F mash → immediate strike inside clean-trap threshold
- passive block → throw; after +5, slightly delay throw
- frequent throw tech → delay strike / shimmy-style spacing
- parry → throw gains value
- jump/backdash → immediate strike gains value
- invincible reversal / SA → block and punish

Core interpretation:
Plus frames guarantee initiative, not a specific move and not victory.

## 8. Drive Rush extension

System reference:
- https://www.dood.gg/en/street-fighter-6/system-guide/

Drive Rush adds +4F advantage to the next normal/unique attack on hit or block.

Marisa examples:
- DR cr.LP: -1 + 4 ≈ +3
- DR st.MP: -1 + 4 ≈ +3
- DR cr.MP: -2 + 4 ≈ +2
- DR cr.MK: -2 + 4 ≈ +2
- DR st.HP: -3 + 4 ≈ +1

The same +1〜+5 follow-up framework can therefore be reused for Drive Rush pressure.

## 9. Structure decision

Article progression:
1. Hook: +5 makes immediate throw too early
2. Version discrepancy: Dood vs current data
3. Inventory of plus situations
4. Derive N+3 rule
5. Translate +1〜+3
6. Translate +4
7. Translate +5 / throw paradox
8. Add spacing as second axis
9. Add defender-response tree
10. Extend via Drive Rush
11. Give five Training Mode experiments
12. Return to hook: plus frames are a time budget

Editorial principle:
Do not write “+5 is good.” Convert every number into a concrete decision boundary.

## 10. Claims intentionally not overstated

- Do not claim a follow-up is universally guaranteed solely from startup; spacing/hitboxes can change outcome.
- Do not assume every +4 situation has throw range.
- Do not call trade-line buttons true frame traps against 4F mash.
- Do not treat old Dood values as current when they conflict with versioned data.
- Do not claim plus frames beat invincible reversals.
- Do not prescribe Enfold as a generic immediate command throw after plus; it is a Scutum follow-up and needs its own setup logic.

## 11. Final thesis

`frame advantage ≠ “my turn”`

Better model:

`frame advantage = time budget for the next decision`

The amount of plus determines how slow a follow-up can become before the defender's fastest option catches up. Distance and defensive choice then determine how that budget should actually be spent.