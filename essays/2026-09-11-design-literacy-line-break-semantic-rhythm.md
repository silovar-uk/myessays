---
id: design-literacy-line-break-semantic-rhythm
title: "最後の1文字だけ次の行――改行は、ブラウザのミスなのか"
subtitle: "Design Literacy #33｜Line Breaking / Kinsoku Shori / Semantic Rhythm"
created: "2026-09-11"
updated: "2026-09-11"
type: "Essay"
status: "完成"
series: "Design Literacy｜細部から思想まで"
seriesOrder: 33
tags: ["Design Literacy", "Typography", "Japanese Typography", "Web Design"]
keywords: ["Line Breaking", "Kinsoku Shori", "JLReq", "text-wrap", "text-wrap balance", "Japanese Typography", "Semantic Rhythm", "Rag"]
favorite: 3
grow: 4
abstract: "スマホ幅を少し変えただけで、見出しの最後の1文字が次の行へ落ちる。これはブラウザの失敗なのか。日本語の禁則処理、soft wrap、CSSのtext-wrapを手がかりに、改行を『文字の折り返し』ではなく『意味の関係を見せる設計』として考える。"
---

# 最後の1文字だけ次の行――改行は、ブラウザのミスなのか

見出しを作った。

> スタジアムでしか味わえない  
> 特別  
> な体験

読める。文法も壊れていない。なのに、最後の「な体験」が落ちた瞬間、急に機械が文章を扱っている感じがする。

たった1文字の位置で、こんなに人間は落ち着かなくなるのか。

そこで今回は、ブラウザ幅を変えながら日本語の改行を観察し、W3Cの日本語組版資料まで読んでみる。調べる前は「見出しの改行をきれいにする話」だと思っていた。ところが途中から、これは情報設計の話に見えてきた。

## 改行には「できる場所」と「したい場所」がある

まず区別したいのは、**line break opportunity**と、実際にどこで折り返すかという選択だ。

W3Cの『日本語組版処理の要件（JLReq）』は、CSS、SVG、XSL-FOなどで実現される日本語組版の一般的要件を整理しており、主としてJIS X 4051を基礎としている。そこでは行頭禁則・行末禁則・分割禁止などを考慮しながら行を作る処理が扱われている。

つまりブラウザは、単純に「箱からはみ出した文字を次へ送る」だけではない。

**FACT:** 日本語には、句読点などの位置や文字の組み合わせによって、改行可能位置を制約する組版上の規則がある。

ただし、ここからが妙だ。

禁則に違反していなくても、嫌な改行はある。

> Design Literacyに  
> ついて考えてみる

これも読める。しかし、

> Design Literacyについて  
> 考えてみる

の方が「Design Literacyについて」という意味のまとまりを保っている。

**INTERPRETATION:** 禁則処理が「ここでは切るな」を扱うなら、見出し設計ではさらに「どこで切ると意味の関係が見えるか」を考える必要がある。

## ちょっとやりすぎて、画面幅を20pxずつ動かしてみる

Webの改行が紙と決定的に違うのは、版面が固定されないことだ。

そこで同じ見出しを想像して、幅だけを変える。

```text
幅 A
今週末は埼玉スタジアムで
特別な体験を楽しもう

幅 B
今週末は埼玉スタジアム
で特別な体験を楽しもう

幅 C
今週末は埼玉スタジアムで特別な
体験を楽しもう
```

文章は一字も変わっていない。CSSも同じ。それでも幅が変わるだけで、読者が最初に認識する意味の塊が変わる。

W3C Internationalizationのline breaking解説でも、日本語は基本的に文字単位で折り返し可能な一方、句読点などの規則があり、見出しでは知覚される「語」を分割したくない場合もあると説明されている。日本語ではそもそも何を一つのword boundaryとみなすかが英語ほど自明ではない。

ここで「改行＝余った文字の処理」という理解が崩れた。

**Typography on the web is a moving target.**

Webタイポグラフィは、完成した一枚を整える仕事だけではない。幅が変わったときにも意味の崩れ方を制御する仕事になる。

## `text-wrap: balance`は魔法の日本語編集者ではない

CSSには現在、`text-wrap` / `text-wrap-style`で折り返し方を調整する仕組みがある。MDNでは、短い見出しやキャプションなどに`balance`を使うことで、各行の長さをより均衡させられると説明している。長い本文では`pretty`によって速度より組版品質を優先する選択肢もある。

これはかなり便利だ。

ただし、ここで一つ罠がある。

**balanceは意味を読んでいない。**

MDNが説明する`text-wrap-style`は、soft wrap可能な位置そのものを新しく作る機能ではなく、許可された候補の中からブラウザがどう選ぶかを調整するものだ。

だから、

> 「各行が同じくらいの長さになった」

と、

> 「意味のまとまりがきれいになった」

は同義ではない。

自動化できるのはline lengthの一部。**semantic rhythm**まで自動で保証してくれるわけではない。

## Before → After：文字数ではなく、関係で切る

### Before

> 今週末は埼玉スタジアムで特  
> 別な体験を楽しもう

文字量はそこそこ均等。でも「特別」が割れた。

### After

> 今週末は埼玉スタジアムで  
> 特別な体験を楽しもう

あるいは、キャンペーン見出しなら、

> 今週末は  
> 埼玉スタジアムで  
> 特別な体験を楽しもう

でもいい。

ここでは行長の均等さより、**phrase structure**を優先している。

制作指示にするならこうなる。

> 見出しの改行は文字数を均等にすることを目的とせず、固有名詞・修飾語と被修飾語・一続きで読ませたい句を途中で分断しないよう調整してください。短い見出しでは各行を意味のまとまりとして読めるか確認し、必要に応じて`text-wrap: balance`も検討してください。ただし自動バランスだけで判断しないでください。

## 「短い最終行」は悪者なのか

ここでも単純なルールにはしたくない。

> 絶対に、  
> 負けられない。

最後の行が短くても、意図されたリズムなら成立する。

問題は短さそのものではなく、**なぜそこで切れているのか**だ。

MDNでは`text-wrap-style: pretty`を、速度よりもより良い組版を優先する長めのテキスト向けの選択肢として説明している。一方で、すべての値・挙動が全ブラウザで同一に実装されているわけではないため、対応状況の確認は必要だ。

**FACT:** CSSは折り返し品質を改善する方向へ進化している。

**INTERPRETATION:** それでもデザイナーや編集者の仕事は消えない。むしろ「機械に任せる部分」と「意味を見て判断する部分」の境界を設計する仕事になる。

## 余白と改行は、どちらも「何もない場所」ではない

ここで以前の学びとつながる。

Alignmentは「どこを揃えるか」。Gridは「どの座標を共有するか」。Line Heightは「縦方向にどう読むか」。Measureは「一行をどこまで続けるか」。

そしてLine Breakは、**どこで意味を切るか**。

```text
POSITION  どこに置く？
DISTANCE  どれくらい離す？
LENGTH    どれくらい続ける？
BREAK     どこで切る？
```

余白が要素間の関係を表すなら、改行も文章内部の関係を表している。

**Whitespace and line breaks both describe relationships.**

何もないように見える場所ほど、実はかなり仕事をしている。

## 30秒だけ、見出しの幅を変える

好きなWebページを一つ開く。スマホで見るか、PCならブラウザ幅を少しずつ細くする。

見るのは3点だけ。

1. 固有名詞が妙な場所で割れないか。
2. 「〜について」「〜のための」のような意味の塊が分断されないか。
3. 20pxほど幅を変えた瞬間、急に意味のリズムが悪くならないか。

たぶん、今まで「レスポンシブ確認」と呼んでいた作業の中に、別の仕事が見えてくる。

## 次は文字ではなく、段落の輪郭を見る

次につながる概念は**Rag / Ragged Edge**。

左揃え本文の右端にできるギザギザは、単なる余りではない。行長の連続として見ると、段落全体にリズムや形が生まれる。

一行の中で「どこで切るか」を見た次は、複数行をまとめて「どんな輪郭になっているか」を見る。

文字が少しずつ図形になっていく。

## 調べる前と後で、1文字の位置が変わった

最初は、最後の1文字だけ次の行へ落ちるのを見て、ブラウザがちょっと雑なのだと思っていた。

でも実際には、ブラウザは日本語のline-breaking rulesと箱の幅を相手に、ずっと折り合いをつけている。そのうえで人間側には、さらに「意味としてどこで切りたいか」という仕事が残る。

**Do not ask only, “Where can this line break?” Ask, “Where should this meaning break?”**

「どこで改行できるか」ではなく、「どこで意味を切るべきか」。

そう思ってWebを見ると、見出しの最後にぶら下がった一文字が、レイアウト事故ではなく、ブラウザと日本語とデザイナーの交渉結果に見えてくる。

たかが改行やと思っていた。

裏では、だいぶ会議していた。

---

## Sources

- W3C, Requirements for Japanese Text Layout: https://www.w3.org/TR/jlreq/?lang=ja
- W3C Internationalization, Approaches to line breaking: https://www.w3.org/International/articles/typography/linebreak.en.html
- MDN, text-wrap: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/text-wrap
- MDN, text-wrap-style: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/text-wrap-style

**中心命題:** 改行は文字の余りを処理するだけではなく、意味の関係を見せる情報設計である。

**専門語:** Line Breaking / Kinsoku Shori / JLReq / Soft Wrap / text-wrap / text-wrap-style / balance / pretty / Semantic Rhythm / Phrase Structure / Rag