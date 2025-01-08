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
    
    // ワーカースレッドを作成
    const worker = new Worker('worker.js');
    
    // ワーカーが結果を返したときの処理
    worker.onmessage = (e) => {
      const outputData = e.data; // ワーカーからの結果データ
      const outputImageData = new ImageData(outputData, img.width, img.height);
      filteredCtx.putImageData(outputImageData, 0, 0);
    };

    // ワーカーに画像データを送信
    worker.postMessage({ imageData: imageData, width: img.width, height: img.height });
  });

  reader.readAsDataURL(file);
});
