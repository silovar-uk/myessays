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

Very polite.

でも、ちょっと待ってほしい。

**Is this interface making users fall into the same hole, then apologizing nicely every time?**

道に穴を掘って、その横に「お気をつけください」と看板を立てているみたいな話である。

今回は、the error message itself ではなく、その一歩前を見る。

## 1. Error handling starts before the error

NN/gのUsability Heuristic #5は、good error messagesも重要だが、the best designs prevent problems from occurring in the first place と整理している。

エラー設計を4段階に分けると見やすい。

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

Same “error handling,” different intervention points.

たとえば、チケットを3枚買いたいのに数量欄へ33と入力したとする。

購入後に「購入可能枚数を超えています」と出すのはRecovery寄り。

最初から `[-] 3 [+]` で最大6枚までしか選べないなら、33という状態自体が作れない。

That is Prevention.

**Good error design starts before the error happens.**

## 2. Confirmation dialog is not automatically safety

ここで一回、確認ダイアログを疑ってみる。

```text
本当に削除しますか？

[キャンセル] [削除]
```

Looks safe.

でもNN/gは、confirmationを乱発すると users start responding automatically, and the warning loses its power と指摘している。

This is the weird part.

安全のための確認を増やしすぎると、確認が安全装置ではなくなる。

「狼が来た」と言いすぎて、誰も聞かなくなる。

そこで場合によっては、

```text
削除しました
[元に戻す]
```

の方が良い。

W3Cのフォーム検証ガイダンスでも、when possible, provide mechanisms to undo reversible actions とされている。

つまりsafetyは、

**asking first**

だけでなく、

**making recovery possible**

でも作れる。

## 3. Don’t reduce WCAG 3.3.4 to “show a confirmation screen”

WCAG 3.3.4 Error Prevention (Legal, Financial, Data) は、法的拘束、financial transactions、重要データの変更・削除などに対して保護策を求めている。

代表的なのは、

- reversible
- checked
- reviewed / confirmed before submission

など。

The important part: **a confirmation dialog is not the only answer.**

「大事な操作には全部モーダル」とすると、design reasoningが消える。

見るべきは outcome severity と recoverability。

## 4. Over-research experiment: add confirmation to everything

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

Extremely safe.

Probably unbearable.

ここから見えるのは、Error Preventionは「止めること」ではないということだ。

It is about stopping only where the risk justifies the friction.

最低でも3軸で見るといい。

```text
RISK
失敗時の被害

FREQUENCY
操作頻度

RECOVERABILITY
どれだけ戻せるか
```

High risk + irreversible → stronger confirmation.

Low risk + easy undo → confirmation may be unnecessary friction.

## 5. Slips and Mistakes are different problems

Don Normanは人間のerrorを大きくSlipsとMistakesに分けて扱っている。

```text
SLIP
意図は正しい
操作を間違える

MISTAKE
判断そのものを間違える
```

3枚買いたいのに30枚にするのはSlip寄り。

A席だと思ってB席を選ぶのはMistake寄り。

And the remedies differ.

Slipには、

- helpful constraints
- safer defaults
- separating similar actions

が効きやすい。

Mistakeには、

- clearer choices
- better comparison
- reducing mental-model mismatch

の方が効く。

ここまで来ると、rewriting the error message isかなり後工程だと分かる。

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

validate while entering
↓
describe the exact problem
↓
update the state immediately after correction
```

重大操作ならreviewを追加する。

```text
購入内容
3枚 / 15,000円

[確定する]
```

Don’t start with “How can we improve the error copy?”

Start with:

**Where can the system prevent the problem earlier?**

## 7. FACT / INTERPRETATION

### FACT

- NN/gのHeuristic #5 treats Error Prevention as an independent usability principle.
- NN/g warns that overusing confirmation dialogs can create automatic responses and reduce warning effectiveness.
- W3C accepts multiple protection patterns for important transactions and data changes, including reversible / checked / confirmed approaches.
- W3C form guidance gives Undo and delayed cancellation as examples of recovery.
- Don Norman distinguishes slips and mistakes and discusses designing to minimize human error.

### INTERPRETATION

Error Prevention is not primarily about making users more careful.

**It is about making the system less fragile when users are not perfectly careful.**

## 8. Connection to #31 Disabled State

#31では、

```text
STATE
↓
CAUSE
↓
RECOVERY
```

を見た。

If it is disabled, explain why and how to continue.

今日はその一歩前へ戻る。

```text
Did the user need to enter this bad state at all?
```

Disabled State asks: “What can’t I do now?”

Error Prevention asks: “Could this path have avoided the failure?”

So the model expands from

```text
STATE → CAUSE → RECOVERY
```

to

```text
PREVENT → DETECT → RECOVER → REVERSE
```

## 9. 30-second observation

今日使ったアプリで「本当に○○しますか？」を一つ探す。

Ask three questions:

```text
1. Could this mistake be prevented earlier?
2. Could Undo replace Confirmation?
3. Is this really irreversible?
```

3つ目がNOなら、そのconfirmationはただのfrictionかもしれない。

## 10. 制作・修正指示

> エラー表示だけを改善するのではなく、まず誤入力・誤操作が発生する前段を確認してください。入力制約、safe default、選択肢の区別、preview、review、undoなどを比較し、重大性・頻度・回復可能性に応じて最も摩擦の少ない方法を選んでください。確認ダイアログは不可逆・高リスクな操作を中心に使用し、日常的な操作への乱用を避けてください。

Short version:

> **このエラー、起きた後ではなく起きる前に潰せませんか？**

## 終わりに

最初は、赤いエラー文を見ると「ちゃんとしてるな」と思っていた。

But after looking deeper, it changes shape.

赤文字が多い画面は、親切な画面かもしれない。

At the same time, it may be an interface repeatedly dropping users into the same hole.

エラー文の質を見る前に、穴そのものを見る。

That is the entrance to Error Prevention.

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
