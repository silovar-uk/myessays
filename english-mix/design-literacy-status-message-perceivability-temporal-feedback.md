---
id: design-literacy-status-message-perceivability-temporal-feedback
title: "0.8秒だけの「保存しました」は、誰に伝わったのか"
subtitle: "English Mix｜Design Literacy #66｜Feedback ends only when the user understands the state change"
created: "2026-09-22"
updated: "2026-09-22"
type: "English Mix"
status: "完成"
mode: "english-mix"
english_ratio: 0.45
mix_unit: "sentence"
tags: ["Design Literacy", "UI", "UX", "Accessibility", "Status Message", "Feedback", "Temporal Design", "WCAG"]
keywords: ["status message", "temporal feedback", "role=status", "aria-live", "toast", "perceivability", "WCAG 4.1.3"]
series: "Design Literacy｜細部から思想まで"
seriesOrder: 66
abstract: "A system can save data successfully, display a success message, and still leave the user unsure. This essay treats feedback not as output but as a bridge from system state to user understanding."
---

# 0.8秒だけの「保存しました」は、誰に伝わったのか
## English Mix｜Design Literacy #66｜Feedback ends only when the user understands the state change

“Saved.”

It appeared in the bottom-right corner. 0.8 seconds later, it vanished.

Technically, everything worked. The save succeeded and the message rendered.

でも利用者は入力欄を見ていたかもしれない。

> **「……ほんまに保存された？」**

The system knows. The interface displayed it. The human still does not know.

前回#65では部品を状態機械（state machine）として見た。Today the question moves one level deeper.

> **A state change and an understood state change are not the same thing.**

![Displayed is not the same as perceived](https://raw.githubusercontent.com/silovar-uk/myessays/main/assets/design-literacy-status-message/displayed-vs-perceived.svg)

## 1. “Displayed” is only a system-side completion condition

~~~text
input
→ submit
→ processing
→ saved
→ show "Saved"
~~~

That is enough for the system.

Add the user:

~~~text
SYSTEM             USER

saved
  ↓
message shown
                    ?
  ↓
message gone
                    "Did it save?"
~~~

The interface is in SUCCESS. The user remains in UNCERTAINTY.

**Feedback is better understood as a translation from system state into user understanding.**

これは本稿の解釈であり、W3Cの定義そのものではない。

## 2. FACT｜WCAG treats status communication as more than visible text

WCAG 2.2 Success Criterion 4.1.3 deals with 状態メッセージ（status messages）.

If a status message exists, it should be programmatically determinable so assistive technologies can present it without moving focus.

Source:
https://www.w3.org/WAI/WCAG22/quickref/#status-messages

Examples include success, waiting states, progress, and errors.

W3C is not saying every interaction needs a new message. It is saying that when status messages are presented, their meaning should be available to assistive technologies.

**Text appearing on a screen and status reaching a user are different design problems.**

![WCAG status message summary](https://raw.githubusercontent.com/silovar-uk/myessays/main/assets/design-literacy-status-message/w3c-status-message.svg)

## 3. Feedback has at least four design axes

Reviewing only the sentence “Saved” tells us very little.

~~~text
WHAT
What happened?

WHERE
Where does it appear?

PERSISTENCE
How long does it remain?

CHANNEL
Visual only?
Assistive technology too?
~~~

This is not a formal standard taxonomy. It is a practical review model.

同じ「保存しました」でも、場所・持続・通知経路が違えばcertaintyも変わる。

A toast is not merely a little rectangle that slides in.

**It is a temporary communication channel for system state.**

![Four axes of feedback](https://raw.githubusercontent.com/silovar-uk/myessays/main/assets/design-literacy-status-message/four-axes.svg)

## 4. Do not ask only “How many seconds?” Ask “Can the user recover the information?”

A universal “toast should last three seconds” rule would be convenient.

It would also be too simple.

WCAG 2.2’s guidance on 時間調整可能（Timing Adjustable）includes an example where a new-email toast disappears after five seconds. If the same information remains available elsewhere, such as the inbox, the disappearing toast does not necessarily remove the user’s ability to discover the event.

If there is no alternative way to recover the information, timing becomes more consequential.

Source:
https://www.w3.org/WAI/WCAG22/Understanding/timing-adjustable.html

So the better question is:

> **After it disappears, can the user get the fact back?**

Persistence and recoverability belong together.

## 5. Success feedback should not force the user to investigate

W3C Technique G199 describes success feedback as a way to reduce the effort required to confirm that an action completed successfully.

Source:
https://www.w3.org/WAI/WCAG22/Techniques/general/G199

BEFORE:

~~~text
[ Save ]
click
screen looks almost identical
~~~

The user reloads the page to make sure.

AFTER:

~~~text
[ Save ]
→ ✓ Profile saved

the form also reflects
the saved state
~~~

The point is not the green checkmark.

**The point is to avoid turning confirmation into a second task.**

## 6. Overdo the research a little: test the urge to verify

Do one save, add, or delete action in a service you use.

Then stop.

~~~text
Do I actually believe it worked?
Do I want to reload?
Do I want to reopen the page?
Do I want to check the data again?
~~~

If the urge appears, inspect why.

本稿ではこれを「再確認衝動テスト」と呼ぶ。正式な研究用語ではない。

It shifts the review goal from **show a notification** to **remove unnecessary verification work**.

## 7. <code>role="status"</code> is also a way to communicate without shouting

WAI-ARIA 1.2 defines the <code>status</code> role as a type of live region.

It has implicit values:

~~~text
aria-live="polite"
aria-atomic="true"
~~~

Source:
https://www.w3.org/TR/wai-aria/#status

“Polite” means the update can be announced without aggressively interrupting the current speech.

For more urgent information, other mechanisms such as alerts exist.

So notification design has another axis: **interruption strength.**

## 8. Accessibility does not mean announcing everything

W3C’s explanation of status messages warns that overusing live regions and alerts can make an application too “chatty” for screen reader users.

Source:
https://www.w3.org/WAI/WCAG21/Understanding/status-messages

So this is not automatically good design:

~~~text
Saving
Saved
Syncing
Synced
Draft updated
Three characters entered
~~~

Accessibility is not maximum information volume.

**It is the right state change, at the right strength, through the right channel.**

## 9. Temporal hierarchy changes how a screen looks

Graphic design has visual hierarchy: size, weight, position, space, color.

Interactive systems add another variable: **how long information exists.**

~~~text
flash
remain for seconds
remain until next action
remain until state changes
remain as history
~~~

本稿ではこれを時間的階層（temporal hierarchy）として考える。標準規格の正式用語ではない。

An error may be visually large but disappear instantly. A promotional banner may be visually modest but remain forever.

Interaction design is therefore not only about where information sits.

It is also about **when information appears, disappears, and can be recovered.**

## 10. The previous state machine gains a human layer

#65 gave us:

~~~text
LOADING
↓
SUCCESS
↓
ERROR
~~~

Now add one layer:

~~~text
SYSTEM STATE
↓
FEEDBACK
↓
USER UNDERSTANDING
~~~

The same system success can produce two experiences.

~~~text
A
system: success
user: knows it succeeded

B
system: success
user: still unsure
~~~

Technically identical. Experientially different.

![Synchronizing system state and user understanding](https://raw.githubusercontent.com/silovar-uk/myessays/main/assets/design-literacy-status-message/system-user-sync.svg)

**State design is no longer only about internal transitions. It is about synchronizing internal state with human understanding.**

## 11. Production instruction

> **保存・送信・削除・追加・通信中・エラーなど、画面遷移なしで状態変化を伝える箇所を洗い出してください。各状態メッセージについて、何を伝えるか、どこに表示するか、いつまで残すか、消えた後に同じ情報を再確認できるか、スクリーンリーダーなど視覚以外の経路でも状態変化を認識できるかを定義してください。表示完了ではなく、利用者が結果を認識できることを完了条件にしてください。**

Two review questions are enough:

> **Did we display it, or did it actually land?**

> **After it disappears, where can the user confirm it?**

## 12. After the research, the 0.8 seconds stopped being the real problem

At first I expected this to become a simple argument that 0.8 seconds is too short.

That was not the interesting part.

A five-second message can be fine if the information remains recoverable.

A longer message can still fail if nobody notices it, assistive technology cannot identify it, and the information vanishes without another trace.

So the design variable is not merely duration.

It is:

~~~text
what
where
how long
through which channel
and where the information lives afterward
~~~

> **Feedback is complete only when system change becomes user understanding.**

0.8秒の「保存しました」を見たとき、以前なら「短いトースト通知だな」で終わっていた。

Now another question appears:

> **Where does this information go after it disappears?**

That is the new resolution this lesson adds.

## Next

次は楽観的UI（Optimistic UI）。

The interface can update **before** the server has confirmed success.

It feels fast. But if reality disagrees, the UI has to roll back.

After state, feedback, and perception, the next question becomes:

> **How much of the future is a UI allowed to pretend has already happened?**

## Sources

- https://www.w3.org/WAI/WCAG22/quickref/#status-messages
- https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA22.html
- https://www.w3.org/WAI/WCAG22/Techniques/general/G199
- https://www.w3.org/WAI/WCAG22/Understanding/timing-adjustable.html
- https://www.w3.org/TR/wai-aria/#status
- https://www.w3.org/WAI/WCAG21/Understanding/status-messages
