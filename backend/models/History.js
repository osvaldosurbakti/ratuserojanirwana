import mongoose from 'mongoose';

const HistorySchema = new mongoose.Schema({
  adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  action: { type: String, enum: ['CREATE', 'UPDATE', 'DELETE'], required: true },
  newsEventId: { type: mongoose.Schema.Types.ObjectId, ref: 'NewsEvent', required: true },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model('History', HistorySchema);
