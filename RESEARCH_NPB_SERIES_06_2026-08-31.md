# NPB学習シリーズ 第6回 Research Note

Updated: 2026-08-31
Article ID: `npb-player-development-farm-roster-pipeline`
Series: `野球という産業を読む`
Episode: 6
Role: `PLAYER DEVELOPMENT / TEAM BUILDING`
Classification: Hybrid
Information basis date: 2026-08-31

## 1. Core Question

**球団は、獲得した選手をどのように育成・評価し、一軍戦力へ変えているのか？**

Episode 5で新人選手との契約交渉権の配分を見た。

Episode 6では、契約後に発生する

`ACQUIRE → DEVELOP → PLAY → EVALUATE → REGISTER → PROMOTE / USE`

をplayer developmentの分析フレームとして扱う。

この矢印はNPB公式の制度名称ではなく、理解のためのeditorial model。

## 2. Most important beginner distinction

次の3軸を混ぜない。

### Axis A — 契約・登録区分

- 支配下選手
- 育成選手

### Axis B — 競技環境

- 一軍
- ファーム

### Axis C — 一軍出場状態

- 出場選手登録
- 非登録

Guardrail:

- `支配下 = 一軍` と書かない。
- `育成 = 二軍` と書かない。
- `ファーム = 育成選手だけ` と書かない。
- `支配下になった = 一軍出場確定` と書かない。

## 3. Current roster facts

### NPB 2026 公示

Source:
https://npb.jp/announcement/2026/

2026-08-31取得時点：

- 支配下登録選手：836名（7月31日現在）
- 育成選手：230名（8月27日現在）

### 7月31日の球団別人数

Source:
https://npb.jp/news/detail/20260731_02.html

Central:

- 巨人 70 / 育成35
- ヤクルト 69 / 10
- DeNA 70 / 11
- 中日 70 / 11
- 阪神 70 / 10
- 広島 68 / 10

Pacific:

- 日本ハム 69 / 13
- 楽天 70 / 10
- 西武 70 / 32
- ロッテ 70 / 18
- オリックス 70 / 21
- ソフトバンク 70 / 48

本文では「支配下の現在値」と「一軍登録」を別概念として扱う。

野球協約の条文全文を今回のWeb取得では直接引用していないため、70という数字を制度史の中心にはしない。

## 4. 育成 → 支配下は実際に動くtransition

Source:
https://npb.jp/announcement/2026/pn_registered.html

2026年中にも多数の育成選手が支配下へ移行している。

Examples:

- 冨士大和
- 佐藤爽
- 森脇亮介
- 是澤涼輔
- 平山功太
- J.ティマ
- 笹原操希
- 知念大成
- 代木大和
- 鈴木大和
- 福元悠真
- 清宮虎多朗
- 常谷拓輝
- 森遼大朗
- 髙橋快秀

Editorial use:

`育成 → 支配下`を「昇格」の一種類として見せるが、そのあとに`出場選手登録`が別にあることを必ず書く。

## 5. 出場選手登録は別レイヤー

Current NPB daily roster page:
https://npb.jp/announcement/roster/

2026-08-31の公示でも支配下選手の登録・抹消が日次で動いている。

2026-08-26の例：
https://npb.jp/announcement/roster/roster_0826.html

埼玉西武の出場選手一覧は31名。

2026-07-20:
https://npb.jp/announcement/roster/roster_0720.html

7月20日抹消選手について、NPBは「7月30日以後でなければ再登録できません」と明記。

Therefore:

`club-controlled / registered player`
≠
`currently active first-team player`

## 6. 2026 Farm structure — major current update

### Change

2026年度から、ファーム・リーグは

**イースタン／ウエスタン2リーグ制 → 1リーグ3地区制**

へ変更。

Sources:
https://npb.jp/news/detail/20260122_01.html
https://npb.jp/farm/2026/schedule_note.html
https://npb.jp/campaign/2026/farm/

### East — 5

- 東北楽天
- オイシックス新潟
- 東京ヤクルト
- 千葉ロッテ
- 北海道日本ハム

### Central — 5

- 埼玉西武
- 読売
- 横浜DeNA
- ハヤテ静岡
- 中日

### West — 4

- オリックス
- 阪神
- 広島東洋
- 福岡ソフトバンク

Total = 14.

Critical beginner guardrail:

**一軍12球団とファーム14球団を混同しない。**

オイシックス新潟、ハヤテ静岡は一軍12球団には入っていないが、ファーム公式戦へ参加している。

## 7. 2026 Farm schedule architecture

Source:
https://npb.jp/farm/2026/schedule_note.html

Basic design:

`地区内対戦を6カード → 他地区交流戦を2カード`

を繰り返す。

東・中は各5球団で奇数のため、地区内対戦期間にも東中間の交流戦が発生。

予定試合数は統一されていない。

Range:

135–146 games.

Examples:

- 東京ヤクルト 135
- 千葉ロッテ 135
- 北海道日本ハム 136
- オリックス 137
- 広島 137
- 東北楽天 139
- DeNA 139
- オイシックス 140
- ハヤテ 140
- ソフトバンク 141
- 中日 142
- 西武 143
- 巨人 144
- 阪神 146

Retrieval Bridge to Episode 4:

Episode 4:
`schedule = architecture of competition`

Episode 6:
`schedule = part of the development environment`

## 8. Farm is not rookie-only

NPB Farm Championship 2026:
https://npb.jp/farmchamp/2026/information.html

Eligibility includes both支配下 and育成登録 players meeting conditions.

It explicitly contains:

- current-year rookies
- players never registered to first team during the year
- players with first-team registration history if usage thresholds are met

Thus the farm system is not structurally limited to rookies.

## 9. Evidence that experienced / returning players use farm games

NPB official historical game results show established first-team players in farm games.

2024 March:
https://npb.jp/farm/2024/schedule_03_detail.html

Examples:

- 宮城大弥
- 西勇輝
- 田口麗斗
- 髙橋光成

2024 July:
https://npb.jp/farm/2024/schedule_07_detail.html

Examples:

- 大貫晋一
- 柳裕也
- 平井克典 等

Current 2026 contextual supporting evidence:

Pacific League.com, 2026-07-17:
https://pacificleague.com/news/2026/7/84743

- 石川慎吾：登録抹消後ファームで調整
- 山本祐大：手術後にファームで実戦復帰

Pacific League.com, 2026-08-11:
https://pacificleague.com/news/2026/8/85355

- 茶谷健太：手術後の実戦復帰
- 西川愛也：登録抹消後ファームで実戦復帰

Interpretation allowed:

Farm games function not only as development opportunities but also as adjustment / return-to-play environments.

Do not claim this is the single official statutory purpose of the farm league.

## 10. Farm infrastructure / organizational capability

NPB 2023 new-participation review:
https://npb.jp/news/detail/20230929_03.html

Review requirements included:

- home stadium
- indoor practice facility
- dormitory / welfare facilities
- sufficient players for farm games
- manager / coaches / staff development system
- financial sustainability
- municipality cooperation
- governance / compliance

This supports the Business Bridge:

player development is not only coaching.

It requires organizational infrastructure.

Editorial interpretation:

**Player development is organizational capability.**

Do not claim a quantified ROI.

## 11. Information Budget

Include:

- 3-axis distinction
- current 2026支配下 / 育成 snapshot
- daily first-team registration layer
- 2026 farm 14-team / 3-region change
- nonuniform farm schedule
- development / adjustment role
- development pipeline
- bottleneck framework

Do not deeply include:

- complete野球協約
- all roster limits and exception clauses
- every farm player
- all teams' third/fourth squads
- farm stadium catalog
- MLB minor league comparison
- FA
- trade rules
- active draft
- player salary details
- release / non-tender system

## 12. FACT / INTERPRETATION separation

FACT:

- 2026 farm is 1 league / 3 regions / 14 clubs.
- planned games vary from 135 to 146.
- NPB separately publishes支配下, 育成, and first-team active registration.
- support-to-controlled-player transitions occur during 2026.
- farm championship eligibility includes both registration types.

INTERPRETATION:

- farm is part of a development environment.
- player acquisition and player conversion into first-team contribution are separate capabilities.
- schedule can be read as allocation of game reps.
- bottlenecks matter as much as input quality.

## 13. Beginner Check

Article must leave reader able to say:

1. 支配下 = 一軍ではない。
2. 育成 = 二軍ではない。
3. 一軍 / ファーム is a different axis from 支配下 / 育成.
4. 出場選手登録 is a further layer.
5. 2026 farm is 14 teams / 3 regions, not the old East/West system.
6. farm games can serve development and adjustment.
7. acquisition alone does not produce first-team performance.

## 14. Update watchpoints

On future update, recheck:

- farm league structure
- participating clubs
- district assignments
- farm game-count design
- first-team active registration rules / counts
- re-registration interval
- controlled-player registration period
- support-to-controlled-player deadlines
- farm championship eligibility

## 15. Candidate next questions after Episode 6

A. Why does player salary change every year?

`PLAYER DEVELOPMENT → PLAYER VALUE / CONTRACT`

B. What does free agency make free?

`TEAM CONTROL → PLAYER MOBILITY`

C. What is a trade exchanging?

`ROSTER → PLAYER EXCHANGE`

D. How do foreign players enter NPB?

`DOMESTIC PIPELINE → GLOBAL TALENT MARKET`

E. What does release / 戦力外 decide?

`ENTRY → DEVELOPMENT → EXIT`

Provisional editorial preference after research:

**Episode 7 = なぜ選手の年俸は毎年変わるのか**

Reason:

Episode 2 role → Episode 3 metrics → Episode 5 acquisition → Episode 6 development now gives enough foundation to ask how club evaluation becomes contract price.
