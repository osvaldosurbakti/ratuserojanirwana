import mongoose from 'mongoose';
const newsEventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    category: {
      type: String,
      required: true,
      enum: ['news', 'event'], // Only allow 'news' or 'event'
    },
    eventDate: { type: Date, required: true }, // Make eventDate mandatory
    image: { type: String },
  },
  { timestamps: true } // Automatically add createdAt and updatedAt
);

const NewsEvent = mongoose.model('NewsEvent', newsEventSchema);

export default NewsEvent;
