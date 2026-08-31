# Prompt Caller Research Note

Updated: 2026-09-01
Article ID: `prompt-caller-what-i-built-windows-app`
Role: beginner-oriented technical explainer / personal learning essay

## 1. Core question

**Prompt Callerは、技術に詳しくない人でも自分の言葉でどう説明できるか。さらに、その説明を通じて「Windowsアプリは画面だけではない」と理解できるか。**

この記事ではTauri入門そのものを目的にしない。利用体験から入り、必要な技術概念だけを後から名前付けする。

## 2. Research order

1. Prompt Callerの最新GitHub状態を確認。
2. masterに入った機能とDraft PRの機能を分離。
3. Tauri公式資料でArchitecture / Global Shortcut / Autostartを確認。
4. Microsoft LearnでWindows Run / RunOnceの位置づけを確認。
5. MyEssaysの`CURRENT_SPEC.md`と直近記事のcanonical / English Mix / Research Note構成を確認。

## 3. Prompt Caller — verified current facts

### masterで確認した内容

- Windows常駐型のTauri 2アプリ。
- 既定のLauncher shortcutは`Ctrl+Alt+P`。
- Global Shortcut pluginをRust側で利用し、shortcut callbackからlauncher windowをtoggleする。
- Entryを検索・選択し、Clipboardへtextを書き込む。
- Tray menuを持ち、Launcher / Settings / Runtime repair / Quitへの導線がある。
- Autostart pluginを利用する。
- Runtime Healthは、launcher shortcut、launcher window、autostart、Entry shortcutについてConfigured / Actualのズレを確認する。
- Window表示が壊れた場合はbounded repairとして再生成を一度試す。
- Entry shortcutは、このprocess自身が登録したものをownershipとして追跡する。

### Boot Reliabilityで実機確認された問題

PR #13 `Reliability: Windows再起動後の自動起動登録を現在EXEへ同期`はmasterへmerge済み。

初期仮説はstale executable pathだったが、実機調査でこのPCにおけるroot causeはWindows Run値の引用符問題と確認された。

確認された構造:

- Prompt Callerのinstalled executable pathには`Prompt Caller`というspaceを含むディレクトリ名がある。
- 使用していたautostart backendはRun値を引用符なしで登録していた。
- Windows sign-in後、Run entry自体は存在し`is_enabled()`もtrueだったが、Prompt Caller processは起動していなかった。
- Shell-Core/Operational event logでもPrompt Caller実行が確認できなかった。
- Prompt Caller側でRun valueをquoted executable pathへ補正する処理を追加した。

### masterではないもの

2026-09-01時点で以下はDraft PRであり、記事本文では完成済み機能として扱わない。

- PR #12: Window Drag / Escape interaction
- PR #14: Window Coexistence / Companion personality

## 4. External primary sources

### Tauri Architecture
https://v2.tauri.app/concept/architecture/

Verified:

- TauriはRust toolsとWebView上のHTMLを組み合わせてdesktop applicationsを作る。
- WebViewとRust backendをmessage-passingでつなげられる。
- Tray interfaceも利用可能。

Use in article:

「Web技術で描く画面」と「Windowsに近いRust側」をつなぐ橋という初心者向けmental model。

Qualification:

これは理解用の簡略化。Tauri自体を単なるIPC bridgeだけとして定義しない。

### Tauri Global Shortcut plugin
https://v2.tauri.app/plugin/global-shortcut/

Verified:

- Global shortcutsをregisterできるofficial plugin。
- Windowsを含むdesktop platformsをサポート。
- register / is_registered / unregister等の操作がある。

Use in article:

普通のWeb page内keydownと、OSへ登録するGlobal Shortcutの違いを説明する。

### Tauri Autostart plugin
https://v2.tauri.app/plugin/autostart/
https://v2.tauri.app/reference/javascript/autostart/

Verified:

- system startup時にappをlaunchするためのplugin。
- enable / disable / isEnabledが公開API。

Use in article:

「設定上ON」と「次回sign-in時に本当に起動する」は別、というPrompt Callerの実例への入口。

### Microsoft Learn — Run and RunOnce Registry Keys
https://learn.microsoft.com/en-us/windows/win32/setupapi/run-and-runonce-registry-keys

Verified:

- Run / RunOnce registry keysはuser logon時にprogramをrunさせるための仕組み。
- Runはlogonごと、RunOnceは一度だけ実行する。
- valueは`description-string=commandline`形式で登録する。

Use in article:

Prompt CallerのBoot Reliability caseで、Windows Runが何なのかを説明する。

## 5. FACT vs INTERPRETATION

### FACT

- Prompt CallerはTauri 2 + Web UI + RustのWindows常駐アプリである。
- Global Shortcut、Clipboard、Tray、Autostart等のOS連携を持つ。
- Runtime HealthでConfigured / Actualの状態差を扱っている。
- PR #13の実機調査でWindows Run registrationのquoted-path問題がroot causeとして確認された。

### INTERPRETATION / editorial model

- 「TauriはWeb UIとWindowsをつなぐ橋」という表現は初心者向けのmental model。
- Prompt Callerを「文章ランチャー」と呼ぶのは機能を理解するための編集上のラベル。
- `利用者 → UI → App logic → Windows`という4層モデルは記事独自の理解フレーム。
- `Prevent / Detect / Explain / Recover`はPrompt Callerで進めてきたReliability方針を初心者向けに再整理したもの。

## 6. Voice / VOICE LOSS audit

User-provided intentから保持したい声:

- 技術に詳しくない状態から、自分の制作物を説明できるようになりたい。
- 単に自然で整った技術記事ではなく、理解が変化した感覚を残す。
- 「なんとなく分からなかったものが少しずつ分かってきた」というdistanceを消さない。
- ただし感情をAIが創作しない。

本文で採用したvoice:

- 「たぶん説明したいのは、そこじゃない」
- 「思ったより、『待っているだけ』が難しい」
- 「ONなのに動かない。最初はちょっと変な感じがする」
- 「Rustの文法より、アプリは画面の外側でもずっと何かをしていることを知ったかもしれない」

これらは会話上の制作過程・疑問と整合する範囲の判断表現として使用し、具体的な未確認感情は追加していない。

## 7. Rejected approaches

- `Tauriとは何か`から記事を始める。
- Rust / TypeScript / WebViewの用語辞典にする。
- READMEの機能一覧を文章化する。
- Draft PR #12 / #14をcurrent featureとして書く。
- Run key issueを「Windowsはspace入りpathを必ず実行できない」と過剰一般化する。
- Prompt CallerをAI toolとして説明する。
- Reliabilityを「自動retryを増やすこと」と説明する。

## 8. Article learning target

読了後に次の3段階で説明できること。

### 10 sec

Reusable textをWindowsのどこからでもshortcutで呼び出すapp。

### 30 sec

Web-style UIを持つTauri/Rust製のresident appで、Global Shortcut / Clipboard / Tray / AutostartとWindows上で連携する。

### Mechanism

Visible UI、app process、OS integrationを別レイヤーとして理解し、Configured Desired StateとActual Runtime Stateが一致するとは限らないことまで説明できる。

## 9. MyEssays publication contract

2026-09-01確認:

- Japanese canonical: `essays/`
- English Mix: `english-mix/`
- Canonicalのみ`data/index.json`へ登録。
- `data/versions-index.json`で`en-mix`をcanonical IDへ紐づける。
- English Mixはfull translationではなくJapanese comprehension baseを維持する。
- Section alignmentはH2レベルで概ね対応させる。

## 10. Files planned

- `essays/2026-09-01-prompt-caller-what-i-built-windows-app.md`
- `english-mix/prompt-caller-what-i-built-windows-app.md`
- `RESEARCH_PROMPT_CALLER_2026-09-01.md`
- `data/index.json`
- `data/versions-index.json`
