// src/routes/newsEventRoutes.js
import express from 'express';
import {
  getNewsEvents,
  createNewsEvent,
  updateNewsEvent,
  deleteNewsEvent,
} from '../controllers/newsEventController.js';
import { getHistory } from '../controllers/historyController.js';
import { protect } from '../middleware/auth.js';
import { authorize } from '../middleware/authMiddleware.js';
import multer from 'multer';
import path from 'path';
import mongoose from 'mongoose';
import NewsEvent from '../models/NewsEvent.js';

const router = express.Router();

// Multer storage configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage });

// News & Events routes
router.post('/', protect, authorize('admin', 'superadmin'), upload.single('image'), createNewsEvent);
router.put('/:id', protect, authorize('admin', 'superadmin'), upload.single('image'), updateNewsEvent);
router.get('/', getNewsEvents);
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }

    const newsEvent = await NewsEvent.findById(id);

    if (!newsEvent) {
      return res.status(404).json({ message: 'News & Event not found' });
    }

    res.json(newsEvent);
  } catch (error) {
    console.error('Error fetching news event by ID:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.delete('/:id', protect, deleteNewsEvent, async (req, res) => {
  try {
    const deletedNews = await NewsEvent.findByIdAndDelete(id);
    if (!deletedNews) {
      return res.status(404).json({ message: "Berita tidak ditemukan" });
    }
    res.status(200).json({ message: "Berita berhasil dihapus" });
  } catch (error) {
    console.error("Error deleting news event:", error);
    res.status(500).json({ message: "Terjadi kesalahan pada server" });
  }
});
router.get('/history', protect, getHistory);

export default router;
