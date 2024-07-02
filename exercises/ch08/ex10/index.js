export function addMyCall(f) {
  f.myCall = function(thisArg, ...args) { // fにmyCallプロパティを追加する
    const boundFn = this.bind(thisArg); // thisはmyCallが呼ばれているfのこと。thisコンテキストと引数を指定して関数を呼び出す。
    return boundFn(...args);
  };
}