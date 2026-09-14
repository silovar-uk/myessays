import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

import { compareStructures, parseMarkdownStructure } from '../scripts/validate-version-structure.mjs';
import { findRegressions } from '../scripts/validate-structure-regressions.mjs';

const JA_PATH = 'essays/2026-09-14-ma-brokerage-fee-calculator-regulation-catches-up.md';
const EN_PATH = 'english-mix/ma-brokerage-fee-calculator-regulation-catches-up.md';
const REPAIRED_BOUNDARY = '仲介者の価値は、全部を自分で専門判断することではない。\n\n**It can also mean dividing specialist judgments among the right people while keeping the whole transaction moving to the end.**';

function sectionAt(markdown, marker) {
  const index = markdown.indexOf(marker);
  assert.ok(index >= 0, 'regression fixture boundary not found');
  return (markdown.slice(0, index).match(/^\s{0,3}##(?!#)\s+/gm) || []).length;
}

function countMismatch(id, version, section, ja, alt) {
  return {
    id,
    version,
    ok: false,
    issues: [{
      kind: 'COUNT_MISMATCH',
      section,
      canonicalCount: ja,
      alternateCount: alt,
      hint: alt < ja ? 'POSSIBLE_MERGE' : 'POSSIBLE_SPLIT'
    }]
  };
}

test('parser follows Reading Locator block semantics', () => {
  const structure = parseMarkdownStructure(`---\nid: demo\n---\n# Title\n\nIntro.\n\n## One\n\nParagraph.\n\n- a\n- b\n\n> quote\n\n### Minor heading\n\nAfter heading.\n`);
  assert.deepEqual(structure.map(section => section.blocks), [
    ['p'],
    ['p', 'ul', 'blockquote', 'p']
  ]);
});

test('the repaired M&A boundary is structurally aligned now', () => {
  const ja = fs.readFileSync(JA_PATH, 'utf8');
  const en = fs.readFileSync(EN_PATH, 'utf8');
  const section = sectionAt(en, REPAIRED_BOUNDARY);
  const result = compareStructures(ja, en);
  assert.ok(
    !result.issues.some(issue => issue.section === section),
    `target section still mismatches: ${JSON.stringify(result.issues.filter(issue => issue.section === section), null, 2)}`
  );
});

test('merging the repaired boundary is rejected', () => {
  const ja = fs.readFileSync(JA_PATH, 'utf8');
  const en = fs.readFileSync(EN_PATH, 'utf8');
  const section = sectionAt(en, REPAIRED_BOUNDARY);
  const broken = en.replace(REPAIRED_BOUNDARY, REPAIRED_BOUNDARY.replace('\n\n', '\n'));
  const baseline = compareStructures(ja, en);
  const result = compareStructures(ja, broken);

  assert.ok(!baseline.issues.some(issue => issue.section === section));
  assert.ok(result.issues.some(issue => issue.kind === 'COUNT_MISMATCH' && issue.section === section));
});

test('legacy mismatch is grandfathered when it does not get worse', () => {
  const before = [countMismatch('demo', 'en-mix', 4, 14, 12)];
  const current = [countMismatch('demo', 'en-mix', 4, 14, 12)];
  assert.deepEqual(findRegressions(before, current), []);
});

test('improving a legacy mismatch passes the regression gate', () => {
  const before = [countMismatch('demo', 'en-mix', 4, 14, 11)];
  const current = [countMismatch('demo', 'en-mix', 4, 14, 13)];
  assert.deepEqual(findRegressions(before, current), []);
});

test('worsening a legacy mismatch fails the regression gate', () => {
  const before = [countMismatch('demo', 'en-mix', 4, 14, 13)];
  const current = [countMismatch('demo', 'en-mix', 4, 14, 11)];
  const regressions = findRegressions(before, current);
  assert.equal(regressions.length, 1);
  assert.equal(regressions[0].section, 'section:4');
  assert.ok(regressions[0].currentSeverity > regressions[0].beforeSeverity);
});

test('a new mismatch fails even when the variant is newly introduced', () => {
  const current = [countMismatch('new-article', 'en-mix', 1, 5, 4)];
  const regressions = findRegressions([], current);
  assert.equal(regressions.length, 1);
  assert.equal(regressions[0].beforeSeverity, 0);
});
