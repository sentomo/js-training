import { createServer } from "net";
import { StringDecoder } from "string_decoder";

const server = createServer((socket) => {
  const decoder = new StringDecoder("utf8");
  let requestData = "";

  socket.on("data", (data) => {
    requestData += decoder.write(data);
  });

  socket.on("end", () => {
    const [headers, body] = requestData.split("\r\n\r\n");
    const [requestLine, ...headerLines] = headers.split("\r\n");

    const [method, url] = requestLine.split(" ");
    const [path] = url.split("?");

    if (method === "GET" && path === "/") {
      // "/": フォームを表示
      const html = `
        <!doctype html>
        <html lang="ja">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Greeting Form</title>
          </head>
          <body>
            <form action="/greeting" method="POST">
              <label for="greeting">Name:</label>
              <input type="text" id="name" name="name" />
              <input type="text" id="greeting" name="greeting" />
              <button type="submit">Submit</button>
            </form>
          </body>
        </html>
      `;
      socket.write("HTTP/1.1 200 OK\r\n");
      socket.write("Content-Type: text/html; charset=UTF-8\r\n");
      socket.write(`Content-Length: ${Buffer.byteLength(html)}\r\n`);
      socket.write("\r\n");
      socket.write(html);
    } else if (method === "POST" && path === "/greeting") {
      // "/greeting": フォームデータを処理して返す
      const params = new URLSearchParams(body);
      const name = params.get("name") || "Guest";
      const greeting = params.get("greeting") || "Hello";

      const html = `
        <!doctype html>
        <html lang="ja">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Greeting Result</title>
          </head>
          <body>
            <h1>${greeting}, ${name}!</h1>
          </body>
        </html>
      `;
      socket.write("HTTP/1.1 200 OK\r\n");
      socket.write("Content-Type: text/html; charset=UTF-8\r\n");
      socket.write(`Content-Length: ${Buffer.byteLength(html)}\r\n`);
      socket.write("\r\n");
      socket.write(html);
    } else {
      // 非対応のメソッドやパス
      if (method === "GET" || method === "POST") {
        socket.write("HTTP/1.1 404 Not Found\r\n");
      } else {
        socket.write("HTTP/1.1 405 Method Not Allowed\r\n");
      }
      socket.write("\r\n");
    }

    socket.end();
  });
});

server.listen(8888, () => {
  console.log("Server listening on port 8888");
});

export default server;