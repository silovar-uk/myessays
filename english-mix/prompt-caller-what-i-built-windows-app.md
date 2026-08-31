---
id: prompt-caller-what-i-built-windows-app
title: "Prompt Callerって結局、何を作ったのか — What Did I Actually Build?"
subtitle: "One shortcutから見えてきた、Windows appの裏側"
created: "2026-09-01"
updated: "2026-09-01"
type: "Learning Essay"
status: "完成"
abstract: "Prompt Callerは、よく使う文章を保存し、Windowsのどこからでもshortcutで呼び出して検索・copyできる小さなresident appである。使う場面から出発し、UI・Tauri・Rust・Windowsの関係、Global ShortcutやTray、Autostartの役割を整理する。さらに、reboot後に動かなかった実際のfailureを題材に、Desired StateとActual State、そして『壊れない』より『壊れ方を分けられる』というreliabilityの考え方までつなげる。"
---

# Prompt Callerって結局、何を作ったのか — What Did I Actually Build?
## One shortcutから見えてきた、Windows appの裏側

「最近、何を作ってるの？」と聞かれると、意外と説明がむずかしい。

Prompt Callerは自分では毎日のように触っている。でも説明しようとすると、Tauri、Rust、WebView、runtime……と、technical termsが急に前へ出てくる。

たぶん、start pointはそこじゃない。

まずは、**what it feels like to use it**から考えた方が分かりやすい。

---

## 1. まず、使っている場面から考える — start with the experience

文章を書いている途中で、よく使うpromptや定型文が欲しくなる。

```text
文章を書いている
↓
Ctrl + Alt + P
↓
Prompt Callerが出る
↓
search
↓
Enter
↓
text goes to the Clipboard
```

あとは元いた場所へpasteする。

That is the core of Prompt Caller.

一言で言えば、**a launcher for reusable text**。よく使う文章をすぐ呼び出すための「文章ランチャー」である。

メモ帳とは少し違う。The main job is not writing and storing long notes. 主役は「今ほしい文章へすぐ到達する」こと。

Clipboard historyとも違う。過去にcopyしたものを探すのではなく、自分がまた使いたいtextを先に登録しておく。

AIでもない。Prompt Caller itself doesn't generate the text. 自分ですでに作った文章やpromptを、毎回探し直さなくて済むようにする道具だ。

---

## 2. なぜWeb pageではなくWindows appなのか — why desktop matters

欲しかったのは、browserで開いているときだけ便利なpageではなかった。

Wordでも、Slackでも、browserでも、**from anywhere on Windows**、同じ`Ctrl + Alt + P`で呼び出したかった。

そのためにはPrompt Callerのwindowにfocusがなくても、key combinationを受け取る必要がある。

普通のWeb pageで使う`keydown`は、そのpage側がkey inputを受け取れる状態が基本になる。一方、Global ShortcutはOSへshortcutをregisterして、別のappを操作しているときでもeventを受け取る仕組みである。

TauriにはGlobal Shortcut用のofficial pluginがある。

ここで初めて、**this needs to be a desktop app, not just a webpage**という理由が見える。

---

## 3. TauriはWeb UIとWindowsの間にいる — a bridge between layers

Prompt Callerの見た目はかなりWebっぽい。

Search box、buttons、Entry list。These parts are built with HTML, CSS and TypeScript.

でも、Windows全体のshortcutをregisterする、Trayへ常駐する、Clipboardへ書き込む、自動起動を設定する、といった処理はOSに近い。

そこでTauriを使っている。

Tauri公式のarchitecture説明では、Rust側と、WebViewで描画されるHTMLを組み合わせてdesktop appを作る。

自分の理解では、こんな地図が一番分かりやすい。

```text
User action
  ↓
Prompt Caller UI
HTML / CSS / TypeScript
  ↓
Tauri
  ↓
Rust-side logic
  ↓
Windows
```

Tauriを「全部をやってくれる箱」と見るより、**a bridge between the Web-like UI and the operating system**と考える方が理解しやすかった。

---

## 4. Ctrl+Alt+Pで何が起きるのか — the shortcut path

`Ctrl + Alt + P`は、Prompt Callerの画面がずっと見張っているわけではない。

App startup時に、Windowsへこのshortcutをregisterする。

```text
Ctrl + Alt + P
↓
Windows
↓
Global Shortcut event
↓
Rust callback
↓
show launcher window
```

Callbackは、ざっくり言えば**a function that runs when something happens**。

「このshortcutが押されたら、この処理を呼んで」と事前に渡しておく。

だからPrompt Callerは、windowを前面に出しっぱなしにする必要がない。

---

## 5. 「常駐する」はwindowを出しっぱなしにすることではない

Resident appという言葉も、作る前より少し意味が変わって見える。

```text
process       running
window        usually hidden
tray          waiting point
shortcut      registered with Windows
```

These are separate things.

Windowを閉じたように見えても、processが生きていればapp全体が終了したとは限らない。逆にwindowが見えなくても、processが生きていればGlobal Shortcutを待てる。

アプリというとvisible UIを想像しやすい。でもPrompt Callerでは、**most of its life is spent invisible**と言ってもいい。

必要なときだけ出てきて、それ以外は静かに待つ。そのwaiting behaviorまで含めて製品である。

---

## 6. Rebootしたら動かなかった — when Windows became visible

この構造を一番実感したのがAutostartのfailureだった。

Settings上は「Windows起動時に自動で開始」がON。

でもPCをrebootすると、`Ctrl + Alt + P`を押しても何も出ない。

At first glance, it looks like a shortcut problem.

でもfailure pathを分けると、こうなる。

```text
Windows sign-in
↓
Did Prompt Caller start?
↓
Was the Global Shortcut registered?
↓
Did the callback run?
↓
Could the window be shown?
```

User perspectiveでは全部「Ctrl+Alt+Pが効かない」。でもinternal causeは全然違う。

実機調査では、このPCでのroot causeはGlobal Shortcutより前にあった。

Windowsの`Run` registry entryにはPrompt Callerが存在していた。でも実行ファイルのpathにspaceがあり、commandがquotesで囲まれていなかった。

MicrosoftのRun/RunOnce資料では、Run keyにログオン時のcommand lineを登録する仕組みが説明されている。Prompt Callerでは、登録値をquoted pathへ補正する処理を入れた。

ここで面白かったのは、**“Autostart is enabled” does not automatically mean “the correct app will actually launch next time.”**ということだった。

ONなのに動かない。その違和感から、Desired StateとActual Stateを分ける必要がかなり分かりやすくなった。

---

## 7. Desired StateとActual State — what we want vs what is real

Settingsに保存されているのは、ある意味ではwishである。

`autostart = true`は、**I want this to be on**というDesired State。

でもWindowsの現実は別にある。

```text
Desired State
Autostart should be ON

Actual State
Can Windows really launch this app at sign-in?
```

Global Shortcutも同じ。

「設定上Ctrl+Alt+Pになっている」と、「今のprocessがWindowsへそのkeyをregisterできている」はdifferent factsである。

Prompt CallerにはRuntime Healthという仕組みを入れて、configured stateとactual runtime stateのズレを見られるようにしている。

自分の中ではRuntime Healthを、**“設定表”ではなく“今ほんとうに動いているかを見る場所”**と考えると分かりやすい。

---

## 8. Reliabilityは「絶対壊れない」だけではない

Of course, not breaking is best.

でもWindows appはOSの状態と関係する。Shortcut conflictが起きるかもしれない。windowだけ壊れるかもしれない。保存設定とruntimeがdriftするかもしれない。

そこで途中から、goalが少し変わった。

**Don't turn every failure into the same “it doesn't work.”**

考え方はこんな順番になる。

```text
Prevent   prevent the bad state
Detect    notice it
Explain   make the problem understandable
Recover   return to a usable state
```

Launcher shortcutがregisteredでなければHealthで検知する。

Window showに失敗したら、bounded repairとして一度だけrebuildする。

Entry shortcutsについても、設定値だけではなく、current processが実際にownしているshortcutを追跡する。

こうして見るとPrompt Callerは、単なるsearch UIではなく、**a small stateful Windows application**だと分かってくる。

---

## 9. 4 layersで見る — a simple mental model

今の自分には、Prompt Callerを4 layersに分けるのが一番説明しやすい。

| Layer | Prompt Caller |
|---|---|
| User action | Ctrl+Alt+P、search、Enter、paste |
| UI | search box、Entry list、Settings、Health |
| App logic | Entry management、persistence、shortcut ownership、repair |
| Windows | Global Shortcut、Clipboard、Tray、Autostart、Window |

UIだけ見ると、app developmentは「画面を作ること」に見える。

でも実際に難しかったのは、the invisible lower layersだった。

Windows起動後にprocessが生きているか。Shortcutは本当にregisteredか。Windowをhideした後に戻れるか。DesiredとActualがdriftしたときに気づけるか。

Maybe the biggest thing I learned was not Rust syntax. **An app keeps doing work outside the visible screen.**

---

## 10. 自分ならこう説明する — three versions

### 10秒版

Prompt Callerは、よく使う文章を保存して、Windowsのどこからでもshortcutですぐ呼び出してcopyできるapp。

### 30秒版

Prompt Callerは、よく使う文章やpromptsを登録して、`Ctrl+Alt+P`でいつでも呼び出し、searchしてClipboardへcopyできるWindows resident app。UIはWeb technologiesで作り、TauriとRustを使ってGlobal Shortcut、Tray、Clipboard、AutostartなどWindows側の機能とつないでいる。

### 仕組みまで説明

HTML/CSS/TypeScriptが主にvisible UIを担当し、TauriとRust側がWindowsとのboundaryを担当している。Processは普段windowを隠して待機し、WindowsにregisteredしたGlobal Shortcutを受け取るとlauncherをshowする。さらにDesired StateとActual Runtime Stateを分けて、shortcutやautostartが「設定上そうなっている」だけでなく、実際にそうなっているかをHealthで確認・repairできるようにしている。

---

## 11. 最初は「文章を呼ぶだけ」のつもりだった

最初に欲しかったのはsimpleだった。

Save reusable text. Press one shortcut. Get it immediately.

でも作っていくと、startup、waiting、Windows integration、persistence、state inspection、recoveryまで出てきた。

思ったより、**just waiting reliably is hard**。

その難しさを分けていくうちに、appの見え方が少し変わった。

画面を作ったら完成ではない。見えていない時間にもちゃんと生きていて、呼ばれたら出てきて、何かずれたらdetectできて、できれば戻れる。

**That whole lifecycle is the app.**

Prompt Callerは小さな道具だけれど、自分にとっては「desktop appとは何か」をかなり具体的に見せてくれた。

---

### Sources

- [Tauri Architecture](https://v2.tauri.app/concept/architecture/)
- [Tauri Global Shortcut plugin](https://v2.tauri.app/plugin/global-shortcut/)
- [Tauri Autostart plugin](https://v2.tauri.app/plugin/autostart/)
- [Microsoft Learn: Run and RunOnce Registry Keys](https://learn.microsoft.com/en-us/windows/win32/setupapi/run-and-runonce-registry-keys)
