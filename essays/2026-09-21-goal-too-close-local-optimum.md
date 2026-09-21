---
id: goal-too-close-local-optimum
title: "ゴールは、近いほどいいわけではない"
subtitle: "早く達成しようとするほど、小さな山の頂上で満足してしまう"
created: "2026-09-21"
updated: "2026-09-21"
type: "Conceptual Paper"
status: "完成"
tags: ["目標設定", "学習", "探索", "キャリア", "組織学習", "思考法"]
keywords: ["goal setting", "proximal goals", "distal goals", "learning goals", "exploration", "exploitation", "local optimum", "myopia"]
grow: 5
abstract: "目標は必要だ。しかし、すぐ達成できる場所を最終ゴールにすると、探索の幅まで小さくなる。近い目標は進捗を生む一方、成果目標を強く置きすぎると注意や学習を狭めうる。目標設定研究、探索と活用、局所最適の比喩をつなぎ、「遠くを見る／近くを歩く」という二層の目標設計を考える。"
---

# ゴールは、近いほどいいわけではない
## 早く達成しようとするほど、小さな山の頂上で満足してしまう

<!-- level:4 role:claim -->
目標を持つことは大事だ。ただ最近、もう一つ同じくらい大事なことがある気がしている。**ゴールを、手近なところに置きすぎないこと。**

<!-- level:2 role:description -->
「今月中に終える」「今年中に形にする」「まず一個完成させる」。こういう目標は動き出すには強い。締切が生まれ、進捗も見えるし、達成したという感覚も得られる。何も決めずに遠くを眺めているより、ずっと前へ進みやすい。

<!-- level:3 role:analysis -->
でも、すぐゴールしようとすると、少し妙なことが起こる。人は「どうすればもっと遠くへ行けるか」より、「どうすればこのゴールを早く閉じられるか」を考え始める。目標が方向を示すものから、終了条件へ変わる。

<!-- level:5 role:implication -->
すると怖いのは、失敗することではない。**成功したまま、小さくまとまることだ。**

---

## 1. 「一番近い山を登れ」は、かなり賢そうで、かなり危ない

<!-- level:4 role:claim -->
この話を考えていて、人工知能の古典的な探索法である hill climbing を思い出した。名前の通り、現在地から見て「もっと高い隣」へひたすら移動する方法である。

<!-- level:1 role:evidence -->
UC Berkeley のAI教材では、hill-climbing は現在地より評価値の高い隣接状態へ移り続ける greedy な探索として説明されている。問題は、周囲より高い地点に着いた瞬間、そこが世界で一番高い場所でなくても止まってしまうことだ。これが local maximum、局所最大である。

<!-- level:2 role:description -->
山が一つしかなければ、それでいい。でも山がいくつもある地形なら、最初に近かった小山をきれいに登り切って、「頂上に着いた」と満足することがある。遠くにはもっと高い山があるのに、いったん下る必要があるため、現在地だけ見ている探索ではそちらへ行けない。

<!-- level:3 role:analysis -->
もちろん、人間の人生や仕事が hill-climbing algorithm と同じだという話ではない。ここでは比喩として使っている。ただ、この比喩には嫌なくらい心当たりがある。**毎回「すぐ成果が出る方」へ進むことは、毎回正しい一歩を選ぶことと同じではない。**

<!-- level:5 role:implication -->
近いゴールの危険は、低い目標を置くことだけではない。**近くで改善できるものしか、探索対象に残らなくなること**にある。

[UC Berkeley CS188 — Local Search](https://inst.eecs.berkeley.edu/~cs188/textbook/csp/local-search.html)

---

## 2. ただし、近い目標そのものは悪者ではない

<!-- level:4 role:claim -->
ここで話を単純にして、「だから短期目標は捨てよう」と言うと、たぶん間違える。目標設定研究は、そんなきれいな二択になっていない。

<!-- level:1 role:evidence -->
Locke と Latham は長年の研究を整理し、具体的で難度のある目標が行動や成果を強く方向づけることを、goal-setting theory の中心的知見としてまとめている。また Latham と Seijts の1999年の実験では、39人の若年成人が玩具を作る課題に取り組み、遠い目標だけを与えられた条件より、遠い目標に近い目標を組み合わせた条件の方が成果が高かった。近い目標はフィードバックや self-efficacy を通じて、適切な戦略へ注意を向けたと解釈されている。

<!-- level:3 role:analysis -->
つまり、近い目標は足場としてかなり優秀だ。遠い目標だけでは、今日何をすればいいのか分からない。近い目標があるから、現在地と次の一歩がつながる。

<!-- level:5 role:implication -->
問題は距離ではなく、**役割の混同**なのだ。近い目標を「次の足場」として使うのか、「ここまで来れば終わり」という最終地点として使うのか。見た目は似ているが、頭の使い方はかなり違う。

[Locke & Latham (2002) — Building a Practically Useful Theory of Goal Setting and Task Motivation](https://pubmed.ncbi.nlm.nih.gov/12237980/)  
[Latham & Seijts (1999) — The effects of proximal and distal goals on performance](https://onlinelibrary.wiley.com/doi/10.1002/%28SICI%291099-1379%28199907%2920%3A4%3C421%3A%3AAID-JOB896%3E3.0.CO%3B2-%23)

---

## 3. ゴールが近すぎると、「達成できること」が「考えるべきこと」に化ける

<!-- level:4 role:claim -->
目標には、行動を集中させる力がある。だからこそ、集中させる先を間違えると、その外側が見えなくなる。

<!-- level:1 role:evidence -->
Ordóñez らは2009年の論文 Goals Gone Wild で、目標設定の副作用として、非目標領域を無視する narrow focus、リスク選好の歪み、学習の阻害、内発的動機の低下などを整理した。これは「目標設定は危険だからやめるべきだ」という論文ではない。強い薬ほど、使い方を考える必要があるという警告に近い。

<!-- level:2 role:description -->
例えば「今月、記事を10本公開する」が最終ゴールなら、10本へ最短で近づく方法が合理的になる。難しいテーマを避ける。調査に三日かかる題材を後回しにする。途中で問いが変わるような寄り道を切る。一本の完成度を上げるより、本数を閉じる。

<!-- level:3 role:analysis -->
ここで怖いのは、本人が怠けているわけではないことだ。むしろ、目標に対して忠実である。達成可能性を高める工夫が、そのまま探索範囲を狭めている。

<!-- level:5 role:implication -->
だから「ゴールを手近に求めすぎると小さくまとまる」という感覚は、意志の弱さの話ではない。**成功条件を近くに置くほど、成功条件の外側を考える理由が消える**という設計の話である。

[Ordóñez et al. (2009) — Goals Gone Wild](https://business.columbia.edu/faculty/research/goals-gone-wild-systematic-side-effects-overprescribing-goal-setting)

---

## 4. 難しい仕事では、「成果を出せ」より「攻略法を見つけろ」が効くことがある

<!-- level:4 role:claim -->
とくに未知の要素が多い仕事では、早くゴールへ行こうとするほど、既知のやり方に戻りやすい。

<!-- level:1 role:evidence -->
Seijts と Latham は、知識や技能の獲得が必要な複雑課題では、performance / outcome goal が逆効果になる場合があり、learning goal の方が有効になりうると論じている。学習目標は、結果そのものではなく「有効な戦略や手順を発見すること」へ注意を向ける。

<!-- level:2 role:description -->
「3か月で売上を20%上げる」と言われると、すでに効くと分かっている手段を強く回したくなる。「3か月で売上が動く要因を三つ検証し、再現できる戦略を一つ見つける」なら、同じ三か月でも行動が変わる。失敗した実験も、情報として残る。

<!-- level:3 role:analysis -->
成果目標は、答えを知っている仕事では強い。学習目標は、答えをまだ知らない仕事で強い。ここを混ぜると、「未知を探索すべき場面」で「既知を速く回す」ことが起こる。

<!-- level:5 role:implication -->
近いゴールを置くなら、**完成の近さではなく、学習サイクルの近さ**を設計した方がいい場合がある。終点を近づけるのではなく、次の発見を近づける。

[Seijts & Latham (2005) — Learning versus performance goals: When should each be used?](https://journals.aom.org/doi/10.5465/AME.2005.15841964)

---

## 5. 「小さくまとまる」は、探索より活用が勝ち続ける状態でもある

<!-- level:4 role:claim -->
この問題は、個人の目標設定だけでなく、組織学習の古典的なテーマにもつながる。exploration と exploitation のバランスである。

<!-- level:1 role:evidence -->
James G. March は1991年、exploration を新しい可能性の探索、exploitation を既存の知識や能力の活用として整理した。彼のモデルでは、活用は短期的に成果を返しやすいため、適応を続けるほど活用が強化され、探索が不足する危険がある。Levinthal と March は後に、遠い時間・遠い場所・失敗を見落とす傾向を learning myopia と論じた。

<!-- level:2 role:description -->
既存のやり方を少し改善すると、数字はすぐ返ってくる。新しいやり方を試すと、最初は数字が落ちるかもしれないし、何も起こらないかもしれない。短い期間で評価され続けるなら、探索はいつも不利だ。

<!-- level:3 role:analysis -->
ここで「近いゴール」の正体が少し見えてくる。問題なのはカレンダー上の近さだけではない。**成果がすぐ返ってくるものだけを価値あるものとして扱う時間感覚**が、探索を削る。

<!-- level:5 role:implication -->
小さくまとまるとは、野心がない状態ではない。むしろ毎週ちゃんと改善し、毎月ちゃんと成果を出し、その積み重ねの結果として、**一度も別の山へ移らなかった状態**なのかもしれない。

[March (1991) — Exploration and Exploitation in Organizational Learning](https://pubsonline.informs.org/doi/abs/10.1287/orsc.2.1.71)  
[Levinthal & March (1993) — The Myopia of Learning](https://sms.onlinelibrary.wiley.com/doi/10.1002/smj.4250141009)

---

## 6. 思考実験：「全部7日以内に達成できる目標しか持てない」としたら

<!-- level:4 role:claim -->
ここで、少し極端にしてみる。これは研究結果ではなく、本稿の思考実験である。もし「7日以内に達成できない目標は禁止」という世界で生きるとしたら、何が起きるだろう。

<!-- level:2 role:description -->
一週間で達成判定できることが有利になる。メールを何通送った。資料を何枚作った。記事を何本出した。何人に会った。何キロ走った。どれも悪くない。むしろ行動管理として優秀だ。

<!-- level:2 role:description -->
一方で、判定に時間がかかるものは目標にしにくくなる。ある分野で独自の視点を持つ。長く付き合える人間関係を育てる。仕事の判断基準そのものを変える。誰もやっていないテーマを掘る。自分が何者になりたいかを更新する。これらは、一週間後に○か×をつけにくい。

<!-- level:3 role:analysis -->
すると人は、価値があるものを選ぶのではなく、**早く判定できるものを選ぶ**ようになる。ゴールの近さが、価値の定義を乗っ取る。

<!-- level:5 role:implication -->
たぶん、手近なゴールが怖いのはここだ。小さい目標しか持てなくなるのではない。**測定しやすい未来しか、想像しなくなる。**

---

## 7. だからといって、遠いゴールを巨大にすればいいわけでもない

<!-- level:4 role:claim -->
ここまで読むと、「では、でかい夢を掲げよう」で終わりそうになる。でも、それも雑である。遠いことと、無謀なことは別だ。

<!-- level:1 role:evidence -->
Sitkin らは stretch goals、つまり一見ほとんど達成不可能なほど高い目標について、その効果は組織の状況に左右されると論じている。彼らの理論では、最近の成功経験や余剰資源がある組織ほど stretch goal を活かしやすい一方、余裕がない組織ほど魅力を感じやすく、リスクを負いやすいという逆説がある。

<!-- level:3 role:analysis -->
つまり、「ゴールを遠く置け」は「現実を無視して数字を巨大化せよ」ではない。必要なのは、今日の延長だけでは決まらない方向を持つことだ。遠いゴールは、達成ノルマというより、探索空間を広げるための方角に近い。

<!-- level:5 role:implication -->
目標は高ければいいのではない。**現在のやり方だけで最短到達できないくらい、視野を広げる距離が必要**なのだと思う。

[Sitkin et al. (2011) — The Paradox of Stretch Goals](https://scholars.duke.edu/publication/798525)

---

## 8. 遠くを見る。近くを歩く。近いゴールは「終点」ではなく「足場」にする

<!-- level:4 role:claim -->
ここまでの研究をつなぐと、目標設計は一つの数字に全部背負わせない方がよさそうだ。遠い方向と、近い行動を分ける。

<!-- level:3 role:analysis -->
提案として、目標を次の四層に分ける。

1. **Direction / 方向**  
   すぐには達成判定しない。「何を大きく変えたいか」「どんな状態へ向かいたいか」を置く。探索空間を狭めないための遠景。

2. **Milestone / 足場**  
   数週間〜数か月で確認できる地点を置く。ただし、到着したら終わりではなく、次の判断材料を得る場所として扱う。

3. **Learning goal / 学習目標**  
   「何を達成するか」だけでなく、「何を分かるようにするか」「何を試すか」を置く。未知が多いほどこちらを厚くする。

4. **Anti-goal / 反対側の点検**  
   目標のために何を見なくなっているかを定期的に確認する。「この数字を追うことで、捨てている可能性は何か」と問う。

<!-- level:2 role:description -->
例えば「一年で文章力を上げる」を方向にする。今月は「4本書く」を足場にする。でも4本公開を最終評価にせず、「冒頭の型を3種類試す」「一次情報の使い方を比較する」を学習目標にする。そして月末に、「本数を優先したせいで避けた題材はなかったか」と確認する。

<!-- level:5 role:implication -->
これなら近い目標の推進力を使いながら、近い目標に未来全体を乗っ取られにくい。**遠いゴールは視野を守り、近いゴールは足を動かす。**

---

## 9. プロンプト化するなら、「達成しやすい目標」ではなく「探索を縮めない目標」を設計させる

<!-- level:4 role:claim -->
AIに目標を作らせると、SMARTのように具体的・測定可能・期限付きへ寄せやすい。実行には便利だが、それだけでは「測れるものだけが残る」危険がある。

<!-- level:3 role:analysis -->
再利用するなら、近い目標を作る前に遠い方向と探索余地を守らせる方がいい。

    あなたは目標を「早く達成するための管理表」ではなく、
    「方向を失わずに探索を続けるための設計」として扱ってください。

    入力されたテーマについて、次の順で整理してください。

    1. 最終的に何を変えたいのか、すぐには達成判定できない Direction を1つ置く。
    2. その Direction に向かう、2〜8週間程度の Milestone を2〜4個置く。
    3. 各 Milestone について、成果目標と学習目標を分ける。
    4. 成果目標だけを追った場合に起こりうる narrow focus を3つ挙げる。
    5. 「達成は遅くなるが、探索範囲を広げる行動」を最低1つ入れる。
    6. 目標達成のために捨ててしまいそうな選択肢を Anti-goal check として列挙する。
    7. 最後に、その Milestone が「終点」ではなく「次の判断材料」になっているか確認する。
    8. 未知が多い課題では、performance goal より learning goal を厚くする。

    禁止:
    - 測定可能だからという理由だけで指標を採用する
    - 近い数字を最終目的へ昇格させる
    - 遠い方向を、根拠なく巨大な stretch goal に置き換える
    - 失敗した探索を自動的に無価値と扱う

<!-- level:5 role:implication -->
このプロンプトの狙いは、目標を増やすことではない。**目標が視野を奪う瞬間を、目標設計の中で先回りして見つけること**にある。

---

## 10. ゴールは「早く終わる場所」ではなく、「遠くを見るための線」にする

<!-- level:4 role:claim -->
最初は、「すぐゴールしようとすると小さくまとまる」という、かなり感覚的な話だった。調べる前は、単に大きな夢を持とうという話になる気もしていた。

<!-- level:2 role:description -->
でも調べると、近い目標にはちゃんと価値があった。行動を始め、フィードバックを得て、自信をつくる。遠い目標と組み合わせれば、むしろ成果を支えることもある。一方で、強い成果目標は注意を狭め、未知の多い仕事では学習を邪魔することがある。組織学習でも、短期に成果が返る exploitation は exploration より強化されやすい。

<!-- level:3 role:analysis -->
だから、変えるべきなのは「近い目標を持つこと」ではなかった。**近い目標に、人生や仕事の最終判定までやらせること**だった。

<!-- level:5 role:implication -->
今はこう考えている。ゴールは必要だ。でも、すぐテープを切れる場所ばかり探さない方がいい。近くには足場を置き、遠くには方角を置く。ときどき、目の前の坂を登るのをやめて、別の山が見えていないか確認する。  
**目標は、早く終わるためにあるのではない。自分の探索を、遠くまで続けるためにある。**

---

## Research Note

### 事実として確認したこと

- goal-setting theory では、具体的で難度のある目標が多くの状況で行動と成果を方向づけることが長年研究されている。
- Latham & Seijts (1999) の実験では、distal goal のみより proximal + distal goals の条件で高い成果が観察された。
- Seijts & Latham (2005) は、知識・技能の獲得が中心となる複雑課題では、outcome / performance goal より learning goal が有効になりうると論じている。
- Ordóñez et al. (2009) は、過度な目標設定の副作用として narrow focus、学習阻害などを整理している。
- March (1991) は exploration と exploitation の資源配分問題を論じ、短期的適応が exploitation を過剰に強めうると論じた。
- Levinthal & March (1993) は、遠い時間・遠い場所・失敗を見落とす learning myopia を整理した。
- hill-climbing が local maximum に捕まる話は、最適化・探索アルゴリズムの性質であり、人間の目標設定を直接説明する心理学的証拠ではない。本稿では比喩として使用した。
- stretch goal は単純に「大きいほど良い」とはいえず、Sitkin et al. (2011) は状況依存性とリスクを理論的に論じている。

### 本稿での解釈・提案

- 「近い目標を最終ゴールにすると探索が縮む」という中心命題は、複数研究を接続した本稿の解釈であり、単一研究が直接証明した因果ではない。
- Direction / Milestone / Learning goal / Anti-goal の四層モデルは、本稿の実務提案である。
- 「全部7日以内に達成できる目標しか持てない」という節は思考実験であり、実証研究の結果ではない。

---

## Sources

- [Locke & Latham (2002) — Building a Practically Useful Theory of Goal Setting and Task Motivation](https://pubmed.ncbi.nlm.nih.gov/12237980/)
- [Latham & Seijts (1999) — The effects of proximal and distal goals on performance](https://onlinelibrary.wiley.com/doi/10.1002/%28SICI%291099-1379%28199907%2920%3A4%3C421%3A%3AAID-JOB896%3E3.0.CO%3B2-%23)
- [Seijts & Latham (2005) — Learning versus performance goals](https://journals.aom.org/doi/10.5465/AME.2005.15841964)
- [Ordóñez et al. (2009) — Goals Gone Wild](https://business.columbia.edu/faculty/research/goals-gone-wild-systematic-side-effects-overprescribing-goal-setting)
- [March (1991) — Exploration and Exploitation in Organizational Learning](https://pubsonline.informs.org/doi/abs/10.1287/orsc.2.1.71)
- [Levinthal & March (1993) — The Myopia of Learning](https://sms.onlinelibrary.wiley.com/doi/10.1002/smj.4250141009)
- [Sitkin et al. (2011) — The Paradox of Stretch Goals](https://scholars.duke.edu/publication/798525)
- [UC Berkeley CS188 — Local Search / Hill-Climbing](https://inst.eecs.berkeley.edu/~cs188/textbook/csp/local-search.html)
