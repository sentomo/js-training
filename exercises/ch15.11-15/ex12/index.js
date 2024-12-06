document.getElementById('upload').addEventListener('click', async () => {
  const token = document.getElementById('token').value;
  const fileInput = document.getElementById('file');

  if (!token) {
    displayStatus('アクセストークンを入力してください', 'error');
    return;
  }

  if (fileInput.files.length === 0) {
    displayStatus('アップロードするファイルを選択してください', 'error');
    return;
  }

  const file = fileInput.files[0];

  try {
    const uploadUrl = `https://graph.microsoft.com/v1.0/me/drive/root:/${encodeURIComponent(file.name)}:/content`;
    const response = await fetch(uploadUrl, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': file.type
        },
        body: file
    });

    if (response.ok) {
        displayStatus('アップロードが完了しました', 'success');
    } else {
        const errorData = await response.json();
        displayStatus(`アップロード失敗: ${errorData.error.message}`, 'error');
    }
  } catch (error) {
      displayStatus(`エラー発生: ${error.message}`, 'error');
  }
});

function displayStatus(message, type) {
  const statusDiv = document.getElementById('status');
  statusDiv.textContent = message;
  statusDiv.className = `status ${type}`;
}

// 参考：
// * [Graph エクスプローラーを使用して Microsoft Graph API を試す \- Microsoft Graph \| Microsoft Learn](https://learn.microsoft.com/ja-jp/graph/graph-explorer/graph-explorer-overview)
// * [サイズの小さいファイルをアップロードする \- Microsoft Graph v1\.0 \| Microsoft Learn](https://learn.microsoft.com/ja-jp/graph/api/driveitem-put-content?view=graph-rest-1.0&tabs=http)