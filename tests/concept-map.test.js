const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const mapDir = path.join(root, 'data/concept-maps');
const indexed = JSON.parse(read('data/index.json')).essays;
const canonical = new Map(indexed.map(file => {
  const text = read(file);
  const id = text.match(/^id:\s*(.+)$/m)?.[1].replace(/^["']|["']$/g, '').trim();
  return [id, { path: file, headings: (text.match(/^##\s+/gm) || []).length }];
}));

test('concept map is an optional extension of Reader Map', () => {
  const html = read('index.html');
  const js = read('reader-concept-map.js');
  const reader = read('reader-v2.js');
  assert.match(html, /reader-concept-map\.js/);
  assert.match(html, /reader-concept-map\.css/);
  assert.match(reader, /MyEssaysConceptMap\?\.attach/);
  assert.match(js, /reader-v2-map-body/);
  assert.match(js, /MyEssaysReadingLocation\?\.scrollToSection/);
  assert.doesNotMatch(js, /new MutationObserver|addEventListener\(['"]scroll/);
});

test('all curated maps have valid links and canonical H2 positions', () => {
  const names = fs.readdirSync(mapDir).filter(file => file.endsWith('.json'));
  assert.ok(names.length >= 3);
  for (const name of names) {
    const map = JSON.parse(read('data/concept-maps/' + name));
    const article = canonical.get(map.articleId);
    assert.ok(article, name + ': canonical article missing');
    assert.equal(name, map.articleId + '.json');
    assert.equal(map.schemaVersion, 1);
    assert.equal(map.status, 'editor-reviewed');
    assert.ok(map.question && map.shortThesis);
    assert.ok(map.nodes.length >= 2 && map.nodes.length <= 9);
    assert.ok(map.edges.length >= 1 && map.edges.length <= 14);
    const ids = new Set(map.nodes.map(node => node.id));
    assert.equal(ids.size, map.nodes.length, name + ': duplicate node');
    for (const node of map.nodes) {
      assert.ok(node.label && node.description && node.fullLabel, name + ': incomplete node');
      assert.ok(Number.isInteger(node.sectionIndex) && node.sectionIndex >= 0 &&
        node.sectionIndex < article.headings, name + ': bad H2 section of ' + node.id);
      assert.ok(Number.isFinite(node.x) && Number.isFinite(node.y));
      assert.ok(node.x >= 14 && node.x <= 86 && node.y >= 14 && node.y <= 86);
      for (const other of map.nodes) {
        if (other.id === node.id) continue;
        assert.ok(Math.abs(other.x - node.x) >= 25 || Math.abs(other.y - node.y) >= 18,
          name + ': crowded nodes ' + node.id + ' and ' + other.id);
      }
    }
    const uniqueEdges = new Set();
    for (const edge of map.edges) {
      assert.ok(ids.has(edge.from) && ids.has(edge.to) && edge.from !== edge.to, name + ': bad edge');
      assert.ok(edge.label && ['source-backed', 'interpretation', 'hypothesis', 'unknown'].includes(edge.certainty),
        name + ': missing relationship explanation/certainty');
      const key = [edge.from, edge.to].sort().join('|');
      assert.ok(!uniqueEdges.has(key), name + ': duplicate relationship');
      uniqueEdges.add(key);
    }
    const graph = new Set([map.nodes[0].id]);
    let previous = -1;
    while (graph.size !== previous) {
      previous = graph.size;
      for (const edge of map.edges) {
        if (graph.has(edge.from)) graph.add(edge.to);
        if (graph.has(edge.to)) graph.add(edge.from);
      }
    }
    assert.equal(graph.size, map.nodes.length, name + ': disconnected node');
  }
});
