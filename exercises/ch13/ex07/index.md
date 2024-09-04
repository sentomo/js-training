# h1
## 予想
3秒後にAが出力され、さらに2秒後にBが出力され、さらに1秒後にCが出力される。

## 結果
3秒後にAが出力され、さらに2秒後にBが出力され、さらに1秒後にCが出力される。

## 理由
* try...catch ブロックが使用されているが、wait関数内でエラーがスローされていないため、例外が発生することはない。したがって、catchブロックは実行されず、log(e.message) は呼び出されない。
* 処理順序
  * await wait3は3秒待機するPromiseを返す。awaitを使っているため、wait3のPromiseが解決するまで処理を待機する。
  * 3秒経ってwait3が解決したら、logAが実行されてAが出力される。
  * await wait2は2秒待機するPromiseを返す。awaitを使っているため、wait2のPromiseが解決するまで処理を待機する。
  * 2秒経ってwait2が解決したら、logBが実行されてBが出力される。
  * await wait1は1秒待機するPromiseを返す。awaitを使っているため、wait1のPromiseが解決するまで処理を待機する。
  * 1秒経ってwait1が解決したら、logCが実行されてCが出力される。

```
wait3
|------|
        logA
        |-|
           wait2
          |----|
               logB
               |-|
                 wait1
                 |--|
                    logC
                    |-|
```

# h2
## 予想
Xが出力される。

## 結果
Xが出力される。

## 理由
* Promise内で例外が発生すると、そのPromiseはrejected状態になる。rejected状態は後続のcatchメソッドにキャッチされる。
* 処理順序
  * 生成されたPromiseを実行し、errX例外をスローして、例外が発生する。Promiseで例外が発生するとrejected状態になって解決する。
  * Promiseが解決したので、catchメソッドが実行され、Promiseから渡されたerrXエラーを受け取り、Xを出力する。

```
new Promise
|--|
errX
|-|
catch X
|-|
```

# h3
## 予想
Xのエラーのスタックトレースが出力される

## 結果
以下が出力された。
```
file:///Users/sentomo/git/JavaScriptTraining/js-training/exercises/ch13/ex07/index.js:24
  throw new Error("X");
        ^

Error: X
    at errX (file:///Users/sentomo/git/JavaScriptTraining/js-training/exercises/ch13/ex07/index.js:24:9)
    at file:///Users/sentomo/git/JavaScriptTraining/js-training/exercises/ch13/ex07/index.js:53:5
    at new Promise (<anonymous>)
    at h3 (file:///Users/sentomo/git/JavaScriptTraining/js-training/exercises/ch13/ex07/index.js:52:3)
    at file:///Users/sentomo/git/JavaScriptTraining/js-training/exercises/ch13/ex07/index.js:56:1
    at ModuleJob.run (node:internal/modules/esm/module_job:195:25)
    at async ModuleLoader.import (node:internal/modules/esm/loader:336:24)
    at async loadESM (node:internal/process/esm_loader:34:7)
    at async handleMainPromise (node:internal/modules/run_main:106:12)

Node.js v18.19.1
```

## 理由
* new Promiseの引数として渡されたasync関数内でスローされたエラーは、Promiseのreject状態を生成するのではなく、Promiseコンストラクタのスコープ外でエラーとして扱われる。そのため、エラーがキャッチされることなく、スローされたエラーとして直接出力される。

# h4
## 予想
2秒後にXが出力される。await p1が最初に実行されて、解決されるまでawait p2は実行されない。

## 結果
以下が出力された。
```
file:///Users/sentomo/git/JavaScriptTraining/js-training/exercises/ch13/ex07/index.js:27
  throw new Error("Y");
        ^

Error: Y
    at errY (file:///Users/sentomo/git/JavaScriptTraining/js-training/exercises/ch13/ex07/index.js:27:9)
    at file:///Users/sentomo/git/JavaScriptTraining/js-training/exercises/ch13/ex07/index.js:64:7

Node.js v18.19.1
```

## 理由
* 処理順序
  * await p1とawait p2が実行されて、await p2の方が先に1秒早く解決される。
  * errY()が実行されるが、Promiseのcatchメソッドが定義されていないので、エラーは処理されずに例外スローされた内容が出力される。
```
await p1
|----|
await p2
|--|
    errY
    |-|
```