---
id: calculation-as-modeling-tournament-expectation
title: "計算は、式を立てる前にほぼ決まる"
subtitle: "トーナメントの準優勝者から学ぶ、前提・小さい例・対称性・一般化・検算の技術"
mode: "english-mix"
english_ratio: 0.46
mix_unit: "sentence"
---

# 計算は、式を立てる前にほぼ決まる
## トーナメントの準優勝者から学ぶ、前提・小さい例・対称性・一般化・検算の技術

I want to become better at calculation.

そう思うと、つい「公式をもっと覚える」「暗算を速くする」「計算ミスを減らす」と考えがち。

Those skills matter, but they are not always the hardest part.

少し複雑な問題で本当に難しいのは、その前にある。

**What exactly should we calculate to answer the question?**

ここが決まらないと、電卓やPythonや公式集があっても進まない。

Once the structure is clear, the arithmetic can become surprisingly short.

2026年8月22日に公開されたQuizKnockと学ぼう「トーナメントの2位は本当に2位か？」は、その感覚を学ぶのにかなり良い題材。

The question is simple.

> Is the runner-up in a tournament really the second-strongest player?

1位と2位が1回戦で当たれば、2位はそこで消える。

So the runner-up is not always the true No. 2.

では、平均すると準優勝者は本当は何位くらいなのか。

This essay focuses not only on the answer, but on **how to build the path to the answer**.

---

## 1. いきなり計算しない。まず世界のルールを書く

Before writing equations, write the assumptions.

今回のモデルでは、次を仮定する。

- Every player has a fixed true rank: 1st, 2nd, 3rd, and so on.
- 強い人は弱い人に必ず勝つ。
- There are no upsets.
- トーナメントの組み合わせはランダム。
- We start with 8 players.
- あとで2のべき乗の人数へ一般化する。

This is not a perfect model of real sport.

現実には相性、体調、運がある。

But removing those factors lets us isolate one question: **what distortion comes from the tournament format itself?**

計算とは、現実を丸ごと持ち込むことではない。

It is also the act of turning reality into a model that keeps only what matters for the question.

前提を書かずに始めると、途中で「この確率は何についての確率なのか」が曖昧になる。

---

## 2. 「確実に起きること」を先に固定する

Take eight true ranks:

`1, 2, 3, 4, 5, 6, 7, 8`

強い方が必ず勝つので、1位は必ず優勝する。

That part is deterministic, not random.

では準優勝者は誰か。

The runner-up is the player who wins the half of the bracket opposite No. 1.

しかも番狂わせがないので、その山で一番強い人が必ず決勝まで来る。

So the runner-up is:

> **the strongest player among the four players placed in the opposite half**

順位は数字が小さいほど強い。

Mathematically, we need the **minimum rank in a random sample of four players**.

ここが最大の変換。

The original question was:

> トーナメントの準優勝者は何位くらいか。

Now it becomes:

> If we randomly choose four people from ranks 2 through 8, what is the expected minimum rank?

これで「計算できる問題」になった。

Calculation skill is often translation skill.

---

## 3. 難しそうなら、小さい例で全部数える

Do not jump to a general formula yet.

まず8人の場合を全部数える。

No. 1 is fixed on one side of the bracket.

残りの7人、2位から8位の中から、反対側に入る4人を選ぶ。

The total number of choices is:

`C(7,4) = 35`

準優勝者の真の順位を `X` とする。

### X = 2

If No. 2 is in the opposite half, nobody there is stronger.

2位を固定し、残り3人を3位から8位の6人から選ぶ。

`C(6,3) = 20`

Therefore:

`P(X=2) = 20/35 = 4/7`

### X = 3

For No. 3 to become runner-up, No. 2 must stay out of the opposite half and No. 3 must enter it.

3位を固定し、残り3人を4位から8位の5人から選ぶ。

`C(5,3) = 10`

So:

`P(X=3) = 10/35 = 2/7`

### X = 4

No. 2 and No. 3 must stay out, while No. 4 goes in.

残り3人を5位から8位の4人から選ぶ。

`C(4,3) = 4`

Thus:

`P(X=4) = 4/35`

### X = 5

No. 2, No. 3, and No. 4 all stay out, and No. 5 goes in.

残りは6位、7位、8位を全部選ぶしかない。

`C(3,3) = 1`

So:

`P(X=5) = 1/35`

6位以下は準優勝できない。

Why? Because the opposite half needs four players, and you cannot avoid all of ranks 2 through 5 while still filling four spots.

ここで確率を足して検算する。

`20/35 + 10/35 + 4/35 + 1/35 = 1`

Good.

**A probability distribution should sum to 1. That is a simple but powerful check.**

---

## 4. 期待値は「値 × 確率」を全部足す

Now the distribution is known, so expectation is easy.

期待値は、同じランダム実験を何度も繰り返したときの長期的な平均と考えればよい。

For a discrete random variable:

`E[X] = Σ(value × probability)`

今回なら、

`E[X]`

`= 2×20/35 + 3×10/35 + 4×4/35 + 5×1/35`

`= (40 + 30 + 16 + 5)/35`

`= 91/35`

`= 2.6`

So in an 8-player tournament, the expected true rank of the runner-up is **2.6**.

ただし、2.6位という人が実際に出てくるわけではない。

A single tournament gives rank 2, 3, 4, or 5.

2.6は大会を何度もランダムに組み直したときの平均。

Also, expected value is not the same as the most likely value.

8人の場合、最も起きやすいのは2位で確率4/7だが、平均は2.6位になる。

---

## 5. 同じ2.6を、別ルートから出す

Now try a more elegant route.

2位から8位までを強い順に並べる。

Mark the four players who go into the half opposite No. 1.

丸は4個。

Four marks create five gaps when we include the space before the first mark and after the last mark.

丸を付けなかった人は3人。

Those three unselected players occupy the five gaps.

ランダムに4人を選んでいるので、特定の隙間だけが特別になる理由はない。

By symmetry, the expected number of unselected players in each gap is:

`3 ÷ 5 = 0.6`

準優勝者は一番左、つまり最も強い丸の人。

Players stronger than that runner-up are:

- No. 1, always
- 一番左の隙間に平均0.6人

Then add 1 for the runner-up himself when converting “number of stronger players” into a rank:

`1 + 0.6 + 1 = 2.6`

同じ答え。

This is more than a clever trick.

場合の数と対称性という別ルートが同じ2.6を返すことで、理解と検算を同時にできる。

**Good calculation is not only producing an answer. It is having another way to challenge the answer.**

---

## 6. ここで初めて一般化する

Once the 8-player structure is clear, replace 8 with `M`.

トーナメントなので `M = 2^n` とする。

No. 1 always wins.

反対側には `M/2` 人入る。

After removing No. 1, there are `M-1` players left.

その中から `M/2` 人を反対側へ選ぶ。

So the number of marked players is:

`M/2`

隙間は1つ多いので、

`M/2 + 1`

個。

The number of unmarked players is:

`(M-1) - M/2 = M/2 - 1`

対称性から、一つの隙間に入る人数の期待値は、

`(M/2 - 1)/(M/2 + 1)`

The runner-up's true rank is therefore:

`E[X] = 2 + (M/2 - 1)/(M/2 + 1)`

整理すると、

`E[X] = 3 - 4/(M+2)`

This form makes the limit obvious.

- 8 players: `2.6`
- 16人：`25/9 ≒ 2.778`
- 32 players: `≈ 2.882`
- 1024人：`≈ 2.996`

As `M` gets large, `4/(M+2)` approaches zero.

だから、

`E[X] → 3`

となる。

In this idealized model, a runner-up in a huge random tournament is, on average, almost the true No. 3.

「本当の2位とは限らない」は正しい。

But the runner-up is still usually very strong.

---

## 7. これは順序統計量の問題でもある

There is a standard statistical name for what we just did.

1位を除くと、2位からM位までの `M-1` 人から、反対側の `M/2` 人を復元なしでランダムに選んでいる。

The runner-up is the minimum rank in that sample.

これは **order statistic――順序統計量** の一種。

Shift the ranks by one: rank 2 becomes 1, rank 3 becomes 2, and so on.

すると、

- population size: `N = M-1`
- sample size: `k = M/2`
- target: the minimum order statistic

となる。

For sampling without replacement from the integers 1 through `N`, the expected minimum of a sample of size `k` is:

`(N+1)/(k+1)`

今回の順位へ戻すために1を足すと、

`1 + M/(M/2+1)`

which simplifies to:

`3 - 4/(M+2)`

また同じ答え。

The lesson is not “memorize the order-statistic formula.”

むしろ、

1. Understand the question.
2. 小さい例を数える。
3. Find symmetry.
4. 一般化する。
5. Then learn the formal name and formula.

この順番なら、公式が「意味の分からない記号」ではなく、思考を圧縮したものになる。

---

## 8. 分布そのものも一般化できる

We can also write the full probability distribution.

参加人数を `M`、反対側の人数を `k=M/2` とする。

For the runner-up to have true rank `r`:

- rank `r` must be selected into the opposite half
- 2位からr-1位は反対側へ入ってはいけない
- choose the remaining `k-1` players from ranks below `r`

全体の選び方は、

`C(M-1, k)`

通り。

The number of favorable choices is:

`C(M-r, k-1)`

Therefore:

`P(X=r) = C(M-r, k-1) / C(M-1, k)`

8人なら、

- `r=2`: `20/35`
- `r=3`: `10/35`
- `r=4`: `4/35`
- `r=5`: `1/35`

So the general formula reproduces our small example exactly.

**A general formula should survive when you plug the small case back in.**

---

## 9. 平均だけでなく散らばりを見る

Expectation tells us the center, not the spread.

そこで分散を見る。

A useful identity is:

`Var(X) = E[X²] - (E[X])²`

8人の場合、すでに分布が分かっているので直接計算できる。

`E[X²]`

`= 2²×20/35 + 3²×10/35 + 4²×4/35 + 5²×1/35`

`= 259/35`

`= 7.4`

そして `E[X]=2.6` だから、

`Var(X) = 7.4 - 2.6² = 0.64`

The standard deviation is:

`SD(X) = √0.64 = 0.8`

つまり8人では、平均2.6位、散らばりの一つの目安が0.8順位分。

For the general case, using the finite-population order-statistic variance with `k=M/2` gives:

`Var(X) = k × M × (M-1-k) / ((k+1)² × (k+2))`

人数が大きくなると、この分散は2へ近づく。

So the standard deviation approaches:

`√2 ≒ 1.414`

参加人数が増えても、準優勝者の順位が無制限に散らばるわけではない。

The mean approaches 3 and the variance approaches 2.

ただし、標準偏差だけ見て「この範囲に何％入る」と勝手に言ってはいけない。

That requires more information about the distribution shape.

**Knowing what your calculation does not prove is part of calculating properly.**

---

## 10. 計算で起きやすい5つの事故

### 10-1. 数式へ急ぎすぎる

Starting with “this is an expectation problem” is not enough.

先に、

`runner-up = strongest player in opposite half = minimum of a random sample`

まで翻訳する。

### 10-2. 「真の2位」と「準優勝」を混同する

One is an ability ranking; the other is a tournament result.

同じ「2位」でも定義が違う。

### 10-3. 期待値を最頻値だと思う

The most likely value is rank 2, but the expectation is 2.6.

平均と「一番起こりやすい値」は別物。

### 10-4. 一般式から始め、具体例へ戻らない

A formula can look elegant and still be wrong.

8人を代入して2.6に戻るか確認する。

### 10-5. 答えが出たら終わる

Check whether probabilities sum to 1.

極端な場合と直感が合うか。

Try another derivation.

必要ならシミュレーションする。

Calculation ends after the answer survives checks, not when the calculator displays a number.

---

## 11. 「計算をちゃんとする」7ステップ

Here is a reusable workflow.

### Step 1. 前提を文章で固定する

What is random? What is fixed? What are we ignoring?

### Step 2. 知りたい量を一文で定義する

今回なら、

`X = 準優勝者の真の実力順位`

Do not calculate an undefined quantity.

### Step 3. 確定事項を先に外す

No. 1 always wins.

ランダムでない部分を先に処理すると、問題が小さくなる。

### Step 4. 小さい例で全部数える

Use 4 or 8 before 1024.

啓林館のトーナメント教材でも、少人数へ単純化し、規則を見つけてから広げる思考が重視されている。

Small cases are not a beginner's escape route.

**They are a serious tool for discovering structure.**

### Step 5. 対称性・保存量・補集合を探す

Ask whether several cases are structurally equivalent.

今回なら「5個の隙間が対称」が近道になった。

### Step 6. 一般化する

Generalize only after the mechanism is visible.

具体例で見つけた構造を、8からMへ移す。

### Step 7. 別ルートで検算する

- sum probabilities
- 小さい値を代入する
- derive it another way
- 極限を見る
- simulate if useful

This is how a plausible formula becomes a trustworthy answer.

---

## 12. 小さな練習

Reading alone will not build calculation skill.

紙かメモで、次を自力でやってみる。

### Practice 1: 16人トーナメント

Use only the gap argument.

確認用：

`2 + 7/9 = 25/9 ≒ 2.778`

### Practice 2: 8人で真の2位が準優勝する確率

No. 2 must land in one of the four opposite-half positions among the seven positions available after fixing No. 1.

答え：

`4/7`

### Practice 3: なぜ6位は準優勝できないか

Explain it in words, not equations.

反対側には4人必要で、2位から5位までを全員避けると4人を埋められないから。

### Practice 4: 番狂わせを許すと何が壊れるか

If stronger players do not always win, the runner-up is no longer simply the minimum rank in the opposite half.

つまり今回の式は前提依存。

**Equations are true inside models built from assumptions. They are not reality itself.**

---

## 13. 公式より、「何を数えているか」を説明できるようにする

The final formula is:

`E[X] = 3 - 4/(M+2)`

でも、一番持ち帰りたいのは公式ではない。

The real takeaway is the sequence of thought:

- No. 1 always wins.
- 準優勝者は反対側の山の最強者。
- That means the minimum rank in a random half-sample.
- 8人なら全部数えられる。
- Symmetry gives a second route.
- そこからM人へ一般化できる。
- Order-statistic theory confirms the result.
- 分散を見ると、散らばりまで理解できる。

If you can explain this chain in your own words, you can rebuild the formula even after forgetting it.

計算ができるとは、数字を速く処理することだけではない。

**It means translating a real question into a countable structure, checking each step, and then challenging the final answer.**

計算の強さは、答えの速さより、途中の透明性に宿る。

---

## 参考・出典

- QuizKnockと学ぼう「トーナメントの2位は本当に2位か？」（2026-08-22）  
  https://www.youtube.com/watch?v=mKftkdYj3IM
- Penn State STAT 414, Lesson 8: Mathematical Expectation  
  https://online.stat.psu.edu/stat414/Lesson08
- O’Neill, B. (2025), “The Distribution of Order Statistics Under Sampling Without Replacement,” Journal of Statistical Theory and Applications  
  https://link.springer.com/article/10.1007/s44199-025-00125-y
- 啓林館「身近な題材で数学的な考え方を育む ～トーナメントは不公平？～」  
  https://www.shinko-keirin.co.jp/keirinkan/sho/sansu/support/jissen_arch/202207/
