---
id: ai-subagents-separate-context-workdesks
title: "AIに聞いたら、AIが増えた――サブエージェントは「部下」より「別の作業机」に近い"
subtitle: "Subagents as Context Architecture――仕事を分けるだけではなく、注意・記憶・権限を分ける"
created: "2026-09-15"
updated: "2026-09-15"
type: "Essay"
status: "完成"
tags: ["AIエージェント", "サブエージェント", "マルチエージェント", "コンテキスト", "Codex", "Claude Code", "オーケストレーション"]
keywords: ["subagent", "multi-agent", "context engineering", "orchestrator-worker", "agent thread", "Codex", "Claude Code", "context isolation", "parallel agents"]
grow: 5
abstract: "AIのサブエージェントは、単に『親AIの部下』なのか。OpenAI CodexとClaude Codeの現在の実装を追うと、より重要なのは組織図ではなく、仕事ごとに別のコンテキスト、ツール、権限、作業時間を割り当てることだと見えてくる。本稿は、tool・agent・subagent・agent teamの違い、context isolation、parallelism、specialization、fresh perspective、コストと失敗を整理し、CodexとClaude Codeでの具体的な使い方まで落とし込む。サブエージェントを『AIの部下』ではなく『別の作業机を増やすアーキテクチャ』として捉え直す。"
---

# AIに聞いたら、AIが増えた
## サブエージェントは「部下」より「別の作業机」に近い

AIに「このコードをレビューして」と頼む。すると、そのAIが別のAIを3体くらい呼び出して、1体はセキュリティ、1体はテスト、1体は保守性を調べ、最後に元のAIが結果をまとめて返してくる。

冷静に考えると、かなり変な光景である。

私はAIに質問しただけなのに、いつの間にかAI側に小さな組織ができている。ここで「なるほど、サブエージェントとはAI版の部下なのか」と理解したくなる。実際、その比喩は半分くらい当たっている。親が仕事を振り、子が調べ、親が統合するからだ。

しかし、OpenAI CodexとClaude Codeの現在の実装を追っていくと、この比喩だけでは肝心なところを取り逃がす。サブエージェントの本質は、**人数を増やすことより、コンテキストを分けること**にある。

もっと雑に言えば、サブエージェントは「部下」というより**別の作業机**に近い。

机Aでは要件を考える。机Bでは大量のログを読む。机CではAPI仕様を確認する。机Dではコードを壊さずにレビューする。それぞれの机には、必要な資料だけが置かれている。最後にメインの机へ「結論だけ」を持ち帰る。

この見方に変えると、「いつ使うのか」「なぜ速くなるのか」「なぜ逆に失敗するのか」が一気に分かりやすくなる。

---

## 1. まず、「AIがもう一人いる」と考えると少しズレる

普通のチャットAIは、一つの会話の中で調査も推論もコード編集も行う。便利だが、長い作業ほど会話の中には大量の中間物がたまる。検索結果、読みかけのファイル、失敗した仮説、テストログ、エラーメッセージ、修正案。必要な情報も不要な情報も、同じ机の上へ積まれていく。

Codexの公式ドキュメントは、この状態をcontext pollutionやcontext rotという観点で説明し、サブエージェントを使う理由として「ノイズの多い作業をmain threadから外へ逃がす」ことを挙げている。Claude Codeも同じ発想で、サブエージェントは独立したcontext windowで作業し、main conversationへは主に結果だけを返す。

つまり、サブエージェントで増えるのは「知能の頭数」だけではない。**注意を置く場所が増える。**

たとえば「認証処理の仕組みを調べてから、バグを直して」と一つのAIに頼む場合、認証関連の20ファイルを読んだ履歴も、その後の修正作業と同じ会話に残る。一方、調査をサブエージェントへ渡せば、メイン側には「認証はA→B→Cの順に流れ、原因候補はX」という要約だけを戻せる。

これは人間のチームワークに似ているようで、少し違う。人を増やす理由は労働時間の総量を増やすことだが、サブエージェントでは**コンテキスト汚染を隔離すること自体が性能上の理由**になる。

[OpenAI, “Subagents”](https://learn.chatgpt.com/docs/agent-configuration/subagents) / [Anthropic, “Create custom subagents”](https://code.claude.com/docs/en/sub-agents)

---

## 2. Tool、Subagent、Agent Teamは、似ているが役割が違う

ここで用語を一度整理したい。AI周辺の言葉は、全部「何かが何かを呼ぶ」ので非常に紛らわしい。

**Tool**は、AIが使う道具である。検索、ファイル読み込み、シェル、ブラウザ、データベース照会などがこれに当たる。道具は通常、自分で大きな判断ループを持たない。「このファイルを読んで」「このコマンドを実行して」という呼び出しに応じる。

**Subagent**は、仕事を渡されたあと、自分のコンテキストの中で複数ステップを進められる。ファイルを探し、読む順番を考え、必要なら別のツールを使い、最後に結果を返す。つまり「道具」より「小さな担当者」に近い。

一方、**Agent Team**や複数セッション型の仕組みは、さらに独立性が高い。Claude Codeの公式資料では、subagentsはsingle session内の仕組みとして説明され、別セッション同士がメッセージを渡すcross-session messagingや、複数セッションを協調させるagent teamsとは区別されている。

この違いは、会社に例えると少し分かる。

Toolは電卓や検索システム。Subagentは同じプロジェクト内に一時的に呼ばれる専門担当。Agent Teamは複数の担当者がそれぞれ自分の持ち場を持ち、より長く協調する体制である。

ただし、この会社比喩にも限界がある。サブエージェントは必要に応じて数十秒から数分だけ存在し、終われば消えることも多い。「人を雇う」というより、**必要な認知プロセスを一時的に分岐する**と考えたほうが近い。

[Anthropic, “Create custom subagents”](https://code.claude.com/docs/en/sub-agents)

---

## 3. サブエージェントで分けられるのは「仕事」だけではない

サブエージェントを理解するうえで一番重要なのは、何を分離できるのかを見ることだ。

第一に、**context**を分けられる。大量の探索ログを親へ持ち込まない。

第二に、**instruction**を分けられる。「セキュリティだけを見る」「修正案は出さず、事実だけ調べる」「ドキュメントの一次情報だけ確認する」といった役割を固定できる。

第三に、**tool access**を分けられる。Claude Codeではread-onlyのsubagentを作れるし、Codexでもcustom agentごとにsandbox_modeやMCP serverを設定できる。調査担当には書き込み権限を渡さず、実装担当だけworkspace-writeにする、といった設計ができる。

第四に、**modelとreasoning effort**も分けられる。すべてを最高性能モデルへ投げる必要はない。大量のファイル探索は速いモデル、難しいレビューだけ高いreasoning、という分業が可能になる。

第五に、場合によっては**作業環境そのもの**も分けられる。Claude Codeではcustom subagentに`isolation: worktree`を指定し、一時的なGit worktreeで作業させられる。並列にコードを書くと衝突しやすいという問題に対して、物理的な作業ディレクトリまで分けるわけだ。

だからサブエージェント設計とは、単なるtask decompositionではない。より正確には、**context・instruction・permission・model・workspaceのdecomposition**である。

ここまで来ると、「AIがAIを呼ぶ」という見た目より、OSのプロセス分離やブラウザのタブ管理に近く見えてくる。

[OpenAI, “Subagents”](https://learn.chatgpt.com/docs/agent-configuration/subagents) / [Anthropic, “Create custom subagents”](https://code.claude.com/docs/en/sub-agents)

---

## 4. では、どんな仕事で使うと強いのか

公式資料を横断すると、向いている仕事にはかなり共通点がある。

一つ目は、**並列に進められる仕事**である。「セキュリティ」「テスト」「保守性」のレビューは、互いの結果を待たずに調べられる。3つを順番にやるより、3つのサブエージェントを同時に走らせたほうが速い。

二つ目は、**大量の情報を読むが、最後に必要なのは要約だけの仕事**である。ログ解析、コードベース探索、複数ドキュメントの調査などが典型だ。親AIが全部読むと会話が肥大化するが、サブエージェントなら「読んだ痕跡」を隔離できる。

三つ目は、**専門性を固定したい仕事**である。毎回「セキュリティ観点で」「一次情報だけ」「UIの回帰だけ」と長い指示を書くより、custom agentとして保存しておけばよい。

四つ目は、**fresh perspectiveが欲しい仕事**である。実装した本人と同じコンテキストを持つAIが自分のコードをレビューすると、その設計思想に引っ張られることがある。別コンテキストのreviewerに見せれば、少なくとも会話履歴上の思い込みは切り離せる。

要するに、サブエージェントの価値は「難しい仕事だから使う」ではない。**独立性が高く、途中経過がノイジーで、最後に圧縮できる仕事ほど向いている。**

Claudeのprompting guideも、subagentが有効な条件としてparallel work、isolated context、independent workstreamを挙げ、単純なsingle-file editなどでは直接作業したほうがよいと注意している。

[Anthropic, “Prompting best practices”](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/prompt-templates-and-variables)

---

## 5. 逆に、サブエージェントを増やすほどダメになる仕事もある

「複数AIなら強そう」という直感には罠がある。

たとえば、Aの出力を読んでBを決め、Bの結果を踏まえてCを修正する仕事は、本質的にsequentialである。これを無理に3体へ分けると、A→B→Cのたびに情報を受け渡す必要が生まれる。人間の会議と同じで、分業のための連絡が仕事そのものより大きくなる。

また、同じファイルを複数のsubagentが同時編集すると、write conflictが起きる。Codexの公式ドキュメントも、最初はread-heavyなexploration、tests、triage、summarizationから使い、parallel write-heavy workflowには慎重になるよう勧めている。

さらに当然だが、subagentは無料ではない。各agentが独立してmodel callとtool workを行うため、single-agentよりtoken usageが増える。Claude Code側も、subagentはそれぞれ独自contextを持つのでオーバーヘッドがあると説明している。

極端な例を考える。「READMEの誤字を一つ直して」と頼まれて、5体のAIが並列で調査会を始めたら、それは知的な分業ではない。豪華な遠回りである。

サブエージェントは**能力の追加装置というより、分離のコストを払ってでも分けたほうが得なときに使う装置**である。

[OpenAI, “Subagents”](https://learn.chatgpt.com/docs/agent-configuration/subagents) / [Anthropic, “How and when to use subagents in Claude Code”](https://claude.com/blog/subagents-in-claude-code)

---

## 6. Codexでは、まず「普通の日本語」で使える

ここから実用編に入る。

2026年9月時点のCodexでは、subagent workflowは現行リリースで標準的に使える。最初から設定ファイルを書く必要はない。まずは普通に依頼すればよい。

たとえば、PRレビューならこう頼める。

> このbranchをmainと比較してレビューして。3つのsubagentを並列で使って、①セキュリティ、②テスト不足、③保守性をそれぞれ調べて。全員の結果を待ってから、重要度順に統合して。ファイル名と根拠も付けて。

Codexの公式例もほぼこの形で、`spawn one subagent per point`、`delegate this work in parallel`のような直接指示を推奨している。CLIでは`/agent`を使うと、動いているagent threadへ切り替えて中身を確認できる。IDEやアプリでもsubagent threadが個別に表示される。

重要なのは、「サブエージェントを使って」だけで終わらず、**どう分けるか、全部待つか、何を返すか**まで指定することだ。

私は次の型が使いやすいと思う。

> このタスクを独立して進められる論点に分解し、必要な箇所だけsubagentへ委任してください。各subagentには重複しない責任範囲を与え、可能なものは並列実行してください。main agentは要件・判断・最終統合を保持してください。各subagentからは、生ログではなく「結論・根拠・未確定点」だけを回収してください。

これだけで「AIを増やす」から「コンテキストを整理する」に目的が変わる。

[OpenAI, “Subagents”](https://learn.chatgpt.com/docs/agent-configuration/subagents)

---

## 7. Codexで繰り返すなら、`.codex/agents/*.toml`に専門家を置く

同じ役割を何度も使うなら、Codexではcustom agentをファイルとして定義できる。project単位なら`.codex/agents/`、個人共通なら`~/.codex/agents/`にTOMLを置く。

たとえば、読み取り専用の`code_mapper`なら次のように考えられる。

```toml
name = "code_mapper"
description = "実装前に関連コードの実行経路を調べ、根拠付きで要約する読み取り専用agent"
model = "gpt-5.6-terra"
model_reasoning_effort = "medium"
sandbox_mode = "read-only"
developer_instructions = """
修正案を急いで出さず、まず実際の実行経路を特定する。
関連ファイル、entry point、state transition、依存関係を短く整理する。
main agentへは結論・根拠・未確認点だけを返す。
"""
```

レビュー担当は別にする。

```toml
name = "reviewer"
description = "実装後にcorrectness、security、regression、missing testsを点検するagent"
model = "gpt-5.6"
model_reasoning_effort = "high"
sandbox_mode = "read-only"
developer_instructions = """
styleより実害のある問題を優先する。
指摘には再現条件または根拠を付ける。
問題が見つからない場合は無理に指摘を作らない。
"""
```

そしてmain agentには、たとえばこう頼む。

> まずcode_mapperに影響範囲を調査させて。その結果を受けて自分で実装し、最後にreviewerへ独立レビューを依頼して。reviewerの指摘を鵜呑みにせず、main agentが根拠を確認して最終判断して。

これがかなり重要である。サブエージェントを作ると、つい「reviewerが言ったから直す」となりやすい。しかし統合責任はmain agentに残したほうがよい。サブエージェントは専門家であって、裁判官ではない。

Codexにはbuilt-inの`default`、`worker`、`explorer`もあり、globalでは`[agents]`設定で同時thread数やdefault subagent modelを調整できる。AGENTS.mdやskillに「この種の作業はsubagentへ委任する」と書いて、自動的な分業方針を持たせることもできる。

[OpenAI, “Subagents”](https://learn.chatgpt.com/docs/agent-configuration/subagents)

---

## 8. Claude Codeでは、Markdownで「専門家の人格」を置く

Claude Codeも、最初は自然言語で十分である。

> Use subagents. 認証処理、DB、フロントエンドの3領域を並列で調査して、最後に統合して。

あるいは、

> Have a separate agent review this change for security issues.

と頼めばよい。Claude Codeは状況に応じてbuilt-inのExplore、Plan、General-purposeなども使う。Exploreはread-onlyのコード探索、Planは計画前の調査、General-purposeは探索と実作業をまたぐ複雑な仕事向けに設計されている。

繰り返し使う専門家は`.claude/agents/`、全project共通なら`~/.claude/agents/`へMarkdownで置く。

```markdown
---
name: ui-regression-reviewer
description: UI変更後に回帰、不自然な状態遷移、モバイル崩れを点検する。実装後に使用する。
tools: Read, Grep, Glob
model: sonnet
---

あなたはUI回帰レビュー専門。
コードを変更しない。
問題を「再現条件 / 原因候補 / 影響 / 根拠ファイル」の順に返す。
見た目だけでなく、focus、scroll、keyboard、mobile viewportも確認する。
```

これを作れば、

> ui-regression-reviewerに今回の変更を見せて。

と呼び出せる。descriptionは単なる紹介文ではなく、Claudeが「いつこのagentへ委任するか」を判断する材料でもあるので、「何が得意か」より「どんな状況で呼ぶか」を具体的に書くほうがよい。

なお、Claude Codeは更新が速い。現在の公式ドキュメントでは、v2.1.198以降、`/agents`は以前の対話式作成wizardではなく、Claudeに作成を頼むか`.claude/agents/`を直接編集する案内を出す形へ変わっている。古い解説記事では「`/agents`でwizardを開く」と書かれている場合があるので注意が必要だ。

さらにClaude Codeは、custom subagentごとにtool、model、permission mode、memory、background、effort、MCP server、`isolation: worktree`などを設定できる。ここまで来ると「人格設定」より「実行環境のprofile」に近い。

[Anthropic, “Create custom subagents”](https://code.claude.com/docs/en/sub-agents) / [Anthropic, “How and when to use subagents in Claude Code”](https://claude.com/blog/subagents-in-claude-code)

---

## 9. CodexとClaude Code、考え方は同じだが「手触り」が少し違う

両者を並べると、共通部分のほうが大きい。

どちらも、main agentが仕事を分解し、subagentが別contextで作業し、結果をmainへ返す。どちらも並列探索、レビュー、調査に向く。どちらもcustom agentをproject単位とuser単位で持てる。どちらも役割ごとにmodelや権限を変えられる。

違いは、現在の設定文化にある。

Codexは`.codex/agents/*.toml`で、session configurationを分岐させる感覚が強い。model、reasoning effort、sandbox、MCP、skillsまで含めて「この役割のCodex session」を定義する。

Claude Codeは`.claude/agents/*.md`で、YAML frontmatter＋system promptという形が中心である。descriptionとpromptが前面に出るため、「専門家の役割定義」を書く感覚が比較的強い。さらにbackground、memory、hooks、worktree isolationなどを足していける。

だから、初心者のうちは製品差を暗記するより、共通の設計原則を覚えたほうがよい。

**mainは目的と統合を持つ。subagentは狭い責任を持つ。途中経過は隔離する。結果は圧縮して戻す。書き込みは必要最小限にする。**

製品のUIや設定ファイルは変わっても、この原則はかなり残るはずだ。

[OpenAI, “Subagents”](https://learn.chatgpt.com/docs/agent-configuration/subagents) / [Anthropic, “Create custom subagents”](https://code.claude.com/docs/en/sub-agents)

---

## 10. もう一歩やりすぎるなら、「同じ仕事」を1体と3体で比べてみる

概念を理解するには、実際に比較するのが一番早い。

同じPRに対して、次の2パターンを試す。

**A：single-agent**

> このPRをセキュリティ、テスト、保守性の観点でレビューして。

**B：subagents**

> 3つのsubagentを並列で使う。security、test coverage、maintainabilityを完全に分担し、互いの途中結果は共有しない。全員の終了後、main agentが重複を除去し、根拠を再確認して統合する。

比較するのは「答えの良さ」だけではない。

- 完了までの時間
- total token / usage
- 発見した問題数
- false positive数
- 同じ論点の重複率
- main contextに残ったノイズ量
- 最終回答の一貫性

ここまで測ると、サブエージェントが万能ではないことも見えてくるはずだ。小さなPRならAのほうが速くて安いかもしれない。大規模な変更ならBのほうが広く探索できるかもしれない。

さらに面白いのは、Bの3体を全部同じ「reviewer」にせず、役割と権限を変える実験である。read-only explorer、high-reasoning reviewer、docs-only researcherに分ける。すると、単なる多数決ではなく、**異なる認知経路を意図的に作る**実験になる。

サブエージェント設計の上手さは、何体呼ぶかではなく、**何を分離すると判断品質が上がるかを見抜けるか**にある。

---

## 11. 結局、サブエージェントとは何なのか

最初の疑問へ戻る。

AIが別のAIを呼ぶ。見た目だけなら、親分と子分である。実際、delegationという意味ではそれでよい。

しかし、調べる前より今のほうが、「部下」という言葉では足りない感じがする。

サブエージェントは、**AIの認知を一枚岩にしないための仕組み**である。

一つの会話に、探索も、実装も、レビューも、ログも、仕様書も、全部詰め込まない。ある仕事は別のcontextへ逃がす。ある仕事にはread-onlyしか渡さない。ある仕事だけ深く考えさせる。ある仕事は安いモデルで大量に回す。最後に必要なものだけ、mainへ戻す。

人間の組織で「誰に仕事を振るか」を考えるとき、私たちは人の能力や役割を見る。AIのsubagent設計では、それに加えて「どの情報を同じ頭の中に置かないか」を考える。

ここが妙で、そして重要だった。

サブエージェント時代に増えるのは、AIの人数ではない。

**一つの問題に対して、同時に持てる“別々の注意”の数である。**

だから次にAIへ複雑な仕事を頼むとき、「もっと賢く考えて」と言う前に、こう考える余地がある。

**この仕事、同じ机の上で全部やらせる必要ある？**

---

## 参考資料

- [OpenAI, Subagents](https://learn.chatgpt.com/docs/agent-configuration/subagents)
- [OpenAI, Introducing the Agents API](https://openai.com/index/introducing-the-agents-api/)
- [Anthropic, Create custom subagents](https://code.claude.com/docs/en/sub-agents)
- [Anthropic, How and when to use subagents in Claude Code](https://claude.com/blog/subagents-in-claude-code)
- [Anthropic, Prompting best practices](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/prompt-templates-and-variables)
