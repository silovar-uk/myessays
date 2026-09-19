---
id: design-literacy-signifier-cue-removal-test
title: "ボタンから文字を消しても、まだ「押せ」と言っているか？"
subtitle: "English Mix｜Design Literacy #57｜Break the Signifiers to See What Makes Action Discoverable"
created: "2026-09-19"
updated: "2026-09-19"
type: "English Mix"
status: "完成"
mode: "english-mix"
english_ratio: 0.45
mix_unit: "sentence"
tags: ["Design Literacy", "UI", "UX", "Signifier", "Affordance", "Discoverability", "Accessibility", "Don Norman"]
keywords: ["signifier", "affordance", "discoverability", "cue removal test", "interaction design", "feedback", "focus visible", "target size", "Don Norman", "James J. Gibson"]
favorite: 5
grow: 5
series: "Design Literacy｜細部から思想まで"
seriesOrder: 57
abstract: "『押せそう』をAffordanceの一語で済ませず、ラベル、形、位置、状態変化、文化的慣習というSignifierへ分解する。既存の#7 Affordance / Signifierを復習するのではなく、手掛かりを一つずつ消すCue Removal Testを行い、Discoverability、Focus、Target Size、そして次のMappingへ接続する。"
---

# ボタンから文字を消しても、まだ「押せ」と言っているか？
## English Mix｜Design Literacy #57｜Break the Signifiers to See What Makes Action Discoverable

There is a rounded rectangle on the screen.

中には「チケットを購入」と書いてある。We press it almost without thinking.

では、文字を消す。

~~~text
┌────────────────┐
│                │
└────────────────┘
~~~

まだ少し押せそうだ。

次に背景色を消す。枠線を消す。hoverもfocusも消す。周囲との余白も詰める。

最終的には「チケットを購入」という文字だけが本文に紛れ込む。

どの瞬間に、ボタンはボタンではなくなったのか。

Technically, it can remain clickable all the way to the end. なのに、人間から見ると途中で「操作」が消える。

That gap between capability and discoverability is today's subject.

この妙なズレを、本気で分解してみる。

![ボタンから手掛かりを一つずつ外すCue Removal Test](https://raw.githubusercontent.com/silovar-uk/myessays/main/assets/design-literacy-signifier-cue-removal/cue-removal-test.svg)

*Figure 1: 機能を変えずにvisual cueだけを順番に外す。どこでactionが見えなくなるかを観察する。Original diagram for this article.*

## 1. 先に訂正する｜これはAffordanceの新規テーマではない

このシリーズでは#7ですでにAffordance / Signifier / Discoverabilityを扱った。

そこで確認したのは、

~~~text
Affordance
= 何ができるか

Signifier
= 何ができると、どう分かるか
~~~

という区別だった。

Repeating that definition would only reproduce #7. 今回はそこから先へ行く。

だから#57では問いを変える。

> **Signifierは、実際には何個の手掛かりからできていて、どれを消すと操作が見えなくなるのか？**

We move from definition to **diagnosis**.

## 2. FACT｜Affordanceは「ボタンっぽい見た目」の名前ではない

James J. Gibsonが提唱したaffordanceは、環境と行為者との関係にあるaction possibilityとして扱われる。

Don Norman自身も、Gibsonにとってaffordanceは知覚可能である必要すらなく、designerが本当に注意すべきなのは、人が行為を理解するための手掛かりだと整理している。

Source: https://jnd.org/signifiers-not-affordances/

Normanはtouch interfaceについてさらに露骨に書いている。Touch deviceの主要なaffordanceはtouchabilityであり、画面上のどこをどう操作するかを知らせるにはSignifierが重要になる。

Source: https://jnd.org/opportunities-and-challenges-for-touch-and-gesture-based-systems/

つまり、

~~~text
角丸
影
青い背景
「購入」の文字
~~~

は、押すという物理的可能性そのものではない。

それらは主に、

> **ここで、このactionをしてください**

と伝える材料になる。

## 3. EXPERIMENT｜Cue Removal Testをやる

ボタンを一つ用意する。

~~~text
[ チケットを購入 ]
~~~

機能は一切変えない。

そのまま一つずつ手掛かりだけを消す。

~~~text
STEP 0
shape + color + label + spacing + feedback

STEP 1
shadowを消す

STEP 2
background / borderを消す

STEP 3
action labelを名詞へ弱める
「チケットを購入」→「チケット」

STEP 4
周囲のspacingをなくす

STEP 5
hover / focus / pressed feedbackを消す
~~~

面白いのは、「これを消した瞬間に100%ボタンでなくなる」という単独の境界が必ずしもないことだ。

**押せそう感は、一個の属性ではなく複数cueの合成として成立する。**

これは本稿の実務上の解釈であって、GibsonやNormanがこの5段階テストを提唱したという意味ではない。

## 4. 分類すると、Signifierは少なくとも5系統ある

制作で使えるように分類する。

~~~text
1. FORM
   shape / border / fill

2. LANGUAGE
   「購入する」「保存する」などaction label

3. POSITION
   toolbar / footer / navigationなど慣れた配置

4. STATE
   hover / focus / pressed / selected

5. CONVENTION
   過去のUI経験から学習した「こういうものは押せる」
~~~

もちろん完全な学術分類ではない。本稿の制作診断用の整理だ。

The important shift is this:

> **Do not ask only “How can we make it look more like a button?” Ask which signifier channel is missing.**

こと。

![Signifierを5系統へ分けた模式図](https://raw.githubusercontent.com/silovar-uk/myessays/main/assets/design-literacy-signifier-cue-removal/five-signifier-channels.svg)

*Figure 2: Form / Language / Position / State / Convention。Signifierを装飾一個ではなく複数channelとして監査する。Original diagram for this article.*

## 5. BEFORE → AFTER｜「購入」は強いが、「チケット」は弱い

### BEFORE

~~~text
MATCH INFORMATION

チケット
~~~

実装上は「チケット」全体をclickableにできる。

しかし初見では、

~~~text
heading?
category?
link?
button?
~~~

のどれかが分からない。

### AFTER

~~~text
MATCH INFORMATION

[ チケットを購入する ]
~~~

The rectangle is not the only thing that changed.

~~~text
「チケット」
noun / object

↓

「チケットを購入する」
verb / action
~~~

**言葉そのものもSignifierになる。**

「もっと目立たせる」だけではなく、labelがactionを説明しているかを見る。

## 6. FACT｜状態のSignifierはアクセシビリティでも必要になる

W3Cは、interactive elementを見分けやすくし、hover、keyboard focus、touch activationなどの状態を視覚的に示すことを推奨している。

Source: https://www.w3.org/WAI/tips/designing/

WCAG 2.2 Success Criterion 2.4.7 Focus Visibleでは、keyboard-operable UIがfocusを受けたとき、どこにfocusがあるか視覚的に判別できることが求められる。

Source: https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html

ここでSignifierの時間軸が増える。

~~~text
BEFORE ACTION
押せる場所はどこ？

DURING NAVIGATION
いまどこを操作しようとしている？

AFTER ACTION
押した結果は起きた？
~~~

If we judge interaction only from a static screenshot, we are looking at only part of the system.

## 7. さらに意地悪な実験｜見た目は押せる。でも押しづらい

次は逆方向。

完璧にbuttonらしい。

~~~text
[ BUY ]
~~~

でも実際のtargetが8×8 CSS pxしかないとする。

「押せると分かる」と「実際に押しやすい」は別問題だ。

WCAG 2.2のTarget Size (Minimum)は、pointer inputのtargetについて原則24×24 CSS px以上、または規定されたspacing等の例外条件を求めている。

Source: https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum

ここで#2のTouch Targetへ戻る。

~~~text
Capability
技術的にactionが存在する

Discoverability
actionが存在すると分かる

Interaction Geometry
実際に狙って操作しやすい
~~~

These are three different layers.

**「押せそう」だけ直しても、押しやすくなるとは限らない。**

## 8. MACRO｜Signifierの一部は、他人のデザインから借りている

なぜ角丸の長方形を見ると、私たちはbuttonを疑うのか。

形そのものに「クリックせよ」という自然法則が入っているわけではない。

Normanは文化、convention、standardをinteraction理解の重要な要素として扱っている。改訂版『The Design of Everyday Things』でも、natural mappingの議論にcultureを追加し、conventionをcultural constraintとして扱っている。

Source: https://jnd.org/books/the-design-of-everyday-things-revised-and-expanded-edition/

つまり、私が今日buttonをデザインするとき、

~~~text
自分のデザイン
+
OS
+
browser
+
過去のWeb
+
過去のapps
+
社会的convention
~~~

を背負っている。

That is a surprisingly large historical burden.\n\nFor one tiny button.

だから「斬新だから」という理由だけで既存のinteraction conventionを壊すと、ユーザーは新しい見た目だけでなく**新しい文法まで学習させられる**ことがある。

新規性が悪いのではない。

学習コストまで含めて意図的か、という話だ。

## 9. 前より解像度が上がる接続｜Similarityは分類、Signifierは行動、Focusは現在地

直前の#56では、Similarityから一歩進めて、

~~~text
同じvisual cue
↓
何の意味を担当している？
~~~

を見た。

今日それをinteractionへ伸ばす。

~~~text
Proximity
何と何が関係している？

Similarity
何と何が同種？

Signifier
どこで何をすればいい？

Focus / State
いま何を操作している？
~~~

![ProximityからStateまでのVisual Grammar](https://raw.githubusercontent.com/silovar-uk/myessays/main/assets/design-literacy-signifier-cue-removal/visual-grammar-action.svg)

*Figure 3: Relationship → Category → Action → Current state。Visual Grammarに時間軸が入り始める。Original diagram for this article.*

At this point, the interface stops behaving like a static poster.

**UIは、関係・分類・行動・現在地を時間の中で伝える媒体になる。**

## 10. PRODUCTION｜そのまま使える制作・修正指示

「もっとボタンっぽくしてください」ではなく、こう言う。

> **操作可能な要素について、ユーザーが何を手掛かりにactionを発見するかを明確にしてください。Form、action label、placement、hover/focus/pressedなどのstate、既存conventionのうち、どのcueが役割を担っているか確認し、一つのcueを外しただけで操作可能性が消える場合は別channelで補強してください。**

レビュー時はさらに短くできる。

> **「これ、何を見て押せると分かりますか？」**

そして実装確認では、

> **「見つけられることと、実際に押しやすいことを分けて確認してください。」**

まで言う。

## 11. PRACTICE｜30秒のLabel-Off Test

好きなサイトでbuttonを一つ見る。

まず文字を頭の中で消す。

~~~text
[              ]
~~~

まだactionに見えるか。

次に逆に、shapeとcolorを消す。

~~~text
チケットを購入する
~~~

まだactionに見えるか。

最後にkeyboardでTabを押す。

> **いま操作対象になっている場所が、見て分かるか。**

三つの答えが全部YESなら、かなり複数のchannelが働いている。

NOがあれば、「デザインが悪い」と即断するのではなく、**どのcueへ説明責任が集中しているか**を見る。

## 12. NEXT｜Mapping――押せるのは分かった。で、何が動く？

Next comes **Mapping**.

Normanが紹介するlight switchの例では、一列に並んだswitchと二次元に配置された照明の対応は覚えにくい。そこでswitchをfloor plan上の照明位置に対応させれば、controlとresultの関係を空間から読みやすくなる。

Source: https://jnd.org/floorplan-light-switches/

~~~text
Signifier
= ここを操作できる

Mapping
= この操作は、どれに効く
~~~

次は「押せそう」の先にある、**controlとresultの対応関係**を見る。

## 13. 今日の中心命題

> **An action can exist, look actionable, and still fail at a different layer.**

actionが実装されている。

押せると分かる。

押しやすい。

現在地が分かる。

押した結果が分かる。

全部、別の問題だ。

Before this investigation, a button looked like a rounded rectangle.

Afterward, it looks more like a bundle of coordinated signals.

**ボタンは形ではない。複数の手掛かりが、一つのactionを指差している状態だ。**

角丸を一つ足すことより、

> このUIは、何を使って「ここやで」と言っているのか。

を考える。

そうすると、デザインレビューの「なんとなく押しづらい」が、少しずつ分解できるようになる。

## 14. Sources

- Don Norman, “Signifiers, not affordances”  
  https://jnd.org/signifiers-not-affordances/
- Don Norman, “Affordances and Design”  
  https://jnd.org/affordances-and-design/
- Don Norman, “Opportunities and Challenges For Touch and Gesture-Based Systems”  
  https://jnd.org/opportunities-and-challenges-for-touch-and-gesture-based-systems/
- Don Norman, *The Design of Everyday Things, Revised and Expanded Edition*  
  https://jnd.org/books/the-design-of-everyday-things-revised-and-expanded-edition/
- Don Norman, “Floorplan Light Switches”  
  https://jnd.org/floorplan-light-switches/
- W3C WAI, “Designing for Web Accessibility”  
  https://www.w3.org/WAI/tips/designing/
- W3C WAI, “Understanding SC 2.4.7 Focus Visible”  
  https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html
- W3C WAI, “Understanding SC 2.5.8 Target Size (Minimum)”  
  https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum
