import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url'; // Fix __dirname issue in ES Module
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connectDB from './config/database.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import newsEventRoutes from './routes/newsEventRoutes.js';
import historyRoutes from './routes/historyRoutes.js'; 

const PORT = process.env.PORT || 5001;

// Load environment variables
dotenv.config();

// Connect to the database before starting the server
const startServer = async () => {
  try {
    await connectDB(); // Wait for database connection before starting the server
    console.log("✅ Database connected successfully");

    const app = express();

    // Middleware for parsing JSON and cookies
    app.use(express.json());
    app.use(cookieParser());

    // Enable CORS
    app.use(
      cors({
        origin: process.env.FRONTEND_URL || 'http://localhost:3000',
        credentials: true,
      })
    );

    // Set cache control header
    app.use((req, res, next) => {
      res.set('Cache-Control', 'no-store');
      next();
    });

    // Fix __dirname for ES Module
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    // Serve static files (CSS, JS, etc.)
    app.use(express.static(path.join(__dirname, '../frontend/dist')));
    
    app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

    // API Routes
    app.use('/api/auth', authRoutes);
    app.use('/api/', userRoutes);
    app.use('/api/news-events', newsEventRoutes);
    app.use('/api/history', historyRoutes);
    

    // Serve the main HTML file for the root route
    app.get('/', (req, res) => {
      res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
    });

    // Global error handler
    app.use((err, req, res, next) => {
      console.error('❌ Error:', err.message);
      res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
    });

    // Start the server only if the database connection is successful
    const PORT = process.env.PORT || 5001;
    app.listen(PORT, () => {
      console.log(`🚀 Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    process.exit(1); // Stop the process if DB connection fails
  }
};

// Start the server
startServer();
