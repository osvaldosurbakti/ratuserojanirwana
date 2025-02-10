import NewsEvent from "../models/NewsEvent.js";
import mongoose from "mongoose";
import History from "../models/History.js";

// Create a new news/event
export const createNewsEvent = async (req, res) => {
  try {
    const { title, description, category, eventDate } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    if (!title || title.length < 5 || title.length > 100) {
      return res.status(400).json({ message: "Title must be between 5 and 100 characters" });
    }

    if (!description || description.length < 20) {
      return res.status(400).json({ message: "Description must be at least 20 characters" });
    }

    if (!category) {
      return res.status(400).json({ message: "Category is required" });
    }

    if (!eventDate || isNaN(Date.parse(eventDate))) {
      return res.status(400).json({ message: "Invalid event date" });
    }

    const newsEvent = new NewsEvent({
      title,
      description,
      category,
      eventDate,
      image,
    });
    await newsEvent.save();

    await History.create({
      adminId: req.userRole._id,
      action: "CREATE",
      newsEventId: newsEvent._id,
    });

    res.status(201).json(newsEvent);
  } catch (error) {
    console.error("❌ Error creating news event:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


// Get all news/events with search and category filter
export const getNewsEvents = async (req, res) => {
  try {
    const { search = "", category = "" } = req.query;

    const filter = {};
    if (search) {
      filter.title = { $regex: search, $options: "i" }; // Search by title (case-insensitive)
    }
    if (category) {
      filter.category = category; // Filter by category
    }

    const newsEvents = await NewsEvent.find(filter).sort({ eventDate: -1 }); // Sort by eventDate (newest first)

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

    if (!title || title.length < 5 || title.length > 100) {
      return res.status(400).json({ message: "Title must be between 5 and 100 characters" });
    }

    if (!description || description.length < 20) {
      return res.status(400).json({ message: "Description must be at least 20 characters" });
    }

    if (!category) {
      return res.status(400).json({ message: "Category is required" });
    }

    if (!eventDate || isNaN(Date.parse(eventDate))) {
      return res.status(400).json({ message: "Invalid event date" });
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
      image: image || existingNewsEvent.image, // Keep old image if no new one provided
    };

    const updatedNewsEvent = await NewsEvent.findByIdAndUpdate(
      id,
      { $set: updatedFields },
      { new: true }
    );

    await History.create({
      adminId: req.userRole._id,
      action: "UPDATE",
      newsEventId: newsEvent._id,
    });

    res.status(200).json({ message: "News/Event updated successfully", data: updatedNewsEvent });
  } catch (error) {
    console.error("❌ Error updating news/event:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


// Delete a news/event by ID
export const deleteNewsEvent = async (req, res) => {
  try {
    const { id } = req.params;

    if (!req.userRole || !req.userRole._id) {
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

    await History.create({
      adminId: req.userRole._id,
      action: "DELETE",
      newsEventId: newsEvent._id,
    });

    res.status(200).json({ message: "News & Event deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting news/event:", error);
    res.status(500).json({ message: "Error deleting news/event", error: error.message });
  }
};
