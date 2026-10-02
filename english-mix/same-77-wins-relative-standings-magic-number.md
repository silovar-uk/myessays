---
id: same-77-wins-relative-standings-magic-number
title: "同じ77勝なのに、one team is one step from the title, the other 13.5 games back"
subtitle: "Hanshin and Seibu show why a number means little without its competitive context"
created: "2026-10-02"
updated: "2026-10-02"
type: "リサーチエッセイ"
status: "完成"
tags: ["baseball", "NPB", "Hanshin Tigers", "Seibu Lions", "magic number", "games behind", "metrics", "relative evaluation"]
keywords: ["77 wins", "games behind", "magic number", "winning percentage", "relative metrics", "benchmark"]
grow: 5
abstract: "On October 2, 2026, Hanshin had 77 wins and a magic number of one, while Seibu also had 77 wins but sat 13.5 games behind Pacific League leader SoftBank. Same number of wins, radically different meaning. This essay uses that oddity to explain games behind, magic numbers, and why metrics only make sense inside the system that generates them."
---

# 同じ77勝なのに、one team is one step from the title, the other 13.5 games back
## Same output, different competitive world

2026年10月2日の夜、there was a beautifully strange pair of numbers.

阪神タイガースは77勝59敗で、優勝まで **magic number 1**。  
埼玉西武ライオンズも77勝しているのに、Pacific League leaderの福岡ソフトバンクホークスから **13.5 games behind**。

Same 77 wins. Almost the same number of losses. Totally different story.

This is the key: **standings are relational metrics, not isolated facts.** 77勝はチーム単体の実績。でも「首位」「13.5ゲーム差」「マジック1」は、league around that teamを含めて初めて成立する。

![Same 77 wins, two different competitive worlds.](https://silovar-uk.github.io/myessays/assets/same-77-wins-two-worlds.svg)

> **As of October 2, 2026.**
>
> 10月1日終了時点では阪神M2、西武は13.0 games behind. On October 2, neither Hanshin nor Seibu played, yet Yomiuri's loss moved Hanshin to M1 and SoftBank's win pushed Seibu to 13.5 games back.

## 1. 77 wins is an absolute result; rank is a relative position

阪神と西武の77勝は、as an absolute count, exactly the same.

But they live in different competitive distributions.

10月1日終了時点、阪神は77勝59敗2分、2位巨人は76勝62敗3分。Hanshin was already the league leader. 西武は77勝60敗4分だったが、SoftBank had 90 wins and only 47 losses.

So the same number means different things:

- Hanshin world: 77 wins was the top of the league.
- Seibu world: 77 wins was strong, but another team had already reached 90.

Nothing mysterious happened to the number 77. **The benchmark changed.**

参照：[NPB 2026 standings](https://npb.jp/games/2026/) ／ [Central League standings](https://npb.jp/bis/2026/stats/std_c.html) ／ [Pacific League](https://npb.jp/pl/)

## 2. Games behind measures distance using both wins and losses

“13.5 games behind” is not simply “the leader has 13.5 more wins.” It compresses the gap in wins and losses into one distance.

After SoftBank beat Lotte 4–3 on October 2, SoftBank stood at 91–47 while Seibu remained 77–60.

The calculation is:

**GB = {(leader wins − team wins) + (team losses − leader losses)} ÷ 2**

For SoftBank and Seibu:

**{(91 − 77) + (60 − 47)} ÷ 2  
= (14 + 13) ÷ 2  
= 13.5**

![How 91–47 versus 77–60 becomes 13.5 games behind.](https://silovar-uk.github.io/myessays/assets/game-behind-13-5-formula.svg)

Why divide by two? In a direct matchup, if the leader loses and the trailing team wins, the win gap shrinks by one and the loss gap also shrinks by one. Two units of record difference correspond to roughly one game of head-to-head distance.

So games behind is not the standings themselves. It is a **readable distance between two win-loss records**.

参照：[日刊スポーツ 10月2日 ロッテ―ソフトバンク](https://www.nikkansports.com/baseball/professional/team/marines/) ／ [NPB Pacific League](https://npb.jp/pl/)

## 3. Magic number measures a shrinking future, not today's distance

Games behind looks at current separation. A **magic number** looks forward.

On October 1, Hanshin was 77–59–2 and Yomiuri 76–62–3. Hanshin's magic number was two.

Then October 2 produced the weirdest part: Hanshin did not play.

Yet Yomiuri lost to Yakult, and Hanshin's magic number fell from two to one.

阪神の77勝は増えていない。What changed was the set of futures in which Yomiuri could still overtake Hanshin.

That is why “magic number = wins still needed” is a useful shortcut but not a complete definition. It can fall when the target team loses, and sometimes a draw matters too.

A better mental model is: **magic number counts how close the race is to becoming mathematically irreversible.**

参照：[日刊スポーツ「巨人●ならついにM1」](https://www.nikkansports.com/baseball/news/202610020000813.html) ／ [毎日新聞 阪神がマジック1に](https://mainichi.jp/graphs/20261002/mpj/00m/050/160000f)

## 4. The funniest part: neither Hanshin nor Seibu had to do anything

On October 1:

- Hanshin: 77–59–2, M2
- Seibu: 77–60–4, 13.0 GB

On October 2, both teams were idle.

Then other teams moved.

Yomiuri lost → Hanshin became M1.  
SoftBank won → Seibu became 13.5 GB.

![Relational metrics can move while the measured team stays still.](https://silovar-uk.github.io/myessays/assets/standings-relational-metrics.svg)

This is almost a laboratory demonstration of a relational metric.

Height does not change because your neighbor grew. Market share does. Rank does. Search position does. Games behind does. Magic number does.

So a useful question for any KPI is not only **“What does this number measure?”** but also **“Whose behavior can move it?”**

## 5. Their winning percentages were almost identical

The contrast gets stranger when we look at winning percentage.

As of October 1:

- Hanshin: .566
- Seibu: .562

Difference: only .004.

In one league, .566 was first place. In the other, .562 sat far behind a .657 SoftBank team.

This tells us why “good performance” and “good competitive position” need separate lenses.

**77 wins is performance. Standing is context.**

If you say Seibu was weak because it sat 13.5 games back, you erase the absolute quality of 77 wins. If you say Hanshin and Seibu were therefore equally positioned because both had 77 wins, you erase the competitive environment.

Both views are incomplete.

## 6. Build imaginary leagues and the meaning of 77 flips immediately

Imagine League A. The leader has 77 wins and second place has 70. Then 77 is dominant.

Imagine League B. The leader has 100, second has 90, third has 77. Same 77, very different status.

Imagine League C where every club sits around 70 wins. 77 looks huge.

Imagine League D where most clubs sit around 80. 77 might be below average.

The lesson is broader than baseball: **an absolute value tells you output; a distribution tells you position.**

You need both.

## 7. The same “77-win problem” appears in business KPIs

ここからはbusiness interpretation.

Revenue: ¥10 billion. Attendance: 500,000. Retention: 80%. Followers: 100,000.

These numbers may look impressive, but評価にはbenchmarkが要る。Last year? Market growth? Competitors? Budget? Target? Time remaining?

A company can grow revenue 10% while losing market share if the market grows 30%. Another can decline 2% while gaining relative strength if the market falls 10%.

Same structure.

- Absolute metric: How much did we produce?
- Relative metric: Where are we versus others?
- Remaining-condition metric: How much future room remains before the outcome is fixed?

Games behind is close to the second. Magic number is close to the third.

A baseball standings table is, in that sense, a compact dashboard combining **performance, benchmark, and remaining possibility**.

## 8. Ask one extra question: who else can move this number?

The practical takeaway is simple.

When a metric appears, ask:

**“Can this number change even if we do nothing?”**

If yes, it is at least partly relational.

Market share moves when competitors move.  
Search rank moves when other sites move.  
Percentile moves when the reference group moves.  
Magic number moves when the rival loses.  
Games behind moves when the leader wins.

On October 2, Hanshin and Seibu gave us the cleanest possible example. Their own records stayed frozen at 77 wins, while the surrounding system changed their displayed position.

A metric is never just a number. **It is a rule connecting an object to a system.**

## 9. Same 77 wins. Different world.

At first, the puzzle was:

“How can 77 wins mean title almost clinched for one team and 13.5 games back for another?”

After looking at the math, the question changes.

Why did we expect 77 wins, by itself, to tell us where a team should stand?

Hanshin's 77 wins lived in a league where no one had more. Seibu's 77 lived next to a SoftBank team already at 91.

Then, on October 2, neither team played, and both numbers moved anyway.

That is the final clue.

**Same 77 wins. Different relationship. Different meaning.**

数字は一人では順位になれない。

## Sources

- [NPB, 2026 Regular Season](https://npb.jp/games/2026/)
- [NPB, Central League standings](https://npb.jp/bis/2026/stats/std_c.html)
- [NPB, Pacific League](https://npb.jp/pl/)
- [Nikkan Sports, Hanshin magic-number scenario, Oct. 2, 2026](https://www.nikkansports.com/baseball/news/202610020000813.html)
- [Mainichi Shimbun, Hanshin moves to magic number 1, Oct. 2, 2026](https://mainichi.jp/graphs/20261002/mpj/00m/050/160000f)
- [Nikkan Sports, Lotte vs. SoftBank result, Oct. 2, 2026](https://www.nikkansports.com/baseball/professional/team/marines/)
