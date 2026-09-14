---
id: inner-product-shadow-projection-least-squares
title: "平均値を取ると「残り」が直角になる――内積は影を測る装置だった"
subtitle: "The dot product is a shadow meter: from projection to least squares and cosine similarity"
mode: "english-mix"
english_ratio: 0.40
mix_unit: "sentence"
---

# 平均値を取ると「残り」が直角になる
## The dot product is a shadow meter.

前編では、ベクトルが図形から「住所」を剥がし、内積が長さと角度を残すところまで追った。

But one question remained: **what is the inner product actually doing?**

`a・b = a₁b₁ + a₂b₂`

掛けて足すだけの計算が、なぜangle、length、orthogonalityまで扱えるのか。

The answer appeared in a surprisingly ordinary place: the arithmetic mean.

2、3、7の平均は4。

Subtract 4 from each value and we get `(-2,-1,3)`.

これと`(1,1,1)`の内積を取ると、

`-2 - 1 + 3 = 0`

になる。

**The residual after taking the mean is orthogonal to the “all equal” direction.**

平均を取っただけなのに、直角が出てきた。

That is the entrance to projection and least squares.

[前編「三角形に6個も数字はいらない」](https://silovar-uk.github.io/myessays/#/essay/vector-coordinate-liberation-gram-matrix)

---

## 1. 平均値は、3次元空間への射影だった

Think of the data as one point: `x=(2,3,7)`.

3つとも同じ値である点は、`(t,t,t)`と書ける。

These points form a line in the direction `(1,1,1)`.

「3つの数字を1個の代表値に置き換える」とは、xをこの直線上の点で近似することになる。

The closest point is `(4,4,4)`.

つまり平均値。

And the residual `(-2,-1,3)` is perpendicular to the line.

平均は単なる割り算ではなく、

**an orthogonal projection onto the “all values are equal” line.**

だった。

---

## 2. Inner product asks: “How much of this direction do you contain?”

長さ1のベクトルuを考える。

For any vector x, the signed length of x’s shadow on u is `x・u`.

したがって射影ベクトルは、

`projᵤ(x) = (x・u)u`

になる。

If the direction vector a is not unit length,

`projₐ(x) = (x・a / a・a)a`.

ここで内積の意味がかなり具体的になる。

**It measures how strongly one vector points along another direction.**

同方向ならpositive、逆ならnegative、直角なら0。

Zero is not just a special answer. It means there is no component left in that direction.

MITの教材でも、dot productは回転で不変であり、座標軸を一方のベクトル方向へ回すことで`|v||w|cosθ`が現れると説明されている。

[MIT OpenCourseWare, “The Dot Product”](https://ocw.mit.edu/ans7870/18/18.013a/textbook/HTML/chapter03/section03.html)

---

## 3. Best approximation creates a right angle

ある点xを、直線や平面Sの中の点で近似したい。

Let p be the closest point in S.

すると残差`x-p`はSに直交する。

Why? Because if the residual still had a component inside S, we could move a little in that direction and get closer.

つまり最善点とは、

**the point where no allowed direction can improve the approximation anymore.**

その印が直交である。

MITの線形代数講義でも、unsolvable system `Ax=b`のbest approximationをbのcolumn spaceへのprojectionとして扱う。

[MIT OpenCourseWare, “Projections onto Subspaces”](https://ocw.mit.edu/courses/18-06sc-linear-algebra-fall-2011/pages/least-squares-determinants-and-eigenvalues/projections-onto-subspaces/)

---

## 4. Least squares is “make the leftover perpendicular”

`Ax=b`が完全には解けないとする。

Instead of demanding a perfect solution, least squares finds the closest reachable point `A x̂`.

残差を

`r=b-Ax̂`

とすると、rはAの列空間に直交する。

So every column of A has zero inner product with r:

`Aᵀr=0`.

したがって、

`AᵀA x̂ = Aᵀb`

となる。

This is the normal equation.

式だけ見るとAᵀが突然出てくる。

Geometrically, it says only one thing: **remove every residual component that the model is capable of explaining.**

[MIT OpenCourseWare, “Projection Matrices and Least Squares”](https://ocw.mit.edu/courses/18-06sc-linear-algebra-fall-2011/pages/least-squares-determinants-and-eigenvalues/projection-matrices-and-least-squares/)

---

## 5. The arithmetic mean is the smallest least-squares problem

2、3、7を全部1個の数cで近似する。

The prediction vector is `c(1,1,1)`.

最小二乗条件は、残差が`(1,1,1)`と直交すること。

`(2-c)+(3-c)+(7-c)=0`

Therefore `c=4`.

平均である。

**The arithmetic mean is a least-squares projection onto a one-dimensional subspace.**

小学校の平均と大学のlinear algebraが同じ構造を共有している。

歴史的にはLegendreが1805年にleast-squares methodを公表し、Gaussが1809年に天体軌道計算とともに記述した。Priority was historically disputed.

[NIST, “Linear Least Squares Regression”](https://www.itl.nist.gov/div898/handbook/pmd/section1/pmd141.htm)

[MacTutor, “Adrien-Marie Legendre”](https://mathshistory.st-andrews.ac.uk/Biographies/Legendre/)

---

## 6. Orthogonality can mean “we already extracted everything useful”

高校数学では「直角だから内積0」と覚える。

Projection gives the statement a different feeling.

モデルが拾える方向をすべて拾う。

Then the residual has no component left in those directions.

だから0になる。

**Orthogonal does not always mean unrelated. It can mean exhausted.**

「この方向から取り出せる情報はもうない」という状態である。

That is why zero can be the signature of an optimum.

---

## 7. The same geometry reaches text search

情報検索では、documents and queries can be represented as high-dimensional vectors.

各単語を次元にして、tf-idfなどの重みを並べる。

Then we can compare direction rather than raw length.

使われる代表例がcosine similarity。

`cos(q,d)=q・d/(|q||d|)`

Length-normalize first, then take the dot product.

Stanfordの『Introduction to Information Retrieval』では、文書長の違いによる影響を抑えるため、queryとdocumentのangleをcosineで比較するvector space modelが説明されている。

[Stanford, “Introduction to Information Retrieval”](https://nlp.stanford.edu/IR-book/pdf/irbookonlinereading.pdf)

Later, learned word vectors such as word2vec pushed this geometric way of representing linguistic relationships much further.

[Mikolov et al., 2013](https://arxiv.org/abs/1301.3781)

高校で直角判定に使った内積が、検索語と文書の向きを比べ始める。

Quite a career move.

---

## 8. But cosine similarity does not create meaning

ここは重要。

Cosine similarity only measures geometry after vectors have already been constructed.

何を次元にするか、どう重み付けするか、どう学習するかで、角度の意味は変わる。

A bad representation does not become meaningful just because cosine is elegant.

Stanfordの情報検索教材でも、bag-of-wordsはword orderを失うと指摘されている。

“Mary is quicker than John” and “John is quicker than Mary” can become identical under a simple bag-of-words representation.

抽象化で捨てた情報は、後段の内積が救ってくれるわけではない。

This is the same warning as in the previous essay: abstraction is powerful because it forgets, so we must know what was forgotten.

---

## 9. Inner product is not merely multiplication. It is a question.

最初、内積は妙な掛け算に見えた。

Now it looks more like a question asked to a vector:

**“How much of this direction do you contain?”**

大きければ強く含む。

Zero means nothing is left along that direction.

そしてleast squaresでは、使える全方向について答えが0になった地点をbest approximationとする。

Even the mean of 2, 3, and 7 follows this rule.

調べる前、4はただの割り算の結果だった。

Now 4 looks like the foot of a perpendicular dropped from `(2,3,7)` onto the world where all three values must be equal.

平均を見るたびに直角が見えるようになった。

A little inconvenient. But much more interesting.
