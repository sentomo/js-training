# costOfLength が負の値を返したり、costOfLength の引数の値を大きくすれば大きくする程結果が小さくなる理由
* 実行環境によっては、タイミング攻撃やフィンガープリントに対するセキュリティ対応として、performance.nowの精度が丸められる場合がある。
* 参考：[javascript \- toFixed\(\) behavior on performance\.now\(\) \- Stack Overflow](https://stackoverflow.com/questions/64963790/tofixed-behavior-on-performance-now)