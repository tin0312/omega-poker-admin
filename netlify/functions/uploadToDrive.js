import { google } from "googleapis";

// Google Sheets API authentication
const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];
const auth = new google.auth.GoogleAuth({
  credentials: JSON.parse(process.env.GOOGLE_CREDENTIALS),
  scopes: SCOPES,
});

const sheets = google.sheets({ version: "v4", auth });

// Define the spreadsheet ID and range
const SPREADSHEET_ID = process.env.SPREADSHEET_ID;
const RANGE = "B2"; // Specify the sheet name and start range

// Handle upload to Google Sheets
export async function handler(event, context) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: "Method Not Allowed",
    };
  }

  try {
    const { fileData } = JSON.parse(event.body);

    // Parse the fileData to extract values
    const [fname, lname, game, phone] = fileData.split(",");

    // Prepare the values to append to the Google Sheets document
    const values = [[fname, lname, phone, game]]; // Adjust the order to match the column headers

    // Append the values to the Google Sheets document
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: RANGE,
      valueInputOption: "USER_ENTERED",
      requestBody: { values },
    });

    // Log success and return the updated range in the response
    console.log(
      "Values appended successfully:",
      response.data.updates.updatedRange
    );

    return {
      statusCode: 200,
      body: JSON.stringify({
        updatedRange: response.data.updates.updatedRange,
      }),
    };
  } catch (error) {
    console.error("Error uploading file:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
}