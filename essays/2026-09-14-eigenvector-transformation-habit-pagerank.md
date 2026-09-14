---
id: eigenvector-transformation-habit-pagerank
title: "何度変形しても、最後に同じ方向だけ残る――固有ベクトルは世界の「癖」を探す"
subtitle: "(1,0)→(2,1)→(5,4)→(14,13)…を追いかけたら、PageRankまで同じ景色だった"
created: "2026-09-14"
updated: "2026-09-14"
type: "Essay"
status: "完成"
tags: ["固有ベクトル", "固有値", "線形代数", "行列", "PageRank", "PCA", "数学"]
keywords: ["eigenvector", "eigenvalue", "linear algebra", "power method", "PageRank", "stationary distribution", "PCA", "matrix powers"]
favorite: 5
grow: 5
abstract: "ベクトルの続編として、固有ベクトルを『行列の公式』ではなく『変換そのものの癖』として調べた。(x,y)を(2x+y,x+2y)へ移す変換を(1,0)に何度もかけると、(2,1)、(5,4)、(14,13)、(41,40)…と増えながら45度方向へ寄っていく。なぜその方向だけが残るのかを固有値分解で確かめ、反復計算、Power Method、Markov連鎖、初期PageRank、PCAまで追う。一方で、すべての行列が一つの方向へ収束するわけではなく、回転行列のように実固有ベクトルを持たない例や、最大固有値の条件も整理した。最後に、固有ベクトルとは『行列の中に隠れた特別な矢印』ではなく、変換が何度繰り返されても自分自身として扱う方向なのだと捉え直す。"
---

# 何度変形しても、最後に同じ方向だけ残る
## 固有ベクトルは世界の「癖」を探す

妙な数列がある。

最初に、矢印を1本置く。

`(1, 0)`

これに、毎回同じ変換をかける。

```text
(x, y) → (2x + y, x + 2y)
```

すると、こうなる。

```text
(1, 0)
(2, 1)
(5, 4)
(14, 13)
(41, 40)
(122, 121)
...
```

数字はものすごい勢いで大きくなっている。

なのに、**xとyの差はずっと1である。**

しかも矢印を図に描くと、どんどん`y=x`、つまり45度の方向へ寄っていく。

最初は真横だった。

何度も同じ変形を受けるうちに、なぜか斜め45度へ吸い寄せられる。

何が起きているのか。

前回まで、ベクトルを使って「住所を捨てる」「影を測る」「良いものさしを選ぶ」と進んできた。

今回は、ものさしではなく、**変形する側を見る。**

行列を何度も作用させたとき、その変換にはどんな方向が残りやすいのか。

それを教えるのが固有ベクトルである。

[MIT OpenCourseWare, “Eigenvalues and Eigenvectors”](https://ocw.mit.edu/courses/18-06sc-linear-algebra-fall-2011/pages/least-squares-determinants-and-eigenvalues/eigenvalues-and-eigenvectors/)

---

## 1. 固有ベクトルは「向きを変えられない矢印」

さっきの変換は、行列で書けば

```text
A = [2 1]
    [1 2]
```

である。

普通のベクトルxにAをかけると、長さだけでなく向きまで変わる。

ところが、ごく一部の方向だけは違う。

たとえば、

```text
x = (1, 1)
```

にAをかけると、

```text
Ax = (3, 3) = 3(1, 1)
```

になる。

向きが変わらない。

3倍になっただけである。

もう1本、

```text
x = (1, -1)
```

なら、

```text
Ax = (1, -1)
```

である。

今度はそのまま。

このように、

```text
Ax = λx
```

を満たす0でないxを**固有ベクトル**、λを**固有値**と呼ぶ。

MITのGilbert Strangも、固有ベクトルを「Aをかけても元のベクトルと同じ方向を向くもの」と説明している。

定義だけなら1行で終わる。

でも、自分には「同じ方向」という言葉だけでは、なぜこれが線形代数の大物なのか分からなかった。

大事なのは、**1回変形したときではなく、何度も変形したとき**だった。

[MIT OpenCourseWare, Lecture 21: Eigenvalues and Eigenvectors](https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/resources/lecture-21-eigenvalues-and-eigenvectors/)

---

## 2. (1,0)の中には、最初から2本の「癖」が入っていた

最初のベクトル`(1,0)`を、さっきの2本で分解してみる。

```text
(1,0) = 1/2(1,1) + 1/2(1,-1)
```

ここが面白い。

`(1,1)`にはAをかけるたび3倍がかかる。

`(1,-1)`にはAをかけても1倍のままである。

だから1回かけると、

```text
A(1,0)
= 1/2・3(1,1) + 1/2・1(1,-1)
= (2,1)
```

2回なら、

```text
A²(1,0)
= 1/2・3²(1,1) + 1/2・1²(1,-1)
= (5,4)
```

n回なら、

```text
Aⁿ(1,0)
= 1/2・3ⁿ(1,1) + 1/2(1,-1)
```

となる。

急に全部分かった。

45度へ吸い寄せられていたのではない。

最初から`(1,0)`の中に、

- 45度方向の成分
- −45度方向の成分

が半分ずつ入っていた。

ただし前者だけが毎回3倍される。

後者はずっと同じ大きさである。

だから回数を重ねるほど、3ⁿのほうが圧倒的になり、見た目には45度方向しか残らなくなる。

**固有ベクトルは、変換を何度もかけたときに、それぞれ独立した倍率で育つ方向だった。**

そして固有値は、その方向が1回ごとにどれだけ増えるかを表している。

MITの行列論の講義でも、`Ax=λx`なら`A²x=λ²x`となり、行列の反復を固有値で追えることが強調されている。

[MIT OpenCourseWare, Matrix Methods: Eigenvalues and Eigenvectors](https://ocw.mit.edu/courses/18-065-matrix-methods-in-data-analysis-signal-processing-and-machine-learning-spring-2018/resources/lecture-4-eigenvalues-and-eigenvectors/)

---

## 3. 固有値は「その癖の強さ」

ここまで来ると、固有値の見え方も変わる。

`λ=3`なら、その方向は毎回3倍になる。

`λ=1`なら変わらない。

`0<λ<1`なら徐々に消える。

`λ=0`なら1回でつぶれる。

`λ<0`なら向きを反転しながら大きさが変わる。

つまり、ある線形変換を何度も繰り返したとき、どの方向が伸び、どの方向が消え、どの方向が残るのかを、固有値は教える。

これは「行列の計算を楽にする便利ワザ」より、かなり大きな話に見えてくる。

**変換の長期的な性格を調べている。**

前の記事では、「良い基底を選ぶと情報が少数の成分に集まる」と書いた。

固有ベクトルが十分そろう場合、その固有ベクトルを基底にすると、行列は対角行列として表せる。

すると複雑な変換が、各方向を別々の倍率で伸ばすだけになる。

```text
複雑な変換
↓ 固有ベクトルの座標で見る
方向1をλ₁倍
方向2をλ₂倍
方向3をλ₃倍
...
```

行列が急に、自分の性格を白状し始める。

[MIT OpenCourseWare, Lecture 22: Diagonalization and Powers of A](https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/resources/lecture-videos/)

---

## 4. 「何度もかけると一番強い方向だけ残る」は、条件付きで本当

ここで勢いよく、

> 行列を何度もかければ、最大固有値の固有ベクトルに必ず近づく。

と言いたくなる。

だいたいPower Methodの説明で出てくる話である。

でも「必ず」は危ない。

典型的には、

- 絶対値が単独で最大の固有値がある
- 初期ベクトルが、その固有ベクトル方向の成分を持つ
- 必要な固有ベクトル分解ができるなど、適切な条件がある

ときに、反復によって最大固有値に対応する方向が支配的になる。

さっきの例は、まさにそれだった。

最大固有値は3。

もう一方は1。

比は`1/3`なので、反復するたび弱い方向の相対的な存在感が1/3ずつになる。

MITの教材でも、`Aⁿv`が主要な固有値・固有ベクトルへ向かう現象が固有値デモとして扱われている。

ただし、同じ大きさの固有値が複数あったり、複素固有値が効いたりすると、単一方向へきれいに収束しないこともある。

数学は、気持ちいいキャッチコピーの直後に条件を書く。

そこがありがたい。

[MIT OpenCourseWare, Linear Algebra Tools: Eigenvalue Demonstrations](https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/pages/tools/)

---

## 5. Googleの初期PageRankも「何度回しても変わらない方向」を探していた

固有ベクトルの話を調べていると、急にWeb検索が出てくる。

PageRankである。

Webページをノード、リンクを移動先として、仮想的なユーザーがページ間を移動すると考える。

ある時点で「各ページにユーザーがいる確率」をベクトルpで表す。

リンクに従う移動を行列Pで表せば、次の時点は

```text
p(next) = P p(now)
```

と書ける。

これを何度も繰り返して、最終的に分布が変わらなくなったら、

```text
Pp = p
```

である。

固有値1の固有ベクトルが出てきた。

StanfordのMarkov連鎖の資料でも、定常分布は遷移行列の固有値1に対応する固有ベクトルとして表される。行ベクトルか列ベクトルかの流儀によって転置は変わるが、本質は同じである。

初期PageRankも、この「長くランダムに歩いたとき、どこに滞在しやすくなるか」という定常分布をランキングに利用する発想だった。

ただし、素朴にリンクだけをたどると、行き止まりや閉じたリンク集団に確率が吸われる問題がある。そのためPageRankでは、一定確率で別ページへ飛ぶteleportationを入れる。

StanfordのPageRank資料では、この仕組みによって定常分布を求める反復計算が安定する構造が説明されている。

ここで注意したい。

**現在のGoogle検索順位が「PageRankという固有ベクトルだけ」で決まっている、という話ではない。**

ここで扱っているのは、Google初期の重要なアイデアの一つとしてのPageRankである。

それでも、世界規模のWeb検索の原型に、

**「何度変換しても変わらないベクトルを探す」**

という線形代数が入っていたのは妙に面白い。

[Brin & Page, “The Anatomy of a Large-Scale Hypertextual Web Search Engine,” Stanford](https://infolab.stanford.edu/~backrub/google.html)

[Stanford, PageRank and the Power Method](https://nlp.stanford.edu/pubs/adaptive.pdf)

[Stanford EE/Stats 376A, Markov Chains and Stationary Distribution](https://tselab.stanford.edu/mirror/ee376a_winter1617/Lecture_4.pdf)

---

## 6. 前回のPCAにも、固有ベクトルは最初からいた

ここでシリーズがつながる。

前回、データの点群に「良いものさし」を選び直す方法としてPCAを見た。

点群が細長く伸びているなら、その伸びている方向を新しい軸にすると、情報が第1成分へ集中する。

では、その方向はどう求めるのか。

共分散行列の固有ベクトルである。

Stanfordの資料でも、PCAのprincipal componentsはデータの共分散行列の固有ベクトルとして整理されている。

なぜ固有ベクトルなのか。

共分散行列を一種の変換として見ると、固有ベクトルは、その変換を受けても方向が混ざらない軸だからである。

そして固有値が大きい方向ほど、そのデータでは分散が大きい。

前回、自分は「データに合ったものさしを探す」と考えていた。

今回見ると、もう一段違う。

**データ自身が強く伸びている方向を、そのデータの変換則から聞き出していた。**

良い基底を人間が一方的に発明しているのではない。

行列の側に聞いている。

「あなたが一番、あなたらしく振る舞う方向はどこですか」と。

[Stanford, Linear Algebra / PCA notes](https://web.stanford.edu/class/nbio228-01/lectures/Week2_LinearAlgebra_KH.pdf)

[Stanford, Principal Component Analysis and Eigendecomposition](https://web.stanford.edu/class/bios221/MultivariateLab.html)

---

## 7. ただし、世界にいつも「まっすぐ残る方向」があるわけではない

ここまで読むと、何にでも固有ベクトルがいて、全部の現象には「本当の軸」が隠れているような気がしてくる。

それも違う。

たとえば平面を90度回転する変換を考える。

どんな0でない実ベクトルも、90度回されれば別の方向を向く。

実数の範囲では、

```text
Ax = λx
```

を満たす0でないxは存在しない。

複素数まで広げれば固有値・固有ベクトルは現れるが、「実平面に向きが変わらない矢印がある」という素朴な図ではなくなる。

また、行列によっては独立な固有ベクトルが次元数ぶんそろわず、きれいに対角化できない。

「固有ベクトルを探せば何でも簡単になる」ではない。

固有ベクトルは世界の真実を自動的に教える神託ではなく、**特定の線形変換が持つ不変な方向を調べる道具**である。

この限定があるから、逆に強い。

---

## 8. 固有ベクトルは「行列の中に隠れた矢印」ではなかった

最初、自分にとって固有ベクトルは、

`det(A−λI)=0`

を解いたあとに出てくる、よく分からない特別なベクトルだった。

公式の向こう側にいる住人だった。

でも今回、見え方が変わった。

変換を1回だけ見ると、いろいろな方向がごちゃごちゃに動く。

何度も繰り返す。

すると、

- 伸び続ける方向
- 消えていく方向
- そのまま残る方向
- 反転する方向

が見えてくる。

固有ベクトルは、その分類の軸だった。

**変換が、その方向だけは「自分の仲間」として扱う。**

だから向きを混ぜない。

固有値は、その仲間を毎回どれだけ強めるかを決める。

最初の数列へ戻る。

```text
(1,0)
(2,1)
(5,4)
(14,13)
(41,40)
...
```

45度へ近づいたのは、数字の偶然ではなかった。

この変換が、45度方向を毎回3倍し、逆向きの成分を1倍にしかしていなかったからである。

**世界の「癖」は、1回見ただけでは分からない。**

同じことを何度もさせる。

そのとき、何が最後まで残るかを見る。

固有ベクトルは、そんな観察方法だった。

---

### Sources

- [MIT OpenCourseWare — Eigenvalues and Eigenvectors](https://ocw.mit.edu/courses/18-06sc-linear-algebra-fall-2011/pages/least-squares-determinants-and-eigenvalues/eigenvalues-and-eigenvectors/)
- [MIT OpenCourseWare — Matrix Methods: Eigenvalues and Eigenvectors](https://ocw.mit.edu/courses/18-065-matrix-methods-in-data-analysis-signal-processing-and-machine-learning-spring-2018/resources/lecture-4-eigenvalues-and-eigenvectors/)
- [MIT OpenCourseWare — Eigenvalue Demonstrations](https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/pages/tools/)
- [Stanford — The Anatomy of a Large-Scale Hypertextual Web Search Engine](https://infolab.stanford.edu/~backrub/google.html)
- [Stanford — PageRank / Power Method](https://nlp.stanford.edu/pubs/adaptive.pdf)
- [Stanford — Markov Chains and Stationary Distribution](https://tselab.stanford.edu/mirror/ee376a_winter1617/Lecture_4.pdf)
- [Stanford — PCA and Eigenvectors](https://web.stanford.edu/class/nbio228-01/lectures/Week2_LinearAlgebra_KH.pdf)
