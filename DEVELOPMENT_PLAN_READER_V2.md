# MyEssays Reader V2 — UX Development Plan

Updated: 2026-09-07
Status: proposed implementation plan
Priority: UX > novelty; convenience > fun

## 0. Goal

Transform MyEssays from a feature-rich article page into a reader that remembers where the reader is, where they stopped, and where they thought.

Core product sentence:

> 「記事を表示するWebサイト」から「自分がどこを読み、どこで考えたかを覚えてくれるReader」へ。

The V2 plan should not add more permanent controls. It should reorganize existing capability around three reading phases:

1. Enter — understand what this article is.
2. Read — keep the text primary and make location obvious.
3. Close — finish, leave a thought, and choose what to read next.

The primary surprise should be continuity, not animation:

- reopening an essay offers the exact previous reading location;
- switching Reading Mode keeps approximately the same semantic position;
- Reader Map shows current section, progress, previous stop, and note locations in one place.

---

## 1. Current implementation assets to preserve

Do not rebuild capabilities that already exist.

### Existing reader structure

- `index.html`
  - `#readerView`
  - `#readerAside`
  - `#readerContent`
  - browser-local note panel
- `app.js`
  - creates the current H2 TOC in `readerAside`;
  - renders article metadata into the same aside;
  - switches between Library and Reader routes.

### Existing reading state

- `reading-state-ui.js`
  - `openedAt`
  - `completedAt`
  - unread/opened/completed filtering
  - memo presence
  - completion action
- Preserve the article-ID-based storage model.

### Existing cross-mode location model

- `reading-locators.js`
  - assigns `data-reading-locator` to rendered content blocks;
  - maps derived Reading Modes back to canonical Japanese paragraph order;
  - already handles paragraph split/merge approximately by relative position.

This must become the sole location foundation for Reader V2.

Do not introduce a second competing paragraph-position system.

### Existing end navigation

- `reader-navigation.js`
  - related essays
  - series-aware previous/next navigation
  - ordinary previous/next navigation
- `reader-navigation.css`
  - current Related and end-of-reader presentation.

The recommendation logic can remain initially. Presentation should change later under one `After Reading` container.

### Existing content width

- `reader-content.css`
  - desktop Reader is currently `210px + 700px`;
  - article content is capped at `700px`;
  - mobile already collapses to one column below 820px.

Keep ~700px as the initial desktop reading-width baseline. Do not widen the article just because the new Reader Map becomes collapsible.

---

# 2. Information architecture change

## Current mental model

```text
Site Header
↓
Back
↓
[ Metadata + TOC ] [ Article ]
                      ↓
                    Copy
                      ↓
                 Completion
                      ↓
                 Reflection
                      ↓
                  Related
                      ↓
                Prev / Next
```

Problem: reading support is distributed across independent components.

## Reader V2 mental model

```text
Reader Header
↓
[ Reader Map ] [ Article ]
                  ↓
             After Reading
```

Reader V2 has only three conceptual UI layers:

### Persistent

Things useful while actively reading:

- Back to Library
- current section
- Reading Mode
- Reader Map trigger / panel
- note access
- reading progress

### On demand

Useful but not continuously needed:

- article metadata
- full article copy
- Japanese reference controls
- Argument Lens
- advanced actions

### After Reading

Only visible when the reader reaches the end:

- completion
- short reflection
- primary next article
- related essays
- Library return

---

# 3. Component-level diff

## 3.1 `readerAside` → `ReaderMap`

### Current

`app.js` injects both metadata and H2 links into `#readerAside`.

### V2

`#readerAside` becomes a dedicated Reader Map surface.

Remove from persistent aside:

- Type
- Created
- Updated
- Length
- Favorite
- Grow
- Tags

Move these into an on-demand `Article Info` disclosure near the article title or Reader Header menu.

Reader Map should display:

```text
CONTENTS

01  Section title          ✓
02  Section title          ● NOW
03  Section title          ✎
04  Section title

────────────
62% READ
前回: 02-4
メモ: 2
```

Meaning:

- `✓` = section already passed sufficiently during this reading history;
- `● NOW` = current section;
- `✎` = at least one note is anchored to this section;
- previous-stop indicator = most recently persisted locator.

### Desktop behavior

- sticky left rail;
- quiet visual treatment;
- current section strongly legible but not card-like;
- clicking section scrolls to H2;
- optional collapse only after V1 is stable.

### Mobile behavior

No persistent left rail.

Reader Map becomes a bottom sheet opened from the Reader Header.

Requirements:

- one tap to open;
- one tap on section to navigate;
- close automatically after section navigation;
- drag-to-dismiss is optional, not required for first implementation;
- Escape / explicit Close still supported where applicable.

### New files recommended

- `reader-map.js`
- `reader-map.css`

Do not grow `app.js` with all Reader Map logic.

---

## 3.2 Site Header → Reader Header

### Current

Reader inherits the global site header and then shows a separate `← Library` button.

### V2

When `#readerView` is visible, use a dedicated compact Reader Header.

Desktop conceptual layout:

```text
← Library | Current section                   JA ▾  Contents  Memo
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 62%
```

Mobile conceptual layout:

```text
←   Current section                    JA   ≡
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 62%
```

### Rules

- current **section title**, not full essay title, is the center contextual label after the introductory viewport;
- full essay title remains visible at the top of the article itself;
- progress is a thin visual line, not a large percentage badge;
- header must not cover anchored headings after navigation;
- all heading anchors need appropriate `scroll-margin-top`.

### New files recommended

- `reader-header.js`
- `reader-header.css`

The Header reads current location from the same Reader Locator / current-section service used by Reader Map.

---

## 3.3 Article intro → compact Entry block

### Current

Metadata is mostly in the left aside and reading stats are inserted into article content.

### V2

At the top of the article, show only comprehension-relevant metadata:

```text
Essay title
Subtitle

2026.09.07 · 約8分 · Review
JA / EN MIX

この記事について ▾
```

The disclosure can contain:

- Created
- Updated
- Tags
- Favorite
- Grow
- article ID if useful for maintenance
- full copy action

The default view should not expose maintenance-oriented metadata.

---

## 3.4 Reading Stats → quiet progress model

### Current

`reading-stats` shows characters and estimated minutes near the top.

### V2

Keep estimated reading time in the article intro.

Remove character count from the default reading surface.

Character count can remain inside Article Info if needed.

Reading progress during reading comes from the Reader Header / Reader Map.

---

## 3.5 Full Copy → On-demand action

### Current

`reading-state-ui.js` injects `reader-copy-button` directly near the beginning of article content.

### V2

Remove the persistent copy button from the article flow.

Move `全文コピー` into Article Info / overflow actions.

Keep the existing copy implementation.

This is relocation, not deletion.

---

## 3.6 Reading Locator → shared Reader Location API

`reading-locators.js` currently assigns locator data but does not expose a complete shared public read/navigation API.

Add a stable interface such as:

```js
window.MyEssaysReadingLocation = Object.freeze({
  current,
  currentSection,
  scrollToLocator,
  scrollToSection,
  refresh
});
```

Exact naming may differ, but the principle is mandatory:

Reader Header, Reader Map, Resume, Reading Mode switching, and note anchors all consume one location service.

### Required events

Provide a single semantic location event, for example:

```text
myessays:reading-location-changed
```

Payload should be sufficient to update UI without rescanning the entire document independently in every plugin.

Suggested data:

- essayId
- locator
- sectionIndex
- sectionId
- sectionTitle
- progressRatio

Avoid firing excessively. Use requestAnimationFrame and/or a suitable throttling strategy.

---

## 3.7 Reading State → Resume state

### Current

Reading state stores opened/completed state.

### V2 addition

Extend the same article-ID state with:

```json
{
  "openedAt": "...",
  "completedAt": null,
  "lastLocator": "2-4",
  "lastSection": 1,
  "lastSeenAt": "..."
}
```

Do not add a separate localStorage namespace for resume unless backward compatibility requires it.

### Persistence rule

Do not write on every raw scroll event.

Persist when:

- current locator meaningfully changes;
- user leaves / hides the page;
- route changes;
- after an appropriate debounce interval.

### Revisit UI

On reopening an unfinished essay, show a compact resume prompt near the top:

```text
前回は「ボールを持たずに前進する」の途中まで読みました。
[ 続きから読む ]
```

Do not auto-jump immediately on load.

Reason: opening the article may be intentional review from the beginning.

One explicit action preserves user control.

Hide the prompt when:

- no meaningful previous locator exists;
- article was completed and the user intentionally reopened it;
- previous position is too close to the top.

---

## 3.8 Reading Mode → same-place switching

### Principle

> Change language. Keep your place.

Before switching Reading Mode:

1. capture the current canonical locator;
2. render the destination mode;
3. assign destination locators;
4. move to the destination block with the same locator or nearest valid locator;
5. provide subtle temporary target feedback.

The existing canonical mapping in `reading-locators.js` must remain the basis.

### Fallback hierarchy

1. exact locator;
2. same canonical section + nearest locator;
3. same H2 section;
4. article top only as final fallback.

### Reject condition

A Reading Mode switch that commonly returns users to article top is not acceptable for Reader V2.

---

## 3.9 Notes → anchored notes

### Current

The article has browser-local article-level notes plus quote-to-note behavior.

### V2 model

Preserve article-level freeform memo for compatibility.

Add anchored note entries for new notes:

```json
{
  "id": "...",
  "articleId": "...",
  "readingLocator": "2-4",
  "sectionIndex": 1,
  "selectedText": "...",
  "text": "...",
  "createdAt": "...",
  "updatedAt": "..."
}
```

### Reader Map integration

A section with anchored notes gets a quiet `✎` marker.

Selecting the marker should show note entries and allow return to their locator.

### First implementation scope

Do not build a complex annotation editor immediately.

V1 anchored-note flow can be:

1. select text;
2. `メモに引用`;
3. existing memo UI opens with locator metadata attached internally;
4. save;
5. Reader Map receives marker.

---

## 3.10 Completion + Reflection + Navigation → After Reading

### Current

Completion, reflections, Related, series navigation and previous/next navigation appear as distinct visual zones.

### V2

One parent section:

```text
AFTER READING

ここで、ひと区切り。
[ 読了を記録 ]

読んで残ったこと
[ 一言メモ ]

NEXT
[ primary next article ]

RELATED
[ article ] [ article ]

Libraryへ戻る
```

### Primary next article rule

1. if current essay belongs to a series and a next series article exists: next series article;
2. otherwise: highest related score;
3. otherwise: ordinary next article fallback.

Do not show equally prominent competing "Next", "Related", and "Previous/Next" systems.

### Related count

Default to 2 visible related articles, not 4.

More can be available via secondary disclosure later.

---

## 3.11 Argument Structure → optional Argument Lens

Do not expose L1–L5 in default Reader UI.

Add only after core Reader V2 is stable.

Optional `論点を見る` mode can translate structural metadata into human-readable roles:

- 主張
- 根拠
- 記述
- 分析
- 反論
- 限定
- 橋渡し
- 含意

The lens should help orientation, not evaluate writing quality.

No score, grade, or progress gamification.

---

# 4. Files: recommended change map

## Add

- `reader-map.js`
- `reader-map.css`
- `reader-header.js`
- `reader-header.css`

Optional later:

- `reader-after-reading.js`
- `reader-after-reading.css`

Prefer extraction only when the existing navigation / completion files become harder to understand through incremental refactoring.

## Modify

### `index.html`

- add Reader Header mount point;
- add mobile Reader Map dialog / sheet mount point;
- include new CSS/JS files;
- keep existing DOM IDs until migration finishes.

### `app.js`

- stop generating metadata-heavy `readerAside` markup;
- stop owning TOC interaction once Reader Map takes responsibility;
- emit sufficient Reader lifecycle events;
- keep routing and canonical article rendering stable.

### `reading-locators.js`

- expose shared location service;
- expose `scrollToLocator` / current section;
- emit semantic location changes.

### `reading-state-ui.js`

- extend state with last locator / section / seen time;
- add Resume prompt behavior;
- relocate full-copy action out of article flow;
- preserve existing read/completion states.

### `reader-versions.js`

- preserve locator across Reading Mode render;
- use shared location API instead of independent location heuristics where possible.

### `reader-navigation.js`

- eventually change output from multiple independent ending systems into After Reading data / presentation;
- keep current recommendation and series sequence logic initially.

### `reader-navigation.css`

- reduce Related visual dominance;
- support consolidated After Reading layout.

### `reader-content.css`

- keep ~700px desktop reading width initially;
- adjust grid for Reader Map rail;
- ensure all headings have correct sticky-header scroll margins.

### `reading-status.css`

- remove persistent copy-button visual treatment once relocated;
- simplify completion area when wrapped inside After Reading.

---

# 5. Implementation PR sequence

Each PR must leave the Reader usable. Avoid a branch that only becomes coherent after six dependent changes.

## PR 1 — Reader V2 shell

Goal: change hierarchy without changing reading-state data.

Implement:

- Reader Header mount point;
- compact article intro;
- metadata disclosure;
- Reader Map shell using current H2 list;
- mobile Reader Map bottom sheet;
- hide/remove legacy metadata from persistent aside;
- move full copy to on-demand action.

Do not implement resume yet.

Acceptance:

- desktop and mobile remain fully navigable;
- all current essays render;
- Reading Modes still work;
- existing notes and completion still work;
- no duplicate TOC is visible.

## PR 2 — Shared Reading Location

Goal: make one location source of truth.

Implement:

- public Reader Location API in / around `reading-locators.js`;
- current section detection;
- progress ratio;
- location-changed event;
- Reader Header current section;
- Reader Map active section.

Acceptance:

- current section updates while scrolling without visible jank;
- clicking Reader Map updates scroll position correctly;
- header and map always agree on section.

## PR 3 — Resume

Goal: remember the reader's last meaningful location.

Implement:

- lastLocator;
- lastSection;
- lastSeenAt;
- persistence lifecycle;
- explicit `続きから読む` prompt.

Acceptance:

- leaving mid-article and reopening restores via one action;
- no unwanted auto-jump;
- top-of-article visits do not generate noisy resume prompts.

## PR 4 — Same-place Reading Mode switching

Goal: switching mode no longer loses context.

Implement locator capture → render → restore sequence.

Acceptance:

- JA ↔ EN MIX stays within the same semantic section;
- exact locator is used where possible;
- missing exact locator falls back gracefully;
- switch never appears broken when a destination mode has paragraph splits/merges.

## PR 5 — Reader Map history markers

Goal: Reader Map becomes a memory map.

Implement:

- passed sections;
- previous-stop marker;
- anchored-note markers if available;
- compact progress / memo summary.

Acceptance:

- markers communicate state without requiring a legend after first exposure;
- screen does not become visually noisy;
- accessibility labels explain icon state.

## PR 6 — After Reading consolidation

Goal: simplify the end of the essay.

Implement:

- one After Reading parent;
- completion;
- reflection;
- primary next;
- 2 related items;
- Library return.

Acceptance:

- only one clearly primary onward action;
- series next wins over generic recommendation;
- existing completion and reflection data are preserved.

## PR 7 — Anchored notes

Goal: let notes return to source context.

Implement locator metadata for quote-created notes and Reader Map markers.

Acceptance:

- clicking a note reference returns to source block;
- article-level legacy notes still render and remain editable;
- no migration destroys old notes.

## PR 8 — Argument Lens experiment

Goal: test a distinctly MyEssays navigation mode without burdening normal reading.

Implement only for essays with valid Structure metadata.

Acceptance:

- default Reader unchanged when Lens is off;
- no L1–L5 scoring language in ordinary UX;
- unstructured essays behave exactly as before.

---

# 6. UX acceptance criteria

Reader V2 is not done merely when the UI looks new.

Required:

- user can open Reader Map in one action on mobile;
- user can jump to any H2 in no more than two actions;
- reopening an unfinished essay can return to previous location in one action;
- Reading Mode switch preserves semantic location;
- Reader Header and Reader Map show the same current section;
- persistent reading controls stay at roughly 4–5 meaningful actions maximum;
- body text remains the most visually dominant element;
- anchored headings are never hidden behind sticky UI;
- all major controls remain keyboard reachable;
- reduced-motion preference does not damage comprehension;
- no feature requires hover to discover or operate on mobile.

---

# 7. Performance constraints

Reader V2 should reduce UI complexity, not just visual complexity.

Rules:

- do not create one independent scroll listener per Reader plugin;
- one shared location observer/event pipeline should feed Reader Map, Header, Resume and Reading Mode logic;
- do not write localStorage for every scroll frame;
- avoid layout reads followed by repeated layout writes across multiple modules;
- experimental Three.js features must not become mandatory Reader dependencies;
- consider loading article-specific or experimental modules only when relevant.

---

# 8. Reject conditions

Stop and redesign if any of these happen:

- legacy TOC and Reader Map are both visible;
- persistent metadata remains in Reader Map;
- copy action still occupies article flow after V2 shell;
- multiple modules calculate separate "current paragraph" states;
- Reading Mode switch often returns to article top;
- Reader Map needs more than one explanatory paragraph to understand;
- mobile Reader requires multiple floating action buttons;
- note markers become more visually prominent than section titles;
- After Reading shows three equally strong onward-navigation choices;
- Argument Lens becomes default;
- animation is added without reducing effort or improving state comprehension.

---

# 9. Validation strategy

Do not judge success by dwell time alone.

## Functional scenarios

Test at minimum:

1. open a short essay fresh;
2. open a long essay fresh;
3. scroll to middle, leave, reopen, Resume;
4. switch JA → EN MIX in middle of section;
5. switch EN MIX → JA near section boundary;
6. create a quote note and return to it;
7. complete an essay;
8. reopen completed essay;
9. read a series article and reach After Reading;
10. test article without alternate Reading Mode;
11. test article without Structure metadata;
12. test mobile Safari back-forward restoration.

## UI viewports

At minimum:

- 390px mobile
- 430px mobile
- 768px tablet
- 1024px compact desktop
- 1440px desktop

## Quality signals

Prefer:

- navigation effort;
- position recovery accuracy;
- number of persistent controls;
- layout stability;
- keyboard / touch operability;
- failure rate of Reading Mode position restoration.

---

# 10. First implementation instruction

The first coding task should be **PR 1 — Reader V2 shell only**.

Do not implement all phases at once.

PR 1 should answer one question:

> Can MyEssays feel like a focused Reader before introducing any new intelligence?

If the answer is no, do not proceed to Resume or Argument Lens yet.

The first visible win should come from hierarchy:

- smaller Reader Header;
- quieter article intro;
- dedicated Reader Map;
- no persistent metadata clutter;
- no persistent full-copy button;
- mobile bottom-sheet navigation.

Only after this base feels clearly better should location intelligence become visible.

---

# 11. Next plan after this document

Once this plan is accepted, proceed in this order:

1. Build a **PR 1 implementation spec** with exact DOM ownership and migration boundaries.
2. Define the **Reader Location API contract** before PR 2 coding.
3. Create a small **state compatibility note** describing old reading-state and note data that must not be broken.
4. Implement PR 1 behind a temporary Reader V2 feature flag if practical.
5. Perform visual/interaction QA on the Fagiano Okayama essay plus one short essay and one article with Reading Modes.
6. Only then start PR 2.

The next document should therefore be:

`IMPLEMENTATION_SPEC_READER_V2_PR1.md`

It should contain:

- exact DOM before/after;
- component ownership;
- files changed;
- class / ID compatibility rules;
- mobile bottom-sheet behavior;
- focus and keyboard behavior;
- visual hierarchy rules;
- migration steps;
- rollback strategy;
- PR 1 test checklist;
- explicit out-of-scope list.
