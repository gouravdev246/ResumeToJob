import express from 'express';
import {pdf_to_json , deleteExsistingData , getPdfInfo} from '../controllers/pdf-parse.controller.js';
import { authenticate } from '../middleware/verify.middleware.js';
import { upload } from '../services/fileupload.js';

const router = express.Router();

router.post('/uploadpdf' , authenticate  , upload.single('resume'),  pdf_to_json);
router.get('/getinfo' , authenticate , getPdfInfo) ;
router.delete('/delete' , authenticate , deleteExsistingData) ;

export default router;
