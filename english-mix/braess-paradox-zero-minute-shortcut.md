---
id: braess-paradox-zero-minute-shortcut
title: "A Zero-Minute Shortcut Made Everyone 15 Minutes Slower――ブライスのパラドックスを本気で調べる"
subtitle: "More roads can mean more delay. 悪いのはroadなのか、それともselfish equilibriumなのか"
abstract: "4,000 drivers share a simple road network. Add one zero-minute shortcut, and every driver's travel time rises from 65 to 80 minutes. 1968年のDietrich Braessの論文、Wardrop equilibrium、Price of Anarchy、ソウルの道路撤去事例まで追い、さらにdemandを500〜10,000人まで動かして『いつ逆効果になるのか』を検証する。The lesson is not ‘roads are bad,’ but ‘look at the equilibrium after choices change.’"
---

# A Zero-Minute Shortcut Made Everyone 15 Minutes Slower
## More roads can mean more delay. 悪いのはroadなのか、それともselfish equilibriumなのか

Add one road.

しかも、その道路だけは**travel time = 0 minutes**とする。

That sounds like pure improvement.

ところが条件によっては、このroadを開通させた瞬間、全員の移動時間が**65分から80分へ増える**。

Fifteen minutes worse.

Add a zero-minute shortcut, lose fifteen minutes.

道路がarithmeticに反抗しているように見える。

This phenomenon has a name.

**Braess's paradox――ブライスのパラドックス。**

In 1968, German mathematician Dietrich Braess described this counter-intuitive possibility in traffic planning. Braess later stressed that it is not a logical paradox in the strict sense. The mathematical key is the difference between **equilibrium** and **optimum**.

では、何が悪いのか。

The road?

The drivers?

Or the rule created when everyone chooses rationally?

4,000人を道路に入れて、順番に追ってみる。

---

## 1. Without the shortcut, everyone takes 65 minutes

We start with 4,000 drivers travelling from Start to Goal.

途中にAとBという二つの地点がある。

Before construction, there are two routes.

```text
Upper route
Start → A → Goal

Lower route
Start → B → Goal
```

Set the travel times like this.

- Start→A: number of users on that link ÷ 100 minutes
- A→Goal: fixed 45 minutes
- Start→B: fixed 45 minutes
- B→Goal: number of users on that link ÷ 100 minutes

混雑するlinkと固定45分のlinkが、左右対称に置かれている。

When everyone keeps choosing the route that looks best for them, the traffic settles at 2,000 drivers on each route.

Upper route:

```text
2,000 ÷ 100 + 45
= 20 + 45
= 65 minutes
```

Lower route is also 65 minutes.

Nobody can improve their own travel time by switching alone.

この状態は交通理論で**Wardrop user equilibrium**と呼ばれる。Game theoryでいうNash equilibriumに近い。

So far, so peaceful.

Everyone: 65 minutes.

---

## 2. Now connect A to B with a zero-minute road

ここで工事する。

Add a new link from A to B with **zero travel time**.

A third route appears.

```text
Start → A → B → Goal
```

Start→A gets faster when fewer people use it.

B→Goalも同じ。

A→B costs nothing.

This route looks absurdly attractive.

One driver thinks:

“Start→A, take the free shortcut, then B→Goal. I can avoid both fixed 45-minute links.”

Correct.

Everyone else notices the same thing.

それも正しい。

All 4,000 drivers move to Start→A→B→Goal.

Now Start→A carries 4,000 drivers, and B→Goal also carries 4,000.

```text
4,000 ÷ 100 + 0 + 4,000 ÷ 100
= 40 + 0 + 40
= 80 minutes
```

**65 minutes became 80.**

0分のshortcutを追加したせいで、全員15分遅い。

Why not escape to one of the old routes?

A unilateral move to the upper route would cost roughly 40 + 45 = 85 minutes. The lower route gives 45 + 40 = 85 minutes.

So staying at 80 is individually rational.

全員が不満なのに、**nobody can fix it by changing route alone**。

That is the nasty little heart of the paradox.

---

## 3. Change demand, and the paradox appears only in a zone

ここで一段やりすぎる。

Instead of staring only at 4,000 drivers, let demand move from 500 to 10,000.

下のsliderで交通量を変えられる。

<div data-braess-lab="en-mix"><p>Loading the traffic simulator. 表示できない場合も本文だけで計算は追えます。</p></div>

The result matters because Braess's paradox is **not** “more roads always make traffic worse.”

このモデルでshortcutが逆効果になるのは、**3,000人を超え、9,000人を下回る範囲**だけである。

At 1,000 drivers:

- without shortcut: 50 minutes
- with shortcut: 20 minutes

It works beautifully.

3,000人では両方60分。

At 4,000:

- without shortcut: 65 minutes
- with shortcut equilibrium: 80 minutes

At 4,500, it becomes 67.5 versus 90.

その後はshortcutへ集中しすぎる利益がなくなり、9,000人では両方90分に戻る。

Above 9,000, the shortcut exists but is no longer used at equilibrium.

So the accurate statement is less catchy but more useful:

**Depending on congestion functions, demand, and route choice, adding an option can move the user equilibrium to a worse state.**

急に地味になった。

The boring sentence is the real one.

---

## 4. The shortcut itself is not actually bad

Now keep 4,000 drivers and keep the zero-minute link.

ただし今度は、everyone chooses selfishlyではなく、交通管理者が全体のaverage travel timeを最小にできるとする。

One optimal allocation is:

```text
upper route        1,750 drivers
middle shortcut      500 drivers
lower route        1,750 drivers
```

The congestible links each carry 2,250 drivers.

Upper and lower routes take 67.5 minutes.

The middle route takes 45 minutes.

Average travel time becomes **about 64.69 minutes**.

Shortcutなしの65分より、ほんの少し速い。

That changes the story.

The physical shortcut can improve the system.

But this allocation is not stable under selfish choice. A driver sitting on a 67.5-minute route sees a 45-minute middle route and wants to switch.

一人ずつ合理的に動くほど、そのmiddle routeへ人が集まり、最後は80分のequilibriumへ戻る。

So the problem is not simply “a bad road.”

**It is the equilibrium produced by individual optimisation.**

This is exactly why Braess separates equilibrium from optimum.

---

## 5. How can “everyone is rational” create an irrational system?

A driver chooses their own travel time.

でも、自分がcongestible linkへ入ると、その道路を使う他人の時間も少しずつ増やす。

That extra delay imposed on others is not shown as a personal cost.

Individual cost and social cost do not match.

Economics can describe that as an externality. Algorithmic game theory studies the same family of problems as **selfish routing**.

ここから**Price of Anarchy**という概念につながる。

Tim Roughgarden and Éva Tardos showed in 2002 that, for networks with linear latency functions, the total latency of selfish routing is at most 4/3 of the system optimum.

つまり「selfish choiceは必ずめちゃくちゃになる」ではない。

We can ask a sharper question: **how inefficient can equilibrium become?**

In our 4,000-driver example:

```text
80 ÷ 64.6875 ≈ 1.24
```

So this example's Price of Anarchy is about 1.24, below 4/3.

The paradox is strange, but it is not magic.

条件を置けば、測れる。

---

## 6. Does removing a real road make a city faster?

Knowing Braess's paradox creates a dangerous urge.

道路を閉じたくなる。

Don't jump that fast.

A commonly cited real-world case is Seoul's **Cheonggyecheon Restoration Project**.

ソウル市は2003年から2005年にかけて、清渓川を覆っていた道路・高架道路を撤去し、約5.84kmの河川空間を復元した。

Seoul's own transport material has presented the case as a prime example of Braess's paradox: road capacity was reduced, yet surrounding traffic did not collapse and flow improved.

This is highly suggestive.

ここで笑いを止める。

**Cheonggyecheon was not an experiment where researchers only deleted one road and changed nothing else.**

Bus reforms, public-transport policy, pedestrian improvements, traffic-management measures and behavioural changes happened around the project.

So “road removed → Braess theorem proved in Seoul” is too strong.

現実の人は、routeだけでなく、departure time、destination、transport mode、さらにはtrip itselfまで変える。

The classic four-node model does not reproduce all of that.

Its value is more modest and more durable:

**Do not assume that adding capacity automatically improves the equilibrium of a network.**

---

## 7. If every navigation app gets smarter, does the city get smarter too?

Now the old traffic paradox becomes a modern UX question.

全員がhigh-performance navigationを使い、リアルタイムで「自分にとって最速」を選べば、system全体も最適になるのか。

Braess's paradox says: not necessarily.

If every navigation system optimises the same private objective, they can send everyone toward the same attractive option until that option changes the network itself.

**Smarter individuals do not automatically create a smarter system.**

だからnetwork designerが見るべきなのはroad countだけではない。

- what information users receive
- how tolls or restrictions change choices
- whether public transport provides a different route
- when demand concentrates

The system includes its **rules of behaviour**.

道路の話が、かなりUI設計に近づいてきた。

Add an option.

Make it easy to discover.

Everyone chooses it.

Then its value changes because everyone chose it.

**An option does not keep the value it had before users arrived.**

---

## 8. Before researching this, “shortcut” meant “good”

At the start, the story looked simple.

0分のroadが一本増える。

Surely that helps.

At 1,000 drivers, it does.

At 4,000, it hurts everyone.

Above 9,000 in this model, it becomes irrelevant at equilibrium.

And at 4,000, if a coordinator could distribute traffic properly, the same link would improve the average from 65 to about 64.69 minutes.

だから調べた後は、「roads make congestion worse」というcatchy summaryにも少し警戒するようになった。

Braess's paradox is not an argument against roads.

It is a warning to look beyond the number of options.

**After you add an option, what equilibrium will people's choices create?**

A shortcut is not good or bad merely because it exists.

It changes the incentives.

The incentives change the choices.

The choices change the congestion.

And the congestion changes which choice is rational.

0分のroadを一本足しただけなのに、最後に見ていたのは道路ではなかった。

**It was the shape of a system created by individually reasonable decisions.**

That is what now looks strange every time I hear the word “shortcut.”

## References

- Dietrich Braess (1968), *Über ein Paradoxon aus der Verkehrsplanung*. CiNii Research: https://cir.nii.ac.jp/crid/1360855570878538496
- Dietrich Braess, Anna Nagurney, Tina Wakolbinger (2005), *On a Paradox of Traffic Planning*. Transportation Science: https://pubsonline.informs.org/doi/10.1287/trsc.1050.0127
- Dietrich Braess, “A Paradox on Traffic Networks”: https://homepage.rub.de/dietrich.braess/
- Tim Roughgarden & Éva Tardos (2002), *How Bad is Selfish Routing?*: https://www.cs.cornell.edu/timr/
- Oxford Academic, *Traffic Networks: Wardrop Equilibrium and Braess’ Paradox*: https://academic.oup.com/book/39456/chapter-abstract/339217606
- Seoul Metropolitan Government, Cheonggyecheon Restoration Project: https://english.seoul.go.kr/service/amusement/stream/1-cheonggyecheon/
- Seoul Institute, *Role of Governance in Urban Transformation of Seoul*: https://www.si.re.kr/sites/default/files/2017-BR-04.pdf
- Seoul Metropolitan Government transport webzine, “The Paradox of Sejong-daero”: https://english.seoul.go.kr/wp-content/uploads/2021/03/transport_webzine_03.pdf

### About the calculations

This article uses the common four-node teaching model of Braess's paradox: congestible links have latency `x/100` minutes, fixed links cost 45 minutes, and the added A→B link costs 0 minutes. The demand sweep from 500 to 10,000 and the system-optimal calculations are independent checks from that model. They do not model signals, incidents, multiple origins and destinations, time-varying demand, route learning, or mode switching in a real city.
