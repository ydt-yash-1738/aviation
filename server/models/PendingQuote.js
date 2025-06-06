import mongoose from 'mongoose';

const pendingQuoteSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    index: true
  },
  quoteRef: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  currentQuoteStep: {
    type: String,
    enum: ['quickQuote', 'preQuote', 'referral', 'quoteDisplay', 'payment', 'completed'],
    default: 'quickQuote'
  },
  
  // Quick Quote Form Data
  quickQuoteFormData: {
    effectiveDate: Date,
    coverageType: String,
    extendedCFI: String,
    isAopaMember: String,
    insuredFirstName: String,
    insuredMiddleName: String,
    insuredLastName: String,
    insuredEmail: String,
    insuredAddressLineOne: String,
    insuredAddressLineTwo: String,
    insuredCity: String,
    insuredState: String,
    insuredCountry: String,
    insuredZIP: String,
    age: Number
  },

  // Pre Quote Form Data
  preQuoteFormData: {
    certificateRatings: String,
    instrumentRating: String,
    overallHours: String,
    twelveMonthsHours: String
  },

  // Completed Quote Data (for final submission)
  completedQuoteData: {
    effectiveDate: Date,
    coverageType: String,
    extendedCFI: String,
    isAopaMember: String,
    insuredFirstName: String,
    insuredMiddleName: String,
    insuredLastName: String,
    insuredEmail: String,
    insuredAddressLineOne: String,
    insuredAddressLineTwo: String,
    insuredCity: String,
    insuredState: String,
    insuredCountry: String,
    insuredZIP: String,
    age: Number,
    certificateRatings: String,
    instrumentRating: String,
    overallHours: Number,
    twelveMonthsHours: Number,
    premium: Number,
    premiumBreakdown: mongoose.Schema.Types.Mixed
  },

  // Metadata
  isCompleted: {
    type: Boolean,
    default: false
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Update lastUpdated on save
pendingQuoteSchema.pre('save', function(next) {
  this.lastUpdated = new Date();
  next();
});

// Indexes for better query performance
pendingQuoteSchema.index({ userId: 1, quoteRef: 1 });
pendingQuoteSchema.index({ createdAt: -1 });
pendingQuoteSchema.index({ isCompleted: 1 });

export default mongoose.model('PendingQuote', pendingQuoteSchema);