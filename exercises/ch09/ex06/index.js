export class TypedMap {
  constructor(keyType, valueType, entries) {
    this.map = new Map(); // 委譲先となるMapオブジェクトを生成する

    this.keyType = keyType;
    this.valueType = valueType;

    if (entries) {
      for (let [k, v] of entries) {
        if (typeof k !== keyType || typeof v !== valueType) {
          throw new TypeError(`Wrong type for entry [${k}, ${v}]`);
        }
        this.map.set(k, v); // super(entries); の代わり
      }
    }
  }

  set(key, value) {
    if (this.keyType && typeof key !== this.keyType) {
      throw new TypeError(`${key} is not of type ${this.keyType}`);
    }
    if (this.valueType && typeof value !== this.valueType) {
      throw new TypeError(`${value} is not of type ${this.valueType}`);
    }
    return this.map.set(key, value);
  }
}
