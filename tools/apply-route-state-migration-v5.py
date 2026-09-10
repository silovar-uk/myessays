from pathlib import Path
import runpy

ROOT = Path(__file__).resolve().parents[1]
runpy.run_path(str(ROOT / 'tools' / 'apply-route-state-migration-v3.py'), run_name='__route_state_v3__')


def replace_once(path, old, new, label):
    file = ROOT / path
    text = file.read_text(encoding='utf-8')
    count = text.count(old)
    if count != 1:
        raise SystemExit(f'{label}: expected 1 match, found {count}')
    file.write_text(text.replace(old, new, 1), encoding='utf-8')


# Navigation has two legacy readers: getCurrentEssay and its fallback listener.
replace_once(
    'reader-navigation.js',
    """    const rawId = location.hash.match(/^#\\/essay\\/(.+)$/)?.[1];\n    if (!rawId) return null;\n    let id = rawId;\n    try { id = decodeURIComponent(rawId); } catch {}\n    return getAllEssays().find(essay => essay.id === id) || null;""",
    """    const id = window.MyEssaysRoute?.parse?.().articleId || '';\n    if (!id) return null;\n    return getAllEssays().find(essay => essay.id === id) || null;""",
    'reader-navigation current essay route parser'
)
replace_once(
    'reader-navigation.js',
    """      const id = location.hash.match(/^#\\/essay\\/(.+)$/)?.[1];\n      const root = document.getElementById('readerContent');\n      if (!id || !root) return;\n      const decoded = decodeURIComponent(id);\n      const essay = getAllEssays().find(item => item.id === decoded);""",
    """      const id = window.MyEssaysRoute?.parse?.().articleId || '';\n      const root = document.getElementById('readerContent');\n      if (!id || !root) return;\n      const essay = getAllEssays().find(item => item.id === id);""",
    'reader-navigation fallback route parser'
)

replace_once(
    'reader-reflections.js',
    """  const idFromHash = () => {\n    const m = location.hash.match(/^#\\/essay\\/(.+)$/);\n    if (!m) return '';\n    try { return decodeURIComponent(m[1]); } catch { return m[1]; }\n  };""",
    """  const idFromHash = () => window.MyEssaysRoute?.parse?.().articleId || '';""",
    'reader-reflections route parser'
)

replace_once(
    'reader-runtime.js',
    """  function essayIdFromHash() {\n    const match = location.hash.match(/^#\\/essay\\/(.+)$/);\n    if (!match) return '';\n    try { return decodeURIComponent(match[1]); }\n    catch { return match[1]; }\n  }""",
    """  function essayIdFromHash() {\n    return window.MyEssaysRoute?.parse?.().articleId || '';\n  }""",
    'reader-runtime route parser'
)

simple = """    const match = location.hash.match(/^#\\/essay\\/(.+)$/);\n    if (!match) return '';\n    try { return decodeURIComponent(match[1]); }\n    catch { return match[1]; }"""
for filename in ['reader-v2-stability.js', 'reading-state-ui.js']:
    replace_once(filename, simple, "    return window.MyEssaysRoute?.parse?.().articleId || '';", f'{filename} route parser')

replace_once(
    'ui-enhancements.js',
    """  function currentEssayId() {\n    const match = location.hash.match(/^#\\/essay\\/(.+)$/);\n    return match ? decodeURIComponent(match[1]) : '';\n  }""",
    """  function currentEssayId() {\n    return window.MyEssaysRoute?.parse?.().articleId || '';\n  }""",
    'ui-enhancements route parser'
)

# Every runtime touched by route parsing gets a fresh cache key.
index = ROOT / 'index.html'
html = index.read_text(encoding='utf-8')
cache_updates = {
    'reader-runtime.js?v=20260816-1856': 'reader-runtime.js?v=20260910-1',
    'reader-navigation.js?v=20260829-2033': 'reader-navigation.js?v=20260910-1',
    'reader-reflections.js?v=20260816-1856': 'reader-reflections.js?v=20260910-1',
    'reader-gpt-bridge.js?v=20260817-1017': 'reader-gpt-bridge.js?v=20260910-1',
    'ui-enhancements.js?v=20260824-2337': 'ui-enhancements.js?v=20260910-1',
    'reading-state-ui.js?v=20260822-2140': 'reading-state-ui.js?v=20260910-1',
    'reader-v2-stability.js?v=20260907-1': 'reader-v2-stability.js?v=20260910-1',
}
for old, new in cache_updates.items():
    if old not in html:
        raise SystemExit(f'cache key not found: {old}')
    html = html.replace(old, new, 1)
index.write_text(html, encoding='utf-8')

# Fail closed: route-state.js is the only root runtime allowed to understand
# the essay hash grammar directly.
marker = "location.hash.match(/^#\\/essay\\/"
remaining = []
for js in ROOT.glob('*.js'):
    if js.name == 'route-state.js':
        continue
    if marker in js.read_text(encoding='utf-8'):
        remaining.append(js.name)
if remaining:
    raise SystemExit('Unmigrated essay hash parsers: ' + ', '.join(sorted(remaining)))

print('Route state migration v5 applied; route ownership is centralized.')
