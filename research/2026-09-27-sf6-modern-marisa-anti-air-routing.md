# Research Notes｜モダンマリーザの対空を「距離と時間」で分業する

Date: 2026-09-27
Scope: Street Fighter 6 / Modern Marisa / Year4 after 2026-08-03 adjustment

## 1. Research question

「モダンマリーザの対空は何を一本にすべきか」という問いを検証し、現行仕様では一本化より役割分担の方が合理的かを確認する。

## 2. Source hierarchy

1. CAPCOM 2026-08-03 Marisa battle change list
2. SF6 official web manual (Training Mode record settings)
3. Current frame database updated for Year4
4. Modern Marisa guide explicitly updated on 2026-08-06
5. Season4 matchup notes and update summaries

Older guides are used only to identify hypotheses, not to establish current controls or frame values.

## 3. Confirmed facts

- 2026-08-03 Modern control remap: ←+SP changed from Dimachaerus to medium Phalanx; ↓+SP changed from Phalanx to Quadriga; Dimachaerus became command-input only.
- Crouching heavy punch / Half Heart: 9F startup, active 9-13, 900 damage, -6 on block. Hold version: 21F startup, active 21-26, 1000 damage, -3.
- Jump medium punch: 7F startup, 700 damage, air hit causes knockdown. Volare Combo second hit: 10F, 800 damage.
- Jump light punch: 4F startup, 300 damage.
- Light Gladius: 17F startup, upper-body armor on frames 5-10. Held light: 30F startup, armor on frames 5-26.
- Light Dimachaerus: 12F startup; invincible to airborne strike / air-projectile properties on frames 5-15; -16 on block.
- OD Dimachaerus: 16F startup; same type of invincibility on frames 5-19; -12 on block; armor break.
- SA2 Meteoritis: 9F startup; full invincibility frames 1-16; move-data base damage 3000; -44 on block. Simple Modern input has damage scaling, so the move-data number is not copied as literal simple-input damage.
- Standing medium punch was adjusted on 2026-08-03 so its airborne hit state better supports the target-combo follow-up.
- Official Training Mode can store up to eight recorded opponent actions and selectively replay them.

## 4. Interpretations supported by multiple sources

- Half Heart is the baseline front-jump ground anti-air, not a universal anti-air for cross-ups.
- Gladius is better understood as an armor-based predictive answer, despite the easy Modern input; empty jump and cross-up weaken the idea.
- Air-to-air is structurally important for cross-ups and neutral jumps that are awkward for ground anti-air.
- Dimachaerus is now a command-input dedicated anti-air and should be prepared earlier than a simple panic button.
- OD Dimachaerus buys a longer protected window / conversion, not faster startup.
- SA2 is a high-cost reliability / kill option rather than the default anti-air.

## 5. Re-research corrections

- Rejected old assumption: “Modern can use one-button Dimachaerus anti-air.” This became outdated after 2026-08-03.
- Rejected simplification: “9F move = 9F human reaction window.” Startup does not include perception and decision time.
- Rejected simplification: “charged Half Heart is a stronger version of normal anti-air.” Its 21F startup moves it toward prediction; hitbox-specific superiority is not established by frame data alone.
- Rejected expansion: “any move that hits airborne opponents is an anti-air.” Standing MP air-hit improvements are treated as conversion insurance, not proof of primary anti-air reliability.

## 6. Practical routing hypothesis

1. Front jump, normal reaction window → Half Heart.
2. Midrange jump-in attack read early → one-button light Gladius.
3. Cross-up / above head / neutral jump → jump medium punch air-to-air; jump light punch for late air scramble.
4. Early recognition plus command readiness → light or OD Dimachaerus.
5. Kill / high certainty / meter justified → SA2.

This is a training model, not a claim that every character-specific aerial trajectory fits these five bins.

## 7. Proposed training experiment

Record four dummy actions first: front jump attack, cross-up jump, neutral jump, grounded walk/poke. Train one at a time, then randomize. Measure not only hit success but error type: late execution, wrong route, false positive, or no selection. Add Gladius and Dimachaerus only after the first routing layer is stable; add SA2 with a kill/meter condition.

## 8. Sources

- https://www.streetfighter.com/6/buckler/ja-jp/battle_change/20260803/marisa
- https://game.capcom.com/manual/SF6/ja/switch2/page/8/6
- https://sf6-lab.net/fighters/marisa/frame
- https://www.sukoreru.com/sf6-modern-marisa
- https://note.com/emesirna/n/nb24053cdc1b1
- https://hiyoko-lab.com/streetfighter6_hiyoko/sf6_2026-08-03-update_01/
