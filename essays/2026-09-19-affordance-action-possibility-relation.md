---
id: affordance-action-possibility-relation
title: "「座れる」は椅子の性質ではない――アフォーダンスは人と環境の間にある"
subtitle: "同じ段差が椅子にも壁にもなる。GibsonからUI、スタジアム、スポーツ、ロボットまで"
created: "2026-09-19"
updated: "2026-09-19"
type: "Essay"
status: "完成"
tags: ["Affordance", "Ecological Psychology", "Design", "UX", "Accessibility", "Sports", "Robotics", "James J. Gibson", "Don Norman"]
keywords: ["affordance", "Gibson", "Norman", "signifier", "action possibility", "ecological psychology", "representative learning design", "robotics", "stadium UX"]
favorite: 5
grow: 5
abstract: "アフォーダンスを「押せそうな見た目」の同義語として扱わず、行為者と環境の関係として捉え直す。Gibsonの原義、Normanによるデザイン領域での整理、Warrenの階段研究、GaverのHCI、スポーツ、ロボティクスを横断し、最後に実務で使えるAffordance AuditとAgent-Swap Testへ落とし込む。"
---

# 「座れる」は椅子の性質ではない――アフォーダンスは人と環境の間にある

## 同じ段差が椅子にも壁にもなる。GibsonからUI、スタジアム、スポーツ、ロボットまで

同じ段差がある。

ある人は腰掛ける。ある子どもはよじ登る。車いすで進む人にとっては、そこが通行を止める境界になることがある。

段差、お前は何なんだ。

「座るための物」「登るための物」「邪魔な物」のどれか一つに決めると、すぐに破綻する。物体は同じでも、身体、技能、目的、周囲の状況が変われば、そこで可能な行為が変わるからだ。

この違和感を言葉にした概念が、affordanceである。James J. Gibsonは、環境が動物に何を「提供するか」を考えるためにこの語を導入し、環境と行為者の相補的な関係として扱った。

Source: https://doi.org/10.4324/9781315740218

ここで先に結論を置く。

> **アフォーダンスは、物の中に貼られた機能ラベルではない。「この行為者が、この環境で、何をできるか」という関係である。**

この一文を本気で受け取ると、UIのボタンだけでなく、建築、アクセシビリティ、スポーツ練習、イベント運営、ロボットまで同じ視点で見直せる。

## 1. FACT｜アフォーダンスは「物の特徴」ではなく「行為者との関係」だった

Gibsonの議論で重要なのは、affordanceを色、形、硬さのような単独の物性へ還元しなかったことだ。水平で硬く、十分に広い面は、ある動物には「支える」ことを提供する。適切な高さの面は、人間に「座る」ことを提供しうる。

同じ面でも、小さすぎれば座れない。高すぎれば登れない。濡れていれば滑る。行為者側の身体寸法や能力が変われば、環境側の意味も変わる。

Don Normanも後年、Gibsonのaffordanceを「特定の行為者と特定の環境の間で可能になる行為の関係」と整理し直している。Norman自身、デザイン分野へ持ち込んだ際に「perceived affordance」と呼ぶべきだったと振り返った。

Source: https://jnd.org/affordances-and-design/

つまり、設計対象を「ボタン」「椅子」「ゲート」と名詞で見るだけでは足りない。

**アフォーダンスで見るとは、名詞を動詞へ変換することだ。** 座れる、通れる、つかめる、蹴れる、押せる、戻れる。物の分類ではなく、行為の可能性から環境を読み直す。

## 2. EXPERIMENT｜階段は、脚の長さとセットで初めて「登れる」になる

この関係性は、きれいな比喩だけではない。Warrenは1984年、階段の蹴上げ高を脚の長さとの関係で変え、人が階段を「登れる／登れない」と判断する境界を調べた。

3つの実験で、階段の高さそのものではなく、身体との適合が重要だった。知覚された「登れる」境界は、生体力学的なモデルから予測される境界と対応した。

Source: https://pubmed.ncbi.nlm.nih.gov/6238127/

ここで面白いのは、被験者が定規を出して脚と階段を測ったわけではないことだ。私たちは普段、「蹴上げ32cmだから可能」と数値計算してから脚を上げない。それでも身体と環境の関係を、行為の可否としてかなり直接的に扱っている。

階段を見たときに知覚しているのは、単なる高さではなく「自分が登れる高さ」でもある。

するとデザインの問いが変わる。「この階段は何cmか」だけでなく、**誰の身体に対して、どんな行為を可能にしているか**が設計条件になる。

## 3. CORRECTION｜UIで「押せそう」を全部affordanceと呼ぶと、話が半分ずれる

デザイン領域では、affordanceがしばしば「押せそうな見た目」「操作を示すヒント」の意味で使われる。実務会話として通じることはあるが、概念を分解すると別の問題が混ざっている。

Normanは2008年、「signifiers, not affordances」と題した文章でこの混乱をかなり明確に整理した。affordanceは行為可能性そのもの、signifierはその可能性を人が発見するための手掛かりである。

Source: https://jnd.org/signifiers-not-affordances/

たとえば、画面の一領域にクリック処理が実装されているなら、技術的には「クリックできる」。しかし、枠もラベルもカーソル変化もなく、本文と同じ見た目なら、人はそこを操作対象として発見できない。

William GaverはHCIの文脈で、知覚できるaffordanceだけでなく、hidden affordanceやfalse affordanceを区別し、知覚と行為可能性のずれが誤操作を生むと論じた。

Source: https://doi.org/10.1145/108844.108856

ここで「できる」と「できると分かる」が分かれる。前者だけを整えても使われず、後者だけを整えると「押せそうなのに動かない」が起こる。

このサイトの別稿では、SignifierをForm / Language / Position / State / Conventionへ分解し、手掛かりを一つずつ消すCue Removal Testを扱った。

Related: https://silovar-uk.github.io/myessays/#/essay/design-literacy-signifier-cue-removal-test?lang=ja

今回のaffordanceは、その一段下にある。「どう見せるか」の前に、**そもそも何を可能にした設計なのか**を問う。

## 4. PRACTICAL MODEL｜実務では「可能」「発見」「実行」「結果」を分ける

学術用語を増やすだけでは制作現場で使いづらい。そこで以下は、本稿のための実務整理として4層に分ける。GibsonやNormanがこの4分類を定式化した、という意味ではない。

1. **POSSIBILITY** — その行為は本当に可能か
2. **DISCOVERABILITY** — 可能だと本人が気づけるか
3. **EXECUTABILITY** — その身体・端末・状況で実行しやすいか
4. **FEEDBACK** — 実行後、何が起きたか確認できるか

たとえば「チケット購入」ボタンなら、リンクが生きていることはPOSSIBILITY、押せる見た目やラベルはDISCOVERABILITY、十分なタップ領域やキーボード操作はEXECUTABILITY、完了画面や状態変化はFEEDBACKに近い。

W3CのWCAG 2.2がTarget SizeやFocus Visibleを別々の要件として扱うのも、「操作可能である」の一言では人間の実行条件を十分に扱えないことを示している。

Source: https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum

Source: https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html

「ボタンを大きくする」「色を濃くする」という修正は、この4層のどこを直しているのか。そこまで言語化すると、見た目の好みだったレビューが、行為の失敗原因を探すレビューへ変わる。

## 5. ACCESSIBILITY｜「平均的なユーザー」を一人置くと、affordanceを見失う

アフォーダンスが関係なら、「ユーザー」という単数形は危ない。

同じ自動ドアでも、歩行速度、身長、視覚、聴覚、手の自由度、補助具、認知負荷が違えば、行為の条件は変わる。さらに雨、逆光、混雑、騒音、手袋、荷物といった一時的な条件でも変わる。

これは「特別な人向けに別設計を追加する」という話だけではない。**行為者を入れ替えると、設計が暗黙に前提としていた身体や状況が見える**という話である。

ここでアフォーダンスは、アクセシビリティを「後から配慮する項目」ではなく、設計の前提条件を暴くテストとして使える。

物を変えていないのに、行為者を変えただけで「できること」が変わる。その事実は、障害が個人側だけにあるのではなく、環境との不適合として現れる場合があることも見せる。

## 6. SPORTS｜パスコースは「空いている場所」ではなく、瞬間的に生まれる行為可能性になる

サッカーへ持ち込むと、affordanceは急に生き物っぽくなる。

パスコースはピッチに白線で固定されているわけではない。味方と相手の位置、速度、身体の向き、ボール保持者の技術、残り時間が変わるたびに、「いま通せる」という可能性が生まれたり消えたりする。

2011年のPeppingらの研究では、静止したゴールへ蹴る条件と、味方へパスする条件を距離を変えて比較したところ、距離や社会的文脈に応じてキック技術、準備時間、高さなどが変化した。

Source: https://research.rug.nl/en/publications/affordances-shape-pass-kick-behavior-in-association-football-effe/

またRepresentative Learning Designの議論では、競技で必要な知覚と行為の結びつきを練習環境でも保つことが重視される。動かないコーンへ正確に蹴る能力と、相手が閉じてくる中で「今ここに通せる」を知覚して実行する能力は、同じではない。

Source: https://pubmed.ncbi.nlm.nih.gov/21451175/

ここから得られる実務的な示唆は、練習メニューを「何回成功したか」だけで評価しないことだ。

**本番で出会う行為可能性を、練習環境がちゃんと発生させているか。** そう問うと、コーンの置き方、人数、スペース、制限時間、守備者の有無が、単なる難易度調整ではなく情報設計になる。

## 7. ROBOTICS｜ロボットも「これはコップです」から「これはつかめます」へ進む

ロボティクスでaffordanceが使われる理由も同じである。物体の名前を当てるだけでは、行動は決まらない。

「コップ」と認識できても、取っ手をつかめるのか、押せるのか、注げるのか、そのロボットアームの形状と現在位置で実行可能なのかが分からなければ、次の行動へつながらない。

2021年のIJCAIのレビューは、affordanceをAIエージェントが知覚から行為へ橋をかける仕組みとして整理し、対象物・行為・効果の関係や、未知状況への一般化という観点から研究を俯瞰している。

Source: https://www.ijcai.org/proceedings/2021/590

ここでは「物体認識」から一段進み、**環境を“何があるか”ではなく“何ができるか”で表現する**ことが価値になる。

人間にとって当たり前すぎる「持てそう」「通れそう」「届きそう」を機械へ教えようとすると、affordanceの関係性が逆に見えやすくなる。

## 8. OVERKILL TEST｜スタジアムの入場ゲートを、5人の別人に使わせたつもりで壊す

ここからは筆者提案の実務テスト。名付けて**Agent-Swap Test**。

同じ入場ゲートを、そのまま5つの状況に置く。

1. スマートフォンを開いた状態で、両手が空いている常連
2. 初来場で、チケット画面の場所から探している人
3. 子どもと荷物を抱え、片手しか空いていない人
4. 車いすで移動し、同行者と一緒に通過したい人
5. 雨・逆光・混雑の中で、後ろに列が伸びて焦っている人

ゲートの機械は同じでも、発生する問題は変わる。QRコードは表示できるか。読取位置まで届くか。どちらを先に通すか分かるか。エラー後に戻れるか。スタッフへ助けを求める経路が見えるか。

重要なのは、このテストが「5人分のペルソナを丁寧に作ろう」という儀式ではないことだ。

**行為者と状況だけを意図的に交換し、設計がどの条件を固定値として扱っていたかを暴く。** それが目的である。

ここまで来ると、入場ゲートの設計対象は機械ではなくなる。チケット画面、列、サイン、照明、スタッフ配置、エラー回復まで含む「入場できる環境」全体が対象になる。

## 9. PROPOSAL｜Affordance Auditは「誰が・何を・どこで・どう知るか」を先に書く

企画、UI、イベント導線をレビューするとき、次の6問を先に置く。

1. **ACTOR** — 誰にとっての設計か
2. **ACTION** — 何を可能にしたいか
3. **ENVIRONMENT** — どんな状況で行うか
4. **POSSIBILITY** — 実際にその行為は成立するか
5. **SIGNIFIER** — 成立すると、どうやって気づくか
6. **RECOVERY** — 失敗したとき、別の行為へ移れるか

これは学術的な標準フレームではなく、本稿から導いた制作・運用向けの監査テンプレートである。

たとえば「ファミリー向けイベントを分かりやすくする」では抽象的すぎる。「ベビーカーを押し、片手が塞がった初来場者が、入場後3分以内にイベント場所を発見し、迷った場合もスタッフか案内へ戻れる」と書くと、初めて行為可能性として検証できる。

アフォーダンスを使う価値は、難しい言葉を会議へ持ち込むことではない。

**「良いデザインか？」を、「この人は、この状況で、この行為を起こせるか？」へ変換できること**にある。

## 10. LIMITATION｜何でもaffordanceと呼ぶと、逆に何も説明しなくなる

便利な概念には、便利すぎる危険がある。

HCIではaffordanceの意味が拡散してきたこと自体が研究対象になっている。McGrenereとHoは2000年、GibsonとNormanの用法を整理し、HCI文献で概念が多様に使われてきたことを指摘した。

Source: https://graphicsinterface.org/proceedings/gi2000/gi2000-24/

「この色はaffordance」「このコピーもaffordance」「この導線もaffordance」と全部を一語で呼べば、分析はむしろ粗くなる。

本稿では、行為可能性をaffordance、その発見の手掛かりをsignifier、実行のしやすさを操作条件、行為後の理解をfeedbackとして、できるだけ分けて扱った。

言葉を厳密にする目的は、学術警察になることではない。**失敗原因を別々に直せるようにするため**である。

## 11. DISCOVERY｜デザインは物を作るだけでなく、「できることの地形」を作っている

最初に見た段差へ戻る。

調べる前、段差は段差だった。高さ、幅、素材を持つ物体だった。

調べた後は少し違う。そこには「座れる」「登れる」「越えられない」「荷物を置ける」「立ち止まれる」といった複数の行為可能性が、行為者との関係によって重なっている。

UIも同じだ。スタジアムも同じだ。サッカーのピッチも、ロボットが見る机の上も同じだ。

設計者が直接つくっているのは、画面や床やボタンだけではない。

> **人が次に何をできるか、その地形をつくっている。**

だから、アフォーダンスという言葉を知ったあとに一番変わるべきなのは、ボタンの見方ではない。

**世界を名詞の集まりとして見るか、行為可能性の集まりとして見るか。**

段差を見て「段差」とだけ言わなくなったところから、この概念はようやく実用になる。

## 12. Sources

- James J. Gibson, *The Ecological Approach to Visual Perception*, “The Theory of Affordances”  
  https://doi.org/10.4324/9781315740218
- W. H. Warren Jr., “Perceiving affordances: visual guidance of stair climbing” (1984)  
  https://pubmed.ncbi.nlm.nih.gov/6238127/
- Don Norman, “Affordances and Design”  
  https://jnd.org/affordances-and-design/
- Don Norman, “Signifiers, not affordances”  
  https://jnd.org/signifiers-not-affordances/
- William W. Gaver, “Technology affordances” (CHI 1991)  
  https://doi.org/10.1145/108844.108856
- Joanna McGrenere & Wayne Ho, “Affordances: Clarifying and Evolving a Concept” (2000)  
  https://graphicsinterface.org/proceedings/gi2000/gi2000-24/
- Gert-Jan Pepping, Johan Heijmerikx & Harjo J. de Poel, “Affordances shape pass kick behavior in association football” (2011)  
  https://research.rug.nl/en/publications/affordances-shape-pass-kick-behavior-in-association-football-effe/
- Ross A. Pinder et al., “Representative learning design and functionality of research and practice in sport” (2011)  
  https://pubmed.ncbi.nlm.nih.gov/21451175/
- Paola Ardón et al., “Building Affordance Relations for Robotic Agents - A Review” (IJCAI 2021)  
  https://www.ijcai.org/proceedings/2021/590
- W3C, “Understanding SC 2.5.8: Target Size (Minimum)”  
  https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum
- W3C, “Understanding SC 2.4.7: Focus Visible”  
  https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html
