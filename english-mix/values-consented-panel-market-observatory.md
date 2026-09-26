---
id: values-consented-panel-market-observatory
title: "ヴァリューズ（VALUES）は、競合サイトの管理画面に入らずに競合を見る"
subtitle: "250万人規模のconsented behavioral logsから、市場を「人の移動」として観測する会社"
created: "2026-09-26"
updated: "2026-09-26"
type: "リサーチエッセイ"
status: "完成"
tags: ["ヴァリューズ", "Dockpit", "行動ログ", "マーケティングリサーチ", "データ分析"]
keywords: ["株式会社ヴァリューズ", "ドックピット", "インターネット行動ログ", "消費者パネル", "拡大推計", "競合分析"]
grow: 5
abstract: "株式会社ヴァリューズを、ただのweb analytics companyやsurvey companyではなく、consented consumer panelのbehavioral logsからdigital marketを観測する『observatory』として捉える。Dockpitの仕組み、250万人規模のpanelとexpansion estimation、surveyとの接続、創業者の経歴とサービスの歴史、Google Analytics 4やSimilarwebとの違い、panel dataの限界、AI時代の展開まで検証する。"
---

# ヴァリューズ（VALUES）は、競合サイトの管理画面に入らずに競合を見る
## 250万人規模の許諾済み行動ログから、市場を「人の移動」として観測する会社

How many people visited a competitor's site last month? どこから流入したのか。What did they search for, and which sites did they visit before and after?

普通に考えると、you cannot know that without entering the competitor's analytics dashboard. 自社サイトならGoogle Analytics 4（GA4）で詳しく追える。しかし他社の解析画面に入る権限はない。それなのに、株式会社ヴァリューズのDockpitは、競合サイトの訪問動向や流入、検索行動などを分析対象にできる。

It looks, just a little, like a spy tool.

もちろん、the trick is not intrusion. Dockpit is not looking inside a competitor's admin dashboard. It observes internet behavior from consumer monitors who have given explicit permission. 政府統計ポータルサイトの「ビッグデータ・ポータル」に掲載された説明によれば、ヴァリューズは250万人規模のbehavioral-log monitor membersから毎日の検索・閲覧データを取得し、internet population compositionに合わせて一人ひとりの重みを調整する拡大推計を行っている。

This distinction changes the whole picture. 「競合サイトの中を見る会社」ではなく、**it observes how people move across the internet and estimates the shape of the market from those movements**. 会社紹介を読むより、まずこのobservation methodを理解したほうが、ヴァリューズという会社の輪郭は早く見えてくる。

> **Information date: 2026-09-26**
>
> 本稿は、ヴァリューズの公式情報、政府のビッグデータ・ポータル、他社の公式資料、調査方法論の研究を突き合わせて整理した。Claims such as「国内最大規模」「世界初」that VALUES uses about itself are treated separately from facts independently verified by third parties.

[ヴァリューズ公式「ドックピット」](https://www.valuesccg.com/dockpit) ／ [政府統計ポータルサイト「ビッグデータ・ポータル：Dockpit」](https://www.e-stat.go.jp/bigdataportal/dataintro/324)

## 1. ドックピットの数字は「競合サイトの実測値」ではなく、人の側から作る推計値である

First, remove the easiest misunderstanding. Dockpit's estimate of competitor visitors is not a complete measured count taken directly from that company's analytics server. ヴァリューズが保有するconsumer monitor panelのbehavioral logsを土台に、母集団へ広げて推計した数字である。

政府のビッグデータ・ポータルでは、データ取得方法を「明確な使用許諾を得た250万人の行動ログモニター会員から毎日の検索・閲覧データを取得」と説明している。It also says VALUES performs expansion estimation by adjusting each person's weight to the composition of the internet population, while handling attributes such as sex, age, residence, marital status, children, and household income.

たとえば、if men in their thirties are overrepresented in the observed panel, simply adding everyone would distort the market picture. そこで構成比に応じて各観測値へweightを与え、「このpanelで見えた行動が、より大きな人口ではどの程度に相当するか」を推定する。It is not a census, and it is not watching every person's browser. 観測されたsampleからpopulationを推定する、調査の仕事である。

This also changes what “2.5 million people” means. 大きな人数は観測の土台を厚くするが、**seeing 2.5 million people does not mean 2.5 million raw facts can simply be pasted onto the whole market**. 重要なのは、who joins the panel, which behaviors are within measurement scope, how weighting works, and at what granularity estimates remain stable.

つまりDockpitは、a little like a telescope. 遠くの星そのものを手元へ持ってくるわけではない。It collects limited light, corrects it, and estimates a larger unseen whole. 競合サイトが突然透明になるのではなく、**市場を観測するためのwindowが一枚増える**のである。

[政府統計ポータルサイト「ビッグデータ・ポータル：Dockpit」](https://www.e-stat.go.jp/bigdataportal/dataintro/324) ／ [ヴァリューズ公式「データプラットフォーム」](https://www.valuesccg.com/service/dataplatform/)

## 2. ヴァリューズの本体は「サイト分析」より、人を起点に行動をつなぐ観測基盤にある

If you only look at competitor visitor counts, VALUES looks like a website analytics company. だが、それだけでは事業の広がりを説明しにくい。現在の同社は、data platform、分析・consulting、施策設計・実行、digital transformation（DX）支援、海外marketing research、mediaなどを展開している。

その中心にあるのが、siteではなく「人」を起点にデータを結び付ける発想である。Dockpitは市場や競合の動きを見る。Perscopeはweb behaviorとsurveyを組み合わせ、対象者の属性や価値観、検討前後の行動を重ねる。分析・consultingでは、同社が「見るデータ」と「聞くデータ」と表現する二種類の情報を組み合わせる。

ここで架空の例を置く。Suppose someone searches for「ランニングシューズ　膝痛」, reads a comparison article, visits three brand sites, and a few days later opens one brand's store locator. 行動ログだけなら「what happened」の順序が見える。アンケートだけなら「why they think they chose it」を本人へ尋ねられる。両者を同じ人の単位で結び付けられると、発言だけでもclickだけでもない、「行動と意識の対応」を検討できる。

ただし、causality does not appear automatically. あるページを見た後に購入意向が高まっていても、そのページが原因だとは限らない。People already highly interested may simply be more likely to visit that page. ヴァリューズのデータが増やすのは、まずobservabilityであって、因果関係の保証ではない。

The distinctive point is not merely “having lots of data.” **It layers different ways of observing at the person level and turns them into marketing questions.** サイト分析会社というより、消費者のdigital behaviorを研究対象へ変えるためのmeasurement infrastructureと考えたほうが近い。

[ヴァリューズ公式「事業・サービス」](https://www.valuesccg.com/service/) ／ [ヴァリューズ公式「分析・コンサルティング」](https://www.valuesccg.com/service/analysis-consulting/) ／ [ヴァリューズ公式「ペルスコープ」](https://www.valuesccg.com/perscope/)

## 3. 創業者がネット調査会社を経て始めた会社は、「聞く」だけでなく「見る」方向へ伸びた

The company's origin gives this measurement idea a prehistory. 代表取締役社長の辻本秀幸は、リクルートに20年間在籍し、旅行や求人などの事業に携わった後、2006年にマクロミル社長へ就任した。He founded VALUES in 2009. ヴァリューズ自体は2009年9月30日に設立され、2026年4月1日時点で従業員275人、資本金1億円である。

ここから「survey companyからbehavioral-log companyへ転向した」と単純化するのは正確ではない。ヴァリューズは創業時から事業成長支援を掲げ、現在もアンケートやconsultingを重要な手段としている。ただ、製品の歴史には、the range of observable behaviorを増やしてきた流れがはっきりある。

2013年、インターネット行動ログ分析サービスを自動集計システム化したVALUES eMark+を公開。In 2020 it launched Dockpit, and in 2024 Perscope, which combines web behavior with surveys. 2025年には生成AIを使ったインタビュー調査基盤NautsHub、2026年にはGoogle Analytics 4の可視化とAI要約を行う「らくらくAnalytics」、さらにDockpit AIエージェントを投入している。

When these releases are lined up, the change looks larger than simple product expansion. 最初は「データを集計して見せる」ことが中心だったものが、対象者の理解、調査、提案知識の共有、AIによる分析支援へと広がっている。一方で、土台に残っているのは「what can we observe about people?」という問題である。

There is no primary source I found that proves Tsujimoto's Macromill experience directly caused the current product philosophy. ここは事実と解釈を分ける必要がある。ただ、**「人に聞く」調査の世界を知る経営者が創業した会社が、「人の行動を見る」データを育て、現在は両方を重ねている**というhistorical sequenceは確認できる。会社の成長は、質問票を捨てた物語ではなく、the story of adding observation methodsとして読むほうが無理がない。

[ヴァリューズ公式「代表・役員プロフィール」](https://www.valuesccg.com/about/profile/) ／ [ヴァリューズ公式「会社概要・沿革」](https://www.valuesccg.com/about/companyinfo/)

## 4. グーグル・アナリティクス4、シミラーウェブ、ヴァリューズは、同じ「アクセス分析」でも立っている場所が違う

Even within web analytics, tools can stand at very different observation points. ここを整理すると、ヴァリューズの位置が分かりやすい。

- **Google Analytics 4（GA4）**：自分が管理するsiteやappへmeasurement tagを設置し、そこで起きた閲覧や操作を詳しく測る。It is strong for first-party data on your own property, but in principle it cannot collect the internal data of a competitor site where your tag is not installed.
- **Similarweb**：自社説明では、siteやappから共有されるdirect measurement data、世界各地のcontributor network、partners、public dataなど複数のsignalsを統合し、machine learningなどでdigital marketを推定する。世界規模で多様なinput sourcesを混ぜる方式である。
- **VALUES**：日本のconsumer monitor behavioral logsを中核に、attributesやsurveysを人の単位で結び付け、市場、競合、検索、検討行動などを分析する。Dockpitの競合分析だけでなく、Perscopeの生活者理解やconsultingへ同じ思想が伸びている。

These three are not a simple ranking. 自社サイトのボタン一つ一つまで改善したいなら、まず自社のfirst-party measurementが必要になる。世界各国の大きなmarket comparisonでは、複数国・複数signalsを統合するserviceが自然な場面もある。日本の生活者について、競合をまたいだ閲覧行動と属性・意識をつなぎたいなら、ヴァリューズ型のpanelが効いてくる。

要するに、違うのは画面の見た目ではなく**observation point**である。店内に置いた防犯カメラ、街全体の交通量sensor、同意した人に同行して作る行動日誌では、同じ「人の動き」でも見えるものが違う。When comparing analytics tools, ask “where did this number come from?” before comparing feature lists.

[グーグル公式「Googleタグについて」](https://support.google.com/analytics/answer/11994839?hl=ja) ／ [シミラーウェブ公式「データの測定方法」](https://www.similarweb.com/corp/ourdata/) ／ [政府統計ポータルサイト「ビッグデータ・ポータル：Dockpit」](https://www.e-stat.go.jp/bigdataportal/dataintro/324)

## 5. パネル型データの強みは「同じ人を横断して見られること」であり、弱みもまた「その人たちを見ていること」にある

So far, panel-based behavioral logs look extremely useful. 実際、同じmonitorの検索、閲覧、属性などを横断的に扱えることは、site-level aggregationだけでは得にくい情報を生む。しかし、every observation window has a frame.

第一に、panel participantsは無作為に選ばれた日本人全体と同じとは限らない。2020年の社会調査研究では、公募型のweb survey monitorsには、人口統計属性や主要なweb activityを統制した後でもself-selectionによる回答傾向の差が残り得ることが示された。This study did not evaluate VALUES's panel itself, but it offers a general warning: do not treat a registered panel as a perfect miniature of the population.

第二に、expansion estimationは偏りを魔法のように消す処理ではない。性別や年代など既知の構成差はweightingで補正できても、参加意欲、device use、measurement coverageなど、重みに入っていない違いまで自動的に消えるわけではない。For small sites, rare actions, or very narrow targets, sample sizes also shrink and estimates can become less stable.

第三に、privacyとtransparencyがmeasurement qualityの一部になる。ヴァリューズは「明確な使用許諾」を得たmonitorsからデータを取得すると説明し、情報セキュリティマネジメントシステム（ISMS）の認証も掲げている。Behavioral logs can use searches and browsing recorded within the measurement scope rather than only what people remember and report later, but those searches and browsing can contain highly private information. だから「取れるか」だけでなく、「under what consent, what is collected, at what granularity, and how it is handled」が事業の信頼性そのものになる。

The interesting part is that strength and limitation come from the same place. **同じモニターを横断して観測できるから、サイトをまたいだ行動が見える。同じモニターを観測しているから、誰がそのpanelに入っているかが重要になる。** Understanding behavioral-log data does not mean simply trusting the number; it means reading the observation conditions that make the number possible.

[吉村治正「ウェブ調査の結果はなぜ偏るのか」（2020年）](https://www.jstage.jst.go.jp/article/jsr/71/1/71_65/_article/-char/ja) ／ [ヴァリューズ公式「会社概要・沿革」](https://www.valuesccg.com/about/companyinfo/) ／ [政府統計ポータルサイト「ビッグデータ・ポータル：Dockpit」](https://www.e-stat.go.jp/bigdataportal/dataintro/324)

## 6. 人工知能で速くなるほど、「どのデータを根拠にしたか」が前より重要になる

In August 2026, VALUES launched Dockpit AI Agent. 同社の説明では、AIが課題を推論し、行動ログから必要なデータを抽出し、分析し、示唆を言語化し、レポート作成まで支援する。Some of the operations previously performed by analysts are being moved to a conversational AI interface.

これは単なるtime-saving featureではない。大規模言語モデル（LLM）が一般のweb informationだけから市場を語る場合と、許諾された自社保有のbehavioral logsを参照して市場を語る場合では、回答のgroundingが違う。ヴァリューズ自身も、独自の行動ログをAIに接続する点を強調している。

However, proprietary data does not make every conclusion automatically correct. パネルの範囲、推計方法、質問の置き方、分析期間、比較対象の選定に問題があれば、AIはそれを高速に処理してしまう。生成された「insight」は、観測事実そのものではなく、dataから導いたinterpretationである。

むしろAIが分析操作を短くするほど、人間の仕事は一段上へ移る。**What are we asking? Which population are we talking about? Which numbers are facts, and where does interpretation begin?** 操作の手間が減るほど、measurement designとcritical readingの価値は上がる。

VALUES moving into AI in 2026 is therefore not simply a story of “a data company becoming an AI company.” より正確には、長年作ってきたobservation infrastructureの上に、問いかけと解釈のinterfaceとしてAIを載せ始めた、と見ることができる。

[ヴァリューズ公式「Dockpit AIエージェント提供開始」](https://www.valuesccg.com/news/20260806-12529/) ／ [ヴァリューズ公式「会社概要・沿革」](https://www.valuesccg.com/about/companyinfo/)

## 7. ヴァリューズが売っているのは「競合の秘密」ではなく、市場を見るための観測所である

Return to the first question. なぜ、競合サイトの管理画面に入れないのに、競合の訪問動向が見えるのか。

The answer is not that VALUES is looking inside the competitor site. 許諾を得た人たちの側からinternet movementを観測し、そのsampleを人口構成に合わせて推計しているからである。It is different from first-party measurement on your own site, survey-only research, and global digital-market estimates built from multiple signal sources.

調べる前、Dockpitの面白さは「他社の数字まで見える」ことにあるように思えた。After the research, it looks almost the other way around. 競合サイトの秘密が開いているのではない。**By placing the observation point on the consumer side, it becomes possible to look across company-specific dashboards and see a market.**

そう考えると、株式会社ヴァリューズを「web analytics company」と呼ぶだけでは少し足りない。調査会社、data company、consulting company、AI活用会社という顔は確かにある。だが、それらを一本につなぐのは、what should be measured, and how, to understand people outside the companyというmeasurement designである。

It looks like a business that sells numbers, but it is also selling **where to place the observation point**.

競合サイトを見る道具を調べていたはずが、最後に残ったのは、**from where does a market become visible as a market?** という、かなり古典的な調査の問いだった。

[ヴァリューズ公式「会社概要・沿革」](https://www.valuesccg.com/about/companyinfo/) ／ [ヴァリューズ公式「事業・サービス」](https://www.valuesccg.com/service/) ／ [政府統計ポータルサイト「ビッグデータ・ポータル：Dockpit」](https://www.e-stat.go.jp/bigdataportal/dataintro/324)
