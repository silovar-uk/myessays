(() => {
  'use strict';

  const ESSAY_ID = 'megaman-down-air-lowest-height-hard-knuckle';
  const LOG_KEY = 'myessays:megaman-downair-lab:v1';
  const SOURCES = Object.freeze({
    frames: 'https://ultimateframedata.com/mega_man',
    hitboxes: 'https://www.ssbwiki.com/Mega_Man_(SSBU)/Down_aerial'
  });
  const AIRTIME = Object.freeze([
    { value: 19, ja: '小ジャンプ・最速急降下（19F）', en: 'Short hop, fast fall (19F)' },
    { value: 29, ja: '小ジャンプ・急降下なし（29F）', en: 'Short hop, no fast fall (29F)' },
    { value: 33, ja: '通常ジャンプ・最速急降下（33F）', en: 'Full hop, fast fall (33F)' },
    { value: 47, ja: '通常ジャンプ・急降下なし（47F）', en: 'Full hop, no fast fall (47F)' }
  ]);
  const cases = [
    {
      ja: '拳が出なかった', en: 'The fist never appeared',
      causeJa: '空下の発生は入力から23F。基準滞空時間が短い入力では、発射前の着地を疑う。ただし空下固有の運動変化を含まない単純計算だけでは実際の失敗を確定できない。',
      causeEn: 'Down air starts on frame 23. An overly short airborne window is a candidate cause. Baseline airtime alone cannot prove what happened during the actual move.',
      testJa: '急降下を外す→小ジャンプの攻撃時刻だけ早める→同じ場所で10回試す。発射した回数を記録。',
      testEn: 'Remove fast-fall, move the attack input earlier, and repeat 10 times from the same spot. Count visible releases.',
      clueJa: '発射前の着地／入力が遅い／下入力のタイミング',
      clueEn: 'Landed early / attack input late / down-input timing'
    },
    {
      ja: '当たったのにメテオではない', en: 'Hit, but not a meteor',
      causeJa: '出始めの23〜25Fは14％でメテオではない。26〜35Fでも相手が地上状態なら45度に飛ぶ。',
      causeEn: 'Frames 23–25 deal 14% without a meteor. Even on frames 26–35, a grounded target is launched at 45°.',
      testJa: '相手を空中に固定した試行と地上に置いた試行を分ける。接触時刻も早い／遅いで比較。どちらの変数が結果を変えたか記録。',
      testEn: 'Separate airborne from grounded targets, then compare early and late contact. Change one factor at a time.',
      clueJa: '早い接触／相手の地上・空中状態',
      clueEn: 'Early contact / grounded versus airborne target'
    },
    {
      ja: '反射されて逆に危険だった', en: 'Reflected into danger',
      causeJa: '拳は反射可能・吸収不可。空中用メテオの判定には、反射されるとふっとばしの上下方向を反転させる処理がある。',
      causeEn: 'The fist can be reflected but not absorbed. Its aerial meteor hitbox has a special vertical-launch inversion when reflected.',
      testJa: '反射技の有無を確認し、使う場合と見送る場合の状況を比較。相手が反射技を出せる時刻も調べる。',
      testEn: 'Compare firing versus holding the move against a ready reflector; investigate its real startup and position.',
      clueJa: '反射手段の残存／距離と発射時刻',
      clueEn: 'Available reflector / spacing / release timing'
    },
    {
      ja: '相手は落としたが自分が戻れない', en: 'I hit, but could not recover',
      causeJa: '空下の全体動作は64Fと長い。拳が届いても、自分の復帰に必要な位置・時間を失っている可能性がある。',
      causeEn: 'The move occupies 64 frames. Even a successful hit can consume the position and timing needed to recover.',
      testJa: '同じ位置から空下あり／なしを10回ずつ試す。命中率だけでなく、自分が安全に帰れた回数を記録。',
      testEn: 'Run 10 trials with and without down air from the same position. Record survival as well as contact.',
      clueJa: '空下後の残り時間／復帰資源／崖との距離',
      clueEn: 'Remaining action time / recovery options / distance to ledge'
    }
  ];
  const quiz = [
    {
      ja: '相手は崖下から縦に復帰。こちらは崖上で、相手の通る縦の位置がある程度読める。空下を選ぶ価値は？',
      en: 'The opponent is recovering vertically below the ledge. You are onstage and can read the likely recovery column. Is down air worth considering?',
      answer: 2,
      jaWhy: '検討する価値がある。ただし発生23Fなので「見てから必ず間に合う」わけではない。先置き、相手の無敵時間、復帰経路の変化を確認する。',
      enWhy: 'Worth considering, but frame-23 startup makes guaranteed reaction coverage unlikely. Pre-placement, invincibility and route changes still matter.'
    },
    {
      ja: '相手は反射技を構え、拳の射線が見えている。今すぐ空下を出すべき？',
      en: 'The opponent has a reflector ready and can watch the fist lane. Should you fire immediately?',
      answer: 1,
      jaWhy: 'むやみに撃つ必要はない。反射で拳の危険が逆転し得る。反射を誘う、位置を変えるなどの選択を先に考える。',
      enWhy: 'Do not fire automatically. Reflection may invert the threat. Consider baiting the reflector or moving first.'
    },
    {
      ja: '相手がロックマンのすぐ近くで先に攻撃を出せる状態。空下は最速の割り込みとして有効？',
      en: 'An opponent is right next to Mega Man and able to attack immediately. Is down air a fast interrupt?',
      answer: 1,
      jaWhy: '発生23Fは近距離の最速割り込みには遅い。空前・空後や移動など、別の選択肢を検討する。',
      enWhy: 'Frame-23 startup is slow for an immediate scramble. Consider faster aerials or movement.'
    },
    {
      ja: '地上に立つ相手へ、拳の26〜35F部分が命中した。メテオになる？',
      en: 'The late hit (frames 26–35) connects with a grounded opponent. Will it meteor-smash?',
      answer: 1,
      jaWhy: '地上専用の後半判定は45度で斜め上へ飛ばす。空中の相手への270度メテオとは別。',
      enWhy: 'The late grounded hit launches at 45° upward, unlike the 270° meteor hitbox for airborne targets.'
    }
  ];
  const status = {
    flight: 29, delay: 0, contactAge: 5, target: 'air', reflected: false,
    caseIndex: 0, quizIndex: 0, answers: [null, null, null, null],
    log: { attempts: 20, released: 0, hits: 0, safe: 0 }
  };
  try {
    const raw = JSON.parse(localStorage.getItem(LOG_KEY) || '{}');
    for (const key of ['attempts', 'released', 'hits', 'safe']) {
      if (Number.isInteger(raw[key]) && raw[key] >= 0 && raw[key] <= 100) status.log[key] = raw[key];
    }
  } catch { /* Private-mode storage may be disabled. */ }

  const selectLanguage = essay => {
    const current = window.MyEssaysReaderVersions?.currentVersion?.();
    return current === 'en-mix' || (!current && essay?.__readingVersion === 'en-mix');
  };
  const trans = (english, ja, en) => english ? en : ja;
  const make = (tag, className, text) => {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text !== undefined) element.textContent = text;
    return element;
  };
  const textOf = (english, ja, en) => trans(english, ja, en);
  const clamp = (n, min, max) => Math.min(max, Math.max(min, Number.isFinite(n) ? n : min));

  function panel(titleJa, titleEn, captionJa, captionEn, english) {
    const root = make('section', 'mm-lab');
    root.dataset.mmLab = 'true';
    root.setAttribute('aria-label', textOf(english, titleJa, titleEn));
    const head = make('div', 'mm-lab-head');
    head.append(
      make('span', 'mm-lab-tag', textOf(english, '空下研究所 / 操作教材', 'DOWN-AIR LAB / INTERACTIVE')),
      make('h3', 'mm-lab-title', textOf(english, titleJa, titleEn)),
      make('p', 'mm-lab-desc', textOf(english, captionJa, captionEn))
    );
    root.append(head);
    return root;
  }
  function label(text, control) {
    const wrapper = make('label', 'mm-lab-field');
    wrapper.append(make('span', 'mm-lab-field-label', text), control);
    return wrapper;
  }
  function button(text, callback, cssClass = '') {
    const btn = make('button', 'mm-lab-button ' + cssClass, text);
    btn.type = 'button';
    btn.addEventListener('click', callback);
    return btn;
  }
  function sourceLinks(english) {
    const wrap = make('p', 'mm-lab-sources');
    wrap.append(document.createTextNode(textOf(english, '数値出典：', 'Data: ')));
    const a = make('a', '', 'Ultimate Frame Data');
    a.href = SOURCES.frames; a.target = '_blank'; a.rel = 'noopener noreferrer';
    const b = make('a', '', 'SmashWiki');
    b.href = SOURCES.hitboxes; b.target = '_blank'; b.rel = 'noopener noreferrer';
    wrap.append(a, document.createTextNode(' / '), b);
    return wrap;
  }
  function notice(root, english, customJa, customEn) {
    root.append(make('p', 'mm-lab-caution', textOf(english,
      customJa || 'これは時間・判定の模式教材で、ゲーム内の物理・入力受付・衝突を再現する実機シミュレーターではない。',
      customEn || 'This is a teaching diagram, not an emulator of game physics, input buffering or collisions.')));
  }
  function sectionAfter(headings, number, element) {
    const h2 = headings[number - 1];
    if (!h2) return;
    h2.insertAdjacentElement('afterend', element);
  }

  function makeClock(english) {
    const root = panel('三つの時計と、拳が変わる13コマ', 'Three clocks, thirteen frames',
      '滞空時間・攻撃動作・拳の寿命を別々に見る。移動するのは拳、変わるのは判定。',
      'Compare airborne time, attack frames and projectile lifetime. One fist, several outcomes.', english);
    const controlGrid = make('div', 'mm-lab-controls');
    const select = make('select', 'mm-lab-select');
    AIRTIME.forEach(entry => {
      const option = make('option', '', textOf(english, entry.ja, entry.en));
      option.value = String(entry.value);
      select.append(option);
    });
    select.value = String(status.flight);
    select.addEventListener('change', () => {
      status.flight = Number(select.value);
      update();
    });
    controlGrid.append(label(textOf(english, '比較する基準滞空時間', 'Reference airtime'), select));

    const delay = make('input', 'mm-lab-range');
    delay.type = 'range'; delay.min = '0'; delay.max = '16'; delay.step = '1'; delay.value = String(status.delay);
    const delayValue = make('strong', 'mm-lab-value');
    const delayWrap = label(textOf(english, '空下入力を遅らせる時間', 'Delay before input'), delay);
    delayWrap.append(delayValue);
    delay.addEventListener('input', () => { status.delay = Number(delay.value); update(); });
    controlGrid.append(delayWrap);

    const contact = make('input', 'mm-lab-range');
    contact.type = 'range'; contact.min = '0'; contact.max = '12'; contact.step = '1'; contact.value = String(status.contactAge);
    const contactValue = make('strong', 'mm-lab-value');
    const contactWrap = label(textOf(english, '拳の出現から接触までのコマ数（仮想条件）', 'Hypothetical contact offset from release'), contact);
    contactWrap.append(contactValue);
    contact.addEventListener('input', () => { status.contactAge = Number(contact.value); update(); });
    controlGrid.append(contactWrap);

    const target = make('select', 'mm-lab-select');
    [{value:'air', ja:'空中の相手',en:'Airborne target'}, {value:'ground',ja:'地上の相手',en:'Grounded target'}]
      .forEach(entry => {const o=make('option','',textOf(english,entry.ja,entry.en));o.value=entry.value;target.append(o);});
    target.value = status.target;
    target.addEventListener('change', () => {status.target=target.value; update();});
    controlGrid.append(label(textOf(english, '相手の状態', 'Target state'), target));

    const reflected = make('input', '');
    reflected.type = 'checkbox';
    reflected.checked = status.reflected;
    const reflectWrap = make('label', 'mm-lab-check');
    reflectWrap.append(reflected, make('span', '', textOf(english, '拳が反射された場合', 'Projectile reflected')));
    reflected.addEventListener('change', () => {status.reflected=reflected.checked; update();});
    controlGrid.append(reflectWrap);
    root.append(controlGrid);
    const timeline = make('div', 'mm-lab-timeline');
    timeline.setAttribute('role', 'img');
    const output = make('div', 'mm-lab-output');
    output.setAttribute('aria-live', 'polite'); output.setAttribute('aria-atomic', 'true');
    const outcomes = make('div', 'mm-lab-outcomes');
    root.append(timeline, outcomes, output);
    notice(root,english);
    root.append(sourceLinks(english));
    function update() {
      delayValue.textContent = '+' + status.delay + 'F';
      contactValue.textContent = String(status.contactAge) + 'F';
      const launch = status.delay + 23;
      const hitFrame = launch + status.contactAge;
      const flight = status.flight;
      const edge = flight - launch;
      const rows = [
        { y: 18, label: textOf(english,'滞空の基準','Airtime'),start:0,end:flight,c:'var(--mm-flight)' },
        { y: 55, label: textOf(english,'空下の動作','Move startup'),start:status.delay,end:launch-1,c:'var(--mm-startup)' },
        { y: 92, label: textOf(english,'拳の寿命','Projectile lifetime'),start:launch,end:launch+12,c:'var(--mm-projectile)' }
      ];
      const maxF = 76;
      const percent = f => (f / maxF * 100);
      timeline.replaceChildren();
      rows.forEach(r => {
        const row = make('div', 'mm-lab-time-row');
        row.append(make('span','mm-lab-time-label',r.label));
        const track = make('div','mm-lab-time-track');
        const bar=make('span','mm-lab-time-bar');
        bar.style.left=percent(r.start)+'%';bar.style.width=percent(r.end-r.start+1)+'%';bar.style.background=r.c;
        track.append(bar);
        if(r===rows[2]){
          const early=make('span','mm-lab-hit-early');
          early.style.left=percent(launch)+'%';early.style.width=percent(3)+'%';
          const late=make('span','mm-lab-hit-late');
          late.style.left=percent(launch+3)+'%';late.style.width=percent(10)+'%';
          track.append(early,late);
        }
        const marker=make('span','mm-lab-time-marker');
        marker.style.left=percent(flight)+'%';track.append(marker);
        row.append(track);
        timeline.append(row);
      });
      const axis=make('div','mm-lab-axis');
      [0, 19, 23, 26, 35, 47, 65].forEach(n=>{const item=make('span','',n+'F');item.style.left=percent(n)+'%';axis.append(item);});
      timeline.append(axis);
      const legend=make('p','mm-lab-legend',textOf(english,
        '灰＝攻撃準備／橙＝出始め23〜25F／緑＝後半26〜35F／縦線＝基準着地時刻',
        'Gray = startup / orange = early 23–25 / green = late 26–35 / vertical line = reference landing'));
      outcomes.replaceChildren(legend);
      let possibleJa,possibleEn;
      if (edge>0) {
        possibleJa='単純比較では拳の発生まで '+edge+'F の余裕';
        possibleEn='Baseline comparison leaves '+edge+'F before landing';
      } else if (edge===0) {
        possibleJa='発生と基準着地が同時刻。成立は未判定';
        possibleEn='Release coincides with reference landing: unresolved';
      } else {
        possibleJa='基準滞空時間が発生より '+Math.abs(edge)+'F 短い';
        possibleEn='Reference airtime ends '+Math.abs(edge)+'F before release';
      }
      const timing=make('p','mm-lab-finding',textOf(english,possibleJa,possibleEn));
      let hit;
      if(status.contactAge <= 2) {
        hit = textOf(english,'出始め：14％。メテオではない。','Early: 14%. Not a meteor.');
      } else if(status.target==='ground'){
        hit = textOf(english,'後半・地上：12％、45度で斜め上。','Late, grounded: 12%, launches at 45°.');
      }else if(status.reflected){
        hit = textOf(english,'後半・空中・反射：上下のふっとばしが反転。','Late, airborne, reflected: vertical launch is inverted.');
      }else{
        hit = textOf(english,'後半・空中：12％、270度のメテオ。','Late, airborne: 12%, 270° meteor.');
      }
      const result = make('p','mm-lab-finding mm-lab-finding-emphasis',hit);
      const contextText = make('p','mm-lab-small',textOf(english,
        '仮定した接触：攻撃入力から'+(23+status.contactAge)+'F（画面の0Fから'+hitFrame+'F）。相手との距離や地形によって、この接触自体が起こらない場合がある。',
        'Hypothetical contact: '+(23+status.contactAge)+'F after input ('+hitFrame+'F on the shared timeline). This contact may never occur at the given distance or terrain.'));
      output.replaceChildren(timing,result,contextText);
    }
    update();
    return root;
  }

  function makeBoundary(english) {
    const root=panel('最低空の成立境界', 'Find the lowest reliable down air',
      '「低いほどよい」ではなく「何が足りないか」を調べる。数字から分かるのは、あくまで時間の制約。',
      'Test the timing boundary, not a mythical universal lowest jump.', english);
    const wrap=make('div','mm-lab-geometry');
    const picture=make('svg','mm-lab-geometry-svg');
    picture.setAttribute('viewBox','0 0 520 220');
    picture.setAttribute('role','img');
    picture.setAttribute('aria-label',textOf(english,'床・ロックマン・拳の進路・相手の位置の模式図','Schematic of stage, Mega Man, fist trajectory and target'));
    picture.innerHTML =
      '<rect width="520" height="220" rx="14" fill="var(--mm-geometry-bg)"/>'+
      '<rect x="0" y="180" width="520" height="40" fill="var(--mm-ground)"/>'+
      '<line x1="0" y1="180" x2="520" y2="180" stroke="var(--mm-ink)" stroke-width="3"/>'+
      '<circle cx="190" cy="59" r="18" fill="var(--mm-hero)"/>'+
      '<rect x="178" y="77" width="24" height="32" rx="6" fill="var(--mm-hero)"/>'+
      '<path d="M190 113 V164" stroke="var(--mm-green)" stroke-width="4" stroke-dasharray="7 7"/>'+
      '<path d="m181 153 9 14 9-14" stroke="var(--mm-green)" stroke-width="4" fill="none"/>'+
      '<circle cx="350" cy="127" r="16" fill="var(--mm-target)"/>'+
      '<rect x="340" y="145" width="20" height="32" rx="6" fill="var(--mm-target)"/>'+
      '<text x="211" y="62" font-size="15" fill="var(--mm-ink)">MEGA MAN</text>'+
      '<text x="373" y="130" font-size="15" fill="var(--mm-ink)">TARGET</text>'+
      '<text x="210" y="153" font-size="12" fill="var(--mm-ink)">23F → 26–35F</text>';
    wrap.append(picture);
    const title=make('p','mm-lab-finding',textOf(english,
      '注目：拳が出る前に着地しないか。後半判定になる前に相手に触れないか。',
      'Watch two boundaries: landing before release, and contact before the meteor window.'));
    const note=make('p','mm-lab-small',textOf(english,
      '上図は位置関係の説明用。人物の大きさ、技の届く距離、落下速度を実機どおりに縮尺再現していない。',
      'Concept only: character sizes, hitbox reach and fall speed are not drawn to scale.'));
    root.append(wrap,title,note);
    const box=make('div','mm-lab-process');
    const checkpoints=[
      ['1','拳が毎回出るか','Does the fist release every time?'],
      ['2','狙いの縦線に落ちるか','Does the fist enter the correct column?'],
      ['3','メテオ判定に触れるか','Does the late hit contact an airborne target?'],
      ['4','自分が安全に戻れるか','Can you recover afterward?']
    ];
    checkpoints.forEach(item=>{
      const line=make('div','mm-lab-checkpoint');
      line.append(make('span','mm-lab-checkpoint-number',item[0]),make('span','',textOf(english,item[1],item[2])));
      box.append(line);
    });
    root.append(box);
    notice(root,english);
    return root;
  }

  function makeMuseum(english) {
    const root=panel('失敗博物館', 'Museum of failed fists',
      '成功例の前に失敗の種類を分ける。「なぜ」を切り分ければ、次の10回が変わる。',
      'Classify the failure before prescribing practice.', english);
    const tabs=make('div','mm-lab-tabs'); tabs.setAttribute('role','group');
    const detail=make('div','mm-lab-museum-detail'); detail.setAttribute('aria-live','polite');
    const buttons=cases.map((item,index)=>{
      const b=button(textOf(english,item.ja,item.en),()=>{status.caseIndex=index;update();});
      tabs.append(b);return b;
    });
    root.append(tabs,detail);
    function update(){
      buttons.forEach((b,i)=>{b.setAttribute('aria-pressed',String(i===status.caseIndex));b.classList.toggle('is-selected',i===status.caseIndex);});
      const item=cases[status.caseIndex];
      detail.replaceChildren(
        make('h4','',textOf(english,'疑うべき原因：','Likely causes:')),
        make('p','',textOf(english,item.causeJa,item.causeEn)),
        make('h4','',textOf(english,'対照実験：','Controlled test:')),
        make('p','',textOf(english,item.testJa,item.testEn)),
        make('p','mm-lab-small',textOf(english,'切り分ける変数：'+item.clueJa,'Variables: '+item.clueEn))
      );
    }
    update();
    notice(root,english,'事例は公開仕様から作った診断例。実際の失敗映像を検証した事例集ではない。','These are diagnostic scenarios based on documented mechanics, not claims about footage that was observed.');
    root.append(sourceLinks(english));
    const journal=make('div','mm-lab-journal');
    journal.append(make('h4','',textOf(english,'20回の練習カルテ','20-attempt practice log')));
    const journalInputs=make('div','mm-lab-log-grid');
    const fields=[['attempts','試行回数','Attempts'],['released','拳が出た回数','Successful releases'],['hits','意図した判定への命中','Intended hits'],['safe','安全に戻れた回数','Safe recoveries']];
    const inputs={};
    const summary=make('p','mm-lab-log-summary'); summary.setAttribute('role','status');
    fields.forEach(([key,ja,en])=>{
      const input=make('input','mm-lab-number');
      input.type='number';input.inputMode='numeric';input.min='0';input.max='100';input.step='1';input.value=String(status.log[key]);
      input.addEventListener('change',()=>{
        status.log[key]=Math.trunc(clamp(Number(input.value),0,100));
        updateLog();
      });
      inputs[key]=input;journalInputs.append(label(textOf(english,ja,en),input));
    });
    function updateLog(){
      const l=status.log;
      l.released=Math.min(l.released,l.attempts);
      l.hits=Math.min(l.hits,l.released);
      l.safe=Math.min(l.safe,l.attempts);
      fields.forEach(([key])=>{inputs[key].value=String(l[key]);});
      const pct=(v,d)=>d?Math.round(v*100/d)+'%':'—';
      summary.textContent=textOf(english,
        '発射 '+pct(l.released,l.attempts)+' ／ 意図した命中 '+pct(l.hits,l.attempts)+' ／ 安全帰還 '+pct(l.safe,l.attempts)+
          '。'+(l.released===0?'まずは発射の再現性を確認。':l.hits<l.released/2?'次は照準・接触状態を確認。':'次は対戦での使いどころも検証。'),
        'Release '+pct(l.released,l.attempts)+' / intended hits '+pct(l.hits,l.attempts)+' / safe recoveries '+pct(l.safe,l.attempts)+
          '. '+(l.released===0?'Start with release reliability.':l.hits<l.released/2?'Next, inspect spacing and target state.':'Next, test tactical decision-making.'));
      try{localStorage.setItem(LOG_KEY,JSON.stringify(l));}catch{/* Storage optional. */}
    }
    journal.append(journalInputs,summary,button(textOf(english,'記録をリセット','Reset counts'),()=>{
      status.log={attempts:20,released:0,hits:0,safe:0}; updateLog();
    },'mm-lab-button-quiet'));
    root.append(journal);
    updateLog();
    return root;
  }

  function makeQuiz(english) {
    const root=panel('相手目線の判断クイズ', 'Opponent-view decisions',
      '空下を出す技術だけでなく、出さない判断を鍛える。これは実機動画ではなく条件を固定した設問。',
      'Practice when NOT to use down air. These are text scenarios, not real match replays.', english);
    const progress=make('p','mm-lab-quiz-progress');
    const question=make('p','mm-lab-question');
    const choices=make('div','mm-lab-quiz-choices');
    const feedback=make('div','mm-lab-quiz-feedback');feedback.setAttribute('aria-live','polite');
    const navigation=make('div','mm-lab-quiz-navigation');
    const options=[
      [ '今すぐ振る', 'Use down air immediately'],
      [ '今は振らない', 'Do not use it now'],
      [ '先置きなど条件を確認', 'Consider with conditions']
    ];
    const optionButtons=options.map((opt,index)=>{
      const b=button(textOf(english,opt[0],opt[1]),()=>{
        if(status.answers[status.quizIndex]===null)status.answers[status.quizIndex]=index;
        update();
      });
      choices.append(b);return b;
    });
    const next=button(textOf(english,'次の場面へ →','Next scenario →'),()=>{
      status.quizIndex=(status.quizIndex+1)%quiz.length;update();
    },'mm-lab-button-primary');
    const restart=button(textOf(english,'もう一度','Try again'),()=>{
      status.quizIndex=0;status.answers=[null,null,null,null];update();
    },'mm-lab-button-quiet');
    navigation.append(next,restart);
    root.append(progress,question,choices,feedback,navigation);
    function update(){
      const q=quiz[status.quizIndex], answer=status.answers[status.quizIndex];
      progress.textContent=textOf(english,'場面 '+(status.quizIndex+1)+' / '+quiz.length,'Scenario '+(status.quizIndex+1)+' / '+quiz.length);
      question.textContent=textOf(english,q.ja,q.en);
      optionButtons.forEach((b,i)=>{
        b.disabled=answer!==null;
        b.classList.toggle('is-selected',answer===i);
        b.setAttribute('aria-pressed',String(answer===i));
      });
      feedback.replaceChildren();
      if(answer!==null){
        const correct=answer===q.answer;
        const count=status.answers.reduce((n,a,i)=>n+(a!==null&&a===quiz[i].answer?1:0),0);
        feedback.append(
          make('p','mm-lab-finding',textOf(english,correct?'この判断は妥当。':'この条件では別の判断が有力。',correct?'Reasonable decision.':'Another choice fits these conditions better.')),
          make('p','',textOf(english,q.jaWhy,q.enWhy)),
          make('p','mm-lab-small',textOf(english,'現在の正答 '+count+' / '+quiz.length,'Current correct '+count+' / '+quiz.length))
        );
      } else {
        feedback.append(make('p','mm-lab-small',textOf(english,'一つ選ぶと根拠が表示される。','Choose an answer to reveal the reasoning.')));
      }
      next.disabled=answer===null;
      next.textContent=textOf(english,status.quizIndex===quiz.length-1?'最初の場面へ →':'次の場面へ →',status.quizIndex===quiz.length-1?'Back to first →':'Next scenario →');
    }
    update();
    notice(root,english,'この問題集は状況判断の練習案であり、特定の相手・ステージでの正解を保証するものではない。','These are tactical reasoning prompts, not guaranteed answers for every matchup or stage.');
    return root;
  }

  function mount(context) {
    if(context?.essayId!==ESSAY_ID)return;
    const root=context.root;
    if(!root)return;
    const english=selectLanguage(context.essay);
    root.querySelectorAll('[data-mm-lab="true"]').forEach(el=>el.remove());
    const headings=[...root.querySelectorAll(':scope > h2')];
    if(headings.length<9)return;
    sectionAfter(headings,3,makeClock(english));
    sectionAfter(headings,6,makeBoundary(english));
    sectionAfter(headings,7,makeMuseum(english));
    sectionAfter(headings,8,makeQuiz(english));
  }

  if(window.MyEssaysReaderRuntime?.register){
    window.MyEssaysReaderRuntime.register('megaman-downair-lab',mount,{priority:190});
  }else{
    document.addEventListener('myessays:reader-ready',event=>mount(event.detail));
  }
  window.MegaManDownAirLab = Object.freeze({
    version:'1.0.0',
    isEnabledFor:id=>id===ESSAY_ID,
    classifyHit:(age,target,reflected)=>{
      if(!Number.isInteger(age)||age<0||age>12)return 'none';
      if(age<=2)return 'early';
      if(target==='ground')return 'grounded-late';
      return reflected?'reflected-meteor':'meteor';
    },
    referenceAirtimes:AIRTIME.map(x=>x.value)
  });
})();