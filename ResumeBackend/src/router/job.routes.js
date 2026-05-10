import express from 'express';
import { jobRanking  , getRankedJobs} from '../controllers/jobranking.controller.js';
import { authenticate } from '../middleware/verify.middleware.js';
const router = express.Router();

router.get('/job' , authenticate ,  jobRanking);
router.get('/jobrank' , authenticate , getRankedJobs)

export default router;
