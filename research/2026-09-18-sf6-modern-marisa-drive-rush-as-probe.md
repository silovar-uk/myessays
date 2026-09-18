# Research Note: Modern Marisa Drive Rush as a Reaction Probe

Date: 2026-09-18
Article ID: `sf6-modern-marisa-drive-rush-as-probe`

## 1. Research question

モダン・マリーザでドライブラッシュをどう使うと、単なる接近やコンボ延長ではなく、実戦の読み合いを組み立てる道具になるか。

検証対象:
- Modern固有の使用可能／不使用通常技
- Raw Drive RushとCancel Drive Rushのコスト差
- Rush normalの+4F補正
- Rush Gladiusが+4F対象外なのに使われる理由
- ラッシュA弱／A中／強の役割
- cr.MP cancel rush
- 投げ、Parry、4F mash、jump/backdash、reversalへの分岐
- okiでのrush使用

## 2. First research

Modern Marisa guide:
https://note.com/nikotarosun/n/n8ba709a7d073

Observed guide claims:
- Modern does not have st.LK, cr.MK, 3HP, st.HK.
- Rush Assist Light is used as a low and should connect relatively close because Modern lacks st.LK follow-up at tip.
- Rush Assist Medium is used to beat rush-check attempts.
- Rush Heavy uses reach and is +1 on block after rush.
- Rush Gladius can abruptly stop the forward movement to bait rush checks or reversals.
- cr.MP is commonly buffered into cancel rush.
- After cr.HP anti-air, rush is used to continue into oki.

Important: this is a secondary player guide. Numerical claims were rechecked against current frame-data sources where possible.

## 3. Re-research: current frame baseline

Primary numerical source:
https://frame-search.com/?character_name=Marisa&lang=en-us

Displayed version:
`Ver.2.0401.010`

Cross-check:
https://sf6-lab.net/en/fighters/marisa/frame
https://sf6-lab.net/en/fighters/marisa/moves

Relevant values:
- cr.LK: startup 5F / hit +2 / block -3
- st.MP: startup 7F / hit +2 / block -1
- st.HP: startup 12F / hit +3 / block -3
- cr.MP: startup 8F / hit +3 / block -2 / cancelable
- Enfold: startup 5F after Scutum follow-up window
- Light Gladius: Modern one-button availability is supported by the Modern guide; armor timing should be checked against current move data before using a precise armor-frame claim in future revisions.

## 4. Drive Rush system verification

Sources:
- https://www.sf6-genten.com/advanced
- https://streetfighter.fandom.com/wiki/Drive_Rush
- https://www.fightinggameguide.com/sf6.html

Current practical cost model:
- Raw / Parry Drive Rush: 1 Drive stock total
- Cancel Drive Rush: 3 Drive stocks

Rush enhancement:
- The next normal / unique attack receives +4F hitstun/blockstun advantage.
- Special moves do NOT receive this +4F bonus.

This distinction is the key correction made during research. An early conceptual direction risked treating “rush → one-button special” as if it inherited the +4F advantage. It does not.

## 5. Derived rush-frame examples

Using base frame advantage +4:
- Rush cr.LK: hit +6 / block +1
- Rush st.MP: hit +6 / block +3
- Rush st.HP: hit +7 / block +1

These are frame-math translations, not universal guarantees of follow-up. Pushback, contact timing, Modern move availability, and hitbox/hurtbox interaction still matter.

## 6. Structure decision

Article progression:
1. Weird hook: use rush to stop with Gladius
2. Explain why Modern cannot copy Classic rush mix
3. Separate 1-stock probe from 3-stock cash-out
4. Reduce raw rush to Assist Light / Assist Medium / Heavy
5. Explain Rush Gladius as a feint, not +4F pressure
6. Put cancel rush after contact, especially cr.MP
7. Classify defender responses instead of memorizing moves
8. Use rush in oki where response timing is narrower
9. Training Mode: record six defender reactions
10. Return to hook: first rush asks, second rush answers

## 7. Core thesis

`Drive Rush ≠ answer`

Better model:

`Raw Rush = reaction probe`
`Cancel Rush = cash-out after contact/information`

Modern Marisa loses some conventional high/low rush options, but gains fast one-button specials and supers. The practical adaptation is not to recreate Classic's option count; it is to make the opponent reveal their anti-rush habit, then use Modern's reaction economy to punish that habit.

## 8. Claims intentionally qualified

- Do not say Rush Gladius gets +4F; specials do not receive the rush normal bonus.
- Do not claim simple base-frame +4 arithmetic guarantees a sequence at every spacing.
- Do not present player-guide recommendations as official Capcom strategy.
- Do not claim Enfold is an immediate command throw directly from raw rush; Scutum stance precedes it.
- Do not claim cancel rush should always be buffered regardless of gauge.
- Do not reduce Modern's missing normals to “strict weakness”; the control scheme has different reaction tools.

## 9. Sources

- Frame Data Search — Marisa:
  https://frame-search.com/?character_name=Marisa&lang=en-us
- Frame Data Search — Version Diff:
  https://frame-search.com/changelog?lang=en-us
- SF6 Lab — Marisa Frame Data:
  https://sf6-lab.net/en/fighters/marisa/frame
- SF6 Lab — Marisa Move List:
  https://sf6-lab.net/en/fighters/marisa/moves
- Modern Marisa 2026 guide:
  https://note.com/nikotarosun/n/n8ba709a7d073
- Classic Marisa 2026 guide:
  https://note.com/nikotarosun/n/n51e5d284ca30
- Drive Rush system reference:
  https://www.fightinggameguide.com/sf6.html
- Drive Rush overview:
  https://streetfighter.fandom.com/wiki/Drive_Rush
- Drive-system detail:
  https://www.sf6-genten.com/advanced
