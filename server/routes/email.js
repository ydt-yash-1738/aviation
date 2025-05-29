import express from 'express';
const router = express.Router();
import SibApiV3Sdk from 'sib-api-v3-sdk';
import Quote from '../models/Quote.js'

// Configure Brevo API key
const defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.BREVO_API_KEY;

const transactionalEmailsApi = new SibApiV3Sdk.TransactionalEmailsApi();

router.post('/send-quote-email/:quoteRef', async (req, res) => {
  const { quoteRef } = req.params;

  try {
    // Fetch quote data from MongoDB by quoteRef
    const quoteData = await Quote.findOne({ quoteRef }).lean();
    if (!quoteData) {
      return res.status(404).json({ error: 'Quote not found' });
    }

    const { insuredFirstName, coverageType, premium } = quoteData;
    console.log('Email params:', { insuredFirstName, coverageType, quoteRef, premium });
    if (!insuredFirstName || !coverageType || !quoteRef || !premium) {
      return res.status(400).json({ error: 'Missing data fields for email template' });
    }
    // Prepare email parameters
    const sendSmtpEmail = {
      to: [{ email: quoteData.insuredEmail }],
      templateId: 2,  
      params: {
        insuredFirstName,
        coverageType,
        quoteRef,
        premium,
      },
    };
    console.log(sendSmtpEmail);
    
    // Send email
    const response = await transactionalEmailsApi.sendTransacEmail(sendSmtpEmail);

    res.json({ status: 'success', data: response.body });

  } catch (error) {
    console.error('Error sending quote email:', error);
    res.status(500).json({ status: 'error', message: 'Failed to send email' });
  }
});

export default router;
