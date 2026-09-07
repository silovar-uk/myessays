# MyEssays Reader V2 — Implementation Spec

Updated: 2026-09-07
Branch: `reader-v2-implementation`

## Goal

Implement the Reader V2 concept without rewriting the existing reader stack. The new layer must reuse the current article renderer, Reading Mode, browser-local notes, completion state, Reading Locator, related-article logic, and argument-structure tooling.

The UX priority is:

1. Reading stays primary.
2. Current location is always understandable.
3. Reopening returns to the previous semantic location with one action.
4. Reading Mode changes preserve semantic position.
5. Existing advanced functions remain available but stop competing with the text.

## Implementation strategy

Use an additive `reader-v2.js` / `reader-v2.css` layer loaded after the existing reader plugins.

Reasons:

- avoid destabilizing `app.js` routing and rendering;
- preserve old event contracts;
- allow rollback by removing two includes;
- reuse `data-reading-locator` emitted by `reading-locators.js` as the single paragraph-location foundation;
- leave current Reading Mode position restoration in place and add a locator-based final correction.

## DOM ownership

### Existing DOM retained

- `#readerView`
- `#readerAside`
- `#readerContent`
- `#backButton`
- `#noteTab`
- `#notePanel`
- `#readerLanguageSwitch`

### Reader V2 dynamically adds

- `.reader-v2-header`
- `.reader-v2-header-progress`
- `.reader-v2-map-toggle`
- `.reader-v2-map-backdrop`
- `.reader-v2-intro`
- `.reader-v2-article-info`
- `.reader-v2-resume`
- `.reader-v2-after-reading`

No parallel duplicate TOC is allowed. `#readerAside` itself becomes the Reader Map.

## Reader Map

Use visible H2 headings except the first subtitle H2 when it matches the essay subtitle.

Each item can show:

- passed state;
- current state;
- anchored-note state;
- previous-stop state.

Desktop: sticky rail.

Mobile: bottom sheet opened by one header action. Section selection scrolls and closes the sheet.

## Shared location API

Expose:

```js
window.MyEssaysReadingLocation = Object.freeze({
  current,
  currentSection,
  scrollToLocator,
  scrollToSection,
  refresh
});
```

The API consumes existing `[data-reading-locator]` blocks. No second paragraph numbering system may be introduced.

Dispatch:

`myessays:reading-location-changed`

with:

- `essayId`
- `locator`
- `sectionIndex`
- `sectionId`
- `sectionTitle`
- `progressRatio`

## Resume

Extend the existing `myessays:reading-state:<articleId>` JSON object with:

- `lastLocator`
- `lastSection`
- `lastSectionId`
- `lastSectionTitle`
- `lastProgressRatio`
- `lastSeenAt`

Do not auto-jump on open. Show one explicit `続きから読む` action.

Do not show Resume when:

- the essay is already completed;
- the stored position is near the beginning;
- no locator exists.

## Reading Mode continuity

Before a Reading Mode option is selected, capture the current canonical locator.

After `myessays:reader-version-changed`, use the shared location API to move to:

1. exact locator;
2. nearest locator in the same canonical section;
3. matching H2 section;
4. current built-in fallback.

The existing `reader-versions.js` position snapshot remains as the first-pass fallback.

## Article intro and progressive disclosure

The article title remains in the article.

Mark the subtitle H2 as `.reader-v2-subtitle` so it does not become a Reader Map chapter.

Default metadata line:

- date;
- estimated reading time;
- type.

Article Info disclosure contains lower-frequency metadata:

- updated;
- tags;
- favorite;
- grow;
- character count;
- full-copy action.

The existing `.reader-copy-button` is relocated into Article Info, not reimplemented.

## Anchored notes

Preserve existing article-level note text.

When `myessays:add-note-quote` fires, store a lightweight anchor record under:

`myessays:reader-note-anchors:v1:<articleId>`

with:

- locator;
- section index/title;
- selected text;
- createdAt.

This allows Reader Map note markers without breaking existing note storage.

## After Reading

Create `.reader-v2-after-reading` and move existing blocks into it when available:

1. `.reading-completion-zone`
2. `.reader-reflections`
3. `.reader-end-navigation`

Do not rewrite their logic in this iteration.

Visual changes:

- one parent visual rhythm;
- show only first two Related cards by default;
- emphasize next navigation over previous navigation;
- keep series-aware behavior from existing navigation logic.

## Argument structure

Do not create a competing Argument Lens implementation.

If the existing argument-structure plugin is active, Reader V2 must avoid breaking it. Advanced argument controls stay on-demand and are not promoted into the permanent primary header in this implementation.

## Accessibility

- map toggle uses `aria-expanded`;
- mobile map sheet uses `aria-hidden`;
- Escape closes the mobile map before leaving Reader;
- sticky header must not cover H2/H3 targets;
- mobile primary hit targets should be at least 44px where practical;
- focus-visible styles must remain obvious;
- backdrop click closes mobile map.

## Breakpoints to verify

- 390px
- 430px
- 768px
- 1024px
- 1440px

## Rollback

Reader V2 is additive. Rollback consists of removing:

- `reader-v2.css` include;
- `reader-v2.js` include.

Existing core files remain operational.

## Reject conditions

Do not ship if:

- both legacy TOC and Reader Map are visible;
- Reading Mode switch frequently jumps to the top;
- Resume overwrites the previous location immediately on page open;
- mobile Reader Map traps the user without a clear close action;
- article copy disappears entirely;
- notes or completion state stop working;
- the subtitle is treated as a chapter in Reader Map;
- normal article reading requires understanding Argument Structure controls.
