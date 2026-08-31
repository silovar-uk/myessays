# NPB学習シリーズ 第13回 Retrospective / 第14回 Brief

Updated: 2026-09-01
Series: `野球という産業を読む`
Episode 13: `npb-sponsorship-attention-to-contract`

## 1. Publish result

第13回「注目はどうやって契約に変わるのか」を、日本語canonical + English Mixとして公開。

- Japanese: `essays/2026-09-01-npb-sponsorship-attention-to-contract.md`
- English Mix: `english-mix/npb-sponsorship-attention-to-contract.md`
- Research Note: `RESEARCH_NPB_SERIES_13_2026-09-01.md`
- `seriesOrder: 13`
- `data/index.json` 登録済み
- `data/versions-index.json` 登録済み
- PR: [#70](https://github.com/silovar-uk/myessays/pull/70)
- Episode 13 merge commit: `98297c3e56d370860be637bc121a79f592e21347`

### Deployment / QA

- Pages run: `33411025417` — success
- Visual QA run: `33411026817` — success
- Pre-Deploy Renderer Check: 執筆時にBold Boundary Rule違反を1箇所検出・修正してからPR作成。
- Post-Deploy目視確認: merge後に本番ページを開き、太字が正しく`<strong>`表示、strayCount 0を確認。

Episode 11〜12で標準化した2段階QA体制が3回連続で機能した。

## 2. 第13回で成立したこと

### 1. Layer Auditを「交渉レイヤー」という新しい軸へ応用できた

Episode 11〜12のLayer Auditは「収益・関与がどのレベルで発生するか」を扱っていたが、Episode 13では「契約の交渉相手がどのレイヤーにいるか」（球団単位 vs 施設所有者）という、近いが異なる軸へ応用した。同じtoolの骨格を保ちながら、対象を微妙にずらして再利用できることが分かった。

### 2. Rule Lifecycle Auditが約5回ぶりに再登場した

ユニフォーム広告のセ・パ導入差（2000年/2006年）を扱う際、Episode 8で導入したRule Lifecycle Auditの考え方（制度がいつ・どう変わったか）を再利用した。直近の回だけでなく、やや距離のある回のtoolも再利用対象になることを確認した。

### 3. 「示唆に留め、断定しない」という書き方を、より明示的な形で実践できた

ユニフォーム広告のセ・パ差と、Episode 11で見た放送権管理の傾向差を結びつける記述は、因果関係を証明する情報源がないことを本文中に明記したうえで「シリーズ上の示唆」として提示した。Fact Disciplineを、単に守るだけでなく、**読者に見える形で境界線を示す**という一段進んだ実践になった。

### 4. 公表済みの第三者契約情報を、安全に数字入りで扱えた

マツダスタジアムの命名権契約金額（年間2億2,000万円）は、企業自身が公表した情報であるため、「個別球団の非公開財務情報を推測しない」というガードレールに抵触せずに具体的な数字を使えた。ガードレールは「数字を一切使わない」ことではなく「推測しない」ことだと再確認できた。

## 3. KEEP

- Layer Audit・Rule Lifecycle Auditなど、過去のtoolを近い（しかし同一ではない）新しい対象へ応用する。
- 因果関係が未確認の関連付けは、「示唆」であることを本文中に明記する。
- 公開情報として企業自身が発表した数字は、出典を明示したうえで使ってよい。推測した数字と明確に区別する。
- Pre-Deploy Renderer Check + Post-Deploy Visual Checkの2段階体制を継続する。

## 4. CHANGE

（今回は特になし。Episode 12のCHANGE事項は引き続き有効。）

## 5. REMOVE

（今回は特になし。）

## 6. ADD

### Disclosed vs Guessed（新しい区別）

数字を扱う際、「当事者が自ら公表した数字（disclosed）」と「外部から推測した数字（guessed）」を明確に区別する。前者は出典を示せば使ってよいが、後者は使わない。Information Budgetの中に、今後この区別を明示的に含める。

## 7. Beginner Check

Episode 13読了後、初心者は少なくとも次を区別できる。

- スポンサーシップにはユニフォーム広告・看板広告・命名権という異なる形態があり、交渉相手が違う。
- 命名権は球団単独の契約ではなく、球場の所有者（自治体等）が当事者になり得る。
- ユニフォーム広告の導入時期・範囲にはセ・パで差がある。
- スポンサーが得る露出の性質は形態によって異なる（選手の活躍連動、観戦・視聴連動、場所への長期的結びつき）。
- 公表された契約金額があっても、それは広告効果を証明するものではない。

Result: **PASS**。

## 8. Phase UI Decision — BUSINESS SYSTEM 3本到達、判断更新

Episode 12のRetrospectiveで「BUSINESS SYSTEM側が3〜4本揃った時点（目安：Episode 14前後）」を次の判断点としていた。Episode 13の完了により、BUSINESS SYSTEM側はEpisode 11・12・13の**3本**が揃った。

今回、3本の型を振り返ると：

- Episode 11：制度・所有構造（親会社モデル）
- Episode 12：制度・関与構造（保護地域・ファン）
- Episode 13：制度・契約構造（スポンサーシップ）

いずれも「制度がどう収益・関与・契約を規定するか」という共通の型であり、内部の多様性は一定程度確認できた。

判断：

**Phase UIの実装は、依然として見送るが、次の1本（Episode 14）を最終確認材料とする。**

理由：

1. 3本はいずれも「制度→構造」という近い型であり、まだ異なる切り口（例：施設そのものの経済、地域再生、グローバル市場など）を含んでいない。
2. Episode 14（球場所有構造）は、これまでの「制度の中の経営」から一歩進み、**施設という物理的資産の経済**という新しい切り口になる可能性があり、BUSINESS SYSTEM内部の多様性を確認する良い機会になる。
3. PLAYER SYSTEM（10本）とBUSINESS SYSTEM（3〜4本）の比率は依然偏っているが、この偏り自体はPhase UIを妨げる理由ではなく、単に「BUSINESS SYSTEMがまだ短い」という事実として記録するに留める。

Next formal checkpoint: **Episode 14完了後、PLAYER SYSTEM / BUSINESS SYSTEMという大分類を正式導入するかどうかの最終判断。**

## 9. Episode 14 Brief

### Selected theme

**「球場は誰のものか」**（スタジアム所有構造入門）

Provisional Role:

`STADIUM OWNERSHIP`

### Core Question

**球団の本拠地球場は、誰が所有し、その所有構造の違いは球団経営やファンとの関係にどんな具体的な違いをもたらすのか？**

### Why next

Episode 13の`NEXT QUESTION`が、そのまま次の問いになっている。

> A club's home stadium might be owned by a municipality, or it might be built and owned by the club itself. What concrete difference does that ownership structure actually make?

Episode 13で命名権を通じて「球場の所有者」という登場人物が明示的に出てきた。Episode 14では、その所有構造そのものを主題にする。

### Candidate framework

Episode 13のWHO NEGOTIATES視点を、球場所有構造全体へ拡張する。

1. OWNERSHIP MODEL — 球場は誰が所有している？（自治体所有、球団自身の所有・建設、その他の形態、確認できる範囲で）
2. WHO OPERATES — 所有者と、日常の運営主体（指定管理者制度等）は同じか別か？
3. WHAT CHANGES WITH OWNERSHIP — 所有構造によって、命名権・看板広告・改装投資などの意思決定権はどう変わるか？
4. LINK TO EARLIER EPISODES — Episode 11（収益構造）・Episode 13（命名権）と、どうつながるか？

### Guardrails

- 個別球場の建設費・運営コストを推測しない。
- 「自治体所有は非効率、球団所有は効率的」といった価値判断をしない。
- 全12球団の球場所有形態を網羅的に一覧化することを目的化しない（代表的な対比を示す程度に留める）。
- 地域経済効果・再開発の是非など、球場外の政策論争へ踏み込まない。

### Retrieval requirement

Episode 13のWHO NEGOTIATES（命名権の交渉レイヤー）と、Episode 11の収益構造（球団単位／リーグレベルの二層構造）を、単なる要約ではなく「所有構造が経営判断の権限をどう変えるか」を説明する道具として再利用する。

## 10. Better Question achieved

Before:

「どのスポンサーが一番球団に貢献している？」

After:

**「このスポンサーシップは、どの形態で、誰と誰の間の契約で、ファンのどんな注目を土台にしているのか？」**

Episode 13 success criterion: **PASS**（本編QA・Pre-Deploy Renderer Check・目視確認まで含めて完了）。
