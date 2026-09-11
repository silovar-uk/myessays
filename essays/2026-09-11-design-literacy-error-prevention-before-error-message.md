---
id: design-literacy-error-prevention-before-error-message
title: "エラー文を丁寧にする前に、そもそも間違えさせない――Error Preventionの設計"
subtitle: "Design Literacy #34｜Prevention / Detection / Recovery / Reversibility"
created: "2026-09-11"
updated: "2026-09-11"
type: "Essay"
status: "完成"
tags: ["Design Literacy", "UX", "Error Prevention", "Accessibility", "Human Factors", "Interaction Design"]
keywords: ["Error Prevention", "Error Recovery", "Undo", "Confirmation Dialog", "WCAG 3.3.4", "Slips", "Mistakes", "Human Error", "Constraints"]
favorite: 5
grow: 5
series: "Design Literacy｜細部から思想まで"
seriesOrder: 34
abstract: "丁寧なエラー文があるのに、なぜ同じ失敗が何度も起きるのか。Error Preventionを、Prevention / Detection / Recovery / Reversibilityの4層で整理し、確認ダイアログ、Undo、入力制約、WCAG、slipsとmistakesまで掘る。"
---

# エラー文を丁寧にする前に、そもそも間違えさせない
## Design Literacy #34｜Error Preventionの設計

フォームに赤文字が出る。

> 入力内容に誤りがあります。

丁寧である。

でも、ちょっと待ってほしい。

**この画面、毎回ユーザーを同じところで転ばせてから、丁寧に謝ってないか。**

道に穴を掘って、その横に「お気をつけください」と看板を立てているみたいな話である。

今回は、エラー文そのものではなく、その一歩前を見る。

## 1. エラー対応は「起きた後」だけではない

NN/gのUsability Heuristic #5は、良いエラー文も重要だが、より良い設計は問題の発生自体を防ぐと整理している。

その観点から、エラー設計を4段階に分けると理解しやすい。

```text
PREVENT
間違えにくくする

DETECT
間違いに気づかせる

RECOVER
直せるようにする

REVERSE
元に戻せるようにする
```

これは単なる言葉の整理ではない。

同じ「エラー対策」でも、どこに介入するかが違う。

たとえばチケットを3枚買いたいのに、数量欄へ33と入力したとする。

エラー文だけで対応するなら、購入ボタンを押したあとに「購入可能枚数を超えています」と出る。

一方、最初から `[-] 3 [+]` のステッパーにして最大6枚までしか選べないなら、そもそも33は作れない。

前者はRecovery寄り。

後者はPrevention寄り。

**Good error design starts before the error happens.**

## 2. 「確認ダイアログ」は安全装置なのか

ここで一回、確認ダイアログを疑ってみる。

```text
本当に削除しますか？

[キャンセル] [削除]
```

一見、とても安全そうだ。

しかしNN/gは、確認を乱発するとユーザーが内容を読まずに反射的にConfirmを押すようになり、警告自体の効力が落ちると指摘している。

これはかなり妙だ。

安全のために確認を増やしすぎると、確認が安全装置ではなくなる。

「狼が来た」と言いすぎて、誰も聞かなくなる。

ではどうするか。

削除のような操作であれば、場合によっては

```text
削除しました
[元に戻す]
```

の方が良い。

W3Cのフォーム検証ガイダンスでも、可能な場合はreversible actionにUndoを用意することが推奨されている。

つまり安全性は、

**確認すること**

ではなく、

**失敗しても戻れること**

でも作れる。

## 3. WCAG 3.3.4を「確認画面ルール」にしない

WCAG 3.3.4 Error Prevention (Legal, Financial, Data) は、法的拘束や金融取引、重要なデータ変更・削除などに対して、少なくとも一つの保護策を求めている。

代表的なのは、

- reversibleである
- 入力内容をcheckできる
- submission前にreview / confirmできる

といった方法だ。

ここで重要なのは、**確認ダイアログを必須としているわけではない**こと。

「大事な操作には全部モーダル」という読み方をすると、設計が一気に雑になる。

大事なのは結果の重大性と、やり直し可能性だ。

## 4. やりすぎ実験：全部に確認を付けてみる

極端なUIを想像する。

```text
ファイルを開きますか？
↓
本当に開きますか？
↓
このファイルで間違いないですか？
↓
編集を開始しますか？
↓
本当に編集しますか？
```

安全である。

ものすごく安全である。

そして、たぶん誰も使いたくない。

この極端な例から見えるのは、Error Preventionは「止めること」ではないということだ。

むしろ、**必要なところだけ止め、不要なところでは流れを壊さない設計**である。

整理するなら、最低でも3軸で見るといい。

```text
RISK
失敗したときの被害

FREQUENCY
その操作をどれだけ頻繁に行うか

RECOVERABILITY
失敗後にどれだけ戻せるか
```

高リスク・不可逆なら強い確認が合理的。

低リスク・Undo可能なら、確認を挟まない方が良い場合もある。

## 5. SlipsとMistakesを分ける

Don Normanは、人間のエラーを大きくSlipsとMistakesに分けて扱っている。

ざっくり言えば、

```text
SLIP
意図は正しい
操作を間違える

MISTAKE
判断そのものを間違える
```

たとえば、3枚買いたいのに30枚にしてしまうのはSlip寄り。

一方、A席だと思ってB席を選んでしまうのはMistake寄り。

この二つは、対策が違う。

Slipなら、

- 大きすぎる入力をそもそも許さない
- 似た操作を離す
- defaultを安全側にする

などが効く。

Mistakeなら、

- 選択肢の意味を明確にする
- 情報を比較しやすくする
- mental modelとのズレを減らす

方が効く。

ここまで来ると、エラー文だけ改善するのがかなり後工程だと分かる。

## 6. Before → After

### Before

```text
メールアドレス
[                 ]

送信

↓

エラー：メールアドレスが正しくありません
```

### After

```text
メールアドレス
[name@example.com]

入力中に形式を確認
↓
エラー箇所を具体的に表示
↓
修正後は即時に状態更新
```

さらに、重大操作ならReviewを追加する。

```text
購入内容
3枚 / 15,000円

[確定する]
```

重要なのは、「エラー文を良くする」から始めないこと。

**Where can the system prevent the problem earlier?**

を先に聞く。

## 7. FACT / INTERPRETATION

### FACT

- NN/gのHeuristic #5はError Preventionを独立した原則として扱い、error-prone conditionsの除去や事前確認を推奨している。
- NN/gは確認ダイアログの過剰使用が自動的な反応を生み、警告効果を弱めると指摘している。
- W3Cは重要な取引やデータ変更について、reversible / checked / confirmedなど複数の保護方法を認めている。
- W3Cのフォーム検証ガイダンスは、可能ならUndoなどによるrecoveryを提供する例を示している。
- Don Normanはslipsとmistakesを区別し、設計によるerror minimizationを論じている。

### INTERPRETATION

Error Preventionは「ユーザーを注意深くさせる技術」ではない。

**人間が注意深くなくても致命傷になりにくい仕組みを作る技術**と考えた方が実務に効く。

## 8. #31 Disabled Stateとの接続

#31では、

```text
STATE
↓
CAUSE
↓
RECOVERY
```

を見た。

つまり、押せないなら理由と解除条件を示す。

今回は一歩前に戻る。

```text
その状態に入る必要はあった？
```

Disabled Stateは「今できない」を説明する。

Error Preventionは「そもそも間違った状態へ入りにくくできるか」を問う。

これでUIを見る順番が、

```text
STATE
↓
CAUSE
↓
RECOVERY
```

だけでなく、

```text
PREVENT
↓
DETECT
↓
RECOVER
↓
REVERSE
```

まで広がる。

## 9. 30秒でできる観察

今日使ったアプリで「本当に○○しますか？」を一つ探す。

そして3問だけ聞く。

```text
1. そのミスは事前に防げる？
2. ConfirmationではなくUndoにできる？
3. 本当に不可逆？
```

3つ目がNOなら、確認画面はただの摩擦かもしれない。

## 10. 制作・修正指示

> エラー表示だけを改善するのではなく、まず誤入力・誤操作が発生する前段を確認してください。入力制約、safe default、選択肢の区別、preview、review、undoなどを比較し、重大性・頻度・回復可能性に応じて最も摩擦の少ない方法を選んでください。確認ダイアログは不可逆・高リスクな操作を中心に使用し、日常的な操作への乱用を避けてください。

短くするなら、

> **このエラー、起きた後ではなく起きる前に潰せませんか？**

でいい。

## 終わりに

最初は、赤いエラー文を見ると「ちゃんとしてるな」と思っていた。

でも少し調べると、見え方が変わる。

赤文字が多い画面は、親切な画面かもしれない。

同時に、**何度もユーザーを同じ穴に落としている画面**かもしれない。

エラー文の質を見る前に、穴そのものを見る。

それがError Preventionの入り口やと思う。

---

## 今日の中心命題

**Do not only design the error message. Design the path that makes the error less likely.**

エラー文だけでなく、**そのエラーが起きにくい道筋まで設計する。**

## 専門語

`Error Prevention / Error Recovery / Reversibility / Confirmation Dialog / Undo / Input Constraint / Safe Default / Slips / Mistakes / Human Error / WCAG 3.3.4`

## Sources

- W3C, Understanding SC 3.3.4 Error Prevention (Legal, Financial, Data)
  https://www.w3.org/WAI/WCAG21/Understanding/error-prevention-legal-financial-data
- W3C, Validating Input
  https://www.w3.org/WAI/tutorials/forms/validation/
- Nielsen Norman Group, 10 Usability Heuristics for User Interface Design
  https://www.nngroup.com/articles/ten-usability-heuristics/
- Nielsen Norman Group, Confirmation Dialogs Can Prevent User Errors — If Not Overused
  https://www.nngroup.com/articles/confirmation-dialog/
- Don Norman, The Design of Everyday Things, Revised and Expanded Edition
  https://jnd.org/books/the-design-of-every-things-revised-and-expanded-edition/
