import { google } from 'googleapis';
import fs from 'fs/promises';
import { createReadStream } from 'fs';

const SCOPES = ['https://www.googleapis.com/auth/drive'];
const auth = new google.auth.GoogleAuth({
  credentials: JSON.parse(process.env.GOOGLE_CREDENTIALS),
  scopes: SCOPES,
});

const drive = google.drive({ version: 'v3', auth });

export async function handler(event, context) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }

  try {
    const { fileName, fileData } = JSON.parse(event.body);
    const tempFilePath = `/tmp/${fileName}`;

    // Write data to a temporary file
    await fs.writeFile(tempFilePath, fileData);

    // Define metadata and media for the upload
    const fileMetadata = {
      name: fileName,
      parents: [], // Specify folder ID if needed
    };
    const media = {
      mimeType: 'text/plain',
      body: createReadStream(tempFilePath),
    };

    // Upload the file to Google Drive
    const file = await drive.files.create({
      requestBody: fileMetadata,
      media: media,
      fields: 'id',
    });

    // Remove the temporary file
    await fs.unlink(tempFilePath);

    // Log success and return the fileId in the response
    console.log('File uploaded successfully:', fileName);
    console.log('File ID:', file.data.id);

    return {
      statusCode: 200,
      body: JSON.stringify({ fileId: file.data.id }),
    };
  } catch (error) {
    console.error('Error uploading file:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
}
