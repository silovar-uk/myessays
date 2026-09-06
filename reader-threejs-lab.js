(() => {
  'use strict';

  const MODULE_URL = 'https://cdn.jsdelivr.net/npm/three@0.185.0/build/three.module.js';
  let activeCleanup = null;
  let modulePromise = null;

  function ensureStyles() {
    if (document.getElementById('threejs-lab-styles')) return;
    const style = document.createElement('style');
    style.id = 'threejs-lab-styles';
    style.textContent = `
      .threejs-lab{--lab-ink:#18333a;--lab-muted:#5f7478;--lab-line:#c9d6d7;--lab-bg:#f3f7f7;margin:1.6rem 0;padding:clamp(16px,4vw,26px);border:1px solid var(--lab-line);border-radius:16px;background:var(--lab-bg);color:var(--lab-ink);overflow:hidden}
      .threejs-lab *{box-sizing:border-box}.threejs-lab-head{display:flex;gap:10px 16px;align-items:baseline;justify-content:space-between;flex-wrap:wrap}.threejs-lab-kicker{margin:0;font:700 11px/1.3 ui-monospace,monospace;letter-spacing:.12em}.threejs-lab-status{margin:0;color:var(--lab-muted);font-size:12px}.threejs-lab-stage{position:relative;margin:16px 0 14px;min-height:280px;border:1px solid var(--lab-line);border-radius:12px;background:#0f171a;overflow:hidden}.threejs-lab-stage canvas{display:block;width:100%;height:100%;min-height:280px}.threejs-lab-overlay{position:absolute;left:12px;bottom:10px;display:flex;gap:8px;flex-wrap:wrap;pointer-events:none}.threejs-lab-chip{padding:5px 8px;border-radius:999px;background:rgba(255,255,255,.88);color:#18333a;font:700 11px/1.2 ui-monospace,monospace}.threejs-lab-controls{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px}.threejs-lab button{min-height:46px;padding:9px 10px;border:1px solid var(--lab-line);border-radius:9px;background:#fff;color:var(--lab-ink);font:inherit;font-weight:700}.threejs-lab button[aria-pressed="true"]{background:#18333a;color:#fff;border-color:#18333a}.threejs-lab button:focus-visible{outline:3px solid #b84928;outline-offset:2px}.threejs-lab-note{margin:12px 0 0;color:var(--lab-muted);font-size:12px;line-height:1.7}.threejs-lab-error{padding:18px;border:1px dashed var(--lab-line);border-radius:10px;background:#fff;color:#6a3232}
      @media(max-width:560px){.threejs-lab-controls{grid-template-columns:1fr}.threejs-lab-stage,.threejs-lab-stage canvas{min-height:235px}}
      @media(prefers-reduced-motion:reduce){.threejs-lab [data-action="motion"]{display:none}}
      @media print{.threejs-lab{display:none}}
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
        kicker: 'LIVE THREE.JS / SAME CUBE, DIFFERENT VIEW',
        loading: 'Loading Three.js…',
        perspective: 'Perspective camera',
        ortho: 'Orthographic camera',
        solid: 'Solid faces',
        wire: 'Wireframe',
        rotate: 'Rotating',
        stop: 'Stopped',
        note: 'Geometry stays the same. The camera changes the projection; wireframe changes the material. Triangle count comes from renderer.info.',
        error: 'The live WebGL demo could not start. The article and static diagram still work.'
      };
    }
    return {
      kicker: 'LIVE THREE.JS / 同じ立方体を、違う見方で見る',
      loading: 'Three.jsを読み込んでいます…',
      perspective: '透視投影カメラ',
      ortho: '平行投影カメラ',
      solid: '面で表示',
      wire: 'ワイヤーフレーム',
      rotate: '回転中',
      stop: '停止中',
      note: '形状は同じまま。カメラを変えると投影が変わり、ワイヤーフレームでは材質の見せ方だけが変わる。三角形数はrenderer.infoから取得。',
      error: 'WebGLのライブ実験を開始できませんでした。本文と静的な図はそのまま読めます。'
    };
  }

  async function mount(context) {
    if (activeCleanup) {
      activeCleanup();
      activeCleanup = null;
    }

    const host = context.root.querySelector('[data-threejs-lab]');
    if (!host) return;

    ensureStyles();
    const locale = host.getAttribute('data-threejs-lab') || 'ja';
    const copy = labels(locale);
    host.classList.add('threejs-lab');
    host.innerHTML = `
      <div class="threejs-lab-head">
        <p class="threejs-lab-kicker">${copy.kicker}</p>
        <p class="threejs-lab-status" data-lab-status>${copy.loading}</p>
      </div>
      <div class="threejs-lab-stage" data-lab-stage></div>
      <div class="threejs-lab-controls">
        <button type="button" data-action="camera" aria-pressed="false">${copy.perspective}</button>
        <button type="button" data-action="wire" aria-pressed="false">${copy.solid}</button>
        <button type="button" data-action="motion" aria-pressed="true">${copy.rotate}</button>
      </div>
      <p class="threejs-lab-note">${copy.note}</p>
    `;

    const status = host.querySelector('[data-lab-status]');
    const stage = host.querySelector('[data-lab-stage]');
    const cameraButton = host.querySelector('[data-action="camera"]');
    const wireButton = host.querySelector('[data-action="wire"]');
    const motionButton = host.querySelector('[data-action="motion"]');

    let THREE;
    try {
      THREE = await loadThree();
    } catch (error) {
      console.error('[threejs-lab] module load failed', error);
      host.innerHTML = `<div class="threejs-lab-error">${copy.error}</div>`;
      return;
    }

    if (!host.isConnected || context.root.dataset.readerRenderId !== String(context.renderId)) return;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    } catch (error) {
      console.error('[threejs-lab] renderer init failed', error);
      host.innerHTML = `<div class="threejs-lab-error">${copy.error}</div>`;
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x0f171a, 1);
    stage.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const geometry = new THREE.BoxGeometry(1.55, 1.55, 1.55);
    const material = new THREE.MeshNormalMaterial();
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    const perspective = new THREE.PerspectiveCamera(48, 1, 0.1, 100);
    perspective.position.set(3.2, 2.3, 4.2);
    perspective.lookAt(0, 0, 0);

    const ortho = new THREE.OrthographicCamera(-2.25, 2.25, 2.25, -2.25, 0.1, 100);
    ortho.position.copy(perspective.position);
    ortho.lookAt(0, 0, 0);

    const overlay = document.createElement('div');
    overlay.className = 'threejs-lab-overlay';
    overlay.innerHTML = '<span class="threejs-lab-chip" data-stat-camera></span><span class="threejs-lab-chip" data-stat-primitives></span><span class="threejs-lab-chip" data-stat-calls></span>';
    stage.appendChild(overlay);
    const statCamera = overlay.querySelector('[data-stat-camera]');
    const statPrimitives = overlay.querySelector('[data-stat-primitives]');
    const statCalls = overlay.querySelector('[data-stat-calls]');

    let useOrtho = false;
    let wireframe = false;
    let moving = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    motionButton.setAttribute('aria-pressed', String(moving));
    motionButton.textContent = moving ? copy.rotate : copy.stop;
    let raf = 0;
    let last = performance.now();

    function activeCamera() { return useOrtho ? ortho : perspective; }

    function resize() {
      const width = Math.max(280, stage.clientWidth);
      const height = Math.max(220, Math.round(width * 0.56));
      renderer.setSize(width, height, false);
      perspective.aspect = width / height;
      perspective.updateProjectionMatrix();
      const viewHeight = 4.5;
      const viewWidth = viewHeight * (width / height);
      ortho.left = -viewWidth / 2;
      ortho.right = viewWidth / 2;
      ortho.top = viewHeight / 2;
      ortho.bottom = -viewHeight / 2;
      ortho.updateProjectionMatrix();
    }

    function render(now = performance.now()) {
      if (moving) {
        const dt = Math.min((now - last) / 1000, 0.05);
        cube.rotation.x += dt * 0.45;
        cube.rotation.y += dt * 0.72;
      }
      last = now;
      renderer.render(scene, activeCamera());
      statCamera.textContent = useOrtho ? 'CAMERA: ORTHO' : 'CAMERA: PERSPECTIVE';
      statPrimitives.textContent = wireframe ? `LINES: ${renderer.info.render.lines}` : `TRIANGLES: ${renderer.info.render.triangles}`;
      statCalls.textContent = `DRAW CALLS: ${renderer.info.render.calls}`;
    }

    function loop(now) {
      render(now);
      if (moving) raf = requestAnimationFrame(loop);
    }

    function restartLoop() {
      cancelAnimationFrame(raf);
      if (moving) raf = requestAnimationFrame(loop);
      else render();
    }

    cameraButton.addEventListener('click', () => {
      useOrtho = !useOrtho;
      cameraButton.setAttribute('aria-pressed', String(useOrtho));
      cameraButton.textContent = useOrtho ? copy.ortho : copy.perspective;
      render();
    });

    wireButton.addEventListener('click', () => {
      wireframe = !wireframe;
      material.wireframe = wireframe;
      material.needsUpdate = true;
      wireButton.setAttribute('aria-pressed', String(wireframe));
      wireButton.textContent = wireframe ? copy.wire : copy.solid;
      render();
    });

    motionButton.addEventListener('click', () => {
      moving = !moving;
      motionButton.setAttribute('aria-pressed', String(moving));
      motionButton.textContent = moving ? copy.rotate : copy.stop;
      restartLoop();
    });

    const resizeObserver = new ResizeObserver(() => { resize(); render(); });
    resizeObserver.observe(stage);
    resize();
    status.textContent = 'three.js r185 / WebGLRenderer';
    restartLoop();

    activeCleanup = () => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement);
    };
  }

  if (window.MyEssaysReaderRuntime) {
    window.MyEssaysReaderRuntime.register('threejs-lab', mount, { priority: 36 });
  }
})();
