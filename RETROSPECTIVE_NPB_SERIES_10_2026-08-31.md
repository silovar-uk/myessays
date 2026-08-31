# NPB学習シリーズ 第10回 Retrospective / 第11回 Brief

Updated: 2026-08-31
Series: `野球という産業を読む`
Episode 10: `npb-roster-construction-mechanism-integration`

## 1. Publish result

第10回「球団はどうやって戦力を組み立てるのか」を、日本語canonical + English Mixとして公開。

- Japanese: `essays/2026-08-31-npb-roster-construction-mechanism-integration.md`
- English Mix: `english-mix/npb-roster-construction-mechanism-integration.md`
- Research Note: `RESEARCH_NPB_SERIES_10_2026-08-31.md`
- `seriesOrder: 10`
- `data/index.json` 登録済み
- `data/versions-index.json` 登録済み
- 本編PR: [#63](https://github.com/silovar-uk/myessays/pull/63)
- Episode 10本編 merge commit: `8b155727fce5bcdeaa52d4d63fe3d6738e894ea4`
- 追加修正PR: [#64](https://github.com/silovar-uk/myessays/pull/64)（後述のレンダリング不具合修正）
- Episode 10修正 merge commit: `91bd4bf1713b6928c29e6c08a809428e2e4baeb8`

### Deployment / QA

- Pages run（本編）: `33400580748` — success
- Visual QA run（本編）: `33400582130` — success
- Pages run（修正）: `33403177626` — success
- Visual QA run（修正）: `33403179011` — success

本編merge直後に本番サイトを目視確認したところ、**太字（`**...**`）が2箇所だけ生の記号のまま表示される不具合**を発見し、同日中に修正PRを追加した。詳細は次節。

## 2. Incident — CommonMarkのflanking delimiter ruleで太字が壊れた

### 何が起きたか

本番サイトで記事を開いたところ、次の2箇所だけ`**`が`<strong>`へ変換されず、生の記号のまま表示されていた。

- 日本語版：`NEEDは「選手が何人足りないか」ではなく、**「どんな役割が、どんな時間軸で足りないか」**という形で…`
- 日本語版：`これは、球団の戦力構築を…ではなく、**複数mechanismの配分（ポートフォリオ）**として見る視点である。`

他の10箇所以上の太字は正常に表示されており、局所的な不具合だった。

### 原因調査

1. まずapp.js側の独自markdownパーサー（`renderMarkdown` / `inlineMarkdown`）を疑ったが、単体で該当文字列を処理すると正常に`<strong>`へ変換された。
2. `markdown-engine.js`が`window.renderMarkdown`を`marked` + `DOMPurify`ベースの新エンジンへ**上書き**しており、本番の実際のレンダリングパスはこちらだと判明。
3. `window.MyEssaysMarkdown.render()`を本番ブラウザ上で直接呼び出し、同じ入力を与えて再現に成功。
4. CommonMarkの[flanking delimiter rule](https://spec.commonmark.org/)では、`**`が閉じタグとして機能するには「直前が空白でない」に加えて、「直前が句読点類の場合は、直後が空白・句読点・行末のいずれかである」ことが必要。
5. 該当2箇所はどちらも、`」`や`（ポートフォリオ）`のような**閉じ括弧の直後に`**`が続き、さらにその直後に空白なしで平仮名（「という」「として」）が続く**という形になっていた。閉じ括弧（句読点）の直後に、句読点でも空白でもない文字が続くため、右flanking条件を満たさず、閉じタグとして解釈されなかった。

### 修正

閉じ括弧・引用符を太字の**範囲外**へ移動する形で修正（意味は変えていない）。

- `**「どんな役割が…」**という形で` → `「**どんな役割が…**」という形で`
- `**複数mechanismの配分（ポートフォリオ）**として` → `**複数mechanismの配分**（ポートフォリオ）として`

English Mix版でも同型のバグを2箇所（ASCII引用符 `"..."` が閉じ括弧の役割をしていた箇所）発見し、同じ方針で修正した。

### 検証方法

修正後、本番ブラウザ上で`window.MyEssaysMarkdown.render()`に全文（front matter除く本文）を直接通し、出力HTMLに`**`が1文字も残っていないことを確認した。ローカルの静的チェックだけでなく、**実際に本番で使われているレンダラーそのもの**で検証した点が今回の鍵だった。

## 3. Implementation note — concurrent index updates

Episode 10制作中も、他の記事（water flosser essayなど）が並行してmainへmergeされた。

対応：

1. PR作成前に必ず`git fetch origin`でmainの最新状態を確認。
2. `data/index.json` / `data/versions-index.json`は先頭に1件追加するのみで、既存entryは変更しない。
3. push前・merge前にそれぞれ`mergeable: true`を確認。

Episode 9の教訓（indexをshared infrastructureとして扱う）は今回も有効に機能した。

## 4. 第10回で成立したこと

### 1. 5つのmechanismを一つの意思決定問題へ統合できた

Episode 5〜9で個別に読んできたドラフト・育成・契約更改・FA・トレードを、

**NEED → SOURCE → MECHANISM → CONSTRAINT → TIME HORIZON → PORTFOLIO**

という一つのRoster Construction Auditへ統合した。個別制度をもう一度説明し直すのではなく、既存conceptを「編成判断」という上位問題の変数として再利用した点が、Episode 8→9の`Mobility Mechanism Audit`再利用と同じ構造のretrieval bridgeになっている。

### 2. Episode 6の支配下・育成データがCONSTRAINTとして再利用できた

Episode 6で確認済みだった「2026年7月31日時点の支配下登録836名」「8月27日時点の育成選手230名」を、新しい取材をせずにそのままCONSTRAINT節で再利用できた。シリーズ内で確認済みの事実を後の回の制約条件として再利用する、という新しいretrievalの形が生まれた。

### 3. 情報源が食い違う項目を「構造だけ扱う」という判断ができた

外国人選手の同時出場登録人数は、複数の二次情報源で4人・5人の食い違いがあり、単一の信頼できる現在値を確定できなかった。ここで具体的な数字を無理に断定せず、「支配下登録とは別枠がある」という構造だけを扱う判断をした。これはFact Disciplineの実践例として今後も参照できる。

### 4. デプロイ後の目視確認が実際に不具合を捕まえた

Episode 9までのQAチェーンはPages成功・Visual QA成功をもって完了としていたが、今回はそれに加えて**人間の目でレンダリング結果を読む**ことで、自動テストが検知していなかった表示不具合を発見できた。Visual QA（スクリーンショット比較ベース）は変化の有無は検知できても、「文字として`**`が読める」ことそのものは必ずしも検知対象になっていなかった可能性がある。

## 5. KEEP

- Episode 8〜9のframeworkを、暗記の再確認ではなく新しい上位問題の変数として再利用する。
- シリーズ内で既に確認済みの数値は、再取材せずに引用元を明示して再利用する。
- 情報源が食い違う具体的な数字は、断定せず構造だけを書く。
- indexをshared infrastructureとして扱い、merge前に必ず最新mainを確認する。
- merge後、実際に本番ページを開いて目視確認する（自動QAだけで完了と判断しない）。

## 6. CHANGE

### 1. Reading Mode / Structure annotationを含む記事は、実際の本番レンダラーで太字を検証する

`app.js`の`renderMarkdown`とは別に`markdown-engine.js`が本番の実描画エンジンを上書きしている。今後、太字・強調を含む記事を公開する際は、ローカルの簡易チェックだけでなく、可能なら本番相当のレンダラー（`marked` + `DOMPurify`、CommonMark準拠）で検証する。

### 2. 太字の閉じ側が句読点・括弧・引用符に接する書き方を避ける

`**text（注記）**が続く` のように、太字の閉じ`**`の直前が閉じ括弧・引用符で、直後に空白なく文字が続く構文は、CommonMark準拠エンジンで壊れる可能性がある。括弧・引用符は太字の外側に置く。

## 7. REMOVE

- 「Visual QA success」だけを公開完了の十分条件として扱うこと。表示内容の目視確認を省略しない。

## 8. ADD

### Bold Boundary Rule

太字`**...**`の直前直後が句読点・括弧・引用符になる場合、閉じ側の直後に空白・行末以外の文字が続かないか確認する。続く場合は、括弧・引用符を太字の外側へ出す。

### Post-Deploy Visual Check

Pages deploy成功後、少なくとも新規記事1本は実際にブラウザで開き、本文が意図通り表示されているかを確認してから「完了」と判断する。

## 9. Beginner Check

Episode 10読了後、初心者は少なくとも次を区別できる。

- 「強い球団を作る」＝「良い選手を集める」ではなく、複数mechanismを制約の中で組み合わせる問題である。
- NEEDは選手獲得そのものではなく、何が足りないかの判断である。
- SOURCE（内部育成／外部獲得）とMECHANISM（draft/development/contract/FA/trade）は別レイヤーである。
- 支配下枠・育成枠・出場選手登録は別々の絞り込み段階である。
- 編成判断は今シーズン用か将来への投資かで重心が変わる。
- 一つの獲得手段に依存しないポートフォリオという考え方は編集上の解釈であり、NPB公式の定義ではない。
- NPBには北米式の一般的なサラリーキャップは存在しない。

Result: **PASS**。

## 10. Phase UI Decision（正式判断）

Episode 9のRetrospectiveで「Episode 10終了後を正式判断点とする」としていた、Phase UI導入の判断を行う。

### 候補taxonomy（再掲）

- FOUNDATION（1〜3）
- LEAGUE DESIGN（4）
- TEAM BUILDING（5〜6）
- PLAYER ECONOMICS / MOBILITY（7〜9）
- ROSTER CONSTRUCTION SYNTHESIS（10）

### 判断：Phase UIは実装しない（DEFER → NOT NOW、次の判断点は方向性が分岐した後）

理由：

1. **LEAGUE DESIGNが依然1記事のみ**で、taxonomyとして非対称なまま。
2. Episode 10自身の`NEXT QUESTION`が、**球団経営・収益構造という、これまでとは異なる次元（PLAYER中心 → BUSINESS中心）への転換**を示している。次回以降がPLAYER側の続き（外国人選手獲得・ポスティング・現役ドラフトなど）に進むのか、BUSINESS側（収益構造・放映権・スタジアムなど）へ進むのかによって、taxonomyの形が大きく変わる。
3. 現状のSeries機能（`10/10`表示、前後ナビゲーション）は、seriesOrderだけで十分読者のナビゲーションとして機能しており、Phase表示が今すぐ必要という兆候は確認できていない。
4. 方向性が分岐する前にUIを固定すると、今後の記事内容をtaxonomyへ無理に合わせてしまう危険がある（ガードレール参照）。

### 次の正式判断点

**Episode 11（球団経営・収益構造）完了後。** PLAYER中心の10回とBUSINESS中心の1回目が揃った時点で、大分類（例：PLAYER SYSTEM / BUSINESS SYSTEM）の要否を再評価する。

## 11. Episode 11 Brief

### Selected theme

**「球団は何によって成り立っているのか」**（球団経営・収益構造入門）

Provisional Role:

`CLUB BUSINESS / REVENUE STRUCTURE`

### Core Question

**球団は何によって収益を得て、その収益構造は編成判断（NEED・CONSTRAINTの中身）にどう関係しているのか？**

### Why next

Episode 10の`NEXT QUESTION`が、そのまま次の問いになっている。

> その球団は、何によって収益を得て、何が球団経営そのものを成り立たせているのか？

これは、シリーズ発足時点のconceptual progression、

**GAME → TEAM → PLAYER → BUSINESS → LEAGUE → FAN → MEDIA → STADIUM → CITY → GLOBAL → STRATEGY**

とも一致する。Episode 1〜10はGAME/TEAM/PLAYERを中心に扱ってきたため、Episode 11でBUSINESS層へ進むのは、記事内の自然な問いの連続性とシリーズ全体設計の両方から支持される。

### Candidate framework

Episode 10のRoster Construction Auditにあった`CONSTRAINT`（特に契約・budget関連）を、球団経営という上位レイヤーから見直す形で設計する。

1. REVENUE SOURCE — 何から収益を得ている？（入場料・放映権・スポンサー・グッズなど、確認できる範囲で）
2. COST STRUCTURE — 何に費用がかかる？（人件費以外も含め、確認できる範囲で）
3. OWNERSHIP MODEL — 球団はどんな所有・経営形態か？（親会社との関係など）
4. LEAGUE-LEVEL SHARING — リーグ全体で分配・共有される収益はあるか？
5. LINK TO ROSTER — 収益構造は、編成判断（CONSTRAINT）にどうつながるか？

### Guardrails

- 個別球団の決算数値を推測・捏造しない。公開情報がない場合は「非公開」と明記する。
- サラリーキャップが存在するかのような書き方をしない（Episode 10の否定を維持する）。
- 「儲かっている球団／儲かっていない球団」のランキングにしない。
- 放映権・スポンサー・スタジアムなど、隣接テーマを全部一度に扱わない。Information Budgetで明示的に扱わない範囲を示す。
- Episode 7（契約・年俸）、Episode 10（CONSTRAINT／PORTFOLIO）を最低限retrievalする。

### Retrieval requirement

Episode 7の契約・年俸情報と、Episode 10のCONSTRAINT／PORTFOLIOという2つを、単なる要約ではなく「収益構造がなぜ編成の制約になるのか」を説明する道具として再利用する。

## 12. Better Question achieved

Before:

「どの球団のドラフト・FA・トレードが一番うまくいった？」

After:

**「この球団は、何が足りないと判断し、どのmechanismの組み合わせで、どんな制約の中でrosterを組み立てているのか？」**

Episode 10 success criterion: **PASS**（本編QA・レンダリング不具合修正・目視確認まで含めて完了）。
