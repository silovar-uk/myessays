# Research / Structure / Re-research
## スマブラの極意を「技を喰らわないこと」として捉える

Date: 2026-09-20

## 1. 起点

中心仮説：

> スマブラの極意は、技を当てることより先に、技を喰らわないことではないか。

ただし「一発も被弾しない」「守備だけする」という意味にはしない。
狙いは、被弾を **position / timing / option value / disadvantage entry** の問題として捉え直すこと。

## 2. Researchで確認した事実

### Neutral / spacing

- SmashWikiのNeutral gameは、互角状態から相手のミスを咎め、position advantageを得ることをneutral勝利として説明。
- Spacingは相手のoptionsを把握し、それをavoid and counterできる距離・タイミングを選ぶ技術として整理。
- よって「喰らわない」を単なるguardではなく「攻撃が届く位置から外れること」と説明できる。

Sources:
- https://www.ssbwiki.com/Neutral_game
- https://www.ssbwiki.com/Spacing

### Punish / bait

- Punishは相手がvulnerableな状態にあるとき攻撃すること。
- Baitingは相手をvulnerableな行動へ誘い、その反応をpunishすること。
- したがってwhiff punishは「反撃」だけでなく、「whiffを作る前半」がある。

Sources:
- https://www.ssbwiki.com/Punishment
- https://www.ssbwiki.com/Mindgame

### Shield / dodge

- Shieldは攻撃を防げるがgrabには弱く、保持や被弾で縮む。
- Ultimateにはdodge stalingがあり、spot dodge / roll / air dodgeの短時間連打で性能が落ちる。
- Air dodgeは有用だがreckless / repeated useはdiscouragedとされる。
- よって「喰らわない＝回避入力を増やす」は不正確。

Sources:
- https://www.ssbwiki.com/Shield
- https://www.ssbwiki.com/Dodge_staling
- https://www.ssbwiki.com/Airdodge

### Disadvantage

- Hitstun中は行動が制限される。
- Jugglingは着地を許さず連続して攻撃する展開。
- 1回の被弾は表示%だけでなく、combo / juggle / landing / ledgeなど後続展開の入口になりうる。

Sources:
- https://www.ssbwiki.com/Hitstun
- https://www.ssbwiki.com/Juggling

### Frame data

- Ultimate Frame Dataはshield drop、jump out of shield、on-shieldなどのframe dataを整理している。
- 本文では特定キャラの数値を一般化せず、「shield後の行動にもframe上の制約がある」という背景確認に留める。

Source:
- https://ultimateframedata.com/smash

## 3. Structure

文章全体をUneven Uで動かす。

1. Level 4: 「極意は喰らわないこと」問題提起
2. Level 2/1: 実戦の空振り、spacing、shield、dodge staling、juggling
3. Level 3: 最初の被弾が「ターン移動」の入口
4. Level 4: 喰らわないためには逆にthreatが必要
5. Level 2/1: Duck Hunt / Canの具体
6. Level 4: tradeやarmorを反論として戻す
7. Level 5: 喰らわない＝next decision / option valueを残すこと

各主要段落も 4 → 3 → 2 → 1 → 3 → 4 → 5 を目安にするが、機械的にはしない。

## 4. Re-researchで入った補正

### 補正A：「守るほど強い」ではない

Campingとdefensive playを混同しない。
後退だけではstageを失うため、threatを置いて相手のapproachを不自由にする必要がある。

Source:
- https://www.ssbwiki.com/Approach
- https://www.ssbwiki.com/Camping

### 補正B：「回避すれば喰らわない」ではない

Dodge stalingがあるため、回避連打を推奨しない。
本文の主軸は「防御入力」ではなく「position before defense」。

### 補正C：「被弾は全部悪」ではない

trade、armor、%帯、stock状況で合理的な被弾はありうる。
よって中心命題は公式法則ではなく、practice lensとして明示する。

### 補正D：「10発喰らった＝10個の失敗」とは限らない

combo / juggleの後続より先に、neutralからdisadvantageへ移ったfirst hitを確認する。
ただし途中にDIやescape pointがある場合は別途検討。

## 5. 実戦への落とし込み

次の3試合だけ：

- 相手の有利展開が始まった最初の被弾を記憶
- 「間合い / 先振り / 着地 / 崖 / 回避癖 / 反撃欲張り」で分類
- 同じ入口が2回出たら、その日直すのは1点だけ
- 相手の技を空振りさせた場面を成功として数える
- damage dealtだけでなく「危ない場所へ行かなかった」を評価する

## 6. Fact / Interpretation / Proposal

Fact:
- spacing, punish, dodge staling, shield, jugglingなどのメカニクス・一般概念

Interpretation:
- 「スマブラの極意は技を喰らわないこと」
- 「被弾は次の意思決定権を失うこと」

Proposal:
- out of range → defensive option → dodge → punish の思考順序
- first-hit replay review
- next 3 matches drill
