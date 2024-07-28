# 予想
* index.jsを実行すると、以下が出力される
```
Start index.js
moduleA is executed
moduleB is executed
moduleA is executed
End index.js
```

# 実行結果
```
moduleA is executed
moduleB is executed
Start index.js
End index.js
```
* 全てのインポートが終わってからindex.jsが実行される。
  * p.288の2段落に「ES6 モジュールの優れた機能の 1 つは、各モジュールが静的なインポートを持つことです。つまり、最初にある1つのモジュールを指定した場合、Web ブラウザはインポートされているモジュールをすべて読むことができます。最初にインポートしたモジュールからインポートされるモジュール も次々に読み込むことができます。このようにして、完全にプログラムが読み込まれるまで続けていきます。」と書かれているから？
* moduleAを再インポートした際は、コードは実行されない