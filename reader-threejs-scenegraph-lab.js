(() => {
  'use strict';

  const MODULE_URL = 'https://cdn.jsdelivr.net/npm/three@0.185.0/build/three.module.js';
  let modulePromise = null;
  let activeCleanup = null;

  function ensureStyles() {
    if (document.getElementById('threejs-scenegraph-lab-styles')) return;
    const style = document.createElement('style');
    style.id = 'threejs-scenegraph-lab-styles';
    style.textContent = `
      .threejs-scenegraph-lab{--ink:#223a3f;--muted:#65797c;--line:#c8d4d3;--paper:#f4f1ea;--accent:#a45d32;margin:1.7rem 0;padding:clamp(16px,4vw,26px);border:1px solid var(--line);border-radius:16px;background:var(--paper);color:var(--ink);overflow:hidden}
      .threejs-scenegraph-lab *{box-sizing:border-box}.threejs-scenegraph-head{display:flex;align-items:baseline;justify-content:space-between;gap:10px 16px;flex-wrap:wrap}.threejs-scenegraph-kicker{margin:0;font:700 11px/1.3 ui-monospace,monospace;letter-spacing:.12em}.threejs-scenegraph-status{margin:0;color:var(--muted);font-size:12px}.threejs-scenegraph-stage{position:relative;margin:16px 0 12px;min-height:330px;border:1px solid var(--line);border-radius:12px;background:#e4e9e6;overflow:hidden}.threejs-scenegraph-stage canvas{display:block;width:100%;height:100%;min-height:330px}.threejs-scenegraph-stats{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;margin:0 0 12px}.threejs-scenegraph-stat{padding:9px 10px;border:1px solid var(--line);border-radius:9px;background:#fff;font:700 11px/1.45 ui-monospace,monospace}.threejs-scenegraph-stat span{display:block;margin-top:3px;font-size:12px;color:var(--ink)}.threejs-scenegraph-controls{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px}.threejs-scenegraph-lab button{min-height:48px;padding:9px 10px;border:1px solid var(--line);border-radius:9px;background:#fff;color:var(--ink);font:inherit;font-weight:700}.threejs-scenegraph-lab button[aria-pressed="true"]{background:var(--ink);color:#fff;border-color:var(--ink)}.threejs-scenegraph-lab button:focus-visible{outline:3px solid var(--accent);outline-offset:2px}.threejs-scenegraph-note{margin:12px 0 0;color:var(--muted);font-size:12px;line-height:1.75}.threejs-scenegraph-error{padding:18px;border:1px dashed var(--line);border-radius:10px;background:#fff;color:#6a3232}
      @media(max-width:680px){.threejs-scenegraph-stats,.threejs-scenegraph-controls{grid-template-columns:1fr 1fr}.threejs-scenegraph-stage,.threejs-scenegraph-stage canvas{min-height:270px}}
      @media(max-width:440px){.threejs-scenegraph-stats,.threejs-scenegraph-controls{grid-template-columns:1fr}}
      @media print{.threejs-scenegraph-lab{display:none}}
    `;
    document.head.appendChild(style);
  }

  function loadThree() {
    modulePromise ||= import(MODULE_URL);
    return modulePromise;
  }

  function labels(locale) {
    if (locale === 'en-mix') {
      return {
        kicker: 'LIVE THREE.JS / WHOSE POSITION IS THIS?', loading: 'Loading Three.js…',
        scale1: 'Parent A scale: 1×', scale3: 'Parent A scale: 3×', rotate0: 'Parent A rotation: 0°', rotate45: 'Parent A rotation: 45°',
        helpersOn: 'Hide local axes', helpersOff: 'Show local axes', add: 'Reparent with add()', attach: 'Reparent with attach()', reset: 'Reset',
        local: 'CHILD LOCAL', world: 'CHILD WORLD', parent: 'PARENT', note: 'The child starts at local x = 1.5. Scale or rotate Parent A, then compare LOCAL and WORLD. add() keeps the local transform; attach() tries to keep the world transform.',
        error: 'The live WebGL experiment could not start. The article and static diagrams still work.'
      };
    }
    return {
      kicker: 'LIVE THREE.JS / そのposition、誰から見た数字？', loading: 'Three.jsを読み込んでいます…',
      scale1: 'Parent A：1倍', scale3: 'Parent A：3倍', rotate0: 'Parent A：回転0°', rotate45: 'Parent A：回転45°',
      helpersOn: '座標軸を隠す', helpersOff: '座標軸を表示', add: 'add()で親を替える', attach: 'attach()で親を替える', reset: 'リセット',
      local: 'CHILD LOCAL', world: 'CHILD WORLD', parent: 'PARENT', note: 'Childのlocal xは最初1.5。Parent Aを拡大・回転してLOCALとWORLDを比べ、その後add()とattach()で親の替え方を比較できる。',
      error: 'WebGLのライブ実験を開始できませんでした。本文と静的な図はそのまま読めます。'
    };
  }

  function fmt(v) { return `(${v.x.toFixed(2)}, ${v.y.toFixed(2)}, ${v.z.toFixed(2)})`; }

  async function mount(context) {
    if (activeCleanup) { activeCleanup(); activeCleanup = null; }
    const host = context.root.querySelector('[data-threejs-scenegraph-lab]');
    if (!host) return;

    ensureStyles();
    const locale = host.getAttribute('data-threejs-scenegraph-lab') || 'ja';
    const copy = labels(locale);
    host.classList.add('threejs-scenegraph-lab');
    host.innerHTML = `
      <div class="threejs-scenegraph-head"><p class="threejs-scenegraph-kicker">${copy.kicker}</p><p class="threejs-scenegraph-status" data-status>${copy.loading}</p></div>
      <div class="threejs-scenegraph-stage" data-stage></div>
      <div class="threejs-scenegraph-stats">
        <div class="threejs-scenegraph-stat">${copy.local}<span data-local></span></div>
        <div class="threejs-scenegraph-stat">${copy.world}<span data-world></span></div>
        <div class="threejs-scenegraph-stat">${copy.parent}<span data-parent></span></div>
      </div>
      <div class="threejs-scenegraph-controls">
        <button type="button" data-action="scale" aria-pressed="false">${copy.scale1}</button>
        <button type="button" data-action="rotate" aria-pressed="false">${copy.rotate0}</button>
        <button type="button" data-action="helpers" aria-pressed="true">${copy.helpersOn}</button>
        <button type="button" data-action="add">${copy.add}</button>
        <button type="button" data-action="attach">${copy.attach}</button>
        <button type="button" data-action="reset">${copy.reset}</button>
      </div>
      <p class="threejs-scenegraph-note">${copy.note}</p>`;

    let THREE;
    try { THREE = await loadThree(); }
    catch (error) { console.error('[threejs-scenegraph-lab] module load failed', error); host.innerHTML = `<div class="threejs-scenegraph-error">${copy.error}</div>`; return; }
    if (!host.isConnected || context.root.dataset.readerRenderId !== String(context.renderId)) return;

    const stage = host.querySelector('[data-stage]');
    const status = host.querySelector('[data-status]');
    const localStat = host.querySelector('[data-local]');
    const worldStat = host.querySelector('[data-world]');
    const parentStat = host.querySelector('[data-parent]');
    const scaleBtn = host.querySelector('[data-action="scale"]');
    const rotateBtn = host.querySelector('[data-action="rotate"]');
    const helpersBtn = host.querySelector('[data-action="helpers"]');
    const addBtn = host.querySelector('[data-action="add"]');
    const attachBtn = host.querySelector('[data-action="attach"]');
    const resetBtn = host.querySelector('[data-action="reset"]');

    let renderer;
    try { renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false }); }
    catch (error) { console.error('[threejs-scenegraph-lab] renderer init failed', error); host.innerHTML = `<div class="threejs-scenegraph-error">${copy.error}</div>`; return; }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0xe4e9e6, 1);
    stage.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(46, 1, 0.1, 100);
    camera.position.set(8.5, 7.2, 10.5);
    camera.lookAt(0, 0.6, 0);

    scene.add(new THREE.HemisphereLight(0xffffff, 0x566268, 2.0));
    const directional = new THREE.DirectionalLight(0xffffff, 2.5);
    directional.position.set(5, 8, 4);
    scene.add(directional);

    const worldGrid = new THREE.GridHelper(14, 14, 0x7c8d8d, 0xb8c2c0);
    scene.add(worldGrid);
    const worldAxes = new THREE.AxesHelper(2.0);
    scene.add(worldAxes);

    const parentA = new THREE.Object3D();
    parentA.name = 'A';
    parentA.position.set(-2.5, 0, 0);
    scene.add(parentA);
    const parentB = new THREE.Object3D();
    parentB.name = 'B';
    parentB.position.set(2.6, 0, 0.8);
    parentB.rotation.y = -Math.PI / 8;
    scene.add(parentB);

    const anchorGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.12, 24);
    const anchorMatA = new THREE.MeshStandardMaterial({ color: 0x4e7480, roughness: 0.7 });
    const anchorMatB = new THREE.MeshStandardMaterial({ color: 0x8c6955, roughness: 0.7 });
    parentA.add(new THREE.Mesh(anchorGeo, anchorMatA));
    parentB.add(new THREE.Mesh(anchorGeo, anchorMatB));

    const childGeo = new THREE.BoxGeometry(0.7, 0.7, 0.7);
    const childMat = new THREE.MeshStandardMaterial({ color: 0xd4aa31, roughness: 0.48, metalness: 0.05 });
    const child = new THREE.Mesh(childGeo, childMat);
    child.position.set(1.5, 0.55, 0);
    parentA.add(child);

    const helpers = [];
    function addLocalHelpers(node, size) {
      const axes = new THREE.AxesHelper(size);
      const grid = new THREE.GridHelper(size * 2.4, 8, 0x657a7d, 0xaab7b5);
      grid.material.transparent = true;
      grid.material.opacity = 0.45;
      node.add(axes, grid);
      helpers.push(axes, grid);
    }
    addLocalHelpers(parentA, 1.8);
    addLocalHelpers(parentB, 1.8);
    const childAxes = new THREE.AxesHelper(1.0);
    child.add(childAxes);
    helpers.push(childAxes);

    let scaleThree = false;
    let rotated = false;
    let helpersVisible = true;
    const world = new THREE.Vector3();

    function resize() {
      const width = Math.max(280, stage.clientWidth);
      const height = Math.max(250, Math.round(width * 0.57));
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    }

    function render() {
      scene.updateMatrixWorld(true);
      child.getWorldPosition(world);
      localStat.textContent = fmt(child.position);
      worldStat.textContent = fmt(world);
      parentStat.textContent = child.parent === parentA ? 'Parent A' : 'Parent B';
      renderer.render(scene, camera);
    }

    scaleBtn.addEventListener('click', () => {
      scaleThree = !scaleThree;
      parentA.scale.setScalar(scaleThree ? 3 : 1);
      scaleBtn.setAttribute('aria-pressed', String(scaleThree));
      scaleBtn.textContent = scaleThree ? copy.scale3 : copy.scale1;
      render();
    });

    rotateBtn.addEventListener('click', () => {
      rotated = !rotated;
      parentA.rotation.y = rotated ? Math.PI / 4 : 0;
      rotateBtn.setAttribute('aria-pressed', String(rotated));
      rotateBtn.textContent = rotated ? copy.rotate45 : copy.rotate0;
      render();
    });

    helpersBtn.addEventListener('click', () => {
      helpersVisible = !helpersVisible;
      helpers.forEach((helper) => { helper.visible = helpersVisible; });
      worldAxes.visible = helpersVisible;
      helpersBtn.setAttribute('aria-pressed', String(helpersVisible));
      helpersBtn.textContent = helpersVisible ? copy.helpersOn : copy.helpersOff;
      render();
    });

    function otherParent() { return child.parent === parentA ? parentB : parentA; }

    addBtn.addEventListener('click', () => {
      otherParent().add(child);
      render();
    });

    attachBtn.addEventListener('click', () => {
      scene.updateMatrixWorld(true);
      otherParent().attach(child);
      render();
    });

    resetBtn.addEventListener('click', () => {
      parentA.scale.setScalar(1);
      parentA.rotation.y = 0;
      parentB.scale.setScalar(1);
      parentA.add(child);
      child.position.set(1.5, 0.55, 0);
      child.rotation.set(0, 0, 0);
      child.scale.setScalar(1);
      scaleThree = false;
      rotated = false;
      scaleBtn.setAttribute('aria-pressed', 'false');
      rotateBtn.setAttribute('aria-pressed', 'false');
      scaleBtn.textContent = copy.scale1;
      rotateBtn.textContent = copy.rotate0;
      render();
    });

    const resizeObserver = new ResizeObserver(() => { resize(); render(); });
    resizeObserver.observe(stage);
    resize();
    status.textContent = 'three.js r185 / Object3D Scene Graph';
    render();

    function disposeObject(object) {
      if (object.geometry?.dispose) object.geometry.dispose();
      const materials = Array.isArray(object.material) ? object.material : object.material ? [object.material] : [];
      materials.forEach((material) => material.dispose?.());
    }

    activeCleanup = () => {
      resizeObserver.disconnect();
      scene.traverse(disposeObject);
      renderer.dispose();
      if (renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement);
    };
  }

  if (window.MyEssaysReaderRuntime) {
    window.MyEssaysReaderRuntime.register('threejs-scenegraph-lab', mount, { priority: 37 });
  }
})();
