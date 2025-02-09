import express from "express";
import {
  getNewsEvents,
  createNewsEvent,
  updateNewsEvent,
  deleteNewsEvent,
} from "../controllers/newsEventController.js";
import { protect } from "../middleware/auth.js";
import { authorize } from "../middleware/authMiddleware.js";
import multer from "multer";
import path from "path";
import mongoose from "mongoose";
import NewsEvent from "../models/NewsEvent.js";

const router = express.Router();

// Multer storage configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage });

// News & Events routes

// Create a news/event (Admin or Superadmin only)
router.post(
  "/",
  protect,
  authorize("admin", "superadmin"),
  upload.single("image"),
  createNewsEvent
);

// Update a news/event by ID (Admin or Superadmin only)
router.put(
  "/:id",
  protect,
  authorize("admin", "superadmin"),
  upload.single("image"),
  updateNewsEvent
);

// Get all news/events with optional search and filter
router.get("/", getNewsEvents);

// Get a single news/event by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const newsEvent = await NewsEvent.findById(id);

    if (!newsEvent) {
      return res.status(404).json({ message: "News & Event not found" });
    }

    res.json(newsEvent);
  } catch (error) {
    console.error("❌ Error fetching news event by ID:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Delete a news/event by ID (Admin or Superadmin only)
router.delete(
  "/:id",
  protect,
  authorize("admin", "superadmin"),
  async (req, res) => {
    try {
      const { id } = req.params;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }

      const deletedNewsEvent = await NewsEvent.findByIdAndDelete(id);

      if (!deletedNewsEvent) {
        return res.status(404).json({ message: "News & Event not found" });
      }

      console.log("🗑 Deleted News/Event:", deletedNewsEvent);

      res.status(200).json({ message: "News & Event successfully deleted" });
    } catch (error) {
      console.error("❌ Error deleting news/event:", error.message);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }
);


export default router;
