self.onmessage = (e) => {
  const { imageData, width, height } = e.data;
  const data = imageData.data;

  // ガウシアンカーネル5x5
  const kernel = [
    [1, 4, 7, 4, 1],
    [4, 16, 26, 16, 4],
    [7, 26, 41, 26, 7],
    [4, 16, 26, 16, 4],
    [1, 4, 7, 4, 1]
  ];
  const kernelWeight = 273; // カーネルの要素の合計

  // 出力用のデータ
  const outputData = new Uint8ClampedArray(data.length);

  // 各ピクセルにガウシアンフィルタを適用
  for (let y = 2; y < height - 2; y++) {
    for (let x = 2; x < width - 2; x++) {
      let r = 0, g = 0, b = 0; // rgb初期化

      // カーネルを適用
      for (let ky = -2; ky <= 2; ky++) {
        for (let kx = -2; kx <= 2; kx++) {
          const pixelIndex = ((y + ky) * width + (x + kx)) * 4;
          const weight = kernel[ky + 2][kx + 2];

          r += data[pixelIndex] * weight;
          g += data[pixelIndex + 1] * weight;
          b += data[pixelIndex + 2] * weight;
        }
      }

      // 中心ピクセルに計算した色を設定
      const outputIndex = (y * width + x) * 4;
      outputData[outputIndex] = r / kernelWeight;
      outputData[outputIndex + 1] = g / kernelWeight;
      outputData[outputIndex + 2] = b / kernelWeight;
      outputData[outputIndex + 3] = data[outputIndex + 3]; // アルファ値はそのまま
    }
  }

  // 結果をメインスレッドに返す
  self.postMessage(outputData);
};
