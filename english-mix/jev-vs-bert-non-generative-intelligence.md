---
id: jev-vs-bert-non-generative-intelligence
title: "AIは、また文章を書かなくなった。JevとBERTを並べると見える「生成しない知能」"
subtitle: "BERT in 2018, Jev in 2026｜似ているのはどこで、どこから別物なのか"
created: "2026-09-21"
updated: "2026-09-21"
type: "Conceptual Paper"
status: "完成"
tags: ["AI", "Jev", "BERT", "TypeSafe AI", "NLP", "Transformer", "Classification", "Decision Making"]
keywords: ["Jev", "BERT", "encoder", "fine-tuning", "logits", "calibration", "typed output", "System One Models", "classification"]
grow: 5
abstract: "Jev arrived as an AI that does not write prose but returns typed decisions and probabilities. でもnon-generative language AI自体は新しくない。2018年のBERTも、文章を左から生成するよりcontextを読み取り、classificationやquestion answeringへ使うことで大きな成功を収めた。本稿ではBERTのbidirectional encoder・fine-tuning・classification headと、Jevのtyped questions・calibrated probabilities・parallel samplingを並べる。The key distinction: they resemble each other in the shape of the job, but public evidence does not show that their internal architectures are the same."
---

# AIは、また文章を書かなくなった。JevとBERTを並べると見える「生成しない知能」
## BERT in 2018, Jev in 2026｜似ているのはどこで、どこから別物なのか

<!-- level:4 role:claim -->
2026年9月にTypeSafe AIが公開したJevを見て、my first reaction was “this feels like a very new kind of AI.” 文章を書かず、コードも書かず、Choice・Score・Noulというtyped decisionsと確率を返す。After ChatGPT, we got used to “AI generates something.” Jev seems to face the other way.

<!-- level:2 role:description -->
But BERT changes the view. 2018年にGoogleの研究者らが発表したBERTも、主役はfree-form generationではなかった。It reads text, turns context into representations, then supports small task-specific mechanisms for classification or question answering. 人類はチャット欄を手に入れたあと、8年かけて「文章を書かないAIも、やっぱり便利だな」に戻ってきたようにも見える。That is a fairly heroic detour.

<!-- level:3 role:analysis -->
So is Jev “a new BERT”? 調べるほど、その表現はhalf right at bestだと分かった。似ているのは、**read language and return a bounded judgmentという仕事の形**。BERT is a publicly specified language-representation model. Jev is the first product in what TypeSafe calls “System One Models,” and the company describes a new architecture, a parallel sampler, and RLCD training. 公開情報だけからJevの内部構造をBERT系と断定することはできない。

<!-- level:5 role:implication -->
The value of comparing them is not to force them into one family tree. It is to remove the assumption that **AI must be a machine that writes text**. BERTとJevを並べると、another major job of AI becomes visible: not writing, but reading—and turning what it read into a form the next process can use.

---

## 1. BERTの革新は「書く」より前に、「左右を同時に読む」ことだった

<!-- level:4 role:claim -->
BERTを理解するなら、first technical word to remember is **Encoder（エンコーダー）**. Roughly, it takes text and converts it into internal representations that later processing can use to answer “what does this text mean?”

<!-- level:1 role:evidence -->
BERT stands for Bidirectional Encoder Representations from Transformers. 2018年の論文では、各語を理解するときにleft contextだけでなくright contextも使うことが中心に置かれた。During training, masked language modeling hides some words and asks the model to infer them from surrounding context. 「銀行で口座を作った」のbankと「川のbankに座った」のbankは、周囲を読めば意味が違う。BERT learned this ability to read context together through large-scale pre-training.

<!-- level:3 role:analysis -->
Here the contrast with GPT-style generation becomes clearer. 生成モデルは基本的に、already generated tokensを手掛かりにnext tokenを順番に出していく。BERT instead emphasizes reading the available context and turning each part into a contextual representation. だから中心課題は「続きの一文を書く」より、**“what does the sentence already in front of me mean?”**だった。

<!-- level:5 role:implication -->
Generative AI made “language model = something that talks” feel natural. でもBERTを見ると、language AI was never only about conversation. **Turning language into information that can support a decision was already a major job.**

[Google Research — BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding](https://research.google/pubs/bert-pre-training-of-deep-bidirectional-transformers-for-language-understanding/)

---

## 2. BERTは万能回答者ではなく、「最後に小さな判定器を載せる」ことで仕事を覚えた

<!-- level:4 role:claim -->
BERTの二つ目の重要語が**Fine-tuning（ファインチューニング）**。After BERT learns a general way to read language, it can be trained further for a specific job.

<!-- level:2 role:description -->
たとえば映画レビューをpositive / negativeに分けたいなら、BERTの上にclassification headという小さなoutput layerを置き、labeled examplesで学習する。News classification uses another label set; question answering uses another output form. 元のBERT論文が示した大きな利点は、one pre-trained foundation could adapt to many NLP tasks with relatively small task-specific additionsという点だった。

<!-- level:1 role:evidence -->
Hugging Faceの現在の実装でも、BertForSequenceClassificationはBERTの上にlinear classification / regression headを載せ、各クラスへの**Logits（ロジット）**を返す。Think of logits as raw scores before probability conversion. Softmaxなどを使えばclass probabilitiesへ変換し、最も高い候補を選べる。

<!-- level:5 role:implication -->
This is the first real contact point with Jev. BERTもJevも、depending on how they are used, can look like machines that read text and choose among bounded outcomes. ただしBERTでは、**その仕事用の判定器を作り、学習させる工程が先にある**。That difference starts to separate two things that initially look similar.

[Hugging Face — BERT / BertForSequenceClassification](https://huggingface.co/docs/transformers/model_doc/bert)

---

## 3. Jevは「分類器を作る」より、「判断の型をその場で定義する」側に寄っている

<!-- level:4 role:claim -->
Jev does have the smell of a BERT-like classification system. でもdeveloper-facing interfaceを見ると、かなり違う。

<!-- level:2 role:description -->
Jev receives state—the material for a decision—and questions defined at call time. Noul returns a Yes/No probability, Choice a distribution over defined options, and Score a judgment on a defined scale. TypeSafeのworkflow evalsでは、one huge promptに全部を詰めず、complex workをnarrow judgmentsへ分け、その結果をcodeで組み合わせる形を示している。

<!-- level:3 role:analysis -->
With BERT, if you want six inquiry categories, a typical route is to build a six-class head and fine-tune it on labeled data. Jevの公開APIが狙うのは、利用者がtask-specific modelを再学習するより、**state・question・options・scaleをprogram sideで定義し、その場の判断を呼び出すこと**。From the user’s point of view, it feels less like “train a classifier” and more like “call a decision function.”

<!-- level:5 role:implication -->
So Jev is easier to understand not as a simple successor to BERT, but as **classification-like intelligence repackaged as a reusable software component**. 似ているのは、the answer space can be bounded. 違うのは、そのbounded answer spaceを仕事ごとにどう作るかだ。

[TypeSafe AI — Workflow evals](https://evals.typesafe.ai/)

---

## 4. 一番大きな違いは「モデルの中身」より、「誰が仕事の型を持つか」にある

<!-- level:4 role:claim -->
When comparing BERT and Jev, architecture names can become a distraction. 実務では、**where the specification of the job lives**の方が大きな差になる。

<!-- level:2 role:description -->
BERT starts from a pre-trained language representation and specializes through task data and an output head. 言い換えると、「what does this model classify?」のかなりの部分がtrained weightsへ埋め込まれる。Jev instead lets the caller define Choice options, Score scales, or a Noul proposition, then feeds the result into ordinary code.

<!-- level:3 role:analysis -->
Take “is this inquiry urgent?” BERT的な実装なら、urgent / not urgentのlabeled examplesを集め、classifierを育てるのが自然。A Jev-shaped implementation defines a Noul such as “does this state require urgent handling?”, then surrounding code may say over 0.85 = notify now, 0.5–0.85 = human review. モデルに業務ルール全部を預けず、**semantic judgmentだけをmodelへ外注し、policyはcodeへ残す。**

<!-- level:5 role:implication -->
At this point, Jev’s novelty is not “classification ability that never existed before.” It is **drawing a sharper API boundary between understanding meaning and operating the business workflow**. モデルサイズだけをAI progressの物差しにすると、こういう設計の進歩は見えにくい。

---

## 5. Jevの「Calibration」は、確率を飾りではなく運用材料にしようとしている

<!-- level:4 role:claim -->
三つ目に覚えたい専門用語が**Calibration（キャリブレーション）**。This matters a lot when separating Jev from an ordinary BERT-style classifier.

<!-- level:2 role:description -->
The intuition is simple: when a model says “80% confident” many times, you want roughly 80% of those cases to be correct. そうなればsystem sideで「95%以上は自動処理」「60〜95%はhuman review」「それ以下は保留」のように、uncertaintyをoperational rulesへ変えられる。

<!-- level:1 role:evidence -->
TypeSafe calls Jev’s training approach Reinforcement Learning for Calibrated Decisions（RLCD）and makes calibrated probabilities and confidence central to the product design. 一方、ordinary neural classifiersのoutput probabilityが、そのままreal-world correctness frequencyを意味するとは限らない。Calibration became its own research topic, with post-hoc techniques such as temperature scaling.

<!-- level:3 role:analysis -->
The logits from a BERT classification head are useful for classification. でも「0.93だから93%の確率で正しい」と、その数字をそのままworkflowへつなげるのは別問題。Jev puts this issue forward not as an optional afterthought, but as **a product requirement for decision AI**.

<!-- level:5 role:implication -->
With generative AI, humans often infer confidence from tone—which is a spectacularly unreliable little habit. Jevの狙いは、その曖昧な空気をcode-readable numbersへ戻すこと。**Not only “what was the answer?” but also “how much should the system trust it?” becomes part of the output contract.** ここがBERTとの比較で最も現代的な差に見える。

[TypeSafe AI — Introducing System One Models & Jev](https://typesafe.ai/blog/introducing-system-one-models-and-jev)  
[Guo et al. — On Calibration of Modern Neural Networks](https://arxiv.org/abs/1706.04599)

---

## 6. Jevの速さの工夫は、GPTとの対比で見る方が分かりやすい

<!-- level:4 role:claim -->
If you want to understand Jev’s speed and cost, BERT is not the best direct comparison target. TypeSafeが強く対比しているのは、主に**stringsをtoken by tokenで生成するLLM**だ。

<!-- level:1 role:evidence -->
TypeSafe says Jev combines a new model architecture with a parallel sampler that computes multiple outputs at once. LLMがnext token、さらにnext tokenとsequentially文字列を伸ばすのに対し、Jev returns multiple decision probabilities in parallel. 同社はSystem One型workflow評価で193.6× faster and 444.6× cheaperという数字を示す一方、それらはreal-world gainsの高い側だろうとも注記している。

<!-- level:3 role:analysis -->
There is no basis here for saying “Jev is X times faster than BERT.” BERT is already non-generative, and speed changes with model size, implementation, hardware, and input length. 公開情報では、JevとBERTをsame conditionsで直接比べたbenchmarkも確認できない。So the defensible claim is narrower: Jev is **optimizing a different computational path by giving up free-form generation**.

<!-- level:5 role:implication -->
The core speed trick is not simply “new model = fast.” It is **do not perform work the task does not need**. これはBERTにも通じる。If free text is unnecessary, calling a machine designed to produce free text every single time may be needless luxury.

[TypeSafe AI — Introducing System One Models & Jev](https://typesafe.ai/blog/introducing-system-one-models-and-jev)

---

## 7. 「Zero hallucinations」は「間違えない」ではなく、「型の外へ飛び出さない」と読む

<!-- level:4 role:claim -->
Jev’s official material uses the very strong phrase “Zero Hallucinations.” ここをそのまま「Jev never gives a wrong answer」と読むのは危ない。

<!-- level:2 role:description -->
What TypeSafe’s design guarantees is that the model does not freely generate strings outside the defined type. Choiceならdefined options、NoulならYes/No probability、Scoreならdefined scaleの中で返る。That structurally avoids failures like inventing fields or mixing commentary into what should have been a strict JSON object.

<!-- level:3 role:analysis -->
But **it can still be wrong inside the type**. 「billing / technical / media」の三択しか出せないmodelがmediaをtechnicalと選べば、format is perfect and judgment is wrong. TypeSafe’s own workflow evals contain cases where Jev differs from the reference answer. 型安全とaccuracyは別の問題だ。

<!-- level:5 role:implication -->
That does not weaken the interesting part of Jev. It narrows failure from “the model returned some weird text” to “the model chose the wrong option among a finite set.” **AIを信じるのではなく、failure shapeを設計する。** For automation, that can be much easier to handle.

[TypeSafe AI — Workflow evals](https://evals.typesafe.ai/)

---

## 8. ただし「JevはBERTの進化版」とは、いまの公開情報では言えない

<!-- level:4 role:claim -->
After listing the similarities, it is tempting to write, “So Jev is basically BERT upgraded for 2026.” でも、その一文は避けた方がいい。

<!-- level:1 role:evidence -->
BERT公開時は、bidirectional Transformer encoder、masked language model、fine-tuning procedureまでpaperで説明され、code and pre-trained modelsも公開された。TypeSafe describes Jev with phrases such as “new model architecture,” “parallel sampler,” and “RLCD,” but as of September 21, 2026, I could not confirm a public paper exposing internal architecture and training recipe at a BERT-like level of detail.

<!-- level:3 role:analysis -->
So similar inputs and outputs do not prove similar internal machinery. 飛行機と鳥はどちらもflyするが、design drawingsまで同じではない。For now, BERT and Jev are safest to treat as **functional relatives** in the sense that they can “read → return bounded answers,” not as confirmed architectural descendants.

<!-- level:5 role:implication -->
With a new AI product, the brain desperately wants to fill unknowns with familiar labels. でも比較で本当に役立つのは、similaritiesだけでなく、**keeping the unknown part unknown**. BERT is a useful guide rail for understanding Jev, not the final explanation of what Jev is.

---

## 9. 覚える専門用語は5個でいい。5個あればJevとBERTの違いを説明できる

<!-- level:4 role:claim -->
ここまでの話を、自分の言葉で説明できる形へcompressする。Too many technical terms create the pleasant illusion of understanding. 必要なのはfive termsだけ。

<!-- level:3 role:analysis -->
- **Encoder**：textを読み、later processingが使えるinternal representationへ変える仕組み。BERTの中心。
- **Fine-tuning**：pre-trained modelをspecific task dataで追加学習すること。
- **Logits**：classifierが出す、probability conversion前のraw scores。
- **Calibration**：model probabilityとactual correctness frequencyを対応させる考え方。
- **Typed output**：答えの型を先に決め、softwareがdirectly handleできる形で返すこと。Jevの中心。

<!-- level:2 role:description -->
With these five terms, you can say: BERT reads with an Encoder, then a Fine-tuned task head returns Logits; Jev reads state and returns Calibration-aware Typed outputs for each question. 実際の研究はもちろんもっと複雑。でも初見でwhole pictureを失わないには、このくらいがちょうどいい。

<!-- level:5 role:implication -->
The point of jargon is not to collect difficult words. **違いを短く、正確に切り分けるためのhandleを持つこと**。With these five, you can move past “both look like text classification” and explain which layer is actually similar and which is not.

---

## 10. BERTからJevを見ると、「AIの進化」は生成能力だけでは測れない

<!-- level:4 role:claim -->
Back to the original question: is Jev similar to BERT? 答えは、**the shape of usage is quite similar, but they cannot be called the same technology**.

<!-- level:2 role:description -->
BERT greatly expanded the pattern of reading text bidirectionally, forming rich representations, then adapting through task-specific fine-tuning for classification and question answering. Jevはtextやprogram stateを読み、Choice・Score・Noulのtyped judgmentsとprobabilitiesを返し、その判断をordinary codeへ埋め込むことをproduct designの中心に置く。

<!-- level:3 role:analysis -->
What makes the comparison interesting is that AI history did not simply move in a straight line from classification to generation. 生成モデルが強くなったからこそ、「does this one step really need text generation?」と問い直せる。BERT-era classifiers were specialists trained for particular jobs. Jev aims to feel more like a general-purpose callable decision function. 方向は似ていても、softwareへの埋め込み方が変わった。

<!-- level:5 role:implication -->
Before researching this, Jev looked like a strange new species suddenly appearing opposite generative AI. 今は少し違う。**It looks like an attempt to bring back AI’s old strengths—read, sort, score—inside software built in the generative-AI era.** AIの次の進歩は、より長い文章を書くことだけではない。Sometimes intelligence may mean making exactly the needed judgment, then quietly handing control back to code. 最新AIの未来像が、少しif文に似ている。That is weirdly satisfying.

---

## Research Note

### 事実として確認したこと

- BERT was published in 2018 as a language-representation model based on a bidirectional Transformer encoder, using masked language modeling and fine-tuning for multiple NLP tasks.
- Hugging FaceのBertForSequenceClassificationは、BERTの上にclassification / regression headを載せ、classごとのlogitsを返す。
- TypeSafe AI released Jev in September 2026 and describes it as a System One Model built around typed decisions, calibrated probabilities, parallel sampling, and RLCD.
- TypeSafeのworkflow evalsでは、Noul・Choice・Scoreというnarrow judgmentsをcodeで組み合わせる構成を使っている。
- TypeSafe’s 193.6× faster / 444.6× cheaper figures come from its own workflow evals, and the company notes that these are likely toward the high end of real-world improvements.

### 解釈として置いたこと

- “BERT and Jev are functional relatives” is a metaphor in this essay for similarity in inputs, outputs, and use cases; it is not a claim of architectural lineage.
- 「BERT時代のclassifierは仕事ごとに育てるspecialist、Jevはcallable decision function」という整理は、developer experienceの差を説明するためのabstraction。
- Public Jev information does not justify concluding that Jev internally uses a BERT-style encoder or is a direct technical descendant of BERT.

---

## Sources

- [TypeSafe AI — Introducing System One Models & Jev](https://typesafe.ai/blog/introducing-system-one-models-and-jev)
- [TypeSafe AI — Workflow evals](https://evals.typesafe.ai/)
- [Google Research — BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding](https://research.google/pubs/bert-pre-training-of-deep-bidirectional-transformers-for-language-understanding/)
- [BERT paper — arXiv:1810.04805](https://arxiv.org/abs/1810.04805)
- [Hugging Face — BERT documentation](https://huggingface.co/docs/transformers/model_doc/bert)
- [Guo et al. — On Calibration of Modern Neural Networks](https://arxiv.org/abs/1706.04599)
- [既存記事 — 最新AIが文章を書けない。Jevは「曖昧な判断」をコードに戻すAIだった](https://silovar-uk.github.io/myessays/#/essay/jev-ai-smart-if-system-one-model?lang=ja)
