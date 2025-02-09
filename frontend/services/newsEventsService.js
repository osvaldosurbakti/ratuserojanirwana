// src/services/newsEventsService.js
import axios from "axios";

const API_BASE_URL = "http://localhost:5001/api/news-events"; // Ganti dengan URL API Anda jika berbeda

// Fetch news events
export const fetchNewsEvents = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.get(API_BASE_URL, config);
    return response.data;
  } catch (error) {
    console.error("Error fetching news events:", error.message);
    throw error;
  }
};

// Create a new news event
export const createNewsEvent = async (newsEventData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  };

  try {
    const response = await axios.post(API_BASE_URL, newsEventData, config);
    return response.data;
  } catch (error) {
    console.error("Error creating news event:", error.message);
    throw error;
  }
};
