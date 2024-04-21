import express, { Request, Response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import userRoutes from './routes/users';
import authRoutes from './routes/auth';
import myHotelsRoutes from './routes/my-hotels';
import 'dotenv/config';
import cookieParse from 'cookie-parser';
import path from 'path';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);

const app = express();
app.use(express.json());
app.use(cookieParse());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(express.static(path.join(__dirname, '../../frontend/dist')));
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/my-hotels', myHotelsRoutes);
// app.get('/api/test', async (req: Request, res: Response) => {
//   res.json({ message: 'Hello world' });
// });
app.get('*', async (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'));
});

app.listen(5050, () => console.log('listening on', 5050));
