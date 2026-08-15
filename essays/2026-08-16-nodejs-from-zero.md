---
id: nodejs-from-zero
title: "Node.jsとは何か"
subtitle: "「JavaScriptをブラウザの外で動かす」から始める、完全初心者のための概念地図"
created: "2026-08-16"
updated: "2026-08-16"
type: "Learning Paper"
status: "完成"
tags: ["Node.js", "JavaScript", "npm", "Web開発", "バックエンド", "CLI", "プログラミング", "GitHub Pages"]
keywords: ["Node.js", "JavaScript runtime", "V8", "npm", "package.json", "node_modules", "event loop", "server", "backend", "CLI", "GitHub Pages"]
favorite: 4
grow: 5
abstract: "Node.jsは「JavaScriptの仲間」でも「サーバーそのもの」でもなく、JavaScriptをブラウザの外で動かすための実行環境である。本稿では、そもそも実行環境とは何か、ブラウザとの違い、サーバー・CLI・開発ツールでの役割、npmとpackage.jsonの関係、非同期処理の考え方までを、コード経験がほぼない人向けに一枚の概念地図として整理する。GitHub Pagesのような静的サイトとの関係も扱う。"
---

# Node.jsとは何か
## 「JavaScriptをブラウザの外で動かす」から始める、完全初心者のための概念地図

### 要旨

> **Simple English:** Node.js lets JavaScript run outside a web browser.

Node.jsを初めて調べると、説明の中にいきなり「サーバー」「npm」「非同期」「イベントループ」「V8」などが出てきて、何が本体なのか分からなくなりやすい。

まず、全部忘れていい。

最初に覚えるのは一つだけである。

**Node.jsは、JavaScriptを動かすための「実行環境」である。**

JavaScriptというプログラミング言語そのものではない。

Webフレームワークでもない。

サーバーそのものでもない。

npmでもない。

JavaScriptで書かれた命令を、コンピューター上で実際に動かしてくれる環境。それがNode.jsである。

この一点から始めると、周辺用語がかなり整理しやすくなる。

---

## 1. いちばん大事な区別：「言語」と「実行する場所」

> **Simple English:** JavaScript is the language. Node.js is one place where JavaScript can run.

たとえば、日本語で書かれた料理のレシピがあるとする。

レシピそのものは、料理ではない。

実際に料理を作るには、キッチン、火、包丁、冷蔵庫などが必要になる。

このたとえで考えると、

- **JavaScript** = レシピに使う言語
- **JavaScriptのコード** = レシピ
- **Node.js** = レシピを実行するキッチン

くらいに考えるとよい。

JavaScriptのコードだけ置いてあっても、それを理解して実行する仕組みがなければ何も起きない。

そこで必要になるのが「実行環境（runtime environment）」である。

Node.js公式も、Node.jsを**クロスプラットフォームのJavaScript実行環境**と説明している。

つまりNode.jsの本質は、「JavaScriptを使って何を作るか」より一段手前にある。

**JavaScriptを、どこで、どう動かすか。**

その「どこで」に対する答えの一つがNode.jsである。

---

## 2. では、Node.js以前のJavaScriptはどこで動いていたのか

> **Simple English:** JavaScript first became popular inside web browsers.

JavaScriptは長いあいだ、「Webブラウザの中で動く言語」というイメージが強かった。

Webページを開くと、ブラウザの中でJavaScriptが動く。

たとえば、

- ボタンを押したらメニューを開く
- 画像を切り替える
- 入力内容をチェックする
- APIからデータを取って画面を更新する

といった処理である。

このときJavaScriptを実行しているのは、ChromeやSafariなどの**ブラウザ**である。

構造を単純化するとこうなる。

```text
HTML / CSS / JavaScript
          ↓
      Webブラウザ
          ↓
     画面が動く
```

ブラウザはJavaScriptを実行するだけでなく、Webページを操作するための機能も用意している。

たとえば、

```js
document.querySelector('button')
```

のような処理が使えるのは、ブラウザが`document`という仕組みを提供しているからである。

ここが重要である。

**JavaScriptという言語と、ブラウザが提供する機能は別物である。**

---

## 3. Node.jsが変えたこと

> **Simple English:** Node.js moved JavaScript from the browser to the computer itself.

Node.jsを使うと、JavaScriptをブラウザのタブの中だけでなく、コンピューター上の一つのプログラムとして動かせる。

たとえば、`hello.js`というファイルを作る。

```js
console.log('Hello, Node.js');
```

Node.jsが入っているPCなら、ターミナルで次のように実行できる。

```bash
node hello.js
```

すると、Node.jsが`hello.js`を読み込み、JavaScriptとして実行する。

```text
あなた
  ↓
node hello.js と入力
  ↓
Node.js が hello.js を読む
  ↓
JavaScript を実行
  ↓
Hello, Node.js と表示
```

ブラウザを開く必要はない。

HTMLも必要ない。

この「ブラウザなしでJavaScriptを実行できる」という変化が、Node.jsを理解するうえで最初の核心になる。

---

## 4. 「ブラウザのJavaScript」と「Node.jsのJavaScript」は何が違うのか

> **Simple English:** The language is similar, but the available tools are different.

同じJavaScriptでも、動く環境によって使える機能が違う。

ブラウザは、Webページを扱うための道具を持っている。

- `document`
- `window`
- DOM操作
- クリックやスクロールなどのイベント
- ブラウザ画面への描画

一方、Node.jsはコンピューター上のプログラムとして動くため、別の道具を持っている。

- ファイルを読む・書く
- フォルダを操作する
- ネットワーク通信をする
- HTTPサーバーを立てる
- OSや実行中プロセスの情報を扱う
- コマンドラインツールを作る

たとえばNode.jsでは、標準機能を使ってファイルを読める。

```js
import { readFile } from 'node:fs/promises';

const text = await readFile('memo.txt', 'utf8');
console.log(text);
```

つまり、

```text
ブラウザ
  = JavaScript + Webページを扱うための機能

Node.js
  = JavaScript + PC・サーバー側の処理を行うための機能
```

という違いがある。

「JavaScriptは同じだから何でも同じように動く」わけではない。

**言語は同じでも、実行環境が提供するAPIが違う。**

ここまで分かると、かなり見通しが良くなる。

---

## 5. Node.jsの中では何がJavaScriptを動かしているのか：V8

> **Simple English:** Node.js uses the V8 JavaScript engine.

もう一段だけ中を見る。

Node.jsは、JavaScriptそのものをゼロから解釈しているわけではない。

Node.jsは、JavaScriptエンジンとして**V8**を利用している。

V8はGoogle Chromeでも使われているJavaScriptエンジンである。

かなり単純化すると、

```text
あなたが書いた JavaScript
          ↓
       Node.js
          ↓
   V8 がコードを実行
          ↓
 Node.jsの各種APIも使える
          ↓
    OS・ファイル・通信
```

という関係になる。

ここでNode.jsを「V8そのもの」と捉えるのも少し違う。

Node.jsはV8に加えて、ファイル操作、ネットワーク、タイマー、プロセス制御など、サーバーやツールを作るための機能をまとめて提供している。

V8は「JavaScriptを走らせるエンジン」。

Node.jsは「そのエンジンを中心に、ブラウザ外で実用的にJavaScriptを動かせるようにした環境」と考えるとよい。

---

## 6. Node.jsで何が作れるのか

> **Simple English:** Node.js can run servers, scripts, command-line tools, and development tools.

Node.js公式は、Node.jsによってサーバー、Webアプリ、コマンドラインツール、スクリプトなどを作れると説明している。

代表的な用途を4つに分けると分かりやすい。

### 6-1. Webサーバー・API

ブラウザやアプリからリクエストを受け取り、データを返すプログラムを作れる。

```text
ブラウザ
   ↓  「このデータください」
Node.jsで動くサーバープログラム
   ↓
データベース / ファイル / 外部API
   ↓
Node.js
   ↓  「はい、これです」
ブラウザ
```

ここから「Node.js = サーバー」という説明が生まれやすい。

ただし、正確には違う。

**Node.jsはサーバーを作るためにも使える実行環境**である。

### 6-2. 自動化スクリプト

ファイル名を一括変更する、CSVを変換する、HTMLを生成する、データを整形する、といった小さな自動処理にも使える。

たとえば、100個のJSONファイルを読み込んで一覧データを作る処理もNode.jsで書ける。

### 6-3. CLIツール

ターミナルから使うコマンドそのものも作れる。

```bash
my-tool input.txt
```

のような道具をJavaScriptで実装できる。

### 6-4. フロントエンド開発の裏方

ここは初心者が最も混乱しやすい。

ブラウザ向けのWebサイトを作っているだけなのに、Node.jsをインストールするよう求められることがある。

なぜか。

Viteなどの開発サーバー、コード変換、圧縮、テスト、依存パッケージ管理など、**Webサイトを作る途中の道具がNode.js上で動いている**からである。

完成したWebサイトそのものはブラウザで動いていても、制作工程ではNode.jsを使っている、というケースは非常に多い。

---

## 7. 「サーバー」という言葉も一度分解する

> **Simple English:** A server is a role, not only a physical machine.

「Node.jsでサーバーを作る」という言い方も、初心者には少し罠がある。

サーバーという言葉は、物理的なコンピューターを指すこともあれば、ネットワーク上で要求を待ち受けて応答する**プログラムの役割**を指すこともある。

Node.jsで次のようなプログラムを書けば、自分のPCの中でも小さなHTTPサーバーを動かせる。

```js
import { createServer } from 'node:http';

const server = createServer((req, res) => {
  res.end('Hello');
});

server.listen(3000);
```

そしてブラウザから`http://localhost:3000`へアクセスすると、そのNode.jsプログラムが応答する。

ここで起きているのは、

```text
同じPCのブラウザ
      ↓ リクエスト
Node.jsで動いているプログラム
      ↓ レスポンス
同じPCのブラウザ
```

である。

つまり、最初から巨大なデータセンターを想像する必要はない。

**「要求を待って、返事をするプログラム」もサーバーである。**

---

## 8. npmとは何か：Node.jsとは別物

> **Simple English:** Node.js runs JavaScript. npm manages packages.

Node.jsを触り始めると、ほぼ必ず`npm`という言葉に出会う。

ここで混同しやすい。

Node.jsとnpmは役割が違う。

```text
Node.js
  → JavaScriptを実行する

npm
  → 他人が作ったJavaScriptの部品を探し、入れ、管理する
```

npm公式では、npmを大きく、Webサイト、CLI、パッケージのregistryという3要素からなる仕組みとして説明している。

実際の開発では、ターミナルからnpm CLIを使う場面が多い。

たとえば、あるライブラリをプロジェクトへ追加するなら、

```bash
npm install パッケージ名
```

のように実行する。

すると、そのプロジェクトで必要な外部パッケージをnpmが管理してくれる。

料理のたとえを続けるなら、

- JavaScript = レシピの言語
- Node.js = キッチン
- npm = 食材や調理器具を取り寄せ、管理する仕組み
- npm package = 他人が作った便利な部品

くらいで考えるとよい。

---

## 9. package.jsonとは何か

> **Simple English:** package.json describes your Node.js project.

Node.js系のプロジェクトを見ると、かなりの確率で`package.json`というファイルがある。

これは、プロジェクトの「台帳」「プロフィール」「取扱説明書」に近い。

たとえば、

```json
{
  "name": "my-app",
  "version": "1.0.0",
  "scripts": {
    "start": "node app.js"
  },
  "dependencies": {
    "some-package": "^1.2.3"
  }
}
```

のような情報を持つ。

主に、

- プロジェクト名
- バージョン
- 使っているパッケージ
- よく使うコマンド
- パッケージの設定

などを記録する。

`npm install`を実行したとき、npmはこの情報をもとに必要なパッケージをそろえる。

初心者のうちは、

**package.json = このプロジェクトが何を必要としていて、どう動かすかを書くファイル**

と覚えれば十分である。

---

## 10. node_modulesとは何か

> **Simple English:** node_modules stores installed packages.

npmでパッケージをインストールすると、`node_modules`という巨大なフォルダが現れることがある。

これは、プロジェクトが使う外部パッケージの実体が置かれる場所である。

```text
my-app/
├─ app.js
├─ package.json
├─ package-lock.json
└─ node_modules/
   ├─ package-a/
   ├─ package-b/
   └─ ...
```

自分が一つしかパッケージを入れていないのに、`node_modules`の中に大量のフォルダが増えることがある。

理由は、そのパッケージ自身も別のパッケージに依存しているからである。

```text
あなたのアプリ
   ↓
Package A
   ↓
Package B, C
   ↓
Package D, E ...
```

この「あるソフトが別のソフトを必要とする関係」を**dependency（依存関係）**という。

npmの重要な役割の一つは、この依存関係を管理することである。

---

## 11. npm runとは何をしているのか

> **Simple English:** npm run gives names to common commands.

Web開発をしていると、

```bash
npm run dev
```

```bash
npm run build
```

のようなコマンドをよく見る。

これも魔法ではない。

多くの場合、`package.json`の`scripts`欄に書かれたコマンドへ名前を付けているだけである。

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build"
  }
}
```

この場合、

```bash
npm run dev
```

を実行すると、npmが`vite`というコマンドを実行する。

つまり`npm run dev`自体が何か特別な開発処理を知っているわけではない。

**package.jsonに登録された処理を呼び出している。**

この仕組みが分かるだけでも、Node.js系のプロジェクトが急に「読めるもの」になってくる。

---

## 12. 非同期処理とは何か

> **Simple English:** Node.js can wait for slow work without stopping everything else.

Node.jsを説明すると必ず「非同期」「イベント駆動」「イベントループ」という言葉が出てくる。

最初から内部実装まで覚える必要はない。

まず、レストランで考える。

注文を受けた店員が、料理が完成するまで厨房の前でずっと立って待っていたら効率が悪い。

```text
注文A
↓
料理Aが完成するまで店員が停止
↓
注文Bをやっと受ける
```

これでは待ち時間が大きくなる。

そこで、料理Aを厨房へ渡したら、その完成を待つ間に注文Bを受ける。

```text
注文A → 厨房へ
          ↓ 調理中
注文B → 厨房へ
          ↓ 調理中
注文Cを受ける
          ↓
料理A完成 → 提供
```

Node.jsは、ファイル読み込み、データベース通信、ネットワーク通信など「結果が返るまで待つ時間が発生する処理」で、待っている間に別の仕事を進めやすい設計になっている。

Node.js公式は、ネットワークやファイルシステムへのI/Oで待ち時間が発生したとき、JavaScript全体を単純に止め続けるのではなく、結果が返った段階で処理を再開する仕組みを説明している。

これがNode.jsの重要な性格である。

ただし、初心者向けにありがちな、

> Node.jsは全部を完全に1本のスレッドだけで処理している

という理解も正確ではない。

JavaScriptのコールバックなどは通常、一つのイベントループ上で順に実行されるが、I/Oの一部や特定の処理ではOSや内部の仕組みを利用する。

最初は、

**「待ち時間がある仕事を、ただ立ち止まって待つ設計ではない」**

と理解できれば十分である。

---

## 13. イベントループは「仕事の再開係」と考える

> **Simple English:** The event loop helps Node.js know what work can continue next.

イベントループという言葉は難しく見えるが、概念だけならシンプルである。

Node.jsでは、

1. 今すぐできるJavaScriptを実行する
2. 時間のかかるI/Oは完了を待つ
3. 完了した仕事があれば、その続きを実行する
4. また次の仕事を見る

という循環が続く。

```text
今できる処理を実行
       ↓
待ちが必要な処理を外へ渡す
       ↓
別の処理を実行
       ↓
完了した処理が戻る
       ↓
その続きを実行
       ↓
また次へ
```

この「次に実行できる仕事は何か」を繰り返し回していく仕組みを理解すると、イベントループという言葉への恐怖はかなり減る。

---

## 14. Node.jsはフレームワークではない

> **Simple English:** Node.js is a runtime, not a web framework.

ここも頻出の混同である。

Node.jsは実行環境。

Expressなどは、Node.js上で動くWebフレームワーク・ライブラリである。

関係はこうなる。

```text
JavaScript
   ↓
Node.js
   ↓
Expressなどのライブラリ / フレームワーク
   ↓
あなたのWebアプリやAPI
```

たとえるなら、

- Node.js = キッチン
- Express = 飲食店向けに作業しやすくした調理設備・手順セット
- あなたのアプリ = 実際に提供する料理

である。

Node.jsだけでもHTTPサーバーは作れる。

ただし、実際の開発では便利なライブラリやフレームワークを組み合わせることが多い。

---

## 15. Node.jsを入れたのに、Webサイト上ではNode.jsが動いていないこともある

> **Simple English:** Node.js can be used to build a site even when it does not run on the final website.

これは実務でかなり重要である。

たとえば、HTML・CSS・JavaScriptだけでできた静的サイトを作るとする。

制作中には、

```bash
npm run dev
npm run build
```

のためにNode.jsを使う。

しかし、ビルド後に生成されたものが、

```text
index.html
style.css
app.js
```

のような静的ファイルだけなら、本番環境ではNode.jsのサーバープログラムが常駐していないこともある。

構造はこうなる。

```text
開発時
あなた → Node.js → 開発ツール → 静的ファイルを生成

公開後
ユーザーのブラウザ → 静的ファイルを受け取る → ブラウザでJavaScript実行
```

つまりNode.jsには、

- **本番でアプリを動かす役割**
- **開発・ビルド時だけ使う役割**

の両方がある。

この区別はとても大事である。

---

## 16. GitHub PagesとNode.jsの関係

> **Simple English:** GitHub Pages hosts static files; it is not a Node.js application server.

GitHub Pagesは、HTML、CSS、JavaScriptなどの静的ファイルを公開するための静的サイトホスティングサービスである。

そのため、GitHub Pagesに`server.js`を置いて、

```bash
node server.js
```

を常時実行させる、という使い方はできない。

一方で、開発時やGitHub Actionsのビルド工程でNode.jsを使い、その**結果として生成された静的ファイルをGitHub Pagesへ公開する**ことはできる。

```text
Node.js
  ↓ ビルド
HTML / CSS / JavaScript
  ↓
GitHub Pages
  ↓
ユーザーのブラウザ
```

この区別が分かると、

「Node.jsを使って作ったサイトなのに、なぜGitHub Pagesで動くのか」

という疑問も解消できる。

**作るときにNode.jsを使うことと、公開先でNode.jsが動き続けることは別である。**

---

## 17. 自分にNode.jsが必要かを判断する

> **Simple English:** You do not always need Node.js.

Node.jsは便利だが、Web制作なら必ず必要というわけではない。

ざっくり判断するとこうなる。

- HTML・CSS・素のJavaScriptを直接書いて静的サイトを作るだけ
  - Node.jsなしでも可能

- npmのパッケージを使いたい
  - Node.js + npmを使うことが多い

- Viteなどの開発ツールを使いたい
  - 開発時にNode.jsが必要

- JavaScriptでAPIやWebサーバーを作りたい
  - Node.jsが選択肢になる

- JavaScriptでファイル整理やデータ変換を自動化したい
  - Node.jsが便利

- GitHub Pagesへ静的ファイルを置くだけ
  - 公開先でNode.jsサーバーを動かす必要はない

Node.jsを理解するとは、「何でもNode.jsで作る」ことではない。

**どの段階でNode.jsが働いているかを見分けられるようになること**の方が重要である。

---

## 18. よく出る用語を一度まとめる

> **Simple English:** Learn the map before memorizing commands.

### JavaScript

プログラミング言語。

Node.jsそのものではない。

### Runtime / 実行環境

書かれたプログラムを実際に動かす環境。

Node.jsはJavaScriptの実行環境の一つ。

### V8

Node.jsやChromeで使われているJavaScriptエンジン。

### Node.js

V8を中心に、ファイル、ネットワーク、プロセスなどを扱える機能を備えたJavaScript実行環境。

### npm

JavaScriptパッケージを探す・入れる・管理するためのエコシステム。CLI、Webサイト、registryなどからなる。

### package

再利用可能なJavaScriptの部品。

### dependency

自分のプログラムが必要としている外部パッケージ。

### package.json

プロジェクトの設定、依存パッケージ、実行コマンドなどを書くファイル。

### node_modules

インストールしたパッケージの実体が置かれるフォルダ。

### server

ネットワーク越しの要求を受け取り、返事をする側のプログラムやコンピューター。

### API

プログラム同士が機能やデータをやり取りするための窓口・約束。

### event loop

Node.jsが「次に実行できる処理」を繰り返し処理していくための中心的な仕組み。

---

## 19. 最初に覚えるコマンドは3つでいい

> **Simple English:** Start with three commands.

Node.jsを入れたあと、最初は大量のコマンドを覚えなくてよい。

### 1. Node.jsが入っているか確認

```bash
node -v
```

### 2. npmが使えるか確認

```bash
npm -v
```

### 3. JavaScriptファイルを実行

```bash
node hello.js
```

これだけでまず、

**「JavaScriptファイルが、ブラウザではなくPC上で一つのプログラムとして動く」**

という感覚を体験できる。

その感覚ができてから、`npm install`、`package.json`、`npm run dev`へ進んだ方が理解しやすい。

---

## 20. 初心者がハマりやすい5つの誤解

> **Simple English:** Most confusion comes from mixing different layers.

### 誤解1：Node.jsはJavaScriptとは別のプログラミング言語

違う。

JavaScriptを実行する環境である。

### 誤解2：Node.jsはサーバーそのもの

違う。

サーバープログラムを作れる実行環境である。

### 誤解3：npmとNode.jsは同じもの

違う。

Node.jsは実行環境、npmはパッケージ管理の仕組みである。

### 誤解4：Node.jsを使うサイトは、本番でも必ずNode.jsが動く

違う。

開発・ビルド時だけNode.jsを使い、完成後は静的ファイルだけ配信するケースもある。

### 誤解5：JavaScriptならブラウザでもNode.jsでも完全に同じコードが動く

違う。

言語の多くは共通だが、ブラウザとNode.jsでは使えるAPIが異なる。

この5つを分けるだけで、Node.js関連のドキュメントはかなり読みやすくなる。

---

## 21. Node.jsの概念を一枚にする

> **Simple English:** Think in layers.

最後に全部を一枚にする。

```text
あなたが書くもの
JavaScriptコード
      │
      ▼
実行する場所
Node.js
      │
      ├── JavaScriptエンジン: V8
      ├── ファイル操作
      ├── ネットワーク
      ├── HTTP
      ├── プロセス
      └── その他のNode API
      │
      ▼
コンピューター / OS

さらに横から

npm
 ├── パッケージを探す
 ├── パッケージを入れる
 └── 依存関係を管理する
      │
      ▼
package.json / node_modules
```

これをブラウザと並べると、さらに明確になる。

```text
JavaScript
   ├── ブラウザで実行
   │      └── DOM、画面、クリック、Web API
   │
   └── Node.jsで実行
          └── ファイル、ネットワーク、サーバー、CLI、開発ツール
```

Node.jsを理解するうえで最も大切なのは、コマンドを丸暗記することではない。

**JavaScriptという言語と、それを動かす実行環境を分けて考えること。**

ここが分かれば、npmも、Viteも、Expressも、GitHub Pagesも、それぞれが別の層にいることが見えるようになる。

---

## 22. 次に学ぶなら、この順番

> **Simple English:** Learn one layer at a time.

Node.js初心者なら、次の順番が理解しやすい。

1. ターミナルで`node hello.js`を動かす
2. JavaScriptの変数・関数・配列・オブジェクトを理解する
3. Node.jsでファイルを読み書きする
4. `npm install`を一度使う
5. `package.json`を読む
6. `npm run`が何を呼んでいるか確認する
7. Promiseと`async / await`を理解する
8. 小さなHTTPサーバーを動かす
9. ブラウザ側JavaScriptとNode.js側JavaScriptを分けて考える
10. その後でVite、Express、Reactなどへ進む

最初から「Node.jsでWebアプリを作る」に飛ぶより、**Node.jsそのものを一度ただのJavaScript実行機として触る**方が、あとで混乱しにくい。

---

## 結論

> **Simple English:** Node.js is not magic. It is a runtime that gives JavaScript a new place to work.

Node.jsは、初見では巨大な技術の塊に見える。

しかし中心はかなり単純である。

**Node.jsは、JavaScriptをブラウザの外で動かすための実行環境。**

そこに、ファイル操作、ネットワーク、HTTP、プロセス管理などの機能が加わることで、JavaScriptでサーバー、CLI、自動化スクリプト、開発ツールなどを書けるようになった。

そしてnpmは、その周辺で大量の再利用可能なパッケージを管理する仕組みである。

Node.jsを学ぶとき、「何のコマンドを打つか」より先に、

```text
言語
↓
実行環境
↓
API
↓
パッケージ
↓
アプリ
```

という層を意識する。

すると、Node.js周辺の技術は、知らない単語の集合ではなく、**一つの地図の中に配置できる部品**として見えてくる。

---

## 参考資料

- [Node.js公式：Node.js入門](https://nodejs.org/en/learn)
- [Node.js公式：Node.jsとは](https://nodejs.org/ja/about)
- [Node.js公式：トップページ（日本語）](https://nodejs.org/ja)
- [npm Docs：About npm](https://docs.npmjs.com/about-npm/)
- [npm Docs：Packages and modules](https://docs.npmjs.com/packages-and-modules/)
- [GitHub Docs：GitHub Pagesとは](https://docs.github.com/ja/pages/getting-started-with-github-pages/what-is-github-pages)
- [GitHub Docs：GitHub Pagesサイトの作成](https://docs.github.com/ja/pages/getting-started-with-github-pages/creating-a-github-pages-site)
