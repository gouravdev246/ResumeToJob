import express from 'express';
import {pdf_to_json , deleteExsistingData} from '../controllers/pdf-parse.controller.js';
import { authenticate } from '../middleware/verify.middleware.js';
import { upload } from '../services/fileupload.js';

const router = express.Router();

router.post('/getinfo' , authenticate , upload.single('resume'),  pdf_to_json);
router.delete('/delete' , authenticate , deleteExsistingData) ;

export default router;
