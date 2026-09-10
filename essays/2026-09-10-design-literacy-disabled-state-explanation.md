---
id: design-literacy-disabled-state-explanation
title: "押せないボタンは、なぜ押せないのかを説明していない"
subtitle: "Design Literacy #31｜Disabled Stateは色違いではなく、小さな情報設計である"
created: "2026-09-10"
updated: "2026-09-10"
type: "Essay"
status: "完成"
tags: ["Design Literacy", "UI", "UX", "Accessibility", "Disabled State", "Constraint", "Discoverability", "Error Prevention"]
keywords: ["disabled state", "aria-disabled", "HTML disabled", "constraint", "discoverability", "feedback", "recovery", "button state", "accessibility", "error prevention"]
favorite: 5
grow: 5
series: "Design Literacy｜細部から思想まで"
seriesOrder: 31
abstract: "灰色のボタンが、ただ無言で押せない。その小さな違和感から、Disabled Stateを『見た目のバリエーション』ではなく、状態・原因・回復方法を扱う情報設計として捉え直す。W3CとMDNの仕様をたどり、HTML disabledとaria-disabledの違い、発見可能性とのトレードオフ、ConstraintとError Preventionの関係まで掘る。"
---

# 押せないボタンは、なぜ押せないのかを説明していない
## Design Literacy #31｜Disabled Stateは色違いではなく、小さな情報設計である

灰色のボタンがある。

押せない。

以上。

……いや、ちょっと待ってほしい。

なぜ押せないのかは、誰が説明してくれるんだろう。

メールアドレスが未入力だから？　パスワードが短いから？　利用規約への同意がないから？　発売前だから？　権限がないから？

ボタンは黙っている。

**「あなたは今、進めません」だけ伝えて、理由は自分で当ててください。**

こう書くと、かなり変な会話である。

今回の問いはこれだ。

**Disabled Stateは、本当に「押せない見た目」を作れば完成なのか。**

---

## 1. まず一言：State is not explanation

**状態と説明は別物である。**

WAI-ARIAの`aria-disabled="true"`は、その要素が知覚可能ではあるが現在操作できない状態であることを支援技術へ伝える。MDNも、HTMLの`disabled`と`aria-disabled`では挙動が異なり、`aria-disabled`は意味上の無効状態を伝える一方、実際の機能停止や見た目は実装側で担う必要があると説明している。

FACTとして確認できるのは、ここまでだ。

しかしUI設計では、もう二つの問いが残る。

```text
STATE
今どうなっている？

CAUSE
なぜそうなっている？

RECOVERY
どうすれば先へ進める？
```

Disabled Stateが直接答えるのは、主に最初の一つ。

**「なぜ」と「どうすれば」は、別途設計しないと生えてこない。**

---

## 2. 灰色のボタンを10秒だけ裁判にかける

たとえば会員登録フォーム。

### BEFORE

```text
氏名
✓ 入力済

メール
✓ 入力済

パスワード
✓ 入力済

□ 利用規約に同意する

[ アカウント作成 ]
      disabled
```

規約同意が原因だと分かる人もいる。

では、チェック欄が300px上にあったら？

スマートフォンで折りたたまれていたら？

必須条件が三つあったら？

突然、フォームが**「間違い探し」**になる。

### AFTER

```text
□ 利用規約に同意する
  必須

[ アカウント作成 ]

利用規約への同意が必要です
```

重要なのは、ボタンを派手にすることではない。

**失敗条件を、失敗が見える場所へ近づける。**

これはProximityの問題でもあり、情報設計の問題でもある。

---

## 3. もう一歩やりすぎる：Disabledを3種類に分類する

「押せない理由」を全部同じ扱いにすると雑なので、実務向けに分類してみる。

### A｜ユーザーが自分で解除できる

例：必須入力、規約同意、席種選択。

この場合は、**解除条件を近くに出す価値が高い。**

```text
[ 購入する ]
席種を選択すると進めます
```

### B｜時間やシステム条件で解除される

例：発売前、メンテナンス中、処理中。

この場合は、次の行動より**解除時点や待つ理由**が重要になる。

```text
[ 購入する ]
9月12日 10:00から購入できます
```

### C｜ユーザー権限では解除できない

例：管理者限定、会員ランク制限、地域制限。

ここでは「何を入力すれば進めるか」と見せると誤誘導になる。

```text
[ 編集する ]
管理者権限が必要です
```

同じ灰色でも、必要な説明が違う。

**Disabledという見た目は同じでも、原因モデルは違う。**

---

## 4. `disabled`と`aria-disabled`は、見た目以上に違う

ここは仕様の話なので、笑いを止める。

W3CのARIA Authoring Practices Guideによれば、HTMLフォーム要素に`disabled`を付けると、ブラウザは通常その要素をTab順から外す。

一方で`aria-disabled="true"`を使えば、無効状態を意味として伝えつつ、要素をフォーカス可能なままにできるケースがある。

なぜそんなことをするのか。

**使えない機能でも、存在自体は知ってほしい場合があるからだ。**

W3CはCopy / Cut / Pasteのようなツールバー機能を例に、現在使えなくても発見可能性のためフォーカス可能に残す設計を示している。

逆に、存在を周辺要素から容易に推測できるなら、Tab回数を減らすためフォーカス順から外す方がよい場合もある。

つまり、ここでも一律ルールではない。

```text
SKIP IT
操作効率を上げる

KEEP IT DISCOVERABLE
機能の存在を伝える
```

**EfficiencyとDiscoverabilityのトレードオフ**になる。

---

## 5. Constraintは「禁止」ではなく、行動の地図にもなる

Don Normanのデザイン論では、constraintは可能な行動を絞り、ユーザーが何をできるか理解する手掛かりにもなる。

映画館の座席表を考える。

```text
○ 空席
● 選択中
× 販売済
△ 車いす席
```

ここでは「選べない座席」も情報である。

ところが全部を同じ薄いグレーにすると、

- 売り切れ
- 発売前
- 選択不可
- 自分の会員種別では購入不可

の違いが消える。

**制約があることより、制約の意味が見えない方が困る。**

ここでDisabled Stateは単なる視覚スタイルから、Information Architectureへ一段上がる。

---

## 6. そのまま使える制作・修正指示

制作指示なら、こう書ける。

> **Disabled状態では、操作できないことを見た目だけで示すのではなく、解除条件が推測しにくい場合は、その理由または次に必要な操作をコントロール付近へ表示してください。特に必須入力・選択不足などユーザー自身で解消できる条件は、何をすれば有効になるかまで示してください。**

レビューならもっと短くていい。

> **「これ、押せない理由を初見で説明できますか？」**

答えられなければ、ユーザーにも難しい可能性が高い。

---

## 7. 誤解：じゃあDisabledボタンを全部なくせばいい？

それも違う。

有効になる前から押せる状態にして、押した後にエラーを大量に出す方が分かりやすいケースもあれば、事前に無効化した方が誤操作を防げるケースもある。

重要なのは、Disabledの有無ではない。

```text
PREVENT
失敗前に防ぐ

EXPLAIN
なぜ進めないか伝える

RECOVER
失敗後に戻れるようにする
```

どこで問題を処理するかである。

ここからError Preventionへつながる。

**一番良いエラーメッセージは、そもそも表示されなくて済むエラーかもしれない。**

ただし、予防のために操作を隠しすぎればDiscoverabilityを落とす。

UXは、だいたい一個よくすると別の何かがこちらを見ている。

---

## 8. 前の学びとつなぐと、UIが「質問への回答」に見えてくる

ここ数回を並べてみる。

```text
Information Scent
この先に何がある？

Recognition
何を覚えなくていい？

Focus Indicator
今どこを操作している？

Disabled State
今これはできる？

Constraint Explanation
できないなら、なぜ？
```

こうすると、UIが少し違って見える。

良いUIは、綺麗な部品を並べたものというより、**ユーザーの頭に浮かぶ小さな質問へ順番に答えるシステム**なのかもしれない。

これは今回のINTERPRETATIONであって、W3Cの主張ではない。

でも制作レビューにはかなり使える。

「この画面は美しいか」だけではなく、

**「この瞬間、ユーザーは何を質問するか」**

を見る。

---

## 9. 30秒実験：灰色を一個探す

今使っているサイトかアプリで、灰色のボタンを一個探す。

そして三問。

```text
1. なぜ押せない？
2. どうすれば押せる？
3. その答えは画面上にある？
```

三番がNOなら、改善候補である。

さらに必須項目を一個わざと空欄にしてみる。

その瞬間に画面がどう変わるかを見る。

静止画のデザインレビューだけでは、この問題は意外と見えない。

---

## 10. 灰色のボタンが、前より少しうるさく見える

最初、Disabled Stateは「押せないボタンの色」くらいの話に見えた。

調べてみると違った。

そこには、

```text
STATE
↓
CAUSE
↓
RECOVERY
```

という小さな情報設計が入っている。

さらに、フォーカス可能に残すかどうかでEfficiencyとDiscoverabilityまで衝突する。

ボタン一個なのに、話が妙にでかい。

だから次に灰色のボタンを見ると、たぶん前より少しうるさく見える。

「押せません」

だけではなく、

**「で、なんで？」**

という声まで聞こえてくる。

それはたぶん、UIを見る解像度が一段上がったということだ。

---

## 中心命題

**A disabled control should not become a mystery.**

Disabled Stateは色違いのVariantではない。

**「できない」「なぜ」「どうすれば」の関係を設計する、小さな情報設計である。**

## 検索語

`Disabled State / aria-disabled / HTML disabled / Constraint / Discoverability / Feedback / Recovery / Button State / Accessibility / Error Prevention / State Visibility`

## 参考資料

- W3C WAI-ARIA Authoring Practices Guide — Developing a Keyboard Interface  
  https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/
- MDN — aria-disabled  
  https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-disabled
- W3C WAI-ARIA Authoring Practices Guide — Button Pattern  
  https://www.w3.org/WAI/ARIA/apg/patterns/button/
- Don Norman — The Design of Everyday Things  
  https://jnd.org/books/the-design-of-everyday-things-revised-and-expanded-edition/
