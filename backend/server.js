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
const DATA_SOURCE = process.env.DATA_SOURCE || 'https://jsonplaceholder.typicode.com/posts';

const startServer = async () => {
  try {
    await connectDB();

    // Validate essential environment variables
    if (!process.env.MONGO_URI || !process.env.JWT_SECRET || !process.env.FRONTEND_URL) {
      console.error('❌ Missing essential environment variables');
      process.exit(1);
    }

    const app = express();

    // Middleware
    app.use(express.json());
    app.use(cookieParser());
    app.use(cors({
      origin: process.env.FRONTEND_URL || 'http://localhost:5173',
      credentials: true,
    }));

    // Logger (for debugging)
    app.use((req, res, next) => {
      console.log(`📥 ${req.method} request to ${req.url}`);
      next();
    });

    // File path utilities
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    // Static files
    app.use(express.static(path.join(__dirname, '../frontend/dist')));
    app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

    // Routes
    app.use('/api/auth', authRoutes);
    app.use('/api/users', userRoutes);
    app.use('/api/news-events', newsEventRoutes);
    app.use('/api/history', historyRoutes);

    // API endpoint for external data
    app.get('/api/data', async (req, res) => {
      try {
        const response = await axios.get(DATA_SOURCE);
        res.json(response.data);
      } catch (error) {
        console.error('❌ Error fetching data:', error.message);
        res.status(500).json({ message: 'Failed to fetch data' });
      }
    });

    // Handle missing API routes
    app.use('/api', (req, res) => {
      res.status(404).json({ message: 'API route not found' });
    });

    // Favicon handler
    app.use('/favicon.ico', (req, res) => res.status(204).end());

    // SPA fallback
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
    });

    // Error handling middleware
    app.use((err, req, res, next) => {
      console.error('❌ Error:', err.message);
      res.status(err.status || 500).json({
        message: err.message || 'Internal Server Error',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
      });
    });

    // Start server
    app.listen(PORT, () => {
      console.log(`🚀 Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    process.exit(1);
  }
};

startServer();
