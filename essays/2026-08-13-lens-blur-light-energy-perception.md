---
id: lens-blur-light-energy-perception
title: "ボケはなぜ「光の強さ」に見えるのか――レンズボケ、ガウシアンブラー、そして画面上の光エネルギー"
subtitle: "被写界深度は単なる背景処理ではない。有限なディスプレイで「眩しさ」を作る光学と知覚の設計"
created: "2026-08-13"
updated: "2026-08-13"
type: "Science Column"
status: "完成"
tags: ["光学", "映像", "CG", "VFX", "レンズボケ", "被写界深度", "HDR", "視覚知覚"]
keywords: ["lens blur", "Gaussian blur", "bokeh", "depth of field", "circle of confusion", "point spread function", "HDR", "scene-linear", "glare illusion", "self-luminosity"]
favorite: 5
grow: 5
abstract: "レンズボケは、なぜガウシアンブラーよりも「強い光」を感じさせることがあるのか。正規化されたGaussian blurも数学的には画面内の総和を保存しうるため、差を単純なエネルギー保存では説明できない。本稿は、有限な開口によるcircle of confusion、開口形状を写すボケ、HDR・scene-linear処理、グレア錯視と自己発光知覚をつなぎ、レンズボケを「光エネルギーの知覚的代理表現」として整理する。兵器表現、ゲーム、映像、広告、スポーツKVまで、実務で使える設計原則も提示する。"
---

# ボケはなぜ「光の強さ」に見えるのか――レンズボケ、ガウシアンブラー、そして画面上の光エネルギー
## 被写界深度は単なる背景処理ではない。有限なディスプレイで「眩しさ」を作る光学と知覚の設計

### 要旨

「レンズボケはガウシアンブラーと違って、光のエネルギーをモニタ上で表現できる数少ない手法のひとつだ。兵器の放つエネルギーがわかりやすくなり、緊張感を上げ、背景から分離するのに役立つ」

この見方は、映像表現の直感としてかなり鋭い。

ただし、科学的には一か所だけ言い換えた方がいい。

**レンズボケだけが光エネルギーを保存し、Gaussian blurは失う、というわけではない。** 正規化されたGaussian kernelも、理想的な線形画像処理では画素値の総和を保存できる。

それでも、レンズボケの方が「これは強い光だ」と感じさせやすい場面がある。

なぜか。

本稿の結論を先に言えば、レンズボケは光エネルギーそのものをモニタへ持ち込む技術ではない。むしろ、**現実のレンズで強い点光源が作る空間的な痕跡を再現し、限られた輝度しか出せないディスプレイ上で、光源の強さを知覚させる代理信号を作る技術**である。

鍵になるのは、次の四つだ。

1. 有限な開口を持つレンズは、ピントの外れた一点を「面」に広げる
2. その面はGaussianの釣鐘型ではなく、開口やレンズ特性を反映した形になる
3. 強いハイライトを広い面積へ展開すると、画面上に「光源らしさ」の手がかりが増える
4. 人間の視覚は、輝度の絶対値だけでなく、周囲の勾配やグレアから「発光している」と推定する

つまり、レンズボケの価値は「ぼかし」にあるのではない。

**光を、ただ白いピクセルとしてではなく、光学現象として見せられること**にある。

---

## 1. まず分けたい二つの「エネルギー」

この話を整理するには、「エネルギー」という言葉を二つに分ける必要がある。

一つ目は、物理量としての光である。

現実の光源は電磁放射としてエネルギーを運び、カメラではその一部がレンズを通ってセンサーに届く。scene-linearな画像表現では、原理的に画素値を受光量に比例させられる。OpenEXRはこの考え方を明確に採用しており、値が2倍なら、表現している光の量も2倍という関係を想定する。

しかし、普通のディスプレイは現実の太陽、爆発、アーク放電、溶融金属のような輝度をそのまま再現できない。

画面の白は、そこで頭打ちになる。

100倍明るい物体も、1000倍明るい物体も、最終的に同じ「最大白」に押し込まれれば、単純な画素値だけでは差が消える。

そこで必要になるのが、二つ目のエネルギーである。

**知覚されるエネルギー感**だ。

これは物理単位ではない。

「熱そう」「眩しそう」「近づいたら危なそう」「出力が高そう」という、画面を見た人が推定する強さである。

レンズボケ、bloom、glare、レンズフレア、色飽和、露出変化、周囲の照り返しは、この知覚的なエネルギー感を作るための手がかりになる。

本稿でいう「レンズボケが光のエネルギーを表現する」とは、厳密には、**表示装置が直接再現できない輝度差を、空間的な光学手掛かりへ符号化する**という意味である。

参考：OpenEXR “Scene-Linear Image Representation”  
https://openexr.com/en/latest/SceneLinear.html

参考：Blender Manual “Color Management”  
https://docs.blender.org/manual/en/latest/render/color_management.html

---

## 2. Gaussian blurは何をしているのか

Gaussian blurは、画像処理の代表的な平滑化フィルターである。

ある画素の値を、その周囲の画素との加重平均に置き換える。中心ほど重く、離れるほど指数関数的に重みが小さくなる。断面を描けば釣鐘型になる。

OpenCVの `getGaussianKernel()` は、Gaussian kernelの係数を、合計が1になるよう正規化する。

ここは重要である。

入力画像がscene-linearで、境界処理などを無視でき、kernelの重みの総和が1なら、一つの明るい点をぼかしても、理想的にはその値が周囲へ再配分されるだけである。

つまり、Gaussian blurも「総和」という意味では光量を保存しうる。

だから、

> Gaussian blurは光を消す。Lens blurは光を保存する。

という二分法は成立しない。

では何が違うのか。

Gaussian blurは、**光学系がその点をどう結像したかを問わない。**

どの画素も同じ釣鐘型で平均化するだけである。

写真として考えるなら、これは「ピントが外れた」というより、「画像全体の局所的な情報を滑らかにした」に近い。

だから便利だ。

ノイズ低減、マスクのフェザー、背景の弱化、UIのすりガラス表現など、Gaussian blurは極めて汎用性が高い。

しかし、**光源を光源らしく見せる目的では、情報を平均化しすぎることがある。**

参考：OpenCV “Image Filtering / GaussianBlur / getGaussianKernel”  
https://docs.opencv.org/5.x/d4/d86/group__imgproc__filter.html

参考：Adobe Photoshop “Filter effects reference”  
https://helpx.adobe.com/photoshop/using/filter-effects-reference.html

---

## 3. レンズボケは「一点を面にする」

現実のカメラがピンホールではなく、有限な大きさの開口を持つことが、被写界深度を生む。

ある距離の一点から出た光が、センサー面で一点へ収束すればピントが合う。

しかし、その点が合焦面より手前または奥にあると、光線はセンサー上の一点へ集まらず、有限の広がりを持つ。

この広がりを、幾何光学では **circle of confusion（錯乱円、CoC）** と呼ぶ。

NVIDIAのDepth of Field解説も、実レンズではピント面から外れた点が「pointではなくregion」に投影され、その大きさが開口や焦点距離、対象距離に依存すると説明している。

ここで起きていることは、単なる「境界をやわらかくする」ではない。

**一点だった光が、レンズの開口を通った結果として、センサー上の面積を持つ。**

点光源で考えるとわかりやすい。

遠くの街灯、車のヘッドライト、LED、火花、反射した太陽光。これらがピントの外へ行くと、丸や多角形の光斑になる。

この光斑が、日常語としての「玉ボケ」に近い。

しかも形は完全な円とは限らない。

絞り羽根が六角形なら六角形に近づき、円形絞りならより円形になる。SonyやNikonが「円形絞り」をボケ品質の特徴として説明するのはこのためである。

つまりレンズボケには、**開口という物理的な原因が形として残っている。**

Gaussian blurとの大きな違いはここにある。

参考：NVIDIA GPU Gems, “Depth of Field: A Survey of Techniques”  
https://developer.nvidia.com/gpugems/gpugems/part-iv-image-processing/chapter-23-depth-field-survey-techniques

参考：Sony “Alpha Lens Technology – Circular Aperture”  
https://electronics.sony.com/alpha-lens-technology

参考：Nikon “Bokeh for Beginners”  
https://www.nikonusa.com/learn-and-explore/c/tips-and-techniques/bokeh-for-beginners

---

## 4. 「Airy disk」と「ボケ」は同じではない

ここは光学の用語として混同しやすい。

理想的な円形開口を通った光は、波動光学では回折によって点像が完全な一点にはならず、中心の明るい円盤と周囲のリングからなる **Airy pattern** を作る。

一方、一般に映像制作でいう大きなレンズボケは、主に**焦点ずれによるdefocus PSF**であり、幾何光学的にはCoCとして扱われる。

両者はともに「点光源が点のまま写らない」現象だが、原因もスケールも同じではない。

現実のレンズではさらに、球面収差、コマ収差、非点収差、口径食、絞り形状、レンズ内部の反射などが混ざる。

だから、本当にリアルなボケを作ろうとすれば、単純な一枚の円形kernelより、画面位置や焦点距離によって変化するpoint spread functionを考える必要がある。

ZEISSが2026年に発表したCinCraft LensCoreが、単なるデジタルblurではなく、実レンズに基づくray-traced lens effectsを前面に出しているのも、この差が制作上の価値を持つからだ。

参考：ZEISS “Understanding Numerical Aperture & Image Resolution”  
https://www.zeiss.com/microscopy/en/resources/insights-hub/foundational-knowledge/understanding-numerical-aperture-image-resolution.html

参考：ZEISS “CinCraft LensCore”  
https://www.zeiss.com/photonics-and-optics/en/home/content/newsroom/news-overview/2026/cincraft-lenscore.html

---

## 5. なぜレンズボケは「強い光」に見えやすいのか

ここからが本題である。

同じ総画素値を再配分するだけなら、なぜLens blurの方が「エネルギーがある」と感じることがあるのか。

理由は一つではない。

### 5-1. 高輝度点が「面積」を獲得する

ディスプレイには最大輝度がある。

ある光源がすでに白飛びしているなら、その中心をさらに数値的に明るくしても、SDRの最終表示では白以上に白くならない。

しかし、その強い光を周囲の複数画素へ広げることはできる。

結果として、光源は「最高輝度の一点」から「高輝度を持つ領域」へ変わる。

これは物理的な放射エネルギーを増やしているわけではない。

だが視覚的には、**画面上で光が占有する面積を増やすことで、強さを別の次元へ逃がしている**。

輝度軸が飽和したら、面積軸へ情報を移す。

この見方をすると、ボケやbloomがなぜCGで強い光源に多用されるのかが理解しやすい。

### 5-2. 「レンズが反応した」という因果の痕跡が生まれる

強い光がただ白い物体として描かれているだけなら、それが白い塗装なのか発光体なのか、画像だけでは曖昧な場合がある。

しかし、その周囲にボケ、bloom、glare、ghostなどの光学反応が生じると、見る側は「これはカメラの光学系を反応させるほど強い光だ」と読む。

もちろん実際の映像では、強い光でなくてもポスト処理で作れる。

それでも視覚システムは、現実世界で学習してきた統計的な手掛かりを使って解釈する。

**光源そのものではなく、光源が周囲へ与えた“結果”を描くことで、原因の強さを推定させる。**

これは爆発の周囲を照らす光、ジェット噴射による地面の照り返し、雷光で一瞬暗部が持ち上がる現象と同じ設計思想である。

### 5-3. 人間は輝度勾配から「自己発光」を読む

この議論には視覚心理学からも面白い裏付けがある。

Wuらの2019年の研究では、電子ディスプレイ上で実際の光源のような自己発光感を作るために、中心の明るさだけでなく、その周囲の**luminance gradient（輝度勾配）**が重要であることが示された。

現実の光源よりはるかに低い最大輝度しか持たないLCDでも、適切な勾配を周囲へ置くと、中心領域が「発光している」ように知覚されやすくなる。

重要なのは、研究者たちが自己発光感を単純な局所コントラストや総輝度エネルギーだけでは説明できないと報告している点である。

つまり、人間は「何cd/m²あるか」だけを見て光源認定していない。

**光が周囲へどう分布しているかという形を読んでいる。**

Lens blurやglareは、この知覚系の性質と相性がいい。

参考：Wu et al. (2019), “Rendering a virtual light source to seem like a realistic light source in an electronic display”  
https://doi.org/10.1016/j.displa.2019.07.001

参考：Keil (2008), “Gradient representations and the perception of luminosity”  
https://doi.org/10.1016/j.visres.2007.11.012

---

## 6. 兵器表現で効く理由――「光源」ではなく「出力」を見せる

ここまでを、ビーム兵器、砲撃、推進器、爆発、エネルギーシールドのような表現へ戻してみる。

兵器の強さを伝えるとき、単に砲口を白くするだけでは弱い。

なぜなら、画面上の白には上限があるからだ。

そこで強い表現は、出力の大きさを複数の結果へ分散する。

- 発光核そのものが高輝度になる
- 周囲にbloomやglareが出る
- ピント外の部分が大きなbokehになる
- 近くの装甲、煙、地面が照らされる
- 露出や色が一瞬変わる
- 粒子、煙、熱揺らぎが反応する
- カメラ側にもフレアやゴーストが出る

ここでレンズボケが面白いのは、**エネルギー量を「光源のサイズ」に直接描き込まずに強く見せられること**である。

砲口そのものを巨大に描けば、兵器の設計が変わってしまう。

しかしピント外の光斑を大きくすれば、物体サイズを変えずに画面上の光の占有面積を増やせる。

さらに、前景や背景の点光源を大きなbokehへ変えると、合焦している兵器本体との分離も強まる。

ここで二つの効果が同時に起きる。

**一つはエネルギー感。もう一つは視線誘導。**

NVIDIAのDepth of Field解説も、被写界深度が写真や映像で見る人の注意を誘導し、奥行き感を強めるために使われると整理している。

したがって、兵器表現にLens blurを使う発想は、

> 強い光に見せる

だけではない。

> **強い光が存在する三次元空間の中で、どこを見るべきかを指定する**

という二重の機能を持っている。

---

## 7. ただし「レンズボケ」と「bloom」は役割が違う

ここは実用上かなり重要である。

強い光を表現したいからといって、何でもLens blurにすればいいわけではない。

Lens blurは本来、**焦点距離と被写体距離の関係**から生じる。

したがって、発射中の砲口そのものにピントが合っているなら、その発光核まで大きな玉ボケにするのは光学的には不自然である。

一方、bloomやglareは、ピントが合っている高輝度光源にも起こりうる。

カメラ内の散乱によるveiling glareは、強い光が画面全体のコントラストを下げることさえある。StanfordのTalvalaらは、カメラ内部の複数散乱としてveiling glareを測定し、HDR撮影のダイナミックレンジを制限する要因として扱っている。

だから、役割分担はこう考えるとよい。

- **Lens blur / bokeh**：距離、焦点、開口を感じさせる。ピント外の光を「面」にする
- **Bloom / glare**：高輝度が光学系や視覚へ与える広がりを感じさせる
- **Lens flare / ghost**：レンズ内部反射という「カメラがそこにいる」感覚を作る
- **Lighting / bounce**：光源が周囲の物体へ実際に影響したことを示す

強い兵器表現では、この四つを混ぜる方が説得力が高い。

参考：Talvala et al. (SIGGRAPH 2007), “Veiling Glare in High Dynamic Range Imaging”  
https://www.graphics.stanford.edu/papers/glare_removal/

---

## 8. 一番重要な実装条件――白飛びする前に処理する

ここまでの議論を制作へ落とすと、一つの原則が最重要になる。

**ぼかす前に、光の強さの情報を捨てない。**

8-bit JPEGのような表示済み画像で、明るい部分がすでに255へクリップされているとする。

本来10倍明るかった点も、100倍明るかった点も、同じ255である。

そのあとLens blurをかけても、元の強度差は復元できない。

「強い点ほど大きく強い光として広がる」表現を作りたいなら、HDRまたはscene-linearの段階でハイライト値を保持する必要がある。

OpenEXRのscene-linear表現では、数値と光量を比例関係として持てる。Blenderもレンダリングとコンポジットをscene-linearで行う方が物理的に正確だと説明している。

制作順としては、次の方が理にかなう。

1. scene-linear / HDRで発光体の強度を持つ
2. depthや実レンズ相当のCoCからdefocusを作る
3. 高輝度部分にbloom / glareを作る
4. 必要ならレンズフレアや色収差を加える
5. 最後にtone mapping / display transformでモニタの範囲へ落とす

この順序なら、100という値の発光体と10という値の発光体を、最終的に両方白へ圧縮しつつ、**圧縮される前の差を光の広がりとして残す**ことができる。

これが「モニタ上でエネルギーを表現する」という直感の、最も技術的に正確な形だろう。

---

## 9. PhotoshopやNukeが「ハイライト」を別扱いする理由

市販ソフトの設計を見ると、この問題意識がよくわかる。

PhotoshopのLens Blurには、Irisの形、半径、Blade Curvature、Rotationに加えて、**Specular Highlights**のBrightnessとThresholdがある。

つまり「どれくらいぼかすか」と「明るい部分をどれくらい強調するか」は別のパラメータとして扱われている。

Foundry NukeのZDefocusも、out-of-focus highlightsがfilter imageの形を取ることを明示しており、Gaussianからdiscへfilter shapeを変えられる。さらにbloom threshold / gainでハイライトを強める機能を持つ。

これは示唆的である。

**Lens blurだけでは、必ずしも“強い光”にはならない。**

光学的なボケ形状と、HDRハイライトの強度設計を組み合わせて初めて、エネルギー表現として効いてくる。

言い換えれば、Lens blurは「エネルギー増幅フィルター」ではない。

**エネルギーの情報を、画面上で読める形へ翻訳するための器**である。

参考：Adobe Photoshop “Create depth of field with lens blur”  
https://helpx.adobe.com/photoshop/desktop/effects-filters/blur-sharpen-filters/create-depth-of-field-with-lens-blur.html

参考：Foundry Nuke “Simulating Depth-of-Field Blurring”  
https://learn.foundry.com/nuke/content/comp_environment/filters/applying_blurs.html

---

## 10. 実用ルール――GaussianとLens blurをどう使い分けるか

かなり乱暴にまとめれば、二つは目的が違う。

### Gaussian blurが向いている場面

- 情報量を落としたい
- 背景を静かにしたい
- UIや文字の背面を整理したい
- マスク境界を滑らかにしたい
- 光学的な意味を持たせたくない
- 「何となく柔らかい」状態を安価に作りたい

Gaussian blurは、**注意を弱めるぼかし**として優秀である。

### Lens blur / bokehが向いている場面

- カメラの存在を感じさせたい
- 奥行きを強く感じさせたい
- 光源の存在感を残したい
- ハイライトに開口形状を与えたい
- 前景と背景を光学的に分離したい
- 「撮られた画」であることを感じさせたい

Lens blurは、**空間と光を説明するぼかし**として強い。

この違いは、制作判断としてかなり使える。

「背景を見せたくない」ならGaussianでもよい。

「背景は見せたくないが、そこに強い照明や火花や都市光が存在することは感じさせたい」ならLens blurの方が意味を持つ。

---

## 11. 兵器以外への応用

この考え方は、SF兵器だけに閉じない。

### スポーツのキービジュアル

ナイトゲームの照明、LED、スタジアムの客席光、フラッシュ、花火などを背景に置き、選手を合焦させる。

Gaussianで背景を均一に溶かすより、点光源をbokehとして残した方が、「夜の大空間」「照明の強度」「現場の熱量」を保持しながら主役を分離できる。

特に、背景を単なる模様ではなく**空間の証拠**として残したい場合に有効である。

### ライブ・音楽映像

ステージ照明の点光源をbokehへ変えると、照明設備そのものの数や配置を詳細に見せず、光量だけを感じさせられる。

ボーカルや演者へピントを置き、背景光を大きな光斑へ変えると、人物の輪郭の外側に「会場のエネルギー」を残せる。

### 商品広告

ガラス、金属、宝飾、車のようにspecular highlightが重要な商品では、ハイライトのボケ方が材質感と高級感に直結する。

ただし、商品そのものの輪郭をblurで誤魔化すのではなく、背景や反射光のPSFを設計する方が安全である。

### ゲームUI・演出

必殺技発動前だけ背景の点光源を急速にbokeh化し、発光核へbloomを足すと、画面全体の明るさを大きく変えずに「出力が上がった」感覚を作れる。

これは、最大輝度に余裕のないSDR環境でも使える。

---

## 12. 「緊張感」を上げるための設計として考える

兵器表現で興味深いのは、Lens blurが美しいから効くのではないことだ。

むしろ、**情報の非対称性を作れるから効く。**

ピントの合った兵器本体は形状を読める。

しかし周囲の光源は巨大なbokehになり、環境の詳細は失われる。

見る側は、状況全体を完全には把握できない一方で、「強い光が周囲に存在する」ことだけはわかる。

この状態は、視覚的な緊張感と相性がよい。

- 主役だけは明確
- 周囲の情報は不足
- 光学反応だけが過剰
- 奥行き方向の距離は強調される
- 何か大きな出力が発生していることは理解できる

つまり、緊張感を生むのは「ぼかしたから」ではない。

**情報を失わせながら、エネルギーの痕跡だけを残したから**である。

ここまで来ると、Lens blurは背景処理ではなく、ナラティブの制御手段に近い。

---

## 13. やりすぎると何が壊れるか

当然、Lens blurは万能ではない。

### 13-1. すべての光を丸ボケにすると、ただの「シネマ風」になる

光源の距離や焦点関係を無視して全画面へ均一なbokehを置くと、光学的な因果が消える。

効果は派手でも、「なぜそこがぼけているのか」が説明できない。

### 13-2. 高輝度情報のないLDR素材では、強度差を捏造することになる

これは悪いことではない。

VFXはしばしば意図的に捏造する。

ただし「物理的なエネルギーを復元した」のではなく、「知覚的に強く見えるよう再設計した」と理解した方がよい。

### 13-3. ボケだけでは周囲を照らさない

強い光源なのに、周辺の物体や煙に何も影響がなければ説得力が落ちる。

エネルギー表現は、発光体単体ではなく、**周囲への作用**まで含めて作る方が強い。

### 13-4. 被写界深度を強くしすぎると、空間情報そのものを壊す

スポーツ、記録映像、戦術を見せる映像などでは、背景の情報が意味を持つ。

「主役を分離する」ことと「状況を読めなくする」ことは紙一重である。

Lens blurは、見せたい情報の優先順位が決まっているときに最も機能する。

---

## 14. 制作向けの最小レシピ

実際に「エネルギーを感じるLens blur」を設計するなら、次の順番が扱いやすい。

1. **光源の強度を先に決める**  
   白色にするのではなく、scene-linear/HDR上で相対値を持たせる。

2. **焦点面を決める**  
   主役を何にするかを先に決め、CoCを距離から作る。

3. **bokeh kernelを選ぶ**  
   円、多角形、実レンズ由来のPSFなど。美しさより、画の意味に合わせる。

4. **ハイライトを別扱いする**  
   高輝度点が背景の中間調と同じように平均化されないよう、specular/emissiveを管理する。

5. **bloom / glareを別レイヤーで足す**  
   「ピント外れ」と「眩しさ」を分けて調整する。

6. **周辺環境への照明反応を入れる**  
   地面、煙、装甲、顔などへ光を返す。

7. **最後にtone mapする**  
   強度差を残したまま最終表示へ圧縮する。

このワークフローの肝は、Lens blurを最後の「味付け」にしないことだ。

**光源→光学系→表示装置→知覚**という順に考える。

そうすると、なぜそのボケが必要なのかを説明できる。

---

## 15. 結論――レンズボケは「光量」ではなく「光量の痕跡」を描く

冒頭の発言へ戻ろう。

> レンズボケはガウシアンブラーと違って光のエネルギーをモニタ上で表現できる。

科学的に最も精密に言い換えるなら、こうなる。

> **レンズボケは、有限なディスプレイでは直接表示できない大きな輝度差を、開口由来の光斑、面積、輝度勾配、奥行きといった空間的手掛かりへ変換し、「強い光がそこにある」と知覚させるための有力な手法である。**

Gaussian blurも、正規化されていれば値の総和を保存できる。

だから差は、単純なエネルギー保存則ではない。

差は、**何を保存するか**にある。

Gaussian blurは局所画像を滑らかにする。

Lens blurは、うまく使えば、

- 開口の存在
- 焦点距離
- 奥行き
- 点光源
- ハイライト
- カメラの光学反応

を同時に残す。

その結果、見る側はただ「明るい」と感じるのではなく、

**「この光は、周囲やカメラに作用するほど強い」**

と推定する。

兵器の緊張感が増すのも、背景から主役が分離するのも、この同じ仕組みの二つの側面である。

レンズボケの面白さは、光をぼかすことではない。

**画面には入りきらない光の強さを、光が残した痕跡として描けること**にある。

---

## 参考文献

OpenEXR, “Scene-Linear Image Representation”  
https://openexr.com/en/latest/SceneLinear.html

Blender Manual, “Color Management”  
https://docs.blender.org/manual/en/latest/render/color_management.html

OpenCV, “Image Filtering”  
https://docs.opencv.org/5.x/d4/d86/group__imgproc__filter.html

NVIDIA GPU Gems, “Depth of Field: A Survey of Techniques”  
https://developer.nvidia.com/gpugems/gpugems/part-iv-image-processing/chapter-23-depth-field-survey-techniques

NVIDIA GPU Gems 3, “Practical Post-Process Depth of Field”  
https://developer.nvidia.com/gpugems/gpugems3/part-iv-image-effects/chapter-28-practical-post-process-depth-field

Sony, “Alpha Lens Technology – Circular Aperture”  
https://electronics.sony.com/alpha-lens-technology

Nikon, “Bokeh for Beginners”  
https://www.nikonusa.com/learn-and-explore/c/tips-and-techniques/bokeh-for-beginners

ZEISS, “Understanding Numerical Aperture & Image Resolution”  
https://www.zeiss.com/microscopy/en/resources/insights-hub/foundational-knowledge/understanding-numerical-aperture-image-resolution.html

Talvala, E.-V., Adams, A., Horowitz, M., Levoy, M. (2007), “Veiling Glare in High Dynamic Range Imaging”  
https://www.graphics.stanford.edu/papers/glare_removal/

Wu, H.-N. et al. (2019), “Rendering a virtual light source to seem like a realistic light source in an electronic display: A critical band of luminance gradients for the perception of self-luminosity”  
https://doi.org/10.1016/j.displa.2019.07.001

Keil, M. S. (2008), “Gradient representations and the perception of luminosity”  
https://doi.org/10.1016/j.visres.2007.11.012

Adobe Photoshop, “Create depth of field with lens blur”  
https://helpx.adobe.com/photoshop/desktop/effects-filters/blur-sharpen-filters/create-depth-of-field-with-lens-blur.html

Foundry Nuke, “Simulating Depth-of-Field Blurring”  
https://learn.foundry.com/nuke/content/comp_environment/filters/applying_blurs.html

ZEISS, “CinCraft LensCore”  
https://www.zeiss.com/photonics-and-optics/en/home/content/newsroom/news-overview/2026/cincraft-lenscore.html
