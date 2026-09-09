(() => {
  'use strict';
  let cleanup = null;

  function styles() {
    if (document.getElementById('braess-lab-style')) return;
    const el = document.createElement('style');
    el.id = 'braess-lab-style';
    el.textContent = `
      .braess-lab{margin:1.8rem 0;padding:clamp(16px,4vw,26px);border:1px solid #cbd2d5;border-radius:18px;background:#f6f7f5;color:#1f2b31}
      .braess-lab *{box-sizing:border-box}.braess-head{display:flex;justify-content:space-between;gap:12px;align-items:flex-end;flex-wrap:wrap}.braess-kicker{margin:0 0 4px;font:700 11px/1.3 ui-monospace,monospace;letter-spacing:.12em}.braess-head h3{margin:0;font-size:clamp(18px,4vw,24px)}.braess-status{margin:0;padding:7px 10px;border:1px solid #cbd2d5;border-radius:999px;background:#fff;font:700 12px/1 ui-monospace,monospace}.braess-status.is-paradox{background:#263f48;color:#fff;border-color:#263f48}.braess-control{margin:18px 0 12px;padding:13px;border:1px solid #cbd2d5;border-radius:12px;background:#fff}.braess-slider{display:flex;gap:10px;align-items:center}.braess-slider label{font-weight:700;white-space:nowrap}.braess-slider input{width:100%;accent-color:#263f48}.braess-demand{min-width:92px;text-align:right;font:800 13px/1 ui-monospace,monospace}.braess-presets{display:flex;flex-wrap:wrap;gap:6px;margin-top:10px}.braess-presets button{min-height:38px;padding:7px 10px;border:1px solid #cbd2d5;border-radius:999px;background:#fff;color:#1f2b31;font-weight:700}.braess-presets button[aria-pressed=true]{background:#1f2b31;color:#fff}.braess-results{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}.braess-card{padding:12px;border:1px solid #cbd2d5;border-radius:11px;background:#fff}.braess-card h4{margin:0 0 10px;font-size:12px;line-height:1.4}.braess-time{display:block;font:800 22px/1 ui-monospace,monospace}.braess-route{margin:8px 0 0;color:#66747b;font-size:11px;line-height:1.5}.braess-zone{margin:10px 0 0;padding:10px 12px;border-radius:10px;background:#eef1f1;font-size:12px;line-height:1.6}.braess-note{margin:10px 0 0;color:#66747b;font-size:11px;line-height:1.6}@media(max-width:680px){.braess-results{grid-template-columns:1fr}.braess-slider{flex-wrap:wrap}.braess-slider input{order:3}.braess-demand{margin-left:auto}}
    `;
    document.head.appendChild(el);
  }

  function words(locale) {
    if (locale === 'en-mix') return {
      title:'Demandを動かすと、shortcutの善悪が反転する', demand:'Demand', people:'drivers',
      closed:'Without shortcut', open:'With shortcut / selfish', optimum:'With shortcut / optimum', min:'min',
      paradox:d=>`PARADOX +${d.toFixed(1)} min`, helps:d=>`SHORTCUT HELPS ${Math.abs(d).toFixed(1)} min`, equal:'NO DIFFERENCE',
      routes:(u,m,l)=>`U / M / L = ${u} / ${m} / ${l}`,
      bad:'Individually rational choices now settle at a worse equilibrium than before the shortcut.',
      good:'At this demand, the shortcut improves user equilibrium.', same:'At this demand, equilibrium travel time is unchanged.',
      note:'Teaching model: congestible link = x/100 min, fixed link = 45 min, new A→B link = 0 min. System optimum minimises average travel time.'
    };
    return {
      title:'交通量を動かすと、近道の善悪が反転する', demand:'交通需要', people:'人',
      closed:'近道なし・利用者均衡', open:'近道あり・利用者均衡', optimum:'近道あり・システム最適', min:'分',
      paradox:d=>`PARADOX +${d.toFixed(1)}分`, helps:d=>`近道で${Math.abs(d).toFixed(1)}分短縮`, equal:'差なし',
      routes:(u,m,l)=>`上 / 中央 / 下 = ${u} / ${m} / ${l}人`,
      bad:'一人ひとりは合理的に選んでいるのに、追加前より悪い均衡へ落ちています。',
      good:'この交通量では、近道は利用者均衡を改善します。', same:'この交通量では、近道を追加しても均衡所要時間は変わりません。',
      note:'教育用の簡略モデル。混雑リンク=x/100分、固定リンク=45分、A→B=0分。システム最適は平均所要時間を最小にする配分です。'
    };
  }

  function closed(q){ return {t:45+q/200,u:q/2,m:0,l:q/2}; }
  function open(q){
    if(q<=4500) return {t:q/50,u:0,m:q,l:0};
    if(q<9000) return {t:90,u:q-4500,m:9000-q,l:q-4500};
    return {t:45+q/200,u:q/2,m:0,l:q/2};
  }
  function optimum(q){
    if(q<=2250) return {t:q/50,u:0,m:q,l:0};
    if(q<=4500){const u=q-2250,m=4500-q,total=2*2250*2250/100+90*u;return {t:total/q,u,m,l:u};}
    return {t:45+q/200,u:q/2,m:0,l:q/2};
  }
  const n=v=>Math.round(v).toLocaleString('en-US');
  const time=v=>`${Math.round(v*100)/100}`;

  function mount(context){
    if(cleanup){cleanup();cleanup=null;}
    const host=context.root.querySelector('[data-braess-lab]');
    if(!host)return;
    styles();
    const c=words(host.getAttribute('data-braess-lab')||'ja');
    host.classList.add('braess-lab');
    host.innerHTML=`
      <div class="braess-head"><div><p class="braess-kicker">LIVE MODEL / BRAESS PARADOX</p><h3>${c.title}</h3></div><p class="braess-status" data-status aria-live="polite"></p></div>
      <div class="braess-control"><div class="braess-slider"><label>${c.demand}</label><input data-demand type="range" min="500" max="10000" step="100" value="4000" aria-label="${c.demand}"><output class="braess-demand" data-output></output></div><div class="braess-presets" data-presets>${[1000,3000,4000,4500,6000,9000].map(v=>`<button type="button" data-value="${v}" aria-pressed="${v===4000}">${n(v)}</button>`).join('')}</div></div>
      <div class="braess-results">
        <section class="braess-card"><h4>${c.closed}</h4><strong class="braess-time" data-time="closed"></strong><p class="braess-route" data-route="closed"></p></section>
        <section class="braess-card"><h4>${c.open}</h4><strong class="braess-time" data-time="open"></strong><p class="braess-route" data-route="open"></p></section>
        <section class="braess-card"><h4>${c.optimum}</h4><strong class="braess-time" data-time="optimum"></strong><p class="braess-route" data-route="optimum"></p></section>
      </div>
      <p class="braess-zone" data-reading></p><p class="braess-note">${c.note}</p>`;

    const slider=host.querySelector('[data-demand]'),out=host.querySelector('[data-output]'),status=host.querySelector('[data-status]'),reading=host.querySelector('[data-reading]'),presets=host.querySelector('[data-presets]');
    const show=(key,r)=>{host.querySelector(`[data-time="${key}"]`).textContent=`${time(r.t)} ${c.min}`;host.querySelector(`[data-route="${key}"]`).textContent=c.routes(n(r.u),n(r.m),n(r.l));};
    const update=()=>{
      const q=Number(slider.value),a=closed(q),b=open(q),o=optimum(q),d=b.t-a.t;
      out.textContent=`${n(q)} ${c.people}`;show('closed',a);show('open',b);show('optimum',o);
      status.classList.toggle('is-paradox',d>0.001);status.textContent=d>0.001?c.paradox(d):d<-.001?c.helps(d):c.equal;
      reading.textContent=d>0.001?c.bad:d<-.001?c.good:c.same;
      presets.querySelectorAll('[data-value]').forEach(btn=>btn.setAttribute('aria-pressed',String(Number(btn.dataset.value)===q)));
    };
    const click=e=>{const b=e.target.closest('[data-value]');if(!b)return;slider.value=b.dataset.value;update();};
    slider.addEventListener('input',update);presets.addEventListener('click',click);update();
    cleanup=()=>{slider.removeEventListener('input',update);presets.removeEventListener('click',click);};
  }

  if(window.MyEssaysReaderRuntime)window.MyEssaysReaderRuntime.register('braess-lab',mount,{priority:36});
})();
