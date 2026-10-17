---
id: blank-cell-right-not-to-decide
title: "空欄は「何もない」とは言っていない――A Blank Is Not a Zero"
subtitle: "Missing answers, decision rights, and the people outside the average"
created: "2026-10-17"
updated: "2026-10-17"
type: "随筆・リサーチエッセイ"
status: "完成"
tags: ["空欄", "未回答", "保留", "データ", "意思決定", "記録", "随筆"]
keywords: ["missing values", "NULL", "Excel AVERAGE", "nonresponse", "data quality", "uncertainty", "decision rights"]
grow: 5
originId: "meaning-and-letting-pass-two-spoons"
relation: "sequel"
abstract: "One blank cell can change an average by 13.3 points. 表計算・データベース・国勢調査の一次資料から、missing dataはゼロではないと確かめる。The larger question is who gets to decide what someone else's silence means."
---

# 空欄は「何もない」とは言っていない
## How One Blank Cell Changes an Average—and Who Gets Counted

Fill in one blank cell, and the average score drops by more than thirteen points. Nobody invented a false number. Someone simply entered **zero**. 数字を正確にしたつもりで結果が変わる。A blank cell looks passive, but the rules around it quietly shape the result.

Consider a hypothetical experiment. Three people are asked to rate their satisfaction on a scale from 0 to 100. Two answer **80** and **0**. The third does not answer. マイクロソフトの表計算ソフト「エクセル（Excel）」で平均を計算すると、答えは40点になる。According to [Microsoft's documentation](https://support.microsoft.com/ja-jp/excel/functions/average-function), the **AVERAGE** function ignores empty cells but includes numerical zeros. Replace the blank with zero, and the average becomes about **26.7**—a difference of **13.3 points**. But did the third person mean “zero satisfaction,” or were they never asked? 表を見るだけでは分からない。**A missing answer and a zero answer are not interchangeable facts.**

The deeper problem is that absence does not explain itself. In a database system called **PostgreSQL（ポストグレスキューエル）**, a missing or unknown value can be represented by **NULL（ヌル）**. Compare an unknown value using ordinary equality, and the result is not simply true or false; it is unknown ([official documentation](https://www.postgresql.org/docs/current/functions-comparison.html)). 何も分からないからといって、何もなかったとは言えない。ただし、NULL alone cannot tell you *why* the value is missing—whether the question was not asked, the person declined, or the field was inapplicable. **Recording uncertainty is possible; understanding its cause requires more information.**

Now the question becomes less technical and more social: **Whose answers make it into the average?** The [US Census Bureau](https://www.census.gov/programs-surveys/acs/methodology/sample-size-and-data-quality/item-allocation-rates-definitions.html) calls a missing response to a particular survey question **item nonresponse（項目無回答）**. It documents methods for handling and reporting such missing data because respondents and nonrespondents may differ in ways that bias the result. 三人目は偶然答えなかったのか。それとも、強い不満があって答えなかったのか。We cannot know from the empty cell. But excluding that person allows the remaining answers to stand in for the group. **Silence is not merely absent from the calculation; it can change whom the calculation represents.**

Take something much smaller than a national survey: a meeting invitation with only two buttons, “Attending” and “Not attending.” まだ予定を確認できない人には、正しい選択肢がない。Leave the form blank, and you might get a reminder. Click “Not attending,” and the matter is settled—but inaccurately. The person's uncertainty has not disappeared. The form has merely refused to recognize it. 「決められない」は、ときに性格の問題ではなく、決めるための時間を用意しない仕組みの問題である。**An interface can force a decision before life has supplied an answer.**

That does not mean all decisions should remain open forever. Organizers need accurate headcounts. In medicine and safety-critical work, unknown information may require urgent follow-up. だから空欄そのものを称賛しても仕方がない。A better design might distinguish **not yet checked, not applicable, declined to answer, and confirmed zero**, then specify who should act and when. これは研究で効果が証明された万能手法ではなく、出典を踏まえた筆者の提案だ。**To make responsibility for decisions visible, we also need to make responsibility for uncertainty visible.**

I used to think that keeping a record meant writing something down. だが空欄を調べているうち、記録には別の責任があると気づいた。Not to invent someone else's answer. Not to hide the person without a recorded answer behind those who responded. Not to turn a temporary uncertainty into a permanent absence. 平均が十三点以上も動いたのは、空欄に不思議な力があるからではない。It happened because we had already chosen how to count another person's silence. **The freedom to leave a field blank may be less about avoiding a decision than about not having a decision made for you.**
