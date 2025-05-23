const express = require('express');
const router = express.Router();
const Quote = require('../models/QuickQuote'); // Adjust path if needed

// POST /api/quote - create a new quote
router.post('/', async (req, res) => {
  try {
    const quoteData = req.body;

    // Basic validation could go here, or rely on Mongoose validation
    if (!quoteData.insuredUserId) {
      return res.status(400).json({ message: 'insuredUserId is required' });
    }

    // Create new quote document
    const newQuote = new Quote(quoteData);

    // Save to DB
    const savedQuote = await newQuote.save();

    res.status(201).json({
      message: 'Quote saved successfully',
      quote: savedQuote,
    });
  } catch (error) {
    console.error('Error saving quote:', error);
    res.status(500).json({ message: 'Server error while saving quote' });
  }
});

module.exports = router;
