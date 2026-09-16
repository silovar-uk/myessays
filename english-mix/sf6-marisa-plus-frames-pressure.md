---
id: sf6-marisa-plus-frames-pressure
title: "有利を取ったあと、What Do You Press?"
subtitle: "Marisaの+1〜+5をnext actionへtranslateする"
created: "2026-09-16"
updated: "2026-09-16"
type: "Practical Game Analysis"
status: "完成"
tags: ["Street Fighter 6", "Marisa", "Frame Data", "Fighting Games", "Pressure"]
keywords: ["Marisa", "frame advantage", "frame trap", "Drive Rush", "throw invulnerability", "pressure", "SF6"]
favorite: 5
grow: 4
abstract: "After Marisa gets plus frames on block, what should she actually press? Using current Ver.2.0401.010 frame data, this essay translates +1 through +5 into the slowest follow-up that can cleanly beat a 4F mash, then adds spacing, throw invulnerability, Drive Rush, parry, and reversals. The strangest discovery is that at +5, an immediate throw can be too early and whiff. Plus frames are not a permission slip to keep attacking; they are a time budget for designing the next choice."
---

# 有利を取ったあと、What Do You Press?
## Marisaの+1〜+5をnext actionへtranslateする

### Abstract

Marisaのcharged standing HPをガードさせる。Current dataでは+5F。You get five whole frames before the opponent. 普通に考えれば、ここでthrowすれば強そうである。ところがStreet Fighter 6には、blockstun終了直後に2Fのthrow invulnerabilityがある。Normal throwは5F startup、3 active frames。+5からimmediate throwすると、そのactive framesが「still in blockstun → throw invul frame 1 → throw invul frame 2」を通過して、全部whiffすることがある。**You can be so plus that your throw is too early.** 何を言っているのか分からないが、frame worldでは本当に起こる。

そこで本稿では、「Marisaはこのmoveが+何F」というmemorizationをやめる。代わりに、+1〜+5を「what startup can beat a 4F mash cleanly?」「when does throw work?」「what should we abandon when spacing pushes us out?」へtranslateする。Starting pointはDoodのMarisa matchup pageだが、再確認すると一部のnumbersがcurrent versionと食い違っていたため、final numbersは2026年9月16日時点でVer.2.0401.010を掲げるFrame Data Searchを基準にした。

結論を先に言うと、frame advantageは「still my turn」というpermission slipではない。**It is a time budget: how slow a choice can you place before the opponent's fastest button becomes active?** そしてMarisaでは、そのbudgetが大きいほど単純にoffenseが強くなるわけでもない。+5 lets an 8F move beat a 4F mash, yet immediate throw needs a tiny delay. Bigger numbers create more room to design, not fewer decisions.

## 1. 攻略の前に、first do version control

今回のstarting pointにしたDoodのframe dataでは、charged standing HPがon block +4、Heavy Quadrigaが-3と記載されている。一方、Frame Data Searchのcurrent Ver.2.0401.010では、charged standing HPは+5、Heavy Quadrigaは+1。さらにsame site's version diffには、charged standing HPのrecoveryが1F短縮され、Heavy Quadrigaのblock advantageが-3から+1へ変わったことが明示されている。

It is only one frame — or four frames — but in a match, that can make it a different move. +4なら7F standing MPまで4F mashをcleanly beatできる。+5なら8F crouching MPまで届く。Heavy Quadrigaが-3ならpressure is basically over; +1なら少なくとも4F crouching LPを先に置ける。攻略記事で最初に確認すべきものはmove nameよりversion numberなのかもしれない。

したがって以下では、Doodをmove map / matchup overviewとして参照しつつ、numbersはcurrent versionを明示しているFrame Data Searchを優先する。Game knowledge is not only about whether a claim is correct. You also need to know **when it was correct**.

## 2. Where does Marisa actually create plus frames?

Current Ver.2.0401.010で、guardさせて明確にplusを取れるrepresentative situationsを並べるとこうなる。全部memorizeする必要はない。まず「where +1, +3, +4, +5 come from」を見る。

- **+1**: charged standing HK, Heavy Quadriga
- **+2**: charged Malleus Breaker first hit
- **+3**: charged Falx Crusher first hit, Light / Medium / Heavy Phalanx
- **+4**: charged Magna Bunker, all charged Gladius versions, OD Phalanx
- **+5**: charged standing HP

ここで早くもtrapがある。同じ+4でも、charged Gladiusをtip rangeでblockさせた+4と、close rangeで別moveをblockさせた+4はsame offenseではない。Frames only tell you time. Whether your fist reaches is a spatial problem. **A +4 number does not come bundled with throw range.**

## 3. Translate +1〜+5 into “what beats a 4F mash?”

ここからがmain topicである。相手がblock後に4F moveをmashすると仮定する。こちらが+Nで、次にstartup Sのstrikeを押す場合、opponent's 4F moveをtradeではなく先に潰す条件は、おおむね **S ≤ N+3** になる。S=N+4ならsame frameにhitboxが出るため、baseline resultはtradeである。Actual hitboxes, hurtboxes, and distance can change the result, but this arithmetic is the foundation.

Marisaのnormalsへ当てはめると、かなりeasy to rememberになる。

- **+1**: 4F crouching LP is the clean trap. 5F crouching LK sits on the trade line versus a 4F mash.
- **+2**: 5F crouching LK is clean. 6F standing LK / standing LP are on the trade line.
- **+3**: 6F standing LK / standing LP are clean. 7F standing MP is on the trade line.
- **+4**: 7F standing MP is clean. 8F crouching MP is on the trade line.
- **+5**: 8F crouching MP is clean. 9F crouching MK is on the trade line.

このtranslationをすると、「+5 is strong」というvague phraseが、「+5 lets 8F crouching MP become active before a 4F mash」へ変わる。The number finally becomes a button. そしてtrade lineもworthlessではない。相手が本当に4Fを押せばtrade、押さなければslower optionを通せる。つまり境界線は「don't use this」ではなく、**from here onward, you are choosing a read**というsignpostである。

## 4. +1, +2, +3 are not “small plus”; they buy different rights

At +1, まず考えるのは4F crouching LPである。これだけは4F mashをtime-wise cleanly beatできる。5F crouching LKはlowで魅力的だが、fastest 4Fとはtradeになる。しかもHeavy Quadrigaの+1はdistanceが離れやすい。数字だけ見てcrouching LPを押しても、your fist punches airなら何も起きない。+1は「free offense」ではなく、**the right to restart the situation one frame earlier**くらいに考えた方がいい。

At +2, 5F crouching LK can now beat a 4F mash cleanly. ここで初めて「fastest mashを潰すlow」が入る。またnormal throw is 5F startupなので、距離が近ければstrike/throw mixも機能しやすい。+2 looks modest, but it is the point where the defender starts juggling crouch block, throw tech, and mash at the same time.

At +3, 6F standing LK / standing LPまでがclean frame trapsになる。特にstanding LK is cancelableなので、その後のspecialやDrive Rushまでdesignしやすい。7F standing MPは4F mashとtrade lineなので、「I absolutely want to crush mash」なら一段速いbuttonを選ぶ。Light / Medium / Heavy Phalanx are +3 on block, making this a useful benchmark to remember.

## 5. +4 is where standing MP becomes a clean mash check

At +4, the important change is that 7F standing MP cleanly beats a 4F mash. Marisa's standing MP is normally -1 on block, but as the follow-up to a +4 situation, its startup lands before the defender's fastest 4F. 8F crouching MP sits on the trade line, so you can split the purpose: standing MP when you want to shut mash down, crouching MP when you are willing to include a stronger read on passive defense.

Charged Gladius variants and OD Phalanx are +4 on block. ここはvery Marisaなplus situationだが、the move itself creates pushback, so you must check reach separately. If you are close, standing MP or throw. If you are farther out, touch again with something that reaches, or simply take the positional win instead of forcing a frame trap. **Not “+4, therefore standing MP,” but “+4 AND standing MP reaches, therefore standing MP.”**

相手がparryを多用するならthrowのvalueが上がり、throw techを仕込むならsmall walk-back / delayed strikeがvalueを持つ。Frame advantage does not give one correct move. It gives multiple answers enough time to become real options.

## 6. +5 is strong. But immediate throw can be too early

Current charged standing HP is +5 on block. ここまで来ると8F crouching MPまで4F mashをcleanly beatできる。7F standing MP is tighter, 6F standing LK tighter still. 9F crouching MK is a low, but it sits on the trade line against a 4F mash, so treat it as a read rather than a guaranteed mash crusher.

そして冒頭のweird pointへ戻る。SF6 normal throw is 5F startup with 3 active frames, while the defender has 2F throw invulnerability immediately after blockstun. From +5, an immediate throw can spend those three active frames on “still in blockstun,” “throw invul,” and “throw invul,” then whiff despite being in range. +5 does not make throw weak. **+5 makes the throw start too early.**

In theory, delaying at least 1F can let a later active frame overlap the end of throw invulnerability. ただし実戦ではdistance、how much you delay、jump、backdash、delay techまで絡む。So the useful command at +5 is not “throw.” It is **strike immediately; throw slightly later**. Knowing the number gives you more timing to manage, not less.

## 7. Frames are time; reach is space. Same +4 does not mean same offense

Frame-data explanations tend to end in time. 実戦では、next buttonが届かなければframe trapは存在しない。Heavy Quadriga +1, charged Gladius +4, OD Phalanx +4 all leave different spacing and pushback. だから「after +N, press X」というchartだけではhalf an攻略にしかならない。

A useful practical split is three distances. **Close range**: strike / throw. **Mid range**: use a reaching cancelable normal or medium to control mash and touch again. **Tip range**: instead of whiffing a short button just because you are plus, carry the advantage forward through movement or space control. You do not have to cash every plus frame immediately.

これはMarisaと相性のいいviewでもある。Her plus moves often come with charge, forward movement, armor, and pushback — properties that also change space. Marisa pressure therefore makes more sense as a **time × distance problem** than as a list of positive numbers.

## 8. Change the next action based on how the defender says “no”

ここまでをdefender's optionsから逆算すると、match decision becomes much simpler.

- **They mash 4F**: immediately use a strike that fits inside your clean-trap threshold. +1 → cr.LP, +4 → st.MP, +5 → cr.MP.
- **They keep blocking**: add throw. Only after +5, avoid the immediate throw and delay it slightly.
- **They tech throws a lot**: wait, move out of throw range, or use a delayed strike to punish the tech attempt.
- **They parry a lot**: throw becomes more valuable. Do not feed Perfect Parry with the same immediate strike every time.
- **They jump / backdash**: choose immediate strike over throw. Jump and backdash evade throws but are more vulnerable to strikes.
- **They mash invincible reversal / SA**: stop pressing and block. Being plus does not delete invincibility.

つまり「what do I do after getting plus?」へのfinal answerはmove nameではなく、**identify how the opponent is refusing your advantage**である。Frames guarantee initiative, not victory. What you convert that initiative into depends on their defensive habit.

## 9. Drive Rush is also a plus-frame factory

ここまでnaturally plusになるmovesだけを見てきたが、SF6 has a more explicit method. Normal or unique attacks performed from Drive Rush gain +4F advantage on hit/block. That means a normally minus normal can become a button that leaves you acting first on block.

For Marisa, normal cr.LP is -1, so DR makes it roughly +3; standing MP is also -1 → +3; crouching MP / crouching MK are -2 → +2; standing HP is -3 → +1. すると、さっきの+1〜+5 chartをそのままreuseできる。DR cr.MP blocked at +2 lets 5F cr.LK beat a 4F mash; DR st.MP blocked at +3 lets 6F st.LK do the same.

ここで見え方が変わる。Plus frames are not only properties printed on specific moves. You can spend Drive Gauge to manufacture them. Learning Marisa offense is less about memorizing a list of plus moves and more about **where you create a time budget, and what you buy with it**.

## 10. Overkill experiment: only five Training Mode tests

To move this from theory into muscle memory, set the dummy to reversal with a 4F normal and turn on the frame meter. Then test only these five setups. That is enough to feel what one frame changes.

1. **+1**: after Heavy Quadriga or charged standing HK, compare cr.LP and cr.LK. Watch the former win first and the latter reach the trade / spacing boundary.
2. **+3**: after Phalanx, compare st.LK and st.MP. Feel the one-frame difference between 6F and 7F.
3. **+4**: after charged Gladius, compare st.MP and cr.MP. Then repeat close and at tip range to see “same number, different reach.”
4. **+5**: after charged standing HP, compare cr.MP and cr.MK. Check whether 8F wins first while 9F sits on the trade line.
5. **+5 → throw**: after charged standing HP, compare immediate throw with a slightly delayed throw. See the bizarre case where the immediate option can be too early.

The goal is not to memorize every answer. It is to build the feel that **one extra frame moves the usable button boundary by one step**. Once that is internalized, a future patch does not force you to relearn the whole chart. See the new +N, then calculate N+3 again.

## 11. Plus frames were not “my turn”; they were a budget for options

調べる前は、+5 is stronger than +4, and +4 is stronger than +3 — roughly that simple. That is not wrong, but translating the numbers into buttons makes the meaning concrete. +1 buys a clean 4F cr.LP, +3 expands to 6F st.LK, +4 reaches 7F st.MP, and +5 reaches 8F cr.MP.

ところが+5では、immediate throw can be too early and whiff. 同じ+4でもdistanceが離れれば、theoretical frame trap punches empty air. If the opponent parries, move toward throw; if they reversal, move toward block; if they mash, move toward immediate strike. Bigger numbers do not automatically move you closer to one correct answer. **They widen the set of answers you can afford.**

だから次にMarisaでplusを取ったとき、「my turn」と考えるのを少しだけやめたい。Ask instead: “How many frames of time do I own right now?” その瞬間、frame dataはspreadsheetの数字ではなく、next actionをdesignするbudgetになる。If you receive five frames, you do not have to spend all five immediately. Sometimes leaving one frame unused is exactly what makes the throw connect.

---

### Sources

- [Frame Data Search — Marisa / Ver.2.0401.010](https://frame-search.com/?character_name=Marisa&lang=en-us)
- [Frame Data Search — Version Diff Ver.2.0301.001 → Ver.2.0401.010](https://frame-search.com/changelog?lang=en-us)
- [Dood — Marisa Frame Data](https://dood.gg/ja/%E3%82%B9%E3%83%88%E3%83%AA%E3%83%BC%E3%83%88%E3%83%95%E3%82%A1%E3%82%A4%E3%82%BF%E3%83%BC6/%E3%83%9E%E3%83%AA%E3%83%BC%E3%82%B6/%E3%83%95%E3%83%AC%E3%83%BC%E3%83%A0%E3%83%87%E3%83%BC%E3%82%BF/)
- [Dood — Marisa Matchup Counter Guide](https://dood.gg/ja/%E3%82%B9%E3%83%88%E3%83%AA%E3%83%BC%E3%83%88%E3%83%95%E3%82%A1%E3%82%A4%E3%82%BF%E3%83%BC6/%E3%83%9E%E3%83%AA%E3%83%BC%E3%82%B6/%E5%AF%BE%E7%AD%96/)
- [Dood — Advanced System Guide](https://www.dood.gg/en/street-fighter-6/system-guide/)
- [Fighting Game Guide — Street Fighter 6 Guide](https://www.fightinggameguide.com/sf6.html)
- [INN. — SF6 Lesson 3: Okizeme and Setplay](https://note.com/inn_the_haze/n/n3aa65e37fe6d)

※Frame data changes with patches. This article uses Frame Data Search Ver.2.0401.010 as displayed on September 16, 2026.