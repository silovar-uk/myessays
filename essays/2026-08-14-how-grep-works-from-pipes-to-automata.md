---
id: how-grep-works-from-pipes-to-automata
title: "grepは何をしているのか"
subtitle: "文字列検索から、標準入出力・正規表現・終了コード・検索アルゴリズムまで"
created: "2026-08-14"
updated: "2026-08-14"
type: "Learning Paper"
status: "完成"
tags: ["grep", "Unix", "Linux", "CLI", "正規表現", "標準入力", "パイプ", "検索", "Git", "ripgrep"]
keywords: ["grep", "regular expression", "BRE", "ERE", "fixed strings", "stdin", "stdout", "pipe", "Boyer-Moore", "Aho-Corasick", "git grep", "ripgrep"]
favorite: 4
grow: 5
abstract: "grepは「ファイルから文字列を探すコマンド」と説明されることが多い。しかし本質は、入力を受け取り、パターンに照合し、条件に合う行を標準出力へ流す小さな検索エンジンである。本稿では、ターミナル初心者でも追えるところから始め、標準入力・パイプ・正規表現・再帰検索・終了コードを整理する。さらにGNU grep内部のオートマトン、Boyer–Moore、Aho–Corasick、localeによる性能差まで踏み込み、git grepやripgrepとの役割分担を考える。"
---

# grepは何をしているのか
## 文字列検索から、標準入出力・正規表現・終了コード・検索アルゴリズムまで

### 要旨

ターミナルで大量のログやソースコードを眺めていると、たいてい一度はこのコマンドに出会う。

```bash
grep 'ERROR' app.log
```

意味は単純である。

**`app.log` の中から `ERROR` を含む行を出す。**

ここだけ覚えてもgrepは使える。

しかし、grepを少し深く理解すると、Unix系のコマンドライン全体が急に見通しやすくなる。なぜならgrepには、

- ファイルと標準入力
- 標準出力
- パイプ
- 正規表現
- 終了コード
- 再帰的なファイル探索
- localeと文字コード
- 高速な文字列検索アルゴリズム

という、CLIの重要な考え方が小さく詰まっているからである。

本稿ではgrepを「便利な検索コマンド」としてではなく、**入力 → 照合 → 選択 → 出力という検索装置**として捉え直す。

最初はターミナル初心者でも読めるところから始める。ただし後半では、GNU grepが内部でどのように高速化しているのかまで入る。

---

## 1. まず、grepを一文で捉える

GNU grepの基本形は次のとおりである。

```text
grep [オプション] パターン [ファイル...]
```

最小の例はこれだ。

```bash
grep 'red' teams.txt
```

`teams.txt` が次の内容なら、

```text
Urawa Red Diamonds
Kashima Antlers
Nagoya Grampus
Red Bull Salzburg
```

出力はこうなる。

```text
Urawa Red Diamonds
Red Bull Salzburg
```

重要なのは、grepが通常、**一致した文字列だけではなく、その文字列を含む行を選択して出力する**ことである。

このためgrepは、単純化すれば次の4段階で理解できる。

```text
入力を受け取る
    ↓
パターンと照合する
    ↓
条件に合う行を選ぶ
    ↓
標準出力へ流す
```

このモデルを頭に置けば、多くのオプションは「4段階のどこを変えるか」で整理できる。

---

## 2. 「1行ずつ読む」は半分正しく、半分間違い

grepはよく「ファイルを1行ずつ読んで検索する」と説明される。

初心者向けの説明としては便利だが、技術的には少し注意が必要である。

正確には、

> **grepは検索結果を行単位で判定する、line-orientedなツールである。**

GNU grepの仕様では、パターンがある行の一部に一致すれば、その行が選択される。通常のgrepでは改行をまたいだ検索をしない。

しかし、だからといって内部実装が毎回「1行読む → 正規表現を実行 → 次の1行」と素朴に動いているとは限らない。

高速な実装では、ファイルをある程度まとまったバッファとして読み、複数行を含むデータを高速に走査しながら改行位置と一致位置を処理できる。

ここは重要な区別である。

- **意味論**：行単位で一致を判定する
- **実装**：高速化のため、より大きなデータの塊を処理する場合がある

「行指向」と「1行ずつreadする」は同じ意味ではない。

この区別は、後半でgrepの高速化を理解するときに効いてくる。

---

## 3. ファイルを指定しないgrepは、何を検索しているのか

次のコマンドを考える。

```bash
grep 'ERROR'
```

ファイル名がない。

それでもgrepは動く。

この場合、grepは**標準入力（standard input / stdin）**からデータを受け取る。

ターミナルから直接文字を入力してもよいし、別のコマンドから流し込んでもよい。

Unix系のプログラムでは、代表的に次の3本の入出力経路がある。

```text
stdin   標準入力
stdout  標準出力
stderr  標準エラー出力
```

grepにとって、ファイルと標準入力は「検索対象をどこから受け取るか」の違いでしかない。

たとえば、

```bash
cat app.log | grep 'ERROR'
```

では、概念的には次のように流れる。

```text
app.log
  ↓
cat
  ↓ stdout
[ pipe ]
  ↓ stdin
grep 'ERROR'
  ↓ stdout
terminal
```

Bashのパイプ `|` は、左側コマンドの標準出力を右側コマンドの標準入力へ接続する。

つまりgrepは、**ファイル検索専用コマンドではなく、テキストの流れを受け取ってフィルタリングするコマンド**でもある。

この性質がUnix的な使いやすさの中心にある。

### `cat file | grep` はダメなのか

よく、

```bash
cat app.log | grep 'ERROR'
```

より、

```bash
grep 'ERROR' app.log
```

と書くべきだと言われる。

単一ファイルをgrepするだけなら、後者の方が短く、余計なプロセスも不要なので自然である。

ただし、パイプそのものが悪いわけではない。

```bash
some_command | grep 'ERROR'
```

のように「前段のコマンドが生成した出力を検索する」場面では、パイプこそgrepの本領である。

---

## 4. grepの核心は「文字列」ではなく「パターン」

初心者が最初につまずきやすいポイントがここである。

```bash
grep 'error' file.txt
```

を見ると、grepは単純な文字列検索をしているように見える。

しかし標準のgrepは、検索語を基本正規表現、BRE（Basic Regular Expression）として解釈する。

つまり`error`は、たまたま特殊記号を含まないので普通の文字列のように見えているだけである。

### 4-1. 固定文字列として探す `-F`

「入力した文字をそのまま探してほしい」なら、意味が最も明確なのは`-F`である。

```bash
grep -F 'user.name' config.txt
```

通常の正規表現では`.`は特殊な意味を持つが、`-F`なら`.`もただのピリオドとして扱われる。

検索対象が完全な固定文字列なら、`-F`は読み手にも意図が伝わりやすい。

### 4-2. 拡張正規表現 `-E`

実務で正規表現を書くなら、ERE（Extended Regular Expression）の`-E`が分かりやすい。

```bash
grep -E 'ERROR|WARN' app.log
```

これは`ERROR`または`WARN`を含む行を選ぶ。

```bash
grep -E '^2026-08-14 .* ERROR' app.log
```

なら、行頭が`2026-08-14`で始まり、その後に`ERROR`を含む行を探せる。

代表的な記号は次のようなものだ。

```text
.       任意の1文字
^       行頭
$       行末
*       直前の要素が0回以上
+       直前の要素が1回以上
?       直前の要素が0回または1回
[abc]   a / b / c のどれか
[^abc]  a / b / c 以外
|       OR
(...)   グループ化
```

### 4-3. BREとEREは「強い・弱い」だけではない

GNU grepではBREとEREは、多くの場合ほぼ同じ表現力を持ち、主な違いは記法である。

たとえばEREなら、

```bash
grep -E 'cat|dog' animals.txt
```

と書ける。

BREでは一部の記号にバックスラッシュが必要になり、読みづらくなりやすい。

初心者が正規表現を学ぶなら、まず`grep -E`を基準に理解すると見通しがよい。

### 4-4. `-P`はさらに別世界

GNU grepには、環境によってPerl互換正規表現（PCRE）を使う`-P`もある。

```bash
grep -P '\d{4}-\d{2}-\d{2}' file.txt
```

ただし`-P`はPOSIXの標準機能ではなく、実装差がある。

シェルスクリプトを複数OSで動かしたいなら、BRE / ERE / fixed stringの範囲に収める方が安全である。

---

## 5. シェルの記号と、grepの正規表現を混同しない

ここはCLI初心者にとって非常に重要である。

たとえば、

```bash
grep *.log
```

と書いたとする。

`*.log`をgrepが正規表現として受け取るとは限らない。

多くのシェルでは、grepが起動する**前に**`*.log`がファイル名へ展開される。

```text
*.log
  ↓ shellが展開
app.log access.log error.log
  ↓
grep app.log access.log error.log
```

一方、

```bash
grep '.*\.log' files.txt
```

の`.*\.log`は、引用符によってシェルから保護され、grepへ正規表現として渡される。

だから検索パターンは、原則として引用符で囲む習慣をつけた方がよい。

```bash
grep -E 'ERROR|WARN' app.log
```

特にシングルクォートは、シェルによる変数展開や特殊文字解釈を抑えられるため、固定の正規表現を書くときに安全である。

---

## 6. オプションは「何を変えるか」で覚える

grepのオプションは非常に多い。

全部暗記する必要はない。

次の4分類で覚えると整理しやすい。

### A. 一致条件を変える

```bash
grep -i 'error' app.log
```

`-i`：大文字小文字を区別しない。

```bash
grep -v 'DEBUG' app.log
```

`-v`：一致しない行を選ぶ。

```bash
grep -x 'OK' status.txt
```

`-x`：行全体が一致した場合だけ選ぶ。

```bash
grep -w 'cat' animals.txt
```

`-w`：単語単位で一致させる。`cat`は拾うが`category`の一部は拾わない。

### B. 出力の見せ方を変える

```bash
grep -n 'ERROR' app.log
```

`-n`：行番号を付ける。

```bash
grep -c 'ERROR' app.log
```

`-c`：一致した**行数**を出す。

ここは要注意で、`-c`は「一致した文字列の個数」ではない。1行に`ERROR`が3回あっても、その行は1行として数えられる。

```bash
grep -l 'TODO' *.js
```

`-l`：一致したファイル名だけ出す。

### C. 検索範囲を変える

```bash
grep -r 'fetchUser' src/
```

`-r`：ディレクトリ以下を再帰的に検索する。

```bash
grep -r --include='*.js' 'fetchUser' src/
```

JavaScriptファイルだけ検索する。

```bash
grep -r --exclude-dir=node_modules 'fetchUser' .
```

`node_modules`を除外する。

### D. 周囲の文脈を出す

ログ調査ではかなり重要である。

```bash
grep -C 3 'Exception' app.log
```

一致行の前後3行を出す。

```bash
grep -B 5 'Exception' app.log
```

前5行。

```bash
grep -A 10 'Exception' app.log
```

後10行。

「見つける」だけでなく、「何が起きたか読む」段階までgrepが助けてくれる。

---

## 7. AND・OR・NOT検索はどう作るか

### OR

EREなら`|`が分かりやすい。

```bash
grep -E 'ERROR|WARN' app.log
```

あるいは複数の`-e`を使える。

```bash
grep -e 'ERROR' -e 'WARN' app.log
```

### NOT

`-v`を使う。

```bash
grep 'ERROR' app.log | grep -v 'healthcheck'
```

`ERROR`を含むが`healthcheck`は含まない行になる。

### AND

最も分かりやすいのはgrepをつなぐ方法である。

```bash
grep 'ERROR' app.log | grep 'payment'
```

1段目で`ERROR`を含む行だけに絞り、2段目でさらに`payment`を含む行へ絞る。

これは集合として考えると理解しやすい。

```text
全行
 ↓ grep ERROR
ERRORを含む行
 ↓ grep payment
ERRORかつpaymentを含む行
```

パイプは単なる「コマンドをつなぐ記号」ではない。

**データを段階的に絞り込む検索パイプライン**を作る仕組みでもある。

---

## 8. grepの終了コードは、出力と同じくらい重要

grepを人間がターミナルで使うだけなら、表示された行を見るだけでよい。

しかしシェルスクリプトでは、grepが「見つけたかどうか」自体をプログラムが知りたい。

GNU grepの通常の終了ステータスは次のようになる。

```text
0  1行以上選択された
1  1行も選択されなかった
2  エラーが起きた
```

ここで重要なのは、**1はエラーとは限らない**ことだ。

「探したが存在しなかった」という正常な検索結果である。

たとえば、

```bash
if grep -q 'READY' app.log; then
  echo 'ready'
else
  echo 'not ready'
fi
```

`-q`は一致行を表示せず、存在判定だけに使える。

grepは単なる表示ツールではなく、**真偽判定を返す部品**としてシェルスクリプトに組み込める。

この性質を知らないと、`set -e`を有効にしたシェルスクリプトで「grepが何も見つけなかっただけなのに処理全体が止まる」といった事故が起きる。

---

## 9. 実務1：コードを検索する

### 関数名を探す

```bash
grep -rIn 'fetchUser' src/
```

- `-r`：再帰検索
- `-I`：バイナリファイルを無視
- `-n`：行番号

### TODOとFIXMEをまとめて探す

```bash
grep -rInE 'TODO|FIXME' .
```

### JavaScriptだけに絞る

```bash
grep -rIn --include='*.js' --include='*.jsx' 'deprecatedFunction' src/
```

ただしGit管理されたコードを探すだけなら、後述する`git grep`の方が自然な場合が多い。

---

## 10. 実務2：ログを読む

ログ検索ではgrepが非常に強い。

### エラー行を見る

```bash
grep -n 'ERROR' app.log
```

### エラーの前後も見る

```bash
grep -nC 5 'ERROR' app.log
```

### 特定処理のエラーだけ見る

```bash
grep 'ERROR' app.log | grep 'payment'
```

### ノイズを除く

```bash
grep 'ERROR' app.log | grep -v 'healthcheck'
```

### 時刻を絞る

ログ形式が、

```text
2026-08-14 21:43:02 ERROR payment timeout
```

なら、

```bash
grep '^2026-08-14 21:' app.log
```

で21時台を絞れる。

ここでgrepは、ログ解析システムの代用品というより、**仮説を高速に試す探索装置**として強い。

「この障害、paymentだけか？」「healthcheckを除くと何件か？」「直前にどんなログが出ているか？」を数秒で試せる。

---

## 11. 実務3：CSVをgrepするときの限界

たとえば単純なCSVがある。

```text
id,name,city
1,Alice,Tokyo
2,Bob,Osaka
3,Carol,Tokyo
```

Tokyoを含む行なら、

```bash
grep ',Tokyo$' users.csv
```

で探せる。

しかしCSVが、

```text
4,"Dave, Jr.",Tokyo
```

のように引用符やフィールド内カンマを持ち始めると、grepで「第3列」を正確に理解することはできない。

grepが理解しているのはCSV構造ではなく、基本的には文字列パターンである。

したがって、

> **grepは構造を知らない。見えているテキストにパターンを当てている。**

という限界を覚えておく必要がある。

CSVの列構造を正確に扱うならCSVパーサー、JSONなら`jq`、SQLデータならSQLなど、構造を理解するツールを使う方がよい。

これはgrepを使わない理由ではなく、**grepの抽象度を正しく理解する**という話である。

---

## 12. GNU grepは内部で何をしているのか

ここから少し深く入る。

素朴な検索なら、各文字位置から検索語を1文字ずつ比較していけばよい。

しかし巨大なファイルや大量のファイルでは、それでは遅い。

GNU grepの公式マニュアルは、検索に複数の高速なオートマトンを利用し、特殊な正規表現機能が必要な場合にはより遅いマッチャーも併用すると説明している。

特に固定文字列では、状況に応じて代表的に次のアルゴリズムが使われる。

### 12-1. Boyer–Moore

単一の固定文字列を探すときに使える高速な文字列検索アルゴリズムである。

直感的には、検索語を左から毎文字比較するのではなく、**不一致の情報を使って比較位置を大きく飛ばす**。

たとえば長い文章から、

```text
connection_refused
```

のような固定語を探すとき、毎バイトを愚直に先頭から比較し続ける必要はない。

「この文字がここで出たなら、次に一致する可能性がある位置まで進める」という情報を利用する。

### 12-2. Aho–Corasick

複数の固定文字列を同時に探すときに強い。

たとえば、

```text
ERROR
WARN
FATAL
TIMEOUT
```

を一度に探す場合、4回ファイル全体を走査するのではなく、多数の検索語を一つの状態機械へまとめ、一度の走査で候補を検出できる。

これは`grep -F`で複数パターンを検索するような場面と相性がよい。

### 12-3. 正規表現は有限オートマトンとして考えられる

正規表現の多くは、「今どの状態にいて、次の文字を読んだらどの状態へ移るか」という状態機械へ変換できる。

非常に単純化すると、

```text
start
 ↓ E
state1
 ↓ R
state2
 ↓ R
state3
 ↓ O
state4
 ↓ R
match
```

のようなものだ。

実際のgrepははるかに高度だが、正規表現を「文字列を頭から何度も試す呪文」ではなく、**入力ストリームを状態遷移させながら判定する機械**として考えると理解しやすい。

一方、後方参照のような機能は高速な有限オートマトンだけでは扱いにくく、GNU grepでは別のマッチャーが必要になることがある。

だから「正規表現なら全部同じ速度」というわけではない。

---

## 13. なぜ`grep -F`が速くなりうるのか

固定文字列を探したいのに正規表現エンジンへ「これは正規表現です」と渡すと、ツール側は正規表現として解釈する必要がある。

一方、

```bash
grep -F 'ERROR_CODE_42' huge.log
```

のように固定文字列だと明示すれば、grepは文字列検索に特化した戦略を取りやすい。

ただし、現代のgrepは正規表現から固定的な部分を抽出して高速化する場合もあるため、単純に「-Fなら必ず何倍速い」とは言えない。

重要なのは、性能以前に**意図を正しく伝える**ことだ。

- 正規表現が必要 → `-E`
- 文字をそのまま探す → `-F`

この使い分けは、可読性と性能の両方に効く。

---

## 14. localeが検索速度と意味を変える

GNU grepの性能説明には、localeも登場する。

UTF-8のようなマルチバイト文字環境では、単純な1バイト文字だけの世界より文字の解釈が複雑になる。

そのため、条件によっては、

```bash
LC_ALL=C grep 'pattern' huge.txt
```

のようにC localeを使うことで高速になる場合がある。

ただし、これは単なる「高速化スイッチ」ではない。

localeは、

- 何を文字として扱うか
- 大文字小文字
- 文字クラス
- 並び順

などの意味にも影響する。

特に日本語を含むデータでは、結果の意味が変わらないことを確認せずに`LC_ALL=C`へ切り替えるべきではない。

最適化は、意味を保てる場合にだけ行う。

---

## 15. 検索は「見つける速度」だけでは決まらない

巨大ファイルで検索性能を考えるとき、正規表現エンジンだけ見ても不十分である。

処理時間には、

```text
ファイルを列挙する
↓
ファイルを開く
↓
ストレージから読む
↓
文字列を照合する
↓
改行位置を処理する
↓
ファイル名・行番号などを整形する
↓
結果をstdoutへ書く
```

という複数段階がある。

一致結果が何百万行もある検索では、マッチングより「大量の文字をターミナルへ出す」方が支配的になる場合さえある。

存在確認だけなら、

```bash
grep -q 'needle' huge.txt
```

のように出力をやめ、最初の一致で終われる形の方が合理的である。

つまり検索最適化とは、検索アルゴリズムだけでなく、**不要なI/Oと不要な仕事を減らす設計**でもある。

---

## 16. バイナリファイルと文字コード

grepは本来テキスト検索の道具である。

GNU grepは入力にNULバイトなどがあると、ファイルをバイナリと判断する場合がある。

そのとき、通常のテキストと同じ出力をしないことがある。

代表的な選択肢として、

```bash
grep -a 'pattern' file
```

の`-a`は、バイナリをテキストとして扱う。

一方、

```bash
grep -I 'pattern' file
```

ならバイナリを一致しないものとして扱う。

ただし`-a`で本当にバイナリデータをターミナルへ吐くと、読めない制御文字などが混ざる可能性がある。

「何でもgrepできる」ではなく、grepは基本的に**テキストという前提の上で非常に強い**と考えた方がよい。

---

## 17. `grep -r`、`git grep`、`ripgrep`は何が違うのか

現代のコード検索では、grepだけが選択肢ではない。

### grep

```bash
grep -r 'fetchUser' .
```

汎用的で、ほぼどこでも使える。

ディレクトリを再帰してファイル内容を検索する。

### git grep

```bash
git grep -n 'fetchUser'
```

Gitリポジトリの検索に特化している。

`git grep`は単なる`grep -r`の短縮ではない。Gitが管理しているworking treeだけでなく、オプションによってindexや特定のtree/blobを検索できる。

つまり「ファイルシステムを検索するツール」より、**Gitのオブジェクト世界を理解している検索ツール**に近い。

Git管理下のソースコードを探すなら非常に自然である。

### ripgrep (`rg`)

```bash
rg 'fetchUser'
```

ripgrepは現代的なコード・ディレクトリ検索に最適化されたline-oriented search toolである。

デフォルトで、

- 再帰検索
- `.gitignore`の尊重
- hidden fileの除外
- binary fileの除外

などを行う。

さらに公式READMEでは、高速性の理由として、Rustのregex engine、有限オートマトン、SIMD、literal optimization、並列ディレクトリ走査、状況に応じたbuffered searchとmemory mapの使い分けなどを挙げている。

コード検索で、

```bash
grep -rIn --exclude-dir=.git --exclude-dir=node_modules 'foo' .
```

と毎回長く書いているなら、

```bash
rg 'foo'
```

がかなり快適になる。

ただし、シェルスクリプトの可搬性や最小環境ではgrepの強さが残る。

**grepは基礎語彙、rgは現代的な検索体験**と考えると分かりやすい。

---

## 18. grep・find・awk・sedをどう使い分けるか

CLIを触り始めると、この4つが混ざりやすい。

役割を一言ずつにするとこうなる。

### grep：内容で行を選ぶ

```bash
grep 'ERROR' app.log
```

「このパターンに合う行はどれ？」

### find：ファイルそのものを選ぶ

```bash
find . -name '*.log'
```

「条件に合うファイルはどれ？」

### awk：行をフィールドとして計算・加工する

```bash
awk '$3 > 100 { print $1, $3 }' data.txt
```

「列や値を使って処理したい」

### sed：テキストストリームを置換・変換する

```bash
sed 's/ERROR/WARN/g' file.txt
```

「流れてくるテキストを変形したい」

実務では組み合わせる。

```bash
find logs -name '*.log' -print0 \
  | xargs -0 grep -l 'FATAL'
```

のように、「ファイル選択」と「内容検索」を分担できる。

ただしGNU grepなら`--include`や`--exclude`で十分なケースも多い。

道具を増やすことが目的ではない。**何を選別したいのか――ファイルか、行か、列か――を先に決める**ことが大切である。

---

## 19. grepを理解すると、Unixの設計思想が見えてくる

grepの面白さは、単独で何でもできないところにある。

grepは、

- ログを生成しない
- ファイル一覧を高度に管理しない
- JSON構造を理解しない
- CSVを完全には理解しない
- 集計表を作ることを主目的にしない

ただ、入力を受けて、パターンに合う行を選び、出力する。

だからこそ、

```bash
producer | grep | sort | uniq | another_command
```

のように別の小さな道具と接続できる。

大きな万能アプリにすべてを覚えさせるのではなく、**小さな道具同士をデータの流れで組み合わせる**。

grepを深く学ぶことは、検索コマンドを一つ覚えること以上に、Unix系CLIの考え方を学ぶことなのである。

---

## 20. 最後に、grepを見るための5つの問い

知らないgrepコマンドに出会ったら、左からオプションを暗記しようとしなくてよい。

次の5問で読む。

### 1. 入力はどこから来るか

```text
ファイル？
stdin？
前のパイプ？
再帰ディレクトリ？
```

### 2. パターンは何として解釈されるか

```text
BRE？
ERE (-E)？
固定文字列 (-F)？
PCRE (-P)？
```

### 3. どの行を選ぶか

```text
一致？
非一致 (-v)？
行全体 (-x)？
大文字小文字無視 (-i)？
```

### 4. 何を出力するか

```text
行そのもの？
行番号 (-n)？
件数 (-c)？
ファイル名 (-l)？
何も出さず真偽だけ (-q)？
```

### 5. 次にどこへ流れるか

```text
terminal？
ファイルへリダイレクト？
次のgrep？
awk？
sort？
```

この5問が見えれば、長いgrepコマンドも「記号の塊」ではなく、データ処理の設計図として読めるようになる。

---

## 結論

最初のgrepは、たったこれでよい。

```bash
grep 'ERROR' app.log
```

だが、この短いコマンドの裏では、

```text
入力源を決める
↓
データを読む
↓
検索パターンを解釈する
↓
高速なマッチングを行う
↓
一致した行を選ぶ
↓
stdoutへ出す
↓
検索結果を終了コードとして返す
```

という処理が行われている。

さらにパイプを使えば、grepの出力を別の入力にできる。

この視点に立つと、grepは「ファイルから文字を探すコマンド」ではなくなる。

**grepは、流れてくるテキストに条件をかけ、次の処理へ渡す小さな検索エンジンである。**

そして、その小ささの中に、正規表現、標準入出力、終了コード、オートマトン、文字列探索アルゴリズム、Unix的なツール合成という大きな世界が入っている。

grepを使えるようになることと、grepが何をしているかを理解することは別物である。

後者まで行くと、ターミナルで目にする他のコマンドも、少しずつ同じ言語で読めるようになる。

---

## 参考資料

一次資料・公式ドキュメントを中心に参照した。

- GNU Project, **GNU Grep Manual 3.12**  
  https://www.gnu.org/software/grep/manual/grep.html
- GNU Project, **GNU Grep — Performance**  
  https://www.gnu.org/software/grep/manual/html_node/Performance.html
- GNU Project, **GNU Grep — Regular Expressions**  
  https://www.gnu.org/software/grep/manual/html_node/Regular-Expressions.html
- GNU Project, **GNU Grep — Exit Status**  
  https://www.gnu.org/software/grep/manual/html_node/Exit-Status.html
- GNU Project, **Bash Reference Manual — Pipelines**  
  https://www.gnu.org/software/bash/manual/html_node/Pipelines.html
- The Open Group, **POSIX grep utility specification**  
  https://pubs.opengroup.org/onlinepubs/9699919799/utilities/grep.html
- Git, **git-grep Documentation**  
  https://git-scm.com/docs/git-grep
- BurntSushi, **ripgrep README / User Guide**  
  https://github.com/BurntSushi/ripgrep
  
### 補足

grepにはGNU grep、BSD grepなど複数の実装があり、オプションや細部の挙動は完全には同一ではない。本稿はPOSIXで共通する考え方を土台にしつつ、内部実装・高速化については主にGNU grep 3.12の公式マニュアルを参照している。