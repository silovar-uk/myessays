from pathlib import Path


def read(path):
    return Path(path).read_text()


def write(path, text):
    Path(path).write_text(text)


def replace_once(text, old, new, label):
    count = text.count(old)
    if count != 1:
        raise SystemExit(f'{label}: expected exactly 1 anchor, got {count}')
    return text.replace(old, new, 1)


# 1) Progress UI: ui-enhancements keeps persistence/discovery only.
path = 'ui-enhancements.js'
text = read(path)
text = replace_once(text, """  const track = document.createElement('div');
  track.className = 'reading-progress-track';
  track.setAttribute('aria-hidden', 'true');
  const bar = document.createElement('div');
  bar.className = 'reading-progress-bar';
  track.appendChild(bar);
  document.body.appendChild(track);

""", "", 'remove legacy progress DOM')
start = text.index('  function updateProgress() {')
end = text.index('  function updateMemoDot()', start)
text = text[:start] + text[end:]
text = replace_once(text, """    window.scrollTo({ top: target, behavior: 'auto' });
    updateProgress();
""", """    window.scrollTo({ top: target, behavior: 'auto' });
""", 'remove restore progress update')
text = replace_once(text, """      updateHeaderMode();
      updateProgress();
      updateMemoDot();
""", """      updateHeaderMode();
      updateMemoDot();
""", 'remove sync progress update')
text = replace_once(text, """  window.addEventListener('scroll', () => {
    updateProgress();
    queueSaveReadingPosition();
  }, { passive: true });
  window.addEventListener('resize', updateProgress);
""", """  window.addEventListener('scroll', queueSaveReadingPosition, { passive: true });
""", 'remove legacy progress listeners')
if 'reading-progress-track' in text or 'function updateProgress' in text:
    raise SystemExit('legacy progress owner still exists in ui-enhancements.js')
write(path, text)

# 2) showReader can rebuild a language version without forcing page top.
path = 'app.js'
text = read(path)
text = replace_once(text, 'function showReader(essay) {', 'function showReader(essay, { preserveScroll = false } = {}) {', 'showReader options')
text = replace_once(text, '  window.scrollTo(0,0);', '  if (!preserveScroll) window.scrollTo(0,0);', 'conditional scroll reset')
write(path, text)

# 3) Reading Locators becomes the semantic progress owner.
path = 'reading-locators.js'
text = read(path)
text = replace_once(text, """  let semanticSwitchAnchor = null;
  let semanticEyeLineReference = null;
  let semanticRestoreActive = false;
""", """  let semanticSwitchAnchor = null;
  let semanticEyeLineReference = null;
  let semanticRestoreActive = false;
  let frozenSemanticProgress = null;
""", 'semantic progress state')
progress_block = r'''  function readingLineY() {
    const header = document.querySelector('.reader-v2-header');
    const minimum = header?.getBoundingClientRect().height
      ? header.getBoundingClientRect().height + 24
      : 0;
    return Math.max(window.innerHeight * READING_LINE_RATIO, minimum);
  }

  function canonicalProgressItems(id = currentEssayId()) {
    return [...canonicalSections(id).entries()]
      .sort(([a], [b]) => a - b)
      .flatMap(([sectionIndex, blocks]) => blocks.map((item, canonicalIndex) => ({
        locator: locatorLabel(sectionIndex, canonicalIndex),
        weight: Math.max(1, Array.from(item.text || '').length)
      })));
  }

  function computeSemanticProgress() {
    const id = currentEssayId();
    if (!id) return { locator: '', ratio: 0, source: 'semantic' };
    const pivotApi = window.MyEssaysReadingPivot;
    const locator = pivotApi?.locator?.() || nearestLocatorBlock()?.dataset?.readingLocator || '';
    if (!locator) return { locator: '', ratio: 0, source: 'semantic' };
    const items = canonicalProgressItems(id);
    const index = items.findIndex(item => item.locator === locator);
    if (index < 0 || !items.length) return { locator, ratio: 0, source: 'semantic' };
    const block = pivotApi?.current?.() || findContainingBlock(locator);
    const rect = semanticRect(locator, block);
    const within = rect
      ? Math.min(1, Math.max(0, (readingLineY() - rect.top) / Math.max(1, rect.height)))
      : 0;
    const total = items.reduce((sum, item) => sum + item.weight, 0);
    const before = items.slice(0, index).reduce((sum, item) => sum + item.weight, 0);
    const ratio = total > 0
      ? Math.min(1, Math.max(0, (before + (items[index].weight * within)) / total))
      : 0;
    return { locator, ratio, source: 'semantic' };
  }

  function semanticProgress() {
    if (semanticRestoreActive && frozenSemanticProgress) return { ...frozenSemanticProgress };
    return computeSemanticProgress();
  }

  function alignCapturedForSnapshot() {
    return semanticSwitchAnchor ? correctSemanticEyeLine(semanticSwitchAnchor) : false;
  }

'''
text = replace_once(text, '  function nearestLocatorBlock() {\n', progress_block + '  function nearestLocatorBlock() {\n', 'insert semantic progress')
text = replace_once(text, """    const readingY = window.innerHeight * READING_LINE_RATIO;
""", """    const readingY = readingLineY();
""", 'shared reading line')
text = replace_once(text, """      semanticSwitchAnchor = null;
      semanticRestoreActive = false;
      return null;
""", """      semanticSwitchAnchor = null;
      semanticRestoreActive = false;
      frozenSemanticProgress = null;
      return null;
""", 'clear failed semantic progress capture')
text = replace_once(text, """    semanticSwitchAnchor = {
      essayId: id,
      locator,
      viewportTop: semanticEyeLineReference.viewportTop
    };
    semanticRestoreActive = true;
""", """    semanticSwitchAnchor = {
      essayId: id,
      locator,
      viewportTop: semanticEyeLineReference.viewportTop
    };
    frozenSemanticProgress = computeSemanticProgress();
    semanticRestoreActive = true;
""", 'freeze semantic progress')
text = replace_once(text, """        dispatchReadingModeStable(event);
        requestAnimationFrame(() => { semanticRestoreActive = false; });
""", """        dispatchReadingModeStable(event);
        requestAnimationFrame(() => {
          semanticRestoreActive = false;
          frozenSemanticProgress = null;
          document.dispatchEvent(new CustomEvent('myessays:reading-progress-changed', {
            detail: semanticProgress()
          }));
        });
""", 'release semantic progress')
text = replace_once(text, """    semanticTop,
    captureForSwitch: captureSemanticAnchorNow,
""", """    semanticTop,
    progress: semanticProgress,
    alignCapturedForSnapshot,
    captureForSwitch: captureSemanticAnchorNow,
""", 'export semantic progress')
text = replace_once(text, """    semanticSwitchAnchor = null;
    semanticEyeLineReference = null;
    semanticRestoreActive = false;
""", """    semanticSwitchAnchor = null;
    semanticEyeLineReference = null;
    semanticRestoreActive = false;
    frozenSemanticProgress = null;
""", 'route reset progress')
write(path, text)

# 4) Reader V2 displays semantic progress; fallback remains for early boot.
path = 'reader-v2.js'
text = read(path)
old = r'''  function progressRatio() {
    const content = readerContent();
    if (!content) return 0;
    const blocks = readingBlocks();
    const contentRect = content.getBoundingClientRect();
    const start = contentRect.top + window.scrollY;
    let end = start + contentRect.height;
    if (blocks.length) {
      const lastRect = blocks.at(-1).getBoundingClientRect();
      end = Math.max(start + 1, lastRect.bottom + window.scrollY);
    }
    const point = window.scrollY + readingY();
    return Math.min(1, Math.max(0, (point - start) / Math.max(1, end - start)));
  }
'''
new = r'''  function progressRatio() {
    const semantic = window.MyEssaysReadingLocators?.progress?.();
    if (semantic && Number.isFinite(semantic.ratio)) {
      return Math.min(1, Math.max(0, semantic.ratio));
    }
    const content = readerContent();
    if (!content) return 0;
    const blocks = readingBlocks();
    const contentRect = content.getBoundingClientRect();
    const start = contentRect.top + window.scrollY;
    let end = start + contentRect.height;
    if (blocks.length) {
      const lastRect = blocks.at(-1).getBoundingClientRect();
      end = Math.max(start + 1, lastRect.bottom + window.scrollY);
    }
    const point = window.scrollY + readingY();
    return Math.min(1, Math.max(0, (point - start) / Math.max(1, end - start)));
  }
'''
text = replace_once(text, old, new, 'semantic Reader V2 progress')
text = replace_once(text, """    document.addEventListener('myessays:reader-language-changed', scheduleLocationSync);
""", """    document.addEventListener('myessays:reader-language-changed', scheduleLocationSync);
    document.addEventListener('myessays:reading-mode-stable', scheduleLocationSync);
    document.addEventListener('myessays:reading-progress-changed', scheduleLocationSync);
""", 'refresh progress after semantic settle')
write(path, text)

# 5) Keep the old Reading Zone visible throughout same-essay language handoff.
path = 'reader-reading-pivot.js'
text = read(path)
text = replace_once(text, """  document.addEventListener('myessays:reader-version-changed', () => {
    clearReadingZone();
    refreshReadingBlocks();
    requestAnimationFrame(syncCompareUI);
  });
""", """  document.addEventListener('myessays:reader-version-changed', () => {
    refreshReadingBlocks();
    requestAnimationFrame(syncCompareUI);
  });
""", 'preserve Reading Zone during language handoff')
write(path, text)

# 6) Make the Reading Zone perceptible but quiet and add Ink Dissolve.
path = 'reader-reading-pivot.css'
text = read(path)
text = replace_once(text, """.reader-content {
  background-repeat: no-repeat;
}
""", """.reader-content {
  background-repeat: no-repeat;
  view-transition-name: reader-ink;
}
""", 'named reading surface')
text = replace_once(text, """    rgba(180, 62, 49, 0) var(--reading-zone-fade-start),
    rgba(180, 62, 49, .018) var(--reading-zone-top),
    rgba(180, 62, 49, .012) var(--reading-zone-mid),
    rgba(180, 62, 49, .006) var(--reading-zone-bottom),
    rgba(180, 62, 49, 0) var(--reading-zone-fade-end),
""", """    rgba(255, 255, 255, 0) var(--reading-zone-fade-start),
    rgba(255, 255, 255, .28) var(--reading-zone-top),
    rgba(255, 255, 255, .18) var(--reading-zone-mid),
    rgba(255, 255, 255, .07) var(--reading-zone-bottom),
    rgba(255, 255, 255, 0) var(--reading-zone-fade-end),
""", 'desktop Reading Zone luminance')
text = replace_once(text, """      rgba(180, 62, 49, 0) var(--reading-zone-fade-start),
      rgba(180, 62, 49, .015) var(--reading-zone-top),
      rgba(180, 62, 49, .010) var(--reading-zone-mid),
      rgba(180, 62, 49, .005) var(--reading-zone-bottom),
      rgba(180, 62, 49, 0) var(--reading-zone-fade-end),
""", """      rgba(255, 255, 255, 0) var(--reading-zone-fade-start),
      rgba(255, 255, 255, .24) var(--reading-zone-top),
      rgba(255, 255, 255, .15) var(--reading-zone-mid),
      rgba(255, 255, 255, .06) var(--reading-zone-bottom),
      rgba(255, 255, 255, 0) var(--reading-zone-fade-end),
""", 'mobile Reading Zone luminance')
ink_css = r'''

/* Language changes are not navigation. Hold the Reading Surface still and
   dissolve only the text snapshot. The root/header never animates. */
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

::view-transition-group(reader-ink) {
  animation-duration: 150ms;
  animation-timing-function: cubic-bezier(.2, .7, .2, 1);
}

::view-transition-old(reader-ink) {
  animation: reader-ink-out 150ms cubic-bezier(.2, .7, .2, 1) both;
  mix-blend-mode: normal;
}

::view-transition-new(reader-ink) {
  animation: reader-ink-in 150ms cubic-bezier(.2, .7, .2, 1) both;
  mix-blend-mode: normal;
}

@keyframes reader-ink-out {
  from { opacity: 1; }
  to { opacity: .08; }
}

@keyframes reader-ink-in {
  from { opacity: .08; }
  to { opacity: 1; }
}

@media (prefers-reduced-motion: reduce) {
  ::view-transition-group(reader-ink),
  ::view-transition-old(reader-ink),
  ::view-transition-new(reader-ink) {
    animation-duration: .001ms !important;
  }
}
'''
text = replace_once(text, """.reader-content > p.reader-locator-block[data-reading-locator].is-reading-pivot {
  transition: none;
  background-color: transparent;
  box-shadow: none;
}
""", """.reader-content > p.reader-locator-block[data-reading-locator].is-reading-pivot {
  transition: none;
  background-color: transparent;
  box-shadow: none;
}
""" + ink_css, 'Ink Dissolve CSS')
write(path, text)

# 7) Progressive-enhancement View Transition around version DOM swaps.
path = 'reader-versions.js'
text = read(path)
helpers = r'''  function prefersReducedMotion() {
    return Boolean(window.matchMedia?.('(prefers-reduced-motion: reduce)').matches);
  }

  function canAnimateReadingSurface() {
    return typeof document.startViewTransition === 'function'
      && !prefersReducedMotion()
      && Boolean(readerContent());
  }

  async function commitVersionSwap({ id, nextEssay, version, locator, pairId }) {
    showReader(nextEssay, { preserveScroll: true });
    await Promise.all([
      waitForPairIdentity(id),
      waitForSemanticLocators(id)
    ]);
    if (id !== currentEssayId()) return false;

    window.MyEssaysReadingLocators?.alignCapturedForSnapshot?.();
    rememberPreferredVersion(version);
    document.dispatchEvent(new CustomEvent('myessays:reader-version-changed', {
      detail: { essayId: id, version, locator, pairId }
    }));
    document.dispatchEvent(new CustomEvent('myessays:reader-language-changed', {
      detail: { essayId: id, mode: version, locator, pairId }
    }));
    return true;
  }

'''
text = replace_once(text, """  function waitForReadySignal({ id, datasetKey, datasetValue, eventName }) {
""", helpers + """  function waitForReadySignal({ id, datasetKey, datasetValue, eventName }) {
""", 'insert Reading Surface helpers')
old_swap = r'''      // Reader Versions owns only the content swap. showReader may reset the
      // page while rebuilding the DOM; semantic eye-line restoration belongs
      // exclusively to Reading Pivot + Reading Locators after readiness.
      showReader(nextEssay);

      await Promise.all([
        waitForPairIdentity(id),
        waitForSemanticLocators(id)
      ]);
      if (id !== currentEssayId()) return false;

      rememberPreferredVersion(version);
      document.dispatchEvent(new CustomEvent('myessays:reader-version-changed', {
        detail: { essayId: id, version, locator, pairId }
      }));

      document.dispatchEvent(new CustomEvent('myessays:reader-language-changed', {
        detail: { essayId: id, mode: version, locator, pairId }
      }));
      return true;
'''
new_swap = r'''      // Reader Versions still owns only the content swap. Reading Locators owns
      // semantic eye-line alignment; View Transition is presentation only.
      let completed = false;
      const update = async () => {
        completed = await commitVersionSwap({ id, nextEssay, version, locator, pairId });
      };

      if (canAnimateReadingSurface()) {
        document.activeViewTransition?.skipTransition?.();
        const transition = document.startViewTransition(update);
        await transition.updateCallbackDone;
      } else {
        await update();
      }
      return completed;
'''
text = replace_once(text, old_swap, new_swap, 'visual version swap')
write(path, text)

# 8) New rapid intent skips only the stale visual animation.
path = 'reader-language-instant.js'
text = read(path)
text = replace_once(text, """  function requestVersion(version, source = 'control') {
    const api = versions();
    if (!api || !version || !api.definitions?.[version]) return false;

    desiredVersion = version;
""", """  function requestVersion(version, source = 'control') {
    const api = versions();
    if (!api || !version || !api.definitions?.[version]) return false;

    document.activeViewTransition?.skipTransition?.();
    desiredVersion = version;
""", 'skip stale visual transition')
write(path, text)

# 9) Static architecture tests.
path = 'tests/reader-reading-pivot.test.js'
text = read(path)
old_focus_test = r'''test('reading focus zone is subtle, continuous, non-animated and leaves Pivot visually unpainted', () => {
  const css = read('reader-reading-pivot.css');
  assert.match(css, /is-reading-pivot\s*\{[\s\S]*?transition:\s*none;[\s\S]*?background-color:\s*transparent;[\s\S]*?box-shadow:\s*none/);
  assert.match(css, /has-reading-focus-zone[\s\S]*?rgba\(180, 62, 49, \.018\)/);
  assert.match(css, /has-reading-focus-zone[\s\S]*?rgba\(180, 62, 49, \.006\)/);
  assert.match(css, /@media \(max-width: 820px\)[\s\S]*?has-reading-focus-zone[\s\S]*?rgba\(180, 62, 49, \.015\)/);
  const zoneRules = [...css.matchAll(/\.reader-content\.has-reading-focus-zone\s*\{([\s\S]*?)\}/g)]
    .map(match => match[1]);
  assert.equal(zoneRules.length, 2, 'desktop and mobile Reading Zone rules should both exist');
  zoneRules.forEach(rule => assert.doesNotMatch(rule, /transition:/));
  assert.match(css, /is-language-switch-target[\s\S]*?box-shadow:\s*none/);
});
'''
new_focus_test = r'''test('reading focus zone is perceptible, continuous, non-animated and leaves Pivot visually unpainted', () => {
  const css = read('reader-reading-pivot.css');
  assert.match(css, /is-reading-pivot\s*\{[\s\S]*?transition:\s*none;[\s\S]*?background-color:\s*transparent;[\s\S]*?box-shadow:\s*none/);
  assert.match(css, /has-reading-focus-zone[\s\S]*?rgba\(255, 255, 255, \.28\)/);
  assert.match(css, /has-reading-focus-zone[\s\S]*?rgba\(255, 255, 255, \.07\)/);
  assert.match(css, /@media \(max-width: 820px\)[\s\S]*?has-reading-focus-zone[\s\S]*?rgba\(255, 255, 255, \.24\)/);
  const zoneRules = [...css.matchAll(/\.reader-content\.has-reading-focus-zone\s*\{([\s\S]*?)\}/g)]
    .map(match => match[1]);
  assert.equal(zoneRules.length, 2, 'desktop and mobile Reading Zone rules should both exist');
  zoneRules.forEach(rule => assert.doesNotMatch(rule, /transition:/));
  assert.match(css, /is-language-switch-target[\s\S]*?box-shadow:\s*none/);
});

test('Reading Surface has one semantic progress owner and an opacity-only Ink Dissolve', () => {
  const ui = read('ui-enhancements.js');
  const v2 = read('reader-v2.js');
  const locators = read('reading-locators.js');
  const versions = read('reader-versions.js');
  const instant = read('reader-language-instant.js');
  const css = read('reader-reading-pivot.css');
  assert.doesNotMatch(ui, /reading-progress-track|reading-progress-bar|function updateProgress/);
  assert.match(v2, /reader-v2-header-progress/);
  assert.match(v2, /MyEssaysReadingLocators\?\.progress\?\.\(\)/);
  assert.match(locators, /progress: semanticProgress/);
  assert.match(locators, /alignCapturedForSnapshot/);
  assert.match(versions, /document\.startViewTransition\(update\)/);
  assert.match(versions, /showReader\(nextEssay, \{ preserveScroll: true \}\)/);
  assert.match(instant, /document\.activeViewTransition\?\.skipTransition\?\.\(\)/);
  assert.match(css, /view-transition-name:\s*reader-ink/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
  assert.doesNotMatch(css, /translate\(|scale\(|blur\(/);
});
'''
text = replace_once(text, old_focus_test, new_focus_test, 'replace Reading Surface static test')
write(path, text)

# 10) Browser Focus QA gets a lower perceptibility floor.
path = 'scripts/reading-focus-instant-qa.cjs'
text = read(path)
text = replace_once(text, """async function assertThirdFromTopFocus(page, label, { maxZoneAlpha = 0.03, requireUnpaintedPivot = false } = {}) {
""", """async function assertThirdFromTopFocus(page, label, { minZoneAlpha = 0.18, maxZoneAlpha = 0.35, requireUnpaintedPivot = false } = {}) {
""", 'focus QA alpha bounds')
text = replace_once(text, """  assert.ok(state.maxZoneAlpha > 0 && state.maxZoneAlpha <= maxZoneAlpha, `${label}: Reading Zone should remain deliberately subtle (max alpha ${state.maxZoneAlpha})`);
""", """  assert.ok(state.maxZoneAlpha >= minZoneAlpha && state.maxZoneAlpha <= maxZoneAlpha, `${label}: Reading Zone should remain visible but quiet (max alpha ${state.maxZoneAlpha}, expected ${minZoneAlpha}-${maxZoneAlpha})`);
""", 'focus QA perceptibility floor')
text = replace_once(text, """  await assertThirdFromTopFocus(page, 'JA+EN mobile', { maxZoneAlpha: 0.02, requireUnpaintedPivot: true });
""", """  await assertThirdFromTopFocus(page, 'JA+EN mobile', { minZoneAlpha: 0.14, maxZoneAlpha: 0.30, requireUnpaintedPivot: true });
""", 'mobile focus QA alpha bounds')
write(path, text)

# 11) Reading Versions QA locks one progress UI and cross-language semantic ratio.
path = 'scripts/reading-versions-qa.cjs'
text = read(path)
text = replace_once(text, """      physicalTop: pivot?.getBoundingClientRect?.().top ?? null,
      ...(includeScroll ? { scrollY: window.scrollY } : {})
""", """      physicalTop: pivot?.getBoundingClientRect?.().top ?? null,
      progress: window.MyEssaysReadingLocators?.progress?.().ratio ?? null,
      progressBars: {
        header: document.querySelectorAll('.reader-v2-header-progress').length,
        legacy: document.querySelectorAll('.reading-progress-track').length
      },
      ...(includeScroll ? { scrollY: window.scrollY } : {})
""", 'versions QA progress state')
text = replace_once(text, """  assert.ok(before.scrollY > 300, `expected a meaningful reading position before switch, got ${before.scrollY}`);
  assert.ok(before.locator, 'a canonical Reading Pivot locator should exist before switching');
""", """  assert.ok(before.scrollY > 300, `expected a meaningful reading position before switch, got ${before.scrollY}`);
  assert.ok(before.locator, 'a canonical Reading Pivot locator should exist before switching');
  assert.equal(before.progressBars.header, 1, 'Reader V2 must render exactly one progress bar');
  assert.equal(before.progressBars.legacy, 0, 'legacy body progress bar must be removed');
  assert.ok(Number.isFinite(before.progress), 'semantic reading progress should exist');
""", 'versions QA single progress bar')
text = replace_once(text, """  assert.ok(Math.abs(english.top - before.top) <= 3, `English Mix semantic top drifted by ${english.top - before.top}px`);
  assert.ok((await page.evaluate(() => window.scrollY)) > 200, 'English Mix switch must not reset reading position');
""", """  assert.ok(Math.abs(english.top - before.top) <= 3, `English Mix semantic top drifted by ${english.top - before.top}px`);
  assert.ok(Math.abs(english.progress - before.progress) <= 0.01, `English Mix semantic progress drifted by ${english.progress - before.progress}`);
  assert.ok((await page.evaluate(() => window.scrollY)) > 200, 'English Mix switch must not reset reading position');
""", 'English semantic progress continuity')
text = replace_once(text, """  assert.ok(Math.abs(spanish.top - before.top) <= 3, `Español Mix semantic top drifted by ${spanish.top - before.top}px (physical top ${spanish.physicalTop})`);
""", """  assert.ok(Math.abs(spanish.top - before.top) <= 3, `Español Mix semantic top drifted by ${spanish.top - before.top}px (physical top ${spanish.physicalTop})`);
  assert.ok(Math.abs(spanish.progress - before.progress) <= 0.01, `Español Mix semantic progress drifted by ${spanish.progress - before.progress}`);
""", 'Spanish semantic progress continuity')
text = replace_once(text, """  assert.ok(Math.abs(returned.top - before.top) <= 3, `round-trip semantic top drifted by ${returned.top - before.top}px`);
""", """  assert.ok(Math.abs(returned.top - before.top) <= 3, `round-trip semantic top drifted by ${returned.top - before.top}px`);
  assert.ok(Math.abs(returned.progress - before.progress) <= 0.01, `round-trip semantic progress drifted by ${returned.progress - before.progress}`);
""", 'round-trip semantic progress continuity')
write(path, text)

print('Reading Surface migration prepared successfully')
