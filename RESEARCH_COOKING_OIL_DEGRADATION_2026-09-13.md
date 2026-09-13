# Research Notes — Cooking Oil Degradation

Date: 2026-09-13
Article ID: `cooking-oil-degradation-before-smoke`

## 0. 研究の狙い

日常の料理指示「油を中火で温める」を、単なる料理のコツとしてではなく、油の分子変化まで追って説明する。

中心の問い：

- なぜ強火ではなく中火なのか。
- 「油の劣化」とは具体的に何が起きているのか。
- 発煙点は劣化の開始線なのか。
- 加熱による変化はすべて悪いのか。

最初の仮説：

`強火だと発煙点を超えて油が劣化するため、中火で温める。`

再調査後の修正：

`発煙点は重要な警報だが、油の化学変化はそれ以前から進む。中火は化学的な安全境界ではなく、必要以上の高温へのオーバーシュートを避け、油温を制御しやすくするための操作と捉えるのが適切。`

---

## 1. フック候補

### 採用

**油は煙が出る前から壊れている。**

理由：

- 読者が持ちやすい「煙＝劣化開始」のイメージを一度成立させてから崩せる。
- 酸化・加水分解・重合へ自然につなげられる。
- 最後に「中火＝油を無傷にする火力ではない」という認識転換へ戻せる。

### 不採用

- 「油は毒になる」：過剰で、加熱条件・油種・時間・摂取量を無視する。
- 「発煙点を超えたら危険」：発煙点を単一の安全境界として扱うのは雑。
- 「中火なら劣化しない」：誤り。反応速度や温度上昇を抑えやすいだけで、変化そのものを止めるわけではない。

---

## 2. Source ledger

### USDA FSIS — Deep Fat Frying and Food Safety

Source:
https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/deep-fat-frying

Direct support:

- 各油には発煙点がある。
- 発煙点では油が分解し、不快なにおいや味が出ることがある。
- 高発煙点の油が揚げ物に推奨される。
- 高温の揚げ油は火災ややけどの危険がある。

Does not support:

- 「発煙点までは一切劣化しない」。
- 「家庭の炒め物はすべて中火が最適」。

### USDA ARS — Frying Oil Deterioration, 2007

Source:
https://www.ars.usda.gov/research/publications/publication/?seqNo115=212286

Direct support:

- 約190℃の揚げ調理で、油は熱的・酸化的に分解し、揮発性・非揮発性生成物ができる。
- 酸化・加水分解・重合などによって油の機能、風味、栄養品質が変化する。
- 少量の酸化は揚げ物らしい風味形成に関与する。
- さらに劣化するとオフフレーバーや、高濃度では有害となりうる生成物が生じる。

重要な修正：

`degradation = instantly dangerous` ではない。調理は制御された化学変化でもある。

### USDA ARS — 2026 edible-oil oxidation research summary

Source:
https://www.ars.usda.gov/research/publications/publications-at-this-location/publication/?seqNo115=427405

Direct support:

- deep-fat fryingは油を高熱と酸素へさらし、油を急速に劣化させうる。
- 栄養成分の損失や、条件次第で好ましくない生成物形成につながる。

記事への意味：

加熱時間・温度・酸素曝露を分けて考える。

### Goicoechea-Oses et al., Foods, 2024

Source:
https://pmc.ncbi.nlm.nih.gov/articles/PMC11675685/

Title:
“Vegetable Oils and Their Use for Frying: A Review of Their Compositional Differences and Degradation”

Direct support:

- 揚げ調理における主要な反応はthermoxidation, polymerization, hydrolysis。
- 200℃を超えるような強い条件ではisomerizationやcyclizationも起こりうる。
- 食材中の水分は加水分解に関与し、free fatty acids, mono- and diacylglycerols等が生じる。
- 加水分解生成物は酸化しやすく、smoke point低下にもつながる。
- 重合生成物は粘度上昇や色の変化と関係する。
- 油種、脂肪酸組成、温度、時間、フライ回数、食材などが劣化速度へ影響する。
- 一部の国ではtotal polar compounds 24–30%付近を廃棄基準にしている。

Important limitation:

レビューの中心はdeep frying。少量油の短時間炒めを同じ速度・程度で語らない。

### Chemical Changes in Deep-Fat Frying, Food Science & Nutrition, 2025

Source:
https://pmc.ncbi.nlm.nih.gov/articles/PMC12516161/

Direct support:

- 熱劣化の主要経路としてoxidation, hydrolysis, polymerizationを整理。
- polymerizationでdimers, oligomers等が形成される。
- 高温・長時間条件で複数の反応が相互作用する。

記事への意味：

「古い油」という一語を、複数の反応系に分解して説明する。

### Toxic aldehydes in cooking vegetable oils, 2025

Source:
https://pmc.ncbi.nlm.nih.gov/articles/PMC12281009/

Direct support:

- 高温調理中の植物油から複数のaldehydesが生成しうる。
- 生成は油組成、温度、加熱時間などの影響を受ける。

Important caution:

- 特定のaldehydeが検出されることと、家庭での通常使用が直ちに健康被害を生むことを同一視しない。
- 暴露量、頻度、調理条件を飛ばして毒性を断定しない。

### USDA FSIS — Reuse guidance

Sources:
https://ask.fsis.usda.gov/article/Can-oil-be-reused-safely
https://ask.fsis.usda.gov/article/How-long-can-I-keep-oil-after-frying

Direct support:

- 再利用油で濁り、泡立ち、嫌なにおい・味があれば廃棄。
- 劣化サインとしてdarkening, excessive smoking, rancid smell等を案内。

記事への意味：

家庭では分析機器より、見た目・におい・煙・泡の観察が現実的。

---

## 3. 再リサーチで修正した主張

### 修正1：「発煙点を超えると劣化が始まる」

初期仮説：
発煙点が劣化の開始線。

修正後：
発煙点は分かりやすい劣化サインの一つ。酸化などの分子変化は発煙前から進みうる。

### 修正2：「中火は油を劣化させない温度」

初期仮説：
中火なら油は安全。

修正後：
中火は温度そのものではなくheat input。鍋、油量、時間、機器で油温は変わる。意味はcontrolabilityにある。

### 修正3：「油の劣化＝酸化」

初期仮説：
酸化だけ説明すればよい。

修正後：
揚げ油ではthermoxidation, hydrolysis, polymerizationが主要。食材の水分が反応に参加する点を入れる。

### 修正4：「加熱による変化はすべて悪い」

初期仮説：
変化が少ないほどよい。

修正後：
調理自体が化学変化。少量の酸化生成物が揚げ物らしい風味へ寄与するという整理がある。問題は変化の有無より、条件と程度。

### 修正5：「揚げ油研究を家庭炒めへそのまま当てはめる」

初期仮説：
deep-frying dataを一般的な加熱油へそのまま適用。

修正後：
研究条件を明示し、短時間のsautéと長時間・反復加熱を区別する。

---

## 4. もう一歩やりすぎる調査

今回実行：

1. **“劣化”を3経路へ分解**
   - oxidation
   - hydrolysis
   - polymerization

2. **発煙点を逆向きに調べる**
   - 「発煙点を超えると劣化」だけでなく、「劣化すると発煙点が下がる」方向も確認。

3. **食材を反応系へ入れる**
   - 油だけでなくfood moistureがhydrolysisへ関与することを確認。

4. **反証を探す**
   - “degradation = bad”へ対し、small amount of oxidationがfried flavor形成へ関与する資料を採用。

5. **measurement gapを確認**
   - 研究・業務ではTPC等、家庭では官能サインという測定レベルの違いを整理。

---

## 5. 記事構造

1. レシピの「油を中火で温める」への違和感
2. 発煙点を答えとして一度採用
3. 再調査で「煙は開始線ではない」と修正
4. 劣化を酸化・加水分解・重合へ分解
5. 中火を“magic temperature”ではなくcontrol settingとして再定義
6. 「劣化＝即危険」も反証
7. 家庭で見えるサインへ戻す
8. 最初の比喩「油が疲れる」を再解釈
9. 「中火で温める」の意味を、変化速度の制御として回収

---

## 6. Claim audit

記事に残す：

- 高温・酸素・水分・時間が油の変化へ関与する。
- 揚げ油の主な変化はoxidation, hydrolysis, polymerization。
- smoke pointは重要だが、唯一の劣化指標ではない。
- 劣化した油ではsmoke point低下が起こりうる。
- polymerizationはviscosity増加等と関係する。
- household discard signsとしてcloudiness, foaming, bad smell等が使える。

記事から外す／断定しない：

- 「○℃以下なら安全」。
- 「中火なら有害物質はできない」。
- 「一度煙が出た油は必ず健康被害を起こす」。
- 「seed oilは危険」。
- 「酸化油を食べると特定疾患になる」という単純な因果。

---

## 7. Change log

- smoke pointを“劣化開始点”から“目立つ警報の一つ”へ修正。
- 中火を温度ではなくheat-control strategyとして再定義。
- oxidationだけでなくhydrolysis / polymerizationを追加。
- deep fryingと家庭の短時間炒めを区別。
- “劣化＝毒”の単純化を避け、少量のoxidationとfried flavorの関係を追加。
- health claimはexposure levelと条件を省略しない。
