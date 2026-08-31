# NPB学習シリーズ 第5回 Retrospective / 第6回 Brief

Updated: 2026-08-31
Series: `野球という産業を読む`
Episode 5: `npb-draft-allocation-negotiation-rights`

## 1. Publish / QA result

第5回「ドラフトとは何を配分する制度なのか」を、日本語canonical + English Mixとして公開。

- Japanese: `essays/2026-08-31-npb-draft-allocation-negotiation-rights.md`
- English Mix: `english-mix/npb-draft-allocation-negotiation-rights.md`
- Research Note: `RESEARCH_NPB_SERIES_05_2026-08-31.md`
- `seriesOrder: 5`
- `data/index.json` 登録済み
- `data/versions-index.json` 登録済み
- PR: `#46`
- Merge commit: `61ed1268d4c3357b25f8a8ef75f035e139e3ab52`

### GitHub Pages

- Run: `33365068626`
- Result: success

### Visual QA

- Run: `33365069340`
- Result: success on first attempt

Successful steps:

- Content migration audit: success
- Static tests: success
- Reading Versions browser QA: success
- Argument Structure browser QA: success
- Page Reader browser QA: success
- Browser visual QA: success
- QA artifacts upload: success

Episode 4で一度だけ一時failureしたArgument Structure fixtureも、今回は同じworkflowで初回success。

現時点ではQA infrastructure変更は行わない。

同箇所が再度failureした場合に、複数回の再現として明示的wait条件の改善を検討する。

## 2. 第5回で成立したこと

### 1. ドラフトを「くじ引きイベント」から外せた

今回の中心は、ドラフトのテレビ的な見せ場ではなく、

**何を配分する制度なのか**

へ問いを変えたこと。

最初に、NPB公式の用語である

`選手契約締結の交渉権`

を置いた。

これにより、

`PICK → NEGOTIATION RIGHT → CONTRACT`

という段階を明示できた。

初心者に最も起こりやすい、

`指名 = 入団確定`

という誤解を回避する構造になった。

### 2. Episode 4の制度読解を再利用できた

Episode 4では、league formatを

- WHO
- WHO PLAYS WHOM
- WHAT COUNTS
- WHAT HAPPENS NEXT

で読んだ。

Episode 5ではallocation制度向けに、

- RESOURCE
- ELIGIBILITY
- ORDER
- CONFLICT
- EXIT

へ発展させた。

前回のフレームをそのまま繰り返すのではなく、対象に合わせて変形できた。

これはRetrieval Bridgeとして良い。

### 3. 2026情報と2025手順を混ぜなかった

2026-08-31時点で公式発表されているのは、2026年ドラフトの開催日などであり、2026年版の詳細な選択手順は未公開。

そのため、

- 2026 current fact
- latest complete 2025 procedure

を明確に分離した。

「前年と同じだろう」で現行制度を推定しなかった。

Hybrid記事の更新設計として重要。

### 4. 戦力均衡を万能説明にしなかった

1965年のドラフト導入目的として、NPB公式資料には

- 契約金高騰の抑制
- 戦力均衡

が明記されている。

ただし本文では、

「現在のドラフト制度は戦力均衡のためだけに存在する」

とは書かなかった。

さらに、ドラフトだけでは、

- 育成
- 起用
- FA
- トレード
- 外国人獲得
- 経営力

などによる戦力差は消えないことも明示した。

## 3. KEEP

- タイトル自体をQuestionにする。
- 制度のテレビ的な表層ではなく「何を配るか」から始める。
- `PICK → NEGOTIATION RIGHT → CONTRACT` の段階分離。
- `RESOURCE / ELIGIBILITY / ORDER / CONFLICT / EXIT` の5問。
- FACTとINTERPRETATIONを分ける。
- 2026未公表部分を2025手順で黙って補わない。
- 歴史的な導入目的と、現在の機能を分ける。
- 制度が解決しない問題も必ず書く。
- 次の記事へ「制度上自然に残った問い」で接続する。

## 4. CHANGE

### 1. Update-sensitive rule articlesは「latest complete rule」を明記する

現年度ページが存在していても、詳細規則がまだ出ていない場合がある。

今後は、

- current year announced facts
- latest fully published procedure
- pending update items

をResearch Noteで明示する。

### 2. `EXIT`を制度記事の標準質問候補にする

今回、「選ばれたあと何が起こるか」を見ることで、指名と契約を分離できた。

制度は入口だけでなく出口・拒否・期限・失効条件を見ると理解が深くなる。

今後、

- FA
- ポスティング
- 支配下登録
- 育成契約
- 契約更新

などでも`EXIT / TRANSITION`を確認する。

### 3. 制度上の英語は直訳を避ける

`選手契約締結の交渉権`を、記事中では意味が伝わるように

`the right to negotiate a player contract`

と説明した。

英語版では制度用語を無理に一語対応させず、conceptを保持する。

## 5. REMOVE

- 2026候補ランキング。
- 歴代ドラフト1位一覧。
- 有名な抽選エピソードの羅列。
- 「弱い球団から必ず順番に取る」という雑な説明。
- 1巡目と2巡目以降を同じルールとして説明すること。
- 「選手は球団を選べない」とだけ書くこと。
- 「ドラフトで戦力差がなくなる」という万能論。
- 逆指名・自由獲得枠など過去制度史を脇道で全解説すること。

## 6. ADD

### Allocation Audit

今後「何かを配る制度」を扱うときは、Research段階で以下を埋める。

1. RESOURCE — 配分対象
2. ELIGIBILITY — 対象資格
3. ORDER — 配分順
4. CONFLICT — 競合解決
5. EXIT / TRANSITION — 配分後の選択肢・期限

### Current-vs-Latest Rule Split

現年度の完全版ルールが未公表なら、本文冒頭に明記する。

Do not silently project last year's procedure onto the current year.

### Draft Update Watchpoint

2026年版詳細公開後に再監査する項目：

- 1巡目方式
- 2巡目以降の指名順
- 優先リーグ
- 指名人数
- 育成選手選択会議
- 志望届期限
- 交渉権期限

## 7. Beginner Check after publication

### PASS

読者が最低限、以下を説明できる構造になった。

- ドラフトで球団が得るのはまず契約交渉権。
- 指名と契約は同じではない。
- 誰でも自動的に指名対象になるわけではない。
- 1巡目の重複指名は抽選で処理される（最新完全公開の2025手順）。
- 2巡目以降は別の指名順ルールがある。
- 交渉権には期限がある。
- 育成選手という別の入口もある。
- ドラフトだけでチームの強さは決まらない。

### Remaining beginner questions

第5回を読むと自然に、

- 支配下選手と育成選手は何が違う？
- 二軍とは何をする場所？
- ファームの試合は何のため？
- 指名された高校生が一軍に出るまで何が起きる？
- 一軍に登録できる人数はどう決まる？

という問いが残る。

これらは「ドラフト後」を理解するために必要。

## 8. Retrieval Bridge評価

Episode 5はEpisode 4の知識がなくても単独で読める。

一方、Episode 4を読んでいる場合は、

**リーグは試合だけでなく、選手の入口にもルールを置く**

という一段深い理解へ進める。

Retrievalは単なる復習ではなく、

`competition design → talent allocation`

というconcept transferになった。

PASS。

## 9. 第6回 Brief

### Decision

第1〜5回を通した次の自然な問いとして、Episode 6は以下を第一候補ではなく**正式な次回**とする。

### Title

**二軍・育成選手・ファームは何のためにある？**

### Role

PLAYER DEVELOPMENT / OPPORTUNITY SYSTEM

### Core Question

**ドラフトや契約で球団に入った選手は、どうやって一軍戦力へ変わっていくのか？**

### Why this is next

Episode 5の最後で、draftは選手の`ENTRY`を扱った。

しかしentryだけではteam buildingは説明できない。

球団は獲得した選手へ、

- 練習
- 実戦機会
- 評価
- 一軍への昇格
- 支配下登録

の経路を用意する必要がある。

FAや年俸へ先に進むより、まず

**獲得したtalentを戦力へ変えるinfrastructure**

を理解した方が学習順として自然。

### Research questions

1. 一軍 / 二軍 / ファームの制度上の位置づけは何か。
2. 2026年のファームリーグはどの球団で構成されるか。
3. 支配下選手と育成選手の契約・登録上の違いは何か。
4. 育成選手が一軍公式戦へ出るまでに何が必要か。
5. 支配下登録期限などのcurrent ruleは何か。
6. ファームの試合は勝つためだけのリーグなのか。
7. 選手育成・リハビリ・実戦機会・戦力評価という複数機能をどう整理するか。
8. 2024以降のファーム参加球団拡大をどこまで扱うか。

### Suggested framework

**PIPELINE**

ENTRY
→ DEVELOPMENT
→ GAME OPPORTUNITY
→ EVALUATION
→ PROMOTION

### Guardrails

- 二軍選手を「一軍より下手な選手」とだけ説明しない。
- 育成選手 = 二軍選手、と混同しない。
- ファーム = 練習試合、と書かない。
- 一軍登録・支配下登録・出場選手登録を混同しない。
- 2026年のファーム制度を必ず最新公式情報で確認する。

## 10. Better Question after Episode 5

Before:

**ドラフトではどの球団が誰を取る？**

After:

**ドラフトは何を配っていて、誰を対象に、どんな順番と競合処理で配り、その後どこまで球団と選手の選択余地が残る？**

この変化を、第5回の成功指標とする。
