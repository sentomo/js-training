import net from "net";

// サーバ作成
const server = net.createServer((socket) => {
  socket.on("data", (data) => {
    const request = data.toString();
    const [requestLine, ...headersAndBody] = request.split("\r\n"); // リクエストの1行目はリクエストライン(メソッド、リクエストURI、プロトコルバージョン)
    const [method, urlPath] = requestLine.split(" ");

    // ヘッダーとボディを分離
    let body = "";
    let isBlank = false;
    for (const line of headersAndBody) {
      if (line === "") { // ヘッダーの後に空行が1行あり、その後にボディが続く
        isBlank = true;
        continue;
      }
      if (isBlank) {
        body += line;
      }
    }

    let statusCode = 200;
    let contentType = "text/html; charset=UTF-8";
    let responseBody = "";

    try {
      if (method === "GET" && urlPath === "/") {
        responseBody = generateIndexHTML(); // "/" のレスポンス用 HTML を生成
      } else if (method === "POST" && urlPath === "/greeting") {
        const params = new URLSearchParams(body);
        const name = params.get("name");
        const greeting = params.get("greeting");
        responseBody = generateGreetingHTML(name, greeting); // "/greeting" に POST された場合のレスポンス用 HTML を生成
      } else if (method !== "GET" && method !== "POST") { // サポートしていないメソッドへの対応
        statusCode = 405;
        responseBody = "Method Not Allowed";
        contentType = "text/plain";
      } else { // 存在しないパスへの対応
        statusCode = 404;
        responseBody = "Not Found";
        contentType = "text/plain";
      }
    } catch (err) {
      console.error("Error:", err);
      statusCode = 500;
      responseBody = "Internal Server Error";
      contentType = "text/plain";
    }

    // レスポンス送信
    const response = `HTTP/1.1 ${statusCode} ${getStatusMessage(
      statusCode
    )}\r\nContent-Type: ${contentType}\r\nContent-Length: ${Buffer.byteLength(
      responseBody
    )}\r\n\r\n${responseBody}`;
    socket.write(response);
    socket.end(); // 接続を終了
  });

  socket.on("error", (err) => {
    console.error("Socket error:", err);
  });
});

// "/" の HTML を生成する関数
function generateIndexHTML() {
  return `<!doctype html>
<html lang="ja">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Greeting Form</title>
  </head>
  <body>
    <form action="/greeting" method="POST">
      <label for="name">Name:</label>
      <input type="text" id="name" name="name" />
      <label for="greeting">Greeting:</label>
      <input type="text" id="greeting" name="greeting" />
      <button type="submit">Submit</button>
    </form>
  </body>
</html>`;
}

// "/greeting" の HTML を生成する関数
function generateGreetingHTML(name, greeting) {
  return `<!doctype html>
<html lang="ja">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Greeting</title>
  </head>
  <body>
    <p>${greeting}, ${name}!</p>
    <a href="/">Back to Form</a>
  </body>
</html>`;
}

// HTTP ステータスメッセージを取得する関数
function getStatusMessage(statusCode) {
  const messages = {
    200: "OK",
    404: "Not Found",
    405: "Method Not Allowed",
    500: "Internal Server Error",
  };
  return messages[statusCode] || "Unknown Status";
}

// サーバを特定のポートでリッスン
const PORT = 8080;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});

server.on("error", (err) => {
  console.error("Server error:", err);
});
