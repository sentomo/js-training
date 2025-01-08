import http from "http";
import url from "url";
import path from "path";
import fs from "fs";

function serve(rootDirectory, port) {
  let server = new http.Server();
  server.listen(port);
  console.log("Listening on port", port);

  server.on("request", (request, response) => {
    let endpoint = url.parse(request.url).pathname;

    // PUTリクエストを受けてファイルをアップロードする処理
    if (request.method === "PUT" && endpoint) {
      // アップロード先のファイルパスを設定（アップロードされるファイルのパス）
      let filename = endpoint.substring(1); // 最初の/を取り除く。
      filename = filename.replace(/\.\.\//g, ""); // ../ を禁止
      filename = path.resolve(rootDirectory, filename);

      // ディレクトリが存在しない場合、作成する
      let dir = path.dirname(filename);
      fs.mkdirSync(dir, { recursive: true });

      // ファイル書き込み用のストリームを作成
      let writeStream = fs.createWriteStream(filename);

      // リクエストのボディをファイルに書き込む
      request.pipe(writeStream);

      writeStream.on("finish", () => {
        response.setHeader("Content-Type", "text/plain; charset=UTF-8");
        response.writeHead(200);
        response.end("File uploaded successfully.");
      });

      writeStream.on("error", (err) => {
        response.setHeader("Content-Type", "text/plain; charset=UTF-8");
        response.writeHead(500);
        response.end(err.message);
      });

      return;
    }

    // その他のリクエストは通常のファイル提供処理
    else {
      let filename = endpoint.substring(1); // 最初の/を取り除く。
      filename = filename.replace(/\.\.\//g, ""); // ../ を禁止
      filename = path.resolve(rootDirectory, filename);

      let type;
      switch (path.extname(filename)) {
        case ".html":
        case ".htm": type = "text/html"; break;
        case ".js": type = "text/javascript"; break;
        case ".css": type = "text/css"; break;
        case ".png": type = "image/png"; break;
        case ".txt": type = "text/plain"; break;
        default: type = "application/octet-stream"; break;
      }

      let stream = fs.createReadStream(filename);
      stream.once("readable", () => {
        response.setHeader("Content-Type", type);
        response.writeHead(200);
        stream.pipe(response);
      });

      stream.on("error", (err) => {
        response.setHeader("Content-Type", "text/plain; charset=UTF-8");
        response.writeHead(404);
        response.end(err.message);
      });
    }
  });
}

// コマンドラインから起動された場合は、serve()関数を呼び出す。
serve(process.argv[2] || "/tmp", parseInt(process.argv[3]) || 8000);
