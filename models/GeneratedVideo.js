import mongoose from "mongoose";

const generatedVideoSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  operationName: {
    type: String,
    required: true,
    unique: true
  },
  prompt: {
    type: String,
    required: true
  },
  aspectRatio: {
    type: String,
    enum: ['16:9', '9:16'],
    required: true
  },
  videoUrl: {
    type: String
  },
  status: {
    type: String,
    enum: ['pending', 'done', 'failed'],
    default: 'pending'
  },
  hasStartingImage: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('GeneratedVideo', generatedVideoSchema);