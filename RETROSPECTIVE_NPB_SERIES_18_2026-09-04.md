# NPB学習シリーズ 第18回 Retrospective / 第19回 Brief

Updated: 2026-09-04
Series: `野球という産業を読む`
Episode 18: `npb-institutional-change-rule-lifecycle-toolkit`

## 1. Publish result

第18回「この制度は、これからどう変わっていくのか」を、日本語canonical + English Mixとして公開。

- Japanese: `essays/2026-09-04-npb-institutional-change-rule-lifecycle-toolkit.md`
- English Mix: `english-mix/npb-institutional-change-rule-lifecycle-toolkit.md`
- Research Note: `RESEARCH_NPB_SERIES_18_2026-09-04.md`
- `seriesOrder: 18`
- `data/index.json` 登録済み
- `data/versions-index.json` 登録済み
- PR: [#82](https://github.com/silovar-uk/myessays/pull/82)
- Episode 18 merge commit: `9579580ed1df9feb5d9badb8da9a48979703ef72`

### Deployment / QA

- Pages run: `33855777929` — success
- Visual QA run: `33855779224` — success
- Pre-Deploy Renderer Check: stray `**` 0件を確認してからPR作成。
- Post-Deploy目視確認: merge後に本番ページを開き、太字が正しく`<strong>`表示、strayCount 0、内部リンク6件が正しくレンダリングされていることを確認。

## 2. Incident — 作業中の日付誤り

執筆時、セッション内で「今日は2026年9月1日」という前提を持ったまま、Episode 18のfrontmatter・ファイル名・本文中の日付を2026-09-01として書き進めた。

しかし、実際には他の並行作業（他記事のindex更新）から見て、実日時は2026-09-04であることが`git log`のコミット日時、および`date`コマンドの出力から判明した。

### 対応

1. `date`コマンドと`git log -1 --format="%cI" origin/main`で実際の日付を確認。
2. ファイル名（essay、Research Note）を2026-09-04ベースへリネーム。
3. frontmatterの`created`・`updated`を修正。
4. 本文中の「情報基準日」表記（日英とも）を修正。
5. `data/index.json`のファイルパス参照も修正後のファイル名に合わせて更新。

### KEEP

**セッションが長時間に及ぶ場合、日付を推測せず、`date`コマンドまたは`git log`の実コミット日時で都度確認する。** 特に、システムの日付コンテキストがセッション開始時から更新されないまま長時間経過すると、実日時とずれる可能性がある。今後、新しいEpisodeのfrontmatter日付を設定する前に、必ず実日時を確認する。

## 3. 第18回で成立したこと

### 1. 「toolkitを渡す回」が、シリーズの性格を変えずに機能した

Episode 18は新しい制度の大量紹介を避け、既存のRule Lifecycle Auditを中心に据えた。これにより、シリーズの基本姿勢（Information Budgetを絞る、断定しない）を崩さずに、「読者が自分で読み続けられるようにする」という異なる目的を達成できた。

### 2. toolkitの限界を、正直に書けた

ピッチクロック・暑さ対策のような競技運営・安全面の制度変更が、既存のPLAYER SYSTEM / BUSINESS SYSTEM双方のtoolkitでは完全に説明しきれないことを明示した。これは、18回かけて作ったtoolkitを無条件に誇示するのではなく、**その適用範囲の境界を自ら示す**という、Fact Disciplineの精神をtoolkit自体にも適用した例である。

### 3. 実例3つが、Rule Lifecycle Auditの4段階のうち3段階を自然にカバーした

FA人的補償撤廃（PROPOSED）、ピッチクロック（AGREED、詳細未定）、暑さ対策基準（PROPOSED）という実例が、CURRENT以外の3段階をカバーした。意図して選んだわけではないが、結果として教材として機能する組み合わせになった。

## 4. KEEP

- toolkitを渡す回では、新しい制度を増やすのではなく、既存toolkitの再確認と実例適用に徹する。
- toolkitの適用範囲外を正直に明示する。
- 長時間セッションでは、日付を`date`コマンドや`git log`で都度確認する。

## 5. CHANGE

### 日付確認プロセスの標準化

今後、新しいEpisodeを作成する際は、frontmatterの日付を設定する前に必ず`date`コマンドまたは`git log -1 --format="%cI" origin/main`で実日時を確認する。これをEpisode作成の標準手順に追加する。

## 6. Beginner Check

Episode 18読了後、初心者は少なくとも次を区別できる。

- 制度のニュースは、CURRENT・PROPOSED・AGREED・EFFECTIVEのどの段階にあるかで意味が変わる。
- NPBと選手会、どちらの発表かによって、交渉のどの立場からの発信かが変わる。
- 「導入が決まった」という見出しでも、運用の詳細まで確定しているとは限らない。
- シリーズの各種Auditは万能ではなく、扱いきれない領域（競技運営・安全面）が残っている。

Result: **PASS**。

## 7. Episode 19 Brief

### Selected theme

**「ポスティング制度は、何を国境の外へ広げる制度なのか」**

Provisional Role:

`INTERNATIONAL MOBILITY / POSTING SYSTEM`

### Core Question

**選手が海外リーグへ移籍する際のポスティング制度は、これまで読んできたFA・トレードと、どこが同じで、どこが違う移動mechanismなのか？**

### Why next

Episode 18の`NEXT QUESTION`が、そのまま次の問いになっている。

> How does the posting system compare to FA and trade as a mobility mechanism — what's the same, and what's different?

Episode 18でtoolkitを読者へ渡した後の最初の実践として、Mobility Mechanism Audit（第8〜9回）をまだ扱っていない個別制度（ポスティング）へ適用する回になる。これは、シリーズ発足時から候補として残っていた「ポスティング / INTERNATIONAL MOBILITY」という未着手テーマの消化でもある。

### Candidate framework

Episode 8〜9のMobility Mechanism Auditをそのまま適用する。

1. INITIATOR — ポスティングは誰が始める（選手か、球団か）？
2. RIGHT / RELATIONSHIP — 何の権利・契約関係が動く？
3. CONSENT — 誰の同意がいつ必要か？
4. DESTINATION / MARKET — 移籍先はどう決まる（国内FA・トレードとの違い）？
5. COST / CONSIDERATION — 何が交換・負担される（ポスティング料等）？
6. TIMING — いつ可能か？
7. AFTER — 移動後に何が変わるか？

### Guardrails

- 特定選手の海外移籍の成功・失敗を評価しない。
- MLB球団側の詳細な契約制度（マイナー契約・メジャー契約の区別等）まで深掘りしない。あくまでNPB側のポスティング制度を中心に扱う。
- ポスティング料の具体的な相場・過去の金額比較をしない。
- 「日本人選手はメジャーを目指すべき」といった規範的な主張をしない。

### Retrieval requirement

第8〜9回のMobility Mechanism Auditを中心に、国内FA・トレードとの比較表を作り、単なる新制度紹介ではなく、既存toolkitの適用例として構成する。

## 8. Better Question achieved

Before:

「今度、野球のルールは何か変わるの？」

After:

**「この変化は今どの段階（提案・合意・施行）にあり、その一次情報はどこで確認でき、シリーズのどのtoolで読み解けるのか？」**

Episode 18 success criterion: **PASS**（本編QA・Pre-Deploy Renderer Check・目視確認・日付誤りの修正まで含めて完了）。
