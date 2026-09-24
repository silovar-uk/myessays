---
id: e2e-testing-user-journey-whole-system
title: "E2Eテストは、部品ではなく「最後まで使える」を確かめる"
subtitle: "My Essaysを調べたら、知らないうちにブラウザが人間のふりをしていた"
created: "2026-09-24"
updated: "2026-09-24"
type: "リサーチエッセイ"
status: "完成"
tags: ["ソフトウェアテスト", "E2Eテスト", "Web開発", "品質保証", "Playwright", "My Essays"]
keywords: ["E2Eテスト", "エンドツーエンドテスト", "ブラウザテスト", "Playwright", "Cypress", "テストピラミッド", "My Essays"]
grow: 5
abstract: "E2Eテスト（エンドツーエンドテスト）は、個々の部品が正しいかではなく、利用者の操作がシステムをまたいで最後まで成立するかを確かめる。定義を調べるつもりでMy Essaysの実装を見たところ、すでにPlaywrightでChromiumを動かし、日本語記事を開いて英語混じり版へ切り替えるブラウザ検証が組み込まれていた。自分のコードを材料に、E2Eの強さ、弱さ、境界、そして「何を自動化すべきか」を考える。"
---

# E2Eテストは、部品ではなく「最後まで使える」を確かめる
## My Essaysを調べたら、知らないうちにブラウザが人間のふりをしていた

<!-- level:4 role:claim -->
E2Eテスト（エンドツーエンドテスト）とは何かを調べようとして、自分のMy Essaysのリポジトリを開いた。すると、説明を読むより先に答えの一部が出てきた。すでにブラウザ自動操作ツールのPlaywright（プレイライト）を使い、Chromium（クロミウム）というブラウザを起動し、記事を開き、表示を確認し、言語版を切り替える自動検証が入っていた。E2Eを知らないつもりで、E2E的なことをかなりやっていた。

<!-- level:2 role:description -->
自動実行基盤のGitHub Actions（ギットハブ・アクションズ）にある「Visual QA」という処理は、ローカルにWebサーバーを立て、PlaywrightとChromiumを導入してから複数のブラウザ検証を実行する。その中の `scripts/visual-qa.mjs` は、デスクトップとスマートフォン相当の画面幅で記事を開き、本文が表示されたか、日本語版から英語混じり版へ切り替えられたか、横方向にはみ出していないか、ブラウザ上でエラーが出ていないかを確認し、画面画像も保存する。

<!-- level:1 role:evidence -->
一方、同じリポジトリには `tests/data-integrity.test.js` もある。こちらは記事ファイルが索引に存在するか、記事IDが重複していないか、英語混じり版が正しく対応づけられているかをファイル情報から確認する。`tests/reader-navigation.test.js` は、簡易的に用意した画面環境を使って関連記事のナビゲーションが生成されるかを見る。どれもテストだが、「どこまで現実の利用環境を通すか」が違う。

<!-- level:3 role:analysis -->
この三つを並べると、E2Eの輪郭が急に具体的になる。ファイルが正しい。関数が正しい。画面部品が正しい。それらは重要だが、全部が正しくても「記事を開く→読む→表示を切り替える」という利用行動が成立するとは限らない。E2Eが見ているのは部品そのものより、部品と部品の間にある接続である。

<!-- level:5 role:implication -->
つまりE2Eテストは、「全部を詳しく調べるテスト」ではない。**利用者の目的が、システムの端から端まで途切れず通るかを確かめるテスト**である。名前は巨大だが、やっていることは意外と生活感がある。ブラウザに人間のふりをさせて、いつもの道を歩かせる。

<!-- level:1 role:source -->
[My Essays「Visual QA」ワークフロー](https://github.com/silovar-uk/myessays/blob/main/.github/workflows/visual-qa.yml) ／ [My Essays「visual-qa.mjs」](https://github.com/silovar-uk/myessays/blob/main/scripts/visual-qa.mjs) ／ [My Essays「data-integrity.test.js」](https://github.com/silovar-uk/myessays/blob/main/tests/data-integrity.test.js) ／ [My Essays「reader-navigation.test.js」](https://github.com/silovar-uk/myessays/blob/main/tests/reader-navigation.test.js)

> **情報基準日：2026年9月24日**
>
> 本稿でいう「E2E的」は、My Essaysという静的Webアプリの境界内で、実ブラウザから画面・JavaScript・記事データまでを一続きに動かす検証を指す。公開中のGitHub Pagesそのものや外部ネットワークまで常に検証している、という意味ではない。また、本稿はリポジトリに設定された検証内容を確認したもので、特定の最新実行が成功したことを示すものではない。

## 1. E2Eは「部品が正しい」ではなく「利用行動が通る」を見る

<!-- level:4 role:claim -->
E2Eテストの中心は、コードの内部構造ではなく、利用者から見える一連の行動である。

<!-- level:2 role:description -->
Cypress（サイプレス）の公式資料は、E2Eテストを、ブラウザから必要に応じてバックエンドや外部連携まで含め、実際の利用者に近い操作でアプリケーション全体を確かめるものとして説明している。Playwrightの公式資料も、テストでは実装の細部ではなく、利用者から見える振る舞いを確認することを勧めている。

<!-- level:1 role:evidence -->
たとえば「検索ボタンを押す関数が呼ばれた」は内部の確認である。「検索欄に言葉を入れ、結果が現れ、その記事を開ける」は利用行動の確認になる。さらに記事を開いたあと、本文が読め、別の読書モードへ切り替わるところまで通せば、一つの機能ではなく複数の仕組みが協調して動いていることを確認できる。

<!-- level:3 role:analysis -->
ここで大事なのは、E2Eが下位のテストより「偉い」わけではないことだ。単体テストは小さな部品の挙動を速く、細かく確認しやすい。E2Eは、その部品同士が組み合わさったときに利用者の目的が成立するかを見る。問いが違う。

<!-- level:5 role:implication -->
ソフトウェアは、正しい部品を集めれば自動的に正しい体験になるわけではない。ルート、読み込み順、状態管理、画面更新、データの対応づけ。事故はしばしば「間」で起きる。E2Eが確かめているのは、その間を含めた一つの流れである。

<!-- level:1 role:source -->
[Cypress Documentation「Testing Types」](https://docs.cypress.io/app/core-concepts/testing-types) ／ [Playwright Documentation「Best Practices」](https://playwright.dev/docs/best-practices)

## 2. 「端から端まで」の端は、システムの境界をどこに置くかで変わる

<!-- level:4 role:claim -->
「エンドツーエンド」という名前から、データベースも外部サービスも通信回線も本番環境も、全部を本物にしなければならないように聞こえる。実際には、どこを一つのシステムとして扱うかで「端」は変わる。

<!-- level:2 role:description -->
マーティン・ファウラーは、広い範囲を通すテストを「Broad Stack Test」と呼び、対象範囲には連続的な幅があると説明している。遠隔の外部システムは、必要に応じてテスト用の代替物（テストダブル）に置き換えられる。つまり「現実に近い」と「世界中の依存先を全部本物にする」は同義ではない。

<!-- level:1 role:evidence -->
My Essaysの `visual-qa.mjs` は、GitHub Pages上の公開サイトではなく、ローカルに立てたWebサーバーへ実ブラウザでアクセスする。そこでHTML、JavaScript、記事データ、画面描画、操作状態をまとめて通す。公開配信網そのものまでは対象外だが、このアプリの主要な部品がブラウザ上で協調するかは確認できる。

<!-- level:3 role:analysis -->
この境界設定は手抜きではない。むしろ、何を自分たちの責任範囲として確かめたいのかを明示する設計である。外部サービスまで毎回本物にすると、外部障害や通信揺らぎまでテスト結果へ混ざり、原因の切り分けが難しくなることもある。

<!-- level:5 role:implication -->
E2Eの「End」は地理ではなく責任範囲で決まる。端から端まで試す前に、どこを端と呼ぶのかを決める必要がある。E2Eテストは技術より先に、システムの境界を言語化する作業でもある。

<!-- level:1 role:source -->
[Martin Fowler「Broad Stack Test」](https://martinfowler.com/bliki/BroadStackTest.html)

## 3. 本番に近いほど心強いのに、E2Eを大量に増やすとつらくなる

<!-- level:4 role:claim -->
E2Eには妙な逆説がある。本番の利用に近いので安心材料として強い。しかし、だからといって全てをE2Eにすると、テスト全体は扱いにくくなる。

<!-- level:2 role:description -->
テストピラミッドの考え方では、速く小さいテストを多く置き、広い範囲を通す高水準のテストは少なくする。ファウラーも、画面を通す高水準のテストは実行が遅く、壊れやすく、保守費用が高くなりやすいと説明している。Playwrightも、テスト同士を独立させ、利用者から見える安定した手掛かりで操作することを勧めている。

<!-- level:1 role:evidence -->
E2Eが失敗したとき、「利用者の道のどこかが切れた」ことは分かる。しかし、原因が記事データなのか、ルーティングなのか、描画なのか、状態管理なのか、待ち時間なのかは追加で調べる必要がある。反対に小さなテストは、壊れた場所を狭い範囲で示しやすい。

<!-- level:3 role:analysis -->
さらに、実ブラウザや通信、複数の部品を使うほど、実行のたびに結果が揺れる不安定なテストが生まれる余地も増える。Googleのテストチームも、不安定さの原因はテストコードだけでなく、テスト基盤、対象システム、依存先、実行環境など複数の層に存在すると整理している。

<!-- level:5 role:implication -->
だから小さなテストとE2Eは競合しない。小さなテストは「どこが壊れたか」を早く教え、E2Eは「つないだ結果、本当に使えるか」を教える。**診断の速さと、全体への確信は別の価値**であり、両方が必要になる。

<!-- level:1 role:source -->
[Martin Fowler「The Practical Test Pyramid」](https://martinfowler.com/articles/practical-test-pyramid.html) ／ [Playwright Documentation「Best Practices」](https://playwright.dev/docs/best-practices) ／ [Google Testing Blog「Test Flakiness」](https://testing.googleblog.com/2020/12/test-flakiness-one-of-main-challenges.html)

## 4. E2Eが通っても、「使いやすい」までは証明されない

<!-- level:4 role:claim -->
実ブラウザで最後まで操作できた。エラーもない。では、そのサイトは使いやすいのか。そこまでは言えない。

<!-- level:2 role:description -->
My Essaysのブラウザ検証は、本文表示、読書モードの切り替え、横方向のはみ出し、ブラウザエラーなどを機械的に確認している。これはかなり有用である。しかし、「初見で切り替えボタンの意味が分かるか」「文章を読む邪魔にならないか」「探したい記事へ迷わず行けるか」は、同じ合否判定だけでは分からない。

<!-- level:1 role:evidence -->
極端に言えば、ボタン名が意味不明でも、テストが指定した要素をクリックして目的の画面へ到達できればE2Eは通る。逆に人間は、ボタンの場所を見つけられず途中でやめるかもしれない。機械が道を知っていることと、人間が道を理解できることは別である。

<!-- level:3 role:analysis -->
ここでE2Eの役割を広げすぎると、「テストが通ったから品質は大丈夫」という危険な短絡が起きる。視覚的な崩れには画像比較、利用しやすさには利用者観察、アクセシビリティには専用の確認が必要になる。品質は一つのテスト方式へ還元できない。

<!-- level:5 role:implication -->
E2Eは「人間になりきるロボット」ではない。人間の操作列を忠実に再生するロボットである。だから強い。同時に、人間の迷い、意味理解、納得までは自動で持っていない。**操作可能性の確認と、体験の良さの評価は分けて考える必要がある。**

## 5. My Essaysで次に一本足すなら、「探す→開く→読む」を通したい

<!-- level:4 role:claim -->
ここからは事実ではなく提案である。現在確認した `visual-qa.mjs` は、記事のURLを直接開くところから始まる。ならば次に価値がありそうなのは、その一歩前、記事を探すところから始まる一本のE2Eである。

<!-- level:2 role:description -->
たとえば「トップ画面を開く→検索語を入力する→目的の記事が絞り込まれる→記事カードを押す→本文が表示される→日本語版から英語混じり版へ切り替える」という流れを一本だけ通す。さらに必要なら、一覧へ戻ったときの状態が期待どおりかまで確認する。

<!-- level:1 role:evidence -->
既存のブラウザ検証は、記事表示後の重要な流れをかなり見ている。だから新しいE2Eを大量に増やすより、現在の検証がまだ直接通していない利用者の入口を補うほうが、重複を抑えながら価値を広げやすい。

<!-- level:3 role:analysis -->
ここで「全ボタンをE2E化しよう」と考えると、たぶん負ける。利用者にとって失敗すると困る道だけを選ぶ。記事サイトなら「見つける」「開く」「読める」「必要な表示へ切り替えられる」。重要なのは画面数ではなく、目的達成までの筋である。

<!-- level:5 role:implication -->
E2Eの設計単位は、機能一覧より「利用者が何をしに来たか」に近い。そう考えると、テストケースを書く作業が、そのままサービスの主要な利用行動を言葉にする作業へ変わる。

## 6. 調べる前より、E2Eは小さく見えて、役割は大きく見える

<!-- level:4 role:claim -->
「E2Eテスト」という言葉だけを見ていたときは、巨大なシステムを端から端まで検査する、かなり専門的な作業に見えていた。

<!-- level:2 role:description -->
実際にMy Essaysのコードへ降りると、やっていたのはもっと具体的だった。ブラウザを開く。記事が見えるか確かめる。ボタンを押す。表示が変わるのを待つ。画面がはみ出していないか見る。普段、人間が行う小さな操作の列である。

<!-- level:3 role:analysis -->
ただし、その小さな操作列を自動化する意味は大きい。個々のファイルや関数が正しくても、接続部分が壊れれば利用者には「使えない」という一つの結果として現れる。E2Eは、その接続の失敗を利用者側から見つける。

<!-- level:5 role:implication -->
調べる前は「E2E＝全部をテストすること」だと思いかけていた。調べた後は、むしろ逆に見える。**E2Eは全部を見るのではなく、利用者にとって重要な一本の道を、最後まで歩いてみることだ。**

<!-- level:4 role:claim -->
そして今回いちばん妙だったのは、「E2Eって何？」を調べるために自分のサイトを開いたら、そのサイトの中ですでにブラウザが歩いていたことである。

<!-- level:5 role:implication -->
ソフトウェアの品質は、正しい部品の総和ではない。部品と部品の間を、人が無事に通れることまで含んでいる。E2Eテストは、その「間」に初めて試験官を置く方法なのだと思う。

---

### 主要参考資料

- [Cypress Documentation「Testing Types」](https://docs.cypress.io/app/core-concepts/testing-types)
- [Playwright Documentation「Best Practices」](https://playwright.dev/docs/best-practices)
- [Martin Fowler「Broad Stack Test」](https://martinfowler.com/bliki/BroadStackTest.html)
- [Martin Fowler「The Practical Test Pyramid」](https://martinfowler.com/articles/practical-test-pyramid.html)
- [Google Testing Blog「Test Flakiness — One of the Main Challenges of Automated Testing」](https://testing.googleblog.com/2020/12/test-flakiness-one-of-main-challenges.html)
- [My Essays「Visual QA」ワークフロー](https://github.com/silovar-uk/myessays/blob/main/.github/workflows/visual-qa.yml)
- [My Essays「visual-qa.mjs」](https://github.com/silovar-uk/myessays/blob/main/scripts/visual-qa.mjs)
- [My Essays「data-integrity.test.js」](https://github.com/silovar-uk/myessays/blob/main/tests/data-integrity.test.js)
- [My Essays「reader-navigation.test.js」](https://github.com/silovar-uk/myessays/blob/main/tests/reader-navigation.test.js)
