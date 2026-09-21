---
id: design-literacy-controlled-variation-brand-elasticity
title: "ブランドガイドを守るほど、全部同じ顔になるのはなぜか"
subtitle: "Design Literacy #64｜Controlled Variationで「どこまで壊していいか」を設計する"
created: "2026-09-21"
updated: "2026-09-21"
type: "Essay"
status: "完成"
tags: ["Design Literacy", "Brand", "Controlled Variation", "Brand Elasticity", "Identity System", "Otl Aicher", "UI", "守破離"]
keywords: ["controlled variation", "brand elasticity", "invariant", "degrees of freedom", "identity system", "Otl Aicher", "NASA Graphics Standards", "visual grammar", "守破離"]
series: "Design Literacy｜細部から思想まで"
seriesOrder: 64
abstract: "ブランドガイドラインを守っているのに、なぜ制作物が全部同じ顔になるのか。Identityを支える不変要素と、案件ごとに探索できる可変要素を分け、Consistencyを『変化しないこと』から『変化しても同じものだと分かること』へ捉え直す。"
---

# ブランドガイドを守るほど、全部同じ顔になるのはなぜか
## Design Literacy #64｜Controlled Variationで「どこまで壊していいか」を設計する

ブランドガイドラインを100％守った。

ロゴ位置も合っている。指定書体も使った。ブランドカラーも正しい。余白も前回と同じ。なのに、新商品も採用も年末キャンペーンも、全部「いつものやつ」に見える。

**守ったのに、弱くなってない？**

前回はVisual Grammarを「同じ部品を使うことより、部品同士の関係を繰り返すこと」と捉えた。すると次の疑問が出る。文法があるなら、毎回同じ文章を書く必要はないはずだ。

今回調べたかったのは、ブランドを守る方法ではない。

> **どこまで壊しても、まだ同じブランドなのか。**

この問いに変えると、ガイドラインは「禁止事項の冊子」から「可動域の設計図」に見え始める。

![ブランドの可動域：CORE / RANGE / FREE](https://raw.githubusercontent.com/silovar-uk/myessays/main/assets/design-literacy-controlled-variation/elasticity-map.svg)

## 1. 「変えてはいけない」を増やすと、前回踏襲が合理的になる

制作会社へ「ブランドガイドラインに沿ってください」とだけ渡す。

制作側から見ると、何を変えてよくて、何を変えると事故なのかが分からない。すると最も安全なのは前回のレイアウトをコピーすることになる。

ここで問題なのは、制作者の発想力ではないかもしれない。

**許容されるvariationの境界が見えていない。**

そこで実務上、ルールを三層に分けてみる。

~~~text
CORE
変えるとidentityや機能要件が壊れる

RANGE
定義された範囲で変えられる

FREE
案件目的に応じて積極的に探索する
~~~

たとえば一例として、

~~~text
CORE
logo geometry
brand name
accessibility requirement

RANGE
type scale
color balance
grid
spacing
image ratio

FREE
photography
composition
copy
motion
campaign motif
~~~

と置ける。

これは普遍的な分類ではない。ブランドごとに境界は違う。

だから重要なのは分類表そのものではなく、**境界を明示する行為**だ。

## 2. 「32pxを守る」から「何を守るための32pxか」へ進む

たとえば見出しを常に32pxに固定する。

数値としては一貫している。しかしスマートフォンと大型サイネージで同じ32pxが同じ役割を果たすとは限らない。

そこでruleを、

~~~text
Heading = 32px
~~~

から、

~~~text
Heading = 24–48px
Bodyとの階層差を維持する
主要見出しとして最初に認識できる
~~~

へ変える。

すると守る対象が「値」から「役割」へ移る。

ここでControlled Variationという言葉を、本稿では**identityを維持する不変条件を残しながら、意図的に変化可能な範囲を設ける実務的な考え方**として使う。特定の一つの歴史的design theoryを指す用語としては扱わない。

数値を緩めたのに、ruleはむしろ具体的になっている。

**良いガイドラインは、制約を減らすのではなく、制約の抽象度を選ぶ。**

## 3. BEFORE → AFTER｜「守ってください」ではなく「ここは走っていい」を渡す

BEFORE:

> ブランドガイドラインに沿って制作してください。ブランドカラー、指定書体、既存フォーマットを使用してください。

間違ってはいない。

ただ、制作側には「変更すると怒られる場所」しか見えない。

AFTER:

> ロゴ、基本書体、ブランドカラーのsemantic roleは維持してください。一方、写真比率、トリミング、情報配置、余白量、copy scaleは案件目的に応じて変更可能です。既存layoutの再現より、「何を維持すれば同一ブランドとして認識できるか」を優先してください。

これなら、守備範囲ではなく**可動域**を渡せる。

![禁止事項中心から可動域中心へ](https://raw.githubusercontent.com/silovar-uk/myessays/main/assets/design-literacy-controlled-variation/brief-before-after.svg)

## 4. Otl Aicherを100枚見ると、「systematic = 同じ顔」が怪しくなる

ここで歴史へ降りる。

HfG-Archiv Ulmによれば、Otl AicherはHfG Ulmの共同創設者で、Visual Communication Departmentを率い、E5 development groupとBraunやDeutsche Lufthansaのcorporate identityを手掛けた。1968年にはMunich Olympic Gamesのdesign責任者となり、その後に開発されたpictogramは国際的なsymbol systemへ広がった。

Source: https://hfg-archiv.museumulm.de/en/bequests/the-bequest-of-otl-aicher/

同Archiveに残るAicherの資料は、約350 projects、4,000 posters、27,000 sketches、30,000 slidesに及ぶ。

ここで数字の異様さが効いてくる。

4,000枚のポスターが全部「同じテンプレート」だったら、それはそれで怖い。

実際、HfG-Archivの「Otl Aicher 100 Years 100 Posters」は、Ulm Adult Education Center、1972 Munich Olympics、文化、政治、企業など異なる目的のposterを並べ、彼のgraphic workのdiversityを示している。

Source: https://hfg-archiv.museumulm.de/en/exhibition/otl-aicher-100/
Source: https://hfg-archiv.museumulm.de/wp-content/uploads/2021/12/EXHIBITION-FOLDER-OTL-AICHER-100-YEARS-100-POSTERS-HFG-ARCHIV.pdf

ここから「AicherがBrand Elasticity理論を唱えた」とは言えない。そんな史実を足す必要はない。

しかし、**systematicなidentity workと、多様な個別表現が同居し得る**という観察はできる。

systemはvariationの反対ではない。むしろvariationを成立させる土台にもなり得る。

## 5. Lufthansaのidentityは、「同じもの」ではなく「同じ家族」を作る問題だった

HfG-Archivは、Aicher率いるE5が1961/62年にLufthansaのsystematic visual identityを設計したと説明している。

Source: https://hfg-archiv.museumulm.de/en/exhibition/from-logo-to-identity-visual-appearances-of-the-federal-republic-of-germany/

航空会社には機体がある。広告がある。案内表示がある。印刷物がある。

全部を同じレイアウトにすることはできない。

媒体も距離も機能も違うからだ。

そこでidentityを保つには、「同じ画面を再現するrule」より、**違う出力を同じ家族へ所属させる関係のrule**が必要になる。

前回#63のVisual Grammarが、ここでControlled Variationへ進む。

文法があるから、違う文章を書ける。

## 6. NASAの1976年マニュアルは、意外と「全部固定」ではない

比較のためにNASAを見る。

1976年のNASA Graphics Standards Manualは、NASAのpublicationsにvisual consistencyとdesign excellenceを求め、各publicationをidentity effortのextensionとして扱っている。

ただし興味深いのは、その直後だ。

NASAはpublicationsの数と性質が多様なので、guidelinesは**大部分においてgeneral**であり、typographyやlogotypeなど一部についてspecificだと説明している。

Source: https://www.nasa.gov/wp-content/uploads/2015/01/nasa_graphics_manual_nhb_1430-2_jan_1976.pdf

つまり、

~~~text
全部をspecificにする
~~~

ではない。

~~~text
identity上specificであるべき場所
+
多様性に対応するgeneralな場所
~~~

を分けている。

現在のNASA Brand Guidelinesも、clear and consistent visual identityを目的としながら、Insignia、Logotype、Typography、Supporting Elementsなどを別々に規定する。

Source: https://www.nasa.gov/nasa-brand-center/brand-guidelines/

ここから「NASAがCORE / RANGE / FREEを採用している」とは言わない。それは本稿の分類を資料へ逆輸入することになる。

ただし、**すべてを同じ精度で固定しない**という設計思想を読み取る比較材料にはなる。

## 7. もう一歩やりすぎる｜ブランドを一個ずつ壊してみる

ガイドラインを読むだけでは、何がidentityを支えているか分かりにくい。

なので逆に壊す。

これを**Identity Stress Test**と呼ぶ。

~~~text
TEST 1
Logoを消す

TEST 2
Brand colorを白黒にする

TEST 3
Typefaceを別のものにする

TEST 4
Gridを崩す

TEST 5
Photography styleを変える

TEST 6
Copy toneだけ残す
~~~

一個ずつ変更して、「どの瞬間に別ブランドに見え始めるか」を観察する。

ここで意外なことが起こる。

ロゴを消してもブランドらしい画面がある。一方、ロゴを置いてブランドカラーを塗っているのに、全然そのブランドらしくない画面もある。

identityは部品の所有ではなく、**複数のcueが作る冗長な認識**として成立している可能性がある。

するとブランドガイドの仕事も変わる。

「正解の見本を一枚示す」より、**どのcueが壊れるとidentityが壊れるかを示す**ほうが、制作現場では役立つかもしれない。

![Identity Stress Test](https://raw.githubusercontent.com/silovar-uk/myessays/main/assets/design-literacy-controlled-variation/stress-test.svg)

## 8. UIへ戻す｜ガイドライン自体を「読むPDF」から「判断する道具」へ変える

ここからは**提案**。

ブランドガイドやDesign SystemのUIを、章立てされた長いdocumentだけで終わらせない。

最初の画面を三列にする。

~~~text
CORE
絶対に保持
────────
Logo
Semantic color roles
Accessibility
Naming

RANGE
範囲内で調整
────────
Grid
Type scale
Spacing
Density
Image ratio

FREE
積極的に探索
────────
Photography
Composition
Campaign motif
Motion
Copy expression
~~~

各項目を押すと、

~~~text
WHY
なぜ守るのか

RANGE
どこまで変えられるか

BREAK TEST
何をすると壊れるか

EXAMPLES
成功例 / 失敗例
~~~

だけが出る。

便利さを優先するなら、検索より先に**判断可能性**を置く。

驚きを入れるなら、派手なanimationではなく「Break this brand」というstress-test modeを用意する。logo、color、type、gridをtoggleで消し、どこまでidentityが残るかを比較できる。

遊びに見えるが、目的は明確だ。

**ガイドラインを暗記するUIから、境界を理解するUIへ変える。**

## 9. 守破離で運用する｜「破」を違反ではなくfeedbackにする

Controlled Variationは守破離と相性がいい。

### 守｜COREを理解して使う

まず既存ruleを使う。ただし「書いてあるから」ではなく、何の認識・機能・アクセシビリティを守っているのか理解する。

### 破｜RANGEの中で意図的に振る

写真を極端に大きくする。余白を広げる。copyを短くする。構図を変える。

ruleを無視するのではなく、**許された自由度を使い切る。**

### 離｜繰り返す例外をsystemへ戻す

例外が一度ならexception。

三度出るなら、現実のvariationをsystemが表現できていない可能性がある。

ここで「破」は違反ではなく、**systemを学習させる観測データ**になる。

これは#62のConstraintから一段進んでいる。前は「どこへattentionを使うか」だった。今回は「variationの結果をどうsystemへ返すか」まで入る。

## 10. 誤解しやすい点｜Elasticityは「何でもあり」の洒落た言い換えではない

自由度を増やすだけなら、systemはいらない。

~~~text
NO SYSTEM
何でも変えられる

RIGID SYSTEM
何も変えられない

ELASTIC SYSTEM
何を保持し
何をどこまで変えられるか分かる
~~~

Controlled Variationの肝はvariationではなく**controlled**側にある。

そしてcontrolの対象は見た目だけではない。アクセシビリティ、legal requirement、information hierarchyなど、案件都合で自由に壊してはいけないものもある。

ブランドらしさを理由に可読性を落とすなら、本末転倒だ。

「自由にする場所を決める」とは、自由を増やすことではない。

**自由に責任の境界線を引くこと**だ。

## 11. 前より解像度が上がる接続｜Consistencyは「同じ」から「戻ってこられる」へ

ここまでの流れを並べる。

~~~text
#61 TOKEN
判断を再利用する

#62 CONSTRAINT
探索する場所を選ぶ

#63 VISUAL GRAMMAR
判断をどう組み合わせるか決める

#64 CONTROLLED VARIATION
文法を保ったまま、どこまで変奏できるか決める
~~~

するとConsistencyの意味が変わる。

「毎回同じ位置に同じものがある」だけではない。

大きく変化しても、ユーザーが

> あ、これは同じブランドだ

と戻ってこられる。

つまり強いidentityとは、動かないidentityではなく、**変化から復元できるidentity**とも考えられる。

## 12. 調べる前と後｜ブランドガイドは「柵」ではなく「コースの白線」に見えてきた

最初は「ブランドを守るほど全部同じ顔になる」という小さな違和感だった。

調べる前は、解決策を「もっと自由にすること」だと思っていた。

違った。

自由を増やすだけでは、今度はidentityが溶ける。

必要なのは、

~~~text
何を絶対に保持するか
何を範囲内で動かすか
何を大胆に探索するか
そして、例外をいつsystemへ戻すか
~~~

を設計することだった。

> **Consistency is not the absence of variation. It is the ability to vary without losing identity.**

ブランドガイドは、デザイナーを止める柵ではない。

**「ここまでは走っていい」と示すコースの白線であり、その白線自体も走行データを見ながら引き直すものなのかもしれない。**

だから次にガイドラインを見るときは、「何を守る？」だけでは足りない。

もう一問いる。

> **どこなら、思い切り壊していい？**

## 次につながる概念

次はUIへさらに降りて、**State / Variant / Component State Machine**を見る。

Buttonはdefault、hover、focus、pressed、loading、disabledへ変化してもButtonであり続ける。

ブランドのControlled VariationとUI ComponentのState Designは、一見遠い。

でも両方とも、問うていることは同じだ。

**「何を保ったまま、何を変えるか。」**

## Sources

- https://hfg-archiv.museumulm.de/en/bequests/the-bequest-of-otl-aicher/
- https://hfg-archiv.museumulm.de/en/exhibition/otl-aicher-100/
- https://hfg-archiv.museumulm.de/wp-content/uploads/2021/12/EXHIBITION-FOLDER-OTL-AICHER-100-YEARS-100-POSTERS-HFG-ARCHIV.pdf
- https://hfg-archiv.museumulm.de/en/exhibition/from-logo-to-identity-visual-appearances-of-the-federal-republic-of-germany/
- https://www.nasa.gov/nasa-brand-center/brand-guidelines/
- https://www.nasa.gov/wp-content/uploads/2015/01/nasa_graphics_manual_nhb_1430-2_jan_1976.pdf
