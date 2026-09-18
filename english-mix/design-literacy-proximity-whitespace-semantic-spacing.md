---
id: design-literacy-proximity-whitespace-semantic-spacing
title: 枠線を全部消したのに、なぜまだグループが見えるのか？
subtitle: Design Literacy #55｜Gestalt Proximity / Whitespace / Semantic Spacing
created: 2026-09-18
updated: 2026-09-18
type: Essay
status: published
tags: ["Design Literacy", "Gestalt", "Proximity", "Whitespace", "Accessibility", "Design Systems"]
keywords: ["Gestalt Proximity", "Principle of Proximity", "Whitespace", "Negative Space", "Semantic Spacing", "Perceptual Grouping", "Visual Grouping", "Cognitive Accessibility", "Max Wertheimer", "Spacing Tokens"]
favorite: false
grow: true
series: Design Literacy｜細部から思想まで
seriesOrder: 55
abstract: 「余白を増やしてください」というdesign instructionを本気で疑う。Why can people still find groups on a screen even without borders or background fills?Max Wertheimerの1923年のGestalt研究、現代UIのProximity、W3Cの認知アクセシビリティ資料をたどり、Whitespaceをleftover spaceではなく、relationshipとboundaryを書くinformationとして捉え直す。
---

# 枠線を全部消したのに、なぜまだグループが見えるのか？

Web design reviewには、かなり便利な言葉がある。

> **「もう少し余白を増やしてください」**

Most of the time、何かしら良くなる。

窮屈だった画面に空気が入り、文字が読みやすくなり、ちょっと高級そうにも見える。

Too useful.

だから一度、意地悪な実験をしてみる。

Take one UI and remove every border. 背景色も消す。Card shadowも消す。残すのはtext、button、そしてspacingだけ。

すると妙なことが起きる。

**The groups are still there.**

「名前」と「山田太郎」は一組に見えるし、「メールアドレス」と「taro@example.com」も一組に見える。ボタンが少し離れていれば、「ここから操作」という別のまとまりにも見える。

枠がないのに、境界がある。

何が境界を作っているのか。

The answer was the place where nothing was placed.

## 1. 今日のテーマ｜Whitespaceは空白ではなく、関係を書く

今回扱うのはGestalt psychologyの**Principle of Proximity（近接の原則）**。

In short、

> **近いものは、同じまとまりに見えやすい。**

という知覚の傾向だ。

However「近いものは仲間」という一行だけ覚えると、急にデザインTipsになる。

今回やりたいのはone level deeper。

なぜ余白は、何も描かれていないのに意味を持てるのか。

そしてUIでは、spacingを「8px / 16px / 24pxの数字」ではなく、**relationship strengthを表すinformation**として設計できるのか。

## 2. FACT｜人は最初から「バラバラの点」として見ていない

Gestalt心理学者Max Wertheimerは1923年の論文「Laws of Organization in Perceptual Forms」で、視野に入るものが単なる刺激の集合として知覚されるわけではなく、まとまりを持って組織されて見えることを論じた。

英訳の冒頭では、窓から家・木・空を見る例が出てくる。

理屈の上では無数の明るさや色の差に分解できる。しかし実際には、私たちは「327個の色の断片」を先に見るのではない。

**家、木、空を見る。**

Source: https://psychclassics.yorku.ca/Wertheimer/Forms/forms

その後Wertheimerは、点や線の配置において、より小さい間隔を持つ要素同士が自然なまとまりとして現れる現象を扱っている。

ここまではhistorical / psychologicalな**事実**。

ここからUIへ持ち込むのはdesign**解釈**だ。

画面上の余白は、単に「要素が存在しない場所」ではなく、

> ここまでは一つの話です。
>
> ここから別の話です。

という構造情報として働く。

つまり、Whitespace is not absence.

**関係を伝えるために、何も置かない。**

It is a strange idea.

## 3. EXPERIMENT｜全部24pxにすると、整うのに意味が薄くなる

Imagine a match-information card.

要素は5つ。

~~~text
MATCH INFO
10/3 SAT · 19:00
KASHIMA ANTLERS
SAITAMA STADIUM
BUY TICKETS
~~~

First、全部のspacingを24pxにする。

~~~text
MATCH INFO
   24
10/3 SAT · 19:00
   24
KASHIMA ANTLERS
   24
SAITAMA STADIUM
   24
BUY TICKETS
~~~

It looks neat.

Spacing tokenも統一されている。

しかし、知覚上は妙なことになる。

**Equal distance implies equal relationship.**

タイトルと日時の関係も、日時と対戦相手の関係も、会場とCTAの関係も、全部「24pxぶんの関係」。

Next、meaningに合わせてdistanceを変える。

~~~text
MATCH INFO
   8
10/3 SAT · 19:00
   8
KASHIMA ANTLERS
   8
SAITAMA STADIUM

   32

BUY TICKETS
~~~

すると、急に

~~~text
[見出し＋試合情報]

[CTA]
~~~

という二つのまとまりが見えてくる。

同じ要素。同じ文字。同じ色。

Changed only**何もない場所の量**だけ。

![Equal spacingとSemantic spacingの比較](https://raw.githubusercontent.com/silovar-uk/myessays/main/assets/design-literacy-proximity-whitespace/semantic-spacing.svg)

*Figure: すべて24pxで揃えた場合と、関連度に応じて8px / 32pxを使い分けた場合。Original diagram for this article.*

Here、「Spacing Scale」と「Semantic Spacing」の違いが見えてくる。

~~~text
Spacing Scale
4 / 8 / 16 / 24 / 32
= 使える数字の体系

Semantic Spacing
related / section / separate
= その数字が担う意味
~~~

A tidy scale does not automatically create information architecture.

## 4. VISUAL｜枠線を消しても構造が残るか

もう一つexperimentする。

フォームをカードで区切る。

### Before

~~~text
┌─────────────────────┐
│ 名前                │
│ 山田太郎            │
└─────────────────────┘

┌─────────────────────┐
│ メールアドレス      │
│ taro@example.com    │
└─────────────────────┘

┌─────────────────────┐
│ 変更を保存          │
└─────────────────────┘
~~~

Clear enough.

でも情報のまとまりを示すために、border、background、radius、paddingと大量の視覚記号を使っている。

Remove all of them.

### After

~~~text
名前
山田太郎

メールアドレス
taro@example.com


変更を保存
~~~

ラベルと値は近く、次の項目との間は少し広い。操作ボタンはさらに離す。

The structure largely survives.

Here、重要なのは、

> **カードを使うな。**

ではない。

カードには共通領域を示したり、クリック可能範囲を明示したり、背景上でまとまりを守ったりする役割がある。

The better question is、

> **カードを使う前に、spacingだけでどこまで構造を伝えられているか。**

ということだ。

Organize relationships before adding decoration.

## 5. Before → After｜「余白を増やす」を制作指示に変換する

「余白を増やしてください」は、Useful, but vague.

たとえば、

> このあたり、もうちょっと空けてください。

だけだと、制作者は24pxを32pxにするかもしれない。

でも本当の問題が、

> 見出しと本文は一組に見せたいが、次のセクションとは別に見せたい。

なら、必要なのは単純な増量ではない。

### Before

~~~text
H2
16px
本文
16px
H2
16px
本文
~~~

### After

~~~text
H2
8px
本文

32px

H2
8px
本文
~~~

制作指示はこう変えられる。

> **「余白を均等に増やすのではなく、見出しと対応する本文は近づけ、次セクションとの間隔を明確に広げてください。枠線や背景色を外してもセクション構造が読めるspacing hierarchyを作ってください。」**

Now the maker knows both what to change and why.

## 6. ACCESSIBILITY｜余白は「高級感」のためだけではない

Here、は笑いを止める。

W3C WAIのCognitive Accessibility向け補足ガイダンス「Use White Spacing」は、Whitespaceを使ってobjectsやtext、headings、content blocksを分離し、各sectionを明確にすることを勧めている。

またWhitespaceがclutterを減らし、ページのoverview、navigation、readingを助けると説明している。

Source: https://www.w3.org/WAI/WCAG2/supplemental/patterns/o3p10-whitespace/

One important nuance.

これはWCAGの達成基準そのものではなく、**Supplemental Guidance**だ。つまり「このspacing値ならWCAG合格」という規格ではない。

Still、design implicationは強い。

さらにW3Cの「Designing for Web Accessibility」でも、関連contentをheadingsとspacingでgroupingし、WhitespaceとProximityで関係を明確にすることが推奨されている。

Source: https://www.w3.org/WAI/tips/designing/

Whitespace is not only luxury styling.

**It can also be a comprehension aid.**

## 7. HISTORY｜Gestaltを「UIの法則」に縮めすぎない

Gestaltという言葉は、UI記事ではしばしば

~~~text
Proximity
Similarity
Closure
Common Region
...
~~~

というチェックリストで出てくる。

Useful in practice.

But historically、それだけに縮めると少し雑になる。

Wertheimerたちが扱っていたのは「カードUIをどう配置するか」ではなく、**人間の知覚がどのように全体を組織して経験するのか**という、もっと根本的な問題だった。

1923年の論文を読んで面白いのは、

> 「点が近いとgroupになる」

というルールそのものより、

> **そもそも私たちは、世界をバラバラの要素から後で組み立てているわけではないらしい。**

という出発点だ。

When modern UI uses Proximity、このlarger ideaを忘れない方がいい。

Designerがgroupをゼロから作っているというより、**人間がgroupを見つけてしまう知覚の性質に、画面側を合わせている**。

## 8. MISUNDERSTANDING｜近いほど仲良し、では終わらない

Proximity is powerful, but not sovereign.

Nielsen Norman Groupは、ProximityがcolorやshapeなどSimilarityの手がかりより強く働くことがあると説明している。

Source: https://www.nngroup.com/articles/gestalt-proximity/

However「常にProximityが勝つ」という意味ではない。

実際の画面では、距離、色、形、囲み、線、alignmentなど複数のgrouping cueが同時に働く。

![ProximityとSimilarityが競合する模式図](https://raw.githubusercontent.com/silovar-uk/myessays/main/assets/design-literacy-proximity-whitespace/proximity-vs-similarity.svg)

*Figure: 距離は左右のgroupを作り、色・形は別の横断的groupを作ろうとする。Original diagram for this article.*

たとえばDangerous action。

~~~text
[削除] [保存]
~~~

同じ形、同じ色、近い距離。

三つのcueすべてが「この二つは同類」と言っている。

しかし意味としては、片方は破壊的だ。

だから、

- 距離を少し離す
- 色やstyleを変える
- placementを変える
- confirmationを入れる

など、複数のcueを調整する。

**Do not ask spacing to solve every meaning problem by itself.**

## 9. CONNECTION｜数字のデザインから、意味のデザインへ

ここ数回のDesign Literacyをつなげる。

~~~text
#53
「3列」はresultかもしれない
↓
minimum widthというconstraintへ

#54
「240px」もresultかもしれない
↓
content自身が持つintrinsic sizeへ

#55
「24px」もただの数字ではない
↓
relationshipを表すsemantic spacingへ
~~~

The common movement is、

> **数字を先に置くのではなく、その数字が何を守っているかを見る。**

という方向だ。

Design Tokenでも同じことが起きる。

~~~text
space-1 = 4
space-2 = 8
space-3 = 16
space-4 = 24
~~~

だけなら、Scaleである。

そこに、

~~~text
tight
related
section
separate
~~~

という役割を考えると、Tokenが**意味**を持ち始める。

もちろんImplementation still ends up in 4px or 8px.

But the review conversation changes.

> 「24pxにしましょう」

から、

> **「これは同一group内のspacingですか、それともgroup間のspacingですか？」**

へ。

This is today’s higher-resolution connection.

## 10. PRODUCTION｜そのまま使える制作・修正指示

For production、次の指示が強い。

> **関連する要素は近づけ、別groupとの間隔を明確に広げてください。全要素を同じspacing tokenで均等配置せず、まず枠線・背景色・shadowを外した状態でも情報構造が読めるspacing hierarchyを作り、その後必要な装飾だけを戻してください。**

Design System寄りなら、

> **Spacing tokenを数値scaleだけで定義せず、related / section / separateなど意味上の用途を整理し、同じ数値が異なる意味で乱用されていないか確認してください。**

For review、

> **「この余白は、何と何を仲間にするための余白ですか？」**

でいい。

## 11. PRACTICE｜30秒のBlur Test

Open any website.

Squint your eyes.

あるいはスクリーンショットを少しblurさせる。

Stop reading the words and look only at visual masses.

~~~text
■■■■

■■
■■■


■■■■■■
~~~

Ask one question.

> **どこからどこまでが、一つのgroupに見えるか。**

意図した情報構造と一致していれば、spacingが仕事をしている。

全部ひと塊なら、group間の差が弱い。

全部バラバラなら、group内の距離が遠すぎるかもしれない。

文字を読まないと構造が分からない画面は、文字以外の視覚情報があまり働いていない可能性がある。

## 12. NEXT｜Similarity──距離ではなく「見た目」で仲間を作る

Next is**Similarity（類同）**。

同じ色、同じ形、同じ大きさ、同じstyleのものは、離れていても関連して見えやすい。

Proximityが、

> **距離で関係を書く**

なら、

Similarityは、

> **見た目で関係を書く。**

The practical question that follows is pretty interesting.

> なぜ全部のリンクを青くすると分かりやすいのに、全部のUIを同じ青にすると逆に分かりにくくなるのか。

Next、ProximityとSimilarityがcooperateするとき、そしてfightするときを見る。

## 13. 今日の中心命題

> **Whitespace is a relationship, not a remainder.**

Whitespace is not what remains after placing elements.

何も置いていないのに、

> ここは同じ話。
>
> ここから別の話。

と喋ることができる。

Before researching、 「余白を増やす」は画面をcleanerにする操作に見えていた。

After researching、it looks slightly different.

**余白を変えるということは、要素同士の関係を書き換えることでもある。**

だから8pxを16pxに変えるのは、単なる2倍ではない。

場合によっては、

> 「この二つは一組です」

を、

> 「この二つは別々です」

へ変えてしまう。

Nothing is surprisingly talkative.

## 14. Sources

- Max Wertheimer, “Laws of Organization in Perceptual Forms” (1923; English translation in Ellis, 1938)  
  https://psychclassics.yorku.ca/Wertheimer/Forms/forms
- Nielsen Norman Group, “Proximity Principle in Visual Design”  
  https://www.nngroup.com/articles/gestalt-proximity/
- W3C WAI, “Cognitive Accessibility Design Pattern: Use White Spacing”  
  https://www.w3.org/WAI/WCAG2/supplemental/patterns/o3p10-whitespace/
- W3C WAI, “Designing for Web Accessibility – Tips for Getting Started”  
  https://www.w3.org/WAI/tips/designing/
