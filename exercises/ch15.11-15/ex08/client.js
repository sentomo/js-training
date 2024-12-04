export function sendRequest(requestMessage) {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket("ws://localhost:3003");

    // 接続が開かれた時の処理
    ws.addEventListener("open", () => {
      ws.send(requestMessage);
    });

    // メッセージを受信した時の処理
    ws.addEventListener("message", (event) => {
      // event.dataを使ってメッセージを取得し、JSONとして解析
      try {
        const parsedData = JSON.parse(event.data);
        resolve(parsedData);
      } catch (error) {
        reject(new Error('Failed to parse JSON response: ' + error.message));
      }
      ws.close();
    });

    // タイムアウトの設定
    const timeout = setTimeout(() => {
      reject(new Error("Timeout: No response received within the specified time."));
      ws.close();
    }, 10000); // 10秒のタイムアウト、タイムアウトしたらreject

    // 接続が閉じられた時の処理
    ws.addEventListener("close", () => {
      clearTimeout(timeout);

      // 接続が閉じられた時にreject
      if (!ws.readyState === WebSocket.OPEN) {
        reject(new Error("Connection closed unexpectedly"));
      }
    });

    // エラーハンドリング
    ws.addEventListener("error", (error) => {
      clearTimeout(timeout);
      reject(new Error("Connection error"));
    });
  });
}

// 使用例
// (async () => {
//   try {
//     const message = JSON.stringify({
//       requestId: "input1", // リクエストが複数並行して送信されてもよいように
//       content: "test" // アクションに応じたデータ処理
//     });
//     const response = await sendRequest(message);
//     console.log("Response: " + response); // -> Response: {"requestId":"input1","content":"Hello, test"}
//   } catch (error) {
//     console.error("Error:", error);
//   }
// })();
