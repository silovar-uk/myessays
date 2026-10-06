---
id: onenote-what-kind-of-box-binder-infinite-canvas
title: "OneNoteは何の箱なのか――Think of it as a binder plus an infinite canvas"
subtitle: "Notebook／Section／Page／Subpageを、仕事で迷わないmental modelへ翻訳する"
created: "2026-10-06"
updated: "2026-10-06"
type: "リサーチエッセイ"
status: "完成"
tags: ["OneNote", "Microsoft 365", "information architecture", "note-taking", "knowledge management", "productivity"]
keywords: ["Notebook", "Section Group", "Section", "Page", "Subpage", "Note Container", "search", "tags", "information architecture"]
grow: 5
abstract: "OneNote is hard to grasp if we call it only a note-taking app. Microsoft’s own model is closer to a searchable three-ring binder, while each page behaves like an infinite canvas. This essay separates those two layers and turns them into a practical rule: Notebook as boundary, Section as durable category, and Page as one event, question, research task, or deliverable."
---

# OneNoteは何の箱なのか
## 「バインダー＋無限キャンバス」で考えると急に分かる

A OneNote “page” has no bottom.

ページなのにpaper sizeが固定されず、click anywhereして書ける。Text does not have to flow as one continuous document; it sits inside movable Note Containers. さらに、そのPageはSectionに入り、SectionはNotebookに入る。必要なら、その間にSection Groupまで挟める。

It uses the language of paper without behaving like paper. ここがOneNoteを初見でhard to modelにしている。

Microsoft itself explains OneNote using paper notebooks and three-ring binders. A notebook contains sections, and sections contain pages and subpages. At the same time, each page is an “infinite canvas” where notes can be placed almost anywhere. つまりOneNoteは、単なるdigital notebookでもfolder-based file managerでもない。

The thesis is simple: **OneNote is a searchable three-ring binder whose individual sheets happen to be infinite canvases.** このtwo-layer modelを分けると、Notebook、Section、Pageの違いがかなり見えやすくなる。

> **Information date: 2026-10-06**
>
> This essay separates Microsoft-documented behavior as fact, the mental model derived from it as interpretation, and the work setup as proposal. OneNote does not have one mandatory organizational style; Microsoft explicitly leaves organization flexible.

Sources: [Microsoft, “Organize your notes”](https://support.microsoft.com/en-us/onenote/organize-your-notes) ／ [Microsoft, “Introducing OneNote”](https://support.microsoft.com/en-US/OneNote/onenote-help-and-learning/introducing-onenote)

## 1. 分かりにくさの正体は、「紙の比喩」と「デジタルの構造」が重なっていることにある

If you think of OneNote as “a lighter Word,” its behavior gets strange very quickly. Word mostly gives you one document flow from top to bottom. In OneNote, clicking another spot on the page can create another Note Container. そのcontainerはmove and resizeでき、textだけでなくimages, audio/video, handwriting, and screen clippingsも保持できる。

So a OneNote Page is closer to a work surface than to one document file. 複数のcontent boxesをそのsurfaceへ置く。その作業面を束ねるのがSectionで、その束をさらにまとめるのがNotebookである。

Bring in a file-system mental model and questions appear immediately: Is a Page a file? Is a Section a folder? Is a Notebook a project? None maps perfectly. OneNote overlays search, tags, links, and sync onto a paper-binder hierarchy.

The useful starting point is therefore not “Which app is this like?” but **which parts define an address and which part is the workspace**. Notebook, Section, and Page define the address. Pageの内側だけは、急にfree-form deskになる。

Sources: [Microsoft, “Work with note containers”](https://support.microsoft.com/en-US/OneNote/onenote-help-and-learning/work-with-note-containers) ／ [Microsoft, “Introducing OneNote”](https://support.microsoft.com/en-US/OneNote/onenote-help-and-learning/introducing-onenote)

## 2. 箱は実質五層あるが、最初から五層すべてを使う必要はない

If we describe the structure precisely, OneNote has more boxes than its simple UI suggests. Microsoft’s documentation can be translated into this practical hierarchy.

- **Notebook**：top-level binder。複数のSectionを持つ。
- **Section Group**：optional container for many Sections。Microsoft describes it as somewhat like a folder on a hard drive.
- **Section**：tabbed divider。関連するPagesをまとめる。
- **Page**：the basic surface where actual content lives.
- **Subpage**：an indented Page used to create a parent-child group。Microsoft’s current documentation allows two levels.
- **Note Container**：a movable content box on a Page。これはnavigation hierarchyではなくPage内部の部品。

> Notebook
> → Section Group（optional）
> → Section
> → Page
> → Subpage
> → Note Containers inside the Page

This list can create a dangerous feeling that every layer should be used. でもSection Groupはofficially optionalで、Sectionsが増えたときの整理手段として説明されている。Subpageもrelated pagesを束ねる補助機能であり、deep folder treeを作る仕組みではない。

So the first useful model is only **Notebook → Section → Page**. Section GroupとSubpageは、organization becomes painfulになった時に足すextension partsと考えた方が迷いにくい。

Sources: [Microsoft, “Create a section group in OneNote”](https://support.microsoft.com/en-us/onenote/create-a-section-group-in-onenote) ／ [Microsoft, “Create a subpage in OneNote”](https://support.microsoft.com/en-us/onenote/onenote-help-and-learning/create-a-subpage-in-onenote)

## 3. Notebookは「テーマ」より、簡単には混ぜたくない境界として使うと崩れにくい

So what belongs in the biggest box, the Notebook? From here, this is a workflow proposal rather than a product rule.

If every interesting topic becomes a Notebook, the count grows quickly: meetings, learning, Client A, marketing, AI, books. Then every capture starts with a classification decision: which Notebook is correct? 情報整理のためのtaxonomyが、capture costを増やしてしまう。

A more stable rule is to use Notebook as **a boundary you do not casually mix**. 例えばwork vs personal、company account vs private account、あるいはsharing scopeやretentionが大きく違う領域。OneNote for the web documentation also frames sharing around the notebook rather than an isolated single page, so sharing can naturally reinforce this “large boundary” model.

This does not mean fewer notebooks are always better. Microsoft documents both options: use Section Groups to manage a large notebook, or split content into a few smaller notebooks. There is no single correct topology.

Still, creating another Notebook creates another “world” to switch into. だから本稿では、**Notebookはfrequently created topic boxではなく、context, permission, or lifecycleが大きく違うときに切るboundary**として使うことを勧める。

Sources: [Microsoft, “Create a section group in OneNote”](https://support.microsoft.com/en-us/onenote/create-a-section-group-in-onenote) ／ [Microsoft, “Share notes during a meeting in OneNote for the web”](https://support.microsoft.com/en-us/onenote/onenote-for-web-help-and-learning/share-notes-during-a-meeting-in-onenote-for-the-web)

## 4. Sectionは「長く残る分類」、Pageは「一件の出来事・問い」と考えると迷いが減る

The everyday question is usually not “What is a Notebook?” but “Does this deserve a Section, or is it only a Page?” この境界はphysical sizeより**time horizon**で考えると分かりやすい。

A Section works well when multiple Pages will keep accumulating and you will repeatedly browse them as a set. Microsoft describes Sections as tabbed divisions for pages around a subject or topic. 継続案件、research theme、recurring meetings、learning domainなどはSectionになりやすい。

A Page, by contrast, can represent one meeting, one question, one research task, or one deliverable. 例えば「2026-10-06｜A社定例」「OneNoteの箱構造」「競合三社の比較」「次回ヒアリング論点」という粒度である。

This also improves retrieval because Page titles become meaningful search-result labels. 日付、相手、問い、deliverableをtitleへ入れておけば、後からhierarchyを正確にたどらなくても戻りやすい。

The rule is: **Section is a shelf; Page is one recordable unit of work.** Sectionを細かくしすぎるよりPagesを増やし、必要ならlater move themする方がOneNoteのflexibilityと噛み合う。

Sources: [Microsoft, “Organize your notes”](https://support.microsoft.com/en-us/onenote/organize-your-notes) ／ [Microsoft, “Rearrange section tabs and page tabs in OneNote for Windows”](https://support.microsoft.com/en-us/onenote/onenote-help-and-learning/rearrange-section-tabs-and-page-tabs-in-onenote-for-windows)

## 5. Section GroupとSubpageは「最初から設計する階層」ではなく、混雑したときの逃がし弁である

When a hierarchy exists, we feel an urge to use it. Section GroupもSubpageも便利だが、最初からprecise taxonomyを設計すると、every capture begins with a tiny review meeting: “Where is the correct place for this?”

Microsoft explains Section Group as something to consider when there are too many Sections to fit comfortably. In other words, it is a response to growth, not necessarily the first design move. 例えば案件Sectionsが増えた時に“Projects” Section Groupを作り、そこへまとめる。

Subpage follows the same logic. It is strong when the parent is obvious: under “Client A Kickoff,” you might place “Interviews,” “Competitor Research,” and “Issue Notes.” 一方、Subpageはtwo levelsまでなので、file serverのようなdeep taxonomyには向いていない。

The operating principle is simple: **start flat, then fold only where congestion appears**. 分類を先に完成させるのではなく、information volumeが増えた場所にだけ追加のboxを置く。

OneNote is less “organize first, then write” and more “write now, move later.” このorderを逆にしない方がcapture speedを失いにくい。

Sources: [Microsoft, “Create a section group in OneNote”](https://support.microsoft.com/en-us/onenote/create-a-section-group-in-onenote) ／ [Microsoft, “Create a subpage in OneNote”](https://support.microsoft.com/en-us/onenote/onenote-help-and-learning/create-a-subpage-in-onenote)

## 6. Pageは「文書」ではなく無限の机なので、自由配置は使えるが、使わなくてもよい

Open a Page and OneNote’s strangest design choice appears. Microsoft calls each Page an “infinite canvas”; you can click almost anywhere and type. The content sits in Note Containers that can be moved, resized, or merged.

This is powerful for lecture notes, annotated screenshots, diagrams plus prose, and rough meeting thinking. ただしtext-heavy work memoでもeverywhere clickしてcontainersを増やすと、reading orderが曖昧になりやすい。Being allowed to place things freely does not mean you should always do so.

My practical proposal for work notes is to **grow one main container vertically**. Use headings and bullets in a readable top-to-bottom flow, and move sideways only when position carries meaning—diagrams, images, comparisons, side notes. Microsoft’s accessibility guidance also recommends consolidating information into a single Note Container where practical for screen-reader users.

OneNote’s freedom is not an obligation to perform canvas acrobatics every time. **The freedom is that a Page can behave like a document or like a desk.**

Sources: [Microsoft, “Introducing OneNote”](https://support.microsoft.com/en-US/OneNote/onenote-help-and-learning/introducing-onenote) ／ [Microsoft, “Work with note containers”](https://support.microsoft.com/en-US/OneNote/onenote-help-and-learning/work-with-note-containers) ／ [Microsoft, “Make your OneNote notebooks accessible to people with disabilities”](https://support.microsoft.com/en-us/accessibility/onenote/make-your-onenote-notebooks-accessible-to-people-with-disabilities)

## 7. 階層だけで整理しない。検索とタグが「横から取り出す軸」になる

In folder systems, the address matters because you often retrieve by navigating the same path. OneNote gives you other retrieval routes. Microsoft lets search scope range from the current Page through Section, Section Group, Notebook, and all open Notebooks; on Windows, Ctrl＋E expands to all-notebook search.

Tags add another axis. They can be attached to a line or paragraph, not only to the whole Page, and items such as To Do, Important, or Question can be found across locations. OneNote can also create links to Notebooks, Sections, Pages, and even specific paragraphs.

Separate the jobs and the structure becomes clearer.

- **Hierarchy** answers “Where does this live?”
- **Tags** answer “What meaning or status does this carry across places?”
- **Search** retrieves it even when you forgot the address.
- **Links** create a direct route from somewhere else.

For example, you do not need a Section named “Needs Review.” Keep the note in its project context and add a Question tag to the relevant line. 住所とstatusをsame classification axisへ押し込まない、ということだ。

**The strongest reason not to overbuild OneNote’s hierarchy is that hierarchy is not the only retrieval mechanism.** 整理を減らしても、retrievabilityまで同時に捨てるわけではない。

Sources: [Microsoft, “Search notes in OneNote”](https://support.microsoft.com/en-us/OneNote/onenote-help-and-learning/search-notes-in-onenote) ／ [Microsoft, “Search for tagged notes in OneNote”](https://support.microsoft.com/en-us/onenote/onenote-help-and-learning/search-for-tagged-notes-in-onenote) ／ [Microsoft, “Create links to notebooks, sections, pages, and paragraphs”](https://support.microsoft.com/en-us/onenote/create-links-to-notebooks-sections-pages-and-paragraphs)

## 8. OneNoteは「住所の縦軸」と「検索の横軸」を重ねた二次元の情報箱と考えるとよい

At this point we can answer the original question more precisely.

Vertically, OneNote has a storage hierarchy: Notebook → Section → Page, optionally expanded with Section Groups and Subpages. That is the binder logic. Horizontally, search, tags, and links let you retrieve or connect information across those locations. こちらはpaper binderにはなかったdigital indexである。

Mix the two roles and you get the anxiety that the hierarchy must predict every future use. But search reduces that requirement. 今の自分が置き場所を判断できる程度にcoarseでよい。

Go too far in the other direction—dump everything into one Section and rely only on search—and browsing becomes weak. Hierarchy still matters because it lets related things sit next to each other and be scanned as a set. 検索があるからclassification不要でも、classificationがあるからsearch不要でもない。

**Hierarchy is for browsing; search is for recall.** OneNoteはこのtwo-mode retrievalを併用する道具と理解すると、「箱をどう切るか」の答えがtaxonomyではなくuse caseから決まる。

## 9. 仕事で始めるなら、「Notebookは少なく、Pageは惜しまず」が扱いやすい

Now turn the model into a starting setup for work. The proposal is deliberately incomplete: do not build the final architecture before you have real notes.

For consulting work, start with one “Work” Notebook and only a few top-level Sections such as “00 Inbox,” “Internal,” and “Learning.” 案件が少ないうちはproject nameをSectionとして並べてもよい。When projects accumulate, then create a “Projects” Section Group and move project Sections inside it.

Inside each project Section, create Pages freely: “2026-10-06｜Weekly,” “Competitor Map,” “Initial Hypotheses,” “Interview Design,” “Next Proposal Issues.” 半年分を一枚の“A社メモ”へ書き続けるより、searchable titleを持つunitsを増やす。

Seven rules are enough.

- New Notebook: permission, account, context, or retention horizon is materially different.
- New Section: Pages around the same subject will keep accumulating.
- New Page: one new meeting, question, research task, or deliverable exists.
- Section Group: Sections have become crowded.
- Subpage: there is an obvious parent Page.
- Tag: you need cross-cutting status such as task, question, or important.
- When unsure: before creating a new box, create one Page in the closest existing Section.

With this setup, capture usually requires only one decision: “Which Section?” 分類精度を少し捨てる代わりに、starting frictionを小さくする。

**In OneNote, adding Pages is usually easier to repair later than multiplying boxes.** これをinitial design principleにすると、「何をどこへ置けばいいか分からない」がかなり減る。

## 10. 調べる前より、OneNoteが曖昧に見える理由そのものが分かった

The original question was simple: what kind of box is OneNote?

Before researching it, I suspected Notebook, Section, and Page felt vague because Microsoft had chosen confusing names. 調べると少し違った。OneNote is not primarily a tool for enforcing a strict taxonomy. It gives you a loose binder-like address, then leaves the inside of the Page and the retrieval path unusually flexible.

That ambiguity is not only a defect. Microsoft explicitly says OneNote is not limited to one organizational style; Pages and Sections can be moved later, and search cuts across the hierarchy. 完璧なclassification tableを先に作らなくても始められる余白が、product behaviorの中に残されている。

Freedom can still become clutter. The answer is not to master every level. If you can explain only three rules in your own words—Notebook as boundary, Section as durable category, Page as one event—you already have enough structure to start. 残りはpainが出た時点で足せばよい。

**OneNote is not an app for creating more and more boxes. It is an app for keeping the boxes few, creating Pages freely, and recovering meaning later through search, tags, links, and movement.**

If “Which box is correct?” stops you, create one Page in the Section you are already in. たぶん、その雑さを許すためにOneNoteはこういう形をしている。

## 実務で使うためのOneNote構造設計プロンプト

The following is a practical prompt derived from the model above. 現在のNotebook、Section、Page一覧を渡し、taxonomyを増やしすぎずにredesignする用途を想定している。

> You are an expert in information architecture and knowledge management. 私のOneNote構成を、capture時の迷いを減らし、後からsearch and browseしやすい形へ再設計してください。Treat Notebook as a large boundary that should not be casually mixed, Section as a durable category, and Page as one meeting, question, research task, or deliverable. Section Group and Subpage are optional; propose them only when they solve current congestion. First diagnose the current setup under these lenses: mixed boundaries, inconsistent Section granularity, oversized Pages, overly deep hierarchy, classifications better handled by tags, and classifications better handled by search. Then provide a minimal-change plan and an ideal-state plan. For each change, specify what moves where, why, and the future trigger for creating a new Notebook, Section, or Page. Do not optimize for tidy taxonomy itself; optimize for fewer decisions before writing starts.

## 参考資料

- Microsoft Support, “Organize your notes”: Notebook, Section, Page, Subpage, and the three-ring-binder metaphor. [Official](https://support.microsoft.com/en-us/onenote/organize-your-notes)
- Microsoft Support, “Introducing OneNote”: Pages as an infinite canvas and free-form note placement. [Official](https://support.microsoft.com/en-US/OneNote/onenote-help-and-learning/introducing-onenote)
- Microsoft Support, “Work with note containers”: moving, resizing, merging, and content types in Note Containers. [Official](https://support.microsoft.com/en-US/OneNote/onenote-help-and-learning/work-with-note-containers)
- Microsoft Support, “Create a section group in OneNote”: Section Groups are optional and useful when Sections become numerous. [Official](https://support.microsoft.com/en-us/onenote/create-a-section-group-in-onenote)
- Microsoft Support, “Create a subpage in OneNote”: how Subpages create local parent-child organization. [Official](https://support.microsoft.com/en-us/onenote/onenote-help-and-learning/create-a-subpage-in-onenote)
- Microsoft Support, “Search notes in OneNote”: search scope from the current Page to all Notebooks. [Official](https://support.microsoft.com/en-us/OneNote/onenote-help-and-learning/search-notes-in-onenote)
- Microsoft Support, “Search for tagged notes in OneNote”: finding tagged notes across locations. [Official](https://support.microsoft.com/en-us/onenote/onenote-help-and-learning/search-for-tagged-notes-in-onenote)
- Microsoft Support, “Create links to notebooks, sections, pages, and paragraphs”: direct links across OneNote’s hierarchy. [Official](https://support.microsoft.com/en-us/onenote/create-links-to-notebooks-sections-pages-and-paragraphs)
