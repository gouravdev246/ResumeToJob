import app from './src/app.js';
import dotenv from 'dotenv';
import connectDB from './src/db/db.js';
dotenv.config();

connectDB();



app.listen(5001, () => {
    console.log(`Server Start : http://localhost:5001`);
});