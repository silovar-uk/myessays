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
abstract: 「余白を増やしてください」というdesign review languageを本気で疑う。Why can we still see groups after borders, backgrounds, and shadows disappear? Max Wertheimerの1923年のGestalt研究、modern UIのProximity、W3Cのcognitive accessibility guidanceをたどり、whitespaceを「leftover space」ではなくrelationshipとboundaryを書くinformationとして捉え直す。
---

# 枠線を全部消したのに、なぜまだグループが見えるのか？

Design reviewには、extremely convenientな言葉がある。

> **「もう少し余白を増やしてください」**

Most of the time、something gets better.

窮屈だった画面にairが入り、copy is easier to scan、そして少しpremiumにも見える。

Too useful.

だから一度、意地悪なexperimentをする。

Take one interface and remove every border. Remove the background fills. Remove card shadows. Keep only text, buttons, and distance.

すると妙なことが起きる。

**The groups are still there.**

「名前」と「山田太郎」はone pairに見える。「メールアドレス」と「taro@example.com」もone pairに見える。A button placed farther away feels like another functional group.

There is no line, but there is still a boundary.

What created it?

何も置かれていない場所だった。

## 1. 今日のテーマ｜Whitespaceは空白ではなく、関係を書く

今回扱うのはGestalt psychologyの**Principle of Proximity（近接の原則）**。

In short:

> **Things placed close together tend to be perceived as belonging together.**

ただし、このone-linerだけ覚えると、すぐDesign Tipsになる。

今回見たいのはone level deeper.

Why can “nothing” communicate structure? そしてUIでは、spacingを「8 / 16 / 24pxのnumbers」ではなく、**relationship strengthを表すinformation**として設計できるのか。

## 2. FACT｜人は最初から「バラバラの点」として見ていない

Gestalt psychologist Max Wertheimerは1923年の論文 “Laws of Organization in Perceptual Forms” で、our visual field is not simply experienced as a pile of independent stimuli; it appears organized into meaningful wholes.

英訳の冒頭には、windowからhouse、trees、skyを見るexampleが出てくる。

In theory、you could break the scene into hundreds of brightnesses and color nuances. But you do not first experience “327 fragments.”

**You see sky, house, and trees.**

Source: https://psychclassics.yorku.ca/Wertheimer/Forms/forms

Wertheimer then discusses arrangements in which elements with smaller spatial intervals naturally form groups.

ここまではhistorical / psychological **fact**。

UIへ持ち込むところからは**design interpretation**だ。

Whitespace can act as structural information:

> this belongs together.
>
> this starts a different thing.

Whitespace is not absence.

**Sometimes we communicate by deliberately placing nothing.**

## 3. EXPERIMENT｜全部24pxにすると、整うのに意味が薄くなる

Imagine a match-information card.

~~~text
MATCH INFO
10/3 SAT · 19:00
KASHIMA ANTLERS
SAITAMA STADIUM
BUY TICKETS
~~~

First、put 24px between everything.

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

Spacing tokens are beautifully consistent.

でもperceptionとしては妙だ。

**Equal distance implies equal relationship.**

The title-to-date relationship, date-to-opponent relationship, venue-to-CTA relationship — all become “24px relationships.”

次に、meaningに応じてdistanceを変える。

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

Now two groups emerge.

~~~text
[Heading + match information]

[CTA]
~~~

Same text. Same color. Same elements.

Only the amount of “nothing” changed.

![Equal spacingとSemantic spacingの比較](https://raw.githubusercontent.com/silovar-uk/myessays/main/assets/design-literacy-proximity-whitespace/semantic-spacing.svg)

*Figure: すべて24pxで揃えたcaseと、relationshipに応じて8px / 32pxを使い分けたcase。Original diagram for this article.*

This reveals the difference between a **Spacing Scale** and **Semantic Spacing**.

~~~text
Spacing Scale
4 / 8 / 16 / 24 / 32
= available values

Semantic Spacing
related / section / separate
= meaning carried by those values
~~~

A tidy scale does not automatically create information architecture.

## 4. VISUAL｜枠線を消しても構造が残るか

もう一つexperimentする。

Start with a form separated into cards.

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

But the interface uses border, background, radius, and padding to explain grouping.

Remove all of them.

### After

~~~text
名前
山田太郎

メールアドレス
taro@example.com


変更を保存
~~~

Label and value are close. The next field is farther away. The save action is farther still.

The structure largely survives.

重要なのは、

> **Never use cards.**

ではない。

Cards can signal common region, create clickable surfaces, protect grouping against busy backgrounds, and support interaction.

The better question is:

> **Before adding a card, how much structure can spacing already communicate?**

関係を先に整理し、decorationは必要な分だけ足す。

## 5. Before → After｜「余白を増やす」を制作指示に変換する

“Add more whitespace” is useful but vague.

If the real problem is:

> heading and paragraph should feel like one unit, while the next section should feel separate,

then simply increasing everything is wrong.

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

This tells the maker not only what to change, but why.

## 6. ACCESSIBILITY｜余白は「高級感」のためだけではない

ここではjokesを止める。

W3C WAIのCognitive Accessibility向けsupplemental guidance “Use White Spacing” recommends using whitespace around objects, text, headings, and blocks so sections are clearly separated.

It also explains that whitespace can reduce clutter and support overview, navigation, and reading.

Source: https://www.w3.org/WAI/WCAG2/supplemental/patterns/o3p10-whitespace/

Important nuance: this is **Supplemental Guidance**, not a normative WCAG success criterion. It does not mean “32px spacing = WCAG compliant.”

それでもdesign implicationは大きい。

W3Cの “Designing for Web Accessibility” でも、headings and spacingによってrelated contentをgroupし、Whitespace and Proximityでrelationshipsを明確にすることが勧められている。

Source: https://www.w3.org/WAI/tips/designing/

Whitespace is not only luxury styling.

**It can be a comprehension aid.**

## 7. HISTORY｜Gestaltを「UIの法則」に縮めすぎない

In modern UX writing、Gestalt is often presented as a checklist:

~~~text
Proximity
Similarity
Closure
Common Region
...
~~~

That is useful for practice.

But historically、それだけに縮めると少し雑になる。

Wertheimerたちが扱っていたのはcard UIではない。They were asking a more fundamental question: **how does human perception organize experience into wholes?**

1923年の論文がおもしろいのは、

> near things group together

というruleだけではない。

The deeper starting point is:

> **we do not seem to experience the world as isolated pieces first and assemble meaning later.**

So when modern designers use Proximity, we are not “inventing” groups from zero.

We are designing with the fact that people are already looking for organization.

## 8. MISUNDERSTANDING｜近いほど仲良し、では終わらない

Proximity is powerful, but not sovereign.

Nielsen Norman Group notes that proximity can sometimes overpower competing cues such as color or shape similarity.

Source: https://www.nngroup.com/articles/gestalt-proximity/

That does not mean it always wins.

Real interfaces contain several grouping cues at once: distance, color, shape, common region, connecting lines, alignment.

![ProximityとSimilarityが競合する模式図](https://raw.githubusercontent.com/silovar-uk/myessays/main/assets/design-literacy-proximity-whitespace/proximity-vs-similarity.svg)

*Figure: Distance says left/right groups; color and shape suggest another cross-cutting relationship. Original diagram for this article.*

Consider destructive actions.

~~~text
[削除] [保存]
~~~

Same shape, same color, very close.

All cues say “these are peers.”

But semantically, one is destructive.

だからdesigner may separate them spatially, style them differently, change placement, or add confirmation.

**Do not ask spacing to solve every meaning problem by itself.**

## 9. CONNECTION｜数字のデザインから、意味のデザインへ

ここ数回をつなげる。

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

The common movement is:

> **Do not begin with the number. Ask what the number is protecting.**

The same applies to Design Tokens.

~~~text
space-1 = 4
space-2 = 8
space-3 = 16
space-4 = 24
~~~

This is a scale.

Add roles such as:

~~~text
tight
related
section
separate
~~~

and the system starts carrying semantics.

Implementation still ends up in pixels.

But the design conversation changes from:

> “Make it 24px.”

to:

> **“Is this spacing inside one group, or between groups?”**

これが今回の「前より解像度が上がる接続」。

## 10. PRODUCTION｜そのまま使える制作・修正指示

実務では、この指示が使える。

> **関連する要素は近づけ、別groupとの間隔を明確に広げてください。全要素を同じspacing tokenで均等配置せず、まず枠線・背景色・shadowを外した状態でも情報構造が読めるspacing hierarchyを作り、その後必要な装飾だけを戻してください。**

For Design Systems:

> **Spacing tokenを数値scaleだけで定義せず、related / section / separateなど意味上の用途を整理し、同じ数値が異なる意味で乱用されていないか確認してください。**

And for review:

> **“What relationship is this whitespace supposed to communicate?”**

## 11. PRACTICE｜30秒のBlur Test

Open any website.

Squint your eyes. Or blur a screenshot slightly.

Stop reading text and look only at visual masses.

~~~text
■■■■

■■
■■■


■■■■■■
~~~

Ask one question:

> **Where does one group end and another begin?**

If the answer matches the intended information structure, spacing is doing useful work.

If everything becomes one blob、group separation is too weak.

If every item floats alone、internal relationships may be too loose.

A screen that only reveals its structure after reading every word may not be using visual grouping very effectively.

## 12. NEXT｜Similarity──距離ではなく「見た目」で仲間を作る

Next is **Similarity（類同）**.

Same color, same shape, same size, same style can make things feel related even when they are separated.

Proximity says:

> **write relationships with distance.**

Similarity says:

> **write relationships with appearance.**

From there comes a useful UI question:

> Why does making all links blue improve clarity, while making every interactive thing the exact same blue can sometimes destroy hierarchy?

次は、ProximityとSimilarityがcooperateするとき、そしてfightするときを見る。

## 13. 今日の中心命題

> **Whitespace is a relationship, not a remainder.**

Whitespace is not what is left after placing objects.

Even while containing nothing, it can say:

> these belong together.
>
> this begins something else.

調べる前、「余白を増やす」は画面をcleanerにする操作に見えていた。

After looking at Gestalt grouping、it looks slightly different.

**Changing whitespace can change the relationship itself.**

So changing 8px to 16px is not always “double the space.”

Sometimes it quietly rewrites:

> “these are one unit”

into:

> “these are separate things.”

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
