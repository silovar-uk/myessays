---
id: memory-computation-feedback-state
title: "スイッチを切ったのに、覚えている。記憶と計算の意外な関係"
subtitle: "English Mix｜One bit, feedback, and the limits of『同じ』"
created: "2026-09-06"
updated: "2026-09-06"
type: "English Mix"
status: "完成"
mode: "english-mix"
english_ratio: 0.45
mix_unit: "sentence"
abstract: "The input returns to zero, but the output stays on.二つのNORゲートがつくる1ビットの記憶を、操作できる実験と図で追う。From circuits to AI and the brain,『同じ部品でつくれる』と『同じ働きである』の距離を考える。"
---

Turn the switch on. The light comes on. Then turn the switch off.

ランプは、ついたまま。

Is it broken?そう思う。ところが、この戻らなさこそが記憶だという。No special memory box was added.計算に使う小さな部品を二つ、互いに結んだだけだ。

[ゆるコンピュータ科学ラジオの「『記憶と計算は同じもの』ってマジ？？？」](https://www.youtube.com/watch?v=vmL9P0Tt_ZE)を題材に、その仕組みを追ってみる。文字起こしを読んでいて、私は「同じもの」という結論より、途中のランプに引っかかった。**The input is the same, but the result depends on what happened before.**そこに、急に時間が入り込む。

But we should pause before moving from circuits to AI and the human brain.共通点があることと、全部が同じ仕組みであることは、別の主張だからだ。この記事では、動画の説明を組み直し、一次資料で補足しながら、その距離も含めて楽しみたい。

## 1. 記憶とは、過去の違いを今も見分けられること｜A trace of the past

Let’s start with a small kind of memory.子どもの頃の夏休みを思い出すような話は、まだしない。

二つのスイッチがあるとする。One writes a 1. The other writes a 0.操作を終えて両方を切った後も、最後にどちらを操作したかが出力から分かるなら、過去の情報が残っている。

Only two possible values: 0 or 1.それでも、立派な**1ビットの記憶**だ。

ここでいう「スイッチを切る」は、入力信号を0にすること。**The circuit still has power.**この違いは、後で効いてくる。

## 2. 計算する部品を、四つだけ知っておく｜Four simple rules

A logic gate takes binary inputs and produces an output by a fixed rule.電圧の高い・低いを、0と1という二つの値として扱う。

今回必要なルールは少ない。

- **OR**：少なくとも片方が1なら、1。At least one input is 1.
- **AND**：両方が1のときだけ、1。Both inputs must be 1.
- **NOT**：0を1に、1を0にする。It reverses the value.
- **NOR**：ORの結果をNOTで反転する。両方が0のときだけ、1。

Here are the results for inputs A and B.比較用にXORも入れた。

| A | B | OR | AND | NOR | XOR |
| --- | --- | --- | --- | --- | --- |
| 0 | 0 | 0 | 0 | 1 | 0 |
| 0 | 1 | 1 | 0 | 0 | 1 |
| 1 | 0 | 1 | 0 | 0 | 1 |
| 1 | 1 | 1 | 1 | 0 | 0 |

**OR alone cannot perform addition.**1＋1の結果は、二進数では10だからだ。1桁同士の足し算をする「半加算器」では、下の桁をXOR、繰り上がりをANDで求める。XOR gives 1 when exactly one input is 1.だから1＋1なら、繰り上がり1・下の桁0になる。

We combine gates to calculate.その同じ仲間のNORで、今度は記憶をつくる。[参考：Charles Petzold『CODE』第14章の操作できる加算回路](https://www.codehiddenlanguage.com/Chapter14/)

## 3. 出力を相手に返すと、状態が残る｜Feedback keeps a state

NORゲートを二つ置き、それぞれの出力を、もう片方の入力に戻す。This is **feedback**: an output becomes an input again.

![二つのNORゲートを交差接続したSRラッチ。上はRとQ̄からQを求め、下はSとQからQ̄を求める。Each output feeds the other gate.](assets/memory-computation/nor-latch.svg "図1｜Each output becomes an input.中央の線の交差は接続点ではない。")

S means Set. R means Reset.出力Qを「記憶している値」とする。図の上側はQ＝NOT（R OR Q̄）、下側はQ̄＝NOT（S OR Q）という関係になる。In normal stable states, Q̄ is the opposite of Q.

最初にリセットして、Q＝0、Q̄＝1にしておく。Set S to 1, and the lower NOR output, Q̄, becomes 0.すると上のNORにはR＝0とQ̄＝0が入り、Q＝1になる。

Now comes the interesting part. Sを0に戻しても、下のNORには上からQ＝1が入っている。だからQ̄は0のまま。The upper gate still receives two zeros, so Q stays at 1.

**The write signal has ended. The state remains.**変わった状態が、互いに支え合って残る。

### 触って確かめる：Does the output return too?

「SをON」→「両入力をOFF」の順に押してほしい。Then try R on, followed by both inputs off.両入力が0になった二つの場面で、Qを見比べる。

<div data-memory-lab="en-mix"><p>操作実験を読み込んでいます。If it does not appear, the table below shows the same changes.</p></div>

| 操作後 / After the action | S | R | 記憶Q |
| --- | --- | --- | --- |
| Reset first, then both inputs OFF | 0 | 0 | 0 |
| SをON | 1 | 0 | 1 |
| SをOFF | 0 | 0 | 1のまま / stays 1 |
| RをON | 0 | 1 | 0 |
| RをOFF | 0 | 0 | 0のまま / stays 0 |

Same inputs: S＝0 and R＝0. Two possible stable states.今の入力だけで結果が決まる回路と、**過去を引き継いだ内部状態にも左右される回路**。この違いが、組み合わせ回路と順序回路を考える入口になる。[参考：MIT「Sequential Logic」](https://ocw.mit.edu/courses/6-071j-introduction-to-electronics-signals-and-measurement-spring-2006/d0a578bc6340f91188b1e3ac487b62ab_sequential_logic.pdf)

The video calls this a flip-flop.用語を区別するなら、ここで動かした、クロックを持たない二つのNORの回路は、**SRラッチ**と呼ぶのが適切だ。Modern textbooks often distinguish latches from flip-flops that capture a value at a clock edge.クロックの変化の瞬間に取り込むか、という違いだ。[参考：UC Riverside「Latches and Flip-Flops」](https://www.cs.ucr.edu/~ehwang/courses/cs120b/flipflops.pdf)

<details>
<summary>SとRを同時に1にすると？ / Why avoid both ON?</summary>
<p>With NOR gates, both Q and Q̄ become 0 while S and R are 1.二つが互いに反転しているという通常の関係が崩れる。If both inputs return to 0 at the same time, tiny differences in gate timing can decide the final state.どちらになるかを論理上保証できず、落ち着くまでに不安定な電圧状態を経る可能性もある。単に「何でもぐるぐる回る」という説明では足りない。</p>
<p>This demo prevents both inputs from being ON together.通常の保持を理解するための実験で、実回路の伝搬遅延や不安定状態を再現するシミュレーターではない。</p>
</details>

The author’s own interactive page is also available.[Charles Petzold『CODE』第17章](https://www.codehiddenlanguage.com/Chapter17/)には、元動画で使われた、同じ交差接続の回路がある。

## 4. 1ビットを四つ並べれば、9を覚えられる｜Four bits can hold nine

「最後の操作を覚える」と「数字を保存する」の間には、もう一段だけ橋がある。

**1001 in binary is 9 in decimal.**各桁を左から8、4、2、1の重みとして読むと、1×8＋0×4＋0×2＋1×1＝9になる。

![Four bits: 1001.左から桁の重みは8、4、2、1。The active bits contribute 8 and 1, making 9.](assets/memory-computation/four-bits.svg "図2｜Four bits give 16 combinations: 0〜15を表せる。")

One latch holds one bit. Four can hold 1001.文字や画像も、符号化のルールを決めればビット列として扱える。「記憶」という大きな言葉が、二択を大量に組み合わせる話へ降りてきた。[参考：『CODE』第19章「An Assemblage of Memory」](https://www.codehiddenlanguage.com/Chapter19/)

ただし、この方式は**通電している間の記憶**だ。Turning off an input is not the same as turning off the power.実験で電源を切って入れ直すと「未確定」と表示するのは、前の値も、起動直後に必ず0になることも保証できないから。The initial zero was prepared by a reset.説明の出発点として用意した状態だった。

## 5. 計算を続けるには、「さっきの答え」が要る｜Carry the result forward

Calculate 1＋1 and get 2.次に、その2に1を足す。To repeat the process, the previous result must reach the next step.

「今の合計を保持する場所」と「足し算する回路」をつなぐと、処理を時間方向に繰り返せる。A register used for this running total is called an **accumulator（アキュムレーター）**。[参考：Johns Hopkins大学「Feedback and Flip-Flops」](https://www.cs.jhu.edu/~phi/csf/slides/lecture-flipflop.pdf)

ここで私が面白いと思うのは、記憶が計算の後片づけではなく、次の計算の条件になっていることだ。**Update the state, use it, then update it again.**

Still, memory-free does not always mean simple.段数と規模を用意すれば、途中に値を保持する素子を置かない組み合わせ回路でも、決まった複雑な計算はできる。Memory lets us keep intermediate results across time and reuse the same circuit.記憶が力を発揮するのは、そのような場面だ。

## 6. 速い記憶にも、待ち時間はある｜Fast does not mean instant

動画の「計算と同じ部品だから速い」という説明は、直感の入口になる。But using the same kind of parts does not guarantee the same speed.記憶が絶対にボトルネックにならない、とも言えない。

Signals take time to pass through a circuit.クロックに合わせて取り込むなら、入力を前後の一定時間、安定させる必要もある。MITの教材は、レジスターと論理回路の遅れ、セットアップ時間などが、動かせる速さを制約すると説明している。[参考：MIT「Sequential Circuit Timing」](https://ocw.mit.edu/courses/6-004-computation-structures-spring-2017/pages/c5/c5s1/)

Real computers use several kinds of memory.仕組みと役割を並べておく。

| 種類 / Type | 代表的な仕組み・役割 | Power off |
| --- | --- | --- |
| レジスター / Register | ラッチやフリップフロップなどで、処理中の値を保持。Implementations vary. | 通常は保持できない |
| SRAM | Cross-coupled inverters＋読み書き用トランジスターが代表的。Used for caches, for example. | 通常は保持できない |
| DRAM | Stores charge in tiny capacitors.周期的にリフレッシュし、主記憶に使う | 保持できない |
| フラッシュメモリ / Flash | Retains a state without power.SSDなどに使う | 保持できる |

出典：[MIT「Memory Hierarchy」](https://ocw.mit.edu/courses/6-004-computation-structures-spring-2017/pages/c14/c14s1/)、[Samsung Semiconductor「DRAM」](https://semiconductor.samsung.com/dram/)。

SRAM shares the idea of two states supporting each other through feedback.ただし、キャッシュ全体を、動画の二つのNORゲートと同じ回路だと思うと細部を取り違える。

Calling DRAM a “battery method” is an analogy.正確にはコンデンサーの電荷を使う。ゲームのセーブ待ちは、さらに別の層であるストレージへの書き込みなどが関わる話になる。Where we store data affects speed, capacity, and whether it survives a power cut.

## 7. AIは、計算のしかたに知識を織り込む｜Knowledge in the weights

回路の話を踏まえて動画のAIの話に戻ると、「計算の道具が知識を持つ」という驚きが分かりやすくなる。

A neural network uses parameters called **weights** to transform its input.学習は、その値を変える。After learning, calculations using these weights can produce answers that reflect the information learned.

2022年の研究「Locating and Editing Factual Associations in GPT」は、対象のGPTモデルで事実に関する応答に関与する計算を調べた。The researchers also showed how editing particular weights could change factual associations.[出典：研究者によるROMEプロジェクトページ](https://rome.baulab.info/)

知識が、計算とは別の引き出しにしか入らないわけではない。**What was learned can remain in the values that shape the calculation.**これは確かに、境界の見え方を変える。

But this is not an SR latch. AIの回答が正しいことを保証する話でもない。「答えられる」「正確に保存している」「確実に取り出せる」は、分けて確認する必要がある。

## 8. 脳の実験が示したこと、まだ示していないこと｜What the mice showed

動画で紹介されるマウスの実験に対応する代表的な一次研究として、Liuらの2012年の論文がある。The supplied transcript does not let us confirm that this was the exact paper used in the video.

研究では、恐怖条件づけの際に活動した海馬の神経細胞群を標識した。The researchers then reactivated those cells with light.別の状況でも、マウスに恐怖反応の指標となる**すくみ行動（freezing）**が誘発された。[出典：Liuら「Optogenetic stimulation of a hippocampal engram activates fear memory recall」](https://pubmed.ncbi.nlm.nih.gov/22441246/)

Activating that particular group of cells was enough to bring back memory-linked behavior.学習時に活動した細胞群が、記憶に結びついた行動を呼び出すのに十分だった、という強い証拠だ。

But the experiment did not directly reveal the mouse’s subjective experience.「脳は記憶していない」「記憶と計算は完全に同じ」「人間の記憶もSRラッチと同じ」と証明したわけでもない。

**The response returns when the cells are activated again. What lasting trace made that possible?**むしろ、次に考えたくなるのはそこだ。記憶を再生する活動が見えたことは、保存の仕組みが不要になったことを意味しない。

## 9. 「落ち着く」と「食べ続ける」は、同じ組み立て方？｜Words and intuition

動画の終盤には、言葉の面白い例も出てくる。落ち着く feels like one word.一方、「食べ続ける」は「食べる」に「続ける」をつないでいる感じがする。

言語学には、語彙的複合動詞と統語的複合動詞の区別がある。For example, compare these two sentences.「太郎が本を読み始め、次郎もそうし始めた」は言えるのに、「太郎が落ち着き、次郎もそうしついた」では同じように前半を受けられない。Researchers examine these differences in grammatical behavior.[参考：影山太郎「動詞＋動詞型複合動詞研究の現状」](https://www2.ninjal.ac.jp/past-projects/lexicon/%E5%BD%B1%E5%B1%B1%282012-09-24%29.pdf)

However, a grammar test does not directly measure how the brain stores or computes a word.文法的な区別を「脳内で丸暗記しているか、その場で計算しているか」の測定結果に置き換えることはできない。「慣れたら全部同じになる」と、このテストだけで決めることもできない。

動画には117を見て「素数ではなさそう」と感じる例もある。Indeed, 117＝9×13.しかし、その直感が答えの記憶なのか、速い計算なのか、見慣れたパターンへの反応なのかは、本人の感触だけでは分からない。

私には、ここがかえって面白い。**“I did not feel myself thinking” does not mean “no processing happened.”**自分の頭の中なのに、その内訳を簡単には説明できない。

## 10. 「同じ」を三段階に分けると、驚きが長持ちする｜Three meanings of “the same”

Separate the claims, and the ideas become easier to follow.ここまでの話は、次のように区切れる。

| 主張 / Claim | この記事で確かめた範囲 |
| --- | --- |
| Logic gates can form a memory circuit. | 回路の動作として説明・確認できる |
| Recall involves computation or neural activity. | AIの研究やマウス実験が、対象と条件を限って示している |
| Memory and computation are identical in every sense. | ここまでの根拠だけでは結論できない |

This does not make the discovery less exciting.「二つのゲートが過去を残す」という確かな驚きと、「脳もそうなのだろうか」という開いた問いを、どちらも雑に消費しないための区切りだ。

### もう一歩：Keep the answer, or keep the method?

ここからは、私なりの応用の考えだ。Think about a template at work.去年の完成原稿を残す方法もあれば、「誰に、何を、どの順番で伝えるか」という生成のルールを残す方法もある。

The finished text makes that answer easy to reuse.生成のルールは、条件が変わったときに答えをつくり直しやすい。If we also keep the assumptions behind today’s decision,次回は何を引き継ぎ、何を更新するかを考えやすくなる。

This is a practical analogy, not a proof about brains or circuits.ただ、「保存するもの」と「次の処理に渡すもの」を分けて考えるための、使えそうな問いだ。

保存ボタンを押す前に、一つだけ聞いてみる。**What should I pass to my future self: this answer, or the conditions that made it possible?**

### 読んだ後の小さな実験｜Predict, then try

上の実験に戻り、先に答えを予想してから操作してみる。

- If Q is 1, what happens when both inputs become 0?
- 入力を0にすることと、電源を切ることは何が違うか。
- What evidence is missing between “the same parts” and “the brain works the same way”?

一つ目に自分の言葉で答えられたら、小さな回路の中に過去が残る仕組みを、かなりつかめている。

元動画：[ゆるコンピュータ科学ラジオ「『記憶と計算は同じもの』ってマジ？？？」](https://www.youtube.com/watch?v=vmL9P0Tt_ZE)。This essay is an original reconstruction based on the supplied transcript, not a word-for-word transcript.調査・執筆日：2026年9月6日。各節のリンクは、説明や補足の根拠となる資料。
