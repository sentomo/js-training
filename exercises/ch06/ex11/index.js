// 極座標：(r,θ)で点の位置を表す。
// r：原点からの距離を表し，動径と呼ばれます。
// θ: 始線（原点を通る基準の半直線，x軸の正の向きと一致させるのが慣例）から反時計周りに測った角度を表し，偏角と呼ばれます。
// デカルト座標：直交座標のこと。点の位置ををx軸の値とｙ軸の値で表したもの。

export let obj = {
  _x:1,
  _y:1,
  r() {return Math.hypot(this._x, this._y); },
  theta() { return Math.atan2(this._y, this._x); },
  
  get x(){return this._x},
  set x(newValue) {
    if(isNaN(newValue))  throw new Error("x is not a number");
    this._x = newValue;
  },

  get y(){return this._y},
  set y(newValue) {
    if(isNaN(newValue))  throw new Error("y is not a number");
    this._y = newValue;
  },
}