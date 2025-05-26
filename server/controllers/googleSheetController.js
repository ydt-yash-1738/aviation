// controllers/googleSheetController.js
import fetch from 'node-fetch'; // If using Node.js <18

export const forwardToGoogleSheet = async (req, res) => {
  try {
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzUGPuwJ9nIwqOP2HgVO836Qwc_uoUK5Pc07cQ5fdM-DnCXg_pWbJh1CDM3T5Xk3vG24g/exec';

    const response = await fetch(GOOGLE_SCRIPT_URL, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(req.body),
});

const text = await response.text();
let result;

try {
  result = JSON.parse(text);
  console.log(result);
  
} catch (e) {
  console.error('Failed to parse Google Script response as JSON:', text);
  return res.status(500).json({ error: 'Invalid response from Google Sheets' });
}

return res.status(200).json(result);

  } catch (error) {
    console.error('Error forwarding to Google Sheets:', error);
    return res.status(500).json({ error: 'Failed to send to Google Sheets' });
  }
};
