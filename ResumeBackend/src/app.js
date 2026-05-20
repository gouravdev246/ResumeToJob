import express from "express"
import cookieParser from 'cookie-parser';
import cors from 'cors'
import dotenv from 'dotenv';
import PdfRoutes from './router/pdf.routes.js'
import AuthRoutes from './router/auth.routes.js'
import JobRoutes from './router/job.routes.js'
import PaymentRoutes from './router/payment.routes.js'
import ShareRoutes from './router/share.routes.js'

dotenv.config();
const app = express()

app.use(express.json());
app.use(cookieParser());

const allowedOrigins = [
    'http://localhost:3000',
    process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
    origin: (origin, callback) => {
        if (!origin) return callback(null, true);
        if (
            allowedOrigins.includes(origin) ||
            origin.endsWith('.vercel.app') ||
            origin.startsWith('http://localhost:')
        ) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

app.get('/', (req, res) => {
    res.send('Hello Intern.... Backend is Live!');
});


app.use('/api/pdf', PdfRoutes)
app.use('/api/auth', AuthRoutes)
app.use('/api', JobRoutes)
app.use('/api/payment', PaymentRoutes)
app.use('/api/share', ShareRoutes)
export default app;