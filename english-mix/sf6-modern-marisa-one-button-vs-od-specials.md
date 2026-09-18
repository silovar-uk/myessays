---
id: sf6-modern-marisa-one-button-vs-od-specials
title: "2本払って、What Are You Buying?"
subtitle: "Modern MarisaのOne-Button SpecialとOD Specialを、damageではなくproperty purchaseとして考える"
created: "2026-09-15"
updated: "2026-09-15"
type: "Conceptual Game Analysis"
status: "完成"
tags: ["Street Fighter 6", "Marisa", "Modern Controls", "Fighting Games", "Game Design"]
keywords: ["Marisa", "Modern Controls", "Overdrive", "special moves", "Drive Gauge", "input economy", "Uneven U"]
grow: 4
abstract: "Modern Marisaでは、SP shortcutのnormal specialとOD specialはsimple lower/upper versionではない。本稿は2026年8月調整後のGladius、Phalanx、Quadriga、Scutumを比較し、simple inputが20% damageと引き換えにreaction speedとreliabilityを買い、ODが2 Drive stocksと引き換えにarmor、wall splat、block situationなどmove propertiesを買う仕組みだと整理する。Modernの使い分けは『which move is stronger?』ではなく、time・damage・Drive・certaintyのどのcurrencyを今払うかというresource allocation problemとして理解できる。"
---

# 2本払って、What Are You Buying?
## Modern MarisaのOne-Button SpecialとOD Specialを、damageではなくproperty purchaseとして考える

### Abstract

Modern Marisaを触っていると、妙なmomentがある。Drive Gaugeを2本も払ってOD specialを出したのに、numbersだけ見るとnormal one-button specialより痛くないことがある。Enhanced versionにしたのだから、もっと殴ってほしい。Given the amount of muscle involved, そこは遠慮しなくていいはずである。

ところが2026年8月調整後のframe dataを追うと、この違和感は仕様の例外ではなく、むしろModern Marisaの使い分けを理解する入口になる。SP buttonによるsimple inputには原則80% damage scalingがかかり、OD specialには2本のDrive Gaugeが必要になる。一方でOD versionが買っているのは、必ずしもextra damageではない。Armor startup、耐えられる回数、armor break、wall splat、on-block situation、SA2 cancelといった「what the move can do」の変更である。

本稿では、いわゆるone-button specialとOD specialを「weaker version vs stronger version」としてではなく、different resourcesをdifferent purposesへ交換するchoiceとして読む。するとModernの20% reductionは単なるpenaltyではなくinput timeを買うpriceに見え、ODの2-stock costはdamageを買う価格ではなくsituationの性質を変える価格に見えてくる。Marisaのspecial-move selectionは、button operationの問題というよりsmall resource-allocation problemなのである。

## 1. 「One-button vs OD」という問いは、slightly weirdである

最初に整理しておきたいのは、「one-button special」と「OD special」は本来、paired categoriesではないということである。One-buttonはinput methodの話で、ODはmove versionの話だ。Modernではnormal versionをSPでsimple inputできるだけでなく、Assist+SPからOD versionも簡易入力できる。つまり「one-buttonかODか」と聞くと、trainかGreen Carかを比べるような、少しaxisの違うcomparisonになる。

このズレは実戦では重要である。たとえばLight GladiusはN+SPならbase damage 1200に80% scalingがかかって960になる。同じModernでもcommand inputでLight Gladiusを出せば1200を取れる。OD Gladiusもsimple inputなら1700の80%で1360だが、commandでODを出せば1700になる。ここには「normalかODか」とは別に、「simple inputかcommand inputか」というsecond choiceが重なっている。

したがって実際のoptionsはbinaryではなく、少なくともthree layersある。Gaugeを使わずsimple inputする、2本払ってODをsimple inputする、必要な場面ではcommand inputして20%を取り戻す。この三層を分けた瞬間、Modern Marisaは「easy-control character」から、time・damage・Driveを別々にexchangeできるcharacterへ見え方が変わる。

## 2. One-buttonが買っているのは、damageではなく「decisionを遅らせる権利」である

SP simple inputの価値を「commandが苦手でもmoveを出せること」だけに置くと、20% reductionはbeginner-friendly featureの代金に見える。しかしmatch中に効いているのは、input difficultyよりもinput開始から発動までに必要なhuman-side stepsが短いことである。Moveのstartup framesそのものが短くなるわけではない。それでも、見てからdirectional inputを組み立てる工程が減るため、playerは相手のactionをより長くobserveしてからbuttonを押せる。

Light Gladiusは17F startupで、ModernではN+SPから出せる。Anti-airとして使う場合、同じ17Fのmoveでも236Pを作るより「jumped」と判断してSPを押す方が、human input sequenceは短い。2026年のmatchup資料でも、Modern Marisa固有のstrengthとしてone-button Gladius anti-airの使いやすさが挙げられている。ここで960と1200の差だけを見るとsimple inputはlossだが、そもそもcommandが間に合わず0 damageになる場面を960へ変えられるなら、comparison targetは1200ではない。

これは「easyだから得」という話より一段広い。Simple inputは、相手のjump、poke、projectileを見るためのtimeを残し、decisionをinput直前まで遅らせる。その代わり、successful hitから20%を差し引く。つまりModernのone-buttonはdamageを捨てているのではなく、**the right to delay decision latency**を買っている。20%はoperation shortcutのfeeというより、「react on sight」を成立させるためのinsurance premiumとして考えた方が実戦に近い。

## 3. OD Gladiusは「a more painful Gladius」ではない

では2本のDrive Gaugeを払うODは、what are we buying? Gladiusを見ると、answerはかなり露骨である。Normal Light Gladiusは17F startup、on block -5Fで、upper-body armorは5Fから10Fまでの1 hit。OD Gladiusは19F startupで、単純にfasterになるわけではないが、armorが1Fから始まり、22Fまで2 hits耐え、armor-break propertyを持ち、on blockも-2Fになる。さらにOD versionはSA2へcancelできる。

Simple-input同士なら、normal Light Gladiusは960、OD Gladiusは1360で、確かに400 damage増える。しかし2本のDriveを400 damageへcash outしている、と理解すると本質を外す。ODで大きく変わるのは、opponent's strikeに触れられたときにmoveが成立するrangeと、失敗したときのsituationである。1Fから2-hit armorがあることで、normal versionならstartup前に潰される局面の一部をpush throughできる。

だからOD Gladiusを使う問いは「Do I want 400 more?」ではない。「このsituationでは、1F two-hit armorと-2F、armor break、SA2 routeに2 stocksを払うvalueがあるか」である。ODとは同じmoveのnumbersを上げるbuttonではなく、**contract change that reduces the ways the move can lose**だと考えると、Gaugeの意味が急に具体的になる。

## 4. OD Phalanxは、2本払うとsingle-hit damageが下がる

この考え方を最も乱暴にproveするのがPhalanxである。2026年8月のModern updateで、←+SPにはMedium Phalanxが割り当てられた。現在のMedium Phalanxは28F startup、on block +3F、base damage 1600。SP simple inputなら80%なので1280になる。一方、OD Phalanxも28F startupだが、base damageは1400で、simple inputなら1120である。2 stocks払った方が、single hitでは160低い。「enhanced version」という言葉が一瞬だけ壊れる。

ただしOD versionはon block +4Fとなり、armor performanceが強化され、armor breakを持ち、cornerではhit時にwall splatを発生させる。つまりOD版の1400はそこでcalculationを止めるためのnumberではない。Wall splatが起きればfollow-upへconvertでき、+4Fを取ればnext offenseのconditionsが変わる。OD Phalanxのvalueはone-hit profitではなく、その一発がnext situationをopenするかどうかにある。

ここまで来ると「OD is a stronger normal version」という説明はかなり危うい。少なくともPhalanxでは、normal versionはsingle-hit damageとzero-gauge pressure、OD versionはwall splat・armor break・larger frame advantageというdifferent productsを売っている。2 stocksを払う理由はfistを重くするためではなく、**to keep your game going after the hit**なのである。

## 5. Quadrigaでは、normal versionの方が「keep pressure」になることすらある

2026年8月3日のupdateは、Modern Marisaのこの構造をさらにinterestingにした。従来↓+SPにあったPhalanxが←+SPへ移り、↓+SPにはQuadrigaが追加された。しかもnormal versionは↙・↓・↘を使ってstrengthを変えられるようになった。「Modern simple special = fixed strength」というold explanationそのものにexceptionが増えたのである。

同時にQuadriga本体もbuffされ、Mediumはon block -3F、Heavyは+1Fになった。Heavyは29Fとslowだが、guardさせればnormal stateでもこちらが先に動ける。相手がBurnout中ならblockstunが4F増えるため、Mediumはeffective +1F、Heavyは+5Fになり、chipしながらpressureを続けるroleまで持つ。ところがOD Quadrigaは24F、on block -6Fである。ODにすると「guardさせてplus」というnormal Heavyのstrengthは手に入らない。

その代わりOD versionはhit時にwall splatを作り、armor breakを持ち、SA2 cancelにも対応する。ここでもpurchaseは「strict upgrade」ではなくdifferent use caseだ。NeutralやBurnout pressureでturnを維持したいならnormal Medium/Heavyが魅力的で、hitからwall splatを作ってconversion valueを上げたいならODが浮上する。Move hierarchyではなく、**pressureを買うのかconversionを買うのか**でchoiceが分かれる。

## 6. OD Scutumは、damageではなく「margin for error」を広げる

Scutumはさらに分かりやすい。Normal versionはstanceの3F目からupper-body armorが始まり、1 hit受けられる。OD versionは1F目からarmorが始まり、2 hits受けられる。Current matchup resourcesでは、normal versionがupper-body中心なのに対しOD versionはfull-bodyをcoverするものとして整理されている。直接殴るmoveではないので、OD化しても「damage went up by X%」という説明自体が似合わない。

実戦ではこの2F differenceとarmor coverageが、wake-upやopponent's pressureへ割り込むときの意味を変える。Normal Scutumは3Fまでにstrikeを受ければ間に合わず、low attackにも弱い。ODなら1Fからtwo-hit armorがあるため、throwなど明確なweaknessは残るものの、「I read a strike」というchoiceとして使えるrangeが広がる。ここで2 stocksはdamageへ変わっていない。**Margin that lets an imperfect read survive**へ変わっている。

このdifferenceはODの本質をよく示す。ODはsuccess時のnumbersを派手にするだけでなく、boundary between success and failureを動かす。Normal versionが「read this exact point」というmoveなら、OD versionは「read roughly this zoneでも成立する」moveになることがある。Drive Gaugeはattack powerのfuelというより、prediction accuracyを補うresourceでもある。

## 7. では、何を基準に使い分けるのか

ここまでのcomparisonをpractical decisionへ戻すと、move-by-move暗記よりfour questionsにした方が使いやすい。毎回「OD is stronger」「one-button is easier」で選ぶのではなく、今のsituationでwhat do I want to buy?を先に決める。

- **Reaction speedとinput reliabilityが欲しいか。** JumpへのGladiusなど、間に合うこと自体がvalueならSP simple inputの20% reductionを受け入れる。
- **Moveのlose conditionを変えたいか。** 1F armor、two-hit armor、armor break、wall splatなどが必要なときにODへ2 stocksを払う。
- **すでにhitすることが確定しているか。** Comboや大きなpunishでinput timeがあるなら、command inputしてsimple-inputの20%を取り戻すvalueが上がる。
- **その2 stocksをnext situationへ残す方が強くないか。** ODを使えばDrive Rush、Drive Reversal、別のODに使える余地が減り、Burnoutも近づく。Single successだけでなくremaining gaugeまで見る。

このfour-question filterを通すと、Modernのidealも少し変わる。すべてをone-buttonで出せることがcompletionではないし、すべてをcommandへ戻すことがgrowthでもない。**Reactionが必要な瞬間はsimple input、confirmed situationではcommand、situationの性質を変えたい瞬間だけOD**というように、同じspecial moveをmultiple pricesで買い分けられることの方が強い。

## 8. Frame tableを「damage table」として読むと、ODのvalueを取り逃がす

試しに、simple-input時のsingle-hit damageだけを並べるとweirdnessがよく分かる。Light Gladiusは960、OD Gladiusは1360なので、2 stocksで400増える。Medium Phalanxは1280、OD Phalanxは1120なので、2 stocks払って160減る。Medium Quadrigaは1200、Heavy Quadrigaは1280、OD Quadrigaは1200で、ODがsingle-hit maximumですらない。もし「OD = convert 2 stocks into damage」なら、price listとしてかなり壊れている。

しかしmove propertiesまで一緒に置くと壊れていない。Gladiusではarmor startupと耐久回数、Phalanxでは+4Fとwall splat、Quadrigaではwall splatとarmor break、Scutumでは1Fからのtwo-hit armorが増える。共通しているのはextra damageではなく、「harder to interrupt」「convert a hit into the next state」「connect back into your turn」というstate-transition enhancementである。

Frame tableを読むとき、本当に見るべきなのはDamage columnだけではない。Startup、Armor、On Block、Cancel、Wall Splatを横断して初めて、2 stocksのpurchaseが見える。ODとはmove numbersを上げるsystemというより、**a branching fee for reaching a different future from the same decision point**なのである。

## 9. 2026 Modern Marisaは、「easy controls」より「multiple prices」が面白い

2026年8月のchangeで、Modern Marisaは←+SPがMedium Phalanxへ、↓+SPがQuadrigaへ変わり、Dimachaerusはsimple-input slotから外れた。さらにQuadrigaはsimple inputのままstrength selectionまで持つようになった。このchangeは単なるmove additionではない。Modernというcontrol schemeが「one easy input fixes one move」から、simplicityを残したままchoiceを増やす方向へ動いていることを示している。

すると、最初のquestion――なぜ2 stocks払ったOD Phalanxのsingle-hit damageがnormal Medium Phalanxより低いのか――にも別のanswerが出る。それはODが「bigger punch」を売っていないからだ。One-buttonはdamageの一部と引き換えにdecision timeとinput reliabilityを売り、ODはDriveと引き換えにmoveが通るconditionsやafter-hit futureを売る。そしてcommand inputは、timeとeffortを払って失われた20%を取り戻す。

Modern Marisaで上手くなることは、one-buttonを卒業することでも、ODを増やすことでもない。相手を見ているtime、remaining Drive、screen position、after-hit route、input certaintyを見ながら、「Which currency do I spend this time?」を選べるようになることだ。調べる前にはone-buttonとODはmove strengthの差に見えていた。調べた後では、これは**a tiny economy exchanging time, damage, gauge, and certainty**に見える。Marisaはfistsで殴っているが、playerがやっていることは意外とaccountingに近い。

## References

- CAPCOM, Battle Change List, August 3, 2026 (Marisa)  
  https://www.streetfighter.com/6/buckler/ja-jp/battle_change/20260803/marisa
- SF6 Lab, Marisa Frame Data  
  https://sf6-lab.net/fighters/marisa/frame
- SF6 Lab, Marisa Move List  
  https://sf6-lab.net/fighters/marisa/moves
- WIRED, “The Director of 'Street Fighter 6' Uncovers Its 'Modern' Updates”  
  https://www.wired.com/story/street-fighter-6-accessibility-takayuki-nakayama-interview/
- 豚平, “SF6 Modern Simple Input (One-Button) Scaling Details”  
  https://note.com/tonpeidon/n/nbc92c680a5cf
- さーな, “vsマリーザ キャラ対メモ S4 (2026/8/3)”  
  https://note.com/emesirna/n/nb24053cdc1b1
- 天多, “スト6 マリーザ調整（8月アプデ）まとめ・意図考察”  
  https://note.com/tentamiko/n/nb3c8e9001d28
- Eric Hayot, *The Elements of Academic Style*, Chapter 8 “The Uneven U”  
  https://doi.org/10.7312/hayo16800-008
