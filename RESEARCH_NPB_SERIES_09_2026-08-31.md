# NPB学習シリーズ 第9回 Research Note

Updated: 2026-08-31
Series: `野球という産業を読む`
Episode: 9
Role: `PLAYER MOBILITY / CLUB-INITIATED CONTRACT TRANSFER`

## 1. Core Question

**球団同士が選手を動かすとき、実際には何を移転し、誰の権利・同意が関わっているのか？**

表面的にはFAもトレードも「選手が別球団へ移る」。しかし制度mechanismは異なる。

Episode 8で導入した Mobility Mechanism Audit を再利用する。

1. INITIATOR — 誰が移動を始める？
2. RIGHT — どの権利・契約関係が動く？
3. CONSENT — 誰の同意が必要？
4. MARKET / DESTINATION — 移動先はどう決まる？
5. COST / CONSIDERATION — 何が交換・負担される？
6. TIMING — いつ可能？
7. AFTER — 移動後に何が変わる？

## 2. Information basis / source vintage

情報基準日：**2026-08-31**。

日本プロ野球選手会が公開している野球協約の最新版は**2025年度版**。2026年度版が公開済みであるとは確認できないため、本文では「最新公開の2025年野球協約」と表現する。

2026年の運用確認にはNPB公式の2026年度公示と2026-07-31の「選手契約、譲渡可能期間終了のお知らせ」を使う。

## 3. Primary sources

### 日本プロ野球選手会 — 野球協約・統一契約書
https://jpbpa.net/contract/

2025年度版野球協約：
https://jpbpa.net/wp-content/uploads/jpbpa-pdf/ag2025.pdf

Relevant articles:
- 第105条 選手契約の譲渡
- 第106条 事前の同意
- 第107条 選手の貸与禁止
- 第108条 譲渡可能期間
- 第109条 譲渡の強要
- 第110条 譲渡公示の手続
- 第111条 譲渡選手の野球活動
- 第114条 移転費

### NPB — 2026年度トレード公示
https://npb.jp/announcement/2026/pn_traded.html

### NPB — 2026-07-31 選手契約、譲渡可能期間終了
https://npb.jp/news/detail/20260731_02.html

### NPB — 2026年度支配下選手登録
Example:
https://npb.jp/announcement/2026/registered_db.html

### NPB — 2026年度育成選手トレード
https://npb.jp/announcement/2026/pndev_traded.html

## 4. VERIFIED FACTS

### A. What is transferred

最新公開2025年野球協約第105条：

- 球団は、保有する選手との**現存する選手契約**を、参稼期間中または保留期間中に他球団へ譲渡できる。
- 選手契約が譲渡された場合、**契約に関する球団の権利義務**は譲り受け球団へ移る。

Therefore:

**TRADE ≠ ownership of a person**

制度上の中心は、選手本人を「所有物として交換」することではなく、**選手契約上の球団側の権利義務の移転**。

### B. Consent

第106条：

選手は、参稼期間中または契約保留期間中に他球団へ選手契約が譲渡されることを、**統一契約書であらかじめ同意**しなければならない。

Important distinction:

- `NO CONSENT` ではない。
- しかし、標準制度は「個別トレードのたびに移籍先ごとの新規同意を取る」という構造でもない。
- 契約締結時のgeneral prior consentが組み込まれている。

Article wording should avoid both extremes:

- 「選手の同意なしに勝手に売られる」→ misleading.
- 「毎回選手本人が移籍先を承認する」→ not the standard published structure.

### C. No loan / conditional assignment

第107条：

球団は他球団へ選手を貸与したり、呼戻権を留保したり、条件付きで選手契約を譲渡したりできない。

This helps explain why ordinary NPB trade is not a football-style loan mechanism.

### D. Timing

第108条：

選手契約譲渡可能期間は、**年度連盟選手権試合シーズン終了の翌日から翌年7月31日まで**。ただしウエイバーによる譲渡は例外。

NPB 2026-07-31 announcement confirms that 2026年も7月31日に第108条の譲渡可能期間が終了し、8月以降は連盟選手権試合シーズン終了翌日まで、ウエイバー請求による譲渡を除き、支配下選手契約の譲渡・受入はできないと公表。

Classification:
- 2025 agreement = latest published rule text.
- 2026 NPB announcement = current-year operation confirmation.

### E. Procedure / registration

第110条：

- 譲り受け球団は選手契約譲渡協定書と譲り渡し球団の統一契約書をコミッショナーへ提出し、承認申請する。
- コミッショナーは譲り渡し球団の支配下選手登録を抹消し、譲り受け球団の支配下選手として登録・公示する。
- 保留選手の場合は保留球団変更を公示する。

第111条：

譲渡された選手は、譲り受け球団の支配下選手として公示された日から、新球団のための試合・野球活動へ従事できる。

### F. Player cannot conspire to force transfer

第109条は、選手が他球団と通謀して所属球団へ契約譲渡を強要する行為に制裁を定める。

Article implication:

Ordinary trade is not equivalent to a player-held right to demand a move to a selected club.

Do NOT paraphrase this as “players can never request a trade”. Private requests / consultations are different from a formal enforceable right or prohibited collusion.

### G. 2026 examples

NPB 2026 trade public notice includes:

- 2026-05-13: DeNA 山本祐大 → SoftBank; SoftBank 尾形崇斗・井上朋也 → DeNA.
- 2026-04-14: 日本ハム 杉浦稔大 → 中日.
- 2026-07-30: 巨人 若林楽人 → 西武.

The public list demonstrates that transactions can involve reciprocal multi-player movement or a one-way listed transfer, but the public NPB list alone does not necessarily disclose all economic consideration. Do not infer “free” or “cash” consideration when official source does not say so.

## 5. Mobility Mechanism Audit — Trade vs FA

| Variable | TRADE | FA |
|---|---|---|
| INITIATOR | Ordinary mechanism is negotiated by clubs | Player must first earn eligibility and exercise right |
| RIGHT | Existing player contract / club-side rights and obligations are assigned | Player expands the set of clubs with which a contract can be concluded |
| CONSENT | General prior consent is embedded in uniform contract | Player personally chooses whether to exercise FA |
| DESTINATION | Determined through club-to-club transaction structure | Player negotiates and ultimately agrees with destination; former club can also re-sign |
| TIMING | Transfer window under Article 108 | FA eligibility/declaration calendar |
| AFTER | Existing contract relationship continues with receiving club as contract counterparty | New contract agreement is reached after declaration/negotiation |

Editorial note:

`CLUB-CONTROLLED MOBILITY` is understandable but can overstate lack of player agency. Prefer:

**CLUB-INITIATED CONTRACT TRANSFER**

or Japanese:

**球団間合意で動く契約譲渡型のmobility**.

## 6. FACT vs INTERPRETATION

### FACT

- Existing player contract can be assigned to another NPB club.
- Club-side rights and obligations under that contract transfer to receiving club.
- Player gives advance consent through the uniform contract.
- Loan / recall-right / conditional assignment is prohibited under Article 107.
- Ordinary transfer window ends July 31; waiver exception exists.
- Commissioner approval/registration/public notice completes procedural transition.

### INTERPRETATION

- A trade can be read as a **roster reallocation mechanism**.
- FA changes a player's negotiation market; a trade changes the club counterparty to an existing contract through a club-to-club mechanism.
- Same visible outcome (“new club”) can emerge from different institutional paths.

Do not present these editorial labels as NPB official terminology.

## 7. Rule Lifecycle Audit

### CURRENT / EFFECTIVE

- Article 105–111 structure in latest public 2025 agreement.
- 2026 current-year operation confirms July 31 deadline.

### PROPOSED

No trade-specific 2026 structural reform sufficiently verified during this research to include as a central article claim.

### AGREED but not effective

None verified for central trade rules.

### WATCH

- publication of 2026 Baseball Agreement
- transfer deadline
- uniform contract wording
- waiver rules
- active-player-draft changes that could affect comparisons
- FA compensation reform only insofar as it changes trade-vs-FA comparison

## 8. Information Budget

Include:

- player contract assignment
- rights/obligations moving
- advance consent
- no-loan principle
- July 31 timing
- commissioner approval and registration
- FA comparison
- one minimal 2026 example

Do not deep-dive:

- all historical trades
- “winner/loser” rankings
- MLB trade rules / no-trade clauses
- cash consideration formulas not clearly public in current NPB sources
- active-player draft details
- posting
- waiver procedure details
- agent negotiation

## 9. Rejected / risky claims

Reject:

- 「選手そのものを売買する制度」
- 「トレードには選手の同意がない」
- 「トレードは毎回選手本人の承認が必要」
- 「球団はいつでもトレードできる」
- 「トレードされたら契約が一度終了して新契約になる」
- 「一方向の公示だから無償トレード」
- 「トレード要求権が制度上保障されている」
- MLB no-trade clauseのNPBへの無検証転用

## 10. Better Question target

Before:

「誰と誰がトレードされた？」

After:

**「この移動は誰が始め、どの契約関係が移り、選手の同意はどの段階で与えられ、FAなら何が違った？」**
