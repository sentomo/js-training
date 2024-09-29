export class MyArrayLike {
  constructor(length) {
    this.length = length; // 配列のようなクラス
  }
}

export class MyArray extends Array {
  constructor(items) {
    super(...items);
  }

  // Symbol.speciesを使ってMyArrayLikeを返す
  static get [Symbol.species]() {
    return MyArrayLike;
  }
}
