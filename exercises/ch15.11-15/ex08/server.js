import WebSocket, { WebSocketServer } from "ws";

const port = 3003;
const wss = new WebSocketServer({ port });

// 他のクライアントにメッセージを転送する
wss.on("connection", (ws) => {
  ws.on("message", (data) => {
    const request = JSON.parse(data);
    const { requestId, content } = request;
    const waitTIme = Math.floor(Math.random() * 1000 * 5);
    console.log(content, `wait ${waitTIme}ms`);

    const response = JSON.stringify({
      requestId: requestId, // リクエストが複数並行して送信されてもよいように
      content: "Hello, " + content, // アクションに応じたデータ処理
    });

    wss.clients.forEach((client) => {
      // if (client.readyState === WebSocket.OPEN && client != ws) {
      if (client.readyState === WebSocket.OPEN) {
        setTimeout(() => {
          console.log("Response: " + response)
          client.send(response);
        }, waitTIme);
      }
    });
  });
});
