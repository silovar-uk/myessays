/* Paste the generated .txt bookmarklet into a Safari bookmark URL. */
(() => {
  if (window.CONTEXT_LENS) { window.CONTEXT_LENS.toggle(); return; }
  const d = document, id = '__context_lens_loader__';
  if (d.getElementById(id)) return;
  const s = d.createElement('script'); s.id = id;
  s.src = 'https://silovar-uk.github.io/myessays/tools/context-lens.js?v=1.0.0';
  s.referrerPolicy = 'no-referrer';
  let done = false;
  const fail = () => {
    if (done) return; done = true; clearTimeout(timer); s.remove();
    const panel = d.createElement('div');
    panel.style.cssText = 'position:fixed;bottom:0;left:0;right:0;z-index:2147483647;background:#14241f;color:white;padding:24px;font:16px/1.6 sans-serif;';
    const message = d.createElement('p'); message.textContent = 'Context Lensを起動できませんでした。通信障害、またはこのページの外部JavaScript制限が考えられます。再実行するか、導入ページで代替手順を確認してください。';
    const link = d.createElement('a'); link.href = 'https://silovar-uk.github.io/myessays/tools/context-lens/'; link.target='_blank'; link.rel='noopener noreferrer'; link.textContent='導入・代替手順を開く'; link.style.cssText='color:#b5f2d3;display:inline-block;padding:12px;';
    const close = d.createElement('button'); close.textContent='閉じる'; close.style.cssText='padding:12px;margin-left:12px;'; close.onclick=()=>panel.remove();
    panel.append(message,link,close); (d.body||d.documentElement).appendChild(panel);
  };
  const timer = setTimeout(fail,12000);
  s.onerror=fail; s.onload=()=>{if(!window.CONTEXT_LENS){fail();return;}done=true;clearTimeout(timer);s.remove();};
  try {(d.head||d.documentElement).appendChild(s);} catch {fail();}
})();
