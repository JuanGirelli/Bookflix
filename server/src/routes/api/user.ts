import { Router } from "express";

import bcrypt from 'bcrypt';

import dotenv from 'dotenv';

import { User } from '../../models/index.js';

dotenv.config();

const router = Router();

// sign up route // POST: /api/user/signup

router.post("/signup", async (req, res) => {
  const { email, userId, password } = req.body;

  try {
    const newProfile = req.body;

    const userData = await User.create({
      email: newProfile.email,
      password: newProfile.password,
      username: newProfile.userId,
    });
    res.status(200).json(userData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// login route // POST: /api/user/login
router.post("/login", async (req, res) => {
  const { userIdOrEmail, password } = req.body;
  const user = await User.findOne({
    where: { username: userIdOrEmail, password: password }
  });

  if (!user) {
    return res.status(401).json({ message: 'Authentication failed' });
  }
  const passwordIsValid = await bcrypt.compare(password, user.password);
  if (!passwordIsValid) {
    return res.status(401).json({ message: 'Authentication failed' });
  }
  return res.status(200).json({ message: 'Login successful' });
});

export default router;
