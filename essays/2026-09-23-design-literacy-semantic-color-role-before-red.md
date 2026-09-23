---
id: design-literacy-semantic-color-role-before-red
title: "ブランドカラーもエラーも赤なら、その赤は何の仕事をしているのか"
subtitle: "Design Literacy #70｜意味色で「何色か」と「何のための色か」を分ける"
created: "2026-09-23"
updated: "2026-09-23"
type: "Essay"
status: "完成"
tags: ["Design Literacy", "色", "Semantic Color", "Design Token", "Design System", "Accessibility", "USWDS"]
keywords: ["意味色", "semantic color", "design token", "state color", "theme color", "system color", "alias", "role based color", "USWDS", "DTCG"]
series: "Design Literacy｜細部から思想まで"
seriesOrder: 70
abstract: "ブランドカラーも主要ボタンもエラーも削除も赤。見た目は統一されているのに、意味は渋滞している。色名ではなく役割名で色を管理する「意味色」の考え方から、色と意味を分離し、デザイントークンを設計判断の翻訳層として捉え直す。"
---

# ブランドカラーもエラーも赤なら、その赤は何の仕事をしているのか
## Design Literacy #70｜意味色で「何色か」と「何のための色か」を分ける

赤いブランドがある。

主要ボタンも赤い。

エラーも赤い。

削除ボタンも赤い。

選択中も赤い。

ここまで来ると、赤が忙しい。

**一色で何役やってるんや。**

昨日#69では、「危険だから赤」では粗い、と考えた。色は意味を補強できるが、色だけに意味を背負わせると、白黒表示や色覚差のある環境で情報が落ちる。W3CのWCAG 2.2も、情報・操作・応答の区別を色だけに依存しないよう求めている。

Source:
https://www.w3.org/WAI/WCAG22/Understanding/use-of-color

今日はそこから一段下へ降りる。

> **そもそも「赤」を先に決めるから、意味が衝突するのではないか。**

色を「何色か」ではなく、「何のために使う色か」から考える。

![一つの赤が四つの仕事をしている](https://raw.githubusercontent.com/silovar-uk/myessays/main/assets/design-literacy-semantic-color/one-red-four-jobs.svg)

## 1. #d83933は色を説明するが、判断理由を説明しない

CSSにこう書く。

~~~text
background: #d83933;
~~~

色は分かる。

でも、半年後に見た人は困る。

~~~text
これは
ブランド色？
主要操作？
エラー？
削除？
警告？
~~~

コードからは判断できない。

同じ値に、

~~~text
brand-primary
action-primary
status-error
action-destructive
~~~

という別の名前を与えると、初めて「この色が何の仕事をしているか」が見える。

ここで大事なのは、名前を格好よくすることではない。

**値と役割を分離すること**だ。

色の値は変わるかもしれない。

役割は残る。

## 2. 事実｜USWDSは「色の一覧」と「役割の色」を分けている

米国政府のU.S. Web Design System（USWDS）は、色を一枚の巨大なパレットとして扱っていない。

まずSystem color tokensとして、red-cool-50のような色そのものに近い体系を持つ。

Source:
https://designsystem.digital.gov/design-tokens/color/system-tokens/

その上にTheme color tokensがあり、primary、secondary、accent-warm、accent-coolなど、プロジェクト内での役割へ色を割り当てる。

Source:
https://designsystem.digital.gov/design-tokens/color/theme-tokens/

さらにState color tokensでは、info、error、warning、success、emergency、disabledという状態ベースの役割を用意している。

Source:
https://designsystem.digital.gov/design-tokens/color/state-tokens/

整理すると、こんな感じになる。

~~~text
SYSTEM
red-50
blue-60
gray-90
↓
具体的な色の候補

THEME
primary
secondary
accent
↓
製品・ブランド内の役割

STATE
error
warning
success
disabled
↓
状態の意味
~~~

![色名・テーマ・状態を分ける](https://raw.githubusercontent.com/silovar-uk/myessays/main/assets/design-literacy-semantic-color/three-layers.svg)

ここで「semantic color」という語を使うときは注意したい。

USWDSが公式にすべてを「semantic color」という一語で分類しているわけではない。本稿では、**色そのものではなく、その用途・状態・役割を表す名前を持った色**を実務上「意味色」と呼んでいる。

用語を覚えることより、構造を間違えない方が大事だ。

## 3. BEFORE → AFTER｜赤を減らすのではなく、赤の仕事を分ける

たとえば赤がブランドの中心色であるスポーツクラブを考える。

### BEFORE

~~~text
#e60012
├─ ブランド
├─ 主要ボタン
├─ エラー
├─ 完全削除
└─ 選択中
~~~

見た目は統一されている。

意味は統一されていない。

利用者は文脈を読む必要がある。

### AFTER

~~~text
brand-primary
→ ブランド表現の赤

action-primary
→ 主要操作の色

status-error
→ エラー状態の色

action-destructive
→ 破壊的操作の色

state-selected
→ 選択状態の色
~~~

ここで、実際のHEX値が一部同じでも構わない。

たとえば今は、

~~~text
brand-primary      = #e60012
action-primary     = #e60012
status-error       = #e60012
~~~

でもよい。

名前を分けておけば、将来、

~~~text
status-error
#e60012
↓
より暗い赤
~~~

だけ変更できる。

ブランド色を変えずに、エラーの識別性だけ改善できる。

**色を分けたのではない。変更理由を分けた。**

これが意味色の強さだ。

## 4. 「同じHEXなのに別トークン」は無駄ではない

ここが一番変なところかもしれない。

値が同じなら一個でええやん。

普通はそう思う。

~~~text
red = #e60012
~~~

一個作って全員で使えば、きれいだ。

でも、この一個を、

~~~text
ブランド
主要操作
エラー
削除
~~~

の四つが共有すると、どれか一つだけ変えたいときに全部がついてくる。

つまり、値の重複を消した結果、**意味まで結合してしまう。**

逆に、

~~~text
brand-primary     → red-50
status-error      → red-50
~~~

のように二つの役割が同じ基礎色を参照していれば、今日は同じ見た目でも、明日は別々に変更できる。

これはコードの重複を増やしたい話ではない。

**「同じ値」と「同じ意味」を区別する話**だ。

## 5. DTCG仕様では、別名参照が「意味関係」を作れる

Design Tokens Community Group（DTCG）は2025年10月、Design Tokens Specification 2025.10を最初の安定版として公開した。

これはW3C Recommendationではなく、W3C Community Groupが公開したFinal Community Group Reportである。

Source:
https://www.w3.org/community/reports/design-tokens/CG-FINAL-format-20251028/

仕様にはAlias / Referenceがあり、あるtokenが別tokenの値を参照できる。

たとえば仕様中にも、

~~~text
color.palette.black
↓
color.text.primary
~~~

のように、基礎値を別の役割名から参照する例がある。

Source:
https://www.designtokens.org/tr/2025.10/format/

DTCGはAliasの用途として、設計判断の表現、値の重複削減、token間のsemantic relationshipの表現、一貫性維持などを挙げている。

重要なのは、仕様が「Primitive → Semantic → Component」という三階層を必須化しているわけではないこと。

それは現場でよく使われる設計パターンの一つであって、DTCG仕様そのものではない。

ただし、**値と意味を別名で結び付けられる技術的な土台**はある。

![値から役割へ参照する](https://raw.githubusercontent.com/silovar-uk/myessays/main/assets/design-literacy-semantic-color/value-to-role.svg)

## 6. もう一歩やりすぎる｜「色名禁止」で画面を読む

色設計を点検するなら、画面をグレースケールにする方法がある。

もう一つやる。

**色名を禁止する。**

画面を見ながら、

~~~text
赤
青
緑
グレー
~~~

と言ってはいけない。

代わりに、

~~~text
ブランド
主要操作
補助操作
成功
警告
エラー
選択
無効
~~~

と呼ぶ。

たとえば赤い要素を五つ見つけて、

~~~text
赤1 → ブランド
赤2 → 主要操作
赤3 → エラー
赤4 → 削除
赤5 → 選択中
~~~

となったら、一色がかなり働かされている。

逆に、

> この紫、何のため？

に答えられなかったら、その色は装飾なのか、情報なのか、役割自体が曖昧なのかを確認できる。

本稿ではこれを**色名禁止テスト**と呼ぶ。正式な研究用語ではない。

色を消すのではなく、**色から意味を剥がして、役割だけを見る**実験だ。

## 7. 意味色にすればアクセシブル、ではない

ここは分ける。

~~~text
status-error
~~~

という立派な名前が付いていても、薄い赤文字を白背景に置いて読めなければ意味がない。

またW3CのWCAG 2.2は、色を情報伝達の唯一の視覚手段にしないよう求めている。

Source:
https://www.w3.org/WAI/WCAG22/Understanding/use-of-color

つまり、

~~~text
status-error
↓
赤にする
~~~

だけでは不十分。

~~~text
エラー文言
＋
必要ならアイコン
＋
位置
＋
色
~~~

のように、意味を複数の手掛かりで届ける必要がある。

意味色は**管理上の意味分離**を助ける。

アクセシビリティは**利用者が意味を知覚できるか**を扱う。

似ているが、同じ問題ではない。

## 8. 「ブランドの赤」と「エラーの赤」は、違う時間軸で変わる

ここまで来ると、色を役割で分ける理由がもう一つ見えてくる。

ブランドカラーは、そう頻繁には変えない。

一方、エラー色は、

~~~text
コントラスト不足
ダークモード対応
新しいアクセシビリティ要件
コンポーネント変更
~~~

などを理由に調整したくなるかもしれない。

つまり二つは、**変更される理由と時間軸が違う。**

今日同じ値だから一個にまとめる。

これは現在の見た目だけを見る判断だ。

役割を分ける。

これは未来の変更理由まで見る判断だ。

ここでデザイントークンが「色を統一する道具」から少し違って見える。

**トークンは、将来どの判断を別々に変更できるようにするかを決める境界でもある。**

## 9. 前より解像度が上がる接続｜#61のTokenが「値の再利用」から「意味の分離」へ進む

#61では、Spacing Tokenを使って、意味の薄い差を減らした。

そこで見たのは、

> **何を毎回考え直さなくてよいか**

だった。

今回は同じTokenでも、逆方向の役割が見える。

~~~text
同じ値
↓
でも意味が違う
↓
別のroleとして残す
~~~

つまりTokenには二つの仕事がある。

~~~text
まとめる
同じ意味の判断を再利用する

分ける
同じ値でも違う意味を独立させる
~~~

これが今回の「前より解像度が上がる接続」。

デザインシステムは、何でも統合すれば成熟するわけではない。

**まとめるべきものと、切り離すべきものを見極める仕組み**でもある。

## 10. そのまま使える制作・修正指示

> **色をHEX値や「赤・青・グレー」だけで管理せず、用途に応じた役割名を定義してください。少なくともブランド、主要操作、補助操作、情報、成功、警告、エラー、破壊的操作、選択状態、無効状態を確認し、役割が異なるものは現在の色値が同じでも別tokenとして管理することを検討してください。具体色は基礎パレットから参照させ、将来、役割ごとに独立して変更できる構造にしてください。色だけを意味伝達の唯一の手掛かりにはしないでください。**

レビューなら二問でよい。

> **「この赤、何の仕事をしてる？」**

> **「この二つ、同じ色だから一緒なの？　同じ意味だから一緒なの？」**

二問目がかなり効く。

## 11. 調べる前と後｜赤を選んでいたつもりが、意味の境界線を引いていた

最初は色の話だった。

赤が多すぎる。

エラーとブランドが衝突する。

じゃあ別の赤にする？

そのくらいの話に見えた。

でも調べると、色そのものより先に考えるものがあった。

~~~text
何の役割か
↓
何と独立して変わるべきか
↓
何を参照するか
↓
最後に具体色
~~~

だった。

> **意味色は、「何色か」と「何のための色か」を分離する。**

赤を見る目も少し変わる。

以前なら、

> この赤、濃いな。

だった。

今は、

> **この赤、何の仕事を任されてるんやろ。**

になる。

色見本を見ているつもりが、実は組織の判断構造を見ていた。

そこまで行くと、デザイントークンが急に「変数管理」より大きな話に見えてくる。

## 次につながる概念

次は**テーマ（Theme）と同一性**へ進める。

ライトモードとダークモードで、

~~~text
error
↓
具体色は変わる

でも
errorという役割は変わらない
~~~

ということが起きる。

見た目が変わっても意味を保つ。

これは#64のControlled Variationともつながる。

次の問いは、

> **一貫性とは、同じ値を使うことなのか。それとも同じ意味を保つことなのか。**

になる。

## Sources

- U.S. Web Design System — System color tokens
  https://designsystem.digital.gov/design-tokens/color/system-tokens/
- U.S. Web Design System — Theme color tokens
  https://designsystem.digital.gov/design-tokens/color/theme-tokens/
- U.S. Web Design System — State color tokens
  https://designsystem.digital.gov/design-tokens/color/state-tokens/
- U.S. Web Design System — Using color
  https://designsystem.digital.gov/design-tokens/color/overview/
- W3C WCAG 2.2 — Understanding Use of Color
  https://www.w3.org/WAI/WCAG22/Understanding/use-of-color
- Design Tokens Format Module 2025.10
  https://www.designtokens.org/tr/2025.10/format/
- W3C Community Group Report — Design Tokens Format Module 2025.10
  https://www.w3.org/community/reports/design-tokens/CG-FINAL-format-20251028/
