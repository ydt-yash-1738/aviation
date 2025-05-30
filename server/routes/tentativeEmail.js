import express from 'express';
import SibApiV3Sdk from 'sib-api-v3-sdk';

const router = express.Router();

// Brevo
const defaultClient = SibApiV3Sdk.ApiClient.instance;
defaultClient.authentications['api-key'].apiKey = process.env.BREVO_API_KEY;
const transactionalEmailsApi = new SibApiV3Sdk.TransactionalEmailsApi();

router.post('/send-tentative-quote', async (req, res) => {
  try {
    const {
      insuredFirstName,
      coverageType,
      quoteRef,
      premium,
      insuredEmail,
    } = req.body;

    const email = {
      to: [{ email: insuredEmail }],
      templateId: 4,
      params: {
        insuredFirstName,
        coverageType,
        quoteRef,
        premium,
      },
    };
    console.log('Tentative email params:', { insuredFirstName, coverageType, quoteRef, premium });
    const result = await transactionalEmailsApi.sendTransacEmail(email);
    res.json({ status: 'success', data: result.body });

  } catch (error) {
    console.error('Email sending tentative error:', error);
    res.status(500).json({ status: 'error', message: 'Failed to send tentative email' });
  }
});

export default router;
