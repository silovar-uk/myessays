---
id: prompt-caller-what-i-built-windows-app
title: "Prompt Callerって結局、何を作ったのか"
subtitle: "ショートカット一つから見えてきた、Windowsアプリの裏側"
created: "2026-09-01"
updated: "2026-09-01"
type: "Learning Essay"
status: "完成"
tags: ["ソフトウェア", "Windows", "Tauri", "個人開発", "アプリ設計", "信頼性"]
keywords: ["Prompt Caller", "Tauri", "Rust", "TypeScript", "global shortcut", "autostart", "Windows", "runtime", "desired state", "actual state"]
favorite: 4
grow: 5
abstract: "Prompt Callerは、よく使う文章を保存し、Windowsのどこからでもショートカットで呼び出して検索・コピーできる小さな常駐アプリである。本稿では、使う場面から出発し、画面・Tauri・Rust・Windowsの関係、Global ShortcutやTray、Autostartの役割を初心者向けに整理する。さらに、再起動後に動かなかった実際の不具合を題材に、設定上のDesired Stateと現実のActual State、そして『壊れない』より『壊れ方を分けられる』ことの大切さまで考える。"
---

# Prompt Callerって結局、何を作ったのか
## ショートカット一つから見えてきた、Windowsアプリの裏側

「最近、何を作ってるの？」と聞かれたとき、意外と説明が難しい。

Prompt Callerは自分では毎日のように触っているし、何をしたくて作ったのかも分かっている。けれど、いざ言葉にしようとすると、TauriだとかRustだとか、急に技術用語が前へ出てきてしまう。

たぶん説明したいのは、そこじゃない。

まずは、使っている場面から考えた方が分かりやすい。

---

## 1. まず、使っている場面から考える

文章を書いている途中で、よく使う指示文や定型文が欲しくなる。

```text
文章を書いている
↓
Ctrl + Alt + P
↓
小さなPrompt Callerが出る
↓
キーワードを入力する
↓
候補を選んでEnter
↓
文章がClipboardに入る
```

あとは、元いた場所へ貼り付ければいい。

これがPrompt Callerの中心である。

だから、一言で言えば、**よく使う文章をすぐ呼び出すための「文章ランチャー」**だと思っている。

メモ帳とは少し違う。文章をじっくり書きためることより、「今この瞬間に欲しい文章へすぐ到達する」ことが主役だからだ。

Clipboard履歴とも違う。過去にコピーしたものを探すのではなく、自分で使いたい文章をあらかじめ登録しておく。

AIでもない。Prompt Caller自身が文章を考えてくれるわけではない。むしろ、自分がすでに作った文章やプロンプトを、毎回探し直さなくて済むようにする道具である。

このくらいなら、技術を知らなくても説明できる。

---

## 2. なぜ普通のWebページではなく、Windowsアプリなのか

ここから少し仕組みの話になる。

最初に欲しかったのは、「ブラウザで開ける便利なページ」ではなかった。

Wordを使っていても、Slackを見ていても、ブラウザでChatGPTを開いていても、**どこからでも同じキーで呼び出したかった**。

そのためには、Prompt Caller自身の画面にフォーカスがない状態でも、`Ctrl + Alt + P`を受け取らなければならない。

普通のWebページで使う`keydown`は、そのページが開かれていて、そこでキー入力を受け取れる状態が基本になる。一方、Prompt Callerが使っているGlobal Shortcutは、OS側へショートカットを登録することで、別のアプリを操作していてもキーを受け取れる。

Tauriには、このGlobal Shortcutを扱う公式pluginが用意されている。

ここで初めて、「これはWebページではなくWindowsアプリである必要がある」という理由が見えてくる。

---

## 3. Tauriは「Webっぽい画面」とWindowsの間にいる

Prompt Callerの見た目は、かなりWebページに近い。

検索欄、ボタン、文章の一覧。こうした部分はHTML、CSS、TypeScriptというWeb系の技術で作っている。

一方で、Windows全体のショートカットを登録したり、Task Trayに常駐したり、Clipboardへ文章を書き込んだりする部分は、ただのWebページだけでは扱いにくい。

そこで間にいるのがTauriである。

Tauri公式の説明では、Rust側の仕組みと、WebView上で描画されるHTMLを組み合わせてデスクトップアプリを作る構造になっている。

かなり雑に図にすると、こうなる。

```text
利用者
  ↓
Prompt Callerの画面
HTML / CSS / TypeScript
  ↓
Tauri
  ↓
Rust側の処理
  ↓
Windows
```

Tauriそのものを「全部をやるもの」と考えるより、**Web技術で作った画面と、Windowsに近い処理をつなぐ橋**くらいに考えると、自分には分かりやすかった。

もちろん内部はもっと複雑だ。でも、まずこの地図があるだけで、コードを見たときの迷子感がかなり減る。

---

## 4. Ctrl+Alt+Pを押したとき、裏側では何が起きているのか

`Ctrl + Alt + P`は、Prompt Callerの画面が自分で見張っているわけではない。

起動時に、アプリがWindowsへ「このキーの組み合わせを自分が使いたい」と登録する。

```text
Ctrl + Alt + P
↓
Windows
↓
Global ShortcutとしてPrompt Callerへ通知
↓
Rust側のcallback
↓
ランチャーを表示
```

ここで「callback」という言葉が出てくる。

難しそうだが、要するに**何かが起きたときに呼ばれる処理**くらいでいい。

ショートカットが押されたら、この処理を呼んでください、と先に登録しておく。

だからPrompt Callerは、画面をずっと前面に出して待っている必要はない。

---

## 5. 「常駐する」は、画面を出しっぱなしにすることではない

ここは、作っていて意外と大事だった。

Prompt Callerは常駐アプリだけれど、常にウィンドウが見えているわけではない。

```text
process       動いている
window        普段は隠れている
tray          待機場所として存在する
shortcut      Windowsに登録されている
```

この4つは別々である。

画面を閉じたからといって、必ずしもアプリ全体が終了したわけではない。逆に、画面が見えていなくても、裏側のprocessが動いていればGlobal Shortcutを待てる。

この「process」と「windowを分けて考える」感覚は、最初はあまり持っていなかった。

アプリというと、どうしても目に見える画面そのものを想像してしまう。でも常駐アプリでは、むしろ**見えていない時間の方が長い**。

Prompt Callerは、必要なときだけ現れて、それ以外は静かに待っている。その待ち方まで含めてアプリなのである。

---

## 6. 再起動したら動かなかった。ここから急にWindowsが見えてきた

この感覚が一番よく分かったのが、自動起動の不具合だった。

設定画面では「Windows起動時に自動で開始」がONになっている。

でもPCを再起動すると、`Ctrl + Alt + P`を押しても何も出ない。

最初は「ショートカットが壊れたのかな」と思いやすい。

ところが、分解すると原因候補は少なくともこれだけある。

```text
Windowsへログイン
↓
Prompt Caller自体が起動したか
↓
Global Shortcutを登録できたか
↓
キー入力を受け取れたか
↓
windowを表示できたか
```

全部、利用者から見れば「Ctrl+Alt+Pが効かない」である。

けれど中では全然違う。

実際に調べていくと、このPCで起きていた問題はGlobal Shortcutより前だった。Windowsの`Run`という自動起動用の登録にはPrompt Callerが存在していたのに、実行ファイルのパスに空白が含まれており、そのコマンドが引用符で囲まれていなかった。

WindowsのRunキーは、ユーザーのログオン時にプログラムを起動するための仕組みである。Microsoftの資料でも、Runキーへ`description-string=commandline`という形で起動コマンドを登録することが説明されている。

Prompt Callerでは、この登録値を引用符付きに補正する処理を加えた。

面白かったのは、**「自動起動はONです」という状態と、「次回ログイン時に本当に正しいアプリが起動する」という事実は同じではなかった**ことだ。

ONなのに動かない。最初はちょっと変な感じがする。でも、ここから次の考え方がかなり腑に落ちた。

---

## 7. Desired StateとActual State――「こうしたい」と「実際にそうなっている」は別

Prompt Callerの設定には、たとえば「自動起動をONにしたい」という意思が保存される。

これをDesired State、つまり**望んでいる状態**と考える。

一方、Windowsが実際にどうなっているかはActual State、**現実の状態**である。

```text
Desired State
自動起動 = ONにしたい

Actual State
Windowsでは本当に起動できる状態か？
```

普通に使えているとき、この2つの違いを意識することはほとんどない。

でも壊れたときは重要になる。

設定ファイルに`true`と書いてあるから正常、ではない。Global Shortcutも、「Ctrl+Alt+Pを使う設定になっている」ことと、「今このprocessがWindowsへ登録できている」ことは別である。

Prompt Callerには、そのズレを見るRuntime Healthという考え方を入れている。

名前は少し技術的だけれど、自分の中では、**設定表を見るのではなく、今ほんとうにそうなっているかを見る場所**くらいの理解でいる。

---

## 8. 「壊れない」より、「どこで壊れたか分かる」

もちろん、壊れないのが一番いい。

でも常駐アプリはWindowsの状態にも影響される。ショートカットが他のアプリと競合することもあるし、windowだけおかしくなる可能性もある。保存した設定とRuntimeがずれることもある。

そこで途中から、目標が少し変わってきた。

**絶対に壊れない仕組みを作るというより、壊れたときに一種類の「動きません」で終わらせない。**

考え方を並べると、こんな感じになる。

```text
Prevent   そもそも起こりにくくする
Detect    起きたことに気づく
Explain   何が起きているか分かる
Recover   戻せる
```

たとえば起動キーがWindowsに登録されていなければ、その状態をHealthで検知する。必要なら再登録する。

windowの表示に失敗したら、一度だけ再生成を試す。

Entry用のショートカットについても、「登録したはず」ではなく、現在processが何を所有しているかを追跡する。

このあたりから、Prompt Callerは単なる文章呼び出しUIというより、**小さいけれど状態を持ったWindowsアプリ**なんだな、という感覚が強くなった。

---

## 9. 4層で見ると、かなり説明しやすい

今のところ、Prompt Callerを理解するときは次の4層に分けるのが一番分かりやすい。

| 層 | Prompt Callerでは |
|---|---|
| 利用者の操作 | Ctrl+Alt+P、検索、Enter、貼り付け |
| 画面 | 検索欄、Entry一覧、設定、Health表示 |
| アプリ本体 | Entry管理、保存、shortcutの状態管理、復旧処理 |
| Windows | Global Shortcut、Clipboard、Tray、Autostart、Window |

画面だけを見ていると、「アプリを作る＝UIを作る」ように感じる。

でもPrompt Callerで時間がかかったところは、むしろ下の層だった。

Windows起動後にちゃんと生きているか。ショートカットを本当に持っているか。windowを隠した後に戻ってこられるか。設定と現実がずれたときに分かるか。

たぶん、自分が今回いちばん知ったのはRustの文法ではなく、**アプリは画面の外側でもずっと何かをしている**ということかもしれない。

---

## 10. この記事を読んだあと、自分ならこう説明する

### 10秒で説明

Prompt Callerは、よく使う文章を保存しておいて、Windowsのどこからでもショートカットですぐ呼び出してコピーできるアプリ。

### 30秒で説明

Prompt Callerは、よく使う文章やプロンプトを登録しておいて、`Ctrl+Alt+P`でいつでも呼び出し、検索してClipboardへコピーできるWindows常駐アプリ。画面はWeb系の技術で作っていて、TauriとRustを使ってWindowsのGlobal Shortcut、Tray、Clipboard、自動起動などと連携している。

### 仕組みまで説明

画面はHTML・CSS・TypeScriptで作り、Windowsに近い処理はTauriとRust側が担当している。アプリは普段windowを隠しながらprocessとして待機し、Windowsへ登録したGlobal Shortcutを受け取るとwindowを表示する。さらに、設定上のDesired Stateと実際のRuntimeのActual Stateを分けて見て、ショートカットや自動起動が本当に反映されているか確認・修復できるようにしている。

---

## 11. 最初は「文章を呼ぶだけ」のつもりだった

最初に欲しかったのは、かなり単純だった。

よく使う文章を保存して、キー一つですぐ出したい。

それだけだったはずなのに、作っていくと、起動する、待つ、Windowsと話す、保存する、状態を確認する、壊れたら戻す、という話がどんどん出てきた。

思ったより、「待っているだけ」が難しい。

でも、その難しさを一つずつ分けて見ていくうちに、アプリというものの見え方が少し変わった気がする。

**画面を作ったら完成、ではない。見えていない時間にもちゃんと生きていて、呼ばれたら出てきて、何かおかしくなったら戻ってこられる。そこまで含めてアプリなんだ。**

Prompt Callerは小さい道具だけれど、自分にとっては、そのことをかなり具体的に教えてくれたアプリになった。

---

### Sources

- [Tauri Architecture](https://v2.tauri.app/concept/architecture/)
- [Tauri Global Shortcut plugin](https://v2.tauri.app/plugin/global-shortcut/)
- [Tauri Autostart plugin](https://v2.tauri.app/plugin/autostart/)
- [Microsoft Learn: Run and RunOnce Registry Keys](https://learn.microsoft.com/en-us/windows/win32/setupapi/run-and-runonce-registry-keys)
