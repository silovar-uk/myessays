---
id: design-literacy-visual-hierarchy-attention-order
title: "全部を目立たせたら、何も目立たなくなる――Visual Hierarchy"
subtitle: "Design Literacy #23｜「大きく・太く・赤く」から、注意の順序を設計するへ"
created: "2026-09-07"
updated: "2026-09-07"
type: "Essay"
status: "完成"
tags: ["Design Literacy", "デザイン", "Visual Hierarchy", "Gestalt", "Proximity", "Visual Weight", "Typography", "New Typography", "Jan Tschichold", "Bauhaus", "Information Architecture"]
keywords: ["visual hierarchy", "scale", "contrast", "grouping", "proximity", "squint test", "visual weight", "attention", "New Typography", "Jan Tschichold", "Herbert Bayer", "information architecture"]
favorite: 5
grow: 5
series: "Design Literacy｜細部から思想まで"
seriesOrder: 23
abstract: "「全部を目立たせてください」という無理難題を入口に、Visual Hierarchyを単なる文字サイズの順位ではなく、重要度に応じて注意を編成する設計として捉え直す。NN/gのVisual HierarchyとSquint Test、GestaltのProximity、MoMAが整理するNew Typographyを手掛かりに、scale・contrast・groupingを一変数ずつ比較し、現代UIで再利用できる制作・レビュー手順へ落とし込む。"
---

# 全部を目立たせたら、何も目立たなくなる――Visual Hierarchy
## Design Literacy #23｜「大きく・太く・赤く」から、注意の順序を設計するへ

「タイトルをもっと目立たせてください」

分かる。

「日付も大事なので目立たせてください」

まあ分かる。

「対戦相手も重要です。イベント名も、チケットボタンも、スポンサー名も目立たせてください」

ここまで来ると、画面の中で全員が拡声器を持ち始める。

```text
MATCH DAY!!!
9.19 SAT!!!
VS TOKYO V!!!
SPECIAL EVENT!!!
TICKETS!!!
PARTNER!!!
```

全員が叫んでいる。

そして妙なことに、**誰の話も入ってこない。**

今日は、この「全部大事なのに、全部を強くすると何も大事に見えなくなる」という小さな矛盾を本気で調べる。

## 1. まず一言：Hierarchyは「大きさランキング」ではない

**Hierarchy is not a ranking of sizes. It is an organization of attention.**

Nielsen Norman GroupはVisual Hierarchyを、2次元の画面上の要素を、意図した重要度の順に知覚しやすくするよう組織することとして説明している。その主要な手段として、**color / contrast、scale、grouping**を挙げている。

[Nielsen Norman Group — Visual Hierarchy in UX: Definition](https://www.nngroup.com/articles/visual-hierarchy-ux-definition/)

つまり、

```text
重要
↓
font-size: 64px
```

だけではない。

より正確には、

```text
何を最初に認識してほしい？
何を次に読んでほしい？
何は必要になるまで背景にいてよい？
```

という情報上の優先順位を、視覚へ翻訳する。

ここが今回の中心命題になる。

## 2. 一度、同じ情報で「やりすぎ実験」をする

同じ試合告知を四つ作る。

内容は全部同じ。変えるのは見せ方だけ。

### A｜全員平等

```text
MATCH DAY
9.19 SAT 19:00
URAWA REDS vs TOKYO VERDY
SPECIAL EVENT
TICKETS ON SALE
```

全部同じサイズ、同じ太さ、ほぼ同じ間隔。

平等ではある。

ただ、**どこから読めばいいかを全部ユーザーに決めさせている。**

### B｜タイトルだけ巨大化

```text
MATCH DAY
──────────────
9.19 SAT 19:00
URAWA REDS vs TOKYO VERDY
SPECIAL EVENT
TICKETS ON SALE
```

タイトルだけを大きくする。

Aより入口はできた。

でも残り四つは相変わらず横並び。

「一番目」は作れても、「二番目以降」はまだ設計されていない。

### C｜重要だから全部強くする

```text
MATCH DAY !!!
9.19 SAT 19:00 !!!
URAWA REDS vs TOKYO VERDY !!!
SPECIAL EVENT !!!
TICKETS ON SALE !!!
```

最初の状態に戻った。

**Emphasis has an economy.**

強調は、希少だから強調になる。

### D｜仕事を分担する

```text
MATCH DAY

9.19 SAT 19:00
URAWA REDS vs TOKYO VERDY

Special Event

[ TICKETS ON SALE ]
```

ここでは一つの手段に全部を背負わせない。

- タイトル：scale
- 日付と対戦：grouping
- 補助情報：低いcontrast
- CTA：局所的なcontrastと独立した領域
- グループ間：spacing

というふうに、複数の変数へ仕事を分ける。

**INTERPRETATION**

実務上のVisual Hierarchyは、「最重要要素を最大化する」より、**複数段階の差を、複数の視覚変数で作る**と考える方が扱いやすい。

## 3. 目を細めると、設計の言い訳が消える

ここで少し変な実験をする。

画面から一歩離れ、目を細める。

文字を読めないくらいまでぼかす。

**Squint.**

Nielsen Norman GroupはこれをSquint Testとして紹介している。細部を読めなくした状態で、どこが強く残るか、どの要素がまとまりとして見えるかを確認する診断方法だ。

[Nielsen Norman Group — Squint Test](https://www.nngroup.com/videos/squint-test/)

これは「ユーザーの視線を科学的に測定する装置」ではない。

Eye Trackingでもない。

ただ、文字内容に引っ張られず、**contrast・scale・groupingが作っている骨格を見る**には非常に便利だ。

C案をぼかすと、だいたい全部が黒い塊になる。

D案をぼかすと、タイトル、試合情報、CTAという強弱が残りやすい。

細かい説明を全部消しても構造が残るなら、Hierarchyは文字の意味だけに依存していない。

## 4. ここでGestaltが入ってくる：「近い」は関係を作る

Visual Hierarchyというと、どうしても「目立つ／目立たない」の話だけになりやすい。

でも、情報の順序にはもう一つ大事な仕事がある。

**Grouping。**

Gestalt心理学のLaw of Proximityでは、互いに近い要素は、離れた要素より同じまとまりとして知覚されやすい。

[Interaction Design Foundation — Laws of Proximity, Uniform Connectedness, and Continuation](https://assets.interaction-design.org/literature/article/laws-of-proximity-uniform-connectedness-and-continuation-gestalt-principles-2)

例えば、

```text
9.19 SAT

19:00

TOKYO VERDY
```

より、

```text
9.19 SAT
19:00
vs TOKYO VERDY


[ TICKETS ]
```

の方が、「試合情報」と「行動」が別グループとして見えやすい。

ここで大事なのは、Whitespaceが「何も置いていない場所」ではなくなることだ。

**Space can encode relationships.**

余白そのものが、

```text
ここまでは同じ話
ここから別の話
```

を伝えている。

Visual Hierarchyは強調の技術だけではない。

**関係を見せる技術でもある。**

## 5. Visual Weightとの違い：「強い」と「偉い」は同じではない

直前の学習ではVisual Weightを扱った。

そこで見たのは、

```text
どの要素が強く見える？
```

だった。

今回は、

```text
その強さに、どんな仕事をさせる？
```

まで進む。

例えば真っ赤な写真は非常に強いVisual WeightやSalienceを持つかもしれない。

でも、その写真が補助情報なら、ページ全体のHierarchyとしては事故になることがある。

NN/gもVisual Hierarchyの記事で、テンプレートだけでなく、そこへ入る実際のコンテンツによって意図しない強調が生まれうることを指摘している。

つまり、

```text
Visual Weight
= 強く見える度合いを考えるレンズ

Visual Hierarchy
= その強弱を情報の重要度と対応させる設計
```

と分けると整理しやすい。

**Visual Weight creates differences. Hierarchy gives those differences a job.**

## 6. 1920年代へ飛ぶ：「左右対称に並べる」以外の秩序

ここから突然、1920年代の印刷物へ行く。

1枚のWebページを直していたはずなのに、約100年前まで来てしまった。

MoMAはThe New Typographyについて、1920〜30年代の中央ヨーロッパで、従来の左右対称なtype arrangementから離れ、typeやillustration、photomontageなどをページ上のfieldへ非対称に配置する考え方が広がったと説明している。

Jan Tschicholdは1928年の『Die Neue Typographie』で、その動向を実践的な指針として体系化した。

[MoMA — The New Typography](https://www.moma.org/calendar/exhibitions/1013)

ここで注意したい。

**FACT**

New Typographyでは、非対称配置、type、illustrationやphotomontageを用いた情報編成が重要な特徴になった。Tschicholdは1928年の著作でそれを体系化した。

**INTERPRETATION**

現代UIのVisual HierarchyをNew Typographyが「発明した」と言うことはできない。

ただし、**秩序は左右対称や均等配置だけで作るものではない**という歴史的な比較対象として見ると、現在のレイアウトを考える視野が広がる。

重要なのは「昔から大きい文字があった」という話ではない。

**差をどう組み、情報をどう読ませるかがデザインの問題だった**ということだ。

## 7. Bauhausを「赤・黒・丸・三角」にしない

New TypographyとBauhausには接点がある。

MoMAによれば、TschicholdはSoviet RussiaやWeimar Bauhausの動向から影響を受けていた。

一方、Herbert BayerはBauhausで学んだあと、1925〜28年に広告・デザイン・タイポグラフィの教師として活動し、写真をgraphic compositionへ統合していった。

[MoMA — Herbert Bayer](https://www.moma.org/artists/399)

しかし、

```text
Bauhaus
↓
sans-serif
↓
asymmetry
↓
Visual Hierarchy
```

と一直線にするのは雑すぎる。

運動も人物も時期も違う。

まして、赤・黒・円・三角形を置けばBauhausになるわけではない。

これ、今のUIでも同じだ。

```text
大きいタイトル
太いCTA
薄い説明文
```

を置いただけでHierarchyが完成するわけではない。

**見た目の記号と、設計原理は別物だ。**

## 8. 誤解：「見る順番」を完全にプログラムできる？

Visual Hierarchyという言葉は少し強い。

「1→2→3の順で全員に見せられる」ような響きがある。

でもユーザーの注意は、

- その人の目的
- 既に知っていること
- 画面サイズ
- コンテンツそのもの
- 動き
- 周囲の環境

でも変わる。

だから、Hierarchyは「視線の強制」ではない。

**意図した重要度を、認識しやすくするための構造**と考えた方が安全だ。

Squint Testで良く見えても、最終的には実際のユーザーとタスクで確認する必要がある。NN/gも最終的な確認としてtarget usersでのtestingを勧めている。

## 9. そのまま使える制作・修正指示

「メリハリをつけてください」では、何を触ればよいか分からない。

制作指示なら、次まで分解する。

> **情報をPrimary / Secondary / Tertiaryに分類し、最初に認識してほしい要素を定義してください。そのうえで、scaleだけに依存せず、contrast・font weight・spacing・proximity・groupingを分担させます。最後にSquint Testで、文字を読めない状態でも意図した強弱とまとまりが残るか確認してください。**

レビュー時はさらに短くできる。

> **1番目、2番目、3番目に何を見てほしいですか。現在の画面は、その順序とグループを視覚的に説明できていますか。**

「ここをもっと大きく」から、

**「この情報に、何番目の仕事をさせるか」**

へ変わる。

## 10. 30秒でできる観察

スマホで適当なアプリを開く。

目を細める。

本当に細める。

文字が読めなくなったら、まだ残って見えるものを三つ選ぶ。

```text
1st
2nd
3rd
```

次に普通の目へ戻す。

その三つは、本当にその画面で重要なものだったか。

違ったら、

```text
size?
contrast?
color?
grouping?
spacing?
content?
```

のどれが「予定外の主役」を作っているか考える。

30秒でいい。

## 11. 次はInformation Architectureへ

ここまで来ると、最後に嫌な疑問が残る。

> そもそも、何をPrimaryにするべきなのか？

これはVisual Designだけでは決められない。

```text
Information Architecture
↓
情報をどう構造化する？

Visual Hierarchy
↓
その構造をどう見せる？
```

という関係になる。

**You cannot fix bad information structure with bigger typography.**

情報構造が曖昧なまま、文字だけ巨大化しても解決しない。

最初は「全部を目立たせてください」という無理難題だった。

調べる前は、Hierarchyとは「重要なものを大きくする技術」くらいに見えていた。

今は少し違う。

**本当に必要なのは、目立つ要素を増やすことではなく、要素同士に役割の差を与えることだった。**

全部が大事でもいい。

ただし、全部が同じ瞬間に主役である必要はない。

---

## 今日の中心命題

**Don’t make everything louder. Make the differences clearer.**

Visual Hierarchyは、全員の声量を上げる技術ではない。

**重要度・関係・順序の差を、scale・contrast・grouping・spacingなどへ翻訳する設計である。**

## 検索用専門語

`Visual Hierarchy / Scale / Contrast / Grouping / Proximity / Gestalt / Squint Test / Visual Weight / New Typography / Jan Tschichold / Herbert Bayer / Information Architecture`

## 参考資料

- [Nielsen Norman Group — Visual Hierarchy in UX: Definition](https://www.nngroup.com/articles/visual-hierarchy-ux-definition/)
- [Nielsen Norman Group — Squint Test](https://www.nngroup.com/videos/squint-test/)
- [Interaction Design Foundation — Laws of Proximity, Uniform Connectedness, and Continuation](https://assets.interaction-design.org/literature/article/laws-of-proximity-uniform-connectedness-and-continuation-gestalt-principles-2)
- [MoMA — The New Typography](https://www.moma.org/calendar/exhibitions/1013)
- [MoMA — Herbert Bayer](https://www.moma.org/artists/399)
