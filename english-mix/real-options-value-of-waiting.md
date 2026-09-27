---
id: real-options-value-of-waiting
title: "リアルオプションは「まだ決めない」に値段をつける"
subtitle: "Why a positive NPV can still justify waiting"
abstract: "リアルオプションは、uncertain projectを高度な数式で飾るための考え方ではない。Irreversibility, learning, and managerial flexibilityがあるとき、future choice itself has value. 古典研究、two-state thought experiment、competition、valuation limitsを通じて、「いつ決めるか」ではなく「何を今決め、何を未来に残すか」を考える。"
---

# リアルオプションは「まだ決めない」に値段をつける
## Why a positive NPV can still justify waiting

<!-- level:4 role:claim -->
Suppose a project is worth 110 and costs 100. 正味現在価値（Net Present Value: NPV）は+10。The obvious answer is “invest now.” ところがreal optionsの世界では、**+10でも waiting can be rational.**

<!-- level:2 role:description -->
The reason is simple but strange. 投資はone-shot scoringではなく、a sequence of choices over timeだからだ。If you spend 100 today, learning tomorrow that the market is bad does not bring the 100 back. If you can wait, observe, and still keep the right to invest, you can exercise only after good news and walk away after bad news.

<!-- level:1 role:evidence -->
Robert L. McDonaldとDaniel Siegelの古典研究は、irreversible investmentではa simple “benefit exceeds cost, therefore invest” ruleがthe option value of waitingを落とすと示した。Their simulations even produced plausible cases where waiting remained optimal until benefits were about twice the investment cost.

<!-- level:3 role:analysis -->
So “doing nothing” is not always zero. 待つ間にprices, demand, technology, regulationについてnew informationが入り、the right to act remains alive. This is not mere hesitation. **It is preserving an asymmetric payoff structure: avoid some downside, keep access to upside.**

<!-- level:5 role:implication -->
Real options therefore price something slightly uncanny: not only the asset, but **the ability to revise a future decision**. The rest of this essay asks when that ability is economically real—and when “flexibility” is only a nicer word for procrastination.

[McDonald & Siegel — The Value of Waiting to Invest, NBER](https://www.nber.org/papers/w1019)

---

## 1. A real option is a future right embedded in a real investment

<!-- level:4 role:claim -->
リアルオプション（real option）をshort formで言えば、**a right, not an obligation, to take a future action involving a real asset or business project.** 義務ではなく権利、というfinancial optionの形をreal investmentへ持ってくる。

<!-- level:2 role:description -->
A call option gives you the right to buy an asset under specified terms, but you do not have to exercise it when doing so is unattractive. リアルオプションでは、underlying opportunityがfactory, mine, R&D program, market entry, land development, or information systemになる。The future investment outlay plays a role similar to an exercise price.

<!-- level:1 role:evidence -->
Stewart C. Myers introduced the term “real options” in his 1977 paper on corporate borrowing. ちょっと面白いのは、the famous term did not debut in a paper titled “Real Options.” It appeared while explaining how growth opportunities and discretionary future investment affect firm value and debt.

<!-- level:3 role:analysis -->
That history matters. リアルオプションは最初からa fancy capital-budgeting calculatorだったわけではない。It is a way to recognize that firm value includes not only assets already operating, but opportunities management may choose to exercise later.

<!-- level:5 role:implication -->
So before asking “Which formula should we use?”, ask **what future choice actually exists, when it can be exercised, and who controls it.** No choice, no meaningful option.

[Myers — Determinants of Corporate Borrowing](https://doi.org/10.1016/0304-405X(77)90015-0)  
[MIT Press — Lenos Trigeorgis, Real Options](https://mitpress.mit.edu/9780262201025/real-options/)

---

## 2. DCF is not blind to uncertainty; it is often blind to changing the plan after uncertainty resolves

<!-- level:4 role:claim -->
Real options theory is not an argument that discounted cash flow is useless. むしろ、DCF is usually the base layer. The tension appears when a project plan is treated as fixed even though managers will adapt it after new information arrives.

<!-- level:2 role:description -->
Discounted Cash Flow converts expected future cash flows into present value and subtracts investment. これはpowerful for comparing plans. But real managers abandon bad projects, expand successful ones, pause when regulation changes, and stop R&D when trials fail. The actual decision path is conditional.

<!-- level:1 role:evidence -->
Timothy A. Luehrman argued that strategy resembles a portfolio of options more than one predetermined cash-flow stream. Brealey, Myers, and Allen likewise describe real-option valuation as a complement to, not a substitute for, DCF; DCF often supplies the underlying project value from which option analysis begins.

<!-- level:3 role:analysis -->
DCF can absolutely include pessimistic, base, and optimistic scenarios. The missing piece is different: **after seeing which scenario is emerging, can management change what it does?** Same probability distribution, different response rights, different value.

<!-- level:5 role:implication -->
Real options therefore do not mainly ask “Can we forecast better?” They ask **Can we design the commitment so that being wrong hurts less and being right can still scale?**

[Luehrman — Strategy as a Portfolio of Real Options](https://hbr.org/1998/09/strategy-as-a-portfolio-of-real-options)  
[Brealey, Myers, Allen on Real Options](https://doi.org/10.1111/J.1745-6622.2008.00204.X)

---

## 3. Same average, wider outcomes: flexibility can turn volatility into value

<!-- level:4 role:claim -->
“More uncertainty can increase option value” sounds almost irresponsible. 普通の投資ならuncertainty is scary. To see the logic without hiding behind equations, let us run a deliberately crude two-state experiment.

<!-- level:2 role:description -->
Assume a project is worth 110 today and costs 100. Immediate NPV is +10. Now assume you may wait one year, observe the market, and still invest for 100. We ignore discounting, lost interim cash flows, taxes, and financing. **This is not a valuation model; it is a structural toy.**

<!-- level:1 role:evidence -->
Case A: future value is 120 or 100 with equal probability. You invest at 120 and earn 20; at 100 you are indifferent. Expected exercise surplus = 10.  
Case B: keep the same average of 110, but widen outcomes to 150 or 70. You invest at 150 and earn 50; at 70 you do not invest. Expected exercise surplus = 25.

<!-- level:3 role:analysis -->
Same mean, different option value. Why? Because the downside can be truncated by non-exercise while upside remains open. In simplified form, exercise payoff has the shape max(V − I, 0). That convexity is why higher revenue-side volatility can raise option value when other conditions are held constant.

<!-- level:5 role:implication -->
But the sentence must end with a warning: **uncertainty is valuable only when you possess a usable right to avoid bad states and capture good ones.** Cost uncertainty, competitive entry, irreversible follow-on commitments, or an expiring window can move value the other way.

[Damodaran — Limitations of Real Option Pricing Models](https://pages.stern.nyu.edu/~adamodar/pdfiles/option.pdf)  
[van Putten & MacMillan — Making Real Options Really Work](https://pubmed.ncbi.nlm.nih.gov/15605572/)

---

## 4. Real options become practical when you translate them into six verbs

<!-- level:4 role:claim -->
“Option” sounds abstract. 実務ではit gets clearer when converted into verbs.

<!-- level:2 role:description -->
Typical forms include:

1. 延期（defer）— wait before committing
2. 段階投資（stage）— invest step by step as evidence arrives
3. 拡張（expand）— scale after success
4. 縮小（contract）— reduce exposure when conditions worsen
5. 撤退（abandon）— stop and prevent further losses
6. 転換（switch）— change input, output, technology, or use

<!-- level:1 role:evidence -->
Lenos Trigeorgis treats defer, expand, contract, abandon, and switch as central forms of managerial flexibility. In multi-stage R&D, completing one stage may create the right to fund the next, producing a compound option—a chain of contingent decisions rather than one indivisible investment.

<!-- level:3 role:analysis -->
This changes how we read “100 of investment.” 一括で戻れない100と、first spend 10 to learn, then decide whether to spend 90はnot economically identical. The first 10 may be buying information plus a future right, not simply buying ten percent of the final project.

<!-- level:5 role:implication -->
Real-options thinking becomes useful when the question shifts from “What is this project worth?” to **“Which future verbs can we deliberately embed in this project?”**

[MIT Press — Lenos Trigeorgis, Real Options](https://mitpress.mit.edu/9780262201025/real-options/)  
[Schwartz & Trigeorgis — Real Options and Investment under Uncertainty](https://mitpress.mit.edu/9780262194464/real-options-and-investment-under-uncertainty/)

---

## 5. Option value tends to matter when irreversibility, uncertainty, learning, and discretion meet

<!-- level:4 role:claim -->
Not every uncertain project deserves real-options treatment. 価値が大きくなりやすいのは、four conditions overlap.

<!-- level:2 role:description -->
1. 不可逆性（irreversibility）— money committed now is hard to recover  
2. 不確実性（uncertainty）— demand, price, technology, regulation, or cost is unresolved  
3. 学習（learning）— waiting or experimenting reveals useful information  
4. 裁量（discretion）— management can change action after learning

<!-- level:1 role:evidence -->
Robert S. Pindyck emphasized that many investments are both largely irreversible and delayable. Firms can wait for new information about prices, costs, or market conditions before committing resources, which changes the investment threshold.

<!-- level:3 role:analysis -->
If spending is easily reversible, waiting rights are less valuable. If time passes but no new information arrives, waiting is mostly delay. If new information arrives but contracts or organization prevent any change in action, learning cannot be converted into value.

<!-- level:5 role:implication -->
So the first practical question should not be “How uncertain is this?” It should be **“What will we learn, when will we learn it, and what will we be allowed to do differently then?”**

[Pindyck — Irreversibility, Uncertainty, and Investment, NBER](https://www.nber.org/papers/w3307)

---

## 6. Waiting is not free: competition can eat the option before you exercise it

<!-- level:4 role:claim -->
So far, patience looks heroic. でもwaiting has carrying costs. A real option is not a license to stay undecided forever.

<!-- level:2 role:description -->
While you wait, you may lose cash flow, patent life, market share, talent, standards, customer lock-in, or first-mover advantage. An option has an effective expiry, and keeping it alive may itself require money.

<!-- level:1 role:evidence -->
A study of 1,214 Vancouver condominium developments found that greater uncertainty was associated with delayed investment, consistent with real-options predictions, while greater local competition weakened that waiting effect. Steven Grenadier's option-exercise game models likewise show that competition can sharply erode waiting value and pull investment thresholds closer to the conventional zero-NPV rule.

<!-- level:3 role:analysis -->
Return to our toy model. If the good future state would have been 150 but waiting lets competitors erode your payoff so the state becomes only 115, exercise surplus is 15 in the good state and 0 in the bad state. With equal probabilities, the crude expected surplus falls to 7.5—below the immediate +10.

<!-- level:5 role:implication -->
The strategic problem is therefore not flexibility versus rigidity. It is **when to buy flexibility and when to buy commitment.** Proprietary opportunities often reward waiting; contestable opportunities may reward moving first.

[Bulan, Mayer & Somerville — Irreversible Investment, Real Options, and Competition, NBER](https://www.nber.org/papers/w12486)  
[Grenadier — Option Exercise Games](https://www.gsb.stanford.edu/faculty-research/publications/option-exercise-games-application-equilibrium-investment)

---

## 7. From a 1977 borrowing paper to a 1990s language of strategy

<!-- level:4 role:claim -->
Real options did not begin as a management buzzword. The field grew where option-pricing theory met irreversible investment and then expanded into strategy.

<!-- level:2 role:description -->
Financial-option valuation advanced dramatically in the 1970s. Myers used the term real options in 1977. During the 1980s, natural resources, mines, oil, and land development became important applications because prices were volatile and investment timing mattered. In the 1990s, Avinash K. Dixit, Robert S. Pindyck, Lenos Trigeorgis, and others systematized investment under uncertainty.

<!-- level:1 role:evidence -->
By 1998, Luehrman was explicitly presenting R&D, new markets, and phased plant expansion as portfolios of options. Strategic-management research later applied real-options reasoning to joint ventures, foreign direct investment, R&D, and entrepreneurial decisions.

<!-- level:3 role:analysis -->
That mixed history explains today's ambiguity. “Real options” can mean a formal valuation exercise with option-pricing machinery, or a strategic reasoning framework that structures staged commitment and future choice. Both have intellectual roots in the same idea, but they are not the same level of rigor.

<!-- level:5 role:implication -->
So when someone says “We should use real options,” ask one clarifying question: **Do we want to price flexibility, or design flexibility?**

[Myers — Determinants of Corporate Borrowing](https://doi.org/10.1016/0304-405X(77)90015-0)  
[Dixit & Pindyck — Investment under Uncertainty, Princeton University Press](https://press.princeton.edu/books/hardcover/9780691034102/investment-under-uncertainty)  
[Luehrman — Investment Opportunities as Real Options](https://hbr.org/1998/07/investment-opportunities-as-real-options-getting-started-on-the-numbers)

---

## 8. There are formulas, but real assets do not reveal market inputs as politely as stocks do

<!-- level:4 role:claim -->
Yes, real options can be valued quantitatively. ただし“plug into Black–Scholes and done” is usually the wrong mental model.

<!-- level:2 role:description -->
Methods include binomial lattices, decision trees, dynamic programming, Black–Scholes-type models, and Monte Carlo simulation. Each tries to connect future states with conditional actions.

<!-- level:1 role:evidence -->
Aswath Damodaran highlights a fundamental problem: the underlying real asset is often not traded. That means we cannot cleanly observe its market value or volatility, and creating a replicating portfolio is difficult. Real-project values may also jump rather than evolve continuously, while investment costs and volatilities can themselves change.

<!-- level:3 role:analysis -->
More complexity does not automatically mean more truth. A model can become mathematically exquisite while its volatility estimate, project value, exercise cost, or competitive response is mostly judgment. **Precision of output is not the same as reliability of input.**

<!-- level:5 role:implication -->
A sensible workflow is layered: baseline DCF first, then visualize the important flexibilities with scenarios or a decision tree, then use heavier option methods only when the flexibility is material enough to justify the modeling burden.

[Damodaran — Real Options](https://pages.stern.nyu.edu/~adamodar/pdfiles/papers/realopt.pdf)  
[ScienceDirect overview — Real Options Analysis](https://www.sciencedirect.com/topics/economics-econometrics-and-finance/real-options-analysis)

---

## 9. If everything becomes an “option,” the concept stops explaining anything

<!-- level:4 role:claim -->
Real options are vulnerable to a dangerous compliment: “This project has future potential.” That sentence can justify almost anything.

<!-- level:2 role:description -->
Sequential investment alone is not enough. A real-option interpretation becomes stronger when you can specify the future choice, exercise window, information signal, additional investment, abandonment rule, and what remains after abandonment.

<!-- level:1 role:evidence -->
Ron Adner and Daniel A. Levinthal argued that when exploration continuously changes the choice set and abandonment decisions are poorly structured, a “real option” becomes difficult to distinguish from generic path dependence. A 25-year review of empirical research also concluded that meaningful questions remain about managerial traits, multiple uncertainties, and when real-options logic actually improves decisions.

<!-- level:3 role:analysis -->
“Future possibility” is therefore not yet value. You need a controlled right: scope, expiry, cost, signal, and exercise condition. Otherwise “option value” can become a decorative premium added to an unattractive DCF because management likes the story.

<!-- level:5 role:implication -->
Real options are not a technique for pricing dreams. They are a technique for **turning a dream into a conditional, governable right.**

[Adner & Levinthal — What Is Not A Real Option](https://journals.aom.org/doi/10.5465/amr.2004.11851715)  
[Ipsmiller et al. — 25 Years of Real Option Empirical Research in Management](https://onlinelibrary.wiley.com/doi/full/10.1111/emre.12324)

---

## 10. In practice, design the option before you try to value it

<!-- level:4 role:claim -->
The most useful shift may be upstream: do not only evaluate projects as they arrive. **Design projects so future decisions remain possible.**

<!-- level:2 role:description -->
Run one-region pilots before national rollout. Use contracts that allow scale-up or scale-down instead of only long fixed commitments. Build modular systems whose components can be replaced. For advertising or events, use a small test to observe response, then release additional budget only after a defined threshold is met.

<!-- level:1 role:evidence -->
Pharmaceutical R&D is a classic example because investment is naturally staged. Pre-clinical and clinical phases reveal information; poor results can stop funding, while success creates the right to continue. A Japanese Operations Research Society case study of a Nihon Schering R&D project found a different value under a real-options approach because the ability to stop or modify the project was explicitly recognized.

<!-- level:3 role:analysis -->
The point is not “start small.” A pilot with no predefined next decision is just a small pilot. To create an option, define what the first spend is supposed to learn, what metric triggers follow-on investment, what condition triggers abandonment, and how long the right remains open.

<!-- level:5 role:implication -->
Here finance turns into design. **Flexibility is not a personality trait; it can be engineered into contracts, modules, stages, and decision gates.**

[日本オペレーションズ・リサーチ学会 — REAL OPTIONS AND THE EVALUATION OF RESEARCH AND DEVELOPMENT PROJECTS IN THE PHARMACEUTICAL INDUSTRY](https://www.jstage.jst.go.jp/article/jorsj/45/4/45_KJ00003228996/_article/-char/en)  
[McGrath & Nerkar — Real Options Reasoning and R&D Investment Strategies](https://business.columbia.edu/faculty/research/real-options-reasoning-and-new-look-rd-investment-strategies-pharmaceutical-0)

---

## 11. Conclusion: do not merely wait; give your future self a choice

<!-- level:4 role:claim -->
Back to the strange opening: a project can have positive NPV and still be worth delaying. This is not a rejection of numbers. It is recognition that one number may describe only one commitment path.

<!-- level:2 role:description -->
Real options matter when investment is hard to reverse, the future is uncertain, learning occurs over time, and management retains the discretion to defer, stage, expand, contract, abandon, or switch.

<!-- level:1 role:evidence -->
But waiting sacrifices cash flow and may invite competition; cost uncertainty can hurt; exercise windows expire; real assets are often non-traded; and managers may fail to exercise options rationally. Flexibility is valuable, not magical.

<!-- level:3 role:analysis -->
Before researching this, real options looked like “advanced math for uncertain investments.” After researching it, the deeper idea feels simpler and more demanding: **do not obsess over predicting the future; design today's commitments so that future information can still change action.**

<!-- level:5 role:implication -->
“Not deciding yet” is itself a decision about commitment. You decide what must be fixed now and what can remain contingent. That is what a real option ultimately prices: **a choice deliberately handed to your future self.**

---

## Research Note / 調査ノート

### Confirmed facts / 確認した事実

1. The term “real options” is traced to Myers's 1977 work.
2. McDonald and Siegel showed that waiting can have material option value in irreversible investment.
3. Pindyck emphasized the interaction of irreversibility, uncertainty, and delayability.
4. Common real options include defer, expand, contract, abandon, and switch.
5. Competition can erode waiting value and accelerate investment.
6. Non-traded underlying assets make inputs such as value and volatility difficult to estimate.
7. Empirical support exists, but boundaries and implementation questions remain open.

### Interpretation / 本稿の解釈

1. The 110/120/100/150/70/115 example is a thought experiment, not an actual option-pricing result.
2. “Giving your future self a choice” is an explanatory metaphor.
3. “Design the option first, value it second” is a practical proposal derived from the research.

### Caveats / 注意

1. More uncertainty does not automatically mean more project value.
2. “Expanded value = base NPV + flexibility value” is a useful intuition but can break when multiple interacting options cannot be added independently.
3. Black–Scholes-type models should not be mechanically transplanted into real projects.

---

## Reusable Prompt / 再利用プロンプト

    You are a corporate-finance analyst specializing in investment under uncertainty.
    Analyze the target project through a real-options lens.

    1. Establish the baseline project: purpose, initial investment, cash flows, and ordinary NPV.
    2. Identify what is irreversible.
    3. Separate uncertainties into demand, price, technology, regulation, cost, and competition.
    4. State what new information will arrive over time.
    5. Identify future actions: defer, stage, expand, contract, abandon, switch.
    6. For each option, define expiry, follow-on investment, exercise trigger, abandonment trigger, and residual value.
    7. Identify the cost of waiting: lost cash flow, expiry, competitive erosion, and first-mover effects.
    8. Do not treat all uncertainty as upside; separate revenue-side and cost-side uncertainty.
    9. Start with a two-state thought experiment or decision tree. Use binomial, dynamic-programming, or simulation methods only if material.
    10. Try to falsify the framing: is this truly a real option, or merely sequential investment or procrastination?

    Separate facts, assumptions, interpretations, and proposals.
    Treat DCF and real options as complementary: DCF for base value, real-options analysis for flexibility.

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
