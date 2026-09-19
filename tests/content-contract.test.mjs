import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

import {
  buildContentGraph,
  buildGeneratedIndexes
} from '../scripts/content-contract.mjs';

function fixture() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'myessays-content-'));
  for (const directory of ['essays', 'english-mix', 'spanish-mix', 'data']) {
    fs.mkdirSync(path.join(root, directory), { recursive: true });
  }
  return root;
}

function write(root, file, source) {
  const target = path.join(root, file);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, source);
}

function canonical(id, created = '2026-09-19', title = id) {
  return `---
id: ${id}
title: "${title}"
created: "${created}"
---

# ${title}
`;
}

function derived(id) {
  return `---
id: ${id}
title: "${id}"
created: "2026-09-19"
---

# ${id}
`;
}

test('Markdown membership generates canonical and Reading Mode indexes', () => {
  const root = fixture();
  write(root, 'essays/2026-09-19-alpha.md', canonical('alpha'));
  write(root, 'english-mix/alpha.md', derived('alpha'));

  const graph = buildContentGraph(root);
  assert.deepEqual(graph.errors, []);

  const generated = buildGeneratedIndexes(graph);
  assert.deepEqual(generated.index.essays, ['essays/2026-09-19-alpha.md']);
  assert.deepEqual(generated.versionsIndex, {
    articles: {
      alpha: {
        'en-mix': 'english-mix/alpha.md'
      }
    }
  });
});

test('generated canonical membership removes stale paths and discovers new Markdown', () => {
  const root = fixture();
  write(root, 'essays/2026-09-18-existing.md', canonical('existing', '2026-09-18'));
  write(root, 'essays/2026-09-19-new.md', canonical('new', '2026-09-19'));

  const graph = buildContentGraph(root);
  const generated = buildGeneratedIndexes(graph, {
    currentIndex: {
      essays: [
        'essays/2026-09-18-existing.md',
        'essays/2026-09-17-deleted.md'
      ]
    },
    currentVersions: { articles: {} }
  });

  assert.deepEqual(generated.index.essays, [
    'essays/2026-09-19-new.md',
    'essays/2026-09-18-existing.md'
  ]);
});

test('old unindexed Markdown is inserted by created date without taking over Latest', () => {
  const root = fixture();
  write(root, 'essays/2026-09-19-latest.md', canonical('latest', '2026-09-19'));
  write(root, 'essays/2026-09-17-existing.md', canonical('existing', '2026-09-17'));
  write(root, 'essays/2026-09-18-forgotten.md', canonical('forgotten', '2026-09-18'));

  const graph = buildContentGraph(root);
  const generated = buildGeneratedIndexes(graph, {
    currentIndex: {
      essays: [
        'essays/2026-09-19-latest.md',
        'essays/2026-09-17-existing.md'
      ]
    },
    currentVersions: { articles: {} }
  });

  assert.deepEqual(generated.index.essays, [
    'essays/2026-09-19-latest.md',
    'essays/2026-09-18-forgotten.md',
    'essays/2026-09-17-existing.md'
  ]);
});

test('generated canonical index removes duplicate registered paths', () => {
  const root = fixture();
  write(root, 'essays/2026-09-19-alpha.md', canonical('alpha'));

  const graph = buildContentGraph(root);
  const generated = buildGeneratedIndexes(graph, {
    currentIndex: {
      essays: [
        'essays/2026-09-19-alpha.md',
        'essays/2026-09-19-alpha.md'
      ]
    },
    currentVersions: { articles: {} }
  });

  assert.deepEqual(generated.index.essays, ['essays/2026-09-19-alpha.md']);
});

test('duplicate canonical ids fail the content contract', () => {
  const root = fixture();
  write(root, 'essays/2026-09-19-a.md', canonical('same'));
  write(root, 'essays/2026-09-19-b.md', canonical('same'));

  const graph = buildContentGraph(root);
  assert.ok(graph.errors.some(issue => issue.code === 'DUPLICATE_CANONICAL_ID'));
});

test('orphan derived Reading Mode fails the content contract', () => {
  const root = fixture();
  write(root, 'english-mix/orphan.md', derived('orphan'));

  const graph = buildContentGraph(root);
  assert.ok(graph.errors.some(issue => issue.code === 'ORPHAN_DERIVED_VERSION'));
});

test('duplicate Reading Modes for one article fail the content contract', () => {
  const root = fixture();
  write(root, 'essays/2026-09-19-alpha.md', canonical('alpha'));
  write(root, 'english-mix/alpha.md', derived('alpha'));
  write(root, 'english-mix/another-name.md', derived('alpha'));

  const graph = buildContentGraph(root);
  assert.ok(graph.errors.some(issue => issue.code === 'DUPLICATE_READING_MODE'));
});

test('derived filename/id mismatch is visible without breaking legacy content', () => {
  const root = fixture();
  write(root, 'essays/2026-09-19-alpha.md', canonical('alpha'));
  write(root, 'english-mix/legacy-name.md', derived('alpha'));

  const graph = buildContentGraph(root);
  assert.deepEqual(graph.errors, []);
  assert.ok(graph.warnings.some(issue => issue.code === 'DERIVED_FILENAME_ID_MISMATCH'));
});

test('index generation is deterministic', () => {
  const root = fixture();
  write(root, 'essays/2026-09-18-b.md', canonical('b', '2026-09-18'));
  write(root, 'essays/2026-09-19-a.md', canonical('a', '2026-09-19'));
  write(root, 'english-mix/a.md', derived('a'));

  const graph = buildContentGraph(root);
  const options = {
    currentIndex: { essays: ['essays/2026-09-18-b.md'] },
    currentVersions: { articles: {} }
  };

  const first = buildGeneratedIndexes(graph, options);
  const second = buildGeneratedIndexes(graph, options);
  assert.deepEqual(first, second);
});
