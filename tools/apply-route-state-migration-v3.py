from pathlib import Path
import runpy

ROOT = Path(__file__).resolve().parents[1]

# Reuse the validated v2 migration, then migrate the remaining bridge parser
# that static ownership QA discovered.
runpy.run_path(str(ROOT / 'tools' / 'apply-route-state-migration-v2.py'), run_name='__route_state_v2__')

path = ROOT / 'reader-gpt-bridge.js'
text = path.read_text(encoding='utf-8')
old = """  function idFromHash() {\n    const match = location.hash.match(/^#\\/essay\\/(.+)$/);\n    if (!match) return '';\n    try { return decodeURIComponent(match[1]); } catch { return match[1]; }\n  }"""
new = """  function idFromHash() {\n    return window.MyEssaysRoute?.parse?.().articleId || '';\n  }"""
count = text.count(old)
if count != 1:
    raise SystemExit(f'reader-gpt-bridge.js route parser: expected 1 match, found {count}')
path.write_text(text.replace(old, new, 1), encoding='utf-8')

print('Route state migration v3 applied.')
