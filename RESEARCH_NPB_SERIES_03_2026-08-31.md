# NPB学習シリーズ 第3回 Research / Metric Audit Note

Updated: 2026-08-31
Article ID: `npb-2026-baseball-metrics-avg-ops-war`
Series: `野球という産業を読む`
Classification: `Hybrid`

## 1. 今回の問い

**「良い選手」を、私たちは何の数字で見ればいいのか？**

第3回の目的は指標名を増やすことではない。

読了後に、初心者が成績表を見ながら、

1. この数字は何を見ているか
2. この数字は何を見落としているか
3. 別の数字を足すと何が補えるか

を考えられる状態を目指す。

## 2. Information policy

### Article class

Hybrid。

- 指標の定義・基本的な考え方はCore。
- 2026年選手の具体例はPulse。

### Data snapshot

選手例の情報基準日は**2026年8月30日終了時点**。

第1回・第2回と同じsnapshotに固定し、基礎3記事の中で数字がずれないようにした。

指標の定義・計算上の注意点は2026年8月31日に再確認。

## 3. Research facts — batter metrics

### Batting Average / AVG

- 安打数 ÷ 打数。
- 安打になる頻度を見る。
- 四球・死球は打率を上げない。
- 単打と二塁打・三塁打・本塁打を同じ1安打として数える。

Source:
- https://www.mlb.com/glossary/standard-stats/batting-average

### On-base Percentage / OBP

- 打席のうち、安打・四球・死球などで塁へ出た頻度を見る。
- MLB glossaryの標準式は `(H + BB + HBP) / (AB + BB + HBP + SF)`。
- sacrifice buntは分母から除かれる。
- 「安打を打つ」と「アウトにならず塁へ出る」を分ける教材として有効。

Source:
- https://www.mlb.com/glossary/standard-stats/on-base-percentage

### Slugging Percentage / SLG

- 塁打数 ÷ 打数。
- 単打=1、二塁打=2、三塁打=3、本塁打=4として扱う。
- 打率と違い、安打の種類を区別する。
- 四球・死球は含まない。

Source:
- https://www.mlb.com/glossary/standard-stats/slugging-percentage

### OPS

- OBP + SLG。
- 出塁と長打を一つの数字へまとめる簡便な打撃指標。
- 球場・リーグ環境を自動補正する指標ではない。
- OBPとSLGを単純加算するため、総合評価の「答え」ではなくquick summaryとして扱う。

Sources:
- https://www.mlb.com/glossary/standard-stats/on-base-plus-slugging
- https://www.mlb.com/glossary/advanced-stats/on-base-plus-slugging-plus

### HR / RBI / SB

- HR / RBI / SBはいずれもcounting statとして直感的で重要。
- RBIは走者がいる打席など得点機会の量にも左右されるため、打者個人の能力全体とは分けて扱う。
- SBは成功数だけでなくCaught Stealingも確認した方が走者の効率を読みやすい。
- SB% = SB / attempts。

Source:
- https://www.mlb.com/glossary/standard-stats/stolen-base-percentage

## 4. Research facts — pitcher metrics

### ERA

- 9イニングあたりの自責点。
- `9 × ER / IP`。
- run preventionという投手の結果に近い。
- 守備・打球結果等の影響を完全に分離する指標ではない。

Source:
- https://www.mlb.com/glossary/standard-stats/earned-run-average

### WHIP

- `(BB + H) / IP`。
- 1イニングあたり、四球・被安打で何人の走者を出したかを見る。
- 本塁打と単打を同じ1被安打として数える。
- HBPは含まれない。

Source:
- https://www.mlb.com/glossary/standard-stats/walks-and-hits-per-inning-pitched

### Strikeouts / K/9

- K/9 = `K / IP × 9`。
- 9イニングあたりの奪三振ペース。
- 打球が発生しないアウトであるため、守備処理の影響から比較的切り離して理解しやすい。
- MLB glossaryはstarter / relieverでK/9の水準が異なりやすいことを明記している。

Source:
- https://www.mlb.com/glossary/advanced-stats/strikeouts-per-nine-innings

## 5. WAR Research

### Core concept

WAR = Wins Above Replacement。

「代替可能なレベルの選手」と比べて、その選手がチームへどれだけ勝利を上積みしたかを推定する考え方。

Position playerでは一般に、

- batting
- base running
- fielding
- positional adjustment
- league adjustment
- replacement level

などを共通単位へ変換して統合する。

### Critical caveat

WARは一つの唯一公式ではない。

- FanGraphs = fWAR
- Baseball-Reference = bWAR / rWAR
- Baseball Prospectus = WARP

などがあり、frameworkは近いが入力・計算方法が一部異なる。

FanGraphs自身もWARを精密な小数点ランキングではなく、推定値・reference pointとして使うよう説明している。

Sources:
- https://www.mlb.com/glossary/advanced-stats/wins-above-replacement
- https://library.fangraphs.com/misc/war/
- https://library.fangraphs.com/war/differences-fwar-rwar/

### Editorial decision for NPB

第3回ではNPB選手の具体的なWAR値やWARランキングを掲載しない。

理由：

1. 初心者の主目的は数値暗記ではなく「なぜ総合指標が欲しくなるか」の理解。
2. WARのprovider差を無視したランキングを作ると、シリーズのFact / Definition policyに反する。
3. 第2回の小園海斗・周東佑京を使えば、守備位置・走塁まで含めたくなる理由を具体的に説明できる。

## 6. Episode 2 snapshot facts reused

第2回Research Noteから再利用。新規の選手名を増やさない。

- 近藤健介：打率.306、出塁率.425、25本塁打、92打点。
- 佐藤輝明：30本塁打、84打点。
- 周東佑京：27盗塁。
- 村上頌樹：防御率1.84。
- 才木浩人：155奪三振。
- 小園海斗：遊撃手の例。
- 伊藤大海：pitcher winsと個人performanceを分ける例。
- ライデル・マルティネス：starter / reliever比較の注意例。

Primary current-stat sources:
- https://npb.jp/bis/2026/stats/bat_c.html
- https://npb.jp/bis/2026/stats/bat_p.html
- https://npb.jp/bis/2026/stats/pit_c.html
- https://npb.jp/bis/2026/stats/pit_p.html

Snapshot provenance:
- `RESEARCH_NPB_SERIES_02_2026-08-31.md`

## 7. NPB official data observation

NPBの2026年度個人打撃成績表には、打率に加えて長打率・出塁率などが掲載されている。

個人投手成績には防御率、投球回、安打、四球、三振、自責点等が掲載されている。

本文ではNPBを2026年選手例の一次情報、MLB glossaryを指標定義の説明ソースとして役割分担する。

Sources:
- https://npb.jp/bis/2026/stats/bat_c.html
- https://npb.jp/bis/2026/stats/bat_p.html
- https://npb.jp/bis/2026/stats/pit_c.html
- https://npb.jp/bis/2026/stats/pit_p.html

## 8. Candidate metrics — deliberately deferred

以下は重要だが第3回では詳説しない。

- OPS+ — park / league adjustmentの入口になるが、OPS理解前に入れると枝分かれする。
- wOBA / wRC+ — offensive valueの精緻化として有用だが、初心者のinformation budgetを超える。
- BABIP — 打球結果と揺れを考える入口だが投手編が重くなる。
- FIP — pitcher WARや守備独立評価へつながるが、第3回ではKの役割までに止める。
- K% / BB% — K/9より打者数ベースで比較しやすいが、今回はNPB成績表との接続を優先。
- OPS+ / ERA+ —環境補正の考え方はLimitsで触れるだけにする。
- Statcast / x系指標 — MLB固有の計測インフラ説明が必要になるため後続候補。
- Defensive advanced metrics — 小園の「守備位置の価値」をWARへのbridgeとして扱うだけにする。

## 9. Article Design

### Core metaphor

**Metric = lens**

すべての指標を、

- WHAT IT SEES
- WHAT IT MISSES

で読む。

### Learning ladder

1. AVG — hit
2. OBP — avoid outs
3. SLG — quality / size of hits
4. OPS — combine on-base + power
5. HR / RBI / SB — count actual events, check opportunities / failures
6. ERA — run prevention result
7. WHIP — traffic on bases
8. K / K9 — pitcher-created outs
9. WAR — combine different types of value
10. Context — role / position / opportunity / environment / sample

### Reuse design

Episode 2 players only:

- 近藤 → AVG vs OBP
- 佐藤 → POWER / SLG / OPS
- 周東 → SB and limits of SB
- 村上 → ERA
- 才木 → K
- 小園 → position / WAR
- 伊藤 → pitcher wins caveat
- マルティネス → starter vs reliever context

## 10. Fact Check

### PASS

- AVG definition / limitation checked against MLB official glossary.
- OBP definition checked against MLB official glossary.
- SLG definition checked against MLB official glossary.
- OPS equation checked against MLB official glossary.
- ERA definition checked against MLB official glossary.
- WHIP definition and HBP exclusion checked against MLB official glossary.
- K/9 definition and starter/reliever caveat checked against MLB official glossary.
- WAR concept / provider differences checked against MLB official + FanGraphs methodology pages.
- 2026 player snapshot kept consistent with Episode 2 Research Note.

### Wording controls

- Do not say WAR is “the true value”.
- Do not say strikeouts are always superior to balls in play.
- Do not say RBI is useless; say it is opportunity-dependent.
- Do not say SB alone equals baserunning value.
- Do not compare starter / reliever K/9 without role context.
- Do not mix provider-specific WAR values.

## 11. Beginner Check

### Keep

- AVG as first anchor.
- One reason each next metric is needed.
- Simple formulas only where they reduce confusion.
- Episode 2 players as retrieval cues.
- 30-second reading routine at the end.

### Avoid

- metric dictionary tone.
- sabermetrics history.
- league-average benchmark memorization.
- many new acronyms.
- current leaderboard ranking.
- calculation exercises.

Success condition:

**「打率が低いから悪い」「ERAだけ低ければ絶対に最高」のような一指標判断から離れ、2〜3個のレンズ＋文脈で見られること。**

## 12. Update checklist

When updating this Hybrid article:

- [ ] 基準日を更新するか、historical snapshotとして固定するか決める。
- [ ] 近藤のAVG / OBP。
- [ ] 佐藤のHR。
- [ ] 周東のSB。
- [ ] 村上のERA。
- [ ] 才木のK。
- [ ] NPBの球団・所属変更。
- [ ] MLB glossary URL / definitionsに大きな変更がないか。
- [ ] WAR methodology pageの説明が変わっていないか。
- [ ] Episode 2との数字の整合性。

## 13. Sources

NPB:
- https://npb.jp/bis/2026/stats/bat_c.html
- https://npb.jp/bis/2026/stats/bat_p.html
- https://npb.jp/bis/2026/stats/pit_c.html
- https://npb.jp/bis/2026/stats/pit_p.html

MLB Glossary:
- https://www.mlb.com/glossary/standard-stats/batting-average
- https://www.mlb.com/glossary/standard-stats/on-base-percentage
- https://www.mlb.com/glossary/standard-stats/slugging-percentage
- https://www.mlb.com/glossary/standard-stats/on-base-plus-slugging
- https://www.mlb.com/glossary/standard-stats/stolen-base-percentage
- https://www.mlb.com/glossary/standard-stats/earned-run-average
- https://www.mlb.com/glossary/standard-stats/walks-and-hits-per-inning-pitched
- https://www.mlb.com/glossary/advanced-stats/strikeouts-per-nine-innings
- https://www.mlb.com/glossary/advanced-stats/wins-above-replacement

WAR methodology:
- https://library.fangraphs.com/misc/war/
- https://library.fangraphs.com/war/differences-fwar-rwar/
