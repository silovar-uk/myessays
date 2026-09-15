---
id: ai-subagents-separate-context-workdesks
title: "AIに聞いたら、AIが増えた――サブエージェントは「部下」より「別の作業机」に近い"
subtitle: "Subagents as Context Architecture――仕事を分けるだけではなく、attention, memory, and permissionsを分ける"
mode: "english-mix"
english_ratio: 0.40
mix_unit: "sentence"
---

# AIに聞いたら、AIが増えた
## サブエージェントは「部下」より「別の作業机」に近い

AIに「このコードをレビューして」と頼む。Then that AI may call three more agents: one for security, one for tests, and one for maintainability, before the original AI combines their findings.

冷静に考えると、かなり変な光景である。

I asked one AI a question, but suddenly a tiny organization has appeared on the AI side. ここで「なるほど、サブエージェントとはAI版の部下なのか」と理解したくなる。実際、その比喩は半分くらい当たっている。The parent delegates, the child investigates, and the parent integrates.

しかし、OpenAI CodexとClaude Codeの現在の実装を追っていくと、この比喩だけでは肝心なところを取り逃がす。The core of subagents is less about increasing headcount and more about **separating context**.

もっと雑に言えば、サブエージェントは「部下」というより**a separate work desk**に近い。

Desk A holds requirements. Desk B reads noisy logs. Desk C checks API documentation. Desk D reviews code without changing it. それぞれの机には、必要な資料だけが置かれている。最後にメインの机へ「結論だけ」を持ち帰る。

Once you see subagents this way, it becomes much easier to understand when they help, why they can be faster, and why they sometimes make things worse.

---

## 1. まず、「AIがもう一人いる」と考えると少しズレる

普通のチャットAIは、一つの会話の中で調査も推論もコード編集も行う。That is convenient, but long tasks accumulate intermediate debris: search results, half-read files, failed hypotheses, test logs, errors, and abandoned fixes. 必要な情報も不要な情報も、同じ机の上へ積まれていく。

Codexの公式ドキュメントは、この状態をcontext pollutionやcontext rotという観点で説明し、サブエージェントを使う理由として「ノイズの多い作業をmain threadから外へ逃がす」ことを挙げている。Claude Code follows the same idea: a subagent works in its own context window and mainly returns its result to the main conversation.

つまり、サブエージェントで増えるのは「知能の頭数」だけではない。**You get more places to put attention.**

たとえば「認証処理の仕組みを調べてから、バグを直して」と一つのAIに頼む場合、認証関連の20ファイルを読んだ履歴も、その後の修正作業と同じ会話に残る。With a subagent, the exploration can stay elsewhere, while the main agent receives only something like “auth flows A→B→C; the likely cause is X.”

This resembles teamwork, but there is a subtle difference. 人を増やす理由は労働時間の総量を増やすことだが、サブエージェントでは**context pollution itself can be isolated for performance reasons**。

[OpenAI, “Subagents”](https://learn.chatgpt.com/docs/agent-configuration/subagents) / [Anthropic, “Create custom subagents”](https://code.claude.com/docs/en/sub-agents)

---

## 2. Tool、Subagent、Agent Teamは、似ているが役割が違う

ここで用語を一度整理したい。AI周辺の言葉は、全部「何かが何かを呼ぶ」ので非常に紛らわしい。

**Tool** is a tool the AI uses: search, file reading, shell, browser, database query, and so on. 道具は通常、自分で大きな判断ループを持たない。「このファイルを読んで」「このコマンドを実行して」という呼び出しに応じる。

**Subagent** receives a task and can run several steps inside its own context. ファイルを探し、読む順番を考え、必要なら別のツールを使い、最後に結果を返す。So it is closer to a small worker than to a tool.

一方、**Agent Team**や複数セッション型の仕組みは、さらに独立性が高い。Claude Code’s docs describe subagents as operating within a single session and distinguish them from cross-session messaging and agent teams that coordinate separate sessions.

会社に例えると少し分かる。Tool is a calculator or search system. Subagent is a temporary specialist inside the same project. Agent Team is a longer-lived setup where multiple workers keep their own lanes and coordinate.

ただし、この会社比喩にも限界がある。A subagent may exist only for seconds or minutes and disappear after returning its result. 「人を雇う」というより、**temporarily branching a cognitive process**と考えたほうが近い。

[Anthropic, “Create custom subagents”](https://code.claude.com/docs/en/sub-agents)

---

## 3. サブエージェントで分けられるのは「仕事」だけではない

サブエージェントを理解するうえで一番重要なのは、何を分離できるのかを見ることだ。

第一に、**context**を分けられる。大量の探索ログを親へ持ち込まない。

Second, you can separate **instructions**. 「セキュリティだけを見る」「修正案は出さず、事実だけ調べる」「ドキュメントの一次情報だけ確認する」といった役割を固定できる。

第三に、**tool access**を分けられる。Claude Code can make a subagent read-only, and Codex custom agents can define sandbox modes or MCP servers. 調査担当には書き込み権限を渡さず、実装担当だけworkspace-writeにする、といった設計ができる。

Fourth, you can separate **model and reasoning effort**. すべてを最高性能モデルへ投げる必要はない。大量のファイル探索は速いモデル、難しいレビューだけ高いreasoning、という分業が可能になる。

第五に、場合によっては**workspaceそのもの**も分けられる。Claude Code allows `isolation: worktree` on custom subagents, so a worker can operate in a temporary Git worktree. 並列にコードを書くと衝突しやすいという問題に対して、物理的な作業ディレクトリまで分けるわけだ。

だからサブエージェント設計とは、単なるtask decompositionではない。More precisely, it is **decomposition of context, instruction, permission, model, and workspace**.

At this point, “AI calling AI” starts to look less like an org chart and more like OS process isolation or browser tabs.

[OpenAI, “Subagents”](https://learn.chatgpt.com/docs/agent-configuration/subagents) / [Anthropic, “Create custom subagents”](https://code.claude.com/docs/en/sub-agents)

---

## 4. では、どんな仕事で使うと強いのか

公式資料を横断すると、向いている仕事にはかなり共通点がある。

一つ目は、**parallelizable work**である。「セキュリティ」「テスト」「保守性」のレビューは、互いの結果を待たずに調べられる。Three subagents can often finish sooner than one agent doing three independent passes sequentially.

二つ目は、**大量の情報を読むが、最後に必要なのは要約だけの仕事**である。Logs, codebase exploration, and multi-document research are classic examples. 親AIが全部読むと会話が肥大化するが、サブエージェントなら「読んだ痕跡」を隔離できる。

三つ目は、**specializationを固定したい仕事**である。毎回「セキュリティ観点で」「一次情報だけ」「UIの回帰だけ」と長い指示を書くより、custom agentとして保存しておけばよい。

Fourth, subagents help when you want a **fresh perspective**. 実装した本人と同じコンテキストを持つAIが自分のコードをレビューすると、その設計思想に引っ張られることがある。A separate reviewer context can at least remove assumptions inherited from the main conversation.

要するに、サブエージェントの価値は「難しい仕事だから使う」ではない。**They fit work that is independent, noisy in the middle, and compressible at the end.**

Claudeのprompting guideも、subagentが有効な条件としてparallel work、isolated context、independent workstreamを挙げ、単純なsingle-file editなどでは直接作業したほうがよいと注意している。

[Anthropic, “Prompting best practices”](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/prompt-templates-and-variables)

---

## 5. 逆に、サブエージェントを増やすほどダメになる仕事もある

「複数AIなら強そう」という直感には罠がある。

たとえば、Aの出力を読んでBを決め、Bの結果を踏まえてCを修正する仕事は、本質的にsequentialである。If you force that chain into three agents, every A→B→C boundary needs a handoff. 人間の会議と同じで、分業のための連絡が仕事そのものより大きくなる。

また、同じファイルを複数のsubagentが同時編集すると、write conflictが起きる。Codex explicitly recommends starting with read-heavy work such as exploration, tests, triage, and summarization, while being careful with parallel write-heavy workflows.

さらに当然だが、subagentは無料ではない。Each agent performs its own model calls and tool work, so a multi-agent run can use more tokens than a single-agent run. Claude Code側も、独自contextを持つぶんオーバーヘッドがあると説明している。

極端な例を考える。「READMEの誤字を一つ直して」と頼まれて、5体のAIが並列で調査会を始めたら、それは知的な分業ではない。It is a very expensive detour.

サブエージェントは**能力の追加装置というより、an isolation mechanism worth paying for only when separation pays back**である。

[OpenAI, “Subagents”](https://learn.chatgpt.com/docs/agent-configuration/subagents) / [Anthropic, “How and when to use subagents in Claude Code”](https://claude.com/blog/subagents-in-claude-code)

---

## 6. Codexでは、まず「普通の日本語」で使える

ここから実用編に入る。

As of September 2026, current Codex releases support subagent workflows directly. 最初から設定ファイルを書く必要はない。まずは普通に依頼すればよい。

PRレビューなら、たとえばこう頼める。

> Review this branch against main. 3つのsubagentを並列で使って、①セキュリティ、②テスト不足、③保守性をそれぞれ調べて。Wait for all three, then integrate the findings by severity with file references and evidence.

Codexの公式例もほぼこの形で、`spawn one subagent per point`、`delegate this work in parallel`のような直接指示を推奨している。In the CLI, `/agent` lets you switch into running agent threads and inspect them. IDEやアプリでもsubagent threadが個別に表示される。

重要なのは、「サブエージェントを使って」だけで終わらず、**how to divide the work, whether to wait, and what each agent should return**まで指定することだ。

私は次の型が使いやすいと思う。

> Break this task into independent workstreams and delegate only the parts that benefit from isolated context. 各subagentには重複しない責任範囲を与え、可能なものは並列実行してください。Keep requirements, decisions, and final integration in the main agent. 各subagentからは、生ログではなく「結論・根拠・未確定点」だけを回収してください。

これだけで「AIを増やす」から「コンテキストを整理する」に目的が変わる。

[OpenAI, “Subagents”](https://learn.chatgpt.com/docs/agent-configuration/subagents)

---

## 7. Codexで繰り返すなら、`.codex/agents/*.toml`に専門家を置く

同じ役割を何度も使うなら、Codexではcustom agentをファイルとして定義できる。For project scope, use `.codex/agents/`; for personal agents across projects, use `~/.codex/agents/`.

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

Then ask the main agent something like this.

> First have `code_mapper` investigate the affected paths. その結果を受けてmain agentが実装し、最後に`reviewer`へ独立レビューを依頼して。Do not accept the reviewer blindly; the main agent must verify the evidence and make the final decision.

これがかなり重要である。Once you create a named reviewer, it is tempting to think “the reviewer said so, therefore fix it.” しかし統合責任はmain agentに残したほうがよい。サブエージェントは専門家であって、裁判官ではない。

Codexにはbuilt-inの`default`、`worker`、`explorer`もあり、globalでは`[agents]`設定で同時thread数やdefault subagent modelを調整できる。You can also encode delegation policy in AGENTS.md or skills so Codex knows when to use subagents without repeating the instruction every time.

[OpenAI, “Subagents”](https://learn.chatgpt.com/docs/agent-configuration/subagents)

---

## 8. Claude Codeでは、Markdownで「専門家の人格」を置く

Claude Codeも、最初は自然言語で十分である。

> Use subagents. 認証処理、DB、フロントエンドの3領域を並列で調査して、最後に統合して。

あるいは、

> Have a separate agent review this change for security issues.

と頼めばよい。Claude Code can use built-in Explore, Plan, and General-purpose agents when appropriate. Explore is read-only code search, Plan researches before planning, and General-purpose handles more complex work that mixes exploration and action.

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

> Ask `ui-regression-reviewer` to inspect this change.

と呼び出せる。The description is not merely documentation; Claude uses it to decide when delegation is appropriate. なので「何が得意か」より「どんな状況で呼ぶか」を具体的に書くほうがよい。

なお、Claude Codeは更新が速い。Current official docs say that since v2.1.198, `/agents` no longer opens the old interactive creation wizard; it points you toward asking Claude to create an agent or editing `.claude/agents/` directly. 古い解説記事では「`/agents`でwizardを開く」と書かれている場合があるので注意が必要だ。

さらにClaude Codeは、custom subagentごとにtool、model、permission mode、memory、background、effort、MCP server、`isolation: worktree`などを設定できる。At that point, it looks less like a “persona” and more like an execution profile.

[Anthropic, “Create custom subagents”](https://code.claude.com/docs/en/sub-agents) / [Anthropic, “How and when to use subagents in Claude Code”](https://claude.com/blog/subagents-in-claude-code)

---

## 9. CodexとClaude Code、考え方は同じだが「手触り」が少し違う

両者を並べると、共通部分のほうが大きい。

Both systems let a main agent decompose work, send pieces into separate contexts, and bring results back. どちらも並列探索、レビュー、調査に向く。どちらもcustom agentをproject単位とuser単位で持てる。どちらも役割ごとにmodelや権限を変えられる。

違いは、現在の設定文化にある。

Codex uses `.codex/agents/*.toml`, so it feels like defining a specialized session configuration. model、reasoning effort、sandbox、MCP、skillsまで含めて「この役割のCodex session」を定義する。

Claude Codeは`.claude/agents/*.md`で、YAML frontmatter＋system promptという形が中心である。Because description and prompt are visually central, it feels more like defining a specialist role. さらにbackground、memory、hooks、worktree isolationなどを足していける。

だから、初心者のうちは製品差を暗記するより、共通の設計原則を覚えたほうがよい。

**The main agent owns purpose and integration. Subagents own narrow responsibilities. Intermediate noise stays isolated. Results return compressed. Write access stays minimal.**

製品のUIや設定ファイルは変わっても、この原則はかなり残るはずだ。

[OpenAI, “Subagents”](https://learn.chatgpt.com/docs/agent-configuration/subagents) / [Anthropic, “Create custom subagents”](https://code.claude.com/docs/en/sub-agents)

---

## 10. もう一歩やりすぎるなら、「同じ仕事」を1体と3体で比べてみる

概念を理解するには、実際に比較するのが一番早い。

同じPRに対して、次の2パターンを試す。

**A：single-agent**

> Review this PR for security, test coverage, and maintainability.

**B：subagents**

> Use three subagents in parallel. security、test coverage、maintainabilityを完全に分担し、互いの途中結果は共有しない。After all three finish, the main agent removes duplicates, re-checks evidence, and integrates the result.

比較するのは「答えの良さ」だけではない。

- completion time
- total token / usage
- 発見した問題数
- false positive数
- 同じ論点の重複率
- main contextに残ったノイズ量
- final answer consistency

ここまで測ると、サブエージェントが万能ではないことも見えてくるはずだ。A small PR may be faster and cheaper with A. 大規模な変更ならBのほうが広く探索できるかもしれない。

さらに面白いのは、Bの3体を全部同じ「reviewer」にせず、役割と権限を変える実験である。Use a read-only explorer, a high-reasoning reviewer, and a docs-only researcher. すると、単なる多数決ではなく、**異なる認知経路を意図的に作る**実験になる。

サブエージェント設計の上手さは、何体呼ぶかではなく、**what should be separated to improve judgment quality**を見抜けるかにある。

---

## 11. 結局、サブエージェントとは何なのか

最初の疑問へ戻る。

AIが別のAIを呼ぶ。見た目だけなら、親分と子分である。In terms of delegation, that is not wrong.

しかし、調べる前より今のほうが、「部下」という言葉では足りない感じがする。

A subagent is **a mechanism for preventing AI cognition from becoming one undifferentiated pile**.

一つの会話に、探索も、実装も、レビューも、ログも、仕様書も、全部詰め込まない。Some work moves to another context. ある仕事にはread-onlyしか渡さない。ある仕事だけ深く考えさせる。ある仕事は安いモデルで大量に回す。最後に必要なものだけ、mainへ戻す。

人間の組織で「誰に仕事を振るか」を考えるとき、私たちは人の能力や役割を見る。In subagent design, we must also ask **which information should not live inside the same head**.

ここが妙で、そして重要だった。

サブエージェント時代に増えるのは、AIの人数ではない。

**It is the number of separate attentional lanes one problem can hold at the same time.**

だから次にAIへ複雑な仕事を頼むとき、「もっと賢く考えて」と言う前に、こう考える余地がある。

**Does all of this work really need to happen on the same desk?**

---

## 参考資料

- [OpenAI, Subagents](https://learn.chatgpt.com/docs/agent-configuration/subagents)
- [OpenAI, Introducing the Agents API](https://openai.com/index/introducing-the-agents-api/)
- [Anthropic, Create custom subagents](https://code.claude.com/docs/en/sub-agents)
- [Anthropic, How and when to use subagents in Claude Code](https://claude.com/blog/subagents-in-claude-code)
- [Anthropic, Prompting best practices](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/prompt-templates-and-variables)
