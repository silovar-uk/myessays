---
id: design-literacy-graphical-perception-visual-encoding
title: 円グラフの42%を、ほんまに42%っぽく見抜けるか
subtitle: Design Literacy #36｜数字は表示されるのではなく、目が判断する形へ翻訳される
created: 2026-09-12
updated: 2026-09-12
type: Essay
status: published
tags: ["Design Literacy", "Data Visualization", "Graphical Perception", "Visual Encoding", "UI"]
keywords: ["Graphical Perception", "Visual Encoding", "Cleveland McGill", "Position", "Length", "Angle", "Area", "Pie Chart", "Bar Chart"]
favorite: false
grow: true
series: Design Literacy｜細部から思想まで
seriesOrder: 36
abstract: 同じ42%でも、棒の長さとして見るのと円の角度として見るのでは、人間が解く視覚問題が違う。ClevelandとMcGillのGraphical Perceptionを入口に、グラフを「数字の容器」ではなく知覚への翻訳装置として考える。
---

# 円グラフの42%を、ほんまに42%っぽく見抜けるか

円グラフを見ていると、ときどき妙な気持ちになる。

「42%」と書いてある扇形を見て、僕は本当に42%を見抜いているんやろうか。

ラベルを消された瞬間、あの角度を見て「これは42、こっちは38」と言える気がまるでしない。にもかかわらず、数字が印刷された途端に、こちらは全部理解したような顔をしている。

そこで今回は、数字を隠したつもりでグラフを見る。

## 数字は、画面に置かれた瞬間に別のものになる

たとえばAが42、Bが38だとする。

棒グラフなら、主に共通の基準線上の位置や長さとして差を見る。一方、円グラフなら角度や面積、バブルチャートなら面積として量を判断することになる。

データは同じなのに、目に課される問題が違う。

1984年、William S. ClevelandとRobert McGillは、この「グラフに符号化された情報を人間が視覚的に復号する過程」を **graphical perception** として扱い、理論と実験から数量判断に関わる elementary perceptual tasks を整理した。

論文で提示された順序は、概ね次の通りだった。

1. position along a common scale
2. position along nonaligned scales
3. length / direction / angle
4. area
5. volume / curvature
6. shading / color saturation

ここで重要なのは「棒グラフランキング」を作ることではない。**同じ数値でも、何へencodeするかによって、人間が行う判断の性質と精度が変わる**ということだ。

## ちょっとやりすぎて、42と38をいろんな形にしてみる

42と38という、たった4の差を頭の中で変換してみる。

### LENGTH

```text
A █████████████████████ 42
B ███████████████████   38
```

同じ起点から伸びているので、Aが少し長いことを比較しやすい。

### ANGLE

今度は円の扇形にする。

42%は151.2度、38%は136.8度。差は14.4度ある。

数字にすると結構違う。しかし、ラベルなしで二つの扇形を別々に見せられて「14.4度差です」と当てるのは急に難しくなる。

### AREA

さらに円そのものの面積へ変換する。

ここでは直径ではなく面積が量を表すよう正しく設計する必要がある。それでも、人間は棒の共通基準線を読むときとは違う推定を求められる。

同じ42と38が、急に三種類の問題になった。

数字って、意外と変身する。

## FACT｜ClevelandとMcGillは「グラフにも知覚の科学が必要」と考えた

彼らの1984年論文の出発点は、グラフによるデータ分析・提示には科学的基盤が必要だ、という問題意識だった。論文は elementary perceptual tasks を特定し、その数量判断の正確さについて順序を仮説化し、実験で検討している。

実験ではpositionとlength、positionとangleなどが比較され、positionによる判断の方が平均的な誤差が小さい結果も報告された。

ただし彼ら自身も、accuracy of quantitative extractionだけがグラフの価値ではない、と明記している。また後段では、10個の課題を完全に独立した基本単位として分離できたとは現実的に主張できない、と限界も述べている。

ここを飛ばして「position最強、円グラフ禁止」とすると、論文より強いことを言ってしまう。

## INTERPRETATION｜グラフを選ぶ前に、読者に何をさせたいかを決める

実務へ戻す。

たとえばSNS実績が、Instagram 48、X 42、TikTok 39、YouTube 35だったとする。

「Instagramが最大で、YouTubeが最小」という大枠を伝えるだけなら、多くの表現が成立する。

しかし「XとTikTokの3差を比較してほしい」なら話が変わる。

必要なのはチャートの好みではなく、先に **task** を決めることだ。

```text
TASK
↓
どの程度の差を読ませる？
↓
必要な知覚精度
↓
ENCODING
↓
CHART
```

「円グラフがおしゃれだから」から始めると順番が逆になる。

## Before → After｜「円グラフを棒にする」より一歩手前を見る

### Before

> 4項目あるので円グラフにしてください。

これだと、データの形がチャートを決めている。

### After

> 4項目間の小さな数値差を比較させたいので、共通の基準線から位置・長さを比較できる表現を優先してください。

ここでは「棒グラフ」という答えすらまだ固定していない。

目的からencodingを選び、その結果としてchart typeを決める。

制作指示なら、さらに短くできる。

> **その数字、ユーザーの目には何として見えていますか？**

Positionなのか。Lengthなのか。Angleなのか。Areaなのか。Colorなのか。

この問いを一回挟むだけで、グラフレビューの解像度が上がる。

## 円グラフを全部追放すると、今度は別の雑さが始まる

Graphical Perceptionを知ると、円グラフを見つけるたびに取り締まりたくなる。

でも、それも危ない。

ClevelandとMcGillの研究が主に扱ったのは数量をどれだけ正確に抽出できるかという問題であって、グラフが担う目的はそれだけではない。全体に対する大まかな構成、カテゴリの存在、パターン、説明の速度など、別の目的もある。

だから覚えるべきなのは「pie bad / bar good」ではない。

**Task → Encoding → Chart.**

この順序の方が長持ちする。

## #35からの接続｜デザインは「何を前に出すか」だけでなく「何に変換するか」でもある

前回のAnonymous Designでは、Designer / Brand / Content / Userのうち、誰を前に出すのかを考えた。

今回は、その問いがさらに小さくなる。

数字そのものは目で直接見られない。画面ではposition、length、angle、area、colorなど、何らかの視覚属性へ変換される。

つまりデザインは情報を置くことではない。

**情報を、何として知覚させるかを選ぶことでもある。**

これを知ると、42%というラベルの横にある扇形が急に無邪気ではなくなる。

「あ、君は42をangleとして説明することにしたんやな」と見える。

グラフが数字の容器から、**人間の知覚へ情報を翻訳する装置**に変わる。

## 30秒観察

今日見かけたグラフを一つだけ選ぶ。

数字を一度隠したつもりで、次を確認する。

- 何を比較させたいグラフか
- 数字はposition / length / angle / area / colorのどれになっているか
- 小さな差まで読ませる必要があるか
- 別のencodingなら目的に近づくか

円グラフかバブルチャートを見つけたら特に面白い。

「俺はいま、本当にこの差を目で読めてる？」

その疑問が出たら、今日の講義は成功や。

## 次につながる概念｜Preattentive Attributes

次は、正確さよりさらに前へ行く。

色、方向、大きさ、位置などの一部の特徴は、一つずつ意識的に探索する前から目立つことがある。

**Preattentive Attributes**を学ぶと、「どれが正確に比較できるか」から「何が最初に目へ飛び込むか」へ視点が移る。

グラフだけでなく、ポスター、Web、チケット販売ページ、SNSクリエイティブまで一気につながる。

---

### 今日の中心命題

**A number is never just shown. It is encoded into something the eye must judge.**

数字はそのまま表示されるのではない。

**人間の目が判断できる何かへ翻訳されて、初めて画面に現れる。**

### 専門語 / Search terms

`Graphical Perception` / `Visual Encoding` / `Elementary Perceptual Tasks` / `Position` / `Common Scale` / `Length` / `Angle` / `Area` / `Cleveland & McGill` / `Data Visualization`

### Sources

- William S. Cleveland & Robert McGill, “Graphical Perception: Theory, Experimentation, and Application to the Development of Graphical Methods,” *Journal of the American Statistical Association*, 79(387), 1984, pp. 531–554. DOI: 10.1080/01621459.1984.10478080
- Open-access course copy of the Cleveland & McGill paper, University of Washington.