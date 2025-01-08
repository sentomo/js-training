import request from 'supertest';
import app from './app.js';

describe('Express Server', () => {
  it('静的ファイルを提供する', async () => {
    const response = await request(app).get('/test.txt');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Hello, World!');
  });

  it('ミラーエンドポイントの時はリクエストをそのまま返す', async () => {
    const response = await request(app)
      .post('/test/mirror')
      .set('Custom-Header', 'HeaderValue')
      .send('Request Body');
    expect(response.text).toContain('POST /test/mirror HTTP/1.1');
    expect(response.text).toContain('custom-header: HeaderValue');
    expect(response.text).toContain('Request Body');
  });
});
