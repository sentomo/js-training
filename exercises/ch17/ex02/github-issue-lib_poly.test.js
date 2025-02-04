import { expect, jest } from '@jest/globals'; // ReferenceError: jest is not definedの対処法: https://japanese-document.github.io/tips/2023/javascript-jest-is-not-defined.html
import { Polly } from '@pollyjs/core';
import FetchAdapter from '@pollyjs/adapter-fetch';
import { createIssue, closeIssue, listOpenIssues } from "./github-issue-lib_fetch";

Polly.register(FetchAdapter);

describe("GitHub Issue API テスト (Polly.js 使用)", () => {
  let polly;
  let fetchMock;

  beforeEach(() => {
    polly = new Polly("GitHub API Tests", {
      adapters: ["fetch"],
    });

    fetchMock = polly.server;
    console.log = jest.fn();
    console.error = jest.fn();
  });

  afterEach(async () => {
    await polly.stop(); // stop()を呼び出すと、リクエストが保持され、接続されているアダプタから切断される。
  });

  it("createIssue: 正常に Issue を作成できること", async () => {
    fetchMock
      .post("https://api.github.com/repos/owner/repo/issues")
      .intercept((req, res) => {
        res.status(201).json({ id: 456, title: "New Issue" });
      });

    await createIssue("owner", "repo", "New Issue", "Issue Body", false);

    expect(console.log).toHaveBeenCalledWith("Issue created successfully:");
    expect(console.log).toHaveBeenCalledWith("ID: 456, Title: New Issue");
  });

  it("closeIssue: 正常に Issue をクローズできること", async () => {
    fetchMock
      .patch("https://api.github.com/repos/owner/repo/issues/1")
      .intercept((req, res) => {
        res.status(200).json({ id: 1, title: "Closed Issue" });
      });

    await closeIssue("owner", "repo", 1, false);

    expect(console.log).toHaveBeenCalledWith("Issue closed successfully:");
    expect(console.log).toHaveBeenCalledWith("ID: 1, Title: Closed Issue");
  });

  it("listOpenIssues: 開いている Issue のリストを取得できること", async () => {
    fetchMock
      .get("https://api.github.com/repos/owner/repo/issues?state=open")
      .intercept((req, res) => {
        res.status(200).json([
          { id: 101, title: "Open Issue 1" },
          { id: 102, title: "Open Issue 2" },
        ]);
      });

    await listOpenIssues("owner", "repo", false);

    expect(console.log).toHaveBeenCalledWith("Open Issues:");
    expect(console.log).toHaveBeenCalledWith("ID: 101, Title: Open Issue 1");
    expect(console.log).toHaveBeenCalledWith("ID: 102, Title: Open Issue 2");
  });

  it("createIssue: API エラーが発生した場合", async () => {
    fetchMock
      .post("https://api.github.com/repos/owner/repo/issues")
      .intercept((req, res) => {
        res.status(400).json({ message: "Bad Request" });
      });

    await createIssue("owner", "repo", "New Issue", "Issue Body", false);

    expect(console.error).toHaveBeenCalledWith(
      "Failed to create issue:",
      expect.any(String)
    );
  });

  it("closeIssue: API エラーが発生した場合", async () => {
    fetchMock
      .patch("https://api.github.com/repos/owner/repo/issues/1")
      .intercept((req, res) => {
        res.status(404).json({ message: "Issue Not Found" });
      });

    await closeIssue("owner", "repo", 1, false);

    expect(console.error).toHaveBeenCalledWith(
      "Failed to close issue:",
      expect.any(String)
    );
  });

  it("listOpenIssues: ネットワークエラーが発生した場合", async () => {
    fetchMock
      .get("https://api.github.com/repos/owner/repo/issues?state=open")
      .intercept((req, res) => {
        throw new Error("Network Failure");
      });

    await listOpenIssues("owner", "repo", false);

    expect(console.error).toHaveBeenLastCalledWith(
      "Failed to list open issues:",
      "Request failed: Network Failure"
    );
  });
});