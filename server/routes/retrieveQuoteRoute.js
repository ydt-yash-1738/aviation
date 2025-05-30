import express from 'express';
import Quote from '../models/Quote.js';

const router = express.Router();

// GET /api/quote/search
router.get('/search', async (req, res) => {
  try {
    console.log('Full req.query:', req.query);
    const { insuredFirstName, effectiveDate, policyNumber, quoteRef } = req.query;
    console.log('Extracted insuredFirstName:', insuredFirstName);
    console.log('Type of insuredFirstName:', typeof insuredFirstName);
    
    const query = {};

    if (insuredFirstName && insuredFirstName.trim() !== '') {
      query.insuredFirstName = insuredFirstName.trim();
      console.log('Added to query - insuredFirstName:', query.insuredFirstName);
    }

    if (effectiveDate) {
      const start = new Date(effectiveDate);
      start.setHours(0, 0, 0, 0);
      const end = new Date(effectiveDate);
      end.setHours(23, 59, 59, 999);
      query.effectiveDate = { $gte: start, $lte: end };
    }

    if (policyNumber && policyNumber.trim() !== '') {
      query.policyNumber = policyNumber.trim();
    }

    if (quoteRef && quoteRef.trim() !== '') {
      query.quoteRef = quoteRef.trim();
    }

    console.log('Final MongoDB query:', JSON.stringify(query, null, 2));
    
    // Test if query is empty
    if (Object.keys(query).length === 0) {
      console.log('WARNING: Query is empty, will return all documents!');
    }
    
    const results = await Quote.find(query);
    console.log('Number of results found:', results.length);
    
    // Log first result to check field names
    if (results.length > 0) {
      console.log('First result fields:', Object.keys(results[0].toObject ? results[0].toObject() : results[0]));
      console.log('First result insuredFirstName value:', results[0].insuredFirstName);
    }
    
    res.status(200).json(results);
  } catch (error) {
    console.error('Error fetching quotes:', error);
    res.status(500).json({ message: 'Server error while retrieving quotes' });
  }
});

// Helper function to escape special regex characters
function escapeRegex(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export default router;