---
id: thinkpad-powerpoint-reduce-mouse-switching
title: "PowerPointは、マウスを速くするよりtouch it less――ThinkPadをslide-making machineにする"
subtitle: "Ctrl + D, TrackPoint, Quick Access Toolbar, Selection paneまで。Speedを「searching, hand travel, re-deciding」の削減から考える"
created: "2026-10-01"
updated: "2026-10-01"
type: "リサーチエッセイ"
status: "完成"
tags: ["ThinkPad", "PowerPoint", "slide making", "productivity", "shortcuts", "consulting"]
keywords: ["PowerPoint speed", "ThinkPad PowerPoint", "Quick Access Toolbar", "TrackPoint", "Ctrl D", "Selection pane"]
grow: 5
abstract: "Making PowerPoint faster is not mainly about moving the mouse faster. The real friction can be separated into three costs: searching for commands, moving your hands between input devices, and re-deciding layout choices on every slide. This English Mix edition connects ThinkPad's TrackPoint and Fn/Ctrl settings with PowerPoint duplication, Quick Access Toolbar, Selection pane, alignment, and reusable slide families."
---

# PowerPointは、マウスを速くするよりtouch it less
## ThinkPadをslide-making machineにする

PowerPointで資料を作っていると、a strange kind of lost time appears.

図形を少し右へ動かす。You search the ribbon for Align. 文字を直す。Move your hand to the mouse. 別の図形を選ぶ。A tiny gap looks wrong, so you fix it again.

Each action takes only seconds. But across twenty or thirty slides, the deck starts spending more of your time on **returning to operations** than on thinking.

PowerPoint productivity advice often becomes a shortcut list. でも、the deeper problem comes before shortcuts. There are three kinds of friction.

- **Search cost**：どこにコマンドがあるか探す時間
- **Hand-travel cost**：keyboard, mouse, touchpadを往復する時間
- **Re-decision cost**：spacing, layout, formattingを毎回ゼロから決め直す時間

Reduce those three, and PowerPoint becomes much lighter.

ThinkPad happens to fit this model well. TrackPoint sits inside the typing position. Fn/Ctrl behavior can be adjusted on supported machines. The point is not that the red nub itself is magically fast. **ThinkPad can reduce how often your body switches modes**, and that matches the structure of slide work.

> **Information date: 2026-10-01**
>
> This article mainly assumes Windows PowerPoint for Microsoft 365. Shortcuts and ThinkPad-specific controls can vary by Office version, keyboard layout, generation, and model.

関連：[ThinkPadへの移行で、本当に移すべきものはファイルではない](#/essay/thinkpad-migration-rebuild-working-environment)

## 1. Speed up Ctrl before you speed up the mouse

<!-- level:4 role:claim -->
The more keyboard-driven your PowerPoint workflow becomes, the more often you touch Ctrl.

Copy, paste, duplicate, group, copy formatting, paste formatting, Paste Special. Many core slide-building actions start there.

On supported ThinkPads, Lenovo documents Fn/Ctrl function swapping through Lenovo Vantage, Lenovo Keyboard Manager, or UEFI/BIOS. The important question is not whether you should obey the ThinkPad default. It is simpler: **can your finger reach a high-frequency key without friction hundreds of times a day?**

For PowerPoint, start with these.

- Ctrl + D: duplicate selected object
- Ctrl + Shift + D: duplicate selected slide
- Ctrl + G: group
- Ctrl + Shift + G: ungroup
- Ctrl + Shift + C: copy formatting
- Ctrl + Shift + V: paste formatting
- Ctrl + Alt + V: Paste Special

If you memorize only one first, choose Ctrl + D.

“Copy, then paste” becomes “duplicate.” これはsmall changeに見える。でも、その瞬間からPowerPointの仕事が「新しい箱を作る」から**“reuse the correct box and edit the difference”**へ変わる。

参照：[Microsoft PowerPoint keyboard shortcuts](https://support.microsoft.com/ja-jp/accessibility/powerpoint/use-keyboard-shortcuts-to-create-powerpoint-presentations) ／ [Lenovo Fn/Ctrl key swap](https://support.lenovo.com/in/en/solutions/ht074187-how-to-swap-the-fn-function-and-ctrl-control-keyboard-keys-in-bios)

## 2. Build by difference, not from blank slides

<!-- level:4 role:claim -->
A big reason slide work becomes slow is that every page is treated as a new composition.

Slide 1: decide title position.  
Slide 2: decide it again.  
Slide 3: reconsider the margins.

You are not only repeating operations. You are repeating decisions.

Instead, define a small set of slide families first.

- message + one visual
- two-column comparison
- three-option comparison
- process
- timeline
- table
- chart + implication
- summary
- appendix

Once spacing, typography, and hierarchy are fixed, duplicate the slide with Ctrl + Shift + D and edit only the delta.

The speed gain is bigger than the shortcut itself. You stop reconsidering margins, title positions, and visual grammar. **You reduce re-decision cost.**

Treat PowerPoint as a drawing app and every slide starts at 0%.  
Treat it as a reusable layout system and many slides start at 80%.

That difference is worth more than memorizing dozens of random shortcuts.

## 3. TrackPoint reduces commuting between typing and pointing

<!-- level:4 role:claim -->
TrackPoint is useful in PowerPoint not because it is “a more precise mouse.”

Its value is that your right hand can move from typing to pointing without traveling far from the home row. Lenovo documents TrackPoint as a pressure-based pointing device, with center-button combinations for scrolling on supported models.

In PowerPoint, divide positioning into rough and fine work.

1. TrackPoint or mouse: place the object roughly
2. Arrow keys: adjust position
3. Ctrl + arrow key: nudge in smaller increments
4. Align commands: make exact relationships

Microsoft documents Ctrl + arrow keys as a way to move text boxes and shapes in small increments.

The key idea is simple: do not use the pointer for the final few pixels.

**Human places approximately. PowerPoint aligns exactly.**

参照：[Lenovo ThinkPad User Guide, TrackPoint pointing device](https://download.lenovo.com/manual/thinkpad_p1_gen8_t1g_gen8/user_guide/en/Use_the_TrackPoint_pointing_device.html) ／ [Microsoft, move a text box, WordArt, or shape](https://support.microsoft.com/ja-jp/office/graphics-visuals/move-a-text-box-wordart-or-shape)

## 4. Turn Quick Access Toolbar into your command surface

<!-- level:4 role:claim -->
If you use a PowerPoint command every day but still search the ribbon for it every day, its location is wrong.

クイック アクセス ツール バー（Quick Access Toolbar）は、the current ribbon tabに関係なくfrequent commandsを置ける場所。Microsoft also documents using Alt to reveal the Key Tip letter or number associated with toolbar commands.

So QAT is not merely a favorites bar. It is a **personal command surface**.

For consulting-style slides, start with commands such as:

- Align Left
- Align Center
- Align Right
- Align Top
- Align Middle
- Align Bottom
- Distribute Horizontally
- Distribute Vertically
- Bring Forward
- Send Backward

Microsoft documents both alignment and equal distribution for multiple objects. Instead of repeatedly drilling through Shape Format → Arrange → Align, put your high-frequency commands where they stop being searchable.

The deeper benefit is diagnostic.

Building QAT forces you to ask: **what commands actually define my slide-making behavior?**

You do not need to know all of PowerPoint. You need your most frequent ten commands to become almost invisible.

参照：[Microsoft, Customize the Quick Access Toolbar](https://support.microsoft.com/ja-jp/office/customize-the-quick-access-toolbar) ／ [Microsoft, Use a keyboard to customize the Quick Access Toolbar](https://support.microsoft.com/ja-jp/accessibility/office-accessibility/use-a-keyboard-to-customize-the-quick-access-toolbar) ／ [Microsoft, Align or arrange objects](https://support.microsoft.com/ja-jp/office/graphics-visuals/align-or-arrange-objects)

## 5. When clicking fails, think in layers

<!-- level:4 role:claim -->
PowerPoint suddenly becomes slow when objects start overlapping.

Transparent rectangles, background bands, icons, charts, text boxes. You click what you can see and select something else sitting above it.

At that point, stop clicking harder.

In Windows PowerPoint, Tab / Shift + Tab can cycle through objects when an object is selected. Alt + F10 opens the 選択ウィンドウ（Selection pane）, where objects can be selected, hidden, reordered, and locked.

Simple slide: touch visible objects directly.  
Complex slide: manage an object hierarchy.

Once a slide becomes layered, thinking like a tiny layout system is faster than thinking like a canvas.

参照：[Microsoft, Selection pane](https://support.microsoft.com/en-us/powerpoint/use-the-selection-pane-to-manage-objects-in-documents) ／ [Microsoft PowerPoint keyboard shortcuts](https://support.microsoft.com/ja-jp/accessibility/powerpoint/use-keyboard-shortcuts-to-create-powerpoint-presentations)

## 6. Write one sentence before opening PowerPoint

<!-- level:4 role:claim -->
The biggest PowerPoint speed improvement happens outside PowerPoint.

If you open a blank slide and ask “what should I say?”, three problems happen at once: issue structuring, wording, and layout. The cursor may move, but thinking becomes overloaded.

First, write one message per slide.

1. The market is growing.
2. Young-user penetration is not.
3. The main barrier is first use, not awareness.
4. The intervention should reduce first-use friction.
5. Compare three options by impact, cost, and execution difficulty.
6. Start with option A.

Then open PowerPoint.

Now the question changes from “what do I say?” to “how do I show it?” If your slide families already exist, even “how” becomes a selection problem rather than an invention problem.

PowerPoint speed is not mainly finger speed.

**It is reducing how many different problems you try to solve at the same moment.**

## 7. Build a PowerPoint-first ThinkPad in 30 minutes

### Minute 0–5: fix input

- Check whether Fn/Ctrl feels natural
- Swap functions on supported models if needed
- Confirm FnLock behavior

### Minute 5–15: learn the small core

- Ctrl + D
- Ctrl + Shift + D
- Ctrl + G
- Ctrl + Shift + G
- Ctrl + Shift + C
- Ctrl + Shift + V
- Ctrl + Alt + V
- Tab / Shift + Tab
- Alt + F10

Nine actions are enough to start.

### Minute 15–25: build QAT

Add alignment, distribution, and layer-order commands that you repeatedly search for.

### Minute 25–30: make only three slide families

- message + visual
- two-column comparison
- three-option comparison

Do not design ten templates on day one. Use three in real work and add only what becomes necessary.

## Conclusion: fast users do not move faster; they return less

When PowerPoint feels slow, the visible symptom is mouse movement.

But the deeper losses are returns: return to the ribbon, return to the mouse, return to the previous slide to remember formatting, return to the layout decision you already made yesterday.

So the sequence is:

1. turn repeated creation into duplication
2. move frequent commands into Quick Access Toolbar
3. split rough placement and fine adjustment
4. use Selection pane when layers become complex
5. duplicate slide families instead of starting blank
6. write the one-line message before touching the slide

TrackPoint is a useful symbol for the whole idea.

It does not magically make PowerPoint fast. It simply lets one action follow another with less physical switching. Extend that logic from pointing to commands, layouts, and thinking.

**Search less. Travel less. Re-decide less.**

Then PowerPoint stops being a place where you draw thirty separate pages. It becomes a place where you place only the differences that matter.

### 主な参照先

- [Microsoft PowerPoint keyboard shortcuts](https://support.microsoft.com/ja-jp/accessibility/powerpoint/use-keyboard-shortcuts-to-create-powerpoint-presentations)
- [Microsoft Customize the Quick Access Toolbar](https://support.microsoft.com/ja-jp/office/customize-the-quick-access-toolbar)
- [Microsoft Use a keyboard to customize the Quick Access Toolbar](https://support.microsoft.com/ja-jp/accessibility/office-accessibility/use-a-keyboard-to-customize-the-quick-access-toolbar)
- [Microsoft Align or arrange objects](https://support.microsoft.com/ja-jp/office/graphics-visuals/align-or-arrange-objects)
- [Microsoft Selection pane](https://support.microsoft.com/en-us/powerpoint/use-the-selection-pane-to-manage-objects-in-documents)
- [Microsoft Move a text box, WordArt, or shape](https://support.microsoft.com/ja-jp/office/graphics-visuals/move-a-text-box-wordart-or-shape)
- [Lenovo Fn/Ctrl key swap](https://support.lenovo.com/in/en/solutions/ht074187-how-to-swap-the-fn-function-and-ctrl-control-keyboard-keys-in-bios)
- [Lenovo ThinkPad User Guide, TrackPoint pointing device](https://download.lenovo.com/manual/thinkpad_p1_gen8_t1g_gen8/user_guide/en/Use_the_TrackPoint_pointing_device.html)
