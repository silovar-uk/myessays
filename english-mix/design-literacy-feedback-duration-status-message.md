---
id: design-literacy-feedback-duration-status-message
title: 「保存しました」は、何秒そこにいれば“見た”ことになる？
subtitle: Design Literacy #40｜Feedback Duration / Status Message / Human Time
created: 2026-09-13
updated: 2026-09-13
type: Essay
status: published
tags: ["Design Literacy", "UI", "Feedback", "Accessibility", "Interaction Design"]
keywords: ["Feedback Duration", "Response Time", "Status Message", "Toast", "Transient UI", "Persistent UI", "aria-live", "WCAG 4.1.3", "Perceived Responsiveness"]
favorite: false
grow: true
series: Design Literacy｜細部から思想まで
seriesOrder: 40
abstract: 「保存しました」は何秒表示すれば正しいのか。System timeとhuman timeを分け、Toastの秒数ではなく、informationがいつsafely disappearできるかからfeedbackを考える。
---

# 「保存しました」は、何秒そこにいれば“見た”ことになる？

「保存しました」と出た。

Great.

……と思った瞬間、消えた。

Wait. Did it actually save?

妙なのは、system側では仕事が完全に終わっていることだ。Save succeeded. Success message displayed. Log recorded.

なのにhuman側には、薄い残像だけが残る。

では「保存しました」は何秒表示すれば正しいのか。

1 second? 3 seconds? 5 seconds?

調べ始めると、the question itself is slightly wrong だと分かってくる。

## まず、二つの時計を分ける

UIには少なくともtwo clocksがある。

```text
SYSTEM TIME
処理が返るまで

HUMAN TIME
notice / read / understand
```

Jakob Nielsenが整理してきたresponse-timeの代表的な目安は、およそ0.1秒、1秒、10秒。0.1秒程度ならalmost instantaneous、1秒程度ならflow of thoughtを大きく遮りにくく、10秒ほどになるとattentionを維持するのが難しくなる。

But this is crucial:

これは「Toastを1秒で消せ」というtableではない。

**Response time and display duration are different variables.**

```text
CLICK
 ↓
SYSTEM RESPONSE ── 0.1 sec?
 ↓
MESSAGE APPEARS
 ↓
USER NOTICES
 ↓
USER READS
 ↓
USER UNDERSTANDS
```

System can be fast.

Human understanding cannot be `0ms`.

## FACT｜0.1 / 1 / 10秒は「消える時間」ではない

Nielsen Norman Groupのresponse-time資料は、0.1 / 1 / 10 secondsを、人間のperceptionやattentionとの関係からUI responseを考える目安として説明している。

だから0.1秒で保存処理が返るのはexcellent。

0.1秒で「保存しました」が消えるのはa completely different problemだ。

ここを混ぜると、super fastなのにsuper anxiousなUIができる。

## もう一歩やりすぎる｜0.1秒の「保存しました」を想像する

Let's push it to an extreme.

```text
[ 保存する ]

↓ click

✓ 保存しました

↓ 0.1 sec

gone
```

速い。

Too fast.

もはやfeedbackというよりcamera flashである。

では30秒なら？

```text
✓ 保存しました
✓ 保存しました
✓ 保存しました
✓ 保存しました

Still here.
```

今度は邪魔だ。

So, longer is not automatically kinder.

秒数探しから離れた方がよさそうだ。

## 問いを変える｜How many seconds? → When can it safely disappear?

重要なのはdurationそのものではなく、what remains after the message disappears.

例えばお気に入り。

```text
♡
↓ tap
♥

Added to favorites
↓ disappears

♥ ← state remains
```

Toastは消えていい。

Because the meaning remains in the interface.

一方、

```text
[ 保存する ]
↓
Saved
↓ disappears

[ 保存する ]
```

だけなら、later verificationができない。

Temporary messageにstate verificationまで背負わせている。

**The message disappeared. Did the information disappear with it?**

この問いの方が、秒数よりずっと使える。

## Before → After｜ToastからStateへ

### Before

```text
[ 保存する ]

✓ Saved
   ↓
   disappears
```

### After

```text
[ Saved ✓ ]
Last updated 12:10
```

あるいはToast + persistent state。

```text
✓ Saved

[ Saved ✓ ]
```

Roles are separated.

```text
TOAST
what just happened

PERSISTENT STATE
what I can verify later
```

一個の小さなbubbleに全部やらせない。

## FACT｜Accessibilityでは「見える秒数」だけでは足りない

WCAG 2.2 Guideline 2.2は、usersにcontentをread and useするためのenough timeを確保することを扱う。W3Cは、読む、探す、身体的に反応する、assistive technologyを通してアクセスする、といった行為にmore timeを必要とする人がいると説明している。

さらにWCAG 4.1.3 Status Messages（Level AA）は、focusを移動させなくてもstatus messageをassistive technologyが提示できるよう、roleやpropertyによってprogrammatically determinableにすることを求めている。

W3CのARIA22では`role="status"`が例示され、implicit `aria-live="polite"`を持つ。

つまり同じSavedでも、

```text
VISUAL
How long is it visible?

ASSISTIVE TECHNOLOGY
Was the update announced?
When is it announced?
```

というdifferent timelineがある。

だから「5 seconds is enough for everyone」のようなuniversal ruleはかなり怪しい。

## INTERPRETATION｜Feedbackには寿命がある

#38 Metabolismでは、UI要素にもdifferent lifespansがあると考えた。

今日feedbackへ持ち込むと、こう分類できる。

```text
MOMENTARY
今だけ知らせればいい
例：Copied

TEMPORARY
少しの間、文脈を支える
例：Sending…

PERSISTENT
あとから確認できる必要がある
例：Saved / Published / Selected
```

これはstandard taxonomyではなく、a practical decision model。

でも「Toastは何秒？」より判断しやすい。

## そのまま使える制作・修正指示

> 操作結果のfeedbackについて、response speedとdisplay durationを分けて設計してください。ユーザーがlater verificationする必要のあるstateは、一時的なToastだけに依存せず、操作対象または関連領域にも残してください。また、status messageがassistive technologyにも適切に伝わる実装になっているか確認してください。

レビューなら、これだけ。

> **これ、消えたあとでも結果を確認できますか？**

## 誤解しやすい点｜Toast is not the villain

Toastを全部なくせ、ではない。

Transient, low-risk, and verifiableなfeedbackならToastは便利。

逆にerror、payment、重要なconstraint、next actionに必要な情報などをshort-lived messageだけに閉じ込めると問題になりやすい。

`aria-live`もmore is betterではない。W3Cはlive regionsやalertsを使いすぎるとscreen reader usersにとってapplicationがtoo chattyになり得るとし、appropriate feedback levelをuser testingで確認することを勧めている。

**More feedback is not automatically better feedback.**

## #39との接続｜Whereの次にWhenが来た

#39 Change Blindnessでは、

```text
ACTION
↓
RESPONSE
↓
NOTICE
↓
UNDERSTAND
```

だった。

Today, add time.

```text
ACTION
↓
RESPONSE ── WHEN?
↓
NOTICE   ── HOW LONG?
↓
UNDERSTAND
↓
VERIFY   ── CAN I CHECK LATER?
```

#39 asks: **Will the change enter attention?**

#40 asks: **Will it remain long enough for meaning to complete?**

Feedbackがscreen positionだけでなく、timeを持つinteractionに見えてくる。

## 30秒でできる観察｜今日Toastを一個だけ追跡する

今日使うappで、一つだけtransient messageを追う。

```text
When did it appear?
↓
Where?
↓
When did it disappear?
↓
Can I verify the result later?
```

最後だけ覚えておけばいい。

Toast disappearing is not necessarily the problem.

**Did the meaning disappear with it?**

## 次につながる概念｜Transient vs Persistent UI

Tooltip, Toast, Snackbar, Popover, Modal, Inline Message.

形だけが違うわけではない。

How long does information remain? Who dismisses it? Can it be rediscovered?

次に見るべきなのは、**Transient UI / Persistent UI**と、information lifespanに応じたcomponent selectionだ。

---

## 今日の中心命題

**Do not only design when feedback appears. Design when it can safely disappear.**

Feedbackは「いつ出すか」だけでなく、**いつ安全に消してよいか**まで設計する。

調べる前は、「保存しました」を何秒表示するのがcorrectなのか知りたかった。

After researching it, I look somewhere else first.

その文字が消えたあと、what remains?

0.1秒で処理を返すtechnologyと、人間が認識して理解するtimeは別物だ。

Fast UI is not a UI where everything disappears instantly.

必要なものをすぐ返して、必要なmeaningだけを残すUIだ。

**Fast system. Enough human time.**

### 専門語 / Search terms

`Feedback Duration` / `Response Time` / `Status Message` / `Toast` / `Transient UI` / `Persistent UI` / `aria-live` / `role=status` / `WCAG 4.1.3` / `Perceived Responsiveness`

### Sources

- Nielsen Norman Group — Response Times: The 3 Important Limits: https://www.nngroup.com/articles/response-times-3-important-limits/
- W3C WAI — WCAG 2.2, Guideline 2.2 Enough Time: https://www.w3.org/TR/WCAG22/#enough-time
- W3C WAI — Understanding SC 4.1.3 Status Messages: https://www.w3.org/WAI/WCAG21/Understanding/status-messages.html
- W3C WAI — ARIA22: Using role=status to present status messages: https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA22
