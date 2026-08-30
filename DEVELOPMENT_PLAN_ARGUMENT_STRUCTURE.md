# MyEssays Argument Structure / Writing Architecture 開発計画

作成日: 2026-08-30
対象: https://silovar-uk.github.io/myessays/
Repository: https://github.com/silovar-uk/myessays

## 1. 目的

MyEssaysを「完成した文章を保存して読むサイト」から一段発展させ、文章の論証構造・思考の高度を読みながら確認できる Academic Reader へ拡張する。

今回の中心概念は、Eric Hayot の Uneven U、および阿部幸大『まったく新しいアカデミック・ライティングの教科書』で紹介される段落構造の考え方。

ただし、目的は「きれいなU字型を書くこと」ではない。

目的は、読者・書き手が次を把握できること。

- 今の文はどの概念レベルにいるか
- その文は何の役割を果たしているか
- 段落内で抽象→具体→抽象がどう移動しているか
- 主張に対する説明・証拠・分析が不足していないか
- 具体例を置くだけで終わらず、意味づけへ戻れているか

文章の評価装置ではなく、文章構造を観察するための道具として設計する。

---

## 2. 基本設計思想

### 2.1 Conceptual Level と Rhetorical Role を分離する

各文には必要に応じて、次の2種類の情報を持たせる。

### A. Conceptual Level

- L1: Concrete / Evidence
  - 数値、引用、一次情報、具体例、観察された事実
- L2: Description
  - 状況説明、要約、背景、パラフレーズ
- L3: Analysis / Synthesis
  - 比較、解釈、意味づけ、統合
- L4: Local Claim
  - 段落単位の主張、問題設定、小テーゼ
- L5: Larger Claim
  - 節・論考・より大きな議論へ接続する主張

L1〜L5は品質評価ではない。数字が高いほど優れているという意味ではなく、文章の概念レベルを示す。

### B. Rhetorical Role

必要な場合のみ、文の機能を付与する。

候補:

- Claim
- Evidence
- Description
- Analysis
- Counterargument
- Qualification
- Bridge
- Implication

例:

- L1 / Evidence
- L3 / Analysis
- L4 / Claim
- L4 / Counterargument
- L5 / Implication

Conceptual Level と Role を混同しない。

---

## 3. Uneven U の扱い

代表的な動き:

```text
L4
↓
L3
↓
L2
↓
L1
↑
L3
↑
L5
```

これを固定テンプレートではなく Conceptual Movement として扱う。

禁止:

- 全段落を同じ形へ変換する
- すべてL1まで下げる
- すべてL5で終える
- U字から外れた段落を不合格にする
- 4→3→2→1→3→5だけを正解とする

重要なのは数字列ではなく、文章がどのように具体化し、どのように再度抽象化しているかを見ること。

---

## 4. UI基本方針

MyEssaysの通常表示はこれまでどおり Reader を維持する。

Structure 機能はデフォルトOFF。

```text
通常:
Reader

構造確認:
Reader + Structure Layer
```

Structure OFF では既存の読書体験を変えない。

Structure ON のときだけ、論証構造を補助レイヤーとして表示する。

本文そのものを分析画面化しない。

---

## 5. Desktop UI

現行の基本構成:

- 左: Meta / Contents
- 中央: 本文
- 右: Note

新しい常設カラムを追加して4列化しない。

左側 Reader Aside を次の切替式にすることを第一候補とする。

```text
[ Contents ] [ Structure ]
```

### Structure Panel

例:

```text
SECTION 1

P1  4 — 3 — 1 — 3 — 5
P2  4 — 2 — 3 — 4
P3  3 — 1 — 3 — 5
```

段落をクリックすると:

- 本文の該当段落へスクロール
- 該当段落を一時的にフォーカス
- Paragraph Inspector を表示

### Structure Rail

本文全体を着色しない。

本文左余白に小さなレベル表示を置く。

```text
L4  ●  問題は、効率化によって……
     │
L3  ●  この問題を考えるには……
     │
L1  ●  例えば……
     │
L3  ●  この事例が示すのは……
     │
L5  ●  したがって……
```

表現:

- 小さなドット
- 細いライン
- L1〜L5
- 必要時のみRole

禁止:

- 本文全体の5色塗り
- 巨大なラベル
- グラフが本文より目立つUI

---

## 6. Paragraph Inspector

Structure Mode で段落を選択した場合、Structure Panel 内に表示する。

例:

```text
Paragraph 04

PROFILE
4 → 3 → 1 → 3 → 5

START
L4 / Claim

DEEPEST
L1 / Evidence

END
L5 / Implication

MOVEMENT
Claim
↓
Evidence
↑
Interpretation
↑
Implication
```

### Observation

採点ではなく短い観察コメントを出す。

例:

- 具体的証拠まで下降したあと、分析を経由してより大きな含意へ接続しています。
- 主張から次の主張へ移動しており、根拠となる情報が少ない可能性があります。
- 具体情報が連続しています。段落として何を意味するのか確認できます。

断定しない。

---

## 7. Section Overview

Sentence → Paragraph → Section の階層を持つ。

例:

```text
Section 3　本論

P1  4–3–1–3–5
P2  4–2–1–3
P3  3–1–3–5
P4  4–3–4
```

目的はグラフ鑑賞ではなく、節全体でどの概念レベルが続いているかを見ること。

将来的に Essay Profile へ拡張できる構造にする。

---

## 8. 本文とStructureの連動

双方向連動を実装する。

Structure側のP3を選択
→ 本文P3へスクロール

本文P3を選択
→ Structure側のP3を選択

本文スクロール
→ 現在読んでいるParagraphをStructure側で弱くハイライト

Structure OFF 時は不要な監視処理を行わず、既存の軽快さを維持する。

---

## 9. Legend

L1〜L5を知らない読者向けに、小さな説明導線を用意する。

候補:

- What are these levels?
- L1〜L5とは？

Popover 等で表示する。

```text
L5 Larger Claim
L4 Local Claim
L3 Analysis
L2 Description
L1 Evidence
```

必ず以下を明記する。

> Higher does not mean better.

> 数字は文章の優劣ではなく、概念レベルを示します。

---

## 10. Mobile UI

Desktopを縮小コピーしない。

本文幅を最優先する。

### Structure OFF

従来どおり本文のみ。

### Structure ON

各段落に小さな Profile のみ表示する。

```text
4 · 3 · 1 · 3 · 5
```

Profile をタップすると Bottom Sheet を開く。

例:

```text
Paragraph 04

4 → 3 → 1 → 3 → 5

L4 Claim
L3 Analysis
L1 Evidence
L3 Analysis
L5 Implication
```

各項目をタップすると対応Sentenceを一時強調。

閉じれば通常Readerへ戻る。

---

## 11. Progressive Disclosure

情報量を段階化する。

### LEVEL 0
通常Reader

### LEVEL 1
Paragraph Profile

### LEVEL 2
Sentence Level

### LEVEL 3
Role + Inspector + Observation

最初からすべてを表示しない。

「知りたい人だけ深く潜れるUI」にする。

---

## 12. Markdownデータ設計

既存Markdownとの完全な後方互換を最優先する。

位置番号だけを別JSONへ保存する方式は、本文修正によって対応関係がずれるため第一候補としない。

本文と構造情報を近接させる方式を検討する。

第一候補:

```md
<!-- level:4 role:claim -->
外注による効率化には、組織学習という別のコストが存在する。

<!-- level:2 role:description -->
外部事業者へ業務を委託すると、内部担当者が工程へ触れる時間は減る。

<!-- level:1 role:evidence -->
例えば分析業務を継続的に外注した場合、分析手法は外部側へ蓄積される。

<!-- level:3 role:analysis -->
成果物は残っても、それを生み出す能力まで残るとは限らない。

<!-- level:5 role:implication -->
したがって効率化は、作業時間だけではなく学習の蓄積先まで含めて評価する必要がある。
```

実装前に最低2案を比較する。

評価軸:

- 生Markdownの可読性
- 既存記事との互換性
- 編集耐性
- Parser実装難易度
- 検索への影響
- 多言語対応
- 将来拡張性

現在の `renderMarkdown` 実装を確認したうえで決定する。

---

## 13. Structure Diagnostics

文章を採点しない。

以下のようなパターンを Observation として扱う。

### 4 → 4 → 5

抽象的な主張が連続しています。具体的な説明や根拠を確認できます。

### 1 → 1 → 1 → 1

具体情報が続いています。分析・意味づけへ戻る箇所があるか確認できます。

### 4 → 1 → 5

概念レベルが大きく移動しています。中間の説明または分析が必要か確認できます。

### 4 → 3 → 1 → 3 → 5

具体化した後、分析を経てより大きな主張へ接続しています。

禁止:

- Score 82
- Good Paragraph
- Bad Paragraph
- 合格 / 不合格
- ランク付け

---

## 14. Paragraph / Sentence / Section の関係

Paragraph Profile は、その段落内にある Sentence Level の系列から生成する。

例:

```text
Sentence 1 = L4
Sentence 2 = L3
Sentence 3 = L1
Sentence 4 = L3
Sentence 5 = L5

Paragraph Profile = 4–3–1–3–5
```

Section Profile は Paragraph Profile を集約する。

Essay Profile は将来拡張とする。

---

## 15. Accessibility

最低限対応する。

- 色だけでレベルを区別しない
- L1〜L5テキストを保持
- aria-label
- キーボード操作
- 十分なコントラスト
- prefers-reduced-motion

Structure Modeを使わなくても、本文の意味・順番・読み上げ結果が変化しないこと。

---

## 16. UIデザイン原則

目指す印象:

- Academic
- Editorial
- Quiet
- Analytical
- Readable

避ける印象:

- Dashboard
- Data Analytics
- AI Scoring
- Learning Management System
- Gamification

MyEssaysの既存デザイン言語を維持する。

- 紙面感
- 余白
- セリフ本文
- 落ち着いた色
- Academic Reader

Structure機能だけSaaSダッシュボード化しない。

---

## 17. MVP範囲

今回実装する:

- Conceptual Level データ
- Rhetorical Role データ
- Structure Mode ON/OFF
- Desktop Structure Rail
- Contents / Structure 切替
- Paragraph Profile
- Paragraph Inspector
- Mobile Bottom Sheet
- 簡易Observation
- README更新
- essay-template更新
- サンプル論考1本

今回実装しない:

- AIによる自動分類
- 文章編集画面
- 文章生成
- 採点
- 巨大なArgument Map
- Essay全体グラフ
- ユーザーアカウント

---

## 18. Future: Structure Lab

将来的に Structure Lab を追加可能な内部設計にする。

想定機能:

- Markdown貼り付け
- SentenceごとのLevel指定
- Role指定
- Paragraph Profile生成
- Section Profile生成
- Structure Observation
- Markdownへのメタデータ書き戻し

今回のMVPでは実装しない。

---

## 19. Reject Conditions

以下のどれかになった場合は設計を見直す。

- Structure OFFでも本文が変わる
- 本文全体が色だらけになる
- L1〜L5が成績のように見える
- スマホ本文幅が狭くなる
- Note UIと競合する
- Contentsが使いづらくなる
- 既存記事のMarkdown修正が必須になる
- 全記事へStructure入力を強制する
- グラフが本文より目立つ
- UIを見なければ文章を理解できなくなる
- Uneven Uを固定テンプレート化する
- Conceptual LevelとRhetorical Roleを混同する

---

## 20. 実装前Wireframe

コードを書く前に、文章ベースのWireframeを作る。

最低限6状態:

1. Desktop Reader / Structure OFF
2. Desktop Reader / Structure ON
3. Paragraph Inspector
4. Mobile Structure OFF
5. Mobile Structure ON
6. Mobile Bottom Sheet

各状態について整理する。

- 何が見えるか
- 何がクリックできるか
- 何が隠れているか
- 既存UIから何が変わるか

Wireframeを自己レビューしてから実装へ進む。

---

## 21. 開発フェーズ

### Phase 0: Research

- Uneven Uの原典・解説確認
- Argument Visualizationの基本調査
- Academic Annotation UIの調査
- MyEssays現行UI確認

成果物:

- Research Notes
- 採用原則 / 非採用原則

### Phase 1: Existing Code Audit

最低限確認:

- `app.js`
- `styles.css`
- `index.html`
- `essay-template.md`
- `README.md`
- `data/index.json`
- English Mix関連
- Español関連
- Note機能
- Reader Aside / Contents

成果物:

- 変更ポイント一覧
- 既存機能への影響範囲

### Phase 2: Data Model

決定するもの:

- Conceptual Level
- Rhetorical Role
- Sentence metadata表現
- Paragraph Profile生成方法
- Section集約方法

成果物:

- データ仕様
- サンプルMarkdown
- parser入出力例

### Phase 3: UX / Wireframe

Desktop / Mobileの6状態を設計。

成果物:

- Text Wireframe
- Interaction Flow
- Reject Conditionsチェック

### Phase 4: Parser

- Structure metadata解釈
- 通常Markdownへの影響防止
- metadataを検索・文字数・読了時間から除外
- 既存記事後方互換

### Phase 5: Desktop Structure UI

- Structure Toggle
- Contents / Structure
- Paragraph Profile
- Structure Rail
- Inspector
- Scroll同期

### Phase 6: Mobile Structure UI

- Profile表示
- Bottom Sheet
- Sentence focus
- 本文幅維持

### Phase 7: Diagnostics

- Observationロジック
- 非採点表現
- Edge Case確認

### Phase 8: Documentation / Sample

- README
- essay-template
- サンプル記事1本

### Phase 9: QA / Audit

- Desktop
- Tablet
- Mobile
- Accessibility
- English Mix
- Español
- Console Error
- Regression Test

### Phase 10: Final Review

4視点で監査する。

- Academic Writer
- Reader
- UX Designer
- Maintainer

---

## 22. テスト対象

最低限:

- Structure情報ゼロの記事
- 一部ParagraphのみStructure付きの記事
- 全文Structure付きの記事
- 1Sentence Paragraph
- 長いParagraph
- 引用
- 箇条書き
- 表
- 画像
- 参考文献
- 脚注
- English Mix
- Español
- PC
- Tablet
- 375px
- 390px
- 430px

目標:

- Console Error 0件
- Structure OFF時の回帰不具合 0件

---

## 23. 後方互換要件

必須:

- 既存記事は修正不要
- Structure metadataなしの記事は従来表示
- 日本語版を壊さない
- English Mix版を壊さない
- Español版を壊さない
- 検索を壊さない
- 目次を壊さない
- 読了時間計算へStructure metadataを含めない
- Note機能を壊さない

---

## 24. 最終的な成功条件

成功とは「L1〜L5が表示されたこと」ではない。

通常時には、これまでと同じように静かに読める。

StructureをONにすると、

- ここで問いを立てている
- ここで具体へ降りている
- ここで証拠を示している
- ここで解釈している
- ここから次の議論へ上がっている

という思考の動きが見える。

さらに書き手自身が、

- 私は今、何を主張しているのか
- その主張には証拠があるか
- 証拠を置いただけで終わっていないか
- そこから何を導いたのか

を確認できる。

MyEssaysを、

> 完成した文章の保管庫

から、

> 文章の裏側にある思考構造まで保存できる場所

へ進化させる。

この思想を、実装判断の最上位原則とする。
