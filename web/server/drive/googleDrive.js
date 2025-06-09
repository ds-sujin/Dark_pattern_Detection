const { google } = require('googleapis');
const fs = require('fs');
require('dotenv').config();

let uploadToDrive;

if (
  process.env.GOOGLE_DRIVE_CLIENT_EMAIL &&
  process.env.GOOGLE_DRIVE_PRIVATE_KEY &&
  process.env.GOOGLE_DRIVE_FOLDER_ID
) {
  // 환경변수 정상 존재 → 정상 인증 설정
  const auth = new google.auth.JWT(
    process.env.GOOGLE_DRIVE_CLIENT_EMAIL,
    null,
    process.env.GOOGLE_DRIVE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    ['https://www.googleapis.com/auth/drive']
  );

  const drive = google.drive({ version: 'v3', auth });

  uploadToDrive = async function (filePath, fileName) {
    const fileMetadata = {
      name: fileName,
      parents: [process.env.GOOGLE_DRIVE_FOLDER_ID],
    };

    const media = {
      mimeType: 'image/jpeg',
      body: fs.createReadStream(filePath),
    };

    const response = await drive.files.create({
      resource: fileMetadata,
      media,
      fields: 'id',
    });

    const fileId = response.data.id;

    // 파일 공개 설정
    await drive.permissions.create({
      fileId,
      requestBody: {
        role: 'reader',
        type: 'anyone',
      },
    });

    const result = await drive.files.get({
      fileId,
      fields: 'webViewLink, webContentLink',
    });

    return result.data.webViewLink;
  };
} else {
  console.log('[Google Drive 비활성화] 환경변수가 없어 업로드 기능이 꺼져 있습니다.');

  // 대체 함수: 호출 시 명시적 에러 발생
  uploadToDrive = async function () {
    throw new Error('Google Drive 환경변수가 누락되어 업로드 기능을 사용할 수 없습니다.');
  };
}

module.exports = { uploadToDrive };
