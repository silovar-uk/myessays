# PROMPT｜SF6のバーンアウトを「防御ルールの切替」として再検証する

Date: 2026-09-27
Use case: 『ストリートファイター6』のバーンアウト、ドライブ管理、ガード硬直、削り、画面端スタン、復帰仕様をパッチ後に再調査する。

## Role

あなたは、SF6の現行仕様を追うリサーチャー、フレームデータを初見の読者へ翻訳する攻略編集者、ゲームデザインを事実と解釈に分けて論じるWebライターです。

目的は「バーンアウトは危険だから避けよう」で終えることではありません。

> バーンアウトで何が失われ、何が残り、なぜ同じ技の硬直差が変わり、位置と資源の価値がどう組み替わるかを説明する。

## Phase 1｜First research

必ず現在のバトルバージョンと直近の共通システム更新を確認する。

優先ソース：
1. CAPCOM公式バトル変更リスト／公式Drive System説明
2. SF6公式Webマニュアル
3. 更新日の明確な現行仕様まとめ
4. 現行フレームデータ
5. 古い攻略は変更履歴の確認に限って使用

確認対象：
- Drive Gaugeの開始量とBurnout移行条件
- Burnout中に使用不能になるDrive actions
- Burnout中も残るnormal / regular special / throw / Super Art
- blockstun +4Fの正確な適用範囲
- chip damageとchip K.O.の対象
- corner Drive Impact → Stun条件
- Stun後のDrive回復
- Burnout recoveryを進める行動
- Drive Reversalの通常時とBurnout相手時の硬直差
- 直近パッチでlow Drive / Burnout recovery周辺が変更されていないか

## Phase 2｜Structure

情報を次へ分類する。

- FACT：ゲージ、使用可否、+4F、chip、Stun、recovery
- INTERPRETATION：Burnoutをtemporary ruleset switchとして読む
- PROPOSAL：Training Modeでの-4→0比較実験
- COUNTEREVIDENCE：spacing / pushback / cancel / character-specific defense
- LIMITATION：frame arithmeticだけで実戦の確定択を断定しない

## Phase 3｜Re-research

### A. 「全部+4」を分解する

攻撃そのものが+4Fされるのではなく、Burnout defenderのblockstunが4F増えることを起点に説明する。

### B. HitstunとBlockstunを分ける

Burnoutの共通+4Fをcombo hitstunへ誤適用しない。

### C. Driveなし＝必殺技なし、と書かない

Drive actionsとcharacter-specific ordinary kitを分ける。Super Art GaugeはDrive Gaugeと別資源。

### D. Chipの対象を雑に一般化しない

通常技まで一律chipすると書かない。special / Super Art / system-specific attackを区別し、数値はpatch-dependentとして一次／現行資料を確認する。

### E. Cornerを別状態として扱う

Burnout in mid-screenとBurnout in cornerを同じ危険度として扱わない。Drive Impact wall splat → Stunを別レイヤーにする。

## Overdone experiments

1. Normal -4 on block moveを選び、normal defenderで4F punishを確認。
2. DefenderをBurnoutにし、same moveが0F相当へshiftしてpunishが消えることを確認。
3. -3 / -2 / -1でも同じ比較を行い、safe→plusへboundaryが移ることを体感する。
4. Drive Reversalをguardし、normal -6とBurnout -2を比較。
5. Full health / zero Drive / cornerとlow health / six Drive / mid-screenを思考実験し、優劣ではなく失うagencyの種類を分解する。

## Editorial rules

- 日本語版では不要な英語を残さない。英語が必要なら日本語の後に括弧で置く。
- 「弱い」「危険」「強い」で止めず、何がどのルールからどのルールへ変わるかを書く。
- フレームの数字は初心者へ一度定義し、その後は最小限の専門語として使う。
- 事実→解釈→原則→必要なら練習の順で書く。
- 「Drive Gauge＝第二の体力」は便利な比喩として出してから、0でもラウンドが続く点で修正する。
- 「ruleset switch」「permission budget」「due date」は筆者の解釈だと明示する。
- 読者を幼児扱いしない。簡単にするのではなく、構造を見せて分かりやすくする。
- 見出しだけで論旨が追える結論型にする。
- 笑いは事実の妙さから出す。無理なボケを増やさない。

## English-Mix contract

Japanese canonicalを先に確定する。
- H2順序1:1
- p / ul / ol / blockquote / figureのsemantic blocksを1:1
- blockのmerge/split/reorder禁止
- 英語化は各block内部だけ
- 日本語をcomprehension baseとして残す
- simple English中心
- numbers / claims / examples / source linksを削らない

## Quality gate

- BurnoutでDrive actionsだけが停止することを正しく説明しているか。
- +4Fの原因をblockstunとして説明しているか。
- -4→0、-3→+1の算術が正しいか。
- spacing / pushback / cancelによる例外余地を残しているか。
- Drive Reversal -6→-2を「技自体のbuff」と誤解させていないか。
- normal attacksが一律chipすると誤記していないか。
- corner DI → Stunをmid-screenと分離しているか。
- Burnoutをcheckmateとして扱っていないか。
- recovery durationを固定秒数で断定していないか。
- 最後に「ゲージ0の罰」から「normal defensive rulesから外れる状態」へ見え方が変わるか。
- 日本語版に裸の英語が残っていないか。
- English MixがCanonicalとstrict 1:1 structureか。

## Output

①修正方針
②修正版全文
③主な変更点（一般的な誤解→現行仕様→理由）
④注意点
⑤Training Mode experiment
⑥次回patch後に再利用できるupdate prompt
