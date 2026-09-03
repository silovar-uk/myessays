---
id: design-literacy-grid-shared-coordinate-system
title: "Grid System――グリッドは『揃える線』ではなく『判断を共有する座標系』"
subtitle: "Design Literacy #11｜個別配置を再利用可能なルールへ変える"
created: "2026-09-03"
updated: "2026-09-03"
type: "Essay"
status: "完成"
tags: ["Design Literacy", "デザイン", "Grid System", "Swiss Style", "International Typographic Style", "Layout", "Alignment", "Typography", "Responsive Design", "Design System"]
keywords: ["grid system", "typographic grid", "columns", "gutters", "margins", "modules", "baseline grid", "Swiss Style", "International Typographic Style", "asymmetrical layout", "Wim Crouwel", "Armin Hofmann", "Ernst Keller", "design system"]
favorite: 5
grow: 5
series: "Design Literacy｜細部から思想まで"
seriesOrder: 11
abstract: "Grid Systemを、要素をきれいに揃えるための線ではなく、配置判断を個人の勘から切り離し、複数要素・複数画面・複数人で再利用できる座標系として捉える。Swiss Styleのtypographic gridや非対称構成、Ernst Kellerの教育、Wim Crouwelのgrid観を区別しながら、現在のWeb/UIにおけるcolumns・gutters・responsive layout・design systemへ接続する。"
---

# Grid System――グリッドは「揃える線」ではなく「判断を共有する座標系」
## Design Literacy #11｜個別配置を再利用可能なルールへ変える

**A grid is not decoration. It is a system for making relationships repeatable.**

前回まで、Line Heightで縦方向の距離、Measureで横方向のreading distanceを見てきた。

今回はもう一段引く。

**その距離や配置を、ページ全体でどう繰り返し使えるルールにするか。**

テーマは**Grid System（グリッドシステム）**。

## 1. まず一言：良いグリッドは「意味のない判断」を減らす

ページを作るたびに、

```text
タイトルはこのへん
本文はこれくらい
画像は少し右
ボタンは前回と同じくらい
```

と決めていると、毎回ゼロから位置を判断することになる。

グリッドを使うと、先に共通の座標系を作れる。

```text
Columns
Margins
Gutters
Modules
Baseline
```

すると制作中の問いが、

**「どこに置く？」から「この情報はどの関係に属する？」へ変わる。**

ここがグリッドの大きな効用や。

## 2. 仕組み：ColumnだけがGridではない

「12カラムにする」と言えばGrid Systemが完成するわけではない。

代表的な構成要素を分けると、こうなる。

```text
Margin
→ ページ外周の余白

Column
→ 主に縦方向の配置領域

Gutter
→ Column間の間隔

Module
→ 縦横の分割から生まれる単位

Baseline
→ 文字を垂直方向に揃える基準
```

たとえば、

```text
| margin | col | gut | col | gut | col | margin |
```

という共通ルールがあると、見出し、本文、画像、注釈、ボタンは別の形をしていても、同じ空間構造に所属できる。

**Consistency does not require sameness.**

全部を同じ形にするのではなく、違う要素に同じ関係ルールを与える。

## 3. Before → After：要素を揃えるのではなく、基準を共有する

### BEFORE

```text
TITLE
        Image

Text text text
                 Note

       Button
```

個々の要素だけを見れば成立している。

でも、「なぜそこに置かれているのか」を説明する共通ルールがない。

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

ここで重要なのは、すべてが左右対称になったことではない。

**複数要素が同じreference linesを再利用できるようになったこと。**

前に扱ったAlignmentが「要素同士に関係を作ること」なら、Gridは**その関係を繰り返し作るためのインフラ**として見られる。

## 4. そのまま使える制作・修正指示

「もう少し揃えてください」だけでは、修正した1画面にしか効かない。

制作指示なら、こう言える。

> **本文・見出し・画像・補足情報を個別に位置調整する前に、共通で参照できるcolumn・margin・gutterの基準を設定してください。要素ごとの微調整ではなく、複数セクションで同じreference lineを再利用できる構造にしてください。**

レスポンシブでは、さらに一段変える。

> **Desktopのcolumn数や配置をそのまま縮小せず、情報同士の優先順位と関係性を保ったまま、Mobile用のgridへ再構成してください。**

**Responsive grid is not a smaller desktop grid.**

守るべきなのはcolumn数ではなく、情報の関係や階層や。

## 5. 歴史との接続：Swiss Styleは「グリッドだけ」の様式ではない

第二次世界大戦後に広がったInternational Typographic Style、いわゆるSwiss Styleでは、typographic gridが重要な特徴の一つになった。

Swiss National Libraryは、このスタイルの特徴として、**typographic grid、sans-serif typeface、precision、simple typography、rational composition、photography**などを挙げている。

[Swiss National Library — The International style 1950–1970](https://www.nb.admin.ch/en/the-international-style-1950-1970)

ここは単純化しない。

**Swiss Style = Grid**ではない。

また、ZurichとBaselでも教育・表現の系譜は同一ではない。Swiss National Libraryも、International StyleをZurich SchoolとBasel Schoolの理論が交わる流れとして説明している。

つまり歴史から取り出せるのは「グリッドを使えばSwiss Styleになる」という表面的なレシピではなく、**情報を個別の装飾として置くのではなく、構造の中へ組み込む態度**や。

## 6. 教育との接続：Ernst Kellerは「まず問題を理解する」方向を示した

Swiss National Libraryによると、Ernst KellerはZurich School of Designでスイス最初のgraphic design courseを始めた人物の一人として位置づけられている。

Kellerは、posterが効果を持つには**immediately and effortlessly understood**である必要があり、そのためにimage、text、style、colour、compositionが重要だと考えたと紹介されている。

[Swiss National Library — The Zurich Concretists](https://www.nb.admin.ch/en/the-zurich-concretists)

ここから現在へ引ける解釈は、グリッドそのものを目的化しないこと。

**Gridは「きれいな12カラムを作るため」ではなく、伝えるべき関係を明確にするための手段。**

情報構造が悪いのにグリッドだけ整えても、理解しやすい画面にはならない。

## 7. 誤解しやすい点：Gridは左右対称にする仕組みではない

Swiss Styleでは、grid-based designとasymmetrical layoutは両立していた。

Cooper HewittもArmin Hofmannを紹介する中で、Swiss Styleの特徴として**asymmetrical layouts、grid-based design、sans-serif typography、photography**などを挙げている。

[Cooper Hewitt — A Harmony of Contrasts](https://www.cooperhewitt.org/2018/08/05/aharmonyofcontrasts/)

たとえば、

```text
| 1 | 2 | 3 | 4 | 5 | 6 |

TITLE
|---|---|

                 IMAGE
             |---|---|

TEXT
|---|---|---|
```

左右対称ではない。

でも、同じ座標系を共有している。

**Order is not the same as symmetry.**

秩序と対称性を同じものとして扱わない。

## 8. 以前の学びとの接続：SpacingをSystemへ引き上げる

今日までの流れをつなぐと、こうなる。

```text
Line Height
→ 行と行の縦距離

Measure
→ 行頭から行末までの横距離

Alignment
→ 要素同士の関係

Grid
→ その距離と関係をページ全体で再利用する仕組み
```

ここで一段、解像度が上がる。

**Spacing is local. A grid makes spacing systemic.**

余白やAlignmentは局所的な判断としても成立する。

Grid Systemは、それを一画面限りの調整から、繰り返し使えるルールへ引き上げる。

この考え方は、現在のUI制作でいうspacing tokenやlayout primitiveにもつながっていく。

## 9. 30秒でできる観察：見えない線を探す

Webサイトを一つ開いて、内容を読まずに次の左端・右端だけを見る。

```text
見出し
本文
画像
ボタン
カード
注釈
```

目で縦線を引くつもりで観察する。

**何個の要素が同じ見えない線を共有しているか。**

次に、一つだけ微妙に外れている要素を探す。

そこで、

```text
意図的にGridを破っている？
それとも単に基準がない？
```

と考える。

「ズレている」ではなく「どの基準から外れているか」を言えるようになるのが練習の目的や。

## 10. 次につながる概念：Design System

Cooper HewittはWim Crouwelについて、gridを単に均一化する道具としてではなく、designer個人の手や頭の外側にある構造として使い、柔軟なsystemや予想外のformを生み出したと説明している。

[Cooper Hewitt — Remembering Wim Crouwel](https://www.cooperhewitt.org/2019/09/20/remembering-wim-crouwel-1928-2019/)

これは現代のDesign Systemにも接続しやすい。

```text
Grid
Spacing
Typography
Color
Components
Interaction rules
```

が共有されると、判断は一人のdesignerの頭の中だけに存在しなくなる。

もちろん、歴史上のgraphic gridと現代のDesign Systemは同じものではない。

ただ、**individual compositionからshared systemへ**という設計上の問いは共通して見える。

今日の中心命題はこれ。

**A grid is not a cage. It is a shared coordinate system for design decisions.**

日本語なら、

**グリッドは「縛る線」ではなく、「判断を共有する座標系」。**

これを覚えると、「なんとなく揃っていない」を、一画面だけの微調整ではなくシステムの問題として指摘できるようになる。

## 参考資料

- [Swiss National Library — The International style 1950–1970](https://www.nb.admin.ch/en/the-international-style-1950-1970)
- [Swiss National Library — The Zurich Concretists](https://www.nb.admin.ch/en/the-zurich-concretists)
- [Cooper Hewitt, Smithsonian Design Museum — A Harmony of Contrasts](https://www.cooperhewitt.org/2018/08/05/aharmonyofcontrasts/)
- [Cooper Hewitt, Smithsonian Design Museum — Remembering Wim Crouwel](https://www.cooperhewitt.org/2019/09/20/remembering-wim-crouwel-1928-2019/)
