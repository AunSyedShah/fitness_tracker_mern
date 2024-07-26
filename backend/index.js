import express from 'express';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes';
import workoutRoutes from "./routes/workoutRoutes.js";
import userProfileRoutes from './routes/userProfileRoutes.js';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import multer from 'multer';

async function get_db() {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/fitness");
        console.info("database connected");
    } catch (error) {
        console.error(error);
    }
}

get_db();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors(
    {
        origin: "http://localhost:5173",
        credentials: true,
    }
))
app.use(cookieParser())
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use('/api/auth', authRoutes);
app.use('/api/workouts', workoutRoutes);
app.use('/api/userProfile', userProfileRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
