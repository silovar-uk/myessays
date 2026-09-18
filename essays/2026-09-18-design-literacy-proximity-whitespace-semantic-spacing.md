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
abstract: 「余白を増やしてください」という指示を本気で疑う。なぜ枠線も背景色もないのに、人は画面の中にグループを見つけられるのか。Max Wertheimerの1923年のGestalt研究、現代UIのProximity、W3Cの認知アクセシビリティ資料をたどり、余白を「残った空間」ではなく関係と境界を書く情報として捉え直す。
---

# 枠線を全部消したのに、なぜまだグループが見えるのか？

Webデザインのレビューで、かなり便利な言葉がある。

> **「もう少し余白を増やしてください」**

たいてい、何かしら良くなる。

窮屈だった画面に空気が入り、文字が読みやすくなり、ちょっと高級そうにも見える。

便利すぎる。

だから一度、意地悪な実験をしてみる。

あるUIから、罫線を全部消す。背景色も消す。カードの影も消す。残すのは文字とボタンと、要素の間隔だけ。

すると妙なことが起きる。

**まだグループが見える。**

「名前」と「山田太郎」は一組に見えるし、「メールアドレス」と「taro@example.com」も一組に見える。ボタンが少し離れていれば、「ここから操作」という別のまとまりにも見える。

枠がないのに、境界がある。

何が境界を作っているのか。

答えは、何も置かれていない場所だった。

## 1. 今日のテーマ｜Whitespaceは空白ではなく、関係を書く

今回扱うのはGestalt心理学の**Principle of Proximity（近接の原則）**。

ざっくり言えば、

> **近いものは、同じまとまりに見えやすい。**

という知覚の傾向だ。

ただし「近いものは仲間」という一行だけ覚えると、急にデザインTipsになる。

今回やりたいのはその一段奥。

なぜ余白は、何も描かれていないのに意味を持てるのか。

そしてUIでは、余白を「8px / 16px / 24pxの数字」ではなく、**関係の強さを表す情報**として設計できるのか。

## 2. FACT｜人は最初から「バラバラの点」として見ていない

Gestalt心理学者Max Wertheimerは1923年の論文「Laws of Organization in Perceptual Forms」で、視野に入るものが単なる刺激の集合として知覚されるわけではなく、まとまりを持って組織されて見えることを論じた。

英訳の冒頭では、窓から家・木・空を見る例が出てくる。

理屈の上では無数の明るさや色の差に分解できる。しかし実際には、私たちは「327個の色の断片」を先に見るのではない。

**家、木、空を見る。**

Source: https://psychclassics.yorku.ca/Wertheimer/Forms/forms

その後Wertheimerは、点や線の配置において、より小さい間隔を持つ要素同士が自然なまとまりとして現れる現象を扱っている。

ここまでは歴史的・心理学的な**事実**。

ここからUIへ持ち込むのは**解釈**だ。

画面上の余白は、単に「要素が存在しない場所」ではなく、

> ここまでは一つの話です。
>
> ここから別の話です。

という構造情報として働く。

つまり、Whitespaceは無ではない。

**関係を伝えるために、何も置かない。**

妙な話だ。

## 3. EXPERIMENT｜全部24pxにすると、整うのに意味が薄くなる

試合情報のカードを作る。

要素は5つ。

~~~text
MATCH INFO
10/3 SAT · 19:00
KASHIMA ANTLERS
SAITAMA STADIUM
BUY TICKETS
~~~

まず、全部の間隔を24pxにする。

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

きれいだ。

Spacing tokenも統一されている。

しかし、知覚上は妙なことになる。

**全部が同じ距離なので、全部が同じ関係に見える。**

タイトルと日時の関係も、日時と対戦相手の関係も、会場とCTAの関係も、全部「24pxぶんの関係」。

そこで次は、意味に合わせて変える。

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

変えたのは**何もない場所の量**だけ。

![Equal spacingとSemantic spacingの比較](https://raw.githubusercontent.com/silovar-uk/myessays/main/assets/design-literacy-proximity-whitespace/semantic-spacing.svg)

*Figure: すべて24pxで揃えた場合と、関連度に応じて8px / 32pxを使い分けた場合。Original diagram for this article.*

ここで「Spacing Scale」と「Semantic Spacing」の違いが見えてくる。

~~~text
Spacing Scale
4 / 8 / 16 / 24 / 32
= 使える数字の体系

Semantic Spacing
related / section / separate
= その数字が担う意味
~~~

数字を統一するだけでは、情報構造はできない。

## 4. VISUAL｜枠線を消しても構造が残るか

もう一つ実験する。

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

分かりやすい。

でも情報のまとまりを示すために、border、background、radius、paddingと大量の視覚記号を使っている。

全部消す。

### After

~~~text
名前
山田太郎

メールアドレス
taro@example.com


変更を保存
~~~

ラベルと値は近く、次の項目との間は少し広い。操作ボタンはさらに離す。

これだけでもかなり構造は残る。

ここで重要なのは、

> **カードを使うな。**

ではない。

カードには共通領域を示したり、クリック可能範囲を明示したり、背景上でまとまりを守ったりする役割がある。

先に問いたいのは、

> **カードを使う前に、spacingだけでどこまで構造を伝えられているか。**

ということだ。

装飾を足す前に、関係を整理する。

## 5. Before → After｜「余白を増やす」を制作指示に変換する

「余白を増やしてください」は、便利だが曖昧だ。

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

これなら、「どこを」「なぜ」変えるかが分かる。

## 6. ACCESSIBILITY｜余白は「高級感」のためだけではない

ここでは笑いを止める。

W3C WAIのCognitive Accessibility向け補足ガイダンス「Use White Spacing」は、Whitespaceを使ってobjectsやtext、headings、content blocksを分離し、各sectionを明確にすることを勧めている。

またWhitespaceがclutterを減らし、ページのoverview、navigation、readingを助けると説明している。

Source: https://www.w3.org/WAI/WCAG2/supplemental/patterns/o3p10-whitespace/

重要な注意が一つある。

これはWCAGの達成基準そのものではなく、**Supplemental Guidance**だ。つまり「このspacing値ならWCAG合格」という規格ではない。

それでも設計上の示唆は強い。

さらにW3Cの「Designing for Web Accessibility」でも、関連contentをheadingsとspacingでgroupingし、WhitespaceとProximityで関係を明確にすることが推奨されている。

Source: https://www.w3.org/WAI/tips/designing/

余白は高級感の演出だけではない。

**理解の補助線でもある。**

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

実務では便利だ。

ただし、歴史をそれだけに縮めると少し雑になる。

Wertheimerたちが扱っていたのは「カードUIをどう配置するか」ではなく、**人間の知覚がどのように全体を組織して経験するのか**という、もっと根本的な問題だった。

1923年の論文を読んで面白いのは、

> 「点が近いとgroupになる」

というルールそのものより、

> **そもそも私たちは、世界をバラバラの要素から後で組み立てているわけではないらしい。**

という出発点だ。

現代UIでProximityを使うときも、この大きい話を忘れない方がいい。

Designerがgroupをゼロから作っているというより、**人間がgroupを見つけてしまう知覚の性質に、画面側を合わせている**。

## 8. MISUNDERSTANDING｜近いほど仲良し、では終わらない

Proximityは強力だが、万能ではない。

Nielsen Norman Groupは、ProximityがcolorやshapeなどSimilarityの手がかりより強く働くことがあると説明している。

Source: https://www.nngroup.com/articles/gestalt-proximity/

ただし「常にProximityが勝つ」という意味ではない。

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

**Spacingだけで全部を解決しようとしない。**

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

共通しているのは、

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

もちろん実装上は最終的に4pxや8pxへ落ちる。

でもレビュー時の会話が変わる。

> 「24pxにしましょう」

から、

> **「これは同一group内のspacingですか、それともgroup間のspacingですか？」**

へ。

これが今回の「前より解像度が上がる接続」だ。

## 10. PRODUCTION｜そのまま使える制作・修正指示

実務でそのまま使うなら、次の指示が強い。

> **関連する要素は近づけ、別groupとの間隔を明確に広げてください。全要素を同じspacing tokenで均等配置せず、まず枠線・背景色・shadowを外した状態でも情報構造が読めるspacing hierarchyを作り、その後必要な装飾だけを戻してください。**

Design System寄りなら、

> **Spacing tokenを数値scaleだけで定義せず、related / section / separateなど意味上の用途を整理し、同じ数値が異なる意味で乱用されていないか確認してください。**

レビュー時の一言なら、

> **「この余白は、何と何を仲間にするための余白ですか？」**

でいい。

## 11. PRACTICE｜30秒のBlur Test

好きなWebサイトを開く。

目を細める。

あるいはスクリーンショットを少しblurさせる。

文字を読まず、画面をただの塊として見る。

~~~text
■■■■

■■
■■■


■■■■■■
~~~

そして一つだけ確認する。

> **どこからどこまでが、一つのgroupに見えるか。**

意図した情報構造と一致していれば、spacingが仕事をしている。

全部ひと塊なら、group間の差が弱い。

全部バラバラなら、group内の距離が遠すぎるかもしれない。

文字を読まないと構造が分からない画面は、文字以外の視覚情報があまり働いていない可能性がある。

## 12. NEXT｜Similarity──距離ではなく「見た目」で仲間を作る

次につながるのは**Similarity（類同）**。

同じ色、同じ形、同じ大きさ、同じstyleのものは、離れていても関連して見えやすい。

Proximityが、

> **距離で関係を書く**

なら、

Similarityは、

> **見た目で関係を書く。**

ここから出てくる実務上の問いはかなり面白い。

> なぜ全部のリンクを青くすると分かりやすいのに、全部のUIを同じ青にすると逆に分かりにくくなるのか。

次は、ProximityとSimilarityが協力するとき、喧嘩するときを見る。

## 13. 今日の中心命題

> **Whitespace is a relationship, not a remainder.**

余白は、要素を置いたあとに残った場所ではない。

何も置いていないのに、

> ここは同じ話。
>
> ここから別の話。

と喋ることができる。

調べる前、「余白を増やす」は画面をきれいにする操作に見えていた。

調べた後は、少し違って見える。

**余白を変えるということは、要素同士の関係を書き換えることでもある。**

だから8pxを16pxに変えるのは、単なる2倍ではない。

場合によっては、

> 「この二つは一組です」

を、

> 「この二つは別々です」

へ変えてしまう。

何もない場所は、思っていたよりかなり喋る。

## 14. Sources

- Max Wertheimer, “Laws of Organization in Perceptual Forms” (1923; English translation in Ellis, 1938)  
  https://psychclassics.yorku.ca/Wertheimer/Forms/forms
- Nielsen Norman Group, “Proximity Principle in Visual Design”  
  https://www.nngroup.com/articles/gestalt-proximity/
- W3C WAI, “Cognitive Accessibility Design Pattern: Use White Spacing”  
  https://www.w3.org/WAI/WCAG2/supplemental/patterns/o3p10-whitespace/
- W3C WAI, “Designing for Web Accessibility – Tips for Getting Started”  
  https://www.w3.org/WAI/tips/designing/
