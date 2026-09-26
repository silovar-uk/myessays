---
id: software-engine-core-processing-metaphor
title: "コンピュータの「engine」は、what is it actually running?"
subtitle: "Search、browser、database、game、AI――same word, different responsibility boundaries"
created: "2026-09-26"
updated: "2026-09-26"
type: "リサーチエッセイ"
status: "完成"
tags: ["コンピュータ", "ソフトウェア", "エンジン", "アーキテクチャ", "用語"]
keywords: ["ソフトウェアエンジン", "search engine", "rendering engine", "JavaScript engine", "database engine", "inference engine", "game engine"]
grow: 5
abstract: "なぜcomputerにはengineがこんなに多いのか。search、rendering、JavaScript、database、inference、gameの実例を比べ、engineをformal categoryではなくcore processingとresponsibility boundaryを示す言葉として整理する。語源、バベッジ、1970年代のexpert systems、modern softwareまでたどり、runtime、library、framework、compilerとの違いも説明する。"
---

# コンピュータの「engine」は、what is it actually running?
## Search、browser、database、game、AI――same word, different responsibility boundaries

コンピュータの説明を読んでいると、やたらとエンジンが出てくる。search engine。rendering engine。ジャバスクリプト（JavaScript）エンジン。database engine。inference engine。game engine。パワークエリ（Power Query）は自らを「data transformation and data preparation engine」と呼ぶ。アンリアル・エンジン（Unreal Engine）の中には、さらにaudio engineまである。

パソコンの中は、いつの間に機関室になったのだろう。

しかも、名前だけでは共通点が見えにくい。search engineは文書を探す。rendering engineは画面を作る。JavaScript engineはプログラムを実行する。データベースのstorage engineはデータを保存し、inference engineは規則から結論を出す。game engineに至っては、描画、物理計算、音、input、スクリプトなどをまとめた巨大な開発基盤である。

Bottom line first: コンピュータ分野（computer field）の「engine」は、統一された厳密な技術分類ではない。多くの場合、**ある種類のinputを受け、規則・algorithm・データ・stateを使ってcore processingを繰り返し、outputまたは新しいstateを返す部分**を指す。自動車のエンジンのように「whole productを動かすcore」という比喩は確かにある。But that aloneでは説明しきれない。engineという語そのものが、自動車よりずっと古いからである。

本稿では、まず「engine」という語が何を意味してきたかを確認し、その後、現代のソフトウェアで何が共通し、どこから共通しなくなるかを実例で確かめる。最後には、技術文書で「○○エンジン」と出会ったとき、名前に圧倒されず中身を読むための見方まで整理する。

[MDNウェブ文書「engine」（Engine）](https://developer.mozilla.org/en-US/docs/Glossary/Engine) ／ [マイクロソフト公式「パワークエリとは」（What Is Power Query?）](https://learn.microsoft.com/ja-jp/power-query/power-query-what-is-power-query) ／ [エピック・ゲームズ公式「アンリアル・エンジンの音声」（Audio in Unreal Engine）](https://dev.epicgames.com/documentation/unreal-engine/audio-in-unreal-engine-5)

> **情報基準日：2026年9月26日。** 本稿は「engine」という語に一つの公式定義があるとは扱わない。分野ごとの公式文書で実際の用法を比較し、共通項を筆者の整理として提示する。また、現代ソフトウェアで最初に「engine」と呼ばれた仕組みを一つに特定できる信頼性の高い資料は確認できなかったため、「最初のソフトウェアエンジン」を断定しない。

## 1. 「engine」は規格名ではなく、「中で処理を回す部分」を示す建築上の比喩である

まず大前提として、エンジンは中央処理装置（CPU）やハイパーテキスト記述言語（HTML）のように、対象が明確に決まった用語ではない。MDNウェブ文書も「エンジンは文脈によって複数の意味を持つ」としたうえで、JavaScript engineとrendering engineを別々に説明している。In other words, 名前だけ見て「これがエンジンの正式定義だ」と一つに固定するほうが危ない。

それでも、実際の用法にはかなり強い共通項がある。エンジンと呼ばれるものは、しばしば「外側から何かを渡される」「内部の規則や仕組みで処理する」「結果を返す」「同じ処理を何度も呼び出せる」という形を持つ。検索語を渡せば候補を探して順位づけする。プログラムを渡せば解析して実行する。文書とスタイル情報を渡せば画面へ変換する。規則と事実を渡せば判断を返す。

かなり乱暴に式へすると、「input＋規則・state→core processing→output・state change」である。But、これは公式規格ではなく、複数分野を見比べるための観察用モデルである。game engineのようにinputとoutputだけでは収まらない巨大な基盤もあるし、search engineのように収集、索引作成、検索結果表示まで広い範囲を指す場合もある。

The important point is、、「エンジン＝速いもの」「エンジン＝人工知能」「エンジン＝裏側のプログラム」と覚えないことである。速いかどうかは性能評価の話であり、人工知能かどうかは機能の話であり、裏側にあるかどうかは配置の話である。エンジンという名前が示すのは、それらよりも**システムの中で何を処理する責任を持つか**という役割に近い。

So, 「エンジンとは何か」という問いは、「何という種類のソフトウェアか」より「この製品は、どの処理の中心をエンジンとして切り出しているのか」と読み替えたほうが理解しやすい。engineはcomponent名というより、responsibility scopeの名前なのである。

[MDNウェブ文書「engine」（Engine）](https://developer.mozilla.org/en-US/docs/Glossary/Engine) ／ [MDNウェブ文書「rendering engine」（Rendering engine）](https://developer.mozilla.org/ja/docs/Glossary/Engine/Rendering)

## 2. 「engine」は本来「モーター」より広い言葉で、計算機も19世紀からエンジンだった

At this point, 、自動車から離れる必要がある。英語のエンジン（engine）は、もともと「燃料を燃やして回転力を生む装置」だけを意味した語ではない。語源辞典では、1300年ごろには機械装置、特に軍事用の仕掛けを指し、さらに技能、工夫、仕掛けといった意味を持っていたとされる。18世紀になって、エネルギーを機械的な力へ変える装置という意味が強まり、19世紀には蒸気機関との結びつきが強くなった。

この古い「工夫された機械・仕掛け」という意味を知ると、コンピュータ史の妙な事実が急に自然になる。チャールズ・バベッジ（Charles Babbage）は1821年に数表を自動計算する階差機関（Difference Engine）の設計を始め、1834年にはより一般的な計算を行う解析機関（Analytical Engine）を構想した。In other words, 電子計算機が生まれる一世紀以上前から、計算する機械が文字どおり「engine」と呼ばれていた。

解析機関には、数や途中結果を置く「記憶部」と、算術処理を行う「演算部」を分ける発想があった。コンピュータ歴史博物館は、条件分岐や反復処理など現代の計算機に通じる特徴も説明している。だから「コンピュータとengineという語の相性」は、自動車ソフトの比喩から突然始まったわけではない。

But、ここで歴史をきれいにつなぎすぎてはいけない。同博物館は、バベッジから現代の電子計算機へ「連続した発展の線」があったわけではなく、多くの原理は20世紀にバベッジの仕事とは独立に再発明されたと明記している。So, 「現代のsearch engineという呼び方は解析機関から直接受け継がれた」とまでは言えない。

それでも重要なのは、engineという語が最初から「動力源」だけではなく、**ある仕事を自動で進めるために組み立てられた仕掛け**を指してきたことである。そう考えると、ソフトウェアのエンジンは比喩ではあるが、思ったほど突飛な比喩でもない。

[オンライン語源辞典「engineの語源と歴史」（Engine - Etymology, Origin & Meaning）](https://www.etymonline.com/word/engine) ／ [コンピュータ歴史博物館「バベッジの機関」（The Engines）](https://www.computerhistory.org/babbage/engines) ／ [コンピュータ歴史博物館「簡史」（A Brief History）](https://www.computerhistory.org/babbage/history)

## 3. 同じ「engine」でも、実際には四つくらいの仕事に分けると見通しがよくなる

現代の用例を並べると、エンジンは何でもありに見える。そこで、名前ではなく「何を変換・実行しているか」で分類してみる。厳密な業界標準ではなく、理解のための整理である。

- **実行するエンジン**：JavaScript engineが代表例である。グーグル（Google）のブイエイト（V8）は、ジャバスクリプトやウェブアセンブリー（WebAssembly）をコンパイルして実行し、オブジェクトのメモリー管理や不要領域の回収も担う。ここでは「プログラム→実行」が中心になる。
- **見える形へ変換するエンジン**：rendering engineは、ハイパーテキスト記述言語（HTML）、スタイルシート（CSS）、画像などを、画面上の視覚表現へ変える。ブリンク（Blink）、ゲッコー（Gecko）、ウェブキット（WebKit）などが例である。
- **データを探す・保存する・変換するエンジン**：search engineは索引から質問に合う情報を探し、データベースのstorage engineは保存、更新、問い合わせなどの低水準処理を担う。パワークエリはデータ取得後の変換手順を実行するdata transformation and data preparation engineと説明される。
- **規則やモデルで次のstateを決めるエンジン**：inference engineは知識ベースの規則を適用して結論を導き、rules engineはinputデータへ業務規則を適用して判断を返す。physics engineなら、物体の位置、速度、力、衝突などから次のstateを計算する。

この分類で面白いのは、どれも「もの」を作っているとは限らないことである。JavaScript engineは動作を生み、search engineは候補と順位を生み、inference engineは結論を生み、physics engineは次の瞬間のstateを生む。つまりoutputはファイルや画像でなくてもよい。

さらに、game engineはこの分類から少しはみ出す。アンリアル・エンジンは、三次元世界の構築、描画、物理、音声、スクリプトなど、多数の仕組みを含む開発基盤である。その内部にはaudio engineや描画系のcomponentがある。**エンジンの中にエンジンがある。** この時点で、エンジンがcomponentの大きさを表す厳密な階級名ではないことが分かる。

だから「○○エンジン」という名前を見たら、「どの分類に属するか」を当てるより、「何を受け取り、何を変えるのか」を見るほうがよい。同じ単語がついていても、実装の粒度もresponsibility scopeもかなり違う。

[ブイエイト公式文書「ドキュメント」（Documentation）](https://v8.dev/docs) ／ [MDNウェブ文書「rendering engine」（Rendering engine）](https://developer.mozilla.org/ja/docs/Glossary/Engine/Rendering) ／ [マイエスキューエル公式用語集「storage engine」（storage engine）](https://dev.mysql.com/doc/refman/8.4/en/glossary.html) ／ [マイクロソフト公式「パワークエリとは」（What Is Power Query?）](https://learn.microsoft.com/ja-jp/power-query/power-query-what-is-power-query) ／ [IBM「業務規則管理とは」（What is Business Rules Management?）](https://www.ibm.com/think/topics/business-rules-management-system)

## 4. 「エンジン除去テスト」をすると、エンジンとwhole productの境界が見えてくる

Here is one intentionally over-serious test。「そのエンジンを周囲から外したら、何が残るか」を考える。これを本稿では便宜上「エンジン除去テスト」と呼ぶ。正式な工学用語ではないが、エンジンという曖昧な語のresponsibility scopeを読むには役に立つ。

まずウェブブラウザーで試す。クローム（Chrome）で使われるブイエイトは、ジャバスクリプトを実行する。しかしブイエイトの公式文書は、文書オブジェクトモデル（DOM）は通常JavaScript engineが提供するものではなく、クローム側が提供すると説明している。In other words, ブイエイトだけ取り出しても「ウェブブラウザー」にはならない。実際、ブイエイトはノード・ジェイエス（Node.js）のようなブラウザー外のruntimeでも使われる。

次に、マイエスキューエル（MySQL）で試す。公式文書では、storage engineは表の種類に応じて構造化照会言語（SQL）の処理を担うcomponentで、イノディービー（InnoDB）など複数のエンジンを扱える。さらにstorage engineを読み込んだり外したりできるreplaceableな構造が説明されている。ここでは「engine」がかなり文字どおり、交換可能な中核componentとして見える。

パワークエリでも境界は明確である。マイクロソフトの説明では、パワークエリは変換を担うが、結果を保存する一つの固定された宛先を持たない。結果をどこへ読み込むかは、エクセル（Excel）やパワー・ビーアイ（Power BI）など、パワークエリを載せている製品やサービス側が決める。エンジンは「データを変換する責任」を受け持ち、その外側にinput画面や保存先がある。

ところがアンリアル・エンジンで同じテストをすると、境界が急にぼやける。アンリアル・エンジン自体が多数の機能を抱える広い開発基盤だからである。それでも内部文書では、描画の「レンダラーモジュール」、音声の「audio engine」、物理の「カオス・フィジックス（Chaos Physics）」など責任の分解が続く。大きなエンジンが、小さなcore processingの集合を抱えている。

What this test shows is、「エンジンは必ず独立して動くcomponent」という定義ではない。むしろ、**製品がどこをcore processingとして切り出し、reuse・交換・専門化しようとしているかを見る言葉**だという理解である。名前より境界を見ると、急に技術文書が読みやすくなる。

[ブイエイト公式「導入」（Introduction）](https://github.com/v8/v8/wiki/Introduction/b832fdfcd453608d2baa047476555830577f81c5) ／ [マイエスキューエル公式「代替storage engine」（Alternative Storage Engines）](https://dev.mysql.com/doc/refman/8.0/en/storage-engines.html) ／ [マイクロソフト公式「パワークエリとは」（What Is Power Query?）](https://learn.microsoft.com/ja-jp/power-query/power-query-what-is-power-query) ／ [エピック・ゲームズ公式「描画の一般機能」（General Features of Rendering）](https://dev.epicgames.com/documentation/unreal-engine/general-features-of-rendering-in-unreal-engine)

## 5. 1970年代の「inference engine」は、知識と処理方法を分ける発想をはっきり見せた

ソフトウェア史で「engine」という考え方が分かりやすく現れる例の一つが、1970年代の専門家システムである。専門家システムは、ある分野の知識を規則として蓄え、その規則を使って診断や判断を行わせようとした人工知能の一系統だった。

スタンフォード大学で1970年代半ばに開発されたマイシン（MYCIN）は、細菌感染症に対する抗菌薬選択を支援する規則型システムだった。その後、研究者は医療固有の知識と、規則を選び適用して結論へ進む仕組みを分けられないかと考えた。そこで作られたエマイシン（EMYCIN）は、マイシンから感染症の知識を外し、別分野の知識ベースにも使える枠組みへ一般化した。

1986年のスタンフォード大学の報告書は、エマイシンについて「inference engineと知識表現の構文を提供するが、それ自体は問題固有の知識を持たない」と説明している。これはengineという語の便利さを非常によく示す。**何を知っているか**と**その知識をどう使って推論するか**を分離し、後者をreusableな処理機構として切り出しているからである。

もちろん、これが「ソフトウェアエンジン」という語の最初の用法だと断定することはできない。もっと古い使用例があり得るし、分野ごとに独立して広がった可能性もある。ただ、少なくとも1970年代には、現在のrules engineやinference engineにも通じる「知識・規則と、それを動かす処理系を分ける」という設計が明確に現れていた。

この分離は、現在でも繰り返される。search engineは検索対象の索引と検索処理を分け、データベースは問い合わせを受ける層と保存処理を分け、プログラムruntimeは言語仕様と実行エンジンを分ける。全部が同じ設計ではないが、「変わりやすい内容」と「それを処理する仕組み」を分けるとreuseしやすい、という考え方は共通している。

[スタンフォード大学「専門家システムの構築に関する報告」（Knowledge Systems Laboratory report）](https://i.stanford.edu/pub/cstr/reports/cs/tr/86/1094/CS-TR-86-1094.pdf) ／ [スタンフォード大学「人工知能研究の概観」（Artificial Intelligence research report）](https://i.stanford.edu/pub/cstr/reports/cs/tr/82/926/CS-TR-82-926.pdf)

## 6. エンジン、runtime、library、frameworkは似ているが、見ている軸が違う

初心者が混乱しやすいのは、「engine」と周辺語が互いに排他的ではないことである。一つのソフトウェアが、見方によってlibraryでもエンジンでもあり得る。だから単語を箱の名前として覚えるより、「何を説明するための言葉か」を分けたほうがよい。

- **エンジン**：特定領域のcore processingを担うという、役割・responsibility scopeを表す言葉。何をinputとして何を処理するかに注目する。
- **runtime（runtime）**：プログラムを動かすために必要な環境全体を指す。ノード・ジェイエスはブイエイトだけでなく、入outputやイベント処理など周囲の機能も含むため、JavaScript engineそのものより広い。
- **library**：他のプログラムから呼び出して使うreusableなコードの集合である。エンジンがlibraryとして提供されることもある。
- **framework**：アプリケーション全体の構造や拡張点を用意し、その枠へ利用者の処理を組み込ませる。エンジンを内部に持つこともある。
- **compiler／interpreter**：プログラム言語を翻訳・解析・実行する方法やcomponentを指す。現代のJavaScript engineは、解釈実行だけでなく実行時コンパイルなど複数の技法を組み合わせるため、「engine」はそれらを含む上位のまとまりとして使われる。
- **server**：ネットワーク越しの要求へ応答するプログラムや実行単位を指す。内部にsearch engineやdatabase engineを持つことがある。
- **kernel**：オペレーティングシステムの中核として、プロセス、メモリー、機器などの資源を管理する部分である。「中核」という意味では似るが、役割はエンジンよりはるかに具体的である。

さらに「algorithm」とも区別したほうがよい。algorithmは問題を解くための手順や方法であり、エンジンはそのalgorithmを含めて、データ構造、state管理、最適化、入outputの境界などを実装した実際の処理系を指すことが多い。検索順位を決めるalgorithm一個だけで、search engine全体にはならない。

この違いを知ると、「ブイエイトはジャバスクリプトのruntimeです」と「ノード・ジェイエスはJavaScript engineです」のような、少しずれた説明にも気づける。現実には用語の使い方が揺れる場面もあるが、responsibility scopeを確認すれば混乱はかなり減る。

[MDNウェブ文書「JavaScript engine」（JavaScript engine）](https://github.com/mdn/content/blob/main/files/en-us/glossary/engine/javascript/index.md?plain=1) ／ [ブイエイト公式文書「ドキュメント」（Documentation）](https://v8.dev/docs)

## 7. 「engine」という語の弱点は、便利すぎて境界をぼかせることである

engineという語は便利だが、便利すぎる。厳密な規格語ではないため、狭いcomponentにも巨大な製品にも付けられる。storage engineのようにreplaceableな一部を指すこともあれば、アンリアル・エンジンのように開発環境全体に近い範囲を指すこともある。

第一の弱点は、**名前だけでは境界が分からない**ことだ。「人工知能エンジン」「推薦エンジン」「分析エンジン」と書いてあっても、それが一個のlibraryなのか、複数サービスの集合なのか、単なる製品名なのかは別途確認しなければならない。engineという語だけでは、配置、規模、交換可能性、利用形態は保証されない。

第二の弱点は、**強そうに聞こえる**ことである。エンジンには速度、推進力、中核という印象がある。しかし「○○エンジン」と名乗ること自体は、性能の証明ではない。高速性、精度、省メモリー、拡張性を判断するには、algorithm、実装、評価条件、比較対象を見る必要がある。

第三の弱点は、**入れ子になると説明が循環する**ことである。「game engineのrendering engineのシェーダー処理」のように、階層ごとにengineという語が現れると、「結局どこが本当のエンジンなのか」と感じる。しかし、本当のエンジンが一つだけある必要はない。異なるresponsibility scopeごとに処理の中心があり、それぞれをエンジンと呼んでいるだけである。

この曖昧さは欠陥だけではない。ソフトウェア設計では「ここは検索を担当する」「ここは規則を評価する」「ここは描画する」というresponsibility boundaryを名前で示すことに価値がある。engineという語は、厳密な分類名としては弱いが、**設計者がどこを処理の中心と見なしているかを読む手掛かり**としては強い。

だから批判的に読むとは、「engineという語を使うな」と言うことではない。「エンジンと書いてあるから分かった気にならない」ことである。

[MDNウェブ文書「engine」（Engine）](https://developer.mozilla.org/en-US/docs/Glossary/Engine) ／ [マイエスキューエル公式「代替storage engine」（Alternative Storage Engines）](https://dev.mysql.com/doc/refman/8.0/en/storage-engines.html) ／ [エピック・ゲームズ公式「アンリアル・エンジン入門」（Get Started）](https://dev.epicgames.com/documentation/unreal-engine/get-started)

## 8. 「○○エンジン」と出会ったら、五つの質問でほぼ正体をつかめる

実務では、語源を毎回調べる必要はない。技術文書や製品説明で「○○エンジン」が出てきたら、次の五つを確認すれば、その言葉がかなり具体的になる。

- **何が入るのか。** 検索語、プログラム、文書、規則、データ、物体のstateなど、inputを特定する。
- **中で何を参照するのか。** algorithm、索引、知識ベース、保存データ、物理法則、設定値など、処理の根拠を確認する。
- **何が出るのか、何が変わるのか。** 検索結果、画面、判断、保存state、次のフレームなど、outputまたはstate changeを見る。
- **誰が呼び出すのか。** 利用者が直接使うのか、別のアプリケーション、runtime、serverが内部から呼ぶのかを確認する。
- **何と交換・reuseできるのか。** 別のエンジンへ差し替えられるのか、他製品へ組み込めるのか、それともwhole productのブランド名に近いのかを見る。

For example, 「search engine」なら、検索語が入り、あらかじめ作られた索引などを参照し、関連する情報を順位づけして返す。グーグル検索（Google Search）の公式説明では、その前段に収集と索引登録があり、検索結果表示までを含む三段階で説明される。つまり「search engine」という一語の中にも、複数の処理工程がある。

「JavaScript engine」なら、プログラムが入り、言語仕様に従って解析・コンパイル・実行され、計算やstate changeが起きる。しかし画面の文書構造そのものはブラウザー側の責任である。「データ変換エンジン」なら、データと変換手順が入り、変換済みデータが出るが、保存先は外側の製品が決める場合がある。

ここまで分解できれば、「エンジンだから何となくすごい裏側の何か」という理解から脱出できる。名前ではなく、input、内部資源、処理、output、周囲との境界を読む。これはエンジン以外の技術用語にもそのまま使える。

[グーグル検索セントラル「Google検索の仕組み」（How Google Search Works）](https://developers.google.com/search/docs/fundamentals/how-search-works?hl=ja) ／ [ブイエイト公式文書「ドキュメント」（Documentation）](https://v8.dev/docs) ／ [マイクロソフト公式「パワークエリとは」（What Is Power Query?）](https://learn.microsoft.com/ja-jp/power-query/power-query-what-is-power-query)

## 9. 調べたあと、After researching、the computer looks less like an engine room and more like a map of responsibility

Back to the first question。なぜコンピュータでは、何でもエンジンと呼ぶのか。

Before researching、、自動車の比喩をそのまま持ち込んで、「製品を動かす一番大事なcomponentだからエンジン」と説明すれば済むように見えた。確かに、その感覚は一部当たっている。しかし歴史をたどると、エンジンはもともと動力装置だけではなく、工夫された仕掛けや機械を指す広い語だった。バベッジの計算機も、自動車ソフトとは無関係な時代からエンジンだった。

Compare modern usage and、さらに見え方が変わる。engineという語が指しているのは、最重要componentという順位より、**ここでは何を処理するのかというresponsibility boundary**であることが多い。ジャバスクリプトを実行する。文書を描画する。データを保存する。規則を評価する。物理stateを更新する。それぞれの「回す仕事」に名前を付けている。

そして、境界の大きさは一定ではない。小さなreplaceablecomponentもエンジンなら、巨大なゲーム開発基盤もエンジンである。だから、単語そのものに厳密さを求めると失敗する。代わりに「何が入り、何を参照し、何を変え、誰から呼ばれ、何と交換できるか」を読む。

そうすると、パソコンの中が機関室に見える感じは少し薄れる。

そこにあるのは無数のモーターではない。**複雑な仕事を、それぞれの責任に切り分けて回すための境界線**である。「engine」という妙に力強い名前は、その境界に貼られた札だと思うと、かなり正体に近い。

[コンピュータ歴史博物館「バベッジの機関」（The Engines）](https://www.computerhistory.org/babbage/engines) ／ [MDNウェブ文書「engine」（Engine）](https://developer.mozilla.org/en-US/docs/Glossary/Engine) ／ [スタンフォード大学「専門家システムの構築に関する報告」（Knowledge Systems Laboratory report）](https://i.stanford.edu/pub/cstr/reports/cs/tr/86/1094/CS-TR-86-1094.pdf)
