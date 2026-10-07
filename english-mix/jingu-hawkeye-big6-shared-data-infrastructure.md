---
id: jingu-hawkeye-big6-shared-data-infrastructure
title: "神宮球場にHawk-Eyeがある。それだけではhalf the storyだった"
subtitle: "Tokyo Big6のTrackMan導入史から、stadium trackingをshared league data infrastructureとして読み直す"
created: "2026-10-07"
updated: "2026-10-07"
type: "スポーツテクノロジー研究エッセイ"
status: "完成"
tags: ["スポーツテック", "野球", "Hawk-Eye", "TrackMan", "東京六大学", "神宮球場", "データ基盤", "スカウティング"]
keywords: ["Hawk-Eye", "TrackMan", "明治神宮野球場", "東京六大学野球", "optical tracking", "tracking data", "league data infrastructure", "scouting data"]
grow: 5
abstract: "「関東では神宮球場にHawk-Eyeがある」という話を追うと、単なるhardware installationではなく、プロ球団の本拠地設備を大学リーグのshared data infrastructureとして使う構造が見えてくる。神宮では2019年に東京六大学がヤクルトのTrackManを利用開始し、2020年にはヤクルトがHawk-Eyeを先行導入。2026年には回転軸・回転数・変化量などのHawk-Eye dataが東京六大学で開放されていることも確認できる。一方、migration timing、coexistence、contract owner、data scopeは公開情報だけでは確定できない。本稿は機材ではなく「who measures, who controls, who can use」を軸に神宮を読み直す。"
---

# 神宮球場にHawk-Eyeがある。それだけではhalf the storyだった
## Tokyo Big6のTrackMan導入史から、stadium trackingをshared league data infrastructureとして読み直す

「関東だと、Hawk-Eyeは神宮に入っているらしい」。

If that is the only question, the answer is easy. 東京ヤクルトスワローズの本拠地・明治神宮野球場にはHawk-Eyeがある。現在の球団公式ページにも、8台の専用カメラでボールなどをoptically trackし、球速、回転数、回転方向、軌跡などを取得すると書かれている。

But once you dig a little deeper, something odd happens.

神宮の大学野球を追うと、Hawk-Eyeより前にTrackManが何度も出てくる。しかもヤクルトが使っていたequipmentを東京六大学野球が利用し、試合後にはdataを全6大学へsharedしていた。

Then in 2026, the name changes again. 今度は「神宮球場のHawk-Eyeで計測した投球データが東京六大学で開放されている」と報じられる。

So this is not simply a story of replacing one machine with another.

プロ球団が本拠地に置いたtracking infrastructureが、同じ球場を使う大学リーグにも広がり、league-wide game dataを生む。そこから各大学のanalysis、player development、opponent preparation、さらにはprofessional scoutingへ用途が伸びていく。

We started with cameras, but the real question becomes: **who creates the data, who controls it, and who gets access?**

**神宮の面白さはHawk-Eyeが置いてあることではなく、一つの球場が複数組織のshared measurement pointになっていることにある。**

> **情報基準日：2026年10月7日**
>
> 本稿はソニー、東京ヤクルトスワローズ、東京六大学野球関連資料、報道・インタビューをcross-checkした。公開情報で確認できるfactsと、本稿のinterpretationを分けて記す。特にHawk-Eyeについて、東京六大学とのcontract party、data ownership、大学へ提供されるfull field set、TrackManとの現在のcoexistenceは公開情報だけでは確定できない。

## 1. 「神宮にHawk-Eye」は正しいが、それだけではwho can use itが分からない

Hawk-Eye is an optical tracking system that analyzes multiple camera feeds to capture the movement of balls and players. テニスのline callingで有名だが、baseballではpitch and batted-ball trackingだけでなく、player positionやbody movementまでdata化できる。

神宮球場では、ソニーとソニーPCLが2020年シーズンから東京ヤクルトスワローズとproof of conceptを始めた。当初は4台のhigh-frame-rate camerasを使い、ピッチャープレートからホームベースまでの投球・打球を解析する構成だった。ソニーは同時に、将来8台へ増設し、bat pathや投手・打者・野手の動作、skeletal informationまで解析対象を広げる計画を示していた。

現在のヤクルト公式ページでは8-camera setupとして説明されている。少なくともヤクルトの神宮主催試合について、Hawk-Eyeはexperimentからcontinuous analysis infrastructureへ進んだと見てよい。

But “installed in the stadium” is not the same as “available to everyone who plays there.”

Hardware locationだけでは、contract、data ownership、access permission、secondary useまで分からない。神宮を理解するには、camera countではなくdata flowを追う必要がある。

参照：[ソニー「ホークアイのプレー分析サービスの実証実験を東京ヤクルトスワローズと開始」](https://www.sony.com/ja/SonyInfo/News/Press/202007/20-060/) ／ [東京ヤクルトスワローズ「ホークアイ」](https://www.yakult-swallows.co.jp/players/hawkeye)

## 2. 東京六大学のdataficationはHawk-Eyeではなく、2019年のTrackMan共用から始まった

The shared-infrastructure character of Jingu existed before Hawk-Eye.

2019年9月、東京六大学野球連盟は、ヤクルトが神宮球場で使用していたTrackManを同年秋季リーグから利用し、取得dataを各校へ提供することで球団と合意した。報道によれば、data storageには六大学専用serverを使う設計だった。

翌2020年の週刊ベースボールONLINEは、神宮のboothで学生がTrackMan dataを処理し、試合後に全6校へsharedしている様子を伝えている。2022年にはTrackMan野球部門責任者が、東京六大学野球連盟とcontractし、神宮で計測したgame dataを6大学すべてへ提供していると説明した。

The important point is that the six universities did not each buy the same fixed system.

**Measure the official games at one common venue, then distribute the resulting data to every participating team.**

これは「大学ごとにanalysis deviceを導入する」のとは別のdesignである。設備投資のunitがteamからvenue / leagueへ移ることで、公式戦については学校間の設備差を越えてthe same type of dataを持てるようになる。

参照：[スポニチ「神宮本拠ヤクルトと合意　トラックマン、今秋から利用　東京六大学野球」](https://www.sponichi.co.jp/baseball/news/2019/09/13/kiji/20190913s00001089007000c.html) ／ [週刊ベースボールONLINE「東京六大学野球連盟がアマ初の『トラックマン』導入」](https://column.sp.baseball.findfriends.jp/?id=022-20201019-03&pid=column_detail) ／ [東洋経済オンライン「トラックマンから見える日本野球の問題点と未来」](https://toyokeizai.net/articles/-/598425?display=b)

## 3. 2020年のHawk-Eye導入で、神宮は「ball」から「human movement」まで測れる方向へ広がった

TrackMan and Hawk-Eye both produce baseball tracking data, so they are easy to lump together.

しかし2022年のTrackMan担当者の説明では、TrackManはradarとcamera、Hawk-Eyeはcameraを中心に対象を捉えるとされている。Hawk-Eye側のstrengthとして、高解像度映像からフィールド上の選手やbody movementまで記録できる点が挙げられていた。

ソニーが2020年に神宮で示したHawk-Eyeの解析項目も、pitch speed、spin rate、spin direction、trajectory、release point、exit velocity・launch angleだけではない。8台構成ではbat speed、投球時の手首・前腕・肩の位置、全選手のskeletal dataとmotionまで対象にするとしていた。

MLB also moved to Hawk-Eye across all ballparks in 2020, replacing the earlier Statcast hardware stack. MLBの説明では、複数cameraでpitch、batted ball、playersをoptically trackし、従来より細かなpose and movement trackingへ拡張した。

So Hawk-Eye is not merely another way to measure the same pitch speed.

計測対象をball中心から、bat、defensive position、player body mechanicsへ広げられる。その結果、data use casesもpitch qualityから、strategy、motion analysis、conditioning、visualizationへ広がりうる。

参照：[ソニー「ホークアイのプレー分析サービスの実証実験」](https://www.sony.com/ja/SonyInfo/News/Press/202007/20-060/) ／ [MLB「Statcast」](https://www.mlb.com/glossary/statcast) ／ [MLB「What the latest Statcast upgrade makes possible」](https://www.mlb.com/news/2020-statcast-update-includes-pose-tracking-capabilities)

## 4. 2026年には、神宮のHawk-Eye dataが東京六大学で使われていることまで確認できる

There is one missing step between “Yakult installed Hawk-Eye” and “college baseball can use it.”

そのgapを埋める公開情報が2026年5月に出た。

Full-Countは立教大学の道本想投手を扱った記事で、東京六大学では、神宮球場に設置されたHawk-Eyeで計測したpitch axis、spin rate、movementなどの精密dataが開放されていると明記している。記事では道本本人が、自身のfastballについて平均約2,500rpm、最大2,600rpmを記録したと話している。

What we can safely say is that, by 2026, Hawk-Eye is not only a Yakult analytics system; it is also used for at least some Tokyo Big6 pitching analysis.

一方で、ヤクルトが利用できるHawk-Eyeのfull datasetと、東京六大学へ開放されるfield setが同じだとは確認できない。公開記事が具体的に挙げているのは回転軸、回転数、変化量などであり、skeletal data、defensive positioning、swing pathなどまで大学へ渡っているかはunknownである。

The sentence “they use Hawk-Eye” can easily overstate the scope.

実務ではsystem nameではなく、**which fields, at what granularity, when, and to whom**まで確認しないと、data infrastructure comparisonにならない。

参照：[Full-Count「立大の救世主は星稜出身の1年生　知将もお手上げ…大谷翔平ばり驚異の毎分2600回転」](https://full-count.jp/2026/05/10/post1958083/)

## 5. TrackManからHawk-Eyeへ「complete migrationした」とまでは言えない

The cleanest story would be: TrackMan in 2019, Hawk-Eye in 2020, then a full migration to Hawk-Eye.

But the public record is messier.

2025年の第4回野球データ分析競技会では、東京六大学の計80試合の「TrackMan data」がanalysis datasetとして提供されている。2025年の東大野球部関係者への取材でも、神宮のTrackMan dataを利用しているという説明が残る。一方、2026年には前節の通りHawk-Eye dataの開放が報じられた。

From those materials alone, we cannot establish whether TrackMan and Hawk-Eye are both operating at Jingu in 2026, whether “TrackMan data” includes historical datasets or habitual naming, or whether the measurement stack changed at a specific point.

したがって本稿では、**「TrackManからHawk-Eyeへ置き換わった」と断定しない**。

Leaving uncertainty is less elegant, but more useful. データビジネスを調べるとき、hardware continuityとcontract / data continuityは別である。ここを無理につなぐと、technology historyはきれいになる代わりにbusiness flowを見誤る。

参照：[スポーツナビ「第4回野球データ分析競技会レポート」](https://sports.yahoo.co.jp/official/detail/2025030400077-spnaviow) ／ [東京大学野球部ブログ「僕の野球人生 vol.21 内田倖太郎 アナリスト」](https://tokyo6s.com/blog/tokyo/2025/10/19/lastseason-202521/) ／ [Full-Count](https://full-count.jp/2026/05/10/post1958083/)

## 6. 「関東では神宮にある」は、early-adopter memoryとしては正しいが、2026年の現状説明としては古い

Jingu stands out in Hawk-Eye discussions because it was early.

2020年、ヤクルトは神宮でHawk-Eyeのproof of conceptを開始した。同じ2020年にはMLBが全球場へHawk-Eyeを導入しており、日本では神宮がearly caseとして取り上げられた。

But the NPB landscape is different now.

ソニーによれば、2024年からプロ野球全12球団の一軍球場にHawk-Eye tracking systemが導入されている。2025年には、12球団の公式戦play dataを一元管理するData Management Platformと、dataを可視化するContent Management Systemも開発された。

So in 2026, “Jingu is the only NPB stadium in Kanto with Hawk-Eye” is simply outdated.

一方、「大学野球の公式戦で、stadium-fixed high-precision trackingをleague-wideに利用できる代表例として神宮がある」という言い方なら意味が変わる。神宮の特徴はrare cameraではなく、**同じ球場をプロと大学が使うことで、infrastructure valueがcompetition categoryをまたいで広がること**にある。

参照：[ソニー「ソニー x 日本プロ野球」](https://www.sony.co.jp/co-creation/NPB/) ／ [ソニー「日本野球機構におけるデータ活用の拡充に向けたコンテンツ制作システムを開発」](https://www.sony.co.jp/news-release/202503/25-013/index.html)

## 7. 神宮の本当の価値は、一つの球場を「shared league data infrastructure」にできることにある

If you read the story as a hardware timeline, it ends with “TrackMan first, then Hawk-Eye.”

But if you read it by operating unit, a different structure appears.

東京六大学の各校には、それぞれ独自のanalysis environmentがある。Rapsodoなどのportable deviceを練習で使う大学もあり、analyst headcountやcapabilityも違う。一方、league gamesは神宮というsame venueで行われる。

A fixed stadium system can therefore become a **common observation point** for official games, rather than one school’s private tool.

少なくともTrackManでは、六大学専用serverを用い、全6校へgame dataを提供する運用が確認されている。Hawk-Eyeでも2026年には東京六大学へのpitch data accessが確認できる。

The next step is interpretation, not a reported fact.

神宮モデルのcompetitive valueは「高価な機材を共同購入できること」だけではない。リーグ全体でthe same game datasetを持つことでcomparabilityが生まれる。各校はsame observationsを出発点にしながら、analysis model、visualization、player communication、tactical applicationで差を作る。

Competition shifts one layer—from equipment advantage to the ability to **turn shared data into better decisions**.

神宮の固定cameraは、measurement toolであると同時に、league内のanalytics competitionを成立させるcommon foundationでもある。

参照：[スポニチ](https://www.sponichi.co.jp/baseball/news/2019/09/13/kiji/20190913s00001089007000c.html) ／ [東洋経済オンライン](https://toyokeizai.net/articles/-/598425?display=b) ／ [Full-Count](https://full-count.jp/2026/05/10/post1958083/)

## 8. Data useは育成で終わらず、scouting marketへ伸び始めている

If tracking data stays inside the league, its main use cases are player development and opponent analysis.

しかし2026年、日本ハムの大渕隆GM補佐兼スカウト部長へのinterviewでは、ドラフト候補の大学生について「東京六大学と東都大学の選手はdataを購入すれば閲覧できる」と説明されている。記事は、そのdataがHawk-EyeなのかTrackManなのか、あるいは別のintegrated datasetなのかまでは特定していない。

So we cannot write that “Jingu Hawk-Eye data is directly sold to NPB clubs.”

それでも、大学公式戦で生成されたtracking dataが、大学内部のcoachingだけでなく、プロ側のplayer evaluationにも使われるmarketが存在することは確認できる。

That changes what the data means.

同じ「150km/h」でも、measurement conditionsがばらばらならcross-school comparisonには使いにくい。公式戦をcommon equipmentで継続計測できれば、relative evaluationだけでなく、leagueを越えたabsolute-value comparisonへ近づける。大渕氏もtracking dataの利点として、プロとアマを絶対値で比較できる点を挙げている。

The stadium camera can become more than a development tool; it can become a **measurement layer that translates player performance into market-readable value**.

参照：[Homebase「日本ハム・大渕スカウトインタビュー①」](https://homebase.baseballjapan.org/articles/3710/) ／ [スポーツナビ転載](https://sports.yahoo.co.jp/official/detail/2026040600028-spnaviow)

## 9. いちばん重要なbusiness flowは、公開情報だけではまだ見えない

Even after all this research, the most important Hawk-Eye contract map is still incomplete.

公開情報から確認できるplayersは、Hawk-Eye Innovationsと国内serviceを担うソニー側、東京ヤクルトスワローズ、明治神宮野球場、東京六大学野球連盟、加盟6大学である。しかし、2026年の大学利用について、who contracts、who pays、who owns raw data、how much is shared、who licenses secondary useという点は確認できなかった。

The TrackMan period is easier to read. 2019年にはヤクルトとの利用合意と六大学専用serverが報じられ、2022年にはTrackMan側が東京六大学野球連盟とのcontractと全6大学へのdata provisionを説明している。

It is tempting to assume that Hawk-Eye inherited the same arrangement.

しかし、それはfact checkではなくinferenceである。

むしろ、このunknownこそ実務上の本丸になる。スポーツのdata businessを比較するとき、「何台cameraがあるか」より、**measurement rights, ownership, access rights, commercial-use rights**が誰にあるかを分けた方が、business structureを正確に読める。

## 10. 神宮を調べると、sports data businessは五つのlayersに分けて見ると分かりやすい

以下は、神宮の事例から導く本稿のframeworkであり、各社のofficial classificationではない。

- **① Hardware / Capture**：どの球場に、何台のcamera・radar・sensorがあるか。
- **② Measurement Operation**：誰が試合ごとのmeasurement、calibration、quality control、maintenanceを担うか。
- **③ Data Control**：raw dataをどこへ保存し、誰がcontrolするか。
- **④ Access**：球団、大学、リーグ、選手、external analystのうち、誰がどのfieldを閲覧できるか。
- **⑤ Secondary Use / Monetization**：scouting sales、broadcast graphics、fan service、research useなどを誰がlicense・monetizeできるか。

神宮についてpublic informationがかなり豊富なのは①と、TrackMan時代の②〜④である。2026年のHawk-Eyeについては、①と「大学側にも一部dataが届いている」という④の一部までは確認できるが、③と⑤を含むfull pictureはまだ見えない。

This framework explains why a list of “stadiums with Hawk-Eye” is not enough for market research.

本当に比較すべきなのは、hardware countではなく、**一度生成したsports dataを何組織、何use case、何年間にわたってreuseできる設計になっているか**である。

This resembles media asset management and orchestration. 同じ素材を一回だけ使うのではなく、取得したassetをmultiple workflowsへ流せるほど、infrastructure valueは上がる。

神宮のHawk-Eyeは、その考え方を野球の「measurement」に置き換えて見るための、かなり分かりやすいcaseである。

## 11. カメラを見ていたら、最後は「who gets the same numbers」という話になった

The original question was simple.

「関東ではHawk-Eyeが神宮に設置されているのか」。

The answer is yes in the literal installation sense. ただし2024年以降、NPBの一軍球場には全球団でHawk-Eyeが導入されており、神宮だけがspecialという現在地ではない。

Still, Jingu remained worth studying.

2019年にはヤクルトのTrackManを東京六大学が利用し、全6校にshared dataを配る仕組みが作られた。2020年にはヤクルトがHawk-Eyeを先行導入し、2026年にはそのHawk-Eyeで計測したpitch dataが東京六大学でも開放されていることが確認できる。

What has accumulated at Jingu is not simply “new cameras.”

**一つのvenueでofficial gamesを測り、そのnumbersを競技組織のcommon languageにすること**である。

Cameras are visible. けれどsports data businessで本当に見るべきなのは、その目が見たものをwho controls, who shares, and who can reuseである。

Before researching Jingu’s Hawk-Eye, this looked like an equipment story.

調べた後では、league data governanceとdistribution designの話に見える。

## 参考資料

- [ソニー：ホークアイのプレー分析サービスの実証実験を東京ヤクルトスワローズと開始](https://www.sony.com/ja/SonyInfo/News/Press/202007/20-060/)
- [東京ヤクルトスワローズ：ホークアイ](https://www.yakult-swallows.co.jp/players/hawkeye)
- [ソニー：ソニー x 日本プロ野球](https://www.sony.co.jp/co-creation/NPB/)
- [ソニー：日本野球機構におけるデータ活用の拡充に向けたコンテンツ制作システムを開発](https://www.sony.co.jp/news-release/202503/25-013/index.html)
- [スポニチ：神宮本拠ヤクルトと合意　トラックマン、今秋から利用　東京六大学野球](https://www.sponichi.co.jp/baseball/news/2019/09/13/kiji/20190913s00001089007000c.html)
- [週刊ベースボールONLINE：東京六大学野球連盟がアマ初の「トラックマン」導入](https://column.sp.baseball.findfriends.jp/?id=022-20201019-03&pid=column_detail)
- [東洋経済オンライン：トラックマンから見える日本野球の問題点と未来](https://toyokeizai.net/articles/-/598425?display=b)
- [Full-Count：立大の救世主は星稜出身の1年生](https://full-count.jp/2026/05/10/post1958083/)
- [Homebase：日本ハム・大渕スカウトインタビュー①](https://homebase.baseballjapan.org/articles/3710/)
- [MLB：Statcast](https://www.mlb.com/glossary/statcast)
