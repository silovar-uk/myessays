---
id: threejs-why-a-cube-needs-a-camera
title: "Why Does a Cube Need a Camera? Three.jsが『3D』の面倒を見ている話"
subtitle: "English Mix｜From one spinning box to triangles, projection, Scene Graph, and WebGPU"
created: "2026-09-06"
updated: "2026-09-06"
type: "English Mix"
status: "完成"
mode: "english-mix"
english_ratio: 0.45
mix_unit: "sentence"
abstract: "Why does one tiny cube need a Scene, a Camera, and a Renderer? 同じ立方体をPerspectiveとOrthographicで見比べ、renderer.infoの三角形数まで触って確認する。Three.jsを『3Dを簡単にする魔法』ではなく、world・view・projection・GPU workを役割分担する仕組みとして捉え直す。"
---

# Why Does a Cube Need a Camera? Three.jsが「3D」の面倒を見ている話

Open almost any Three.js beginner example and you meet a cube.

A cube. Very friendly.

でもコードを見ると、箱ひとつの周りに`Scene`、`Camera`、`Renderer`が並んでいる。

**Why does a cube need a camera?**

誰が撮影するんだ、と思う。

That strange little question turned out to be a useful entrance into Three.js itself.

Three.js is often described as a JavaScript 3D library.正しい。ただ、もう少し解像度を上げると、こう見えてくる。

**Three.js manages the division of labor required to squeeze a 3D world onto a 2D screen.**

まず、回る箱をちゃんと疑ってみる。

## 1. What does Three.js actually simplify? / 何を簡単にしている？

The official manual explains that Three.js makes 3D content on a webpage easier to build. Under it, WebGL is much lower-level: it basically draws points, lines, and triangles.Three.jsはその上で、scene、lights、shadows、materials、textures、3D mathなどを扱う。[Three.js Fundamentals](https://threejs.org/manual/en/fundamentals.html)

So the GPU never receives a magical command called “draw a cube.”

人間側では、例えばこう書ける。

```js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshNormalMaterial();
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

const renderer = new THREE.WebGLRenderer();
renderer.render(scene, camera);
```

Quite a cast for one box.

でも役割は明快。

- `Geometry`：shape。頂点や面の情報。
- `Material`：surface appearance。どう見せるか。
- `Mesh`：geometry + material。形と材質を持つ物体。
- `Scene`：world。物体を置く場所。
- `Camera`：view + projection。どこから、どう見るか。
- `Renderer`：draw。最終的にCanvasへ描く担当。

The official docs define a `Scene` as the place where renderable 3D objects and lights are arranged, and a `Mesh` as an object based on triangular polygon meshes.[Scene](https://threejs.org/docs/pages/Scene.html) / [Mesh](https://threejs.org/docs/pages/Mesh.html)

![Three.jsで立方体が画面に出るまで。Scene内のMeshをCameraが投影し、RendererがCanvasへ描く。](assets/threejs/cube-camera-pipeline.svg "Figure 1｜A 3D object is not placed directly onto the screen.")

Now the camera starts to look less ridiculous.

## 2. A 3D world cannot enter a 2D screen directly / 画面は平面

A browser screen is flat.

Three.js objects, meanwhile, live in X, Y, and Z.

だから必要になるのが**projection**。3Dの位置を2Dの画面座標へ変換する。

`PerspectiveCamera` uses perspective projection. Distant objects appear smaller, and the official docs describe it as the common projection that mimics the way the human eye sees.[PerspectiveCamera](https://threejs.org/docs/pages/PerspectiveCamera.html)

`OrthographicCamera`, on the other hand, keeps an object's rendered size constant even when its distance changes.製図、2D、UI、アイソメトリックっぽい表現で便利。[OrthographicCamera](https://threejs.org/docs/pages/OrthographicCamera.html)

### Live experiment / 同じ箱、カメラだけ変える

Press the camera button below. The cube geometry does not change at all.

ワイヤーフレーム切替ではmaterialの見せ方だけを変える。回転を止めれば、同じSceneを静止状態でも見られる。

<div data-threejs-lab="en-mix"><p>Loading the live Three.js experiment… 本文と図だけでも内容は追えます。</p></div>

With perspective projection, depth feels stronger. With orthographic projection, parallel relationships remain more visually stable.

**Same object. Different rule for seeing it.**

ここで最初の疑問がほどける。

The camera is not a photographer. It is a mathematical rule for turning 3D space into a 2D image.

## 3. The GPU does not really see a “cube” either / 箱すら見えていない

Switch to wireframe.

面が三角形に分かれている。

WebGL works with points, lines, and triangles, and Three.js `Mesh` objects are triangle-based.[Three.js Fundamentals](https://threejs.org/manual/en/fundamentals.html) / [Mesh](https://threejs.org/docs/pages/Mesh.html)

A cube has six faces. If each rectangular face is split into two triangles, the simplest box becomes twelve triangles.

上のライブ実験では、Three.js自身の`renderer.info.render`を読んで描画統計を表示している。つまり`TRIANGLES`や`DRAW CALLS`は、この記事が勝手に書いた数字ではなく、そのフレームのrenderer情報。[WebGLRenderer](https://threejs.org/docs/pages/WebGLRenderer.html)

So the translation looks like this:

Human: “I want a box.”

Three.js: “Geometry + Material = Mesh.”

GPU: “Triangles.”

この翻訳の階段がThree.jsの価値に近い。

## 4. The real center may be the Scene Graph / 絵より構造

The Three.js manual says its core is arguably the **scene graph**.[Scene Graph](https://threejs.org/manual/en/scenegraph.html)

A scene graph is a hierarchy of objects and local coordinate spaces.

車なら、車体の子にタイヤを置く。Move the car body, and the wheels come with it.太陽系なら、Sun → Earth → Moonという親子関係で持てる。

Without that structure, every movement tempts you to recalculate everything in world coordinates.

Scene Graph lets you say: “this wheel is here relative to the car.”

**Complex 3D becomes manageable not because math disappears, but because the math becomes local.**

ここ、派手さはないけどかなり本質的。

## 5. “Nothing is visible” is usually a missing role / 何も映らないの分類

Three.js beginners often hit the classic problem: no error, no picture.

役割分担で分類すると、原因を考えやすい。

### Camera problem / カメラ外

The object can exist and still be outside the camera's visible volume. `PerspectiveCamera` also has `near` and `far` clipping planes.[PerspectiveCamera](https://threejs.org/docs/pages/PerspectiveCamera.html)

### Lighting problem / 光がない

Some materials such as `MeshBasicMaterial` do not need lighting. Physically based materials usually need proper light or an environment to look as expected.

入門で`MeshNormalMaterial`が便利なのは、lightなしでも面の向きが色として見えるから。

### Model problem / モデルが巨大・極小・遠い

External 3D assets have their own scale and coordinate assumptions.

Three.js recommends glTF (`.gltf` / `.glb`) when possible for runtime delivery. It can carry meshes, materials, textures, animation, lights, cameras, and more.[Loading 3D Models](https://threejs.org/manual/en/loading-3d-models.html) / [GLTFLoader](https://threejs.org/docs/pages/GLTFLoader.html)

### Render-loop problem / 描きすぎ

Most animated examples render continuously. But a static 3D product viewer does not necessarily need constant frames.

The official “Rendering on Demand” guide points out that continuous rendering wastes device power when nothing changes.[Rendering on Demand](https://threejs.org/manual/en/rendering-on-demand.html)

「GPUを速くする」より先に、「描かなくていいフレームを描かない」が効く場合もある。

## 6. JavaScript GC is not the whole cleanup story / GPU側の後片づけ

This part felt unexpectedly physical.

In normal JavaScript, you often trust garbage collection once objects become unreachable.

Three.jsでは、それだけで終わらない資源がある。

Geometries, materials, and textures can allocate GPU-side resources. Removing a Mesh from the Scene does not automatically dispose of its geometry and material; the application should call `dispose()` when those resources are no longer needed.[How to dispose of Objects](https://threejs.org/manual/en/how-to-dispose-of-objects.html)

“Delete JavaScript object” and “free GPU resource” are not identical.

Three.js hides a lot of low-level work, but it cannot erase the existence of the hardware underneath.

抽象化の床板をめくると、GPUがいる。

## 7. Three.js in 2026 is no longer only a WebGL story / WebGPUへの移行期

As of September 6, 2026, the latest Three.js release is **r185**, published on July 1, 2026 according to the GitHub release list.[Three.js Releases](https://github.com/mrdoob/three.js/releases)

`WebGLRenderer` now targets WebGL 2. At the same time, Three.js is developing `WebGPURenderer` as the next-generation renderer.[WebGLRenderer](https://threejs.org/docs/pages/WebGLRenderer.html) / [WebGPURenderer](https://threejs.org/manual/en/webgpurenderer)

The funny part: `WebGPURenderer` is not WebGPU-only.

対応ブラウザーではWebGPUを使い、非対応環境ではWebGL 2 backendへfallbackできる。

Still, the official guide calls `WebGPURenderer` experimental today. `WebGLRenderer` remains maintained and is still recommended for pure WebGL 2 applications, while major new feature work is moving toward WebGPU.[WebGPURenderer guide](https://threejs.org/manual/en/webgpurenderer)

So a beginner does not need to panic and “start with WebGPU or be obsolete.”

まずScene、Camera、Mesh、Rendererの関係を理解する方が先。

That mental model survives renderer changes.

## 8. Three.js does not remove the complexity; it gives the complexity names / 面倒に名前を付ける

Before researching this, I thought of Three.js mainly as “a convenient library for doing 3D on the web.”

それは正しい。

But switching cameras, looking at triangle counts, and reading about scene graphs changed the picture slightly.

Three.js does not make the responsibilities disappear.

- Shape exists.
- Surface appearance exists.
- World position exists.
- Viewpoint exists.
- Projection exists.
- GPU work exists.
- Cleanup exists.

Three.js gives those responsibilities names: `Geometry`, `Material`, `Scene`, `Camera`, `Renderer`.

最初の疑問へ戻る。

**Why does one cube need a camera?**

Not because cubes are complicated.

Because a screen never contained three dimensions in the first place.

The cube forces you to notice something simple: **seeing a 3D world always means projecting it from somewhere.**

たかが回る箱だった。

It was carrying an entire model of “world + viewpoint + projection” on its back.

回る箱、思ったより重い。

---

## Sources / 参考資料

- [Three.js Fundamentals](https://threejs.org/manual/en/fundamentals.html)
- [Creating a scene](https://threejs.org/manual/en/creating-a-scene.html)
- [PerspectiveCamera](https://threejs.org/docs/pages/PerspectiveCamera.html)
- [OrthographicCamera](https://threejs.org/docs/pages/OrthographicCamera.html)
- [Scene Graph](https://threejs.org/manual/en/scenegraph.html)
- [WebGLRenderer](https://threejs.org/docs/pages/WebGLRenderer.html)
- [WebGPURenderer](https://threejs.org/manual/en/webgpurenderer)
- [Loading 3D Models](https://threejs.org/manual/en/loading-3d-models.html)
- [How to dispose of Objects](https://threejs.org/manual/en/how-to-dispose-of-objects.html)
- [Rendering on Demand](https://threejs.org/manual/en/rendering-on-demand.html)
- [Three.js GitHub Releases](https://github.com/mrdoob/three.js/releases)

Research date: September 6, 2026. API and renderer status can change, so implementation work should always check the current official docs and Migration Guide.
