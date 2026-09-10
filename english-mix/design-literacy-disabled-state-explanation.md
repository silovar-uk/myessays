---
id: design-literacy-disabled-state-explanation
title: "押せないボタンは、なぜ押せないのかを説明していない"
subtitle: "Design Literacy #31｜Disabled State is not just a color variant"
created: "2026-09-10"
updated: "2026-09-10"
type: "Essay"
status: "完成"
tags: ["Design Literacy", "UI", "UX", "Accessibility", "Disabled State", "Constraint", "Discoverability", "Error Prevention"]
keywords: ["disabled state", "aria-disabled", "HTML disabled", "constraint", "discoverability", "feedback", "recovery", "button state", "accessibility", "error prevention"]
favorite: 5
grow: 5
series: "Design Literacy｜細部から思想まで"
seriesOrder: 31
abstract: "A grey button quietly refuses to work. Starting from that tiny awkwardness, this essay reframes Disabled State as information architecture: state, cause, and recovery. It compares HTML disabled and aria-disabled, then connects discoverability, constraints, keyboard focus, and error prevention."
---

# 押せないボタンは、なぜ押せないのかを説明していない
## Design Literacy #31｜Disabled State is not just a color variant

灰色のボタンがある。

You cannot press it.

以上。

……いや、that is a strangely incomplete conversation.

Why can't I press it?

メールアドレスが未入力？　Password too short?　利用規約への同意がない？　発売前？　権限がない？

The button says nothing.

**It tells you “no,” but not “why.”**

今回の問いはシンプルだ。

**Is a disabled state complete once the button merely looks disabled?**

---

## 1. State is not explanation

WAI-ARIAの`aria-disabled="true"`は、その要素がperceivableではあるが現在operableではないことを支援技術へ伝える。

MDNも、HTMLの`disabled`と`aria-disabled`は同じではないと整理している。Native `disabled`は通常、操作・フォーム送信・focusabilityまでブラウザが処理する。一方`aria-disabled`はsemantic stateを伝えるだけなので、実際に動作を止める処理やvisual stylingは実装側が担う。

That is the FACT.

でもUI側にはまだ二つ質問が残る。

```text
STATE
What is happening now?

CAUSE
Why is it happening?

RECOVERY
What can I do next?
```

Disabled State directly answers mainly the first one.

**“Why” and “what next” do not magically appear.**

---

## 2. 灰色のボタンを10秒だけ裁判にかける

Imagine a sign-up form.

### BEFORE

```text
氏名
✓ complete

メール
✓ complete

パスワード
✓ complete

□ 利用規約に同意する

[ アカウント作成 ]
      disabled
```

Some users will infer the cause.

でもチェック欄が300px上にあったら？

On mobile, what if it is outside the current viewport?

必須条件が三つあったら？

Suddenly the form becomes **“find the missing requirement.”**

### AFTER

```text
□ 利用規約に同意する
  Required

[ アカウント作成 ]

利用規約への同意が必要です
```

The goal is not to make the button louder.

**Move the failure condition closer to where failure becomes visible.**

これはProximityでもあり、Information Architectureでもある。

---

## 3. Overdo it：Disabledを3種類に分類する

Instead of treating every disabled control as the same problem, classify the cause.

### A｜User-recoverable

必須入力、規約同意、席種選択。

In this case, show the recovery condition nearby.

```text
[ 購入する ]
席種を選択すると進めます
```

### B｜System- or time-dependent

発売前、maintenance、processing中。

Here, the key information is often **when or why the state will change**.

```text
[ 購入する ]
Available from Sep 12, 10:00
```

### C｜Not recoverable by the current user

管理者限定、membership tier restriction、地域制限。

Do not imply that another input will solve it.

```text
[ 編集する ]
Admin permission required
```

Same grey appearance, different causal model.

**The visual state may be identical while the explanation should not be.**

---

## 4. `disabled` and `aria-disabled` differ more than they look

ここは仕様なので、笑いを止める。

W3CのARIA Authoring Practices Guideによれば、HTMLフォーム要素の`disabled`は通常Tab sequenceから除外される。

With `aria-disabled="true"`, however, a control can remain focusable while being exposed semantically as unavailable.

Why keep an unusable control focusable?

Because sometimes **discoverability matters even when availability is zero**.

W3C points to controls such as Copy / Cut / Paste in toolbars. They may be unavailable at a particular moment, but users still benefit from discovering that those commands exist.

On the other hand, skipping disabled controls reduces keyboard effort when their existence is obvious from context.

```text
SKIP IT
Efficiency ↑

KEEP IT DISCOVERABLE
Feature awareness ↑
```

This is not a styling question anymore.

It is a trade-off between **Efficiency and Discoverability**.

---

## 5. Constraint can become a map

Don Norman's design work treats constraints not only as restrictions but as clues that narrow possible actions.

Think of a cinema seat map.

```text
○ Available
● Selected
× Sold
△ Wheelchair space
```

Even the seats you cannot select are information.

でも全部を同じ薄いグレーにすると、

- sold out
- not yet on sale
- unavailable
- unavailable for your membership tier

が全部同じになる。

**The problem is not that a constraint exists. The problem is when its meaning disappears.**

ここでDisabled Stateはvisual stylingからInformation Architectureへ一段上がる。

---

## 6. 制作・修正指示へ戻す

You can use this directly in a design review:

> **Disabled状態では、操作できないことを見た目だけで示すのではなく、解除条件が推測しにくい場合は、その理由または次に必要な操作をコントロール付近へ表示してください。特に必須入力・選択不足などユーザー自身で解消できる条件は、what makes the control availableまで示してください。**

Even shorter:

> **「これ、押せない理由を初見で説明できますか？」**

If you cannot answer quickly, the user probably cannot either.

---

## 7. Misunderstanding：じゃあDisabledを全部なくす？

Not necessarily.

Sometimes allowing an action and showing a clear error afterward is more understandable. In other cases, preventing an invalid action is better.

The design question is not simply enable vs disable.

```text
PREVENT
Stop the failure before it happens

EXPLAIN
Show why progress is blocked

RECOVER
Help the user return after failure
```

どこで問題を処理するか、である。

This leads directly to Error Prevention.

**The best error message may be the error that never needs to appear.**

ただしpreventionのために機能を隠しすぎればDiscoverabilityが落ちる。

UX is annoyingly good at making one improvement reveal another trade-off.

---

## 8. 前の学びとつなぐ：UIは質問への回答に見える

```text
Information Scent
What is ahead?

Recognition
What do I not need to remember?

Focus Indicator
Where am I acting now?

Disabled State
Can I do this now?

Constraint Explanation
If not, why not?
```

Seen this way, a good interface is not just a collection of polished components.

**It is a system that answers the user's small questions in sequence.**

これは今回のINTERPRETATIONであって、W3Cの主張ではない。

でもレビューには強い。

Instead of asking only “Does this screen look good?”, ask:

**“What question is the user asking at this exact moment?”**

---

## 9. 30-second experiment：Find one grey button

アプリかWebサイトで、disabled-looking controlを一つ探す。

Ask three questions:

```text
1. Why can't I press it?
2. What would make it available?
3. Is that answer visible here?
```

If #3 is NO, you have a candidate for improvement.

さらに必須項目を一個わざと空欄にする。

Watch how the UI changes at that moment.

Static mockups often hide this entire class of problem.

---

## 10. 灰色のボタンが、前より少しうるさく見える

Before researching this, Disabled State looked like a visual variant.

調べると、そこには

```text
STATE
↓
CAUSE
↓
RECOVERY
```

というtiny information architectureが入っていた。

さらにfocusabilityを残すかどうかでEfficiencyとDiscoverabilityまでぶつかる。

That is a lot of theory hiding inside one grey rectangle.

次に灰色のボタンを見ると、前より少しうるさく見えるかもしれない。

It says:

> You cannot continue.

そしてこちらは、たぶん前より早く聞き返す。

**Why?**

その問いが浮かぶようになったなら、UIを見る解像度は一段上がっている。

---

## 中心命題

**A disabled control should not become a mystery.**

Disabled Stateは色違いのVariantではない。

**It is a tiny information architecture connecting “can't,” “why,” and “what next.”**

## Search terms

`Disabled State / aria-disabled / HTML disabled / Constraint / Discoverability / Feedback / Recovery / Button State / Accessibility / Error Prevention / State Visibility`

## Sources

- W3C WAI-ARIA Authoring Practices Guide — Developing a Keyboard Interface  
  https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/
- MDN — aria-disabled  
  https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-disabled
- W3C WAI-ARIA Authoring Practices Guide — Button Pattern  
  https://www.w3.org/WAI/ARIA/apg/patterns/button/
- Don Norman — The Design of Everyday Things  
  https://jnd.org/books/the-design-of-everyday-things-revised-and-expanded-edition/
