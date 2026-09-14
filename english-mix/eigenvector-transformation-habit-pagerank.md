---
id: eigenvector-transformation-habit-pagerank
title: "何度変形しても、最後に同じ方向だけ残る――固有ベクトルは世界の「癖」を探す"
subtitle: "Repeated transformation reveals hidden directions."
mode: "english-mix"
english_ratio: 0.40
mix_unit: "sentence"
---

# 何度変形しても、最後に同じ方向だけ残る
## Repeated transformation reveals hidden directions.

妙な数列がある。

Start with one vector: `(1,0)`.

毎回、同じ変換をかける。

```text
(x, y) → (2x + y, x + 2y)
```

Then this happens.

```text
(1,0)
(2,1)
(5,4)
(14,13)
(41,40)
...
```

数字は急激に大きくなるのに、xとyの差はずっと1である。

And the direction slowly moves toward the 45-degree line `y=x`.

最初は真横だったのに、何度も同じ変形を受けると、なぜか斜めへ吸い寄せられる。

That strange behavior is a good entrance to eigenvectors.

---

## 1. Eigenvectors are directions a transformation cannot mix

この変換は行列で書けば、

```text
A = [2 1]
    [1 2]
```

普通のベクトルにAをかけると、長さも向きも変わる。

But some directions are special.

`(1,1)`なら、

```text
A(1,1) = (3,3) = 3(1,1)
```

The direction stays the same. Only the scale changes.

`(1,-1)`なら、

```text
A(1,-1) = (1,-1)
```

つまり、

```text
Ax = λx
```

を満たす0でないxがeigenvector、λがeigenvalueである。

MIT describes the same idea very directly: an eigenvector keeps its direction under multiplication by the matrix.

[MIT OpenCourseWare — Eigenvalues and Eigenvectors](https://ocw.mit.edu/courses/18-06sc-linear-algebra-fall-2011/pages/least-squares-determinants-and-eigenvalues/eigenvalues-and-eigenvectors/)

---

## 2. `(1,0)` already contained two hidden directions

最初の`(1,0)`は、こう分けられる。

```text
(1,0) = 1/2(1,1) + 1/2(1,-1)
```

The first direction has eigenvalue 3.

後者の固有値は1。

So after n repetitions,

```text
Aⁿ(1,0)
= 1/2・3ⁿ(1,1) + 1/2・1ⁿ(1,-1)
```

となる。

Now the strange sequence makes sense.

45度方向へ引っ張られていたのではない。

The 45-degree component was already there. It was simply growing much faster.

だから反復するほど、`(1,1)`方向が見た目を支配する。

This is the key idea: eigenvectors are independent growth directions of a repeated linear transformation.

固有値は、その方向が1回ごとにどれだけ増減するかを表す。

[MIT OpenCourseWare — Matrix Methods: Eigenvalues and Eigenvectors](https://ocw.mit.edu/courses/18-065-matrix-methods-in-data-analysis-signal-processing-and-machine-learning-spring-2018/resources/lecture-4-eigenvalues-and-eigenvectors/)

---

## 3. Eigenvalues describe the strength of each habit

`λ=3`なら毎回3倍。

If `λ=1`, that component stays unchanged.

`0<λ<1`なら徐々に消える。

If `λ=0`, it disappears after one application.

負なら、向きを反転しながら大きさが変わる。

So eigenvalues tell us the long-term behavior of each invariant direction.

固有ベクトルが十分そろえば、それらを基底として行列を対角化できる。

In that coordinate system, a complicated matrix becomes a list of independent scalings.

```text
方向1 → λ₁倍
方向2 → λ₂倍
方向3 → λ₃倍
```

行列が自分の性格を白状する感じがある。

---

## 4. Repetition often reveals a dominant direction — but not always

Power Methodの直感は、「何度も行列をかけると、一番強い固有方向が残る」というものだ。

This is true under important conditions.

典型的には、絶対値が単独最大の固有値があり、初期ベクトルがその方向の成分を持つ必要がある。

Then weaker components shrink relative to the dominant one.

今回なら、最大固有値3に対してもう一方は1。

The relative strength of the weaker direction is multiplied by `1/3` each round.

だから、

```text
(2,1)
(5,4)
(14,13)
```

と進むほど45度方向に見えてくる。

But “always converges to one eigenvector” is too strong.

同じ絶対値の固有値が複数ある場合や、複素固有値が支配する場合など、単一方向へ収束しないケースもある。

[MIT OpenCourseWare — Eigenvalue Demonstrations](https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/pages/tools/)

---

## 5. PageRank looked for a direction that does not change

ここでWeb検索が出てくる。

PageRank.

Web上を仮想ユーザーがリンクに沿って移動すると考える。

Let p be the probability distribution over pages.

遷移を行列Pで表すと、

```text
p(next) = P p(now)
```

となる。

A stationary distribution satisfies

```text
Pp = p
```

つまり固有値1の固有ベクトルである。

Stanford's Markov chain notes describe stationary distributions in exactly this eigenvector form, depending on row/column convention.

初期PageRankは、長くランダムにWebを歩いたときの滞在確率をランキングへ利用した。

Naive random walks have problems such as dead ends and spider traps.

そのためPageRankにはteleportationが入る。

This helps produce a well-behaved stationary distribution and supports convergence of the iteration.

ただし、現在のGoogle検索順位を「PageRankだけで決めている」と理解するのは違う。

The historical point is narrower and more interesting: a foundational web-ranking idea reduced to finding a stable eigenvector.

[Brin & Page — The Anatomy of a Large-Scale Hypertextual Web Search Engine](https://infolab.stanford.edu/~backrub/google.html)

[Stanford — PageRank / Power Method](https://nlp.stanford.edu/pubs/adaptive.pdf)

---

## 6. PCA was already an eigenvector story

前回はPCAを「データに合うものさしを選ぶ方法」として見た。

Now the connection becomes explicit.

PCAの主成分方向は、共分散行列の固有ベクトルである。

The associated eigenvalues tell us how much variance lies along those directions.

つまり「良い軸」は人間が適当に選んでいたのではない。

We were asking the covariance structure itself which directions it treats independently.

前回はrepresentationの話に見えた。

This time it looks like a transformation-habit problem.

[Stanford — PCA and Eigenvectors](https://web.stanford.edu/class/nbio228-01/lectures/Week2_LinearAlgebra_KH.pdf)

---

## 7. Not every transformation has a real direction that survives

ここまで来ると、「どんな行列にも真の方向が隠れている」と思いたくなる。

That is too neat.

平面を90度回転する行列を考える。

Every nonzero real vector changes direction.

実数の範囲では、向きが保たれる固有ベクトルはない。

Complex eigenvectors appear if we enlarge the number system, but the simple real-arrow picture breaks.

また、独立な固有ベクトルが次元数ぶんそろわず、対角化できない行列もある。

So eigenvectors are not a universal magic simplifier.

それでも、線形変換の中で「混ざらない方向」を見つけるという仕事は強力である。

---

## 8. The eigenvector is the transformation's habit

最初、自分にとって固有ベクトルは、特性方程式を解いたあとに出てくる謎の答えだった。

Now it looks different.

変換を何度も繰り返す。

Then ask: what grows, what fades, what remains, and what flips?

その分類の軸が固有ベクトルである。

The matrix does not mix those directions. It only scales them.

最初の数列へ戻る。

```text
(1,0)
(2,1)
(5,4)
(14,13)
(41,40)
...
```

45度方向が最後に残ったのは偶然ではなかった。

That direction had eigenvalue 3. The competing direction had eigenvalue 1.

**世界の癖は、1回の変化ではなく、同じ変化を繰り返したときに見えてくる。**

Eigenvectors are one way mathematics makes that habit visible.
