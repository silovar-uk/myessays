---
id: sf6-modern-marisa-drive-rush-as-probe
title: "走るためのRushで、Why Do We Stop?"
subtitle: "Modern MarisaのDrive Rushをapproachではなく「reaction probe」として使う"
created: "2026-09-18"
updated: "2026-09-18"
type: "Practical Game Analysis"
status: "完成"
tags: ["Street Fighter 6", "Marisa", "Modern Controls", "Drive Rush", "Fighting Games"]
keywords: ["Marisa", "Modern Controls", "Drive Rush", "raw rush", "cancel rush", "Gladius", "pressure", "SF6"]
grow: 5
abstract: "Modern MarisaでDrive Rushをどう使うかを、2026年9月時点のcurrent frame dataと攻略資料から整理する。ModernではClassicのst.LK、cr.MK、3HP、st.HKがなく、rush high/low mixをそのままcopyできない。一方、raw rushは1 stock、cancel rushは3 stocks。そこでrushを単なるmix-up toolではなく、相手がmash・block・parry・jump・reversalのどれで拒否するかを観測するreaction probeとして再設計する。中心になるのはrush Assist Light、Assist Medium、Heavy、そして+4F bonusを受けないのに有効なrush Gladiusである。"
---

# 走るためのRushで、Why Do We Stop?
## Modern MarisaのDrive Rushをapproachではなく「reaction probe」として使う

### Abstract

Drive Rushは、green flashで前へ走るsystemである。だから普通は「run forward to get close」と考える。ところがModern Marisaの攻略を調べると、妙に重要なoptionとして**rushしてからGladiusで急停止する**という話が出てくる。1 stock払ってrunし、すぐrunningをやめる。用途だけ聞くとtransportation budgetとしておかしい。

しかし、この“stop the rush”を起点に考えると、Modern MarisaのDrive Rushがかなり整理できる。Rushは必ずしも相手へ到着するためのactionではない。Green flashを見せることで、相手に「I have to stop this」とreactionさせ、そのresponseがstrikeなのか、blockなのか、parryなのか、reversalなのかをobserveする。そのうえでnext rushからanswerを変える。**Drive Rush can work as a question that collects defensive habits before it works as movement.**

本稿では、2026年9月18日時点でFrame Data Searchが表示するVer.2.0401.010をnumerical baselineにし、Modern Marisa固有のmove setを踏まえて、raw rush、cancel rush、rush Gladiusを一つのdecision modelへまとめる。

## 1. Modern is not simply “Classic with fewer rush options”

2026年向けのModern Marisa攻略では、Classicで使えるst.LK、cr.MK、3HP、st.HKがModernにはないと整理されている。特にcr.MKと3HPがないことは、rushからlow／overheadを見せるtypical mixをそのまま使えないことを意味する。攻略側も、その代わりにthrow、shimmy、delayed strike、Scutumからのcommand throwを使う方向を挙げている。

ここで「Modern has fewer options」とだけ考えると苦しくなる。別の見方をすると、Modernはhigh/lowの種類を減らす代わりに、one-button Gladius、one-button Phalanx、one-button Scutum、one-button SAという**reaction speed and input reliability**を持っている。つまりClassicのrushを縮小copyするより、rushで相手を動かし、Modern-specific instant responsesでその動きを狩る方が自然である。

この違いを先に認めると、「ModernでもClassicと同じrush mixを覚えなければ」という負担が消える。必要なのはnumber of optionsを増やすことではなく、少ない択を通すために**identify what the opponent is already trying to defend against**ことである。

## 2. Raw Rush costs 1; Cancel Rush costs 3 — same green effect, different jobs

現行systemでは、Drive Parryから出すraw rushは合計1 stock、normalからのcancel rushは3 stocksを使う。さらにrush後のnormal／unique attackには、hit／block advantageへ+4Fのbonusがかかる。ここで重要なのは、**that +4F does not apply to special moves**ということ。RushからSPでGladiusを出しても、Gladius itself does not become +4.

この差から、rolesを二つに分けられる。1-stock raw rushは、比較的cheapにdistanceとreactionを動かす“probe”。3-stock cancel rushは、normalが触れたあとに大きなgaugeを払ってcomboやcontinued pressureへ変える“cash-out”。毎回3 stocksを払ってからmind gameを始める必要はない。先に1 stockで相手のanswerを見ておけば、3-stock investmentのaccuracyを上げられる。

Drive Gaugeをdamageだけのresourceとして見ると、rushは“use / don't use”のbinaryになる。しかしprobeとcash-outに分けると、**buy information for 1 stock, then turn information into reward for 3**というtwo-stage resource allocationになる。

## 3. For raw rush, three buttons are enough: Assist Light, Assist Medium, Heavy

Modern Marisaのraw rushは、まずthree optionsに絞ると扱いやすい。2026 guideでは、rush Assist Lightはlow、rush Assist Mediumはopponent's rush checkを潰すoption、rush Heavyはlong reachからblock後+1Fでthrowを絡めるoptionとして紹介されている。

- **Rush Assist Light**: lowを見せる。Normal cr.LK is +2 on hit / -3 on block, so a simple +4 rush conversion makes it roughly +6 / +1. Modern lacks st.LK, and攻略上もtip hitではfollow-upが届きにくい注意があるため、aim closer rather than at max range.
- **Rush Assist Medium**: checks whether the opponent presses a button on green flash. Normal st.MP is +2 on hit / -1 on block, so rush makes it roughly +6 / +3. Even when blocked, Marisa is likely to move first and can show both continued strike and throw.
- **Rush Heavy**: touch from farther away. Normal st.HP is +3 on hit / -3 on block, so rush makes it roughly +7 / +1. Guides also recommend using its reach, then mixing throw after block when spacing allows.

三つを全部randomizeする必要はない。First Assist Mediumで相手がfreezeするならnext time throw、Assist Mediumをlight buttonで止めようとするならrepeat it or use Gladius brake、back awayするならAssist Light or Heavyでtouchする。**Classify the answer before selecting the next move.**

## 4. The most Modern-like rush option gets no +4F: Rush Gladius

Rush Gladiusは少し変である。Drive Rushの+4F bonusはnormal／unique attackに付くもので、special moveのGladiusには付かない。Frame mathだけ見れば、「pay for rush, then choose a move that does not receive the rush bonus」である。

それでも攻略資料がRush Gladiusを挙げる理由は別にある。Gladiusを出すとrush momentumを途中で切り、相手がrush checkとして置いたbuttonや、green flashを見て押したreversalをwhiffさせたり、armorで受けたりする展開を作れる。ModernはLight Gladiusをone buttonで出せるため、“run / attack”だけでなく、**pretend to run, then stop**というtiming layerを作りやすい。

ここでrushのmeaningが変わる。相手へ近づくspeedを上げるためではなく、相手のinputを早めるためにgreen flashを見せる。相手が“anti-rush button”を先に押した瞬間、こちらは到着しなくても目的を達成している。Rush Gladius is less a movement technique than **a feint designed to make the opponent's reflex miss**.

## 5. Cancel Rush should begin after contact, not before information

Marisaのcr.MPは、current dataで8F startup、+3 on hit、-2 on block、cancelable。Modern guideでも、中距離でcr.MPを置き、基本はcancel rushをbufferする使い方が紹介されている。ここはraw rushと逆で、touch first, then spend 3 stocks.

ヒットしたなら、3 stocksはcombo and corner carryへconvertしやすい。ガードされたなら、rushでdistanceを詰めた後にdirect throw、少しwaitしてthrow techやjumpを狩る、もう一度strikeを置く、といったmind gameへ接続できる。重要なのは、cancel rushそのものを“continue pressure automatically”としないことだ。Three stocks are half the Drive Gauge, so it is expensive to spend them blindly.

実戦では、先にraw rushやnormal pressureで「この相手はthrowを嫌がってjumpする」「rush後に4Fを押す」「parryを置く」といったhabitを取っておく。そのinformationがあるほど、cr.MP → cancel rushの3 stocksは、単なるcontinuationではなく**an investment that places a large reward directly onto a known defensive habit**になる。

## 6. Modern rush is less “strike/throw” and more “how does this player reject pressure?”

Rush後の択をmove namesで暗記すると、opponentが変わるたびに迷う。Defensive responseをfive typesに分けると、decisionがかなり軽くなる。

- **Presses a light on green flash**: build around rush Assist Medium. If the timing becomes obvious, stop with rush Gladius and try to make the check whiff or run into armor.
- **Freezes and blocks**: increase normal throw. If they continue to freeze, Scutum → Enfold command throw can join the tree, though the stance means it is not as immediate as a normal throw.
- **Parries**: throw gains value. Do not become free Perfect Parry practice by repeating rush strike every time.
- **Jumps / backdashes to escape throw**: return to immediate strike. Showing throw is what prepares the next strike.
- **Holds an invincible move / SA**: delay after rush, stop, or block. High-level guides also describe using raw rush and slightly delaying the follow-up to bait a prepared reversal, especially against Modern reactions.

この分類の良いところは、one fixed answerを作らないことにある。“Rush Assist Medium is strong”ではなく、**what does showing Assist Medium make them do next?**までを一つのsequenceとして扱える。The second rush carries more information than the first.

## 7. In oki, rush changes from “movement” into “booking the next guess”

Modern攻略では、cr.HP anti-airの後にrushでokiへ行くflowが挙げられている。別のMarisa guideでも、combo後にrushを使ってwake-up pressureを作ることが重視されている。Compared with raw rushing from neutral, a knockdown narrows the defender's action timing, which makes the same one stock more valuable.

ここでは“rush to get close”より、“reserve what you will show on wake-up”と考えた方が分かりやすい。投げを見せたいならthrow rangeまでcarryする。暴れを止めたいならAssist Medium or Heavyを重ねる。Reversal-happy opponentなら、あえてrushだけ見せてwaitする。Modernはoverhead/lowの種類が少ない分、**create timing differences among strike, throw, and stop from the same green approach**ことが重要になる。

ラッシュを使うplaceも選べる。Neutralで相手が自由に動けるときに1 stockを使うのか、knockdown後でoptionsが狭いときに1 stockを使うのか。同じ1 stockでも後者の方がobserved reactionを限定しやすい。Gauge managementは“how many stocks remain?”だけでなく、“is this a good moment to ask the question?”まで含めるとよい。

## 8. In Training Mode, record six defensive reactions before learning another combo

Rushを身体で理解するなら、maximum comboを増やすより、dummyにdefensive reactionを録画して切り替える方が早い。Try only these six tests.

1. Record a **4F mash**, then compare raw rush Assist Medium with raw rush throw. Learn what happens against “green means press.”
2. Set **block only**, then alternate rush Assist Medium → continued strike with raw rush → throw. Feel why passive defense creates throw value.
3. Set **parry**, then compare rush strike and rush throw. Confirm that repeated strike can train the opponent's defense for them.
4. Record a **light anti-rush check**, then compare rush Assist Medium with rush Gladius. Test whether stopping has value even though Gladius does not receive +4F.
5. Record an **invincible reversal / SA**, then compare immediate rush attack with rush → slight delay → block. Remove the rule that “rush must always touch.”
6. Make the dummy **block cr.MP**, then rotate immediate strike, throw, and delayed strike after cancel rush. If you spend 3 stocks, change the cash-out based on the defensive habit.

目的は“this sequence is unbeatable”とproveすることではない。Change the defender and watch your own best answer change. If rush practice becomes only combo practice, the opponent quietly disappears from the screen.

## 9. Drive Rush was not the answer; it was the question

調べる前は、Modern Marisaのrushは少しrestrictedに見えた。Classicのcr.MKや3HPがなく、high/low mixをそのままbring overできない。だからsolutionは“add more rush attacks”だと思いやすい。

しかし実際には、having fewer options and having a shallow mind game are not the same thing. Assist Light touches low. Assist Medium challenges the anti-rush button. Heavy reaches. Throw beats passive defense. Throw beats parry. Strike comes back against jump. And against the player desperate to stop the green flash, Rush Gladius **stops running**. Move countより、same green flashに対して相手が何を返したかをrememberする方が重要だった。

だから今後のmatchでは、raw rushをone attackで完結させない。First rush is the question: “What do you do when you see green?” Second rush answers their answer. Only then do you cash the one-stock observation into a three-stock cancel rush or Marisa's huge damage. Drive Rush is a system for moving forward, but using it well sometimes begins by stopping long enough to watch the opponent react.

---

### Sources

- [Frame Data Search — Marisa / Ver.2.0401.010](https://frame-search.com/?character_name=Marisa&lang=en-us)
- [Frame Data Search — Version Diff Ver.2.0301.001 → Ver.2.0401.010](https://frame-search.com/changelog?lang=en-us)
- [SF6 Lab — Marisa Frame Data](https://sf6-lab.net/en/fighters/marisa/frame)
- [SF6 Lab — Marisa Move List](https://sf6-lab.net/en/fighters/marisa/moves)
- [にこ太郎 — “M Marisa Complete Guide: Neutral, Oki, Combos, etc. 2026ver”](https://note.com/nikotarosun/n/n8ba709a7d073)
- [にこ太郎 — “Classic Marisa Complete Guide 2026ver”](https://note.com/nikotarosun/n/n51e5d284ca30)
- [Fighting Game Guide — Street Fighter 6 Guide](https://www.fightinggameguide.com/sf6.html)
- [Street Fighter Wiki — Drive Rush](https://streetfighter.fandom.com/wiki/Drive_Rush)
- [スト6原典 — Drive System Details](https://www.sf6-genten.com/advanced)

※Frame data and move availability can change with patches. This article uses Frame Data Search Ver.2.0401.010 as displayed on September 18, 2026.
