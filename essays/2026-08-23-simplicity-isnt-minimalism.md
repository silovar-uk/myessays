---
id: simplicity-isnt-minimalism
title: "Simplicity isn’t minimalism"
subtitle: "削ることと、ほどくことは違う"
created: "2026-08-23"
updated: "2026-08-23"
type: "Learning Essay"
status: "完成"
tags: ["デザイン", "UX", "設計", "システム思考", "simplicity", "minimalism"]
keywords: ["simplicity", "minimalism", "simple made easy", "understandability", "complexity", "design", "UX", "Rich Hickey", "John Maeda", "Don Norman"]
favorite: 5
grow: 5
abstract: "シンプルなデザインというと、色を減らし、余白を増やし、ボタンを消すことを想像しやすい。しかし、見える要素が少ないことと、理解しやすいことは同じではない。John Maeda、Rich Hickey、Don Norman、Nielsen Norman Groupの議論を手がかりに、minimalismを『削ること』、simplicityを『絡まりをほどき、理解できる構造にすること』として捉え直す。UIだけでなく、仕事、資料、システム設計にも持ち帰れるシンプルさの判断基準を考える。"
---

# Simplicity isn’t minimalism
## 削ることと、ほどくことは違う

## 要旨

**Less is not always simpler.**

「シンプルにしてください」と言われたとき、まず何をするだろう。

色を減らす。余白を広げる。罫線を消す。ボタンを減らす。文章を短くする。

どれも間違いではない。むしろ、余計なものを減らすことはデザインの重要な技術だ。

ただ、ここには一つ落とし穴がある。

**見えるものが少ないことと、理解しやすいことは同じではない。**

アイコンだけが並んだ美しい画面は、何を押せばいいか分からないことがある。ボタンを一つにまとめた結果、そのボタンが状況によって別の意味を持てば、操作はむしろ覚えにくくなる。説明を全部消した資料は、すっきりしていても、初めて読む人には前提が分からない。

ここで区別したいのが、**minimalism** と **simplicity** である。

この記事では、minimalismを否定したいわけではない。むしろ、minimalismはsimplicityをつくる有力な手段の一つだと思う。

しかし、同じものではない。

> **Minimalism reduces what we see. Simplicity reduces what we have to understand at once.**

見えるものを減らすことと、理解しなければならない絡まりを減らすこと。

この二つを分けると、「シンプルにする」という曖昧な指示が、少し具体的に見えてくる。

## 1. Minimalism asks: What can we remove?

**Minimalism starts with reduction.**

John Maedaは『The Laws of Simplicity』の最初の法則を **Reduce** としている。ただし、そこで言われているのは無条件の削除ではなく、*thoughtful reduction*、つまり考え抜いた削減である。

Maeda自身、機能を減らせば簡単になる一方で、必要な機能まで消せば価値が下がるという問題を示している。

そして彼の有名な整理では、simplicityは「明らかなものを引き、意味のあるものを足す」方向にある。

ここが面白い。

シンプルにすることは、単純な引き算ではない。

削った結果、意味まで消えたなら、それは成功とは言いづらい。

Nielsen Norman Groupのユーザビリティ原則にも **Aesthetic and Minimalist Design** がある。ここでのポイントは「何でも隠す」ことではなく、関係のない情報が重要な情報と競合しないようにすることだ。

つまり、minimalismの価値は「少なさ」そのものより、**重要なものを見えやすくするためのノイズ除去**にある。

問題は、削除が目的化したときに起きる。

## 2. Simplicity asks: What is tangled together?

**Simplicity is about entanglement.**

ソフトウェア設計者のRich Hickeyは、講演『Simple Made Easy』で、simpleとeasyを明確に分けた。

Hickeyは語源を手がかりに、simpleを「絡み合っていないもの」、complexを「複数のものが編み合わされた状態」として捉える。

ここでは、その語源解釈の厳密さよりも、設計を見るレンズとしての有用性に注目したい。

たとえば、システムに機能が三つしかないとする。

しかし、その三つが互いの状態を常に参照し、どれかを直すと残り二つにも影響するなら、そのシステムは見た目以上に複雑だ。

反対に、機能が十個あっても、それぞれの責任が分かれ、明確なルールで接続されているなら、理解や変更はしやすい。

Hickeyは、simplicityがしばしば「ものを少なくすること」ではなく、**むしろ独立したものを増やすこと**を意味すると指摘する。

これはminimalismとはかなり違う方向を向いている。

minimalismは、画面に十個あるものを五個にしたくなる。

simplicityは、五個にまとめた結果、一つ一つが五つの役割を抱えていないかを疑う。

**少ないが絡まっているものより、多くても分かれているものの方がsimpleな場合がある。**

## 3. Easy is not simple

**Easy means familiar or near. Simple means unentangled.**

もう一つ分けておきたい言葉が **easy** だ。

Hickeyの議論では、easyは自分の近くにあるものとして説明される。すでに知っている。すぐ使える。手元にある。だからeasyである。

この区別は日常の仕事でもかなり使える。

たとえば、毎月使っている巨大なExcelファイルがあるとする。

操作には慣れている。セルの場所も知っている。だから自分にとってはeasyだ。

しかし、数十個のシートが参照し合い、計算ロジックが特定のセル位置に依存し、誰かが列を一つ挿入すると壊れるなら、構造はsimpleではない。

逆に、新しく導入した仕組みは最初こそeasyではないかもしれない。覚える必要があるからだ。

それでも、入力、計算、表示が分離され、ルールが明示されているなら、長期的にはsimpleである可能性が高い。

ここを混同すると、私たちは「今すぐ楽なもの」を「良い設計」と評価してしまう。

**Easy is about today. Simplicity is often about tomorrow.**

今の使いやすさと、将来まで理解・変更できる構造は、別の軸で考えた方がいい。

## 4. Don’t make it simple. Make it understandable.

**Understandability is the real goal.**

Don Normanはさらに一歩踏み込む。

彼は「simplicityそのものをゴールにするな」と論じている。

理由は単純で、私たちは機能や能力を捨てたいわけではないからだ。

Normanは、たくさんの鍵盤を持つピアノを例に、要素が多いことだけでは悪い複雑さとは言えないと指摘する。必要な能力には、相応の構造が必要になる。

重要なのは、その構造を人が理解できるかどうかだ。

Normanが挙げる手段には、**modularization、mapping、conceptual model** がある。

機能をまとまりに分ける。

操作と結果の関係を分かりやすくする。

そして「この仕組みはこう動く」という一貫した理解を持てるようにする。

ここまで来ると、目標がかなり変わる。

「要素を減らす」ではなく、

**「複雑さを、人が扱える形に変換する」**

ことがデザインの仕事になる。

世界そのものは複雑である。

仕事も、サッカーも、会社も、スマートフォンも、多くの要素を持っている。

良いデザインは、その複雑さをなかったことにするのではなく、**必要な複雑さと不要な絡まりを分ける。**

## 5. 少ないのにcomplexなUI

**A clean screen can hide a messy model.**

UIで考えると、この違いは分かりやすい。

たとえば、メニュー名をすべて消してアイコンだけにする。

画面はminimalになる。

しかし、ユーザーが「このアイコンは何だっけ」と記憶しなければならないなら、認知負荷は増える。

Nielsen Norman Groupの別の原則には **Recognition Rather Than Recall** がある。覚えさせるより、見れば分かる状態をつくるという考え方だ。

つまり、文字を一つ足した方がsimpleになる場合がある。

あるいは、保存ボタンをなくして自動保存にする。

これはうまく設計すれば素晴らしい簡素化になる。

しかし、保存されたかどうかが見えないなら、ユーザーは別の不安を抱える。

その場合は「保存済み」という小さな表示を**追加する**方が、操作全体は理解しやすい。

ここに、simplicityの逆説がある。

**Sometimes adding one thing removes ten questions.**

一つ足すことで、十個の迷いを消せることがある。

## 6. 多いのにsimpleなもの

**More parts can create less confusion.**

仕事の資料でも同じことが起きる。

一枚に全部まとめれば、資料の枚数は少なくなる。

だが、その一枚に、背景、目的、決定事項、スケジュール、担当者、注意事項が同じ強さで並べば、読む側は「結局どこを見ればいいのか」を自分で判断しなければならない。

それなら、

- 背景
- 今回決めること
- 実行すること
- 補足資料

と役割を分けた方が、ページ数が増えても理解は早い。

これは文章でもシステムでも同じだ。

「一つにまとめる」は、見た目の数を減らす。

「役割を分ける」は、頭の中で同時に扱う関係を減らす。

**Minimalism compresses. Simplicity separates when separation helps.**

圧縮が効く場面もある。

分離した方がよい場面もある。

大事なのは、常に少ない方を選ぶことではない。

## 7. 「シンプルにして」を五つの問いに変える

**Ask better questions.**

では、実際に何かを「シンプルにしたい」とき、何を考えればいいのか。

私は次の五つに分けて考えると使いやすいと思う。

### 1. What can we remove?

なくしても意味や機能が変わらないものは何か。

これはminimalismの問いである。

### 2. What should we separate?

一つの要素に、複数の役割や判断が絡まっていないか。

これはsimplicityの問いである。

### 3. What should we organize?

数を減らさなくても、グループや階層をつくれば理解しやすくならないか。

Maedaの「Organize」に近い問いである。

### 4. What should we make visible?

削りすぎた結果、ユーザーに記憶や推測を要求していないか。

状態、名称、次の行動を見せることで、迷いを減らせないか。

### 5. What complexity must remain?

本来必要な複雑さまで消そうとしていないか。

複雑さを消せないなら、理解可能な形にできないか。

この五つを並べると、「シンプル＝削る」という一方向の発想から抜けやすい。

## 8. Simplicity is not emptiness

**Simplicity is not emptiness. It is clarity of structure.**

minimalismには、強い美しさがある。

余白があり、情報が絞られ、視線が迷わない画面は気持ちいい。

だからminimalismを捨てる必要はない。

ただし、それは目的ではなく手段として扱った方がいい。

削った結果、理解しやすくなったのか。

それとも、ただ説明や選択肢を隠しただけなのか。

一つにまとめた結果、扱いやすくなったのか。

それとも、本来独立していたものを絡ませたのか。

「もっとシンプルに」と言われたとき、反射的に要素を消す前に、もう一つ問いを置きたい。

> **What is unnecessarily tangled together?**
>
> 何と何が、必要以上に絡み合っているのか。

削るより先に、ほどく。

その視点を持つと、simplicityは見た目のスタイルではなく、**構造を設計するための技術**になる。

---

## 参考資料

- Rich Hickey, [Simple Made Easy](https://www.infoq.com/presentations/Simple-Made-Easy/), Strange Loop / InfoQ, 2011.
- John Maeda, [The Laws of Simplicity](https://lawsofsimplicity.com/).
- John Maeda, [Law 1: Reduce](https://lawsofsimplicity.com/blog/law-1-reduce/).
- Don Norman, [Simplicity Is Not the Answer](https://jnd.org/simplicity-is-not-the-answer/), 2008.
- Don Norman, [Simplicity is in the mind, Complexity is in the world](https://jnd.org/article_page_quotes/simplicity-is-in-the-mind/).
- Nielsen Norman Group, [10 Usability Heuristics for User Interface Design](https://www.nngroup.com/articles/ten-usability-heuristics/).
