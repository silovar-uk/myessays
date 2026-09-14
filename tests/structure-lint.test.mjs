import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

import { compareStructures, parseMarkdownStructure } from '../scripts/validate-version-structure.mjs';

const JA_PATH = 'essays/2026-09-14-ma-brokerage-fee-calculator-regulation-catches-up.md';
const EN_PATH = 'english-mix/ma-brokerage-fee-calculator-regulation-catches-up.md';

test('parser follows Reading Locator block semantics', () => {
  const structure = parseMarkdownStructure(`---\nid: demo\n---\n# Title\n\nIntro.\n\n## One\n\nParagraph.\n\n- a\n- b\n\n> quote\n\n### Minor heading\n\nAfter heading.\n`);
  assert.deepEqual(structure.map(section => section.blocks), [
    ['p'],
    ['p', 'ul', 'blockquote', 'p']
  ]);
});

test('the repaired M&A article preserves JA ↔ ENMIX structure', () => {
  const ja = fs.readFileSync(JA_PATH, 'utf8');
  const en = fs.readFileSync(EN_PATH, 'utf8');
  const result = compareStructures(ja, en);
  assert.equal(result.ok, true, JSON.stringify(result.issues, null, 2));
});

test('merging the former 4-10 / 4-11 boundary is rejected', () => {
  const ja = fs.readFileSync(JA_PATH, 'utf8');
  const en = fs.readFileSync(EN_PATH, 'utf8');
  const needle = '仲介者の価値は、全部を自分で専門判断することではない。\n\n**It can also mean dividing specialist judgments among the right people while keeping the whole transaction moving to the end.**';
  assert.ok(en.includes(needle), 'regression fixture boundary not found');
  const broken = en.replace(needle, needle.replace('\n\n', '\n'));
  const result = compareStructures(ja, broken);
  assert.equal(result.ok, false);
  assert.ok(result.issues.some(issue => issue.kind === 'COUNT_MISMATCH' && issue.section === 4));
});
