import fs from 'node:fs';
import path from 'node:path';

export const VERSION_DIRECTORIES = Object.freeze({
  'en-mix': 'english-mix',
  'es-mix': 'spanish-mix'
});

export const REQUIRED_CANONICAL_FIELDS = Object.freeze(['id', 'title', 'created']);

export function normalizeNewlines(value = '') {
  return String(value).replace(/\r\n?/g, '\n');
}

export function parseFrontMatterSource(source = '') {
  const text = normalizeNewlines(source);
  const match = text.match(/^---\n([\s\S]*?)\n---(?:\n|$)/);
  if (!match) return { meta: {}, body: text, issues: ['missing-front-matter'] };

  const meta = {};
  for (const line of match[1].split('\n')) {
    const separator = line.indexOf(':');
    if (separator < 0) continue;
    const key = line.slice(0, separator).trim();
    const raw = line.slice(separator + 1).trim();
    if (!key) continue;
    try { meta[key] = JSON.parse(raw); }
    catch { meta[key] = raw.replace(/^['"]|['"]$/g, ''); }
  }

  return {
    meta,
    body: text.slice(match[0].length),
    issues: []
  };
}

export function listMarkdown(root, directory) {
  const directoryPath = path.join(root, directory);
  if (!fs.existsSync(directoryPath)) return [];
  return fs.readdirSync(directoryPath, { withFileTypes: true })
    .filter(entry => entry.isFile() && entry.name.endsWith('.md') && entry.name !== 'README.md')
    .map(entry => `${directory}/${entry.name}`)
    .sort();
}

function textValue(value) {
  return value == null ? '' : String(value).trim();
}

function readArticle(root, file) {
  const source = fs.readFileSync(path.join(root, file), 'utf8');
  const parsed = parseFrontMatterSource(source);
  return {
    path: file,
    source,
    ...parsed,
    id: textValue(parsed.meta.id)
  };
}

function pushIssue(target, code, detail) {
  target.push({ code, ...detail });
}

export function buildContentGraph(root = process.cwd()) {
  const canonicalFiles = listMarkdown(root, 'essays');
  const canonical = [];
  const derived = [];
  const errors = [];
  const warnings = [];
  const canonicalById = new Map();

  for (const file of canonicalFiles) {
    const article = readArticle(root, file);
    canonical.push(article);

    if (article.issues.includes('missing-front-matter')) {
      pushIssue(errors, 'MISSING_FRONT_MATTER', { path: file });
      continue;
    }

    for (const field of REQUIRED_CANONICAL_FIELDS) {
      if (!textValue(article.meta[field])) {
        pushIssue(errors, 'MISSING_REQUIRED_FIELD', { path: file, field });
      }
    }

    const created = textValue(article.meta.created);
    if (created && !/^\d{4}-\d{2}-\d{2}$/.test(created)) {
      pushIssue(errors, 'INVALID_CREATED_DATE', { path: file, value: created });
    }

    if (!article.id) continue;
    if (canonicalById.has(article.id)) {
      pushIssue(errors, 'DUPLICATE_CANONICAL_ID', {
        id: article.id,
        paths: [canonicalById.get(article.id).path, file]
      });
      continue;
    }
    canonicalById.set(article.id, article);
  }

  const derivedByKey = new Map();

  for (const [version, directory] of Object.entries(VERSION_DIRECTORIES)) {
    for (const file of listMarkdown(root, directory)) {
      const article = readArticle(root, file);
      const record = { ...article, version };
      derived.push(record);

      if (article.issues.includes('missing-front-matter')) {
        pushIssue(errors, 'MISSING_FRONT_MATTER', { path: file, version });
        continue;
      }

      if (!article.id) {
        pushIssue(errors, 'MISSING_DERIVED_ID', { path: file, version });
        continue;
      }

      if (!canonicalById.has(article.id)) {
        pushIssue(errors, 'ORPHAN_DERIVED_VERSION', {
          id: article.id,
          path: file,
          version
        });
      }

      const key = `${article.id}:${version}`;
      if (derivedByKey.has(key)) {
        pushIssue(errors, 'DUPLICATE_READING_MODE', {
          id: article.id,
          version,
          paths: [derivedByKey.get(key).path, file]
        });
      } else {
        derivedByKey.set(key, record);
      }

      const expectedBasename = `${article.id}.md`;
      if (path.basename(file) !== expectedBasename) {
        pushIssue(warnings, 'DERIVED_FILENAME_ID_MISMATCH', {
          id: article.id,
          path: file,
          expectedBasename,
          version
        });
      }
    }
  }

  return {
    root,
    canonical,
    derived,
    canonicalById,
    errors,
    warnings
  };
}

function sortDiscoveredCanonical(a, b) {
  const aCreated = textValue(a.meta.created);
  const bCreated = textValue(b.meta.created);
  const byDate = bCreated.localeCompare(aCreated);
  return byDate || a.path.localeCompare(b.path);
}

export function buildGeneratedIndexes(
  graph,
  { currentIndex = { essays: [] }, currentVersions = { articles: {} } } = {}
) {
  const canonicalPaths = graph.canonical.map(article => article.path);
  const canonicalPathSet = new Set(canonicalPaths);
  const oldCanonicalPaths = Array.isArray(currentIndex?.essays) ? currentIndex.essays : [];
  const oldCanonicalSet = new Set(oldCanonicalPaths);

  // Existing order is treated only as a presentation hint. Membership always
  // comes from the Markdown files that actually exist on disk.
  const discoveredCanonical = graph.canonical
    .filter(article => !oldCanonicalSet.has(article.path))
    .sort(sortDiscoveredCanonical)
    .map(article => article.path);
  const retainedSeen = new Set();
  const retainedCanonical = oldCanonicalPaths.filter(file => {
    if (!canonicalPathSet.has(file) || retainedSeen.has(file)) return false;
    retainedSeen.add(file);
    return true;
  });

  const index = {
    essays: [...discoveredCanonical, ...retainedCanonical]
  };

  const actualVersions = new Map();
  for (const article of graph.derived) {
    if (!article.id) continue;
    if (!actualVersions.has(article.id)) actualVersions.set(article.id, {});
    actualVersions.get(article.id)[article.version] = article.path;
  }

  const currentArticles = currentVersions?.articles && typeof currentVersions.articles === 'object'
    ? currentVersions.articles
    : {};

  const actualIds = [...actualVersions.keys()];
  const currentIds = Object.keys(currentArticles).filter(id => actualVersions.has(id));
  const currentIdSet = new Set(currentIds);
  const discoveredIds = actualIds.filter(id => !currentIdSet.has(id)).sort();
  const orderedIds = [...discoveredIds, ...currentIds];

  const articles = {};
  for (const id of orderedIds) {
    const actual = actualVersions.get(id) || {};
    const entry = {};
    for (const version of Object.keys(VERSION_DIRECTORIES)) {
      if (actual[version]) entry[version] = actual[version];
    }
    if (Object.keys(entry).length) articles[id] = entry;
  }

  return {
    index,
    versionsIndex: { articles }
  };
}

export function readJsonIfExists(root, file, fallback) {
  const fullPath = path.join(root, file);
  if (!fs.existsSync(fullPath)) return fallback;
  return JSON.parse(fs.readFileSync(fullPath, 'utf8'));
}

export function readCurrentIndexes(root = process.cwd()) {
  return {
    currentIndex: readJsonIfExists(root, 'data/index.json', { essays: [] }),
    currentVersions: readJsonIfExists(root, 'data/versions-index.json', { articles: {} })
  };
}

export function formatIssue(issue) {
  const details = Object.entries(issue)
    .filter(([key]) => key !== 'code')
    .map(([key, value]) => `${key}=${Array.isArray(value) ? value.join(',') : value}`)
    .join(' ');
  return `${issue.code}${details ? ` ${details}` : ''}`;
}
