import express from 'express';
import bcrypt from 'bcrypt';
import multer from 'multer';
import UserAuth from '../models/userAuth';
import UserProfile from '../models/userProfile';
import jwt from 'jsonwebtoken'

const authRoutes = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

authRoutes.post('/register', upload.single('profilePicture'), async (req, res) => {
    const { username, password, name, email } = req.body;
    const profilePicture = req.file ? req.file.path : null;

    try {
        const existingUser = await UserAuth.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        const existingEmail = await UserProfile.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const userProfile = new UserProfile({
            name,
            email,
            profilePicture,
        });

        const savedUserProfile = await userProfile.save();

        const userAuth = new UserAuth({
            username,
            password: hashedPassword,
            userProfile: savedUserProfile._id,
        });

        const savedUserAuth = await userAuth.save();

        savedUserProfile.userAuth = savedUserAuth._id;
        await savedUserProfile.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Login Endpoint
authRoutes.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const userAuth = await UserAuth.findOne({ username });
        if (!userAuth) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const isPasswordValid = await bcrypt.compare(password, userAuth.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const token = jwt.sign(
            { userId: userAuth._id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' } // Token expires in 1 hour
        );

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Set to true in production
            sameSite: 'strict',
            maxAge: 3600000 // 1 hour
        });

        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default authRoutes;
