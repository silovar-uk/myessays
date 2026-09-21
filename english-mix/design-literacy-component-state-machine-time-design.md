---
id: design-literacy-component-state-machine-time-design
title: "ボタンは四角ではない。数秒ぶんの物語である"
subtitle: "English Mix｜Design Literacy #65｜A component is a tiny state machine"
created: "2026-09-21"
updated: "2026-09-21"
type: "English Mix"
status: "完成"
mode: "english-mix"
english_ratio: 0.45
mix_unit: "sentence"
tags: ["Design Literacy", "UI", "Interaction Design", "Component State", "State Machine", "Accessibility", "Temporal Design"]
keywords: ["component state", "state machine", "statechart", "disabled", "aria-disabled", "focus management", "loading state", "temporal design", "David Harel"]
series: "Design Literacy｜細部から思想まで"
seriesOrder: 65
abstract: "A button may look like one rectangle in Figma, but in use it moves through default, focus, pressed, loading, success and error. This essay treats component states not as visual variants but as a small behavioral system with entry conditions, feedback and exits."
---

# ボタンは四角ではない。数秒ぶんの物語である
## English Mix｜Design Literacy #65｜A component is a tiny state machine

In Figma, a button is a rectangle.

Default. Hover. Pressed. Disabled. We line up the variants and call the component finished.

But the user never experiences the button as a still image. 押したあと通信が始まり、待ち時間が発生し、成功したり失敗したり、focusが動いたりする。

**The design is static. The experience is temporal.**

前回#64では、Brand Identityを「変化しても同じものだと分かること」と捉えた。今回はその考えをComponentへ縮小する。

A button also changes while remaining the same button.

そして今回はDisabled Stateそのものの説明を繰り返さない。#31では「できない・なぜ・どうすれば」を扱った。

Today the question moves one level deeper:

> **Do not only design states. Design the space between states.**

![From static variants to a state machine](https://raw.githubusercontent.com/silovar-uk/myessays/main/assets/design-literacy-component-state-machine/still-to-time.svg)

## 1. A list of variants does not tell us what happens next

A typical component spec looks like this:

~~~text
DEFAULT
HOVER
FOCUS
PRESSED
DISABLED
LOADING
~~~

Visually complete. Temporally incomplete.

「保存する」を押すと、

~~~text
DEFAULT → PRESSED → LOADING → SUCCESS
~~~

失敗すれば、

~~~text
LOADING → ERROR → RETRY → LOADING
~~~

同じStateを持っていても、entry conditionとexit conditionが決まっていなければinteractionは未設計のまま。

A screenshot shows **state**. A transition map shows **causality**.

ここからComponent Designはappearanceからbehaviorへ広がる。

## 2. State is not a color; it is a bundle of conditions

WAI-ARIA APG's Button Pattern defines not only the button role but states such as `aria-pressed` for toggle buttons and `aria-disabled="true"` when an action is unavailable. It also describes keyboard activation and how focus can move after an action.

Source: https://www.w3.org/WAI/ARIA/apg/patterns/button/

So LOADING is not merely:

~~~text
spinner
opacity
label
~~~

It also means:

~~~text
What can the user do?
What is the system doing?
What feedback is visible?
Where is focus?
What ends this state?
~~~

**A state is a contract between system behavior and user expectation.**

見た目はそのcontractの一部にすぎない。

## 3. Replace a State List with a State Contract

BEFORE:

~~~text
Loading
- spinner
- "保存中…"
- opacity .8
~~~

Then engineering asks: Can it be clicked twice? Is cancel possible? What happens after ten seconds? Where does focus go?

The missing information is not cosmetic.

AFTER:

~~~text
STATE CONTRACT

ENTRY
What puts the component here?

BEHAVIOR
What can happen while here?

FEEDBACK
What does the user perceive?

EXIT
What moves it elsewhere?
~~~

Example:

~~~text
LOADING

ENTRY
submit accepted

BEHAVIOR
repeat submit = blocked

FEEDBACK
"保存中…" + spinner

EXIT
success → SUCCESS
failure → ERROR
timeout → ERROR
~~~

Now a Figma variant becomes an interaction specification.

![State Contract](https://raw.githubusercontent.com/silovar-uk/myessays/main/assets/design-literacy-component-state-machine/state-contract.svg)

## 4. Disabled is one state, but not one behavior

HTML's `disabled` attribute and ARIA's disabled state are not interchangeable in behavior.

The WHATWG HTML Standard defines disabled form controls as non-interactive. WAI-ARIA APG notes that HTML-disabled controls are normally removed from the Tab sequence, while `aria-disabled="true"` can be useful when a control should remain discoverable and focusable in specific patterns.

Sources:
https://html.spec.whatwg.org/dev/form-control-infrastructure.html
https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/

This means designers should separate four questions:

~~~text
AVAILABLE?
FOCUSABLE?
DISCOVERABLE?
OPERABLE?
~~~

「disabled = gray」は、behaviorの複数軸を一つのvisual styleに畳み込んでしまう。

The visual state is not the whole state.

## 5. Watch one button for ten seconds

A still review hides time. So let's overdo it slightly.

~~~text
0.0s  DEFAULT
0.2s  PRESSED
0.3s  LOADING
1.8s  LOADING
3.0s  ?
5.0s  ?
10.0s ?
~~~

At some point, the user's mental state changes even if the server state has not.

「押せた？」
「固まった？」
「もう一度押す？」
「二重送信される？」

Technically the system may still be loading. Cognitively, the user may already have transitioned to **uncertainty**.

That gives us a new design material: **elapsed time itself can be a trigger**.

~~~text
short wait
subtle acknowledgement

longer wait
clear progress

very long wait
expectation / cancel / background handling
~~~

These durations are not universal constants. The important move is to ask whether one visual LOADING state can really cover the whole temporal experience.

## 6. State machines did not come from UI design

The concept is much older than modern UI.

In 1987 David Harel published “Statecharts: a visual formalism for complex systems,” extending conventional state diagrams with hierarchy, concurrency and communication for complex discrete-event systems.

Source: https://www.sciencedirect.com/science/article/pii/0167642387900359

This does **not** mean Harel invented button states, nor that Statecharts are the historical origin of UI components.

The useful connection is narrower.

When a system becomes complex, a flat list of states stops being enough. You need relationships: nesting, transitions, simultaneous conditions.

UI runs into the same problem.

~~~text
FORM VALIDITY
× NETWORK
× AUTH
× FOCUS
× MODAL
~~~

At that point, component design starts looking less like drawing and more like describing a reactive system.

## 7. “A button is a tiny story” is a metaphor with practical teeth

The protagonist is not the button.

It is the user's expectation.

~~~text
I can act
↓
I acted
↓
the system received it
↓
something is happening
↓
it ended
↓
I know what to do next
~~~

If one link breaks, trust drops.

Pressed but no acknowledgement. Loading but still clickable. Success but no visible change. Error with no recovery.

These are not primarily style failures.

They are **broken sequences of meaning**.

前回#64がspace上のControlled Variationだったなら、今回はtime上のControlled Variationとも言える。

![From visual grammar to behavioral grammar](https://raw.githubusercontent.com/silovar-uk/myessays/main/assets/design-literacy-component-state-machine/visual-to-behavior.svg)

## 8. Production instruction: do not deliver only state names

> **主要なinteractive componentについて、必要なstateを静止画で列挙するだけでなく、各stateのENTRY / BEHAVIOR / FEEDBACK / EXITを定義してください。特にloading・error・disabled・successは、focus、再操作可否、timeout、retry pathまで確認してください。**

During review, ask four questions:

~~~text
How do we enter?
What can happen here?
What does the user perceive?
How do we leave?
~~~

If nobody can answer, you probably have a drawing, not a behavior spec.

## 9. 守破離｜From variants to system behavior

### 守｜Use the established component states

まずDesign Systemのdefault / hover / focus / pressed / disabled / loading / errorを欠かさず使う。

### 破｜Interrogate the transitions

Do not stop at “we have a loading state.”

Ask what triggers it, whether repeat actions are possible, what failure means and where focus goes.

### 離｜Look beyond the component

A Button may say SUCCESS while the form remains stale, the toast never appears and navigation does not change.

At that point the problem is not inside one component.

**Multiple state machines need to stay coherent.**

## 10. The previous lesson gains a time axis

~~~text
#61 TOKEN
reuse decisions

#62 CONSTRAINT
choose where to explore

#63 VISUAL GRAMMAR
define relationships

#64 CONTROLLED VARIATION
vary without losing identity

#65 STATE MACHINE
change over time without losing meaning
~~~

The same question keeps returning at a higher resolution:

> **What changes, and what must remain stable?**

Brand identity asks it across campaigns.

A button asks it across milliseconds and seconds.

That is today's new connection.

## 11. 30-second practice: hunt transitions, not states

Pick one button in a service you use.

Do not count variants. Follow the arrows.

~~~text
click
↓
slow response
↓
failure
↓
retry
↓
back navigation
↓
focus?
~~~

One “I don't know” is enough to reveal a hole.

A perfectly polished screenshot can still contain undesigned time.

## 12. After the research, a button looks less like a rectangle

Before this, Button State looked like a variant problem.

Default is white. Hover is darker. Pressed sinks. Disabled fades.

After the research, that feels too flat.

ARIA treats state as meaning. APG treats keyboard and focus as part of behavior. HTML and ARIA disabled states differ in operational consequences. Statechart thinking adds one more shift: states matter because of how they connect.

So a button is not just something you press.

It manages:

~~~text
expectation
→ input
→ acknowledgement
→ waiting
→ result
→ next action
~~~

> **A component is defined not only by how it looks, but by how it changes.**

Figma gives us the rectangle.

Interaction gives it a past, a present and several possible futures.

**A button is a tiny story with more than one ending.**

## Next

次は **Transition Cost / Temporal Feedback / Optimistic UI**。

同じ成功でも、「先に成功したように見せる」のか「server responseを待つ」のかで速度感もriskも変わる。

Stateの次は、**遷移そのものに何を賭けるか**を考える。

## Sources

- https://www.w3.org/WAI/ARIA/apg/patterns/button/
- https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/
- https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/examples/toolbar/
- https://html.spec.whatwg.org/dev/form-control-infrastructure.html
- https://www.sciencedirect.com/science/article/pii/0167642387900359
- https://weizmann.elsevierpure.com/en/publications/statecharts-a-visual-formalism-for-complex-systems/
