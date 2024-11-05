document.getElementById("image").addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (!file) {
    return;
  }

  const img = new Image();
  const reader = new FileReader();

  reader.addEventListener("load", (e) => {
    img.src = e.target.result;
  });

  img.addEventListener("load", () => {
    const originalCanvas = document.getElementById("original");
    const filteredCanvas = document.getElementById("filtered");
    const originalCtx = originalCanvas.getContext("2d");
    const filteredCtx = filteredCanvas.getContext("2d");

    originalCanvas.width = img.width;
    originalCanvas.height = img.height;
    filteredCanvas.width = img.width;
    filteredCanvas.height = img.height;

    originalCtx.drawImage(img, 0, 0);

    const imageData = originalCtx.getImageData(0, 0, img.width, img.height);
    const data = imageData.data;

    // グレースケールへの変換 (RGB を足して平均を取っている)
    //
    // ガウシアンフィルタを実装する場合はこの周辺のコードを変更しなさい
    // imageData の中身はそのままに別の配列に結果を格納するとよい
    // ```js
    // const outputData = new Uint8ClampedArray(imageData.data.length);
    //
    // // TODO: ここで imageData.data を参照して outputData に結果を格納
    //
    // const outputImageData = new ImageData(outputData, img.width, img.height);
    // filteredCtx.putImageData(outputImageData, 0, 0);
    // ```
  //   for (let i = 0; i < data.length; i += 4) {
  //     const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
  //     data[i] = avg;
  //     data[i + 1] = avg;
  //     data[i + 2] = avg;
  //   }

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
  
      const width = img.width;
      const height = img.height;
  
      // 各ピクセルにガウシアンフィルタを適用
      for (let y = 2; y < height - 2; y++) {
        for (let x = 2; x < width - 2; x++) {
          let r = 0, g = 0, b = 0; // rgb初期化
  
          // カーネルを適用
          for (let ky = -2; ky <= 2; ky++) {
            for (let kx = -2; kx <= 2; kx++) { // kxとkyが0の場合が中心のピクセルに相当し、それ以外の値は中心ピクセルに対しての相対位置を表す
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
  
      const outputImageData = new ImageData(outputData, img.width, img.height);
      filteredCtx.putImageData(outputImageData, 0, 0);
    });

  reader.readAsDataURL(file);
});
