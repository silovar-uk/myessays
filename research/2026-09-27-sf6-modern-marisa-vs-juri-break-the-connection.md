# Research Notes｜モダンマリーザ対ジュリ――「接続の切れ目」を攻略する

Date: 2026-09-27
Scope: Street Fighter 6 / Modern Marisa vs Juri / Ver.2.0401.010 / Year4 after 2026-08-03 adjustment

## 1. Research question

ジュリの「弱点」を単純な低性能技や防御の弱さとして探すのではなく、現在のゲームプランが成立するために必要な条件を分解し、その条件が切れる地点をモダンマリーザの実戦回答へ翻訳する。

中心仮説：
- ジュリの強さは「すべての通常技が有利」ではない。
- 中足、ドライブラッシュ、風破ストック、起き攻めを接続し、不利フレームへ到達する前に次の行動へ移ることが強さの中心。
- したがってマリーザ側は移動速度で競わず、接続前・接続終了時・資源消費後を狙う。

## 2. Source hierarchy

1. Frame Data Search（Ver.2.0401.010、現行公式フレームデータ再取得履歴あり）
2. スト6ラボ（公式掲載値反映、参照日2026-08-27）
3. Ultimate Frame Data（2026年8月パッチ反映、Juri 8/9、Marisa 8/5更新）
4. CAPCOMバトル変更リスト／公式ゲーム情報
5. 2026年更新のYear4攻略記事・コンボ資料
6. コミュニティ資料は実戦上の仮説生成に限定

## 3. Confirmed Juri facts

### Ground normals

- 立ち弱P：4F、ガード-2（Frame Data Search / SF6 Lab）
- 立ち弱K：5F、ガード-3
- 立ち中P：6F、ガード+2、キャンセル可
- 立ち中K：5F始動、ガード-4
- 立ち強P：10F、ガード-5
- 立ち強K：17F、ガード-3
- しゃがみ弱P：4F、ガード-1
- しゃがみ弱K：5F、低段、ガード-1
- しゃがみ中P：6F、ガード-2、キャンセル可
- しゃがみ中K：8F、低段、ガード-6、キャンセル可、後続コンボに20%補正
- しゃがみ強P：8F、ガード-11
- しゃがみ強K：10F、ガード-11
- 前中K中段：21F、ガード-3
- ターゲットコンボ最終段：ガード-16

### Fuha system

- 弱風破刃：10F、ガード-4、全体およそ34F、ストック獲得
- 中風破刃：13F、ガード-6
- 強風破刃：25F、ガード-8
- OD風破刃：12F、ガード-12
- 歳破衝：16F、ガード-8
- 強化歳破衝：16F、ガード-3
- OD歳破衝：11F、ガード-2
- 暗剣殺：24F、ガード-8
- 五黄殺：18F、通常-11、強化-10、OD-16

### Tensenrin / supers

- 弱天穿輪：11F、ガード-8
- 中／強天穿輪：5F、1-8Fは空中打撃・空中飛び道具への無敵、ガード-37
- OD天穿輪：6F、1-9F完全無敵、ガード-48
- SA1殺界風破斬：7F、1-8F打撃・投げ無敵、アーマーブレイク、ガード-32前後
- SA2風水エンジン：通常発動7F、通常技・特殊技・ジャンプ攻撃の連係規則を拡張、タイマー10秒
- SA2ホールド版：9F、前進攻撃、ガード-17、風水連係へキャンセル可能
- SA3回旋断界落：10F、1-13F完全無敵、アーマーブレイク、ガード-31

### Movement / health

Ultimate Frame Data:
- Juri: HP 10000 / forward walk 4.7 / back walk 3.2 / forward dash 22F, distance 190.298
- Marisa: HP 10500 / forward walk 3.9 / back walk 2.7 / forward dash 22F, distance 140

Interpretation allowed:
- Juri has a real mobility advantage in walk speed and forward-dash travel.
- “Marisa should not race Juri’s footspeed” is an interpretation built on these facts, not a claim that walking forward is impossible.

## 4. Confirmed Modern Marisa facts relevant to matchup

Current Modern-specific guide, updated for Year4:
- Modern Marisa does not have Classic crouching medium kick (2MK).
- Modern retains crouching medium attack (2中), standing heavy attack, forward medium attack, back heavy attack, assist routes.
- Year4 changed Modern special-button mapping; do not reuse old one-button Dimachaerus assumptions.

Current Marisa frame data:
- crouching light punch: 4F, block -1
- standing medium punch: 7F, block -1
- crouching medium punch: 8F, block -2, cancellable
- regular Gladius: one hit of upper-body armor beginning at frame 5, not low armor
- OD Gladius: one hit upper-body armor from frame 1; charged OD has two armor hits
- regular Scutum: 3F start, upper-body armor
- OD Scutum: 1F start, full-body armor while active
- Marisa SA2 / SA3 have full invincibility, but are expensive defensive resources

Matchup-specific implication:
- Juri crouching medium kick is low.
- Regular Gladius / regular Scutum are upper-body armor.
- Therefore “use regular armor as default cr.MK counter” is rejected.

## 5. Juri gameplan: current strategy sources

2026 Year4 guides converge on:
- cr.MK cancel Drive Rush as a central neutral-to-pressure route.
- Drive Rush st.MP creates strong plus pressure; one 2026 strategy source describes it as +6 on block.
- Fuha stock routes are integrated into ordinary combos and okizeme, not a separate gimmick.
- Heavy Tensenrin enders and corner setplay create repeated offense.
- Feng Shui Engine is a distinct offense state requiring its own routing.

This is strategy-source interpretation, not official character description.

## 6. Structural weaknesses derived from facts

### A. Raw normal disadvantage is real when the connection ends

Fact:
- raw st.MP is +2; many other core normals are -1 to -6.
Interpretation:
- Juri’s feeling of “always plus” is produced by connections, not by every raw move being plus.
Practical rule:
- confirm cancel / Drive Rush before acting on raw on-block numbers.

### B. cr.MK pressure has a resource price

Fact:
- cr.MK is -6 raw and cancellable.
- cancel Drive Rush consumes Drive Gauge.
Interpretation:
- letting Juri use Drive Rush repeatedly also reduces later defensive resource availability.
Practical rule:
- stop raw Drive Rush where possible; otherwise respect it, and track Drive Gauge as both offense and defense budget.

### C. Fuha stock gain costs time / position

Fact:
- light Fuhajin startup 10F, total about 34F; heavy starts at 25F.
Interpretation:
- neutral stock building temporarily stops forward movement.
Practical rule:
- default reward is taking ground, not auto-jumping.

### D. Fully invincible ground reversal is resource-gated

Fact:
- M/H Tensenrin are anti-air invincible, not fully invincible.
- OD Tensenrin is fully invincible and costs Drive Gauge.
- SA1/SA3 also cost Super Gauge.
Interpretation:
- grounded meaty pressure does not need to fear all Tensenrin equally.
Practical rule:
- use real grounded meaties, then add block/bait to tax OD/SA reversals.

## 7. Re-research corrections

### Correction 1: “Juri has weak defense” rejected

Juri has OD Tensenrin plus SA reversals and strong anti-air tools.
Final wording:
- not “weak defense”
- “strong rejection is resource-gated and extremely punishable if blocked”

### Correction 2: “cr.MK is -6, therefore always punish” rejected

At tip range, pushback can make a 4F punish fail.
Final wording:
- raw / uncancelled -6 means Juri is time-negative
- actual punish depends on reach and spacing
- otherwise treat as turn reclaim

### Correction 3: “Saihasho is -8, punish it” rejected

Projectile spacing means the opponent may be too far away.
Final wording:
- do not place Saihasho in a guaranteed-punish cheat sheet
- use guard/parry and ground-taking as default
- lab matchup-specific ranges separately

### Correction 4: “armor beats Juri’s pokes” rejected

Regular Gladius / Scutum are upper-body armor; Juri cr.MK is low.
Final wording:
- regular armor is not the standard cr.MK answer
- OD Scutum is a separate resource/read option, not a universal shield

### Correction 5: “Tensenrin is invincible DP” split by version

M/H:
- anti-air strike/air projectile invincible 1-8
OD:
- fully invincible 1-9
Final article keeps this distinction visible.

### Correction 6: database discrepancies are not used as central claims

Observed:
- UFD currently lists Juri st.LP block -1, while Frame Data Search / SF6 Lab list -2.
- Some secondary databases differ on selected OD special block values.
Policy:
- use Frame Data Search / SF6 Lab where official-derived current values agree.
- avoid building the article thesis on disputed one-frame edges.
- mark all range-sensitive punish claims as lab-dependent.

## 8. Practical routing hypothesis for Modern Marisa

Neutral:
1. walk-and-block at cr.MK edge.
2. use 2中 as the main placed/intercept button.
3. use 5強 / 6中 only when the spacing/read supports the commitment.
4. do not chase Juri’s walk speed.
5. do not default to regular Gladius at cr.MK range.

Drive Rush:
1. attempt to stop before contact.
2. 2中 as baseline at readable range.
3. 2弱 when late / close.
4. if Rush st.MP is already blocked, respect the plus situation instead of reflex mashing.

After knockdown:
1. use grounded meaty as baseline.
2. record M Tensenrin vs OD Tensenrin separately.
3. insert guard/bait often enough to make OD reversal expensive.
4. if OD Tensenrin is blocked, use a fixed max punish route.

Fuha:
1. first reward is forward space.
2. jump only as a read after anti-air attention shifts.
3. record specific heavy-Fuhajin ranges where direct interruption is real.

Feng Shui Engine:
1. abandon raw-normal Red/Yellow/Green assumptions during activation.
2. prioritize blocking/parry/backwalk/position.
3. treat timer expiry as a win condition.
4. punish only confirmed end points.

## 9. Five-minute training experiment

Record slots:
1. cr.MK only
2. cr.MK → cancel Drive Rush → st.MP
3. raw Drive Rush st.MP
4. raw Drive Rush throw
5. light or heavy Fuhajin
6. M Tensenrin on wake-up
7. OD Tensenrin on wake-up
8. no reversal

Measure errors:
- CONNECTION ERROR: pressed before the string actually ended
- RANGE ERROR: assumed frame punish without reach
- ARMOR ERROR: used regular upper-body armor against low
- RESOURCE ERROR: ignored Juri Drive / Fuha / Super state
- PUNISH ERROR: blocked a large reversal but used a small punish

## 10. Sources

- https://frame-search.com/?character_name=%E3%82%B8%E3%83%A5%E3%83%AA&lang=ja-jp
- https://frame-search.com/history
- https://sf6-lab.net/fighters/juri/frame
- https://sf6-lab.net/fighters/juri/combo
- https://ultimateframedata.com/sf6/juri
- https://ultimateframedata.com/sf6/marisa
- https://note.com/nikotarosun/n/nb387936e2040
- https://www.sukoreru.com/sf6-modern-marisa
- https://www.streetfighter.com/6/

## 11. Canonical article

- JA: essays/2026-09-27-sf6-modern-marisa-vs-juri-break-the-connection.md
- EN MIX: english-mix/sf6-modern-marisa-vs-juri-break-the-connection.md
