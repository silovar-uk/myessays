# MyEssays Visual QA Recovery Plan — Reading Mode Continuity

Updated: 2026-09-07

## 1. Goal

Restore the `Visual QA` workflow to a fully green state before further Reader V2 feature work.

The target is not merely to silence a failing assertion. The target is to restore one coherent reading-position contract across:

- Japanese canonical reading
- English Mix
- Español Mix
- Reader V2 current-location reporting
- Reader Version switching
- Reader Map / Resume / note anchors
- browser QA

The canonical paragraph coordinate is the existing `data-reading-locator` value.

## 2. Current state

The original seven static-test failures are no longer the active blocker.

Latest verified state at commit `5a137bf16d2b2a831805f03adf01b9672b0356b3`:

- content migration audit: pass
- integrity errors: 0
- warnings: 0
- known spec drift: 0
- static tests: 48 / 48 pass
- reading versions browser QA: fail
- Japanese Reference browser QA: skipped after the previous failure
- Argument Structure browser QA: skipped
- Page Reader browser QA: skipped
- general browser QA: skipped

The observed browser failure is:

```text
English Mix should preserve the exact canonical Reading Locator
actual:   5-7
expected: 5-1
```

The failure occurs after switching from Japanese to English Mix in `scripts/reading-versions-qa.cjs`.

## 3. Resolved root causes

### A. Xunzi derived-version identity mismatch — resolved

The repository now contains two distinct canonical articles and two distinct English Mix files:

- `xunzi-standard-friction-self-examination`
- `xunzi-borrowing-external-resources`

`data/versions-index.json`, filenames and frontmatter IDs now agree with the canonical IDs.

Do not reopen this area unless a new audit reproduces an identity error.

### B. Japanese Reference `align()` contract drift — resolved

`align()` again preserves its conservative public/test contract:

- resolved items return `{ ja, confidence }`
- structurally ambiguous items may remain `null`
- stronger positional fallback is confined to user-facing DOM pairing

Current static tests for Japanese Reference pass.

Do not weaken these tests or move the UI fallback into the conservative `align()` contract.

## 4. Active root cause hypothesis

### C. Two position-restoration models overwrite each other

Confidence: high.

There are currently two independent restoration passes during a Reading Mode switch.

### Pass 1 — `reader-versions.js`

`switchVersion()` captures a reading snapshot and, after the new version is rendered and pair identity is ready, calls `restoreReadingPosition()`.

That restoration explicitly aligns the target point to:

```text
window.innerHeight * 0.28
```

This is the same conceptual reading line used by the reader-position model.

Only after this restoration finishes does `reader-versions.js` dispatch:

```text
myessays:reader-version-changed
```

### Pass 2 — `reader-v2.js`

Before the mode-button click, Reader V2 stores:

```text
pendingVersionLocator = currentLocation().locator
```

When `myessays:reader-version-changed` fires, Reader V2 calls `restoreVersionLocator()`.

`restoreVersionLocator()` calls:

```text
scrollToLocator(locator, { behavior: 'auto' })
```

However, `scrollToLocator()` currently positions the target using a header-offset coordinate, while `currentLocation()` determines the active paragraph around the reader's 28% reading line.

Therefore the second restoration can overwrite the first restoration with a different vertical coordinate system.

For short paragraphs, the saved locator can be placed near the top of the viewport while the 28% reading line intersects several paragraphs later. This is consistent with the observed `5-1 → 5-7` mismatch.

## 5. Architectural rule

There must be one canonical paragraph coordinate and one canonical reading-line concept.

### Canonical paragraph identity

Use:

```text
data-reading-locator
```

### Canonical reading line

Use the reader's current reading-line calculation, approximately 28% of the viewport, with Reader V2 header clearance respected where necessary.

### Fallback hierarchy

For Reading Mode switching:

1. exact canonical Reading Locator
2. shared pair identity when exact locator is unavailable
3. same canonical section + relative position
4. article progress
5. top only as the final fallback

Do not let a lower-priority fallback overwrite a successful higher-priority restoration.

## 6. Recommended repair

### Preferred direction

Make exact locator restoration a shared semantic operation and remove the competing post-switch scroll behavior.

The safest implementation boundary is:

- `reader-versions.js` owns the Reading Mode transition lifecycle
- `reader-v2.js` exposes the canonical location API
- `reading-locators.js` owns locator assignment
- no component independently performs a second restoration after a successful switch

### Recommended sequence

#### Step 1 — instrument before changing behavior

Temporarily capture, in browser QA or a local diagnostic only:

- locator before switch
- snapshot pair ID
- scrollY after `restoreReadingPosition()`
- locator immediately after `restoreReadingPosition()`
- scrollY after `myessays:reader-version-changed`
- locator after Reader V2 `restoreVersionLocator()`

The purpose is to prove which pass changes `5-1` into `5-7`.

Do not ship permanent debug logging to production.

#### Step 2 — make exact locator the primary switch snapshot

When Reader V2 location API is available, capture the exact current locator as part of the Reading Mode snapshot.

Example semantic shape:

```js
{
  locator,
  pairId,
  pairProgress,
  sectionIndex,
  blockRatio,
  articleProgress
}
```

`locator` is primary. Existing fields remain fallbacks.

#### Step 3 — restore exact locator once

After the derived version has rendered and `reading-locators.js` has assigned canonical locators:

- restore the exact locator to the canonical reading line
- only if it does not exist, use pair / section / article fallbacks

A successful exact-locator restoration must terminate the fallback chain.

#### Step 4 — remove or neutralize Reader V2's duplicate post-event restoration

`pendingVersionLocator` must not cause a second scroll after `reader-versions.js` has already restored the switch position.

Two acceptable designs:

A. Preferred: `reader-versions.js` calls the shared Reader Location API and Reader V2 no longer restores on `myessays:reader-version-changed`.

B. Transitional: Reader V2 may keep compatibility restoration only when the switch event explicitly reports that no position restoration was performed.

Do not keep two unconditional scroll passes.

#### Step 5 — keep TOC navigation semantics separate

Reader Map / TOC navigation may intentionally place a heading below the sticky header.

That does not mean paragraph-location restoration should use the same vertical offset.

Use separate semantic operations:

- navigate to heading
- restore reading locator

Do not solve this by globally changing every Reader V2 scroll offset.

## 7. Changes that should be rejected

Reject any patch that:

- changes `scripts/reading-versions-qa.cjs` to accept approximate locator continuity
- removes the exact `before.locator === after.locator` assertion
- adds arbitrary timeouts until the test passes
- makes `5-7` acceptable because it is in the same section
- changes the canonical locator numbering to fit the current behavior
- weakens Japanese Reference alignment tests
- reintroduces a second paragraph-coordinate system
- makes Reader V2 visuals part of this repair
- globally changes TOC scrolling merely to fix mode switching

## 8. First implementation unit

The first code change should be one focused PR / commit:

**`Fix exact Reading Locator continuity across Reading Modes`**

Scope:

- `reader-versions.js`
- `reader-v2.js` only if required for the shared semantic API / duplicate-restoration removal
- `scripts/reading-versions-qa.cjs` only for additional non-weakened regression assertions or temporary diagnostics

Avoid unrelated CSS or Reader V2 layout changes.

### Acceptance criteria for this unit

On `confucius-knowing-liking-enjoying`:

```text
JA 5-1 → EN MIX 5-1 → ES MIX 5-1 → JA 5-1
```

must hold at the same reading-line definition.

Also verify at least one second locator away from the section start so the fix is not accidentally specific to `5-1`.

## 9. Full QA recovery sequence

After the first repair:

1. `node tools/audit-content.mjs --strict`
2. `node --test tests/*.test.js`
3. `node scripts/reading-versions-qa.cjs`
4. `node scripts/japanese-reference-qa.cjs`
5. `node scripts/argument-structure-qa.cjs`
6. `node scripts/page-reader-qa.cjs`
7. `node scripts/visual-qa.cjs`
8. run the complete GitHub Actions `Visual QA` workflow
9. verify GitHub Pages deployment
10. production smoke test on a long article with English Mix

Do not declare QA recovered merely because step 3 turns green. Each previously skipped browser stage must execute and pass.

## 10. Production smoke-test checklist

At minimum:

- switch JA → EN MIX in the middle of a section
- switch EN MIX → JA
- switch JA → Español Mix on the supported sample
- exact locator remains stable when a counterpart exists
- no jump to article top
- Reader Header current section remains correct
- Reader Map current section remains correct
- Resume still targets stored locator
- anchored memo markers still use the same locator namespace
- mobile mode controls remain inside viewport
- legacy language switch remains hidden when unified mode bar is active

## 11. Definition of done

QA recovery is complete only when all of the following are true:

- migration audit: 0 errors
- migration audit: 0 warnings
- static tests: all pass
- Reading Versions browser QA: pass
- Japanese Reference browser QA: pass
- Argument Structure browser QA: pass
- Page Reader browser QA: pass
- general browser QA: pass
- complete Visual QA workflow: success
- Pages deployment: success
- production smoke test: pass

Only after this state is reached should Reader V2 feature work resume.

## 12. Next action after approval

Implement only the exact-locator continuity repair, rerun `reading-versions-qa.cjs`, and then allow the workflow to reveal the next downstream browser failure, if any.

Do not preemptively modify Japanese Reference, Argument Structure, Page Reader or general visual QA before they actually run and produce evidence.
