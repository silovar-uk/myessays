---
id: design-literacy-graphical-perception-visual-encoding
title: 円グラフの42%を、ほんまに42%っぽく見抜けるか
subtitle: Design Literacy #36｜A number is translated into something the eye must judge
created: 2026-09-12
updated: 2026-09-12
type: Essay
status: published
tags: [Design Literacy, Data Visualization, Graphical Perception, Visual Encoding, UI]
keywords: [Graphical Perception, Visual Encoding, Cleveland McGill, Position, Length, Angle, Area, Pie Chart, Bar Chart]
favorite: false
grow: true
series: Design Literacy｜細部から思想まで
seriesOrder: 36
abstract: Same data, different visual problem. Cleveland and McGillのGraphical Perceptionを入口に、数字がposition、length、angle、areaへencodeされた瞬間、ユーザーが何を判断させられているのかを見る。
---

# 円グラフの42%を、ほんまに42%っぽく見抜けるか

Pie chartを見ていると、ときどき妙な気持ちになる。

「42%」と書いてあるsliceを見て、僕は本当に42%を**see**しているんやろうか。

Remove the label, and suddenly confidence disappears. あの角度だけを見て「これは42、こっちは38」と言える気がしない。なのに数字が横へ置かれると、全部理解したような顔をしてしまう。

So this time, let's mentally hide the numbers.

## 数字は、画面に置かれた瞬間に別のものになる

Suppose A = 42 and B = 38.

Bar chartなら、主にposition on a common scaleやlengthとして差を見る。Pie chartならangleやarea、bubble chartならareaとして量を判断する。

Same data. Different visual task.

1984年、William S. ClevelandとRobert McGillは、この「information encoded on graphsを人間がvisual decodingする過程」を **graphical perception** として扱った。

Their proposed ordering of elementary perceptual tasks was roughly:

1. position along a common scale
2. position along nonaligned scales
3. length / direction / angle
4. area
5. volume / curvature
6. shading / color saturation

ここで覚えたいのは“chart ranking”ではない。

**How you encode a number changes what the eye has to do.**

## ちょっとやりすぎて、42と38をいろんな形にしてみる

42と38、differenceはたった4。これを別々のvisual encodingへ変換してみる。

### LENGTH

```text
A █████████████████████ 42
B ███████████████████   38
```

Same baselineなので、Aが少し長いことを比較しやすい。

### ANGLE

Now turn them into pie slices.

42% = 151.2°、38% = 136.8°。differenceは14.4°。

数字で書くと結構ある。でもwithout labelsで二つのsliceを別々に見せられて、「14.4° difference」と当てるのは急に難しい。

### AREA

さらにcircle areaへencodeする。

ここではdiameterではなくareaが量を表すよう正しく設計する必要がある。それでも、人間はcommon baselineのbarを読むときとは別のestimationをする。

Same 42 and 38. Three different problems.

数字って、意外とshape-shifterや。

## FACT｜ClevelandとMcGillは「グラフにも知覚の科学が必要」と考えた

Their 1984 paper starts from a clear problem: graphical methods for data analysis and presentation need a scientific foundation.

彼らはelementary perceptual tasksを整理し、quantitative judgmentのaccuracyについてorderingを仮説化し、experimentsで検討した。

Position vs length、position vs angleなどの比較では、position judgmentsの方がaverage errorが小さい結果も報告されている。

But the paper is more careful than the internet slogan version.

彼ら自身、accuracy of quantitative extractionがgraphの価値のすべてではないと書いている。また、10個のtasksを完全にindependentなbasic unitsとして分離できたとは現実的に主張できない、とlimitationsも述べている。

So “position wins, pie charts are banned” is stronger than the paper itself.

## INTERPRETATION｜グラフを選ぶ前に、読者に何をさせたいかを決める

Back to production.

SNS実績がInstagram 48、X 42、TikTok 39、YouTube 35だったとする。

If the task is simply “Which is biggest?”, many chart forms can work.

でも「XとTikTokの3-point differenceを比較してほしい」なら必要なprecisionが変わる。

Chart preferenceより先に **task** を決める。

```text
TASK
↓
What difference must users perceive?
↓
Required perceptual precision
↓
ENCODING
↓
CHART
```

“Pie chart looks nice”から始めると、順番が逆になる。

## Before → After｜「円グラフを棒にする」より一歩手前を見る

### Before

> 4項目あるのでpie chartにしてください。

The shape of the dataset is choosing the chart.

### After

> 4項目間のsmall differencesを比較させたいので、common baselineからposition / lengthを比較できるencodingを優先してください。

ここではまだ“bar chart”すらanswerとして固定していない。

Choose the encoding from the task, then choose the chart.

制作レビューなら一言でいい。

> **その数字、ユーザーの目には何として見えていますか？ / What does this number become to the eye?**

Position? Length? Angle? Area? Color?

このquestionを一回挟むだけで、graph reviewの解像度が上がる。

## 円グラフを全部追放すると、今度は別の雑さが始まる

Graphical Perceptionを覚えると、pie chartを見つけるたびに取り締まりたくなる。

But that is another shortcut.

ClevelandとMcGillが主に扱ったのは、quantitative informationをどれだけaccurately extractできるかという問題。Graphs can also serve other tasks: rough part-to-whole understanding, category presence, patterns, explanatory speed, and more.

So the durable rule is not “pie bad / bar good.”

**Task → Encoding → Chart.**

この順番の方が長持ちする。

## #35からの接続｜デザインは「何を前に出すか」だけでなく「何に変換するか」でもある

#35 Anonymous Designでは、Designer / Brand / Content / Userのうち、who gets to speak? を考えた。

Today the question gets smaller and stranger.

数字そのものはscreenで直接見られない。Position、length、angle、area、colorなどのvisual propertiesへtranslateされる。

Design is not merely placing information.

**It also chooses what information becomes perceptually.**

これを知ると、42%というlabelの横にあるsliceが急に無邪気ではなくなる。

「あ、君は42をangleとして説明することにしたんやな」と見える。

The chart stops being a container for numbers. It becomes a translation device between data and human perception.

## 30秒観察

今日見かけたgraphを一つだけ選ぶ。

Pretend the labels are hidden.

- What is the reader supposed to compare?
- 数字はposition / length / angle / area / colorのどれになっている？
- Do small differences matter?
- Would another encoding fit the task better?

Pie chartかbubble chartを見つけたら特に面白い。

「俺はいま、本当にこのdifferenceを目で読めてる？」

その疑問が出たらsuccessや。

## 次につながる概念｜Preattentive Attributes

Next, we move even earlier than accuracy.

色、方向、大きさ、位置などの一部のfeaturesは、一つずつ意識的に探す前から目立つことがある。

**Preattentive Attributes**を学ぶと、「which encoding is more accurate?」から「what enters attention first?」へ視点が移る。

グラフだけでなく、poster、Web、ticket page、SNS creativeまで一気につながる。

---

### 今日の中心命題

**A number is never just shown. It is encoded into something the eye must judge.**

数字はそのまま表示されるのではない。

**It is translated into something human perception can judge.**

### 専門語 / Search terms

`Graphical Perception` / `Visual Encoding` / `Elementary Perceptual Tasks` / `Position` / `Common Scale` / `Length` / `Angle` / `Area` / `Cleveland & McGill` / `Data Visualization`

### Sources

- William S. Cleveland & Robert McGill, “Graphical Perception: Theory, Experimentation, and Application to the Development of Graphical Methods,” *Journal of the American Statistical Association*, 79(387), 1984, pp. 531–554. DOI: 10.1080/01621459.1984.10478080
- Open-access course copy of the Cleveland & McGill paper, University of Washington.
