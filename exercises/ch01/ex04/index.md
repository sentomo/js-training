# 開発者ツール (Chrome の場合 F12) のコンソール上に何が表示されるか

* 予想
```
  ▶︎ { answer: 42 }
  ▶︎ { answer: 0 }
```
* 結果
```
  ▼ Object
    answer: 0
    ▶︎[[Prototype]]: Object
  ▼ Object
    answer:0
    ▶︎[[Prototype]]: Object
```


# 開発者ツールを開いた状態のタブで HTML を開く場合と、HTML を開いた状態のタブで開発者ツールを開く場合とで、結果を比較しなさい。

* 開発者ツールを開いた状態のタブで HTML を開く場合
```
  ▼ { answer: 42 }
    answer: 0
    ▶︎[[Prototype]]: Object
  ▼ { answer: 0 }
    answer:0
    ▶︎[[Prototype]]: Object
```
* HTML を開いた状態のタブで開発者ツールを開く場合
```
  ▼ Object
    answer: 0
    ▶︎[[Prototype]]: Object
  ▼ Object
    answer:0
    ▶︎[[Prototype]]: Object
```

# 常に期待した結果を得るためにはどのようにコードを修正すべきか答えなさい。
console.log()が呼び出された時点の値ではなく、開発者ツールのコンソールを開いた時点で評価した値が表示される。そのため、 `life.answer = 0;` を実行終了後のオブジェクトがconsole.logに表示される。
オブジェクトの参照ではなく、コピーを渡すようにするか、文字列で変換したものをconsole.logの引数に渡すようにする。
```html
<!DOCTYPE html>
<html>
  <body>
    <script>
      const life = { answer: 42 };
      console.log({...life});
      life.answer = 0;
      console.log({...life});
    </script>
  </body>
</html>
```

```html
<!DOCTYPE html>
<html>
  <body>
    <script>
      const life = { answer: 42 };
      console.log(JSON.stringify(life));
      life.answer = 0;
      console.log(JSON.stringify(life));
    </script>
  </body>
</html>
```