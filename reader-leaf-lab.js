(() => {
  'use strict';

  // The visualizations are educational diagrams, never a collision/physics simulator.
  const ID = 'ssbu-megaman-leaf-shield-four-leaves-commitment';
  const STORAGE = 'myessays:leaflab:entries:v1';
  const BASE = 'assets/leaf-shield/';
  const sessions = new Map();
  let dataPromise = null;
  let sourceData = null;

  const ui = {
    ja: {
      title:'リーフシールド研究所', sub:'Bを離すと、葉っぱが飛ぶ。',
      demo:{hint:'まず、Bを押し続けてみよう。', headline:'Bを押し続けると、盾になる。', subtitle:'離すと発射。離さなくても限界で発射。', hold:'Bを長押し', pin:'タップで保持', unpin:'発射する', tool:'もっと調べる', close:'分析を閉じる', next:'相手がガードしたら？ →',idle:'長押しするとどうなる？',ready:'Bを押すと葉が展開する', startup:'展開動作中',orbit:'葉をまとって移動できる',extra:'追加保持中',released:'Bを離した → 発射',auto:'保持の限界 → 自動発射',again:'もう一度、長押ししてみよう',holding:'押している間は葉を保持。通常ガードはできない。',autoHint:'離さなくても最後は発射される。', releaseHint:'Bを離すと葉は前へ飛ぶ。', note:'時間の表示は公開フレーム値に基づく簡易モデル。実際の判定や発射時刻の完全再現ではありません。', short:'短く押すと保持時間が短い', long:'長押しすると発射を遅らせられる', sample:'約', action:'実戦では何が変わる？', cta:'他の場面も試す', frames:'経過（概算）'},
      intro:'図は説明用の模式図。実際の判定・移動速度・勝率を再現していません。',
      tabs:{scene:'相手を変える',frame:'1Fずつ見る',history:'時代を変える',drill:'判断ドリル',log:'対戦記録'},
      a:'選択する', reveal:'解説を見る',reset:'選び直す', recommended:'推奨される考え方', caution:'注意が必要な考え方',
      issue:'判断を変える条件',verify:'実機で検証する問い', fact:'確認済み', proof:'根拠',limit:'再現上の限界',
      model:'模式図・距離や判定は再現していません', opponent:'相手',megaman:'ロックマン',
      time:'表示する動作', frame:'フレーム',previous:'−1F',next:'+1F',start:'最初',end:'最後',
      marker:'公開資料に記載のある数値',elapsed:'表示位置',display:'段階別に観察',phaseNote:'各バーは別の動作。連結して1本の確定タイムラインにしていません。11Fは命中を保証する周期ではありません。',
      historyTitle:'ゲームの時代を切り替える', compare:'展開中に可能な行動',move:'移動',shield:'通常ガード',grab:'つかみ',ledge:'崖つかまり',
      yes:'可能',no:'不可',na:'対象外',unknown:'要検証',
      drillIntro:'状況を読み、最も妥当な判断を選ぶ。実戦の唯一の正解を断定するクイズではありません。',
      progress:'課題',chosen:'選択した考え方',drillNext:'次の問題',drillAgain:'最初から',drillDone:'すべての状況を見た',
      drillResult:'推奨判断と一致',drillReview:'理由を確認した問題',drillObserve:'答える前に相手の行動を見る。',
      logIntro:'実機での結果を残す。内容はこのブラウザの中だけに保存され、サーバーへ送られません。',
      situation:'場面',result:'結果',note:'メモ（任意）',add:'記録する',copy:'CSVをコピー',export:'CSVを保存',
      delete:'削除',clear:'記録をすべて削除',empty:'記録はまだありません。実戦で1回試したら追加できます。',
      saved:'記録した',copied:'CSVをコピーした',copyFail:'コピーできませんでした。CSV保存をご利用ください。',
      clearAsk:'この端末のリーフシールド記録をすべて削除しますか？',
      total:'合計',recent:'最近の記録',outcomes:{space:'位置を取れた',hit:'命中した',punished:'反撃を受けた',escaped:'安全に離脱',other:'その他'},
      privacy:'端末のブラウザ保存。別端末には自動同期しません。',sources:'出典を開く',evidence:'資料に確認できる仕様',restart:'研究所の表示をリセット',collapsed:'実験を開く',expanded:'実験を閉じる',
      disclaimer:'「推奨」は公開仕様から考えた戦術仮説です。判定の正確な再現や勝率の予測ではありません。'
    },
    'en-mix': {
      title:'Leaf Shield Lab / 研究所',sub:'Release B and the leaves fly.',
      demo:{hint:'Try holding B / Bを長押し',headline:'Hold B to keep the leaves.',subtitle:'Release to throw. Holding too long triggers auto-release.',hold:'Hold B',pin:'Tap to hold',unpin:'Release / 発射',tool:'Explore more',close:'Close tools',next:'What if they shield? →',idle:'What happens when you hold B?',ready:'Press B to begin',startup:'Activation',orbit:'Leaves are orbiting',extra:'Additional hold',released:'Release B → Throw',auto:'Time limit → Auto throw',again:'Try holding B again',holding:'Hold the leaves, but normal shield is unavailable.',autoHint:'Even without releasing B, the leaves will be thrown.',releaseHint:'Releasing B launches the leaves.',note:'Illustrative timing, based on published frame data. Not a complete game physics or release-timing simulation.',short:'Short hold',long:'Long hold delays the throw',sample:'~',action:'What changes in a real match?',cta:'Try more situations',frames:'Elapsed (approx.)'},
      intro:'Educational diagrams only. 実際のhitboxes, movement speed, or win rates are not simulated.',
      tabs:{scene:'Opponent',frame:'Frame Lab',history:'Version',drill:'Decision Drill',log:'Match Log'},
      a:'Choose',reveal:'Read the reasoning',reset:'Try another',recommended:'Recommended approach / 推奨',caution:'Risky assumption / 要注意',
      issue:'What changes the answer?',verify:'Test this in-game',fact:'Verified value',proof:'Evidence',limit:'Limits',
      model:'Diagram only / Not actual collision geometry',opponent:'Opponent',megaman:'Mega Man',
      time:'Move phase',frame:'Frame',previous:'−1F',next:'+1F',start:'Start',end:'End',
      marker:'Published frame-data markers',elapsed:'Selected frame',display:'Explore each phase',phaseNote:'Each bar is a separate action. They do not form one guaranteed continuous timeline. Rehit timing does not promise a hit.',
      historyTitle:'Move through the versions',compare:'Actions during active Leaf Shield',move:'Movement',shield:'Normal shield',grab:'Grab',ledge:'Ledge hang',
      yes:'Allowed',no:'Unavailable',na:'N/A',unknown:'Unverified',
      drillIntro:'Pick the most defensible choice. これは絶対正解を当てるクイズではなく、situation-based judgmentの練習。',
      progress:'Scenario',chosen:'Your choice',drillNext:'Next',drillAgain:'Restart',drillDone:'All scenarios reviewed',
      drillResult:'Matched the recommendation',drillReview:'Situations reviewed',drillObserve:'Read the opponent first.',
      logIntro:'Keep a record of actual trials. 記録はこの端末だけ。Nothing is uploaded to a server.',
      situation:'Situation',result:'Outcome',note:'Note (optional)',add:'Save entry',copy:'Copy CSV',export:'Save CSV',
      delete:'Delete',clear:'Delete all records',empty:'No entries yet. Try one situation in the game.',
      saved:'Entry saved',copied:'CSV copied',copyFail:'Copy failed. Please use CSV export.',
      clearAsk:'Delete all locally saved Leaf Shield trial records?',
      total:'Total',recent:'Recent entries',outcomes:{space:'Gained space',hit:'Hit landed',punished:'Punished',escaped:'Escaped safely',other:'Other'},
      privacy:'Browser-local storage only; no automatic sync.',sources:'Open source',evidence:'What sources actually establish',restart:'Reset lab view',collapsed:'Open Lab',expanded:'Collapse Lab',
      disclaimer:'Recommendations are tactical hypotheses, not exact collision simulation or predicted win rates.'
    }
  };

  const escape = value => String(value == null ? '' : value).replace(/[&<>"']/g, char => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  }[char]));
  const pick = (value,locale) => {
    if (typeof value === 'string') return value;
    return value?.[locale === 'ja' ? 'ja' : 'en'] || value?.ja || '';
  };
  function sessionFor(id) {
    if (!sessions.has(id)) sessions.set(id,{
      tab:'scene',scene:'rush',phase:'activate',frame:9,era:'ultimate3',
      collapsed:false,toolsOpen:false,demo:{state:'idle',frame:0,startedAt:0,pinned:false,phase:''},choice:null,drillIndex:0,drillChoice:null,drillSeen:0,drillMatched:0,drillOrder:null,
      draft:{situation:'rush',result:'space',note:''},message:''
    });
    return sessions.get(id);
  }
  function stored() {
    try {
      const entries=JSON.parse(localStorage.getItem(STORAGE)||'[]');
      return Array.isArray(entries) ? entries.filter(item=>item && typeof item==='object').slice(0,80) : [];
    } catch { return []; }
  }
  function persist(entries) {
    try { localStorage.setItem(STORAGE,JSON.stringify(entries.slice(0,80))); return true; } catch { return false; }
  }
  function readData() {
    if (!dataPromise) {
      dataPromise=Promise.all(['mechanics.json','scenarios.json'].map(async path=>{
        const response=await fetch(BASE+path,{cache:'no-cache'});
        if (!response.ok) throw new Error('Failed to load '+path+': '+response.status);
        return response.json();
      })).then(([mechanics,scenarios])=>{
        if (mechanics.version!==1 || scenarios.version!==1 || !Array.isArray(scenarios.items)) throw new Error('Leaf Lab data schema mismatch');
        sourceData={mechanics,scenarios};
        return sourceData;
      }).catch(error=>{dataPromise=null;throw error;});
    }
    return dataPromise;
  }
  function sourceLink(data,id,label) {
    const item=data.mechanics.sources.find(source=>source.id===id);
    return item ? '<a href="'+escape(item.url)+'" target="_blank" rel="noopener noreferrer">'+escape(label||item.label)+' ↗</a>' : '';
  }
  function badge(text) {return '<span class="leaflab-badge">'+escape(text)+'</span>';}
  function button(action,value,text,options={}) {
    return '<button type="button" data-leaf-action="'+escape(action)+'" data-value="'+escape(value)+'"'+
      (options.pressed!==undefined?' aria-pressed="'+options.pressed+'"':'')+
      (options.className?' class="'+escape(options.className)+'"':'')+'>'+escape(text)+'</button>';
  }
  function stage(s,locale) {
    const c=ui[locale];
    const type=s.id;
    const near=type==='rush',high=type==='jump',corner=type==='corner',edge=type==='edge',shield=type==='shield';
    const x=near?176:shield?250:corner?248:217;
    const y=high?32:edge?26:77;
    const floor=edge?'M20 66 H48 M145 66 H322':'M20 115 H322';
    const figure='<svg class="leaflab-svg" viewBox="0 0 342 153" role="img" aria-label="'+escape(pick(s.title,locale))+'">'
      +'<path d="'+floor+'" stroke="#88928a" stroke-width="6" stroke-linecap="round" fill="none"/>'
      +'<rect x="58" y="80" width="37" height="33" rx="8" fill="#326e9a"/>'
      +'<rect x="63" y="85" width="11" height="10" rx="3" fill="#bfdce6"/>'
      +'<rect x="79" y="85" width="11" height="10" rx="3" fill="#bfdce6"/>'
      +'<ellipse cx="77" cy="66" rx="25" ry="24" fill="none" stroke="#6d9a80" stroke-dasharray="3 6" stroke-width="1.5"/>'
      +[[52,66],[102,66],[77,41],[77,91]].map(([a,b],i)=>'<path d="M'+a+' '+(b-9)+' Q'+(a-16)+' '+(b-1)+' '+a+' '+(b+9)+' Q'+(a+14)+' '+b+' '+a+' '+(b-9)+' Z" fill="'+(i%2?'#73a56c':'#4b8760')+'" stroke="#30634b" stroke-width="1.5"/>').join('')
      +'<rect x="'+x+'" y="'+y+'" width="36" height="34" rx="7" fill="#ba6864"/>'
      +(shield?'<path d="M'+(x-12)+' '+(y-8)+' Q'+(x+56)+' '+(y+17)+' '+(x-12)+' '+(y+41)+' Q'+(x-27)+' '+(y+18)+' '+(x-12)+' '+(y-8)+'Z" fill="#d99f92" fill-opacity=".17" stroke="#b4645d" stroke-width="2"/>':'')
      +(near?'<path d="M251 91 H207 M215 83 L207 91 L215 99" stroke="#ba6864" stroke-width="3" fill="none" stroke-linecap="round"/>':'')
      +(high?'<path d="M270 100 Q225 4 152 51 M159 40 L152 51 L166 52" stroke="#ba6864" stroke-dasharray="5 6" stroke-width="2" fill="none"/>':'')
      +(type==='projectile'?'<circle cx="146" cy="91" r="6" fill="#dbab58"/><path d="M194 91 H158" stroke="#ba6864" stroke-width="2" stroke-dasharray="4 4"/>':'')
      +(edge?'<path d="M48 66 V138 M145 66 V138" stroke="#88928a" stroke-width="3" stroke-dasharray="4 4"/>':'')
      +'<text x="77" y="149" font-size="10" text-anchor="middle" fill="currentColor">'+escape(c.megaman)+'</text>'
      +'<text x="'+(x+18)+'" y="'+(high?24:149)+'" font-size="10" text-anchor="middle" fill="currentColor">'+escape(c.opponent)+'</text>'
      +'</svg>';
    return '<div class="leaflab-stage">'+figure+'<p class="leaflab-legend">'+escape(c.model)+'</p></div>';
  }
  function scenes(data,st,locale) {
    const c=ui[locale],items=data.scenarios.items;
    const current=items.find(item=>item.id===st.scene)||items[0];
    const select='<div class="leaflab-picker">'+items.map(item=>button('scene',item.id,pick(item.title,locale),{pressed:item.id===current.id})).join('')+'</div>';
    const choices='<div class="leaflab-choices">'+current.options.map((option,index)=>
      button('sceneChoice',index,pick(option,locale),{pressed:st.choice===index,className:'leaflab-choice'})).join('')+'</div>';
    let rationale='';
    if(st.choice!==null){
      const selected=current.options[st.choice];
      rationale='<div class="leaflab-reason" role="status">'+badge(selected.value==='best'?c.recommended:c.caution)+
        '<p>'+escape(pick(current.insight,locale))+'</p>'+
        '<p><strong>'+escape(c.issue)+'</strong> '+escape(pick(current.condition,locale))+'</p>'+
        '<p><strong>'+escape(c.verify)+'</strong> '+escape(pick(current.question,locale))+'</p></div>';
    } else {
      rationale='<p class="leaflab-prompt-hint">'+escape(c.drillObserve)+'</p>';
    }
    return select+stage(current,locale)+'<p class="leaflab-prompt">'+escape(pick(current.prompt,locale))+'</p>'+choices+rationale;
  }
  function timeline(data,st,locale) {
    const c=ui[locale],mechanics=data.mechanics;
    const phase=mechanics.phases.find(item=>item.id===st.phase)||mechanics.phases[0];
    st.frame=Math.max(1,Math.min(phase.frames,st.frame));
    const phaseControls='<div class="leaflab-picker">'+mechanics.phases.map(item=>
      button('phase',item.id,pick(item.name,locale),{pressed:item.id===phase.id})).join('')+'</div>';
    const marker=phase.mark!==null?'<span class="leaflab-marker" data-marker style="left:'+((phase.mark-1)/(phase.frames-1)*100)+'%"></span>':'';
    const number='<div class="leaflab-big-number"><span data-current-frame>'+st.frame+'</span><span> / '+phase.frames+'F</span></div>';
    const tick='<div class="leaflab-timeline-visual" aria-hidden="true"><div class="leaflab-track"></div><span class="leaflab-progress" data-progress></span>'+marker+'</div>';
    const slider='<label class="leaflab-slider-label" for="leaflab-frame-range">'+escape(c.elapsed)+'</label>'+
      '<input id="leaflab-frame-range" data-leaf-range type="range" min="1" max="'+phase.frames+'" value="'+st.frame+'" step="1" aria-label="'+escape(c.frame)+'">'+
      '<div class="leaflab-playback">'+button('step',-1,c.previous)+button('first','',c.start)+button('last','',c.end)+button('step',1,c.next)+'</div>';
    return phaseControls+'<div class="leaflab-framebox">'+
      '<p class="leaflab-eyebrow">'+escape(c.display)+'</p>'+number+tick+slider+
      '<p class="leaflab-emphasis">'+escape(pick(phase.markLabel,locale))+'</p>'+
      '<p>'+escape(pick(phase.detail,locale))+'</p>'+
      '<div class="leaflab-reference">'+badge(c.fact)+' '+sourceLink(data,phase.source)+'</div>'+
      '<p class="leaflab-muted">'+escape(c.phaseNote)+'</p></div>'+
      '<details class="leaflab-evidence"><summary>'+escape(c.evidence)+' · '+mechanics.facts.length+'</summary>'+
      '<div class="leaflab-facts">'+mechanics.facts.map(item=>'<div class="leaflab-fact"><strong>'+escape(locale==='ja'?item.ja:item.en)+'</strong><b>'+escape(item.value)+'</b><span>'+escape(locale==='ja'?item.explainJa:item.explainEn)+'</span><small>'+sourceLink(data,item.source,c.sources)+'</small></div>').join('')+'</div></details>';
  }
  function history(data,st,locale) {
    const c=ui[locale],eras=data.mechanics.eras;
    const active=eras.find(e=>e.id===st.era)||eras[eras.length-1];
    const rows=[['move',c.move],['shield',c.shield],['grab',c.grab],['ledge',c.ledge]];
    const values={yes:c.yes,no:c.no,'not-applicable':c.na,unverified:c.unknown};
    return '<p class="leaflab-prompt">'+escape(c.historyTitle)+'</p>'+
      '<div class="leaflab-picker">'+eras.map(era=>button('era',era.id,era.year+' '+pick(era.badge,locale),{pressed:era.id===active.id})).join('')+'</div>'+
      '<div class="leaflab-history"><p class="leaflab-eyebrow">'+escape(active.year)+'</p><strong class="leaflab-section-title">'+escape(pick(active.name,locale))+'</strong>'+
      '<p>'+escape(pick(active.description,locale))+'</p>'+
      '<p class="leaflab-eyebrow">'+escape(c.compare)+'</p>'+
      '<div class="leaflab-permissions">'+rows.map(([key,label])=>'<div class="leaflab-permission"><span>'+escape(label)+'</span><strong class="leaflab-flag-'+escape(active.capabilities[key])+'">'+escape(values[active.capabilities[key]]||c.unknown)+'</strong></div>').join('')+'</div>'+
      '<div class="leaflab-reference">'+sourceLink(data,active.source,c.sources)+'</div></div>'+
      '<p class="leaflab-muted">'+escape(c.disclaimer)+'</p>';
  }
  function drill(data,st,locale) {
    const c=ui[locale],items=data.scenarios.items;
    if(!Array.isArray(st.drillOrder)||st.drillOrder.length!==items.length){
      st.drillOrder=items.map((_,index)=>index);
      for(let index=st.drillOrder.length-1;index>0;index--){
        const other=Math.floor(Math.random()*(index+1));
        [st.drillOrder[index],st.drillOrder[other]]=[st.drillOrder[other],st.drillOrder[index]];
      }
    }
    if(st.drillIndex>=items.length) return '<div class="leaflab-finish"><strong>'+escape(c.drillDone)+'</strong>'+
      '<div class="leaflab-finish-stats"><span>'+escape(c.drillReview)+': '+st.drillSeen+'/'+items.length+'</span><span>'+escape(c.drillResult)+': '+st.drillMatched+'/'+items.length+'</span></div>'+
      '<p>'+escape(c.disclaimer)+'</p>'+button('drillReset','',c.drillAgain)+'</div>';
    const current=items[st.drillOrder[st.drillIndex]];
    let feedback='';
    if(st.drillChoice!==null){
      const chosen=current.options[st.drillChoice];
      feedback='<div class="leaflab-reason" role="status">'+badge(chosen.value==='best'?c.recommended:c.caution)+
        '<p>'+escape(pick(current.insight,locale))+'</p>'+
        '<p><strong>'+escape(c.issue)+'</strong> '+escape(pick(current.condition,locale))+'</p>'+
        '<p><strong>'+escape(c.verify)+'</strong> '+escape(pick(current.question,locale))+'</p>'+
        button('drillNext','',st.drillIndex+1===items.length?c.drillDone:c.drillNext,{className:'leaflab-primary'})+'</div>';
    }
    return '<p class="leaflab-muted">'+escape(c.drillIntro)+'</p>'+
      '<div class="leaflab-drill-progress"><span>'+escape(c.progress)+' '+(st.drillIndex+1)+'/'+items.length+'</span><span>'+st.drillMatched+' '+escape(c.drillResult)+'</span></div>'+
      stage(current,locale)+'<p class="leaflab-prompt">'+escape(pick(current.prompt,locale))+'</p>'+
      '<div class="leaflab-choices">'+current.options.map((option,index)=>button('drillChoice',index,pick(option,locale),{
        pressed:st.drillChoice===index,className:'leaflab-choice'+(st.drillChoice!==null?' leaflab-choice-locked':'')
      })).join('')+'</div>'+feedback;
  }
  function csvText(entries) {
    const rows=[['recorded_at','scenario','outcome','note'],...entries.map(v=>[v.at,v.situation,v.result,v.note||''])];
    const csv=rows.map(row=>row.map(value=>'"'+String(value??'').replace(/"/g,'""')+'"').join(',')).join('\r\n');
    return '\uFEFF'+csv+'\r\n';
  }
  function logPanel(data,st,locale) {
    const c=ui[locale],entries=stored();
    const outcomeKeys=['space','hit','punished','escaped','other'];
    const counts=outcomeKeys.map(key=>[key,entries.filter(item=>item.result===key).length]);
    const form='<div class="leaflab-logform">'+
      '<label>'+escape(c.situation)+'<select data-log-field="situation">'+data.scenarios.items.map(item=>'<option value="'+item.id+'"'+(st.draft.situation===item.id?' selected':'')+'>'+escape(pick(item.title,locale))+'</option>').join('')+'</select></label>'+
      '<label>'+escape(c.result)+'<select data-log-field="result">'+outcomeKeys.map(key=>'<option value="'+key+'"'+(st.draft.result===key?' selected':'')+'>'+escape(c.outcomes[key])+'</option>').join('')+'</select></label>'+
      '<label class="leaflab-note-label">'+escape(c.note)+'<textarea data-log-field="note" maxlength="160" rows="2" placeholder="'+escape(c.note)+'">'+escape(st.draft.note)+'</textarea></label>'+
      button('logSave','',c.add,{className:'leaflab-primary'})+'</div>';
    const summary='<div class="leaflab-log-summary"><strong>'+escape(c.total)+': '+entries.length+'</strong>'+
      counts.map(([key,n])=>'<span>'+escape(c.outcomes[key])+' '+n+'</span>').join('')+'</div>';
    const rows=entries.length?'<ul class="leaflab-log-list">'+entries.slice(0,12).map((item,index)=>{
      const name=data.scenarios.items.find(s=>s.id===item.situation);
      return '<li><div><small>'+escape(String(item.at).slice(0,10))+'</small><strong>'+escape(name?pick(name.title,locale):item.situation)+'</strong><span>'+escape(c.outcomes[item.result]||item.result)+'</span>'+
        (item.note?'<p>'+escape(item.note)+'</p>':'')+'</div>'+button('logDelete',index,c.delete)+'</li>';
    }).join('')+'</ul>':'<p class="leaflab-muted">'+escape(c.empty)+'</p>';
    return '<p class="leaflab-muted">'+escape(c.logIntro)+'</p>'+form+
      (st.message?'<p class="leaflab-live" role="status">'+escape(st.message)+'</p>':'')+
      summary+'<p class="leaflab-eyebrow">'+escape(c.recent)+'</p>'+rows+
      '<div class="leaflab-log-tools">'+button('logCopy','',c.copy)+button('logExport','',c.export)+
      (entries.length?button('logClear','',c.clear):'')+'</div>'+
      '<p class="leaflab-muted">'+escape(c.privacy)+'</p>';
  }
  function panel(data,st,locale) {
    switch(st.tab){
      case 'frame':return timeline(data,st,locale);
      case 'history':return history(data,st,locale);
      case 'drill':return drill(data,st,locale);
      case 'log':return logPanel(data,st,locale);
      default:return scenes(data,st,locale);
    }
  }

  /* One primary interaction, not a menu of five tools. The timer is illustrative;
     it is NOT a gameplay, collision or release-lag emulator. */
  function demoHtml(st,locale){
    const c=ui[locale],t=c.demo;
    return '<section class="leaflab-demo" aria-label="'+escape(t.hint)+'">'+
      '<p class="leaflab-demo-hint">'+escape(t.hint)+'</p>'+
      '<strong class="leaflab-demo-title">'+escape(t.headline)+'</strong>'+
      '<p class="leaflab-demo-subtitle">'+escape(t.subtitle)+'</p>'+
      '<div class="leaflab-demo-stage" data-demo-stage data-state="'+escape(st.demo.state)+'">'+
        '<div class="leaflab-demo-grid"></div>'+
        '<div class="leaflab-demo-ground"></div>'+
        '<div class="leaflab-demo-avatar" aria-hidden="true"><span class="leaflab-demo-helmet"></span><span class="leaflab-demo-eyes"></span>'+
          '<div class="leaflab-demo-leaves"><i></i><i></i><i></i><i></i></div></div>'+
        '<div class="leaflab-demo-flight" aria-hidden="true"><i></i><i></i><i></i><i></i></div>'+
        '<span class="leaflab-demo-key">B</span>'+
        '<span class="leaflab-demo-frame" data-demo-frame>'+escape(t.sample)+' '+st.demo.frame+'F</span>'+
      '</div>'+
      '<div class="leaflab-demo-track" aria-hidden="true"><span data-demo-progress style="width:'+Math.min(100,st.demo.frame/76*100)+'%"></span><i></i><i></i></div>'+
      '<div class="leaflab-demo-feedback"><strong data-demo-status aria-live="polite">'+escape(t.idle)+'</strong>'+
        '<span data-demo-detail>'+escape(t.ready)+'</span></div>'+
      '<div class="leaflab-demo-actions"><button data-leaf-hold type="button" class="leaflab-demo-b" aria-label="'+escape(t.hold)+'">'+
        '<span class="leaflab-demo-b-key" aria-hidden="true">B</span><span>'+escape(t.hold)+'</span></button>'+
        '<button data-leaf-action="pinHold" data-value="" type="button" class="leaflab-demo-pin">'+escape(st.demo.pinned?t.unpin:t.pin)+'</button></div>'+
      '<p class="leaflab-demo-note">'+escape(t.note)+'</p>'+
      '</section>';
  }
  function updateDemo(host,st,locale){
    const t=ui[locale].demo, demo=st.demo;
    const stage=host.querySelector('[data-demo-stage]');
    if(!stage)return;
    stage.dataset.state=demo.state;
    const frame=host.querySelector('[data-demo-frame]');
    if(frame)frame.textContent=t.sample+' '+demo.frame+'F';
    const progress=host.querySelector('[data-demo-progress]');
    if(progress)progress.style.width=Math.min(100,demo.frame/76*100)+'%';
    let name=t.idle,description=t.ready;
    if(demo.state==='holding'){
      name=demo.frame<9?t.startup:(demo.frame<=35?t.orbit:t.extra);
      description=t.holding;
    }else if(demo.state==='released'){
      name=t.released;description=demo.frame<9?t.short:t.releaseHint;
    }else if(demo.state==='auto'){
      name=t.auto;description=t.autoHint;
    }
    const status=host.querySelector('[data-demo-status]');
    if(status && status.textContent!==name)status.textContent=name;
    const detail=host.querySelector('[data-demo-detail]');
    if(detail&&detail.textContent!==description)detail.textContent=description;
    const pin=host.querySelector('[data-leaf-action="pinHold"]');
    if(pin){
      const text=demo.pinned?t.unpin:t.pin;
      if(pin.textContent!==text)pin.textContent=text;
      pin.setAttribute('aria-pressed',String(demo.pinned));
    }
    const main=host.querySelector('[data-leaf-hold]');
    if(main)main.setAttribute('aria-pressed',String(demo.state==='holding'));
  }

  function render(host,data,st,locale,focusAct) {
    const c=ui[locale],t=c.demo;
    const oldTabs=host.querySelector('.leaflab-tabs');
    const previousScroll=oldTabs?.scrollLeft||0;
    const tabOrder=['scene','frame','history','drill','log'];
    host.innerHTML='<section class="leaflab leaflab-v2" aria-label="'+escape(c.title)+'">'+
      '<div class="leaflab-head"><div><p class="leaflab-kicker">LEAF SHIELD / PLAY FIRST</p>'+
        '<strong class="leaflab-title">'+escape(c.title)+'</strong><p>'+escape(c.sub)+'</p></div></div>'+
      demoHtml(st,locale)+
      '<div class="leaflab-next">'+
        '<div><strong>'+escape(t.action)+'</strong><p>'+escape(locale==='ja'?'相手の行動が変わると、葉っぱの正解も変わる。':'Change the opponent, and your best option changes.')+'</p></div>'+
        button('openScene','',t.next,{className:'leaflab-next-button'})+'</div>'+
      '<div class="leaflab-more">'+
        button('toolsToggle','',st.toolsOpen?t.close:t.tool,{className:'leaflab-more-button'})+
        (st.toolsOpen?'<div class="leaflab-content"><div class="leaflab-tabs" role="tablist" aria-label="'+escape(c.title)+'">'+
            tabOrder.map(tab=>'<button id="leaflab-tab-'+tab+'" type="button" role="tab" aria-selected="'+(st.tab===tab)+'" tabindex="'+(st.tab===tab?0:-1)+'" aria-controls="leaflab-panel" data-leaf-action="tab" data-value="'+tab+'">'+escape(c.tabs[tab])+'</button>').join('')+
            '</div><div id="leaflab-panel" role="tabpanel" aria-labelledby="leaflab-tab-'+st.tab+'" tabindex="0" class="leaflab-panel">'+
            panel(data,st,locale)+'</div>'+
            '<div class="leaflab-footer"><span>'+escape(c.intro)+'</span><span>'+sourceLink(data,'ufd',c.sources)+'</span></div></div>':'')+
      '</div></section>';
    const tabs=host.querySelector('.leaflab-tabs');
    if(tabs)tabs.scrollLeft=previousScroll;
    if(focusAct){
      const target=host.querySelector('[data-leaf-action="'+focusAct.action+'"]'+(focusAct.value!==undefined?'[data-value="'+focusAct.value+'"]':''));
      target?.focus({preventScroll:true});
    }
    updateDemo(host,st,locale);
    updateTimeline(host,data,st);
  }
  function updateTimeline(host,data,st) {
    if(st.tab!=='frame'||st.collapsed) return;
    const phase=data.mechanics.phases.find(item=>item.id===st.phase)||data.mechanics.phases[0];
    st.frame=Math.max(1,Math.min(phase.frames,st.frame));
    const number=host.querySelector('[data-current-frame]');
    const slider=host.querySelector('[data-leaf-range]');
    const progress=host.querySelector('[data-progress]');
    if(number) number.textContent=String(st.frame);
    if(slider) slider.value=String(st.frame);
    if(progress) progress.style.width=((st.frame-1)/(phase.frames-1)*100)+'%';
  }
  async function copyText(textValue) {
    if(navigator.clipboard?.writeText) {await navigator.clipboard.writeText(textValue);return;}
    const box=document.createElement('textarea');
    box.value=textValue;
    box.style.position='fixed';box.style.opacity='0';
    document.body.appendChild(box);
    box.select();
    const ok=document.execCommand('copy');
    box.remove();
    if(!ok) throw new Error('Copy failed');
  }
  function exportCsv(entries) {
    const blob=new Blob([csvText(entries)],{type:'text/csv;charset=utf-8'});
    const url=URL.createObjectURL(blob);
    const anchor=document.createElement('a');
    anchor.href=url;anchor.download='leaf-shield-lab-'+new Date().toISOString().slice(0,10)+'.csv';
    anchor.style.display='none';document.body.appendChild(anchor);
    anchor.click();anchor.remove();
    window.setTimeout(()=>URL.revokeObjectURL(url),3000);
  }
  function mount(context) {
    const {root,essayId}=context;
    if(essayId!==ID)return;
    const host=root.querySelector('[data-leaf-lab]');
    if(!host||host.dataset.leafMounted==='1')return;
    const locale=host.dataset.leafLab==='en-mix'?'en-mix':'ja';
    const c=ui[locale],st=sessionFor(essayId);
    host.dataset.leafMounted='1';
    host.classList.add('leaflab-host');
    host.innerHTML='<p class="leaflab-loading" role="status">'+escape(c.title)+' …</p>';
    readData().then(data=>{
      if(!host.isConnected||host.dataset.readerDead==='1')return;
      let demoRaf=0;
      let demoPointer=null;
      function rerender(focusAct){render(host,data,st,locale,focusAct);}
      function stopDemo(mode='released'){
        if(st.demo.state!=='holding')return;
        if(demoRaf){cancelAnimationFrame(demoRaf);demoRaf=0;}
        st.demo.state=mode;
        st.demo.pinned=false;
        demoPointer=null;
        updateDemo(host,st,locale);
      }
      function tickDemo(){
        demoRaf=0;
        if(!host.isConnected || host.dataset.readerDead==='1'){
          st.demo.state='released';st.demo.pinned=false;return;
        }
        if(st.demo.state!=='holding')return;
        // Approximate 76F total activation + holding window; display only.
        st.demo.frame=Math.max(0,Math.min(76,Math.floor((performance.now()-st.demo.startedAt)*60/1000)));
        if(st.demo.frame>=76){stopDemo('auto');return;}
        updateDemo(host,st,locale);
        demoRaf=requestAnimationFrame(tickDemo);
      }
      function startDemo(pinned=false){
        if(st.demo.state==='holding')stopDemo();
        st.demo={state:'holding',frame:0,startedAt:performance.now(),pinned,phase:''};
        updateDemo(host,st,locale);
        demoRaf=requestAnimationFrame(tickDemo);
      }
      host.addEventListener('pointerdown',event=>{
        const button=event.target.closest?.('[data-leaf-hold]');
        if(!button||!host.contains(button)||event.button!==0)return;
        event.preventDefault();
        demoPointer=event.pointerId;
        button.setPointerCapture?.(event.pointerId);
        startDemo(false);
      });
      host.addEventListener('pointerup',event=>{
        if(demoPointer===null||event.pointerId!==demoPointer)return;
        stopDemo();
      });
      host.addEventListener('pointercancel',event=>{
        if(demoPointer!==null&&event.pointerId===demoPointer)stopDemo();
      });
      host.addEventListener('lostpointercapture',event=>{
        if(demoPointer!==null&&event.pointerId===demoPointer)stopDemo();
      });
      host.addEventListener('keyup',event=>{
        if(!event.target.closest?.('[data-leaf-hold]') || !['Enter',' '].includes(event.key))return;
        event.preventDefault();
        stopDemo();
      });

      host.addEventListener('click',async event=>{
        const control=event.target.closest('button[data-leaf-action]');
        if(!control||!host.contains(control))return;
        const action=control.dataset.leafAction, value=control.dataset.value;
        if(action==='openScene'){st.toolsOpen=true;st.tab='scene';rerender();host.querySelector('#leaflab-panel')?.scrollIntoView({block:'nearest',behavior:'auto'});return;}
        if(action==='toolsToggle'){st.toolsOpen=!st.toolsOpen;rerender({action:'toolsToggle'});return;}
        if(action==='pinHold'){
          if(st.demo.state==='holding')stopDemo();
          else startDemo(true);
          return;
        }
        if(action==='tab'){st.tab=value;st.message='';rerender({action,value});return;}
        if(action==='collapse'){st.collapsed=!st.collapsed;rerender({action,value:''});return;}
        if(action==='scene'){st.scene=value;st.choice=null;st.draft.situation=value;rerender({action,value});return;}
        if(action==='sceneChoice'){st.choice=Number(value);rerender({action,value});return;}
        if(action==='phase'){st.phase=value;st.frame=data.mechanics.phases.find(p=>p.id===value)?.mark||1;rerender({action,value});return;}
        if(action==='step'){st.frame+=Number(value);updateTimeline(host,data,st);return;}
        if(action==='first'){st.frame=1;updateTimeline(host,data,st);return;}
        if(action==='last'){st.frame=data.mechanics.phases.find(p=>p.id===st.phase)?.frames||1;updateTimeline(host,data,st);return;}
        if(action==='era'){st.era=value;rerender({action,value});return;}
        if(action==='drillChoice'){
          if(st.drillChoice!==null)return;
          const item=data.scenarios.items[st.drillOrder?.[st.drillIndex]??st.drillIndex];const choice=item?.options[Number(value)];
          st.drillChoice=Number(value);st.drillSeen++;
          if(choice?.value==='best')st.drillMatched++;
          rerender({action,value});return;
        }
        if(action==='drillNext'){st.drillIndex++;st.drillChoice=null;rerender();return;}
        if(action==='drillReset'){st.drillIndex=0;st.drillSeen=0;st.drillMatched=0;st.drillChoice=null;st.drillOrder=null;rerender();return;}
        if(action==='logSave'){
          const item={at:new Date().toISOString(),situation:st.draft.situation,result:st.draft.result,note:st.draft.note.slice(0,160)};
          if(persist([item,...stored()])){
            st.message=c.saved;st.draft.note='';rerender();
          } else {st.message=locale==='ja'?'ブラウザに保存できませんでした。':'Browser storage failed.';rerender();}
          return;
        }
        if(action==='logDelete'){const entries=stored();entries.splice(Number(value),1);persist(entries);st.message='';rerender();return;}
        if(action==='logClear'){if(window.confirm(c.clearAsk)){persist([]);st.message='';rerender();}return;}
        if(action==='logExport'){exportCsv(stored());return;}
        if(action==='logCopy'){
          try {await copyText(csvText(stored()));st.message=c.copied;}
          catch {st.message=c.copyFail;}
          if(host.isConnected)rerender();return;
        }
      });
      host.addEventListener('input',event=>{
        if(event.target.matches('[data-leaf-range]')) {
          st.frame=Number(event.target.value);updateTimeline(host,data,st);
          return;
        }
        const key=event.target.dataset.logField;
        if(key&&Object.prototype.hasOwnProperty.call(st.draft,key))st.draft[key]=String(event.target.value).slice(0,key==='note'?160:60);
      });
      host.addEventListener('change',event=>{
        const key=event.target.dataset.logField;
        if(key&&Object.prototype.hasOwnProperty.call(st.draft,key))st.draft[key]=String(event.target.value).slice(0,60);
      });
      host.addEventListener('keydown',event=>{
        if(event.target.closest?.('[data-leaf-hold]') && (event.key===' '||event.key==='Enter')){
          event.preventDefault();if(st.demo.state!=='holding')startDemo(false);
          return;
        }
        const current=event.target.closest('[role="tab"]');
        if(!current||!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;
        const tabs=['scene','frame','history','drill','log'];
        let at=tabs.indexOf(st.tab);
        if(event.key==='Home')at=0;else if(event.key==='End')at=tabs.length-1;
        else at=(at+(event.key==='ArrowRight'?1:-1)+tabs.length)%tabs.length;
        st.tab=tabs[at];event.preventDefault();rerender({action:'tab',value:st.tab});
      });
      rerender();
    }).catch(error=>{
      console.error('[LeafLab]',error);
      if(host.isConnected)host.innerHTML='<p class="leaflab-error" role="status">'+
        escape(locale==='ja'?'実験データを読み込めませんでした。本文はそのまま読めます。':'Lab data could not load. You can still read the article.')+'</p>'+
        '<p><a href="https://ultimateframedata.com/mega_man" target="_blank" rel="noopener noreferrer">Ultimate Frame Data ↗</a></p>';
    });
  }
  if(window.MyEssaysReaderRuntime?.register)
    window.MyEssaysReaderRuntime.register('leaf-shield-lab',mount,{priority:38});
})();
