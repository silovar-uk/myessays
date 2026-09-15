# AI委任後の自律性 制作ノート

Date: 2026-09-15
Target essay id: `choosing-not-to-choose-autonomy-after-delegation`

## 1. Research｜一次調査

### 出発点

前作の到達点は「AIに何を最適化させるかを決める権利」だった。しかし、そこには「人間には安定した目的関数があり、それを正確にAIへ渡せる」という前提が残っていた。

今回の問いは以下。

**AI時代の自律性とは、自分ですべてを選ぶことなのか。それとも、自分に代わって選ぶ仕組みを自分で統治できることなのか。**

### 接続した理論・資料

1. Self-Determination Theory / autonomy
   - Ryan & Deciはautonomyをself-regulationとして扱い、その反対をself-endorsementのないcontrolled regulationとして論じる。
   - autonomyをindependenceと同一視しない。
   - https://doi.org/10.1111/j.1467-6494.2006.00420.x
   - https://doi.org/10.1037/0003-066X.55.1.68

2. AI purchasing delegation
   - Decision Support Systems (2024)。AIへの購買タスク委任はperceived choice autonomy / decision autonomyを弱め、adoptionに影響する。
   - ただしidentity-relevant consumptionだから必ずAIを拒否するわけではなく、strong identificationがある参加者でAI-enabled purchaseの受容が高まる条件も報告。
   - https://doi.org/10.1016/j.dss.2023.114166

3. Recommendation autonomy
   - Fink, Newman & Haran (2024)。single recommendationよりmultiple recommendationsがacceptanceを高め、recommendation set sizeを利用者が調整できるcontrol autonomyにも効果。
   - https://doi.org/10.1016/j.chb.2024.108244

4. Constructive Consumer Choice
   - Bettman, Luce & Payne (1998)。消費者は常にwell-defined preferenceを保持するわけではなく、task/contextに応じてpreferenceをconstructする。
   - 「人間が目的関数を書き、AIが実行する」という単純構造への反証。
   - https://doi.org/10.1086/209535

5. Extended Mind
   - Clark & Chalmers (1998)。適切に統合された外部資源を認知過程の一部として扱えるかを問う。
   - AI agentを直接論じた論文ではないため、本稿ではAgent-as-extensionを考えるための思考実験としてのみ使用。
   - https://doi.org/10.1093/analys/58.1.7

6. Meaningful Human Control
   - Santoni de Sio & van den Hoven (2018)。trackingとtracingをmeaningful human controlの必要条件として提示。
   - 主背景はautonomous weapon systemsだが、非軍事autonomous systemsへの含意も検討。
   - 「human is in the loop」と「meaningful control」は同義ではない、という接続に使う。
   - https://doi.org/10.3389/frobt.2018.00015

7. AP2 v0.2 / Human Not Present
   - current specificationはHuman Present (Direct)とHuman Not Present (Autonomous)を明示。
   - Human Not Presentではuserがopen Checkout / Payment Mandatesのconstraintsを承認し、その範囲でShopping Agentがclosed mandatesを作成・署名できる。
   - open mandateの`exp`はtask完了に必要な最小値が推奨される。
   - protocolはmass adoptionの証拠ではなく、agentic payment authorizationの実装仕様として扱う。
   - https://github.com/google-agentic-commerce/AP2/blob/main/docs/ap2/specification.md

8. NIST agent identity / authority
   - 2026-02-05 concept paper。software / AI agentsのidentification、authorization、auditing、non-repudiation等を検討対象として提示。
   - 完成規格ではなくinitial public draft / project concept。
   - https://www.nist.gov/news-events/news/2026/02/new-concept-paper-identity-and-authority-software-agents

9. Autonomy by Design
   - Buijsman, Carter & Bermúdez (2025)。AI decision-supportがdomain-specific autonomyへ与える影響をskilled competenceとauthentic value-formationから分析。
   - long-term deskillingやunconscious value shiftsを論点化。
   - careful role specification、defeater mechanisms、reflective practice、適切なchoice frictionsなどを提案。
   - https://doi.org/10.1007/s13347-025-00932-2

10. Automation bias
   - Romeo & Conti (2025/2026 issue) systematic review。AI助言へのover-reliance、trust calibration、verification effort等を整理。
   - explanation / transparencyだけでは十分でない場合があり、critical engagement / independent verificationの重要性を指摘。
   - https://doi.org/10.1007/s00146-025-02422-7

11. Delegation illusion / responsibility
   - Kong (2026-09-14)。principal-deployed AI agentsにおいて、specific actからのcausal / epistemic distanceをprincipalのanswerability低下と混同することをdelegation illusionと呼ぶ。
   - conceptual / normative analysisでありempirical consensusではない。
   - responsibilityをindividual outputではなくprior act of delegationへtracingする議論として接続。
   - https://doi.org/10.1007/s43681-026-01383-x

## 2. Structure｜Uneven Uでの構造化

### 導入

4: AIが買ったものは自分の買い物か
→ 1: 朝7時、コーヒー豆が自動補充されている
→ 2: final clickの有無だけでは直感が決まらない
→ 4: delegationとautonomyを分離する必要
→ 5: choiceそのものからchoice systemのgovernanceへ問いを上げる

### 1. Choice ≠ Autonomy

4: autonomyはindependenceなのか
→ 1: hotel auto-booking / manual exhausted clicking
→ 2: SDTのself-endorsement
→ 1: purchasing delegation / recommendation experiments
→ 4: delegationはautonomyの反対語ではない
→ 5: 「どこを手放すかを選ぶ」こともautonomyの一部になりうる

### 2. Mandateを書けば終わるのか

4: objective functionを人間が書けば解決か
→ 1: hotel / shoesで比較中に基準が変わる
→ 2: constructive preference
→ 4: execution delegationとdeliberation delegationを分離
→ 5: mandateにはpreference revisionの余白が必要

### 3. Agent-as-other vs Agent-as-extension

4: AIは外部代理人か
→ 2: Principal–Agent的問題設定
→ 1: Extended Mindのnotebook thought experiment
→ 3: long-term personal agentの記憶・補助
→ 4: agentはextensionでありoutside interest carrierでもある
→ 5: governance対象はauthorityだけでなくboundary itself

### 4. Human in the Loopを疑う

4: final approvalを人に残せばcontrolか
→ 1: 100候補→1候補→approve
→ 2: MHCのtracking / tracing
→ 3: exception-based escalationのほうがmeaningfulな場合
→ 5: human presenceはposition、controlはstructure

### 5. Infrastructure

4: 哲学だけの話か
→ 1: AP2 v0.2 Human Not Present
→ 2: open mandate / constraints / closed mandate / verification
→ 1: NIST authority concept paper
→ 4: agent commerceはapproval eliminationよりauthority translation
→ 5: scarce resource = right to write / revise / revoke mandates

### 6. ルールを書いた自分も変わる

4: higher-order rulesだけ人間なら安全か
→ 1: Autonomy by Design / automation bias
→ 2: deskilling / unconscious value shift / over-reliance
→ 4: constitutional author is endogenous to the system
→ 5: autonomy needs reflective revision, not one-time consent

### 7. Responsibility

4: AIが決めると責任も消えるか
→ 1: Kong 2026 delegation illusion
→ 3: conceptual argumentでありconsensusではないと限定
→ 4: output-level authorshipとdelegation-level answerabilityを分離
→ 5: freedom and responsibility both move upward to system design

### 8. Constitutional Autonomy

4: coffee purchaseを再評価
→ 1: purpose / constraints / exceptions / visibility / revocability / revision
→ 3: 「憲法的自律」は本稿の分析語
→ 5: autonomy = governance of how choices are made on one’s behalf
→ 5+: next question = who helps write the constitution, and whose incentives enter there?

## 3. Re-research｜反証・修正

### 初期仮説

「大事な選択は自分で行い、どうでもいい選択をAIへ委任すればよい」

### 修正1｜identity-rich = nondelegableではない

AI purchasing delegation researchでは、activity identificationが強い人でもAI-enabled purchasingを受け入れる条件がある。

修正後：委任可能性はperson / brand / categoryの固定属性ではなく、choice episode、task stage、control designに依存する。

### 修正2｜choice = autonomyではない

SDTではautonomyをindependenceと単純同一視できない。

修正後：human executionの量ではなくself-endorsement / governanceの質を見る。

### 修正3｜mandate = fixed true preferenceではない

Constructive Consumer Choiceにより、preferenceは選択プロセスで構成されうる。

修正後：mandateにはcurrent preferenceだけでなくrevision mechanismが必要。

### 修正4｜Human in the Loop = meaningful controlではない

final clickがあってもcandidate constructionやreason responsivenessを理解・変更できなければ弱い。

修正後：tracking / tracing / exception handling / revocabilityを見る。

### 修正5｜delegationは常にautonomy lossでもない

Autonomy by Designはtechnology dependenceが特定task autonomyを下げてもhigher-level goal achievementを改善する場合を認める。

修正後：autonomyを単一量でなく、level / domain / time horizonで見る。

### 修正6｜ルール設定だけで安全でもない

automation bias、deskilling、value shiftにより、rule author自身がAIとの相互作用で変化する。

修正後：one-time authorizationではなくreflective revisionを中心条件に追加。

### 修正7｜responsibility gapを確定事実にしない

Kong (2026)はdelegation illusionを主張するが、conceptual / normative argument。

修正後：責任が必ず保存されると断定せず、「個別出力から委任設計へ責任の焦点を移す有力な見方」として扱う。

### 最終中心命題

**AI時代の自律性は、個々の意思決定をすべて自分で実行する能力だけでは測れない。何を委任し、どんな理由・制約・例外を与え、どう可視化・撤回・再検討するかという意思決定システムを、自分のものとして統治し続けられるかが重要になる。ただし、その統治者自身もAI利用によって変わるため、自律性には継続的なrevisionが必要である。**

### 本稿で導入した思考補助線

`Constitutional Autonomy / 憲法的自律`

確立済み学術用語としてではなく、次をまとめて考えるためのanalytical lens。

- purpose
- constraints
- exceptions
- visibility
- revocability
- revision

## 4. Prompt｜再現用プロンプト

あなたは、AIによる委任・自動化を「人間が操作した回数」ではなく「意思決定システムを誰がどう統治しているか」から分析するリサーチャー兼エッセイ編集者です。

### Phase 1｜Research

対象となるAI委任について、最低でも次の7層を別々に調べる。

1. Action：誰が最終行為を実行するか
2. Decision：誰が候補を比較し決めるか
3. Preference：評価基準は固定か、選択中に形成されるか
4. Mandate：目的・制約・例外を誰が設定するか
5. Control：誰が停止・修正・撤回できるか
6. Reflection：委任ルール自体を見直す機会があるか
7. Accountability：失敗時に誰が説明・責任を負うか

一次資料、公式仕様、査読論文を優先する。最新技術は「仕様が存在する」「pilotがある」「普及している」を分ける。

### Phase 2｜Theory Collision

似た理論を並べず、互いの前提を壊す理論をぶつける。

最低限検討する衝突：

- Self-Determination Theory × automation
- Constructive Preference × mandate
- Principal–Agent × Extended Mind
- Human in the Loop × Meaningful Human Control
- convenience × deskilling
- authorization × responsibility
- current self × future self

各衝突について、次の形式で1文を書く。

「Aの理論では○○に見えるが、Bを通すと△△へ見え直す」

### Phase 3｜Delegation Ladder

委任を一括りにせず、次を分解する。

- search delegation
- comparison delegation
- recommendation delegation
- decision delegation
- authorization delegation
- execution delegation
- preference-shaping delegation
- rule-writing delegation

どの段階で性質が変わるかを探す。

### Phase 4｜Uneven U

各段落を、抽象→具体→意味抽出→より大きな問いへ進ませる。

参考：4→3→2→1→2/3→4→5。

ただし形を固定しない。

段落末で必ず確認する。

「この具体例を通る前には言えなかったことが、今は何と言えるか」

### Phase 5｜Adversarial Re-research

初稿を書いた後、中心命題を壊す資料を探す。

特に次を疑う。

- AI delegation = autonomy loss と決めていないか
- human final approval = human control と決めていないか
- user preference = stable objective function と決めていないか
- identity-rich choice = nondelegable と決めていないか
- more transparency = safer と単純化していないか
- technical protocol = adoption と混同していないか
- agent action = agent responsibility と飛躍していないか
- one-time consent = continuing autonomy と決めていないか

反証が出たら元の二分法へ戻らず、より高い抽象度の軸へ作り直す。

### Phase 6｜Concept Creation

既存理論の単なる要約で終わらず、理論を横断した後にだけ作れる分析語を一つ検討する。

新語は必ず「本稿の思考補助線」であることを明示し、確立学術用語のように扱わない。

今回の例：

`Constitutional Autonomy = 個々の選択を保持することではなく、自分に代わって選ぶシステムの目的・制約・例外・可視性・取消・改訂を統治する能力`

### Phase 7｜Output Audit

最後に以下を確認する。

- 人間 vs AIという単純対立を超えたか
- convenienceの利益も残したか
- short-term controlとlong-term autonomyを分けたか
- userとplatform/companyのpower asymmetryを無視していないか
- 「どこまで任せるか」だけでなく「誰が委任条件を書くのを助けるか」まで進んだか
- 冒頭では立てられなかった次の問いが生まれたか

Canonical日本語版とEN MIX版を作る場合、H2順・semantic block type・semantic block countを1対1で保持し、段落の結合・分割・並べ替えをしない。
