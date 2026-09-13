---
id: react-declarative-ui-who-does-the-dom-work
title: "Reactは「DOMを触るな」と言いながら、自分では触っている――宣言的UIとは誰の仕事を奪ったのか"
subtitle: "Declarative UI does not remove commands. It moves the responsibility."
mode: "english-mix"
english_ratio: 0.40
mix_unit: "sentence"
---

# Reactは「DOMを触るな」と言いながら、自分では触っている
## Declarative UI does not remove commands. It moves the responsibility.

Reactの説明を読むと、UIはdeclarativeに書く、と出てくる。

Instead of manipulating each DOM element directly, you describe what the UI should look like for the current state.

なるほど。

Then who actually changes the DOM?

**React does.**

React公式の「Render and Commit」を読むと、初回renderではReactが `appendChild()` を使ってDOM nodeを画面へ置き、re-renderでは必要なDOM operationsだけを適用すると書いてある。

So React tells us not to micromanage the DOM, and then React micromanages the DOM itself.

お前、触っとるやないか。

That contradiction is exactly where declarative UI becomes interesting.

Reactは本当にimperative programmingを消したのか。

Or did it simply move the imperative work behind a boundary?

小さな送信フォームを、必要以上に真面目に追いかけてみる。

[React: Render and Commit](https://react.dev/learn/render-and-commit)

---

## 1. First, turn one form into five different worlds

React公式の「Reacting to Input with State」には、declarative UIを説明するためのフォーム例がある。

The screen can be understood as a small set of visual states.

- **empty** — 入力欄が空。Submitできない
- **typing** — 文字が入った。Submitできる
- **submitting** — 送信中。inputとbuttonをdisableし、loadingを出す
- **error** — 失敗。errorを表示して再入力できる
- **success** — 成功。formを消して完了表示を出す

The important move is not “use five UI parts.”

**先に「画面全体はいま何状態なのか」を考える。**

When I first learned `useState`, I thought of state mainly as a box that stores changing values.

それも間違いではない。

But the React docs do something more structural.

先にvisual statesを列挙し、人間の入力やnetwork responseがどんなstate transitionを起こすかを整理し、そのあとで必要最小限のstateを決める。

So declarative UI starts before JSX.

**It starts by seeing the screen as a state machine.**

[React: Reacting to Input with State](https://react.dev/learn/reacting-to-input-with-state)

---

## 2. Imperative UI writes the next move

Reactを使わずDOMを直接操作するなら、submit開始時にはこんな指示を書く。

```js
textarea.disabled = true;
button.disabled = true;
loading.hidden = false;
error.hidden = true;
```

If the request fails, you reverse some of those commands.

```js
textarea.disabled = false;
button.disabled = false;
loading.hidden = true;
error.hidden = false;
```

成功したらformをhideし、success messageをshowする。

Each instruction is simple.

むしろ小さい例なら分かりやすい。

The trouble begins when correctness depends on the full history of previous operations.

エラー表示を消し忘れた。

The button was enabled, but the textarea stayed disabled.

loadingを消し忘れたままsuccessへ進んだ。

In an imperative UI, the present screen can depend on whether every past instruction ran correctly.

React公式はこれを、車の隣でdriverへ「次を右、次を左」とturn-by-turnで指示することにたとえている。

You manage the turns, not only the destination.

画面が大きくなるほど、覚える曲がり角も増えていく。

---

## 3. Declarative UI makes the present state the subject

同じformをReactで書くと、主語が変わる。

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

There is no `hide(error)` here.

`show(loading)` もない。

Instead, the code says what the UI is for the current state.

**If status is submitting, this is the UI.**

**If status is error, this is the UI.**

かなり乱暴にすると、こうなる。

```text
UI = f(state)
```

State in, UI out.

React公式がcomponentsをpure functionsとして扱い、「同じinputsなら同じJSX」と考えるのも、このモデルとつながっている。

During render, your component calculates the UI description from props, state, and context instead of changing the outside world.

ここで「declarative」の意味が少し具体的になる。

**You are not commanding the browser. You are describing the result to React.**

[React: Keeping Components Pure](https://react.dev/learn/keeping-components-pure)

---

## 4. But the commands did not disappear

ここでReactの裏側を見る。

React separates render from commit.

renderでは「次のUIがどうあるべきか」を計算する。

During commit, React applies the result to the real DOM.

そしてcommitでは、React自身がDOMを変更する。

On the initial render, the docs explicitly mention `appendChild()`.

更新時には、前回と比べて必要なoperationsだけを適用する。

```text
Your code:  This is what I want.
      ↓
React:      I will compare it with the previous result.
      ↓
DOM APIs:   Make the necessary changes.
```

**The imperative work did not vanish. It crossed the abstraction boundary.**

この一点で、自分のdeclarative UIの理解はかなり変わった。

Declarative programming is not a machine with no commands anywhere inside it.

アプリを書く側のmain interfaceが、

“hide this element”

から、

“for this state, the UI is this”

へ変わる。

React does not destroy imperative work.

**React takes responsibility for much of the bookkeeping.**

[React: Render and Commit](https://react.dev/learn/render-and-commit)

---

## 5. This is bigger than React

ここで「React独自の哲学」と言いすぎそうになった。

So I checked other modern UI frameworks.

AppleのSwiftUIも、traditional imperative approachではcontroller codeがviewの作成・配置・設定・更新を担うのに対し、declarative approachではdesired UIを記述し、frameworkがstate changesに応じて描画と更新を管理すると説明している。

Jetpack Compose on Android says almost the same thing.

Composeはfrontend viewsをimperatively mutateする代わりに、declarative APIでUIをrenderする。

Conceptually, the UI is produced from the current app state, and the framework applies the necessary changes.

つまりReactだけの話ではない。

There is a broader modern UI pattern:

**Stop manually maintaining a mutable view tree. Describe UI from state and let the framework own the update procedure.**

Reactのsyntaxを覚えていたつもりが、もっと広いUI designの考え方を触っていた。

[Apple Developer: Declaring a custom view](https://developer.apple.com/documentation/swiftui/declaring-a-custom-view)

[Apple Developer: SwiftUI](https://developer.apple.com/swiftui/)

[Android Developers: Thinking in Compose](https://developer.android.com/develop/ui/compose/mental-model)

---

## 6. Let’s push it too far: can focus be declarative?

極端な例を考える。

Click a button, and immediately move keyboard focus to an input.

これは「inputが存在する」というscreen descriptionだけでは足りない。

**At this moment, call `focus()` on this DOM node.**

急にimperativeである。

Reactでは、こういうとき `ref` でDOM nodeを取り出し、event handlerから `focus()` を呼べる。

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

React calls refs an **escape hatch**.

逃げ道。

The declarative country has an exit gate.

focus、scroll、measurement、non-React libraryとの接続など、現実にはDOMやexternal systemsへ直接触る必要がある。

Effects are another escape hatch for synchronization with external systems.

さらにReact公式は、external systemが関係しないならEffectは不要なことが多い、と説明している。

That gives us a useful boundary map:

- **render / JSX** — current stateからscreenを計算する
- **event handler** — specific user actionに反応する
- **ref** — DOMへ直接触る必要がある
- **Effect** — external systemと同期する

Declarative vs. imperative is not good vs. evil.

**It is a question of where each kind of work belongs.**

[React: Manipulating the DOM with Refs](https://react.dev/learn/manipulating-the-dom-with-refs)

[React: Synchronizing with Effects](https://react.dev/learn/synchronizing-with-effects)

[React: You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect)

---

## 7. Declarative does not mean complexity disappears

ここでもう一つ止めておきたい。

Declarative UI does not magically remove complexity.

**It relocates complexity.**

たとえば、

```js
const [isLoading, setIsLoading] = useState(false);
const [isSuccess, setIsSuccess] = useState(false);
const [hasError, setHasError] = useState(false);
```

のようにindependent booleansを増やすと、`isLoading` と `isSuccess` が両方trueになる矛盾した状態も作れる。

The program can correctly render an impossible world.

「送信中です」と「送信完了しました」が同時に出る。

Congratulations. The UI is declarative and still wrong.

だからReact公式のform exampleは、redundant stateや矛盾するstateを減らす方向へ進む。

If UI is derived from state, state must represent the world well.

ReactはDOM手順のbookkeepingを引き受けてくれる。

But React cannot decide your product’s state model for you.

むしろ宣言型にすると、「このアプリには何状態が存在するのか」という設計問題が前に出てくる。

---

## 8. “Don’t touch the DOM” was the wrong lesson

最初の疑問へ戻る。

React tells us not to manipulate the DOM directly, while React itself manipulates the DOM.

最初は矛盾に見えた。

Now it looks more like division of labor.

Reactが取り上げたのはDOM操作そのものではない。

**It takes away the job of manually keeping UI state and DOM mutations in sync.**

こちらはアプリ側の世界を書く。

“While submitting, input is disabled.”

“On error, show the error.”

“On success, show the success screen.”

Reactは、そのdescriptionをreal DOMへ変換するために、裏でimperative workをする。

So my definition changed.

> **Declarative UI does not mean “there are no commands.” It means “how to mutate the UI” is no longer your main way of expressing the UI.**

JSXを初めて見たときは、JavaScriptの中にHTMLみたいなものを書いているように見えた。

Now it looks more like a contract with state.

This state → this UI.

The transition bookkeeping belongs mostly to React.

必要なときだけ、refやEffectというescape hatchから外へ出る。

The word “declarative” used to feel like a stylish adjective.

調べたあとでは、かなり実務的な言葉に見える。

**It is a responsibility map for complexity.**

---

## Sources

- [React — Reacting to Input with State](https://react.dev/learn/reacting-to-input-with-state)
- [React — Render and Commit](https://react.dev/learn/render-and-commit)
- [React — Keeping Components Pure](https://react.dev/learn/keeping-components-pure)
- [React — Manipulating the DOM with Refs](https://react.dev/learn/manipulating-the-dom-with-refs)
- [React — Synchronizing with Effects](https://react.dev/learn/synchronizing-with-effects)
- [React — You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect)
- [Apple Developer — Declaring a custom view](https://developer.apple.com/documentation/swiftui/declaring-a-custom-view)
- [Apple Developer — SwiftUI](https://developer.apple.com/swiftui/)
- [Android Developers — Thinking in Compose](https://developer.android.com/develop/ui/compose/mental-model)
