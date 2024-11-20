import { Router, type Request, type Response } from 'express';
import { User } from '../models/index.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import dotenv from 'dotenv';
dotenv.config();


const router = Router(); // POST: /auth/login

router.post('/login', async (req: Request, res: Response) => { // POST: /auth/login

    console.log('POST: /auth/login', req.body);

    const { userId, password } = req.body;
  
    const user = await User.findOne({
      where: { username: userId },
    });
  
    if (!user) {
      return res.status(401).json({ message: 'Authentication failed' });
    }
  
    const passwordIsValid = await bcrypt.compare(password, user.password);

    //console.log(password, user.password, passwordIsValid);

    if (!passwordIsValid) {
      return res.status(401).json({ message: 'Authentication failed' });
    }
  
    const secretKey = process.env.JWT_SECRET_KEY || '';
  
    const token = jwt.sign({ userIdOrEmail: userId }, secretKey, { expiresIn: '1h' });
  
    return res.json({ token });
  
  }); // POST: /auth/login



export default router;
