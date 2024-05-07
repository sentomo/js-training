# 問題
以下のプログラムの出力を予想し、実際の実行結果を確認しなさい。
```
function f() {
    try {
        return true;
    } finally {
        return false;
    }
}

console.log(f());
```

# 予想
true

# 結果
false

## 理由
* p.131に、「return文やcontinue文、break文で処理がtryブロックから移動する場合は、処理が移動する前にfinallyブロックが実行されます。」「tryブロックが、break文やcontinue文、return文など、どのような方法で処理を終了したかにかかわらず、finallyブロックのコードは必ず実行されます。」と書いてある。