---
id: design-literacy-grid-shared-coordinate-system
title: "Grid System――グリッドは『揃える線』ではなく『判断を共有する座標系』"
subtitle: "Design Literacy #11｜個別配置を再利用可能なルールへ変える"
created: "2026-09-03"
updated: "2026-09-04"
type: "Essay"
status: "完成"
tags: ["Design Literacy", "デザイン", "Grid System", "Swiss Style", "International Typographic Style", "Layout", "Alignment", "Typography", "Responsive Design", "Design System"]
keywords: ["grid system", "typographic grid", "columns", "gutters", "margins", "modules", "baseline grid", "Swiss Style", "International Typographic Style", "asymmetrical layout", "Wim Crouwel", "Armin Hofmann", "Ernst Keller", "design system"]
favorite: 5
grow: 5
series: "Design Literacy｜細部から思想まで"
seriesOrder: 11
abstract: "Grid Systemを、単に要素をきれいに揃えるための線ではなく、配置の判断を個人の勘から切り離し、複数要素・複数画面・複数人で再利用できる座標系として捉え直す。Swiss Styleのtypographic gridや非対称構成、Ernst Kellerの教育思想、Wim Crouwelのgrid観を整理しながら、現代のWeb/UIにおけるcolumns、gutters、responsive layout、design systemへと接続する。"
---

# Grid System――グリッドは「揃える線」ではなく「判断を共有する座標系」
## Design Literacy #11｜個別配置を再利用可能なルールへ変える

**A grid is not decoration. It is a system for making relationships repeatable.**

前回までの考察では、行間の縦の距離を司るLine Heightや、行の長さによる横方向の読書体験を左右するMeasureを扱ってきた。文字の近さや行の折り返しといった局所的な距離感を見てきたわけだが、今回はその視点をもう一段引き上げたい。

画面やページ全体のなかで、それらの距離や配置をどのように「繰り返し再利用できるルール」へと昇華させるか。今回のテーマは**Grid System（グリッドシステム）**だ。

---

## 1. まず一言：良いグリッドは「意味のない判断」を減らす

新しいページや画面を作るたびに、「タイトルはこのあたりに置こう」「本文の幅はこれくらいにしよう」「画像は少し右寄りに配置して、ボタンは前回と同じくらいの余白で……」と手探りで決めていては、作業のたびにゼロから位置を判断することになってしまう。

グリッドを導入する最大の効用は、個々の要素を配置する前に、まず画面全体で共有される「共通の座標系」を定義できる点にある。

- Columns（列）
- Margins（外周余白）
- Gutters（列間の余白）
- Modules（縦横の分割単位）
- Baseline（垂直方向の基準線）

あらかじめこの構造が敷かれていると、デザイン作業における根本的な問いが変化する。「これを画面のどこに置くか」という場当たり的な配置の悩みから、「この情報は、画面全体のどの関係性に属しているか」という構造の判断へと変わるのだ。意味のない微調整の迷いを減らし、情報の関係性に集中できることこそが、グリッドの本来の価値である。

---

## 2. 仕組み：ColumnだけがGridではない

「このWebサイトは12カラムで組まれている」という言葉をよく耳にするが、カラムの数を決めるだけでグリッドシステムが完成するわけではない。グリッドは複数の空間的ルールが組み合わさって機能している。代表的な構成要素を整理すると、次のようになる。

- **Margin**: ページの最も外側に位置する余白。コンテンツと画面端の境界を保つ。
- **Column**: 主に水平方向を分割し、要素を配置するための縦方向の領域。
- **Gutter**: Column同士の間に設けられる間隔。要素同士がくっつき合わないための余白。
- **Module**: 縦方向のColumnと横方向の分割が交差して生まれる、格子状の最小単位。
- **Baseline**: フォントのベースラインに合わせ、テキストの垂直方向のリズムを揃える基準線。

たとえば、ページ全体に次のような規則的な構造が通っているとする。

```text
| margin | col | gut | col | gut | col | margin |
```

こうした共通の土台があれば、見出し、本文、写真、注釈、アクションボタンといった見た目も役割も異なる要素たちが、それぞれ別の形を保ちながらも、同じ空間の秩序に従って共存できるようになる。

**Consistency does not require sameness.**（一貫性とは、すべてを同じ形に揃えることではない。）

グリッドの役割は、すべてを画一的に均一化することではなく、異なる要素たちに共通の関係性のルールを与えることにある。

---

## 3. Before → After：要素を揃えるのではなく、基準を共有する

グリッドの有無がもたらす差を、簡略化したレイアウトで見てみよう。

### BEFORE

```text
TITLE
        Image

Text text text
                 Note

       Button
```

このBEFOREの状態でも、個々の要素を単体で見れば破綻していないかもしれない。しかし全体を俯瞰したとき、「なぜ画像はその位置にあるのか」「なぜ注釈はそこまで右に寄っているのか」という必然性を説明する共通の基準が存在しない。すべてが個別の勘と微調整で置かれている状態だ。

### AFTER

```text
| 1 | 2 | 3 | 4 | 5 | 6 |

TITLE
|---|---|---|

TEXT
|---|---|---|

            IMAGE
            |---|---|

            NOTE
            |---|

            BUTTON
            |---|
```

AFTERでは、すべての要素が6分割の共通座標系に寄り添っている。

ここで注目すべきなのは、「すべての要素が左右対称になったわけではない」という点だ。タイトルと本文は左の3カラムを使い、画像は右寄りの2カラムを使い、注釈とボタンはその下の特定カラムに収まっている。重要なのは形を揃えることではなく、**複数の異なる要素が同じ基準線（reference lines）を再利用できるようになったこと**だ。

以前扱ったAlignment（整列）が「特定の要素同士に関係線をつくる操作」だとすれば、Grid Systemは「その関係性を画面全体で繰り返し生み出すためのインフラ」として機能していることがわかる。

---

## 4. そのまま使える制作・修正指示

レビューの現場で「ここ、もうちょっと綺麗に揃えてください」とだけ伝えても、その場しのぎの微調整に終わり、1画面の見た目を繕う以上の効果は得られない。本質的な修正を促すなら、次のように指示を言語化できる。

> **本文・見出し・画像・補足情報を個別に位置調整する前に、共通で参照できるcolumn・margin・gutterの基準を設定してください。要素ごとの微調整ではなく、複数セクションで同じreference lineを再利用できる構造にしてください。**

さらに、レスポンシブWebデザインの場面では、この指示の解像度をもう一段深める必要がある。

> **Desktopのcolumn数や配置をそのまま縮小せず、情報同士の優先順位と関係性を保ったまま、Mobile用のgridへ再構成してください。**

**Responsive grid is not a smaller desktop grid.**（レスポンシブグリッドとは、単にデスクトップのグリッドを小さく縮小したものではない。）

画面幅が変わったときに守るべきなのは、カラムの数という表面的な数値ではなく、情報同士の階層構造と関係性そのものなのだ。

---

## 5. 歴史との接続：Swiss Styleは「グリッドだけ」の様式ではない

歴史を振り返ると、第二次世界大戦後に国際的な潮流となったInternational Typographic Style（いわゆるスイス・スタイル）において、typographic gridは中心的な特徴の一つとして確立された。

スイス国立図書館（Swiss National Library）の解説によれば、スイス・スタイルの本質的特徴として、**typographic grid、sans-serif typeface、precision（精密さ）、simple typography、rational composition（合理的な構成）、photography**などが挙げられている。

[Swiss National Library — The International style 1950–1970](https://www.nb.admin.ch/en/the-international-style-1950-1970)

ここで注意したいのは、「スイス・スタイル＝単にグリッドを敷くこと」という短絡的な理解に陥らないことだ。

また、当時のスイス国内においても、チューリッヒ派（Zurich School）とバーゼル派（Basel School）では教育思想や造形の志向性に明確な違いがあった。スイス国立図書館も指摘するように、国際タイポグラフィ様式は両派の理論や実践が複雑に交錯するなかで形成されたものだ。

私たちが歴史から受け取るべき本質は、「グリッドを引きさえすればスイス・スタイル風になる」という表面的なレシピではない。**情報を個人の恣意的な装飾として画面に散りばめるのではなく、合理的な構造のなかに位置づけて伝達する**という設計の態度なのだ。

---

## 6. 教育との接続：Ernst Kellerは「まず問題を理解する」方向を示した

スイス・スタイルの源流を辿るうえで欠かせないのが、チューリッヒ工芸学校でスイス初の本格的なグラフィックデザイン教育課程を立ち上げたErnst Keller（エルンスト・ケラー）の存在だ。

スイス国立図書館の資料によると、Kellerはポスターなどの視覚伝達物が真に機能するためには、鑑賞者に**immediately and effortlessly understood（瞬時に、かつ無理なく直感的に理解される）**状態をつくることが不可欠であり、その実現のために画像、タイポグラフィ、スタイル、色彩、画面構成のすべてが統合されるべきだと説いた。

[Swiss National Library — The Zurich Concretists](https://www.nb.admin.ch/en/the-zurich-concretists)

この教育的視点は、現代のUI設計にもそのまま通底している。すなわち、「グリッドそのものを自己目的化してはならない」という教訓だ。

**Gridは「美しい12分割の枠組みを作ること」自体が目的ではなく、ユーザーに伝えるべき情報の関係性を明快にするための手段にすぎない。**

どれほど厳密にグリッドを敷き詰めたとしても、情報そのものの論理構造が破綻していれば、直感的に理解しやすい画面が生まれることは決してないのだ。

---

## 7. 誤解しやすい点：Gridは左右対称にする仕組みではない

グリッドを意識し始めたときに陥りがちな誤解が、「グリッドを使うと、すべてのレイアウトが左右対称（シンメトリー）で退屈になってしまうのではないか」という懸念だ。

しかし実際には、スイス・スタイルの真骨頂はgrid-based designとasymmetrical layout（非対称なレイアウト）の見事な両立にあった。クーパー・ヒューイット国立デザイン博物館（Cooper Hewitt）がArmin Hofmann（アルミン・ホフマン）の業績を振り返るなかでも、スイス・スタイルの特徴として**asymmetrical layouts、grid-based design、sans-serif typography、photography**が並列して挙げられている。

[Cooper Hewitt — A Harmony of Contrasts](https://www.cooperhewitt.org/2018/08/05/aharmonyofcontrasts/)

次の例を見てほしい。

```text
| 1 | 2 | 3 | 4 | 5 | 6 |

TITLE
|---|---|

                 IMAGE
             |---|---|

TEXT
|---|---|---|
```

この配置は明らかに左右非対称であり、ダイナミックなリズムを持っている。それでも画面が散漫にならず安定して見えるのは、すべての要素が同一の6カラムという座標系を共有しているからだ。

**Order is not the same as symmetry.**（秩序と対称性は同義ではない。）

均整を保つことと、左右対称に置くことの違いを見極めること。グリッドは退屈な均一性を強いる檻ではなく、非対称な要素のあいだに確かな秩序をもたらすための装置なのだ。

---

## 8. 以前の学びとの接続：SpacingをSystemへ引き上げる

これまでの連載で扱ってきた概念を並べてみると、一本の確かな軸が見えてくる。

- **Line Height**: 行と行の垂直方向の距離を制御する
- **Measure**: 行頭から行末までの水平方向の読書距離を制御する
- **Alignment**: 異なる要素同士の視覚的な関係線を結ぶ
- **Grid**: それらの距離と関係性を、画面全体・サービス全体で再利用可能な仕組みへと引き上げる

ミクロな距離の調整から、マクロな空間構造へ。ここで解像度が一段引き上がる。

**Spacing is local. A grid makes spacing systemic.**（余白の調整は局所的な作業だが、グリッドはそれをシステムへと変える。）

1行ごとの行間や要素ごとの余白は、局所的な微調整としても一応は成立してしまう。しかしGrid Systemを導入することで、そうした局所的な判断が一画面限りの使い捨てから、ページ全体、さらにはプロダクト全体で反復可能なルールへと進化するのだ。

この思想は、現代のUI開発におけるspacing tokensやlayout primitives（BoxやStackなどのコンポーネント）といった設計概念へとダイレクトにつながっている。

---

## 9. 30秒でできる観察：見えない線を探す

グリッドに対する感覚を磨くために、日常のWebブラウジングですぐに試せる30秒の観察方法がある。

好きなWebサイトを1つ開き、テキストの内容はいったん読まずに、画面上の主要な要素の左端と右端だけに注目してみる。

- 見出しの開始位置
- 本文ブロックの開始位置と終了位置
- 画像やバナーのエッジ
- ボタンやタグの境界
- カード型コンポーネントの配置
- 注釈やキャプションの位置

あたかも画面の上に透明な定規を当てて縦線を引くような感覚で、要素たちの端を見つめてみるのだ。そのとき、自問してみてほしい。

**「いくつの異なる要素が、同じ見えない基準線を共有しているだろうか？」**

もし、ほとんどの要素が共通の縦軸に沿って配置されているなかに、1つだけわずかに数ピクセル外れている要素を見つけたら、さらに思考を進めてみる。

- それは視線を集めるために意図的にグリッドを外している（Break the grid）のか？
- それとも、単に基準線の定義が曖昧で無自覚にズレているだけなのか？

「なんとなくズレていて気持ち悪い」という漠然とした違和感を、「どの共通基準線から、どう外れているのか」と言語化できるようになること。それこそが、グリッドリテラシーを身につけるための確かな一歩となる。

---

## 10. 次につながる概念：Design System

クーパー・ヒューイットは、オランダの偉大なグラフィックデザイナーであるWim Crouwel（ヴィム・クロウエル）の仕事を紹介するなかで、彼がグリッドを単なる画一化の道具としてではなく、デザイナー個人の恣意的な手癖や主観の外側にある客観的構造として扱い、柔軟なシステムや予想もしなかった新たな形態を生み出すために駆使したと評している。

[Cooper Hewitt — Remembering Wim Crouwel](https://www.cooperhewitt.org/2019/09/20/remembering-wim-crouwel-1928-2019/)

この思想は、現代のプロダクト開発における**Design System（デザインシステム）**の根幹そのものだ。

- Grid（配置の座標系）
- Spacing（余白のスケール定義）
- Typography（書体と階層）
- Color（色彩体系）
- Components（再利用可能な部品群）
- Interaction rules（振る舞いの規約）

これらがチーム全体で共有された座標系として機能するとき、デザインの判断は1人のデザイナーの頭の中のブラックボックスから解放される。

もちろん、20世紀半ばの印刷媒体におけるタイポグラフィックグリッドと、無数の画面サイズや動的データを扱う現代のデザインシステムとでは、解決すべき技術的課題は異なる。しかし、「個人の感覚による個別配置（individual composition）から、チームとプロダクトで再利用できる共有システム（shared system）へ」という設計の本質的な問いは、時代を超えて驚くほど鮮やかに響き合っている。

今回覚えておきたい中心的な命題は、これに尽きる。

**A grid is not a cage. It is a shared coordinate system for design decisions.**  
**グリッドは「縛るための線」ではなく、「判断を共有するための座標系」である。**

この座標系を意識できるようになれば、画面の違和感を場当たり的な微調整で終わらせることなく、再現性のあるシステムの課題として捉え、改善していくことができるはずだ。

---

## 参考資料

- [Swiss National Library — The International style 1950–1970](https://www.nb.admin.ch/en/the-international-style-1950-1970)
- [Swiss National Library — The Zurich Concretists](https://www.nb.admin.ch/en/the-zurich-concretists)
- [Cooper Hewitt, Smithsonian Design Museum — A Harmony of Contrasts](https://www.cooperhewitt.org/2018/08/05/aharmonyofcontrasts/)
- [Cooper Hewitt, Smithsonian Design Museum — Remembering Wim Crouwel](https://www.cooperhewitt.org/2019/09/20/remembering-wim-crouwel-1928-2019/)
