---
id: vector-coordinate-liberation-gram-matrix
title: "三角形に6個も数字はいらない――ベクトルは図形から「住所」を剥がす"
subtitle: "Vectors do not destroy coordinates. They make coordinates temporary."
mode: "english-mix"
english_ratio: 0.40
mix_unit: "sentence"
---

# 三角形に6個も数字はいらない
## Vectors do not destroy coordinates. They make coordinates temporary.

ベクトルの授業を見ていたら、数学の説明としてかなり異様な言葉が何度も出てきた。

**解脱。**

Not spiritual liberation. Liberation from coordinates.

雷獣の動画では、ベクトルを最初から「向きと大きさを持つ量」と定義しない。

Instead, the lesson first praises coordinates, then asks a strange question: do we really need all that information?

三角形の3点を座標で書けば6個の数字がいる。

But if we care only about its shape, three continuous pieces of information are enough.

6個が3個になる。

That made the lesson look less like “learning vectors” and more like information compression.

**ベクトルは、図形から何を忘れるための道具なのか。**

I decided to follow that question all the way to the Gram matrix.

[雷獣『【大検証】「ベクトル」知らない文系に、灘トップの天才がガチ授業すれば理解させれる？』](https://www.youtube.com/watch?v=ncVc-0i3PPk)

---

## 1. Six numbers contain more than shape

平面上の三角形をA=(x₁,y₁)、B=(x₂,y₂)、C=(x₃,y₃)と書けば、6個の数が必要になる。

Now move the entire triangle 1,000 units to the right.

座標は全部変わる。

The shape does not.

回転させても、辺の長さや角度は変わらない。

So the six coordinates contain both shape and “address.”

自由度で見るともっと分かりやすい。

Three points in a plane have six continuous degrees of freedom.

平行移動で2自由度、回転で1自由度を使う。

Those three do not change the shape, so 6−3=3.

だから3辺、あるいは2辺とその間の角度など、3個の連続量で三角形の形を決められる。

This is not merely shorter notation.

**We are deleting freedoms that do not matter to the question.**

---

## 2. Coordinates were a revolution before they became a cage

座標から逃げる前に、座標の名誉を回復したい。

In 1637, René Descartes published *La Géométrie*, a major step in connecting geometry with algebra.

図形を式として扱えるようになる。

A curve can become an equation. A point can receive numerical coordinates.

現在の「デカルト座標」という名前はそこにつながっている。

The history is not perfectly clean, though. Fermat developed related analytic methods independently, and coordinate-like ideas existed much earlier.

それでも「図形を数と式へ移す」ことが巨大な発明だったのは間違いない。

The video does something funny: first it enters the coordinate world, then it tries to escape without losing its power.

[Stanford Encyclopedia of Philosophy, “Descartes’ Mathematics”](https://plato.stanford.edu/entries/descartes-mathematics/)

[Nature, “The Geometry of René Descartes”](https://www.nature.com/articles/118400a0)

---

## 3. A vector is already a machine for forgetting

点Aと点Bがある。

A point says where you are. A vector says how two positions differ.

`AB = B − A`

A=(1,2)、B=(5,5)なら、AB=(4,3)。

Now shift the entire world by (1000,500).

AもBも変わる。

But AB is still (4,3).

絶対位置が消えた。

The vector keeps relation and throws away address.

さらに、`AB + BC = AC`。

The detour through B disappears into one net displacement.

途中で何分かかったか、怖かったか、何を見たかは残らない。

That is why the roller-coaster joke in the video is mathematically accurate: if the starting and ending positions are the same, net displacement is zero.

ベクトルは経路の日記ではない。

**It is selective forgetting.**

---

## 4. The dot product puts geometry back in

動画は途中から「内積10割」と言い始める。

At first the formula looks almost stupidly simple.

`a・b = a₁b₁ + a₂b₂`

成分同士を掛けて足すだけ。

But the same quantity also satisfies:

`a・b = |a||b|cosθ`

急にangleが出てくる。

And `a・a = |a|²`, so a vector’s length comes from its inner product with itself.

さらに`a・b = 0`なら、0でない2本のベクトルは直交する。

One operation gives length, angle, and orthogonality.

成分の計算と図形が、同じ式の中でつながる。

That is the real power of the dot product.

[Encyclopedia of Mathematics, “Inner product”](https://encyclopediaofmath.org/wiki/Inner_product)

---

## 5. The three mysterious numbers are a Gram matrix

動画では、平行でない2本のベクトルa、bを選び、次の3つが分かれば平面内の長さと角度を全部求められると説明する。

- `a・a`
- `a・b`
- `b・b`

In university mathematics, those three values form a Gram matrix.

```text
G = [ a・a  a・b ]
    [ a・b  b・b ]
```

任意のベクトルを`x = sa + tb`、`y = ua + vb`と書く。

Then:

```text
x・y = [s t] G [u v]ᵀ
```

Gが分かればx・x、y・y、x・yが全部分かる。

So we get every length and every angle.

2×2の対称行列には独立な成分が3つしかない。

That is exactly the three numbers used in the video.

ここで「3つ決めれば全部決まる」が、説明の比喩ではなくなる。

It is literally the structure of the geometry.

[Washington University in St. Louis, “A Gentle Introduction to Tensors”, Gram Matrix](https://www.ese.wustl.edu/~nehorai/Porat_A_Gentle_Introduction_to_Tensors_2014.pdf)

---

## 6. Let’s break the dot product with a tilted coordinate system

本当に座標から解脱したのか、少し意地悪な実験をする。

Take two vectors in ordinary Cartesian coordinates:

`u = (3,2)`

`v = (1,4)`

普通の内積は、`3×1 + 2×4 = 11`。

Now choose a tilted basis:

`e₁ = (1,0)`

`e₂ = (1,1)`

同じuとvは、この基底では

`u = (1,2)ₑ`

`v = (-3,4)ₑ`

になる。

Now use the familiar formula carelessly:

`1×(-3) + 2×4 = 5`

**5。**

We lost 11.

数学が壊れたわけではない。

The basis is no longer orthonormal, so the geometry is no longer hidden inside the identity matrix.

この基底のGram行列は、

```text
G = [1 1]
    [1 2]
```

になる。

Then:

```text
[1 2] G [-3 4]ᵀ = 11
```

戻った。

This is the important correction.

「好きな軸を取ってよい」は正しい。

But if the axes are tilted, you must also remember how the axes relate to each other.

普通のXY座標では軸が長さ1で直交しているので、Gram行列は単位行列になる。

That is why the formula `a₁b₁+a₂b₂` looks so effortless.

The simple formula is not the whole truth. It is the reward for choosing a very convenient basis.

---

## 7. Coordinate-free does not mean coordinate-less

「座標から解脱」を、ここで少し言い換えたい。

It does not mean “never use coordinates again.”

計算では普通に座標を使う。

We choose a basis. We write components. We calculate.

ただし、どの座標を選んだかを数学の本体と勘違いしない。

The vector stays the same even when its components change.

この発想はcoordinate-freeという言葉に近い。

Not coordinate-less. Coordinate-independent.

さらに、vector spaceだけでは長さや角度は決まらない。

A vector space gives addition and scalar multiplication.

そこにinner productを追加して初めて、長さ、角度、直交を語れる。

This is why the lesson’s focus on the inner product is deeper than it first appears.

そして考え方は2次元を超える。

It extends to n-dimensional spaces and even to function spaces. Complete inner-product spaces become Hilbert spaces.

高校数学の矢印は、かなり遠くまで歩いていく。

[Encyclopedia of Mathematics, “Inner product”](https://encyclopediaofmath.org/wiki/Inner_product)

---

## 8. “Vectors are recycled geometry” is useful, but only half true

動画では、ベクトルを三角関数や座標、既存の図形知識の「焼き増し」のように説明する。

For a high-school learner, that framing is smart.

ベクトル問題の多くは、知っている幾何を別の言語で処理し直している。

You do not need to feel that a completely alien universe has started.

ただし数学全体では、ベクトルは単なる焼き増しではない。

William Rowan Hamilton introduced the mathematical terms “vector” and “scalar” in the 1840s.

Hermann Grassmann developed another powerful vectorial system.

その後、GibbsとHeavisideらが現代につながるvector analysisを形づくった。

In 1901, Edwin Bidwell Wilson published *Vector Analysis* based on Gibbs’s lectures, explicitly treating the scalar product through vector lengths and the cosine of their angle.

古い図形の計算を楽にするだけではない。

**Vectors became a portable language for relations that do not belong to one fixed coordinate system.**

[MacTutor, “Earliest Known Uses of Some of the Words of Mathematics”](https://mathshistory.st-andrews.ac.uk/Miller/mathword/v/)

[Mathematical Association of America, Michael J. Crowe『A History of Vector Analysis』紹介](https://old.maa.org/node/105858)

[J. Willard Gibbs / E. B. Wilson, “Vector Analysis”, 1901](https://books.google.com/books/about/Vector_Analysis.html?id=wUwNAAAAYAAJ)

---

## 9. The lesson starts with what we want to forget

この授業の構成を見直すと、定義の順番より「欲しい気持ち」の順番で進んでいる。

First: what is annoying?

座標は便利だが、形だけ考えるには情報が多い。

Second: what do we want to preserve?

長さと角度。

Third: what can carry them?

Vectors and the inner product.

Fourth: can the system survive without the original Cartesian axes?

2本の基底と3つの内積があれば、長さと角度を復元できる。

Finally, solve an actual exam problem and see whether the abstraction pays rent.

だからこの授業は、公式より先に、

**「何を忘れられたら嬉しいか」**

を教えている。

That is a powerful definition of abstraction.

抽象化は難しい言葉を増やすことではない。

It is deciding which differences do not matter.

APIでもデータモデルでも組織図でも、良いモデルは何かを忘れている。

A model that remembers everything is just reality itself.

---

## 10. A vector is not only an arrow. It is a technique for forgetting.

調べる前、ベクトルは「向きと大きさを持つ矢印」だった。

That is still correct, but now it feels incomplete.

ベクトルは図形から住所を剥がす。

It keeps relations that survive translation.

内積は、その関係へ長さと角度を戻す。

A Gram matrix keeps the same geometry even when the basis is tilted.

だから「座標から解脱する」とは、座標を捨てることではない。

**It means demoting coordinates from reality to representation.**

最初は「解脱て」と笑っていた。

After the research, the phrase feels surprisingly precise.

数学の抽象化は、何でも覚える能力ではない。

Maybe it is the discipline of deciding exactly what can be forgotten.

次にベクトルの矢印を見たとき、たぶんもう矢印だけには見えない。

Behind it, a shape is quietly removing its address and walking away with only its relationships.

---

## Sources

- [雷獣『【大検証】「ベクトル」知らない文系に、灘トップの天才がガチ授業すれば理解させれる？』](https://www.youtube.com/watch?v=ncVc-0i3PPk)
- [Stanford Encyclopedia of Philosophy, “Descartes’ Mathematics”](https://plato.stanford.edu/entries/descartes-mathematics/)
- [Nature, “The Geometry of René Descartes”](https://www.nature.com/articles/118400a0)
- [Encyclopedia of Mathematics, “Inner product”](https://encyclopediaofmath.org/wiki/Inner_product)
- [Washington University in St. Louis, “A Gentle Introduction to Tensors”](https://www.ese.wustl.edu/~nehorai/Porat_A_Gentle_Introduction_to_Tensors_2014.pdf)
- [MacTutor, “Earliest Known Uses of Some of the Words of Mathematics”](https://mathshistory.st-andrews.ac.uk/Miller/mathword/v/)
- [Mathematical Association of America, Michael J. Crowe『A History of Vector Analysis』紹介](https://old.maa.org/node/105858)
- [J. Willard Gibbs / E. B. Wilson, “Vector Analysis”, 1901](https://books.google.com/books/about/Vector_Analysis.html?id=wUwNAAAAYAAJ)
