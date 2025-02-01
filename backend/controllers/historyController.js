import History from '../models/History.js';

export const getHistory = async (req, res) => {
  try {
    const historyData = await History.find()
      .populate('adminId', 'name email') // Populasi adminId untuk mendapatkan name & email
      .populate('newsEventId', 'title')  // Populasi newsEventId untuk mendapatkan title
      .sort({ timestamp: -1 }); // Urutkan dari yang terbaru

    res.status(200).json(historyData);
  } catch (error) {
    console.error("❌ Error fetching history:", error);
    res.status(500).json({ message: "Error fetching history", error: error.message });
  }
};
