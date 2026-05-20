import express from 'express';
import { ShareResume } from '../controllers/shareResume.controller.js';
const router = express.Router();

router.get('/resume/:id', ShareResume);
export default router;
