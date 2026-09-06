(() => {
  'use strict';

  // A settled, active-high NOR SR latch. null means no guaranteed stored bit.
  // This teaching model does not simulate propagation delay or metastability.
  const initialState = () => ({ powered: true, s: 0, r: 0, q: 0 });

  function transition(current, action) {
    if (action === 'restart') return initialState();
    if (action === 'power') return { powered: !current.powered, s: 0, r: 0, q: null };
    if (!current.powered) return current;
    if (action === 's' && !current.r) {
      return { ...current, s: 1 - current.s, q: current.s ? current.q : 1 };
    }
    if (action === 'r' && !current.s) {
      return { ...current, r: 1 - current.r, q: current.r ? current.q : 0 };
    }
    if (action === 'release') return { ...current, s: 0, r: 0 };
    return current;
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { initialState, transition };
    return;
  }

  // Share the experiment between reading modes, only for this page session.
  const sessions = new Map();
  const labels = {
    ja: {
      name: '1ビットの記憶を試す',
      guide: 'SをON → 両入力をOFF。次はRをON → 両入力をOFF。Qを見比べてください。',
      set: 'S：1を書き込む', reset: 'R：0を書き込む',
      release: '両入力をOFF', powerOff: '電源を切る', powerOn: '電源を入れる',
      restart: '0からやり直す', value: '記憶している値 Q', unknown: '未確定', noPower: '電源OFF',
      history: '直近の操作', initial: 'リセット済みの0から開始',
      note: '同時ONは不可。相手側を操作するには、先に入力をOFFにしてください。電源を入れ直した後の値は保証できません。',
      hold: '入力は両方0です。直前のQを保持しています。',
      setState: 'Sが1なので、Qに1を書き込みました。',
      resetState: 'Rが1なので、Qに0を書き込みました。',
      unknownState: '起動後の値は未確定です。SかRをONにして値を決めてください。',
      offState: '電源を切りました。保持していた値は失われます。',
      events: { s: 'Sを切り替え', r: 'Rを切り替え', release: '両入力をOFF', power: '電源を切り替え', restart: 'リセットして再開' }
    },
    'en-mix': {
      name: '1ビットの記憶 / Try one bit',
      guide: 'SをON → Both OFF。次はRをON → Both OFF。Same inputs, different Q?',
      set: 'S：1を書く / Set', reset: 'R：0を書く / Reset',
      release: '両入力をOFF / Both OFF', powerOff: '電源を切る / Power OFF', powerOn: '電源を入れる / Power ON',
      restart: '0から再開 / Restart', value: '記憶 / Stored bit Q', unknown: '未確定 / Unknown', noPower: '電源OFF',
      history: '直近の操作 / Recent steps', initial: 'Reset to 0 / 初期化済み',
      note: 'Both ON is disabled.相手側を操作する前に入力をOFFにしてください。After a power cycle, the old value is not guaranteed.',
      hold: 'Both inputs are 0.直前のQを保持しています。',
      setState: 'S is 1. Qに1を書き込みました。',
      resetState: 'R is 1. Qに0を書き込みました。',
      unknownState: 'The initial value is unknown.SかRをONにして値を決めてください。',
      offState: 'Power is off.保持していた値は失われます。',
      events: { s: 'Toggle S', r: 'Toggle R', release: 'Both inputs OFF', power: 'Toggle power', restart: 'Reset and restart' }
    }
  };

  function mount({ root, essayId }) {
    const host = root.querySelector('[data-memory-lab]');
    if (!host || host.dataset.memoryMounted === 'true') return;
    const lang = labels[host.dataset.memoryLab] || labels.ja;
    if (!document.getElementById('memoryLabStyles')) {
      const link = document.createElement('link');
      link.id = 'memoryLabStyles';
      link.rel = 'stylesheet';
      link.href = 'assets/memory-computation/lab.css?v=20260906-1';
      document.head.append(link);
    }
    if (!sessions.has(essayId)) {
      sessions.set(essayId, { state: initialState(), history: [{ action: 'initial', ...initialState() }] });
    }
    const session = sessions.get(essayId);
    host.classList.add('memory-lab');
    host.setAttribute('role', 'group');
    host.setAttribute('aria-label', lang.name);
    host.dataset.memoryMounted = 'true';
    host.innerHTML = `
      <div class="memory-lab-heading"><span class="memory-lab-kicker">TRY / 01</span><strong>${lang.name}</strong></div>
      <p class="memory-lab-guide">${lang.guide}</p>
      <div class="memory-lab-surface">
        <div class="memory-lab-inputs">
          <button type="button" data-memory-action="s" aria-pressed="false"><span>${lang.set}</span><b data-s-label>OFF · 0</b></button>
          <button type="button" data-memory-action="r" aria-pressed="false"><span>${lang.reset}</span><b data-r-label>OFF · 0</b></button>
          <button type="button" data-memory-action="release" class="memory-lab-release">${lang.release}</button>
        </div>
        <div class="memory-lab-value"><span>${lang.value}</span><strong data-q>0</strong><small data-complement>Q̄ = 1</small></div>
      </div>
      <p class="memory-lab-status" role="status" aria-live="polite" aria-atomic="true"></p>
      <div class="memory-lab-secondary">
        <button type="button" data-memory-action="power"></button>
        <button type="button" data-memory-action="restart">${lang.restart}</button>
      </div>
      <p class="memory-lab-note">${lang.note}</p>
      <details class="memory-lab-history"><summary>${lang.history}</summary><ol></ol></details>`;

    const select = selector => host.querySelector(selector);
    const sButton = select('[data-memory-action="s"]');
    const rButton = select('[data-memory-action="r"]');
    const qLabel = select('[data-q]');

    function render() {
      const state = session.state;
      host.dataset.value = state.powered && state.q !== null ? String(state.q) : 'unknown';
      sButton.disabled = !state.powered || Boolean(state.r);
      rButton.disabled = !state.powered || Boolean(state.s);
      select('[data-memory-action="release"]').disabled = !state.powered;
      sButton.setAttribute('aria-pressed', String(Boolean(state.s)));
      rButton.setAttribute('aria-pressed', String(Boolean(state.r)));
      select('[data-s-label]').textContent = state.s ? 'ON · 1' : 'OFF · 0';
      select('[data-r-label]').textContent = state.r ? 'ON · 1' : 'OFF · 0';
      qLabel.textContent = !state.powered ? lang.noPower : state.q === null ? lang.unknown : String(state.q);
      select('[data-complement]').textContent = state.powered && state.q !== null ? `Q̄ = ${1 - state.q}` : 'Q̄ = ?';
      select('[data-memory-action="power"]').textContent = state.powered ? lang.powerOff : lang.powerOn;
      select('.memory-lab-status').textContent = !state.powered ? lang.offState
        : state.q === null ? lang.unknownState
        : state.s ? lang.setState : state.r ? lang.resetState : lang.hold;
      const history = select('.memory-lab-history ol');
      history.replaceChildren(...session.history.map(item => {
        const li = document.createElement('li');
        const value = !item.powered ? lang.noPower : item.q === null ? '?' : item.q;
        li.textContent = `${item.action === 'initial' ? lang.initial : lang.events[item.action]} → S=${item.s}, R=${item.r}, Q=${value}`;
        return li;
      }));
    }

    host.addEventListener('click', event => {
      const button = event.target.closest('[data-memory-action]');
      if (!button || !host.contains(button) || button.disabled) return;
      const action = button.dataset.memoryAction;
      session.state = transition(session.state, action);
      if (action === 'restart') session.history = [];
      session.history.push({ action, ...session.state });
      session.history = session.history.slice(-6);
      render();
    });
    render();
  }

  window.MyEssaysReaderRuntime.register('memory-lab', mount, { priority: 35 });
})();
