---
id: threejs-shadow-map-light-camera
title: "ライトの中にカメラがいる。Three.jsで影を出すと、世界をもう一度描く"
subtitle: "Shadow Mapを壊して分かる、光・深度・描画コストの正体"
created: "2026-09-06"
updated: "2026-09-06"
type: "Essay"
status: "完成"
series: "ブラウザーに3D世界を作ると何が変なのか"
seriesOrder: 2
tags: ["Web開発", "JavaScript", "Three.js", "3D", "WebGL"]
keywords: ["Three.js", "Shadow Map", "LightShadow", "DirectionalLight", "PointLight", "SpotLight", "CameraHelper", "OrthographicCamera", "castShadow", "receiveShadow", "renderer.info", "WebGLRenderer", "WebGPURenderer"]
favorite: 4
grow: 4
abstract: "Three.jsで影を一つ足すだけなのに、なぜライト側にもCameraが必要なのか。Shadow Cameraの範囲をわざと狭めて影を消し、影を落とすライト数も切り替えながら、Shadow Mapが『光から見た深度』を使う仕組みと描画コストを追う。PointLightが6方向ぶんの影描画を必要とする理由や、影の解像度・bias・WebGPU移行期の現在地まで整理する。"
---

# ライトの中にカメラがいる。Three.jsで影を出すと、世界をもう一度描く

前回、Three.jsで立方体を一個出すだけなのに`Camera`が必要な理由を調べた。

[立方体1個に、なぜカメラが要るのか。Three.jsが「3D」の面倒を見ている話](#/essay/threejs-why-a-cube-needs-a-camera)

結論はわりと納得できた。

3Dの世界は、そのままでは2Dの画面に入らない。だからCameraが「どこから、どんな投影で見るか」を決める。

なるほど。

では影を付けよう。

ここでまた妙なものが出てくる。

**ライトの中にもCameraがいる。**

待ってほしい。

見る人のためにCameraが必要なのは分かった。なぜ照明まで世界を見る必要があるのか。

Three.jsの公式マニュアルを読むと、答えはさらに大げさだった。

**影を付けるために、ライトの視点からシーンをいったん描き直している。**

暗い形を床に足しているだけではなかった。

今回は影をきれいに作るのではなく、Shadow Mapをわざと壊して、この仕組みを確かめる。

## 1. 影は「黒い形」ではなく、「光から見えなかった場所」だった

Three.jsの公式マニュアルでは、標準的な影の方法としてShadow Mapが説明されている。

影を落とすライトごとに、`castShadow`が有効なオブジェクトを**ライトの視点から描画**し、その結果を使って最終画面の影を決める。[Shadows](https://threejs.org/manual/en/shadows.html)

`LightShadow`の公式ドキュメントも、内部の`camera`を「the light's view of the world」と説明している。さらにShadow Mapは、その内部Cameraで生成された深度情報を持つ。[LightShadow](https://threejs.org/docs/pages/LightShadow.html)

雑に言えばこうだ。

1. ライトから世界を見る。
2. ライトから各地点までの距離をShadow Mapに記録する。
3. 本番のCameraから画面を描く。
4. ある地点が、ライト側で記録された最前面より奥なら「途中に何かある」と判定する。
5. そこを影として扱う。

![Shadow Mapは、ライト側のCameraで深度を記録し、本番Cameraから描くときに比較する。](assets/threejs/shadow-map-two-views.svg "図1｜影を作るために、世界を別の視点から一度見る。")

つまり影は「床に黒いシールを貼る処理」というより、**ライトからそこが見えるかどうかの照合結果**に近い。

ライトが急に監視員っぽくなってきた。

## 2. DirectionalLightの中には、本当にOrthographicCameraがいる

Three.jsで影を落とせる代表的なライトは、`DirectionalLight`、`SpotLight`、`PointLight`の3種類だ。[Shadows](https://threejs.org/manual/en/shadows.html)

今回まず使うのは`DirectionalLight`。

太陽光のように平行な光を表すので、影用Cameraには`OrthographicCamera`が使われる。公式マニュアルでも、Shadow Cameraの`left`、`right`、`top`、`bottom`、`near`、`far`で影を扱う箱を定義すると説明されている。[Shadows](https://threejs.org/manual/en/shadows.html) / [OrthographicCamera](https://threejs.org/docs/pages/OrthographicCamera.html)

ここで、嫌な疑問が出る。

**影用Cameraの箱から物体がはみ出したら、光は当たっているのに影だけ消えるのではないか。**

やってみる。

## 3. 実験：影のCameraを狭くして、影だけ消す

下の実験には、床と3つの箱がある。

最初はShadow Cameraの範囲を広くしてあるので、3つとも影を落とす。

「影の範囲を狭める」を押すと、DirectionalLightのShadow Cameraを中央付近だけに縮める。`CameraHelper`も表示できるので、どこまでが影の計算対象なのかを目で確認できる。

<div data-threejs-shadow-lab="ja"><p>ライブ実験を読み込んでいます。表示できない場合も、本文と図だけで内容は追えます。</p></div>

ここで重要なのは、箱そのものを消していないことだ。

ライトの照明効果も残っている。

それでもShadow Cameraの範囲外では、期待した影が出なくなる。

**「光がある範囲」と「影を計算している範囲」は、同じではない。**

この違いを知らないと、「ライトを置いた。`castShadow = true`にした。なのに端の影だけ消える」という、かなり感じの悪いバグに見える。

実際には、世界が壊れたのではなく、ライトのCameraが見ていなかった。

## 4. なぜShadow Cameraを巨大にして全部見せないのか

では、Shadow Cameraの範囲をものすごく広くすればよいのではないか。

全部見ろ。

監視員なのだから責任を持ってほしい。

しかしここでShadow Mapが「画像」であることが効いてくる。

Three.js公式マニュアルでは、Shadow Mapの既定サイズは`512×512`で、Cameraが見る範囲をそのテクスチャへ割り当てると説明している。範囲を広げるほど、同じ解像度を広い面積に引き伸ばすことになり、影が粗くなる。[Shadows](https://threejs.org/manual/en/shadows.html) / [LightShadow](https://threejs.org/docs/pages/LightShadow.html)

逆に`mapSize`を大きくすれば精細になるが、計算時間とメモリー使用量は増える。

だから「全部見せれば安全」は無料ではない。

- Shadow Cameraを狭くする → 高密度だが、範囲外の影を失う。
- Shadow Cameraを広くする → 広範囲を覆えるが、同じmapSizeなら粗くなる。
- mapSizeを大きくする → 精細になるが、負荷が増える。

3Dの設定画面に妙に`near`、`far`、`mapSize`が多いのは、作者が几帳面だからではない。

限られた計算資源を、どこへ使うかを決めている。

## 5. 「影を一個足す」は、描画を一個足すより重い

ここで、もう一歩やりすぎる。

影を落とすライトを増やしてみる。

Three.jsの公式マニュアルはかなり直接的で、20個のオブジェクトと5個の影を落とすライトがある例では、各ライト側の描画5回と最終画面1回で、シーン全体を6回描くと説明している。[Shadows](https://threejs.org/manual/en/shadows.html)

ライブ実験の「影ライト1個 / 2個」を切り替えると、同じ3つの箱でも`renderer.info.render.calls`が変化する。

ただし、**DRAW CALLSは性能そのものではない。**

GPU時間、材質、Shadow Mapサイズ、端末、ブラウザーなどでも負荷は変わる。ここで見る数字は「影のために追加の描画仕事が発生している」ことを観察する手掛かりとして使う。

前回、立方体一個の裏に三角形がいた。

今回は、影一個の裏に**別視点からの描画**がいた。

Three.js、簡単にしてくれてはいる。

簡単にしてくれているからこそ、たまに床板をめくると人数が多い。

## 6. PointLightの影は、さらに6方向を見る

さらに嫌なライトがある。

`PointLight`だ。

裸電球のように、一点から全方向へ光を出す。

全方向に影を作るなら、一方向だけ見ても足りない。

Three.js公式マニュアルでは、PointLightの影は実質的に**立方体の6面方向を向いた6つのSpotLight的な影**として扱われ、シーンを6方向ぶん描く必要があると説明している。[Shadows](https://threejs.org/manual/en/shadows.html) / [PointLight](https://threejs.org/docs/pages/PointLight.html)

つまりPointLight一個で、影のためだけに6方向を見る。

最終画面の描画もある。

電球一個置いたつもりが、周囲に6人の見張りが立っている。

影を落とすライトを大量に置かず、影担当を絞る設計がよく使われる理由が、かなり物理的に見えてくる。

## 7. `castShadow`と`receiveShadow`が分かれている理由

Three.jsでは、Renderer側で`shadowMap.enabled = true`にするだけでは影は出ない。

ライトには`castShadow = true`、Meshには「影を落とすか」の`castShadow`と「影を受けるか」の`receiveShadow`がある。[Shadows](https://threejs.org/manual/en/shadows.html)

最初は少し面倒に見える。

でもShadow Mapの仕組みを知ったあとだと意味が変わる。

影を落とさない物体までShadow Mapのために描く必要はない。

影を受けない物体には、その照合処理も要らない。

つまりこれは単なるON/OFFではなく、**誰を追加の描画仕事へ参加させるかを選ぶ設定**でもある。

APIの細かさが、実装の都合から急に読めるようになる。

## 8. 影が汚いとき、世界ではなく比較がズレていることがある

Shadow Mapでは深度を比較するため、自己遮蔽の誤差で縞や斑点のようなartifactが出ることがある。

`LightShadow.bias`は、その深度比較へ小さな補正を入れる設定だ。公式ドキュメントも、非常に小さな調整がshadow artifactの軽減に役立つ場合があると説明している。[LightShadow](https://threejs.org/docs/pages/LightShadow.html)

ただし、biasを大きくすれば万能という話ではない。

影が物体から浮いたように見えるなど、別の不自然さを作る。

ここでも問題は「黒色をどう塗るか」ではない。

**光側の深度と、画面側で扱う地点の深度をどう比較するか**だ。

影を見る目が少し嫌な方向に育ってきた。

ゲーム画面で影がチラついていると、「あ、比較で揉めているのかな」と思うようになる。

## 9. 2026年のThree.jsでは、Rendererも移行期にある

この記事の実験は、前回と同じくThree.js r185の`WebGLRenderer`で動かしている。r185は2026年7月1日に公開された。[Three.js Releases](https://github.com/mrdoob/three.js/releases)

一方、Three.jsは`WebGPURenderer`を次世代Rendererとして開発している。WebGPUが使える環境ではWebGPUを利用し、使えない場合はWebGL 2へフォールバックできる。[WebGPURenderer](https://threejs.org/manual/en/webgpurenderer)

ただし公式ガイドは、`WebGPURenderer`自体をまだexperimentalとしつつ、純粋なWebGL 2用途では`WebGLRenderer`を引き続き推奨している。

`LightShadow`にはWebGPURenderer向けの`biasNode`などもあり、影の仕組み自体も新しいRenderer側で広がりつつある。[LightShadow](https://threejs.org/docs/pages/LightShadow.html)

「Three.jsの影」を一枚岩として覚えるより、**Shadow Mapという考え方と、Rendererごとの実装を分けて見る**ほうが長持ちする。

## 10. 最初の疑問へ戻る

なぜライトの中にCameraがいるのか。

最初は変だった。

Cameraは人が見るものだと思っていたからだ。

でもThree.jsのCameraは、もっと抽象的だった。

**「ある視点から、世界を投影して判断するための装置」**と考えると、ライトがCameraを持つ理由もつながる。

人間のCameraは、画面に何を見せるかを決める。

ライトのCameraは、光から何が見えるかを決める。

その二つの見え方を比較した結果として、影が生まれる。

前回は「画面に3Dは存在しない」と分かった。

今回はもう一つ増えた。

**影も、その場所に置かれている黒い物体ではない。複数の視点を比較した結果だ。**

これを知ると、影の設定値が急に違って見える。

`near`も`far`も`mapSize`も`castShadow`も、影を装飾するパラメーターではない。

どこまで見るか。誰を見るか。どれくらい細かく見るか。

全部、「見る範囲」の設計だった。

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
