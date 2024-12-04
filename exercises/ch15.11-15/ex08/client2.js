export function sendRequest(requestMessage) {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket("ws://localhost:3003");
    const requestId = generateUniqueId(); // 一意な識別子を生成

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

    // エラーハンドリング
    ws.addEventListener("error", (error) => {
      console.error("Connection error:", error);
      reject(new Error("Connection error"));
    });
  });
}

// 一意な識別子を生成する関数
function generateUniqueId() {
  return Math.random().toString(36).substring(2, 11); // 先頭の"0."を削除
}