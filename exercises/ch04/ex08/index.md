# void 0を使う理由
undefined はただのグローバル変数。そのため、undefinedに別の値を代入することができてしまい、undefinedが常にundefinedである保証がないため。
void演算子は常にundefinedを返す。

参考：https://liginc.co.jp/web/js/38494

# 今ではvoid 0を使わない理由
下記リンクに、
> 最近のブラウザー (JavaScript 1.8.5 / Firefox 4 以降) での undefined は、 ECMAScript 5 仕様により、設定不可、書込不可のプロパティとなります。 (そうでない場合でも、上書きは避けてください。)

とあるため。

参考：https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/undefined