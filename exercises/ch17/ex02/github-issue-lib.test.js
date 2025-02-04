import { expect, jest } from '@jest/globals'; // ReferenceError: jest is not definedの対処法: https://japanese-document.github.io/tips/2023/javascript-jest-is-not-defined.html
import { createIssue, closeIssue, listOpenIssues } from './github-issue-lib.js';
import https from 'https';

describe('GitHub Issue操作テスト', () => {
  let mockRequest;

  beforeEach(() => {
    mockRequest = jest.fn(); // モック関数を初期化
    https.request = mockRequest; // https.requestをモック関数に置き換え

    // console.log と console.error をモック
    console.log = jest.fn();
    console.error = jest.fn();
  });

  it('新しい Issue を作成できること', async () => {
    const mockResponse = { id: 123, title: 'Test Issue' };
    // モックで https.request の実装を指定
    mockRequest.mockResolvedValue(mockResponse);

    await createIssue(
      'owner',
      'repo',
      'Test Issue',
      'This is a test issue',
      false
    );

    // モックが正しく呼ばれたかをチェック
    expect(mockRequest).toHaveBeenCalledTimes(1); // 1回呼ばれたか

    // 最初の引数（URL）が正しいかを確認
    const urlArgument = mockRequest.mock.calls[0][0]; // 最初の引数（URL）を取り出す
    expect(urlArgument).toContain(
      'https://api.github.com/repos/owner/repo/issues'
    ); // URLが適切に設定されているか確認
  });

  it('Issue をクローズできること', async () => {
    const mockResponse = { id: 123, title: 'Test Issue' };

    // モックで https.request の実装を指定
    mockRequest.mockResolvedValue(mockResponse);
    await closeIssue('owner', 'repo', 1, false);

    // モックが正しく呼ばれたかをチェック
    expect(mockRequest).toHaveBeenCalledTimes(1); // 1回呼ばれたか

    // 最初の引数（URL）が正しいかを確認
    const urlArgument = mockRequest.mock.calls[0][0]; // 最初の引数（URL）を取り出す
    expect(urlArgument).toContain(
      'https://api.github.com/repos/owner/repo/issues/1'
    );
  });

  it('オープンな Issue の一覧を取得できること', async () => {
    const mockResponse = [
      { id: 123, title: 'Test Issue' },
      { id: 124, title: 'Test Issue2' },
    ];

    // モックで https.request の実装を指定
    mockRequest.mockResolvedValue(mockResponse);
    await listOpenIssues('owner', 'repo', false);

    // モックが正しく呼ばれたかをチェック
    expect(mockRequest).toHaveBeenCalledTimes(1); // 1回呼ばれたか

    // 最初の引数（URL）が正しいかを確認
    const urlArgument = mockRequest.mock.calls[0][0]; // 最初の引数（URL）を取り出す
    expect(urlArgument).toContain(
      'https://api.github.com/repos/owner/repo/issues?state=open'
    );
  });
});
