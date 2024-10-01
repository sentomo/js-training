# グローバルオブジェクトを参照する方法
1. ブラウザ内
windowで参照
```
console.log(window);
```

1. node内
globalで参照
```
console.log(global);
```

1. ブラウザ、node問わず
globalThisで参照
```
console.log(globalThis);
```

# ブラウザとnodeのグローバルオブジェクトのプロパティやメソッドを比較
* ブラウザ独自のプロパティやメソッドもあれば、環境固有のものもある。
## ブラウザのグローバルオブジェクト
* window.alert()
* window.prompt()
* window.confirm()
* window.fetch()
* window.document
* window.localStorage
* window.sesssionStorage
* window.navigator
* window.history
* window.location

## Node.jsのグローバルオブジェクト
* Node.jsにはwindowは存在せず、globalがグローバルオブジェクトである。
* global.process: Node.jsプロセスに関する情報を提供。
* global.require: モジュールのインポートに使用される関数。
* global.__dirname: 現在のモジュールのディレクトリパスを返す。

# グローバルオブジェクトにundefinedが定義されていることによる問題
```
console.log(globalThis.undefined); //undefined
undefined = 42;
console.log(undefined); // 42
```
ES3では、undefinedは書き換え可能だった。ES5で修正されて、再代入できない仕様になった。

