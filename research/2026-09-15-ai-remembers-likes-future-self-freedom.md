# AI推薦 × Preference Formation × Future Self 制作ノート

Date: 2026-09-15
Target essay id: `ai-remembers-likes-future-self-freedom`

## 1. Research｜一次調査

### 出発点

直前の記事では、AIへの委任後も自律性を保つ条件を「目的・制約・例外・取消・改訂を本人が統治できること」と捉えた。

しかし、その統治主体である「本人」の好みや価値観は、最初から固定されているのか。AIが推薦、比較、選択、購入まで継続的に関与するとき、AIは既存の好みを読むだけでなく、その後の好みが形成される経験環境にもなるのではないか、という問いを立てた。

### 接続した理論・資料

1. Constructive Consumer Choice
   - Bettman, Luce & Payne (1998)。消費者は常にwell-defined preferencesを持つわけではなく、task/contextに応じたstrategiesを使いながらpreferenceをconstructする。
   - 本稿では「推薦精度＝既存選好の測定精度」という前提を崩す根拠として使用。
   - https://doi.org/10.1086/209535

2. Endogenous / Chosen Preferences
   - Bernheim, Braghieri, Martínez-Marquina & Zuckerman (2021)。人がworldviewを採用し、それがexperience evaluationを変えるdynamic theory of endogenous preference formation。
   - recommender systemの実証研究ではないため、「AIが好みを作ることの証明」としては使わず、preference固定前提を外す理論的補助線として使用。
   - https://doi.org/10.1257/aer.20190390

3. Recommender Feedback Loops
   - Chaney, Stewart & Engelhardt。推薦に影響されたinteraction dataを再学習するとalgorithmic confoundingが起こり、simulationではuser behaviorのhomogenizationが生じてもutilityが増えない場合を提示。
   - simulationであり、現実の人格・趣味が必ず均質化するという主張へ拡張しない。
   - https://arxiv.org/abs/1710.11214

4. Adaptive Personalization
   - 2025 systematic review。2020–2024の97 studiesを整理し、user preferencesがtime-varyingであること、adaptive recommendationの設計・評価上の課題を整理。
   - 「過去の好みを正確に記憶すれば十分」という前提への反証。
   - https://doi.org/10.1016/j.is.2025.102594

5. Future / Possible Selves
   - Oyserman & Horowitz (2023)。possible selves、self-gap、self-continuityの研究を統合し、future-self related actionをdynamic constructionとして整理。
   - 「未来の自分＝現在の自分の延長コピー」という前提を置かないための理論。
   - https://doi.org/10.1016/bs.adms.2022.11.003

6. Authenticity and Recommender Systems
   - Brown (2026) “Recommended Selves”。recommender systemsがauthenticityを支える面と損なう面の双方を哲学的に分析。volitional alignment / self-understandingを軸に議論。
   - 2026 preprint / philosophical argumentであり、empirical consensusとしては扱わない。
   - https://arxiv.org/abs/2608.14602

7. Exploration / Diversity
   - Zhou et al. (2026), N=100 movie recommendation user study。LLM multi-agent conditionでperceived novelty / Shannon diversity増加。personality、GenAI experience、skepticism等とのinteractionも報告。
   - 小規模・domain specificな研究のため一般化しない。
   - https://arxiv.org/abs/2604.24405
   - Bianchi (2025) “Exploration on Demand”。user-controlled explorationを提案。MovieLens + simulated-user based evaluationを含むため、実世界の人間一般への証拠としては限定的。
   - https://arxiv.org/abs/2507.21884

8. Self-Determination Theory / Internalization
   - SDTでは外部から伝達されたvalues/regulationsもinternalizeされうる。よりintegrated/autonomousなinternalizationには、本人がそれをfreely process、endorse、modifyできることが重要。
   - 「外部から影響された好み＝偽物」という二分法を捨てるために使用。
   - https://selfdeterminationtheory.org/the-theory/
   - https://selfdeterminationtheory.org/SDT/documents/2000_DeciRyan_PIWhatWhy.pdf

9. User-centered Recommender Research
   - 2026 IJHCS special issue preface。system-centric objectives/proxy metricsからuser agency、transparency、fairness、privacy、long-term welfareなどへ研究をre-centerする必要を論じる。
   - editorial agendaであり確立されたuniversal standardではない。
   - https://doi.org/10.1016/j.ijhcs.2026.103904

10. Agentic Commerce
   - Google AP2 v0.2 (2026)でHuman Not Present paymentを導入。pre-authorized instructionsに基づきagentがautonomous transactionを実行できる。
   - protocolの存在はmass adoptionを意味しない。
   - recommendation → transactionまでloopが閉じるときの将来的な設計論として接続。
   - https://blog.google/products-and-platforms/platforms/google-pay/agent-payments-protocol-fido-alliance/

## 2. Structure｜Uneven Uでの構造化

### 導入

4: AIが自分を正確に理解してくれる世界
→ 1: 音楽、買い物、ホテルが全部“いつもの”になる
→ 3: convenienceは高い
→ 4: しかしunknown preferenceはどこから来るのか
→ 5: present-self accuracyとfuture-self opennessは両立できるか

### 1. 「いつもの」は、いつまで私なのか

4: personalizationは記憶・適合
→ 1: coffee repeat purchase
→ 2: evolving preferencesを扱うadaptive recommender research
→ 4: systemは変化を追跡するだけか、それとも変化に参加するか
→ 5: personalization = memory + experience allocation

### 2. 好みは選択前に完成しているとは限らない

4: “my preference”は固定入力か
→ 1: hotel / sneaker comparison
→ 2: constructive choice
→ 3: endogenous preference formation
→ 5: accurate recommendation cannot be defined only as matching a static point

### 3. 推薦は鏡であり部屋でもある

4: recommender as mirror
→ 1: click → recommendation → click loop
→ 2: Chaney simulation
→ 3: prediction changes the environment producing the next data
→ 5: recommendation also defines the reachable choice world

### 4. 正確なpersonalizationほど、未来の私には外れるかもしれない

4: present accuracy vs future accuracy
→ 1: music / clothes / reading history
→ 2: future selves / identity
→ 3: Recommended Selves philosophical argument
→ 5: “not like me yet” can be filtered as noise

### 5. でも外せば自由になるわけでもない

5: simple critique of personalization
→ 1: annoying random restaurant recommendation
→ 2: novelty/diversity studies
→ 3: individual differences in exploration desire
→ 5: freedom = ability to control distance from prediction, not randomness

### 6. 外から影響された好みは偽物とは限らない

5: manipulation/authenticity dichotomy
→ 1: parents/friends/media/coach influence
→ 2: SDT internalization
→ 4: influence itself is not the decisive issue
→ 5: autonomy requires examine / reject / transform / integrate

### 7. まだ知られていない自分を残せるか

4: return to constitutional autonomy
→ 1: controls such as weaken history / novelty budget / context separation / delete inference
→ 3: user-centered recommender agenda
→ 2: AP2 closes recommendation-to-action loop
→ 5: freedom includes model revision and becoming beyond existing data

## 3. Re-research｜反証・修正

### 初期仮説

「高精度personalizationほど人間を過去の自己へ閉じ込める。」

### 反証1｜推薦は未知の発見も増やせる

2026年movie recommendation studyではmulti-agent designがnovelty/diversityを高めた。personalization / recommendationを一律に閉鎖的と描くのは不正確。

修正：問題はpersonalizationの有無ではなく、exploitation onlyになる設計と、explorationを本人が調整できないこと。

### 反証2｜多様性を増やせば自由になるわけでもない

explorationへの好みにはindividual differencesがある。randomness / noveltyを一方的に増やすとrelevanceを失う。

修正：固定の“理想的多様性率”ではなく、user-controlled distance from predictionを中心概念にする。

### 反証3｜外部影響＝非自律ではない

SDTではexternal valuesもinternalization / integrationを通じてautonomousになりうる。

修正：AI influenceが存在すること自体を問題にしない。影響後に本人がprocess / endorse / modifyできるかを問題にする。

### 反証4｜feedback-loop evidenceの範囲

Chaney et al.はsimulation。現実の人間のidentityが必ずhomogenizeするとは言えない。

修正：feedback loopを“mechanism possibility”として提示し、人格変容の確定事実にはしない。

### 反証5｜future selfに最適化すれば解決、でもない

「5年後に好きそうなもの」をAIが推定しても、それも別の予測モデルである。future selfを一つのtarget stateとして固定すると同じ問題を再生産する。

修正：未来の自分を予測することより、self-revision capacityを保持することへ抽象度を上げる。

### 最終中心命題

**AI時代の自律性は、現在の好みを正確に反映されることだけでは足りない。本人が予測との距離を調整し、未知の選択肢を試し、自分についての推定を拒否・修正し、まだデータになっていない自己へ移れる余地を残す必要がある。**

記事末の要約命題：

**Freedom is not only being known accurately. It is retaining the capacity to become someone your model does not yet know.**

## 4. Prompt｜再現用プロンプト

あなたは、AIやpersonalizationを「既存の好みをどれだけ正確に当てるか」だけで評価せず、「システムとの反復的な相互作用によって、利用者の好み・identity・future selfの可能性がどう変化するか」まで分析するリサーチャー兼エッセイ編集者です。

### Phase 1｜Research

対象システムを次の7層に分けて調べてください。

1. Observation：システムは何を“好み”の証拠として観測するか
2. Prediction：何を予測・推薦するか
3. Exposure：何を見せ、何を見せないか
4. Experience：ユーザーは何を実際に経験するか
5. Preference Formation：その経験が次の好みをどう変えうるか
6. Model Update：変化した行動をシステムがどう再学習するか
7. Self-Revision：ユーザーはシステムの“自分モデル”を拒否・忘却・修正できるか

一次資料、査読論文、systematic review、公式仕様を優先する。preprintはpreprint、simulationはsimulation、philosophical argumentは哲学的議論として区別する。

### Phase 2｜Theory Collision

似た理論を並べるのではなく、前提が衝突する理論を組み合わせる。

例：
- Constructed Preference × Personalization = systemが当てようとするpreference自体がinteraction中に変わる
- Accuracy × Future Self = present-fitの最大化がfuture-fitとは限らない
- Exploration × Convenience = serendipityを増やすほど良いわけではない
- SDT Internalization × Algorithmic Influence = influenced preferenceとinauthentic preferenceは同義ではない
- Agentic Commerce × Recommender Feedback = recommendationがactionまで自動実行されるとloopの性質が変わる

### Phase 3｜Uneven U

各段落を、抽象→具体→理論→反証→一段上の命題へ動かす。

目安は4→3→2→1→2/3→4→5だが、形を固定しない。

重要条件：段落末には、具体例を通る前には言えなかったことを書く。冒頭の言い換えで閉じない。

### Phase 4｜Re-research

必ず中心仮説を壊す方向でもう一度調べる。

特に次を監査する。

- personalization = narrowingと決めつけていないか
- diversity = freedomと決めつけていないか
- algorithmic influence = manipulationと決めつけていないか
- simulationをreal-world causal evidenceへ拡張していないか
- future selfを固定された一つのgoalとして扱っていないか
- accuracy / engagement / satisfaction / autonomy / welfareを同義にしていないか
- short-term preferenceとlong-term preference formationを区別しているか
- user heterogeneityを消していないか

### Phase 5｜Design Implications

批判で終わらず、「どんなcontrolが必要か」まで降りる。

候補：
- history decay
- forget / reset
- context separation
- exploration slider
- novelty budget
- “not me” feedback
- explanation of inferred preference
- temporary unpersonalized mode
- alternative-self mode

ただし、これらを万能解として扱わず、仮説・design directionとして示す。

### Phase 6｜Output Audit

全文について次を確認する。

1. 最初は「AIが好みを当てる話」だったものが、最後には「人間が変われる条件」の話へ進んでいるか。
2. AIを悪役に固定していないか。
3. AI以前にも存在したsocial influenceとの連続性を示しているか。
4. AI固有性を、単なるinfluenceではなくpersonalized / persistent / recursive / actionableな影響として考えているか。
5. 新語を作る必要が本当にあるか。既存理論で足りるなら作らない。

English Mix版を作る場合、Canonical日本語版とH2順・semantic blockを1対1で維持し、段落の結合・分割・並べ替えをしない。
