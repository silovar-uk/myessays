# NPB学習シリーズ 第2回 Retrospective / 第3回 Brief

Updated: 2026-08-31
Series: `野球という産業を読む`
Episode 2: `npb-2026-players-20-by-role`

## 1. Publish / QA result

第2回「いま知っておきたいNPB選手20人」を、日本語canonical + English Mixとして公開。

- Japanese: `essays/2026-08-31-npb-2026-players-20-by-role.md`
- English Mix: `english-mix/npb-2026-players-20-by-role.md`
- `seriesOrder: 2`
- `data/index.json` 登録済み
- `data/versions-index.json` 登録済み
- GitHub Pages build and deployment: success
- Content migration audit: success
- Static tests: success
- Reading versions browser QA: success
- Argument Structure browser QA: success
- Page Reader browser QA: success
- Browser visual QA: success

## 2. Episode 1 → Episode 2 comparison

### 共通テンプレとして残す

#### 1. 情報基準日

Pulse / Hybrid記事では必須。

Episode 1では順位・観客、Episode 2では選手成績が変動するため、「いつ時点か」が記事の品質を大きく左右した。

#### 2. Research Note

継続。

本文へ載せない候補・却下理由・更新対象数字を残せるため、記事本文を軽く保ちながら事実確認可能性を高められる。

#### 3. Today's Number

継続。ただし数字を無理に探さない。

Episode 1: 平均観客31,683人
Episode 2: 年俸調査対象713人

記事の規模感を一つの数字へ圧縮できるときだけ使う。

#### 4. Next Question

継続。

連載を「記事の集合」ではなく学習経路にする効果が大きい。

### テーマによって変える

#### 英語コーナー

Episode 1の `Today's Business English` を全記事へ固定しない。

Episode 2では `Today's Baseball English` の方が自然だった。

今後は記事テーマに応じて、

- Business English
- Baseball English
- Data English
- Stadium English

など名称を変えてよい。

目的はコーナー名の統一ではなく、本文と結び付いた3〜5語を学ぶこと。

#### Consultant's View

毎回独立した大きな章にはしない。

Episode 2では `Business Bridge` として最後に数問置く方が、選手紹介の流れを壊さなかった。

戦略・事業記事では再び大きく扱ってよい。

#### Argument Structure

毎記事必須にはしない。

Episode 2では冒頭の「役割で覚える」という主張段落にだけ使用し、選手プロフィールには付けなかった。この使い分けを維持する。

## 3. KEEP

- Research → Selection/Design → Write → Audit → English Mix → Implement → QA → Retrospective の工程。
- Pulse情報の基準日明示。
- 一次情報中心のResearch Note。
- 「今回説明しないこと」を意図的に決める。
- 記事末尾のNext Question。
- 日本語canonicalと同一IDのEnglish Mix。
- CIを公開完了条件へ含める。

## 4. CHANGE

- 固定テンプレではなく「必須骨格＋可変モジュール」にする。
- 人物記事ではCandidate Pool → Selection Bias Auditを追加する。
- 比較・ランキング風記事では「選出理由」と「非選出理由」をResearch Noteへ残す。
- 英語学習コーナーの名称はテーマ適応型にする。

## 5. REMOVE

- 全記事への `Consultant's View 3問` の強制。
- 全記事への同一英語コーナー名の強制。
- 全記事へのStructure Metadataの強制。
- 12球団均等配分のような、見た目だけのバランス調整。

## 6. ADD

### Selection / Comparison Audit

人物・球団・事例を選ぶ記事では、公開前に以下を確認する。

- 何を代表させるための選出か
- 選ばなかった有力候補は誰か
- 地域／球団／リーグ／ポジション等へ偏っていないか
- 偏りがあるなら学習上説明できるか

### Information Budget

各記事で「ここまでしか説明しない」を先に決める。

Episode 2ではOPS / WARを第3回へ送り、ドラフト・年俸・外国人制度も後続へ送ったことで、人物紹介が制度解説へ崩れるのを防げた。

## 7. Updated production rules

今後のシリーズは、以下を共通契約とする。

### Must

1. 最新情報を使う記事は基準日を明記。
2. 一次情報を優先してResearch Noteを作る。
3. 記事の中心Questionを一つ決める。
4. 「今回扱わないこと」を決める。
5. 日本語canonicalを先に確定。
6. English Mixは全文翻訳にしない。
7. `series` / `seriesOrder`を設定。
8. Index / Version index登録後にCIとPagesを確認。
9. Next Questionで次回へ接続。
10. 公開後Retrospectiveを残す。

### Optional modules

- Today's Number
- Argument Structure
- Consultant's View
- Business Bridge
- Role Map
- Selection Bias Audit
- What If?
- Comparison
- English vocabulary mini-section

記事テーマに意味があるものだけ使う。

## 8. 第3回 Brief

### Working title

**野球の数字を読む — 打率からOPS、WARへ**

### Role in the first learning unit

- Episode 1 = WHERE — NPBの地図
- Episode 2 = WHO — 選手と役割
- Episode 3 = HOW TO MEASURE — 選手を見る数字

この3本でシリーズの基礎ユニットを完成させる。

### Core Question

**「良い選手」を、私たちは何の数字で見ればいいのか？**

### Learning goals

読了後に以下を説明できる状態を目指す。

- 打率は何を見ていて、何を見ていないか
- 出塁率が打率と違う理由
- 長打率の意味
- OPSが何をまとめているか
- 防御率が何を測るか
- WHIP・奪三振が補う視点
- WARがなぜ生まれたか
- 指標は選手の「真の価値」そのものではないこと

### Use Episode 2 players as examples

新しい固有名詞を増やしすぎない。

- 佐藤輝明 → HR / SLG / OPS
- 近藤健介 → AVG / OBP / OPS
- 周東佑京 → SBと打撃指標外の価値
- 小園海斗 → ポジション・守備と打撃指標の限界
- 村上頌樹 → ERA
- 才木浩人 → K / K rate
- 伊藤大海 → 勝敗と投手個人成績
- マルティネス → StarterとRelieverの比較限界

### Suggested structure

1. QUESTION — 打率1位が最高の打者なのか
2. AVG — 最も有名な数字
3. OBP — アウトにならない力
4. SLG — どれだけ遠くへ進めたか
5. OPS — 出塁＋長打を一つへ
6. Pitching basics — ERA / WHIP / K
7. WAR — 一つの単位へまとめようとする試み
8. Why metrics disagree — 同じ選手でも評価が変わる
9. Limits — 数字はモデルであって本人ではない
10. Takeaways
11. Next Question

### Important guardrails

- 数式教科書にしない。
- いきなりwRC+、FIP、x系指標へ広げすぎない。
- WARを絶対評価として扱わない。
- NPB公式で提供される指標と、外部データサイト由来の指標を区別する。
- データ提供元・計算定義が異なる指標を無自覚に横並びしない。

### Next connection

第3回で「数字を見る目」ができたら、次に制度へ進む。

候補：
**第4回「なぜNPBは12球団・2リーグ・143試合なのか」**

ここから GAME → SYSTEM へ視点を上げる。
