---
id: design-literacy-constraint-creativity-freedom-budget
title: "角丸を自由にしたら、創造性は増えるのか"
subtitle: "Design Literacy #62｜Constraintは創造性を殺すのではなく、自由の置き場所を変える"
created: "2026-09-20"
updated: "2026-09-20"
type: "Essay"
status: "完成"
tags: ["Design Literacy", "Constraint", "Design System", "HfG Ulm", "Hans Gugelot", "Otl Aicher", "Creativity", "UI"]
keywords: ["constraint", "degrees of freedom", "design system", "HfG Ulm", "Hans Gugelot", "Otl Aicher", "system design", "decision budget", "exploration space", "visual identity"]
series: "Design Literacy｜細部から思想まで"
seriesOrder: 62
abstract: "角丸を11pxにも13pxにもできる自由は、本当に創造性なのか。Design Systemの制約を禁止事項ではなく、有限な注意力をどこへ使うかを編集する仕組みとして捉え直す。HfG Ulmの方法化と内部批判、Hans Gugelotのsystem design、Otl Aicherらのidentity workを参照し、固定すべき変数と探索すべき変数を分ける実務へ戻す。"
---

# 角丸を自由にしたら、創造性は増えるのか
## Design Literacy #62｜Constraintは創造性を殺すのではなく、自由の置き場所を変える

角丸を11pxにする自由がある。12pxにもできる。13pxにもできる。誰も止めない。CSSも止めない。

**これは自由なのか。**

前回、Design Tokenを「毎回考え直さなくていい判断を作る仕組み」として見た。すると次の疑問が出る。fontも色もspacingもradiusも決めてしまったら、デザイナーは何をデザインするのか。

最初は、制約と創造性を綱引きのように考えていた。調べていくと、少し違って見えてきた。

> **良いConstraintは自由を消すのではなく、自由を使う場所を選び直す。**

![自由度を全部開く場合と探索先を選ぶ場合](https://raw.githubusercontent.com/silovar-uk/myessays/main/assets/design-literacy-constraint-creativity/freedom-budget.svg)

## 1. まず実験する｜全部を自由にしたカードは、何通りあるのか

カードを一枚作るとして、かなり雑に五つの変数だけ置く。

~~~text
font     20 choices
color    20
spacing  20
radius   20
shadow   20
~~~

独立した選択肢だと仮定すれば、組合せは3,200,000通りになる。

もちろん実際のデザイナーは320万案をFigmaに並べないし、各変数も独立ではない。これは制作量の予測ではなく、**自由な変数が増えると探索空間が急激に広がる**ことを見る思考実験だ。

そこでDesign Systemを入れる。

~~~text
font      3
color     6
spacing   6
radius    3
shadow    3
~~~

組合せは972通りまで落ちる。

急に創造性が3,200,000分の972になったのか。たぶん、そうではない。

「角丸11pxか12pxか」を考える時間が減ったぶん、「この情報をそもそもCardに分けるべきか」「写真は何を伝えるべきか」「CTAはここに必要か」という別の問いに時間を使える。

ここでは、この有限な検討余力を実務上の比喩として**decision budget**と呼ぶ。確立された学術用語ではない。

## 2. Constraintは「禁止」ではなく、探索空間の編集として見られる

たとえば試合告知のSNSクリエイティブを作る。

~~~text
FIX
brand type
brand color
spacing vocabulary
logo rules

EXPLORE
photography
message hierarchy
copy
composition
CTA
~~~

こうすると「自由が減った」というより、**どこを自由にするかを先にデザインした**状態になる。

逆にfont、radius、shadowまで毎回新しく考えながら、肝心の写真とmessage hierarchyが前回のtemplateのままなら、形式的な自由度は高くても伝達上の探索は浅い。

制約の反対は創造性ではない。制約の反対は、まず**未編集の選択肢**なのかもしれない。

## 3. BEFORE → AFTER｜「全部ちょっと違う」を個性と呼ばない

BEFORE:

~~~text
CARD A: radius 13 / padding 17 / title 19 / shadow A
CARD B: radius 16 / padding 20 / title 18 / shadow B
CARD C: radius 12 / padding 18 / title 20 / shadow C
~~~

全部違う。しかし差が情報の意味と対応していなければ、ユーザーが受け取るのは「三つの表現意図」ではなく「微妙に揺れる文法」かもしれない。

AFTER:

~~~text
Card anatomy = fixed
Padding = space-3
Radius = radius-medium
Title = heading-small
Shadow = elevation-1

EXPLORE
Image / Information priority / Copy / Grouping / CTA
~~~

ここで表現を消したわけではない。**表現を担当する変数を選んだ。**

前回#61のTokenが「値を再利用する仕組み」なら、今回は一段上がって、Design Systemを**探索しない場所と探索する場所の境界線**として見られる。

![FIXとEXPLOREを分ける](https://raw.githubusercontent.com/silovar-uk/myessays/main/assets/design-literacy-constraint-creativity/fix-explore.svg)

## 4. そのまま使える制作指示｜低価値な自由を固定し、高価値な自由を残す

> **ブランドやDesign Systemで決定済みのtypography、color、spacing、radiusなどは原則として再設計せず、今回の目的に直結する情報優先度、写真、構成、copy、interactionへ検討時間を集中してください。既存ruleを外す場合は「違う方が格好いい」ではなく、その例外が必要な情報上・機能上の理由を示してください。**

レビューなら、もっと短くていい。

> **「ここ、自由にする意味あります？」**

この質問はルールを守らせるためではない。**自由度そのものに優先順位をつけるため**に使う。

## 5. Ulmを調べると、「合理的な学校」で話を終えられなくなる

Hochschule für Gestaltung Ulm（HfG Ulm）は1953年に設立され、1968年まで活動した。Visual Communication、Product Design、Building、Information、のちにFilmなどを扱い、新しいdesign educationを実験した学校だった。

HfG Archiveの歴史記述で面白いのは、学校が一枚岩ではないことだ。初期にはMax BillがBauhausの継承を強く意識した。一方、1950年代後半には、よりscienceやtheoryを取り込んだ独自の教育モデルを求める議論が強まり、designerを「上位のartist」ではなくindustrial productionのdecision processに参加するpartnerとして捉える方向が打ち出された。

Source: https://hfg-archiv.museumulm.de/geschichte-hfg/geschichte/

さらに1960年代、数学的操作やergonomics、business analysisなどを取り込む科学化が進むと、今度はOtl Aicher、Hans Gugelot、Walter Zeischegg、Tomás Maldonadoらが、designはanalytical method以上のものでなければならないと反発したとHfG Archiveは記録している。

Source: https://hfg-archiv.museumulm.de/en/the-hfg-archive/history/

つまりUlmは「感性→合理性→完成」という単純な進化物語ではない。

**方法を増やしながら、方法に支配されることも警戒した。**

これはDesign Systemのruleを増やして安心したくなる現代の制作にも妙に刺さる。

## 6. Hans Gugelotを見ると、Systemは「同じ見た目」より大きい

HfG ArchiveはHans Gugelotを、戦後のsystem designのpioneerと位置づけている。1954年からHfG Ulmで教え、Braunの製品designなどにも関わった。

Source: https://hfg-archiv.museumulm.de/en/exhibition/hans-gugelot-100-en/

さらにArchiveの説明では、Gugelotにとってdesignerは表面的なcoolnessを作る人ではなかった。technical functionを理解し、user needsを考慮し、social and cultural responsibilityを担う職能として捉えられていた。

同じradiusを使うことはsystemのごく小さな一部でしかない。

**何を目的とし、誰が使い、どう作られ、どんな関係の中で機能するかを扱うことまでsystem側へ入ってくる。**

角丸13pxから始めたのに、だいぶ遠くへ来た。

## 7. もう一歩やりすぎる｜全部FIXしたら、本当にデザインは終わるのか

極端な条件を置く。

~~~text
font FIX / color FIX / spacing FIX / radius FIX
grid FIX / icon FIX / button FIX
~~~

ほぼ全部決まっている。ではデザイナーはいらない？

残るものを列挙すると、意外と多い。

~~~text
何を載せるか
何を捨てるか
何を先に見せるか
何を一緒にするか
何を別ページへ送るか
どの写真を選ぶか
どんな言葉を使うか
いつfeedbackするか
例外を認めるか
そもそも画面を作るべきか
~~~

むしろ見た目の自由を全部奪った瞬間、**情報設計・編集・interaction・判断の責任がむき出しになる。**

Design Systemがdesignerから仕事を奪うというより、場合によっては「装飾的な判断で忙しくして、本質的な問いを後回しにする逃げ道」を奪う。これは本稿の解釈であって、Ulmの歴史資料がそう述べているわけではない。

## 8. ただし「制約が多いほど偉い」にすると、即座に壊れる

~~~text
写真変更不可
copy変更不可
layout変更不可
color変更不可
component変更不可
deadline = 今日
~~~

この状態で「自由な発想をお願いします」は、だいぶ無茶だ。

Constraintは種類、強さ、目的、タイミングによって働きが違う。「制約が創造性を高める」を万能則にはできない。

そしてUlm自身も、方法化を進めながらdesignをanalytical methodへ還元しすぎることを内部で争っていた。

**Systemは思考を代替するためではなく、思考を配置するために使う。**

ルールが多いことと、成熟していることは同義ではない。

## 9. Otl Aicherを見ると、制約は「同じものを作る」より「違う媒体を同じ組織にする」ためにも使われる

HfG Archiveによれば、Otl AicherはHfGのco-founderでVisual Communication Departmentを率い、E5のメンバーとBraunやLufthansaのcorporate identityを手掛けた。Lufthansaについては、Archiveが1961/62年のsystematic visual identityとして紹介している。

Sources:
https://hfg-archiv.museumulm.de/en/bequests/the-bequest-of-otl-aicher/
https://hfg-archiv.museumulm.de/en/exhibition/from-logo-to-identity-visual-appearances-of-the-federal-republic-of-germany/

identity systemでは、すべてを同じposterにする必要はない。航空券、signage、広告、機体。媒体は違う。

それでもtype、color、mark、layout logicなどの関係を共有すれば「同じ組織から出てきた」と認識できる。

つまりruleは、同一化のためだけにあるのではない。

> **Variationを許しながらidentityを失わないためにもある。**

![制約は同一化ではなく変奏可能な文法にもなる](https://raw.githubusercontent.com/silovar-uk/myessays/main/assets/design-literacy-constraint-creativity/grammar-variation.svg)

ここで「Constraintは自由の敵」という最初の構図が、かなり崩れる。

## 10. 守破離で見る｜守る前に、何を守っているか知る

### 守｜まずsystemの語彙で作る

既存token、component、grid、typographyを使う。従順になるためではなく、既存systemが何を解決しようとしているのかを理解する。

### 破｜目的に合わないruleを特定する

「なんとなく違う」ではなく、「このcomponentでは情報優先度が逆転する」「このspacingではgroupingが誤読される」のようにruleと目的の衝突を言語化する。

### 離｜例外を作品で終わらせず、次のrule候補にする

例外が一度きりならexceptionでいい。複数案件で繰り返されるなら「system側が現実を表現できていないのでは？」と疑う。

ここで「破」が単なるルール破りから、**systemへのfeedback**になる。

## 11. 30秒でできるFreedom Audit

いま作っている画面を一つ開く。変更できるものを5個だけ書き、それぞれにFIXかEXPLOREを付ける。

~~~text
font      FIX
color     FIX
spacing   FIX
image     EXPLORE
copy      EXPLORE
~~~

最後に一問。

> **この制作で、本当に考える価値がある変数はどれ？**

全部自由にする必要はない。全部固定する必要もない。

**Freedom itself needs hierarchy.**

## 12. 調べる前と後｜13pxは自由ではなく、「自由を使う場所」の問題だった

最初の疑問へ戻る。角丸を13pxにできる。それは確かに一つの自由だ。

でも、自由であることと、**そこで自由を使う価値があること**は同じではない。

Design Systemの役割を禁止事項の一覧と見ると、constraintは窮屈に見える。探索空間の編集と見ると違う。

~~~text
低価値な判断 → systemへ預ける
高価値な判断 → humanへ残す
~~~

ただし、その線引き自体も永遠ではない。Ulmが方法化と方法批判を同時に抱えたように、systemそのものも批判と更新の対象になる。

> **Good constraints do not decide everything. They decide what no longer needs to be decided — and leave room to question that boundary.**

良い制約は、すべてを決めない。**もう考えなくていい場所を決め、そのぶん本当に考えるべき場所を人間へ返す。**

13pxを禁止したかったわけではなかった。

13pxについて悩む価値があるのかを、先に決めたかったのだ。

## 次につながる概念

次は**Identity System / Visual Grammar**へ進める。ブランドをLogoではなく、type / color / grid / image / icon / motion / voiceから「そのブランドらしいvariationを生成するgrammar」として見る。

## Sources

- https://hfg-archiv.museumulm.de/en/the-hfg-archive/history/
- https://hfg-archiv.museumulm.de/geschichte-hfg/geschichte/
- https://hfg-archiv.museumulm.de/en/exhibition/hans-gugelot-100-en/
- https://hfg-archiv.museumulm.de/en/bequests/the-bequest-of-otl-aicher/
- https://hfg-archiv.museumulm.de/en/exhibition/from-logo-to-identity-visual-appearances-of-the-federal-republic-of-germany/
