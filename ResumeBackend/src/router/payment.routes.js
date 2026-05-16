import express from 'express';
import {createOrder , verifyPayments} from '../controllers/payment.controller.js'
import { authenticate } from '../middleware/verify.middleware.js';

const router = express.Router();


router.post('/createOrder' , authenticate, createOrder) ;
router.post('/verifyPayment' , authenticate, verifyPayments) ;


export default router;