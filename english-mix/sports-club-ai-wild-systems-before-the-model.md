---
id: sports-club-ai-wild-systems-before-the-model
title: AIセミナーなのに、一番気になるのが「野良システム」である
subtitle: プロスポーツクラブのAI活用を、ベイスターズの実践とデータ基盤から予習する
created: 2026-09-16
updated: 2026-09-16
type: Essay
status: published
tags: ["AI", "スポーツDX", "横浜DeNAベイスターズ", "ユーフォリア", "データ活用"]
keywords: ["プロスポーツクラブ", "AI活用", "横浜DeNAベイスターズ", "ユーフォリア", "ONE TAP SPORTS", "QUARIA AI", "野良システム", "スポーツアナリティクス", "Human-in-the-Loop", "データ基盤"]
grow: true
abstract: プロスポーツクラブのAI adoptionを扱うeventを前にpublic materialsを追うと、目立ってきたのはgenerative AIの使い方ではなく、measurement、data integration、現場へのfeedback、そして「野良システム」だった。横浜DeNAベイスターズのcatcher・pitcher・hitter支援、ユーフォリアのONE TAP SPORTSとQUARIA AI、AI policyを手掛かりに、当日出そうな論点と会場で聞きたいquestionsを整理する。AI implementationの前に、clubは何を整えておく必要があるのか。
---

# AIセミナーなのに、一番気になるのが「野良システム」である

AI adoptionのseminarに行く前にprogramを読んでいたら、AIより先に「野良システム」というwordで手が止まった。

野良猫なら、まだ姿が想像できる。Wild systemは何を食べて、どこで寝ているのか分からない。しかも今回のtitleには「悪意ではなく善意から生まれます」とまで書いてある。たぶん、作った人は仕事を楽にしたかった。周りも助かった。気づけば誰もofficialには管理していないのに、止まると困る。かなりhumanな生き物である。

今夜のprogramは、前半が「プロスポーツクラブにおけるAI活用の現在地と実践」で、横浜DeNAベイスターズのcaseとクラブ向けsurveyを扱う。後半は「蓄積したデータをAI活用へつなげる」で、そのentranceに野良システムが置かれている。順番だけを見ると、AIのsuccess casesを見たあと、「ところで、そのAIに食わせるdataは本当に大丈夫ですか」とgroundを掘り返す構成に見える。

そこで、speaking session前に公開されているmaterialsを先回りして読んだ。すると、予想していた「どのgenerative AIを使うか」「promptをどう書くか」という話より、もっと手前のproblemが見えてきた。ベイスターズのAI adoptionは、chat screenから始まっていない。ユーフォリアのAIも、LLMだけで完結していない。共通していたのは、現場のambiguityをdataにし、そのdataを人が判断できる形へ戻すことだった。

以下は、public informationとして確認できるfactsと、そこから当日話題になりそうなpointsを分けながら整理したpre-event noteである。登壇者が実際に何を話すかは当日まで分からない。だからこそ、predictionが外れたところも含めて聞く準備をしておきたい。

## AIより先に、「野良」が出てくる

まず「野良システム」は、今回のsession titleにある言葉であって、平山鉄兵氏の詳しいdefinitionは事前公開資料では確認できなかった。そこで予習用には、official platformやmanagement ruleの外で、localな困りごとを解くために育ったspreadsheet、personal database、small tool、automationなどをまとめてそう呼ぶことにする。これはあくまでworking definitionであり、当日は最初にdefinitionを確かめたい。

このassumptionで考えると、「悪意ではなく善意から生まれる」はかなり正確なdescriptionになる。入力が面倒だから自分のsheetを作る。既存systemでは欲しい一覧が出ないからCSVを加工する。毎週同じ転記をするのでscriptを書く。問い合わせが多いから別のformを作る。一つずつはrationalで、むしろ仕事ができる人ほど作りやすい。

問題は、そのsmall successがorganizationのstandardになる瞬間である。Data field nameは誰が決めたのか。更新はいつなのか。同じ「来場者」でも発券数なのか入場認証数なのか。作った本人が異動しても動くのか。API keyはどこにあるのか。AIは大量のdataを扱えるが、「売上A」と「売上B」のmeaningが違うことをorganizationの代わりに決めてはくれない。

予習用にさらに乱暴にclassifyすると、野良システムには「personal memo型」「department ledger型」「integration hub型」「退職者遺産型」がある。最後だけ急にhorror storyに見えるが、本質は同じである。便利さのownerがindividualのまま、organizationのdependencyだけが上がっていく。この状態でAI adoptionを急ぐと、latest modelより先に「which data is correct?」というquestionで止まる。

## ベイスターズのAIは、チャットではなく「測れなかったものを測る」から始まった

横浜DeNAベイスターズのpublic casesを見ると、AIのimageがかなり変わる。DeNAが2025年の「DeNA × AI Day」で公開したteam development casesは、catcher、pitcher、hitterの三つである。いずれもgenerative AIにtacticsを相談する話ではない。これまで人間が見てはいたが、stableにquantifyしにくかったphenomenaを測れるようにする話だった。

Catcherでは、scorebook、TrackMan、Hawk-Eyeなどのdataを使い、catchingやthrowingなどのabilityを評価するmodelとvisualization toolを作っている。Blockingでは、単にwild pitch・passed ballのresultだけを見るのではなく、1球ごとにpassed-ball probabilityをestimateする。難しい球を止めたvalueと、止めやすい球を逸らしたimpactを同じ一回として数えないためである。数字ができると、coachとplayerが「何となくここが弱い」ではなく、videoとnumbersを同じ場所で見ながら話せるようになる。

DeNAのmaterialは、このroleを「地図アプリ」にたとえている。頑張るのはplayerで、journeyに寄り添うのはcoach。AI teamはcurrent positionとgoalまでのdistanceを明確にし、迷子を減らす。このmetaphorは、AIを「answerを出す人」に置かず、「判断する人たちのcoordinateを揃えるtool」に置いている点がおもしろい。

Pitcherではさらに露骨である。当初は、videoからcatcherがmittを構えたlocationをestimateし、「狙ったところに投げるability」であるcommandを測れるようにした。しかし、measurementに成功したあとでAI team自身が「ここで終わっていいのか」と問い直した。Farm pitching coachが本当に欲しかったのはcommand valueそのものではなく、「もっと多くのpitcherをfirst-team levelへ引き上げること」だったからだ。

そこでdevelopmentは、command measurementから「first-team lineと各pitcherのdistanceをvisualizeする」方向へpivotした。Public materialでは、2024 seasonのfirst-team promotion decisionや、登板翌日のplayer・coachによるreviewにも使われたとされる。AIのjobは、modelを完成させることではなく、decision loopに入るところまでだった。

Hitterでは、4台の600fps high-speed cameraとAI motion analysisを組み合わせ、biomechanistが日常的にfeedbackできるsystemを整えた。Materialでは、feedback件数が2021年のoff-season数件から、2024年には月10〜20件へ増えたと紹介されている。ここでもvalueは「AIが打撃を教えた」ことではない。Human expertがanalysisに使うtimeを短くし、feedback frequencyを上げたことにある。

## いちばん重要なのは、モデル精度より「誰をどんな状態にしたいか」

Pitcher commandのcaseは、今回のeventを予習するうえで特にimportantだと思う。DeNAのmaterialでは、productを「Vision」「Why」「誰をどんな状態にしたいか」「What」に分けて整理し、「command abilityを試合映像から計測する」は最下層のWhatにすぎないと捉え直している。Technically successfulなfeatureでも、上位のpurposeにつながらなければcompleteではない。

これはAI implementationで起きやすいorder reversalに、そのまま使える。「meeting minutesをAIで作ろう」「chatbotを置こう」「prediction modelを作ろう」は全部Whatである。その前に、誰のどのdecisionを変えたいのか、その人がどういうstateになればsuccessなのかを決めないと、usage countだけがKPIになりやすい。

ベイスターズのspeaker lineupにも、このpointは表れている。住田ワタリ氏は現在、コミュニケーションデザイン本部人事部のTeam Design Groupを率い、過去にはorganization・people developmentや海外teamとのcoordinationを担当してきた。斉藤羽那氏はprogram上、data analyst IT担当として登壇する。Engineerだけでなく、organization・people sideとdata sideが並んで話すのであれば、focusは「AIを作った」だけでなく「どう現場に入れたか」に広がる可能性が高い。

さらにベイスターズは、fan-facingでもgenerative AIを使っている。DeNA Engineeringのpublic articleでは、real-time AI commentary機能「BASE☆BLUE」で、単にpromptへ「多様な表現を」と書くだけではmonotonousな文が続き、状況別のpatternや直前outputのhistoryを与え、application sideでもcontrolする必要があったことが説明されている。Team performanceとfan experienceではuse caseが違うが、「AIに自由にやらせる」より「人が使えるframeをdesignする」という点ではよく似ている。

## AIは現場の判断を奪うより、判断の座標を揃える

このviewは、facilitatorの千葉洋平氏のcareerとも相性がいい。千葉氏はフェンシング日本代表のanalystとしてOlympicsを含む競技現場に関わり、現在はユーフォリアでnational teamsやprofessional teamsのsupport、high-performance organizationのconsultingに携わっている。過去のlecture introductionでも、sports analyticsを「最終的に人が決定するために、どのようなinformationを提供できるか」というcontextで扱っている。

ここでAIに対するexpectationを少し下げると、むしろpracticalityが上がる。AIがmanagerやcoachの代わりにcorrect answerを決めるのではなく、「current position」「benchmark」「change」「exception」を見つけやすくする。Expertのconversationが速くなる。Player自身もreviewに参加しやすくなる。Decision makerを消すのではなく、decision materialsを揃える方向である。

これはcompetition sideだけの話ではない。たとえばticket salesでも、売れた・売れないというresultだけでなく、どのcustomer segmentがどのtimingでreactionし、どこでdrop-offしたかを同じdefinitionで追えれば、「next action」のconversationは変わる。SNSでも、post countやtotal viewsだけでなく、狙ったbehaviorとのdistanceが見えればmapになる。ベイスターズの「地図アプリ」というconceptは、sports clubのbusiness sideにもtransferできる。

当日ぜひ聞きたいのは、実際にそのmapを使う人が「信用するまで」に何が必要だったかである。Model accuracyが高くても、現場がnumbersのmeaningを理解できなければ使われない。逆に、perfectではなくても、calculation logicとlimitationが共有され、daily reviewに入ればvalueを持つ。このborderはAI technologyより、communicationとorganization designのproblemに近い。

## ユーフォリア側から見ると、「蓄積したデータ」の意味が変わる

後半themeの「蓄積したデータをAI活用へつなげる」は、ユーフォリアのcurrent businessを見るとかなりconcreteになる。ONE TAP SPORTSは、playerのsubjective condition、training load、GPSなどのobjective data、injuryやphysical informationなどを一つのoperationに集める方向で拡張されてきた。2026年の同社発信では、71 sports・1,700以上のteamsに広がり、dataをexperienceやintuitionを消すものではなく「共通言語」として扱っている。

そして2026年、ユーフォリアはmulti-agent AI「QUARIA AI」を公開した。特徴的なのは、LLMによるconversationだけをAIと呼んでいないことである。Time-series dataからcurrent stateをdigital twinとして捉え、sports scienceのknowledge、mathematical calculation・optimization algorithm、LLMを組み合わせて、goalとの差分とnext actionを示すdesignになっている。

同社のAI policyも示唆的で、customer dataをAI modelのtraining・retrainingに使わないこと、enterprise向けのnon-training environmentを使うこと、prompt injectionなどへの対策、人間中心のHuman-in-the-Loop、output根拠やreference dataを示すexplainabilityを掲げている。Sportsではconditionやhealth informationのように扱いを誤れないdataが多い。AI adoptionは、analysis accuracyだけでなく、誰が見られるか、何に使ってよいか、final decisionを誰が持つかまで含む。

さらにユーフォリアは鹿屋体育大学とのprojectで、ONE TAP SPORTSに蓄積されたconditionやtraining dataを、将来的なperformance predictionやoptimized training recommendationにつなげるresearchを進めている。つまり「蓄積」は単なるstorageではない。継続して同じdefinitionで取られ、time seriesとして比較でき、別のdataとjoinできて初めてAIのmaterialになる。

## そこで「野良システム」が急に怖くなる

ここで前半と後半がconnectする。AIが得意なのは、大量のinformationからpatternを見つけたり、複数のconditionsをまとめたりすることだ。しかし、dataが散らばっていて、fieldのmeaningがdepartmentごとに違い、update timeもownerも分からない場合、そのsmartnessを使う前のworkが巨大になる。

極端なthought experimentをしてみる。あるclubで、match dataはexternal service、player conditionはdedicated tool、staff observationsはspreadsheet、video tagsは別software、ticketはsales system、attendanceはgate authentication、SNSは各platform、sponsor activationのresultsは担当者のdeckにあるとする。これは実在clubの状況を示したものではなく、sports organizationで起こり得るdata fragmentationを意図的に極端にしたhypothetical exampleである。

ここで「AIで全部analysisしよう」と言っても、最初に必要なのはmodel selectionではない。「誰をsame personとしてjoinするのか」「numbersはいつfinalizeするのか」「missingはzeroなのかnot enteredなのか」「access permissionは誰にあるのか」「same KPI nameがdifferent definitionになっていないか」という地味なcheckである。AIがhigh-performanceになるほど、input sideのambiguityまでplausibly補完してしまうriskも増える。

もう一つ、もっとsimpleなtestがある。「そのsystemを一番分かっている人が1か月休んでも、same numbersが出るか」。出ないなら、その仕組みは便利でもorganization assetになり切っていない。野良システムを一律にbanする必要はない。むしろ現場の工夫は、新しいdemandを見つけるsensorでもある。必要なのは、育った野良をどのtimingでshared assetへpromoteするかというruleである。

SHCとユーフォリアは2025年にpartner agreementを結び、data・technologyのknowledgeとsports management human-capital developmentを組み合わせる方針を公表している。今回の場も、そのextensionで見ると「便利なAI tool紹介」だけでは少し狭い。Dataをmanagementや現場のdecisionへ使えるpeopleとorganizationをどう作るかまでが、本来のscopeなのだと思う。

## 当日、たぶんこの境界線が論点になる

Public materialsからpredictすると、theme①でおもしろくなりそうなのは「AIを使っているclubは何％か」というnumberそのものより、そのbreakdownである。文章summaryにgenerative AIを使うこと、internal searchに使うこと、competition dataから独自modelを作ること、fan-facing serviceへembedすることは、同じ「AI adoption」でも必要なdata、investment、risk、organizational capabilityがまったく違う。Surveyで何をAI活用とdefineしたのかが分かると、current positionの見え方が変わる。

ベイスターズの話では、successful productより「途中で何が使われなかったか」を聞けるとvalueが高い。Public materialには、command measurementからfirst-team line visualizationへdirection changeした例がある。つまり、technically動いてもpurposeに届かないものを捨てるdecisionができている。AI projectのfailureを「accuracy不足」だけで説明せず、現場のbehaviorが変わらなかった、feedback frequencyが上がらなかった、decision timingに間に合わなかった、といった別のfailure metricsがありそうだ。

Theme②では、野良システムを「なくすべきevil」として扱うのか、「現場のneedsがofficial systemより先に表面化したevidence」として扱うのかが気になる。善意から生まれるなら、banだけではまた別の野良が生まれる。Centralizedに全部integrateするのか、現場のfreedomを残しながらdata definitionとconnectionだけをstandardizeするのか。AI時代のdata platformは、technical designとpermission designを同時に考えないといけない。

そして二つのthemesを貫くのは、「AIに何をさせるか」ではなく「誰の、どのdecisionを、どう良くするか」だと思う。ベイスターズのmap app、千葉氏のdecision support、ユーフォリアのHuman-in-the-Loopは、wordingは違ってもsame directionを指している。当日ここが崩れるのか、さらにreinforceされるのかを見たい。

## 会場で聞きたい7つの質問

予習したうえで、questionsはtechnology nameよりoperational boundaryを狙いたい。

- Surveyでは、どこからを「AI活用」とdefineしていますか。個人のgenerative AI利用、organization-wide deployment、独自dataを使うproduct implementationは分けて集計されていますか。
- ベイスターズのAI projectで、model accuracy以外に最もtimeがかかったのは、data preparation、field understanding、user adoption、permission・securityのどれでしたか。
- Technically成立したのに現場で使われず、やめたfeatureやprototypeはありますか。Stop decisionを何でしていますか。
- 「野良システム」は、どの時点でofficial systemへpromoteさせるべきですか。User count、critical dataの有無、属人性、integration countなど、decision criteriaはありますか。
- 複数systemsに同じようなfieldがある場合、data definitionのsource of truthとownerをどう決めていますか。
- AIのrecommendationに対してHuman-in-the-Loopを置くとき、どこまでをAIに任せ、どのdecisionは必ずhumanに残すと決めていますか。
- ベイスターズの「current positionとgoalまでのdistanceを見せる」というmap-app thinkingを、ticket、fan communication、marketingなどbusiness sideへtransferしたcaseはありますか。

最後のquestionは特に聞いてみたい。Competition dataのworldでは「一軍ライン」というgoal pointが比較的つくりやすい。一方、business sideは「売上最大化」「fanを増やす」だけではgoalがroughだ。誰をどんなstateにしたいかまで落とせれば、AIは施策をmass-produceするmachineではなく、current positionとnext moveを見せるtoolになり得る。

## AIセミナーの予習をしたら、AIが少し脇役になった

調べる前は、professional sports clubがどのAIを使い、何をautomateし、どれだけefficientにしたのかを聞く会だと思っていた。Public materialsを追ったあとでは、むしろ見る場所が変わった。Passed-ball probability、pitcher command、batting motion、condition data。AIが効いている場所には、その前に「何をobserveするか」「誰が使うか」「何を変えたいか」というdesignがある。

そして、そのopposite sideに野良システムがいる。誰かが目の前のproblemを解こうとして作ったsmall systemは、organizationのdemandを先に見つけていることがある。しかし、meaning、responsibility、permission、update methodが共有されないままdependencyだけが増えると、AIに渡せるassetにはなりにくい。

だから「野良システムは、悪意ではなく善意から生まれます」という言葉は、単なるsystem managementのwarningではなく、AI時代のorganization theoryに見えてきた。善意を止めるのではなく、善意で生まれた工夫を、他の人もunderstandでき、handoverでき、reuseできるshared assetへ変える。そのcapabilityがあるorganizationほど、AIが賢くなったときに速く走れる。

AI adoptionのcurrent positionを聞きに行く前に、まず自分のorganizationの「map」がどこにあり、誰がupdateし、どこにwild shortcutができているかを見る。たぶん、そこから始めた方がAIの話はおもしろくなる。

## 参照した公開資料

- [DeNA × AI Day「DeNAスポーツ事業戦略とベイスターズAI強化プロジェクト」](https://www.docswell.com/s/DeNA_Tech/KJ46EG-aiday-commodity-1600)
- [DeNA TechCon 2025 セッションページ](https://techcon2025.dena.dev/sessions/aic-1600/)
- [DeNA Engineering「BASE☆BLUE：4つの問題で学ぶ、リアルタイムAI解説のプロンプト設計」](https://engineering.dena.com/blog/2025/10/starguide/)
- [横浜DeNAベイスターズ「キッズクリエイティブアカデミー2026 Summer」住田ワタリ氏プロフィール](https://www.baystars.co.jp/news/2026/06/0624_02.php)
- [横浜DeNAベイスターズ「スペシャルセミナー〜我々が目指す自己進化型組織とは〜」](https://sp.baystars.co.jp/news/2024/11/1125_02.php)
- [株式会社ユーフォリア「QUARIA AI」](https://eu-phoria.jp/research-development/quaria-ai)
- [株式会社ユーフォリア「AI活用ポリシー」](https://eu-phoria.jp/ai-policy)
- [株式会社ユーフォリア「ONE TAP SPORTSのユーフォリアと鹿屋体育大学、産学連携によるアスリート支援プロジェクトを開始」](https://eu-phoria.jp/news/pressrelease/20250904-kanoya-ots-collaboration)
- [株式会社ユーフォリア「データはスポーツ現場の判断をどう変えたのか。71競技・1700以上のチームに広がる“共通言語”」](https://eu-phoria.jp/news/publicity/20260514-real-sports-technology)
- [株式会社ユーフォリア「スポーツヒューマンキャピタルとパートナー契約を締結」](https://eu-phoria.jp/news/info/20250917-shc-partner)
- [慶應義塾大学DMC研究センター「スポーツアナリティクスの現状と実務から見る今後の展望」](https://dmc-lab.sfc.keio.ac.jp/v3/?p=2443)
