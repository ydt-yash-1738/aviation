import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import quoteRoutes from './routes/quoteRoutes.js';
import sheetRoutes from './routes/sheet.js';
import emailRoutes from './routes/email.js';

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected successfully'))
.catch((err) => console.error('MongoDB connection error:', err));

app.use('/api/auth', authRoutes);
app.use('/api/quote', quoteRoutes);
app.use('/api/sheet', sheetRoutes);
app.use('/api', emailRoutes);

app.listen(5000, () => console.log('Server running on http://localhost:5000'));