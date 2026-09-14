---
id: transactive-memory-ai-teammate
title: "AIを入れると、知識は増える。でも協調は自動では増えない――人間＋AIのトランザクティブメモリー"
subtitle: "ICUの180人、P&Gの791人、GitHub、BCGの実験から、『AIに何を聞くか』の次を考える"
created: "2026-09-15"
updated: "2026-09-15"
type: "Essay"
status: "完成"
tags: ["トランザクティブメモリー", "生成AI", "AI", "チーム", "知識管理", "Human-AI Teaming"]
keywords: ["transactive memory", "human-AI teaming", "generative AI", "GenAI", "knowledge coordination", "trust calibration", "jagged frontier", "P&G", "BCG", "ChatGPT"]
favorite: 5
grow: 5
abstract: "トランザクティブメモリーを『誰が何を知っているか』の地図だとするなら、生成AIはその地図のどこに置かれるのか。2026年の研究では、人間とGenAIの協働は知識の幅と深さを増やした一方、知識の協調には有意な改善が確認されなかった。ICU、P&G、GitHub、BCGの研究をたどると、AIは単なる外部ツールでも万能な同僚でもなく、能力境界と信頼度が仕事ごとに動く特殊な知識源に見えてくる。AI導入をプロンプト設計ではなく、『知る・疑う・決める』の分業設計として考え直す。"
---

# AIを入れると、知識は増える。でも協調は自動では増えない

## 「AIもチームメンバーです」と言った瞬間、誰が何を知っていることになるのか

前作では、チームの記憶を「誰が何を知っているか」という地図として考え、その地図が人の入れ替わりで古くなることまで見た。そこまで来ると、今度はかなり面倒な存在が地図へ入ってくる。**ほとんど何でも答え、数秒で返事をし、ときどき堂々と間違える生成AI**である。

AIを単なる検索窓として扱うなら話は簡単だ。しかし仕事の途中で「まずAIに聞く」「この案はAIに反論させる」「資料の第一稿はAIへ振る」が定着すると、AIはもう道具箱の一つではない。チームの中で「この種類の知識はここへ取りに行く」という**検索先**になっている。トランザクティブメモリーの言葉でいえば、非人間のノードが知識地図へ入り始めている。

そこで妙なことが起きる。2026年にAcademy of Management Proceedingsで発表された研究は、GitHub上のオープンソース開発データと大規模調査を組み合わせ、人間とGenAIの協働が知識の幅と深さを増やし、専門化を強める一方、**knowledge coordinationには有意な変化を確認できなかった**と報告した。知識源を増やすことと、それをうまく組み合わせることは、同じ能力ではない。出典: <a href="https://journals.aom.org/doi/abs/10.5465/AMPROC.2026.19027abstract">Vroegindeweij et al. (2026)</a>。

<figure>
  <img src="https://silovar-uk.github.io/myessays/assets/transactive-memory-ai/ai-knowledge-coordination-gap.svg" alt="人間と生成AIの協働で知識の幅と深さは増える一方、知識の協調は自動的に改善するとは限らないことを示した図" loading="lazy">
  <figcaption>2026年のHuman–GenAI研究が示したspecializationとcoordinationの非対称性を概念図化。出典: <a href="https://journals.aom.org/doi/abs/10.5465/AMPROC.2026.19027abstract">Vroegindeweij et al. (2026)</a>。Proceedings掲載の抄録ベースであり、結果の一般化には注意が必要。</figcaption>
</figure>

この結果は、AI導入の議論を少しずらす。「AIで何ができるか」だけを増やしても、チームは自動的には賢くならない。**知識が増えたあとに、誰がそれを呼び出し、誰が疑い、誰が既存知識と統合するか**まで決めて初めて、増えた知識がチームの記憶になる。

## 1. ICUでは、AIから情報を取ることが「新しい仮説」と結びついた

人間とAIを同じ知識システムとして見る発想は、生成AIブームの後付けだけではない。2023年、Nadine Bienefeldらは、180人の集中治療医・看護師がAIエージェントと働くシミュレーションを観察し、トランザクティブメモリーの観点から相互作用を分析した。高パフォーマンスのチームでは、AIエージェントから情報へアクセスする行動が、新しい仮説を生み出すことや、疑問・懸念を声に出すspeaking upと正に関連していた。出典: <a href="https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2023.1208019/full">Bienefeld et al. (2023)</a>。

ここで重要なのは、「AIが医療者より優秀だった」という読み方ではない。この研究は観察研究であり、AIへ聞けば必ず成果が上がるという因果を示したものでもない。むしろ興味深いのは、うまく機能するチームではAIが**追加の知識源として会話の流れに組み込まれていた**ことだ。AIの価値は答えそのものだけでなく、「別の可能性を持ち込む相手」としてチームの探索範囲を変えるところに現れている。

人間だけのTMSでは、「循環器ならA先生」「この装置ならBさん」という専門性の地図を作る。AIが入ると、そこへ「鑑別候補の発散はAI」「最終判断は医師」「患者の微妙な変化は看護師」といった異質な分業が加わる。AIは人間の席を一つ置き換えるのではなく、**人間の専門性の境界線そのものを描き直す**可能性がある。

## 2. P&Gでは「個人＋AI」が「人間2人チーム」に追いついた

この境界線の変化を、かなり大きな現場実験で見せたのがP&Gである。2026年にOrganization Scienceで公開された研究では、791人のR&Dとcommercial部門の専門職が、実際の新商品開発課題に取り組んだ。参加者は「個人・AIなし」「人間2人チーム・AIなし」「個人＋AI」「人間2人＋AI」の四条件へランダムに割り当てられた。出典: <a href="https://pubsonline.informs.org/doi/10.1287/orsc.2025.20702">The Cybernetic Teammate (2026)</a>。

結果の一つがかなり強い。**個人＋AIは、人間2人チーム・AIなしと同程度のパフォーマンスを示した。**さらにAIを使わない場合、R&D職は技術寄り、commercial職は市場寄りの提案になりやすかったが、AI利用者は職種にかかわらず、技術と市場の両面をよりバランスよく含む提案を出した。AIが機能サイロのあいだに橋をかけた、と研究者たちは解釈している。

これは「もうチームはいらない」という結果ではない。むしろ、一人の中へ一時的に複数職種の視点を持ち込めることが重要だ。従来のTMSでは、専門性を別々の人へ分散し、その間を会話でつないでいた。生成AIは、その分散した専門性の一部を**一人の作業画面へ圧縮して持ち込む**。だからAIは人数を代替するだけでなく、「専門性は人ごとに分かれている」というチーム設計の前提を崩し始める。

しかし圧縮には副作用がある。マーケティングらしい視点も、技術者らしい視点も同じチャット窓から返ってくると、「この主張はどの専門性に基づき、誰が責任を持って検証したのか」が見えにくくなる。知識の壁を越えやすくするほど、**知識の出所と責任の境界を意識的に作り直す必要が出てくる**。

## 3. AIの専門性は「この人は法務担当」のように固定できない

人間の専門家にも得意不得意はあるが、通常はある程度の連続性がある。法務担当は今日も明日も法務に詳しく、データ担当は昨日の分析文脈をある程度引き継ぐ。生成AIの専門性はもっと奇妙だ。同じモデルでも、課題、入力情報、指示、利用できるツール、最新情報へのアクセスによって、急に強くなったり弱くなったりする。

この特徴を有名にしたのが「jagged technological frontier」という考え方である。BCGの知識労働者758人を対象にした実験では、AIの能力範囲内に置かれた18の現実的な課題で、AI利用者はより速く、より多くの課題を終え、品質も高かった。一方、能力境界の外に置かれた複雑な課題では、AI利用条件の正答率は対照群より平均19ポイント低かった。出典: <a href="https://pubsonline.informs.org/doi/10.1287/orsc.2025.21838">Dell'Acqua et al., Organization Science</a>。

<figure>
  <img src="https://silovar-uk.github.io/myessays/assets/transactive-memory-ai/ai-jagged-frontier.svg" alt="AIが得意な領域では速度と品質が上がる一方、能力境界の外では正答率が下がるジャギッド・フロンティアの概念図" loading="lazy">
  <figcaption>AIの能力境界は滑らかな一本線ではない。BCG実験では境界外の課題でAI利用条件の正答率が平均19ポイント低下した。出典: <a href="https://pubsonline.informs.org/doi/10.1287/orsc.2025.21838">Dell'Acqua et al.</a></figcaption>
</figure>

さらに厄介なのは、境界外で間違った回答でも、AI利用者の文章は対照群より**説得力や一貫性の評価が高かった**ことだ。つまり「きれいに説明できる」と「正しい」が逆方向へ動く場面がある。人間のTMSで専門家を信用するとき、私たちは経歴、過去の実績、他者評価などを手がかりにcredibilityを学ぶ。AIでは、文章の流暢さがその手がかりを偽装しうる。

するとAI時代の「誰が何を知っているか」は、人名と専門分野を結ぶだけでは足りない。**どの条件ならこのAIを信用でき、どの条件では必ず別ルートで確認するか**まで地図へ書かなければならない。AIの専門性は住所ではなく、天気で通行可否が変わる道路に近い。

## 4. AIを信用するかではなく、「何について何％信用するか」が必要になる

AIへの信頼は、しばしば「信用する／しない」の二択で語られる。しかし人間の専門家でも、そんな単純な信用はしない。法務担当の契約解釈は信用しても、来場予測まで任せるとは限らない。トランザクティブメモリーに必要なのは全人格的な信頼ではなく、**領域ごとに校正されたcredibility**である。

行動実験では、AIが出した助言だと知るだけで、人が自分の判断や文脈情報に反してまでAIへ過度に依存することが確認された研究もある。AIは誤るから危険なのではなく、誤りが「助言らしい形」で届き、人間側の依存行動を変えるため危険になる。出典: <a href="https://www.sciencedirect.com/science/article/pii/S0747563224002206">Trust and reliance on AI — An experimental study on the extent and costs of overreliance on AI</a>。

だから「AIの回答には必ず注意しましょう」という一般論では弱い。必要なのは、事実確認が必要な領域、発散だけに使う領域、一次情報へ戻る領域、最終判断へ使わない領域を先に決めることだ。人間チームで「この数字は経理確認」「この表現は法務確認」と決めるのと同じように、AIにも**信頼の利用規約**が要る。

ここまで来ると、AI literacyの中心は「上手な質問文を書く」だけではなくなる。より重要なのは、AIが答えたあとに、その答えを知識システムのどこへ置くかを判断する能力である。プロンプトが入力技術だとすれば、**trust calibrationは出力の居場所を決める技術**になる。

## 5. 外部の記憶が強くなるほど、人間の内部記憶は弱くてもよいのか

トランザクティブメモリーは、そもそも全部を自分で覚えなくてよい仕組みだった。ならAIが優秀な外部記憶になるほど、人間は覚えなくてよいはずである。この推論はかなり自然だが、個人学習の研究を見ると、少しだけ不安になる。

2025年のランダム化比較試験では、120人の大学生がAI分野を学び、一方はChatGPTを学習補助に使い、もう一方は従来型の学習方法を使った。45日後の抜き打ちテストでは、ChatGPT利用群の正答率は57.5％、従来学習群は68.5％だった。研究者は、AIへのcognitive offloadingが学習時の認知的努力を減らし、長期保持を弱めた可能性を論じている。出典: <a href="https://www.sciencedirect.com/science/article/pii/S2590291125010186">ChatGPT as a cognitive crutch (2025)</a>。

これは学生の学習実験であり、そのまま職場のチームへ一般化するべきではない。しかし問いは残る。AIが常時アクセス可能なら、人間が内部に保持する知識量が減っても業務成果は上がるかもしれない。では障害、契約変更、モデル更新、誤回答の発見時に、誰が「いつものAIが変だ」と気づくのか。外部記憶を検証するには、内部に比較基準が必要である。

前作では、覚えないことを欠陥ではなく分業として捉え直した。AIが入ると、その分業に新しい下限が生まれる。**人間は全部を覚えなくてよいが、外部の答えが壊れたと気づけるだけの基準は覚えていなければならない。**チームの記憶を外へ広げるほど、人間に残すべき最小知識を意識的に設計する必要がある。

## 6. 「AI担当」を作るより、「知る・疑う・決める」を分ける

ここまでの研究をLewisのTMS尺度へ戻すと、AI導入の設計がかなり整理できる。specializationは「AIは何が得意か」、credibilityは「どこまで信用するか」、coordinationは「誰がAIを使い、誰が人間知識と統合するか」である。AIを導入しました、全員使えます、という状態は、この三つのうちアクセスしか決めていない。

<figure>
  <img src="https://silovar-uk.github.io/myessays/assets/transactive-memory-ai/ai-tms-protocol.svg" alt="AI導入時に必要な設計として、得意領域の地図、検証ルール、責任と統合の流れを示した図" loading="lazy">
  <figcaption>人間＋AIのTMSをspecialization・credibility・coordinationの三方向から設計する。基礎概念はLewis (2003)のTMS尺度に由来。</figcaption>
</figure>

たとえば「市場事例の発散はAI」「数字は社内データで再確認」「権利・契約は担当者へ戻す」「最終案の論理矛盾は別の人が見る」と決める。このときAIは万能な一人の同僚ではなく、複数の限定された役割を持つ知識ノードになる。能力境界が変われば役割を更新し、誤りが増えた領域は信用度を下げる。人間の異動で知識地図を書き換えたのと同じことを、AIにはもっと頻繁に行う必要がある。

ここで「AI担当者を一人置く」だけでは不十分な理由も見える。その人だけがAIの使い方を知ると、新しい属人化が生まれる。必要なのは、AIの出力を取りに行く人と、検証する人と、最終責任を持つ人の関係が見えることだ。**AI活用の成熟度は、プロンプトの上手さより、知識の流れと責任の流れが一致しているかで測ったほうがよい。**

## 7. AIは「外付け脳」ではなく、チームの記憶配置を変える装置だった

最初は、生成AIをトランザクティブメモリーへ足せば、「とても物知りな一人が追加される」と考えればよいと思っていた。しかし調べるほど、その比喩は崩れた。P&GではAIが専門領域の壁を薄くし、BCGでは能力境界の内外で正しさが反転し、GitHub研究では知識のspecializationが増えてもcoordinationは自動で増えなかった。AIは一席を埋めるのではなく、席の分け方を変えている。

人間同士のTMSでは、「誰が何を知っているか」を学ぶことが中心だった。人間＋AIでは、そこへ「どの条件でAIが知っていることになるのか」「誰がその知識を検証するのか」「AIを使った人に知識が残らなくてもよいのか」が加わる。記憶の住所録が、住所だけでなく**信頼度と検証経路を持つルーティングテーブル**へ変わる。

だから次のAI活用競争は、モデルを一番多く使った組織が勝つとは限らない。AIへ知識を取りに行く経路、人間へ戻す経路、疑う経路、責任を引き受ける経路をうまく設計した組織のほうが強いはずだ。これはAI導入というより、組織認知の再設計である。

前作で「誰に聞けばいいかを知ることも記憶だ」と分かった。その次に人の入れ替わりを調べ、「古い誰に聞くか」は誤記憶になりうると分かった。そしてAIまで入れると、さらに一段進む。**これからのチームで重要なのは、答えを持っている主体を知ることだけではない。答えを“知識として採用してよい条件”まで共有することだ。**トランザクティブメモリーは、人間の住所録から、知識を採用するためのプロトコルへ広がり始めている。

## 参考資料

- <a href="https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2023.1208019/full">Bienefeld et al. (2023), Human-AI teaming: leveraging transactive memory and speaking up for enhanced team effectiveness</a>
- <a href="https://journals.aom.org/doi/abs/10.5465/AMPROC.2026.19027abstract">Vroegindeweij et al. (2026), Transforming Transactive Memory Systems in Human-GenAI Collaboration</a>
- <a href="https://pubsonline.informs.org/doi/10.1287/orsc.2025.20702">The Cybernetic Teammate: A Field Experiment on Generative AI and Teamwork (2026)</a>
- <a href="https://pubsonline.informs.org/doi/10.1287/orsc.2025.21838">Navigating the Jagged Technological Frontier, Organization Science</a>
- <a href="https://www.sciencedirect.com/science/article/pii/S0747563224002206">Trust and reliance on AI — An experimental study on the extent and costs of overreliance on AI</a>
- <a href="https://www.sciencedirect.com/science/article/pii/S2590291125010186">ChatGPT as a cognitive crutch: Evidence from a randomized controlled trial on knowledge retention (2025)</a>
- <a href="https://pubmed.ncbi.nlm.nih.gov/12940401/">Lewis (2003), Measuring transactive memory systems in the field</a>
