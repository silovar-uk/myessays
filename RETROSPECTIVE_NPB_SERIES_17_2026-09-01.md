# NPB学習シリーズ 第17回 Retrospective / 第18回 Brief

Updated: 2026-09-01
Series: `野球という産業を読む`
Episode 17: `npb-comparative-institutions-mlb-jleague`

## 1. Publish result

第17回「NPBという制度は、何が普遍的で、何が固有なのか」を、日本語canonical + English Mixとして公開。

- Japanese: `essays/2026-09-01-npb-comparative-institutions-mlb-jleague.md`
- English Mix: `english-mix/npb-comparative-institutions-mlb-jleague.md`
- Research Note: `RESEARCH_NPB_SERIES_17_2026-09-01.md`
- `seriesOrder: 17`
- `data/index.json` 登録済み
- `data/versions-index.json` 登録済み
- PR: [#80](https://github.com/silovar-uk/myessays/pull/80)
- Episode 17 merge commit: `a1524fe0d4377f6a6f4b69e90266ae0ad8a5e495`

### Deployment / QA

- Pages run: `33517569076` — success
- Visual QA run: `33517571022` — success
- Pre-Deploy Renderer Check: 執筆時に日英各1箇所のBold Boundary Rule違反を検出・修正してからPR作成。
- Post-Deploy目視確認: merge後に本番ページを開き、太字が正しく`<strong>`表示、strayCount 0、内部リンク3件が正しくレンダリングされていることを確認。

## 2. 第17回で成立したこと

### 1. 「新規調査は最小限」という制約付きの回が、うまく機能した

Episode 17のBriefでは、既存の比較点（第10・11・16回）を優先し、新規調査をMLBのCBTとJリーグの配分金の2点だけに絞る方針を事前に決めていた。この制約が、シリーズが「NPBという主題から逸れて他国制度の調査回になる」ことを防いだ。**比較回であっても、主役はあくまでNPBである**という原則が保たれた。

### 2. 「北米式は一様ではない」という気づきが、第10回の記述を精緻化した

MLBとNFL・NBAの年俸抑制メカニズムの違いを確認したことで、第10回の「NPBには北米式のサラリーキャップは存在しない」という記述を、「ハードキャップもMLB型の課税も、どちらも存在しない」というより精密な記述へ改善できた。これは、**後の回が前の回の記述を検証し、精緻化する**という、Episode 14で見た「Backward-explanatory retrieval」の別バリエーションである。

### 3. 「参照関係」という、これまでとは違う種類の比較が見つかった

年俸抑制・放送権管理は「異なる制度設計」だったが、現役ドラフトとルール・ファイブ・ドラフトは「NPBがMLBを参照して設計した」という**参照関係**だった。比較には「異なる解決策」と「輸入された解決策」の少なくとも2種類があることが分かった。

## 3. KEEP

- 比較回では、新規調査の範囲を事前に制約し、主題（NPB）から逸れないようにする。
- 比較を通じて、過去の記述の精度を上げる機会を探す。
- 「異なる解決策」と「参照・輸入された解決策」を区別して記述する。

## 4. CHANGE

（今回は特になし。）

## 5. ADD

### Precision-through-comparison（新規）

他制度と比較することで、自国制度についての過去の記述がより正確になることがある。比較回は、新しい事実を追加するだけでなく、既存の記述を精緻化する機会としても使う。

## 6. Beginner Check

Episode 17読了後、初心者は少なくとも次を区別できる。

- 「北米式」は一様ではなく、NFL・NBA型のハードキャップとMLB型のソフトな課税は別物である。
- NPBには、そのどちらの仕組みも存在しない。
- 放送権管理は、NPB（球団単位）とJリーグ（リーグ一括管理）で対照的である。
- 現役ドラフトは、MLBのルール・ファイブ・ドラフトを参考に設計された。
- 制度の違いを、文化的な一般化ではなく、確認できる歴史的経緯で説明することの重要性。

Result: **PASS**。

## 7. Episode 18 Brief

### Selected theme

**「この制度は、これからどう変わっていくのか」**（制度の動態を読むための回）

Provisional Role:

`INSTITUTIONAL CHANGE / HOW TO KEEP READING`

### Core Question

**現在議論されている、あるいは近い将来変わる可能性がある制度は何か。読者は、これまで学んだ問いの立て方を使って、その変化をどう追い続ければよいのか？**

### Why next

Episode 17の`NEXT QUESTION`が、そのまま次の問いになっている。

> What's currently under discussion, or likely to change in the near future — and how should a reader keep tracking that change on their own?

17回にわたってNPBという制度の「現状」を読んできたシリーズにとって、次の自然な一歩は、**制度が静止していないこと**、そして読者が今後もこのシリーズの外で自力で制度を読み続けられるようにすることである。これは、単に新しい制度を紹介する回ではなく、**シリーズで培ったtoolkit（各種Audit、Fact Discipline、Rule Lifecycle Auditなど）を読者自身の手に渡す回**になり得る。

### Candidate framework

新しい制度の内容を深掘りするのではなく、「変化をどう追うか」という方法に焦点を当てる。

1. WHAT'S IN MOTION — 現時点で議論・提案段階にある制度は何か（例：現役ドラフトの拡大、外国人選手枠の見直しなど、確認できる範囲で）。
2. WHERE TO LOOK — 公式発表・選手会発表・報道のどこを見れば、制度変化の一次情報に近づけるか。
3. WHICH AUDIT APPLIES — シリーズで学んだAudit（Mobility Mechanism Audit、Roster/Club Business Construction Audit、Layer Audit等）のうち、新しい変化にはどれが適用できるか。
4. RULE LIFECYCLE — Episode 8で導入したRule Lifecycle Audit（CURRENT / PROPOSED / AGREED / EFFECTIVE）を再確認し、読者が「これは提案段階か、合意済みか、施行済みか」を自分で判定できるようにする。

### Guardrails

- 未確定の制度変更を、確定した事実であるかのように書かない。
- 特定の改革案を支持・批判する立場を取らない。
- シリーズを終わらせる最終回にはしない。あくまで「読者が自力で追い続けるための回」として設計する。
- 新しい大量の制度を紹介しない。方法（読み方）を渡すことに集中する。

### Retrieval requirement

Rule Lifecycle Audit（第8回）を中心に、シリーズ全体のtoolkit（Mobility Mechanism Audit、各種Construction Audit、Layer Audit、Fact Discipline、Disclosed vs Guessedなど）を一覧化し、読者が今後の制度変化にどのtoolを当てはめればよいかを示す。

## 8. Better Question achieved

Before:

「NPBとMLB、どっちの制度が優れている？」

After:

**「同じ問題に対して、それぞれのリーグはどんな制度的な解決策を選んでいて、その違いはどんな経緯から生まれたのか？」**

Episode 17 success criterion: **PASS**（本編QA・Pre-Deploy Renderer Check・目視確認まで含めて完了）。
