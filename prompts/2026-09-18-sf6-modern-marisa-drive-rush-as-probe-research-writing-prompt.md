# Research + Writing Prompt: Modern Marisa Drive Rush as a Reaction Probe

## Role

あなたは『Street Fighter 6』の攻略情報を、技一覧やコンボ表ではなく「試合中に何を見るか」へ翻訳するゲーム分析ライターです。

特定の攻略ライターの文体は模倣しません。小さな違和感を入口にし、一次情報・現行フレームデータ・実戦攻略を突き合わせ、途中で前提が崩れたらその修正自体を記事の発見にしてください。

## Objective

モダン・マリーザのドライブラッシュについて、次の問いへ答えてください。

1. Modernで使えないClassicの主要rush optionは何か
2. Raw RushとCancel Rushはコストと役割がどう違うか
3. Rush normalの+4F bonusは何に適用され、何には適用されないか
4. Rush Assist Light / Assist Medium / Heavyをどう使い分けるか
5. なぜRush Gladiusが有効なのか
6. cr.MP cancel rushをどの場面で3 stocks払う価値があるか
7. 相手のmash / block / parry / jump / backdash / reversalへ何を返すか
8. neutralとokiでrushの価値はどう変わるか
9. Training Modeで何を録画して検証すべきか

## Research workflow

### Phase 1 — First research

- Modern Marisa-specific guideを最低1つ読む。
- 「使えない技」「推奨rush option」「oki」「cancel rush」の記述を抽出する。
- 攻略者の推奨と、ゲーム仕様・数値を混同しない。

### Phase 2 — Structure

情報を4レイヤーへ分ける。

- **Toolset**: Modernで使える／使えない技
- **Economy**: raw rush 1 stock / cancel rush 3 stocks
- **Frame**: rush normal +4F、base advantage
- **Reaction**: opponent mash / block / parry / jump / reversal

### Phase 3 — Re-research

- 現行バージョンが明記されたframe-data sourceで数値を再確認する。
- Drive Rush +4Fの適用対象をsystem sourceで確認する。
- **Special moves do not receive the +4F normal/unique attack bonus**を必ず確認する。
- 古い攻略と現行数値が違う場合は現行値を優先し、差分を明記する。

## Required conceptual move

記事を「ラッシュで何を押すか」だけで終わらせない。

次のモデルへ発展させる:

`First Raw Rush = Ask a question`
`Opponent reaction = Data`
`Second Rush / Cancel Rush = Answer the reaction`

つまりDrive Rushを「接近手段」だけでなく「reaction probe」として扱う。

## Modern-specific baseline to verify

Before reuse, verify current patch:
- Modern lacks st.LK, cr.MK, 3HP, st.HK.
- Rush Assist Light functions as a low option.
- Rush Assist Medium is used against anti-rush checks.
- Rush Heavy can create +1 on block from st.HP's base -3 plus rush bonus.
- Rush Gladius is used as a brake / bait, not because Gladius receives +4F.
- cr.MP is cancelable and commonly used with cancel-rush buffering.

## Rush frame math

For a normal/unique attack after Drive Rush:

`rush advantage ≈ base advantage + 4F`

Example candidates to verify:
- cr.LK: +2 hit / -3 block → +6 / +1
- st.MP: +2 / -1 → +6 / +3
- st.HP: +3 / -3 → +7 / +1

Always add this qualification:
- spacing, pushback, contact timing, hitbox/hurtbox, and available Modern follow-ups can change practical results.

## Reaction tree

At minimum, write branches for:
- mash / anti-rush check
- passive block
- parry
- jump
- backdash
- invincible reversal / SA

Do not prescribe one “best” rush button. Explain how showing one option changes the defender's next response.

## Overkill research requirement

Run a conceptual six-slot Training Mode experiment:

1. 4F mash
2. block only
3. parry
4. anti-rush light
5. reversal / SA
6. cr.MP block → cancel rush

For each, compare two or three attacker choices and state what the player should learn.

## Writing structure

1. Weird hook: “rush to stop”
2. Modern vs Classic toolset difference
3. Raw 1 stock vs Cancel 3 stocks
4. Three core raw-rush buttons
5. Rush Gladius as feint
6. Cancel rush after contact
7. Defender-response taxonomy
8. Oki application
9. Training Mode experiment
10. Return to hook with changed interpretation

## Style

- ボケを量産しない。
- 「走るためのラッシュで止まる」の事実そのものをフックにする。
- 数字を出したら必ず実戦行動へ翻訳する。
- “strong / useful / important”で止めず、何に対して何が変わるかを書く。
- 事実、計算、攻略者の提案、筆者の解釈を混ぜない。
- Modernを初心者向け／下位互換として扱わない。
- 最後は「ラッシュの見え方が変わった」で終える。

## Source output

本文末に最低限:
- current frame-data URL
- version-diff URL
- Modern Marisa guide URL
- Drive Rush system URL
- research date and adopted version

## Quality gate

- [ ] current versionを明記した
- [ ] Modern-specific move availabilityを確認した
- [ ] raw rush / cancel rushのコストを分けた
- [ ] +4Fがnormal/uniqueだけに乗ると書いた
- [ ] Rush Gladiusに+4Fが乗ると誤記していない
- [ ] spacing caveatを入れた
- [ ] opponent reaction treeを作った
- [ ] 3-stock cancel rushを自動行動にしていない
- [ ] Training Mode experimentが具体的
- [ ] conclusionがopening hookへ戻った
