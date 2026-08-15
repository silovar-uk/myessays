---
id: nodejs-from-zero
title: "Node.jsとは何か"
subtitle: "「そもそもプログラムはどう動くのか」から始める、完全初心者のための概念地図"
created: "2026-08-16"
updated: "2026-08-16"
type: "Learning Paper"
status: "完成"
tags: ["Node.js", "JavaScript", "npm", "Web開発", "バックエンド", "CLI", "プログラミング", "GitHub Pages", "非同期処理", "イベントループ"]
keywords: ["Node.js", "JavaScript runtime", "V8", "libuv", "npm", "package.json", "node_modules", "event loop", "asynchronous I/O", "server", "backend", "CLI", "CommonJS", "ES Modules", "LTS"]
favorite: 4
grow: 5
abstract: "Node.jsを理解するには、いきなりnpmやサーバーの話から始めるより、「そもそもプログラムはどうやってコンピューター上で動くのか」「JavaScriptという言語と、それを動かす環境は何が違うのか」から整理した方が早い。本稿では、完全初心者を対象に、実行環境・V8・API・プロセス・I/O・非同期・イベントループ・npm・package.jsonなどの用語を必要になった順に導入する。1995年のJavaScript誕生から2009年のNode.js登場、io.js分裂と再統合、現在のOpenJS Foundationまでの歴史、Node.jsが得意な仕事と不得意な仕事、依存関係肥大化やセキュリティ、エコシステムの複雑さといった批判も含めて、一枚の概念地図として整理する。"
---

# Node.jsとは何か
## 「そもそもプログラムはどう動くのか」から始める、完全初心者のための概念地図

### 要旨

> **Simple English:** Node.js lets JavaScript run outside a web browser.

Node.jsを調べると、いきなりこんな言葉が出てくる。

- JavaScript
- サーバー
- npm
- V8
- 非同期
- イベントループ
- API
- パッケージ
- バックエンド

知識がない状態では、どれがNode.jsそのもので、どれが周辺技術なのかすら分かりにくい。

そこで本稿では、最初からNode.jsを説明しない。

まず、もっと手前から始める。

**そもそも、プログラムはどうやってコンピューター上で動くのか。**

そこから順番に考えると、Node.jsはかなり自然な存在として見えてくる。

最初に結論だけ置いておく。

**Node.jsは、JavaScriptをブラウザの外で動かすための実行環境である。**

JavaScriptという言語そのものではない。

サーバーそのものでもない。

npmでもない。

ExpressやReactのようなフレームワークでもない。

この区別を土台に、少しずつ言葉を増やしていく。

---

## 1. そもそも「プログラムを動かす」とは何か

> **Simple English:** Code is a set of instructions. Something must execute those instructions.

コンピューターは、日本語やJavaScriptをそのまま理解しているわけではない。

人間は、

```js
console.log('Hello');
```

と書けば意味を想像できる。

しかしCPUが直接扱う世界は、もっと機械寄りである。

そのため、人間が書いたプログラムを実際に動かすには、途中に**翻訳・解釈・実行を担当する仕組み**が必要になる。

ここで、最初の重要な用語を導入する。

### プログラミング言語

人間がコンピューターへの指示を書くためのルール。

JavaScript、Python、Java、C、Rubyなどがある。

### ソースコード

プログラミング言語で実際に書いた命令。

たとえば、

```js
const price = 1000;
console.log(price * 1.1);
```

これがJavaScriptのソースコードである。

### 実行環境（runtime environment）

書かれたコードを実際に動かし、外の世界とやり取りできるようにする環境。

ここがNode.js理解の中心になる。

料理でたとえるなら、

```text
プログラミング言語 = レシピを書く言語
ソースコード       = 実際のレシピ
実行環境           = レシピを実行できるキッチン
```

である。

レシピがあっても、キッチンがなければ料理はできない。

同じように、JavaScriptのコードがあっても、それを実行する環境が必要になる。

---

## 2. JavaScriptは「ブラウザ専用の言語」ではない

> **Simple English:** JavaScript is a language. A browser is one environment that can run it.

JavaScriptは長く「Webページを動かす言語」というイメージを持たれてきた。

それ自体は間違いではない。

ブラウザではJavaScriptを使って、

- ボタンを押したらメニューを開く
- 入力内容をチェックする
- 画像を切り替える
- APIからデータを取得する
- HTMLを書き換える

といった処理ができる。

しかし、ここで一つ分けて考える必要がある。

**JavaScriptという言語**と、**ブラウザがJavaScriptに与えている機能**は別物である。

たとえば、

```js
document.querySelector('button');
```

の`document`は、JavaScriptという言語そのものに最初から含まれているわけではない。

Webブラウザが提供している機能である。

MDNも、JavaScriptのコア言語は純粋な計算ロジックに集中し、ファイル読み込みやネットワーク通信のような入出力は実行環境側が提供すると整理している。

つまり、

```text
JavaScript
  └ 言語そのもの

ブラウザ
  ├ JavaScriptを実行する
  ├ DOMを提供する
  ├ windowを提供する
  ├ 画面を描画する
  └ Web APIを提供する
```

という関係である。

この「言語」と「それを動かす場所」を分けられると、Node.jsが見えてくる。

---

## 3. Node.jsとは何か

> **Simple English:** Node.js is a JavaScript runtime outside the browser.

Node.js公式は、Node.jsを**オープンソースでクロスプラットフォームなJavaScript実行環境**と定義している。

噛み砕けば、

**ブラウザを開かなくても、JavaScriptをPCやサーバー上の普通のプログラムとして動かせる仕組み**である。

たとえば`hello.js`というファイルを作る。

```js
console.log('Hello, Node.js');
```

Node.jsをインストールしたPCで、ターミナルから、

```bash
node hello.js
```

と実行する。

すると、

```text
あなた
  ↓
node hello.js
  ↓
Node.jsがファイルを読む
  ↓
JavaScriptを実行する
  ↓
Hello, Node.js
```

となる。

HTMLは必要ない。

ブラウザのタブも必要ない。

これがNode.jsの最初の革命である。

---

## 4. Node.jsは「JavaScriptをサーバーで使うもの」なのか

> **Simple English:** Node.js can run servers, but Node.js itself is not a server.

Node.jsはよく、

> JavaScriptをサーバー側で動かすもの

と説明される。

初心者向けの入口としてはかなり近い。

ただし、少し雑である。

正確には、

**Node.jsはJavaScriptをブラウザ外で動かす実行環境であり、その代表的な用途の一つがサーバーである。**

Node.jsでは、たとえば次のようなことができる。

- Webサーバーを動かす
- APIを作る
- ファイルを一括処理する
- CSVやJSONを変換する
- 画像処理の補助ツールを動かす
- CLIツールを作る
- Webサイトのビルド処理を動かす
- テストを実行する
- 開発用サーバーを立てる

つまり、Node.jsの用途は「サーバー」に閉じていない。

---

## 5. ブラウザとNode.jsは、同じJavaScriptでも持っている道具が違う

> **Simple English:** Same language, different environment, different APIs.

ここで**API**という言葉を導入する。

APIは文脈によって意味が広いが、ここではまず、

**プログラムから利用できる機能の入口**

くらいに考えればよい。

ブラウザはWebページを扱うためのAPIを持つ。

```text
ブラウザ
  ├ DOM
  ├ document
  ├ window
  ├ location
  ├ localStorage
  └ 画面やユーザー操作に関するAPI
```

Node.jsはPCやサーバー上で仕事をするためのAPIを持つ。

```text
Node.js
  ├ ファイルシステム
  ├ HTTP通信
  ├ TCP通信
  ├ OS情報
  ├ プロセス情報
  ├ タイマー
  └ 暗号・ストリームなど
```

たとえばNode.jsなら、ファイルを読める。

```js
import { readFile } from 'node:fs/promises';

const text = await readFile('memo.txt', 'utf8');
console.log(text);
```

一方、通常のWebページ上のJavaScriptが、ユーザーのPCの好きなファイルを勝手に読むことはできない。

それができたら危険だからである。

つまり、

**同じJavaScriptでも、どの実行環境にいるかによって「できること」が変わる。**

これはNode.jsだけでなく、プログラミング全般で重要な考え方である。

---

## 6. Node.jsの中身：V8とは何か

> **Simple English:** V8 is the JavaScript engine. Node.js is the larger runtime around it.

さらに一段だけ中を見る。

Node.jsは、JavaScriptコードを実行する中心部分として**V8**を使っている。

V8はGoogle Chromeでも利用されているJavaScriptエンジンである。

ここで、**JavaScriptエンジン**という用語を導入する。

JavaScriptエンジンとは、JavaScriptのコードを読み取り、実際に計算として実行する中核部分である。

構造を大幅に単純化すると、

```text
JavaScriptコード
      ↓
   Node.js
      ↓
      V8
      ↓
CPU上で処理が進む
```

となる。

しかしNode.jsはV8だけではない。

Node.jsはV8の周囲に、ファイル、ネットワーク、タイマー、プロセス、暗号化などの機能を組み合わせている。

だから、

```text
V8      = JavaScriptを実行するエンジン
Node.js = V8を中心に、ブラウザ外で実用的にJavaScriptを動かす環境
```

と覚えるとよい。

---

## 7. なぜNode.jsが必要だったのか

> **Simple English:** Servers spend a lot of time waiting for input and output.

ここからNode.jsの背景に入る。

Webサーバーの仕事を考えてみる。

サーバーは、ずっと難しい計算をしているわけではない。

むしろ多くの時間を、何かの**待ち時間**に使っている。

たとえば、

```text
ユーザーから通信が届くのを待つ
        ↓
データベースの返事を待つ
        ↓
別のAPIの返事を待つ
        ↓
ファイル読み込みを待つ
        ↓
ユーザーへ返す
```

この「外部とのやり取り」をまとめて**I/O（Input / Output、入出力）**と呼ぶ。

ファイル読み書き、ネットワーク通信、データベースアクセスなどが典型的なI/Oである。

Node.jsが特に重視したのは、

**I/O待ちでプログラム全体を止めないこと**

だった。

ここで、Node.jsを語ると必ず出てくる「非同期」が必要になる。

---

## 8. 同期と非同期を、レストランで考える

> **Simple English:** Asynchronous code can do other work while waiting.

### 同期処理

一つの仕事が終わるまで、次へ進まない考え方。

レストランでたとえると、店員が、

```text
客Aの料理を注文
↓
厨房の前で完成まで10分待つ
↓
客Aへ運ぶ
↓
初めて客Bの注文を聞く
```

ような状態である。

待ち時間がもったいない。

### 非同期処理

待っている間に、別の仕事へ進む考え方。

```text
客Aの料理を厨房へ依頼
↓
完成を待たず客Bの注文を聞く
↓
客Cの会計をする
↓
料理完成の知らせが来る
↓
客Aへ運ぶ
```

これが非同期処理の感覚に近い。

Node.jsでは、ネットワークやファイルなどのI/Oを待っている間に、別の処理を進めやすい設計になっている。

Node.js公式も、ファイル、データベース、ネットワークなどのI/Oで待ち続ける代わりに、処理が戻ってきたとき再開する非ブロッキングな設計を説明している。

---

## 9. 「ブロッキング」と「ノンブロッキング」

> **Simple English:** Blocking means waiting stops progress. Non-blocking means other work can continue.

ここで用語をもう一つ増やす。

### ブロッキング

ある処理の完了を待つ間、その実行の流れが止まること。

### ノンブロッキング

待っている仕事があっても、他の仕事へ進めること。

Node.jsは、特にネットワークアプリケーションで、非同期・ノンブロッキングI/Oを重要な設計思想としている。

ただし、ここで誤解しやすい。

**Node.jsなら何を書いても自動的に速くなるわけではない。**

JavaScript側で重い計算を長時間続ければ、その間ほかの処理が進みにくくなる。

この限界は後で扱う。

---

## 10. イベントループとは何か

> **Simple English:** The event loop decides what JavaScript work should run next.

Node.jsの説明で最も intimidating なのが**イベントループ（event loop）**である。

しかし、まずは難しく考えなくてよい。

イベントループとは、かなり乱暴に言えば、

**「次に実行すべき仕事があるか」を繰り返し確認し、実行していく仕組み**

である。

レストランの例なら、店員が、

```text
新しい注文ある？
料理できた？
会計待ちある？
予約の電話来た？
```

と仕事を拾い続けているイメージに近い。

Node.jsでは、最初のJavaScriptコードを実行した後も、タイマーや通信、ファイル読み込みなどの完了を待つ仕事が残っていればイベントループが動き続ける。

処理すべき仕事がなくなると、プログラムは終了する。

大事なのは、

**非同期 = 同時に魔法のように全部のJavaScriptが実行される**

ではないという点である。

Node.js内部ではOSやスレッドプールなどの助けも使いながら、JavaScript側の仕事をイベントループへ戻して処理している。

---

## 11. 「Node.jsはシングルスレッド」は半分正しく、半分雑

> **Simple English:** JavaScript usually runs on one main thread, but Node.js uses more than one thread internally.

Node.jsについて、

> Node.jsはシングルスレッドである

という説明をよく見る。

初心者向けには便利だが、正確には少し補足が必要である。

まず**スレッド（thread）**とは、プログラムの中で命令を実行していく流れの単位である。

Node.jsでは、通常、ユーザーが書いたJavaScriptコードの中心的な実行は一つのメインスレッドで進む。

しかしNode.js全体が内部で一本のスレッドしか使わないわけではない。

ファイルシステムや一部の暗号処理などでは、Node.jsが利用する**libuv**のスレッドプールなどが裏側で働く。

したがって、より正確には、

**JavaScriptのメイン実行は基本的に一つのスレッドで進むが、Node.jsランタイム内部では複数スレッドやOS機能も使われる。**

と理解した方がよい。

---

## 12. libuvとは何か

> **Simple English:** libuv helps Node.js handle asynchronous I/O across operating systems.

ここで初めて**libuv（リブユー・ブイ）**を導入する。

libuvは、Node.jsがWindows、macOS、Linuxなどの違いを吸収しながら、非同期I/O、イベントループ、スレッドプールなどを扱うために使っているライブラリである。

初心者の段階でlibuvのAPIを覚える必要はない。

ただ、Node.jsを、

```text
Node.js
  ├ JavaScript実行 → V8
  ├ 非同期I/O・イベントループ → libuvなど
  └ 標準API → fs / http / process / stream ...
```

くらいの構造で見ておくと、後から知識がつながりやすい。

---

## 13. 「プロセス」とは何か

> **Simple English:** A process is a running program.

Node.jsの資料では**process**という単語もよく出る。

プロセスとは、ざっくり言えば、

**いま実際に動いているプログラムの一単位**

である。

たとえば、ターミナルで、

```bash
node server.js
```

と実行すると、Node.jsのプロセスが一つ起動する。

`server.js`というファイルそのものは、ただのデータである。

それをNode.jsで実行すると、OS上で活動している「プロセス」になる。

```text
server.js = 保存されているコード
node server.js = 実行開始
Node.js process = OS上で現在動いているプログラム
```

Node.jsには`process`というAPIもあり、環境変数、終了コード、コマンドライン引数など、実行中の自分自身に関する情報を扱える。

---

## 14. Node.jsでWebサーバーを作るとはどういうことか

> **Simple English:** A server waits for requests and sends responses.

「サーバー」という言葉も一度分解する。

サーバーは物理的な大型コンピューターを指すこともある。

しかしWeb開発では、

**要求（request）を待ち受け、返答（response）を返すプログラムの役割**

を指すことも多い。

Node.jsの標準機能だけでも小さなHTTPサーバーを作れる。

```js
import { createServer } from 'node:http';

const server = createServer((req, res) => {
  res.end('Hello');
});

server.listen(3000);
```

このプログラムを自分のPCで動かせば、PC自身が一時的にサーバー役になる。

```text
ブラウザ
  ↓ request
Node.jsのプログラム
  ↓ response
ブラウザ
```

つまり、

**サーバー = 特別な機械**

とだけ理解すると混乱する。

**サーバー = ネットワーク上でサービスを提供する役割**

という意味も持つ。

---

## 15. フロントエンドとバックエンド

> **Simple English:** Frontend runs close to the user. Backend runs behind the service.

Web開発では、

- フロントエンド
- バックエンド

という言葉がよく出る。

### フロントエンド

ユーザーが直接触れる画面側。

HTML、CSS、ブラウザ上のJavaScriptなど。

### バックエンド

画面の裏側で、データ保存、認証、API、業務ロジックなどを扱う部分。

Node.jsはバックエンドの実装に使える。

ただしNode.jsはバックエンド専用ではない。

Webサイト制作のためのビルドツールやCLIも大量にNode.js上で動いている。

---

## 16. なぜフロントエンドしか作っていないのにNode.jsが必要なのか

> **Simple English:** Many frontend tools themselves run on Node.js.

React、Vue、Viteなどを触ると、ブラウザ向けサイトを作っているだけなのにNode.jsをインストールすることになる。

ここは初心者がかなり混乱する。

理由は単純で、

**完成したWebサイトではなく、Webサイトを作るための道具がNode.js上で動いているから**

である。

たとえば、

```text
あなたが書く
HTML / CSS / JavaScript / React
        ↓
Node.js上で動く開発ツール
        ↓
変換・結合・最適化
        ↓
ブラウザで配信できるファイル
```

という工程がある。

ここで**ビルド（build）**という用語を導入する。

ビルドとは、開発中のソースコードを、実際に配布・実行しやすい形へ変換する工程の総称である。

圧縮、ファイル結合、TypeScriptの変換、依存関係の解決などが含まれる場合がある。

つまり、

**公開先でNode.jsが動かなくても、制作時にNode.jsを使うことはある。**

これはGitHub Pagesを理解するときにも重要である。

---

## 17. GitHub PagesとNode.jsの関係

> **Simple English:** Node.js can build a static site even if the deployed site does not run Node.js.

GitHub Pagesは基本的に静的サイトを配信する仕組みである。

ブラウザへHTML、CSS、JavaScriptなどの完成済みファイルを渡す。

そこで、たとえばViteを使ったサイトでは、

```text
開発中
  ↓
Node.js + Vite
  ↓ npm run build
完成した静的ファイル
  ↓
GitHub Pages
  ↓
ブラウザ
```

という構成を取れる。

ここでは、

- 制作工程：Node.jsが必要
- 公開された静的ファイルの閲覧：Node.jsは直接動いていない

という違いがある。

この区別が分かると、「Node.jsを使っているサイトなのにGitHub Pagesで動くのはなぜ？」という混乱がかなり減る。

---

## 18. npmとは何か

> **Simple English:** Node.js runs JavaScript. npm manages packages.

Node.jsを入れると、ほぼ必ず**npm**という名前を見る。

ここで重要なのは、

**Node.jsとnpmは同じものではない。**

Node.jsはJavaScript実行環境。

npmは、主にJavaScriptのパッケージを探し、インストールし、管理するための仕組みである。

npm公式は、npmを大きく、

- Webサイト
- CLI
- registry

の3つから成るものとして説明している。

### パッケージ

再利用できる形にまとめられたソフトウェアの部品。

誰かが作った便利な機能を、自分のプロジェクトへ取り込める。

### registry

公開されたパッケージを保管・配布する巨大なデータベース。

### npm CLI

ターミナルからnpmを操作するコマンド。

たとえば、

```bash
npm install
```

は、プロジェクトに必要な依存パッケージをインストールする代表的なコマンドである。

---

## 19. package.jsonとは何か

> **Simple English:** package.json describes a Node.js project.

Node.js系のプロジェクトを開くと、高確率で`package.json`がある。

これは、プロジェクトの**設定票・台帳**のようなファイルである。

たとえば、

```json
{
  "name": "my-app",
  "scripts": {
    "dev": "vite",
    "build": "vite build"
  },
  "dependencies": {
    "some-package": "^1.2.3"
  }
}
```

のような情報が入る。

主に、

- プロジェクト名
- バージョン
- 実行コマンド
- 使用するパッケージ
- 開発時だけ必要なパッケージ
- Node.jsに関する条件

などを管理する。

そのため、

```bash
npm run dev
```

というコマンドは、npmが`package.json`の`scripts`欄を見て、そこに登録された処理を実行している。

`npm run dev`という特別な魔法が存在するわけではない。

---

## 20. node_modulesとは何か

> **Simple English:** node_modules stores installed packages.

`npm install`すると、しばしば`node_modules`という巨大なフォルダが現れる。

ここには、プロジェクトが利用するパッケージ群が入る。

さらに、そのパッケージが別のパッケージを使っていれば、それも必要になる。

これを**依存関係（dependency）**と呼ぶ。

```text
あなたのアプリ
  ↓ uses
パッケージA
  ↓ uses
パッケージB
  ↓ uses
パッケージC
```

このように、依存関係は木のように広がる。

これがNode.js / npmエコシステムの強さであり、同時に批判の対象にもなる。

---

## 21. package-lock.jsonは何のためにあるのか

> **Simple English:** A lock file records the exact dependency versions.

`package.json`だけでは、依存パッケージのバージョン指定に幅がある場合がある。

そこでnpmは通常、`package-lock.json`に、実際に解決された依存関係とバージョンを記録する。

目的は、

**別のPCや別の日でも、できるだけ同じ依存関係を再現すること**

である。

初心者のうちは、

```text
package.json      = 何が必要か
package-lock.json = 実際に何を入れたかを詳細に固定・記録
node_modules      = 実際にインストールされたもの
```

くらいでよい。

---

## 22. モジュールとは何か

> **Simple English:** Modules let code be split into reusable files.

大きなプログラムを一つのファイルに全部書くと管理が難しい。

そこでコードを役割ごとに分割する。

この単位を**モジュール（module）**と呼ぶ。

たとえば、

```js
export function add(a, b) {
  return a + b;
}
```

と別ファイルに機能を用意し、

```js
import { add } from './math.js';
```

と読み込める。

Node.jsには歴史的に**CommonJS**というモジュール方式があり、

```js
const fs = require('fs');
```

のように書いてきた。

現在はブラウザとも共通化された**ES Modules（ESM）**も広く使われる。

```js
import fs from 'node:fs';
```

この二つが共存しているため、初心者には少し分かりにくい。

これはNode.jsの歴史が長くなったことによる「互換性を保ちながら進化する難しさ」の一例である。

---

## 23. ライブラリとフレームワーク

> **Simple English:** A library gives you tools. A framework gives your application a larger structure.

Node.jsを学ぶと、Express、Fastify、NestJSなどが出てくる。

Node.js本体と混同しないために整理する。

### ライブラリ

特定の便利な機能をまとめた道具。

### フレームワーク

アプリケーション全体を組み立てるための枠組みや設計方針まで提供するもの。

たとえばExpressはNode.js上で動くWebフレームワークである。

関係は、

```text
JavaScript
   ↓
Node.js
   ↓
Expressなど
   ↓
あなたのWebアプリ
```

となる。

Node.jsをインストールしただけでExpressが自動的に使えるわけではない。

---

## 24. Node.jsの歴史：なぜ2009年に登場したのか

> **Simple English:** Node.js appeared when JavaScript engines became fast and web servers needed efficient I/O.

Node.jsを理解するには、歴史を見るとかなり腑に落ちる。

### 1995年：JavaScriptが登場

JavaScriptは1995年、Netscape Navigatorに搭載され、Webページ上で動く言語として急速に広まった。

その後ECMAScriptとして標準化が進む。

この時代のJavaScriptは、世間的には「ブラウザの中で動く軽いスクリプト」という印象が強かった。

### 2008年前後：JavaScriptエンジンが高速化

Google Chromeの登場とV8などの高速なJavaScriptエンジンによって、JavaScriptは以前より重い処理も現実的にこなせるようになった。

### 2009年：Ryan DahlがNode.jsを発表

Ryan Dahlは2009年のJSConf.euで、V8とイベントループを組み合わせたサーバーサイドJavaScript環境としてNode.jsを発表した。

当時の発表テーマにも、**Evented I/O for V8 JavaScript**という言葉が使われている。

つまりNode.jsは最初から、

**JavaScriptをサーバーでも使えるようにすること**

だけではなく、

**多数のネットワークI/Oを効率よく扱うプログラミングモデル**

を強く意識して生まれている。

### 2010年代前半：npmと巨大なパッケージ文化

Node.jsの普及とともに、npmを中心とするパッケージ共有文化が急速に成長した。

「全部を自分で書く」のではなく、「小さな部品を組み合わせて作る」文化がJavaScript界で非常に強くなる。

### 2014〜2015年：io.jsへの分裂

Node.jsは順調に一本線で成長したわけではない。

2014年、開発速度やプロジェクト運営への不満から、一部の主要開発者が**io.js**というフォークを作った。

**フォーク（fork）**とは、既存のオープンソースソフトウェアを元に、別の開発系統として分岐させること。

これは単なる技術論争ではなく、

- 誰が意思決定するのか
- 企業とコミュニティの関係をどうするか
- どの速度で新機能を取り込むか

というオープンソースのガバナンス問題でもあった。

### 2015年：再統合とNode.js Foundation

2015年にはNode.js Foundationが設立され、io.js側とNode.js側は再統合へ向かった。

Node.js v4では、両プロジェクトの流れが統合された。

### 2019年：OpenJS Foundationへ

2019年、Node.js FoundationとJS Foundationが統合され、OpenJS Foundationが設立された。

現在のNode.jsは、一企業だけの製品というより、オープンな技術ガバナンスの下で発展する大規模なオープンソースプロジェクトとして理解した方がよい。

---

## 25. なぜNode.jsはこれほど普及したのか

> **Simple English:** Node.js reduced the language boundary between frontend and backend.

理由は一つではない。

### 1. ブラウザとサーバーでJavaScriptを使える

フロントエンドの開発者が、同じ言語を使ってサーバー側へ進みやすくなった。

### 2. I/O中心のWebサービスと相性がよかった

チャット、API、リアルタイム通信など、多数の接続を扱う用途でイベント駆動の設計が魅力になった。

### 3. npmの巨大なエコシステム

必要な機能をパッケージとして入手しやすくなった。

### 4. JSONとの相性

Web APIで頻繁に使われるJSONはJavaScriptのオブジェクト表現と親和性が高い。

### 5. CLI・開発ツールにも向いていた

Node.jsはバックエンドだけでなく、フロントエンド開発のツールチェーン自体の基盤にもなった。

この結果、Node.jsを直接バックエンドで使わない人までNode.jsを利用する状況が生まれた。

---

## 26. Node.jsが得意な仕事

> **Simple English:** Node.js is strong when applications spend a lot of time waiting for I/O.

Node.jsが特に得意なのは、I/O待ちが多い仕事である。

たとえば、

- Web API
- チャット
- リアルタイム通知
- WebSocket
- BFF（Backend for Frontend）
- ファイルやデータの変換
- CLIツール
- Web開発用ツール
- 軽量な自動化処理

など。

大量の通信を受けながら、各処理の多くが「外部の返事待ち」になるサービスとは相性がよい。

---

## 27. Node.jsが苦手になりやすい仕事

> **Simple English:** Heavy CPU work can block the main JavaScript thread.

Node.jsは万能ではない。

特に注意したいのは、長時間CPUを使い続ける重い計算である。

たとえば、

- 巨大な数値計算
- 長時間の画像・動画エンコード
- 複雑な科学計算
- JavaScript側で延々と続く大規模ループ

など。

メインのJavaScript実行を長時間占有すると、イベントループがほかの仕事を処理できなくなる。

つまり、

```text
I/O待ちが多い
→ Node.jsの得意分野

CPU計算を長時間占有
→ 工夫が必要
```

となる。

もちろんWorker Threads、別プロセス、ネイティブコード、別サービスへの分離などの選択肢はある。

したがって「Node.jsはCPU処理ができない」ではなく、**設計思想上、I/O中心の仕事ほど素直に強みを出しやすい**と理解するのがよい。

---

## 28. Node.jsへの代表的な批判1：依存関係が増えすぎる

> **Simple English:** Easy package reuse can also create huge dependency trees.

npmはNode.jsの大きな成功要因である。

一方、それゆえに、

**小さな機能まで外部パッケージに依存しすぎる**

という批判がある。

一つのパッケージを追加しただけで、そのパッケージが多数の別パッケージに依存し、`node_modules`が非常に大きくなることがある。

問題は容量だけではない。

依存先が増えるほど、

- 更新の影響
- 脆弱性
- メンテナンス停止
- ライセンス
- 悪意あるコード

などを確認すべき範囲も増える。

便利さと依存リスクは表裏一体である。

---

## 29. 批判2：サプライチェーン・セキュリティ

> **Simple English:** Installing a package means trusting code written by someone else.

`npm install`は便利である。

しかし本質的には、

**他人が書いたコードを自分の環境へ取り込み、場合によっては実行する行為**

でもある。

そのため、npmエコシステムでは、

- 脆弱な依存パッケージ
- 悪意あるパッケージ
- アカウント乗っ取り
- 名前の似た偽パッケージ
- メンテナンスされない依存関係

といったサプライチェーンリスクが問題になる。

初心者にとって役に立つ最低限の原則は、

- 名前だけで適当なパッケージを入れない
- 更新状況や公式ドキュメントを見る
- `package-lock.json`をむやみに消さない
- セキュリティ警告を完全放置しない
- 不要な依存を増やさない

である。

---

## 30. 批判3：エコシステムの変化が速く、初心者が迷いやすい

> **Simple English:** The JavaScript ecosystem changes quickly.

Node.js周辺では、長い歴史の中で、

- CommonJS / ES Modules
- npm / yarn / pnpm
- JavaScript / TypeScript
- Express / Fastify / NestJS
- Webpack / Rollup / Vite
- `require` / `import`

など、多数の選択肢が生まれてきた。

どれもそれぞれ理由がある。

しかし初心者から見ると、

> 結局どれがNode.js本体なのか

が分かりにくくなる。

この問題への対処法は、全部覚えようとしないことである。

まず、

```text
JavaScript = 言語
Node.js    = 実行環境
npm        = パッケージ管理の仕組み
V8         = JavaScriptエンジン
Express    = Node.js上のWebフレームワーク
Vite       = Node.js上で動くことの多い開発ツール
```

と階層を分ける。

これだけで混乱はかなり減る。

---

## 31. 批判4：「何でもJavaScript」にする必要はない

> **Simple English:** One language everywhere is convenient, but not always best.

Node.jsの魅力の一つは、フロントエンドもバックエンドもJavaScriptで書けることだった。

しかし、

**一つの言語で全部書ける = 一つの言語で全部書くべき**

ではない。

用途によって、Python、Go、Java、Rust、C#などが適する場合もある。

たとえば、

- データ分析ならPythonの生態系
- CPU効率や並行処理を重視するサーバーならGoやRust
- 大規模企業システムならJavaやC#

など、別の選択肢が合理的なこともある。

技術選定では「人気だから」より、

**どんな仕事をさせたいか**

を先に考える方がよい。

---

## 32. LTSとは何か

> **Simple English:** LTS means Long-Term Support.

Node.jsをインストールするとき、**LTS**という表示を見ることがある。

LTSは**Long-Term Support**の略で、長期間サポートされるリリース系列を意味する。

Node.js公式は、本番環境ではActive LTSまたはMaintenance LTSの利用を推奨している。

初心者が特別な理由なく環境を選ぶなら、

**最新版の数字だけを見るのではなく、まずLTSを確認する**

という習慣は役に立つ。

なお、Node.jsのリリース方式自体も時代とともに変更されるため、具体的なバージョン番号は公式リリースページで確認するのが安全である。

---

## 33. Node.jsを触るときによく見るコマンド

> **Simple English:** You only need a few commands at first.

最初から大量のコマンドを覚える必要はない。

### バージョン確認

```bash
node -v
```

Node.jsが入っているか確認する。

### npm確認

```bash
npm -v
```

### JavaScriptファイルを実行

```bash
node app.js
```

### 依存関係をインストール

```bash
npm install
```

### package.jsonに登録された処理を実行

```bash
npm run dev
```

```bash
npm run build
```

この5種類くらいの意味が分かれば、初心者としてはかなり進んでいる。

---

## 34. エラーを見るときの最低限の読み方

> **Simple English:** Read the first meaningful error, not every line at once.

Node.jsを触ると、ターミナルに大量の英語が出る。

全部読む必要はない。

まず見るのは、

- `Error`
- `Cannot find module`
- `MODULE_NOT_FOUND`
- `SyntaxError`
- `TypeError`
- `ENOENT`
- `EADDRINUSE`

など。

### `MODULE_NOT_FOUND`

必要なファイルやパッケージが見つからない。

### `ENOENT`

指定したファイルやフォルダが存在しないことが多い。

### `EADDRINUSE`

指定したポートがすでに別のプログラムに使われていることが多い。

### `SyntaxError`

コードの文法がおかしい。

### `TypeError`

想定していない型や値に対して処理しようとした可能性がある。

エラー全文を「謎の英語の壁」として見るのではなく、**最初の具体的な原因語を探す**とよい。

---

## 35. ここまでの用語を一枚にする

> **Simple English:** Keep the layers separate.

```text
JavaScript
│
│  プログラミング言語
│
├───────────────┐
│                               │
Webブラウザ                    Node.js
│                               │
│ 実行環境                      │ 実行環境
│                               │
├ DOM / window                  ├ fs / http / process
├ Web API                       ├ V8
└ 画面                          ├ libuv
                                └ イベントループ
                                     │
                                     ├ Webサーバー
                                     ├ API
                                     ├ CLI
                                     ├ 自動化
                                     └ 開発ツール

npm
│
├ パッケージを探す
├ インストールする
├ 依存関係を管理する
└ scriptsを実行する

package.json
│
├ プロジェクト情報
├ dependencies
└ scripts
```

この図で最も重要なのは、全部を一列に並べないことである。

Node.js、npm、JavaScript、V8、Expressは、同じ種類のものではない。

---

## 36. 初心者がハマりやすい誤解

> **Simple English:** Most confusion comes from mixing different layers.

### 誤解1：Node.jsはプログラミング言語

違う。

JavaScriptが言語で、Node.jsは実行環境。

### 誤解2：Node.jsはサーバー

違う。

サーバープログラムをNode.jsで作れる。

### 誤解3：npmはNode.js

違う。

Node.jsは実行環境、npmはパッケージ管理を中心とする別の仕組み。

### 誤解4：JavaScriptならブラウザでもNode.jsでも全部同じコードが動く

違う。

実行環境ごとに利用できるAPIが違う。

### 誤解5：非同期なら何でも高速

違う。

I/O待ちには強いが、JavaScript側でCPUを長時間占有すれば詰まる。

### 誤解6：node_modulesは自分が全部書いたコード

違う。

多くは外部パッケージとその依存関係。

### 誤解7：npm run buildはNode.jsアプリを公開すること

必ずしも違う。

静的サイトの場合は、Node.jsを制作時だけ使い、完成ファイルを別の場所へ配信することも多い。

---

## 37. 何から勉強すればいいか

> **Simple English:** Learn the layers in order.

Node.jsを理解するために、いきなりExpressやイベントループの内部実装から始める必要はない。

おすすめは次の順番である。

### Step 1
JavaScriptの基本。

- 変数
- 配列
- オブジェクト
- 関数
- `if`
- `for`
- `async / await`

### Step 2
ターミナルの基本。

- `cd`
- `ls`
- カレントディレクトリ
- ファイルパス

### Step 3
Node.jsそのもの。

```bash
node app.js
```

を実行する。

### Step 4
ファイル操作。

`fs`を使ってテキストやJSONを読む。

### Step 5
npm。

`package.json`、`npm install`、`npm run`を理解する。

### Step 6
小さなHTTPサーバー。

requestとresponseを体験する。

### Step 7
必要になったらExpressなどのフレームワーク。

この順なら、「よく分からないものをよく分からないものの上に積む」状態を避けやすい。

---

## 38. 最後に：Node.jsを一文で言い直す

> **Simple English:** Node.js is a runtime that gives JavaScript a life outside the browser.

Node.jsとは何か。

最初より少し正確に言い直す。

**Node.jsは、V8などを利用してJavaScriptをブラウザの外で実行し、ファイル、ネットワーク、プロセスなどを扱うAPIと、非同期I/Oを中心とした実行モデルを提供するクロスプラットフォームの実行環境である。**

これが技術的な説明である。

しかし、初心者として最初に持っておくべき感覚はもっと単純でよい。

```text
JavaScriptは「言葉」
ブラウザは「その言葉を使える場所」の一つ
Node.jsは「別の場所」
```

Node.jsの登場によって、JavaScriptはブラウザの画面を動かすだけの存在ではなく、サーバー、自動化、CLI、開発ツールなど、コンピューター上の幅広い仕事を担えるようになった。

ただし、その成功によってnpm依存関係、セキュリティ、ツールの多さ、歴史的互換性といった新しい複雑さも生まれた。

Node.jsを理解するということは、単に`npm install`の使い方を覚えることではない。

**「言語」「実行環境」「OS」「ネットワーク」「パッケージ」という層を分けて考えられるようになること**である。

そこまで見えるようになると、Node.js以外の技術もずっと理解しやすくなる。

---

## 用語ミニ辞典

### JavaScript
プログラミング言語。

### Node.js
JavaScriptをブラウザ外で動かす代表的な実行環境。

### runtime / 実行環境
コードを実際に動かし、外部機能を使えるようにする環境。

### JavaScript engine
JavaScriptコードを実際に解釈・コンパイル・実行する中核ソフトウェア。

### V8
ChromeとNode.jsで使われるJavaScriptエンジン。

### API
プログラムから機能を利用するための入口や取り決め。

### I/O
Input / Output。ファイル、ネットワーク、DBなど外部との入出力。

### asynchronous / 非同期
待ち時間に別の仕事を進められる処理方式。

### blocking / ブロッキング
ある処理の完了待ちによって実行の流れが止まること。

### event loop / イベントループ
実行可能になった仕事を順番に拾い、JavaScript処理を進める仕組み。

### libuv
Node.jsでイベントループや非同期I/O、スレッドプールなどを支えるライブラリ。

### process / プロセス
OS上で実際に動いているプログラムの単位。

### thread / スレッド
プロセス内で命令を実行する流れの単位。

### server / サーバー
ネットワーク上で要求を受け、サービスやデータを返す役割。機械そのものを指す場合もある。

### frontend / フロントエンド
ユーザーが直接触れる画面側。

### backend / バックエンド
データ、認証、API、業務処理など、サービスの裏側。

### npm
JavaScriptパッケージの配布・検索・インストール・管理などを担うエコシステム。

### package / パッケージ
再利用・配布しやすい形にまとめられたソフトウェアの部品。

### dependency / 依存関係
自分のソフトウェアが動くために必要とする別のソフトウェア。

### package.json
Node.js系プロジェクトの設定や依存関係、scriptsなどを記述するファイル。

### package-lock.json
実際に解決された依存パッケージの詳細なバージョン構成を記録するファイル。

### node_modules
インストールされた依存パッケージを置く代表的なフォルダ。

### module / モジュール
コードを分割・再利用する単位。

### CommonJS
Node.jsで歴史的に使われてきた`require()`中心のモジュール方式。

### ES Modules / ESM
`import` / `export`を使うJavaScript標準のモジュール方式。

### CLI
Command Line Interface。ターミナルから文字で操作するインターフェース。

### build / ビルド
開発用ソースコードを実行・配布に適した形へ変換する工程。

### LTS
Long-Term Support。長期間の保守が提供されるリリース系列。

---

## 参考文献・一次資料

- Node.js公式「Introduction to Node.js」  
  https://nodejs.org/learn
- Node.js公式「About Node.js」  
  https://nodejs.org/en/about
- Node.js公式「Node.js Releases」  
  https://nodejs.org/ja/about/previous-releases
- Node.js公式ドキュメント  
  https://nodejs.org/api/documentation.html
- Node.js公式GitHubリポジトリ  
  https://github.com/nodejs/node
- MDN「JavaScript 言語概要」  
  https://developer.mozilla.org/ja/docs/Web/JavaScript/Guide/Language_overview
- MDN「JavaScript - 用語集」  
  https://developer.mozilla.org/ja/docs/Glossary/JavaScript
- npm Docs「About npm」  
  https://docs.npmjs.com/about-npm/
- JSConf.eu 2009「Ryan Dahl: Node.js, Evented I/O for V8 Javascript」  
  https://www.jsconf.eu/2009/speaker/speakers_selected.html
- OpenJS Foundation「Maintainers Should Consider Following Node.js’ Release Schedule」  
  https://openjsf.org/blog/maintainers-should-consider-following-node-js-release-schedule
- OpenJS Foundation「OpenJS Foundation Year in Review」  
  https://openjsf.org/blog/openjs-foundation-year-in-review
