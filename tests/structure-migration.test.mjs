import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

import { classifyResult } from '../scripts/report-structure-migration.mjs';
import { applyExactOperation, applyTarget, runPlan } from '../scripts/apply-structure-migration.mjs';

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

test('structure-only migration rejects non-whitespace edits', () => {
  assert.throws(() => applyExactOperation('Alpha.\n\nBeta.', {
    label: 'bad rewrite',
    policy: 'structure-only',
    from: 'Alpha.\n\nBeta.',
    to: 'Alpha.\nGamma.'
  }), /changes non-whitespace text/);
});

test('exact replacement rejects ambiguous source occurring twice', () => {
  assert.throws(() => applyExactOperation('Alpha.\n\nAlpha.', {
    label: 'ambiguous',
    policy: 'structure-only',
    from: 'Alpha.',
    to: 'Alpha.\n'
  }), /Expected exactly one pending match, found 2/);
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

test('canonical restore rejects text absent from canonical source', () => {
  assert.throws(() => applyExactOperation('A\n\nB', {
    label: 'invented restore',
    policy: 'canonical-restore',
    restoredText: 'Invented.',
    from: 'A\n\nB',
    to: 'A\n\nInvented.\n\nB'
  }, 'A\n\nCanonical.\n\nB'), /restoredText is not present in canonical source/);
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

test('dry-run validates target without modifying the filesystem', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'myessays-migration-'));
  try {
    fs.mkdirSync(path.join(root, 'essays'));
    fs.mkdirSync(path.join(root, 'english-mix'));
    const canonical = '# T\n\n## S\n\nAlpha.\n';
    const variant = '# T\n\n## S\n\nAlpha.\n';
    fs.writeFileSync(path.join(root, 'essays/canonical.md'), canonical);
    fs.writeFileSync(path.join(root, 'english-mix/variant.md'), variant);
    const target = {
      id: 'demo',
      canonical: 'essays/canonical.md',
      variant: 'english-mix/variant.md',
      verifiedRepairability: 'SAFE',
      operations: []
    };
    const result = applyTarget(target, { apply: false, root });
    assert.equal(result.changed, false);
    assert.equal(fs.readFileSync(path.join(root, 'english-mix/variant.md'), 'utf8'), variant);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test('plan preflights all targets before the first write', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'myessays-preflight-'));
  try {
    fs.mkdirSync(path.join(root, 'essays'));
    fs.mkdirSync(path.join(root, 'english-mix'));
    fs.writeFileSync(path.join(root, 'essays/one.md'), '# T\n\n## S\n\nAlpha.\n\nBeta.\n');
    fs.writeFileSync(path.join(root, 'english-mix/one.md'), '# T\n\n## S\n\nAlpha.\nBeta.\n');
    fs.writeFileSync(path.join(root, 'essays/two.md'), '# T\n\n## S\n\nGamma.\n\nDelta.\n');
    fs.writeFileSync(path.join(root, 'english-mix/two.md'), '# T\n\n## S\n\nGamma.\n');

    const before = fs.readFileSync(path.join(root, 'english-mix/one.md'), 'utf8');
    const plan = {
      id: 'test-plan',
      targets: [
        {
          id: 'one', canonical: 'essays/one.md', variant: 'english-mix/one.md', verifiedRepairability: 'SAFE',
          operations: [{ label: 'split', policy: 'structure-only', from: 'Alpha.\nBeta.', to: 'Alpha.\n\nBeta.' }]
        },
        {
          id: 'two', canonical: 'essays/two.md', variant: 'english-mix/two.md', verifiedRepairability: 'SAFE', operations: []
        }
      ]
    };
    assert.throws(() => runPlan(plan, { apply: true, root }), /would still mismatch after plan/);
    assert.equal(fs.readFileSync(path.join(root, 'english-mix/one.md'), 'utf8'), before);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test('migration target must be explicitly verified SAFE', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'myessays-safe-'));
  try {
    fs.mkdirSync(path.join(root, 'essays'));
    fs.mkdirSync(path.join(root, 'english-mix'));
    fs.writeFileSync(path.join(root, 'essays/canonical.md'), '# T\n');
    fs.writeFileSync(path.join(root, 'english-mix/variant.md'), '# T\n');
    assert.throws(() => applyTarget({
      id: 'demo', canonical: 'essays/canonical.md', variant: 'english-mix/variant.md', verifiedRepairability: 'HUMAN_REVIEW', operations: []
    }, { root }), /not explicitly verified SAFE/);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});
