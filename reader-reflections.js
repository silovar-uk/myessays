(() => {
  const ROOT = '.reader-reflections';
  const ENTRY_KEY = 'myessays:reader-reflections:v1:';
  const DRAFT_KEY = 'myessays:reader-reflections:draft:v1:';
  const DRAFT_MS = 420, UNDO_MS = 10000, MAX_CHARS = 300, MAX_LINES = 8;
  const prompts = ['一番残ったことは？','読み終わって、最初に浮かんだことは？','自分に持ち帰るなら？','まだ引っかかっていることは？'];
  let saveActiveDraft = null, undo = null;

  const idFromHash = () => {
    const m = location.hash.match(/^#\/essay\/(.+)$/);
    if (!m) return '';
    try { return decodeURIComponent(m[1]); } catch { return m[1]; }
  };
  const essayNow = () => {
    const id = idFromHash();
    return id && typeof state !== 'undefined' && Array.isArray(state.essays) ? state.essays.find(x => x.id === id) || null : null;
  };
  const entryKey = id => id ? ENTRY_KEY + id : '';
  const draftKey = id => id ? DRAFT_KEY + id : '';
  const pad = n => String(n).padStart(2,'0');
  const clock = v => { const d=new Date(v); return Number.isNaN(d.getTime())?'':`${pad(d.getHours())}:${pad(d.getMinutes())}`; };
  const fullTime = v => { const d=new Date(v); return Number.isNaN(d.getTime())?'':`${d.getFullYear()}/${pad(d.getMonth()+1)}/${pad(d.getDate())} ${clock(v)}`; };
  const day0 = d => new Date(d.getFullYear(),d.getMonth(),d.getDate()).getTime();

  function relativeTime(v, now=new Date()) {
    const d=new Date(v); if (Number.isNaN(d.getTime())) return '';
    const mins=Math.floor((now-d)/60000);
    if (mins>=0 && mins<1) return 'たった今';
    if (mins<60 && mins>=1) return `${mins}分前`;
    const days=Math.round((day0(now)-day0(d))/86400000);
    if (days===0) return `今日 ${clock(v)}`;
    if (days===1) return `昨日 ${clock(v)}`;
    if (d.getFullYear()===now.getFullYear()) return `${d.getMonth()+1}月${d.getDate()}日`;
    return `${d.getFullYear()}年${d.getMonth()+1}月${d.getDate()}日`;
  }

  function readEntries(id=idFromHash()) {
    try {
      const a=JSON.parse(localStorage.getItem(entryKey(id))||'[]');
      if (!Array.isArray(a)) return [];
      return a.map(x=>{
        if (!x || typeof x!=='object') return null;
        const text=String(x.text||'').trim(), createdAt=String(x.createdAt||'');
        return text&&createdAt?{id:String(x.id||createdAt),text,createdAt,updatedAt:String(x.updatedAt||createdAt)}:null;
      }).filter(Boolean).sort((a,b)=>String(b.createdAt).localeCompare(String(a.createdAt)));
    } catch { return []; }
  }
  function writeEntries(id, entries) {
    try { entries.length?localStorage.setItem(entryKey(id),JSON.stringify(entries)):localStorage.removeItem(entryKey(id)); return true; }
    catch { return false; }
  }
  function readDraft(id=idFromHash()) {
    try { const x=JSON.parse(localStorage.getItem(draftKey(id))||'{}'); return {text:String(x.text||''),updatedAt:String(x.updatedAt||'')}; }
    catch { return {text:'',updatedAt:''}; }
  }
  function writeDraft(id,text) {
    const updatedAt=new Date().toISOString();
    try { text.trim()?localStorage.setItem(draftKey(id),JSON.stringify({text,updatedAt})):localStorage.removeItem(draftKey(id)); return {ok:true,updatedAt}; }
    catch { return {ok:false,updatedAt:''}; }
  }
  function clearDraft(id) { try { localStorage.removeItem(draftKey(id)); return true; } catch { return false; } }
  const uid = () => globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2,9)}`;

  function autosize(t) {
    if (!t) return; t.style.height='auto'; t.style.height=`${t.scrollHeight}px`;
    const max=parseFloat(getComputedStyle(t).maxHeight); t.style.overflowY=Number.isFinite(max)&&t.scrollHeight>max?'auto':'hidden';
  }
  function setText(root,sel,msg,tone='') { const el=root?.querySelector(sel); if(el){el.textContent=msg;el.dataset.tone=tone;} }
  function announce(root,msg,tone='',ms=2600) {
    setText(root,'[data-reflection-status]',msg,tone);
    if(ms) setTimeout(()=>{const el=root?.querySelector('[data-reflection-status]');if(el?.textContent===msg)setText(root,'[data-reflection-status]','');},ms);
  }
  function updateTimes(root) {
    root?.querySelectorAll('.reflection-time').forEach(t=>{t.textContent=`${relativeTime(t.dateTime)}${t.dataset.edited==='true'?' · 編集済み':''}`;});
  }
  async function copyText(text) {
    if(navigator.clipboard?.writeText) return navigator.clipboard.writeText(text);
    const t=document.createElement('textarea'); t.value=text; t.style.cssText='position:fixed;opacity:0'; document.body.append(t); t.select(); document.execCommand('copy'); t.remove();
  }
  function copied(btn) {
    const old=btn.dataset.originalLabel||btn.textContent; btn.dataset.originalLabel=old; btn.textContent='✓ コピー済み'; btn.classList.add('is-copied');
    setTimeout(()=>{if(btn.isConnected){btn.textContent=old;btn.classList.remove('is-copied');}},1800);
  }
  const plainCopy = e => e.map(x=>x.text).join('\n\n---\n\n');
  const detailedCopy = (essay,e) => `記事: ${essay?.title||'My Essays'}\nURL: ${location.href}\n\n読後メモ\n\n${e.map(x=>`作成: ${fullTime(x.createdAt)}${x.updatedAt!==x.createdAt?`\n更新: ${fullTime(x.updatedAt)}`:''}\n${x.text}`).join('\n\n---\n\n')}`;

  function action(label,name,extra='') { const b=document.createElement('button');b.type='button';b.className=`reflection-card-action ${extra}`.trim();b.dataset.action=name;b.textContent=label;return b; }
  const collapsible=(e,i)=>i>0&&(e.text.length>MAX_CHARS||e.text.split(/\n/).length>MAX_LINES);
  function shortText(text){const lines=text.split(/\n/);let s=lines.length>MAX_LINES?lines.slice(0,MAX_LINES).join('\n'):text;return s.length>MAX_CHARS?s.slice(0,MAX_CHARS).trimEnd()+'…':s;}

  function card(entry,index) {
    const el=document.createElement('article'); el.className='reflection-card'; el.dataset.entryId=entry.id;
    const edited=entry.updatedAt&&entry.updatedAt!==entry.createdAt;
    const title=edited?`作成 ${fullTime(entry.createdAt)} / 更新 ${fullTime(entry.updatedAt)}`:`作成 ${fullTime(entry.createdAt)}`;
    const head=document.createElement('div'),meta=document.createElement('div'),time=document.createElement('time'),mark=document.createElement('span');
    head.className='reflection-card-head';meta.className='reflection-card-meta';time.className='reflection-time';time.dateTime=entry.createdAt;time.dataset.edited=String(Boolean(edited));time.title=title;time.setAttribute('aria-label',title);time.textContent=`${relativeTime(entry.createdAt)}${edited?' · 編集済み':''}`;mark.className='reflection-card-marker';mark.textContent=String(index+1).padStart(2,'0');meta.append(time);head.append(meta,mark);el.append(head);
    const body=document.createElement('p'); body.className='reflection-card-text'; body.dataset.editTarget='1'; body.tabIndex=0; body.setAttribute('role','button'); body.setAttribute('aria-label','この読後メモを編集'); body.textContent=collapsible(entry,index)?shortText(entry.text):entry.text;
    el.append(body);
    if(collapsible(entry,index)){const b=document.createElement('button');b.type='button';b.className='reflection-expand-button';b.dataset.expand='1';b.dataset.expanded='false';b.textContent='続きを読む';el.append(b);}
    const edit=document.createElement('div');edit.className='reflection-edit-area';edit.hidden=true;edit.innerHTML='<textarea class="reflection-edit-textarea" rows="4" aria-label="読後メモを編集"></textarea><div class="reflection-edit-hint"><span>フォーカスを外すと保存</span><span><kbd>Esc</kbd> 取消 · <kbd>Ctrl/⌘ + Enter</kbd> 保存</span></div>';
    const acts=document.createElement('div');acts.className='reflection-card-actions';acts.append(action('コピー','copy'),action('編集','edit'),action('削除','delete','reflection-card-action--danger'));
    el.append(edit,acts); return el;
  }

  function refresh(root,essay,entries=readEntries(essay.id)) {
    root.querySelector('.reflection-list')?.replaceChildren(...entries.map(card));
    const c=root.querySelector('.reflection-heading-count');if(c){c.textContent=String(entries.length);c.title=`${entries.length}件の読後メモ`;}
    const bar=root.querySelector('.reflection-toolbar');if(bar)bar.hidden=!entries.length; updateTimes(root);
  }

  function build(essay) {
    const root=document.createElement('section');root.className='reader-reflections';root.dataset.essayId=essay.id;root.setAttribute('aria-labelledby','readerReflectionsTitle');
    root.innerHTML=`<div class="reader-reflections-heading"><div><p class="reader-reflections-kicker">AFTER READING</p><div class="reader-reflections-title-row"><h2 id="readerReflectionsTitle">読んで、何が残った？</h2><span class="reflection-heading-count" aria-label="読後メモ件数"></span></div></div><p class="reader-reflections-local">このブラウザだけに保存</p></div><div class="reflection-composer"><textarea class="reflection-composer-input" rows="4" spellcheck="true" aria-label="読後メモを追加"></textarea><div class="reflection-composer-footer"><div class="reflection-composer-meta"><span class="reflection-composer-hint"><kbd>Ctrl/⌘ + Enter</kbd> で残す</span><span class="reflection-draft-status" data-draft-status aria-live="polite">下書きなし</span></div><button class="reflection-add-button" type="button" disabled>残す</button></div></div><div class="reflection-toolbar" hidden><div class="reflection-copy-actions"><button type="button" data-copy="plain">メモだけコピー</button><button type="button" data-copy="detail">記事情報込みコピー</button></div></div><p class="reflection-status" data-reflection-status aria-live="polite"></p><div class="reflection-undo" role="status" aria-live="polite" hidden><span>メモを削除しました</span><button type="button" data-undo>元に戻す</button></div><div class="reflection-list"></div>`;
    const input=root.querySelector('.reflection-composer-input'),draft=readDraft(essay.id);input.placeholder=prompts[Math.floor(Math.random()*prompts.length)];input.value=draft.text;
    if(draft.text)setText(root,'[data-draft-status]',draft.updatedAt?`下書き保存済み · ${clock(draft.updatedAt)}`:'下書き保存済み');
    refresh(root,essay); bind(root,essay); requestAnimationFrame(()=>autosize(input)); return root;
  }

  function bind(root,essay) {
    const input=root.querySelector('.reflection-composer-input'),add=root.querySelector('.reflection-add-button'); let draftTimer=0;
    const sync=()=>add.disabled=!input.value.trim();
    const saveDraft=()=>{clearTimeout(draftTimer);draftTimer=0;if(!input.value.trim()){const ok=clearDraft(essay.id);setText(root,'[data-draft-status]',ok?'下書きなし':'下書きを保存できません',ok?'':'error');return ok;}const r=writeDraft(essay.id,input.value);setText(root,'[data-draft-status]',r.ok?`保存済み · ${clock(r.updatedAt)}`:'下書きを保存できません',r.ok?'':'error');return r.ok;};
    const draft=()=>{sync();autosize(input);if(!input.value.trim())return saveDraft();setText(root,'[data-draft-status]','保存中…');clearTimeout(draftTimer);draftTimer=setTimeout(saveDraft,DRAFT_MS);};
    const addEntry=()=>{const text=input.value.trim();if(!text)return;const now=new Date().toISOString(),entries=readEntries(essay.id);entries.unshift({id:uid(),text,createdAt:now,updatedAt:now});if(!writeEntries(essay.id,entries))return announce(root,'メモを保存できませんでした','error',0);clearTimeout(draftTimer);clearDraft(essay.id);input.value='';sync();autosize(input);setText(root,'[data-draft-status]','下書きなし');refresh(root,essay,entries);announce(root,'メモを残しました','success');input.focus({preventScroll:true});};
    saveActiveDraft=saveDraft; sync(); input.addEventListener('input',draft);input.addEventListener('blur',saveDraft);input.addEventListener('keydown',e=>{if((e.metaKey||e.ctrlKey)&&e.key==='Enter'){e.preventDefault();addEntry();}});add.addEventListener('click',addEntry);

    function closeEdit(c,focus=false){if(!c)return;c.classList.remove('is-editing');c.querySelector('.reflection-card-text').hidden=false;const x=c.querySelector('.reflection-expand-button');if(x)x.hidden=false;c.querySelector('.reflection-card-actions').hidden=false;c.querySelector('.reflection-edit-area').hidden=true;if(focus)c.querySelector('.reflection-card-text').focus({preventScroll:true});}
    function saveEdit(c,entry,quiet=false){const t=c?.querySelector('.reflection-edit-textarea');if(!t)return true;const old=String(t.dataset.originalText??entry.text).trim(),text=t.value.trim();if(!text){t.value=old;if(!quiet)announce(root,'空のメモは保存しませんでした','error');closeEdit(c,!quiet);return false;}if(text===old){closeEdit(c,!quiet);return true;}const entries=readEntries(essay.id),x=entries.find(v=>v.id===entry.id);if(!x)return false;x.text=text;x.updatedAt=new Date().toISOString();if(!writeEntries(essay.id,entries)){if(!quiet)announce(root,'変更を保存できませんでした','error',0);return false;}refresh(root,essay,entries);if(!quiet)announce(root,'変更を保存しました','success');return true;}
    function startEdit(c,entry){const target=entry.id,current=root.querySelector('.reflection-card.is-editing');if(current&&current!==c){const e=readEntries(essay.id).find(x=>x.id===current.dataset.entryId);if(e)saveEdit(current,e,true);c=[...root.querySelectorAll('.reflection-card')].find(x=>x.dataset.entryId===target);entry=readEntries(essay.id).find(x=>x.id===target);if(!c||!entry)return;}const body=c.querySelector('.reflection-card-text'),edit=c.querySelector('.reflection-edit-area'),t=edit.querySelector('textarea');c.classList.add('is-editing');body.hidden=true;const exp=c.querySelector('.reflection-expand-button');if(exp)exp.hidden=true;c.querySelector('.reflection-card-actions').hidden=true;edit.hidden=false;t.value=entry.text;t.dataset.originalText=entry.text;delete t.dataset.skipBlurSave;requestAnimationFrame(()=>{autosize(t);t.focus({preventScroll:true});t.setSelectionRange(t.value.length,t.value.length);});}
    function showUndo(entry,index){if(undo?.timer)clearTimeout(undo.timer);undo={essayId:essay.id,entry,index,timer:setTimeout(()=>{undo=null;const el=root.querySelector('.reflection-undo');if(el)el.hidden=true;},UNDO_MS)};root.querySelector('.reflection-undo').hidden=false;}
    function undoDelete(){if(!undo||undo.essayId!==essay.id)return;clearTimeout(undo.timer);const entries=readEntries(essay.id);entries.splice(Math.min(Math.max(undo.index,0),entries.length),0,undo.entry);if(!writeEntries(essay.id,entries))return announce(root,'元に戻せませんでした','error',0);undo=null;root.querySelector('.reflection-undo').hidden=true;refresh(root,essay,entries);announce(root,'メモを元に戻しました','success');}

    root.addEventListener('input',e=>{const t=e.target.closest('.reflection-edit-textarea');if(t)autosize(t);});
    root.addEventListener('focusout',e=>{const t=e.target.closest('.reflection-edit-textarea');if(!t)return;setTimeout(()=>{if(t.dataset.skipBlurSave==='true'){delete t.dataset.skipBlurSave;return;}const c=t.closest('.reflection-card');if(!c||!root.contains(c)||!c.classList.contains('is-editing'))return;const x=readEntries(essay.id).find(v=>v.id===c.dataset.entryId);if(x)saveEdit(c,x);},0);});
    root.addEventListener('keydown',e=>{const t=e.target.closest('.reflection-edit-textarea');if(t){const c=t.closest('.reflection-card'),x=readEntries(essay.id).find(v=>v.id===c?.dataset.entryId);if(!c||!x)return;if(e.key==='Escape'){e.preventDefault();t.dataset.skipBlurSave='true';closeEdit(c,true);}else if((e.metaKey||e.ctrlKey)&&e.key==='Enter'){e.preventDefault();t.dataset.skipBlurSave='true';saveEdit(c,x);}return;}const body=e.target.closest('[data-edit-target]');if(body&&(e.key==='Enter'||e.key===' ')){e.preventDefault();const c=body.closest('.reflection-card'),x=readEntries(essay.id).find(v=>v.id===c?.dataset.entryId);if(c&&x)startEdit(c,x);}});
    root.addEventListener('click',async e=>{
      if(e.target.closest('[data-undo]'))return undoDelete();
      const all=e.target.closest('[data-copy]');if(all){const entries=readEntries(essay.id);if(!entries.length)return;try{await copyText(all.dataset.copy==='detail'?detailedCopy(essay,entries):plainCopy(entries));copied(all);}catch{announce(root,'コピーできませんでした','error');}return;}
      const more=e.target.closest('[data-expand]');if(more){const c=more.closest('.reflection-card'),x=readEntries(essay.id).find(v=>v.id===c?.dataset.entryId),body=c?.querySelector('.reflection-card-text');if(!x||!body)return;const open=more.dataset.expanded==='true';body.textContent=open?shortText(x.text):x.text;more.dataset.expanded=String(!open);more.textContent=open?'続きを読む':'閉じる';return;}
      const b=e.target.closest('[data-action]');if(b){const c=b.closest('.reflection-card'),entries=readEntries(essay.id),i=entries.findIndex(v=>v.id===c?.dataset.entryId),x=entries[i];if(!x)return;if(b.dataset.action==='copy'){try{await copyText(x.text);copied(b);}catch{announce(root,'コピーできませんでした','error');}return;}if(b.dataset.action==='edit')return startEdit(c,x);if(b.dataset.action==='delete'){const next=entries.filter(v=>v.id!==x.id);if(!writeEntries(essay.id,next))return announce(root,'削除できませんでした','error',0);refresh(root,essay,next);showUndo(x,i);return;}}
      const body=e.target.closest('[data-edit-target]');if(body){const c=body.closest('.reflection-card'),x=readEntries(essay.id).find(v=>v.id===c?.dataset.entryId);if(c&&x)startEdit(c,x);}
    });
  }

  function render() {
    const view=document.getElementById('readerView'),content=document.getElementById('readerContent');if(!view||!content||view.hidden)return;
    const essay=essayNow(),old=content.querySelector(ROOT);if(!essay){old?.remove();return;}if(old?.dataset.essayId===essay.id){refresh(old,essay);return;}saveActiveDraft?.();old?.remove();const root=build(essay),nav=content.querySelector('.reader-end-navigation');nav?content.insertBefore(root,nav):content.append(root);
  }

  window.MyEssaysReaderReflections=Object.freeze({render,readEntries,readDraft,plainCopy,detailedCopy,formatRelativeDateTime:relativeTime});
  document.addEventListener('myessays:reader-rendered',render);window.addEventListener('hashchange',()=>requestAnimationFrame(render));window.addEventListener('pageshow',()=>requestAnimationFrame(render));window.addEventListener('pagehide',()=>saveActiveDraft?.());document.addEventListener('visibilitychange',()=>document.hidden?saveActiveDraft?.():updateTimes(document.querySelector(ROOT)));window.addEventListener('storage',e=>{if(e.key?.startsWith(ENTRY_KEY)||e.key?.startsWith(DRAFT_KEY))requestAnimationFrame(render);});setInterval(()=>updateTimes(document.querySelector(ROOT)),60000);
})();
