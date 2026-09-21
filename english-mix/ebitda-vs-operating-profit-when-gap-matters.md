---
id: ebitda-vs-operating-profit-when-gap-matters
title: "EBITDAと営業利益、なぜわざわざ2つ見るのか"
subtitle: "Why removing depreciation changes the story you see"
created: "2026-09-21"
updated: "2026-09-21"
type: "Conceptual Paper"
status: "完成"
tags: ["会計", "企業分析", "M&A", "EBITDA", "営業利益", "コンサル基礎"]
keywords: ["EBITDA", "operating profit", "depreciation", "amortization", "EV/EBITDA", "capital intensity", "cash flow"]
grow: 5
abstract: "EBITDA often looks larger than operating profit. But which one shows a company’s real strength? Neither wins by default. The difference tells us what we decided to hide: depreciation, amortization, and the economic cost of using assets."
---

# EBITDAと営業利益、なぜわざわざ2つ見るのか
## 減価償却という「過去に払ったお金の幽霊」を消すと、会社の見え方はどう変わるか

<!-- level:4 role:claim -->
The first weird thing about depreciation is simple. 機械を買ったとき、cash already left the company. なのに翌年も、その翌年も、利益から少しずつ引かれる。**Money paid in the past keeps coming back as an expense ghost on the P&L.**

<!-- level:2 role:description -->
That is where EBITDA enters. Roughly, it is earnings before interest, taxes, depreciation and amortization. 日本の中小M&A実務では、簡易的に「営業利益＋減価償却費」で計算するケースが多いと中小企業庁は説明している。資料によっては、のれん償却費なども加える。EBITDA temporarily removes that depreciation ghost.

<!-- level:3 role:analysis -->
So is the ghost fake? No. **Removing it reveals something, but also hides something.** EBITDA and operating profit are not “right number versus wrong number.” They answer different questions about which costs matter for the analysis.

<!-- level:5 role:implication -->
Instead of memorizing formulas, remember when the gap matters. その方が、コンサルの現場で使える。

---

## 1. まず、2つの数字は何を残し、何を消しているのか

<!-- level:4 role:claim -->
Operating profit keeps depreciation and amortization inside the cost of running the business. EBITDA adds them back, making differences in asset age, acquisition timing and accounting amortization less visible.

<!-- level:2 role:description -->
A simplified flow looks like this.

1. Revenue
2. －cash operating costs
3. ＝profit close to EBITDA
4. －depreciation and amortization
5. ＝operating profit

<!-- level:3 role:analysis -->
Depreciation is not a fake expense. 当期のcash outflowではないが、machines, stores, servers, vehicles and buildings were not free. Many of them also need replacement. Depreciation spreads the acquisition cost across the periods in which the asset is used.

<!-- level:5 role:implication -->
So operating profit asks: **How profitable is the business after including the cost of using assets?** EBITDA asks: **How strong is operating earning power before that accounting asset cost?**

---

## 2. 同じEBITDAでも、会社の景色はまるで違う

<!-- level:4 role:claim -->
Let’s make the difference extreme. 2社とも売上10億円、減価償却以外の営業コスト8億円とする。

<!-- level:2 role:description -->
A社は減価償却費2,000万円、B社は1億2,000万円とする。

1. A社：EBITDA 2億円、営業利益1億8,000万円
2. B社：EBITDA 2億円、営業利益8,000万円

<!-- level:3 role:analysis -->
On EBITDA, they look identical. On operating profit, there is a 1億円 gap. If B recently invested in major equipment, EBITDA can help neutralize investment timing and compare day-to-day operations. でもBが毎年大きなreplacement capexを必要とするなら、depreciationを消すと経済実態を軽く見すぎる。

<!-- level:5 role:implication -->
**EBITDA is useful when you want to suppress capital-intensity differences. It becomes dangerous when capital intensity is the thing you need to understand.**

---

## 3. M&Aでは、EBITDAが急に主役になる

<!-- level:4 role:claim -->
M&A is where EBITDA suddenly becomes very important. 中小企業庁の資料でも、中小M&AではEV/EBITDA倍率法が多く使われるとしている。

<!-- level:2 role:description -->
EV/EBITDA compares Enterprise Value with earnings before interest and depreciation. Because EV includes debt as well as equity, the metric is easier to use across firms with different capital structures.

<!-- level:3 role:analysis -->
Adding back depreciation also reduces noise from asset purchase timing and accounting amortization. Damodaran explains that Value/EBITDA is useful for comparing firms with different leverage and is often used in leveraged buyouts when people care about cash generation before debt payments, at least in the short run.

<!-- level:5 role:implication -->
M&A teams do not use EBITDA because it is a superior version of operating profit. **They use it because the buyer may change the capital structure, so they want a cleaner look at the operating business first.**

[中小企業庁「中小M&Aの主な手法と特徴」](https://www.chusho.meti.go.jp/zaimu/shoukei/2020/200331MA02.pdf)  
[Aswath Damodaran — Value/EBITDA Multiples](https://pages.stern.nyu.edu/adamodar/New_Home_Page/lectures/vebitnote.html)

---

## 4. ただし、EBITDAを「キャッシュフロー」と呼び始めると危ない

<!-- level:4 role:claim -->
EBITDA feels cash-like because it adds back non-cash depreciation. But EBITDA is not cash flow.

<!-- level:2 role:description -->
It does not directly capture at least these items.

1. Capital expenditure
2. Changes in working capital
3. Interest
4. Taxes
5. Principal repayment

<!-- level:3 role:analysis -->
A company can report EBITDA of 2億円 and still have very little cash left after maintenance capex, inventory growth, interest and taxes. SEC guidance also treats EBITDA as a non-GAAP measure and warns that some adjustments can make a non-GAAP measure misleading. 企業自身の開示でも、Adjusted EBITDAは設備投資や運転資本、債務返済を反映しないという限界が繰り返し説明される。

<!-- level:5 role:implication -->
For debt capacity, EBITDA can be a starting point, not the finish line. **EBITDA shows pre-investment earning power; Free Cash Flow gets closer to what actually remains.**

[SEC — Non-GAAP Financial Measures](https://www.sec.gov/rules-regulations/staff-guidance/corporation-finance-interpretations/non-gaap-financial-measures)

---

## 5. 営業利益が効くのは、「設備を使うコスト」を無視したくない場面

<!-- level:4 role:claim -->
Operating profit matters more when depreciation is central to the business model.

<!-- level:2 role:description -->
Railways, hotels, telecom, manufacturing, logistics and data centers use large fixed assets to generate revenue. Asset-light service businesses often carry a smaller depreciation burden.

<!-- level:3 role:analysis -->
If you look only at EBITDA in a capital-intensive business, you can make the cost of owning and replacing productive assets disappear. Damodaran notes that high EBITDA margins in capital-intensive businesses can be illusory when much of depreciation must effectively be reinvested to maintain assets. 減価償却費と維持更新投資は同額ではないが、両方を無視してよいわけでもない。

<!-- level:5 role:implication -->
Operating profit keeps the cost of past investment alive each period. That makes it useful when the question is: **How much profit remains after recognizing the cost of consuming productive assets?**

[Aswath Damodaran — Valuation materials, 2026](https://pages.stern.nyu.edu/~adamodar/pdfiles/country/val2dayEurope2026.pdf)

---

## 6. 2027年からIFRSでは「営業利益」の意味がさらに揃う

<!-- level:4 role:claim -->
There is also a current accounting change worth knowing. IFRS 18 is effective for annual periods beginning on or after January 1, 2027 and requires defined subtotals including operating profit and profit before financing and income taxes.

<!-- level:2 role:description -->
Under IFRS 18, operating profit is the total of income and expenses classified in the operating category. The goal is to improve comparability in the statement of profit or loss.

<!-- level:3 role:analysis -->
EBITDA is still not a simple universal label. IFRS materials discuss a specified subtotal such as operating profit before depreciation, amortisation and specified impairments, while also warning that the EBITDA label may not always faithfully describe a subtotal. In the US, the SEC continues to treat EBITDA as a non-GAAP measure requiring clear reconciliation and explanation.

<!-- level:5 role:implication -->
So the future rule is almost paradoxical: **operating profit becomes more standardized, while EBITDA still requires you to inspect the company’s own definition.**

[IFRS Foundation — IFRS 18](https://www.ifrs.org/issued-standards/list-of-standards/ifrs-18-presentation-and-disclosure-in-financial-statements/)  
[IFRS Foundation — IFRS 18 Key terms](https://www.ifrs.org/supporting-implementation/supporting-materials-by-ifrs-standards/ifrs-18/key-terms/)

---

## 7. コンサルで使うなら、「何を消して見たい数字ですか」と聞く

<!-- level:4 role:claim -->
In practice, choosing between EBITDA and operating profit is really a question-design problem.

<!-- level:2 role:description -->
A useful switch looks like this.

1. M&A / peer comparison, reduce leverage and asset-timing noise → EBITDA
2. Include the cost of using productive assets → Operating profit
3. Rough debt-capacity view → Start with EBITDA
4. Actual cash remaining → Follow through to Cash Flow
5. Adjusted EBITDA appears → Check every add-back

<!-- level:3 role:analysis -->
Asking “Which profit is correct?” creates confusion. Asking “What do we want to remove from the picture?” is clearer. 金利を消すのか、税を消すのか、減価償却を消すのか。Financial metrics are not perfect mirrors. They are filters that deliberately hide some parts of reality.

<!-- level:5 role:implication -->
Before researching this, I thought EBITDA was basically operating profit with a convenient add-back. Now it looks different. **EBITDA is not mainly a number that adds something. It is a number that makes something disappear.** That is why it is powerful, and why it can mislead.

---

## Research Note

### 事実として確認したこと

1. 中小企業庁のM&A資料では、EBITDAを簡易的に「営業利益＋減価償却費」とするケースが多いと説明している。
2. EV/EBITDA倍率法は中小M&Aで用いられる代表的な類似会社比較法の一つである。
3. SECはEBITDAをnon-GAAP financial measureとして扱い、net incomeとのreconciliationなどを求めている。
4. EBITDAは設備投資、運転資本、利息、税金、元本返済を直接表す指標ではない。
5. IFRS 18は2027年1月1日以後に開始する年次報告期間から適用され、operating profitを定義された小計として要求する。

### 本稿での解釈・提案

1. “EBITDA is a number that makes something disappear” is an explanatory metaphor.
2. 指標の選択を「何を消して比較したいか」で考えるのは、本稿の実務提案である。
3. EBITDA and Free Cash Flow answer different questions and should not be treated as substitutes.

---

## 再利用プロンプト

    You are teaching financial metrics to a beginner consultant.
    Do not explain a metric only with a formula.
    Explain it as “what the metric keeps” and “what the metric removes.”

    For each metric:
    1. Give the minimum formula.
    2. List the items intentionally excluded.
    3. Explain when excluding them improves comparison.
    4. Explain what risk becomes invisible.
    5. Give a numerical comparison with a nearby metric.
    6. Show how it is used in M&A, investment, management and lending.
    7. End with three questions this metric cannot answer alone.

    Do not:
    - equate EBITDA with cash flow
    - compare Adjusted EBITDA without checking add-backs
    - compare firms with very different capital intensity mechanically
    - make a company-wide judgment from one metric

---

## Sources

- [中小企業庁 — 中小M&Aの主な手法と特徴](https://www.chusho.meti.go.jp/zaimu/shoukei/2020/200331MA02.pdf)
- [経済産業省 — M&Aにおける評価手法に関する調査](https://www.meti.go.jp/meti_lib/report/2022FY/000012.pdf)
- [SEC — Non-GAAP Financial Measures](https://www.sec.gov/rules-regulations/staff-guidance/corporation-finance-interpretations/non-gaap-financial-measures)
- [IFRS Foundation — IFRS 18](https://www.ifrs.org/issued-standards/list-of-standards/ifrs-18-presentation-and-disclosure-in-financial-statements/)
- [IFRS Foundation — IFRS 18 Key terms](https://www.ifrs.org/supporting-implementation/supporting-materials-by-ifrs-standards/ifrs-18/key-terms/)
- [Aswath Damodaran — Value/EBITDA Multiples](https://pages.stern.nyu.edu/adamodar/New_Home_Page/lectures/vebitnote.html)
- [Aswath Damodaran — Valuation materials 2026](https://pages.stern.nyu.edu/~adamodar/pdfiles/country/val2dayEurope2026.pdf)
