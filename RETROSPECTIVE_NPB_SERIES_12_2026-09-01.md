# NPB学習シリーズ 第12回 Retrospective / 第13回 Brief

Updated: 2026-09-01
Series: `野球という産業を読む`
Episode 12: `npb-fan-audience-engagement-revenue-link`

## 1. Publish result

第12回「球団は誰に向けて何を提供しているのか」を、日本語canonical + English Mixとして公開。

- Japanese: `essays/2026-09-01-npb-fan-audience-engagement-revenue-link.md`
- English Mix: `english-mix/npb-fan-audience-engagement-revenue-link.md`
- Research Note: `RESEARCH_NPB_SERIES_12_2026-09-01.md`
- `seriesOrder: 12`
- `data/index.json` 登録済み
- `data/versions-index.json` 登録済み
- PR: [#68](https://github.com/silovar-uk/myessays/pull/68)
- Episode 12 merge commit: `92abb0fcb027cb3a31d1b4963a2c022c540ce3a5`

### Deployment / QA

- Pages run: `33408943183` — success
- Visual QA run: `33408944548` — success
- Pre-Deploy Renderer Check: 公開前に本番の実レンダラーへ全文を通し、日本語版2箇所・English Mix版1箇所のBold Boundary Rule違反を検出・修正してからPR作成。
- Post-Deploy目視確認: merge後に本番ページを開き、太字が正しく`<strong>`表示されていることを確認。

Episode 11で標準化した「Pre-Deploy Renderer Check + Post-Deploy Visual Check」の2段階体制が、Episode 12でも有効に機能した。今回は特に、公開**前**の段階でBold Boundary Ruleチェッカーが実際に問題を検出し、修正してから公開できた点が大きい。

## 2. 第12回で成立したこと

### 1. Layer AuditがBUSINESSだけでなくFANの構造にも再利用できた

Episode 11で収益構造向けに作ったLayer Audit（DEFAULT LEVEL / EXCEPTION / WHY THE EXCEPTION）が、Episode 12ではファンの関与構造（球団単位が基本、日本シリーズ・オールスターゲームだけリーグレベル）にそのまま適用できた。一つのtoolが異なる対象（収益・ファン関与）に再利用できることが実証された。

### 2. 「保護地域」という制度が、Episode 1のWHEREをファン視点で読み直す接続点になった

Episode 1で扱った「NPBの地図」（球団の所在地）が、野球協約第38条の保護地域という制度を通すと、「なぜその地域のファンにとって地元球団が一つに定まるのか」という別の問いへの答えになった。これは、シリーズ最初期のconceptを11回分の間隔を空けて再利用する、最も長距離のretrieval bridgeになった。

### 3. 「ファンの注目がスポンサー収入の土台」という接続を、断定を避けながら示せた

ファンの行動とEpisode 11の収益カテゴリー（入場料・放送権・スポンサー）を対応づける際、スポンサー収入については「ファンから直接支払われる収益ではない」ことを明示しつつ、注目がその土台になっているという構造的な関係を、編集上の解釈であると明記して示した。Fact DisciplineとInterpretationの分離が機能した。

### 4. 「ランキングにしない」というガードレールが実際に効いた

観客動員数を扱う際、個別球団の順位（例：観客動員トップの球団）ではなく、リーグ全体の平均という文脈情報だけを使う判断をした。ブリーフのガードレールが実際の執筆判断を制約した具体例になった。

## 3. KEEP

- Pre-Deploy Renderer Check + Post-Deploy Visual Checkの2段階体制を継続する。
- 一つのconceptual tool（Layer Auditなど）を、異なる対象へ再利用できないか毎回検討する。
- 数字を使う際は、ランキング化を避け、規模感や構造を示す文脈情報として位置づける。
- ファンの行動と収益の接続など、シリーズ独自の解釈は、NPB公式の説明ではないと明記する。

## 4. CHANGE

（今回は特になし。Episode 11のCHANGE事項は引き続き有効。）

## 5. REMOVE

（今回は特になし。）

## 6. ADD

### Long-Distance Retrieval（新しい観察）

Episode 1のconceptを、11回分の間隔を空けてEpisode 12で再利用できた。シリーズが長くなるほど、直近の回だけでなく、初期の回のconceptも再利用対象として意識的に振り返る価値がある。今後のBrief作成時には、直近2〜3回だけでなく、シリーズ全体から再利用できるconceptがないか確認する。

## 7. Beginner Check

Episode 12読了後、初心者は少なくとも次を区別できる。

- ファンと球団の結びつきには、保護地域という制度的な根拠がある。
- 観戦・視聴・ファンクラブ加入は基本的に球団単位で構造化されている。
- ファンクラブは観客動員という収益の安定化装置としての側面を持つ。
- ファンの行動は入場料・放送権・スポンサーという収益カテゴリーへつながる。
- オールスターゲームは日本シリーズと同じくリーグレベルの例外イベントである。
- 観客動員数のランキングや「一番人気」の議論は、本シリーズの関心ではない。

Result: **PASS**。

## 8. Phase UI Decision — 判断点到達、ただし継続DEFER

Episode 11のRetrospectiveで「BUSINESS SYSTEM側が2〜3本揃った時点（目安：Episode 13前後）」を次の判断点としていた。Episode 12の完了により、BUSINESS SYSTEM側はEpisode 11・12の**2本**が揃った。

判断：

**Phase UIの実装は、依然として見送る。**

理由：

1. Episode 11・12は共に「制度→収益・関与構造」という似た型の記事であり、BUSINESS SYSTEM内部の多様性がまだ確認できていない（放映権契約・スポンサー契約・スタジアム経済など、異なる型の記事が必要）。
2. 2本ではPLAYER SYSTEM（10本）との比率が大きく偏っており、UI上の対称性を今から固定する根拠が薄い。
3. Series機能（`12/12`表示）のナビゲーションで、読者が迷っている兆候は確認できていない。

Next formal checkpoint: **BUSINESS SYSTEM側が3〜4本揃った時点（目安：Episode 14前後）、またはPLAYER SYSTEMへの追加回が発生した時点。**

## 9. Episode 13 Brief

### Selected theme

**「注目はどうやって契約に変わるのか」**（スポンサーシップ入門）

Provisional Role:

`SPONSORSHIP / ATTENTION-TO-CONTRACT`

### Core Question

**球団とスポンサー企業の関係は、どんな制度・契約構造の上に成り立っているのか？ファンの注目は、どうやって具体的な契約・収益へ変換されるのか？**

### Why next

Episode 12の`NEXT QUESTION`が、そのまま次の問いになっている。

> What institutional and contractual structure does the relationship between a club and its sponsors actually rest on?

Episode 11で収益カテゴリーとしての「スポンサー収入」を、Episode 12でファンの注目がその土台になっているという構造を扱った。Episode 13では、その注目が実際にどんな契約形態（看板協賛、ユニフォームスポンサー、命名権など、確認できる範囲で）を通じて収益になるのかを扱う。

### Candidate framework

Episode 11のREVENUE LINK表と、Episode 12のLayer Auditを組み合わせて設計する。

1. SPONSORSHIP FORM — どんな形の協賛がある？（看板、ユニフォーム、命名権など確認できる範囲で）
2. WHAT IS SOLD — スポンサーは具体的に何を得ているのか？（露出、権利、体験など）
3. WHO NEGOTIATES — 契約は誰と誰の間で結ばれる？（球団単位か、リーグレベルの例外はあるか）
4. LINK TO ATTENTION — Episode 12のファンの注目は、どうこの契約価値へ反映されるのか？

### Guardrails

- 具体的な契約金額・広告効果を推測しない。
- 特定スポンサー企業の経営戦略を評価しない。
- 「一番稼いでいる球団」ランキングにしない。
- Episode 10〜11で扱ったサラリーキャップ不在・親会社モデルの論点を繰り返さない。
- スポーツマーケティング理論を体系的に輸入しすぎず、NPBの制度・実例に根ざす。

### Retrieval requirement

Episode 11の収益カテゴリー（放送権・入場料・スポンサー）と、Episode 12のREVENUE LINK・Layer Auditを、単なる要約ではなく「注目がどう契約価値になるか」を説明する道具として再利用する。

## 10. Better Question achieved

Before:

「どの球団が一番人気？」

After:

**「この球団とファンの結びつきは、どの制度によって支えられていて、その関与はどの収益カテゴリーにつながっているのか？」**

Episode 12 success criterion: **PASS**（本編QA・Pre-Deploy Renderer Check・目視確認まで含めて完了）。
