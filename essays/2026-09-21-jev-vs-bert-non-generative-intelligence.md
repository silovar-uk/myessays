---
id: jev-vs-bert-non-generative-intelligence
title: "AIは、また文章を書かなくなった。JevとBERTを並べると見える「生成しない知能」"
subtitle: "2018年のBERTと2026年のJevは、どこまで似ていて、どこから別物なのか"
created: "2026-09-21"
updated: "2026-09-21"
type: "Conceptual Paper"
status: "完成"
tags: ["AI", "Jev", "BERT", "TypeSafe AI", "NLP", "Transformer", "分類", "意思決定"]
keywords: ["Jev", "BERT", "encoder", "fine-tuning", "logits", "calibration", "typed output", "System One Models", "classification"]
grow: 5
abstract: "Jevは「文章を書かず、型付きの判断と確率を返すAI」として登場した。しかし生成しない言語AI自体は新しくない。2018年のBERTも、文章を左から生成するより、文脈を読み取って分類や質問応答へ使う設計で大きな成功を収めた。本稿では、BERTのbidirectional encoder、fine-tuning、classification headと、Jevのtyped questions、calibrated probabilities、parallel samplingを並べ、似ているのは「仕事の形」であって、内部アーキテクチャが同じと確認されたわけではないことを整理する。"
---

# AIは、また文章を書かなくなった。JevとBERTを並べると見える「生成しない知能」
## 2018年のBERTと2026年のJevは、どこまで似ていて、どこから別物なのか

<!-- level:4 role:claim -->
2026年9月にTypeSafe AIが公開したJevを見て、最初に「ずいぶん新しいAIだな」と思った。文章を書かず、コードも書かず、Choice・Score・Noulという型の決まった判断と確率を返す。ChatGPT以降の「AIは何かを生成するもの」という感覚から見ると、かなり逆向きに見える。

<!-- level:2 role:description -->
ただ、そこでBERTを思い出すと景色が変わる。2018年にGoogleの研究者らが発表したBERTも、主役は自由な文章生成ではなかった。文章を読み、文脈を表現に変え、その上に分類や質問応答の小さな仕組みを載せる。人類はチャット欄を手に入れたあと、8年かけて「文章を書かないAIも、やっぱり便利だな」に戻ってきたようにも見える。遠回りが大きい。

<!-- level:3 role:analysis -->
ではJevは「新しいBERT」なのか。調べるほど、その言い方は半分だけ正しいと分かった。似ているのは、**文章を読んで、有限の判断を返すという仕事の形**だ。一方でBERTは公開された言語表現モデルであり、JevはTypeSafeが「System One Model」と呼ぶ新しいモデル群の最初の製品で、独自アーキテクチャ、parallel sampler、RLCDという学習法を掲げている。公開情報から、Jevの内部構造をBERT系と断定することはできない。

<!-- level:5 role:implication -->
この二つを比べる価値は、系譜を無理に一本につなぐことではない。**「AIは文章を作る機械」という思い込みを外すこと**にある。BERTとJevを並べると、AIのもう一つの大きな仕事が見える。書くことではなく、読むこと。さらに言えば、読んだ結果を、次の処理が使える形へ変えることだ。

---

## 1. BERTの革新は「書く」より前に、「左右を同時に読む」ことだった

<!-- level:4 role:claim -->
BERTを理解するなら、最初に覚える専門用語は一つでいい。**Encoder（エンコーダー）**。ざっくり言えば、文章を受け取り、「この文章は何を意味しているか」を後段の処理が使いやすい内部表現へ変換する仕組みだ。

<!-- level:1 role:evidence -->
BERTはBidirectional Encoder Representations from Transformersの略で、2018年の論文では、入力文の左側だけでなく右側の文脈も使って各語の表現を学ぶことが中心に置かれた。訓練時には文中の一部を隠し、その語を周囲の文脈から当てるmasked language modelを使う。たとえば「私は銀行で口座を作った」と「私は川のbankに座った」では、同じbankでも周囲を見れば意味が変わる。BERTはこの「周囲をまとめて読む」力を大規模な事前学習で獲得した。

<!-- level:3 role:analysis -->
ここでGPT型との違いが見える。生成モデルは基本的に、これまでに出たトークンを手掛かりに次のトークンを一つずつ出していく。BERTはその逆側で、文章全体の文脈を読み、各部分が何を意味するかを表現へ変えることに強みを置いた。だからBERTの中心は「続きの一文を書く」ではなく、「いま目の前にある文をどう理解するか」だった。

<!-- level:5 role:implication -->
生成AIが広く使われるようになって、「言語モデル＝しゃべるもの」という印象が強くなった。しかしBERTを見ると、言語AIの価値は最初から会話だけではない。**言葉を、判断可能な情報へ変換すること自体が大きな仕事だった。**

[Google Research — BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding](https://research.google/pubs/bert-pre-training-of-deep-bidirectional-transformers-for-language-understanding/)

---

## 2. BERTは万能回答者ではなく、「最後に小さな判定器を載せる」ことで仕事を覚えた

<!-- level:4 role:claim -->
BERTの二つ目の重要語が**Fine-tuning（ファインチューニング）**だ。BERT本体が言語の一般的な読み方を学んだあと、特定の仕事向けに追加学習する。

<!-- level:2 role:description -->
たとえば映画レビューを「肯定／否定」に分けたいなら、BERTの上にclassification headと呼ばれる小さな出力層を付け、そのラベル付きデータで学習する。ニュースのカテゴリ分類なら別のラベル、質問応答なら別の出力形式を使う。元のBERT論文は、同じ事前学習済みモデルを土台に、少ない追加構造で複数のNLPタスクへ適応できることを大きな成果として示した。

<!-- level:1 role:evidence -->
現在のHugging Faceの実装でも、BertForSequenceClassificationはBERTの上に線形の分類・回帰ヘッドを載せ、各クラスに対する**Logits（ロジット）**を返す。ロジットは「最終確率に変換する前の生の点数」くらいに覚えれば十分だ。そこからSoftmaxなどを使ってクラスごとの確率に変換し、一番高いものを選べる。

<!-- level:5 role:implication -->
ここでJevとの最初の接点が出てくる。BERTもJevも、使い方によっては「文章を読ませ、候補の中から判断させる」機械になる。ただしBERTでは、**その仕事用の判定器を作り、学習させる工程が前にある**。この差が、似て見える二つを分ける最初の境界になる。

[Hugging Face — BERT / BertForSequenceClassification](https://huggingface.co/docs/transformers/model_doc/bert)

---

## 3. Jevは「分類器を作る」より、「判断の型をその場で定義する」側に寄っている

<!-- level:4 role:claim -->
Jevの使い方を見ると、BERT的な分類モデルと似た匂いは確かにある。しかし、開発者が触るインターフェースはかなり違う。

<!-- level:2 role:description -->
Jevでは、判断材料をstateとして渡し、同時に質問を定義する。NoulならYes/Noの確率、Choiceなら定義した候補への分布、Scoreなら尺度上の評価を返す。TypeSafeのworkflow evalsでは、複雑な仕事を一つの巨大プロンプトへ詰め込まず、細い判断へ分解し、その結果をコードで組み合わせる設計を推奨している。

<!-- level:3 role:analysis -->
BERTで「問い合わせを6カテゴリへ分ける」なら、典型的にはその6カテゴリに合わせた分類ヘッドを用意し、学習データでfine-tuningする。Jevの公開APIが狙っているのは、利用者がモデルを再学習するより、**stateと質問、候補、尺度をプログラム側から定義して、その場の判断を呼び出すこと**だ。少なくとも利用者から見れば、「分類モデルを一個育てる」より「判断関数を呼ぶ」に近い。

<!-- level:5 role:implication -->
だからJevは、BERTの単純な後継というより、**分類的な知能を、再利用可能なソフトウェア部品として包み直したもの**と見る方が理解しやすい。似ているのは答えが有限であること。違うのは、その有限な答えを仕事ごとにどう用意するかだ。

[TypeSafe AI — Workflow evals](https://evals.typesafe.ai/)

---

## 4. 一番大きな違いは「モデルの中身」より、「誰が仕事の型を持つか」にある

<!-- level:4 role:claim -->
BERTとJevを比べるとき、アーキテクチャ名ばかり追うと本質を外しやすい。実務では、**仕事の仕様をどこに持たせるか**の方が差として大きい。

<!-- level:2 role:description -->
BERTは、事前学習済みの言語表現を土台に、タスクごとのデータと出力ヘッドで専門化する。言い換えると「このモデルは何を分類するのか」が、学習済みの重みにかなり埋め込まれる。対してJevは、Choiceの候補、Scoreの尺度、Noulの命題を呼び出し側が定義し、結果を通常コードの分岐へ接続する。

<!-- level:3 role:analysis -->
たとえば「この問い合わせは緊急か」という判断を考える。BERT的な実装なら、「緊急／非緊急」のラベル付きデータを集め、その分類器を育てるのが自然だ。Jev的な実装では、「このstateから見て緊急対応が必要である確率は？」というNoulを置き、0.85以上なら即時通知、0.5〜0.85なら人間確認、と周囲のコードで運用を決める。モデルが業務ルール全部を持つのではなく、**意味判断だけをモデルへ外注し、運用ルールはコードへ残す。**

<!-- level:5 role:implication -->
ここまで来ると、Jevの新しさは「昔になかった分類能力」ではない。**意味を読む部分と、業務を動かす部分の境界を、APIとしてはっきり引いたこと**にある。AIの進歩をモデルサイズだけで見ると、この種の設計革新を見落とす。

---

## 5. Jevの「Calibration」は、確率を飾りではなく運用材料にしようとしている

<!-- level:4 role:claim -->
三つ目に覚えたい専門用語が**Calibration（キャリブレーション）**だ。これはJevをBERT系の普通の分類器と分けて考えるうえで、かなり重要になる。

<!-- level:2 role:description -->
直感的には、「80%自信がある」と出した判断を大量に集めたとき、本当にだいたい80%くらい正しい状態を目指す考え方だ。確率が当たっていれば、システム側は「95%以上なら自動処理」「60〜95%なら人間確認」「それ以下なら保留」のように、モデルの不確実さをルールへ変換できる。

<!-- level:1 role:evidence -->
TypeSafeはJevの学習法をReinforcement Learning for Calibrated Decisions（RLCD）と呼び、すべての出力にcalibrated probabilitiesとconfidenceを付けることを設計の中心に置いている。一方、一般のニューラル分類器では、出力確率がそのまま現実の正答率を意味するとは限らない。ニューラルネットの確率校正が独立した研究テーマになり、temperature scalingのような後処理も使われてきた。

<!-- level:3 role:analysis -->
BERTのclassification headが返すlogitsは、分類には使える。しかし「0.93だから93%の確率で正しい」と、その数字をそのまま運用へつなげるのは別問題だ。Jevはここを後付けの便利機能ではなく、**判断AIの製品要件そのもの**として前に出した。

<!-- level:5 role:implication -->
生成AIでは、確信度は人間が文章の雰囲気から推測しがちだった。Jevが狙っているのは、その曖昧な空気を、コードが扱える数値へ戻すことだ。**「何を答えたか」だけでなく「どれくらい信用してよいか」までを出力仕様に含める。** ここはBERTとの比較で最も現代的な差に見える。

[TypeSafe AI — Introducing System One Models & Jev](https://typesafe.ai/blog/introducing-system-one-models-and-jev)  
[Guo et al. — On Calibration of Modern Neural Networks](https://arxiv.org/abs/1706.04599)

---

## 6. Jevの速さの工夫は、GPTとの対比で見る方が分かりやすい

<!-- level:4 role:claim -->
Jevの速度やコストを理解するとき、比較相手としてBERTを置きすぎると話がずれる。TypeSafeが強く対比しているのは、主に**一文字列を順番に生成するLLM**だ。

<!-- level:1 role:evidence -->
TypeSafeの公開説明では、Jevは新しいmodel architectureに加え、複数の出力を一度に計算するparallel samplerを使うとしている。LLMが次のトークン、さらに次のトークンと逐次的に文字列を伸ばすのに対し、Jevは複数の判断確率を並列に返す。同社はSystem One型の自社workflow評価で193.6倍高速、444.6倍低コストという数字を掲げているが、同時に、それらは実運用で見込まれる改善幅の高い側だろうとも注記している。

<!-- level:3 role:analysis -->
ここで「JevはBERTより何倍速い」と結論づける材料はない。BERTはそもそも生成モデルではなく、モデルサイズや実装、GPU、入力長で速度が大きく変わる。公開情報には、JevとBERTを同条件で比較した直接ベンチマークも見当たらない。だから言えるのは、Jevが**生成を捨てることで、生成LLMとは別の計算経路を最適化している**というところまでだ。

<!-- level:5 role:implication -->
速度の本質は「新しいモデルだから速い」ではない。**必要のない仕事を最初からしない設計だから、速くできる。** これはBERTにも通じる。自由文がいらないなら、自由文を作る機械を毎回呼ぶ必要はない。

[TypeSafe AI — Introducing System One Models & Jev](https://typesafe.ai/blog/introducing-system-one-models-and-jev)

---

## 7. 「Zero hallucinations」は「間違えない」ではなく、「型の外へ飛び出さない」と読む

<!-- level:4 role:claim -->
Jevの公式ページには“Zero Hallucinations”というかなり強い言葉が出てくる。ここは、そのまま「Jevは誤答しない」と読むと危ない。

<!-- level:2 role:description -->
TypeSafeの説明で保証されているのは、あらかじめ決めた型から外れた文字列を勝手に生成しないことだ。Choiceなら定義した候補、NoulならYes/Noの確率、Scoreなら決めた尺度の中で返る。生成LLMのように、存在しないフィールドを足したり、JSONの途中に説明文を混ぜたりするタイプの失敗を構造的に避ける。

<!-- level:3 role:analysis -->
しかし、**型の中で間違えることはある。** 「billing / technical / media」の三択しか出せないモデルが、mediaをtechnicalと選べば、形式は完全に正しいが判断は間違っている。TypeSafe自身のworkflow evalsにも、Jevが参照回答と異なる例は載っている。型安全と正確性は別物だ。

<!-- level:5 role:implication -->
これはむしろJevの価値を弱める話ではない。失敗を「意味不明な文章が返る」から「有限の選択肢の中で誤判定する」へ狭められる。**AIを信じるのではなく、失敗の形を設計する。** 自動化では、その方がずっと扱いやすい。

[TypeSafe AI — Workflow evals](https://evals.typesafe.ai/)

---

## 8. ただし「JevはBERTの進化版」とは、いまの公開情報では言えない

<!-- level:4 role:claim -->
ここまで似た点を並べると、「つまりJevはBERTを2026年向けに強化したもの」と言いたくなる。だが、その一文は書かない方がいい。

<!-- level:1 role:evidence -->
BERTは論文でbidirectional Transformer encoder、masked language model、fine-tuning手順まで公開され、コードと事前学習済みモデルも公開された。対してTypeSafeはJevについて「new model architecture」「parallel sampler」「RLCD」と説明しているものの、2026年9月21日時点で、BERTと同程度に内部構造や訓練レシピを検証できる公開論文は確認できない。

<!-- level:3 role:analysis -->
だから、外から見た入出力が似ていることと、内部で同じ種類の計算をしていることは分けなければならない。飛行機と鳥はどちらも空を飛ぶが、設計図まで同じではない。JevとBERTも、現時点では「読む→限定された答えを返す」という**機能上の親戚**と呼ぶのが安全だ。

<!-- level:5 role:implication -->
新しいAIほど、分からない部分を既知の言葉で埋めたくなる。しかし比較で本当に役立つのは、似ている点だけでなく、**どこから先はまだ分からないかを残すこと**だ。Jevを理解するうえで、BERTは便利な補助線だが、答えそのものではない。

---

## 9. 覚える専門用語は5個でいい。5個あればJevとBERTの違いを説明できる

<!-- level:4 role:claim -->
ここまでの話を、自分の言葉で説明できる状態に圧縮する。専門用語は増やしすぎると、理解した気分だけが増える。必要なのは五つだけだ。

<!-- level:3 role:analysis -->
- **Encoder**：文章を読んで、後段で使える内部表現へ変える仕組み。BERTの中心。
- **Fine-tuning**：事前学習済みモデルを、特定の仕事向けデータで追加学習すること。
- **Logits**：分類器が出す、確率へ変換する前の生の点数。
- **Calibration**：モデルが出す確率と、実際の正しさの頻度を対応させる考え方。
- **Typed output**：答えの型を事前に決め、ソフトウェアがそのまま扱える形で返すこと。Jevの中心。

<!-- level:2 role:description -->
この五つで、BERTは「Encoderで文章を読み、Fine-tuningした判定器がLogitsを返す」、Jevは「stateを読み、質問ごとにCalibrationを意識したTyped outputを返す」と説明できる。もちろん実際の研究はもっと複雑だが、初見で全体像を失わないにはこのくらいがちょうどいい。

<!-- level:5 role:implication -->
専門用語を覚える目的は、難しい言葉を増やすことではない。**違いを短く、正確に切り分けるための取っ手を持つこと**だ。この五語があれば、「どっちも文章分類っぽい」で止まらず、どの層が似ていて、どの層が違うかまで話せる。

---

## 10. BERTからJevを見ると、「AIの進化」は生成能力だけでは測れない

<!-- level:4 role:claim -->
最初の疑問に戻る。JevはBERTに似ているのか。答えは、**使い方の形はかなり似ている。しかし、同じ技術だとは言えない**になる。

<!-- level:2 role:description -->
BERTは、文章を双方向に読んで豊かな表現へ変え、タスクごとのfine-tuningで分類や質問応答へ使う道を大きく広げた。Jevは、文章やprogram stateを読み、Choice・Score・Noulの型付き判断と確率を返し、その判断を通常コードの中へ埋め込むことを製品設計の中心に置いている。

<!-- level:3 role:analysis -->
この比較で面白いのは、AI史が「分類→生成」と一直線に進んだわけではないことだ。生成モデルが強くなったからこそ、逆に「この一回の処理に、本当に文章生成は必要か？」と問い直せるようになった。BERT時代の分類器は仕事ごとに育てる専門家だった。Jevが狙うのは、もっと汎用的に呼び出せる判断関数だ。方向は似ているが、ソフトウェアへの埋め込み方が変わっている。

<!-- level:5 role:implication -->
調べる前は、Jevを「生成AIの反対側に突然現れた新種」だと思っていた。今は少し違う。**Jevは、AIが昔から得意だった“読む・分ける・点を付ける”を、生成AI時代のソフトウェアへ持ち戻そうとする試み**に見える。AIの次の進歩は、もっと長い文章を書くことだけではない。必要な場所で、必要なだけ判断し、あとは黙ってコードへ返すことかもしれない。最新AIの未来像が、少しif文に似ているのは妙に面白い。

---

## Research Note

### 事実として確認したこと

- BERTは2018年に発表されたbidirectional Transformer encoderベースの言語表現モデルで、masked language modelを使って左右の文脈を統合し、fine-tuningによって複数のNLPタスクへ適応する。
- Hugging FaceのBertForSequenceClassificationは、BERTの上に分類・回帰ヘッドを載せ、クラスごとのlogitsを返す。
- TypeSafe AIは2026年9月15日にJevを公開し、System One Modelとして、typed decisions、calibrated probabilities、parallel sampling、RLCDを特徴として説明している。
- TypeSafeのworkflow evalsでは、Noul・Choice・Scoreという細い判断をコードで組み合わせる構成を使っている。
- TypeSafeが公表する193.6倍高速・444.6倍低コストという数字は同社のworkflow evals由来で、同社自身が実運用での改善幅としては高い側になりうると注記している。

### 解釈として置いたこと

- 「BERTとJevは機能上の親戚」という表現は、入出力と用途の類似を説明するための本稿の比喩であり、技術的な系譜や内部アーキテクチャの同一性を主張するものではない。
- 「BERT時代の分類器は仕事ごとに育てる専門家、Jevは判断関数」という整理は、利用者から見た開発体験の差を説明するための抽象化である。
- Jevの公開情報だけから、内部がBERT型encoderである、BERTの直接的な発展形である、と結論づけることはできない。

---

## Sources

- [TypeSafe AI — Introducing System One Models & Jev](https://typesafe.ai/blog/introducing-system-one-models-and-jev)
- [TypeSafe AI — Workflow evals](https://evals.typesafe.ai/)
- [Google Research — BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding](https://research.google/pubs/bert-pre-training-of-deep-bidirectional-transformers-for-language-understanding/)
- [BERT paper — arXiv:1810.04805](https://arxiv.org/abs/1810.04805)
- [Hugging Face — BERT documentation](https://huggingface.co/docs/transformers/model_doc/bert)
- [Guo et al. — On Calibration of Modern Neural Networks](https://arxiv.org/abs/1706.04599)
- [既存記事 — 最新AIが文章を書けない。Jevは「曖昧な判断」をコードに戻すAIだった](https://silovar-uk.github.io/myessays/#/essay/jev-ai-smart-if-system-one-model?lang=ja)
