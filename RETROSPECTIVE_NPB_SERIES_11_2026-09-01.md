# NPB学習シリーズ 第11回 Retrospective / 第12回 Brief

Updated: 2026-09-01
Series: `野球という産業を読む`
Episode 11: `npb-club-business-revenue-structure`

## 1. Publish result

第11回「球団は何によって成り立っているのか」を、日本語canonical + English Mixとして公開。

- Japanese: `essays/2026-09-01-npb-club-business-revenue-structure.md`
- English Mix: `english-mix/npb-club-business-revenue-structure.md`
- Research Note: `RESEARCH_NPB_SERIES_11_2026-09-01.md`
- `seriesOrder: 11`
- `data/index.json` 登録済み
- `data/versions-index.json` 登録済み
- PR: [#66](https://github.com/silovar-uk/myessays/pull/66)
- Episode 11 merge commit: `d59b12f314bdaeaae98684f47b7517df97f0818d`

### Deployment / QA

- Pages run: `33407069823` — success
- Visual QA run: `33407070873` — success
- merge後、本番ページを実際に開いて目視確認（Episode 10の教訓を反映）。太字は全て`<strong>`として正しく表示され、`**`の生残りは0件。

Episode 10で起きたレンダリング不具合は、今回は**公開前**の段階で本番の実レンダラー（`window.MyEssaysMarkdown.render`）へ全文を通して検証したため、混入せずに済んだ。Post-Deploy Visual Checkに加え、Pre-Deploy Renderer Checkが機能した最初の回になった。

## 2. 第11回で成立したこと

### 1. シリーズが初めてPLAYER層からBUSINESS層へ移行した

Episode 1〜10はいずれもNPBという制度の中での選手・球団の関係（場所・人・測定・競争制度・獲得・育成・契約・移動・編成）を扱ってきた。Episode 11は、シリーズ発足時のconceptual progression（GAME → TEAM → PLAYER → **BUSINESS** → …）に沿って、初めてBUSINESS層へ踏み出した回になった。

### 2. 「非上場の親会社モデル」という一つのconceptで、複数の観察をまとめられた

球団が非上場の子会社であること、親会社の欠損金補填が広告宣伝費として税務処理できること、放送権が球団単位であること、セ・パで親会社の業種傾向が異なること――これらは個別のtriviaになりがちな情報だが、「親会社モデル」という一つの軸でつなぐと、なぜNPBの球団経営がこういう形をしているのかが一貫して説明できた。

### 3. 「二層構造」という新しいconceptが生まれた

**基本は球団単位、日本シリーズだけリーグレベル**という二層構造は、Episode 8〜10で確立してきた「同じ結果でもmechanismが違う」系の比較フレームとは異なる、新しいタイプのconcept（「収益がどのレイヤーで集約されるか」という空間的な構造）だった。今後、放映権・スポンサー・スタジアムなど隣接テーマを扱う際にも使える可能性がある。

### 4. 一次資料へのアクセスが技術的に失敗した際の代替手順が機能した

国税庁通達の原文ページが文字コードの問題で直接引用できなかったため、税務専門データベース（税研）と複数の専門家解説記事で内容を相互確認する手順を取った。Episode 10で確立した「一次資料アクセス失敗時は複数の独立した二次情報源で相互検証する」という対応が、今回も有効に機能した。

### 5. Episode 7・Episode 10のconceptが自然に再利用できた

Episode 7の`PERFORMANCE ≠ SALARY`と、Episode 10のCONSTRAINT（budget）を、「その制約はどこから来るのか」という新しい問いの中で再利用した。個別制度の再説明ではなく、上位レイヤーの説明に使う、というEpisode 10と同型のretrieval bridgeになった。

## 3. KEEP

- 公開前に本番の実レンダラーへ全文を通す（Pre-Deploy Renderer Check）。Episode 10のPost-Deploy Visual Checkに加える形で標準化する。
- 一次資料アクセスに技術的失敗があった場合、複数の独立した二次情報源で相互検証し、その旨をResearch Noteに明記する。
- 個別の金額（売上高・利益・予算規模）は、公開情報がない限り推測しない。「非公開」と明記する。
- 一つのconcept（親会社モデル）で複数の観察を統合してから記事を書く。

## 4. CHANGE

### 1. Pre-Deploy Renderer CheckとPost-Deploy Visual Checkを両方標準化する

Episode 10まではPost-Deploy Visual Checkのみだったが、Episode 11でPre-Deploy Renderer Checkを追加したことで不具合が0件になった。今後もこの2段階を標準の完了条件とする。

## 5. REMOVE

（今回は特になし。Episode 10のREMOVE事項は引き続き有効。）

## 6. ADD

### Layer Audit（新しいconceptual tool）

収益・権限・意思決定など「誰のレベルで何が集約されるか」を問う制度を読むとき、次を確認する。

1. DEFAULT LEVEL — 通常はどのレベル（個別球団／リーグ全体）で発生・管理される？
2. EXCEPTION — 例外的にリーグレベルへ集約されるイベント・場面はあるか？
3. WHY THE EXCEPTION — その例外はなぜそのイベントだけに限定されているのか？

Episode 11の「基本は球団単位、日本シリーズだけリーグレベル」という二層構造は、このLayer Auditの最初の適用例になった。

## 7. Beginner Check

Episode 11読了後、初心者は少なくとも次を区別できる。

- NPB球団は多くが非上場の親会社子会社であり、独立した黒字企業として設計されていない。
- 親会社による欠損金補填は、税務上の広告宣伝費として扱われる仕組みがある（努力不要という意味ではない）。
- 放送権は球団単位で、リーグが一括管理・再分配しているわけではない。
- 日本シリーズだけは例外的にNPBが収益を集約・分配する。
- NPBには北米式の一般的なサラリーキャップは存在しない。
- 編成のCONSTRAINT（契約・budget）は、球団経営という土台の上に成立している。

Result: **PASS**。

## 8. Phase UI Decision — 継続DEFER

Episode 10のRetrospectiveで「Episode 11完了後を次の判断点とする」としていたが、Episode 11でPLAYER層からBUSINESS層への移行が実際に起きたことで、むしろ判断はより明確になった。

**PLAYER SYSTEM（Episode 1〜10）とBUSINESS SYSTEM（Episode 11〜）という大分類は、taxonomyとして成立しつつある。**

ただし、Phase UIの実装は依然として見送る。

理由：

1. BUSINESS SYSTEM側がまだEpisode 11の1本のみで、taxonomyとして評価するには早い。
2. Episode 12以降がBUSINESS層の中でどこまで広がるか（放映権・スポンサー・スタジアム・ファンなど）によって、下位分類の形が変わる。
3. 現状のSeriesナビゲーション（`11/11`表示）で読者が迷っている兆候は確認できていない。

Next formal checkpoint: **BUSINESS SYSTEM側が2〜3本揃った時点（目安：Episode 13前後）。**

## 9. Episode 12 Brief

### Selected theme

**「球団は誰に向けて何を提供しているのか」**（ファン・観客動員入門）

Provisional Role:

`FAN / AUDIENCE`

### Core Question

**球団経営にとって、ファンや視聴者はどんな存在として位置づけられ、観客動員や視聴という行動はどう球団のビジネスへつながっているのか？**

### Why next

Episode 11の`NEXT QUESTION`が、そのまま次の問いになっている。

> That "someone" — fans and viewers — how are they actually positioned within a club's business?

Episode 11で「収益は基本的に球団単位で発生する」と学んだ以上、次はその収益の実際の発生源（入場料を払う人、放送・配信を見る人）側から見る回が自然に続く。これはシリーズ発足時のconceptual progressionの`FAN`フェーズにも対応する。

### Candidate framework

Episode 11のLayer Auditと、Episode 6のDevelopment Pipelineのような「入口→関与→深化」型のframeworkを組み合わせて設計する。

1. ENTRY POINT — 新しいファン・視聴者はどこから接点を持つ？（球場、放送、SNS、地域イベントなど確認できる範囲で）
2. ENGAGEMENT LEVEL — 一度きりの観戦者と、継続的なファンはどう違う？
3. REVENUE LINK — ファンの行動（チケット購入・グッズ購入・配信視聴）は、Episode 11で見た収益カテゴリーのどれにつながる？
4. CLUB-SIDE INCENTIVE — 球団はファンとの関係をどう設計しようとしている？（地域密着施策など確認できる範囲で）

### Guardrails

- 「一番人気の球団」ランキングにしない。
- 個別球団のファンクラブ会員数・観客動員数の詳細比較を目的化しない（必要な最小限のみ）。
- マーケティング理論を体系的に輸入しすぎない。NPBの制度・実例に根ざした説明を優先する。
- サラリーキャップ・収益総額など、Episode 10〜11で否定・保留した論点を蒸し返さない。

### Retrieval requirement

Episode 11の収益構造（球団単位／日本シリーズ例外という二層構造）を、単なる要約ではなく「ファンの行動がどの収益カテゴリーへつながるか」を説明する道具として再利用する。

## 10. Better Question achieved

Before:

「どの球団が一番儲かっている？」

After:

**「この球団の収益はどこから来ていて、その収益の得方が、選手獲得・契約という編成判断にどんな制約として跳ね返ってくるのか？」**

Episode 11 success criterion: **PASS**（本編QA・Pre-Deploy Renderer Check・目視確認まで含めて完了）。
