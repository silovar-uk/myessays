---
id: react-declarative-ui-who-does-the-dom-work
title: "Reactは「DOMを触るな」と言いながら、自分では触っている――宣言的UIとは誰の仕事を奪ったのか"
subtitle: "「何を表示するか」を書くと、誰かが「どう変えるか」を引き受ける"
created: "2026-09-14"
updated: "2026-09-14"
type: "Essay"
status: "完成"
tags: ["React", "宣言的UI", "フロントエンド", "状態管理", "UI設計", "JavaScript"]
keywords: ["React", "declarative UI", "imperative UI", "DOM", "state", "render", "commit", "ref", "Effect"]
favorite: 5
grow: 5
abstract: "ReactはUIを『宣言的』に書けと言う。DOMを直接show/hideするのではなく、stateに応じて画面がどう見えるべきかを記述する。ところがReact自身はcommit段階でappendChild()などを使い、結局DOMを命令的に変更している。では宣言的UIとは『命令が消えること』なのか。本稿では5状態のフォームを命令型と宣言型で比べ、render・commit・ref・Effectまで追いかける。見えてきたのは、宣言型とは命令をなくす思想ではなく、『遷移の手順を誰が引き受けるか』を組み替える設計だということだった。"
---

# Reactは「DOMを触るな」と言いながら、自分では触っている
## 「何を表示するか」を書くと、誰かが「どう変えるか」を引き受ける

Reactの説明を読むと、UIは「宣言的」に書く、と出てくる。

DOMの部品をひとつずつ操作するのではなく、stateに応じて「今はこう見えてほしい」と書く。

なるほど。

では、そのDOMを実際にいじっているのは誰なのか。

**Reactである。**

React公式の「Render and Commit」を読むと、初回レンダーではReactが `appendChild()` を使ってDOMノードを画面へ置き、再レンダーでは前回との差分から必要なDOM操作を適用すると、かなり普通に書いてある。

お前、触っとるやないか。

ここで「宣言的」という言葉が急に怪しく見えてきた。

Reactは本当に命令型をやめたのか。

それとも、**命令を自分の見えないところへ移しただけ**なのか。

この疑問を、ひとつの小さなフォームを異様に真面目に追いかけて考えてみる。

[React: Render and Commit](https://react.dev/learn/render-and-commit)

---

## 1. まず、送信フォームを5つの世界に分ける

React公式の「Reacting to Input with State」には、宣言型UIを説明するためのフォーム例がある。

ざっくり言えば、画面には次のような状態がある。

- **empty** — 入力欄が空。送信ボタンは押せない
- **typing** — 文字が入った。送信ボタンを押せる
- **submitting** — 送信中。入力欄とボタンを無効化し、待機表示を出す
- **error** — 失敗。エラーを出して再入力できる
- **success** — 成功。フォームを消して完了表示を出す

ここで重要なのは、見た目の部品が5個あることではない。

**「画面全体がいま何状態なのか」を先に考えること**である。

自分はReactの `useState` を最初に覚えたころ、stateを「値を保存しておく箱」くらいに思っていた。

それも間違いではない。

でも公式ドキュメントは、もう少し設計寄りのことをやっている。

先にvisual statesを列挙し、人間の入力やネットワーク応答がどの状態遷移を起こすかを整理し、そのあとで必要最小限のstateを決める。

つまりReactの宣言型UIは、JSXの書き方より前に、**画面を状態機械として見る癖**から始まっている。

[React: Reacting to Input with State](https://react.dev/learn/reacting-to-input-with-state)

---

## 2. 命令型UIは「今どこにいるか」より「次に何をするか」を書く

Reactを使わずDOMを直接操作するなら、送信開始時にはこんな仕事が発生する。

```js
textarea.disabled = true;
button.disabled = true;
loading.hidden = false;
error.hidden = true;
```

失敗したら、今度は逆方向へ戻す。

```js
textarea.disabled = false;
button.disabled = false;
loading.hidden = true;
error.hidden = false;
```

成功したら、フォームを隠し、成功メッセージを出す。

ひとつひとつは難しくない。

むしろ分かりやすい。

問題は、画面が増えてくると「何をしたか」の履歴にUIの正しさが依存し始めることだ。

エラー表示を消し忘れた。

ボタンだけ有効に戻し忘れた。

ローディングを出したまま成功画面へ行った。

命令型UIでは、画面の現在形を作るために、**過去の操作が全部ちゃんと実行されていること**を期待する。

React公式はこれを、車の隣で「次を右、次を左」と一手ずつ指示することにたとえている。

目的地より、曲がり方をこちらが管理する。

これは小さい画面なら普通にできる。

ただ、状態と部品が増えるほど、こちらが覚える曲がり角も増える。

---

## 3. 宣言型にすると、命令が消えるのではなく「現在形」が主語になる

同じフォームをReactで書くと、発想が少し変わる。

```jsx
function AnswerForm({ status, answer, error }) {
  const isSubmitting = status === 'submitting';

  if (status === 'success') {
    return <p>送信できました。</p>;
  }

  return (
    <form>
      <textarea disabled={isSubmitting} value={answer} />
      <button disabled={isSubmitting || answer.length === 0}>
        送信
      </button>
      {isSubmitting && <p>送信中…</p>}
      {status === 'error' && <p>{error}</p>}
    </form>
  );
}
```

ここには `hide(error)` がない。

`show(loading)` もない。

代わりにあるのは、

**「statusがsubmittingなら、こういう画面」**

**「statusがerrorなら、こういう画面」**

という現在形の記述である。

かなり乱暴に式にすると、こうなる。

```text
UI = f(state)
```

stateを入れる。

そのstateに対応するUIの記述が返る。

React公式がコンポーネントをpure function、つまり「同じ入力なら同じJSXを返す」ものとして扱うのは、この考え方とつながっている。renderの途中で外の何かを書き換えず、まずは現在のprops・state・contextから、画面の記述を計算する。

ここでようやく「宣言」という言葉が少し見えてきた。

**ブラウザへ命令しているのではなく、Reactへ“望む結果”を申告している。**

[React: Keeping Components Pure](https://react.dev/learn/keeping-components-pure)

---

## 4. では本当に命令は消えたのか。Reactの裏口を見に行く

消えていない。

ここが今回いちばん面白かった。

Reactはrenderとcommitを分けて説明している。

renderでは、コンポーネントを呼び出して「次のUIがどうあるべきか」を計算する。

commitでは、その結果を現実のDOMへ反映する。

そしてcommitでは、React自身がDOMを変更する。

初回なら `appendChild()`。

更新なら、前回の結果と比べて必要な操作だけを適用する。

つまり、

```text
自分のコード: こうなってほしい
          ↓
React:      了解。前回との差を計算する
          ↓
DOM API:    実際に変更する
```

という分業になっている。

**命令は消えたのではなく、境界の向こう側へ移った。**

この一点で、自分の「宣言型」の理解がかなり変わった。

宣言型とは、コンピュータの中から命令文を絶滅させることではない。

アプリを書く側の主要なインターフェースを、

「この要素を消せ」

から、

「この状態なら、このUIである」

へ変えることなのだ。

Reactは命令型を否定しているというより、**命令型の帳尻合わせを自分の担当にしている。**

[React: Render and Commit](https://react.dev/learn/render-and-commit)

---

## 5. 念のため他の世界も見たら、Reactだけの思想ではなかった

ここで一回、Reactのすごさを語りすぎそうになった。

なので他のUIフレームワークも見た。

AppleのSwiftUIは、自身をdeclarative approachと説明し、従来のimperative approachではコントローラ側がviewの生成・配置・設定だけでなく、条件が変わるたびの更新まで担っていた、と整理している。SwiftUIでは望むview階層を記述し、イベントやstate changeに応じた描画・更新をframework側が管理する。

AndroidのJetpack Composeも、imperatively mutating frontend viewsをせずにUIをrenderするdeclarative APIだと説明している。概念的には現在stateから画面を作り直し、必要な変更だけを適用する。

だいたい同じ話をしている。

Reactだけが突然「宣言」という哲学を発明したわけではない。

むしろ現代UIのかなり大きな流れとして、

**mutableな画面部品をアプリ側が逐一管理する → stateからUIを記述し、更新作業をframeworkへ渡す**

という方向がある。

これはReactを小さく見せる話ではない。

逆に、「Reactの文法」を覚えていたつもりが、実はもっと広いUI設計の考え方を触っていた、と分かった。

[Apple Developer: Declaring a custom view](https://developer.apple.com/documentation/swiftui/declaring-a-custom-view)

[Apple Developer: SwiftUI](https://developer.apple.com/swiftui/)

[Android Developers: Thinking in Compose](https://developer.android.com/develop/ui/compose/mental-model)

---

## 6. もう一歩やりすぎる。「フォーカス」は宣言だけで書けるのか

ここで極端な問題を出す。

ボタンを押した瞬間、入力欄へカーソルを移したい。

これは「入力欄が存在する」という画面の形だけでは足りない。

**今、この瞬間に、そのDOMノードへ `focus()` を実行したい。**

急に命令っぽい。

Reactでは、こういうとき `ref` を使ってDOMノードを取り出し、イベントハンドラから `focus()` を呼べる。

```jsx
const inputRef = useRef(null);

function handleClick() {
  inputRef.current.focus();
}

return (
  <>
    <input ref={inputRef} />
    <button onClick={handleClick}>入力欄へ移動</button>
  </>
);
```

公式ドキュメントはrefを **escape hatch** と呼ぶ。

逃げ道。

宣言型の国境に、ちゃんと出国ゲートがある。

スクロール、フォーカス、要素サイズの計測、React外のライブラリとの連携など、現実にはDOMや外部システムへ直接触る必要がある。

同じくEffectも、Reactの外部システムと同期するためのescape hatchとして説明される。

しかもReact公式は、外部システムがないならEffectは要らない場合が多い、とかなり強く言っている。

つまりReact自身が、

- 画面の計算はrenderで宣言的に書く
- ユーザー操作に直接反応する処理はevent handlerへ置く
- DOMを直接扱う必要があるならrefを使う
- 外部システムとの同期が必要ならEffectを使う

と、境界を分けている。

宣言型か命令型かは、善か悪かではなかった。

**どの種類の仕事を、どの層へ置くかの話だった。**

[React: Manipulating the DOM with Refs](https://react.dev/learn/manipulating-the-dom-with-refs)

[React: Synchronizing with Effects](https://react.dev/learn/synchronizing-with-effects)

[React: You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect)

---

## 7. 宣言型にしても、state設計が雑なら普通に壊れる

ここで「宣言型にすれば複雑さが消える」と書くと、また嘘になる。

複雑さは消えない。

**置き場所が変わる。**

たとえば、

```js
const [isLoading, setIsLoading] = useState(false);
const [isSuccess, setIsSuccess] = useState(false);
const [hasError, setHasError] = useState(false);
```

と3つのbooleanを別々に持つと、理論上は `isLoading === true` なのに `isSuccess === true` という妙な組み合わせも作れてしまう。

画面に「送信中です」と「送信完了しました」が同時に出る世界が生まれる。

めでたくない。

だからReact公式のフォーム例は、重複したstateや矛盾を生むstateを減らす方向へ整理する。

宣言型UIの強さは、「stateからUIを導く」ことにある。

ならば当然、**stateのほうが世界を正しく表していないと、正しく間違ったUIが出る。**

この言い方は変だが、たぶん正しい。

Reactは手順管理の負担を減らす。

しかし、「このアプリにはどんな状態が存在するのか」を考える仕事までは代わってくれない。

むしろそこが前より露骨になる。

---

## 8. 「DOMを触るな」ではなく、「DOMの都合をアプリの物語に持ち込むな」

最初の疑問へ戻る。

Reactは「DOMを直接操作するな」と言いながら、自分ではDOMを操作している。

矛盾しているように見えた。

でも、いまは少し違って見える。

Reactが取り上げたのはDOM操作そのものではない。

**アプリを書く人が、画面状態とDOM操作の対応表を頭の中で持ち続ける仕事**を引き取ったのだ。

こちらは、

「送信中なら入力できない」

「失敗ならエラーが見える」

「成功なら完了画面になる」

という、アプリ側の世界を書く。

Reactは、その記述を現実のDOMへ変換するために、裏でかなり命令的に働く。

だから「宣言的UI」を、いまならこう言いたい。

> **宣言的UIとは、命令が存在しないUIではない。自分が“どう変更するか”を主語にせず、“いま何であるか”を主語にできるUIである。**

JSXを最初に見たとき、自分には「JavaScriptの中にHTMLみたいなものを書いている」ように見えていた。

調べたあとでは、少し違う。

JSXは見た目のテンプレートというより、stateに対する**契約書**に見える。

このstateなら、このUI。

遷移の細かい後始末は、Reactが持つ。

そして必要になったときだけ、refやEffectという非常口から外へ出る。

「宣言的」という言葉は、ふわっとした格好いい形容詞ではなかった。

**誰が複雑さを引き受けるのかを決める、仕事の分配表だった。**

---

## 参考資料

- [React — Reacting to Input with State](https://react.dev/learn/reacting-to-input-with-state)
- [React — Render and Commit](https://react.dev/learn/render-and-commit)
- [React — Keeping Components Pure](https://react.dev/learn/keeping-components-pure)
- [React — Manipulating the DOM with Refs](https://react.dev/learn/manipulating-the-dom-with-refs)
- [React — Synchronizing with Effects](https://react.dev/learn/synchronizing-with-effects)
- [React — You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect)
- [Apple Developer — Declaring a custom view](https://developer.apple.com/documentation/swiftui/declaring-a-custom-view)
- [Apple Developer — SwiftUI](https://developer.apple.com/swiftui/)
- [Android Developers — Thinking in Compose](https://developer.android.com/develop/ui/compose/mental-model)
