---
id: claude-delegation-horizon-opus-fable
title: "Claudeは「賢さ」で選ばない――Opus 5とFable 5の実例から考える「委譲距離」"
subtitle: "Sonnet / Opus / Fableを、能力ランキングではなく「どこまで仕事を丸ごと渡せるか」で使い分ける"
mode: "english-mix"
english_ratio: 0.45
mix_unit: "sentence"
---

# Claudeは「賢さ」で選ばない――Opus 5とFable 5の実例から考える「委譲距離」
## Sonnet / Opus / Fableを、能力ランキングではなく「どこまで仕事を丸ごと渡せるか」で使い分ける

### 要旨

ClaudeにはSonnet、Opus、Fableという複数のモデル階層がある。

It is tempting to think that the strongest model should simply produce the best result.

しかし実際の利用事例を追うと、もっと実務的な見方が浮かび上がる。

**The difference between models is not only how smart their answers are. It is also how large a piece of work a human can hand over, for how long, and with how little supervision.**

本稿では、この「どこまで仕事を丸ごと渡せるか」を仮に**委譲距離**と呼ぶ。

The basic picture is simple.

- Sonnet 5：やることがかなり見えている仕事を、速く大量に実行する
- Opus 5：何をすべきか自体に判断が必要な難題を解く
- Fable 5：複数段階からなる大きな仕事を、長時間自律してゴールまで持っていく

But these are not simple upgrade tiers.

Fableを小さな仕事に使えば費用と時間を無駄にしやすい。Opusをコードレビューの唯一の安全網にすると、見逃しが増える場合がある。Sonnetでも、明確な仕事なら十分に複雑な作業を完遂できる。

The important question is not which model ranks highest. It is **how far you want to delegate the work**.

---

## 1. 「一番賢いモデルを使う」が間違いやすい理由

2026年6月、AnthropicはClaude Fable 5を公開した。

Fable belongs to what Anthropic calls the Mythos class, positioned above Opus in capability. Anthropic says its lead grows as tasks become longer and more complex.

一方、7月24日に公開されたClaude Opus 5について、AnthropicはFable 5の最前線級の知性に近づきながら、価格は半分だと位置づけた。

2026年8月19日時点のAPI価格は次の通りである。

- Sonnet 5：入力100万トークンあたり2ドル、出力10ドル（8月31日までの導入価格。以降3ドル／15ドル）
- Opus 5：入力5ドル、出力25ドル
- Fable 5：入力10ドル、出力50ドル

The higher models cost more, but higher price does not automatically mean better economics.

Opus 5はCursorBenchでは最大努力設定でFable 5の最高スコアと0.5ポイント以内まで迫り、OSWorld 2.0ではFable 5の最高成績を約3分の1のコストで上回ったとAnthropicは報告している。

So Fable is not a model you choose merely because it is slightly smarter than Opus.

**Fable’s value is less about one difficult answer and more about maintaining a long chain of work without losing the thread.**

この違いを見るには、ベンチマークより実際の仕事を見るほうが分かりやすい。

---

## 2. Fable 5の象徴的事例――5000万行のコードベースで移行を1日で実行

Anthropicが公開した初期事例の中で、最も象徴的なのがStripeである。

Stripe used Fable 5 for a codebase-wide migration inside a Ruby codebase of roughly 50 million lines. According to Anthropic, the model finished in one day work that would otherwise have taken a team more than two months by hand.

ここで注意したいのは、「5000万行を全部書き換えた」という話ではない点である。

It carried out one migration across an enormous codebase while navigating that environment.

Fableの強みは一回のコード生成量ではない。

- 巨大な既存環境を探索する
- 変更箇所を特定する
- 複数ファイルへ変更を広げる
- 途中で起きる問題を処理する
- 完了条件まで作業を続ける

This is a long chain of actions held together as one job.

「質問に答えるAI」というより、**案件を持つAI**に近い。

---

## 3. Simon Willisonの実験――149ドルでOSSのリリース候補を作る

外部の実利用として特に参考になるのが、開発者Simon Willisonによる`sqlite-utils`の事例である。

In July 2026, Willison asked Fable 5 to perform a final review before the stable release of `sqlite-utils 4.0`.

Fableはリリースを止めるべき問題として5件を挙げ、その後の修正にも深く関与した。Willisonは`4.0rc2`について「ほとんどFableが書いた」と表現し、Claude Code上の主セッションやレビューを合わせた費用を約149.25ドルと推計している。

The key point is that he was not asking for one function or one patch.

依頼の本質は、ほぼこうだった。

**「安定版を出す前に、本当にこれで出してよいか確認し、問題があれば直し、リリースできる状態まで持っていく」**

That is closer to outcome ownership than task execution.

一方で149ドルという金額も重要である。

If the same model were used for tiny edits, routine rewrites, or already-understood bugs, the economics would deteriorate quickly.

Fableは高いから使えないのではない。

**149ドル払ってでも人間の何時間・何日分かを圧縮できる仕事に使ってこそ意味がある。**

---

## 4. 「シニアエンジニア級」は何を意味しているのか

Everyが公開しているSenior Engineer Benchmarkも示唆的である。

The benchmark asks an agent to rethink and rewrite a real production collaboration system from first principles, not merely patch bugs.

人間のシニアエンジニアの参照スコアが89点と96点だったのに対し、Fable 5は91点だった。

But reading this as “Fable equals a human senior engineer” would be too strong.

Every自身が明示しているように、各モデルへの追加指示は完全には統一されておらず、一回ずつの代表実行で、反復試験によるばらつきも測っていない。

What matters more is the shape of the task.

Fableは、

1. 問題の構造を捉える
2. 原則を決める
3. 再設計する
4. 実装する
5. 古い経路を消す
6. 検証する

という複数フェーズを一つの仕事として扱えている。

Again, the distinctive capability is not simply solving one hard problem. It is **crossing phases of work without handing control back to the human every few minutes**.

---

## 5. しかしFableは「最高のレビュアー」ではない

高性能モデルについて最も危険なのは、「能力が高いなら、どんな仕事でも一番うまいはずだ」と考えることだ。

CodeRabbit tested Fable 5 on 105 known error patterns in code review.

既知問題を見つける広さでは既存の基準に近かった一方、指摘の精度はOpus 4.8を下回り、コメント数も多かった。CodeRabbitは、自律的なコーディング案件には有望と評価しつつ、通常の本番コードレビューをすべてFableへ置き換えるのは勧めていない。

The coding-task benchmark showed another tradeoff: Fable often kept exploring until the agent harness timed out.

これは弱点というより、性能の裏返しでもある。

**A model that keeps going needs a system that knows when to stop it.**

高性能モデルの運用では、プロンプトだけでなく、

- 最大時間
- 最大ステップ
- トークン予算
- 中間チェックポイント
- 完了条件

まで設計対象になる。

Fable is not “an AI you can simply leave alone.” It is **an AI for which you can design longer periods of autonomy**.

---

## 6. Opus 5の得意領域――「何を直せばいいか分からない」仕事

では、Opus 5はどこに入るのか。

Anthropic’s examples repeatedly point to three strengths: **root-cause analysis, judgment, and self-verification**.

あるオープンソースのパッケージ管理ツールの実在バグでは、Opus 5は根本原因を特定し、コミュニティ側の修正でも漏れていた例外ケースまで直した。他モデルは表面上の症状だけを直し、解決したと判断したという。

In another case, an engineer at a trading firm used Opus 5 to build a market-data feed for a new exchange in one session.

検証用の実データ配信が見つからないと、Opus自身がテスト用の仕組みを作り、解析処理を検証した。

The human did not specify every step.

- なぜ壊れているのか
- 何を検証すべきか
- 検証手段がなければ何を作るべきか

をモデル自身が判断している。

This is less like a worker following instructions and more like a strong problem solver deciding what the instructions should be.

だからOpusへ渡すべきなのは、単に難しい仕事ではない。

**正しい作業手順そのものがまだ分からない仕事**である。

---

## 7. Opusにも「何でも任せる」は通用しない

Opus 5にも反証はある。

CodeRabbit found that Opus 5 at maximum effort produced more precise actionable review comments than its production baseline, but caught fewer known issues: 55.2% versus 61.1%. It also generated roughly four times as many nitpicks.

CodeRabbitの結論は、単独のコードレビュアーより、**精度重視の第二レビュアー**として使うほうがよい、というものだった。

Everyのチームからも別方向の警告が出ている。

Some testers found Opus 5 difficult when they tried to force it through old, detailed agent instructions. Others got better results by giving it one substantial job, a clear finish line, and enough room to work.

ここから一つ重要な教訓が得られる。

**As models become more capable, giving them more detailed procedural instructions is not always better.**

人間が指定すべきなのは、方法よりも、

- 目的
- 制約
- 完了条件
- 絶対に壊してはいけないもの
- 検証方法

になっていく。

---

## 8. 新しい物差し――「委譲距離」で考える

ここまでの事例から、モデル選びを整理するために**委譲距離**という考え方を導入したい。

Delegation horizon means:

> **人間が途中で介入せず、AIへ一まとまりの仕事として渡せる範囲の大きさ**

距離を伸ばす要因は少なくとも四つある。

### ① 作業の長さ

Is this one edit, or does it continue through research, design, implementation, and verification?

### ② 未知の多さ

やり方が決まっているのか、原因や方法から探す必要があるのか。

### ③ 自己検証の必要性

Does the model only need to produce an output, or must it test itself, notice failure, and repair its own work?

### ④ 人間が確認する間隔

5分ごとに見ればよいのか、1時間、半日、1日と任せたいのか。

The larger these four factors become, the longer the required delegation horizon.

ここで重要なのは、**仕事の難易度と委譲距離は同じではない**ことだ。

A very difficult single math problem can have a short delegation horizon if the input and output are clear.

逆に、難しくないWebサイト修正でも、50ファイルを調べ、仕様を保ち、スマホ表示を確認し、複数の不具合を直してテストするなら距離は長い。

In the agent era, we need to ask not only “How hard is this?” but also “How long is this piece of work?”

---

## 9. もう一つ必要な軸――「検証可能性」

ただし、委譲距離だけでFableを使うのも危険である。

The longer the model runs, the more expensive a wrong direction can become.

そこで第二の軸として**検証可能性**が必要になる。

Stripeのコード移行にはテストがある。`sqlite-utils`には既存のテスト、互換性、リリース条件がある。Everyのベンチマークにも、守るべき不変条件と実行時の正しさという評価基準がある。

Many successful Fable examples are not only large tasks. They also have **externally checkable finish lines**.

逆に、

「なんとなく魅力的な企画を考えて」

「いい感じのブランド戦略を作って」

「会社の方向性を全部決めて」

のような仕事は、いくら長く考えさせても、正解判定そのものが難しい。

A longer run can create more material without making the judgment more reliable.

したがって、Fable向きの仕事は単に「大きい仕事」ではない。

> **大きく、長く、しかもゴールを検証できる仕事。**

That is a more useful definition.

---

## 10. Sonnet → Opus → Fableは「昇格」ではなく「エスカレーション」

ここまでを実務の運用に落とすと、三つのモデルは階級ではなくエスカレーション経路として考えるとよい。

### Sonnet 5――実行層

Use Sonnet when the path is mostly known.

- 仕様がある程度決まった実装
- HTML/CSSの修正
- データ整形
- 定型的な調査
- 文章の整理
- 既知原因のバグ修正
- 日常的な自動化

2026年8月時点では導入価格もOpusの半分以下であり、Anthropic自身も日常的な高負荷処理の実行層として位置づけている。

### Opus 5――判断層

Escalate to Opus when the method itself is uncertain.

- 原因が分からない
- 設計方針が複数あり、トレードオフがある
- 既存仕様を読み解く必要がある
- 例外ケースを見つけたい
- 反論や第二意見がほしい
- 自分で検証方法から作ってほしい

**「やり方」が問題になったらOpus**である。

### Fable 5――案件層

Escalate again when the work itself becomes a project.

- 複数フェーズをまとめて渡したい
- 大きなコードベース横断作業
- 数時間以上の自律実行に価値がある
- 途中の判断をモデル自身に任せたい
- 完了条件をテストや成果物で確認できる
- 人間が細かく監督するほうが高くつく

**「作業」ではなく「案件」を渡せるときにFable**である。

---

## 11. いちばん合理的なのは「最初からFable」ではない

ここから一歩進めると、モデル選択は固定ではなく、途中で上げていく設計にしたほうがよい。

A practical coding workflow might look like this:

1. Sonnetで通常実装
2. 詰まったらOpusで根本原因を調査
3. 改修範囲が大きくなり、複数フェーズを一括で進める価値が出たらFable
4. 最後はテストや別モデル、人間で検証

Fable should not be treated as “the strongest model to call first.”

重要なのは、**委譲距離を伸ばす必要が生まれたときのエスカレーション先**として考えることだ。

Then the cost becomes easier to reason about.

高いモデルへ払っているのは、単なる賢さではない。

**人間が何度も介入するコストを、モデルの自律性へ置き換えている。**

---

## 12. 「高性能モデルをレビューだけに使う」という逆転

もう一つ有効なのが、最上位モデルへ全部やらせるのではなく、**最後の判断だけ買う**方法である。

For example:

- Sonnetで実装
- Opusで設計レビュー
- 必要な案件だけFableで最終監査

This may look wasteful at first.

しかし、高性能モデルの価値が「コードをたくさん書くこと」より「見落としていた構造問題を見つけること」にあるなら、生成作業を下位モデルへ任せ、最も重要な判断だけ上位モデルへ渡すほうが合理的な場合がある。

Simon Willisonの`sqlite-utils`事例でも、Fableの価値は単なる実装量だけでなく、リリース前レビューで重大な問題を発見したことにあった。

A frontier model can be used not as a premium worker, but as a **premium judgment point**.

---

## 13. モデルより先に「仕事の切り方」を設計する

ここまで来ると、モデル選びそのものより重要なものが見えてくる。

It is the design of the work itself.

同じ案件でも、

「このサイトを改善して」

と渡すのと、

「現状を監査し、問題を分類し、修正計画を作り、優先度Aだけ実装し、PCとスマホで検証し、残課題をまとめる」

と渡すのでは、AIが扱う仕事の形がまったく違う。

As models become stronger, the human role moves away from micromanaging procedures and toward defining:

- 何を成果と呼ぶか
- 何を守るか
- どこまで任せるか
- いつ止めるか
- 何で正しさを確認するか

つまり、これから必要なのはプロンプト技術だけではない。

**We need delegation design: the ability to design work so that AI can own the right amount of it.**

---

## 14. 実践用の判定ルール

最後に、かなり乱暴だが使いやすい判定ルールへ落としてみる。

### Sonnetで始める

「手順はだいたい分かる。あとはやってほしい」

### Opusへ上げる

“I do not yet know what needs to be done to fix this.”

### Fableへ上げる

「何をするか考えるところから、複数工程をまたいで最後まで持っていってほしい」

Before using Fable, check three things.

1. 完了条件を言えるか
2. 自動テストやチェック方法があるか
3. 人間が途中で何度も確認するより、モデルへ長く任せるほうが安いか

If all three answers are yes, Fable is much more likely to pay off.

逆に一つ目と二つ目が曖昧なら、Fableを長く走らせる前に、人間とOpusで問題設定を詰めたほうがよい。

---

## 15. 結論――AIの進化は「答え」より「仕事の単位」を変えている

Fable 5の登場を見て、「さらに賢いAIが出た」とだけ捉えると、本質を少し見落とす。

Stripe’s migration, Simon Willison’s open-source work, and Every’s architecture benchmark point to something larger than a few extra benchmark points.

**AIへ渡せる仕事の単位が大きくなっている。**

一行のコード。

One function.

一つの機能。

One bug.

一つの改修。

And eventually, one whole project.

モデルが進化するほど、人間がAIへ渡せる単位は上へ広がっていく。

So the question should no longer be:

「どのモデルが一番賢いか」

Instead ask:

> **この仕事は、どこまで丸ごと渡せるのか。**

And then:

> **渡した仕事が終わったとき、正しく終わったと判断できるのか。**

Sonnet、Opus、Fableの違いは、能力ランキングとして覚えるより、**委譲距離を調節する三つのギア**として理解したほうが、実務でははるかに使いやすい。

As AI becomes stronger, the human job does not simply disappear.

**どこまで任せ、どこで自分が判断するかを設計する仕事が増える。**

That may be the real next stage of working with AI.

---

## 参考資料

- Anthropic「Claude Fable 5 and Claude Mythos 5」2026-06-09  
  https://www.anthropic.com/news/claude-fable-5-mythos-5
- Anthropic「Introducing Claude Sonnet 5」2026-06-30  
  https://www.anthropic.com/news/claude-sonnet-5
- Anthropic「Introducing Claude Opus 5」2026-07-24  
  https://www.anthropic.com/news/claude-opus-5
- Simon Willison「sqlite-utils 4.0rc2, mostly written by Claude Fable (for about $149.25)」2026-07-05  
  https://simonwillison.net/2026/Jul/5/sqlite-utils-fable/
- Simon Willison「sqlite-utils 4.0, now with database schema migrations」2026-07-07  
  https://simonwillison.net/2026/Jul/7/sqlite-utils-4/
- Every「Senior Engineer Benchmark」2026-06-09  
  https://every.to/benchmarks/senior-engineer-benchmark
- Every「Taming Opus 5」2026-07-28（2026-08-10更新）  
  https://every.to/context-window/taming-opus-5
- CodeRabbit「Fable 5 model review: early signals from code review and coding tasks」2026-06-09  
  https://www.coderabbit.ai/blog/fable-5-model-review
- CodeRabbit「Opus 5 for code review: Cleaner actionable comments, noisier overall」2026-07-24  
  https://www.coderabbit.ai/blog/opus-5-model-review

### 出典の読み方

Anthropicの事例には同社自身の評価や初期利用企業のコメントが含まれるため、独立した第三者検証とは区別して読む必要がある。

This essay therefore combines Anthropic’s official claims with Simon Willison’s public work logs, Every’s production-code benchmark, and CodeRabbit’s independent tests.

モデル性能、価格、提供条件は変化が速い。本稿の記述は2026年8月19日時点の公開情報に基づく。