// models/QuickQuote.js
import mongoose from 'mongoose';

const quoteSchema = new mongoose.Schema({
  effectiveDate: {
    type: Date,
    required: true,
  },
  coverageType: {
    type: String,
    enum: ['Single Engine', 'Multi Engine', 'Single Engine Sea', 'Rotor Wing'],
    required: true,
  },
  extendedCFI: {
    type: String,
    enum: ['Yes', 'No'],
    required: true,
  },
  isAopaMember: {
    type: String,
    enum: ['Yes', 'No'],
    required: true,
  },
  insuredFirstName: {
    type: String,
    required: true,
  },
  insuredMiddleName: {
    type: String,
    default: '',
  },
  insuredLastName: {
    type: String,
    required: true,
  },
  insuredAddressLineOne: {
    type: String,
    required: true,
  },
  insuredAddressLineTwo: {
    type: String,
    default: '',
  },
  insuredCity: {
    type: String,
    required: true,
  },
  insuredState: {
    type: String,
    required: true,
  },
  insuredCountry: {
    type: String,
    required: true,
  },
  insuredZIP: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
    min: 15,
  },
  certificateRatings: {
    type: String,
    enum: ['Student', 'Commercial', 'Private', 'ATP'],
    required: true,
  },
  instrumentRating: {
    type: String,
    enum: ['Yes', 'No'],
    required: true,
  },
  overallHours: {
    type: Number,
    required: true,
    min: 0,
  },
  twelveMonthsHours: {
    type: Number,
    required: true,
    min: 0,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  insuredUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'InsuredUserId',
    required: true,
  },
}, {
  collection: 'quote'
});

export default mongoose.model('Quote', quoteSchema);
