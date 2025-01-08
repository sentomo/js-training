import net from "net";
import server from "./server"; // 上記サーバの実装をインポート

describe("HTTPサーバのテスト", () => {
  // テスト前にサーバを立ち上げ、テスト後に閉じる
  beforeEach((done) => {
    server.listen(8888, done);
  });

  afterEach(() => {
    server.close();
  });

  // GET / のテスト (フォーム表示)
  it("GET / でフォームが表示されること", (done) => {
    const client = new net.Socket();
    
    client.connect(8888, "localhost", () => {
      // GETリクエストを送信
      client.write("GET / HTTP/1.1\r\nHost: localhost\r\n\r\n");
    });

    client.on("data", (data) => {
      const response = data.toString();
      
      // ステータスコード 200 OK を確認
      expect(response).toContain("HTTP/1.1 200 OK");
      expect(response).toContain("<form action=\"/greeting\" method=\"POST\">");

      client.end();
      done();
    });
  });

  // POST /greeting のテスト (フォームデータ送信)
  it("POST /greeting で挨拶メッセージが表示されること", (done) => {
    const client = new net.Socket();
    const postData = "name=John&greeting=Hello";

    client.connect(8888, "localhost", () => {
      // POSTリクエストを送信
      client.write(`POST /greeting HTTP/1.1\r\nHost: localhost\r\nContent-Length: ${Buffer.byteLength(postData)}\r\n\r\n${postData}`);
    });

    client.on("data", (data) => {
      const response = data.toString();
      
      // ステータスコード 200 OK を確認
      expect(response).toContain("HTTP/1.1 200 OK");
      expect(response).toContain("<h1>Hello, John!</h1>");

      client.end();
      done();
    });
  });

  // 未対応のパスへのアクセス (404)
  it("未対応のパスにアクセスした場合、404エラーが返されること", (done) => {
    const client = new net.Socket();
    
    client.connect(8888, "localhost", () => {
      // 不正なGETリクエストを送信
      client.write("GET /unknown HTTP/1.1\r\nHost: localhost\r\n\r\n");
    });

    client.on("data", (data) => {
      const response = data.toString();
      
      // ステータスコード 404 Not Found を確認
      expect(response).toContain("HTTP/1.1 404 Not Found");

      client.end();
      done();
    });
  });

  // 非対応のメソッド (405)
  it("非対応のメソッドを送信した場合、405エラーが返されること", (done) => {
    const client = new net.Socket();
    
    client.connect(8888, "localhost", () => {
      // 不正なPUTリクエストを送信
      client.write("PUT / HTTP/1.1\r\nHost: localhost\r\n\r\n");
    });

    client.on("data", (data) => {
      const response = data.toString();
      
      // ステータスコード 405 Method Not Allowed を確認
      expect(response).toContain("HTTP/1.1 405 Method Not Allowed");

      client.end();
      done();
    });
  });
});
