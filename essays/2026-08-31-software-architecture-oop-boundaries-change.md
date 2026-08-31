---
id: software-architecture-oop-boundaries-change
title: "アーキテクチャ設計とOOPとは何か"
subtitle: "「どこに何を置くか」から、変更に耐えるソフトウェアの考え方まで"
created: "2026-08-31"
updated: "2026-08-31"
type: "Learning Paper"
status: "完成"
tags: ["ソフトウェア設計", "アーキテクチャ", "OOP", "オブジェクト指向", "モジュール", "依存関係", "リファクタリング", "ADR"]
keywords: ["software architecture", "object-oriented programming", "OOP", "encapsulation", "abstraction", "inheritance", "polymorphism", "coupling", "cohesion", "modularity", "architecture decision record", "microservices", "event-driven architecture"]
favorite: 4
grow: 5
abstract: "アーキテクチャ設計とOOPは、どちらも『きれいなコードを書くための技法』というより、ソフトウェアの複雑さと変更コストを制御するための考え方である。本稿では、アーキテクチャをシステム全体の重要な要素・関係・進化原則として捉え、OOPを状態と振る舞いをオブジェクトへまとめ、責務や依存関係を局所化する設計手段として整理する。レイヤード、イベント駆動、マイクロサービス、凝集度と結合度、インターフェース、継承と合成、デザインパターン、リファクタリング、ADRまでを一枚の概念地図としてつなぐ。"
---

# アーキテクチャ設計とOOPとは何か
## 「どこに何を置くか」から、変更に耐えるソフトウェアの考え方まで

### 要旨

> **Simple English:** Good software design is mostly about managing change.

プログラミングを少し始めると、急に言葉が増える。

- アーキテクチャ
- OOP
- クラス
- オブジェクト
- インターフェース
- SOLID
- デザインパターン
- MVC
- レイヤードアーキテクチャ
- クリーンアーキテクチャ
- マイクロサービス
- 疎結合
- 凝集度

どれも「設計」の話らしい。

ただ、最初はそれぞれの距離感が分かりにくい。

アーキテクチャとOOPは同じものなのか。クラスをきれいに作ればアーキテクチャも良くなるのか。マイクロサービスにすれば高度な設計になるのか。

先に結論を置く。

**アーキテクチャは、システム全体で「何を分け、何をつなぎ、どの依存を許すか」を決める大きな設計。OOPは、その中でデータと振る舞いをどうまとめ、責務をどう分けるかを考える一つの方法である。**

そして両方に共通する本当のテーマは、見た目の美しさよりも、**変更したときに壊れにくいこと**にある。

---

## 1. そもそも「設計」とは何をしているのか

> **Simple English:** Design decides where responsibilities should live.

小さなプログラムなら、思いついた順に書いても動く。

```js
const memo = input.value;
localStorage.setItem('memo', memo);
alert('saved');
```

これだけなら問題はほとんどない。

ところが機能が増えると、事情が変わる。

- メモを編集したい
- クラウドにも保存したい
- ログインを付けたい
- 履歴を残したい
- 複数端末で同期したい
- オフラインでも使いたい
- 保存先を変更したい

最初は一か所だったコードが、だんだん絡まり始める。

ここで設計が必要になる。

設計とは、ものすごく単純化すれば、

**「この責任は、どこに持たせるか」**

を決め続ける作業である。

保存処理は画面が持つのか。保存専用の部品が持つのか。ユーザー認証とメモ編集は同じ場所に置くのか。データベースが変わったら、何ファイル直すのか。

設計は、未来の変更に備えて現在の複雑さを配置し直す仕事とも言える。

---

## 2. アーキテクチャとは「重要な構造」のこと

> **Simple English:** Architecture is about the important parts and their relationships.

ISO/IEC/IEEE 42010系の定義では、architectureは、システムの環境の中での**fundamental concepts or properties**、つまり根本的な概念や性質であり、それが要素・関係・設計と進化の原則に表れるものと整理されている。

大事なのは、アーキテクチャが「全コードの詳細設計」ではないことだ。

Martin Fowlerは、ソフトウェアアーキテクチャをめぐる議論を紹介しながら、結局は**“the important stuff”**、何が重要かを見極めることが中心だと説明している。

たとえばメモアプリなら、次のような判断はアーキテクチャ寄りである。

```text
UI
 ↓
アプリケーションロジック
 ↓
保存の抽象インターフェース
 ↓
LocalStorage / API / Database
```

ここで重要なのは、「保存先が変わっても上の層をなるべく壊さない」という依存関係の方向である。

一方、ボタンの余白を12pxにするか16pxにするかは設計ではあるが、通常はアーキテクチャ上の主要判断ではない。

つまり、

```text
設計 = たくさんある判断全体
アーキテクチャ = その中でも、システムの形や将来変更へ大きく効く判断
```

くらいに考えると分かりやすい。

---

## 3. アーキテクチャは「箱を描くこと」ではない

> **Simple English:** A diagram is a description of architecture, not architecture itself.

アーキテクチャという言葉から、四角い箱と矢印の図を想像しやすい。

もちろん図は役に立つ。

ただし、図そのものがアーキテクチャではない。

ISO 42010の考え方でも、architectureそのものと、それを表現するarchitecture descriptionは区別される。

箱の配置より重要なのは、なぜその境界を置いたかである。

```text
変更理由が違うものを分ける
失敗を波及させたくないものを分ける
別チームが独立して変更したいものを分ける
外部サービスに依存する部分を閉じ込める
```

良い図でも、依存関係がぐちゃぐちゃなら意味が薄い。

逆に、図が簡素でも「どこからどこへ依存してよいか」が共有されていれば、かなり強い設計になる。

---

## 4. OOPとは何か

> **Simple English:** OOP organizes software around objects that combine state and behavior.

OOPは**Object-Oriented Programming、オブジェクト指向プログラミング**の略である。

OracleのJava教材は、objectを関連する**state（状態）とbehavior（振る舞い）**をまとめたソフトウェア上のまとまりとして説明している。

Microsoft Learnでは、OOPの基本原則として次の四つを挙げている。

- Abstraction：必要な特徴だけをモデル化する
- Encapsulation：内部状態や実装詳細を隠す
- Inheritance：既存の抽象から新しい抽象を作る
- Polymorphism：共通の呼び方に対して異なる実装を持てる

初心者向けには、まずこう考えるとよい。

```text
オブジェクト = 状態 + その状態を扱う振る舞い
クラス       = オブジェクトを作る設計図の一種
```

たとえば「銀行口座」を雑にモデル化するなら、

```ts
class BankAccount {
  private balance = 0;

  deposit(amount: number) {
    if (amount <= 0) throw new Error('invalid amount');
    this.balance += amount;
  }

  getBalance() {
    return this.balance;
  }
}
```

となる。

`balance`という状態と、`deposit()`という振る舞いが同じまとまりに入っている。

外側のコードが勝手に残高を書き換えず、`deposit()`というルールを通る。これがencapsulationの分かりやすい例である。

---

## 5. OOPの本質は「現実世界を再現すること」ではない

> **Simple English:** Objects are useful boundaries, not tiny copies of the real world.

OOPの入門では、「犬」「車」「銀行口座」のような現実世界のものをクラスにする例が多い。

これは理解しやすい。

ただ、そこに引っ張られすぎると、

> 現実世界の名詞を全部クラスにすればよい

という誤解が生まれる。

実務上もっと重要なのは、**変更理由を閉じ込められる境界を作ること**である。

たとえば、

```ts
interface MemoRepository {
  save(memo: Memo): Promise<void>;
}
```

というinterfaceを置く。

その裏側は、

```text
LocalStorageMemoRepository
CloudMemoRepository
EncryptedMemoRepository
```

のどれでもよい。

メモを作る側は、具体的な保存技術を知らなくてよくなる。

つまりOOPの力は、「世界を物体として表現できる」こと以上に、**実装の詳細を境界の向こうへ追い出せること**にある。

---

## 6. Encapsulation――知らなくていいことを増やす

> **Simple English:** Encapsulation reduces what other parts of the program need to know.

encapsulationは日本語で「カプセル化」と呼ばれる。

単に`private`を付けることではない。

本質は、

**外側が知る必要のない事情を内側へ隠すこと**

である。

たとえば、メモ保存が、

```text
圧縮
→ 暗号化
→ API送信
→ リトライ
→ ローカルキャッシュ更新
```

という複雑な処理でも、外からは、

```ts
await repository.save(memo);
```

だけにできる。

「知らなくていいこと」が増えるほど、一部分を変更したときの影響範囲を狭くできる。

これはOOPだけの思想ではない。モジュール設計、API設計、アーキテクチャ設計にもそのままつながる。

---

## 7. Abstraction――違いを消すのではなく、必要な違いだけ残す

> **Simple English:** Abstraction keeps the details that matter for the current problem.

abstractionは「抽象化」と訳される。

抽象化というと、難しく一般化することに見える。

しかし本質は、**今の目的に不要な詳細を捨てること**に近い。

たとえば保存先がLocalStorageでもクラウドでも、呼び出し側が必要なのは、

```ts
save(memo)
load(id)
```

だけかもしれない。

通信方式、SQL、暗号方式まで毎回意識する必要はない。

抽象化は、情報を減らして理解可能な単位を作る。

ただし、抽象化しすぎると逆に分かりにくくなる。

まだ一種類しか存在しない処理に、将来を想像してインターフェースを五層重ねるような設計は、柔軟というより単に遠回りになることもある。

---

## 8. Inheritance――便利だが、OOPそのものではない

> **Simple English:** Inheritance is one tool, not the goal of OOP.

inheritance、継承は、既存クラスの状態や振る舞いを受け継ぎ、特殊化する仕組みである。

```text
Account
├─ SavingsAccount
├─ CreditAccount
└─ GiftCardAccount
```

のような構造で使える。

ただし、継承を使えば使うほどオブジェクト指向らしくなるわけではない。

親クラスの変更が子クラスへ広く波及すると、むしろ結合が強くなる。

そのため実務では、継承よりも、必要な部品を組み合わせる**composition（合成）**を選ぶ場面も多い。

```ts
class MemoService {
  constructor(
    private repository: MemoRepository,
    private clock: Clock
  ) {}
}
```

`MemoService`は`Repository`を継承しているのではなく、必要な部品として受け取っている。

これなら部品を交換しやすい。

---

## 9. Polymorphism――「同じ呼び方」で中身を差し替える

> **Simple English:** Polymorphism lets different implementations answer the same request.

polymorphismは「多態性」と訳される。

言葉は難しいが、感覚は単純である。

```ts
await repository.save(memo);
```

という同じ呼び出しに対して、実際の`repository`が、

- LocalStorageへ保存する
- サーバーへ送る
- 暗号化して保存する

のどれでもよい。

呼び出し側は違いを知らない。

ここで、encapsulation、abstraction、polymorphismがつながる。

```text
詳細を隠す
↓
共通の入口を作る
↓
実装を差し替えられる
```

この構造が、変更への耐性を作る。

---

## 10. アーキテクチャとOOPの関係

> **Simple English:** Architecture chooses the big boundaries. OOP can shape the smaller ones.

ここで二つを重ねる。

```text
システム全体
│
├─ Architecture
│   ├─ どの領域に分けるか
│   ├─ どちら向きに依存するか
│   ├─ データをどこが持つか
│   ├─ どこで外部システムと接続するか
│   └─ 何を独立して変更・配備したいか
│
└─ OOP / 関数型 / 手続き型など
    ├─ モジュール内部の責務をどう分けるか
    ├─ 状態をどこへ閉じ込めるか
    ├─ 共通インターフェースをどう作るか
    └─ 変更をどこまで局所化するか
```

OOPはアーキテクチャではない。

逆に、アーキテクチャがOOPを必須とするわけでもない。

関数型プログラミングでも、手続き型でも、良いアーキテクチャは作れる。

重要なのは、**スケールが違う**という理解である。

---

## 11. 凝集度と結合度――「何を一緒にし、何を離すか」

> **Simple English:** Keep things together when they change together. Separate things that should change independently.

設計の会話で頻出する二つの言葉がある。

### 凝集度（cohesion）

一つのモジュールやクラスの中に、関係の深い責務がまとまっている度合い。

### 結合度（coupling）

別のモジュール同士が、どれだけ強く相手の詳細へ依存しているか。

一般に目指したいのは、

**高凝集・疎結合**

である。

Microsoftのマイクロサービス設計ガイドも、同時に変わりやすい機能は一緒にまとめること、サービス間を疎結合にすることを重視している。

この考え方はマイクロサービスだけのものではない。

一つの関数、一つのクラス、一つのフォルダ、一つのサービス、チーム構造まで、同じ問いが繰り返される。

> これは一緒に変わるのか。それとも別々に変えたいのか。

この問いはかなり強い。

---

## 12. レイヤードアーキテクチャ――まず「責務の層」を分ける

> **Simple English:** Layers separate different kinds of responsibility.

代表的な考え方の一つがlayered architectureである。

たとえば、

```text
Presentation / UI
       ↓
Application
       ↓
Domain
       ↓
Infrastructure
```

のように責務を分ける。

具体例なら、

```text
UI
「保存」ボタンを受け取る

Application
メモ保存というユースケースを進める

Domain
メモとして正しいか、どんなルールを持つか

Infrastructure
LocalStorageやDB、外部APIへ実際に保存する
```

となる。

ここでの価値は、フォルダが四つになることではない。

**UI変更とデータベース変更と業務ルール変更を、できるだけ別々に扱えること**にある。

---

## 13. 「依存関係の向き」を設計する

> **Simple English:** Dependency direction often matters more than folder names.

見た目上きれいに層を分けても、Domainが特定のデータベースSDKを直接呼んでいたら、内側のロジックが外部技術に引っ張られる。

そこでinterfaceを使う。

```ts
interface MemoRepository {
  save(memo: Memo): Promise<void>;
}
```

DomainやApplicationはこの抽象へ依存する。

具体的なクラウド保存は外側で実装する。

```ts
class CloudMemoRepository implements MemoRepository {
  async save(memo: Memo) {
    // APIへ送信
  }
}
```

すると概念上の向きは、

```text
Application → MemoRepository ← CloudMemoRepository
```

になる。

外部技術が内側のルールを支えるのであって、内側のルールが外部技術へ全面的に従属しない。

これがdependency inversionやhexagonal / clean系の設計を理解するときの入口になる。

名前を覚えるより、「何を守るために依存を逆向きにしているのか」を先に見る方が理解しやすい。

---

## 14. MVC、Clean Architecture、Hexagonal Architectureは何が違うのか

> **Simple English:** Architecture names are patterns of boundaries, not magic recipes.

ここから用語の位置関係を整理する。

### MVC

Model / View / Controllerへ責務を分ける考え方。

主にユーザー入力、表示、データやロジックを分けるための入口として理解しやすい。

### Layered Architecture

Presentation / Application / Domain / Infrastructureのように、役割の異なる層を分ける。

### Hexagonal Architecture

中心のアプリケーションロジックと、DB・UI・外部APIのような外部世界をport / adapterで切り離す考え方。

### Clean Architecture

中心のルールを外部技術から守り、依存関係を内側へ向ける考え方として知られる。

細かい流派の違いはある。

ただ、初心者の段階では、

```text
大事なルールを中心に置く
外部技術を端へ追い出す
境界をinterfaceでつなぐ
```

という共通感覚をつかむ方が役に立つ。

---

## 15. マイクロサービスは「小さいクラス」の話ではない

> **Simple English:** Microservices split deployable systems, not merely code files.

microservices architectureは、アプリケーションを小さく自律的なサービスへ分解し、APIなどで連携させる設計スタイルである。

ここで分ける単位は、単なるクラスではない。

サービスごとに、

- 独立して開発できる
- 独立してデプロイできる
- 必要なら独立してスケールできる
- データの所有境界を持つ

といった性質を持たせる。

強力だが、無料ではない。

MicrosoftのArchitecture Centerも、マイクロサービスにはサービス探索、データ整合性、分散システム運用などの複雑さが増えると説明している。

つまり、

**巨大な一枚岩が怖いから、最初から全部マイクロサービスにする**

という判断は危ない。

分割によって減る複雑さと、ネットワーク越しに分けることで増える複雑さの交換条件を見る必要がある。

---

## 16. Event-driven Architecture――「呼びに行く」以外のつなぎ方

> **Simple English:** Event-driven systems react to events instead of tightly calling each other.

event-driven architectureでは、ある処理が別の処理を直接呼び出す代わりに、イベントを発行する。

```text
注文確定
  ↓
OrderPlaced event
  ├─ メール送信
  ├─ 在庫更新
  └─ 分析記録
```

注文処理側は、誰がそのイベントを使うか細かく知らなくてよい。

Microsoftの説明でも、event producerとconsumerを切り離せることが主要な利点とされる。

一方で、順序保証、再試行、重複処理、eventual consistencyなど、新しい難しさが出る。

ここでもアーキテクチャは「かっこいい方式を選ぶ」話ではない。

**どの複雑さを引き受けるかを選ぶ話**である。

---

## 17. デザインパターンは「答え」ではなく共通語彙

> **Simple English:** A design pattern is a reusable idea, not a copy-paste solution.

Factory、Strategy、Observer、Adapter、Repositoryなどのdesign patternも頻出する。

これらは、よく起きる設計問題に対する再利用可能な考え方である。

たとえばStrategyなら、

```text
料金計算
├─ 通常料金
├─ 学生料金
└─ 会員料金
```

のように、計算方法を差し替えられる形にする。

ただし、パターン名を増やすことが設計力ではない。

必要のない場所へPatternを適用すると、コードはむしろ読みにくくなる。

パターンは、問題を見つけたあとに使う道具であって、問題を作ってまで当てはめるものではない。

---

## 18. SOLIDはどこにいるのか

> **Simple English:** SOLID is a set of design heuristics, mainly for managing responsibilities and dependencies.

SOLIDは、オブジェクト指向設計でよく使われる五つの原則の頭文字である。

```text
S Single Responsibility Principle
O Open/Closed Principle
L Liskov Substitution Principle
I Interface Segregation Principle
D Dependency Inversion Principle
```

名前だけ見ると暗記科目っぽい。

しかし、ここまでの話へ戻すと、だいたい同じ問いをしている。

- 責務を詰め込みすぎていないか
- 変更の影響を狭くできないか
- 抽象と実装を適切に分けられないか
- 一つの巨大interfaceへ全員を依存させていないか
- 外部詳細へ内側のルールが引きずられていないか

SOLIDはアーキテクチャそのものではない。

ただし、小さな単位で依存関係を整えるためのheuristicsとして、アーキテクチャの思想とつながる。

---

## 19. 「良い設計」は最初に完成しない

> **Simple English:** Architecture evolves as we learn more about the system.

設計という言葉には、コードを書く前に完璧な図面を完成させるイメージがある。

しかしソフトウェアでは、実際に作って初めて分かることが多い。

Fowlerも、良いアーキテクチャは最初の一回で完成するものではなく、プロダクトについて学びながら改訂される必要があると強調している。

そこで重要になるのがrefactoringである。

refactoringは、外から見える動作を変えずに内部構造を改善すること。

```text
動かす
↓
分かる
↓
違和感が見える
↓
分け直す
↓
また動かす
```

良い設計は「最初から未来を全部当てた設計」ではない。

**間違いに気づいたとき、安全に直せる設計**である。

---

## 20. ADR――「なぜそうしたか」を残す

> **Simple English:** Record important decisions, not only final diagrams.

数か月後のコードで困るのは、「なぜこの構造なのか」が分からないことである。

そこで使われるのが**Architecture Decision Record（ADR）**である。

FowlerはADRを、プロダクトやシステムにとって重要な一つの判断について、context、decision、significant ramificationsなどを短く記録する文書として説明している。

たとえば、

```text
Context
オフライン利用が必須。通信は不安定。

Decision
編集内容をまずIndexedDBへ保存し、同期を非同期化する。

Consequences
競合解決が必要になる。
リアルタイム完全一致は保証しない。
```

のように残す。

コードが「何になったか」を示すなら、ADRは「なぜそうなったか」を残す。

アーキテクチャでは、完成図より判断履歴の方が価値を持つ場面も多い。

---

## 21. よくある失敗1――God Class

> **Simple English:** One object should not become the whole application.

OOPを使っていても、一つのクラスに全部入れれば設計は崩れる。

```text
AppManager
├─ ログイン
├─ 保存
├─ 検索
├─ 課金
├─ 通知
├─ UI制御
├─ API通信
└─ エラー処理
```

これはGod Classと呼ばれる典型的な状態である。

クラスを使っているからオブジェクト指向なのではない。

**責務の境界を作れているか**が重要になる。

---

## 22. よくある失敗2――抽象化の先回り

> **Simple English:** Do not build five layers for a change that may never happen.

変更に強くしたいと思うほど、将来の可能性を全部吸収したくなる。

しかし、

```text
AbstractMemoFactoryProvider
↓
MemoFactoryAdapter
↓
MemoServiceFacade
↓
MemoRepositoryProxy
```

のように層を増やせば、読むコストも増える。

変更可能性に備えることと、存在しない要求を想像して複雑化することは違う。

良い抽象は、実際の違いが見えてから生まれることが多い。

---

## 23. よくある失敗3――流行のアーキテクチャを目的化する

> **Simple English:** Choose architecture for your problem, not for prestige.

microservices、event-driven、DDD、Clean Architecture。

どれも強い考え方だが、採用しただけでは価値にならない。

たとえば、一人で作る小さなツールにサービスを十個立てれば、

- デプロイ先が増える
- 認証が増える
- ログが分散する
- 通信失敗を考える必要が出る
- ローカル開発が面倒になる

というコストが増える。

アーキテクチャは「高度さランキング」ではない。

**問題に対して、最も安く持続可能な複雑さを選ぶこと**が重要になる。

---

## 24. OOPを使わない設計も普通にある

> **Simple English:** Good architecture does not require object-oriented programming.

OOPは強力だが、唯一の方法ではない。

たとえばデータ変換処理なら、

```text
入力
↓
parse
↓
normalize
↓
filter
↓
aggregate
↓
出力
```

という関数のパイプラインの方が分かりやすいこともある。

ゲームや高性能計算ではdata-oriented designが有利な場面もある。

単純なスクリプトなら手続き型で十分なことも多い。

だから、

```text
OOPを使う = 良い設計
```

ではない。

正しくは、

```text
問題の性質に合う境界と表現を選ぶ = 良い設計へ近づく
```

である。

---

## 25. 初心者がコードを見るときの5つの質問

> **Simple English:** Ask where change will spread.

用語を暗記するより、コードを見るたびに次を聞く方が設計感覚は育ちやすい。

### 1. このコードの責任は何か

一文で言えないなら、責務が混ざっている可能性がある。

### 2. 何が変わったら、このコードも変わるか

変更理由を考える。

### 3. この変更は何ファイルへ波及するか

影響範囲を見る。

### 4. この部分は、他の部分の内部事情を知りすぎていないか

結合度を見る。

### 5. 外部技術を変えたとき、中心ロジックまで壊れるか

依存関係の方向を見る。

この五問だけでも、architecture、OOP、SOLID、clean系の話がかなり同じ地図上へ乗ってくる。

---

## 26. 一枚の概念地図

> **Simple English:** Architecture is the map; programming paradigms are tools used inside the map.

最後に、全体を一枚へまとめる。

```text
Software Design
│
├─ Architecture
│   │  システム全体の重要な境界・依存・データ・進化原則
│   │
│   ├─ Layered
│   ├─ Hexagonal / Clean-like
│   ├─ Microservices
│   └─ Event-driven
│
├─ Module / API Design
│   │  何を公開し、何を隠すか
│   │
│   ├─ cohesion
│   ├─ coupling
│   └─ interfaces
│
├─ Programming Paradigm
│   │
│   ├─ OOP
│   │   ├─ abstraction
│   │   ├─ encapsulation
│   │   ├─ inheritance
│   │   └─ polymorphism
│   │
│   ├─ Functional
│   └─ Procedural
│
├─ Design Principles
│   └─ SOLID など
│
├─ Design Patterns
│   └─ Strategy / Adapter / Repository / Observer ...
│
└─ Evolution
    ├─ refactoring
    ├─ automated testing
    └─ ADR
```

これらは別々の暗記項目ではない。

すべて、

**複雑さをどこへ置き、変更をどこで止めるか**

という問いの別の縮尺である。

---

## 27. 結論――設計とは、変更の地図を描くこと

> **Simple English:** Good design gives change a place to go.

アーキテクチャ設計を「上級エンジニアが描く巨大な図」と考えると、急に遠い世界になる。

OOPを「クラス、継承、ポリモーフィズムの暗記」と考えても、たぶん面白くない。

もう少し身近に言い換えられる。

**アーキテクチャは、変更が起きたときに影響をどこで止めるかを決める地図である。**

**OOPは、その地図の中で状態と振る舞いをまとまりにし、知らなくていい情報を増やすための道具の一つである。**

そして設計の良し悪しは、図が美しいか、パターン名をたくさん知っているかでは決まらない。

新しい要求が来たとき、

> あ、ここを変えれば済むな。

と言える範囲がどれだけ小さいか。

そこに、設計のかなり本質的な価値がある。

---

## 参考資料

- ISO/IEC/IEEE 42010, “Defining architecture”  
  https://www.iso-architecture.org/ieee-1471/defining-architecture.html
- Martin Fowler, “Software Architecture Guide”  
  https://martinfowler.com/architecture/
- Martin Fowler, “Architecture Decision Record”  
  https://martinfowler.com/bliki/ArchitectureDecisionRecord.html
- Microsoft Learn, “Object-Oriented programming (C#)”  
  https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/tutorials/oop
- Oracle Java Tutorials, “Object-Oriented Programming Concepts”  
  https://docs.oracle.com/javase/tutorial/java/concepts/
- Microsoft Azure Architecture Center, “Architecture styles”  
  https://learn.microsoft.com/en-us/azure/architecture/guide/architecture-styles/
- Microsoft Azure Architecture Center, “Microservices architecture style”  
  https://learn.microsoft.com/en-us/azure/architecture/microservices/
- Microsoft Azure Architecture Center, “Event-Driven Architecture Style”  
  https://learn.microsoft.com/en-us/azure/architecture/guide/architecture-styles/event-driven
