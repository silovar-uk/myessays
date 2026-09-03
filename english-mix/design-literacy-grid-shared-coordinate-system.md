---
id: design-literacy-grid-shared-coordinate-system
title: "Grid System――グリッドは『揃える線』ではなく『判断を共有する座標系』"
subtitle: "English Mix｜Design Literacy #11｜From Individual Placement to Reusable Rules"
created: "2026-09-03"
updated: "2026-09-04"
type: "English Mix"
status: "完成"
mode: "english-mix"
english_ratio: 0.45
mix_unit: "sentence"
series: "Design Literacy｜細部から思想まで"
seriesOrder: 11
abstract: "Grid Systemを、単に要素をきれいに揃えるための線ではなく、配置判断を個人の勘から切り離し、複数要素・複数画面・複数人で再利用できるshared coordinate systemとして捉え直す。Swiss Styleのtypographic gridやasymmetrical layout、Ernst Kellerの教育思想、Wim Crouwelのgrid観を整理しながら、現代Web/UIにおけるcolumns、gutters、responsive layout、design systemへと接続する。"
---

# Grid System――グリッドは「揃える線」ではなく「判断を共有する座標系」
## Design Literacy #11｜From Individual Placement to Reusable Rules

**A grid is not decoration. It is a system for making relationships repeatable.**

前回までの考察では、行間のvertical distanceを司るLine Heightや、行の長さによるhorizontal reading distanceを左右するMeasureを扱ってきた。文字の近さや行の折り返しといった局所的な距離感を見てきたわけだが、今回はその視点をもう一段ズームアウトしたい。

This time, we zoom out one level. 画面やページ全体のなかで、それらの距離や配置をどのように「繰り返し再利用できるルール」へと昇華させるか。How do we turn those distances and placements into rules that can be reused across an entire page? 今回のテーマは**Grid System（グリッドシステム）**だ。

---

## 1. まず一言：Good grids reduce meaningless decisions

新しいページや画面を作るたびに、「タイトルはこのあたりに置こう」「本文の幅はこれくらいにしよう」「画像は少し右寄りに配置して、ボタンは前回と同じくらいの余白で……」と手探りで決めていては、every layout starts from zero. 作業のたびにゼロから位置を判断することになってしまう。

グリッドを導入する最大の効用は、個々の要素を配置する前に、まず画面全体で共有される「共通の座標系」を定義できる点にある。A grid gives the page a shared coordinate system before individual elements are placed.

- **Columns**: vertical regions for placement
- **Margins**: outer space around the page
- **Gutters**: space between columns
- **Modules**: units created by vertical and horizontal divisions
- **Baseline**: vertical reference for aligning text

あらかじめこの構造が敷かれていると、デザイン作業における根本的な問いが変化する。制作中の問いが、「“Where should I put this?”（これをどこに置くか）」という場当たり的な配置の悩みから、「“What relationship does this information belong to?”（この情報はどの関係性に属しているか）」という構造の判断へと変わるのだ。That shift is one of the main values of a grid.

---

## 2. 仕組み：A column is not the whole grid

「このWebサイトは12カラムで組まれている」という言葉をよく耳にするが、カラムの数を決めるだけでGrid Systemが完成するわけではない。グリッドは複数の空間的ルールが組み合わさって機能している。Typical parts include:

- **Margin**: outer space around the page（コンテンツと画面端の境界を保つ外周余白）
- **Column**: vertical regions for placement（水平方向を分割し、要素を配置する縦の領域）
- **Gutter**: space between columns（要素同士がくっつき合わないための列間の間隔）
- **Module**: units created by vertical and horizontal divisions（縦横の分割が交差して生まれる単位）
- **Baseline**: vertical reference for aligning text（文字の垂直方向のリズムを揃える基準線）

たとえば、ページ全体に次のような規則的な構造が通っているとする。

```text
| margin | col | gut | col | gut | col | margin |
```

こうした共通の土台があれば、headings, body text, images, notes, and buttonsといった見た目も役割も異なる要素たちが、それぞれ別の形を保ちながらも、同じ空間の秩序に従って共存できるようになる。

**Consistency does not require sameness.**

全部を同じ形にするのではなく、different elements share the same relational rules. 異なる要素たちに共通の関係性のルールを与えることこそが、グリッドの本来の役割なのだ。

---

## 3. Before → After：Share the reference, not just the alignment

グリッドの有無がもたらす差を、簡略化したレイアウトで見てみよう。

### BEFORE

```text
TITLE
        Image

Text text text
                 Note

       Button
```

Each element may look acceptable on its own. 個々の要素を単体で見れば破綻していないかもしれないが、全体を俯瞰したとき、「なぜ画像はその位置にあるのか」「なぜ注釈はそこまで右に寄っているのか」という必然性を説明するshared ruleが存在しない。

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

The important change is not symmetry. すべての要素が左右対称になったわけではない。重要なのは形を揃えることではなく、**Multiple elements can now reuse the same reference lines.（複数の異なる要素が同じ基準線を再利用できるようになったこと）**だ。

以前扱ったAlignmentが「要素同士にrelationshipをつくる操作」なら、Gridは**infrastructure for repeating that relationship（その関係性を画面全体で繰り返し生み出すためのインフラ）**と考えられる。

---

## 4. そのまま使える制作・修正指示

レビューの現場で“Make it more aligned”（もう少し綺麗に揃えてください）とだけ伝えても、一つの画面の微調整で終わりやすい。本質的な修正を促すなら、次のように指示を言語化できる。

> **本文・見出し・画像・補足情報を個別に位置調整する前に、共通で参照できるcolumn・margin・gutterの基準を設定してください。要素ごとの微調整ではなく、複数セクションで同じreference lineを再利用できる構造にしてください。**

For responsive design, レスポンシブWebデザインの場面では、この指示をもう一段変える必要がある。

> **Desktopのcolumn数や配置をそのまま縮小せず、情報同士の優先順位と関係性を保ったまま、Mobile用のgridへ再構成してください。**

**Responsive grid is not a smaller desktop grid.**

画面幅が変わったときに守るべきなのは、カラムの数という表面的な数値ではない。What should survive is not the number of columns, but the hierarchy and relationships between information. 情報同士の階層構造と関係性そのものを守ることが本質だ。

---

## 5. 歴史との接続：Swiss Style was not simply “the grid style”

After World War II, the International Typographic Style, often called Swiss Style, made the typographic grid one of its important characteristics.

Swiss National Library lists features including **typographic grids, sans-serif typefaces, precision, simple typography, rational composition, and photography**.

[Swiss National Library — The International style 1950–1970](https://www.nb.admin.ch/en/the-international-style-1950-1970)

ここで注意したいのは、**Swiss Style ≠ Grid** という点だ。「スイス・スタイル＝単にグリッドを敷くこと」という短絡的な理解に陥ってはならない。

また、Zurich and Basel also had different educational and visual traditions. 当時のスイス国内においてもチューリッヒ派とバーゼル派では教育思想や造形の志向性に明確な違いがあり、スイス国立図書館も、国際タイポグラフィ様式は両派の理論や実践が相互に作用し合うなかで形成されたと説明している。

So the useful historical lesson is not “use a grid and your work becomes Swiss Style.” 歴史から学ぶべき本質は「グリッドを引けばスイス・スタイルになる」という表面的なレシピではない。**Information can be placed inside a structure instead of being handled as isolated decoration.** 情報を個人の恣意的な装飾として散りばめるのではなく、合理的な構造のなかに位置づけて伝達するという設計の態度なのだ。

---

## 6. 教育との接続：Ernst Keller and the problem before the style

スイス・スタイルの源流を辿るうえで欠かせないのが、チューリッヒ工芸学校でスイス初の本格的なグラフィックデザイン教育課程を立ち上げたErnst Keller（エルンスト・ケラー）の存在だ。Swiss National Library identifies Ernst Keller with the first graphic design course at the Zurich School of Design.

資料によると、Keller believed a poster had to be **immediately and effortlessly understood** to be effective, and that image, text, style, colour, and composition all contributed to that goal. ポスターなどの視覚伝達物が機能するためには、鑑賞者に瞬時に、無理なく直感的に理解される状態をつくることが不可欠であり、そのためにすべての要素が統合されるべきだと説いた。

[Swiss National Library — The Zurich Concretists](https://www.nb.admin.ch/en/the-zurich-concretists)

ここから現代のUI設計へ接続すると、Grid itself should not become the goal. グリッドそのものを自己目的化してはならないという教訓が得られる。

**A grid is not there to make a beautiful 12-column overlay. It is there to clarify relationships that matter.**

情報構造が悪いままgridだけ整えても、understanding does not automatically improve. 直感的に理解しやすい画面が生まれることは決してないのだ。

---

## 7. 誤解しやすい点：Grid does not mean symmetry

グリッドを意識し始めたときに陥りがちな誤解が、「グリッドを使うと、すべてのレイアウトが左右対称で退屈になってしまうのではないか」という懸念だ。

しかし実際には、Grid-based design and asymmetrical layout can coexist. スイス・スタイルの真骨頂は、グリッドに基づきながらも非対称なレイアウトを見事に両立させた点にあった。Cooper Hewitt describes Swiss Style through features including **asymmetrical layouts, grid-based design, sans-serif typography, and photography** in its discussion of Armin Hofmann.

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

この配置は明らかに左右対称ではない。Yet everything still shares one coordinate system. それでも画面が散漫にならず安定して見えるのは、すべての要素が同一の6カラムという座標系を共有しているからだ。

**Order is not the same as symmetry.**

均整を保つことと、左右対称に置くことの違いを見極めること。グリッドは退屈な均一性を強いる檻ではなく、非対称な要素のあいだに確かな秩序をもたらすための装置なのだ。

---

## 8. 以前の学びとの接続：From spacing to system

これまでの連載で扱ってきた概念を並べてみると、一本の確かな軸が見えてくる。

- **Line Height**: vertical distance between lines（行と行の垂直方向の距離）
- **Measure**: horizontal reading distance（行頭から行末までの読書距離）
- **Alignment**: relationship between elements（要素同士の視覚的な関係性）
- **Grid**: a system for reusing those distances and relationships（全体で再利用可能な仕組み）

ミクロな距離の調整から、マクロな空間構造へ。ここで解像度が一段引き上がる。

**Spacing is local. A grid makes spacing systemic.**

Margins and alignment can exist as local adjustments. 余白や行間の調整は局所的な判断としても一応は成立するが、Grid Systemはそれを一画面限りの使い捨てから、反復可能なルール（reusable rules）へと引き上げる。

この思想は、modern UI designにおけるspacing tokensやlayout primitivesといった設計概念へとダイレクトにつながっている。

---

## 9. 30秒でできる観察：Look for invisible lines

日常のWebブラウジングですぐに試せる30秒の観察方法がある。Open one website and ignore the content for a moment. 好きなWebサイトを1つ開き、テキストの内容はいったん読まずに、画面上の主要な要素のleft edge / right edgeだけに注目してみる。

- Heading
- Body text
- Image
- Button
- Card
- Note

Imagine drawing vertical lines through them. 画面の上に透明な定規を当てて縦線を引くような感覚で、要素たちの端を見つめてみるのだ。そのとき、自問してみてほしい。

**“How many elements share the same invisible reference line?”（いくつの要素が、同じ見えない基準線を共有しているだろうか？）**

もし、1つだけわずかに外れている要素を見つけたら、さらに思考を進めてみる。

- Intentional grid break?（視線を集めるために意図的にグリッドを破っているのか？）
- Or simply no shared reference?（それとも単に基準線が定義されていないだけなのか？）

The goal is to move from “this looks misaligned” to **“which reference is this element breaking?”** 「なんとなくズレている」という感覚から、「どの基準から外れているか」を的確に言語化できるようになること。それこそが、グリッドリテラシーを身につけるための確かな一歩となる。

---

## 10. 次につながる概念：Design System

Cooper Hewitt describes Wim Crouwel as using the grid not to suppress creativity or force homogeneity, but as a structure outside the individual designer’s hand and mind—one that could generate flexible systems and unexpected forms. クーパー・ヒューイットは、ヴィム・クロウエルがグリッドを単なる均一化の道具としてではなく、デザイナー個人の恣意的な主観の外側にある客観的構造として扱い、柔軟なシステムや新たな形態を生み出すために駆使したと評している。

[Cooper Hewitt — Remembering Wim Crouwel](https://www.cooperhewitt.org/2019/09/20/remembering-wim-crouwel-1928-2019/)

That connects naturally to modern Design Systems. この思想は、現代のプロダクト開発におけるDesign Systemの根幹そのものだ。

- Grid（配置の座標系）
- Spacing（余白のスケール定義）
- Typography（書体と階層）
- Color（色彩体系）
- Components（再利用可能な部品群）
- Interaction rules（振る舞いの規約）

When these rules are shared, design decisions no longer live only inside one designer’s head. これらがチーム全体で共有されたとき、デザインの判断は1人の頭の中のブラックボックスから解放される。

もちろん、historical graphic grids and modern Design Systems are not the same thing. しかし、「individual compositionからshared systemへ（個人の個別配置から、共有されたシステムへ）」という設計の本質的な問いは、時代を超えて共通している。

Today’s claim is:

**A grid is not a cage. It is a shared coordinate system for design decisions.**  
**グリッドは「縛る線」ではなく、「判断を共有する座標系」である。**

Once you see it this way, “なんとなく揃っていない” can be diagnosed as a system problem rather than just a one-off visual adjustment. この座標系を意識できるようになれば、画面の違和感を場当たり的な微調整で終わらせることなく、再現性のあるシステムの課題として捉え、改善していくことができるはずだ。

---

## 参考資料

- [Swiss National Library — The International style 1950–1970](https://www.nb.admin.ch/en/the-international-style-1950-1970)
- [Swiss National Library — The Zurich Concretists](https://www.nb.admin.ch/en/the-zurich-concretists)
- [Cooper Hewitt, Smithsonian Design Museum — A Harmony of Contrasts](https://www.cooperhewitt.org/2018/08/05/aharmonyofcontrasts/)
- [Cooper Hewitt, Smithsonian Design Museum — Remembering Wim Crouwel](https://www.cooperhewitt.org/2019/09/20/remembering-wim-crouwel-1928-2019/)
