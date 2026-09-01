# NPB学習シリーズ 第15回 Retrospective / 第16回 Brief

Updated: 2026-09-01
Series: `野球という産業を読む`
Episode 15: `npb-club-business-construction-synthesis`

## 1. Publish result

第15回「球団経営という一つの全体をどう組み立てるのか」を、日本語canonical + English Mixとして公開。

- Japanese: `essays/2026-09-01-npb-club-business-construction-synthesis.md`
- English Mix: `english-mix/npb-club-business-construction-synthesis.md`
- Research Note: `RESEARCH_NPB_SERIES_15_2026-09-01.md`
- `seriesOrder: 15`
- `data/index.json` 登録済み
- `data/versions-index.json` 登録済み
- PR: [#76](https://github.com/silovar-uk/myessays/pull/76)
- Episode 15 merge commit: `8be2a34ad214484a3d9c4b8fca8fe279d69456b7`

### Deployment / QA

- Pages run: `33488366303` — success
- Visual QA run: `33488366994` — success
- Pre-Deploy Renderer Check: stray `**` 0件を確認してからPR作成。
- Post-Deploy目視確認: merge後に本番ページを開き、太字が正しく`<strong>`表示、strayCount 0を確認。加えて、本文中の第11〜14回への内部リンク（`#/essay/...`形式）が正しく`<a>`タグとしてレンダリングされていることも確認した。

## 2. Implementation note — 並行更新とrebaseによる解決

Episode 15制作中、mainでは他の記事（Design Literacy、Asian Games関連、Prompt Caller）が並行してmergeされ、`data/index.json`・`data/versions-index.json`が更新された。

対応：

1. 自分のcommitをbranchへ確定させた後、`git fetch`で最新mainを確認。
2. `git rebase origin/main`を実行し、index系ファイルでconflictを検出。
3. conflict内容を確認し、upstream側の新規4エントリと自分の1エントリを両方保持する形で解決。
4. `node tools/audit-content.mjs --strict`で0件を再確認してからpush。

Episode 9で確立した「index はshared infrastructure」という原則が、今回はrebaseという形で実践された。mergeコミットを作るのではなくrebaseを選んだことで、履歴が直線的に保たれた。

## 3. 第15回で成立したこと

### 1. PLAYER SYSTEMとBUSINESS SYSTEMが、初めて明示的に接続された

Episode 10のCONSTRAINT（budget）を、Episode 11〜14の4つの土台（収益構造・ファン・スポンサーシップ・球場所有）の組み合わせとして説明し直した。これにより、2つのsynthesis回（Episode 10とEpisode 15）が、それぞれ独立した統合で終わらず、**上下に接続した一つのシステム**として閉じた。

### 2. Episode 10と対称な構造が、狙って作れることを実証した

Episode 5〜9（5つのmechanism）→Episode 10（synthesis）という構造を、Episode 11〜14（4つの土台）→Episode 15（synthesis）として意識的に再現した。これは偶然の類似ではなく、Episode 14のRetrospectiveで「Episode 10と対称な回になる」と事前に見込んで設計した結果である。

### 3. 「利害関係者を並べる」という新しい統合の型ができた

これまでのsynthesis（Episode 10）は「mechanismをどう組み合わせるか」という一つの軸だったが、Episode 15では「誰が何を負担し、何を得るか」という利害関係者マップを加えた。これは今後、複数の主体が関わる制度を統合する際の新しい型になり得る。

## 4. KEEP

- 統合回では、既存回の再説明を最小限にし、新しいframeworkの導入に紙面を使う。
- 並行更新によるindex conflictは、rebaseで解決し、履歴を直線的に保つ。
- 統合回の中で、前段のsynthesis（今回ならEpisode 10）との接続を明示的に閉じる。

## 5. CHANGE

（今回は特になし。）

## 6. ADD

### Stakeholder Map（新規）

複数の主体が関わる制度を統合するとき、「誰が何を負担し、何を得るか」を一つの表に整理する。Episode 15のWHO PAYS / WHO BENEFITSがその最初の実装例。

## 7. Beginner Check

Episode 15読了後、初心者は少なくとも次を区別できる。

- 収益構造・ファン・スポンサーシップ・球場所有は、独立した4つの話ではなく一つのシステムである。
- 球場所有の構造は、他の土台の可能な範囲を規定する。
- 親会社・ファン・スポンサー・施設所有者は、それぞれ異なる負担と便益の関係にある。
- 編成のCONSTRAINT（budget）は、この4つの土台の組み合わせから生まれている。
- 「良い戦力を作れば必ず収益が増える」という一方向の断定は、このシリーズの立場ではない。

Result: **PASS**。

## 8. Episode 16 Brief

### Selected theme

**「戦力と経営は、互いにどう影響し合うのか」**

Provisional Role:

`PLAYER SYSTEM × BUSINESS SYSTEM INTERACTION`

### Core Question

**良い戦力は本当に収益を生み、収益は本当に良い戦力に変わるのか。その双方向の関係は、NPBの中でどう働いているのか？**

### Why next

Episode 15の`NEXT QUESTION`が、そのまま次の問いになっている。

> Does a good roster really generate revenue, and does revenue really turn into a good roster? How does that two-way relationship actually work inside NPB?

Episode 10（PLAYER SYSTEM）とEpisode 15（BUSINESS SYSTEM）を、それぞれ独立に統合した次の自然な一歩は、この二つのシステムを**双方向の関係**として読むことである。これはシリーズにとって、個別制度の理解→統合→システム間の相互作用という、もう一段高い抽象度への移行になる。

### Candidate framework

Episode 10のRoster Construction AuditとEpisode 15のClub Business Construction Auditを、双方向の矢印でつなぐ。

1. ROSTER → BUSINESS：良い戦力（勝利・話題性）は、Episode 15のどの土台（ファンの注目・スポンサーシップなど）に、どう影響し得るか？
2. BUSINESS → ROSTER：Episode 15の4つの土台が生むCONSTRAINT（budget）は、Episode 10のNEED・MECHANISM選択にどう影響するか？
3. FEEDBACK LOOP：この双方向の関係は、一度きりの因果ではなく、シーズンをまたいで循環する構造として読めるか？
4. LIMITS OF THE LOOP：この循環は、必ず好循環（勝てば儲かり、儲かれば勝てる）に働くとは限らない。どんな条件で循環が弱まる、あるいは逆方向に働き得るか？

### Guardrails

- 「強い球団は必ず儲かる」「儲かる球団は必ず強い」という決定論的な因果を主張しない。これは実証が難しい古典的なスポーツ経済学の論点であり、本シリーズの検証範囲を超える。
- 特定球団の勝敗と収益を突き合わせて評価・ランキングしない。
- 新しい統計的手法（相関分析など）を導入しない。あくまで制度的な経路（どんな仕組みで影響し得るか）を読む。
- Episode 10・15の内容を再度長く説明し直さない。接続に徹する。

### Retrieval requirement

Episode 10のRoster Construction AuditとEpisode 15のClub Business Construction Auditの両方を、単なる要約ではなく、双方向の関係を説明する道具として同時に使う。シリーズ内で初めて、2つのsynthesis回を同時に再利用する回になる。

## 9. Better Question achieved

Before:

「どの球団経営が一番優れている？」

After:

**「この球団経営は、収益構造・ファン・スポンサーシップ・球場所有のどれを中心的な変数とし、それが編成のCONSTRAINTとどうつながっているのか？」**

Episode 15 success criterion: **PASS**（本編QA・Pre-Deploy Renderer Check・目視確認・内部リンク確認まで含めて完了）。
