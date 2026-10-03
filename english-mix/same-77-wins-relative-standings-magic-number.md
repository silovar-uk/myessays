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

So the same number means different things. In Hanshin's world, 77 wins was the top of the league. In Seibu's world, 77 wins was strong, but another team had already reached 90.

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

Games behind looks at current separation. A **magic number** looks forward. On October 1, Hanshin was 77–59–2 and Yomiuri 76–62–3, with Hanshin's magic number at two.

Then October 2 produced the weirdest part: Hanshin did not play, but Yomiuri lost to Yakult and Hanshin's magic number fell from two to one.

阪神の77勝は増えていない。What changed was the set of futures in which Yomiuri could still overtake Hanshin.

That is why “magic number = wins still needed” is a useful shortcut but not a complete definition. It can fall when the target team loses, and sometimes a draw matters too.

A better mental model is: **magic number counts how close the race is to becoming mathematically irreversible.**

参照：[日刊スポーツ「巨人●ならついにM1」](https://www.nikkansports.com/baseball/news/202610020000813.html) ／ [毎日新聞 阪神がマジック1に](https://mainichi.jp/graphs/20261002/mpj/00m/050/160000f)

## 4. The funniest part: neither Hanshin nor Seibu had to do anything

On October 1, Hanshin was 77–59–2 with M2, while Seibu was 77–60–4 and 13.0 games behind.

On October 2, both teams were idle. Then other teams moved.

Yomiuri lost → Hanshin became M1. SoftBank won → Seibu became 13.5 GB.

![Relational metrics can move while the measured team stays still.](https://silovar-uk.github.io/myessays/assets/standings-relational-metrics.svg)

This is almost a laboratory demonstration of a relational metric.

Height does not change because your neighbor grew. Market share does. Rank does. Search position does. Games behind does. Magic number does.

So a useful question for any KPI is not only **“What does this number measure?”** but also **“Whose behavior can move it?”**

## 5. Their winning percentages were almost identical

The contrast gets stranger when we look at winning percentage.

As of October 1, Hanshin was .566 and Seibu was .562.

Difference: only .004. In one league, .566 was first place. In the other, .562 sat far behind a .657 SoftBank team.

This tells us why “good performance” and “good competitive position” need separate lenses.

**77 wins is performance. Standing is context.**

If you say Seibu was weak because it sat 13.5 games back, you erase the absolute quality of 77 wins. If you say Hanshin and Seibu were therefore equally positioned because both had 77 wins, you erase the competitive environment.

Both views are incomplete.

## 6. Build imaginary leagues and the meaning of 77 flips immediately

ここで一歩やりすぎて、imagine four artificial leagues.

Imagine League A. The leader has 77 wins and second place has 70. Then 77 is dominant.

Imagine League B. The leader has 100, second has 90, third has 77. Same 77, very different status.

Imagine League C where every club sits around 70 wins. 77 looks huge.

Imagine League D where most clubs sit around 80. 77 might be below average.

The lesson is broader than baseball: “How many wins is strong?” does not stand alone. You need both the absolute value and the distribution around it.

Baseball gives every club the same 143-game frame, so win totals are relatively easy to compare. Even then, the meaning of the same total changes with the league distribution.

**An absolute value describes the team; a distribution describes its position.**

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

The most practical lesson from the 77-win puzzle is simpler than memorizing every formula: when a metric appears, ask whether it can move even if we do nothing.

KPIを見るときも同じである。

Market share moves when competitors move.

Search rank moves when other sites move.

Percentile moves when the reference group moves.

Achievement rate changes with the target and the deadline.

Magic number moves with the remaining schedule and the rival's results.

**Along with “What does this number measure?”, ask “Whose behavior can move it?”**

That one extra question makes a metric much harder to misread.

## 9. Same 77 wins. Different world.

At first, return to the original puzzle.

Hanshin: 77–59, magic number 1.

Seibu: 77–60, 13.5 games behind the leader.

At first, the table looks almost broken. With the same number of wins, you expect the two teams to occupy more similar positions.

But the numbers were not broken at all. They were being unusually honest.

Hanshin's 77 wins lived in a league where no team had built a much larger win total.

Seibu's 77 lived next to a SoftBank team already at 91 wins.

Then, on October 2, neither Hanshin nor Seibu played, yet the surrounding results moved both displayed numbers.

Before looking into it, the question was simply: “How can the same 77 wins mean such different things?”

After looking into it, the question changes.

**Why did we expect one isolated number—77 wins—to tell us the team's position as well?**

Numbers do not speak alone.

Especially in a standings table, a number only gains its full meaning through its relation to the teams beside it.

Same 77 wins.

Different world.

## Sources

- [NPB, 2026 Regular Season](https://npb.jp/games/2026/)
- [NPB, Central League standings](https://npb.jp/bis/2026/stats/std_c.html)
- [NPB, Pacific League](https://npb.jp/pl/)
- [Nikkan Sports, Hanshin magic-number scenario, Oct. 2, 2026](https://www.nikkansports.com/baseball/news/202610020000813.html)
- [Mainichi Shimbun, Hanshin moves to magic number 1, Oct. 2, 2026](https://mainichi.jp/graphs/20261002/mpj/00m/050/160000f)
- [Nikkan Sports, Lotte vs. SoftBank result, Oct. 2, 2026](https://www.nikkansports.com/baseball/professional/team/marines/)
