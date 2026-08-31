# NPB学習シリーズ 第3回 Retrospective / 第4回へ進む前の判断

Updated: 2026-08-31
Series: `野球という産業を読む`
Episode 3: `npb-2026-baseball-metrics-avg-ops-war`

## 1. Publish / QA result

第3回「野球の数字を読む — 打率からOPS、WARへ」を、日本語canonical + English Mixとして公開。

- Japanese: `essays/2026-08-31-npb-2026-baseball-metrics-avg-ops-war.md`
- English Mix: `english-mix/npb-2026-baseball-metrics-avg-ops-war.md`
- Research Note: `RESEARCH_NPB_SERIES_03_2026-08-31.md`
- `seriesOrder: 3`
- `data/index.json` 登録済み
- `data/versions-index.json` 登録済み
- Merge commit: `ab6d564f6469b6e4f843e6361dd15499a69be52e`
- PR: `#44`

### GitHub Actions

Pages build and deployment:
- Run: `33362189487`
- Result: success

Visual QA:
- Run: `33362190100`
- Result: success

Visual QA内の全工程がsuccess。

- Content migration audit
- Static tests
- Reading Versions browser QA
- Argument Structure browser QA
- Page Reader browser QA
- Browser visual QA
- QA artifacts upload

## 2. 第3回で成立したこと

### 1. 「指標辞典」ではなく、Metric = Lens にできた

今回の中心は指標名ではなく、各指標を

- WHAT IT SEES
- WHAT IT MISSES

で読むこと。

AVG → OBP → SLG / OPS、ERA → WHIP → Kという順番も、「より高度な指標へ進む」ではなく「前の指標が見落としたものを次の指標で補う」学習構造になった。

### 2. 第2回の選手が、そのままretrieval cueになった

新しい固有名詞を増やさず、

- 近藤健介 → AVG / OBP
- 佐藤輝明 → POWER / SLG / OPS
- 周東佑京 → SB
- 村上頌樹 → ERA
- 才木浩人 → K
- 小園海斗 → position / WAR
- ライデル・マルティネス → starter / reliever context

へ接続した。

第2回の「役割」が、第3回では「測り方」に変換されている。

### 3. WARをゴールにしなかった

WARは「最強指標」として置かず、

**異なる仕事を共通単位で比較したくなる理由**

を理解するために使った。

fWAR / bWAR・rWAR等のprovider差も明記し、NPB選手のWARランキングは載せなかった。

### 4. 実務へ接続できた

最終部で、野球指標とスポーツビジネスKPIを同じ構造として扱った。

- attendance
- revenue
- LTV
- views

も、「何を測り、何を捨てているか」を確認して使う必要がある。

これはシリーズ最終目標である「NPBをケースとしてスポーツ産業を分析する」への初めての明示的な橋になった。

## 3. KEEP

- Metric = Lensという単一メタファー。
- `WHAT IT SEES / WHAT IT MISSES` の対で説明する。
- 前記事の選手をretrieval cueとして再利用する。
- Pulse情報のsnapshotを基礎ユニット内で統一する。
- Research Noteでprovider差・定義差・更新対象を残す。
- 「今回扱わない高度指標」を先に決めるInformation Budget。
- WARのような総合指標ほどqualificationを厚くする。
- 最後に「30秒でどう使うか」まで落とす。
- Next QuestionでGAME → SYSTEMへ視点を上げる。

## 4. CHANGE

### 1. Today’s Numberを毎回の定番にしない

Episode 1・2では機能したが、第3回では一つの数字を立てるより「複数レンズをどう使い分けるか」が主題だった。

今後も、記事の理解を圧縮できるときだけ使う。

### 2. Advanced metricは「名前を増やす」より「必要になった瞬間」に出す

OPS+、wRC+、FIP、BABIP、Statcast系を今回出さなかった判断は維持する。

後続記事で実際に比較上の問題が生じたとき、必要な指標だけ再登場させる。

### 3. Series UIのPhase表現は、今すぐ実装しない

第1〜3回で基礎ユニットは成立したが、現時点でUIへ`基礎編`の階層を追加すると、24記事全体のPhase設計を先に固定しすぎる。

seriesOrderで読順は成立しているため、第6〜8回程度まで記事が増えた時点でPhase UIを再評価する。

## 5. REMOVE

- 指標ごとのリーグ平均値暗記。
- WARの小数点ランキング。
- 「高度な指標ほど正しい」という序列。
- 第3回内でのセイバーメトリクス史。
- 全記事に同じモジュールを強制する発想。

## 6. ADD

### Foundation Update Policy

第1〜3回は相互参照が強いため、Pulse数字を更新するときは原則として3記事を一つのbatchで監査する。

最低確認項目：

- Episode 1の順位・観客・主要選手
- Episode 2の選手成績
- Episode 3で再利用する選手成績
- 全記事の情報基準日
- Next Question / 前記事参照

### Retrieval Bridge

後続記事でも、前の記事で覚えたものを最低1つ再利用する。

Article 4ではEpisode 1の

- 12球団
- 2リーグ
- 143試合
- 交流戦18試合
- CS

を「既知の事実」として再利用し、説明の重複ではなく**なぜその構造なのか**へ進む。

## 7. Episode 3 Beginner Check after publication

### PASS

読者が最低限、以下を説明できる構造になっている。

- AVGとOBPは同じものを測っていない。
- SLGは安打の大きさを見る。
- OPSはOBPとSLGをまとめるquick summary。
- ERAとWHIPとKは投手の別の側面を見る。
- WARは複数の価値をまとめようとする推定モデル。
- 一つの数字だけで選手全体を決めない。

### Remaining assumption

完全な野球初心者に対しては、

- 3アウト
- 9イニング
- 打席 / 打数
- 自責点
- 先発 / 救援

などの試合構造をある程度知っている前提が残る。

ただし、ここを第3回へ追加すると指標学習の流れが重くなる。

Article 4以降で制度・試合構造を扱う際に、必要な語だけ再説明する方針とする。

## 8. 第4回へのBrief

### Title

**なぜNPBは12球団・2リーグ・143試合なのか**

### Role

SYSTEM / LEAGUE STRUCTUREへの入口。

### Core Question

**現在のNPBの形は、なぜこの形なのか？**

### Reuse

Episode 1で既に覚えた、

`12球団 / 2リーグ / 143試合 / 交流戦 / CS`

を再利用する。

### Do not repeat

12球団をもう一度プロフィール形式で紹介しない。

### New learning

- なぜ球団数が12なのか
- 2リーグ制がどのように形成されたか
- 143試合という長いレギュラーシーズンが何を意味するか
- 交流戦・CSが競技と興行へ何を追加したか
- MLB / KBO等との制度比較をどこまで使うか

### Next bridge

Article 4で「リーグが競争の枠を作る」と分かった後、Article 5のドラフトへ進み、

**リーグは選手という希少資源をどう配分するのか**

を問う。
