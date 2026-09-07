# Consulting Nine-Masu Essay — UX / Implementation Plan

Updated: 2026-09-07
Status: implemented; final QA completed on latest main
Priority: UX > novelty; convenience > fun

## 0. Decision

Adopt **B + C as progressive enhancement**:

- Baseline: the essay must remain fully readable as ordinary MyEssays Markdown.
- Enhancement: add a compact interactive `9-MASU OVERVIEW` that navigates to sections 1–9 and reflects the current section.
- Beyond: place `10 / OUTSIDE THE GRID` visually outside the 3×3 grid as a secondary destination after the nine cells.

Do **not** build a separate mini-app, separate scroll-position model, or article-specific router.

The surprise should be conceptual: after the reader understands the nine-cell framework, the interface reveals that the most important final question sits outside the framework.

## 1. Research findings that affect design

### 1.1 Meaning of the consulting nine-masu

Public summaries of Satoshi Takamatsu's *コンサルが「最初の3年間」で学ぶコト* describe section 043, `9マス vs 空パック`, as dividing a whiteboard into 3×3 and treating the cells as nine provisional slides before producing the deck.

Section 045, `「9マス」を半分信じる vs 「9マス」を全て信じる`, is publicly summarized as treating the nine-masu as a design document that can change rather than as a fixed truth.

Design implication:

> The UI must communicate both **overview** and **provisionality**. A beautiful fixed grid without an outside / revision concept would teach only half the idea.

Sources:

- Publisher: https://www.socym.co.jp/book/1398
- Public summary: https://note.com/growthstrategy_f/n/ne4da01b54557

### 1.2 MyEssays constraints

Current MyEssays content contract:

- Japanese is canonical under `essays/`.
- `en-mix` is a Reading Mode under `english-mix/`, sharing the canonical article ID.
- H2-level semantic alignment should remain broadly corresponding across Reading Modes.
- Cross-mode location must continue to use the existing Reading Locator foundation.

Reader V2 direction already prioritizes:

- Reader Header
- Reader Map
- one shared reading-location source
- same-place Reading Mode switching
- progressive disclosure
- convenience over novelty

Design implication:

> Nine-Masu Overview is a **content-specific alternate overview**, not a replacement for Reader Map and not a new location system.

## 2. 守 — preserve the reader contract

Keep:

- standard article intro
- ~700px reading width baseline
- Reader Header / current section
- Reader Map
- Reading Mode switching
- existing Reading Locator data
- notes and completion behavior
- After Reading

The Japanese and English Mix articles remain useful if all Nine-Masu enhancement JS/CSS is disabled.

Reject any design that requires the reader to understand a new global navigation model.

## 3. 破 — Nine-Masu Overview

### 3.1 Placement

Insert after article introduction and before section 1.

Conceptual structure:

```text
9-MASU OVERVIEW

┌────────┬────────┬────────┐
│ 01 先に見る │ 02 空パック │ 03 実験      │
├────────┼────────┼────────┤
│ 04 粒度     │ 05 順序      │ 06 罠        │
├────────┼────────┼────────┤
│ 07 半信      │ 08 制約      │ 09 使う      │
└────────┴────────┴────────┘

                         10 OUTSIDE
```

Labels may be refined for clarity, but remain short enough for 320–375px screens.

### 3.2 Cell behavior

Each cell:

- is a real button/link with an accessible name;
- maps to one of H2 sections 1–9;
- uses the same shared section / reading-location data as Reader Map;
- scrolls through the existing location/navigation service where possible;
- shows the current section with a quiet visual state;
- optionally distinguishes passed sections, but does not turn reading into gamification.

Do not store independent `nineMasuProgress` state.

### 3.3 Current-state semantics

Use three visual states at most:

- default
- current
- passed

No scores, percentages inside individual cells, confetti, completion animation, or mandatory sequence.

The reader may jump directly to any cell.

## 4. 離 — Outside the Grid

`10 / OUTSIDE THE GRID` is not the tenth cell.

It must be visually separated from the 3×3 geometry.

Purpose:

- embody the essay's final claim;
- remind the reader that the framework is provisional;
- provide navigation to the `OUTSIDE THE GRID` section.

Interaction rule:

- Always discoverable, but visually secondary at first.
- It may gain emphasis when the reader reaches section 6–9 or when the current section is `OUTSIDE THE GRID`.
- Do not hide it behind an animation that requires all nine sections to be visited. That would turn a conceptual point into a progress mechanic and could make the useful destination undiscoverable.

Preferred surprise:

> The reader initially sees a complete-looking 3×3 system, then notices a deliberately detached tenth destination. The surprise is spatial, not animated.

## 5. Mobile UX

Primary breakpoint to validate: 375px. Also test 320px.

Requirements:

- preserve an actual 3×3 overview; do not convert to horizontal scroll;
- each cell has a minimum interactive target of roughly 44×44 CSS px or larger where feasible;
- labels use one or two short lines;
- no tiny descriptive copy inside cells;
- no hover dependency;
- clear focus state;
- grid does not compete with sticky Reader Header;
- scrolling to a section respects `scroll-margin-top` / header offset.

W3C reference for enhanced target size: https://www.w3.org/WAI/WCAG22/Understanding/target-size-enhanced.html

## 6. Progressive disclosure

Do not duplicate full TOC detail inside the 9 cells.

Nine-Masu Overview gives only:

- number
- short concept label
- current-state signal

Reader Map remains the detailed navigation surface.

This follows the progressive-disclosure principle: keep the primary surface focused and leave secondary detail on demand.

Reference: https://www.nngroup.com/articles/progressive-disclosure/

## 7. Activation strategy

Do not hard-code the article ID throughout UI code.

Preferred implementation order:

1. Determine whether the current Markdown/runtime already supports a safe semantic marker or front-matter extension.
2. If yes, use a generic opt-in marker such as a content experience key.
3. If not, add the smallest generic content contract that can support article-specific overview experiences without changing ordinary article output.
4. Keep all Nine-Masu enhancement code no-op for articles without the marker.

Avoid adding a second parsing convention if an existing article metadata/plugin mechanism already exists.

## 8. Files already added in this branch

- `essays/2026-09-07-consulting-nine-masu-storyboard.md`
- `english-mix/consulting-nine-masu-storyboard.md`

Both share:

- canonical ID: `consulting-nine-masu-storyboard`
- broadly aligned H2 structure
- the same factual claims and sources

## 9. Remaining content registration

Before merge:

- add canonical Japanese path to `data/index.json`;
- add `en-mix` path under `consulting-nine-masu-storyboard` in `data/versions-index.json`;
- confirm derived Reading Mode is not added as a second canonical article.

## 10. Recommended implementation PR sequence

### PR A — Content baseline

Includes:

- Japanese essay
- English Mix
- index registration
- versions registration

Acceptance:

- both modes render normally with zero Nine-Masu-specific JS;
- same article ID;
- H2 order maps semantically;
- sources render as links;
- Reading Mode switch remains valid.

### PR B — Semantic overview enhancement

Implement:

- generic opt-in marker / experience contract;
- `9-MASU OVERVIEW` renderer;
- section navigation;
- current/passed states sourced from existing reading location;
- detached `OUTSIDE THE GRID` destination;
- desktop/mobile CSS.

Acceptance:

- JS disabled: article still fully understandable;
- no duplicate location store;
- no impact on ordinary articles;
- 320 / 375px usable;
- keyboard navigation works.

### PR C — Reader integration QA

Validate:

- JA → EN MIX at cells/sections 1, 5, 9 and OUTSIDE;
- EN MIX → JA at same positions;
- Reader Map and Nine-Masu Overview agree about current section;
- Resume returns to the same semantic region;
- sticky header offsets are correct;
- no regression for articles without the experience.

Only after this passes should optional polish be considered.

## 11. Explicitly deferred

Do not build yet:

- drag-and-drop editable nine-masu
- PNG export
- save-your-own-grid
- per-cell notes
- animated cell reveals
- completion rewards
- mandatory sequential reading
- a generic visual-builder framework

These are fun before they are useful.

## 12. Final quality question

Before shipping the interactive layer, answer:

> If a first-time reader never reads any UI instructions, does this page make the idea of the nine-masu easier to understand and navigate than an ordinary article?

If no, keep the ordinary Reader and remove the enhancement.