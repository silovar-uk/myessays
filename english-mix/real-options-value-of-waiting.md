---
id: real-options-value-of-waiting
title: "リアルオプションは「まだ決めない」に値段をつける"
subtitle: "Why a positive NPV can still justify waiting"
abstract: "投資案件のNPVがプラスでも、waitが合理的なことがある。Real optionsは、irreversibility, learning, and managerial flexibilityがあるとき、future choice itself has valueと考える。本稿では古典研究、two-state thought experiment、competition、valuation limitsを通じて、「何を今決め、何を未来に残すか」を考える。"
---

# リアルオプションは「まだ決めない」に値段をつける
## Why a positive NPV can still justify waiting

<!-- level:4 role:claim -->
投資案件の価値が110、費用が100なら、正味現在価値（Net Present Value: NPV）は+10。普通なら「今すぐやる」で終わる。But real options adds one strange possibility: **a positive NPV project may still be worth waiting for.**

<!-- level:2 role:description -->
なぜか。投資判断はone-shot scoringではなく、timeの中で更新されるchoiceだからだ。今日100を払えば、明日「市場が悪かった」と分かっても、その100は戻らない。If you can wait, observe, and still keep the right to invest, you can act after good news and walk away after bad news.

<!-- level:1 role:evidence -->
ロバート・マクドナルド（Robert L. McDonald）とダニエル・シーゲル（Daniel Siegel）は、irreversible investmentでは単純な「benefit exceeds cost, therefore invest」という基準がthe option value of waitingを落とすと示した。条件によっては、benefitsがinvestment costの約2倍になるまで待つことさえ最適になりうる。

<!-- level:3 role:analysis -->
つまり「何もしない」はalways zeroではない。待つ間にprice, demand, technology, regulationについてnew informationが入り、しかもthe right to actが残るなら、未実行の状態そのものがvalueを持つ。This is not mere hesitation. It is preserving an asymmetric payoff.

<!-- level:5 role:implication -->
リアルオプションが値段をつけようとするのは、assetだけではない。**It tries to value the ability to revise a future decision.** 本稿では、その能力がいつ本当のvalueになり、いつ単なる先延ばしになるのかを見ていく。

[McDonald & Siegel — The Value of Waiting to Invest, NBER](https://www.nber.org/papers/w1019)

---

## 1. A real option is a future right embedded in a real investment

<!-- level:4 role:claim -->
リアルオプション（real option）を最短で言えば、実物資産や事業投資に埋め込まれた「future actionを選べる権利」である。The key phrase is simple: **a right, not an obligation.**

<!-- level:2 role:description -->
金融のコール・オプション（call option）は、決められた条件でassetを買う権利を持つが、不利ならexerciseしなくてよい。リアルオプションでは、対象がfactory, mine, R&D program, market entry, land development, or information systemになる。将来の本格投資額が、exercise priceに近い役割を持つ。

<!-- level:1 role:evidence -->
スチュワート・マイヤーズ（Stewart C. Myers）は1977年、企業のgrowth opportunitiesをreal assetsへの選択権として捉え、「real options」という語を導入したとされる。面白いのは、the term did not debut in a paper titled “Real Options.” 論文題名は企業の借入行動を扱う「Determinants of Corporate Borrowing」だった。

<!-- level:3 role:analysis -->
この出自は大事で、リアルオプションは最初からa fancy calculatorだったわけではない。企業価値には、いま稼働中のassetだけでなく、managementが後でexerciseするかもしれないfuture opportunitiesも含まれる、という見方から始まっている。

<!-- level:5 role:implication -->
だから最初に聞くべきは“Which formula?”ではない。**What future choice exists, when can it be exercised, and who controls it?** 選び直せる権利がなければ、optionの話はかなり弱くなる。

[Myers — Determinants of Corporate Borrowing](https://doi.org/10.1016/0304-405X(77)90015-0)  
[MIT Press — Lenos Trigeorgis, Real Options](https://mitpress.mit.edu/9780262201025/real-options/)

---

## 2. DCF is not blind to uncertainty; it can miss the right to change the plan

<!-- level:4 role:claim -->
Real options theoryは、割引現在価値法（Discounted Cash Flow: DCF）を否定する話ではない。DCF is usually the base layer. 問題になるのは、future planを固定したまま評価する一方で、現実のmanagementは途中で行動を変えるところだ。

<!-- level:2 role:description -->
DCFはfuture cash flowsをpresent valueへ戻し、initial investmentを差し引く。これは非常に強い。一方で実際の会社は、marketが崩れれば撤退し、demandが伸びれば増産し、trialが失敗すればR&Dを止める。The actual decision path is conditional.

<!-- level:1 role:evidence -->
ティモシー・リュールマン（Timothy A. Luehrman）は、strategyはone predetermined cash-flow streamというよりa portfolio of optionsに近いと論じた。ブリアリー、マイヤーズ、アレンらも、real-option valuationはDCFのreplacementではなくcomplementとして使うのが普通だと整理している。

<!-- level:3 role:analysis -->
DCFでもpessimistic, base, optimisticのscenarioは置ける。差はそこではない。**After you see which scenario is emerging, can you change what you do?** 同じ確率分布でも、bad stateで止められる会社と、止められない会社ではvalueが違う。

<!-- level:5 role:implication -->
だからreal optionsの問いは「未来を当てられるか」ではない。**Can we design the commitment so that being wrong hurts less and being right can still scale?** ここでfinanceがdecision designへ近づく。

[Luehrman — Strategy as a Portfolio of Real Options](https://hbr.org/1998/09/strategy-as-a-portfolio-of-real-options)  
[Brealey, Myers, Allen on Real Options](https://doi.org/10.1111/J.1745-6622.2008.00204.X)

---

## 3. Same average, wider outcomes: flexibility can turn volatility into value

<!-- level:4 role:claim -->
「不確実性が大きいほどoption valueが高い」と聞くと、かなり怪しい。More uncertainty is usually scary. ここは数式の前に、極端に単純なtwo-state experimentで構造だけ見る。

<!-- level:2 role:description -->
今日、project valueが110、costが100ならimmediate NPVは+10。次に、1年待ってmarketを観察しても100で投資できるとする。割引率、待つ間のlost cash flow、税、資金調達は無視する。**This is not a pricing model. It is a structural toy.**

<!-- level:1 role:evidence -->
Case A。未来が120か100にhalf-and-halfで分かれる。120なら投資して20、100なら差額0なので、expected exercise surplusは10。  
Case B。平均110は同じまま、未来が150か70に分かれる。150なら投資して50、70ならdo not exercise。Expected surplus is 25.

<!-- level:3 role:analysis -->
平均は同じなのにoption valueは変わる。Why? 下側ではnon-exerciseで損失を切り、upsideだけ残せるからだ。行使価値を単純化すると「V－Iと0のうち大きい方」になる。That convex shape is the source of the asymmetry.

<!-- level:5 role:implication -->
ただし結論は“uncertainty is good”ではない。**Uncertainty creates option value only when you possess a usable right to avoid bad states and capture good ones.** Cost uncertainty, competition, expiry, or irreversible follow-on commitments can move value the other way.

[Damodaran — Limitations of Real Option Pricing Models](https://pages.stern.nyu.edu/~adamodar/pdfiles/option.pdf)  
[van Putten & MacMillan — Making Real Options Really Work](https://pubmed.ncbi.nlm.nih.gov/15605572/)

---

## 4. Real options become practical when you translate them into six verbs

<!-- level:4 role:claim -->
“Option”は抽象的に聞こえる。It gets practical when translated into verbs. 何を未来で選び直せるかを、動詞として見る。

<!-- level:2 role:description -->
代表的な形は次の六つ。

1. 延期（defer）— wait before committing
2. 段階投資（stage）— evidenceを見ながらstep by stepで進む
3. 拡張（expand）— successの後にscaleする
4. 縮小（contract）— conditionsが悪化したらexposureを減らす
5. 撤退（abandon）— stopして追加損失を防ぐ
6. 転換（switch）— input, output, technology, or useを切り替える

<!-- level:1 role:evidence -->
レノス・トリゲオルギス（Lenos Trigeorgis）は、defer, expand, contract, abandon, switchをmanagerial flexibilityの代表的な形として整理している。多段階R&Dでは、一つのstageを終えることが次のstageへ進むrightを生み、compound optionとして扱われることもある。

<!-- level:3 role:analysis -->
ここで「100の投資」の意味が変わる。一括で戻れない100と、first spend 10 to learn, then decide whether to spend 90は同じではない。The first 10 may be buying information plus a future right.

<!-- level:5 role:implication -->
Real-options thinkingが実務になるのは、“What is this project worth?”から、**“Which future verbs can we embed in this project?”** へ問いが変わるときだ。

[MIT Press — Lenos Trigeorgis, Real Options](https://mitpress.mit.edu/9780262201025/real-options/)  
[Schwartz & Trigeorgis — Real Options and Investment under Uncertainty](https://mitpress.mit.edu/9780262194464/real-options-and-investment-under-uncertainty/)

---

## 5. Option value matters when irreversibility, uncertainty, learning, and discretion meet

<!-- level:4 role:claim -->
Not every uncertain project deserves real-options treatment. 価値が大きくなりやすいのは、four conditionsが重なるときだ。

<!-- level:2 role:description -->
1. 不可逆性（irreversibility）— committed moneyが戻りにくい  
2. 不確実性（uncertainty）— demand, price, technology, regulation, costが未確定  
3. 学習（learning）— waiting or experimentingでuseful informationが増える  
4. 裁量（discretion）— informationを見た後にactionを変えられる

<!-- level:1 role:evidence -->
ロバート・ピンディク（Robert S. Pindyck）は、多くのinvestmentがlargely irreversibleである一方、delayableでもあり、companyはprice, cost, and market informationを待てると整理した。この組み合わせがinvestment thresholdを変える。

<!-- level:3 role:analysis -->
簡単に取り消せる支出なら、waiting rightはそれほど貴重ではない。時間がたっても何もlearnできないなら、waiting is mostly delay。情報を得てもcontractやorganizationの都合でactionを変えられないなら、learning cannot be converted into value.

<!-- level:5 role:implication -->
最初に聞くべきは“How uncertain is this?”ではない。**What will we learn, when will we learn it, and what can we do differently then?** この3問でoptionの輪郭がかなり見える。

[Pindyck — Irreversibility, Uncertainty, and Investment, NBER](https://www.nber.org/papers/w3307)

---

## 6. Waiting is not free: competition can eat the option

<!-- level:4 role:claim -->
ここまでだとpatienceが全部正しく見える。But waiting has carrying costs. Real optionsは「いつまでも決めなくていい」という免罪符ではない。

<!-- level:2 role:description -->
待つ間にlost cash flowが出る。Patent lifeが短くなる。Competitorsがmarket shareを取る。先行者がstandardを押さえる。人材が離れる。An option has an effective expiry, and keeping it alive can cost money.

<!-- level:1 role:evidence -->
バンクーバーの集合住宅開発1,214件を使った研究では、higher uncertaintyはinvestment delayと整合的だった一方、local competitionが増えるとwaiting effectが弱くなった。Steven Grenadierのmodelsでも、competition can sharply erode the value of waiting.

<!-- level:3 role:analysis -->
さきほどのtoy modelへcompetitionを入れる。好況なら150だったvalueが、待つ間の競合参入で115までしか取れないとする。100で投資する差額は15。悪況70ならexerciseしない。半々ならcrude expected surplusは7.5で、immediate +10を下回る。

<!-- level:5 role:implication -->
つまり戦略の問題はflexibility versus rigidityではない。**It is when to buy flexibility and when to buy commitment.** Proprietary opportunityならwaitingが強く、contestable marketならmoving firstが勝つこともある。

[Bulan, Mayer & Somerville — Irreversible Investment, Real Options, and Competition, NBER](https://www.nber.org/papers/w12486)  
[Grenadier — Option Exercise Games](https://www.gsb.stanford.edu/faculty-research/publications/option-exercise-games-application-equilibrium-investment)

---

## 7. From a 1977 borrowing paper to a language of strategy

<!-- level:4 role:claim -->
リアルオプションはmanagement buzzwordとして生まれたわけではない。It grew where option-pricing theory met irreversible investment, then moved into strategy.

<!-- level:2 role:description -->
1970年代にfinancial option valuationが大きく進み、1977年にMyersがreal optionsという語を使った。1980年代にはnatural resources, mines, oil, land developmentなど、price volatilityとinvestment timingが重要な分野で研究が進んだ。1990年代にはAvinash K. Dixit, Robert S. Pindyck, Lenos Trigeorgisらがinvestment under uncertaintyを体系化した。

<!-- level:1 role:evidence -->
1998年、LuehrmanはR&D, new markets, phased plant expansionをoptionsの集合として経営者向けに説明した。その後、strategic-management researchではjoint ventures, foreign direct investment, R&D, entrepreneurshipにもreal-options reasoningが広がった。

<!-- level:3 role:analysis -->
この歴史のせいで、現在の“real options”には二つの使われ方が共存する。一つはformal valuation with option-pricing machinery。もう一つは、staged commitmentとfuture choiceを整理するstrategic reasoning frameworkである。

<!-- level:5 role:implication -->
だから“We should use real options”と言われたら、まず一つ確認したい。**Do we want to price flexibility, or design flexibility?** 同じ言葉でも仕事が違う。

[Myers — Determinants of Corporate Borrowing](https://doi.org/10.1016/0304-405X(77)90015-0)  
[Dixit & Pindyck — Investment under Uncertainty, Princeton University Press](https://press.princeton.edu/books/hardcover/9780691034102/investment-under-uncertainty)  
[Luehrman — Investment Opportunities as Real Options](https://hbr.org/1998/07/investment-opportunities-as-real-options-getting-started-on-the-numbers)

---

## 8. There are formulas, but real assets do not reveal inputs as politely as stocks do

<!-- level:4 role:claim -->
Real options can be valued quantitatively. ただし“plug numbers into Black–Scholes and done”は危ない。

<!-- level:2 role:description -->
方法にはbinomial lattice, decision tree, dynamic programming, Black–Scholes-type model, Monte Carlo simulationなどがある。どれもfuture statesとconditional actionsを数量化する試みだ。

<!-- level:1 role:evidence -->
アスワス・ダモダラン（Aswath Damodaran）が指摘する大問題は、underlying real assetがoften not tradedなことだ。工場やR&D projectにはstock market priceがない。だからmarket valueやvolatilityを直接観測しにくく、replicating portfolioも作りにくい。

<!-- level:3 role:analysis -->
さらにproject valueはjumpするかもしれず、investment cost自体もuncertain、competitionも反応する。More complexity does not automatically mean more truth. 数学が精密でも、inputがほぼjudgmentならoutputの小数点は安心材料にならない。

<!-- level:5 role:implication -->
実務ではlayered approachがよい。まずbaseline DCF、次にscenarioやdecision treeでimportant flexibilityを可視化し、materialな案件だけheavy option modelへ進む。**Precision of output is not reliability of input.**

[Damodaran — Real Options](https://pages.stern.nyu.edu/~adamodar/pdfiles/papers/realopt.pdf)  
[ScienceDirect overview — Real Options Analysis](https://www.sciencedirect.com/topics/economics-econometrics-and-finance/real-options-analysis)

---

## 9. If everything is an “option,” the concept explains nothing

<!-- level:4 role:claim -->
リアルオプションは便利すぎる。“This project has future potential.” これだけで何でもvalueがありそうに見えてしまう。

<!-- level:2 role:description -->
でもsequential investmentだけで自動的にreal optionになるわけではない。Future choice, exercise window, information signal, additional investment, abandonment rule, residual valueをある程度定義できる必要がある。

<!-- level:1 role:evidence -->
ロン・アドナー（Ron Adner）とダニエル・レビンサル（Daniel A. Levinthal）は、explorationでchoice setそのものが際限なく変わり、abandonment decisionも構造化されていない場合、real optionとgeneric path dependenceの区別が難しくなると批判した。25年間のempirical research reviewでも、managerial traitsやmultiple uncertaintiesなど未解決の問いが残る。

<!-- level:3 role:analysis -->
「将来の可能性」はまだvalueではない。You need a controlled right: scope, expiry, cost, signal, and exercise condition. ここが曖昧なままoption valueを足すと、unattractive DCFをstoryで持ち上げる飾りになりうる。

<!-- level:5 role:implication -->
Real options are not a technique for pricing dreams. **夢をconditional and governableなrightへ分解する技術**と考えた方が安全だ。

[Adner & Levinthal — What Is Not A Real Option](https://journals.aom.org/doi/10.5465/amr.2004.11851715)  
[Ipsmiller et al. — 25 Years of Real Option Empirical Research in Management](https://onlinelibrary.wiley.com/doi/full/10.1111/emre.12324)

---

## 10. In practice, design the option before you value it

<!-- level:4 role:claim -->
一番実務的なshiftは、projectを後から評価するだけでなく、**future decisionsが残るようにproject自体をdesignすること**かもしれない。

<!-- level:2 role:description -->
全国展開の前にone-region pilotをする。Long fixed contractだけでなくscale-up / scale-downできる条項を持つ。Systemをmodularにする。Advertisingやeventならsmall testでresponseを観測し、defined thresholdを超えたら追加budgetを出す。

<!-- level:1 role:evidence -->
Pharmaceutical R&Dは典型例で、pre-clinicalやclinical stagesがnew informationを生み、bad resultならstop、successならcontinueできる。日本オペレーションズ・リサーチ学会の日本シェーリング事例でも、ability to stop or modify the projectを組み込むことで、ordinary NPVとは異なるvalueが示された。

<!-- level:3 role:analysis -->
重要なのは“start small”そのものではない。A pilot with no predefined next decision is just a small pilot. 「何をlearnするか」「どのmetricなら追加投資か」「どのconditionならabandonか」「いつまでrightが残るか」を定義して初めてoptionらしくなる。

<!-- level:5 role:implication -->
ここでfinance turns into design. **Flexibility is not a personality trait; it can be engineered into contracts, modules, stages, and decision gates.**

[日本オペレーションズ・リサーチ学会 — REAL OPTIONS AND THE EVALUATION OF RESEARCH AND DEVELOPMENT PROJECTS IN THE PHARMACEUTICAL INDUSTRY](https://www.jstage.jst.go.jp/article/jorsj/45/4/45_KJ00003228996/_article/-char/en)  
[McGrath & Nerkar — Real Options Reasoning and R&D Investment Strategies](https://business.columbia.edu/faculty/research/real-options-reasoning-and-new-look-rd-investment-strategies-pharmaceutical-0)

---

## 11. Conclusion: give your future self a choice

<!-- level:4 role:claim -->
最初の変な話へ戻る。Positive NPVなのにwaitした方がよいことがある。これはnumbersを無視する話ではない。One number may describe only one commitment path.

<!-- level:2 role:description -->
Real optionsが効くのは、investmentがhard to reverseで、futureがuncertainで、learningが起こり、managementにdefer, stage, expand, contract, abandon, switchのdiscretionがあるときだ。

<!-- level:1 role:evidence -->
同時にwaitingにはlost cash flowがあり、competitionがあり、expiryがあり、cost uncertaintyがある。Real assets are often non-traded, so valuation inputs are hard to observe. Flexibility is valuable, not magical.

<!-- level:3 role:analysis -->
調べる前、real optionsは「advanced math for uncertain investments」に見えていた。調べた後は少し違う。**Do not obsess over predicting the future; design today's commitments so future information can still change action.**

<!-- level:5 role:implication -->
「まだ決めない」はnot decidingではない。何をnow fixedにし、何をfuture contingentに残すかを決めている。That is what a real option ultimately prices: **a choice deliberately handed to your future self.**

---

## Research Note / 調査ノート

### Confirmed facts / 確認した事実

1. “Real options”という語はMyersの1977年論文に由来するとされる。
2. McDonald and Siegel showed that waiting can have material option value in irreversible investment.
3. Pindyckはirreversibility, uncertainty, delayabilityの関係を整理した。
4. Common real options include defer, expand, contract, abandon, and switch.
5. Competition can erode waiting value and accelerate investment.
6. Non-traded underlying assets make value and volatility difficult to estimate.
7. 実証研究にはsupporting evidenceがある一方、適用境界とimplementation questionsは残る。

### Interpretation / 本稿の解釈

1. 110/120/100/150/70/115の例はthought experimentであり、actual option priceではない。
2. “Giving your future self a choice”は理解補助のmetaphor。
3. “Design the option first, value it second”は本稿のpractical proposal。

### Caveats / 注意

1. More uncertainty does not automatically mean more project value.
2. “Base NPV + flexibility value” is useful intuition, but interacting options may not be simply additive.
3. Black–Scholes-type models should not be mechanically transplanted into real projects.

---

## Reusable Prompt / 再利用プロンプト

    You are a corporate-finance analyst specializing in investment under uncertainty.
    対象案件をreal-options lensで分析してください。

    1. Baseline project: purpose, initial investment, cash flows, ordinary NPV.
    2. 何がirreversibleかを特定する。
    3. Uncertaintyをdemand, price, technology, regulation, cost, competitionに分ける。
    4. 時間がたつと何をlearnできるかを明示する。
    5. Future actionsをdefer, stage, expand, contract, abandon, switchに分類する。
    6. 各optionのexpiry, follow-on investment, exercise trigger, abandonment trigger, residual valueを置く。
    7. Cost of waiting: lost cash flow, expiry, competitive erosion, first-mover effects.
    8. “More uncertainty = more value”と単純化せず、revenue-sideとcost-sideを分ける。
    9. まずtwo-state thought experiment or decision treeで直感を確認し、必要ならbinomial, dynamic programming, simulationへ進む。
    10. 最後に反証する。Is this truly a real option, or merely sequential investment or procrastination?

    Facts, assumptions, interpretations, proposalsを分ける。
    DCF and real options are complementary: DCF for base value, real-options analysis for flexibility.

---

## Sources

- [Stewart C. Myers — Determinants of Corporate Borrowing](https://doi.org/10.1016/0304-405X(77)90015-0)
- [Robert L. McDonald & Daniel Siegel — The Value of Waiting to Invest, NBER](https://www.nber.org/papers/w1019)
- [Robert S. Pindyck — Irreversibility, Uncertainty, and Investment, NBER](https://www.nber.org/papers/w3307)
- [Lenos Trigeorgis — Real Options, MIT Press](https://mitpress.mit.edu/9780262201025/real-options/)
- [Eduardo S. Schwartz & Lenos Trigeorgis — Real Options and Investment under Uncertainty, MIT Press](https://mitpress.mit.edu/9780262194464/real-options-and-investment-under-uncertainty/)
- [Timothy A. Luehrman — Investment Opportunities as Real Options](https://hbr.org/1998/07/investment-opportunities-as-real-options-getting-started-on-the-numbers)
- [Timothy A. Luehrman — Strategy as a Portfolio of Real Options](https://hbr.org/1998/09/strategy-as-a-portfolio-of-real-options)
- [Laarni Bulan, Christopher Mayer & C. Tsuriel Somerville — Irreversible Investment, Real Options, and Competition, NBER](https://www.nber.org/papers/w12486)
- [Steven Grenadier — Option Exercise Games](https://www.gsb.stanford.edu/faculty-research/publications/option-exercise-games-application-equilibrium-investment)
- [Aswath Damodaran — Real Options](https://pages.stern.nyu.edu/~adamodar/pdfiles/papers/realopt.pdf)
- [Ron Adner & Daniel A. Levinthal — What Is Not A Real Option](https://journals.aom.org/doi/10.5465/amr.2004.11851715)
- [25 Years of Real Option Empirical Research in Management](https://onlinelibrary.wiley.com/doi/full/10.1111/emre.12324)
- [日本オペレーションズ・リサーチ学会 — REAL OPTIONS AND THE EVALUATION OF RESEARCH AND DEVELOPMENT PROJECTS IN THE PHARMACEUTICAL INDUSTRY](https://www.jstage.jst.go.jp/article/jorsj/45/4/45_KJ00003228996/_article/-char/en)
