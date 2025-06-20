// // models/Quote.js
// import mongoose from 'mongoose';

// const quoteSchema = new mongoose.Schema({
//   effectiveDate: {
//     type: Date,
//     required: true,
//   },
//   coverageType: {
//     type: String,
//     enum: ['Single Engine', 'Multi Engine', 'Single Engine Sea', 'Rotor Wing'],
//     required: true,
//   },
//   extendedCFI: {
//     type: String,
//     enum: ['Yes', 'No'],
//     required: true,
//   },
//   isAopaMember: {
//     type: String,
//     enum: ['Yes', 'No'],
//     required: true,
//   },
//   insuredFirstName: {
//     type: String,
//     required: true,
//   },
//   insuredMiddleName: {
//     type: String,
//     default: '',
//   },
//   insuredLastName: {
//     type: String,
//     required: true,
//   },
//   insuredEmail: {
//     type: String,
//     required: true,
//   },
//   insuredAddressLineOne: {
//     type: String,
//     required: true,
//   },
//   insuredAddressLineTwo: {
//     type: String,
//     default: '',
//   },
//   insuredCity: {
//     type: String,
//     required: true,
//   },
//   insuredState: {
//     type: String,
//     required: true,
//   },
//   insuredCountry: {
//     type: String,
//     required: true,
//   },
//   insuredZIP: {
//     type: String,
//     required: true,
//   },
//   age: {
//     type: Number,
//     required: true,
//     min: 15,
//   },
//   certificateRatings: {
//     type: String,
//     enum: ['Student', 'Commercial', 'Private', 'ATP'],
//     required: true,
//   },
//   instrumentRating: {
//     type: String,
//     enum: ['Yes', 'No'],
//     required: true,
//   },
//   overallHours: {
//     type: Number,
//     required: true,
//     min: 0,
//   },
//   twelveMonthsHours: {
//     type: Number,
//     required: true,
//     min: 0,
//   },

//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
//   quoteRef: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   premium: {
//     type: Number,
//     required: false
//   },
//   premiumBreakdown: {
//     type: Object,
//     required: false
//   },
//   policyNumber: { 
//     type: String, 
//     required: true, 
//     unique: true 
//   },
// }, {
//   collection: 'quote'
// });

// export default mongoose.model('Quote', quoteSchema);

// models/Quote.js
import mongoose from 'mongoose';

const quoteSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  quoteRef: { type: String, required: true, unique: true },
  policyNumber: { type: String, required: true },
  quickQuoteFormData: { type: Object },
  preQuoteFormData: { type: Object },
  completedQuoteData: { type: Object },
  createdAt: { type: Date, default: Date.now }
});

const Quote = mongoose.model('Quote', quoteSchema);
export default Quote;
