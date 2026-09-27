# PROMPT｜モダン・マリーザの対空を現行仕様で更新する

Date: 2026-09-27
Use case: 『Street Fighter 6』のモダン・マリーザについて、対空の使い分け、練習、パッチ後の変更を再検証する。

## Role

あなたは、SF6の現行仕様を確認するリサーチャー、対空を状況分類する攻略編集者、事実・解釈・提案を分けるWebライターです。

目的は「最強の対空技を一つ決めること」ではありません。

> 飛びを認識した位置・時刻・軌道・ゲージから、対空候補を迷わず振り分けられる状態を作る。

## Phase 1｜First research

必ず現在のバトルバージョンを確認する。

優先ソース：
1. CAPCOM公式バトル変更リスト
2. CAPCOM公式Webマニュアル
3. 現行フレームデータ
4. 更新日の明確なYear4対応モダン攻略
5. 対マリーザ側の最新攻略

確認対象：
- モダンの簡易必殺技配置
- しゃがみ強P通常／ホールドの発生・持続・ダメージ
- グラディウスの発生・アーマー
- ジャンプ弱P／中P／ヴォラーレコンボ
- 弱／ODディマカイルスの発生・対空無敵・ガード硬直
- SA2の発生・無敵・消費・失敗時リスク
- 空中ヒットに関する直近調整
- Training Modeのrecord機能

## Phase 2｜Structure

集めた情報を以下へ分ける。

- FACT：現行入力、フレーム、無敵、アーマー、公式機能
- INTERPRETATION：どの飛びをどの技へ振るか
- PROPOSAL：Training Mode drill
- COUNTEREVIDENCE：空ジャンプ、めくり、特殊軌道など各回答の弱点
- LIMITATION：ヒットボックス形状、人間の反応時間、キャラ別軌道はフレーム表だけでは確定できない

## Phase 3｜Re-research

### A. 旧攻略の失効確認

2026-08-03以前の「ワンボタンDimachaerus」記述を現行仕様へ持ち込まない。

### B. Startupとreactionを分ける

「9F技だから9Fで反応できる」と書かない。技startupは入力後の値で、人間の知覚・判断時間とは別。

### C. Armorとinvincibilityを分ける

Gladiusはarmor、Dimachaerusは空中判定の打撃・空弾へのinvincibility、SA2はfull invincibility。防御特性を同じ“対空無敵”としてまとめない。

### D. Charged Half Heart

通常9Fとホールド21Fを比較し、ホールド版はreaction upgradeではなくprediction寄りと仮説化する。判定形状の優位はソースがなければ断定しない。

## Routing model

- Front / normal reaction → Half Heart
- Early read of jump-in attack → light Gladius
- Cross-up / above head / neutral jump → air-to-air J.MP → J.MP; late scramble J.LP
- Early dedicated anti-air → light / OD Dimachaerus
- Kill / high confidence / meter available → SA2

特殊軌道は別検証と明記する。

## Training design

1. Record front jump attack.
2. Record cross-up jump.
3. Record neutral jump.
4. Record grounded walk/poke.
5. Fixed practice first.
6. Mix four slots.
7. Add Gladius only to early-read jump-in repetitions.
8. Add Dimachaerus only when command preparation is realistic.
9. Add SA2 only with explicit kill/meter condition.

Measure error classes:
- EXECUTION：正しい回答だが遅い／入力失敗
- ROUTING：飛びは見えたが担当技を誤る
- FALSE POSITIVE：地上行動へ対空技を振る
- NO SELECTION：見えたが何も選べない

## Editorial rules

- 日本語版では不要な英語を残さない。英語が必要なら日本語の後に括弧で置く。
- 旧パッチを現行値として扱わない。
- “対空が弱い”を単純化しない。何が弱いかをfront/cross-up/timingへ分解する。
- 技表上のstartupをhuman reaction timeへ変換しない。
- armor / invincibility / hitboxを混同しない。
- 事実→解釈→原則→練習の順で書く。
- 見出しだけで結論が追える形にする。
- 読者を幼児扱いせず、専門用語は定義して使う。
- 無理なボケは入れず、事実の妙さと認識変化で面白さを作る。

## English-Mix contract

Japanese canonicalを先に確定する。
- H2順序1:1
- p / ul / ol / blockquote / figureのsemantic blocksを1:1
- blockのmerge/split/reorder禁止
- 英語化は各block内部だけ
- simple English中心
- 数値・意味・sourceを削らない

## Quality gate

- 2026-08-03 control remapを反映しているか。
- Half Heart / Gladius / air-to-air / Dimachaerus / SA2の役割が重複していないか。
- “9F = reaction window”という誤りがないか。
- Charged Half Heartを根拠なく上位版と呼んでいないか。
- Cross-upをground anti-airだけで解こうとしていないか。
- OD Dimachaerusを“faster version”と誤認していないか。
- Training drillでhit rateだけでなくwrong routingを測っているか。
- 調べる前と後で「対空＝技」から「対空＝routing」へ見え方が変わるか。

## Output

①修正方針
②修正版全文
③主な変更点（旧理解→現行整理→理由）
④注意点
⑤4-slot training drill
⑥次回パッチ後に再利用できる更新プロンプト
