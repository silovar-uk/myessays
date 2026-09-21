---
id: design-literacy-component-state-machine-time-design
title: "ボタンは四角ではない。数秒ぶんの物語である"
subtitle: "Design Literacy #65｜Component Stateを静止画ではなくState Machineとして設計する"
created: "2026-09-21"
updated: "2026-09-21"
type: "Essay"
status: "完成"
tags: ["Design Literacy", "UI", "Interaction Design", "Component State", "State Machine", "Accessibility", "WAI-ARIA", "Temporal Design"]
keywords: ["component state", "state machine", "statechart", "disabled", "aria-disabled", "aria-pressed", "focus management", "loading state", "temporal design", "David Harel"]
series: "Design Literacy｜細部から思想まで"
seriesOrder: 65
abstract: "Figma上では一枚のボタンでも、実際のUIではdefault、focus、pressed、loading、success、errorへ時間の中で変化する。Componentを見た目のVariantではなく、遷移条件・feedback・focus・終了条件を持つ小さなState Machineとして捉え直す。"
---

# ボタンは四角ではない。数秒ぶんの物語である
## Design Literacy #65｜Component Stateを静止画ではなくState Machineとして設計する

FigmaでButtonを選ぶと、四角がある。

Default。Hover。Pressed。Disabled。

Variantを4つ並べる。よし、Component完成。

……本当に？

実際の画面では、Buttonは押されたあとも生きている。通信が始まり、待ち時間が発生し、成功したり失敗したり、focusが別の場所へ移ったりする。スクリーンショットでは一瞬なのに、ユーザーはそのButtonと数秒間つき合う。

ここに妙なズレがある。

> **UIを「形」で設計しているのに、ユーザーは「時間」の中で使っている。**

前回#64では、Brand Identityを「変化しても同じものだと分かること」と捉えた。今回は、その考えをもっと小さな単位へ落とす。

Buttonもまた、変化してもButtonであり続ける。

ただし今回は「Disabledとは何か」をもう一度説明する記事ではない。#31では、Disabled Stateを「できない・なぜ・どうすれば」の情報設計として扱った。

今回は一段進む。

**Stateではなく、Stateのあいだを設計する。**

![静止画のVariantから時間上のState Machineへ](https://raw.githubusercontent.com/silovar-uk/myessays/main/assets/design-literacy-component-state-machine/still-to-time.svg)

## 1. Variant一覧だけでは、「次に何が起きるか」が抜け落ちる

よくあるComponent specificationは、こんな形をしている。

~~~text
DEFAULT
HOVER
FOCUS
PRESSED
DISABLED
LOADING
~~~

見た目の一覧としては正しい。

しかし、ここには時間がない。

たとえば「保存する」Buttonを押す。

~~~text
DEFAULT
↓ click
PRESSED
↓ request
LOADING
↓ response
SUCCESS
~~~

通信に失敗すれば、

~~~text
LOADING
↓ failure
ERROR
↓ retry
LOADING
~~~

になる。

同じ6個のStateを持っていても、**どの条件で入り、何が起き、どこへ出るか**が決まっていなければ、interactionは設計されていない。

静止画では「状態」が見える。

時間を入れると「因果」が見える。

ここからComponent設計の対象が、見た目の差分から**behavior**へ広がる。

## 2. Stateは色ではなく、「この瞬間に成立している条件」である

WAI-ARIA Authoring PracticesのButton Patternでは、Buttonの役割に加え、toggle buttonなら`aria-pressed`、actionが利用不能なら`aria-disabled="true"`を用いて状態を支援技術へ伝える。Keyboard interactionについても、Space / Enterでのactivationや、dialogを開いた後などのfocus移動が状態に応じて定義されている。

Source: https://www.w3.org/WAI/ARIA/apg/patterns/button/

つまりStateは、

~~~text
色が薄い
影がない
spinnerがある
~~~

だけではない。

たとえばLOADINGなら、

~~~text
見た目
spinner / label change

操作
再度押せる？
cancelできる？

意味
処理中

focus
その場に残る？
次へ移る？

exit
成功 / 失敗 / timeout
~~~

まで含む。

ここでComponentが「画像」ではなくなる。

**Stateとは見た目の名前ではなく、ある瞬間に許される行動・意味・次の遷移の束である。**

## 3. BEFORE → AFTER｜「State一覧」を「State Contract」へ変える

### BEFORE

~~~text
Button / Loading
- opacity: 0.8
- spinner
- label: 保存中…
~~~

見た目は作れる。

でも、実装担当が次に聞く。

> 二度押しは防ぐ？
> 10秒返ってこなかったら？
> Escでcancelできる？
> 成功後は元のlabelへ戻す？
> focusはどこ？

全部、デザインファイルの外に追い出されている。

### AFTER

各Stateに、最低限この4項目を持たせる。

~~~text
STATE CONTRACT

ENTRY
何が起きると入る？

BEHAVIOR
その間、何ができる？

FEEDBACK
何を知覚させる？

EXIT
何が起きると出る？
~~~

たとえば、

~~~text
LOADING

ENTRY
submit accepted

BEHAVIOR
repeat submit = blocked
cancel = unavailable

FEEDBACK
"保存中…" + spinner

EXIT
success → SUCCESS
failure → ERROR
timeout → ERROR
~~~

これだけで、FigmaのVariantがinteraction specificationへ変わる。

![State Contract：ENTRY / BEHAVIOR / FEEDBACK / EXIT](https://raw.githubusercontent.com/silovar-uk/myessays/main/assets/design-literacy-component-state-machine/state-contract.svg)

## 4. Disabledは「一つのState」だが、実装上は一種類ではない

ここで#31のDisabledへ戻る。ただし復習は短くする。

HTML Standardでは、`disabled`属性を持つform controlは非対話状態となり、click eventのdispatchも制限される。APGはさらに、HTMLのdisabled controlは通常Tab sequenceから外れる一方、発見可能性が重要な文脈では`aria-disabled="true"`を使い、focus可能なまま利用不能状態を伝える設計があり得ると説明する。

Sources:
https://html.spec.whatwg.org/dev/form-control-infrastructure.html
https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/

ここで重要なのは「どちらが正しい」ではない。

たとえばToolbarのCut / Copy / Pasteは、今は使えなくても「その機能が存在する」ことを知ってほしい場合がある。APGのToolbar Exampleでも、disabled時にfocus可能性を残すため`aria-disabled`を使う例が示されている。

Source: https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/examples/toolbar/

つまりState設計では、

~~~text
AVAILABLE?
FOCUSABLE?
DISCOVERABLE?
OPERABLE?
~~~

を別々に考える必要がある。

「Disabledだから灰色」は、4つの問いを1色に押し込んでいる。

**見た目の一語で、behaviorの複数軸を潰さない。**

## 5. もう一歩やりすぎる｜Buttonを10秒だけ観察すると、未設計箇所が出てくる

静止画レビューをやめて、Buttonを10秒間の映像として見る。

たとえば購入Button。

~~~text
0.0s  DEFAULT
0.2s  PRESSED
0.3s  LOADING
1.8s  LOADING
3.0s  ?
5.0s  ?
10.0s ?
~~~

3秒を越えたあたりから、ユーザーの頭には別のStateが生まれる。

> 押せた？
> 固まった？
> もう一回押す？
> 戻る？
> 二重購入される？

ここでUI側がLOADING一枚のままだと、system stateと**user's mental state**が分離し始める。

技術的にはまだ処理中でも、認知的には「故障かもしれない」へ遷移している。

だからTemporal Designでは、時間経過そのものをtriggerとして扱える。

~~~text
0–1s
silent / subtle feedback

1–5s
clear progress feedback

long wait
expectation / cancel / background processing
~~~

この秒数は普遍的なruleとして提示しているわけではない。処理内容、リスク、文脈によって変わる。

大事なのは、**時間が経っても同じState名のままでよいかを疑うこと**だ。

## 6. State MachineはUIデザイナーが発明した考えではない

ここで少し外へ出る。

State machineそのものはUI Designよりずっと古い概念で、計算機科学や制御系で使われてきた。1987年、David Harelは論文「Statecharts: a visual formalism for complex systems」で、従来のstate diagramをhierarchy、concurrency、communicationによって拡張するStatechartsを提案した。

Source: https://www.sciencedirect.com/science/article/pii/0167642387900359

Weizmann Instituteの書誌情報でも、この論文は1987年にScience of Computer Programming誌で発表され、複雑なdiscrete-event systemsを扱う視覚的formalismとして位置づけられている。

Source: https://weizmann.elsevierpure.com/en/publications/statecharts-a-visual-formalism-for-complex-systems/

ここで注意したい。

**HarelがUIのButton Stateを発明したわけではない。**

Statechartsを、そのままUI Designの歴史的起源として語るのも雑だ。

接続できるのは、もっと限定的なところにある。

複雑なsystemを「状態の一覧」ではなく、**状態・階層・同時進行・遷移の関係として可視化する**必要が生まれると、単純なリストでは足りなくなる。

UIも同じ問題にぶつかる。

一個のButtonなら簡単でも、

~~~text
FORM VALIDITY
×
NETWORK
×
AUTH
×
FOCUS
×
MODAL
~~~

が同時に動き始めると、Variant一覧では追えない。

ここで「デザイン」が画面設計からsystem descriptionへ近づく。

## 7. 「Buttonは小さな物語」は比喩だが、かなり実務的である

Buttonを物語だと思う。

主人公はButtonではない。

**ユーザーの期待**だ。

~~~text
押せそう
↓
押した
↓
受け付けられた
↓
処理されている
↓
終わった
~~~

この順序が崩れると、不安になる。

押したのに反応がない。

Loadingなのにもう一度押せる。

成功したのにlabelが「保存する」のまま。

Errorになったのにretry pathがない。

どれも「見た目がダサい」問題ではない。

**出来事の順序と意味がつながっていない。**

前回#64では、Identityを保ちながらvariationする設計を扱った。

今回は時間軸へ移して、

> Componentのidentityを保ちながら、状態をどう変えるか

を見る。

空間上のVisual Grammarから、時間上のBehavioral Grammarへ移ったとも言える。

![Visual GrammarからBehavioral Grammarへ](https://raw.githubusercontent.com/silovar-uk/myessays/main/assets/design-literacy-component-state-machine/visual-to-behavior.svg)

## 8. そのまま使える制作・修正指示｜State名だけで納品しない

制作指示としては、こう書ける。

> **主要なinteractive componentについて、必要なstateを静止画で列挙するだけでなく、各stateのENTRY（遷移条件）/ BEHAVIOR（その間に可能な操作）/ FEEDBACK（ユーザーへ伝える情報）/ EXIT（次の遷移条件）まで定義してください。特にloading・error・disabled・successは、見た目だけでなくfocus、再操作可否、timeout、retry pathを確認してください。**

レビュー時は、State一覧を見ながら四問する。

~~~text
どうやってここに入る？
ここで何ができる？
何を知覚できる？
どうやってここから出る？
~~~

答えられないStateは、たいてい「絵はあるがbehaviorがない」。

## 9. 守破離で見る｜Variantを作る→遷移を疑う→画面を越えて考える

### 守｜まず標準Stateを欠かさない

default / hover / focus / pressed / disabled / loading / errorなど、製品に必要なstateを洗い出す。

ここではDesign Systemの既存patternを使う。

### 破｜State間の遷移をレビューする

「Loadingの見た目はある」で終わらせず、

~~~text
何がtrigger？
連打は？
失敗は？
focusは？
戻れる？
~~~

を問う。

ここでVariant libraryからinteraction modelへ進む。

### 離｜Component単体ではなく、周辺systemとの同期を見る

Buttonだけ成功しても、toast、form、navigation、server responseが食い違えばUXは壊れる。

~~~text
Button = SUCCESS
Form = stale
Toast = hidden
Navigation = unchanged
~~~

みたいな状態は普通に起こり得る。

離では、Componentを孤立した部品ではなく、**複数のstate machineが同期するsystem**として見る。

## 10. 前より解像度が上がる接続｜Controlled Variationは時間にも存在する

ここ数回を並べる。

~~~text
#61 TOKEN
判断を再利用する

#62 CONSTRAINT
探索する場所を選ぶ

#63 VISUAL GRAMMAR
要素の関係を決める

#64 CONTROLLED VARIATION
identityを保って変奏する

#65 STATE MACHINE
identityを保って時間の中で変化する
~~~

ここで#64の「変わっても同じもの」が、空間から時間へ移る。

ブランドなら、

~~~text
campaign A
campaign B
campaign C
~~~

で変わる。

Buttonなら、

~~~text
default
pressed
loading
success
~~~

で変わる。

どちらも設計しているのは、**変化そのものではなく、変化の中で何を不変として残すか**だ。

これが今回の「前より解像度が上がる接続」。

## 11. 30秒でできる観察｜State InventoryではなくTransition Huntをする

普段使うWebサービスを一つ開く。

Buttonを一つだけ選ぶ。

そしてState名を数えるのではなく、矢印を探す。

~~~text
押したら？
↓
返事が遅かったら？
↓
失敗したら？
↓
もう一度押したら？
↓
戻ったらfocusはどこ？
~~~

一つでも「分からない」があれば、そこは未設計か、少なくとも仕様が画面から読み取れない。

静止画では綺麗でも、時間の中では穴がある。

## 12. 調べる前と後｜Buttonは四角ではなく、未来を数個持っている

最初は、Button Stateを「見た目のVariant」の話だと思っていた。

Defaultは白。Hoverは少し濃い。Pressedは沈む。Disabledは薄い。

でも調べ直すと、そこでは足りなかった。

WAI-ARIAはstateを意味として扱い、APGはfocusやinteractionまでpatternとして記述する。HTMLのdisabledとARIAのdisabledでは、focusabilityやdiscoverabilityの扱いも違う。さらにStatechartの考え方まで広げると、Stateは一覧ではなく、遷移関係の中で意味を持つ。

するとButtonを見る目が変わる。

Buttonは「押すもの」ではない。

~~~text
期待をつくる
↓
入力を受ける
↓
受付を返す
↓
待たせる
↓
結果を伝える
↓
次の行動へ渡す
~~~

ための、小さな時間設計である。

> **A component is defined not only by how it looks, but by how it changes.**

日本語なら、

> **Componentは「形」だけではなく、「変わり方」まで含めてComponent。**

Figma上では四角い。

でもユーザーが触った瞬間、そこには過去と現在と次の可能性が生まれる。

**Buttonは四角ではない。未来を数個持った、小さな物語だった。**

## 次につながる概念

次は**Transition Cost / Temporal Feedback / Optimistic UI**へ進める。

同じ「成功」でも、

~~~text
即時に見せる
↓
裏で送る

server responseを待つ
↓
成功を見せる
~~~

では、ユーザーが感じる速度もriskも違う。

Stateを理解した次は、**遷移そのものの設計コスト**を見る。

## Sources

- W3C WAI-ARIA APG — Button Pattern  
  https://www.w3.org/WAI/ARIA/apg/patterns/button/
- W3C WAI-ARIA APG — Developing a Keyboard Interface  
  https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/
- W3C WAI-ARIA APG — Toolbar Example  
  https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/examples/toolbar/
- WHATWG HTML Standard — Enabling and disabling form controls  
  https://html.spec.whatwg.org/dev/form-control-infrastructure.html
- David Harel, “Statecharts: a visual formalism for complex systems,” 1987  
  https://www.sciencedirect.com/science/article/pii/0167642387900359
- Weizmann Institute — Statecharts publication record  
  https://weizmann.elsevierpure.com/en/publications/statecharts-a-visual-formalism-for-complex-systems/
