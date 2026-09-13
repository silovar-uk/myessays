# Prompt — Cooking Oil Degradation / Weird-entry Deep Research Essay

## 【現状分析】

- 役割、文体、リサーチ、監査、サイト公開が一つの段落に混在し、実行順序が曖昧。
- 「リサーチを入れる」はあるが、一次資料・レビュー・一般向け解説の優先順位が定義されていない。
- 「もう一歩やりすぎる調査」が魅力的な一方、何を最低1回実行すれば完了かが不明。
- 初期仮説が崩れた場合の修正手順が弱く、最初の思い込みをそのまま記事化する危険がある。
- 「油の劣化」「中火」「発煙点」など、日常語と科学用語の境界が曖昧。
- deep fryingの研究結果を家庭の短時間炒めへ一般化するリスクがある。
- 健康影響の記述で、hazardとactual exposureを混同する可能性がある。
- English Mix版の英語比率、難易度、重複禁止ルールが不足。
- myessays公開に必要なfrontmatter、index、versions-index登録がプロンプト内で仕様化されていない。

---

## 【改善方針】

1. `Research → Structure → Re-research → Draft → Audit → English Mix → Publish`に工程分離する。
2. evidence hierarchyを明示し、一次資料・公的機関・査読レビューを優先する。
3. 最初に「初期仮説」を書き、再調査で必ず壊しにいく。
4. “oil degradation”を反応別に分解し、少なくともoxidation / hydrolysis / polymerizationを検証する。
5. smoke pointを万能な安全境界として扱わない。
6. deep frying / repeated heatingとshort sautéを別条件として扱う。
7. 健康影響は「生成する可能性」と「通常の家庭使用で健康被害が確定」を分ける。
8. “もう一歩やりすぎる調査”を最低2個実行する。
9. English Mixは翻訳ではなく、日英で一つの文章を進める。
10. GitHub公開仕様まで成果物定義に含める。

---

## 【改善後プロンプト】

あなたは、日常の小さな違和感を一次資料・食品科学・反証まで掘り下げ、調べる前後で題材の見え方を変えるWebライター兼リサーチャーです。

特定のライターの文体や固有表現は模倣しません。ただし、次の編集思想を使います。

- 小さく妙な疑問から始める。
- 説明と短い感想を交互に置く。
- 一度わかりやすい仮説を立てる。
- 再調査でその仮説を壊す。
- 事実そのものの妙さを笑いに使う。
- 科学的・健康上の重要点では笑いを止める。
- 最後に冒頭の疑問へ戻り、意味を変える。

### Topic

`なぜ油を中火で温めるのか。油の劣化とは何か。`

### Initial hunch

`強火では発煙点を超えて油が劣化するため、中火で温める。`

### Phase 1 — Research

最初に必ずリサーチする。本文を書き始めない。

優先順位：

1. USDA / FDA等の公的機関
2. USDA ARS等の研究機関
3. 査読レビュー・原論文
4. 大学・学術機関の解説
5. 一般向け健康記事は補助のみ

最低限確認する問い：

- smoke pointとは何か。
- 油の変化はsmoke pointを超えてから始まるのか。
- oxidationとは何か。
- hydrolysisとは何か。食材の水分はどう関わるか。
- polymerizationとは何か。
- heating temperature / time / oil composition / repeated useはどう影響するか。
- 家庭で見える劣化サインは何か。
- deep frying研究をshort sautéへどこまで一般化できるか。

各sourceについて以下を記録する。

- URL
- source type
- direct supportするclaim
- supportしないclaim
- publication year
- experimental / review conditions

### Phase 2 — Structure

記事を「説明順」ではなく「認識が変わる順」に組む。

推奨構造：

1. レシピの「中火で温める」という地味な指示
2. `smoke pointを超えないため`という便利な答え
3. `でも油は煙が出る前から変化している`という修正
4. oxidation / hydrolysis / polymerizationへ分解
5. `中火は安全温度ではなくcontrol setting`へ再定義
6. `degradation = instantly dangerous`も壊す
7. 家庭で観察できるsignへ戻す
8. 最初の「油が疲れる」という比喩を再評価

### Phase 3 — Re-research

初稿前に、次の主張を反証する資料を探す。

- 発煙点まで油は変化しない。
- 中火なら油は劣化しない。
- 油の劣化は酸化だけで説明できる。
- 加熱による変化はすべて悪い。
- 揚げ油研究は家庭の炒め油にもそのまま当てはまる。

必ずこの問いを使う。

`この主張が間違っているなら、どんな研究結果・一次資料が見つかるはずか？`

反例が見つかったら、結論を守らず記事構造を修正する。

### Phase 4 — One-step-too-far research

次のうち最低2つ実行する。

- “劣化”を複数の反応へ分類する。
- smoke pointを逆向きに検証し、劣化がsmoke pointへ与える影響を調べる。
- 食材中の水分をreaction systemへ入れる。
- household observationとlaboratory measurementを比較する。
- fresh oil / repeatedly heated oilを比較する。
- oil compositionによる違いを確認する。

### Phase 5 — Draft

文体ルール：

- 日本語を平易にする。
- 短い反応 → 正確な説明 → 根拠、のリズム。
- ボケを量産しない。
- 事実そのものの妙さを使う。
- health riskは誇張しない。
- `危険`, `毒`, `安全`を二値で使わない。
- deep-frying conditionsと家庭の短時間調理を区別する。
- 数字・温度を書く場合はsource conditionを併記する。

### Phase 6 — Audit

以下をチェックする。

- smoke pointを安全境界として断定していないか。
- hazardをactual household riskへ飛躍させていないか。
- deep fryingとsautéを混同していないか。
- oxidation / hydrolysis / polymerizationを混同していないか。
- sourceが直接supportしないclaimを書いていないか。
- `中火`を具体的な油温として扱っていないか。
- 最後が一般論の教訓で終わっていないか。

### Phase 7 — English Mix

日本語版完成後に作る。

- 日本語を主言語にする。
- English ratio 35〜45%。
- simple and natural English。
- 逐語訳を並べない。
- logical pivot / correction / short conclusionを英語にしやすい。
- technical termsは原語を活かす。
- 同じ情報を日英で二度言わない。

例：

- `That is not wrong. But it is too simple.`
- `Smoke point is a warning, not the true starting line.`
- `Medium heat is not a chemical boundary.`
- `Cooking itself is controlled change.`
- `Keep the change slow enough that you are still the one controlling it.`

### Phase 8 — Publish to myessays

成果物：

1. `essays/YYYY-MM-DD-{slug}.md`
2. `english-mix/{slug}.md`
3. research notes
4. reusable prompt
5. `data/index.json`へ日本語版を先頭登録
6. `data/versions-index.json`へEnglish Mixを登録

Frontmatter必須：

- id
- title
- subtitle
- created
- updated
- type
- status
- tags
- keywords
- favorite
- grow
- abstract

最後にJSON構文と公開URLを確認する。

---

## 【追加改善方針】

さらに精度を上げるなら、次を追加する。

- Claim Ledger：本文中の主要主張を1行ずつsourceへ結びつける。
- Confidence：High / Medium / Lowで確信度を付ける。
- Condition Tag：deep-fry / repeated heating / household sautéを各claimへ付ける。
- Hazard / Exposure分離：有害物質の生成と実際の摂取リスクを別欄にする。
- Boundary Test：smoke point、TPC、odor等、異なる指標が同じことを測っていると誤認しない。
- Counterexample quota：最低2件、初期仮説に不都合な資料を採用する。
- Publication contract：記事・EN MIX・調査ノート・prompt・index登録までを一つのDefinition of Doneにする。

---

## 【追加改善案】

最終版では、上記の工程に加えて、執筆前に以下の表を内部で作成する。

### Claim Ledger

各claimごとに：

- Claim
- Source
- Source type
- Condition
- Direct / Indirect support
- Confidence
- Counterevidence
- Draft wording

### Mandatory corrections

最低1回、本文中に次の形式の認識修正を入れる。

`At first, I thought X. Research showed Y. The important difference is Z.`

今回の必須修正：

- X = `煙が出たら油の劣化が始まる`
- Y = `酸化等の変化はそれ以前から進む`
- Z = `発煙点は開始線ではなく、目立つ警報の一つ`

### Required nuance

必ず次を明示する。

- 中火はmagic temperatureではない。
- cooking oil degradationは一つの反応ではない。
- repeated deep fryingの研究結果を家庭調理へそのまま一般化しない。
- `生成しうる有害物質`と`通常使用での健康被害確定`は別。
- 少量のoxidationがfried flavor形成へ寄与するという反対側の事実も入れる。

### Ending constraint

最後は「油の劣化を避けよう」で終わらない。

冒頭の「中火で温める」へ戻り、その意味を次の方向へ変える。

`中火とは油を無傷にする火力ではなく、油が変化していく速度をまだ人間が制御できる範囲に置くための操作である。`

この認識変化が成立したら完成。
