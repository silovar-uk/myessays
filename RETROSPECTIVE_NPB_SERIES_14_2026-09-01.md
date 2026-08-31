# NPB学習シリーズ 第14回 Retrospective / 第15回 Brief / Phase UI最終判断

Updated: 2026-09-01
Series: `野球という産業を読む`
Episode 14: `npb-stadium-ownership-operation-structure`

## 1. Publish result

第14回「球場は誰のものか」を、日本語canonical + English Mixとして公開。

- Japanese: `essays/2026-09-01-npb-stadium-ownership-operation-structure.md`
- English Mix: `english-mix/npb-stadium-ownership-operation-structure.md`
- Research Note: `RESEARCH_NPB_SERIES_14_2026-09-01.md`
- `seriesOrder: 14`
- `data/index.json` 登録済み
- `data/versions-index.json` 登録済み
- PR: [#72](https://github.com/silovar-uk/myessays/pull/72)
- Episode 14 merge commit: `6dcce104a2800b65d03fc997357fa5e19bdd63b7`

### Deployment / QA

- Pages run: `33452329833` — success
- Visual QA run: `33452330500` — success
- Pre-Deploy Renderer Check: stray `**` 0件を確認してからPR作成。
- Post-Deploy目視確認: merge後に本番ページを開き、太字が正しく`<strong>`表示、strayCount 0を確認。

Episode 11〜14の4回連続で、2段階QA体制が機能した。

## 2. 第14回で成立したこと

### 1. 指定管理者制度という、これまでと異なる種類の制度を扱えた

Episode 11（税制）・13（契約）に対し、Episode 14は地方自治法という行政法の仕組み（指定管理者制度）を扱った。BUSINESS SYSTEM内で「税務」「契約」「行政法」という異なる法的領域を横断できたことは、Episode 13のRetrospectiveで懸念していた「内部の多様性不足」への一つの回答になった。

### 2. 「所有と運営の分離」という単純な軸で、3つの異なる事例を統一的に説明できた

MAZDA Zoom-Zoomスタジアム広島（公設民営型）・エスコンフィールドHOKKAIDO（自前型）・横浜スタジアム（転換型）という、成立の経緯も時期もまったく異なる3つの事例を、「誰が所有し、誰が運営するか」という一つの軸で統一的に整理できた。

### 3. Episode 13との接続が、単なる要約でなく新しい説明力を生んだ

Episode 13で「命名権は球団単独の契約ではない場合がある」という観察をしたが、Episode 14でその背景にある所有構造（指定管理者制度）を示したことで、Episode 13の観察が「なぜそうなるのか」まで説明できるようになった。これは、後の回が前の回を単に参照するのではなく、**前の回の観察の理由を遡って補完する**という、これまでとは少し違う形のretrieval bridgeだった。

## 3. KEEP

- 異なる法的・制度的領域（税務・契約・行政法など）を意識的に横断し、BUSINESS SYSTEM内の多様性を確保する。
- 後の回で、前の回の観察の「なぜ」を補完できないか検討する。
- Pre-Deploy Renderer Check + Post-Deploy Visual Checkの2段階体制を継続する。

## 4. CHANGE

（今回は特になし。）

## 5. REMOVE

（今回は特になし。）

## 6. Beginner Check

Episode 14読了後、初心者は少なくとも次を区別できる。

- 球場の所有者と運営者は、指定管理者制度により法的に分離できる。
- NPBの本拠地球場は、公設民営型・自前型・転換型に大きく整理できる。
- 所有構造の違いは、主に球団が単独で決められる意思決定の範囲を変える。
- どの所有形態が優れているかという価値判断は、このシリーズの関心ではない。

Result: **PASS**。

## 7. Phase UI — 最終判断

Episode 9〜13のRetrospectiveで繰り返し先送りにしてきた、Phase UI導入の判断を、Episode 14の完了をもって下す。

### 実装コストの確認

`series.js`の実装を確認したところ、現在のSeries機能は`series`名でのグループ化と`seriesOrder`によるソートのみで構成されており、下位分類（Phase）の概念を一切持たない。Phase UIを実装するには、少なくとも次が必要になる。

- 各記事frontmatterへの新しい分類フィールド（例：`phase`）の追加
- `series.js`のグルーピングロジックの変更（`series`内をさらに`phase`で束ねる）
- Reader/Libraryのレンダリングテンプレートの変更
- `CURRENT_SPEC.md`の記事メタデータ契約への追記
- 関連テストの追加・更新

これは、記事1本を追加する通常のPRとは性質が異なる、**サイトの共有基盤（Reading Modes・データ契約と同種の変更）**に対する変更である。

### 判断：Phase UIは実装しない

理由：

1. **ナビゲーション上の必要性を裏付ける兆候がない。** 既存のSeries機能（`N/14`表示、前後リンク、`seriesOrder`ソート）で、読者が迷っている、あるいは大分類を求めているという兆候は、Episode 9以降のどの時点でも確認できなかった。
2. **PLAYER SYSTEM / BUSINESS SYSTEMという2分類自体、まだ完全に安定していない。** シリーズ発足時のconceptual progression（GAME → TEAM → PLAYER → BUSINESS → LEAGUE → FAN → MEDIA → STADIUM → CITY → GLOBAL → STRATEGY）を振り返ると、FAN（Episode 12）・STADIUM（Episode 14）は本来別の macro-phase として構想されていたものを、実際にはBUSINESS SYSTEMの内側で扱った。つまり、2分類は今のところ機能しているが、これは記事の並び方に合わせて事後的に成立した分類であり、今後LEAGUE・MEDIA・CITY・GLOBAL・STRATEGYを扱う際に、同じ2分類で説明し続けられる保証はない。
3. **実装コストと、得られる読者価値が釣り合わない。** サイトの共有基盤へ変更を加えるコストに対して、現時点で解決される具体的な読者体験上の問題が特定できていない。
4. **Synthesis回が、事実上のPhase境界として機能している。** Episode 10（ROSTER CONSTRUCTION SYNTHESIS）は、PLAYER SYSTEM側の実質的な区切りとして機能した。Episode 15（後述、BUSINESS SYSTEM側のsynthesis回）も同様に機能すれば、明示的なPhase UIがなくても、**記事の内容そのものが読者に「ここで一区切り」と伝える**設計は既に成立している。

### PLAYER SYSTEM / BUSINESS SYSTEMという分類の扱い

この2分類は、**Retrospective・Review等の内部制作ドキュメント上の編集ツールとしてのみ**今後も使用する。読者向けのサイトUI・メタデータへは反映しない。

### この判断の見直し条件

以下のいずれかが起きた場合に限り、再検討する。

- 読者から具体的なナビゲーション上の不満・要望が寄せられた場合。
- シリーズが20回を超え、`seriesOrder`のみでの一覧性が実際に低下したと判断できる場合。
- LEAGUE・MEDIA・CITY・GLOBALなど、新しいmacro-phaseの記事が複数本蓄積し、2分類では説明できなくなった場合。

**この判断をもって、Episode 9以来のPhase UI検討事項を終了する。**

## 8. Episode 15 Brief — BUSINESS SYSTEM Synthesis

### Selected theme

**「球団経営という一つの全体をどう組み立てるのか」**

Provisional Role:

`CLUB BUSINESS SYNTHESIS`

### Core Question

**球団経営は、収益構造・ファン・スポンサーシップ・球場所有という4つの土台を、どう組み合わせて一つのビジネスとして成り立たせているのか？**

### Why next

Episode 14の`NEXT QUESTION`が、そのまま次の問いになっている。

> So how do these four foundations actually combine into one whole — a club's business as a going concern?

これは、Episode 5〜9（5つのplayer-mechanism）をEpisode 10で統合したのと**構造的に対称なsynthesis**である。

- PLAYER SYSTEM：mechanism（5本：Episode 5〜9）+ synthesis（1本：Episode 10）
- BUSINESS SYSTEM：foundation（4本：Episode 11〜14）+ synthesis（1本：Episode 15）

この対称性自体が、上記のPhase UI判断（synthesis回が事実上のPhase境界として機能する）を裏付ける実例になる。

### Candidate framework

Episode 10のRoster Construction Auditと対になる、**Club Business Construction Audit**を設計する。

1. FOUNDATION — 収益構造（Episode 11）・ファン（Episode 12）・スポンサーシップ（Episode 13）・球場所有（Episode 14）のうち、どれが今、球団経営の中心的な変数になっているか？
2. WHO DECIDES — 所有構造（Episode 14）によって規定される意思決定の範囲は、収益・スポンサー交渉にどう影響するか？
3. WHO PAYS / WHO BENEFITS — 親会社（Episode 11）・ファン（Episode 12）・スポンサー（Episode 13）・施設所有者（Episode 14）という異なる利害関係者は、それぞれ何を負担し、何を得ているか？
4. LINK BACK TO ROSTER — Episode 10のRoster Construction AuditのCONSTRAINT（budget）は、この4つの土台のどこから生まれているか？

### Guardrails

- 個別球団の経営を評価・ランキングしない。
- Episode 10〜14で既に扱った内容を再度長く説明し直さない。統合に徹する。
- 新しい制度・数字を無理に追加しない。Episode 11〜14の再利用を中心に構成する。
- PLAYER SYSTEMとBUSINESS SYSTEMを安易に「対称である」と強調しすぎない。対称性は一つの観察であり、シリーズの全体設計原理として固定しない。

### Retrieval requirement

Episode 11〜14の4本すべてを、単なる要約ではなく、球団経営という一つの意思決定システムを説明する変数として統合する。Episode 10のRoster Construction Auditとの接続（budgetというCONSTRAINTの発生源）も明示する。

## 9. Better Question achieved

Before:

「どの球場が一番すごい？」

After:

**「この球場は誰が所有し、誰が運営し、その構造が球団の意思決定にどんな範囲を与えているのか？」**

Episode 14 success criterion: **PASS**（本編QA・Pre-Deploy Renderer Check・目視確認・Phase UI最終判断まで含めて完了）。
