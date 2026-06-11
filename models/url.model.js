import mongoose from 'mongoose';

const urlSchema = new mongoose.Schema({
  shortCode:   { type: String, required: true, unique: true },
  originalUrl: { type: String, required: true },
  clicks:      { type: Number, default: 0 },
  createdAt:   { type: Date,   default: Date.now },
});

export default mongoose.model('urlModel', urlSchema);