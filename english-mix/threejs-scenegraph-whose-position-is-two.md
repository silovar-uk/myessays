---
id: threejs-scenegraph-whose-position-is-two
title: "position.x = 2. But 2 relative to what? Three.jsのScene Graphは『小さな世界』を入れ子にする"
subtitle: "Local stays the same, world moves. Scene Graph / matrixを実験でほどく English Mix"
created: "2026-09-06"
updated: "2026-09-06"
type: "English Mix"
status: "完成"
mode: "english-mix"
english_ratio: 0.45
mix_unit: "sentence"
series: "ブラウザーに3D世界を作ると何が変なのか"
seriesOrder: 3
tags: ["Web開発", "JavaScript", "Three.js", "3D", "Scene Graph"]
keywords: ["Three.js", "Scene Graph", "Object3D", "local space", "world space", "position", "matrix", "matrixWorld", "getWorldPosition", "add", "attach"]
favorite: 4
grow: 4
abstract: "`child.position.x = 2`はworldの住所ではない。Parentのscale・rotation・reparentingを実際に変え、LOCALとWORLDの数字を並べて見ることで、Scene Graphをobjectsのgroupではなくnested coordinate spacesとして理解するEnglish Mix版。"
---

# position.x = 2. But 2 relative to what? Three.jsのScene Graphは「小さな世界」を入れ子にする

前回は、a light also had a camera.

[ライトの中にカメラがいる。Three.jsで影を出すと、世界をもう一度描く](#/essay/threejs-shadow-map-light-camera)

Viewer has a viewpoint. Light has a viewpoint.

So far, so good.

Then I looked at an innocent line of code.

```js
child.position.x = 2;
```

Easy. The child is at x = 2.

Except Three.js says `position` is the object's **local position**.

That adds one annoying question.

**Two relative to what?**

## 1. Scale the parent, and the distance changes too

The official Three.js Scene Graph manual has a wonderfully inconvenient example.

A sun mesh is scaled 5×. Earth is placed at `position.x = 10` and then made a child of the sun.

The Earth does not only become five times larger. Its distance from the sun becomes five times larger too.

Why? Because the parent's local space itself is scaled. Anything inside that space inherits the transformation.[Scene Graph](https://threejs.org/manual/en/scenegraph.html)

サイズだけ大きくしたかったのに、座標の物差しまで大きくなる。

Scene Graph is doing more than grouping objects.

**A parent defines the coordinate space in which its children live.**

### Live experiment: keep LOCAL fixed, move WORLD

The yellow box below is Child. Initially it belongs to Parent A, and its local `position.x` stays at 1.5.

Try scaling Parent A to 3×.

LOCAL X remains 1.50. WORLD X changes.

<div data-threejs-scenegraph-lab="en-mix"><p>Loading the Scene Graph experiment. The article and diagrams still work if WebGL is unavailable.</p></div>

The child is not lying.

`position.x = 1.5` is still true.

It simply means **1.5 from the parent's point of view**.

## 2. Think of a Scene Graph as nested spaces

We usually draw a Scene Graph like this.

```text
Scene
└ Parent
  └ Child
```

Correct, but incomplete.

After the experiment, this picture is more useful.

![World Space contains Parent Local Space, which contains Child Local Space.](assets/threejs/scenegraph-spaces.svg "Figure 1 | A Scene Graph can be read as nested coordinate spaces.")

A small world exists inside the world. Another small world exists inside that.

The official manual even uses empty `Object3D` nodes—objects with no geometry or material—because they can represent a local space without drawing anything.[Scene Graph](https://threejs.org/manual/en/scenegraph.html)

Nothing visible.

Still structurally important.

Very 3D.

## 3. `position` is closer to an instruction from the parent than a global address

Three.js defines `position`, `rotation`, and `scale` as local transforms.[Object3D](https://threejs.org/docs/pages/Object3D.html)

So this:

```js
child.position.set(1.5, 0.6, 0);
```

does not mean "1.5 units from the world's origin."

It means something closer to:

> From my parent's origin, go 1.5 along the parent's X axis and 0.6 along its Y axis.

Rotate the parent, and its X axis rotates.

Scale the parent, and the ruler changes.

Move the parent, and the child's world position moves with it.

**Same local numbers, different world result.**

## 4. Ask the world directly with `getWorldPosition()`

When you actually need the object's position in world space, Three.js provides `getWorldPosition()`.

```js
const world = new THREE.Vector3();
child.getWorldPosition(world);
```

It also provides `localToWorld()` and `worldToLocal()` for converting coordinates between spaces.[Object3D](https://threejs.org/docs/pages/Object3D.html)

The existence of these APIs tells us something important.

**Position is not one universal number. Coordinates belong to a space.**

## 5. Matrix is where those transforms get packed together

Now the scary word: matrix.

今回は行列計算を展開しない。

The useful mental model is enough.

Three.js uses matrices to encode translation, rotation and scale. Every `Object3D` has a local `matrix`; `matrixWorld` represents the transform after the hierarchy has been taken into account.[Matrix Transformations](https://threejs.org/manual/en/matrix-transformations.html) / [Object3D](https://threejs.org/docs/pages/Object3D.html)

![position, rotation and scale become a local matrix, then the hierarchy produces matrixWorld.](assets/threejs/matrix-local-world.svg "Figure 2 | Local transform enters the hierarchy and becomes a world transform.")

```text
position / rotation / scale
        ↓
      matrix
   relative to parent
        ↓
 parent hierarchy
        ↓
    matrixWorld
```

By default `matrixAutoUpdate` is true, so Three.js normally recomputes the local matrix for you when transform properties change.[Object3D](https://threejs.org/docs/pages/Object3D.html)

Convenient enough that you can forget matrices exist.

Until `position.x` looks wrong.

## 6. Change the parent and the child teleports

Let's overdo the experiment.

Move Child from Parent A to Parent B.

```js
parentB.add(child);
```

`add()` makes the object a child of the new parent, removing it from a previous parent if necessary.[Object3D](https://threejs.org/docs/pages/Object3D.html)

Its local transform values remain the values now interpreted inside Parent B's local space.

So the world result can jump.

Press **Reparent with add()** in the live experiment.

Parent changed.

Local stayed.

World moved.

## 7. `attach()` protects the world instead

Three.js also has this:

```js
parentB.attach(child);
```

`attach()` reparents the object while maintaining its world transform.[Object3D](https://threejs.org/docs/pages/Object3D.html)

This time the visible world position stays nearly unchanged, while the local transform is recalculated for the new parent.

So the contrast is clean.

- `add()` → keep the local transform; world may change.
- `attach()` → keep the world transform; local changes.

**Which space are you trying to preserve?**

That is the actual question.

There is one important constraint: official docs say `attach()` does not support scene graphs containing non-uniformly-scaled nodes. The live experiment therefore uses uniform scale on all axes.[Object3D](https://threejs.org/docs/pages/Object3D.html)

## 8. Helpers reveal the little worlds

Toggle the axes and grids in the demo.

`AxesHelper` visualizes local X/Y/Z axes, and the Three.js Scene Graph manual also uses `GridHelper` to expose local spaces.[Scene Graph](https://threejs.org/manual/en/scenegraph.html)

Rotate Parent A and its axes rotate too.

The child is still obeying its local X direction.

At this point a Scene Graph stops looking like an object list.

It starts looking like **worlds nested inside worlds, each with its own origin, orientation and scale**.

## 9. The first three articles were secretly about the same thing

Article 1: Camera.

Where does a 3D point appear **from the viewer's space**?

Article 2: Shadow Map.

Is a point visible **from the light's space**?

Article 3: Scene Graph.

Where is an object **in its parent's local space, and where does that become in world space**?

Different APIs. Same recurring idea.

**In 3D, a value is incomplete until you know the space it belongs to.**

Back to the innocent line.

```js
child.position.x = 2;
```

Before this article: x = 2.

After this article:

**Two relative to what?**

That question is small, but it changes how Three.js code reads.

And it sets up the next problem nicely. `GLTFLoader` often gives you `gltf.scene`, a Group containing a hierarchy of nodes and meshes.[GLTFLoader](https://threejs.org/docs/pages/GLTFLoader.html)

You load "one model" and get a small forest of Object3Ds.

次は、**Why does one 3D model contain so many little worlds?** を疑う。

---

## Sources / 参考資料

- [Scene Graph](https://threejs.org/manual/en/scenegraph.html)
- [Object3D](https://threejs.org/docs/pages/Object3D.html)
- [Matrix Transformations](https://threejs.org/manual/en/matrix-transformations.html)
- [How to update Things](https://threejs.org/manual/en/how-to-update-things.html)
- [Matrix4](https://threejs.org/docs/pages/Matrix4.html)
- [GLTFLoader](https://threejs.org/docs/pages/GLTFLoader.html)
- [Loading a .GLTF File](https://threejs.org/manual/en/load-gltf.html)
- [Three.js Releases](https://github.com/mrdoob/three.js/releases)

Researched and implemented on 2026-09-06. The live experiment pins Three.js r185.
