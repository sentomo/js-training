# 問題
以下のプログラムの出力を予想し、実際の実行結果を確認しなさい。
```
let x = 0;

for(let i = 1; i <= 5; i++) {
    x = i;
    try {
        throw Error();
    } catch {
        break;
    } finally {
        continue;
    }
}

console.log(x);
```

# 予想
5

# 結果
5

# 理由
finallyブロックのcontinue;文が優先されるため、for文でiがインクリメントされている。