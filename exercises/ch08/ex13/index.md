```
function f(input) {
  const f = new Function(`return "Hello, " + ${input}`);
  console.log(f());
}
```

# 問題点
* 上記のコードには、ユーザが入力する文字列をそのまま new Function に渡して実行するため、インジェクション攻撃に対して脆弱性が高い。ユーザーのデータの漏洩やサービスの不正利用につながる可能性がある。

# 問題を実証するコード
* 入力値に以下を入力するとサイト内に秘密情報が記載されている場合はコンソール出力されてしまう。
```
document.documentElement.innerHTML
```
* 参考：https://www.eg-secure.co.jp/tokumaru/youtube/33