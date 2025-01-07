# 用語
## 標準入力
* プログラムがデータを受け取るためのデフォルトの入力ストリーム。通常、キーボードからの入力が標準入力として扱われる。

## 標準出力
* プログラムがデータを出力するためのデフォルトの出力ストリーム。通常、画面（コンソール）への表示が標準出力として扱われる。

## 標準エラー出力
* プログラムがエラーメッセージを出力するためのデフォルトの出力ストリーム。エラー情報を標準出力と分けて処理するために使用される。

## リダイレクト
* 標準入力、標準出力、標準エラー出力のデータの流れを変更する操作。例えば、標準出力をファイルに保存したり、標準入力をファイルから読み込んだりすることができる。

## パイプ
一つのコマンドの標準出力を、別のコマンドの標準入力として接続する仕組み。これにより、複数のコマンドを組み合わせてデータを処理することができる。

## 参考
* [入出力 \- Wikipedia](https://ja.wikipedia.org/wiki/%E5%85%A5%E5%87%BA%E5%8A%9B)
* [LINUX パイプとリダイレクト \#Linux \- Qiita](https://qiita.com/xyz666/items/b555be4dadd06d7a61e7)

# 実験結果
## `node cat.mjs`
* 予測
  * 引数がないので、入力を受け付け待ち状態になる。入力すると、入力した値が出力される。
* 結果
  * 予測と同様。

## `echo FOO | node cat.mjs`
* 予測
  * まずFOOが出力される。そのあと、入力を受け付け待ち状態になる。入力すると、入力した値が出力される。
* 結果
  * FOOが出力されて、プログラムが終了する。

## `node cat.mjs > output.txt`
* 予測
  * 引数がないので、入力を受け付け待ち状態になる。入力すると、入力した値がoutput.txtに出力される。
* 結果
  * 予測と同様。

## `node cat.mjs test.txt`
* 予測
  * test.txtの内容が出力される。
* 結果
  * 予測と同様。

## `node cat.mjs test.txt > output.txt`
* 予測
  * test.txtの内容がoutput.txtに書き込まれる。
* 結果
  * 予測と同様。

## `node cat.mjs invalid-file > output.txt`
* 予測
  * output.txtの内容が空になる。
* 結果
  * output.txtの内容が空になり、以下のエラーが発生する。
  * ```
    node:events:495
      throw er; // Unhandled 'error' event
      ^

    Error: ENOENT: no such file or directory, open 'invalid-file'
    Emitted 'error' event on ReadStream instance at:
        at emitErrorNT (node:internal/streams/destroy:151:8)
        at emitErrorCloseNT (node:internal/streams/destroy:116:3)
        at process.processTicksAndRejections (node:internal/process/task_queues:82:21) {
      errno: -2,
      code: 'ENOENT',
      syscall: 'open',
      path: 'invalid-file'
    }

    Node.js v18.19.1
    ```
## `node cat.mjs invalid-file 2> error.txt`
* 予測
  * output.txtの内容が空になり、書き込みエラーが発生する。
* 結果
  * output.txtの内容が空になる。書き込みエラーが発生し。error.txtにエラー内容が書き込まれる。
  * 2> は 標準エラー出力を指定したファイルにリダイレクトする。0< は標準入力のリダイレクト、1> は標準出力のリダイレクトを表す。