import express from 'express';
import PendingQuote from '../models/PendingQuote.js';
import Quote from '../models/Quote.js';

const router = express.Router();

// Auto-save form data (called from useEffect in components)
router.post('/save-form', async (req, res) => {
  try {
    const { 
      userId, 
      quoteRef, 
      quickQuoteFormData, 
      preQuoteFormData, 
      currentQuoteStep 
    } = req.body;

    if (!userId || !quoteRef) {
      return res.status(400).json({ 
        success: false, 
        message: 'UserId and quoteRef are required' 
      });
    }

    // Find existing pending quote or create new one
    let pendingQuote = await PendingQuote.findOne({ userId, quoteRef });

    if (!pendingQuote) {
      pendingQuote = new PendingQuote({
        userId,
        quoteRef,
        currentQuoteStep: currentQuoteStep || 'quickQuote'
      });
    }

    // Update the appropriate form data based on current step
    if (quickQuoteFormData) {
      pendingQuote.quickQuoteFormData = {
        ...pendingQuote.quickQuoteFormData,
        ...quickQuoteFormData
      };
    }

    if (preQuoteFormData) {
      pendingQuote.preQuoteFormData = {
        ...pendingQuote.preQuoteFormData,
        ...preQuoteFormData
      };
    }

    if (currentQuoteStep) {
      pendingQuote.currentQuoteStep = currentQuoteStep;
    }

    await pendingQuote.save();

    res.json({ 
      success: true, 
      message: 'Form data auto-saved successfully',
      quoteRef: pendingQuote.quoteRef 
    });

  } catch (error) {
    console.error('Error auto-saving form data:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to save form data',
      error: error.message 
    });
  }
});

// Save complete pending quote (called from QuickQuote handleNext)
router.post('/save', async (req, res) => {
  try {
    const quoteData = req.body;
    const { userId, quoteRef } = quoteData;

    if (!userId || !quoteRef) {
      return res.status(400).json({ 
        success: false, 
        message: 'UserId and quoteRef are required' 
      });
    }

    // Find existing pending quote or create new one
    let pendingQuote = await PendingQuote.findOne({ userId, quoteRef });

    if (!pendingQuote) {
      pendingQuote = new PendingQuote({
        userId,
        quoteRef
      });
    }

    // Update quick quote form data with complete data
    pendingQuote.quickQuoteFormData = {
      effectiveDate: quoteData.effectiveDate,
      coverageType: quoteData.coverageType,
      extendedCFI: quoteData.extendedCFI,
      isAopaMember: quoteData.isAopaMember,
      insuredFirstName: quoteData.insuredFirstName,
      insuredMiddleName: quoteData.insuredMiddleName,
      insuredLastName: quoteData.insuredLastName,
      insuredEmail: quoteData.insuredEmail,
      insuredAddressLineOne: quoteData.insuredAddressLineOne,
      insuredAddressLineTwo: quoteData.insuredAddressLineTwo,
      insuredCity: quoteData.insuredCity,
      insuredState: quoteData.insuredState,
      insuredCountry: quoteData.insuredCountry,
      insuredZIP: quoteData.insuredZIP,
      age: quoteData.age
    };

    pendingQuote.currentQuoteStep = quoteData.currentQuoteStep || 'preQuote';

    const savedQuote = await pendingQuote.save();

    res.json({ 
      success: true, 
      message: 'Quote data saved successfully',
      data: savedQuote 
    });

  } catch (error) {
    console.error('Error saving quote data:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to save quote data',
      error: error.message 
    });
  }
});

// Save completed quote with premium (called from PreQuote handleContinue)
router.post('/save-completed', async (req, res) => {
  try {
    const { userId, quoteRef, completedQuoteData } = req.body;

    if (!userId || !quoteRef || !completedQuoteData) {
      return res.status(400).json({ 
        success: false, 
        message: 'UserId, quoteRef, and completedQuoteData are required' 
      });
    }

    // Find the pending quote
    let pendingQuote = await PendingQuote.findOne({ userId, quoteRef });

    if (!pendingQuote) {
      return res.status(404).json({ 
        success: false, 
        message: 'Pending quote not found' 
      });
    }

    // Update with completed data
    pendingQuote.completedQuoteData = completedQuoteData;
    pendingQuote.currentQuoteStep = 'quoteDisplay';
    pendingQuote.isCompleted = false;

    const savedQuote = await pendingQuote.save();

    res.json({ 
      success: true, 
      message: 'Completed quote saved successfully',
      data: savedQuote 
    });

  } catch (error) {
    console.error('Error saving completed quote:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to save completed quote',
      error: error.message 
    });
  }
});

// Get pending quote by userId and quoteRef
router.get('/get/:userId/:quoteRef', async (req, res) => {
  try {
    const { userId, quoteRef } = req.params;

    const pendingQuote = await PendingQuote.findOne({ userId, quoteRef });

    if (!pendingQuote) {
      return res.status(404).json({ 
        success: false, 
        message: 'Pending quote not found' 
      });
    }

    res.json({ 
      success: true, 
      data: pendingQuote 
    });

  } catch (error) {
    console.error('Error fetching pending quote:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch pending quote',
      error: error.message 
    });
  }
});

// Get all pending quotes for a user
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { page = 1, limit = 10, completed } = req.query;

    const query = { userId };
    
    // Filter by completion status if specified
    if (completed !== undefined) {
      query.isCompleted = completed === 'true';
    }

    const pendingQuotes = await PendingQuote.find(query)
      .sort({ lastUpdated: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await PendingQuote.countDocuments(query);

    res.json({ 
      success: true, 
      data: pendingQuotes,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Error fetching user pending quotes:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch pending quotes',
      error: error.message 
    });
  }
});

// Delete a pending quote
router.delete('/delete/:userId/:quoteRef', async (req, res) => {
  try {
    const { userId, quoteRef } = req.params;

    const deletedQuote = await PendingQuote.findOneAndDelete({ userId, quoteRef });

    if (!deletedQuote) {
      return res.status(404).json({ 
        success: false, 
        message: 'Pending quote not found' 
      });
    }

    res.json({ 
      success: true, 
      message: 'Pending quote deleted successfully' 
    });

  } catch (error) {
    console.error('Error deleting pending quote:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to delete pending quote',
      error: error.message 
    });
  }
});

router.post('/finalize', async (req, res) => {
  try {
    const { userId, quoteRef, policyNumber } = req.body;

    if (!userId || !quoteRef || !policyNumber) {
      return res.status(400).json({ 
        success: false, 
        message: 'userId, quoteRef, and policyNumber are required' 
      });
    }

    const pendingQuote = await PendingQuote.findOne({ userId, quoteRef });

    if (!pendingQuote) {
      return res.status(404).json({ 
        success: false, 
        message: 'Pending quote not found' 
      });
    }

    // Save to Quote collection
    const newQuote = new Quote({
      userId,
      quoteRef,
      policyNumber,
      quickQuoteFormData: pendingQuote.quickQuoteFormData,
      preQuoteFormData: pendingQuote.preQuoteFormData,
      completedQuoteData: pendingQuote.completedQuoteData
    });

    await newQuote.save();

    // Delete from PendingQuote
    await PendingQuote.deleteOne({ userId, quoteRef });

    res.json({
      success: true,
      message: 'Quote finalized and saved to permanent storage',
      policyNumber
    });

  } catch (error) {
    console.error('Error finalizing quote:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to finalize quote',
      error: error.message 
    });
  }
});

// Clean up old incomplete quotes (utility endpoint)
router.delete('/cleanup/:days', async (req, res) => {
  try {
    const days = parseInt(req.params.days) || 30;
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);

    const result = await PendingQuote.deleteMany({
      isCompleted: false,
      lastUpdated: { $lt: cutoffDate }
    });

    res.json({ 
      success: true, 
      message: `Cleaned up ${result.deletedCount} old incomplete quotes`,
      deletedCount: result.deletedCount 
    });

  } catch (error) {
    console.error('Error cleaning up old quotes:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to cleanup old quotes',
      error: error.message 
    });
  }
});

// Get quote statistics for admin
router.get('/stats', async (req, res) => {
  try {
    const stats = await PendingQuote.aggregate([
      {
        $group: {
          _id: null,
          totalQuotes: { $sum: 1 },
          completedQuotes: {
            $sum: { $cond: [{ $eq: ['$isCompleted', true] }, 1, 0] }
          },
          pendingQuotes: {
            $sum: { $cond: [{ $eq: ['$isCompleted', false] }, 1, 0] }
          }
        }
      },
      {
        $project: {
          _id: 0,
          totalQuotes: 1,
          completedQuotes: 1,
          pendingQuotes: 1,
          completionRate: {
            $cond: [
              { $eq: ['$totalQuotes', 0] },
              0,
              { $multiply: [{ $divide: ['$completedQuotes', '$totalQuotes'] }, 100] }
            ]
          }
        }
      }
    ]);

    const stepStats = await PendingQuote.aggregate([
      {
        $group: {
          _id: '$currentQuoteStep',
          count: { $sum: 1 }
        }
      }
    ]);

    res.json({ 
      success: true, 
      data: {
        overview: stats[0] || { totalQuotes: 0, completedQuotes: 0, pendingQuotes: 0, completionRate: 0 },
        stepBreakdown: stepStats
      }
    });

  } catch (error) {
    console.error('Error fetching quote stats:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch quote statistics',
      error: error.message 
    });
  }
});

export default router;