---
id: sf6-marisa-vs-elena-safe-entry
title: "You Blocked Correctly. Why Does It Still Feel Bad?"
subtitle: "Marisa vs ElenaをRed / Yellow / Greenで読む――safe entry, Lynx Song, Moon Glider, Healing SA2"
created: "2026-09-21"
updated: "2026-09-21"
type: "Matchup Field Guide / EN MIX"
status: "完成（EN MIX）"
tags: ["Street Fighter 6", "SF6", "Marisa", "Elena", "Matchup Strategy", "Frame Data", "Fighting Games"]
keywords: ["Marisa", "Elena", "Lynx Song", "Lynx Whirl", "Moon Glider", "Scratch Wheel", "Revival Dance", "frame data", "matchup"]
grow: 5
abstract: "2026年9月21日時点、Ver.2.0401.010対応。Elena対策を“interrupt everything / respect everything”から切り離し、Marisa目線でRed = don’t press、Yellow = turnを取り返す、Green = punishへ圧縮する。st.MK +1、Lynx Songfollow-upのnormal versionとLynx Whirl enhanced versionの差、Moon Gliderのsafe entry、Rhino Horn-9、Scratch Wheelの大幅不利、SA2 Healingのlife differential計算、さらにmulti-hit movesがMarisaの1-hit armorへ与える意味まで整理する。"
---

# You Blocked Correctly. Why Does It Still Feel Bad?
## Marisa vs ElenaをRed / Yellow / Greenで読む――safe entry, Lynx Song, Moon Glider, Healing SA2

### Abstract / 要旨

Elena戦には、妙な感覚がある。

ちゃんとblocked。中段も見た。突進も止めた。なのに、**なぜか得した感じがしない。**

理由は単純で、Elenaには「blockさせたら大事故」という技だけでなく、**近づいたあとも-1〜-3程度で済む、safe-ishな技が多い**からである。st.MKはblockさせて+1。cr.LP／弱Kは-1。cr.MK、中段のf+MK、b+HK、Moon Gliderは-2〜-3付近に収まる。守った側からすると、正解したのに相手がまだscreenから消えてくれない。

そこで本稿では、Elenaの技を全部覚えるのをやめる。**Red = don’t press、Yellow = punishではないがturnを取り返す、Green = punishを取る。** まず三色へ圧縮する。そのうえで、Lynx Songは「follow-up名」より**Lynx Whirlを経由したか**を見る。Moon Gliderは「-3だから4Fpunish」と決めつけず、follow-upまで含めて考える。Marisaのarmorは、Elenaのmulti-hit movesを前にすると万能ではない。

本稿は2026年9月21日時点、Frame Data Searchが掲げる**Ver.2.0401.010**を基準にし、Ultimate Frame Dataの2026年8月調整反映データで再確認した。Frame Data Searchは2026年9月8日にVer.2.0401.010へ全技を再取得している。

## 1. 守 / Quick Read：まず覚えるのは「赤・黄・緑」だけでいい

最初に持ち込むのはこの三色で十分である。数字は時間の話なので、実戦ではdistanceと押し戻しも必ず一緒に見る。

- 🔴 **Red = Elena有利。fastest暴れを基本回答にしない。** 代表はst.MK +1、Lynx Whirl経由Mallet Smash+3、Lynx Whirl経由Leopard Snap+1。blockした瞬間に4F cr.LPをpressする癖を止める。
- 🟡 **Yellow = Marisaが先に動けるが、punishではない。** cr.LP／弱K-1、cr.MK-3、中段のf+MK-3、b+HK-3、normal Mallet Smash-3、Moon Glider-3〜-2など。4F cr.LPで触り直せる場面は多いが、「damage確定」とは別。
- 🟢 **Green = -4以下。届けばpunish。** st.LK-4、cr.MP-4、f+HP-4、cr.HP-7、Rhino Horn-9、cr.HK-12、Scratch Wheel弱-24／中-30／強-33／OD-46。ここは守った成功を必ずdamageへ変える。

st.HK is ±0 on block。これはRedでもYellowでもなく、**五分へ戻る境界**として別枠にする。

![Elena対策の赤・黄・Greenを一枚で見る図](assets/sf6/elena-traffic-light.svg)

三色の意味は「危険度ランキング」ではない。**on blockに何をしてよいか**を圧縮したactionルールである。記事を閉じたあとに残すべきなのはmove name一覧ではなく、「Redなら待つ、Yellowならtake the turn back、Greenならpunishする」という反射である。

## 2. Elenaの嫌さは「危険技」より「safe entry」にある

Elenaは、blockされたら大きくpunishを受ける技だけで組み立てるキャラクターではない。むしろ厄介なのは、**前へ出たあとに大きな借金を残さないこと**である。

st.MKはstartup6Fでblock+1。cr.LPは4Fで-1、cr.LKは5Fで-1。cr.MKは2026年8月調整で-4から-3へ改善された。中段のf+MKも-3、b+HKも-3。Moon Gliderも弱／中／強／ODで-3／-2／-2／-3。数字を眺めると、Elena戦で「blockしたら毎回こちらのコンボ開始」という期待がそもそも間違っている。

ここでMarisa側が焦ると、-2や-3を見た瞬間に「今度こそ取り返す」と大振りを押し、4Fpunishですらない場所で逆に差し返される。必要なのは、守備成功を毎回大火力へ変えることではない。**Yellowではturnを戻し、Greenでだけ大きく取る。**

Elena戦の防御は、ホームランを待つ守備ではない。凡打をきちんとアウトにしながら、失投だけをスタンドへ運ぶような作業に近い。

## 3. +1のst.MKだけは、「見たらpress」を先に消す

現行版Elenaのst.MKは、startup6F、on block +1。しかもキャンセル可能である。これはElena戦のRedを代表する技になる。

Marisaのfastest cr.LPは4F。Elenaが+1を持った状態で次に4F cr.LPを押せば、時間上はこちらより先に攻撃判定が出る。だからst.MKをblockした直後の4F暴れは、「fastest技を押しているから堅い」のではなく、**相手がfastestを選んだら負ける行動**である。

一方、Elenaのst.HK is ±0 on block。ここは同じ「脚が長いnormal技」でも扱いが違う。4F同士なら時間上は同時startupになり得る。つまり、見た目で「キック系だから同じ」と覚えるのではなく、**st.MKだけRed、st.HKは五分**と切り分けた方がmatch中は簡単である。

この対策で最初に消したい癖は、「blockしたら4F」ではない。**何をblockedか確認せず4F**である。

## 4. Lynx Songは、follow-up技より「Whirlを通ったか」で性質が反転する

Lynx Songは、Elena対策がmove name暗記だけでは破綻する代表例である。Lynx Songからは複数のfollow-upへ進めるうえ、Lynx Whirlを経由すると、その後のfollow-up性能が変わる。

代表的なon-block framesはこうなる。

- **Leopard Snap**：normal-5 → Lynx Whirl経由+1
- **Harvest Circle**：normal-9 → Lynx Whirl経由-4
- **Mallet Smash**：normal-3 → Lynx Whirl経由+3

同じ「Mallet Smashをblocked」でも、normal versionならYellow、Whirl経由ならRedである。差は6F。名前は同じなのに、こちらが押してよいかどうかまで反転する。

![Lynx Songfollow-upがWhirl経由でどう変わるか](assets/sf6/elena-lynx-branch.svg)

だから、Lynx Song対策の質問は「次は何の技が来る？」から始めない方がいい。最初に見るのは、**Whirlを挟んだか。** その情報だけで、follow-up後の期待値が大きく変わる。

特にMallet Smashは中段。normal versionはblock-3なので、守れたあとはこちらが先に動ける。しかしenhanced versionは+3。中段を見切ってblockした達成感のままボタンをpressすると、今度はframe battleで負ける。Elenaは「正解を二回要求する」瞬間を作れる。

## 5. Moon Gliderは「-3だからpunish」ではない。follow-upまで見て一つの技にする

Moon Glider単体のon-block framesは、弱-3、中-2、強-2、OD-3。数字だけ見れば全部Yellowである。Marisaの4F cr.LPでpunishになる数値ではない。

さらにMoon Gliderは、ヒット／on blockに前+Pのfollow-upへ進める。follow-upを最後までblockするとnormal version-13、OD版-19と大幅不利になる。つまり面白いことに、**手前の技は安全、最後まで出すと緑**という構造になっている。

ここで「Moon Gliderをblockした、-3、press」とだけ覚えると、follow-upとの噛み合わせをトレモで確認しないまま自分からread gameへ入ることになる。逆に、follow-upまでblockしたのに弱P一本で終わらせるのももったいない。

実戦用にはこう分ける。

- Moon Glider単体をblock → **黄。まずturnを戻す意識**
- follow-upまで見えた → **最後までblockできたら大きく緑**
- follow-upへのinterrupt可否 → **distanceとバージョン込みでトレモ検証**

frame tableは「技ごとの数字」を教えてくれる。しかし実戦で必要なのは、**どこを一つの連係として読むか**である。

## 6. 緑は遠慮しない。Rhino HornとScratch Wheelは別ゲームになる

安全な技が多いからこそ、本当に危険な技をblockした瞬間は価値が高い。

Rhino Hornは弱／中／強／ODすべてon block -9付近。Marisaなら4F cr.LPだけでなく、7F st.MPや8F cr.MPまで時間上は候補に入る。実際のpunishは押し戻しで変わるため、**まず7F st.MPが届くdistance、届かないdistanceを確認して一本固定する**のがよい。

Scratch Wheelはさらに分かりやすい。弱-24、中-30、強-33、OD-46。OD版は1〜8F完全invincibleなので、起き攻め側は当然尊重する必要がある。しかしblocked後まで尊重する必要はない。ここは「とりあえず4F」ではなく、**自分が完走できる最大punishを入れる場所**である。

cr.HKも-12、cr.HPは-7。Slideは当たり方で-10〜-2と幅がある。深く当たったSlideだけは大きく返せるが、先端では同じpunishは成立しない。

つまり緑にも種類がある。

- **-4**：4Fが届くか確認
- **-7〜-9**：中攻撃始動へ上げる
- **-12以下**：大きい始動を用意
- **-24以下**：最大punishを逃さない

「緑だから弱P」ではなく、**緑が濃いほどpunishの始動を重くする。**

## 7. Marisaのarmorは、この対面では“1発受ける権利”にすぎない

Marisaにはarmorがある。だから細かく触ってくるElenaへ、グラディウスやファランクスを合わせたくなる。

ただし、この対面では「armorがある＝強引に勝てる」と考えると危ない。

normalGladiusの上半身armorは基本1hit。normalPhalanxも1hit armor。対してElenaのRhino Hornはnormal versionでも複数ヒット、OD版は3hit。OD Scratch Wheelも複数ヒット。Spinning Scytheもmulti-hitで進む。**1発耐えたあとに次が来る技が普通にある。**

![Marisaの1-hit armorとElenaのmulti-hitを比較する図](assets/sf6/elena-vs-marisa-armor.svg)

もちろん、armor技が無意味になるわけではない。相手の単発牽制を読んだとき、Phalanxで前進しながらターンを作る価値はあるし、OD Gladiusはframe 1から上半身armorが始まる。

ただ、その価値は「何でも耐える」ではなく、**何発目までなら耐えられるかを知って使うこと**にある。アレックス戦ではarmor breakが大きな論点だった。Elena戦では逆に、Marisa自身のarmorがmulti-hitにどう剥がされるかを見る方が重要になる。

## 8. Elenaのweaknessは「安全すぎること」ではなく、緑になった瞬間がはっきりしていること

Elenaには安全な行動が多い。しかし、ずっと安全なわけではない。

Rhino Hornは-9。Scratch Wheelは大幅不利。cr.HKは-12。Moon Gliderのfollow-upは-13／-19。normalHarvest Circleは-9。Lynx Whirl経由でもHarvest Circleは-4。Spinning Scytheを最後までblocked場合もnormal versionは-10〜-14付近に大きな不利を残す。

つまり、Elenaの構造的なweaknessは「近づけないこと」ではない。むしろ近づくのは得意である。weaknessは、**連係を伸ばしてリターンを取りに行った瞬間、Greenへ落ちる枝があること**である。

Marisa側がやることは、黄色い技を無理やり緑に変えることではない。Elena自身がGreenへ来た瞬間を逃さないこと。

この考え方にすると、守備中の焦りが減る。「まだ黄だった。じゃあtake the turn backだけ」「今回は緑になった。ここは取る」と、同じblockでも意味を分けられる。

## 9. SA2のHealingは「1600healing」より、ラウンド差をどう動かすかで見る

ElenaのSA2 Revival Danceはstartup12Fで、1〜11F完全invincible。ヒット後、演出中に入力をホールドするとHealingへ移行できる。

現行データでは、normalSA2のdamageは2800。Healingを選んだ場合のコンボdamage表記は1950で、Elena自身は1600healingし、2026年3月調整後はドライブゲージもhealingする。

ここで少し妙な算数が出てくる。

normalSA2と比べると、Healing版は相手へ与えるdamageが850少ない。その代わり自分が1600healingする。life differentialだけを単純比較すれば、**Healingを選ぶことでnormal versionより増える“life differential”は1600ではなく750**である。もちろん自分が満タン近ければhealingはあふれるし、ドライブhealingには別の価値がある。

![Revival Danceでnormal versionとHealing版のlife differentialを比較する図](assets/sf6/elena-healing-math.svg)

この計算の意味は、「Healingは750しか得しない」ということではない。むしろ逆で、**healing量1600だけを見ても、SA2の価値は判断できない**ということだ。

Elenaが低体力か、こちらを倒し切れるか、ドライブhealingが次の展開を変えるか。SA2を持ったElenaは、残り体力という一つの数字では測れなくなる。Marisa側は「あと2000だから一回触れば終わり」と考える前に、SA2ストックを見る。

## 10. 破 / Decision Read：screenで見たものを、そのままMarisaのactionへ変換する

match中にFrame Data Searchを開く時間はない。だから最終的には、move nameより見た目からactionへ直結させる。

- **長い中Kをblocked。** st.MK +1を疑う。反射4Fを止める。
- **Moon Gliderで滑るように入ってきた。** 単体なら黄。follow-upまで出したかを見る。最後までblockしたらGreenへ切り替える。
- **Lynx Songから一度Whirlを挟んだ。** 同じfollow-up名でもnormal versionの数字を捨てる。Mallet Smashなら+3まで変わる。
- **Rhino Hornをblocked。** -9。弱Pで終わらせず、distanceごとの中攻撃punishを固定する。
- **Scratch Wheelをblocked。** 最大punish。ODinvincibleを読んでblockedなら、read勝ちを最大化する。
- **Slideを先端でblocked。** 深当てと同じpunishを決め打ちしない。-10〜-2の幅を思い出す。
- **SA2が点灯している。** life differentialをそのまま信用しない。倒し切りとHealing後の展開まで含めてゲージを使う。

この変換をすると、Elena戦は「足技が多くて分からない」状態から離れる。見るイベントは、**+1中K、Moon Glider、Whirl、緑突進、invincible、Slide、SA2**の七つ程度に縮む。

## 11. 離 / Lab Read：5分Training Modeで“全部見る”のをやめる

Elena対策のトレモは、全follow-upを暗記する場所ではない。境界線を身体へ入れる。

1. **st.MK +1 → 4F cr.LP。** Elena側に4Fを設定し、Marisaの4Fが負けることを確認する。「blockしたらpress」を一度壊す。
2. **Moon Glider単体／follow-up。** 単体をblocked後の触り直しと、follow-upまでblocked後の大きなpunishを分けて練習する。
3. **Lynx Songnormalfollow-up／Whirlfollow-up。** 特にMallet Smashをnormal-3と強化+3で交互再生し、同じ見た目でもpress／don’t pressを切り替える。
4. **Rhino Horn／Scratch Wheel。** punishを一本固定する。Rhino Hornは中攻撃始動が届くdistanceを確認、Scratch Wheelは最大punishを10回連続完走する。
5. **armor vs multi-hit。** normalGladiusやPhalanxをRhino Horn、OD Scratch Wheel、Spinning Scytheへ重ね、何発目で剥がれるかを確認する。

5分で全部理解する必要はない。むしろ目的は逆である。**Redをdon’t press、Yellowで欲張らない、Greenを逃さない。** この三つだけをmatchへ持っていく。

## 12. 調べる前と後：Elenaは「崩しが多いキャラ」より、「守っても終わらないキャラ」だった

調べる前、Elena対策は足技、中段、スライド、Lynx Song、Moon Glider、Healingと、別々の面倒な技を覚える作業に見えていた。

調べた後では少し違う。

Elenaの嫌さは、毎回大博打をしてくることではない。むしろ逆である。**危険な賭けをせず、-1、-2、-3、±0、+1という小さな数字の中で前へ出続ける。** 守った側に「そろそろ俺の番だろ」と思わせ、その焦りから大きなボタンを引き出す。

だから対策も派手でなくていい。

st.MK +1ならdon’t press。Moon Glider単体なら欲張らない。Whirlを見たらfollow-upの数字を切り替える。Rhino HornとScratch Wheelをblockしたら必ず取る。SA2があればlife differentialを再計算する。

最初の疑問――「ちゃんとblockしてるのに、なぜ得した感じがしないのか」――への答えは、blockが間違っていたからではない。

**blockの成功には、“大きく返す成功”と“相手の安全な前進をそこで止める成功”の二種類があった。**

Elena戦では、その二つを同じものだと思わない方が強い。

## Sources

- [Frame Data Search — Elena / Ver.2.0401.010](https://frame-search.com/?character_name=%E3%82%A8%E3%83%AC%E3%83%8A&lang=ja-jp)
- [Frame Data Search — Update History](https://frame-search.com/history)
- [Ultimate Frame Data — Elena](https://ultimateframedata.com/sf6/elena)
- [Ultimate Frame Data — Marisa](https://ultimateframedata.com/sf6/marisa)
- [CAPCOM — Street Fighter 6](https://www.streetfighter.com/6/)

※frame dataはアップデートで変化する。本文は2026年9月21日時点、Frame Data Search表記のVer.2.0401.010を基準にした。本文中の図は本サイト内に保存したschematicであり、実際のゲーム内hitboxそのものではない。
