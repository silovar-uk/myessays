---
id: npb-2026-baseball-metrics-avg-ops-war
title: "野球の数字を読む — 打率からOPS、WARへ"
subtitle: "数字を順位表ではなく、選手の価値を分解するレンズとして読む"
created: "2026-08-31"
updated: "2026-08-31"
type: "Research Guide"
status: "完成"
tags: ["野球", "NPB", "プロ野球", "野球指標", "セイバーメトリクス", "2026"]
keywords: ["NPB", "batting average", "OBP", "SLG", "OPS", "ERA", "WHIP", "K/9", "WAR", "baseball metrics"]
favorite: 5
grow: 5
series: "野球という産業を読む"
seriesOrder: 3
abstract: "『良い選手』を何の数字で見ればいいのか。第3回では、打率、出塁率、長打率、OPS、防御率、WHIP、奪三振、WARを、ランキングではなく『何が見えて、何が見えないか』というレンズとして整理する。第2回で登場した佐藤輝明、近藤健介、周東佑京、村上頌樹、才木浩人らを再利用し、一つの数字で選手を決めつけず、役割と文脈を重ねて読むための基礎を作る。"
---

# 野球の数字を読む — 打率からOPS、WARへ
## 数字を順位表ではなく、選手の価値を分解するレンズとして読む

第2回では、選手を「有名かどうか」ではなく、POWER、ON-BASE、SPEED、STARTER、CLOSERのような**役割**で見た。

すると、次の疑問が出てくる。

**「この選手はすごい」と言うとき、何の数字を見ればいいのか？**

打率なのか。本塁打なのか。防御率なのか。それともOPSやWARなのか。

先に答えると、**一つに決めなくていい。**

野球の指標は「選手の価値そのもの」ではなく、価値の一部分を見るためのレンズである。

> **情報基準日：2026年8月30日終了時点**
>
> 選手の2026年成績例は第1回・第2回と同じ基準日にそろえた。指標の定義・計算上の注意点は2026年8月31日に再確認している。

## 1. SHORT ANSWER — 数字は「答え」ではなく「質問」

<!-- level:4 role:claim -->
一つの指標だけで「誰が一番良い選手か」を決めようとすると、その数字が何を測っているかを見失いやすい。
<!-- level:1 role:evidence -->
第2回で見た近藤健介は、2026年8月30日時点で打率.306に対して出塁率.425だった。同じ打席を見ても、安打だけを見るか、四球なども含めて「アウトにならず塁へ出たか」を見るかで数字は変わる。
<!-- level:3 role:analysis -->
つまり指標の違いは、計算方法の違いであると同時に「野球のどの価値を重要だとみなすか」という視点の違いでもある。
<!-- level:5 role:implication -->
成績表を読む力とは指標名を暗記することではなく、「この数字は何を見て、何を見落としているか」を問い返せることである。

今回は、この順番でレンズを増やす。

**安打 → 出塁 → 長打 → 打撃全体 → 走塁 → 失点阻止 → 走者を出さない → 三振 → 総合価値**

全部を完璧に覚える必要はない。

まず「なぜ次の数字が必要になったのか」をつかめばいい。

## 2. 打率 AVG — まず「ヒットになったか」を見る

打率（AVG）は、**安打数 ÷ 打数**。

最も直感的な打撃指標の一つである。

10打数3安打なら打率.300。初心者でも試合を見ながら意味を想像しやすい。

**見えるもの：** 安打になる頻度。  
**見えにくいもの：** 四球・死球、単打と本塁打の違い、走塁や守備。

ここが最初の重要ポイントである。

打率では、単打も本塁打も「1安打」である。また、四球で一塁へ出ても打率は上がらない。

だから打率は大事だが、**打率だけでは攻撃全体を説明できない。**

[MLB Glossary: Batting Average](https://www.mlb.com/glossary/standard-stats/batting-average)

## 3. 出塁率 OBP — 「アウトにならない」を見る

そこで次に見るのが出塁率（OBP）である。

出塁率は、安打だけでなく**四球や死球でも塁へ出たこと**を評価する。

第2回で近藤健介をON-BASEの入口にした理由がここでつながる。

2026年8月30日時点では、近藤の打率は.306、出塁率は.425だった。

この差を見ると、「ヒットを打つ」と「アウトにならず攻撃を続ける」は同じではないと分かる。

**見えるもの：** 打席でアウトにならず塁へ出る力。  
**見えにくいもの：** 一塁打と本塁打の価値の差、塁に出た後の走塁。

OBPを見るようになると、四球が「何も起きなかった打席」ではなくなる。

[MLB Glossary: On-base Percentage](https://www.mlb.com/glossary/standard-stats/on-base-percentage)

## 4. 長打率 SLG — ヒットの「大きさ」を見る

打率では、単打も二塁打も本塁打も同じ1安打だった。

長打率（SLG）はそこを変える。

単打を1、二塁打を2、三塁打を3、本塁打を4として**塁打数 ÷ 打数**で計算する。

名前に「率」と付くが、感覚としては「1打数あたり何塁分の安打を生み出したか」に近い。

**見えるもの：** 安打の量だけでなく、どれだけ大きい安打を打ったか。  
**見えにくいもの：** 四球・死球、走塁、守備。

第2回のPOWER選手を見るなら、本塁打数と一緒にSLGを見ると、長打力をもう一段立体的に読める。

[MLB Glossary: Slugging Percentage](https://www.mlb.com/glossary/standard-stats/slugging-percentage)

## 5. OPS — 「塁に出る」と「長く進む」を一度に見る

ここで二つのレンズを重ねる。

**OPS = 出塁率（OBP）＋長打率（SLG）**

やっていることはシンプルである。

- OBPで「どれだけアウトにならず塁へ出たか」を見る。
- SLGで「安打でどれだけ多くの塁を稼いだか」を見る。
- その二つを足して、打撃をざっくり一つの数字で見る。

だから、打率だけより情報量が増える。

一方でOPSも万能ではない。OBPとSLGをそのまま足した指標で、球場やリーグ環境を自動的に補正するわけではない。

**OPSは便利な要約であって、打者の真実そのものではない。**

佐藤輝明のようなPOWER型と、近藤健介のようなON-BASE型を同じ画面で見たいとき、OPSは使いやすい入口になる。

[MLB Glossary: On-base Plus Slugging](https://www.mlb.com/glossary/standard-stats/on-base-plus-slugging)

## 6. 本塁打・打点・盗塁 — 「何回起きたか」も大事。ただし条件を見る

率だけでなく、回数を数える数字もある。

### 本塁打 HR

一振りで得点まで進める、非常に分かりやすい長打の結果である。

ただし、本塁打数だけでは四球や単打、守備などは見えない。

### 打点 RBI

「打者の結果によって何点入ったか」を見る入口になる。

一方で、前の打者がどれだけ塁へ出ていたか、どの打順を打っていたかなど、**得点機会の量**にも左右される。

### 盗塁 SB

第2回の周東佑京のようなSPEEDを見る最も分かりやすい数字である。

ただし成功数だけを見ると、盗塁死を見落とす。さらに、盗塁にならない一塁から三塁への進塁や守備へのプレッシャーも、SBだけでは全部は測れない。

**カウント指標は「実際に何が何回起きたか」を教える。だからこそ、機会数や失敗も一緒に見る。**

[MLB Glossary: Stolen-base Percentage](https://www.mlb.com/glossary/standard-stats/stolen-base-percentage)

## 7. 投手はERA → WHIP → Kでレンズを重ねる

打者と同じように、投手も一つの数字だけでは見え方が変わる。

### 防御率 ERA — どれだけ自責点を防いだか

防御率（ERA）は、**9イニングあたり何点の自責点を許したか**を見る。

第2回の村上頌樹は2026年8月30日時点で防御率1.84。まずは「失点を抑える」という投手の目的に近い結果を見られる。

**見えるもの：** 最終的に自責点をどれだけ抑えたか。  
**見えにくいもの：** 守備の助け、打球の結果の揺れ、投手自身がどの方法でアウトを取ったか。

[MLB Glossary: Earned Run Average](https://www.mlb.com/glossary/standard-stats/earned-run-average)

### WHIP — どれだけ走者を出したか

WHIPは、**（与四球＋被安打）÷ 投球回**。

点が入った後を見るERAに対して、WHIPは「そもそもどれくらい走者を出しているか」を見る。

**見えるもの：** 1イニングあたりの安打・四球による走者の出しにくさ。  
**見えにくいもの：** 単打と本塁打の違い、死球、守備や打球内容の細部。

[MLB Glossary: WHIP](https://www.mlb.com/glossary/standard-stats/walks-and-hits-per-inning-pitched)

### 奪三振 K / K/9 — 守備に渡さずアウトを取ったか

才木浩人は第2回で「自分でアウトを取り切る力」の入口として見た。

三振なら、打球を野手が処理する必要がない。

K/9は、**9イニングあたり何個の三振を奪うペースか**をそろえて見る指標である。

ただし、先発と救援では投げ方や出力配分が違う。短いイニングへ力を集中しやすいリリーフはK/9が高くなりやすいため、マルティネスのようなcloserと先発を数字だけで単純比較しない。

[MLB Glossary: Strikeouts Per Nine Innings](https://www.mlb.com/glossary/advanced-stats/strikeouts-per-nine-innings)

## 8. WAR — 「違う仕事を一つの単位で比べたい」という発想

ここまで来ると、別の問題が出る。

佐藤輝明の長打、近藤健介の出塁、周東佑京の走塁、小園海斗の守備位置。

**仕事が違いすぎて、一つの打撃指標では比べられない。**

そこで登場する考え方がWAR、Wins Above Replacementである。

ざっくり言えば、**その選手が「代替可能なレベルの選手」と比べて、チームへ何勝分ほど上積みしたと推定できるか**を、一つの単位にまとめようとする。

野手なら打撃だけでなく、走塁、守備、守備位置なども組み合わせる。だから「同じ打撃成績でも、どこを守っているかで価値の見え方が変わる」という第2回の小園の話がここで戻ってくる。

ただし、ここが最重要である。

**WARは一つの絶対的な公式ではない。**

FanGraphsのfWAR、Baseball-ReferenceのbWAR / rWARなどは同じ大枠の問いを持つが、使う入力や計算方法が一部異なる。そのため、同じ選手でも値が完全には一致しない。

この記事でNPB選手のWARランキングを載せないのはそのためである。まずは数値を覚えるより、**「打撃・走塁・守備・ポジションなどを共通単位へまとめたい」という発想**を理解する。

[MLB Glossary: Wins Above Replacement](https://www.mlb.com/glossary/advanced-stats/wins-above-replacement)  
[FanGraphs: What is WAR?](https://library.fangraphs.com/misc/war/)  
[FanGraphs: fWAR, rWAR, and WARP](https://library.fangraphs.com/war/differences-fwar-rwar/)

## 9. 同じ選手でも、レンズを替えると見え方が変わる

ここで第2回の選手へ戻る。

### 佐藤輝明 × 近藤健介

- **AVG**を見る：安打になる頻度を見る。
- **OBP**を見る：近藤のように四球も含め「アウトにならない」価値が見えやすくなる。
- **SLG**を見る：佐藤のような長打型の強みが見えやすくなる。
- **OPS**を見る：出塁と長打を同じ入口から見る。

問いは「どちらが本当にすごいか」ではない。

**二人は、どんな方法で攻撃価値を作っているのか。**

### 村上頌樹 × 才木浩人

- **ERA**を見る：失点を抑えた結果を見る。
- **WHIP**を見る：走者をどれだけ出したかを見る。
- **K / K/9**を見る：守備へ渡さず三振でアウトを取った量・ペースを見る。

同じ先発投手でも、強みを説明する数字は一つではない。

第2回で「役割」を覚え、第3回で「その役割を見る数字」をつなげる。ここまで来て、選手名と成績表が初めて一本につながる。

## 10. 数字は答えではない — 文脈を5つ残す

指標が増えると、今度は数字だけで全部説明したくなる。

そこで最後に、数字の横へ5つの文脈を置く。

1. **ROLE** — 先発か救援か、中心打者か代走か。
2. **POSITION** — 捕手・遊撃と一塁・外野では守備上の仕事が違う。
3. **OPPORTUNITY** — 打点、勝利数、セーブなどは機会の量にも左右される。
4. **ENVIRONMENT** — 球場、リーグ、時代によって得点環境は違う。
5. **SAMPLE** — 10打席と500打席を同じ確かさで扱わない。

<!-- level:4 role:claim -->
数字が高度になるほど、文脈が不要になるわけではない。
<!-- level:2 role:description -->
OPSやWARは複数要素をまとめることで便利になる一方、まとめた瞬間に個別の強みや計算上の前提は見えにくくなる。
<!-- level:3 role:analysis -->
だから指標を増やす目的は、一つの万能数字を探すことではなく、違う問いに対して違うレンズを選べるようになることである。
<!-- level:5 role:implication -->
スポーツ産業を分析するときも同じで、観客数、売上、LTV、視聴数などのKPIは「何を測り、何を捨てているか」まで理解して初めて使える。

## 11. 成績表を30秒で読むなら、この3段階

全部の列を左から読む必要はない。

**STEP 1｜役割を決める**  
POWERなのか、ON-BASEなのか、SPEEDなのか、STARTERなのか。

**STEP 2｜2〜3個だけ数字を見る**  
打者ならAVG + OBP + SLG / OPS。投手ならERA + WHIP + K系。

**STEP 3｜その数字が見ていないものを一つ言う**  
「守備は入っていない」「盗塁失敗は別」「リリーフと先発は単純比較できない」など。

これだけで、ランキングを見るだけの成績表から、**選手の価値を分解する成績表**へ変わる。

## 12. Takeaways

1. **指標は選手の価値そのものではなく、価値の一部分を見るレンズである。**
2. 打者はAVG → OBP → SLG / OPS、投手はERA → WHIP → Kとレンズを重ねると、一つの数字の弱点を補える。
3. WARは総合化の強力な発想だが、計算モデルによって値が異なる。最後まで役割・守備位置・機会・環境・サンプルを残す。

## Today's Data English

- **batting average (AVG)** — 打率
- **on-base percentage (OBP)** — 出塁率
- **slugging percentage (SLG)** — 長打率
- **on-base plus slugging (OPS)** — 出塁率＋長打率
- **wins above replacement (WAR)** — 代替可能な水準と比べた総合的な勝利貢献の推定

## Next Question

ここまでの3回で、

- 第1回：**WHERE** — NPBはどんな地図なのか
- 第2回：**WHO** — その地図で誰が、どんな役割を担うのか
- 第3回：**HOW TO MEASURE** — その価値を何の数字で見るのか

まで進んだ。

次は、選手から一段引いて**競技の仕組み**を見る。

**第4回「なぜNPBは12球団・2リーグ・143試合なのか」**

なぜ12なのか。なぜ2リーグなのか。なぜ143試合も戦うのか。

数字を読む目を持ったまま、GAMEからSYSTEMへ視点を上げる。

## Sources

### NPB 2026年度公式戦成績

- [セントラル・リーグ 個人打撃成績](https://npb.jp/bis/2026/stats/bat_c.html)
- [パシフィック・リーグ 個人打撃成績](https://npb.jp/bis/2026/stats/bat_p.html)
- [セントラル・リーグ 個人投手成績](https://npb.jp/bis/2026/stats/pit_c.html)
- [パシフィック・リーグ 個人投手成績](https://npb.jp/bis/2026/stats/pit_p.html)

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
