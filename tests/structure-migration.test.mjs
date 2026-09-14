import test from 'node:test';
import assert from 'node:assert/strict';

import { classifyResult } from '../scripts/report-structure-migration.mjs';
import { applyExactOperation } from '../scripts/apply-structure-migration.mjs';

test('isolated count mismatch is likely-safe but never auto-SAFE', () => {
  const result = classifyResult({
    ok: false,
    issues: [{ kind: 'COUNT_MISMATCH', section: 2, canonicalCount: 10, alternateCount: 11 }]
  });
  assert.equal(result.taxonomy, 'SPLIT_OR_INSERTION');
  assert.equal(result.severity, 'LOW');
  assert.equal(result.repairability, 'LIKELY_SAFE');
});

test('section mismatch is unsafe', () => {
  const result = classifyResult({
    ok: false,
    issues: [{ kind: 'SECTION_MISMATCH', section: null, canonicalSections: 8, alternateSections: 7 }]
  });
  assert.equal(result.severity, 'CRITICAL');
  assert.equal(result.repairability, 'UNSAFE');
});

test('structure-only migration may change whitespace but not visible text', () => {
  const before = 'Alpha.\n\nBeta.';
  const operation = {
    label: 'join paragraph boundary',
    policy: 'structure-only',
    from: 'Alpha.\n\nBeta.',
    to: 'Alpha.\nBeta.'
  };
  const result = applyExactOperation(before, operation);
  assert.equal(result.status, 'pending');
  assert.equal(result.text, 'Alpha.\nBeta.');
});

test('canonical restore must exist in canonical source', () => {
  const before = '## Section\n\n### Next';
  const operation = {
    label: 'restore missing canonical block',
    policy: 'canonical-restore',
    restoredText: 'Canonical sentence.',
    from: '## Section\n\n### Next',
    to: '## Section\n\nCanonical sentence.\n\n### Next'
  };
  const result = applyExactOperation(before, operation, 'Before.\n\nCanonical sentence.\n\nAfter.');
  assert.equal(result.text.includes('Canonical sentence.'), true);
});

test('migration operations are idempotent once target text is present', () => {
  const operation = {
    label: 'join paragraph boundary',
    policy: 'structure-only',
    from: 'Alpha.\n\nBeta.',
    to: 'Alpha.\nBeta.'
  };
  const result = applyExactOperation('Alpha.\nBeta.', operation);
  assert.equal(result.status, 'already-applied');
});
