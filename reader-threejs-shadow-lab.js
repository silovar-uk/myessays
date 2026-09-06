(() => {
  'use strict';

  const MODULE_URL = 'https://cdn.jsdelivr.net/npm/three@0.185.0/build/three.module.js';
  let activeCleanup = null;
  let modulePromise = null;

  function ensureStyles() {
    if (document.getElementById('threejs-shadow-lab-styles')) return;
    const style = document.createElement('style');
    style.id = 'threejs-shadow-lab-styles';
    style.textContent = `
      .threejs-shadow-lab{--ink:#21383d;--muted:#66797c;--line:#cbd5d4;--paper:#f4f1ea;--accent:#a66232;margin:1.7rem 0;padding:clamp(16px,4vw,26px);border:1px solid var(--line);border-radius:16px;background:var(--paper);color:var(--ink);overflow:hidden}
      .threejs-shadow-lab *{box-sizing:border-box}.threejs-shadow-lab-head{display:flex;gap:10px 16px;align-items:baseline;justify-content:space-between;flex-wrap:wrap}.threejs-shadow-lab-kicker{margin:0;font:700 11px/1.3 ui-monospace,monospace;letter-spacing:.12em}.threejs-shadow-lab-status{margin:0;color:var(--muted);font-size:12px}.threejs-shadow-lab-stage{position:relative;margin:16px 0 14px;min-height:300px;border:1px solid var(--line);border-radius:12px;background:#dfe6e3;overflow:hidden}.threejs-shadow-lab-stage canvas{display:block;width:100%;height:100%;min-height:300px}.threejs-shadow-lab-overlay{position:absolute;left:12px;right:12px;bottom:10px;display:flex;gap:7px;flex-wrap:wrap;pointer-events:none}.threejs-shadow-lab-chip{padding:5px 8px;border-radius:999px;background:rgba(255,255,255,.9);color:#21383d;font:700 10px/1.2 ui-monospace,monospace;box-shadow:0 1px 2px rgba(0,0,0,.08)}.threejs-shadow-lab-controls{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px}.threejs-shadow-lab button{min-height:48px;padding:9px 10px;border:1px solid var(--line);border-radius:9px;background:#fff;color:var(--ink);font:inherit;font-weight:700}.threejs-shadow-lab button[aria-pressed="true"]{background:var(--ink);color:#fff;border-color:var(--ink)}.threejs-shadow-lab button:focus-visible{outline:3px solid var(--accent);outline-offset:2px}.threejs-shadow-lab-note{margin:12px 0 0;color:var(--muted);font-size:12px;line-height:1.75}.threejs-shadow-lab-error{padding:18px;border:1px dashed var(--line);border-radius:10px;background:#fff;color:#6a3232}
      @media(max-width:620px){.threejs-shadow-lab-controls{grid-template-columns:1fr}.threejs-shadow-lab-stage,.threejs-shadow-lab-stage canvas{min-height:250px}}
      @media print{.threejs-shadow-lab{display:none}}
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
        kicker: 'LIVE THREE.JS / BREAK THE SHADOW CAMERA',
        loading: 'Loading Three.js…',
        narrow: 'Narrow shadow range',
        wide: 'Wide shadow range',
        helperOn: 'Show shadow camera',
        helperOff: 'Hide shadow camera',
        oneLight: '1 shadow light',
        twoLights: '2 shadow lights',
        note: 'The boxes and illumination stay in the scene. Narrowing the DirectionalLight shadow camera can remove shadows outside its frustum. RENDER CALLS comes from renderer.info and is a diagnostic, not a complete performance score. Showing CameraHelper adds its own draw work.',
        error: 'The live WebGL shadow experiment could not start. The article and static diagram still work.'
      };
    }
    return {
      kicker: 'LIVE THREE.JS / 影のCameraをわざと壊す',
      loading: 'Three.jsを読み込んでいます…',
      narrow: '影の範囲を狭める',
      wide: '影の範囲を広げる',
      helperOn: 'Shadow Cameraを表示',
      helperOff: 'Shadow Cameraを隠す',
      oneLight: '影ライト1個',
      twoLights: '影ライト2個',
      note: '箱と照明はそのまま。DirectionalLightのShadow Cameraだけを狭めると、frustum外の影が消える。RENDER CALLSはrenderer.infoの診断値で、性能そのものではない。CameraHelperを表示するとhelper自身の描画も加わる。',
      error: 'WebGLのライブ影実験を開始できませんでした。本文と静的な図はそのまま読めます。'
    };
  }

  async function mount(context) {
    if (activeCleanup) {
      activeCleanup();
      activeCleanup = null;
    }

    const host = context.root.querySelector('[data-threejs-shadow-lab]');
    if (!host) return;

    ensureStyles();
    const locale = host.getAttribute('data-threejs-shadow-lab') || 'ja';
    const copy = labels(locale);
    host.classList.add('threejs-shadow-lab');
    host.innerHTML = `
      <div class="threejs-shadow-lab-head">
        <p class="threejs-shadow-lab-kicker">${copy.kicker}</p>
        <p class="threejs-shadow-lab-status" data-shadow-status>${copy.loading}</p>
      </div>
      <div class="threejs-shadow-lab-stage" data-shadow-stage></div>
      <div class="threejs-shadow-lab-controls">
        <button type="button" data-action="scope" aria-pressed="false">${copy.narrow}</button>
        <button type="button" data-action="helper" aria-pressed="false">${copy.helperOn}</button>
        <button type="button" data-action="lights" aria-pressed="false">${copy.oneLight}</button>
      </div>
      <p class="threejs-shadow-lab-note">${copy.note}</p>
    `;

    const status = host.querySelector('[data-shadow-status]');
    const stage = host.querySelector('[data-shadow-stage]');
    const scopeButton = host.querySelector('[data-action="scope"]');
    const helperButton = host.querySelector('[data-action="helper"]');
    const lightsButton = host.querySelector('[data-action="lights"]');

    let THREE;
    try {
      THREE = await loadThree();
    } catch (error) {
      console.error('[threejs-shadow-lab] module load failed', error);
      host.innerHTML = `<div class="threejs-shadow-lab-error">${copy.error}</div>`;
      return;
    }

    if (!host.isConnected || context.root.dataset.readerRenderId !== String(context.renderId)) return;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    } catch (error) {
      console.error('[threejs-shadow-lab] renderer init failed', error);
      host.innerHTML = `<div class="threejs-shadow-lab-error">${copy.error}</div>`;
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0xdfe6e3, 1);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    stage.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(46, 1, 0.1, 100);
    camera.position.set(7.2, 6.3, 8.4);
    camera.lookAt(0, 0.7, 0);

    const hemi = new THREE.HemisphereLight(0xffffff, 0x6d7877, 1.25);
    scene.add(hemi);

    const groundGeometry = new THREE.PlaneGeometry(12, 8);
    const groundMaterial = new THREE.MeshStandardMaterial({ color: 0xd6d2c8, roughness: 0.92 });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    const boxGeometry = new THREE.BoxGeometry(1.35, 1.7, 1.35);
    const boxMaterials = [
      new THREE.MeshStandardMaterial({ color: 0x9b6040, roughness: 0.72 }),
      new THREE.MeshStandardMaterial({ color: 0x31575d, roughness: 0.72 }),
      new THREE.MeshStandardMaterial({ color: 0x6d7462, roughness: 0.72 })
    ];
    const boxes = [-2.35, 0, 2.35].map((x, index) => {
      const mesh = new THREE.Mesh(boxGeometry, boxMaterials[index]);
      mesh.position.set(x, 0.85, index === 1 ? 0.15 : 0);
      mesh.rotation.y = (index - 1) * 0.18;
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      scene.add(mesh);
      return mesh;
    });

    const primary = new THREE.DirectionalLight(0xfff0d6, 3.2);
    primary.position.set(4.5, 7.5, 4.2);
    primary.castShadow = true;
    primary.shadow.mapSize.set(1024, 1024);
    primary.shadow.camera.near = 0.5;
    primary.shadow.camera.far = 20;
    primary.shadow.bias = -0.00025;
    scene.add(primary);
    scene.add(primary.target);
    primary.target.position.set(0, 0, 0);

    const secondary = new THREE.DirectionalLight(0xdde8ff, 1.1);
    secondary.position.set(-4.5, 5.5, -2.5);
    secondary.castShadow = false;
    secondary.shadow.mapSize.set(1024, 1024);
    secondary.shadow.camera.near = 0.5;
    secondary.shadow.camera.far = 20;
    secondary.shadow.bias = -0.00025;
    scene.add(secondary);
    scene.add(secondary.target);
    secondary.target.position.set(0, 0, 0);

    function setShadowBounds(light, halfSize) {
      const shadowCamera = light.shadow.camera;
      shadowCamera.left = -halfSize;
      shadowCamera.right = halfSize;
      shadowCamera.top = halfSize;
      shadowCamera.bottom = -halfSize;
      shadowCamera.updateProjectionMatrix();
    }

    setShadowBounds(primary, 5.2);
    setShadowBounds(secondary, 5.2);

    const helper = new THREE.CameraHelper(primary.shadow.camera);
    helper.visible = false;
    scene.add(helper);

    const overlay = document.createElement('div');
    overlay.className = 'threejs-shadow-lab-overlay';
    overlay.innerHTML = '<span class="threejs-shadow-lab-chip" data-stat-scope></span><span class="threejs-shadow-lab-chip" data-stat-lights></span><span class="threejs-shadow-lab-chip" data-stat-views></span><span class="threejs-shadow-lab-chip" data-stat-calls></span>';
    stage.appendChild(overlay);
    const statScope = overlay.querySelector('[data-stat-scope]');
    const statLights = overlay.querySelector('[data-stat-lights]');
    const statViews = overlay.querySelector('[data-stat-views]');
    const statCalls = overlay.querySelector('[data-stat-calls]');

    let narrow = false;
    let helperVisible = false;
    let twoLights = false;

    function resize() {
      const width = Math.max(280, stage.clientWidth);
      const height = Math.max(240, Math.round(width * 0.58));
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    }

    function render() {
      helper.update();
      renderer.render(scene, camera);
      statScope.textContent = narrow ? 'SHADOW RANGE: NARROW' : 'SHADOW RANGE: WIDE';
      statLights.textContent = `SHADOW LIGHTS: ${twoLights ? 2 : 1}`;
      statViews.textContent = `SCENE VIEWS: ${twoLights ? 3 : 2}`;
      statCalls.textContent = `RENDER CALLS: ${renderer.info.render.calls}`;
    }

    scopeButton.addEventListener('click', () => {
      narrow = !narrow;
      setShadowBounds(primary, narrow ? 1.45 : 5.2);
      primary.shadow.needsUpdate = true;
      helper.update();
      scopeButton.setAttribute('aria-pressed', String(narrow));
      scopeButton.textContent = narrow ? copy.wide : copy.narrow;
      render();
    });

    helperButton.addEventListener('click', () => {
      helperVisible = !helperVisible;
      helper.visible = helperVisible;
      helperButton.setAttribute('aria-pressed', String(helperVisible));
      helperButton.textContent = helperVisible ? copy.helperOff : copy.helperOn;
      render();
    });

    lightsButton.addEventListener('click', () => {
      twoLights = !twoLights;
      secondary.castShadow = twoLights;
      secondary.shadow.needsUpdate = true;
      lightsButton.setAttribute('aria-pressed', String(twoLights));
      lightsButton.textContent = twoLights ? copy.twoLights : copy.oneLight;
      render();
    });

    const resizeObserver = new ResizeObserver(() => { resize(); render(); });
    resizeObserver.observe(stage);
    resize();
    status.textContent = 'three.js r185 / WebGLRenderer / PCFSoftShadowMap';
    render();

    activeCleanup = () => {
      resizeObserver.disconnect();
      groundGeometry.dispose();
      groundMaterial.dispose();
      boxGeometry.dispose();
      boxMaterials.forEach((material) => material.dispose());
      helper.geometry.dispose();
      if (Array.isArray(helper.material)) helper.material.forEach((material) => material.dispose());
      else helper.material.dispose();
      primary.shadow.map?.dispose();
      secondary.shadow.map?.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement);
      boxes.length = 0;
    };
  }

  if (window.MyEssaysReaderRuntime) {
    window.MyEssaysReaderRuntime.register('threejs-shadow-lab', mount, { priority: 37 });
  }
})();
