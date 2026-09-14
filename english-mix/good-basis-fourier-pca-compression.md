---
id: good-basis-fourier-pca-compression
title: "座標から解脱したのに、また座標を選ぶ――「良い基底」は情報を消してくれる"
subtitle: "A good basis makes the same object easier to describe: from Fourier to PCA"
mode: "english-mix"
english_ratio: 0.40
mix_unit: "sentence"
---

# 座標から解脱したのに、また座標を選ぶ
## A good basis can make information disappear.

前編では、座標から「解脱」した。

Coordinates are useful, but they are not the object itself.

ところが線形代数を進むと、すぐにまた基底を選び始める。

Why leave coordinates only to build new coordinates again?

そこで`x=(3,3)`を考えた。

In the standard basis, its coordinates are `(3,3)`.

でも軸を45度回して、

`u=(1,1)/√2`, `v=(1,-1)/√2`

を使うと、

`x=3√2u+0v`.

座標は`(3√2,0)`になる。

**The vector did not change. The description became simpler.**

この瞬間、basis choiceがinformation compressionに見えてきた。

[前編「三角形に6個も数字はいらない」](https://silovar-uk.github.io/myessays/#/essay/vector-coordinate-liberation-gram-matrix)

[続編1「平均値を取ると『残り』が直角になる」](https://silovar-uk.github.io/myessays/#/essay/inner-product-shadow-projection-least-squares)

---

## 1. A vector is not its coordinates

高校数学では、`a=(2,3)`と書くのでvectorとcoordinatesが同じものに見えやすい。

Linear algebra separates them.

ベクトルは対象そのもの。

Coordinates are the numbers used to describe that object in a chosen basis.

平面上の独立な2本a,bを基底にすれば、任意のxは

`x=sa+tb`

と一意に書ける。

Then `(s,t)` is the coordinate pair of x in that basis.

MITのGilbert Strangはbasisを、空間全体を生成できる最小限の独立なベクトル集合として説明する。

[MIT OpenCourseWare, “Independence, Basis and Dimension”](https://ocw.mit.edu/courses/18-06sc-linear-algebra-fall-2011/pages/ax-b-and-the-four-subspaces/independence-basis-and-dimension/)

Change the basis, and the vector stays. The numbers change.

ここが出発点。

---

## 2. Rotate the ruler, and one coordinate vanishes

`x=(3,3)`を標準基底で書けば`3e₁+3e₂`。

Two nonzero coefficients.

でも45度回したorthonormal basisでは、

`x・u=3√2`

`x・v=0`

となる。

One coefficient disappears completely.

2次元では小さな話。

In 1,000 dimensions, turning 999 coefficients into values near zero becomes a serious compression strategy.

つまり良い基底とは、

**a coordinate system that concentrates what matters into fewer coefficients.**

とも考えられる。

---

## 3. Why orthonormal bases feel almost unfairly convenient

基底は斜めでも成立する。

But orthonormal bases make coefficient extraction extremely clean.

`q₁,...,qₙ`が互いに直交し、長さ1なら、xの座標は

`x・q₁, ..., x・qₙ`

で取れる。

Just take inner products.

前編のGram matrixも、orthonormal basisならidentity matrixになる。

The cross-interference disappears.

MITでも、inner productからorthonormal basisを作る考えやGram-Schmidt processが線形代数の中心的道具として扱われている。

[MIT OpenCourseWare, “Lecture 7: Dot Products”](https://ocw.mit.edu/courses/res-18-008-calculus-revisited-complex-variables-differential-equations-and-linear-algebra-fall-2011/resources/lecture-7-dot-products/)

Orthogonality does not simplify the world itself. It simplifies the description.

---

## 4. Fourier: describe a signal by frequency instead of time

周期信号をtime domainで見ると、値がずっと上下する。

But a pure sinusoid is extremely simple in the right frequency basis.

時刻ごとの大量の値ではなく、

“this frequency, this amplitude”

のような少数の係数で説明できる。

Same signal. Different basis.

MITのSignals and SystemsではFourier seriesを明確に**orthogonal decomposition**として扱う。

[MIT OpenCourseWare, “Lecture 15: Fourier series”](https://ocw.mit.edu/courses/6-003-signals-and-systems-fall-2011/resources/mit6_003f11_lec15/)

関数空間まで広げると、sines, cosines, complex exponentialsがbasis functionsとして働く。

[MIT OpenCourseWare, “Orthonormal Bases and Fourier Series”](https://ocw.mit.edu/courses/18-102-introduction-to-functional-analysis-spring-2021/resources/18102-sp21-lecture-15/)

ただし、not every signal becomes sparse in a Fourier basis.

対象によっては多くの係数が必要で、不連続点ではGibbs phenomenonのような注意点もある。

A basis is good only relative to structure and purpose.

---

## 5. Fourier started with heat, not playlists

Joseph Fourierは1807年、solid heat propagationを扱う研究で三角級数を大きく押し出した。

The idea was controversial at the time.

LagrangeやLaplaceもFourierの関数展開に異論を持ったとされる。

Yet the same structural idea later became foundational in analysis, signals, images and communications.

「良い基底を選ぶ」とは、

**translate the same problem into a language where its structure becomes easier to see.**

ということでもある。

[MacTutor, “Joseph Fourier”](https://mathshistory.st-andrews.ac.uk/Biographies/Fourier/)

---

## 6. PCA lets the data choose the ruler

Fourier basis is prepared in advance.

では、データの重要方向が分からないときはどうするか。

PCA answers: let the data tell us.

Stanford CS229では、PCAを「projection後のvarianceを最大限残す方向」を選ぶ方法として導出する。

For a unit vector u, the projected coordinate of x is `xᵀu`.

そのvarianceを最大化すると、covariance matrixのprincipal eigenvectorが出る。

Then the next eigenvectors provide additional orthogonal directions.

それらが新しいbasisになる。

[Stanford CS229, “Principal Components Analysis”](https://cs229.stanford.edu/notes2020spring/cs229-notes10.pdf)

PCA is basically rotating the ruler toward where the data stretches most.

---

## 7. A tiny experiment: 99.8% of the motion fits one axis

4点だけ置く。

```text
(1, 1.1)
(2, 1.9)
(3, 3.1)
(4, 3.9)
```

They almost lie on `y=x`.

平均を引くと、

```text
(-1.5, -1.4)
(-0.5, -0.6)
( 0.5,  0.6)
( 1.5,  1.4)
```

になる。

Now rotate the basis by 45 degrees.

新しい座標は約、

```text
(-2.05, -0.07)
(-0.78,  0.07)
( 0.78, -0.07)
( 2.05,  0.07)
```

Second coordinate: almost zero.

分散は第1方向が約2.405、第2方向が約0.005。

About **99.8% of the total variance** sits on one direction.

厳密なPCA軸は45度から少し傾くが、本質は同じ。

A two-dimensional cloud is almost one-dimensional once we choose a better basis.

---

## 8. PCA began as a closest-line problem

PCAの歴史を追うと、projectionへ戻る。

Karl Pearson’s 1901 paper was literally titled “On lines and planes of closest fit to systems of points in space.”

[Karl Pearson, 1901](https://zenodo.org/records/1430636)

Harold Hotelling then developed the language of principal components in 1933.

[Hotelling, 1933](https://doi.org/10.1037/h0071325)

一番近い直線、一番近い平面、orthogonal projection、residual。

The same geometry from least squares returns, but now the subspace itself is being chosen.

つまりPCAは、

**choose not only the best point, but the best stage on which the data should live.**

という話でもある。

---

## 9. Maximum variance is not the same as maximum meaning

PCA is elegant enough to be dangerous.

分散の大きい方向を残すが、variance is not automatically importance.

尺度の違う変数をそのまま入れれば、数値スケールが大きい特徴が支配しやすい。

Stanford’s notes explicitly discuss centering and scaling features when their units or scales differ.

だから「データが勝手に良い基底を選ぶ」は言いすぎ。

Humans still decide what features enter, how they are scaled, and what information matters.

PCAは価値判断から解脱していない。

---

## 10. There is no universally best basis

周期構造ならFourierが強い。

For data-adaptive compression, PCA may be useful.

幾何計算ならorthonormal basisが便利。

Sometimes an oblique basis matches the problem better.

良い基底とは唯一の真実ではなく、

**a choice about what you want to make simple.**

同じ情報でも分類軸を変えると、見える構造が変わる。

Basis choice is partly an act of attention.

---

## 11. “Coordinate-free” never meant “never use coordinates again”

前編では、座標から解脱することを「座標を本体扱いしないこと」と整理した。

That still holds.

でも今はもう一段足したい。

**Freedom from coordinates means freedom to choose coordinates.**

標準基底に縛られなければ、(3,3)を(3√2,0)にできる。

A periodic signal can move into a Fourier basis.

データはPCA basisへ行ける。

Abstraction is not the permanent removal of concrete representation.

一度表現から離れたあと、目的に合う表現を選び直せるようになること。

That may be the real payoff.

最初は「解脱したのに、また座標を選ぶんか」と思った。

Now it feels like the opposite.

**We can choose because we escaped.**
