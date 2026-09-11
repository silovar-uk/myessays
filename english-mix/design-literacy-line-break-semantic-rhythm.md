---
id: design-literacy-line-break-semantic-rhythm
title: "最後の1文字だけ次の行――Is the browser really bad at line breaks?"
subtitle: "Design Literacy #33｜Line Breaking / Kinsoku Shori / Semantic Rhythm"
created: "2026-09-11"
updated: "2026-09-11"
type: "Essay"
status: "完成"
series: "Design Literacy｜細部から思想まで"
seriesOrder: 33
tags: ["Design Literacy", "Typography", "Japanese Typography", "Web Design"]
keywords: ["Line Breaking", "Kinsoku Shori", "JLReq", "text-wrap", "Japanese Typography", "Semantic Rhythm", "Rag"]
favorite: 3
grow: 4
abstract: "スマホ幅を少し変えただけで、見出しの最後の1文字が次の行へ落ちる。Why does a readable line break still feel wrong? 日本語の禁則処理とCSSのtext-wrapを手がかりに、改行を文字処理ではなくmeaning relationshipsの設計として考える。"
---

# 最後の1文字だけ次の行――Is the browser really bad at line breaks?

見出しを作った。

> スタジアムでしか味わえない  
> 特別  
> な体験

It is readable. 文法も壊れていない。Yet the moment「な体験」falls onto the last line, the copy suddenly feels machine-made.

たった1文字の位置で、why does it feel so wrong?

今回はブラウザ幅を変えながら日本語の改行を観察し、W3Cの日本語組版資料まで読んでみる。At first, this looked like a tiny typography problem. 途中から、it started to look like information architecture.

## 改行には “can break” と “should break” がある

まず分けたいのは、**line break opportunity**と、where we actually choose to break.

W3Cの『日本語組版処理の要件（JLReq）』は、CSS、SVG、XSL-FOなどで必要になる日本語組版の一般的要件を整理し、主としてJIS X 4051を基礎としている。行頭禁則・行末禁則・分割禁止などを考慮して行を作る処理も扱う。

So the browser is not simply throwing overflowing characters onto the next line.

**FACT:** 日本語にはpunctuationやcharacter combinationsによってline-break opportunitiesを制約する組版規則がある。

But this is where it gets strange.

禁則違反でなくても、bad-looking breaks exist.

> Design Literacyに  
> ついて考えてみる

読める。でも、

> Design Literacyについて  
> 考えてみる

の方が「Design Literacyについて」というsemantic unitを保っている。

**INTERPRETATION:** Kinsoku Shoriが主に“don't break here”を扱うなら、見出し設計ではさらに**“where should this meaning break?”**を考える必要がある。

## ちょっとやりすぎて、20pxずつ幅を動かす

The web has one nasty difference from paper: the canvas does not stay still.

同じ見出しで、widthだけを変えてみる。

```text
WIDTH A
今週末は埼玉スタジアムで
特別な体験を楽しもう

WIDTH B
今週末は埼玉スタジアム
で特別な体験を楽しもう

WIDTH C
今週末は埼玉スタジアムで特別な
体験を楽しもう
```

Not one character changed. CSSも同じ。それでもwidthだけで、the first semantic chunk perceived by the reader changes.

W3C Internationalizationのline-breaking解説では、日本語は基本的にcharacter-based wrappingを行う一方、punctuation rulesがあり、見出しなどでは知覚される“words”を分割したくない場合もあると説明されている。And unlike English, Japanese word boundaries are not always obvious.

ここで「改行＝余った文字の処理」という理解が崩れる。

**Typography on the web is a moving target.**

Web typography is not only about making one finished composition beautiful. 幅が変わっても、meaningの崩れ方を制御する仕事になる。

## `text-wrap: balance` is not a Japanese copy editor

CSSには`text-wrap` / `text-wrap-style`がある。MDNでは、短いheadingsやcaptionsで`balance`を使い、line lengthsをより均衡させる方法を説明している。Longer body copyでは`pretty`という選択肢もある。

便利や。

But there is a catch.

**Balance does not understand your sentence.**

`text-wrap-style`は、soft wrap可能な場所そのものを新しく作るのではなく、allowed opportunitiesの中でhow the browser choosesを調整する。

だから、

> balanced line lengths

と、

> balanced meaning

は同じではない。

Automation can help line length. **It cannot guarantee semantic rhythm.**

## Before → After：character countではなくrelationshipで切る

### Before

> 今週末は埼玉スタジアムで特  
> 別な体験を楽しもう

The lines are visually similar in length. でも「特別」が割れている。

### After

> 今週末は埼玉スタジアムで  
> 特別な体験を楽しもう

キャンペーン見出しなら、

> 今週末は  
> 埼玉スタジアムで  
> 特別な体験を楽しもう

でもいい。

Here, **phrase structure beats equal line length.**

制作指示ならこうなる。

> 見出しの改行は文字数を均等にすることを目的とせず、固有名詞・修飾語と被修飾語・一続きで読ませたい句を途中で分断しないよう調整してください。短い見出しでは各行をsemantic unitとして読めるか確認し、必要に応じて`text-wrap: balance`も検討してください。ただしautomatic balancingだけで判断しないでください。

## Is a short last line always bad?

ここもsimple ruleにはしたくない。

> 絶対に、  
> 負けられない。

A short line can work when the rhythm is intentional.

問題はshortnessそのものではなく、**why the break exists**だ。

MDNでは`text-wrap-style: pretty`を、performanceよりbetter layoutを優先する長めのtext向けの選択肢として説明している。ただしbrowser supportやimplementationには差があるため、実装時の確認は必要。

**FACT:** CSS is gaining tools for better line wrapping.

**INTERPRETATION:** それでもdesigner/editorの仕事は消えない。The job shifts toward deciding what machines can optimize and what still requires semantic judgment.

## Whitespaceとline breakは、どちらもrelationshipを書く

以前の学びにつなげる。

Alignment = where things align.  
Grid = which coordinates are shared.  
Line Height = vertical reading rhythm.  
Measure = how long a line continues.

そしてLine Breakは、**where meaning stops and resumes.**

```text
POSITION  どこに置く？
DISTANCE  どれくらい離す？
LENGTH    どれくらい続ける？
BREAK     どこで切る？
```

If whitespace describes relationships between elements, line breaks describe relationships inside language.

**Whitespace and line breaks both describe relationships.**

何もない場所ほど、actually doing a lot of work.

## 30秒だけ、widthを変える

好きなWebページを一つ開く。スマホかdesktop browserで、widthを少しずつ変える。

見るのは3つ。

1. 固有名詞がawkwardに割れないか。  
2. 「〜について」「〜のための」のようなsemantic chunksが分断されないか。  
3. 20px動かした瞬間、reading rhythmが急に悪くならないか。

You may discover another job hiding inside what you used to call “responsive check.”

## 次は文字ではなく、paragraph silhouetteを見る

次につながるのは**Rag / Ragged Edge**。

左揃え本文の右端にできるギザギザは、単なる余りではない。Across several lines, those lengths create rhythm and shape.

一行の“where to break”から、次は段落全体の“what shape does it make?”へ。

文字が少しずつgraphic formになっていく。

## 調べる前と後で、1文字の位置が変わった

最初は、最後の1文字だけ次の行へ落ちるのを見て、the browser was being a little stupidと思っていた。

But the browser is already negotiating Japanese line-breaking rules, available width, and soft-wrap opportunities. その上で、人間にはさらに「meaningとしてどこで切りたいか」という仕事が残る。

**Do not ask only, “Where can this line break?” Ask, “Where should this meaning break?”**

「どこで改行できるか」ではなく、**どこで意味を切るべきか。**

そう思ってWebを見ると、見出しの最後にぶら下がった一文字がlayout accidentではなく、ブラウザと日本語とdesignerのnegotiation resultに見えてくる。

たかが改行やと思っていた。

Apparently, there was a whole meeting happening behind it.

---

## Sources

- W3C, Requirements for Japanese Text Layout: https://www.w3.org/TR/jlreq/?lang=ja
- W3C Internationalization, Approaches to line breaking: https://www.w3.org/International/articles/typography/linebreak.en.html
- MDN, text-wrap: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/text-wrap
- MDN, text-wrap-style: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/text-wrap-style

**中心命題:** A line break is not merely overflow handling; it is information design for semantic relationships.

**専門語:** Line Breaking / Kinsoku Shori / JLReq / Soft Wrap / text-wrap / text-wrap-style / balance / pretty / Semantic Rhythm / Phrase Structure / Rag