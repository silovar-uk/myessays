# NPB学習シリーズ 第4回 Retrospective / 第5回 Brief

Updated: 2026-08-31
Series: `野球という産業を読む`
Episode 4: `npb-league-structure-12-teams-2-leagues-143-games`

## 1. Publish / QA result

第4回「なぜNPBは12球団・2リーグ・143試合なのか」を、日本語canonical + English Mixとして公開。

- Japanese: `essays/2026-08-31-npb-league-structure-12-teams-2-leagues-143-games.md`
- English Mix: `english-mix/npb-league-structure-12-teams-2-leagues-143-games.md`
- Research Note: `RESEARCH_NPB_SERIES_04_2026-08-31.md`
- `seriesOrder: 4`
- `data/index.json` 登録済み
- `data/versions-index.json` 登録済み
- PR: `#45`
- Merge commit: `3419989aeacf4af0ad6fcde687fc319fda9e05ba`

### GitHub Pages

- Run: `33363118546`
- Result: success

### Visual QA

- Run: `33363119121`
- Final result: success on rerun

Final successful attempt:

- Content migration audit: success
- Static tests: success
- Reading Versions browser QA: success
- Argument Structure browser QA: success
- Page Reader browser QA: success
- Browser visual QA: success
- QA artifacts upload: success

### Initial transient failure

最初のVisual QA attemptでは、Argument Structure browser QAのみfailure。

Failure point:

`argument-structure-qa.cjs` の既存fixtureで、Structure panelからParagraph 2を選択した直後に `is-argument-active` classが付いていることを確認するassertion。

今回の変更にはruntime / Argument Structure実装 / fixture変更を含んでいない。

同一commit・同一workflow jobを再実行したところ、Argument Structureを含む全工程がsuccessした。

現時点では一時的なbrowser timing差と判断し、production codeやtest codeは変更しない。

ただし今後同じ箇所が再発する場合は、assert直前にactive stateを明示的にwaitするなど、QA側のflakiness対策を検討する。

## 2. 第4回で成立したこと

### 1. `12 / 2 / 143`を一つの歴史として扱わなかった

今回最も重要だった編集判断。

- 2リーグ：1949年の1リーグ制からの再編
- 12球団：1950年代の参入・合併を経て1958年に6＋6へ収束
- 143試合：現在の対戦配分 `125 + 18`

を分離した。

これにより「NPBは昔から12球団・2リーグ・143試合だった」という誤った一枚岩の理解を避けられた。

### 2. Episode 1の既知情報を、新しい問いへ変換できた

Episode 1では、

`12球団 / 2リーグ / 143試合 / 交流戦 / CS`

を地図の骨格として覚えた。

Episode 4では、それを再説明するのではなく、

**なぜその形なのか / そのルールは何を作っているのか**

へ問いを上げた。

これはシリーズの「前の記事の知識を次の記事の教材として使う」方針に合っている。

### 3. League formatを競争の設計図として読めた

記事後半で、制度を見る4問を置いた。

1. WHO — 誰が参加するか
2. WHO PLAYS WHOM — 誰と何回戦うか
3. WHAT COUNTS — 何が順位を決めるか
4. WHAT HAPPENS NEXT — その後どう勝者を決めるか

この4問はNPBだけでなく、MLB / KBO / Jリーグ / Bリーグ比較にも再利用できる。

### 4. 歴史と現在ルールを分離できた

この記事はHybrid。

Core:
- 1リーグから2リーグへの移行
- 1950年代の球団数変遷
- 交流戦・CSという後付けの制度層

Update-sensitive:
- 143試合の内訳
- 主催試合配分
- 現行CS規定

歴史記事だから更新不要、と扱わず、現在制度だけ更新対象としてResearch Noteに残した。

## 3. KEEP

- 「現在の数字を、その数字が生まれた歴史へ戻す」構成。
- `2リーグ / 12球団 / 143試合`の成立を分離する。
- 前記事の既知情報を短く呼び戻し、すぐ新しい問いへ進む。
- League format = architecture of competition という一つのメタファー。
- `WHO / WHO PLAYS WHOM / WHAT COUNTS / WHAT HAPPENS NEXT` の制度読解フレーム。
- 歴史的事実と現在ルールで情報基準を分ける。
- 一次情報で確認できない「なぜ」を断定しない。
- Business Bridgeでは経済的含意を出すが、未検証の収益効果を結論にしない。
- Next Questionで制度から戦力配分へ移る。

## 4. CHANGE

### 1. 歴史記事ほどInformation Budgetを明示する

第4回は、1949年の分裂過程、1950年代の全球団再編、2004年球界再編、交流戦、CSまで深掘りできるテーマだった。

全部入れると「NPB史」になってしまう。

今後の制度史記事でも、

- 今回説明する変化
- 今回は名前だけ出す変化
- 独立記事へ送る論点

をResearch段階で分ける。

### 2. 「歴史的結果」と「制度目的」を分ける

ある制度が現在存在する理由を説明するとき、

- どう形成されたか
- 現在どんな機能を持つか
- 何を目的に導入されたか

は別の問い。

今回、12球団を「最適だから」、143試合を「売上最大化のため」、CSを「収益のため」と短絡しなかった。この区別を継続する。

### 3. QAの一回failureを隠さない

最終的にrerun successでも、初回failureはRetrospectiveへ残す。

再発パターンが蓄積したら、単発flaky testではなくQA設計の問題として修正する。

## 5. REMOVE

- 全球団の1950年代名称変遷を本文へ詰め込むこと。
- 1949年の企業間対立をこの1本で完全説明すること。
- 2004年球界再編問題を脇道で詳説すること。
- `12球団が最適`という根拠なしの最適化ストーリー。
- `143試合 = 伝統`という扱い。
- `試合数が多いほど売上も増える`という単純化。
- MLB比較を早く入れすぎること。

## 6. ADD

### Institutional Genealogy

今後、リーグ制度・選手制度・契約制度を扱うとき、現在のルールを説明する前に、

1. いつ生まれたか
2. 何が前の状態だったか
3. 途中で何が変わったか
4. 現在の形のどこが更新可能か

を確認する。

「今そうだから」ではなく「どう今になったか」を見る。

### Rule Change Audit

Hybridな制度記事では更新時に、

- 試合数
- 対戦配分
- 出場資格
- postseason / playoff条件
- lottery / selection order
- 契約交渉期限

など、当該制度の可変ルールをチェックリスト化する。

## 7. Beginner Check after publication

### PASS

読者が最低限、以下を説明できる構造になった。

- 1949年は1リーグ8球団だった。
- 最初の2リーグシーズンは12球団ではなく15球団だった。
- 1958年に6＋6へ収束した。
- 現在の143試合は125試合＋交流戦18試合。
- 143試合は歴史的な固定値ではない。
- 交流戦とCSは後から追加された制度である。
- 日程は単なるカレンダーではなく競争ルールである。

### Remaining questions

第4回を読むと自然に、

- 12球団の強さが大きく違ったらリーグはどうするのか
- 新しい球団はどう参入できるのか
- 選手は好きな球団へ自由に入れるのか
- リーグは戦力差へどこまで介入するのか

という問いが出る。

このうち、次は「選手の入口」を扱う。

## 8. 第5回 Brief

### Title

**ドラフトとは何を配分する制度なのか**

### Role

HOW TEAMS ARE BUILT / PLAYER ALLOCATION

### Core Question

**なぜ新人選手は、すべての球団と自由に契約するのではなく、ドラフトを通るのか？**

### Learning goal

ドラフトを、

「毎年秋に有望選手を指名するイベント」

から、

**複数球団が競うリーグで、新人選手との契約交渉権をどう配分するかという制度**

へ見方を変える。

### Reuse from Episode 4

Episode 4で、リーグは

- 誰が参加するか
- 誰と何回戦うか
- 何を順位とするか

を制度として決めていると学んだ。

Episode 5では、

**では競争に必要な希少資源＝選手をどう配るのか**

へ進む。

### First research anchor

2026年ドラフト会議は2026年10月22日開催予定。

2026年の詳細な選択手順は今後の公式発表を確認する。

制度理解では、直近で詳細が公開されているNPB公式の選択会議概要も参照し、2026年公開情報へ更新してから本文を確定する。

Important current principle from NPB draft overview:

- 球団が対象となる新人選手と契約するには、ドラフト会議で選手契約締結の交渉権を獲得する必要がある。
- 高校・大学所属選手にはプロ野球志望届など選択対象条件がある。
- 獲得した交渉権には期限があり、譲渡できない。

### Research questions

1. 新人選手選択会議は、どのような問題を解く制度として理解できるか。
2. 交渉権とは何を意味し、選手契約そのものと何が違うか。
3. 1位競合時の抽選は何をランダム化しているか。
4. 2位以降の選択順はどう決まるか。
5. 支配下ドラフトと育成ドラフトは何が違うか。
6. 選手側の志望・届出・入団拒否の余地をどう説明するか。
7. ドラフトはcompetitive balanceとどの程度関係するか。制度目的を推測で断定しないために何を一次資料で確認するか。
8. MLB / KBOと比較するなら、どの制度変数を揃えるべきか。

### Guardrails

- 歴代ドラフト名選手ランキングにしない。
- 2026年ドラフト候補ランキングにしない。
- 抽選ルールだけの記事にしない。
- 「ドラフト = 完全な戦力均衡制度」と断定しない。
- 「選手は球団を一切選べない」と単純化しない。
- 指名 = 入団確定、と書かない。交渉権と契約を分ける。
- 育成ドラフトを支配下ドラフトと混同しない。
- 現行ルールと過去制度を混ぜない。

### Suggested structure

1. QUESTION — なぜ自由契約ではないのか
2. SHORT ANSWER — ドラフトが配るのは「選手」ではなく交渉権
3. WHO CAN BE DRAFTED — 新人選手 / 志望届
4. FIRST ROUND — 競合と抽選
5. LATER ROUNDS — 選択順
6. DEVELOPMENT DRAFT — 育成選手という別入口
7. PLAYER AGENCY — 指名と契約は同じではない
8. SYSTEM VIEW — 何を公平にしようとしている制度なのか
9. WHAT IT DOES NOT SOLVE — 戦力差のすべては解決しない
10. Takeaways
11. Next Question

### Next connection

Episode 6:

**二軍・育成選手・ファームは何のためにある？**

ドラフトで「入口」を見たあと、獲得した選手をどう育て、試合機会を与え、一軍戦力へ変えるのかへ進む。

## 9. Series status after Episode 4

Learning path so far:

1. WHERE — NPBの地図
2. WHO — 選手と役割
3. HOW TO MEASURE — 選手を見る数字
4. SYSTEM — リーグの競争フォーマット

Next:

5. PLAYER ALLOCATION — 新人選手の入口

ここまでで、個人の見方からリーグ制度へ一段zoom outできた。

第5回からは、再びTEAM / PLAYERへ戻りながら、

**チームは制度の中でどう戦力を作るのか**

を積み上げる。
