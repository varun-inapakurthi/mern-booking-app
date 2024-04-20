import express, { Request, Response } from 'express';
import User from '../models/user';
const router = express.Router();
import { check, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';

router.post(
  '/register',
  [
    check('firstName', 'firstName is required').isString(),
    check('lastName', 'lastName is required').isString(),
    check('email', 'email is required').isString(),
    check(
      'password',
      'password with 6 or more characters are required'
    ).isLength({
      min: 6,
    }),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }
    try {
      let user = await User.findOne({ email: req.body.email });

      if (user) {
        return res.status(400).json({ message: 'User already exists' });
      }
      user = await User.create(req.body);
      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET_KEY as string,
        { expiresIn: '1d' }
      );
      res.cookie('auth_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 86400000, //1d
      });
      return res.status(200).send({
        message:'User signed in successfully'
      });
    } catch (error) {
      console.log('🚀 ~ router.post ~ error:', error);
      res.status(500).json({ message: 'Something  went wrong' });
    }
  }
);

export default router;
