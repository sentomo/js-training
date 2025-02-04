# TypeScriptのトランスパイルにおける@babel/preset-typescript、tsc

## @babel/preset-typescriptとは
* Babelは、JavaScriptの最新機能(ES6など)を使って書かれたコードを、それらの機能をサポートしないブラウザでも動くコードに変換する。
* 2018/8に、@babel/preset-typescriptが登場したことで、それまでtscで行っていたTypeScriptからJavaScriptへの変換はBabelでもできるようになった。

## tscとは
* tscはTypeScriptの開発チームが提供しているTypeScriptのトランスパイラで、TypeScriptで書かれたソースコードをJavaScriptへとトランスパイルするツール。
* トランスパイル対象となるのは、JavaScriptの構文だけ。

## 違い
* @babel/preset-typescriptは、型チェックを実施しない。
* @babel/preset-typescriptは、デコレーター(TypeScriptに導入されているクラスの宣言などに結び付けられる特別な宣言の1つ)など一部のTypeScriptの機能を正常にトランスパイルできない問題がある。

## 参考
* [tscとBabel \| みどりのさるのエンジニア](https://t-yng.jp/post/tsc-and-babel)
* [@babel/preset\-typescriptを使ってTypeScriptを変換する \#TypeScript \- Qiita](https://qiita.com/nacam403/items/edf3e2c8ff364aff910f)
* [【JavaScript】Babelとは何か \#初心者 \- Qiita](https://qiita.com/mzmz__02/items/e6fbe5e30cc3fd13788f)