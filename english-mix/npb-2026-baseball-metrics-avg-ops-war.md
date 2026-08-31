---
id: npb-2026-baseball-metrics-avg-ops-war
title: "野球の数字を読む — 打率からOPS、WARへ / Reading Baseball Numbers"
subtitle: "Metrics are lenses: what they show, and what they miss"
created: "2026-08-31"
updated: "2026-08-31"
type: "Research Guide"
status: "完成"
tags: ["野球", "NPB", "baseball metrics", "sabermetrics", "2026"]
keywords: ["NPB", "batting average", "OBP", "SLG", "OPS", "ERA", "WHIP", "K/9", "WAR", "baseball metrics"]
favorite: 5
grow: 5
series: "野球という産業を読む"
seriesOrder: 3
abstract: "What does a baseball stat actually measure? 第3回ではAVG, OBP, SLG, OPS, ERA, WHIP, strikeouts, WARを『ランキングの数字』ではなく、player valueの一部分を見るlensとして整理する。Episode 2の選手を再利用し、what each metric sees and missesを読み分ける基礎を作る。"
---

# 野球の数字を読む — 打率からOPS、WARへ / Reading Baseball Numbers
## Metrics are lenses: what they show, and what they miss

第2回では、playersをfameではなく**role**で覚えた。

POWER、ON-BASE、SPEED、STARTER、CLOSER。

Now we ask the next question.

**When we say “this player is great,” what number are we actually looking at?**

打率？ Home runs？ ERA？ OPS？ WAR？

Short answer: **there is no single magic number.**

A metric is a lens. 選手そのものではなく、価値の一部分を見せる道具である。

> **Data snapshot: after games on August 30, 2026.**
>
> 2026年の選手例はEpisode 1・2と同じsnapshotを使う。Metric definitions were re-checked on August 31, 2026.

## 1. SHORT ANSWER — 数字は「答え」ではなく「質問」

One metric answers one kind of question.

第2回の近藤健介は、2026年8月30日時点で**AVG .306 / OBP .425**。

Same plate appearances, different lens.

AVG asks: **How often did he get a hit?**

OBP asks: **How often did he avoid making an out and reach base?**

四球を数えるかどうかだけでも、player profileは変わる。

So reading stats is not memorizing acronyms.

**Ask two things: What does this metric see? What does it miss?**

今回は、

**hit → reach base → power → combined offense → running → run prevention → baserunners → strikeouts → total value**

の順でlensを重ねる。

## 2. 打率 AVG — Did it become a hit?

Batting average is **hits divided by at-bats**.

10打数3安打なら.300。Simple, visual, easy to connect with a game.

**It sees:** how often an at-bat becomes a hit.  
**It misses:** walks, hit-by-pitches, the difference between a single and a home run, running, defense.

ここが最初の限界。

A single and a home run both count as one hit in AVG.

A walk gets the batter to first base, but it does not raise AVG.

**AVG matters. It just does not tell the whole offensive story.**

[MLB Glossary: Batting Average](https://www.mlb.com/glossary/standard-stats/batting-average)

## 3. 出塁率 OBP — Avoiding outs is a skill

OBP expands the question.

安打だけでなく、walksやhit-by-pitchesで塁へ出たことも含める。

That is why 近藤健介 was our ON-BASE example in Episode 2.

AVG .306に対してOBP .425。

The gap itself teaches something: **getting a hit and getting on base are not identical skills.**

**It sees:** how often a batter reaches base instead of making an out.  
**It misses:** whether that reach was a single or a home run, and what happens after reaching base.

四球が「何も起きなかった打席」ではなくなる数字、と覚えると分かりやすい。

[MLB Glossary: On-base Percentage](https://www.mlb.com/glossary/standard-stats/on-base-percentage)

## 4. 長打率 SLG — How big was the hit?

AVG treats every hit equally. SLG does not.

単打=1、二塁打=2、三塁打=3、本塁打=4としてtotal basesを数え、at-batsで割る。

So SLG is close to asking:

**How many bases did the hitter create per at-bat through hits?**

**It sees:** hit quality and power.  
**It misses:** walks, hit-by-pitches, baserunning, defense.

第2回の佐藤輝明のようなPOWER hitterを見るなら、home runsとSLGを一緒に見ると理解が深くなる。

[MLB Glossary: Slugging Percentage](https://www.mlb.com/glossary/standard-stats/slugging-percentage)

## 5. OPS — One quick offensive summary

Now combine two lenses.

**OPS = OBP + SLG**

OBP asks about reaching base. SLG asks about power through hits.

OPS puts both into one quick number.

だからAVGだけより、a broader picture of hittingが見えやすい。

But OPS is still a shortcut.

It does not automatically adjust for ballpark or league environment, and it literally adds two different rate statistics together.

**Useful summary, not universal truth.**

佐藤輝明のPOWERと近藤健介のON-BASE skillを同じ入口から眺めたいとき、OPSは便利なbridgeになる。

[MLB Glossary: On-base Plus Slugging](https://www.mlb.com/glossary/standard-stats/on-base-plus-slugging)

## 6. 本塁打・打点・盗塁 — Counting what actually happened

Not every useful stat is a rate.

### Home runs / HR

一振りで得点まで進む、very visible outcome。

But HR alone does not include walks, singles, defense, or other ways of creating value.

### Runs batted in / RBI

RBI tells us how many runs scored through the batter's result.

ただし、who was already on base and where the hitter bats in the lineup matter too.

Opportunity is part of the number.

### Stolen bases / SB

周東佑京のSPEEDを見るなら、SBは分かりやすい。

But a steal total without caught stealing can hide failed attempts.

And baserunning is larger than stolen bases: first-to-third runningやdefensive pressureはSBだけでは全部見えない。

**Count stats tell us what happened. Always ask how many chances and failures sat behind the count.**

[MLB Glossary: Stolen-base Percentage](https://www.mlb.com/glossary/standard-stats/stolen-base-percentage)

## 7. 投手はERA → WHIP → Kで読む

Pitchers need multiple lenses too.

### ERA — Run prevention result

ERA asks how many earned runs a pitcher allows per nine innings.

第2回の村上頌樹は8月30日時点でERA 1.84。

**It sees:** the final result of earned-run prevention.  
**It misses:** some effects of defense, batted-ball outcomes, and exactly how the pitcher produced outs.

[MLB Glossary: Earned Run Average](https://www.mlb.com/glossary/standard-stats/earned-run-average)

### WHIP — How much traffic reached base?

WHIP is **(walks + hits) / innings pitched**.

ERA looks closer to runs allowed. WHIP moves one step earlier and asks how many baserunners were allowed by hits and walks.

**It sees:** traffic on the bases.  
**It misses:** the difference between a single and a home run, hit-by-pitches, and other context.

[MLB Glossary: WHIP](https://www.mlb.com/glossary/standard-stats/walks-and-hits-per-inning-pitched)

### Strikeouts / K and K/9 — Outs without a ball in play

才木浩人 was our strikeout starter in Episode 2.

A strikeout does not require a fielder to convert a batted ball into an out.

K/9 asks how many strikeouts a pitcher produces per nine innings.

But context matters: relievers can often throw at higher intensity for a short appearance, so a closer such as マルティネス and a starter should not be compared blindly by K/9.

[MLB Glossary: Strikeouts Per Nine Innings](https://www.mlb.com/glossary/advanced-stats/strikeouts-per-nine-innings)

## 8. WAR — Can different jobs share one unit?

Now the hard question.

佐藤のpower、近藤のon-base skill、周東のrunning、小園海斗のdefensive position。

**These are different jobs. How can we compare total value?**

WAR means **Wins Above Replacement**.

The basic idea is to estimate how many wins a player adds compared with a readily replaceable player.

For position players, systems generally combine batting, baserunning, fielding, positional adjustment and other factors.

ここでEpisode 2の小園が戻ってくる。

同じような打撃成績でも、what position you defend can change the value estimate.

But there is one major warning.

**WAR is a concept with multiple implementations, not one universal formula.**

FanGraphs has fWAR. Baseball-Reference has bWAR / rWAR. Their frameworks overlap, but some inputs and calculations differ.

だから今回はNPB選手のWAR rankingを作らない。

First learn the reason WAR exists: **we want one framework that can combine very different kinds of contribution.**

[MLB Glossary: Wins Above Replacement](https://www.mlb.com/glossary/advanced-stats/wins-above-replacement)  
[FanGraphs: What is WAR?](https://library.fangraphs.com/misc/war/)  
[FanGraphs: fWAR, rWAR, and WARP](https://library.fangraphs.com/war/differences-fwar-rwar/)

## 9. 同じ選手でも、lensを替えると見え方が変わる

### 佐藤輝明 × 近藤健介

- **AVG:** hit frequency.
- **OBP:** how often the hitter avoids an out and reaches base.
- **SLG:** power and total bases through hits.
- **OPS:** quick combined view of OBP + SLG.

The question is not “who is truly better?”

**Ask: How does each hitter create offensive value?**

### 村上頌樹 × 才木浩人

- **ERA:** run prevention result.
- **WHIP:** baserunners allowed by hits and walks.
- **K / K9:** strikeout volume or pace.

同じstarterでも、different numbers describe different strengths.

Episode 2 gave us the roles. Episode 3 connects those roles to measurable signals.

## 10. 数字は答えではない — Keep five contexts

More advanced metrics do not remove context.

数字の横へ5つ残す。

1. **ROLE** — starter, reliever, middle-order hitter, pinch runner.
2. **POSITION** — catcher / shortstop and first base do different defensive work.
3. **OPPORTUNITY** — RBI, wins and saves depend partly on chances.
4. **ENVIRONMENT** — ballpark, league and era change run environments.
5. **SAMPLE** — ten plate appearances and five hundred are not equally stable evidence.

A combined metric is useful because it compresses information.

But compression also hides detail.

**The goal is not to find one perfect number. The goal is to choose the right lens for the question.**

これはsports businessでも同じ。

Attendance, revenue, LTV, views — every KPI shows something and leaves something out.

## 11. 成績表を30秒で読むなら、この3段階

**STEP 1｜Choose the role.**  
POWER? ON-BASE? SPEED? STARTER?

**STEP 2｜Pick only two or three metrics.**  
Hitters: AVG + OBP + SLG / OPS. Pitchers: ERA + WHIP + K.

**STEP 3｜Name one thing the numbers do not show.**  
Defense? Failed steals? Role difference? Small sample?

That is enough to turn a stat table from a ranking sheet into **a map of how value is created**.

## 12. Takeaways

1. **A metric is a lens, not the player.**
2. Layering AVG → OBP → SLG / OPS and ERA → WHIP → K helps one metric cover another metric's blind spot.
3. WAR is a powerful total-value framework, but methodology differs. Keep role, position, opportunity, environment and sample in the picture.

## Today's Data English

- **batting average (AVG)** — 打率
- **on-base percentage (OBP)** — 出塁率
- **slugging percentage (SLG)** — 長打率
- **on-base plus slugging (OPS)** — 出塁率＋長打率
- **wins above replacement (WAR)** — replacement levelと比べた総合的な勝利貢献の推定

## Next Question

The first foundation unit is now complete.

- Episode 1: **WHERE** — NPBの地図
- Episode 2: **WHO** — players and roles
- Episode 3: **HOW TO MEASURE** — value and metrics

Next, zoom out from the player to the system.

**第4回「なぜNPBは12球団・2リーグ・143試合なのか」**

Why 12 teams? Why two leagues? Why 143 games?

数字を見る目を持ったまま、**GAME → SYSTEM**へ進む。

## Sources

### NPB 2026 official stats

- [Central League batting](https://npb.jp/bis/2026/stats/bat_c.html)
- [Pacific League batting](https://npb.jp/bis/2026/stats/bat_p.html)
- [Central League pitching](https://npb.jp/bis/2026/stats/pit_c.html)
- [Pacific League pitching](https://npb.jp/bis/2026/stats/pit_p.html)

### MLB Glossary

- [Batting Average (AVG)](https://www.mlb.com/glossary/standard-stats/batting-average)
- [On-base Percentage (OBP)](https://www.mlb.com/glossary/standard-stats/on-base-percentage)
- [Slugging Percentage (SLG)](https://www.mlb.com/glossary/standard-stats/slugging-percentage)
- [On-base Plus Slugging (OPS)](https://www.mlb.com/glossary/standard-stats/on-base-plus-slugging)
- [Stolen-base Percentage (SB%)](https://www.mlb.com/glossary/standard-stats/stolen-base-percentage)
- [Earned Run Average (ERA)](https://www.mlb.com/glossary/standard-stats/earned-run-average)
- [WHIP](https://www.mlb.com/glossary/standard-stats/walks-and-hits-per-inning-pitched)
- [Strikeouts Per Nine Innings (K/9)](https://www.mlb.com/glossary/advanced-stats/strikeouts-per-nine-innings)
- [Wins Above Replacement (WAR)](https://www.mlb.com/glossary/advanced-stats/wins-above-replacement)

### WAR methodology

- [FanGraphs: What is WAR?](https://library.fangraphs.com/misc/war/)
- [FanGraphs: fWAR, rWAR, and WARP](https://library.fangraphs.com/war/differences-fwar-rwar/)
