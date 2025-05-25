// const express = require('express');
// const router = express.Router();
// const Quote = require('../models/Quote.js'); 

// // POST /api/quote - create a new quote
// router.post('/', async (req, res) => {
//   try {
//     const quoteData = req.body;

//     // Basic validation could go here, or rely on Mongoose validation
//     // if (!quoteData.insuredUserId) {
//     //   return res.status(400).json({ message: 'insuredUserId is required' });
//     // }

//     if (!quoteData.quoteRef) {
//       quoteData.quoteRef = 'SKYLINE-QR-' + Date.now();
//     }

//     // Create new quote document
//     const newQuote = new Quote(quoteData);

//     // Save to DB
//     const savedQuote = await newQuote.save();

//     res.status(201).json({
//       message: 'Quote saved successfully',
//       quote: savedQuote,
//     });
//   } catch (error) {
//     console.error('Error saving quote:', error);
//     res.status(500).json({ message: 'Server error while saving quote' });
//   }
// });

// module.exports = router;



// quoteRoutes.js
import express from 'express';
import Quote from '../models/Quote.js'; // Note: include .js extension

const router = express.Router();

// POST /api/quote - create a new quote
router.post('/', async (req, res) => {
  try {
    const quoteData = req.body;

    // Basic validation could go here, or rely on Mongoose validation
    // if (!quoteData.insuredUserId) {
    //   return res.status(400).json({ message: 'insuredUserId is required' });
    // }

    if (!quoteData.quoteRef) {
      quoteData.quoteRef = 'SKYLINE-QR-' + Date.now();
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
    
    // Handle Mongoose validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: validationErrors 
      });
    }
    
    // Handle duplicate key errors (e.g., unique quoteRef)
    if (error.code === 11000) {
      return res.status(400).json({ 
        message: 'Duplicate quote reference. Please try again.' 
      });
    }
    
    res.status(500).json({ message: 'Server error while saving quote' });
  }
});

export default router;