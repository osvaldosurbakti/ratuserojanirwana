import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import axios from 'axios'; 
import connectDB from './config/database.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import newsEventRoutes from './routes/newsEventRoutes.js';
import historyRoutes from './routes/historyRoutes.js';

dotenv.config();

const PORT = process.env.PORT || 5001;
const BASE_URL = process.env.BASE_URL || "http://localhost:5001";
const API_URL = process.env.API_URL || `${BASE_URL}/api`;

const startServer = async () => {
  try {
    await connectDB();
    console.log("✅ Database connected successfully");

    const app = express();

    app.use(express.json());
    app.use(cookieParser());
    app.use(cors({
      origin: ['http://localhost:3000', 'http://localhost:5173'], // Allow both origins      credentials: true,
    }));

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    app.use(express.static(path.join(__dirname, '../frontend/dist')));
    app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

    app.get('/', (req, res) => {
      res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
    });

    app.use('/api/auth', authRoutes);
    app.use('/api/users', userRoutes);
    app.use('/api/news-events', newsEventRoutes);
    app.use('/api/history', historyRoutes);

    app.get('/api/data', async (req, res) => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        res.json(response.data);
      } catch (error) {
        console.error('❌ Error fetching data:', error.message);
        res.status(500).json({ message: 'Failed to fetch data' });
      }
    });
    

    app.use((err, req, res, next) => {
      console.error('❌ Error:', err.message);
      res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
    });

    app.listen(PORT, () => {
      console.log(`🚀 Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    process.exit(1);
  }
  console.log("✅ BASE_URL:", BASE_URL);
  console.log("✅ API_URL:", API_URL);
};

startServer();
