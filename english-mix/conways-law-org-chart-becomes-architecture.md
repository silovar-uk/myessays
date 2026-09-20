---
id: conways-law-org-chart-becomes-architecture
title: "あなたのorg chartは、もう半分architectureになっている"
subtitle: "Conway's Law｜communication structureがsystem designになるまで"
created: "2026-09-20"
updated: "2026-09-20"
type: "Essay"
status: "published"
tags: ["Conway's Law", "コンウェイの法則", "組織設計", "Software Architecture", "Team Topologies", "Mirroring Hypothesis", "マイクロサービス"]
keywords: ["Conway's Law", "How Do Committees Invent", "mirroring hypothesis", "inverse Conway maneuver", "reverse Conway", "organization design", "software architecture", "communication structure"]
grow: true
abstract: "Why does team structure leak into system architecture? 1968年のMelvin Conway原論文、mirroring研究、Windows Vista、142研究レビュー、Inverse Conway Maneuverをたどり、Conway's Lawを「org chartがcodeに写る」以上の問題として読む。communication pathがdesign spaceをどう狭めるかを考え、実務のauditまで落とす。"
---

# あなたのorg chartは、もう半分architectureになっている
## Conway's Law｜communication structureがsystem designになるまで

Sometimes Slack looks suspiciously like an architecture diagram. 会社のchannel構成を見て、「これ、そのままsystem構成では？」と思う瞬間がある。

#web、#app、#data、#infra。担当者も別、定例も別、承認者も別。障害が起きると、まず四つのチャンネルを横断して「どこからどこまでが誰の責任か」を確認する。

その横で、システムにもWeb、App、Data、Infraという境界があり、その境目にAPI、バッチ、権限、リリース手順が生えている。

This is weird. **人間のtalking structureが、machineのseparation structureになっている。**

もし本当にそうなら、人事異動はAPI設計会議でもある。本人たちはそんなつもりではない。人事部もたぶんそんなつもりではない。

この気味の悪い対応関係に、1968年、プログラマーのMelvin E. Conwayが名前を付ける前の形を与えた。後に「コンウェイの法則」と呼ばれる観察である。

Before research、私はこの法則を「組織図どおりにソフトウェアが分割される」という有名な小話だと思っていた。After research、少し違って見える。**怖いのは成果物が組織に似ることではない。組織を決めた時点で、設計者が探索しやすい解そのものが偏ることだ。**

## 1. ORIGINAL｜原論文は「組織図」より「通信経路」を問題にしていた

Melvin Conwayの1968年の論文“How Do Committees Invent?”は、後世の要約より少し厄介である。

有名な一文はこうだ。

> “organizations which design systems ... are constrained to produce designs which are copies of the communication structures of these organizations.”

[Melvin E. Conway, “How Do Committees Invent?”](https://melconway.com/Home/pdf/committees.pdf)

The key point is、コピーされるのが正式な組織図そのものではなく、**communication structure、つまり誰と誰が実際に意思疎通できるかという構造**だという点である。

さらに原論文は、設計チームを組織すること自体が、明示的であれ暗黙的であれ、すでに一部の設計判断を済ませる行為だと論じる。必要な通信経路が存在しない組織では、効果的に追求できない設計案が出てくる。仕事をサブグループへ委譲して各人の探索範囲を狭めるほど、組織が現実的に検討できる設計の集合も狭くなる。

This is not only about「部署Aがmodule Aを作る」というresultの話ではない。

**誰と相談できるかが、何を自然な解だと思えるかまで変える。**

会議体は会議体ではない。場合によっては、設計空間に掛けられた見えないフィルターである。

## 2. MECHANISM｜チーム境界が技術境界へ写るのは、超常現象ではなく調整コストの問題である

Why does this happen?

二つの部品が密接に連携するなら、その設計者同士も、インターフェース、データ形式、例外処理、変更タイミングについて密接に調整しなければならない。逆に、ほとんど会話しない二つのチームへ強く依存した部品を持たせると、変更のたびに組織の境界を越える調整が必要になる。

So、organizationは、意識的にも無意識にも、**「よく会話する人たちの中に、強い技術的依存を閉じ込める」**方向へ寄りやすい。

This is less about design aesthetics and more about adaptation to daily coordination cost.

たとえば、決済チームと会員チームが別で、相互の変更には毎回二つの定例、二人の責任者、二種類のリリース承認が必要だとする。すると開発者は「この機能、どちらか片方だけで完結させられないか」と考えるようになる。うまくいけば疎結合になる。うまくいかなければ、責任境界だけがきれいで、ユーザー体験が妙に分断される。

組織の摩擦は、設計上の摩擦を生むだけではない。**設計者に「摩擦を避ける形」を学習させる。**

この意味でコンウェイの法則は、組織図を写すコピー機というより、何度も通るうちに設計を一定方向へ削っていくヤスリに近い。

## 3. EVIDENCE｜「それっぽい格言」では終わらず、mirroringとしてかなり研究されている

The idea is almost too powerful. 何でも後付けで説明できてしまう危険がある。

「このシステム、部署と同じ分かれ方ですね」「コンウェイの法則ですね」。これだけなら、占いとほぼ同じ運用ができる。何を見ても当たっているように見える。

そこで研究では、組織的なつながりと技術的な依存が対応するかを**mirroring hypothesis**として検証してきた。

MacCormack、Rusnak、Baldwinは、同じ機能を担う商用ソフトウェアとオープンソースソフトウェアの対応ペアを比較し、緩く結合した組織が作った製品の方が、強く結合した組織の製品よりモジュール性が高いという結果を報告した。設計変更が他部分へ波及する潜在的な度合いでは、ペアによって最大8倍の差があったとする。[Harvard Business School](https://www.hbs.edu/faculty/Pages/item.aspx?num=32217)

ただし、ここで「コンウェイの法則、科学的に完全証明」と閉じると雑になる。

ColferとBaldwinが2016年に142件の実証研究をレビューすると、企業・産業を対象とした記述的研究では70%が強いmirroring、22%が部分的な支持、8%が不支持だった。一方、オープンな協働プロジェクトを扱った記述的研究では、56%がmirroringを支持しなかった。[Industrial and Corporate Change](https://academic.oup.com/icc/article/25/5/709/2198460)

In short、**mirroringはcommonだがuniversalではない。**

「Law」と呼ばれているが、物理法則のように逃げられないわけではない。むしろ、調整コスト、認知資源、技術、契約、コミュニケーション手段によって強さが変わる組織的な傾向として読む方が、研究には近い。

法則という名前が強すぎる。名前が先にマイクを握っている。

## 4. QUALITY｜組織構造は、コードの形だけでなく不具合の出やすさとも関係していた

Mirroring itself is not automatically bad.

むしろ、技術的に強く依存する仕事を、よくコミュニケーションする人たちへまとめるのは合理的である。問題は、組織と技術の依存が噛み合わないときだ。

Microsoft ResearchのNagappanらはWindows Vistaを対象に、組織上の複雑性を表す指標と、バイナリのfailure-pronenessの関係を分析した。彼らのケーススタディでは、組織指標は故障しやすさの統計的に有意な予測因子であり、従来使われてきたコード変更量、複雑性、依存、テストカバレッジ、リリース前バグなどより高い精度・再現率を示した。[Microsoft Research](https://www.microsoft.com/en-us/research/publication/the-influence-of-organizational-structure-on-software-quality-an-empirical-case-study/)

もちろん、これはWindows Vistaという一事例であり、「組織図を変えればバグが消える」という因果証明ではない。

それでも面白い。

コードだけを見て予測していた品質問題に、**誰がどこで作ったかという社会的な履歴**が情報を足している。

ソフトウェアは純粋な技術物ではなく、人間の協働履歴を焼き付けた人工物でもある。設計レビューでコードだけ見ていて、組織の通信経路を見ないのは、半分のログだけで障害解析するようなものかもしれない。

## 5. THOUGHT EXPERIMENT｜同じ機能を、三つの組織に作らせたら何が起きるか

Let us overdo it a little. ここでthought experimentをする。

同じ「オンラインでイベントへ申し込み、決済し、当日QRで入場するサービス」を、技術力も人数も同じ三社に作らせる。ただし組織だけ変える。

**会社A**は、企画、デザイン、フロントエンド、バックエンド、インフラの職能別組織である。案件は上流から下流へ流れる。担当が変わるたびに引継ぎがある。

**会社B**は、申込、決済、入場という顧客の流れごとのチームである。各チームに企画・デザイン・開発・運用がいる。

**会社C**は、顧客体験を持つストリームチームと、認証・決済・通知を提供するプラットフォームチームに分かれる。

This is not empirical data. 本稿のthought experimentである。

それでも、各社が自然に抱えやすい設計上の悩みは違う。Aでは、画面、API、DB、インフラの層境界が強くなり、変更は複数部署のリレーになりやすい。Bでは顧客フロー単位の独立性が上がる一方、認証や通知の重複が起きやすい。Cでは共通機能の再利用はしやすいが、プラットフォームが「何でも依頼される中央省庁」になる危険がある。

同じ要求仕様でも、**どの調整を安くし、どの調整を高くするか**が違う。

システムは、その価格表に適応して形を変える。

この思考実験の発見は、「最適な組織を当てる」ことではない。**組織設計とは、コミュニケーションコストの価格設定である**という見方を得ることにある。

## 6. INVERSE｜ならば組織を先に設計して、欲しいアーキテクチャを誘導できるのか

Now flip the direction.

「組織がシステムへ影響するなら、欲しいシステムに合わせて組織を作ればいいのでは？」

これが一般に**Inverse Conway Maneuver**、あるいはReverse Conwayと呼ばれる考え方である。ThoughtworksのTechnology Radarは2014年から2015年にかけて、望ましいアーキテクチャを促進するようチームと組織構造を進化させる手法として紹介した。[Thoughtworks Technology Radar](https://www.thoughtworks.com/en-us/radar/techniques/inverse-conway-maneuver)

Team Topologiesも、チーム境界、認知負荷、相互作用モードを設計し、ソフトウェアの持続可能な境界と合わせていくReverse Conwayを重視する。実際の事例では、論理コンポーネントと依存関係を可視化したうえで、チーム境界をビジネスドメインへ合わせ直す取り組みが報告されている。[Team Topologies: Wealth Wizards case study](https://teamtopologies.com/industry-examples/evolving-teams-and-software-at-wealth-wizards-using-team-topologies)

But if the answer becomes “We want microservices, so let's make 30 teams,” the story suddenly turns into comedy.

組織改編した翌朝にモノリスが自然分裂することはない。そんな便利な細胞分裂はない。

逆コンウェイの要点は、組織図をアーキテクチャ図へ機械的に一致させることではない。**どの変更を一つのチームで完結させたいか、どの依存を明示的なサービス境界にしたいかを決め、その流れを支えられる通信構造を作ること**にある。

アーキテクチャも組織も変化する。だから正解は静止画ではなく、両方を一緒に進化させる運用になる。

## 7. EXCEPTION｜強いチーム境界が、いつも良いモジュールを生むわけではない

The most dangerous practical misreading is「チームを分ければ、きれいに疎結合になる」。

2016年のレビューが示したように、mirroringには例外がある。特にオープンな協働では、デジタルツールや共有規約によって、従来の企業境界とは違う協調が可能になる。[Industrial and Corporate Change](https://academic.oup.com/icc/article/25/5/709/2198460)

さらに因果の向きも一方向とは限らない。

技術的依存が強いから組織的なつながりが増える場合もあるし、組織的なつながりが技術的依存を作る場合もある。両方が互いを強める場合もある。

そして「もっとコミュニケーションすれば解決する」も雑である。

全員が全員と常時話す組織は、理論上すべての設計案へ開かれているかもしれないが、実務上は全員が会議中で何も作れない。通信経路は多ければ多いほど良いわけではない。

The goal is not maximum communication.

**技術的に強く依存するところには十分な通信を置き、独立して変えたいところでは通信を契約やインターフェースへ圧縮する。**

コンウェイの法則から学ぶべきなのは「仲良く話そう」ではなく、依存と通信の配置を合わせることである。

## 8. OUTSIDE SOFTWARE｜マーケティングや業務フローにも効くが、比喩として慎重に使う

Conway wrote about organizations designing systems, not software only.

とはいえ、実証研究の蓄積が厚いのは技術製品、ソフトウェア、産業アーキテクチャの領域である。だから、マーケティング、イベント運営、広報、行政などへ適用するときは、同じ強さの実証法則としてではなく、**構造を見るための仮説**として使う方が安全である。

たとえば一つのキャンペーンを、Web担当、SNS担当、メール担当、現場担当で完全に分ける。

すると成果物も、Web、SNS、メール、現場というチャネル別に最適化されやすい。ユーザーが「知る→興味を持つ→申し込む→来場する」という一つの体験をしていても、組織は「X投稿」「LP」「メルマガ」「当日運営」という別々の納品物として認識しやすい。

これはコンウェイの法則で証明されたマーケティング現象ではない。本稿の応用的な解釈である。

しかし、問いとしては強い。

**顧客の旅程では一続きなのに、社内の担当境界のせいで分断して見ている場所はないか。**

その問いを持つだけで、「チャネル別KPIを足したら全体最適になる」という発想の危うさが見えやすくなる。

## 9. AUDIT｜システム図を見る前に、「変更が誰を横断するか」を描いてみる

For practice, comparing org chart and architecture diagram is not enough.

見るべきなのは、実際の変更経路である。

提案として、重要な機能変更を一つ選び、次の五つを紙に書く。

- その変更を完了するまでに、何チームを横断するか。
- 誰の承認・レビュー・リリース待ちが発生するか。
- 変更のたびに同じ組み合わせの人が集まっていないか。
- 一つのチームだけで、顧客価値までend-to-endに変更できる範囲はどこか。
- 「ここを変えると必ずあそこへ連絡する」という暗黙ルールはどこか。

その上で、システムの依存関係と重ねる。

もし強い技術依存があるのに組織的な通信が薄ければ、変更は事故りやすい。逆に技術的には独立しているのに毎回大人数の調整が必要なら、組織側が不要な結合を作っている可能性がある。

Slackの#helpチャンネルも、定例会議も、承認フローも、単なる運用ではない。

**それらは、公式アーキテクチャ図に載っていない依存関係を観測するセンサーになり得る。**

## 10. DISCOVERY｜リファクタリングの前に、会話の経路をリファクタリングすべきことがある

Back to the opening question. 最初の疑問へ戻る。

なぜSlackのチャンネル構成と、システム構成が似て見えるのか。

調べる前は、「人間が担当ごとに分かれるから、コードも担当ごとに分かれる」という程度の話だと思っていた。

The original paper goes one level deeper.

組織を作ることは、単に仕事を配ることではない。誰と誰が自然に話し、誰と誰の相談が高コストになり、どの設計案が日常的に思いつきやすくなるかを決める。

Broader evidence says、そのmirroringはかなり頻繁に観察されるが、普遍ではない。デジタルツール、共有規約、モジュール設計、組織横断の関係によって鏡は壊せる。場合によっては、壊した方がいい。

Then Reverse Conway flips the picture.

**アーキテクチャは技術部門だけの成果物ではない。人事、マネジメント、会議設計、権限設計も、長い時間をかけてアーキテクチャへコミットしている。**

Gitには残らないコミットである。

だから、システムの境界が悪いとき、最初にコードを切り刻むとは限らない。

もしかすると先に切るべきなのは、責任範囲、承認経路、定例会議、依存の持ち方である。

コンウェイの法則を知る前、組織は「システムを作る人たちの配置」に見えた。

知った後は、**組織そのものが、ゆっくり実行され続ける設計プログラム**に見える。

## 11. PROMPT｜自分の組織に潜む「見えないアーキテクチャ」を診断する

Below is a reusable diagnostic prompt based on this research.

~~~text
あなたは、Conway's Lawとmirroring hypothesisを使って
「組織の通信構造」と「成果物・システムの依存構造」のズレを診断する組織設計レビュー担当者です。

目的：
組織図を批評することではなく、
日常の変更・承認・相談・引継ぎ経路が、
システムや業務フローにどんな境界・結合・ボトルネックを作っているかを可視化してください。

入力：
【対象システム／業務】
{{対象}}

【チーム・担当】
{{チーム一覧}}

【よくある変更】
{{変更例}}

【変更時に必要な相談・承認】
{{通信経路}}

【技術・業務上の依存】
{{依存関係}}

分析手順：
1. 事実として確認できる組織的な通信経路を整理する。
2. 事実として確認できる技術・業務上の依存関係を整理する。
3. 両者がmirroringしている箇所を示す。
4. 技術的には強く依存するのに通信が弱い箇所を示す。
5. 技術的には独立しているのに組織的調整が重い箇所を示す。
6. 原因をConway's Lawだけで断定しない。別の説明候補も出す。
7. 変更をend-to-endで完結させたい単位を提案する。
8. 必要ならInverse Conway / Reverse Conwayの観点から、
   チーム境界・責任・API・承認経路の変更案を提案する。
9. 「会話を増やす」だけの提案は禁止。
10. 事実・解釈・提案を分ける。

最後に、
「コードや業務フローを変える前に、通信構造を変えた方がよい可能性がある場所」
を3つ以内で示してください。
~~~

## 12. Sources

- Melvin E. Conway, “How Do Committees Invent?” (1968)  
  https://melconway.com/Home/pdf/committees.pdf
- Lyra J. Colfer, Carliss Y. Baldwin, “The mirroring hypothesis: theory, evidence, and exceptions” (2016)  
  https://academic.oup.com/icc/article/25/5/709/2198460
- Alan D. MacCormack, John Rusnak, Carliss Y. Baldwin, “Exploring the Duality between Product and Organizational Architectures”  
  https://www.hbs.edu/faculty/Pages/item.aspx?num=32217
- Nachiappan Nagappan et al., “The Influence of Organizational Structure On Software Quality: An Empirical Case Study”  
  https://www.microsoft.com/en-us/research/publication/the-influence-of-organizational-structure-on-software-quality-an-empirical-case-study/
- Thoughtworks Technology Radar, “Inverse Conway Maneuver”  
  https://www.thoughtworks.com/en-us/radar/techniques/inverse-conway-maneuver
- Thoughtworks Technology Podcast, “Reckoning with the force of Conway's Law”  
  https://www.thoughtworks.com/en-gb/insights/podcasts/technology-podcasts/reckoning-with-the-force-conways-law
- Team Topologies, “Evolving teams and software at Wealth Wizards using Team Topologies”  
  https://teamtopologies.com/industry-examples/evolving-teams-and-software-at-wealth-wizards-using-team-topologies
