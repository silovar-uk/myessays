---
id: isovist-visible-world-around-corner
title: "One Metre Before the Corner, the Visible World Was 1.56× Smaller――アイソビストを本気で調べる"
subtitle: "An isovist turns ‘everything visible from here’ into a shape. すると、角はただの角ではなくなる。"
abstract: "A simple 2D model of an L-shaped corridor gave 18㎡ of visible floor one metre before the inner corner and 28㎡ at the corner itself. たった1mで約1.56倍。この『ある地点から見える範囲』を図形として扱うisovistを、Tandy、Benedikt、visibility graph、知覚研究、3D化の限界まで追い、駅・スタジアム・店・オフィスの見え方を考え直す。"
---

# One Metre Before the Corner, the Visible World Was 1.56× Smaller
## An isovist turns “everything visible from here” into a shape. すると、角はただの角ではなくなる。

Imagine a two-metre-wide L-shaped corridor.

横に8m進み、右側で上へ8m折れる。No furniture, no people, no pillars. The walls are completely opaque.

I turned this deliberately boring corridor into a simple 2D geometric model and calculated the floor area that could be reached by a straight line of sight from each viewpoint.

One metre before the inner corner: **18㎡**.

At the corner: **28㎡**.

```text
1m before corner   18㎡
at corner           28㎡
increase           +10㎡
ratio               about 1.56×
```

You move one metre. The building does not gain a single square metre.

Yet **10㎡ of world suddenly appears.**

もちろん、これはhuman visionそのものではない。No head movement, eye height, furniture, crowds, lighting, or field-of-view limits. It is a simple 2D line-of-sight model.

Still, the result feels strange.

普段なら「廊下の角を曲がる」で終わる。

Geometrically, something more dramatic is happening.

**Hidden space is being released into view.**

There is a name for the shape of “everything visible from this point.”

**Isovist.**

名前が強い。

The operation is basically “shade the area you can see from here,” yet the word sounds like a mineral discovered on another planet.

---

## 1. An isovist is a shape attached to your position

Later literature commonly credits C. R. V. Tandy’s 1967 *The isovist method of landscape survey* with the term “isovist.”

その考えを体系的に展開した重要な論文が、Michael L. Benediktの1979年 *To Take Hold of Space: Isovists and Isovist Fields* である。

In plain language, Benedikt’s definition says: an isovist is **the set of points in an environment visible from one vantage point**.

The important part is that it is not simply “the shape of the room.”

同じ部屋でも、立つ場所が変われば形が変わる。

Stand in front of a pillar, and the space behind it disappears from the shape.

Move toward a doorway, and the neighbouring room begins to stretch into view.

L字廊下では、角に近づくほど、その先の空間が少しずつ開く。

So an isovist is not fixed to the floor plan.

**It follows you. It stretches, shrinks, and gets bitten away by occlusion.**

ここで「空間」という言葉が少し怪しくなる。

The room area stays constant. The walls stay still.

But the visual information available to a person can change enormously in a few steps.

Benedikt also proposed numerical measures of isovist shape and size and the idea of **isovist fields**: instead of asking what one person sees at one point, describe an entire environment by what becomes visible from many points.

普通の地図は「what exists where」を描く。

An isovist field asks a stranger question:

**“Where do I have to stand for the world to open this much?”**

---

## 2. Once visibility becomes a polygon, we immediately want to measure it

Give humans a shape and we will measure it.

アイソビストでも、たとえば次のような特徴を扱える。

- area: how much space is visible from that point
- perimeter: how long the boundary of the visible region is
- compactness: whether the shape is relatively compact or stretched
- occlusion-related measures: how much of the boundary suggests space hidden behind corners or surfaces

ただし、ここは慎重に扱う必要がある。

Different studies and software packages use somewhat different names, normalisations, and formulas.

So there is no universal psychological meter where “compactness = 0.4” automatically means a specific feeling.

それでも数値化には意味がある。

Instead of saying, “this place somehow feels more open,” we can ask **which visible properties differ, and where**.

Now return to the L-shaped corridor.

I moved the viewpoint toward the corner in 0.1m steps.

```text
distance to corner   visible floor
1.0m                 18.00㎡
0.8m                 18.50㎡
0.6m                 19.33㎡
0.5m                 20.00㎡
0.4m                 21.00㎡
0.3m                 22.60㎡
0.2m                 24.40㎡
0.1m                 26.20㎡
0.0m                 28.00㎡
```

The increase is not linear.

角に近づくほど、visible areaの増え方が大きい。

The final ten centimetres alone add **1.8㎡**.

**Those last ten centimetres are doing suspiciously hard work.**

Before this, I thought of a corner as a place where direction changes by 90 degrees.

アイソビストで見ると、むしろ**a device that gradually releases hidden space**に見えてくる。

---

## 3. Repeat the view everywhere, and space becomes a network

Now let’s overdo it once more.

一地点ではなく、床面のあちこちにviewpointsを置く。

If point A can see point B, connect them.

Do that again and again.

In 2001, Alasdair Turner, Maria Doxa, David O’Sullivan and Alan Penn described this mutual visibility as a **visibility graph** in *From Isovists to Visibility Graphs*.

すると建物は「rooms connected by doors」だけではなくなる。

It also becomes **a network of locations connected by sight**.

That shift is powerful.

住所も床面積も変えずに、柱一本、partition一枚、展示物一つでvisual networkは変わる。

At a station: can you see the exit sign the moment you leave the gate?

スタジアムなら、コンコースの分岐で次のゲートや売店が見えるか。

At a supermarket: can the end of one aisle reveal the next category?

オフィスなら、席から出入口や共用部がどの程度見えるか。

The question is no longer only, “Does it exist?”

It becomes:

**“Is it visible from where the person currently is?”**

This feels oddly close to interface design.

A button can technically exist and still be undiscoverable.

建築でも、場所は存在しているのに、現在地点からは「ないのと近い」ことがある。

Existence and visibility are different states.

---

## 4. Can an isovist tell us how people feel?

Here the joke has to stop.

**Not directly.**

Research has examined relationships between isovist measures and spatial experience or behaviour.

Wiener and Franz used 16 virtual indoor scenes and reported strong correlations between some isovist-derived measures and participants’ navigation tasks and experiential ratings.

興味深い結果だが、「visible areaが大きいほど快適」「この数値なら迷わない」という単純な因果にはできない。

Real perception includes body orientation, eye and head movement, eye height, lighting, colour, material, sound, crowds, purpose, memory, signage and cultural meaning.

And classic computational isovists are often implemented in 2D or 2.5D.

Krukar and colleagues challenged this limitation in their 2021 paper *Embodied 3D isovists*.

単純な3D volumeでは、上下・左右・床・壁・天井を、人間が同じ意味で知覚するかのように扱いやすい。

But humans are embodied. We do not experience floor, ceiling, left, right, above and below as geometrically interchangeable.

Their embodied 3D method predicted perceived spaciousness and complexity better than a generic volumetric 3D isovist in their study.

At the same time, the authors explicitly do not claim to model embodied experience in its entirety.

この慎重さが重要である。

**An isovist is not experience itself. It is a model that isolates comparable visual conditions feeding into experience.**

A map is not a city.

アイソビストも視界そのものではない。

But a map can help us think about a city, and an isovist can help us think about visibility.

---

## 5. What if we reviewed a stadium by “how the world opens”?

Take a stadium concourse.

通常なら、通路幅、滞留人数、売店数、サイン位置、ゲートまでの距離などを見る。

Add one more layer: isovists.

Then a different question appears:

**“From this exact point, how many next choices are perceptually available?”**

A shop may physically exist 30m away, but if a pillar hides it, it is absent from this viewpoint.

案内板が設置されていても、人垣の向こうならcrowded conditionsでは見えない。

A wide concourse can still become visually fragmented by partitions and queue lines.

Conversely, even a narrow space can reveal future movement options early if the next zone is visible far ahead.

これは「アイソビストだけで設計しよう」という話ではない。

The useful role is smaller and better:

**Add “visible relationships” as a review layer beside area, distance, capacity, signage and operations.**

UI review asks not only “Is the function implemented?” but “Can the user notice it from this screen?”

空間でも「その場所はあるか」だけでなく、「今ここから知覚できるか」を見る。

Architecture and UI are different things, of course.

But this question survives the translation:

**Existence is not visibility.**

---

## 6. Before this, a corner was just an obstruction

When I first encountered the word “isovist,” it sounded almost comically grand.

「見える範囲」に名前をつけただけではないか。

That is partly true.

Take what can be seen from here. Turn it into a shape.

But the simplicity is exactly why it travels so far.

図形にするとmeasureできる。

Repeat it across locations and it becomes a field.

Connect mutually visible points and it becomes a graph.

Compare those measures with behaviour, and we can investigate what visibility explains—and where it fails.

Now back to the corridor.

調べる前、角は「向こうを隠す邪魔なところ」だった。

Now it looks different.

A corner holds part of the world back.

近づくと、少しずつ返してくる。

And in the final ten centimetres, it becomes oddly generous.

**Turning a corner is not only a change of direction. It is also a change in the geometry of the visible world.**

明日から廊下の角で、ほんの一瞬だけ立ち止まりそうだ。

I will not know how many square metres I can see.

But I will know that a shape exists around me that can exist only from this point.

それだけで、ただの廊下が少し変になる。

## References

- C. R. V. Tandy (1967), *The isovist method of landscape survey*. Bibliographic record in later research: https://www.tandfonline.com/doi/full/10.1080/13658816.2025.2581833
- Michael L. Benedikt (1979), *To Take Hold of Space: Isovists and Isovist Fields*. https://journals.sagepub.com/doi/10.1068/b060047
- Alasdair Turner et al. (2001), *From Isovists to Visibility Graphs: A Methodology for the Analysis of Architectural Space*. https://discovery.ucl.ac.uk/id/eprint/160/
- Jan M. Wiener & Gerald Franz, *Isovists as a Means to Predict Spatial Experience and Behavior*. https://link.springer.com/book/10.1007/b106616
- Jakub Krukar et al. (2021), *Embodied 3D isovists: A method to model the visual perception of space*. https://journals.sagepub.com/doi/10.1177/2399808320974533

### About the corridor experiment

The numbers in this article come from a simple 2D polygon model built for this essay. Visible regions were calculated by ray casting from each viewpoint against opaque walls. The L-shaped floor combined an 8m × 2m horizontal corridor with a 2m × 8m vertical corridor, giving 28㎡ total floor area. The model excludes furniture, people, viewing angle, eye height and lighting. These figures describe geometric visibility, not a psychological scale.
