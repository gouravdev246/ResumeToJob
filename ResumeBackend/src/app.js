import express from "express"
import cookieParser from 'cookie-parser';
import cors from 'cors'
import dotenv from 'dotenv';
import PdfRoutes from './router/pdf.routes.js'
import AuthRoutes from './router/auth.routes.js'
import JobRoutes from './router/job.routes.js'
import PaymentRoutes from './router/payment.routes.js'

dotenv.config();
const app = express()

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.get('/', (req, res) => {
    res.send('Hello Intern.... Backend is Live!');
});


app.use('/api/pdf' , PdfRoutes)
app.use('/api/auth' , AuthRoutes)
app.use('/api' , JobRoutes)
app.use('/api/payment' , PaymentRoutes)
export default app;