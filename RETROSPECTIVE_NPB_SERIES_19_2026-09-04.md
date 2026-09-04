# NPB学習シリーズ 第19回 Retrospective / 第20回 Brief

Updated: 2026-09-04
Series: `野球という産業を読む`
Episode 19: `npb-posting-system-mobility-mechanism`

## 1. Publish result

第19回「ポスティング制度は、何を国境の外へ広げる制度なのか」を、日本語canonical + English Mixとして公開。

- Japanese: `essays/2026-09-04-npb-posting-system-mobility-mechanism.md`
- English Mix: `english-mix/npb-posting-system-mobility-mechanism.md`
- Research Note: `RESEARCH_NPB_SERIES_19_2026-09-04.md`
- `seriesOrder: 19`
- `data/index.json` 登録済み
- `data/versions-index.json` 登録済み
- PR: [#84](https://github.com/silovar-uk/myessays/pull/84)
- Episode 19 merge commit: `edad172`(fast-forward)

### Deployment / QA

- `node tools/audit-content.mjs --strict`: Integrity errors 0
- `node --test tests/*.test.js`: 39 pass / 1 fail(既知のCRLF関連・無関係)
- Bold Boundary Rule静的チェック: JA(pairs 22) / EN(pairs 19) ともproblems 0
- Pre-Deploy Renderer Check: マージ前にfeatureブランチのraw contentを本番`window.MyEssaysMarkdown.render()`へ通し、JA/EN双方でstrayCount 0・内部リンク3件を確認
- Pages run: `33881904133` — success
- Visual QA run: `33881905266` — success
- Post-Deploy目視確認: 本番ページ(`#/essay/npb-posting-system-mobility-mechanism`)を開き、タイトル・stray `**` 0・内部リンク(FA/トレード/Episode18)3件の正しいレンダリングを確認

## 2. 第19回で成立したこと

### 1. toolkit引き渡し後、最初の「適用」が実際に機能した

Episode 18で渡したtoolkitのうち、Mobility Mechanism Audit(Episode 8〜9)を、シリーズが未着手だった個別制度(ポスティング)へ実際に当てはめた。7変数(INITIATOR/RIGHT-RELATIONSHIP/CONSENT/DESTINATION-MARKET/COST-CONSIDERATION/TIMING/AFTER)は、大きな修正なくポスティングにも適用できた。

### 2. 「FAに似た海外版」という単純化を崩せた

executionの過程で、ポスティングはINITIATORこそFAに似るが、CONSENTの構造(球団の事前承認が必須の関門)はトレードに近いという、**単純な二択に収まらない中間的性格**を持つことを明示できた。これはFA・トレード・ポスティングを3列に並べた比較表(本編セクション7)で可視化した。

### 3. Fact Disciplineとして、暦日・金額の精度を誠実に落とした

申請締切日(情報源により12月15日/2月1日など表記が割れる)や、譲渡金の具体的な料率・金額比較について、精度を偽らず「年により協定で定める」「本稿では扱わない」と明示した。これはGuardrailの遵守であると同時に、第13回のDisclosed vs Guessedの精神をそのまま踏襲した判断である。

## 3. KEEP

- Mobility Mechanism Auditのような汎用frameは、新しい個別制度に当てはめる際も大きく作り直さず適用できる。再利用性の高いtoolを増やすことの価値を確認できた。
- 情報源間で暦日表記が割れる場合、精度を偽らず構造レベルの記述に留める。
- toolkitを渡した直後の回では、frameを検証なしに使うのではなく、実際に当てはめて初めて見える微妙な違い(今回のCONSENTの中間性)を明示する。

## 4. CHANGE

特になし。今回はEpisode 18で確立した日付確認プロセス・Pre-Deploy Renderer Check・Post-Deploy目視確認の標準手順をそのまま踏襲し、問題なく機能した。

## 5. Beginner Check

Episode 19読了後、初心者は少なくとも次を区別できる。

- ポスティングは海外FA権とは別の制度であり、対象となる選手の立場が違う。
- ポスティングの「選手が始める」という点はFAに似ているが、球団が拒否できるという点はトレードに近い。
- 複数球団と交渉できることと、実際に移籍が成立することは別の話である。
- 制度を比較するときは、同じ結果(海外移籍)に見えても、mechanismの各変数(誰が始め、誰が同意し、何が対価か)を分けて見る必要がある。

Result: **PASS**。

## 6. Episode 20 Brief

### Selected theme

Episode 19の`NEXT QUESTION`が、そのまま次の問いになっている。

> NPBとMLBは、なぜ選手獲得を自由な引き抜き競争に任せず、ポスティングという協定型の手続きを間に置いたのか？

**「なぜ二つの独立したリーグが、選手移動のルールをわざわざ協定で取り決めたのか」**

Provisional Role:

`INTER-LEAGUE AGREEMENT / WHY INSTITUTIONS COORDINATE`

### Core Question(仮)

**NPBとMLBという、それぞれ独立したリーグ同士が、選手獲得を自由競争に任せず、ポスティングのような協定型の手続きを間に置くのはなぜか？　それによって、それぞれのリーグは何を守ろうとしているのか？**

### Why next

Episode 19で読んだmechanismの「動かし方」の一段外側にある、**制度の存在理由**を問う回になる。これはEpisode 16(制度的経路と統計的因果)・Episode 17(比較対象との関係)で扱った「制度間の関係」という視点の延長線上にあり、今回はその視点を「なぜ協定という形を取るのか」という一段深い問いへ進める。

### Candidate framework

新しいAuditが必要になる可能性がある。仮称: **Inter-Institutional Agreement Audit**

1. WHAT'S AT STAKE FOR EACH SIDE — 各リーグは何を守りたいのか(戦力流出、市場の秩序、選手のキャリア等)
2. WHY NOT OPEN COMPETITION — 自由競争に任せた場合に何が起きると想定されているか
3. WHAT THE AGREEMENT TRADES OFF — 協定によって、各リーグ・選手・球団は何を得て、何を制約されるか
4. HOW ENFORCEMENT WORKS — 協定に強制力を持たせる仕組みは何か(コミッショナー間の合意等)

この枠組みは仮説段階であり、実際の執筆時にリサーチ結果と照らして再検討する。

### Guardrails

- MLBとNPBの力関係についての規範的な優劣評価(「NPBはMLBに従属している」等)をしない。
- 個別選手・個別球団の利害に矮小化しない。あくまで制度設計の論理を扱う。
- 労使交渉や国際的なスポーツ法制の詳細(独占禁止法上の扱い等)まで深入りしない。あくまでこのシリーズのMobility Mechanismの延長として扱う。

### Retrieval requirement

Episode 16(Institutional Pathway vs Empirical Causation)・Episode 17(Reference Relationship vs Independent Design)・Episode 19(Mobility Mechanism Audit)を retrieval bridgeとして使う。単なる新規制度紹介ではなく、既存3回分の視点を統合する回として設計する。

## 7. Better Question achieved

Before:

「ポスティングって結局、どういう制度？」

After:

**「この移動mechanismは、FA・トレードとどの変数が同じで、どの変数が違うのか。そして、なぜそもそもこの協定という形が必要とされたのか？」**

Episode 19 success criterion: **PASS**(本編QA・Pre-Deploy Renderer Check・Post-Deploy目視確認まで含めて完了)。
