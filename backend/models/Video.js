import mongoose from 'mongoose';

const VideoSchema = new mongoose.Schema({
  youtubeVideoId: { type: String, required: true },
  title: String,
  description: String,
  uploaderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
  createdAt: { type: Date, default: Date.now },
  tags: [String],
  summary: String
});

VideoSchema.index({ title: 'text', description: 'text' });

export default mongoose.model('Video', VideoSchema);