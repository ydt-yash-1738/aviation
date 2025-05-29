// controllers/emailController.js
const SibApiV3Sdk = require('sib-api-v3-sdk');

const sendQuoteEmail = async (req, res) => {
  const { email, firstName, coverageType, quoteRef, premium } = req.body;

  const defaultClient = SibApiV3Sdk.ApiClient.instance;
  const apiKey = defaultClient.authentications['api-key'];
  apiKey.apiKey = process.env.BREVO_API_KEY;

  const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

  const sendSmtpEmail = {
    to: [{ email }],
    templateId: 2,
    params: {
      firstName,
      coverageType,
      quoteRef,
      premium,
    },
  };

  try {
    const response = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log('Email sent:', response);
    res.status(200).json({ status: 'success' });
  } catch (error) {
    console.error('Failed to send email:', error);
    res.status(500).json({ status: 'error', message: 'Email failed' });
  }
};


export default { sendQuoteEmail };
