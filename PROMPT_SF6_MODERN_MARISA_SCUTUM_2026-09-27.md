# PROMPT｜モダンマリーザのスクトゥムを現行仕様で再検証する

Date: 2026-09-27
Use case: 『Street Fighter 6』のモダン・マリーザについて、スクトゥムの仕様、派生、実戦用途、対策、パッチ後の変更を再検証し、記事を更新する。

## ①修正方針

主な課題：
- 「当身」「パリィ」「アーマー」「無敵」を同じ意味で扱うと、スクトゥムの負け方を説明できない。
- 「OD版は1Fだから強い」だけでは、投げ負け、アーマーブレイク、成立後の+1〜+3F、派生のリスク差が抜ける。
- スクトゥム成立後を一律+3Fとすると、遅らせ打撃などで+1Fになる状況を誤る。
- モダン版はスクトゥムと派生を手動入力で100％火力へ戻せないため、クラシック版のダメージをそのまま載せると誤情報になる。
- 中段・下段・投げを「三択」とだけ呼ぶと、-3／-21／-24／空振りリスクの非対称性が消える。

修正方針：
- 事実→解釈→原則→実戦運用の順で書く。
- 「通常版」と「OD版」を防御範囲、発生、アーマー回数、用途で分ける。
- 自動反撃の生ヒット-1Fと、Counter +2F / Punish Counter +4Fを分けて説明し、+1〜+3Fの理由を算術で示す。
- モダン専用ダメージを明示する。
- 派生は「属性」だけでなく「失敗時の値段」で比較する。
- 相手側の対策を先に整理し、自分が押してよい場面を逆算する。
- 実機で再現できる4録画のTraining Mode検証手順を付ける。

## ②修正版全文

Canonical:
essays/2026-09-27-sf6-modern-marisa-scutum-armor-stance.md

English-Mix:
english-mix/sf6-modern-marisa-scutum-armor-stance.md

日本語Canonicalを唯一の正本とし、English-MixはH2順序とsemantic blockを1対1で保持する。

## Phase 1｜First research

必ず現在のバトルバージョンと参照日を確認する。

優先ソース：
1. CAPCOM公式バトル変更リスト
2. CAPCOM公式参照の現行フレームデータ
3. モダン操作専用の現行技データ
4. 更新日の明確な対マリーザ攻略
5. 補助的なWiki・技解説
6. 歴史的語義は博物館など一次性の高い資料

確認対象：
- Modern input: Scutum / OD Scutum / Tonitrus / Procella / Enfold
- Normal Scutum: armor starts 3F, upper body, one armor count
- OD Scutum: armor starts 1F, full-body strike coverage, two armor counts
- automatic counter: 7F startup, raw -1 on hit, -3 on block
- follow-up window: 9-14F
- Counter Hit +2F / Punish Counter +4F
- Tonitrus first/second hit startup, damage, hit/block advantage
- Procella startup, damage, knockdown, block disadvantage
- Enfold startup, Modern damage, practical startup through stance
- Modern simple-input damage scaling
- Punish Counter vulnerability during Scutum/follow-ups
- throw / low / armor-break / wait / jump as counterplay
- Burnout vs Drive Impact interaction
- whether Scutum can be special-cancelled from normals
- latest patch changes that affect these numbers

## Phase 2｜Structure

FACT:
- input
- armor frames
- armor coverage/count
- auto-counter startup and raw advantage
- branch startup/damage/block data
- Modern scaling
- cancel rules
- counter-system frame bonus

INTERPRETATION:
- normal = predictive strike armor
- OD = 1F strike reversal, not invincibility
- successful Scutum = defense-to-offense switch
- +1 and +3 require different second decisions
- branch choices are asymmetric in risk

PROPOSAL:
- four-record Training Mode drill
- error taxonomy based on wrong read, not only hit rate

COUNTEREVIDENCE:
- throws
- lows vs normal
- armor break
- empty jump / neutral jump
- waiting
- back walk vs Enfold
- unsafe branch on block

LIMITATION:
- matchup-specific hitbox interactions
- exact +1/+3 depends on the absorbed move and timing
- “full body” is a practical description for strike coverage; do not rewrite it as invincibility
- patch-sensitive frame values must be rechecked after balance updates

## Phase 3｜Re-research

### A. 「当身」表現を監査する

「当身」はプレイヤー向けの便宜的表現としてのみ使う。
仕様説明ではarmorと書く。
Drive Parryやinvincibilityと同一視しない。

### B. ODを「無敵技」と書かない

OD Scutum is frame-1 armor against strikes.
It still loses to throws and armor-break properties.
This distinction must survive all edits.

### C. +3固定を禁止する

Raw auto-counter hit advantage = -1F.
Counter Hit adds +2F → +1F.
Punish Counter adds +4F → +3F.
Write +1〜+3F unless a specific setup proves +3.

### D. Modern damageを別表で確認する

Do not copy Classic damage:
- auto-counter 560
- Tonitrus 720 / 800
- Procella 960
- Enfold 2000

### E. 派生のリスク差を残す

Tonitrus first: -3 on block.
Tonitrus second: -21.
Procella: -24.
Enfold: command throw; loses to jump/back walk/spacing and has whiff risk.

## ③主な変更点

旧理解：
「スクトゥムは1F当身。成功したら+3でコマ投げとの二択。」

現行整理：
「通常版は3F上半身1回アーマー、OD版は1F全身・2回アーマー。自動反撃は生ヒット-1Fだが、相手の攻撃動作へCounter / Punish Counterで刺さるため+1〜+3Fになる。そこから中段・下段・投げへ行けるが、各派生の失敗コストは大きく異なる。」

理由：
- armor / invincibility / parryの区別が必要。
- +1と+3で安全な二手目が変わる。
- Modernは簡易入力補正で成功時の火力が低下する。
- 対策側のthrow / low / wait / jumpを入れないと実戦像が歪む。

## ④注意点

- 現行値の基準日は2026-09-27。
- SF6 Labは2026-08-27時点のOfficial Street Fighter 6 Frame Data参照を掲げている。
- 一部攻略サイトには旧ガード硬直値や旧モダン必殺技配置が残るため、数値が競合した場合は現行公式参照データを優先する。
- OD Scutumの「全身」は打撃・下段への実戦上のcoverageを指し、throw invincibilityではない。
- “Scutum成功後+3”は固定値にしない。
- Enfoldの5Fはstance中のmove startupであり、forward+Specialから5Fで投げる意味ではない。
- Burnout中のDrive Impact対策はタイミング依存なので、「使える」「狙える」と書き、「必ず返せる」と断定しない。
- matchup-specific low profile / cross-up / multi-hit interactionは別途実機確認する。

## Training design

1. Record a true meaty 4F normal.
2. Record the same normal with delay.
3. Record wake-up throw.
4. Record low strike.
5. Test OD Scutum against all four.
6. Compare normal Scutum only on the low-strike slot.
7. Read frame meter after auto-counter.
8. Separate +1 and +3 repetitions.
9. At +3, test Tonitrus first / Enfold / wait.
10. At +1, enable opponent 4F mash and retest.
11. Track errors by category.

Error classes:
- READ ERROR：throw/lowを読まずScutum
- COVERAGE ERROR：normal Scutumでlowを取ろうとする
- FRAME ERROR：+1を+3として扱う
- BRANCH ERROR：unsafe branchを読まれて確反
- EXECUTION ERROR：Modern input自体の失敗

## Editorial rules

- 日本語版では不要な英語を残さない。英語を使う場合は日本語の後に括弧で補足する。
- 技名は公式日本語表記を優先する。
- 「強い」「安全」「万能」を、数値と負け方なしで使わない。
- フレーム表にないhitbox superiorityを断定しない。
- “1F armor = invincible”と書かない。
- “+3 fixed”と書かない。
- “5F Enfold from neutral”と書かない。
- 事実・解釈・提案を混ぜない。
- 見出しだけで論旨を追える形にする。
- 読者を幼児扱いせず、用語は定義してから使う。
- 笑いは技の構造の妙さ、Roman shieldとの落差、数字の逆説から作る。

## English-Mix contract

Japanese Canonical first.
- H2 order 1:1
- p / ul / ol / blockquote / figure semantic blocks 1:1
- no merge / split / reorder
- transform inside each block only
- simple English中心
- keep every number and limitation
- do not make the English-Mix more assertive than Canonical

## Quality gate

- normal 3F upper-body one armor count is correct.
- OD 1F strike coverage / two armor counts is correct.
- throws remain a weakness.
- auto-counter raw -1 is separated from +1/+3 real outcomes.
- Modern damages are 560 / 720 / 800 / 960 / 2000.
- Tonitrus -3 / -21 and Procella -24 remain visible.
- Enfold is not described as a neutral 5F command grab.
- Scutum is not described as cancellable from normals.
- Burnout DI use is qualified.
- counterplay is included.
- final insight changes the view from “shield/counter” to “defense-to-offense conversion.”
