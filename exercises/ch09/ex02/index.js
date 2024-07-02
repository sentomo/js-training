export class C {
  constructor() {
    this._x = 0; // 初期値を0に設定
  }

  get x() {
    return this._x++;
  }
}