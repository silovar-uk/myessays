import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

import {
  buildReviewPackets,
  detectSuspectedRange,
  parseMarkdownBlocks,
  renderReviewPackets
} from '../scripts/build-structure-review-packets.mjs';

function block(index, text, type = 'p') {
  return { index, type, text, normalizedText: text.toLowerCase(), fingerprint: String(index) };
}

function withFixture(canonical, variant, fn) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'myessays-review-'));
  fs.mkdirSync(path.join(root, 'essays'));
  fs.mkdirSync(path.join(root, 'english-mix'));
  fs.writeFileSync(path.join(root, 'essays/canonical.md'), canonical);
  fs.writeFileSync(path.join(root, 'english-mix/variant.md'), variant);
  try {
    return fn(root);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
}

function audit(issue, migration = { taxonomy: 'MERGE_OR_OMISSION', severity: 'LOW', repairability: 'LIKELY_SAFE', issueCount: 1, totalDelta: 1 }) {
  return {
    generatedAt: '2026-09-14T00:00:00.000Z',
    migrationSummary: {},
    results: [{
      id: 'demo',
      version: 'en-mix',
      path: 'english-mix/variant.md',
      canonicalPath: 'essays/canonical.md',
      ok: false,
      issues: [issue],
      migration
    }]
  };
}

test('text parser preserves Reading Locator block semantics', () => {
  const sections = parseMarkdownBlocks('# Title\n\nIntro.\n\n## One\n\nParagraph.\n\n- a\n- b\n\n> quote\n\n### Minor\n\nAfter.\n');
  assert.deepEqual(sections.map(section => section.blocks.map(item => item.type)), [
    ['p'],
    ['p', 'ul', 'blockquote', 'p']
  ]);
  assert.equal(sections[1].blocks[0].text, 'Paragraph.');
});

test('isolated 5-vs-4 count mismatch becomes a review packet', () => {
  const canonical = '# T\n\n## S\n\nAlpha.\n\nBeta.\n\nGamma.\n\nDelta.\n\nOmega.\n';
  const variant = '# T\n\n## S\n\nAlpha.\n\nBeta.\nGamma.\n\nDelta.\n\nOmega.\n';
  withFixture(canonical, variant, root => {
    const payload = buildReviewPackets(audit({ kind: 'COUNT_MISMATCH', section: 1, canonicalCount: 5, alternateCount: 4 }), { root });
    assert.equal(payload.summary.packets, 1);
    assert.equal(payload.packets[0].canonicalCount, 5);
    assert.equal(payload.packets[0].variantCount, 4);
    assert.equal(payload.packets[0].decision, 'REVIEW_REQUIRED');
    assert.match(payload.packets[0].suggestion, /merge or canonical omission/i);
  });
});

test('aligned prefix and suffix narrow the suspected central range', () => {
  const left = [block(0, 'same start'), block(1, 'middle a'), block(2, 'middle b'), block(3, 'same end')];
  const right = [block(0, 'same start'), block(1, 'different middle'), block(2, 'same end')];
  const range = detectSuspectedRange(left, right, 0.35);
  assert.equal(range.prefixAligned, 1);
  assert.equal(range.suffixAligned, 1);
  assert.deepEqual(
    [range.canonicalStart, range.canonicalEnd, range.variantStart, range.variantEnd],
    [1, 2, 1, 1]
  );
});

test('completely different section stays low-confidence and review-required', () => {
  const canonical = '# T\n\n## S\n\nAlpha apple.\n\nBeta banana.\n';
  const variant = '# T\n\n## S\n\n別の文章です。\n';
  withFixture(canonical, variant, root => {
    const payload = buildReviewPackets(audit({ kind: 'COUNT_MISMATCH', section: 1, canonicalCount: 2, alternateCount: 1 }), { root });
    assert.equal(payload.packets[0].confidence, 'LOW');
    assert.equal(payload.packets[0].decision, 'REVIEW_REQUIRED');
  });
});

test('type mismatch never turns into an automatic SAFE decision', () => {
  const canonical = '# T\n\n## S\n\nParagraph.\n';
  const variant = '# T\n\n## S\n\n- Paragraph.\n';
  const migration = { taxonomy: 'BLOCK_TYPE', severity: 'MEDIUM', repairability: 'HUMAN_REVIEW', issueCount: 1, totalDelta: 0 };
  withFixture(canonical, variant, root => {
    const payload = buildReviewPackets(audit({ kind: 'TYPE_MISMATCH', section: 1, canonicalCount: 1, alternateCount: 1 }, migration), { root });
    assert.equal(payload.packets[0].issueKind, 'TYPE_MISMATCH');
    assert.equal(payload.packets[0].decision, 'REVIEW_REQUIRED');
  });
});

test('aligned articles do not generate packets', () => {
  const payload = {
    migrationSummary: {},
    results: [{ id: 'demo', version: 'en-mix', path: 'english-mix/variant.md', canonicalPath: 'essays/canonical.md', ok: true, issues: [], migration: { taxonomy: 'ALIGNED', severity: 'NONE', repairability: 'NONE' } }]
  };
  withFixture('# T\n\nSame.\n', '# T\n\nSame.\n', root => {
    assert.equal(buildReviewPackets(payload, { root }).summary.packets, 0);
  });
});

test('markdown output contains article, section and block text', () => {
  const payload = {
    generatedAt: '2026-09-14T00:00:00.000Z',
    summary: { articles: 1, packets: 1, highConfidence: 0, mediumConfidence: 1, lowConfidence: 0 },
    packets: [{
      id: 'demo', variant: 'en-mix', sectionIndex: 2, canonicalHeading: 'Heading', issueKind: 'COUNT_MISMATCH', classification: 'MERGE_OR_OMISSION', repairability: 'LIKELY_SAFE', canonicalCount: 2, variantCount: 1,
      suspectedRange: { canonicalStart: 0, canonicalEnd: 1, variantStart: 0, variantEnd: 0 }, confidence: 'MEDIUM', decision: 'REVIEW_REQUIRED', suggestion: 'Review it.',
      canonicalBlocks: [block(0, 'Canonical alpha'), block(1, 'Canonical beta')], variantBlocks: [block(0, 'Variant alpha')]
    }]
  };
  const markdown = renderReviewPackets(payload);
  assert.match(markdown, /demo \/ en-mix/);
  assert.match(markdown, /Canonical alpha/);
  assert.match(markdown, /Variant alpha/);
  assert.match(markdown, /Decision: REVIEW_REQUIRED/);
});

test('display truncation does not mutate packet JSON source text', () => {
  const long = 'x'.repeat(1000);
  const canonical = `# T\n\n## S\n\n${long}\n\nSecond.\n`;
  const variant = `# T\n\n## S\n\n${long}\nSecond.\n`;
  withFixture(canonical, variant, root => {
    const payload = buildReviewPackets(audit({ kind: 'COUNT_MISMATCH', section: 1, canonicalCount: 2, alternateCount: 1 }), { root, maxText: 80 });
    assert.equal(payload.packets[0].canonicalBlocks[0].text.length, 1000);
    assert.ok(payload.packets[0].display.canonicalBlocks[0].text.length < 1000);
  });
});
