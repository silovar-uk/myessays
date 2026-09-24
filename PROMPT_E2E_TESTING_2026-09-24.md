# E2Eテスト解説記事 制作プロンプト

## 目的

専門用語を辞書的に説明するだけでなく、一次資料と実在するコード・運用を往復しながら、「調べる前には言えなかったこと」を読後に言えるリサーチエッセイへ変換する。題材はE2Eテスト（エンドツーエンドテスト）。

## 想定読者

- Web制作や小さなツール開発には触れているが、テスト用語を体系的には学んでいない人
- 「E2Eって結局何をどこまで試すのか」を、自分の実装へ接続して理解したい人
- 初心者向けに薄めた説明ではなく、概念の境界や例外まで理解したい人

## 調査手順

1. **一次資料で定義する**
   - Cypress、Playwrightなど公式資料で、E2Eが利用者に近い操作と広い範囲を扱うことを確認する。
   - マーティン・ファウラーのTest Pyramid / Broad Stack Testで、小さいテストとの役割差と「境界は連続的」という点を確認する。
   - Google Testing Blogなどで、不安定なテストが生じる要因を確認する。

2. **自分のシステムへ降りる**
   - My EssaysのGitHubリポジトリを調べる。
   - 静的検証、簡易DOM検証、実ブラウザ検証を最低1例ずつ比較する。
   - `.github/workflows/visual-qa.yml` と `scripts/visual-qa.mjs` を読み、Playwright / Chromiumが具体的に何を操作・確認しているかを抜き出す。
   - 「E2Eを知らないと思っていたが、すでにE2E的なブラウザQAが存在した」という発見をフックにする。

3. **境界を再リサーチする**
   - E2Eは必ず全外部サービス・本番環境を実物で使うのかを確認する。
   - テストダブルやローカルサーバーを使う場合でも、システム境界次第で広範囲テストとして成立することを確認する。
   - E2Eが通っても、使いやすさ・意味理解・アクセシビリティを自動的に証明しないことを分離する。

4. **事実・解釈・提案を分ける**
   - 事実：公式資料・コードに書かれていること。
   - 解釈：複数の事実から導く「E2Eは接続を見る」などの整理。
   - 提案：My Essaysなら「一覧→検索→記事を開く→読書モード切替」を一本の重要経路として追加する、など。提案は提案と明記する。

## 構成

### 冒頭
- 「E2Eって何？」と調べたら自分のリポジトリにすでに実ブラウザテストがあった、という妙な事実から始める。
- 定義を先に長く置かない。まず具体へ降り、そこから概念を引き上げる。

### 本論
1. E2Eは「部品が正しい」ではなく「利用行動が最後まで通る」を見る
2. 「End」はシステム境界の置き方で変わる
3. 本番に近いほど強いが、大量に置くほど保守が重くなる
4. E2Eが通っても良いUXまで証明されるわけではない
5. My Essaysで次に足すなら、重要な利用行動を一本だけ補う

### 結論
- 冒頭のMy Essaysへ戻る。
- 「E2E＝全部をテストする」から「重要な一本の利用行動を最後まで歩く」へ認識が変化したことを示す。
- 最後は「品質は正しい部品の総和ではなく、人が部品の間を通れることまで含む」という一段大きな洞察へ進む。

## Uneven U

各段落は必要に応じて次の抽象度を往復する。

- 5：大きな含意
- 4：論点・問い
- 3：分析
- 2：描写・要約
- 1：コード、仕様、一次資料などの具体

典型は 4 → 3 → 2 → 1 → 2/3 → 4 → 5。ただし順番を機械的に守らない。段落末は冒頭の言い換えではなく、具体を通過したから初めて成立する新しい認識にする。

必要に応じ、文章の直前に以下の構造メタデータを置く。

```html
<!-- level:4 role:claim -->
<!-- level:2 role:description -->
<!-- level:1 role:evidence -->
<!-- level:3 role:analysis -->
<!-- level:5 role:implication -->
```

## 日本語版の編集基準

- E2Eは初出で「E2Eテスト（エンドツーエンドテスト）」とする。
- 横文字は必要最小限。日本語で意味を説明してから原語・製品名を置く。
- Playwright、Chromium、Cypress、GitHub Actionsなどの固有名詞は、最初に役割を日本語で補足する。
- user journey → 「利用者の一連の行動」
- flaky test → 「実行のたびに結果が揺れる不安定なテスト」
- mock / test double → 「テスト用の代替物（テストダブル）」
- system boundary → 「システムの境界」
- 「全部」「本番と同じ」など、E2Eの範囲を過度に断定しない。
- 公式資料で確認できない最新実行結果は書かない。
- 見出しだけ読んでも論旨が分かる結論型にする。
- 「重要」「効率的」などの抽象語は、何に対して何がどう違うかまで具体化する。

## 英語混じり版

- 日本語版と同じ記事IDを保つ。
- 全文英訳ではなく、理解を妨げない範囲でsimple Englishを混ぜる。
- Key conceptsはEnglishで反復してよい：user journey, user-visible behavior, system boundary, glue, diagnosis, confidence。
- 文法学習より意味理解を優先し、日本語だけでも論旨が追える密度にする。

## 完成後の監査

- 見出しだけで議論が追えるか。
- 各段落が一つの役割を持つか。
- 事実・解釈・提案が混ざっていないか。
- E2Eを「全て本物でなければならない」と誤説明していないか。
- E2Eを「最強のテスト」と順位づけしていないか。
- テストピラミッドを固定比率として扱っていないか。
- E2E合格をUX・アクセシビリティ合格と混同していないか。
- 日本語版に意味不明な英語が裸で残っていないか。
- 固有名詞、略語、専門語の初出に必要最小限の補足があるか。
- 参考リンクが一次資料・公式資料を中心に構成されているか。

## 主要資料

- https://docs.cypress.io/app/core-concepts/testing-types
- https://playwright.dev/docs/best-practices
- https://martinfowler.com/bliki/BroadStackTest.html
- https://martinfowler.com/articles/practical-test-pyramid.html
- https://testing.googleblog.com/2020/12/test-flakiness-one-of-main-challenges.html
- https://github.com/silovar-uk/myessays/blob/main/.github/workflows/visual-qa.yml
- https://github.com/silovar-uk/myessays/blob/main/scripts/visual-qa.mjs
- https://github.com/silovar-uk/myessays/blob/main/tests/data-integrity.test.js
- https://github.com/silovar-uk/myessays/blob/main/tests/reader-navigation.test.js
