import express from 'express';
import Quote from '../models/Quote.js';

const router = express.Router();

// POST /api/quote - create a new quote
router.post('/', async (req, res) => {
  try {
    const quoteData = req.body;

    if (!quoteData.quoteRef) {
      quoteData.quoteRef = 'SKYLINE-QR-' + Date.now();
    }

    // policy number generation
    const timestamp = Date.now();
    const randomSuffix = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    const policyNumber = `SKYLINE-POLICYNUMBER-${timestamp}-${randomSuffix}`;

    quoteData.policyNumber = policyNumber;

    console.log('Generated Policy Number:', policyNumber);
    console.log('Received premium:', quoteData.premium.toFixed(2));
    console.log('Received premium breakdown:', quoteData.premiumBreakdown);

    // const newQuote = new Quote({
    //   ...quoteData, // this includes premium and premiumBreakdown if sent from frontend
    // });

    const newQuote = new Quote(quoteData);
    const savedQuote = await newQuote.save();

     res.status(201).json({
      message: 'Quote saved successfully',
      quote: savedQuote,
    });

  } catch (error) {
    console.error('Error saving quote:', error);

    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: validationErrors 
      });
    }

    if (error.code === 11000) {
      return res.status(400).json({ 
        message: 'Duplicate quote reference. Please try again.' 
      });
    }

    res.status(500).json({ message: 'Server error while saving quote' });
  }
});

export default router;
