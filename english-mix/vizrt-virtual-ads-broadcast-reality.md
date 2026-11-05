---
id: "vizrt-virtual-ads-broadcast-reality"
title: "スタジアムにない広告を、テレビで売る――Who Owns the Image?"
subtitle: "VizrtとViz Arenaを通して、技術・権利・証明の関係を読み解く English Mix"
created: "2026-11-05"
updated: "2026-11-05"
type: "Essay"
status: "公開"
tags: ["スポーツビジネス", "映像技術", "拡張現実", "広告", "放映権", "新規事業", "英語学習"]
keywords: ["Vizrt", "Viz Arena", "virtual advertising", "camera calibration", "ad logging", "broadcast rights"]
grow: 5
abstract: "The ad is visible on TV but absent from the stadium. そんな奇妙な事実から、ビズアールティーの放送技術、導入事例、競技規則、障害、広告表示記録を調べる。Same match, different advertising feedsという状況は、単に映像表現を変えるだけなのか。それとも広告の権利と履行証明まで変えるのか。日本語を理解の足場に、自然な英語を混ぜながら考える。"
---

# スタジアムにない広告を、テレビで売る――Who Owns the Image?

*2026年11月5日｜English Mix：日本語正本と同一の記事IDで読む派生版*

Imagine watching a football match on TV. スポンサーのロゴがピッチに描かれている。ところが同じ時間、現地の観客にはそのロゴが見えない。**The ad is there for viewers, but nowhere on the field.** 広告主はその表示に対してお金を払う。選手はその上を一度も踏まない。何だこの商売は。

One company behind this kind of technology is ビズアールティー（Vizrt）, a Norway-based live-production software provider. 同社のビズ・アリーナ（Viz Arena）は、カメラ映像にリアルタイムで図形や仮想広告を重ねられる。[公式製品ページ](https://www.vizrt.com/products/viz-arena/)

At first, this looks like a graphics story. 調査を続けると、むしろ権利、制作工程、広告営業、そして証明の話になる。The deeper question is not only *How do we draw an ad?* It is *Who can sell that appearance, and how can they prove it happened?*

## 1｜そもそも、映像は「現場のコピー」なのか

A broadcast is not a simple copy of reality. 得点表示、時計、選手名、解説の矢印。どれもスタジアムの空気に浮かんでいるわけではない。They are added to help viewers understand the game.

Viz Arena extends this idea. The product can place graphics on a pitch, a court, or an ice rink and can tailor virtual ads to different regions. [Viz Arena product page](https://www.vizrt.com/products/viz-arena/) つまり、同じゴールの映像でも、国内向けには企業甲、海外向けには企業乙という可能性が生まれる。ただし、**technical capability is not permission**。実際に表示するには規則や契約の確認が要る。

ここから分かるのは、映像が「事実の記録」であると同時に「視聴者向けに構成された商品」でもあることだ。Once the feed becomes customizable, the business question changes: who owns the right to customize it?

## 2｜「ピッチに固定された広告」はどう作られるのか

Try placing a logo in the middle of a video. カメラを振ると、ロゴは画面に貼り付いたまま動かない。That is an overlay, not a convincing pitch ad. 本当に地面に描かれたように見せるには、映像の中の位置と現実の空間を対応させる必要がある。

The first step is **camera calibration（カメラ較正）**. フィールドの白線などを手掛かりに、カメラの位置や向き、画角を推定する。A planar perspective transformation helps map the field to image coordinates. ビズ・アリーナはAI（人工知能）を用いた較正を訴求し、追加の機械式追跡装置なしで使える構成も紹介している。[公式技術説明](https://www.vizrt.com/products/viz-arena/)

Then comes **keying（人物などの切り抜き処理）**. 選手が広告の手前を走るなら、選手が前に見えなければならない。この前後関係を**occlusion（遮蔽）**という。AI-based keying helps separate players from the background. 強い日差しと影、光を反射する体育館の床などは難しい条件だと、メーカーも説明している。[Viz Arena 5.1](https://routing.vizrt.com/support/product-updates/viz-arena/viz-arena-5-1/)

Finally, **rendering（描画）** and **compositing（映像合成）** make the graphics part of the live image. ただしAIが選手の輪郭を識別できることと、戦術を理解することは別。ビズアールティーには映像分析を支援するビズ・リベロ（Viz Libero）、描画基盤のビズ・エンジン（Viz Engine）など、役割の違う製品がある。[関連製品](https://www.vizrt.com/products/viz-arena/)

So don't ask only, “Does it use AI?” Ask, “Which task is automated, what still needs an operator, and what happens when the system is wrong?” 技術の評価は、派手な画面よりも工程の切り分けから始まる。

## 3｜なぜ放送用CGの会社が、広告の会社にもなったのか

Live TV has always needed real-time information. 結果の変わる試合で、得点や選手名を遅れて表示したら困る。ビズアールティーは1997年設立。リアルタイムのコンピューターグラフィックス（CG）から、生放送の制作工程へ事業領域を拡大してきた。[会社概要](https://www.vizrt.com/about/)

A short timeline explains the direction. 2015年にノルディック・キャピタル（Nordic Capital）が投資。2019年にはニューテック（NewTek）を買収し、NDI（ネットワークを利用する映像伝送技術）を含む制作技術群を束ねた。2022年にはフロウィックス（Flowics）を買収し、ブラウザを利用したライブグラフィックスを補強。2023年にはニューテックとの製品体系の一体化を発表した。[投資先情報](https://www.nordiccapital.com/portfolio-cases/investments/vizrt/)／[2019年発表](https://www.vizrt.com/vizrt/press-center/vizrt-group-formed/)／[2022年買収](https://routing.vizrt.com/?p=13811)／[2023年発表](https://www.vizrt.com/vizrt/press-center/vizrt-unites-portfolio-to-strengthen-customers-and-partners)

For scale, Nordic Capital reports **€145 million in 2025 revenue** and **530 employees** for Vizrt. ビズアールティーの公式ページでは関連子会社NDIを含む従業員を600人超と説明している。The scope and timing differ, so these are not automatically contradictory. And the revenue is company-wide, not a Viz Arena sales figure. [Nordic Capital](https://www.nordiccapital.com/portfolio-cases/investments/vizrt/)／[Vizrt](https://www.vizrt.com/about/)

The business did not suddenly jump from graphics into advertising. 生放送の映像へ情報を重ねる能力が、戦術説明にもスポンサー表示にも応用された。Virtual ads are one form of real-time, data-driven graphics. その理解が、会社全体と一製品を混同しない助けになる。

## 4｜現場では本当に使われているのか――導入事例を二つ確かめる

Marketing pages promise possibility. Case studies at least show a described workflow. タイのトゥルー・ビジョン（True Visions）は、バレーボール中継でコート内やエンドライン付近に仮想広告を表示した。メーカーの事例では、中継車の担当者1人と処理用コンピューター1台で運用し、特定のカメラが放送に使われる場面で広告を表示したという。[導入事例](https://www.vizrt.com/case-studies/true-vision-viz-arena-volleyball/)

In Cyprus, Cablenet Sports uses Viz Arena for virtual ads that change every few minutes. さらに3次元フォーメーションを表示し、ビズ・リベロを用いた戦術解説も行う。Advertising and storytelling live in the same production workflow. [Cablenet Sports case study](https://www.vizrt.com/case-studies/cablenet-sports-changing-how-soccer-is-enjoyed-with-viz-libero-and-viz-arena/)

The important caveat: these are vendor-published cases. 追加利益の監査済み数値や一般的な費用対効果を証明するものではない。Yet the division of labor is revealing. 映像制作の担当者は手間を減らしたい。広告営業の担当者は新しい商品を売りたい。One system, two different reasons to buy.

## 5｜比較実験：同じ90分の試合を、三つの世界へ分けてみる

Let's run a thought experiment, not a real-world performance test. 同じ90分の試合について、三つの視聴環境を想定する。

- **A — At the stadium:** 芝生に仮想広告はない。現地看板のみ見える。
- **B — Domestic feed:** 同じプレー映像に企業甲の仮想広告を合成する。
- **C — International feed:** 企業甲ではなく企業乙の広告を合成する。

Three audiences see the same goal, but not the same commercial image. しかも広告は常に見えるわけではない。カメラが切り替われば画面から消えるし、別の角度になれば隠れるかもしれない。

Now imagine the sponsor asks, “How many people saw our ad?” 表示指示の回数、実際に映像へ合成された回数、広告の画面内表示時間、配信先へ到達した回数、視聴者が見た人数は、それぞれ異なる。**An ad impression recorded by the production system is not proof of human attention.**

この区別から、契約の設計が変わる。Maybe a sponsor should ask about region, duration, actual on-screen delivery, and make-good rules when an ad fails. これらは検討し得る契約条件であって、市場の標準を確認した話ではない。New ad inventory creates a new verification problem. ここが、この技術の地味で重要な発見だ。

## 6｜本当に大事な更新は、派手なCGではなく「広告の記録」だった

In September 2025, Vizrt introduced Viz Arena 6 and claimed up to **10× faster camera calibration**. メーカーによる比較であり、あらゆる条件の独立検証を意味しない。[Viz Arena 6](https://routing.vizrt.com/support/product-updates/viz-arena/viz-arena-6/)

On October 6, 2026, Viz Arena 6.1 added calibration confidence indicators, camera information, and better ways to reuse calibration data. 氷上競技やバスケットボール向け切り抜き処理の改善も示された。These changes matter because a tiny positioning error can become a visible broadcast failure. [Version 6.1](https://www.vizrt.com/product-updates/viz-arena/viz-arena-6-1/)

But the less glamorous feature caught my attention: **Ads Logger（広告表示記録機能）**. 広告が表示された事例を記録し、スポンサー向けの報告をしやすくする仕組みだ。The data is stored in a local logging database, according to the release notes. きらびやかなCGの隣で、地味な記録係が働いている。[公式更新情報](https://www.vizrt.com/product-updates/viz-arena/viz-arena-6-1/)

This is more than a reporting convenience. 「広告を表示する技術」と「表示したことを説明する技術」は異なる。The second can help connect production operations with contracts and billing. ただし、ログがあるからといって視聴者の実視認や広告効果が証明されたことにはならない。**Delivery evidence is not audience evidence.** 技術の価値を考える単位が、画面の中から契約の履行へ広がった。

## 7｜都合の悪い話：規則、障害、視聴者の不快感

Now the serious part. サッカーの国際競技規則第1条12項は、試合中の競技フィールド上などにおける有形・無形の商業広告を禁止すると規定している。[IFAB Laws of the Game](https://www.theifab.com/laws/latest/the-field-of-play/)／[日本語版](https://www.jfa.jp/laws/soccer/2026_27/)

The product page describes virtual ads on a pitch. それだけで、放送への映像合成が個別大会でどのように扱われるかまで決着するわけではない。Rights and rules must be checked separately. 大会主催者、競技団体、放映権契約、配信先の条件を確かめる必要がある。

Technical failure is another risk. In December 2022, NHL digital advertising boards malfunctioned on a broadcast. 看板部分が黒く表示され、広告合成によって選手やパックが見えなくなる問題、視聴者の不快感も報じられた。[Sports Business Journal](https://www.sportsbusinessjournal.com/Daily/Issues/2022/12/21/Marketing-and-Sponsorship/nhl-digital-ad-boards-fail-blues-canucks/)

This was **not established as a Viz Arena failure**. 仮想広告全般のリスクを示す別システムの例だ。Fans come to watch the game, not the rendering pipeline. 広告が視認性を損なえば、追加収入のための演出が放送商品の価値を壊してしまう。That is a business risk, not merely a technical bug.

## 8｜細かな仕様の食い違いが、意外と大切だった

An odd discovery came from two official pages. ビズ・アリーナの製品ページには「バージョン6はクラウドに対応しない」という注記がある。[製品ページ](https://www.vizrt.com/products/viz-arena/) Yet the 6.1 release notes explicitly list support for AWS G5, G6 and G7 cloud instances. [6.1更新情報](https://www.vizrt.com/product-updates/viz-arena/viz-arena-6-1/)

Maybe this is not a dramatic contradiction, but a version-specific documentation gap. ただし導入側には重要だ。Local production and cloud production have different latency, backup, and cost requirements. 「その製品はクラウド対応か」という質問では粗い。**Which version, which deployment, and which operating conditions?** と聞く必要がある。

価格の公開情報にも限界がある。会社全体の売上高は確認できても、Viz Arena単体の一般的な契約価格や国内1試合当たり費用は確認できなかった。A missing number is not permission to invent one. 次の面談で見積もり条件を確認するための、意味のある空欄として残しておく。

## 9｜競争を考えるなら、会社名より先に市場を分ける

Who competes with Vizrt? The answer depends on what the customer is buying. 顧客の課題を分ければ、競争市場も少なくとも三つに分かれる。

- **Sports graphics（スポーツ映像演出）：** 試合の理解・臨場感を高める。
- **Virtual advertising（仮想広告）：** 配信地域や条件に応じた広告枠を作る。
- **Live production infrastructure（生放送制作基盤）：** CGの制作・描画・制御・映像合成などを支える。

For ad replacement, TGI Sport / Supponor and uniqFEED are possible comparison targets. 放送用CGの制作基盤ではロス・ビデオ（Ross Video）などが比較候補になる。This is a functional map, not a verified ranking of products. [TGI Sport technology](https://tgisport.com/services/tech/)／[Ross Video graphics](https://www.rossvideo.com/products/graphics-and-virtual/xpression/)

A broadcaster may buy the system to reduce production friction. A rights holder may buy it to create revenue. 同じ技術を評価するにも、損益計算書のどこを変えるかは異なる。**Define the buyer's problem before defining the market.** 技術名だけでは競争優位は測れない。

## 10｜もう一歩やりすぎるなら、三つの監査を試したい

If I were designing a pilot, I would not stop at “the graphic looks realistic.” 三つの監査を実施したい。これは調査に基づく提案であり、実験済みの成果ではない。

**First, quality audit（映像品質の検証）.** 昼夜、雨、影、反射、カメラ切替、選手の重なりを条件にし、CGの位置ずれ、不自然な遮蔽、元映像への復帰時間を測る。Measure failures, not only visual beauty.

**Second, delivery audit（広告履行の検証）.** 広告の指示記録、実際の映像、表示ログ、スポンサー向け報告を時系列で突き合わせる。Then separate delivery data from audience data. 配信した証明と、誰が見たかの証明を混ぜない。

**Third, commercial audit（採算・権利の検証）.** 放映権者、制作会社、配信会社、広告販売会社の役割を描き、追加売上から利用料、制作費、営業費、権利処理費を引く。Ask customers what they cannot sell today and why, instead of asking whether they like a technology demo.

These tests shift the question from a graphic to a workflow. 新しい広告枠を作るには、技術だけでなく、権利、信頼性、検収、収支をつなぐ必要がある。The difficult part may live outside the picture.

## 11｜結局、あの広告はどこに存在したのか

Imagine leaving the stadium and watching the same match again on your phone. ピッチには、さっき現地で見なかった広告が載っている。The players are real. The goal is real. The advertising layer may be different for each audience.

At first I thought the surprising part was that an imaginary ad could look real. いま気になるのは別のところだ。Who had the right to put it there? How long was it visible? Who can prove delivery, and what exactly does that proof mean?

ビズ・アリーナを理解することは、映像合成の精度を知ることから始まる。But it ends with a question about responsibility: **who turns a version of reality into a product, and on what terms?** スタジアムにない広告を追いかけたら、画面の外で動いている仕事の方が、よほど見えなくなっていた。

---

## 知識メモ｜Useful Vocabulary

- **Camera calibration — カメラ較正：** mapping real-world positions to image coordinates.
- **Tracking — 追跡処理：** following camera or object movement over time.
- **Keying — 切り抜き処理：** separating a player or object from the background.
- **Occlusion — 遮蔽：** making the correct object appear in front.
- **Rendering — 描画：** creating graphics that can be shown in the video.
- **Compositing — 映像合成：** combining original footage and added graphics.
- **Virtual advertising — 仮想広告：** adding or replacing advertising in distributed images.
- **Ads Logger — 広告表示記録：** records when virtual ad instances were delivered; not proof that people noticed them.
- **Broadcast rights — 放映権：** rights relating to the creation and distribution of match footage; actual scope depends on contract.
- **Delivery evidence — 配信履行の証拠：** evidence that something was output according to specified conditions.
- **Audience evidence — 視聴実績の証拠：** data about the audience reached or exposed, which requires different measurement.

## 参考資料｜Sources & Caveats

1. [Vizrt / Viz Arena product overview](https://www.vizrt.com/products/viz-arena/)
2. [Viz Arena 6.1 release, October 6, 2026](https://www.vizrt.com/product-updates/viz-arena/viz-arena-6-1/)
3. [Viz Arena 6 release, September 2025](https://routing.vizrt.com/support/product-updates/viz-arena/viz-arena-6/)
4. [Vizrt company background](https://www.vizrt.com/about/)
5. [Nordic Capital / Vizrt investment profile](https://www.nordiccapital.com/portfolio-cases/investments/vizrt/)
6. [True Visions case study](https://www.vizrt.com/case-studies/true-vision-viz-arena-volleyball/)
7. [Cablenet Sports case study](https://www.vizrt.com/case-studies/cablenet-sports-changing-how-soccer-is-enjoyed-with-viz-libero-and-viz-arena/)
8. [IFAB Law 1: Commercial advertising](https://www.theifab.com/laws/latest/the-field-of-play/)
9. [JFA 2026/27 Laws of the Game](https://www.jfa.jp/laws/soccer/2026_27/)
10. [Sports Business Journal on the 2022 NHL ad-board malfunction](https://www.sportsbusinessjournal.com/Daily/Issues/2022/12/21/Marketing-and-Sponsorship/nhl-digital-ad-boards-fail-blues-canucks/)

*The case studies and performance claims come from vendor materials. 仮想広告の導入価格、単体収益、競技別障害率、日本国内での個別許諾は未確認。The three-feed experiment and pilot plan are thought experiments, not reported deployments.*