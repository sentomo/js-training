#!/usr/bin/env node
// shebangを記述するとスクリプト名で起動できるようになる
// Cf: https://sitest.jp/blog/?p=3712

import https from "https";

// GitHub API URL
const BASE_URL = "https://api.github.com/repos";

// GitHubトークンを取得
function getAuthToken() {
  const token = process.env.GITHUB_TOKEN_JS_TRAINING;
  if (!token) {
    console.error("Error: GitHub Personal Access Token is not set.");
    console.error("Set it as an environment variable: GITHUB_TOKEN_JS_TRAINING");
    process.exit(1);
  }
  return token;
}

// HTTPSリクエストを送信
function sendRequest(method, url, data = null, verbose = false) {
  return new Promise((resolve, reject) => {
    const token = getAuthToken();

    const options = {
      method,
      headers: {
        "Authorization": `token ${token}`,
        "User-Agent": "github-issue-cli",
        "Content-Type": "application/json",
      },
    };

    if (verbose) {
      console.log("Request Options:", options);
      console.log("Request URL:", url);
      if (data) {
        console.log("Request Body:", data);
      }
    }

    const req = https.request(url, options, (res) => {
      let responseData = "";
      res.on("data", (chunk) => {
        responseData += chunk;
      });

      res.on("end", () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(JSON.parse(responseData));
        } else {
          console.error(`Error: ${res.statusCode} - ${res.statusMessage}`);
          reject(new Error(responseData));
        }
      });
    });

    req.on("error", (err) => {
      reject(err);
    });

    if (data) {
      req.write(JSON.stringify(data));
    }
    req.end();
  });
}

// Issue用のREST APIエンドポイントのドキュメント：https://docs.github.com/ja/rest/issues/issues?apiVersion=2022-11-28

// Issue を作成
async function createIssue(repoOwner, repoName, title, body, verbose) {
  const url = `${BASE_URL}/${repoOwner}/${repoName}/issues`;
  const data = { title, body };

  try {
    const response = await sendRequest("POST", url, data, verbose);
    console.log("Issue created successfully:");
    console.log(`ID: ${response.id}, Title: ${response.title}`);
  } catch (error) {
    console.error("Failed to create issue:", error.message);
  }
}

// 指定したIssueをクローズ
async function closeIssue(repoOwner, repoName, issueNumber, verbose) {
  const url = `${BASE_URL}/${repoOwner}/${repoName}/issues/${issueNumber}`;
  const data = { state: "closed" };

  try {
    const response = await sendRequest("PATCH", url, data, verbose);
    console.log("Issue closed successfully:");
    console.log(`ID: ${response.id}, Title: ${response.title}`);
  } catch (error) {
    console.error("Failed to close issue:", error.message);
  }
}

// オープンなIssueのIdとTitleの一覧を表示
async function listOpenIssues(repoOwner, repoName, verbose) {
  const url = `${BASE_URL}/${repoOwner}/${repoName}/issues?state=open`;

  try {
    const response = await sendRequest("GET", url, null, verbose);
    console.log("Open Issues:");
    response.forEach((issue) => {
      console.log(`ID: ${issue.id}, Title: ${issue.title}`);
    });
  } catch (error) {
    console.error("Failed to list open issues:", error.message);
  }
}

// ヘルプを表示
function printHelp() {
  console.log(`
Usage: github-issue-cli <command> [options]

Commands:
  create <owner> <repo> <title> [body]  Create a new issue
  close <owner> <repo> <issueNumber>    Close an existing issue
  list <owner> <repo>                  List open issues

Options:
  -v, --verbose   Enable verbose HTTP logging
  -h, --help      Show help
`);
}

// コマンドライン引数を解析
async function main() {
  const args = process.argv.slice(2);

  // -hまたは--helpオプションで使い方が確認できる
  if (args.length === 0 || args.includes("-h") || args.includes("--help")) {
    printHelp();
    process.exit(0);
  }

  // -vまたは--verboseオプションで HTTP ログを出力する
  const verbose = args.includes("-v") || args.includes("--verbose");
  const command = args[0];

  try {
    switch (command) {
      case "create":
        if (args.length < 4) {
          console.error("Error: Invalid arguments for 'create' command.");
          printHelp();
          process.exit(1);
        }
        await createIssue(args[1], args[2], args[3], args[4] || "", verbose);
        break;

      case "close":
        if (args.length < 4) {
          console.error("Error: Invalid arguments for 'close' command.");
          printHelp();
          process.exit(1);
        }
        await closeIssue(args[1], args[2], args[3], verbose);
        break;

      case "list":
        if (args.length < 3) {
          console.error("Error: Invalid arguments for 'list' command.");
          printHelp();
          process.exit(1);
        }
        await listOpenIssues(args[1], args[2], verbose);
        break;

      default:
        console.error(`Error: Unknown command '${command}'.`);
        printHelp();
        process.exit(1);
    }
  } catch (error) {
    console.error("An error occurred:", error.message);
    process.exit(1);
  }
}

main();