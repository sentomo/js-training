// Web Worker を作成するためのスクリプトを Blob で定義
const workerScript = `
  onmessage = function(e) {
    const imageData = e.data.imageData;
    const width = e.data.width;
    const height = e.data.height;

    // ガウシアンカーネル5x5
    const kernel = [
      [1, 4, 7, 4, 1],
      [4, 16, 26, 16, 4],
      [7, 26, 41, 26, 7],
      [4, 16, 26, 16, 4],
      [1, 4, 7, 4, 1]
    ];
    const kernelWeight = 273;

    // 出力用のデータ
    const outputData = new Uint8ClampedArray(imageData.length);

    // 各ピクセルにガウシアンフィルタを適用
    for (let y = 2; y < height - 2; y++) {
      for (let x = 2; x < width - 2; x++) {
        let r = 0, g = 0, b = 0;

        // カーネルを適用
        for (let ky = -2; ky <= 2; ky++) {
          for (let kx = -2; kx <= 2; kx++) {
            const pixelIndex = ((y + ky) * width + (x + kx)) * 4;
            const weight = kernel[ky + 2][kx + 2];

            r += imageData[pixelIndex] * weight;
            g += imageData[pixelIndex + 1] * weight;
            b += imageData[pixelIndex + 2] * weight;
          }
        }

        const outputIndex = (y * width + x) * 4;
        outputData[outputIndex] = r / kernelWeight;
        outputData[outputIndex + 1] = g / kernelWeight;
        outputData[outputIndex + 2] = b / kernelWeight;
        outputData[outputIndex + 3] = imageData[outputIndex + 3];
      }
    }

    postMessage({ imageData: outputData });
  };
`;

// Worker の初期化
const blob = new Blob([workerScript], { type: 'application/javascript' });
const worker = new Worker(URL.createObjectURL(blob));

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

    // Web Worker に画像データを送信
    worker.postMessage({
      imageData: imageData.data,
      width: img.width,
      height: img.height
    });
  });

  reader.readAsDataURL(file);
});

// Worker からのメッセージを受け取ったときの処理
worker.onmessage = function(e) {
  const { imageData } = e.data;
  const filteredCanvas = document.getElementById("filtered");
  const filteredCtx = filteredCanvas.getContext("2d");
  const outputImageData = new ImageData(imageData, filteredCanvas.width, filteredCanvas.height);

  filteredCtx.putImageData(outputImageData, 0, 0);
};
