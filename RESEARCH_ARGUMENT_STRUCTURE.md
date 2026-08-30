# Argument Structure / Uneven U リサーチノート

作成日: 2026-08-30

## 1. 参照した考え方

### Eric Hayot — The Elements of Academic Style

Columbia University Pressの書籍情報では、Part II StrategyのChapter 8として `The Uneven U` が置かれている。

- https://cup.columbia.edu/book/the-elements-of-academic-style/9780231168014/

Uneven Uでは、文章のセンテンスを概念レベルの高さとして捉える。

- Level 5: abstract / general / conclusion-oriented
- Level 4: problem-oriented / ideasをまとめる
- Level 3: conceptual summary / evidenceを統合する
- Level 2: description / interpretive summary
- Level 1: concrete / evidentiary / raw information

参考：

- https://blog.cambridgecoaching.com/bored-with-your-essay-structure-try-this-method
- https://writing.wisc.edu/handbook/revisinglongprojects/

重要なのは、`4 → 3 → 2 → 1 → 3 → 5` のような固定パターンそのものではなく、文章が抽象から具体へ降り、再び抽象へ戻る「pattern of development」を持つこと。

また、この動きはParagraphだけではなく、SectionやEssay全体にも拡張して捉えられる。

## 2. 阿部幸大『まったく新しいアカデミック・ライティングの教科書』

国内でUneven Uをアカデミック・ライティングの文脈へ導入する重要な参照点として扱う。

今回の実装では、書籍の内容をUI上の「正解パターン」へ固定化せず、書き手・読み手がConceptual Movementを観察するための補助モデルとして採用する。

## 3. Argument Visualization

Argument Visualization研究では、Claim、Reason、Evidence、Counterargumentなどの関係を外在化し、推論や文章構成を確認する方法が広く研究されている。

2025年のレビューでは、典型的なArgument Mapが命題をNodeとして置き、方向付きの関係でClaim、Evidence、Counterclaim、Conclusion等を可視化することが整理されている。

- https://www.frontiersin.org/journals/education/articles/10.3389/feduc.2025.1672105/full

一方、MyEssaysはArgument Mapping専用ツールではなくReaderである。

そのため今回のMVPでは、Box-and-arrow型の巨大なArgument Mapは採用しない。

代わりに、本文を主役のまま維持し、Paragraph ProfileとSentence Levelを補助レイヤーとして提示する。

## 4. Annotation UI

Hypothesisでは、通常の本文閲覧とAnnotation Sidebarを分離し、必要なときだけAnnotation Layerへアクセスできる。

- https://web.hypothes.is/help/annotation-basics/

この考え方から、MyEssaysでも本文そのものを常時分析表示へ変えず、`Reader / Structure` を分離するProgressive Disclosureを採用する。

## 5. 今回の設計判断

### 採用

- Conceptual Level L1〜L5
- Rhetorical RoleをConceptual Levelから分離
- Readerをデフォルト表示とする
- Structureは任意・後方互換
- Paragraph Profile
- Sentence Level
- Desktop sidebar
- Mobile Bottom Sheet
- Observation形式の簡易Diagnostics

### 採用しない

- L1〜L5を成績として扱う
- 全記事へのStructure入力強制
- 本文全体の5色塗り
- Score / Good / Bad / 合否
- 固定されたUneven Uのみを正解とする
- AIによる自動分類の保存
- 巨大なArgument Map

## 6. MyEssays固有の実装制約

現行MyEssaysでは、`app.js` がデータ取得・Reader基盤を持ち、`markdown-engine.js` がMarked + DOMPurifyによるMarkdown描画へ差し替える構造になっている。

そのため既存Readerの大規模改修ではなく、次の2層で拡張する。

1. `argument-metadata-compat.js`
   - Structure用HTMLコメントを文字数・読了時間・検索対象から除外

2. `argument-structure.js` / `argument-structure.css`
   - Structure metadataをReader UIへ変換
   - Structure付き記事でのみ起動

Structure情報ゼロの記事では、従来のReader DOM・UIを維持する。
