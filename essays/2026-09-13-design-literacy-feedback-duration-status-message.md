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
abstract: 「保存しました」は何秒表示すれば正しいのか。システムの応答時間と人間が認識・理解する時間を分け、Toastの秒数ではなく、情報がいつ安全に消えられるかからfeedbackを考える。
---

# 「保存しました」は、何秒そこにいれば“見た”ことになる？

「保存しました」と表示された。

よし。

……と思った瞬間、消えた。

いまの、本当に保存した？

妙なのは、システム側から見れば仕事は完璧に終わっていることだ。保存処理は成功した。成功メッセージも表示した。ログにも残っている。

なのに人間側には、薄い残像だけが残る。

では「保存しました」は何秒表示すれば正しいのか。

1秒？ 3秒？ 5秒？

調べ始めると、この問いそのものが少し間違っていることが分かってきた。

## まず、二つの時計を分ける

UIには少なくとも二つの時間がある。

```text
SYSTEM TIME
処理が返るまでの時間

HUMAN TIME
気づく・読む・理解する時間
```

Jakob Nielsenが整理してきたresponse-timeの代表的な目安は、およそ0.1秒、1秒、10秒だ。0.1秒程度なら結果がほぼ瞬時に返った感覚を保ちやすく、1秒程度なら思考の流れを大きく遮りにくい。10秒ほどになると、待っている対象へ注意を保ち続けることが難しくなる。

ただし、ここでかなり重要なことがある。

これは「Toastを1秒で消せ」という表ではない。

**Response timeとdisplay durationは別の変数だ。**

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

システムを速くすることはできる。

でも、人間の理解時間を`0ms`にはできない。

## FACT｜0.1 / 1 / 10秒は「消える時間」ではない

Nielsen Norman Groupのresponse-time資料は、0.1秒・1秒・10秒を、人間の知覚やattentionとの関係からUIの応答速度を考える目安として説明している。

だから、0.1秒で保存処理が返るのは素晴らしい。

0.1秒で「保存しました」が消えるのは、まったく別の話だ。

ここを混ぜると、ものすごく高速なのに、ものすごく不安なUIができる。

## もう一歩やりすぎる｜0.1秒の「保存しました」を想像する

極端にしてみる。

```text
[ 保存する ]

↓ click

✓ 保存しました

↓ 0.1 sec

（消滅）
```

速い。

異様に速い。

もはやfeedbackというより、フラッシュ撮影である。

では30秒なら？

```text
✓ 保存しました
✓ 保存しました
✓ 保存しました
✓ 保存しました

……まだいる。
```

今度は邪魔だ。

つまり「長いほど親切」でもない。

ここで、秒数探しから離れた方がよさそうだ。

## 問いを変える｜何秒表示する？ → いつ安全に消せる？

重要なのはdurationそのものではなく、メッセージが消えたあとだ。

例えばお気に入り。

```text
♡
↓ tap
♥

「お気に入りに追加しました」
↓ 消える

♥ ← 状態は残る
```

Toastは消えていい。

なぜなら意味がUI側に残っているからだ。

一方、

```text
[ 保存する ]
↓
「保存しました」
↓ 消える

[ 保存する ]
```

だけなら、あとから確認できない。

ここでは一時的なメッセージに、状態確認まで背負わせている。

**The message disappeared. Did the information disappear with it?**

この問いの方が、秒数よりずっと使える。

## Before → After｜ToastからStateへ

### Before

```text
[ 保存する ]

✓ 保存しました
   ↓ 数秒後
   消える
```

### After

```text
[ 保存済み ✓ ]
最終更新 12:10
```

あるいは、Toastを残しつつ状態も残す。

```text
✓ 保存しました

[ 保存済み ✓ ]
```

ここでは役割を分けている。

```text
TOAST
今起きたことを知らせる

PERSISTENT STATE
あとから確認できる
```

一個の小さな吹き出しに全部やらせない。

## FACT｜Accessibilityでは「見える秒数」だけでは足りない

WCAG 2.2のGuideline 2.2は、ユーザーがコンテンツを読んだり使ったりするための十分な時間を確保することを扱っている。W3Cは、障害のあるユーザーの中には、読む、探す、身体的に反応する、assistive technologyを通してアクセスする、といった行為により多くの時間を必要とする人がいると説明している。

さらにWCAG 4.1.3 Status Messages（Level AA）は、focusを移動させなくてもstatus messageをassistive technologyが提示できるよう、roleやpropertyによってprogrammatically determinableにすることを求めている。

W3CのARIA22では`role="status"`が例示され、これは暗黙に`aria-live="polite"`を持つ。

つまり同じ「保存しました」でも、

```text
VISUAL
何秒画面に残る？

ASSISTIVE TECHNOLOGY
更新として伝わる？
いつ読み上げられる？
```

という別の時間軸がある。

ここで「5秒なら全員読める」のような万能ルールはかなり怪しくなる。

## INTERPRETATION｜Feedbackには寿命がある

#38 Metabolismでは、UIの要素にも寿命の違いがあると考えた。

今日それをfeedbackへ持ち込むと、こんな分類ができる。

```text
MOMENTARY
今だけ知らせればいい
例：コピーしました

TEMPORARY
少しの間、文脈を支える
例：送信処理中

PERSISTENT
後から確認できる必要がある
例：保存状態、公開状態、選択状態
```

これは標準規格の分類ではなく、制作判断のためのモデルだ。

でも「Toastは何秒？」だけで話すより、かなり判断しやすい。

## そのまま使える制作・修正指示

> 操作結果のフィードバックについて、表示開始の速さと表示継続時間を分けて設計してください。ユーザーが後から確認する必要のある状態は、一時的なToastだけに依存せず、操作対象または関連領域にも状態を残してください。また、status messageがassistive technologyにも適切に伝わる実装になっているか確認してください。

レビューなら、もっと短くていい。

> **これ、消えたあとでも結果を確認できますか？**

## 誤解しやすい点｜Toastは悪ではない

Toastを全部なくせ、という話ではない。

一時的で、低リスクで、あとから状態を確認できるfeedbackならTransient UIは便利だ。

逆にエラー、支払い、重要な制約、次の行動に必要な情報などを、短時間で消えるメッセージだけに閉じ込めると問題になりやすい。

また`aria-live`を増やせば増やすほど親切、でもない。W3Cもlive regionやalertを使いすぎるとscreen reader利用者にとってアプリケーションが過度に“chatty”になり得るとして、適切なfeedback量をuser testingで確認することを勧めている。

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

と考えた。

今日はそこへ時間を入れる。

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

#39は「その変化、attentionに入る？」。

#40は「その変化、理解が終わるまで存在できる？」。

これでfeedbackは、画面上の場所だけでなく**時間を持つinteraction**に見えてくる。

## 30秒でできる観察｜今日Toastを一個だけ追跡する

今日使うアプリで一つだけ、一時メッセージを観察する。

```text
いつ出た？
↓
どこに出た？
↓
いつ消えた？
↓
消えたあと、結果を確認できる？
```

最後だけ覚えておけばいい。

Toastが消えること自体は問題ではない。

**意味まで一緒に消えていないか。**

## 次につながる概念｜Transient vs Persistent UI

Tooltip、Toast、Snackbar、Popover、Modal、Inline Message。

これらは形が違うだけではない。

情報をどれだけ長くUI世界へ残すか、誰が消すか、あとから再発見できるかも違う。

次に見るべきなのは、**Transient UI / Persistent UI**と、情報の寿命に応じたcomponent選択だ。

---

## 今日の中心命題

**Do not only design when feedback appears. Design when it can safely disappear.**

フィードバックは「いつ出すか」だけでなく、**いつ安全に消してよいか**まで設計する。

調べる前は、「保存しました」を何秒表示するのが正解なのか知りたかった。

でも調べたあとでは、秒数を見る前に別のものを見るようになった。

その文字が消えたあと、何が残るのか。

0.1秒で処理を返す技術と、人間がそれを認識して理解する時間は別物だ。

速いUIとは、全部を一瞬で消すUIではない。

必要なものをすぐ返して、必要な意味だけを残すUIだ。

**Fast system. Enough human time.**

### 専門語 / Search terms

`Feedback Duration` / `Response Time` / `Status Message` / `Toast` / `Transient UI` / `Persistent UI` / `aria-live` / `role=status` / `WCAG 4.1.3` / `Perceived Responsiveness`

### Sources

- Nielsen Norman Group — Response Times: The 3 Important Limits: https://www.nngroup.com/articles/response-times-3-important-limits/
- W3C WAI — WCAG 2.2, Guideline 2.2 Enough Time: https://www.w3.org/TR/WCAG22/#enough-time
- W3C WAI — Understanding SC 4.1.3 Status Messages: https://www.w3.org/WAI/WCAG21/Understanding/status-messages.html
- W3C WAI — ARIA22: Using role=status to present status messages: https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA22
