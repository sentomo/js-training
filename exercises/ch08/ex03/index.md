> プログラミング言語や処理系によっては、再帰呼び出しを関数の処理の末尾にする(末尾再帰)ことで、スタックオーバーフローが起こらないよう最適化できるものがある。末尾再帰は何故そのような最適化ができるのか答えなさい。
* 参考：[末尾再帰による最適化 #JavaScript - Qiita](https://qiita.com/pebblip/items/cf8d3230969b2f6b3132)
* ある関数fが別の関数gを末尾呼び出ししているとき、fの結果（リターン値）はgの結果そのものです。つまり、gの呼び出し後にfのスタックフレームは使用されません。したがって、gの呼び出し時にスタックフレームを新たに生成するのではなく、fのスタックフレームをgのスタックフレームとして再利用することが可能です。これを 末尾呼び出しの除去（tail call elimination） と呼びます。コンパイラや実行環境が行う末尾呼び出しの除去を 末尾呼び出し最適化（tail call optimization） といいます。
  * →スタックを再利用することで、スタックを減らすことができ、確保するメモリも減らせる。
* ES6は末尾呼び出し最適化に対応している。


> JavaScript で末尾再帰最適化を実装している処理系を答えなさい。
利用できる環境があれば、実際に以下の URL を表示・実行してエラーが発生しないことを確認しなさい。
https://www.typescriptlang.org/play?#code/GYVwdgxgLglg9mABMAhtOAnGKA2AKMALkTBAFsAjAUwwEpEBvAWAChFlxp4kYoa8ADhjgATENGKlKNADSIIccHwyTy1Oo1bt2MYIjwKlNRAD4S9Zm23sMVKCAxIho8VADcW7QF9PNuw55lQWExaEQAKnlFMGU5QxjjAGpEAEZaDysfK1t7R0RefhS5NIys1gUwAGc4HCoAOhw4AHM8VHQsXDwUgAZe3tp01iA
* Safari(JavaScriptCoreエンジン)で上記URLを実行すると、 `[LOG]: Infinity ` と出力される。
* 参考：[末尾呼び出し最適化とJavaScript - Speaker Deck](https://speakerdeck.com/kota_yata/mo-wei-hu-bichu-sizui-shi-hua-tojavascript)

