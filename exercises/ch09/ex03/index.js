// xをプライベートフィールドにした時
export class C1 {
  #x = 42;

  get x() {
    return this.#x;
  }
}

// クロージャを使った時
export class C2 {
  constructor() {
    const x = 42;
    // this._x = 42; 

    this.getX = function() {
      return x;
    };
  }

  // get x() {
  //   return this.getX();
  // }
}