import { Router } from "express";
import UserProfile from "../models/userProfile";
import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

const userProfileRouter = Router();

// GET /userProfile
userProfileRouter.get('/', async (req, res) => {
    try {
        const userProfiles = await UserProfile.find().populate('user');
        res.json(userProfiles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET /userProfile/:id
userProfileRouter.get('/:id', async (req, res) => {
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
userProfileRouter.post('/', async (req, res) => {
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
userProfileRouter.put('/:id', upload.single('profile_picture'), async (req, res) => {
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
userProfileRouter.delete('/:id', async (req, res) => {
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