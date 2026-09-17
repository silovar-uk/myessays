# Why Does 768px Get to Decide Everything?

> **A breakpoint should happen when the content needs it, not when a device name tells you to.**  
> Breakpointは「device categoryが変わった瞬間」ではなく、**contentがそのlayoutに耐えられなくなった瞬間**に置く。

Series: **Design Literacy｜細部から思想まで #51**  
Layer: **MICRO → MESO → MACRO**  
Search terms: `Content-driven Breakpoints` / `Responsive Web Design` / `Media Queries` / `Reflow` / `Breakpoint Testing` / `Device-agnostic Design` / `Responsive Stress Testing` / `WCAG 1.4.10`

---

## 768px. What exactly did you do?

Web制作では、妙に何度も会う数字がある。

```css
@media (max-width: 768px) {
  ...
}
```

**768px.**

It has authority for reasons that are rarely explained.

At 769px, a layout is horizontal. One pixel later, at 768px, the navigation disappears, cards stack, and the entire page enters a different state.

But only one pixel changed.

The meaning of the copy did not change. Human fingers did not suddenly become larger. The card itself did not file a complaint.

And yet the interface transforms because, apparently, **768 happened**.

So here is the weird question:

> 768px、お前は何をしたん？

Once you take that question seriously, a breakpoint starts to look less like a border between devices and more like a point where **content can no longer sustain the current layout**.

---

## 1. Today’s theme｜Content-driven Breakpoints

In #50, Intrinsic Web Design shifted the question from “PCなら3列” to constraints such as minimum card width and available space.

This time, the same logic reaches breakpoints.

A common spec looks like this:

```text
Desktop   1024px〜
Tablet    768〜1023px
Mobile    〜767px
```

It is easy to communicate, but it quietly assumes something important:

> Something meaningful happens to the design around 768px.

Does it?

To find out, remove the device names first.

---

## 2. First principle｜Start from failure, not devices

**Don’t start from device widths. Start from failure.**

Brad Frost has long argued that media-query breakpoints should be driven by **content rather than popular device dimensions**.

That does not mean 768px or 1024px are “wrong.”

The better question is:

> **Does this number have a content-side reason?**

---

## 3. How it works｜Breakpoint Hunting

Take a fictional header.

```text
┌─────────────────────────────────────────┐
│ LOGO   NEWS  MATCH  TEAM  SHOP   LOGIN │
└─────────────────────────────────────────┘
```

Now shrink the browser slowly.

```text
1000px  ○
900px   ○
820px   ○
781px   ○
754px   △
731px   ×
```

At around 731px, labels begin colliding. A little smaller and text wraps.

Only now do we get:

> **Time for a breakpoint.**

The logic changes from:

```text
DEVICE
↓
768px
↓
CHANGE
```

into:

```text
CONTENT
↓
FAILURE
↓
BREAKPOINT
```

You are not really “choosing” a breakpoint anymore.

You are **detecting the moment the current composition stops working**.

---

## 4. Slightly excessive experiment｜Shrink one pixel at a time

Let’s overdo it a little.

Imagine shrinking the viewport from 1000px to 500px one pixel at a time.

You do not literally need to perform 500 manual checks. Slowly resizing in DevTools is enough.

The useful part is to classify the first **failure event**.

```text
A. TEXT FAILURE
copy wraps in a harmful way

B. COLLISION FAILURE
elements touch or overlap

C. DENSITY FAILURE
information becomes exhausting to scan

D. ACTION FAILURE
CTA becomes difficult to use

E. INFORMATION FAILURE
important information has to disappear
```

Now an interesting thing happens: a single website can naturally produce several different breakpoints.

```text
NAV      760px
CARD     684px
HERO     912px
FILTER   838px
```

These numbers are ugly.

That is almost reassuring.

**Numbers produced by content are often less tidy than numbers borrowed from device categories.**

---

## 5. Before → After｜Delete 768px for a moment

### Before

```css
@media (max-width: 768px) {
  .nav {
    display: none;
  }
}
```

The code makes 768px look like the reason.

### After

Resize the navigation first.

```text
796 ○
782 ○
771 ○
763 △
751 ×
```

Suppose the composition fails around 760px.

If your Design System already uses 768px as a shared breakpoint token, 768 may still be a perfectly reasonable choice—provided that the eight-pixel difference does not damage the experience.

So the reasoning becomes:

```text
BEFORE
768だから変える

AFTER
content fails around 760
↓
768 safely absorbs that transition
↓
use 768
```

Same number.

**Very different reason.**

---

## 6. Production instruction you can use tomorrow

> PC / Tablet / Mobileの代表幅だけでbreakpointを決めず、viewportを連続的に変更し、text wrapping、element collision、CTA compression、information hierarchyの崩れが最初に発生する幅を確認してください。その幅をbreakpoint candidateとし、既存のDesign System breakpointへ吸収する場合は品質が維持できる範囲かを検証してください。

For review, this is enough:

> **“What exactly breaks at 768px?”**

If the only answer is:

> iPad.

then it is worth checking again.

---

## 7. Accessibility connection｜Failure is not only visual

ここは一度ちゃんと止まる。

“Layout failure” often sounds visual: text overlaps, cards become narrow, the page looks cramped.

Accessibility expands the definition.

WCAG 2.2 Success Criterion 1.4.10 Reflow requires content, under specified zoom / viewport conditions, to remain usable without losing information or functionality and, with limited exceptions, without two-dimensional scrolling.

So failure can mean:

```text
VISUAL FAILURE
text overlaps

FUNCTIONAL FAILURE
control becomes unusable

READING FAILURE
horizontal scrolling is required to follow copy

INFORMATION FAILURE
important content disappears
```

A breakpoint can therefore be understood not only as a styling threshold but also as an **intervention point for preserving access to information**.

---

## 8. Historical connection｜Responsive Web Design was not a device table

Separate fact from interpretation.

**Fact.** Ethan Marcotte’s 2010 A List Apart article helped establish the term “Responsive Web Design,” combining fluid grids, flexible images, and media queries.

**Interpretation.** Its deeper importance was not simply “better CSS for phones.” It reframed the Web as an environment whose dimensions are continuously variable rather than as a set of fixed canvases.

Seen that way, Content-driven Breakpoints are not a strange side technique.

They are a logical continuation of that shift.

```text
FIXED CANVAS
match a predefined size

↓

RESPONSIVE
respond to the environment

↓

CONTENT-DRIVEN
intervene when content can no longer sustain the current form
```

---

## 9. Common misunderstanding｜So shared breakpoints are bad?

No.

```text
640
768
1024
1280
```

Shared tokens have real benefits: consistency across a Design System, smaller QA matrices, simpler implementation.

The point is not:

> Never use device-derived numbers.

It is to reverse the order of reasoning.

```text
× 768だから変える

○ content breaks around 760
  ↓
  system breakpoint 768 safely covers it
  ↓
  use 768
```

**An observed 768 and a habitual 768 are not the same thing.**

---

## 10. Connection to previous lessons｜From specifying to observing

The last four lessons form one chain.

```text
#48 Fluid Typography
fixed value → relationship

#49 Container Queries
screen → local environment

#50 Intrinsic Design
outcome → constraint

#51 Content-driven Breakpoints
device category → observed failure
```

Until now, the designer’s question was often:

> What should I specify?

Today it becomes:

> **What has to happen before I intervene?**

**Responsive Design is partly observational design.**

Designers need not only the ability to make things, but the ability to **notice the moment a system stops holding together**.

That is today’s higher-resolution connection.

---

## 11. 30-second exercise｜The Disco Test

Open any website on desktop and move the browser width around.

```text
wide
 ↓
narrow
 ↓
wide
 ↓
narrow
```

Watch for just one thing:

> **What is the first moment that feels slightly wrong?**

An orphaned word?

A cramped navigation?

A CTA wrapping to two lines?

An image crop that destroys meaning?

Check the width at that moment.

That is a **breakpoint candidate**.

It is information that does not exist when you only inspect 375 / 768 / 1440px frames in Figma.

---

## 12. Visual model｜A breakpoint is a quality cliff, not a device border

```text
QUALITY
100% ────────────────────────┐
                              │
                              │
                              ▼
                              ×  ← FAILURE
                              │
                              │ intervention
                              ▼
        ─────────────────────────

      1000  900  800  760  700px
                  ↑
          breakpoint candidate
```

Viewed this way, a breakpoint is less like a line labelled “Tablet” and more like a **guardrail placed just before quality falls off a cliff**.

### Visual references

- https://alistapart.com/article/responsive-web-design/
- https://bradfrost.com/blog/post/7-habits-of-highly-effective-media-queries/
- https://www.w3.org/WAI/WCAG22/Understanding/reflow.html

These source pages are useful when adding historical diagrams, quotations, or accessibility references to the article.

---

## 13. Next concept｜The history of Responsive Design

The last few lessons approached Responsive Design from implementation.

Next we move up to MACRO.

Why did Web designers try so hard to make pages behave like fixed paper in the first place?

And when Ethan Marcotte articulated Responsive Web Design in 2010, **what was the idea reacting against?**

The next question is not:

> Which media query should I use?

but:

> **What kind of medium did designers think the Web was?**

---

## Core thesis

> **A good breakpoint marks a change in what the content can sustain, not merely a change in device category.**

A breakpoint is not simply:

> Tablet starts here.

It is:

> **The current representation can no longer preserve content quality beyond this point.**

Before this investigation, 768px looked like an answer.

After it, 768px becomes a question:

> **What exactly becomes worse at 767px?**

If the answer is “nothing,” the breakpoint has not arrived yet.

So perhaps the right way to find a breakpoint is not to stare at a device chart.

It is to listen for the moment when the content says:

> **もう無理。**

And suddenly 768px looks a little less guilty.

For years, it may have been blamed for layout collapse despite having done absolutely nothing.

---

## Sources

- Brad Frost, “7 Habits of Highly Effective Media Queries”  
  https://bradfrost.com/blog/post/7-habits-of-highly-effective-media-queries/
- Ethan Marcotte, “Responsive Web Design”, A List Apart  
  https://alistapart.com/article/responsive-web-design/
- W3C WAI, “Understanding Success Criterion 1.4.10: Reflow”  
  https://www.w3.org/WAI/WCAG22/Understanding/reflow.html
