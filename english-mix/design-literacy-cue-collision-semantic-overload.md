---
id: design-literacy-cue-collision-semantic-overload
title: "全部同じ青なのに、なぜ分かりにくいのか？"
subtitle: "English Mix｜Design Literacy #56｜Cue Collision and Semantic Overload"
created: "2026-09-18"
updated: "2026-09-18"
type: "English Mix"
status: "完成"
mode: "english-mix"
english_ratio: 0.45
mix_unit: "sentence"
series: "Design Literacy｜細部から思想まで"
seriesOrder: 56
abstract: "同じblueをlink, heading, selected state, CTA, decorationへ使うと、visual consistencyは高いのにmeaningが読みにくくなる。Similarityを復習で終わらせず、cue collisionという診断からWCAGとDon Normanのsignifierへ接続する。"
---

# 全部同じ青なのに、なぜ分かりにくいのか？
## English Mix｜Design Literacy #56｜Cue Collision and Semantic Overload

画面を「統一」した。Links are blue. Headings are blue. Selected states are blue. CTAs are blue. Brand decoration is blue.

かなりconsistentに見える。

And yet, the interface becomes harder to read.

今日の問いはこれ。

> **If everything looks consistent, does meaning also become consistent?**

前回までに、Proximityはdistanceでrelationshipをつくり、Similarityはshared visual propertiesによってgroupingを生みやすい、と見てきた。今回はSimilarityの再説明ではなく、**what happens when one visual cue is asked to mean too many things**を見る。

## 1. FACT｜Similarity does not literally mean “same behavior”

Max Wertheimer’s 1923 discussion of perceptual organization described the Factor of Similarity: like parts tend to group together perceptually.

Source: https://psychclassics.yorku.ca/Wertheimer/Forms/forms.htm

But Wertheimer did not write a rule for modern UI saying, “same color must mean same action.” そこはapplication / interpretation。

Still, if similar elements are perceived as belonging together, repeated color, shape, or typography can become a cue for **“this seems to be the same kind of thing.”**

色はdecorationであると同時に、反復されればvisual vocabularyにもなる。

![One blue, five meanings](https://raw.githubusercontent.com/silovar-uk/myessays/main/assets/design-literacy-cue-collision/one-blue-five-meanings.svg)

## 2. INTERPRETATION｜The problem is semantic overload, not “too much blue”

~~~text
BLUE
├─ link
├─ selected
├─ CTA
├─ heading
└─ decoration
~~~

The palette is tidy. The semantics are not.

青を見るたびに、

~~~text
Clickable?
Selected?
Important?
Brand decoration?
~~~

をcontextから解かなければならない。

この記事では、この状態を**cue collision**と呼ぶ。This is not an official Gestalt law or a claim from Wertheimer. It is a practical diagnostic label used here for a situation where several meanings compete for the same visual cue.

Rule:

> **Do not make one cue carry several meanings that users need to distinguish.**

## 3. EXPERIMENT｜Remove color and expose the grammar

Try a deliberately harsh test: make the interface grayscale.

色を失った瞬間、

~~~text
link
heading
selected
CTA
~~~

がほぼ同じになるなら、color was carrying too much semantic responsibility.

A more robust system might retain distinctions through:

~~~text
link      = underline + text
selected  = fill / marker
CTA       = button shape + label
heading   = type scale + weight
~~~

![Redundant cues](https://raw.githubusercontent.com/silovar-uk/myessays/main/assets/design-literacy-cue-collision/redundant-cues.svg)

Redundancy here is not waste. **It prevents meaning from depending on one channel.**

## 4. FACT｜WCAG says color should not be the only visual means

WCAG 2.2 Success Criterion 1.4.1 Use of Color requires that color not be used as the only visual means of conveying information, indicating an action, prompting a response, or distinguishing a visual element.

Source: https://www.w3.org/WAI/WCAG22/Understanding/use-of-color

Technique G182 gives examples of additional cues such as underline or font-style changes.

Source: https://www.w3.org/WAI/WCAG22/Techniques/general/G182

Important distinction: **WCAG is not prescribing a Gestalt Similarity system.** The factual accessibility requirement is narrower: do not rely on color alone.

UI側のinterpretationとしては、meaningをmultiple cuesへ分散すると、一つのchannelが使えない状況でもroleを保ちやすい。

## 5. BEFORE → AFTER｜Do not add colors first; separate the grammar

### BEFORE

~~~text
試合情報           ← blue + bold
チケットはこちら   ← blue + bold
販売中             ← blue + bold
URAWA REDS         ← blue + bold
~~~

Everything looks “important,” but the roles are different: heading / link / status / brand.

### AFTER

~~~text
heading  → type scale + weight
link     → underline + color
status   → label + shape + color
brand    → brand treatment
~~~

The point is not “use more colors.”

Color, shape, underline, weight, border, icon, position, and spacing are all available channels.

**Design is partly the job of deciding which difference carries which meaning.**

## 6. MESO → MICRO｜Audit from role to cue

~~~text
ROLE        PRIMARY CUE        SECONDARY CUE
link        underline          color
selected    marker / fill      color
CTA         shape              label + color
heading     type scale         weight
status      label / icon       shape + color
decoration  no semantic duty   brand color
~~~

This is not a universal recipe.

It is an audit tool. Ask:

> **What does this blue mean?**

before asking:

> Which blue should we use?

## 7. MACRO CONNECTION｜Signifiers make action legible

Don Norman distinguishes affordances from signifiers. In his formulation, affordances concern possible actions in the relationship between an actor and the environment; signifiers are perceivable clues that communicate where and how to act.

Source: https://jnd.org/signifiers-not-affordances/

In the revised *The Design of Everyday Things*, Norman uses the touchscreen to make the distinction sharp: touch is possible across the screen, while design must signify **where the touch should happen**.

Source: https://media.aanda.psu.edu/sites/media/aa/files/documents/norman_design-of-everyday-things.pdf

戻すと、

~~~text
blue = link
~~~

が一貫していれば、blue can participate in a signifier for interaction.

But if:

~~~text
blue = link / heading / decoration / selected / CTA
~~~

the cue becomes less informative.

Similarity asks **what looks like the same kind**. Signifiers ask **what tells me what to do**.

One overloaded visual property can blur both.

## 8. MISUNDERSTANDING｜This does not reduce to “underline every link”

W3C Technique G183 also discusses identifying links in text using contrast plus additional visual cues on hover or focus.

Source: https://www.w3.org/WAI/WCAG22/Techniques/general/G183

So the lesson is not to turn one style into dogma.

The stronger question is:

> **Is the role perceptible under the conditions that matter?**

Underline is one strong answer, not the only possible answer.

## 9. CONNECTION｜Proximity + Similarity + Signifier = Visual Grammar

#55:

~~~text
Proximity
= write relationships with distance
~~~

#56:

~~~text
Similarity
= show sameness through appearance

Signifier
= communicate where / how to act
~~~

Together:

~~~text
DISTANCE
  + APPEARANCE
  + ACTION CUES
        ↓
VISUAL GRAMMAR
~~~

![Visual Grammar](https://raw.githubusercontent.com/silovar-uk/myessays/main/assets/design-literacy-cue-collision/visual-grammar.svg)

Before anyone reads the copy, the screen is already saying:

> these belong together;
> these are the same kind;
> this can be acted on.

UI review therefore needs more than “does this look clean?”

Ask: **What is this visual property saying?**

## 10. PRODUCTION｜Ready-to-use direction

> **同じ色・形・文字スタイルを使っている要素について、意味や機能も共通しているか確認してください。意味が異なる場合は、色を増やすだけで解決せず、下線・形・太さ・アイコン・配置など別のvisual cueへ役割を分散し、操作・状態・見出し・装飾が見分けられるvisual vocabularyを作ってください。**

For a Design System:

> **Do not define visual properties only by appearance. Define the semantic role of tokens and components, and audit whether one cue is serving several meanings that need to remain distinguishable.**

Review shortcut:

> **「この青、全部同じ意味ですか？」**

## 11. PRACTICE｜30-second Same-Look Test

Pick one color on any website.

Collect every element using it: heading, link, button, icon, status, decoration.

Then ask:

> **Are these all supposed to mean the same thing?**

If the answer is often no, the color may be carrying too many jobs.

Then reverse the test:

> **Do elements with the same function look unrelated?**

Similarity can fail in both directions: too much sameness and too little.

## 12. NEXT｜Break down “looks clickable”

次は**Affordance / Signifier / Mapping**。

The question:

> **Why do shape, shadow, label, position, and cursor make something look clickable?**

But we will not reduce it to “shadow = button.”

物理世界のaffordance、digital signifier、learned conventionを分けて考える。

## 13. 今日の中心命題

> **Consistency is not making everything look the same. It is making the same meaning predictably recognizable.**

調べる前は、「brand colorを揃える」は一貫性を高める行為に見える。

Afterward, color looks less like paint and more like vocabulary.

画面にblueを一つ足すたび、visual dictionaryへ意味を登録している。

If one word casually means five unrelated things, prose becomes harder to read.

UIも、たぶん同じや。

## 14. Sources

- Max Wertheimer, “Laws of Organization in Perceptual Forms” (1923)  
  https://psychclassics.yorku.ca/Wertheimer/Forms/forms.htm
- W3C WAI, “Understanding SC 1.4.1: Use of Color”  
  https://www.w3.org/WAI/WCAG22/Understanding/use-of-color
- W3C WAI, “Technique G182”  
  https://www.w3.org/WAI/WCAG22/Techniques/general/G182
- W3C WAI, “Technique G183”  
  https://www.w3.org/WAI/WCAG22/Techniques/general/G183
- Don Norman, “Signifiers, not affordances”  
  https://jnd.org/signifiers-not-affordances/
- Don Norman, *The Design of Everyday Things*, Revised and Expanded Edition  
  https://media.aanda.psu.edu/sites/media/aa/files/documents/norman_design-of-everyday-things.pdf
