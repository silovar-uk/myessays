---
id: urawa-2026-27-defensive-funnel-three-paradoxes
title: "奪えているのに、守れない――浦和レッズ2026/27の守備を5段階に分解する"
subtitle: "English Mix｜Ball-winning is 4th, KAGI is 18th: tracing where the defensive funnel leaks"
created: "2026-09-19"
updated: "2026-09-19"
type: "English Mix"
status: "完成"
mode: "english-mix"\nenglish_ratio: 0.4\nmix_unit: "sentence"\ntags: ["浦和レッズ", "J1", "サッカー", "Data Analysis", "xG", "KAGI", "Defence"]
keywords: ["Urawa Reds", "2026/27 J1 League", "xG", "xGA", "KAGI", "AGI", "被枠内シュート", "奪取CBP", "西川周作"]
grow: 5
abstract: "J1第7節終了時点の浦和をdata-firstで読むEnglish Mix。Ball-winning CBP 4th but KAGI 18th、xGA約10.5 but 17 goals conceded、全試合で相手より多くsprintしている、という3つのparadoxを、defensive funnelの5段階へ分解して検証する。"
---

# 奪えているのに、守れない――浦和レッズ2026/27の守備を5段階に分解する

## English Mix｜リーグ4位の奪取と18位のKAGI。The numbers do not fail in one direction

If a team is bad defensively, I expect the numbers to fail in a fairly straightforward way.

They lose territory, concede shots, allow clear chances, then concede goals. Usually, the arrows point in roughly the same direction.

2026/27の浦和レッズは、that sequence is strangely twisted.Football LABでは奪取CBPがリーグ4位。一方、「相手を自陣ゴールへ近づけなかったか」を見るKAGIは18位。Jリーグ公式では被枠内シュートが43本でリーグ2番目に多い。それでもFootball LABの被ゴール期待値は1試合1.506で、7試合換算なら約10.5点。実際の失点は17点である。

> **奪えているのに、遠ざけられない。シュート前の期待値ほどには壊れていないのに、ゴールだけが大量に入る。**

If we compress this into「守備が悪い」, we lose the most informative part of the problem.

本稿では、2026年9月13日のJ1第7節・岡山戦終了時点を対象に、match reportsや評論を根拠から外し、Jリーグ公式、Football LAB、FotMobのquantitative dataだけで浦和の現在地を読む。目的は敗戦理由を後付けすることではない。**守備をいくつかの工程に分け、どの工程までは機能し、どこから数字が崩れているのかを特定すること**である。

Source: https://www.football-lab.jp/uraw  
Source: https://www.jleague.jp/j1/stats/club/2026-27/suffer_shoot_on_target/search-list/

## 1. FACT｜浦和は「攻撃できないチーム」ではない

After seven league matches: 3 wins, 4 losses, 13 scored, 17 conceded.失点は1試合平均2.4でリーグ最多だが、攻撃側の数字はかなり違う景色を見せる。

- シュート：14.4本／試合、リーグ6位
- チャンス構築率：12.7%、リーグ7位
- AGI：53.2、リーグ8位
- ボール保持率：52.3%、リーグ8位
- xG：1.440／試合
- オウンゴールを除く実得点：1.57／試合

The gap between Football LAB xG and actual non-own-goal scoring is only +0.13 per match.つまり13得点という見た目には2つのオウンゴールが含まれるが、それを除けば「異常な決定力で数字を盛っている」というほどではない。シュートを一定量つくり、期待値に近い得点へ変えている。

On the defensive side, Urawa allow 14.1 shots per match, ranked 13th.悪いが、リーグで圧倒的に多いわけではない。にもかかわらず被ゴールは2.4／試合で20位、相手のシュート成功率は17.2%で20位になる。

This gives us the first useful distinction.

> **浦和の問題は「何もできていない」ことではない。攻撃量を出し、ボールも奪っている一方で、守備のどこかに成果へ変換されない工程がある。**

Source: https://www.football-lab.jp/uraw  
Source: https://www.jleague.jp/j1/stats/club/2026-27/suffer_shoot_per_game/search-list/

## 2. MODEL｜Defenceを一語で呼ばず、5段階のfunnelに分解する

The word “defence” mixes together winning the ball, stopping progression, preventing shots, lowering shot quality, and goalkeeping.

So, for analysis, I split defence into five stages.これはFootball LABの公式分類ではなく、公開データを読むための整理である。

1. **前進阻止**：相手を自陣ゴールへ近づけない
2. **シュート抑制**：前進された後もシュートまで行かせない
3. **シュート品質抑制**：打たれても低いxGのシュートにする
4. **枠内化抑制**：打たれたシュートを枠内へ飛ばさせない
5. **ゴール阻止**：枠内シュートをGKが止める

Read in this order, Urawa are not simply “bad at defending.” **Performance changes sharply by stage.**

The key is dependency: later stages inherit the failures of earlier ones.GKのセーブ数が多ければ、それはGKが優秀という情報であると同時に、GKまで仕事が流れてきすぎている可能性も示す。タックルや奪取が多ければ、それは積極的な守備の証拠である一方、そもそも守備機会が多い可能性もある。

This decomposition lets us ask **where the process leaks** before asking who is to blame.

## 3. STAGE 1｜Progression preventionでは、浦和はかなり苦しんでいる

Football LABのKAGIは、how far and how long you can keep the opponent away from your own goalを測る指標である。

Urawa’s KAGI is 44.1, 18th in the league. This part is clearly weak.

Yet in the same Football LAB dataset, ball-winning CBP is 625.39, 4th in the league; defensive CBP is 7th.

So both statements are true at once: **4th at winning the ball, 18th at keeping opponents away.**

This is not a contradiction. **Winning the ball and slowing progression are different defensive jobs.**ある攻撃では高い位置で奪えていても、奪えなかった攻撃では一気に深い位置まで運ばれるなら、奪取の評価は高く、KAGIは低くなり得る。

Match-by-match KAGI is 42 vs Gamba, 34 vs Hiroshima, 58 vs Machida, 52 vs Yokohama FM, 36 vs Fukuoka, 42 vs Kashima, and 45 vs Okayama.勝った試合だけ高いわけでも、負けた試合だけ低いわけでもない。7試合しかないため相関を論じるには小さすぎるが、少なくとも「KAGIが低かったからそのまま負けた」という一対一の説明にはならない。

Source: https://www.football-lab.jp/pages/kagi  
Source: https://www.football-lab.jp/uraw  
Source: https://www.football-lab.jp/uraw/match

## 4. TEST｜“They are not running enough” does not fit the current data

When defence breaks down, words like work rate, transition, and running are easy explanations to reach for.だが今季の浦和に関して、少なくとも単純なスプリント不足はデータと合わない。

Football LAB tracking data shows Urawa recorded more sprints than the opponent in **all seven matches**.差は順に+13、+9、+15、+39、+4、+9、+4回。勝敗に関係なく、毎試合相手を上回っている。

Distance differences swing both positive and negative. Neither sprint count nor total distance alone explains 17 goals conceded.

The useful question is not “run more” but **who runs, when, and in which direction**.スプリント数は量を測れるが、そのスプリントが前進阻止、カバー、プレスバック、攻撃参加のどれに使われたかまでは示さない。

The evidence supports a narrower conclusion: “they cannot defend because they run less than opponents” is a weak explanation.

Source: https://www.football-lab.jp/uraw/match

## 5. STAGE 2｜Shot suppression is poor, but not catastrophic

Urawa allow 14.1 shots per match. That is not good, but it is not league-worst territory either.一方、最も多い千葉は18.4本、京都は17.9本、G大阪は16.4本である。

They let opponents reach shots too often, but they are **not the team conceding the most shots**.

That is where the 17 goals conceded starts to feel disproportionate.

Using the rounded rate, 14.1 × 7 gives roughly 99 shots faced.Jリーグ公式の被枠内シュートは43本なので、定義差を無視した概算では、**相手シュートの約43%が枠内へ飛んでいる**ことになる。

Shot volume is lower-mid-table; shots on target conceded are 2nd-most.

守備の異常値は、「打たれた本数」だけではなく、その次の段階で強くなっている。

Source: https://www.jleague.jp/j1/stats/club/2026-27/suffer_shoot_per_game/search-list/  
Source: https://www.jleague.jp/j1/stats/club/2026-27/suffer_shoot_on_target/search-list/

## 6. STAGE 3｜Shot quality makes the story even stranger

Football LAB puts Urawa’s xGA at 1.506 per match.被シュートは14.1本／試合なので、単純に割るとxGA／shotは約0.107になる。

For Urawa’s own attack, 1.440 xG over 14.4 shots gives 0.100 xG per shot.

The two averages are not far apart.

On pre-shot xG alone, we cannot say Urawa are constantly conceding vastly higher-quality shots than they themselves create.相手の1本あたり期待値はやや高いが、その差だけでシュート成功率17.2%までは説明しにくい。

Across seven games, xGA totals about 10.54. Actual goals conceded are 17: a gap of roughly +6.46.Football LABのモデル上、**実際の失点はシュート前の期待値を大きく上回っている**。

Calling the whole gap “bad luck” would be premature.xGは通常、シュート地点や状況など「打つ前」の条件を評価する。シュートが実際にどのコースへ飛んだかは別の情報である。だからこの+6.46点には、偶然だけでなく、打たれる瞬間のプレッシャー、シュートコース、ブロックの入り方、GKが反応しにくい形など、プレシュートxGでは拾いきれない要素が含まれる可能性がある。

From here, we move from facts to hypotheses that need another layer of evidence.

Source: https://www.football-lab.jp/uraw

## 7. STAGE 4｜On-target conversion is the biggest mystery right now

Roughly 43 shots on target out of about 99 shots faced is a striking proportion.

It may not be explained simply by “opponents shoot from better locations.”先ほどのxGA／shotは約0.107で、浦和自身のxG／shot0.100と近いからだ。

The next questions therefore need to be one level more specific.

- シュート地点は同程度でも、相手に十分な時間を与えているのか
- 体を寄せていても、シュートコースを限定できていないのか
- クロスからのシュートで、打点までフリーにしているのか
- ブロックへ入る角度が遅く、GKから見てボールが見えにくいのか
- xGでは同程度でも、実際のシュート精度が一時的に上振れているのか

Public data cannot separate these five possibilities cleanly.

But it can tell us exactly where to look in video.**「失点シーン」だけではなく、枠内へ飛んだ43本を全部見る。** ゴールにならなかったセーブも含め、シュート地点、守備者との距離、体の向き、クロス由来か、GKの視界が確保されていたかを分類する。

Data analysis does not replace video. It reduces the search space from roughly 99 shots to the 43 that reached the target.

## 8. STAGE 5｜Goalkeeping cannot explain all 17 goals either

As of 14 September, J.League data had Shusaku Nishikawa on 24 saves, 2nd in the league.これは「多く止めている」と同時に、「多く止めなければならない状況が来ている」ことも意味する。

FotMob’s 19 September snapshot lists 41 shots faced, 15 conceded, 14.23 xGOT faced, and -0.77 Goals prevented.xGOTは枠内へ飛んだ後のシュート品質を扱う指標なので、このモデルでは15失点に対して「GKが期待値より約0.8点多く失った」という程度になる。

Important caveat: Football LAB xGA and FotMob xGOT come from different models and populations, so they should not be subtracted directly.それでも方向性を見る材料にはなる。

Football LAB has team goals conceded roughly 6.5 above its pre-shot expectation.一方、FotMob上の西川のGoals preventedは-0.77。**少なくとも「GKが約6点分止められていない」と単純化する根拠はない。**

A more coherent hypothesis is that post-shot placement quality has been worse for Urawa than pre-shot xG alone suggests, with part of that burden reaching the goalkeeper.ただし、これを確定するには福井光輝を含むチーム全体のxGOT facedと、各シュートの対応状況が必要である。

Source: https://www.jleague.jp/j1/stats/player/2026-27/save_count/search-list/  
Source: https://www.fotmob.com/players/20993/shusaku-nishikawa

## 9. NEXT TARGET｜Crosses become the first video-review tag

Football LAB classifies 5 of the 17 conceded goals as coming from crosses, the largest category.次が30m未満のパスから4点、スルーパスから2点、セットプレーから2点、こぼれ球から2点となっている。

That number alone does **not** prove cross defence is the root cause.クロスの試行数やリーグ平均との比較がなければ、頻度が高いのか、1本あたりの失点率が高いのかを分けられないからだ。

Combined with the high shots-on-target count, it gives us a reason to tag cross-origin shots first in video review.

The review should not stop at “was the cross allowed?”

1. クロッサーへ寄せられていたか
2. クロス時点でPA内の人数は足りていたか
3. ニア、中央、ファーのどこを空けたか
4. マーク対象とボールを同時に見られていたか
5. クリア後のセカンドボールを回収できたか

“Five goals from crosses” is not a conclusion. It is **the first tag for classifying the 43 shots on target**.

Source: https://www.football-lab.jp/uraw

## 10. ATTACK｜Scorers are distributed, creators are concentrated

The attack contains a different kind of asymmetry.

Goals are spread across Minamino 3, Savio 2, and six players on 1 each.一方、Jリーグ公式のアシストは金子4、渡邊3、瀬古樹1。確認できる8アシストのうち7、87.5%を金子と渡邊の2人が占める。

FotMob points in the same direction: Kaneko has 5 big chances created, Watanabe 4.

So the finishers are distributed, while **the final supply line is highly concentrated**.

この状態は、得点者だけを見ると攻撃の多様性が高く見える一方、チャンス創出者の欠場や封じ込めに対する依存を見落としやすい。今後はアシストだけでなく、ラストパス、xA、チャンスクリエイトのシェアを追う必要がある。

Source: https://www.jleague.jp/j1/stats/player/2026-27/assist/search-list/  
Source: https://www.fotmob.com/leagues/223/stats/season/37300/players/big_chance_created/team/6244/urawa-red-diamonds-loanteams-players

## 11. ATTACK｜Scoring patterns may currently rely more on conversion than volume

Football LAB classifies 4 goals from set plays, 4 from crosses, and 3 from rebounds.合計11点で84.6%になる。

Yet Urawa rank only 16th for crosses per match and 15th for corners.少なくとも「クロスやCKを大量投入して得点数を積み上げている」チームではない。

One possibility is that current scoring is being helped by **high conversion in a few specific phases**.

But the goal-pattern table and xG section handle own goals differently.xG欄の実得点1.57はオウンゴールを除外している一方、パターン表は13得点を分類している。したがって、11／13という比率をxGと直接つないで「再現性が低い」と断定するのは避ける。

For now, the defensible claim is only that scoring routes are concentrated in set plays, crosses, and rebounds; sustainability needs more matches.

Source: https://www.football-lab.jp/uraw

## 12. FORMATION｜Three at the back reduced goals conceded, but KAGI barely moved

Football LAB’s starting-shape split has 4-1-2-3 at 11 scored, 15 conceded across five matches; 3-4-2-1 at 2 scored, 2 conceded across two.3-4-2-1は鹿島戦と岡山戦に当たり、結果だけを見ると失点は1試合平均3.0から1.0へ減った。

Other numbers stop us from declaring a simple “three at the back fixed the defence.”

KAGI was 42 and 45 in those two matches, averaging 43.5; the previous five averaged 44.4. Territory prevention barely changed.

Urawa’s own shot volume fell from 16.0 per match over the first five to 10.5 over the two 3-4-2-1 matches.

In this tiny sample, **goals conceded fell, KAGI did not improve, and attacking volume also fell**.

これは3バックの効果を否定する話ではない。サンプルが2試合しかなく、相手も異なる。現時点で言えるのは、「守備安定」と「攻撃量低下」が同時に起きているため、フォーメーション変更の評価にはあと数試合必要、ということまでである。

Source: https://www.football-lab.jp/uraw/formation?year=2026  
Source: https://www.football-lab.jp/uraw/match

## 13. STYLE｜Possession is similar, but each attack may be becoming shorter

2026特別シーズンの浦和は、Football LABでパス481.8本／試合、保持率はJリーグ公式で上位、Football LABではシュート13.8本、得点1.3。2026/27はパス428.6本、保持率52.3%、シュート14.4本、オウンゴールを除く得点1.6となっている。

Possession has not collapsed, yet pass volume is down by about 11%.

This season Urawa are also 5th in dribbles per match, 2nd in offsides, and 8th in AGI.これらを合わせると、**ボールを長く循環させるより、一回の保持から前進、勝負、シュートへ移るまでが短くなっている可能性**がある。

To call this definitively “more vertical,” we would still need progressive-pass data, possession duration, and time from regain to shot.現時点では、保持率とパス数の乖離から立てる仮説として扱う。

Source: https://www.football-lab.jp/uraw?year=100  
Source: https://www.football-lab.jp/uraw  
Source: https://www.jleague.jp/j1/stats/club/2026/

## 14. SYNTHESIS｜The funnel leaks most at the front and near the end

Return to the five-stage funnel.

- **前進阻止**：KAGI18位。明確に弱い
- **シュート抑制**：被シュート14.1本、13位。悪いが最悪ではない
- **シュート品質抑制**：xGA／shot約0.107。自軍xG／shot0.100と大差なし
- **枠内化抑制**：被枠内43本、リーグ2位。大きな問題
- **ゴール阻止**：西川のFotMob Goals preventedは-0.77。GKだけで全差分は説明しにくい

This shape is the important part.

Normally the chain would be smooth: allow progression → concede better locations → higher xG → more goals.しかし浦和は、前進阻止は悪いのに、1本あたりxGAはそこまで極端ではない。そしてその次、**枠内へ飛ぶ段階で数字が急に悪化する**。

That discontinuity is the biggest research target in the current data.

> **浦和は「シュートを打たれる前」だけでなく、「シュートを打たせる瞬間」の守備を調べる必要がある。**

Not simply whether pressure exists, but whether the pressure actually reduces shooting precision.人数がいるかではなく、GKが守りやすいコースへ限定できているか。次に欲しいのは、シュートプレッシャー、ブロック距離、xGOT、ショットマップを同じシュート単位で結んだデータである。

## 15. PROPOSAL｜Track these six process metrics over the next five matches

From here, this is a proposal: not to ignore results, but to track indicators that move before the final score does.

1. **KAGI**：相手の前進そのものを遅らせられたか
2. **被シュート数**：前進された後、最後の一線で止められたか
3. **xGA／shot**：打たれたシュートの平均品質を下げられたか
4. **被枠内率**：シュート精度を守備で落とせたか
5. **xGOT faced－失点**：GKが枠内シュートに対してどれだけ上振れ／下振れしたか
6. **自軍シュート－被シュート、または枠内差**：守備改善と引き換えに攻撃を失っていないか

If possible, calculate the same metrics for **0-0 game states only** rather than only full-match averages.リードすると守り、ビハインドになると攻めるというスコア効果を減らし、「試合がまだ傾いていない状態の浦和」を見るためである。

The second extension is opponent adjustment.鹿島相手のxGA1.2と、普段ほとんどチャンスを作れない相手へのxGA1.2を同じ評価にしない。相手の通常値を100として、浦和戦で何%まで抑えたかを見るOpponent Adjusted Indexを作れば、日程強度の影響を少し切り離せる。

I would resist compressing this into one defensive score. Keep the five-stage funnel visible.どこが改善し、どこが残っているかを消さないためである。

## 16. DISCOVERY｜Go back to video, but watch 43 shots on target—not only 17 goals

Before doing this, 17 goals conceded looked like enough information to say “the defence is bad.”

After the analysis, 17 feels almost too coarse.

奪取は多い。スプリントでも負けていない。相手を深くまで運ばせている。シュートもやや多く打たれている。ただし1本あたりのxGAは異常に高いわけではない。それでも枠内へ飛ぶ割合と実失点が大きい。

So the next video session should not be a goals-conceded compilation.

**43本の被枠内シュート全部である。**

Tag those 43 shots by cross, central pass, set play, pressure distance, goalkeeper sightline, block angle, and second ball.もし同じ失敗が繰り返されていれば、17失点という結果から一段手前の原因へ戻れる。逆に共通項がなければ、序盤7試合の大きな上振れだった可能性も残る。

Data does not replace watching football.

むしろデータを使うと、**どの43本を見るべきかが分かる。**

The opening paradox—“they win the ball, yet they cannot defend”—is now more specific than it was before the research.浦和は守備をしていないのではない。いくつもの守備行為をしている。その成果が、前進阻止とシュートの枠内化という別々の場所で漏れている可能性がある。

Next time I watch Urawa, the question is no longer simply “was the defending good?”

**どの段階で、今日は漏れなかったか。**

That is a much more useful question for following this version of Urawa.

## Sources

- Football LAB「浦和レッズ 2026/27 シーズンサマリー」  
  https://www.football-lab.jp/uraw
- Football LAB「浦和レッズ 2026/27 日程・結果・試合比較」  
  https://www.football-lab.jp/uraw/match
- Football LAB「浦和レッズ 2026/27 フォーメーション」  
  https://www.football-lab.jp/uraw/formation?year=2026
- Football LAB「KAGI,AGIとは」  
  https://www.football-lab.jp/pages/kagi
- Football LAB「浦和レッズ 2026特別 シーズンサマリー」  
  https://www.football-lab.jp/uraw?year=100
- Jリーグ公式「2026/27 1試合平均被シュート数」  
  https://www.jleague.jp/j1/stats/club/2026-27/suffer_shoot_per_game/search-list/
- Jリーグ公式「2026/27 被枠内シュート総数」  
  https://www.jleague.jp/j1/stats/club/2026-27/suffer_shoot_on_target/search-list/
- Jリーグ公式「2026/27 アシスト総数」  
  https://www.jleague.jp/j1/stats/player/2026-27/assist/search-list/
- Jリーグ公式「2026/27 セーブ総数」  
  https://www.jleague.jp/j1/stats/player/2026-27/save_count/search-list/
- Jリーグ公式「2026特別 クラブスタッツ」  
  https://www.jleague.jp/j1/stats/club/2026/
- FotMob「Shusaku Nishikawa」  
  https://www.fotmob.com/players/20993/shusaku-nishikawa
- FotMob「Urawa Red Diamonds - Big chances created」  
  https://www.fotmob.com/leagues/223/stats/season/37300/players/big_chance_created/team/6244/urawa-red-diamonds-loanteams-players
