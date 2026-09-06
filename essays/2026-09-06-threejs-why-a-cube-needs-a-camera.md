---
id: threejs-why-a-cube-needs-a-camera
title: "立方体1個に、なぜカメラが要るのか。Three.jsが『3D』の面倒を見ている話"
subtitle: "回る箱から、三角形・投影・Scene Graph・WebGPUまで"
created: "2026-09-06"
updated: "2026-09-06"
type: "Essay"
status: "完成"
series: "ブラウザーに3D世界を作ると何が変なのか"
seriesOrder: 1
tags: ["Web開発", "JavaScript", "Three.js", "3D", "WebGL"]
keywords: ["Three.js", "WebGL", "WebGPU", "Scene", "Camera", "Renderer", "Mesh", "BoxGeometry", "PerspectiveCamera", "OrthographicCamera", "Scene Graph", "renderer.info", "glTF"]
favorite: 4
grow: 4
abstract: "Three.jsで立方体を1個出すだけなのに、なぜSceneとCameraとRendererが必要なのか。実際に同じ立方体のカメラと表示方法を切り替え、GPUが数える三角形まで確認しながら、Three.jsが抽象化しているものを分解する。最後にWebGPU移行期の現在地と、初心者がハマりやすい『光・モデル・描画ループ・後片づけ』まで整理する。"
---

# 立方体1個に、なぜカメラが要るのか。Three.jsが「3D」の面倒を見ている話

Three.jsの入門ページには、だいたい立方体が出てくる。

立方体。初心者に優しそうだ。

ところがコードを見ると、箱を一個置く前後に`Scene`、`Camera`、`Renderer`が出てくる。

**立方体を見るだけなのに、カメラが要る。**

誰が撮影するんだ。

気になって公式ドキュメントを追うと、この妙な手順はThree.jsの面倒くささではなく、むしろThree.jsが何を肩代わりしているかを一番よく表していた。

Three.jsは「3Dの物体を簡単に出すライブラリ」と説明できる。ただ、少し解像度を上げると、もっと変な言い方になる。

**Three.jsは、三次元の世界を二次元の画面へ押し込むための“役割分担”を管理するライブラリだ。**

まずは立方体を一個、ちゃんと疑ってみる。

## 1. Three.jsは何を簡単にしているのか

公式マニュアルはThree.jsを、Webページ上の3Dコンテンツをできるだけ扱いやすくする3Dライブラリとして説明している。一方で、その下で長く使われてきたWebGLはかなり低レベルで、基本的には点・線・三角形を描く仕組みだ。Three.jsはその上で、シーン、光、影、材質、テクスチャ、3D計算などをまとめて扱う。[Three.js Fundamentals](https://threejs.org/manual/en/fundamentals.html)

つまり「立方体」という命令をGPUへ送っているわけではない。

人間側では、だいたいこう書く。

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

役者が多い。

でも、それぞれの役割はかなり素直だ。

- `Geometry`：形。頂点や面をどう持つか。
- `Material`：表面をどう見せるか。
- `Mesh`：形と材質を組み合わせた「物体」。
- `Scene`：物体を置く世界。
- `Camera`：その世界をどこから、どう投影して見るか。
- `Renderer`：最終的にブラウザーのCanvasへ描く担当。

公式ドキュメントでも、`Scene`は描画する3Dオブジェクトや光を置く場所、`Mesh`は三角形ポリゴンを基礎とするオブジェクトとして定義されている。[Scene](https://threejs.org/docs/pages/Scene.html) / [Mesh](https://threejs.org/docs/pages/Mesh.html)

![Three.jsで立方体が画面に出るまで。Scene内のMeshをCameraが投影し、RendererがCanvasへ描く。](assets/threejs/cube-camera-pipeline.svg "図1｜3Dの物体を、そのまま画面に置いているわけではない。")

こう見ると、カメラがいる理由が少し見えてくる。

## 2. 3Dの世界は、そのままでは画面に入らない

ブラウザーの画面は平面だ。

一方、Three.jsの世界では、物体はX・Y・Zの三方向に位置を持つ。

そこで必要になるのが**投影**だ。三次元の位置を、二次元の画面上の位置へ変換する。

Three.jsで最もよく使われる`PerspectiveCamera`は、遠い物ほど小さく見える透視投影を使う。公式ドキュメントは、人間の目に近い見え方を模倣する投影として説明している。[PerspectiveCamera](https://threejs.org/docs/pages/PerspectiveCamera.html)

一方、`OrthographicCamera`は平行投影で、物体が遠くなっても画面上の大きさが変わらない。2D表現やUIにも向く。[OrthographicCamera](https://threejs.org/docs/pages/OrthographicCamera.html)

ここで、同じ立方体のカメラだけを変えてみる。

### 実験：同じ箱なのに、カメラだけで世界の感じが変わる

下の「透視投影カメラ」を押すと平行投影に切り替わる。形状は一切変えていない。

「ワイヤーフレーム」にすると、表面の塗り方だけを変えられる。「回転中」を止めれば、静止画のようにもできる。

<div data-threejs-lab="ja"><p>ライブ実験を読み込んでいます。表示できない場合も、本文と図だけで内容は追えます。</p></div>

透視投影では、奥行き方向の辺が「遠ざかっていく」感じを持つ。平行投影では、その圧縮が弱くなり、製図やゲームのアイソメトリック表現に近い感触になる。

**物体は同じ。変わったのは“見る規則”だ。**

ここでようやく、最初の「誰が撮影するんだ」がほどける。

カメラは写真を撮る道具ではない。**3D世界を2Dへどう畳むかを決める計算の設定**だった。

## 3. さらに嫌なことを言うと、GPUには「立方体」すら見えていない

今度はワイヤーフレームにしてみる。

立方体の面が、三角形に分かれているのが見える。

WebGLの基本単位は点・線・三角形で、Three.jsの`Mesh`も三角形ポリゴンを前提にしている。[Three.js Fundamentals](https://threejs.org/manual/en/fundamentals.html) / [Mesh](https://threejs.org/docs/pages/Mesh.html)

立方体には面が6枚ある。四角形の1面を三角形2枚に分ければ、最小構成では6×2＝12枚の三角形になる。

上のライブ実験では、Three.js自身の`renderer.info.render`から描画統計を読んでいる。`TRIANGLES`や`DRAW CALLS`は飾りではなく、そのフレームでレンダラーが処理した情報だ。[WebGLRenderer](https://threejs.org/docs/pages/WebGLRenderer.html)

つまり私が「箱」と呼んでいるものは、途中からずっと箱ではない。

人間：箱を回したい。

Three.js：了解。形状と材質を持つMeshですね。

GPU：三角形ですね。

この翻訳の階段が、ライブラリの正体に近い。

## 4. Three.jsの中心は、実は「絵」よりScene Graphっぽい

もう一つ、公式マニュアルで面白い言い方がある。

**Three.jsの中核はScene Graphだ、と言ってもいい。**[Scene Graph](https://threejs.org/manual/en/scenegraph.html)

Scene Graphは、物体を親子関係で管理する仕組みだ。

例えば車なら、車体の子にタイヤを置く。車体を前へ動かせば、タイヤも一緒についてくる。太陽系なら、太陽の周りに地球、地球の周りに月をぶら下げる。

これが地味に強い。

もし全部を「世界全体の絶対座標」で考えるなら、車を動かすたびに4本のタイヤの位置も全部計算し直したくなる。Scene Graphでは「タイヤは車体から見てここ」と書ける。

**複雑な3Dは、数学をなくすのではなく、数学を“局所化”すると扱いやすくなる。**

Three.jsの便利さは、派手なシェーダーより先に、この整理能力にある。

## 5. 初心者が「何も映らない」に出会う理由も、役割分担で説明できる

Three.jsを触ると、かなりの確率で「コードは動いているのに何も見えない」が起きる。

理由を分類すると、だいたい役割のどこかが欠けている。

### カメラの外にいる

物体は存在していても、カメラが別方向を向いていたり、近すぎたり遠すぎたりすれば見えない。

`PerspectiveCamera`には`near`と`far`があり、その範囲の外は描画対象から外れる。[PerspectiveCamera](https://threejs.org/docs/pages/PerspectiveCamera.html)

### 光がない

`MeshBasicMaterial`のように光源を必要としない材質もあるが、物理ベースの材質などは光や環境がないと期待した見え方にならない。

入門で`MeshNormalMaterial`を使うと、ライトなしでも面の向きが色になって見えるので、「まず形を出す」には便利だ。

### モデルを読み込んだが巨大、極小、遠方にいる

外部の3Dモデルには座標系やスケールがある。Three.jsの公式ガイドは、Web向けの3Dモデル形式として可能ならglTF（`.gltf` / `.glb`）を推奨している。glTFはリアルタイム配信用に設計され、メッシュ、材質、テクスチャ、アニメーションなどを持てる。[Loading 3D Models](https://threejs.org/manual/en/loading-3d-models.html) / [GLTFLoader](https://threejs.org/docs/pages/GLTFLoader.html)

### ずっと描き続けている

回転アニメなら毎フレーム描画する必要がある。でも静止した3Dカタログまで60fps前後で描き続ける必要はない。

公式マニュアルも、変化がない画面を連続描画するのは端末の電力を無駄にすると説明し、必要なときだけ描く「Rendering on Demand」を紹介している。[Rendering on Demand](https://threejs.org/manual/en/rendering-on-demand.html)

3DというとGPU性能の話に目が行くが、「そもそも描かなくていいフレームを描かない」も立派な最適化だ。

## 6. JavaScriptなのに、捨てたつもりの物がGPU側に残る

ここも少し妙だった。

普通のJavaScriptなら、不要になったオブジェクトはガベージコレクションに任せる感覚が強い。

Three.jsではそれだけでは足りないことがある。

Geometry、Material、TextureなどはGPU側のバッファーやシェーダー、テクスチャと結びつくため、不要になったら`dispose()`を呼ぶ必要がある。シーンからMeshを`remove()`しただけでは、そのGeometryやMaterialまで自動で破棄されない。[How to dispose of Objects](https://threejs.org/manual/en/how-to-dispose-of-objects.html)

「JavaScriptのオブジェクトを消した」と「GPU資源を解放した」は、同じではない。

Three.jsは低レベルAPIを隠してくれるが、物理的な計算資源そのものを消してくれるわけではない。

便利な抽象化には、たまに床下収納の扉がある。

## 7. 2026年のThree.jsは、WebGLだけのライブラリでもなくなっている

調査時点の2026年9月6日、Three.jsの最新リリースは**r185**。GitHubのリリース一覧では2026年7月1日公開になっている。[Three.js Releases](https://github.com/mrdoob/three.js/releases)

長く中心だった`WebGLRenderer`は現在WebGL 2を使う。一方、Three.jsは`WebGPURenderer`を次世代のレンダラーとして育てている。[WebGLRenderer](https://threejs.org/docs/pages/WebGLRenderer.html) / [WebGPURenderer](https://threejs.org/manual/en/webgpurenderer)

面白いのは、`WebGPURenderer`という名前なのに**WebGPU専用ではない**ことだ。対応環境ではWebGPUを使い、対応していなければWebGL 2バックエンドへフォールバックできる。

ただし、公式は現時点の`WebGPURenderer`をまだexperimentalと明記している。`WebGLRenderer`も保守されていて、純粋なWebGL 2アプリには引き続き推奨される。一方で大きな新機能の中心はWebGPU側へ移っている。[WebGPURenderer guide](https://threejs.org/manual/en/webgpurenderer)

なので、2026年の初心者が「WebGPUを使わないと古いのでは」と焦る必要はない。

まずScene、Camera、Mesh、Rendererの関係を理解する。

その骨格は、レンダリング技術が変わっても残る。

## 8. Three.jsは「3Dを簡単にする」より、「3Dの面倒を名前付きにする」

調べる前、私はThree.jsを「Webで3Dをやるための便利ライブラリ」くらいに思っていた。

それは間違っていない。

でも、ライブ実験でカメラを切り替え、三角形数を見て、Scene Graphを追うと、少し見え方が変わった。

Three.jsがやっているのは、3Dの面倒を消すことではない。

- 形を持つ。
- 表面を決める。
- 世界に置く。
- 視点を決める。
- 3Dを2Dへ投影する。
- GPUへ渡す。
- 使い終わった資源を片づける。

本来ぜんぶ存在していた仕事に、`Geometry`、`Material`、`Scene`、`Camera`、`Renderer`という名前を付け、別々に触れるようにしている。

最初の疑問へ戻る。

**立方体1個に、なぜカメラが要るのか。**

立方体が面倒だからではない。

画面には最初から、三次元なんて存在しないからだ。

Three.jsの立方体は、「物を置けば見える」という当たり前を一度壊して、**見るとは投影することだ**と教えてくれる。

たかが回る箱だったのに、いつの間にか「世界は視点なしでは画面にならない」という話になった。

回る箱、思ったより背負っている。

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

調査・執筆日：2026年9月6日。バージョンやAPIの状態は今後変わる可能性があるため、実装時は公式ドキュメントとMigration Guideを確認する。
