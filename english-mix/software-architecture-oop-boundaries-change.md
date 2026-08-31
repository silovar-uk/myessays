---
id: software-architecture-oop-boundaries-change
title: "Software ArchitectureとOOPとは何か"
subtitle: "Where should responsibility live?――変更に耐えるsoftware designの地図"
created: "2026-08-31"
updated: "2026-08-31"
type: "Learning Paper"
status: "完成"
tags: ["ソフトウェア設計", "アーキテクチャ", "OOP", "オブジェクト指向", "モジュール", "依存関係", "リファクタリング", "ADR"]
keywords: ["software architecture", "object-oriented programming", "OOP", "encapsulation", "abstraction", "inheritance", "polymorphism", "coupling", "cohesion", "modularity", "architecture decision record", "microservices", "event-driven architecture"]
favorite: 4
grow: 5
abstract: "Software architectureとOOPを、別々の暗記項目ではなく『complexityとchangeをどう制御するか』という一つの地図として整理する。Architectureはsystem-levelの重要なboundaries, dependencies, data ownership, evolution principlesを扱い、OOPはstateとbehaviorをobjectsへまとめて責務と実装詳細を局所化する一つの手段。本稿ではencapsulation, abstraction, inheritance, polymorphismから、cohesion/coupling、layered architecture、microservices、event-driven、design patterns、refactoring、ADRまでをつなぐ。"
---

# Software ArchitectureとOOPとは何か
## Where should responsibility live?――変更に耐えるsoftware designの地図

### 要旨

> **Simple English:** Good software design is mostly about managing change.

Programmingを少し始めると、急にtermsが増える。

- architecture
- OOP
- class
- object
- interface
- SOLID
- design pattern
- MVC
- layered architecture
- clean architecture
- microservices
- loose coupling
- cohesion

全部designの話に見えるけど、scaleが違う。

先に結論を置く。

**Architecture decides the big boundaries: what to separate, what to connect, and which dependencies are allowed. OOP is one way to organize responsibilities, state, and behavior inside those boundaries.**

そして両方の共通テーマは、コードを「賢そう」にすることではなく、**changeを局所化すること**にある。

---

## 1. Designとは、responsibilityをどこへ置くか

> **Simple English:** Design decides where responsibilities should live.

Small scriptなら、思いついた順に書いても普通に動く。

```js
const memo = input.value;
localStorage.setItem('memo', memo);
alert('saved');
```

でもrequirementsが増える。

- editしたい
- cloudにもsaveしたい
- loginを付けたい
- historyを残したい
- multi-device syncしたい
- offlineでも使いたい

すると、一つだった処理が絡まり始める。

ここでdesignが必要になる。

Designの基本質問は、意外と単純。

**Where should this responsibility live?**

保存処理をUIが持つのか。専用moduleが持つのか。Authenticationとmemo editingは同じ場所に置くのか。Databaseを変えたら何file直すのか。

設計とは、future changeに備えてcomplexityの置き場所を決めること、と考えると分かりやすい。

---

## 2. Architectureは“the important stuff”

> **Simple English:** Architecture is about the important parts and their relationships.

ISO/IEC/IEEE 42010系の定義では、architectureはsystem in its environmentの**fundamental concepts or properties**であり、それがelements, relationships, design and evolution principlesに表れるものと整理される。

つまりarchitectureは、every detailではない。

Martin Fowlerはsoftware architectureの議論を紹介しつつ、核心を**“the important stuff”**と表現する。

たとえばmemo appなら、

```text
UI
 ↓
Application logic
 ↓
Storage interface
 ↓
LocalStorage / API / Database
```

というdependency directionはarchitecture-levelの判断になりやすい。

一方、button paddingを12pxにするか16pxにするかもdesignではあるが、通常はarchitectureの中心ではない。

なので、まずはこう整理できる。

```text
Design       = many decisions
Architecture = decisions that strongly shape the system and future change
```

---

## 3. Architectureはdiagramそのものではない

> **Simple English:** A diagram describes architecture; it is not the architecture itself.

Architectureと聞くとboxes and arrowsを描きたくなる。

Diagramは便利。でも図そのものがarchitectureではない。

大事なのは、**why this boundary exists**である。

```text
Things that change for different reasons → separate
Failures that should not spread          → separate
Teams that need independent change       → separate
External technology details              → isolate
```

Beautiful diagramでもdependencyが無秩序なら弱い。

Simple diagramでも、「which direction may depend on which」が共有されていれば強い。

---

## 4. OOPとは何か

> **Simple English:** OOP organizes software around objects that combine state and behavior.

OOP = **Object-Oriented Programming**。

OracleのJava教材はobjectを、related **state and behavior**をまとめたsoftware bundleとして説明する。

Microsoft Learnでは、OOPの基本principlesとして次を挙げる。

- Abstraction
- Encapsulation
- Inheritance
- Polymorphism

最初は、

```text
Object = state + behavior
Class  = one kind of blueprint for objects
```

くらいでよい。

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

`balance`というstateと、`deposit()`というbehaviorが同じboundaryにいる。

外側は勝手にbalanceを書き換えず、public behaviorを通る。

That is a simple form of encapsulation.

---

## 5. OOPは“real world objectsをコピーする技法”ではない

> **Simple English:** Objects are useful boundaries, not tiny copies of the real world.

OOP入門ではDog, Car, BankAccountの例が多い。

分かりやすいけど、現実世界のnounsを全部classにすればよいわけではない。

実務で大事なのは、**a boundary that contains a reason for change**を作れること。

```ts
interface MemoRepository {
  save(memo: Memo): Promise<void>;
}
```

裏側は、

```text
LocalStorageMemoRepository
CloudMemoRepository
EncryptedMemoRepository
```

のどれでもよい。

Caller does not need to know the concrete storage technology.

OOPの強さは、世界を物体化すること以上に、**implementation detailsをboundaryの向こうへ追い出せること**にある。

---

## 6. Encapsulation――reduce what others need to know

> **Simple English:** Encapsulation reduces what other parts of the program need to know.

Encapsulationは単に`private` keywordを使うことではない。

本質は、**hide internal details that outsiders do not need**。

保存の中身が、

```text
compress
→ encrypt
→ send API request
→ retry
→ update cache
```

でも、外からは、

```ts
await repository.save(memo);
```

だけで済む。

The less each part needs to know, the smaller the blast radius of change.

この思想はOOPだけでなく、module design, API design, architectureにも続いていく。

---

## 7. Abstraction――keep only details that matter

> **Simple English:** Abstraction keeps the details that matter for the current problem.

Abstractionは、何でもgeneralizeすることではない。

むしろ、**今のproblemに不要なdetailを捨てること**に近い。

LocalStorageでもCloudでも、callerに必要なのが、

```ts
save(memo)
load(id)
```

だけなら、そのinterfaceだけ見せればよい。

SQLやHTTPやencryption implementationを毎回見る必要はない。

ただしtoo much abstractionもcostになる。

まだ一種類しかない処理へfive layers of interfacesを置くと、flexibilityよりreading costが勝つこともある。

---

## 8. Inheritance――one tool, not the goal

> **Simple English:** Inheritance is one tool, not the goal of OOP.

Inheritanceは既存classをbaseに、新しいspecialized behaviorを作る仕組み。

```text
Account
├─ SavingsAccount
├─ CreditAccount
└─ GiftCardAccount
```

ただし、more inheritance ≠ better OOP。

Parent classの変更がchild classesへ波及するとcouplingが強くなる。

だからcompositionを選ぶ場面も多い。

```ts
class MemoService {
  constructor(
    private repository: MemoRepository,
    private clock: Clock
  ) {}
}
```

`MemoService` is composed of collaborators. It does not need to inherit from them.

部品を差し替えやすい。

---

## 9. Polymorphism――same request, different implementation

> **Simple English:** Polymorphism lets different implementations answer the same request.

```ts
await repository.save(memo);
```

Same callでも、実体は、

- save to LocalStorage
- send to server
- encrypt and save

のどれでもよい。

Callerは違いを知らない。

```text
hide details
↓
expose a common interface
↓
swap implementations
```

Encapsulation, abstraction, polymorphismが一つにつながる。

---

## 10. ArchitectureとOOPのscaleは違う

> **Simple English:** Architecture chooses the big boundaries. OOP can shape smaller ones.

```text
System
│
├─ Architecture
│   ├─ major boundaries
│   ├─ dependency direction
│   ├─ data ownership
│   ├─ external integrations
│   └─ deployment boundaries
│
└─ OOP / Functional / Procedural ...
    ├─ responsibilities inside modules
    ├─ where state lives
    ├─ interfaces
    └─ local change boundaries
```

OOP is not architecture.

Architecture does not require OOP either.

Functional programmingでもprocedural programmingでもgood architectureは作れる。

大事なのはscaleを混同しないこと。

---

## 11. CohesionとCoupling

> **Simple English:** Keep things together when they change together. Separate things that should change independently.

**Cohesion**は、一つのmoduleの中にrelated responsibilitiesがまとまっている度合い。

**Coupling**は、別module同士がどれくらい相手のdetailへ依存しているか。

よく使われる目標は、

**high cohesion, loose coupling**。

Microsoftのmicroservices guidanceでも、functions likely to change together should be packaged together、servicesはloose couplingを保つべきだとされる。

これはserviceだけの話ではない。

Function, class, folder, service, team――どのscaleでも同じ問いが出てくる。

> Do these things change together, or should they change independently?

---

## 12. Layered Architecture――separate kinds of responsibility

> **Simple English:** Layers separate different kinds of responsibility.

典型例は、

```text
Presentation / UI
       ↓
Application
       ↓
Domain
       ↓
Infrastructure
```

Memo appなら、

```text
UI             receive click
Application    run "save memo" use case
Domain         enforce memo rules
Infrastructure actually store data
```

Valueはfoldersが四つになることではない。

**UI change, database change, business-rule changeを別々に扱いやすくすること**にある。

---

## 13. Dependency direction matters

> **Simple English:** Dependency direction often matters more than folder names.

Domainが特定database SDKを直接呼ぶと、core ruleがexternal technologyへ引っ張られる。

そこでinterfaceを置く。

```ts
interface MemoRepository {
  save(memo: Memo): Promise<void>;
}
```

Applicationはabstractionへ依存し、outer layerがconcrete implementationを提供する。

```text
Application → MemoRepository ← CloudMemoRepository
```

External detail supports the core, instead of owning it.

Dependency inversionやhexagonal / clean-like architectureは、この感覚から入ると理解しやすい。

---

## 14. MVC / Layered / Hexagonal / Clean

> **Simple English:** Architecture names are patterns of boundaries, not magic recipes.

### MVC

Model / View / Controllerへresponsibilityを分ける。

### Layered Architecture

Presentation / Application / Domain / Infrastructureのようなlayersへ分ける。

### Hexagonal Architecture

Core applicationとexternal worldをports and adaptersで切る。

### Clean Architecture

Core rulesを外部technologyから守り、dependenciesをinsideへ向ける発想として理解できる。

流派差はあるけど、最初は共通部分が大事。

```text
protect important rules
push external details outward
connect through boundaries
```

---

## 15. Microservicesは“small classes”ではない

> **Simple English:** Microservices split deployable systems, not merely code files.

Microservices architectureはapplicationをsmall autonomous servicesへ分解するstyle。

Serviceごとに、

- independent development
- independent deployment
- independent scaling
- clear data ownership

を目指す。

Powerfulだけどfreeではない。

Microsoft Architecture Centerも、service discovery, data consistency, distributed-system operationsなどのcomplexityを指摘する。

Splitting removes some complexity and creates another kind.

だから「monolithが怖いから全部microservices」は答えにならない。

---

## 16. Event-driven Architecture――connect through events

> **Simple English:** Event-driven systems react to events instead of tightly calling each other.

```text
Order placed
  ↓
OrderPlaced event
  ├─ send email
  ├─ update inventory
  └─ record analytics
```

Producer does not need to know every consumer.

Microsoftもevent producerとconsumerのdecouplingを主要benefitとして挙げる。

一方、ordering, retries, duplicate processing, eventual consistencyなどnew problemsも出る。

Architecture is not choosing the coolest pattern.

**It is choosing which complexity you are willing to own.**

---

## 17. Design Patternsはshared vocabulary

> **Simple English:** A design pattern is a reusable idea, not a copy-paste solution.

Factory, Strategy, Observer, Adapter, Repositoryなどは、recurrent design problemsへのreusable ideas。

たとえばStrategyなら、

```text
Pricing
├─ normal
├─ student
└─ member
```

のようにalgorithmを差し替えられる。

でもpattern namesを増やすことがdesign skillではない。

Use a pattern because a problem exists, not because a pattern exists.

---

## 18. SOLIDはどこにいるのか

> **Simple English:** SOLID is a set of design heuristics for responsibilities and dependencies.

SOLIDは五つのdesign principlesの頭文字。

```text
S Single Responsibility Principle
O Open/Closed Principle
L Liskov Substitution Principle
I Interface Segregation Principle
D Dependency Inversion Principle
```

暗記より、共通質問を見る方がよい。

- Too many responsibilities?
- Can change be localized?
- Is abstraction separated from implementation?
- Is one huge interface forcing unnecessary dependencies?
- Is core logic controlled by external details?

SOLIDはarchitectureそのものではない。

でもsmall-scale dependency designとしてarchitectureの思想とつながっている。

---

## 19. Good architecture is not finished on day one

> **Simple English:** Architecture evolves as we learn more about the system.

Softwareはbuildして初めて分かることが多い。

Fowlerもgood architectureはfirst tryで完成せず、productについて学びながらreviseされる必要があると強調する。

そこでrefactoringが効く。

```text
make it work
↓
learn
↓
notice awkward structure
↓
refactor
↓
keep it working
```

Good design does not predict every future requirement.

**Good design makes correction affordable.**

---

## 20. ADR――record why

> **Simple English:** Record important decisions, not only final diagrams.

Months later、困るのは「why this structure exists」が消えること。

Architecture Decision Record（ADR）は、一つのimportant decisionについてcontext, decision, consequencesを短く残す方法。

```text
Context
Offline use is required.

Decision
Save locally first, then sync asynchronously.

Consequences
Conflict resolution becomes necessary.
Strong real-time consistency is not guaranteed.
```

Code tells you what the system became.

ADR helps tell you why.

---

## 21. Failure pattern: God Class

> **Simple English:** One object should not become the whole application.

```text
AppManager
├─ login
├─ storage
├─ search
├─ billing
├─ notification
├─ UI
├─ API
└─ error handling
```

Classesを使っていても、責務を全部一か所へ置けばboundaryは消える。

Using classes is not enough. Responsibility design matters.

---

## 22. Failure pattern: premature abstraction

> **Simple English:** Do not build five layers for a change that may never happen.

Future changeに備えようとして、

```text
AbstractMemoFactoryProvider
↓
MemoFactoryAdapter
↓
MemoServiceFacade
↓
MemoRepositoryProxy
```

と重ねるとreading costが増える。

Good abstraction often appears after real differences become visible.

Flexibility itself also has a price.

---

## 23. Failure pattern: architecture as prestige

> **Simple English:** Choose architecture for your problem, not for prestige.

Microservices, event-driven, DDD, Clean Architecture――全部powerful。

でもsmall one-person toolを10 servicesに分ければ、deployments, auth, logs, network failures, local developmentが増える。

Architecture is not a sophistication ranking.

**Choose the cheapest sustainable complexity for the actual problem.**

---

## 24. OOP is optional

> **Simple English:** Good architecture does not require object-oriented programming.

Data transformationなら、

```text
input
↓
parse
↓
normalize
↓
filter
↓
aggregate
↓
output
```

というfunctional pipelineの方が自然なこともある。

Simple scriptsならproceduralで十分。

Some performance-sensitive systems may prefer data-oriented approaches.

だから、

```text
OOP = good design
```

ではない。

Better rule:

```text
Choose boundaries and representations that fit the problem.
```

---

## 25. Five questions for reading code

> **Simple English:** Ask where change will spread.

### 1. What is this code responsible for?

一文で説明できるか。

### 2. What change would make this code change?

Change reasonを見る。

### 3. How far will this change spread?

Blast radiusを見る。

### 4. Does this part know too much about another part?

Couplingを見る。

### 5. If external technology changes, does core logic break?

Dependency directionを見る。

この五問でarchitecture, OOP, SOLID, clean-like designがかなり同じmapへ乗る。

---

## 26. One map

> **Simple English:** Architecture is the map; programming paradigms are tools used inside the map.

```text
Software Design
│
├─ Architecture
│   ├─ Layered
│   ├─ Hexagonal / Clean-like
│   ├─ Microservices
│   └─ Event-driven
│
├─ Module / API Design
│   ├─ cohesion
│   ├─ coupling
│   └─ interfaces
│
├─ Programming Paradigm
│   ├─ OOP
│   │   ├─ abstraction
│   │   ├─ encapsulation
│   │   ├─ inheritance
│   │   └─ polymorphism
│   ├─ Functional
│   └─ Procedural
│
├─ Design Principles
│   └─ SOLID ...
│
├─ Design Patterns
│   └─ Strategy / Adapter / Repository / Observer ...
│
└─ Evolution
    ├─ refactoring
    ├─ automated testing
    └─ ADR
```

They are not isolated vocabulary items.

全部、**where to put complexity and where to stop change**という同じquestionを、different scalesで見ている。

---

## 27. 結論――design is a map for change

> **Simple English:** Good design gives change a place to go.

Architectureを「senior engineersが描く巨大diagram」と考えると遠くなる。

OOPを「class, inheritance, polymorphismの暗記」と考えても面白くない。

もっと近く言える。

**Architecture is a map that decides where the impact of change should stop.**

**OOP is one tool for bundling state and behavior, creating boundaries, and reducing what each part needs to know.**

Design qualityはpattern名の数では決まらない。

New requirementが来たとき、

> I only need to change this part.

と言える範囲がどれだけ小さいか。

そこにsoftware designのかなり本質的な価値がある。

---

## References

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
