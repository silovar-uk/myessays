---
id: claude-delegation-horizon-opus-fable
title: "Claudeは「賢さ」で選ばない――仕事の長さから考える「委譲距離」"
subtitle: "Sonnet / Opus / Fableを、固定序列ではなく仕事の長さ・曖昧さ・検証可能性でルーティングする"
created: "2026-08-19"
updated: "2026-08-31"
type: "Research Essay"
status: "完成"
tags: ["AI", "Claude", "Opus", "Fable", "Sonnet", "AIエージェント", "仕事術", "委譲", "Claude Code"]
keywords: ["Claude Opus 5", "Claude Fable 5", "Claude Sonnet 5", "delegation horizon", "agentic work", "model routing", "AI workflow", "Claude Code"]
favorite: 5
grow: 5
abstract: "Claudeのモデル選びを「どれが一番賢いか」で考えるだけでは、実務の費用対効果を捉えにくい。2026年8月31日時点のAnthropic公式情報、Stripeの顧客事例、Simon Willison、Every、CodeRabbitの外部検証を分けて読み、仕事の長さ・曖昧さ・自己検証・人間の確認間隔をまとめる独自の運用概念「委譲距離」を再設計する。Sonnet / Opus / Fableは固定階級ではなく、検証可能性と停止条件を含めて仕事ごとにルーティングすべきだと論じる。"
---

# Claudeは「賢さ」で選ばない――仕事の長さから考える「委譲距離」
## Sonnet / Opus / Fableを、固定序列ではなく仕事の長さ・曖昧さ・検証可能性でルーティングする

### 要旨

ClaudeにはSonnet、Opus、Fableという複数のモデルがある。

モデル比較を見ると、つい「一番強いモデルを使えば、一番よい結果になる」と考えたくなる。

けれど実務で困るのは、もっと別の問いだ。

**この仕事を、どこまで丸ごと渡してよいのか。**

本稿では、その範囲を考えるための独自の運用概念を**委譲距離 / delegation horizon**と呼ぶ。

これはAnthropicの公式分類でも、研究で確立された尺度でもない。複数のモデル・事例・外部検証を、仕事の設計という視点から並べ直すためのheuristicである。

<!-- level:4 role:claim -->
モデル選びでは、単発の正答率だけでなく「どの大きさの仕事を、どのくらい長く、人間の介入なしに渡せるか」を見る必要がある。
<!-- level:2 role:description -->
長い仕事では、調査、設計、実装、検証、修正のような複数フェーズを一つの文脈として保つ必要がある。
<!-- level:3 role:analysis -->
その能力は一問の難問を解く能力とは別であり、同時に、長く任せるほど誤った方向へ進んだときの損失も大きくなる。
<!-- level:5 role:implication -->
だからAI時代のモデル選びは「知能ランキング」より、委譲距離と検証設計を組み合わせる問題になる。

---

## 1. まず現在値を切り離す――価格は「理論」ではなくスナップショット

この記事で最初に分けておきたいのは、長く残る考え方と、すぐ変わる製品情報である。

2026年8月31日時点のAnthropic公式価格は次の通り。

- **Claude Sonnet 5**：入力100万トークンあたり2ドル、出力10ドル
- **Claude Opus 5**：入力5ドル、出力25ドル
- **Claude Fable 5**：入力10ドル、出力50ドル

Sonnet 5については、公開当初「2026年8月31日まで2ドル／10ドル、その後3ドル／15ドル」という予定だった。しかしAnthropicは8月10日に方針を変更し、**2ドル／10ドルを恒久価格にした**。旧版の記事にあった9月1日の値上げ予定は、すでに古い情報である。

また、Fable 5はAnthropicがMythos-classと呼ぶ一般提供モデルで、同じ基盤モデルを異なる安全設定で提供するrestricted-accessのMythos 5とは製品上の扱いが異なる。

<!-- level:2 role:description -->
2026年8月31日時点ではSonnet 5が2ドル／10ドル、Opus 5が5ドル／25ドル、Fable 5が10ドル／50ドルである。
<!-- level:1 role:evidence -->
Sonnet 5の2ドル／10ドルは当初の導入価格だったが、Anthropicは8月10日の更新で9月1日の値上げ予定を取り消し、恒久価格に変更した。
<!-- level:3 role:analysis -->
この変更だけでも、モデル比較記事で価格や提供条件を中心命題にすると、文章の論理まで短期間で陳腐化することが分かる。
<!-- level:5 role:implication -->
製品の現在値は日付入りのスナップショットとして扱い、記事の中心は価格が変わっても残る仕事設計へ置いた方がよい。

---

## 2. Fable 5が変えたのは、一問の難しさより「仕事の長さ」だった

AnthropicはFable 5について、タスクが長く複雑になるほど他のClaudeモデルとの差が大きくなると説明している。また、従来モデルより長く自律して作業できることを主要な特徴として挙げている。

象徴的なのがStripeの事例だ。

Anthropicの発表によれば、Stripeは約5000万行のRubyコードベースでFable 5にコードベース横断のmigrationを実行させ、チームなら手作業で2か月以上と見積もられた仕事を1日で終えたと報告した。

ここでは二つ注意が必要である。

一つ目は、Fableが5000万行をすべて書き換えたわけではないこと。巨大なコードベースを横断する**一つのmigration案件**を処理した事例である。

二つ目は、この「2か月→1日」が独立した第三者benchmarkではなく、**Anthropicが掲載しているStripeのcustomer report**だということだ。

<!-- level:2 role:description -->
AnthropicはFable 5を、長く複雑な仕事で差が広がり、従来のClaudeより長時間自律できるモデルとして位置づけている。
<!-- level:1 role:evidence -->
同社の発表では、Stripeが約5000万行のRubyコードベース上のmigrationをFable 5で1日で実行し、手作業ならチームで2か月以上かかると報告した。
<!-- level:3 role:analysis -->
この事例が示唆するのは一回のコード生成量ではなく、探索、変更箇所の特定、横断修正、途中判断、完了までを一つの仕事として保持する能力である。
<!-- level:5 role:implication -->
ただしベンダー経由の顧客報告と独立検証を分けて読むことで、「長い仕事に強い」という仮説を事例の派手さだけで過大評価せずに済む。

---

## 3. 外部事例でも「複数フェーズをまたぐ」強さは見える

Anthropicの発表だけで判断しないために、外部の利用記録も見る。

Simon Willisonは2026年7月、`sqlite-utils 4.0`の安定版を出す前の最終レビューをFable 5へ任せた。Fableは5件のrelease blockerを指摘し、その後の修正にも深く関与した。Willisonは`4.0rc2`を「mostly written by Claude Fable」と表現し、主セッションとsubagentを合わせたAPI換算費用を**約149.25ドル**と推計している。

EveryのSenior Engineer Benchmarkでは、実運用コードの共同編集システムを第一原理から再設計・実装する課題で、Fable 5が91点、人間のsenior engineerによるreferenceが89点と96点だった。

ただし、この91点を「Fableは人間のsenior engineerと同等」と読むのは強すぎる。Every自身が、最初のpromptとfrozen codebaseは同じでも、follow-up instructionsはモデルごとに異なったと明記している。

<!-- level:4 role:claim -->
Fable 5の長時間作業能力は、ベンダー発表だけでなく、独立した実務家の記録や第三者benchmarkからも部分的に支持される。
<!-- level:1 role:evidence -->
Willisonの`sqlite-utils`では約149.25ドル相当のセッションがrelease blockerの発見から修正へ続き、Everyのbenchmarkでは設計から実装までを含む課題で91点を得た。
<!-- level:3 role:analysis -->
共通しているのは「一問の正解」ではなく、レビュー、設計、実装、修正、検証のような複数フェーズを一つの仕事として渡している点である。
<!-- level:5 role:implication -->
長期自律性を評価するときは、単純なbenchmark順位より「何フェーズを再委譲なしでまたげたか」を見る方が実務に近い。

---

## 4. しかし、長く働けることと「何でも上手い」は別である

Fable 5には明確な反証もある。

CodeRabbitは105種類の既知error patternを使ったcode review benchmarkで、Fable 5のactionable issue coverageを65/105と報告している。baselineとOpus 4.8は66/105だった。

一方、actionable precisionはFable 5が32.8%、Opus 4.8が35.5%。Fableは253件のcommentを出し、よりnoisyだった。またcoding taskの評価では長時間走り続け、多くのcaseがagent側のtime limitへ到達したため、benchmarkを早めに打ち切ったとしている。

つまり「長く考え続けられる」は、条件によってはそのまま「止まりにくい」に変わる。

<!-- level:4 role:counterargument -->
長い仕事を自律して続けられることは、レビュー精度や効率まで自動的に高くなることを意味しない。
<!-- level:1 role:evidence -->
CodeRabbitではFable 5のcode review coverageはbaselineに近かった一方、precisionはOpus 4.8より低く、coding taskでは長時間実行がtimeoutへつながった。
<!-- level:3 role:analysis -->
ここでは「自律性」と「個々の判断の精度」と「止まりやすさ」が別の能力として動いている。
<!-- level:5 role:implication -->
高い委譲距離を使うほど、最大時間、最大step、予算、checkpoint、停止条件を仕事側へ組み込む必要がある。

---

## 5. Opus 5は「判断専用モデル」ではないが、曖昧な問題で強い例が多い

Opus 5は2026年7月24日に公開され、Anthropicは日常的に使うpremium modelとして位置づけている。価格はFableの半分で、AnthropicのCursorBench 3.2ではmax effort時にFable 5のpeak scoreから0.5%以内、OSWorld 2.0ではFableの最高結果を約3分の1強のcostで上回ったとしている。

実例にも、曖昧な問題への強さが出ている。

Anthropicの事例では、Opus 5が実在するpackage managerのbugについて表面症状ではなくroot causeを特定し、community patchが見落としたedge caseまで修正した。また、取引会社のengineerが新しいexchange向けmarket data feedを一sessionで作らせた際、validation用のlive feedが見つからないと、自分でtest harnessを作って検証したという。

ただし、これを「Opus = 判断層」という固定法則にはしない。

CodeRabbitのcode review評価では、Opus 5のx-high設定はactionable precisionが39.3%でproduction baselineの35.2%を上回った一方、known issue coverageは55.2%でbaselineの61.1%を下回り、nitpickも約4倍だった。

<!-- level:4 role:claim -->
Opus 5は曖昧な問題、root-cause探索、自己検証で強い事例を持つが、「判断だけを任せるモデル」と固定する根拠はない。
<!-- level:1 role:evidence -->
Anthropicはroot-cause修正や自作test harnessの事例を報告する一方、CodeRabbitではreview precisionが上がってもknown issue coverageはbaselineを下回った。
<!-- level:3 role:analysis -->
同じモデルでも、問題発見、実装、レビュー、computer useでは相対的な強みが変わるため、一つの人格的ラベルへ圧縮するとroutingを誤りやすい。
<!-- level:5 role:implication -->
「やり方が分からないからOpus」のようなruleは便利な初期仮説にはなるが、最終的にはtask固有のevalとcostで更新すべきである。

---

## 6. Sonnet 5を「安い実行層」に閉じ込めない

旧版の記事では、Sonnet 5を主に「やることが見えている仕事を大量に実行する層」として置いていた。

これは実務上のstarting pointとしては分かりやすい。しかし2026年6月のAnthropic発表自体が、Sonnet 5を「最もagenticなSonnet」と位置づけ、browserやterminalを使い、数か月前なら大型モデルが必要だった水準のautonomous workを実行できるとしている。

Sonnetは安いから短い仕事、Fableは高いから長い仕事、という単純な対応ではない。

安価なモデルが十分に長く仕事を完遂できるなら、その方が合理的である。

<!-- level:4 role:qualification -->
Sonnet 5を「実行層」と呼ぶのは運用上の shorthand であって、能力上の境界ではない。
<!-- level:2 role:description -->
AnthropicはSonnet 5をbrowserやterminalを使って自律実行できるagentic modelとして説明し、複雑なmulti-step workの完遂事例も紹介している。
<!-- level:3 role:analysis -->
したがってモデル選択では、名前や価格帯から役割を決めるより、まず安いモデルで必要な委譲距離を満たせるかを測る方がよい。
<!-- level:5 role:implication -->
モデルの「格」ではなく、必要な仕事を検証可能な形で最小costで完了できるかがroutingの基準になる。

---

## 7. 「委譲距離」はモデルの性格ではなく、仕事とシステムの関係で決まる

ここまでを整理するために、本稿では**委譲距離 / delegation horizon**を次のように定義する。

> **人間が再び介入するまでに、AIへ一まとまりの仕事として渡せる範囲と時間。**

この距離は、モデル単体の能力だけでは決まらない。

少なくとも次の四つが関わる。

1. **Work length** — 一つの回答か、調査→設計→実装→検証まで続くか
2. **Ambiguity** — 手順が既知か、原因や方法そのものを探す必要があるか
3. **Self-verification burden** — 出力するだけか、自分でtestし修正する必要があるか
4. **Human intervention interval** — 5分ごとに見るのか、1時間、半日、1日と任せたいのか

そして別軸として、**verifiability / 検証可能性**を置く。

<!-- level:4 role:claim -->
委譲距離は「Fableは長い、Sonnetは短い」というモデル固有値ではなく、モデル・task・tool・検証環境の組み合わせで決まる。
<!-- level:2 role:description -->
同じモデルでも、明確なtest suiteがあるmigrationと、成功条件が曖昧なbrand strategyでは、安心して任せられる距離が違う。
<!-- level:3 role:analysis -->
つまりagentic capabilityが上がっても、仕事の切り方やtoolingが弱ければ、実際の委譲距離は伸びない。
<!-- level:5 role:implication -->
「どのモデルを買うか」より先に、「どんな仕事単位なら安全に渡せるか」を設計することがAI運用の中心になる。

---

## 8. 長く任せるには「検証可能性」と「停止条件」が必要になる

委譲距離を伸ばすとき、一番危険なのは「強いモデルだから長く任せても大丈夫」と思うことだ。

Stripeのmigrationにはcodebaseとtestがある。`sqlite-utils`にはtest suite、互換性、release conditionがある。Everyのbenchmarkにもrubricと実行時の正しさがある。

反対に、「魅力的な企画を考えて」「会社の方向性を決めて」のような仕事は、出力が長くなっても正しさの判定が難しい。

さらにFableのtimeout事例が示すように、長く走れるモデルにはstop ruleも必要になる。

実務では少なくとも、次を先に決めたい。

- 完了条件
- 自動test / check方法
- 最大時間・最大step・token budget
- 壊してはいけないinvariant
- 人間へ戻す条件
- 最終承認者

<!-- level:4 role:claim -->
委譲距離を伸ばす条件は、モデルの能力だけでなく「終わったと判定できること」と「止められること」である。
<!-- level:1 role:evidence -->
長時間自律の成功事例にはtestやrubricがある一方、CodeRabbitではFableの長時間実行がagent timeoutへ達するcaseも報告された。
<!-- level:3 role:analysis -->
検証可能性が低いまま長く任せると、人間の確認回数は減っても、誤った方向へ積み上がった作業を最後に丸ごと捨てるriskが増える。
<!-- level:5 role:implication -->
長期自律化は「監督を消すこと」ではなく、監督を途中のmicro-managementから事前のguardrailと最後のverificationへ移すことである。

---

## 9. Sonnet → Opus → Fableは「昇格」ではなくroutingの仮説にする

実務上は、三つのモデルを仮のrouting mapとして持つと便利ではある。

### Sonnetから始めやすい仕事

- costを抑えて大量に回したい
- taskと完了条件が比較的明確
- multi-stepでも自動testが強い
- 失敗時に安く再実行できる

### Opusを試す理由が出る仕事

- root causeや方針そのものが分からない
- trade-offが多い
- self-verificationや深いanalysisが重要
- Sonnetで結果が不安定だった

### Fableを試す理由が出る仕事

- 複数phaseを一つの案件として渡したい
- 大きな既存環境を横断する
- 人間のcheck intervalを大きく伸ばしたい
- 長時間実行のcostを上回る人間介入costがある
- testや成果物でゴールを判定できる

ただしこれは**昇格順ではない**。

Fableでreviewするより別modelの方がよいこともあるし、Sonnetだけで長い案件が終わることもある。Opusを最初に使い、方針が決まったらSonnetへ下げることもできる。

重要なのはモデル名に役職を割り当てることではなく、**必要な委譲距離を満たす最も安く検証しやすい経路を選ぶこと**だ。

---

## 10. 高性能モデルを「作業者」ではなく検証点に置く方法もある

上位モデルの価値は、すべてのtokenを生成させることだけではない。

たとえば、

- Sonnetで広く実装する
- Opusで設計上の反証を探す
- Fableまたは別系統のmodelで大きなrelease前監査をする
- testと人間でfinal sign-offする

という使い方もできる。

これは「高いモデルを最後しか使わないからもったいない」のではない。

生成量ではなく、**失敗時の損失が大きいjudgment pointへ高い計算資源を置く**という設計である。

---

## 11. 結論――AIの進化は「答え」より「仕事の単位」を変える

モデルが強くなるほど目立つのは、benchmark scoreの上昇だけではない。

一つの関数、一つのbug、一つの機能から、調査・設計・実装・検証をまたぐ一つの案件へと、AIへ渡せる仕事単位が大きくなっている。

ただし、その進歩を「Fableなら全部任せられる」「Opusなら判断を任せられる」「Sonnetは安い作業員」と覚えると、次のmodel updateですぐ壊れる。

<!-- level:4 role:claim -->
モデルの世代が変わっても残る問いは、「この仕事をどこまで再介入なしに渡せるか」である。
<!-- level:3 role:analysis -->
その答えはモデル性能だけでなく、taskの曖昧さ、tool、test、cost、失敗時の損失、停止条件によって変わる。
<!-- level:2 role:qualification -->
委譲距離は予測式でも標準benchmarkでもなく、仕事を切り分けるための本稿独自のheuristicにすぎない。
<!-- level:5 role:implication -->
だからAIが強くなるほど、人間にはpromptを書く技術以上に、**どこまで任せ、何で正しさを確認し、いつ止めるかを設計する能力**が必要になる。

---

## 参考資料

- Anthropic「Claude Fable 5 and Claude Mythos 5」2026-06-09（2026-07-01 availability update）  
  https://www.anthropic.com/news/claude-fable-5-mythos-5
- Anthropic「Introducing Claude Sonnet 5」2026-06-30（2026-08-10 pricing update）  
  https://www.anthropic.com/news/claude-sonnet-5
- Anthropic「Introducing Claude Opus 5」2026-07-24  
  https://www.anthropic.com/news/claude-opus-5
- Simon Willison「sqlite-utils 4.0rc2, mostly written by Claude Fable (for about $149.25)」2026-07-05  
  https://simonwillison.net/2026/Jul/5/sqlite-utils-fable/
- Simon Willison「sqlite-utils 4.0, now with database schema migrations」2026-07-07  
  https://simonwillison.net/2026/Jul/7/sqlite-utils-4/
- Every「Senior Engineer Benchmark」2026-06-09  
  https://every.to/benchmarks/senior-engineer-benchmark
- CodeRabbit「Fable 5 model review: early signals from code review and coding tasks」2026-06-09  
  https://www.coderabbit.ai/blog/fable-5-model-review
- CodeRabbit「Opus 5 for code review: Cleaner actionable comments, noisier overall」2026-07-24  
  https://www.coderabbit.ai/blog/opus-5-model-review

### 出典の読み方

Anthropicの価格・公開日・製品説明は**verified product facts**として扱う。一方、Stripeの移行事例やearly-access customer commentsはAnthropicが掲載した**vendor-reported customer results**であり、独立benchmarkとは分けて読む。

EveryとCodeRabbitはthird-party benchmarkだが、それぞれ独自の課題・harness・評価方法を持つ。Simon Willisonの記録は独立したpractitioner reportだが、一つのprojectの経験である。

したがって本稿は、これらの資料からSonnet / Opus / Fableの固定的な序列を証明するものではない。2026年8月31日時点の証拠を使って、より壊れにくい**委譲設計の考え方**を作ることを目的としている。