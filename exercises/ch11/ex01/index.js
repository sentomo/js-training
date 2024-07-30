export class TypeMap {
  constructor() {
    this.map = new Map();
  }

  set(key, value) {
    // コンストラクタ関数かどうかのチェック
    if (typeof key !== 'function' || !key.prototype) {
      throw new Error("Key must be a constructor function");
    }

    // クラスとそのインスタンスのチェック
    if ((key === String && typeof value === "string") ||
        (key === Number && typeof value === "number") ||
        (key === Boolean && typeof value === "boolean") ||
        (key === BigInt && typeof value === "bigint") ||
        (key === Symbol && typeof value === "symbol") ||
        (key === Object && typeof value === "object") ||
        (typeof value === "object" && value instanceof key) ||
        (typeof key === "function" && value instanceof key)) {

      this.map.set(key, value);
    }
    else {
      throw new Error("Value must be an instance of the key's type");
    }
  }

  get(key) {
    return this.map.get(key);
  }
}