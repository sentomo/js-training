import { counterIter, counterGen } from "./main.js";

/*************************************************************************************************
 * 明示的にイテレータインタフェース のメソッドを呼んだり、間接的に呼んだりする
 */

const iter = counterIter(5);
console.log(iter.next()); // { value: 1, done: false }
console.log(iter.next()); // { value: 2, done: false }
console.log(iter.next()); // { value: 3, done: false }
console.log(iter.next()); // { value: 4, done: false }
console.log(iter.next()); // { value: 5, done: false }
console.log(iter.next()); // { value: undefined, done: true }

const gen = counterGen(5);
console.log(gen.next()); // { value: 1, done: false }
console.log(gen.next()); // { value: 2, done: false }
console.log(gen.next()); // { value: 3, done: false }
console.log(gen.next()); // { value: 4, done: false }
console.log(gen.next()); // { value: 5, done: false }
console.log(gen.next()); // { value: undefined, done: true }
console.log(gen.next()); // { value: undefined, done: true }

/*
以下は上記の出力結果
counterIter
counterIter: next
{ value: 1, done: false }
counterIter: next
{ value: 2, done: false }
counterIter: next
{ value: 3, done: false }
counterIter: next
{ value: 4, done: false }
counterIter: next
{ value: 5, done: false }
counterIter: next
{ value: undefined, done: true }
counterGen
counterGen: next
{ value: 1, done: false }
counterGen: next
{ value: 2, done: false }
counterGen: next
{ value: 3, done: false }
counterGen: next
{ value: 4, done: false }
counterGen: next
{ value: 5, done: false }
counterGen: finally
{ value: undefined, done: true }
{ value: undefined, done: true }
 */


/*************************************************************************************************
 *  ジェネレータ関数によって生成されたオブジェクトがイテレータインタフェースを満たしていることを確認する
 */

// counterGenにnextメソッドがあり、valueプロパティとdoneプロパティを持つ反復結果オブジェクトを返している。
// maxより大きい値に到達するまでは、valueの値としてインクリメントした数値、doneの値としてfalseを返す。
// maxより大きい値に到達した後は、valueの値としてundefined、doneの値としてtrueを返す。

/*************************************************************************************************
 * return() や throw() がどのようなときに呼ばれるのか確認する
 */

console.log("=======iter2=======");
const iter2 = counterIter(5);
console.log(iter2.next()); // { value: 1, done: false }
console.log(iter2.next()); // { value: 2, done: false }
console.log(iter2.next()); // { value: 3, done: false }
console.log(iter2.return(100)); // { value: 100, done: true } →returnの引数の値がvalueとしてセットされ、doneはtrue
console.log(iter2.return()); // { value: undefined, done: true } →returnの引数の値がvalueとしてセットされ、doneはtrue
// console.log(iter2.throw('error!')); // iter2のthrowブロックが呼ばれて、throw()関数の引数で指定したエラーメッセージを出力した後に、さらに例外を投げる

/*
以下、出力結果
=======iter2=======
counterIter
counterIter: next
{ value: 1, done: false }
counterIter: next
{ value: 2, done: false }
counterIter: next
{ value: 3, done: false }
counterIter: return: 100
{ value: 100, done: true }
counterIter: return: undefined
{ value: undefined, done: true }
counterIter: throw: error!

node:internal/process/esm_loader:40
      internalBinding('errors').triggerUncaughtException(
                                ^
error!
(Use `node --trace-uncaught ...` to show where the exception was thrown)

Node.js v18.19.1
 */

console.log("=======gen2=======");
const gen2 = counterGen(5);

console.log(gen2.next()); // { value: 1, done: false }
console.log(gen2.throw('error!')); // { value: undefined, done: true } →next()を1回以上呼んだ後にthrow()を呼ばないとinternalBinding('errors').triggerUncaughtException エラーが発生する
console.log(gen2.return(200)); // { value: 200, done: true } →returnの引数の値がvalueとしてセットされ、doneはtrue
console.log(gen2.return()); // { value: undefined, done: true } →returnの引数の値がvalueとしてセットされ、doneはtrue
console.log(gen2.next()); // { value: undefined, done: true } →doneがtrueになった後にnext()を呼んでも、{ value: undefined, done: true }となる
/*
以下、出力結果
=======gen2=======
counterGen
counterGen: next
{ value: 1, done: false }
counterGen: catch: error!
counterGen: finally
{ value: undefined, done: true }
{ value: 200, done: true }
{ value: undefined, done: true }
{ value: undefined, done: true }
 */


/*************************************************************************************************
 * ジェネレータ関数の中身がどのタイミングで初めて実行されるか確認する
 */

console.log("=======gen3=======");
const gen3 = counterGen(3); // counterGen関数の中身はまだ実行されていない

console.log("Before first next() of gen3()");
console.log(gen3.next().value);  // ここで初めてジェネレータ関数の中身が実行される
console.log("After first next() of gen3()");
console.log(gen3.next().value);  // ここで2回目のyieldが実行される
console.log(gen3.next().value);  // ここで3回目のyieldが実行される
console.log(gen3.next().value);  // maxに達するため、ジェネレータ関数が終了

/*
以下、出力結果
=======gen3=======
Before first next() of gen3()
counterGen
counterGen: next
1
After first next() of gen3()
counterGen: next
2
counterGen: next
3
counterGen: finally
undefined
 */

// 実行タイミング
// 1. counterGen(3) を呼び出した時点では、counterGen の中身はまだ実行されていない。
// 2. 最初に gen3.next() を呼び出したタイミングで、counterGen 関数の中身が初めて実行され、console.log("counterGen") が出力される。
// 3. その後、yield 文があるところまでコードが進行し、console.log("counterGen: next") が出力される。そして、最初のyieldが実行される。
// 4. gen3.next() を呼び出すたびに、次の yield が実行され、対応する console.log が出力される。
// 5. 最後の gen3.next() で max に達すると、finally ブロックが実行される。