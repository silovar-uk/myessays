from pathlib import Path
import runpy

ROOT = Path(__file__).resolve().parents[1]
runpy.run_path(str(ROOT / 'tools' / 'apply-route-state-migration-v3.py'), run_name='__route_state_v3__')

# Reader navigation had a compact optional-match variant rather than the
# standard helper shape. Migrate it explicitly to the shared route state.
path = ROOT / 'reader-navigation.js'
text = path.read_text(encoding='utf-8')
old = """    const rawId = location.hash.match(/^#\\/essay\\/(.+)$/)?.[1];\n    if (!rawId) return null;\n    let id = rawId;\n    try { id = decodeURIComponent(rawId); } catch {}\n    return getAllEssays().find(essay => essay.id === id) || null;"""
new = """    const id = window.MyEssaysRoute?.parse?.().articleId || '';\n    if (!id) return null;\n    return getAllEssays().find(essay => essay.id === id) || null;"""
count = text.count(old)
if count != 1:
    raise SystemExit(f'reader-navigation.js route parser: expected 1 match, found {count}')
path.write_text(text.replace(old, new, 1), encoding='utf-8')

# Fail closed if any other runtime still parses the essay hash directly.
marker = "location.hash.match(/^#\\/essay\\/"
remaining = []
for js in ROOT.glob('*.js'):
    if js.name == 'route-state.js':
        continue
    if marker in js.read_text(encoding='utf-8'):
        remaining.append(js.name)
if remaining:
    raise SystemExit('Unmigrated essay hash parsers: ' + ', '.join(sorted(remaining)))

print('Route state migration v4 applied; direct parser ownership is clean.')
