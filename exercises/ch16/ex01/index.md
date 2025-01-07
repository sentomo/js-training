# マルチスレッドとは
* スレッドとは、コンピュータプログラムにおいて特定の処理を行うための一貫性のある命令の流れのことであり、プロセッサ利用の最小単位。プロセスは少なくとも1つ以上のスレッドを含む。
* 複数のスレッドを生成して個々に処理を割り当てて実行させることで、並行処理による応答性の向上などを実現でき、さらにマルチコアプロセッサを複数のスレッドによって活用することで、並列処理による実行時間の短縮などを実現できる（これらの手法をマルチスレッドプログラミングと呼ぶ）。
* マルチスレッド処理のプログラミングにおいては、同じデータを複数のスレッドが同時に書き換えることによる不整合に注意し、排他制御を行う必要がある。
* 参考：[スレッド (コンピュータ) - Wikipedia](https://ja.wikipedia.org/wiki/%E3%82%B9%E3%83%AC%E3%83%83%E3%83%89_(%E3%82%B3%E3%83%B3%E3%83%94%E3%83%A5%E3%83%BC%E3%82%BF))

# mFib.jsを実行
## 項数45、スレッド数4の時
* 結果(1例)
```
$ node mFib.js 45 4
Worker 2 execution time: 2.306s
Worker 3 execution time: 5.758s
Worker 1 execution time: 5.880s
Worker 0 execution time: 9.843s
Total execution time: 9.852s
Fibonacci number: 1836311902
```
* スレッド数(アクティビティモニタ上のnodeプロセス)：16
* Total execution timeの平均時間(4回実行)：15.20025s

## 項数45、スレッド数8の時
* 結果(1例)
```
$ node mFib.js 45 8
Worker 1 execution time: 662.918ms
Worker 3 execution time: 870.013ms
Worker 4 execution time: 1.225s
Worker 7 execution time: 1.733s
Worker 5 execution time: 2.446s
Worker 2 execution time: 3.939s
Worker 6 execution time: 5.417s
Worker 0 execution time: 8.338s
Total execution time: 8.349s
Fibonacci number: 1836311902
```
* スレッド数(アクティビティモニタ上のnodeプロセス)：20
* Total execution timeの平均時間(4回実行)：10.72625s

## 項数45、スレッド数10の時
* 結果(1例)
```
$ node mFib.js 45 10
Worker 8 execution time: 387.387ms
Worker 0 execution time: 536.253ms
Worker 9 execution time: 690.384ms
Worker 4 execution time: 1.006s
Worker 2 execution time: 1.279s
Worker 5 execution time: 1.823s
Worker 7 execution time: 2.500s
Worker 6 execution time: 3.659s
Worker 1 execution time: 5.491s
Worker 3 execution time: 9.183s
Total execution time: 9.204s
Fibonacci number: 1836311902
```
* スレッド数(アクティビティモニタ上のnodeプロセス)：22
* Total execution timeの平均時間(4回実行)：9.02975s

## 項数45、スレッド数15の時
* 結果(1例)
```
$ node mFib.js 45 15
Worker 12 execution time: 230.598ms
Worker 14 execution time: 193.155ms
Worker 4 execution time: 303.09ms
Worker 5 execution time: 333.917ms
Worker 7 execution time: 377.489ms
Worker 11 execution time: 457.922ms
Worker 0 execution time: 583.646ms
Worker 10 execution time: 701.246ms
Worker 9 execution time: 956.861ms
Worker 8 execution time: 1.293s
Worker 1 execution time: 1.859s
Worker 2 execution time: 2.546s
Worker 3 execution time: 3.693s
Worker 6 execution time: 8.309s
Worker 13 execution time: 10.358s
Total execution time: 10.447s
Fibonacci number: 1836311902
```
* スレッド数(アクティビティモニタ上のnodeプロセス)：27
* Total execution timeの平均時間(4回実行)：9.40925s

## 項数45、スレッド数16の時
* 結果(1例)
```
$ node mFib.js 45 16
Worker 5 execution time: 353.549ms
Worker 7 execution time: 346.589ms
Worker 4 execution time: 381.786ms
Worker 14 execution time: 327.248ms
Worker 15 execution time: 332.345ms
Worker 8 execution time: 426.218ms
Worker 3 execution time: 530.625ms
Worker 11 execution time: 603.617ms
Worker 9 execution time: 734.75ms
Worker 0 execution time: 1.391s
Worker 10 execution time: 1.646s
Worker 6 execution time: 1.948s
Worker 1 execution time: 2.927s
Worker 2 execution time: 4.266s
Worker 13 execution time: 5.544s
Worker 12 execution time: 8.374s
Total execution time: 8.474s
Fibonacci number: 1836311902
```
* スレッド数(アクティビティモニタ上のnodeプロセス)：28
* Total execution timeの平均時間(4回実行)：8.47425s

## 項数45、スレッド数17の時
* 結果(1例)
```
$ node mFib.js 45 17
Worker 16 execution time: 370.75ms
Worker 12 execution time: 387.408ms
Worker 14 execution time: 381.018ms
Worker 15 execution time: 391.606ms
Worker 13 execution time: 410.93ms
Worker 10 execution time: 443.823ms
Worker 2 execution time: 599.529ms
Worker 3 execution time: 628.51ms
Worker 8 execution time: 685.42ms
Worker 0 execution time: 1.123s
Worker 11 execution time: 1.095s
Worker 1 execution time: 1.452s
Worker 9 execution time: 2.764s
Worker 4 execution time: 2.872s
Worker 6 execution time: 3.931s
Worker 7 execution time: 5.644s
Worker 5 execution time: 8.496s
Total execution time: 8.522s
Fibonacci number: 1836311902
```
* スレッド数(アクティビティモニタ上のnodeプロセス)：29
* Total execution timeの平均時間(4回実行)：8.878s

## 項数45、スレッド数20の時
* 結果(1例)
```
$ node mFib.js 45 20
Worker 18 execution time: 336.183ms
Worker 13 execution time: 388.925ms
Worker 12 execution time: 409.387ms
Worker 6 execution time: 479.469ms
Worker 14 execution time: 397.14ms
Worker 15 execution time: 391.692ms
Worker 17 execution time: 391.256ms
Worker 16 execution time: 399.855ms
Worker 19 execution time: 400.224ms
Worker 7 execution time: 499.403ms
Worker 2 execution time: 731.148ms
Worker 4 execution time: 775.509ms
Worker 0 execution time: 948.881ms
Worker 1 execution time: 1.227s
Worker 8 execution time: 1.582s
Worker 9 execution time: 1.961s
Worker 3 execution time: 2.730s
Worker 10 execution time: 4.162s
Worker 11 execution time: 5.618s
Worker 5 execution time: 13.454s
Total execution time: 13.493s
Fibonacci number: 1836311902
```
* スレッド数(アクティビティモニタ上のnodeプロセス)：32
* Total execution timeの平均時間(4回実行)：10.032s

## 項数45、スレッド数24の時
* 結果(1例)
```
$ node mFib.js 45 24
Worker 4 execution time: 560.472ms
Worker 10 execution time: 608.005ms
Worker 16 execution time: 634.071ms
Worker 14 execution time: 664.743ms
Worker 2 execution time: 735.333ms
Worker 19 execution time: 672.788ms
Worker 15 execution time: 693.805ms
Worker 22 execution time: 702.373ms
Worker 21 execution time: 711.224ms
Worker 12 execution time: 730.615ms
Worker 18 execution time: 726.149ms
Worker 13 execution time: 735.176ms
Worker 20 execution time: 729.046ms
Worker 17 execution time: 737.144ms
Worker 1 execution time: 815.621ms
Worker 23 execution time: 745.603ms
Worker 6 execution time: 1.025s
Worker 0 execution time: 1.258s
Worker 5 execution time: 1.713s
Worker 8 execution time: 2.039s
Worker 11 execution time: 3.014s
Worker 7 execution time: 4.263s
Worker 9 execution time: 5.698s
Worker 3 execution time: 8.524s
Total execution time: 8.541s
Fibonacci number: 1836311902
```
* スレッド数(アクティビティモニタ上のnodeプロセス)：36
* Total execution timeの平均時間(4回実行)：8.76725s

## 項数45、スレッド数32の時
* 結果(1例)
```
$ node mFib.js 45 32
Worker 1 execution time: 789.573ms
Worker 13 execution time: 714.553ms
Worker 2 execution time: 893.958ms
Worker 18 execution time: 793.056ms
Worker 3 execution time: 935.948ms
Worker 23 execution time: 831.122ms
Worker 20 execution time: 833.417ms
Worker 19 execution time: 872.39ms
Worker 14 execution time: 885.386ms
Worker 31 execution time: 818.546ms
Worker 4 execution time: 1.032s
Worker 17 execution time: 921.598ms
Worker 22 execution time: 927.887ms
Worker 12 execution time: 973.372ms
Worker 15 execution time: 944.25ms
Worker 21 execution time: 977.804ms
Worker 24 execution time: 1.001s
Worker 30 execution time: 945.618ms
Worker 27 execution time: 946.318ms
Worker 16 execution time: 1.026s
Worker 26 execution time: 971.539ms
Worker 29 execution time: 973.476ms
Worker 25 execution time: 981.299ms
Worker 28 execution time: 980.986ms
Worker 5 execution time: 1.219s
Worker 6 execution time: 1.407s
Worker 7 execution time: 1.801s
Worker 8 execution time: 2.383s
Worker 9 execution time: 2.977s
Worker 10 execution time: 4.090s
Worker 11 execution time: 5.819s
Worker 0 execution time: 8.799s
Total execution time: 8.810s
Fibonacci number: 1836311902
```
* スレッド数(アクティビティモニタ上のnodeプロセス)：24
* Total execution timeの平均時間(4回実行)：8.92175s

# 自分のPCでの適切なスレッド数
## PCのCPUスペック
* MacBook Pro (13-inch, M1, 2020)
  * Apple M1チップ: 4つの高性能コアと4つの高効率コアを搭載した8コアCPU

## 適切なスレッド数
* 16
* 高性能コアに効率よくタスクが分散されている？
