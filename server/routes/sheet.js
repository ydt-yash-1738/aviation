// routes/sheet.js
import express from 'express';
import { forwardToGoogleSheet } from '../controllers/googleSheetController.js';

const router = express.Router();

router.post('/submit', forwardToGoogleSheet);

export default router;
