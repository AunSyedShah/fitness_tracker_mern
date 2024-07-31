import { Router } from "express";
import UserProfile from "../models/userProfile";
import multer from "multer";
import jwt from "jsonwebtoken";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

const userProfileRoutes = Router();

// GET /userProfile
userProfileRoutes.get('/', async (req, res) => {
    try {
        // exclude userAuth
        // get token from request header bearer token
        const token = req.headers.authorization.split(' ')[1];
        const { userId } = jwt.verify(token, process.env.JWT_SECRET);
        const userProfiles = await UserProfile.findOne({ userAuth: userId }, { userAuth: 0 });
        res.json(userProfiles);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

// GET /userProfile/:id
userProfileRoutes.get('/:id', async (req, res) => {
    try {
        const userProfile = await UserProfile.findById(req.params.id).populate('user');
        if (userProfile === null) {
            return res.status(404).json({ message: 'UserProfile not found' });
        }
        res.json(userProfile);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST /userProfile
userProfileRoutes.post('/', async (req, res) => {
    const userProfile = new UserProfile({
        name: req.body.name,
        email: req.body.email,
        profile_picture: req.body.profile_picture,
        user: req.body.user
    });
    try {
        const newProfile = await userProfile.save();
        res.status(201).json(newProfile);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// PUT /userProfile/:id, use multer to upload a file
userProfileRoutes.put('/:id', upload.single('profile_picture'), async (req, res) => {
    try {
        const userProfile = await UserProfile.findById(req.params.id);
        if (userProfile === null) {
            return res.status(404).json({ message: 'UserProfile not found' });
        }
        if (req.file) {
            userProfile.profile_picture = req.file.path;
        }
        userProfile.name = req.body.name;
        userProfile.email = req.body.email;
        userProfile.user = req.body.user;
        await userProfile.save();
        res.json(userProfile);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// DELETE /userProfile/:id
userProfileRoutes.delete('/:id', async (req, res) => {
    try {
        const userProfile = await UserProfile.findById(req.params.id);
        if (userProfile === null) {
            return res.status(404).json({ message: 'UserProfile not found' });
        }
        await userProfile.remove();
        res.json({ message: 'UserProfile deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default userProfileRoutes;