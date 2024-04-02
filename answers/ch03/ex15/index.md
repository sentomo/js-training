# 予想
* 以下のように出力される。
```
0
1
2
3
4
5
6
7
8
9
undefined
```

# 結果
```
sentomoMBP:answers sentomo$ node ch03/ex15/index.js 
0
1
2
3
4
5
6
7
8
9
file:///Users/sentomo/git/JavaScriptTraining/js-training/answers/ch03/ex15/index.js:8
console.log(i);
            ^

ReferenceError: i is not defined
    at file:///Users/sentomo/git/JavaScriptTraining/js-training/answers/ch03/ex15/index.js:8:13
    at ModuleJob.run (node:internal/modules/esm/module_job:195:25)
    at async ModuleLoader.import (node:internal/modules/esm/loader:336:24)
    at async loadESM (node:internal/process/esm_loader:34:7)
    at async handleMainPromise (node:internal/modules/run_main:106:12)

Node.js v18.19.1
```

* 最後のconsole.logのiは、スコープ内で宣言されていないから。

# コード内の全てのletをvarに変えた場合
* 結果
```
0
1
2
3
4
5
6
7
8
9
10
```
* iはvarで宣言された変数で、関数中のどこでも使用できるため。

# コード内の全てのletを削除した場合
```
file:///Users/sentomo/git/JavaScriptTraining/js-training/answers/ch03/ex15/index.js:18
for (i = 0; i < 10; i++) {
       ^

ReferenceError: i is not defined
    at file:///Users/sentomo/git/JavaScriptTraining/js-training/answers/ch03/ex15/index.js:18:8
    at ModuleJob.run (node:internal/modules/esm/module_job:195:25)
    at async ModuleLoader.import (node:internal/modules/esm/loader:336:24)
    at async loadESM (node:internal/process/esm_loader:34:7)
    at async handleMainPromise (node:internal/modules/run_main:106:12)

Node.js v18.19.1
```
* 宣言されていない変数が使われているためエラー。