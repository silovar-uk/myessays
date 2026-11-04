---
id: "collision-home-plate-right-to-block-approval-2026"
title: "捕手は本塁を守る人なのに、なぜ本塁をふさいではいけないのか"
subtitle: "When the right to protect is not the right to block"
created: "2026-11-04"
updated: "2026-11-04"
type: "Essay"
status: "完成"
tags: ["野球","コリジョンルール","制度設計","意思決定","承認業務"]
keywords: ["collision rule","home plate","blocking","deadlock","approval process"]
grow: 5
abstract: "A catcher protects home plate. But that does not mean the catcher can block the runner's path at any time. 日本と米国の規則を起点に、three baseball scenarios と three approval designs を比べる。The surprising question is not simply who has authority, but when that authority may stop someone else."
---

# 捕手は本塁を守る人なのに、なぜ本塁をふさいではいけないのか

*When the right to protect is not the right to block*

A catcher is supposed to protect home plate. なのに、走者の通り道をふさいだら反則になる場合がある。Wait, isn't that the job? 玄関を守る警備員に「入口をふさがないで」と言うような話だ。ただし、捕手が本塁の近くに立つこと自体が禁止されているわけではない。The details matter: **possession of the ball, a legitimate attempt to field a throw, and the runner's pathway.**

最初は simple safety rule だと思っていた。危険な体当たりをなくす。もちろん、それが出発点だ。でも調べるうちに、別の問いが浮かんだ。**Can responsibility for a place justify occupying it before you can actually act?** 守る責任と、そこを先取りする権利は同じなのだろうか。

## 1｜守：Two legitimate goals, one narrow space

まずコリジョンルール（衝突防止規則）の基本。米大リーグは2014年、本塁での危険な衝突を抑える規則を導入した。日本のプロ野球でも2016年に「本塁での衝突プレイ」を導入している。[MLB official explanation](https://www.mlb.com/glossary/rules/collisions-at-home-plate)／[NPB official notice](https://npb.jp/npb/2016rules_2.html)。

The runner wants to score; the catcher wants an out. どちらの目的も legitimate だ。しかし片方には通る道が必要で、もう片方にはその付近でボールを処理する必要がある。Two valid purposes compete for the same small piece of space. そこで体当たりが得点や守備の手段になれば、技術の競争が strength and collision tolerance の競争にも変わる。

米大リーグの説明では、走者が接触を起こすために進路を外れることを禁じ、捕手がボールを持たずに走路をふさぐことも原則認めない。ただし、legitimate attempt to field a throw のために走路へ入る場合は例外となる。The point is not to eliminate every contact. **It is to preserve the kind of contest baseball is meant to be.**

## 2｜The rule stayed, but its interpretation changed

日本で特に面白いのは、導入から数か月で運用が見直されたことだ。2016年7月20日、日本野球機構は7月22日からの新基準を発表した。**The text of the rule did not change.** それでも「明らかな」衝突や妨害を重視する形へ、実際の運用は調整された。[NPB・2016年の運用基準](https://npb.jp/npb/2016rules_2.html)。

捕手は基本的に本塁の前、走者は体当たりをしない、守備者は走路をふさがない。その原則は維持された。一方、a throw may go off course. 捕手が送球を処理するために走路へ入り、接触も避けられなかったなら、同じ規則を機械的には適用しないと説明された。Safety must not erase legitimate fielding.

2026年度の規則改正には、走塁妨害を扱う6.01（h）の付記も登場する。そこでも、ボールを持たずに走路をふさぐ権利について述べられている。ただし this is **not** the same as a 2026 rewrite of the collision provision 6.01（i）. 二つの条項を混ぜないことが大切だ。[NPB・2026 rules revision](https://npb.jp/npb/2026rules.html)。The deeper question becomes: **which necessary actions should a safety rule still allow?**

## 3｜破：Three catchers, three different meanings of blocking

同じように本塁付近に立つ捕手を、三通りに分けてみる。This is a thought experiment, not a replay of three actual umpiring decisions. 走者が迫っているという条件を固定し、ボールの状況だけ変える。

**Case A: no ball, no legitimate fielding need.** 捕手が走路を先にふさいでいる。Being there first does not give a right to obstruct the runner. 典型的な問題となりうる状況だ。

**Case B: ball in hand.** 捕手はボールを持ち、触球を試みている。The location now serves a legitimate defensive action. ただし this is not permission for unnecessary violent contact.

**Case C: an unexpected throw.** 送球がそれ、捕手が捕るために進路へ動いた。Even if the path becomes blocked, the legitimacy of fielding and the avoidability of contact matter. 見た目の位置だけではＡと同じ判断にできない。

同じ肩書、似た場所、それでも rules may treat the actions differently. What changed? **Not ownership of the plate, but what the player can and needs to do at that moment.** 「そこを担当している」ことと「今そこを占有してよい」ことが、初めて別の概念に見えてきた。

## 4｜離：A surprisingly similar problem in computing

ではコンピューターのデータベースへ。Two transactions can wait for each other's locked resources. 処理Ａは資料１を確保したまま資料２を待ち、処理Ｂは資料２を確保したまま資料１を待つ。This is a **deadlock（相互待ちによる行き詰まり状態）**. Nobody can make progress.

米マイクロソフトの技術資料は、preventive practices として、資源にアクセスする順番を揃える、処理を短く保つ、といった方法を挙げる。[Microsoft: Deadlocks Guide](https://learn.microsoft.com/en-us/sql/relational-databases/sql-server-deadlocks-guide)。

A collision is not a database deadlock. 野球の身体的接触と情報処理の停止を同一視はできない。ただ、design question は似ている。When can someone hold a scarce resource, for how long, and under which conditions? 解決策は「もっと協力しよう」という気持ちの問題に限らない。**Changing the conditions of exclusive access can change the conflict itself.**

## 5｜The office version: 「部長確認待ち」

会議室のホワイトボードに「部長確認待ち」「法務確認待ち」「関係部署確認待ち」という付箋がある。Nobody is shouting. Nobody is even disagreeing. なのに仕事は進まない。承認者に判断材料がないことはある。But does everything else have to stop while that person waits for the information?

ここは厳密に分けておきたい。An ordinary approval queue is not automatically a deadlock. そして法令違反や重大な損失を防ぐ事前確認には、止める合理性がある。The proposal is not “remove all approvals.” そうではなく、**does approval authority have to become authority to freeze the whole workflow?** と考える。

例えば広告施策。A legal check may be essential before publication. でも写真候補を整理し、媒体枠を確認し、準備日程を作る作業まで止める必要はない場合がある。一方、違法となりうる表現は確認前に公開してはいけない。The scope of the stop matters more than the job title of the approver. **止めるなら、人単位でなく行為単位。**

## 6｜Three approval designs, with different trade-offs

少しやりすぎて、同じ案件を three hypothetical systems で比較する。実際の会社で測った結果ではなく、判断軸を明確にするための thought experiment だ。

**Design 1: approval before any work.** すべて責任者の確認後に着手する。Unapproved progress is limited, but downstream work also waits. 承認者への仕事の集中も起こる。

**Design 2: block high-risk actions only.** 危険度の高い部分は止め、他は provisional work として進める。準備はできるが、仮案を確定案と誤認しない状態管理が必要だ。

**Design 3: delegate low-risk decisions, audit later.** あらかじめ定義した範囲は担当者が判断し、あとから点検する。Waiting may fall, but boundaries and escalation rules must be clear.

Which is best? 速さだけでは決められない。Measure **waiting time, rework, incidents after publication, and clarity of accountability** together. 早くなって事故が増えれば改善ではない。逆に同じ危険水準のまま待ちを減らせたら、管理を放棄したのではなく、necessary blocking を適切な場所に限定したことになる。

この比較を通ると、「安全か速さか」という対比が少し浅く見える。The better question is **whether the timing and scope of intervention match the actual risk.**

## 7｜The empty lane is doing something

本塁に戻る。The catcher does not own home plate. 捕手には守備の責任があるが、走者の通路をいつでも占有する権利があるわけではない。仕事でも、責任者に決裁権があることと、全工程を止める権限を常に行使することは別だ。

調べる前、私は本塁への道を空ける捕手を「まだ守っていない」と見ていた。Now the empty lane looks different. It preserves the runner's legitimate chance to compete. それは何もしない空白ではなく、試合を試合として成立させるための余地だった。

**A well-designed system defines not only who may use authority, but when authority should remain unused.** 誰かが止まっている職場を見たら、次に問いたいのは「誰の返事が遅いか」だけではない。**Does this path really need to be blocked right now?** その問いから、停止させずに守る設計が始まる。

---

## Research note｜事実・解釈・検証

- **First check:** 2014年の米大リーグ、2016年の日本の導入と運用変更を一次資料で確認。
- **Second check:** 2026年の走塁妨害に関する6.01（h）付記は、衝突規則6.01（i）の改正と混同しない。
- **Thought experiments:** Three catcher cases and three approval designs are analytical comparisons, not measured results.
- **Interpretation:** The parallel between baseball's pathway and organizational approvals is an argument, not an official instruction from baseball authorities.
- **Next test:** Compare waiting time, rework, adverse incidents and decision accountability under different approval scopes.

## Sources｜参考資料

1. [MLB: Collisions at Home Plate](https://www.mlb.com/glossary/rules/collisions-at-home-plate)
2. [NPB: revised operating standards, July 20, 2016](https://npb.jp/npb/2016rules_2.html)
3. [NPB: 2026 rules revision](https://npb.jp/npb/2026rules.html)
4. [Microsoft: Deadlocks Guide](https://learn.microsoft.com/en-us/sql/relational-databases/sql-server-deadlocks-guide)
5. [エリック・ハイヨ（Eric Hayot）, The Elements of Academic Style, chapter 8 “The Uneven U”](https://cup.columbia.edu/book/the-elements-of-academic-style/9780231168007/)
