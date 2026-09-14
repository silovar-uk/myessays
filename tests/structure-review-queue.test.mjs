import test from 'node:test';
import assert from 'node:assert/strict';

import { buildReviewQueue, renderReviewQueue } from '../scripts/build-structure-review-queue.mjs';

function packet(id, overrides = {}) {
  return {
    id,
    variant: 'en-mix',
    canonicalPath: `essays/2026-09-14-${id}.md`,
    variantPath: `english-mix/${id}.md`,
    sectionIndex: 1,
    issueKind: 'COUNT_MISMATCH',
    classification: 'MERGE_OR_OMISSION',
    repairability: 'HUMAN_REVIEW',
    canonicalCount: 5,
    variantCount: 4,
    confidence: 'MEDIUM',
    suspectedRange: { ratio: 0.25 },
    ...overrides
  };
}

const generatedAt = '2026-09-14T12:00:00.000Z';

test('unreviewed candidates remain review-only even with high priority', () => {
  const payload = buildReviewQueue({ generatedAt, packets: [packet('local', { confidence: 'HIGH', suspectedRange: { ratio: 0.1 } })] }, { decisions: {} });
  const row = payload.queue[0];
  assert.equal(row.lifecycle, 'UNREVIEWED');
  assert.equal(row.nextAction, 'REVIEW');
  assert.equal(row.decision, null);
  assert.ok(row.reviewPriority > 50);
});

test('decision ledger separates editorial pending from migration ready', () => {
  const packets = { generatedAt, packets: [packet('editorial'), packet('safe')] };
  const decisions = { decisions: {
    'editorial:en-mix': { status: 'EDITORIAL_REWRITE_REQUIRED', strategy: 'REGENERATE_SECTION', reviewedAt: '2026-09-14', reason: 'Semantic condensation.' },
    'safe:en-mix': { status: 'SAFE_STRUCTURE_ONLY', strategy: 'WHITESPACE_ONLY', reviewedAt: '2026-09-14', reason: 'Only paragraph boundaries differ.' }
  } };
  const payload = buildReviewQueue(packets, decisions);
  const editorial = payload.queue.find(row => row.id === 'editorial');
  const safe = payload.queue.find(row => row.id === 'safe');
  assert.equal(editorial.lifecycle, 'REVIEWED_BUT_PENDING');
  assert.equal(editorial.nextAction, 'REGENERATE_SECTION');
  assert.equal(safe.lifecycle, 'MIGRATION_READY');
  assert.equal(safe.nextAction, 'BUILD_MIGRATION_PLAN');
});

test('historical ALIGNED decision cannot hide a current regression', () => {
  const payload = buildReviewQueue(
    { generatedAt, packets: [packet('regressed')] },
    { decisions: { 'regressed:en-mix': { status: 'ALIGNED', strategy: 'FIX', reviewedAt: '2026-09-14' } } }
  );
  const row = payload.queue[0];
  assert.equal(row.lifecycle, 'UNREVIEWED');
  assert.equal(row.nextAction, 'REVIEW_REGRESSION');
  assert.equal(row.decision, 'ALIGNED');
});

test('segmentability is diagnostic only and follows localized count mismatches', () => {
  const high = buildReviewQueue({ generatedAt, packets: [packet('high', { suspectedRange: { ratio: 0.2 } })] }, { decisions: {} }).queue[0];
  const low = buildReviewQueue({ generatedAt, packets: [packet('low', { suspectedRange: { ratio: 0.9 } })] }, { decisions: {} }).queue[0];
  assert.equal(high.segmentability, 'HIGH');
  assert.equal(low.segmentability, 'LOW');
  assert.equal(high.lifecycle, 'UNREVIEWED');
});

test('review priority rewards localized, recent, lower-delta candidates', () => {
  const localized = packet('localized', { confidence: 'HIGH', suspectedRange: { ratio: 0.1 }, canonicalCount: 5, variantCount: 4 });
  const diffuse = packet('diffuse', { confidence: 'LOW', suspectedRange: { ratio: 0.9 }, canonicalCount: 12, variantCount: 4 });
  const payload = buildReviewQueue({ generatedAt, packets: [localized, diffuse] }, { decisions: {} });
  assert.ok(payload.queue.find(row => row.id === 'localized').reviewPriority > payload.queue.find(row => row.id === 'diffuse').reviewPriority);
});

test('markdown exposes next reviews and prior editorial decisions', () => {
  const packets = { generatedAt, packets: [packet('fresh'), packet('known')] };
  const decisions = { decisions: { 'known:en-mix': { status: 'EDITORIAL_REWRITE_REQUIRED', strategy: 'REGENERATE_SECTION', reviewedAt: '2026-09-14', reason: 'Known semantic rewrite.' } } };
  const markdown = renderReviewQueue(buildReviewQueue(packets, decisions));
  assert.match(markdown, /Next 15 reviews/);
  assert.match(markdown, /fresh/);
  assert.match(markdown, /EDITORIAL_REWRITE_REQUIRED/);
  assert.match(markdown, /Known semantic rewrite/);
});
