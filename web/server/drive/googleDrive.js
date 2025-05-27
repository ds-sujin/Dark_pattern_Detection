const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

// ✅ JSON 키파일을 통한 인증 방식
const auth = new google.auth.GoogleAuth({
  keyFile: path.join(__dirname, '../restored-key.json'),
  scopes: ['https://www.googleapis.com/auth/drive'],
});

async function uploadToDrive(filePath, fileName) {
  const authClient = await auth.getClient();
  const drive = google.drive({ version: 'v3', auth: authClient });

  const fileMetadata = {
    name: fileName,
    parents: [process.env.GOOGLE_DRIVE_FOLDER_ID],
  };

  const media = {
    mimeType: 'image/png',
    body: fs.createReadStream(filePath),
  };

  const file = await drive.files.create({
    resource: fileMetadata,
    media,
    fields: 'id, webViewLink',
  });

  return file.data.webViewLink;
}

module.exports = { uploadToDrive };
