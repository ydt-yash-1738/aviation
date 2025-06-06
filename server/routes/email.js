import express from 'express';
const router = express.Router();
import SibApiV3Sdk from 'sib-api-v3-sdk';


// Configure Brevo API key
const defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.BREVO_API_KEY;

const transactionalEmailsApi = new SibApiV3Sdk.TransactionalEmailsApi();

router.post('/send-quote-email', async (req, res) => {
  const { quoteRef, quoteData, policyNumber } = req.body;

  try {
    // Prefer full quoteData from frontend if provided
    const {
      insuredFirstName,
      coverageType,
      premium,
      insuredEmail
    } = quoteData || {};


    console.log('Email params:', { insuredFirstName, coverageType, policyNumber, premium });

    if (!insuredFirstName || !coverageType || !policyNumber || !premium || !insuredEmail) {
      return res.status(400).json({ error: 'Missing data fields for email template' });
    }

    const sendSmtpEmail = {
      to: [{ email: insuredEmail }],
      templateId: 2,
      params: {
        insuredFirstName,
        coverageType,
        policyNumber,
        premium,
      },
    };

    const response = await transactionalEmailsApi.sendTransacEmail(sendSmtpEmail);

    res.json({ status: 'success', data: response.body });

  } catch (error) {
    console.error('Error sending quote email:', error);
    res.status(500).json({ status: 'error', message: 'Failed to send email' });
  }
});


export default router;
