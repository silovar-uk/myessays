# NPB学習シリーズ 基礎ユニット Review — Episode 1〜3

Updated: 2026-08-31
Series: `野球という産業を読む`
Scope:
- Episode 1 `npb-2026-map-teams-players-attendance`
- Episode 2 `npb-2026-players-20-by-role`
- Episode 3 `npb-2026-baseball-metrics-avg-ops-war`

## 1. Unit Goal

最初の3記事を、独立した3本ではなく一つの学習ユニットとして評価する。

学習順序：

**WHERE → WHO → HOW TO MEASURE**

- Episode 1：NPBの地図を作る。
- Episode 2：地図の上に選手と役割を置く。
- Episode 3：役割を数字でどう見るかを学ぶ。

基礎ユニットの成功条件は、球団名・選手名・指標名の暗記ではない。

読者が、

**「どこで、誰が、どんな役割を持ち、それを何で測るのか」**

を一つの流れで説明できることである。

## 2. Overall Assessment

### Result

**PASS — 第4回へ進んでよい。**

3記事の役割分担は明確で、重複も大半がretrievalとして機能している。

現時点でEpisode 1〜3へ大きな構造変更を加える必要はない。

ただし、完全初心者向けの「試合そのものの基本構造」と、シリーズが長期化した際のPhase UIには未解決点が残る。

## 3. Understanding Gaps

### Gap A — 完全初心者には「試合の最小構造」が薄い

現状でも、

- 12球団
- 2リーグ
- 143試合
- 打率
- 防御率
- 先発 / closer

などへ進める。

一方で、完全初心者にとっては、

- 3アウトで攻守交代
- 9イニング
- 打席と打数の違い
- 自責点とは何か
- 先発 / 救援の基本的な役割差

が暗黙知になっている。

### Decision

**第1〜3回を今すぐ増補しない。**

理由：基礎3記事の主題がぼやけるため。

Article 4以降で制度・試合構造を説明する際に、その場で必要な最小定義を再導入する。

もし今後、初心者テストで理解阻害が大きいと判明した場合のみ、独立記事ではなく短い`BASEBALL BASICS`補助モジュールを検討する。

## 4. Duplication Audit

### Episode 1 → 2

Episode 1の注目選手とEpisode 2の選手が一部重なる。

これは不要な重複ではなく、

`名前を知る → 役割で覚え直す`

というretrievalになっている。

### Episode 2 → 3

Episode 2で、近藤のOBP、才木の奪三振などを既に軽く紹介している。

Episode 3では同じ事実を、

`役割の例 → 指標の意味`

へ変換している。

これもproductive repetitionとして機能する。

### Risk

今後、同じ説明文そのものをコピーすると反復が冗長になる。

後続記事では、既知情報を1〜2文で呼び戻し、新しい問いへすぐ進む。

## 5. Expertise / Difficulty Audit

### Episode 1

難度：Low

固有名詞は多いが、「地図」という一つの構造で整理されている。

### Episode 2

難度：Low–Medium

Role Mapにより、選手名が単独暗記にならない。

### Episode 3

難度：Medium

略語が増えるが、AVGから順に「前の指標の不足を次で補う」構造を取ったため、難度の上昇は許容範囲。

### Decision

**第4回でさらに専門度を上げない。**

Article 4は制度史・リーグ構造が中心になるため、歴史固有名詞や制度変更を詰め込みすぎず、

`現在の形 → なぜそうなった → 何を可能にしている`

の3段階に絞る。

## 6. Article Connection Audit

### 1 → 2

WHEREからWHOへの接続は明確。

### 2 → 3

WHOからHOW TO MEASUREへの接続は最も強い。

Episode 2で作ったRole MapがEpisode 3の教材になっている。

### 3 → 4

HOW TO MEASUREからSYSTEMへの接続も成立。

Episode 3末尾で、選手個人から競技・リーグの仕組みへzoom outする理由を作れている。

### Overall

**PASS。**

記事末尾のNext Questionはシリーズの主要な学習装置として継続する。

## 7. Series UI Review

### Current state

`series: "野球という産業を読む"`と`seriesOrder`で読順は成立している。

English Mixも同一article IDで紐づくため、シリーズ順序とReading Modeが競合しない。

### Missing

現状のシリーズUIでは、将来の

- 基礎編
- チーム編
- ビジネス編
- ファン・場所編
- 比較編
- 未来編

のようなPhase階層を明示的には持っていない。

### Decision

**今はUIを変えない。**

理由：3記事だけで24記事分のPhase UIを固定すると、後の学習設計変更を阻害するため。

目安として6〜8記事公開時点で、

- Phase名を表示する価値
- Series内の現在地
- 「基礎編を完了」表示
- 前後記事導線

を再評価する。

## 8. Update Burden Review

### Episode 1

Pulse比率：High

更新対象：順位、観客、主要選手、現在勢力図。

### Episode 2

Pulse比率：High

更新対象：選手成績、所属、Role例。

### Episode 3

Hybrid

Core：指標定義・metric lens設計。  
Pulse：選手成績例。

### Risk

3記事を別々の日に更新すると、同じ選手の数字やsnapshotが食い違う。

### Decision

**Episode 1〜3はFoundation Batchとして更新する。**

現在は2026年8月30日終了時点を共通snapshotとする。

更新する場合は、記事単体で日々追随するのではなく、

- シーズンの節目
- レギュラーシーズン終了
- 大きな順位・選手状況変化

など明確なタイミングで3記事をまとめて監査する方が、学習教材として安定する。

## 9. What the Reader Can Now Ask

Episode 1前：

「NPBってどのチームがある？」

Episode 1後：

「球団はどこにあって、今どのくらい強く、どのくらい人を集めている？」

Episode 2後：

「この選手は、試合のどんな価値を作る人？」

Episode 3後：

「その価値を、どの数字で見ればいい？ その数字は何を見落とす？」

この変化は、シリーズの最重要編集哲学である

**「前より良い問いを作れるようになったか」**

という基準を満たしている。

## 10. Before Episode 4 — Decisions

### Keep the backlog order

第4回は予定どおり、

**「なぜNPBは12球団・2リーグ・143試合なのか」**

へ進む。

### Episode 4 must reuse

Episode 1で既知になった、

- 12球団
- 2リーグ
- 143試合
- 交流戦18試合
- CS

を再利用する。

### Episode 4 must not become

- NPB通史
- 2リーグ分裂史だけの記事
- 日程制度の辞典
- MLBとの制度差一覧

### Core learning transition

Episode 3まで：

**選手の価値をどう見るか**

Episode 4から：

**その選手と球団が競争する「枠」は誰がどう設計しているのか**

ここで視点をPLAYERからGAME / LEAGUEへ一段上げる。

## 11. Final Decision

第1〜3回は、

**WHERE → WHO → HOW TO MEASURE**

という一つの基礎学習ユニットとして成立。

大きな修正は不要。

第4回へ進行可能。

次回の最重要課題は、既知の`12 / 2 / 143`を説明し直すことではなく、

**「なぜその制度なのか」という新しい問いへ変換すること。**
