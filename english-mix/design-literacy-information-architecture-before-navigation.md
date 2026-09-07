---
id: design-literacy-information-architecture-before-navigation
title: "Before You Fix the Menu, Question the Floor Plan――Information Architecture"
subtitle: "Design Literacy #24｜見せ方の前にdesign the address of information"
abstract: "『このページ、どこに置く？』という小さな迷いから、Information Architectureをmenu cleanupではなく、relationships, categories, labelsを設計する問題として捉え直す。サッカークラブのサイトを題材に、internal organization / objects / user goalsという3種類の分類を比較し、Card SortingとTree Testingの役割も整理する。Richard Saul Wurmanの歴史的なInformation Architectという語にも触れながら、現代UIで使えるreview questionへ戻す。"
---

# Before You Fix the Menu, Question the Floor Plan――Information Architecture
## Design Literacy #24｜見せ方の前にdesign the address of information

「このページ、どこに置きます？」

This question appears all the time in website redesigns.

「お知らせ？」

「サービス？」

「サポート？」

And when nobody can decide, the final weapon appears.

**その他。 Other.**

“Other” is incredibly convenient for the person organizing the site.

But a drawer that accepts everything usually becomes a drawer nobody wants to open later.

今回はmenu stylingの前に、**where information should live**を考える。

## 1. まず一言：Navigation is not Information Architecture

**Don’t organize the menu. Organize the information first.**

昨日のVisual Hierarchyでは、

```text
What should be seen first, second, and third?
```

を考えた。

Today we move one step backward.

```text
Information Architecture
What belongs with what?

Navigation
How can people move through that structure?

Visual Hierarchy
What should feel primary on this screen?
```

Nielsen Norman Group distinguishes Information Architecture from a sitemap. A sitemap is one representation of hierarchy and organization. IA also involves structure, nomenclature, labels, and research around findability and discoverability.

[NN/g — Information Architecture vs. Sitemaps](https://www.nngroup.com/articles/information-architecture-sitemaps/)

So rearranging items inside a hamburger menu may be part of IA, but it is not the whole problem.

You may be moving the doorknobs around inside a bad floor plan.

## 2. 同じ7項目を3通りに分類する

Imagine a football club website with these seven items.

```text
試合日程
チケット
スタジアムアクセス
座席案内
グッズ
ファンクラブ
イベント
```

Keep the content exactly the same. Change only the organizing principle.

### A. Internal organization

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

Internally, this is clean.

Ownership is obvious.

But for a first-time visitor, it becomes a quiz about somebody else’s org chart.

### B. Objects

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

This feels more natural.

However, the single user goal “初めて試合へ行く” is still split across categories.

### C. User goals

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

Now the organizing axis is not the object. It is the action.

There is no universal winner here.

The important point is this:

**Same information, different architecture, different meaning.**

**OBSERVATION**

情報量は一文字も減っていないのに、Cではnext actionが読み取りやすい。

**INTERPRETATION**

IA becomes useful when we stop treating it as storage and start treating it as a hypothesis about **what users expect to belong together**.

## 3. 「ユーザーにとって自然」はintuitionだけで決めない

Dangerous sentence:

> ユーザー目線で分類しましょう。

Sounds great.

But do users really create a category called「スタジアムへ行く」?

This is where **Card Sorting** and **Tree Testing** become useful.

NN/g describes Card Sorting as a generative method: participants group representative content and often name those groups, helping reveal possible mental models. Tree Testing does something different: given a proposed hierarchy, users try to locate specific information so the team can evaluate findability.

[NN/g — Tree Testing: Evaluate Menu Labels and Categories](https://www.nngroup.com/articles/tree-testing/)

A practical sequence looks like this.

```text
Find current navigation failures
↓
Card Sorting
Explore possible groupings
↓
Build an IA candidate
↓
Tree Testing
Can people actually find things?
↓
Design Navigation / UI
```

A surprising amount of UX work can happen before any polished interface exists.

That is useful, because changing a tree is cheaper than rebuilding a finished house.

## 4. 「その他」が妙に怖い理由

Return to the final weapon.

**Other.**

NN/g notes a funny mismatch in tree-testing guidance: during Card Sorting, participants may create a generic bucket for awkward items, but vague labels equivalent to “other stuff” perform badly as navigation because users hesitate to click them.

That is a beautiful little contradiction.

Users may create “Other” while organizing.

The same users may avoid “Other” while searching.

Convenient for the organizer, expensive for the finder.

## 5. Before → After：「メニューが分かりにくい」を分解する

### BEFORE

> メニューが分かりにくいので整理してください。

This can easily turn into shorter labels, reordered links, or visual restyling.

### AFTER

Break the problem into layers.

```text
STRUCTURE
Is the information in the right group?

LABEL
Can people predict what is inside?

PLACEMENT
Is it where they expect it?

NAVIGATION
Can they move to it?

VISUAL HIERARCHY
Can they understand current location and next action?
```

Now we can identify **which layer is broken before changing pixels**.

## 6. そのまま使える制作・修正指示

> **現在のメニュー項目をいったんUIから切り離し、ユーザーが達成したい目的と代表的なcontent itemを一覧化してください。社内部署や実装都合をそのままcategoryにせず、ユーザーが同じ仲間だと予測する単位でgroup候補を作ります。分類案は可能ならCard Sortingで探索し、主要taskをTree Testingしてfindabilityを確認した後に、labelとnavigation UIを設計してください。**

For review, one short question is powerful.

> **「この分類は、誰にとって自然ですか？」**

And another:

> **「UIを全部消して文字だけのtreeにしても、目的の情報へたどり着けますか？」**

If the structure only works after visual decoration, the problem may not be visual.

## 7. 歴史へ：Information Architecture existed before the Web

Richard Saul Wurman, trained as an architect and designer, has said that he used the term **Information Architect** in connection with the 1976 American Institute of Architects conference. Smithsonian Cooper Hewitt also describes him as the creator of the term “information architecture.”

[Richard Saul Wurman — Published Articles](https://www.wurman.com/publishedarticles)

[Smithsonian — Richard Saul Wurman / National Design Awards](https://www.si.edu/newsdesk/releases/cooper-hewitt-national-design-museum-announces-winners-13th-annual-national-design-awards)

Wurman talks about Information Architecture more broadly than website design: organization and structure that make complexity understandable.

But do not draw a fake straight line.

```text
1976 Wurman
↓
Modern Web IA magically appears
```

Humans were classifying information long before 1976 through libraries, maps, indexes, directories, signage, and encyclopedias.

**FACT**

Wurman is publicly documented as using/creating the term Information Architect / Information Architecture in this historical context.

**INTERPRETATION**

For contemporary UI, the architectural metaphor is useful because it shifts our attention from “menu component” to **an information space people must understand and move through**.

Architecture and the Web are not the same thing.

But the metaphor survives: **design the floor plan before polishing the door.**

## 8. 誤解しやすい点：Task-based IA is not always right

After this example, it is tempting to turn every category into a verb.

```text
買う
見る
行く
知る
楽しむ
```

That is another shortcut.

If users know a specific object or domain term, an object-based taxonomy may be easier to predict. If one item supports several goals, polyhierarchy, cross-links, and search may be necessary.

So this is not:

```text
Internal structure = bad
Task-based structure = good
```

The real question is whether the organizing principle matches user expectation well enough to support finding.

## 9. 前より解像度が上がる接続

The sequence now looks like this.

```text
#21 Optical Alignment
Where does the center feel like it is?

↓

#22 Visual Weight
What feels strong?

↓

#23 Visual Hierarchy
How do we organize that strength?

↓

#24 Information Architecture
What belongs together in the first place?
```

Yesterday we asked, “What is Primary?”

Today one more question appears before that.

> **Should this information even be on this screen, in this group, at this address?**

**You cannot fix bad information structure with bigger typography.**

This explains why some interfaces refuse to improve even after endless visual refinement.

## 10. 30秒でできる観察

Open an app or site you use often.

Pick three menu items.

Ignore the visual treatment and read only the labels.

Ask:

> **Why are these three things together?**

Try to answer using one axis.

- same object
- same task
- same context
- same internal organization

If you cannot state the axis, the menu is worth investigating.

## 次に覚える概念：Mental Model

We used the phrase “user expectation” again and again.

So the next question is obvious.

> **Where does that expectation come from?**

Next: **Mental Model**.

```text
System Model
How the product is actually structured

Mental Model
How the user believes it is structured
```

When these diverge, you get the strange class of problem where the button exists, the explanation is technically correct, and people still cannot find it.

Information Architecture → Mental Model turns classification from tidying into **designing for prediction**.

---

## 今日の中心命題

**Information Architecture begins before the interface.**

Before researching this, the obvious response to a confusing menu was “fix the menu.”

After researching it, there is one more suspect.

**Maybe the menu is fine. Maybe the floor plan is wrong.**
