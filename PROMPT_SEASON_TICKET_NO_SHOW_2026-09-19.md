# PROMPT｜Season Ticket No-Showを「予測」と「介入」に分けて書く

Date: 2026-09-19
Use case: Schreyer & Torgler (2021)のスイスのseason ticket holder no-show研究を起点に、後続研究まで広げて、スポーツクラブ実務へ接続する解説記事を再生成／更新する。

## Role

あなたは、日常の小さな違和感から出発し、一次情報、査読研究、反証、後続研究まで当たり、読後に対象の見え方が変わるWebコラムを書くリサーチャー兼編集者です。

特定ライターの文体や決まり文句は模倣しません。

## Core Question

シーズンチケットをすでに買っている人が、なぜ試合に来ないのか。

そして、過去の欠席が次の欠席を強く予測するとき、それは本当に「壊すべきhabit」なのか。

## Target Thesis

次の仮説を検証しながら書く。

> no-showは「ロイヤルティ不足」という一つの問題ではない。
> 「誰が来なさそうか」という予測、「なぜ来ないか」という原因、「空席をどう戻すか」という回収、「シーズンチケットが何の価値を売っているか」という商品設計を分ける必要がある。

これはSchreyer & Torglerの公式結論ではなく、論文と後続研究を統合した実務的な解釈として明示する。

## Mandatory Research Order

### Phase 1｜First research

最初に最終掲載版を確認する。

Primary:
https://www.tandfonline.com/doi/full/10.1080/00036846.2021.1925081

確認項目:
- authors / journal / year / pages
- 8,734 STHs
- 72 consecutive matchdays
- 2013–2016
- first disaggregated STH analysis outside German marketという位置づけ
- geographical distance
- emerging no-show habits
- non-linear age relationship
- age × distance / temperatureのinteraction
- 35–65とretirement-age groupの違い

### Phase 2｜Open working-paper detail

公開working paperを確認する。

https://www.crema-research.ch/wp-content/uploads/2022/01/football-spectator-no-show-behavior-in-switzerlandempirical-evidence-from-season-ticket-holder-behavior.pdf

確認項目:
- FC Basel 1893
- broader raw data：約2.09 million attendance decisions
- 72 home league matches
- average no-show rate 26.77%
- permanent STHs 8,734
- average ~21 missed matches over four years
- only ~1% attended all 72
- one / two / three / five / ten / twenty consecutive missesの次戦NSR
- “there might be no habit to break”
- inverted-U age relationship
- U-shaped price relationship, turning point around 23 CHF
- standing / family area / distance / gender findings
- limitations and future research
- reminder / pricing / sharing appsなどのfuture research suggestion

注意:
published articleとworking paperは同一扱いしない。最終掲載版で確認できる中心結果と、working paperだけにある詳細数値を区別して書く。

### Phase 3｜Structure before prose

情報を以下へ分類してから本文を書く。

- FACT
- INTERPRETATION
- PROPOSAL
- COUNTERPOINT
- LIMITATION

中心構造:
1. weird hook: all-72 attendance ~1%
2. individual behavioral data
3. sold ≠ used
4. absence streak / habit signal
5. prediction ≠ causation
6. age interactions
7. nonlinear price
8. cross-market context
9. later intervention evidence
10. thought experiment: same empty seat, different problem
11. practice: Predict / Explain / Recover / Relationship
12. metrics
13. limitations
14. discovery
15. reusable prompt + sources

### Phase 4｜Re-research

A. German multi-club evidence
https://journals.sagepub.com/doi/10.1177/1527002518784120

確認:
- 25 Bundesliga / 2. Bundesliga clubs
- game-quality factors
- division differences

B. Individual STH attendance decisions
https://doi.org/10.1123/jsm.2020-0284

確認:
- 5,900+ STHs
- age / tenure / expenditure / prior attendance
- viewing and game-quality conditions

C. Systematic interdisciplinary review
https://onlinelibrary.wiley.com/doi/10.1111/joes.12534

確認:
- 98 studies
- 41 antecedent studies / 57 countermeasure studies
- contextual heterogeneity
- recurring role of product characteristics and opportunity cost
- limited certainty about countermeasure effectiveness

D. Later field experiment
https://doi.org/10.1016/j.jbusres.2025.115318

確認:
- 13,911 STHs
- reminders with reward opportunities
- short-term effect
- monetary gift reward was most effective
- no persistent behavioral change in subsequent games

## Editorial Rules

- 「シーズンチケット保持者はロイヤルだから来る」と前提にしない。
- no-showを道徳的な「裏切り」として書かない。
- predictorとcauseを混同しない。
- “habit”を因果として断定しない。
- published versionとworking paperの詳細を混同しない。
- 一クラブの結果をサッカー全体へ一般化しない。
- 年齢・価格をlinear effectとして書かない。
- 施策案はPROPOSALと明示する。
- reward / punishmentを万能策として書かない。
- later field experimentを使い、「予測できる」と「変えられる」を分離する。
- 読者を幼児扱いせず、probit等の手法名は必要な範囲だけ説明する。
- 同じ結論の言い換えで水増ししない。

## Overdo-it Investigation

少なくとも一つ、題材に合った「やりすぎる」検討を入れる。

推奨:
- 同じno-show=1になる三人を作り、barrier / product value / recovery UXの違いを比較する。
- 同じ観測結果に異なる原因が潜むことを可視化する。
- そのうえで「一つのKPIに一つの施策」を却下する。

## Practical Framework

実務提案は次の4層で整理する。

1. Predict
2. Explain
3. Recover
4. Relationship

追加KPI候補:
sales → actual entry → advance release → redistribution → downstream value

これらは論文の検証済みKPIではなく、本稿の実務提案と明示する。

## English-Mix Requirement

日本語Canonical Sourceを先に完成させる。

EN MIXは以下を厳守:
- H2順序1:1
- p / ul / ol / blockquote / figureのsemantic block数・型1:1
- 段落の結合・分割禁止
- 英語化は各block内部だけ
- simple Englishを使う
- 日本語の論理を削らない
- strict structure validationを通す

## Quality Gate

- 見出しだけで論旨が進むか
- 1%という数字をsample contextなしに一般化していないか
- final articleとworking paperの出典境界が明示されているか
- predictionとcausationが混ざっていないか
- 2025 intervention studyまで追えているか
- FACT / INTERPRETATION / PROPOSALが混ざっていないか
- no-showを顧客の態度の悪さとして道徳化していないか
- 施策が「reminder送付」だけで終わっていないか
- 調べる前と後でseason ticketの見え方が変わるか

## Ending

冒頭の「72試合全部来た人は約1%」へ戻る。

ただし「意外と来ない」で終えない。

> An empty seat is not only an absent fan.
> It is a sold right that was not exercised, and a clue about how the product is being used.

日本語では、
「空席はファンが消えた穴ではなく、その試合では行使されなかった権利である」
という認識変化へ着地させる。
