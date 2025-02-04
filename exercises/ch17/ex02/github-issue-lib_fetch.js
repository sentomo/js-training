import https from 'https';

// GitHub API URL
const BASE_URL = 'https://api.github.com/repos';

// GitHubトークンを取得
export function getAuthToken() {
  const token = process.env.GITHUB_TOKEN_JS_TRAINING;
  if (!token) {
    console.error('Error: GitHub Personal Access Token is not set.');
    console.error(
      'Set it as an environment variable: GITHUB_TOKEN_JS_TRAINING'
    );
    process.exit(1);
  }
  return token;
}

// HTTPSリクエストを送信
export async function sendRequest(method, url, data = null, verbose = false) {
  const token = getAuthToken();

  const options = {
    method,
    headers: {
      "Authorization": `token ${token}`,
      "User-Agent": "github-issue-cli",
      "Content-Type": "application/json",
    },
    body: data ? JSON.stringify(data) : null,
  };

  if (verbose) {
    console.log("Request Options:", options);
    console.log("Request URL:", url);
    if (data) {
      console.log("Request Body:", data);
    }
  }

  try {
    const response = await fetch(url, options);
    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    return responseData;
  } catch (err) {
    throw new Error(`Request failed: ${err.message}`);
  }
}

// Issue用のREST APIエンドポイントのドキュメント：https://docs.github.com/ja/rest/issues/issues?apiVersion=2022-11-28

// Issue を作成
export async function createIssue(repoOwner, repoName, title, body, verbose) {
  const url = `${BASE_URL}/${repoOwner}/${repoName}/issues`;
  const data = { title, body };

  try {
    const response = await sendRequest('POST', url, data, verbose);
    console.log('Issue created successfully:');
    console.log(`ID: ${response.id}, Title: ${response.title}`);
    // return response;
  } catch (error) {
    console.error('Failed to create issue:', error.message);
    // return Promise.reject(new Error("Failed to create issue"));
  }
}

// 指定したIssueをクローズ
export async function closeIssue(repoOwner, repoName, issueNumber, verbose) {
  const url = `${BASE_URL}/${repoOwner}/${repoName}/issues/${issueNumber}`;
  const data = { state: 'closed' };

  try {
    const response = await sendRequest('PATCH', url, data, verbose);
    console.log('Issue closed successfully:');
    console.log(`ID: ${response.id}, Title: ${response.title}`);
  } catch (error) {
    console.error('Failed to close issue:', error.message);
  }
}

// オープンなIssueのIdとTitleの一覧を表示
export async function listOpenIssues(repoOwner, repoName, verbose) {
  const url = `${BASE_URL}/${repoOwner}/${repoName}/issues?state=open`;

  try {
    const response = await sendRequest('GET', url, null, verbose);
    console.log('Open Issues:');
    response.forEach((issue) => {
      console.log(`ID: ${issue.id}, Title: ${issue.title}`);
    });
  } catch (error) {
    console.error('Failed to list open issues:', error.message);
  }
}
