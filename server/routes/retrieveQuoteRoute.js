import express from 'express';
import Quote from '../models/Quote.js';

const router = express.Router();

// GET /api/quote/search
router.get('/search', async (req, res) => {
  try {
    const { insuredFirstName, effectiveDate, policyNumber, quoteRef } = req.query;
    const query = {};

    if (insuredFirstName) {
      query.insuredFirstName = new RegExp(`^${insuredFirstName}$`, 'i'); // case-insensitive match
    }

    if (effectiveDate) {
      const start = new Date(effectiveDate);
      start.setHours(0, 0, 0, 0);
      const end = new Date(effectiveDate);
      end.setHours(23, 59, 59, 999);
      query.effectiveDate = { $gte: start, $lte: end };
    }

    if (policyNumber) {
      query.policyNumber = policyNumber;
    }

    if (quoteRef) {
      query.quoteRef = quoteRef;
    }

    const results = await Quote.find(query);
    res.status(200).json(results);
  } catch (error) {
    console.error('Error fetching quotes:', error);
    res.status(500).json({ message: 'Server error while retrieving quotes' });
  }
});

export default router;
