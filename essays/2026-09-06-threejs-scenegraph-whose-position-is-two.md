---
id: threejs-scenegraph-whose-position-is-two
title: "position.x = 2。で、誰から見て2？ Three.jsのScene Graphは『小さな世界』を入れ子にする"
subtitle: "親を3倍にしたら距離まで3倍になる。local / world / matrixを壊して確かめる"
created: "2026-09-06"
updated: "2026-09-06"
type: "Essay"
status: "完成"
series: "ブラウザーに3D世界を作ると何が変なのか"
seriesOrder: 3
tags: ["Web開発", "JavaScript", "Three.js", "3D", "Scene Graph"]
keywords: ["Three.js", "Scene Graph", "Object3D", "local space", "world space", "position", "matrix", "matrixWorld", "getWorldPosition", "localToWorld", "worldToLocal", "add", "attach", "AxesHelper", "GridHelper"]
favorite: 4
grow: 4
abstract: "Three.jsのchild.position.xを2にした。なのに親を動かしたり拡大したりすると、子のworld positionは別の数字になる。親を3倍にすると子との距離まで3倍になる実験と、add() / attach()で親を付け替える実験を通して、Scene Graphを『物体のグループ』ではなく『local spaceの入れ子』として捉え直す。"
---

# position.x = 2。で、誰から見て2？ Three.jsのScene Graphは「小さな世界」を入れ子にする

前回、Three.jsのライトの中にCameraがいることを知った。

[ライトの中にカメラがいる。Three.jsで影を出すと、世界をもう一度描く](#/essay/threejs-shadow-map-light-camera)

見る人には見る人の視点がある。光には光の視点がある。

だいぶ「3Dでは、誰から見るかが大事なんだな」と思えてきた。

では、今度は物体そのものを見てみる。

```js
child.position.x = 2;
```

これは分かりやすい。

**xが2の場所にいる。**

……本当に？

Three.jsの公式ドキュメントには、`Object3D.position`についてかなり短く、かなり重要な説明がある。

**`position`はlocal positionである。**

つまり、次の質問が必要になる。

**誰から見て2？**

今回はこの一行を、少し疑ってみる。

## 1. 親を3倍にしただけなのに、子との距離まで3倍になった

Three.js公式のScene Graph解説には、妙な例がある。

太陽を表すMeshを5倍に拡大し、その子に地球を置く。地球の`position.x`は10。

すると地球は5倍に大きくなるだけではなく、太陽からの距離まで5倍になる。

公式の説明は明快で、親のlocal space自体が5倍になっているからだ。[Scene Graph](https://threejs.org/manual/en/scenegraph.html)

サイズを変えたかっただけなのに、住所の縮尺まで変わった。

少し迷惑である。

でも、ここにScene Graphの本体がある。

親子関係は「まとめて動かすグループ」だけではない。

**親は、子が使う座標系そのものを作る。**

そこで同じことを、もっと小さな実験でやってみる。

### 実験：`position.x`を変えずに、world positionだけ変える

下の実験では、黄色い箱がChild。最初はParent Aの子で、`child.position.x = 1.5`に固定してある。

Parent Aを3倍にしてみてほしい。

ChildのLOCAL Xは1.50のままなのに、WORLD Xが変わる。

<div data-threejs-scenegraph-lab="ja"><p>Scene Graph実験を読み込んでいます。表示できない場合も本文と図で内容は追えます。</p></div>

Childは嘘をついていない。

`position.x = 1.5`はずっと正しい。

ただし、それは**Parent Aから見て1.5**という意味だった。

## 2. Scene Graphは「物体の木」より「座標空間の木」と考えると分かりやすい

Scene Graphは普通、親子関係の木として説明される。

```text
Scene
└ Parent
  └ Child
```

これは正しい。

ただ、今回の実験を見た後なら、少し違う図のほうが頭に残る。

![World Spaceの中にParent Local Spaceがあり、その中にChild Local Spaceがある。](assets/threejs/scenegraph-spaces.svg "図1｜Scene Graphはlocal spaceの入れ子として見ると分かりやすい。")

Sceneの中にParentの小さな世界がある。

Parentの世界の中にChildのさらに小さな世界がある。

Three.js公式のScene Graph解説でも、GeometryやMaterialを持たず何も描画しない`Object3D`を使って階層を作り、それを「local spaceを表す」ノードとして扱っている。[Scene Graph](https://threejs.org/manual/en/scenegraph.html)

何も描かないのに重要。

3Dでは、見えないものが妙に偉い。

## 3. `position`は住所ではなく「親からの行き方」だった

`Object3D`の公式Docsでは、`position`はlocal position、`rotation`もlocal rotation、`scale`もlocal scaleと定義されている。[Object3D](https://threejs.org/docs/pages/Object3D.html)

だからChildの

```js
child.position.set(1.5, 0.6, 0);
```

は、Worldの原点から見た住所ではない。

「親の原点から、親のX方向へ1.5、Y方向へ0.6進んだところ」と読むほうが近い。

親が回れば、親にとってのX方向も回る。

親が3倍になれば、親の1メートルが世界側では3メートル相当になる。

親が移動すれば、子の世界での位置もまとめて移動する。

**子の数値が同じでも、親という座標系が変われば結果は変わる。**

これがlocalとworldの差だった。

## 4. 「本当はどこにいる？」を聞くための`getWorldPosition()`

では、ChildがWorld全体ではどこにいるか知りたいときはどうするのか。

Three.jsには`getWorldPosition()`がある。

```js
const world = new THREE.Vector3();
child.getWorldPosition(world);
```

公式Docsでは、これはObject3Dのworld spaceにおける位置を返すメソッドとして定義されている。[Object3D](https://threejs.org/docs/pages/Object3D.html)

同様に、local spaceの座標をworld spaceへ変換する`localToWorld()`、逆方向の`worldToLocal()`もある。

名前がそのまますぎる。

だが、こういうAPIが必要だという事実自体が重要だ。

**「位置」は一種類ではない。変換して行き来するものだ。**

## 5. その変換をまとめて持っているのが`matrix`

ここでMatrixが出てくる。

急に数学っぽくなる。

逃げたくなる。

今回は掛け算を展開しない。

必要なのは役割だけだ。

Three.js公式のMatrix Transformationsは、3D変換のtranslation（position）、rotation、scaleをmatrixへ符号化すると説明している。すべての`Object3D`はlocal transformを持つ`matrix`を持つ。[Matrix Transformations](https://threejs.org/manual/en/matrix-transformations.html)

さらに`matrixWorld`は、階層を反映したworld spaceの変換を表す。[Object3D](https://threejs.org/docs/pages/Object3D.html)

![position・rotation・scaleからlocal matrixを作り、親階層を反映してmatrixWorldになる流れ。](assets/threejs/matrix-local-world.svg "図2｜matrixはlocal、matrixWorldは階層を通過した結果。")

ざっくり言えば、Childの変換はこう進む。

```text
position / rotation / scale
        ↓
      matrix
   （親から見た変換）
        ↓
親のworld transformと組み合わさる
        ↓
    matrixWorld
   （世界から見た変換）
```

Three.jsでは`matrixAutoUpdate`が標準で`true`なので、通常は`position`や`rotation`や`scale`を変えるとlocal matrixを自動更新してくれる。world matrixも通常は階層から更新される。[Object3D](https://threejs.org/docs/pages/Object3D.html) / [How to update Things](https://threejs.org/manual/en/how-to-update-things.html)

便利だ。

便利すぎて、普段はMatrixの存在を忘れられる。

そして忘れたころに「positionは1.5なのに、なぜここにいる？」が来る。

## 6. 親を替えたら、子が瞬間移動した

ここでもう一歩やりすぎる。

ChildをParent AからParent Bへ移す。

Three.jsの`add()`は、Object3Dを新しい親のchildとして追加する。すでに別の親がいれば、現在の親からは外れる。[Object3D](https://threejs.org/docs/pages/Object3D.html)

```js
parentB.add(child);
```

この操作ではChildのlocalな`position`、`rotation`、`scale`はそのままなので、新しいParent Bを基準に同じlocal transformが解釈される。

結果、world側では場所が変わり得る。

先ほどのライブ実験で「`add()`で親を替える」を押すと、箱が飛ぶのはそのためだ。

親を替えただけなのに引っ越した。

親、強い。

## 7. では「場所は変えずに親だけ替える」はできるのか

できる。

`attach()`がある。

```js
parentB.attach(child);
```

公式Docsは、`attach()`を「world transformを維持しながら、新しい親のchildにする」メソッドとして説明している。[Object3D](https://threejs.org/docs/pages/Object3D.html)

つまり、見た目の位置を保つために、新しい親から見たlocal transformのほうを調整する。

ライブ実験で`attach()`を使うと、PARENT表示はAからBへ変わるのにWORLDの位置はほぼそのまま残る。一方でLOCALの数字が変化する。

さっきと逆だ。

- `add()`：localをそのまま使うのでworldが変わり得る。
- `attach()`：worldを維持するためlocalを変える。

**localとworld、どちらを守るか。**

親の付け替えですら、結局この話になる。

ただし注意点がある。Three.js公式Docsは、`attach()`がnon-uniform scaleを含むScene Graphには対応しないと明記している。今回のライブ実験はその制約を避け、親のscaleをX・Y・Zで同じ値にしている。[Object3D](https://threejs.org/docs/pages/Object3D.html)

## 8. AxesHelperを置くと「世界の中に世界」が見える

ライブ実験の「座標軸を隠す／表示する」を切り替えてみる。

Three.jsの`AxesHelper`はlocal X・Y・Z軸を可視化する。公式Scene Graph解説でも各ノードへAxesHelperを付け、さらにGridHelperでlocal spaceを見えるようにしている。[Scene Graph](https://threejs.org/manual/en/scenegraph.html)

親を回すと、その親の軸も回る。

Childは、その回った軸の中で自分の`position.x`を守っている。

ここまで来ると、Scene Graphが「オブジェクト一覧」にはあまり見えなくなってくる。

**世界の中に、向きと縮尺の違う小さな世界を置き、その中へまた世界を置く仕組み。**

そのほうが実態に近い。

## 9. 第1回からずっと、同じ話をしていた

第1回ではCameraを扱った。

3Dの点が「画面のどこに見えるか」はCameraから見た結果だった。

第2回ではShadow Cameraを扱った。

物体が「光から見えるか」はLight側の視点から見た結果だった。

第3回ではScene Graphを扱った。

物体が「どこにいるか」すら、まず親から見たlocal spaceの中で定義されていた。

毎回違うAPIを調べているつもりだった。

でも、少しずつ同じことを言われている。

**3Dでは、値だけを見ても足りない。どの空間から見た値なのかが必要になる。**

最初の一行に戻る。

```js
child.position.x = 2;
```

以前なら、x=2にいる、と読んだ。

今は一言増える。

**誰から見て2？**

この一言が入るだけで、Three.jsのコードが少し違って見える。

そして次に3Dモデルを読み込んだとき、もっと面倒なことが起きる。

`scene.add(gltf.scene)`と一行書いたのに、その中には大量の`Object3D`やMeshが木のように入っていることがある。[GLTFLoader](https://threejs.org/docs/pages/GLTFLoader.html) / [Loading a .GLTF File](https://threejs.org/manual/en/load-gltf.html)

**「3Dモデルを1個読み込んだ」のに、なぜ中から世界が何個も出てくるのか。**

次はそこを疑いたい。

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

調査・実装日：2026年9月6日。ライブ実験はThree.js r185を固定して使用している。Three.jsのAPIは更新されるため、実装時は公式DocsとMigration Guideを確認する。
