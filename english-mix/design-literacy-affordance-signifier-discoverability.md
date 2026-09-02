---
id: design-literacy-affordance-signifier-discoverability
title: "押せるだけでは足りない――AffordanceとSignifierで『操作できる』を伝える"
subtitle: "English Mix｜Design Literacy #7｜From Capability to Discoverability"
created: "2026-09-02"
updated: "2026-09-02"
type: "English Mix"
status: "完成"
mode: "english-mix"
english_ratio: 0.45
mix_unit: "sentence"
series: "Design Literacy｜細部から思想まで"
seriesOrder: 7
---

# 押せるだけでは足りない――AffordanceとSignifierで「操作できる」を伝える
## Design Literacy #7｜From Capability to Discoverability

**An action can be possible and still be invisible.**

前回のTouch Targetでは、the visible icon and the actual hit area do not have to be the same sizeと考えた。

でも次の問題がある。

**Even if the target is large enough, what happens if the user cannot tell that it is actionable?**

今回は **Affordance** と **Signifier** を分けて考える。

## 1. 押せることと、押せると分かることは違う

画面上に、ただ文字がある。

```text
チケットを購入
```

Technically, it may already be a link.

でも本文と同じ色・太さなら、it can look like ordinary static text.

そこで、

```text
[ チケットを購入 ]
```

のようにborder、color、placement、labelなどの手がかりを与える。

つまり、

**what can be done**
と
**what communicates what can be done**

は別の問題や。

## 2. Affordance and Signifier are not synonyms

The concept of affordance comes from James J. Gibson's ecological psychology. In Gibson's framing, an affordance is an **action possibility** in the relationship between an actor and the environment, and it does not have to be consciously perceived.

その後Don Normanがdesignへこの概念を持ち込み、使い方を理解しやすくする議論で広く使われるようになった。

Norman later argued that designers had overloaded the word affordance and emphasized **Signifier** as the better term for perceivable clues that communicate appropriate action.

[Don Norman — Signifiers, not affordances](https://jnd.org/signifiers-not-affordances/)

[Interaction Design Foundation — Affordances](https://assets.interaction-design.org/literature/book/the-encyclopedia-of-human-computer-interaction-2nd-ed/affordances)

A useful working distinction is:

```text
Affordance
What can I do?

Signifier
How do I know what I can do?
```

## 3. Visual Lesson：機能を変えずにDiscoverabilityを変える

<div class="dl-visual" role="group" aria-label="Signifierの弱いUIと強いUIの比較">
<p class="dl-visual-kicker">VISUAL LESSON</p>
<p class="dl-visual-title"><strong>The clickable area can stay the same while discoverability changes dramatically.</strong></p>
<div class="dl-compare">
<div class="dl-panel">
<p class="dl-panel-label">BEFORE — ACTION EXISTS, CUE IS WEAK</p>
<div class="dl-demo-card">
<p class="dl-event">MATCH INFORMATION</p>
<p class="dl-meta">詳細情報とチケット案内</p>
<div class="dl-actions"><span>チケットを購入</span><span>詳細を見る</span></div>
</div>
</div>
<div class="dl-panel dl-panel-after">
<p class="dl-panel-label">AFTER — ACTION IS SIGNIFIED</p>
<div class="dl-demo-card">
<p class="dl-event">MATCH INFORMATION</p>
<p class="dl-meta">詳細情報とチケット案内</p>
<div class="dl-actions"><span class="dl-action dl-action-primary">チケットを購入</span><span class="dl-action dl-action-secondary">詳細を見る</span></div>
</div>
</div>
</div>
<p class="dl-visual-note">Both versions can technically be clickable. What changes is the strength of the signifier that tells the user an action is available.</p>
</div>

前回はhit areaを扱った。

今回は **Discoverability** を扱っている。

## 4. A signifier is more than a shadow

「buttonらしく見せる」と聞くと、3D shadowやbevelを思い浮かべやすい。

But signifiers can be many things:

- **Shape** — button-like boundary
- **Color / Contrast** — difference from static content
- **Label** — action language such as Buy or Save
- **Placement** — a familiar toolbar or navigation position
- **Consistency** — similar appearance implies similar behavior
- **Icon** — learned symbols such as search or share
- **State change** — hover, pressed, focus, loading

So:

```text
Signifier ≠ 3D shadow
```

NN/g notes that people infer clickability from multiple cues, including borders, color, size, consistency, placement and established web conventions.

[Nielsen Norman Group — Beyond Blue Links](https://www.nngroup.com/articles/clickable-elements/)

## 5. そのまま使える制作・修正指示

「もっとボタンっぽく」はtoo vague and often produces decoration without diagnosis.

A better production instruction is:

> **この要素はclickableですが、周囲のstatic textと視覚的な扱いが近く、操作可能性を示すsignifierが弱いです。border・contrast・label・placement・状態変化のうち必要最小限の手がかりを追加し、操作前に『押せる』と判断できる状態にしてください。**

A shorter review question:

> **押せるかどうかではなく、押せると分かる根拠は何ですか？**

This shifts the conversation from “it works” to “it is discoverable.”

## 6. Flat Design：削ったのは装飾だけだったか

ここからUI historyへ上がる。

Flat Design became prominent in the 2010s and removed many gradients, bevels and shadows that had been common in earlier GUIs and skeuomorphic interfaces.

That direction is not simply bad. It can reduce visual noise and foreground content.

問題は、decorative depthを削るときに **interaction cuesまで一緒に削ってしまうこと**。

NN/g research found that weak or absent signifiers in flat interfaces can increase the effort required to identify interactive elements and create uncertainty.

[Nielsen Norman Group — Flat UI Elements Attract Less Attention and Cause Uncertainty](https://www.nngroup.com/articles/flat-ui-less-attention-cause-uncertainty/)

ここから先は解釈やけど、a useful question for flat design is:

> **What remains meaningful after you remove the visual treatment?**

Simplicity is not only subtraction. Meaning has to survive the subtraction.

## 7. Common Misreading：Affordance = 見た目ではない

UI reviewで、

> 「このbutton、affordanceが弱い」

と言うことは多い。

In everyday design conversation, people may understand what you mean. But if the problem is specifically that the interface fails to communicate clickability, **weak signifier** is the more precise diagnosis.

Norman explicitly criticized the way affordance became overloaded in design language and argued for greater attention to signifiers.

今日から一度こう分ける。

```text
The action is possible
→ Affordance side

The user can tell it is possible
→ Signifier side
```

The goal is not academic purity. It is **better problem decomposition**.

## 8. Connect the previous lessons

<div class="dl-chain" aria-label="Design Literacyの概念接続"><span>Figure–Ground / Focus</span><span>Alignment / Visual Geometry</span><span>Touch Target / Interaction Geometry</span><span>Affordance / Capability</span><span>Signifier / Discoverability</span></div>

前回の問いは、

**Can the user actually hit it?**

今回の問いは、

**Can the user tell that it can be hit?**

さらにFigure–Groundへ戻ると、even a good signifier can disappear if it is buried in visual noise.

So we can separate:

```text
Capability
It can be done

↓

Discoverability
I know it can be done

↓

Salience
I can find it when I need it
```

This is today's resolution upgrade.

## 9. 30-second observation

スマホアプリかWebサイトを一つ開く。

Before touching anything, divide the screen into two categories:

**Looks clickable.**

**Does not look clickable.**

Then interact with it.

Look for mismatches:

- looks clickable but is not
- does not look clickable but is

どちらもsignifierとbehaviorの不一致や。

最後に一つだけ問う。

> **What made me think this was clickable?**

Border? Color? Position? Icon? Prior experience?

If you can name the cue, the observation worked.

## 10. Next Concept：Feedback

Once users know where they can act, the next question is temporal:

**After I act, how do I know what happened?**

```text
Affordance
What can I do?

↓

Signifier
Where can I do it?

↓

Feedback
What happened after I did it?
```

次は **Feedback / System Status**。

ここからUIを静止画ではなく、before / during / afterの時間軸で見るようになる。

今日の中心命題はこれ。

**An action can be possible and still be invisible.**

「機能があるか」だけではなく、**how does the user know that the function exists?**まで見る。

## Sources

- [Don Norman — Signifiers, not affordances](https://jnd.org/signifiers-not-affordances/)
- [Interaction Design Foundation — Affordances](https://assets.interaction-design.org/literature/book/the-encyclopedia-of-human-computer-interaction-2nd-ed/affordances)
- [Nielsen Norman Group — Beyond Blue Links: Making Clickable Elements Recognizable](https://www.nngroup.com/articles/clickable-elements/)
- [Nielsen Norman Group — Flat UI Elements Attract Less Attention and Cause Uncertainty](https://www.nngroup.com/articles/flat-ui-less-attention-cause-uncertainty/)
- [Nielsen Norman Group — Flat-Design Best Practices](https://www.nngroup.com/articles/flat-design-best-practices/)
