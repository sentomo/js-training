# f3
## 予想
0秒後にAが出力され、その後例外が発生し、Bが出力され、最後にCが出力される。

## 結果
出力結果は以下の通り。catchブロックにあるlogB()が実行されていない。
```
C
A
file:///Users/sentomo/git/JavaScriptTraining/js-training/exercises/ch13/ex02/index.js:24
  throw new Error("X");
        ^

Error: X
    at errX (file:///Users/sentomo/git/JavaScriptTraining/js-training/exercises/ch13/ex02/index.js:24:9)

Node.js v18.19.1
```

## 理由
* try/catchは、非同期処理でスローされたエラーをキャッチできず、同期的なエラーのみをキャッチする。Promiseチェーンに.catch()メソッドを追加して非同期エラーを処理しないといけない。
* 処理順序
  * tryブロックの非同期処理が実行される。
  * finallyブロックは非同期処理が完了する前に実行されるため、Cが最初に出力される。
  * その後にlogAが wait(0).then(logA) によって呼び出され、Aが出力される。
  * errXがスローされると、Node.jsがエラーをキャッチして、Error: Xを出力する。

```
wait0
|-|
 logA
  |-|
  errX
  |-|
finally logC
|-|
```

# f4
## 予想
2秒後にAが出力され、40が返ってくる。

## 結果
2秒後にAが出力され、さらに1秒後にBと100が出力される。

## 理由
* 処理順序
  * wait2()で2秒待った後、1つ目のthen()でAを出力し、40を値として返しているのでPromiseが満たされ、次の2つ目のthen()が実行される。
  * 2つ目のthen()のコールバックの中でwait(1000)が実行されているため1秒待った後、wait(1000)のthen()が実行されてBが出力される。100を値として返しているのでPromiseが満たされ、次の3つ目のthen()が実行される。
  * 3つ目のthen()のコールバックでは、2つ目のthen()の返り値100をvとして引数で受け取り、100を出力する。

```
wait2
|----|
    logA
     |-|
    wait(1000)
     |--|
      logB
        |-|
        100
        |-|
```

# f5
## 予想
2秒後にAが出力され、1秒後にBが出力される。

## 結果
1秒後にBが出力され、さらに1秒後にAと40が出力される。

## 理由
* 処理順序
  * wait2()で2秒後に解決されるPromiseが返される。
  * 1つ目のthen()のlogAとreturn 40は、wait2が解決されたら実行される。
  * 2つ目のthen()の引数は、コールバック関数ではなくPromiseになっているため、即座にwait1().then(...)が実行されて、wait1の1秒後にBが出力される。100を返すが、3つ目のthen()にPromiseチェーンが正しくつながっていないため、(v) => log(v)は実行されない。
  * wait2()で2秒が経ったらAが出力され、40を3つ目のthen()に渡す。3つ目のthen()のコールバック関数で40を引数にして40を出力する。

```
wait2
|----|
    logA
      |-|
      40
      |-|
wait1
|--|
   logB
    |-|
```

#f6
## 予想
1秒後にAが出力され、さらに1秒後にBが出力される。

## 結果
1秒後にAが出力され、さらに1秒後にBが出力され、さらに1秒後にCが出力される。

## 理由
* pのthen()が複数呼ばれた場合、全てのthen()がpが解決された時に同時に実行される。
* 処理順序
  * pのwait1が1秒後に解決した時にAが出力される。
  * その後、1つ目のp.then()はwait1がさらに1秒後に解決された時にBが出力される。
  * その後、2つ目のp.then()のwait2がさらに2秒後に解決された時にCが出力される。

```
wait1
|--|
  logA
   |-|
   wait1
   |--|
     logB
      |-|
    wait2
   |----|
       logC
        |-|
```

# f7
## 予想
3秒後にA,B,Cが同時に出力される。

## 結果
1秒後にAが出力され、その1秒後にBとCが同時に出力される。

## 理由
* 処理順序
  * pはwait1()により1秒後に解決され、その後logAが実行されてAが出力される。
  * wait2()は2秒後に解決され、1つ目のthen()を実行し、pは解決済みなので即座にlogBが実行されてBが出力される。
  * 1つ目のthen()が解決されたので、2つ目のthen()のlogCが実行されてCが出力される。

```
wait1
|--|
  logA
   |-|
wait2
|----|
     logB
     |-|
     logC
     |-|
```

# f8
## 予想
1秒後にX、Y、Aが出力される。

## 結果
1秒後にX、Aが出力される。

## 理由
* p.391にある通り、Promiseの非同期チェーンの場合は、エラーが発生した際はcatch()呼び出しを見つけるまでエラーが「チェーンの下に落ちて」いく。
* 処理順序
  * wait1()により1秒後に解決した後に1つ目のthen()を実行し、errXコールバック関数で文字列"X"を引数にしたErrorクラスをスローする。
  * catch呼び出しを見つけるまで、次のPromiseチェーンを辿る。そのため2つ目のthen()にあるerrYは実行されない。
  * catchメソッドで1つ目のthen()から渡されたErrorクラスのmessageプロパティ"X"を出力する。
  * finallyメソッドでlogAが実行され、Aが出力される。
```
wait1
|--|
  errX
   |-|
  catch logX
   |-|
  finally logA
   |-|
```

# f9
## 予想
1秒後にY, Aが出力される。

## 結果
1秒後にY, Aが出力される。

## 理由
* 処理順序
  * wait1()により1秒後に解決した後に1つ目のthen()を実行し、値として42を返して、1つ目のthen()が解決し、満たされる。
  * 2つ目のthen()を実行し、errYコールバック関数で文字列"Y"を引数にしたErrorクラスをスローする。
  * catchメソッドで2つ目のthen()から渡されたErrorクラスのmessageプロパティ"Y"を出力する。
  * finallyメソッドでlogAが実行され、Aが出力される
```
wait1
|--|
  then(() => 42)
   |-|
  then(errY)
   |-|
  catch logY
   |-|
  finally logA
   |-|
```

# f10
## 予想
1秒後にY, Aが出力される。

## 結果
以下が出力された。
```
A
file:///Users/sentomo/git/JavaScriptTraining/js-training/exercises/ch13/ex02/index.js:27
  throw new Error("Y");
        ^

Error: Y
    at errY (file:///Users/sentomo/git/JavaScriptTraining/js-training/exercises/ch13/ex02/index.js:27:9)

Node.js v18.19.1
```

## 理由
* then()に2つのコールバックを渡す場合、1つ目のコールバックでエラーが発生すると、2つ目のコールバックはエラーをキャッチできないため、エラーが未処理のままになる。その結果、例外がコンソールに表示される。
* 処理順序
  * wait1()により1秒後に解決した後に1つ目のthen()を実行し、値として42を返して、1つ目のthen()が解決し、満たされる。
  * 2つ目のthen()で、第一引数のerrYコールバック関数を実行し、で文字列"Y"を引数にしたErrorクラスをスローする。catchメソッドがないため、未処理のまま。
  * 例外が発生してもfinallyメソッドは常に実行されるため、Aが出力される。
  * プログラムが終了した際に、例外がコンソールに出力される。

```
wait1
|--|
  then(() => 42)
   |-|
  then(errY)
   |-|
  finally logA
   |-|
```

# f11
## 予想
Error: Xのスタックトレースが出力される。

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

# f12
## 予想
0秒後にXが出力される。

## 結果
Error: Xのスタックトレースが出力される。

## 理由
* Promise 内の非同期処理（setTimeout）によって例外が発生するが、この例外は Promise の範囲外で発生するため、Promise の catch()メソッドでキャッチされない。