---
id: design-literacy-grid-shared-coordinate-system
title: "Grid System――グリッドは『揃える線』ではなく『判断を共有する座標系』"
subtitle: "English Mix｜Design Literacy #11｜From Individual Placement to Reusable Rules"
created: "2026-09-03"
updated: "2026-09-03"
type: "English Mix"
status: "完成"
mode: "english-mix"
english_ratio: 0.45
mix_unit: "sentence"
series: "Design Literacy｜細部から思想まで"
seriesOrder: 11
---

# Grid System――グリッドは「揃える線」ではなく「判断を共有する座標系」
## Design Literacy #11｜From Individual Placement to Reusable Rules

**A grid is not decoration. It is a system for making relationships repeatable.**

前回まで、Line Heightでvertical distance、Measureでhorizontal reading distanceを見てきた。

This time, we zoom out one level.

**How do we turn those distances and placements into rules that can be reused across an entire page?**

テーマは**Grid System**。

## 1. まず一言：Good grids reduce meaningless decisions

ページを作るたびに、

```text
タイトルはこのへん
本文はこれくらい
画像は少し右
ボタンは前回と同じくらい
```

と判断していると、every layout starts from zero.

A grid gives the page a shared coordinate system before individual elements are placed.

```text
Columns
Margins
Gutters
Modules
Baseline
```

すると制作中の問いが、

**“Where should I put this?”から“What relationship does this information belong to?”へ変わる。**

That shift is one of the main values of a grid.

## 2. 仕組み：A column is not the whole grid

「12カラムにする」だけでGrid Systemが完成するわけではない。

Typical parts include:

```text
Margin
→ outer space around the page

Column
→ vertical regions for placement

Gutter
→ space between columns

Module
→ units created by vertical and horizontal divisions

Baseline
→ vertical reference for aligning text
```

たとえば、

```text
| margin | col | gut | col | gut | col | margin |
```

という共通ルールがあると、headings, body text, images, notes, and buttons can look different while still belonging to the same spatial system.

**Consistency does not require sameness.**

全部を同じ形にするのではなく、different elements share the same relational rules.

## 3. Before → After：Share the reference, not just the alignment

### BEFORE

```text
TITLE
        Image

Text text text
                 Note

       Button
```

Each element may look acceptable on its own.

でも、「なぜそこにいるのか」を説明するshared ruleがない。

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

The important change is not symmetry.

**Multiple elements can now reuse the same reference lines.**

以前扱ったAlignmentが「要素同士にrelationshipを作ること」なら、Gridは**infrastructure for repeating that relationship**と考えられる。

## 4. そのまま使える制作・修正指示

“Make it more aligned”では、一つのscreenを直すだけで終わりやすい。

Instead, give an instruction like this:

> **本文・見出し・画像・補足情報を個別に位置調整する前に、共通で参照できるcolumn・margin・gutterの基準を設定してください。要素ごとの微調整ではなく、複数セクションで同じreference lineを再利用できる構造にしてください。**

For responsive design:

> **Desktopのcolumn数や配置をそのまま縮小せず、情報同士の優先順位と関係性を保ったまま、Mobile用のgridへ再構成してください。**

**Responsive grid is not a smaller desktop grid.**

What should survive is not the number of columns, but the hierarchy and relationships between information.

## 5. 歴史との接続：Swiss Style was not simply “the grid style”

After World War II, the International Typographic Style, often called Swiss Style, made the typographic grid one of its important characteristics.

Swiss National Library lists features including **typographic grids, sans-serif typefaces, precision, simple typography, rational composition, and photography**.

[Swiss National Library — The International style 1950–1970](https://www.nb.admin.ch/en/the-international-style-1950-1970)

ここは単純化しない。

**Swiss Style ≠ Grid.**

Zurich and Basel also had different educational and visual traditions. The Swiss National Library describes the International Style as a movement in which ideas from the Zurich School and Basel School interacted.

So the useful historical lesson is not “use a grid and your work becomes Swiss Style.”

むしろ、**information can be placed inside a structure instead of being handled as isolated decoration**という態度を見る。

## 6. 教育との接続：Ernst Keller and the problem before the style

Swiss National Library identifies Ernst Keller with the first graphic design course at the Zurich School of Design.

It also explains that Keller believed a poster had to be **immediately and effortlessly understood** to be effective, and that image, text, style, colour, and composition all contributed to that goal.

[Swiss National Library — The Zurich Concretists](https://www.nb.admin.ch/en/the-zurich-concretists)

ここから現在へ接続すると、Grid itself should not become the goal.

**A grid is not there to make a beautiful 12-column overlay. It is there to clarify relationships that matter.**

情報構造が悪いままgridだけ整えても、understanding does not automatically improve.

## 7. 誤解しやすい点：Grid does not mean symmetry

Grid-based design and asymmetrical layout can coexist.

Cooper Hewitt describes Swiss Style through features including **asymmetrical layouts, grid-based design, sans-serif typography, and photography** in its discussion of Armin Hofmann.

[Cooper Hewitt — A Harmony of Contrasts](https://www.cooperhewitt.org/2018/08/05/aharmonyofcontrasts/)

For example:

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

Yet everything still shares one coordinate system.

**Order is not the same as symmetry.**

秩序と対称性を混同しない。

## 8. 以前の学びとの接続：From spacing to system

今日までの流れをつなぐと、

```text
Line Height
→ vertical distance between lines

Measure
→ horizontal reading distance

Alignment
→ relationship between elements

Grid
→ a system for reusing those distances and relationships
```

ここで一段解像度が上がる。

**Spacing is local. A grid makes spacing systemic.**

Margins and alignment can exist as local adjustments.

Grid System turns them from one-screen fixes into reusable rules.

この考え方は、modern UI designのspacing tokensやlayout primitivesにもつながっていく。

## 9. 30秒でできる観察：Look for invisible lines

Open one website and ignore the content for a moment.

次のleft edge / right edgeだけを見る。

```text
Heading
Body text
Image
Button
Card
Note
```

Imagine drawing vertical lines through them.

**How many elements share the same invisible reference line?**

Then find one element that is slightly outside the pattern.

Ask:

```text
Intentional grid break?
Or simply no shared reference?
```

The goal is to move from “this looks misaligned” to **“which reference is this element breaking?”**

## 10. 次につながる概念：Design System

Cooper Hewitt describes Wim Crouwel as using the grid not to suppress creativity or force homogeneity, but as a structure outside the individual designer’s hand and mind—one that could generate flexible systems and unexpected forms.

[Cooper Hewitt — Remembering Wim Crouwel](https://www.cooperhewitt.org/2019/09/20/remembering-wim-crouwel-1928-2019/)

That connects naturally to modern Design Systems.

```text
Grid
Spacing
Typography
Color
Components
Interaction rules
```

When these rules are shared, design decisions no longer live only inside one designer’s head.

もちろん、historical graphic grids and modern Design Systems are not the same thing.

But they share a useful question:

**How do we move from individual composition to a shared system?**

Today’s claim is:

**A grid is not a cage. It is a shared coordinate system for design decisions.**

日本語なら、

**グリッドは「縛る線」ではなく、「判断を共有する座標系」。**

Once you see it this way, “なんとなく揃っていない” can be diagnosed as a system problem rather than just a one-off visual adjustment.

## 参考資料

- [Swiss National Library — The International style 1950–1970](https://www.nb.admin.ch/en/the-international-style-1950-1970)
- [Swiss National Library — The Zurich Concretists](https://www.nb.admin.ch/en/the-zurich-concretists)
- [Cooper Hewitt, Smithsonian Design Museum — A Harmony of Contrasts](https://www.cooperhewitt.org/2018/08/05/aharmonyofcontrasts/)
- [Cooper Hewitt, Smithsonian Design Museum — Remembering Wim Crouwel](https://www.cooperhewitt.org/2019/09/20/remembering-wim-crouwel-1928-2019/)
