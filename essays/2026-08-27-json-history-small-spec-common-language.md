---
id: json-history-small-spec-common-language
title: "JSONはなぜ世界共通語になったのか――小さな仕様の歴史"
subtitle: "JavaScriptのオブジェクト記法からRFC 8259まで、「少なく決める」設計をたどる"
created: "2026-08-27"
updated: "2026-08-27"
type: "Essay"
status: "完成"
tags: ["JSON", "JavaScript", "Web", "API", "標準化", "データ交換", "ソフトウェア設計"]
keywords: ["JSON", "JavaScript Object Notation", "RFC 8259", "RFC 7159", "RFC 4627", "ECMA-404", "API", "data interchange", "Douglas Crockford", "Ajax"]
favorite: 4
grow: 4
abstract: "APIや設定ファイルで当たり前のように使うJSONは、巨大な標準化プロジェクトとして始まったわけではない。JavaScriptの中にすでにあった記法をデータ交換に使えると『発見』し、利用が広がった後にRFCやECMA標準が現実の相互運用問題を吸収していった。JSONの歴史と現在の仕様をたどりながら、『少なく決めること』がなぜ強い設計になりうるのかを考える。"
---

# JSONはなぜ世界共通語になったのか――小さな仕様の歴史
## JavaScriptのオブジェクト記法からRFC 8259まで、「少なく決める」設計をたどる

APIを触る。

ChatGPTに構造化データを出してもらう。

設定ファイルを編集する。

すると、こんな形に出会う。

```json
{
  "name": "JSON",
  "year": 2001,
  "simple": true,
  "features": ["object", "array", "string", "number"],
  "version": null
}
```

いまや見慣れすぎていて、JSONに「歴史」があることを意識しにくい。

でも、その成り立ちはかなり変わっている。

JSONは、最初に委員会が集まって「新しいデータ交換規格を作ろう」と設計されたものではない。

むしろ、**すでにJavaScriptの中にあった記法を、ネットワーク越しのデータ交換にも使えると見つけた**ところから始まった。

そして普及した後、現実に起きた相互運用上の問題を、標準仕様が少しずつ整理していった。

JSONの歴史を追うと、技術が広がる理由について一つの面白い仮説が見えてくる。

**強い標準は、たくさんのことを決めた標準とは限らない。むしろ、みんなが同意しなければならないことを減らした標準が強いことがある。**

## 1. そもそもJSONは何なのか

JSONは **JavaScript Object Notation** の略だ。

ただし、名前にJavaScriptと入っていても、現在の仕様ではJSONは明確に**言語非依存のデータ交換形式**として定義されている。

RFC 8259は、JSONを「軽量で、テキストベースで、言語非依存のデータ交換形式」と説明する。ECMA-404も同じく、ECMAScriptから派生したが、プログラミング言語には依存しない構文だとしている。

[RFC 8259: The JavaScript Object Notation (JSON) Data Interchange Format](https://www.rfc-editor.org/rfc/rfc8259)

[ECMA-404: The JSON Data Interchange Syntax](https://ecma-international.org/publications-and-standards/standards/ecma-404/)

ここは大事だ。

JSONは「JavaScriptのオブジェクトそのもの」ではない。

JSONは、**データを文字列として表すための小さな文法**だ。

ECMA-404は、さらに割り切っている。規定するのは有効なJSONテキストの**syntax（構文）**であり、そのデータに何を意味させるか、各言語の内部データへどう変換するかまでは決めない。

つまり、JSONは最初からかなり仕事を限定している。

## 2. 「発明」ではなく「発見」だった

JSONの歴史で一番おもしろいのは、Douglas Crockford自身が「自分が発明した」とは説明していないことだ。

2006年の講演資料でCrockfordは、JavaScriptのobject literalがネットワーク上でオブジェクト指向データを送るのに適していることを、複数の人が独立に発見していたと書いている。

そして、自分自身はState SoftwareのCTOだった**2001年4月**にその使い方を発見し、**2002年に json.org ドメインを取得して形式を説明するページを公開した**と振り返っている。

[Douglas Crockford, “JSON: The Fat-Free Alternative to XML” (2006)](https://www.json.org/fatfree.html)

後年の「The JSON Saga」でも、CrockfordはJSONを「自然界にすでにあったものを見つけ、名前を付け、使い方を説明した」という趣旨で語っている。

[Microsoft Research: The JSON Saga](https://www.microsoft.com/en-us/research/video/the-json-saga/)

なぜ「発見」なのか。

JavaScriptには、もともと次のようなオブジェクトや配列を表す記法があったからだ。

```js
var person = {
  name: "Taro",
  age: 30,
  skills: ["HTML", "CSS"]
};
```

この「プログラムを書くための記法」の一部を切り出して、**プログラムそのものではなく、データだけを運ぶ記法にする**。

JSONの発想は、ゼロから新しい記号体系を作ることではなく、すでに多くのプログラマーに馴染みのある構造から、余計なものを削ることだった。

## 3. Ajax時代に、JSONの小ささが効いた

2000年代前半、Webアプリケーションでデータをやり取りするとき、XMLは非常に重要な存在だった。

XMLは文書構造を豊かに表現でき、属性、名前空間、スキーマなどの大きなエコシステムも持っている。

だから「JSONがXMLより優れている」と一言で片づけるのは雑だ。

ただ、ブラウザー上のJavaScriptへ、

- ユーザー情報
- 商品一覧
- 検索結果
- 設定値

のような**アプリケーション内部のデータ構造**を渡したい場面では、JSONの形は非常に都合がよかった。

Crockfordは2006年の講演で、2005年にDynamic HTMLの考え方が「Ajax」という名前で新しい勢いを得て、ページ全体の置き換えではなくデータ交換が重要になったと説明している。

[Douglas Crockford, “JSON: The Fat-Free Alternative to XML” (2006)](https://www.json.org/fatfree.html)

JSONのobjectは、多くの言語のdictionary、hash、record、mapに近い。

arrayは、そのままlistやarrayに近い。

Web画面が欲しいのが「文書」ではなく「プログラムで扱うデータ」なら、この近さが効く。

**JSONは情報をたくさん表現できたから広がったというより、プログラム同士が共通して理解できる形まで表現を絞ったから扱いやすかった。**

## 4. 利用が広がってから、標準が追いかけた

JSONの標準化の順番もおもしろい。

最初に完全な標準を作ってから利用を始めたのではない。

利用が先に広がり、その後に仕様書が現実を整理していった。

### 2006年：RFC 4627

2006年7月、Crockfordを著者とする **RFC 4627** が公開された。

この文書はJSONを説明し、MIMEメディアタイプ **`application/json`** を登録した。ただし分類はInformationalで、当時のRFC 4627ではJSON textのトップレベルをobjectまたはarrayに限定していた。

[RFC 4627: The application/json Media Type for JavaScript Object Notation (JSON)](https://www.rfc-editor.org/rfc/rfc4627)

### 2013年：ECMA-404

2013年10月、Ecma Internationalは **ECMA-404** 初版を公開した。

ECMA-404の特徴は、JSONの「意味」まで欲張らず、**有効なJSONテキストのsyntaxだけを定義する**ことに集中している点だ。

現在公開されている第2版は2017年12月版である。

[ECMA-404](https://ecma-international.org/publications-and-standards/standards/ecma-404/)

### 2014年：RFC 7159

2014年3月の **RFC 7159** はRFC 4627を置き換えた。

ここで象徴的な変更が入る。

JSON textはobjectやarrayだけでなく、**任意のJSON value**でよいと定義された。

つまり、現在なら次もJSON textとして成立する。

```json
42
```

```json
"hello"
```

```json
true
```

[RFC 7159](https://www.rfc-editor.org/rfc/rfc7159)

### 2017年：RFC 8259

2017年12月、現在の中心的な仕様である **RFC 8259** がRFC 7159を置き換えた。

目的はJSONを大規模に機能追加することではなかった。

長年の利用で見えてきた仕様間の不整合、誤り、相互運用上の落とし穴を整理し、実装同士がより安全にデータを交換できるようにすることだった。

同じ2017年12月にはECMA-404第2版も公開され、IETFとEcmaのJSON定義は整合するよう保たれている。

[RFC 8259](https://www.rfc-editor.org/rfc/rfc8259)

## 5. 現在のJSONは、驚くほど少ない

RFC 8259では、JSONが表せる値は大きく6種類に整理できる。

- **object**：名前と値の組
- **array**：順序を持つ値の列
- **string**：文字列
- **number**：数値
- **boolean**：`true` / `false`
- **null**：値がないことを示すリテラル

たとえば、これだけでかなり複雑なデータを作れる。

```json
{
  "club": "Urawa Reds",
  "founded": 1950,
  "active": true,
  "players": [
    {"name": "A", "number": 10},
    {"name": "B", "number": 24}
  ],
  "next_match": null
}
```

objectの中にarrayを入れ、arrayの中にobjectを入れる。

この**入れ子（nesting）**だけで、木構造のデータをかなり柔軟に表現できる。

逆に言えば、JSONのコアには日付型も、画像型も、関数型もない。

日付を送りたければ文字列としてどう表すかをアプリケーション側で決める。画像のバイナリをJSONに直接入れる専用型もない。

ECMA-404が意味論を決めないのと同じで、JSONは「データ交換のすべて」を背負わない。

## 6. JavaScriptっぽいけど、JSONではないもの

JSONを覚えるとき、一番混乱しやすいのがここだ。

次はJavaScriptのobject literalとしては扱えるが、**JSONとしては無効**だ。

```js
{
  name: 'Taro',
  score: NaN,
  active: true,
  skills: ['HTML', 'CSS',],
  greet: function () { return 'hello'; }
}
```

JSONにするなら、たとえばこうなる。

```json
{
  "name": "Taro",
  "score": null,
  "active": true,
  "skills": ["HTML", "CSS"]
}
```

JSONの文法では、

- objectのnameはstringなので、`"name"` のようにダブルクォートで囲む
- stringもダブルクォートで囲む
- コメントは文法にない
- 最後の要素の後ろにtrailing commaは置けない
- `undefined` はない
- `NaN` や `Infinity` はnumberとして認められない
- functionは値の種類にない

という制約がある。

[RFC 8259 Sections 3–7](https://www.rfc-editor.org/rfc/rfc8259)

JSONはJavaScriptに似ている。

でも、**似ていることと同じであることは別**だ。

## 7. 仕様書を読むと、「現実との摩擦」が見える

RFC 8259には、初心者向け解説ではあまり出てこない面白い記述がある。

### objectの名前は「絶対重複禁止」ではない

RFC 8259は、object内のnameについて **SHOULD be unique** としている。

つまり相互運用のためには一意にするべきだが、文法上の絶対禁止ではない。

```json
{
  "name": "A",
  "name": "B"
}
```

こうしたデータを受け取ったとき、最後の値だけを採用する実装もあれば、エラーにする実装もある。

だから仕様は、「書けるか」だけでなく、**別の実装と同じ意味で読めるか**を気にしている。

### arrayの要素は同じ型でなくてもよい

次もJSONとして有効だ。

```json
[1, "two", true, null, {"five": 5}]
```

RFC 8259は、arrayの値が同じ型である必要はないと明記している。

ただし、有効だからといって、API設計として常に良いとは限らない。

### ネットワークで交換するならUTF-8

RFC 8259は、閉じたecosystemではないシステム間でJSON textを交換するとき、**UTF-8を使わなければならない（MUST）**としている。

以前の仕様ではUTF-8だけに限定していなかったが、現実の実装ではUTF-8が圧倒的に普及し、それが相互運用できる唯一のエンコーディングになったためだと説明している。

ここに、JSON標準化の性格がよく出ている。

**仕様が現実を命令しただけではない。現実の利用から得られた経験が、後の仕様を磨いた。**

## 8. JSONの強さは「できないこと」にある

JSONにはないものが多い。

コメントがない。

日付型がない。

バイナリ型がない。

参照や循環構造を直接表す仕組みもない。

スキーマもJSON本体の仕事ではない。

一見すると弱い。

でも、別の見方をすると、この弱さこそが強さになる。

システムAとシステムBが通信するとき、両者が合意しなければならない仕様が100個あれば、ズレる場所も増える。

合意することが10個なら、接続はずっと簡単になる。

Crockfordが後年のJSON史を語るときに繰り返し強調したのも、この**minimalism**だった。

JSONの設計目標は、RFC 8259でも minimal、portable、textual と整理されている。

JSONは「どんな情報でも最も豊かに表現できる形式」になろうとはしなかった。

代わりに、

**多くのプログラミング言語がすでに持っている基本的なデータ構造だけを、文字として安全に受け渡す共通部分になる。**

そこに徹した。

## 9. 標準は、完成品ではなく「合意の最小単位」なのかもしれない

JSONのコア構文は、2000年代前半から驚くほど小さいままだ。

その一方で、RFCは4627から7159、8259へ更新された。

変わったのは、派手な新機能よりも、曖昧さの除去や相互運用性の整理だった。

ここから見えてくるのは、標準化についての少し逆説的な考え方だ。

標準を強くするために、何でも標準の中へ入れる必要はない。

むしろ、

**「ここだけは全員で同じにしよう。それ以外は各自で決めよう」**

という境界をうまく引くほうが、長く使えることがある。

JSONは、JavaScriptから生まれた。

でもJavaScriptだけのものにはならなかった。

Webで広がった。

でもWebだけのものにもならなかった。

API、設定ファイル、ログ、データ保存、生成AIとの構造化されたやり取りまで、用途は広がった。

その中心に残ったのは、大きな機能群ではない。

`{}` と `[]` と、ほんの数種類の値だ。

**JSONが世界共通語になれた理由は、多くを語れるからではなく、異なる世界同士が「ここまでは同じ」と合意できるところまで小さかったからなのかもしれない。**

## 参考資料

- [RFC 8259: The JavaScript Object Notation (JSON) Data Interchange Format](https://www.rfc-editor.org/rfc/rfc8259)
- [RFC 7159: The JavaScript Object Notation (JSON) Data Interchange Format](https://www.rfc-editor.org/rfc/rfc7159)
- [RFC 4627: The application/json Media Type for JavaScript Object Notation (JSON)](https://www.rfc-editor.org/rfc/rfc4627)
- [ECMA-404: The JSON Data Interchange Syntax](https://ecma-international.org/publications-and-standards/standards/ecma-404/)
- [Douglas Crockford, “JSON: The Fat-Free Alternative to XML” (XML 2006)](https://www.json.org/fatfree.html)
- [Microsoft Research: Douglas Crockford, “The JSON Saga”](https://www.microsoft.com/en-us/research/video/the-json-saga/)
