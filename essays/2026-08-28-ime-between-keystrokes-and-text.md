---
id: ime-between-keystrokes-and-text
title: "「nihongo」が「日本語」になるまで――IMEは何をしているのか"
subtitle: "キーボードと文字のあいだにいる、見えない入力システム"
created: "2026-08-28"
updated: "2026-08-28"
type: "Learning Paper"
status: "完成"
tags: ["IME", "日本語入力", "キーボード", "Web", "ブラウザ", "入力システム"]
keywords: ["IME", "Input Method Editor", "composition", "candidate", "commit", "isComposing", "CompositionEvent", "日本語入力"]
favorite: 4
grow: 5
abstract: "ローマ字でnihongoと打ったのに、最終的に画面へ残るのは「日本語」。その途中では、キーボード、IME、OSの入力システム、アプリが別々の役割を担っている。本稿では、IMEを単なる『漢字変換ソフト』ではなく、限られた入力操作から意図した文字列を組み立てる仕組みとして捉える。変換中のcompositionと確定後のtextの違い、スマホ入力、多言語入力、Web開発で起きるEnterキー問題まで、普段は見えない文字入力の裏側を整理する。"
---

# 「nihongo」が「日本語」になるまで――IMEは何をしているのか
## キーボードと文字のあいだにいる、見えない入力システム

PCで「日本語」と入力するとき、たとえばローマ字入力なら、指はまず `nihongo` とキーを押している。

ところが画面に最終的に残るのは、`nihongo` でも「にほんご」でもなく、**「日本語」**だ。

考えてみると不思議である。

キーボードの `N` キーには「日」という文字は書かれていない。それなのに、いくつかのキー操作を経ると「日」が現れる。

その間で働いている代表的な仕組みが、**IME（Input Method Editor）**である。

MicrosoftはIMEを、標準的なQWERTYキーボードでは簡単に表現できない言語の文字入力を支えるソフトウェアコンポーネントと説明している。キーストロークの組み合わせを解釈し、文字を生成したり、候補一覧を提示したりする仕組みだ。

[Microsoft Learn: 入力メソッド エディター (IME)](https://learn.microsoft.com/ja-jp/windows/apps/develop/input/input-method-editors)

一言でいえば、IMEは**「押されたキーを、そのまま文字にするのではなく、入力しようとしている文字列へ解釈する層」**である。

## 1. `nihongo` が「日本語」になるまで

いつもの操作を分解してみる。

```text
nihongo
  ↓
にほんご
  ↓
変換候補
  ├ 日本語
  ├ 二本語
  └ ……
  ↓
日本語
  ↓
確定
```

普段は一続きの「入力」に見えるが、実際にはいくつかの段階がある。

### ① キーを押す

まず物理キーボードや画面上のキーボードから、キー操作が入る。

ここで起きているのは、まだ最終的な文章の決定ではない。

### ② ローマ字をかなとして解釈する

日本語のローマ字入力なら、`ni` を「に」、`ho` を「ほ」のように解釈して、読みを組み立てていく。

`nihongo` は「にほんご」という読みになる。

### ③ 変換候補を作る

「にほんご」という読みから、IMEは文脈や辞書などを使って候補を提示する。

たとえば「日本語」が第一候補になるかもしれないし、入力内容によって別の候補も出る。

Appleの日本語入力でも、入力したかなテキストに対して候補表示ウインドウから文字や語句を選べる。macOSには、入力中にひらがなを漢字などへ自動変換するライブ変換もある。

[Apple: 日本語入力プログラムユーザガイド](https://support.apple.com/ja-jp/guide/japanese-input-method/welcome/mac)

### ④ 候補を選ぶ

ユーザーがSpaceや候補選択UIなどを使い、「日本語」を選ぶ。

### ⑤ 確定する

最後にEnterなどで確定すると、その文字列が編集対象へ正式な入力として渡される。

ここで重要なのは、**「画面に文字が見えている」ことと「入力が確定している」ことは同じではない**という点だ。

## 2. キーボードとIMEは別物

IMEを理解するとき、一番混ざりやすいのがキーボードとの違いである。

キーボードは、入力操作を受け取る装置だ。

IMEは、その操作を使って、どの文字列を入力しようとしているかを組み立てる仕組みだ。

概念的には、次のように分けると分かりやすい。

```text
指
 ↓
Keyboard
 ↓
IME / Input Method
 ↓
OSの入力システム
 ↓
Application
```

ただし、これは理解のための単純化である。実際の実装ではIMEやOS、アプリ間の責任分担はプラットフォームごとに異なる。

それでも、**Keyboard = IMEではない**という区別は重要だ。

同じ物理キーボードでも、英字入力、日本語入力、中国語入力など、入力方式を切り替えられる。

つまり、キーボードが同じでも、**「その操作をどう文字として解釈するか」**は変えられる。

## 3. 変換中の文字は、まだ完成した文章ではない

日本語入力中、文字の下に線が付いていたり、変換候補が表示されていたりすることがある。

あの状態は、すでに画面には文字が見えているが、まだ編集途中である。

Webの世界では、このような入力途中の状態を扱う概念として **composition** がある。

MDNでは、IMEなどのテキスト変換システムが新しい変換セッションを開始すると `compositionstart`、変換内容が更新されると `compositionupdate`、変換を完了またはキャンセルすると `compositionend` が発生すると説明されている。

[MDN: compositionstart event](https://developer.mozilla.org/en-US/docs/Web/API/Element/compositionstart_event)

[MDN: compositionend event](https://developer.mozilla.org/en-US/docs/Web/API/Element/compositionend_event)

ざっくり言えば、

```text
compositionstart
      ↓
「にほんご」← まだ変換・編集できる
      ↓
「日本語」← 候補を選んでいる途中
      ↓
compositionend
      ↓
確定した「日本語」
```

という感覚である。

「文字が表示された瞬間」と「ユーザーがその文字列を確定した瞬間」を分けて考える必要がある。

## 4. だからWeb開発ではIMEが急に姿を現す

普通にPCを使っているだけなら、IMEの存在を強く意識する必要はない。

しかし入力フォームを作ると、急にIMEが設計上の問題として現れる。

たとえば、チャット欄でこんな仕様を作ったとする。

> Enterを押したら送信する。

英字だけなら比較的単純だ。

ところが日本語入力では、Enterは**変換候補を確定する操作**にも使われる。

もしアプリが「Enterが押された」という事実だけを見て送信すると、ユーザーは「日本語」という言葉を確定しただけなのに、メッセージまで送られてしまうことがある。

そこでWeb APIには、キーボードイベントが変換セッション中かを確認する `KeyboardEvent.isComposing` という情報がある。MDNでは、`compositionstart` の後から `compositionend` の前までなら `true` になると説明している。

[MDN: KeyboardEvent.isComposing](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/isComposing)

概念だけ示すと、こうなる。

```js
input.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && !event.isComposing) {
    sendMessage();
  }
});
```

実際のイベント順序や挙動にはブラウザ・OS・フレームワーク差があるため、これだけですべてのIME問題が解決するわけではない。

ただ、重要なのは**「Enterには送信以外の意味がありうる」**と理解することだ。

## 5. なぜ英語入力ではIMEを意識しにくいのか

英語のQWERTYキーボードでは、多くの場合、押した英字キーと入力したい文字の対応が比較的直接的だ。

`a` を押せば `a`、`b` を押せば `b` と入力できる。

一方、日本語の漢字は、各文字を一つずつキーボードに並べることが現実的ではない。

だから、

```text
少数のキー
 ↓
読みや音などを入力
 ↓
大量の文字候補から選択
```

という中間処理が必要になる。

Microsoftの説明にある「標準QWERTYキーボードでは簡単に表現できない文字」という表現は、IMEの必要性をよく示している。

ただし、**「英語にはIMEがない」と覚えるのは雑すぎる**。

ここで大事なのは言語名ではなく、物理的な入力操作と、最終的に入力したい文字列が一対一で対応しない場合に、何らかの入力メソッドが必要になるという点である。

## 6. IMEは日本語専用ではない

IMEは日本語だけの話ではない。

Microsoftも、IMEの代表的な利用場面として東アジア言語を挙げている。

たとえば中国語では、発音をローマ字で表すPinyinを入力して漢字候補から選ぶ方式がある。MDNの `compositionstart` の説明でも、Pinyin IMEから中国語文字を入力する例が使われている。

韓国語でも、限られたキー操作からハングルの音節を組み立てて入力する。

ここまで来ると、IMEは単なる「漢字変換」より広く見える。

**キーボード上に直接並んでいない文字を、限られた入力操作から作るための仕組み。**

この捉え方の方が本質に近い。

## 7. スマホのフリック入力も、同じ問題を解いている

IMEという言葉を聞くと、Windowsのタスクバーにある「あ」「A」や、PCの変換候補を思い浮かべやすい。

しかし「限られた操作から大量の文字を入力する」という問題はスマートフォンにもある。

スマホでは物理キーボードの代わりに、オンスクリーンキーボード、フリック、予測候補などを使う。

MicrosoftもIMEがハードウェアキーボードだけでなく、タッチキーボードのようなオンスクリーンキーボードを支援できると説明している。

つまり本質は、「物理キーボードでSpaceを押して漢字変換すること」ではない。

**人間の小さな入力操作から、目的の文字列を効率よく生成すること**にある。

## 8. 自分のIMEを30秒だけ観察してみる

IMEは説明を読むより、自分で入力してみる方が理解しやすい。

テキスト欄を開いて、ゆっくり次を試す。

1. `nihongo` と入力する
2. 「にほんご」が出るところを見る
3. Spaceなどで変換する
4. 候補ウインドウを見る
5. 「日本語」を選ぶ
6. Enterで確定する
7. 下線や候補表示が消える瞬間を見る

普段は一瞬で終わる操作の中に、

```text
keystroke
→ interpretation
→ composition
→ candidate selection
→ commit
```

という複数の段階がある。

## 9. IMEは「入力」と「文字」の間にいる

IMEを知らないと、文字入力はこう見える。

```text
key → character
```

しかし日本語入力を一度分解すると、もう少し違って見える。

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

私たちは普段、「文字を打っている」と思っている。

けれどコンピュータ側では、必ずしも押したキーがそのまま文字になるわけではない。

その途中で、**人間の入力意図を、コンピュータ上の文字列へ翻訳する作業**がある。

IMEとは、その翻訳を担う代表的な仕組みである。

普段は見えない。

見えないからこそ、うまく動いている。

そして入力フォームを作った瞬間、その見えない層が急にこちらを向く。

「Enterを押した」。

それだけでは、まだユーザーが何をしたかったのかは分からないのである。

## 参考文献

- [Microsoft Learn: 入力メソッド エディター (IME)](https://learn.microsoft.com/ja-jp/windows/apps/develop/input/input-method-editors)
- [Apple: 日本語入力プログラムユーザガイド](https://support.apple.com/ja-jp/guide/japanese-input-method/welcome/mac)
- [Apple: Macで日本語入力ソースを使用して日本語を入力する](https://support.apple.com/ja-jp/guide/japanese-input-method/jpim10265/mac)
- [MDN: CompositionEvent](https://developer.mozilla.org/en-US/docs/Web/API/CompositionEvent)
- [MDN: compositionstart event](https://developer.mozilla.org/en-US/docs/Web/API/Element/compositionstart_event)
- [MDN: compositionend event](https://developer.mozilla.org/en-US/docs/Web/API/Element/compositionend_event)
- [MDN: KeyboardEvent.isComposing](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/isComposing)
