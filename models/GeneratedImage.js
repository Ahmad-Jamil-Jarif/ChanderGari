import mongoose from "mongoose";

const generatedImageSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  prompt: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  ratio: {
    type: String,
    required: true
  },
  size: {
    type: String,
    required: true
  },
  studioQuality: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('GeneratedImage', generatedImageSchema);