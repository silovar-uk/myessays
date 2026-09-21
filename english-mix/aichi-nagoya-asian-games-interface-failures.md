---
id: aichi-nagoya-asian-games-interface-failures
title: "愛知・名古屋アジア大会の混乱は、facilitiesより「接続点」で起きている"
subtitle: "宿泊・輸送・認証・国歌誤再生から、repeated operational failuresを一つの構造として読む"
created: "2026-09-22"
updated: "2026-09-22"
type: "Research Essay"
status: "完成"
tags: ["スポーツビジネス", "アジア競技大会", "愛知", "名古屋", "大会運営", "logistics", "governance", "risk management", "2026"]
keywords: ["Aichi-Nagoya 2026", "Asian Games", "operations", "Athletes' Village", "accommodation", "transport", "accreditation", "interfaces", "operational slack"]
grow: 5
series: "スポーツイベントの仕組みを読む"
seriesOrder: 3
abstract: "At the Aichi-Nagoya Asian Games, accommodation, airport transport, accreditation, room allocation, shuttle buses, and an anthem mix-up all became news. 個別の失敗を並べるだけでは原因は見えない。本稿は、15,000人設計を上回る約17,000人規模と、distributed operationsの接続点に注目する。"
---

# 愛知・名古屋アジア大会の混乱は、facilitiesより「接続点」で起きている
## 宿泊・輸送・認証・国歌誤再生から、連日の運営トラブルを一つの構造として読む

<!-- level:4 role:claim -->
Since early September 2026, the Aichi-Nagoya Asian Games have produced a stream of bad operational headlines. 「バスが来ない」「空港から出られない」「部屋が決まらない」「認証が有効にならない」「韓国の試合で北朝鮮の国歌が流れる」。But if we compress all of this into “Japan ran the Games badly,” we lose the mechanism of failure.

<!-- level:2 role:description -->
When we trace the incidents in time, many problems appear not inside the accommodation units themselves but at **handoffs between people, data, and responsibility**. 空港から輸送へ、登録情報から認証へ、選手団から部屋割りへ、ホテルから練習会場へ。The anthem error belongs to a different quality-control chain, while heavy rain and a typhoon are external shocks. They should not be forced into one cause.

<!-- level:5 role:implication -->
The deeper pattern is a shift in where complexity lives. 「巨大施設を造らない持続可能な大会」を目指した結果、difficulty did not disappear; it moved **from buildings to operational interfaces**.

> **Information cutoff: morning of September 22, 2026**
>
> The Games continue until October 4, so this is not a final verdict on the event. 公開された一次情報と複数の報道を基に、facts and interpretationを分ける。Where a root cause has not been published, this article does not infer blame for a specific organisation, company, or person.

---

## 1. 連日の不手際は、一つの故障ではなく複数の「接続不良」として見ると理解しやすい

<!-- level:4 role:claim -->
Here is the short answer. 今回の混乱を「選手村を造らなかったから」とだけ説明するのは粗い。A stronger explanation is that **distributed accommodation, venues, transport, and accreditation put heavy load on the interfaces connecting them**.

<!-- level:2 role:description -->
The organising committee prepared accommodation for up to 15,000 people under the Host City Contract. しかし8月末には15,000人超が見込まれ、9月の大会規模は選手・役員約17,000人と報じられた。Instead of one Athletes' Village, people were spread across hotels, the cruise ship Costa Serena, and movable accommodation at Garden Pier.

<!-- level:3 role:analysis -->
Seventeen thousand is about 13% above fifteen thousand. もちろん、このoverrunだけですべてのトラブルは説明できない。But when a distributed system already depends on many moving parts, more people and new sports can eat into slack across rooms, vehicles, registration data, schedules, and staff capacity at the same time.

<!-- level:5 role:implication -->
So the key question is not simply whether a container-style room is comfortable. 問うべきは、**17,000人の移動と情報を、分散した仕組みの間で途切れさせずに渡せたか**。Once we use that lens, separate headlines begin to sit on one map.

[大会組織委員会「アジア競技大会の選手団の受入れに向けた対応について」](https://www.aichi-nagoya2026.org/ja/news-2024/)  
[ロイター「2026 Asian Games facts and figures」](https://www.reuters.com/sports/2026-asian-games-facts-figures-2026-09-16/)

---

## 2. 実際に起きたことを並べると、宿泊より広い運営系統に問題が散っている

<!-- level:4 role:claim -->
The incidents are easier to understand when separated into categories. 「宿泊」「到着・認証」「輸送」「式典・プロトコル」「天候対応」を混ぜると、cause analysisを誤りやすい。

<!-- level:2 role:description -->
In accommodation, tall basketball players complained about short beds. 日本代表でも、男女や選手・コーチの実際の構成に合わないroom allocationが生じ、日本オリンピック委員会（JOC）は予備ホテルの利用を検討した。Credential activation delays were also reported on arrival.

<!-- level:1 role:evidence -->
On September 17, athletes from multiple delegations waited for hours at the transport centre beside Chubu Centrair International Airport because their information could not be found in the system. 中国選手団の一部は約7時間足止めされ、インドのローイング関係者やカザフスタンの射撃選手団にも長時間の待ちが報じられた。

<!-- level:1 role:evidence -->
Transport produced another kind of failure. 韓国男子バスケットボール代表は9月20日の決勝前、午前10時に来る予定だったshuttle busが現れず、軽い練習を取りやめた。Before the opening ceremony, there were also reports of late buses and athletes being taken to wrong destinations.

<!-- level:1 role:evidence -->
Vietnam's women's volleyball team reported a similar interface failure before its September 21 match against Indonesia. 大会側手配のvehicleが遅れ、会場到着が予定より遅くなったとVietnamese mediaが報じた。The incident shows how transport trouble can compress pre-match preparation, although it would be too strong to claim that the delay determined the result.

<!-- level:1 role:evidence -->
Protocol failed too. 9月18日の男子ホッケー韓国対バングラデシュ戦前、韓国国歌ではなく北朝鮮国歌が誤って流れた。The organising committee apologised to the Korean Sport & Olympic Committee and said it would work to prevent recurrence.

<!-- level:3 role:analysis -->
This list shows why “bad rooms” is too narrow. 登録情報が輸送に渡らない、認証が宿泊開始に間に合わない、人数構成が部屋割りに反映されない、予定どおり車両が来ない。The failures cross **boundaries between processes**.

<!-- level:5 role:implication -->
A department can finish its own task and the athlete can still experience failure. 次の工程に正しい人と情報が届かなければ、end-to-end journeyは切れる。For a mega-event, the continuity of the whole athlete journey matters more than the local completeness of each department.

[ロイター「Team Japan forced to look at alternate accommodation options」](https://www.reuters.com/sports/team-japan-forced-look-alternate-accommodation-options-home-asian-games-2026-09-17/)  
[サウスチャイナ・モーニング・ポスト「China athletes stuck at Nagoya airport」](https://www.scmp.com/sport/china/article/3367896/asian-games-china-athletes-stuck-nagoya-airport-no-food-way-out-7-hours)  
[ロイター配信「South Korea missed practice after shuttle bus no-show」](https://www.thestar.com.my/aseanplus/aseanplus-news/2026/09/20/039where039s-the-bus-039-south-korea-in-a-huff-after-their-team-missed-practice-before-the-men039s-basketball-final-due-to-vehicle-no-show)  
[VietnamNet「Vietnam fall 3-0 to Indonesia in Asian Games women's volleyball」](https://vietnamnet.vn/en/vietnam-fall-3-0-to-indonesia-in-asian-games-women-s-volleyball-2557371.html)  
[メ～テレ「韓国戦前に北朝鮮の国歌が流れる不手際」](https://www.nagoyatv.com/news/?id=037272)

---

## 3. 選手村を造らない判断は、そもそも経費と後利用の問題を避けるための合理化だった

<!-- level:4 role:claim -->
The decision to cancel the main Athletes' Village was not a last-minute whim. 準備不足の思いつきとして扱うと、decision contextを取り違える。

<!-- level:2 role:description -->
In March 2023, Aichi Prefecture cited rising construction costs and prices, concern over sponsorship income, and pressure to simplify mega-events. 当初は2015年ごろの物価水準で選手村に300億円を見込んでいたが、県は大幅なcost increaseが避けられないとみていた。

<!-- level:1 role:evidence -->
By December 2025, Aichi said cancelling the village facilities and using hotels had saved about 60 billion yen. 会場変更や滞在期間短縮などを含む削減努力全体は1,020億円とされた。

<!-- level:3 role:analysis -->
The Olympic Council of Asia also defended the idea of avoiding a costly “white elephant” after the event. 固定資産を増やさず、existing resourcesを使うという思想そのものには合理性がある。

<!-- level:5 role:implication -->
So the core question is not “Was cancelling the village wrong?” 本当の問いは、**建物を造らない代わりに必要になるintegration, coordination, and operational slackへ、十分な能力を移せたか**である。

[愛知県「2023年3月27日知事記者会見」](https://www.pref.aichi.jp/site/chiji-kaiken/20230327.html)  
[愛知県「2025年12月22日知事記者会見」](https://www.pref.aichi.jp/site/chiji-kaiken/20251222.html)  
[ロイター「Asian Games Athletes' Village would have been a white elephant, OCA says」](https://www.reuters.com/sports/asian-games-athletes-village-would-have-been-white-elephant-oca-says-2026-09-18/)

---

## 4. 固定施設を減らした結果、大会は「一つの村」から「多数の拠点を束ねるネットワーク」に変わった

<!-- level:4 role:claim -->
If you remove one Athletes' Village, accommodation does not disappear. 機能がmany locationsへ分解される。

<!-- level:2 role:description -->
Aichi's September 2025 assembly record shows the evolution clearly. 当初はホテル活用を想定したが、選手同士の交流拠点を求めるアジア・オリンピック評議会の要請を受けてcruise shipを確保し、さらに約7,000室規模を求められたため、ガーデンふ頭に約2,400室のmovable accommodationを準備した。Competition venues also spread across more than 50 locations.

<!-- level:3 role:analysis -->
This saves construction but creates a harder operations problem. 従来の選手村なら、宿泊、食事、認証、transport departure, guidance, and athlete interactionを一か所に集めやすい。In a distributed model, those functions must be reconstructed across hotels, a ship, modular units, airports, transport centres, and venues.

<!-- level:2 role:description -->
The basic plan says dedicated buses would connect delegation accommodation with competition and training venues. つまり宿泊が分散するほど、transport network and data network become the spine of a “virtual village.”

<!-- level:5 role:implication -->
This is the design shift. **Removing one physical facility does not automatically remove complexity.** むしろphysical concentrationを減らした分だけ、information and transport integration become more important.

[愛知県議会「アジア・アジアパラ競技大会推進特別委員会審査状況（2025年9月2日）」](https://www.pref.aichi.jp/site/gikai/iinkai-asia07-09-02.html)  
[大会組織委員会「第20回アジア競技大会開催基本計画の概要」](https://www.aichi-nagoya2026.org/assets/file/committee/conference/councilor/22_siryo.pdf)

---

## 5. 最大15,000人の設計に約17,000人規模が乗り、分散型運営の「余白」が試された

<!-- level:4 role:claim -->
A distributed model can work when demand and conditions are stable. 今回は、design capacityと実際の規模に差が出た。

<!-- level:1 role:evidence -->
On August 28, the organising committee said it had prepared accommodation for up to 15,000 under the Host City Contract. しかし15,000人超が見込まれたため、一部のteam officialsは各国・地域のオリンピック委員会が自ら宿泊を確保する方式をアジア・オリンピック評議会と決めた。

<!-- level:2 role:description -->
Reuters later reported around 17,000 athletes and officials, with organisers pointing to added sports as one reason for the increase. 単純計算では約2,000人、約13％のoverrunになる。

<!-- level:3 role:analysis -->
That 13% does not hit only beds. 同じ参加者がarrival processing, accreditation, buses, luggage, meals, rooms, practice schedules, and help desksを同時に使う。More people therefore increase load at multiple points of the network.

<!-- level:5 role:implication -->
This is why “add 2,000 beds” is not enough. **Growth in participants requires not only more capacity but more processing power and exception-handling slack at every interface.**

[大会組織委員会「アジア競技大会の選手団の受入れに向けた対応について」](https://www.aichi-nagoya2026.org/ja/news-2024/)  
[ロイター「Asiad organisers pledge to address accommodation complaints」](https://www.reuters.com/sports/asiad-organisers-pledge-address-accommodation-complaints-cruise-ship-arrives-2026-09-15/)

---

## 6. 空港・認証・部屋割り・バスの共通点は、「次の工程へ渡す情報」が切れたことにある

<!-- level:4 role:claim -->
The strongest common pattern is not hardware failure but **information handoff failure**.

<!-- level:2 role:description -->
At the airport, the athletes were physically present but missing from the transport system. 認証ではカードがあってもactivationに時間がかかる。In room allocation, capacity existed but the assignment did not match gender, role, or sporting needs. In transport, a schedule existed but the vehicle did not arrive.

<!-- level:3 role:analysis -->
These are different from “zero inventory.” 人、部屋、バス、カードが存在しても、**who goes where, when, and under what conditions**という対応関係が壊れれば、利用者には何も準備されていないのと同じ結果になる。

<!-- level:2 role:description -->
The Games plan placed accreditation centres at facilities such as airports and designed dedicated buses from accommodation to competition and training venues. つまりaccreditation, accommodation, and transportは独立した裏方ではなく、one continuous athlete journeyを作る部品だった。

<!-- level:5 role:implication -->
Mega-event quality cannot be measured by a checklist of what each department owns. **It should be measured by whether an athlete can move from arrival to competition without losing data, time, or access between systems.**

[大会組織委員会「開催基本計画・認証」](https://www.aichi-nagoya2026.org/files/common/20240425%E3%82%A2%E3%82%B8%E3%82%A2%E3%83%91%E3%83%A9%E5%85%AC%E9%96%8B%E6%99%82%E6%B7%BB%E4%BB%98%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB/plan2.pdf)  
[大会組織委員会「大会輸送デポ基本計画作成等業務委託・特記仕様書」](https://www.aichi-nagoya2026.org/files/common/20230728%E8%BC%B8%E9%80%81%E3%83%87%E3%83%9D%E5%9F%BA%E6%9C%AC%E8%A8%88%E7%94%BB%E4%BD%9C%E6%88%90%E7%AD%89%E6%A5%AD%E5%8B%99%E5%A7%94%E8%A8%97/%E5%88%A5%E6%B7%BB%E3%80%80%E7%89%B9%E8%A8%98%E4%BB%95%E6%A7%98%E6%9B%B8.pdf)

---

## 7. ただし「コンテナ型宿泊施設だから失敗した」と決めると、反証を見落とす

<!-- level:4 role:claim -->
Visible things are easy to blame. 移動式宿泊施設やcruise shipは写真で見えるため、causeそのものに見えやすい。But facility form and operational failure should be separated.

<!-- level:1 role:evidence -->
International Olympic Committee President Kirsty Coventry inspected Garden Pier on September 20 and praised the quietness, air conditioning, and interior, saying it was better than some athlete villages she had experienced. 中国の卓球選手からも、Costa Serenaでの生活を“unique”な経験として比較的肯定的に受け止める声が報じられた。

<!-- level:3 role:analysis -->
At the same time, complaints about short beds, delayed room access, and unsuitable room assignment were real. 二つは矛盾しない。**The box can be acceptable while allocation and operations around the box fail.**

<!-- level:5 role:implication -->
The lesson is not to reject new accommodation formats. 新しい方式ほど、「何人入るか」だけでなく、**who gets which room, how exceptions are handled, and how arrival becomes actual check-in**まで設計しないとqualityを評価できない。

[ロイター「IOC chief Coventry gives thumbs-up to Asian Games accommodation」](https://www.reuters.com/sports/ioc-chief-coventry-gives-thumbs-up-asian-games-accommodation-despite-criticism-2026-09-20/)  
[サウスチャイナ・モーニング・ポスト「China table tennis stars describe cruise ship living as a unique experience」](https://www.scmp.com/sport/china/article/3368045/china-table-tennis-stars-describe-life-asian-games-cruise-ship-unique-experience)

---

## 8. 国歌の誤再生は別系統の失敗であり、単一原因説を止める材料になる

<!-- level:4 role:claim -->
Playing North Korea's anthem before a South Korea match was serious, but it cannot be directly explained by distributed accommodation.

<!-- level:2 role:description -->
What we can confirm is limited. 9月18日の男子ホッケー韓国対バングラデシュ戦で誤った国歌が流れ、大韓体育会が抗議し、大会組織委員会は謝罪して再発防止を表明した。Public information does not yet establish exactly which step caused the wrong playback.

<!-- level:3 role:analysis -->
So linking it to the participant increase or the accommodation model would be a leap. むしろ別系統でもverification failureが起きたことで、今大会の問題をone technical bugへ還元できないと分かる。

<!-- level:5 role:implication -->
The question therefore moves up one level. 一つの故障箇所ではなく、**how reliably each operational domain catches an error before it reaches live competition**を問う必要がある。

[メ～テレ「韓国戦前に北朝鮮の国歌が流れる不手際」](https://www.nagoyatv.com/news/?id=037272)  
[ロイター「Wrong Korean anthem played at Asian Games hockey」](https://www.reuters.com/sports/soccer/terribly-sorry-wrong-korean-anthem-played-asian-games-hockey-2026-09-18/)

---

## 9. 豪雨と台風は「運営ミス」と分けるべきだが、仕組みの耐久力は露出させる

<!-- level:4 role:claim -->
Heavy rain and Typhoon No. 25 also affected the Games. これ自体をorganiser failureとして数えるのは不正確だ。

<!-- level:1 role:evidence -->
The organising committee changed schedules because rowing facilities needed rebuilding and repair after heavy rain, and because equestrian grounds needed work after typhoon-related rain. 宿泊施設でも大雨時に数百人規模のtemporary evacuationが報じられた。

<!-- level:3 role:analysis -->
Weather is uncontrollable; recovery design is not. 外からstrong loadがかかったとき、backup transport, alternative accommodation, information updates, and reallocationがどれだけ速く動くかはoperationsの問題になる。A system that barely works in normal conditions exposes its weak interfaces under stress.

<!-- level:5 role:implication -->
So weather is better understood not as the root cause but as a **stress test of operational slack and recovery capacity**.

[大会組織委員会「競技スケジュール変更に伴うチケットの払戻し」](https://www.aichi-nagoya2026.org/ja/news-2070/)  
[ロイター「Nagoya faces possible typhoon threat early in Asian Games」](https://www.reuters.com/business/environment/nagoya-faces-possible-typhoon-threat-early-asian-games-2026-09-17/)

---

## 10. 原因は「直接原因」「構造要因」「まだ言えないこと」の三層に分けるべきである

<!-- level:4 role:claim -->
It is too early to claim one “true cause.” ただし、evidence strengthごとに原因候補を分けることはできる。

<!-- level:3 role:analysis -->
**Directly observed factors** include missing athlete data in the airport transport system, credential activation delays, room allocations that did not match real team composition, and a scheduled shuttle that did not arrive. これらは報道や関係者発言で具体的なphenomenaを確認できる。

<!-- level:3 role:analysis -->
**Structural factors worth examining** include distributed accommodation without one village, growth from a 15,000-person design baseline to around 17,000 participants and officials, changing requirements such as added sports, and the need to connect many organisations and contractors. ただし、each factor caused each incident by how much cannot be established without a post-Games review.

<!-- level:3 role:analysis -->
**Unknowns must stay unknown.** 特定の一社や一部署が全体の混乱を生んだという根拠はない。There is also no reliable evidence in the sources reviewed here that the incidents involving South Korea were intentional. Nor is there evidence that directly converts “yen saved” into “number of failures caused.”

<!-- level:5 role:implication -->
Good root-cause analysis does not rush to the strongest story. **It separates confirmed failures, structures that may make failure more likely, and speculation without evidence.** その分離があって初めてimprovement becomes possible.

---

## 11. 「五輪の縮小版」ではない大会を、毎回ほぼ作り直す難しさがある

<!-- level:4 role:claim -->
Masuyuki Hatta's essay, 「アジア大会は超無理ゲー。名古屋は最後の日本開催になるだろう」, adds an important lens. 今回の不手際をNagoya-specific failureだけでなく、**how large and complex the Asian Games have become**から見直す。「Asian Olympics」という説明は便利だが、“a smaller Olympics”と理解するとscaleを読み違える。

<!-- level:1 role:evidence -->
The Japanese Olympic Committee lists 43 sports for Aichi-Nagoya. パリ2024オリンピックは32競技だった。The previous Hangzhou Asian Games had 40 sports, 481 events, 12,417 athletes, and 4,975 team officials; athlete count alone exceeded the roughly 10,500 athletes at Paris 2024. 大会全体を一つの数字で単純比較はできないが、**in sports and athlete count, the Asian Games can exceed the Olympics**.

<!-- level:3 role:analysis -->
More sports do not merely mean more medals. 競技ごとにvenue requirements, equipment, officials, international and Asian federation coordination, training conditions, transport, ceremonies, and results systemsが増える。A 43-sport Games is therefore also the job of connecting 43 different competition systems to shared accommodation, accreditation, and transport infrastructure. 本稿でいう“more interfaces” is partly built into the scale of the event itself.

<!-- level:2 role:description -->
Operational knowledge also does not preserve itself automatically. スポーツ庁は大会前、愛知県内の競技団体ごとにinternational-event experienceの差があったため、他大会への研修派遣や東京2020経験者らによるknowledge sharingを実施したと紹介している。In a December 2025 Sports Council meeting, the organising committee itself stressed that the Asian Games had far more sports than the Olympics. Yomiuri also reported at the opening that Tokyo 2020 personnel and know-how had been mobilised for Aichi-Nagoya.

<!-- level:3 role:analysis -->
This does not prove that “Japan had no know-how.” むしろ重要なのは、**the know-how had to be gathered from people, transferred across sports, and recomposed into one temporary operating system**という点だ。Mega-event capability is not stored intact inside one permanent organisation waiting for the next host.

<!-- level:5 role:implication -->
Hatta's claim that this may be the last Asian Games hosted in Japan is a forecast, not a fact, so this article does not adopt it as its conclusion. ただし、その問題提起からsustainabilityをもう一段広げられる。**A sustainable event must preserve not only physical legacy but reusable operational memory after the temporary organisation disappears.** 白い象を残さなくても、every host must climb the same learning curve from near zero, the model is fragile in another way.

[八田益之「アジア大会は超無理ゲー。名古屋は最後の日本開催になるだろう」](https://comemo.nikkei.com/n/n021fcb04a16f?sub_rt=share_b)  
[JOC「その数なんとオリンピック以上！ アジア大会の実施競技数！」](https://www.joc.or.jp/aichi_nagoya2026/pickup03.html)  
[OCA Sporting Asia — Hangzhou Games data](https://oca.asia/media/newsletters/1/edition-files/Sporting_Asia_63.pdf)  
[Paris 2024 Sustainability & Legacy Post-Games Report](https://library.olympics.com/digitalCollection/DigitalCollectionAttachmentDownloadHandler.ashx?documentId=3460237&parentDocumentId=3460235&skipCopyright=true&skipWatermark=true)  
[スポーツ庁「開催都市が考えるアジア・アジアパラ競技大会の開催意義とは？」](https://www.mext.go.jp/sports/b_menu/sports/mcatetop08/list/jsa_00020.html)  
[スポーツ審議会スポーツ基本計画部会（第3期）（第7回）議事録](https://www.mext.go.jp/sports/b_menu/shingi/001_index/bunkabukai008/gijiroku/jsa_00007.html)

---

## 12. 今大会の本当の論点は、「持続可能性」に運営の余白まで含められるかである

<!-- level:4 role:claim -->
Using existing facilities instead of building a giant village is an important experiment for future mega-events. 大会のためだけに巨大施設を造り、終了後に持て余す方式にはclear problemsがある。

<!-- level:2 role:description -->
Aichi-Nagoya combined hotels, a cruise ship, movable accommodation, and existing venues to reduce new construction. これはenvironmental impact, legacy use, and construction costを考えれば意味のある方向であり、大会側もsustainable operationsとして位置付けている。

<!-- level:3 role:analysis -->
But reducing physical surplus is not the same as reducing operational slack. 建物をshared and distributedにするほど、data integration, transport, allocation, help desks, backups, and exception handlingに余裕が必要になる。Less fixed infrastructure can require more invisible coordination.

<!-- level:5 role:implication -->
The provisional lesson is therefore bigger than “do not build a white elephant.” **A sustainable Games must also preserve enough operational resilience to keep the athlete journey intact when demand exceeds plan or weather changes.**

<!-- level:5 role:implication -->
Before the Games, cancelling the village looked like a story about not building something. 開幕して見えたのは、実際には**the integration once provided by one physical village had to be rebuilt with data, transport, and people**ということだ。The post-Games question should not be “Were the cabins ugly?” but “Where did this invisible village break, and where did it work?”

[大会組織委員会「持続可能性への取組」](https://www.aichi-nagoya2026.org/sdg-initiatives/)  
[ロイター「Asian Games open in Nagoya after troubled buildup」](https://www.reuters.com/sports/asian-games-open-nagoya-after-troubled-buildup-2026-09-19/)

---

## 13. 大会終了後は「苦情の数」より、接続点の復旧時間を検証したい

<!-- level:4 role:claim -->
From here, this is a proposal. 大会終了後のreviewで「トラブルが何件あったか」だけを数えても、next eventに使えるknowledgeは少ない。

<!-- level:3 role:analysis -->
Measure where data disappeared between systems, how processing time changed when demand exceeded plan, how long it took to switch to backup transport or accommodation, and who had authority to approve exceptions. 「何が壊れたか」だけでなく、**how fast the system recovered**を残す。

<!-- level:2 role:description -->
Useful metrics could include median and maximum time from arrival to accommodation departure, accreditation error rate, number of room reallocations, shuttle on-time rate, wrong-destination incidents, first-response time, and time to activate alternatives. こうした数字があれば、「人を増やす」以外の改善点が見える。

<!-- level:5 role:implication -->
A mega-event is not a contest to achieve zero failures. **Operational capability is the ability to contain failure before it damages an athlete's chance to compete, then return quickly to normal service.** 愛知・名古屋大会の価値は、success storiesだけでなく、このdistributed modelのweaknessesまで記録できるかで決まる。

---

## 参考資料

- [愛知・名古屋アジア・アジアパラ競技大会組織委員会](https://www.aichi-nagoya2026.org/)
- [愛知県「2023年3月27日知事記者会見」](https://www.pref.aichi.jp/site/chiji-kaiken/20230327.html)
- [愛知県「2025年12月22日知事記者会見」](https://www.pref.aichi.jp/site/chiji-kaiken/20251222.html)
- [愛知県議会「アジア・アジアパラ競技大会推進特別委員会審査状況」](https://www.pref.aichi.jp/site/gikai/iinkai-asia07-09-02.html)
- [ロイター「2026 Asian Games facts and figures」](https://www.reuters.com/sports/2026-asian-games-facts-figures-2026-09-16/)
- [ロイター「Team Japan forced to look at alternate accommodation options」](https://www.reuters.com/sports/team-japan-forced-look-alternate-accommodation-options-home-asian-games-2026-09-17/)
- [ロイター「Asian Games Athletes' Village would have been a white elephant, OCA says」](https://www.reuters.com/sports/asian-games-athletes-village-would-have-been-white-elephant-oca-says-2026-09-18/)
- [ロイター「Asian Games open in Nagoya after troubled buildup」](https://www.reuters.com/sports/asian-games-open-nagoya-after-troubled-buildup-2026-09-19/)
- [ロイター「IOC chief Coventry gives thumbs-up to Asian Games accommodation」](https://www.reuters.com/sports/ioc-chief-coventry-gives-thumbs-up-asian-games-accommodation-despite-criticism-2026-09-20/)
- [サウスチャイナ・モーニング・ポスト「China athletes stuck at Nagoya airport」](https://www.scmp.com/sport/china/article/3367896/asian-games-china-athletes-stuck-nagoya-airport-no-food-way-out-7-hours)
