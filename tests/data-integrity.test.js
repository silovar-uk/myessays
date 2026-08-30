const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const exists = file => fs.existsSync(path.join(root, file));

function frontMatter(file) {
  const source = read(file).replace(/\r\n?/g, '\n');
  const match = source.match(/^---\n([\s\S]*?)\n---(?:\n|$)/);
  assert.ok(match, `${file} must start with front matter`);

  const meta = {};
  for (const line of match[1].split('\n')) {
    const separator = line.indexOf(':');
    if (separator < 0) continue;
    const key = line.slice(0, separator).trim();
    const raw = line.slice(separator + 1).trim();
    try { meta[key] = JSON.parse(raw); }
    catch { meta[key] = raw.replace(/^['"]|['"]$/g, ''); }
  }
  return meta;
}

function markdownFiles(directory) {
  return fs.readdirSync(path.join(root, directory))
    .filter(file => file.endsWith('.md') && file !== 'README.md')
    .map(file => `${directory}/${file}`)
    .sort();
}

const canonicalIndex = JSON.parse(read('data/index.json'));
const canonicalPaths = canonicalIndex.essays || [];
const versionsIndex = JSON.parse(read('data/versions-index.json'));
const versions = versionsIndex.articles || {};
const versionDirectories = {
  'en-mix': 'english-mix',
  'es-mix': 'spanish-mix'
};

test('canonical essay index contains unique existing Japanese markdown files', () => {
  assert.ok(Array.isArray(canonicalPaths) && canonicalPaths.length > 0, 'data/index.json must contain essays');
  assert.equal(new Set(canonicalPaths).size, canonicalPaths.length, 'data/index.json must not contain duplicate paths');

  canonicalPaths.forEach(file => {
    assert.match(file, /^essays\/.+\.md$/, `canonical path must stay under essays/: ${file}`);
    assert.ok(exists(file), `canonical essay is missing: ${file}`);
  });
});

test('canonical article ids are unique and have minimum required metadata', () => {
  const seenIds = new Map();

  canonicalPaths.forEach(file => {
    const meta = frontMatter(file);
    const id = String(meta.id || '').trim();
    const title = String(meta.title || '').trim();
    const created = String(meta.created || '').trim();

    assert.ok(id, `${file} is missing id`);
    assert.ok(title, `${file} is missing title`);
    assert.match(created, /^\d{4}-\d{2}-\d{2}$/, `${file} has invalid created date: ${created}`);
    assert.equal(seenIds.has(id), false, `duplicate article id ${id}: ${seenIds.get(id)} and ${file}`);
    seenIds.set(id, file);
  });
});

test('every derived version belongs to a canonical article and declares the same id', () => {
  const canonicalIds = new Set(canonicalPaths.map(file => String(frontMatter(file).id || '').trim()));

  Object.entries(versions).forEach(([articleId, entries]) => {
    assert.ok(canonicalIds.has(articleId), `versions-index contains non-canonical article id: ${articleId}`);
    Object.entries(entries || {}).forEach(([version, file]) => {
      assert.ok(Object.hasOwn(versionDirectories, version), `${articleId} has unsupported version ${version}`);
      assert.ok(exists(file), `${articleId}/${version} points to missing file: ${file}`);
      assert.match(file, new RegExp(`^${versionDirectories[version]}/`), `${articleId}/${version} must stay under ${versionDirectories[version]}/: ${file}`);
      const meta = frontMatter(file);
      assert.equal(String(meta.id || '').trim(), articleId, `${file} must keep canonical id ${articleId}`);
    });
  });
});

test('derived markdown files are indexed exactly once and never enter the canonical index', () => {
  const actualDerived = [
    ...markdownFiles('english-mix'),
    ...markdownFiles('spanish-mix')
  ].sort();
  const indexedDerived = Object.values(versions)
    .flatMap(entries => Object.values(entries || {}))
    .sort();

  assert.deepEqual(indexedDerived, actualDerived, 'derived markdown files and versions-index must match exactly');
  actualDerived.forEach(file => {
    assert.equal(canonicalPaths.includes(file), false, `derived file must not be listed in data/index.json: ${file}`);
  });
});

test('legacy full-Spanish content directory is no longer an active publishing surface', () => {
  assert.equal(exists('spanish'), false, 'legacy spanish/ directory should be removed; use spanish-mix/');
  assert.ok(exists('spanish-mix/README.md'), 'Español Mix publishing contract should live under spanish-mix/');
});
