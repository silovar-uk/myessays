---
id: real-options-value-of-waiting
title: "リアルオプションは「まだ決めない」に値段をつける"
subtitle: "なぜ正味現在価値がプラスでも、投資を待つ方が合理的になりうるのか"
created: "2026-09-27"
updated: "2026-09-27"
type: "リサーチエッセイ"
status: "完成"
tags: ["ファイナンス", "投資判断", "リアルオプション", "NPV", "戦略", "不確実性"]
keywords: ["real options", "NPV", "DCF", "option to defer", "irreversibility", "uncertainty", "managerial flexibility", "Stewart Myers"]
grow: 5
abstract: "投資案件の正味現在価値がプラスなら、すぐ実行する。教科書的には自然な判断だが、投資が後戻りしにくく、待つことで情報が増え、その後に実行・撤退・拡張を選べるなら話は変わる。リアルオプションは、この「未来に選べる権利」を投資価値へ組み込む考え方である。古典研究、簡単な思考実験、競争による限界、評価モデルの難しさまでたどり、実務で何を設計すべきかを整理する。"
---

# リアルオプションは「まだ決めない」に値段をつける
## なぜ正味現在価値がプラスでも、投資を待つ方が合理的になりうるのか

<!-- level:4 role:claim -->
投資案件の価値が110、投資費用が100なら、正味現在価値（Net Present Value：NPV）はプラス10である。だから投資する。ずいぶん素直な話だ。ところがリアルオプションの世界へ入ると、**プラス10でも、まだ投資しない方が合理的なことがある。**

<!-- level:2 role:description -->
理由は、投資判断が一度きりの採点ではなく、時間の中で更新される選択だからである。今日100を払えば、明日「やはり市場が悪かった」と分かっても100は戻らない。反対に、今日まだ払わず、明日まで権利を保てるなら、良い情報が出たときだけ投資し、悪い情報が出たときは見送れる。

<!-- level:1 role:evidence -->
ロバート・マクドナルド（Robert L. McDonald）とダニエル・シーゲル（Daniel Siegel）は、後戻りしにくい投資の最適時期を分析した古典研究で、単純な「便益が費用を上回ったら投資」という基準は、待つことのオプション価値を正しく扱えないと示した。彼らの数値例では、条件によっては便益が投資費用の約2倍になるまで待つことさえ最適になりうる。

<!-- level:3 role:analysis -->
妙なのは、ここで「何もしない」が無価値ではないことである。待っている間に市場、価格、技術、規制、需要について情報が増え、しかも投資する権利を失わないなら、未実行の状態そのものが選択肢を残している。迷っているのではない。**損失を確定させず、上振れだけを取りに行ける構造を保っている。**

<!-- level:5 role:implication -->
リアルオプションが値段をつけようとするのは、設備や事業そのものだけではない。**未来に判断をやり直せる余地**である。本稿では、その余地がいつ本当に価値を持ち、いつ単なる先延ばしになるのかを調べる。

[McDonald & Siegel — The Value of Waiting to Invest, NBER](https://www.nber.org/papers/w1019)

---

## 1. リアルオプションは「実物資産に埋め込まれた、将来の選択権」である

<!-- level:4 role:claim -->
リアルオプション（real options）を最短で言えば、**実物資産や事業投資に埋め込まれた「将来、行動してもよいし、しなくてもよい権利」**である。金融市場のオプションと同じく、義務ではなく権利であるところが肝心になる。

<!-- level:2 role:description -->
金融の買う権利であるコール・オプション（call option）は、一定の条件で資産を買う権利を持つが、値下がりして不利なら行使しなくてよい。リアルオプションでは、株式の代わりに工場、鉱山、研究開発、新市場参入、土地開発、情報システムなどが対象になる。行使価格に相当するものは、将来その案件を本格実行するための投資額である。

<!-- level:1 role:evidence -->
スチュワート・マイヤーズ（Stewart C. Myers）は1977年の論文で、企業の成長機会を実物資産に対する選択権として捉え、「リアルオプション」という言葉を導入したとされる。興味深いのは、その論文の題名が「リアルオプション入門」ではなく、企業の借入行動を扱った「Determinants of Corporate Borrowing」だったことだ。概念は、投資評価の独立した流派としてではなく、企業価値の中に潜む将来の投資機会を説明する途中から現れた。

<!-- level:3 role:analysis -->
つまりリアルオプションは、特殊な計算式の名前から始まるものではない。「この案件を今やるか」だけでなく、「小さく始めるか」「待つか」「途中でやめるか」「成功したら広げるか」という分岐を、価値の一部として扱う見方である。

<!-- level:5 role:implication -->
そのため最初に探すべきは数式ではなく、**将来のどの時点で、何を選び直せるのか**である。選び直せない案件には、どれだけ不確実性があっても、リアルオプションの余地は小さい。

[Myers — Determinants of Corporate Borrowing](https://doi.org/10.1016/0304-405X(77)90015-0)  
[MIT Press — Lenos Trigeorgis, Real Options](https://mitpress.mit.edu/9780262201025/real-options/)

---

## 2. 正味現在価値が見落としやすいのは、不確実性ではなく「途中で判断を変える能力」である

<!-- level:4 role:claim -->
リアルオプションは、正味現在価値を否定する理論ではない。むしろ、通常の割引現在価値法（Discounted Cash Flow：DCF）が固定計画として扱いやすい部分と、現実の経営が途中で変更する部分を分けようとする。

<!-- level:2 role:description -->
正味現在価値は、将来のキャッシュフローを現在価値へ割り引き、初期投資を差し引く。計画どおりに進める案件を比べるには非常に強い。ところが、実際の経営者は市場が崩れれば撤退し、需要が伸びれば増産し、試験結果が悪ければ研究を止める。将来の行動が最初から一本に固定されていない。

<!-- level:1 role:evidence -->
ティモシー・リュールマン（Timothy A. Luehrman）はハーバード・ビジネス・レビューで、企業戦略は一本の予測キャッシュフローというより、時間とともに行使される一連の選択権に近いと論じた。一方、ブリアリー、マイヤーズ、アレンらの整理では、リアルオプション評価はDCFの代替ではなく補完として使うのが通常であり、基礎となる案件価値の推定にはDCFが出発点になる。

<!-- level:3 role:analysis -->
ここで見落としやすいのは、不確実性そのものではない。DCFでも悲観・標準・楽観のシナリオは置ける。差が出るのは、**どのシナリオが起きたかを見た後で、会社が行動を変えられるか**である。悪い世界でも同じ支出を続ける前提と、悪ければ止める前提では、同じ確率分布でも価値が変わる。

<!-- level:5 role:implication -->
だからリアルオプションの問いは「未来をもっと正確に予測できるか」ではない。**未来が外れても、損失を小さくし、良い展開だけを増幅できる設計になっているか**である。

[Luehrman — Strategy as a Portfolio of Real Options](https://hbr.org/1998/09/strategy-as-a-portfolio-of-real-options)  
[Brealey, Myers, Allen on Real Options](https://doi.org/10.1111/J.1745-6622.2008.00204.X)

---

## 3. 同じ期待値でも、振れ幅が大きい方が「選べる権利」は高くなることがある

<!-- level:4 role:claim -->
「不確実性が大きいほど価値が高い」と聞くと、かなり怪しい。普通の投資なら、先が読めないほど怖いはずである。ここはリアルオプションで最も誤解されやすいので、極端に単純な思考実験で壊してみる。

<!-- level:2 role:description -->
今日、100を払えば価値110の案件を始められるとする。今すぐ投資すれば、差し引きはプラス10。ところが1年待って市場を観察でき、1年後にも100で投資できる権利を持っているとする。割引率、待つ間に失う利益、税、資金調達などはいったん無視する。以下は価格計算ではなく、構造を見るための模型である。

<!-- level:1 role:evidence -->
まず未来が120と100に半々で分かれるなら、投資後の差額は20か0なので、選択後の期待差額は10になる。次に平均値を同じ110のまま、未来が150と70に半々で分かれるとする。150なら投資して50を取り、70なら投資しない。期待差額は25になる。平均の事業価値は同じでも、下側では行使しないため損失が切られ、上側だけが残る。

<!-- level:3 role:analysis -->
この非対称性がオプションの形である。単純化すれば、将来の案件価値をV、投資費用をIとしたとき、行使時点の価値は max(V－I, 0) の形になる。ゼロより下は「やらない」で切れる一方、上側は伸びる。そのため、他の条件が同じなら、収益側の変動性が大きいほど選択権の価値が高まりうる。

<!-- level:5 role:implication -->
ただし、ここから「不確実な案件ほど価値が高い」と一般化すると即座に事故る。価値が増えるのは、**悪い結果を避けられ、良い結果を取れる権利が残っている不確実性**である。費用が跳ねる不確実性、競争相手に機会を奪われる不確実性、途中撤退できない不確実性は、同じ方向には働かない。

[Damodaran — Limitations of Real Option Pricing Models](https://pages.stern.nyu.edu/~adamodar/pdfiles/option.pdf)  
[van Putten & MacMillan — Making Real Options Really Work](https://pubmed.ncbi.nlm.nih.gov/15605572/)

---

## 4. リアルオプションは「待つ」だけではなく、六つくらいの動詞で見ると急に実務になる

<!-- level:4 role:claim -->
リアルオプションという言葉から「投資を待つ理論」だけを想像すると、半分しか見えない。実務では、将来の選択肢を動詞にして並べると分かりやすい。

<!-- level:2 role:description -->
代表的なものは次のとおりである。

1. 延期オプション（option to defer）――今すぐ投資せず、情報が増えるまで待つ
2. 段階投資オプション（staging option）――一括投資せず、検証を通過するたび次段階へ進む
3. 拡張オプション（option to expand）――成功したら生産、地域、機能、販路を広げる
4. 縮小オプション（option to contract）――環境悪化時に規模を落とす
5. 撤退オプション（option to abandon）――途中で中止し、追加損失を止める
6. 転換オプション（option to switch）――原料、製品、技術、用途などを切り替える

<!-- level:1 role:evidence -->
レノス・トリゲオルギス（Lenos Trigeorgis）は、延期、拡張、縮小、撤退、用途転換などの経営上の柔軟性を、リアルオプションの中心として整理している。研究開発のような多段階投資では、一つの段階を終えることが次段階へ進む権利を生むため、複数の選択権が連なる「複合オプション（compound option）」として扱われることもある。

<!-- level:3 role:analysis -->
この分類の意味は、用語を増やすことではない。同じ100の投資でも、一括で戻れない100と、「まず10で試し、結果を見て残り90を払う100」では経済的な性質が違う。後者の10は単なる小額投資ではなく、情報と次の選択権を買う費用になりうる。

<!-- level:5 role:implication -->
リアルオプション思考が実務へ降りる瞬間は、「この案件はいくらか」から、**この案件の中に、どんな動詞を埋め込めるか**へ問いが変わるときである。

[MIT Press — Lenos Trigeorgis, Real Options](https://mitpress.mit.edu/9780262201025/real-options/)  
[Schwartz & Trigeorgis — Real Options and Investment under Uncertainty](https://mitpress.mit.edu/9780262194464/real-options-and-investment-under-uncertainty/)

---

## 5. 待つ価値を作るのは「不可逆性・不確実性・学習・裁量」の組み合わせである

<!-- level:4 role:claim -->
では、どんな案件でもリアルオプションで考えれば賢く見えるのか。そうではない。価値が大きくなりやすい条件には、かなり癖がある。

<!-- level:2 role:description -->
特に重要なのは、次の四つである。

1. 不可逆性――一度支出すると回収しにくい
2. 不確実性――需要、価格、技術、規制などがまだ定まっていない
3. 学習――待つ、試す、観察することで情報が増える
4. 裁量――情報を得た後に、実行、停止、拡張などを選び直せる

<!-- level:1 role:evidence -->
ロバート・ピンディク（Robert S. Pindyck）は、投資支出の多くは後戻りしにくい一方で延期可能であり、企業は新しい価格、費用、市場情報を待てると整理した。この組み合わせが、単純な現在価値だけではなく「投資する権利をまだ行使しない機会費用」を生む。

<!-- level:3 role:analysis -->
逆に、支出が簡単に取り消せるなら、待つ権利はそれほど貴重ではない。待っても何も学べないなら、時間だけが過ぎる。学んでも契約や組織の都合で行動を変えられないなら、情報の価値は実行へ変換されない。リアルオプションは、不確実性だけで成立するのではなく、**不確実性を行動へ変換できる構造**があって初めて効く。

<!-- level:5 role:implication -->
したがって、実務で最初に確認すべきは「不確実性は高いですか」ではない。**何がいつ分かり、その時点で何をやめたり広げたりできるか**である。

[Pindyck — Irreversibility, Uncertainty, and Investment, NBER](https://www.nber.org/papers/w3307)

---

## 6. 「待てる」は無料ではない。競争が入ると、オプション価値は急に痩せる

<!-- level:4 role:claim -->
ここまで読むと、急いで決める人が全部損に見えてくる。だが、待つことにも代金がある。リアルオプションは「いつまでも様子見してよい」という免罪符ではない。

<!-- level:2 role:description -->
待つ間には、売上を取り逃す。特許や許認可の期限が縮む。市場シェアを競合に取られる。先行者が標準を押さえる。人材が離れる。技術が陳腐化する。選択権には満期があり、権利を保つための費用もある。

<!-- level:1 role:evidence -->
バンクーバーの集合住宅開発1,214件を用いた研究では、不確実性が高いほど開発が遅れるというリアルオプションの予測と整合的な結果が得られた一方、近隣の潜在的競合が増えると、その「待つ価値」が弱まった。別の理論研究でも、競争が強いと延期オプションが侵食され、投資の基準が通常の正味現在価値ゼロ付近へ近づく場合があると示されている。

<!-- level:3 role:analysis -->
さきほどの思考実験へ競争を入れてみる。未来が150まで伸びるはずだった好況側が、待っている間に競合参入で115までしか取れないなら、100で投資する差額は15に縮む。悪況70では投資しないとして、半々なら単純な期待差額は7.5である。最初の即時投資のプラス10を下回る。**同じ「待てる権利」でも、権利の対象を他社に食われるなら価値は減る。**

<!-- level:5 role:implication -->
リアルオプションの核心は、柔軟性礼賛ではなく、**柔軟性とコミットメントのどちらをいつ買うか**である。市場を独占できる権利なら待つ価値が大きく、誰でも入れる市場なら先に動く価値が勝つことがある。

[Bulan, Mayer & Somerville — Irreversible Investment, Real Options, and Competition, NBER](https://www.nber.org/papers/w12486)  
[Grenadier — Option Exercise Games](https://www.gsb.stanford.edu/faculty-research/publications/option-exercise-games-application-equilibrium-investment)

---

## 7. 1977年の言葉が、1990年代に「戦略の文法」へ広がった

<!-- level:4 role:claim -->
リアルオプションは、最初から経営戦略の流行語として生まれたわけではない。金融理論の発展と、投資の不可逆性を扱う研究が合流して、少しずつ守備範囲を広げてきた。

<!-- level:2 role:description -->
1973年にブラック＝ショールズ型の金融オプション評価が大きく進み、1977年にマイヤーズが企業の成長機会を「リアルオプション」と呼んだ。1980年代には天然資源、鉱山、石油、土地開発など、価格変動が大きく投資時期を選べる分野で研究が進んだ。1990年代にはアビナッシュ・ディキシット（Avinash K. Dixit）とピンディク、トリゲオルギスらが、投資と不確実性の一般理論として体系化した。

<!-- level:1 role:evidence -->
1998年にはリュールマンが、研究開発、新規市場、段階的な工場拡張などを含む企業戦略を「選択権の集合」として描く実務的な説明を提示した。その後、経営戦略研究では合弁、海外進出、研究開発、起業などにもリアルオプションの論理が広がっている。

<!-- level:3 role:analysis -->
この歴史を見ると、リアルオプションは「金融の数式を事業へ無理やり移植しただけ」とも、「単なる柔軟な経営の比喩」とも言い切れない。数理モデルと戦略上の比喩の間を行き来しながら発展したため、現在も「厳密に価格をつける方法」と「意思決定を整理する考え方」が同じ言葉の中に共存している。

<!-- level:5 role:implication -->
だから実務で混乱しやすい。リアルオプションを使うと言うときは、**価格を計算したいのか、選択肢を設計したいのか**を先に分けた方がよい。

[Myers — Determinants of Corporate Borrowing](https://doi.org/10.1016/0304-405X(77)90015-0)  
[Dixit & Pindyck — Investment under Uncertainty, Princeton University Press](https://press.princeton.edu/books/hardcover/9780691034102/investment-under-uncertainty)  
[Luehrman — Investment Opportunities as Real Options](https://hbr.org/1998/07/investment-opportunities-as-real-options-getting-started-on-the-numbers)

---

## 8. 数式はある。しかし実物資産は株式ほど素直に値段を教えてくれない

<!-- level:4 role:claim -->
リアルオプションには評価モデルがある。だが「ブラック＝ショールズ式へ数字を入れれば終わり」と考えると、むしろ現実から遠ざかる。

<!-- level:2 role:description -->
代表的な方法には、二項モデル、意思決定木、動的計画法、ブラック＝ショールズ型モデル、モンテカルロ・シミュレーションなどがある。どれも、将来の状態と、その状態でどの行動を選ぶかを数量化する試みである。

<!-- level:1 role:evidence -->
問題は、金融オプションの原資産である上場株式と違って、工場や研究開発案件には市場価格がないことが多い点にある。アスワス・ダモダラン（Aswath Damodaran）は、実物資産が取引されないため複製ポートフォリオを作りにくいこと、価値の変動性を市場から直接推定しにくいこと、価格変化が連続的とは限らないことなどを主要な限界として挙げている。

<!-- level:3 role:analysis -->
さらに実際の案件では、投資費用そのものも不確実である。複数の不確実性が絡み、行使に時間がかかり、競争相手が反応し、複数の選択権が相互作用する。数式の精密さを上げるほど、入力値の推定が怪しくなることもある。**難しいモデルを使うことと、良い意思決定をすることは同義ではない。**

<!-- level:5 role:implication -->
実務では、まず通常のDCFで基礎価値を置き、次に「どの柔軟性が価値を変えるか」を意思決定木や感度分析で可視化し、本当に重要な案件だけ高度な評価へ進む方が筋がよい。リアルオプションの数理は、柔軟性の存在を発見する道具ではなく、発見した柔軟性をどこまで定量化できるかを試す道具である。

[Damodaran — Real Options](https://pages.stern.nyu.edu/~adamodar/pdfiles/papers/realopt.pdf)  
[ScienceDirect overview — Real Options Analysis](https://www.sciencedirect.com/topics/economics-econometrics-and-finance/real-options-analysis)

---

## 9. 何でも「オプション」と呼び始めると、概念は一瞬で役に立たなくなる

<!-- level:4 role:claim -->
リアルオプションには、便利すぎるがゆえの危険がある。「まず小さくやって、あとで考える」を全部オプションと呼べば、どんな曖昧な投資も賢そうに説明できてしまう。

<!-- level:2 role:description -->
実際には、段階的に投資しているだけで自動的にリアルオプションになるわけではない。将来の選択肢が何か、いつ行使できるか、何を観察して判断するか、やめた場合に何が残るか、権利がいつ失効するか、といった構造が必要になる。

<!-- level:1 role:evidence -->
ロン・アドナー（Ron Adner）とダニエル・レビンサル（Daniel A. Levinthal）は、「何がリアルオプションではないか」を論じ、探索の結果によって選択肢そのものが際限なく変わる場合や、撤退基準が構造化されていない場合、単なる経路依存や逐次投資とリアルオプションを区別しにくくなると批判した。25年間の実証研究をレビューした研究でも、リアルオプション論理の有用性については進展がある一方、経営者特性や複数の不確実性の相互作用など、未解決の問いが多いとされる。

<!-- level:3 role:analysis -->
つまり「将来の可能性がある」は、価値の説明として弱い。可能性を価値にするには、少なくとも権利の範囲、期限、追加投資額、情報、行使条件を言葉にできなければならない。そこが曖昧なまま「将来性をオプション価値として足しました」と言うと、悲観的なDCFを都合よく上方修正する飾りになりかねない。

<!-- level:5 role:implication -->
リアルオプションは、夢に値段をつける技術ではない。**夢を、条件付きで行使できる具体的な権利へ分解する技術**と考えた方が安全である。

[Adner & Levinthal — What Is Not A Real Option](https://journals.aom.org/doi/10.5465/amr.2004.11851715)  
[Ipsmiller et al. — 25 Years of Real Option Empirical Research in Management](https://onlinelibrary.wiley.com/doi/full/10.1111/emre.12324)

---

## 10. 実務では「案件を評価する」前に、「選べるように案件を設計する」

<!-- level:4 role:claim -->
ここまで調べて、リアルオプションの最も実務的な使い方は、案件の価値を後から計算することより、**最初から将来の選択肢を残すように案件を組むこと**だと見えてくる。

<!-- level:2 role:description -->
例えば、いきなり全地域で展開せず一地域で試す。長期固定契約だけでなく、増減できる契約条項を持つ。システムを一枚岩にせず、機能単位で交換できるようにする。広告やイベント施策なら、小規模なテストで反応を観測し、一定の基準を超えたら追加予算を出す。これらはすべて、将来の情報を受けて行動を変えられる構造を先に買っている。

<!-- level:1 role:evidence -->
医薬品研究開発は、この構造が見えやすい。前臨床、臨床各段階へ順番に投資し、結果が悪ければ止め、成功すれば次へ進む。日本シェーリングの研究開発案件を扱った日本オペレーションズ・リサーチ学会の事例研究でも、途中で停止・変更できる経営上の柔軟性を組み込むことで、通常のNPV評価とは異なる価値が示された。

<!-- level:3 role:analysis -->
重要なのは、「小さく試す」ことそのものではない。試した結果を見て何をするかが決まっていなければ、単なる小規模実験で終わる。リアルオプションとして設計するなら、「何を学ぶための初期投資か」「どの数値なら追加投資するか」「どの条件なら撤退するか」「いつまで判断を保留できるか」まで定義する必要がある。

<!-- level:5 role:implication -->
ここでリアルオプションは財務の話から設計の話へ変わる。**柔軟性は性格ではなく、契約、モジュール、段階投資、検証基準として事前に作り込める資産**なのである。

[日本オペレーションズ・リサーチ学会 — REAL OPTIONS AND THE EVALUATION OF RESEARCH AND DEVELOPMENT PROJECTS IN THE PHARMACEUTICAL INDUSTRY](https://www.jstage.jst.go.jp/article/jorsj/45/4/45_KJ00003228996/_article/-char/en)  
[McGrath & Nerkar — Real Options Reasoning and R&D Investment Strategies](https://business.columbia.edu/faculty/research/real-options-reasoning-and-new-look-rd-investment-strategies-pharmaceutical-0)

---

## 11. 結論――「待つ」のではなく、未来の自分に選択権を渡しておく

<!-- level:4 role:claim -->
最初の妙な話へ戻る。正味現在価値がプラスなのに、投資しない方がよいことがある。これは、数字を信用しない話ではない。数字がまだ一つの未来しか表していないとき、選択肢の価値を追加で考える話である。

<!-- level:2 role:description -->
リアルオプションが効くのは、後戻りしにくい投資で、先が不確実で、時間とともに情報が増え、その情報を見て行動を変えられるときである。延期、段階投資、拡張、縮小、撤退、転換という動詞が、未来の分岐を形にする。

<!-- level:1 role:evidence -->
同時に、待つ間の逸失利益、期限、競争、費用の不確実性、組織の実行能力を無視すれば、オプション価値は簡単に過大評価される。実物資産は市場で取引されないことが多いため、金融オプションほど客観的な価格も得にくい。

<!-- level:3 role:analysis -->
調べる前、リアルオプションは「不確実な投資を高度な数式で評価する方法」に見えていた。調べた後は少し違う。数式の前にあるのは、未来を当てる技術ではなく、**未来が外れたときに判断を変えられるように、現在の約束の仕方を設計する技術**である。

<!-- level:5 role:implication -->
つまり「まだ決めない」は、決めていない状態ではない。何を今決め、何を未来へ残すかを決めている。リアルオプションが値段をつけるのは、優柔不断ではなく、**未来の自分へ渡しておく選択権**なのである。

---

## Research Note

### 事実として確認したこと

1. 「リアルオプション」という語は、マイヤーズの1977年論文に由来するとされる。
2. マクドナルドとシーゲルは、不可逆的な投資では待つオプション価値が重要になり、単純な便益対費用の基準では不十分になりうると示した。
3. ピンディクは、不可逆性と延期可能性の組み合わせが投資判断を変えることを整理している。
4. トリゲオルギスらの整理では、延期、拡張、縮小、撤退、転換などが代表的なリアルオプションである。
5. 競争は延期オプションの価値を侵食し、投資を早める方向に働きうる。
6. 実物資産は取引されないことが多く、変動性や基礎価値を市場から直接推定しにくいため、金融オプションの評価式をそのまま使うには限界がある。
7. 実証研究ではリアルオプション論理を支持する結果がある一方、適用境界や経営行動を含め未解決の問題も残る。

### 本稿での解釈・思考実験

1. 110、120、100、150、70、115という数値例は、オプションの非対称性を説明するための思考実験であり、実務のオプション価格ではない。
2. 「リアルオプションは未来の自分へ選択権を渡す設計」という表現は、本稿の理解補助のための要約である。
3. 「まず選択肢を設計し、その後に価値を測る」という順序は、本稿の実務上の提案である。

### 注意点

1. 収益側の不確実性が大きいほど常に案件価値が上がるわけではない。撤退可能性、競争、費用不確実性、期限などによって効果は変わる。
2. 「リアルオプション価値＝通常NPV＋柔軟性価値」という足し算は理解には便利だが、複数の選択権が相互作用する案件では単純加算できないことがある。
3. ブラック＝ショールズ型モデルは、実物資産が取引されない、価格が連続変化しない、変動性が一定でないなどの理由から、機械的な適用を避ける必要がある。

---

## 再利用プロンプト

    あなたは、投資判断と戦略設計に強い企業財務アナリストです。
    対象案件を「リアルオプション」の観点で分析してください。

    まず通常の投資評価と選択肢の設計を分けてください。
    1. 案件の目的、初期投資、基礎となるキャッシュフロー、通常のNPVを整理する
    2. 何が不可逆かを特定する
    3. 何が不確実かを、需要・価格・技術・規制・費用・競争などに分ける
    4. 時間がたつと何が新しく分かるかを特定する
    5. 情報を得た後に選び直せる行動を、延期・段階投資・拡張・縮小・撤退・転換に分類する
    6. 各選択肢について、期限、追加投資額、行使条件、撤退条件、残存価値を置く
    7. 待つことで失う売上、先行者利益、競争優位、期限を整理する
    8. 「不確実性が増えるほど価値が上がる」と単純化せず、上振れ・下振れ・費用側の不確実性を分ける
    9. まず二状態の思考実験または意思決定木で直感を確認し、必要な場合だけ二項モデル、動的計画法、シミュレーションなどへ進む
    10. 最後に、これは本当にリアルオプションか、それとも単なる逐次投資・先延ばしかを反証する

    出力では「事実」「仮定」「解釈」「提案」を分ける。
    数値は根拠のあるものと説明用の仮定を明示して区別する。
    DCFとリアルオプションを対立させず、DCFを基礎価値、リアルオプションを柔軟性の分析として接続する。

---

## Sources

- [Stewart C. Myers — Determinants of Corporate Borrowing](https://doi.org/10.1016/0304-405X(77)90015-0)
- [Robert L. McDonald & Daniel Siegel — The Value of Waiting to Invest, NBER](https://www.nber.org/papers/w1019)
- [Robert S. Pindyck — Irreversibility, Uncertainty, and Investment, NBER](https://www.nber.org/papers/w3307)
- [Lenos Trigeorgis — Real Options, MIT Press](https://mitpress.mit.edu/9780262201025/real-options/)
- [Eduardo S. Schwartz & Lenos Trigeorgis — Real Options and Investment under Uncertainty, MIT Press](https://mitpress.mit.edu/9780262194464/real-options-and-investment-under-uncertainty/)
- [Timothy A. Luehrman — Investment Opportunities as Real Options](https://hbr.org/1998/07/investment-opportunities-as-real-options-getting-started-on-the-numbers)
- [Timothy A. Luehrman — Strategy as a Portfolio of Real Options](https://hbr.org/1998/09/strategy-as-a-portfolio-of-real-options)
- [Laarni Bulan, Christopher Mayer & C. Tsuriel Somerville — Irreversible Investment, Real Options, and Competition, NBER](https://www.nber.org/papers/w12486)
- [Steven Grenadier — Option Exercise Games](https://www.gsb.stanford.edu/faculty-research/publications/option-exercise-games-application-equilibrium-investment)
- [Aswath Damodaran — Real Options](https://pages.stern.nyu.edu/~adamodar/pdfiles/papers/realopt.pdf)
- [Ron Adner & Daniel A. Levinthal — What Is Not A Real Option](https://journals.aom.org/doi/10.5465/amr.2004.11851715)
- [25 Years of Real Option Empirical Research in Management](https://onlinelibrary.wiley.com/doi/full/10.1111/emre.12324)
- [日本オペレーションズ・リサーチ学会 — REAL OPTIONS AND THE EVALUATION OF RESEARCH AND DEVELOPMENT PROJECTS IN THE PHARMACEUTICAL INDUSTRY](https://www.jstage.jst.go.jp/article/jorsj/45/4/45_KJ00003228996/_article/-char/en)
