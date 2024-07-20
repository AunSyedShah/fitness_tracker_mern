import { Router } from "express";
import UserAuth from "../models/userAuth";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userAuthRouter = Router();

// register a new user
userAuthRouter.post('/register', async (req, res) => {
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    const user = new UserAuth({
        username: req.body.username,
        password: hashedPassword
    });
    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});