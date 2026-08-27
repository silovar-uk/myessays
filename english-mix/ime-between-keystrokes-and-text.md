---
id: ime-between-keystrokes-and-text
title: "「nihongo」が「日本語」になるまで――IMEは何をしているのか"
subtitle: "What happens between a keystroke and committed text"
mode: "english-mix"
english_ratio: 0.45
mix_unit: "sentence"
---

# 「nihongo」が「日本語」になるまで――IMEは何をしているのか
## What happens between a keystroke and committed text

When you type Japanese with romaji, your fingers may press `nihongo`.

でも、最終的に画面へ残る文字は `nihongo` でも「にほんご」でもなく、**「日本語」**になる。

That is already a clue: a keyboard press and a final character are not always the same thing.

キーボードの `N` キーには「日」と書かれていない。それでも、いくつかの入力操作を経ると「日」が現れる。

One of the main systems working in that gap is the **IME — Input Method Editor**.

Microsoft describes an IME as a software component that helps users enter characters that are difficult to represent directly on a standard QWERTY keyboard. It interprets combinations of keystrokes and can generate characters or present candidates.

[Microsoft Learn: Input Method Editors (IME)](https://learn.microsoft.com/en-us/windows/apps/develop/input/input-method-editors)

一言でいえば、IMEは**「押されたキーをそのまま文字にする」のではなく、ユーザーが入力しようとしている文字列へ解釈する層**である。

## 1. From `nihongo` to 「日本語」

普段の入力を、少しだけゆっくり見てみる。

```text
nihongo
  ↓
にほんご
  ↓
candidates
  ├ 日本語
  ├ 二本語
  └ ...
  ↓
日本語
  ↓
commit
```

What feels like one action called “typing” is actually a sequence of stages.

### ① Keystrokes

First, the system receives input from a physical or on-screen keyboard.

この時点では、最終的な文章が決まったわけではない。

### ② Romaji becomes kana

With Japanese romaji input, the input method interprets combinations such as `ni` as 「に」 and `ho` as 「ほ」.

So `nihongo` becomes the reading 「にほんご」.

### ③ Candidate generation

次にIMEは、その読みから変換候補を作る。

It may suggest 「日本語」 first, while other candidates can appear depending on the input and context.

Apple’s Japanese input system also provides a candidate window, and macOS supports Live Conversion, which can automatically convert hiragana into kanji and other Japanese text while you type.

[Apple: Japanese Input Method User Guide](https://support.apple.com/guide/japanese-input-method/welcome/mac)

### ④ Candidate selection

ユーザーがSpaceや候補UIなどを使って、「日本語」を選ぶ。

### ⑤ Commit

Finally, the composition is committed, often with Enter or another confirmation action.

ここで大事なのは、**文字が画面に見えていることと、その文字列が確定済みであることは同じではない**という点だ。

## 2. Keyboard and IME are different things

A keyboard is an input device or interface.

IMEは、その操作を材料にして「どの文字列を入力しようとしているか」を組み立てる仕組みだ。

A simplified model looks like this:

```text
finger
  ↓
Keyboard
  ↓
IME / Input Method
  ↓
OS input system
  ↓
Application
```

これは理解のための単純化で、実際の責任分担はOSや実装によって異なる。

But one distinction is very useful: **Keyboard is not the same thing as IME.**

同じ物理キーボードでも、英字、日本語、中国語など複数の入力方式へ切り替えられる。

The hardware can stay the same while the interpretation changes.

## 3. Text under conversion is not finished text yet

日本語を入力していると、文字に下線が付いたり、候補ウインドウが出たりする。

The text is visible, but it is still being composed.

Web APIs have an explicit concept for this: **composition**.

MDN explains that `compositionstart` fires when an input system such as an IME begins a composition session, `compositionupdate` represents updates during that session, and `compositionend` fires when the composition is completed or canceled.

[MDN: compositionstart event](https://developer.mozilla.org/en-US/docs/Web/API/Element/compositionstart_event)

[MDN: compositionend event](https://developer.mozilla.org/en-US/docs/Web/API/Element/compositionend_event)

感覚的には、こんな流れになる。

```text
compositionstart
      ↓
にほんご   ← still editable
      ↓
日本語     ← candidate selected
      ↓
compositionend
      ↓
committed text
```

A visible string and a committed string are not always the same state.

## 4. Web development makes the IME suddenly visible

普通にPCを使うだけなら、IMEを意識する場面は少ない。

But when you build an input form, the hidden layer becomes part of your product design.

たとえばチャット欄に、こういう仕様を作る。

> Enterを押したら送信する。

In English-only input, that can look simple.

ところが日本語では、Enterが**変換を確定するための操作**として使われることもある。

If an app reacts only to “Enter was pressed,” it can confuse “commit this Japanese composition” with “send this message.”

その結果、「日本語」と確定したかっただけなのに、送信まで走るような不具合が起こりうる。

Web APIs expose `KeyboardEvent.isComposing`, which tells you whether a keyboard event occurred during a composition session.

[MDN: KeyboardEvent.isComposing](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/isComposing)

概念だけなら、こう書ける。

```js
input.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && !event.isComposing) {
    sendMessage();
  }
});
```

Real behavior can still vary across browsers, operating systems, and frameworks.

なので重要なのは特定のコード片を丸暗記することではなく、**Enterというキーにも複数の意味がある**と理解することだ。

## 5. Why English speakers may notice IMEs less often

On a typical QWERTY keyboard, many English letters have a relatively direct key-to-character relationship.

`a` を押せば `a`、`b` を押せば `b` と入力できる。

Japanese kanji cannot realistically be placed one character per physical key.

だから、日本語では次のような中間処理が重要になる。

```text
small set of keys
  ↓
reading / phonetic input
  ↓
selection from many possible characters
```

This is why Microsoft’s phrase “characters that can’t be represented easily on a standard QWERTY keyboard” is useful.

ただし、**「英語にはIMEがない」**と単純化するのは正確ではない。

The important idea is not the language name. It is whether the user’s physical input maps directly to the final text.

## 6. IMEs are not only for Japanese

IMEは日本語専用の仕組みではない。

For Chinese, a user may type a pronunciation using Pinyin and then select Chinese characters from candidates.

MDN even uses a Pinyin IME as an example when explaining composition events.

韓国語でも、限られたキー操作からハングルの音節を組み立てて入力する。

Seen this way, an IME is more than a “kanji converter.”

**It is a way to produce a large writing system from a limited set of input actions.**

## 7. Smartphone input solves the same kind of problem

IMEという言葉から、Windowsの「あ」「A」表示やSpaceキー変換を想像しやすい。

But the underlying input problem also exists on smartphones.

スマホでは、オンスクリーンキーボード、フリック、予測候補などを使って、少ない操作から文字列を作る。

Microsoft notes that IMEs can support both hardware keyboards and on-screen keyboards such as touch keyboards.

So the essence is not “press Space to convert Japanese on a PC.”

本質は、**人間の限られた入力操作から、目的の文字列を効率よく生成すること**にある。

## 8. Watch your own IME for 30 seconds

説明を読むより、自分の画面を観察した方が早い。

Try this slowly in any Japanese text field:

1. Type `nihongo`
2. 「にほんご」が出るところを見る
3. Convert it with Space or your usual method
4. 候補ウインドウを見る
5. Select 「日本語」
6. Enterなどで確定する
7. Watch the underline or candidate UI disappear

Inside a familiar action, several stages are happening:

```text
keystroke
→ interpretation
→ composition
→ candidate selection
→ commit
```

普段は速すぎて、全部まとめて「文字を打つ」と認識しているだけなのだ。

## 9. The IME lives between input and text

IMEを意識する前、文字入力はこう見える。

```text
key → character
```

After looking inside the process, it looks more like this:

```text
input
  ↓
interpretation
  ↓
composition
  ↓
candidate selection
  ↓
committed text
```

私たちは「文字を打っている」と思っている。

But the computer may be doing something more interesting: interpreting a sequence of human actions into text.

IMEは、その翻訳を担う代表的な仕組みだ。

It stays invisible when everything works well.

そして入力フォームを作る側に回ると、その見えなかった層が急に見えるようになる。

“Enter was pressed” does not always tell you what the user meant.

**Input is not only about keys. It is also about interpretation.**

## References

- [Microsoft Learn: Input Method Editors (IME)](https://learn.microsoft.com/en-us/windows/apps/develop/input/input-method-editors)
- [Apple: Japanese Input Method User Guide](https://support.apple.com/guide/japanese-input-method/welcome/mac)
- [Apple: Enter Japanese text using a Japanese input source on Mac](https://support.apple.com/guide/japanese-input-method/enter-japanese-text-jpim10265/mac)
- [MDN: CompositionEvent](https://developer.mozilla.org/en-US/docs/Web/API/CompositionEvent)
- [MDN: compositionstart event](https://developer.mozilla.org/en-US/docs/Web/API/Element/compositionstart_event)
- [MDN: compositionend event](https://developer.mozilla.org/en-US/docs/Web/API/Element/compositionend_event)
- [MDN: KeyboardEvent.isComposing](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/isComposing)
