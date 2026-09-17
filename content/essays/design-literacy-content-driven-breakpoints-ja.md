# 「768pxだから崩す」って、768pxは何をしたん？

> **A breakpoint should happen when the content needs it, not when a device name tells you to.**  
> Breakpointは「iPad幅になった瞬間」やなく、**コンテンツがそのレイアウトに耐えられなくなった瞬間**に置く。

シリーズ：**Design Literacy｜細部から思想まで #51**  
レイヤー：**MICRO → MESO → MACRO**  
検索語：`Content-driven Breakpoints` / `Responsive Web Design` / `Media Queries` / `Reflow` / `Breakpoint Testing` / `Device-agnostic Design` / `Responsive Stress Testing` / `WCAG 1.4.10`

---

## 768px。お前、何をしたん？

Web制作をしていると、やたら顔を見る数字がある。

```css
@media (max-width: 768px) {
  ...
}
```

**768px。**

なんか偉そうである。

769pxでは普通に横並びだったものが、768pxになった瞬間に縦並びへ崩れ、ナビゲーションは消え、カードは1列になる。

でも画面は1pxしか縮んでいない。

文章の意味も変わっていない。人間の手の大きさも変わっていない。カードが「もう限界です」と申告したわけでもない。

なのに、**768pxだから**という理由で世界が急変する。

一度ちゃんと聞いてみたい。

> 768px、お前は何をしたん？

この疑問を掘っていくと、Breakpointは「端末の境界線」ではなく、**コンテンツがそのレイアウトに耐えられなくなる境界線**として考えたほうが自然だと分かってくる。

---

## 1. 今日のテーマ｜Content-driven Breakpoints

前回のIntrinsic Web Designでは、「PCなら3列」のような結果を先に決めるのではなく、カードの最小幅やgapのような**制約からレイアウトを生む**話をした。

今回は、その考えをBreakpointまで広げる。

よくある設計はこうだ。

```text
Desktop   1024px〜
Tablet    768〜1023px
Mobile    〜767px
```

分かりやすい。

でも、ここには暗黙の前提がある。

> 768px付近で、デザイン上なにか重要なことが起きる。

本当に起きるんやろか。

そこで、端末の名前をいったん全部消してみる。

---

## 2. まず一言｜Start from failure, not devices

**Don’t start from device widths. Start from failure.**

端末幅から始めず、**デザインが壊れる瞬間から逆算する。**

Brad Frostは2010年代前半から、Media QueryのBreakpointをpopular device dimensionsではなく、**contentに決めさせる**考え方を繰り返し提唱してきた。

重要なのは、768pxや1024pxが悪いという話ではない。

問題は、

> その数字に、コンテンツ側の理由があるか。

や。

---

## 3. 具体的な仕組み｜Breakpoint Hunting

架空のヘッダーを作る。

```text
┌─────────────────────────────────────────┐
│ LOGO   NEWS  MATCH  TEAM  SHOP   LOGIN │
└─────────────────────────────────────────┘
```

そしてブラウザを少しずつ縮める。

```text
1000px  ○
900px   ○
820px   ○
781px   ○
754px   △
731px   ×
```

731pxで`MATCH`と`TEAM`の間が詰まり、もう少し縮めると文字が折れる。

このとき初めて、

> **Time for a breakpoint.**

になる。

構造はこう。

```text
DEVICE
↓
768px
↓
CHANGE
```

ではなく、

```text
CONTENT
↓
FAILURE
↓
BREAKPOINT
```

になる。

Breakpointを「決める」というより、**壊れる瞬間を見つける**。

---

## 4. やりすぎ実験｜1pxずつ縮めたら、何が最初に死ぬのか

せっかくなので、もう一歩やりすぎる。

画面を1000pxから500pxまで、1px単位で縮めるとする。

もちろん人力で500回確認する必要はない。DevToolsやresize操作でゆっくり連続的に動かせばいい。

観察するのは「全体の美しさ」ではなく、最初に起きる**failure event**。

例えばこんな分類にする。

```text
A. TEXT FAILURE
文字が不自然に折れる

B. COLLISION FAILURE
要素同士がぶつかる

C. DENSITY FAILURE
情報密度が高すぎて読む気が失せる

D. ACTION FAILURE
CTAが押しにくくなる

E. INFORMATION FAILURE
重要情報を隠さないと成立しなくなる
```

すると、同じサイトでもBreakpointは一個ではないことが見えてくる。

```text
NAV      760px
CARD     684px
HERO     912px
FILTER   838px
```

この数字たち、ぜんぜんキリがよくない。

でもむしろ、そこがいい。

**コンテンツから出てきた数字は、端末カタログの数字より不格好になりやすい。**

---

## 5. Before → After｜768pxを一回消す

### Before

```css
@media (max-width: 768px) {
  .nav {
    display: none;
  }
}
```

このコードだけを見ると、768pxに意味があるように見える。

### After

まずNavigationを縮めて観察する。

```text
796 ○
782 ○
771 ○
763 △
751 ×
```

仮に760px付近で破綻するなら、760pxを基準に考える。

ただし、Design System全体で768pxを共通tokenとして使っているなら、760と768の差を吸収できるかを確認したうえで768を採用してもいい。

つまり、同じ768pxでも理由が変わる。

```text
BEFORE
768だから変える

AFTER
760付近で壊れる
↓
768というsystem breakpointで安全に吸収できる
↓
768を採用
```

この8pxの差は小さい。

でも、**設計思想の差は大きい。**

---

## 6. そのまま使える制作・修正指示

> PC／タブレット／スマートフォンの代表幅だけでブレークポイントを決めず、ブラウザ幅を連続的に変更して、文字の折返し、要素同士の干渉、CTAの圧迫、情報階層の崩れが最初に発生する幅を確認してください。その幅を基準にブレークポイントを設定し、既存のDesign System breakpointへ吸収する場合は、品質が維持できる範囲かを確認してください。

レビューではもっと短くていい。

> **「この768px、何が壊れるから768pxなんですか？」**

答えが、

> iPadだから。

だけなら、一回疑っていい。

---

## 7. Accessibilityとの接続｜「壊れる」は見た目だけではない

ここで一度、笑いを止める。

「レイアウトが壊れる」というと、文字が重なる、カードが狭くなる、といった見た目を想像しやすい。

でもaccessibilityでは、failureはもっと広い。

WCAG 2.2のSuccess Criterion 1.4.10 Reflowでは、コンテンツが拡大された状況でも、原則として情報や機能を失わず、二次元スクロールを必要としないことが求められる。

つまりfailureには、

```text
VISUAL FAILURE
文字が重なる

FUNCTIONAL FAILURE
操作できない

READING FAILURE
横スクロールしないと文章を追えない

INFORMATION FAILURE
重要情報が消える
```

まで含まれる。

Breakpointは単なる「見た目調整」の境界ではなく、**情報アクセスを維持するための介入点**でもある。

---

## 8. 歴史・思想との接続｜Responsive Web Designは「端末表」から始まったわけではない

ここは解釈を混ぜず、事実と分けて見る。

**事実。** Ethan Marcotteは2010年のA List Apartの記事で「Responsive Web Design」という言葉を広く定着させ、fluid grids、flexible images、media queriesを組み合わせた設計を提示した。

**解釈。** その重要性は、単に「スマホ対応のCSSテクニックを増やした」ことではない。

Webを、固定されたキャンバスに一枚ずつ完成画面を置くメディアとしてではなく、**幅が変化し続ける環境として扱い直した**点にある。

だからContent-driven Breakpointsは、Responsive Web Designから外れた特殊テクニックではない。

むしろ、その思想を突き詰めたものとして読める。

```text
FIXED CANVAS
決めた幅に合わせる

↓

RESPONSIVE
環境に応答する

↓

CONTENT-DRIVEN
コンテンツが耐えられる範囲から介入点を探す
```

---

## 9. 誤解しやすい点｜共通Breakpointは全部ダメ？

違う。

```text
640
768
1024
1280
```

のような共通tokenには明確な利点がある。

Design System全体の一貫性を保ちやすい。実装とQAの組み合わせも減らせる。

だから、

> device-derived breakpointは禁止。

ではない。

順番を変える。

```text
× 768だから変える

○ 760付近でcontentが壊れる
  ↓
  system breakpointの768で吸収できる
  ↓
  768を採用
```

**同じ数字でも、観察から来た768と慣習から来た768は別物。**

---

## 10. 以前の学びとの接続｜指定から観察へ

ここ4回は一本につながっている。

```text
#48 Fluid Typography
固定値 → 関係

#49 Container Queries
画面 → 局所環境

#50 Intrinsic Design
結果 → 制約

#51 Content-driven Breakpoints
端末分類 → 破綻の観察
```

これまでdesignerは、

> 何を指定するか

を中心に考えていた。

今日から少し違う。

> **何が起きたら介入するか。**

を見る。

**Responsive Design is partly observational design.**

レスポンシブ設計には、作る能力だけでなく、**壊れる瞬間を観察する能力**が要る。

これが今日の「前より解像度が上がる接続」。

---

## 11. 30秒でできる観察｜Disco Test

好きなWebサイトをPCで開く。

ウィンドウ幅を、

```text
広い
 ↓
狭い
 ↓
広い
 ↓
狭い
```

と適当に動かす。

見るポイントは一つだけ。

> **最初に「ちょっと嫌やな」と感じた瞬間はどこ？**

文字が孤立した？

Navigationが窮屈？

カード内CTAが2行になった？

画像が意味不明なcropになった？

その瞬間の幅を見る。

それが**breakpoint candidate**。

Figmaの375 / 768 / 1440だけ見ていたときには存在しなかった情報や。

---

## 12. 図で見る｜Breakpointは「端末の境界」ではなく「品質の崖」

```text
QUALITY
100% ────────────────────────┐
                              │
                              │
                              ▼
                              ×  ← FAILURE
                              │
                              │ intervention
                              ▼
        ─────────────────────────

      1000  900  800  760  700px
                  ↑
          breakpoint candidate
```

この図で見ると、Breakpointは「768pxという線」ではなく、**品質が崖から落ちる直前に置く安全柵**に近い。

### Visual reference

Responsive Web Designの歴史的文脈を確認する場合は、Ethan MarcotteによるA List Apartの記事「Responsive Web Design」の図版・本文を参照できる。

画像や引用を記事に追加する際は、出典ページのURLを明示して使う。

- https://alistapart.com/article/responsive-web-design/
- https://bradfrost.com/blog/post/7-habits-of-highly-effective-media-queries/
- https://www.w3.org/WAI/WCAG22/Understanding/reflow.html

---

## 13. 次に覚えるとつながる概念｜Responsive Designの「歴史」

ここまで4回、技術側からResponsive Designを見てきた。

次は一度MACROへ上がる。

そもそも、

**なぜWebデザインは「固定された紙みたいなページ」を作ろうとしていたんやろ？**

そして、Ethan Marcotteが2010年にResponsive Web Designを提示したとき、何を変えようとしていたのか。

次は、

**Responsive Web DesignはCSSテクニックではなく、何に対する思想転換だったのか**

を見る。

---

## 今日の中心命題

> **A good breakpoint marks a change in what the content can sustain, not merely a change in device category.**

良いBreakpointは、

> ここからTablet。

という境界線ではない。

**このままの表現では、contentの品質を維持できなくなる境界線。**

最初、768pxを見たときは、

> よく使われてるから。

で済んでいた。

でも、調べた後では問いが変わる。

> **767pxになった瞬間、具体的に何が困るん？**

何も困らないなら、そのBreakpointはまだ来てへん。

Breakpointを探すというより、**コンテンツが「もう無理」と言う瞬間を聞く。**

そう考えると、768pxそのものは悪くない。

ただ、以前よりちょっとだけ気の毒に見えてくる。

あいつは何もしていないのに、長年ずっとレイアウト崩壊の責任を負わされていた。

---

## Sources

- Brad Frost, “7 Habits of Highly Effective Media Queries”  
  https://bradfrost.com/blog/post/7-habits-of-highly-effective-media-queries/
- Ethan Marcotte, “Responsive Web Design”, A List Apart  
  https://alistapart.com/article/responsive-web-design/
- W3C WAI, “Understanding Success Criterion 1.4.10: Reflow”  
  https://www.w3.org/WAI/WCAG22/Understanding/reflow.html
