# インテンションエコノミー × 委任 × AIエージェント 制作ノート

Date: 2026-09-15
Target essay id: `intention-economy-delegated-choice-agent-brand`

## 1. Research｜一次調査

### 最初の問い

「AIが検索・比較・購入まで代行したとき、消費者は商品を買っていても“ブランドを選んだ”と言えるのか？」

前作ではFanbaseをintention infrastructureとして読み替えた。本作では逆方向へ進み、形成された意図がAIへ委任されるとき、選択経験・ブランド・自律性に何が起きるかを扱う。

### 接続した理論・資料

1. Jobs to Be Done
   - Christensen Instituteは、意思決定を人が特定状況で遂げたいprogressから理解するレンズとして説明。
   - functionalだけでなくsocial / emotional dimensionを含む。
   - https://www.christenseninstitute.org/theory/jobs-to-be-done/

2. Constructive Consumer Choice
   - Bettman, Luce & Payne (1998)。消費者は常にwell-defined preferenceを持つわけではなく、task/contextに応じてpreferenceをconstructする。
   - AIへcomparisonを委任することがpreference formationの委任にもなりうる根拠。
   - https://doi.org/10.1086/209535

3. Choice Architecture
   - Thaler, Sunstein & Balz。choiceは環境の影響を受ける。defaults、structure complex choices、feedback等。
   - conversational agentではvisible UIだけでなく、候補集合を作るselection pipeline自体がchoice architectureになるという拡張を本稿で提案。
   - https://papers.ssrn.com/sol3/papers.cfm?abstract_id=1583509

4. AI purchasing delegation / autonomy
   - Decision Support Systems (2024)：購買タスクのAI委任がperceived choice / decision autonomyを弱め、autonomyがadoptionに関係。
   - https://doi.org/10.1016/j.dss.2023.114166
   - Fink, Newman & Haran (2024)：single recommendationよりmultiple recommendationsがacceptanceを高め、recommendation set sizeへのcontrolも効果。
   - https://doi.org/10.1016/j.chb.2024.108244

5. Agentic Commerce infrastructure
   - Google AP2：agent-led paymentsのauthorization / authenticity / accountabilityを扱う。
   - 2026年v0.2でHuman Not Presentのautonomous transactionを明示。
   - https://cloud.google.com/blog/products/ai-machine-learning/announcing-agents-to-payments-ap2-protocol
   - https://blog.google/products-and-platforms/platforms/google-pay/agent-payments-protocol-fido-alliance/
   - OpenAI / Stripe ACP：AI applicationとsellerを接続しcheckoutを完了する仕様。
   - https://openai.com/index/buy-it-in-chatgpt/

6. Agentic Webの推薦研究
   - Abdollahpouri et al. (2026) position paper。delegable contextsではrecommendationのoperational consumerがhumanからagentへ移る可能性、experiential contextsではhumanがfinal judgeに残るdelegation spectrumを提案。
   - position paperであり、確立済み分類として扱わない。
   - https://arxiv.org/abs/2609.11945

7. 最新の実装・制度動向
   - Reuters 2026-09-10：インドNPCIがUPI上で取引するAI agent registryを計画と報道。
   - 現在進行中であり、完成制度・全面普及として扱わない。
   - https://www.reuters.com/world/india/india-plans-ai-registry-it-looks-roll-out-agentic-payments-sources-say-2026-09-10/

## 2. Structure｜Uneven Uでの構造化

### 導入

4: agentic commerceでは人が選ばなくなるかもしれない
→ 1: 「東京駅20分、2万円、静か」ホテル予約
→ 2: 30ブランドがhuman viewから消える
→ 4: ブランドが消える条件は何か
→ 5: 競争対象は他ブランドだけでなくdelegability

### 1. JTBD

4: agentへ何を渡すのか
→ 1: conditions / progress
→ 3: brand nameよりjob specificationが重要になる場面
→ 4: social / emotional jobが反証
→ 5: delegabilityはcategoryでなくjobのspecifiability / verifiabilityに依存

### 2. Constructed Preference

4: objective functionを人間が先に書けばよいのか
→ 1: Bettman et al.
→ 2: hotel comparison中に好みが変わる例
→ 3: comparison creates preference
→ 5: delegation of search can become delegation of preference formation

### 3. Choice Architecture

4: preference formationを誰が設計するか
→ 1: visible EC interface
→ 2: agentが3候補だけ提示
→ 3: architecture moves from interface to selection pipeline
→ 5: attention competitionの前にconsideration-set competitionが生じる

### 4. Autonomy research

4: perfect recommendationなら1案でよいのか
→ 1: 2024 empirical studies
→ 2: multiple recommendations / user control
→ 3: small residual choice can increase acceptance
→ 5: choice process itself has value; automation quality includes delegation control

### 5. Infrastructure

4: 実際にhuman absent purchaseは可能になっているか
→ 1: AP2 v0.2, ACP, India registry plan
→ 3: protocols ≠ mass adoption
→ 5: final human click is no longer mandatory technical assumption

### 6. Delegability hypothesis

4: cheap/high price taxonomyでは足りない
→ 1: 2026 position paper delegation spectrum
→ 3: 本稿の追加軸 = compressibility into objective function
→ 5: human viewからbrandが消えるのは、意味を圧縮しても損失感が小さい場面

### 7. Fanbase再接続

4: FanbaseはAI対策になるか
→ 2: attachmentをAIもrememberできる
→ 1: consumables auto-replenish vs limited jersey self-selection
→ 3: same person/brandでもparticipation valueが違う
→ 5: Fanbaseは“選ぶことを手放したくない理由”を育てる可能性

### 8. Mandate Economy

4: attention→intention→execution
→ 3: preference itself is constructed
→ 5: scarce resource = right to define objective function
→ 4: mandate / delegation boundary
→ 5: autonomy is control over criteria and delegation, not final approval click alone

## 3. Re-research｜反証・修正

### 修正した点

NG: 「AI agentが普及するとブランドは消える」
OK: 本稿タイトルはmechanismを考えるための仮説。ブランドがhuman viewから消えやすい条件を分析し、消滅を予言しない。

NG: 「安い商品ほどAIへ委任される」
OK: priceではなく、preference specifiability、outcome verifiability、decision stakes、identity / participation valueなど複数要因が関係すると考える。

NG: 「Fanbaseが強ければAIに委任されない」
OK: 愛着が強くてもautomatic replenishmentを歓迎する場合がある。重要なのは、そのchoice episodeへのparticipation value。

NG: 「AIは既存の好みを実行するだけ」
OK: constructive preferenceとchoice architectureにより、candidate filteringやcomparisonの省略がpreference formationにも影響しうる。

NG: 「agentic commerceは全面的に自律購入できる完成市場」
OK: protocols、pilot、standardization、registry計画など実装条件が形成中。地域、責任、規制、受容は動いている。

NG: 「2026 position paperのdelegation spectrumが確立理論」
OK: current research agenda / positionとして紹介する。

### 追加で見つかった反証

AI purchasing delegationの研究では、identity-relevant consumptionだから必ずAIを拒む、という単純な結果でもない。条件によってはactivity identificationの高い人もAI-enabled purchaseを使う。本稿ではidentityを固定的な“非委任領域”とせず、「その選択過程に参加価値があるか」に抽象度を上げた。

### 最終的に残した中心命題

**Agentic Commerceでは、AIへ渡されるのは作業だけではない。比較・候補形成まで委任すれば、preference formationの一部も渡される。したがって次の競争資源はintention dataより、何を最適化し、どこまで委任するかを定義するmandateになりうる。**

## 4. Prompt｜再現用プロンプト

あなたは、AIによる自動化を「何ができるか」ではなく「人間が何を委任し、その委任によって何が変質するか」から分析するリサーチャー兼エッセイ編集者です。

### Phase 1｜Research

対象行為について、次の層を別々に調べる。

1. goal / job：本人は何を達成したいか
2. preference：基準は最初から固定か、選択中に作られるか
3. choice environment：何が候補として見えるか
4. delegation：探索、比較、決定、承認、実行のどこを委任するか
5. infrastructure：技術的・制度的に何が実行可能か
6. relationship / identity：効率以外に参加価値があるか

一次情報、査読論文、公式仕様を優先する。最新動向は日付を確認する。

### Phase 2｜Horizontal connections

MECEに分類するのではなく、違う理論をぶつけて前提を壊す。

例：
- JTBD × constructed preference = jobは先に存在しても評価基準は選択中に作られる
- choice architecture × agent = UIが消えても選択環境は消えない
- automation × autonomy = effort reductionとself-directionは同じ方向へ動くとは限らない
- Fanbase × delegation = attachmentの強さよりchoice participationの価値を見る

### Phase 3｜Uneven U structure

段落ごとに4→3→2→1→2/3→4→5を参考に、抽象→具体→再抽象化する。

最重要条件：具体例を通過した後、冒頭より一段大きなことが言えること。

全体でも、各段落の到達点を次の段落の問題設定にする。

### Phase 4｜Re-research

特に次を疑う。

- technical capabilityをactual adoptionと混同していないか
- “AIなら最適”をobjective function固定前提で語っていないか
- identity-rich = nondelegableと固定していないか
- high price = high involvementと決めていないか
- current paperのposition / hypothesis / empirical findingを区別しているか
- convenienceの利益を無視してautonomy lossだけを語っていないか

反証を見つけたら、二分法を捨てて新しい軸へ上げる。

### Phase 5｜Concept creation

既存理論をまとめた後、「この組み合わせを通ったから初めて言える新しい問い」を一つ作る。

新語を使う場合は、既存学術用語と誤認させず「本稿の思考補助線」と明記する。

例：
- delegated intention
- participation value of choice
- objective-function sovereignty
- mandate economy

### Phase 6｜Output audit

各段落について以下を1文で確認する。

「この段落の具体を読む前には言えず、読んだ後なら言えることは何か」

全文について以下を確認する。

「最初の問いへ答えただけか。それとも最初には立てられなかった問いへ進んだか」

English Mix版はCanonical日本語版とH2順・semantic blockを1対1で維持し、段落の結合・分割をしない。
