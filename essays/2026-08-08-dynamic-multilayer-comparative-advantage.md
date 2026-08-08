---
id: dynamic-multilayer-comparative-advantage
title: "比較優位は、点ではなく軌道である"
subtitle: "生成AI時代のタスク配分を、相対生産性・連鎖・学習から再構成する動的多層比較優位モデル"
created: "2026-08-08"
updated: "2026-08-08"
type: "Conceptual Paper"
status: "完成"
tags: ["比較優位", "生成AI", "タスク配分", "人的資本", "組織設計", "キャリア"]
keywords: ["comparative advantage", "task allocation", "generative AI", "learning by doing", "task chaining", "dynamic comparative advantage", "human capital"]
favorite: 5
grow: 5
abstract: "本稿は、生成AI時代において比較優位がむしろ重要性を増すという立場から、その概念を静的な『現在の得意不得意』から拡張する。近年のタスク経済学、AI導入、職業選択、learning-by-doing研究を統合し、比較優位を①タスク層、②チェーン層、③軌道層の三階層で捉える『動的多層比較優位モデル』を提示する。中心命題は、AI時代の最適配分は現在の相対生産性だけでは決まらず、仕事の連鎖による補完性と、現在の配分が将来の人的資本を変える内生性を含めて評価すべきだというものである。比較優位は固定的な強みではなく、継続的に計測・再配分・育成される組織的資産である。"
---

# 比較優位は、点ではなく軌道である
## 生成AI時代のタスク配分を、相対生産性・連鎖・学習から再構成する動的多層比較優位モデル

### 要旨

生成AIの普及によって、「何ができるか」だけでは仕事配分を決められない時代になった。AIが文章、分析、コーディング、デザインなど多様なタスクを一定水準で処理できるなら、重要なのは絶対的な能力の有無ではなく、人間、AI、他の専門職の間で**誰が何を担うと全体価値が最大になるか**という相対的な配分問題である。この意味で、比較優位はAI時代に弱くなるどころか、むしろ中心的な概念になる。

しかし、本稿は同時に、古典的な比較優位の直観をそのまま個人や組織へ適用するだけでは不十分だと論じる。生成AIはタスクごとの相対生産性を急速に変化させるだけでなく、複数タスクを連続して実行することで仕事の境界そのものを変え、さらに人間がどの仕事を続けるかを通じて将来の人的資本形成にも影響するからである。

本稿は、比較優位を三階層で捉える**動的多層比較優位モデル（Dynamic Multi-Layer Comparative Advantage; DMCA）**を提示する。第一の「タスク比較優位」は、特定時点における人間・AI・他者の相対的な純生産性を比較する。第二の「チェーン比較優位」は、タスク単体ではなく前後工程との補完性、引継ぎ、検証、調整コストを含む仕事の連鎖を評価する。第三の「軌道比較優位」は、現在の仕事配分がlearning-by-doingを通じて将来の能力と選択肢を変えることを明示する。

この整理から、比較優位は個人に備わった固定的な「強み」ではなく、技術、賃金、AI利用コスト、組織構造、仕事経験によって内生的に変化する状態として理解される。したがってAI時代のキャリア・組織設計に必要なのは、「いま最も得な仕事」への完全特化ではない。現在価値を取りながら、将来の比較優位を失わない程度に探索と学習を残し、仕事の連鎖単位で配分を見直すことである。

本稿の新規性は、近年別々に発展している①AI導入と比較優位、②AIによるtask chaining、③自動化と人的資本形成の研究を、一つの動的な配分原理として統合する点にある。比較優位は重要である。しかしAI時代に必要なのは、**比較優位に従うことだけでなく、比較優位がどのように生まれ、連鎖し、変化するかを設計すること**である。

**キーワード**：比較優位、生成AI、task allocation、task chaining、learning-by-doing、人的資本、組織設計

---

## 1. 問題設定――AI時代ほど、比較優位が重要になる

生成AIをめぐる議論では、「AIが何をできるようになったか」が注目されやすい。文章を書ける、プログラムを書ける、画像を生成できる、データを分析できる。このような議論はAIの**絶対能力**を把握するうえでは重要である。

しかし、実際の仕事配分を決めるには、それだけでは足りない。

AIがあるタスクを人間より速く処理できるとしても、利用料金、プロンプト作成、検証、誤りの修正、情報漏えいリスクを含めれば、人間が担当したほうが安い場合がある。逆に、人間がAIより高品質に仕事をできても、その人間を別の高価値業務へ移したほうが組織全体の成果は高くなる場合もある。

ここで必要になるのが比較優位である。

経済学における比較優位の核心は、「誰が最も高い絶対生産性を持つか」ではなく、**他の活動を諦める機会費用を含めた相対的な生産性差によって分業を決める**ことにある。国際貿易で生まれたこの考えは、労働市場ではRoy型の職業選択やassignment modelへ展開され、人によって異なる能力が、異なる職業やタスクへのsortingを生む仕組みとして研究されてきた（Roy, 1951; Papageorgiou, 2014）。

近年のtask approachは、この発想をさらに細分化する。Acemoglu and Autor（2011）およびAutor（2013）は、労働者の「skill」と実際に生産過程で遂行される「task」を区別し、技術変化がどのタスクを人間、機械、異なる技能層へ割り当てるかを見る必要を論じた。Acemoglu, Kong, and Restrepo（2025）は近年のtask modelを整理し、各生産要素のタスク間の比較優位が代替パターンを規定するとしている。

AI時代にこの考え方がさらに重要になる証拠も現れ始めている。

Lindenlaub et al.（2026）は、代表性のあるドイツの就業者データを用いて、既存の「AI exposure」と実際の職場でのAI利用の関係が弱いことを示し、AI導入を説明するには技術的にAIが可能かという絶対優位だけでなく、**特定労働者に対してAIが相対的にどれだけ有利か**を見る比較優位ベースの指標が必要だと提案した。彼らの枠組みでは、AIの生産性だけでなくAI利用コスト、人間の生産性と賃金を同時に比較する。

これは重要な転換である。

AI exposureが高いことは、「AIがその仕事をできる」ことを意味しても、「AIに任せるべき」ことまでは意味しない。

**技術可能性と経済合理性は違う。**

この意味で、AI時代は絶対優位から比較優位へ視点を移す必要がある時代だといえる。

本稿はこの立場を採用する。

ただし、比較優位を「今の自分の中で一番得意なこと」「今AIより優れていること」という静的な地図として扱うだけでは、生成AIがもたらす変化を十分に説明できない。

なぜなら、AIは三つの意味で比較優位を動かすからである。

1. **タスクごとの人間とAIの相対生産性を変える。**
2. **複数タスクを連結し、仕事の境界を変える。**
3. **人間が経験するタスクを変え、将来の人的資本を変える。**

本稿はこの三つを統合し、比較優位を「点」ではなく「軌道」として捉える。

## 2. 研究上の位置づけと方法

本稿は実証研究ではなく、既存研究を統合して概念枠組みを提示するconceptual paperである。主に五つの研究群を接続する。

第一は、Roy（1951）以降の職業選択・assignmentと比較優位の研究である。第二は、Acemoglu and Autor（2011）、Autor（2013）、Acemoglu and Restrepo（2018, 2019）らによるtask approachである。第三は、AI adoptionとタスク割当を直接扱う2026年の新しい研究群である（Lindenlaub et al., 2026; Althoff & Reichardt, 2026; Demirer et al., 2026）。第四は、learning-by-doing、task-specific human capital、技術選択の動学研究である（Jovanovic & Nyarko, 1996; Stinebrickner, Stinebrickner, & Sullivan, 2019; Afrouzi et al., 2026）。第五は、分業による生産性向上と調整コストを扱う研究である（Becker & Murphy, 1992; Deming, 2017）。

本稿の目的は、それぞれを独立に要約することではない。

これらの研究から、AI時代の比較優位には少なくとも三つの異なる時間・組織スケールが存在すると考え、**動的多層比較優位モデル（DMCA）**として統合することにある。

なお、本稿が提示するDMCAという名称、三階層分類、後述する概念式および「比較優位のポートフォリオ」という整理は本稿独自の概念提案であり、既存研究で実証済みのモデルではない。各研究が直接支持する範囲と、本稿による統合理論上の推論を区別して論じる。

## 3. 第一層――タスク比較優位：AI exposureではなく相対余剰を見る

### 3.1 AIができる仕事と、AIに任せる仕事は一致しない

生成AIによって最も分かりやすく変化するのは、各タスクにおける人間とAIの相対的な生産性である。

Acemoglu and Restrepo（2018, 2019）は、自動化を「労働を一様に強化する技術」としてではなく、従来労働者が担っていた特定taskをcapitalが遂行可能になる変化としてモデル化した。このtask-based frameworkでは、技術によってtask assignmentが動くことが、労働需要や賃金の変化の中心となる。

AIも同様に考えられる。

ある文章作成タスクについて、AIが10分、人間が30分で終えられるからといって、必ずAIが担当すべきとは限らない。AI利用には、指示、入力準備、検証、修正、セキュリティ、モデル利用料などが伴う。逆に人間側には賃金と、その人が他業務をできなくなる機会費用がある。

したがって第一層では、タスクkを主体iへ割り当てる現在価値を、概念的に次のように考える。

> **タスク純余剰 = 出力価値 − 実行費用 − 利用・検証費用 − 機会費用**

重要なのは、単なる「精度」や「速度」ではない。

Lindenlaub et al.（2026）が指摘するAI exposureとadoptionの乖離は、この点をよく示す。AI adoptionは、技術的可能性ではなく、AIと特定労働者の**relative profitability**によって決まるという考え方である。

本稿は、この最小単位を**タスク比較優位（task comparative advantage）**と呼ぶ。

### 3.2 「人間にしかできない仕事」を探す必要はない

この考え方から、AI時代のキャリア論について一つ重要な結論が出る。

人間は「AIに絶対にできない仕事」を探す必要はない。

比較優位の理論では、ある主体がすべての仕事で絶対劣位にあっても、相対的な機会費用差があれば分業の余地が生じる。AIが将来ほとんどの認知タスクで平均的人間を上回るとしても、そのことだけから人間の仕事がなくなるとは限らない。

Acemoglu and Restrepo（2019）は、automationが人間からタスクを奪うdisplacement effectと、新しいタスクが人間に割り当てられるreinstatement effectを区別する。問題は人間が「AIより強い能力」を永久に保持できるかではなく、**生産過程の中で人間が比較優位を持つタスクがどのように形成されるか**である。

したがって比較優位の視点は、「AIに勝てる能力を作る」という絶対優位競争から距離を取るために有効である。

しかし、この第一層だけでもまだ不十分である。

## 4. 第二層――チェーン比較優位：仕事はタスクの足し算ではない

### 4.1 AIは一つのtaskではなく、連続したstepを取るようになる

従来のtask modelでは、仕事を細かなtaskへ分解し、それぞれを人間か機械へ割り当てる考え方が強力であった。

ところがagentic AIの進展は、この前提自体を揺らしている。

Demirer et al.（2026）は、productionを複数のstepのsequenceとして扱い、各stepが①人間による実行、②AIによるaugmentation、③AIによる完全自動化のいずれかになりうるモデルを提示した。重要なのは、AIが単独stepをばらばらに処理するのではなく、隣接する複数stepを連続して処理する**chain**を形成しうることである。彼らは、AI chainingが存在すると、単純な比較優位の論理が失敗しうることを示す。

なぜか。

タスクAだけをAIに任せると、その前後で人間とAIの引継ぎが発生する。入力形式を変え、文脈を渡し、結果をチェックし、次の担当へ変換する。この境界に調整コストがある。

ところがA、B、CをまとめてAIが実行できれば、境界が減り、単体では人間に比較優位があったBまでAIへ渡したほうが、全体では合理的になる可能性がある。

逆もある。AIがAとCを得意でも、中央のBで人間の判断が不可欠なら、全体をAI chainへする価値が大きく下がることがある。

つまり、**タスク単体で見た比較優位と、ワークフロー全体で見た比較優位は一致しない。**

### 4.2 分業には境界コストがある

この問題はAI固有ではない。

Becker and Murphy（1992）は、分業の拡大が専門化による生産性向上をもたらす一方で、specialized workers間のcoordination costsによって制約されると論じた。Deming（2017）もteam productionモデルで、social skillsがcoordination costsを減らし、労働者が互いの比較優位に沿ってtaskを交換しやすくすることを示している。

生成AIは分業相手を一人増やしたと捉えることもできる。

その場合、「この仕事はAIのほうが速いか」という問いだけではなく、

- AIへ渡すための文脈整形はいくらかかるか
- 結果の検証は誰がするか
- 次の工程へ引き継ぐ際に何が失われるか
- 何stepまとめれば境界コストが下がるか
- 逆にどの地点では人間を挟むべきか

を見る必要がある。

本稿は、この単位を**チェーン比較優位（chain comparative advantage）**と呼ぶ。

### 4.3 「比較優位の主体」は、人間でもAIでもなくチームになる

この視点を取ると、「AI対人間」という比較そのものがしばしば不適切になる。

現実の生産主体は、

> 人間A + AI + 人間B

であることが多い。

Grossman and Rossi-Hansberg（2008）はoffshoringをgoodsの貿易ではなくtasksのtradeとして扱い、taskを移転するコスト低下が生産構造を変えることを示した。AIはtask transfer costをさらに下げる技術とみなせるが、ゼロにはしない。

したがってAI時代の比較優位は、個人単位だけでなく、**どの人間とどのAIをどの順序で接続すると最も低コストで価値を作れるか**というアーキテクチャ問題になる。

ここで比較優位は「私は何が得意か」という自己理解から、「どの組み合わせが全体として強いか」という組織設計へ拡張される。

## 5. 第三層――軌道比較優位：仕事配分が未来の能力を作る

### 5.1 現在の比較優位は、現在の仕事配分の結果でもある

比較優位をキャリアへ適用するとき、最も危険な誤解は、それを個人に備わった固定属性とみなすことである。

実際には、比較優位は過去の配分の結果でもある。

Stinebrickner, Stinebrickner, and Sullivan（2019）は、job tasksと賃金を分析し、高技能task、とりわけhigh-skilled information tasksについてtask-specificなlearning-by-doingが強く存在することを示した。彼らの推計では、高技能taskへの時間配分変更による長期的賃金効果の大部分が、過去にそのtaskを経験したことで蓄積するtask-specific experienceによって説明された。

これは比較優位の考え方へ重要なフィードバックを入れる。

今日ある人を「現在最も得意な仕事」へ配置すると、その仕事の経験がさらに蓄積する。結果として、明日はその仕事への比較優位がより強くなる。

逆に、現在不得意な仕事から完全に外せば、その領域の経験は蓄積しない。

つまり、

> **現在の比較優位 → 現在の配分 → 学習 → 将来の比較優位**

という循環がある。

比較優位は配分を決めるだけでなく、配分によって作られる。

### 5.2 「今の最適化」が人的資本の罠を作りうる

Afrouzi et al.（2026）は、自動化とcareer dynamicsを、労働者が担当taskを通じてskillを獲得するモデルで分析している。彼らのモデルではautomationのコスト低下が常に良い学習結果をもたらすわけではなく、経済がlow-learning equilibriumへ移行するとhuman-capital trapが生じうる。

これはAIによる仕事配分について非常に重要な警告である。

ジュニア社員が不得意な分析作業をAIに任せれば、今日の生産性は上がる。

しかし、その分析作業が従来、ジュニアが分析能力を獲得する訓練経路でもあったなら、完全自動化は未来のシニア人材の供給を減らす可能性がある。

したがって、

「今日この人がやるよりAIに任せたほうが安い」

という静的な比較優位だけで人員配置を決めると、組織が将来必要とする比較優位そのものを消費してしまうことがある。

本稿はこの時間軸を**軌道比較優位（trajectory comparative advantage）**と呼ぶ。

### 5.3 AIは比較優位を奪うだけでなく、技能要件を変える

Althoff and Reichardt（2026）は、AIがtaskをaugment、automate、simplifyする動的task modelを構築し、workersが多次元skillを持ち、occupationを選択し、仕事を通じてskillを蓄積する環境でAIの効果を分析した。彼らの研究の重要な点は、AIが単に労働者を置換するのではなく、taskのskill requirements自体を変えることでworkersのcomparative advantageを組み替えることである。

特にsimplificationは、以前は高技能者しかアクセスできなかった仕事へより低技能のworkersが参入できる可能性を生む。

これは比較優位が「人の中にある能力差」だけで決まらないことを示す。

タスク側の要求水準も動く。

AI時代の比較優位とは、

> **人の能力 × AIによる補完 × タスク要求 × 過去の経験**

の相互作用である。

## 6. 動的多層比較優位モデル（DMCA）

以上を統合して、本稿はAI時代の仕事配分を三階層で評価する。

### Layer 1：Task Comparative Advantage

問いは、

> **いま、この単独タスクを誰が担うと純余剰が最大か。**

評価項目には、品質、速度、賃金、AI利用料、検証費用、機会費用、リスクを含む。

これはもっとも古典的な比較優位に近い層であり、Lindenlaub et al.（2026）のAI adoption frameworkとも整合する。

### Layer 2：Chain Comparative Advantage

問いは、

> **前後工程までまとめると、どの分業構造が最も効率的か。**

ここではhandoff、context transfer、verification、coordination、AI chainの長さが重要になる。Demirer et al.（2026）が示すように、AIによる連続stepの実行はtaskのboundaryを内生的に変える。

したがってLayer 1の最適解を単純に並べても、Layer 2の最適解にならない。

### Layer 3：Trajectory Comparative Advantage

問いは、

> **この配分を続けたとき、半年後・三年後の比較優位はどう変わるか。**

現在のtask allocationがhuman capitalを蓄積・減耗させるため、将来の生産性、賃金、選択肢、組織能力まで含める。

この層では、現在の生産量を少し犠牲にしてでも、人間へ学習taskを残すことが最適になる場合がある。

### 6.1 概念式

三階層を一つの意思決定へまとめると、主体iへtaskまたはchain jを配分する価値は、概念的に次のように整理できる。

> **動的配分価値 = 現在の相対純余剰 + チェーン補完価値 − 境界調整費 + 将来の人的資本価値 + 将来選択肢価値 − 切替費用**

これは推定済みの構造式ではなく、本稿の理論整理のための概念式である。

古典的な比較優位が現在のopportunity costに重点を置くのに対して、DMCAは、**現在の配分が将来のopportunity cost自体を変更する**ことを明示する。

ここに本稿の中心的拡張がある。

## 7. 比較優位には「履歴依存性」がある

### 7.1 最適な配置を毎日変えればよいわけではない

AIモデルの性能が毎月変化するなら、「比較優位を毎回計算し直して最適な担当へ変えればよい」と考えたくなる。

しかし、現実には配分変更そのものにコストがある。

人間は新しい仕事へ移ると学習コストを負う。既存のexpertiseの一部は別技術では使えない。組織も、権限、手順、レビュー体制を組み替える必要がある。

Jovanovic and Nyarko（1996）はlearning-by-doingとtechnology choiceを扱い、あるtechnologyで蓄積したexpertiseの一部がtechnology switching時に失われるため、より良いtechnologyが存在しても直ちに乗り換えることが最適とは限らないことを示した。

職業移動についても、switching costsは重要である。Papageorgiou（2014）はworkersが就業しながら自身のcomparative advantageを学び、search frictionsがlearningとmatchingを遅らせることを示す。

したがってDMCAでは、比較優位に**hysteresis（履歴依存性）**があると考える。

相対生産性が少し逆転しただけでは、担当を変えないほうが合理的な場合がある。

AIモデルが5%改善するたびに組織図を変えることは、比較優位に忠実なのではなく、switching costを無視している。

### 7.2 「比較優位の更新頻度」自体が設計変数になる

ここから実務的には新しい問いが生じる。

> 比較優位を、どの頻度で再計算するべきか。

これは静的比較優位論には出てきにくい問題である。

AIの進歩が速いほど更新頻度を高める誘因がある。一方で、業務変更コスト、学習コスト、責任分界の変更コストが大きければ更新頻度を抑えるべきである。

したがって組織に必要なのは「常に最新AIへ仕事を渡すこと」ではなく、**再配分の閾値を設計すること**である。

例えば、

- コストが10%下がっただけなら現行維持
- 品質とコストを合わせ20%以上改善したら試験移行
- 新しいAI chainによって2つ以上のhandoffが消えるならworkflow単位で再設計
- ジュニア育成taskは短期コストだけで自動化しない

といったルールである。

これを本稿では**比較優位の再配分閾値（comparative-advantage reallocation threshold）**と呼ぶ。

## 8. 比較優位に従いすぎる逆説

ここで一見矛盾する結論が現れる。

比較優位は重要である。

しかし、**現在の比較優位に100%従い続けることは、長期的には比較優位を損なうことがある。**

なぜなら、比較優位がlearning-by-doingによって内生的に形成されるからである。

現在得意な仕事へ完全特化すると、その得意さはさらに強くなる。一方で、他のtaskへのoptionは失われる。

これは必ずしも悪いことではない。専門化には大きな便益がある（Becker & Murphy, 1992）。しかし技術変化が速い環境では、現在の専門性へ過度に固定されることにはリスクがある。

AIが突然そのtaskを大幅に安くしたとき、他taskへ移るためのhuman capitalが不足しているかもしれない。

したがって動的比較優位の観点では、現在最適でないtaskへ一部時間を使う行為が合理化される場合がある。

これは比較優位の否定ではない。

将来の比較優位を含めた最適化である。

本稿はこれを**比較優位の探索予算（comparative-advantage exploration budget）**と呼ぶ。

組織・個人は、例えば労働時間の一定割合を、

- 新しいAIの試用
- 隣接skillの習得
- 自動化されつつある仕事の上流／下流taskへの参加
- 他職能との共同作業

へ配分する。

その時間は短期的には現在の比較優位から外れる。しかし、将来のtask setを広げ、環境変化に対するoptionを維持する。

## 9. キャリア論への含意――「強みを磨く」から「比較優位ポートフォリオを持つ」へ

AI以前のキャリア論では、「強みを見つけ、そこへ集中せよ」という助言が合理的であった。

比較優位論も、一見するとこの結論を支持する。

しかしDMCAから見ると、キャリアは単一の強みを最大化する問題ではない。

重要なのは、**複数の比較優位候補を異なる成熟度で保有するポートフォリオ**である。

本稿は個人のtask群を次の三つへ分けることを提案する。

### 9.1 Harvest tasks――現在の比較優位を収穫する

すでに高い生産性と市場価値を持ち、現在の収益や成果を生む仕事である。

ここでは比較優位に従い、積極的に専門化する。

### 9.2 Bridge tasks――AI・他者と接続する

自分が最高の実行者でなくても、複数領域をつなぐことでchain全体の価値を上げるtaskである。

例えば技術と顧客、データと意思決定、法務とプロダクトをつなぐ仕事である。Deming（2017）が示したsocial skillの価値も、このcoordination layerとして理解できる。

### 9.3 Option tasks――未来の比較優位候補を育てる

現在は相対生産性が低いが、将来の技術・役割変化に備え、意図的に経験を蓄積するtaskである。

ここをすべてAIへ任せると、短期効率は高くても将来のoptionが消える。

キャリア設計は、Harvestだけを最大化することではなく、Harvestで成果を得ながらBridgeとOptionを一定量維持する問題になる。

これを**比較優位ポートフォリオ（comparative advantage portfolio）**と呼ぶ。

## 10. 組織論への含意――管理職の仕事は「人を配置する」から「比較優位を育てる」へ

比較優位を固定属性として見るなら、管理職の仕事は単純である。

各人の得意分野を見つけ、最も適した仕事へ配置する。

しかしDMCAでは、それだけではない。

今日の配置が、明日の能力分布を作るからである。

したがって管理職は、同時に三つの問いへ答える必要がある。

1. **現在効率**：今日、誰／AIがこのtaskを担うべきか。
2. **構造効率**：taskをどうchain化するとhandoffとcoordination costを減らせるか。
3. **能力形成**：その配分を続けたとき、半年後に誰が何をできるようになるか。

これは人員配置というより、人的資本のポートフォリオ管理である。

特にジュニア育成では重要である。

AIが新人より速いという理由だけで、調査、文章作成、分析、コーディングなどの初級taskをすべてAIへ渡した場合、従来それらのtaskが提供していたlearning-by-doing経路が消える可能性がある（Afrouzi et al., 2026）。

組織は、AIによって不要になった「成果物としてのtask」と、育成人材に必要な「経験としてのtask」を区別しなければならない。

同じ仕事でも、

> **生産には不要だが、学習には必要**

という状態がありうる。

これはAI時代の人材育成で極めて重要な論点である。

## 11. 本稿の五つの命題

以上を、検証可能な理論命題として整理する。

### 命題1：AI利用は絶対的な技術可能性より、task-levelの比較優位によって予測される

AI exposureが高くても、AI利用コスト、検証費用、人間の賃金・生産性を含めた相対余剰が低ければadoptionは進まない。これはLindenlaub et al.（2026）の実証・理論枠組みに直接対応する。

### 命題2：AIが複数stepをchain化できるほど、最適配分の単位はtaskからworkflowへ移る

単一taskの比較優位は、隣接taskとの補完性とcoordination costによって反転しうる。したがってtask-level最適化の総和はworkflow-level最適化と一致しない（Demirer et al., 2026）。

### 命題3：learning-by-doingが強いtaskほど、静的な比較優位だけに基づく自動化は将来の人的資本を過少評価する

現在の効率向上によって人間のtask experienceが失われる場合、将来のhuman capital形成を含めたdynamic returnは静的returnより小さくなる可能性がある（Stinebrickner et al., 2019; Afrouzi et al., 2026）。

### 命題4：技術変化が速く、switching costが高いほど、最適な比較優位戦略には探索と再配分閾値が必要になる

頻繁すぎる再配分はskill lossとcoordination costを生み、遅すぎる再配分は新技術の利益を逃す（Jovanovic & Nyarko, 1996）。したがって最適方針はcontinuous switchingではなくthreshold-based switchingになる。

### 命題5：長期的に高い成果を上げる個人・組織は、現在の比較優位だけでなく、将来の比較優位候補を意図的に保有する

この命題は本稿独自の理論的推論である。Harvest、Bridge、Option tasksを組み合わせる比較優位ポートフォリオは、短期生産性と技術変化への適応可能性を両立させると予測する。

## 12. 反論・限界

### 12.1 「何でも動的と言えば比較優位が曖昧になる」という問題

本稿は比較優位へchain、learning、switching costを追加する。その結果、概念が広すぎて測定不能になる危険がある。

この批判は妥当である。

そのため実証研究では三階層を分離して測定する必要がある。

Task layerではtask-specific productivity、wage、AI user cost。Chain layerではhandoff数、coordination time、verification cost。Trajectory layerではtask experienceと将来productivityの関係を推定する、といった設計が必要になる。

DMCAは一つの巨大な指標を直ちに計算するためのモデルではなく、**静的な比較優位判断で落ちる変数を特定する診断枠組み**として位置づけるべきである。

### 12.2 すべての仕事にlearning-by-doingがあるわけではない

Stinebrickner et al.（2019）は低技能taskではlearning-by-doingの証拠を見いだしていない一方、高技能taskでは強い効果を報告している。

したがって「育成のために人間へ仕事を残す」という論理をすべてのtaskへ適用すべきではない。

学習価値が低く、AIが安く、安全で、chain化もしやすいtaskは積極的に自動化するほうが合理的である。

### 12.3 Option taskは単なる趣味になりうる

未来の比較優位を作るという名目で、現在価値の低い仕事へ無制限に時間を使えば、何でも正当化できる。

Option taskには、少なくとも、

- 将来需要が増える合理的根拠
- 現在の能力との隣接性
- 学習効果の見込み
- 一定期間後の再評価

が必要である。

探索予算は「好きなことをする時間」ではなく、将来のtask assignmentへ向けた投資である。

### 12.4 企業内の比較優位と市場価格は一致しない

同じ人でも、社内の配置と外部労働市場での価値は異なる。企業固有knowledge、チーム関係、権限、文化によって内部的comparative advantageが形成されるためである。

したがってDMCAを個人の市場キャリアへ適用するときは、firm-specificな比較優位とmarket-wideな比較優位を区別する必要がある。

## 13. 結論――比較優位は「見つけるもの」から「運用するもの」へ

生成AI時代に比較優位は古びていない。

むしろ、絶対能力の意味が薄れるほど、その重要性は増す。

AIが文章を書けるか。

コードを書けるか。

分析できるか。

それ自体は、仕事配分の答えではない。

必要なのは、AI、人間、異なる専門職の間で、誰がどのtaskを担うと全体価値が最大になるかを考えることである。

Lindenlaub et al.（2026）が示すように、AIの技術的exposureと実際のadoptionは一致せず、relative profitability――比較優位――を見る必要がある。

しかし生成AIは、比較優位の計算を三つの意味で難しくした。

第一に、AIの進歩によってtask-levelの相対生産性が高速で変化する。

第二に、AIが複数stepをchainとして処理することで、taskの境界とcoordination costが変わる（Demirer et al., 2026）。

第三に、automationが人間のtask experienceを変え、将来のskillとcareerを変える（Althoff & Reichardt, 2026; Afrouzi et al., 2026）。

したがって、比較優位を「自分の中で相対的に得意なもの」とだけ理解するのは狭すぎる。

比較優位は、

- **現在の相対生産性**であり、
- **仕事のつながり方によって変わる構造**であり、
- **過去の配分から作られ、未来の配分によって変わる軌道**である。

この三つを同時に見る必要がある。

その意味で、AI時代に求められる能力は「比較優位を一度発見する能力」でも「AIにできることを全部渡す能力」でもない。

より正確には、

> **比較優位を計測し、仕事の単位を組み替え、将来必要になる比較優位へ投資し、十分な差が生まれたときに再配分する能力**

である。

比較優位は、固定された地図ではない。

現在地から次の現在地へと連続する軌道である。

そしてAI時代のキャリアと組織設計の本質は、その軌道を偶然に任せず、**運用すること**にある。

---

## 参考文献

Acemoglu, D., & Autor, D. (2011). Skills, tasks and technologies: Implications for employment and earnings. In O. Ashenfelter & D. Card (Eds.), *Handbook of Labor Economics* (Vol. 4B, pp. 1043–1171). Elsevier. Working paper version: https://www.nber.org/papers/w16082

Acemoglu, D., Kong, F., & Restrepo, P. (2025). *Tasks at work: Comparative advantage, technology and labor demand* (NBER Working Paper No. 32872, revised March 2025). https://doi.org/10.3386/w32872

Acemoglu, D., & Restrepo, P. (2018). Modeling automation. *AEA Papers and Proceedings, 108*, 48–53. https://doi.org/10.1257/pandp.20181020

Acemoglu, D., & Restrepo, P. (2019). Automation and new tasks: How technology displaces and reinstates labor. *Journal of Economic Perspectives, 33*(2), 3–30. https://doi.org/10.1257/jep.33.2.3

Afrouzi, H., Blanco, A., Drenik, A., & Hurst, E. (2026). *Automation, learning, and career dynamics* (NBER Working Paper No. 35157). https://doi.org/10.3386/w35157

Althoff, L., & Reichardt, H. (2026). *Task-specific technical change and comparative advantage* (NBER Working Paper No. 35353). https://doi.org/10.3386/w35353

Autor, D. H. (2013). The “task approach” to labor markets: An overview. *Journal for Labour Market Research, 46*(3), 185–199. Working paper version: https://doi.org/10.3386/w18711

Becker, G. S., & Murphy, K. M. (1992). The division of labor, coordination costs, and knowledge. *The Quarterly Journal of Economics, 107*(4), 1137–1160. https://doi.org/10.2307/2118383

Deming, D. J. (2017). The growing importance of social skills in the labor market. *The Quarterly Journal of Economics, 132*(4), 1593–1640. https://doi.org/10.1093/qje/qjx022

Demirer, M., Horton, J. J., Immorlica, N., Lucier, B., & Shahidi, P. (2026). *Chaining tasks, redefining work: A theory of AI automation* (NBER Working Paper No. 34859). https://doi.org/10.3386/w34859

Foster, A. D., & Rosenzweig, M. R. (1996). Comparative advantage, information and the allocation of workers to tasks: Evidence from an agricultural labour market. *The Review of Economic Studies, 63*(3), 347–374. https://doi.org/10.2307/2297887

Grossman, G. M., & Rossi-Hansberg, E. (2008). Trading tasks: A simple theory of offshoring. *American Economic Review, 98*(5), 1978–1997. https://doi.org/10.1257/aer.98.5.1978

Jovanovic, B., & Nyarko, Y. (1996). Learning by doing and the choice of technology. *Econometrica, 64*(6), 1299–1310. Working paper version: https://doi.org/10.3386/w4739

Lindenlaub, I., Oh, R., Rodriguez, M. A., & Veldkamp, L. (2026). *Beyond exposure: Predicting AI adoption based on comparative advantage* (NBER Working Paper No. 35271). https://doi.org/10.3386/w35271

Papageorgiou, T. (2014). Learning your comparative advantages. *The Review of Economic Studies, 81*(3), 1263–1295. https://doi.org/10.1093/restud/rdt048

Roy, A. D. (1951). Some thoughts on the distribution of earnings. *Oxford Economic Papers, 3*(2), 135–146.

Stinebrickner, R., Stinebrickner, T. R., & Sullivan, P. J. (2019). Job tasks, time allocation, and wages. *Journal of Labor Economics, 37*(2), 399–433. Working paper version: https://doi.org/10.3386/w24079
