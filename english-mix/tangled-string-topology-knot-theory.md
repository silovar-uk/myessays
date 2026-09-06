---
id: tangled-string-topology-knot-theory
title: "「ひもが絡む」はTopologyで理解できるのか？"
subtitle: "Knot theoryを調べたら、イヤホンの絡まりは数学だけでは足りなかった"
created: "2026-09-07"
updated: "2026-09-07"
type: "Essay"
status: "完成"
tags: ["数学", "トポロジー", "結び目理論", "物理", "日常", "科学"]
keywords: ["topology", "knot theory", "knot", "link", "braid", "tangle", "knotoid", "Reidemeister moves", "physical entanglement", "spontaneous knotting"]
favorite: 5
grow: 5
abstract: "ひも、earphones、necklaceはなぜ絡むのか。Knot theoryを辿ると、数学でいうknotは原則としてclosed loopで、日常のopen stringとは少し違う。knot、link、braid、tangle、knotoidを整理し、Reidemeister movesや実際にstringを箱で振った実験まで見ると、現実の『ほどけない』はtopologyだけでなく、geometry、friction、thickness、stiffness、endpoints、confinementが重なった現象として見えてくる。"
---

# 「ひもが絡む」はTopologyで理解できるのか？
## Knot theoryを調べたら、イヤホンの絡まりは数学だけでは足りなかった

数学者にshoelaceを見せる。

蝶結びになっている。

Looks tied.

でも、strictなknot theoryの意味では、**これはknotではない。**

Why?

端があるから。

両端を自由にmoveできるなら、cutせずに最終的にはほどける。

Natureのknot theory書評でも、日常の普通の靴ひもはmathematical knotではない、という説明が出てくる。

いや、朝の自分からすると、

「Mathematically, it can be untied.」

では何も解決していない。

Earphonesも同じ。

カバンに入れたときは一本だったのに、取り出すとancient ritualみたいなshapeになっている。

Mathematically untangled.

Practically impossible.

このgapは何なのか。

「ものが絡む」は、topologyでどこまで理解できるのか。

---

## 1. Topology asks what survives deformation

Topologyは、stretchしたりbendしたりしても変わらないpropertiesを見る。

有名なのは、donutとhandle付きmugの話。

どちらもholeが一つなので、cuttingやgluingなしでcontinuous deformationできる。

Knot theoryも似たルールで考える。

見るのは、長さや曲率そのものではなく、

**Can it be deformed without cutting, gluing, or passing through itself?**

という問い。

ぐちゃぐちゃに見えるclosed loopでも、ゆっくり変形してcircleに戻せるなら**unknot**。

つまり、

```text
Looks complicated   ≠   Topologically complicated
Many crossings      ≠   Truly knotted
Looks tangled       ≠   Cannot be untangled
```

日常語の「絡む」と、早くもズレる。

---

## 2. Classical knotは、そもそもclosed loop

古典的なknotは、ざっくり言えば3D spaceに埋め込まれた一本のclosed loop。

No endpoints.

```text
Open string
●────────────●

Classical knot
   ╭──────╮
   ╰──────╯
```

Open stringは、endsを自由に動かせるなら、端から抜いていける。

だから見た目がものすごくcomplexでも、classical topologyでは最終的にtrivialになり得る。

Scientific Reportsのopen-curve研究でも、open curvesはtechnicalにはclassical knotsではないとされる。

Protein chainsのようなopen structuresを扱うときは、endsを仮想的にcloseしたり、**knotoid**のようなframeworkを使ったりする。

ここで問題設定が変わる。

Mathematicianが知りたいのは、

“Can it ever be untied?”

僕らが知りたいのは、

“Can I untie this before leaving home?”

Same string, different question.

---

## 3. “Tangled”を5つに分解する

絡まり周辺のvocabularyを並べると、かなり見通しがよくなる。

```text
KNOT
一本のclosed loopそのものが結ばれている

LINK
複数のclosed loopsが互いに離せない

BRAID
複数のstrandsが一定方向に進みながらcrossする

TANGLE
固定されたendpointsを持つ局所的な絡まり

OPEN-CURVE / PHYSICAL ENTANGLEMENT
端のある現実のstringが物理的にほどきにくい状態
```

### Knot

The classic object.

Trefoil knotは最も単純なnontrivial knotで、minimum crossing numberは3。

### Link

Each loop can be simple, but together they cannot separate.

二つの輪が鎖みたいにつながるHopf linkが代表例。

### Braid

Braid theoryは、絡まりをstatic shapeではなく**sequence of crossings**として見る。

“strand 1 crosses strand 2”を積み重ねてalgebraとして扱える。

### Tangle

ある領域だけ切り出して、boundary上のendpointsを固定し、その内部の絡まりを見る。

「ここだけ異常にぐちゃぐちゃ」に近い。

### Open curve / physical entanglement

Earphones、shoelaces、cables、protein chains。

This is our world.

端があるためclassical knot theoryだけでは足りず、closure methodsやknotoids、physical-linkの考え方が必要になる。

---

## 4. Reidemeister moves: 絡まりを変えない3つのmove

Knot diagramには、knot typeを変えずに行える基本変形がある。

**Reidemeister moves**。

ざっくり言うと、

```text
I   小さなtwistを作る／消す
II  2 crossingsを同時に作る／消す
III crossingの横を別strandがslideする
```

AMSの解説では、equivalentなknot diagramsはplane deformationとReidemeister movesの列で移り合えるという形で説明される。

これ、日常の「ほどく」にかなり近い。

You are not allowed to cheat.

Cutしない。

Strandをghostのようにすり抜けさせない。

Allowed movesだけでsimpleなshapeへ戻す。

ただし数学のstringには、frictionもthicknessもstiffnessもない。

数学のひも、めちゃくちゃ素直である。

---

## 5. Crossingを数えるだけでは足りない

Maybe complexity = number of crossings?

と思うが、それも違う。

同じknotでも余計にtwistさせればcrossingsは増やせる。

だから**crossing number**は、すべてのdiagramの中で必要になるminimum crossingsで定義する。

Linksには**linking number**というinvariantもある。

Hopf linkはlinking number 1。

ところがWhitehead linkは、明らかにnontrivialに絡んでいるのにlinking number 0。

つまり、

**zero does not mean unlinked.**

一個のmetricだけではtanglednessを完全には表せない。

そのためAlexander polynomial、Jones polynomialなど多くのknot invariantsが発展してきた。

現実のケーブルが一目で理解できないのも、少し許せる気がする。

---

## 6. Scientists literally shook a string in a box

ここから急にactual experiment。

2007年、Dorian RaymerとDouglas SmithはPNASに

**“Spontaneous knotting of an agitated string”**

を発表した。

タイトルの意味はそのまま。

**揺らしたstringは勝手にknotを作る。**

実験ではstringをboxに入れてrotateさせた。

その後、endsを持ち上げてjoinし、どんなknotができたかをclassificationした。

3,415 trialsで、minimum crossing number 11までの**120 knot types**を観察。

Complex knotsがsecondsでできることもあった。

つまりカバンからイヤホンを取り出して、

“Who tied this?”

と思っても、answerはたぶん、

“No one.”

揺れただけ。

Long and flexible stringsを十分agitateすると、knotting probabilityは100%へ近づく傾向も報告された。

バッグの中で長いcableを自由に動かす。

Turns out, that is a pretty good knot generator.

最悪である。

---

## 7. Everyday tanglesを無理やり分類する

### A. One earphone cable

Ends are free.

Classical knotとしては最終的にuntieできる。

でもlocal knotがfrictionでtightenするとphysicalには面倒。

**Topologically trivial, physically annoying.**

### B. Two rubber bands linked like a chain

Closed loopsで、cutせず離せない。

**Topological link.**

### C. A three-strand braid

Fixed endpointsとcrossing orderを見るならbraidとして自然。

**Tangledness as an operation sequence.**

### D. Necklace chain balled up

Topologyだけでなく、chain thickness、small rings、clasp、frictionが効く。

**Topology + geometry + mechanics.**

### E. Two open cables wrapped around each other

Both ends are freeならclassical linkではない。

それでもpullするとtightenして離れにくい。

**Physical entanglement.**

日常の「絡んでいる」は、topological stateだけではなかった。

---

## 8. Real-world “cannot untangle” has at least four layers

```text
Layer 1  TOPOLOGY
Can it be removed without cutting or passing through?

Layer 2  GEOMETRY
Where are the strands, bends, contacts, and loops?

Layer 3  MECHANICS
Friction, thickness, stiffness, tension

Layer 4  DYNAMICS
Shaking, pulling, confinement, time
```

Topology gives the skeleton.

Geometry gives the current shape.

Mechanics decides whether your fingers can actually move it.

Dynamics explains how it gets worse while sitting in a bag.

Scientific Reportsのphysical-link研究でも、open chainsはclassical topological linkでは扱いにくいため、closure procedureを導入してphysical entanglementをformalizeしている。

So topology is powerful, but not sufficient.

---

## 9. 「絡む」をquestionに分解する

最初の問いは、

「ひもが絡むってtopology？」

だった。

今ならこう分ける。

```text
Q1 本当にcutなしでは離せない？
→ topology / knot theory

Q2 crossingsはどういうstructure？
→ knot diagrams / braid / tangle

Q3 なぜ今こんなにほどきにくい？
→ geometry / friction / stiffness / tension

Q4 なぜ放っておくと勝手に絡む？
→ statistical physics / dynamics / confinement
```

One word, four problems.

例えばケーブルをstrongly pullして悪化するとき、topological typeは変わっていなくても、geometryがtightになり、frictionが増え、mechanically harderになる。

だから、

**Mathematically untieable and practically easy are different things.**

ここが一番しっくりきた。

---

## 10. Earphones may be mathematically innocent

調べる前、topologyはdonutとmugの世界だった。

かなりabstract。

でもknot theoryまで降りると、急にpocketの中まで入ってくる。

A string moves.

A loop forms.

An endpoint passes through it.

Crossings accumulate.

Friction tightens them.

A human opens the bag and suffers.

ここには確かにtopologyがある。

But not only topology.

現実の絡まりは、

**topologyがskeletonを作り、geometryがshapeを与え、mechanicsがdifficultyを作り、dynamicsが勝手に悪化させる。**

そう考えると、イヤホンの団子も少し違って見える。

ただのmessではない。

Several branches of mathematics and physics collaborated inside your pocket.

しかもendsがfreeなら、数学的には最終的にほどける可能性が高い。

イヤホン側からすると、たぶんこうである。

**“Topologically, I’m already fine. Your fingers are the remaining problem.”**

腹が立つ。

But now it is a more interesting kind of annoying.

---

## Sources / 参考文献

- American Mathematical Society, *Combinatorial Knots*, Chapter 1  
  https://www.ams.org/bookstore/pspdf/stml-74-prev.pdf
- American Mathematical Society, *A Brief Introduction* — Reidemeister moves / crossing number  
  https://www.ams.org/bookstore/pspdf/gsm-209-prev.pdf
- Encyclopedia of Mathematics, “Braid theory”  
  https://encyclopediaofmath.org/wiki/Braid_theory
- Wolfram MathWorld, “Tangle”  
  https://mathworld.wolfram.com/Tangle.html
- Andrzej Stasiak (2003), “A knotty story”, *Nature*  
  https://www.nature.com/articles/421479a
- Keith Alexander, Alexander J. Taylor, Mark R. Dennis (2017), “Proteins analysed as virtual knots”, *Scientific Reports*  
  https://www.nature.com/articles/srep42300
- Dorian M. Raymer, Douglas E. Smith (2007), “Spontaneous knotting of an agitated string”, *PNAS*  
  https://pmc.ncbi.nlm.nih.gov/articles/PMC2034230/
- Luca Tubiana et al. (2017), “Physical Links: defining and detecting inter-chain entanglement”, *Scientific Reports*  
  https://www.nature.com/articles/s41598-017-01200-w
- Scientific Reports, knotoids and open protein chains  
  https://www.nature.com/articles/s41598-017-06649-3
- Wolfram MathWorld, “Linking Number” / “Whitehead Link”  
  https://mathworld.wolfram.com/LinkingNumber.html  
  https://mathworld.wolfram.com/WhiteheadLink.html
