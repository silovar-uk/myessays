---
id: real-options-value-of-waiting
title: "リアルオプションは「まだ決めない」に値段をつける"
subtitle: "NPVがプラスでも、なぜ待つ価値が生まれるのか — Why waiting can have value"
abstract: "投資案件のNPVがプラスでも、waitが合理的なことがある。Real optionsは、irreversibility, learning, and managerial flexibilityがあるとき、future choice itself has valueと考える。本稿では古典研究、two-state thought experiment、competition、valuation limitsを通じて、「何を今決め、何を未来に残すか」を考える。"
---

# リアルオプションは「まだ決めない」に値段をつける
## Why a positive NPV can still justify waiting

<!-- level:4 role:claim -->
投資案件の価値が110、費用が100なら、正味現在価値（Net Present Value: NPV）は+10。普通なら「今すぐやる」で終わる。ところがreal optionsは、ここへ妙な可能性を足す。**Even with positive NPV, waiting can be rational.**

<!-- level:2 role:description -->
なぜか。投資判断はone-shot scoringではなく、timeの中で更新されるchoiceだからだ。今日100を払えば、明日「市場が悪かった」と分かっても、その100は戻らない。If you can wait, observe, and still keep the right to invest, you can act after good news and walk away after bad news.

<!-- level:1 role:evidence -->
ロバート・マクドナルド（Robert L. McDonald）とダニエル・シーゲル（Daniel Siegel）は、irreversible investmentでは単純な「benefit exceeds cost, therefore invest」という基準がthe option value of waitingを落とすと示した。条件によっては、benefitsがinvestment costの約2倍になるまで待つことさえ最適になりうる。

<!-- level:3 role:analysis -->
つまり「何もしない」はalways zeroではない。待つ間に価格、需要、技術、規制についてnew informationが入り、しかも行動する権利が残るなら、未実行の状態そのものがvalueを持つ。これは単なるhesitationではなく、**downsideを避けながらupsideを残す非対称な構造**を保つことになる。

<!-- level:5 role:implication -->
リアルオプションが値段をつけようとするのは、assetだけではない。**It tries to value the ability to revise a future decision.** 本稿では、その能力がいつ本当のvalueになり、いつ単なる先延ばしになるのかを見ていく。

[McDonald & Siegel — The Value of Waiting to Invest, NBER](https://www.nber.org/papers/w1019)

---

## 1. リアルオプションは実物投資に埋め込まれたfuture rightである

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

## 2. DCFが見落としやすいのはuncertaintyより「計画を変える権利」

<!-- level:4 role:claim -->
Real options theoryは、割引現在価値法（Discounted Cash Flow: DCF）を否定する話ではない。DCF is usually the base layer. 問題になるのは、future planを固定したまま評価する一方で、現実のmanagementは途中で行動を変えるところだ。

<!-- level:2 role:description -->
DCFはfuture cash flowsをpresent valueへ戻し、initial investmentを差し引く。これは非常に強い。一方で実際の会社は、marketが崩れれば撤退し、demandが伸びれば増産し、trialが失敗すればR&Dを止める。The actual decision path is conditional.

<!-- level:1 role:evidence -->
ティモシー・リュールマン（Timothy A. Luehrman）は、strategyはone predetermined cash-flow streamというよりa portfolio of optionsに近いと論じた。ブリアリー、マイヤーズ、アレンらも、real-option valuationはDCFのreplacementではなくcomplementとして使うのが普通だと整理している。

<!-- level:3 role:analysis -->
DCFでもpessimistic, base, optimisticのscenarioは置ける。差はそこではない。**After you see which scenario is emerging, can you change what you do?** 同じ確率分布でも、bad stateで止められる会社と、止められない会社ではvalueが違う。

<!-- level:5 role:implication -->
だからreal optionsの問いは「未来を当てられるか」ではない。**外れたときの損失を小さくし、当たったときはscaleできるcommitmentを設計できるか。** ここでfinanceがdecision designへ近づく。

[Luehrman — Strategy as a Portfolio of Real Options](https://hbr.org/1998/09/strategy-as-a-portfolio-of-real-options)  
[Brealey, Myers, Allen on Real Options](https://doi.org/10.1111/J.1745-6622.2008.00204.X)

---

## 3. 同じ平均でも、wider outcomesならflexibilityの価値は変わる

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
ただし結論は“uncertainty is good”ではない。**Bad stateを避け、good stateを取れるusable rightがあるときに限って、不確実性はoption valueへ変わりうる。** 費用側のuncertainty、competition、expiry、不可逆な追加投資は逆方向にも働く。

[Damodaran — Limitations of Real Option Pricing Models](https://pages.stern.nyu.edu/~adamodar/pdfiles/option.pdf)  
[van Putten & MacMillan — Making Real Options Really Work](https://pubmed.ncbi.nlm.nih.gov/15605572/)

---

## 4. Real optionsは六つの「動詞」にすると実務へ降りる

<!-- level:4 role:claim -->
“Option”は抽象的に聞こえる。It gets practical when translated into verbs. 何を未来で選び直せるかを、動詞として見る。

<!-- level:2 role:description -->
代表的な形は次の六つ。

1. 延期（defer）— wait before committing
2. 段階投資（stage）— evidenceを見ながらstep by stepで進む
3. 拡張（expand）— successの後にscaleする
4. 縮小（contract）— conditionsが悪化したらexposureを減らす
5. 撤退（abandon）— stopして追加損失を防ぐ
6. 転換（switch）— 原料、製品、technology、用途を切り替える

<!-- level:1 role:evidence -->
レノス・トリゲオルギス（Lenos Trigeorgis）は、defer, expand, contract, abandon, switchをmanagerial flexibilityの代表的な形として整理している。多段階R&Dでは、一つのstageを終えることが次のstageへ進むrightを生み、compound optionとして扱われることもある。

<!-- level:3 role:analysis -->
ここで「100の投資」の意味が変わる。一括で戻れない100と、まず10を使ってlearnし、その結果を見て残り90を払う投資は同じではない。**The first 10 may buy information and a future right.**

<!-- level:5 role:implication -->
Real-options thinkingが実務になるのは、「このprojectはいくらか」から、**「どんなfuture verbsをこのprojectに埋め込めるか」**へ問いが変わるときだ。

[MIT Press — Lenos Trigeorgis, Real Options](https://mitpress.mit.edu/9780262201025/real-options/)  
[Schwartz & Trigeorgis — Real Options and Investment under Uncertainty](https://mitpress.mit.edu/9780262194464/real-options-and-investment-under-uncertainty/)

---

## 5. Option valueは不可逆性・uncertainty・learning・裁量が重なると大きくなる

<!-- level:4 role:claim -->
不確実なprojectなら何でもreal optionsで扱うべき、ではない。価値が大きくなりやすいのは、**four conditionsが重なるとき**だ。

<!-- level:2 role:description -->
1. 不可逆性（irreversibility）— committed moneyが戻りにくい  
2. 不確実性（uncertainty）— 需要、価格、technology、規制、費用が未確定  
3. 学習（learning）— 待つ、またはexperimentすることでuseful informationが増える  
4. 裁量（discretion）— informationを見た後にactionを変えられる

<!-- level:1 role:evidence -->
ロバート・ピンディク（Robert S. Pindyck）は、多くのinvestmentがlargely irreversibleである一方、delayableでもあり、companyはprice, cost, and market informationを待てると整理した。この組み合わせがinvestment thresholdを変える。

<!-- level:3 role:analysis -->
簡単に取り消せる支出なら、waiting rightはそれほど貴重ではない。時間がたっても何もlearnできないなら、waiting is mostly delay。情報を得てもcontractやorganizationの都合でactionを変えられないなら、learning cannot be converted into value.

<!-- level:5 role:implication -->
最初に聞くべきは“How uncertain is this?”ではない。**何を、いつlearnでき、そのとき何を変えられるか。** この3点でoptionの輪郭がかなり見える。

[Pindyck — Irreversibility, Uncertainty, and Investment, NBER](https://www.nber.org/papers/w3307)

---

## 6. Waitingは無料ではなく、competitionがoptionを食う

<!-- level:4 role:claim -->
ここまでだとpatienceが全部正しく見える。But waiting has carrying costs. Real optionsは「いつまでも決めなくていい」という免罪符ではない。

<!-- level:2 role:description -->
待つ間にlost cash flowが出る。特許の残存期間が短くなる。Competitorsがmarket shareを取る。先行者がstandardを押さえる。人材が離れる。**Optionには実質的なexpiryがあり、権利を保つにもcostがかかる。**

<!-- level:1 role:evidence -->
バンクーバーの集合住宅開発1,214件を使った研究では、higher uncertaintyはinvestment delayと整合的だった一方、近隣のcompetitionが増えるとwaiting effectが弱くなった。Steven Grenadierのmodelsでも、**competitionは待つ価値を大きく削りうる**と示される。

<!-- level:3 role:analysis -->
さきほどのtoy modelへcompetitionを入れる。好況なら150だったvalueが、待つ間の競合参入で115までしか取れないとする。100で投資する差額は15。悪況70ならexerciseしない。半々ならcrude expected surplusは7.5で、immediate +10を下回る。

<!-- level:5 role:implication -->
つまり戦略の問題はflexibility versus rigidityではない。**いつflexibilityを買い、いつcommitmentを買うか**である。排他的なopportunityならwaitingが強く、誰でも参入できるmarketなら先に動く価値が勝つこともある。

[Bulan, Mayer & Somerville — Irreversible Investment, Real Options, and Competition, NBER](https://www.nber.org/papers/w12486)  
[Grenadier — Option Exercise Games](https://www.gsb.stanford.edu/faculty-research/publications/option-exercise-games-application-equilibrium-investment)

---

## 7. 1977年の借入論文から、real optionsはstrategyの言葉へ広がった

<!-- level:4 role:claim -->
リアルオプションはmanagement buzzwordとして生まれたわけではない。**Option-pricing theoryと不可逆なinvestmentが出会い、そこからstrategyへ広がった。**

<!-- level:2 role:description -->
1970年代にfinancial option valuationが大きく進み、1977年にMyersがreal optionsという語を使った。1980年代には天然資源、鉱山、石油、土地開発など、price volatilityとinvestment timingが重要な分野で研究が進んだ。1990年代にはAvinash K. Dixit、Robert S. Pindyck、Lenos Trigeorgisらが**investment under uncertainty**を体系化した。

<!-- level:1 role:evidence -->
1998年、Luehrmanは研究開発、新市場、段階的な工場拡張をoptionsの集合として経営者向けに説明した。その後、strategic-management researchでは合弁、海外進出、R&D、起業にもreal-options reasoningが広がった。

<!-- level:3 role:analysis -->
この歴史のせいで、現在の“real options”には二つの使われ方が共存する。一つはformal valuation with option-pricing machinery。もう一つは、staged commitmentとfuture choiceを整理するstrategic reasoning frameworkである。

<!-- level:5 role:implication -->
だから“We should use real options”と言われたら、まず一つ確認したい。**Do we want to price flexibility, or design flexibility?** 同じ言葉でも仕事が違う。

[Myers — Determinants of Corporate Borrowing](https://doi.org/10.1016/0304-405X(77)90015-0)  
[Dixit & Pindyck — Investment under Uncertainty, JSTOR](https://www.jstor.org/stable/j.ctt7sncv)  
[Luehrman — Investment Opportunities as Real Options](https://hbr.org/1998/07/investment-opportunities-as-real-options-getting-started-on-the-numbers)

---

## 8. 数式はあるが、real assetsは株式ほど素直にinputを教えない

<!-- level:4 role:claim -->
Real optionsは定量評価できる。ただし「Black–Scholesへ数字を入れてdone」と考えるのは危ない。

<!-- level:2 role:description -->
方法には二項モデル（binomial lattice）、意思決定木（decision tree）、動的計画法（dynamic programming）、Black–Scholes型、Monte Carlo simulationなどがある。どれも**future statesと条件付き行動**を数量化する試みだ。

<!-- level:1 role:evidence -->
アスワス・ダモダラン（Aswath Damodaran）が指摘する大問題は、underlying real assetがoften not tradedなことだ。工場やR&D projectにはstock market priceがない。だからmarket valueやvolatilityを直接観測しにくく、replicating portfolioも作りにくい。

<!-- level:3 role:analysis -->
さらにproject valueはjumpするかもしれず、investment cost自体もuncertain、competitionも反応する。More complexity does not automatically mean more truth. 数学が精密でも、inputがほぼjudgmentならoutputの小数点は安心材料にならない。

<!-- level:5 role:implication -->
実務ではlayered approachがよい。まずbaseline DCF、次にscenarioや意思決定木で重要なflexibilityを可視化し、影響が大きい案件だけ高度なoption modelへ進む。**精密なoutputは、inputの信頼性を保証しない。**

[Damodaran — Real Options](https://pages.stern.nyu.edu/~adamodar/pdfiles/papers/realopt.pdf)  
[ScienceDirect overview — Real Options Analysis](https://www.sciencedirect.com/topics/economics-econometrics-and-finance/real-options-analysis)

---

## 9. 何でも“option”と呼ぶと、この概念は何も説明しなくなる

<!-- level:4 role:claim -->
リアルオプションは便利すぎる。“This project has future potential.” これだけで何でもvalueがありそうに見えてしまう。

<!-- level:2 role:description -->
でもsequential investmentだけで自動的にreal optionになるわけではない。将来のchoice、exercise window、観測するsignal、追加投資、abandonment rule、残存価値をある程度定義できる必要がある。

<!-- level:1 role:evidence -->
ロン・アドナー（Ron Adner）とダニエル・レビンサル（Daniel A. Levinthal）は、explorationでchoice setそのものが際限なく変わり、abandonment decisionも構造化されていない場合、real optionとgeneric path dependenceの区別が難しくなると批判した。25年間のempirical research reviewでも、managerial traitsやmultiple uncertaintiesなど未解決の問いが残る。

<!-- level:3 role:analysis -->
「将来の可能性」はまだvalueではない。You need a controlled right: scope, expiry, cost, signal, and exercise condition. ここが曖昧なままoption valueを足すと、unattractive DCFをstoryで持ち上げる飾りになりうる。

<!-- level:5 role:implication -->
Real optionsは夢そのものに値段をつけるtechniqueではない。**夢を条件付きで管理できるrightへ分解する技術**と考えた方が安全だ。

[Adner & Levinthal — What Is Not A Real Option](https://journals.aom.org/doi/10.5465/amr.2004.11851715)  
[Ipsmiller et al. — 25 Years of Real Option Empirical Research in Management](https://onlinelibrary.wiley.com/doi/full/10.1111/emre.12324)

---

## 10. 実務では、valueを測る前にoptionをdesignする

<!-- level:4 role:claim -->
一番実務的なshiftは、projectを後から評価するだけでなく、**future decisionsが残るようにproject自体をdesignすること**かもしれない。

<!-- level:2 role:description -->
全国展開の前にone-region pilotをする。Long fixed contractだけでなくscale-up / scale-downできる条項を持つ。Systemをmodularにする。Advertisingやeventならsmall testでresponseを観測し、defined thresholdを超えたら追加budgetを出す。

<!-- level:1 role:evidence -->
Pharmaceutical R&Dは典型例で、pre-clinicalやclinical stagesがnew informationを生み、bad resultならstop、successならcontinueできる。日本オペレーションズ・リサーチ学会の日本シェーリング事例でも、ability to stop or modify the projectを組み込むことで、ordinary NPVとは異なるvalueが示された。

<!-- level:3 role:analysis -->
重要なのは“start small”そのものではない。A pilot with no predefined next decision is just a small pilot. 「何をlearnするか」「どのmetricなら追加投資か」「どのconditionならabandonか」「いつまでrightが残るか」を定義して初めてoptionらしくなる。

<!-- level:5 role:implication -->
ここでfinanceはdesignへ変わる。**Flexibilityは性格ではなく、契約、module、stage、decision gateとしてengineerできる。**

[日本オペレーションズ・リサーチ学会 — REAL OPTIONS AND THE EVALUATION OF RESEARCH AND DEVELOPMENT PROJECTS IN THE PHARMACEUTICAL INDUSTRY](https://www.jstage.jst.go.jp/article/jorsj/45/4/45_KJ00003228996/_article/-char/en)  
[McGrath & Nerkar — Real Options Reasoning and R&D Investment Strategies](https://business.columbia.edu/faculty/research/real-options-reasoning-and-new-look-rd-investment-strategies-pharmaceutical-0)

---

## 11. Conclusion: give your future self a choice

<!-- level:4 role:claim -->
最初の変な話へ戻る。Positive NPVなのにwaitした方がよいことがある。これはnumbersを無視する話ではない。One number may describe only one commitment path.

<!-- level:2 role:description -->
Real optionsが効くのは、investmentが後戻りしにくく、futureがuncertainで、learningが起こり、managementに延期、段階投資、拡張、縮小、撤退、転換のdiscretionがあるときだ。

<!-- level:1 role:evidence -->
同時にwaitingには逸失cash flowがあり、competitionがあり、expiryがあり、費用のuncertaintyがある。Real assetsはしばしば市場で取引されず、valuation inputsも観測しにくい。**Flexibility is valuable, not magical.**

<!-- level:3 role:analysis -->
調べる前、real optionsは「不確実なinvestmentのためのadvanced math」に見えていた。調べた後は少し違う。**未来を当てるより、future informationで行動を変えられるようtoday's commitmentsを設計する。**

<!-- level:5 role:implication -->
「まだ決めない」はnot decidingではない。何を今fixedにし、何をfuture contingentに残すかを決めている。Real optionが最終的にpriceしようとするのは、**future selfへ意図的に残したchoice**である。

---

## Research Note / 調査ノート

### Confirmed facts / 確認した事実

1. “Real options”という語はMyersの1977年論文に由来するとされる。
2. McDonald and Siegelは、不可逆なinvestmentではwaitingにmaterialなoption valueが生じうると示した。
3. Pindyckはirreversibility, uncertainty, delayabilityの関係を整理した。
4. Common real optionsにはdefer, expand, contract, abandon, switchがある。
5. Competitionはwaiting valueを削り、investmentを早めうる。
6. 市場で取引されないunderlying assetsでは、valueとvolatilityの推定が難しい。
7. 実証研究にはsupporting evidenceがある一方、適用境界とimplementation questionsは残る。

### Interpretation / 本稿の解釈

1. 110/120/100/150/70/115の例はthought experimentであり、実際のoption priceではない。
2. “Giving your future self a choice”は、理解補助として使ったmetaphor。
3. “Design the option first, value it second”は本稿から導いた実務上のproposal。

### Caveats / 注意

1. More uncertaintyだからといって、project valueが自動的に上がるわけではない。
2. “Base NPV + flexibility value”は便利なintuitionだが、interacting optionsは単純加算できない場合がある。
3. Black–Scholes型modelをreal projectへ機械的に移植してはいけない。

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
