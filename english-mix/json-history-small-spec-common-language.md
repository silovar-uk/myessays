---
id: json-history-small-spec-common-language
title: "JSONはなぜ世界共通語になったのか――小さな仕様の歴史"
subtitle: "Why a tiny data format became a common language"
mode: "english-mix"
english_ratio: 0.45
mix_unit: "sentence"
---

# JSONはなぜ世界共通語になったのか――小さな仕様の歴史
## Why a tiny data format became a common language

**JSON is everywhere.**

API、設定ファイル、Webサービス、生成AIとのデータ交換まで、気づけば毎日のようにJSONを見る。

It often looks like this:

```json
{
  "name": "JSON",
  "year": 2001,
  "simple": true,
  "features": ["object", "array", "string", "number"],
  "version": null
}
```

The syntax is so familiar that it barely feels like something with a history.

でも、その歴史はかなりおもしろい。

**JSON did not begin as a grand standards project.**

最初に委員会が集まり、巨大な仕様書を書いてから使われ始めたわけではない。

Instead, people noticed that a small part of JavaScript already worked well for exchanging data.

すでにある記法から、データ交換に必要な部分を切り出した。

That is the first important idea behind JSON: **less to agree on can mean easier interoperability.**

みんなが同意しなければならないことを減らすことが、互換性を強くする場合がある。

## 1. What is JSON, exactly?

**JSON means JavaScript Object Notation.**

名前にはJavaScriptが入っている。

But modern specifications define JSON as a language-independent data interchange format.

RFC 8259は、JSONを軽量でテキストベース、言語非依存のデータ交換形式と説明している。

ECMA-404 says the same basic thing: JSON came from ECMAScript, but it is programming-language independent.

[ECMA-404: The JSON Data Interchange Syntax](https://ecma-international.org/publications-and-standards/standards/ecma-404/)

So JSON is not simply “a JavaScript object.”

JSONは、データを文字として表現するための小さなsyntaxだ。

ECMA-404 is intentionally narrow.

この規格が決めるのは「有効なJSONテキストの構文」であり、そのデータを何に使うか、各言語の内部でどう表すかまでは決めない。

**JSON does one job and leaves many other jobs to applications.**

この仕事範囲の狭さが、あとで重要になる。

[RFC 8259](https://www.rfc-editor.org/rfc/rfc8259)

## 2. JSON was “discovered,” not invented from scratch

Douglas Crockford is strongly associated with JSON.

でも、Crockford自身は「自分だけがJSONを発明した」とは説明していない。

In a 2006 presentation, he wrote that several people independently discovered that JavaScript object literals were useful for sending data across a network.

自分自身については、State SoftwareのCTOだった**2001年4月**にその使い方を発見したと振り返っている。

In 2002, he acquired the `json.org` domain and published a page describing the format.

つまり、JSONはゼロから新しい記号を発明したというより、すでにJavaScriptに存在していた構造の使い道を見つけたものだった。

[Douglas Crockford, “JSON: The Fat-Free Alternative to XML”](https://www.json.org/fatfree.html)

Crockford later used the word **discovered** when telling “The JSON Saga.”

彼の語りでは、JSONは「自然界にあったものを見つけ、名前を付け、便利さを説明した」ものに近い。

[Microsoft Research: The JSON Saga](https://www.microsoft.com/en-us/research/video/the-json-saga/)

JavaScript already had structures like this:

```js
var person = {
  name: "Taro",
  age: 30,
  skills: ["HTML", "CSS"]
};
```

The key move was to remove programming features and keep a small data notation.

**JSON was created by subtraction more than addition.**

新しい能力を足すより、「データ交換にいらないものを持ち込まない」方向だった。

## 3. Ajax gave the small format a big opportunity

In the early 2000s, XML was a major technology for structured data on the Web.

XMLには文書構造、属性、名前空間、スキーマなど、JSONにはない豊かな仕組みがある。

So “JSON beat XML because XML was bad” is a poor explanation.

両者は得意な仕事が違う。

But Web applications increasingly needed to send data structures, not complete documents.

ユーザー情報、商品一覧、検索結果、設定値のようなデータを、ブラウザー上のJavaScriptへ渡す場面が増えた。

Crockford noted that in 2005, Dynamic HTML gained new energy under the name **Ajax**.

ページ全体を交換するのではなく、必要なデータだけを受け取って画面を更新する発想が広がった。

[Douglas Crockford, “JSON: The Fat-Free Alternative to XML”](https://www.json.org/fatfree.html)

JSON objects map naturally to dictionaries, maps, records, and hashes in many languages.

arrayも、多くの言語のlistやarrayへ素直に対応する。

**That common shape mattered.**

JSONは表現力を最大化したのではなく、いろいろな言語が共通して持っているデータ構造へ寄せた。

## 4. Usage came first; standards followed

**JSON became useful before its standardisation story was complete.**

この順番がJSONらしい。

### 2006 — RFC 4627

RFC 4627 was published in July 2006, with Douglas Crockford as the author.

この文書はJSONを説明し、MIMEメディアタイプ **`application/json`** を登録した。

At that time, a JSON text had to be an object or an array at the top level.

現在とは少し違う。

[RFC 4627](https://www.rfc-editor.org/rfc/rfc4627)

### 2013 — ECMA-404

Ecma International published the first edition of ECMA-404 in October 2013.

ECMA-404は、JSONのsyntaxそのものを小さく定義する規格だ。

It does not try to define every possible meaning or language mapping.

現在の第2版は2017年12月に公開されている。

[ECMA-404](https://ecma-international.org/publications-and-standards/standards/ecma-404/)

### 2014 — RFC 7159

RFC 7159 replaced RFC 4627 in March 2014.

ここで象徴的な変更が入った。

**A JSON text could now be any JSON value, not only an object or array.**

だから現在は、次の一行だけでもJSONとして成立する。

```json
42
```

The same is true for a JSON string, boolean, or null.

[RFC 7159](https://www.rfc-editor.org/rfc/rfc7159)

### 2017 — RFC 8259

RFC 8259 replaced RFC 7159 in December 2017.

目的は派手な新機能の追加ではなかった。

Its job was to remove inconsistencies, repair errors, and give interoperability guidance based on real experience.

長年使われた結果として見えてきた「実装同士がズレる場所」を整理した。

The second edition of ECMA-404 also appeared in December 2017.

IETFとEcmaは、JSONの定義が矛盾しないよう整合を保つ方針を明記している。

[RFC 8259](https://www.rfc-editor.org/rfc/rfc8259)

## 5. Modern JSON is surprisingly small

JSON has only a small set of value types.

現在のJSONを大きく整理すると、次の6種類で考えられる。

- **object**：name/value pairs
- **array**：順序を持つ値の列
- **string**：文字列
- **number**：数値
- **boolean**：`true` / `false`
- **null**：値がないことを示すリテラル

With nesting, these few building blocks can represent complex trees of data.

たとえばobjectの中にarray、そのarrayの中に別のobjectを入れられる。

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

There is no special JSON date type.

画像専用のbinary型も、function型もない。

Applications can agree to represent a date as a string, but JSON itself does not give that string a built-in “date” meaning.

**The format stays small by refusing to solve every problem.**

## 6. Looks like JavaScript, but is not JSON

This is where beginners often get caught.

次はJavaScriptでは扱えても、JSONとしては無効だ。

```js
{
  name: 'Taro',
  score: NaN,
  active: true,
  skills: ['HTML', 'CSS',],
  greet: function () { return 'hello'; }
}
```

A valid JSON version could look like this:

```json
{
  "name": "Taro",
  "score": null,
  "active": true,
  "skills": ["HTML", "CSS"]
}
```

JSON object names are strings, so they use double quotes.

stringもダブルクォートで囲む。

Comments are not part of the JSON grammar.

trailing commaも置けない。

There is no `undefined` value.

`NaN` と `Infinity` もJSON numberとして認められない。

Functions are not JSON values either.

**JavaScript-like does not mean JavaScript itself.**

[RFC 8259 Sections 3–7](https://www.rfc-editor.org/rfc/rfc8259)

## 7. The specification contains traces of real-world friction

Some of the most interesting parts of RFC 8259 are tiny details.

仕様書を読むと、「現実の実装で何が問題になったか」が見える。

### Object names SHOULD be unique

RFC 8259 says that names inside an object **SHOULD be unique**.

MUSTではないところがおもしろい。

This text is grammatically possible:

```json
{
  "name": "A",
  "name": "B"
}
```

But different parsers may handle it differently.

最後の値だけを残す実装もあれば、エラーにする実装もある。

So interoperability is not only about whether a parser can read the text.

**It is also about whether two systems will understand the same text in the same way.**

### Arrays can mix types

JSON arrays do not require every value to have the same type.

```json
[1, "two", true, null, {"five": 5}]
```

これはvalid JSONだ。

But valid syntax is not the same as good API design.

仕様上できることと、運用上やるべきことは別に考える必要がある。

### UTF-8 became the rule for open exchange

RFC 8259 requires UTF-8 when JSON text is exchanged between systems outside a closed ecosystem.

以前の仕様ではUTF-8以外も認められていた。

The RFC explains that real software had already converged on UTF-8 so strongly that it became the encoding that achieved interoperability.

ここでは「標準が現実を作った」だけではなく、**現実の成功パターンが標準へ戻ってきている。**

## 8. JSON is powerful because of what it cannot do

JSON has many missing features.

コメント、日付型、binary型、function、循環参照の直接表現などはない。

Its core specification does not provide a schema system either.

一見すると、不便にも見える。

But every extra feature creates another thing that two systems must agree on.

合意すべきルールが増えれば、解釈がズレる場所も増える。

**Minimalism reduces the surface area of disagreement.**

Crockford repeatedly described minimalism as central to JSON, and RFC 8259 lists minimal, portable, and textual among its design goals.

JSON did not try to become the richest possible representation of information.

その代わり、多くの言語が理解できる「小さな共通部分」になることを選んだ。

That is a different kind of power.

## 9. A standard can be a minimum agreement

JSON's core grammar has stayed remarkably small.

一方で、仕様文書はRFC 4627から7159、8259へ更新された。

The major story was not constant feature growth.

むしろ、曖昧さを減らし、相互運用をよくするための修正が中心だった。

This suggests a useful design principle beyond JSON.

**A strong standard does not need to standardise everything.**

「ここだけは全員で同じにする。それ以外は各自で決める」という境界をうまく引くことも標準化だ。

JSON came from JavaScript, but it did not remain a JavaScript-only format.

Webで広がったが、Webだけにも閉じなかった。

Today it appears in APIs, configuration, logs, storage, and structured AI outputs.

その中心にあるのは、巨大な機能群ではない。

Just `{}`, `[]`, and a handful of values.

**JSON became a common language not because it could say everything, but because many different systems could agree on the little that it says.**

多くを語る能力より、「ここまでは同じ」と合意できる小ささ。

そこにJSONの強さがある。

## References

- [RFC 8259: The JavaScript Object Notation (JSON) Data Interchange Format](https://www.rfc-editor.org/rfc/rfc8259)
- [RFC 7159: The JavaScript Object Notation (JSON) Data Interchange Format](https://www.rfc-editor.org/rfc/rfc7159)
- [RFC 4627: The application/json Media Type for JavaScript Object Notation (JSON)](https://www.rfc-editor.org/rfc/rfc4627)
- [ECMA-404: The JSON Data Interchange Syntax](https://ecma-international.org/publications-and-standards/standards/ecma-404/)
- [Douglas Crockford, “JSON: The Fat-Free Alternative to XML”](https://www.json.org/fatfree.html)
- [Microsoft Research: Douglas Crockford, “The JSON Saga”](https://www.microsoft.com/en-us/research/video/the-json-saga/)
