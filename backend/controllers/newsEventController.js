import NewsEvent from '../models/NewsEvent.js';
import mongoose from 'mongoose';
import History from '../models/History.js';

// Create a new news/event
export const createNewsEvent = async (req, res) => {
  try {
    const { title, description, category, eventDate } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    if (!title || !description || !category || !eventDate) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newsEvent = new NewsEvent({ title, description, category, eventDate, image });
    await newsEvent.save();

    await History.create({ adminId: req.user._id, action: 'CREATE', newsEventId: newsEvent._id });

    res.status(201).json(newsEvent);
  } catch (error) {
    console.error("❌ Error creating news event:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all news/events
export const getNewsEvents = async (req, res) => {
  try {
    const newsEvents = await NewsEvent.find();
    res.status(200).json(newsEvents);
  } catch (error) {
    console.error("❌ Error fetching news/events:", error);
    res.status(500).json({ message: "Error fetching news/events", error: error.message });
  }
};

// Update a news/event by ID
export const updateNewsEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, category, eventDate } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid News/Event ID" });
    }

    const existingNewsEvent = await NewsEvent.findById(id);
    if (!existingNewsEvent) {
      return res.status(404).json({ message: "News/Event not found" });
    }

    const updatedFields = { 
      title, 
      description, 
      category, 
      eventDate, 
      image: image || existingNewsEvent.image // Gunakan gambar lama jika tidak ada yang baru
    };

    const updatedNewsEvent = await NewsEvent.findByIdAndUpdate(id, { $set: updatedFields }, { new: true });

    await History.create({ adminId: req.user._id, action: 'UPDATE', newsEventId: id });

    res.status(200).json(updatedNewsEvent);
  } catch (error) {
    console.error("❌ Error updating news/event:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete a news/event by ID
export const deleteNewsEvent = async (req, res) => {
  try {
    const { id } = req.params;

    // Ensure req.user is not undefined
    if (!req.user || !req.user._id) {
      console.log("⛔ Unauthorized access. User information is missing.");
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid News/Event ID" });
    }

    const deletedNewsEvent = await NewsEvent.findByIdAndDelete(id);
    if (!deletedNewsEvent) {
      return res.status(404).json({ message: "News & Event not found" });
    }

    console.log("🗑 News/Event deleted:", deletedNewsEvent);

    // Save deletion history
    await History.create({ adminId: req.user._id, action: 'DELETE', newsEventId: id });

    res.status(200).json({ message: "News & Event deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting news/event:", error);
    res.status(500).json({ message: "Error deleting news/event", error: error.message });
  }
};