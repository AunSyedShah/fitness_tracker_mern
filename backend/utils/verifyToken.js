import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(' ')[1];
        const { userId } = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = userId;
        next();
    }
    catch{
        console.error()
    }
}