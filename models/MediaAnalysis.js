import mongoose from "mongoose";

const mediaAnalysisSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  mediaType: {
    type: String,
    enum: ['image', 'video'],
    required: true
  },
  mediaName: {
    type: String,
    required: true
  },
  previewUrl: {
    type: String,
    required: true
  },
  analysis: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('MediaAnalysis', mediaAnalysisSchema);