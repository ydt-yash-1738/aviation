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
      // Since dates are stored as full ISO datetime strings (2025-06-04T18:30:00.000+00:00)
      // We need to create a date range for the entire day
      
      const inputDate = new Date(effectiveDate);
      
      // Create start of day (00:00:00.000Z)
      const startOfDay = new Date(inputDate);
      startOfDay.setUTCHours(0, 0, 0, 0);
      
      // Create end of day (23:59:59.999Z)
      const endOfDay = new Date(inputDate);
      endOfDay.setUTCHours(23, 59, 59, 999);
      
      // MongoDB will automatically handle the Date object comparison
      query.effectiveDate = { 
        $gte: startOfDay, 
        $lte: endOfDay 
      };
      
      console.log('Date search conditions:', {
        inputDate: effectiveDate,
        startOfDay: startOfDay.toISOString(),
        endOfDay: endOfDay.toISOString(),
        mongoQuery: query.effectiveDate
      });
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
    
    // Log first result to check field names and date format
    if (results.length > 0) {
      console.log('First result fields:', Object.keys(results[0].toObject ? results[0].toObject() : results[0]));
      console.log('First result insuredFirstName value:', results[0].insuredFirstName);
      console.log('First result effectiveDate value:', results[0].effectiveDate);
      console.log('First result effectiveDate type:', typeof results[0].effectiveDate);
    }
    
    // Additional debugging for date searches
    if (results.length === 0 && effectiveDate) {
      console.log('No results found. Additional debugging:');
      
      // Get a sample to see what dates exist
      const sampleDocs = await Quote.find({}).limit(5);
      console.log('Sample dates in database:');
      sampleDocs.forEach((doc, index) => {
        console.log(`Doc ${index + 1} effectiveDate:`, doc.effectiveDate);
      });
    }
    
    res.status(200).json(results);
  } catch (error) {
    console.error('Error fetching quotes:', error);
    res.status(500).json({ message: 'Server error while retrieving quotes' });
  }
});

// Alternative simplified route for debugging
router.get('/debug-dates', async (req, res) => {
  try {
    // Get all documents to analyze date storage format
    const allDocs = await Quote.find({}).limit(10);
    const dateAnalysis = allDocs.map(doc => ({
      id: doc._id,
      effectiveDate: doc.effectiveDate,
      dateType: typeof doc.effectiveDate,
      isValidDate: doc.effectiveDate instanceof Date,
      stringValue: doc.effectiveDate ? doc.effectiveDate.toString() : 'null'
    }));
    
    res.json({
      message: 'Date format analysis',
      totalDocs: allDocs.length,
      dateAnalysis
    });
  } catch (error) {
    console.error('Error in debug route:', error);
    res.status(500).json({ message: 'Debug error' });
  }
});

// Helper function to escape special regex characters
function escapeRegex(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export default router;