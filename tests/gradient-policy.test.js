const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');

// Gradients are for light only: ambient light, the reading lamp, edge fades and loading.
const ALLOWED = {
  'styles.css': 2,
  'reader-reading-pivot.css': 1,
  'reader-v2.css': 1,
  'reader-resonance.css': 2,
  'phenomenology-visuals.css': 7
};

test('gradients are used only as light, edge fades or loading', () => {
  for (const file of fs.readdirSync(root).filter(name => name.endsWith('.css'))) {
    const count = (fs.readFileSync(path.join(root, file), 'utf8').match(/gradient\(/g) || []).length;
    assert.ok(count <= (ALLOWED[file] || 0), `${file}: ${count} gradients > ${ALLOWED[file] || 0}`);
  }
});
