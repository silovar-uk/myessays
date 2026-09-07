---
id: design-literacy-visual-hierarchy-attention-order
title: "When Everything Shouts, Nothing Stands Out――Visual Hierarchy"
subtitle: "Design Literacy #23｜「大きく・太く・赤く」からdesigning the order of attentionへ"
abstract: "「全部を目立たせてください」という無理難題から始め、Visual Hierarchyをsize rankingではなくthe organization of attentionとして捉え直す。NN/gのVisual HierarchyとSquint Test、GestaltのProximity、MoMAが整理するNew Typographyをつなぎ、scale・contrast・groupingをどう分担させればinformation priorityを視覚化できるかを考える。"
---

# When Everything Shouts, Nothing Stands Out――Visual Hierarchy
## Design Literacy #23｜「大きく・太く・赤く」からdesigning the order of attentionへ

「タイトルをもっと目立たせてください」

Makes sense.

「日付も大事なので目立たせてください」

Fair enough.

「対戦相手も、イベント名も、チケットボタンも、スポンサー名も重要なので目立たせてください」

Now everybody on the screen has a megaphone.

```text
MATCH DAY!!!
9.19 SAT!!!
VS TOKYO V!!!
SPECIAL EVENT!!!
TICKETS!!!
PARTNER!!!
```

**When everything shouts, nothing stands out.**

全員が叫んでいるのに、誰の話も入ってこない。

今回は、この小さな矛盾からVisual Hierarchyを考える。

## 1. Hierarchy is not a ranking of sizes

**Hierarchy is not a ranking of sizes. It is an organization of attention.**

Nielsen Norman Group defines visual hierarchy as organizing elements so that the eye can move through them according to intended importance. Its major levers include **color / contrast, scale, and grouping**.

[Nielsen Norman Group — Visual Hierarchy in UX: Definition](https://www.nngroup.com/articles/visual-hierarchy-ux-definition/)

だから、

```text
important
↓
font-size: 64px
```

だけでは足りない。

The real questions are:

```text
What should people notice first?
What should they understand second?
What can stay quiet until it is needed?
```

情報上のpriorityを、visual formへ翻訳する。

That is the job.

## 2. A slightly excessive experiment

同じ試合情報で、四つのlayoutを作ってみる。

The content stays identical. Only the presentation changes.

### A｜Everyone is equal

```text
MATCH DAY
9.19 SAT 19:00
URAWA REDS vs TOKYO VERDY
SPECIAL EVENT
TICKETS ON SALE
```

Same size. Same weight. Almost the same spacing.

Fair, perhaps.

But the interface is outsourcing the reading order to the user.

### B｜Make only the title huge

```text
MATCH DAY
──────────────
9.19 SAT 19:00
URAWA REDS vs TOKYO VERDY
SPECIAL EVENT
TICKETS ON SALE
```

Now we have a first step.

But the remaining four items are still visually equal.

**You created “first.” You did not create a hierarchy.**

二番目以降が未設計のまま。

### C｜Everything is important, so everything becomes loud

```text
MATCH DAY !!!
9.19 SAT 19:00 !!!
URAWA REDS vs TOKYO VERDY !!!
SPECIAL EVENT !!!
TICKETS ON SALE !!!
```

And we are back where we started.

**Emphasis has an economy.**

強調は希少だから機能する。

### D｜Give different variables different jobs

```text
MATCH DAY

9.19 SAT 19:00
URAWA REDS vs TOKYO VERDY

Special Event

[ TICKETS ON SALE ]
```

Here, one variable does not carry the entire hierarchy.

- title → scale
- date + opponent → grouping
- supporting information → lower contrast
- CTA → local contrast + separate region
- sections → spacing

**INTERPRETATION**

Visual Hierarchy is often easier to control when you create several levels of difference with several variables, rather than maximizing one element.

「一番大事だから最大」にするより、**差の設計を分担する**。

## 3. Squint until the copy disappears

ここで、かなり原始的なtestをする。

一歩離れる。

目を細める。

Make the text unreadable.

**Squint.**

Nielsen Norman Group introduces the Squint Test as a practical way to inspect what remains emphasized and grouped when details become blurry.

[Nielsen Norman Group — Squint Test](https://www.nngroup.com/videos/squint-test/)

This is not eye tracking.

科学的なattention measurementでもない。

But it removes a useful distraction: the meaning of the words.

すると見えるのは、

**contrast / scale / grouping / large visual masses**

が作る骨格。

Blur version C and much of it becomes one loud block.

Blur version D and the title, match information, and CTA can remain as separate levels.

**If the structure survives after the words disappear, the hierarchy is not relying only on copy.**

## 4. Gestalt enters the room: closeness creates relationships

Visual Hierarchy is often explained as a question of emphasis.

But hierarchy also needs **grouping**.

The Gestalt Law of Proximity describes the tendency to perceive elements that are close together as more related than elements separated by greater distance.

[Interaction Design Foundation — Laws of Proximity, Uniform Connectedness, and Continuation](https://assets.interaction-design.org/literature/article/laws-of-proximity-uniform-connectedness-and-continuation-gestalt-principles-2)

Compare:

```text
9.19 SAT

19:00

TOKYO VERDY
```

with:

```text
9.19 SAT
19:00
vs TOKYO VERDY


[ TICKETS ]
```

The second arrangement makes it easier to read “match information” and “action” as separate groups.

ここでWhitespaceの見え方が変わる。

**Space can encode relationships.**

余白は「何もない場所」ではなく、

```text
these belong together
this starts another group
```

を伝える。

So Visual Hierarchy is not only about making something louder.

It also makes relationships visible.

## 5. Visual Weight and Visual Hierarchy are not the same thing

直前の学習ではVisual Weightを扱った。

The question there was:

```text
Which element feels visually stronger?
```

Today the question becomes:

```text
What job should that strength perform?
```

A bright red photograph may carry enormous visual weight or salience.

But if that photograph belongs to a secondary story, the page hierarchy may become wrong.

NN/g also notes that actual content can produce unintended prominence even when a template was designed with a hierarchy in mind.

So a useful distinction is:

```text
Visual Weight
= a lens for how strong something appears

Visual Hierarchy
= a system that connects visual differences
  to information priority
```

**Visual Weight creates differences. Hierarchy gives those differences a job.**

強い＝偉い、ではない。

強さを何に使うかまでが設計。

## 6. A sudden trip to the 1920s

We were fixing a web page.

Somehow, we are now in Central European print design about a century ago.

MoMA describes the New Typography of the 1920s and 1930s as a movement that moved away from traditional type arranged in symmetrical columns. Designers treated the page or poster as a field where type, illustration, and often photomontage could form striking asymmetrical compositions.

Jan Tschichold codified this approach in **Die Neue Typographie** in 1928.

[MoMA — The New Typography](https://www.moma.org/calendar/exhibitions/1013)

ここは慎重に分ける。

**FACT**

New Typography made asymmetrical composition and the active organization of type and image prominent within modern graphic design. Tschichold systematized the movement in his 1928 book.

**INTERPRETATION**

It would be too simple to say that New Typography “invented modern UI visual hierarchy.”

でも、現代のUIを考えるときに、

**order does not require symmetry or equal treatment**

というhistorical comparisonとしては非常に面白い。

The point is not that designers discovered large headlines in 1928.

The point is that **how differences are composed to organize information is itself a design problem.**

## 7. Bauhaus is not red + black + circles + triangles

New Typography and the Bauhaus have real historical connections.

MoMA notes that Tschichold drew from currents in Soviet Russia and the Weimar Bauhaus.

Herbert Bayer studied at the Bauhaus and later returned from 1925 to 1928 as a teacher working in advertising, design, and typography, integrating photography into graphic composition.

[MoMA — Herbert Bayer](https://www.moma.org/artists/399)

But this shortcut is too neat:

```text
Bauhaus
↓
sans-serif
↓
asymmetry
↓
Visual Hierarchy
```

Different people, periods, institutions, and ideas disappear.

Likewise,

```text
red
black
circle
triangle
```

does not automatically create “Bauhaus design.”

同じように、

```text
large heading
bold CTA
light caption
```

does not automatically create a good hierarchy.

**Visual symbols and design principles are not the same thing.**

## 8. Can we program the exact order of looking?

“Visual Hierarchy” sounds powerful.

Almost like:

```text
LOOK HERE → THEN HERE → THEN HERE
```

But users are not deterministic cursors.

Attention changes with:

- goals
- prior knowledge
- screen size
- content
- motion
- environment

So hierarchy should not be understood as total control of gaze.

A safer idea is:

**Make intended importance easier to perceive.**

Squint Test can reveal a broken visual structure, but it does not replace testing real people doing real tasks. NN/g also recommends checking whether the hierarchy actually works with target users.

Hierarchy guides.

It does not command.

## 9. A production instruction you can actually use

「メリハリをつけてください」は抽象的すぎる。

A reusable instruction is:

> **Classify the information into Primary / Secondary / Tertiary and define what should be noticed first. Do not rely only on scale; distribute the work across contrast, font weight, spacing, proximity, and grouping. Finally, use a Squint Test to check whether the intended levels and groups remain visible even when the text itself cannot be read.**

レビューなら、もっと短い。

> **What should be seen first, second, and third? Does the current screen visually explain that order and those groups?**

「もっと大きく」ではなく、

**What role does this information need to play?**

まで戻る。

## 10. The 30-second exercise

Open any app.

Squint.

Yes, literally.

When the text becomes unreadable, identify three things that remain visually dominant.

```text
1st
2nd
3rd
```

Open your eyes normally again.

Were those actually the three most important things on the screen?

If not, ask what created the accidental protagonist:

```text
size?
contrast?
color?
grouping?
spacing?
content?
```

Thirty seconds is enough.

## 11. Next: Information Architecture

At the end, a more uncomfortable question appears.

> What should be Primary in the first place?

Visual Design alone cannot answer that.

```text
Information Architecture
↓
How should information be structured?

Visual Hierarchy
↓
How should that structure become visible?
```

**You cannot fix bad information structure with bigger typography.**

情報構造が曖昧なら、headlineを巨大化しても根本は変わらない。

We started with a ridiculous request:

「全部を目立たせてください」

Before looking into it, Visual Hierarchy looked like a technique for making important things bigger.

Now it looks different.

**The real job is not to create more prominent elements. It is to create meaningful differences between them.**

全部が大事でもいい。

But everything does not need to be the protagonist at the same moment.

---

## Today’s claim

**Don’t make everything louder. Make the differences clearer.**

Visual Hierarchy translates differences in importance, relationship, and sequence into scale, contrast, grouping, spacing, and other visual variables.

全員の声量を上げるのではなく、**誰がいつ話すのかを設計する。**

## Search terms

`Visual Hierarchy / Scale / Contrast / Grouping / Proximity / Gestalt / Squint Test / Visual Weight / New Typography / Jan Tschichold / Herbert Bayer / Information Architecture`

## Sources

- [Nielsen Norman Group — Visual Hierarchy in UX: Definition](https://www.nngroup.com/articles/visual-hierarchy-ux-definition/)
- [Nielsen Norman Group — Squint Test](https://www.nngroup.com/videos/squint-test/)
- [Interaction Design Foundation — Laws of Proximity, Uniform Connectedness, and Continuation](https://assets.interaction-design.org/literature/article/laws-of-proximity-uniform-connectedness-and-continuation-gestalt-principles-2)
- [MoMA — The New Typography](https://www.moma.org/calendar/exhibitions/1013)
- [MoMA — Herbert Bayer](https://www.moma.org/artists/399)
