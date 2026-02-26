import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.routes.js';


const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true
}))


app.use(express.json())
app.use(cookieParser())
app.use("/api/auth", authRouter)
const port = process.env.PORT || 7000;

app.listen(port,()=>{
    connectDB();
    console.log(`server is running on port ${port}`);
})
