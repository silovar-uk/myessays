---
id: design-literacy-information-architecture-before-navigation
title: "メニューを直す前に、部屋割りを疑う――Information Architecture"
subtitle: "Design Literacy #24｜見せ方の前に、情報の住所を設計する"
created: "2026-09-08"
updated: "2026-09-08"
type: "Essay"
status: "完成"
tags: ["Design Literacy", "デザイン", "Information Architecture", "IA", "Navigation", "Taxonomy", "Mental Model", "Card Sorting", "Tree Testing", "UX", "Richard Saul Wurman"]
keywords: ["information architecture", "IA", "navigation", "taxonomy", "labeling", "mental model", "sitemap", "card sorting", "tree testing", "findability", "Richard Saul Wurman"]
favorite: 5
grow: 5
series: "Design Literacy｜細部から思想まで"
seriesOrder: 24
abstract: "『このページ、どこに置く？』という小さな迷いから、Information Architectureをメニューの整理ではなく、情報同士の関係・分類・名称を設計する問題として捉え直す。サッカークラブのサイトを題材に、社内組織・対象物・ユーザー目的という3種類の分類を比較し、Card SortingとTree Testingの役割も整理する。Richard Saul Wurmanが1976年にInformation Architectという語を用いた歴史にも触れながら、現代UIで再利用できる判断手順へ戻す。"
---

# メニューを直す前に、部屋割りを疑う――Information Architecture
## Design Literacy #24｜見せ方の前に、情報の住所を設計する

「このページ、どこに置きます？」

サイト改修では、かなり頻繁に出る質問だ。

「お知らせ？」

「サービス？」

「サポート？」

そして、誰も決められなくなると最後に現れる。

**その他。**

その他は便利だ。どんな情報でも受け止めてくれる。

ただし、便利すぎる収納はだいたい後で開けたくなくなる。

今回はメニューの見た目を直す前に、**情報そのものの住所はどう決めるのか**を考える。

## 1. まず一言：NavigationとInformation Architectureは同じではない

**Don’t organize the menu. Organize the information first.**

昨日のVisual Hierarchyでは、

```text
何を1番目、2番目、3番目に見せるか
```

を考えた。

今日は、その前段へ戻る。

```text
Information Architecture
何と何を同じ仲間として扱うか

Navigation
その構造の中をどう移動できるようにするか

Visual Hierarchy
今いる画面で何を優先して見せるか
```

Nielsen Norman Groupは、Information Architecture（IA）を単なるサイトマップと区別している。サイトマップはコンテンツのhierarchyやorganizationを可視化する成果物の一つであり、IAにはnavigation labelなどのnomenclatureや、ユーザーが情報を発見するための構造設計・調査も含まれる。

[NN/g — Information Architecture vs. Sitemaps](https://www.nngroup.com/articles/information-architecture-sitemaps/)

つまり、ハンバーガーメニューを開いて項目名を並べ替える作業は、IAの一部ではあっても全部ではない。

間取りがおかしい家で、ドアノブの位置だけ直している可能性がある。

## 2. 同じ7項目を、3通りに分類してみる

サッカークラブのサイトに、次の情報があるとする。

```text
試合日程
チケット
スタジアムアクセス
座席案内
グッズ
ファンクラブ
イベント
```

内容は固定したまま、分類軸だけ変えてみる。

### A. 社内組織で分類する

```text
競技
└ 試合日程

営業
├ チケット
└ ファンクラブ

事業
├ グッズ
└ イベント

運営
├ スタジアムアクセス
└ 座席案内
```

内部では美しい。

担当部署も分かる。

しかし、初めて試合へ行く人からすると、知らない会社の組織図を解かされている。

### B. 情報の対象物で分類する

```text
試合
└ 試合日程

チケット
└ チケット

スタジアム
├ スタジアムアクセス
└ 座席案内

クラブ
├ グッズ
├ ファンクラブ
└ イベント
```

かなり自然になった。

ただ、「初めて試合へ行く」という一つの目的は複数categoryに分散する。

### C. ユーザーの目的で分類する

```text
試合を見る
├ 試合日程
└ チケット

スタジアムへ行く
├ スタジアムアクセス
└ 座席案内

クラブを楽しむ
├ グッズ
├ ファンクラブ
└ イベント
```

今度は、情報そのものではなく**行動**が分類軸になる。

どれが絶対正解という話ではない。

ここで分かるのは、**同じ情報でも、分類軸を変えるだけでサイトの意味が変わる**ということだ。

**OBSERVATION**

情報量は一文字も減っていないのに、Cでは「次に何をすればいいか」が見えやすい。

**INTERPRETATION**

IAは情報を収納する作業ではなく、「ユーザーが何を同じ仲間だと予測するか」に合わせて関係を設計する作業として考えると実務で扱いやすい。

## 3. 「ユーザーにとって自然」は、デザイナーの勘では決めない

ここで危険な言葉がある。

> ユーザー目線で分類しましょう。

言うのは簡単だ。

では、ユーザーは本当に「スタジアムへ行く」というgroupを作るのか。

ここで使えるのが**Card Sorting**と**Tree Testing**だ。

NN/gでは、Card Sortingは参加者に代表的なcontent itemをgroup化・命名してもらい、ユーザーのmental modelや分類候補を探索する**generative method**として説明されている。一方、Tree Testingは、作成済みのcategory hierarchyの中から特定情報を見つけてもらい、その構造のfindabilityを評価する方法として区別されている。

[NN/g — Tree Testing: Evaluate Menu Labels and Categories](https://www.nngroup.com/articles/tree-testing/)

順番にすると、かなり分かりやすい。

```text
現状で迷う場所を確認
↓
Card Sorting
「どう分けそうか」を探索
↓
IA案を作る
↓
Tree Testing
「本当に見つけられるか」を検証
↓
Navigation / UIを作る
```

UIを作る前にかなりのことができる。

むしろ、UIを作ってから全部やり直すより安い。

## 4. 「その他」はなぜ怖いのか

先ほどの最終兵器へ戻る。

**その他。**

Tree TestingについてのNN/gの記事でも、Card Sortingでは参加者が収まりの悪い項目をgeneric categoryへまとめることがあるが、実際のnavigationで曖昧な「other stuff」に相当するlabelを置くと、ユーザーはそこを避ける傾向があると説明されている。

これは少し面白い。

分類実験では人間も「その他」を作る。

でも、本番のメニューでは「その他」を押したくない。

作る側としては便利で、探す側としては不親切。

同じ箱なのに、立場によって評価が真逆になる。

## 5. Before → After：「メニューが分かりにくい」を分解する

### BEFORE

> メニューが分かりにくいので整理してください。

この指示だと、文字数を短くしたり、並び順を変えたり、menu stylingを触り始める可能性がある。

### AFTER

まず問題を分ける。

```text
STRUCTURE
情報は適切なgroupに属しているか

LABEL
group名から中身を予測できるか

PLACEMENT
ユーザーが期待する場所にあるか

NAVIGATION
目的の場所へ移動できるか

VISUAL HIERARCHY
現在地と次の行動が見えるか
```

こうすると、見た目を直す前に「どの層が壊れているか」を調べられる。

## 6. そのまま使える制作・修正指示

> **現在のメニュー項目をいったんUIから切り離し、ユーザーが達成したい目的と代表的なcontent itemを一覧化してください。社内部署や実装都合をそのままcategoryにせず、ユーザーが同じ仲間だと予測する単位でgroup候補を作ります。分類案は可能ならCard Sortingで探索し、主要taskをTree Testingしてfindabilityを確認した後に、labelとnavigation UIを設計してください。**

レビュー用なら、さらに短くできる。

> **「この分類は、誰にとって自然ですか？」**

そしてもう一つ。

> **「UIを全部消して文字だけのtreeにしても、目的の情報へたどり着けますか？」**

後者はかなり強い。

装飾で構造問題を隠していないか分かる。

## 7. 歴史へ：Information ArchitectureはWebより前からあった

ここで少し時間を戻す。

建築家・デザイナーのRichard Saul Wurmanは、1976年のAmerican Institute of Architectsのconferenceに関連して**Information Architect**という語を用いたと自身の回顧で述べている。Smithsonian Cooper HewittもWurmanを、この言葉のcreatorとして紹介している。

[Richard Saul Wurman — Published Articles](https://www.wurman.com/publishedarticles)

[Smithsonian — Richard Saul Wurman, National Design Award](https://www.si.edu/newsdesk/releases/cooper-hewitt-national-design-museum-announces-winners-13th-annual-national-design-awards)

Wurmanは、Information Architectureについてwebsite designだけに限定せず、複雑なものを理解可能にするためのorganizationやstructureという広い問題として語っている。

ただし、ここから、

```text
1976 Wurman
↓
現在のWeb IAがそのまま誕生
```

という一本線を引くのは雑だ。

人類はWurman以前から図書館、地図、索引、案内表示、百科事典などで情報を分類してきた。

**FACT**

Wurmanは1976年にInformation Architectという語を用いた人物として公的資料でも紹介されている。

**INTERPRETATION**

現代WebのIAを考えるとき、彼の建築的な比喩は「menu component」ではなく「人が理解し移動できる情報空間」として問題を見るための有効な比較対象になる。

建築とWebは同じではない。

でも、**ドアをきれいにする前に間取りを決める**という比喩は、かなり残る。

## 8. 誤解しやすい点：Task-based IAが常に正解ではない

ここまで読むと、全部を動詞にしたくなる。

```text
買う
見る
行く
知る
楽しむ
```

しかし、これも万能ではない。

ユーザーが特定の対象名を知っていて、その名前で探す場合にはobject-basedなtaxonomyの方が予測しやすいこともある。

また、一つのcontentが複数の目的に関係するなら、polyhierarchyやcross-linking、searchを組み合わせる必要がある。

だから、

```text
社内組織ベース = 悪
Task-based = 善
```

ではない。

問題は、**分類軸がユーザーの予測と合っているか検証されているか**だ。

## 9. 前より解像度が上がる接続

ここまでの流れを並べる。

```text
#21 Optical Alignment
どこが中央に見える？

↓

#22 Visual Weight
何が強く見える？

↓

#23 Visual Hierarchy
その強さをどう編成する？

↓

#24 Information Architecture
そもそも何と何を関係づける？
```

昨日は「Primary / Secondary / Tertiaryを決めよう」と考えた。

今日は、そのPrimaryを決める前に、

> **この情報はそもそも、この画面・このgroupにいるべきなのか？**

という問いが入った。

**You cannot fix bad information structure with bigger typography.**

構造がおかしいものを、大きな文字では救えない。

Visual Hierarchyで直せないUIがある理由が一つ分かった。

## 10. 30秒でできる観察

よく使うアプリかWebサイトを一つ開く。

menuから3項目選ぶ。

UIを見ないつもりで、名前だけ読む。

そして聞く。

> **なぜ、この3つは同じ場所にいる？**

答えを、

- 同じ対象だから
- 同じ行動だから
- 同じ利用場面だから
- 同じ社内部署だから

のどれかで説明してみる。

分類軸を言語化できなければ、そのmenuは観察する価値がある。

## 次に覚える概念：Mental Model

今回、何度も「ユーザーが予測する」と書いた。

次の疑問は当然これになる。

> **その予測って、どこにある？**

次に学ぶのは**Mental Model**。

```text
System Model
作り手が設計した構造

Mental Model
ユーザーが「こうなっているはず」と思っている構造
```

この二つがズレると、「ボタンはあるのに見つからない」「説明を読めば分かるのに直感では分からない」が起こる。

Information ArchitectureからMental Modelへ進むと、分類が単なる整理整頓ではなく、**人間の予測との接続設計**に見えてくる。

---

## 今日の中心命題

**Information Architecture begins before the interface.**

Information Architectureは画面を作る前から始まっている。

調べる前は、「メニューが分かりにくいならメニューを直す」と考えていた。

調べた後では、メニューが分かりにくいときにまず疑う場所が一つ増えた。

**メニューではなく、その後ろの部屋割りかもしれない。**

## 検索用専門語

`Information Architecture / IA / Navigation / Taxonomy / Labeling / Sitemap / Mental Model / Card Sorting / Tree Testing / Findability / Polyhierarchy / Richard Saul Wurman`

## Sources

- [Nielsen Norman Group — Information Architecture vs. Sitemaps](https://www.nngroup.com/articles/information-architecture-sitemaps/)
- [Nielsen Norman Group — Tree Testing: Evaluate Menu Labels and Categories](https://www.nngroup.com/articles/tree-testing/)
- [Richard Saul Wurman — Published Articles](https://www.wurman.com/publishedarticles)
- [Smithsonian Institution — Richard Saul Wurman / National Design Awards](https://www.si.edu/newsdesk/releases/cooper-hewitt-national-design-museum-announces-winners-13th-annual-national-design-awards)
