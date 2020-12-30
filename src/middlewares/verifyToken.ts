import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';

//Posible solucion a problema de headers

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('auth-token');
    if (!token) return res.status(401).json('Access Denied!');

    const payload = jwt.verify(token, process.env.TOKEN_SECRET || 'avilatektestoken');
    console.log(payload);
    next();
} 