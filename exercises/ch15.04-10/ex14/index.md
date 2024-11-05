# ブラウザの開発者ツールで以下を実行し pushState の呼び出しがログに出力されるようにした状態でリンクを選択するとどうなるか？
```
window.history.pushState = new Proxy(window.history.pushState, {
  apply: (target, thisArg, argArray) => {
    console.log("pushState is called:", argArray);
    return target.apply(thisArg, argArray);
  },
});
```
* リンクをクリックすると、通信は発生している。名前がbar?_rsc=14roc、ステータスは200、184ミリ秒。

# pushState はいつ実行されているか？
* window.history.pushStateが呼び出されるたびに、コンソールに「pushState is called:」というメッセージと共にその呼び出しに渡された引数が表示されている。
  * sandboxでは、追加したページのBarやFooのリンクをクリックした時に、「pushState is called:」が出力されている。

# 15.4-10.12 では pushState を使った実装でページのリロード時に正しく動作しなかったが、この問題ではどうだろうか？
* 例えば、http://localhost:3000/bar の時にリロードすると、通信が発生し、再びhttp://localhost:3000/barにアクセスしThis is Bar!が表示された。きちんとリロード前のページが表示された。