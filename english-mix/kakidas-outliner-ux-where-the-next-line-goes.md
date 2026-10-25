---
id: "kakidas-outliner-ux-where-the-next-line-goes"
title: "点を押すと枝が閉じる――Where Does the Next Thought Go?"
subtitle: "Designing an outliner around predictability, recovery, and the next line"
created: "2026-10-25"
updated: "2026-10-25"
type: "Essay"
status: "完成"
mode: "english-mix"
tags: ["kakidas", "アウトライナー", "UX", "守破離", "認知科学"]
keywords: ["outliner", "cognitive offloading", "information scent", "focus management", "Workflowy", "mobile editing"]
grow: 5
abstract: "kakidasのoutlinerは、番号・ビュレット切替、Undo、独立したdraftを手に入れた。But the real question is not feature count. コード監査とWorkflowy、W3C、Appleの設計文書から、predictable insertion、reversible actions、safe touch targets、そして未分類の思考を受け止める設計を提案する。"
---

# 点を押すと枝が閉じる――Where Does the Next Thought Go?

*Research date: October 25, 2026. Public GitHub source audit and comparison with first-party product documentation, accessibility guidance, and cognitive-science research. This is desk research, not a user study or an iPhone Safari device test.*

A tiny bullet can carry a surprising amount of responsibility. kakidasで「•」を押すと子項目が閉じる。Workflowyでは、公式ヘルプによればそのbulletをクリックするとzoomし、隣のtriangleでcollapseする。[Workflowy: Navigate around](https://workflowy.com/help/navigate-around) Same mark, different promise.

A user should not have to decode the grammar of the interface every time an idea appears. kakidasには番号切替、Undo、独立した書き口が追加された。But adding features is not the same as removing friction. 私たちが本当に改善したいのは、**the distance between a thought and its next line** ではないだろうか。

## 守｜そもそもアウトライナーとは、箇条書きではなく「関係を外に出す道具」である

An outliner is not merely a list with indentation. 親と子、兄弟同士、順序というrelationshipsを可視化する道具だ。たとえば「スポーツ事業」を親にして「市場規模」「参入障壁」を置き、参入障壁の下に「権利」「流通」「営業網」を置く。Without hierarchy, they are fragments. With hierarchy, they become a tentative model of a market.

Risko and Gilbert's review on **cognitive offloading** describes how people use the body and external environment to reduce internal processing demands. 紙に図を描くのも、アプリに階層を置くのも、この視点から理解できる。[Risko & Gilbert (2016)](https://pubmed.ncbi.nlm.nih.gov/27542527/) But the research does not prove that a particular outliner UI improves thinking. それは別途、ユーザー研究で確かめるべき仮説だ。

The paradox is elegant and cruel. 頭から構造を外へ出すためのtoolが、「いま何段目？」「次のEnterはどこへ？」「これは段落に保存されるの？」というmental workを増やしてしまったら、外部化の価値を相殺する。**A good outliner should relieve more cognitive work than it creates.**

## 守｜Workflowyの「点」はズームする。kakidasの「点」は折りたたむ

Workflowy separates two actions in its official interaction model: a bullet opens a focused view, while a neighboring arrow expands or collapses children. Breadcrumbs return you to a parent; multiple panes preserve separate navigation histories.[Workflowy navigation](https://workflowy.com/help/navigate-around) / [Panes](https://workflowy.com/help/panes)

![Official Workflowy mirror illustration; not a screenshot of kakidas](https://cdn.prod.website-files.com/608aecd1e643ecaa961a7a67/662c4d8c2e2074187d8744f5_6525bdb42d96ab0a0f13ed13_image1.gif)

*Image reference: [Workflowy official Mirrors explanation](https://workflowy.com/learn/mirrors/). The image illustrates the product's hierarchy; its precise current interface must not be inferred from this image alone.*

In kakidas, the current `OutlineList.tsx` renders a clickable bullet or hierarchical number for nodes with children. Tapping it invokes `toggleCollapsed`. 集中表示の`zoomTo`は別にあり、スマホでは主に「⋯」から辿る。[Source code](https://github.com/silovar-uk/kakidas/blob/main/src/components/OutlineList.tsx)

The lesson is **not** "copy Workflowy." 役割を統合して余白を減らすことにも意味がある。The question is whether the user can predict the outcome before tapping. 同じアイコンの見た目を美しく削ることと、その動作を分かりやすくすることは、別々に評価する必要がある。

## 守｜「小さな見た目」と「大きな押しやすさ」は別物である

Apple recommends a touch hit area of at least **44 × 44 points** for buttons. 一方、kakidasはビュレットと本文の見える距離を詰めるため、行頭の幅を文字に合わせている。Mobile CSS provides a 44px-tall marker, but it does not establish a comparably wide target.[Apple HIG: Buttons](https://developer.apple.com/jp/design/human-interface-guidelines/buttons)

This is a genuine design tension. 見える余白は4px程度にしたい。でも指で押す場所は広く取りたい。Making an invisible tap target larger may steal taps from the text itself. だから「CSS上の幅を変えれば解決」とは言えない。

**Visual density is not touch accuracy.** 評価するべきなのは、行頭操作を押し間違えないことと、すぐ隣の文字を選び損ねないこと、その両方である。

## 守｜コード監査：便利な機能は揃いつつあるが、意味の継ぎ目に負債がある

A source-code audit produces facts about implementation, not measured behavior. 次の表はその区別を保った整理だ。

| 実装で確認できること | UX hypothesis / engineering concern |
|---|---|
| PCでは選択してEnterで編集、mobileでは選択済みの行を再度タップして編集 | A user may not understand why editing requires a second tap |
| Parent bullets/numbers collapse children | The parent/leaf distinction may be too subtle |
| Zoom and breadcrumbs exist, while mobile zoom is less visible | Discoverability of focus mode may be weak |
| Insertion uses `parentId` and `index` | The next destination may not match the user's mental model |
| Outline Undo records saved text edits and moves | Users may mistakenly expect create/delete to be reversible through the same control |
| Distinct draft IDs now exist for sentence, paragraph, and word | Stored metadata must agree with those IDs |

One issue is more concrete than a hypothesis. `EntryComposer.tsx` generates the draft ID with `buildEntryDraftId(memoId, kind, ...)`, but passes `kind: isDesk ? "sentence" : kind` into `useDraftPersistence`. So a paragraph draft can have a paragraph-shaped ID while storing `sentence` as its `kind` field. これは集計・移行・保守のための**data integrity mismatch**だ。It does not prove actual data loss, and ID-based restoration may still work. けれども、「下書きを守る」ことがプロダクトの約束なら、まずここを修正・テストしたい。[EntryComposer](https://github.com/silovar-uk/kakidas/blob/main/src/components/EntryComposer.tsx) / [draftRepository](https://github.com/silovar-uk/kakidas/blob/main/src/repositories/draftRepository.ts)

## 破｜不満が集中する場所を見直す。「次の一行がどこへ行くか」が核心ではないか

Now for abductive reasoning: what single explanation could connect complaints about spacing, overlapping symbols, undo, and drafts jumping between panels?

Perhaps the true problem is **uncertainty about the next action's destination**. 番号かビュレットか、段落かアウトラインか、開閉かズームか。どれも「見ていた場所と、実際に変更される場所が一致するか」という問題を含んでいる。

I would separate three positions:

- **Data location** — 保存時の親、兄弟順序、項目の種類。
- **View location** — いま見ている枝、ズーム深度、スクロール位置。
- **Editing location** — 次の文字と下書きが入る場所。

These are not identical states. そして現行kakidasは独立した書き口へ進んだ一方、アウトライン内では選択や折りたたみが挿入位置と関係する。**Predictability, not raw speed, may be the largest UX opportunity.** ただしこれは仮説だ。Measuring error recovery and intended-versus-actual insertion would determine whether it is true.

## 破｜改修の主語を「行」から「次の操作」に変える

A conventional feature checklist asks what we can add to each row: zoom, collapse, detail, link, complete. でも実際の行動は「一行書く→並べる→眺める→戻す→続きを書く」と流れている。We should design the transitions, not only the object.

Consider a **next-line preview**: 選択中の行の近くに、次の一行が入る場所を一瞬だけ示す。Enter means add a sibling; Tab changes the nesting destination. 現行のkakidasには、次の挿入先を読み上げるdescriptionの計算がすでにある。This is not a proposal to add more persistent labels, but to make that existing information visible at exactly the moment of uncertainty.

```text
Market attractiveness
  Market size
  Entry barriers
    Rights and permissions
    ─── next line goes here ───
  Growth potential

Enter: add here
Tab: change depth
Esc: leave safely
```

The diagram describes a proposal, not deployed behavior. 特にiPhoneでは画面を説明で埋めず、入力・移動・構造操作の直後だけ表示する方がよさそうだ。

## 破｜競合製品をまねるなら、機能ではなく「予測の規則」をまねる

Workflowy's fundamentals are strikingly compact: Enter creates another bullet; Tab indents; Shift+Enter opens a note associated with the bullet.[Workflowy help](https://workflowy.com/help/add-edit-format) The product has extensive shortcuts, but everyday actions follow a learnable grammar.

kakidas does not need to become a smaller Workflowy. Its distinctive idea is the separation of short structural thinking, longer paragraphs, and supporting URLs. **An outline, an explanation, and the evidence for it can remain different things.** それを一つの巨大ツリーに押し込む必要はない。

Instead, make the verbs explicit. 「段落を開く」はnavigation、「段落にする」はconversion。「取り消す」はdata changeを戻す。「前の枝へ」はview navigation。Even the word "Back" needs a destination. 同じ動詞を異なる意味で使わないだけでも、操作の安心感は高まるはずだ。

## 破｜優先順位を決める。「見栄え」より「誤操作の回復」を先に直す

Here is a hypothesis-driven implementation order. この順位は実測結果ではなく、コード監査と設計文献から立てた案だ。

| Priority | Change | What to verify |
|---|---|---|
| P0 | Fix draft ID/`kind` integrity and test old-draft restoration | No overwritten or unrecoverable draft |
| P0 | Preview the next insertion location, briefly | User predicts the correct parent/index |
| P0 | Clarify Undo's scope; design reversible creation/deletion | Recovery from an accidental action |
| P1 | Signal which bullets have hidden children | First-try collapse/expand success |
| P1 | Validate the mobile 44-point hit area without stealing text taps | False taps on marker or text |
| P1 | Make selection, editing and moving follow one consistent rule | Time to first successful edit |
| P2 | Surface focused-view navigation and return history | Time to find the previous branch |
| P2 | Enable searching within the current branch | Return-to-information time |
| Hold | Auto-structure by AI, complex dragging, new visual themes | Wait until core failures are addressed |

NN/g's **user control and freedom** heuristic emphasizes reversibility and safe exits. Freedom to make a mistake is also freedom to explore.[NN/g: User control and freedom](https://www.nngroup.com/articles/user-control-and-freedom/) But permanently displaying every possible control would crowd the writing surface. **Progressive disclosure** offers the balancing principle: show core actions first, advanced ones on demand.[NN/g: Progressive disclosure](https://www.nngroup.com/articles/progressive-disclosure/)

## 離｜アウトライナーは本来、思考を木構造に閉じ込める道具ではない

Here is the counterproposal: **What if an outliner is the wrong starting screen?**

When researching a market, ideas rarely arrive in hierarchical order. 「この数字はおかしい」「顧客の課題が違う」「競合はむしろ安い」。These arrive as fragments, not as a prearranged tree. Asking for parent and depth too early may encourage premature classification. That is a design hypothesis, not a proven kakidas-specific psychological harm.

Maybe the first screen should be an **inbox for unclassified thoughts**. まず投げ込む。集まったら似たものを並べ、関係が見えたときだけ階層を作る。Later, a paragraph can turn a relation into an argument, and a polished view can turn the argument into something readable.

```text
Capture — don't classify yet
    ↓
Arrange — discover relationships
    ↓
Outline — expose a structure
    ↓
Explain — write the paragraph
    ↓
Publish — make the thought readable
```

The answer is not five more tabs. 同じデータを違う認知段階で見るだけなら、UIを増やさず実現できる可能性がある。Start with inbox-to-outline, and resist designing the entire future system before observing use.

## 離｜一番大事なのは「情報を置いた場所」ではなく「戻って来られる道」ではないか

Pirolli and Card's **information foraging theory** examines the trade-off between the value of information and the cost of finding it.[Original CHI paper, 1995](https://chi1995.acm.org/proceedings/papers/ppp_bdy.htm) Hierarchy helps us file information. But our actual work unfolds over time.

You wrote a hypothesis yesterday. Today you want its evidence. 明日は反論を付け足したい。The best feature may be neither automatic tagging nor a fancier hierarchy; it may be **a reliable path back to the thinking context**.

Workflowy documents independent back/forward navigation, breadcrumbs, and scroll positions for panes.[Official panes help](https://workflowy.com/help/panes) kakidasなら、PCでは参照する枝の固定表示、iPhoneでは「ひとつ前の枝へ」の一本から試すのがよいかもしれない。

But beware: navigation Back and data Undo are different. One moves your viewpoint. The other changes your work. ここを混ぜないことは、見た目の美学ではなく信頼の条件だ。

## 検証｜再リサーチで提案をどう削ったか

The second pass removed three tempting ideas. First, "make the dot zoom like Workflowy" was too simplistic; kakidas has valid reasons to use it for collapse. Second, "make the left gutter 44px wide" risked sacrificing text density without proving tap accuracy. Third, AI-driven restructuring was postponed because it might reproduce the very feeling we want to eliminate: **my thought moved without my permission**.

W3C's Tree View guidance separates keyboard focus from selection and describes left/right expansion and parent navigation, up/down movement, and expected accessibility semantics.[W3C Tree View Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/treeview/) kakidasにも矢印操作はある。しかし、IME変換中の入力、iPhone Safariの選択範囲、スクロール復帰、ブラウザ再読込についてはテストが不可欠だ。

A useful test fixture: three roots, each with children and grandchildren. Then measure: add sibling, indent, collapse, zoom, go back, undo a move, switch between outline and paragraph with unfinished drafts, reload, disconnect from network. **The primary metric is whether the stored result matches what the user expected.** Fewer taps matter, but no lost words matter more.

## 結論｜最高のアウトライナーは、思考の途中で存在を忘れられる

The best outliner may be the one that disappears during thinking. 次の一行がどこへ入るかを予想でき、間違えたら戻せ、まだ関係が見えていない思考には分類を迫らない。

Start by fixing data integrity, insertion predictability, reversible actions, and mobile tap reliability. Then improve focused navigation and history. And finally consider the deeper inversion: **the moment before structure exists may be exactly the moment worth protecting.**

kakidasが目指せるのは、a prettier bullet listではない。**A workbench where fragments become structure without losing their freedom.**

## 調査資料・参照リンク

- [kakidas: OutlineList source](https://github.com/silovar-uk/kakidas/blob/main/src/components/OutlineList.tsx)
- [kakidas: EntryComposer source](https://github.com/silovar-uk/kakidas/blob/main/src/components/EntryComposer.tsx)
- [kakidas: draftRepository source](https://github.com/silovar-uk/kakidas/blob/main/src/repositories/draftRepository.ts)
- [Workflowy: Navigate around](https://workflowy.com/help/navigate-around)
- [Workflowy: Add, edit and format](https://workflowy.com/help/add-edit-format)
- [Workflowy: Panes](https://workflowy.com/help/panes)
- [W3C: Tree View Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/treeview/)
- [Apple HIG: Buttons](https://developer.apple.com/jp/design/human-interface-guidelines/buttons)
- [Nielsen Norman Group: User control and freedom](https://www.nngroup.com/articles/user-control-and-freedom/)
- [Risko & Gilbert (2016): Cognitive Offloading](https://pubmed.ncbi.nlm.nih.gov/27542527/)
- [Pirolli & Card (1995): Information Foraging](https://chi1995.acm.org/proceedings/papers/ppp_bdy.htm)
