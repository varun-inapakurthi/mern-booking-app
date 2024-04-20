import express, { Request, Response } from 'express';
import { check, validationResult } from 'express-validator';
import User from '../models/user';
const router = express.Router();
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import verifyToken from '../middleware/auth';


router.post(
  '/login',
  [
    check('email', 'email is required').isEmail(),
    check('password', 'password with 6 or more characters required').isLength({
      min: 6,
    }),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }
    try {
      const { email, password } = req.body;
      const user = await User.findOne({  email});
      if(!user){
        return res.status(404).json({ message:"Invalid credentials"});
      }
      const isMatched = await bcrypt.compare(password, user.password)
      if(!isMatched){
        return res.status(404).json({ message:"Invalid credentials"});
      }
      const token = jwt.sign({userId: user.id}, process.env.JWT_SECRET_KEY as string, {
        expiresIn:'1d'
      })
      res.cookie('auth_token', token, {
        httpOnly:true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 86400000, //1d
      })
      return res.status(200).json({
        userId: user._id
      })
    } catch (error) {
      console.log("🚀 ~ error:", error)
      return res.status(400).json({ message:"Something went wrong"});
    }
  }
);
router.get('/validate-token', verifyToken, (req:Request, res:Response)=> {
res.status(200).send({userId: req.userId})
})
router.post('/logout',  (req: Request, res:Response)=> {
  res.status(200).clearCookie('auth_token', {
    path: '/'
  }).json({
    success: true,
  });
})

export default router;