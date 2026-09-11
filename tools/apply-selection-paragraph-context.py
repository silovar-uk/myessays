from pathlib import Path


def once(text, old, new, label):
    count = text.count(old)
    if count != 1:
        raise SystemExit(f"{label}: expected one anchor, got {count}")
    return text.replace(old, new, 1)


def block(text, start, end, replacement, label):
    i = text.find(start)
    j = text.find(end, i)
    if i < 0 or j < 0:
        raise SystemExit(f"{label}: anchor missing")
    return text[:i] + replacement + text[j:]


js_path = Path("reader-japanese-reference.js")
js = js_path.read_text()
js = once(js, "el.setAttribute('aria-label', '選択した外国語Mixと日本語版の比較');", "el.setAttribute('aria-label', '選択した表現を含む段落と日本語版の比較');", "aria")
js = once(js, "<h2>選択箇所</h2>", "<h2>この段落</h2>", "heading")
js = once(js, ">SELECTED</p>", ">CURRENT PARAGRAPH</p>", "label")

show = r'''  function renderSelectedParagraph(target, context) {
    target.replaceChildren();
    const text = String(context?.paragraphText || '');
    if (!text) return;
    const start = Math.max(0, Math.min(text.length, Number(context?.startOffset) || 0));
    const end = Math.max(start, Math.min(text.length, Number(context?.endOffset) || start));
    if (start) target.appendChild(document.createTextNode(text.slice(0, start)));
    if (end > start) {
      const mark = document.createElement('mark');
      mark.className = 'japanese-reference-selection-mark';
      mark.textContent = text.slice(start, end);
      target.appendChild(mark);
    }
    if (end < text.length) target.appendChild(document.createTextNode(text.slice(end)));
    if (!target.childNodes.length) target.textContent = text;
  }

  function show(reference, selection) {
    const el = panel();
    const status = el.querySelector('.japanese-reference-status');
    const selected = el.querySelector('.japanese-reference-selected-text');
    const body = el.querySelector('.japanese-reference-text');
    const originalBlock = el.querySelector('.japanese-reference-original');
    renderSelectedParagraph(selected, selection);
    el.dataset.pairId = selection?.pairId || reference?.pairId || '';
    if (!reference?.text) {
      status.textContent = 'この位置に対応する日本語段落がありません';
      body.textContent = '';
      originalBlock.hidden = true;
    } else {
      const positional = reference.confidence === 'pair-position';
      status.textContent = positional ? '同じ読書位置の日本語段落（段落位置で対応）' : '同じ読書位置の日本語段落';
      body.textContent = reference.text;
      originalBlock.hidden = false;
    }
    el.hidden = false;
  }

'''
js = block(js, "  function show(reference, selectedText) {", "  function mount(ctx) {", show, "show")

selection = r'''  function offsetWithinBlock(block, node, offset) {
    if (!block || !node) return null;
    if (node !== block && !block.contains(node)) return null;
    const probe = document.createRange();
    probe.selectNodeContents(block);
    try { probe.setEnd(node, offset); } catch { return null; }
    return probe.toString().length;
  }

  function selectionContext() {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed || !selection.rangeCount || !selection.toString().trim()) return null;
    const range = selection.getRangeAt(0);
    const startBlock = closestBlock(range.startContainer);
    if (!startBlock || !content.contains(startBlock)) return null;
    const endBlock = closestBlock(range.endContainer);
    const paragraphText = String(startBlock.textContent || '');
    const startOffset = offsetWithinBlock(startBlock, range.startContainer, range.startOffset);
    const endOffset = startBlock === endBlock
      ? offsetWithinBlock(startBlock, range.endContainer, range.endOffset)
      : paragraphText.length;
    if (startOffset == null) return null;
    return {
      block: startBlock,
      pairId: startBlock.dataset.readingLocator || startBlock.dataset.pairId || '',
      paragraphText,
      startOffset,
      endOffset: endOffset == null ? paragraphText.length : endOffset
    };
  }

'''
js = block(js, "  function selectionContext() {", "  function resolve() {", selection, "selection")
old = """    if (selection?.invalid) {
      closePanel();
      return;
    }
    if (selection?.block) show(references.get(selection.block) || null, selection.text);"""
js = once(js, old, "    if (selection?.block) show(references.get(selection.block) || null, selection);", "resolve")
js_path.write_text(js)

css_path = Path("reader-japanese-reference.css")
css = css_path.read_text()
css = once(
    css,
    ".japanese-reference-selected-text { white-space: pre-wrap; color: var(--ink); font-size: 13.5px; line-height: 1.72; overflow-wrap: anywhere; }",
    ".japanese-reference-selected-text { white-space: pre-wrap; color: var(--ink); font: 14.5px/1.82 Georgia, \"Yu Mincho\", serif; overflow-wrap: anywhere; }\n.japanese-reference-selection-mark { padding: 0 .05em; border-radius: .2em; background: rgba(164, 45, 38, .12); color: inherit; box-decoration-break: clone; -webkit-box-decoration-break: clone; }",
    "css",
)
css = css.replace(
    ".japanese-reference-selected-text { font-size: 13px; line-height: 1.68; }",
    ".japanese-reference-selected-text { font-size: 14px; line-height: 1.76; }",
)
css_path.write_text(css)

qa_path = Path("scripts/japanese-reference-qa.cjs")
qa = qa_path.read_text()
cross = r'''async function assertCrossParagraphSelectionUsesStartParagraph(page) {
  await page.evaluate(() => {
    const paragraphs = [...document.querySelectorAll('#readerContent p')].filter(p => (p.textContent || '').trim());
    const first = paragraphs.find(p => (p.textContent || '').includes('But that creates an obvious tension.'));
    const second = paragraphs[paragraphs.indexOf(first) + 1];
    if (!first || !second) return;
    const range = document.createRange();
    range.setStart(first, 0);
    range.setEnd(second, second.childNodes.length);
    const selection = getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    document.dispatchEvent(new Event('selectionchange', { bubbles: true }));
  });
  await page.waitForSelector('#japaneseReferencePanel:not([hidden])');
  assert.match((await page.locator('.japanese-reference-selected-text').innerText()).trim(), /But that creates an obvious tension\./);
  assert.ok((await page.locator('.japanese-reference-selection-mark').innerText()).trim().length > 0);
}
'''
qa = block(qa, "async function assertCrossParagraphSelectionCloses(page) {", "\n\n(async () => {", cross, "cross QA")
qa = qa.replace("await assertCrossParagraphSelectionCloses(page);", "await assertCrossParagraphSelectionUsesStartParagraph(page);")
qa_path.write_text(qa)

Path("tests/selection-paragraph-comparison.test.js").write_text(r'''const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const read = file => fs.readFileSync(path.join(__dirname, '..', file), 'utf8');

test('selection uses start paragraph and exact range offsets', () => {
  const source = read('reader-japanese-reference.js');
  assert.match(source, /closestBlock\(range\.startContainer\)/);
  assert.match(source, /offsetWithinBlock/);
  assert.match(source, /probe\.setEnd\(node, offset\)/);
  assert.match(source, /startBlock === endBlock/);
  assert.doesNotMatch(source, /return \{ invalid: true \}/);
});

test('panel renders paragraph context and marks only selection', () => {
  const source = read('reader-japanese-reference.js');
  assert.match(source, /renderSelectedParagraph\(selected, selection\)/);
  assert.match(source, /japanese-reference-selection-mark/);
  assert.match(source, /references\.get\(selection\.block\)/);
});
''')

Path("scripts/selection-paragraph-qa.cjs").write_text(r'''const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const BASE = process.env.BASE_URL || 'http://127.0.0.1:4173';
const ID = 'design-literacy-progressive-disclosure-information-timing';
const TARGET = 'But that creates an obvious tension.';
const PHRASE = 'obvious tension';

async function english(page) {
  await page.waitForSelector('#readerModeShell', { state: 'visible' });
  const button = page.locator('#readerModeShell [data-reading-mode-intent="en-mix"]');
  if ((await button.getAttribute('aria-checked')) !== 'true') await button.click();
  await page.waitForFunction(() => window.MyEssaysReaderVersions?.currentVersion?.() === 'en-mix' && !window.MyEssaysInstantReadingModes?.isTransitioning?.());
}

async function selectPhrase(page, occurrence = 0) {
  return page.evaluate(({ TARGET, PHRASE, occurrence }) => {
    const p = [...document.querySelectorAll('#readerContent p')].find(x => (x.textContent || '').includes(TARGET));
    if (!p) return null;
    const walker = document.createTreeWalker(p, NodeFilter.SHOW_TEXT);
    let node, seen = 0;
    while ((node = walker.nextNode())) {
      let from = 0;
      for (;;) {
        const index = node.data.indexOf(PHRASE, from);
        if (index < 0) break;
        if (seen++ === occurrence) {
          const range = document.createRange();
          range.setStart(node, index);
          range.setEnd(node, index + PHRASE.length);
          const selection = getSelection();
          selection.removeAllRanges();
          selection.addRange(range);
          document.dispatchEvent(new Event('selectionchange', { bubbles: true }));
          return { text: p.textContent, pair: p.dataset.readingLocator || p.dataset.pairId || '' };
        }
        from = index + PHRASE.length;
      }
    }
    return null;
  }, { TARGET, PHRASE, occurrence });
}

async function check(page, expected) {
  await page.waitForSelector('#japaneseReferencePanel:not([hidden])');
  const current = await page.locator('.japanese-reference-selected-text').innerText();
  const mark = await page.locator('.japanese-reference-selection-mark').innerText();
  assert.equal(current.trim(), expected.text.trim());
  assert.equal(mark.trim(), PHRASE);
  assert.equal(await page.locator('#japaneseReferencePanel').getAttribute('data-pair-id'), expected.pair);
  assert.ok(current.trim().length > mark.trim().length);
  assert.match(await page.locator('.japanese-reference-text').innerText(), /矛盾/);
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  await page.goto(`${BASE}/#/essay/${ID}`, { waitUntil: 'networkidle' });
  await page.waitForSelector('#readerView:not([hidden])');
  await english(page);
  let expected = await selectPhrase(page);
  assert.ok(expected);
  await check(page, expected);

  await page.evaluate(({ TARGET, PHRASE }) => {
    const p = [...document.querySelectorAll('#readerContent p')].find(x => (x.textContent || '').includes(TARGET));
    const node = [...p.childNodes].find(x => x.nodeType === Node.TEXT_NODE && x.data.includes(PHRASE));
    if (node) node.data = `${PHRASE} / ${node.data}`;
  }, { TARGET, PHRASE });
  expected = await selectPhrase(page, 1);
  assert.ok(expected);
  await page.waitForFunction(phrase => document.querySelector('.japanese-reference-selection-mark')?.textContent === phrase, PHRASE);
  const before = await page.locator('.japanese-reference-selected-text').evaluate(el => {
    const mark = el.querySelector('mark');
    const range = document.createRange();
    range.selectNodeContents(el);
    range.setEndBefore(mark);
    return range.toString();
  });
  assert.ok(before.includes(PHRASE), 'Range offsets must target the second duplicate occurrence');

  await page.setViewportSize({ width: 390, height: 844 });
  await page.reload({ waitUntil: 'networkidle' });
  await page.waitForSelector('#readerView:not([hidden])');
  await english(page);
  expected = await selectPhrase(page);
  await check(page, expected);
  const box = await page.locator('#japaneseReferencePanel').boundingBox();
  assert.ok(box && box.x >= 0 && box.x + box.width <= 390.5);
  await browser.close();
  console.log('Selection paragraph comparison QA passed');
})().catch(error => { console.error(error); process.exit(1); });
''')

index_path = Path("index.html")
index = index_path.read_text()
index = once(index, "reader-japanese-reference.css?v=20260906-3", "reader-japanese-reference.css?v=20260911-1", "css cache")
index = once(index, "reader-japanese-reference.js?v=20260907-2", "reader-japanese-reference.js?v=20260911-1", "js cache")
index_path.write_text(index)
