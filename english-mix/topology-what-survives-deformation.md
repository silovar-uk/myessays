---
id: topology-what-survives-deformation
title: "ドーナツとマグカップが「同じ」なら、何が違えば違うのか――トポロジー入門"
subtitle: "Topology: what survives when a shape changes?"
mode: "english-mix"
english_ratio: 0.43
mix_unit: "sentence"
---

# ドーナツとマグカップが「同じ」なら、何が違えば違うのか
## Topology: what survives when a shape changes?

**A coffee mug and a doughnut are the same, mathematically speaking.**

普通に聞けば、おかしな話だ。カップにコーヒーを注げるけれど、ドーナツに注げば机が大惨事になる。If they are “the same,” mathematics clearly means something different from what we mean at breakfast.

ここで大事なのは、数学者が二つの物を「似ている」と言っているわけではないことだ。They specify which changes are allowed, and then ask which properties survive those changes.

このエッセイの中心となる問いは、**What do we keep, and what do we deliberately ignore?** だ。単純化はものを雑に見る方法ではなく、残すべき構造を選び取る方法にもなる。

![同相と非同相を区別する概念図](https://silovar-uk.github.io/myessays/assets/topology-forms-2026.svg)

*Figure 1. A circle and the outline of a square are homeomorphic; a sphere and a torus are not. Original conceptual illustration.*

## 1. 長さを測ることと、つながりを調べることは別の問いである

学校の幾何学では、長さ、面積、角度、体積を計算する。**Geometry often asks how large something is, how far apart things are, or how sharply a line bends.**

けれども、一本の輪を丸から四角へ変形させても、つながりが切れなかったことは長さや角度では言い表しにくい。The outline changes, but the loop remains a loop.

Topology（位相幾何学）は、こうした変形で保存される性質を研究する。It is sometimes called “rubber-sheet geometry.” ただしゴムそのものの性質を研究するわけではない。連続性を保ちながら動かし、切ったり突然貼ったりしない、という発想の比喩だ。

The real achievement is not the freedom to stretch a shape. **It is the ability to identify what stretching cannot change.**

[UCLA: Point-Set Topology](https://math.ucla.edu/~sharifi/notes/topology.html)

## 2. ドーナツとマグカップは同じなのか。「何の表面か」が先である

The familiar mug–doughnut example works only after we choose a suitable mathematical model. 取っ手が一つのカップとトーラス（ドーナツ型の表面）は、閉じた曲面として取っ手の数が同じで、同相な形として扱える。

But what exactly counts as “the mug”? 陶器の内側、外側、底、口の縁まで含む表面なのか。それとも厚みのない、上端が開いた紙の器を考えているのか。

A real ceramic mug has a surface that continues around its rim. 一方、厚みのない開口した器の理想化された表面には境界がある。A surface with a boundary is not homeomorphic to a torus surface without a boundary.

つまり、**“A mug is a doughnut” is a compressed claim with hidden assumptions.** 同じという結論よりも、その結論が成り立つ条件を先に定義する姿勢のほうが、トポロジーらしい。

## 3. 1736年の七つの橋では、街の地図を捨てた瞬間に答えが見えた

In 1736, Leonhard Euler（レオンハルト・オイラー）studied the famous Seven Bridges of Königsberg problem. 四つの陸地を結ぶ七つの橋を、一つの橋につき一回だけ渡れるか。

You do not need the length of any bridge. You do not even need an accurate map. 陸地を頂点（vertex）、橋を辺（edge）に置き換え、つながりだけを残せばよい。

各頂点につながる橋の本数が次数（degree）。In this historical network, the four degrees are **3, 5, 3, and 3**.

![ケーニヒスベルクの七つの橋の接続図](https://silovar-uk.github.io/myessays/assets/topology-bridges-2026.svg)

*Figure 2. Four landmasses and seven bridges, represented as a multigraph. Original diagram.*

Every intermediate stop on a walk must have a way in and a way out. したがって途中の頂点の次数は偶数になる。Only the starting point and the finishing point may have odd degree—at most two vertices.

ここでは奇数が四つある。**The walk is impossible, no matter how long you try.** 散歩を始める前に無理だと証明できる。これはありがたい。

歴史的には、この仕事はグラフ理論（graph theory）の重要な起点であり、「位置の幾何学」へつながる思想的な先駆でもあった。But graph theory and modern general topology are not identical disciplines. 共通するのは、何を無視すれば問題の骨格が現れるかという問いだ。

[Mathematical Association of America: Euler's original bridge problem](https://old.maa.org/press/periodicals/convergence/leonard-eulers-solution-to-the-konigsberg-bridge-problem)

## 4. 数学は「近さ」を、距離の数値なしでも定義しようとした

What does it mean for two points to be “near” each other? 地図ならメートルで答えられる。しかし抽象的な空間には、自然な距離が与えられていない場合もある。

そこで登場するのが位相空間（topological space）。We begin with a set of points, X, and specify a collection of subsets called open sets（開集合）.

実数直線では、両端を含まない区間（0, 1）が開集合の典型例だ。But “open” is a technical definition, not a metaphor for an open door.

A collection of open sets is a topology if three rules hold:

1. The empty set and X itself are open. 空集合と全体集合は開集合。
2. Any union of open sets is open. 開集合の任意個の合併は開集合。
3. Any finite intersection of open sets is open. 開集合の有限個の共通部分は開集合。

この三条件が位相（topology）の定義である。**A topology is not merely the visible shape of an object; it is a rule for how continuity and neighborhoods work.**

閉集合（closed set）は、補集合が開集合になる集合。The words “open” and “closed” are not mutually exclusive here. 空集合と全体集合は両方に当てはまる。普段の言葉と違って、数学では「開いていて、同時に閉じている」こともある。数学者は扉の管理が少し独特だ。

[UCLA: Point-Set Topology](https://math.ucla.edu/~sharifi/notes/topology.html)

## 5. 「同じ形」を言い切るため、連続な対応を往復させる

Now we can define continuity without talking about numerical distance.

A map f is continuous if the preimage of every open set in its target space is open in its starting space. 日本語では、行き先の開集合の逆像（preimage）が、出発側でも開集合になるという条件だ。逆像は「指定した行き先へ写る、もとの点の集まり」。An inverse function does not need to exist for a preimage to exist.

さらに二つの空間が同相（homeomorphic）であるとは、連続な全単射 f があり、逆写像も連続であることをいう。The map is called a homeomorphism（同相写像）.

Why insist on the inverse? 0以上2π未満の角度を、円周上の点へ対応させる写像を考える。It is continuous and one-to-one, but going backwards produces a discontinuity at the seam. 円周上ではすぐ隣の点が、角度の数値では0付近と2π付近に離れてしまう。

So a continuous bijection alone is not enough. **Sameness requires a continuous journey in both directions.** マグカップとドーナツの話は、この往復できる構造に関する主張なのである。

## 6. 穴を数えるとは、見た目の空洞を指で数えることではない

A topological invariant（位相不変量）is something that does not change under homeomorphism.

たとえば連結成分の数、種数（genus）、オイラー標数（Euler characteristic）。For a connected, closed, orientable surface, the genus counts its handles. 球面は種数0、トーラス面は種数1。

The Euler characteristic satisfies **χ = 2 − 2g** for these surfaces. さらに、適切な面への分割から χ = V − E + F と計算できる。For a cube, that is 8 − 12 + 6 = 2. トーラスでは0となる。

A more advanced tool is homology（ホモロジー）, with Betti numbers（ベッチ数）describing different kinds of independent holes. ここでよくある誤解に遭遇する。**The torus has genus 1, but its first Betti number is 2.**

「穴が一つ」という日常表現と、「独立な輪が二方向ある」という数学的な数え方は別物だ。The lesson is simple but surprisingly important: **before counting holes, define what counts as a hole.**

[MathWorld: Euler Characteristic](https://mathworld.wolfram.com/EulerCharacteristic.html) / [Betti Number](https://mathworld.wolfram.com/BettiNumber.html)

## 7. メビウスの帯は、「表と裏」が当たり前ではないことを教える

Take a strip of paper, give it a half twist, and tape the ends together. できるのがメビウスの帯（Möbius strip）だ。

Start tracing what you think is the front side. 一周すると、裏側に移っている。This surface is non-orientable（非向き付け可能）: we cannot choose a consistent front and back everywhere.

一方、球面やトーラス面は向き付け可能（orientable）だ。The Möbius strip also has one boundary component. だから境界のないトーラス面と同じものとして扱えない。

ここでも、数えるべき情報は「穴」だけではない。**Orientability and boundary conditions also matter.** 違いを定義すると、見た目だけでは見えていなかった分類軸が現れる。

[Math Insight: Why a Möbius strip is not orientable](https://mathinsight.org/moebius_strip_not_orientable)

## 8. 橋の問題から約一世紀半を経て、トポロジーは独立した言葉になった

Euler's 1736 paper did not contain the modern axioms of topological spaces. その後、曲面や結び目、連続性についての研究が積み重なった。

In 1847, Johann Benedict Listing（ヨハン・ベネディクト・リスティング）published *Vorstudien zur Topologie*（『トポロジーの予備研究』）. この名称が数学の中で姿を現す。

Henri Poincaré（アンリ・ポアンカレ）developed algebraic approaches in his 1895 *Analysis Situs*（『位置解析』）. 20世紀初頭にはFelix Hausdorff（フェリックス・ハウスドルフ）らの仕事が、抽象的な空間の研究を発展させた。

現在は一般位相幾何学（general topology）、代数的位相幾何学（algebraic topology）、幾何学的位相幾何学（geometric topology）などの方向がある。They overlap, but they ask different kinds of questions.

The historical story is not “someone discovered that a doughnut looks like a mug.” むしろ、形の外観を捨てても残る構造を記述するために、数学の言語そのものが精密化されていった歴史なのである。

[University of St Andrews: A History of Topology](https://mathshistory.st-andrews.ac.uk/HistTopics/Topology_in_mathematics/)

## 9. ポアンカレ予想は、輪が縮められることから宇宙の形へ飛躍した

In 1904, Poincaré asked a difficult question about three-dimensional closed manifolds. 三次元の閉じた多様体が単連結（simply connected）なら、三次元球面（3-sphere）と同相なのか、という問題だ。

単連結とは、直観的には、空間の中のどんな閉じた輪も空間の外へ出ず一点へ縮められること。On the surface of an apple, such loops can shrink. On a torus surface, a loop going around the central hole cannot.

ただし、これは二次元での直観的な比喩で、ポアンカレ予想の対象である三次元球面を直接表してはいない。A 3-sphere is not the ordinary two-dimensional surface of a ball; it is a three-dimensional space.

Grigori Perelman（グリゴリー・ペレルマン）posted major papers in 2002–2003. リチャード・ハミルトン（Richard Hamilton）のリッチフロー（Ricci flow）などを土台とする証明が検証され、問題は解決された。The Clay Mathematics Institute recognized the solution and announced a prize in 2010; Perelman declined the prize money.

This is an instructive twist. トポロジーの問題が、曲率という幾何学的な道具によって解かれた。**Different mathematical languages can cooperate when the question demands it.**

[Clay Mathematics Institute: Poincaré Conjecture](https://www.claymath.org/millennium/poincare-conjecture/) / [Ricci Flow and the Poincaré Conjecture](https://www.claymath.org/resource/ricci-flow-and-the-poincare-conjecture/)

## 10. データ解析では、ノイズの中に残る輪の「寿命」を見る

Real data rarely forms a perfect circle. 観測点は欠けるし、測定誤差でずれる。That is where topological data analysis（位相的データ解析、TDA）becomes interesting.

One central technique is persistent homology（持続的ホモロジー）. 点群の周りに小さな円盤を置き、半径を少しずつ増やす様子を考える。At a small scale, the dots are separate. At an intermediate scale, they form a ring. At a larger scale, the center is filled.

![点群の尺度と輪の誕生・消滅を示す概念図](https://silovar-uk.github.io/myessays/assets/topology-scales-2026.svg)

*Figure 3. A conceptual example of features appearing and disappearing across spatial scales; not a numerical calculation.*

その特徴が現れた尺度と消えた尺度を、持続図（persistence diagram）やバーコード表示（persistence barcode）として記録できる。**The aim is to track structures across scales rather than trust a single threshold.**

But persistence is not the same as importance. 長く残った輪が、現実の意味ある現象を表すとは限らない。Results depend on the distance measure, representation, missing observations, and modeling choices.

数学的な特徴を正確に測ることと、その特徴の意味を正確に理解することは別なのだ。

[Academic review: Topological Data Analysis Beyond Persistent Homology](https://pmc.ncbi.nlm.nih.gov/articles/PMC12931839/)

## 11. 物理学の「トポロジカル」は、ドーナツ職人の技術ではない

In 2016, the Nobel Prize in Physics went to David J. Thouless（デイヴィッド・サウレス）, F. Duncan M. Haldane（ダンカン・ホールデン）, and J. Michael Kosterlitz（マイケル・コステリッツ）for work on topological phase transitions and phases of matter.

相転移（phase transition）は条件の変化に伴う物質の状態の変化だ。Some quantum states are distinguished by topological properties, rather than by local appearance or conventional symmetry alone.

もちろん物質をドーナツのようにこねる話ではない。Still, the same broad idea appears: certain structures resist small continuous changes and can help us classify systems.

And this does not mean topology explains all of material physics. 量子力学の理論、材料の条件、実験的検証が要る。**An elegant invariant is useful only when the physical system actually supports the model.**

[Nobel Prize: 2016 Physics Press Release](https://www.nobelprize.org/prizes/physics/2016/press-release/)

## 12. スポーツ分析に持ち込むなら、まず「関係のどこを見るか」を決める

ここからは**提案（proposal）**。実在製品の実証済みの効果を述べるものではない。

For football, we could represent players as nodes and passes as edges. そこからパスの接続や、特定の選手が抜けたときの分断を調べられる。ただしこれは最初はグラフ理論やネットワーク分析（network analysis）であって、必ずしも位相的データ解析ではない。

Alternatively, player-position data over time might be analyzed across spatial scales. ただし、輪があることと戦術的に優れていることは同義ではない。Opponent positions, game state, possession, and scoring chances also matter.

The practical sequence should be: **first define the question, then select the structure, then choose the tool.** 技術の名前から逆算して問題を作らない。数学の高度さよりも、何を答えたいのかが先に来る。

## 13. 批判すべきは数学ではなく、数学が捨てた情報を忘れることである

Topology deliberately ignores information. That is both its strength and its risk.

第一に、円周と四角形の輪郭は同相でも、加工の難しさや面積、曲率は違う。A road network can be connected and still be unusably slow.

第二に、対象の定義が違えば分類も違う。A ceramic mug and a thin open paper cup do not have to share the same mathematical surface model.

第三に、位相的な特徴から直接因果は読めない。Persistent homology can identify multiscale patterns, but it does not, by itself, tell us why they arise or what action should follow.

Recent reviews point to issues such as representation choices, computational cost, missing localization, and the loss of non-topological information. こうした限界を知ることは、数学への否定ではなく、使いどころを見極めるための前提になる。

**A method that gains clarity by discarding information also creates a responsibility to say what it discarded.**

[Review of TDA methods and limitations](https://pmc.ncbi.nlm.nih.gov/articles/PMC12931839/)

## 14. 少しやりすぎる実験：「ほぼ閉じた輪」は本当に輪なのか

Draw three figures: a closed circle, a circle with a tiny gap, and a closed square.

一見すると、切れ目のある円が最も円に似ていて、四角が別物に見える。But topologically, the closed circle and the square outline are homeomorphic. The broken circle is not homeomorphic to either.

わずか一ミリの切れ目が、位相的な分類を変えてしまう。A single broken connection can matter more than a dramatic change in appearance.

What if the gap is merely a missing pixel? 画像をぼかす、点を距離で接続するなどの処理をすると、輪が見えることもある。Now the analyst must decide whether the gap is a genuine feature or measurement noise.

これは数値検証ではなく**thought experiment（思考実験）**だ。Yet it explains why rigorous topology and noisy real-world analysis need different layers of reasoning.

## 15. 使える知識として残すなら、四つの問いだけは忘れない

実務への提案として、数学の公式より先に使える四つの問いがある。

- **Object — 対象：** What are the points, relationships, or spaces? 選手、パス、軌跡、時間のどれか。
- **Equivalence — 同一性：** Which differences are we allowed to ignore? 距離、角度、速度、順番のどれを捨てるか。
- **Invariant — 不変量：** Which property must remain visible? 接続、輪、種数、独立した構造など。
- **Validation — 妥当性：** Does this property matter for the decision? 反例や他のデータで確かめたか。

**Analysis is not only about seeing more. It is also about choosing what we can safely stop seeing.** この選択には、技術だけでなく判断の責任がある。

## 16. ドーナツに戻る。「同じ」は、何も違わないという意味ではなかった

A doughnut is still not a practical coffee mug. 当たり前だ。素材も用途も味も違う。

But they can belong to the same topological class under a carefully specified model. それは、どちらもすべての面で同じという意味ではない。**Sameness is always sameness with respect to something.**

私たちは分析や議論の中で、毎日のように「これは同じだ」「あれは違う」と言う。Topology invites one extra question: *Which features are you preserving when you say that?*

ドーナツを見る目が変わらなくても、「同じ」という言葉を使う前に条件を確かめたくなる。That, more than the coffee-mug joke, is what makes topology worth learning.

---

## 用語の補助線 / Compact Glossary

- 位相（topology）：The collection of open sets satisfying the three axioms.
- 位相空間（topological space）：点の集合と位相を組み合わせた対象。
- 開集合（open set）：A member of the chosen topology.
- 連続写像（continuous map）：行き先の開集合の逆像が開集合になる写像。
- 同相（homeomorphic）：There is a bijection continuous in both directions.
- 連結（connected）：空間を二つの空でない互いに交わらない開集合に分割できない性質。
- コンパクト（compact）：Every open cover has a finite subcover. 実数空間では閉かつ有界と同値。
- ホモトピー（homotopy）：A continuous deformation between maps; homotopy equivalence is weaker than homeomorphism.
- 位相不変量（topological invariant）：同相な対象で保存される性質。
- 持続的ホモロジー（persistent homology）：Track the birth and death of topological features across scales.

## 調査・検証 / Research Notes

初回の調査では、数学的定義、数学史、ポアンカレ予想、物質の位相的性質、位相的データ解析の資料を確認した。The follow-up review focused on hidden modeling assumptions in the mug analogy, the distinction between graph theory and general topology, genus versus Betti numbers, and the limitations of TDA.

Factual claims and established definitions are source-grounded. スポーツへの応用案、分析設計、最後の哲学的解釈は提案・考察であり、実測の効果を主張していない。

## 参考資料 / Sources

1. [UCLA: Point-Set Topology](https://math.ucla.edu/~sharifi/notes/topology.html)
2. [Mathematical Association of America: The Königsberg Bridge Problem](https://old.maa.org/press/periodicals/convergence/leonard-eulers-solution-to-the-konigsberg-bridge-problem)
3. [University of St Andrews: A History of Topology](https://mathshistory.st-andrews.ac.uk/HistTopics/Topology_in_mathematics/)
4. [Wolfram MathWorld: Euler Characteristic](https://mathworld.wolfram.com/EulerCharacteristic.html)
5. [Wolfram MathWorld: Betti Number](https://mathworld.wolfram.com/BettiNumber.html)
6. [Math Insight: Möbius Strip](https://mathinsight.org/moebius_strip_not_orientable)
7. [Clay Mathematics Institute: Poincaré Conjecture](https://www.claymath.org/millennium/poincare-conjecture/)
8. [The Nobel Prize in Physics 2016](https://www.nobelprize.org/prizes/physics/2016/press-release/)
9. [Research Review: Topological Data Analysis](https://pmc.ncbi.nlm.nih.gov/articles/PMC12931839/)
10. [Moore (2007): The evolution of homeomorphism](https://www.sciencedirect.com/science/article/pii/S0315086006000863)

*Research reference date: October 23, 2026. All diagrams are original conceptual illustrations created for this essay.*
