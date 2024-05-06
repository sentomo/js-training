// 何らかのリサイズを行う関数と思って読んで下さい
//
// - params には undefined またはオブジェクトが与えられる
// - params.maxWidth が与えられる場合 (正の整数と仮定して良い) はその値を利用する
// - params.maxHeight が与えられる場合 (正の整数と仮定して良い) はその値を利用する
function resize(params) {
  let maxWidth = 600;
  let maxHeight = 480;

  if (params && params.maxWidth) {
    maxWidth = params.maxWidth;
  }

  if (params && params.maxHeight) {
    maxHeight = params.maxHeight;
  }

  console.log({ maxWidth, maxHeight });
}

let size1 = {maxWidth: 1920, maxHeight: 1080};
let size2 = {maxWidth: 0, maxHeight: 0};
let size3 = {};

resize(size1); // { maxWidth: 1920, maxHeight: 1080 }
resize(size2); // { maxWidth: 600, maxHeight: 480 }
resize(size3); // { maxWidth: 600, maxHeight: 480 }

// if を利用せず && や || を用いて maxWidth や maxHeight を設定する関数 (resize1)=======================================
function resize1(params) {
  let maxWidth = 600;
  let maxHeight = 480;

  params && params.maxWidth && (maxWidth = params.maxWidth);
  params && params.maxHeight && (maxHeight = params.maxHeight);

  console.log({ maxWidth, maxHeight });
}

resize1(size1); // { maxWidth: 1920, maxHeight: 1080 }
resize1(size2); // { maxWidth: 600, maxHeight: 480 }
resize1(size3); // { maxWidth: 600, maxHeight: 480 }

// if を利用せず ?. や ?? を用いて maxWidth や maxHeight を設定する関数 (resize2)=======================================
function resize2(params) {
  let maxWidth = 600;
  let maxHeight = 480;

  maxWidth = params?.maxWidth > 0 ? params?.maxWidth : undefined ?? maxWidth; // params?.maxWidthが0の時は0ではなく600を返すように
  maxHeight = params?.maxHeight > 0 ? params?.maxWidth : undefined ?? maxHeight;　// params?.maxHeightが0の時は0ではなく480を返すように

  console.log({ maxWidth, maxHeight });
}

resize2(size1); // { maxWidth: 1920, maxHeight: 1080 }
resize2(size2); // { maxWidth: 600, maxHeight: 480 }
resize2(size3); // { maxWidth: 600, maxHeight: 480 }
