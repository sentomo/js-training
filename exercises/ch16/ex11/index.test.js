import net from 'net';

describe('TCPサーバのテスト', () => {
  let server;
  const PORT = 8080;

  // サーバを起動
  beforeAll((done) => {
    server = net.createServer((socket) => {
      socket.on('data', (data) => {
        const request = data.toString();
        const [requestLine, ...headersAndBody] = request.split('\r\n');
        const [method, urlPath] = requestLine.split(' ');

        let body = '';
        let isBlank = false;
        for (const line of headersAndBody) {
          if (line === '') {
            isBlank = true;
            continue;
          }
          if (isBlank) {
            body += line;
          }
        }

        let statusCode = 200;
        let contentType = 'text/html; charset=UTF-8';
        let responseBody = '';

        try {
          if (method === 'GET' && urlPath === '/') {
            responseBody = generateIndexHTML();
          } else if (method === 'POST' && urlPath === '/greeting') {
            const params = new URLSearchParams(body);
            const name = params.get('name');
            const greeting = params.get('greeting');
            responseBody = generateGreetingHTML(name, greeting);
          } else if (method !== 'GET' && method !== 'POST') {
            statusCode = 405;
            responseBody = 'Method Not Allowed';
            contentType = 'text/plain';
          } else {
            statusCode = 404;
            responseBody = 'Not Found';
            contentType = 'text/plain';
          }
        } catch (err) {
          console.error('Error:', err);
          statusCode = 500;
          responseBody = 'Internal Server Error';
          contentType = 'text/plain';
        }

        const response = `HTTP/1.1 ${statusCode} ${getStatusMessage(statusCode)}\r\nContent-Type: ${contentType}\r\nContent-Length: ${Buffer.byteLength(responseBody)}\r\n\r\n${responseBody}`;
        socket.write(response);
        socket.end();
      });
    });

    server.listen(PORT, () => {
      done();
    });
  });

  // サーバを停止
  afterAll((done) => {
    server.close(() => {
      done();
    });
  });

  it('GETリクエストでトップページが返されること', (done) => {
    const client = net.createConnection({ port: PORT }, () => {
      client.write('GET / HTTP/1.1\r\nHost: localhost\r\n\r\n');
    });

    client.on('data', (data) => {
      const response = data.toString();
      expect(response).toContain('<html lang="ja">');
      expect(response).toContain('<form action="/greeting" method="POST">');
      client.end();
      done();
    });
  });

  it('POSTリクエストで"/greeting"のページが返されること', (done) => {
    const client = net.createConnection({ port: PORT }, () => {
      const body = 'name=John&greeting=Hello';
      client.write(`POST /greeting HTTP/1.1\r\nHost: localhost\r\nContent-Length: ${Buffer.byteLength(body)}\r\n\r\n${body}`);
    });

    client.on('data', (data) => {
      const response = data.toString();
      expect(response).toContain('Hello, John!');
      client.end();
      done();
    });
  });

  it('サポートしていないメソッドで405エラーが返されること', (done) => {
    const client = net.createConnection({ port: PORT }, () => {
      client.write('PUT / HTTP/1.1\r\nHost: localhost\r\n\r\n');
    });

    client.on('data', (data) => {
      const response = data.toString();
      expect(response).toContain('405 Method Not Allowed');
      client.end();
      done();
    });
  });

  // HTTPステータスメッセージを取得する関数
  function getStatusMessage(statusCode) {
    const messages = {
      200: 'OK',
      404: 'Not Found',
      405: 'Method Not Allowed',
      500: 'Internal Server Error',
    };
    return messages[statusCode] || 'Unknown Status';
  }

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
});
