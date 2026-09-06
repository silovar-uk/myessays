---
id: threejs-shadow-map-light-camera
title: "There Is a Camera Inside the Light. Three.jsで影を出すと、世界をもう一度描く"
subtitle: "Breaking a Shadow Map to understand light, depth, and rendering cost"
created: "2026-09-06"
updated: "2026-09-06"
type: "English Mix"
status: "完成"
tags: ["Web開発", "JavaScript", "Three.js", "3D", "WebGL"]
keywords: ["Three.js", "Shadow Map", "LightShadow", "DirectionalLight", "PointLight", "SpotLight", "CameraHelper", "OrthographicCamera", "castShadow", "receiveShadow", "renderer.info", "WebGLRenderer", "WebGPURenderer"]
favorite: 4
grow: 4
mode: "english-mix"
english_ratio: 0.45
mix_unit: "sentence"
abstract: "Why does a light need its own camera just to draw a shadow? Shadow Cameraの範囲をわざと狭めて影を消し、shadow-casting lightsの数も切り替えながら、Shadow Mapがlight-space depthを使う仕組みとrendering costを追う。PointLightの6-direction shadow renderingやmapSize、bias、WebGPU移行期まで整理する。"
---

# There Is a Camera Inside the Light. Three.jsで影を出すと、世界をもう一度描く

前回は、Three.jsでcubeを一個表示するだけなのに、なぜ`Camera`が必要なのかを調べた。

[立方体1個に、なぜカメラが要るのか。Three.jsが「3D」の面倒を見ている話](#/essay/threejs-why-a-cube-needs-a-camera)

The answer made sense: a 3D world cannot simply sit on a 2D screen. `Camera` decides how that world is projected.

Fine.

では、次にshadowを付けよう。

And then something strange appears again.

**There is a Camera inside the light.**

見る人のためにCameraが必要なのは分かった。But why does a light need to see the world?

Three.jsの公式マニュアルを読むと、答えはさらに大げさだった。

**To create a shadow, the scene is rendered again from the light's point of view.**

影は、床にdark shapeを足しているだけではない。

今回はShadow Mapをきれいに見せるのではなく、わざと壊して仕組みを確認する。

## 1. A shadow is not a black shape

Three.js uses shadow maps as its standard shadow technique in the WebGL shadow guide.

For every shadow-casting light, objects marked to cast shadows are rendered from the light's point of view. その結果を使って、最終画面でどこを影にするか決める。[Shadows](https://threejs.org/manual/en/shadows.html)

The official `LightShadow` docs call its internal camera **“the light's view of the world.”** Shadow Mapには、そのCameraから見たdepth informationが入る。[LightShadow](https://threejs.org/docs/pages/LightShadow.html)

Conceptually, the process is:

1. Render the world from the light.
2. Store the nearest depth for each shadow-map pixel.
3. Render the final scene from the viewer's camera.
4. Compare each point with the depth remembered by the light.
5. If something was closer to the light, that point is occluded — shadow.

![Shadow Mapは、ライト側のCameraで深度を記録し、本番Cameraから描くときに比較する。](assets/threejs/shadow-map-two-views.svg "図1｜A shadow comes from comparing two views of the world.")

So a shadow is closer to **a visibility test from the light** than a black sticker placed on the floor.

ライトが急に監視員っぽくなる。

## 2. DirectionalLight really has an OrthographicCamera for shadows

Three representative Three.js lights can cast shadows: `DirectionalLight`, `SpotLight`, and `PointLight`.[Shadows](https://threejs.org/manual/en/shadows.html)

今回はまず`DirectionalLight`を使う。

Because its rays are parallel, its shadow camera is an `OrthographicCamera`. `left`, `right`, `top`, `bottom`, `near`, and `far` define the box in which shadows are calculated.[Shadows](https://threejs.org/manual/en/shadows.html) / [OrthographicCamera](https://threejs.org/docs/pages/OrthographicCamera.html)

That produces a slightly nasty question.

**What if the object leaves the shadow camera box while the light is still shining on it?**

やってみる。

## 3. Experiment: make the shadow disappear, not the object

下の実験にはfloorと3つのboxesがある。

Initially, the DirectionalLight's shadow camera covers all three. 「影の範囲を狭める」を押すと、shadow frustumを中央付近だけに縮める。

You can also reveal a `CameraHelper` to see the shadow camera volume itself.

<div data-threejs-shadow-lab="en-mix"><p>Loading the live experiment… The article and static diagram still work if WebGL is unavailable.</p></div>

The boxes do not disappear. The light itself is still illuminating the scene.

でもShadow Cameraの外側では、期待した影がなくなる。

**The illuminated area and the shadow-calculation area are not the same thing.**

「ライトはあるのに端だけ影が消える」は、世界のバグに見える。But the world is fine. The light's camera simply was not looking there.

## 4. Why not make the shadow camera enormous?

Then just make the camera huge, right?

全部見ればいい。

Unfortunately, a shadow map is a texture with finite resolution.

Three.jsの公式マニュアルでは、default shadow map sizeは`512×512`。The camera's covered area is mapped into that fixed texture.[Shadows](https://threejs.org/manual/en/shadows.html) / [LightShadow](https://threejs.org/docs/pages/LightShadow.html)

A larger world squeezed into the same map means lower spatial detail. `mapSize`を上げれば細かくできるが、memoryとcomputation costも増える。

So the trade-off is structural:

- Smaller shadow camera → denser detail, smaller valid area.
- Larger shadow camera → wider coverage, lower detail at the same mapSize.
- Larger mapSize → better detail, more cost.

Those annoying settings are not decorative knobs. They are resource allocation decisions.

## 5. One more shadow light means another view of the world

ここでもう一歩、やりすぎる。

Turn on another shadow-casting light.

The Three.js manual gives a very direct example: with 20 objects and 5 shadow-casting lights, the scene is drawn five times for those lights and once more for the final view — six scene renders in total.[Shadows](https://threejs.org/manual/en/shadows.html)

ライブ実験では「影ライト1個 / 2個」を切り替え、`renderer.info.render.calls`を表示している。

**Draw calls are not a complete performance score.** GPU time depends on materials, map size, hardware, browser, and more. ここでは「shadow passが追加のrendering workを生む」ことを見る手掛かりとして扱う。

Last time, one cube hid a pile of triangles.

This time, one shadow hides another rendering pass.

Three.js makes 3D easier. でも床板をめくると、だいたい裏で誰かがもう一回描いている。

## 6. PointLight looks in six directions

And then there is `PointLight`.

一点からall directionsへ光を出す。One view is obviously not enough to know what blocks the light in every direction.

The official Three.js shadow guide describes a PointLight shadow as effectively **six SpotLight-like shadow views**, one for each face around the light. The scene must be rendered six times just for that light's shadow.[Shadows](https://threejs.org/manual/en/shadows.html) / [PointLight](https://threejs.org/docs/pages/PointLight.html)

電球を一個置いたつもりが、six lookouts appear around it.

This is why “just add more real-time shadow lights” stops being a harmless design decision surprisingly quickly.

## 7. `castShadow` and `receiveShadow` are workload decisions

Enabling `renderer.shadowMap` is not enough.

A light needs `castShadow = true`. Meshes separately decide whether they cast and/or receive shadows with `castShadow` and `receiveShadow`.[Shadows](https://threejs.org/manual/en/shadows.html)

最初は設定が多く見える。

After understanding shadow maps, the API reads differently.

An object that does not cast shadows does not need to participate in that shadow-map render. 影を受けない物体には、そのshadow lookupも不要になる。

So those booleans are also decisions about **who joins the extra rendering work**.

## 8. Shadow acne is a depth-comparison problem

Shadow maps compare depth values, and precision can create visible artifacts.

`LightShadow.bias` adds a small offset to the normalized depth comparison. The official docs note that very small adjustments can help reduce shadow artifacts.[LightShadow](https://threejs.org/docs/pages/LightShadow.html)

But too much bias can create another problem: shadows look detached from objects.

つまり「黒をうまく塗れない」のではない。

**Two depth measurements are disagreeing near the boundary.**

Once you see that, flickering or striped shadows start to look less like visual decoration failures and more like comparison problems.

## 9. Three.js in 2026: renderer transition matters

This live experiment uses Three.js r185 with `WebGLRenderer`, the same baseline as the previous article. r185 was released on July 1, 2026.[Three.js Releases](https://github.com/mrdoob/three.js/releases)

Three.js is also developing `WebGPURenderer` as its next-generation renderer. It can use WebGPU and fall back to a WebGL 2 backend.[WebGPURenderer](https://threejs.org/manual/en/webgpurenderer)

The guide still describes WebGPURenderer as experimental, while `WebGLRenderer` remains the recommended choice for pure WebGL 2 applications.

`LightShadow` also exposes WebGPURenderer-specific features such as `biasNode`.[LightShadow](https://threejs.org/docs/pages/LightShadow.html)

So it is better to learn the **shadow-map mental model** separately from one renderer's exact implementation details.

## 10. Back to the original question

Why is there a Camera inside the light?

At first it sounded absurd because “camera” meant a device for a viewer.

But Three.js Camera is more abstract: **a rule for viewing and projecting the world from a position.**

The viewer camera decides what appears on the screen.

The light's camera decides what is visible from the light.

A shadow emerges from comparing those views.

前回は「画面に3Dそのものが置かれているわけではない」と分かった。

This time: **a shadow is not a black object sitting in the world either. It is the result of comparing viewpoints.**

`near`, `far`, `mapSize`, `castShadow` — all of them now look like versions of the same question.

How far do we look? Who do we look at? How precisely do we look?

ライト、思ったより見ている。

---

## Sources

- [Three.js Manual — Shadows](https://threejs.org/manual/en/shadows.html)
- [Three.js Docs — LightShadow](https://threejs.org/docs/pages/LightShadow.html)
- [Three.js Docs — DirectionalLightShadow](https://threejs.org/docs/pages/DirectionalLightShadow.html)
- [Three.js Docs — DirectionalLight](https://threejs.org/docs/pages/DirectionalLight.html)
- [Three.js Docs — PointLight](https://threejs.org/docs/pages/PointLight.html)
- [Three.js Docs — SpotLight](https://threejs.org/docs/pages/SpotLight.html)
- [Three.js Docs — OrthographicCamera](https://threejs.org/docs/pages/OrthographicCamera.html)
- [Three.js Manual — WebGPURenderer](https://threejs.org/manual/en/webgpurenderer)
- [Three.js GitHub — Releases](https://github.com/mrdoob/three.js/releases)
