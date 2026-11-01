---
id: "vectors-two-hundred-pedestrians-zero-net-flow-2026"
title: "200人歩いているのに、ベクトルを足すとゼロになる"
subtitle: "Vectors, crowd flow, and the information hidden by a single number"
mode: "english-mix"
english_ratio: 0.42
mix_unit: "sentence"
---

# 200人歩いているのに、ベクトルを足すとゼロになる

*Vectors, crowd flow, and the information hidden by a single number — English Mix edition*

Imagine a station corridor. One hundred people walk right. Another hundred walk left. **Two hundred people are moving, but the net direction can add up to zero.** いったい何が消えたのか。

The people are still there. What disappeared was information — information that the calculation was not designed to keep. この小さな違和感から、ベクトルの基礎を始めよう。

## 守｜A number tells you how much. A vector also tells you which way.

チケット3,000枚、気温25度。These are examples of **scalars（スカラー：一つの数で表す量）**。それだけで必要な情報が伝わる。

But “10 kilometers per hour” tells us speed, not direction. East or west? A **vector（ベクトル）** can represent both magnitude（大きさ）and direction（向き）. 矢印なら、長さが大きさ、先端が向きになる。

This arrow is a starting point, not the full mathematical definition. ベクトルは後で、数字を順番に並べたものとしても登場する。[基礎の解説](https://www.3blue1brown.com/lessons/vectors/)

## 守｜Two coordinates describe one movement

東を横軸（x-axis）、北を縦軸（y-axis）の正方向にする。Move 3 meters east and 4 meters north. We write the vector as **(3, 4)**. 二つの数は成分（components）と呼ばれる。

Now compare two distances. You walked 3 + 4 = **7 meters** along that particular route. But the straight-line displacement（始点から終点までの変位）has length √(3² + 4²) = **5 meters**.

歩いた距離（distance traveled）と、位置の変化（displacement）は違う。Walk in a circle and return to your starting point: your displacement is zero, even though you walked a positive distance.

## 守｜Addition keeps the result, not the full journey

最初の移動が（3, 4）、次が（2, 0）なら、**(3, 4) + (2, 0) = (5, 4)**。Add corresponding components.

Multiply (3, 4) by 2 and you get (6, 8). これはスカラー倍（scalar multiplication）。Multiply by −1 and you get (−3, −4), pointing the opposite way.

These two operations — vector addition（ベクトルの加法）and scalar multiplication（スカラー倍）— are foundational to linear algebra（線形代数）. They let us combine movements into one result. ただし、その結果だけでは途中の経路を復元できない。[基本操作の出典](https://www.3blue1brown.com/lessons/vectors/)

## 破｜Zero can describe two radically different scenes

ここで思考実験（thought experiment）。These are hypothetical situations, not measured data.

**Scene A:** 100 people walk right at 1 meter per second, and 100 walk left at the same speed. Taking right as positive, the sum of their signed velocities is 100×1 + 100×(−1) = **0**.

**Scene B:** 200 people remain still. Their signed velocities add up to **0** again.

同じゼロでも、Aでは200人が動き、Bでは誰も動かない。The net sum cannot tell us the total amount of movement. We need more information: directional counts, individual speeds, or the sum of absolute speeds.

Research makes the story more interesting. In a controlled study of bidirectional pedestrian movement, opposing walkers formed lanes. Balanced two-way flow could work efficiently at low density, but it could become blocked at high density. **Density changes the meaning of the same flow balance.** [2016 experimental paper](https://doi.org/10.1103/PhysRevE.94.032304)

A separate study accepted in 2026 also tested corridor angles and directional flow ratios. Its results did not follow one simple rule across geometries. 通路の形を変えただけでも、観察すべき現象が変わる。[研究要旨](https://doi.org/10.1103/xh94-mfct)

## 破｜For a stadium, start with the decision, not the dashboard

スタジアムの退場導線を考えよう。Imagine tracking pedestrian positions from video frames. Changes in position over time can give an estimated motion vector.

If the question is **“Which way are people moving?”**, study directional flows. 「どこに滞留があるか」なら、人数と密度が重要になる。If the concern is conflicting movements, direction, speed, width, and spatial distribution may matter together.

This is a design proposal, not proof that any particular stadium already has such a system. Camera blind spots, perspective, tracking errors, and field validation are serious constraints. **A vector can describe movement; it cannot certify safety on its own.**

## 離｜A vector can represent business outcomes, too

ベクトルは空間上の移動だけではない。Suppose a sports club represents campaign results as **(new visitors, returning visitors)**, with the groups defined not to overlap.

Campaign A produces (100, 20); Campaign B produces (20, 100). Both total 120. だが、同じ成果とは限らない。

Let the evaluation weights be (2, 1), meaning new visitors receive twice the weight. The **dot product（内積）** multiplies matching components and adds them:

**A: 100×2 + 20×1 = 220. B: 20×2 + 100×1 = 140.**

The calculation is transparent. But the weights are assumptions, not discovered facts. 220という点数は利益や顧客価値を証明しない。We would still need customer retention, costs, and economic evidence. [内積の解説](https://www.3blue1brown.com/lessons/dot-products/)

## 離｜The most important choice may happen before the calculation

Why did we choose “new” and “returning” as the two components? もし売上や満足度を選べば、同じ施策が別の数字の並びになる。

In mathematics, a **basis（基底）** is a set of independent vectors that can generate the space under consideration. The familiar directions (1, 0) and (0, 1) form one basis for the plane. 別の適切な二方向を選んでも、同じ移動を記述できるが、成分は変わりうる。[基底の解説](https://www.3blue1brown.com/lessons/span/)

Choosing business indicators is not literally the same as changing a mathematical basis. Adding a metric may change the information being measured, not merely its coordinates. それでも共通の問いが残る。**What did we choose to preserve, and what did we leave out?**

## 結論｜A good model answers a question by leaving something out

Back to the station corridor. One hundred people move right; one hundred move left. Their signed motions cancel. **The zero is correct for the net direction. It is incomplete as a description of the corridor.**

数字が間違っているのではない。The model answered a narrower question than the one we care about. だからベクトルを理解するとは、足し算を覚えるだけではなく、「計算で何を保持し、何を失うか」を自分で確認できるようになることだ。

Try one final example. Move 6 meters east, 8 north, then 6 west. **You traveled 20 meters, but your displacement vector is (0, 8), with magnitude 8 meters.** 結果だけを見ると東西の寄り道は消える。次に駅で人の流れを見たら、人数の次に、方向・速度・密度を想像してみよう。

---

### Source notes / 出典と限界

この文章の「200人」と施策A・Bは説明用の架空例。The pedestrian studies are cited for their reported experimental findings, not as direct evidence about any specific stadium.

- [3Blue1Brown: Vectors](https://www.3blue1brown.com/lessons/vectors/)
- [3Blue1Brown: Basis vectors](https://www.3blue1brown.com/lessons/span/)
- [3Blue1Brown: Dot products](https://www.3blue1brown.com/lessons/dot-products/)
- [Feliciani & Nishinari (2016), Physical Review E](https://doi.org/10.1103/PhysRevE.94.032304)
- [Chen et al. (2026), accepted study on angled corridors](https://doi.org/10.1103/xh94-mfct)

**Next research question / 次の調査：** Which additional measurements allow us to distinguish a busy two-way corridor from a stationary crowd when their net velocity is the same?